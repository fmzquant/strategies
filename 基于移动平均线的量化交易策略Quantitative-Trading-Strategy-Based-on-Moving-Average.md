
> Name

基于移动平均线的量化交易策略Quantitative-Trading-Strategy-Based-on-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e9a6c17945ed3a2d1b.png)
[trans]

## 概述

该策略通过计算不同周期的移动平均线,并判断它们的金叉死叉形成交易信号,属于典型的趋势跟踪策略。主要使用了加权移动平均线WMA和自适应移动平均线ALMA。

## 策略原理

该策略首先计算价格的中短期移动平均线ma1和ma2,其中ma1周期更短,ma2周期更长。然后计算ma1和ma2的差值ma3,再对ma3计算出平滑移动平均线ma4。当ma3上穿ma4时产生买入信号,下穿时产生卖出信号。

这样,ma3反映价格的中短期趋势方向,ma4过滤掉ma3中的部分噪音,形成较为可靠的交易信号。ma1和ma2的周期比通过参数maLen设定,用户可以根据不同市场调整周期得到最佳参数组合。

## 策略优势

该策略具有以下优势:

1. 使用自适应移动平均线ALMA和加权移动平均线WMA,能更好地适应市场变化。

2. 应用多周期价格平均的方法,使交易信号更加可靠。

3. 参数可调,用户可以针对不同市场进行优化,适用面广。

4. 策略思路清晰易懂,容易实施。

5. 可在趋势型和震荡型市场中均获得不错效果。

## 风险及解决

该策略也存在一些风险:

1. 在剧烈变动的行情中,移动平均线策略容易产生交易信号不明确、延迟等问题。可通过调整移动平均线周期及参数进行优化。

2. 纯趋势跟踪策略,在震荡盘整阶段容易产生亏损。可结合其他指标作为过滤条件。

3. 参数设置不当可能导致超短周期而出现过度交易。应谨慎选择合适的参数。

## 策略优化

该策略可从以下几个方面进行优化:

1. 测试更多类型的移动平均线,如线性移动平均线、权重移动平均线等。

2. 增加基于波动率、价格通道等指标的止损机制。

3. 结合多个时间周期分析,采取滚动优化参数。

4. 增加机器学习算法,实现参数的自动优化。

## 总结

本策略基于移动平均线的金叉死叉形成交易信号。应用自适应移动平均线和多时间周期价格平均,使信号更加精确可靠。该策略参数可调,适用面广,思路简单清晰,在趋势市场中效果较好,具有很高的实战价值。

||

## Overview

This strategy generates trading signals based on the golden cross and dead cross of moving averages with different cycles. It belongs to a typical trend-following strategy. Weighted Moving Average (WMA) and Adaptive Moving Average (ALMA) are mainly used.

## Strategy Logic  

The strategy first calculates the medium-term and short-term moving averages, ma1 and ma2, of the price, where ma1 has a shorter cycle and ma2 has a longer cycle. Then it calculates the difference between ma1 and ma2 as ma3, and further computes the smoothed moving average ma4 of ma3. When ma3 crosses over ma4 upwards, a buy signal is generated. When it crosses downwards, a sell signal is generated.

Thus, ma3 reflects the medium-term trend of the price, and ma4 filters some noise from ma3 to form a more reliable trading signal. The cycles of ma1 and ma2 are set by the parameter maLen. Users can optimize parameters to achieve the best setting for different markets.

## Advantages

The advantages of this strategy include:

1. Using ALMA and WMA that can better adapt to market changes.
2. Applying multi-cycle price averaging to make trading signals more reliable. 
3. The adjustable parameters can be optimized for different markets with wide applicability.
4. The strategy logic is simple and easy to implement.  
5. It can achieve good performance in both trending and sideways markets.

## Risks and Solutions

There are also some risks for this strategy:

1. The signals may become unclear and delayed for volatile market conditions. This can be solved by optimizing the cycles and parameters of the moving averages.
2. As a pure trend-following strategy, it may lead to losses during range-bound markets. Other indicators can be added as filters.  
3. Improper parameter settings may cause over-trading due to ultra short cycles. Appropriate parameters should be carefully selected.

## Optimization

The strategy can be optimized from the following aspects:

1. Test more types of moving averages, like LMA, WMA, etc.
2. Add stop loss mechanisms based on volatility, price channels, etc. 
3. Adopt multi-timeframe analysis with rolling optimization of parameters.
4. Increase machine learning algorithms for automatic parameter optimization.

## Conclusion  

The strategy generates trading signals based on the golden cross and dead cross of moving averages. By using ALMA and multi-cycle price averaging, the signals become more precise and reliable. The adjustable parameters make it widely applicable. Also, the logic is simple and clear and performs well in trending markets. Therefore, it has high practical value.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|ma period|
|v_input_2|0|mode: wma|ema|alma|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-08 00:00:00
end: 2024-01-15 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Oracle Move Strategy", overlay=true)

maLen = input(30, "ma period")
mode =  input(defval="wma", options=["alma", "ema", "wma"])
price = close

ma(src, len) =>
     mode=="alma"  ? alma(src, len, 0.85, 6) :
     mode=="ema"? ema(src, len) : 
     wma(src, len)
    

ma1 = ma(price, floor(maLen / 2))
ma2 = ma(price, maLen)
ma3 = 2.0 * ma1 - ma2
ma4 = ma(ma3, floor(sqrt(maLen)))

//plot(ma1, color = red)
//plot(ma2, color = green)
plot(ma3, color = blue)
plot(ma4, color = orange)


mafast = ma3
maslow = ma4

if (crossover(mafast, maslow))
    strategy.entry("MA2CrossLE", strategy.long, comment="MA2CrossLE")

if (crossunder(mafast, maslow))
    strategy.entry("MA2CrossSE", strategy.short, comment="MA2CrossSE")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/438975

> Last Modified

2024-01-16 17:37:13
