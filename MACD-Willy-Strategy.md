
> Name

MACD-Willy-Strategy

> Author

ChaoZhang

> Strategy Description

This strategy is mainly developed for scalping / intraday trading. It could potentially be used to identify entry/exit signals for short term options trading. It performs decently well on popular stocks when used on time frames between 5 min to 15 min using regular session bar data. It combines 3 popular indicators, EMA , MACD , and William %range, to generate both long and short signals.

EMA:
Default is 200 EMA line.

MACD:
Default is 12/26 lengths for fast/slow signal inputs.

William %R - Smoothed (Published):
This is a custom indicator that generates two moving average lines from the original William %R line.

How it works:
Entry conditions:
1. Long/short entries when bar closes above/below EMA line
2. Long/short entries when MACD line is above/below signal line (histogram > 0 for long, < 0 for short)
3. Long/short entries when William %R fast MA line is above/below slow MA line

Exit conditions:
1. Exit long when MACD line is below signal line, vise versa for exit short
2. Exit long when William %R fast MA line is below slow MA line, vise versa for exit short
3. Exit long when William %R fast MA line must in below the overbought (-20) limit, exit short when above the oversold (-80) limit.

***Note that parameters are NOT optimized for any particular stocks / instruments.***

Enjoy~~!!

**backtest**


 ![IMG](https://www.fmz.com/upload/asset/197acb8bfc4293365c3.jpg) 



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|50|Volume MA Period|
|v_input_5|12|Fast Length|
|v_input_6|26|Slow Length|
|v_input_int_7|9|Signal Smoothing|
|v_input_string_1|0|Oscillator MA Type: EMA|SMA|
|v_input_string_2|0|Signal Line MA Type: EMA|SMA|
|v_input_int_8|34|w_length|
|v_input_13|5|Smoothed %R Length|
|v_input_14|13|Slow EMA Length|
|v_input_1|2011|(?Trading window)Start Year|
|v_input_int_1|true|Start Month|
|v_input_int_2|true|Start Day|
|v_input_2|2050|Finish Year|
|v_input_int_3|12|Finish Month|
|v_input_int_4|31|Finish Day|
|v_input_float_1|true|(?Trading Options)Leverage (if applicable)|
|v_input_bool_1|false|Reinvest profit|
|v_input_float_2|20|Reinvest percentage|
|v_input_int_5|14|(?Daily ATR)ATR period|
|v_input_float_3|5|% ATR to use for SL / PT|
|v_input_int_6|200|(?Moving Averages)EMA|
|v_input_7|#2962FF|(?Color Settings)MACD Line  |
|v_input_8|#FF6D00|Signal Line  |
|v_input_9|#26A69A|(?Histogram)Above   Grow|
|v_input_10|#B2DFDB|Fall|
|v_input_11|#FFCDD2|Below Grow|
|v_input_12|#FF5252|Fall|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-08 00:00:00
end: 2022-05-07 23:59:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © platsn

//@version=5
strategy("MACD Willy Strategy", overlay=true, pyramiding=1, initial_capital=10000) 

// ******************** Trade Period **************************************
startY = input(title='Start Year', defval=2011, group = "Trading window")
startM = input.int(title='Start Month', defval=1, minval=1, maxval=12, group = "Trading window")
startD = input.int(title='Start Day', defval=1, minval=1, maxval=31, group = "Trading window")
finishY = input(title='Finish Year', defval=2050, group = "Trading window")
finishM = input.int(title='Finish Month', defval=12, minval=1, maxval=12, group = "Trading window")
finishD = input.int(title='Finish Day', defval=31, minval=1, maxval=31, group = "Trading window")
//timestart = timestamp(startY, startM, startD, 00, 00)
//timefinish = timestamp(finishY, finishM, finishD, 23, 59)
// t1 = time(timeframe.period, "0945-1545:23456") 
// window = time >= timestart and time <= timefinish and t1 ? true : false 
// t2 = time(timeframe.period, "0930-1555:23456")
// window2 = time >= timestart and time <= timefinish and t2 ? true : false 

leverage = input.float(1, title="Leverage (if applicable)", step=0.1, group = "Trading Options")
reinvest = input.bool(defval=false,title="Reinvest profit", group = "Trading Options")
reinvest_percent = input.float(defval=20, title = "Reinvest percentage", group="Trading Options")
// entry_lookback = input.int(defval=10, title="Lookback period for entry condition", group = "Trading Options")

// -------------------------------------------- Data Source --------------------------------------------

src = input(title="Source", defval=close)

// ***************************************************************************************************** Daily ATR *****************************************************
atrlen = input.int(14, minval=1, title="ATR period", group = "Daily ATR")
iPercent = input.float(5, minval=1, maxval=100, step=0.1, title="% ATR to use for SL / PT", group = "Daily ATR")
 
percentage = iPercent * 0.01
datr = request.security(syminfo.tickerid, "1D", ta.rma(ta.tr, atrlen))
datrp = datr * percentage

// plot(datr,"Daily ATR")
// plot(datrp, "Daily % ATR")

//*********************************************************** VIX volatility index ****************************************

//VIX = request.security("VIX", timeframe.period, close)
//vix_thres = input.float(20.0, "VIX Threshold for entry", step=0.5, group="VIX Volatility Index")

// ************************************************ Volume ******************************************************

vol_len = input(50, 'Volume MA Period')
avg_vol = ta.sma(volume, vol_len)

//-------------------------------------------------------- Moving Average ------------------------------------

emalen1 = input.int(200, minval=1, title='EMA', group= "Moving Averages")
ema1 = ta.ema(src, emalen1)

// ------------------------------------------ MACD ------------------------------------------
// Getting inputs
fast_length = input(title="Fast Length", defval=12)
slow_length = input(title="Slow Length", defval=26)
signal_length = input.int(title="Signal Smoothing",  minval = 1, maxval = 50, defval = 9)
sma_source = input.string(title="Oscillator MA Type",  defval="EMA", options=["SMA", "EMA"])
sma_signal = input.string(title="Signal Line MA Type", defval="EMA", options=["SMA", "EMA"])
// Plot colors
col_macd = input(#2962FF, "MACD Line  ", group="Color Settings", inline="MACD")
col_signal = input(#FF6D00, "Signal Line  ", group="Color Settings", inline="Signal")
col_grow_above = input(#26A69A, "Above   Grow", group="Histogram", inline="Above")
col_fall_above = input(#B2DFDB, "Fall", group="Histogram", inline="Above")
col_grow_below = input(#FFCDD2, "Below Grow", group="Histogram", inline="Below")
col_fall_below = input(#FF5252, "Fall", group="Histogram", inline="Below")
// Calculating
fast_ma = sma_source == "SMA" ? ta.sma(src, fast_length) : ta.ema(src, fast_length)
slow_ma = sma_source == "SMA" ? ta.sma(src, slow_length) : ta.ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length)
hist = macd - signal

// ---------------------------------------- William %R --------------------------------------
w_length = input.int(defval=34, minval=1)
w_upper = ta.highest(w_length)
w_lower = ta.lowest(w_length)

w_output = 100 * (close - w_upper) / (w_upper - w_lower)

fast_period = input(defval=5, title='Smoothed %R Length')
slow_period = input(defval=13, title='Slow EMA Length')

w_fast_ma = ta.wma(w_output,fast_period)
w_slow_ma = ta.ema(w_output,slow_period)



// ------------------------------------------------ Entry Conditions ----------------------------------------

L_entry1 = close > ema1 and hist > 0 and w_fast_ma > w_slow_ma 
S_entry1 = close < ema1 and hist < 0 and w_fast_ma < w_slow_ma 

// -------------------------------------------------- Entry -----------------------------------------------

//profit = strategy.netprofit
//trade_amount = math.floor(strategy.initial_capital*leverage / close) 

//if strategy.netprofit > 0 and reinvest
//    trade_amount := math.floor((strategy.initial_capital+(profit*reinvest_percent*0.01))*leverage / close) 
//else
//    trade_amount := math.floor(strategy.initial_capital*leverage/ close) 


if L_entry1 //and window
    strategy.entry("Long", strategy.long)

if S_entry1 //and window
    strategy.entry("Short", strategy.short)

// --------------------------------------------------- Exit Conditions -------------------------------------

L_exit1 = hist < 0 and w_fast_ma < w_slow_ma and w_fast_ma < -20
S_exit1 = hist > 0 and w_fast_ma > w_slow_ma and w_fast_ma > -80

// ----------------------------------------------------- Exit ---------------------------------------------

if L_exit1 //and window2
    strategy.close("Long")
    
if S_exit1 //and window2
    strategy.close("Short")

// if time(timeframe.period, "1530-1600:23456")
//     strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/362012

> Last Modified

2022-05-09 16:32:15
