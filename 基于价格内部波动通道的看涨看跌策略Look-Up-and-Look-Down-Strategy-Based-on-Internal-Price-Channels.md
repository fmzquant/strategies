
> Name

基于价格内部波动通道的看涨看跌策略Look-Up-and-Look-Down-Strategy-Based-on-Internal-Price-Channels

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/213f7def01a3e97b8f4.png)
[trans]

## 概述

该策略利用价格内部通道判断未来价格走势,属于趋势跟踪策略。当价格形成一定数量的内部价格波动通道时,判断为趋势转折信号,进行买入或卖出操作。同时结合移动平均线过滤和止损止盈设置来锁定盈利,属于较为常见的量化交易策略。

## 策略原理

该策略判断内部通道的形成是根据前后两根K线的最高价和最低价的大小关系来确定的。当一定数量的K线满足最高价低于前一根K线最高价,最低价高于前一根K线最低价的条件时,则判定为价格内部通道。 

在判断到价格内部通道形成的同时,策略还会判断该内部通道的方向。如果是看涨内部通道,则产生买入信号;如果是看跌内部通道,则产生卖出信号。因此,该策略属于双向交易策略。

为了过滤假信号,该策略还引入了移动平均线指标。只有在价格 above 或 below 移动平均线时,才会产生实际的交易信号。这可以一定程度上避免在盘整市的错误交易。

在入场后,策略还会根据用户选择,设置止损止盈点。可选择的止损方式有三种:固定点止损、ATR 止损、前期最高最低点止损。止盈设置则为风险回报比例止盈。这可以一定程度上锁定利润,控制风险。

## 优势分析

该策略最大的优势在于识别趋势转折点的能力较强。当价格形成一定数量的内部通道时,往往预示着即将产生较大的涨跌幅度。这一判断与传统技术分析理论高度契合。

另外,策略本身可配置性非常强。用户可以自由选择内部通道的数量、移动平均线周期、止损止盈方式等参数。这为不同品种、不同交易风格提供了极大的灵活性。

最后,策略加入的移动平均线过滤和止损止盈设置,也较大程度降低了交易风险。使得策略可以适用于各类市场环境的交易。

## 风险分析 

该策略最大的风险在于对趋势判断出现错误的概率较大。内部通道并不能完全确定价格反转,存在一定的误判概率。如果确定的数量不足,则可能出现假信号的情况。

此外,在盘整或震荡市中,该策略则完全不适用。当价格上下波动,但并未确立趋势时,该策略将连续产生错误信号。这是由于策略机理决定的。

最后,止损设置过于保守,也会致使策略无法持有时间足够长,无法捕获大趋势中的利润。这需要用户自己权衡设置。

## 优化方向

该策略的优化空间还是比较大的。一些可能的优化方向包括:

1. 对内部通道的数量和形态进行优化。可以测试不同数量或不同排列组合下的交易效果。

2. 优化移动平均线的周期参数,使其更好地判断趋势方向。现在的默认周期可能并不适合所有品种。

3. 增加其他指标过滤器。例如引入布林带,只在价格突破布林带上轨或下轨时产生交易信号。

4. 优化止损止盈参数,使策略可以在更长时间内持有头寸。从而捕获超级趋势中的利润。

总的来说,该策略以其对趋势判断的准确性而存在。只要能保证判断的准确性,再辅以适当的风险管理设置,就可以进行效果较好的算法交易。


## 总结

该策略总体来说是基于价格内部通道判断未来价格趋势的量化交易策略。它结合趋势跟踪和趋势反转两种判断方法,具有一定的优势。但也存在一些可以优化的空间,投资者可以基于自己的需要进行相应调整,以适应具体的品种和交易环境。在参数优化后,该策略可以成为非常理想的量化交易策略之一。

||

## Overview

This strategy utilizes internal price channels to determine future price trends and belongs to trend following strategies. When prices form a certain number of internal price fluctuation channels, it is judged as a trend reversal signal to make long or short entries. It also incorporates moving average filtering and stop-loss/take-profit to lock in profits and is a relatively common quantitative trading strategy.

## Strategy Principle  

