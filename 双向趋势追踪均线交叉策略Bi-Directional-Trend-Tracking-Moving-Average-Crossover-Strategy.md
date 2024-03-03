
> Name

双向趋势追踪均线交叉策略Bi-Directional-Trend-Tracking-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1acc076ae5ae95b22c4.png)
[trans]

## 概述
本策略通过计算双向平滑移动平均线,结合趋势指标,实现了一个可以自动追踪价格趋势的交叉交易策略。该策略旨在追踪长期趋势,在强势趋势中获取更大的收益。

## 策略原理
1. 计算价格的双向平滑移动平均线,包括开盘价平均线和收盘价平均线。
2. 利用相关系数和ATR指标计算价格趋势指标。 
3. 将价格趋势指标与双向移动平均线进行组合,得到一个综合的趋势判断。
4. 当开盘价平均线和收盘价平均线发生金叉时做多;当发生死叉时平仓。
5. 同时结合趋势指标,只有在趋势指标也同时做多时才开仓做多,只有在趋势指标也同时做空时才开仓做空。

## 策略优势
1. 双向移动平均线追踪价格趋势更加平滑和稳定。
2. 结合趋势指标,可以更好地判断趋势方向,避免错误交易。 
3. 利用金叉和死叉来确定具体的交易时机,更加明确。
4. 可以通过参数调整自由选择平滑程度,适应更多市场环境。
5. 多种指标相互验证,可以减少假信号。

## 策略风险
1. 在趋势转折点错过反转的风险。可以通过调整移动平均线周期来降低。
2. 双向移动平均线本身滞后性较大,需要与趋势指标相互验证。
3. 移动平均线周期不当可能导致交易频率过高或遗漏良好交易时机。
4. 需要反复测试优化参数,以适应不同周期和市场环境。

## 策略优化方向  
1. 测试更多种类的移动平均线指标。
2. 尝试其他类型的趋势指标。 
3. 优化移动平均线和趋势指标的参数。  
4. 尝试与其他指标组合,如波动率指标。
5. 增加止损策略。

## 总结
本策略从多个维度预测价格趋势,在参数优化后可以稳定地追踪长线趋势。但需要注意防止过度优化和测 fitting。总体来说,该策略以较低的风险实现了长线趋势的追踪,值得进一步研究和应用。

||


## Overview
This strategy calculates bi-directional smoothed moving averages combined with a trend indicator to implement an automated trend tracking crossover trading strategy. The strategy aims to track long-term trends and achieve higher returns during strong trends.  

## Strategy Logic  
1. Calculate bi-directional smoothed moving averages of the asset price, including the open price moving average and the close price moving average.
2. Use correlation coefficient and ATR indicator to calculate price trend indicator.
3. Combine price trend indicator with bi-directional moving averages to get overall trend judgment.  
4. Go long when open price moving average crosses above close price moving average; close position when cross below.
5. Only go long when trend indicator also indicates an uptrend; only go short when trend indicator indicates a downtrend.

## Advantages
1. Bi-directional moving averages trace trends more smoothly and steadily.  
2. Trend indicator helps better determine trend direction and avoid wrong trades.
3. Crossovers provide clearer trading signals.  
4. Customizable smoothness through parameter tuning to suit more market environments. 
5. Multiple cross validations between indicators help avoid false signals.

## Risks
1. Risk of missing reversal at trend turning points. Can be mitigated by tuning moving average periods.   
2. Moving averages themselves have lag. Need validation from trend indicator. 
3. Improper moving average periods may lead to overtrading or missing good entries.
4. Extensive parameter optimization is needed to adapt to different timeframes and markets.  

## Improvements 
1. Test more types of moving averages.
2. Try other types of trend indicators.
3. Optimize parameters of moving averages and trend indicators. 
4. Incorporate other indicators like volatility. 
5. Add stop loss strategies.  

