
> Name

Session-Based-VWMA-Dynamic-Level-Breakthrough-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d853489d23e64e2b4655.png)
![IMG](https://www.fmz.com/upload/asset/2d7ef17bf57f4b0fd6e22.png)

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

For traders wishing to apply this strategy, it is recommended to first conduct thorough testing in a simulated environment, paying special attention to the performance of buy signals, and adjusting parameter settings and money management rules according to personal risk tolerance and trading objectives.


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
