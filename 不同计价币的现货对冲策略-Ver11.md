
> Name

不同计价币的现货对冲策略-Ver11

> Author

小小梦

> Strategy Description

## 不同计价币的现货对冲策略 Ver1.1

相关文章：https://www.fmz.com/digest-topic/7666

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|keepBalanceCyc|300|平衡周期|
|diffAsPercentage|true|使用差价百分比|
|hedgeDiffPriceA2B|20|对冲差价AtoB|
|hedgeDiffPriceB2A|20|对冲差价BtoA|
|hedgeDiffPercentageA2B|4|对冲差价百分比AtoB|
|hedgeDiffPercentageB2A|4|对冲差价百分比BtoA|
|minHedgeAmount|0.005|对冲最小下单量|
|maxHedgeAmount|0.2|对冲最大下单量|
|rateA|true|A交易所汇率|
|rateB|true|B交易所汇率|
|isReset|false|重置所有信息|
|pricePrecisionA|2|A价格精度|
|amountPrecisionA|3|A下单量精度|
|pricePrecisionB|2|B价格精度|
|amountPrecisionB|3|B下单量精度|
|slidePrice|true|下单滑价|
|marginType|0|杠杆类型: 普通币币|逐仓杠杆|全仓杠杆|




|Button|Default|Description|
|----|----|----|
|A2B|false|修改AtoB的参数|
|B2A|false|修改BtoA的参数|


> Source (javascript)