## Conclusion
With parameter tuning, this multi-dimensional trend strategy can steadily track long-term trends with relatively low risk. But be cautious of overfitting. Overall it delivers long-term trend tracking with controllable risks and is worth further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|ATR Trend Resolution: (mins): 60|2|3|5|7|9|10|11|12|15|20|25|30|45|1|90|120|180|240|1D|3D|
|v_input_2|15|ATR Trend Length|
|v_input_3|6|ATR Trend Multiplier|
|v_input_4|0|Correlation Trend Resolution: (mins): 120|2|3|5|7|9|10|11|12|15|20|25|30|45|60|90|1|180|240|1D|3D|
|v_input_5|24|Correlation Trend Length (eg 28 for 1 hour)|
|v_input_6|0.2|Correlation Trend Tuner (0 to 1)|
|v_input_7|0.2|Trend Combination Tuner (0 to 1): 0=all ATR, 1 = all Corr|
|v_input_8|1D|Set MA Resolution ( note run alerts on 1min chart )|
|v_input_9|0|MA Type: : ALMA|EMA|DEMA|TEMA|WMA|VWMA|SMMA|HullMA|LSMA|SMA|
|v_input_10|18|MA Period|
|v_input_11|true|Offset for LSMA / Sigma for ALMA (6 is large)|
|v_input_12|0.88|Alma Offset (between 0 and 1, 0.99 = resposive, 0.01 = smooth)|
|v_input_13|2019|Backtest Start Year|
|v_input_14|true|Backtest Start Month|
|v_input_15|true|Backtest Start Day|
|v_input_16|2020|Backtest Stop Year|
|v_input_17|12|Backtest Stop Month|
|v_input_18|31|Backtest Stop Day|
|v_input_19|true|Include Long Trades|
|v_input_20|false|Include Short Trades|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-22 00:00:00
end: 2023-11-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//Author Josef Tainsh PhD 6Sept2020


//USE STUDY FOR ALERTS WITH AUTO TRADING BOT
//study(title = "Open Close Crossover for BOT Alerts", shorttitle = "OCC for BOT Alerts",overlay = true)
//USE STRATEGY TO FIT THE MOVING AVERAGE AND THE TREND FITS BY MINIMISING LOSS (OR MAXIMISING PROFITS)
//NOT THAT STRATEGIES RARELY SHOW A PROFIT ALSO THE STRATEGIES USE THE CROSS OVER ON THE MOVING AVERAGE TO ENTER A POSITION
strategy(title = "OCC Trend Combo 1 day BTC Moonflag", overlay = true, initial_capital=1000, commission_type=strategy.commission.percent, commission_value=0.2, default_qty_type = strategy.percent_of_equity, default_qty_value=100, pyramiding=0, calc_on_order_fills=false)
//CalcOnTick = true
//calc_on_every_tick = false

// Function for coders who want to offer their users a repainting/no-repainting version of the HTF data.
// It has the advantage of using only one `security()` call for both.
f_security(_symbol, _res, _src, _repaint) => security(_symbol, _res, _src[_repaint ? 0 : barstate.isrealtime ? 1 : 0])[_repaint ? 0 : barstate.isrealtime ? 0 : 1]


/////////////////////////////////////////////////////////////////////////////
// === BASE FUNCTIONS ===
/////////////////////////////////////////////////////////////////////////////
//This function returns true if execution is at the start of a new bar (so the last bar is previous close where alerts are determined)
is_newBar(stratRes) =>
    t = time(stratRes)
    not na(t) and (na(t[1]) or t > t[1])
///////////////////////////////////////////////////////////////////////////////////////////////////
// Returns MA input selection variant, default to SMA if blank or typo.
variant(type, src, len, offSig, offALMA) =>
    v1 = sma(src, len)                                                  // Simple
    v2 = ema(src, len)                                                  // Exponential
    v3 = 2 * v2 - ema(v2, len)                                          // Double Exponential
    v4 = 3 * (v2 - ema(v2, len)) + ema(ema(v2, len), len)               // Triple Exponential
    v5 = wma(src, len)                                                  // Weighted
    v6 = vwma(src, len)                                                 // Volume Weighted
    v7 = na(v5[1]) ? sma(src, len) : (v5[1] * (len - 1) + src) / len    // Smoothed
    v8 = wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len)))   // Hull
    v9 = linreg(src, len, offSig)                                       // Least Squares
    v10 = alma(src, len, offALMA, offSig)                               // Arnaud Legoux
    type=="EMA"?v2 : type=="DEMA"?v3 : type=="TEMA"?v4 : type=="WMA"?v5 : type=="VWMA"?v6 : type=="SMMA"?v7 : type=="HullMA"?v8 : type=="LSMA"?v9 : type=="ALMA"?v10 : v1
