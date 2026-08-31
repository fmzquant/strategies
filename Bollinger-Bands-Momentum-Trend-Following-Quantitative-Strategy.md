
> Name

Bollinger-Bands-Momentum-Trend-Following-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f268e03c6d8b5c0f62.png)

 

#### Overview
This strategy is a comprehensive trading system based on Bollinger Bands, RSI indicator, and moving averages. It identifies potential trading opportunities through Bollinger Bands price volatility range, RSI overbought/oversold levels, and EMA trend filtering. The system supports both long and short trades and provides multiple exit mechanisms to protect capital.

#### Strategy Principles
The strategy is based on the following core components:
1. Uses Bollinger Bands with 1.8 standard deviation to determine price volatility range
2. Employs 7-period RSI for overbought/oversold conditions
3. Optional 500-period EMA as trend filter
4. Entry conditions:
   - Long: RSI below 25 and price breaks below lower Bollinger Band
   - Short: RSI above 75 and price breaks above upper Bollinger Band
5. Exit methods support either RSI thresholds or Bollinger Band reverse breakouts
6. Optional percentage-based stop loss protection

#### Strategy Advantages
1. Multiple technical indicators work together to improve signal reliability
2. Flexible parameter settings allow adjustment for different market conditions
3. Supports bilateral trading to capture market opportunities fully
4. Provides multiple exit mechanisms to suit different trading styles
5. Trend filtering effectively reduces false signals
6. Stop loss mechanism provides good risk control

#### Strategy Risks
1. May generate frequent false signals in ranging markets
2. Multiple indicators might lead to delayed signals
3. Fixed RSI thresholds may not be flexible enough for different market environments
4. Bollinger Bands parameters need adjustment based on market volatility
5. Stop loss settings may be easily triggered during violent fluctuations

#### Strategy Optimization Directions
1. Introduce adaptive Bollinger Bands multiplier based on market volatility
2. Add volume indicators for confirmation
3. Consider adding time filters to avoid trading during specific periods
4. Develop dynamic RSI threshold system
5. Integrate more trend confirmation indicators
6. Optimize stop loss mechanism, consider using dynamic stop loss

#### Summary
This is a well-designed quantitative trading strategy that captures market opportunities through multiple technical indicators. The strategy is highly configurable and can adapt to different trading needs. While there are some inherent risks, its stability and reliability can be further enhanced through parameter optimization and additional auxiliary indicators. For investors seeking systematic trading methods, this is a worthwhile strategy framework to consider.

> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-11 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Bollinger Bands Scalp Pro", overlay=true)

// Inputs for the strategy
length = input(20, title="Bollinger Band Length")
src = input(close, title="Source")
mult = input(1.8, title="Bollinger Band Multiplier")
rsiLength = input(7, title="RSI Length")
rsiOverbought = input(75, title="RSI Overbought Level")
rsiOversold = input(25, title="RSI Oversold Level")

// Custom RSI exit points
rsiExitLong = input(75, title="RSI Exit for Long (Overbought)")
rsiExitShort = input(25, title="RSI Exit for Short (Oversold)")

// Moving Average Inputs
emaLength = input(500, title="EMA Length")
enableEMAFilter = input.bool(true, title="Enable EMA Filter")

// Exit method: Choose between 'RSI' and 'Bollinger Bands'
exitMethod = input.string("RSI", title="Exit Method", options=["RSI", "Bollinger Bands"])

// Enable/Disable Long and Short trades
enableLong = input.bool(true, title="Enable Long Trades")
enableShort = input.bool(false, title="Enable Short Trades")

// Enable/Disable Stop Loss
enableStopLoss = input.bool(false, title="Enable Stop Loss")
stopLossPercent = input.float(1.0, title="Stop Loss Percentage (%)", minval=0.1) / 100

// Bollinger Bands calculation
basis = ta.sma(src, length)
dev = mult * ta.stdev(src, length)
upperBB = basis + dev
lowerBB = basis - dev

// RSI calculation
rsi = ta.rsi(src, rsiLength)

// 200 EMA to filter trades (calculated but only used if enabled)
ema200 = ta.ema(src, emaLength)

// Long condition: RSI below oversold, price closes below the lower Bollinger Band, and optionally price is above the 200 EMA
longCondition = enableLong and (rsi < rsiOversold) and (close < lowerBB) and (not enableEMAFilter or close > ema200)
if (longCondition)
    strategy.entry("Long", strategy.long)

// Short condition: RSI above overbought, price closes above the upper Bollinger Band, and optionally price is below the 200 EMA
shortCondition = enableShort and (rsi > rsiOverbought) and (close > upperBB) and (not enableEMAFilter or close < ema200)
if (shortCondition)
    strategy.entry("Short", strategy.short)

// Stop Loss setup
if (enableStopLoss)
    strategy.exit("Long Exit", "Long", stop = strategy.position_avg_price * (1 - stopLossPercent))
    strategy.exit("Short Exit", "Short", stop = strategy.position_avg_price * (1 + stopLossPercent))

// Exit conditions based on the user's choice of exit method
if (exitMethod == "RSI")
    // Exit based on RSI
    exitLongCondition = rsi >= rsiExitLong
    if (exitLongCondition)
        strategy.close("Long")
    
    exitShortCondition = rsi <= rsiExitShort
    if (exitShortCondition)
        strategy.close("Short")
else if (exitMethod == "Bollinger Bands")
    // Exit based on Bollinger Bands
    exitLongConditionBB = close >= upperBB
    if (exitLongConditionBB)
        strategy.close("Long")
    
    exitShortConditionBB = close <= lowerBB
    if (exitShortConditionBB)
        strategy.close("Short")






```

> Detail

https://www.fmz.com/strategy/471703

> Last Modified

2024-11-12 15:53:44
