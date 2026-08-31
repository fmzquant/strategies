
> Name

多指标综合型动态交易策略-Multi-Indicator-Dynamic-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d0ffd1e5004654e3a9.png)


#### Overview

This strategy is a comprehensive trading system based on multiple technical indicators, primarily utilizing Exponential Moving Averages (EMA), Relative Strength Index (RSI), and trading volume to generate trading signals and manage positions. The strategy determines market trends through EMA crossovers, uses the RSI indicator to judge overbought and oversold conditions, and combines trading volume to confirm signal strength. Additionally, the strategy includes dynamic take-profit and stop-loss mechanisms, as well as a fixed holding time limit to control risk and optimize trading performance.

#### Strategy Principles

1. Trade Signal Generation:
   - Long Entry: EMA34 crosses above EMA89, and RSI is greater than 30
   - Short Entry: EMA34 crosses below EMA89, and RSI is less than 70

2. Dynamic Take-Profit and Stop-Loss:
   - Updates take-profit and stop-loss prices when trading volume is greater than 3 times the average volume of the last 20 candles
   - Sets take-profit and stop-loss prices to the closing price when high volume occurs

3. Fixed Holding Time:
   - Forces position closure after 15 candles, regardless of profit or loss

4. EMA Stop-Loss:
   - Uses EMA34 as a dynamic stop-loss line

5. Volume Confirmation:
   - Uses high volume conditions to confirm signal strength and update take-profit and stop-loss prices

#### Strategy Advantages

1. Multi-Indicator Synergy: Combines EMA, RSI, and volume for comprehensive market analysis, improving signal reliability.

2. Dynamic Risk Management: Adjusts take-profit and stop-loss in real-time based on market volatility, adapting to different market environments.

3. Fixed Holding Time: Avoids risks associated with long-term holdings, controlling exposure time for each trade.

4. EMA Dynamic Stop-Loss: Utilizes moving averages as dynamic support and resistance, providing more flexible stop-loss protection.

5. Volume Confirmation: Uses volume breakouts to confirm signal strength, increasing trade accuracy.

6. Visual Aids: Annotates buy/sell signals and key price levels on the chart, facilitating analysis and decision-making.

#### Strategy Risks

1. Choppy Market Risk: EMA crossovers may produce frequent false signals in sideways, volatile markets.

2. Fixed RSI Thresholds: The set RSI thresholds may not be suitable for all market conditions.

3. Volume Threshold Sensitivity: The 3x average volume threshold may be too high or low, requiring adjustment for specific markets.

4. Fixed Holding Time Limitation: The 15-candle fixed closing time may prematurely end profitable trades.

5. Take-Profit and Stop-Loss Price Setting: Using the closing price at high volume occurrence for take-profit and stop-loss may not be optimal.

#### Strategy Optimization Directions

1. Dynamic RSI Thresholds: Automatically adjust RSI overbought/oversold thresholds based on market volatility.

2. Optimize Volume Thresholds: Introduce an adaptive mechanism to dynamically adjust volume breakout multipliers based on historical data.

3. Improve Holding Time Management: Dynamically adjust maximum holding time based on trend strength and profitability.

4. Enhance Take-Profit and Stop-Loss Settings: Consider incorporating the ATR indicator to dynamically set take-profit and stop-loss prices based on market volatility.

5. Add Trend Filters: Introduce long-term EMAs or trend indicators to avoid trading against the primary trend.

6. Incorporate Price Action Analysis: Combine candlestick patterns and support/resistance levels to improve entry and exit precision.

7. Consider Drawdown Control: Set maximum drawdown limits, forcing position closure when specific drawdown levels are reached.

#### Summary

This multi-indicator dynamic trading strategy creates a comprehensive trading system by combining EMA, RSI, and volume. It not only captures market trends but also manages risk through dynamic take-profit/stop-loss and fixed holding times. The strategy's strengths lie in its multidimensional analysis and flexible risk management, but it also faces challenges from changing market environments. By further optimizing RSI thresholds, volume judgment criteria, holding time management, and take-profit/stop-loss settings, this strategy has the potential to perform better in various market conditions. Ultimately, this strategy provides traders with a reliable framework that can be customized and improved according to individual trading styles and market characteristics.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-06-29 00:00:00
end: 2024-07-29 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("EMA & RSI Strategy", overlay=true)

// Install indicators
ema34 = ta.ema(close, 34)
ema89 = ta.ema(close, 89)
ema54 = ta.ema(close, 54)
ema150 = ta.ema(close, 150)
rsi = ta.rsi(close, 14)

// Draw indicator
plot(ema34, color=color.red, title="EMA 34")
plot(ema89, color=color.blue, title="EMA 89")
//plot(ema54, color=color.green, title="EMA 54")
//plot(ema150, color=color.yellow, title="EMA 150")
hline(50, "RSI 50", color=color.gray)
plot(rsi, title="RSI", color=color.orange, linewidth=2, offset=-1)

// condition long or short
longCondition = ta.crossover(ema34, ema89) and rsi > 30
shortCondition = ta.crossunder(ema34, ema89) and rsi < 70

// Add strategy long
if (longCondition)
    strategy.entry("Long", strategy.long)

// Add strategy short
if (shortCondition)
    strategy.entry("Short", strategy.short)

// Calculate the average volume of previous candles
length = 20 // Number of candles to calculate average volume
avgVolume = ta.sma(volume, length)
highVolumeCondition = volume > 3 * avgVolume

// Determine take profit and stop loss prices when there is high volume
var float takeProfitPriceLong = na
var float stopLossPriceLong = na
var float takeProfitPriceShort = na
var float stopLossPriceShort = na

