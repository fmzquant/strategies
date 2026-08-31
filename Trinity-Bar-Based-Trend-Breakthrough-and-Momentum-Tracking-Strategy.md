
> Name

Trinity-Bar-Based-Trend-Breakthrough-and-Momentum-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13baa6b0fbd1e83e469.png)
Based on the provided code, I'll help create an SEO-friendly article analyzing this trading strategy in both Chinese and English.

#### Overview
This strategy is based on Price Action analysis and Bill Williams' bar thirds theory. It analyzes the position relationships of opening and closing prices within the three equal sections of current and previous bars to identify market trend reversal points and continuity, generating trading signals. The strategy relies solely on price action without any technical indicators, eliminating emotional bias through a systematic approach.

#### Strategy Principle
The core logic divides each bar's range into three equal parts and analyzes the position of opening and closing prices within these sections to determine market trends. Specifically:
1. Bar Classification - Categorizes bars based on open/close positions:
   - Bullish Patterns: 1-3(low open high close), 2-3(mid open high close), 3-3(high open high close)
   - Bearish Patterns: 3-1(high open low close), 2-1(mid open low close), 1-1(low open low close)
2. Signal Generation - Confirms trading signals through two consecutive bars:
   - Buy Signal: Previous bar shows any bullish pattern, current bar is 1-3 or 3-3
   - Sell Signal: Previous bar shows any bearish pattern, current bar is 1-1 or 3-1
3. Trade Execution - Automatically executes market orders:
   - On buy signals, closes short positions and opens long
   - On sell signals, closes long positions and opens short

#### Strategy Advantages
1. Pure Price-Driven - Based entirely on price action, avoiding indicator lag
2. Systematic Trading - Executes trades through clear rules, reducing subjective bias
3. Trend Following - Effectively captures significant price movements
4. Risk Control - Improves signal reliability through two-bar analysis
5. Simple and Intuitive - Clear strategy logic, easy to understand and implement

#### Strategy Risks
1. Unsuitable for Ranging Markets - May generate frequent false signals in sideways markets
2. Delayed Entry - Requires bar closure for signal confirmation, potentially missing optimal entry points
3. Insufficient Money Management - Strategy lacks built-in stop-loss/profit mechanisms
4. Market Environment Dependency - May underperform in low liquidity or high volatility conditions
5. Parameter Sensitivity - Bar timeframe selection significantly impacts strategy performance

#### Strategy Optimization Directions
1. Volatility Filtering - Add ATR or similar indicators to dynamically adjust trading frequency
2. Enhanced Risk Control - Design dynamic stop-loss/profit mechanisms based on bar thirds
3. Improved Signal Confirmation - Consider volume and volatility as auxiliary indicators
4. Market Environment Analysis - Develop market state recognition for parameter adaptation
5. Position Management Improvement - Dynamically adjust position sizes based on signal strength

#### Summary
This strategy establishes an effective trend-following system through an innovative bar-thirds approach to price action analysis. While it has limitations, proper optimization and risk control measures can generate stable returns in trending markets. Its core strengths lie in the systematic methodology and deep price action analysis, providing a valuable reference direction for quantitative trading.


> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-17 00:00:00
end: 2025-02-15 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("TrinityBar", overlay=true, initial_capital=100000, 
     default_qty_type=strategy.percent_of_equity, default_qty_value=200)

//─────────────────────────────────────────────────────────────
// Current Bar Thirds Calculations
//─────────────────────────────────────────────────────────────
cur_range      = high - low
cur_lowerThird = low + cur_range / 3
cur_upperThird = high - cur_range / 3

//─────────────────────────────────────────────────────────────
// Previous Bar Thirds Calculations
//─────────────────────────────────────────────────────────────
prev_range      = high[1] - low[1]
prev_lowerThird = low[1] + prev_range / 3
prev_upperThird = high[1] - prev_range / 3

//─────────────────────────────────────────────────────────────
// Define Bullish Bar Types for Current Bar
//─────────────────────────────────────────────────────────────
is_1_3 = (open <= cur_lowerThird) and (close >= cur_upperThird)
is_3_3 = (open >= cur_upperThird) and (close >= cur_upperThird)
is_2_3 = (open > cur_lowerThird) and (open < cur_upperThird) and (close >= cur_upperThird)

//─────────────────────────────────────────────────────────────
// Define Bearish Bar Types for Current Bar
//─────────────────────────────────────────────────────────────
is_3_1 = (open >= cur_upperThird) and (close <= cur_lowerThird)
is_1_1 = (open <= cur_lowerThird) and (close <= cur_lowerThird)
is_2_1 = (open > cur_lowerThird) and (open < cur_upperThird) and (close <= cur_lowerThird)

//─────────────────────────────────────────────────────────────
// Define Bullish Bar Types for Previous Bar
//─────────────────────────────────────────────────────────────
prev_is_1_3 = (open[1] <= prev_lowerThird) and (close[1] >= prev_upperThird)
prev_is_3_3 = (open[1] >= prev_upperThird) and (close[1] >= prev_upperThird)
prev_is_2_3 = (open[1] > prev_lowerThird) and (open[1] < prev_upperThird) and (close[1] >= prev_upperThird)

//─────────────────────────────────────────────────────────────
// Define Bearish Bar Types for Previous Bar
//─────────────────────────────────────────────────────────────
prev_is_3_1 = (open[1] >= prev_upperThird) and (close[1] <= prev_lowerThird)
prev_is_1_1 = (open[1] <= prev_lowerThird) and (close[1] <= prev_lowerThird)
prev_is_2_1 = (open[1] > prev_lowerThird) and (open[1] < prev_upperThird) and (close[1] <= prev_lowerThird)

//─────────────────────────────────────────────────────────────
// Valid Signal Conditions
//─────────────────────────────────────────────────────────────
// Bullish Signal: If the previous bar is any bullish type (2‑3, 3‑3, or 1‑3)
// and the current bar is either a 1‑3 or a 3‑3 bar.
validBuy = (prev_is_2_3 or prev_is_3_3 or prev_is_1_3) and (is_1_3 or is_3_3)

// Bearish Signal: If the previous bar is any bearish type (2‑1, 1‑1, or 3‑1)
// and the current bar is either a 1‑1 or a 3‑1 bar.
validSell = (prev_is_2_1 or prev_is_1_1 or prev_is_3_1) and (is_1_1 or is_3_1)

//─────────────────────────────────────────────────────────────
// Plot Only the Signal Triangles
//─────────────────────────────────────────────────────────────
plotshape(validBuy, title="Valid Buy", style=shape.triangleup, location=location.belowbar, 
     color=color.green, size=size.small, text="B")
plotshape(validSell, title="Valid Sell", style=shape.triangledown, location=location.abovebar, 
     color=color.red, size=size.small, text="S")

//─────────────────────────────────────────────────────────────
// Market Order Execution Based on Signals
//─────────────────────────────────────────────────────────────
if validBuy
    // Close any short positions.
    strategy.close("Short", comment="")
    // If not already long, enter a market long.
    if strategy.position_size <= 0
        strategy.entry("Long", strategy.long, comment="")
        
if validSell
    // Close any long positions.
    strategy.close("Long", comment="")
    // If not already short, enter a market short.
    if strategy.position_size >= 0
        strategy.entry("Short", strategy.short, comment="")

```

> Detail

https://www.fmz.com/strategy/482242

> Last Modified

2025-02-17 10:53:49
