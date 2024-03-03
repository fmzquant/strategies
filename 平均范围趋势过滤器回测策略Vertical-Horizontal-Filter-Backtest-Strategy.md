
> Name

平均范围趋势过滤器回测策略Vertical-Horizontal-Filter-Backtest-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/190fb17726f84b7176d.png)
[trans]

概述:该策略通过计算一定周期内最高价与最低价的差价与收盘价振幅的比值,来判断价格是否处于趋势状态,以此作为交易信号指标。

策略原理:该策略的核心指标是垂直水平滤波器(VHF),它通过以下公式计算:

VHF = (Highest(Length) - Lowest(Length)) / SUM(ABS(Close - Close[1]), Length)

其中Highest(Length)和Lowest(Length)分别是Length周期内的最高价和最低价。分子部分反映了价格的振幅范围,分母部分反映了价格的实际波动量。their比值可以判断价格走势的趋势性,当VHF高于给定信号阈值时,认为价格处于趋势状态;当低于给定信号阈值时,认为价格处于盘整状态。据此产生交易信号。

该策略简单直观,通过比较价格波动范围与实际波幅来判断趋势性,避免了单一依赖SMA,EMA等指标而忽视价格本身特征的问题。但该策略对参数优化敏感,需要调整Length和Signal参数以适应不同周期和市场环境。

优势分析:
1. 直观的趋势判断指标,简单有效。
2. 考虑了价格自身的特征,不依赖任何曲线拟合。
3. 可配置参数调整判断的敏感度。
4. 可轻松融入各类交易策略中。

风险分析:
1. 对参数敏感,不适当设置会导致过多错 trades。 
2. 无法区分价格处于转折点时的假趋势。
3. 大周期设置下对短周期价格震荡不敏感。
4. 需搭配止损以控制单笔亏损。

优化方向:
1. 优化Length参数以平衡趋势判断的灵敏度。  
2. 结合其他指标过滤VHF信号。例如MACD可判断转折点。
3. 尝试机器学习方法拟合VHF曲线。
4. 不同周期设置并行,产生多级策略信号。

总结:该策略基于价格本身特征直观判断趋势,简单有效,值得进一步探索、优化和验证,可成为基础趋势判断工具,广泛应用于量化交易策略。
||


Overview: This strategy judges whether prices are in a trend state by calculating the ratio between the difference between the highest and lowest prices over a certain period and the amplitude of the closing price, and uses this as a trading signal indicator.  

Strategy Principle: The core indicator of this strategy is Vertical Horizontal Filter (VHF). It is calculated by the following formula:  

VHF = (Highest(Length) - Lowest(Length)) / SUM(ABS(Close-Close[1]), Length)

Where Highest(Length) and Lowest(Length) are respectively the highest and lowest prices within the Length cycle. The numerator reflects the amplitude range of prices, and the denominator reflects the actual fluctuation of prices. Their ratio can judge the trend of price moves. When VHF is higher than a given signal threshold, it is considered that prices are in a trend state. When lower than the given signal threshold, it is considered that prices are in a shock state. Trading signals are generated accordingly.

This strategy is simple and intuitive. By comparing the price fluctuation range with the actual fluctuation to judge the trend, it avoids the problem of relying solely on SMA, EMA and other indicators while ignoring the characteristics of the price itself. But this strategy is sensitive to parameter optimization, Length and Signal parameters need to be adjusted to adapt to different cycles and market conditions.  

Advantage Analysis:  
1. Intuitive trend judgment indicator, simple and effective.  
2. Consider the characteristics of the price itself, does not rely on any curve fitting.   
3. Configurable parameters adjust the sensitivity of judgment.  
4. Can be easily integrated into various trading strategies.  

Risk Analysis:  
1. Sensitive to parameters, improper settings can cause too many false trades.
2. Unable to distinguish pseudo trends when prices are at inflection points. 
3. Not sensitive to short-term price shocks under large cycle settings.  
4. Need to use stop loss to control single loss.

Optimization Directions:
1. Optimize Length parameter to balance the sensitivity of trend judgment.
2. Combine other indicators to filter VHF signals. For example, MACD can determine inflection points.
3. Try machine learning methods to fit the VHF curve. 
4. Set up parallel strategies with different cycle settings to generate multi-level strategy signals.

Summary: This strategy intuitively determines the trend based on the characteristics of the price itself, simple and valid, worth further exploration, optimization and verification. It can become a basic trend judgment tool and widely used in quantitative trading strategies.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|28|Length|
|v_input_2|0.4|Signal|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2024-01-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 27/04/2018
// Vertical Horizontal Filter was initiated by Adam White. It was first published 
// in a magazine called “Issues of Futures” in August, 1991. The Vertical Horizontal 
// Filter (VHF) is a very common Indicator used by traders to find out the Phase of 
// a Price Trend. Normally, a price trend can be in a Trending Phase or a Congestion 
// Phase/Choppy Movement Phase. Adam White created this particular Technical Indicator 
// to determine whether prices are trending in a particular direction or are they going 
// through a transitional period. He used it to measure the range of Futures available
// in the market.
//
// You can change long to short in the Input Settings
// WARNING:
//  - For purpose educate only
//  - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Vertical Horizontal Filter Backtest")
Length = input(28, minval=1)
Signal = input(0.4, step=0.01)
reverse = input(false, title="Trade reverse")
hline(Signal, color=blue, linestyle=line)
xHH = highest(high, Length)
xLL = lowest(low, Length)
xNumerator = abs(xHH - xLL)
xDenominator = sum(abs(close - close[1]), Length)
xVHF = xNumerator / xDenominator 
pos = iff(xVHF > Signal, 1,
       iff(xVHF < Signal, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(xVHF, color=blue, title="VHF")
```

> Detail

https://www.fmz.com/strategy/438009

> Last Modified

2024-01-08 10:20:25
