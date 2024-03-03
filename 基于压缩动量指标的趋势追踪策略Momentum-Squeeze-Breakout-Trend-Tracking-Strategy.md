
> Name

基于压缩动量指标的趋势追踪策略Momentum-Squeeze-Breakout-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c5338d889541d1196a.png)
[trans]


## 概述

该策略基于LazyBear的压缩动量指标,结合布林带和Keltner通道,识别价格突破通道形成的压缩和扩张形态,判断股票价格的潜在趋势方向,采用趋势跟踪方式来决定开仓方向。策略优点是充分利用了动量指标识别潜在趋势的能力,并设置了多个条件过滤器来控制交易信号的质量,可以有效过滤掉不确定的交易信号,避免在震荡盘整中过于频繁交易。

## 策略原理

1. 计算布林带中的中轨、上轨和下轨。中轨为n日收盘价的简单移动平均线,上下轨为中轨加减m倍的n日收盘价标准差。

2. 计算Keltner通道中的中线、上线和下线。中线为n日收盘价的简单移动平均线,上下线为中线加减m倍的n日真实波幅的简单移动平均。

3. 判断价格是否突破布林带和Keltner通道的上下轨构成压缩和扩张形态。当价格从上方突破下轨时为压缩形态,当价格从下方突破上轨时为扩张形态。

4. 计算线性回归曲线的数值,作为动量指标。当动量线上穿0时为买入信号,下穿0时为卖出信号。

5. 结合压缩扩张形态、动量指标方向、均值过滤器等多重条件判断最终交易信号。只有满足所有条件才会生成交易信号,避免错误交易。

## 策略优势

1. 使用布林带和Keltner通道双重过滤,识别高质量的压缩和扩张形态。

2. 动量指标能够及时捕捉价格趋势反转,与通道指标形成互补。

3. 允许超前入场,提高盈利机会。

4. 采用多重条件判断,避免在震荡行情中频繁开仓。

5. 各技术指标参数可自定义,适应不同品种和参数组合。

6. 可设定回测时间段,针对特定时间周期进行优化测试。

## 策略风险

1. 趋势跟踪策略,当趋势发生反转时容易产生亏损。

2. 参数设置不当可能导致交易频率过高或信号质量不佳。

3. 依赖历史数据测试,无法保证未来返回持续稳定。

4. 无法应对突发事件引起的市场震荡和价格剧烈波动。

5. 回测时间窗口设置不当,可能导致过拟合。

## 策略优化方向 

1. 优化布林带和Keltner通道的参数,找到最佳组合。

2. 测试加入移动止损来控制单笔交易最大亏损。

3. 尝试在特定品种、周期参数组合下进一步优化。

4. 探索加入机器学习模型判断趋势反转。

5. 测试不同入场顺序和仓位管理策略。

6. 研究如何识别趋势反转信号并及时止损。

## 总结

该策略融合多种技术指标判断价格趋势方向并进行趋势跟踪,具有较强的适应性。通过参数自定义和多重条件过滤,可以有效控制交易频率和提高信号质量。但反转交易和突发事件仍需警惕,可以继续探索趋势反转信号和风险控制机制进行优化,使策略更稳健。

||
## Overview

This strategy is based on LazyBear's Squeeze Momentum indicator, combining Bollinger Bands and Keltner Channels to identify price breakouts from channel compression and expansion to determine potential trend direction of prices, and adopts a trend following approach to decide entry direction. The advantage of this strategy is making full use of momentum indicator's ability to identify potential trends, and setting multiple condition filters to control signal quality which can effectively filter out uncertain signals and avoid over-trading during ranging markets.

## Strategy Logic

1. Calculate middle band, upper band and lower band of Bollinger Bands. Middle band is n-day simple moving average of close price, upper and lower bands are middle band plus/minus m times n-day standard deviation of close price.

2. Calculate middle line, upper line and lower line of Keltner Channels. Middle line is n-day simple moving average of close price, upper and lower lines are middle line plus/minus m times n-day simple moving average of true range.  

3. Determine if price breaks through upper or lower band of Bollinger Bands and Keltner Channels to form compression and expansion patterns. Compression forms when price breaks down through lower band, while expansion forms when price breaks up through upper band.

4. Calculate value of Linear Regression curve as momentum indicator. Upcrossing 0 is buy signal while downcrossing 0 is sell signal.

5. Combine compression/expansion patterns, momentum direction, mean filtering and other conditions to determine final trading signals. Signals are only triggered when all conditions are met to avoid bad trades.

## Advantages of the Strategy

1. Using double filtration of Bollinger Bands and Keltner Channels to identify quality compression and expansion patterns.

2. Momentum indicator can timely capture price trend reversals, complementing channel indicators.

3. Allow early entry to increase profit opportunities. 

4. Adopt multiple condition判断 to avoid over-trading during ranging markets.

5. Technical indicator parameters are customizable, adapting to different products and parameter combinations.

6. Backtest time frame can be set to optimize over specific periods.

## Risks of the Strategy

1. Trend following strategies are prone to losses when trend reverses.

2. Improper parameter settings may lead to over-trading or poor signal quality.

3. Reliance on historical data cannot guarantee stable future returns. 

4. Unable to handle market turbulence and drastic price swings caused by black swan events.

5. Improper backtest time window settings may lead to overfitting.

## Optimization Directions

1. Optimize parameters of Bollinger Bands and Keltner Channels to find best combination.

2. Test adding trailing stop loss to control maximum loss per trade.

3. Attempt further optimizations for specific products and period/parameter combinations.  

4. Explore integrating machine learning models to 判断 trend reversals.

5. Test different entry sequencing and position sizing strategies.

6. Research how to identify trend reversal signals and exit in time.

