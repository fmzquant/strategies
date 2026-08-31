
> Name

三重移动平均通道趋势跟随策略Triple-Moving-Average-Channel-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1206b06c3be24162c8d.png)


## Overview

This strategy uses a triple combination of moving averages to determine the trend direction based on the order of the moving averages, so as to achieve trend following. Go long when the fast moving average, medium moving average, and slow moving average are arranged in order; go short when the slow moving average, medium moving average, and fast moving average are arranged in order.

## Strategy Principle

The strategy uses three moving averages with different periods, including a fast moving average, a medium moving average, and a slow moving average.

Entry conditions:
1. Long: When fast MA > medium MA > slow MA, the market is considered to be in an uptrend, go long.
2. Short: When slow MA < medium MA < fast MA, the market is considered to be in a downtrend, go short.

Exit conditions:
1. MA exit: Close position when the order of the three moving averages reverses.
2. TP/SL exit: Set fixed take profit and stop loss points, such as 12% for TP and 1% for SL, exit when price reaches TP or SL.

The strategy is simple and direct, using three moving averages to determine market trend direction for trend following trading, suitable for markets with strong trend. 

## Advantage Analysis

- Use three moving averages to determine the trend and filter out market noise.
- Moving averages of different periods can more accurately determine trend reversal points.
- Combine moving average indicators and fixed TP/SL to manage capital risk.
- The strategy logic is simple and intuitive, easy to understand and implement.
- The MA period parameters can be easily optimized to adapt to market conditions of different cycles.

## Risks and Improvements 

- In long cycle markets, moving averages may have more false signals, leading to unnecessary losses.
- Consider adding other indicators or filters to improve profitability.
- Optimize the combination of moving average period parameters to adapt to more extensive market conditions.
- Combine with trend strength indicators to avoid buying peaks and selling bottoms.
- Add automatic stops to avoid enlarging losses.

## Conclusion

The triple moving average trend following strategy has a clear and easy-to-understand logic, using moving averages to determine the trend direction for simple trend following trading. The advantage is that it is easy to implement, and adjusting the MA period parameters can adapt to market conditions of different cycles. However, there are also certain risks of false signals, which can be improved by adding other indicators or conditions to reduce unnecessary losses and improve strategy profitability. Overall, this strategy is suitable for beginners interested in trend trading to learn and practice.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|Moving Average type:: EMA|SMA|
|v_input_int_1|9|(?============== Moving Average Inputs ==============)Period 1|
|v_input_int_2|21|Period 2|
|v_input_int_3|50|Period 3|
|v_input_source_1_close|0|Source 1: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_source_2_close|0|Source 2: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_source_3_close|0|Source 3: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_1|true|(?================ EXIT CONDITIONS ================)Exit by Moving average condition|
|v_input_bool_2|false|Exit by Take Profit and StopLoss|
|v_input_int_4|12|Take Profit|
|v_input_int_5|true|Stop Loss|
|v_input_bool_3|false|Show TP/SL lines|
|v_input_1|timestamp(01 Jan 2023 00:00 -3000)|(?============= DATE FILTERS =============)From|
|v_input_2|timestamp(01 Oct 2099 00:00 -3000)|To  |


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-06 00:00:00
end: 2023-11-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Jompatan

//@version=5
strategy('Strategy Triple Moving Average', overlay=true, initial_capital = 1000, commission_value=0.04, max_labels_count=200)

//INPUTS
mov_ave = input.string(defval="EMA", title='Moving Average type:', options= ["EMA", "SMA"])

period_1 = input.int(9,  title='Period 1', inline="1", group= "============== Moving Average Inputs ==============")
period_2 = input.int(21, title='Period 2', inline="2", group= "============== Moving Average Inputs ==============")
period_3 = input.int(50, title='Period 3', inline="3", group= "============== Moving Average Inputs ==============")

source_1 = input.source(close, title='Source 1', inline="1", group= "============== Moving Average Inputs ==============")
source_2 = input.source(close, title='Source 2', inline="2", group= "============== Moving Average Inputs ==============")
source_3 = input.source(close, title='Source 3', inline="3", group= "============== Moving Average Inputs ==============")


