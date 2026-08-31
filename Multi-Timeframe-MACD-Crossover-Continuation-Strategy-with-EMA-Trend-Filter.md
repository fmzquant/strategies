
> Name

Multi-Timeframe-MACD-Crossover-Continuation-Strategy-with-EMA-Trend-Filter

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8847279785615196d5c.png)
![IMG](https://www.fmz.com/upload/asset/2d8bb429494054ae840c3.png)




[trans]
#### 概述
该策略是一个基于MACD指标和移动平均线的多时区交易系统。它结合了1分钟和3分钟两个时间周期的MACD指标,同时使用200周期EMA作为趋势过滤器,通过捕捉市场趋势的持续性来进行交易。策略包含了风险管理机制,包括止损设置和移动到保本点的动态调整功能。

#### 策略原理
策略的核心逻辑基于以下几个关键要素:
1. 使用1分钟和3分钟两个时间周期的MACD指标来确认趋势的持续性
2. 通过200周期EMA作为主要趋势判断依据
3. 结合价格与均线位置关系来过滤交易信号
4. 在交易时段过滤器的基础上进行交易

具体的交易信号生成规则如下:
- 多头信号: MACD线在零线以上且向上穿越信号线,同时3分钟MACD确认趋势,价格在EMA200之上
- 空头信号: MACD线在零线以下且向下穿越信号线,同时3分钟MACD确认趋势,价格在EMA200之下

#### 策略优势
1. 多重时间周期确认提高了交易的准确性
2. 结合趋势过滤器减少了假信号
3. 包含了完善的风险控制机制
4. 使用时间过滤器避免了非活跃时段的交易
5. 动态的保本点调整保护了已获得的利润
6. 策略逻辑清晰,便于调整和优化

#### 策略风险
1. 在高波动市场中可能面临滑点风险
2. 多重确认机制可能导致错过部分交易机会
3. 固定的止损点位可能在某些市场环境下不够灵活
4. 需要考虑交易成本对策略收益的影响
5. 在剧烈波动的市场中可能面临较大回撤

风险控制建议:
- 根据市场波动调整止损距离
- 考虑增加利润目标来确保盈利
- 在重要经济数据公布期间暂停交易
- 定期评估和调整策略参数

#### 策略优化方向
1. 动态调整MACD参数:
- 根据市场波动率自适应调整
- 考虑使用自适应移动平均线

2. 改进时间过滤器:
- 细化交易时段划分
- 结合成交量分析优化交易时间

3. 优化止损机制:
- 引入动态止损
- 基于ATR设置止损距离

4. 增强趋势过滤:
- 添加更多技术指标确认
- 考虑引入价格行为分析

#### 总结
该策略通过多时间周期MACD指标和EMA趋势过滤器的结合,构建了一个相对完善的交易系统。它的优势在于多重确认机制和风险管理的完整性,但同时也需要注意在不同市场环境下的适应性问题。通过建议的优化方向,策略有望在保持其稳定性的同时进一步提高收益能力。 || 

#### Overview
This strategy is a multi-timeframe trading system based on the MACD indicator and moving averages. It combines MACD indicators from 1-minute and 3-minute timeframes, along with a 200-period EMA as a trend filter, to capture market trend continuations. The strategy includes risk management mechanisms, including stop-loss settings and dynamic break-even adjustments.

#### Strategy Principles
The core logic of the strategy is based on several key elements:
1. Using MACD indicators from both 1-minute and 3-minute timeframes to confirm trend continuation
2. Using 200-period EMA as the main trend determination reference
3. Combining price and moving average relationships to filter trading signals
4. Trading based on session time filters

Specific signal generation rules:
- Long signals: MACD line crosses above signal line above zero, confirmed by 3-minute MACD, price above EMA200
- Short signals: MACD line crosses below signal line below zero, confirmed by 3-minute MACD, price below EMA200

#### Strategy Advantages
1. Multi-timeframe confirmation improves trading accuracy
2. Trend filter reduces false signals
3. Includes comprehensive risk control mechanisms
4. Time filters avoid trading during inactive sessions
5. Dynamic break-even adjustments protect acquired profits
6. Clear strategy logic, easy to adjust and optimize

#### Strategy Risks
1. Slippage risk in high volatility markets
2. Multiple confirmation requirements may miss some trading opportunities
3. Fixed stop-loss points may lack flexibility in certain market conditions
4. Need to consider the impact of trading costs on strategy returns
5. Potential for significant drawdowns in volatile markets

Risk control suggestions:
- Adjust stop-loss distance based on market volatility
- Consider adding profit targets to secure gains
- Pause trading during major economic data releases
- Regularly evaluate and adjust strategy parameters

#### Strategy Optimization Directions
1. Dynamic MACD parameter adjustment:
- Self-adaptive adjustment based on market volatility
- Consider using adaptive moving averages

2. Improve time filters:
- Refine trading session divisions
- Optimize trading times using volume analysis

3. Optimize stop-loss mechanism:
- Introduce dynamic stop-loss
- Set stop-loss distances based on ATR

4. Enhance trend filtering:
- Add more technical indicators for confirmation
- Consider incorporating price action analysis

#### Summary
This strategy constructs a relatively complete trading system through the combination of multi-timeframe MACD indicators and EMA trend filters. Its strengths lie in its multiple confirmation mechanisms and comprehensive risk management, while attention needs to be paid to its adaptability in different market environments. Through the suggested optimization directions, the strategy has the potential to further improve its profitability while maintaining stability.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-02-13 00:00:00
end: 2025-02-15 02:00:00
period: 5m
basePeriod: 5m
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("NQ MACD Continuation Backtest", overlay=true)

// MACD Settings
fastLength = 12
slowLength = 26
signalLength = 9

// 1-minute MACD
[macdLine, signalLine, _] = ta.macd(close, fastLength, slowLength, signalLength)

// 3-minute MACD for trend filter
[htfMacd, htfSignal, _] = request.security(syminfo.tickerid, "3", ta.macd(close, fastLength, slowLength, signalLength), lookahead=barmerge.lookahead_on)

// 200 EMA
ema200 = ta.ema(close, 200)

// Time Filters
inSession = (hour(time, "America/New_York") >= 9 and (hour(time, "America/New_York") > 9 or minute(time, "America/New_York") >= 45)) and (hour(time, "America/New_York") < 22 or (hour(time, "America/New_York") == 22 and minute(time, "America/New_York") == 30))
notRestricted = (hour(time, "America/New_York") >= 6 and hour(time, "America/New_York") < 22)

// Track Previous MACD Crosses
var bool bullishCrossed = false
var bool bearishCrossed = false
if (ta.crossover(macdLine, signalLine) and macdLine > 0)
    bullishCrossed := true
if (ta.crossunder(macdLine, signalLine) and macdLine < 0)
    bearishCrossed := true

// Define Continuation Signals with EMA and 3-Min MACD Filter
bullishContinuation = (ta.crossover(macdLine, signalLine) and macdLine > 0 and signalLine > 0 and htfMacd > htfSignal and bullishCrossed and close > ema200)
bearishContinuation = (ta.crossunder(macdLine, signalLine) and macdLine < 0 and signalLine < 0 and htfMacd < htfSignal and bearishCrossed and close < ema200)

// Entry Conditions with SL and 10 Contracts
if (bullishContinuation and inSession and notRestricted)
    strategy.entry("Long", strategy.long, qty=10, stop=close - 7 * syminfo.mintick)
if (bearishContinuation and inSession and notRestricted)
    strategy.entry("Short", strategy.short, qty=10, stop=close + 7 * syminfo.mintick)

// Break-Even Adjustment
if (strategy.position_size > 0 and close >= strategy.position_avg_price + 5 * syminfo.mintick)
    strategy.exit("BreakEvenLong", from_entry="Long", stop=strategy.position_avg_price)
if (strategy.position_size < 0 and close <= strategy.position_avg_price - 5 * syminfo.mintick)
    strategy.exit("BreakEvenShort", from_entry="Short", stop=strategy.position_avg_price)

// Display Indicators on Chart
plot(macdLine, color=color.blue, title="MACD Line")
plot(signalLine, color=color.orange, title="Signal Line")
plot(ema200, color=color.red, title="200 EMA")
```

> Detail

https://www.fmz.com/strategy/483031

> Last Modified

2025-02-27 17:17:57
