
> Name

基于短期和长期移动平均线交叉策略MA-Crossover-Trading-Strategy-Based-on-Short-term-and-Long-term-Moving-Average-Crossovers

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13fdefc96e895d12839.png)

## Overview

This strategy is a simple moving average crossover trading strategy based on short-term and long-term moving average crossovers. It uses 34-period and 89-period moving averages to observe their crossovers during the morning session as buy and sell signals. When the short-term moving average crosses above the long-term moving average from below, a buy signal is generated. When it crosses below from above, a sell signal is generated.

## Strategy Logic

The core logic of this strategy is based on crossovers between short-term and long-term moving averages as trading signals. Specifically, the strategy defines 34-period and 89-period short-term and long-term simple moving averages (SMAs). It only observes the crossovers between these two SMAs during the morning session (08:00 - 10:00). When the short-term SMA crosses above the long-term SMA from below, the market is considered to be in an upward trend, hence generating a buy signal. When the short-term SMA crosses below the long-term SMA from above, the market is considered to be in a downward trend, thus generating a sell signal.  

Upon receiving a buy or sell signal, the strategy will enter a position and set a condition to exit the position, which is to take profit after holding for a specified number of candles (default is 3 candles) since entry. This allows locking in partial profits and avoids further losses.

It should be noted that the strategy only identifies crossover signals during the morning session. This is because this time frame has higher trading volumes and trend change signals are more reliable. Other time frames have larger price fluctuations and are easier to generate false signals.

## Advantage Analysis

The strategy has the following advantages:

1. Using simple and universal moving average crossover rules, easy to understand, suitable for beginners

2. Only identifying signals during morning session where quality signals are abundant, which filters out false signals during other time frames  

3. Has stop loss conditions that allow timely stop loss, locking in partial profits, and reducing risk of loss

4. Many customizable parameters that can be adjusted based on market conditions and personal trading style

5. Easily extensible to combine with other indicators to design more complex strategies

## Risk Analysis

The strategy also has some risks, mainly from the following aspects:

1. Moving averages themselves have greater lagging attributes, may miss short-term price reversal points 

2. Relies solely on simple indicators, prone to failure in certain market environments (trend shocks, range-bound, etc.)

3. Improper stop loss positioning may cause unnecessary losses

4. Improper parameter settings (moving average periods, holding periods, etc.) may also affect strategy performance

Corresponding solutions:

1. Incorporate other leading indicators to improve sensitivity to short-term changes

2. Add filtering conditions to avoid being affected by false signals during shocks and range-bound markets  

3. Optimize stop loss logic and dynamically adjust stop loss range based on market volatility

4. Multi-parameter optimization to find optimal parameter settings

## Optimization Directions

The strategy also has great potential for optimization, mainly from the following aspects:  

1. Add other filtering conditions to avoid false signals during shocks and range-bound markets

2. Incorporate momentum indicators to identify stronger breakout signals 

3. Optimize the moving average period parameters to find the best parameter combination

4. Automatically optimize the stop loss range based on market volatility  

5. Attempt to automatically optimize the entire strategy based on machine learning techniques

6. Attempt to combine with other strategies to design more complex multi-strategy systems

## Conclusion

In general, this strategy is relatively simple and practical, suitable for beginners to learn from. It embodies the typical pattern of moving average crossover strategies and uses stops to control risks. However, further optimizations can be made to improve performance for more market conditions. Investors can leverage this basic framework to design more advanced quantitative trading strategies.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|34|Short SMA Length|
|v_input_2|89|Long SMA Length|
|v_input_3|3|Exit after how many candles?|
|v_input_4|true|Exit at Open?|
|v_input_5|0800-1000|Morning Session|


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
strategy("34 89 SMA Crossover Strategy", overlay=true)

// Define the length for the SMAs
short_length = input(34, title="Short SMA Length")
long_length = input(89, title="Long SMA Length")
exit_candles = input(3, title="Exit after how many candles?")
exit_at_open = input(true, title="Exit at Open?")

// Define morning session
morning_session = input("0800-1000", "Morning Session")

// Calculate SMAs
short_sma = ta.sma(close, short_length)
long_sma = ta.sma(close, long_length)

// Function to check if current time is within specified session
in_session(session) =>
    session_start = na(time(timeframe.period, "0800-1000")) ? na : true
    session_start

// Condition for buy signal (short SMA crosses over long SMA) within specified trading hours
buy_signal = ta.crossover(short_sma, long_sma)

// Condition for sell signal (short SMA crosses under long SMA) within specified trading hours
sell_signal = ta.crossunder(short_sma, long_sma)

// Function to exit the trade after specified number of candles
var int trade_entry_bar = na
var int trade_exit_bar = na
if (buy_signal or sell_signal)
    trade_entry_bar := bar_index
if (not na(trade_entry_bar))
    trade_exit_bar := trade_entry_bar + exit_candles

// Exit condition
exit_condition = (not na(trade_exit_bar) and (exit_at_open ? bar_index + 1 >= trade_exit_bar : bar_index >= trade_exit_bar))

// Execute trades
if (buy_signal)
    strategy.entry("Buy", strategy.long)
if (sell_signal)
    strategy.entry("Sell", strategy.short)
if (exit_condition)
    strategy.close("Buy")
    strategy.close("Sell")

// Plot SMAs on the chart
plot(short_sma, color=color.blue, linewidth=1)
plot(long_sma, color=color.red, linewidth=1)

```

> Detail

https://www.fmz.com/strategy/442517

> Last Modified

2024-02-22 15:36:49
