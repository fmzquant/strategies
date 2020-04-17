
> 策略名称

一根均线 趋势 Demo

> 策略作者

扁豆子



> 策略参数



|参数|默认值|描述|
|----|----|----|
|Amount|100|Amount|


> 源码 (javascript)

``` javascript
// 定义对象
var e = exchange
e.SetContractType('XBTUSD')
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
    var MA = TA.MA(records, 30)
    MA_close = MA[MA.length - 1]
}

// 开平仓规则
function onTick() {
    if (LastBarTime !== Bar.Time) { // K线结束后进行交易
        if (status === Idle) {
            if (Bar.Close > MA_close) {
                exchange.SetDirection("buy") 
                exchange.Buy(ticker.Sell, Amount)
                status = PD_LONG
            }
            if (Bar.Close < MA_close) {
                exchange.SetDirection("sell") 
                exchange.Sell(ticker.Buy, Amount)
                status = PD_SHORT
            }
        }
        if (status === PD_LONG) {
            if (Bar.Close < MA_close) {
                exchange.SetDirection("closebuy")
                exchange.Sell(ticker.Buy, Amount)
                exchange.SetDirection("sell") 
                exchange.Sell(ticker.Buy, Amount)
                status = PD_SHORT
            }
        }
        if (status === PD_SHORT) {
            if (Bar.Close > MA_close) {
                exchange.SetDirection("closesell") 
                exchange.Buy(ticker.Sell, Amount)
                exchange.SetDirection("buy") 
                exchange.Buy(ticker.Sell, Amount)
                status = PD_LONG
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

> 策略出处

https://www.fmz.com/strategy/193609

> 更新时间

2020-04-11 21:28:30
