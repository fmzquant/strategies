
> Name

一个利用多种技术指标进行量化交易的策略Multiple-Indicator-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1005f23b21aba2dde79.png)
 [trans]
## 概述

该策略是一个利用多种技术指标进行量化交易的策略。主要使用了EMA均线交叉、SuperTrend指标、RSI指标、MACD指标等多种指标进行配合,形成交易信号。

## 策略原理

该策略的核心交易逻辑基于以下几个方面:

1. EMA均线交叉:计算快线EMA1和慢线EMA2,当快线上穿慢线时生成买入信号,快线下穿慢线时生成卖出信号。

2. VWMA均线:计算VWMA均线,当收盘价上穿该均线时视为买入信号,下穿该均线时视为卖出信号。

3. SuperTrend指标:根据ATR和multiplier参数计算SuperTrend的上下轨,并确定趋势方向。在上升趋势中产生买入信号,在下降趋势中产生卖出信号。

4. RSI指标:计算RSI指标,RSI高于超买线时视为卖出信号,RSI低于超卖区时视为买入信号。  

5. MACD指标:计算MACD的快线、慢线和信号线,快线上穿信号线时产生买入信号,快线下穿信号线时产生卖出信号。

在获得上述多个指标的交易信号后,策略采用“AND”逻辑进行判断,即多个指标同时 emit 信号时才生成最终的买入和卖出信号。

## 策略优势

该策略综合多种指标判断市场,可以有效减少假信号。主要优势包括:

1. 利用多种指标进行复合过滤,可以减少单一指标造成的错误信号。

2. 结合趋势指标和震荡指标,可以在趋势行情中获得额外利润。

3. 采用完善的止损逻辑,可以有效控制单笔交易的最大亏损。

4. 倍投逻辑使得亏损后可以通过加仓获得回本机会。

## 策略风险

该策略主要存在以下风险:  

1. 多重指标组合可能过于保守,错过部分交易机会。可以适当简化指标组合。

2. 倍投加仓逻辑可能导致亏损扩大。应该合理设置加仓次数限制。  

3. 止损位置设定不当可能导致不必要的止损。应定制自适应式止损位置。

4. 指标参数设置不当可能导致产生过多错误信号。应该优化参数以得到最佳参数组合。

## 策略优化方向  

该策略可以从以下几个方面进行进一步优化:

1. 评估不同参数组合指标的效果,选取指标权重。

2. 测试不同的指标参数设置。

3. 添加自适应止损逻辑。

4. 加入动态仓位管理机制。

5. 利用机器学习方法对参数和模型进行优化。

## 总结

该策略overall是一个非常实用的量化交易策略。它融合了多种经典技术指标的优势,可以有效进行市场判断。通过参数优化和模型迭代,该策略可以获得更好的交易效果。

||

## Overview 

This strategy utilizes multiple technical indicators for quantitative trading. It mainly uses indicators including EMA crossovers, SuperTrend, RSI, MACD etc. to generate trading signals.

## Strategy Logic  

The core logic is based on the following aspects:   

1. EMA Crossover: Compute fast EMA1 and slow EMA2. When EMA1 crossover above EMA2, generate buy signal. When EMA1 crossover below EMA2, generate sell signal.

2. VWMA: Compute VWMA. When close price crossover above VWMA, it is a buy signal. When close price crossover below VWMA, it is a sell signal.  

3. SuperTrend: Compute the upper band and lower band based on ATR and multiplier parameter. Determine trend direction. Generate buy signals in uptrend and sell signals in downtrend.  

4. RSI: Compute RSI indicator. When RSI is above overbought level, it is sell signal. When RSI is below oversold level, it is buy signal.  

5. MACD: Compute MACD, signal line and histogram. When MACD line crossover above signal line, generate buy. When MACD line crossover below signal line, generate sell.

The strategy adopts "AND" logic to combine signals above. Only when multiple indicators emit buy/sell signal simultaneously, a final trading signal will be generated.   

## Advantages  

This strategy combines multiple indicators to filter the market and avoid false signals. Main advantages:

1. Multiple indicators combination avoids errors of single indicator.  

2. Combination of trend indicator and oscillator capture extra profit during trends.

3. Use of stop loss logic limits maximum loss per trade.  

4. Martingale logic provides chance to break even after losses.  

## Risks   

Main risks:

1. Too conservative indicator combination may miss some trading chance. Simplify the indicators combination when necessary.  

2. Martingale logic may lead to significant losses. Set reasonable limitation to the number of additional entries. 

3. Improper use of stop loss may lead to unnecessary stop out. Adopt adaptive stop loss mechanism.

4. Improper parameter tuning may lead too more false signals. Optimize parameters to find the best combination.  