/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////
//SAMPLE SETTINGS FOR THE TREND INDICATOR FUNCTION
//1MIN   31, 0.2 (+-12%)
//timeResForTrend_1min = 1, [bLongs_1min, oscLongs_1min] = functionTrend(timeResForTrend_1min,31, 0.2)
//plot(bLongs1_1min,"Trend Indicator", color=oscLongs_1min == 1 ? color.blue :#e65100,linewidth=3,transp=0)
//OTHER  20, 0.2  5min(LONG -5%, SHORT -4%), 10min(LONG -17%, SHORT -6%), 60min(long +16%, SHORT )
//timeResForTrend_Not1min = XXXX, [bLongs_Not1Min, oscLongs_Not1Min] = functionTrend(timeResForTrend_Not1min,20, 0.2)
//plot(bLongs5_Not1Min,"Trend Indicator", color=oscLongs_Not1Min == 1 ? color.blue :#e65100,linewidth=3,transp=0)
/////////////////////////////////////////////
functionTrend(trendRes_Function,length_Function,sc_Function)=>
    b_Function =0.
    ls_Function = 0.
    src_Function = sc_Function*security(syminfo.tickerid, trendRes_Function, close)+(1-sc_Function)*nz(ls_Function[1],security(syminfo.tickerid, trendRes_Function, close))
    if (is_newBar(trendRes_Function)==false)
        src_Function := src_Function[1]
    er_Function = 1 - abs(change(src_Function,length_Function))/sum(abs(change(src_Function)),length_Function)
    n_Function = cum(1)-1
    a_Function = cum(abs(src_Function - nz(b_Function[1],src_Function)))/n_Function*(1+er_Function)
    b_Function := src_Function > nz(b_Function[1],src_Function) + a_Function ? src_Function : src_Function < nz(b_Function[1],src_Function) - a_Function ? src_Function : nz(b_Function[1],src_Function)
    alpha_Function = fixnan(correlation(src_Function,b_Function,length_Function) * (stdev(src_Function,length_Function)/stdev(b_Function,length_Function)))
    beta_Function = sma(src_Function,length_Function) - alpha_Function*sma(b_Function,length_Function)
    ls_Function := alpha_Function*b_Function+beta_Function
    osc_Function = 0
    osc_Function := b_Function > b_Function[1] ? 1 : b_Function < b_Function[1] ? 0 : osc_Function[1] 
    if (is_newBar(trendRes_Function)==false)
        er_Function := er_Function[1]
        n_Function := n_Function[1]
        a_Function := a_Function[1]
        b_Function := b_Function[1]
        alpha_Function := alpha_Function[1]
        beta_Function := beta_Function[1]
        ls_Function := ls_Function[1]
        osc_Function := osc_Function[1]
    [b_Function, osc_Function]
/////////////////////////////////////////////////////////////////
pine_atr(length,stratRes_atr) =>
    trueRange = max(max(security(syminfo.tickerid, stratRes_atr, high) - security(syminfo.tickerid, stratRes_atr, low), abs(security(syminfo.tickerid, stratRes_atr, high) - security(syminfo.tickerid, stratRes_atr, close[1]))), abs(security(syminfo.tickerid, stratRes_atr, low) - security(syminfo.tickerid, stratRes_atr, close[1]))) 
    sum = 0.0
    sum := (trueRange + (length - 1) * nz(sum[1])) / length
    sum  
//////////////////////////////////////////////////////////////////////////////////////////////


//STOP LOSS AND TAKE PROFIT
//ALSO NEEDS TO BE ACTIVATED IN THE STRATEGY
//long_tp_inp = input(1000, title='Long Take Profit %', step=0.1)/100/// Long Take Profit
//long_sl_inp = input(5, title='Long Stop Loss %', step=0.1)/100/// Long Stop Loss 
//short_tp_inp = input(75, title='Short Take Profit %', step=0.1)/100/// Short Take Profit
//short_sl_inp = input(5, title='Short Stop Loss %', step=0.1)/100/// Short Stop Loss 
//long_take_level = strategy.position_avg_price * (1 + long_tp_inp)
//long_stop_level = strategy.position_avg_price * (1 - long_sl_inp)
//short_take_level = strategy.position_avg_price * (1 - short_tp_inp)
//short_stop_level = strategy.position_avg_price * (1 + short_sl_inp)
//plot(long_take_level, color=color.green)
//plot(long_stop_level, color=color.red)
//plot(short_take_level, color=color.green)
//plot(short_stop_level, color=color.red)
//////////////////////////////////////////


