
> Name

Triple-Bollinger-Band-Standard-Deviation-Trend-Following-Strategy

> Author

ianzeng123

> Strategy Description
![IMG](https://www.fmz.com/upload/asset/2d8d5b9821f00f02b8d66.png)
![IMG](https://www.fmz.com/upload/asset/2d8718abd8ace9b720631.png)

#### Overview
This strategy is a trend following trading system based on Bollinger Band standard deviation. It determines trend strength by observing the relationship between three consecutive candles and the Bollinger Bands, executing trades when trends are confirmed. The system employs a fixed risk-reward ratio for managing trade risk.

#### Strategy Principle
The core logic is based on the following points:
1. Uses a 20-period moving average as the middle band, with 2 standard deviations for upper and lower bands.
2. When three consecutive candles close above the upper band, an uptrend is confirmed, entering long at the close of the third candle.
3. When three consecutive candles close below the lower band, a downtrend is confirmed, entering short at the close of the third candle.
4. Stop loss is set at the extreme value of the earliest candle in the entry signal.
5. Target price is set with a 1:1 risk-reward ratio, meaning the profit target distance equals the stop loss distance.

#### Strategy Advantages
1. Robust Signal Confirmation - Requires three consecutive candles breaking the Bollinger Bands, effectively reducing false breakout risks.
2. Rational Risk Management - Uses fixed risk-reward ratio for trade management, preventing excessive losses in single trades.
3. Effective Trend Following - Bollinger Band's standard deviation characteristics allow the strategy to adapt to market volatility changes.
4. Clear Execution Rules - Entry, stop loss, and profit targets all have clear quantitative standards, requiring no subjective judgment.

#### Strategy Risks
1. Poor Performance in Ranging Markets - May generate frequent false signals in markets without clear trends.
2. Delayed Entry Timing - Waiting for three-candle confirmation may miss early stages of price movements.
3. Fixed Risk-Reward Ratio Limitations - 1:1 risk-reward ratio may close profitable positions too early in strong trends.
4. Lack of Trend Strength Filtering - Relies solely on price-band relationships without considering other trend confirmation indicators.

#### Strategy Optimization Directions
1. Add Trend Strength Filter - Incorporate ADX or MACD for improved signal quality.
2. Optimize Risk-Reward Ratio Setting - Dynamically adjust risk-reward ratio based on market volatility.
3. Enhance Profit-Taking Mechanism - Consider adding trailing stops or partial profit-taking mechanisms for better trend capture.
4. Include Volume Confirmation - Add volume breakout confirmation when generating signals to improve reliability.

#### Summary
This is a well-designed trend following strategy that captures market trends through Bollinger Bands and multiple confirmation mechanisms. The strategy features a comprehensive risk management framework with clear execution standards. While there is some inherent lag, the suggested optimization directions can further enhance strategy stability and profitability. For traders who prefer trend following and emphasize risk control, this provides a valuable strategic framework.
> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-01 00:00:00
end: 2025-02-18 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("Bollinger Band Buy and Sell Strategy (Entry at Close of 3rd Candle)", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10, pyramiding=0)

// Bollinger Band settings
length = input.int(20, "Bollinger Band Length")
mult = input.float(2.0, "Standard Deviation Multiplier")
basis = ta.sma(close, length)
dev = mult * ta.stdev(close, length)
upper_band = basis + dev
lower_band = basis - dev

// Plot Bollinger Bands
plot(upper_band, "Upper Band", color.blue)
plot(lower_band, "Lower Band", color.red)

// Initialize variables
var float buyEntryPrice = na
var float buyStopLoss = na
var float buyTargetPrice = na

var float sellEntryPrice = na
var float sellStopLoss = na
var float sellTargetPrice = na

// Buy Condition: Last 3 candles closed above upper band
buyCondition = close[2] > upper_band[2] and 
               close[1] > upper_band[1] and 
               close > upper_band

// Sell Condition: Last 3 candles closed below lower band
sellCondition = close[2] < lower_band[2] and   close[1] < lower_band[1] and   close < lower_band

// Buy Logic
if buyCondition and strategy.position_size == 0
    buyEntryPrice := close  // Entry at the close of the 3rd candle
    buyStopLoss := low[2]   // Low of the earliest candle in the 3-candle sequence
    buyTargetPrice := buyEntryPrice + (buyEntryPrice - buyStopLoss)
    
    strategy.entry("Buy", strategy.long)
    strategy.exit("Buy Exit", "Buy", stop=buyStopLoss, limit=buyTargetPrice)
    
    // Plot buy signal arrow on the entry candle
    label.new(bar_index, low, "▲", color=color.green, style=label.style_label_up, yloc=yloc.belowbar)

// Sell Logic
if sellCondition and strategy.position_size == 0
    sellEntryPrice := close  // Entry at the close of the 3rd candle
    sellStopLoss := high[2]  // High of the earliest candle in the 3-candle sequence
    sellTargetPrice := sellEntryPrice - (sellStopLoss - sellEntryPrice)
    
    strategy.entry("Sell", strategy.short)
    strategy.exit("Sell Exit", "Sell", stop=sellStopLoss, limit=sellTargetPrice)
    
    // Plot sell signal arrow on the entry candle
    label.new(bar_index, high, "▼", color=color.red, style=label.style_label_down, yloc=yloc.abovebar)

// Plot stop loss and target levels for buy trades
plot(strategy.position_size > 0 ? buyStopLoss : na, "Buy Stop Loss", color.red, 2, plot.style_linebr)
plot(strategy.position_size > 0 ? buyTargetPrice : na, "Buy Target", color.green, 2, plot.style_linebr)

// Plot stop loss and target levels for sell trades
plot(strategy.position_size < 0 ? sellStopLoss : na, "Sell Stop Loss", color.red, 2, plot.style_linebr)
plot(strategy.position_size < 0 ? sellTargetPrice : na, "Sell Target", color.green, 2, plot.style_linebr)
```

> Detail

https://www.fmz.com/strategy/482878

> Last Modified

2025-02-20 16:16:14
