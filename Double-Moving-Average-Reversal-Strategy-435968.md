
> Name

Double-Moving-Average-Reversal-Strategy-435968

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f09efb4add3baf512a.png)



### Overview

This is a trend following and reversal trading strategy based on simple moving averages. It uses the crossover of 1-day and 4-day moving averages to determine the trend direction and generate buy and sell signals.

### Strategy Logic

When the 1-day MA crosses below the 4-day MA, a sell signal is generated. When the 1-day MA crosses above the 4-day MA, a buy signal is generated. By using the crossover of a fast and slow moving average to identify trend reversal points, it aims to profit. 

After entering the market, stop loss and take profit points are set. The stop loss is set 10 points below the entry price. The take profit is set 100 points above the entry price. This can limit losses and lock in profits.

### Advantage Analysis 

- Uses double MAs to identify reversal points simply and practially
- Sets stop loss and take profit to limit risk
- adjustable parameters adaptable to different market conditions
- easy to understand and implement, suitable for beginners

### Risk Analysis

- Invalid MA parameters may cause overtrading or missing opportunities 
- Improper stop loss and take profit setting may cause premature exit
- The lagging of double MAs identifying reversals may cause losses
- Poor performance if parameters are not adjusted per market changes

Risks can be mitigated by tuning parameters, setting dynamic stops, incorporating other indicators for signal validation etc.

### Optimization Directions

- Adding MACD, KD to filter fake signals 
- Studying the effect of different MA periods  
- Adding trend filter to avoid counter-trend trades
- Using proportional stops instead of fixed values
- Dynamically adjusting parameters by volatility

### Summary
This is a typical double MA reversal strategy overall. It identifies reversals by fast and slow MA crossovers, controls risk with stops, simple and practical to understand for beginners. With parameter tuning and optimizations, it can be adaptive and adding filters can improve it further. It is a very good starter strategy to learn.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-12-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © cesarpieres72

//@version=5
strategy("300% STRATEGY", overlay=true, margin_long=10, margin_short=10)
 
var float lastLongOrderPrice = na
var float lastShortOrderPrice = na

longCondition = ta.crossover(ta.sma(close, 1), ta.sma(close, 4))
if (longCondition)
    strategy.entry("Long Entry", strategy.long)  // Enter long

shortCondition = ta.crossunder(ta.sma(close, 1), ta.sma(close, 4))
if (shortCondition)
    strategy.entry("Short Entry", strategy.short)  // Enter short

if (longCondition)
    lastLongOrderPrice := close

if (shortCondition)
    lastShortOrderPrice := close

// Calculate stop loss and take profit based on the last executed order's price
stopLossLong = lastLongOrderPrice - 170  // 10 USDT lower than the last long order price
takeProfitLong = lastLongOrderPrice + 150  // 100 USDT higher than the last long order price
stopLossShort = lastShortOrderPrice + 170  // 10 USDT higher than the last short order price
takeProfitShort = lastShortOrderPrice - 150  // 100 USDT lower than the last short order price

// Apply stop loss and take profit to long positions
strategy.exit("Long Exit", from_entry="Long Entry", stop=stopLossLong, limit=takeProfitLong)

// Apply stop loss and take profit to short positions
strategy.exit("Short Exit", from_entry="Short Entry", stop=stopLossShort, limit=takeProfitShort) 
```

> Detail

https://www.fmz.com/strategy/435968

> Last Modified

2023-12-20 14:43:41