//oneMinChartTrend = input(title="One Min Chart, TrendRes[ATR(15), Corr(18)]",defval=false)
//fourHourChartTrendLongsOnly = input(title="Four Hour Chart, Longs, Choppy TrendRes[ATR(5), Corr{60)]",defval=false)
//oneHourChartTrendShortsOnly = input(title="One Hour Chart Trend, Shorts, TrendRes[ATR(15), Corr(10)]",defval=false)
//oneMDayChartTrend = input(title="One Day Chart Longs best, Shorts poor,  TrendRes[ATR(25), Corr(60)]",defval=false)

trendRes_ATR   = input(title="ATR Trend Resolution: (mins)", defval="60", options=["1","2","3","5", "7", "9", "10", "11", "12", "15", "20", "25", "30", "45", "60", "90", "120", "180", "240", "1D", "3D"], type = input.resolution)
Length = input(title="ATR Trend Length",defval=15, minval=1)
Multiplier = input(title="ATR Trend Multiplier",defval=6, minval=1)  //avgTR      = wma(atr(1), Length)

trendRes   = input(title="Correlation Trend Resolution: (mins)", defval="120", options=["1","2","3","5", "7", "9", "10", "11", "12", "15", "20", "25", "30", "45", "60", "90", "120", "180", "240", "1D", "3D"], type = input.resolution)
lengthTrend = input(24, "Correlation Trend Length (eg 28 for 1 hour)")
scTrend = input(.2, "Correlation Trend Tuner (0 to 1)", step=0.1)
trendCombination = input(.2, "Trend Combination Tuner (0 to 1): 0=all ATR, 1 = all Corr", step=0.1)




//with sl
//1day longs only (works also with shorts)
//20,10,20,10  ___   25,15,6,60, 24, 0.2, 0.4


//1min chart, long and short -70% but visible trend
//1.5, 1.5, 1.5, 1.5____15,7,2,10,12,0.5,0.4
//if (oneMinChartTrend)
//    trendRes_ATR     := "15"
//    trendRes         := "10"
//    Length           := 7
//    Multiplier       := 2
//    lengthTrend      := 12
//    scTrend          := 0.5
//    trendCombination := 0.4

//choppy region with chart on 4hour
//with sl long only - shorts at -2% could not get a positive result with shorts, only when ma crosses through after a run up
//longs on 4h 8%
//2.7, 2, 2,1,___5,15,6,60,21,0.2, 0.4
//if (fourHourChartTrendLongsOnly)
//    trendRes_ATR     := "5" 
//    trendRes         := "60"
//    Length           := 15
//    Multiplier       := 6
//    lengthTrend      := 21
//    scTrend          := 0.2
//    trendCombination := 0.4

//shorts on 1h -30% but only shorts to catch are when the MA after a long run with lots of green turns red when pops out of back of price action with a long drop
//in this case use the trend indicator to stop the run after a long while
//not sure about sl and tp but
//3.7,2, 3.7,2, _15,11,5,10,17,0.8, 0.3
//if (oneHourChartTrendShortsOnly)
//    trendRes_ATR     := "15"
//    trendRes         := "10"
//    Length           := 11
//    Multiplier       := 5
//    lengthTrend      := 17
//    scTrend          := 0.8
//    trendCombination := 0.3

//1day longs only 
//20,10,20,10 _25,15,6,60, 24, 0.2, 0.4
//if (oneMDayChartTrend)
//    trendRes_ATR     := "25" 
//    trendRes         := "60"
//    Length           := 15
//    Multiplier       := 6
//    lengthTrend      := 24
//    scTrend          := 0.2
//    trendCombination := 0.4
//This shows 111% since start of 2020, and 323% since the start of 2020


//1day longs only
//100,3,?,? _25,15,6,60, 24, 0.2, 0.5 (longs only) (300% back to 2019)
//?,?,60,0.3 _25,15,6,60, 24, 0.2, 0.5 (shorts only) (50% back to 2019)
//A take profit with the shorts worked, but the long had >100% in some runs
//The stop loss on the long did not really have any effect however, with the shorts a stop loss of 0.3% heloed
//However, the algo on the chart was the daily close and not sure if this works in the same way when calculating all the time on new ticks
//if (oneMDayChartTrend)
//    trendRes_ATR     := "25" 
//    trendRes         := "60"
//    Length           := 15
//    Multiplier       := 6
//    lengthTrend      := 24
//    scTrend          := 0.2
//    trendCombination := 0.4
//This shows 37% since the start of 2019, a few big wins with lots of small losses, much more trades than just with longs (46 compared to 2)









//[retA, posA] = trendATR(trendRes_ATR)
//plot(retA, color= color.blue , title="Second Trend Identifier")
//plot(retA, color= color.white , title="ATR Trend")

