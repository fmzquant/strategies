
> Name

Golden-Cross-Dead-Cross-Dual-Moving-Average-MACD-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e5a063bb429afb6d1d.png)

## Overview

This strategy judges the price trend through calculating the fast moving average, slow moving average, and MACD indicator, and constructs the golden cross and dead cross trading signals. It also combines take profit, stop loss and trailing stop loss to lock in profits and continuously track the trend.

## Strategy Logic

This strategy is mainly constructed based on three indicators. 

Firstly, it calculates the fast moving average and two slow moving averages. When the fast MA goes above the two slow MAs, a buy signal is generated. When the fast MA goes below the two slow MAs, a sell signal is generated. This judges the relationship between the short-term and long-term trends to realize golden cross and dead cross trading.

Secondly, it calculates the MACD indicator, including MACD line, signal line and histogram. When MACD histogram > 0, it is a bullish indicator; when MACD histogram < 0, it is a bearish indicator. This helps to judge the reliability of golden cross and dead cross signals.   

Finally, it incorporates the take profit, stop loss and trailing stop loss mechanisms. Take profit and stop loss points are used to lock in profits and control risks; trailing stop loss is used to keep tracking profits.

## Advantages

The advantages of this strategy include:

1. Golden cross, dead cross combined with MACD reliably judge price trend. 
2. Stop loss points prevent enlarged losses.
3. Trailing stop loss moves automatically to lock in profits continuously and maximize trend profits.
4. Flexible parameter settings like customized moving average periods.

## Risks

There are also some risks:  

1. Price shocks may trigger stop loss points.  
2. Long-term running of trailing stop loss needs continuous monitoring and timely adjustment.
3. Improper parameter settings may lead to overtrading or missing trades.

The solutions are:

1. Set proper stop loss points to prevent unnecessary stop loss.
2. Regularly check and optimize parameter settings.  
3. Manual intervention and status monitoring.

## Optimization Directions

The strategy can also be optimized from the following aspects:

1. Add more indicators like RSI to make signals more reliable.
2. Optimize moving average parameters to suit different trading instruments. 
3. Add dynamic trailing stop algorithms to make stop points change with market.
4. Add position sizing and risk management modules.

## Summary

In summary, this is a simple yet effective strategy that uses golden cross, dead cross and MACD to judge trend and realize trailing stop loss. The advantages are trend tracking and profit locking with high customizability. It is a universal parameter optimization strategy suitable for different trading instruments. There are still some risks and optimization space, but overall it is a reliable and practical trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Fast MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|5|Fast MA Period|
|v_input_3_low|0|Slow MA1 Source: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|85|Slow MA Period|
|v_input_5_low|0|Slow MA2 Source: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|75|Slow MA Period|
|v_input_7|12|Fast MACD Period|
|v_input_8|26|Slow MACD Period|
|v_input_9|9|SMA MACD Period|
|v_input_10|30|Take Profit|
|v_input_11|10|Stop Loss|
|v_input_12|5|Trailing Stop Loss|
|v_input_13|false|Trailing Stop Loss Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-14 00:00:00
end: 2023-12-21 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy('The Puria Method', shorttitle = 'Puria',overlay = true)

//=== GENERAL INPUTS ===

// short ma
maFastSource   = input(defval = close, title = "Fast MA Source")
maFastLength   = input(defval = 5, title = "Fast MA Period", minval = 1)

// long ma 1
maSlow1Source   = input(defval = low, title = "Slow MA1 Source")
maSlow1Length   = input(defval = 85, title = "Slow MA Period", minval = 1)

// long ma 2
maSlow2Source   = input(defval = low, title = "Slow MA2 Source")
maSlow2Length   = input(defval = 75, title = "Slow MA Period", minval = 1)

//macd
macdFastLength   = input(defval = 12, title = "Fast MACD Period", minval = 1)
macdSlowLength   = input(defval = 26, title = "Slow MACD Period", minval = 1)
macdSmaLength   = input(defval = 9, title = "SMA MACD Period", minval = 1)

// the risk management inputs
inpTakeProfit   = input(defval = 30, title = "Take Profit", minval = 0)
inpStopLoss     = input(defval = 10, title = "Stop Loss", minval = 0)
inpTrailStop    = input(defval = 5, title = "Trailing Stop Loss", minval = 0)
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Loss Offset", minval = 0)

// if an input is less than 1, assuming not wanted so we assign 'na' value to disable it.
useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na

// === SERIES SETUP ===
maFast = ema(maFastSource, maFastLength)
maSlow1 = wma(maSlow1Source, maSlow1Length)
maSlow2 = wma(maSlow2Source, maSlow2Length)
[_, signal, histLine] = macd(close, macdFastLength, macdSlowLength, macdSmaLength)

// === PLOTTING ===
fast = plot(maFast, title = "Fast MA", color = green, linewidth = 2, style = line, transp = 50)
slow1 = plot(maSlow1, title = "Slow MA1", color = red, linewidth = 2, style = line, transp = 50)
slow2 = plot(maSlow2, title = "Slow MA2", color = red, linewidth = 2, style = line, transp = 50)

// === LOGIC ===
signalUp = crossover(maFast, maSlow1) and crossover(maFast, maSlow2) and histLine > 0
signalDown = crossunder(maFast, maSlow1) and crossunder(maFast, maSlow2) and histLine < 0

// ===STRATEGY===
strategy.entry(id = "Long", long = true, when = signalUp) 
strategy.entry(id = "Short", long = false, when = signalDown)
strategy.exit("Exit Long", from_entry = "Long", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
strategy.exit("Exit Short", from_entry = "Short", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
```

> Detail

https://www.fmz.com/strategy/436241

> Last Modified

2023-12-22 14:17:34
