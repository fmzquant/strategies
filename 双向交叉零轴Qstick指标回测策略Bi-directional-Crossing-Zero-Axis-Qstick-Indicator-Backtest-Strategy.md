
> Name

双向交叉零轴Qstick指标回测策略Bi-directional-Crossing-Zero-Axis-Qstick-Indicator-Backtest-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a0e22f7a52c5846796.png)

[trans]

## 概述

双向交叉零轴Qstick指标回测策略是基于Tushar Chande开发的Qstick技术指标的趋势跟踪和交易信号生成策略。该策略通过计算股票的开盘价和收盘价的移动平均差值,判断市场的买入压力和卖出压力,并在该差值指标交叉零轴时生成交易信号。

## 策略原理

双向交叉零轴Qstick策略的核心指标是Qstick。Qstick指标是通过计算一定周期内收盘价与开盘价的差值的移动平均来获得的。当Qstick大于0时,表示该周期内收盘价整体高于开盘价,多头力量占优;当Qstick小于0时,表示该周期内开盘价整体高于收盘价,空头力量占优。

该策略的交易信号来自Qstick指标何时穿过零轴。当Qstick从下方向上穿过零轴时产生买入信号,这表示买入压力开始高于卖出压力,可以建立多头头寸;相反,当Qstick从上方向下穿过零轴时产生卖出信号,表示卖出压力开始加大,需要清仓卖出头寸。此外,该策略也可绘制Qstick值的移动平均线作为信号线,Qstick指标何时穿过该信号线也会产生交易信号。

该策略允许选择反转交易。即当原本应该产生买入信号时,实际采取卖出操作;当原本应该产生卖出信号时,实际采取买入操作。这可以用于反转跟随市场意识形态的主流投资者。

## 优势分析

双向交叉零轴Qstick策略具有以下优势:

1. 使用简单直观的指标判断市场买卖压力,信号生成清晰
2. 采用移动平均差值指标,可有效滤除市场噪音
3. 可绘制信号线,避免错误信号
4. 支持反转交易,可用于跟踪主流投资者
5. 可自定义参数,适应不同股票和市场环境  

## 风险分析

双向交叉零轴Qstick策略也存在一些风险:  

1. Qstick指标延迟识别趋势转折点,可能错过最佳入场点
2. 信号频繁,交易成本较高  
3. 反转交易风险大,需要谨慎运用

可以通过以下方法降低风险:

1. 优化Qstick周期参数,降低指标延迟  
2. 增大信号线周期参数,减少错误信号
3. 只在特定阶段采取反转交易,并控制仓位规模

## 优化方向  

双向交叉零轴Qstick策略可以从以下几个方面进行优化:  

1. 结合其他指标过滤信号,例如成交量指标、波动率指标等,避免在非趋势环境下产生错误信号
2. 增加止损策略,在亏损达到一定比例时止损
3. 进一步研究确定最佳的Qstick和信号线周期参数组合
4. 通过机器学习方法自动确定最优参数
5. 在特定行业或个股中测试该策略的效果

## 总结  

双向交叉零轴Qstick策略利用简单的指标判断买卖压力变化,在Qstick指标交叉零轴时产生交易信号,可有效捕捉价格趋势。该策略直观易懂,适合初学者使用,也可通过多种手段进行优化,适应高级交易员的需要。但是该策略也存在一定缺陷,需要谨慎运用。总体来说,这是一个非常实用的趋势跟踪和信号生成策略。

||

## Overview  

The bi-directional crossing zero axis Qstick indicator backtest strategy is a trend tracking and signal generation strategy based on the Qstick technical indicator developed by Tushar Chande. This strategy calculates the moving average difference between the open and close prices of a stock to judge the buying and selling pressure in the market, and generates trading signals when this difference indicator crosses the zero axis.  

## Strategy Principle  

The core indicator of the bi-directional crossing zero axis Qstick strategy is Qstick. The Qstick indicator is obtained by calculating the moving average of the difference between closing price and opening price over a certain period. When Qstick is greater than 0, it means that the closing price was generally higher than the opening price during this period, and the bullish power prevailed; when Qstick is less than 0, it means that the opening price was generally higher than the closing price during this period, and the bearish power prevailed.

