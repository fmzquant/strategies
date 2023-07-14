
> Name

随机数猜大猜小

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|stopProfit|15|止盈|
|stopLoss|30|止损|
|slidePrice|2|滑价|
|amount|0.01|初始下单量|
|pricePrecision|true|价格精度|
|amountPrecision|2|下单精度|
|isReset|false|重置所有数据|
|ct|swap|合约代码|


> Source (javascript)

``` javascript
/*backtest
start: 2021-12-09 00:00:00
end: 2022-12-15 00:00:00
period: 1d
basePeriod: 1h
*/

var openPrice = 0 
var ratio = 1
var totalEq = null 
var nowEq = null 

function cancelAll() {
    while (1) {
        var orders = _C(exchange.GetOrders)
        if (orders.length == 0) {
            break
        }
        for (var i = 0 ; i < orders.length ; i++) {
            exchange.CancelOrder(orders[i].Id, orders[i])
            Sleep(500)
        }
        Sleep(500)
    }
}

function main() {
    if (isReset) {
        _G(null)
        LogReset(1)
        LogProfitReset()
        LogVacuum()
        Log("重置所有数据", "#FF0000")
    }

    exchange.SetContractType(ct)

    var initPos = _C(exchange.GetPosition)
    if (initPos.length != 0) {
        throw "策略启动时有持仓！"
    }
    
    exchange.SetPrecision(pricePrecision, amountPrecision)
    Log("设置精度", pricePrecision, amountPrecision)
    
    if (!IsVirtual()) {
        var recoverTotalEq = _G("totalEq")
        if (!recoverTotalEq) {
            var currTotalEq = _C(exchange.GetAccount).Balance   // equity
            if (currTotalEq) {
                totalEq = currTotalEq
                _G("totalEq", currTotalEq)
            } else {
                throw "获取初始权益失败"
            }
        } else {
            totalEq = recoverTotalEq
        }
    } else {
        totalEq = _C(exchange.GetAccount).Balance
    }
    
    while (1) {
        if (openPrice == 0) {
            // 更新账户信息，计算收益
            var nowAcc = _C(exchange.GetAccount)
            nowEq = IsVirtual() ? nowAcc.Balance : nowAcc.Balance  // equity
            LogProfit(nowEq - totalEq, nowAcc)
            
            var direction = Math.floor((Math.random()*100)+1)   // 1~50 , 51~100
            var depth = _C(exchange.GetDepth)
            if (depth.Asks.length <= 2 || depth.Bids.length <= 2) {
                Sleep(1000)
                continue 
            }
            if (direction > 50) {
                // long
                openPrice = depth.Bids[1].Price
                exchange.SetDirection("buy")
                exchange.Buy(Math.abs(openPrice) + slidePrice, amount * ratio)
            } else {
                // short
                openPrice = -depth.Asks[1].Price
                exchange.SetDirection("sell")
                exchange.Sell(Math.abs(openPrice) - slidePrice, amount * ratio)
            }       
            Log("下", direction > 50 ? "买单" : "卖单", "，价格：", Math.abs(openPrice))
            continue
        }

        var orders = _C(exchange.GetOrders)
        if (orders.length == 0) {
            var pos = _C(exchange.GetPosition)
            if (pos.length == 0) {
                openPrice = 0
                continue
            }
            
            // 平仓检测
            while (1) {
                var depth = _C(exchange.GetDepth)
                if (depth.Asks.length <= 2 || depth.Bids.length <= 2) {
                    Sleep(1000)
                    continue 
                }
                var stopLossPrice = openPrice > 0 ? Math.abs(openPrice) - stopLoss : Math.abs(openPrice) + stopLoss 
                var stopProfitPrice = openPrice > 0 ? Math.abs(openPrice) + stopProfit : Math.abs(openPrice) - stopProfit
                var winOrLoss = 0 // 1 win , -1 loss 
                
                // 画线
                //$.PlotLine("bid", depth.Bids[0].Price)
                //$.PlotLine("ask", depth.Asks[0].Price)
                
                // 止损
                if (openPrice > 0 && depth.Bids[0].Price < stopLossPrice) {
                    exchange.SetDirection("closebuy")
                    exchange.Sell(depth.Bids[0].Price - slidePrice, pos[0].Amount)
                    winOrLoss = -1
                } else if (openPrice < 0 && depth.Asks[0].Price > stopLossPrice) {
                    exchange.SetDirection("closesell")
                    exchange.Buy(depth.Asks[0].Price + slidePrice, pos[0].Amount)
                    winOrLoss = -1
                }
                
                // 止盈
                if (openPrice > 0 && depth.Bids[0].Price > stopProfitPrice) {
                    exchange.SetDirection("closebuy")
                    exchange.Sell(depth.Bids[0].Price - slidePrice, pos[0].Amount)  
                    winOrLoss = 1
                } else if (openPrice < 0 && depth.Asks[0].Price < stopProfitPrice) {
                    exchange.SetDirection("closesell")
                    exchange.Buy(depth.Asks[0].Price + slidePrice, pos[0].Amount)
                    winOrLoss = 1
                }

                Sleep(2000)
                var orders = _C(exchange.GetOrders)                
                if (orders.length == 0) {
                    pos = _C(exchange.GetPosition)
                    if (pos.length == 0) {
                        if (winOrLoss == -1) {
                            ratio++
                        } else if (winOrLoss == 1) {
                            ratio = 1
                        }
                        break
                    }                    
                } else {
                    // 撤销挂单
                    cancelAll()
                    Sleep(2000)
                    pos = _C(exchange.GetPosition)
                    // 撤销后更新持仓，需要再次检查
                    if (pos.length == 0) {
                        if (winOrLoss == -1) {
                            ratio++
                        } else if (winOrLoss == 1) {
                            ratio = 1
                        }
                        break
                    }    
                }
                
                var tbl = {
                    "type" : "table", 
                    "title" : "info", 
                    "cols" : ["totalEq", "nowEq", "openPrice", "bid1Price", "ask1Price", "ratio", "pos.length"], 
                    "rows" : [], 
                }
                tbl.rows.push([totalEq, nowEq, Math.abs(openPrice), depth.Bids[0].Price, depth.Asks[0].Price, ratio, pos.length])
                tbl.rows.push(["pos", "type", "amount", "price", "--", "--", "--"])
                for (var j = 0 ; j < pos.length ; j++) {
                    tbl.rows.push([j, pos[j].Type, pos[j].Amount, pos[j].Price, "--", "--", "--"])
                }
                LogStatus(_D(), "\n", "`" + JSON.stringify(tbl) + "`")
            }
        } else {
            // 撤销挂单
            // 重置openPrice
            cancelAll()
            openPrice = 0
        }
        Sleep(1000)
    }
   }



```

> Detail

https://www.fmz.com/strategy/394112

> Last Modified

2022-12-16 19:34:23
