
> Name

双重趋势过滤优化策略Dual-Trend-Filtering-Optimization-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e1d7482bf8258a29e2.png)
[trans]
## 概述
该策略利用平均线双重过滤以及추세方向多重确认机制,设计了一个较为稳定的追踪系统。主要由三部分组成:

1. 基于改进型双峰波动跟踪器的优化趋势跟踪系统,确定大趋势方向。

2. 基于多周期均线组合的副趋势过滤系统,进一步过滤掉部分噪音。

3. Alpha指数提供最终确认,确保交易信号的可靠性。

通过上述三重保护,能使策略对大趋势的判断更加准确,对短期市场噪音也有很强的过滤能力。

## 原理
### 主趋势跟踪
使用改进的双峰波动跟踪系统TOTT和Close Series双重趋势过滤计算主要趋势方向。TOTT本身对噪音就有很强的过滤能力。Close Series提供额外层次确认。二者结合,能对大趋势判断非常准确。

### 副趋势过滤
除了主趋势判断系统,策略还设置了基于EMA线组合的多周期副趋势过滤系统。根据EMA均线关系的Golden Cross和Dead Cross许多确认级别,进一步提高对主要趋势方向的判断的可靠性,过滤更多噪音。

### Alpha确认
在进入和平仓时,策略还会检查Alpha指数值,确保最终交易信号的可靠性。Alpha能反映市场买卖力量,是很好的确认指标。

## 优势
- 多重保护设计,对大趋势判断更精准
- 强大的噪音过滤能力
- 交易信号稳定可靠
- 参数优化空间大

## 风险
- 信号生成频率可能偏低
- 追踪系统中运用均线,在市场剧烈变动时可被突破

要降低上述风险,可以调整参数优化追踪系统的灵敏度,或结合更多反转指标作为最终过滤。

## 优化方向 
- 调整双峰波动跟踪系统参数,寻找更佳参数组合
- 尝试不同类型均线的参数优化
- 优化EMA线组合的均线周期
- 更新Alpha过滤机制
- 增加止损机制

## 总结
该策略总体设计思路稳健,措施得当,多重保护和强大的噪音过滤为其赢得了稳定的表现。通过持续的参数优化和机制改进,策略的表现还有进一步提升的空间。

||

## Overview
This strategy uses average double filtering and multi-level trend direction confirmation mechanisms to design a relatively stable tracking system. It consists of three main parts:

1. An optimized trend tracking system based on improved double peak oscillators to determine the major trend direction.  

2. A sub-trend filtering system based on a combination of multiple cycle moving averages to further filter out some noise.

3. The Alpha Index provides final confirmation to ensure reliability of trading signals.

With the triple protection described above, the strategy can judge major trends more accurately and filter short-term market noise very effectively.

## Principle 
### Main Trend Tracking
It uses an improved double peak oscillator TOTT and a Close Series double trend filter to calculate the main trend direction. TOTT itself has very strong filtering capabilities against noise. The Close Series provides an additional level of confirmation. The combination of the two can determine major trends very accurately.

### Subtrend Filtering  
In addition to the main trend judging system, the strategy also sets up a sub-trend filtering system based on EMA combinations of multiple cycles. According to the Golden Cross and Dead Cross confirmation levels of the EMA lines, the reliability of judgments on the main trend direction is further improved and more noise is filtered out.

### Alpha Confirmation
When entering and exiting positions, the strategy also checks the value of the Alpha Index to ensure reliability of final trading signals. Alpha reflects the buying and selling power in the market and is a good confirmation indicator.

## Advantages
- Multi-level protection design for more accurate major trend judgments  
- Powerful noise filtering capability
- Stable and reliable trading signals
- Large parameter optimization space

## Risks
- Signal frequency may be low
- The tracking system uses moving averages, which can be broken in drastic market changes

To mitigate the risks, parameters can be adjusted to optimize tracker sensitivity, or more reversal indicators can be added as final filters.  

## Optimization Directions
- Adjust double peak oscillator parameters to find better parameter combinations
- Try parameter optimization of different moving average types  
- Optimize moving average cycles in EMA combination
- Enhance Alpha filtering mechanism
- Add stop loss mechanism  

