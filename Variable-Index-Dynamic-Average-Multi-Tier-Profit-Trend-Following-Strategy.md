
> Name

Variable-Index-Dynamic-Average-Multi-Tier-Profit-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/bd0db4465d55653388.png)

[trans]
#### 概述
本策略是一个结合了变量指数动态均线(VIDYA)指标与布林带(Bollinger Bands)的趋势跟踪系统,同时集成了多层止盈机制。与传统趋势策略不同,该系统采用了更具适应性的获利方式,通过独特的ATR基准和百分比目标来区分多空仓位。其创新之处在于采用动态多层止盈方法,特别是对于空头交易采用了更激进的百分比乘数,这种灵活性有助于根据市场波动性和趋势强度来优化交易管理和利润分配。

#### 策略原理
策略核心是使用快速和慢速两条VIDYA指标来分析价格趋势,同时考虑市场波动性。VIDYA指标的计算公式为:
平滑因子(α) = 2/(周期+1)
VIDYA(t) = α * k * 价格(t) + (1 - α * k) * VIDYA(t-1)
其中k = |钱德动量振荡器(MO)|/100

布林带作为波动率过滤器:
上轨 = MA + (K * 标准差)
下轨 = MA - (K * 标准差)

入场条件:
- 多头:价格突破慢速VIDYA且快速VIDYA向上趋势,同时价格突破布林带上轨
- 空头:价格跌破慢速VIDYA且快速VIDYA向下趋势,同时价格跌破布林带下轨

多层止盈机制包括:
1. 基于ATR的止盈
2. 基于百分比的止盈
3. 空头交易采用乘数放大止盈比例

#### 策略优势
1. 动态适应性强:VIDYA指标能根据市场波动自动调整,比传统均线更敏感
2. 风险管理完善:多层止盈机制可以在不同价格水平锁定利润
3. 差异化处理:对多空仓位采用不同的止盈策略,更符合市场特性
4. 波动率过滤:布林带的使用可以过滤假突破信号
5. 参数灵活:可根据不同市场条件调整参数

#### 策略风险
1. 震荡市场风险:在横盘市场可能产生虚假信号
2. 滑点影响:多个止盈位可能因滑点导致执行价格偏差
3. 参数依赖:不同市场环境可能需要频繁调整参数
4. 系统复杂性:多层止盈机制增加了策略复杂度
5. 资金管理压力:多个止盈位可能导致仓位管理难度增加

#### 策略优化方向
1. 动态参数调整:可开发自适应参数系统,根据市场条件自动调整
2. 市场环境识别:增加市场环境判断模块,在不同市场条件下使用不同参数
3. 止损优化:可增加动态止损机制,提高风险控制能力
4. 信号过滤:增加成交量等辅助指标,提高信号可靠性
5. 仓位管理:开发更智能的仓位分配算法

#### 总结
该策略通过结合VIDYA指标的动态适应性和布林带的波动率过滤功能,创建了一个全面的趋势跟踪系统。多层止盈机制和差异化的多空处理方式,使其具有良好的盈利能力和风险控制能力。然而,使用者需要注意市场环境的变化,适时调整参数,并建立完善的资金管理制度。策略的进一步优化主要集中在参数自适应、市场环境识别和风险控制等方面。

|| 

#### Overview
This strategy is a trend-following system that combines the Variable Index Dynamic Average (VIDYA) indicator with Bollinger Bands and integrates a multi-tier profit-taking mechanism. Unlike traditional trend strategies, this system employs a more adaptive profit-taking approach, differentiating between long and short positions through unique ATR-based and percentage-based targets. Its innovation lies in the dynamic multi-tier approach to profit-taking, particularly for short trades where more aggressive percentages are applied using a multiplier, allowing flexibility to optimize trade management and profit allocation based on market volatility and trend strength.

#### Strategy Principles
The core of the strategy uses fast and slow VIDYA indicators to analyze price trends while considering market volatility. The VIDYA indicator is calculated as:
Smoothing factor(α) = 2/(Period+1)
VIDYA(t) = α * k * Price(t) + (1 - α * k) * VIDYA(t-1)
Where k = |Chande Momentum Oscillator(MO)|/100

Bollinger Bands as volatility filter:
Upper Band = MA + (K * StdDev)
Lower Band = MA - (K * StdDev)

