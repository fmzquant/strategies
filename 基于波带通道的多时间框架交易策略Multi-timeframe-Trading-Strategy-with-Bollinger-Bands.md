
> Name

基于波带通道的多时间框架交易策略Multi-timeframe-Trading-Strategy-with-Bollinger-Bands

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy uses adaptive Bollinger Bands to design two types of trailing stop strategies and backtest them systematically across timeframes. It belongs to trend following strategies.

## Strategy Logic

1. Calculate the upper and lower bands of adaptive Bollinger Bands, with adjustable channel width.

2. Breakout tracking strategy to open positions on band breakouts and stop out when price reverts inside bands.

3. Reversion reversal strategy to open positions when price reaches bands and stop out when price reverts back inside bands.

4. Use CCI indicator to assist in determining long/short side. 

5. Backtest across multiple timeframes to verify viability of both strategies.

## Advantages

1. Bollinger Bands are intuitive in capturing price trends.

2. The two strategies fit different market conditions for robustness.

3. CCI helps determine long/short direction.

4. Multi-timeframe backtesting makes results more convincing. 

5. Simple and clear strategy rules easy to implement.

## Risks

1. Bollinger Bands can fail in certain situations.

2. Risks of premature or delayed stops in both strategies. 

3. CCI may generate incorrect signals.

4. Handle backtest biases carefully.

5. Optimization risks overfitting.

## Enhancement

1. Test parameters to find optimal combinations.

2. Evaluate adding filters with other indicators. 

3. Optimize stops to reduce risks.

4. Research adaptive methods for channel width.

5. Verify with more symbols and timeframes.

6. Use machine learning to dynamically optimize parameters.

## Conclusion

This strategy designs two trailing stop strategies based on Bollinger Bands and backtests them across multiple timeframes. Refining via parameter optimization, stop improvements etc can enhance robustness into a mature trend following system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|75|Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|1.9|Deviation|
|v_input_4|20|Period for CCI|
|v_input_5|false|Test Reverse to the Mean instead|
|v_input_6|true|Enable testing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-13 00:00:00
end: 2023-09-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title = "Underworld Hunter", overlay=true)

len = input(75, minval=1, title="Length")
src = input(close, title="Source")
basis = 0.0
basis := na(basis[1]) ? sma(src, len) : ema(ema(ema(src,len),len),len)

mult = input(1.9, minval=0.001, maxval=50, title="Deviation")
dev = mult * stdev(src, len)
upper = basis + dev
lower = basis - dev

//CCI calculation and inputs

lengthcci = input(20, minval=1, title="Period for CCI")
ma = sma(close, lengthcci)
ccivalue = (src - ma) / (0.015 * dev(src, lengthcci))

//CCI plotting

cciover0 = ccivalue >= 100 and ccivalue <= 120
cciover1 = ccivalue > 120 and ccivalue <= 140
cciover2 = ccivalue > 140 and ccivalue <= 160
cciover3 = ccivalue > 160 and ccivalue <= 180
cciover4 = ccivalue > 180

cciunder0 = ccivalue <= -100 and ccivalue >= -120
cciunder1 = ccivalue <= -120 and ccivalue > -140
cciunder2 = ccivalue <= -140 and ccivalue > -160
cciunder3 = ccivalue <= -160 and ccivalue > -180
cciunder4 = ccivalue <= -180

plotshape(cciover0, title="CCIO0", location=location.abovebar, color=#c6ff1a, transp=0, style=shape.circle, size=size.tiny)
plotshape(cciunder0, title="CCIU0", location=location.belowbar, color=#c6ff1a, transp=0, style=shape.circle, size=size.tiny)
plotshape(cciover1, title="CCIO1", location=location.abovebar, color=#ffff00, transp=0,style=shape.circle, size=size.tiny)
plotshape(cciunder1, title="CCIU1", location=location.belowbar, color=#ffff00, transp=0, style=shape.circle, size=size.tiny)
plotshape(cciover2, title="CCIO2", location=location.abovebar, color=#ff9900, transp=0, style=shape.circle, size=size.tiny)
plotshape(cciunder2, title="CCIU2", location=location.belowbar, color=#ff9900, transp=0, style=shape.circle, size=size.tiny)
plotshape(cciover3, title="CCIO3", location=location.abovebar, color=#ff0000, transp=0, style=shape.circle, size=size.tiny)
plotshape(cciunder3, title="CCIU3", location=location.belowbar, color=#ff0000, transp=0, style=shape.circle, size=size.tiny)
plotshape(cciover4, title="CCIO4", location=location.abovebar, color=#cc00cc, transp=0,style=shape.circle, size=size.tiny)
plotshape(cciunder4, title="CCIU4", location=location.belowbar, color=#cc00cc, transp=0,style=shape.circle, size=size.tiny)

//plotting

plot(upper, title="Upper shadow", color=color.black, transp = 30, linewidth = 4)
plot(upper, title="Upper line", color=#FF2E00, transp = 0, linewidth = 2)
plot(lower, title="Lower shadow", color=color.black, transp = 30, linewidth = 4)
plot(lower, title="Lower line", color=#FF2E00, transp = 0, linewidth = 2)
plot(basis, title="Basic line", color=color.red, transp = 50, linewidth = 2)

mean = input(title="Test Reverse to the Mean instead", type=input.bool, defval=false)
test = input(title="Enable testing", type=input.bool, defval=true)

ordersize=floor(50000/close)

if(close>upper and strategy.opentrades==0 and not mean and test)
    strategy.entry("Hunt Up", strategy.long, ordersize)
if (close<upper and close[1]<upper and close[2]<upper)
    strategy.close("Hunt Up", qty_percent = 100, comment = "Hunt End")

if(close<lower and strategy.opentrades==0 and not mean and test)
    strategy.entry("Hunt Down", strategy.short, ordersize)
if (close>lower and close[1]>lower and close[2]>lower)
    strategy.close("Hunt Down", qty_percent = 100, comment = "Hunt End")

//bounce of bands

if(close>upper and strategy.opentrades==0 and mean and test)
    strategy.entry("Sneak Down", strategy.short, ordersize)
if (close<upper and close[1]<upper and close[2]<upper and close>high[1])
    strategy.close("Sneak Down", qty_percent = 100, comment = "SneakEnd")

if(close<lower and strategy.opentrades==0 and mean and test)
    strategy.entry("Sneak Up", strategy.long, ordersize)
if (close>lower and close[1]>lower and close[2]>lower and close<low[1])
    strategy.close("Sneak Up", qty_percent = 100, comment = "Sneak End")



```

> Detail

https://www.fmz.com/strategy/427386

> Last Modified

2023-09-20 15:47:46
