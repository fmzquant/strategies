
> Name

范围突破动量跟踪策略Range-Breakout-Momentum-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 策略原理

该策略融合了范围指标、动量指标和趋势跟踪来捕捉短期走势。策略具体规则如下:

1. 计算一定周期内的价格范围(高点和低点之差)并平滑处理,得到平滑范围指标。该指标能判断价格走势的扩张和收缩。

2. 计算一定周期内的动量指标,如Hull曲线。Hull曲线在判断短期趋势方向和强弱上具有很好的效果。 

3. 当平滑范围指标颜色变化(如从红变绿),表示范围开始扩大,并配合Hull曲线同向(如Hull曲线向上),则做多入场。

4. 当平滑范围指标颜色变化(如从绿变红),表示范围开始收缩,并配合Hull曲线同向(如Hull曲线向下),则做空入场。 

5. 加入趋势跟踪止损机制,例如Hull曲线回落则止损出场。

通过范围指标判断走势扩张,动量指标判断方向,能快速捕捉短期趋势机会。跟踪止损来控制风险。

## 策略优势

- 结合多种指标,综合判断市场走势
- 范围指标判断扩张点位,动量指标判断方向
- 快速定位短线机会,实现资金快速周转

## 策略风险

- 容易被套,需要及时止损
- 过于频繁交易,交易成本可能较高  
- 针对短线行情,在长期横盘中效果不佳

## 总结

该策略综合运用多种技术指标,旨在快速抓取短线趋势机会。相比长线策略,其操作频率更高,可捕捉短期价格波动。但需要严格的止损机制以控制风险。


||

## Strategy Logic

This strategy combines range, momentum and trend-following indicators to capture short-term trends. The rules are:

1. Calculate the price range over a period (high minus low) and smooth it to get a smooth range indicator. This measures trend strength.

2. Compute a momentum indicator like the Hull curve over a timeframe. The Hull curve is effective in gauging short-term trend direction and strength.

3. When the smoothed range indicator changes color (e.g. red to green), it signals expanding range, and a long entry is taken if the Hull curve aligns (e.g. pointing up). 

4. When the smoothed range flips color (e.g. green to red), it signals contracting range, and a short entry if taken if the Hull curve aligns (e.g. pointing down).

5. Add a trend-following stop loss mechanism like exiting longs if the Hull curve turns down. 

Expanding ranges with directional momentum allows fast capturing of short-term trends. Trend-following stops control risk.

## Advantages

- Combines multiple indicators for robust signals 
- Range measures expansion, momentum gives direction
- Quickly capitalizes on short-term opportunities

## Risks  

- Prone to getting trapped, need timely stops
- Higher trade frequency means more costs
- Less effective in long sideways ranges

## Summary

This strategy uses multiple technical indicators to quickly capitalize on short-term trends. Compared to long-term strategies, it trades more frequently to capture price swings. Strict stops are required to control risks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_4|55|Length(180-200 for floating S/R , 55 for swing entry)|
|v_input_int_3|21|BB Period|
|v_input_float_2|true|BB Deviations|
|v_input_bool_1|true|ATR Filter|
|v_input_int_4|5|ATR Period|
|v_input_bool_2|false|Hide Labels|
|v_input_color_1|green|(?Color)Range Filter Color Up|
|v_input_color_2|red|Range Filter Color Up|
|v_input_color_3|green|Hull Color Up|
|v_input_color_4|red|Hull Color Up|
|v_input_color_5|green|Follow Line Color Up|
|v_input_color_6|red|Follow Line Color Up|
|v_input_1_ohlc4|0|(?Range Filter)Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_int_1|33|Sampling Period|
|v_input_float_1|2.1|Range Multiplier|
|v_input_2_close|0|(?Hull Suite)Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|0|Hull Variation: Ehma|Thma|Hma|
|v_input_5|true|Color Hull according to trend?|
|v_input_6|true|Show as a Band?|
|v_input_7|true|Line Thickness|
|v_input_int_2|40|Band Transparency|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-04-30 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © flygalaxies

