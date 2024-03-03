
> Name

双向追Momentum止盈止损策略Consecutive-Up-Down-Strategy-with-Reverse-and-SL-TP-Extension

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fbc6cc394fa0f5770d.png)

[trans]

## 概述

本策略是基于TradingView内置的连续上涨/下跌策略进行扩展。它具有灵活的策略方向设置,可以进行反向交易。同时,集成了摆动高点/低点、ATR止损和追踪止损等多种止损方式,以及对应的止盈设置。这使得该策略在保持原有交易信号的基础上,获得了更好的风险管理。

## 策略原理 

该策略主要通过判断K线的连续上涨或下跌次数,产生买入和卖出信号。用户可以设置买入信号产生所需要的连续上涨K线数量,以及卖出信号所需要的连续下跌K线数量。

同时,策略增加了是否反转交易的设置。开启反转交易后,本来的买入信号会变成卖出信号,卖出信号也会变成买入信号,这样就完成了交易反转。

在进入和退出方面,策略支持直接反向平仓,这样可以减少无仓位时无法交易的情况。

在止损和止盈方面,策略提供了摆动高点/低点、ATR以及策略内置三种可选择的止损方式。止损方式会结合持仓方向,自动选择最低谷或最高峰作为激进止损位,或者根据ATR动态确定止损价格。止盈设置则以策略入场价为基准,设置固定倍数的止盈距离。

如果启用追踪止损,策略可在亏损时加大止损间距,在盈利时缩小止损间距,实现自动追踪。

## 优势分析

该策略最大的优势在于配置灵活,可以适应不同市况,具体优势如下:

1. 可设置买卖筛选参数,适应趋势和震荡行情
2. 支持反转交易,可根据需要选择方向
3. 设置直接反向开仓,可减少无仓位期
4. 集成多种止损方式,可按需要选择
5. 可启用追踪止损,自动止损

## 风险分析

该策略主要风险在于连续K线设置过多可能导致遗漏交易机会,以及止损设置过于激进带来亏损扩大的风险。针对风险建议如下:

1. 调整上涨/下跌K线数量参数,不能过于激进
2. 测试不同的止损方式,选择最适合的
3. 追踪止损要谨慎设置,避免亏损过大

## 优化方向  

本策略还有进一步优化的空间:

1. 可以基于ATR或波动率等指标动态调整上涨/下跌K线数量
2. 可以测试不同持仓时间下的止损止盈比例参数效果
3. 可以设置Open过滤,避免假突破
4. 可以添加其他辅助指标判断,提高信号质量

## 总结

本策略对基准策略进行了有益的扩展,使其可以更好地控制风险,获得更加灵活的交易方式。这是一种易于优化和实盘的有效Momentum策略。

||

## Overview

This strategy is an extension of the built-in consecutive up/down bars strategy on TradingView. It has flexible direction settings that allow reverse trading. Also, integrated with various stop loss methods like swing points/low, ATR stop, and strategy stop, as well as take profit settings accordingly. This makes the strategy better at risk management while keeping the original trading signals.

## Strategy Logic

The strategy mainly uses the consecutive up or down bars to generate buy and sell signals. Users can configure the needed consecutive up bars for buy signals, and consecutive down bars for sell signals. 

Also, the reverse trade option is added. By enabling it, the original buy signals become sell signals, and vice versa, thus completing the trade reversal.

For entries and exits, direct position reverse is supported to reduce the time with no position.

For stop loss and take profit, swing points/low, ATR stop and strategy stop are provided for choice. The stop loss method will combine with position direction to pick swing low or high as aggressive stop, or use ATR to dynamically define stop price. Take profit sets a fixed distance based on entry price. 

If trailing stop enabled, the strategy can loosen stop distance when losing, and tighten when profiting. This achieves automatic trailing effect.

## Advantage Analysis  

The biggest advantage of this strategy is flexibility to adapt to different market conditions:

1. Buy/sell filter parameters can be set for both trending and ranging markets
2. Reverse trade allows direction choice when needed 
3. Direct reverse position reduces time with no position
4. Multiple stop loss methods, select as needed
5. Trailing stop available for automatic effect

## Risk Analysis

The main risks are too many consecutive bars leading to missing trades, and aggressive stop loss causing extended losses. Suggestions are:

1. Adjust up/down bars quantity moderately, not too aggressive
2. Test different stop loss methods, find the best fit one
3. Use trailing stop cautiously, avoid too big losses

