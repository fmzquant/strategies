
> Name

均线傻瓜版

> Author

sabar



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Amount|100|数额|


> Source (javascript)

``` javascript
/*backtest
start: 2021-06-01 00:00:00
end: 2021-09-22 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
*/

// 定义对象
var e = exchange
e.SetContractType('swap')
var LastBarTime = 0
Idle = -1
status = Idle

// 链接交易所, 获取相关信息
function UpdateInfo() {
    var account = exchange.GetAccount()
    records = exchange.GetRecords()
    ticker = exchange.GetTicker()
    balance = account.Stocks
    Bar = records[records.length - 1]
}

// 指标计算获取
function Get_MA() {
    
    var MA_10 = TA.MA(records, 10)
    MA_close_10 = MA_10[MA_10.length - 1]
    
    var MA_20 = TA.MA(records, 20)
    MA_close_20 = MA_20[MA_20.length - 1]

    var MA_30 = TA.MA(records, 30)
    MA_close_30 = MA_30[MA_30.length - 1]

}

// 开平仓规则
function onTick() {
    if (LastBarTime !== Bar.Time) { // K线结束后进行交易

        if (status === PD_LONG) {
            if (Bar.Close < MA_close_10) {
                exchange.SetDirection("closebuy")
                exchange.Sell(ticker.Buy, Amount)
                status = Idle
            }
        }

        if (status === PD_SHORT) {
            if (Bar.Close > MA_close_10) {
                exchange.SetDirection("closesell") 
                exchange.Buy(ticker.Sell, Amount)
                status = Idle
            }
        }
 Sleep(1 * 1000)
        if (status === Idle) {
            if (Bar.Close > MA_close_20 ) {
                exchange.SetDirection("buy") 
                exchange.Buy(ticker.Sell, Amount)
                status = PD_LONG
            }
            if (Bar.Close < MA_close_20 ) {
                exchange.SetDirection("sell") 
                exchange.Sell(ticker.Buy, Amount)
                status = PD_SHORT
            }
        }
        LastBarTime = Bar.Time
    }
}

function main() {
    // 主函数, 不停循环
    while (1) {
        // 链接交易所, 获取相关信息
        UpdateInfo()
        // 指标计算获取
        Get_MA()
        // 开平仓规则
        onTick()
        // 打印balance
        LogStatus(balance)
        // 轮询sleep时间
        Sleep(5 * 1000)
    }
}
```

> Detail

https://www.fmz.com/strategy/318486

> Last Modified

2021-09-23 17:15:26