if (longCondition)
    takeProfitPriceLong := na
    stopLossPriceLong := na

if (shortCondition)
    takeProfitPriceShort := na
    stopLossPriceShort := na

// Update take profit and stop loss prices when volume is high
if (strategy.opentrades.entry_id(0) == "Long" and highVolumeCondition)
    takeProfitPriceLong := close
    stopLossPriceLong := close

if (strategy.opentrades.entry_id(0) == "Short" and highVolumeCondition)
    takeProfitPriceShort := close
    stopLossPriceShort := close

// Execute exit orders for buy and sell orders when there is high volume
if (not na(takeProfitPriceLong))
    strategy.exit("Take Profit Long", from_entry="Long", limit=takeProfitPriceLong, stop=stopLossPriceLong)

if (not na(takeProfitPriceShort))
    strategy.exit("Take Profit Short", from_entry="Short", limit=takeProfitPriceShort, stop=stopLossPriceShort)

// Track the number of candles since the order was opened
var int barsSinceEntryLong = na
var int barsSinceEntryShort = na
var bool longPositionClosed = false
var bool shortPositionClosed = false

if (longCondition)
    barsSinceEntryLong := 0
    longPositionClosed := false
if (shortCondition)
    barsSinceEntryShort := 0
    shortPositionClosed := false

if (strategy.opentrades.entry_id(0) == "Long")
    barsSinceEntryLong := barsSinceEntryLong + 1

if (strategy.opentrades.entry_id(0) == "Short")
    barsSinceEntryShort := barsSinceEntryShort + 1

// Check the conditions to close the order at the 15th candle
if (strategy.opentrades.entry_id(0) == "Long" and barsSinceEntryLong >= 15 and not longPositionClosed)
    strategy.close("Long")
    longPositionClosed := true

if (strategy.opentrades.entry_id(0) == "Short" and barsSinceEntryShort >= 15 and not shortPositionClosed)
    strategy.close("Short")
    shortPositionClosed := true

// Thêm stop loss theo EMA34
if (strategy.opentrades.entry_id(0) == "Long")
    strategy.exit("Stop Loss Long", from_entry="Long", stop=ema34)
if (strategy.opentrades.entry_id(0) == "Short")
    strategy.exit("Stop Loss Short", from_entry="Short", stop=ema34)

// Displays buy/sell signals and price levels on the chart
plotshape(series=longCondition, location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=shortCondition, location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

// Displays take profit and stop loss prices on the chart
// var line takeProfitLineLong = na
// var line stopLossLineLong = na
// var line takeProfitLineShort = na
// var line stopLossLineShort = na

// if (not na(takeProfitPriceLong)) 
//     if na(takeProfitLineLong)
//         takeProfitLineLong := line.new(x1=bar_index, y1=takeProfitPriceLong, x2=bar_index + 1, y2=takeProfitPriceLong, color=color.blue, width=1, style=line.style_dashed)
//     else
//         line.set_xy1(takeProfitLineLong, x=bar_index, y=takeProfitPriceLong)
//         line.set_xy2(takeProfitLineLong, x=bar_index + 1, y=takeProfitPriceLong)

// if (not na(stopLossPriceLong)) 
//     if na(stopLossLineLong)
//         stopLossLineLong := line.new(x1=bar_index, y1=stopLossPriceLong, x2=bar_index + 1, y2=stopLossPriceLong, color=color.red, width=1, style=line.style_dashed)
//     else
//         line.set_xy1(stopLossLineLong, x=bar_index, y=stopLossPriceLong)
//         line.set_xy2(stopLossLineLong, x=bar_index + 1, y=stopLossPriceLong)

// if (not na(takeProfitPriceShort)) 
//     if na(takeProfitLineShort)
//         takeProfitLineShort := line.new(x1=bar_index, y1=takeProfitPriceShort, x2=bar_index + 1, y2=takeProfitPriceShort, color=color.blue, width=1, style=line.style_dashed)
//     else
//         line.set_xy1(takeProfitLineShort, x=bar_index, y=takeProfitPriceShort)
//         line.set_xy2(takeProfitLineShort, x=bar_index + 1, y=takeProfitPriceShort)

// if (not na(stopLossPriceShort)) 
//     if na(stopLossLineShort)
//         stopLossLineShort := line.new(x1=bar_index, y1=stopLossPriceShort, x2=bar_index + 1, y2=stopLossPriceShort, color=color.red, width=1, style=line.style_dashed)
//     else
//         line.set_xy1(stopLossLineShort, x=bar_index, y=stopLossPriceShort)
//         line.set_xy2(stopLossLineShort, x=bar_index + 1, y=stopLossPriceShort)

// // Shows annotations for take profit and stop loss prices
// if (not na(takeProfitPriceLong))
//     label.new(x=bar_index, y=takeProfitPriceLong, text="TP Long", style=label.style_label_down, color=color.blue, textcolor=color.white)
// if (not na(stopLossPriceLong))
//     label.new(x=bar_index, y=stopLossPriceLong, text="SL Long", style=label.style_label_up, color=color.red, textcolor=color.white)
// if (not na(takeProfitPriceShort))
//     label.new(x=bar_index, y=takeProfitPriceShort, text="TP Short", style=label.style_label_up, color=color.blue, textcolor=color.white)
// if (not na(stopLossPriceShort))
//     label.new(x=bar_index, y=stopLossPriceShort, text="SL Short", style=label.style_label_down, color=color.red, textcolor=color.white)

```

> Detail

https://www.fmz.com/strategy/458204

> Last Modified

2024-07-30 17:29:59
