
> Name

Multifactor-Dynamic-Money-Management-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1efccebef172067cffb.png)



## Overview

This strategy integrates MACD, RSI, PSAR and other technical indicators together with the dynamic money management methodology to track trends and make reversal trades across multiple timeframes. The strategy can be applied for short-term, medium-term and long-term trading.

## Principles 

The strategy uses PSAR indicator to determine the trend direction. The crossover between EMA and BB middle line serves as the first confirmation point. MACD histogram direction acts as the second confirmation point. RSI overbought and oversold areas serve as the third confirmation point. Trading signals are generated when all the above conditions are met.

After entering the position, take profit and stop loss points are set. The stop loss point is determined by multiplying ATR value by a fixed number. The take profit point is calculated in the same way. Meanwhile, floating loss percentage stop loss is set. When the loss reaches a certain percentage of total account equity, the stop loss will be triggered. 

There is also percentage setting for floating profit. When profit reaches a certain percentage of total account equity, take profit will be triggered.

Dynamic money management calculates position size based on total account equity, ATR value and the multiplier used for stop loss. Minimum trading quantity is also set.

## Advantages

1. Multiple factor confirmation avoids false breakouts and improves entry accuracy.

2. Dynamic money management controls single trade risk and protects the account effectively. 

3. Stop loss and take profit points are set according to ATR, which can be adjusted based on market volatility.

4. Floating loss and profit percentage settings lock in profits and prevent pullbacks.

## Risks

1. Multiple factor combinations may miss some trading opportunities.

2. High percentage settings can lead to greater losses.

3. Improper ATR value settings may result in stop loss and take profit points that are too wide or too aggressive. 

4. Improper money management settings may lead to excessively large position sizes.

## Optimization Directions 

1. Adjust factor weights to improve signal accuracy.

2. Test different percentage parameter settings to find optimal combinations.

3. Select reasonable ATR multipliers based on different product characteristics.

4. Dynamically adjust money management parameters based on backtest results.

5. Optimize timeframe settings and test trading sessions.

## Summary

This strategy integrates multiple technical indicators for trend determination and adds dynamic money management to control risks, realizing steady profits across multiple timeframes. It can be further optimized by adjusting factor weights, risk control parameters and money management settings based on backtest results.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|6|From Month|
|v_input_3|2020|From Year|
|v_input_4|true|To Day|
|v_input_5|12|To Month|
|v_input_6|2020|To Year|
|v_input_7|5|length|
|v_input_8|23|overSold|
|v_input_9|72|overBought|
|v_input_10|12|Fast Length|
|v_input_11|26|Slow Length|
|v_input_12_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_13|9|Signal Smoothing|
|v_input_14|true|Simple MA(Oscillator)|
|v_input_15|true|Simple MA(Signal Line)|
|v_input_16|0.02|start|
|v_input_17|0.02|increment|
|v_input_18|0.2|maximum|
|v_input_19|17|length_bb|
|v_input_20_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_21|2|StdDev|
|v_input_22|false|Offset|
|v_input_23|10|Length|
|v_input_24_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_25|false|Offset|
|v_input_26|14|Average True Range Period|
|v_input_27|2|Risk %|
|v_input_28|false|Is this a 2 digit pair? (JPY, XAU, XPD...|
|v_input_29|true|Equity Protection %|
|v_input_30|2|Equity TP %|
|v_input_31|5|multi atr tp|
|v_input_32|5|multi atr sl|
|v_input_33|true|SL X|
|v_input_34|true|TP X|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-16 00:00:00
end: 2023-10-16 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SoftKill21

//@version=4
strategy("EURUSD 1min strat RISK %% ", overlay=false, initial_capital = 1000)

// BACKTESTING RANGE
 
// From Date Inputs
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 6, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2020, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2020, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
DST = 1 //day light saving for usa
//--- Europe
London = iff(DST==0,"0000-0900","0100-1000")
//--- America
NewYork = iff(DST==0,"0400-1500","0500-1600")
//--- Pacific
Sydney = iff(DST==0,"1300-2200","1400-2300")
//--- Asia
Tokyo = iff(DST==0,"1500-2400","1600-0100")

//-- Time In Range
timeinrange(res, sess) => time(res, sess) != 0

london = timeinrange(timeframe.period, London)
newyork = timeinrange(timeframe.period, NewYork)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true
// 
// 


// rsi
length = input( 5 )
overSold = input( 23 )
overBought = input( 72 )
price = close

vrsi = rsi(price, length)
co = crossover(vrsi, overSold)
cu = crossunder(vrsi, overBought)

// macd
fast_length_macd = input(title="Fast Length", type=input.integer, defval=12)
slow_length_macd = input(title="Slow Length", type=input.integer, defval=26)
src_macd = input(title="Source", type=input.source, defval=close)
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9)
sma_source = input(title="Simple MA(Oscillator)", type=input.bool, defval=true)
sma_signal = input(title="Simple MA(Signal Line)", type=input.bool, defval=true)

