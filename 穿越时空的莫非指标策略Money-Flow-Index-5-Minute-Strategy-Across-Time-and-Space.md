
> Name

穿越时空的莫非指标策略Money-Flow-Index-5-Minute-Strategy-Across-Time-and-Space

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/133f3f4ab85a747d318.png)
 [trans]
### 概述

这是一个利用莫非指标识别市场中的“大鲨鱼”的简单量化策略。它适用于5分钟时间框架,主要用于加密货币交易。

### 策略原理  

该策略使用长度为3的莫非指标,将超买线设定为100,超卖线设定为0。策略等待莫非指标达到超买水平,表明市场中有“大鲨鱼”的存在。如果当天前两个莫非指标超买点,价格仍能保持涨势,那么这是一个多头入场信号。  

当莫非指标=100并且下根K线为大阳线时,做多入场。止损线设定为该交易日的最低点,止盈在入场后60分钟内。

对于做空方面,可以使用镜像逻辑。即莫非指标达到超卖时,下根K线为大阴线时,做空入场。

### 策略优势

1. 使用莫非指标可以有效识别市场中“大鲨鱼”积累潜力股的行为,这类股票有继续上涨的可能。

2. 利用K线实体识别力度较强的突破点,可以过滤许多假突破。 

3. 结合SMA滤波器,避免买入趋势下跌的股票,可有效减少交易风险。

4. 使用日内超短线操作方法,60分钟止盈可以迅速锁定利润,降低回撤概率。

### 策略风险 

1. 莫非指标可能会生成假信号,导致不必要的亏损。可以适当调整参数或添加其他指标进行过滤。

2. 60分钟超短线操作 METHOD 可能过于激进,不适合波动率较高的股票。可以适当调整止盈时间或者使用移动止损来优化。

3. 没有考虑到重大的宏观经济事件发生时带来的市场冲击风险。这时应暂停策略,待市场恢复稳定后继续交易。

### 策略优化方向

1. 可以测试不同参数组合,如调整莫非指标长度,优化SMA周期参数等。

2. 尝试添加其他指标进行组合,如BOLL通道、KD指标等,看是否可以提高信号的准确性。

3. 测试适当放宽止损幅度,是否可以获得更大的单笔利润。

4. 尝试基于该策略框架开发适用于其他周期的版本,如15分钟或30分钟版本。

### 总结

该策略整体来说非常简洁且容易理解,基本思路与经典的跟踪“大鲨鱼”思路一致。通过识别莫非指标超买超卖的关键点,配合K线实体筛选,可以过滤许多噪声。SMA滤波器的添加也进一步提高了策略的稳定性。  

60分钟超短线操作方式可以快速获利,但也带来了较高的操作风险。整体而言,这是一个非常有实战价值的量化策略模板,值得深入研究与优化,也为我们提供了宝贵的策略开发思路。

|| 

### Overview

This is a simple quantitative strategy that uses the Money Flow Index to identify "big sharks" in the market. It is suitable for the 5-minute timeframe and is mainly used for cryptocurrency trading.

### Strategy Principle  

The strategy uses a 3-period Money Flow Index with an overbought level set at 100 and an oversold level set at 0. The strategy waits for the Money Flow Index to reach overbought levels, indicating the presence of "big sharks" in the market. If price holds up on the first two overbought occurrences of the Money Flow Index for the day, it is considered a bullish entry signal.  

A long entry is taken when Money Flow Index = 100 and next candle is a bullish candle with short wicks. The stop loss is set below the low of the trading day and profit is taken within 60 minutes after entry.  

The logic above can be used in a mirrored fashion to take short entries as well. 

### Advantages of the Strategy

1. Using Money Flow Index can effectively identify accumulation behavior by "big sharks" in the market, stocks with continuation potential.

2. Candlestick filters help confirm stronger breakouts, avoiding many false breaks. 

3. The SMA filter avoids buying into declining trends, effectively reducing risk.

4. 60-minute time-based exits quickly lock in profits, reducing drawdowns.

### Risks of the Strategy

1. Money Flow Index may generate false signals, leading to unnecessary losses. Parameters can be adjusted or additional filters added.

2. 60-minute exits may be too aggressive for high volatility stocks. Profit taking time or moving stop loss can be optimized.  

3. Major macro events are not considered which can impact markets. Strategy should be paused until markets stabilize.

### Enhancement Opportunities 

1. Test different parameter combinations like MFI length, SMA periods etc.  

2. Add other indicators like Bollinger Bands, RSI to improve signal accuracy.

3. Test widening stops to allow larger profit targets.  

4. Develop versions for other timeframes like 15 or 30 minutes based on same principles.

### Conclusion

The strategy is simple and easy to understand, aligning with the classic approach of tracking "big sharks". Key overbought/oversold levels combined with candlestick filters remove noise. The SMA filter further enhances robustness.  

