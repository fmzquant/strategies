
> Name

双MA动量突破策略Dual-MA-Momentum-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d7a1561dcd410ec00e.png)
[trans]
## 概述
双MA动量突破策略是一种融合双移动平均线和RSI指标的量化交易策略。该策略通过计算快速移动平均线、慢速移动平均线和RSI指标,设定动量指标RSI的超买超卖阈值,在双MA发生黄金交叉时做多,死叉时做空,以捕捉市场的趋势性行情。

## 策略原理  
双MA动量突破策略主要基于双移动平均线和RSI指标。首先计算一快一慢两个移动平均线,快线为10日加权移动平均线,慢线为100日线性自适应移动平均线。然后计算14日RSI指标,并设定超买超卖阈值。当快线上穿慢线时判断为多头行情,而快线下穿慢线时则为空头行情。在判定多空行情的同时,还需要RSI指标高于超买线或低于超卖线,这样可以有效过滤假突破。

具体来说,当判断为多头行情时,如果此时的RSI指标高于超买线,则进行多头开仓;当判断为空头行情时,如果RSI指标低于超卖线,则进行空头开仓。开仓后,交易信号发生反转时进行反向开仓。

## 策略优势  
双MA动量突破策略结合双MA和RSI指标,可以有效识别市场趋势,并利用RSI指标过滤假突破,从而提高交易信号的可靠性。相比单一MA系统,该策略可以大幅减少无效交易的发生。此外,RSI指标的参数优化也为策略带来了灵活性。

## 策略风险
双MA动量突破策略也存在一定的风险。双MA系统对参数十分敏感,需要针对不同市场谨慎测试参数组合。此外,RSI指标设定的阈值如果不当也可能导致错失交易机会。最后,激进的移动止损在特定行情下可能被突破,应根据回测结果调整止损点。

## 策略优化  
双MA动量突破策略可从以下几个方面进行优化:

1. 优化快慢MA的参数,寻找最佳参数组合;
2. 优化RSI参数,调整超买超卖阈值; 
3. 增加自适应移动止损机制,以控制风险;
4. 增加开仓量优化模块,提高资金使用效率。

## 总结
双MA动量突破策略通过双MA系统判断趋势方向,并利用RSI指标过滤信号,能有效改善单MA系统的缺点。该策略参数优化空间大、可实现自适应调整,是一种优秀的趋势跟踪策略。

||

## Overview
The Dual MA Momentum Breakout Strategy is a quantitative trading strategy that combines dual moving average lines and RSI indicators. It calculates fast moving average, slow moving average and RSI to set overbought/oversold thresholds for the momentum indicator RSI. It goes long when the dual MAs have golden crosses and goes short when there are death crosses, in order to capture the trending moves in the market.

## Logic
The Dual MA Momentum Breakout Strategy is mainly based on dual moving averages and RSI indicator. It first calculates one fast and one slow moving average line, with the fast MA being the 10-day weighted moving average and the slow MA being the 100-day linear adaptive moving average. Then it calculates the 14-day RSI and sets overbought/oversold thresholds. When the fast MA crosses above the slow MA, it signals an uptrend, and when the fast MA crosses below the slow MA, it signals a downtrend. In addition to determining the trend direction, the strategy also requires the RSI to be above the overbought threshold or below the oversold threshold to effectively filter out fake breakouts.  

Specifically, when an uptrend is identified, if the RSI is above the overbought threshold at this time, a long position will be opened. When a downtrend is identified and the RSI is below the oversold threshold, a short position will be opened. After opening a position, the opposite position will be opened when the trading signal is reversed.

## Advantage
The Dual MA Momentum Breakout Strategy combines dual MAs and RSI to effectively identify market trends and uses the RSI to filter out fake breakouts, thereby improving the reliability of trading signals. Compared to a single MA system, this strategy can greatly reduce the occurrence of ineffective trades. In addition, the parameter optimization of the RSI also provides flexibility for the strategy.  

## Risk  
The Dual MA Momentum Breakout Strategy also carries some risks. The dual MA system is very sensitive to parameters and different parameter combinations need to be carefully tested for different markets. In addition, improperly set thresholds for RSI may also lead to missing trading opportunities. Finally, aggressive trailing stops may be penetrated in certain market conditions, so stop loss points should be adjusted based on backtesting results.

## Optimization
The Dual MA Momentum Breakout Strategy can be optimized in the following aspects:

1. Optimize fast and slow MA parameters to find the best parameter combination;  
2. Optimize RSI parameters and adjust overbought/oversold thresholds;
3. Add adaptive trailing stop mechanisms to control risks; 
4. Add position sizing optimization module to improve capital use efficiency.

