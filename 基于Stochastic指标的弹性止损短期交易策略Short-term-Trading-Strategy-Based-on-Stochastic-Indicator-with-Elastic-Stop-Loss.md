
> Name

基于Stochastic指标的弹性止损短期交易策略Short-term-Trading-Strategy-Based-on-Stochastic-Indicator-with-Elastic-Stop-Loss

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略基于Stochastic oscillator指标判断市场的超买超卖状态,结合弹性止损原理开展短期交易。在Stochastic指标上金叉时做多,死叉时做空,同时设置基于前期枢轴点的弹性止损,在保证盈利的同时控制风险。

## 策略原理

### 入场原理

Stochastic oscillator指标包含%K线和%D线。当%K线从下向上突破%D线时,为金叉信号,做多;当%K线从上向下突破%D线时,为死叉信号,做空。本策略就是根据Stochastic指标的金叉死叉信号判断入场。

具体来说,在Stochastic指标金叉时,如果%K线值小于80(未超买),则做多;在Stochastic指标死叉时,如果%K线值大于20(未超卖),则做空。

```pine
GoLong=crossover(k,d) and k<80 
GoShort=crossunder(k,d) and k>20
```

### 止损原理 

本策略使用弹性止损的方法,根据前期的枢轴点设置止损价位,代码如下:

```pine 
piv_high = pivothigh(high,1,1)
piv_low = pivotlow(low,1,1)

stoploss_long=valuewhen(piv_low,piv_low,0) 
stoploss_short=valuewhen(piv_high,piv_high,0)
```

枢轴点代表了重要的支撑阻力,如果价格突破枢轴点,则退出仓位,使止损价位“弹性”跟随枢轴点变化。

此外,止损价位也会考虑当前期间内最低价和最高价,进一步优化止损位置,如下代码所示:

```pine
if GoLong 
    stoploss_long := low<pl ? low : pl
if GoShort  
    stoploss_short := high>ph ? high : ph   
```

### 策略优势

1. 使用Stochastic指标判断市场超买超卖状态,避免追高杀跌;

2. 应用弹性止损原理,可以根据市场变化优化止损位置;

3. 结合枢轴点突破实现止损,使止损更有效;

4. 考虑当期最高最低价进行止损优化,使止损更精准。

## 风险及解决方法

1. Stochastic指标发出假信号的风险

    - 解决方法:结合其他指标进行确认,避免错信

2. 止损被突破造成损失扩大的风险

    - 解决方法:适当缩小止损距离,或使用 Chandelier Exit 等止损方式

3. 交易频繁造成交易费用增加的风险

    - 解决方法:适当放宽入场条件,减少交易次数

## 优化思路

1. 优化止损策略,如使用 Chandelier Exit、移动止损、振荡止损等方式

2. 优化入场条件,结合其他指标避免 Stochastic 指标的假信号

3. 优化止盈方式,如使用移动止盈、振荡止盈等,实现更高的盈利率

4. 添加位置管理,如固定每单数量、固定投资比例等,控制单笔风险

5. 优化参数设定,如 K、D 期数、平滑周期等,针对不同市场调整参数

## 总结

本策略通过 Stochastic 指标判断超买超卖状态入场,并使用弹性止损方式进行风险管理。策略具有避免追高杀跌、止损有效等优势,但也存在一定的假信号风险。未来可通过优化入场条件、止损策略、止盈方式、风险管理等方面进一步完善该策略。

||


## Overview

This strategy uses the Stochastic oscillator indicator to determine overbought and oversold market conditions for short-term trading. It goes long when there is a golden cross on the Stochastic indicator, and goes short on a death cross, with elastic stop loss based on previous pivot points to secure profits while controlling risks.

## Strategy Logic

### Entry Logic

The Stochastic oscillator indicator consists of the %K line and %D line. When the %K line crosses above the %D line, a golden cross buy signal is generated. When the %K line crosses below the %D line, a death cross sell signal is triggered. This strategy simply follows the crossovers on the Stochastic indicator to determine entries.

Specifically, when there is a golden cross on the Stochastic indicator, if the %K value is less than 80 (not overbought), a long position will be taken. On a Stochastic death cross, if the %K value is greater than 20 (not oversold), a short position will be initiated.

```pine
GoLong=crossover(k,d) and k<80
GoShort=crossunder(k,d) and k>20
``` 

### Stop Loss Logic

This strategy uses an elastic stop loss approach, setting the stop price based on previous pivot points, as shown below:

```pine
piv_high = pivothigh(high,1,1)
piv_low = pivotlow(low,1,1)

stoploss_long=valuewhen(piv_low,piv_low,0)
stoploss_short=valuewhen(piv_high,piv_high,0) 
```

Pivots represent important support and resistance levels. If price breaks through the pivot level, the position will be closed and the stop loss price will "elasticly" follow the changing pivot points.

In addition, the stop price also considers the highest and lowest prices of the current period for further optimization:

```pine  
if GoLong
    stoploss_long := low<pl ? low : pl
if GoShort
    stoploss_short := high>ph ? high : ph
```

### Advantages

1. Using Stochastic to avoid chasing tops and bottoms;

2. Elastic stop loss follows market changes and optimizes stop price; 

3. Stop loss based on pivot point breakout is more effective;

