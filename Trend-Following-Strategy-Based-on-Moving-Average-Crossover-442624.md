
> Name

Trend-Following-Strategy-Based-on-Moving-Average-Crossover-442624

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1027409f8e007535a66.png)

## Overview

This strategy determines the price trend direction by calculating two moving averages with different parameter settings and comparing their crossover situations, so as to implement trend following trading. When the fast moving average breaks through the slow moving average from below, it is judged as a bullish signal. When the fast moving average breaks through the slow moving average from above, it is judged as a bearish signal. This strategy can achieve judgment of trends of different cycles by adjusting parameters.

## Strategy Principle  

This strategy uses two sets of moving averages with different parameter settings for comparison. The first moving average parameter is set by len1 and type1, and the second moving average parameter is set by len2 and type2. Where len1 and len2 represent the cycle length of the two moving averages respectively, and type1 and type2 represent the algorithm type of the moving average.

When the fast moving average crosses above the slow moving average to form a golden cross, it is judged as a bullish signal. When the fast moving average crosses below the slow moving average to form a dead cross, it is judged as a bearish signal.

According to the direction of the crossover signal, long or short positions will be executed. When a bullish signal is triggered, if the needlong parameter is true, a long position will be opened with the quantity default_qty_value or percentage_of_equity. When a bearish signal is triggered, if the needshort parameter is true, a short position will be opened with the quantity default_qty_value or percentage_of_equity.  

## Advantages

1. Support the combination of 7 different types of moving averages to flexibly adapt to market conditions  
2. Customize parameters of two moving averages to judge long-term and medium-short term trends  
3. Simple and clear signal judgment rules, easy to understand and implement  
4. Support long and short positions, can carry out trend tracking transactions

## Risks and Solutions

1. Moving averages have lagging properties and may miss price reversal points  
Solution: Appropriately shorten moving average cycles, or use in combination with other indicators

2. Not suitable for markets with high volatility and frequent reversals  
Solution: Add filtering conditions to avoid trading in oscillating markets  

3. There are certain risks of false signals  
Solution: Add other filtering indicators for combination to improve signal reliability   

## Optimization Directions    

1. Optimize the cycle combination of moving averages, and test the impact of long and short cycle parameters on strategy return  
2. Test the performance of different types of moving averages to find the optimal moving average algorithm  
3. Add trading volume variable or Bollinger Bands for combination to improve signal quality   
4. Optimize position management strategy to improve fixed position percentage_of_equity approach  

## Summary

This strategy judges the price trend by comparing the crossovers of two moving averages, and makes corresponding long and short operations to capture and profit from trends. The advantage is that the signal rules are simple and clear, the parameters are adjustable, the applicability is strong, and it can be optimized and adjusted for various market environments. Pay attention to prevent the lagging risks of moving averages and choppy markets, which can be reduced by adding other indicators for filtering to improve signal quality.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|long|
|v_input_2|true|short|
|v_input_3|15|Fast MA length|
|v_input_4|true|Fast MA Type|
|v_input_5_close|0|Fast MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|30|Slow MA length|
|v_input_7|true|Slow MA Type|
|v_input_8_close|0|Slow MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|false|Color of bar|
|v_input_10|false|1 SMA, 2 EMA, 3 VWMA, 4 DEMA, 5 TEMA, 6 KAMA, 7 Price Channel|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title = "Noro's MAs Cross Tests v1.0", shorttitle = "MAs Cross tests 1.0", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100.0, pyramiding = 0)

needlong = input(true, "long")
needshort = input(true, "short")

len2 = input(15, defval = 15, minval = 2, maxval = 1000, title = "Fast MA length")
type2 = input(1, defval = 1, minval = 1, maxval = 7, title = "Fast MA Type")
src2 = input(close, defval = close, title = "Fast MA Source")

len1 = input(30, defval = 30, minval = 2, maxval = 1000, title = "Slow MA length")
type1 = input(1, defval = 1, minval = 1, maxval = 7, title = "Slow MA Type")
src1 = input(close, defval = close, title = "Slow MA Source")

col = input(false, defval = false, title = "Color of bar")

o = input(false, title = "1 SMA, 2 EMA, 3 VWMA, 4 DEMA, 5 TEMA, 6 KAMA, 7 Price Channel") 

//DEMA 1
dema1 = 2 * ema(src1, len1) - ema(ema(close, len1), len1)

//TEMA 1
xEMA1 = ema(src1, len1)
xEMA2 = ema(xEMA1, len1)
xEMA3 = ema(xEMA2, len1)
tema1 = 3 * xEMA1 - 3 * xEMA2 + xEMA3

//KAMA 1
xvnoise = abs(src1 - src1[1])
nfastend = 0.20
nslowend = 0.05
nsignal = abs(src1 - src1[len1])
nnoise = sum(xvnoise, len1)
nefratio = iff(nnoise != 0, nsignal / nnoise, 0)
nsmooth = pow(nefratio * (nfastend - nslowend) + nslowend, 2) 
kama1 = nz(kama1[1]) + nsmooth * (src1 - nz(kama1[1]))

//PriceChannel 1
lasthigh1 = highest(src1, len1)
lastlow1 = lowest(src1, len1)
center1 = (lasthigh1 + lastlow1) / 2

//DEMA 2
dema2 = 2 * ema(src2, len2) - ema(ema(close, len2), len2)

//TEMA 2
xEMA12 = ema(src2, len2)
xEMA22 = ema(xEMA12, len2)
xEMA32 = ema(xEMA22, len2)
tema2 = 3 * xEMA12 - 3 * xEMA22 + xEMA32

//KAMA 2
xvnoise2 = abs(src2 - src2[1])
nfastend2 = 0.20
nslowend2 = 0.05
nsignal2 = abs(src2 - src2[len2])
nnoise2 = sum(xvnoise2, len2)
nefratio2 = iff(nnoise2 != 0, nsignal2 / nnoise2, 0)
nsmooth2 = pow(nefratio2 * (nfastend2 - nslowend2) + nslowend2, 2) 
kama2 = nz(kama2[1]) + nsmooth2 * (src2 - nz(kama2[1]))

//PriceChannel 2
lasthigh2 = highest(src2, len2)
lastlow2 = lowest(src2, len2)
center2 = (lasthigh2 + lastlow2) / 2

//MAs
ma1 = type1 == 1 ? sma(src1, len1) : type1 == 2 ? ema(src1, len1) : type1 == 3 ? vwma(src1, len1) : type1 == 4 ? dema1 : type1 == 5 ? tema1 : type1 == 6 ? kama1 : type1 == 7 ? center1 : 0
ma2 = type2 == 1 ? sma(src2, len2) : type2 == 2 ? ema(src2, len2) : type2 == 3 ? vwma(src2, len2) : type2 == 4 ? dema2 : type2 == 5 ? tema2 : type2 == 6 ? kama2 : type2 == 7 ? center2 : 0
plot(ma1, color = blue, linewidth = 3, transp = 0)
plot(ma2, color = red, linewidth = 3, transp = 0)

//Signals
trend = ma2 > ma1 ? 1 : ma2 < ma1 ? -1 : trend[1]
up = trend == 1 and ((close < open and close[1] < open[1]) or col == false)
dn = trend == -1 and ((close > open and close[1] > open[1]) or col == false)

if up
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)

if dn
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/442624

> Last Modified

2024-02-23 12:21:40