## Conclusion
The overall design of this strategy is robust, with proper measures and multiple protections. The powerful noise filtering gives it stable performance. There is room for further improvement through continuous parameter optimization and mechanism enhancements.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|18|OTT Period|
|v_input_float_1|true|Optimization Constant|
|v_input_float_2|0.001|Twin OTT Coefficient|
|v_input_2|true|Show Support Line?|
|v_input_3|true|Show Signals?|
|v_input_string_1|0|Moving Average Type: EMA|SMA|WMA|TMA|VAR|WWMA|ZLEMA|TSF|
|v_input_4|true|Highlighter On/Off ?|
|v_input_5_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|69|OTT Period|
|v_input_float_3|true|Optimization Constant|
|v_input_float_4|0.001|Twin OTT Coefficient|
|v_input_6|true|Show Support Line?|
|v_input_7|true|Show Signals?|
|v_input_string_2|0|Moving Average Type: VAR2|EMA|WMA|TMA|SMA|WWMA|ZLEMA2|TSF2|
|v_input_8|true|Highlighter On/Off ?|
|v_input_9_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|true|Use Alternate Resolution?|
|v_input_11|3|Multiplier for Alernate Resolution|
|v_input_string_3|0|MA Type: : SMMA|EMA|DEMA|TEMA|WMA|VWMA|SMA|HullMA|LSMA|ALMA|SSMA|TMA|
|v_input_int_3|8|MA Period|
|v_input_int_4|6|Offset for LSMA / Sigma for ALMA|
|v_input_float_5|0.85|Offset for ALMA|
|v_input_12|false|Show coloured Bars to indicate Trend?|
|v_input_int_5|false|Delay Open/Close MA (Forces Non-Repainting)|
|v_input_string_4|0|What trades should be taken : : BOTH|SHORT|LONG|NONE|
|v_input_int_6|false|Initial Stop Loss Points (zero to disable)|
|v_input_int_7|false|Initial Target Profit Points (zero for disable)|
|v_input_int_8|10000|Number of Bars for Back Testing|
|v_input_13|false|- SET to ZERO for Daily or Longer Timeframes|
|v_input_float_6|true|Multiplier|
|v_input_14|14|Common Period|
|v_input_15_close|0|src5: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_16|true|Show Signals?|
|v_input_17|false|Change calculation (no volume data)?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-20 00:00:00
end: 2024-02-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © KivancOzbilgic

strategy('TOTT-OCC R5.1 wixca-buy-sell', 'TOTT', overlay=true)
src = input(close, title='Source')
length = input.int(18, 'OTT Period', minval=1)
percent = input.float(1, 'Optimization Constant', step=0.1, minval=0)
coeff1 = input.float(0.001, 'Twin OTT Coefficient', step=0.001, minval=0)
showsupport = input(title='Show Support Line?', defval=true)
showsignalsk1 = input(title='Show Signals?', defval=true)
mav = input.string(title='Moving Average Type', defval='EMA', options=['SMA', 'EMA', 'WMA', 'TMA', 'VAR', 'WWMA', 'ZLEMA', 'TSF'])
highlighting = input(title='Highlighter On/Off ?', defval=true)
Var_Func(src, length) =>
    valpha = 2 / (length + 1)
    vud1 = src > src[1] ? src - src[1] : 0
    vdd1 = src < src[1] ? src[1] - src : 0
    vUD = math.sum(vud1, 9)
    vDD = math.sum(vdd1, 9)
    vCMO = nz((vUD - vDD) / (vUD + vDD))
    VAR = 0.0
    VAR := nz(valpha * math.abs(vCMO) * src) + (1 - valpha * math.abs(vCMO)) * nz(VAR[1])
    VAR
VAR = Var_Func(src, length)
Wwma_Func(src, length) =>
    wwalpha = 1 / length
    WWMA = 0.0
    WWMA := wwalpha * src + (1 - wwalpha) * nz(WWMA[1])
    WWMA
WWMA = Wwma_Func(src, length)
Zlema_Func(src, length) =>
    zxLag = length / 2 == math.round(length / 2) ? length / 2 : (length - 1) / 2
    zxEMAData = src + src - src[zxLag]
    ZLEMA = ta.ema(zxEMAData, length)
    ZLEMA
ZLEMA = Zlema_Func(src, length)
Tsf_Func(src, length) =>
    lrc = ta.linreg(src, length, 0)
    lrc1 = ta.linreg(src, length, 1)
    lrs = lrc - lrc1
    TSF = ta.linreg(src, length, 0) + lrs
    TSF
TSF = Tsf_Func(src, length)
getMA(src, length) =>
    ma = 0.0
    if mav == 'SMA'
        ma := ta.sma(src, length)
        ma

    if mav == 'EMA'
        ma := ta.ema(src, length)
        ma

    if mav == 'WMA'
        ma := ta.wma(src, length)
        ma

    if mav == 'TMA'
        ma := ta.sma(ta.sma(src, math.ceil(length / 2)), math.floor(length / 2) + 1)
        ma

    if mav == 'VAR'
        ma := VAR
        ma

    if mav == 'WWMA'
        ma := WWMA
        ma

    if mav == 'ZLEMA'
        ma := ZLEMA
        ma

    if mav == 'TSF'
        ma := TSF
        ma
    ma

MAvg = getMA(src, length)
fark = MAvg * percent * 0.01
longStop = MAvg - fark
longStopPrev = nz(longStop[1], longStop)
longStop := MAvg > longStopPrev ? math.max(longStop, longStopPrev) : longStop
shortStop = MAvg + fark
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := MAvg < shortStopPrev ? math.min(shortStop, shortStopPrev) : shortStop
dir = 1
dir := nz(dir[1], dir)
dir := dir == -1 and MAvg > shortStopPrev ? 1 : dir == 1 and MAvg < longStopPrev ? -1 : dir
MT = dir == 1 ? longStop : shortStop
OTT = MAvg > MT ? MT * (200 + percent) / 200 : MT * (200 - percent) / 200
OTTup = OTT * (1 + coeff1)
OTTdn = OTT * (1 - coeff1)

