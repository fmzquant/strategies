
> Name

Momentum-Breakout-Strategy-Based-on-Cycle-Judgment-with-Moving-Averages

> Author

ChaoZhang

> Strategy Description

## Overview

This strategy calculates EMA lines of different periods to determine the current cycle stage of the market, and uses ATR to generate momentum breakout signals for high-probability trend-following trades.

## Strategy Logic

1. Calculate 3 EMA lines - 5-day, 20-day and 40-day
2. Compare the EMA lines to determine which of the 6 cycle stages the market is currently at
   - 5-day > 20-day > 40-day is Cycle 1
   - 20-day > 5-day > 40-day is Cycle 2
   ......  
3. After cycle determination, calculate ATR indicator and set ATR multiples as breakout criteria
4. A buy signal is generated when price breaks above the ATR trailing stop of previous bar
5. A sell signal is generated when price drops below the ATR trailing stop of previous bar  
6. Through this combination of judgments, high-probability trend-following trades can be achieved

## Advantages

1. Cycle judgment increases signal reliability
   
   By judging the relative positions of different EMA lines, the current cycle stage of the market can be effectively determined, avoiding wrong signals in unsuitable cycles.
   
2. ATR breakout filters false signals

   ATR can effectively express the volatility of the market. Setting ATR multiples as breakout criteria can filter out many false breakout signals.
   
3. Combined judgment forms high-probability trading opportunities

   The organic combination of cycle judgment and ATR breakout creates signals with much higher probability, thus also increasing the profitability of trades.

## Risks

1. Difficult parameter optimization

   With multiple parameters, optimization difficulty is high. Improper parameter settings may affect strategy performance.  

2. Lagging exists  

   In fast changing markets, both EMA and ATR have certain degree of lagging, which may generate wrong signals or miss opportunities.
   
3. Strict stop loss needed

   No technical indicators can completely avoid wrong signals. Strict stop loss is required to control risks.

## Optimization Directions  

1. Further parameter optimization

   Find optimal parameter combinations through more extensive historical data.

2. Increase adaptivity

   Consider automatically adjusting ATR parameters based on market volatility to improve adaptivity.
   
3. Incorporate other indicators

   Try incorporating other indicators like volatility and volume to assist judgment and improve signal quality.

## Conclusion

This strategy determines cycles with EMA and sets momentum breakout criteria with ATR to achieve high-probability trend-following trades. It has advantages like cycle judgment, false signal filtering and signal quality improvement. But risks like difficult parameter optimization and lagging exist. Further optimization on parameters, adaptivity etc. can improve the strategy.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Key Vaule. 'This changes the sensitivity'|
|v_input_2|7|ATR Period|
|v_input_int_1|25|atr_length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-15 00:00:00
end: 2024-01-22 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © kgynofomo

//@version=5
strategy(title="[Salavi] | Andy Advance Pro Strategy",overlay = true)

ema_short = ta.ema(close,5)
ema_middle = ta.ema(close,20)
ema_long = ta.ema(close,40)

cycle_1 = ema_short>ema_middle and ema_middle>ema_long
cycle_2 = ema_middle>ema_short and ema_short>ema_long
cycle_3 = ema_middle>ema_long and ema_long>ema_short
cycle_4 = ema_long>ema_middle and ema_middle>ema_short
cycle_5 = ema_long>ema_short and ema_short>ema_middle
cycle_6 = ema_short>ema_long and ema_long>ema_middle

bull_cycle = cycle_1 or cycle_2 or cycle_3
bear_cycle = cycle_4 or cycle_5 or cycle_6
// label.new("cycle_1")
// bgcolor(color=cycle_1?color.rgb(82, 255, 148, 60):na)
// bgcolor(color=cycle_2?color.rgb(82, 255, 148, 70):na)
// bgcolor(color=cycle_3?color.rgb(82, 255, 148, 80):na)
// bgcolor(color=cycle_4?color.rgb(255, 82, 82, 80):na)
// bgcolor(color=cycle_5?color.rgb(255, 82, 82, 70):na)
// bgcolor(color=cycle_6?color.rgb(255, 82, 82, 60):na)

