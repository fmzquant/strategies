
> Name

五日均线通道突破策略5-Day-Moving-Average-Channel-Breakout-Strategy-Combined-With-Mileage-Concept

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6e33118eeec9206213.png)

## Overview 
This strategy combines the 5-day moving average channel and the mileage concept buy and sell signals to achieve both channel breakout and short-term trading functionalities. It first calculates the 5-day moving averages of highest high and lowest low as the channel bands, and then determines the entry and exit based on the channel breakout signals and mileage concept candlestick patterns.

## Strategy Logic
1. Calculate 5-day moving averages of highest high and lowest low as the upper and lower channel bands 
2. Generate buy signal when closing price crosses above the upper band
3. Generate sell signal when closing price crosses below the lower band
4. Combine with mileage concept patterns to determine if price action matches buy/sell features
   - Buy feature: Close > Open, High – Close < Close – Open, Open – Low < Close - Open
   - Sell feature: Open – Close > Previous Open – Close for 3 consecutive candles
5. Final buy condition = Channel breakout signal AND Mileage buy pattern
6. Final sell condition = Channel breakout signal AND Mileage sell pattern

## Advantage Analysis
1. Combines channel breakout and mileage concept strategies for multi-layer confirmation, avoiding false signals
2. Channel breakout captures intermediate-term trends
3. Mileage concept identifies short-term reversal opportunities  
4. Simple parameters easy to adjust for different market environments

## Risk Analysis
1. Whipsaws may generate false signals when price fluctuates violently within channel
2. Inaccurate mileage concept pattern recognition may lead to premature entry or insufficient exit
3. Improper parameter tuning impacts signal quality

## Optimization Directions
1. Test different parameter sets to find optimal channel bands
2. Try different channel periods to see if shorter or longer durations perform better  
3. Optimize mileage concept rules to filter out noise
4. Consider adding stop loss to control single trade loss

## Conclusion
This strategy synthesizes channel breakout and mileage concept short-term trading, achieving multi-layer confirmation and risk control. Further optimizations may improve strategy performance. Note that parameter tuning and risk management significantly impact results, requiring thorough testing and validation.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Number of Candles for Average|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-29 00:00:00
end: 2024-02-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("5MABAND + Mileage Concept Buy & Sell Strategy", overlay=true)

// Command 1 - 5MABAND Calculation
length = input(5, title="Number of Candles for Average")
avgHigh = ta.sma(high, length)
avgLow = ta.sma(low, length)

// Plotting 5MABAND Bands
plot(avgHigh, color=color.green, title="5MABAND High Line", linewidth=2)
plot(avgLow, color=color.red, title="5MABAND Low Line", linewidth=2)

// Command 2 - Mileage Concept Buy Entry
mileageBuyCondition = close > open and high - close < close - open and open - low < close - open and close - open > close[1] - open[1] and close - open > close[2] - open[2] and close - open > close[3] - open[3] and close > open and open > close[1]

// Command 3 - Mileage Concept Sell Entry
mileageSellCondition = open - close > open[1] - close[1] and open - close > open[2] - close[2] and open - close > open[3] - close[3] and open > close and close > open[1] and close > avgHigh

// Command 4 - 5MABAND Buy Entry
buyAlertCandle_5MABAND = close > avgHigh
plotshape(buyAlertCandle_5MABAND, color=color.green, style=shape.triangleup, location=location.belowbar, size=size.small, title="Buy Signal (5MABAND)")

// Command 5 - 5MABAND Sell Entry
sellAlertCandle_5MABAND = close < avgLow
plotshape(sellAlertCandle_5MABAND, color=color.red, style=shape.triangledown, location=location.abovebar, size=size.small, title="Sell Signal (5MABAND)")

// Command 6 - 5MABAND Exit Trigger
exitTriggerCandle_5MABAND_Buy = low < avgLow
exitTriggerCandle_5MABAND_Sell = high > avgHigh

// Exit Signals for 5MABAND
exitBuySignal_5MABAND = close < avgLow
exitSellSignal_5MABAND = close > avgHigh

// Buy and Sell Conditions for 5MABAND
buyCondition_5MABAND = close > avgHigh and buyAlertCandle_5MABAND
sellCondition_5MABAND = close < avgLow and (exitTriggerCandle_5MABAND_Buy or exitSellSignal_5MABAND)

// Combine Buy Conditions for Mileage Concept and 5MABAND
combinedBuyCondition = mileageBuyCondition and buyCondition_5MABAND
combinedSellCondition = mileageSellCondition and sellCondition_5MABAND

// Execute Buy and Sell Orders
strategy.entry("Buy", strategy.long, when = combinedBuyCondition)
strategy.close("Buy", when = sellCondition_5MABAND)

strategy.entry("Sell", strategy.short, when = combinedSellCondition)
strategy.close("Sell", when = exitBuySignal_5MABAND)

// Exit Buy and Sell Orders for 5MABAND
strategy.close("Buy", when = exitBuySignal_5MABAND)
strategy.close("Sell", when = exitSellSignal_5MABAND)

```

> Detail

https://www.fmz.com/strategy/441097

> Last Modified

2024-02-05 15:16:05