## Conclusion  
The Dual MA Momentum Breakout Strategy determines trend direction through the dual MA system and uses RSI to filter signals, which can effectively improve the shortcomings of a single MA system. This strategy has large optimization space for parameters and can achieve adaptive adjustment. It is an excellent trend following strategy.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|length|
|v_input_2|10|Increment|
|v_input_3|10|fast|
|v_input_4_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|14|RSI Length|
|v_input_6|5|RSI Smoothing|
|v_input_7|4.238|Fast QQE Factor|
|v_input_8|10|Thresh-hold|
|v_input_9|false|Show Smooth RSI, QQE Signal crosses|
|v_input_10|false|Show Smooth RSI Zero crosses|
|v_input_11|false|Show Smooth RSI Thresh Hold Channel Exits|
|v_input_string_1|0|MA Type: EMA|ALMA|DEMA|TEMA|WMA|VWMA|SMA|SMMA|HMA|LSMA|PEMA|
|v_input_int_1|false|* Least Squares (LSMA) Only - Offset Value|
|v_input_float_1|0.85|* Arnaud Legoux (ALMA) Only - Offset Value|
|v_input_int_2|6|* Arnaud Legoux (ALMA) Only - Sigma Value|
|v_input_12|true|color bars?|
|v_input_13_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_3|14|ATR Length|
|v_input_string_2|0|ATR Smoothing: RMA|SMA|EMA|WMA|
|v_input_14|0.3|ATR Multiplier|
|v_input_15_high|0|src1: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_16_low|0|src2: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_17|true|Show Price Lines|
|v_input_18|blue|ATR Text Color|
|v_input_color_1|teal|Low Text Color|
|v_input_color_2|red|High Text Color|
|v_input_color_3|teal|Low Line Color|
|v_input_color_4|red|High Line Color|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-10 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This work is licensed under a Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) https://creativecommons.org/licenses/by-nc-sa/4.0/
// © Salman4sgd

//@version=5
strategy("MAConverging + QQE Threshold Strategy", overlay = true)
//------------------------------------------------------------------------------
//Settings
//-----------------------------------------------------------------------------{
length = input(100)

incr   = input(10, "Increment")

fast   = input(10)

src    = input(close)

//-----------------------------------------------------------------------------}
//Calculations
//-----------------------------------------------------------------------------{
var ma    = 0.
var fma   = 0.
var alpha = 0.
var k     = 1 / incr

upper = ta.highest(length)
lower = ta.lowest(length)
init_ma = ta.sma(src, length)

cross = ta.cross(src,ma)

alpha := cross ? 2 / (length + 1)
  : src > ma and upper > upper[1] ? alpha + k
  : src < ma and lower < lower[1] ? alpha + k
  : alpha

ma := nz(ma[1] + alpha[1] * (src - ma[1]), init_ma)
  
fma := nz(cross ? math.avg(src, fma[1])
  : src > ma ? math.max(src, fma[1]) + (src - fma[1]) / fast
  : math.min(src, fma[1]) + (src - fma[1]) / fast,src)

//-----------------------------------------------------------------------------}
//Plots
//-----------------------------------------------------------------------------{
css = fma > ma ? color.teal : color.red

plot0 = plot(fma, "Fast MA" 
  , color = #ff5d00
  , transp = 100)

plot1 = plot(ma, "Converging MA"
  , color = css)

fill(plot0, plot1, css
  , "Fill"
  , transp = 80)
  
//-----------------------------------------------------------------------------}

RSI_Period = input(14, title='RSI Length')
SF = input(5, title='RSI Smoothing')
QQE = input(4.238, title='Fast QQE Factor')
ThreshHold = input(10, title='Thresh-hold')
//
sQQEx = input(false, title='Show Smooth RSI, QQE Signal crosses')
sQQEz = input(false, title='Show Smooth RSI Zero crosses')
sQQEc = input(false, title='Show Smooth RSI Thresh Hold Channel Exits')
ma_type = input.string(title='MA Type', defval='EMA', options=['ALMA', 'EMA', 'DEMA', 'TEMA', 'WMA', 'VWMA', 'SMA', 'SMMA', 'HMA', 'LSMA', 'PEMA'])
lsma_offset = input.int(defval=0, title='* Least Squares (LSMA) Only - Offset Value', minval=0)
alma_offset = input.float(defval=0.85, title='* Arnaud Legoux (ALMA) Only - Offset Value', minval=0, step=0.01)
alma_sigma = input.int(defval=6, title='* Arnaud Legoux (ALMA) Only - Sigma Value', minval=0)
inpDrawBars = input(true, title='color bars?')


