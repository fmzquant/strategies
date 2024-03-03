
> Name

Villa-Dinamic-Pivot-Supertrend-Strategy

> Author

ChaoZhang

> Strategy Description

This strategy works better on AUD/USD in the 15 min timeframe. It uses the Pivot Supertrend to enter trades based on different filters such as:
- Simple EMA filter: that the 3 EMAs should be in order
- DEMA angle: you can choose the DEMA Angle threshold and the look back to check the angle to just trade trades with DEMA at a certain angle
- Simple DEMA filter: just check if close is above or below DEMA
- Take Every Supertrend Signal: this means to take every normal supertrend signal to not just wait for a pivot supertrend signal to enter a trade (specially on long pivot supertrend periods)
- Stop Loss at Supertrend: this means that the stop loss will be at the Normal Supertrend, if false the stop loss will be placed at the ATR level selected.
- 2 Steps Take Profit: this means if you want to close a percentage of position as soon as the normal supertrend crosses the entry price, you can select the % on the "2 Steps TP qty" input
- Stop Loss ATR Multiplier: if Stop Loss at Supertrend is off this will be the stoploss based on the atr
- Take Profit ATR Multiplier: if Stop Loss at Supertrend is off this will be the takeprofit based on the atr (you have to keep in mind that the ratio between this two will make the Risk to reward ratio of the take profit when the Stop Loss at Supertrend)
- Testing: to avoid overfitting, you can select date ranges for backtesting and forwardtesting and select which testing you wanna do

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/4d0c276dfb86f39819.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|false|(?Strategy Inputs)Use Simple EMA Filter|
|v_input_bool_2|true|Use DEMA Angle Filter|
|v_input_bool_3|true|Use DEMA Filter|
|v_input_bool_4|false|Take Every Supertrend Signal|
|v_input_bool_5|true|Stop Loss at Supertrend|
|v_input_bool_6|false|2 Steps Take Profit|
|v_input_bool_7|true|Move SL|
|v_input_float_1|2.5|Stop Loss ATR Multiplier|
|v_input_float_2|4|Take Profit ATR Multiplier|
|v_input_int_1|50|2 Steps TP qty%|
|v_input_float_3|false|DEMA Angle Threshold (+ & -)|
|v_input_int_2|true|DEMA Angle Lookback|
|v_input_string_1|0|Testing: All|Forwardtest|Backtest|
|v_input_string_2|0|Market: Forex|Stocks|
|v_input_int_3|2021|(?BT Date Range)Backtesting start year|
|v_input_int_4|true|Backtesting start month|
|v_input_int_5|true|Backtesting start day|
|v_input_int_6|2021|Backtesting end year|
|v_input_int_7|12|Backtesting end month|
|v_input_int_8|31|Backtesting end day|
|v_input_int_9|2022|(?FT Date Range)Forwardtesting start year|
|v_input_int_10|true|Forwardtesting start month|
|v_input_int_11|true|Forwardtesting start day|
|v_input_int_12|2022|Forwardtesting end year|
|v_input_int_13|3|Forwardtesting end month|
|v_input_int_14|26|Forwardtesting end day|
|v_input_int_15|2|(?Pivot Supertrend)PVT ST Pivot Point Period|
|v_input_float_4|3|PVT ST ATR Factor|
|v_input_int_16|9|PVT ST ATR Period|
|v_input_int_17|200|(?D-EMAs)DEMA Len|
|v_input_source_1_close|0|D-EMAs Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_18|21|EMA 1 Len|
|v_input_int_19|50|EMA 2 Len|
|v_input_int_20|200|EMA 3 Len|
|v_input_int_21|21|(?Normal Supertrend)ST ATR Period|
|v_input_source_2_hl2|0|ST Supertrend Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_float_5|2|ST ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-02-01 00:00:00
end: 2022-02-11 23:59:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © evillalobos1123

//@version=5
strategy("Villa Dinamic Pivot Supertrend Strategy", overlay=true, calc_on_every_tick = true)

//INPUTS

ema_b = input.bool(false, "Use Simple EMA Filter", group = "Strategy Inputs")
ema_b_ang = input.bool(true, "Use DEMA Angle Filter", group = "Strategy Inputs")
dema_b = input.bool(true, "Use DEMA Filter", group = "Strategy Inputs")
st_sig = input.bool(false, "Take Every Supertrend Signal" , group = "Strategy Inputs")
take_p = input.bool(true, "Stop Loss at Supertrend", group = "Strategy Inputs")
din_tp = input.bool(false, "2 Steps Take Profit", group = "Strategy Inputs")
move_sl = input.bool(true, "Move SL", group = "Strategy Inputs")
sl_atr = input.float(2.5, "Stop Loss ATR Multiplier", group = "Strategy Inputs")
tp_atr = input.float(4, "Take Profit ATR Multiplier", group = "Strategy Inputs")
din_tp_qty = input.int(50, "2 Steps TP qty%", group = "Strategy Inputs")
dema_a_filter = input.float(0, "DEMA Angle Threshold (+ & -)", group = "Strategy Inputs")
dema_a_look = input.int(1, "DEMA Angle Lookback", group = "Strategy Inputs")
dr_test = input.string("All", "Testing", options = ["Backtest", "Forwardtest", "All"], group = "Strategy Inputs")
test_act = input.string('Forex', 'Market', options = ['Forex', 'Stocks'], group = "Strategy Inputs")