## Optimization  

The strategy can be further optimized in the following aspects:

1. Evaluate different combination of indicators, determine the weights.  

2. Test different parameters for each indicator.  

3. Add adaptive stop loss logic.  

4. Add dynamic position sizing mechanism. 

5. Leverage machine learning to optimize parameters and models.

## Summary  

In summary, this is a very practical quantitative trading strategy. It combines the strength of multiple classical technical indicators for market analysis. Further parameter tuning and model optimization can lead to better results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|true|From Month|
|v_input_int_2|true|From Day|
|v_input_int_3|2021|From Year|
|v_input_int_4|true|Thru Month|
|v_input_int_5|true|Thru Day|
|v_input_int_6|2112|Thru Year|
|v_input_1|true|Show Date Range|
|v_input_int_7|10|length1|
|v_input_int_8|20|length2|
|v_input_int_9|20|VWMA_len|
|v_input_2|22|STR Period|
|v_input_3_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_float_1|5|STR Multiplier|
|v_input_4|14|Rsi Period|
|v_input_5|44|over_sold|
|v_input_6|56|over_bought|
|v_input_int_10|12|slow_len_macd|
|v_input_int_11|26|fast_len_macd|
|v_input_int_12|9|signal_len_macd|
|v_input_7|14|ADX Smoothing|
|v_input_8|14|DI Length|
|v_input_int_13|25|adx_Greater_than|
|v_input_int_14|10|volume_ema|
|v_input_9|true|multiple_signals|
|v_input_10|0.5|StopLoss|
|v_input_11|1.5|Profit|
|v_input_12|1024|Reverse Limit|
|v_input_13|true|Averaging position ? |


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=5
strategy(title='Pinku Buy', overlay=true)

fromMonth = input.int(defval=1, title='From Month', minval=1, maxval=12)
fromDay = input.int(defval=1, title='From Day', minval=1, maxval=31)
fromYear = input.int(defval=2021, title='From Year', minval=1970)
thruMonth = input.int(defval=1, title='Thru Month', minval=1, maxval=12)
thruDay = input.int(defval=1, title='Thru Day', minval=1, maxval=31)
thruYear = input.int(defval=2112, title='Thru Year', minval=1970)

showDate = input(defval=true, title='Show Date Range')

start = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finish = timestamp(thruYear, thruMonth, thruDay, 23, 59)
window() => true
// ema crossover
length1 = input.int(10)
length2 = input.int(20)
ema1 = ta.ema(close , length1)
ema2 = ta.ema(close , length2)
//vwap 
VWAP = ta.vwap(hlc3)
plot(VWAP, color=color.new(color.red, 0), linewidth=3)
buy_1 = close > VWAP
sell_1 = close < VWAP
//vwma 
len = input.int(20, 'VWMA_len', minval=1)
ma = ta.vwma(close, len)
plot(ma, color=color.new(color.navy, 0), linewidth=2)
buy_2 = close > ma
sell_2 = close < ma
//super trend 
//inputs 
Periods = input(title='STR Period', defval=22)
Source = input(hl2, title='Source')
Multiplier = input.float(title='STR Multiplier', step=0.1, defval=5.0)



//Compute ATR Levels 
atr = ta.atr(Periods)


//Creating Upper Channel 

up = Source - Multiplier * atr
up1 = nz(up[1], up)
up := close[1] > up1 ? math.max(up, up1) : up

//Creating Down Channel 
dn = Source + Multiplier * atr
dn1 = nz(dn[1], dn)
dn := close[1] < dn1 ? math.min(dn, dn1) : dn


//Compute the Trend Stream +1/-1 
trend = 1
trend := nz(trend[1], trend)
trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend

//Create Stoploss for Longs 
upPlot = plot(trend == 1 ? up : na, title='Up Trend', style=plot.style_linebr, linewidth=2, color=color.new(color.green, 0))
//buy_a = close > upPlot 
//Buy Signal 
buy_3 = trend == 1 and trend[1] == -1

plotshape(buy_3 ? up : na, title='Go Long', location=location.absolute, style=shape.circle, size=size.tiny, color=color.new(color.green, 0))

dnPlot = plot(trend == 1 ? na : dn, title='Down Trend', style=plot.style_linebr, linewidth=2, color=color.new(color.red, 0))
//sell_a = close < dnPlot 
//Sell Signal 
sell_3 = trend == -1 and trend[1] == 1

plotshape(sell_3 ? dn : na, title='Go Short', location=location.absolute, style=shape.circle, size=size.tiny, color=color.new(color.red, 0))
// //paraboloic sar 
// start = input(0.02)
// increment = input(0.02)
// maximum = input(0.2, 'Max Value')
// out = ta.sar(start, increment, maximum)