The trading signals of this strategy come from when the Qstick indicator crosses the zero axis. A buy signal is generated when Qstick crosses above zero from below, indicating that the buying pressure starts to exceed the selling pressure and a long position can be established; conversely, a sell signal is generated when Qstick crosses below zero from above, indicating that selling pressure starts to increase and existing positions should be closed out. In addition, a moving average of Qstick values can be plotted as a signal line, and trading signals can also be generated when the Qstick indicator crosses this signal line.  

This strategy allows for reversal trading. That is, when a buy signal is originally supposed to be generated, an actual sell operation is taken; when a sell signal is originally supposed to be generated, an actual buy operation is taken. This can be used to reverse follow mainstream investors in the market.

## Advantage Analysis   

The bi-directional crossing zero axis Qstick strategy has the following advantages:

1. Use simple and intuitive indicators to determine market buying and selling pressure, with clear signal generation  
2. Adopt moving average difference indicator, which can effectively filter out market noise
3. Signal lines can be drawn to avoid wrong signals  
4. Support reversal trading, which can be used to track mainstream investors
5. Customizable parameters suit different stocks and market environments   

## Risk Analysis

The bi-directional crossing zero axis Qstick strategy also has some risks:  

1. Qstick indicator has a lag in recognizing turning points, possibly missing the best entry point  
2. Frequent signals lead to relatively high transaction costs
3. Reversal trading has higher risks and needs to be used cautiously  

The following methods can be used to reduce risks:

1. Optimize the Qstick cycle parameters to reduce indicator delay  
2. Increase signal line cycle parameters to reduce wrong signals  
3. Only adopt reversal trading during specific stages, and control position sizing

## Optimization Directions   

The bi-directional crossing zero axis Qstick strategy can be optimized in the following aspects:

1. Incorporate other indicators to filter signals, such as volume indicators, volatility indicators, etc., to avoid generating wrong signals in non-trending environments  
2. Add stop loss strategies to stop loss when losses reach a certain percentage  
3. Further research to determine the optimal combination of Qstick and signal line cycle parameters  
4. Use machine learning methods to automatically determine optimal parameters
5. Test the efficacy of this strategy in specific industries or individual stocks  

## Conclusion  

The bi-directional crossing zero axis Qstick strategy utilizes simple indicators to determine changes in buying and selling pressure, and generates trading signals when the Qstick indicator crosses the zero axis, which can effectively capture price trends. This strategy is intuitive and easy to understand, suitable for beginners, and can also be optimized in many ways to meet the needs of advanced traders. However, this strategy also has certain flaws and needs to be used cautiously. In general, this is a very practical trend tracking and signal generation strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 16/04/2018
// A technical indicator developed by Tushar Chande to numerically identify 
// trends in candlestick charting. It is calculated by taking an 'n' period 
// moving average of the difference between the open and closing prices. A 
// Qstick value greater than zero means that the majority of the last 'n' days 
// have been up, indicating that buying pressure has been increasing. 
//
// Transaction signals come from when the Qstick indicator crosses through the 
// zero line. Crossing above zero is used as the entry signal because it is indicating 
// that buying pressure is increasing, while sell signals come from the indicator 
// crossing down through zero. In addition, an 'n' period moving average of the Qstick 
// values can be drawn to act as a signal line. Transaction signals are then generated 
// when the Qstick value crosses through the trigger line.
//
// You can change long to short in the Input Settings
// WARNING:
//  - For purpose educate only
//  - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Qstick Indicator Backtest")
Length = input(14, minval=1)
reverse = input(false, title="Trade reverse")
xR = close - open
xQstick = sma(xR, Length)
clr = iff(xQstick >= 0, green, red)
pos = iff(xQstick > 0, 1,
       iff(xQstick < 0, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
p1 = plot(0, color=black, title="0")
p2 = plot(xQstick, color=blue, title="Qstick")
fill(p1, p2, color=clr)
```

> Detail

https://www.fmz.com/strategy/439854

> Last Modified

2024-01-24 14:14:07
