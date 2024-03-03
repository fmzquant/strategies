
> Name

智能累加买入策略Intelligent-Accumulator-Buy-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/185e0a3fa28ad1a1e7d.png)
[trans]
## 概述

智能累加买入策略是一个证明概念的策略。它是递归买入策略和基于技术分析的入场和离场的组合。

该策略会分配部分资金并在技术分析条件有效的情况下继续增加仓位。使用退出的技术分析条件来定义退出策略。

可以在亏损仓位上增加仓位以实现均价下降,也可以选择更激进的方法,允许在盈利仓位上增加仓位。

可以选择全部获利退出,或者分多次相同大小的部分获利退出。

还可以决定是否允许退出条件以亏损关闭仓位,或者要求最小止盈百分比。

该策略包含默认的技术分析入场和离场条件,仅用于展示该策略的思路,但该脚本的最终目的是将入场和离场决策委托给外部来源。

内部条件使用 RSI 长度为 7 交叉 1 倍标准差布林带以下进行入场,以上进行离场。

可以通过设置中的参数控制订单数量:
- 调整抄底次数
- 调整使用的权益百分比
- 确保抄底次数 × 使用权益百分比等于 100,以防止超额使用权益(除非使用杠杆)

该脚本旨在作为每日或每周递归买入的替代方案,但根据技术分析条件的准确性,它在更低时间帧上也可能是有利可图的。

该策略之所以称为“智能”,是因为递归买入最常见的做法是不考虑决策:指定频率任何情况下买入。该策略仍然执行递归买入,但过滤掉一些可能不必要地延迟看到仓位进入盈利的潜在错误入场时机。其次原因是一开始就设置了退出策略,递归买入本身并不提供这一功能。

## 策略原理

该策略通过 RSI 指标与布林带的交叉来判断入场和离场时机。具体来说,当 RSI 低于下轨时看跌入场,当 RSI 高于上轨时看涨离场。

此外,策略还提供了抄底和分批离场的设置。抄底次数和每次使用的权益百分比之和应等于100,以防止超额使用资金。可以选择允许在盈利仓位上继续加仓,或者只在亏损仓位上加仓以实现均价下降。

离场时可以选择全部获利退出,或者分批次按照设置的比例部分获利退出。此外还可以设置最小止盈百分比,低于该百分比的盈利不会触发离场。

整体来说,该策略结合了递归买入和技术分析指标,通过过滤出部分错误信号,实现更稳定的累加买入,同时设置了灵活的离场机制,可以根据自己的风险偏好进行参数调整。

## 优势分析

相比传统的递归买入策略,该策略最大的优势在于入场和离场都有技术指标作为参考,可以过滤掉一部分错误信号,这与毫无决策的每日每周买入形成对比。具体优势如下:

1. 使用 RSI 和布林带判断入场时机,避免在不利时机追高建仓
2. 离场条件清晰,有止盈和止损标准,不会漫无目标持有仓位
3. 可根据需要调整抄底参数,实现更灵活的加仓控制
4. 可选择仅在亏损仓位加仓或在盈利仓位继续加仓
5. 可选择全部获利离场或分批部分获利离场
6. 最低获利百分比设置避免过早离场

总的来说,该策略实现了递归买入的定期加仓效果,同时增加了入场和离场的技术指标判断,可以根据自己的偏好调整参数,降低盲目建仓的风险,提高获利效率。

## 风险分析

尽管该策略设定了技术指标过滤和灵活的加仓离场机制来降低风险,但任何策略都难免存在一定风险,主要风险包括:

1. 指标发出错误信号的概率,可能错过最佳入场或离场时机
2. 加仓次数和资金占比设置不当,造成超额持仓风险
3. 行情短期内发生剧烈变化,指标未能及时反应发出信号
4. 止盈离场过早或过晚,影响盈利效率

对应解决方法如下:

1. 组合使用多种指标判断,降低错误信号概率
2. 审慎测试并评估参数设置,避免超持仓风险
3. 结合更短周期指标的实时信号作为辅助判断 
4. 测试并优化止盈离场参数,提高稳定盈利能力

## 优化方向  

该策略可以从以下几个方面进行进一步优化:

1. 优化或更换技术指标,提高入场离场准确率。可以测试不同参数或指标的组合,选择更可靠的信号。