## Summary

This strategy integrates multiple technical indicators to 判断 price trend direction and follow the trend, having relatively strong adaptability. By customizing parameters and using multiple condition filters, it can effectively control trading frequency and improve signal quality. But reversal trades and black swan events should still be watched out for. Further exploring trend reversal signals and risk control mechanisms can be done to make the strategy more robust.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|BB Length|
|v_input_2|2|BB MultFactor|
|v_input_3|16|KC Length|
|v_input_4|1.5|KC MultFactor|
|v_input_5|true|Use TrueRange (KC)|
|v_input_6|false|Early entry on momentum change|
|v_input_7|false|Filter for Momenutum value|
|v_input_8|20|Min for momentum|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-06 00:00:00
end: 2023-11-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Strategy based on LazyBear Squeeze Momentum Indicator
//I added some custom feature and filters
//
// @author LazyBear
// List of all my indicators:
// https://docs.google.com/document/d/15AGCufJZ8CIUvwFJ9W-IKns88gkWOKBCvByMEvm5MLo/edit?usp=sharing
// v2 - fixed a typo, where BB multipler was always stuck at 1.5. [Thanks @ucsgears]
//
strategy(shorttitle = "SQZMOM_LB", title="Strategy for Squeeze Momentum Indicator [LazyBear]", overlay=false, calc_on_every_tick=true, pyramiding=0,default_qty_type=strategy.percent_of_equity,default_qty_value=100,currency=currency.USD)

length = input(14, title="BB Length")
mult = input(2.0,title="BB MultFactor")
lengthKC=input(16, title="KC Length")
multKC = input(1.5, title="KC MultFactor")
 
useTrueRange = input(true, title="Use TrueRange (KC)", type=bool)

//FILTERS
useExtremeOrders  = input(false, title="Early entry on momentum change", type=bool)
useMomAverage = input(false, title="Filter for Momenutum value", type=bool)
MomentumMin = input(20, title="Min for momentum")

// Calculate BB
src = close
basis = sma(src, length)
dev = mult * stdev(src, length)
upperBB = basis + dev
lowerBB = basis - dev
 
// Calculate KC
ma = sma(src, lengthKC)
range = useTrueRange ? tr : (high - low)
rangema = sma(range, lengthKC)
upperKC = ma + rangema * multKC
lowerKC = ma - rangema * multKC
 
sqzOn  = (lowerBB > lowerKC) and (upperBB < upperKC)
sqzOff = (lowerBB < lowerKC) and (upperBB > upperKC)
noSqz  = (sqzOn == false) and (sqzOff == false)
 
val = linreg(src  -  avg(avg(highest(high, lengthKC), lowest(low, lengthKC)),sma(close,lengthKC)), lengthKC,0)
 
bcolor = iff( val > 0,            iff( val > nz(val[1]), lime, green),            iff( val < nz(val[1]), red, maroon))
scolor = noSqz ? blue : sqzOn ? black : aqua
plot(val, color=bcolor, style=histogram, linewidth=4)
plot(0, color=scolor, style=cross, linewidth=2)

//LOGIC
//momentum filter
filterMom=useMomAverage?abs(val)>(MomentumMin/100000)?true:false:true

//standard condition
longCondition = scolor[1]!=aqua and scolor==aqua and bcolor==lime and filterMom
exitLongCondition = bcolor==green and not useExtremeOrders
shortCondition = scolor[1]!=aqua and scolor==aqua and bcolor==red and filterMom
exitShortCondition = bcolor==maroon and not useExtremeOrders

//early entry
extremeLong= useExtremeOrders and scolor==aqua and bcolor==maroon and bcolor[1]!=bcolor[0] and filterMom
exitExtLong = scolor==black or bcolor==red
extremeShort = useExtremeOrders and scolor==aqua and bcolor==green and bcolor[1]!=bcolor[0] and filterMom
exitExtShort = scolor==black or bcolor==lime

//STRATEGY

strategy.entry("SQ_Long", strategy.long, when = longCondition)
strategy.close("SQ_Long",when = exitLongCondition )

strategy.entry("SQ_Long_Ext", strategy.long, when = extremeLong)
strategy.close("SQ_Long_Ext",when = exitExtLong)
//strategy.exit("exit Long", "SQ_Long", when = exitLongCondition)

strategy.entry("SQ_Short", strategy.short, when = shortCondition)
strategy.close("SQ_Short",when = exitShortCondition)

strategy.entry("SQ_Short_Ext", strategy.short, when = extremeShort)
strategy.close("SQ_Short_Ext",when = exitExtShort)
//strategy.exit("exit Short", "SQ_Short", when = exitShortCondition)



// // === Backtesting Dates === thanks to Trost

// testPeriodSwitch = input(true, "Custom Backtesting Dates")
// testStartYear = input(2018, "Backtest Start Year")
// testStartMonth = input(1, "Backtest Start Month")
// testStartDay = input(1, "Backtest Start Day")
// testStartHour = input(0, "Backtest Start Hour")
// testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,testStartHour,0)
// testStopYear = input(2018, "Backtest Stop Year")
// testStopMonth = input(12, "Backtest Stop Month")
// testStopDay = input(14, "Backtest Stop Day")
// testStopHour = input(23, "Backtest Stop Hour")
// testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,testStopHour,0)
// testPeriod() =>
//     time >= testPeriodStart and time <= testPeriodStop ? true : false
// isPeriod = testPeriodSwitch == true ? testPeriod() : true
// // === /END

// if not isPeriod
//     strategy.cancel_all()
//     strategy.close_all()
        


```

> Detail

https://www.fmz.com/strategy/431969

> Last Modified

2023-11-13 17:46:01