////////////////////////////////////////////////////////////////////////////////////////////
//THE TREND TRADER OVERLAY WHICH COLOURS THE BARS
avgTR      = wma(pine_atr(1, trendRes_ATR), Length)
highestC   = highest(Length)
lowestC    = lowest(Length)
hiLimit = highestC[1]-(avgTR[1] * Multiplier)
loLimit = lowestC[1]+(avgTR[1] * Multiplier)
closeA =security(syminfo.tickerid, trendRes_ATR, close)
ret=0.
ret := iff(closeA > hiLimit and closeA > loLimit, hiLimit, iff(closeA < loLimit and closeA < hiLimit, loLimit, nz(ret[1], 0)))
pos=0.
pos := iff(closeA > ret, 1, iff(closeA < ret, -1, nz(pos[1], 0))) 
//barcolor(pos == -1 ? color.red: pos == 1 ? color.green : color.blue )
//plot(ret, color= color.white , title="ATR Trend")
////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////
// === END BASE FUNCTIONS ===
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
//SET THE RESOLUTION AND INPUT CHARAGERISTICS FOR THE TREND INDICATOR
/////////////////////////////////////////////////////////////////////////
[bTrend, oscTrend] = functionTrend(trendRes,lengthTrend, scTrend)
cssTrend = oscTrend == 1 ? color.blue :#e65100
//plot(bTrend,"Trend Indicator", color=cssTrend[1],linewidth=3,transp=0)//bgcolor(oscLongs < 0 ? color.green : color.red, transp=82)
//plot(bLongs,"Trend Indicator", color=cssLongs,linewidth=3,transp=0)//bgcolor(oscLongs < 0 ? color.green : color.red, transp=82)
//alertcondition(change(oscTrend)>0,title="New Up Trend",message="New Up Trend")
//alertcondition(change(oscTrend)<0,title="New Down Trend",message="New Down Trend")
////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////
//TREND COMBINATION
///////////////////////////////////////////////////////////////////////////////////////////////
trendCombinationVal = (ret - bTrend) * trendCombination + bTrend//ret := iff(closeA > hiLimit and closeA > loLimit, hiLimit, iff(closeA < loLimit and closeA < hiLimit, loLimit, nz(ret[1], 0)))
posTrendCombination=0.
posTrendCombination := iff(closeA >= trendCombinationVal, 1, iff(closeA < trendCombinationVal, -1, nz(posTrendCombination[1], 0))) 
//barcolor(posTrendCombination[1] == -1 ? color.red: posTrendCombination[1] == 1 ? color.green : color.blue )
posTrendCombinationColor = posTrendCombination == 1 ? color.blue :#e65100
plot(trendCombinationVal, color= posTrendCombinationColor[2] ,linewidth=3 , title="Trend Combo")
barcolor(posTrendCombinationColor[1])
//////////////////////////////////////////////////////////////////////////////////////////////


// === INPUTS ===
//DEFAULT SETTINGS BELOW ARE FOR 15MIN CHART TIMEFRAME, FOR THE DAYILY TIMEFRAME ON CHART AND ALGO USE SMA 29PERIOD
//MA RESOLUTION IS SET TO PREDEFINED VALUES THERE ARE A LOT MISSING WHICH MIGHT BE VERY IMPORTANT CONSIDER HAVING AN INTEGER FOR THE MINUTES
stratRes    = input(defval = "1D", title = "Set MA Resolution ( note run alerts on 1min chart )", type = input.resolution)
basisType   = input(title="MA Type: ", defval="ALMA", options=["SMA", "EMA", "DEMA", "TEMA", "WMA", "VWMA", "SMMA", "HullMA", "LSMA", "ALMA"], type = input.string)
basisLen    = input(defval = 18, title = "MA Period", minval = 1)
offsetSigma = input(defval = 1, title = "Offset for LSMA / Sigma for ALMA (6 is large)", minval = 0)
offsetALMA  = input(defval = 0.88, title = "Alma Offset (between 0 and 1, 0.99 = resposive, 0.01 = smooth)", minval = 0, step = 0.01)
//ignoreSmallCrossOvers    = input(defval = 0, title = "Ignore Small Cross Over if $USD Less Than", minval = 0)
so = security(syminfo.tickerid, stratRes, open, lookahead=barmerge.lookahead_on)
sh = security(syminfo.tickerid, stratRes, high, lookahead=barmerge.lookahead_on)
sl1 = security(syminfo.tickerid, stratRes, low, lookahead=barmerge.lookahead_on)
sc = security(syminfo.tickerid, stratRes, close, lookahead=barmerge.lookahead_on)
br= so != so[1] and sc != sc[1] and sh != sh[1] and sl1 != sl1[1] 
col= so > sc ? color.red : color.green
a1=na(br) ? so : na
a2=na(br) ? sh : na
a3=na(br) ? sl1 : na
a4=na(br) ? sc : na
p1=plot(a1,"MTF Open", color.white, style = plot.style_linebr, transp = 100, editable = false)
p2=plot(a2,"MTF High", color.black, style=plot.style_linebr, transp = 100, editable = false)
p3=plot(a3,"MTF Low", color.black, style=plot.style_linebr, transp = 100, editable = false)
p4=plot(a4, "MTF Close", col, style=plot.style_linebr, transp = 100, editable = false)
fill(p1,p4,col, transp = 100, editable = false)
fill(p2,p3,color.silver, transp = 100, editable = false)
reso(exp, res) => security(syminfo.tickerid, res, exp, lookahead=barmerge.lookahead_on) 
closeSeries = reso(variant(basisType, close, basisLen, offsetSigma, offsetALMA), stratRes)
openSeries  = reso(variant(basisType, open, basisLen, offsetSigma, offsetALMA), stratRes) 


