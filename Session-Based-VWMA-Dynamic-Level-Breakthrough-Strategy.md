
> Name

Session-Based-VWMA-Dynamic-Level-Breakthrough-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d853489d23e64e2b4655.png)
![IMG](https://www.fmz.com/upload/asset/2d7ef17bf57f4b0fd6e22.png)




[trans]


#### 概述
交易时段VWMA动态价位上下穿透策略是一种基于日内交易时段的成交量加权移动平均线(VWMA)的量化交易系统。该策略特别适用于1分钟时间框架，通过监测价格与每个交易日重置的VWMA之间的关系生成买卖信号。策略核心逻辑是当价格完全突破VWMA时触发交易信号，具体而言，当蜡烛图的最低价高于VWMA时产生买入信号，当蜡烛图的最高价低于VWMA时产生卖出信号。根据策略描述，该策略的卖出信号表现尤为出色，胜率超过65%，特别适合早盘入场。

#### 策略原理
该策略的核心原理是利用每个交易日重新计算的VWMA作为动态参考线，通过价格与该参考线的相对位置关系来识别潜在的交易机会。策略的详细工作原理如下：

1. **交易时段VWMA计算**：策略使用长度为55的VWMA指标，但与传统VWMA不同，该指标在每个交易日开始时重置计算，确保VWMA更准确地反映当日市场情绪。

2. **信号生成机制**：
   - 买入信号：当蜡烛图的最低价完全高于VWMA且前一根蜡烛不满足此条件时触发
   - 卖出信号：当蜡烛图的最高价完全低于VWMA且前一根蜡烛不满足此条件时触发

3. **交易控制逻辑**：策略实现了一种智能的交易控制机制，防止连续同向信号重复入场，即买入信号后必须有卖出信号才能再次买入，反之亦然。

4. **自动收盘平仓**：策略在每日15:29（印度标准时间）自动平仓所有持仓，确保不持有隔夜仓位，有效规避隔夜风险。

5. **多仓位管理**：策略支持最多10层金字塔式加仓，资金管理采用账户权益的10%进行仓位控制。

#### 策略优势
深入分析代码后，该策略展现出以下显著优势：

1. **时段适应性**：通过在每个交易日重置VWMA计算，策略能更好地适应当日市场条件，不受历史数据过度影响。

2. **明确的入场信号**：策略要求价格完全突破VWMA才触发信号，减少了虚假突破和震荡行情中的误判。

3. **方向性控制**：通过交易控制逻辑，策略避免了在同一方向上的连续入场，要求必须有方向转换才能再次入场，有效降低了频繁交易风险。

4. **风险控制**：每日固定时间自动平仓机制有效规避了隔夜风险，适合日内短线交易者。

5. **高胜率潜力**：根据策略描述，特别是卖出信号表现出色，胜率超过65%，为交易者提供了较高的成功概率。

6. **灵活的仓位管理**：支持金字塔式加仓策略，能够在趋势延续时增加仓位，最大化收益潜力。

#### 策略风险
尽管该策略具有诸多优势，但仍存在以下潜在风险：

1. **时间框架局限性**：策略明确指出最适合1分钟时间框架，在其他时间框架上的表现可能不佳，这限制了策略的应用场景。

2. **买入信号相对薄弱**：策略描述中提到买入信号需要设置固定止盈和止损点，暗示买入信号的可靠性不如卖出信号，这可能导致买入操作的盈利能力受限。

3. **市场条件依赖**：VWMA作为主要指标可能在横盘震荡市场中产生大量虚假信号，策略在强趋势市场中表现可能更佳。

4. **固定时间平仓风险**：固定在15:29平仓可能导致在有利行情中提前退出，错失部分盈利机会。

5. **参数敏感性**：VWMA长度55是一个固定参数，不同市场环境可能需要不同参数设置，固定参数可能无法适应所有市场条件。

风险缓解方法：
- 针对买入信号相对薄弱的问题，建议实施严格的止损和目标盈利设置
- 考虑增加市场环境过滤条件，仅在适合的市场环境中应用策略
- 开发自适应参数调整机制，使VWMA长度能够根据市场变化自动调整

#### 策略优化方向
基于代码分析，该策略可在以下几个方向进行优化：

1. **增加市场环境过滤**：引入波动率或趋势强度指标作为过滤条件，仅在适合的市场环境中生成信号，例如可以通过ATR或ADX指标判断当前市场是否适合该策略。

2. **优化VWMA参数**：实现自适应VWMA长度，根据市场波动性动态调整参数，使策略更好地适应不同市场环境。这可以通过将VWMA长度与市场波动率建立关联来实现。

3. **增强信号确认机制**：引入额外的技术指标或价格模式作为确认条件，提高信号质量。例如，可以结合RSI、MACD等指标进行信号确认。

4. **改进平仓策略**：除了固定时间平仓外，增加基于市场条件的动态平仓规则，如利润回撤、目标达成或技术指标反转。

5. **差异化买卖信号处理**：针对买入和卖出信号的不同表现特点，开发针对性的管理策略，例如对买入信号采用更保守的仓位管理和更严格的止损策略。

6. **资金管理优化**：实现更灵活的资金管理机制，根据信号强度、市场波动性和历史表现动态调整每笔交易的资金比例。

这些优化方向旨在提高策略的稳健性和适应性，同时保持其原有的高胜率特性。

#### 总结
交易时段VWMA动态价位上下穿透策略是一种设计精巧的日内交易系统，通过利用每日重置的VWMA作为动态参考线，结合价格完全突破该参考线的条件来生成交易信号。该策略特别适合1分钟时间框架，其卖出信号表现尤为出色，胜率超过65%。

策略的主要优势在于其对当日市场条件的适应性、明确的入场条件和有效的风险控制机制。然而，策略也存在时间框架局限性、买入信号相对薄弱以及对市场条件的依赖性等潜在风险。

通过增加市场环境过滤、实现自适应参数、增强信号确认机制、改进平仓策略等优化措施，该策略有潜力进一步提高其稳健性和盈利能力。总的来说，这是一个结构清晰、逻辑严密的交易策略，特别适合追求高胜率、控制风险的日内交易者。

对于希望应用此策略的交易者，建议首先在模拟环境中进行充分测试，特别关注买入信号的表现，并根据自身风险承受能力和交易目标调整参数设置和资金管理规则。|| 

#### Overview
The Session-Based VWMA Dynamic Level Breakthrough Strategy is a quantitative trading system based on the Volume Weighted Moving Average (VWMA) reset at the beginning of each trading session. This strategy is specifically designed for 1-minute timeframes, generating buy and sell signals by monitoring the relationship between price and the session-based VWMA. The core logic triggers trading signals when price completely breaks through the VWMA - specifically, a buy signal is generated when the candle's low is above the VWMA, and a sell signal is generated when the candle's high is below the VWMA. According to the strategy description, the sell signals perform particularly well with a win rate exceeding 65%, making it especially suitable for morning entries.

#### Strategy Principles
The core principle of this strategy utilizes a session-based VWMA recalculated at the beginning of each trading day as a dynamic reference line, identifying potential trading opportunities through the relative position of price to this reference line. The detailed working principles are as follows:

1. **Session VWMA Calculation**: The strategy uses a VWMA indicator with a length of 55, but unlike traditional VWMA, this indicator resets at the beginning of each trading day, ensuring that the VWMA more accurately reflects the current day's market sentiment.

2. **Signal Generation Mechanism**:
   - Buy Signal: Triggered when the candle's low is completely above the VWMA and the previous candle did not satisfy this condition
   - Sell Signal: Triggered when the candle's high is completely below the VWMA and the previous candle did not satisfy this condition

3. **Trade Control Logic**: The strategy implements an intelligent trade control mechanism that prevents consecutive same-direction entries, meaning that after a buy signal, a sell signal must occur before another buy can be entered, and vice versa.

4. **Automatic Close at Session End**: The strategy automatically closes all positions at 15:29 (Indian Standard Time) every day, ensuring no overnight positions are held, effectively mitigating overnight risk.

5. **Multiple Position Management**: The strategy supports up to 10 pyramid-style position additions, with position sizing controlled at 10% of account equity.

#### Strategy Advantages
After in-depth code analysis, this strategy demonstrates the following significant advantages:

1. **Session Adaptability**: By resetting the VWMA calculation at the beginning of each trading day, the strategy better adapts to the current day's market conditions without being overly influenced by historical data.

2. **Clear Entry Signals**: The strategy requires price to completely break through the VWMA to trigger a signal, reducing false breakouts and misjudgments in choppy markets.

3. **Directional Control**: Through trade control logic, the strategy avoids consecutive entries in the same direction, requiring a direction change before re-entry, effectively reducing frequent trading risk.

4. **Risk Control**: The daily automatic position closing mechanism effectively avoids overnight risk, suitable for intraday short-term traders.

5. **High Win Rate Potential**: According to the strategy description, especially the sell signals perform excellently with a win rate exceeding 65%, providing traders with a higher probability of success.

6. **Flexible Position Management**: Support for pyramid-style position additions can increase positions as trends continue, maximizing profit potential.

#### Strategy Risks
Despite numerous advantages, the strategy still has the following potential risks:

1. **Timeframe Limitation**: The strategy explicitly states it works best on 1-minute timeframes, which may limit its application scenarios as performance on other timeframes might be suboptimal.

2. **Weaker Buy Signals**: The strategy description mentions that buy signals require fixed take-profit and stop-loss points, suggesting that buy signals' reliability is not as strong as sell signals. This might limit the profitability of buy operations.

3. **Market Condition Dependency**: VWMA as the main indicator may generate numerous false signals in ranging, choppy markets. The strategy may perform better in strong trending markets.

4. **Fixed-Time Closing Risk**: Fixed closing at 15:29 may lead to premature exits during favorable market conditions, missing some profit opportunities.

5. **Parameter Sensitivity**: The VWMA length of 55 is a fixed parameter that might not be optimal for all market conditions. Different market environments may require different parameter settings.

Risk mitigation methods:
- For weaker buy signals, implement strict stop-loss and profit target settings
- Consider adding market environment filters, only applying the strategy in suitable market conditions
- Develop adaptive parameter adjustment mechanisms to automatically adjust the VWMA length based on market changes

#### Strategy Optimization Directions
Based on code analysis, the strategy can be optimized in the following directions:

1. **Add Market Environment Filtering**: Introduce volatility or trend strength indicators as filtering conditions, generating signals only in suitable market environments. For example, ATR or ADX indicators can determine if the current market is suitable for this strategy.

2. **Optimize VWMA Parameters**: Implement adaptive VWMA length, dynamically adjusting parameters based on market volatility for better adaptation to different market environments. This can be achieved by establishing a relationship between VWMA length and market volatility.

3. **Enhance Signal Confirmation**: Introduce additional technical indicators or price patterns as confirmation conditions to improve signal quality. For example, combining with RSI, MACD, or other indicators for signal confirmation.

4. **Improve Exit Strategy**: In addition to fixed-time exits, add dynamic exit rules based on market conditions, such as profit retracement, target achievement, or technical indicator reversals.

5. **Differentiated Buy/Sell Signal Handling**: Develop targeted management strategies for the different performance characteristics of buy and sell signals. For example, adopting more conservative position management and stricter stop-loss strategies for buy signals.

6. **Money Management Optimization**: Implement more flexible money management mechanisms, dynamically adjusting the proportion of funds for each trade based on signal strength, market volatility, and historical performance.

These optimization directions aim to improve the strategy's robustness and adaptability while maintaining its original high win-rate characteristics.

#### Conclusion
The Session-Based VWMA Dynamic Level Breakthrough Strategy is an elegantly designed intraday trading system that generates trading signals by utilizing a daily reset VWMA as a dynamic reference line, combined with conditions of price completely breaking through this reference line. This strategy is particularly suitable for 1-minute timeframes, with sell signals performing exceptionally well, achieving a win rate exceeding 65%.

The strategy's main advantages lie in its adaptability to the current day's market conditions, clear entry criteria, and effective risk control mechanisms. However, the strategy also has potential risks including timeframe limitations, relatively weaker buy signals, and dependency on market conditions.

By adding market environment filtering, implementing adaptive parameters, enhancing signal confirmation mechanisms, improving exit strategies, and other optimization measures, this strategy has the potential to further improve its robustness and profitability. Overall, this is a clearly structured, logically rigorous trading strategy, particularly suitable for intraday traders seeking high win rates and risk control.

For traders wishing to apply this strategy, it is recommended to first conduct thorough testing in a simulated environment, paying special attention to the performance of buy signals, and adjusting parameter settings and money management rules according to personal risk tolerance and trading objectives.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-29 00:00:00
end: 2025-02-26 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("SVWMA Lx", overlay=true, initial_capital=100000, 
     default_qty_type=strategy.percent_of_equity, default_qty_value=10, pyramiding=10, calc_on_every_tick=true)

//──────────────────────────────
// Session VWMA Inputs
//──────────────────────────────
vwmaLen   = input.int(55, title="VWMA Length", inline="VWMA", group="Session VWMA")
vwmaColor = input.color(color.orange, title="VWMA Color", inline="VWMA", group="Session VWMA", tooltip="VWMA resets at the start of each session (at the opening of the day).")

//──────────────────────────────
// Session VWMA Calculation Function
//──────────────────────────────
day_vwma(_start, s, l) =>
    bs_nd = ta.barssince(_start)
    v_len = math.max(1, bs_nd < l ? bs_nd : l)
    ta.vwma(s, v_len)

//──────────────────────────────
// Determine Session Start
//──────────────────────────────
newSession = ta.change(time("D")) != 0

//──────────────────────────────
// Compute Session VWMA
//──────────────────────────────
vwmaValue = day_vwma(newSession, close, vwmaLen)
plot(vwmaValue, color=vwmaColor, title="Session VWMA")

//──────────────────────────────
// Define Signal Conditions (only on transition)
//──────────────────────────────
bullCond = low > vwmaValue      // Bullish: candle low above VWMA
bearCond = high < vwmaValue     // Bearish: candle high below VWMA

// Trigger signal only on the bar where the condition first becomes true
bullSignal = bullCond and not bullCond[1]
bearSignal = bearCond and not bearCond[1]

//──────────────────────────────
// **Exit Condition at 15:29 IST**
//──────────────────────────────
sessionEnd = hour == 15 and minute == 29

// Exit all positions at 15:29 IST
if sessionEnd
    strategy.close_all(comment="Closing all positions at session end")

//──────────────────────────────
// **Trade Control Logic** (Prevents consecutive same-side signals)
//──────────────────────────────
var bool lastTradeWasBuy = false  // Track last trade direction **Reset Direction At Session End**
var bool lastTradeWasSell = false // Track last trade direction **Reset Direction At Session End**
// Reset at new session
if newSession
    lastTradeWasBuy := true
    lastTradeWasSell := true

//──────────────────────────────
// **Position Management: Entry & Labels**
//──────────────────────────────
if bullSignal and not lastTradeWasBuy  //
    if strategy.position_size < 0
        strategy.close("Short", comment="Exit Short on Bull Signal")
        strategy.entry("Long", strategy.long, comment="Enter Long: Buy Call & Sell Put at ATM")
    else
        strategy.entry("Long", strategy.long, comment="Add Long: Buy Call & Sell Put at ATM")

    // Add BUY Label above entry candle
    label.new(x=bar_index, y=low - ta.atr(5) * 0.5, text="BUY", color=color.green, textcolor=color.white, size=size.small,  style=label.style_label_up, xloc=xloc.bar_index)

    lastTradeWasBuy := true  // Mark that the last trade was a Buy

if bearSignal and lastTradeWasBuy  //
    if strategy.position_size < 0
        strategy.close("Long", comment="Exit Long on Bear Signal")
        strategy.entry("Short", strategy.short, comment="Enter Short: Buy Put & Sell Call at ATM")
    else
        strategy.entry("Short", strategy.short, comment="Add Short: Buy Put & Sell Call at ATM")

    // Add SELL Label below candle 
    label.new(x=bar_index, y=high + ta.atr(5) * 0.5,  text="SELL", color=color.red, textcolor=color.white, size=size.small, style=label.style_label_down, xloc=xloc.bar_index)

    lastTradeWasBuy := false  // Mark that the last trade was a Sell

//──────────────────────────────
// **Updated Alert Conditions**
//──────────────────────────────
alertcondition(bullSignal and not lastTradeWasBuy, 
     title="Long Entry Alert", 
     message="Bullish signal: BUY CALL & SELL PUT at ATM. Entry allowed.")

alertcondition(bearSignal and lastTradeWasBuy, 
     title="Short Entry Alert", 
     message="Bearish signal: BUY PUT & SELL CALL at ATM. Entry allowed.")

```

> Detail

https://www.fmz.com/strategy/484104

> Last Modified

2025-02-28 10:22:57
