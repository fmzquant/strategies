
> Name

动量反转趋势跟踪策略Momentum-Reversal-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1290ff77da9985795f2.png)


### Overview

This strategy combines moving averages, Relative Strength Index (RSI), Bollinger Bands and MACD indicators to implement a momentum reversal strategy that can track market trends. It can automatically identify buy and sell signals.

### Principles  

The strategy uses two moving averages - 50 periods for the short term trend and 200 periods for the long term trend. When the 50-period MA is above the 200-period one, it indicates an upward trending bull market. When below, it signals a bear market.

The Relative Strength Index (RSI) identifies overbought/oversold conditions. Below 30 is oversold while above 70 is overbought. This strategy uses 30/70 as thresholds.  

Bollinger Bands judge if prices are near the upper/lower bands, indicating excessive volatility. Prices near the upper band may see short term reversal while lower band may see bounce.

MACD signals momentum changes. MACD line crossing above signal line indicates uptrend while crossing below indicates downtrend.

Buy signals require the 50-day MA to cross above 200-day MA, RSI below 30 oversold level, price near the lower Bollinger Band and a MACD bullish crossover - indicating reversal from bear to bull market. 

Sell signals are the opposite - bear trend, overbought levels, approaching upper band and MACD death cross, prompting short positions.

### Advantages

This strategy combines trend tracking and reversal signals, allowing it to follow trends and capture reversals. Using multiple indicators improves reliability and avoids false signals. Judging momentum changes allows timely reversal spotting. 

Compared to pure trend following strategies, overbought/oversold measures avoid buying high or selling low. Risk is thus contained.

### Risk Analysis

The main risk is signal time lag across indicators, causing inappropriate exit timing and magnified losses. Reversal signals only suggest probability without guarantee of success or sufficiency.  

Fine tuning parameters to sync indicators can mitigate this issue. Stop loss controls maximum loss. Post-reversal pattern assessment ensures validity too.

### Enhancement Opportunities

Some enhancement ideas:

1. Adjust parameters for better signal synchronization 

2. Incorporate stop loss logic to exit positions crossing loss limits

3. Evaluate Bollinger Bands' effectiveness and test other oscillators like KD and WR

4. Add machine learning model trained on historical data to determine entry/exit timing 

5. Incorporate sentiment indicators for more reference  

### Conclusion

This strategy leverages multiple technical analysis tools to determine market trends and reversals. Combining trend following and reversal trading allows riding long term moves while capturing short term swings. With reasonable parameters and risks in place, it promises good profits. Further optimizations can potentially improve live performance.




> Source (PineScript)

``` pinescript
//@version=5
strategy("Forex and Crypto Trading Strategy", overlay=true)

// Parameters
short_ema_length = 50
long_ema_length = 200
rsi_length = 14
rsi_overbought = 70
rsi_oversold = 30
bb_length = 20
macd_fast_length = 12
macd_slow_length = 26
macd_signal_smoothing = 9

// Moving Averages
short_ema = ta.ema(close, short_ema_length)
long_ema = ta.ema(close, long_ema_length)
plot(short_ema, color=color.blue, title="Short EMA")
plot(long_ema, color=color.red, title="Long EMA")

// RSI
rsi = ta.rsi(close, rsi_length)

// Bollinger Bands
[bb_upper, bb_middle, bb_lower] = ta.bb(close, bb_length, 2)

// MACD
[macd_line, signal_line, _] = ta.macd(close, macd_fast_length, macd_slow_length, macd_signal_smoothing)

// Buy and Sell Conditions
buy_condition = short_ema > long_ema and rsi < rsi_oversold and close < bb_lower and macd_line > signal_line
sell_condition = short_ema < long_ema and rsi > rsi_overbought and close > bb_upper and macd_line < signal_line

// Plotting Buy and Sell Signals
plotshape(series=buy_condition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=sell_condition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

// Strategy Execution
strategy.entry("Buy", strategy.long, when=buy_condition)
strategy.close("Buy", when=sell_condition)
strategy.entry("Sell", strategy.short, when=sell_condition)
strategy.close("Sell", when=buy_condition)



```

> Detail

https://www.fmz.com/strategy/434970

> Last Modified

2023-12-11 13:45:55
