
> Name

Double-Seven-Strategy-Trend-Following-and-Mean-Reversion-Dual-Optimization-Trading-SystemDouble-Seven-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17bacb16f999e2937a7.png)

[trans]
#### 概述
本策略是一个结合趋势跟踪和均值回归的量化交易系统。它通过200日移动平均线(MA200)确定大趋势方向,同时利用7日价格波动识别短期超跌机会,实现在上升趋势中把握最佳买入时机。这种方法既保证了交易方向的正确性,又能在价格调整时及时介入,充分发挥技术分析在交易中的指导作用。

#### 策略原理
策略的核心逻辑包含两个维度:一是通过MA200判断长期趋势,只有当价格位于MA200之上时才考虑开仓;二是观察最近7个交易日的价格表现,当出现7日新低且仍在MA200之上时建仓做多,当价格达到7日新高时平仓。这种设计既确保了顺势而为,又能在调整时低位建仓,是一个融合了趋势跟踪和均值回归思想的系统化策略。

#### 策略优势
1. 趋势确认的可靠性:使用MA200作为趋势过滤器,能有效避免在下跌趋势中开仓。
2. 入场时机的精准性:通过7日低点识别超跌修正机会,提高建仓性价比。
3. 系统化程度高:策略规则明确,无主观判断因素,易于程序化实现。
4. 风险控制完善:通过趋势过滤和超跌判断双重机制,降低错误信号概率。
5. 适用性广:策略逻辑简单且普适性强,可应用于多个市场和品种。

#### 策略风险
1. 趋势判断滞后:MA200作为长期均线具有滞后性,在趋势转折点可能造成判断失误。
2. 假突破风险:价格突破7日高点后可能出现假突破,导致过早平仓。
3. 震荡市不适用:在横盘震荡市场中,频繁的短期高低点可能产生过多交易信号。
4. 市场环境依赖:策略效果受市场趋势特征影响较大,不同市场环境表现差异明显。

#### 策略优化方向
1. 动态周期优化:可根据不同市场特征动态调整MA周期和短期观察周期。
2. 多重确认机制:增加成交量、波动率等辅助指标,提高信号可靠性。
3. 仓位管理优化:引入动态仓位管理机制,根据市场波动性调整持仓比例。
4. 止损机制完善:设计更灵活的止损方案,如跟踪止损或波动率止损。
5. 分型优化:针对不同市场环境设计差异化的参数组合。

#### 总结
Double Seven Strategy是一个将趋势跟踪与均值回归有机结合的量化交易系统。通过MA200和7日价格波动的配合使用,既保证了交易方向的正确性,又能把握较好的入场时机。虽然存在一定的局限性,但通过合理的优化和风险控制,该策略具有较好的实用价值和扩展空间。建议交易者在实际应用中结合市场特征和自身需求进行针对性优化,以提升策略的稳定性和收益性。 || 

#### Overview
This strategy is a quantitative trading system that combines trend following and mean reversion. It uses the 200-day moving average (MA200) to determine the major trend direction while utilizing 7-day price fluctuations to identify short-term oversold opportunities, achieving optimal entry timing in uptrends. This method ensures both directional accuracy and timely intervention during price adjustments, fully leveraging technical analysis in trading.

#### Strategy Principles
The core logic includes two dimensions: First, using MA200 to judge long-term trends, only considering positions when price is above MA200; Second, observing price performance over the last 7 trading days, entering long positions when a 7-day low occurs while still above MA200, and closing positions when price reaches a 7-day high. This design ensures both trend following and low-point entry, creating a systematic strategy that combines trend following and mean reversion concepts.

#### Strategy Advantages
1. Trend Confirmation Reliability: Using MA200 as a trend filter effectively avoids opening positions in downtrends.
2. Entry Timing Precision: Identifies oversold correction opportunities through 7-day lows, improving entry value.
3. High Systematization: Clear strategy rules without subjective judgment factors, easy to implement programmatically.
4. Comprehensive Risk Control: Reduces false signal probability through dual mechanisms of trend filtering and oversold judgment.
5. Wide Applicability: Simple and universal strategy logic applicable across multiple markets and instruments.

#### Strategy Risks
1. Trend Judgment Lag: MA200 as a long-term moving average has inherent lag, potentially causing misjudgments at trend turning points.
2. False Breakout Risk: Price breaking above 7-day highs may result in false breakouts, leading to premature exits.
3. Unsuitable for Ranging Markets: Frequent short-term highs and lows in sideways markets may generate excessive trading signals.
4. Market Environment Dependency: Strategy effectiveness heavily influenced by market trend characteristics, showing significant performance differences across market environments.

#### Strategy Optimization Directions
1. Dynamic Period Optimization: Adjust MA period and short-term observation period based on different market characteristics.
2. Multiple Confirmation Mechanisms: Add auxiliary indicators like volume and volatility to improve signal reliability.
3. Position Management Optimization: Introduce dynamic position management mechanisms to adjust holding ratios based on market volatility.
4. Stop Loss Enhancement: Design more flexible stop loss solutions, such as trailing stops or volatility-based stops.
5. Pattern Optimization: Design differentiated parameter combinations for different market environments.

#### Summary
The Double Seven Strategy is a quantitative trading system that organically combines trend following with mean reversion. Through the coordinated use of MA200 and 7-day price fluctuations, it ensures both directional accuracy and optimal entry timing. While certain limitations exist, the strategy holds practical value and expansion potential through reasonable optimization and risk control. Traders are advised to optimize the strategy based on market characteristics and personal needs in practical applications to enhance stability and profitability.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-27 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © EdgeTools

//@version=5
strategy("Larry Connors' Double Seven Strategy", overlay=true)

// 200-day moving average
ma200 = ta.sma(close, 200)

// Conditions for Double Seven Strategy
priceAboveMa200 = close > ma200

// Find the lowest close over the last 7 days
lowestClose7Days = ta.lowest(close, 7)

// Find the highest close over the last 7 days
highestClose7Days = ta.highest(close, 7)

// Entry and exit rules
longCondition = priceAboveMa200 and close <= lowestClose7Days
exitCondition = close >= highestClose7Days

// Enter long position
if (longCondition)
    strategy.entry("Long", strategy.long)

// Exit long position
if (exitCondition)
    strategy.close("Long")
    
// Plot moving averages
plot(ma200, "200-day MA", color=color.blue)

```

> Detail

https://www.fmz.com/strategy/473246

> Last Modified

2024-11-28 15:41:34
