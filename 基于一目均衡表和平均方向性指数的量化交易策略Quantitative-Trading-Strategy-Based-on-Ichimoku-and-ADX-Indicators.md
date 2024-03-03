
> Name

基于一目均衡表和平均方向性指数的量化交易策略Quantitative-Trading-Strategy-Based-on-Ichimoku-and-ADX-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d41e1ddb32ff38488e.png)
 [trans]

### 概述

本策略通过结合使用一目均衡表和平均方向性指数(ADX)这两种技术指标来识别股票价格的趋势和关键支持阻力位,以发出买入和卖出信号。该策略旨在在趋势行情中捕捉较大的价格波动。

### 策略原理

一目均衡表包含前转换线、基准线和延迟线三条移动平均线。当价格上穿前转换线和基准线时,发出买入信号;当价格下穿这两条线时,发出卖出信号。此外,一目均衡表还通过云图识别关键的支持阻力区域。

ADX用于判断价格趋势的力度。当+DI和-DI明显分离时,表示趋势行情;当+DI和-DI接近时,表示盘整行情。本策略在ADX大于20时才发出交易信号,以避免在盘整期捕捉假突破。

综合使用一目均衡表的趋势判断和ADX对趋势力度的过滤,可以有效识别价格波动较大的趋势行情段。

### 策略优势

- 使用两种指标的组合,使得交易信号更加可靠
- ADX的使用避免了在盘整行情的错误交易
- 回测表现较好,收益风险比高

### 风险分析

- 该策略更适合趋势股票,对于盘整的股票,信号可能不多
- 一目均衡表本身存在响应滞后的问题,可能错过快速反转的机会
- ADX对盘整行情的判断并不完美,仍存在误判的可能

### 优化方向  

- 可以测试不同参数组合,如转换线、基准线周期的调整
- 可以结合其他指标,如MACD、KD等进一步优化
- 可以研究不同的ADX过滤规则或条件

### 总结

本策略通过一目均衡表和ADX的有效结合,实现了对趋势行情的有效捕捉。在进一步参数和规则优化的基础上,该策略可以获得更好的回测和实盘表现。本策略适合对趋势股进行交易的策略投资者。

||

### Overview  

This strategy combines the Ichimoku Cloud and ADX (Average Directional Index) indicators to identify trend and key support & resistance levels for market entry and exit signals. It aims to capture large price waves during trending markets.

### Strategy Mechanism  

The Ichimoku Cloud contains 3 moving averages of Tenkan Line, Kijun Line and Chikou line. A buy signal is generated when price breaks above the Tenkan Line and Kijun Line; A sell signalis generated when price breaks below the two lines. The key support & resistance levels are identified by the cloud.  

The ADX is used to determine the strength of price trend. A higher reading of +DI and -DI suggests a trending market; when the two lines converge, a range-bound market is defined. The strategy only initiates position on an ADX reading above 20 to avoid whipsaws during sideways market. 

By combining Ichimoku trend determination and ADX filtering, the strategy is effective in identifying periods of high price volatility.

### Advantages  

- Combination of signals provides more reliable confirmation 
- ADX filter avoids incorrect trades during non-trending periods 
- Good backtest performance with high risk-return profile

### Risk Analysis  

- Better suited for trending stocks; less frequent signals in range bound market 
- Ichimoku has inherent lag and may miss quick reversal patterns  
- Imperfect determination of non-trending environment by ADX 

### Optimization Scope

- Test different parameter combinations like Tenkan, Kijun periods  
- Combine other indicators, e.g. MACD, KD etc., for further enhancement
- Examine different ADX filtering logics and threshold values

### Summary  

The strategy effectively combines Ichimoku and ADX to capture trending markets. With further fine-tuning of parameters and rules, better backtest and live performance can be achieved. It is suitable for trend-focused traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Conversion Line Periods|
|v_input_2|26|Base Line Periods|
|v_input_3|52|Lagging Span 2 Periods|
|v_input_4|26|Displacement|
|v_input_5|14|ADX Smoothing|
|v_input_6|14|DI Length|
|v_input_7|23|key level for ADX|
|v_input_8|2|From Month|
|v_input_9|true|From Day|
|v_input_10|2015|From Year|
|v_input_11|true|To Month|
|v_input_12|true|To Day|
|v_input_13|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-10 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Ichimoku + ADX", shorttitle="Ichimoku & ADX Backtest", overlay=true)

//------------------------------
//------------------------------
// ICHIMOKU
//------------------------------
//------------------------------

