
> Name

MultiSymbolCtrlLib

> Author

小小梦

> Strategy Description

## 说明

文章https://www.fmz.com/digest-topic/7373中使用的模板
代码仅供参考学习，实盘慎用。



> Source (javascript)

``` javascript
// 交易所接口调用实现
// OKEX V3 合约
function funcConfigure_Futures_OKCoin(self) {
    // 内置函数可以根据需求自由编写
    var formatSymbol = function(originalSymbol) {
        // originalSymbol : LINK-USD-210423
        var arr = originalSymbol.split("-")
        var baseCurrency = arr[0]
        var quoteCurrency = arr[1]
        return [(baseCurrency + "_" + quoteCurrency).toUpperCase(), baseCurrency.toUpperCase(), quoteCurrency.toUpperCase()]    // 返回数据：[currency, baseCurrency, quoteCurrency]
    }

    self.interfaceGetTickers = function interfaceGetTickers() {
        // 可以识别 self.subscribeSymbols 中订阅的品种判断是否需要永续合约行情
        var url = "https://www.okex.com/api/futures/v3/instruments/ticker"
        self.routineGetTicker = HttpQuery_Go(url)
    }

    self.waitTickers = function waitTickers() {
        var ret = []
        var arr = JSON.parse(self.routineGetTicker.wait())
        _.each(arr, function(ele) {
            ret.push({
            	bid1: parseFloat(ele.best_bid), 
            	bid1Vol: parseFloat(ele.best_bid_size), 
            	ask1: parseFloat(ele.best_ask), 
            	ask1Vol: parseFloat(ele.best_ask_size), 
            	symbol: formatSymbol(ele.instrument_id)[0], 
            	type: "Futures", 
            	originalSymbol: ele.instrument_id
            })
        })
        return ret 
    }

    self.interfaceGetAcc = function interfaceGetAcc(symbol, updateTS) {
        // 可根据symbol识别是否是永续合约
        var arr = formatSymbol(symbol)
        var url = "/api/futures/v3/accounts/" + arr[1].toLowerCase() + "-" + arr[2].toLowerCase()        
        self.routineGetAcc = self.e.Go("IO", "api", "GET", url)
    }

    self.waitAcc = function waitAcc(symbol, updateTS) {
        var acc = null 
        var ret = self.routineGetAcc.wait()
        // 判断是不是全仓
        if (ret.margin_mode != "crossed") {
            Log(self.name, "持仓模式不为全仓！")
            return 
        }
        var balance = parseFloat(ret.equity) - parseFloat(ret.margin)
        var frozenBalance = parseFloat(ret.margin_for_unfilled)
        if (ret.currency == "USDT") {
            acc = {symbol: symbol, Stocks: 0, FrozenStocks: 0, Balance: balance, FrozenBalance: frozenBalance, originalInfo: ret}
        } else if (ret.currency == "USD") {
            acc = {symbol: symbol, Stocks: balance, FrozenStocks: frozenBalance, Balance: 0, FrozenBalance: 0, originalInfo: ret}
        }
        return acc
    }

    self.interfaceGetPos = function interfaceGetPos(symbol, updateTS) {
    	var symbolInfo = self.getSymbolInfo(symbol)
    	var url = "/api/futures/v3/" + symbol + "/position"
    	if (symbol.includes("SWAP")) {
    		url = "/api/swap/v3/" + symbol + "/position"
    	}
    	var ret = self.e.IO("api", "GET", url)
    	var positions = []
    	_.each(ret.holding, function(ele) {
    		if (ele.instrument_id == symbol && parseFloat(ele.short_qty) > 0) {   // 持有空头仓位
    			positions.push({symbol: symbol, amount: -parseFloat(ele.short_qty) * symbolInfo.multiplier, price: parseFloat(ele.short_avg_cost), marginLevel: parseFloat(ele.leverage), originalInfo: ele})
    		}
    		if (ele.instrument_id == symbol && parseFloat(ele.long_qty) > 0) {    // 持有多头仓位
    			positions.push({symbol: symbol, amount: parseFloat(ele.long_qty) * symbolInfo.multiplier, price: parseFloat(ele.long_avg_cost), marginLevel: parseFloat(ele.leverage), originalInfo: ele})
    		}
    	})
        return positions
    }

    self.interfaceTrade = function interfaceTrade(symbol, type, price, amount) {
        // 判断合约 交割、永续
        var url = "/api/futures/v3/order"
        if (symbol.includes("SWAP")) {
            url = "/api/swap/v3/order"
        }
        var tradeType = ""
        switch(type) {
        case self.OPEN_LONG:
            tradeType = "1"
            break
        case self.OPEN_SHORT:
            tradeType = "2"
            break
        case self.COVER_LONG:
            tradeType = "3"
            break
        case self.COVER_SHORT:
            tradeType = "4"
            break
        default:
            throw "type error, type:" + type
        }
        var params = {
            "instrument_id": symbol, 
            "type": tradeType,
            "order_type": "4",
            "size": String(amount)
        }
        self.routineTrade = self.e.Go("IO", "api", "POST", url, self.encodeParams(params))
    }

    self.waitTrade = function waitTrade() {
        return self.routineTrade.wait()
    }

    self.calcAmount = function calcAmount(symbol, type, price, amount) {
        // 处理下单量
        var symbolInfo = self.getSymbolInfo(symbol)
        if (!symbolInfo) {
            throw symbol + "，交易对信息查询不到"
        }
        var tradeAmount = _N(amount / symbolInfo.multiplier, 0)
        // 判断最小下单量
        if (tradeAmount < parseFloat(symbolInfo.min)) {
            Log(self.name, " tradeAmount:", tradeAmount, "小于", parseFloat(symbolInfo.min))
            return false 
        }
        return [tradeAmount, tradeAmount * symbolInfo.multiplier]
    }

    self.interfaceSetMarginLevel = function interfaceSetMarginLevel(symbol, marginLevel) {
        var arr = formatSymbol(symbol)
        var underlying = arr[1] + "-" + arr[2]
        var url = "/api/futures/v3/accounts/" + underlying + "/leverage"
        var params = {
        	"leverage" : String(marginLevel)
        }
        if (symbol.includes("SWAP")) {
        	url = "/api/futures/v3/accounts/" + symbol + "/leverage"
        	params = {
        		"instrument_id" : symbol,
        		"leverage" : String(marginLevel), 
        		"side" : "3"
        	}
        } else {
            var ret  = self.e.IO("api", "GET", "/api/futures/v3/accounts/" + underlying + "/leverage")
            // 如果不是永续合约，要先切换全仓模式，设置全仓模式前先判断是否不为全仓
            if (ret.margin_mode != "crossed") { 
                self.e.IO("api", "POST", "/api/futures/v3/accounts/margin_mode", self.encodeParams({"underlying" : underlying, "margin_mode" : "crossed"}))
            }
        }
        return self.e.IO("api", "POST", url, self.encodeParams(params))
    }

    self.interfaceCalcProfit = function interfaceCalcProfit(arrInitAcc, arrNowAcc) {
    	// 计算总权益差值，即盈亏
    	var profit = 0
        _.each(arrInitAcc, function(initAcc) {
        	_.each(arrNowAcc, function(nowAcc) {
        		if (initAcc.symbol == nowAcc.symbol) {
        			profit += nowAcc.originalInfo.equity - initAcc.originalInfo.equity
        		}
        	})
        })
        return profit
    }

    self.init = function init() {
        // 可以识别 self.subscribeSymbols 中订阅的品种判断是否需要永续合约信息
        var ret = JSON.parse(HttpQuery("https://www.okex.com/api/futures/v3/instruments"))   // 只获取了交割合约，可以增加永续合约
        _.each(ret, function(symbolInfo) {
            self.symbolsInfo.push({
                symbol: symbolInfo.instrument_id,
                amountPrecision: self.judgePrecision(parseFloat(symbolInfo.tick_size)),
                pricePrecision: self.judgePrecision(parseFloat(symbolInfo.trade_increment)),
                multiplier: parseFloat(symbolInfo.contract_val),
                min: 1,                                                                      // OKEX 合约最小下1张
                originalInfo: symbolInfo
            })
        })
    }
}

// 币安合约
function funcConfigure_Futures_Binance(self) {
    var formatSymbol = function (originalSymbol) {
        // BTCUSD_200925
        originalSymbol = (originalSymbol.split("_")[0]).toLowerCase()
        var baseCurrency = originalSymbol.replace(/(btc|eth|usdt|husd|ht|trx)$/, "")
        var quoteCurrency = originalSymbol.replace(baseCurrency, "")
        return [(baseCurrency + "_" + quoteCurrency).toUpperCase(), baseCurrency.toUpperCase(), quoteCurrency.toUpperCase()]
    }

    self.interfaceGetTickers = function interfaceGetTickers() {
        self.routineGetTicker = HttpQuery_Go("https://fapi.binance.com/fapi/v1/ticker/bookTicker")
    }

    self.waitTickers = function waitTickers() {
        var ret = []
        var arr = JSON.parse(self.routineGetTicker.wait())
        _.each(arr, function(ele) {
            ret.push({
                bid1: parseFloat(ele.bidPrice), 
                bid1Vol: parseFloat(ele.bidQty), 
                ask1: parseFloat(ele.askPrice), 
                ask1Vol: parseFloat(ele.askQty), 
                symbol: formatSymbol(ele.symbol)[0],
                type: "Futures", 
                originalSymbol: ele.symbol
            })
        })
        return ret 
    }

    self.interfaceGetAcc = function interfaceGetAcc(symbol, updateTS) {
        if (self.updateAccsTS != updateTS) {      // 如果新的一轮获取账户信息才去创建并发数据
            self.routineGetAcc = self.e.Go("IO", "api", "GET", "/fapi/v2/account")
        }
    }

    self.waitAcc = function waitAcc(symbol, updateTS) {
        var ret = null 
        if (self.updateAccsTS != updateTS) {      // 如果新的一轮获取账户信息才去获取并发数据
            ret = self.routineGetAcc.wait()            
            self.bufferGetAccRet = ret            // 由于交易所资产数据接口返回的是全部信息，避免重复调用，缓存 
        } else {                                  // 如果时间戳相等，说明是同一轮，用缓存数据
            ret = self.bufferGetAccRet
        }
        if (!ret) {
            return null 
        }
        return {symbol: symbol, Stocks: 0, FrozenStocks: 0, Balance: ret.availableBalance, FrozenBalance: ret.totalOpenOrderInitialMargin, originalInfo: ret}
    }

    self.interfaceGetPos = function interfaceGetPos(symbol, updateTS) {
        // GET /fapi/v2/positionRisk
        var ret = null 
        if (self.updatePosTS != updateTS) {
            ret = self.e.IO("api", "GET", "/fapi/v2/positionRisk")
            self.bufferGetPosRet = ret 
        } else {
            ret = self.bufferGetPosRet
        }
        if (!ret) {
            return null 
        } 
        var positions = []
        _.each(ret, function(ele) {
            if (ele.symbol == symbol && parseFloat(ele.positionAmt) < 0) {   // 持有空头仓位
                positions.push({symbol: symbol, amount: parseFloat(ele.positionAmt) * symbolInfo.multiplier, price: parseFloat(ele.entryPrice), marginLevel: parseFloat(ele.leverage), originalInfo: ele})
            }
            if (ele.symbol == symbol && parseFloat(ele.positionAmt) > 0) {   // 持有多头仓位
                positions.push({symbol: symbol, amount: parseFloat(ele.positionAmt) * symbolInfo.multiplier, price: parseFloat(ele.entryPrice), marginLevel: parseFloat(ele.leverage), originalInfo: ele})
            }
        })
        return positions        
    }

    self.interfaceTrade = function interfaceTrade(symbol, type, price, amount) {
        // POST /fapi/v1/order  symbol  side type  quantity  
        var params = {"symbol": symbol, "type": "MARKET", quantity: String(amount)}
        switch(type) {
        case self.OPEN_LONG:
            params["side"] = "BUY"
            params["positionSide"] = "LONG"
            break
        case self.OPEN_SHORT:
            params["side"] = "SELL"
            params["positionSide"] = "SHORT"
            break
        case self.COVER_LONG:
            params["side"] = "SELL"
            params["positionSide"] = "LONG"
            break
        case self.COVER_SHORT:
            params["side"] = "BUY"
            params["positionSide"] = "SHORT"
            break
        default: 
            throw "type error, type:" + type
        }

        if (!self.dualSidePosition) {
            params["positionSide"] = "BOTH"
        }
        self.routineTrade = self.e.Go("IO", "api", "POST", "/fapi/v1/order", self.encodeParams(params))
    }

    self.waitTrade = function waitTrade() {
        return self.routineTrade.wait()
    }

    self.calcAmount = function calcAmount(symbol, type, price, amount) {
        // 处理下单量
        var symbolInfo = self.getSymbolInfo(symbol)
        if (!symbolInfo) {
            throw symbol + "，交易对信息查询不到"
        }
        var tradeAmount = _N(amount / symbolInfo.multiplier, symbolInfo.amountPrecision)
        // 判断最小下单量
        var notional = null
        _.each(symbolInfo.originalInfo.filters, function(filter) {
            if (filter.filterType == "MIN_NOTIONAL") {
                notional = parseFloat(filter.notional)
            }
        })
        if (typeof(notional) != "number") {
            Log("查找不到notional")
            return false 
        }
        if (tradeAmount < parseFloat(symbolInfo.min) || tradeAmount * price < notional) {      // 币安有额外金额限制条件
            Log(self.name, " tradeAmount:", tradeAmount, "小于", parseFloat(symbolInfo.min), "或者 ", "价值：", tradeAmount * price, "小于notional：", notional)
            return false 
        }
        return [tradeAmount, tradeAmount * symbolInfo.multiplier]
    }

    self.interfaceSetMarginLevel = function interfaceSetMarginLevel(symbol, marginLevel) {
        // POST /fapi/v1/leverage   symbol leverage
        var params = {"symbol": symbol, "leverage": String(marginLevel)}
        return self.e.IO("api", "POST", "/fapi/v1/leverage", self.encodeParams(params))
    }

    self.interfaceCalcProfit = function interfaceCalcProfit(arrInitAcc, arrNowAcc) {
        // 币安期货资产是每个交易对共有的
        var profit = 0
        var initOriginalInfo = null 
        var nowOriginalInfo = null 
        _.each(arrInitAcc, function(initAcc) {
            _.each(arrNowAcc, function(nowAcc) {
                if (!initOriginalInfo && !nowOriginalInfo && initAcc.symbol == nowAcc.symbol) {
                    initOriginalInfo = initAcc.originalInfo
                    nowOriginalInfo = nowAcc.originalInfo
                }
            })
        })
        return nowOriginalInfo.totalWalletBalance - initOriginalInfo.totalWalletBalance
    }

    self.init = function init() {
        var ret = JSON.parse(HttpQuery("https://fapi.binance.com/fapi/v1/exchangeInfo"))
        _.each(ret.symbols, function(symbolInfo) {
            var min = null 
            _.each(symbolInfo.filters, function(filter) {
                if (filter.filterType == "MARKET_LOT_SIZE") {
                    min = parseFloat(filter.minQty)
                }
            })
            self.symbolsInfo.push({
                symbol: symbolInfo.symbol,
                amountPrecision: parseFloat(symbolInfo.quantityPrecision),
                pricePrecision: parseFloat(symbolInfo.pricePrecision),
                multiplier: 1,
                min: min,
                originalInfo: symbolInfo
            })
        })
        // 查询持仓模式 GET /fapi/v1/positionSide/dual
        self.dualSidePosition = self.e.IO("api", "GET", "/fapi/v1/positionSide/dual")["dualSidePosition"]   // 给封装的交易所对象增加属性dualSidePosition，true为双向持仓
        Log("币安期货持仓模式，dualSidePosition为：", self.dualSidePosition)
    }
}

// 火币现货
function funcConfigure_Huobi(self) {
    var formatSymbol = function(originalSymbol) {
        var baseCurrency = originalSymbol.replace(/(btc|eth|usdt|husd|ht|trx)$/, "")
        var quoteCurrency = originalSymbol.replace(baseCurrency, "")
        return [(baseCurrency + "_" + quoteCurrency).toUpperCase(), baseCurrency.toUpperCase(), quoteCurrency.toUpperCase()]
    }

    self.interfaceGetTickers = function interfaceGetTickers() {
        self.routineGetTicker = HttpQuery_Go("https://api.huobi.pro/market/tickers")
    }

    self.waitTickers = function waitTickers() {
        var ret = []
        var arr = JSON.parse(self.routineGetTicker.wait()).data
        _.each(arr, function(ele) {
            ret.push({
            	bid1: parseFloat(ele.bid), 
            	bid1Vol: parseFloat(ele.bidSize),
            	ask1: parseFloat(ele.ask), 
            	ask1Vol: parseFloat(ele.askSize),
            	symbol: formatSymbol(ele.symbol)[0],
            	type: "Spot", 
            	originalSymbol: ele.symbol
            })
        })
        return ret 
    }

    self.interfaceGetAcc = function interfaceGetAcc(symbol, updateTS) {
        if (self.updateAccsTS != updateTS) {
            self.routineGetAcc = self.e.Go("GetAccount")
        }
    }

    self.waitAcc = function waitAcc(symbol, updateTS) {
        var arr = formatSymbol(symbol)
        var ret = null 
        if (self.updateAccsTS != updateTS) {
            ret = self.routineGetAcc.wait().Info
            self.bufferGetAccRet = ret 
        } else {
            ret = self.bufferGetAccRet
        }
        if (!ret) {
            return null 
        }
        var acc = {symbol: symbol, Stocks: 0, FrozenStocks: 0, Balance: 0, FrozenBalance: 0, originalInfo: ret}
        _.each(ret.data.list, function(ele) {
            if (ele.currency == arr[1].toLowerCase()) {
                // baseCurrency
                if (ele.type == "trade") {
                    acc.Stocks = parseFloat(ele.balance)
                } else if (ele.type == "frozen") {
                    acc.FrozenStocks = parseFloat(ele.balance)
                }
            } else if (ele.currency == arr[2].toLowerCase()) {
                // quoteCurrency
                if (ele.type == "trade") {
                    acc.Balance = parseFloat(ele.balance)
                } else if (ele.type == "frozen") {
                    acc.FrozenBalance = parseFloat(ele.balance)
                }
            }
        })
        return acc
    }

    self.interfaceGetPos = function interfaceGetPos(symbol, price, initSpAcc, nowSpAcc) {
        var symbolInfo = self.getSymbolInfo(symbol)
        var sumInitStocks = initSpAcc.Stocks + initSpAcc.FrozenStocks
        var sumNowStocks = nowSpAcc.Stocks + nowSpAcc.FrozenStocks
        var diffStocks = _N(sumNowStocks - sumInitStocks, symbolInfo.amountPrecision)
        if (Math.abs(diffStocks) < symbolInfo.min / price) {
        	return []
        }
        return [{symbol: symbol, amount: diffStocks, price: null, originalInfo: {}}]
    }

    self.interfaceTrade = function interfaceTrade(symbol, type, price, amount) {
        if (typeof(self.account_id) == "undefined") {
            var acc = self.e.GetAccount()
            self.account_id = acc.Info.data.id
        }

        var tradeType = ""
        if (type == self.OPEN_LONG || type == self.COVER_SHORT) {
            tradeType = "buy-market"
        } else {
            tradeType = "sell-market"
        }

        var params = {
            "account-id": String(self.account_id),
            "symbol": symbol,
            "type": tradeType,
            "amount": String(amount),
        }
        self.routineTrade = self.e.Go("IO", "api", "POST", "/v1/order/orders/place", self.encodeParams(params))
    }

    self.waitTrade = function waitTrade() {
        return self.routineTrade.wait()
    }

    self.calcAmount = function calcAmount(symbol, type, price, amount) {
        // 获取交易对信息
        var symbolInfo = self.getSymbolInfo(symbol)
        if (!symbol) {
            throw symbol + "，交易对信息查询不到"
        }
        var tradeAmount = null 
        var equalAmount = null  // 记录币数
        if (type == self.OPEN_LONG || type == self.COVER_SHORT) {
            tradeAmount = _N(amount * price, parseFloat(symbolInfo.originalInfo["value-precision"]))
            // 检查最小交易量
            if (tradeAmount < symbolInfo.originalInfo["min-order-value"]) {
                Log(self.name, " tradeAmount:", tradeAmount, "小于", symbolInfo.originalInfo["min-order-value"])
                return false 
            }
            equalAmount = tradeAmount / price
        } else {
            tradeAmount = _N(amount, parseFloat(symbolInfo.originalInfo["amount-precision"]))
            // 检查最小交易量
            if (tradeAmount < symbolInfo.originalInfo["sell-market-min-order-amt"]) {
                Log(self.name, " tradeAmount:", tradeAmount, "小于", symbolInfo.originalInfo["sell-market-min-order-amt"])
                return false 
            }
            equalAmount = tradeAmount
        }
        return [tradeAmount, equalAmount]
    }

    self.init = function init() {
        var ret = JSON.parse(HttpQuery("https://api.huobi.pro/v1/common/symbols"))
        _.each(ret.data, function(symbolInfo) {
            self.symbolsInfo.push({
                symbol: symbolInfo.symbol,
                amountPrecision: parseFloat(symbolInfo["amount-precision"]),
                pricePrecision: parseFloat(symbolInfo["price-precision"]),
                multiplier: 1,
                min: parseFloat(symbolInfo["min-order-value"]),
                originalInfo: symbolInfo
            })
        })        
    }
}

// 币安现货
function funcConfigure_Binance(self) {
    var formatSymbol = function(originalSymbol) {
        // LTCBTC
        var baseCurrency = originalSymbol.replace(/(BTC|ETH|USDT|BNB|XRP|TRX|BUSD|EUR)$/, "")
        var quoteCurrency = originalSymbol.replace(baseCurrency, "")
        return [baseCurrency + "_" + quoteCurrency, baseCurrency, quoteCurrency]
    }

    self.interfaceGetTickers = function interfaceGetTickers() {
        self.routineGetTicker = HttpQuery_Go("https://api.binance.com/api/v3/ticker/bookTicker")
    }

    self.waitTickers = function waitTickers() {
        var ret = []
        var arr = JSON.parse(self.routineGetTicker.wait())
        _.each(arr, function(ele) {
            ret.push({
                bid1: parseFloat(ele.bidPrice), 
                bid1Vol: parseFloat(ele.bidQty),
                ask1: parseFloat(ele.askPrice), 
                ask1Vol: parseFloat(ele.askQty),
                symbol: formatSymbol(ele.symbol)[0],
                type: "Spot", 
                originalSymbol: ele.symbol
            })
        })
        return ret 
    }

    self.interfaceGetAcc = function interfaceGetAcc(symbol, updateTS) {
        if (self.updateAccsTS != updateTS) {
            self.routineGetAcc = self.e.Go("GetAccount")
        }
    }

    self.waitAcc = function waitAcc(symbol, updateTS) {
        var arr = formatSymbol(symbol)
        var ret = null 
        if (self.updateAccsTS != updateTS) {
            ret = self.routineGetAcc.wait().Info
            self.bufferGetAccRet = ret 
        } else {
            ret = self.bufferGetAccRet
        }
        if (!ret) {
            return null 
        }
        var acc = {symbol: symbol, Stocks: 0, FrozenStocks: 0, Balance: 0, FrozenBalance: 0, originalInfo: ret}
        _.each(ret.balances, function(ele) {
            if (ele.asset == arr[1]) {
                // baseCurrency
                acc.Stocks = parseFloat(ele.free)
                acc.FrozenStocks = parseFloat(ele.locked)
            } else if (ele.asset == arr[2]) {
                // quoteCurrency
                acc.Balance = parseFloat(ele.free)
                acc.FrozenBalance = parseFloat(ele.locked)
            }
        })
        return acc
    }

    self.interfaceGetPos = function interfaceGetPos(symbol, price, initSpAcc, nowSpAcc) {
        var symbolInfo = self.getSymbolInfo(symbol)
        var sumInitStocks = initSpAcc.Stocks + initSpAcc.FrozenStocks
        var sumNowStocks = nowSpAcc.Stocks + nowSpAcc.FrozenStocks
        var diffStocks = _N(sumNowStocks - sumInitStocks, symbolInfo.amountPrecision)
        if (Math.abs(diffStocks) < symbolInfo.min / price) {
            return []
        }
        return [{symbol: symbol, amount: diffStocks, price: null, originalInfo: {}}]
    }

    self.interfaceTrade = function interfaceTrade(symbol, type, price, amount) {
        var tradeType = ""
        var amountKeyName = ""
        if (type == self.OPEN_LONG || type == self.COVER_SHORT) {
            tradeType = "BUY"
            amountKeyName = "quoteOrderQty"
        } else {
            tradeType = "SELL"
            amountKeyName = "quantity"
        }

        var params = {
            "symbol" : symbol,
            "side" : tradeType,
            "type" : "MARKET"
        }
        params[amountKeyName] = String(amount)
        // Log("params:", params, "encodeParams:", self.encodeParams(params))
        self.routineTrade = self.e.Go("IO", "api", "POST", "/api/v3/order", self.encodeParams(params))
    }

    self.waitTrade = function waitTrade() {
        return self.routineTrade.wait()
    }

    self.calcAmount = function calcAmount(symbol, type, price, amount) {
        var symbolInfo = self.getSymbolInfo(symbol)
        if (!symbolInfo) {
            throw symbol + "，交易对信息查询不到"
        }
        var tradeAmount = null 
        var equalAmount = null 
        if (type == self.OPEN_LONG || type == self.COVER_SHORT) {
            tradeAmount = _N(amount * price, symbolInfo.amountPrecision)
            if (tradeAmount < symbolInfo.min) {
                Log(self.name, " tradeAmount:", tradeAmount, "小于", symbolInfo.min)
                return false 
            }
            equalAmount = tradeAmount / price
        } else {
            tradeAmount = _N(amount, symbolInfo.amountPrecision)
            if (tradeAmount * price < symbolInfo.min) {
                Log(self.name, " tradeAmount:", tradeAmount, "小于", symbolInfo.min)
                return false 
            }
            equalAmount = tradeAmount
        }
        return [tradeAmount, equalAmount]
    }

    self.init = function init() {
        // GET /api/v3/exchangeInfo
        var ret = JSON.parse(HttpQuery("https://api.binance.com/api/v3/exchangeInfo"))
        _.each(ret.symbols, function(symbolInfo) {
            var min = null 
            var amountPrecision = null 
            var pricePrecision = null 
            _.each(symbolInfo.filters, function(filter) {
                if (filter.filterType == "PRICE_FILTER") {
                    pricePrecision = self.judgePrecision(parseFloat(filter.tickSize))
                } else if (filter.filterType == "LOT_SIZE") {
                    amountPrecision = self.judgePrecision(parseFloat(filter.minQty))
                    // min = parseFloat(filter.minQty)   // 可能还要考虑名义价值即金额
                } else if (filter.filterType == "MIN_NOTIONAL") {
                    min = parseFloat(filter.minNotional)
                }
            })
            self.symbolsInfo.push({
                symbol : symbolInfo.symbol,
                amountPrecision : parseFloat(amountPrecision),
                pricePrecision : parseFloat(pricePrecision),
                multiplier : 1,
                min : min,
                originalInfo : symbolInfo
            })
        })
    }
}

function funcConfigure_WexApp(self) {
    var formatSymbol = function(originalSymbol) {
        // BTC_USDT
        var arr = originalSymbol.split("_")
        var baseCurrency = arr[0]
        var quoteCurrency = arr[1]
        return [originalSymbol, baseCurrency, quoteCurrency]
    }

    self.interfaceGetTickers = function interfaceGetTickers() {
        self.routineGetTicker = HttpQuery_Go("https://api.wex.app/api/v1/public/tickers")
    }

    self.waitTickers = function waitTickers() {
        var ret = []
        var arr = JSON.parse(self.routineGetTicker.wait()).data
        _.each(arr, function(ele) {
            ret.push({
                bid1: parseFloat(ele.buy), 
                bid1Vol: parseFloat(-1),
                ask1: parseFloat(ele.sell), 
                ask1Vol: parseFloat(-1),
                symbol: formatSymbol(ele.market)[0],
                type: "Spot", 
                originalSymbol: ele.market
            })
        })
        return ret 
    }

    self.interfaceGetAcc = function interfaceGetAcc(symbol, updateTS) {
        if (self.updateAccsTS != updateTS) {
            self.routineGetAcc = self.e.Go("GetAccount")
        }
    }

    self.waitAcc = function waitAcc(symbol, updateTS) {
        var arr = formatSymbol(symbol)
        var ret = null 
        if (self.updateAccsTS != updateTS) {
            ret = self.routineGetAcc.wait().Info
            self.bufferGetAccRet = ret 
        } else {
            ret = self.bufferGetAccRet
        }
        if (!ret) {
            return null 
        }        
        var acc = {symbol: symbol, Stocks: 0, FrozenStocks: 0, Balance: 0, FrozenBalance: 0, originalInfo: ret}
        _.each(ret.exchange, function(ele) {
            if (ele.currency == arr[1]) {
                // baseCurrency
                acc.Stocks = parseFloat(ele.free)
                acc.FrozenStocks = parseFloat(ele.frozen)
            } else if (ele.currency == arr[2]) {
                // quoteCurrency
                acc.Balance = parseFloat(ele.free)
                acc.FrozenBalance = parseFloat(ele.frozen)
            }
        })
        return acc
    }

    self.interfaceGetPos = function interfaceGetPos(symbol, price, initSpAcc, nowSpAcc) {
        var symbolInfo = self.getSymbolInfo(symbol)
        var sumInitStocks = initSpAcc.Stocks + initSpAcc.FrozenStocks
        var sumNowStocks = nowSpAcc.Stocks + nowSpAcc.FrozenStocks
        var diffStocks = _N(sumNowStocks - sumInitStocks, symbolInfo.amountPrecision)
        if (Math.abs(diffStocks) < symbolInfo.min / price) {
            return []
        }
        return [{symbol: symbol, amount: diffStocks, price: null, originalInfo: {}}]
    }

    self.interfaceTrade = function interfaceTrade(symbol, type, price, amount) {
        var tradeType = ""
        if (type == self.OPEN_LONG || type == self.COVER_SHORT) {
            tradeType = "bid"
        } else {
            tradeType = "ask"
        }
        var params = {
            "market": symbol,
            "side": tradeType,
            "amount": String(amount),
            "price" : String(-1),
            "type" : "market"
        }
        self.routineTrade = self.e.Go("IO", "api", "POST", "/api/v1/private/order", self.encodeParams(params))
    }

    self.waitTrade = function waitTrade() {
        return self.routineTrade.wait()
    }

    self.calcAmount = function calcAmount(symbol, type, price, amount) {
        // 获取交易对信息
        var symbolInfo = self.getSymbolInfo(symbol)
        if (!symbol) {
            throw symbol + "，交易对信息查询不到"
        }
        var tradeAmount = null 
        var equalAmount = null  // 记录币数
        if (type == self.OPEN_LONG || type == self.COVER_SHORT) {
            tradeAmount = _N(amount * price, parseFloat(symbolInfo.pricePrecision))
            // 检查最小交易量
            if (tradeAmount < symbolInfo.min) {
                Log(self.name, " tradeAmount:", tradeAmount, "小于", symbolInfo.min)
                return false 
            }
            equalAmount = tradeAmount / price
        } else {
            tradeAmount = _N(amount, parseFloat(symbolInfo.amountPrecision))
            // 检查最小交易量
            if (tradeAmount < symbolInfo.min / price) {
                Log(self.name, " tradeAmount:", tradeAmount, "小于", symbolInfo.min / price)
                return false 
            }
            equalAmount = tradeAmount
        }
        return [tradeAmount, equalAmount]
    }

    self.init = function init() {
        var ret = JSON.parse(HttpQuery("https://api.wex.app/api/v1/public/markets"))
        _.each(ret.data, function(symbolInfo) {
            self.symbolsInfo.push({
                symbol: symbolInfo.pair,
                amountPrecision: parseFloat(symbolInfo.basePrecision),
                pricePrecision: parseFloat(symbolInfo.quotePrecision),
                multiplier: 1,
                min: parseFloat(symbolInfo.minQty),
                originalInfo: symbolInfo
            })
        })        
    }
}

// OKEX期货 V5 
function funcConfigure_Futures_OKEX_V5(self) {
    var formatSymbol = function(originalSymbol) {        
        var arr = originalSymbol.split("-")               // LTC-USD-SWAP
        return [arr[0] + "_" + arr[1], arr[0], arr[1]]
    }

    var getInstType = function() {
        var isSwap = null
        for (var i = 0 ; i < self.subscribeSymbols.length ; i++) {            
            if (i == 0) {
                isSwap = self.subscribeSymbols[i].includes("-SWAP")
            } else if (isSwap != self.subscribeSymbols[i].includes("-SWAP")) {
                throw "订阅的合约中混合了交割、永续"
            }
        }
        return isSwap ? "SWAP" : "FUTURES"
    }

    self.interfaceGetTickers = function interfaceGetTickers() {
        self.routineGetTicker = HttpQuery_Go("https://www.okex.com/api/v5/market/tickers?instType=" + getInstType())
    }  

    self.waitTickers = function waitTickers() {
        var ret = []
        var arr = JSON.parse(self.routineGetTicker.wait()).data
        _.each(arr, function(ele) {
            ret.push({
                bid1: parseFloat(ele.bidPx), 
                bid1Vol: parseFloat(ele.bidSz), 
                ask1: parseFloat(ele.askPx), 
                ask1Vol: parseFloat(ele.askSz), 
                symbol: formatSymbol(ele.instId)[0], 
                type: "Futures", 
                originalSymbol: ele.instId
            })
        })
        return ret 
    }

    self.interfaceGetAcc = function interfaceGetAcc(symbol, updateTS) {
        if (self.updateAccsTS != updateTS) {      // 如果新的一轮获取账户信息才去创建并发数据
            self.routineGetAcc = self.e.Go("IO", "api", "GET", "/api/v5/account/balance")
        }
    }  

    self.waitAcc = function waitAcc(symbol, updateTS) {
        var ret = null 
        if (self.updateAccsTS != updateTS) {      // 如果新的一轮获取账户信息才去获取并发数据
            ret = self.routineGetAcc.wait()    
            self.bufferGetAccRet = ret            // 由于交易所资产数据接口返回的是全部信息，避免重复调用，缓存 
        } else {                                  // 如果时间戳相等，说明是同一轮，用缓存数据
            ret = self.bufferGetAccRet
        }
        if (!ret) {
            return null 
        }
        var arrCurrencyName = formatSymbol(symbol)
        var quoteCurrency = arrCurrencyName[2]
        var baseCurrency = arrCurrencyName[1]
        var acc = null 
        _.each(ret.data, function(obj) {
            _.each(obj.details, function(detail) {
                if (detail.availEq == "") {
                    throw "Account-level too low"
                } else if (quoteCurrency == "USDT" && detail.ccy == quoteCurrency) {
                    acc = {symbol: symbol, Stocks: 0, FrozenStocks: 0, Balance: detail.availEq, FrozenBalance: detail.ordFrozen, originalInfo: ret}
                } else if (quoteCurrency == "USD" && detail.ccy == baseCurrency) {
                    acc = {symbol: symbol, Stocks: detail.availEq, FrozenStocks: detail.ordFrozen, Balance: 0, FrozenBalance: 0, originalInfo: ret}
                }
            })
        })
        return acc
    }  

    self.interfaceGetPos = function interfaceGetPos(symbol, updateTS) {    // 期货和现货的实现不一样
        var symbolInfo = self.getSymbolInfo(symbol)
        var arrCurrencyName = formatSymbol(symbol)
        var instType = "FUTURES"
        if (symbol.includes("-SWAP")) {
            instType = "SWAP"
        }
        var ret = self.e.IO("api", "GET", "/api/v5/account/positions", "instType=" + instType + "&instId=" + symbol)
        var positions = []
        // {"code":"0","data":[],"msg":""}
        _.each(ret.data, function(ele) {
            if (Math.abs(parseFloat(ele.pos)) > 0) {
                if (ele.posSide == "long" || (ele.posSide == "net" && parseFloat(ele.pos) > 0)) {
                    positions.push({symbol: ele.instId, amount: Math.abs(parseFloat(ele.pos)) * symbolInfo.multiplier, price: parseFloat(ele.avgPx), marginLevel: parseFloat(ele.lever), originalInfo: ele})
                } else if (ele.posSide == "short" || (ele.posSide == "net" && parseFloat(ele.pos) < 0)) {
                    positions.push({symbol: ele.instId, amount: -Math.abs(parseFloat(ele.pos)) * symbolInfo.multiplier, price: parseFloat(ele.avgPx), marginLevel: parseFloat(ele.lever), originalInfo: ele})
                }
            }         
        })
        return positions
    }

    self.interfaceTrade = function interfaceTrade(symbol, type, price, amount) {
    	var params = {
    		"instId" : symbol,
    		"tdMode" : "cross",
    		"ordType" : "market",
    		"sz" : String(amount)
    	}

    	switch(type) {
        case self.OPEN_LONG:
            params["side"] = "buy"
            params["posSide"] = "long"
            break
        case self.OPEN_SHORT: 
            params["side"] = "sell"
            params["posSide"] = "short"
            break
        case self.COVER_LONG: 
            params["side"] = "sell"
            params["posSide"] = "long"
            break        
        case self.COVER_SHORT:
            params["side"] = "buy"
            params["posSide"] = "short"
            break        
        default:
            throw "type error, type:" + type
    	}
        self.routineTrade = self.e.Go("IO", "api", "POST", "/api/v5/trade/order", self.encodeParams(params))
    }  

    self.waitTrade = function waitTrade() {
        return self.routineTrade.wait()
    }  

    self.calcAmount = function calcAmount(symbol, type, price, amount, isNotLog) {
        var symbolInfo = self.getSymbolInfo(symbol)
        if (!symbolInfo) {
        	throw symbol + "，交易对信息查询不到"
        }
        var tradeAmount = _N(amount / symbolInfo.multiplier, 0)        
        if (tradeAmount < parseFloat(symbolInfo.min)) {
            if (typeof(isNotLog) == "undefined") {
                Log(self.name, " tradeAmount:", tradeAmount, "小于", parseFloat(symbolInfo.min))
            }     	
        	return false 
        }
        return [tradeAmount, tradeAmount * symbolInfo.multiplier]
    }  
    // 实现设置杠杆接口
    self.interfaceSetMarginLevel = function interfaceSetMarginLevel(symbol, marginLevel) {
        return self.e.IO("api", "POST", "/api/v5/account/set-leverage", self.encodeParams({"instId" : symbol, "ccy" : "USDT", "lever" : String(marginLevel), "mgnMode" : "cross"}))
    }

    self.interfaceCalcProfit = function interfaceCalcProfit(arrInitAcc, arrNowAcc) {
    	var profit = 0
    	if (arrInitAcc.length > 0 && arrNowAcc.length > 0) {
    		var initEq = 0
    		_.each(arrInitAcc[0].originalInfo.data, function(obj) {
    			_.each(obj.details, function(detail) {
    				if (detail.availEq == "") {
    					throw "Account-level too low"
    				} else if (detail.ccy == "USDT") {
    					initEq = detail.eq
    				}
    			})
    		})
    		var nowEq = 0
    		_.each(arrNowAcc[0].originalInfo.data, function(obj) {
    			_.each(obj.details, function(detail) {
    				if (detail.availEq == "") {
    					throw "Account-level too low"
    				} else if (detail.ccy == "USDT") {
    					nowEq = detail.eq
    				}
    			})
    		})
    		return nowEq - initEq
    	} else {
    		Log("计算收益失败", arrInitAcc, arrNowAcc)
    		return 
    	}
        return profit
    }  

    self.init = function init() {
        _.each(["SWAP", "FUTURES"], function(instType) {          // 永续、交割合约信息都获取
            var ret = JSON.parse(HttpQuery("https://www.okex.com/api/v5/public/instruments?instType=" + instType))
            _.each(ret.data, function(symbolInfo) {
                self.symbolsInfo.push({
                    symbol: symbolInfo.instId,
                    amountPrecision: self.judgePrecision(parseFloat(symbolInfo.lotSz)),
                    pricePrecision: self.judgePrecision(parseFloat(symbolInfo.tickSz)),
                    multiplier: parseFloat(symbolInfo.ctVal),
                    min: parseFloat(symbolInfo.minSz),                                                                      // OKEX 合约最小下1张
                    originalInfo: symbolInfo
                })
            })
        })
    }
}

// 交易所对象构造函数
function createBaseEx(e, funcConfigure) {
    var self = {}
    self.e = e 
    self.funcConfigure = funcConfigure
    self.name = e.GetName()
    self.type = self.name.includes("Futures_") ? "Futures" : "Spot"
    self.label = e.GetLabel()
    self.fuMarginLevel = null 

    // 数据成员
    self.subscribeSymbols = []     // 订阅的标的物
    self.bufferTickers = []        // 缓存市场全部行情数据
    self.bufferAccs = []           // 缓存订阅的账户资产数据
    self.bufferPositions = []      // 缓存订阅的持仓数据
    self.symbolsInfo = []          // 记录市场所有标的物信息数组
    self.bufferGetAccRet = null    // 访问资产信息接口缓存数据
    self.bufferGetPosRet = null    // 访问持仓信息接口缓存数据

    // 更新时间戳
    self.updateAccsTS = 0          // 更新账户信息的时间戳
    self.updatePosTS = 0           // 更新持仓信息的时间戳

    // 并发线程
    self.routineGetTicker = null 
    self.routineGetAcc = null 
    self.routineTrade = null 

    // 枚举
    self.OPEN_LONG = 0
    self.OPEN_SHORT = 1
    self.COVER_LONG = 2
    self.COVER_SHORT = 3

    // 需要实现的接口列表
    var configList = ["interfaceGetTickers", "interfaceGetAcc", "interfaceGetPos", "interfaceTrade", 
        "waitTickers", "waitAcc", "waitTrade", "calcAmount", "init"]
    if (self.type == "Futures") {
        configList.push("interfaceSetMarginLevel")   // 期货还需要设置杠杆接口
        configList.push("interfaceCalcProfit")       // 期货需要计算收益接口
    }
    // 需要实现的接口
    self.interfaceGetTickers = null   // 创建异步获取聚合行情数据线程的函数
    self.interfaceGetAcc = null       // 创建异步获取账户数据线程的函数
    self.interfaceGetPos = null       // 获取持仓
    self.interfaceTrade = null        // 创建并发下单
    self.waitTickers = null           // 等待并发行情数据 
    self.waitAcc = null               // 等待账户并发数据
    self.waitTrade = null             // 等待下单并发数据
    self.calcAmount = null            // 根据交易对精度等数据计算下单量
    self.init = null                  // 初始化工作，获取精度等数据

    // 回调函数
    self.callBack_getTrade = null     // 执行getTrade 时需要的回调

    // 判断精度
    self.judgePrecision = function(p) {
        var arr = p.toString().split(".")
        if (arr.length != 2) {
            if (arr.length == 1) {
                return 0
            }
            throw "judgePrecision error, p:" + String(p)
        }
        return arr[1].length
    }

    // 获取某个交易对的信息
    self.getSymbolInfo = function(symbol) {
        var ret = null 
        _.each(self.symbolsInfo, function(info) {
            if (info.symbol == symbol) {
                ret = info
            }
        })
        return ret 
    }

    self.getExName = function() {    // 获取交易所对象的名称
        return self.name
    }

    self.pushInArr = function(arr, obj, attributeName) {
        var isFind = false 
        _.each(arr, function(ele) {
        	if (obj[attributeName] == ele[attributeName]) {
        		ele = obj
        		isFind = true 
        	}
        })
        if (!isFind) {
        	arr.push(obj)
        }
    }

    // encodeParams
    self.encodeParams = function(params) {
        var ret = ""
        var index = 0
        for (var key in params) {
            if (index == 0) {
                ret += key + "=" + params[key]
            } else {
                ret += "&" + key + "=" + params[key]
            }            
            index++
        }
        return ret 
    }

    // 成员函数        
    self.tryProcess = function(tryFunc, args) {   // 发生异常返回空值，正常返回tryFunc函数调用结果
        var ret = null 
        try {
            ret = tryFunc.apply(this, args)
        } catch (err) {
            var funcName = tryFunc.toString().match(/function\s*([^(]*)\(/)[1]   // 获取函数名称
            Log("错误：", err, " 错误信息：", typeof(err.message) == "string" ? err.message : "", " 异常函数名：", funcName, " 参数：", typeof(args) == "undefined" ? "无" : args)    // 输出引发异常的函数信息
            return null
        }
        return ret 
    }

    // 写入订阅品种到 subscribeSymbols
    self.pushSubscribeSymbol = function(symbol) {    // 只在初始化时调用，写入订阅合约，用于接口中判断订阅的合约
        self.subscribeSymbols.push(symbol)
    }

    // 创建获取行情并发
    self.goGetTickers = function() {                 
        self.interfaceGetTickers()
    }

    // 获取并发行情数据
    self.getTickers = function() {                   // 取并发结果，使用tryProcess 如果发生异常会报错，不会导致程序停止
        var ret = self.tryProcess(self.waitTickers)
        // 缓存数据
        if (ret) {
            self.bufferTickers = ret
        }
        return ret 
    }

    // 创建下单并发
    self.goGetTrade = function(symbol, type, price, amount) {      // 创建并发下单，不检测异常
        self.interfaceTrade(symbol, type, price, amount)
        // 设置回调
        self.callBack_getTrade = function(ret) {
            if (self.type == "Futures") {
                if (type == self.OPEN_LONG || type == self.OPEN_SHORT) {    
                    self.e.SetDirection(type == self.OPEN_SHORT ? "sell" : "buy")                   // 正套期货做空
                } else {
                    self.e.SetDirection(type == self.COVER_SHORT ? "closesell" : "closebuy")        // 平正套期货平空仓
                }
            }
            self.e.Log((type == self.OPEN_LONG || type == self.COVER_SHORT) ? LOG_TYPE_BUY : LOG_TYPE_SELL, price, amount, symbol, ret)
        }
    }

    // 获取下单结果
    self.getTrade = function() {
        var retTradeMsg = self.tryProcess(self.waitTrade)
        if (retTradeMsg) {
            self.callBack_getTrade(retTradeMsg)
        }
        return retTradeMsg
    }

    // 创建获取单个资产并发
    self.goGetAcc = function(symbol, updateTS) {
        self.interfaceGetAcc(symbol, updateTS)
    }

    // 获取单个标的物相关资产信息
    self.getAcc = function(symbol, updateTS) {
        var ret = self.tryProcess(self.waitAcc, [symbol, updateTS])
        // 缓存数据
        if (ret) {
            // 更新 bufferAccs 中的数据
            self.pushInArr(self.bufferAccs, ret, "symbol")
            self.updateAccsTS = updateTS    // 更新，记录时间戳，对于逐个账户信息获取的接口不影响（具体看接口实现）
        }
        return ret
    }

    self.getFuPos = function(symbol, updateTS) {                               // 获取期货持仓
        var ret = self.tryProcess(self.interfaceGetPos, [symbol, updateTS])
        if (ret) {
        	_.each(ret, function(pos) {
        		self.pushInArr(self.bufferPositions, pos, "symbol")
        	})
            self.updatePosTS = updateTS
        }
        return ret 
    }

    self.getSpPos = function(symbol, price, initSpAcc, nowSpAcc) {   // 获取现货持仓
    	var ret = self.tryProcess(self.interfaceGetPos, [symbol, price, initSpAcc, nowSpAcc])
        if (ret) {
        	// self.bufferPositions = ret        	
        	_.each(ret, function(pos) {
        		self.pushInArr(self.bufferPositions, pos, "symbol")
        	})
        }
        if (ret.length > 1) {
        	Log("现货持仓返回数据错误！", JSON.stringify(ret))
        }
        return ret
    }

    self.setMarginLevel = function(symbol, marginLevel) {    	
    	var ret = self.tryProcess(self.interfaceSetMarginLevel, [symbol, marginLevel])
    	if (ret) {
    		self.fuMarginLevel = marginLevel
    	}
    	return ret 
    }

    self.calcProfit = function(arrInitAcc, arrNowAcc) {
    	if (self.type == "Futures") {    		
			return self.tryProcess(self.interfaceCalcProfit, [arrInitAcc, arrNowAcc])    		
    	} else {
    		throw "调用错误"
    	}
    }

    // 执行配置函数，给对象配置
    funcConfigure(self)

    // 检测configList约定的接口是否都实现
    _.each(configList, function(funcName) {
        if (!self[funcName]) {
            throw "接口" + funcName + "未实现"
        }
    })

    // self.tryProcess(self.init)    // 执行接口配置中实现的init函数
    self.init()                      // 不做异常检测，发生错误程序停止，执行接口配置中实现的init函数
    return self
}

// 导出函数
$.createBaseEx = createBaseEx
$.getConfigureFunc = function(exName) {
    dicRegister = {
        "Futures_OKCoin" : funcConfigure_Futures_OKCoin,
        "Huobi" : funcConfigure_Huobi,
        "Futures_Binance" : funcConfigure_Futures_Binance,
        "Binance" : funcConfigure_Binance,
        "WexApp" : funcConfigure_WexApp,
        "Futures_OKCoin_V5" : funcConfigure_Futures_OKEX_V5,        // exchange.GetName() + "_V5"
    }
    if (typeof(exName) != "undefined" && !dicRegister[exName]) {
        throw "未找到匹配的交易所配置函数"
    }
    return dicRegister
}

// 测试函数
function main() {
    // 切换为模拟盘环境
    // exchange.IO("simulate", true)   // OKEX V5 切换模拟盘

    var fuExName = exchange.GetName() + "_V5"    // 获取交易所名称，这里设置为OKEX V5
    Log("测试的交易所名称为：", fuExName)
    var fuConfigureFunc = $.getConfigureFunc()[fuExName]
    var ex = $.createBaseEx(exchange, fuConfigureFunc)

    var arrTestSymbol = ["ETH-USDT-211231"]
    var ts = new Date().getTime()
    // 设置需要订阅的合约
    // /*
    _.each(arrTestSymbol, function(symbol) {
        ex.pushSubscribeSymbol(symbol)
    })
    // */

    _.each(arrTestSymbol, function(symbol) {
        // 测试获取行情
        /*
        ex.goGetTickers()
        var tickers = ex.getTickers()
        Log("tickers:", tickers)
        _.each(tickers, function(ticker) {
            if (symbol == ticker.originalSymbol) {
                Log(symbol, ticker)
            }
        })
        */

        // 测试获取账户信息
        // /*
        ex.goGetAcc(symbol, ts)
        var acc = ex.getAcc(symbol, ts)
        Log("acc:", acc.symbol, acc)

        var arr1 = [acc]
        var arr2 = [acc]
        Log(ex.interfaceCalcProfit(arr1, arr2))
        // */

        // 测试获取持仓信息
        /*
        var pos = ex.getFuPos(symbol)  // 期货持仓
        Log("pos:", symbol, pos)
        // 打印交易对信息
        _.each(ex.symbolsInfo, function(symbolInfo) {
            if (_.contains(arrTestSymbol, symbolInfo.symbol)) {
                Log("symbolInfo:", symbolInfo)
            }
        })
        */

        // 下单测试
        /*
        if (symbol == "LTC-USDT-SWAP") {
            var price = 170 + 170 * 0.02
            var amount = 1
            var tradeType = ex.OPEN_LONG
            var retCalc = ex.calcAmount(symbol, tradeType, price, amount)
            if (retCalc) {
                Log("retCalc:", retCalc)
                Log("symbolInfo:", ex.getSymbolInfo(symbol))
                var setMarginLevelRet = ex.setMarginLevel(symbol, 5)
                Log("setMarginLevelRet:", setMarginLevelRet)  // 打印持仓设置
                ex.goGetTrade(symbol, tradeType, price, retCalc[0])    // 测试开多
                // ex.goGetTrade(symbol, ex.COVER_LONG, -1, 0.004)   // 测试平多
                var ret = ex.getTrade()
                Log(symbol, "trade ret:", ret)
            }
        }
        */

        /* 单独测试杠杆
        var ret = ex.setMarginLevel(symbol, 35)
        Log(ret)
        */

        /*
        if (symbol == "LTCUSDT") {
            var price = 230
            var amount = 0.01
            var tradeType = ex.OPEN_SHORT
            var retCalc = ex.calcAmount(symbol, tradeType, price, amount)
            if (retCalc) {
                Log("symbolInfo:", ex.getSymbolInfo(symbol))
                // ex.setMarginLevel(symbol, 5)
                ex.goGetTrade(symbol, tradeType, price, retCalc[0])    // 测试开多
                // ex.goGetTrade(symbol, ex.COVER_LONG, -1, 0.004)   // 测试平多
                var ret = ex.getTrade()
                Log(symbol, "trade ret:", ret)
            }
        }
        */
    })
}


```

> Detail

https://www.fmz.com/strategy/276298

> Last Modified

2022-05-18 11:35:37
