
> Name

MACD动量复合均线策略-MACD-Momentum-with-MA-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/df5feb02abd9129658.png)
[trans]
### 概述

趋势捕手-MACD动量复合均线策略是一种精妙的交易工具,专为追踪市场趋势的交易者设计。该策略建立在平均真实波动范围(ATR)、简单移动平均线(SMA)和移动平均聚散指标(MACD)的强大组合基础之上,通过过滤和精确确认交易信号进入。

### 策略原理

#### ATR止损

利用ATR指标动态调整止损价位。可自定义ATR长度和ATR乘数,策略随市场波动自动调整,提供平衡的风险管理。

#### SMA趋势过滤

采用SMA作为趋势过滤器。通过调整SMA周期参数,用户可以将策略与首选的市场趋势时间范围对齐,增强策略的适应性。

#### MACD确认信号

整合MACD指标细化入市信号。策略通过比较MACD线与信号线,区分潜在的多头和空头信号,确保交易与基本面势头一致。

#### 入市逻辑

**多头:**当价格收盘高于SMA,并且前一周期低于SMA时,同时MACD线上穿信号线时,做多。入市价设置为当前价格加上ATR止损距离。

**空头:**当价格收盘低于SMA,并且前一周期高于SMA时,同时MACD线下穿信号线时,做空。入市价设置为当前价格减去ATR止损距离。

### 策略优势

该策略汲取市场波动、趋势和动量指标的精髓,构建系统的入市和风险管理机制。其指标的融合提高了策略在不同市况下的适应性,是参与趋势性行情的理想工具。

通过跟踪市场趋势动力,趋势捕手策略可协助交易者发现盈利机会。调整参数以匹配个人交易风格,观察策略如何在揭示市场有利交易点方面发挥重要作用。

### 风险分析

趋势捕手策略依赖指标组合判断市场状态,存在某些市况下判断失误的可能。此外,趋势反转可能导致亏损增加。

可通过适当调整参数降低假信号,或设置更宽松的止损距离。当出现异常行情时,亦可暂停策略,避免异常波动带来的损失。

### 优化思路

#### 参数优化

可对ATR长度、SMA周期和MACD参数进行测试和优化,找出最适合自身风格的数值。

#### 增加过滤器

可加入其他指标作为辅助过滤器,如KDJ、OBV等,提高策略准确性。或增加附加条件如交易量放大,避免被套。

#### 止损策略

可设置曲线止损或振荡止损,通过追踪价格实时调整止损距离,降低亏损风险。

### 总结

趋势捕手-MACD动量复合均线策略汇聚市场波动、趋势和动量等多重指标判断力,构建精准的入市确认机制和风险控制体系。通过参数调整可配合个人交易方式,助力抓住市场机会。该策略值得量化交易者深入研究和应用。

||

### Overview

The Trend Hunter - MACD Momentum with MA strategy is an exquisite trading tool designed for traders seeking to capitalize on trending markets. Built on the robust combination of Average True Range (ATR), Simple Moving Average (SMA) and Moving Average Convergence Divergence (MACD), it filters and confirms trade entries with precision.  

### Strategy Logic 

#### ATR Stop Loss

Utilizes the ATR indicator to dynamically tune stop levels, adapting to market volatility by customizing ATR Length and Multiplier, providing balanced risk management.

#### SMA Trend Filter 

Employs SMA as a trend filter. By tuning SMA Period, users align the strategy timeframe with their preferred market trend, enhancing adaptability.

#### MACD Entry Confirmation

Incorporates MACD to refine entry signals by comparing the MACD line against its signal line, ensuring alignment with momentum.

#### Entry Logic

**Long:** Triggered when price closes above SMA, having closed below in the prior period, with MACD line crossing above signal line. Entry set at current price plus ATR stop distance.

**Short:** Triggered when price closes below SMA, after closing above in previous period, with MACD line falling below signal line. Entry set at current price minus ATR stop distance.

### Advantages

This strategy harnesses volatility, trend and momentum dynamics to construct systematic entry and risk rules. Its blend of indicators enhances adaptability across various market conditions, making it an ideal tool for trend-following.

By tracking trend momentum, the Trend Hunter aids in uncovering profit opportunities. Fine-tuning parameters to match trading style allows observing how the strategy plays a vital role in signaling favorable trading junctures.

### Risk Analysis

The strategy relies on indicator combinations to gauge market conditions, risking misjudgments in certain situations. Trend reversals may also lead to increased losses. 

Lowering false signals through parameter adjustments or wider stop distances provides solutions. Pausing strategies during abnormal volatility also averts anomalies.

### Optimization Paths

#### Parameter Tuning

Testing and optimizing ATR Length, SMA Period and MACD inputs finds ideal values matching trading style.

#### More Filters 

Adding indicators like KDJ, OBV etc as auxiliary filters improves accuracy. Extra conditions like volume spikes also prevent whipsaws.

#### Stop Loss Strategies

Trailing or volatility stops that dynamically adjust stop distance minimizes losses by tracking prices.

### Conclusion

The Trend Hunter strategy amalgamates volatility, trend and momentum dynamics into a precise entry confirmation and risk management system. Parameter adjustments cater to individual trading styles, aiding in capitalizing on opportunities. Worthwhile for quants to further explore and apply.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|ATR Length|
|v_input_2|0.75|ATR Multiplier|
|v_input_3|32|SMA Period|
|v_input_4|12|MACD Short Term|
|v_input_5|26|MACD Long Term|
|v_input_6|9|MACD Signal Smoothing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-15 00:00:00
end: 2024-02-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("trend_hunter", overlay=true)

length = input(20, title="ATR Length")
numATRs = input(0.75, title="ATR Multiplier")
atrs = ta.sma(ta.tr, length) * numATRs

// Trend Filter
smaPeriod = input(32, title="SMA Period")
sma = ta.sma(close, smaPeriod)

// MACD Filter
macdShortTerm = input(12, title="MACD Short Term")
macdLongTerm = input(26, title="MACD Long Term")
macdSignalSmoothing = input(9, title="MACD Signal Smoothing")

[macdLine, signalLine, _] = ta.macd(close, macdShortTerm, macdLongTerm, macdSignalSmoothing)

// Long Entry with Trend and MACD Filter
longCondition = close > sma and close[1] <= sma[1] and macdLine > signalLine
strategy.entry("Long", strategy.long, stop=close + atrs, when=longCondition, comment="Long")

// Short Entry with Trend and MACD Filter
shortCondition = close < sma and close[1] >= sma[1] and macdLine < signalLine
strategy.entry("Short", strategy.short, stop=close - atrs, when=shortCondition, comment="Short")

//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_area)

```

> Detail

https://www.fmz.com/strategy/442565

> Last Modified

2024-02-22 17:51:19
