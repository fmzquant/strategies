
> Name

行情反转关键点策略WMX-Williams-Fractals-Reversal-Pivot-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16a61b1fbe58739b0e1.png)
 [trans]

## 概述

本策略采用威廉指标的突破原理,结合特定形态的K线,设计出一个高效的多空开仓与平仓的模式,这样能够在行情反转的关键点位准确做多做空,捕捉中短线趋势,获得超额收益。

## 策略原理  

本策略使用威廉指标中的分形点来判断反转信号。当出现上方或下方分形时,如果与K线实体方向一致,则产生交易信号。


具体来说,策略中定义了一个自定义指标WMX Williams Fractals。该指标中使用因子函数来判断上分型(upFractal)和下分型(dnFractal)。

上分型判断逻辑是:当前K线的最高价高于之前n根K线(n是可调参数)的最高价,这样就形成一个突破上方的分型。

下分型判断逻辑是:当前K线的最低价低于之前n根K线的最低价,这样就形成一个突破下方的分型。

得到上分型和下分型后,判断它们是否发生变化,即从无到有或者从有到无。这时分型才刚形成,表示反转的可能性较大。

之后结合K线实体的方向来判断具体的交易信号。当上分型形成,Close高于Open时,做多;当下分型形成,Close低于Open时,做空。


## 策略优势

1. 使用威廉指标的分型点判断反转时点,这是一种成熟可靠的技术指标

2. 结合K线实体方向来确认交易信号,避免在非趋势区域乱 chops 的情况

3. 参数少,只需要调节分型周期 n ,容易测试和优化

4. 可灵活设置开仓规则,如仓位大小、平仓条件等,易于实盘应用


## 策略风险

1. 分型形成后,行情可能不是完全反转,需要结合趋势判断

2. 止损位置设置需要谨慎,防止被噪音巨幅行情止损

3. 参数n需要根据不同品种调整,如果周期过大或过小都会影响效果


解决方法:

1. 可以加入移动平均线等指标来判断大趋势,避免逆势开仓

2. 动态跟踪止损或设置合理的回撤限制止损

3. 利用Walk Forward Analysis方法进行参数优化,找到最佳参数


## 策略优化方向  

1. 基于分型的反转策略容易形成多次盈利后再次反转导致亏损的情况。可以考虑加入趋势过滤,进一步限制交易范围,减少不必要的反转交易。

2. 目前的止损方式比较简单,无法有效跟踪行情。可以尝试加入诸如移动止损、时间止损、动态止损等止损方式。

3. 目前只判断 K 线的实体方向。若考虑到影线、收盘位置等更多 K 线信息,可以设计出更精确的交易信号。


## 总结

本策略属于基于技术指标的反转策略。它利用威廉指标的分型来捕捉标的股在关键时点上的变化趋势,与K线实体结合形成交易信号,以期实现超额收益。

相比于其他反转策略,本策略通过参数化设计,逻辑清晰、易于理解,参数调整方便、容易测试,可直接投入实盘运行。下一步通过趋势判断、止损方式等进一步优化,可望获得更好的策略效果。

||


## Overview  

This strategy adopts the Williams indicator fractal breakout principle and combines specific K-line patterns to design an efficient long and short opening and closing model. It can accurately go long and short at the key reversal points of market movements to capture medium and short term trends and obtain excess returns.

## Strategy Principle

This strategy uses the fractal points in the Williams indicator to determine reversal signals. When a top or bottom fractal appears and it is consistent with the K-line entity direction, a trading signal is generated.   

Specifically, a custom indicator called WMX Williams Fractals is defined in the strategy. It uses factor functions to determine the top fractal (upFractal) and bottom fractal (dnFractal).  

The top fractal logic is: the highest price of the current K-line is higher than the highest price of the previous n K-lines (n is an adjustable parameter), thus forming a top side breakout fractal.

The bottom fractal logic is: the lowest price of the current K-line is lower than the lowest price of the previous n K-lines, thus forming an bottom side breakout fractal.   

After getting the top and bottom fractals, determine whether they change, that is, from none to exist or vice versa. At this time, the fractal has just formed, indicating a greater possibility of reversal.

Then, combined with the K-line entity direction to determine specific trading signals. When the top fractal is formed and Close is higher than Open, go long. When the bottom fractal is formed and Close is lower than Open, go short.

## Strategy Advantages  

1. Use the Williams indicator fractal points to determine the reversal timing. It is a mature and reliable technical indicator.  

2. Combine the K-line entity direction to confirm trading signals and avoid choppy non-trend regions.   

3. Few parameters that only need to adjust the fractal period n, easy to test and optimize.  

4. Flexible settings for opening positions rules like position sizing, closing conditions, etc., easy to apply in live trading.

## Strategy Risks  

1. After the fractal forms, the market may not completely reverse, need to combine with trend judgment.  

2. Stop loss position setting needs to be cautious to prevent being knocked out by noisy huge volatility moves.

3. The n parameter needs to adjust for different products. If the period is too large or too small it will affect the results.  

Solutions:  

1. Can add indicators like moving average to judge major trend, avoid trading against trends.  

