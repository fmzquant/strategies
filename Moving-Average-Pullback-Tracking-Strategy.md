
> Name

Moving-Average-Pullback-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11c06044bcd0635e8ee.png)

### Overview

The main idea of this strategy is to use two moving averages with different periods to capture the rebound opportunity after a market pullback. When the price is above the long-term moving average and pulls back to the short-term moving average, the strategy opens a long position and closes the position when the price rises back above the short-term moving average or hits the stop-loss price. By seeking buying opportunities during pullbacks in a trend, the strategy aims to profit from trending markets.

### Strategy Principle

1. Calculate two moving averages with different periods (MA1 and MA2), where MA1 is the long-term moving average and MA2 is the short-term moving average.
2. When the closing price is above MA1 and below MA2, and there is no current position, and the current time is within the specified trading time range, the strategy opens a long position.
3. Record the entry price as buyPrice and calculate the stop-loss price stopPrice (i.e., i_stopPercent percentage below the entry price).
4. When the closing price rises back above MA2 and i_lowerClose is false, or when the closing price falls below the stop-loss price stopPrice, the strategy closes the position.
5. If i_lowerClose is true, the strategy closes the position when the closing price is above MA2 and the previous candle's closing price is below MA2.

### Strategy Advantages

1. Trend following: By determining the overall trend based on the relative position of the price and the long-term moving average, the strategy seeks entry opportunities within the trend.
2. Pullback buying: By looking for buying opportunities when the price pulls back to the short-term moving average during an uptrend, the strategy improves the cost-effectiveness of entry points.
3. Stop-loss protection: Setting a stop-loss price helps effectively control downside risk when the price moves adversely by a certain magnitude.
4. Flexible parameters: Users can flexibly set parameters such as moving average periods, stop-loss percentage, and whether to close the position when the previous candle's closing price is below the short-term moving average, according to their preferences.

### Strategy Risks

1. Parameter optimization: Different parameter settings have a significant impact on the strategy's performance, requiring parameter optimization and backtesting in different market environments to find the optimal parameter combination.
2. Choppy markets: In choppy markets, prices frequently fluctuate between the long-term and short-term moving averages, potentially leading to frequent opening and closing of positions and eroding trading costs.
3. Trend reversal: When a market trend reverses, the strategy may experience consecutive losses. At this point, it is necessary to combine other indicators or signals to judge the trend reversal and adjust the strategy in a timely manner.
4. Black swan events: When the market experiences major, unpredictable sudden events, prices may fluctuate drastically, triggering stop-losses and exposing the strategy to significant losses.

### Strategy Optimization Directions

1. Trend judgment: Introduce more trend judgment indicators, such as ADX, before opening a position to confirm the strength and direction of the current trend and improve the accuracy of entry signals.
2. Dynamic stop-loss: Dynamically adjust the stop-loss level based on indicators such as price volatility and ATR, widening the stop-loss when price volatility is high and tightening it when price volatility is low.
3. Position sizing: Dynamically adjust the position size of each entry based on factors such as market trend strength and price volatility, increasing the position size when the trend is strong and volatility is moderate, and decreasing the position size when the trend is weak or volatility is too high.
4. Long-short hedging: Consider simultaneously monitoring signals from both long and short sides and hedging positions in different markets or timeframes to reduce the overall risk of the strategy.

### Summary

The Moving Average Pullback Tracking Strategy captures long trading opportunities during price pullbacks in an uptrend by using the relative position of two moving averages with different periods. This strategy is suitable for trending markets, and with appropriate parameter settings and stop-losses, it can generate stable returns in trending conditions. However, the strategy faces certain risks in choppy markets and during trend reversals. By introducing more indicators, optimizing position sizing, implementing dynamic stop-losses, and other methods, the performance and stability of this strategy can be further improved.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|200|(?Strategy Parameters)MA 1 Length|
|v_input_int_2|10|MA 2 Length|
|v_input_float_1|0.1|Stop Loss Percent|
|v_input_bool_1|false|Exit On Lower Close|
|v_input_1|timestamp(26 Jan 2023 00:00 +0000)|(?Time Filter)Start Filter|
|v_input_2|timestamp(26 Mar 2024 23:59 +0000)|End Filter|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-22 00:00:00
end: 2024-03-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © contapessoal_ivan
// @version=5
strategy("Pullback Strategy", 
     overlay=true, 
     initial_capital=1000,
     default_qty_type=strategy.percent_of_equity, 
     default_qty_value=100, // 100% of balance invested on each trade
     commission_type=strategy.commission.cash_per_contract, 
     commission_value=0.005) // Interactive Brokers rate

// Get user input
i_ma1           = input.int(title="MA 1 Length", defval=200, step=10, group="Strategy Parameters", tooltip="Long-term MA")
i_ma2           = input.int(title="MA 2 Length", defval=10, step=10, group="Strategy Parameters", tooltip="Short-term MA")
i_stopPercent   = input.float(title="Stop Loss Percent", defval=0.10, step=0.1, group="Strategy Parameters", tooltip="Failsafe Stop Loss Percent Decline")
i_lowerClose    = input.bool(title="Exit On Lower Close", defval=false, group="Strategy Parameters", tooltip="Wait for a lower-close before exiting above MA2")
i_startTime     = input(title="Start Filter", defval=timestamp("26 Jan 2023 00:00 +0000"), group="Time Filter", tooltip="Start date & time to begin searching for setups")
i_endTime       = input(title="End Filter", defval=timestamp("26 Mar 2024 23:59 +0000"), group="Time Filter", tooltip="End date & time to stop searching for setups")

// Get indicator values
ma1 = ta.sma(close, i_ma1)
ma2 = ta.sma(close, i_ma2)

// Check filter(s)
f_dateFilter = true

// Check buy/sell conditions
var float buyPrice = 0
buyCondition    = close > ma1 and close < ma2 and strategy.position_size == 0 and f_dateFilter
sellCondition   = close > ma2 and strategy.position_size > 0 and (not i_lowerClose or close < low[1])
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

https://www.fmz.com/strategy/446459

> Last Modified

2024-03-28 18:00:05
