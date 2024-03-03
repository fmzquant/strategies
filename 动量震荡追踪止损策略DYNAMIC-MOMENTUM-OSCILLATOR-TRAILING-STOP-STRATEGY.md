
> Name

动量震荡追踪止损策略DYNAMIC-MOMENTUM-OSCILLATOR-TRAILING-STOP-STRATEGY

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1577048cc0906e4e5bf.png)
[trans]
### 概述

本策略综合运用布林带指标和随机指标,识别市场超买超卖情况,在布林带上下轨附近发现交易机会。同时,使用平均真实波动范围指标进行追踪止损,DYNAMIC TRAILING STOP采用动态止损方法,能够根据市场波动幅度灵活调整止损位置,从而在保证止损效果的同时,避免过于敏感地被止损出局。

### 策略原理

本策略使用长度为20、标准差为2的布林带,识别价格是否触及上轨或下轨。触及下轨表明可能处于超卖,触及上轨则可能超买。另外,该策略采用K线周期为14,D值平滑周期为3的随机指标判断超买超卖。当关闭价格低于布林带下轨,且随机指标K值低于20时,表示超卖,做多;当关闭价格高于布林带上轨,且随机指标K值高于80时,表示超买,做空。

在入场后,该策略采用平均真实波动范围指标进行追踪止损。止损点为平均真实波动幅度的1.5倍,能够根据市场波动程度来设定止损范围,避免止损点过于靠近或过于宽松。

### 优势分析

本策略具有以下几点优势:

1. 综合运用布林带和随机指标判断超买超卖情况,提高确定交易时机的准确性

2. 动态调整止损点,能够根据市场波动程度来设定合理的止损距离

3. 追踪止损方法使止损距离不至于过近,避免过于容易被止损

4. 策略规则清晰简单,容易理解执行

### 风险分析

本策略也存在一些风险:  

1. 布林带上下轨并不能百分之百确定价格反转,可能存在突破继续运行的情况

2. 随机指标参数设置不当可能导致产生错误信号

3. 停止追踪可能导致止损距离过大,超过市场合理波动范围

4. addDynamic trailing stop可能更好,根据市场波动微调止损距离

### 优化方向  

本策略还可以从以下几个方向进行优化:

1. 测试不同布林带参数对结果的影响,寻找最佳参数组合

2. 测试不同随机指标参数,提高指标效果  

3. 根据止损被触发的次数和盈利情况,动态调整止损距离

4. 结合其他指标过滤入场信号,提高操作成功率  

5. 添加止损重新入场机制,充分捕捉市场趋势机会

### 总结

本策略基于布林带识别超买超卖情况,stochastic 指标进行辅助确认。具有策略规则清晰、止损方式合理灵活的优点。同时也存在判断标准不精准、止损距离设定不合理等风险。通过参数优化、增加信号过滤、动态调整止损等方式可以进一步增强策略表现。

||

### Overview

This strategy combines Bollinger Bands and Stochastic oscillator to identify overbought and oversold opportunities in the market. It aims to capitalize on price rebounds from the extremes defined by Bollinger Bands, with confirmation from Stochastic to maximize the probability of successful operations. DYNAMIC TRAILING STOP adopts dynamic stop loss methodology to flexibly adjust stop loss position based on market volatility, ensuring stop loss effect while avoiding being stopped out too easily.

### Strategy Logic  

The strategy uses 20-period, 2 standard deviation Bollinger Bands to identify if price touches or breaks through the upper or lower band. Touching the lower band indicates a possible oversold condition while breaking through the upper band overbought. In addition, a Stochastic oscillator with K line cycle of 14 and D value smoothing cycle of 3 determines overbought and oversold. When close price is below the Bollinger lower band and Stochastic K value is below 20, it signals oversold for long entry. When close goes above the Bollinger upper band and Stochastic K is above 80, it signals overbought for short entry.

After entry, the strategy uses Average True Range indicator for trailing stop loss. The stop loss point is set at 1.5 times of ATR, which could define stop loss range based on market volatility, avoiding too tight or too loose stop loss.

### Advantage Analysis 

The strategy has the following advantages:

1. Combining Bollinger Bands and Stochastic oscillator to determine overbought/oversold provides higher accuracy in capturing trading opportunities.  

2. Dynamic adjustment of stop loss points based on market volatility results in reasonable stop distance.

3. Trailing stop loss mechanism prevents stop distance from being too close to avoid premature stop out.  

4. Simple and clear strategy rules make it easy to understand and execute.

### Risk Analysis

There are some risks in this strategy:

1. Bollinger Bands upper/lower band cannot guarantee price reversal, there could be breakout continuation.  

2. Improper parameter tuning of Stochastic may generate inaccurate signals.

3. Stop trailing might lead to too wide stop loss exceeding reasonable market fluctuation.  

4. A dynamic trailing stop may work better with micro-adjustments of stop distance based on market volatility.

### Optimization Directions   

The strategy can be further optimized in the following aspects:

1. Test impact of different Bollinger parameters to find optimal parameter combination.

2. Test different Stochastic parameters to improve indicator performance.   

3. Dynamically adjust stop distance based on stop loss trigger times and profitability.  

4. Add other indicators to filter entry signals and improve success rate.

5. Add stop loss re-entry mechanism to fully capture market trends.  

### Conclusion

The strategy identifies overbought/oversold based on Bollinger Bands, with confirmation from the Stochastic indicator. It has the advantage of clear rules and flexible trailing stop loss. It also has risks like inaccurate judgement criteria and improper stop distance configuration. Performance can be further improved through parameter optimization, additional signal filtering, dynamic adjustment of stop loss etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Longitud BB|
|v_input_2|2|Desviación Estándar BB|
|v_input_3|14|Longitud K Estocástico|
|v_input_4|3|Longitud D Estocástico|
|v_input_5|3|Suavizado Estocástico|
|v_input_6|14|Longitud ATR|
|v_input_7|1.5|Multiplicador ATR para Trailing Stop|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Bollinger y Estocástico con Trailing Stop", overlay=true)

// Parámetros de entrada
lengthBB = input(20, title="Longitud BB")
stdDevBB = input(2, title="Desviación Estándar BB")
kLength = input(14, title="Longitud K Estocástico")
dLength = input(3, title="Longitud D Estocástico")
smooth = input(3, title="Suavizado Estocástico")
atrLength = input(14, title="Longitud ATR")
trailStopATRMultiple = input(1.5, title="Multiplicador ATR para Trailing Stop")

// Cálculos
[upperBB, basisBB, lowerBB] = ta.bb(close, lengthBB, stdDevBB)
stochK = ta.sma(ta.stoch(close, high, low, kLength), smooth)
atr = ta.atr(atrLength)

// Condiciones de trading
longCondition = close < lowerBB and stochK < 20
shortCondition = close > upperBB and stochK > 80

// Ejecutar operaciones
if (longCondition)
    strategy.entry("Long", strategy.long)
if (shortCondition)
    strategy.entry("Short", strategy.short)

// Trailing Stop
strategy.exit("Exit Long", from_entry="Long", trail_points=atr * trailStopATRMultiple, trail_offset=atr * trailStopATRMultiple)
strategy.exit("Exit Short", from_entry="Short", trail_points=atr * trailStopATRMultiple, trail_offset=atr * trailStopATRMultiple)

```

> Detail

https://www.fmz.com/strategy/442115

> Last Modified

2024-02-19 14:39:51
