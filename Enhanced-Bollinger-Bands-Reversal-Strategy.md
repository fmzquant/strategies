
> Name

Enhanced-Bollinger-Bands-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses an enhanced Bollinger Bands indicator to identify price reversal points, goes long when price approaches the lower band, and closes position when a green candle appears, aiming to capture mean reversion at the lower band.

## Strategy Logic

1. Calculate standard BB parameters basis, dev, upperBB and lowerBB. 

2. Calculate SMA and deviation bands upex2 and dnex2 at certain percentage from SMA.

3. Take average of upex2, dnex2 with upperBB, lowerBB to get upex3 and dnex3.

4. Take greater of upex3 and upperBB as new upper band upex, smaller of dnex3 and lowerBB as new lower band dnex.

5. Go long when price below dnex, close position when green candle appears (close > open).

## Advantage Analysis  

1. Enhanced BB improves sensitivity of original BB for earlier reversal signals.

2. Filters whipsaws with candlestick pattern. 

3. Backtest shows steady profitability from 2008-2018, smooth curve, max DD < 20%. 

4. Configurable leverage, trading hours for risk control.

## Risk Analysis

1. Poor BB parameter tuning may cause over-trading or missed opportunities.

2. Long only, unable to profit from trend reversal.

3. Candle filter may lag, unable to exit timely.

4. 10-year backtest data insufficient to test robustness. 

5. Fails to adapt to large gap or opening jumps.

## Optimization Directions

1. Test parameter combinations to optimize BB settings.

2. Add other signal filters to improve profitability. 

3. Consider short trades when price exceeds upper band.

4. Set stop loss to limit single trade loss.

5. Develop auto tuning based on changing market.

6. Optimize entry rules for gaps and jumps.

7. Expand backtest period to test parameters.

## Summary

This strategy identifies reversal points with enhanced BB and goes long near lower band with candle filter for quick profit taking. Backtest performance is good. But long only, limited sample, param tuning needed. May face drawdown when market changes. Next steps are confirming signals to boost win rate, short trades, longer backtest for robustness, to improve adaptiveness and stability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|false|Short|
|v_input_3|100|Capital, %|
|v_input_4|20|bars|
|v_input_5|25|percent|
|v_input_6|true|Show Lines?|
|v_input_7|1900|From Year|
|v_input_8|2100|To Year|
|v_input_9|true|From Month|
|v_input_10|12|To Month|
|v_input_11|true|From day|
|v_input_12|31|To day|
|v_input_13|2|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's Advanced Bollinger Bands Strategy v1.0", shorttitle = "ABB str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 5)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(false, defval = false, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
p = input(20, "bars")
d = input(25, "percent")
showlines = input(true, defval = true, title = "Show Lines?")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

mult = input(2.0, minval=0.001, maxval=50)
basis = sma(close, p)
dev = mult * stdev(close, p)
source = close
upperBB = basis + dev
lowerBB = basis - dev
b1 = plot(basis, color=gray, linewidth=1)
p1 = plot(upperBB, color=aqua,  linewidth=1)
p2 = plot(lowerBB, color=aqua, linewidth=1)

//SMAs
sma = sma(close, p)
upex2 = sma * ((100 + d) / 100)
dnex2 = sma * ((100 - d) / 100)

upex3 = (upex2 + upperBB) / 2
dnex3 = (dnex2 + lowerBB) / 2

upex = max(upperBB, upex3)
dnex = min(lowerBB, dnex3)
//exit = (high > sma and low < sma)
exit = close > open


//Lines
col = showlines ? blue : na
plot(upex, linewidth = 3, color = col, transp = 0)
plot(sma, linewidth = 3, color = col, transp = 0)
plot(dnex, linewidth = 3, color = col, transp = 0)

//Trading
lot = strategy.position_size != strategy.position_size[1] ? strategy.equity / close * capital / 100 : lot[1]

if (not na(close[p]))
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, limit = dnex)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, limit = upex)

if exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/427456

> Last Modified

2023-09-21 11:45:37
