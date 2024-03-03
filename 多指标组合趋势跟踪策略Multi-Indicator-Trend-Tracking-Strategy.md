
> Name

多指标组合趋势跟踪策略Multi-Indicator-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


### 概述

本策略通过集成多种指标对大趋势进行判断,根据指标组合信号的同向变化生成交易决策。策略融合了移动平均速度、STOCH指标和MACD指标,形成一个较为全面和稳健的趋势跟踪机制。

### 策略原理

该策略主要基于以下几个指标进行趋势判断:

1. 移动平均线速度:反映价格变动速度的趋势性指标。

2. STOCH指标:超买超卖区域判断Trend转折。 

3. MACD指标:双均线差值反映趋势变化。

具体交易规则如下:

1. 移动平均线速度向上,给出看多信号。

2. STOCH指标进入超卖区域,给出看空信号。

3. MACD均线正向交叉,给出看多信号。

4. 当任意2个指标信号同向时,做出相应的入场决策。

5. 指标信号变化则平仓离场。

该策略综合考虑了趋势的多个因素,通过组合信号过滤误导因素,形成较强确认力的稳定交易体系。

### 优势分析

相比单一指标,该组合策略具有以下优势:

1. 综合判断,提高了准确性。

2. 组合滤波,减少了错误交易。

3. 结合趋势和反转指标,提供全面视角。

4. 同向信号强确认力,可避免假突破。 

5. 规则简单明确,容易实现。

6. 参数调整灵活,适应性较强。

7. 不同时间周期通用,使用范围广。

8. 可引入机器学习训练指标权重。

9. 总体稳定性和盈利能力优于单一指标。

### 风险分析

尽管该策略具有多项优点,以下风险仍需考虑:

1. 多指标提高了策略复杂度。

2. 参数优化及权重设定难度较大。

3. 不同指标间可能存在矛盾信号。

4. 部分指标存在滞后 giving,无法完全避免亏损。

5. 单边持仓时间不确定,存在运气成分。

6. 组合信号并不能消除趋势交易固有监控。

7. 高交易频次易受交易费用影响。

8. 需要关注收益回撤比指标。

### 优化方向

根据上述分析,该策略可作以下改进:

1. 评估不同指标在不同市场中的效果。

2. 增加参数稳健性检验,防止过优化。

3. 优化指标权重设定,降低信号冲突。

4. 设置止损止盈,规避严重亏损。

5. 采用时间 exits,控制单边无目标持仓。

6. 评估交易频率对交易费用的影响。 

7. 引入风险指标约束。

8. 测试多市场健壮性。

9. 持续验证策略,防止过时失效。

### 总结

本策略通过集成 multiples 指标判断趋势,形成稳定的组合信号系统。但任何策略都需不断优化和进步,关注风险指标并防止过拟合。量化交易是一个持续学习和迭代的过程。

||

### Overview 

This strategy integrates multiple indicators for trend identification, and generates trading signals based on aligned directional changes. It combines moving average speed, STOCH and MACD to form a comprehensive and robust trend following system.

### Strategy Logic

The core indicators are:

1. Moving average speed: Reflects price momentum. 

2. STOCH: Oversold/overbought for trend changes.

3. MACD: Trend changes from dual moving averages. 

The trading rules are:

1. Rising moving average speed gives bullish signal.

2. STOCH in overbought zone gives bearish signal.

3. MACD positive crossover gives bullish signal. 

4. Enter when any 2 indicators align signals.

5. Exit when indicator signals change.

The combination evaluates trend from multiple dimensions, filtering noise for high-conviction signals.

### Advantages

Compared to single indicators, the combo strategy has the following pros:

1. Combined view improves accuracy. 

2. Ensemble filtering reduces false signals.

3. Incorporates trend and mean-reversion indicators.

4. Aligned signals have high conviction, avoiding false breakouts.

5. Simple and clear rules, easy to implement. 

6. Flexible parameter tuning, robustness.  

7. Applicable to different timeframes.

8. Can train indicator weights with machine learning.

9. Overall better stability and profitability than single indicators.

### Risks

