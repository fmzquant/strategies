
> Name

移动平均线百分比反转策略Moving-Average-Percentage-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description



## Strategy Logic 

The moving average percentage reversal strategy generates trading signals by calculating the percentage differential between price and a moving average. 

Trades are taken when the percentage gap between price and the MA reaches preset levels.

Specifically, the logic is:

1. Calculate the absolute difference between price and an N-period MA
2. Convert the difference to percentage terms, i.e. divide by price
3. Go short when the percentage gap exceeds an upper threshold (e.g. 5%) 
4. Go long when the percentage gap falls below a lower threshold (e.g. -3%)
5. Optionally reverse signals (longs become shorts, shorts become longs)

E.g. with N=14, upper limit=5%, lower limit=-3%:

- Go short when price is >5% above the 14-day MA
- Go long when price is <3% below the 14-day MA

Parameters N, upper/lower limits can adjust sensitivity.

## Advantages

- Percentage gaps account for changing price levels  
- Adjustable parameters suit different cycles
- BREAK strategy aims to catch trend turning points early

## Risks

- Percentage gaps alone cannot confirm trend direction
- Prone to false signals, needs additional filters
- MAs lagging, may not catch reversals promptly

## Summary

The MA percentage strategy uses the percentage gap between price and MA to identify potential turning points, with a BREAK approach. Adjustable parameters can adapt to varying market conditions, but lag and whipsaws are risks needing mitigation.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|0.54|SellZone|
|v_input_3|0.03|BuyZone|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 30/07/2018
// Percent difference between price and MA
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Percent difference between price and MA Backtest")
Length = input(14, minval=1)
SellZone = input(0.54, minval=0.01, step = 0.01)
BuyZone = input(0.03, minval=0.01, step = 0.01)
reverse = input(false, title="Trade reverse")
hline(BuyZone, color=green, linestyle=line)
hline(SellZone, color=red, linestyle=line)
xSMA = sma(close, Length)
nRes = abs(close - xSMA) * 100 / close
pos = iff(nRes < BuyZone, 1,
       iff(nRes > SellZone, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nRes, color=blue, title="PD MA")
```

> Detail

https://www.fmz.com/strategy/426774

> Last Modified

2023-09-14 14:53:53
