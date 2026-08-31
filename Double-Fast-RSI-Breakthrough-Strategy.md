
> Name

Double-Fast-RSI-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d9c5fa1e678ba8f8ec.png)

## Overview

This strategy uses multiple RSI indicators to implement price breakthroughs to generate more accurate entry and exit signals.

## Strategy Logic

The strategy sets two groups of RSI parameters, one with period of 7 and limit of 25, the other with period of 14 and limit of 25. When price breaks through either RSI limit, long or short orders are executed.

The strategy first calculates the values of the two RSI indicators, then judges if price breaks through the RSI upper or lower limit. If it breaks through upper limit, a long signal is generated. If it breaks through lower limit, a short signal is generated. 

If already having a position, it continues to judge if the current RSI is within normal range. If RSI becomes normal and body breaks through half of moving average, an exit signal is generated.

The strategy also uses Martingale system. The order size doubles after each loss. 

## Advantage Analysis 

- Using two RSI indicators can better judge breakthrough signals and avoid false signals.

- Also checking body breakthrough avoids wrong trades during consolidation.

- Martingale helps stop loss quickly after losses.

- Customizable RSI parameters optimize entry opportunities. 

- Trading sessions can be limited to avoid impact from major events.

## Risk Analysis

- Dual RSI cannot fully avoid false breakthrough. 

- Martingale increases position after losses, risks blowing up.

- Trading cost is not considered.

- Too many optimizable parameters require lots of tests to find best combination.

Can set stop loss to limit losses; optimize RSI parameters; add cost consideration; relax breakthrough criteria.

## Optimization Directions

- Add stop loss to limit maximum loss.

- Optimize RSI parameters to reduce false signals.

- Consider trading cost impact to prevent overtrading. 

- Relax body breakthrough criteria for more opportunities. 

- Add more filters to avoid being trapped.

## Summary

This strategy uses dual RSI to determine price breakthrough, adds body breakthrough filter to avoid whipsaws. It also uses Martingale to quickly cut losses. The strategy can be improved by optimizing parameters and adding filters for more accurate signals. Risk management is important to limit losses. Overall this strategy provides a relatively stable breakthrough system suitable for high efficiency trading.



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|false|Use Martingale|
|v_input_4|100|Capital, %|
|v_input_5|true|Use RSI #1|
|v_input_6|7|#1 RSI Period|
|v_input_7|25|#1 RSI limit|
|v_input_8|true|Use RSI #2|
|v_input_9|14|#2 RSI Period|
|v_input_10|25|#2 RSI limit|
|v_input_11|false|Show Arrows|
|v_input_12|2018|From Year|
|v_input_13|2100|To Year|
|v_input_14|true|From Month|
|v_input_15|12|To Month|
|v_input_16|true|From day|
|v_input_17|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-30 00:00:00
end: 2023-11-06 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's Fast RSI Strategy v2.0", shorttitle = "Fast RSI str 2.0", overlay = true)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
usemar = input(false, defval = false, title = "Use Martingale")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
usersi1 = input(true, defval = true, title = "Use RSI #1")
rsiperiod1 = input(7, defval = 7, minval = 2, maxval = 50, title = "#1 RSI Period")
rsilimit1 = input(25, defval = 25, minval = 1, maxval = 100, title = "#1 RSI limit")
usersi2 = input(true, defval = true, title = "Use RSI #2")
rsiperiod2 = input(14, defval = 14, minval = 2, maxval = 50, title = "#2 RSI Period")
rsilimit2 = input(25, defval = 25, minval = 1, maxval = 100, title = "#2 RSI limit")
showarr = input(false, defval = false, title = "Show Arrows")
fromyear = input(2018, defval = 2018, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//RSI #1
uprsi1 = rma(max(change(close), 0), rsiperiod1)
dnrsi1 = rma(-min(change(close), 0), rsiperiod1)
rsi1 = dnrsi1 == 0 ? 100 : uprsi1 == 0 ? 0 : 100 - (100 / (1 + uprsi1 / dnrsi1))
uplimit1 = 100 - rsilimit1
dnlimit1 = rsilimit1

//RSI #2
uprsi2 = rma(max(change(close), 0), rsiperiod2)
dnrsi2 = rma(-min(change(close), 0), rsiperiod2)
rsi2 = dnrsi2 == 0 ? 100 : uprsi2 == 0 ? 0 : 100 - (100 / (1 + uprsi2 / dnrsi2))
uplimit2 = 100 - rsilimit2
dnlimit2 = rsilimit2

//Body
body = abs(close - open)
abody = sma(body, 10)

//Signals
bar = close > open ? 1 : close < open ? -1 : 0
up1 = bar == -1 and (strategy.position_size == 0 or close < strategy.position_avg_price) and rsi1 < dnlimit1 and body > abody / 5 and usersi1
dn1 = bar == 1 and (strategy.position_size == 0 or close > strategy.position_avg_price) and rsi1 > uplimit1 and body > abody / 5 and usersi1
up2 = bar == -1 and (strategy.position_size == 0 or close < strategy.position_avg_price) and rsi2 < dnlimit2 and body > abody / 5 and usersi2
dn2 = bar == 1 and (strategy.position_size == 0 or close > strategy.position_avg_price) and rsi2 > uplimit2 and body > abody / 5 and usersi2
norma = rsi1 > dnlimit1 and rsi1 < uplimit1 and rsi2 > dnlimit2 and rsi2 < uplimit2
exit = (((strategy.position_size > 0 and bar == 1 and norma) or (strategy.position_size < 0 and bar == -1 and norma)) and body > abody / 2)

//Arrows
col = exit ? black : up1 or dn1 ? blue : up2 or dn2 ? red : na
needup = up1 or up2
needdn = dn1 or dn2
needexitup = exit and strategy.position_size < 0
needexitdn = exit and strategy.position_size > 0
plotarrow(showarr and needup ? 1 : na, colorup = blue, colordown = blue, transp = 0)
plotarrow(showarr and needdn ? -1 : na, colorup = blue, colordown = blue, transp = 0)
plotarrow(showarr and needexitup ? 1 : na, colorup = black, colordown = black, transp = 0)
plotarrow(showarr and needexitdn ? -1 : na, colorup = black, colordown = black, transp = 0)

//Trading
profit = exit ? ((strategy.position_size > 0 and close > strategy.position_avg_price) or (strategy.position_size < 0 and close < strategy.position_avg_price)) ? 1 : -1 : profit[1]
mult = usemar ? exit ? profit == -1 ? mult[1] * 2 : 1 : mult[1] : 1
lot = strategy.position_size == 0 ? strategy.equity / close * capital / 100 * mult : lot[1]

if up1 or up2
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot)

if dn1 or dn2
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot)
    
if  exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/431422

> Last Modified

2023-11-07 16:56:39
