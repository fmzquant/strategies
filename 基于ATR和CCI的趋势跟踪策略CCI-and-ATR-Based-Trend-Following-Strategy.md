
> Name

基于ATR和CCI的趋势跟踪策略CCI-and-ATR-Based-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过结合平均真实波动指标(ATR)和商品通道指标(CCI)来识别价格趋势,并以超买超卖区域作为 entry 和 exit 信号。ATR用于计算通道上下轨,而CCI用于判断趋势方向。当CCI从超买区下破时做空,从超卖区上破时做多,实现趋势跟踪。

## 策略原理

1. 计算ATR,这里选择了2周期的ATR
2. 计算CCI值,这里选择了10周期
3. 根据当前K线的CCI值判断趋势方向
    - CCI >= 0, Defines as Uptrend 
    - CCI < 0, Defines as Downtrend
4. 计算上轨和下轨
    - 上轨 = 最高价 + ATR * Multiplier
    - 下轨 = 最低价 - ATR * Multiplier
5. 在不同的趋势方向上,保存并更新上轨和下轨
    - 当CCI >= 0时,如果上轨 < 前一根K线的上轨,则重新赋值;如果CCI < 0时,如果下轨 > 前一根K线的下轨,则重新赋值
    - 这样可以避免channel随着价格反向移动
6. 根据CCI值进入上轨或下轨作为entry signal
7. 根据CCI值穿越0轴作为exit signal
8. 设置止盈止损Exit

## 策略优势

该策略结合了趋势判断和通道突破,可以有效跟踪趋势。

1. 使用CCI判断价格趋势方向,可以快速判断多空趋势
2. ATR通道设置止损止盈,可以控制风险
3. 当价格反转时,上下轨能够快速调整方向,避免被困在原趋势的通道中
4. 通过CCI的0轴交叉作为退出信号,可以跟随趋势且避免反转坑害

## 策略风险及优化

1. CCI和ATR参数设置需要优化,不同周期及参数下,效果可能会有较大差异
2. 虽然可以通过通道调整避免局促,但如果出现剧烈反转,仍然可能获利不足或亏损
3. 停损点设置需要优化,适当放宽止损范围,避免过于频繁停损
4. 可以结合其他指标过滤entry signal,优化entry机会
5. 可以通过与更高周期趋势指标结合,避免反向交易

## 总结

该策略整体来说是一个简单实用的趋势跟踪策略。优点是思路清晰,易于实现,可以快速抓住趋势机会。但其中的参数设置、止损范围等都需要根据市场情况进行优化调整。与其他指标组合使用可以进一步增强策略效果。总体来说,该策略作为趋势跟踪入门策略还是不错的,值得学习借鉴。

||


## Overview

This strategy identifies price trends by combining Average True Range (ATR) and Commodity Channel Index (CCI), and uses overbought/oversold levels as entry and exit signals. ATR calculates the upper and lower bands, while CCI determines the trend direction. It goes short when CCI crosses below overbought level, and goes long when CCI crosses above oversold level, thus following trends.

## Strategy Logic

1. Calculate ATR, here 2-period ATR is used
2. Calculate CCI value, here 10-period CCI is used  
3. Determine trend direction based on current CCI value
    - CCI >= 0, Defines as Uptrend
    - CCI < 0, Defines as Downtrend
4. Calculate Upper Band and Lower Band
    - Upper Band = Highest High + ATR * Multiplier
    - Lower Band = Lowest Low - ATR * Multiplier
5. Under different trend directions, save and update Upper and Lower Bands
    - When CCI >= 0, if Upper Band < previous Upper Band, reset it; When CCI < 0, if Lower Band > previous Lower Band, reset it
    - This avoids channels moving reversely with price
6. Enter at Upper or Lower band based on CCI value as entry signal 
7. Exit when CCI crosses 0 as exit signal
8. Set stop loss and take profit exit

## Advantages

This strategy combines trend identification and channel breakout, which effectively follows trends.

1. Using CCI to determine price trend direction for quick judgment of long/short trends
2. ATR channel sets stop loss and take profit to control risks
3. Channels can quickly adjust direction when price reverses, avoiding being trapped in original trend channel  
4. Exiting on CCI's 0 cross follows trends and avoids whipsaws

## Risks and Improvements

