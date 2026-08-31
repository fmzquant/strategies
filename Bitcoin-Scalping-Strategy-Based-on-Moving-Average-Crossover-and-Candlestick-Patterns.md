
> Name

Bitcoin-Scalping-Strategy-Based-on-Moving-Average-Crossover-and-Candlestick-Patterns

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17a5923c46ea87eaaf9.png)

## Overview

This is a 5-minute timeframe Bitcoin scalping strategy based on the crossover of 9-period and 15-period moving averages and candlestick patterns. Specifically, it generates buy signals when the fast moving average crosses above the slow moving average and the candle forms a hammer or marubozu. Sell signals are generated when the fast MA crosses below the slow MA. After entry, a 0.5% stop loss and 0.5% take profit are set.

## Strategy Logic  

The strategy uses two moving averages with different periods for trend determination. The 9-period MA is more sensitive and can capture short-term trends. The 15-period MA is more stable and can filter out some noise. When the faster MA crosses above the slower MA, it indicates the short-term trend is turning upwards. The reverse is true for a short-term trend turning down.

In addition, candlestick patterns are used for signal confirmation. Buy signals are only generated on strong candlesticks like hammers and marubozus. This helps avoid wrong signals during market consolidations.  

The specific trading signals and rules are:

1. The 9-period MA crosses above the 15-period MA, and the angle of the 15-period MA is greater than 30 degrees, indicating an upwards trend;  

2. If the candle forms a hammer or marubozu, showing strong upside momentum, a buy signal is generated;

3. The 9-period MA crossing below the 15-period MA indicates a downtrend and generates a sell signal regardless of candle patterns;  

4. Set stop loss to 0.5% and take profit to 0.5% after entry.

## Advantage Analysis   

The advantages of this strategy are:

1. Small drawdowns and steady gains - Loss per trade is limited which avoids huge drawdowns even in down markets.

2. Clear signals - MA crossover combined with candle patterns identify trend reversal points effectively. 

3. Easy automation - Simple signals and adjustable parameters make algorithmic trading possible.

4. Suitable for Bitcoin volatility - Frequent Bitcoin fluctuations provide lots of short-term trading opportunities.
 
## Risk Analysis

There are also some risks:

1. Prone to multiple small losses - High chance of stopped out leads to accumulated losses.

2. Parameter tuning is required - Effectiveness decreases if MA periods and profit settings don't match market conditions.  

3. Relies on strong trends - Sideway moves may lead to excessive trades but small profits.

The solutions are:

1. Trade larger sizes to ensure good risk-reward ratio.

2. Adjust parameters dynamically based on market changes.  

3. Identify market states and avoid trading in consolidations.  

## Optimization Directions 

Some ways to optimize the strategy:

1. Add adaptive mechanisms for stop loss and take profit - For example, trailing stop loss on moving averages, dynamic profit taking etc.

2. Add filters using other indicators - e.g. RSI for overbought/oversold, increasing volume etc.  

3. Test on other products - Apply similar logic when scalping commodities, index futures etc.  

4. Conduct parameter optimization and backtesting to find optimum parameters.

## Conclusion  

In summary, this is an effective Bitcoin scalping strategy. It is simple to implement and highly configurable. With continuous optimizations it can provide steady scalping income.
But trading risks should be managed prudently by controlling position sizing and stop loss. Moreover, the strategy can be enhanced based on changing market dynamics and individual capability.  

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Fast MA Length|
|v_input_2|15|Slow MA Length|
|v_input_3|0.5|Stop Loss (%)|
|v_input_4|0.5|Target (%)|
|v_input_5|30|Angle Threshold (degrees)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-29 00:00:00
end: 2024-02-28 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Moving Average Crossover Strategy with Candlestick Patterns", overlay=true)

// Define input parameters
fast_length = input(9, "Fast MA Length")
slow_length = input(15, "Slow MA Length")
stop_loss_percent = input(0.5, "Stop Loss (%)")
target_percent = input(0.5, "Target (%)")
angle_threshold = input(30, "Angle Threshold (degrees)")

// Calculate moving averages
fast_ma = sma(close, fast_length)
slow_ma = sma(close, slow_length)

// Define candlestick patterns
is_pin_bar() =>
    pin_bar = abs(open - close) > 2 * abs(open[1] - close[1])
    high_tail = max(open, close) - high > abs(open - close) * 1.5
    low_tail = low - min(open, close) > abs(open - close) * 1.5
    pin_bar and high_tail and low_tail

is_marubozu() =>
    marubozu = abs(open - close) > abs(open[1] - close[1]) * 0.75
    no_upper_shadow = high == max(open, close)
    no_lower_shadow = low == min(open, close)
    marubozu and no_upper_shadow and no_lower_shadow

is_full_body() =>
    full_body = abs(open - close) > abs(open[1] - close[1]) * 0.95
    full_body

// Plot moving averages
plot(fast_ma, color=color.blue, title="Fast MA")
plot(slow_ma, color=color.red, title="Slow MA")

// Calculate angle of slow moving average
ma_angle = abs(180 * (atan(slow_ma[1] - slow_ma) / 3.14159))

// Generate buy/sell signals based on angle condition and candlestick patterns
buy_signal = crossover(fast_ma, slow_ma) and ma_angle >= angle_threshold and (is_pin_bar() or is_marubozu() or is_full_body())
sell_signal = crossunder(fast_ma, slow_ma)

// Calculate stop-loss and target levels
stop_loss_level = close * (1 - stop_loss_percent / 100)
target_level = close * (1 + target_percent / 100)

// Execute trades based on signals with stop-loss and target
strategy.entry("Buy", strategy.long, when=buy_signal)
strategy.exit("Exit", "Buy", stop=stop_loss_level, limit=target_level)

// Plot buy/sell signals on chart (optional)
plotshape(series=buy_signal, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(series=sell_signal, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

// Plot angle line
hline(angle_threshold, "Angle Threshold", color=color.black, linestyle=hline.style_dashed)

```

> Detail

https://www.fmz.com/strategy/443108

> Last Modified

2024-02-29 12:01:47
