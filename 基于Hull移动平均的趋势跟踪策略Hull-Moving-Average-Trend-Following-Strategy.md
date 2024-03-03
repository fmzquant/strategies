
> Name

基于Hull移动平均的趋势跟踪策略Hull-Moving-Average-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略基于Alan Hull提出的Hull移动平均指标,属于趋势跟踪策略。该指标可以有效减少移动平均线的滞后效应,对价格变化响应更灵敏。策略使用Hull移动平均判断趋势方向,并结合额外过滤条件发出交易信号。

## 策略原理

1. 计算短周期和长周期两组Hull移动平均。短周期判断具体交易方向,长周期判断大趋势方向。

2. 当短周期Hull MA上穿下穿时,判断趋势发生转折。结合大趋势方向过滤噪音交易。

3. 增加价格突破Hull MA的条件,确保突破成功。

4. 增加价格变化率条件,避免不理想的突破 Entry。 

5. 设置止损和止盈条件,控制风险。

## 优势分析

相比普通移动平均线,该策略具有以下优势:

1. Hull MA响应价格变化更迅速,可以及时捕捉趋势转折。

2. 双 Hull MA结构可以判断大、小两个时间维度的趋势。

3. 价格突破与变化率条件可有效过滤假突破。

4. 动态止损止盈可锁定利润,控制风险。

## 风险分析

该策略也存在以下风险:

1. 参数设定不当可能错过价格趋势转折。

2. 大趋势判断错误可能导致逆势交易。

3. 停止损失设定过宽可能带来较大亏损。

4. 交易次数过于频繁,增加交易成本和滑点风险。

## 优化方向

可从以下几个方面进行优化:

1. 优化 Hull MA 周期,平衡敏感性和平滑性。

2. 优化 Entry 和 Exit的参数,找到最优数值。

3. 测试不同品种参数健壮性,提高策略适应性。 

4. 结合量能指标,避免背离造成的风险。

5. 增加条件,提高策略的稳定性。

## 总结

该策略整体来说,利用 Hull MA 的响应迅速性实现对趋势的及时跟踪,在控制风险的前提下,具有较强的盈利能力。但需要注意参数优化,并防范一些较难避免的系统性风险。

|| 


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

[/trans]

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
