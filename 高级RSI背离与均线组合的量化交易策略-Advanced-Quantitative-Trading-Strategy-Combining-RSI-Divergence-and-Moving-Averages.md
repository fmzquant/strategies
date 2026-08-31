
> Name

高级RSI背离与均线组合的量化交易策略-Advanced-Quantitative-Trading-Strategy-Combining-RSI-Divergence-and-Moving-Averages

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f7117c88c4e8a9b7be.png)


#### Overview

This is an advanced quantitative trading strategy based on Relative Strength Index (RSI) divergence and a combination of various moving averages. The strategy is primarily designed for short-term trading, aiming to capture potential reversal points by identifying divergences between RSI and price action. It combines RSI, multiple types of moving averages, and Bollinger Bands to provide traders with a comprehensive technical analysis framework.

The core of this strategy lies in utilizing RSI divergence to identify potential overbought and oversold conditions. It detects divergences by comparing highs and lows of RSI and price, and combines RSI levels to determine entry points. Additionally, the strategy incorporates various types of moving averages, such as Simple Moving Average (SMA), Exponential Moving Average (EMA), Smoothed Moving Average (SMMA), and others, to provide additional trend confirmation signals.

#### Strategy Principles

1. RSI Calculation: Uses a customizable RSI period (default 60) to calculate RSI values.

2. RSI Moving Average: Applies a moving average to the RSI, supporting multiple MA types including SMA, EMA, SMMA, WMA, and VWMA.

3. Divergence Detection:
   - Bullish Divergence: Forms when price makes a lower low but RSI doesn't.
   - Bearish Divergence: Forms when price makes a higher high but RSI doesn't.

4. Entry Conditions:
   - Long Entry: Bullish divergence detected and RSI below 40.
   - Short Entry: Bearish divergence detected and RSI above 60.

5. Trade Management:
   - Stop Loss: Set at a fixed number of points (default 11 points).
   - Take Profit: Set at a fixed number of points (default 33 points).

6. Visualization:
   - Plots RSI line and RSI moving average.
   - Displays horizontal lines at 30, 50, and 70 RSI levels.
   - Optional Bollinger Bands display.
   - Marks divergence locations on the chart.

#### Strategy Advantages

1. Multi-Indicator Analysis: Combines RSI, moving averages, and Bollinger Bands for a comprehensive market view.

2. Flexible Parameter Settings: Allows users to adjust RSI length, MA type, and other parameters for different market conditions.

3. Divergence Identification: Captures potential reversal opportunities by identifying divergences between RSI and price.

4. Risk Management: Built-in stop loss and take profit mechanisms help control risk.

5. Visual Representation: Intuitively displays trading signals and divergences on the chart.

6. Adaptability: Can be applied to different trading instruments and timeframes.

7. Automation Potential: Easily integrated into automated trading systems.

#### Strategy Risks

1. False Signal Risk: May generate excessive false divergence signals in ranging markets.

2. Lag: RSI and moving averages are lagging indicators, potentially leading to slightly delayed entries.

3. Overtrading: In highly volatile markets, the strategy may trigger too many trading signals.

4. Parameter Sensitivity: Strategy performance highly depends on parameter settings, which may require different optimizations for different markets.

5. Trend Market Performance: Divergence strategies may frequently trade against the trend in strong trending markets.

6. Fixed Stop Loss Risk: Using a fixed number of points as stop loss may not be suitable for all market conditions.

#### Strategy Optimization Directions

1. Introduce Trend Filter: Add a long-term moving average or ADX indicator to avoid counter-trend trades in strong trends.

2. Dynamic Stop Loss: Implement ATR or volatility percentage-based dynamic stop loss to adapt to different market volatilities.

3. Multi-Timeframe Analysis: Incorporate signals from higher timeframes to confirm trade direction.

4. Volume Analysis Integration: Include volume indicators to enhance signal reliability.

5. Optimize Entry Timing: Consider using price action patterns or candlestick formations for precise entries.

6. Machine Learning Optimization: Utilize machine learning algorithms to optimize parameter selection and signal generation.

7. Additional Filtering Conditions: Add extra technical indicators or fundamental factors to filter trading signals.

#### Conclusion

This advanced quantitative trading strategy based on RSI divergence and multiple moving average combinations provides traders with a powerful and flexible analytical framework. By combining RSI divergence, various moving average types, and Bollinger Bands, the strategy can capture potential market reversal points while providing trend confirmation signals.

The main advantages of the strategy lie in its comprehensiveness and flexibility, capable of adapting to different market conditions. However, users need to be aware of potential risks such as false signals and the possibility of overtrading. Through continuous optimization and the introduction of additional analytical tools, this strategy has the potential to become a reliable trading system.