ma(type, src, len) =>
    float result = 0
    if type == 'SMA'  // Simple
        result := ta.sma(src, len)
        result
    if type == 'EMA'  // Exponential
        result := ta.ema(src, len)
        result
    if type == 'DEMA'  // Double Exponential
        e = ta.ema(src, len)
        result := 2 * e - ta.ema(e, len)
        result
    if type == 'TEMA'  // Triple Exponential
        e = ta.ema(src, len)
        result := 3 * (e - ta.ema(e, len)) + ta.ema(ta.ema(e, len), len)
        result
    if type == 'WMA'  // Weighted
        result := ta.wma(src, len)
        result
    if type == 'VWMA'  // Volume Weighted
        result := ta.vwma(src, len)
        result
    if type == 'SMMA'  // Smoothed
        w = ta.wma(src, len)
        result := na(w[1]) ? ta.sma(src, len) : (w[1] * (len - 1) + src) / len
        result
    if type == 'HMA'  // Hull
        result := ta.wma(2 * ta.wma(src, len / 2) - ta.wma(src, len), math.round(math.sqrt(len)))
        result
    if type == 'LSMA'  // Least Squares
        result := ta.linreg(src, len, lsma_offset)
        result
    if type == 'ALMA'  // Arnaud Legoux
        result := ta.alma(src, len, alma_offset, alma_sigma)
        result
    if type == 'PEMA'
        // Copyright (c) 2010-present, Bruno Pio
        // Copyright (c) 2019-present, Alex Orekhov (everget)
        // Pentuple Exponential Moving Average script may be freely distributed under the MIT license.
        ema1 = ta.ema(src, len)
        ema2 = ta.ema(ema1, len)
        ema3 = ta.ema(ema2, len)
        ema4 = ta.ema(ema3, len)
        ema5 = ta.ema(ema4, len)
        ema6 = ta.ema(ema5, len)
        ema7 = ta.ema(ema6, len)
        ema8 = ta.ema(ema7, len)
        pema = 8 * ema1 - 28 * ema2 + 56 * ema3 - 70 * ema4 + 56 * ema5 - 28 * ema6 + 8 * ema7 - ema8
        result := pema
        result
    result

src := input(close, title='RSI Source')
//

//
Wilders_Period = RSI_Period * 2 - 1


Rsi = ta.rsi(src, RSI_Period)
RsiMa = ma(ma_type, Rsi, SF)
AtrRsi = math.abs(RsiMa[1] - RsiMa)
MaAtrRsi = ma(ma_type, AtrRsi, Wilders_Period)
dar = ma(ma_type, MaAtrRsi, Wilders_Period) * QQE

longband = 0.0
shortband = 0.0
trend = 0

DeltaFastAtrRsi = dar
RSIndex = RsiMa
newshortband = RSIndex + DeltaFastAtrRsi
newlongband = RSIndex - DeltaFastAtrRsi
longband := RSIndex[1] > longband[1] and RSIndex > longband[1] ? math.max(longband[1], newlongband) : newlongband
shortband := RSIndex[1] < shortband[1] and RSIndex < shortband[1] ? math.min(shortband[1], newshortband) : newshortband
cross_1 = ta.cross(longband[1], RSIndex)
trend := ta.cross(RSIndex, shortband[1]) ? 1 : cross_1 ? -1 : nz(trend[1], 1)
FastAtrRsiTL = trend == 1 ? longband : shortband

//
// Find all the QQE Crosses
QQExlong = 0
QQExlong := nz(QQExlong[1])
QQExshort = 0
QQExshort := nz(QQExshort[1])
QQExlong := sQQEx and FastAtrRsiTL < RSIndex ? QQExlong + 1 : 0
QQExshort := sQQEx and FastAtrRsiTL > RSIndex ? QQExshort + 1 : 0
// Zero cross
QQEzlong = 0
QQEzlong := nz(QQEzlong[1])
QQEzshort = 0
QQEzshort := nz(QQEzshort[1])
QQEzlong := sQQEz and RSIndex >= 50 ? QQEzlong + 1 : 0
QQEzshort := sQQEz and RSIndex < 50 ? QQEzshort + 1 : 0
//  
// Thresh Hold channel Crosses give the BUY/SELL alerts.
QQEclong = 0
QQEclong := nz(QQEclong[1])
QQEcshort = 0
QQEcshort := nz(QQEcshort[1])
QQEclong := sQQEc and RSIndex > 50 + ThreshHold ? QQEclong + 1 : 0
QQEcshort := sQQEc and RSIndex < 50 - ThreshHold ? QQEcshort + 1 : 0


