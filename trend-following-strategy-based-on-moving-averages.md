
> Name

trend-following-strategy-based-on-moving-averages

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/1e9d8e9eed0fbd3c3e9.png)


## Overview

The dual moving average crossover strategy is a trend-following strategy based on moving averages. It generates trading signals by calculating moving averages of different periods and identifying crossovers. This strategy uses a fast moving average and a slow moving average to form signals. When the fast MA crosses above the slow MA, it takes a bullish stance and buys. When the fast MA crosses below the slow MA, it takes a bearish stance and sells.

## Strategy Logic

This strategy mainly relies on MA crossovers to generate trading signals. Specifically, it involves the following steps:

1. Calculate the fast MA and slow MA. The fast MA period is 10, and the slow MA period is 50. 

2. Identify MA relationships. A buy signal is generated when the fast MA crosses above the slow MA. A sell signal is generated when the fast MA crosses below the slow MA.

3. Issue buy and sell signals. Go long when a buy signal occurs. Go short when a sell signal occurs.

4. Set stop loss and take profit. After entering a trade, set the stop loss based on the input percentage and take profit to manage risks.

By comparing price trend changes across different timeframes, this strategy determines whether the market is currently in an uptrend or downtrend. It is a typical trend-following strategy. MAs filter out market noise and generate more reliable trading signals.

## Advantages

- Effectively captures mid to long-term trends using the inherent trend-following nature of MAs.

- Simple and clear crossover signals that are easy to implement. 

- Customizable fast and slow periods for parameter optimization.

- Limits losses on individual trades through stop loss.

## Risks

- Prone to whipsaws and overtrading in range-bound markets.

- MAs have lag and may miss short-term opportunities. 

- Does not account for sudden events like significant bearish news.

- Lacks risk management mechanisms and could lead to losses beyond risk tolerance.

Risk Management:

1. Optimize MA periods to reduce false signals during consolidations.

2. Add other indicators as filters to address MA lag.

3. Supplement with news analytics. 

4. Implement stop loss and position sizing to limit losses.

## Enhancements

- Combine with other analytical tools like channels and patterns to improve signal quality.

- Optimize fast and slow MA parameters to find best combinations. 10-30 days for fast MA and 20-120 days for slow MA often work well. 

- Add position sizing rules. Fixed fractional position sizing can improve profits in trends.

- Incorporate logic to handle sudden events like halting trading after major bearish news.

- Backtest and paper trade to evaluate performance and continuously improve the system.

## Summary

The dual moving average crossover strategy identifies trend direction by comparing fast and slow MA crossovers. It is a simple and practical trend-following approach. While effective, it has some limitations that can be addressed through optimizations like parameter tuning, adding filters, and incorporating other tools. With appropriate risk control, this strategy can provide good returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Fast MA Length|
|v_input_2|50|Slow MA Length|
|v_input_3|true|Stop Loss Percentage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-30 00:00:00
end: 2023-10-30 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Simple Moving Average Crossover", overlay=true)

// Input parameters
fast_length = input(10, title="Fast MA Length")
slow_length = input(50, title="Slow MA Length")
stop_loss_pct = input(1, title="Stop Loss Percentage", minval=0, maxval=5) / 100

// Calculate moving averages
fast_ma = sma(close, fast_length)
slow_ma = sma(close, slow_length)

// Plot moving averages
plot(fast_ma, color=color.blue, title="Fast MA")
plot(slow_ma, color=color.red, title="Slow MA")

// Strategy logic
long_condition = crossover(fast_ma, slow_ma)
short_condition = crossunder(fast_ma, slow_ma)

// Execute trades
if (long_condition)
    strategy.entry("Long", strategy.long)

if (short_condition)
    strategy.entry("Short", strategy.short)

// Set stop loss
long_stop_price = close * (1 - stop_loss_pct)
short_stop_price = close * (1 + stop_loss_pct)

strategy.exit("Stop Loss/Profit", from_entry="Long", stop=long_stop_price)
strategy.exit("Stop Loss/Profit", from_entry="Short", stop=short_stop_price)

```

> Detail

https://www.fmz.com/strategy/430658

> Last Modified

2023-10-31 14:00:47
