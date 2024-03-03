
> Name

配置化多均线投票交易策略Configurable-Multi-MA-Crossover-Voting-System

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略通过配置化设定多个快慢均线组合,当所有快线上穿慢线时做多;当至少一个快线下穿慢线时平仓。策略充分利用多个均线的优势,形成较强的持仓决策体系。

### 策略原理

该策略的主要组成部分和规则如下:

1. 多组快慢均线:使用SMA、WMA、VWMA等多种均线指标。

2. 做多信号:所有快线上穿慢线时做多。

3. 平仓信号:任一快线下穿慢线时平仓。

4. 止盈止损:以ATR值设置固定止盈止损点。 

5. 配置化:可灵活配置多组均线参数。

通过多均线组合立场投票方式入场,可有效增强信号的可靠性。多个均线参数可自定义配置,兼具灵活性。

### 优势分析

相比单一均线策略,该策略具有以下优势:

1. 多均线组合可提供更全面趋势判断。

2. 投票方式避免误使噪音交易。

3. 可自由配置各均线参数,优化空间大。

4. 支持多种均线指标,使用灵活。

5. 设置止盈止损点位,可控制单笔盈亏。

6. 较长周期使用效果较好,可减少曲线震荡。

7. 计算简单直观,易于实现与操作。

8. 总体来说,相比单均线稳定性和续航力更优。

### 风险分析

但该策略也存在一定的风险:

1. 多均线提高了策略复杂度。

2. 存在参数过度优化风险。

3. 均线本质上对趋势变化存在滞后识别。

4. 未考虑成交量,可能出现被套。

5. 止盈止损设置较为武断,可能造成不必要平仓。

6. 效果随市场环境变化而波动较大。

7. 需关注收益回撤比,防止曲线过于锯齿。

8. 需检验参数在多品种中的稳健性。

### 优化方向

基于以上分析,该策略可从以下方面进行增强:

1. 测试均线参数在不同品种中的健壮性。

2. 增加交易量或波动率验证。

3. 优化止盈止损参数。

4. 设置最大回撤容忍度。

5. 构建动态仓位管理机制。

6. 评估引入机器学习的效果。

7. 关注最大回撤与收益曲线锯齿度。

8. 不断迭代策略,防止过优化。

### 总结

该策略通过配置化设定多均线组合,形成较为稳健的持仓决策机制。但任何策略都需要防止过拟合,以及根据市场环境进行动态调整。只有不断优化测试,量化策略才能长期适应市场。

||

### Overview

This strategy allows flexible configuration of multiple fast/slow moving average pairs. It goes long when all fast MAs crossover above slow MAs, and exits when any fast MA crosses below slow MA. The voting mechanism with multiple MAs aims to form robust position holding decisions. 

### Strategy Logic

The key components and rules are:

1. Multiple fast/slow MAs: Using SMA, WMA, VWMA etc.

2. Long signal: All fast MAs crossing above slow MAs. 

3. Exit signal: Any fast MA crossing below slow MA.

4. Profit/loss points: Fixed points based on ATR.

5. Configurable: Flexible configuration of multiple MA pairs.

The voting-based entry with multiple MAs improves signal reliability. Custom configurations provide flexibility.

### Advantages

Compared to single MA strategies, the advantages are:

1. Multiple MAs provide more comprehensive trend assessment.

2. Voting avoids false signals from noise.

3. Large tuning space from custom MA configurations.

4. Support for different MA types enhances adaptability.

5. Defined profit/loss points control per trade risk/reward. 

6. Works better on longer timeframes, less curve whipsaws.

7. Simple and intuitive logic, easy to implement and operate.

8. Overall more stable with greater longevity versus single MA.

### Risks

However, some risks exist:

1. Increased complexity with multiple MAs. 

2. Risks of over-optimization.

3. Fundamental lagging in identifying trend changes.

4. No volume considered, risks being trapped.

5. Profit/loss points may cause unnecessary exits.

6. Performance subject to changing market regimes.

7. Need to monitor reward/risk ratios and curve smoothness.

8. Robustness across instruments requires validation.

### Enhancements

Based on the analysis, enhancements may involve:

1. Testing parameter robustness across different instruments. 

2. Adding volume or volatility confirmation.

3. Optimizing profit/loss points.

4. Setting maximum tolerable drawdown limit.

5. Constructing dynamic position sizing models.

6. Evaluating effect from introducing machine learning.

7. Monitoring maximum drawdown and curve smoothness.

8. Continual iterations to avoid overfitting.

### Conclusion

The configurable multi-MA approach forms a robust position holding mechanism. But preventing overfitting and dynamic adaptations to changing markets are key for any strategy's longevity. Only through rigorous ongoing optimizations and testing can a quant strategy sustain success.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|2x4,3x5,4x6|Crossover Config|
|v_input_source_1_high|0|source: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_2|0|Moving Average Type: WMA|SMA|VWMA|
|v_input_1|14|ATR Period|
|v_input_2|10|Profit ATR x|
|v_input_3|5|Loss ATR x|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-16 00:00:00
end: 2023-09-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © levieux

//@version=5
strategy(title='Configurable Multi MA Crossover Voting System', shorttitle='Configurable Multi MA Crossover Voting System', initial_capital=1000, overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1)
crossoverConfig= input.string(defval="2x4,3x5,4x6", title="Crossover Config")
source= input.source(high)
maType= input.string("WMA", title="Moving Average Type", options=["WMA","SMA","VWMA"])
atrPeriod= input(14, title="ATR Period")
profitAtr = input(10, title="Profit ATR x")
lossAtr = input(5, title="Loss ATR x")


ma(src,length,type) => 
    float ma = switch type
	    "SMA" => ta.sma(src, length)
	    "WMA" => ta.wma(src, length)
	    "VWMA" => ta.vwma(src, length)

crossoverGroups= str.split(crossoverConfig, ",")
crossoverCount= array.size(crossoverGroups)
crossovers= array.new_string(crossoverCount)
positions= array.new_int(crossoverCount, 0)
longVotes= 0
for i= 0 to crossoverCount-1
    crossover= str.tostring(array.get(crossoverGroups, i))
    crossoverBoundaries= str.split(crossover, "x")
    int fastLength= math.round(str.tonumber(array.get(crossoverBoundaries, 0)))
    int slowLength= math.round(str.tonumber(array.get(crossoverBoundaries, 1)))
    wmaFast= ma(source,fastLength,maType)
    wmaSlow= ma(source,slowLength,maType)
    if wmaFast>wmaSlow
        longVotes:= longVotes + 1
        array.set(positions, i, 1)

longCondition= longVotes==crossoverCount and strategy.position_size==0


//profitTicks = profitAtr*ta.atr(atrPeriod)/syminfo.mintick
//lossTicks = lossAtr*ta.atr(atrPeriod)/syminfo.mintick
profitPrice= close+profitAtr*ta.atr(atrPeriod)
lossPrice= close-lossAtr*ta.atr(atrPeriod)

if strategy.position_size>0
    profitPrice:= profitPrice[1]
    lossPrice:= lossPrice[1]

plot(profitPrice, color=color.green)
plot(lossPrice, color=color.red)

if longCondition and profitPrice>0
    strategy.entry("Long", strategy.long)

if longVotes<crossoverCount and strategy.position_size>0 and (high>profitPrice or low<lossPrice)
    strategy.close("Long")
    
longVotes:= 0
```

> Detail

https://www.fmz.com/strategy/427680

> Last Modified

2023-09-23 15:52:06
