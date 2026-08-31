
> Name

Trend-Following-Trading-Strategy-Based-on-Granville-and-MACD-Multiple-Signal-Confirmation

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d7f22c9b08bcf18bde10.png)
![IMG](https://www.fmz.com/upload/asset/2d8fcf3cccf766a1a1653.png)



[trans]
#### 概述
本策略是一个结合了Granville趋势反转理论与MACD指标的多重信号确认交易系统。策略的核心思想是通过价格与均线的关系判断潜在的趋势反转,并使用MACD指标的多重信号验证来确保交易的可靠性。这种方法不仅能够有效地识别趋势的起点,还能通过多重确认机制来降低虚假信号的风险。

#### 策略原理
策略的执行流程分为四个关键步骤：
1. Granville反转信号确认:监测价格是否从EMA均线下方突破到上方,这表明可能出现趋势反转。
2. MACD首次金叉确认:在Granville反转信号出现后,等待MACD指标出现金叉,这是趋势转向的第二重确认。
3. MACD突破验证:确认MACD线突破首次金叉时的高点,这表明上升动能在持续增强。
4. MACD二次回踩:等待MACD在突破后回踩并再次上穿信号线,这是最终的入场信号。

止盈止损设置采用了基于反转K线波幅的动态调整方法,将止损设置在反转K线低点,止盈设置为反转K线波幅的1.618倍,这符合斐波那契扩展原理。

#### 策略优势
1. 多重确认机制:通过结合价格行为、趋势指标和动量指标,大大降低了虚假信号的风险。
2. 动态风险管理:基于市场实际波动设置止盈止损,使风险管理更具适应性。
3. 趋势持续性验证:通过MACD的多重信号确认,提高了捕捉持续性趋势的准确度。
4. 自适应性强:策略参数可根据不同市场条件和时间周期进行优化调整。

#### 策略风险
1. 信号滞后性:多重确认机制可能导致入场时机相对滞后,影响部分潜在收益。
2. 区间市场表现:在横盘整理市场中,频繁的假突破可能导致连续止损。
3. 过度依赖技术指标:在市场情绪剧烈波动时,纯技术分析可能失效。
4. 参数敏感性:不同市场环境下可能需要频繁调整参数以保持策略有效性。

#### 策略优化方向
1. 市场环境分类:引入波动率指标,在不同市场环境下使用不同的参数配置。
2. 入场时机优化:可以考虑在MACD二次回踩时增加成交量确认,提高信号可靠性。
3. 止盈止损动态调整:可以根据市场波动率动态调整止盈止损倍数。
4. 增加市场情绪因子:结合市场情绪指标,在极端情绪时期调整策略激进程度。

#### 总结
该策略通过结合经典的技术分析理论和现代量化交易方法,构建了一个相对完整的交易系统。多重信号确认机制提供了较好的交易可靠性,动态的风险管理方法也使策略具有良好的适应性。虽然存在一定的滞后性问题,但通过持续优化和参数调整,策略仍具有较好的实用价值和发展潜力。 ||


#### Overview
This strategy combines Granville's trend reversal theory with MACD indicator for multiple signal confirmation. The core concept involves identifying potential trend reversals through price-moving average relationships and validating trades using multiple MACD signals. This approach effectively identifies trend initiation points while reducing false signal risks through multiple confirmation mechanisms.

#### Strategy Principles
The strategy execution follows four key steps:
1. Granville Reversal Signal: Monitors price crossing above EMA from below, indicating potential trend reversal.
2. Initial MACD Golden Cross: Waits for MACD golden cross after Granville reversal signal as secondary trend confirmation.
3. MACD Breakout Verification: Confirms MACD line breaks above initial golden cross level, indicating continued momentum.
4. MACD Retest: Waits for MACD to retest and cross signal line again for final entry signal.

Stop loss and take profit levels are dynamically adjusted based on reversal candlestick range, with stop loss at reversal bar low and take profit at 1.618 times the reversal bar range, following Fibonacci extension principles.

#### Strategy Advantages
1. Multiple Confirmation Mechanism: Combines price action, trend indicators, and momentum indicators to significantly reduce false signals.
2. Dynamic Risk Management: Sets stop loss and take profit based on actual market volatility for adaptive risk management.
3. Trend Continuation Verification: Improves accuracy in capturing sustained trends through multiple MACD confirmations.
4. High Adaptability: Strategy parameters can be optimized for different market conditions and timeframes.

#### Strategy Risks
1. Signal Lag: Multiple confirmation requirements may delay entry points, affecting potential returns.
2. Range-bound Market Performance: Frequent false breakouts in sideways markets may lead to consecutive losses.
3. Over-reliance on Technical Indicators: Pure technical analysis may fail during extreme market sentiment shifts.
4. Parameter Sensitivity: Different market environments may require frequent parameter adjustments to maintain strategy effectiveness.

#### Strategy Optimization Directions
1. Market Environment Classification: Introduce volatility indicators for different parameter configurations in various market conditions.
2. Entry Timing Optimization: Consider adding volume confirmation during MACD retest to improve signal reliability.
3. Dynamic Stop Loss/Take Profit Adjustment: Adjust multipliers based on market volatility.
4. Market Sentiment Integration: Incorporate sentiment indicators to adjust strategy aggressiveness during extreme sentiment periods.

#### Summary
This strategy builds a comprehensive trading system by combining classical technical analysis theories with modern quantitative trading methods. The multiple signal confirmation mechanism provides reliable trade signals, while dynamic risk management methods ensure strategy adaptability. Despite some lag issues, continuous optimization and parameter adjustment give the strategy practical value and development potential.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2025-02-18 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Granville + MACD Strategy", overlay=true, initial_capital=100000, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// ■ Parameter Settings
emaPeriod = input.int(20, "EMA Period for Granville", minval=1)
fastLen   = input.int(12, "MACD Fast Period", minval=1)
slowLen   = input.int(26, "MACD Slow Period", minval=1)
signalLen = input.int(9,  "MACD Signal Period", minval=1)

// ■ Calculate EMA (for Granville reversal detection)
ema_val = ta.ema(close, emaPeriod)

// ■ Granville Reversal Detection (e.g., price crosses above EMA from below)
granvilleReversal = ta.crossover(close, ema_val)

// ■ Calculate MACD
[macdLine, signalLine, _] = ta.macd(close, fastLen, slowLen, signalLen)

// ■ State management variables (to manage state transitions)
var bool   granvilleDone   = false    // Reversal bar confirmed flag
var float  granvilleLow    = na       // Low of the reversal bar (used for SL)
var float  granvilleRange  = na       // Range of the reversal bar (used for TP calculation)
var bool   macdGC_done     = false    // First MACD Golden Cross confirmed
var int    goldenCrossBar  = na       // Bar index of the first MACD Golden Cross
var float  initialMacdHigh = na       // MACD value at the Golden Cross (used for break detection)
var bool   breakoutDone    = false    // MACD line breaks the initial Golden Cross MACD value

// ■ (1) Granville Reversal Detection
if granvilleReversal
    granvilleDone  := true
    granvilleLow   := low             // Low of the reversal bar (SL)
    granvilleRange := high - low      // Range of the reversal bar (used for TP calculation)
    // Reset MACD-related states
    macdGC_done     := false
    breakoutDone    := false
    initialMacdHigh := na
    goldenCrossBar  := na

// ■ (2) MACD Golden Cross (first signal) detection
if granvilleDone and (not macdGC_done) and ta.crossover(macdLine, signalLine)
    macdGC_done    := true
    goldenCrossBar := bar_index
    initialMacdHigh:= macdLine

// ■ (3) Check if MACD line breaks the initial MACD value at the Golden Cross
if macdGC_done and (not breakoutDone) and (macdLine > initialMacdHigh)
    breakoutDone := true

// ■ (4) When MACD retests and crosses above the signal line again, it's the entry timing
// ※ Check for a crossover after the first Golden Cross bar
entryCondition = granvilleDone and macdGC_done and breakoutDone and (bar_index > goldenCrossBar) and ta.crossover(macdLine, signalLine)

// ■ TP and SL settings at entry
if entryCondition
    entryPrice = close
    tpPrice = entryPrice + granvilleRange * 1.618
    slPrice = granvilleLow
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit Long", from_entry="Long", stop=slPrice, limit=tpPrice)
    // Reset states after entry (for the next entry)
    granvilleDone   := false
    macdGC_done     := false
    breakoutDone    := false
    initialMacdHigh := na
    goldenCrossBar  := na

// ■ Plotting (for reference)
// Display the EMA on the price chart (with fixed title)
plot(ema_val, color=color.orange, title="EMA (20)")

// Plot MACD and Signal in a separate window (with fixed titles)
plot(macdLine, color=color.blue, title="MACD")
plot(signalLine, color=color.red, title="Signal")

```

> Detail

https://www.fmz.com/strategy/482803

> Last Modified

2025-02-27 17:46:54