Entry conditions:
- Long: Price breaks above slow VIDYA with upward fast VIDYA trend and price above upper Bollinger Band
- Short: Price breaks below slow VIDYA with downward fast VIDYA trend and price below lower Bollinger Band

Multi-tier profit-taking mechanism includes:
1. ATR-based take profit
2. Percentage-based take profit
3. Multiplier for short trade profit percentages

#### Strategy Advantages
1. Dynamic Adaptability: VIDYA indicator automatically adjusts to market volatility, more sensitive than traditional moving averages
2. Robust Risk Management: Multi-tier profit-taking mechanism locks in profits at different price levels
3. Differentiated Handling: Different profit-taking strategies for long and short positions align with market characteristics
4. Volatility Filtering: Bollinger Bands help filter false breakout signals
5. Flexible Parameters: Adjustable parameters for different market conditions

#### Strategy Risks
1. Choppy Market Risk: May generate false signals in ranging markets
2. Slippage Impact: Multiple take-profit levels may experience price execution deviation
3. Parameter Dependency: Different market environments may require frequent parameter adjustments
4. System Complexity: Multi-tier profit-taking mechanism increases strategy complexity
5. Position Management Pressure: Multiple take-profit levels may complicate position management

#### Optimization Directions
1. Dynamic Parameter Adjustment: Develop adaptive parameter system for automatic market condition adjustment
2. Market Environment Recognition: Add market condition identification module for parameter switching
3. Stop Loss Optimization: Implement dynamic stop-loss mechanism for improved risk control
4. Signal Filtering: Add volume and other auxiliary indicators for improved signal reliability
5. Position Management: Develop smarter position allocation algorithms

#### Summary
This strategy creates a comprehensive trend-following system by combining VIDYA indicator's dynamic adaptability with Bollinger Bands' volatility filtering. The multi-tier profit-taking mechanism and differentiated long/short handling provide strong profit potential and risk control. However, users need to monitor market environment changes, adjust parameters accordingly, and establish robust money management systems. Further strategy optimization should focus on parameter adaptation, market environment recognition, and risk control enhancement.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-10 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © PresentTrading

// This strategy, "VIDYA ProTrend Multi-Tier Profit," is a trend-following system that utilizes fast and slow VIDYA indicators 
// to identify entry and exit points based on the direction and strength of the trend. 
// It incorporates Bollinger Bands as a volatility filter and features a multi-step take profit mechanism, 
// with adjustable ATR-based and percentage-based profit targets for both long and short positions. 
// The strategy allows for more aggressive take profit settings for short trades, making it adaptable to varying market conditions.

//@version=5
strategy("VIDYA ProTrend Multi-Tier Profit", overlay=true, precision=3, commission_value= 0.1, commission_type=strategy.commission.percent, slippage= 1, currency=currency.USD, default_qty_type = strategy.percent_of_equity, default_qty_value = 10, initial_capital=10000)


// User-defined inputs
tradeDirection = input.string(title="Trading Direction", defval="Both", options=["Long", "Short", "Both"])
fastVidyaLength = input.int(10, title="Fast VIDYA Length", minval=1)
slowVidyaLength = input.int(30, title="Slow VIDYA Length", minval=1)
minSlopeThreshold = input.float(0.05, title="Minimum VIDYA Slope Threshold", step=0.01)

// Bollinger Bands Inputs
bbLength = input.int(20, title="Bollinger Bands Length", minval=1)
bbMultiplier = input.float(1.0, title="Bollinger Bands Multiplier", step=0.1)

// Multi-Step Take Profit Settings
group_tp = "Multi-Step Take Profit"
useMultiStepTP = input.bool(true, title="Enable Multi-Step Take Profit", group=group_tp)
tp_direction = input.string(title="Take Profit Direction", defval="Both", options=["Long", "Short", "Both"], group=group_tp)
atrLengthTP =  input.int(14, title="ATR Length", group=group_tp)


// ATR-based Take Profit Steps
atrMultiplierTP1 = input.float(2.618, title="ATR Multiplier for TP 1", group=group_tp)
atrMultiplierTP2 = input.float(5.0, title="ATR Multiplier for TP 2", group=group_tp)
atrMultiplierTP3 = input.float(10.0, title="ATR Multiplier for TP 3", group=group_tp)

// Short Position Multiplier for Take Profit Percentages
shortTPPercentMultiplier = input.float(1.5, title="Short TP Percent Multiplier", group=group_tp)

