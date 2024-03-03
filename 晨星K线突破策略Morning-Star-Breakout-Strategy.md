
> Name

晨星K线突破策略Morning-Star-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]  

## 策略原理

该策略利用晨星K线形态进行做多方向的趋势追踪交易。主要交易信号来自晨星线突破均线的点位。

具体交易逻辑是:

1. 计算60日指数移动平均线EMA60

2. 判断出现晨星K线形态,包括第一根阴线,第二根十字线或封口线,第三根阳线并上破前两K线最高点

3. 多头信号为晨星线形态出现在EMA60上方时的突破点位

4. 设置目标利润或跟踪止损作为退出策略

5. 止损设定为过去100根K线最低点

6. 可调整晨星线判定容限等参数

该策略充分利用晨星线的趋势转折特性,匹配趋势方向进行追踪。可在高波动市场获得较好效果。

## 策略优势

- 晨星线有效判断短期趋势反转

- 突破点位入场及跟踪止损,持续跟踪趋势

- 设置回顾窗口避免止损过大

## 策略风险 

- 参数设置需要反复测试优化

- 停损过近可能导致过频止损

- 仅做多方向,错失空头机会

## 总结

该策略识别晨星K线特征,匹配趋势方向进行追踪。通过参数调整可适应不同市场情况。但仅做多和止损设置需要审慎评估。

||

## Strategy Logic

This strategy trades bullish breakouts using the Morning Star candlestick pattern. Trading signals are generated when the Morning Star pattern breaks above the EMA60.

The logic is:  

1. Plot the 60-day exponential moving average EMA60

2. Identify Morning Star patterns, consisting of a bearish candle, doji/spinning top, and bullish candle breaking the high of the first two candles

3. Long signals are breakouts above EMA60 after Morning Star patterns 

4. Use either profit targets or trailing stops for exits

5. Stop loss set at lowest low of last 100 candles 

6. Parameters like Morning Star tolerance configurable

The strategy capitalizes on the trend reversal nature of Morning Stars in the direction of the trend. Performs well in volatile markets.

## Advantages

- Morning Star effectively signals short-term reversals

- Breakout entry and trailing stop follows through trends

- Lookback window prevents excessive stop loss

## Risks

- Requires iterative testing and optimization

- Stops too close may cause excessive stops

- LONG only misses short opportunities

## Summary

This strategy identifies Morning Star patterns and trades breakouts in alignment with the trend. Parameter tuning adapts it to varying market conditions. But LONG-only and stop loss needs prudent assessment.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|0.09|(?DOJI SETTINGS)MDS Tolerance|
|v_input_float_2|0.05|DOJI Tolerance|
|v_input_float_3|9|(?EXIT LONG)Take Profit|
|v_input_bool_1|true|SL type Lowest Low|
|v_input_int_1|100|Stop Length|
|v_input_bool_3|false|SL type Percent|
|v_input_float_4|2|Stop Loss|
|v_input_bool_2|false|(?Filter)Max Loss Filter|
|v_input_int_2|10|Max Loss %|
|v_input_float_5|true|(?TRAILING STOP)Trailing theshold|
|v_input_float_6|0.5|Trailing offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-03-23 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
// © TheSocialCryptoClub
// Author: @devil_machine

//@version=5
strategy("PURE MORNING 2.0", overlay=true, pyramiding=1,
         initial_capital=10000, 
         default_qty_type=strategy.percent_of_equity, default_qty_value=10,
         slippage=1,backtest_fill_limits_assumption=1,use_bar_magnifier= true,
         commission_type=strategy.commission.percent, commission_value=0.075
         )

//------------------------------
// Indicators
//------------------------------

rma=ta.rma(close, 60)
mfi=ta.mfi(close, 10)
rsi=ta.rsi(close, 14)
atr7= ta.atr(7)
ema60=ta.ema(close,60)

plot(ema60,"EMA 60", color.new(color.aqua,0))

//------------------------------
// Doji settings 
//------------------------------
//-----------------------------------------------MORNING DOJI STAR CODE
range1= high - low
tolerance = input.float(defval=0.09, title="MDS Tolerance",group= "DOJI SETTINGS", minval=0.01, maxval=1, step=0.01)/100