buy_4 = ema1 > ema2
//buy_4 = buy1 and not buy1[1] 
//plotshape(buy_4 , color = color.green , text = "Buy" , location = location.belowbar , textcolor = color.white , style = shape.labelup , size = size.small) 
sell_4 = close < ema2
//sell_4 = sell1 and not sell1[1] 
//plotshape(sell_4, color = color.red , text = "Sell" , location = location.abovebar , textcolor = color.white , style = shape.labeldown , size = size.small) 
plot(ema1, 'ema1', color=color.new(color.green, 0), linewidth=2)
plot(ema2, 'ema2', color=color.new(color.red, 0), linewidth=2)

// rsi
lenr = input(14, title='Rsi Period')
rs = ta.rsi(close, lenr)

over_sold = input(44)
over_bought = input(56)

buy_5 = rs > over_bought 
sell_5 = rs < over_sold 
// macd
slow_len_macd = input.int(12)
fast_len_macd = input.int(26)
signal_len_macd = input.int(9)

ema3 = ta.ema(close , slow_len_macd)
ema4 = ta.ema(close , fast_len_macd)
ema5 = ta.ema(close , signal_len_macd)

buy_6 = ema5 > ema4
sell_6 = ema5 < ema4

// adx
adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
dirmov(len) =>
	up = ta.change(high)
	down = -ta.change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
	minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = ta.rma(ta.tr, len)
	plus = fixnan(100 * ta.rma(plusDM, len) / truerange)
	minus = fixnan(100 * ta.rma(minusDM, len) / truerange)
	[plus, minus]
adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
sig = adx(dilen, adxlen)
//plot(sig, color=color.red, title="ADX")
adx_Greater_than = input.int(25)

signal = sig > adx_Greater_than 
// volume ema 
volume_ema = input.int(10)

vema = ta.ema(volume,volume_ema)

signal_2 = volume > vema



//define buy sell 
g = buy_1 and buy_2 and buy_4 and trend == 1 and buy_5 and buy_6 and signal and signal_2 and window()
r = sell_1 and sell_2 and sell_4 and trend == -1 and sell_5 and sell_6 and signal and signal_2 and window()

rg = 0
rg := r ? 1 : g ? 2 : nz(rg[1])

buy11 = 0
buy11 := r ? 0 : g ? 1 : nz(buy11[1])
sell11 = 0
sell11 := r ? 1 : g ? 0 : nz(sell11[1])

buy = buy11 and not buy11[1]
sell = sell11 and not sell11[1]
multiple_signals = input(true)

if multiple_signals
    buy := g and not g[1] and  window()
    sell := r and not r[1] and  window()
    sell
else
    buy := buy and window()
    sell := sell and window()
    sell



//plotshape(long  , color = color.green , text = "Buy" , location = location.belowbar , textcolor = color.white , style = shape.labelup , size = size.small) 
//plotshape(short   , color = color.red , text = "Sell" , location = location.abovebar , textcolor = color.white , style = shape.labeldown , size = size.small) 
Stop = input(0.5, title='StopLoss') / 100

ProfitPerc = input(defval=1.5, title='Profit') / 100

rev = input(1024,title = "Reverse Limit")

Averaging_position_ = input(true , title = "Averaging position ? ")

qn = 1
qn := nz(qn[1])


long_short = 0
long_last = buy and (nz(long_short[1]) == 0 or nz(long_short[1]) == -1)
short_last = sell and (nz(long_short[1]) == 0 or nz(long_short[1]) == 1)
long_short := long_last ? 1 : short_last ? -1 : long_short[1]

long_entered = false
long_entered := long_entered[1]

short_entered = false
short_entered := short_entered[1]


longPrice = ta.valuewhen(long_last, close, 0)
shortPrice = ta.valuewhen(short_last, close, 0)


longStop = longPrice * (1 - Stop)
shortStop = shortPrice * (1 + Stop)
longTake = longPrice * (1 + ProfitPerc)
shortTake = shortPrice * (1 - ProfitPerc)
plot(long_short == 1 ? longStop : na, style=plot.style_linebr, color=color.new(color.red, 0), linewidth=1, title='Long Fixed SL')
plot(long_short == -1 ? shortStop : na, style=plot.style_linebr, color=color.new(color.red, 0), linewidth=1, title='Short Fixed SL')
plot(long_short == 1 ? longTake : na, style=plot.style_linebr, color=color.new(color.navy, 0), linewidth=1, title='Long Fixed TP')


plot(long_short == -1 ? shortTake : na, style=plot.style_linebr, color=color.new(color.navy, 0), linewidth=1, title='Short Fixed TP')