The key is to adjust parameters according to specific trading instruments and market conditions, and to validate signals in conjunction with other analytical methods. At the same time, strict risk management and ongoing strategy optimization are crucial factors in ensuring long-term success.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-28 00:00:00
end: 2024-06-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Advanced Gold Scalping Strategy with RSI Divergence", overlay=false)

// Input parameters
rsiLengthInput = input.int(60, minval=1, title="RSI Length", group="RSI Settings")
rsiSourceInput = input.source(ohlc4, "Source", group="RSI Settings")
maTypeInput = input.string("SMMA (RMA)", title="MA Type", options=["SMA", "Bollinger Bands", "EMA", "SMMA (RMA)", "WMA", "VWMA"], group="MA Settings")
maLengthInput = input.int(3, title="MA Length", group="MA Settings")
bbMultInput = input.float(2.0, minval=0.001, maxval=50, title="BB StdDev", group="MA Settings")
showDivergence = input(true, title="Show Divergence", group="RSI Settings")
stopLoss = input.float(11, title="Stop Loss (pips)", group="Trade Settings")
takeProfit = input.float(33, title="Take Profit (pips)", group="Trade Settings")

// RSI and MA calculation
ma(source, length, type) =>
    switch type
        "SMA" => ta.sma(source, length)
        "Bollinger Bands" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "SMMA (RMA)" => ta.rma(source, length)
        "WMA" => ta.wma(source, length)
        "VWMA" => ta.vwma(source, length)

up = ta.rma(math.max(ta.change(rsiSourceInput), 0), rsiLengthInput)
down = ta.rma(-math.min(ta.change(rsiSourceInput), 0), rsiLengthInput)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
rsiMA = ma(rsi, maLengthInput, maTypeInput)
isBB = maTypeInput == "Bollinger Bands"

// Divergence detection
lookbackRight = 5
lookbackLeft = 5
rangeUpper = 60
rangeLower = 5

plFound = na(ta.pivotlow(rsi, lookbackLeft, lookbackRight)) ? false : true
phFound = na(ta.pivothigh(rsi, lookbackLeft, lookbackRight)) ? false : true

_inRange(cond) =>
    bars = ta.barssince(cond == true)
    rangeLower <= bars and bars <= rangeUpper

// Bullish divergence
rsiHL = rsi[lookbackRight] > ta.valuewhen(plFound, rsi[lookbackRight], 1) and _inRange(plFound[1])
priceLL = low[lookbackRight] < ta.valuewhen(plFound, low[lookbackRight], 1)
bullishDivergence = priceLL and rsiHL and plFound

// Bearish divergence
rsiLH = rsi[lookbackRight] < ta.valuewhen(phFound, rsi[lookbackRight], 1) and _inRange(phFound[1])
priceHH = high[lookbackRight] > ta.valuewhen(phFound, high[lookbackRight], 1)
bearishDivergence = priceHH and rsiLH and phFound

// Entry conditions
longCondition = bullishDivergence and rsi < 40
shortCondition = bearishDivergence and rsi > 60

// Convert pips to price for Gold (assuming 1 pip = 0.1 for XAUUSD)
stopLossPrice = stopLoss * 0.1
takeProfitPrice = takeProfit * 0.1

// Execute trades
if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit("TP/SL", "Long", stop=strategy.position_avg_price - stopLossPrice, limit=strategy.position_avg_price + takeProfitPrice)

if (shortCondition)
    strategy.entry("Short", strategy.short)
    strategy.exit("TP/SL", "Short", stop=strategy.position_avg_price + stopLossPrice, limit=strategy.position_avg_price - takeProfitPrice)

// Plotting
plot(rsi, "RSI", color=#7E57C2)
// plot(rsiMA, "RSI-based MA", color=color.yellow)
hline(60, "RSI Upper Band", color=#787B86)
// hline(50, "RSI Middle Band", color=color.new(#787B86, 50))
hline(40, "RSI Lower Band", color=#787B86)
fill(hline(60), hline(40), color=color.rgb(126, 87, 194, 90), title="RSI Background Fill")

// Divergence visualization
plotshape(showDivergence and bullishDivergence ? rsi[lookbackRight] : na, offset=-lookbackRight, title="Bullish Divergence", text="Bull", style=shape.labelup, location=location.absolute, color=color.green, textcolor=color.white)
plotshape(showDivergence and bearishDivergence ? rsi[lookbackRight] : na, offset=-lookbackRight, title="Bearish Divergence", text="Bear", style=shape.labeldown, location=location.absolute, color=color.red, textcolor=color.white)

```

> Detail

https://www.fmz.com/strategy/455354

> Last Modified

2024-06-28 15:02:37
