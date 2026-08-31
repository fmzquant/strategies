
> Name

Moving-Average-Crossover-Strategy-427164

> Author

ChaoZhang

> Strategy Description


## Overview

The moving average crossover strategy is a trend following strategy based on moving average crossover as trading signals. It uses price crossover with moving averages and crossover between two moving averages as buy and sell signals to pursue profits.

## Strategy Principle

The main principles of this strategy are:

1. Calculate two moving averages, one fast and one slow, can choose SMA or EMA. 

2. Go long when fast line crosses above slow line, close position when fast line crosses below slow line.

3. Can choose price breakout or moving average crossover as trading signals. 

4. Can set time period for strategy execution.

5. Can only go long in bull market and only go short in bear market.

6. Optimize moving average parameters through backtesting for different periods.

The strategy utilizes the trend following capability of moving averages. When short term MA crosses above long term MA, it indicates an upward trend, should go long. vice versa, downward trend, should reduce position.

## Advantage Analysis  

The main advantages of this strategy:

1. Simple principle, easy to implement, clear trading signals.

2. Can effectively track trends and timely capture trading opportunities.

3. Can combine different MA parameters for various market environments. 

4. Can choose only long or only short to avoid uncertain reverse operations.

5. Can set strategy running time to avoid certain periods.

6. Can continuously improve strategy through parameter optimization.

## Risk Analysis

The main risks of this strategy:

1. Prone to false signals, avoid too frequent trading.

2. Performance relies on MA parameters, improper selection may lead to losses.

3. Certain lag exists, avoid premature entry and delayed exit.

4. Not suitable for range-bound market environments. 

5. MA crosses have some randomness, cannot completely avoid losses.

Risks can be reduced through volume confirmation, parameter optimization or using with other indicators.

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Add slope filter like %(Line - ShortMa)/ShortMa)/(Line - LongMa)/LongMa).

2. Optimize moving average periods, test different combinations. 

3. Add indicators like MACD or RSI for multiple confirmation.

4. Set stop loss to limit single trade loss.

5. Distinguish between trending and ranging markets for conditional use. 

6. Test different holding periods to find optimal scheme.

## Summary

The moving average crossover strategy is a simple and practical trend following strategy. The advantages are easy implementation and effective trend tracking. The disadvantages are lagging and prone to false signals. The strategy can be improved through parameter optimization and indicator filtering to achieve better performance in strong trending markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long Trades enabled|
|v_input_2|true|Short Trades enabled|
|v_input_3|0|Buy/Long Crossover Condition: price x MA1|price x MA2|MA1 x MA2|
|v_input_4|0|Sell/Short Crossunder Condition: price x MA2|price x MA1|MA1 x MA2|
|v_input_5|0|Moving Average 1 Type: SMA|EMA|
|v_input_6|20|Moving Average 1 Len|
|v_input_7|0|Moving Average 2 Type: SMA|EMA|
|v_input_8|30|Moving Average 2 Len|
|v_input_9|4|Strategy Start Month|
|v_input_10|2018|Strategy Start Year|
|v_input_11|12|Strategy End Month|
|v_input_12|2020|Strategy End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-09-17 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © gliese581d

//@version=4
strategy(title="Moving Averages Testing", overlay=true, precision=2, calc_on_every_tick=false, max_bars_back=5000, pyramiding=2,  
 default_qty_type=strategy.percent_of_equity, default_qty_value=50, commission_type=strategy.commission.percent, initial_capital=10000)


//SETTINGS

longs_on = input(title="Long Trades enabled", defval=true)
shorts_on = input(title="Short Trades enabled", defval=true)

long_cond = input(title="Buy/Long Crossover Condition", defval="price x MA1", options=["price x MA1", "price x MA2", "MA1 x MA2"])
short_cond = input(title="Sell/Short Crossunder Condition", defval="price x MA2", options=["price x MA1", "price x MA2", "MA1 x MA2"])

ma1_type = input(title="Moving Average 1 Type", defval="SMA", options=["SMA", "EMA"])
ma1_len = input(defval=20, title="Moving Average 1 Len", type=input.integer, minval=1, maxval=1000, step=1)
ma2_type = input(title="Moving Average 2 Type", defval="SMA", options=["SMA", "EMA"])
ma2_len = input(defval=30, title="Moving Average 2 Len", type=input.integer, minval=1, maxval=1000, step=1)


//MOVING AVERAGES

ma_1 = ma1_type == "EMA" ? ema(close, ma1_len) : sma(close, ma1_len)
ma_2 = ma2_type == "EMA" ? ema(close, ma2_len) : sma(close, ma2_len)


//STRATEGY

//trade entries
long_entry = long_cond == "price x MA1" ? crossover(close, ma_1) : long_cond == "price x MA2" ? crossover(close, ma_2) : long_cond == "MA1 x MA2" ? crossover(ma_1, ma_2) : false
short_entry = short_cond == "price x MA1" ? crossunder(close, ma_1) : short_cond == "price x MA2" ? crossunder(close, ma_2) : short_cond == "MA1 x MA2" ? crossunder(ma_1, ma_2) : false

start_month = input(defval=4, title="Strategy Start Month", type=input.integer, minval=1, maxval=12, step=1)
start_year = input(defval=2018, title="Strategy Start Year", type=input.integer, minval=2000, maxval=2025, step=1)
end_month = input(defval=12, title="Strategy End Month", type=input.integer, minval=1, maxval=12, step=1)
end_year = input(defval=2020, title="Strategy End Year", type=input.integer, minval=2000, maxval=2025, step=1)

in_time = true

strategy.entry("Long", strategy.long, when=longs_on and in_time and long_entry)
strategy.close("Long", when=longs_on and not shorts_on and short_entry)

strategy.entry("Short", strategy.short, when=shorts_on and in_time and short_entry)
strategy.close("Short", when=shorts_on and not longs_on and long_entry)


//PLOTTING

//color background
last_entry_was_long = nz(barssince(long_entry)[1], 5000) < nz(barssince(short_entry)[1], 5000)
bgcol = (longs_on and last_entry_was_long) ? color.green : (shorts_on and not last_entry_was_long) ? color.red : na
bgcolor(color=bgcol, transp=90)

plot((long_cond == "price x MA1" or long_cond == "MA1 x MA2") or (short_cond == "price x MA1" or short_cond == "MA1 x MA2") ? ma_1 : na, color=color.blue)
plot((long_cond == "price x MA2" or long_cond == "MA1 x MA2") or (short_cond == "price x MA2" or short_cond == "MA1 x MA2") ? ma_2 : na, color=color.black)
plotshape(long_entry, style=shape.triangleup, location=location.belowbar, color=color.green)
plotshape(short_entry, style=shape.triangledown, location=location.abovebar, color=color.red)
```

> Detail

https://www.fmz.com/strategy/427164

> Last Modified

2023-09-18 17:35:37
