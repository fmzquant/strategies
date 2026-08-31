
> Name

Multi-Timeframe-Stochastic-Oscillator-Strategy-with-Trend-Confirmation-Trading-System

> Author

ChaoZhang

> Strategy Description

#### Overview
This strategy is a trading system based on Multi-Timeframe Stochastic Oscillator, combining trend confirmation and price pattern analysis. The strategy utilizes three timeframes (15-minute, 30-minute, and 60-minute), identifying trading opportunities through Stochastic crossover signals and confirmation of Higher Highs and Lower Lows patterns. It also implements fixed percentage stop-loss and take-profit settings to control risk and secure profits.

#### Strategy Principles
The core logic includes the following key components:
1. Uses Stochastic indicators across three different timeframes (15-minute, 30-minute, 60-minute) to analyze market direction
2. On the main timeframe (15-minute), generates buy signals when K-line crosses above D-line in oversold territory, confirmed by Higher Low patterns
3. Similarly, generates sell signals when K-line crosses below D-line in overbought territory, confirmed by Lower High patterns
4. Implements 3.7% stop-loss and 1.8% take-profit targets to manage risk and reward for each trade

#### Strategy Advantages
1. Multi-timeframe analysis provides a more comprehensive market perspective, better filtering false signals
2. Integration of price pattern analysis increases signal reliability
3. Fixed risk management parameters ensure stable and controllable trading outcomes
4. Strategy is well-suited for markets with higher volatility
5. Automated entry and exit signals reduce emotional impact from subjective judgment

#### Strategy Risks
1. May generate frequent false signals in ranging markets
2. Fixed stop-loss and take-profit settings may not suit all market conditions
3. Multi-timeframe signals may experience lag
4. Take-profit settings may lock in profits too early in strong trend markets
5. Requires substantial capital management to accommodate 3.7% stop-loss range

#### Strategy Optimization Directions
1. Consider implementing dynamic stop-loss and take-profit targets based on market volatility
2. Add volume indicators as auxiliary confirmation signals
3. Introduce trend strength indicators to improve performance in ranging markets
4. Optimize weighting between different timeframes
5. Consider adding market sentiment indicators to improve signal accuracy

#### Summary
This is a comprehensive trading system combining multi-timeframe analysis and trend confirmation. Through the coordinated use of Stochastic indicators and price patterns, it effectively captures market turning points. While the fixed risk management parameters are simple, they ensure consistency in trading. The strategy is suitable for volatile markets, but traders still need to optimize parameters according to specific market conditions.

> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-19 00:00:00
end: 2025-02-18 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Swing Fairas Oil", overlay=true)

// Pilih Timeframe Utama & 2 Timeframe Konfirmasi
tf_main = "15"
tf_mid = "30"
tf_high = "60"

// Parameter Stochastic
length = input(15, title="Stochastic Length")
k_smooth = input(4, title="K Smoothing")
d_smooth = input(5, title="D Smoothing")

// Overbought & Oversold Levels
overbought = input(85, title="Overbought Level")
oversold = input(15, title="Oversold Level")

// Stochastic pada Timeframe Utama
k1 = ta.sma(ta.stoch(close, high, low, length), k_smooth)
d1 = ta.sma(k1, d_smooth)

// Stochastic pada Timeframe Menengah
k2 = request.security(syminfo.tickerid, tf_mid, ta.sma(ta.stoch(close, high, low, length), k_smooth))
d2 = request.security(syminfo.tickerid, tf_mid, ta.sma(k2, d_smooth))

// Stochastic pada Timeframe Tinggi
k3 = request.security(syminfo.tickerid, tf_high, ta.sma(ta.stoch(close, high, low, length), k_smooth))
d3 = request.security(syminfo.tickerid, tf_high, ta.sma(k3, d_smooth))

// **Konfirmasi Higher High & Lower Low**
hh = ta.highest(high, 5)   // Highest High dalam 5 candle terakhir
ll = ta.lowest(low, 5)     // Lowest Low dalam 5 candle terakhir

// **Kondisi Buy**
confirm_buy = ta.crossover(k1, d1) and k1 < oversold  // Stochastic Bullish
higher_low = low > ta.lowest(low[1], 5)  // Higher Low terbentuk

longCondition = confirm_buy and higher_low

// **Kondisi Sell**
confirm_sell = ta.crossunder(k1, d1) and k1 > overbought  // Stochastic Bearish
lower_high = high < ta.highest(high[1], 5)  // Lower High terbentuk

shortCondition = confirm_sell and lower_high

// Stop Loss & Take Profit
sl = input(3.7, title="Stop Loss (%)") / 100
tp = input(1.8, title="Take Profit (%)") / 100

longStopLoss = close * (1 - sl)
longTakeProfit = close * (1 + tp)

shortStopLoss = close * (1 + sl)
shortTakeProfit = close * (1 - tp)

// Eksekusi Order
if longCondition
    strategy.entry("Buy", strategy.long)
    strategy.exit("Sell TP/SL", from_entry="Buy", stop=longStopLoss, limit=longTakeProfit)

if shortCondition
    strategy.entry("Sell", strategy.short)
    strategy.exit("Cover TP/SL", from_entry="Sell", stop=shortStopLoss, limit=shortTakeProfit)

// Label Buy & Sell
if longCondition
    label.new(bar_index, low, "BUY", color=color.green, textcolor=color.white, size=size.small, style=label.style_label_down)

if shortCondition
    label.new(bar_index, high, "SELL", color=color.red, textcolor=color.white, size=size.small, style=label.style_label_up)

// Label Stop Loss & Take Profit
if longCondition
    label.new(bar_index, longStopLoss, "SL: " + str.tostring(longStopLoss, "#.##"), color=color.red, textcolor=color.white, size=size.small, style=label.style_label_left)
    label.new(bar_index, longTakeProfit, "TP: " + str.tostring(longTakeProfit, "#.##"), color=color.green, textcolor=color.white, size=size.small, style=label.style_label_left)

if shortCondition
    label.new(bar_index, shortStopLoss, "SL: " + str.tostring(shortStopLoss, "#.##"), color=color.red, textcolor=color.white, size=size.small, style=label.style_label_left)
    label.new(bar_index, shortTakeProfit, "TP: " + str.tostring(shortTakeProfit, "#.##"), color=color.green, textcolor=color.white, size=size.small, style=label.style_label_left)

```

> Detail

https://www.fmz.com/strategy/482590

> Last Modified

2025-02-19 10:53:25
