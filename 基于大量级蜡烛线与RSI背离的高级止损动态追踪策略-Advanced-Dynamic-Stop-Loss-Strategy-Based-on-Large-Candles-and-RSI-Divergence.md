
> Name

基于大量级蜡烛线与RSI背离的高级止损动态追踪策略-Advanced-Dynamic-Stop-Loss-Strategy-Based-on-Large-Candles-and-RSI-Divergence

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d795373e05a212431a.png)


#### Overview
This strategy combines large candle identification and RSI divergence as primary signals, incorporating both initial fixed stops and dynamic trailing stops to form a complete trend-following trading system. The strategy identifies significant price movements by comparing the current candle body with the previous five candles, confirms momentum changes using fast and slow RSI divergence, and employs a dual-stop mechanism for risk management and profit protection.

#### Strategy Principles
The strategy consists of four core components: 1)Large Candle Identification - determining significant price momentum by comparing current candle body with previous five candles; 2)RSI Divergence Analysis - measuring momentum changes using the difference between 5-period fast RSI and 14-period slow RSI; 3)Initial Stop - setting a 200-point fixed stop loss at entry to control initial risk; 4)Trailing Stop - activating after 200 points profit, maintaining a dynamic 150-point following distance. The strategy also uses 21-period EMA as a trend filter to help determine overall market direction.

#### Strategy Advantages
1. Comprehensive Risk Management - Limiting maximum loss through fixed stops while protecting realized profits with trailing stops
2. Reliable Entry Signals - Large candles typically represent strong price momentum, providing high-probability trading opportunities
3. Sufficient Signal Confirmation - RSI divergence as a supplementary indicator helps validate momentum changes and reduces false signal risks
4. Flexible Profit Protection - Dynamic trailing stop mechanism allows capturing larger price moves while protecting gains
5. Strong Parameter Adaptability - Key parameters like trailing start point, trailing distance, and initial stop can be optimized for different market characteristics

#### Strategy Risks
1. Choppy Market Risk - Frequent stop-outs may occur during consolidation phases
2. Gap Risk - Large gaps may cause actual stop levels to differ from expected
3. Slippage Risk - Fast markets may lead to significant slippage affecting execution quality
4. False Breakout Risk - False breakouts after large candles may trigger stop losses
5. Parameter Sensitivity - Stop loss parameters significantly impact strategy performance

#### Strategy Optimization Directions
1. Market Environment Filtering - Suggest adding volatility indicators like ATR, pausing trades in low volatility environments
2. Entry Timing Optimization - Can combine price patterns or other technical indicators to improve entry timing accuracy
3. Dynamic Stop Loss Parameters - Consider dynamically adjusting trailing stop distance based on market volatility
4. Position Management Improvement - Can introduce volatility-based position sizing mechanism
5. Enhanced Trend Strength Filtering - Can add trend strength indicators, using wider stops in strong trends

#### Summary
The strategy builds a complete trend-following system by combining large candles and RSI divergence, achieving comprehensive risk management through a dual-stop mechanism. It is suitable for markets with clear trends and higher volatility, but requires parameter adjustment based on specific market characteristics. Through the suggested optimization directions, the strategy's stability and profitability can be further enhanced.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-17 00:00:00
end: 2025-01-16 00:00:00
period: 3h
basePeriod: 3h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

//@version=6
strategy('[F][IND] - Big Candle Identifier with RSI Divergence and Advanced Stops', shorttitle = '[F][IND] Big Candle RSI Trail', overlay = true)

// Inputs for the trailing stop and stop loss
trail_start_ticks = input.int(200, "Trailing Start Ticks", tooltip="The number of ticks the price must move in the profitable direction before the trailing stop starts.")
trail_distance_ticks = input.int(150, "Trailing Distance Ticks", tooltip="The distance in ticks between the trailing stop and the price once the trailing stop starts.")
initial_stop_loss_points = input.int(200, "Initial Stop Loss Points", tooltip="The fixed stop loss applied immediately after entering a trade.")

// Tick size based on instrument
tick_size = syminfo.mintick

// Calculate trailing start and distance in price
trail_start_price = trail_start_ticks * tick_size
trail_distance_price = trail_distance_ticks * tick_size
initial_stop_loss_price = initial_stop_loss_points * tick_size

// Identify big candles
body0 = math.abs(close[0] - open[0])
body1 = math.abs(close[1] - open[1])
body2 = math.abs(close[2] - open[2])
body3 = math.abs(close[3] - open[3])
body4 = math.abs(close[4] - open[4])
body5 = math.abs(close[5] - open[5])

bullishBigCandle = body0 > body1 and body0 > body2 and body0 > body3 and body0 > body4 and body0 > body5 and open < close
bearishBigCandle = body0 > body1 and body0 > body2 and body0 > body3 and body0 > body4 and body0 > body5 and open > close

// RSI Divergence
rsi_fast = ta.rsi(close, 5)
rsi_slow = ta.rsi(close, 14)
divergence = rsi_fast - rsi_slow

// Trade Entry Logic
if bullishBigCandle
    strategy.entry('Long', strategy.long, stop=low - initial_stop_loss_price)
if bearishBigCandle
    strategy.entry('Short', strategy.short, stop=high + initial_stop_loss_price)

// Trailing Stop Logic
var float trail_stop = na
if strategy.position_size > 0 // Long Position
    entry_price = strategy.position_avg_price
    current_profit = close - entry_price
    if current_profit >= trail_start_price
        trail_stop := math.max(trail_stop, close - trail_distance_price)
    strategy.exit("Trailing Stop Long", "Long", stop=trail_stop)

if strategy.position_size < 0 // Short Position
    entry_price = strategy.position_avg_price
    current_profit = entry_price - close
    if current_profit >= trail_start_price
        trail_stop := math.min(trail_stop, close + trail_distance_price)
    strategy.exit("Trailing Stop Short", "Short", stop=trail_stop)

// Plotting Trailing Stop
plot(strategy.position_size > 0 ? trail_stop : na, color=color.green, title="Trailing Stop (Long)")
plot(strategy.position_size < 0 ? trail_stop : na, color=color.red, title="Trailing Stop (Short)")

// Plotting RSI Divergence
plot(divergence, color=divergence > 0 ? color.lime : color.red, linewidth=2, title="RSI Divergence")
hline(0)

// Plotting EMA
ema21 = ta.ema(close, 21)
plot(ema21, color=color.blue, title="21 EMA")

```

> Detail

https://www.fmz.com/strategy/478719

> Last Modified

2025-01-17 15:51:14
