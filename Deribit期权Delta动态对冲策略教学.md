
> Name

Deribit期权Delta动态对冲策略教学

> Author

小小梦

> Strategy Description

## Deribit期权Delta动态对冲策略（教学）

文章地址：https://www.fmz.com/bbs-topic/6726

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|isTestNet|true|是否切换为模拟盘|
|testNetBase|https://test.deribit.com|模拟盘基地址|
|hedgeDeltaStep|true|Delta对冲步长|
|isResetLog|true|是否清空日志|




|Button|Default|Description|
|----|----|----|
|setContractType||设置期权合约|
|buyOption||买入期权合约|
|sellOption||卖出期权合约|
|setHedgeDeltaStep|true|设置对冲阈值|


> Source (javascript)

``` javascript
// 构造函数
function createManager(e, subscribeList, msg) {
	var self = {}
    self.supportList = ["Futures_Binance", "Huobi", "Futures_Deribit"]  // 支持的交易所的

    // 对象属性
    self.e = e
    self.msg = msg
    self.name = e.GetName()
    self.type = self.name.includes("Futures_") ? "Futures" : "Spot"
    self.label = e.GetLabel()
    self.quoteCurrency = ""  
    self.subscribeList = subscribeList   // subscribeList : [strSymbol1, strSymbol2, ...]
    self.tickers = []                    // 接口获取的所有行情数据，定义数据格式：{bid1: 123, ask1: 123, symbol: "xxx"}}
    self.subscribeTickers = []           // 需要的行情数据，定义数据格式：{bid1: 123, ask1: 123, symbol: "xxx"}}
    self.accData = null 
    self.pos = null 

    // 初始化函数
    self.init = function() { 
    	// 判断是否支持该交易所
        if (!_.contains(self.supportList, self.name)) {        	
        	throw "not support"
        }
    }

    self.setBase = function(base) {
        // 切换基地址，用于切换为模拟盘
        self.e.SetBase(base)
        Log(self.name, self.label, "切换为模拟盘:", base)
    }

    // 判断数据精度
    self.judgePrecision = function (p) {
        var arr = p.toString().split(".")
        if (arr.length != 2) {
            if (arr.length == 1) {
                return 0
            }
            throw "judgePrecision error, p:" + String(p)
        }
        
        return arr[1].length
    }

    // 更新资产
    self.updateAcc = function(callBackFuncGetAcc) {
        var ret = callBackFuncGetAcc(self)
        if (!ret) {
        	return false 
        }
        self.accData = ret 
        return true 
    }

    // 更新持仓
    self.updatePos = function(httpMethod, url, params) {
        var pos = self.e.IO("api", httpMethod, url, params)
        var ret = []
        if (!pos) {
            return false 
        } else {
            // 整理数据
            // {"jsonrpc":"2.0","result":[],"usIn":1616484238870404,"usOut":1616484238870970,"usDiff":566,"testnet":true}
            try {
                _.each(pos.result, function(ele) {
                    ret.push(ele)
                })
            } catch(err) {
                Log("错误：", err)
                return false 
            }
            self.pos = ret
        }
        return true 
    }

    // 更新行情数据
    self.updateTicker = function(url, callBackFuncGetArr, callBackFuncGetTicker) {
    	var tickers = []
    	var subscribeTickers = []
    	var ret = self.httpQuery(url)
    	if (!ret) {
    		return false 
    	}
    	// Log("测试", ret)// 测试
    	try {
            _.each(callBackFuncGetArr(ret), function(ele) {
            	var ticker = callBackFuncGetTicker(ele)
            	tickers.push(ticker)
                if (self.subscribeList.length == 0) {
                    subscribeTickers.push(ticker)
                } else {
                	for (var i = 0 ; i < self.subscribeList.length ; i++) {                        
                    	if (self.subscribeList[i] == ticker.symbol) {
                    		subscribeTickers.push(ticker)
                    	}
                	}
                }
            })
        } catch(err) {
        	Log("错误：", err)
        	return false 
        }

        self.tickers = tickers
        self.subscribeTickers = subscribeTickers
        return true 
    }

    self.getTicker = function(symbol) {
    	var ret = null 
    	_.each(self.subscribeTickers, function(ticker) {
    		if (ticker.symbol == symbol) {
    			ret = ticker
    		}
    	})
    	return ret 
    }

    self.httpQuery = function(url) {
    	var ret = null
        try {
            var retHttpQuery = HttpQuery(url)
            ret = JSON.parse(retHttpQuery)
        } catch (err) {
            // Log("错误:", err)
            ret = null
        }
        return ret 
    }

    self.returnTickersTbl = function() {
        var tickersTbl = {
        	type : "table", 
        	title : "tickers",
        	cols : ["symbol", "ask1", "bid1"], 
        	rows : []
        }
        _.each(self.subscribeTickers, function(ticker) {        
        	tickersTbl.rows.push([ticker.symbol, ticker.ask1, ticker.bid1])
        })
        return tickersTbl
    }
    
    // 返回持仓表格
    self.returnPosTbl = function() {
        var posTbl = {
            type : "table", 
            title : "pos|" + self.msg,
            cols : ["instrument_name", "mark_price", "direction", "size", "delta", "index_price", "average_price", "settlement_price", "average_price_usd", "total_profit_loss"], 
            rows : []
        }
        /* 接口返回的持仓数据格式
        {
            "mark_price":0.1401105,"maintenance_margin":0,"instrument_name":"BTC-25JUN21-28000-P","direction":"buy",
            "vega":5.66031,"total_profit_loss":0.01226105,"size":0.1,"realized_profit_loss":0,"delta":-0.01166,"kind":"option",
            "initial_margin":0,"index_price":54151.77,"floating_profit_loss_usd":664,"floating_profit_loss":0.000035976,
            "average_price_usd":947.22,"average_price":0.0175,"theta":-7.39514,"settlement_price":0.13975074,"open_orders_margin":0,"gamma":0
        }
        */
        _.each(self.pos, function(ele) {
        	if(ele.direction != "zero") {
                posTbl.rows.push([ele.instrument_name, ele.mark_price, ele.direction, ele.size, ele.delta, ele.index_price, ele.average_price, ele.settlement_price, ele.average_price_usd, ele.total_profit_loss])
            }
        })
        return posTbl
    }

    self.returnOptionTickersTbls = function() {
        var arr = []
        var arrDeliveryDate = []
        _.each(self.subscribeTickers, function(ticker) {
            if (self.name == "Futures_Deribit") {
                var arrInstrument_name = ticker.symbol.split("-")
                var currency = arrInstrument_name[0]
                var deliveryDate = arrInstrument_name[1]
                var deliveryPrice = arrInstrument_name[2]
                var optionType = arrInstrument_name[3]

                if (!_.contains(arrDeliveryDate, deliveryDate)) {
                    arr.push({
                        type : "table", 
                        title : arrInstrument_name[1],
                        cols : ["PUT symbol", "ask1", "bid1", "mark_price", "underlying_price", "CALL symbol", "ask1", "bid1", "mark_price", "underlying_price"], 
                        rows : []
                    })
                    arrDeliveryDate.push(arrInstrument_name[1])
                }
                // 遍历arr
                _.each(arr, function(tbl) {
                    if (tbl.title == deliveryDate) {
                        if (tbl.rows.length == 0 && optionType == "P") {
                            tbl.rows.push([ticker.symbol, ticker.ask1, ticker.bid1, ticker.mark_price, ticker.underlying_price, "", "", "", "", ""])
                            return 
                        } else if (tbl.rows.length == 0 && optionType == "C") {
                            tbl.rows.push(["", "", "", "", "", ticker.symbol, ticker.ask1, ticker.bid1, ticker.mark_price, ticker.underlying_price])
                            return 
                        }                        
                        for (var i = 0 ; i < tbl.rows.length ; i++) {
                            if (tbl.rows[i][0] == "" && optionType == "P") {
                                tbl.rows[i][0] = ticker.symbol
                                tbl.rows[i][1] = ticker.ask1
                                tbl.rows[i][2] = ticker.bid1
                                tbl.rows[i][3] = ticker.mark_price
                                tbl.rows[i][4] = ticker.underlying_price
                                return 
                            } else if(tbl.rows[i][5] == "" && optionType == "C") {
                                tbl.rows[i][5] = ticker.symbol
                                tbl.rows[i][6] = ticker.ask1
                                tbl.rows[i][7] = ticker.bid1
                                tbl.rows[i][8] = ticker.mark_price
                                tbl.rows[i][9] = ticker.underlying_price
                                return 
                            }
                        }
                        if (optionType == "P") {
                            tbl.rows.push([ticker.symbol, ticker.ask1, ticker.bid1, ticker.mark_price, ticker.underlying_price, "", "", "", "", ""])
                        } else if(optionType == "C") {
                            tbl.rows.push(["", "", "", "", "", ticker.symbol, ticker.ask1, ticker.bid1, ticker.mark_price, ticker.underlying_price])
                        }
                    }
                })
            }
        })
        return arr 
    }

    // 初始化
    self.init()
	return self 
}


function main() {
    // 初始化，清空日志
    if(isResetLog) {
    	LogReset(1)
    }

    var m1 = createManager(exchanges[0], [], "option")
    var m2 = createManager(exchanges[1], ["BTC-PERPETUAL"], "future")

    // 切换为模拟盘
    var base = "https://www.deribit.com"
    if (isTestNet) {    
        m1.setBase(testNetBase)    
        m2.setBase(testNetBase)
        base = testNetBase
    }

    while(true) {
        // 期权
        var ticker1GetSucc = m1.updateTicker(base + "/api/v2/public/get_book_summary_by_currency?currency=BTC&kind=option", 
            function(data) {return data.result}, 
            function(ele) {return {bid1: ele.bid_price, ask1: ele.ask_price, symbol: ele.instrument_name, underlying_price: ele.underlying_price, mark_price: ele.mark_price}}) 
        
        // 永续期货
        var ticker2GetSucc = m2.updateTicker(base + "/api/v2/public/get_book_summary_by_currency?currency=BTC&kind=future", 
            function(data) {return data.result}, 
            function(ele) {return {bid1: ele.bid_price, ask1: ele.ask_price, symbol: ele.instrument_name}})
        if (!ticker1GetSucc || !ticker2GetSucc) {
            Sleep(5000)
            continue
        }

        // 更新持仓
        var pos1GetSucc = m1.updatePos("GET", "/api/v2/private/get_positions", "currency=BTC&kind=option")
        var pos2GetSucc = m2.updatePos("GET", "/api/v2/private/get_positions", "currency=BTC&kind=future")

        if (!pos1GetSucc || !pos2GetSucc) {
            Sleep(5000)
            continue
        }

        // 交互
        var cmd = GetCommand()
        if(cmd) {
            // 处理交互
            Log("交互命令：", cmd)
            var arr = cmd.split(":")
            // cmdClearLog 
            if(arr[0] == "setContractType") {
                // parseFloat(arr[1])
                m1.e.SetContractType(arr[1])
                Log("exchanges[0]交易所对象设置合约：", arr[1])
            } else if (arr[0] == "buyOption") {
                var actionData = arr[1].split(",")
                var price = parseFloat(actionData[0])
                var amount = parseFloat(actionData[1])
                m1.e.SetDirection("buy")
                m1.e.Buy(price, amount)
                Log("执行价格：", price, "执行数量：", amount, "执行方向：", arr[0])
            } else if (arr[0] == "sellOption") {
                var actionData = arr[1].split(",")
                var price = parseFloat(actionData[0])
                var amount = parseFloat(actionData[1])
                m1.e.SetDirection("sell")
                m1.e.Sell(price, amount)                
                Log("执行价格：", price, "执行数量：", amount, "执行方向：", arr[0])
            } else if (arr[0] == "setHedgeDeltaStep") {
                hedgeDeltaStep = parseFloat(arr[1])
                Log("设置参数hedgeDeltaStep：", hedgeDeltaStep)
            } 
        }
        
        // 获取期货合约价格
        var perpetualTicker = m2.getTicker("BTC-PERPETUAL")
        var hedgeMsg = " PERPETUAL:" + JSON.stringify(perpetualTicker)

        // 从账户数据中获取delta总值        
        var acc1GetSucc = m1.updateAcc(function(self) {
        	self.e.SetCurrency("BTC_USD")        
        	return self.e.GetAccount()
        })
        if (!acc1GetSucc) {
        	Sleep(5000)
        	continue
        }
        var sumDelta = m1.accData.Info.result.delta_total

        if (Math.abs(sumDelta) > hedgeDeltaStep && perpetualTicker) {
            if (sumDelta < 0) {
                // delta 大于0 对冲期货做空                
                var amount = _N(Math.abs(sumDelta) * perpetualTicker.ask1, -1)                
                if (amount > 10) {
                    Log("超过对冲阈值，当前总delta：", sumDelta, "买入期货")
                    m2.e.SetContractType("BTC-PERPETUAL")                    
                    m2.e.SetDirection("buy")
                    m2.e.Buy(-1, amount)
                } else {
                	hedgeMsg += ", 对冲下单量小于10"
                }
            } else {
                // delta 小于0 对冲期货做多
                var amount = _N(Math.abs(sumDelta) * perpetualTicker.bid1, -1)
                if (amount > 10) {
                    Log("超过对冲阈值，当前总delta：", sumDelta, "卖出期货")
                    m2.e.SetContractType("BTC-PERPETUAL")
                    m2.e.SetDirection("sell")
                    m2.e.Sell(-1, amount)
                } else {
                	hedgeMsg += ", 对冲下单量小于10"
                }
            }
        }

        LogStatus(_D(), "sumDelta:", sumDelta, hedgeMsg, 
        	"\n`" + JSON.stringify([m1.returnPosTbl(), m2.returnPosTbl()]) + "`", "\n`" + JSON.stringify(m2.returnTickersTbl()) + "`", "\n`" + JSON.stringify(m1.returnOptionTickersTbls()) + "`")
        Sleep(10000)
    }
}


```

> Detail

https://www.fmz.com/strategy/265090

> Last Modified

2021-03-29 10:13:06
