
> Name

Kase-Dynamic-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description


This strategy is based on Mr. Kase's dynamic stop loss approach, computing price's dynamic range to find optimal stop loss and take profit levels for balancing profits and losses. 

Strategy Logic:

1. Calculate price's dynamic range indices RWH and RWL.

2. Derive deviation level index Pk from RWH and RWL. 

3. When Pk>0, compute stop loss based on deviation level. When Pk<0, compute take profit.

4. Deviation multiples generally range from 1-3 standard deviations.

5. Take opposing position when price hits stop loss/profit.

Advantages:

1. Dynamic stops/profits adapt to changing volatility.

2. Stops are neither too tight nor too loose.

3. Mathematical approach avoids emotional and subjective judgments.

Risks:

1. Stop calculations lag, potentially missing best stop timing.

2. Parameter tuning needed to balance stops and targets.

3. No limit on loss size, risks large losing trades.

In summary, this approach can intelligently optimize stops and targets to some extent but still requires robust backtesting. It also cannot fully eliminate subjective risks so prudent trading remains essential.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|Length|
|v_input_2|0|Trade From Level: 4|2|3|1|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-04-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 09/10/2019
//  The Kase Dev Stops system finds the optimal statistical balance between letting profits run, 
//  while cutting losses.  Kase DevStop seeks an ideal stop level by accounting for volatility (risk),
//  the variance in volatility (the change in volatility from bar to bar), and volatility skew 
//  (the propensity for volatility to occasionally spike incorrectly).
//
//  Kase Dev Stops are set at points at which there is an increasing probability of reversal against 
//  the trend being statistically significant based on the log normal shape of the range curve.  
//  Setting stops will help you take as much risk as necessary to stay in a good position, but not more.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Kase Dev Stops Backtest", overlay = true)
Length = input(30, minval=2, maxval = 100)
Level = input(title="Trade From Level", defval=4, options=[1, 2, 3, 4])
reverse = input(false, title="Trade reverse")
RWH = (high - low[Length]) / (atr(Length) * sqrt(Length))
RWL = (high[Length] - low) / (atr(Length) * sqrt(Length))
Pk = wma((RWH-RWL),3)
AVTR = sma(highest(high,2) - lowest(low,2), 20)
SD = stdev(highest(high,2) - lowest(low,2),20)
Val4 = iff(Pk>0, highest(high-AVTR-3*SD,20), lowest(low+AVTR+3*SD,20))
Val3 = iff(Pk>0, highest(high-AVTR-2*SD,20), lowest(low+AVTR+2*SD,20))
Val2 = iff(Pk>0, highest(high-AVTR-SD,20), lowest(low+AVTR+SD,20))
Val1 = iff(Pk>0, highest(high-AVTR,20), lowest(low+AVTR,20))
ResPrice = iff(Level == 4, Val4,
             iff(Level == 3, Val3,
               iff(Level == 2, Val2,
                 iff(Level == 1, Val1, Val4))))
pos = iff(close < ResPrice , -1, 1)
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/426571

> Last Modified

2023-09-13 14:08:47