candle1 = math.abs (close[2] - open[2]) /range1[2] > .6 and close[2] < open[2]
candle2 = ((open[1] > close[1] and open[1] < close[1]*(1+tolerance)) or (open[1] < close[1] and open[1] > close[1]*(1-tolerance)) and close [1]<close[2]+range1[2])
candle3 = close > open and close > (close[2]+range1[2])

MDS = candle1 and candle2 and candle3

plotshape (MDS and close > ema60, text="MD", textcolor=color.yellow, offset=-1, location=location.abovebar, color=color.green, style=shape.triangleup)
plotshape (MDS and close < ema60, text="MD", textcolor=color.olive, offset=-1, location=location.belowbar, color=color.red, style=shape.triangledown)

//------------------------------------------------DOJI CODE

tolerance1= input.float(defval=0.05, title="DOJI Tolerance",group= "DOJI SETTINGS", minval=0.01, maxval=1, step=0.01)/100
Is_OC_Equal= (open > close and open < close*(1+tolerance1)) or (open < close and open > close*(1-tolerance1))

plotshape(Is_OC_Equal and close < ema60, text="D", textcolor=color.red, location=location.belowbar, color=color.red)
plotshape(Is_OC_Equal and close > ema60, text="D", textcolor = color.green, location=location.abovebar, color=color.green)

//------------------------------
// Filter
//------------------------------

xl_tp_percent      = input.float(9,step=0.5, title="Take Profit", group="EXIT LONG") 

sl_type_ll         = input.bool(true, "SL type Lowest Low", group="EXIT LONG")
sl_len             = input.int(100, "Stop Length", group="EXIT LONG")

max_loss_filter    = input.bool(false,"Max Loss Filter", group ="Filter")
filter_percent     = input.int(10, "Max Loss %", group="Filter")

sl_type_percent    = input.bool(false, "SL type Percent", group="EXIT LONG")
xl_sl_percent      = input.float(2,step=.5, title="Stop Loss", group="EXIT LONG") 

filter_stop= max_loss_filter == true ? close - ta.lowest (low, sl_len) < (close*filter_percent)/100 : true

if sl_type_percent == true 
    sl_type_ll := false

//------------------------------
// Entry Long
//------------------------------

el_cond = Is_OC_Equal and close > ta.ema(close, 60) and filter_stop
el_cond_02 = MDS and close > ta.ema(close, 60) and filter_stop

mess = "!buy " + syminfo.ticker // Executor command to buy automatically 

if el_cond 
    strategy.entry ("EL", strategy.long, alert_message = mess,comment = "EL cond 1")

plotshape(el_cond and strategy.position_size == 0, "el_long", shape.circle, color=color.green)

if el_cond_02       
    strategy.entry ("EL", strategy.long, alert_message = mess,comment = "EL cond 2" )

plotshape(el_cond_02 and strategy.position_size == 0, "el_long_02", shape.circle, color=color.green)

//------------------------------
//Exit Long TP - SL
//------------------------------

xl_sl_price = strategy.position_avg_price * (1-xl_sl_percent/100)
xl_tp_price = strategy.position_avg_price * (1+xl_tp_percent/100)

if sl_type_ll == true
    xl_sl_price := ta.lowest (low, sl_len) 

//------------------------------
//Trailing stop 
//------------------------------

xl_ts_percent      = input.float(1,   step=0.5, title= "Trailing theshold", group="TRAILING STOP")
xl_to_percent      = input.float(0.5, step=0.5, title= "Trailing offset",   group="TRAILING STOP")

xl_ts_tick = xl_ts_percent * close/syminfo.mintick/100
xl_to_tick = xl_to_percent * close/syminfo.mintick/100

mess_sell = "!sell " + syminfo.ticker // Executor command to sell automatically 

strategy.exit("XL+SL/TP", "EL", stop=xl_sl_price, limit=xl_tp_price, trail_points=xl_ts_tick, trail_offset=xl_to_tick,comment_loss= "STOP", comment_profit = "PROFIT",comment_trailing = "TS", alert_message = mess_sell)

//------------------------------
// Conditional close on MFI
//------------------------------

xl_cond= ta.crossover(mfi, 90)

if xl_cond
    strategy.close("XL", alert_message = mess_sell)

plotshape(xl_cond, "xl_cond", shape.circle, color=color.red)
```

> Detail

https://www.fmz.com/strategy/426804

> Last Modified

2023-09-14 16:36:32
