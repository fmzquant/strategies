
> Name

最后K线趋势跟踪策略Last-Candle-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13a550e34b2b67562bd.png)
[trans]

## 概述

最后K线策略是一种趋势跟踪策略,它通过分析最后一根K线的收盘价和开盘价的关系来判断市场趋势方向,从而产生交易信号。

## 策略原理

该策略的核心逻辑是:

1. 计算最后一根K线的开盘价和收盘价
2. 如果开盘价低于收盘价,判断为上涨趋势,产生买入信号
3. 如果开盘价高于收盘价,判断为下跌趋势,产生卖出信号
4. 根据产生的交易信号,开仓做多或做空
5. 设置止损和止盈价格,退出策略

具体来说,策略中通过请求最后一根K线的开盘价和收盘价数据,根据价格比较结果判断趋势方向。如果是上涨趋势,则在该K线收盘时以市价单开多单;如果是下跌趋势,则在该K线收盘时以市价单开空单。

之后设置止损和止盈价格。多单的止损价格为该K线的开盘价乘以一个系数,止盈价格为当前收盘价。空单则相反。当价格触发止损或止盈时,对应的仓位会被平仓退出。

## 优势分析

- 策略逻辑简单清晰,容易理解和实现
- 利用最后一个K线判断趋势,CAPTURE了最近的价格变化趋势
- 既有止损又有止盈,可以限制下行风险

## 风险分析

- 最后一个K线可能存在回调或震荡,增加 whipsaw 的概率
- 仅仅依据最后一个K线判断趋势可能会被套,应该结合趋势指标判断
- 回测数据不充分可能导致过拟合

可以通过结合趋势指标确认,优化止损止盈逻辑,扩大回测周期和市场环境来降低风险。

## 优化方向

- 可以结合MA, MACD等指标过滤入场时机
- 可以根据ATR来设置止损幅度
- 可以引入机器学习模型判断趋势方向
- 可以优化止损止盈策略,如移动止损、分批止盈等

## 总结

最后K线策略是一种简单的趋势跟踪策略。它通过最后一个K线快速判断趋势方向并交易。策略逻辑简单,易于实现,符合趋势跟踪的思路。同时设置有止损和止盈来控制风险。但仅仅依靠最后一个K线容易被套,应该与趋势指标结合使用。此外,此策略可扩展空间还很大,可以引入更多技术指标或机器学习模型以提高表现。

||


## Overview

The Last Candle strategy is a trend following strategy that determines market trend direction based on the relationship between the closing price and opening price of the last candlestick, and generates trading signals accordingly.  

## Strategy Logic

The core logic of this strategy is:

1. Calculate the opening price and closing price of the last candlestick
2. If the opening price is lower than the closing price, judge it as an uptrend and generate a buy signal  
3. If the opening price is higher than the closing price, judge it as a downtrend and generate a sell signal
4. Enter long or short positions based on the trading signals 
5. Set stop loss and take profit prices to exit positions

Specifically, the strategy requests the opening price and closing price data of the last candlestick, and determines the trend direction based on price comparison. If it is an uptrend, a market order to buy will be placed when the candlestick closes. If it is a downtrend, a market order to sell will be placed.

After that, stop loss and take profit prices are set. For long positions, the stop loss price is the opening price of that candlestick multiplied by a coefficient, and take profit price is the current closing price. For short positions it is the opposite. When price triggers either stop loss or take profit, the corresponding position will be closed.

## Advantage Analysis 

- Simple and clear strategy logic, easy to understand and implement
- Captures latest price change trend by using last candlestick 
- Has both stop loss and take profit to limit downside risk

## Risk Analysis

- Last candlestick may have pullback or sideways, increasing whipsaw probability
- Judging trend merely based on last candle may cause being trapped, should incorporate trend indicators
- Insufficient backtesting data may lead to overfitting

Risks can be reduced by incorporating trend indicators for confirmation, optimizing stop loss/take profit logic, expanding backtest period and market environments.

## Optimization Directions

- Incorporate MA, MACD etc. to filter entry timing
- Use ATR to set stop loss percentage 
- Introduce machine learning models to determine trend direction
- Optimize stop loss/take profit strategies, like trailing stop loss, partial take profits etc.

## Conclusion

The Last Candle strategy is a simple trend following strategy. It quickly judges trend direction using the last candlestick and trades accordingly. The logic is simple and easy to implement, aligning with the idea of trend following. Stop loss and take profit are also set to control risks. However, just relying on the last candlestick could easily get trapped, so it should be used together with trend indicators. Also, there is still large room for improving this strategy, by introducing more technical indicators or machine learning models.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-14 00:00:00
end: 2023-12-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Last Candle Strategy with Date Range", overlay=true)

// Define the start and end dates for the backtest
startDate = timestamp(2015, 01, 01, 00, 00)
endDate = timestamp(2023, 11, 24, 23, 59)

// Check if the current bar is within the specified date range
withinDateRange = time >= startDate and time <= endDate

// If outside the date range, skip the strategy logic
if (not withinDateRange)
    strategy.close_all()

// Calculate the opening and closing values for the last candle
lastCandleOpen = request.security(syminfo.tickerid, "D", open[1], lookahead=barmerge.lookahead_on)
lastCandleClose = request.security(syminfo.tickerid, "D", close[1], lookahead=barmerge.lookahead_on)

// Determine the trade direction based on the last candle
tradeDirection = lastCandleOpen < lastCandleClose ? 1 : -1  // 1 for buy, -1 for sell

// Plot the last candle's opening and closing values on the chart
plot(lastCandleOpen, color=color.blue, title="Last Candle Open")
plot(lastCandleClose, color=color.red, title="Last Candle Close")

// Execute strategy orders
if (withinDateRange)
    if (tradeDirection == 1)
        strategy.entry("Buy", strategy.long)

    if (tradeDirection == -1)
        strategy.entry("Sell", strategy.short)

// Set stop loss and take profit
stopLoss = 0.01 * lastCandleOpen
takeProfit = close

// Exit strategy
strategy.exit("StopLoss/Profit", from_entry="Buy", loss=stopLoss, profit=takeProfit)
strategy.exit("StopLoss/Profit", from_entry="Sell", loss=stopLoss, profit=takeProfit)


```

> Detail

https://www.fmz.com/strategy/436112

> Last Modified

2023-12-21 12:15:23
