
> Name

Multi-Period-Trend-Following-with-Volume-Confirmation-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d7db12a1e511ad0fa413.png)
![IMG](https://www.fmz.com/upload/asset/2d8cff1190b56d3b9d728.png)

#### Overview
This strategy is a trend-following system that combines multi-period moving averages with volume analysis. It uses daily EMA9, WMA20, and WMA200 to confirm overall trends, while incorporating OBV (On Balance Volume) indicator and its EMA for volume confirmation, achieving more robust trend-following trading.

#### Strategy Principles
The strategy operates based on two core conditions:
1. Trend Confirmation - Determines trend direction by checking if three daily moving averages (EMA9, WMA20, WMA200) are all in upward trends. When all three moving averages are sloping upward, it indicates bullish trends across different time periods.
2. Volume Confirmation - Uses OBV indicator and its 13-period EMA for volume analysis. When OBV's EMA is above OBV, it confirms the trend's validity through volume support.
The strategy generates long signals only when both conditions are met simultaneously. Positions are closed when either condition fails.

#### Strategy Advantages
1. Multi-timeframe Analysis - Reduces false breakout risks by considering short-term (EMA9), medium-term (WMA20), and long-term (WMA200) trends.
2. Volume Support - Incorporates OBV indicator analysis to ensure price movements are supported by volume.
3. Comprehensive Risk Control - Implements percentage-based position management and considers commission costs, better reflecting real trading conditions.
4. Visual Support - Helps traders understand entry and exit timing through clear graphical markers.

#### Strategy Risks
1. Trend Reversal Lag - May respond slowly to trend reversals due to multiple moving average confirmations.
2. Ineffective in Ranging Markets - Frequent false breakouts during consolidation phases may lead to excessive trading.
3. Capital Cost Consideration - 0.1% commission may significantly impact returns in high-frequency trading.

#### Strategy Optimization Directions
1. Incorporate Volatility Indicators - Consider adding ATR or similar indicators for dynamic position sizing in different market conditions.
2. Improve Stop Loss Mechanism - Recommend adding trailing stop loss functionality for better profit protection.
3. Market Environment Filtering - Add market environment assessment indicators to reduce trading frequency or pause trading during ranging markets.
4. Optimize Parameters - Consider optimizing moving average periods and OBV parameters for different markets and instruments.

#### Summary
This strategy builds a relatively complete trend-following system by combining multi-period trend analysis with volume confirmation. The strategy logic is clear and risk control is reasonable, though there remains room for optimization. Traders are advised to test carefully in live trading and adjust parameters according to specific market characteristics.
> Source (PineScript)

``` pinescript
/*backtest
start: 2024-09-01 00:00:00
end: 2025-02-18 08:00:00
period: 5d
basePeriod: 5d
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Strategy: Daily MAs + OBV", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=10, commission_type=strategy.commission.percent, commission_value=0.1)

//=== Daily Moving Averages Calculation =========================
// Get daily timeframe values using request.security.
dailyEMA9   = request.security(syminfo.tickerid, "D", ta.ema(close, 9))
dailyWMA20  = request.security(syminfo.tickerid, "D", ta.wma(close, 20))
dailyWMA200 = request.security(syminfo.tickerid, "D", ta.wma(close, 200))

// Check if each moving average is trending upward (current > previous).
ema9_up   = dailyEMA9   > nz(dailyEMA9[1])
wma20_up  = dailyWMA20  > nz(dailyWMA20[1])
wma200_up = dailyWMA200 > nz(dailyWMA200[1])

trend_condition = ema9_up and wma20_up and wma200_up

//=== OBV and its 13-period EMA Calculation ================================
// Calculate OBV manually using a cumulative sum.
obv_val = ta.cum(close > close[1] ? volume : (close < close[1] ? -volume : 0))
// 13-period EMA of the OBV.
ema13_obv = ta.ema(obv_val, 13)

// Condition: 13-period EMA of OBV must be above the OBV value.
obv_condition = ema13_obv > obv_val

//=== Entry Condition ===================================================
// Both trend and OBV conditions must be met.
buy_condition = trend_condition and obv_condition

//=== Entry and Exit Orders =============================================
// Enter a long position when the buy condition is met and no position is open.
if buy_condition and strategy.position_size <= 0
    strategy.entry("Long", strategy.long)

// Exit the position when the condition is no longer met.
if not buy_condition and strategy.position_size > 0
    strategy.close("Long")

//=== Explicit Entry and Exit Markers ====================================
// Determine the exact bar where entry and exit occur.
entry_signal = (strategy.position_size > 0 and (strategy.position_size[1] <= 0))
exit_signal  = (strategy.position_size == 0 and (strategy.position_size[1] > 0))

plotshape(entry_signal, title="Entry Signal", location=location.belowbar, style=shape.labelup, text="BUY", color=color.new(color.green, 0), size=size.normal)
plotshape(exit_signal, title="Exit Signal", location=location.abovebar, style=shape.labeldown, text="SELL", color=color.new(color.red, 0), size=size.normal)

//=== Plots for Visualization ===============================================
// Plot daily moving averages.
plot(dailyEMA9, color=color.blue, title="Daily EMA 9")
plot(dailyWMA20, color=color.orange, title="Daily WMA 20")
plot(dailyWMA200, color=color.red, title="Daily WMA 200")

// Plot OBV and its 13-period EMA using color.new() to specify transparency.
plot(obv_val, color=color.new(color.gray, 30), title="OBV")
plot(ema13_obv, color=color.new(color.green, 0), title="13-Period EMA OBV")
```

> Detail

https://www.fmz.com/strategy/482795

> Last Modified

2025-02-20 11:23:31
