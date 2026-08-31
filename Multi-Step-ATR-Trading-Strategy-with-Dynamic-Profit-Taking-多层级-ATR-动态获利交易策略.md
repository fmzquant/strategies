
> Name

Multi-Step-ATR-Trading-Strategy-with-Dynamic-Profit-Taking-多层级-ATR-动态获利交易策略

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1423d06f720beb8e5dd.png)


#### Overview
This is a multi-layered trading strategy that integrates adaptive Average True Range (ATR) calculations with momentum-based trend detection. The strategy's most distinctive feature is its unique 7-step profit-taking mechanism, which combines four ATR-based exit levels and three fixed percentage levels. This hybrid approach enables traders to dynamically adjust to market volatility while systematically capturing profits in both long and short market positions. The strategy provides a comprehensive trading solution through the combination of dynamic ATR calculations, trend strength detection, and multiple profit-taking mechanisms.

#### Strategy Principles
The strategy operates through several key components:
1. Enhanced True Range Calculation: Measures market volatility by considering the most significant price movements.
2. Momentum Factor Integration: Adjusts ATR based on recent price movements for better adaptability.
3. Adaptive ATR Calculation: Modifies traditional ATR based on momentum factor for increased sensitivity during volatile periods.
4. Trend Strength Quantification: Evaluates trend strength through sophisticated algorithms.
5. Seven-Step Profit Mechanism: Includes four ATR-based exit levels and three fixed percentage levels.

#### Strategy Advantages
1. High Adaptability: Adapts to different market conditions through dynamic ATR calculations.
2. Comprehensive Risk Management: Multi-layered profit-taking mechanism provides systematic risk control.
3. High Flexibility: Works equally effectively in both long and short markets.
4. Adjustable Parameters: Offers multiple customizable parameters to suit different trading styles.
5. Systematic Execution: Clear entry and exit rules reduce emotional trading.

#### Strategy Risks
1. Parameter Sensitivity: Improper parameter settings may lead to overtrading or missed opportunities.
2. Market Condition Dependency: May underperform in highly volatile or ranging markets.
3. Complexity Risk: Multi-layered profit-taking mechanism may increase execution difficulty.
4. Slippage Impact: Multiple profit points may be significantly affected by slippage.
5. Capital Requirements: Requires sufficient capital to execute multi-layered profit strategy.

#### Strategy Optimization Directions
1. Dynamic Parameter Adjustment: Automatically adjust parameters based on market conditions.
2. Market Environment Filtering: Add market environment identification mechanism.
3. Risk Management Enhancement: Introduce dynamic stop-loss mechanism.
4. Execution Optimization: Simplify profit-taking mechanism to reduce slippage impact.
5. Backtesting Framework Improvement: Include more realistic trading factors.

#### Summary
This strategy provides traders with a comprehensive trading system by combining adaptive ATR and multi-layered profit-taking mechanisms. Its strength lies in its ability to adapt to different market conditions while managing risk through a systematic approach. While there are some potential risks, the strategy can become an effective trading tool through proper optimization and risk management. Its innovative multi-layered profit-taking mechanism is particularly suitable for traders seeking to maximize profits while maintaining risk control.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-04 00:00:00
end: 2024-12-04 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © PresentTrading

// The SuperATR 7-Step Profit Strategy is a multi-layered trading strategy that combines adaptive ATR and momentum-based trend detection 
// with a sophisticated 7-step take-profit mechanism. This approach utilizes four ATR-based exit levels and three fixed percentage levels, 
// enabling flexible and dynamic profit-taking in both long and short market positions.

//@version=5
strategy("SuperATR 7-Step Profit - Strategy [presentTrading] ", overlay=true, precision=3, commission_value= 0.1, commission_type=strategy.commission.percent, slippage= 1, currency=currency.USD, default_qty_type = strategy.percent_of_equity, default_qty_value = 10, initial_capital=10000)

// ————————
// User Inputs
// ————————
short_period = input.int(3, minval=1, title="Short Period")
long_period = input.int(7, minval=1, title="Long Period")
momentum_period = input.int(7, minval=1, title="Momentum Period")
atr_sma_period = input.int(7, minval=1, title="ATR SMA Period for Confirmation")
trend_strength_threshold = input.float(1.618, minval=0.0, title="Trend Strength Threshold", step=0.1)

// ————————
// Take Profit Inputs
// ————————
useMultiStepTP = input.bool(true, title="Enable Multi-Step Take Profit")

