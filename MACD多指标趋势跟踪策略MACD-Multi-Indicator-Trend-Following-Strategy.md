
> Name

MACD多指标趋势跟踪策略MACD-Multi-Indicator-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略原理

该策略集成MACD,均线和鳄鱼线等多种指标,识别行情趋势方向,进行趋势跟踪操作。

主要交易逻辑:

1. 计算MACD指标的快线、慢线和柱形线

2. 判断MACD柱形线方向,确定趋势方向

3. 计算多条移动平均线,判断价格在均线上的位置

4. 鳄鱼线指标判断趋势力度

5. 当上述多因素指向同一方向时,进行做多或做空

6. 在趋势反转时进行止损退出

通过多种指标的综合判断,策略追求在强势趋势中进行交易,并在早期反转时止损,避免亏损扩大。

## 策略优势

- MACD判断短期走势与力度

- 均线位置判定中长期趋势

- 鳄鱼线显示整体趋势力度

- 多指标组合提高判断准确性

## 策略风险

- 需要反复测试参数优化

- 若多指标发出冲突信号难以处理

- 均线等指标滞后性较强

## 总结

该策略试图通过多种指标对行情方向进行全面判断,在优化参数的基础上获取强势趋势。但滞后性问题以及指标冲突仍需注意。

||

## Strategy Logic 

This strategy integrates MACD, moving averages, alligator and more to identify trend direction for trend following.

The logic is:

1. Compute MACD short, long and histogram lines

2. Use histogram direction to determine short-term trend

3. Plot multiple moving averages to gauge price position

4. Alligator lines judge overall trend strength

5. Combining above indicators, go long/short when aligned 

6. Stop loss when indicators flip for early reversal

By synthesizing multiple indicators, it aims to trade strong trends and cut losses early when reversals happen.

## Advantages

- MACD judges short-term trend and strength

- MA positions determine mid- to long-term trends

- Alligator shows overall trend strength 

- Multiple indicators improve accuracy

## Risks

- Extensive parameter optimization needed

- Conflicting signals hard to interpret 

- Lagging issues with MAs etc

## Summary

This strategy attempts to comprehensively determine trend direction using multiple indicators. But lagging issues and signal conflicts warrant caution despite optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast Length|
|v_input_2|26|Slow Length|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|9|Signal Smoothing|
|v_input_string_1|0|Oscillator MA Type: EMA|SMA|
|v_input_string_2|0|Signal Line MA Type: EMA|SMA|
|v_input_int_2|200|Length|
|v_input_10_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_3|false|Offset|
|v_input_int_4|13|Jaw Length|
|v_input_int_5|8|Teeth Length|
|v_input_int_6|5|Lips Length|
|v_input_11|8|Jaw Offset|
|v_input_12|5|Teeth Offset|
|v_input_13|3|Lips Offset|
|v_input_4|#2962FF|(?Color Settings)MACD Line  |
|v_input_5|#FF6D00|Signal Line  |
|v_input_6|#26A69A|(?Histogram)Above   Grow|
|v_input_7|#B2DFDB|Fall|
|v_input_8|#FFCDD2|Below Grow|
|v_input_9|#FF5252|Fall|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-09-13 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("5MSM VISHNU", overlay=true,process_orders_on_close=true)
//indicator(title="mahakaal", shorttitle="mahakaal", timeframe="", timeframe_gaps=true)

green = #26A69A
red = #FF0000
Yellow = #fcf932

// Getting inputs
fast_length = input(title="Fast Length", defval=12)
slow_length = input(title="Slow Length", defval=26)
src3 = input(title="Source", defval=close)
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
fast_ma = sma_source == "SMA" ? ta.sma(src3, fast_length) : ta.ema(src3, fast_length)
slow_ma = sma_source == "SMA" ? ta.sma(src3, slow_length) : ta.ema(src3, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length)
hist = macd - signal
//hline(0, "Zero Line", color=color.new(#787B86, 50))

//@version=5
//indicator(title="Moving Average Exponential", shorttitle="EMA", overlay=true, timeframe="", timeframe_gaps=true)
len = input.int(200, minval=1, title="Length")
src2 = input(close, title="Source")
offset = input.int(title="Offset", defval=0, minval=-500, maxval=500)
Bahubali = ta.ema(src2, len)
//plot(out, title="EMA", color=color.blue, offset=offset)

//@version=5
//indicator(title="Williams Alligator", shorttitle="Alligator", overlay=true, timeframe="", timeframe_gaps=true)
smma(src, length) =>
	smma =  0.0
	smma := na(smma[1]) ? ta.sma(src, length) : (smma[1] * (length - 1) + src) / length
	smma
jawLength = input.int(13, minval=1, title="Jaw Length")
teethLength = input.int(8, minval=1, title="Teeth Length")
lipsLength = input.int(5, minval=1, title="Lips Length")
jawOffset = input(8, title="Jaw Offset")
teethOffset = input(5, title="Teeth Offset")
lipsOffset = input(3, title="Lips Offset")
jaw = smma(hl2, jawLength)
teeth = smma(hl2, teethLength)
lips = smma(hl2, lipsLength)
//plot(jaw, "Jaw", offset = jawOffset, color=#2962FF)


if (hist > 9)

    hist := 10


if (hist < -9)

    hist := -10