// Plot colors
col_grow_above = #26A69A
col_grow_below = #FFCDD2
col_fall_above = #B2DFDB
col_fall_below = #EF5350
col_macd = #0094ff
col_signal = #ff6a00

// Calculating
fast_ma = sma_source ? sma(src_macd, fast_length_macd) : ema(src_macd, fast_length_macd)
slow_ma = sma_source ? sma(src_macd, slow_length_macd) : ema(src_macd, slow_length_macd)
macd = fast_ma - slow_ma
signal = sma_signal ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal

//plot(hist, title="Histogram", style=plot.style_columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below) ), transp=0 )


// sar
start = input(0.02)
increment = input(0.02)
maximum = input(0.2)

var bool uptrend = na
var float EP = na
var float SAR = na
var float AF = start
var float nextBarSAR = na

if bar_index > 0
    firstTrendBar = false
    SAR := nextBarSAR
    
    if bar_index == 1
        float prevSAR = na
        float prevEP = na
        lowPrev = low[1]
        highPrev = high[1]
        closeCur = close
        closePrev = close[1]

        if closeCur > closePrev
            uptrend := true
            EP := high
            prevSAR := lowPrev
            prevEP := high
        else
            uptrend := false
            EP := low
            prevSAR := highPrev
            prevEP := low
        
        firstTrendBar := true
        SAR := prevSAR + start * (prevEP - prevSAR)
    
    if uptrend
        if SAR > low
            firstTrendBar := true
            uptrend := false
            SAR := max(EP, high)
            EP := low
            AF := start
    else
        if SAR < high
            firstTrendBar := true
            uptrend := true
            SAR := min(EP, low)
            EP := high
            AF := start
    
    if not firstTrendBar
        if uptrend
            if high > EP
                EP := high
                AF := min(AF + increment, maximum)
        else
            if low < EP
                EP := low
                AF := min(AF + increment, maximum)
    
    if uptrend
        SAR := min(SAR, low[1])
        if bar_index > 1
            SAR := min(SAR, low[2])
    else
        SAR := max(SAR, high[1])
        if bar_index > 1
            SAR := max(SAR, high[2])
    
    nextBarSAR := SAR + AF * (EP - SAR)
    


//plot(SAR, style=plot.style_cross, linewidth=3, color=color.orange)
//plot(nextBarSAR, style=plot.style_cross, linewidth=3, color=color.aqua)
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)

//bb
length_bb = input(17, minval=1)
src_bb = input(close, title="Source")
mult_bb = input(2.0, minval=0.001, maxval=50, title="StdDev")
basis_bb = sma(src_bb, length_bb)
dev_bb = mult_bb * stdev(src_bb, length_bb)
upper_bb = basis_bb + dev_bb
lower_bb = basis_bb - dev_bb
offset = input(0, "Offset", type = input.integer, minval = -500, maxval = 500)
//plot(basis_bb, "Basis", color=#872323, offset = offset)
//p1_bb = plot(upper_bb, "Upper", color=color.teal, offset = offset)
//p2_bb = plot(lower_bb, "Lower", color=color.teal, offset = offset)

//fill(p1_bb, p2_bb, title = "Background", color=#198787, transp=95)

//ema

len_ema = input(10, minval=1, title="Length")
src_ema = input(close, title="Source")
offset_ema = input(title="Offset", type=input.integer, defval=0, minval=-500, maxval=500)
out_ema = ema(src_ema, len_ema)
//plot(out_ema, title="EMA", color=color.blue, offset=offset_ema) 
//out_ema e emaul
//basis_bb e middle de la bb
//hist e histograma
// rsi cu band0 cross pt rsi

