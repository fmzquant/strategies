
> Name

基于Hull移动平均的趋势跟踪策略Hull-Moving-Average-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy is based on the Hull Moving Average indicator invented by Alan Hull, belonging to trend following strategies. The Hull MA can reduce lag of moving averages and respond to price changes more swiftly. The strategy uses Hull MA to determine trend direction and additional filters to generate trading signals.

## Strategy Principle  

1. Calculate short period and long period Hull MAs. Short period for specific trade direction, long period for overall trend.

2. When short period Hull MAs cross over, determine trend reversal. Filter with long period trend direction.

3. Add price breakout through Hull MA condition to ensure successful breakout.  

4. Add price change rate filter to avoid undesirable breakout entry.

5. Set stop loss and take profit to control risk.

## Advantage Analysis

Compared to simple moving averages, advantages of this strategy include:

1. Hull MA responds to price changes faster, able to capture trend turns timely.

2. Dual Hull MA structure can determine trends on both long and short timeframes. 

3. Price breakout and change rate filters help avoid false breakouts. 

4. Dynamic stop loss and take profit locks in profit and controls risk.

## Risk Analysis

Risks of this strategy:

1. Improper parameter setting may miss price trend turns.

2. Wrong overall trend judgement may cause counter trend trades.

3. Stop loss set too wide may lead to large losses.

4. Too frequent trading increases transaction costs and slippage risks.

## Optimization Directions

It can be optimized in the following aspects:

1. Optimize Hull MA periods to balance sensitivity and smoothness.

2. Optimize entry and exit parameters to find optimum values.

3. Test parameter robustness across different instruments to improve adaptability.

4. Incorporate volume to avoid divergence risks. 

5. Add conditions to improve stability.

## Summary

Overall, this strategy leverages the responsiveness of Hull MA to timely follow trends, and has strong profitability under risk control. But parameter optimization is needed, and some unavoidable systemic risks should be guarded against.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|HullMA Short|
|v_input_2|14|HullMA Long|
|v_input_3|0.001|Decision Threshold|
|v_input_4|-50000|Stop Loss in $|
|v_input_5|100000|Target Point in $|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-12 22:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//SeaSide420
strategy("SS420FX", overlay=true, default_qty_type=strategy.percent_of_equity, max_bars_back=720, default_qty_value=100, calc_on_order_fills= true, calc_on_every_tick=true, pyramiding=0)
q=input(title="HullMA Short",defval=14)
z=input(title="HullMA Long",defval=14)
dt = input(defval=0.0010, title="Decision Threshold", type=float, step=0.0001)
SL = input(defval=-50000.00, title="Stop Loss in $", type=float, step=1)
TP = input(defval=100000.00, title="Target Point in $", type=float, step=1)
ot=1
n2ma=2*wma(close,round(q/2))
nma=wma(close,q)
diff=n2ma-nma
sqn=round(sqrt(q))
n2ma1=2*wma(close[1],round(q/2))
nma1=wma(close[1], q)
diff1=n2ma1-nma1
sqn1=round(sqrt(q))
n1=wma(diff,sqn)
n2=wma(diff1,sqn)
z2ma=2*wma(close[11],round(z/2))
zma=wma(close[11],z)
ziff=n2ma-nma
zqn=round(sqrt(z))
z2ma1=2*wma(close[12],round(z/2))
zma1=wma(close[12], z)
ziff1=n2ma1-nma1
zqn1=round(sqrt(z))
z1=wma(diff,sqn)
z2=wma(diff1,sqn)
z1e=z1>z2?green:black
z2e=z1>z2?black:red
z3e=z1>z2?green:red
n1e=plot(z1, title="HMA1", color=z1e, linewidth=2, offset=2)
n2e=plot(z2, title="HMA2", color=z2e, linewidth=2, offset=2)
fill(n1e, n2e, color=z3e, transp=80)
confidence=(security(syminfo.tickerid, 'D', close)-security(syminfo.tickerid, 'D', close[1]))/security(syminfo.tickerid, 'D', close[1])
closelong = n1<n2 and close<n2 and confidence<dt or strategy.openprofit<SL or strategy.openprofit>TP
if (closelong)
    strategy.close("Long")
closeshort = n1>n2 and close>n2 and confidence>dt or strategy.openprofit<SL or strategy.openprofit>TP
if (closeshort)
    strategy.close("Short")
longCondition = n1>n2 and z1>z2 and strategy.opentrades<ot and confidence>dt and close>n1
if (longCondition)
    strategy.entry("Long",strategy.long)
shortCondition = n1<n2 and z1<z2 and strategy.opentrades<ot and confidence<dt and close<n1 
if (shortCondition)
    strategy.entry("Short",strategy.short)
```

> Detail

https://www.fmz.com/strategy/427271

> Last Modified

2023-09-19 16:40:00