## Optimization Directions

There is room for further optimization:

1. Dynamically adjust up/down bars based on ATR or volatility
2. Test stop loss/profit ratio under different holding periods 
3. Add open price filter to avoid false breakout
4. Integrate other indicators for better signal quality

## Conclusion

This strategy makes beneficial extensions to the base strategy for better risk control and more flexible trading. It is an effective momentum strategy that is easy to optimize and trade live.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Strategy Direction|
|v_input_2|true|-----------------Strategy Inputs-------------------|
|v_input_3|3|consecutiveBarsUp|
|v_input_4|4|consecutiveBarsDown|
|v_input_5|true|-----------------General Inputs-------------------|
|v_input_6|true|Use Stop Loss and Take Profit|
|v_input_7|0|Type Of Stop: ATR Stop|Swing Lo/Hi|Strategy Stop|
|v_input_8|10|Swing Point Lookback|
|v_input_9|2|Swing Point SL Perc Increment|
|v_input_10|14|ATR Length|
|v_input_11|5|ATR Multiple|
|v_input_12|5|Take Profit Risk Reward Ratio|
|v_input_13|true|Trailing Stop|
|v_input_14|true|Allow Direct Position Reverse|
|v_input_15|false|Reverse Trades|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-07 00:00:00
end: 2023-08-30 05:20:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// Extension of the built-in strategy by Tradingview. The strategy buys after an X amount of
// consecutive bullish bars and viceversa for selling. This logic can be reversed and a Stop Loss
// with Take Profit can be added. There's also an option to adapt the SL into a Trailing Stop.

//@version=4
strategy("Consecutive Up/Down Strategy with Reverse", 
     overlay=true, 
     default_qty_type=strategy.percent_of_equity, 
     default_qty_value=100, 
     initial_capital=10000, 
     commission_value=0.04, 
     calc_on_every_tick=false, 
     slippage=0)

direction = input(0, title = "Strategy Direction", type=input.integer, minval=-1, maxval=1)
strategy.risk.allow_entry_in(direction == 0 ? strategy.direction.all : (direction < 0 ? strategy.direction.short : strategy.direction.long))

/////////////////////// STRATEGY INPUTS ////////////////////////////////////////
title1=input(true, "-----------------Strategy Inputs-------------------")  

consecutiveBarsUp = input(3)
consecutiveBarsDown = input(4)

/////////////////////// BACKTESTER /////////////////////////////////////////////
title2=input(true, "-----------------General Inputs-------------------")  

// Backtester General Inputs
i_SL=input(true, title="Use Stop Loss and Take Profit")
i_SLType=input(defval="ATR Stop", title="Type Of Stop", options=["Strategy Stop", "Swing Lo/Hi", "ATR Stop"])
i_SPL=input(defval=10, title="Swing Point Lookback")
i_PercIncrement=input(defval=2, step=.1, title="Swing Point SL Perc Increment")*0.01
i_ATR = input(14, title="ATR Length")
i_ATRMult = input(5, step=.1, title="ATR Multiple")
i_TPRRR = input(5, step=.1, title="Take Profit Risk Reward Ratio")
TS=input(true, title="Trailing Stop")

// Bought and Sold Boolean Signal
bought = strategy.position_size > strategy.position_size[1] 
 or strategy.position_size < strategy.position_size[1]

// Price Action Stop and Take Profit
LL=(lowest(i_SPL))*(1-i_PercIncrement)
HH=(highest(i_SPL))*(1+i_PercIncrement)
LL_price = valuewhen(bought, LL, 0)
HH_price = valuewhen(bought, HH, 0)
entry_LL_price = strategy.position_size > 0 ? LL_price : na 
entry_HH_price = strategy.position_size < 0 ? HH_price : na 
tp=strategy.position_avg_price + (strategy.position_avg_price - entry_LL_price)*i_TPRRR
stp=strategy.position_avg_price - (entry_HH_price - strategy.position_avg_price)*i_TPRRR

// ATR Stop
ATR=atr(i_ATR)*i_ATRMult
ATRLong = ohlc4 - ATR
ATRShort = ohlc4 + ATR
ATRLongStop = valuewhen(bought, ATRLong, 0)
ATRShortStop = valuewhen(bought, ATRShort, 0)
LongSL_ATR_price = strategy.position_size > 0 ? ATRLongStop : na 
ShortSL_ATR_price = strategy.position_size < 0 ? ATRShortStop : na 
ATRtp=strategy.position_avg_price + (strategy.position_avg_price - LongSL_ATR_price)*i_TPRRR
ATRstp=strategy.position_avg_price - (ShortSL_ATR_price - strategy.position_avg_price)*i_TPRRR


