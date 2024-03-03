
> Name

威尔德趋势均衡点系统Welles-Wilders-Trend-Balance-Point-System

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

这是由威尔德(Welles Wilder)在1978年创建的原始趋势均衡点系统,其交易规则可在其书籍《新概念技术分析系统》中找到。该系统利用动量指标识别趋势,并以特定方式设置止损止盈,形成一个较为稳健的趋势跟踪体系。

### 策略原理

该策略的主要组成部分和交易规则如下:

1. 动量指标:计算N周期收盘价变动情况,判断价格趋势。

2. 做多条件:当前周期和过去两个周期的动量值连续上升。

3. 做空条件:当前周期和过去两个周期的动量值连续下降。

4. 止损点:前一日的均价±前一日波动范围。 

5. 止盈点:前一日的2倍均价-最低价(做多)或2倍均价-最高价(做空)。

6. 入场后以止损或止盈价格退出。

该策略简单直接,利用动量判断趋势方向,并采用特定的止损止盈方式控制风险,形成一个较为稳健的趋势跟踪体系。

### 优势分析

相比其他趋势跟踪策略,该策略有以下主要优势:

1. 动量指标计算简单,容易实现。

2. 多周期组合判断,可过滤噪声。

3. 止损止盈方式较为稳健。

4. 可限制单笔损失大小。

5. 回撤可控,利润兑现明确。 

6. 实现难度不大,可灵活操作。

7. 可调整参数,适用于不同市场。

8. 策略思路直观简单。

9. 总体来说,稳定性和风险控制能力较强。

### 风险分析

但是该策略也存在以下风险:

1. 动量指标存在滞后,可能错过关键转折。

2. 效果依赖参数优化程度。

3. 未考虑交易量,存在被套风险。

4. 止损止盈设定较为武断,可能预期失败。

5. 回测周期较短,需验证长期稳健性。

6. 固定仓位操作,无法动态调整。

7. 优化空间有限,超额收益存在不确定性。

8. 须关注收益回撤比,防止过拟合。

### 优化方向

鉴于上述分析,该策略可从以下维度进行优化:

1. 尝试不同动量计算方式。

2. 加入交易量验证。

3. 优化止损止盈参数。

4. 引入机器学习生成动态信号。

5. 评估多品种多周期的稳健性。

6. 构建动态仓位管理模型。

7. 设定最大回撤容忍度。

8. 优化资金管理策略。

9. 持续回测验证,防止过优化。

### 总结

该策略整体来说是一套相对简单直接的趋势跟踪体系。但任何策略都需要不断优化与验证,以保持对市场的适应性。通过系统性工作,可提高策略的效果和稳定性。

||


### Overview

This is the original Trend Balance Point System created by Welles Wilder in 1978, with rules found in his book New Concepts in Technical Trading Systems. It identifies trend with momentum and sets stops/targets in a structured way to form a robust trend following system.

### Strategy Logic

The key components and rules are:

1. Momentum indicator: Calculates price change over N periods to determine trend.

2. Long condition: Momentum rising over current and previous two periods. 

3. Short condition: Momentum falling over current and previous two periods.

4. Stop loss: Previous day's average price ± previous day's range.

5. Take profit: 2 * previous day's average price - previous day low (long) or high (short).

6. Exits with stop or target after entry.

The strategy directly uses momentum for trend identification and a structured stop/target approach to control risk and form a robust trend following system.

### Advantages

Compared to other trend following strategies, the main advantages are:

1. Simple momentum calculation, easy to implement.

2. Multi-period combo filters noise. 

3. Structured stop/target is robust.

4. Limits loss per trade.

5. Drawdown controllable, profit taking clear.

6. Easy to operate flexibly.

7. Adjustable parameters for different markets. 

8. Intuitive and simple logic.

9. Overall good stability and risk control.

### Risks

However, the risks are:

1. Momentum lag may miss key turns.

2. Performance relies on parameter tuning.

3. No volume filter, risk of being trapped.

4. Stop/target settings are rigid, may fail in practice. 

5. Limited backtest period, need to verify long-term robustness. 

6. Fixed size lacks dynamic adjustment.

7. Limited optimization space, uncertain alpha. 

8. Need to monitor reward/risk ratios and curve fitting.

### Enhancements

In light of the analysis, enhancements may involve:

1. Testing different momentum calculations. 

2. Adding volume confirmation.

3. Optimizing stop/target parameters.

4. Introducing machine learning for dynamic signals.

5. Evaluating robustness across products and timeframes.

6. Constructing dynamic position sizing models. 

7. Setting maximum tolerable drawdown limit.

8. Optimizing risk management strategies.

9. Continual backtesting to prevent overfitting.

### Conclusion

In summary, this is a relatively simple and direct trend following system. But continual optimizations and robustness testing are key for any strategy to stay adaptive. Through systematic efforts, strategy performance and stability can be enhanced.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Momentum Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-15 00:00:00
end: 2023-09-22 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © 2020 X-Trader.net

//@version=3
strategy("Trend Balance Point System by Welles Wilder", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, initial_capital = 10000)

MomPer = input(2, "Momentum Period")

isLong = strategy.position_size > 0
isShort = strategy.position_size < 0

longTrigger = mom(close, MomPer)[1] > mom(close, MomPer)[2] and mom(close, MomPer)[1] > mom(close, MomPer)[3]
shortTrigger = mom(close, MomPer)[1] < mom(close, MomPer)[2] and mom(close, MomPer)[1] < mom(close, MomPer)[3]

longEntry = (not isLong) and longTrigger 
shortEntry = (not isShort) and shortTrigger

longStop = valuewhen(longEntry, ((high[1]+low[1]+close[1])/3 - (high[1]-low[1])), 0)
longTP = valuewhen(longEntry, (2*(high[1]+low[1]+close[1])/3 - low[1]), 0)
shortStop = valuewhen(shortEntry, ((high[1]+low[1]+close[1])/3 + (high[1]-low[1])), 0)
shortTP = valuewhen(shortEntry, (2*(high[1]+low[1]+close[1])/3 - high[1]), 0)

strategy.entry(id = "Long", long = true, when = longEntry)
strategy.exit("Exit Long", "Long", profit = longTP, loss = longStop, when = isLong) 

strategy.entry(id = "Short", long = false, when = shortEntry)
strategy.exit("Exit Short", "Short", profit = shortTP, loss = shortStop, when = isShort) 


```

> Detail

https://www.fmz.com/strategy/427674

> Last Modified

2023-09-23 15:30:58