PPLOT = plot(showsupport ? MAvg : na, color=color.new(#0585E1, 0), linewidth=2, title='Support Line')

pALLup = plot(nz(OTTup[2]), color=color.new(color.green, 0), linewidth=2, title='OTTup')
pALLdn = plot(nz(OTTdn[2]), color=color.new(color.red, 0), linewidth=2, title='OTTdown')

buySignalk1 = ta.crossover(MAvg, OTTup[2])
sellSignalk1 = ta.crossunder(MAvg, OTTdn[2])
K11 = ta.barssince(buySignalk1)
K22 = ta.barssince(sellSignalk1)
O11 = ta.barssince(buySignalk1[1])
O22 = ta.barssince(sellSignalk1[1])


//plotshape(buySignalk1 and showsignalsk1 and O11 > K22 ? math.min(low, OTTdn) : na, title='Buy', text='Buy', location=location.absolute, style=shape.labelup, size=size.tiny, color=color.new(color.green, 0), textcolor=color.new(color.white, 0))
//plotshape(sellSignalk1 and showsignalsk1 and O22 > K11 ? math.max(high, OTTup) : na, title='Sell', text='Sell', location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.new(color.red, 0), textcolor=color.new(color.white, 0))
mPlot = plot(ohlc4, title='', style=plot.style_circles, linewidth=0, display=display.none)
//longFillColor = highlighting ? O22 > K11 ? color.green : na : na
//shortFillColor = highlighting ? O11 > K22 ? color.red : na : na
//fill(mPlot, PPLOT, title='UpTrend Highligter', color=longFillColor, transp=90)
//fill(mPlot, PPLOT, title='DownTrend Highligter', color=shortFillColor, transp=90)
fill(pALLup, pALLdn, title='Flat Zone Highligter', color=color.new(#e0e2e9, 12))

//plotshape(ta.crossover (AlphaTrend,OTTup), style=shape.labelup, location=location.belowbar, color=color.new(color.blue, 0), size=size.tiny, title='AT>OTT', text='AL1', textcolor=color.white)
//plotshape(ta.crossunder(AlphaTrend,OTTdn), style=shape.labeldown, location=location.abovebar, color=color.new(color.red, 0), size=size.tiny, title='OTT<AT', text='SAT1', textcolor=color.white)

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
//© vixca

//@version=5

//indicator('L&S', overlay=true)  //pyramiding=1, initial_capital=1000,default_qty_type = strategy.cash, calc_on_order_fills=false,default_qty_value = 1000, commission_type=strategy.commission.percent, commission_value=0.2,calc_on_every_tick=true)


//strategy('Twin Optimized Trend Tracker', 'TOTT', overlay=true)
src2 = input(close, title='Source')
length2 = input.int(69, 'OTT Period', minval=1)
percent2 = input.float(1, 'Optimization Constant', step=0.1, minval=0)
coeff2 = input.float(0.001, 'Twin OTT Coefficient', step=0.001, minval=0)
showsupport2 = input(title='Show Support Line?', defval=true)
showsignalsk2 = input(title='Show Signals?', defval=true)
mav2 = input.string(title='Moving Average Type', defval='VAR2', options=['SMA', 'EMA', 'WMA', 'TMA', 'VAR2', 'WWMA', 'ZLEMA2', 'TSF2'])
highlighting2 = input(title='Highlighter On/Off ?', defval=true)
Var_Func2(src2, length2) =>
    valpha = 2 / (length2 + 1)
    vud1 = src2 > src2[1] ? src2 - src2[1] : 0
    vdd1 = src2 < src2[1] ? src2[1] - src2 : 0
    vUD = math.sum(vud1, 9)
    vDD = math.sum(vdd1, 9)
    vCMO = nz((vUD - vDD) / (vUD + vDD))
    VAR2 = 0.0
    VAR2 := nz(valpha * math.abs(vCMO) * src2) + (1 - valpha * math.abs(vCMO)) * nz(VAR2[1])
    VAR2
VAR2 = Var_Func2(src2, length2)
Wwma_Func2(src2, length) =>
    wwalpha = 1 / length2
    WWMA2 = 0.0
    WWMA2 := wwalpha * src2 + (1 - wwalpha) * nz(WWMA2[1])
    WWMA2
WWMA2 = Wwma_Func2(src2, length2)
Zlema_Func2(src2, length) =>
    zxLag = length2 / 2 == math.round(length2 / 2) ? length2 / 2 : (length2 - 1) / 2
    zxEMAData = src2 + src2 - src2[zxLag]
    ZLEMA2 = ta.ema(zxEMAData, length2)
    ZLEMA2
ZLEMA2 = Zlema_Func2(src2, length2)
Tsf_Func2(src2, length2) =>
    lrc = ta.linreg(src2, length2, 0)
    lrc1 = ta.linreg(src2, length2, 1)
    lrs = lrc - lrc1
    TSF2 = ta.linreg(src2, length2, 0) + lrs
    TSF2
TSF2 = Tsf_Func2(src2, length2)
getMA2(src2, length2) =>
    ma = 0.0
    if mav2 == 'SMA'
        ma := ta.sma(src2, length2)
        ma

    if mav2 == 'EMA'
        ma := ta.ema(src2, length2)
        ma

    if mav2 == 'WMA'
        ma := ta.wma(src2, length2)
        ma

    if mav2 == 'TMA'
        ma := ta.sma(ta.sma(src2, math.ceil(length2 / 2)), math.floor(length2 / 2) + 1)
        ma

    if mav2 == 'VAR2'
        ma := VAR2
        ma

    if mav2 == 'WWMA2'
        ma := WWMA2
        ma

    if mav2 == 'ZLEMA2'
        ma := ZLEMA2
        ma

    if mav2 == 'TSF2'
        ma := TSF2
        ma
    ma

mav2g = getMA2(src2, length2)
fark2 = mav2g * percent2 * 0.01
longStop2 = mav2g - fark2
longStop2Prev = nz(longStop2[1], longStop2)
longStop2 := mav2g > longStop2Prev ? math.max(longStop2, longStop2Prev) : longStop2
shortStop2 = mav2g + fark2
shortStop2Prev = nz(shortStop2[1], shortStop2)
shortStop2 := mav2g < shortStop2Prev ? math.min(shortStop2, shortStop2Prev) : shortStop2
dir2 = 1
dir2 := nz(dir2[1], dir2)
dir2 := dir2 == -1 and mav2g > shortStop2Prev ? 1 : dir2 == 1 and mav2g < longStop2Prev ? -1 : dir2
MT2 = dir2 == 1 ? longStop2 : shortStop2
OTT2 = mav2g > MT2 ? MT2 * (200 + percent2) / 200 : MT * (200 - percent) / 200
OTT2up = OTT2 * (1 + coeff2)
OTT2dn = OTT2 * (1 - coeff2)

PPLOT2 = plot(showsupport2 ? mav2g : na, color=color.new(#0585E1, 0), linewidth=2, title='Support Line')

pALLup2 = plot(nz(OTT2up[2]), color=color.new(color.green, 0), linewidth=2, title='OTT2up')
pALLdn2 = plot(nz(OTT2dn[2]), color=color.new(color.red, 0), linewidth=2, title='OTT2down')

buySignalk2 = ta.crossover(mav2g, OTT2up[2])
sellSignalk2 = ta.crossunder(mav2g, OTT2dn[2])
K111 = ta.barssince(buySignalk2)
K222 = ta.barssince(sellSignalk2)
O111 = ta.barssince(buySignalk2[1])
O222 = ta.barssince(sellSignalk2[1])

//plotshape(buySignalk2 and showsignalsk2 and O111 > K222 ? math.min(low, OTT2dn) : na, title='Buy2', text='Buy2', location=location.absolute, style=shape.labelup, size=size.tiny, color=color.new(color.green, 0), textcolor=color.new(color.white, 0))
//plotshape(sellSignalk2 and showsignalsk2 and O222 > K111 ? math.max(high, OTT2up) : na, title='Sell2', text='Sell2', location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.new(color.red, 0), textcolor=color.new(color.white, 0))
mPlot2 = plot(ohlc4, title='', style=plot.style_circles, linewidth=0, display=display.none)
longFillColor2 = highlighting2 ? O222 > K111 ? color.green : na : na
shortFillColor2 = highlighting2 ? O111 > K222 ? color.red : na : na
//fill(mPlot2, PPLOT2, title='UpTrend Highligter', color=longFillColor2, transp=90)
//fill(mPlot2, PPLOT2, title='DownTrend Highligter', color=shortFillColor2, transp=90)
fill(pALLup2, pALLdn2, title='Flat Zone Highligter', color=color.new(#9d7fce, 33))


//ema kesişimi yapmak için ekledim
//wma34 = ta.wma(close, 34)
//ema1 = ta.ema(close, 900)
src4 = input(title='Source', defval=close)
//length3 = input(34, 'wma')
//lenght4 = input(1000, "ema")
//plot(ta.wma(src4, length3), color=color.new(#dbbce0, 0), linewidth=3, title='wma34')
//plot(ta.ema(src4, lenght4), color=color.new(#080c05, 0), linewidth=3, title='ema1')

//plotshape(ta.crossover (close[3],ta.ema(close, 900))and (close > ta.ema(close,900)), style=shape.labelup, location=location.belowbar, color=color.new(#21f356, 0), size=size.tiny, title='Longtrend', text='LT', textcolor=color.white)
//plotshape(ta.crossunder (close[3],ta.ema(close, 900)) and (close < ta.ema(close,900)), style=shape.labeldown, location=location.abovebar, color=color.new(#a7510b, 0), size=size.tiny, title='Shorttrend', text='ST', textcolor=color.white)


//long_signal = ta.crossover (close,OTT2up) and (close [3] > OTT2up)  // and ta.crossover (AlphaTrend,OTTup)  //and ta.crossover(ta.ema(close, 5), ta.ema(close, 21))
//short_signal = ta.crossunder (close,OTTdn) and (close[3] < OTTdn) // and ta.crossunder (AlphaTrend,OTTdn) //and ta.crossunder(ta.ema(close,5), ta.ema(close, 21))
//long_signal1 = ta.crossover(mav2g,OTT2up[2]) 
//short_signal1 = ta.crossunder(mav2g, OTT2dn[2])


//plotshape(long_signal, style=shape.labelup, location=location.belowbar, color=color.new(color.blue, 0), size=size.tiny, title='wixcaAL', text='wixAL', textcolor=color.white)
//plotshape(short_signal, style=shape.labeldown, location=location.abovebar, color=color.new(color.red, 0), size=size.tiny, title='wixcaSAT', text='wixSAT', textcolor=color.white)

//strategy.entry('Long', strategy.long, when=long_signal)
//strategy.entry('Short', strategy.short, when=short_signal)

//plotshape(buySignalk1 and showsignalsk1 and O11 > K22 ? math.min(low, OTTdn) : na, title='Buy', text='Buy', location=location.absolute, style=shape.labelup, size=size.tiny, color=color.new(color.green, 0), textcolor=color.new(color.white, 0))

//@version=5
//indicator("EMA5 Strategy with Sequential Labels", overlay=true)

// EMA hesaplama
//emaLength = 21
//ema21 = ta.ema(close, emaLength)

// Mum kapanışı EMA5'in altında ise short aç
//shortCondition = close < ema21

// Mum kapanışı EMA5'in üstündeyse long aç
//longCondition = close > ema21

// Sinyal sayacı
//var int signalCount = 0

// Ticaret sinyallerini plot et ve ardışık numaralandırma
//plotshape(series=shortCondition, title="Short Signal", color=color.red, style=shape.triangledown, location=location.abovebar) //text = string(signalCount + 1))
//plotshape(series=longCondition, title="Long Signal", color=color.green, style=shape.triangleup, location=location.belowbar)//, text = str.tostring(signalCount + 2))

// Sinyal sayacını güncelle
//if (shortCondition or longCondition)
 //   signalCount := signalCount + 2

//
//@version=5
//

//strategy(title='Open Close Cross Strategy R5.1 revised by JustUncleL', shorttitle='OCC Strategy R5.1', overlay=true, pyramiding=0, default_qty_type=strategy.percent_of_equity, default_qty_value=10, calc_on_every_tick=false)

//
// Revision:        5
// Original Author: @JayRogers
// Revision Author: JustUncleL revisions 3, 4, 5
//
// *** USE AT YOUR OWN RISK ***
//  - There are drawing/painting issues in pinescript when working across resolutions/timeframes that I simply
//    cannot fix here.. I will not be putting any further effort into developing this until such a time when
//    workarounds become available. 
//    NOTE: Re-painting has been observed infrequently with default settings and seems OK up to Alternate 
//          multiplier of 5.
//          Non-repainting mode is available by setting "Delay Open/Close MA" to 1 or more, but the reported
//          performance will drop dramatically.
//
// R5.1 Changes by JustUncleL
//  - Upgraded to Version 3 Pinescript.
//  - Added option to select Trade type (Long, Short, Both or None)
//  - Added bar colouring work around patch.
//  - Small code changes to improve efficiency.
//  - NOTE: To enable non-Repainting mode set "Delay Open/Close MA" to 1 or more.
//  9-Aug-2017
//  - Correction on SuperSmooth MA calculation.
//
// R5 Changes by JustUncleL
//  - Corrected cross over calculations, sometimes gave false signals.
//  - Corrected Alternate Time calculation to allow for Daily,Weekly and Monthly charts.
//  - Open Public release.
// R4 Changes By JustUncleL
//  - Change the way the Alternate resolution in selected, use a Multiplier of the base Time Frame instead,
//    this makes it easy to switch between base time frames.
//  - Added TMA and SSMA moving average options. But DEMA is still giving the best results.
//  - Using "calc_on_every_tick=false" ensures results between backtesting and real time are similar.
//  - Added Option to Disable the coloring of the bars.
//  - Updated default settings.
//
// R3 Changes by JustUncleL:
//  - Returned a simplified version of the open/close channel, it shows strength of current trend.
//  - Added Target Profit Option.
//  - Added option to reduce the number of historical bars, overcomes the too many trades limit error.
//  - Simplified the strategy code.
//  - Removed Trailing Stop option, not required and in my opion does not work well in Trading View,
//    it also gives false and unrealistic performance results in backtesting.
//
// R2 Changes:
//  - Simplified and cleaned up plotting, now just shows a Moving Average derived from the average of open/close.
//  - Tried very hard to alleviate painting issues caused by referencing alternate resolution..
//
// Description:
//  - Strategy based around Open-Close Crossovers.
// Setup:
//  - I have generally found that setting the strategy resolution to 3-4x that of the chart you are viewing
//    tends to yield the best results, regardless of which MA option you may choose (if any) BUT can cause
//    a lot of false positives - be aware of this
//  - Don't aim for perfection. Just aim to get a reasonably snug fit with the O-C band, with good runs of
//    green and red.
//  - Option to either use basic open and close series data, or pick your poison with a wide array of MA types.
//  - Optional trailing stop for damage mitigation if desired (can be toggled on/off)
//  - Positions get taken automagically following a crossover - which is why it's better to set the resolution
//    of the script greater than that of your chart, so that the trades get taken sooner rather than later.
//  - If you make use of the stops, be sure to take your time tweaking the values. Cutting it too fine
//    will cost you profits but keep you safer, while letting them loose could lead to more drawdown than you
//    can handle.
//  - To enable non-Repainting mode set "Delay Open/Close MA" to 1 or more.
//

// === INPUTS ===
useRes = input(defval=true, title='Use Alternate Resolution?')
intRes = input(defval=3, title='Multiplier for Alernate Resolution')
stratRes = timeframe.ismonthly ? str.tostring(timeframe.multiplier * intRes, '###M') : timeframe.isweekly ? str.tostring(timeframe.multiplier * intRes, '###W') : timeframe.isdaily ? str.tostring(timeframe.multiplier * intRes, '###D') : timeframe.isintraday ? str.tostring(timeframe.multiplier * intRes, '####') : '60'
basisType = input.string(defval='SMMA', title='MA Type: ', options=['SMA', 'EMA', 'DEMA', 'TEMA', 'WMA', 'VWMA', 'SMMA', 'HullMA', 'LSMA', 'ALMA', 'SSMA', 'TMA'])
basisLen = input.int(defval=8, title='MA Period', minval=1)
offsetSigma = input.int(defval=6, title='Offset for LSMA / Sigma for ALMA', minval=0)
offsetALMA = input.float(defval=0.85, title='Offset for ALMA', minval=0, step=0.01)
scolor = input(false, title='Show coloured Bars to indicate Trend?')
delayOffset = input.int(defval=0, title='Delay Open/Close MA (Forces Non-Repainting)', minval=0, step=1)
tradeType = input.string('BOTH', title='What trades should be taken : ', options=['LONG', 'SHORT', 'BOTH', 'NONE'])
// === /INPUTS ===

// Constants colours that include fully non-transparent option.
green100 = #008000FF
lime100 = #00FF00FF
red100 = #FF0000FF
blue100 = #0000FFFF
aqua100 = #00FFFFFF
darkred100 = #8B0000FF
gray100 = #808080FF

// === BASE FUNCTIONS ===
// Returns MA input selection variant, default to SMA if blank or typo.
variant(type, src, len, offSig, offALMA) =>
    v1 = ta.sma(src, len)  // Simple
    v2 = ta.ema(src, len)  // Exponential
    v3 = 2 * v2 - ta.ema(v2, len)  // Double Exponential
    v4 = 3 * (v2 - ta.ema(v2, len)) + ta.ema(ta.ema(v2, len), len)  // Triple Exponential
    v5 = ta.wma(src, len)  // Weighted
    v6 = ta.vwma(src, len)  // Volume Weighted
    v7 = 0.0
    sma_1 = ta.sma(src, len)  // Smoothed
    v7 := na(v7[1]) ? sma_1 : (v7[1] * (len - 1) + src) / len
    v8 = ta.wma(2 * ta.wma(src, len / 2) - ta.wma(src, len), math.round(math.sqrt(len)))  // Hull
    v9 = ta.linreg(src, len, offSig)  // Least Squares
    v10 = ta.alma(src, len, offALMA, offSig)  // Arnaud Legoux
    v11 = ta.sma(v1, len)  // Triangular (extreme smooth)
    // SuperSmoother filter
    // © 2013  John F. Ehlers
    a1 = math.exp(-1.414 * 3.14159 / len)
    b1 = 2 * a1 * math.cos(1.414 * 3.14159 / len)
    c2 = b1
    c3 = -a1 * a1
    c1 = 1 - c2 - c3
    v12 = 0.0
    v12 := c1 * (src + nz(src[1])) / 2 + c2 * nz(v12[1]) + c3 * nz(v12[2])
    type == 'EMA' ? v2 : type == 'DEMA' ? v3 : type == 'TEMA' ? v4 : type == 'WMA' ? v5 : type == 'VWMA' ? v6 : type == 'SMMA' ? v7 : type == 'HullMA' ? v8 : type == 'LSMA' ? v9 : type == 'ALMA' ? v10 : type == 'TMA' ? v11 : type == 'SSMA' ? v12 : v1

// security wrapper for repeat calls
reso(exp, use, res) =>
    security_1 = request.security(syminfo.tickerid, res, exp, gaps=barmerge.gaps_off, lookahead=barmerge.lookahead_on)
    use ? security_1 : exp

// === /BASE FUNCTIONS ===

// === SERIES SETUP ===
closeSeries = variant(basisType, close[delayOffset], basisLen, offsetSigma, offsetALMA)
openSeries = variant(basisType, open[delayOffset], basisLen, offsetSigma, offsetALMA)
// === /SERIES ===

// === PLOTTING ===

// Get Alternate resolution Series if selected.
closeSeriesAlt = reso(closeSeries, useRes, stratRes)
openSeriesAlt = reso(openSeries, useRes, stratRes)
//
trendColour = closeSeriesAlt > openSeriesAlt ? color.rgb(148, 106, 226) : color.rgb(146, 80, 80, 62)
bcolour = closeSeries > openSeriesAlt ? lime100 : red100
barcolor(scolor ? bcolour : na, title='Bar Colours')
closeP = plot(closeSeriesAlt, title='Close Series', color=trendColour, linewidth=2, style=plot.style_line, transp=20)
openP = plot(openSeriesAlt, title='Open Series', color=trendColour, linewidth=2, style=plot.style_line, transp=20)
fill(closeP, openP, color=trendColour, transp=80)

// === /PLOTTING ===

// === ALERT conditions
xlong = ta.crossover(closeSeriesAlt, openSeriesAlt)
xshort = ta.crossunder(closeSeriesAlt, openSeriesAlt)
longCond = xlong  // alternative: longCond[1]? false : (xlong or xlong[1]) and close>closeSeriesAlt and close>=open
shortCond = xshort  // alternative: shortCond[1]? false : (xshort or xshort[1]) and close<closeSeriesAlt and close<=open
// === /ALERT conditions.

// === STRATEGY ===
// stop loss
slPoints = input.int(defval=0, title='Initial Stop Loss Points (zero to disable)', minval=0)
tpPoints = input.int(defval=0, title='Initial Target Profit Points (zero for disable)', minval=0)
// Include bar limiting algorithm
ebar = input.int(defval=10000, title='Number of Bars for Back Testing', minval=0)
dummy = input(false, title='- SET to ZERO for Daily or Longer Timeframes')
//
// Calculate how many mars since last bar
tdays = (timenow - time) / 60000.0  // number of minutes since last bar
tdays := timeframe.ismonthly ? tdays / 1440.0 / 5.0 / 4.3 / timeframe.multiplier : timeframe.isweekly ? tdays / 1440.0 / 5.0 / timeframe.multiplier : timeframe.isdaily ? tdays / 1440.0 / timeframe.multiplier : tdays / timeframe.multiplier  // number of bars since last bar
//
//set up exit parameters
TP = tpPoints > 0 ? tpPoints : na
SL = slPoints > 0 ? slPoints : na

// Make sure we are within the bar range, Set up entries and exit conditions
//if (ebar == 0 or tdays <= ebar) and tradeType != 'NONE'
//    strategy.entry('long', strategy.long, when=longCond == true and tradeType != 'SHORT')
//    strategy.entry('short', strategy.short, when=shortCond == true and tradeType != 'LONG')
//    strategy.close('long', when=shortCond == true and tradeType == 'LONG')
//    strategy.close('short', when=longCond == true and tradeType == 'SHORT')
//    strategy.exit('XL', from_entry='long', profit=TP, loss=SL)
//    strategy.exit('XS', from_entry='short', profit=TP, loss=SL)

// === /STRATEGY ===
// eof

line1=ta.ema (close, 5)
line2=ta.ema(close, 20)
line3=ta.ema(close, 13)
trendColour1= line1 >= line2 ? color.rgb(108, 187, 110) : color.rgb(204, 87, 87)
p1 = plot(line1, title="ema5", color=#3179f5, linewidth=3)
p2 = plot(line2, title="ema20", color=#18c71d, linewidth=3)
fill(p1, p2, title = "5-20 Background", color = trendColour1, transp=80)

//length6 = input(50, 'sma1')
//plot(ta.sma(src4, length6), color=color.new(color.lime, 0), linewidth=3, title='sma50')

//length7 = input(200, 'sma2')
//plot(ta.sma(src4, length7), color=color.new(color.olive, 0), linewidth=3, title='sma200')

//length8 = input(900, 'ema3')
//plot(ta.ema(src4, length8), color=color.new(color.teal, 0), linewidth=3, title='ema900')

//longCondition =long
//if longCondition
//    strategy.entry("Long", strategy.long)

//shortCondition = short 
//if shortCondition
  //  strategy.entry("Short", strategy.short)

//if (ebar == 0 or tdays <= ebar) and tradeType != 'NONE'
  //  strategy.entry('long', strategy.long, when=longCond == true and tradeType != 'SHORT')
   // strategy.entry('short', strategy.short, when=shortCond == true and tradeType != 'LONG')
    //strategy.close('long', when=shortCond == true and tradeType == 'LONG')
    //strategy.close('short', when=longCond == true and tradeType == 'SHORT')
    //strategy.exit('XL', from_entry='long', profit=TP, loss=SL)
    //strategy.exit('XS', from_entry='short', profit=TP, loss=SL)

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// author © KivancOzbilgic
// developer © KivancOzbilgic
//@version=5
//indicator('AlphaTrend', shorttitle='AT', overlay=true, format=format.price, precision=2, timeframe='')
coeff = input.float(1, 'Multiplier', step=0.1)
AP = input(14, 'Common Period')
ATR = ta.sma(ta.tr, AP)
src5 = input(close)
showsignalsk = input(title='Show Signals?', defval=true)
novolumedata = input(title='Change calculation (no volume data)?', defval=false)
upT = low - ATR * coeff
downT = high + ATR * coeff
AlphaTrend = 0.0
AlphaTrend := (novolumedata ? ta.rsi(src5, AP) >= 50 : ta.mfi(hlc3, AP) >= 50) ? upT < nz(AlphaTrend[1]) ? nz(AlphaTrend[1]) : upT : downT > nz(AlphaTrend[1]) ? nz(AlphaTrend[1]) : downT

color1 = AlphaTrend > AlphaTrend[2] ? #00E60F : AlphaTrend < AlphaTrend[2] ? #80000B : AlphaTrend[1] > AlphaTrend[3] ? #00E60F : #80000B
k1 = plot(AlphaTrend, color=color.new(#0022FC, 0), linewidth=3)
k2 = plot(AlphaTrend[2], color=color.new(#FC0400, 0), linewidth=3)

fill(k1, k2, color=color1)

buySignalk = ta.crossover(AlphaTrend, AlphaTrend[2])
sellSignalk = ta.crossunder(AlphaTrend, AlphaTrend[2])


K1 = ta.barssince(buySignalk)
K2 = ta.barssince(sellSignalk)
O1 = ta.barssince(buySignalk[1])
O2 = ta.barssince(sellSignalk[1])

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © vixca

//@version=5
//indicator('EMA Strategy', overlay=true)

// EMA values
ema5 = ta.ema(close, 5)
ema20 = ta.ema(close, 20)
ema50 = ta.ema(close, 50)
ema200 = ta.ema(close, 200)
ema900 = ta.ema(close, 900)

// Plot EMA lines
//plot(ema5, color=color.new(color.blue, 0), linewidth=2)
//plot(ema20, color=color.new(color.orange, 0), linewidth=2)
plot(ema50, color=color.new(color.green, 0), linewidth=2)
plot(ema200, title="ema200", color=color.new(color.red, 0), linewidth=3)
plot(ema900, title="ema900", color=color.new(color.purple, 0), linewidth=4)

// Long condition
//longCondition = ema5 > ema20 and ema50 > ema200 and close > ema900

// Short condition
//shortCondition = ema5 < ema20 and ema50 < ema200 and close < ema900

// Plot signals
//plotshape(longCondition, style=shape.triangleup, location=location.belowbar, color=color.new(color.green, 0), size=size.large)
//plotshape(shortCondition, style=shape.triangledown, location=location.abovebar, color=color.new(color.red, 0), size=size.large)

//plotshape(long, style=shape.labelup, location=location.belowbar, color=color.new(#21f356, 0), size=size.tiny, title='Longtrend', text='Lt', textcolor=color.white)
//plotshape(short, style=shape.labeldown, location=location.abovebar, color=color.new(#a7510b, 0), size=size.tiny, title='Shorttrend', text='St', textcolor=color.white)

// Güçlü al ve güçlü sat koşulları
//strongBuy = longCondition and long
//strongSell = shortCondition and short

// Güçlü al ve güçlü sat sinyalleri 3 mum sonrada doğru mu?
//strongBuy = longCondition and long and close[3] > close[0]
//strongSell = shortCondition and short and close[3] < close[0]

// Güçlü al ve güçlü sat sinyallerini çiz
//plotshape(strongBuy, style=shape.circle, location=location.belowbar, color=color.new(color.blue, 0), size=size.large, title='Strong Buy', text='B', textcolor=color.white)
//plotshape(strongSell, style=shape.xcross, location=location.abovebar, color=color.new(color.black, 0), size=size.large, title='Strong Sell', text='S', textcolor=color.white)

//plotshape(strongBuy, style=shape.labelup, location=location.belowbar, color=color.new(#21f356, 0), size=size.tiny, title='Strong Buy', text='B', textcolor=color.white)
//plotshape(strongSell, style=shape.labeldown, location=location.abovebar, color=color.new(#a7510b, 0), size=size.tiny, title='Strong Sell', text='S', textcolor=color.white)

long = ema5 > ema20  and close > OTT2up and close[1] > OTT2up[1] and close > OTTup and close[1] > OTTup[1] and close > AlphaTrend and close[1] > AlphaTrend[1] and low > OTTup and low[1] > OTTup[1] and close > openSeriesAlt and close[1] > openSeriesAlt[1]// and  and low[1] > OTT2up and low[2] > ema50[2] and low[2] > OTT2up//and AlphaTrend > OTT2up and close > ema50
short = ema5 < ema20 and close < OTT2dn and close[1] < OTT2dn[1] and close < OTTdn and close[1] < OTTdn[1] and close < AlphaTrend and close[1] < AlphaTrend[1] and high < OTTdn and high[1] < OTTdn[1] and close < closeSeriesAlt and close[1] < closeSeriesAlt[1]//] and high [1] < OTT2dn and high [2] < ema50[2] and high [2] < OTT2dn//and AlphaTrend < OTTdn and close < ema50

//close > ema50 and close[1] > ema50[1] and close[2] > ema50[2]

// longShortCond şartını çiz
//plotshape(long, style=shape.labelup, location=location.belowbar, color=color.new(#21f356, 0), size=size.tiny, title='Long Condition', text='L', textcolor=color.white)
//plotshape(short, style=shape.labeldown, location=location.abovebar, color=color.new(#a7510b, 0), size=size.tiny, title='Short Condition', text='S', textcolor=color.white)

// Pozisyon açma ve kapatma sinyallerini belirleyin
buy = long and not long[1]
sell = short and not short[1]
close_long = short and not short[1]
close_short = long and not long[1]

// Sinyalleri grafiğe işaretleyin
plotshape(buy,style=shape.labelup, location=location.belowbar, color=color.new(#21f356, 0), size=size.tiny, title='Long Condition', text='L', textcolor=color.white)
plotshape(sell, style=shape.labeldown, location=location.abovebar, color=color.new(#a7510b, 0), size=size.tiny, title='Short Condition', text='S', textcolor=color.white)
//plotshape(close_long, style=shape.xcross, location=location.abovebar, color=color.green, text="Close Long")
//plotshape(close_short, style=shape.xcross, location=location.belowbar, color=color.red, text="Close Short")

// Sinyalleri stratejiye uygulayın
strategy.entry("Long", strategy.long, when=buy)
strategy.entry("Short", strategy.short, when=sell)
strategy.close("Long", when=close_long)
strategy.close("Short", when=close_short)
```

> Detail

https://www.fmz.com/strategy/442932

> Last Modified

2024-02-27 14:46:32
