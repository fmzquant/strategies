
> Name

动态CCI突破策略DCCI-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/161da426ec0b2bce95f.png)
[trans]
## 概述

动态CCI突破策略是一个利用CCI指标识别超卖超买的短线交易策略。它结合CCI指标和WMA平均线,在CCI指标从超卖区域反弹的时候做多,在CCI指标从超买区域回落的时候做空,获利后退出。

## 策略原理

该策略使用CCI指标判断市场的超买超卖情况。CCI指标可以有效识别价格异常情况。当CCI指标低于-100的时候,视为市场超卖;当高于100的时候,则为市场超买。策略会在CCI指标由低于-100上穿为做多信号;由高于100下穿为做空信号。 

同时,策略还结合WMA均线判断趋势方向。只有当收盘价高于WMA均线时,做多信号才有效;只有当收盘价低于WMA均线时,做空信号才有效。这样可以过滤掉部分不明确的交易信号。 

入场后,策略采用止损方法控制风险。有三种可选的止损方式:固定策略止损、价格波动范围止损、ATR止损。做多的时候,价格下跌到止损线就会止损退出;做空的时候,价格上涨到止损线就会止损退出。

## 优势分析

该策略具有以下几个优势:

1. 利用CCI指标识别反转机会,可以及时捕捉超卖超买的机会。
2. 结合均线判断方向,避免做反趋势的交易。
3. 采用多种可选的止损方式,可以根据市场调整止损。
4. 策略信号简单明确,容易实现。

## 风险分析

该策略也存在以下风险:

1. CCI指标容易产生假信号,无法完全避免。
2. 止损方式不当可能造成过度止损。
3. 无法识别趋势,在震荡行情中会产生过多不必要交易。
4. 无法判断整体市场走势,可能做反向操作。

针对上述风险,主要的优化方式有:

1. 结合其它指标过滤CCI指标信号。
2. 根据回测优化止损的位置。
3. 增加趋势判断指标,避免震荡行情。
4. 判断大级别的支持位和压力位,决定操作方向。

## 优化方向  

该策略主要可以从以下几个方面进行优化:

1.  CC指标参数优化:调整CCI指标的周期参数,优化指标参数。

2. 止损方式优化:测试不同的止损方式,选择最优止损。可以加入追踪止损方式。

3. 过滤指标优化:加入MACD、RSI等其它指标,构建多指标过滤体系,减少虚假信号。

4. 趋势判断优化:加入移动平均线等趋势判断指标,避免逆势操作。

5. 自动止盈优化:建立动态止盈方式,让策略可以根据市场波动自动止盈。

## 总结

动态CCI突破策略整体是一个非常实用的短线交易策略。它利用CCI指标判定超买超卖,并辅以均线判断方向的方式进入场内。风险控制采用止损方式。该策略信号简单明确,容易实现,适合短线交易。通过不断测试和优化参数,可以让策略效果更加出色。

||

## Overview  

The DCCI Breakout Strategy is a short-term trading strategy that identifies oversold and overbought situations using the CCI indicator. It combines the CCI indicator and WMA moving average line. It goes long when the CCI indicator bounces back from the oversold zone and goes short when the CCI indicator falls back from the overbought zone, exiting after making a profit.

## Strategy Logic  

The strategy uses the CCI indicator to judge the overbought/oversold conditions of the market. The CCI indicator can effectively identify abnormal price situations. Values below -100 indicate the market is oversold while values above 100 indicate the market is overbought. The strategy will go long when the CCI indicator crosses above -100 coming from below; and will go short when the CCI indicator crosses below 100 coming from above.

At the same time, the strategy also incorporates the WMA moving average line to determine trend direction. Only when the closing price is above the WMA line will long signals be valid; only when the closing price is below the WMA line will short signals be valid. This helps filter out some ambiguous trade signals.

After entering a position, the strategy uses stop loss to control risks. There are three optional stop loss methods: fixed strategy stop, swing high/low stop, ATR stop. When long, the position will be stopped out if price falls to the stop level; when short, the position will be stopped out if price rises to the stop level.

## Advantage Analysis  

The strategy has the following advantages:

1. Captures oversold and overbought opportunities in a timely manner by identifying reversals using the CCI indicator.  

2. Avoids trading against the trend by incorporating trend direction analysis using moving averages.

3. Provides multiple optional stop loss methods that can be adjusted based on market conditions.  

4. Simple and clear trading signals that are easy to implement.

## Risk Analysis

The strategy also has the following risks:

1. The CCI indicator can easily generate false signals that cannot be completely avoided.  

2. Improper stop loss placement may cause over-stopping out. 

3. Inability to identify trends means too many unnecessary trades may be generated in ranging markets.  

4. Inability to judge overall market direction may result in trading in the wrong direction.

To address these risks, the main optimization approaches are:  

1. Incorporate other indicators to filter CCI signals.

2. Optimize stop placement through backtesting.  

3. Add trend identification indicators to avoid choppy markets. 

4. Determine direction of trade based on analysis of major support and resistance areas.


## Optimization Directions

The main aspects for optimizing this strategy include:

1. CCI Parameter Optimization: Adjust CCI lookback period, optimize indicator parameters.  

2. Stop Loss Optimization: Test different stop methods and select the optimal stop loss. Consider adding trailing stops.

3. Filter Optimization: Add additional filters like MACD, RSI to build a multi-indicator filtering system to reduce false signals.

4. Trend Filtering: Add trend identifying indicators like moving averages to avoid countertrend trades.  

5. Auto Profit Taking: Build dynamic profit taking mechanisms to automatically take profits based on market volatility.

## Conclusion  

Overall, the DCCI Breakout Strategy is a very practical short-term trading system. It identifies overbought/oversold situations using the CCI indicator and incorporates the moving average for directional bias. Risk is managed through stop losses. The simple and clear signals make this strategy easy to implement for short-term trading. Continual testing and optimization can further improve strategy performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Strategy Direction|
|v_input_2|true|-----------------Strategy Inputs-------------------|
|v_input_3|false|Strategy Stop Mult|
|v_input_4|16|CCI Length|
|v_input_5|5|WMA Length|
|v_input_6|true|-----------------General Inputs-------------------|
|v_input_7|true|Use Stop Loss and Take Profit|
|v_input_8|0|Type Of Stop: ATR Stop|Swing Lo/Hi|Strategy Stop|
|v_input_9|10|Swing Point Lookback|
|v_input_10|2|Swing Point SL Perc Increment|
|v_input_11|14|ATR Length|
|v_input_12|10|ATR Multiple|
|v_input_13|1.5|Take Profit Risk Reward Ratio|
|v_input_14|true|Allow Direct Position Reverse|
|v_input_15|false|Reverse Trades|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-11 00:00:00
end: 2023-09-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tweakerID

// ---From the "Bitcoin Trading Strategies" book, by David Hanson---

// After testing, works better with an ATR stop instead of the Strategy Stop. This paramater
// can be changed from the strategy Inputs panel.

// "CCI Scalping Strategy
// Recommended Timeframe: 5 minutes
// Indicators: 20 Period CCI, 20 WMA
// Long when: Price closes above 20 WMA and CCI is below -100, enter when CCI crosses above -100.
// Stop: Above 20 WMA"

//@version=4
strategy("CCI Scalping Strat", 
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

i_Stop = input(0, step=.05, title="Strategy Stop Mult")*.01
i_CCI=input(16, title="CCI Length")
i_WMA=input(5, title="WMA Length")

/////////////////////// BACKTESTER /////////////////////////////////////////////
title2=input(true, "-----------------General Inputs-------------------")  

// Backtester General Inputs
i_SL=input(true, title="Use Stop Loss and Take Profit")
i_SLType=input(defval="ATR Stop", title="Type Of Stop", options=["Strategy Stop", "Swing Lo/Hi", "ATR Stop"])
i_SPL=input(defval=10, title="Swing Point Lookback")
i_PercIncrement=input(defval=2, step=.1, title="Swing Point SL Perc Increment")*0.01
i_ATR = input(14, title="ATR Length")
i_ATRMult = input(10, step=.1, title="ATR Multiple")
i_TPRRR = input(1.5, step=.1, title="Take Profit Risk Reward Ratio")

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

/////////////////////// STRATEGY LOGIC /////////////////////////////////////////

//CCI
CCI=cci(close, i_CCI)
//WMA
WMA=wma(close, i_WMA)

//Stops
LongStop=valuewhen(bought, WMA, 0)*(1-i_Stop)
ShortStop=valuewhen(bought, WMA, 0)*(1+i_Stop)
StratTP=strategy.position_avg_price + (strategy.position_avg_price - LongStop)*i_TPRRR
StratSTP=strategy.position_avg_price - (ShortStop - strategy.position_avg_price)*i_TPRRR

BUY = (close > WMA) and crossover(CCI , -100)
SELL = (close < WMA) and crossunder(CCI , 100)

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

strategy.exit("TP & SL", "long", limit=TP, stop=SL, when=i_SL)
strategy.exit("TP & SL", "short", limit=STP, stop=SSL, when=i_SL)

/////////////////////// PLOTS //////////////////////////////////////////////////


plot(WMA)
plot(i_SL and strategy.position_size > 0 ? SL : na , title='SL', style=plot.style_cross, color=color.red)
plot(i_SL and strategy.position_size < 0 ? SSL : na , title='SSL', style=plot.style_cross, color=color.red)
plot(i_SL and strategy.position_size > 0 ? TP : na, title='TP', style=plot.style_cross, color=color.green)
plot(i_SL and strategy.position_size < 0 ? STP : na, title='STP', style=plot.style_cross, color=color.green)
// Draw price action setup arrows
plotshape(BUY ? 1 : na, style=shape.triangleup, location=location.belowbar, 
 color=color.green, title="Bullish Setup", size=size.auto)
plotshape(SELL ? 1 : na, style=shape.triangledown, location=location.abovebar, 
 color=color.red, title="Bearish Setup", size=size.auto)
    
```

> Detail

https://www.fmz.com/strategy/441962

> Last Modified

2024-02-18 10:13:21