// Inputs
a = input(2, title='Key Vaule. \'This changes the sensitivity\'')
c = input(7, title='ATR Period')
h = false

xATR = ta.atr(c)
nLoss = a * xATR

src = h ? request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close, lookahead=barmerge.lookahead_off) : close

xATRTrailingStop = 0.0
iff_1 = src > nz(xATRTrailingStop[1], 0) ? src - nLoss : src + nLoss
iff_2 = src < nz(xATRTrailingStop[1], 0) and src[1] < nz(xATRTrailingStop[1], 0) ? math.min(nz(xATRTrailingStop[1]), src + nLoss) : iff_1
xATRTrailingStop := src > nz(xATRTrailingStop[1], 0) and src[1] > nz(xATRTrailingStop[1], 0) ? math.max(nz(xATRTrailingStop[1]), src - nLoss) : iff_2

pos = 0
iff_3 = src[1] > nz(xATRTrailingStop[1], 0) and src < nz(xATRTrailingStop[1], 0) ? -1 : nz(pos[1], 0)
pos := src[1] < nz(xATRTrailingStop[1], 0) and src > nz(xATRTrailingStop[1], 0) ? 1 : iff_3

xcolor = pos == -1 ? color.red : pos == 1 ? color.green : color.blue

ema = ta.ema(src, 1)
above = ta.crossover(ema, xATRTrailingStop)
below = ta.crossover(xATRTrailingStop, ema)

buy = src > xATRTrailingStop and above
sell = src < xATRTrailingStop and below

barbuy = src > xATRTrailingStop
barsell = src < xATRTrailingStop




atr = ta.atr(14)
atr_length = input.int(25)
atr_rsi = ta.rsi(atr,atr_length)
atr_valid = atr_rsi>50

long_condition =  buy and bull_cycle and atr_valid
short_condition =  sell and bear_cycle and atr_valid

Exit_long_condition = short_condition
Exit_short_condition = long_condition

if long_condition
    strategy.entry("Andy Buy",strategy.long, limit=close,comment="Andy Buy Here")

if Exit_long_condition
    strategy.close("Andy Buy",comment="Andy Buy Out")
    // strategy.entry("Andy fandan Short",strategy.short, limit=close,comment="Andy 翻單 short Here")
    // strategy.close("Andy fandan Buy",comment="Andy short Out")


if short_condition
    strategy.entry("Andy Short",strategy.short, limit=close,comment="Andy short Here")


// strategy.exit("STR","Long",stop=longstoploss)
if Exit_short_condition
    strategy.close("Andy Short",comment="Andy short Out")
    // strategy.entry("Andy fandan Buy",strategy.long, limit=close,comment="Andy 翻單 Buy Here")
    // strategy.close("Andy fandan Short",comment="Andy Buy Out")




inLongTrade = strategy.position_size > 0
inLongTradecolor = #58D68D
notInTrade = strategy.position_size == 0
inShortTrade = strategy.position_size < 0

// bgcolor(color = inLongTrade?color.rgb(76, 175, 79, 70):inShortTrade?color.rgb(255, 82, 82, 70):na)
plotshape(close!=0,location = location.bottom,color = inLongTrade?color.rgb(76, 175, 79, 70):inShortTrade?color.rgb(255, 82, 82, 70):na)


plotshape(long_condition, title='Buy', text='Andy Buy', style=shape.labelup, location=location.belowbar, color=color.new(color.green, 0), textcolor=color.new(color.white, 0), size=size.tiny)
plotshape(short_condition, title='Sell', text='Andy Sell', style=shape.labeldown, location=location.abovebar, color=color.new(color.red, 0), textcolor=color.new(color.white, 0), size=size.tiny)


//atr > close *0.01* parameter
```

> Detail

https://www.fmz.com/strategy/439749

> Last Modified

2024-01-23 14:51:27