Despite the merits, risks to consider include:

1. Increased complexity with multiple indicators.

2. Challenging parameter optimization and weighting.

3. Conflicting indicator signals may occur. 

4. Some lag always exists, cannot avoid all losses.

5. Uncertain unidirectional holding period with luck factor.

6. Ensemble signals cannot eliminate inherent trend trading risks.

7. High trade frequency increases transaction costs.

8. Need to monitor reward/risk ratios.

### Enhancements

Based on the analysis, enhancements may involve:

1. Evaluate indicator efficacy across different markets. 

2. Add parameter robustness checks to prevent overfitting.

3. Optimize indicator weighting to reduce conflicts.

4. Implement stops to limit severe losses.

5. Use time exits to control unlimited holding periods.

6. Assess trading frequency impact on transaction costs.

7. Incorporate risk metrics constraints. 

8. Test robustness across multiple markets. 

9. Continually validate strategy efficacy.

### Conclusion

This strategy forms stable ensemble signals by integrating multiple indicators for trend assessment. But continual optimization is key for any strategy, monitoring risks and preventing overfitting. Quant trading is a continuous learning process.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|50|(?MA Speed)Avg Length|
|v_input_int_2|true|Rate of Change Length|
|v_input_int_3|10|Avg Rate of Change Length|
|v_input_int_4|14|(?Stochastic)Stochastic Length|
|v_input_int_5|3|Stochastic Smooth K|
|v_input_float_1|80|Stochastic Overbought|
|v_input_float_2|20|Stochastic Oversold|
|v_input_2|12|(?MACD)Fast Length|
|v_input_3|26|Slow Length|
|v_input_int_6|9|MACD Avg Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-16 00:00:00
end: 2023-09-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// By TradeStation
//@version=5

strategy("Mov Avg Speed Strategy", overlay=true)

src = input(close, title="Source")

// MA Speed  
avg_len = input.int(50, minval=1, title="Avg Length", group="MA Speed")
roc_len = input.int(1, minval=1, title="Rate of Change Length", group="MA Speed")
avg_roc_len = input.int(10, minval=1, title="Avg Rate of Change Length", group="MA Speed")

// Stochastic
stoch_len = input.int(14, minval=1, title="Stochastic Length", group="Stochastic")
smooth_k = input.int(3, minval=1, title="Stochastic Smooth K", group="Stochastic")
overbought = input.float(80, title="Stochastic Overbought", group="Stochastic")
oversold = input.float(20, title="Stochastic Oversold", group="Stochastic")

// MACD
fast_length = input(12, title="Fast Length", group="MACD")
slow_length = input(26, title="Slow Length", group="MACD")
macd_avg_length = input.int(9, title="MACD Avg Length",  minval=1, group="MACD")

// MA Speed
avg = ta.sma(src, avg_len)
roc = ta.roc(avg, roc_len)
avg_roc = ta.sma(roc, avg_roc_len)
avg_roc_signal = avg_roc > 0 ? 1 : avg_roc < 0 ? -1 : 0 

// Stochastic k
k = ta.sma(ta.stoch(close, high, low, stoch_len), smooth_k)
stochastic_signal = k <= oversold ? 1 : k >= overbought ? -1 : 0

// MACD
fast_ma = ta.ema(src, fast_length)
slow_ma = ta.ema(src, slow_length)
macd = fast_ma - slow_ma
macd_avg = ta.ema(macd, macd_avg_length)
macd_signal = macd_avg > macd_avg[1] ? 1 : macd_avg < macd_avg[1] ? -1 : 0

// set the signal couint
long_count = 0
short_count = 0

if macd_signal == 1
    long_count += 1

else if macd_signal == -1
    short_count += 1
 
if stochastic_signal == 1
    long_count += 1

else if stochastic_signal == -1
    short_count += 1
 
if avg_roc_signal == 1
    long_count += 1

else if avg_roc_signal == -1
    short_count += 1

if (long_count >= 2)
    strategy.entry("Long", strategy.long)

if (short_count >= 2)
    strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/427671

> Last Modified

2023-09-23 15:19:46
