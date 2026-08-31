
> Name

Quantitative-Trading-Strategy-Based-on-5-day-Moving-Average-Band-and-GBS-Buy-Sell-Signals

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/eb06f8047df5cdcebd.png)

### Overview

This strategy combines the 5-day moving average band and GBS buy/sell signals to identify trend direction and generate trading signals. The moving average band is used to judge the trend direction and major support/resistance levels, while the GBS buy/sell signals are used to find precise entry timing under the trend direction. This strategy is suitable for medium-term trend trading and can achieve excess returns in range-bound markets.

### Strategy Principles 

1. Calculate the simple moving average of 5-day high and low prices to obtain the 5-day moving average band
2. When the closing price breaks through the moving average band, it indicates a trend reversal  
3. When an uptrend is identified, long positions are taken if GBS buy signals are triggered; When a downtrend is identified, short positions are taken if GBS sell signals are triggered
4. Set stop loss/take profit exit mechanisms, exit when drawdown exceeds certain threshold

### Advantages of the Strategy

1. The moving average band accurately judges the major trend direction  
2. GBS buy/sell signals have a relatively high winning rate
3. The stop loss mechanism effectively controls risks and limits losses

### Risks and Solutions

1. False breakouts may occur frequently in range-bound markets, causing trading mistakes
   - Solution: Widen the moving average band to ensure operations only during clear trends
2. Risks relying on single indicator  
   - Solution: Add validation from other indicators e.g. MACD, RSI to avoid missing reversal signals
3. Backtest overfitting risks 
   - Solution: Expand backtest timeframe, compare results across different products and parameters

### Directions for Strategy Optimization

1. Parameter optimization to find optimum parameter combinations
2. Add validation signals from other indicators 
3. Develop adaptive moving average mechanisms
4. Adjust stop loss level based on market conditions
5. Add machine learning algorithms to automatically optimize the strategy  

### Conclusion

This strategy integrates the moving average band and GBS buy/sell signals, operating with high confidence after identifying a clear trend direction to filter out market noise. It can lock in medium-term profits and exit timely. The strategy is simple and efficient in capital utilization, providing stable profits for quant traders. Continuous optimizations and iterations can further improve the win rate and profitability.  

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Number of Candles for Average|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-05 00:00:00
end: 2024-02-04 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("5MABAND + GBS Buy & Sell Strategy", overlay=true)

// Command 1 - 5MABAND Calculation
length = input(5, title="Number of Candles for Average")
avgHigh = ta.sma(high, length)
avgLow = ta.sma(low, length)

// Plotting 5MABAND Bands
plot(avgHigh, color=color.green, title="5MABAND High Line", linewidth=1)
plot(avgLow, color=color.red, title="5MABAND Low Line", linewidth=1)

// Command 2 - GBS concept Buy Entry
gbsBuyCondition = close > open and high - close < close - open and open - low < close - open and close - open > close[1] - open[1] and close - open > close[2] - open[2] and close - open > close[3] - open[3] and close[1] < avgHigh and close[2] < avgHigh and close[3] < avgHigh and open[1] < avgHigh and open[2] < avgHigh and open[3] < avgHigh

// Command 3 - GBS Concept Sell Entry
gbsSellCondition = open - close > open[1] - close[1] and open - close > open[2] - close[2] and open - close > open[3] - close[3] and open[1] > avgLow and open[2] > avgLow and open[3] > avgLow and open - close > open - low and open - close > high - open

// Command 6 - 5MABAND Exit Trigger
exitTriggerCandle_5MABAND_Buy = low < avgLow
exitTriggerCandle_5MABAND_Sell = high > avgHigh

// Exit Signals for 5MABAND
exitBuySignal_5MABAND = close < avgLow
exitSellSignal_5MABAND = close > avgHigh

// Execute Buy and Sell Orders
strategy.entry("Buy", strategy.long, when = gbsBuyCondition)
strategy.close("Buy", when = exitBuySignal_5MABAND)

strategy.entry("Sell", strategy.short, when = gbsSellCondition)
strategy.close("Sell", when = exitSellSignal_5MABAND)

// Exit Buy and Sell Orders for 5MABAND
strategy.close("Buy", when = exitTriggerCandle_5MABAND_Buy)
strategy.close("Sell", when = exitTriggerCandle_5MABAND_Sell)

```

> Detail

https://www.fmz.com/strategy/441053

> Last Modified

2024-02-05 10:50:35