// Strategy based on the Follow Line Indicator by Dreadblitz, Hull Suite by InSilico and Range Filter Buy and Sell 5 min by guikroth
// Designed for the purpose of back testing
// Strategy:
//  - When the Range Filter Color Changes, And the HULL Suite is in that direction, Enter In that direction
//  - e.g Range Filter Changes color from red to green, and Hull Suite is in Green. Enter Long
//  - e.g Range Filter Changes color from green to red, and Hull Suite is in red. Enter Short
//
// Credits:
// Hull Suite by InSilico  https://www.tradingview.com/u/InSilico/
// Range Filter Buy and Sell 5 min https://www.tradingview.com/u/guikroth/
// Follow Line Indicator by Dreadblitz https://www.tradingview.com/u/Dreadblitz/
// Follow line not used at this moment

//@version=5
strategy("Follow The Ranging Hull", overlay=true, initial_capital = 50000)




////////////////////
// COLOR INPUTS ///
//////////////////
rngFilterColorUp = input.color(title="Range Filter Color Up", defval = color.green, group="Color")
rngFilterColorDown = input.color(title="Range Filter Color Up", defval = color.red, group="Color")
hullColorUp = input.color(title="Hull Color Up", defval = color.green, group="Color")
hullColorDown = input.color(title="Hull Color Up", defval = color.red, group="Color")
fliColorUp = input.color(title="Follow Line Color Up", defval = color.green, group="Color")
fliColorDown = input.color(title="Follow Line Color Up", defval = color.red, group="Color")
    

///////////////////////////
// Range Filter INPUTS ///
/////////////////////////
src = input(defval=ohlc4, title="Source", group="Range Filter")
per = input.int(defval=33, minval=1, title="Sampling Period", group="Range Filter")
mult = input.float(defval=2.1, minval=0.1, title="Range Multiplier", group="Range Filter", step=0.1)

/////////////////////////
// Hull Suite INPUTS ///
///////////////////////
srcHull = input(close, title="Source", group="Hull Suite")
modeSwitch = input("Ehma", title="Hull Variation", options=["Hma", "Thma", "Ehma"], group="Hull Suite")
length = input(55, title="Length(180-200 for floating S/R , 55 for swing entry)")
switchColor = input(true, "Color Hull according to trend?", group="Hull Suite")
visualSwitch  = input(true, title="Show as a Band?", group="Hull Suite")
thicknesSwitch = input(1, title="Line Thickness", group="Hull Suite")
transpSwitch = input.int(40, title="Band Transparency",step=5, group="Hull Suite")

//////////////////////////
// FOLLOW LINE INPUTS ///
////////////////////////
BBperiod      = input.int(defval = 21, title = "BB Period", minval = 1)
BBdeviations  = input.float(defval = 1.00, title = "BB Deviations", minval = 0.1, step=0.05)
UseATRfilter  = input.bool(defval = true, title = "ATR Filter")
ATRperiod     = input.int(defval = 5, title = "ATR Period", minval = 1)
hl            = input.bool(defval = false, title = "Hide Labels")

//////////////////////////
// Range Filter Logic ///
////////////////////////

smoothrng(x, t, m) =>
    wper = t * 2 - 1
    avrng = ta.ema(math.abs(x - x[1]), t)
    smoothrng = ta.ema(avrng, wper) * m
    smoothrng
smrng = smoothrng(src, per, mult)

rngfilt(x, r) =>
    rngfilt = x
    rngfilt := x > nz(rngfilt[1]) ? x - r < nz(rngfilt[1]) ? nz(rngfilt[1]) : x - r : 
       x + r > nz(rngfilt[1]) ? nz(rngfilt[1]) : x + r
    rngfilt
filt = rngfilt(src, smrng)

upward = 0.0
upward := filt > filt[1] ? nz(upward[1]) + 1 : filt < filt[1] ? 0 : nz(upward[1])
downward = 0.0
downward := filt < filt[1] ? nz(downward[1]) + 1 : filt > filt[1] ? 0 : nz(downward[1])

filtcolor = upward > 0 ? rngFilterColorUp : downward > 0 ? rngFilterColorDown : color.orange

filtplot = plot(filt, color=filtcolor, linewidth=3, title="Range Filter")

////////////////////////
// Hull Suite Logic ///
//////////////////////


HMA(_srcHull, _length) =>  ta.wma(2 * ta.wma(_srcHull, _length / 2) - ta.wma(_srcHull, _length), math.round(math.sqrt(_length)))
EHMA(_srcHull, _length) =>  ta.ema(2 * ta.ema(_srcHull, _length / 2) - ta.ema(_srcHull, _length), math.round(math.sqrt(_length)))
THMA(_srcHull, _length) =>  ta.wma(ta.wma(_srcHull,_length / 3) * 3 - ta.wma(_srcHull, _length / 2) - ta.wma(_srcHull, _length), _length)

