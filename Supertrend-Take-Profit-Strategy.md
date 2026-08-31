
> Name

Supertrend-Take-Profit-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16d6c6543354d063fd9.png)

## Overview

This strategy uses the Supertrend indicator to determine entry points, going long or short when the indicator reverses. It also sets three take profit orders at fixed profits of 2%, 5% and 10% to lock in gains at different levels.  

## Strategy Logic

The strategy utilizes the Supertrend indicator to identify trend direction. Supertrend is based on Average True Range and a multiplier factor. When price goes above the upper band it signals an overbought condition and when price falls below the lower band it signals an oversold condition. Therefore, the strategy detects reversals in Supertrend direction to determine entries.   

Specifically, when change in Supertrend is less than 0, it indicates the indicator has reversed from up to down, generating a long signal. When change in Supertrend is greater than 0, the indicator has reversed from down to up, generating a short signal. Upon receiving long or short signals, entry price is recorded and orders are placed.

The strategy also sets three take profit orders at 2%, 5% and 10% of the entry price, to lock in fixed target profits. The proportions of these orders are set at 25%, 50% and 25% respectively. After entry signals, these take profit orders are placed simultaneously to capture gains at different levels.  

## Advantage Analysis   

The strategy has the following advantages:

1. Using Supertrend for entries effectively captures trend reversal points for accurate long/short. 

2. Multiple take profit proportions allows locking in gains at different levels, reducing drawdowns.  

3. Conservative profit targets of 2%, 5% and 10% avoids overextension of profits leading to larger losses.

4. Simple and clear logic, easy to understand and modify, suitable for beginners.

## Risk Analysis

The strategy also has some risks:

1. Improper Supertrend parameters may cause missing reversal signals, leading to inaccurate entries.

2. Conservative take profit levels may miss opportunities to run profits further. 

3. Gaps and limit moves may trigger stops before Supertrend adjusts.

4. No stop loss condition means unlimited loss potential.

## Improvement Areas

Some ways the strategy can be optimized:

1. Test different Supertrend parameters to improve sensitivity.  

2. Add stop loss to limit maximum loss.

3. Adjust take profit ratios and quantities based on symbol and timeframe.

4. Add filters to avoid excessive trades in range-bound markets.

5. Optimize capital usage by adjusting default trade size to lower risk per trade.

## Summary

The strategy is simple and practical overall. It uses Supertrend for entries and multiple take profit orders to lock in gains, effectively controlling risk. But there is room for improvements like adding stops, optimizing parameters etc. which provides future enhancement directions. In summary, this strategy is suitable for beginners to learn and practice algorithmic trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Length|
|v_input_float_1|3|Factor|
|v_input_bool_1|true|TP1|
|v_input_float_2|2|TP Level (%)|
|v_input_int_1|25|Amount (%)|
|v_input_bool_2|true|TP2|
|v_input_float_3|5|TP Level (%)|
|v_input_int_2|50|Amount (%)|
|v_input_bool_3|true|TP3|
|v_input_float_4|10|TP Level (%)|
|v_input_int_3|25|Amount (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2024-01-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy( "Supertrend with TP", overlay=true )

// Supertrend Settings
atrPeriod = input(10, "ATR Length")
factor = input.float(3.0, "Factor", step = 0.01)

// TP's
tp1Open = input.bool(true, "TP1")
tp1 = input.float(2.0, "TP Level (%)", step = 0.1) / 100
tp1Amount = input.int(25, "Amount (%)", step = 1)
tp2Open = input.bool(true, "TP2")
tp2 = input.float(5.0, "TP Level (%)", step = 0.1) / 100
tp2Amount = input.int(50, "Amount (%)", step = 1)
tp3Open = input.bool(true, "TP3")
tp3 = input.float(10.0, "TP Level (%)", step = 0.1) / 100
tp3Amount = input.int(25, "Amount (%)", step = 1)

[_, direction] = ta.supertrend(factor, atrPeriod)

entryPrice = 0.0
entryPrice := entryPrice[1]

if ta.change(direction) < 0
    strategy.entry("Long", strategy.long)
    entryPrice := close

if ta.change(direction) > 0
    strategy.entry("Short", strategy.short)
    entryPrice := close

if (tp1Open)
    strategy.exit ("TP1", from_entry="Long", limit=entryPrice * (1 + tp1), qty_percent=tp1Amount)
    strategy.exit ("TP1", from_entry="Short", limit=entryPrice * (1 - tp1), qty_percent=tp1Amount)

if (tp2Open)
    strategy.exit ("TP2", from_entry="Long", limit=entryPrice * (1 + tp2), qty_percent=tp2Amount)
    strategy.exit ("TP2", from_entry="Short", limit=entryPrice * (1 - tp2), qty_percent=tp2Amount)
    
if (tp3Open)    
    strategy.exit ("TP3", from_entry="Long", limit=entryPrice * (1 + tp3), qty_percent=tp3Amount)
    strategy.exit ("TP3", from_entry="Short", limit=entryPrice * (1 - tp3), qty_percent=tp3Amount)
```

> Detail

https://www.fmz.com/strategy/438016

> Last Modified

2024-01-08 11:08:39