// confirmarea

shortCondition = (uptrend==false and crossunder(ema(src_ema, len_ema),sma(src_bb, length_bb)) and  hist < 0  and vrsi <   overSold) //and time_cond
longCondition = (uptrend==true and crossover(ema(src_ema, len_ema),sma(src_bb, length_bb))  and hist > 0 and vrsi >  overBought ) //and time_cond

//tp=input(0.0025,type=input.float, title="tp")
//sl=input(0.001,type=input.float, title="sl")

//INDICATOR---------------------------------------------------------------------    
    //Average True Range (1. RISK)
atr_period = input(14, "Average True Range Period")
atr = atr(atr_period)

strategy.initial_capital = 50000

//MONEY MANAGEMENT--------------------------------------------------------------
balance = strategy.netprofit + strategy.initial_capital //current balance
floating = strategy.openprofit          //floating profit/loss
risk = input(2,type=input.float,title="Risk %")/100           //risk % per trade
isTwoDigit = input(false,"Is this a 2 digit pair? (JPY, XAU, XPD...")

equity_protector = input(1 ,type=input.float, title="Equity Protection %")/100  //equity protection %
equity_protectorTP = input(2 ,type=input.float, title="Equity TP %")/100  //equity protection %
multtp = input(5,type=input.float, title="multi atr tp")
multsl = input(5,type=input.float, title="multi atr sl")
stop = atr*100000*input(1,"SL X")* multsl    //Stop level
if(isTwoDigit)
    stop := stop/100
target = atr*100000*input(1,"TP X")*multtp    //Stop level
    //Calculate current DD and determine if stopout is necessary
equity_stopout = false

if(floating<0 and abs(floating/balance)>equity_protector)
    equity_stopout := true
    
equity_stopout2 = false
if(floating>0 and abs(floating/balance)>equity_protectorTP)
    equity_stopout2 := true
    
    //Calculate the size of the next trade
temp01 = balance * risk     //Risk in USD
temp02 = temp01/stop        //Risk in lots
temp03 = temp02*100000      //Convert to contracts
size = temp03 - temp03%1000 //Normalize to 1000s (Trade size)
if(size < 10000)
    size := 10000           //Set min. lot size

//TRADE EXECUTION---------------------------------------------------------------
strategy.close_all(equity_stopout, comment="equity sl", alert_message = "equity_sl")      //Close all trades w/equity protector
//strategy.close_all(equity_stopout2, comment="equity tp", alert_message = "equity_tp")      //Close all trades w/equity protector
is_open = strategy.opentrades > 0


strategy.entry("long",true,oca_name="a",when=longCondition and not is_open)  //Long entry
strategy.entry("short",false,oca_name="a",when=shortCondition and not is_open) //Short entry
    
strategy.exit("exit_long","long",loss=stop, profit=target)      //Long exit (stop loss)
strategy.close("long",when=shortCondition)            //Long exit (exit condition)
strategy.exit("exit_short","short",loss=stop, profit=target)      //Short exit (stop loss)
strategy.close("short",when=longCondition)            //Short exit (exit condition)


//strategy.entry("long", strategy.long,size,when=longCondition , comment="long" , alert_message = "long")
//strategy.entry("short", strategy.short, size,when=shortCondition , comment="short" , alert_message = "short")
 
//strategy.exit("closelong", "long" , profit = close * tp / syminfo.mintick,  alert_message = "closelong")
//strategy.exit("closeshort", "short" , profit = close * tp / syminfo.mintick, alert_message = "closeshort")
 
//strategy.exit("closelong", "long" ,size, profit = close * tp / syminfo.mintick, loss = close * sl / syminfo.mintick, alert_message = "closelong")
//strategy.exit("closeshort", "short" , size, profit = close * tp / syminfo.mintick, loss = close * sl / syminfo.mintick, alert_message = "closeshort")
 
//strategy.close("long" , when=not (time_cond), comment="time", alert_message = "closelong" )
//strategy.close("short" , when=not (time_cond), comment="time", alert_message = "closeshort")
//strategy.close_all(when=not (time_cond), comment ='time')


```

> Detail

https://www.fmz.com/strategy/429479

> Last Modified

2023-10-17 15:09:59