// Percentage-based Take Profit Steps (Long)
tp_level_percent1 = input.float(title="Take Profit Level 1 (%)", defval=3.0, group=group_tp)
tp_level_percent2 = input.float(title="Take Profit Level 2 (%)", defval=8.0, group=group_tp)
tp_level_percent3 = input.float(title="Take Profit Level 3 (%)", defval=17.0, group=group_tp)

// Percentage-based Take Profit Allocation (Long)
tp_percent1 = input.float(title="Take Profit Percent 1 (%)", defval=12.0, group=group_tp)
tp_percent2 = input.float(title="Take Profit Percent 2 (%)", defval=8.0, group=group_tp)
tp_percent3 = input.float(title="Take Profit Percent 3 (%)", defval=10.0, group=group_tp)

// ATR-based Take Profit Percent Allocation (Long)
tp_percentATR1 = input.float(title="ATR TP Percent 1 (%)", defval=10.0, group=group_tp)
tp_percentATR2 = input.float(title="ATR TP Percent 2 (%)", defval=10.0, group=group_tp)
tp_percentATR3 = input.float(title="ATR TP Percent 3 (%)", defval=10.0, group=group_tp)

// Short position percentage allocations using the multiplier
tp_percent1_short = tp_percent1 * shortTPPercentMultiplier
tp_percent2_short = tp_percent2 * shortTPPercentMultiplier
tp_percent3_short = tp_percent3 * shortTPPercentMultiplier

tp_percentATR1_short = tp_percentATR1 * shortTPPercentMultiplier
tp_percentATR2_short = tp_percentATR2 * shortTPPercentMultiplier
tp_percentATR3_short = tp_percentATR3 * shortTPPercentMultiplier

// VIDYA Calculation Function
calcVIDYA(src, length) =>
    alpha = 2 / (length + 1)
    momm = ta.change(src)
    m1 = momm >= 0.0 ? momm : 0.0
    m2 = momm < 0.0 ? -momm : 0.0
    sm1 = math.sum(m1, length)
    sm2 = math.sum(m2, length)
    chandeMO = nz(100 * (sm1 - sm2) / (sm1 + sm2))
    k = math.abs(chandeMO) / 100
    var float vidya = na
    vidya := na(vidya[1]) ? src : (alpha * k * src + (1 - alpha * k) * vidya[1])
    vidya

// Calculate VIDYAs
fastVIDYA = calcVIDYA(close, fastVidyaLength)
slowVIDYA = calcVIDYA(close, slowVidyaLength)

// Bollinger Bands Calculation
[bbUpper, bbBasis, bbLower] = ta.bb(close, bbLength, bbMultiplier)

// Manual Slope Calculation (price difference over time)
calcSlope(current, previous, length) =>
    (current - previous) / length

// Slope of fast and slow VIDYA (comparing current value with value 'length' bars ago)
fastSlope = calcSlope(fastVIDYA, fastVIDYA[fastVidyaLength], fastVidyaLength)
slowSlope = calcSlope(slowVIDYA, slowVIDYA[slowVidyaLength], slowVidyaLength)

// Conditions for long entry with Bollinger Bands filter
longCondition = close > slowVIDYA and fastVIDYA > slowSlope and fastSlope > minSlopeThreshold and slowSlope > 1/2*minSlopeThreshold and close > bbUpper

// Conditions for short entry with Bollinger Bands filter
shortCondition = close < slowVIDYA and fastSlope < slowSlope and fastSlope < -minSlopeThreshold and slowSlope < -1/2*minSlopeThreshold and close < bbLower

// Exit conditions (opposite crossovers or flat slopes)
exitLongCondition = fastSlope < -minSlopeThreshold and slowSlope < -1/2*minSlopeThreshold or shortCondition
exitShortCondition = fastSlope > minSlopeThreshold and slowSlope > 1/2*minSlopeThreshold or longCondition

// Entry and Exit logic with trading direction
if (longCondition) and (strategy.position_size == 0) and (tradeDirection == "Long" or tradeDirection == "Both")
    strategy.entry("Long", strategy.long)

if (exitLongCondition) and strategy.position_size > 0 and (tradeDirection == "Long" or tradeDirection == "Both")
    strategy.close("Long")

