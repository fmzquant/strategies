
> Name

简易枢轴反转量化交易策略Simple-Pivot-Reversal-Algorithmic-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/bf96cfa71317df7201.png)

### Overview  

This strategy performs reversal trading based on pivot point breakouts. It calculates the pivot high and pivot low over a specified period to determine the pivot levels. It goes short when the price breaks above the pivot high, and goes long when the price breaks below the pivot low. This is a typical short-term mean reversion strategy.  

### Strategy Logic  

The core logic of this strategy is to calculate the pivot high and low points. The formulas are:

Pivot High = Sum of highest high over the past N1 bars / N1

Pivot Low = Sum of lowest low over the past N2 bars / N2  

Where N1 and N2 are parameters that define the number of bars used to calculate the pivot points.

After obtaining the pivot high/low levels, the trading rules are:

1. Short when price breaks above pivot high
2. Long when price breaks below pivot low  
3. Set stop loss after entry

So it realizes a short-term reversal strategy based on pivot point breakouts.   

### Advantage Analysis

The advantages of this simple strategy are:

1. Simple logic, easy to understand and implement
2. Suitable for high-frequency short-term trading 
3. Captures reversal after pivot breakouts
4. Optimizable through parameter tuning  

### Risk Analysis  

There are some risks:   

1. Failed reversal risk - The reversal after pivot breakout may fail and the trend continues
2. Stop loss risk - The preset stop loss could be hit resulting in big loss
3. Parameter risk - Inappropriate parameters greatly impacts results
 
These risks can be managed by parameter tuning, applying exit rules etc.

### Optimization Directions   

There is large room for optimization:

1. Combine with other technical indicators to improve entry timing
2. Add exit rules like trailing stop loss, profit-taking etc  
3. Dynamic adjustment of parameters to improve adaptiveness  
4. Parameter optimization to find the best parameter combinations

### Summary   

In summary, this is a very simple short-term pivot reversal strategy. Its advantages are simplicity and ability to capture reversals. But there are some risks that need to be addressed through optimization. Overall this serves as a good practice strategy for beginners and builds foundation for advanced strategies.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|leftBars|
|v_input_2|2|rightBars|
|v_input_3|true|From Day|
|v_input_4|true|From Month|
|v_input_5|2018|From Year|
|v_input_6|true|To Day|
|v_input_7|true|To Month|
|v_input_8|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Pivot Reversal Strategy - FIGS & DATES 2.0", overlay=true, pyramiding=0, initial_capital=10000, currency="USD", default_qty_type=strategy.percent_of_equity, default_qty_value=100.0, commission_value=0.075)

leftBars = input(4)
rightBars = input(2)

// backtesting date range
from_day = input(defval=1, title="From Day", minval=1, maxval=31)
from_month = input(defval=1, title="From Month", minval=1, maxval=12)
from_year = input(defval=2018, title="From Year", minval=1900)

to_day = input(defval=1, title="To Day", minval=1, maxval=31)
to_month = input(defval=1, title="To Month", minval=1, maxval=12)
to_year = input(defval=9999, title="To Year", minval=1900)

time_cond = true

swh = pivothigh(leftBars, rightBars)
swl = pivotlow(leftBars, rightBars)

middle = (swh+swl)/2

swh_cond = not na(swh)



hprice = 0.0
hprice := swh_cond ? swh : hprice[1]

le = false
le := swh_cond ? true : le[1] and high > hprice ? false : le[1]

if le and time_cond
    strategy.entry("LONG", strategy.long, comment="LONG", stop=hprice + syminfo.mintick)

swl_cond = not na(swl)

lprice = 0.0
lprice := swl_cond ? swl : lprice[1]


se = false
se := swl_cond ? true : se[1] and low < lprice ? false : se[1]

if se and time_cond
    strategy.entry("SHORT", strategy.short, comment="SHORT", stop=lprice - syminfo.mintick)

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)

```

> Detail

https://www.fmz.com/strategy/439078

> Last Modified

2024-01-17 15:37:33