The strategy determines the formation of internal channels according to the size relationship between the highest and lowest prices of the previous two candlesticks. When a certain number of candlesticks meet the condition that the highest price is lower than the highest price of the previous candlestick and the lowest price is higher than the lowest price of the previous candlestick, an internal price channel is identified.

When an internal channel is identified, the strategy also judges the direction of the channel. If it is a bullish internal channel, a long entry signal is generated. If it is a bearish internal channel, a short entry signal is generated. Therefore, this is a bidirectional trading strategy.

To filter false signals, a moving average indicator is also introduced. Actual trading signals are only generated when the price is above or below the moving average line. This can avoid erroneous trades to some extent in sideways markets. 

After entry, stop-loss and take-profit points can also be set according to user’s choice. There are three available stop loss methods: fixed-point stop loss, ATR stop loss, previous highest/lowest stop loss. The take profit is set according to risk/reward ratio. This can lock in profits to some extent and control risks.

## Advantage Analysis   

The biggest advantage of this strategy is its strong ability to identify trend reversal points. When prices form a certain number of internal channels, it often signals that a relatively large price up/down movement is about to occur. This judgment is highly consistent with traditional technical analysis theories.

In addition, the configurability of the strategy itself is very strong. Users can freely select parameters such as the number of internal channels, moving average cycle, stop loss/take profit method, etc. This provides great flexibility for different products and trading styles.

Finally, the moving average filter and stop-loss/take-profit settings introduced in the strategy also greatly reduce trading risks. Making the strategy adaptable to trading in various market environments.

## Risk Analysis

The biggest risk of this strategy is the relatively high probability of incorrect trend judgments. Internal channels cannot completely determine price reversals, there is a certain probability of misjudgment. If the determined quantity is insufficient, false signals may occur.

In addition, the strategy is completely useless in sideways or volatile markets. When prices fluctuate up and down without establishing a trend, the strategy will continuously generate incorrect signals. This is determined by the mechanism of the strategy.

Finally, if the stop loss is set too conservatively, the strategy may not be able to hold positions long enough to capture profits in major trends. This requires users to balance by themselves.   

## Optimization Directions  

The optimization space of this strategy is still quite large. Some possible optimization directions include:

1. Optimize the quantity and patterns of internal channels. Test trading effects under different quantities or different combination arrangements.

2. Optimize the cycle parameter of the moving average to better determine the trend direction. The current default cycle may not be suitable for all products.

3. Add other indicator filters. For example, introduce Bollinger Bands and only generate trading signals when prices break through the upper or lower rails of the Bands.

4. Optimize stop loss/take profit parameters to allow the strategy to hold positions for longer. Thereby capturing profits in super trends.

In general, the existence of this strategy lies in the accuracy of its trend judgment. As long as the accuracy of the judgment can be ensured, combined with appropriate risk management settings, effective algorithmic trading can be carried out.

## Conclusion  

In summary, this strategy is a quantitative trading strategy that determines future price trends based on internal price channels. It combines trend following and trend reversal judgment methods and has certain advantages. But there is also room for optimization to meet specific products and trading environments. After parameter optimization, it can become one of the most ideal quantitative trading strategies.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Strategy Direction|
|v_input_2|true|-----------------Strategy Inputs-------------------|
|v_input_3|0|# Of Inside Bars in pattern: 1|2|3|4|
|v_input_4|false|Only trade using complete bullish or bearish patterns|
|v_input_5|true|Use MA Trend Filter|
|v_input_6|65|MA Length|
|v_input_7|true|-----------------General Inputs-------------------|
|v_input_8|true|Use Stop Loss and Take Profit|
|v_input_9|0|Type Of Stop: ATR Stop|Swing Lo/Hi|Strategy Stop|
|v_input_10|10|Swing Point Lookback|
|v_input_11|true|Swing Point SL Perc Increment|
|v_input_12|14|ATR Length|
|v_input_13|5|ATR Multiple|
|v_input_14|2|Take Profit Risk Reward Ratio|
|v_input_15|false|Trailing Stop|
|v_input_16|true|Allow Direct Position Reverse|
|v_input_17|false|Reverse Trades|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-03 00:00:00
end: 2023-12-10 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