``` javascript
var lastKeepBalanceTS = 0

function hedge(buyEx, sellEx, priceBuy, priceSell, amount) {
    var buyRoutine = buyEx.Go("Buy", priceBuy, amount)
    var sellRoutine = sellEx.Go("Sell", priceSell, amount)
    Sleep(500)
    buyRoutine.wait()
    sellRoutine.wait()
}

function getDepthPrice(depth, side, amount) {
    var arr = depth[side]
    var sum = 0
    var price = null
    for (var i = 0 ; i < arr.length ; i++) {
        var ele = arr[i]
        sum += ele.Amount
        if (sum >= amount) {
            price = ele.Price
            break
        }
    }
    return price
}

function keepBalance(initAccs, nowAccs, depths) {
    var initSumStocks = 0
    var nowSumStocks = 0 
    _.each(initAccs, function(acc) {
        initSumStocks += acc.Stocks + acc.FrozenStocks
    })
    _.each(nowAccs, function(acc) {
        nowSumStocks += acc.Stocks + acc.FrozenStocks
    })
    
    var diff = nowSumStocks - initSumStocks
    // 计算币差
    if (Math.abs(diff) > minHedgeAmount && initAccs.length == nowAccs.length && nowAccs.length == depths.length) {
        Log("触发平衡操作，平衡量：", Math.abs(diff))
        var index = -1
        var available = []
        var side = diff > 0 ? "Bids" : "Asks"
        for (var i = 0 ; i < nowAccs.length ; i++) {
            var price = getDepthPrice(depths[i], side, Math.abs(diff))
            if (side == "Bids" && nowAccs[i].Stocks * 0.9 > Math.abs(diff)) {
                available.push(i)
            } else if (side == "Asks" && price && nowAccs[i].Balance / price * 0.9 > Math.abs(diff)) {
                available.push(i)
            }
        }
        for (var i = 0 ; i < available.length ; i++) {
            if (index == -1) {
                index = available[i]
            } else {
                var priceIndex = getDepthPrice(depths[index], side, Math.abs(diff))
                var priceI = getDepthPrice(depths[available[i]], side, Math.abs(diff))
                if (side == "Bids" && priceIndex && priceI && priceI > priceIndex) {
                    index = available[i]
                } else if (side == "Asks" && priceIndex && priceI && priceI < priceIndex) {
                    index = available[i]
                }
            }
        }
        if (index == -1) {
            Log("无法平衡")            
        } else {
            // 平衡下单
            var price = getDepthPrice(depths[index], side, Math.abs(diff))
            if (price) {
                var tradeFunc = side == "Bids" ? exchanges[index].Sell : exchanges[index].Buy
                tradeFunc(price, Math.abs(diff))
            } else {
                Log("价格无效", price)
            }
        }        
        return false
    } else if (!(initAccs.length == nowAccs.length && nowAccs.length == depths.length)) {
        Log("错误：", "initAccs.length:", initAccs.length, "nowAccs.length:", nowAccs.length, "depths.length:", depths.length)
        return true 
    } else {
        return true 
    }
}

function cancelAll() {
    _.each(exchanges, function(ex) {
        while (true) {
            var orders = _C(ex.GetOrders)
            if (orders.length == 0) {
                break
            }
            for (var i = 0 ; i < orders.length ; i++) {
                ex.CancelOrder(orders[i].Id, orders[i])
                Sleep(500)
            }
        }
    })
}

function updateAccs(arrEx) {
    var ret = []
    for (var i = 0 ; i < arrEx.length ; i++) {
        var acc = arrEx[i].GetAccount()
        if (!acc) {
            return null
        }
        ret.push(acc)
    }
    return ret 
}

function main() {
    var exA = exchanges[0]
    var exB = exchanges[1]
    // 精度，汇率设置
    if (rateA != 1) {
        // 设置汇率A
        exA.SetRate(rateA)
        Log("交易所A设置汇率：", rateA, "#FF0000")
    }
    if (rateB != 1) {
        // 设置汇率B
        exB.SetRate(rateB)
        Log("交易所B设置汇率：", rateB, "#FF0000")
    }
    exA.SetPrecision(pricePrecisionA, amountPrecisionA)
    exB.SetPrecision(pricePrecisionB, amountPrecisionB)

    // 切换杠杆模式
    for (var i = 0 ; i < exchanges.length ; i++) {
        if (exchanges[i].GetName() == "Binance" && marginType != 0) {
            if (marginType == 1) {
                Log(exchanges[i].GetName(), "设置为杠杆逐仓")
                exchanges[i].IO("trade_margin")
            } else if (marginType == 2) {
                Log(exchanges[i].GetName(), "设置为杠杆全仓")
                exchanges[i].IO("trade_super_margin")
            }
        }
    }
    
    if (isReset) {
        _G(null)
        LogReset(1)
        LogProfitReset()
        LogVacuum()
        Log("重置所有数据", "#FF0000")
    }

    var nowAccs = _C(updateAccs, exchanges)
    var initAccs = _G("initAccs")
    if (!initAccs) {
        initAccs = nowAccs
        _G("initAccs", initAccs)
    }

    var isTrade = false 
    while (true) {
        var ts = new Date().getTime()
        var depthARoutine = exA.Go("GetDepth")
        var depthBRoutine = exB.Go("GetDepth")
        var depthA = depthARoutine.wait()
        var depthB = depthBRoutine.wait()
        if (!depthA || !depthB || depthA.Asks.length == 0 || depthA.Bids.length == 0 || depthB.Asks.length == 0 || depthB.Bids.length == 0) {
            Sleep(500)
            continue 
        }

        var targetDiffPriceA2B = hedgeDiffPriceA2B
        var targetDiffPriceB2A = hedgeDiffPriceB2A
        if (diffAsPercentage) {
            targetDiffPriceA2B = (depthA.Bids[0].Price + depthB.Asks[0].Price + depthB.Bids[0].Price + depthA.Asks[0].Price) / 4 * (hedgeDiffPercentageA2B / 100)
            targetDiffPriceB2A = (depthA.Bids[0].Price + depthB.Asks[0].Price + depthB.Bids[0].Price + depthA.Asks[0].Price) / 4 * (hedgeDiffPercentageB2A / 100)
        }

        // 画图
        $.PlotHLine(targetDiffPriceA2B, "A->B")
        $.PlotHLine(targetDiffPriceB2A, "B->A")

        if (depthA.Bids[0].Price - depthB.Asks[0].Price > targetDiffPriceA2B && Math.min(depthA.Bids[0].Amount, depthB.Asks[0].Amount) >= minHedgeAmount) {          // A -> B 盘口条件满足            
            var priceSell = depthA.Bids[0].Price - slidePrice
            var priceBuy = depthB.Asks[0].Price + slidePrice
            
            // 处理负精度参数
            if (pricePrecisionA < 0) {
                // priceSell = _N(priceSell, pricePrecisionA) - slidePrice
                priceSell = _N(priceSell - slidePrice, pricePrecisionA)
                // Log("priceSell:", priceSell, "priceSell - slidePrice:", priceSell - slidePrice, "pricePrecisionA:", pricePrecisionA, typeof(pricePrecisionA)) // 测试
            }
            if (pricePrecisionB < 0) {
                // priceBuy = _N(priceBuy, pricePrecisionB) + slidePrice
                priceBuy = _N(priceBuy + slidePrice, pricePrecisionB)
                // Log("priceBuy:", priceBuy, "priceBuy + slidePrice:", priceBuy + slidePrice, "pricePrecisionB:", pricePrecisionB, typeof(pricePrecisionB)) // 测试
            }
            
            var amount = Math.min(depthA.Bids[0].Amount, depthB.Asks[0].Amount)
            if (nowAccs[0].Stocks > minHedgeAmount && nowAccs[1].Balance * 0.8 / priceSell > minHedgeAmount) {
                amount = Math.min(amount, nowAccs[0].Stocks, nowAccs[1].Balance * 0.8 / priceSell, maxHedgeAmount)
                Log("触发A->B:", depthA.Bids[0].Price - depthB.Asks[0].Price, priceBuy, priceSell, amount, nowAccs[1].Balance * 0.8 / priceSell, nowAccs[0].Stocks)  // 提示信息
                hedge(exB, exA, priceBuy, priceSell, amount)
                cancelAll()
                lastKeepBalanceTS = 0
                isTrade = true 
            }            
        } else if (depthB.Bids[0].Price - depthA.Asks[0].Price > targetDiffPriceB2A && Math.min(depthB.Bids[0].Amount, depthA.Asks[0].Amount) >= minHedgeAmount) {   // B -> A 盘口条件满足
            var priceBuy = depthA.Asks[0].Price + slidePrice
            var priceSell = depthB.Bids[0].Price - slidePrice
            
            // 处理负精度参数
            if (pricePrecisionA < 0) {
                // priceBuy = _N(priceBuy, pricePrecisionA) + slidePrice
                priceBuy = _N(priceBuy  + slidePrice, pricePrecisionA)
                // Log("priceBuy:", priceBuy, "priceBuy  + slidePrice:", priceBuy  + slidePrice, "pricePrecisionA:", pricePrecisionA, typeof(pricePrecisionA))  // 测试
            }
            if (pricePrecisionB < 0) {
                // priceSell = _N(priceSell, pricePrecisionB) - slidePrice
                priceSell = _N(priceSell - slidePrice, pricePrecisionB)
                // Log("priceSell:", priceSell, "priceSell - slidePrice:", priceSell - slidePrice, "pricePrecisionB:", pricePrecisionB, typeof(pricePrecisionB)) // 测试
            }
            
            var amount = Math.min(depthB.Bids[0].Amount, depthA.Asks[0].Amount)
            if (nowAccs[1].Stocks > minHedgeAmount && nowAccs[0].Balance * 0.8 / priceBuy > minHedgeAmount) {
                amount = Math.min(amount, nowAccs[1].Stocks, nowAccs[0].Balance * 0.8 / priceBuy, maxHedgeAmount)
                Log("触发B->A:", depthB.Bids[0].Price - depthA.Asks[0].Price, priceBuy, priceSell, amount, nowAccs[0].Balance * 0.8 / priceBuy, nowAccs[1].Stocks)  // 提示信息
                hedge(exA, exB, priceBuy, priceSell, amount)
                cancelAll()
                lastKeepBalanceTS = 0
                isTrade = true 
            }            
        }
        
        if (ts - lastKeepBalanceTS > keepBalanceCyc * 1000) {
            nowAccs = _C(updateAccs, exchanges)
            var isBalance = keepBalance(initAccs, nowAccs, [depthA, depthB])
            cancelAll()
            if (isBalance) {
                lastKeepBalanceTS = ts
                if (isTrade) {
                    var nowBalance = _.reduce(nowAccs, function(sumBalance, acc) {return sumBalance + acc.Balance}, 0)
                    var initBalance = _.reduce(initAccs, function(sumBalance, acc) {return sumBalance + acc.Balance}, 0)
                    LogProfit(nowBalance - initBalance, nowBalance, initBalance, nowAccs)
                    isTrade = false 
                }                
            }

            $.PlotLine("A2B", depthA.Bids[0].Price - depthB.Asks[0].Price)
            $.PlotLine("B2A", depthB.Bids[0].Price - depthA.Asks[0].Price)            
        }
        
        // 交互
        var cmd = GetCommand()
        if (cmd) {
            Log("接收到命令：", cmd)
            var arr = cmd.split(":")
            if (arr[0] == "A2B") {
                Log("修改A2B的参数，", diffAsPercentage ? "参数为差价百分比" : "参数为差价：", arr[1])
                if (diffAsPercentage) {
                    hedgeDiffPercentageB2A = parseFloat(arr[1])
                } else {
                    hedgeDiffPriceA2B = parseFloat(arr[1])
                }
            } else if (arr[0] == "B2A") {                
                Log("修改B2A的参数，", diffAsPercentage ? "参数为差价百分比" : "参数为差价：", arr[1])
                if (diffAsPercentage) {
                    hedgeDiffPercentageA2B = parseFloat(arr[1])
                } else {
                    hedgeDiffPriceB2A = parseFloat(arr[1])
                }
            }
        }

        var tbl = {
            "type" : "table", 
            "title" : "数据", 
            "cols" : ["交易所", "币", "冻结币", "计价币", "冻结计价币", "触发差价", "当前差价"], 
            "rows" : [], 
        }
        tbl.rows.push(["A:" + exA.GetName(), nowAccs[0].Stocks, nowAccs[0].FrozenStocks, nowAccs[0].Balance, nowAccs[0].FrozenBalance, "A->B:" + targetDiffPriceA2B, "A->B:" + (depthA.Bids[0].Price - depthB.Asks[0].Price)])
        tbl.rows.push(["B:" + exB.GetName(), nowAccs[1].Stocks, nowAccs[1].FrozenStocks, nowAccs[1].Balance, nowAccs[1].FrozenBalance, "B->A:" + targetDiffPriceB2A, "B->A:" + (depthB.Bids[0].Price - depthA.Asks[0].Price)])

        LogStatus(_D(), "\n", "`" + JSON.stringify(tbl) + "`")
        Sleep(1000)
    }
}
```

> Detail

https://www.fmz.com/strategy/302834

> Last Modified

2021-08-29 15:51:59