2. 添加止损策略。目前策略没有设置止损,可以根据回撤或其他标准设定止损位,控制最大亏损。

3. 动态调整加仓幅度。可以根据仓位数量或市场波动性实时调整每次加仓的资金量,在高波动时减少加仓。

4. 集成算法交易。当前策略由简单指标组成,有可能加入机器学习等算法模型判断行情,提高决策水平。

5. 优化参数设置。持续优化每次加仓资金占比、止盈离场百分比等参数,目标是在控制风险的前提下追求更高收益率。


## 总结

智能累加买入策略通过技术指标过滤保留递归买入策略的定期加仓优势,同时设置清晰的止盈止损离场机制,避免盲目建仓和漫无目标持仓的弊端。策略可以根据个人风险偏好高度自定义加仓和离场参数,对于长线持仓者具有非常大的优势。

当然策略也存在一定概率的信号错误和PARAMETERSNTTTT设置不当的风险,这需要通过继续优化指标和参数以及辅助的止损手段来解决。总体上,该策略形成了递归买入到智能累加买入的重要进化,为投资者提供了一个相对完善和可控的长线持仓方案。

||

## Overview

The Intelligent Accumulator Buy Strategy is a proof of concept strategy. It combines recurring buy-in with technical analysis-based entries and exits.

The strategy will allocate a portion of the funds and continue to increase positions as long as the technical analysis condition is valid. Use the exit technical analysis condition to define your exit strategy.

You can add to losing positions to average down, or choose a more aggressive approach that allows adding to winning positions.

You can choose to take full profit or distribute your exits into multiple take profits of the same size.

You can also decide whether to allow your exit conditions to close your position at a loss or require a minimum take profit percentage.

The strategy contains default technical analysis entry and exit conditions just to showcase the idea, but the final intent of this script is to delegate entries and exits to external sources.

The internal conditions use RSI length 7 crossing below the 1 standard deviation Bollinger Bands for entries and above for exits.

To control the number of orders, adjust the parameters in Settings:
- Adjust pyramiding
- Adjust percentage of equity
- Make sure pyramiding *% equity equals 100 to prevent overuse of equity (unless using leverage)

The script is designed as an alternative to daily or weekly recurring purchases, but depending on the accuracy of your technical analysis conditions, it may also prove profitable at lower timeframes.

The reason the script is called Intelligent is because the most common recurring buy does not involve any decision making: buy no matter what with a certain frequency. This strategy still performs recurring purchases but filters out some potential bad entries that can unnecessarily delay seeing the position profitable. The second reason is also having an exit strategy in place from the start, which no recurring buy option offers out of the box.

## Strategy Principles 

The strategy determines entries and exits based on the crossover of the RSI indicator with the Bollinger Bands. Specifically, when the RSI is below the lower rail, look for short entries, and when the RSI is above the upper rail, look for long exits.

In addition, the strategy provides settings for pyramiding and batched exits. The sum of the number of pyramiding and the percentage of equity used each time should equal 100 to prevent overuse of funds. You can choose to allow continued pyramiding on winning positions or only pyramiding on losing positions to achieve average down.

When exiting, you can choose to take full profit or exit in batches according to the set percentage. In addition, the minimum profit percentage can be set to avoid exits if the profit is lower than that percentage.

Overall, the strategy combines recurring purchases and technical analysis indicators to achieve more stable pyramiding by filtering out some wrong signals, while setting up flexible exit mechanisms that can be adjusted according to one's own risk appetite.

## Advantage Analysis

Compared with traditional recurring purchase strategies, the biggest advantage of this strategy is that both entries and exits have technical indicators as references, which can filter out some wrong signals, in contrast to the daily and weekly purchases without any decision making. The specific advantages are:

1. Use RSI and Bollinger Bands to determine entry timing to avoid chasing highs  
2. Clear exit conditions with profit taking and stop loss standards instead of holding positions indefinitely  
3. Pyramiding parameters can be adjusted as needed for more flexible position sizing  
4. Option to only add to losing positions or pyramid winners as well
5. Take full profit or scale out in batches  
6. Minimum profit percent avoids premature exits

In summary, the strategy realizes the periodic pyramiding effect of recurring purchases while increasing the technical indicator judgment for entries and exits, allows parameters adjustment according to one's own preferences, reduces the risk of blind entries, and improves profit efficiency.

