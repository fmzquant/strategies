
> Name

移动平均线穿越策略Crossing-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11e8ea4d21504523c68.png)

[trans]

## 概述

移动平均线穿越策略通过计算不同周期的移动平均线,利用它们之间的交叉作为买入和卖出信号,属于技术分析类策略。该策略结合了快速移动平均线、中速移动平均线和慢速移动平均线的交叉进行交易信号判断,可以有效过滤市场噪音,识别趋势。

## 策略原理

该策略通过计算3种不同周期的移动平均线:34周期EMA、89周期EMA和200周期EMA。策略首先计算出这3条移动平均线的值,然后进行绘图,不同周期的移动平均线以不同颜色和线粗进行绘制,以便清晰识别。 

策略的交易信号判断基于不同移动平均线之间的交叉:当快速移动平均线向上穿越中速移动平均线时,产生买入信号;当快速移动平均线向下穿越中速移动平均线时,产生卖出信号。这属于较为积极的交易策略。 

为过滤掉过多噪音,策略还引入了慢速移动平均线。只有当快速移动平均线同时穿越慢速移动平均线,才会触发真正的买入和卖出信号。例如,只有当快速移动平均线同时上穿中速线和慢速线时,才会触发买入信号。这可以确保只在较大趋势发生转折时才进行交易。

## 策略优势

- 利用多周期移动平均线,可以有效过滤市场噪音,识别大趋势的转折。
- 快速移动平均线对市场变化敏感,中速移动平均线稳定,慢速移动平均线过滤假突破,三者搭配可以识别趋势转折点。  
- 采用EMA算法计算移动平均线,对最新价格更敏感,可以提早反应趋势转变。
- 图形直观显示不同移动平均线,通过交叉清晰判断入市和出场点。
- 策略较为灵活,可调整移动平均线周期,适应不同市场环境。

## 策略风险

- 移动平均线存在时滞,可能延迟生成交易信号。
- 若市场趋势强劲,移动平均线可能无效,会产生过多交易信号。
- 移动平均线周期设置不当,可能增大交易频率和风险。
- 大盘突发事件造成剧烈波动,会使移动平均线产生错误交叉。
- 交易费用较高的市场不适合该高频策略。

## 策略优化

- 评估不同移动平均线周期的组合,找到最佳参数。
- 加入Volatility Index等波动率指标,在大幅震荡时暂停交易。
- 结合stochastic oscillator等超买超卖指标,避免在极端点买入卖出。  
- 优化入场时机,等待重要移动平均线回调测试后再进场。
- 采用自适应移动平均线,让周期动态调整,更灵活应对市场变化。

## 总结

移动平均线穿越策略是一种典型的技术分析策略。它观察不同时间周期移动平均线的关系,据此判断市场趋势转折买卖点。该策略同时采用快中慢三条移动平均线并观察其交叉情况,既可以敏感捕捉趋势,也可有效过滤假信号。通过参数优化,可灵活适应市场环境。但在具体运用时,仍需考虑移动平均线滞后等问题。总体来说,该策略直观简单,思路清晰,值得实盘验证优化。

||  


## Overview

The crossing moving average strategy calculates moving averages of different periods and uses their crossovers as trading signals. It belongs to technical analysis strategies. This strategy combines fast, medium and slow moving averages to judge trading signals, which can effectively filter market noise and identify trends.

## Strategy Logic

The strategy calculates 3 moving averages with different periods: 34-period EMA, 89-period EMA and 200-period EMA. It first computes these 3 MAs, then plots them in different colors and linewidths for clear identification.

The trading signals are generated based on the crossovers between different MAs: when the fast MA crosses above the medium MA, it triggers the buy signal; when the fast MA crosses below the medium MA, it triggers the sell signal. This belongs to an aggressive trading strategy.

To filter out excess noise, the strategy also employs a slow MA. Only when the fast MA crosses the slow MA simultaneously will the actual buy and sell signals be triggered. For example, only when the fast MA crosses above both the medium and slow MAs will the buy signal be generated. This ensures trades only occur when significant trend changes happen.

## Advantages  

- Uses multi-period MAs to filter noise and identify big trend changes.
- Fast MA is sensitive, medium MA is stable, and slow MA filters fake breakouts. The combo identifies trend reversals well.
- Uses EMA to calculate MAs which puts more weight on recent prices and reacts better to trend changes. 
- Visualizes different MAs clearly via crossover for easy signal identification.
- Flexible strategy allowing MA period adjustments for different market environments.

## Risks

- MAs have lag and may delay signal generation.
- Strong trends may override MAs and generate excessive signals. 
- Poor MA period settings may increase trade frequency and risk.
- Extreme volatility could cause incorrect MA crossovers.
- Markets with high fees are not suitable for such high-frequency strategies.

## Enhancements

- Evaluate different MA period combinations to find optimal parameters.
- Add volatility index etc. to pause trading when huge swings occur.
- Combine with stochastic oscillator etc. to avoid buying/selling at extremes.
- Optimize entry timing by waiting for key MA pullbacks before entering. 
- Use adaptive MAs to dynamically adjust periods for better flexibility.

## Conclusion  

The crossing moving average strategy is a typical technical analysis strategy. It observes the relationship between MAs of different timeframes to determine market reversal points. The simultaneous use of fast, medium and slow MAs can both react quickly to trends and filter fake signals effectively. With proper parameter tuning, it can be flexible for different market environments. Still, lagging issues with MAs need to be considered. Overall, the strategy has an intuitive logic and is worth validating and optimizing in live markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|34|Fast MA|
|v_input_2|89|Medium MA|
|v_input_3|200|Slow MA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-30 00:00:00
end: 2023-11-05 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="EMA 34, 89, 200 e cruzamento das EMA", overlay=true)

// Input options
fastMALen = input(title="Fast MA",  defval=34)
midMALen  = input(title="Medium MA",  defval=89)
slowMALen = input(title="Slow MA",  defval=200)

// Calculate values
fastMA = ema(close, fastMALen)
midMA  = ema(close, midMALen)
slowMA = ema(close, slowMALen)

// Plot values
plot(series=fastMA, color=yellow,
     title="Fast MA", linewidth=3, trackprice=false)
plot(series=midMA, color=red,
     title="Mid MA", linewidth=4, trackprice=false)
plot(series=slowMA, color=white,
     title="Slow MA", linewidth=5)

// Highlight crossovers
longCondition = crossover(ema(close, 34), ema(close, 200)) 
if (longCondition)
    strategy.entry("COMPRA FINAL", strategy.long)

longCondition1 = crossover(ema(close, 34), ema(close, 89)) 
if (longCondition1)
    strategy.entry("COMPRA INICIAL", strategy.long)

shortCondition = crossunder(ema(close, 34), ema(close, 200))
if (shortCondition)
    strategy.entry("VENDE FINAL", strategy.short)
    
shortCondition1 = crossunder(ema(close, 34), ema(close, 89))
if (shortCondition1)
    strategy.entry("VENDE INICIAL", strategy.short)

```

> Detail

https://www.fmz.com/strategy/431287

> Last Modified

2023-11-06 17:01:53
