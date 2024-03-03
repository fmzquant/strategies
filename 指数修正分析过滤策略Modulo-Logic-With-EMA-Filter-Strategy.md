
> Name

指数修正分析过滤策略Modulo-Logic-With-EMA-Filter-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b88656dee5c507840a.png)
[trans]

### 概述

该策略通过使用模运算和指数移动平均线的组合,实现了一个随机性强的趋势过滤器,用于判断持仓方向。策略首先计算价格除以一个设定数字的余数是否为0,如果为0则有交易信号出现。此信号若在指数移动平均线之下,做空;若在指数移动平均线之上,做多。该策略综合了数学运算的随机性与技术指标的趋势判断,利用不同周期指标之间的交叉验证,有效过滤掉部分冲击价格的随机性行情。

### 策略原理

1. 设置价格输入值a为收盘价close,可以修改;设置除数b值为4,可以修改。
2. 计算a除以b的余数modulo,判断余数是否为0。
3. 设置指数移动平均线长度MALen,默认为70周期,作为价格中长期趋势的判断指标。
4. 当余数modulo为0时产生交易信号evennumber,与EMA关系决定方向。当价格上穿EMA线时,产生买入信号BUY;当价格下穿EMA线时,产生卖出信号SELL。
5. 交易entries按照信号方向进入做多或做空仓位。策略可以限制反向开仓以控制交易次数。
6. 止损条件根据三种止损方式设置:固定止损、ATR止损、价格波动范围止损。止盈条件为止损的反向。 
7. 可选择是否使用移动止损以锁定更多利润,默认不使用。

### 优势分析

1. 模运算的随机性避免受价格震荡的影响,与移动平均线的趋势判断组合,可以有效过滤掉部分无效信号。
2. 指数移动平均线作为中长期趋势判断指标,与模运算的短期信号组合使用,实现多层验证,避免虚假信号。  
3. 可自定义的参数设置非常灵活,可以根据不同市场调整参数,寻找最佳参数组合。
4. 集成了多种止损方式,可以控制风险。同时设置了止盈条件来锁定利润。
5. 支持直接反向开仓,可以无缝切换仓位方向。也可以关闭此功能以减少交易次数。

### 风险分析

1. 参数设置不当可能导致产生过多交易信号,增加交易频率和滑点成本。
2. 指数移动平均线作为唯一的趋势判断指标,可能产生滞后,错过价格反转时机。 
3. 固定止损方式可能过于机械,无法对市场波动进行调整。
4. 直接反向开仓会增加仓位调整的频率,增加交易成本和风险。

### 优化方向

1. 可以测试不同均线指标代替EMA,或组合使用EMA和其他均线,看是否可以提高获利率。
2. 可以尝试将模运算过滤与其他策略结合,如布林带、K线形态等,形成更稳定的过滤器。
3. 可以研究自适应止损方式,根据市场波动程度来调整止损距离。
4. 可以设置交易次数或损益阈值来限制直接反向开仓的次数。

### 总结

该策略通过模运算实现随机过滤与移动平均线趋势判断的有效结合,参数设置灵活,可以根据不同市场环境进行调整优化,从而获得更可靠的交易信号。同时集成了多种止损机制控制风险,以及止盈和移动止损来锁定利润。该策略整体思路清晰,易于理解与修改,值得进一步测试与优化,具有很大的实盘应用潜力。

||

### Overview

This strategy combines modulo arithmetic operations and exponential moving averages to create a strong randomness filter for determining position direction. It first calculates the remainder of the price divided by a set number, and a trading signal is generated if the remainder is 0. If this signal is below the EMA line, go short; if above, go long. This strategy integrates the randomness of mathematical operations and the trend judgment of technical indicators, making use of cross validation between indicators of different cycles to effectively filter out some of the market noise.

### Strategy Logic  

1. Set the price input value a to close, modifiable; set the divisor b to 4, modifiable.
2. Calculate the remainder modulo of a divided by b, determine if modulo equals 0.  
3. Set length of the EMA (MALen) to 70 periods by default as a metric for medium-to-long term trend.
4. When modulo equals 0, a trading signal evennumber is generated. Combined with EMA relationship it determines direction. When price crosses above EMA, a BUY signal is generated; when price crosses below EMA, a SELL signal is generated.
5. Trading entries are opened long or short based on signal direction. Strategy can restrict reverse opening position to control number of trades.
6. Stop loss conditions are set based on 3 options: fixed stop loss, ATR stop loss, price swing stop loss. Take profit condition is the reverse of stop loss.
7. Trailing stop can be enabled to lock in more profits, disabled by default.

### Advantage Analysis