## Risk Analysis

Although the strategy sets technical indicators filtering and flexible pyramiding/exit mechanisms to reduce risks, there are still inevitable risks for any strategy. The main risks include:

1. Probability of wrong signals from the indicators, which may cause missing the best entry or exit timing  
2. Inappropriate setting of pyramiding times and capital allocation leading to oversized position risks  
3. Market fluctuates violently in the short term while indicators fail to respond in time  
4. Premature or belated profit-taking exits impacting profitability   

The corresponding solutions are:

1. Use multiple indicators combination to reduce errors  
2. Carefully test and evaluate parameters to avoid over leveraging  
3. Incorporate real-time signals from shorter-period indicators as auxiliary judgment
4. Test and optimize profit-taking parameters to improve steady profitability

## Optimization Directions   

The strategy can be further optimized in the following aspects:

1. Optimize or replace technical indicators to improve entry/exit accuracy. Different parameters or combinations can be tested to choose more reliable signals.  
2. Add stop loss strategy. Currently no stop loss is configured. Loss standards can be set based on drawdown or other metrics to control maximum loss.
3. Dynamically adjust pyramiding magnitude. The funds added on each pyramid can be adjusted in real time based on the number of positions or market volatility. Reduce pyramiding in high volatility environments.  
4. Integrate algorithmic trading. The current strategy consists of simple indicators. Machine learning models can potentially be incorporated for higher level decision making.
5. Optimize parameter settings. Continuously optimize parameters like pyramiding percentages, profit taking percentages etc. with the goal to pursue higher returns while controlling risks.

## Conclusion  

The Intelligent Accumulator Buy Strategy retains the periodic pyramiding advantage of recurring purchases while filtering entries and exits with technical indicators and setting clear profit taking/stop loss exit mechanisms, avoiding the disadvantages of blind entries and indefinite holdings. The strategy allows high customization of pyramiding and exit parameters based on personal risk preference, thus very advantageous for long-term holders.

Of course, there are still risks of signal errors and inappropriate parameters, which needs to be addressed through continued optimization of indicators and parameters as well as auxiliary stop loss means. Overall, the strategy forms an important evolution from recurring purchases to intelligent accumulators, providing investors a relatively comprehensive and controllable long-term holding solution.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|false|Add while in profit|
|v_input_bool_2|false|extLong|
|v_input_source_1_close|0|entry: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|false|Required profit % to exit|
|v_input_float_2|100|% exit per candle|
|v_input_bool_3|false|extShort|
|v_input_source_2_close|0|exit: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-19 00:00:00
end: 2024-02-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © TheTradingParrot

//@version=5
strategy("TTP Intelligent Accumulator", overlay=true)

maxEntries = 0.0

if not na(maxEntries[1])
    maxEntries := maxEntries[1]

rsi = ta.rsi(close, 7)
rsima = ta.sma(rsi, 14)
bbstd = ta.stdev(rsi, 14)

// plot(rsi)
// plot(rsima)
// plot(rsima - bbstd)
// plot(rsima + bbstd)

intEntry = rsi < rsima - bbstd
intExit = rsi > rsima + bbstd

maxEntries := math.max(strategy.opentrades, maxEntries)
plot(maxEntries, "maxEntries")

addWhileInProfit = input.bool(false, "Add while in profit")

extLong = input.bool(false, "", inline = "long")
entry = input.source(close,"entry", inline = "long") == 1

if not extLong
    entry := intEntry
longCondition = entry and (strategy.opentrades == 0 or (not addWhileInProfit or close < strategy.position_avg_price))


if (longCondition)
    strategy.entry("long", strategy.long)

minProfit = input.float(0.0, "Required profit % to exit")
exitPxcandle = input.float(100.0,"% exit per candle")

extShort = input.bool(false, "", inline = "exit")

exit = input.source(close,"exit", inline = "exit") == 1
if not extShort
    exit := intExit

shortCondition = exit
if (shortCondition and strategy.opentrades > 0)
    strategy.close("long", qty_percent = exitPxcandle)

plot(strategy.position_avg_price, "Avg")
```

> Detail

https://www.fmz.com/strategy/442835

> Last Modified

2024-02-26 13:59:57
