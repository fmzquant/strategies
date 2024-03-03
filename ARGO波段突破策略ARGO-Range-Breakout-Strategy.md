
> Name

ARGO波段突破策略ARGO-Range-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

ARGO波段突破策略是一个基于通道突破的4小时波段交易策略。该策略结合布林通道和突破原理,在4小时时间范围内形成交易信号,以捕捉较大的价格波动。

## 策略原理

该策略首先计算一定周期内的最高价和最低价形成通道范围。然后计算通道中线和通道上下轨的布林线。在通道方向发生转换时,形成买入和卖出信号。

具体来说,策略首先计算N周期(默认47周期)内的最高价upBound和最低价downBound,形成通道的上下边界。然后设置一个偏移率point(默认为1)和容差tol(默认1000),计算通道上轨limitBoundUp和下轨limitBoundDown。当价格上穿下轨时产生买入信号;当价格下穿上轨时产生卖出信号。

此外,该策略还设置了止损止盈条件。买入止损为下轨附近,卖出止损为上轨附近。止盈设置为输入的目标盈亏比例。

## 优势分析

- 利用布林通道原理,可根据市场波动率来调整通道范围,避免被噪声交易影响
- 4小时周期操作,可以捕捉较大的价格波动,获利空间大
- 结合突破策略,可以在趋势转折点形成交易信号,及时捕捉价格跳空
- 设置止损止盈,可以控制每单交易的风险收益比

## 风险及解决

- 布林通道交易容易形成虚假突破,被套牢的风险
- 大周期操作,容易出现亏损扩大的风险
- 停止追踪设置不合理,可能出现超出承受能力的大亏损
- 解决方法:
  - 合理设置通道参数,避免虚假突破
  - 谨慎确定仓位和止损点
  - 优化止盈止损策略,严格控制单笔交易风险

## 优化方向

- 优化布林通道参数,使通道更贴近市场波动状况
- 优化止损止盈策略,实现风险收益比的动态调整
- 增加交易过滤条件,避免被套及追击高点
- 增加多因子判断,避免虚假突破产生错误信号
- 结合趋势及波动率指标,提高决策的准确性
- 优化资金管理策略,根据不同市场情况调整仓位

## 总结

ARGO波段突破策略是一个利用布林通道和突破原理的4小时中长线交易策略。相比短线交易,该策略更看重捕捉价格中长线趋势的转折点。通过参数优化,可适应不同市场环境,在控制风险的前提下获取较大的交易收益。该策略既考虑了趋势性,也关注风险控制,是一种值得推荐的中长线突破交易策略。


||

## Overview

The ARGO Range Breakout Strategy is a 4-hour range trading system inspired by channel breakout principles. It generates trading signals within a 4-hour timeframe to capture significant price movements.

## Strategy Logic

The strategy first calculates the highest high (upBound) and lowest low (downBound) over a defined period to form the channel range. It then computes the midline, upper band and lower band of the Bollinger Channel. Buy and sell signals are triggered when the channel direction changes.

Specifically, the strategy computes the upBound and downBound over N periods (default 47). It then sets a ratio point (default 1) and tolerance tol (default 1000), to calculate the upper limit limitBoundUp and lower limit limitBoundDown of the channel. A buy signal is triggered when the price breaks above the lower limit. A sell signal is triggered when the price breaks below the upper limit. 

In addition, stop loss and take profit conditions are configured. The stop loss for long trades is set near the lower limit, while that for short trades is near the upper limit. The take profit is based on the input target profit/loss ratio.

## Advantage Analysis

- Utilizes Bollinger Channel principles to adapt to market volatility
- 4-hour timeframe aims to capture significant price swings  
- Combining breakout strategy helps detect trend reversals
- Stop loss and take profit controls risk/reward per trade

## Risks and Solutions

- Vulnerable to false breakouts and being trapped
- Large timeframes may lead to widened losses 
- Improper trailing stop may cause unacceptable losses
- Solutions:
  - Optimize channel parameters against false breakouts
  - Carefully determine position sizing and stop loss levels
  - Enhance stop loss/take profit for strict risk control

## Optimization Directions

- Optimize channel parameters for better fit to market volatility
- Dynamically adjust stop loss/take profit for better risk/reward
- Add trade filters to avoid traps and chasing highs
- Incorporate additional factors to avoid false signals
- Combine trend and volatility indicators for better decisions 
- Optimize capital management for different market conditions