Mode(modeSwitch, src, len) =>
      modeSwitch == "Hma"  ? HMA(src, len) :
      modeSwitch == "Ehma" ? EHMA(src, len) : 
      modeSwitch == "Thma" ? THMA(src, len/2) : na

_hull = Mode(modeSwitch, src, int(length))
HULL =  _hull
MHULL = HULL[0]
SHULL = HULL[2]

hullColor = switchColor ? (HULL > HULL[2] ? hullColorUp : hullColorDown) : #ff9800
Fi1 = plot(MHULL, title="MHULL", color=hullColor, linewidth=thicknesSwitch, transp=50)
Fi2 = plot(visualSwitch ? SHULL : na, title="SHULL", color=hullColor, linewidth=thicknesSwitch, transp=50)

fill(Fi1, Fi2, title="Band Filler", color=hullColor, transp=transpSwitch)


/////////////////////////
// Follow Line Logic ///
///////////////////////
BBUpper=ta.sma (close,BBperiod)+ta.stdev(close, BBperiod)*BBdeviations
BBLower=ta.sma (close,BBperiod)-ta.stdev(close, BBperiod)*BBdeviations

TrendLine = 0.0
iTrend = 0.0
buy = 0.0
sell = 0.0

BBSignal = close>BBUpper? 1 : close<BBLower? -1 : 0

if BBSignal == 1 and UseATRfilter == 1
    TrendLine:=low-ta.atr(ATRperiod)
    if TrendLine<TrendLine[1] 
        TrendLine:=TrendLine[1]
if BBSignal == -1 and UseATRfilter == 1
    TrendLine:=high+ta.atr(ATRperiod)
    if TrendLine>TrendLine[1]
        TrendLine:=TrendLine[1]
if BBSignal == 0 and UseATRfilter == 1
    TrendLine:=TrendLine[1]
//
if BBSignal == 1 and UseATRfilter == 0
    TrendLine:=low
    if TrendLine<TrendLine[1] 
        TrendLine:=TrendLine[1]
if BBSignal == -1 and UseATRfilter == 0
    TrendLine:=high
    if TrendLine>TrendLine[1]
        TrendLine:=TrendLine[1]
if BBSignal == 0 and UseATRfilter == 0
    TrendLine:=TrendLine[1]
//
iTrend:=iTrend[1]
if TrendLine>TrendLine[1] 
    iTrend:=1
if TrendLine<TrendLine[1] 
    iTrend:=-1
//
buy:=iTrend[1]==-1 and iTrend==1 ? 1 : na
sell:=iTrend[1]==1 and iTrend==-1? 1 : na
//
plot(TrendLine, color=iTrend > 0? fliColorUp : fliColorDown ,style=plot.style_line,linewidth=2,transp=0,title="Trend Line") 
plotshape(buy == 1 and hl == false? TrendLine-ta.atr(8) :na, text='?', style= shape.labelup, location=location.absolute, color=color.blue, textcolor=color.white, offset=0, transp=0,size=size.auto)
plotshape(sell == 1 and hl == false ?TrendLine+ta.atr(8):na, text='?', style=shape.labeldown, location=location.absolute, color=color.red, textcolor=color.white, offset=0, transp=0,size=size.auto)



if(true)
    // RANGE FILTER ENTRY LONG WITH HULL
    // if(filtcolor[1] == rngFilterColorDown and filtcolor == rngFilterColorUp)
    strategy.entry("rngFiltLong", strategy.long, when = buy == 1 and hl == false)
    // RANGE FILTER ENTRY SHORT WITH HULL
    // if(filtcolor[1] == rngFilterColorUp and filtcolor == rngFilterColorDown)
    strategy.entry("rngFiltShort", strategy.short, when = sell == 1 and hl == false)
        
    
    // strategy.close("rngFiltLong", when = HULL < HULL[2] )
    // strategy.close("rngFiltShort", when = HULL > HULL[2] )
    
    
    


```

> Detail

https://www.fmz.com/strategy/426778

> Last Modified

2023-09-14 15:10:46