if (shortCondition) and (strategy.position_size == 0) and (tradeDirection == "Short" or tradeDirection == "Both")
    strategy.entry("Short", strategy.short)

if (exitShortCondition) and strategy.position_size < 0 and (tradeDirection == "Short" or tradeDirection == "Both")
    strategy.close("Short")


if useMultiStepTP
    if strategy.position_size > 0 and (tp_direction == "Long" or tp_direction == "Both")
        // ATR-based Take Profit (Long)
        tp_priceATR1_long = strategy.position_avg_price + atrMultiplierTP1 * ta.atr(atrLengthTP)
        tp_priceATR2_long = strategy.position_avg_price + atrMultiplierTP2 * ta.atr(atrLengthTP)
        tp_priceATR3_long = strategy.position_avg_price + atrMultiplierTP3 * ta.atr(atrLengthTP)
        
        // Percentage-based Take Profit (Long)
        tp_pricePercent1_long = strategy.position_avg_price * (1 + tp_level_percent1 / 100)
        tp_pricePercent2_long = strategy.position_avg_price * (1 + tp_level_percent2 / 100)
        tp_pricePercent3_long = strategy.position_avg_price * (1 + tp_level_percent3 / 100)

        // Execute ATR-based exits for Long
        strategy.exit("TP ATR 1 Long", from_entry="Long", qty_percent=tp_percentATR1, limit=tp_priceATR1_long)
        strategy.exit("TP ATR 2 Long", from_entry="Long", qty_percent=tp_percentATR2, limit=tp_priceATR2_long)
        strategy.exit("TP ATR 3 Long", from_entry="Long", qty_percent=tp_percentATR3, limit=tp_priceATR3_long)
        
        // Execute Percentage-based exits for Long
        strategy.exit("TP Percent 1 Long", from_entry="Long", qty_percent=tp_percent1, limit=tp_pricePercent1_long)
        strategy.exit("TP Percent 2 Long", from_entry="Long", qty_percent=tp_percent2, limit=tp_pricePercent2_long)
        strategy.exit("TP Percent 3 Long", from_entry="Long", qty_percent=tp_percent3, limit=tp_pricePercent3_long)

    if strategy.position_size < 0 and (tp_direction == "Short" or tp_direction == "Both")
        // ATR-based Take Profit (Short) - using the same ATR levels as long
        tp_priceATR1_short = strategy.position_avg_price - atrMultiplierTP1 * ta.atr(atrLengthTP)
        tp_priceATR2_short = strategy.position_avg_price - atrMultiplierTP2 * ta.atr(atrLengthTP)
        tp_priceATR3_short = strategy.position_avg_price - atrMultiplierTP3 * ta.atr(atrLengthTP)
        
        // Percentage-based Take Profit (Short) - using the same levels, but more aggressive percentages
        tp_pricePercent1_short = strategy.position_avg_price * (1 - tp_level_percent1 / 100)
        tp_pricePercent2_short = strategy.position_avg_price * (1 - tp_level_percent2 / 100)
        tp_pricePercent3_short = strategy.position_avg_price * (1 - tp_level_percent3 / 100)

        // Execute ATR-based exits for Short (using the percentage multiplier for short)
        strategy.exit("TP ATR 1 Short", from_entry="Short", qty_percent=tp_percentATR1_short, limit=tp_priceATR1_short)
        strategy.exit("TP ATR 2 Short", from_entry="Short", qty_percent=tp_percentATR2_short, limit=tp_priceATR2_short)
        strategy.exit("TP ATR 3 Short", from_entry="Short", qty_percent=tp_percentATR3_short, limit=tp_priceATR3_short)
        
        // Execute Percentage-based exits for Short
        strategy.exit("TP Percent 1 Short", from_entry="Short", qty_percent=tp_percent1_short, limit=tp_pricePercent1_short)
        strategy.exit("TP Percent 2 Short", from_entry="Short", qty_percent=tp_percent2_short, limit=tp_pricePercent2_short)
        strategy.exit("TP Percent 3 Short", from_entry="Short", qty_percent=tp_percent3_short, limit=tp_pricePercent3_short)
// Plot VIDYAs
plot(fastVIDYA, color=color.green, title="Fast VIDYA")
plot(slowVIDYA, color=color.red, title="Slow VIDYA")

```

> Detail

https://www.fmz.com/strategy/474837

> Last Modified

2024-12-12 14:29:53
