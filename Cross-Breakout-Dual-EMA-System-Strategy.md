
> Name

Cross-Breakout-Dual-EMA-System-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8531b2285e1fb72b882.png)
![IMG](https://www.fmz.com/upload/asset/2d91eebd723f7164e797d.png)





#### Overview
The Cross-Breakout Dual EMA System Strategy is a technical analysis approach based on the 32-period Exponential Moving Average (EMA) of highs and lows. The core concept involves identifying price crossovers with the 32-period EMA and special "no-touch candle" formations to confirm trend direction, entering trades after key price breakout confirmations. Specifically designed for the 5-minute timeframe, this strategy employs strict entry conditions and clear exit rules, enabling traders to capture opportunities from short-term trend changes.

#### Strategy Principles
The strategy operates based on the following key steps:

1. Calculate the 32-period EMA of highs (ema_high_32) and lows (ema_low_32) as primary reference lines.
2. Identify critical price-EMA crossovers: When closing price crosses above the high EMA, mark potential long opportunities; when closing price crosses below the low EMA, mark potential short opportunities.
3. Look for "no-touch candle" formations: For long positions, identify bullish candles completely above the high EMA; for short positions, identify bearish candles completely below the low EMA.
4. Record the high or low of the first "no-touch candle" as a breakout reference point.
5. When price breaks through this reference point and the next candle in the same direction appears, trigger an entry signal.
6. Exit strategy: Close long positions when price closes below the low EMA; close short positions when price closes above the high EMA.

The core logic of this strategy lies in requiring not only price-EMA crossovers but also "no-touch candle" and breakout confirmation to filter false signals, improving trading accuracy. This multi-confirmation mechanism effectively reduces the risk of incorrect entries in ranging markets.

#### Strategy Advantages
Through in-depth code analysis, this strategy demonstrates the following significant advantages:

1. Dual confirmation mechanism: The strategy requires not only price-EMA crossovers but also "no-touch candle" and price breakout confirmations, greatly reducing the risk of false breakouts.
2. Balances trend-following and reversal: While primarily a trend-following strategy, it can promptly identify potential trend reversals by capturing EMA crossover points.
3. Clear entry and exit rules: The strategy has strictly defined entry and exit conditions, reducing subjective judgment and facilitating algorithmic implementation and backtesting.
4. Rich visual assistance: The strategy provides various visual indicators on charts, including EMA lines, breakout points, and trade signal markers, helping traders intuitively understand market conditions.
5. Comprehensive state management: Multiple boolean variables in the code strictly track trading states, ensuring no duplicate entries or confusing signals occur.
6. Adaptation to short-term fluctuations: Specifically designed for the 5-minute timeframe, effectively capturing trading opportunities from short-term market movements.

#### Strategy Risks
Despite its sophisticated design, the strategy still presents the following potential risks:

1. Consolidation risk: In oscillating markets where prices frequently cross EMAs, it may lead to frequent trading and consecutive losses. Solution: Add additional market environment filtering conditions, such as volatility indicators or trend strength indicators.
2. Parameter sensitivity: The 32-period EMA parameter is central to the strategy; different markets or timeframes may require different parameter settings. Recommendation: Optimize through backtesting to determine parameters best suited for specific trading instruments.
3. Delay risk: Due to multiple confirmation requirements, entry delays may occur during rapid trend changes, missing partial price movements. Consider relaxing entry conditions in strong trend environments.
4. False breakout risk: Despite multiple confirmations, markets may still show false breakouts followed by quick retracements. Consider adding stop-loss strategies or using more conservative position management.
5. Timeframe limitation: The strategy is specifically designed for the 5-minute framework; direct application to other timeframes may yield suboptimal results. Parameters need re-optimization when applied to other timeframes.
6. Lack of profit-taking mechanism: The current strategy has stop-losses but no clear profit-taking rules, potentially leading to premature exits before trend completion or missed profits. Recommend adding dynamic profit-taking mechanisms based on volatility or support/resistance.

#### Strategy Optimization Directions
Based on code analysis, here are several main directions for strategy optimization:

1. Dynamic EMA periods: Consider dynamically adjusting EMA periods based on market volatility, using shorter EMAs in high-volatility markets and longer EMAs in low-volatility markets, adapting to different market environments.
2. Add trend strength filtering: Incorporate trend strength indicators like ADX, only entering positions when trend strength is sufficient, avoiding frequent trading in ranging markets.
3. Optimize profit-taking strategy: Add dynamic profit-taking mechanisms based on ATR or key price levels, protecting profits when trends develop favorably.
4. Time filtering: Add time filtering conditions to avoid trading during market opening, closing, or low-liquidity sessions.
5. Multi-timeframe analysis: Integrate higher timeframe trend directions as filtering conditions, only trading when multi-timeframe trends align.
6. Position management optimization: Dynamically adjust position sizes based on market volatility or account risk proportions, rather than fixed positions.
7. Add trade duration limits: Automatically close positions if trades don't reach expected returns within a certain timeframe, avoiding long-term trapped positions.

These optimization directions primarily aim to enhance strategy robustness and adaptability, reducing losses in unfavorable market environments.

#### Summary
The Cross-Breakout Dual EMA System Strategy is a meticulously designed technical analysis trading system that identifies high-probability trading opportunities through multiple mechanisms including 32-period EMA highs and lows, price crossovers, no-touch candles, and breakout confirmations. This strategy performs excellently in markets with clear trends, effectively reducing false entry risks through strict entry confirmations and clear exit rules.

However, like any trading strategy, it has limitations and may face challenges in ranging or highly volatile markets. By introducing trend strength filtering, dynamic parameter adjustments, multi-timeframe analysis, and other optimization measures, the strategy's stability and adaptability can be further enhanced.

As a short-term trading system for the 5-minute timeframe, this strategy is particularly suitable for intraday and short-term traders. Finally, good risk management remains key to successfully applying any trading strategy. Traders are advised to conduct thorough backtesting and simulated trading before live implementation, developing reasonable position management rules based on individual risk tolerance.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-26 00:00:00
end: 2025-03-25 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("TrophyFighter 32 EMA HL", overlay=true)

// 32 EMA for high and low
ema_high_32 = ta.ema(high, 32)
ema_low_32 = ta.ema(low, 32)

// Detect crossover and crossunder
cross_above_high_ema = ta.crossover(close, ema_high_32)
cross_below_low_ema = ta.crossunder(close, ema_low_32)

// Identify no-touch candles
no_touch_green = close > open and low > ema_high_32
no_touch_red = close < open and high < ema_low_32

// Track the high and low of no-touch candles
var float first_green_high = na
var float first_red_low = na
var bool waiting_for_long = false
var bool waiting_for_short = false
var bool in_long_trade = false  // Whether a long trade is active
var bool in_short_trade = false  // Whether a short trade is active
var bool first_no_touch_green_shown = false  // First green diamond shown
var bool first_no_touch_red_shown = false    // First red diamond shown

if (cross_above_high_ema and not in_long_trade and not in_short_trade)
    first_green_high := na
    waiting_for_long := true
    first_no_touch_green_shown := false  // Reset

if (cross_below_low_ema and not in_long_trade and not in_short_trade)
    first_red_low := na
    waiting_for_short := true
    first_no_touch_red_shown := false  // Reset

if (no_touch_green and waiting_for_long and ta.valuewhen(cross_above_high_ema, bar_index, 0) > ta.valuewhen(no_touch_green, bar_index, 1))
    first_green_high := high
    first_no_touch_green_shown := true  // Set first green diamond

if (no_touch_red and waiting_for_short and ta.valuewhen(cross_below_low_ema, bar_index, 0) > ta.valuewhen(no_touch_red, bar_index, 1))
    first_red_low := low
    first_no_touch_red_shown := true  // Set first red diamond

// Identify breakout (on the previous candle) - using na() function
long_breakout_check = high > ta.valuewhen(not na(first_green_high), first_green_high, 0) and not na(first_green_high) and waiting_for_long
short_breakout_check = low < ta.valuewhen(not na(first_red_low), first_red_low, 0) and not na(first_red_low) and waiting_for_short

// Buy and sell conditions (on the next same-colored candle)
long_condition = long_breakout_check[1] and close > open and not in_long_trade and not in_short_trade  // Next green candle
short_condition = short_breakout_check[1] and close < open and not in_long_trade and not in_short_trade  // Next red candle

// Breakout check (only on the signal candle)
long_breakout = long_condition  // Blue square only for signal
short_breakout = short_condition  // White square only for signal

// Signal for the first no-touch candle
first_no_touch_green = no_touch_green and not first_no_touch_green_shown and waiting_for_long and ta.valuewhen(cross_above_high_ema, bar_index, 0) > ta.valuewhen(no_touch_green, bar_index, 1)
first_no_touch_red = no_touch_red and not first_no_touch_red_shown and waiting_for_short and ta.valuewhen(cross_below_low_ema, bar_index, 0) > ta.valuewhen(no_touch_red, bar_index, 1)

// When a trade starts
if (long_condition)
    waiting_for_long := false
    in_long_trade := true  // Start long trade

if (short_condition)
    waiting_for_short := false
    in_short_trade := true  // Start short trade

// New exit rules
long_exit = close < ema_low_32 and in_long_trade  // Price drops below EMA low
short_exit = close > ema_high_32 and in_short_trade  // Price rises above EMA high

// Reset when trade closes
if (long_exit)
    in_long_trade := false

if (short_exit)
    in_short_trade := false

// Plot EMA and levels (cross style)
plot(ema_high_32, color=color.green, title="EMA High 32")
plot(ema_low_32, color=color.red, title="EMA Low 32")
plot(first_green_high, color=color.yellow, style=plot.style_cross, linewidth=1, title="First Green High")
plot(first_red_low, color=color.orange, style=plot.style_cross, linewidth=1, title="First Red Low")

// Debugging signals
plotshape(cross_above_high_ema, title="Cross Above EMA", location=location.belowbar, color=color.yellow, style=shape.circle, size=size.tiny)
plotshape(cross_below_low_ema, title="Cross Below EMA", location=location.abovebar, color=color.orange, style=shape.circle, size=size.tiny)
plotshape(first_no_touch_green, title="No Touch Green", location=location.belowbar, color=color.lime, style=shape.diamond, size=size.tiny)
plotshape(first_no_touch_red, title="No Touch Red", location=location.abovebar, color=color.purple, style=shape.diamond, size=size.tiny)
plotshape(long_breakout, title="Long Breakout", location=location.belowbar, color=color.blue, style=shape.square, size=size.tiny)
plotshape(short_breakout, title="Short Breakout", location=location.abovebar, color=color.white, style=shape.square, size=size.tiny)
plotshape(long_condition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(short_condition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

// Execute trades
if (long_condition)
    strategy.entry("Long", strategy.long)
if (short_condition)
    strategy.entry("Short", strategy.short)
if (long_exit)
    strategy.close("Long", comment="Long Exit")
if (short_exit)
    strategy.close("Short", comment="Short Exit")

```

> Detail

https://www.fmz.com/strategy/488244

> Last Modified

2025-03-26 11:14:18
