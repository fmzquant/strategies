
> Name

Simple-Martingale-Long-Short-Trading-Strategy

> Author

Zer3192

> Strategy Description

Warm reminder: this strategy is for learning purposes only. Using it in live trading will very likely result in liquidation.

Simple martingale strategy.
The principle is to double after a loss until the expected profit is recovered.
Because this version is intended for backtesting, all orders are market orders, and it has not been run in live trading.

> Source (javascript)

``` javascript
/*backtest
start: 2017-06-26 00:00:00
end: 2022-02-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","currency":"eth_USDT""currency":"bch_USDT"}]
*/

var n =0.001 //初始下单数
var MarginLevel = 50 //合约杠杆 
var profit = 0.05 //期望收益 ，不能小于手续费 
var bet=1//倍率


//取随机数 
function sum(m, n) {　　
    var num = Math.floor(Math.random() * (m - n) + n);　　
    return num;
}

function main() {
    var ret = exchange.IO("api", "POST", "/fapi/v1/positionSide/dual", "dualSidePosition=true")
    // ret : {"code":200,"msg":"success"}
    Log(ret)
}
   
    
function main() {
    exchange.SetContractType("swap")
    exchange.SetMarginLevel(MarginLevel)
    var position = []
    while (true) {
        position = exchange.GetPosition()
        if (position.length == 0) {
            //取随机数0、1作为方向
            var redom = sum(2, 0)
            Log(redom)
            if (redom == 0) {
                n=0.001
                exchange.SetDirection("sell")
                exchange.Sell(-1, n, "开空")
            }
            if (redom == 1) {
                n=0.002
                exchange.SetDirection("buy")
                exchange.Buy(-1, n, "开多")
            }

        }
        if (position.length > 0) {

            if (position[0].Type == 0) {
                //盈利大于期望 
                if (position[0].Profit > profit) {
                    exchange.SetDirection("closebuy")
                    exchange.Sell(-1, position[0].Amount)
                    
                    let redom = Math.random()
                    n=0.002
                    if (redom < 0.5) {  
                     n=0.003
                    exchange.SetDirection("sell")
                    exchange.Sell(-1, n, "空头")
                }
                    }
                //负盈利大于保证金 则加仓

                if (position[0].Profit < position[0].Margin * -1) {
                    n=n*bet
                    exchange.SetDirection("buy")
                    exchange.Buy(-1, position[0].Amount=n)
                   
                }
            }
            if (position[0].Type == 1) {
                if (position[0].Profit > profit) {
                    exchange.SetDirection("closesell")
                    exchange.Buy(-1, position[0].Amount)
                    let redom = Math.random()
                    n=0.004
                    if (redom > 0.5) {  
                    exchange.SetDirection("buy")
                    exchange.Buy(-1, n, "多头")
                }
                }
                if (position[0].Profit < position[0].Margin * -1) {
                    n=n*bet
                    exchange.SetDirection("sell")
                    exchange.Sell(-1, position[0].Amount=n)
                }
            }
            Sleep(60000)
        }
    }

}
```

> Detail

https://www.fmz.com/strategy/353603

> Last Modified

2022-03-31 19:15:01
