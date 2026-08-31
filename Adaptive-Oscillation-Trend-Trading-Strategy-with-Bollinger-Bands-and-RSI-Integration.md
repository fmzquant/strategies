
> Name

Adaptive-Oscillation-Trend-Trading-Strategy-with-Bollinger-Bands-and-RSI-Integration

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b7457118d9a987db4a.png)


#### Overview
This strategy is a trend-following system that combines multiple technical indicators, utilizing Bollinger Bands, RSI, and MACD to capture trading opportunities during market oscillations and trend transitions. The strategy employs a pyramiding position sizing approach with strict trade interval controls for risk management.

#### Strategy Principles
The core logic is built on triple signal confirmation:
1. RSI identifies oversold (<45) and overbought (>55) zones
2. Bollinger Bands determine price position, generating signals when price approaches or breaches the bands
3. MACD crossovers confirm trends, triggering trades when aligned with RSI and Bollinger Band signals
The strategy implements a minimum trade interval (15 periods) to prevent overtrading and uses pyramiding position management.

#### Strategy Advantages
1. Multiple technical indicator cross-validation reduces false signals
2. Pyramiding mechanism improves capital efficiency
3. Minimum trade interval effectively controls trading frequency
4. Adjustable indicator parameters provide strong adaptability
5. Automated position closure mechanism controls risk exposure

#### Strategy Risks
1. Multiple indicators may lead to signal lag
2. Potential frequent trading in oscillating markets
3. Pyramiding positions may result in larger losses during trend reversals
4. Fixed RSI thresholds may not suit all market conditions

#### Optimization Directions
1. Implement adaptive RSI thresholds based on market volatility
2. Incorporate volume indicators for signal confirmation
3. Optimize pyramiding position sizing algorithm
4. Add more flexible stop-loss mechanisms
5. Consider market cycle characteristics for dynamic trade interval adjustment

#### Summary
The strategy achieves stable returns while controlling risk through the coordination of multiple technical indicators. Despite some inherent lag, the strategy demonstrates good adaptability and stability through proper parameter optimization and risk management mechanisms. Future improvements can focus on introducing adaptive mechanisms and enhanced position management to further improve strategy performance.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-10-01 00:00:00
end: 2024-10-31 23:59:59
period: 3h
basePeriod: 3h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("[ETH] Optimized Trend Strategy", shorttitle="Lorenzo-SuperScalping", overlay=true, pyramiding=3, initial_capital=100000, currency=currency.USD)

// === Input Parameters === //
trade_size = input.float(1.0, title="Trade Size (ETH)")
rsi_length = input.int(14, minval=1, title="RSI Length")
bb_length = input.int(20, minval=1, title="Bollinger Bands Length")
bb_mult = input.float(2.0, title="Bollinger Bands Multiplier")
macd_fast = input.int(12, minval=1, title="MACD Fast Length")
macd_slow = input.int(26, minval=1, title="MACD Slow Length")
macd_signal = input.int(9, minval=1, title="MACD Signal Length")

// === Indicators === //
// RSI
rsi = ta.rsi(close, rsi_length)

// Bollinger Bands
basis = ta.sma(close, bb_length)
dev = ta.stdev(close, bb_length) * bb_mult
upper_band = basis + dev
lower_band = basis - dev
plot(basis, color=color.blue, title="BB Basis")
plot(upper_band, color=color.red, title="BB Upper")
plot(lower_band, color=color.green, title="BB Lower")

// MACD
[macd_line, signal_line, _] = ta.macd(close, macd_fast, macd_slow, macd_signal)
macd_cross_up = ta.crossover(macd_line, signal_line)
macd_cross_down = ta.crossunder(macd_line, signal_line)

// === Signal Control Variables === //
var bool last_signal_buy = na
var int last_trade_bar = na

// === Buy Signal Condition === //
// - RSI below 45
// - Price near or below the lower Bollinger Band
// - MACD crossover
buy_signal = (rsi < 45 and close < lower_band * 1.02 and macd_cross_up)

// === Sell Signal Condition === //
// - RSI above 55
// - Price near or above the upper Bollinger Band
// - MACD crossunder
sell_signal = (rsi > 55 and close > upper_band * 0.98 and macd_cross_down)

// Ensure enough bars between trades
min_bars_between_trades = input.int(15, title="Minimum Bars Between Trades")
time_elapsed = na(last_trade_bar) or (bar_index - last_trade_bar) >= min_bars_between_trades

// === Execute Trades with Conditions === //
can_buy = buy_signal and (na(last_signal_buy) or not last_signal_buy) and time_elapsed
can_sell = sell_signal and (not na(last_signal_buy) and last_signal_buy) and time_elapsed

if (can_buy)
    // Close any existing short position before opening a long
    if strategy.position_size < 0
        strategy.close("Short")

    strategy.entry("Long", strategy.long, qty=trade_size)
    last_signal_buy := true
    last_trade_bar := bar_index

if (can_sell)
    // Close any existing long position and open a short position
    if strategy.position_size > 0
        strategy.close("Long")

    strategy.entry("Short", strategy.short, qty=trade_size)
    last_signal_buy := false
    last_trade_bar := bar_index

// === Plot Buy and Sell Signals === //
plotshape(series=can_buy, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=can_sell, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

// === RSI Levels for Visualization === //
hline(45, "RSI Buy Level", color=color.green, linewidth=1, linestyle=hline.style_dotted)
hline(55, "RSI Sell Level", color=color.red, linewidth=1, linestyle=hline.style_dotted)

// Plot the RSI for reference
plot(rsi, title="RSI", color=color.purple)
```

> Detail

https://www.fmz.com/strategy/471671

> Last Modified

2024-11-12 11:35:58
