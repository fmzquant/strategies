
> Name

RSI止损追踪交易策略-RSI-Stop-Loss-Tracking-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10f6c228565f48c047b.png)

### Overview

This strategy utilizes the Relative Strength Index (RSI) indicator to determine oversold market conditions. When the RSI falls below 30, a long position is entered, and the stop loss price is set at 98.5% of the entry price. The main idea behind this strategy is to enter the market when an oversold signal appears while strictly controlling risk. Once the price falls below the stop loss price, the position is immediately closed to stop the loss.

### Strategy Principle

1. Calculate the RSI indicator using the closing prices of 14 bars.
2. When the RSI falls below 30, an oversold signal is generated, and a long position is entered.
3. At the time of entry, record the entry price and calculate the stop loss price based on the entry price and the stop loss percentage (1.5%).
4. When the price falls below the stop loss price, immediately close the position to stop the loss.
5. After closing the position, reset the entry price and stop loss price, and wait for the next entry opportunity.

### Strategy Advantages

1. Simple and easy to understand, with clear logic, suitable for beginners to learn and use.
2. Strict risk control by setting a stop loss price. Once the stop loss price is triggered, the position is immediately closed, minimizing the expansion of losses.
3. Utilizes the RSI indicator to determine oversold conditions, allowing timely entry into the market after a short-term oversold period to seize rebound opportunities.
4. The code is concise and efficient, with fast execution speed, ensuring that trading signals are not missed.

### Strategy Risks

1. The RSI indicator is a lagging indicator, and there may be situations where the indicator is oversold, but the price continues to fall. In such cases, entering the market may face the risk of further losses.
2. A fixed stop loss percentage may not be able to dynamically respond to market volatility. In times of intense market fluctuations, a fixed stop loss may lead to frequent stop-outs, missing subsequent rebound opportunities.
3. The strategy lacks a profit target and relies entirely on stop losses to control risk, which may result in low overall profitability.

### Strategy Optimization Directions

1. Introduce other technical indicators in addition to the RSI indicator to assist in judgment and improve signal accuracy, such as MACD, KDJ, etc.
2. Optimize the stop loss percentage by testing different stop loss percentages based on historical data to find the optimal stop loss setting.
3. Add dynamic stop loss mechanisms such as trailing stop losses on top of the fixed stop loss to make stop losses more flexible and effective.
4. Set profit targets and actively close positions when a certain profit level is reached, rather than relying solely on stop losses for exiting.

### Summary

The RSI Stop Loss Tracking Trading Strategy uses the RSI indicator to determine oversold conditions while setting a fixed stop loss percentage to strictly control risk. The overall idea is simple and easy to understand, suitable for beginners to learn and use. However, this strategy also has problems such as lagging, simple stop loss mechanism, and low profitability. It needs to be continuously optimized and improved in actual application to enhance the stability and profitability of the strategy.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-01 00:00:00
end: 2024-02-29 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('RSI Trading Bot', overlay=true)

// RSI threshold value and stop loss percentage
rsiThreshold = 30
stopLossPercentage = 1.5

// Calculate RSI
rsiLength = 14
rsiValue = ta.rsi(close, rsiLength)

// Initialize variables
var bool positionOpen = false
var float entryPrice = na
var float stopLossPrice = na

// Enter position when RSI crosses below threshold
if ta.crossunder(rsiValue, rsiThreshold)
    strategy.entry('Long', strategy.long)
    positionOpen := true
    entryPrice := close
    stopLossPrice := entryPrice * (1 - stopLossPercentage / 100)
    stopLossPrice

// Exit position on stop loss
if positionOpen and close < stopLossPrice
    strategy.close('Long')
    positionOpen := false
    entryPrice := na
    stopLossPrice := na
    stopLossPrice

// Plot entry and stop loss prices
plot(entryPrice, title='Entry Price', color=color.new(color.green, 0), linewidth=2)
plot(stopLossPrice, title='Stop Loss Price', color=color.new(color.red, 0), linewidth=2)


```

> Detail

https://www.fmz.com/strategy/446458

> Last Modified

2024-03-28 17:56:58
