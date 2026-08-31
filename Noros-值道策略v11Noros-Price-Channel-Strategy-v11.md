
> Name

Noros-值道策略v11Noros-Price-Channel-Strategy-v11

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1614f2e58d643da6fea.png)



## Overview

Noro's Price Channel Strategy v1.1 is a trend trading strategy based on price channels and price direction changes. This strategy combines the price channel indicator and fast RSI indicator to identify price breakout signals from the channel, along with consecutive red/green candle color reversal signals to establish long/short positions. The goal of this strategy is to capture the direction of mid-to-long term trends, while avoiding noise from short-term market fluctuations.

## Strategy Logic

The strategy first calculates the average of highest and lowest prices over a certain period to construct a mid-price channel. When the price breaks out above the channel from below, it is considered a long signal. When the price breaks down below the channel from above, it is considered a short signal.

At the same time, the strategy incorporates two auxiliary rules: fast RSI and candle color. When fast RSI is below 25%, it indicates oversold status and prices may rebound. Together with a breakout above the channel, this produces a stronger long signal. In contrast, when fast RSI is above 75%, it indicates overbought status and prices may fall. Together with a breakdown below the channel, this produces a stronger short signal. Additionally, the strategy keeps track of candle color changes over the latest two candles. Two consecutive red candles enhance the short signal, while two consecutive green candles enhance the long signal.

By combining these three signal indicators, the strategy can effectively identify mid-to-long term trends and establish positions accordingly. When the position direction conflicts with the color of the latest candle, it is considered a trend reversal, upon which existing positions are closed.

## Advantages

The biggest advantage of this strategy is incorporating multiple indicators to determine trend direction and avoid noise from short-term market fluctuations. Specifically:

1. The price channel clearly identifies trend direction and strength. Breakouts of the channel bands represent a new stage of the trend with strong signals.

2. The fast RSI judges overbought/oversold conditions to avoid chasing trends at turning points. It suggests buying on oversold and selling on overbought status.

3. Candle color validation further verifies trend persistence. Position is closed if color changes. 

4. The strategy only enters on two consecutive same-colored candles breaking the channel, avoiding false signals from short-term oscillations.

5. The simple average stop loss closes positions once candle color changes, minimizing losses effectively.

## Risks

There are also some risks to note for this strategy:

1. Improper price channel parameter settings may result in channels that are too wide or too narrow, missing trend change points or generating excessive false signals.

2. Improper fast RSI parameter settings may fail to accurately identify overbought/oversold conditions, thus missing reversal opportunities.

3. The simple stop loss mechanism may be too sensitive in choppy trends, causing excessive position opening and closing. 

4. It cannot predict the actual trend continuation after breaking the price channel, leading to amplified losses.

5. It cannot adapt to black swan events with sudden market impacts, resulting in huge losses.

## Enhancement Opportunities 

Some major opportunities to enhance the strategy include:

1. Dynamically adjust price channel parameters to better adapt to volatility across different periods and markets.

2. Incorporate volatility measures to adjust RSI parameters, lowering sensitivity during high volatility and increasing sensitivity during low volatility.

3. Add trailing stop mechanisms with stop levels based on trend volatility to avoid over-sensitive stop outs.

4. Improve identification of breakout strength and bearish/bullish divergences to avoid false breakouts.

5. Incorporate historical data training models to assist in estimating high-probability trend turning points and improve entry accuracy. 

6. Optimize position sizing models to dynamically adjust allocations based on risk conditions.

## Conclusion

Overall, Noro's Price Channel Strategy v1.1 is a simple and practical trend following strategy. It incorporates multiple indicators to identify mid-to-long term trend directions and establishes relatively prudent entry rules. There is room for further enhancement in areas like stop loss mechanisms and dynamic parameter tuning. But the overall logic is simple and clear, making it easy to implement for quantitative trading, especially for beginners. With parameter tuning and mechanism optimization, it can become a stable and reliable trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|true|Use color strategy|
|v_input_4|true|Use RSI strategy|
|v_input_5|true|leverage|
|v_input_6|30|Price Channel|
|v_input_7|true|Show center-line|
|v_input_8|1900|From Year|
|v_input_9|2100|To Year|
|v_input_10|true|From Month|
|v_input_11|12|To Month|
|v_input_12|true|From day|
|v_input_13|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-23 00:00:00
end: 2023-10-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's Price Channel Strategy v1.1", shorttitle = "Price Channel str 1.1", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
usecol = input(true, defval = true, title = "Use color strategy")
usersi = input(true, defval = true, title = "Use RSI strategy")
lev = input(1, defval = 1, minval = 1, maxval = 100, title = "leverage")
pch = input(30, defval = 30, minval = 2, maxval = 200, title = "Price Channel")
showcl = input(true, defval = true, title = "Show center-line")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")
src = close

//Price channel
lasthigh = highest(src, pch)
lastlow = lowest(src, pch)
center = (lasthigh + lastlow) / 2
trend = low > center ? 1 : high < center ? -1 : trend[1]
col = showcl ? blue : na
plot(center, color = col, linewidth = 2)

//Bars
bar = close > open ? 1 : close < open ? -1 : 0
rbars = sma(bar, 2) == -1
gbars = sma(bar, 2) == 1

//Fast RSI
fastup = rma(max(change(src), 0), 2)
fastdown = rma(-min(change(src), 0), 2)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//Signals
body = abs(close - open)
abody = sma(body, 10)
up1 = rbars and close > center and usecol
dn1 = gbars and close < center and usecol
up2 = fastrsi < 25 and close > center and usersi
dn2 = fastrsi > 75 and close < center and usersi
exit = (((strategy.position_size > 0 and close > open) or (strategy.position_size < 0 and close < open)) and body > abody / 2)
lot = strategy.equity / close * lev

//Trading
if up1 or up2
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if dn1 or dn2
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if time > timestamp(toyear, tomonth, today, 23, 59) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/430009

> Last Modified

2023-10-24 10:59:38