//6HOUR CHART 1 DAY TIMEFRAME BACK TO 2019
//SMA (19) , 360% 300%LONGS 60% SHORTS
//alma (38,,0.86) 560% (400% LONGS, 28%SHORTS)  20TRADES

//If there are any crossovers in a bar, how many are there
//Just one crossover might signify a change in trend for the given timeframe
//Lots of crossovers might signify a sidewards trend which this algo does not work well with
crossOverInBar = crossover(closeSeries, openSeries)
crossUnderInBar = crossunder(closeSeries, openSeries)
crossedOverOrUnderInBar = crossOverInBar or crossUnderInBar

trendState=false
trendState  := closeSeries > openSeries ? true : closeSeries < openSeries ? false : trendState[1]
//closePlot   = plot(closeSeries, title = "Close Line", color = #009900, linewidth = 2, style = plot.style_line, transp = 100, editable = false)
//openPlot    = plot(openSeries, title = "Open Line", color = #CC0000, linewidth = 2, style = plot.style_line, transp = 100, editable = false)
closePlot   = plot(closeSeries, title = "Close Line", color = #009900, linewidth = 2, style = plot.style_line)
openPlot    = plot(openSeries, title = "Open Line", color = #CC0000, linewidth = 2, style = plot.style_line)
closePlotU  = plot(trendState ? closeSeries : na, transp = 100, editable = false)
openPlotU   = plot(trendState ? openSeries : na, transp = 100, editable = false)
closePlotD  = plot(trendState ? na : closeSeries, transp = 100, editable = false)
openPlotD   = plot(trendState ? na : openSeries, transp = 100, editable = false)
fill(openPlotU, closePlotU, title = "MA Up Trend", color = #009900, transp = 0)
fill(openPlotD, closePlotD, title = "MA Down Trend", color = #CC0000, transp = 0)
// === /PLOTTING ===
coLor = closeSeries > openSeries ? color.green : color.red
hclose = plot(closeSeries, title="Close Series", color = coLor, linewidth = 1, transp = 100, editable = false)
hopen = plot(openSeries, title="Open Series", color = coLor, linewidth = 1, transp = 100, editable = false)

//longCond    = crossover(closeSeries, openSeries)
//shortCond   = crossunder(closeSeries, openSeries)


openLongCond = false
openShortCond = false
closeLongCond = false
closeShortCond = false

longCondLastBarClose = false
longCondLastBarClose := nz(longCondLastBarClose[1], false)
longCondThisBarClose = false
crossOver = false
if (is_newBar(stratRes))
    longCondThisBarClose := closeSeries[1] >= openSeries[1] //+ ignoreSmallCrossOvers
    if (longCondLastBarClose != longCondThisBarClose)
        crossOver := true
        longCondLastBarClose := longCondThisBarClose
longCondCrossOver = false
shortCondCrossOver = false
if (crossOver)
    longCondCrossOver := longCondThisBarClose
    shortCondCrossOver := not longCondThisBarClose
openLongCond := longCondCrossOver
openShortCond := shortCondCrossOver
closeLongCond := shortCondCrossOver
closeShortCond := longCondCrossOver

//ACTIVATE THIS TO STRATEGY TEST THE CORRELATION COMBINATION
//CORRELATION TREND
//longCondTrend=change(oscTrend)>0
//shortCondTrend=change(oscTrend)<0
//openLongCond := longCondTrend
//openShortCond := shortCondTrend
//closeLongCond := shortCondTrend
//closeShortCond := longCondTrend

////ACTIVATE THIS TO STRATEGY TEST THE ATR TREND
//longCondATRTrend = pos==1
//shortCondATRTrend = pos==-1
//openLongCond := longCondATRTrend
//openShortCond := shortCondATRTrend
//closeLongCond := shortCondATRTrend
//closeShortCond := longCondATRTrend

//ACTIVATE THIS TO STRATEGY TEST THE TREND COMBINATION
//TREND COMBINATION
//longCondTrendCombination = posTrendCombination==1
//shortCondTrendCombination = posTrendCombination==-1
//openLongCond := longCondTrendCombination
//openShortCond := shortCondTrendCombination
//closeLongCond := shortCondTrendCombination
//closeShortCond := longCondTrendCombination

//posTrendCombinationColor = posTrendCombination == 1 ? color.blue :#e65100


//Only get into a trade when both conditions are satisfied
//Get out of a trade when either conidition is satisfied




///////////////// LONG //////////////////
isEntry_Long = false
isEntry_Long := nz(isEntry_Long[1], false)
isExit_Long = false
isExit_Long := nz(isExit_Long[1], false)
entry_long = not isEntry_Long[1] and openLongCond
exit_long = not isExit_Long and closeLongCond
if (entry_long)
    isEntry_Long := true
    isExit_Long := false
if (exit_long)
    isEntry_Long := false
    isExit_Long := true
entry_long := entry_long 
exit_long := exit_long 
///////////// SHORT ///////////////////////////
isEntry_Short = false
isEntry_Short := nz(isEntry_Short[1], false)
isExit_Short = false
isExit_Short := nz(isExit_Short[1], false)
entry_short = not isEntry_Short[1] and openShortCond 
exit_short = not isExit_Short and closeShortCond 
if (entry_short)
    isEntry_Short := true
    isExit_Short := false
if (exit_short)
    isEntry_Short := false
    isExit_Short := true
entry_short := entry_short 
exit_short := exit_short 
//////////////////////////////////////////////////




//plotshape(series=entry_long, text="OpenLong", style=shape.triangleup, location=location.belowbar, color=color.white, size=size.small)
//plotshape(series=exit_long, text="ExitLong",style=shape.triangledown, location=location.belowbar, color=color.white, size=size.small)
//plotshape(series=entry_short, text="OpenShort", style=shape.triangledown, location=location.abovebar, color=color.white, size=size.small)
//plotshape(series=exit_short, text="ExitShort",style=shape.triangleup, location=location.abovebar, color=color.white, size=size.small)


//Alerts are for the study mode
alertcondition(entry_long, title="Enter Long")
alertcondition(entry_short, title="Enter Short")
alertcondition(exit_long, title="Exit Long")
alertcondition(exit_short, title="Exit Short")

/////////////////////////////////////////////////////////////
//TO TEST THE STRATEGY
///////////////////////////////////////////////////////////
/// PERIOD - This is for the strategy mode/// 
testStartYear = input(2019, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month") 
testStartDay = input(1, "Backtest Start Day") 
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0) 
testStopYear = input(2020, "Backtest Stop Year") 
testStopMonth = input(12, "Backtest Stop Month") 
testStopDay = input(31, "Backtest Stop Day") 
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0) 
testPeriod() =>  true

includeLongTrades=input(title="Include Long Trades", defval = true, type=input.bool)
includeShortTrades=input(title="Include Short Trades", defval = false, type=input.bool)
entry_long := entry_long and includeLongTrades
exit_long := exit_long and includeLongTrades
entry_short := entry_short and includeShortTrades
exit_short := exit_short and includeShortTrades
//if testPeriod() 
//    if (entry_long)
//        strategy.close("ENTRY_SHORT", comment="close short")
//        strategy.entry("ENTRY_LONG", strategy.long, oca_name="oca1",  comment="open long")
//    if (exit_long)
//        strategy.close("ENTRY_LONG", comment="close long")
//    if (entry_short)
//        strategy.close("ENTRY_LONG", comment="close long")
//        strategy.entry("ENTRY_SHORT", strategy.short, oca_name="oca1",  comment="open short")
//    if (exit_short)
//        strategy.close("ENTRY_SHORT", comment="close short")




if testPeriod() 
    if (entry_long)
        strategy.close("ENTRY_SHORT", comment="close short")
        strategy.entry("ENTRY_LONG", strategy.long, oca_name="oca1",  comment="open long")
    if (exit_long)
        strategy.close("ENTRY_LONG", comment="close long")
    if (entry_short)
        strategy.close("ENTRY_LONG", comment="close long")
        strategy.entry("ENTRY_SHORT", strategy.short, oca_name="oca1",  comment="open short")
    if (exit_short)
        strategy.close("ENTRY_SHORT", comment="close short")
//STOP LOSS AND TAKE PROFIT
//if (close  < long_stop_level or close  > long_take_level)
//    strategy.close("ENTRY_LONG", comment="close long SL/TP")
//if (close  > short_stop_level or close  < short_take_level)
//    strategy.close("ENTRY_SHORT", comment="close short SL/TP")


//closeNowA =0.
//closeNow = security(syminfo.tickerid, "1", close)
//closeNowA := closeNow
//if (is_newBar("1")==false)
//    closeNowA := closeNowA[1]
//plot (closeNowA)
////if (openLongCond)
//if (closeNowA  < long_stop_level or closeNowA  > long_take_level)
//    strategy.close("ENTRY_LONG", comment="close long SL/TP")
////if (openShortCond)
//if (closeNowA  > short_stop_level or closeNowA  < short_take_level)
//    strategy.close("ENTRY_SHORT", comment="close short SL/TP")




//if (strategy.position_avg_price)
//strategy.entry(id="Long", long=true, when=entry_long)
//strategy.exit("Take Profit/ Stop Loss","Long", stop=long_stop_level, limit=long_take_level)
//strategy.close(id="Long", when=exit_long, comment = "ExitLong TP/SL")
//strategy.entry(id="Short", short=true, when=entry_short)
//strategy.exit("Take Profit/ Stop Loss","Long", stop=short_stop_level, limit=short_take_level)
//strategy.close(id="Short", when=exit_short, comment = "ExitShort TP/SL")


//if testPeriod() 
//    if (entry_long)
//        strategy.close("ENTRY_SHORT", comment="josef.tainsh@gmail.com_EXIT-SHORT_BINANCE-FUTURES_BTC/USDT_josef.tainsh@gmail.com-BOT-NAME_3M")
//        strategy.entry("ENTRY_LONG", strategy.long, oca_name="oca1",  comment="josef.tainsh@gmail.com_ENTER-LONG_BINANCE-FUTURES_BTC/USDT_josef.tainsh@gmail.com-BOT-NAME_3M")
//    if (exit_long)
//        strategy.close("ENTRY_LONG", comment="josef.tainsh@gmail.com_EXIT-LONG_BINANCE-FUTURES_BTC/USDT_josef.tainsh@gmail.com-BOT-NAME_3M")
//    if (entry_short)
//        strategy.close("ENTRY_LONG", comment="josef.tainsh@gmail.com_EXIT-LONG_BINANCE-FUTURES_BTC/USDT_josef.tainsh@gmail.com-BOT-NAME_3M")
//        strategy.entry("ENTRY_SHORT", strategy.short, oca_name="oca1",  comment="josef.tainsh@gmail.com_ENTER-SHORT_BINANCE-FUTURES_BTC/USDT_josef.tainsh@gmail.com-BOT-NAME_3M")
//    if (exit_short)
//        strategy.close("ENTRY_SHORT", comment="josef.tainsh@gmail.com_EXIT-SHORT_BINANCE-FUTURES_BTC/USDT_josef.tainsh@gmail.com-BOT-NAME_3M")
//    if (close  < long_stop_level or close  > long_take_level)
//        strategy.close("ENTRY_LONG", comment="josef.tainsh@gmail.com_EXIT-LONG_BINANCE-FUTURES_BTC/USDT_josef.tainsh@gmail.com-BOT-NAME_3M")
//    if (close  > short_stop_level or close  < short_take_level)
//        strategy.close("ENTRY_SHORT", comment="josef.tainsh@gmail.com_EXIT-SHORT_BINANCE-FUTURES_BTC/USDT_josef.tainsh@gmail.com-BOT-NAME_3M")



//strategy.cancel(id="ENTRY_LONG")

```

> Detail

https://www.fmz.com/strategy/433008

> Last Modified

2023-11-23 15:26:25