conversionPeriods = input(9, minval=1, title="Conversion Line Periods"),
basePeriods = input(26, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Periods"),
displacement = input(26, minval=1, title="Displacement")

donchian(len) => avg(lowest(len), highest(len))

Tenkan = donchian(conversionPeriods)
Kijun = donchian(basePeriods)
SSA = avg(Tenkan, Kijun)
SSB = donchian(laggingSpan2Periods)

SSAdisp = SSA[displacement]
SSBdisp = SSB[displacement]

// Plot Ichimoku
// --------------------

plot(Tenkan, color=color.red, title="Tenkan")
plot(Kijun, color=color.blue, title="Kijun")
plot(close, offset = -displacement + 1, color=#459915, title="Chikou")


p1 = plot(SSA, offset = displacement - 1, color=color.green,
 title="Senkou A")
p2 = plot(SSB, offset = displacement - 1, color=color.red, 
 title="Senkou B")
fill(p1, p2, color = SSA > SSB ? color.green : color.red)

//------------------------------
//------------------------------
// ADX
//------------------------------
//------------------------------

adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
keyLevel = input(23, title="key level for ADX")
dirmov(len) =>
	up = change(high)
	down = -change(low)
	truerange = rma(tr, len)
	plus = fixnan(100 * rma(up > down and up > 0 ? up : 0, len) / truerange)
	minus = fixnan(100 * rma(down > up and down > 0 ? down : 0, len) / truerange)
	[plus, minus]

adx(dilen, adxlen) => 
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
	[adx, plus, minus]

[sig, up, down] = adx(dilen, adxlen)

// Plot ADX
// --------------------

//plot(sig, color=color.black, title="ADX")
//plot(up, color=color.green, title="+DI",linewidth=2, style=plot.style_columns, transp=40)
//plot(down, color=color.red, title="-DI",linewidth=2, style=plot.style_columns, transp=40)
//plot(keyLevel, color=color.white, title="Key Level")



//------------------------------
//------------------------------
// STRATEGY
//------------------------------
//------------------------------

// Buy & Sell Signals
// --------------------

// ADX
ABuy1 = up > keyLevel and up - down >5 and sig > down and sig < keyLevel * 2
ASell1 = down > keyLevel and down - up >5 and sig > up and sig < keyLevel * 2


// ICHIMOKU

Bull = close >= max(SSAdisp, SSBdisp)
Bear = close <= min(SSAdisp, SSBdisp)

//  1. Bull
Buy1 = (close >= max(SSAdisp, SSBdisp)) ? 1 : 0
Buy2 = (Tenkan - Kijun >= 0.001) ? 1 : 0
Buy3 = SSA > SSB ? 1 : 0
Buy4 = sig > 20 ? 1 : 0
Buy4a = close - close[displacement] >=0.001 ? 1:0
Buy5 = Buy1 and Buy2 and Buy3 and Buy4 and Buy4a and not(Buy1[1] and Buy2[1] and Buy3[1])

//  1. Bear
Sell1 = (close <= min(SSAdisp, SSBdisp)) ? 1 : 0
Sell2 = (Kijun - Tenkan >= 0.001) ? 1 : 0
Sell3 = SSA < SSB ? 1 : 0
Sell4 = sig > 20 ? 1 : 0
Sell4a = close <= close[displacement]
Sell5 = Sell1 and Sell2 and Sell3 and Sell4 and Sell4a and not(Sell1[1] and Sell2[1] and Sell3[1])


// CONSOLIDATED

buysignal = Buy5
buyexitsignal = crossunder(close,Kijun)

sellsignal = Sell5 
sellexitsignal = crossover(close,Kijun)    

longCondition = buysignal
shortCondition = sellsignal
    
// Plot Indicators
// --------------------

// ----- Buy & Sell

//plotshape(longCondition, title = "Buy Signal", text ="BUY", textcolor =#FFFFFF , style=shape.labelup, size = size.tiny, location=location.belowbar, color = #1B8112, transp = 0)
//plotshape(shortCondition, title = "Short Signal", text ="SHORT", textcolor =#FFFFFF , style=shape.labeldown, size = size.tiny, location=location.abovebar, color = #000000, transp = 0)

// ----- Ichimoku Signals

//plotshape(Sell2, title = "Sell Signal", text ="Kumo Twist", textcolor =#FFFFFF , style=shape.labelup, size = size.tiny, location=location.top, color = color.black, transp = 0)
//plotshape(Sell3, title = "Sell Signal", text ="TK/KJ", textcolor =#FFFFFF , style=shape.labelup, size = size.tiny, location=location.bottom, color = color.black, transp = 0)

//plotshape(Buy4, title = "Buy Signal", text ="Kumo Twist", textcolor =#FFFFFF , style=shape.diamond, size = size.tiny, location=location.belowbar, color = color.blue, transp = 0)
//plotshape(Buy3, title = "Buy Signal", text ="TK/KJ", textcolor =#FFFFFF , style=shape.circle, size = size.tiny, location=location.abovebar, color = color.green, transp = 0)
//plotshape(Buy4, title = "Buy Signal", text ="TK/KJ", textcolor =#FFFFFF , style=shape.circle, size = size.tiny, location=location.belowbar, color = color.red, transp = 0)



//plotshape(buyexitsignal, title = "Buy Exit", style=shape.triangledown, size = size.tiny, location=location.abovebar, color = color.green, transp = 0)
//plotshape(sellexitsignal, title = "Buy Exit", style=shape.triangleup, size = size.tiny, location=location.belowbar, color = color.black, transp = 0)

//------------------------------
//------------------------------
// EXECUTION
//------------------------------
//------------------------------


// Test Range
// --------------------

// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 2, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2015, title = "From Year", minval = 2017)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2017)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"

// Orders
// --------------------


if longCondition
    strategy.entry("Buy", strategy.long, when=window())
    
if buyexitsignal 
    strategy.close("Buy")
    
if shortCondition
    strategy.entry("Sell", strategy.short, when=window())

if sellexitsignal
    strategy.close("Sell")

```

> Detail

https://www.fmz.com/strategy/439705

> Last Modified

2024-01-23 11:14:54
