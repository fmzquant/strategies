
> Name

Noros-Price-Channel-Scalping-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/104d580b14467d9ab07.png)

## Overview  

Noro's Price Channels Scalping Strategy is a scalping trading strategy based on price channels and volatility bands. This strategy uses price channels and volatility bands to identify market trends and takes positions when trend reversals occur.

## Strategy Logic

The strategy first calculates the highest price channel (lasthigh) and lowest price channel (lastlow) of the price, then calculates the middle line of the price channel (center). Next, it calculates the distance (dist) between the price and the middle line as well as the simple moving average of the distance (distsma). Based on this, the volatility bands of 1 time (hd and ld) and 2 times (hd2 and ld2) the distance from the middle line can be calculated.  

When the price breaks through the volatility band of 1 time the distance from the middle line, it is judged as bullish. When the price breaks through the volatility band below the middle line, it is judged as bearish. The strategy opens positions in reverse when signs of exhaustion occur in trends. For example, in an uptrend, if there are two yang lines, short positions will be opened on the close of the second yang line; in a downtrend, if there are two yin lines, long positions will be opened on the close of the second yin line.

## Advantages of the Strategy

1. Use price channels to determine market trend direction and avoid trading errors  
2. Use volatility bands to judge whether the trend is exhausted and accurately capture turning points
3. Adopt scalping trading to earn profits quickly

## Risks of the Strategy  

1. Price channels and volatility bands may fail when price fluctuations are large
2. Scalping trading requires high trading frequency, which can increase trading costs and slippage risks  
3. Stop loss strategies need to be fully considered to control loss risks

## Optimization of the Strategy

1. Optimize parameters of price channels and volatility bands to adapt to more market conditions  
2. Incorporate other indicators to determine trends and turning points  
3. Increase stop loss strategies  4. Consider impacts of trading costs and slippage

## Conclusion  

In general, Noro's Price Channels Scalping Strategy is a strategy very suitable for scalping trading. It uses price channels and volatility bands to determine market trends, and opens reverse positions when topping or bottoming signs appear. The strategy has high trading frequency, fast profit-making, but also faces certain risks. Further optimization can enable the strategy to be applied in more different markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|20|Period|
|v_input_4|true|Show Bands|
|v_input_5|true|Show Background|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-10 00:00:00
end: 2023-12-10 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=2
strategy("Noro's Bands Scalper Strategy v1.0", shorttitle = "Scalper str 1.0", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
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
dn7 = trend == 1 and bar == 1 and bar[1] == 1 and close > strategy.position_avg_price ? 1 : 0
up8 = trend == -1 and bar == -1 and bar[1] == -1 and close < strategy.position_avg_price ? 1 : 0
dn8 = trend == -1 and bar == 1 and bar[1] == 1 ? 1 : 0

if up7 == 1 or up8 == 1
    strategy.entry("Long", strategy.long, needlong == false ? 0 : trend == -1 ? 0 : na)

if dn7 == 1 or dn8 == 1
    strategy.entry("Short", strategy.short, needshort == false ? 0 : trend == 1 ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/435019

> Last Modified

2023-12-11 17:06:27
