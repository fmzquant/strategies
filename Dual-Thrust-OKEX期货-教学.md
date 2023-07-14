
> Name

Dual-Thrust-OKEX期货-教学

> Author

小小梦

> Strategy Description

> 基本原理

- 在当天收盘，计算两个值： 最高价－收盘价，和收盘价－最低价。然后取这两个值较大的那个，乘以k值，结果称为触发值。
- 在第二天开盘，记录开盘价，然后在价格超过（开盘＋触发值）时马上买入，或者价格低于（开盘－触发值）时马上卖空。
- 这个系统是反转系统，没有单独止损。也就是说，反向信号也同时就是平仓信号。


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|NPeriod|4|计算周期|
|Ks|0.5|上轨系数|
|Kx|0.5|下轨系数|
|AmountOP|true|开仓合约张数|


> Source (javascript)

``` javascript
var STATE_IDLE = 0
var STATE_LONG = 1
var STATE_SHORT = 2
var State = STATE_IDLE
var LastBarTime = 0
var UpTrack = 0
var DownTrack = 0
var InitAccount = null

function GetPosition(posType) {
    var positions = exchange.GetPosition()
    for (var i = 0; i < positions.length; i++) {
        if (positions[i].Type === posType) {
            return [positions[i].Price, positions[i].Amount];
        }
    }
    return [0, 0]
}

function CancelPendingOrders() {
    while (true) {
        var orders = exchange.GetOrders()
        for (var i = 0; i < orders.length; i++) {
            exchange.CancelOrder(orders[i].Id)
            Sleep(500)
        }
        if (orders.length === 0) {
            break
        }
    }
}

function Trade(currentState, nextState) {
    var pfn = nextState === STATE_LONG ? exchange.Buy : exchange.Sell
    if (currentState !== STATE_IDLE) {
        exchange.SetDirection(currentState === STATE_LONG ? "closebuy" : "closesell")
        while (true) {
            var amount = GetPosition(currentState === STATE_LONG ? PD_LONG : PD_SHORT)[1]
            if (amount === 0) {
                break
            }
            pfn(nextState === STATE_LONG ? _C(exchange.GetTicker).Sell * 1.001 : _C(exchange.GetTicker).Buy * 0.999, amount)
            Sleep(500)
            CancelPendingOrders()
        }
        var account = exchange.GetAccount()
        LogProfit(_N(account.Stocks - InitAccount.Stocks, 3), "收益率:", _N((account.Stocks - InitAccount.Stocks) * 100 / InitAccount.Stocks, 3) + '%')
    }
    exchange.SetDirection(nextState === STATE_LONG ? "buy" : "sell")
    while (true) {
        var pos = GetPosition(nextState === STATE_LONG ? PD_LONG : PD_SHORT)
        if (pos[1] >= AmountOP) {
            Log("持仓均价", pos[0], "数量:", pos[1])
            break
        }
        pfn(nextState === STATE_LONG ? _C(exchange.GetTicker).Sell * 1.001 : _C(exchange.GetTicker).Buy * 0.999, AmountOP-pos[1])
        Sleep(500)
        CancelPendingOrders()
    }
}

function onTick() {
    var records = exchange.GetRecords()
    if (!records || records.length <= NPeriod) {
        return
    }
    var Bar = records[records.length - 1]
    $.PlotRecords(records, 'K线')
    if (LastBarTime !== Bar.Time) {
        var HH = TA.Highest(records, NPeriod, 'High')
        var HC = TA.Highest(records, NPeriod, 'Close')
        var LL = TA.Lowest(records, NPeriod, 'Low')
        var LC = TA.Lowest(records, NPeriod, 'Close')
        var Range = Math.max(HH - LC, HC - LL)
        UpTrack = _N(Bar.Open + (Ks * Range), 3)
        DownTrack = _N(Bar.Open - (Kx * Range), 3)
        $.PlotHLine(UpTrack, 'UpTrack')
        $.PlotHLine(DownTrack, 'DownTrack')
        LastBarTime = Bar.Time
    }

    LogStatus("Price:", Bar.Close, "Up:", UpTrack, "Down:", DownTrack, "Date:", new Date())
    var msg
    if (State === STATE_IDLE || State === STATE_SHORT) {
        if (Bar.Close >= UpTrack) {
            msg  = '做多 触发价: ' + Bar.Close + ' 上轨:' + UpTrack
            Log(msg)
            Trade(State, STATE_LONG)
            State = STATE_LONG
            $.PlotFlag(Bar.Time, msg, '多', 'flag', 'red') 
        }
    }

    if (State === STATE_IDLE || State === STATE_LONG) {
        if (Bar.Close <= DownTrack) {
            msg = '做空 触发价: ' + Bar.Close + ' 下轨:' + DownTrack
            Log(msg)
            Trade(State, STATE_SHORT)
            $.PlotFlag(Bar.Time, msg, '空', 'circlepin', 'green')
            State = STATE_SHORT
        }
    }
}

function main() {
    exchange.SetContractType("quarter")
    exchange.SetMarginLevel(10)
    if (exchange.GetPosition().length > 0) {
        throw "策略启动前不能有持仓."
    }
    CancelPendingOrders()
    InitAccount = exchange.GetAccount()
    while (true) {
        onTick()
        Sleep(500)
    }
}
```

> Detail

https://www.fmz.com/strategy/112425

> Last Modified

2020-02-24 09:56:09
