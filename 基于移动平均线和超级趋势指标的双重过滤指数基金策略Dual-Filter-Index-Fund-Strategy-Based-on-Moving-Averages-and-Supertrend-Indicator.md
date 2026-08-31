
> Name

基于移动平均线和超级趋势指标的双重过滤指数基金策略Dual-Filter-Index-Fund-Strategy-Based-on-Moving-Averages-and-Supertrend-Indicator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14a5dbce03ec93cfdc5.png)

## Overview

This strategy combines two commonly used technical indicators: moving averages and the supertrend indicator. It captures market trends through a dual-filter approach and makes trades based on the trend direction. The main idea of the strategy is to use the crossover of fast and slow moving averages to determine the formation of a trend, while using the supertrend indicator to confirm the trend direction, thereby filtering out false signals and improving trading accuracy.

## Strategy Principle

The strategy utilizes two technical indicators: moving averages and the supertrend indicator.

Moving averages are a popular trend-following indicator that determines price movements by calculating the average price over a certain period. This strategy uses two simple moving averages (SMA) with different periods: a 10-period SMA and a 30-period SMA. When the fast moving average (10-period SMA) crosses above the slow moving average (30-period SMA), it indicates a potential uptrend; when the fast moving average crosses below the slow moving average, it indicates a potential downtrend.

The supertrend indicator is a trend-following indicator that determines the trend direction by comparing the current closing price with the average true range (ATR) over a certain period. This strategy uses a 7-period ATR and a multiplier factor of 2.0 to calculate the supertrend indicator. When the supertrend indicator shows an uptrend, it suggests that the market may be in a bullish phase; when the supertrend indicator shows a downtrend, it suggests that the market may be in a bearish phase.

The strategy generates trading signals by combining moving averages and the supertrend indicator. When the fast moving average crosses above the slow moving average and the supertrend indicator shows an uptrend, a buy signal is triggered; when the fast moving average crosses below the slow moving average and the supertrend indicator shows a downtrend, a sell signal is triggered. This dual-filter mechanism can effectively reduce false signals and improve trading accuracy.

In terms of trade execution, the strategy employs a fixed stop-loss and take-profit approach. When buying, the stop-loss price is set at the lowest price minus 1% of the price range, and the take-profit price is set at the highest price plus 2% of the price range. When selling, the stop-loss price is set at the highest price plus 1% of the price range, and the take-profit price is set at the lowest price minus 2% of the price range. This fixed stop-loss and take-profit approach can effectively control risks and lock in profits.

## Advantage Analysis

1. Dual-filter mechanism: The strategy combines moving averages and the supertrend indicator to generate trading signals through a dual-filter approach, which can effectively reduce false signals and improve trading accuracy.

2. Strong trend-following ability: Both moving averages and the supertrend indicator are commonly used trend-following indicators that can effectively capture market trends, making them suitable for trading in trending markets.

3. Risk control measures: The strategy employs a fixed stop-loss and take-profit approach, which can effectively control risks and lock in profits, avoiding excessive losses and profit givebacks.

4. Adjustable parameters: The parameters of the strategy, such as the periods of moving averages and the parameters of the supertrend indicator, can be adjusted based on different market conditions and trading styles, providing a certain level of flexibility.

## Risk Analysis

1. Parameter optimization risk: The performance of the strategy may be sensitive to parameter selection, and different parameter combinations may lead to different results. Therefore, in practical application, parameters need to be optimized and tested to find the optimal combination.

2. Market risk: The strategy is suitable for trending markets. In choppy markets or markets with frequent unexpected events, it may generate more false signals, leading to frequent trades and capital losses. Therefore, in practical application, it is necessary to combine market conditions and other analysis methods for comprehensive judgment.

3. Stop-loss and take-profit risk: The strategy uses a fixed stop-loss and take-profit approach, which can control risks and lock in profits, but it may also limit the profit potential of the strategy. In practical application, more flexible stop-loss and take-profit strategies, such as trailing stop-loss and dynamic take-profit, can be considered.

## Optimization Directions

1. Parameter optimization: Optimize the key parameters of the strategy, such as the periods of moving averages and the parameters of the supertrend indicator, and find the optimal parameter combination through backtesting and forward testing to improve the stability and profitability of the strategy.

2. Adding other filter conditions: In addition to moving averages and the supertrend indicator, other technical indicators or fundamental factors can be considered as filter conditions, such as trading volume, relative strength index (RSI), macroeconomic data, etc., to further improve the reliability of trading signals.

3. Improving stop-loss and take-profit strategies: Consider using more flexible stop-loss and take-profit strategies, such as trailing stop-loss and dynamic take-profit, to adapt to different market conditions and price movements. This can provide the strategy with more profit potential while controlling risks.

4. Incorporating position management: Based on factors such as the strength of market trends and the risk tolerance of the account, dynamically adjust position sizes. Increase positions when the trend is strong, and decrease positions when the trend is weak or uncertain, to better control risks and improve returns.

## Summary

This strategy captures market trends and makes trades by combining moving averages and the supertrend indicator, forming a dual-filter mechanism. Its advantages lie in its strong trend-following ability and its effectiveness in reducing false signals, while controlling risks through a fixed stop-loss and take-profit approach. However, the strategy also has certain risks, such as parameter optimization risk, market risk, and stop-loss and take-profit risk, which need to be optimized and improved in practical application.

Optimization directions include parameter optimization, adding other filter conditions, improving stop-loss and take-profit strategies, and incorporating position management. By continuously optimizing and refining the strategy, its stability and profitability can be improved to better adapt to different market conditions.

Overall, this strategy provides a feasible approach for index fund trading by capturing market trends through technical analysis and adopting appropriate risk control measures, with the potential to achieve stable investment returns. However, every strategy has its limitations, and in practical application, it needs to be flexibly adjusted and optimized based on specific market conditions and one's own risk preferences to maximize its effectiveness.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|7|ATR Length|
|v_input_float_1|2|Factor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-02 00:00:00
end: 2024-03-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Index Fund Strategy", overlay=true)

// Moving Averages
fastMA = ta.sma(close, 10)
slowMA = ta.sma(close, 30)

// Supertrend Indicator
atrLength = input.int(7, "ATR Length", minval=1)
factor = input.float(2.0, "Factor", minval=0.1, step=0.1)
[supertrend, direction] = ta.supertrend(factor, atrLength)

// Entry Conditions
longCondition = ta.crossover(fastMA, slowMA) and direction > 0
shortCondition = ta.crossunder(fastMA, slowMA) and direction < 0

// Plot Entry Signals
plotshape(longCondition, style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small, title="Buy Signal")
plotshape(shortCondition, style=shape.triangledown, location=location.abovebar, color=color.red, size=size.small, title="Sell Signal")

// Strategy
if (longCondition)
    stopLoss = low - (high - low) * 0.01 // 1% stop loss
    takeProfit = high + (high - low) * 0.02 // 2% take profit
    strategy.entry("Buy", strategy.long, stop=stopLoss, limit=takeProfit)
else if (shortCondition)
    stopLoss = high + (high - low) * 0.01 // 1% stop loss
    takeProfit = low - (high - low) * 0.02 // 2% take profit
    strategy.entry("Sell", strategy.short, stop=stopLoss, limit=takeProfit)

```

> Detail

https://www.fmz.com/strategy/443986

> Last Modified

2024-03-08 14:13:40
