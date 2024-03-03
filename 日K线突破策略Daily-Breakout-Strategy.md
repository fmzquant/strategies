
> Name

日K线突破策略Daily-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16de630a330e35a2b5f.png)

[trans]

### 概述

日K线突破策略是一个基于日线K线的简单趋势跟踪策略。它通过观察前一日K线的收盘价与开盘价的关系来判断市场走势,从而产生交易信号。

### 策略原理

该策略的核心逻辑是:

如果前一日K线实体为绿色(收盘价高于开盘价),则说明前一日为上涨趋势,该策略会在次日开盘时做多;如果前一日K线实体为红色(收盘价低于开盘价),则说明前一日为下跌趋势,该策略会在次日开盘时做空。

通过这种简单的方式,策略能够判断最近一个K线周期内的市场走势,并据此进行交易。这样能够顺应最近的市场趋势,实现趋势跟踪交易。

具体来说,策略的交易信号产生如下:

1. 在每一交易日开盘时,获取前一日的K线数据
2. 比较前一日K线的开盘价和收盘价
3. 如果开盘价低于收盘价(绿色K线),产生做多信号,按照可用资金的比例做多
4. 如果开盘价高于收盘价(红色K线),产生做空信号,按照可用资金的比例做空
5. 使用止损退出做多做空头寸

通过这样的逻辑,策略能够抓住较短周期内的价格趋势,以获利。

### 策略优势

该策略主要具有以下几个优势:

1. **简单明了**。核心逻辑直接比较K线实体颜色,非常简洁,容易理解和实现。
2. **顺应趋势**。能够判断最近一个交易日的趋势方向,顺应较短周期的价格走势。
3. **灵活调整**。可以通过调整仓位比例、止损幅度等参数,调整策略的收益风险特征。
4. **容易优化**。如加入多个周期判断、数据拟合等,可以继续优化,提高策略稳定性。

### 风险与改进

该策略也存在一些风险与可优化的地方:  

1. **抓反弹风险**。策略仅看单日K线实体,可能在震荡行情中抓到反弹而不是趋势。这可以通过加入更多K线或指标作为盘整判断来优化。
2. **空头风险**。做空交易有无底风险,需要严格止损控制亏损。
3. **参数优化**。止损幅度、仓位大小等参数可继续优化,以平衡收益风险。
4. **技术指标结合**。可加入更多技术指标判断,提高策略稳定性。

### 总结

日K线突破策略通过简单有效的日线比较方式判断市场走势,能够抓住短周期趋势进行交易。策略优势在于简单明确,容易操作,但也存在被反弹截获的风险。通过进一步优化参数设定及加入更多技术指标,可以提高策略稳定性与可靠性。


||


### Overview

The daily breakout strategy is a simple trend following strategy based on daily candlestick charts. It generates trading signals by observing the relationship between the previous day's opening and closing prices to determine market momentum.  

### Strategy Logic  

The core logic of this strategy is:

If the previous day's candlestick body is green (closing price higher than opening price), it indicates an upward trend on that day. The strategy will go long at the next day's opening. If the previous day's candlestick body is red (closing price lower than opening price), it indicates a downward trend. The strategy will go short at the next day's opening.  

By this simple way, the strategy can identify the market momentum within the recent one candlestick cycle and make trades accordingly. This allows the strategy to follow the latest market trend.

Specifically, the strategy generates trading signals as follows:  

1. Get the previous trading day's candlestick data at market open each day  
2. Compare the opening and closing prices of that candlestick
3. If open < close (green candlestick), generate long signal, go long at a percentage of available funds  
4. If open > close (red candlestick), generate short signal, go short at a percentage of available funds
5. Use stop loss to exit positions  

Through this logic, the strategy can capitalize on short-term price trends.

### Advantages  

The main advantages of this strategy include:  

1. **Simplicity** - The core logic directly compares candlestick color and is very simple and clear.  
2. **Trend following** - It identifies the trend direction of the latest trading day, following shorter-term momentum. 
3. **Flexibility** - Parameters like position sizing, stop loss can be adjusted to modify risk vs. reward.  
4. **Optimization potential** - More enhancements can be added, like multiple timeframe analysis and data fitting to improve robustness.  

### Risks and Improvements

Some risks and improvement areas:

1. **Whipsaw risk** - It only looks at the daily candle, so may falsely buy pullbacks instead of actual trend in ranging markets. Additional timeframe or indicators can be added to judge consolidation.  
2. **Shorting risk** - Short positions have unlimited downside risk. Strict stop loss needs to be implemented.
3. **Parameter tuning** - Fine tune stop loss level, position sizing etc. to achieve better risk-adjusted returns.  
4. **Add indicators** - Incorporate more technical indicators to improve robustness and stability.

### Conclusion  

The daily breakout strategy identifies market momentum through simple and effective comparison of daily candlesticks, allowing it to trade in the direction of shorter-term trends. While simple and easy to implement, it has whipsaw risks. Further optimizations on parameters and additional indicators can enhance strategy reliability.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-26 00:00:00
end: 2023-08-30 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Daily Candle Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=0.0)

// Input parameters
initialCapital = 10000
riskFactor = 3500

// Calculate the opening and closing values for the last day's candle
lastDayOpen = request.security(syminfo.tickerid, "D", open[1], lookahead=barmerge.lookahead_on)
lastDayClose = request.security(syminfo.tickerid, "D", close[1], lookahead=barmerge.lookahead_on)

// Determine the color of the last day's candle
lastDayColor = lastDayOpen < lastDayClose ? color.green : color.red

// Plot the last day's candle on the chart
plotshape(series=na, color=lastDayColor, style=shape.triangledown, location=location.abovebar)

// Calculate trade size based on available capital at last day's closing
availableCapital = strategy.equity
tradeSize = availableCapital / riskFactor

// Trading conditions
buyCondition = lastDayColor == color.green
sellCondition = lastDayColor == color.red

// Execute strategy orders with calculated trade size
strategy.entry("Buy", strategy.long, qty=tradeSize, when=buyCondition)
strategy.entry("Sell", strategy.short, qty=tradeSize, when=sellCondition)

// Exit strategy
stopLoss = 0.001 * lastDayOpen * tradeSize
strategy.exit("StopLoss/Profit", from_entry="Buy", loss=stopLoss)
strategy.exit("StopLoss/Profit", from_entry="Sell", loss=stopLoss)

// Plot stop loss level on the chart
plot(stopLoss, color=color.red, linewidth=2, title="Stop Loss")


```

> Detail

https://www.fmz.com/strategy/437411

> Last Modified

2024-01-02 13:57:42
