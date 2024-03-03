
> Name

海龟交易法Turtles-strategy

> Author

发明者量化

> Strategy Description

Demonstrate how to increase positions in pine language

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|RiskRatio|
|v_input_2|20|ATRLength|
|v_input_3|20|BOLength|
|v_input_4|55|FSLength|
|v_input_5|10|TELength|
|v_input_6|true|ContractUnit|
|v_input_7|0.01|MinStock|
|v_input_8|true|LastProfitableTradeFilter|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-04-29 00:00:00
end: 2022-04-28 23:59:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD"}]
*/

strategy("Turtles strategy", overlay=true, pyramiding=4)
// inputs
RiskRatio = input(1)                   // % Risk Per N ( 0 - 100)
ATRLength = input(20)                  // 平均波动周期 ATR Length
BOLength = input(20)                   // 短周期 BreakOut Length
FSLength = input(55)                   // 长周期 FailSafe Length
TELength = input(10)                   // 离市周期 Trailing Exit Length
ContractUnit = input(1)
MinStock = input(0.01)
LastProfitableTradeFilter = input(true, "LastProfitableTradeFilter")              // 使用入市过滤条件

// var
var float PreEntryPrice = na
var PreBreakoutFailure = false
var SendOrderThisBar = true
var CurrentBarIndex = -1
    
// body
if CurrentBarIndex != bar_index
    CurrentBarIndex := bar_index
    SendOrderThisBar := false
    if bar_index == 0
        PreEntryPrice := na
        PreBreakoutFailure := false

N = ta.atr(ATRLength)
plot(N, "N", join=false)
turtelUnits = math.round((strategy.equity*RiskRatio/100) /(N * ContractUnit), 3)
donchianHi = ta.highest(high[1], BOLength)
donchianLow = ta.lowest(low[1], BOLength)
fsDonchianHi = ta.highest(high[1], FSLength)
fsDonchianLo = ta.lowest(low[1], FSLength)
exitLowestPrice = ta.lowest(low[1], TELength)
exitHighestPrice = ta.highest(high[1], TELength)
ldh=plot(donchianHi, "donchianHi")
ldl=plot(donchianLow, "donchianLow")
fill(ldh, ldl)
plot(fsDonchianHi, "fsDonchianHi")
plot(fsDonchianLo, "fsDonchianLo")




if strategy.position_size == 0 and ((not LastProfitableTradeFilter) or (PreBreakoutFailure))
    if high > donchianHi and turtelUnits >= MinStock
        PreEntryPrice := high
        strategy.entry("breakout long", strategy.long, qty=turtelUnits)
        SendOrderThisBar := true
        PreBreakoutFailure := false

    if low < donchianLow and turtelUnits >= MinStock
        PreEntryPrice := low
        strategy.entry("breakout short", strategy.short, qty=turtelUnits)
        SendOrderThisBar := true
        PreBreakoutFailure := false

if strategy.position_size == 0
    if high > fsDonchianHi and turtelUnits >= MinStock
        PreEntryPrice := high
        strategy.entry("breakout long", strategy.long, qty=turtelUnits)
        SendOrderThisBar := true
        PreBreakoutFailure := false

    if low < fsDonchianLo and turtelUnits >= MinStock
        // 开仓价格取突破下轨-一个价位和最低价之间的较大值，这样能更接近真实情况，并能尽量保证成交
        PreEntryPrice := low
        strategy.entry("breakout short", strategy.short, qty=turtelUnits)
        SendOrderThisBar := true
        PreBreakoutFailure := false

if strategy.position_size > 0
    if low < ta.lowest(low[1], TELength)
        strategy.close_all()
    else
        if not na(PreEntryPrice) and turtelUnits >= MinStock
            if high >= PreEntryPrice + 0.5*N 
                PreEntryPrice := high
                strategy.entry("B1", strategy.long, qty=turtelUnits)
                SendOrderThisBar := true

        // StopLoss
        if low <= PreEntryPrice - (2 * N) and SendOrderThisBar == false
            alert("stop loss #ff0000")
            strategy.close_all()
            PreBreakoutFailure := true
else if strategy.position_size < 0
    if high > exitHighestPrice
        strategy.close_all()
    else
        if not na(PreEntryPrice) and turtelUnits >= MinStock
            if low <= PreEntryPrice - 0.5*N
                PreEntryPrice := low
                strategy.entry("S1", strategy.short, qty=turtelUnits)
                SendOrderThisBar := true

        // STOPLOSS
        if high >= PreEntryPrice + (2 * N) and SendOrderThisBar==false
            alert("stop loss #ff0000")
            strategy.close_all()
            PreBreakoutFailure := true

```

> Detail

https://www.fmz.com/strategy/360536

> Last Modified

2022-05-21 20:43:32
