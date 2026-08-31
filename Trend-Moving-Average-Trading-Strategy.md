
> Name

Trend-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses a combination of fast and slow moving averages to determine the trend direction and catch the mid-to-long-term trends for trend trading. It goes long when the fast MA crosses above the slow MA, and goes short when the fast MA crosses below the slow MA. This is a typical trend-following strategy.

## Strategy Logic

The strategy mainly relies on the golden cross and death cross of moving averages to determine market trends. Specifically, it uses a 5-period fast MA and a 21-period slow MA. 

When the fast MA crosses above the slow MA, it signals an uptrend in the market, and the strategy will go long at the open of the next bar. When the fast MA crosses below the slow MA, it signals a downtrend, and the strategy will go short at the next bar's open.

In addition, the "bars" parameter is set to filter out false breakouts. The default value is 2, which means the fast MA needs to close above the slow MA for 2 consecutive bars before triggering a long signal. This avoids false breakouts effectively. 

For crypto trading, the strategy also incorporates extreme value logic - only when both fast and slow MAs reach extreme areas will trading signals be triggered. This further avoids false signals.

The exit rule is simple and direct - close position when stop loss is hit. 

## Advantages

- The dual MA system can track trends effectively
- The fast MA reacts fast to trend changes
- The slow MA determines the overall direction
- The "bars" parameter filters out some false breakouts 
- Extreme value guards avoids sporadic false signals around critical points
- Moving stop loss manages risks

## Risks

- Dual MA systems tend to lose around trend reversals
- Moving stop loss may stop out prematurely  
- The "bars" filter may miss some valid signals
- Extreme value guards occasionally miss good entries
- The strategy works better in strong trending markets

Risks can be reduced by:

- Optimizing the "bars" parameter
- Adding other filters like MACD
- Adjusting stop loss levels to avoid premature stop out
- Considering re-entries

## Optimization Directions

The strategy can be improved from the following aspects:

1. MA parameters tuning
  
  Test more MA combinations to find the optimal parameters for current market, e.g. 10-period fast MA and 50-period slow MA.
  
2. Adding other indicators

  Test adding MACD, KDJ and other indicators to set more strict entry rules and avoid false signals.
  
3. Optimizing entries

  Current simple dual MA entry can be enhanced:

  - Enter long only if MACDDIFF also crosses above 0 when fast MA crosses above slow MA
  - Enter long only if KDJ gives golden cross when fast MA crosses above slow MA
  
4. Optimizing stops

  Test other stop mechanisms like trailing stop to avoid premature stop out.

5. Adding re-entries

  Allow re-entries after stops are hit, to avoid missing trends.

## Summary

In summary, this basic trend-following strategy has simple and straightforward logic - using dual MAs for trend direction and moving stops for risk management. The pros are easy to understand, can profit from trends, and manages risks. But limitations exist too, like bad signals during consolidations, premature stop outs, etc. Live tuning and optimization are needed, such as adding filters, adjusting stops, to make it adaptable to different market environments. As an introductory trend trading strategy, it is suitable for beginners to learn and apply. But its limitations should be noted, and more advanced strategies should be explored. Only through continuous improvements can one achieve sustainable profits in ever-changing markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|long|
|v_input_2|true|short|
|v_input_3|false|stops|
|v_input_4|5|Stop, %|
|v_input_5|true|Use fast MA Filter|
|v_input_6|5|fast MA Period|
|v_input_7|21|slow MA Period|
|v_input_8|2|Bars Q|
|v_input_9|false|Need trend Background?|
|v_input_10|true|Need extreme? (crypto/fiat only!!!)|
|v_input_11|1900|From Year|
|v_input_12|2100|To Year|
|v_input_13|true|From Month|
|v_input_14|12|To Month|
|v_input_15|true|From day|
|v_input_16|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title = "Noro's Trend MAs Strategy v2.3", shorttitle = "Trend MAs str 2.3", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, "long")
needshort = input(true, "short")
needstops = input(false, "stops")
stoppercent = input(5, defval = 5, minval = 1, maxval = 50, title = "Stop, %")
usefastsma = input(true, "Use fast MA Filter")
fastlen = input(5, defval = 5, minval = 1, maxval = 50, title = "fast MA Period")
slowlen = input(21, defval = 20, minval = 2, maxval = 200, title = "slow MA Period")
bars = input(2, defval = 2, minval = 0, maxval = 3, title = "Bars Q")
needbg = input(false, defval = false, title = "Need trend Background?")
needex = input(true, defval = true, title = "Need extreme? (crypto/fiat only!!!)")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

src = close

//PriceChannel 1
lasthigh = highest(src, slowlen)
lastlow = lowest(src, slowlen)
center = (lasthigh + lastlow) / 2

//PriceChannel 2
lasthigh2 = highest(src, fastlen)
lastlow2 = lowest(src, fastlen)
center2 = (lasthigh2 + lastlow2) / 2

//Trend
trend = low > center and low[1] > center[1] ? 1 : high < center and high[1] < center[1] ? -1 : trend[1]

//Bars
bar = close > open ? 1 : close < open ? -1 : 0
redbars = bars == 0 ? 1 : bars == 1 and bar == -1 ? 1 : bars == 2 and bar == -1 and bar[1] == -1 ? 1 : bars == 3 and bar == -1 and bar[1] == -1 and bar[2] == -1 ? 1 : 0
greenbars = bars == 0 ? 1 : bars == 1 and bar == 1 ? 1 : bars == 2 and bar == 1 and bar[1] == 1 ? 1 : bars == 3 and bar == 1 and bar[1] == 1 and bar[2] == 1 ? 1 : 0

//Fast RSI
fastup = rma(max(change(close), 0), 2)
fastdown = rma(-min(change(close), 0), 2)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//CryptoBottom
mac = sma(close, 10)
len = abs(close - mac)
sma = sma(len, 100)
max = max(open, close)
min = min(open, close)

//Signals
up1 = trend == 1 and (low < center2 or usefastsma == false) and redbars == 1
dn1 = trend == -1 and (high > center2 or usefastsma == false) and greenbars == 1
up2 = high < center and high < center2 and bar == -1 and needex
dn2 = low > center and low > center2 and bar == 1 and needex
up3 = close < open and len > sma * 3 and min < min[1] and fastrsi < 10 ? 1 : 0

//Lines
plot(center2, color = red, linewidth = 3, transp = 0, title = "Fast MA")
plot(center, color = blue, linewidth = 3, transp = 0, title = "Slow MA")

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 80)

//Trading
stoplong = up1 == 1 and needstops == true ? close - (close / 100 * stoppercent) : stoplong[1]
stopshort = dn1 == 1 and needstops == true ? close + (close / 100 * stoppercent) : stopshort[1]

if up1 or up2 or up3
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    strategy.exit("Stop Long", "Long", stop = stoplong)

if dn1
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    strategy.exit("Stop Short", "Short", stop = stopshort)
    
if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
    
```

> Detail

https://www.fmz.com/strategy/427506

> Last Modified

2023-09-21 20:34:43
