
> Name

Binance-Multi-Pair-Price-Range-Alert

> Author

轻轻的云

> Strategy Description

Because the iOS version of Aicoin is no longer usable without a membership and I no longer had price alerts, I decided to build one myself.

I do not know much about programming, so I mostly assembled it by copying and adapting Meng's code from https://www.fmz.com/digest-topic/8512. My English is limited, so I used pinyin names for the upper and lower price limits and copied the rest of the English labels from Meng's example. Thanks to Meng for the help.

If anyone knows of another app that can send price alerts like Aicoin, I would appreciate the recommendation.

By default, this script is for futures trading and supports USDT and BUSD pairs. Set an upper and lower price bound, and a notification will be sent whenever the latest price rises above the upper bound or falls below the lower bound.

If you need spot alerts instead, simply uncheck the "Futures trading" parameter and then add Binance Spot as the exchange.

You also need to configure FMZ push notifications. I use QQ Mail with a custom alert tone and also bind WeChat, which gives me two separate reminders.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|B_sleeptime|30|Polling time (seconds)|
|symbols|ETH_BUSD,ETC_USDT,LTC_USDT|Trading pairs|
|B_shangxian|3000,100,200|Upper price limit|
|B_xiaxian|2000,50,100|Lower price limit|
|B_heyue|true|Futures trading|


> Source (javascript)

``` javascript
var arrSymbols = symbols.split(",")
var arrshangxian = B_shangxian.split(",")
var arrxiaxian = B_xiaxian.split(",")
var shang = parseFloat(arrshangxian[i])
var xia = parseFloat(arrxiaxian[i])

function main() {
    if (B_chongzhi) {
        LogReset()
        LogVacuum()
        Log("重置所有数据", "#FF0000")
    }
    while (true) {
        for (var i = 0; i < arrSymbols.length; i++) {
            var symbol = arrSymbols[i]
            if (B_heyue == true) {
                exchange.SetContractType("swap")
            }
            exchange.SetCurrency(symbol)
            var ticker = _C(exchange.GetTicker).Last
            Log("交易对：", symbol, "最新价：", ticker)
            if (ticker > shang || ticker < xia) {
                Log(symbol, "价格跳出区间，当前最新价格：", ticker, "#FF0000", "@")
            }
            Sleep(B_sleeptime * 1000)
        }
        Sleep(5 * 1000)

    }
}
```

> Detail

https://www.fmz.com/strategy/342165

> Last Modified

2022-04-21 22:45:14
