
> Name

Dual-Moving-Average-Reversal-Strategy-430007

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ee4d471aaca9894b79.png)



## Overview

This strategy mainly uses dual moving averages as buy and sell signals to profit from trend reversals. It goes long when the short-term moving average crosses above the long-term moving average, and goes short when the short-term moving average crosses below the long-term moving average. It belongs to a common trailing stop loss strategy.

## Strategy Logic  

The strategy first sets up two moving averages, one shorter-term 20-day MA and one longer-term 60-day MA. It then judges the crossing situations between the two MAs to determine entry. 

Specifically, when the short-term MA crosses above the long-term MA, it signals an uptrend, so go long. When the short-term MA crosses below the long-term MA, it signals a downtrend, so go short.

The stop loss method after going long or short is trailing stop based on highest price and lowest price to lock in maximum profit. 

The main logic of the code is:

1. Calculate the 20-day EMA and 60-day EMA
2. Judge if 20-day EMA crosses above 60-day EMA, if yes go long
3. Judge if 20-day EMA crosses below 60-day EMA, if yes go short
4. After going long, set stop loss at 3% below highest price 
5. After going short, set stop loss at 3% above lowest price
6. Keep adjusting stop loss when in positions

## Advantage Analysis

The advantages of this strategy are:

1. Simple logic easy to implement.  
2. Dual MA can effectively filter false breaks.
3. Trailing stop locks in maximum profit. 
4. Can timely capture signals when trend changes. 
5. Proper drawdown control, relatively stable.

## Risk Analysis

There are also some risks:

1. Frequent crosses between MAs when trend is unclear, leading to overtrading losses.
2. Improper stop loss setting can be too loose or too aggressive.
3. Wrong parameter settings like period length may miss key signals.  
4. High trading costs erodes profit margin.

To address the risks:

1. Adopt filters when trend is unclear to avoid blind trading.
2. Test and optimize stop loss range for proper setting.
3. Find optimum parameters through backtest and tuning.
4. Reduce position size to lower trading costs. 

## Optimization Ideas

The strategy can be further optimized in the following areas:

1. Add other filters like RSI for multi-condition entry, avoiding false breaks.

2. Optimize MA periods to find best parameter mix. Can test different periods by incremental walk forward.  

3. Optimize stop loss range through backtest calculation to find optimum range. Can also use dynamic stop loss.

4. Set re-entry logic after stop loss exit to reduce trade frequency.

5. Combine with trend indicator to pause trading when trend is unclear.

6. Add position sizing and dynamic stop loss based on market conditions. 

## Summary

In summary, the dual MA reversal strategy is simple and practical overall, identifying trend turning points through dual MA crossovers. But there are risks that need parameter tuning, stop loss optimization, and adding filters to maximize strategy efficacy. With meticulous optimization and disciplined risk management, it can become a steady profit-bearing swing trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|false|take, %|
|v_input_4|true|Bands Entry|
|v_input_5|false|Counter-trend entry|
|v_input_6|true|Double Body|
|v_input_7|20|Period|
|v_input_8|true|Show Bands|
|v_input_9|true|Show Background|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-23 00:00:00
end: 2023-10-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=2
strategy("Noro's Bands Scalper Strategy v1.4", shorttitle = "Scalper str 1.4", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
takepercent = input(0, defval = 0, minval = 0, maxval = 1000, title = "take, %")
needbe = input(true, defval = true, title = "Bands Entry")
needct = input(false, defval = false, title = "Counter-trend entry")
needdb = input(true, defval = true, title = "Double Body")
len = input(20, defval = 20, minval = 2, maxval = 200, title = "Period")
needbb = input(true, defval = true, title = "Show Bands")
needbg = input(true, defval = true, title = "Show Background")
src = close

//PriceChannel 1
lasthigh = highest(src, len)
lastlow = lowest(src, len)
center = (lasthigh + lastlow) / 2

//Distance
dist = abs(src - center)
distsma = sma(dist, len)
hd = center + distsma
ld = center - distsma
hd2 = center + distsma * 2
ld2 = center - distsma * 2

//Trend
trend = close < ld and high < center ? -1 : close > hd and low > center ? 1 : trend[1]

//Lines
colo = needbb == false ? na : black
plot(hd2, color = colo, linewidth = 1, transp = 0, title = "High band 2")
plot(hd, color = colo, linewidth = 1, transp = 0, title = "High band 1")
plot(center, color = colo, linewidth = 1, transp = 0, title = "center")
plot(ld, color = colo, linewidth = 1, transp = 0, title = "Low band 1")
plot(ld2, color = colo, linewidth = 1, transp = 0, title = "Low band 2")

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 80)

//Body
body = abs(close - open)
smabody = needdb == false ? ema(body, 30) : ema(body, 30) * 2
candle = high - low

//Signals
bar = close > open ? 1 : close < open ? -1 : 0
up7 = trend == 1 and ((bar == -1 and bar[1] == -1) or (body > smabody and bar == -1)) ? 1 : 0
dn7 = trend == 1 and ((bar == 1 and bar[1] == 1) or (close > hd and needbe == true)) and close > strategy.position_avg_price * (100 + takepercent) / 100 ? 1 : 0
up8 = trend == -1 and ((bar == -1 and bar[1] == -1) or (close < ld2 and needbe == true)) and close < strategy.position_avg_price * (100 - takepercent) / 100 ? 1 : 0
dn8 = trend == -1 and ((bar == 1 and bar[1] == 1) or (body > smabody and bar == 1)) ? 1 : 0

if up7 == 1 or up8 == 1 
    strategy.entry("Long", strategy.long, needlong == false ? 0 : trend == -1 and needct == false ? 0 : na)

if dn7 == 1 or dn8 == 1
    strategy.entry("Short", strategy.short, needshort == false ? 0 : trend == 1 and needct == false ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/430007

> Last Modified

2023-10-24 10:56:08