// Compose alert message
// Entry
alert_msg_long_entry =  
             "BUY ? {{ticker}} CE " + str.tostring(math.floor((close - 100)/100)*100)       + "\n"   + 
             "####################\n\n" + 
             "{{strategy.order.id}}? Target 1:  "         + str.tostring(math.round(close + 35))       + "\n"   + 
             "{{strategy.order.id}}? Target 2:  "         + str.tostring(math.round(close + 45))       + "\n"   +  
             "\n"   +  
             "{{strategy.order.id}} Stop Loss: "         + str.tostring(math.round(close - 30))       + "\n\n" + 
             "\n"   + 
             "ENTRY PRICE: "                              + str.tostring(math.round(close))       + "\n\n" +
             "Current time: {{timenow}} \n"        +      
             "Education purpose only"
             
// Entry
alert_msg_short_entry =  
             "BUY ? {{ticker}} PE " + str.tostring(math.floor((close + 100)/100)*100)       + "\n"   + 
             "####################\n\n" + 
             "{{strategy.order.id}}? Target 1:  "         + str.tostring(math.round(close - 35))       + "\n"   + 
             "{{strategy.order.id}}? Target 2:  "         + str.tostring(math.round(close - 45))       + "\n"   +  
             "\n"   +  
             "ENTRY PRICE: "                             + str.tostring(math.round(close))       + "\n\n" +
             "{{strategy.order.id}} Stop Loss: "         + str.tostring(math.round(close + 30))       + "\n\n" + 
             "Current time: {{timenow}} \n"     +         
             "Education purpose only"
// EXIT
alert_msg_long_exit =  
             "? EXIT {{ticker}} CE LONG POSITION  ! \n" +
             "EXIT PRICE: "                  + str.tostring(math.round(close))            + "\n"   + 
             "\n"   + 
             "Dont wait for exit msg in this ? CHANNEL !! \n" +
             "For ?% accurate & profitable ??? EXIT: \n" +
             "BUY our 'triDEV' tradingview indicator strategy\n" +
             "https://wa.me/917020641496"
             

// EXIT
alert_msg_short_exit =  
             "? EXIT {{ticker}} PE Short POSITION  ! \n" +
             "EXIT PRICE: "                  + str.tostring(math.round(close))            + "\n"   + 
             "\n"   + 
             "Dont wait for exit msg in this ? CHANNEL !! \n" +
             "For ?% accurate & profitable ??? EXIT: \n"   +
             "BUY our 'triDEV' tradingview indicator strategy\n" +
             "https://wa.me/917020641496"
             
             



tyme = time("1440", "0920-1515")

bullishtrend = ((hist > 0)  and (close > lips ) and (low > lips ) and (close > Bahubali) and (lips > jaw) and tyme)
bearishtrend = ((hist < 0)  and (close < lips ) and (high < lips ) and (close < Bahubali) and (lips < jaw) and tyme)
//plot(hist, title="Histogram", style=plot.style_columns, color=(hist > 0 ? ( bullishtrend ? green : Yellow ) : ( bearishtrend ? red : Yellow ) ))

strategy.entry("long", strategy.long, when = bullishtrend , alert_message = alert_msg_long_entry )
strategy.entry("short",strategy.short,when = bearishtrend , alert_message = alert_msg_short_entry)


longexit = (close < lips)  or time("1440", "1515-1530") or (hist <= 0) //or (close < Bahubali)
shortexit = (close > lips) or time("1440", "1515-1530")or (hist >= 0) //or (close > Bahubali)
//strategy.exit("long tsl", "long", trail_points = close * 0.01 / syminfo.mintick, trail_offset = close * 0.01 / syminfo.mintick)
//strategy.exit("shoty tsl", "short", trail_points = close * 0.01 / syminfo.mintick, trail_offset = close * 0.01 / syminfo.mintick)
strategy.exit("long TSL", "long", limit = lips ,when = (longexit), alert_message = alert_msg_long_exit)
strategy.exit("short TSL","short",limit = lips ,when = (shortexit), alert_message = alert_msg_short_exit)

//PLOT FIXED SLTP LINE
// LONG POSITION
long_take_level_1 = strategy.position_avg_price + 35
long_take_level_2 = strategy.position_avg_price + 40
long_stop_level = strategy.position_avg_price - 30

plot(strategy.position_size > 0 ? long_take_level_1 : na, style=plot.style_linebr, color=color.green, linewidth=1, title="1st Long Take Profit")
plot(strategy.position_size > 0 ? long_take_level_2 : na, style=plot.style_linebr, color=color.green, linewidth=1, title="2nd Long Take Profit")
plot(strategy.position_size > 0 ? long_stop_level : na, style=plot.style_linebr, color=color.red, linewidth=1, title="Long Stop Loss")

//PLOT FIXED SLTP LINE
// SHORT POSITION
SHORT_take_level_1 = strategy.position_avg_price - 35
SHORT_take_level_2 = strategy.position_avg_price - 40
SHORT_stop_level = strategy.position_avg_price + 30

plot(strategy.position_size < 0 ? SHORT_take_level_1 : na, style=plot.style_linebr, color=color.green, linewidth=1, title="1st SHORT Take Profit")
plot(strategy.position_size < 0 ? SHORT_take_level_2 : na, style=plot.style_linebr, color=color.green, linewidth=1, title="2nd SHORT Take Profit")
plot(strategy.position_size < 0 ? SHORT_stop_level : na, style=plot.style_linebr, color=color.red, linewidth=1, title="SHORT Stop Loss")


```

> Detail

https://www.fmz.com/strategy/426837

> Last Modified

2023-09-14 18:09:57