The 60-minute timeframe allows fast profits but also introduces higher risk. Overall an insightful strategy template for exploration and optimization, providing a blueprint for systematic development.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Strategy Direction|
|v_input_2|true|-----------------Strategy Inputs-------------------|
|v_input_3|3|MFI Length|
|v_input_4|100|Overbought Level|
|v_input_5|false|Oversold Level|
|v_input_6|0.5|Bar Body Size, 1=No Wicks|
|v_input_7|true|Use MA Trend Filter|
|v_input_8|80|MA Length|
|v_input_9|false|Use 60 minutes exit rule|
|v_input_10|true|Use Mirrored logic for Shorts|
|v_input_11|true|-----------------General Inputs-------------------|
|v_input_12|true|Use Stop Loss and Take Profit|
|v_input_13|0|Type Of Stop: Strategy Stop|Swing Lo/Hi|ATR Stop|
|v_input_14|10|Swing Point Lookback|
|v_input_15|3|Swing Point SL Perc Increment|
|v_input_16|14|ATR Length|
|v_input_17|5|ATR Multiple|
|v_input_18|2.2|Take Profit Risk Reward Ratio|
|v_input_19|false|Trailing Stop|
|v_input_20|true|Allow Direct Position Reverse|
|v_input_21|false|Reverse Trades|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-15 00:00:00
end: 2024-01-22 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

// From "Crypto Day Trading Strategy" PDF file.

// * I'm using a SMA filter to avoid buying when the price is declining. Time frame was better at 15 min according to my test.

// 1 - Apply the 3 period Money Flow Index indicator to the 5 minute chart, using 0 and 100 as our oversold and overbought boundaries
// 2 - Wait for the MFI to reach overbought levels, that indicates the presence of "big sharks" in the market. Price needs to hold up
// the first two MFI overbought occurrences of the day to be considered as a bullish entry signal.*
// 3 - We buy when the MFI = 100 and the next candle is a bullish candle with short wicks.
// 4 - We place our Stop Loss below the low of the trading day and we Take Profit during the first 60 minutes after taking the trade. 

// The logic above can be used in a mirrored fashion to take short entries, this is a custom parameter that can be modified from
// the strategy Inputs panel.

// © tweakerID

//@version=4
strategy("Money Flow Index 5 min Strategy", 
     overlay=true )

direction = input(0, title = "Strategy Direction", type=input.integer, minval=-1, maxval=1)
strategy.risk.allow_entry_in(direction == 0 ? strategy.direction.all : (direction < 0 ? strategy.direction.short : strategy.direction.long))

/////////////////////// STRATEGY INPUTS ////////////////////////////////////////
title1=input(true, "-----------------Strategy Inputs-------------------")  

i_MFI = input(3, title="MFI Length")
OB=input(100, title="Overbought Level")
OS=input(0, title="Oversold Level")
barsizeThreshold=input(.5, step=.05, minval=.1, maxval=1, title="Bar Body Size, 1=No Wicks")
i_MAFilter = input(true, title="Use MA Trend Filter")
i_MALen = input(80, title="MA Length")
i_timedexit=input(false, title="Use 60 minutes exit rule")
short=input(true, title="Use Mirrored logic for Shorts")

/////////////////////// BACKTESTER /////////////////////////////////////////////
title2=input(true, "-----------------General Inputs-------------------")  

// Backtester General Inputs
i_SL=input(true, title="Use Stop Loss and Take Profit")
i_SLType=input(defval="Strategy Stop", title="Type Of Stop", options=["Strategy Stop", "Swing Lo/Hi", "ATR Stop"])
i_SPL=input(defval=10, title="Swing Point Lookback")
i_PercIncrement=input(defval=3, step=.1, title="Swing Point SL Perc Increment")*0.01
i_ATR = input(14, title="ATR Length")
i_ATRMult = input(5, step=.1, title="ATR Multiple")
i_TPRRR = input(2.2, step=.1, title="Take Profit Risk Reward Ratio")
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
DayStart = time == timestamp("UTC", year, month, dayofmonth, 0, 0, 0)
plot(DayStart ? 1e9 : na, style=plot.style_columns, color=color.silver, transp=80, title="Trade Day Start")
float LongStop = valuewhen(DayStart,low,0)*(1-i_PercIncrement)
float ShortStop = valuewhen(DayStart,high,0)*(1+i_PercIncrement)
float StratTP = strategy.position_avg_price + (strategy.position_avg_price - LongStop)*i_TPRRR
float StratSTP = strategy.position_avg_price - (ShortStop - strategy.position_avg_price)*i_TPRRR

/////////////////////// STRATEGY LOGIC /////////////////////////////////////////

MFI=mfi(close,i_MFI)
barsize=high-low
barbodysize=close>open?(open-close)*-1:(open-close)
shortwicksbar=barbodysize>barsize*barsizeThreshold
SMA=sma(close, i_MALen)
MAFilter=close > SMA
timesinceentry=(time - valuewhen(bought, time, 0)) / 60000
timedexit=timesinceentry == 60

BUY = MFI[1] == OB and close > open and shortwicksbar and (i_MAFilter ? MAFilter : true)
bool SELL = na
if short
    SELL := MFI[1] == OS and close < open and shortwicksbar and (i_MAFilter ? not MAFilter : true)

//Debugging Plots
plot(timesinceentry, transp=100, title="Time Since Entry")

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
if i_timedexit
    strategy.close_all(when=timedexit)

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

https://www.fmz.com/strategy/439748

> Last Modified

2024-01-23 14:46:55
