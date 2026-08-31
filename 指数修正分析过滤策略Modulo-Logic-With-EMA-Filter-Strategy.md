
> Name

指数修正分析过滤策略Modulo-Logic-With-EMA-Filter-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b88656dee5c507840a.png)

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
