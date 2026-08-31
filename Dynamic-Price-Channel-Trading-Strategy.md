
> Name

Dynamic-Price-Channel-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This article introduces a short-term trading strategy based on dynamic price channels. It judges trend direction by calculating price dynamic channels and trades at channel breakouts.

## Strategy Logic

The strategy is based on the following logic:

1. Calculate dynamic price channels using highest and lowest prices. The upper band is the average of the highest price and channel midpoint. The lower band is the midpoint minus the difference between lowest price and midpoint.  

2. When price breaks above the upper band, an uptrend begins. When price breaks below the lower band, a downtrend begins.

3. In uptrends, go long when two consecutive bearish bars appear. In downtrends, go short when two consecutive bullish bars appear. 

4. Consider counter-trend entries to chase market momentum. For example, short in uptrends and long in downtrends.

5. Set take profit percentages, like x% of entry price, to lock in profits.

## Advantage Analysis 

The advantages of this strategy include:

1. The dynamic channels reflect market changes in real time for better trend judgment.

2. Combining trends and breakouts filters false breakouts. 

3. Counter-trend entries capitalize on market momentum for excess returns.

4. Take profit stops effectively control risks. 

5. The logic is simple and clear for easy implementation.

## Risk Analysis

There are also some risks to consider:

1. Channels may fail during volatile markets. Adjust parameters for robustness.

2. Counter-trend trades are vulnerable to losses. Control loss size.

3. Fake breakouts can cause bad trades. Confirm validity with trends.

4. Avoid overtrading to control costs.

## Conclusion

This strategy integrates dynamic channels, breakouts, and take profits. With proper tuning, it can be an effective short-term trading tool. But traders should note risk control and tailor it to their own styles.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|false|take, %|
|v_input_4|false|Counter-trend entry|
|v_input_5|20|Period|
|v_input_6|true|Show Bands|
|v_input_7|true|Show Background|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-09 00:00:00
end: 2023-09-15 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=2
strategy("Noro's Bands Scalper Strategy v1.1", shorttitle = "Scalper str 1.1", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
takepercent = input(0, defval = 0, minval = 0, maxval = 1000, title = "take, %")
needct = input(false, defval = false, title = "Counter-trend entry")
len = input(20, defval = 20, minval = 2, maxval = 200, title = "Period")
needbb = input(true, defval = true, title = "Show Bands")
needbg = input(true, defval = true, title = "Show Background")
src = close

//PriceChannel
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
sma = sma(close, 20)
smatrend = close > sma ? 1 : close < sma ? -1 : smatrend[1]
trend = close < ld and high < hd ? -1 : close > hd and low > ld ? 1 : trend[1]

//Lines
colo = needbb == false ? na : black
plot(hd, color = colo, linewidth = 1, transp = 0, title = "High band")
plot(center, color = colo, linewidth = 1, transp = 0, title = "center")
plot(ld, color = colo, linewidth = 1, transp = 0, title = "Low band")

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 80)

//Signals
bar = close > open ? 1 : close < open ? -1 : 0
up7 = trend == 1 and bar == -1 and bar[1] == -1 ? 1 : 0
dn7 = trend == 1 and bar == 1 and bar[1] == 1 and close > strategy.position_avg_price * (100 + takepercent) / 100 ? 1 : 0
up8 = trend == -1 and bar == -1 and bar[1] == -1 and close < strategy.position_avg_price * (100 - takepercent) / 100 ? 1 : 0
dn8 = trend == -1 and bar == 1 and bar[1] == 1 ? 1 : 0

if up7 == 1 or up8 == 1
    strategy.entry("Long", strategy.long, needlong == false ? 0 : trend == -1 and needct == false ? 0 : na)

if dn7 == 1 or dn8 == 1
    strategy.entry("Short", strategy.short, needshort == false ? 0 : trend == 1 and needct == false ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/426995

> Last Modified

2023-09-16 19:01:26
