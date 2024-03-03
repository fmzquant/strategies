
> Name

一种基于均线的趋势跟踪策略Adaptive-Moving-Average-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1216bff9f571231568e.png)
 [trans]

## 概述

自适应均线跟踪策略是一种基于均线的趋势跟踪策略。该策略利用了股票价格围绕平均价线波动的特点,通过计算不同周期的最高价和最低价的平均值生成均线,并以该均线作为买入卖出的信号。当价格高于或低于均线时产生交易信号。该策略适用于中长线趋势交易。

## 策略原理  

自适应均线跟踪策略的核心指标是基于输入周期Length参数计算的均线xTether。该均线是过去Length周期内的最高价upper和最低价lower的平均值。当价格低于该均线时为看跌信号,当价格高于该均线时为看涨信号。策略根据价格与均线的关系判断应持有多头头寸还是空头头寸。同时,该策略具有可切换做多做空方向的功能。

具体来说,该策略主要通过下面的几个步骤实现的:

1. 输入周期参数Length,默认为50天,用于计算均线中的 Lookback 期;

2. 计算最近 Length 周期内的最高价 upper 和最低价 lower; 

3. 计算最高价和最低价的平均值,得到均线 xTether;

4. 比较价格close与均线xTether的大小关系,判断出做多和做空信号;

5. 根据反向输入参数reverse切换做多做空方向;

6. 根据信号持有多头或空头头寸,并改变K线颜色。

## 策略优势

该策略具有以下几个优势:

1. 采用自适应均线,可以有效跟踪市场趋势;

2. 设置 Length 周期参数,适合不同周期操作;

3. 可切换做多做空方向,适应行情变化;  

4. 持仓后改变K线颜色,形成视觉效果,便于识别。

## 策略风险

该策略也存在一些风险:  

1. 趋势反转时无法及时止损;

2. 设置的 Length 参数不当,运算周期过短或过长都会影响策略表现; 

3. 交易频率可能过高,存在过拟合风险。

要防范这些风险,可以设置止损位、调整 Length 参数、适当限制交易次数等。

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 增加止损策略,在趋势反转时降低亏损;

2. 对 Length 周期进行优化,找到最佳参数;

3. 增加过滤条件,避免无谓交易,减少过拟合风险;  

4. 结合其他指标判断行情,提高决策准确性。

## 总结  

自适应均线跟踪策略整体来说是一个可行的趋势跟踪策略。它采用均线跟踪价格趋势,Setting Length 参数可以适应不同周期,还可切换做多做空方向。该策略优势是跟踪能力强,适合中长线操作,但也存在被套、参数设置不当等风险。通过增加止损、优化参数、减少交易等手段可以进一步提高该策略的效果。

||

## Overview

The adaptive moving average tracking strategy is a trend following strategy based on moving averages. It utilizes the characteristic that stock prices fluctuate around the moving average line and generates a moving average line by calculating the averages of highest and lowest prices over different periods as trading signals when prices break above or below the line. It is suitable for medium-to-long term trend trading.

## Strategy Logic

The core indicator of the adaptive moving average tracking strategy is the moving average line xTether based on the input parameter Length. This line is the average of the highest price upper and the lowest price lower over the past Length periods. It generates a short signal when the price is below the line and a long signal when the price is above the line. The strategy determines whether to hold a long or a short position based on the relationship between the price and the moving average line. It also has the feature to switch between long and short direction.  

Specifically, the strategy is implemented through the following steps:

1. Input the parameter Length, default to 50 days, used to calculate the Lookback period for the moving average line;  

2. Calculate the highest price upper and lowest price lower over the past Length periods;

3. Compute the average of the highest and lowest prices to get the moving average line xTether;  

4. Compare the closing price close with xTether to determine long and short signals;

5. Switch between long and short direction based on the reverse input parameter; 

6. Take long or short positions based on signals and change bar colors.

## Advantages

The strategy has the following advantages:

1. Adopt adaptive moving average to effectively track market trends;

2. The Length period parameter adapts to different trading horizons;  

3. Switchable long/short direction adapts to market changes;

4. Changing bar colors after taking positions forms visual effect for easy identification.

## Risks 

There are also some risks with this strategy:

1. Fails to timely stop loss when trend reverses;  

2. Improper Length parameter setting can affect strategy performance;

3. Potential overfitting risk from excessive trading.

To mitigate these risks, stop loss, Length parameter tuning, and trading frequency limiting should be utilized.  

## Enhancement Areas

The strategy can be enhanced from the following aspects:

1. Add stop loss mechanism to reduce losses during trend reversal;

2. Optimize the Length parameter to find the best setting; 

3. Add filtering conditions to avoid unnecessary trading and overfitting risk; 

4. Incorporate other indicators to improve decision accuracy.

## Conclusion

In general, the adaptive moving average tracking strategy is a feasible trend following system. It tracks price trends using moving averages, adapts to different periods with the Length parameter, and switches between long and short. The main advantage is strong tracking capability making it suitable for medium-to-long term trading, but risks like being trapped and bad parameter tuning exist. Further improvements on loss control, parameter optimization and trading frequency reduction can enhance the strategy's performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-17 00:00:00
end: 2024-01-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 06/12/2017
// Tether line indicator is the first component of TFS trading strategy.
// It was named this way because stock prices have a tendency to cluster
// around it. It means that stock prices tend to move away from the midpoint
// between their 50-day highs and lows, then return to that midpoint at some
// time in the future. On a chart, it appears as though the stock price is
// tethered to this line, and hence the name.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="TFS: Tether Line", shorttitle="Tether Line", overlay = true )
Length = input(50, minval=1)
reverse = input(false, title="Trade reverse")
lower = lowest(Length)
upper = highest(Length)
xTether = avg(upper, lower)
pos = iff(xTether > close, -1,
       iff(xTether < close, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )  
plot(xTether, color=green, title="Tether Line")
```

> Detail

https://www.fmz.com/strategy/439938

> Last Modified

2024-01-25 10:11:54
