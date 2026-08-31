
> Name

Dual-Track-Fast-Quantitative-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ce7595c5257ff60b31.png)
 ## Overview

This is a dual-track reversal trading strategy  based on price channel, Bollinger bands and fast RSI indicator. It combines channel index to identify trends, Bollinger bands to recognize support and resistance levels, and fast RSI to detect overbought and oversold signals, in order to achieve efficient reversal trading.  

## Strategy Logic

The strategy mainly relies on the following indicators to make trading decisions:

1. Price Channel: Calculates the highest and lowest price over a certain period and plots the channel centerline. Trade signals are generated when the price breaks through the channel.

2. Bollinger Bands: The centerline is the price channel centerline. The upper and lower bands are calculated based on the standard deviation of the deviation of the price from the centerline. Trade signals are generated when the price interacts with the Bollinger bands.

3. Fast RSI (Period = 2): Determines overbought and oversold situations for the price. Goes long when RSI falls below 5, goes short when RSI rises above 95.

4. CryptoBottom Indicator: Determines if the price has broken through the support level. Combined with fast RSI to generate high probability long signals.

According to the timing of price breaking through the channels and Bollinger bands to make trades, and going long or short based on overbought and oversold indications of RSI, the core trading logic of this strategy is formed.

## Advantages of the Strategy

This strategy has the following advantages:

1. Dual-track system increases signal accuracy. Price channel judges major trends and Bollinger bands identify precise support and resistance levels. The combination enhances signal quality.

2. Fast RSI indicator captures reversal opportunities by detecting overbought and oversold. The RSI period is set to be 2 so it can quickly identity reversal nodes.

3. CryptoBottom speeds up confirmation of long signals. Breaking through support levels allows fast judgment of bottom characteristics and avoids missing long signals.

4. Reasonable parameter settings and easy to optimize. Simple and intuitive parameter combinations make it easy for parameter optimization.

## Risks of the Strategy

There are also some risks for this strategy:

1. Improper parameter settings for Bollinger bands may miss significant price moves or generate false signals. 

2. The interaction patterns between the dual tracks can be complex, requiring some technical sophistication for accurate judgments.

3. The risk of failed reversals still exists since the probability of price getting pulled back cannot be eliminated.

4. Difficulty in parameter optimization. The optimal parameters may become ineffective if market conditions change.

## Optimization Directions

The strategy can be improved in the following aspects:

1. Optimize the parameters of Bollinger bands to make the upper and lower bands closer to the price, improving the accuracy of trade signals.

2. Add stop loss mechanisms to cut losses when they reach certain threshold percentages. This effectively controls risks.

3. Incorporate more indicators to determine trend, support and resistance levels to reduce false signals. 

4. Introduce machine learning algorithms to auto-tune the parameters so that they can adapt to changing market environments.

## Conclusion  

This strategy integrates price channel, Bollinger bands and fast RSI indicator to construct a dual-track reversal trading system. While judging major trends, it also quickly seizes support, resistance and overbought/oversold opportunities. The parameter settings are simple and direct, easy to understand and optimize. It can effectively identify reversal chances and suits algorithmic trading.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|20|Period|
|v_input_4|true|Use ColorBar|
|v_input_5|true|Use CryptoBottom|
|v_input_6|true|Use RSI|
|v_input_7|false|Show Bands|
|v_input_8|false|Show Background|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-18 00:00:00
end: 2023-11-30 05:20:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=2
strategy("Noro's Bands Strategy v1.3", shorttitle = "NoroBands str 1.3", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
len = input(20, defval = 20, minval = 2, maxval = 200, title = "Period")
color = input(true, "Use ColorBar")
usecb = input(true, "Use CryptoBottom")
usersi = input(true, "Use RSI")
needbb = input(false, defval = false, title = "Show Bands")
needbg = input(false, defval = false, title = "Show Background")
src = close

//Fast RSI
fastup = rma(max(change(src), 0), 2)
fastdown = rma(-min(change(src), 0), 2)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//CryptoBottom
mac = sma(close, 10)
lencb = abs(close - mac)
sma = sma(lencb, 100)
max = max(open, close)
min = min(open, close)

//PriceChannel
lasthigh = highest(src, len)
lastlow = lowest(src, len)
center = (lasthigh + lastlow) / 2

//dist
dist = abs(src - center)
distsma = sma(dist, len)
hd = center + distsma
ld = center - distsma

//Trend
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
up = trend == 1 and ((close < open or color == false) or close < hd) ? 1 : 0
dn = trend == -1 and ((close > open or color == false) or close > ld) ? 1 : 0 
up2 = close < open and lencb > sma * 3 and min < min[1] and fastrsi < 10 ? 1 : 0 //CryptoBottom
//dn2 = close > open and len > sma * 3 and max > max[1] and fastrsi > 90 ? 1 : 0 //CryptoBottom
up3 = fastrsi < 5 ? 1 : 0
//dn3 = fastrsi > 99 ? 1 : 0

longCondition = up == 1 or (up2 == 1 and usecb == true) or (up3 == 1 and usersi == true)
if (longCondition)
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)

shortCondition = dn == 1
if (shortCondition)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/435898

> Last Modified

2023-12-19 15:59:36