2. Use dynamic trailing stop loss or set reasonable drawdown based stop loss.  

3. Utilize Walk Forward Analysis to optimize parameters and find the optimal values.   

## Strategy Optimization Directions   

1. Fractal reversal strategies tend to form multiple profits then reverse again to form losses. Can consider adding trend filters to further limit trading range and reduce unnecessary reversal trades.   

2. Current simple stop loss method cannot effectively track market moves. Can try more advanced stop loss techniques like moving stop loss, time based stop loss, dynamic stop loss etc.   

3. Currently only use K-line entity direction. If considering more K-line information like wicks and close location, can design even more precise trade signals.  

## Conclusion  

This is a reversal strategy based on technical indicators. It utilizes the Williams indicator fractals to capture changes in the trend of the underlying at key pivot points, combined with K-line entity direction to form trade signals, aiming to achieve excess returns.   

Compared to other reversal strategies, this strategy features parameterized design for clear logic and easy understanding. It has flexible parameter adjustments for convenient testing, and can directly be applied in live trading. Next step further optimizations on trend filtering, stop loss methods etc. can improve strategy performance.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Periods|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-14 00:00:00
end: 2023-12-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © WMX_Q_System_Trading

//@version=4
SystemName="WMX Williams Fractals strategy V4"
InitCapital = 1000000
InitPosition = 100
InitCommission = 0.075
InitPyramidMax = 10
strategy(title=SystemName, shorttitle=SystemName, overlay=true, initial_capital=InitCapital, default_qty_type=strategy.percent_of_equity, default_qty_value=InitPosition, commission_type=strategy.commission.percent, commission_value=InitCommission)


//study("WMX Williams Fractals", shorttitle="WMX Fractals", format=format.price, precision=0, overlay=true)
// Define "n" as the number of periods and keep a minimum value of 2 for error handling.
n = input(title="Periods", defval=2, minval=2, type=input.integer)
h=close
l=close

factorh(High)=>
    upFractal = (                                                                                                          (High[n+2]  < High[n]) and (High[n+1]  < High[n]) and (High[n-1] < High[n]) and (High[n-2] < High[n]))
             or (                                                                               (High[n+3]  < High[n]) and (High[n+2]  < High[n]) and (High[n+1] == High[n]) and (High[n-1] < High[n]) and (High[n-2] < High[n]))
             or (                                                    (High[n+4]  < High[n]) and (High[n+3]  < High[n]) and (High[n+2] == High[n]) and (High[n+1] <= High[n]) and (High[n-1] < High[n]) and (High[n-2] < High[n]))
             or (                          (High[n+5] < High[n]) and (High[n+4]  < High[n]) and (High[n+3] == High[n]) and (High[n+2] == High[n]) and (High[n+1] <= High[n]) and (High[n-1] < High[n]) and (High[n-2] < High[n]))
             or ((High[n+6] < High[n]) and (High[n+5] < High[n]) and (High[n+4] == High[n]) and (High[n+3] <= High[n]) and (High[n+2] == High[n]) and (High[n+1] <= High[n]) and (High[n-1] < High[n]) and (High[n-2] < High[n]))
    upFractal
upFractal=factorh(h)
factorl(Low)=>
    dnFractal = (                                                                                                  (Low[n+2]  > Low[n]) and (Low[n+1]  > Low[n]) and (Low[n-1] > Low[n]) and (Low[n-2] > Low[n]))
             or (                                                                         (Low[n+3]  > Low[n]) and (Low[n+2]  > Low[n]) and (Low[n+1] == Low[n]) and (Low[n-1] > Low[n]) and (Low[n-2] > Low[n]))
             or (                                                (Low[n+4]  > Low[n]) and (Low[n+3]  > Low[n]) and (Low[n+2] == Low[n]) and (Low[n+1] >= Low[n]) and (Low[n-1] > Low[n]) and (Low[n-2] > Low[n]))
             or (                        (Low[n+5] > Low[n]) and (Low[n+4]  > Low[n]) and (Low[n+3] == Low[n]) and (Low[n+2] == Low[n]) and (Low[n+1] >= Low[n]) and (Low[n-1] > Low[n]) and (Low[n-2] > Low[n]))
             or ((Low[n+6] > Low[n]) and (Low[n+5] > Low[n]) and (Low[n+4] == Low[n]) and (Low[n+3] >= Low[n]) and (Low[n+2] == Low[n]) and (Low[n+1] >= Low[n]) and (Low[n-1] > Low[n]) and (Low[n-2] > Low[n]))
    
dnFractal=factorl(l)

U=valuewhen(upFractal[0]!= upFractal[1],l[0],3)
L=valuewhen(dnFractal[0]!=dnFractal[1],h[0],3)

longcon=crossover(close ,L) and close>open
shortcon=crossunder(close ,U) and close<open

if longcon
    
    strategy.entry("Long", strategy.long,   when = strategy.position_size <= 0 )
    
if  shortcon
    strategy.entry("Short", strategy.short,  when = strategy.position_size >= 0 )
        





```

> Detail

https://www.fmz.com/strategy/435469

> Last Modified

2023-12-15 10:37:01
