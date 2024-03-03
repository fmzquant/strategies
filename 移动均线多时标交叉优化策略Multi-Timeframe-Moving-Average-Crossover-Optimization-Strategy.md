
> Name

移动均线多时标交叉优化策略Multi-Timeframe-Moving-Average-Crossover-Optimization-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17e7d77ffaa91c220d9.png)
[trans]

## 概述
该策略是基于著名指标CM_Ultimate_MA_MTF改写而成的,可以在多个时间尺度上绘制移动平均线,实现不同时间周期MA的交叉操作。策略同时具有追踪止损功能。

## 策略原理
1. 根据用户选择,通过不同类型的MA指标在主图周期及更高周期上分别绘制MA线。
2. 当快周期的MA线上穿慢周期MA线时,做多;当快周期MA线下穿慢周期MA线时,做空。
3. 添加追踪止损机制,进一步控制风险。

## 优势分析
1. 多时间尺度MA交叉,可以提高信号质量,减少假信号。
2. 不同类型MA的组合,可以发挥各自指标的优势,提高稳定性。
3. 追踪止损有助于及时止损,降低大幅亏损的概率。

## 风险分析
1. MA指标滞后,可能错过短线操作机会。 
2. 需要适当优化MA周期参数,否则可能产生过多假信号。
3. 止损点设置不合理可能造成不必要止损。

## 优化方向
1. 可以测试不同参数的MA组合,寻找最佳参数。  
2. 可以加入其他指标过滤,提高信号质量。
3. 可以优化止损策略,使之更符合市场特点。

## 总结
该策略整合了移动平均线的多时间框架分析和追踪止损方法,旨在提高信号质量和控制风险水平。通过参数优化和加入其他指标,可以进一步增强策略效果。

||

## Overview  
This strategy is based on the famous CM_Ultimate_MA_MTF indicator and rewritten into a trading strategy. It can plot moving averages across multiple timeframes and generate crossover signals between MAs of different periods. The strategy also incorporates a trailing stop loss mechanism.   

## Strategy Logic   
1. Plot MA lines of different types on the main chart timeframe and higher timeframes based on user configuration.
2. Go long when faster MA crosses above slower MA; go short when faster MA crosses below slower MA.  
3. Add trailing stop loss to further control risks.  

## Advantage Analysis
1. MA crossovers across timeframes can improve signal quality and reduce false signals.  
2. Combination of different MA types utilizes strengths of individual indicators for better stability.
3. Trailing stop loss helps to limit losses in a timely manner.   

## Risk Analysis 
1. Lagging nature of MA may miss short-term opportunities.  
2. Poor optimization of MA periods may generate excessive false signals. 
3. Improper stop loss placement may cause unnecessary exit.  

## Optimization Directions 
1. Test combinations of MA parameters to find optimum setup.   
2. Add other indicators for signal filtration and quality improvement.  
3. Optimize stop loss strategy to suit market profile.  

## Conclusion
The strategy integrates multi-timeframe analysis and trailing stop approaches of moving averages to improve signal quality and risk control. Further enhancement can be achieved through parameter tuning and adding complementary indicators.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use Current Chart Resolution?|
|v_input_2|D|Use Different Timeframe? Uncheck Box Above|
|v_input_3|20|Moving Average Length - LookBack Period|
|v_input_4|true|1=SMA, 2=EMA, 3=WMA, 4=HullMA, 5=VWMA, 6=RMA, 7=TEMA|
|v_input_5|true|Change Color Based On Direction?|
|v_input_6|2|Color Smoothing - 1 = No Smoothing|
|v_input_7|false|Optional 2nd Moving Average|
|v_input_8|50|Moving Average Length - Optional 2nd MA|
|v_input_9|true|1=SMA, 2=EMA, 3=WMA, 4=HullMA, 5=VWMA, 6=RMA, 7=TEMA|
|v_input_10|true|Change Color Based On Direction 2nd MA?|
|v_input_11|false|***You Can Turn On The Show Dots Parameter Below Without Plotting 2nd MA to See Crosses***|
|v_input_12|false|***If Using Cross Feature W/O Plotting 2ndMA - Make Sure 2ndMA Parameters are Set Correctly***|
|v_input_13|false|Show Dots on Cross of Both MA's|
|v_input_14|true|Use Trailing Stop?|
|v_input_15|200|Stop Loss Trail Points|
|v_input_16|400|Stop Loss Trail Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-29 00:00:00
end: 2024-01-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2

strategy(title = "Ultimate Moving Average Strategy", shorttitle = "UMA Strategy", overlay = true)

