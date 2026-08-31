
> Name

BlackBit-Trader-XO-Macro-Trend-Scanner-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/5e2cb6dcc20b4a140a.png)
 ## Overview  

This strategy combines double moving average and StochRSI indicator to identify trend direction and entry points. The main feature is that it can enter the market in the early stage of trend, while using the overbought/oversold characteristics of StochRSI to filter false breakouts.

## Strategy Logic  

The strategy uses fast moving average EMA(12) and slow moving average EMA(25) to build a double moving average system. When fast line crosses above slow line, buy signal is generated. When fast line crosses below slow line, sell signal is generated. This is used to determine the major trend direction.

At the same time, the strategy incorporates StochRSI crossover to further identify entry timing. StochRSI combines stochastic KDJ and RSI. When K line crosses D line upward from oversold zone, buy signal is generated. When K line crosses D line downward from overbought zone, sell signal is generated.  

Only when double moving average produces signal and StochRSI also produces corresponding signal, this strategy will open positions. This can effectively filter out some false breakouts and avoid invalid trades.

## Advantage Analysis

The biggest advantage of this strategy is being able to judge trend direction and potential entry points early. The moving average system can produce signals at the beginning of a trend, while the addition of StochRSI effectively filters false breakouts and avoids erroneous trades.

In addition, the strategy combines both trend analysis and overbought/oversold judgment, featuring the strengths of both trend following and mean-reversion. Whether tracking trends or buying low and selling high, this strategy can capture opportunities in all aspects.  

## Risk Analysis  

The main risk of this strategy lies in the lag of the double moving average system itself. When the market changes violently in a sudden, the double moving average system often takes time to generate signals, easily missing the best entry timing.  

In addition, StochRSI may also generate false signals, leading to unnecessary trades, especially in ranging markets where K and D line can frequently crossover, posing risks of excessive invalid operations.

## Optimization Directions   

The optimization of this strategy mainly focuses on several aspects:

1. Adjust the parameters of double moving average to adopt moving average periods more conducive to capturing trends;  

2. Optimize the parameters of StochRSI to come up with more sensible overbought/oversold criteria;

3. Increase order size or adjust stop loss/take profit to pursue higher return;  

4. Incorporate other indicators as filter conditions to further reduce invalid signals.

## Summary  

Overall, this strategy is very suitable for capturing medium-to-long term trends, with great profit potential in early stage of trends. Combining StochRSI as an auxiliary judge can effectively filter misleading signals and avoid unnecessary losses. With improvements in parameter tuning and risk management, this strategy can become a powerful tool to obtain steady returns.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|OHLC Type: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|12|Fast EMA|
|v_input_3|25|Slow EMA|
|v_input_4|25|Consolidated EMA|
|v_input_5|true|Show Both EMAs|
|v_input_int_1|3|K|
|v_input_int_2|3|D|
|v_input_int_3|14|RSI Length|
|v_input_int_4|14|Stochastic Length|
|v_input_int_5|80|(?Bands change this instead of length in Style for Stoch RSI colour to work properly)Upper Band|
|v_input_int_6|50|Middle Band|
|v_input_int_7|20|Lower Band|
|v_input_bool_1|false|(?Crossover Alerts)Crossover Alert Background Colour (Middle Level) [ON/OFF]|
|v_input_bool_2|false|Crossover Alert Background Colour (OB/OS Level) [ON/OFF]|
|v_input_bool_3|false|Crossover Alert >input [ON/OFF]|
|v_input_bool_4|false|Crossover Alert <input [ON/OFF]|
|v_input_string_1|0|(?Moving Average)MA Type: EMA|WMA|SMA|None|
|v_input_source_1_close|0|MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_8|200|MA Length|
|v_input_6|timestamp(2000-12-24T00:00:00)|(?---------TIME RANGE SETTINGS---------)startDate|
|v_input_7|timestamp(2029-02-26T00:00:00)|finishDate|
|v_input_8|200|(?EMA FILTER SETTINGS)EMA Filter Length|
|v_input_9_close|0|EMA Filter Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|26|(?MACD FILTER SETTINGS)Fast Length|
|v_input_11|100|Slow Length|
|v_input_12_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_9|9|Signal Smoothing|
|v_input_string_2|0|Oscillator MA Type: EMA|SMA|
|v_input_string_3|0|Signal Line MA Type: EMA|SMA|
|v_input_float_1|0.3|(?TP/SL CONDITION INPUTS HERE)Enter The Take Profit %|
|v_input_float_2|0.16|Enter The Stop %|
|v_input_13|Long entry|(?ALERT MESSAGE SETTINGS)Long entry alert|
|v_input_14|Short entry|Short entry alert|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © btc_charlie / @TheParagonGrp

//@version=5
strategy('BlackBit Trader XO Macro Trend Scanner', overlay=true)

