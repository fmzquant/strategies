
> Name

Multi-timeframe-RSI-and-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b536e8585044bea157.png)

## Overview

This strategy combines the RSI indicator, simple moving average (SMA) and weighted moving average (WMA) to identify trading signals. It judges the trend direction simultaneously on the 5-min and 1-hour timeframes. Trading signals are generated when the fast RSI line crosses over or under the slow line during a steady trend.  

## Strategy Logic

The strategy first calculates the 144-period WMA and 5-period SMA on both the 1-hour and 5-min timeframes. A bullish market is identified only when the 5-min SMA is above the WMA. The strategy then computes the RSI oscillator and the corresponding K and D lines. Sell signals are generated when the K line crosses below the D line from the overbought area. Buy signals are generated when the K line crosses over the D line from the oversold area.   

## Advantage Analysis  

This is a very effective trend-following strategy. By incorporating two timeframes to determine the trend, it significantly reduces false signals. In addition, it combines multiple filters including RSI, SMA and WMA to make the signals more reliable. By driving KDJ with RSI, it also avoids some fake signals inherent in the normal KDJ strategy. Furthermore, proper stop loss and take profit settings help lock in profits and control risks.  

## Risk Analysis   

The biggest risk of this strategy lies in wrong trend judgement. At turning points, the short-term and long-term moving averages may flip upside or downside together, resulting in wrong signals. Also, RSI may generate more noisy signals during ranging markets. However, these risks can be reduced by properly adjusting the periods of SMA, WMA and RSI parameters. 


## Optimization Directions  

The strategy can be improved from the following aspects:  
1) Test different lengths of SMA, WMA and RSI to find the optimal combination   
2) Incorporate other indicators like MACD, Bollinger Bands to verify signal reliability    
3) Optimize stop loss and take profit mechanisms by testing fixed ratio stops, trailing stops etc.  
4) Add capital management modules to control trade sizing and overall risk exposure  
5) Introduce machine learning models to find the best performing parameters through large-scale backtesting   

## Summary  

The strategy fully utilizes the strengths of moving averages and oscillators to establish a relatively solid trend following system. By confirming signals across multiple timeframes and indicators, it can smoothly capture mid to long term trends. The stop loss and take profit settings also make it withstand normal market fluctuations to a certain degree. However, there are still rooms of improvement, such as testing more indicator combinations, leveraging machine learning for parameter optimization. Overall speaking, this is a very promising trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use Swing Lo/Hi Stop Loss & Take Profit|
|v_input_2|20|Swing Lo/Hi Lookback|
|v_input_3|10|SL Expander|
|v_input_4|30|TP Expander|
|v_input_5|false|Reverse Trades|
|v_input_6|false|Use Trailing Stop|
|v_input_7_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|20|Stochastics Oversold Level|
|v_input_9|80|Stochastics Overbought Level|
|v_input_10|3|smoothK|
|v_input_11|3|smoothD|
|v_input_12|14|lengthRSI|
|v_input_13|14|lengthStoch|
|v_input_14|144|WMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-22 00:00:00
end: 2024-01-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © bufirolas

// Works well with a wide stop with 20 bars lookback
// for the SL level and a 2:1 reward ratio Take Profit .
// These parameters can be modified in the Inputs section of the strategy panel.

// "an entry signal it's a cross down or up on
// the stochastics. if you're in a downtrend
// on the hourly time frame you
// must also be in a downtrend on the five
// minute so the five period has to be below the 144
// as long as the five period is still trading below
// the 144 period on both the hourly and the five minutes
// we are looking for these short signals crosses down
// in the overbought region of the stochastic. Viceversa for longs"

//@version=4
strategy("Stoch + WMA + SMA strat", overlay=true)

//SL & TP Inputs
i_SL=input(true, title="Use Swing Lo/Hi Stop Loss & Take Profit")
i_SwingLookback=input(20, title="Swing Lo/Hi Lookback")
i_SLExpander=input(defval=10, step=1, title="SL Expander")
i_TPExpander=input(defval=30, step=1, title="TP Expander")
i_reverse=input(false, title="Reverse Trades")
i_TStop =input(false, title="Use Trailing Stop")

//Strategy Inputs
src4 = input(close, title="RSI Source")
stochOS=input(defval=20, step=5, title="Stochastics Oversold Level")
stochOB=input(defval=80, step=5, title="Stochastics Overbought Level")

//Stoch rsi Calculations
smoothK = input(3, minval=1)
smoothD = input(3, minval=1)
lengthRSI = input(14, minval=1)
lengthStoch = input(14, minval=1)
rsi1 = rsi(src4, lengthRSI)
k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = sma(k, smoothD)
h0 = hline(80, linestyle=hline.style_dotted)
h1 = hline(20, linestyle=hline.style_dotted)

//MA
wmalen=input(defval=144, title="WMA Length")
WMA = security(syminfo.tickerid, "60", wma(close, wmalen))
SMA = security(syminfo.tickerid, "60", sma(close, 5))
minWMA = wma(close, wmalen)
minSMA = sma(close, 5)

//Entry Logic
stobuy = crossover(k, d) and k < stochOS
stosell = crossunder(k, d) and k > stochOB
mabuy = minSMA > minWMA
daymabuy = SMA > WMA

//SL & TP Calculations
SwingLow=lowest(i_SwingLookback)
SwingHigh=highest(i_SwingLookback)
bought=strategy.position_size != strategy.position_size[1]
LSL=valuewhen(bought, SwingLow, 0)-((valuewhen(bought, atr(14), 0)/5)*i_SLExpander)
SSL=valuewhen(bought, SwingHigh, 0)+((valuewhen(bought, atr(14), 0)/5)*i_SLExpander)
lTP=(strategy.position_avg_price + (strategy.position_avg_price-(valuewhen(bought, SwingLow, 0)))+((valuewhen(bought, atr(14), 0)/5)*i_TPExpander))
sTP=(strategy.position_avg_price - (valuewhen(bought, SwingHigh, 0) - strategy.position_avg_price))-((valuewhen(bought, atr(14), 0)/5)*i_TPExpander)
islong=strategy.position_size > 0
isshort=strategy.position_size < 0

//TrailingStop
dif=(valuewhen(strategy.position_size>0 and strategy.position_size[1]<=0, high,0))
 -strategy.position_avg_price
trailOffset     = strategy.position_avg_price - LSL
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
    
//Stop Selector
SL= islong ? LSL : isshort ? SSL : na
if i_TStop 
    SL:= islong ? tstop : isshort ? Ststop : na
TP= islong ? lTP : isshort ? sTP : na


//Entries
if stobuy and mabuy and daymabuy
    strategy.entry("long", long=not i_reverse?true:false)
if stosell and not mabuy and not daymabuy
    strategy.entry("short", long=not i_reverse?false:true)


//Exit
if i_SL
    strategy.exit("longexit", "long", stop=SL, limit=TP)
    strategy.exit("shortexit", "short", stop=SL, limit=TP)

//Plots
plot(i_SL ? SL : na, color=color.red, style=plot.style_cross)
plot(i_SL ? TP : na, color=color.green, style=plot.style_cross)
plot(minWMA)
plot(minSMA, color=color.green)



```

> Detail

https://www.fmz.com/strategy/439611

> Last Modified

2024-01-22 11:00:20