//Created by user ChrisMoody 4-24-2014
//Converted to strategy by Virtual_Machinist 7-11-2018
//Plots The Majority of Moving Averages
//Defaults to Current Chart Time Frame --- But Can Be Changed to Higher Or Lower Time Frames
//2nd MA Capability with Show Crosses Feature

//inputs
src = close
useCurrentRes = input(true, title="Use Current Chart Resolution?")
resCustom = input(title="Use Different Timeframe? Uncheck Box Above",  defval="D")
len = input(20, title="Moving Average Length - LookBack Period")
atype = input(1,minval=1,maxval=7,title="1=SMA, 2=EMA, 3=WMA, 4=HullMA, 5=VWMA, 6=RMA, 7=TEMA")
cc = input(true,title="Change Color Based On Direction?")
smoothe = input(2, minval=1, maxval=10, title="Color Smoothing - 1 = No Smoothing")
doma2 = input(false, title="Optional 2nd Moving Average")
len2 = input(50, title="Moving Average Length - Optional 2nd MA")
atype2 = input(1,minval=1,maxval=7,title="1=SMA, 2=EMA, 3=WMA, 4=HullMA, 5=VWMA, 6=RMA, 7=TEMA")
cc2 = input(true,title="Change Color Based On Direction 2nd MA?")
warn = input(false, title="***You Can Turn On The Show Dots Parameter Below Without Plotting 2nd MA to See Crosses***")
warn2 = input(false, title="***If Using Cross Feature W/O Plotting 2ndMA - Make Sure 2ndMA Parameters are Set Correctly***")
sd = input(false, title="Show Dots on Cross of Both MA's")

useStop     = input(defval = true, title = "Use Trailing Stop?")
slPoints    = input(defval = 200, title = "Stop Loss Trail Points", minval = 1)
slOffset    = input(defval = 400, title = "Stop Loss Trail Offset", minval = 1)

res = useCurrentRes ? timeframe.period : resCustom
//hull ma definition
hullma = wma(2*wma(src, len/2)-wma(src, len), round(sqrt(len)))
//TEMA definition
ema1 = ema(src, len)
ema2 = ema(ema1, len)
ema3 = ema(ema2, len)
tema = 3 * (ema1 - ema2) + ema3

avg = atype == 1 ? sma(src,len) : atype == 2 ? ema(src,len) : atype == 3 ? wma(src,len) : atype == 4 ? hullma : atype == 5 ? vwma(src, len) : atype == 6 ? rma(src,len) : tema
//2nd Ma - hull ma definition
hullma2 = wma(2*wma(src, len2/2)-wma(src, len2), round(sqrt(len2)))
//2nd MA TEMA definition
sema1 = ema(src, len2)
sema2 = ema(sema1, len2)
sema3 = ema(sema2, len2)
stema = 3 * (sema1 - sema2) + sema3

avg2 = atype2 == 1 ? sma(src,len2) : atype2 == 2 ? ema(src,len2) : atype2 == 3 ? wma(src,len2) : atype2 == 4 ? hullma2 : atype2 == 5 ? vwma(src, len2) : atype2 == 6 ? rma(src,len2) : tema

out = avg 
out_two = avg2

out1 = request.security(syminfo.tickerid, res, out)
out2 = request.security(syminfo.tickerid, res, out_two)

ma_up = out1 >= out1[smoothe]
ma_down = out1 < out1[smoothe]

col = cc ? ma_up ? lime : ma_down ? red : aqua : aqua
col2 = cc2 ? ma_up ? lime : ma_down ? red : aqua : aqua

circleYPosition = out2

plot(out1, title="Multi-Timeframe Moving Avg", style=line, linewidth=4, color = col)
plot(doma2 and out2 ? out2 : na, title="2nd Multi-TimeFrame Moving Average", style=circles, linewidth=4, color=col2)
plot(sd and cross(out1, out2) ? circleYPosition : na,style=cross, linewidth=5, color=yellow)

// Strategy conditions

longCond    = ma_up
shortCond   = ma_down
// entries and base exit
strategy.entry("long", strategy.long, when = longCond)
strategy.entry("short", strategy.short, when = shortCond)

if (useStop)
    strategy.exit("XL", from_entry = "long", trail_points = slPoints, trail_offset = slOffset)
    strategy.exit("XS", from_entry = "short", trail_points = slPoints, trail_offset = slOffset)
// not sure needed, but just incase..
strategy.exit("XL", from_entry = "long", when = shortCond)
strategy.exit("XS", from_entry = "short", when = longCond)
```

> Detail

https://www.fmz.com/strategy/437747

> Last Modified

2024-01-05 12:05:42