// From "Day Trading Cryptocurrency 
// Strategies, Tactics, Mindset, and Tools Required To Build Your 
// New Income Stream"
// by Phil C. Senior

// "Inside bars are a two -bar pattern. They can indicate either a continuation of the 
// existing move or a reversal. A continuation occurs when there is no significant 
// support or resistance level in sight, while a reversal occurs close to a strong sup- 
// port or resistance level...
// ...A lot of traders are aware of inside bars but few manage to make money with 
// them. Why is this so? It goes back to interpreting price action. A lot of traders look 
// to trade in geometric ways. What I mean is that they search for fancy shapes on a 
// chart and think that this is what represents true price action. 
// This is not the case. A shape is just a shape. The formation by itself means 
// nothing unless underlying order flow backs it up. This is why it’s extremely impor- 
// tant that you look for inside bars when a trend is already in place. The best place to 
// look for them is in the beginning of trends."

// © tweakerID

//@version=4
strategy("Inside Bar Strategy w/ SL", 
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

i_NBars = input(defval=1, type=input.integer, title="# Of Inside Bars in pattern", options=[1, 2, 3, 4])
i_BarsDirection = input(false, title="Only trade using complete bullish or bearish patterns")
i_MAFilter = input(true, title="Use MA Trend Filter")
i_MALen = input(65, title="MA Length")

/////////////////////// BACKTESTER /////////////////////////////////////////////
title2=input(true, "-----------------General Inputs-------------------")  

// Backtester General Inputs
i_SL=input(true, title="Use Stop Loss and Take Profit")
i_SLType=input(defval="ATR Stop", title="Type Of Stop", options=["Strategy Stop", "Swing Lo/Hi", "ATR Stop"])
i_SPL=input(defval=10, title="Swing Point Lookback")
i_PercIncrement=input(defval=1, step=.1, title="Swing Point SL Perc Increment")*0.01
i_ATR = input(14, title="ATR Length")
i_ATRMult = input(5, step=.1, title="ATR Multiple")
i_TPRRR = input(2, step=.1, title="Take Profit Risk Reward Ratio")
TS=input(false, title="Trailing Stop")

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
float LongStop = valuewhen(bought,low[1],0)*(1-i_PercIncrement)
float ShortStop = valuewhen(bought,high[1],0)*(1+i_PercIncrement)
float StratTP = na
float StratSTP = na

/////////////////////// STRATEGY LOGIC /////////////////////////////////////////

MAFilter=close > sma(close, i_MALen)
plot(i_MAFilter ? sma(close, i_MALen) : na)
bullBar=close > open
bearBar=close < open
contbullBar=barssince(not bullBar) >= (i_NBars+1)
contbearBar=barssince(not bearBar) >= (i_NBars+1)

InsideBar(NBars) =>
    Inside1Bar=high < high[1] and low > low[1] 
    Inside2Bar=high < high[2] and low > low[2] and Inside1Bar
    Inside3Bar=high < high[3] and low > low[3] and Inside1Bar and Inside2Bar
    Inside4Bar=high < high[4] and low > low[4] and Inside1Bar and Inside2Bar and Inside3Bar
    if NBars == 1
        inside1Bar=Inside1Bar
        [inside1Bar]
    else if NBars == 2
        inside2Bar=Inside2Bar
        [inside2Bar]
    else if NBars == 3
        inside3Bar=Inside3Bar   
        [inside3Bar]
    else if NBars == 4
        inside4Bar=Inside4Bar
        [inside4Bar]
    else
        [na]
[insideBar] = InsideBar(i_NBars) 
    
bullInsideBar=bar_index > 40 and insideBar and bullBar 
     and (i_BarsDirection ? contbullBar : true) and (i_MAFilter ? MAFilter : true)
bearInsideBar=bar_index > 40 and insideBar and bearBar 
     and (i_BarsDirection ? contbearBar : true) and (i_MAFilter ? not MAFilter : true)

BUY = bullInsideBar
SELL = bearInsideBar

//Debugging Plots
plot(contbullBar ? 1:0, transp=100, title="contbullBar")
plot(contbearBar ? 1:0, transp=100, title="contbearBar")

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

https://www.fmz.com/strategy/434998

> Last Modified

2023-12-11 15:56:28