// Variables
var ok = 0
var countBuy = 0
var countSell = 0
src = input(close, title='OHLC Type')
i_fastEMA = input(12, title='Fast EMA')
i_slowEMA = input(25, title='Slow EMA')
i_defEMA = input(25, title='Consolidated EMA')

// Allow the option to show single or double EMA
i_bothEMAs = input(title='Show Both EMAs', defval=true)

// Define EMAs
v_fastEMA = ta.ema(src, i_fastEMA)
v_slowEMA = ta.ema(src, i_slowEMA)
v_biasEMA = ta.ema(src, i_defEMA)

// Color the EMAs
emaColor = v_fastEMA > v_slowEMA ? color.green : v_fastEMA < v_slowEMA ? color.red : #FF530D

// Plot EMAs
plot(i_bothEMAs ? na : v_biasEMA, color=emaColor, linewidth=3, title='Consolidated EMA')
plot(i_bothEMAs ? v_fastEMA : na, title='Fast EMA', color=emaColor)
plot(i_bothEMAs ? v_slowEMA : na, title='Slow EMA', color=emaColor)

// Colour the bars
buy = v_fastEMA > v_slowEMA
sell = v_fastEMA < v_slowEMA

if buy
    countBuy += 1
    countBuy

if buy
    countSell := 0
    countSell

if sell
    countSell += 1
    countSell

if sell
    countBuy := 0
    countBuy

buysignal = countBuy < 2 and countBuy > 0 and countSell < 1 and buy and not buy[1]
sellsignal = countSell > 0 and countSell < 2 and countBuy < 1 and sell and not sell[1]

barcolor(buysignal ? color.green : na)
barcolor(sellsignal ? color.red : na)


bull = countBuy > 1
bear = countSell > 1

barcolor(bull ? color.green : na)
barcolor(bear ? color.red : na)

// Set Alerts

// alertcondition(ta.crossover(v_fastEMA, v_slowEMA), title='Bullish EMA Cross', message='Bullish EMA crossover')
// alertcondition(ta.crossunder(v_fastEMA, v_slowEMA), title='Bearish EMA Cross', message='Bearish EMA Crossover')

// Stoch RSI code

smoothK = input.int(3, 'K', minval=1)
smoothD = input.int(3, 'D', minval=1)
lengthRSI = input.int(14, 'RSI Length', minval=1)
lengthStoch = input.int(14, 'Stochastic Length', minval=1)