// ATR-based Take Profit Inputs
atrLengthTP = input.int(14, minval=1, title="ATR Length for Take Profit")
atrMultiplierTP1 = input.float(2.618, minval=0.1, title="ATR Multiplier for TP Level 1")
atrMultiplierTP2 = input.float(5.0, minval=0.1, title="ATR Multiplier for TP Level 2")
atrMultiplierTP3 = input.float(10.0, minval=0.1, title="ATR Multiplier for TP Level 3")
atrMultiplierTP4 = input.float(13.82, minval=0.1, title="ATR Multiplier for TP Level 4")

// Fixed Percentage Take Profit Inputs
tp_level_percent1 = input.float(3.0, minval=0.1, title="Fixed TP Level 1 (%)")
tp_level_percent2 = input.float(8.0, minval=0.1, title="Fixed TP Level 2 (%)")
tp_level_percent3 = input.float(17.0, minval=0.1, title="Fixed TP Level 3 (%)")

// Take Profit Percentages for Each Level
tp_percent_atr = input.float(10.0, minval=0.1, maxval=100, title="Percentage to Exit at Each ATR TP Level")
tp_percent_fixed = input.float(10.0, minval=0.1, maxval=100, title="Percentage to Exit at Each Fixed TP Level")


// —————————————
// Helper Functions
// —————————————

// Function to calculate True Range with enhanced volatility detection
calculate_true_range() =>
    prev_close = close[1]
    tr1 = high - low
    tr2 = math.abs(high - prev_close)
    tr3 = math.abs(low - prev_close)
    true_range = math.max(tr1, tr2, tr3)
    true_range

// ———————————————
// Indicator Calculations
// ———————————————

// Calculate True Range
true_range = calculate_true_range()

// Calculate Momentum Factor
momentum = close - close[momentum_period]
stdev_close = ta.stdev(close, momentum_period)
normalized_momentum = stdev_close != 0 ? (momentum / stdev_close) : 0
momentum_factor = math.abs(normalized_momentum)

// Calculate Short and Long ATRs
short_atr = ta.sma(true_range, short_period)
long_atr = ta.sma(true_range, long_period)

// Calculate Adaptive ATR
adaptive_atr = (short_atr * momentum_factor + long_atr) / (1 + momentum_factor)

// Calculate Trend Strength
price_change = close - close[momentum_period]
atr_multiple = adaptive_atr != 0 ? (price_change / adaptive_atr) : 0
trend_strength = ta.sma(atr_multiple, momentum_period)

// Calculate Moving Averages
short_ma = ta.sma(close, short_period)
long_ma = ta.sma(close, long_period)

// Determine Trend Signal
trend_signal = (short_ma > long_ma and trend_strength > trend_strength_threshold) ? 1 :
               (short_ma < long_ma and trend_strength < -trend_strength_threshold) ? -1 : 0

// Calculate Adaptive ATR SMA for Confirmation
adaptive_atr_sma = ta.sma(adaptive_atr, atr_sma_period)

// Determine if Trend is Confirmed with Price Action
trend_confirmed = (trend_signal == 1 and close > short_ma and adaptive_atr > adaptive_atr_sma) or (trend_signal == -1 and close < short_ma and adaptive_atr > adaptive_atr_sma)

// —————————————
// Trading Logic
// —————————————

// Entry Conditions
long_entry = trend_confirmed and trend_signal == 1
short_entry = trend_confirmed and trend_signal == -1

// Exit Conditions
long_exit = strategy.position_size > 0 and short_entry
short_exit = strategy.position_size < 0 and long_entry



// Execute Long Trades
if long_entry
    strategy.entry("Long Entry", strategy.long)
if long_exit
    strategy.close("Long Entry")

// Execute Short Trades
if short_entry
    strategy.entry("Short Entry", strategy.short)
if short_exit
    strategy.close("Short Entry")

// ————————————————
// Multi-Step Take Profit Logic
// ————————————————

