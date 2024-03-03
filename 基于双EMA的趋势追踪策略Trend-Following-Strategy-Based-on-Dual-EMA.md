
> Name

基于双EMA的趋势追踪策略Trend-Following-Strategy-Based-on-Dual-EMA

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fd3e7a0f1b1438e197.png)
 [trans]

### 概述

本策略基于双EMA指标构建,目的是识别价格趋势,实现趋势追踪。策略首先计算中长线EMA和短期EMA,然后通过二者的黄金交叉实现多头入场,死叉实现空头入场。同时,策略还引入 highest/lowest 筛选,进一步过滤假信号。

### 策略原理

本策略的核心指标为双EMA,包括一短一长的EMA。具体来说,策略中定义了以下变量:

ema1: 中长线EMA周期,默认为34天
ema2: 短期EMA周期,默认为13天

ema_sr: 基于收盘价计算的中长线EMA
highest_ema: ema_sr的最高价EMA,周期为ema2
lowest_ema: ema_sr的最低价EMA,周期为ema2

ema_ysl: 用于产生交易信号的EMA,根据ema_sr与highest/lowest_ema的大小关系计算

 crosses检测ema_sl和ema_ysl的黄金交叉和死叉,进而实现趋势跟踪。

通过双EMA组合,可以更准确地判断价格趋势。中长线EMA过滤掉短期噪音,而短期EMA又可以及时跟踪中期趋势的转折。highest/lowestEMA的引入,可以进一步过滤假信号,从而减少不必要的交易。

### 优势分析

本策略最大的优势在于趋势识别准确。双EMA指标本身就优于单一EMA和SMA等其他指标,识别趋势转折的能力更强。而highest/lowest_ema的应用,可以有效过滤掉短期回撤造成的假信号,这对于趋势跟踪策略很关键。

另外,本策略参数较为简单,容易调整和优化。用户只需要关注两个EMA参数,非常直观。这也使得策略容易理解和使用。

### 风险分析

本策略的主要风险在于不能识别趋势反转。当价格形成长期调整或者重大转折时,双EMA组合的滞后性可能导致错过最佳入场时机。这时,仓位可能过重,从而带来较大亏损。

此外,EMA本身对突发事件也没有响应能力。重大黑天鹅事件发生时,策略同样可能遭受损失。

为缓解上述风险,我们建议适当缩短中长线EMA的长度,或者引入MACD等指标应对突发事件。同时,也可以设置止损来控制最大损失。

### 优化方向 

本策略还有进一步优化的空间。具体来说,主要的优化方向有以下三点:

1. 测试更多的EMA参数组合,寻找最佳参数;

2. 增加成交量的判断,避免在价格震荡时发出错误信号;

3. 结合趋势线、通道等工具,更准确判断趋势转折点。

通过参数优化、增加过滤条件等手段,有望进一步提升策略的稳定性和盈利能力。这需要量化测试人员持续进行回测与优化。

### 总结

本策略整体来说识别趋势的能力较强,通过双EMA组合过滤噪音,并有效平滑价格曲线。Highest/lowest EMA的引入也增强了信号的可靠性。从回测结果来看,策略可以获得较好的稳定收益。

但是策略本身较为滞后,无法及时识别趋势反转。这是本策略面临的主要风险,也是未来优化的重点方向。我们期待通过参数调整、信号过滤等手段,进一步增强策略的鲁棒性,使其能够在更多市场环境下获得稳定收益。

||

### Overview  

This strategy is built based on the dual EMA indicator for the purpose of recognizing price trends and following the trends. It first calculates the medium-to-long term EMA and short-term EMA, and then implements long position when there is golden cross and short position when there is death cross between the two EMAs. Meanwhile, the highest/lowest filtering is also introduced to further eliminate false signals.

### Strategy Principles

The core indicators of this strategy are the dual EMAs, one is short-term and the other is long-term. Specifically, the following variables are defined in the strategy:

ema1: Medium-to-long term EMA period, default to 34 days  
ema2: Short-term EMA period, default to 13 days

ema_sr: Medium-to-long term EMA based on close price  
highest_ema: Highest EMA of ema_sr, period is ema2  
lowest_ema: Lowest EMA of ema_sr, period is ema2  

ema_ysl: EMA used to generate trading signals, calculated based on relationship between ema_sr and highest/lowest_ema   

crosses detect golden and death crosses between ema_sl and ema_ysl, and thus achieve trend following.  

The combination of dual EMA can judge price trends more accurately. The medium-to-long term EMA filters out short-term noise, while the short-term EMA can timely trace the turns of medium-term trends. The introduction of highest/lowest EMA can further eliminate false signals and reduce unnecessary trades.   

### Advantage Analysis

The biggest advantage of this strategy lies in its accurate trend identification. The dual EMA itself is superior to single EMA, SMA and other indicators for capturing trend changes. And the application of highest/lowest_ema can effectively filter out false signals caused by short-term pullbacks, which is critical for trend following strategies.   

In addition, the parameters of this strategy is simple and easy to adjust and optimize. Users only need to focus on the two EMA parameters, which is very intuitive. This also makes the strategy easy to understand and use.

### Risk Analysis  

The main risk of this strategy is that it fails to identify trend reversals. When the price forms long-term adjustments or major turns, the lag of the dual EMA may lead to missing the best entry points. At this time, oversized position may lead to greater losses.   

In addition, the EMA itself has no ability to respond to emergencies. The strategy may also suffer losses when black swan events occur.   

To mitigate the above risks, we recommend appropriately shortening the length of the medium-to-long term EMA, or introducing indicators like MACD to cope with emergencies. At the same time, stop loss can also be set to control maximum losses.  

### Optimization Directions   

There is room for further optimization of this strategy. Specifically, the main directions are as follows:  

1. Test more combinations of EMA parameters to find the optimal parameters;  

2. Add volume judgment to avoid issuing wrong signals when price oscillates;   

3. Combine trend lines, channels and other tools to judge trend turning points more accurately.   

Through parameter optimization, adding filter conditions and other means, it is promising to further improve the stability and profitability of the strategy. This requires quantitative analysts to continuously conduct backtests and optimizations.  

### Summary  

In general, this strategy has relatively strong ability to identify trends by filtering out noise with dual EMA and effectively smoothing the price curve. The introduction of Highest/Lowest EMA also enhances the reliability of signals. Judging from the backtest results, the strategy can obtain good steady returns.   

However, the strategy itself has some lag in timely identifying trend reversals. This is the main risk it faces and also the key direction for future optimizations. We look forward to further enhancing the robustness of the strategy through parameter tuning, signal filtering and other means, so that it can achieve steady returns under more market environments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|13|EMA2 Length|
|v_input_2|34|EMA1 Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// Modified from kivancfr3762's A2MK script

strategy("EMA STRATEGY", overlay=true)

ema2=input(13, "EMA2 Length")
ema1=input(34, "EMA1 Length")

ema_sr = ema((max(close[1], high) + min(close[1], low)) / 2, ema1)

highest_ema = ema(highest(ema_sr, 3), ema2)
lowest_ema = ema(lowest(ema_sr, 3), ema2)
k1 = ema_sr > highest_ema
k2 = ema_sr < lowest_ema

ema_ysl = iff(k1, lowest_ema, highest_ema)


longCondition = crossover(ema_ysl, ema_sr)
if (longCondition)
    strategy.entry("Short", strategy.short)

shortCondition = crossunder(ema_ysl, ema_sr)
if (shortCondition)
    strategy.entry("Long", strategy.long)
    
```

> Detail

https://www.fmz.com/strategy/439863

> Last Modified

2024-01-24 14:52:59
