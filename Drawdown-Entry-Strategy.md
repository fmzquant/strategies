
> Name

Drawdown-Entry-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This article introduces an entry strategy based on drawdowns. It monitors account drawdowns and selectively goes long when drawdown reaches a threshold, aiming to profit from market bounces.

## Strategy Logic 

The logic is:

1. Calculate current account drawdown percentage and plot it.

2. When drawdown reaches a threshold (e.g. 5%), market may be oversold so go long. 

3. If next day's close is higher than previous day's, close long for profit.

4. If no drawdown or threshold not reached, no trades are placed.

5. After drawdown trade, account is reset to recalculate for next signal.

## Advantage Analysis

Advantages of the strategy:

1. Drawdown longs can profit from market bounces.

2. Auto trading after reaching drawdown threshold. 

3. Larger size possible for higher returns during drawdown.

4. Simple and clear logic for easy implementation. 

5. Threshold can be adjusted based on market conditions.

## Risk Analysis

There are also some risks:

1. Inaccurate drawdown signal may cause failed trades.

2. Market could drop further after drawdown longs.

3. Position sizing and stops should be set appropriately. 

4. Avoid overtrading from excessive signals.

5. Drawdown threshold should consider account risk tolerance.

## Conclusion

This strategy tries to capture bounces after drawdowns. But traders should evaluate timing carefully and manage risks when trading drawdowns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|-5|Drawdown, %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-16 00:00:00
end: 2023-09-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2019

//@version=3
strategy(title = "Noro's DD Strategy", shorttitle = "DD str", overlay = false, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)
signal = input(-5.0, title = "Drawdown, %")
bull = close > close[1] ? 1 : 0
bear = close < close[1] ? 1 : 0
lastbull = 0.0
lastbull := bull ? close : lastbull[1]
dd = ((close / lastbull) - 1) * 100
plot(dd, color = black, transp = 20)
bottom = dd < signal
col = bottom ? lime : na
bgcolor(col, transp = 20)

if bottom
    strategy.entry("Long", strategy.long)
if strategy.position_size > 0 and close > open
    strategy.entry("Close", strategy.short, 0)
```

> Detail

https://www.fmz.com/strategy/427001

> Last Modified

2023-09-16 19:18:38
