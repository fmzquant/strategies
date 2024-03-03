
> Name

基于价格波动率的跟踪止损策略Volatility-Tracking-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略通过计算真实波动范围的移动平均值,反映市场的波动率,根据波动率与其移动平均线的关系来判断趋势方向。当波动率上穿移动平均线时看空,下穿时看多,并设置跟踪止损。

### 策略原理 

利用ATR函数计算指定周期内的真实波动范围。然后计算ATR的简单移动平均值,作为波动率的移动平均线。当ATR上穿其移动平均线时,认为市场波动率增加,采取看空策略;当ATR下穿其移动平均线时,认为市场波动率减小,采取看多策略。 

在持仓时,会设置一个固定比例的跟踪止损位置,根据价格变动来动态调整止损位置,在防止止损被套的同时保护利润。

### 优势分析

该策略通过波动率指标判断市场走势,避免被噪音误导。当波动率上升时看空,下降时看多,实现了对冲操作。跟踪止损可以根据实时价格变动调整止损位置,能够在保护利润的同时减少不必要的止损。

### 风险分析

该策略仅基于一个波动率指标,存在一定的滞后。且跟踪止损只考虑价格向不利方向变动,无法防范利润回吐。当价格出现剧烈波动时,止损线可能被突破,造成较大亏损。

可以适当优化ATR和均线的周期参数,也可以加入其他指标进行综合判断。止损方式也可以改为动态止损,根据市场波动程度来调整止损幅度。

### 优化方向

1. 测试不同的ATR和均线周期参数组合,找到最优参数。

2. 增加其他指标判断,形成策略组合,提高策略准确性。

3. 设置动态止损策略,根据市场波动程度调整止损幅度。

4. 优化资金管理策略,不同品种可以设定不同的仓位规模。

5. 应用机器学习技术,辅助判断市场波动率的转折点。

6. 结合高级别均线指标,识别更大级别的趋势方向。

### 总结

该策略利用波动率指标判断市场走势较为简单直接,但仅靠单一指标容易受限。适当引入多个指标判断并优化参数,能够提高策略稳定性。总体来说,该策略提供了一种基于市场波动率进行交易的思路。

||

### Overview

This strategy calculates the moving average of true range to reflect market volatility. It determines the trend direction based on the relationship between volatility and its moving average. It goes short when volatility crosses above the moving average, and goes long when crossing below, with a trailing stop loss.

### Strategy Logic

The ATR function is used to calculate the true range over a specified period. The simple moving average of ATR is then calculated as the moving average line of volatility. When ATR crosses above its moving average, market volatility is considered as increasing and a short strategy is adopted. When ATR crosses below its moving average, market volatility is considered as decreasing and a long strategy is adopted.

When in a position, a fixed percentage trailing stop loss is set to adjust the stop loss dynamically based on price changes, in order to protect profits while avoiding being stopped out prematurely. 

### Advantage Analysis

This strategy judges market trends via the volatility indicator, avoiding noise interference. It goes short when volatility rises and goes long when volatility falls, realizing hedged operations. The trailing stop loss adjusts stop loss positions according to real-time price changes, balancing profit protection and unnecessary stop loss.

### Risk Analysis

The strategy relies solely on one volatility indicator, with some lagging. The trailing stop loss only considers adverse price moves, unable to prevent profit retracements. If prices fluctuate violently, the stop loss may be hit, incurring large losses.

Parameter tuning on ATR and moving average periods could help, as could incorporating other indicators for comprehensive judgements. The stop loss method could also switch to dynamic stops, adjusting stop loss percentage based on market volatility.

### Optimization Directions

1. Test different parameter combinations of ATR and moving averages to find optimal parameters.

2. Incorporate other indicators for judgement to form a strategy ensemble, improving accuracy.

3. Adopt dynamic stop loss strategies, adjusting stop loss percentage based on market volatility. 

4. Optimize position sizing models for different products.

5. Apply machine learning to aid in identifying volatility turning points.

6. Combine with higher timeframe moving averages to determine larger trend direction.

### Summary

The strategy judges market trends simply and directly via volatility, but a single indicator has limitations. Introducing multiple indicators and parameter optimization can improve robustness. Overall, the strategy provides a volatility-based trading idea.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Length|
|v_input_2|26|LengthMA|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 20/08/2018
// The Volatility function measures the market volatility by plotting a 
// smoothed average of the True Range. It returns an average of the TrueRange 
// over a specific number of bars, giving higher weight to the TrueRange of 
// the most recent bar.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Volatility Backtest", shorttitle="Volatility")
Length = input(10, minval=1)
LengthMA = input(26, minval=1)
reverse = input(false, title="Trade reverse")
xATR = atr(Length)
nRes = ((Length - 1) * nz(nRes[1], 0) + xATR) / Length
xMARes = sma(nRes, LengthMA)
pos = iff(nRes < xMARes, 1,
       iff(nRes > xMARes, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nRes, color=blue, title="Volatility")
plot(xMARes, color=red, title="MA")
```

> Detail

https://www.fmz.com/strategy/427346

> Last Modified

2023-09-20 11:31:12
