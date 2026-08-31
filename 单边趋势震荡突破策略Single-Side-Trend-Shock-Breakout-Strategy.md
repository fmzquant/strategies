
> Name

单边趋势震荡突破策略Single-Side-Trend-Shock-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11971fb0f7899cba280.png)


## Overview  

The Single Side Trend Shock Breakout Strategy is a breakout strategy that utilizes price channels and trend judgment. It aims to identify trend direction, enter on breakouts during range-bound periods, and exit when a profit target is reached.

## Strategy Logic  

The strategy calculates upper and lower bands of a price channel using highest and lowest prices over a recent N periods. It then computes a price midline. Distances between prices and midline are averaged to obtain the channel bands.  

For trend detection, the strategy checks if recent candles all close above (bullish) or below (bearish) the channel. Upon trend confirmation, it awaits price shocks near the bands and enters in reverse direction.  

Body breakouts supplement the entry signals when body length exceeds a multiple of average body length. The strategy sets a profit target after entry and takes profit when price reaches it.

## Advantage Analysis

The main advantages of this strategy are:

1. Price channel filters reduce false breakout risks 
2. Reverse entries profit from trend shocks
3. Body breakouts improve entry accuracy
4. Profit target allows taking gains actively  

## Risk Analysis

There are also some risks:

1. Improper channel parameter may widen/narrow the channel excessively  
2. Reversals against strong trends can lead to large losses
3. Body breakouts tend to generate false signals on tops
4. Rigid profit target may leave profits on the table  

These can be addressed via parameter tuning, avoiding reversals during strong trends, optimizing exit logic etc.

## Enhancement Opportunities

Some ways to improve the strategy:

1. Add trend indicators to confirm trends
2. Optimize body breakout parameters to reduce false signals   
3. Additional filters on entry timing   
4. Dynamic adjustment of profit target  

## Conclusion

The Single Side Trend Shock Breakout Strategy profits from breakouts against the trend in ranging periods. It has the advantage of trend identification and active profit-taking, but also has some risks. These risks can be reduced through multi-factor confirmation, parameter optimization etc. The strategy suits short-term trading and can complement trend-following strategies.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|false|take, %|
|v_input_4|true|Bands Entry|
|v_input_5|false|Counter-trend entry|
|v_input_6|10|Body length|
|v_input_7|true|Trend bars|
|v_input_8|20|Period|
|v_input_9|true|Show Bands|
|v_input_10|true|Show Background|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-10 00:00:00
end: 2024-01-17 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=2
strategy("Noro's Bands Scalper Strategy v1.5", shorttitle = "Scalper str 1.5", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
takepercent = input(0, defval = 0, minval = 0, maxval = 1000, title = "take, %")
needbe = input(true, defval = true, title = "Bands Entry")
needct = input(false, defval = false, title = "Counter-trend entry")
bodylen = input(10, defval = 10, minval = 0, maxval = 50, title = "Body length")
trb = input(1, defval = 1, minval = 1, maxval = 5, title = "Trend bars")
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
chd = close > hd
cld = close < ld
uptrend = trb == 1 and chd ? 1 : trb == 2 and chd and chd[1] ? 1 : trb == 3 and chd and chd[1] and chd[2] ? 1 : trb == 4 and chd and chd[1] and chd[2] and chd[3] ? 1 : trb == 5 and chd and chd[1] and chd[2] and chd[3] and chd[4] ? 1 : 0
dntrend = trb == 1 and cld ? 1 : trb == 2 and cld and cld[1] ? 1 : trb == 3 and cld and cld[1] and cld[2] ? 1 : trb == 4 and cld and cld[1] and cld[2] and cld[3] ? 1 : trb == 5 and cld and cld[1] and cld[2] and cld[3] and cld[4] ? 1 : 0
trend = dntrend == 1 and high < center ? -1 : uptrend == 1 and low > center ? 1 : trend[1]

//trend = close < ld and high < center ? -1 : close > hd and low > center ? 1 : trend[1]

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
smabody = ema(body, 30) / 10 * bodylen

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

https://www.fmz.com/strategy/439225

> Last Modified

2024-01-18 14:59:30