4. Stop price optimization using current highest and lowest prices makes stop more precise.

## Risks and Solutions

1. Risk of false signals from Stochastic

    - Solution: Confirm signals with other indicators to avoid false signals

2. Risk of stop loss being hit and loss increased

    - Solution: Reduce stop distance, or use methods like Chandelier Exit

3. Risk of high trading frequency and commissions

    - Solution: Loosen entry rules to reduce number of trades

## Optimization Directions 

1. Optimize stop loss, using methods like Chandelier Exit, trailing stop, oscillating stop loss etc

2. Optimize entry rules with other indicators to avoid Stochastic false signals

3. Optimize profit taking, using trailing profit target, oscillating profit target etc to increase profitability

4. Add position sizing, like fixed quantity per trade, fixed risk percentage etc to control per trade risk

5. Optimize parameters like K, D periods, smoothing etc based on different markets

## Summary

This strategy enters based on Stochastic overbought/oversold and manages risk with elastic stop loss. It has the advantage of avoiding chasing momentum, effective stops, but also has some false signal risks. Future improvements can be made on entries, stops, exits, risk management etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|400|TakeProfitLevel|
|v_input_2|10|Entry distance for stop orders|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-28 00:00:00
end: 2023-09-27 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Peter_O

//@version=4
//strategy(title="TradingView Alerts to MT4 MT5 example with cancelling pending orders", commission_type=strategy.commission.cash_per_order, commission_value=0.00003, overlay=true, default_qty_value=100000, initial_capital=1000)

// This script was created for educational purposes only.
// It is showing how to create pending orders and cancel them
// Together with syntax to send these events through TradingView alerts system
// All the way to brokers for execution

TakeProfitLevel=input(400)

// **** Entries logic **** {
periodK = 13 //input(13, title="K", minval=1)
periodD = 3 //input(3, title="D", minval=1)
smoothK = 4 //input(4, title="Smooth", minval=1)
k = sma(stoch(close, high, low, periodK), smoothK)
d = sma(k, periodD)
// plot(k, title="%K", color=color.blue)
// plot(d, title="%D", color=color.orange)
// h0 = hline(80)
// h1 = hline(20)
// fill(h0, h1, color=color.purple, transp=75)

GoLong=crossover(k,d) and k<80
GoShort=crossunder(k,d) and k>20
// } End of entries logic

// **** Pivot-points and stop-loss logic **** {
piv_high = pivothigh(high,1,1)
piv_low = pivotlow(low,1,1)
var float stoploss_long=low
var float stoploss_short=high

pl=valuewhen(piv_low,piv_low,0)
ph=valuewhen(piv_high,piv_high,0)

if GoLong 
    stoploss_long := low<pl ? low : pl
if GoShort 
    stoploss_short := high>ph ? high : ph
plot(stoploss_long, color=color.lime, title="stoploss_long")
plot(stoploss_short, color=color.red, title="stoploss_short")
// } End of Pivot-points and stop-loss logic

CancelLong=crossunder(low,stoploss_long) and strategy.position_size[1]<=0 and strategy.position_size<=0
CancelShort=crossover(high,stoploss_short) and strategy.position_size[1]>=0 and strategy.position_size>=0
entry_distance=input(10, title="Entry distance for stop orders")

plotshape(CancelLong ? stoploss_long[1]-10*syminfo.mintick : na, location=location.absolute, style=shape.labelup, color=color.gray, textcolor=color.white, text="cancel\nlong", size=size.tiny)
plotshape(CancelShort ? stoploss_short[1]+10*syminfo.mintick : na, location=location.absolute, style=shape.labeldown, color=color.gray, textcolor=color.white, text="cancel\nshort", size=size.tiny)

strategy.entry("Long", strategy.long, when=GoLong, stop=close+entry_distance*syminfo.mintick)
strategy.exit("XLong", from_entry="Long", stop=stoploss_long, profit=TakeProfitLevel)
strategy.cancel("Long", when = CancelLong)
strategy.entry("Short", strategy.short, when=GoShort, stop=close-entry_distance*syminfo.mintick)
strategy.exit("XShort", from_entry="Short", stop=stoploss_short, profit=TakeProfitLevel)
strategy.cancel("Short", when = CancelShort)

if GoLong
    alertsyntax_golong='long offset=' + tostring(entry_distance) + ' slprice=' + tostring(stoploss_long) + ' tp=' + tostring(TakeProfitLevel)
    alert(message=alertsyntax_golong, freq=alert.freq_once_per_bar_close)
if GoShort
    alertsyntax_goshort='short offset=' + tostring(-entry_distance) + ' slprice=' + tostring(stoploss_short) + ' tp=' + tostring(TakeProfitLevel)
    alert(message=alertsyntax_goshort, freq=alert.freq_once_per_bar_close)
if CancelLong
    alertsyntax_cancellong='cancel long'
    alert(message=alertsyntax_cancellong, freq=alert.freq_once_per_bar_close)
if CancelShort
    alertsyntax_cancelshort='cancel short'
    alert(message=alertsyntax_cancelshort, freq=alert.freq_once_per_bar_close)
    

```

> Detail

https://www.fmz.com/strategy/428050

> Last Modified

2023-09-28 10:45:41
