
> Name

基于布林带跟踪策略The-Bollinger-Bands-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/165facfe4eff8b01043.png)

## Overview  

The Bollinger Bands tracking strategy is a quantitative trading strategy based on Bollinger Bands. It calculates the upper and lower rails of the Bollinger Bands of a stock and sets buy and sell conditions to track the market. When the price touches the lower rail of the Bollinger Bands, the stock is considered undervalued, Thus providing more room for growth and generating a buy signal; when the price rises and touches the upper rail, the stock is considered overvalued, genTherefore considered to beerating a sell sign.  

## Strategy Principle

The core indicator of this strategy is Bollinger Bands. Bollinger Bands consist of three lines: middle rail, upper rail and lower rail. The middle rail is the n-day moving average closing price; the upper rail is the middle rail + k times the n-day standard deviation of the closing price; the lower rail is the middle rail - k times the n-day standard deviation of the closing price. The k value is usually set to 2. When the stock price is lower than the lower rail, it is at a relatively low price level, Therefore considered to be lowervalued, generating a buy signal; when the stock price is higher than the upper rail, it is at a relatively high price level and is considered overvalued, generating a sell signal.   

Specifically, this strategy first calculates the 20-day moving average of closing prices as the middle rail, and then calculates twice the 20-day standard deviation of closing prices as the bandwidth. The upper rail is the middle rail + bandwidth and the lower rail is the middle rail - bandwidth. It then sets the buy condition to be closing price lower than the lower rail, and sell condition to be closing price higher than the upper rail. It generates a buy signal when closing price is below the lower rail, and a sell signal when closing price is above the upper rail.  

## Advantage Analysis

This strategy has the following advantages:

1. The principle is simple and easy to understand and implement.  
2. It can track market trends and automatically generate buy and sell signals.
3. The risk of drawdown is relatively small with certain tracking stop-loss function.
4. It can filter out false breakouts and avoid wrong operations in sideways markets.
5. Parameters like period and standard deviation multiplier can be adjusted to adapt to different stocks and market environments.

## Risk Analysis   

There are also some risks with this strategy:

1. Bollinger Bands is not a perfect indicator for buy and sell points, signals may lag.
2. It cannot predict extreme market conditions, face black swan events like financial crises.  
3. Stock price may run on one side of the bands for long periods, resulting in insufficient signals.
4. Parameter settings like period length need optimization, otherwise it may be too sensitive or inert.

Corresponding solutions:

1. Combine with other indicators to confirm timing of trades  
2. Set stop loss and take profit to control maximum loss
3. Optimize parameters to improve adaptability  
4. Adopt composite strategies to avoid sole reliance  

## Optimization Directions   

The main optimization directions for this strategy includes:

1. Optimize Bollinger Bands parameters like trying different period lengths and standard deviation multiplier to find the optimal fitting parameters.  
2. Incorporate other indicators like KDJ, MACD etc. to filter buy/sell decisions to avoid Bollinger Bands lagging issue.
3. Apply machine learning algorithms to guide optimal parameter settings. 
4. Use deep learning to predict probability of price breaking out of bands.
5. Adopt composite strategies with backup trading strategies to avoid excessive dependence on single strategy.  

## Conclusion  

Overall, Bollinger Bands tracking strategy is a relatively simple and practical quantitative trading strategy. It can automatically track price trends and also provide buy and sell signals. The pros are easy implementation, smaller risks, filtering false breakouts. The cons are certain lagging, inability to face extreme market conditions like black swans. This strategy can be further enhanced through optimizing parameters and indicators, using more advanced techniques like machine learning. In summary, combining Bollinger Bands strategies with other technical strategies can form a robust and efficient quantitative trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Bollinger Bands Length|
|v_input_2|2|Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Bollinger Bands Strategy", shorttitle="BB Strategy", overlay=true)

// Input parameters
length = input(20, title="Bollinger Bands Length")
mult = input(2, title="Multiplier")

// Calculate Bollinger Bands
basis = ta.sma(close, length)
bb_upper = basis + mult * ta.stdev(close, length)
bb_lower = basis - mult * ta.stdev(close, length)

// Buy and sell conditions
buy_condition = close < bb_lower
sell_condition = close > bb_upper

// Execute trades
strategy.entry("Buy", strategy.long, when=buy_condition)
strategy.entry("Sell", strategy.short, when=sell_condition)

// Plotting Bollinger Bands on the chart
plot(bb_upper, color=color.red, title="Upper Band")
plot(bb_lower, color=color.green, title="Lower Band")
plot(basis, color=color.blue, title="Basis")

// Highlighting buy and sell signals on the chart
bgcolor(buy_condition ? color.new(color.green, 90) : na)
bgcolor(sell_condition ? color.new(color.red, 90) : na)

```

> Detail

https://www.fmz.com/strategy/443089

> Last Modified

2024-02-29 10:51:09