rsi1 = ta.rsi(src, lengthRSI)
k = ta.sma(ta.stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = ta.sma(k, smoothD)

bandno0 = input.int(80, minval=1, title='Upper Band', group='Bands (change this instead of length in Style for Stoch RSI colour to work properly)')
bandno2 = input.int(50, minval=1, title='Middle Band', group='Bands (change this instead of length in Style for Stoch RSI colour to work properly)')
bandno1 = input.int(20, minval=1, title='Lower Band', group='Bands (change this instead of length in Style for Stoch RSI colour to work properly)')

// Alerts

crossoverAlertBgColourMidOnOff = input.bool(title='Crossover Alert Background Colour (Middle Level) [ON/OFF]', group='Crossover Alerts', defval=false)
crossoverAlertBgColourOBOSOnOff = input.bool(title='Crossover Alert Background Colour (OB/OS Level) [ON/OFF]', group='Crossover Alerts', defval=false)

crossoverAlertBgColourGreaterThanOnOff = input.bool(title='Crossover Alert >input [ON/OFF]', group='Crossover Alerts', defval=false)
crossoverAlertBgColourLessThanOnOff = input.bool(title='Crossover Alert <input [ON/OFF]', group='Crossover Alerts', defval=false)

maTypeChoice = input.string('EMA', title='MA Type', group='Moving Average', options=['EMA', 'WMA', 'SMA', 'None'])
maSrc = input.source(close, title='MA Source', group='Moving Average')
maLen = input.int(200, minval=1, title='MA Length', group='Moving Average')

maValue = if maTypeChoice == 'EMA'
    ta.ema(maSrc, maLen)
else if maTypeChoice == 'WMA'
    ta.wma(maSrc, maLen)
else if maTypeChoice == 'SMA'
    ta.sma(maSrc, maLen)
else
    0

crossupCHECK = maTypeChoice == 'None' or open > maValue and maTypeChoice != 'None'
crossdownCHECK = maTypeChoice == 'None' or open < maValue and maTypeChoice != 'None'

crossupalert = crossupCHECK and ta.crossover(k, d) and (k < bandno2 or d < bandno2)
crossdownalert = crossdownCHECK and ta.crossunder(k, d) and (k > bandno2 or d > bandno2)
crossupOSalert = crossupCHECK and ta.crossover(k, d) and (k < bandno1 or d < bandno1)
crossdownOBalert = crossdownCHECK and ta.crossunder(k, d) and (k > bandno0 or d > bandno0)

aboveBandalert = ta.crossunder(k, bandno0)
belowBandalert = ta.crossover(k, bandno1)

bgcolor(color=crossupalert and crossoverAlertBgColourMidOnOff ? #4CAF50 : crossdownalert and crossoverAlertBgColourMidOnOff ? #FF0000 : na, title='Crossover Alert Background Colour (Middle Level)', transp=70)
bgcolor(color=crossupOSalert and crossoverAlertBgColourOBOSOnOff ? #fbc02d : crossdownOBalert and crossoverAlertBgColourOBOSOnOff ? #000000 : na, title='Crossover Alert Background Colour (OB/OS Level)', transp=70)

bgcolor(color=aboveBandalert and crossoverAlertBgColourGreaterThanOnOff ? #ff0014 : crossdownalert and crossoverAlertBgColourMidOnOff ? #FF0000 : na, title='Crossover Alert - K > Upper level', transp=70)
bgcolor(color=belowBandalert and crossoverAlertBgColourLessThanOnOff ? #4CAF50 : crossdownalert and crossoverAlertBgColourMidOnOff ? #FF0000 : na, title='Crossover Alert - K < Lower level', transp=70)

// alertcondition(crossupalert or crossdownalert, title='Stoch RSI Crossover', message='STOCH RSI CROSSOVER')

// Calculate start/end date and time condition
startDate = input(timestamp('2000-12-24T00:00:00'),group = "---------TIME RANGE SETTINGS---------")
finishDate = input(timestamp('2029-02-26T00:00:00'),group = "---------TIME RANGE SETTINGS---------")
time_cond = true


//ema filter
emalen = input(200,"EMA Filter Length",group = "EMA FILTER SETTINGS")
emasource = input(close,"EMA Filter Source",group = "EMA FILTER SETTINGS")
ema_fil = ta.ema(emasource,emalen)
plot(ema_fil,"EMA Filter")

//macd
fast_length = input(title="Fast Length", defval=26,group = "MACD FILTER SETTINGS")
slow_length = input(title="Slow Length", defval=100,group = "MACD FILTER SETTINGS")
src_macd = input(title="Source", defval=close,group = "MACD FILTER SETTINGS")
signal_length = input.int(title="Signal Smoothing",  minval = 1, maxval = 50, defval = 9,group = "MACD FILTER SETTINGS")
sma_source = input.string(title="Oscillator MA Type",  defval="EMA", options=["SMA", "EMA"],group = "MACD FILTER SETTINGS")
sma_signal = input.string(title="Signal Line MA Type", defval="EMA", options=["SMA", "EMA"],group = "MACD FILTER SETTINGS")

// Calculating
fast_ma = sma_source == "SMA" ? ta.sma(src_macd, fast_length) : ta.ema(src_macd, fast_length)
slow_ma = sma_source == "SMA" ? ta.sma(src_macd, slow_length) : ta.ema(src_macd, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length)
hist = macd - signal

//tpsl
takeprofit=input.float(defval=0.3,title="Enter The Take Profit %",group="TP/SL CONDITION INPUTS HERE")/100
stoploss=input.float(defval=0.16,title="Enter The Stop %",group="TP/SL CONDITION INPUTS HERE")/100
tp = strategy.opentrades.entry_price(0)*takeprofit/syminfo.mintick
sl = strategy.opentrades.entry_price(0)*stoploss/syminfo.mintick

lg_rule = buysignal and hist > 0 and close > ema_fil
sh_rule = sellsignal and hist < 0 and close < ema_fil

// Plot Bull/Bear

plotshape(lg_rule, title='Bull', text='Bull', style=shape.triangleup, location=location.belowbar, color=color.new(color.green, 0), textcolor=color.new(color.black, 0), size=size.tiny)
plotshape(sh_rule, title='Bear', text='Bear', style=shape.triangledown, location=location.abovebar, color=color.new(color.red, 0), textcolor=color.new(color.black, 0), size=size.tiny)

//alert
lg_entryal = input("Long entry","Long entry alert",group = "ALERT MESSAGE SETTINGS")
sh_entryal = input("Short entry","Short entry alert",group = "ALERT MESSAGE SETTINGS")

if lg_rule and time_cond and barstate.isconfirmed
    strategy.entry("LONG",strategy.long)
    alert(lg_entryal,alert.freq_once_per_bar_close)
if strategy.position_size > 0
    strategy.exit("LONG EX","LONG",loss = sl,profit = tp,comment_loss = "LONG SL",comment_profit = "LONG TP")

if sh_rule and time_cond and barstate.isconfirmed
    strategy.entry("SHORT",strategy.short)
    alert(sh_entryal,alert.freq_once_per_bar_close)

if strategy.position_size < 0
    strategy.exit("SHORT EX","SHORT",loss = sl,profit = tp,comment_loss = "SHORT SL",comment_profit = "SHORT TP")

//end
```

> Detail

https://www.fmz.com/strategy/439984

> Last Modified

2024-01-25 15:21:46
