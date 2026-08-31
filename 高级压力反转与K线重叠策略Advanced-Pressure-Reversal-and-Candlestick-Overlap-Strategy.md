
> Name

高级压力反转与K线重叠策略Advanced-Pressure-Reversal-and-Candlestick-Overlap-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/146c011deeacd3d635e.png)


#### Overview
This is a quantitative trading strategy based on market pressure and candlestick overlap patterns. The strategy identifies potential market reversal points by analyzing trading volume, candlestick patterns, and price overlap relationships, combined with take-profit conditions for automated trading. The strategy uses fixed position sizing and sets a 20% take-profit target.

#### Strategy Principle
The core logic of the strategy incorporates two main dimensions: market pressure and candlestick overlap. For market pressure, the strategy determines buying and selling pressure by comparing current trading volume with the 20-period volume moving average. When the volume of a green candle (bullish) exceeds the moving average, it indicates buying pressure; when the volume of a red candle (bearish) exceeds the moving average, it indicates selling pressure. For candlestick overlap, the strategy focuses on the overlap relationship between adjacent candles. When a green candle overlaps with the previous red candle, it's considered a potential long signal; when a red candle overlaps with the previous green candle, it's considered a potential short signal.

#### Strategy Advantages
1. Multi-dimensional signal verification: Combines volume, candlestick patterns, and price overlap for signal confirmation, improving trading reliability.
2. Fixed take-profit target: Sets a clear 20% take-profit target, helping control risk and lock in profits.
3. High automation level: Strategy executes completely automatically without manual intervention.
4. Clear position management: Uses fixed position sizing for trading, facilitating risk control.
5. Logical signal construction: Identifies market pressure through comparison of current volume with moving average, maintaining rigorous logic.

#### Strategy Risks
1. Market volatility risk: In highly volatile markets, take-profit targets may be difficult to achieve or trigger too quickly.
2. False breakout risk: Candlestick overlap patterns may produce false breakouts, leading to incorrect signals.
3. Slippage risk: Actual trading may experience entry price deviations due to slippage.
4. Liquidity risk: In markets with insufficient liquidity, trades may be difficult to execute at desired prices.
5. Fixed take-profit limitation: The uniform 20% take-profit target may not suit all market conditions.

#### Strategy Optimization Directions
1. Dynamic take-profit: Adjust take-profit targets based on market volatility for better adaptability.
2. Signal filtering: Add trend filtering conditions, such as moving average systems, to reduce false breakouts.
3. Position optimization: Introduce dynamic position management to adjust trading volume based on market volatility.
4. Time filtering: Add trading time window restrictions to avoid unfavorable trading periods.
5. Indicator combination: Consider combining other technical indicators, such as RSI or MACD, to increase signal reliability.

#### Summary
The strategy captures market reversal opportunities by combining market pressure and candlestick overlap patterns, demonstrating solid theoretical foundation and practical feasibility. Its strengths lie in multi-dimensional signal verification and clear risk control, though it faces certain market risks and has room for optimization. Through further optimization and refinement, the strategy shows potential for improved performance in actual trading.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-06 00:00:00
end: 2025-01-04 08:00:00
period: 3h
basePeriod: 3h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Pressure Reversal & Candle Overlap", overlay=true, default_qty_type=strategy.fixed, default_qty_value=0.1)
 
// Parameters
take_profit_percent = 20  // Take Profit Percentage
qty = 0.1  // Quantity to trade (BTC)
 
// Candle Definitions
green_candle = close > open
red_candle = close < open
current_body = math.abs(close - open)
 
// Previous Candle Data
prev_close = ta.valuewhen(green_candle or red_candle, close, 1)
prev_open = ta.valuewhen(green_candle or red_candle, open, 1)
 
// Check Candle Overlaps
green_overlaps_red = green_candle and close >= prev_open and open <= prev_close
red_overlaps_green = red_candle and close <= prev_open and open >= prev_close
 
// Define Buying and Selling Pressure
buying_pressure = green_candle and volume > ta.sma(volume, 20)
selling_pressure = red_candle and volume > ta.sma(volume, 20)
 
// Entry Conditions
long_entry_pressure = selling_pressure
long_entry_overlap = green_overlaps_red
short_entry_pressure = buying_pressure
short_entry_overlap = red_overlaps_green
 
// Calculate Take Profit Levels
take_profit_level_long = close * (1 + 20 / 100)
take_profit_level_short = close * (1 - 20 / 100)
 
// Strategy Logic
if (long_entry_pressure or long_entry_overlap)
    strategy.entry("Buy Long", strategy.long, qty=qty)
    strategy.exit("TP Long", "Buy Long", limit=take_profit_level_long)
 
if (short_entry_pressure or short_entry_overlap)
    strategy.entry("Sell Short", strategy.short, qty=qty)
    strategy.exit("TP Short", "Sell Short", limit=take_profit_level_short)
```

> Detail

https://www.fmz.com/strategy/477557

> Last Modified

2025-01-06 13:54:56
