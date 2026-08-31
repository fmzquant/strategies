
> Name

Dynamic-Trend-Momentum-Optimization-Strategy-with-G-Channel-Indicator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/932f0acc7ad363193c.png)

#### Overview
This strategy is an advanced trend following trading system that integrates G-Channel, RSI, and MACD indicators. It identifies high-probability trading opportunities by dynamically calculating support and resistance zones while combining momentum indicators. The core lies in utilizing a custom G-Channel indicator to determine market trends while using RSI and MACD to confirm momentum changes for more accurate signal generation.

#### Strategy Principle
The strategy employs a triple-filtering mechanism to ensure signal reliability. First, the G-Channel dynamically constructs support and resistance zones by calculating maximum and minimum prices over a specified period. When prices break through the channel, the system identifies potential trend reversal points. Second, the RSI indicator confirms whether the market is in overbought or oversold conditions, helping to filter out more valuable trading opportunities. Finally, the MACD indicator confirms momentum direction and strength through histogram values. Trading signals are only generated when all three conditions are met.

#### Strategy Advantages
1. Multi-dimensional signal confirmation mechanism significantly improves trading accuracy
2. Dynamic stop-loss and take-profit settings effectively control risk
3. G-Channel's adaptive nature allows the strategy to adapt to different market environments
4. Comprehensive risk management system including position and money management
5. Visual labeling system intuitively displays trading signals for analysis and optimization

#### Strategy Risks
1. May generate false signals in choppy markets, requiring market environment identification
2. Parameter optimization may lead to overfitting risk
3. Multiple indicators may produce lag effects during high volatility periods
4. Improper stop-loss placement may result in excessive drawdowns

#### Strategy Optimization Directions
1. Introduce market environment identification module to use different parameter settings in different market states
2. Develop adaptive stop-loss mechanism to dynamically adjust stop-loss levels based on market volatility
3. Add volume analysis indicators to improve signal reliability
4. Optimize G-Channel calculation method to reduce lag effects

#### Summary
This strategy builds a complete trading system through the comprehensive use of multiple technical indicators. Its core advantages lie in the multi-dimensional signal confirmation mechanism and comprehensive risk management system. Through continuous optimization and improvement, the strategy shows promise in maintaining stable performance across different market environments. Traders are advised to thoroughly test different parameter combinations and make appropriate adjustments based on specific market characteristics before live trading.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-19 00:00:00
end: 2024-12-18 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("VinSpace Optimized Strategy", shorttitle="VinSpace Magic", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// Input Parameters
length = input.int(100, title="Length")
src = input(close, title="Source")
stop_loss_pct = input.float(1, title="Stop Loss (%)") / 100
take_profit_pct = input.float(3, title="Take Profit (%)") / 100
rsi_length = input.int(14, title="RSI Length")
rsi_overbought = input.int(70, title="RSI Overbought")
rsi_oversold = input.int(30, title="RSI Oversold")
macd_short = input.int(12, title="MACD Short Length")
macd_long = input.int(26, title="MACD Long Length")
macd_signal = input.int(9, title="MACD Signal Length")

// ---- G-Channel Calculations ----
var float a = na
var float b = na

a := math.max(src, na(a[1]) ? src : a[1]) - (na(a[1]) ? 0 : (a[1] - b[1]) / length)
b := math.min(src, na(b[1]) ? src : b[1]) + (na(a[1]) ? 0 : (a[1] - b[1]) / length)
avg = (a + b) / 2

// ---- RSI Calculation ----
rsi = ta.rsi(src, rsi_length)

// ---- MACD Calculation ----
[macdLine, signalLine, _] = ta.macd(src, macd_short, macd_long, macd_signal)
macd_hist = macdLine - signalLine

// ---- Trend Detection Logic ----
crossup = b[1] < close[1] and b > close
crossdn = a[1] < close[1] and a > close
bullish = ta.barssince(crossdn) <= ta.barssince(crossup)
c = bullish ? color.new(color.green, 0) : color.new(color.red, 0)

// Plotting the Average
p1 = plot(avg, "Average", color=c, linewidth=2)
p2 = plot(close, "Close price", color=c, linewidth=1)

// Adjusted fill with transparency
fill(p1, p2, color=color.new(c, 90))

// ---- Buy and Sell Signals ----
showcross = input(true, title="Show Buy/Sell Labels")
plotshape(showcross and bullish and not bullish[1], location=location.belowbar, style=shape.labelup, color=color.green, size=size.small, text="Buy", textcolor=color.white, offset=-1)
plotshape(showcross and not bullish and bullish[1], location=location.abovebar, style=shape.labeldown, color=color.red, size=size.small, text="Sell", textcolor=color.white, offset=-1)

// ---- Entry and Exit Conditions ----
enterLong = bullish and rsi < rsi_oversold and macd_hist > 0
enterShort = not bullish and rsi > rsi_overbought and macd_hist < 0

// Exit Conditions
exitLong = ta.crossunder(close, avg) or rsi > rsi_overbought
exitShort = ta.crossover(close, avg) or rsi < rsi_oversold

// Position Size (example: 10% of equity)
posSize = 1

// Submit Entry Orders
if enterLong
    strategy.entry("EL", strategy.long, qty=posSize)

if enterShort
    strategy.entry("ES", strategy.short, qty=posSize)

// Submit Exit Orders
if exitLong
    strategy.close("EL")

if exitShort
    strategy.close("ES")

// Set Stop Loss and Take Profit for the trades
strategy.exit("Take Profit/Stop Loss Long", from_entry="EL", loss=stop_loss_pct * close, profit=take_profit_pct * close)
strategy.exit("Take Profit/Stop Loss Short", from_entry="ES", loss=stop_loss_pct * close, profit=take_profit_pct * close)

```

> Detail

https://www.fmz.com/strategy/475605

> Last Modified

2024-12-20 14:55:02