// Strategy Stop
float LongStop = na
float ShortStop = na
float StratTP = na
float StratSTP = na

/////////////////////// STRATEGY LOGIC /////////////////////////////////////////

price = close
ups = 0.0
ups := price > price[1] ? nz(ups[1]) + 1 : 0
dns = 0.0
dns := price < price[1] ? nz(dns[1]) + 1 : 0

BUY=ups >= consecutiveBarsUp and bar_index > 40
SELL=dns >= consecutiveBarsDown and bar_index > 40

//Trading Inputs
DPR=input(true, "Allow Direct Position Reverse")
reverse=input(false, "Reverse Trades")

// Entries
if reverse
    if not DPR
        strategy.entry("long", strategy.long, when=SELL and strategy.position_size == 0)
        strategy.entry("short", strategy.short, when=BUY and strategy.position_size == 0)
    else     
        strategy.entry("long", strategy.long, when=SELL)
        strategy.entry("short", strategy.short, when=BUY)
else
    if not DPR 
        strategy.entry("long", strategy.long, when=BUY and strategy.position_size == 0)
        strategy.entry("short", strategy.short, when=SELL and strategy.position_size == 0)
    else
        strategy.entry("long", strategy.long, when=BUY)
        strategy.entry("short", strategy.short, when=SELL)
        



SL= i_SLType == "Swing Lo/Hi" ? entry_LL_price : i_SLType == "ATR Stop" ? LongSL_ATR_price : LongStop
SSL= i_SLType == "Swing Lo/Hi" ? entry_HH_price : i_SLType == "ATR Stop" ? ShortSL_ATR_price : ShortStop
TP= i_SLType == "Swing Lo/Hi" ? tp : i_SLType == "ATR Stop" ? ATRtp : StratTP
STP= i_SLType == "Swing Lo/Hi" ? stp : i_SLType == "ATR Stop" ? ATRstp : StratSTP

//TrailingStop
dif=(valuewhen(strategy.position_size>0 and strategy.position_size[1]<=0, high,0))
 -strategy.position_avg_price
trailOffset     = strategy.position_avg_price - SL
var tstop = float(na)
if strategy.position_size > 0
    tstop := high- trailOffset - dif
    if tstop<tstop[1]
        tstop:=tstop[1]
else
    tstop := na
StrailOffset     = SSL - strategy.position_avg_price
var Ststop = float(na)
Sdif=strategy.position_avg_price-(valuewhen(strategy.position_size<0 
 and strategy.position_size[1]>=0, low,0))
if strategy.position_size < 0
    Ststop := low+ StrailOffset + Sdif
    if Ststop>Ststop[1]
        Ststop:=Ststop[1]
else
    Ststop := na

strategy.exit("TP & SL", "long", limit=TP, stop=TS? tstop : SL, when=i_SL)
strategy.exit("TP & SL", "short", limit=STP, stop=TS? Ststop : SSL, when=i_SL)

/////////////////////// PLOTS //////////////////////////////////////////////////


plot(i_SL and strategy.position_size > 0 and not TS ? SL : i_SL and strategy.position_size > 0 and TS ? tstop : na , title='SL', style=plot.style_cross, color=color.red)
plot(i_SL and strategy.position_size < 0 and not TS ? SSL : i_SL and strategy.position_size < 0 and TS ? Ststop : na , title='SSL', style=plot.style_cross, color=color.red)
plot(i_SL and strategy.position_size > 0 ? TP : na, title='TP', style=plot.style_cross, color=color.green)
plot(i_SL and strategy.position_size < 0 ? STP : na, title='STP', style=plot.style_cross, color=color.green)
// Draw price action setup arrows
plotshape(BUY ? 1 : na, style=shape.triangleup, location=location.belowbar, 
 color=color.green, title="Bullish Setup", size=size.auto)
plotshape(SELL ? 1 : na, style=shape.triangledown, location=location.abovebar, 
 color=color.red, title="Bearish Setup", size=size.auto)
```

> Detail

https://www.fmz.com/strategy/438026

> Last Modified

2024-01-08 11:58:21