## Conclusion

The ARGO Range Breakout Strategy is a 4-hour medium-term trading system based on Bollinger Channel and breakout principles. Compared to short-term trading, it focuses more on catching trend reversals on medium-term timeframes. With proper optimization, it can adapt to different market environments and achieve significant profits while controlling risk. The strategy balances trend following and risk management. It is a recommended medium-term breakout trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Risk|
|v_input_2|47|Length|
|v_input_3|10|Previous|
|v_input_4|5|Stop|
|v_input_5|2|Tolerance|
|v_input_6|5|Past|
|v_input_7|false|Target|
|v_input_8|90|Stop|
|v_input_9|40|Trailing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-10-06 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2

// strategy("ARGO_BAND-STRATEGY", overlay=true,default_qty_value=10000,scale=true,initial_capital=100,currency=currency.USD)

// A 4hours Breakout Strategy work in progres..it's  a starting point, thanks to all tradingview community
//How to use: test it only on gbpjpy 240 min, wait the end of the candle to place next order, red and blue dots are short and long stop orders, Targets are Upper and lowerBands. Test it and enjoy but use at your own risk..
//2016 © F.Peluso


risk=input(title="Risk", defval=1)
length = input(title="Length",  minval=1, maxval=1000, defval=47)
stopBound=input(title="Previous",defval=10)
upBound = highest(high, length)
downBound = lowest(low, length)
point=1
tol=1000
stopT=input(title="Stop", defval=5,minval=1, maxval=5)
dev =input(title="Tolerance",defval=2,minval=1, maxval=5)
limitBoundUp=( highest(high, length))*(point-(dev/tol))
limitBoundDown=downBound/(point-(dev/tol))
plot(limitBoundUp[1],linewidth = 3,style = circles, color = navy,trackprice=true),transp=0
plot(limitBoundDown[1],linewidth = 3,style = circles, color = red,trackprice=true,transp=0)
mezzalinea=((upBound+downBound)/2)

// Color Bands

colo = ((close>limitBoundUp[1]) ? blue : (close<upBound[1]) ? white : na)
UpB = plot(upBound[1], title="Upper Bound", style=linebr, linewidth=1, color=colo)
DownB = plot(limitBoundUp[1] ,title="Lower Bound", style=linebr, linewidth=2, color=colo)
fill(UpB, DownB, color=colo, transp=90)

plot(limitBoundUp[2]/(point+(stopT/tol)),color=colo)

coloS = ((close<limitBoundDown[1]) ? red : (close>downBound[1]) ? white : na)
DB = plot(downBound[1], title="Upper Bound", style=linebr, linewidth=1, color=coloS)
DoB = plot(limitBoundDown[1] ,title="Lower Bound", style=linebr, linewidth=2, color=coloS)
fill(DB, DoB, color=coloS, transp=90)

plot(limitBoundDown[2]*(point+(stopT/tol)),color=coloS)

// Strategy

past=input(title="Past", defval=5)
buy=(crossover(close,limitBoundUp))
closebuy=cross(high[past],upBound[0])
stopbuy = limitBoundUp[2]/(point+(stopT/tol))

sell=crossunder(close,limitBoundDown)
closesell=cross(low[past],downBound[0])


if (not na(close[length]))
    if (buy)
        strategy.entry("ChBrkLE", strategy.long,stop=limitBoundUp - syminfo.mintick,comment="Long I")   

strategy.close("ChBrkLE",when=closebuy)

if (not na(close[length]))
    if (sell)
        strategy.entry("ChBrkSE", strategy.short,stop=limitBoundDown + syminfo.mintick,comment="Short I")   

strategy.close("ChBrkSE",when=closesell)

Target =input(0) * 10 
Stop = input(90) * 10 
Trailing = input(40) * 10
CQ = 100
TPP = (Target > 0) ? Target : na
SLP = (Stop > 0) ? Stop : na
TSP = (Trailing > 0) ? Trailing : na
strategy.exit("Out Short", "ChBrkSE", qty_percent=CQ, profit=TPP, loss=SLP, trail_points=TSP)
strategy.exit("Out Long", "ChBrkLE", qty_percent=CQ, profit=TPP, loss=SLP, trail_points=TSP)
//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/428623

> Last Modified

2023-10-07 16:04:16