1. CCI and ATR parameters need optimization for best results across periods and parameters
2. Although channel adjustment avoids congestion, severe reversals may still cause insufficient profit or loss
3. Stop loss placement needs optimization, relax stops to avoid excessive stops
4. Additional filters on entry signal can optimize entry opportunities 
5. Combining with higher timeframe trend indicator can avoid trading against higher trend

## Summary

Overall this is a simple and practical trend following strategy. Its advantage is clear logic and ease of implementation for quickly capitalizing on trends. But parameters like stop loss range require optimization based on market conditions. Combining with other indicators can further enhance the strategy. As a beginner trend following strategy, it is worth learning and referencing.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|60|Resolution|
|v_input_2|1.4| Take Profit (%)|
|v_input_3|0.7| Stop Loss (%)|
|v_input_4|10|CCI|
|v_input_5|2|ATR|
|v_input_6_low|0|src: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|100|len0|
|v_input_8|100|Range|
|v_input_9|30|loockback length pivots|
|v_input_10|true|Draw lines from wicks (checked) or real bodies (unchecked)?|
|v_input_11|true|Display only falling 'high' and rising 'low' trendlines?|
|v_input_12|false|checked = monochrome lines, unchecked = direction colored lines?|
|v_input_13|false|Limit extensions of the lines? 0 = infinite, other values x 100 bars|
|v_input_14|true|show trendline breaks|
|v_input_15|5|number of past trendlines to check for breaks (max = 10)|
|v_input_16|true|only display 'long' breaks on trendlines connecting 'highs' and 'short' for 'lows'|
|v_input_17|false|USING A LOG CHART? MAKE SURE TO CHECK THIS BOX!!|
|v_input_18|0|Period: Day|Week|Month|Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-26 00:00:00
end: 2023-09-25 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Trend Trader Karan",overlay=true)
res = input(title="Resolution", type=input.resolution, defval="60",confirm = true)

ProfitPerc = input(title=" Take Profit (%)",type=input.float, minval=0.0, step=0.1, defval=1.4) * 0.01

stoploss = input(title=" Stop Loss (%)",type=input.float, minval=0.0, step=0.1, defval=0.7) * 0.01

CCI = input(10,title = "CCI")
ATR = input(2,title = "ATR")
Multiplier= 1
original = false
thisCCI = cci(close, CCI)
lastCCI = nz(thisCCI[1])


calcx()=> 
    bufferDn= high + Multiplier * wma(tr,ATR)
    bufferUp= low - Multiplier * wma(tr,ATR)
    if (thisCCI >= 0 and lastCCI < 0) 
        bufferUp := bufferDn[1]
    if (thisCCI <= 0 and lastCCI > 0) 
        bufferDn := bufferUp[1]

    if (thisCCI >= 0)
        if (bufferUp < bufferUp[1])
            bufferUp := bufferUp[1]
    else
        if (thisCCI <= 0)
            if (bufferDn > bufferDn[1])
                bufferDn := bufferDn[1]

   
    x = 0.0
    x := thisCCI >= 0 ?bufferUp:thisCCI <= 0 ?bufferDn:x[1]
    x

tempx = calcx()

calcswap() =>
    swap = 0.0
    swap := tempx>tempx[1]?1:tempx<tempx[1]?-1:swap[1]
    swap

tempswap = calcswap()

swap2=tempswap==1?color.green:color.red
swap3=thisCCI >=0 ?color.green :color.red
swap4=original?swap3:swap2

//display current timeframe's Trend



plot(tempx,color=swap4 == color.green ? color.green : swap4,transp=0,linewidth=4)


htfx = security(syminfo.tickerid,res,tempx[1],lookahead = barmerge.lookahead_on)
htfswap4 = security(syminfo.tickerid,res,swap4[1],lookahead = barmerge.lookahead_on)

plot(htfx,color=htfswap4,transp=0,linewidth=3)


//plotarrow( ? 1 : swap4[1] == color.yellow and swap4 == color.blue ? -1 :0 , title="Up Entry Arrow", colorup=color.green,colordown = color.blue, maxheight=10, minheight=10, transp=0)

plotshape( swap4[1] == color.red and swap4 == color.green ? 1 : na , style = shape.triangleup , color = color.blue , location = location.belowbar , size = size.tiny )
plotshape( swap4[1] == color.green and swap4 == color.red ? 1 : na , style = shape.triangledown , color = color.red , location = location.abovebar , size = size.tiny)




buy =  swap4[1] == color.red and swap4 == color.green and htfswap4 == color.green