//EXIT CONDITIONS
exit_ma   = input.bool(true, title= "Exit by Moving average condition", group="================ EXIT CONDITIONS ================")
exit_TPSL = input.bool(false, title= "Exit by Take Profit and StopLoss", group="================ EXIT CONDITIONS ================")
TP        = input.int(12, title='Take Profit', step=1, group="================ EXIT CONDITIONS ================")
SL        = input.int(1, title='Stop Loss', step=1, group="================ EXIT CONDITIONS ================")
plot_TPSL = input.bool(false, title='Show TP/SL lines', group="================ EXIT CONDITIONS ================")


//Date filters
desde = input(defval= timestamp("01 Jan 2023 00:00 -3000"), title="From", inline="12", group= "============= DATE FILTERS =============")
hasta = input(defval= timestamp("01 Oct 2099 00:00 -3000"), title="To  ", inline="13", group= "============= DATE FILTERS =============")
enRango = true

//COMMENTS
//entry_long_comment  = input.string(defval=" ", title="Entry Long comment: ", inline="14", group="============= COMMENTS =============")
//exit_long_comment   = input.string(defval=" ", title="Exit Long comment:  ", inline="15", group="============= COMMENTS =============")
//entry_short_comment = input.string(defval=" ", title="Entry Short comment:", inline="16", group="============= COMMENTS =============")
//exit_short_comment  = input.string(defval=" ", title="Exit Short comment: ", inline="17", group="============= COMMENTS =============")

//============================================================

//Selecting Moving average type
ma1 = mov_ave == "EMA" ? ta.ema(source_1, period_1) : ta.sma(source_1, period_1)
ma2 = mov_ave == "EMA" ? ta.ema(source_2, period_2) : ta.sma(source_2, period_2)
ma3 = mov_ave == "EMA" ? ta.ema(source_3, period_3) : ta.sma(source_3, period_3)

//============================================================
//Entry Long condition: Grouped Moving average from: (ma fast > ma middle > ma slow)
long_condition = (ma1 > ma2) and (ma2 > ma3)

//Entry Short condition: Grouped Moving average from: (ma fast < ma middle < ma slow)
short_condition = (ma1 < ma2) and (ma2 < ma3)

//============================================================

cantidad       = strategy.equity / close
comprado_long  = strategy.position_size > 0
comprado_short = strategy.position_size < 0

var long_profit_price  = 0.0
var long_stop_price    = 0.0
var short_profit_price = 0.0
var short_stop_price   = 0.0

//============================================================

//ENTRY LONG
if not comprado_long and not comprado_short and long_condition and not long_condition[1] and enRango
    strategy.entry('Long', strategy.long, qty=cantidad, comment= "Entry Long")
    if exit_TPSL
        long_profit_price := close * (1 + TP/100)
        long_stop_price   := close * (1 - SL/100)
    else
        long_profit_price := na
        long_stop_price   := na
//============================================================


//ENTRY SHORT
if not comprado_long and not comprado_short and short_condition and not short_condition[1] and enRango
    strategy.entry('Short', strategy.short, qty=cantidad, comment= "Entry Short")
    if exit_TPSL
        short_profit_price := close * (1 - TP/100)
        short_stop_price   := close * (1 + SL/100)
    else
        short_profit_price := na
        short_stop_price   := na
//============================================================


//EXIT LONG 
if comprado_long and exit_ma and long_condition[1] and not long_condition
    strategy.close('Long', comment='Exit-Long(MA)')
if comprado_long and exit_TPSL
    strategy.exit('Long', limit=long_profit_price, stop=long_stop_price, comment='Exit-Long(TP/SL)')
//============================================================


//EXIT SHORT 
if comprado_short and exit_ma and short_condition[1] and not short_condition
    strategy.close('Short', comment='Exit-Short(MA)')
if comprado_short and exit_TPSL
    strategy.exit('Short', limit=short_profit_price, stop=short_stop_price, comment='Exit-Short(TP/SL)')
//============================================================



//PLOTS
plot(ma1, linewidth=2, color=color.rgb(255, 255, 255))
plot(ma2, linewidth=2, color=color.rgb(144, 255, 252))
plot(ma3, linewidth=2, color=color.rgb(49, 167, 255))
//Plot Take Profit line
plot(plot_TPSL ? comprado_long  ? long_profit_price : comprado_short ? short_profit_price : na : na, color=color.new(color.lime, 30), style= plot.style_linebr)
//Plot StopLoss line
plot(plot_TPSL ? comprado_long ? long_stop_price : comprado_short ? short_stop_price : na : na, color=color.new(color.red, 30), style= plot.style_linebr)








```

> Detail

https://www.fmz.com/strategy/431286

> Last Modified

2023-11-06 16:58:57