not_in_trade = strategy.position_size == 0

//Backtesting date range

start_year = input.int(2021, "Backtesting start year", group = "BT Date Range")
start_month = input.int(1, "Backtesting start month", group = "BT Date Range")
start_date = input.int(1, "Backtesting start day", group = "BT Date Range")
end_year = input.int(2021, "Backtesting end year", group = "BT Date Range")
end_month = input.int(12, "Backtesting end month", group = "BT Date Range")
end_date = input.int(31, "Backtesting end day", group = "BT Date Range")

bt_date_range = (time >= timestamp(syminfo.timezone, start_year,
         start_month, start_date, 0, 0)) and
     (time < timestamp(syminfo.timezone, end_year, end_month, end_date, 0, 0))
     

//Forward testing date range

start_year_f = input.int(2022, "Forwardtesting start year", group = "FT Date Range")
start_month_f = input.int(1, "Forwardtesting start month", group = "FT Date Range")
start_date_f = input.int(1, "Forwardtesting start day", group = "FT Date Range")
end_year_f = input.int(2022, "Forwardtesting end year", group = "FT Date Range")
end_month_f = input.int(03, "Forwardtesting end month", group = "FT Date Range")
end_date_f = input.int(26, "Forwardtesting end day", group = "FT Date Range")

ft_date_range = (time >= timestamp(syminfo.timezone, start_year_f,
         start_month_f, start_date_f, 0, 0)) and
     (time < timestamp(syminfo.timezone, end_year_f, end_month_f, end_date_f, 0, 0))


//date condition
date_range_cond = if dr_test == "Backtest"
    bt_date_range
else if dr_test == "Forwardtest"
    ft_date_range
else
    true
    

//INDICATORS

//PIVOT SUPERTREND
prd = input.int(2, "PVT ST Pivot Point Period", group = "Pivot Supertrend")
Factor=input.float(3, "PVT ST ATR Factor", group = "Pivot Supertrend")
Pd=input.int(9 ,  "PVT ST ATR Period", group = "Pivot Supertrend")

// get Pivot High/Low
float ph = ta.pivothigh(prd, prd)
float pl = ta.pivotlow(prd, prd)

// calculate the Center line using pivot points
var float center = na
float lastpp = ph ? ph : pl ? pl : na
if lastpp
    if na(center)
        center := lastpp
    else
        //weighted calculation
        center := (center * 2 + lastpp) / 3

// upper/lower bands calculation
Up = center - (Factor * ta.atr(Pd))
Dn = center + (Factor * ta.atr(Pd))

// get the trend
float TUp = na
float TDown = na
Trend = 0
TUp := close[1] > TUp[1] ? math.max(Up, TUp[1]) : Up
TDown := close[1] < TDown[1] ? math.min(Dn, TDown[1]) : Dn
Trend := close > TDown[1] ? 1: close < TUp[1]? -1: nz(Trend[1], 1)
Trailingsl = Trend == 1 ? TUp : TDown

// check and plot the signals
bsignal = Trend == 1 and Trend[1] == -1
ssignal = Trend == -1 and Trend[1] == 1

//get S/R levels using Pivot Points
float resistance = na
float support = na
support := pl ? pl : support[1]
resistance := ph ? ph : resistance[1]

//DEMA

dema_ln = input.int(200, "DEMA Len", group = 'D-EMAs')
dema_src = input.source(close, "D-EMAs Source", group = 'D-EMAs')
ema_fd = ta.ema(dema_src, dema_ln)
dema = (2*ema_fd)-(ta.ema(ema_fd,dema_ln))

//EMA

ema1_l = input.int(21, "EMA 1 Len", group = 'D-EMAs')
ema2_l = input.int(50, "EMA 2 Len", group = 'D-EMAs')
ema3_l = input.int(200, "EMA 3 Len", group = 'D-EMAs')

ema1 = ta.ema(dema_src, ema1_l)
ema2 = ta.ema(dema_src, ema2_l)
ema3 = ta.ema(dema_src, ema3_l)