longBar1 = ta.barssince(long_last)
longBar2 = longBar1 >= 1 ? true : false
shortBar1 = ta.barssince(short_last)
shortBar2 = shortBar1 >= 1 ? true : false

longSLhit = long_short == 1 and longBar2 and low < longStop

if long_entered and sell
    longSLhit := true
    longSLhit

plotshape(longSLhit and not(sell and not short_entered and long_entered), style=shape.labelup, location=location.belowbar, color=color.new(color.gray, 0), size=size.tiny, title='Stop Loss', text='Long SL', textcolor=color.new(color.white, 0))
shortSLhit = long_short == -1 and shortBar2 and high > shortStop


if short_entered and buy
    shortSLhit := true
    shortSLhit

plotshape(shortSLhit and not(buy and not long_entered and short_entered), style=shape.labeldown, location=location.abovebar, color=color.new(color.gray, 0), size=size.tiny, title='Stop Loss', text='Short SL', textcolor=color.new(color.white, 0))


longTPhit = long_short == 1 and longBar2 and high > longTake
plotshape(longTPhit, style=shape.labeldown, location=location.abovebar, color=color.new(color.navy, 0), size=size.tiny, title='Target', text='Long TP', textcolor=color.new(color.white, 0))
shortTPhit = long_short == -1 and shortBar2 and low < shortTake
plotshape(shortTPhit, style=shape.labelup, location=location.belowbar, color=color.new(color.navy, 0), size=size.tiny, title='Target', text='Short TP', textcolor=color.new(color.white, 0))

long_short := (long_short == 1 or long_short == 0) and longBar2 and (longSLhit or longTPhit) ? 0 : (long_short == -1 or long_short == 0) and shortBar2 and (shortSLhit or shortTPhit) ? 0 : long_short

if(shortSLhit or longSLhit or (long_entered[1] and sell) or (short_entered[1] and buy ))
    qn := qn*2
 
if(longTPhit or shortTPhit or qn > rev)
    qn := 1
    
if Averaging_position_
    qn := 1
 
plotshape(buy and not long_entered, color=color.new(color.green, 0), style=shape.labelup, text='Buy', textcolor=color.new(color.white, 0), location=location.belowbar)
plotshape(sell and not short_entered, color=color.new(color.red, 0), style=shape.labeldown, text='Sell', textcolor=color.new(color.white, 0), location=location.abovebar)


// plotshape(buy and not(long_entered) and (short_entered), color = color.green , style = shape.labelup , text = "FA Buy" , textcolor = color.white , location = location.belowbar) 
// plotshape(sell and not(short_entered)  and (long_entered), color = color.red , style = shape.labeldown , text = "FA Sell" , textcolor = color.white , location = location.abovebar) 


// alertcondition(condition=buy and  not(long_entered)  and (short_entered), title="Fully Algo Buy") 
// alertcondition(condition=sell and  not(short_entered)  and (long_entered), title="Fully Algo sell") 

alertcondition(condition=buy and not long_entered, title='Buy')
alertcondition(condition=sell and not short_entered, title='Sell')

if long_last
    long_entered := true
    short_entered := false
    short_entered
if short_last
    short_entered := true
    long_entered := false
    long_entered

alertcondition(condition=longSLhit and not(sell and not short_entered and long_entered), title='Long SL')
alertcondition(condition=shortSLhit and not(buy and not long_entered and short_entered), title='Short SL')

alertcondition(condition=longTPhit, title='Long TP')
alertcondition(condition=shortTPhit, title='Short TP')

if longSLhit or longTPhit
    long_entered := false
    long_entered

if shortSLhit or shortTPhit
    short_entered := false
    short_entered

// if buy
//     strategy.entry('buy', strategy.long)
//     strategy.exit('exit', 'buy', limit=longTake, stop=longStop)


// if sell
//     strategy.entry('sell', strategy.short)
//     strategy.exit('exit', 'sell', limit=shortTake, stop=shortStop)
if(buy)
    strategy.entry("buy",strategy.long,qty = qn)
    strategy.exit("Stop","buy",limit = longTake,stop = longStop)
 
if(sell)
    strategy.entry("sell",strategy.short,qty = qn)
    strategy.exit("Stop","sell",limit = shortTake,stop = shortStop)
 
strategy.close("buy",when =  longTPhit or sell or longSLhit, comment = "Target")
strategy.close("sell",when =  shortSLhit or shortTPhit or buy , comment = "Stop Loss")
 
strategy.cancel("buy",when =  longTPhit or sell or longSLhit)
strategy.cancel("sell",when =  shortSLhit or shortTPhit or buy )
```

> Detail

https://www.fmz.com/strategy/440105

> Last Modified

2024-01-26 16:19:47