sell =  swap4[1] == color.green and swap4 == color.red and htfswap4 == color.red


if(buy)
    strategy.entry("buy",true)
    
if(sell)
    strategy.entry("sell",false)
    
if(swap4[1] == color.red and swap4 == color.green)
    strategy.close("sell")
    
if(swap4[1] == color.green and swap4 == color.red )
    strategy.close("buy")
    
    
longExitPrice  = strategy.position_avg_price * (1 + ProfitPerc)
shortExitPrice = strategy.position_avg_price * (1 - ProfitPerc)

stop_buy = strategy.position_avg_price * (1 - stoploss)
stop_sell = strategy.position_avg_price * (1 + stoploss)
    
    
if (strategy.position_size > 0)
    strategy.exit(id="Target", limit=longExitPrice , stop = stop_buy)

if (strategy.position_size < 0)
    strategy.exit(id="Target", limit=shortExitPrice , stop = stop_sell)
    
    
///////////////study("EMA ", overlay=true)
plot(ema(close, 200), color=#FF7000, linewidth=2, title='200 Day EMA')
plot(ema(close, 20), color=#0088FA, linewidth=2, title='20 Day EMA')
plot(ema(close, 50), color=#FA00D0, linewidth=2, title='50 Day EMA')


//////////////////study("Trend Lines+++", overlay=true)
//
src = input(low)
len0 = input(100)

calcSlope(src, len0) =>
    if not barstate.islast
        [float(na), float(na), float(na)]
    else
        sumX = 0.0
        sumY = 0.0
        sumXSqr = 0.0
        sumXY = 0.0
        for i = 0 to len0 - 1
            val = src[i]
            per = i + 1.0
            sumX := sumX + per
            sumY := sumY + val
            sumXSqr := sumXSqr + per * per
            sumXY := sumXY + val * per
        slope = (len0 * sumXY - sumX * sumY) / (len0 * sumXSqr - sumX * sumX)
        average = sumY / len0
        intercept = average - slope * sumX / len0 + slope
        [slope, average, intercept]

[s, a, i] = calcSlope(src, len0)

startPrice = i + s * (len0 - 1)
endPrice = i
// var line baseLine = na
// if na(baseLine)
//     baseLine := line.new(bar_index - len0 + 1, startPrice, bar_index, endPrice, width=4, extend=extend.right)
// else
//     line.set_xy1(baseLine, bar_index - len0 + 1, startPrice)
//     line.set_xy2(baseLine, bar_index, endPrice)
//     na 
//

mx = input(100, "Range", minval=1)
mn = max(2, round(mx / 10) + 1)

LN(B, CLR) =>
    s1 = B == 1 ? highest(src, mx) : lowest(src, mx)
    s2 = B == 1 ? highest(src, mn) : lowest(src, mn)
    c1 = s1 == src
    c2 = s2 == src
    b1 = barssince(c1)
    b2 = barssince(c2)
    v1 = valuewhen(c1, s1, 0)
    v2 = valuewhen(c2, s2, 0)
    // line.new(bar_index - b1, v1, bar_index - b2, v2, extend=extend.both, color=CLR, width=2)

// L1 = LN(1, #ff0088), line.delete(L1[1])
// L2 = LN(0, #00ff88), line.delete(L2[1])
//
// Input variables
len=input(30,title="loockback length pivots")
wicks=input(true,title="Draw lines from wicks (checked) or real bodies (unchecked)?")
disp_select=input(true,title="Display only falling 'high' and rising 'low' trendlines?")
do_mono=input(false,title="checked = monochrome lines, unchecked = direction colored lines?")
limit_extension=input(0,title="Limit extensions of the lines? 0 = infinite, other values x 100 bars",minval=0)
do_alerts=input(true,title="show trendline breaks")
trendline_nr=input(5,title="number of past trendlines to check for breaks (max = 10)",minval=0,maxval=10)
select_breaks=input(true,title="only display 'long' breaks on trendlines connecting 'highs' and 'short' for 'lows'")
log_chart=input(false,title="USING A LOG CHART? MAKE SURE TO CHECK THIS BOX!!")


// Calculating the 'time value' of one bar
bar_time=time-time[1]

// Initialising color scheme
var color color_rising=do_mono?color.teal:color.lime
var color color_falling=do_mono?color.teal:color.fuchsia


/////// Function declarations ///////

// Declaration of trendline function
f_trendline(_input_function,_delay,_only_up,_extend) =>
    // Calculate line coordinates (Ax,Ay) - (Bx,By)
    var int Ax = 0
    var int Bx = 0
    var float By = 0.0
    var float slope = 0.0
    Ay = fixnan(_input_function)
    if change(Ay)!=0
        Ax := time[_delay]
        By:= Ay[1]
        Bx := Ax[1]
        slope:=log_chart?((log(Ay)-log(By))/(Ax-Bx)):((Ay-By)/(Ax-Bx))
    else
        Ax := Ax[1]
        Bx := Bx[1]
        By := By[1]
    // Draw trendlines
    var line trendline=na
    var int Axbis=0
    var float Aybis=0.0
    var bool _xtend=true
    extension_time = limit_extension*bar_time*100
    Axbis := Ax + extension_time
    Aybis := log_chart?(Ay*exp(extension_time*slope)):(Ay + extension_time*slope)
    if limit_extension!=0
        _xtend:=false
    if change(Ay)!=0
        line_color = slope*time<0?(_only_up?(disp_select?na:color_rising):color_rising):(_only_up?color_falling:(disp_select?na:color_falling))
        if not na(line_color)
            trendline = line.new(Bx,By,Axbis, Aybis, xloc.bar_time, extend=_xtend?extend.right:extend.none, color=line_color, style=line.style_dotted, width=1)

    [Bx,By,Axbis,Aybis,slope]

// Function to get trendline price for X bars ago ("0" = current value)
line_get_price(_start_time,_start_price,_slope,_lookback_period,_log_chart) =>
    var float current_price=0.0
    elapsed_time = (time-_start_time)
    current_price := _log_chart?(_start_price*exp((elapsed_time-(_lookback_period*bar_time))*_slope)):(_start_price + (elapsed_time-(_lookback_period*bar_time))*_slope)

// Function to check for trendline crosses
line_cross(_check_value,_start_time,_start_price,_slope,_log_chart) =>
    var float current_value=0.0
    var float previous_value=0.0
    // Get current and previous price for the trendline
    current_value := line_get_price(_start_time,_start_price,_slope,0,_log_chart)
    previous_value := line_get_price(_start_time,_start_price,_slope,1,_log_chart)
    // Return 1 for crossover, -1 for crossunder and 0 for no cross detected
    cross =
     _check_value[1]<previous_value and _check_value>current_value?1:
     _check_value[1]>previous_value and _check_value<current_value?-1:0


/////// Start of main script ///////

// Calculate pivot points    
high_point=pivothigh(wicks?high:(close>open?close:open),len,len/2)
low_point=pivotlow(wicks?low:(close>open?open:close),len,len/2)

// Call trendline function for high and low pivot points
[phx1,phy1,phx2,phy2,slope_high]=f_trendline(high_point,len/2,false,true)
[plx1,ply1,plx2,ply2,slope_low]=f_trendline(low_point,len/2,true,true)

// Initialition of pseudo array to keep track of last 10 high and 10 low trendline values
var int high_x0=0, var float high_y0=0.0, var float high_sl0=0.0
var int high_x1=0, var float high_y1=0.0, var float high_sl1=0.0 
var int high_x2=0, var float high_y2=0.0, var float high_sl2=0.0 
var int high_x3=0, var float high_y3=0.0, var float high_sl3=0.0 
var int high_x4=0, var float high_y4=0.0, var float high_sl4=0.0
var int high_x5=0, var float high_y5=0.0, var float high_sl5=0.0
var int high_x6=0, var float high_y6=0.0, var float high_sl6=0.0
var int high_x7=0, var float high_y7=0.0, var float high_sl7=0.0
var int high_x8=0, var float high_y8=0.0, var float high_sl8=0.0
var int high_x9=0, var float high_y9=0.0, var float high_sl9=0.0

var int low_x0=0,  var float low_y0=0.0,  var float low_sl0=0.0
var int low_x1=0,  var float low_y1=0.0,  var float low_sl1=0.0 
var int low_x2=0,  var float low_y2=0.0,  var float low_sl2=0.0 
var int low_x3=0,  var float low_y3=0.0,  var float low_sl3=0.0 
var int low_x4=0,  var float low_y4=0.0,  var float low_sl4=0.0
var int low_x5=0,  var float low_y5=0.0,  var float low_sl5=0.0
var int low_x6=0,  var float low_y6=0.0,  var float low_sl6=0.0
var int low_x7=0,  var float low_y7=0.0,  var float low_sl7=0.0
var int low_x8=0,  var float low_y8=0.0,  var float low_sl8=0.0
var int low_x9=0,  var float low_y9=0.0,  var float low_sl9=0.0

// If a new trendline is formed, shift all values in the array one place up and forget the last values
if change(fixnan(high_point))!=0
    high_x9:=high_x8, high_y9:=high_y8, high_sl9:=high_sl8
    high_x8:=high_x7, high_y8:=high_y7, high_sl8:=high_sl7
    high_x7:=high_x6, high_y7:=high_y6, high_sl7:=high_sl6
    high_x6:=high_x5, high_y6:=high_y5, high_sl6:=high_sl5
    high_x5:=high_x4, high_y5:=high_y4, high_sl5:=high_sl4
    high_x4:=high_x3, high_y4:=high_y3, high_sl4:=high_sl3
    high_x3:=high_x2, high_y3:=high_y2, high_sl3:=high_sl2
    high_x2:=high_x1, high_y2:=high_y1, high_sl2:=high_sl1
    high_x1:=high_x0, high_y1:=high_y0, high_sl1:=high_sl0
    high_x0:=phx1, high_y0:=phy1, high_sl0:=slope_high
if change(fixnan(low_point))!=0
    low_x9:=low_x8, low_y9:=low_y8, low_sl9:=low_sl8
    low_x8:=low_x7, low_y8:=low_y7, low_sl8:=low_sl7
    low_x7:=low_x6, low_y7:=low_y6, low_sl7:=low_sl6
    low_x6:=low_x5, low_y6:=low_y5, low_sl6:=low_sl5
    low_x5:=low_x4, low_y5:=low_y4, low_sl5:=low_sl4
    low_x4:=low_x3, low_y4:=low_y3, low_sl4:=low_sl3
    low_x3:=low_x2, low_y3:=low_y2, low_sl3:=low_sl2
    low_x2:=low_x1, low_y2:=low_y1, low_sl2:=low_sl1
    low_x1:=low_x0, low_y1:=low_y0, low_sl1:=low_sl0
    low_x0:=plx1, low_y0:=ply1, low_sl0:=slope_low
    
// Check Trendline crosses for last X nr. of trendlines
cross_high0=
 disp_select and high_sl0*time>0?0:
  line_cross(close,high_x0,high_y0,high_sl0,log_chart)
cross_low0=
 disp_select and low_sl0*time<0?0:
  line_cross(close,low_x0,low_y0,low_sl0,log_chart)

cross_high1=
 disp_select and high_sl1*time>0?0:
  line_cross(close,high_x1,high_y1,high_sl1,log_chart)
cross_low1=
 disp_select and low_sl1*time<0?0:
  line_cross(close,low_x1,low_y1,low_sl1,log_chart)

cross_high2=
 disp_select and high_sl2*time>0?0:
  line_cross(close,high_x2,high_y2,high_sl2,log_chart)
cross_low2=
 disp_select and low_sl2*time<0?0:
  line_cross(close,low_x2,low_y2,low_sl2,log_chart)

cross_high3=
 disp_select and high_sl3*time>0?0:
  line_cross(close,high_x3,high_y3,high_sl3,log_chart)
cross_low3=
 disp_select and low_sl3*time<0?0:
  line_cross(close,low_x3,low_y3,low_sl3,log_chart)

cross_high4=
 disp_select and high_sl4*time>0?0:
  line_cross(close,high_x4,high_y4,high_sl4,log_chart)
cross_low4=
 disp_select and low_sl4*time<0?0:
  line_cross(close,low_x4,low_y4,low_sl4,log_chart)

cross_high5=
 disp_select and high_sl5*time>0?0:
  line_cross(close,high_x5,high_y5,high_sl5,log_chart)
cross_low5=
 disp_select and low_sl5*time<0?0:
  line_cross(close,low_x5,low_y5,low_sl5,log_chart)

cross_high6=
 disp_select and high_sl6*time>0?0:
  line_cross(close,high_x6,high_y6,high_sl6,log_chart)
cross_low6=
 disp_select and low_sl6*time<0?0:
  line_cross(close,low_x6,low_y6,low_sl6,log_chart)

cross_high7=
 disp_select and high_sl7*time>0?0:
  line_cross(close,high_x7,high_y7,high_sl7,log_chart)
cross_low7=
 disp_select and low_sl7*time<0?0:
  line_cross(close,low_x7,low_y7,low_sl7,log_chart)

cross_high8=
 disp_select and high_sl8*time>0?0:
  line_cross(close,high_x8,high_y8,high_sl8,log_chart)
cross_low8=
 disp_select and low_sl8*time<0?0:
  line_cross(close,low_x8,low_y8,low_sl8,log_chart)

cross_high9=
 disp_select and high_sl9*time>0?0:
  line_cross(close,high_x9,high_y9,high_sl9,log_chart)
cross_low9=
 disp_select and low_sl9*time<0?0:
  line_cross(close,low_x9,low_y9,low_sl9,log_chart)
  
long_break=
 (trendline_nr>9?cross_high9==1 or (select_breaks?false:cross_low9==1):false) or
 (trendline_nr>8?cross_high8==1 or (select_breaks?false:cross_low8==1):false) or
 (trendline_nr>7?cross_high7==1 or (select_breaks?false:cross_low7==1):false) or
 (trendline_nr>6?cross_high6==1 or (select_breaks?false:cross_low6==1):false) or
 (trendline_nr>5?cross_high5==1 or (select_breaks?false:cross_low5==1):false) or
 (trendline_nr>4?cross_high4==1 or (select_breaks?false:cross_low4==1):false) or
 (trendline_nr>3?cross_high3==1 or (select_breaks?false:cross_low3==1):false) or
 (trendline_nr>2?cross_high2==1 or (select_breaks?false:cross_low2==1):false) or
 (trendline_nr>1?cross_high1==1 or (select_breaks?false:cross_low1==1):false) or
 cross_high0==1 or (select_breaks?false:cross_low0==1)

short_break=
 (trendline_nr>9?(select_breaks?false:cross_high9==-1) or cross_low9==-1:false) or
 (trendline_nr>8?(select_breaks?false:cross_high8==-1) or cross_low8==-1:false) or
 (trendline_nr>7?(select_breaks?false:cross_high7==-1) or cross_low7==-1:false) or
 (trendline_nr>6?(select_breaks?false:cross_high6==-1) or cross_low6==-1:false) or
 (trendline_nr>5?(select_breaks?false:cross_high5==-1) or cross_low5==-1:false) or
 (trendline_nr>4?(select_breaks?false:cross_high4==-1) or cross_low4==-1:false) or
 (trendline_nr>3?(select_breaks?false:cross_high3==-1) or cross_low3==-1:false) or
 (trendline_nr>2?(select_breaks?false:cross_high2==-1) or cross_low2==-1:false) or
 (trendline_nr>1?(select_breaks?false:cross_high1==-1) or cross_low1==-1:false) or
 (select_breaks?false:cross_high0==-1) or cross_low0==-1

// Plot and connect pivot points
color_high=slope_high*time<0?color_rising:(disp_select?na:color_falling)
color_low=slope_low*time>0?color_falling:(disp_select?na:color_rising)
plot(high_point,color=color_high,offset=-len/2)
plot(low_point,color=color_low,offset=-len/2)
//
// Function outputs 1 when it's the first bar of the D/W/M/Y
is_newbar(res) =>
    ch = 0
    if(res == 'Y')
        t  = year(time('D'))
        ch := change(t) != 0 ? 1 : 0
    else
        t = time(res)
        ch := change(t) != 0 ? 1 : 0
    ch

////////////
// INPUTS //
////////////

pp_period = input(title = "Period", type=input.string, defval="Day", options = ['Day', 'Week', 'Month', 'Year'])

pp_res = pp_period == 'Day' ? 'D' : pp_period == 'Week' ? 'W' : pp_period == 'Month' ? 'M' : 'Y' 

/////////////////////
// Get HLC from HT //

// Calc High
high_cur = 0.0
high_cur := is_newbar(pp_res) ? high : max(high_cur[1], high)

phigh = 0.0
phigh := is_newbar(pp_res) ? high_cur[1] : phigh[1]

// Calc Low
low_cur = 0.0
low_cur := is_newbar(pp_res) ? low : min(low_cur[1], low)

plow = 0.0
plow := is_newbar(pp_res) ? low_cur[1] : plow[1]

// Calc Close
pclose = 0.0
pclose := is_newbar(pp_res) ? close[1] : pclose[1]

```

> Detail

https://www.fmz.com/strategy/427890

> Last Modified

2023-09-26 16:08:37