// // QQE exit from Thresh Hold Channel
// plotshape(sQQEc and QQEclong == 1 ? RsiMa - 50 : na, title='QQE XC Over Channel', style=shape.diamond, location=location.absolute, color=color.new(color.olive, 0), size=size.small, offset=0)
// plotshape(sQQEc and QQEcshort == 1 ? RsiMa - 50 : na, title='QQE XC Under Channel', style=shape.diamond, location=location.absolute, color=color.new(color.red, 0), size=size.small, offset=0)
// // QQE crosses
// plotshape(sQQEx and QQExlong == 1 ? FastAtrRsiTL[1] - 50 : na, title='QQE XQ Cross Over', style=shape.circle, location=location.absolute, color=color.new(color.lime, 0), size=size.small, offset=-1)
// plotshape(sQQEx and QQExshort == 1 ? FastAtrRsiTL[1] - 50 : na, title='QQE XQ Cross Under', style=shape.circle, location=location.absolute, color=color.new(color.blue, 0), size=size.small, offset=-1)
// // Signal crosses zero line
// plotshape(sQQEz and QQEzlong == 1 ? RsiMa - 50 : na, title='QQE XZ Zero Cross Over', style=shape.square, location=location.absolute, color=color.new(color.aqua, 0), size=size.small, offset=0)
// plotshape(sQQEz and QQEzshort == 1 ? RsiMa - 50 : na, title='QQE XZ Zero Cross Under', style=shape.square, location=location.absolute, color=color.new(color.fuchsia, 0), size=size.small, offset=0)

// hcolor = RsiMa - 50 > ThreshHold ? color.green : RsiMa - 50 < 0 - ThreshHold ? color.red : color.orange
// plot(FastAtrRsiTL - 50, color=color.new(color.blue, 0), linewidth=2)
// p1 = plot(RsiMa - 50, color=color.new(color.orange, 0), linewidth=2)
// plot(RsiMa - 50, color=hcolor, style=plot.style_columns, transp=50)


// hZero = hline(0, color=color.black, linestyle=hline.style_dashed, linewidth=1)
// hUpper = hline(ThreshHold, color=color.green, linestyle=hline.style_dashed, linewidth=2)
// hLower = hline(0 - ThreshHold, color=color.red, linestyle=hline.style_dashed, linewidth=2)
// fill(hUpper, hLower, color=color.new(color.gray, 80))
//EOF

length := input.int(title='ATR Length', defval=14, minval=1)
smoothing = input.string(title='ATR Smoothing', defval='RMA', options=['RMA', 'SMA', 'EMA', 'WMA'])
m = input(0.3, 'ATR Multiplier')
src1 = input(high)
src2 = input(low)
pline = input(true, 'Show Price Lines')
col1 = input(color.blue, 'ATR Text Color')
col2 = input.color(color.teal, 'Low Text Color', inline='1')
col3 = input.color(color.red, 'High Text Color', inline='2')

collong = input.color(color.teal, 'Low Line Color', inline='1')
colshort = input.color(color.red, 'High Line Color', inline='2')

ma_function(source, length) =>
    if smoothing == 'RMA'
        ta.rma(source, length)
    else
        if smoothing == 'SMA'
            ta.sma(source, length)
        else
            if smoothing == 'EMA'
                ta.ema(source, length)
            else
                ta.wma(source, length)

a = ma_function(ta.tr(true), length) * m
s_sl = ma_function(ta.tr(true), length) * m + src1
l_sl = src2 - ma_function(ta.tr(true), length) * m

p1 = plot(s_sl, title='ATR Short Stop Loss', color=colshort, trackprice=pline ? true : false, transp=20)
p2 = plot(l_sl, title='ATR Long Stop Loss', color=collong, trackprice=pline ? true : false, transp=20)


bgc = RsiMa - 50 > ThreshHold ? color.green : Rsi - 50 < 0 - ThreshHold ? color.red : color.orange
barcolor(inpDrawBars ? bgc : na)
prebuy = RsiMa - 50 > ThreshHold
buy=prebuy and not(prebuy[1]) and fma > ma

var long_tp=0.0
var long_sl=0.0
var short_tp=0.0
var short_sl=0.0

if prebuy
    strategy.close("Short")



if buy and strategy.position_size<=0
    strategy.entry("Long", strategy.long)
    long_sl:=l_sl
    long_tp:=close+(close-long_sl)*2
    
    
//if strategy.position_size>0
strategy.exit("L_SL","Long",stop=long_sl)
    //strategy.exit("L_SL","Long",stop=long_sl)
// if low<long_sl[1]
//     strategy.close("Long")
    
presell=RsiMa - 50 < 0 - ThreshHold // RsiMa - 50 < 0 - ThreshHold
sell= presell and not(presell[1]) and fma < ma

//plotshape(presell)

if presell
    strategy.close("Long")

if sell and strategy.position_size>=0
    strategy.entry("Short", strategy.short)
    short_sl:=s_sl
    short_tp:=close-(short_sl-close)*2
   
//if strategy.position_size<0
strategy.exit("S_SL","Short",stop=short_sl)
    //strategy.exit("S_SL","Short",stop=short_sl) 


    


```

> Detail

https://www.fmz.com/strategy/440504

> Last Modified

2024-01-31 10:33:21