//Supertrend
Periods = input.int(21, "ST ATR Period", group = "Normal Supertrend")
src_st = input.source(hl2, "ST Supertrend Source", group = "Normal Supertrend")
Multiplier = input.float(2.0 , "ST ATR Multiplier", group = "Normal Supertrend")
changeATR= true
atr2 = ta.sma(ta.tr, Periods)
atr3= changeATR ? ta.atr(Periods) : atr2
up=src_st-(Multiplier*atr3)
up1 = nz(up[1],up)
up := close[1] > up1 ? math.max(up,up1) : up
dn=src_st+(Multiplier*atr3)
dn1 = nz(dn[1], dn)
dn := close[1] < dn1 ? math.min(dn, dn1) : dn
trend = 1
trend := nz(trend[1], trend)
trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend
buySignal = trend == 1 and trend[1] == -1
sellSignal = trend == -1 and trend[1] == 1

//ATR

atr = ta.atr(14)

///CONDITIONS

//BUY 
/// ema simple
ema_cond_b = if ema_b
    ema1 > ema2 and ema2 > ema3
else
    true

///ema angle

div_ang = if test_act == 'Forex'
    0.0001
else
    1

dema_angle_rad = math.atan((dema - dema[dema_a_look])/div_ang)
dema_angle = dema_angle_rad * (180/math.pi)

dema_ang_cond_b = if ema_b_ang
    if dema_angle >= dema_a_filter
        true
    else
        false
else
    true
    


///ema distance

dema_cond_b = if dema_b
    close > dema
else 
    true
    

//supertrends
///if pivot buy sig or (st buy sig and pivot. trend = 1)

pvt_cond_b = bsignal

st_cond_b = if st_sig
    buySignal and Trend == 1
else
    false

st_entry_cond = pvt_cond_b or st_cond_b

///stop loss tp

sl_b = if take_p
    if trend == 1
        up
    else
        close - (atr * sl_atr)
else
    close - (atr * sl_atr)

tp_b = if take_p
    if trend == 1
        close + ((close - up) * (tp_atr / sl_atr))
    else
        close + (atr * tp_atr)
else
    close + (atr * tp_atr)
    
//position size 
init_cap = strategy.equity
pos_size_b = math.round((init_cap * .01) / (close - sl_b))
ent_price = strategy.opentrades.entry_price(strategy.opentrades - 1)
var sl_b_n = 0.0
var tp_b_n = 0.0
longCondition = (ema_cond_b and dema_cond_b and dema_ang_cond_b and st_entry_cond and date_range_cond and not_in_trade)
if (longCondition)
    
    strategy.entry("Long", strategy.long, qty = pos_size_b)
    sl_b_n := sl_b
    tp_b_n := tp_b
    ent_price := strategy.opentrades.entry_price(strategy.opentrades - 1)

if (up[1] < ent_price and up >= ent_price and trend[0] == 1)
    if din_tp
        strategy.close("Long", qty_percent = din_tp_qty)
    if move_sl
        sl_b_n := ent_price

strategy.exit("Exit", "Long", stop =sl_b_n, limit = tp_b_n)   


    

//sell

///ema simple
ema_cond_s = if ema_b
    ema1 < ema2 and ema2 < ema3
else
    true

//ema distance
dema_cond_s = if dema_b
    close < dema
else 
    true

//dema angle
dema_ang_cond_s = if ema_b_ang
    if dema_angle <= -(dema_a_filter)
        true
    else
        false
else
    true

//supertrends
///if pivot buy sig or (st buy sig and pivot. trend = 1)

pvt_cond_s = ssignal

st_cond_s = if st_sig
    sellSignal and Trend == -1
else
    false

st_entry_cond_s = pvt_cond_s or st_cond_s

///stop loss tp


sl_s = if take_p
    if trend == -1
        dn
    else
        close + (atr * sl_atr)
else
    close + (atr * sl_atr)

tp_s = if take_p
    if trend == -1
        close - ((dn - close) * (tp_atr / sl_atr))
    else
        close - (atr * tp_atr)
else
    close - (atr * tp_atr)


shortCondition = (ema_cond_s and dema_cond_s and dema_ang_cond_s and date_range_cond and st_entry_cond_s and not_in_trade)

pos_size_s = math.round((init_cap * .01) / (sl_s - close))
var sl_s_n = 0.0
var tp_s_n = 0.0
if (shortCondition)
    strategy.entry("Short", strategy.short, qty = pos_size_s)
    sl_s_n := sl_s
    tp_s_n := tp_s
    
if (dn[1] > ent_price and dn <= ent_price and trend[0] == -1)
    if din_tp
        strategy.close("Short", qty_percent = din_tp_qty)
    if move_sl
        sl_s_n := ent_price

strategy.exit("Exit", "Short", stop = sl_s_n, limit = tp_s_n)
    
```

> Detail

https://www.fmz.com/strategy/362920

> Last Modified

2022-05-13 18:42:02
