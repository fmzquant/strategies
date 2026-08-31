
> Name

Squeeze-Momentum-Trading-Strategy-Based-on-LazyBear-Indicator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e1b1926e408bbf7d08.png)

## Overview

This strategy is based on LazyBear's Squeeze Momentum Indicator, with added momentum filters, changed data source, and enhanced risk management system and customizable backtesting timeframe, aiming to catch price outbreaks after volatility squeeze.  

## Strategy Logic

The strategy uses Bollinger Bands and Keltner Channels to calculate price channels. Breakouts signal increased volatility. It incorporates LazyBear's Squeeze Momentum Indicator which uses linear regression to determine price momentum direction.

The strategy adds momentum filters, only trading when absolute momentum exceeds a threshold. On volatility squeeze (channel tightening) with momentum filter passed, it judges trend direction for long/short. It also sets stop loss, take profit and trailing stop to control risks.

## Advantage Analysis 

The strategy integrates multiple indicators for comprehensive judgment. It limits per trade loss with risk management mechanisms. It can timely judge post-squeeze price trends. Customizable parameters make it adaptable.

## Risk Analysis

Main risks include: false breakouts causing wrong judgements; failure to reverse in time with improper parameter settings; stop loss breaches enlarging losses. These can be mitigated by optimizing parameters, adjusting risk management settings, selecting suitable products and trading sessions.

## Optimization Directions

Consider combining other indicator filters like volume; fine-tune momentum threshold for higher precision; add drawdown stop loss for tighter risk control; test effectiveness across more products. These optimizations can make the strategy more robust and generalized.

## Summary  

The strategy judges price trends and volatility relatively comprehensively with high integration degree and improved risk control measures. It can be further enhanced through the optimization directions for strong adaptiveness in catching post-squeeze price outbreaks.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|BB Length|
|v_input_2|2|BB MultFactor|
|v_input_3|16|KC Length|
|v_input_4|1.5|KC MultFactor|
|v_input_5|false|Filter for Momenutum value|
|v_input_6|20|Min for momentum|
|v_input_7|600|Stop Loss|
|v_input_8|1000|Take Profit|
|v_input_9|20|Trailing Stop|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-05 00:00:00
end: 2024-02-04 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=4
// Strategy based on LazyBear Squeeze Momentum Indicator
// © Bitduke
// All scripts: https://www.tradingview.com/u/Bitduke/#published-scripts

strategy(shorttitle="SMS", title="Squeeze Momentum Strategy", overlay=false )

length = input(12, title="BB Length")
mult = input(2.0, title="BB MultFactor")
lengthKC = input(16, title="KC Length")
mult_kc = input(1.5, title="KC MultFactor")


//FILTERS
useMomAverage = input(false, title="Filter for Momenutum value", type=input.bool)
MomentumMin = input(20, title="Min for momentum")

// Calculate BB
src = ohlc4

ma_1 = sma(src, length)
ma_2 = sma(src, lengthKC)
range_ma = sma(high - low, lengthKC)

dev = mult * stdev(src, length)

upper_bb = ma_1 + dev
lower_bb = ma_1 - dev

upper_kc = ma_2 + range_ma * mult_kc
lower_kc = ma_2 - range_ma * mult_kc

sqz_on = lower_bb > lower_kc and upper_bb < upper_kc
sqz_off = lower_bb < lower_kc and upper_bb > upper_kc
no_sqz = sqz_on == false and sqz_off == false

val = linreg(src - avg(avg(highest(hl2, lengthKC), lowest(low, lengthKC)), sma(hl2, lengthKC)), lengthKC, 0)

bcolor = iff(val > 0, iff(val > nz(val[1]), color.lime, color.green), iff(val < nz(val[1]), color.red, color.maroon))
scolor = no_sqz ? color.blue : sqz_on ? color.black : color.aqua
plot(val, color=bcolor, style=plot.style_histogram, linewidth=4)
plot(0, color=scolor, style=plot.style_cross, linewidth=2)

//LOGIC
//momentum filter
filterMom = useMomAverage ? abs(val) > MomentumMin / 100000 ? true : false : true

//standard condition
longCondition = scolor[1] != color.aqua and scolor == color.aqua and bcolor == color.lime and filterMom
exitLongCondition = bcolor == color.green
shortCondition = scolor[1] != color.aqua and scolor == color.aqua and bcolor == color.red and filterMom
exitShortCondition = bcolor == color.maroon

// Risk Management Sysyem
stop_loss = input(defval = 600, title="Stop Loss", minval = 0)
take_profit = input(defval = 1000, title="Take Profit", minval = 0)
trailing_stop = input(defval = 20, title="Trailing Stop", minval = 0)
// If the zero value is set for stop loss, take profit or trailing stop, then the function is disabled
s_loss = stop_loss >= 1 ? stop_loss : na
tk_profit = take_profit >= 1 ? take_profit : na
tr_stop = trailing_stop >= 1 ? trailing_stop : na


//STRATEGY
strategy.entry("SQ_Long", strategy.long, when=longCondition)
strategy.exit("Exit Long", from_entry = "SQ_Long", profit = take_profit, trail_points = trailing_stop, loss = s_loss)
strategy.close("SQ_Long", exitLongCondition)

strategy.entry("SQ_Short", strategy.short, when=shortCondition)
strategy.exit("Exit Short", from_entry = "SQ_Short", profit = take_profit, trail_points = trailing_stop, loss = s_loss )
strategy.close("SQ_Short", when=exitShortCondition)


```

> Detail

https://www.fmz.com/strategy/441084

> Last Modified

2024-02-05 14:48:01