if useMultiStepTP
    // Calculate ATR for Take Profit Levels
    atrValueTP = ta.atr(atrLengthTP)

    // Long Position Take Profit Levels
    if strategy.position_size > 0
        // ATR-based Take Profit Prices
        tp_priceATR1_long = strategy.position_avg_price + atrMultiplierTP1 * atrValueTP
        tp_priceATR2_long = strategy.position_avg_price + atrMultiplierTP2 * atrValueTP
        tp_priceATR3_long = strategy.position_avg_price + atrMultiplierTP3 * atrValueTP
        tp_priceATR4_long = strategy.position_avg_price + atrMultiplierTP4 * atrValueTP

        // Fixed Percentage Take Profit Prices
        tp_pricePercent1_long = strategy.position_avg_price * (1 + tp_level_percent1 / 100)
        tp_pricePercent2_long = strategy.position_avg_price * (1 + tp_level_percent2 / 100)
        tp_pricePercent3_long = strategy.position_avg_price * (1 + tp_level_percent3 / 100)

        // Set ATR-based Take Profit Exits
        strategy.exit("TP ATR 1 Long", from_entry="Long Entry", qty_percent=tp_percent_atr, limit=tp_priceATR1_long)
        strategy.exit("TP ATR 2 Long", from_entry="Long Entry", qty_percent=tp_percent_atr, limit=tp_priceATR2_long)
        strategy.exit("TP ATR 3 Long", from_entry="Long Entry", qty_percent=tp_percent_atr, limit=tp_priceATR3_long)
        strategy.exit("TP ATR 4 Long", from_entry="Long Entry", qty_percent=tp_percent_atr, limit=tp_priceATR4_long)

        // Set Fixed Percentage Take Profit Exits
        strategy.exit("TP Percent 1 Long", from_entry="Long Entry", qty_percent=tp_percent_fixed, limit=tp_pricePercent1_long)
        strategy.exit("TP Percent 2 Long", from_entry="Long Entry", qty_percent=tp_percent_fixed, limit=tp_pricePercent2_long)
        strategy.exit("TP Percent 3 Long", from_entry="Long Entry", qty_percent=tp_percent_fixed, limit=tp_pricePercent3_long)

    // Short Position Take Profit Levels
    if strategy.position_size < 0
        // ATR-based Take Profit Prices
        tp_priceATR1_short = strategy.position_avg_price - atrMultiplierTP1 * atrValueTP
        tp_priceATR2_short = strategy.position_avg_price - atrMultiplierTP2 * atrValueTP
        tp_priceATR3_short = strategy.position_avg_price - atrMultiplierTP3 * atrValueTP
        tp_priceATR4_short = strategy.position_avg_price - atrMultiplierTP4 * atrValueTP

        // Fixed Percentage Take Profit Prices
        tp_pricePercent1_short = strategy.position_avg_price * (1 - tp_level_percent1 / 100)
        tp_pricePercent2_short = strategy.position_avg_price * (1 - tp_level_percent2 / 100)
        tp_pricePercent3_short = strategy.position_avg_price * (1 - tp_level_percent3 / 100)

        // Set ATR-based Take Profit Exits
        strategy.exit("TP ATR 1 Short", from_entry="Short Entry", qty_percent=tp_percent_atr, limit=tp_priceATR1_short)
        strategy.exit("TP ATR 2 Short", from_entry="Short Entry", qty_percent=tp_percent_atr, limit=tp_priceATR2_short)
        strategy.exit("TP ATR 3 Short", from_entry="Short Entry", qty_percent=tp_percent_atr, limit=tp_priceATR3_short)
        strategy.exit("TP ATR 4 Short", from_entry="Short Entry", qty_percent=tp_percent_atr, limit=tp_priceATR4_short)

        // Set Fixed Percentage Take Profit Exits
        strategy.exit("TP Percent 1 Short", from_entry="Short Entry", qty_percent=tp_percent_fixed, limit=tp_pricePercent1_short)
        strategy.exit("TP Percent 2 Short", from_entry="Short Entry", qty_percent=tp_percent_fixed, limit=tp_pricePercent2_short)
        strategy.exit("TP Percent 3 Short", from_entry="Short Entry", qty_percent=tp_percent_fixed, limit=tp_pricePercent3_short)


// ——————————
// Plotting
// ——————————

plot(short_ma, color=color.blue, title="Short MA")
plot(long_ma, color=color.orange, title="Long MA")

// Plot Buy and Sell Signals
//plotshape(long_entry, title="Long Entry", style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small, text="Buy")
//plotshape(short_entry, title="Short Entry", style=shape.triangledown, location=location.abovebar, color=color.red, size=size.small, text="Sell")

// Optional: Plot Trend Strength for analysis
// Uncomment the lines below to display Trend Strength on a separate chart pane
// plot(trend_strength, title="Trend Strength", color=color.gray)
// hline(trend_strength_threshold, title="Trend Strength Threshold", color=color.gray, linestyle=hline.style_dashed)
// hline(-trend_strength_threshold, title="Trend Strength Threshold", color=color.gray, linestyle=hline.style_dashed)


```

> Detail

https://www.fmz.com/strategy/474064

> Last Modified

2024-12-05 16:49:57
