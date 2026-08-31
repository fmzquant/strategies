
> Name

Multi-EMA-Trend-Following-Strategy-with-Dynamic-Position-Management-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d947ad81628f572d3ae4.png)
![IMG](https://www.fmz.com/upload/asset/2d8db8b6d656ed24d199a.png)


[trans]## 概述

多重均线追踪策略与动态仓位管理系统是一个基于多重指数移动平均线(EMA)的量化交易策略。该策略通过监控五条不同周期(12、144、169、576和676)的EMA指标,构建了一个完整的交易系统,包括趋势判断、入场信号识别、分批建仓、动态止损和动态止盈。该策略不仅支持多次加仓操作,最多可建立5个交易仓位,而且对每个仓位都有独立的风险控制措施。系统通过EMA指标的排列和价格与关键均线的交叉关系,精确捕捉市场趋势的转折点,并在维持趋势的前提下实现分批建仓和分批获利。

## 策略原理

该策略的核心逻辑基于多重EMA指标之间的位置关系和价格与关键EMA的交互作用:

1. **趋势判断机制**:
   - 多头趋势条件: EMA12 > EMA144 > EMA169 > EMA576 > EMA676
   - 空头趋势条件: EMA12 < EMA144 < EMA169 < EMA576 < EMA676

2. **入场信号**:
   - 多头入场: 在满足多头趋势的基础上,当低点突破EMA144并且收盘价位于EMA169之上时
   - 空头入场: 在满足空头趋势的基础上,当高点突破EMA144并且收盘价位于EMA169之下时

3. **分批建仓**:
   - 首次建仓: 符合入场信号且无持仓
   - 二次建仓: 满足入场信号且当前持有一个仓位
   - 三至五次建仓: 在满足入场信号的基础上,还需要距离上次建仓的时间间隔超过50根K线

4. **动态止损止盈**:
   - 每个仓位均采用动态止损点,基于建仓时12根K线的最低价(多头)或最高价(空头)
   - 采用对称止盈策略,目标价位为"入场价格 + (入场价格 - 止损价)"
   - 分批获利: 每个仓位达到止盈点位时,先平仓50%,剩余部分继续持有直至触及止损

5. **整体风险控制**:
   - 当EMA12与EMA144指标交叉时(多头趋势中EMA12跌破EMA144,或空头趋势中EMA12突破EMA144),全部平仓
   
总体而言,该策略通过多重EMA的排列确立市场趋势方向,通过价格与EMA144的交互确定入场时机,并通过近期价格波动区间设置动态止损止盈点位,同时通过分批建仓和分批获利的方式优化资金管理,最终形成一个完整的交易系统。

## 策略优势

1. **系统化趋势判断**:
   - 利用五条不同周期的EMA形成立体的趋势判断体系,减少假突破带来的风险
   - EMA指标的排列组合为趋势的强弱提供了量化标准,使交易决策更加客观

2. **精确的入场机制**:
   - 结合价格与均线的交叉行为作为入场触发条件,提高入场的时效性
   - 要求入场信号在12根K线内确认,减少滞后交易的风险

3. **智能的资金管理**:
   - 支持最多5个仓位的分批建仓,适应不同的市场发展阶段
   - 后续建仓需满足最小时间间隔(50根K线),避免在短时间内过度建仓

4. **灵活的获利策略**:
   - 采用"对称止盈"原则,根据入场价和止损点动态计算目标获利点位
   - 分批获利(50%仓位),在保留上涨空间的同时锁定部分利润

5. **严格的风险控制**:
   - 每个仓位设置独立的止损点,基于近期波动范围(12根K线)
   - 趋势反转信号(EMA12与EMA144交叉)触发全部平仓,及时止损

6. **适应性强**:
   - 同时支持多头和空头交易,适应各种市场环境
   - 通过参数调整(如ATR倍数、K线数量),可适应不同品种和周期

## 策略风险

1. **均线滞后性风险**:
   - EMA指标存在一定的滞后性,在行情剧烈波动时可能导致入场或离场时机不佳
   - 缓解方法: 可以考虑结合短期动量指标作为辅助,提高系统的反应速度

2. **分批建仓的资金压力**:
   - 最多支持5个仓位的加仓策略可能导致资金集中度过高
   - 缓解方法: 应根据总资金量合理设置每次建仓的资金比例,确保资金分配均衡

3. **固定周期参数的局限性**:
   - 代码中的EMA周期(12、144、169、576、676)为固定值,可能不适用于所有市场环境
   - 缓解方法: 引入自适应周期计算方法,或针对不同品种建立专门的参数优化流程

4. **对称止盈的潜在问题**:
   - 在强趋势市场中,对称止盈可能过早获利,错失更大的盈利空间
   - 缓解方法: 可以考虑为剩余50%的仓位设置追踪止损,以适应强趋势行情

5. **入场条件过于严格**:
   - 多重条件组合(均线排列+价格交叉+收盘确认)可能导致错过部分有效信号
   - 缓解方法: 针对不同市场阶段,可设置备选的入场机制,提高信号捕捉的灵敏度

6. **数据依赖风险**:
   - 策略依赖长周期EMA(如576、676),需要足够长的历史数据才能有效运行
   - 缓解方法: 在数据不足的情况下,可考虑使用替代指标或调整长周期EMA的计算方法

## 策略优化方向

1. **引入自适应参数机制**:
   - 将固定的EMA周期(12、144、169、576、676)改为基于市场波动性的自适应参数
   - 优化原因: 不同市场环境下,最优EMA周期存在显著差异,自适应机制可提高策略的通用性

2. **增强入场信号过滤**:
   - 结合成交量、市场波动率(如ATR)等指标,为入场信号增加额外的确认条件
   - 优化原因: 纯均线交叉信号容易受到市场噪音干扰,额外的过滤条件可提高信号质量

3. **完善资金管理体系**:
   - 基于账户总资金和市场波动率动态调整每次建仓的资金比例
   - 优化原因: 当前策略的资金分配比例固定,无法根据风险水平自动调整,引入动态资金管理可提高资金利用效率

4. **优化止盈止损机制**:
   - 为不同的建仓位置设计差异化的止盈止损策略,如首次建仓采用固定比例止盈,后续建仓采用追踪止损
   - 优化原因: 统一的止盈止损策略难以适应不同市场阶段的需求,差异化策略可以更灵活地应对市场变化

5. **增加时间过滤器**:
   - 引入交易时间过滤机制,避开高波动性时段(如开盘、收盘前)或重大数据发布期间
   - 优化原因: 特定时间段的市场波动往往缺乏方向性,增加时间过滤可避免不必要的交易

6. **添加趋势强度评估**:
   - 开发趋势强度指标,仅在趋势强度达到阈值时才允许交易
   - 优化原因: 当前策略在弱趋势环境下也会产生信号,引入趋势强度评估可减少震荡市中的虚假信号

7. **构建多周期协同系统**:
   - 结合更高时间周期的趋势判断作为交易方向过滤器
   - 优化原因: 单一周期的交易系统容易受到短期波动干扰,多周期协同可提高系统的稳定性

## 总结

多重均线追踪策略与动态仓位管理系统是一个结构完整、逻辑清晰的量化交易策略。该策略通过多重EMA的排列组合建立趋势判断框架,通过价格与关键均线的交互确定入场时机,并通过分批建仓和动态止损止盈实现精细化的资金管理和风险控制。策略的优势在于系统化的趋势判断、精确的入场机制、智能的资金管理和严格的风险控制,使其在不同市场环境下都具有一定的适应性。

然而,该策略也存在均线滞后、固定参数局限性和资金管理压力等风险。为进一步提升策略效果,可以考虑引入自适应参数机制、增强信号过滤、完善资金管理体系、优化止盈止损机制以及构建多周期协同系统等优化方向。

总体而言,该策略通过均衡趋势跟踪与风险控制,为量化交易提供了一个可操作性强的框架。通过持续优化和针对特定市场环境的参数调整,该策略有望在实际交易中取得稳定的表现。 || ## Overview

The Multi-EMA Trend Following Strategy with Dynamic Position Management System is a quantitative trading strategy based on multiple Exponential Moving Averages (EMAs). This strategy monitors five different EMA periods (12, 144, 169, 576, and 676) to construct a complete trading system, including trend determination, entry signal identification, batch position building, dynamic stop-loss, and dynamic take-profit mechanisms. The strategy supports multiple position additions, with a maximum of 5 trading positions, and implements independent risk control measures for each position. The system precisely captures market trend reversal points through the arrangement of EMA indicators and the intersection relationship between price and key moving averages, achieving batch position building and profit-taking while maintaining the trend.

## Strategy Principles

The core logic of this strategy is based on the positional relationship between multiple EMA indicators and the interaction between price and key EMAs:

1. **Trend Determination Mechanism**:
   - Long trend condition: EMA12 > EMA144 > EMA169 > EMA576 > EMA676
   - Short trend condition: EMA12 < EMA144 < EMA169 < EMA576 < EMA676

2. **Entry Signals**:
   - Long entry: When the low breaks through EMA144 and the closing price is above EMA169, under the long trend condition
   - Short entry: When the high breaks through EMA144 and the closing price is below EMA169, under the short trend condition

3. **Batch Position Building**:
   - First position: Entry signal is met with no existing positions
   - Second position: Entry signal is met with one existing position
   - Third to fifth positions: In addition to meeting the entry signal, the time interval since the last position must exceed 50 candles

4. **Dynamic Stop-Loss and Take-Profit**:
   - Each position adopts a dynamic stop-loss point based on the lowest price (for longs) or highest price (for shorts) of 12 candles at the time of entry
   - Applies a symmetrical take-profit strategy with target price being "entry price + (entry price - stop-loss price)"
   - Batch profit-taking: When each position reaches the take-profit level, 50% is closed first, and the remaining portion continues to be held until the stop-loss is triggered

5. **Overall Risk Control**:
   - All positions are closed when the EMA12 and EMA144 indicators cross (EMA12 breaks below EMA144 in a long trend, or EMA12 breaks above EMA144 in a short trend)
   
Overall, this strategy establishes market trend direction through multiple EMA arrangements, determines entry timing through price interaction with EMA144, sets dynamic stop-loss and take-profit levels based on recent price fluctuation ranges, and optimizes capital management through batch position building and profit-taking, ultimately forming a complete trading system.

## Strategy Advantages

1. **Systematic Trend Determination**:
   - Utilizes five EMAs of different periods to form a multi-dimensional trend determination system, reducing risks from false breakouts
   - The arrangement of EMA indicators provides a quantitative standard for trend strength, making trading decisions more objective

2. **Precise Entry Mechanism**:
   - Combines price and moving average crossovers as entry trigger conditions, improving entry timing effectiveness
   - Requires confirmation of entry signals within 12 candles, reducing the risk of lagging trades

3. **Intelligent Capital Management**:
   - Supports up to 5 positions with batch building, adapting to different market development stages
   - Subsequent positions require a minimum time interval (50 candles), avoiding excessive position building in a short period

4. **Flexible Profit Strategy**:
   - Adopts the "symmetrical take-profit" principle, dynamically calculating target profit levels based on entry price and stop-loss point
   - Batch profit-taking (50% position) secures partial profits while retaining upside potential

5. **Strict Risk Control**:
   - Each position has an independent stop-loss point based on recent volatility range (12 candles)
   - Trend reversal signals (EMA12 and EMA144 crossover) trigger complete position closure, stopping losses promptly

6. **High Adaptability**:
   - Supports both long and short trades, adapting to various market environments
   - Through parameter adjustments (such as ATR multiple, candle count), it can adapt to different instruments and timeframes

## Strategy Risks

1. **Moving Average Lag Risk**:
   - EMA indicators have a certain lag, which may lead to poor entry or exit timing during dramatic market fluctuations
   - Mitigation: Consider incorporating short-term momentum indicators as supplements to improve system reaction speed

2. **Capital Pressure from Batch Position Building**:
   - The strategy supporting up to 5 positions may lead to excessive capital concentration
   - Mitigation: Set reasonable capital allocation ratio for each position based on total capital, ensuring balanced distribution

3. **Limitations of Fixed Period Parameters**:
   - The EMA periods in the code (12, 144, 169, 576, 676) are fixed values, which may not be suitable for all market environments
   - Mitigation: Introduce adaptive period calculation methods or establish dedicated parameter optimization processes for different instruments

4. **Potential Issues with Symmetrical Take-Profit**:
   - In strong trend markets, symmetrical take-profit may secure profits too early, missing larger profit opportunities
   - Mitigation: Consider setting trailing stop-loss for the remaining 50% position to adapt to strong trend markets

5. **Overly Strict Entry Conditions**:
   - The combination of multiple conditions (EMA arrangement + price crossover + closing confirmation) may cause missing some effective signals
   - Mitigation: Set alternative entry mechanisms for different market phases to improve signal capture sensitivity

6. **Data Dependency Risk**:
   - The strategy relies on long-period EMAs (such as 576, 676), requiring sufficient historical data to operate effectively
   - Mitigation: Consider using alternative indicators or adjusting the calculation methods for long-period EMAs when data is insufficient

## Strategy Optimization Directions

1. **Introduce Adaptive Parameter Mechanism**:
   - Change fixed EMA periods (12, 144, 169, 576, 676) to adaptive parameters based on market volatility
   - Optimization reason: Optimal EMA periods vary significantly across different market environments; an adaptive mechanism can improve strategy universality

2. **Enhance Entry Signal Filtering**:
   - Incorporate additional confirmation conditions such as volume and market volatility (e.g., ATR) for entry signals
   - Optimization reason: Pure moving average crossover signals are easily disturbed by market noise; additional filtering conditions can improve signal quality

3. **Improve Capital Management System**:
   - Dynamically adjust the capital allocation ratio for each position based on total account capital and market volatility
   - Optimization reason: The current strategy's capital allocation ratio is fixed and cannot automatically adjust according to risk levels; introducing dynamic capital management can improve capital utilization efficiency

4. **Optimize Stop-Loss and Take-Profit Mechanisms**:
   - Design differentiated stop-loss and take-profit strategies for different position entries, such as fixed ratio take-profit for initial positions and trailing stop-loss for subsequent positions
   - Optimization reason: A uniform stop-loss and take-profit strategy is difficult to adapt to different market phases; differentiated strategies can more flexibly respond to market changes

5. **Add Time Filters**:
   - Introduce trading time filtering mechanisms to avoid high volatility periods (such as market open, pre-close) or major data release periods
   - Optimization reason: Market fluctuations during specific time periods often lack directionality; adding time filters can avoid unnecessary trades

6. **Add Trend Strength Assessment**:
   - Develop trend strength indicators and only allow trading when trend strength reaches a threshold
   - Optimization reason: The current strategy generates signals even in weak trend environments; introducing trend strength assessment can reduce false signals in oscillating markets

7. **Build Multi-Timeframe Coordination System**:
   - Incorporate trend determination from higher timeframes as a trading direction filter
   - Optimization reason: Single timeframe trading systems are easily affected by short-term fluctuations; multi-timeframe coordination can improve system stability

## Summary

The Multi-EMA Trend Following Strategy with Dynamic Position Management System is a quantitative trading strategy with complete structure and clear logic. The strategy establishes a trend determination framework through multiple EMA arrangements, determines entry timing through the interaction between price and key moving averages, and achieves refined capital management and risk control through batch position building and dynamic stop-loss and take-profit mechanisms. The advantages of the strategy lie in systematic trend determination, precise entry mechanisms, intelligent capital management, and strict risk control, making it adaptable to different market environments.

However, the strategy also has risks such as moving average lag, fixed parameter limitations, and capital management pressure. To further enhance the strategy's performance, considerations can be given to introducing adaptive parameter mechanisms, enhancing signal filtering, improving capital management systems, optimizing stop-loss and take-profit mechanisms, and building multi-timeframe coordination systems.

Overall, this strategy provides a highly operable framework for quantitative trading by balancing trend following with risk control. Through continuous optimization and parameter adjustments for specific market environments, the strategy has the potential to achieve stable performance in actual trading.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-09-08 00:00:00
end: 2024-12-08 00:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("专业级交易系统", overlay=false, close_entries_rule = "ANY")
x1 = input.float(1.5,"atr倍数",step=0.1)
x2 = input.int(50,"k线数量",step=1)
s1 = strategy.opentrades.entry_price(0)
s2 = strategy.opentrades.entry_price(1)
s3 = strategy.opentrades.entry_price(2)
s4 = strategy.opentrades.entry_price(3)
s5 = strategy.opentrades.entry_price(4)
s6 = strategy.opentrades.entry_price(5)
s7 = strategy.opentrades.entry_price(6)
s8 = strategy.opentrades.entry_price(7)
s9 = strategy.opentrades.entry_price(8)
c = strategy.position_size,o = strategy.opentrades
ema12_len = input.int(12,"EMA12长度")
ema144_len = input.int(144, "EMA144长度")
ema169_len = input.int(169,"EMA169长度")
ema576_len = input.int(376, "EMA576长度")
ema676_len = input.int(576,"EMA676长度")
ema12 = ta.ema(close,ema12_len)
ema144 = ta.ema(close, ema144_len)
ema169 = ta.ema(close, ema169_len)
ema576 = ta.ema(close, ema576_len)
ema676 = ta.ema(close, ema676_len)
e3 = ta.valuewhen(o ==2 and o[1] == 1 and c > 0,bar_index,0)
e4 = ta.valuewhen(o ==3 and o[1] == 2 and c > 0,bar_index,0)
e5 = ta.valuewhen(o ==4 and o[1] == 3 and c > 0,bar_index,0)
le1 = false
le1 := c <= 0 and ema12 > ema144 and ema144 > ema169 and ema169 > ema576 and ema576 > ema676 and low < ema144 and low[1] > ema144 and close > ema169? true :  close < ema169 or ema12 < ema144 ? false : le1[1]
le11 = false
le11 := le1 and bar_index - ta.valuewhen(low < ema144 and low[1] > ema144,bar_index,0) < 12 ? true : false
le2 = false
le2 := c > 0 and o == 1 and o[1] == 1 and ema12 > ema144 and ema144 > ema169 and ema169 > ema576 and ema576 > ema676 and low < ema144 and low[1] > ema144 and close > ema169? true :  close < ema169 or ema12 < ema144 or o < 1? false : le2[1]
le21 = false
le21 := le2 and bar_index - ta.valuewhen(low < ema144 and low[1] > ema144 and o == 1 and o[1]==1,bar_index,0) < 12 ? true : false
le3 = false
le3 := c > 0 and o == 2 and o[1] == 2 and ema12 > ema144 and ema144 > ema169 and ema169 > ema576 and ema576 > ema676 and low < ema144 and low[1] > ema144 and close > ema169? true :  close < ema169 or ema12 < ema144 or o < 2? false : le3[1]
le31 = false
le31 := le3 and bar_index - e3 > 50 and bar_index - ta.valuewhen(low < ema144 and low[1] > ema144 and o == 2 and o[1]==2,bar_index,0) < 12 ? true : false
le4 = false
le4 := c > 0 and o == 3 and o[1] == 3 and ema12 > ema144 and ema144 > ema169 and ema169 > ema576 and ema576 > ema676 and low < ema144 and low[1] > ema144 and close > ema169? true :  close < ema169 or ema12 < ema144 or o < 3? false : le4[1]
le41 = false
le41 := le4 and bar_index - e4 > 50 and bar_index - ta.valuewhen(low < ema144 and low[1] > ema144 and o == 3 and o[1]==3,bar_index,0) < 12 ? true : false
le5 = false
le5 := c > 0 and o == 4 and o[1] == 4 and ema12 > ema144 and ema144 > ema169 and ema169 > ema576 and ema576 > ema676 and low < ema144 and low[1] > ema144 and close > ema169? true :  close < ema169 or ema12 < ema144 or o < 4? false : le5[1]
le51 = false
le51 := le5 and bar_index - e5 > 50 and bar_index - ta.valuewhen(low < ema144 and low[1] > ema144 and o == 4 and o[1]==4,bar_index,0) < 12 ? true : false
d1 = ta.valuewhen(o == 1 and o[1] == 0 and c > 0,ta.lowest(12),0)
d2 = ta.valuewhen(o == 2 and o[1] == 1 and c > 0,ta.lowest(12),0)
d3 = ta.valuewhen(o == 3 and o[1] == 2 and c > 0,ta.lowest(12),0)
d4 = ta.valuewhen(o == 4 and o[1] == 3 and c > 0,ta.lowest(12),0)
d5 = ta.valuewhen(o == 5 and o[1] == 4 and c > 0,ta.lowest(12),0)
if le11 and close > ema12 and o == 0
    strategy.order("l1",strategy.long,comment="第一单")
if c > 0 and o > 0
    strategy.exit("出场1","l1",limit = 2*s1- d1,stop= d1,qty_percent = 50)
    strategy.exit("出场11","l1",stop= d1)

if le21 and close > ema12 and o == 1
    strategy.order("l2",strategy.long,comment="第二单")
if c > 0 and o == 2
    strategy.exit("出场2","l2",limit = 2*s2- d2,stop= d2,qty_percent = 50)
    strategy.exit("出场21","l2",stop= d2)

if le31 and close > ema12 and o == 2
    strategy.order("l3",strategy.long,comment="第三单")
if c > 0 and o == 3
    strategy.exit("出场3","l3",limit = 2*s3- d3,stop= d3,qty_percent = 50)
    strategy.exit("出场31","l3",stop= d3)

if le41 and close > ema12 and o == 3
    strategy.order("l4",strategy.long,comment="第四单")
if c > 0 and o == 4 
    strategy.exit("出场4","l4",limit = 2*s4- d4,stop= d4,qty_percent = 50)
    strategy.exit("出场41","l4",stop= d4)

if le51 and close > ema12 and o == 4
    strategy.order("l5",strategy.long,comment="第五单")
if c > 0 and o == 5
    strategy.exit("出场5","l5",limit = 2*s5- d5,stop= d5,qty_percent = 50)
    strategy.exit("出场51","l5",stop= d5)
bgcolor(le2?color.red:na)
if c > 0 and ema12 < ema144
    strategy.close_all("跌破均线全部出场")

//做空
es3 = ta.valuewhen(o ==2 and o[1] == 1 and c < 0,bar_index,0)
es4 = ta.valuewhen(o ==3 and o[1] == 2 and c < 0,bar_index,0)
es5 = ta.valuewhen(o ==4 and o[1] == 3 and c < 0,bar_index,0)
se1 = false
se1 := c >= 0 and ema12 < ema144 and ema144 < ema169 and ema169 < ema576 and ema576 < ema676 and high > ema144 and high[1] < ema144 and close < ema169? true :  close > ema169 or ema12 > ema144 ? false : se1[1]
se11 = false
se11 := se1 and bar_index - ta.valuewhen(high > ema144 and high[1] < ema144,bar_index,0) < 12 ? true : false
se2 = false
se2 := c < 0 and o == 1 and o[1] == 1 and ema12 < ema144 and ema144 < ema169 and ema169 < ema576 and ema576 < ema676 and high > ema144 and high[1] < ema144 and close < ema169? true :  close > ema169 or ema12 > ema144 or o < 1? false : se2[1]
se21 = false
se21 := se2 and bar_index - ta.valuewhen(high > ema144 and high[1] < ema144 and o == 1 and o[1]==1,bar_index,0) < 12 ? true : false
se3 = false
se3 := c < 0 and o == 2 and o[1] == 2 and ema12 < ema144 and ema144 < ema169 and ema169 < ema576 and ema576 < ema676 and high > ema144 and high[1] < ema144 and close < ema169 ? true :  close > ema169 or ema12 > ema144 or o < 2? false : se3[1]
se31 = false
se31 := se3 and bar_index - es3 > 50 and bar_index - ta.valuewhen(high > ema144 and high[1] < ema144 and o == 2 and o[1]==2,bar_index,0) < 12 ? true : false
se4 = false
se4 := c < 0 and o == 3 and o[1] == 3 and ema12 < ema144 and ema144 < ema169 and ema169 < ema576 and ema576 < ema676 and high > ema144 and high[1] < ema144 and close < ema169? true :  close > ema169 or ema12 > ema144 or o < 3? false : se4[1]
se41 = false
se41 := se4 and bar_index - es4 > 50 and bar_index - ta.valuewhen(high > ema144 and high[1] < ema144 and o == 3 and o[1]==3,bar_index,0) < 12 ? true : false
se5 = false
se5 := c < 0 and o == 4 and o[1] == 4 and ema12 < ema144 and ema144 < ema169 and ema169 < ema576 and ema576 < ema676 and high > ema144 and high[1] < ema144 and close < ema169 ? true :  close > ema169 or ema12 > ema144 or o < 4? false : se5[1]
se51 = false
se51 := se5 and bar_index - es5 > 50 and bar_index - ta.valuewhen(high > ema144 and high[1] < ema144 and o == 4 and o[1]==4,bar_index,0) < 12 ? true : false
ds1 = ta.valuewhen(o == 1 and o[1] == 0 and c < 0 ,ta.highest(12),0)
ds2 = ta.valuewhen(o == 2 and o[1] == 1 and c < 0,ta.highest(12),0)
ds3 = ta.valuewhen(o == 3 and o[1] == 2 and c < 0,ta.highest(12),0)
ds4 = ta.valuewhen(o == 4 and o[1] == 3 and c < 0,ta.highest(12),0)
ds5 = ta.valuewhen(o == 5 and o[1] == 4 and c < 0,ta.highest(12),0)
if se11 and close < ema12 and o == 0
    strategy.order("s1",strategy.short,comment="第一单")
if c < 0 and o > 0
    strategy.exit("出场1","s1",limit = 2*s1- ds1,stop= ds1,qty_percent = 50)
    strategy.exit("出场11","s1",stop= ds1)

if se21 and close < ema12 and o == 1
    strategy.order("s2",strategy.short,comment="第二单")
if c < 0 and o == 2
    strategy.exit("出场2","s2",limit = 2*s2- ds2,stop= ds2,qty_percent = 50)
    strategy.exit("出场21","s2",stop= ds2)

if se31 and close < ema12 and o == 2
    strategy.order("s3",strategy.short,comment="第三单")
if c < 0 and o == 3
    strategy.exit("出场3","s3",limit = 2*s3- ds3,stop= ds3,qty_percent = 50)
    strategy.exit("出场31","s3",stop= ds3)

if se41 and close < ema12 and o == 3
    strategy.order("s4",strategy.short,comment="第四单")
if c < 0 and o == 4 
    strategy.exit("出场4","s4",limit = 2*s4- ds4,stop= ds4,qty_percent = 50)
    strategy.exit("出场41","s4",stop= ds4)

if se51 and close < ema12 and o == 4
    strategy.order("s5",strategy.short,comment="第五单")
if c < 0 and o == 5
    strategy.exit("出场5","s5",limit = 2*s5- ds5,stop= ds5,qty_percent = 50)
    strategy.exit("出场51","s5",stop= ds5)
bgcolor(se1?color.red:na)
if c < 0 and ema12 > ema144
    strategy.close_all("跌破均线全部出场")
kaiguan = input.bool(true,"均线开关")
plot(ema12,force_overlay=true)
plot(ema144, "EMA144", color=color.new(#008000, 0),force_overlay=true)
plot(ema169, "EMA169", color=color.red,force_overlay=true)
plot(kaiguan?ema576:na,color=color.yellow,force_overlay=true)
plot(kaiguan?ema676:na,color=color.yellow,force_overlay=true)
//plotshape(series=entrySignal,title="买入信号",location=location.belowbar,color=color.new(color.green, 0),style=shape.labelup,text="BUY",textcolor=color.new(color.white, 0))

```

> Detail

https://www.fmz.com/strategy/483943

> Last Modified

2025-02-27 10:20:18
