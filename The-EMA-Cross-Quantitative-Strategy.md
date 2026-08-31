
> Name

The-EMA-Cross-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/110ce9dcf44a0d13c1a.png)

## Overview

This strategy is based on the cross signals of two exponential moving averages (EMAs) for trading. When the short-term EMA crosses above the long-term EMA, it opens a long position; when the short-term EMA crosses below the long-term EMA, it closes the position. The strategy also introduces a stop-loss mechanism and a trading time filter to control risks and optimize strategy performance.

## Strategy Principles

This strategy uses two EMAs with different periods as the basis for trend judgment. Compared to simple moving averages (SMAs), EMAs can respond to price changes more quickly and have a more reasonable weight distribution. When the short-term EMA crosses above the long-term EMA, it indicates that the price may form an upward trend, and a long position is opened; conversely, when the short-term EMA crosses below the long-term EMA, it indicates that the upward trend may end, and the position is closed.

In addition to the moving average cross signals, the strategy also introduces a stop-loss mechanism. On the one hand, a fixed percentage stop-loss is set, that is, when the price drops by more than a specific percentage relative to the opening price, the position is forcibly closed to control losses; on the other hand, it is also possible to choose to close the position when the closing price is lower than the closing price of the previous candlestick. These two stop-loss methods can effectively control the strategy drawdown.

Moreover, the strategy also introduces a trading time filter. Users can set the start and end times of allowed trading by themselves, thus avoiding trading during specific time periods (such as holidays, non-trading hours, etc.).

## Advantage Analysis

1. Simple and easy to use: The strategy logic is clear and uses only two EMAs as trading signals, which is easy to understand and implement.

2. Trend tracking: EMAs can quickly respond to price changes, enabling the strategy to capture trend formation and ending in a timely manner, thereby obtaining trend-tracking profits.

3. Risk control: Introducing a fixed percentage stop-loss and a stop-loss based on the closing price of the previous candlestick can effectively control single-transaction losses and drawdowns.

4. Flexible parameters: Users can adjust parameters such as EMA period, stop-loss percentage, whether to use the closing price of the previous candlestick for stop-loss, trading time period, etc., according to their own needs, thus optimizing the strategy performance.

## Risk Analysis

1. Parameter optimization risk: The performance of the strategy depends on the selection of parameters such as EMA period and stop-loss percentage, and inappropriate parameters may lead to poor strategy performance. Therefore, it is necessary to perform parameter optimization and backtesting on historical data to select the optimal parameters.

2. Market risk: The strategy is mainly applicable to trending markets. In a volatile market or trend reversal, frequent trading may lead to large drawdowns. Therefore, it is necessary to adjust strategy parameters or stop using the strategy according to market conditions.

3. Cost risk: The strategy may generate a large number of trades, thereby increasing transaction costs. Therefore, it is necessary to select appropriate trading targets and volumes, and control the cost of each transaction.

## Optimization Direction

1. Introduce more technical indicators: On the basis of EMA cross signals, introduce other technical indicators such as RSI and MACD to form multi-factor trading signals and improve the accuracy of trend judgment.

2. Dynamic stop-loss: Dynamically adjust the stop-loss position according to indicators such as market volatility and ATR, while controlling risks and minimizing the loss of profits caused by stop-loss as much as possible.

3. Position management: Dynamically adjust the position size according to the strength of the market trend, the degree of price deviation from the moving average, etc., increase the position when the trend is strong, and decrease the position when the trend weakens or is unclear.

4. Machine learning optimization: Use machine learning algorithms to optimize strategy parameters and automatically select the optimal parameter combination, improve strategy returns and reduce overfitting risks.

## Conclusion

This EMA cross quantitative strategy uses the cross signals of two EMAs to judge the trend, while introducing a stop-loss mechanism and a trading time filter, achieving a good balance between trend tracking ability and risk control. Although the strategy logic is simple, it can obtain stable returns in trending markets through reasonable parameter optimization and risk control. In the future, the strategy can be improved from aspects such as introducing more technical indicators, dynamic stop-loss, position management, and machine learning optimization, to further improve the strategy performance and robustness. In general, this strategy is an easy-to-understand and easy-to-implement quantitative trading strategy, suitable for entry-level quantitative traders to learn and use.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|200|(?Strategy Parameters)MA 1 Length|
|v_input_int_2|10|MA 2 Length|
|v_input_float_1|0.1|Stop Loss Percent|
|v_input_bool_1|false|Exit On Lower Close|
|v_input_1|timestamp(01 Jan 1995 13:30 +0000)|(?Time Filter)Start Filter|
|v_input_2|timestamp(1 Jan 2099 19:30 +0000)|End Filter|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-02 00:00:00
end: 2024-03-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ZenAndTheArtOfTrading / www.PineScriptMastery.com
// @version=5
strategy("EMA strategy", 
     overlay=true, 
     initial_capital=50000,
     default_qty_type=strategy.percent_of_equity, 
     default_qty_value=100, // 100% of balance invested on each trade
     commission_type=strategy.commission.cash_per_contract, 
     commission_value=0.005) // Interactive Brokers rate

// Get user input
i_ma1           = input.int(title="MA 1 Length", defval=200, step=10, group="Strategy Parameters", tooltip="Long-term MA")
i_ma2           = input.int(title="MA 2 Length", defval=10, step=10, group="Strategy Parameters", tooltip="Short-term MA")
i_stopPercent   = input.float(title="Stop Loss Percent", defval=0.10, step=0.1, group="Strategy Parameters", tooltip="Failsafe Stop Loss Percent Decline")
i_lowerClose    = input.bool(title="Exit On Lower Close", defval=false, group="Strategy Parameters", tooltip="Wait for a lower-close before exiting above MA2")
i_startTime     = input(title="Start Filter", defval=timestamp("01 Jan 1995 13:30 +0000"), group="Time Filter", tooltip="Start date & time to begin searching for setups")
i_endTime       = input(title="End Filter", defval=timestamp("1 Jan 2099 19:30 +0000"), group="Time Filter", tooltip="End date & time to stop searching for setups")

// Get indicator values
ma1 = ta.ema(close, i_ma1)
ma2 = ta.ema(close, i_ma2)

// Check filter(s)
f_dateFilter = true

// Check buy/sell conditions
var float buyPrice = 0
buyCondition    = close > ma1 and strategy.position_size == 0 and f_dateFilter
sellCondition   = close < ma2 and strategy.position_size > 0 //and (not i_lowerClose or close < low[1])
stopDistance    = strategy.position_size > 0 ? ((buyPrice - close) / close) : na
stopPrice       = strategy.position_size > 0 ? buyPrice - (buyPrice * i_stopPercent) : na
stopCondition   = strategy.position_size > 0 and stopDistance > i_stopPercent

// Enter positions
if buyCondition
    strategy.entry(id="Long", direction=strategy.long)

if buyCondition[1]
    buyPrice := open

// Exit positions
if sellCondition or stopCondition
    strategy.close(id="Long", comment="Exit" + (stopCondition ? "SL=true" : ""))
    buyPrice := na

// Draw pretty colors
plot(buyPrice, color=color.lime, style=plot.style_linebr)
plot(stopPrice, color=color.red, style=plot.style_linebr, offset=-1)
plot(ma1, color=color.blue)
plot(ma2, color=color.orange)
```

> Detail

https://www.fmz.com/strategy/443988

> Last Modified

2024-03-08 14:18:21
