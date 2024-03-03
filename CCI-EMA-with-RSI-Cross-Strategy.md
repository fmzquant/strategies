
> Name

CCI-EMA-with-RSI-Cross-Strategy

> Author

ChaoZhang

> Strategy Description

This strategy uses the CCI + 2 RSIs + 2 EMAs to generate trade signals. Trades are only taken during the normal trading session and all open trades are closed 15 min before the close of the current session. A trailing stop loss is used and is customizable.

Not trading advice, use at your own risk.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/180a6a543807ef47db2.jpg) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|(?EMA Settings)Fast EMA Length|
|v_input_2|20|Slow EMA Length|
|v_input_int_1|9|(?RSI Settings)Fast RSI Length|
|v_input_source_1_close|0|Fast RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|20|Slow RSI Length|
|v_input_source_2_close|0|Slow RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_3|20|(?CCI Settings)CCI Length|
|v_input_3_hlc3|0|CCI Source: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_int_4|50|CCI Cutoff|
|v_input_float_1|0.67|(?Stop Settings)Trail Loss ($)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-01-01 00:00:00
end: 2022-05-07 23:59:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © rwestbrookjr

//@version=5
strategy("CCI + EMA with RSI Cross Strategy", overlay=true, margin_long=100, margin_short=100, process_orders_on_close=true)

//EMA
fastLen = input(title='Fast EMA Length', defval=9, group='EMA Settings')
slowLen = input(title='Slow EMA Length', defval=20, group='EMA Settings')

fastEMA = ta.ema(close, fastLen)
slowEMA = ta.ema(close, slowLen)

fema = plot(fastEMA, title='FastEMA', color=color.new(color.green, 0), linewidth=1, style=plot.style_line)
sema = plot(slowEMA, title='SlowEMA', color=color.new(color.red, 0), linewidth=1, style=plot.style_line)

//fill(fema, sema, color=fastEMA > slowEMA ? color.new(#417505, 50) : color.new(#890101, 50), title='Cloud')

// Bull and Bear Alerts
//Bull = ta.crossover(fastEMA, slowEMA)
Bull = fastEMA > slowEMA
//Bear = ta.crossunder(fastEMA, slowEMA)
Bear = fastEMA < slowEMA

//RSIs
rsiLength1Input = input.int(9, minval=1, title="Fast RSI Length", group="RSI Settings")
rsiSource1Input = input.source(close, "Fast RSI Source", group="RSI Settings")
rsiLength2Input = input.int(20, minval=1, title="Slow RSI Length", group="RSI Settings")
rsiSource2Input = input.source(close, "Slow RSI Source", group="RSI Settings")

up1 = ta.rma(math.max(ta.change(rsiSource1Input), 0), rsiLength1Input)
down1 = ta.rma(-math.min(ta.change(rsiSource1Input), 0), rsiLength1Input)
rsi = down1 == 0 ? 100 : up1 == 0 ? 0 : 100 - (100 / (1 + up1 / down1))
up2 = ta.rma(math.max(ta.change(rsiSource2Input), 0), rsiLength2Input)
down2 = ta.rma(-math.min(ta.change(rsiSource2Input), 0), rsiLength2Input)
rsi2 = down2 == 0 ? 100 : up2 == 0 ? 0 : 100 - (100 / (1 + up2 / down2))
rsiBull = rsi > rsi2 and rsi > rsi[1]
rsiBear = rsi < rsi2 and rsi < rsi[1]

//CCI
cciLength = input.int(title='CCI Length', group='CCI Settings', defval=20, minval=1)
src = input(hlc3, title='CCI Source', group='CCI Settings')
ma = ta.sma(src, cciLength)
cci = (src - ma) / (0.015 * ta.dev(src, cciLength))
cciCut = input.int(title = 'CCI Cutoff', group='CCI Settings', defval = 50)
cciBull = cci > cciCut
cciBear = cci < cciCut * -1

//Trail Stop Setup
trstp = input.float(title="Trail Loss ($)", group='Stop Settings', minval = 0.0, step = 0.01, defval = 0.67)

longStop = 0.0, shortStop = 0.0

longStop := if Bull or strategy.position_size > 0
    stopValue = slowEMA - trstp
    math.max(stopValue, longStop[1])
else
    0.0

shortStop := if Bear or strategy.position_size < 0
    stopValue = slowEMA + trstp
    math.min(stopValue, shortStop[1])
else
    999999
    
//plotshape(title='Short Stop', series=shortStop != 999999 and strategy.opentrades > 0 and strategy.position_size < 0 ? shortStop : na, style=shape.cross, color=color.yellow, location=location.absolute)
//plotshape(title='Long Stop', series=longStop != 0.0 and strategy.opentrades > 0 and strategy.position_size > 0 ? longStop : na,style=shape.cross, color=color.yellow, location=location.absolute)

//Session Setup
//open_session=input.session(title='Session',group='Session Settings', defval="0930-1545")
//session = time("1", open_session)
//validSession=(na(session) ? 0 : 1)

//Trade Signals
//longCondition = Bull and cci > cciCut and ta.crossover(rsi,rsi2) and validSession
longCondition = cciBull and ta.crossover(rsi,rsi2) and close > slowEMA
//longCondition = cciBull and ta.crossover(rsi,rsi2) and Bull and validSession
if (longCondition)
    strategy.entry("Long", strategy.long)
    
//longExit = close > strategy.opentrades.entry_price(0) + 1.5 or close < strategy.opentrades.entry_price(0) - 0.75
longExit = close < longStop
//longExit = ta.crossunder(low,longStop) or not validSession
if (longExit)
    strategy.close("Long")

//shortCondition = Bear and cci < (cciCut*-1) and ta.crossunder(rsi,rsi2) and validSession
shortCondition = cciBear and ta.crossunder(rsi,rsi2) and close < slowEMA
//shortCondition = cciBear and ta.crossunder(rsi,rsi2) and Bear and validSession
if (shortCondition)
    strategy.entry("Short", strategy.short)

//shortExit = close < strategy.opentrades.entry_price(0) - 1.5 or close > strategy.opentrades.entry_price(0) + 0.75
shortExit = close > shortStop
//shortExit = ta.crossover(high, shortStop) or not validSession
if (shortExit)
    strategy.close("Short")

```

> Detail

https://www.fmz.com/strategy/362029

> Last Modified

2022-05-09 17:00:24