1. The randomness of modulo arithmetic avoids effects of price fluctuations, combined with trend judgment of moving averages, it can effectively filter out invalid signals.  
2. EMA as metric for medium-to-long term trend combined with short-term modulo signals realizes multi-layer verification and avoids false signals.
3. Highly flexible customizable parameters, can be adjusted for different markets to find optimal parameter combinations.  
4. Integrates multiple stop loss methods to control risks. Take profit conditions also set to lock in profits.
5. Supports direct reverse opening of positions for seamless switching of direction. Can also disable to reduce number of trades.

### Risk Analysis  

1. Improper parameter settings may generate too many trading signals, increasing trading frequency and slippage costs.
2. EMA as sole trend judgment metric may lag, missing price reversal moments.
3. Fixed stop loss method can be too mechanical, unable to adjust for market fluctuations.  
4. Direct reverse opening increases frequency of position adjustments, adding to costs and risks.

### Optimization Directions

1. Test different moving averages instead of EMA, or combine EMA with other MAs, to see if profitability rate can be improved.
2. Try combining modulo filter with other strategies like Bollinger Bands, candlestick patterns etc to create more stable filters.  
3. Research adaptive stop loss methods based on market volatility levels to adjust stop distance. 
4. Set limits on number of trades or profit/loss thresholds to restrict frequency of direct reverse opening.  

### Conclusion

This strategy effectively combines the randomness of modulo operations and trend judgment of moving averages through flexible parameter adjustments catered for different market environments, resulting in reliable trading signals. It also integrates various stop mechanisms to control risks as well as take profit and trailing stops to lock in profits. The overall logic is clear and easy to understand and modify. It has immense practical potential worth further testing and optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Strategy Direction|
|v_input_2|true|-----------------Strategy Inputs-------------------|
|v_input_3_close|0|Dividend: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|4|Divisor|
|v_input_5|true|Use Modulo Logic|
|v_input_6|70|EMA Length|
|v_input_7|true|-----------------General Inputs-------------------|
|v_input_8|true|Use Stop Loss and Take Profit|
|v_input_9|0|Type Of Stop: ATR Stop|Swing Lo/Hi|Strategy Stop|
|v_input_10|10|Swing Point Lookback|
|v_input_11|3|Swing Point SL Perc Increment|
|v_input_12|14|ATR Length|
|v_input_13|4|ATR Multiple|
|v_input_14|true|Take Profit Risk Reward Ratio|
|v_input_15|false|Trailing Stop|
|v_input_16|true|Allow Direct Position Reverse|
|v_input_17|false|Reverse Trades|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-12 00:00:00
end: 2023-12-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tweakerID

// To understand this strategy first we need to look into the Modulo (%) operator. The modulo returns the remainder numerator 
// of a division's quotient (the result). If we do 5 / 3, we get 1 and 2/3 as a result, where the remainder is 2 (two thirds, in this case). This can be
// used for many things, for example to determine when a number divides evenly into another number. If we divide 3/3, our result is 1,
// with no remainder numerator, hence our modulo result is 0. In this strategy, we compare a given number (divisor, user defined) with the
// the closing price of every candle (dividend, modifiable from the inputs panel) to determine if the result between their division is an even number. 
// If the answer is true, we have an entry signal. If this signal occurs below the EMA (length is defined by the user) we go short and
// viceversa for longs. This logic can be reversed. In this case, the modulo works as a random-like filter for a moving average strategy
// that usually struggles when the market is ranging.

//@version=4

//@version=4
strategy("Modulo Logic + EMA Strat", 
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

a=input(close, title="Dividend")
b=input(4, title="Divisor")
usemod=input(true, title="Use Modulo Logic")
MALen=input(70, title="EMA Length")

/////////////////////// BACKTESTER /////////////////////////////////////////////
title2=input(true, "-----------------General Inputs-------------------")  

// Backtester General Inputs
i_SL=input(true, title="Use Stop Loss and Take Profit")
i_SLType=input(defval="ATR Stop", title="Type Of Stop", options=["Strategy Stop", "Swing Lo/Hi", "ATR Stop"])
i_SPL=input(defval=10, title="Swing Point Lookback")
i_PercIncrement=input(defval=3, step=.1, title="Swing Point SL Perc Increment")*0.01
i_ATR = input(14, title="ATR Length")
i_ATRMult = input(4, step=.1, title="ATR Multiple")
i_TPRRR = input(1, step=.1, title="Take Profit Risk Reward Ratio")
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

float LongStop = na
float ShortStop = na
float StratTP = na
float StratSTP = na

/////////////////////// STRATEGY LOGIC /////////////////////////////////////////

modulo=a%b
evennumber=modulo==0
MA=ema(close, MALen)
plot(MA)

BUY=usemod ? evennumber and close > MA : close > MA
SELL=usemod ? evennumber and close < MA : close < MA

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

https://www.fmz.com/strategy/435256

> Last Modified

2023-12-13 15:55:07
