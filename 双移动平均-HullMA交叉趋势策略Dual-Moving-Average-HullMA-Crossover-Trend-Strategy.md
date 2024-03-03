
> Name

双移动平均-HullMA交叉趋势策略Dual-Moving-Average-HullMA-Crossover-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11db85fc63a5ef3853d.png)
[trans]
## 概述

双移动平均 HullMA交叉趋势策略是一种基于双移动平均线交叉的趋势跟踪策略。它使用加权移动平均线WMA构建双移动平均系统,并在它们交叉时生成交易信号。该策略同时结合价格突破判断,进一步过滤信号。

## 策略原理  

双移动平均 HullMA交叉趋势策略使用三条不同周期的WMA线,包括wma1、wma2和wma3。wma2和wma3构建双移动平均系统,当wma2上穿wma3时为看涨信号,而wma2下穿wma3时为看跌信号。wma1是辅助判断线。 

该策略额外使用Hull移动平均加强信号判断。具体来说,它计算2日加权移动平均线的两倍n2ma和n日加权移动平均线nma的差值,并测度差值数值的变化。只有当差值上升时才会确认看涨信号有效,差值下降时才会确认看跌信号有效。

该策略同时结合价格判定。只有在价格比前一日价格高时,才会确认看涨信号有效生成做多单。只有价格比前一日价格低时,才会确认看跌信号有效生成做空单。

## 优势分析

双移动平均HullMA交叉趋势策略结合双移动平均交叉和价格判定,可以有效滤除假信号,这是它的最大优势。此外,该策略运用三条不同周期的移动平均线捕捉不同级别的趋势,可以在趋势初期就进入市场。它的止损清算方式也比较稳定可靠。

## 风险分析  

双移动平均HullMA交叉趋势策略作为一种趋势跟踪策略,在盘整行情中容易产生较多交易次数和滑点损失。此外,双移动平均线交叉系统过于敏感,可能在 sideways发出错误信号。建议适当调整移动平均线参数,或增加附加过滤条件。

## 优化方向  

双移动平均HullMA交叉趋势策略可以从以下几个方面进行优化:

1. 优化移动平均线参数,找到最优参数组合

2. 增加成交量或者波动率等过滤器,排除假突破

3. 结合其它指标作为辅助判断,提高信号质量 

4. 动态优化移动平均周期参数

## 总结

双移动平均HullMA交叉趋势策略整体来说是一个稳定可靠的趋势跟踪策略。它结合双移动平均交叉和价格判定产生高质量信号。通过参数优化和添加过滤器,可以进一步减少错误信号,从而获得更好的策略表现。该策略适用于捕捉中长线趋势,是量化交易的一个不错选择。

||

## Overview

The Dual Moving Average HullMA Crossover Trend strategy is a trend-following strategy based on the crossover of dual moving averages. It builds a dual moving average system using Weighted Moving Average (WMA) lines and generates trading signals when they cross over. The strategy also incorporates price breakout validation to further filter the signals.

## Strategy Logic

The Dual Moving Average HullMA Crossover Trend strategy employs three WMA lines with different periods, including wma1, wma2, and wma3. The wma2 and wma3 construct the dual moving average system. The wma2 crossing above wma3 gives bullish signals, while the wma2 crossing below wma3 gives bearish signals. The wma1 serves as an auxiliary reference line.

Additionally, the strategy utilizes the Hull Moving Average to strengthen signal validation. Specifically, it calculates the difference between 2-period WMA doubled (n2ma) and n-period WMA (nma). Only when the difference rises will bull signals be confirmed valid. Only when the difference falls will bear signals be confirmed valid. 

The strategy also incorporates price validation. Only when the price is higher than the previous day will bull signals be confirmed valid for long orders. Only when the price is lower than the previous day will bear signals be confirmed valid for short orders.

## Advantage Analysis 

The Dual Moving Average HullMA Crossover Trend strategy combines dual moving average crossover and price validation, which allows it to effectively filter out false signals. This is its biggest strength. Also, with three moving average lines of various periods, the strategy can capture trends of different levels early on. Its stop loss mechanism is quite stable and reliable as well.

## Risk Analysis

As a trend-following strategy, the Dual Moving Average HullMA Crossover Trend strategy can generate relatively more trades and slippage costs during range-bound markets. Additionally, dual moving average crossover systems tend to be too sensitive and may emit incorrect signals during sideways trends. It is advisable to tune the moving average parameters or impose additional filters accordingly. 

## Optimization Directions

The Dual Moving Average HullMA Crossover Trend strategy can be improved in the following aspects:

1. Optimize the moving average parameters to find the best parameter combination

2. Add filters like volume or volatility to eliminate false breakouts 

3. Incorporate other indicators as supplementary validation to improve signal quality

4. Dynamically optimize moving average period parameters

## Summary 

In summary, the Dual Moving Average HullMA Crossover Trend strategy is a stable and reliable trend-following strategy. It produces high-quality signals by combining dual moving average crossover and price validation. Through parameter tuning and adding filters, it can further reduce incorrect signals and achieve better performance. It is suitable for catching medium- to long-term trends and a solid choice for quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.001|Decision Threshold|
|v_input_2|7|Double HullMA Cross|
|v_input_3|34|MA 1|
|v_input_4|144|MA 2|
|v_input_5|377|MA 3|
|v_input_6|4200|TP ($)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-25 00:00:00
end: 2024-02-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("ZendicatoR", overlay=true)
dt = input(defval=0.0010, title="Decision Threshold", type=float, step=0.0001)
keh=input(title="Double HullMA Cross",defval=7, minval=1)
che1=input(title="MA 1",defval=34,minval=1)
che2=input(title="MA 2",defval=144,minval=1)
che3=input(title="MA 3",defval=377,minval=1)
amnt=input(title="TP ($)",defval=4200,minval=1)
wma1=wma(close,che1)
wma2=wma(close,che2)
wma3=wma(close,che3)
tms=10000000000000
A=request.security(syminfo.tickerid, 'D', close)*tms
B=request.security(syminfo.tickerid, 'D', close[1])*tms
C=A>B?green:red
D=wma2>wma3?green:red
plot(wma1,style=line,color=C,linewidth=4)
p1=plot(wma2,style=line,color=D)
p2=plot(wma3,style=line,color=D)
fill(p1, p2, color=D, transp=75)
n2ma=2*wma(close,round(keh/2))
nma=wma(close,keh)
diff=n2ma-nma,sqn=round(sqrt(keh))
n2ma1=2*wma(close[2],round(keh/2))
nma1=wma(close[2],keh)
diff1=n2ma1-nma1,sqn1=round(sqrt(keh))
n1=wma(diff,sqn)*tms
n2=wma(diff1,sqn)*tms
closelong = A*tms<B*tms and n2*tms>n1*tms and strategy.openprofit>amnt
if (closelong)
    strategy.close("Long")
closeshort = A*tms>B*tms and n1*tms>n2*tms and strategy.openprofit>amnt
if (closeshort)
    strategy.close("Short") 
longCondition = A*tms>B*tms and n1*tms>n2*tms
if (longCondition)
    strategy.entry("Long",strategy.long)
shortCondition = A*tms<B*tms and n1*tms<n2*tms
if (shortCondition)
    strategy.entry("Short",strategy.short)
```

> Detail

https://www.fmz.com/strategy/442817

> Last Modified

2024-02-26 11:21:45
