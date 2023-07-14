
> Name

A股港股对冲套利策略

> Author

雨幕

> Strategy Description

## A股港股对冲套利策略

相关文章：https://www.fmz.cn/bbs-topic/7940

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|symbolA|601633.SH|A股代码|
|symbolH|02333.HK|港股代码|
|isGetBaseStocks|false|是否需要创建底仓|
|baseStocks|10000|创建底仓股数|
|hedgeAmount|1000|每次对冲股数|
|slidePoint|5|滑价点数|
|H2A_Rate|0.8302|港元兑CNY汇率|
|minHedgeDiffPrice|40|最小对冲差价|
|spacing|10|每次对冲差价间距|
|hedgeProfit|5|对冲利润差价|
|isReset|false|重置|




|Button|Default|Description|
|----|----|----|
|buyA_sellH|false|买A股卖港股|
|buyH_sellA|false|买港股卖A股|


> Source (javascript)

``` javascript
/*backtest
start: 2020-09-01 09:00:00
end: 2021-08-31 15:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_XTP","currency":"STOCK","minFee":0},{"eid":"Futures_XTP","currency":"STOCK","minFee":0}]
*/

// 全局变量
var level_a2h = null
var level_h2a = null 

function newDate() {
    var timezone = 8                                //目标时区时间，东八区
    var offset_GMT = new Date().getTimezoneOffset() // 本地时间和格林威治的时间差，单位为分钟
    var nowDate = new Date().getTime()              // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
    var targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000)
    return targetDate
}

function IsTrading() {
    var now = newDate()            // 使用 newDate() 代替 new Date() 因为服务器时区问题
    var day = now.getDay()
    var hour = now.getHours()
    var minute = now.getMinutes()
    StatusMsg = "非交易时段"

    if (day === 0 || day === 6) {
        return false
    }

    if((hour == 9 && minute >= 30) || (hour == 11 && minute < 30) || (hour > 9 && hour < 11)) {
    	// 9:30-11：30
        StatusMsg = "交易时段"
        return true 
    } else if (hour >= 13 && hour < 15) {
    	// 13:00-15:00
        StatusMsg = "交易时段"
        return true 
    }
    
    return false 
}

function GetPosition(e, contractTypeName) {
    var allAmount = 0
    var allProfit = 0
    var allFrozen = 0
    var posMargin = 0
    var price = 0
    var direction = null
    positions = _C(e.GetPosition)
    for (var i = 0; i < positions.length; i++) {
        if (positions[i].ContractType != contractTypeName) {
            continue
        }
        if (positions[i].Type == PD_LONG) {
            posMargin = positions[i].MarginLevel
            allAmount += positions[i].Amount
            allProfit += positions[i].Profit
            allFrozen += positions[i].FrozenAmount
            price = positions[i].Price
            direction = positions[i].Type
        }
    }
    if (allAmount === 0) {
        return null
    }
    return {
        MarginLevel: posMargin,
        FrozenAmount: allFrozen,
        Price: price,
        Amount: allAmount,
        Profit: allProfit,
        Type: direction,
        ContractType: contractTypeName,
        CanCoverAmount: allAmount - allFrozen
    }
}

function getBaseStocks(priceA, priceH) {
    var infoA = _C(exchanges[0].SetContractType, symbolA)
    exchanges[0].SetDirection("buy")
    exchanges[0].Buy(priceA + infoA.PriceTick * slidePoint, (baseStocks - baseStocks % infoA.VolumeMultiple), "一手股数：" + infoA.VolumeMultiple)
    Log(symbolA, exchanges[0].GetPosition(symbolA))
    
    var infoH = _C(exchanges[1].SetContractType, symbolH)
    exchanges[1].SetDirection("buy")    
    exchanges[1].Buy(priceH + infoH.PriceTick * slidePoint, (baseStocks - baseStocks % infoH.VolumeMultiple), "一手股数：" + infoH.VolumeMultiple)
    Log(symbolH, exchanges[1].GetPosition(symbolH))    
    
    Sleep(1000 * 10)
    Log("底仓建仓完毕", "#FF0000")
    _G("initAcc", updateAcc())
}

function updateAcc() {
    var acc0 = _C(exchanges[0].GetAccount)
    var acc1 = _C(exchanges[1].GetAccount)
    var pos0 = GetPosition(exchanges[0], symbolA)
    var pos1 = GetPosition(exchanges[1], symbolH)
    var holdA = pos0 ? pos0.Amount : 0
    var holdH = pos1 ? pos1.Amount : 0
    var account = {"initAcc_A" : acc0, "initAcc_H" : acc1, "holdA" : holdA, "holdH" : holdH}
    return account
}

function hedge(buySymbol, sellSymbol, buyPrice, sellPrice, amount) {
    var buyEx = buySymbol == symbolA ? exchanges[0] : exchanges[1]
    var sellEx = sellSymbol == symbolH ? exchanges[1] : exchanges[0]

    // 卖出的检查持仓
    var infoSell = sellEx.SetContractType(sellSymbol)
    var sellExPos = GetPosition(sellEx, sellSymbol)
    if (!sellExPos) {
        return 
    }

    // 检查资产数值
    var infoBuy = buyEx.SetContractType(buySymbol)
    var buyExAcc = buyEx.GetAccount()
    if (!buyExAcc) {
        return 
    }
    
    // 检查资金、仓位
    amount = Math.min(buyExAcc.Balance / buyPrice, sellExPos.CanCoverAmount, amount)
    var minAmount = Math.max(infoBuy.VolumeMultiple, infoSell.VolumeMultiple)
    if (amount < minAmount) {
        return 
    }
    amount = amount - amount % minAmount

    buyEx.SetDirection("buy")
    var buyId = buyEx.Buy(buyPrice + infoBuy.PriceTick * slidePoint, amount, buySymbol, "一手股数：" + infoBuy.VolumeMultiple)
    
    sellEx.SetDirection("closebuy")
    var sellId = sellEx.Sell(sellPrice - infoSell.PriceTick * slidePoint, amount, sellSymbol, "一手股数：" + infoSell.VolumeMultiple)
    return {"buyId" : buyId, "sellId" : sellId}
}

function calcProfit(initAcc, priceA, priceH) {
    Sleep(5000)   // 需要等待，否则拿到的是旧数据，会引起计算错误
    var acc0 = _C(exchanges[0].GetAccount)
    var acc1 = _C(exchanges[1].GetAccount)
    var pos0 = GetPosition(exchanges[0], symbolA)
    var pos1 = GetPosition(exchanges[1], symbolH)
    var holdA = pos0 ? pos0.Amount : 0
    var holdH = pos1 ? pos1.Amount : 0
    var holdA_DiffBalance = (holdA - initAcc.holdA) * priceA
    var holdH_DiffBalance = (holdH - initAcc.holdH) * priceH
    LogProfit((acc0.Balance + acc1.Balance) - (initAcc.initAcc_A.Balance + initAcc.initAcc_H.Balance) + (holdA_DiffBalance + holdH_DiffBalance), acc0.Balance + acc0.FrozenBalance, acc1.Balance + acc1.FrozenBalance)
}

function main() {
    // 重置所有
    if(isReset) {        
        _G(null)
        LogReset(1)
        LogProfitReset()
        LogVacuum()
        Log("重置所有数据", "#FF0000")
    }

    SetErrorFilter("market not ready")
    for (var i in exchanges) {
        if((exchanges[i].GetCurrency() != "STOCK" && exchanges[i].GetCurrency() != "STOCK_CNY" ) || (exchanges[i].GetName() != "Futures_Futu" && exchanges[i].GetName() != "Futures_XTP")) {
            throw "不支持"
        }
        exchanges[i].SetPrecision(2, 0)
    }
    var initAcc = null
    var level = _G("level")
    if (!level) {
        level = {"level_a2h" : 0, "level_h2a" : 0}
        _G("level", level)
    } else {
        Log("载入level：", level)
    }
    level_a2h = level.level_a2h
    level_h2a = level.level_h2a

    // 设置港币汇率
    if (exchanges.length != 2) {
        throw "需要添加2个交易所对象，可以使用同一个账号配置2个交易所对象。"
    } else {
        if (!symbolA.includes(".SH") && !symbolA.includes(".SZ")) {
            throw "参数symbolA需要设置A股代码。"
        }
        if (!symbolH.includes(".HK")) {
            throw "参数symbolH需要设置港股代码。"
        }
        exchanges[1].SetRate(H2A_Rate)
        Log("设置港元->CNY的汇率：", H2A_Rate)
    }

    var statusMsg = ""
    var floatProfit = ""
    var tbl = {}
    var lastTbl = null 
    while (true) {        
        LogStatus(_D(), statusMsg, "对冲的浮动盈亏：", floatProfit, "\n", "`" + JSON.stringify(tbl) + "`")
        statusMsg = ""
        floatProfit = ""
        tbl = {
            type : "table", 
            title : "数据", 
            cols : ["股票代码", "当前价格", "账户可用资产", "账户冻结资产", "持仓价格", "持仓数量", "持仓盈亏", "可平仓量"], 
            rows : []
        }

        // 接收交互命令
        var cmd = GetCommand()

        Sleep(1000 *5)
        if (!IsTrading()) {
            statusMsg += "不在交易时间。"
            tbl = lastTbl   // 显示缓存信息
            continue 
        }
        
        var infoA = exchanges[0].SetContractType(symbolA)        
        if (!infoA) {
            statusMsg += "订阅" + symbolA + "失败。"
            continue
        }
        var tickerA = exchanges[0].GetTicker()
        var depthA = exchanges[0].GetDepth()
        
        var infoH = exchanges[1].SetContractType(symbolH)    
        if (!infoH) {
            statusMsg += "订阅" + symbolH + "失败。"
            continue
        }
        var tickerH = exchanges[1].GetTicker()
        var depthH = exchanges[1].GetDepth()
        
        if (!tickerA || !tickerH) {
            statusMsg += "获取行情数据失败。"
            continue 
        }

        // 需要判断涨跌停
        if (!depthA || !depthH || depthA.Bids[0].Amount == 0 || depthA.Asks[0].Amount == 0 || depthH.Bids[0].Amount == 0 || depthH.Asks[0].Amount == 0) {
            statusMsg += "获取深度信息失败。"
            continue
        }

        
        if (isGetBaseStocks) {
            getBaseStocks(tickerA.Sell, tickerH.Sell)
            isGetBaseStocks = false 
        }
        if (!initAcc) {
            initAcc = _G("initAcc")
            if (!initAcc) {
                initAcc = updateAcc()
                _G("initAcc", initAcc)
            }
            Log("初始账户数据", initAcc)
            Log("A股资产：", initAcc.initAcc_A.Balance + initAcc.initAcc_A.FrozenBalance, "港股资产：", initAcc.initAcc_H.Balance + initAcc.initAcc_H.FrozenBalance)
        }
        
        var a2h = tickerA.Buy - tickerH.Sell
        var h2a = tickerA.Sell - tickerH.Buy
        
        var ts = new Date().getTime()
        $.PlotLine("a2h", a2h, ts)
        $.PlotLine("h2a", h2a, ts)
        
        if (a2h > minHedgeDiffPrice + level_a2h * spacing) {            
            var ret = hedge(symbolH, symbolA, tickerH.Sell, tickerA.Buy, hedgeAmount)
            if (ret) {
                level_a2h++
                $.PlotFlag(ts, 'sell', 'S')
                Log("ret:", ret, "对冲差价：", tickerA.Buy - tickerH.Sell)
            }
        } else if (-h2a > minHedgeDiffPrice + level_h2a * spacing) {            
            var ret = hedge(symbolA, symbolH, tickerA.Sell, tickerH.Buy, hedgeAmount)
            if (ret) {
                level_h2a++        
                $.PlotFlag(ts, 'buy', 'B')
                Log("ret:", ret, "对冲差价：", tickerA.Sell - tickerH.Buy)
            }
        }
        
        if (a2h < minHedgeDiffPrice + (level_a2h - 1) * spacing - hedgeProfit && level_a2h > 0) {            
            var ret = hedge(symbolA, symbolH, tickerA.Sell, tickerH.Buy, hedgeAmount)
            if (ret) {
                level_a2h--
                $.PlotFlag(ts, 'buy', 'B')
                Log("ret:", ret, "对冲差价：", tickerA.Sell - tickerH.Buy)
                calcProfit(initAcc, tickerA.Last, tickerH.Last)
            }
        } else if (-h2a < minHedgeDiffPrice + (level_h2a - 1) * spacing - hedgeProfit && level_h2a > 0) {
            var ret = hedge(symbolH, symbolA, tickerH.Sell, tickerA.Buy, hedgeAmount)
            if (ret) {
                level_h2a--
                $.PlotFlag(ts, 'sell', 'S')
                Log("ret:", ret, "对冲差价：", tickerA.Buy - tickerH.Sell)
                calcProfit(initAcc, tickerA.Last, tickerH.Last)
            }
        }

        // 处理交互命令
        if (cmd) {
            Log("接收到命令：", cmd)
            var arr = cmd.split(":")
            if (arr[0] == "buyH_sellA") {                
                var amount = parseFloat(arr[1])
                var ret = hedge(symbolH, symbolA, tickerH.Sell, tickerA.Buy, amount)
                if (ret) {
                    $.PlotFlag(ts, 'sell', 'S')
                    Log("ret:", ret, "对冲差价：", tickerA.Buy - tickerH.Sell)
                    calcProfit(initAcc, tickerA.Last, tickerH.Last)
                }
            } else if (arr[0] == "buyA_sellH") {
                var amount = parseFloat(arr[1])
                var ret = hedge(symbolA, symbolH, tickerA.Sell, tickerH.Buy, amount)
                if (ret) {
                    $.PlotFlag(ts, 'buy', 'B')
                    Log("ret:", ret, "对冲差价：", tickerA.Sell - tickerH.Buy)
                    calcProfit(initAcc, tickerA.Last, tickerH.Last)
                }
            }
        } 

        // tbl
        var acc0 = exchanges[0].GetAccount()
        var balance = frozenBalance = "--"
        if (acc0) {
            balance = acc0.Balance 
            frozenBalance = acc0.FrozenBalance
        }
        var pos0 = GetPosition(exchanges[0], symbolA)
        var holdPrice = holdAmount = holdProfit = holdCanCoverAmount = "--"
        if (pos0) {
            holdPrice = pos0.Price
            holdAmount = pos0.Amount
            holdProfit = pos0.Profit
            holdCanCoverAmount = pos0.CanCoverAmount
        }
        tbl.rows.push([symbolA, tickerA.Last, balance, frozenBalance, holdPrice, holdAmount, holdProfit, holdCanCoverAmount])

        var acc1 = exchanges[1].GetAccount()
        var balance = frozenBalance = "--"
        if (acc1) {
            balance = acc1.Balance 
            frozenBalance = acc1.FrozenBalance
        }
        var pos1 = GetPosition(exchanges[1], symbolH)
        var holdPrice = holdAmount = holdProfit = holdCanCoverAmount = "--"
        if (pos1) {
            holdPrice = pos1.Price
            holdAmount = pos1.Amount
            holdProfit = pos1.Profit
            holdCanCoverAmount = pos1.CanCoverAmount
        }
        tbl.rows.push([symbolH, tickerH.Last, balance, frozenBalance, holdPrice, holdAmount, holdProfit, holdCanCoverAmount])
        lastTbl = tbl
        if (acc0 && acc1) {        
            floatProfit += (acc0.Balance + acc1.Balance) - (initAcc.initAcc_A.Balance + initAcc.initAcc_H.Balance) + 
                (((pos0 ? pos0.Amount : 0) - initAcc.holdA) * tickerA.Last + ((pos1 ? pos1.Amount : 0) - initAcc.holdH) * tickerH.Last)
        }        
    }
}

function onexit() {
    var level = {"level_a2h" : level_a2h, "level_h2a" : level_h2a}
    _G("level", level)
    Log("记录：", level)
}

function onerror() {
    var level = {"level_a2h" : level_a2h, "level_h2a" : level_h2a}
    _G("level", level)
    Log("记录：", level)
}
```

> Detail

https://www.fmz.cn/strategy/312721

> Last Modified

2021-10-26 10:19:01
