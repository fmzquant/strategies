
> Name

三重移动平均线交易策略Triple-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17fd4f7cc610fcfa283.png)
[trans]

### 概述

该策略是一种基于三条移动平均线的趋势跟踪交易策略。它同时采用三条不同周期的移动平均线进行多空决策,属于典型的跟踪趋势型策略。

### 策略原理

1. 该策略使用3条移动平均线:MA1、MA2和MA3,3条移动平均线周期由用户设置,一般设置为MA1 < MA2 < MA3,例如MA1为50周期,MA2为100周期,MA3为200周期。

2. 策略以MA1为主要交易决策参考线。当短周期MA1上穿长周期MA2或MA3时,做多;当MA1下穿MA2或MA3时,做空。

3. 策略可以选择只交易MA1和MA2的交叉,或只交易MA1和MA3的交叉,或同时交易两个交叉。

4. 交叉信号出现时,使用市价单开仓。止盈止损设置为close的一定百分比,例如30%止盈,15%止损。

5. 策略优化方面,可以调整MA线的周期参数,调整止盈止损百分比,增加其他指标过滤信号等。

### 优势分析

1. 使用多组移动平均线进行决策,可以有效过滤假突破。

2. 采用不同周期MA组合,可以在趋势中动态调整仓位,实现趋势跟踪。

3. 可灵活选择只交易Golden Cross或只交易Death Cross或两者都交易,交易方式多样。 

4. 停损机制可以有效控制单笔损失。

### 风险分析

1. 跟踪趋势型策略,在震荡行情中容易止损。

2. 若MA周期设置不当,可能出现频繁交易,降低胜率。

3. 在突破失败后,若不及时止损,可能带来较大亏损。

4. 若止盈止损设置过于宽松,单笔盈亏可能过大。

### 优化方向

1. 优化MA的参数,找到最佳的参数组合。

2. 增加其他指标进行过滤,优化入场时机。例如MACD,KDJ等。

3. 优化止盈止损点,使策略收益风险比优化。

4. 增加仓位管理,例如固定数量开仓或资金管理。

5. 针对突破增加止损线滑点,优化止损策略。

### 总结

本策略整体是一个典型的趋势跟踪策略,通过多组MA交叉进行判断,属于一个相对稳定的趋势跟踪策略。可以通过参数优化,指标过滤,仓位管理等方法进行进一步提升。但核心思路简单清晰,适合初学者学习和实践。如果参数优化得当,在趋势明显的市场中,该策略可以获得较稳定的盈利。

||


### Overview

This strategy is a trend-following trading strategy based on three moving averages. It uses three moving averages with different periods for long and short decisions, which is a typical trend tracking strategy.

### Strategy Logic

1. The strategy uses 3 moving averages: MA1, MA2 and MA3. The periods of the 3 moving averages are set by the user, generally MA1 < MA2 < MA3, for example, MA1 is 50 periods, MA2 is 100 periods, and MA3 is 200 periods.

2. The strategy mainly references MA1 for trading decisions. When the short period MA1 crosses over the long period MA2 or MA3, go long; when MA1 crosses below MA2 or MA3, go short.

3. The strategy can choose to trade only the crossover of MA1 and MA2, or only the crossover of MA1 and MA3, or trade both crossovers. 

4. When a crossover signal occurs, open a position using market order. The take profit and stop loss are set as a certain percentage of the close price, such as 30% take profit and 15% stop loss.

5. For optimization, the periods of the MA lines can be adjusted, the percentages of take profit and stop loss can be tuned, other indicators can be added to filter the signals, etc.

### Advantage Analysis

1. Using multiple moving averages for decision making can effectively filter false breakouts.

2. Adopting MA combinations with different periods can dynamically adjust positions in the trend and achieve trend tracking.

3. It is flexible to only trade Golden Cross, or only Death Cross, or both, with diverse trading methods.

4. The stop loss mechanism can effectively control single loss.

### Risk Analysis

1. As a trend tracking strategy, it is prone to stop loss in range-bound markets.

2. If MA periods are improperly set, it may lead to frequent trading and lower win rate. 

3. If failed to cut loss in time after failed breakout, it may lead to large loss.

4. If take profit and stop loss settings are too loose, single profit or loss may be too large.

### Optimization Directions

1. Optimize the parameters of MA to find the best parameter combination.

2. Add other indicators to filter the entry timing, such as MACD, KDJ etc.

3. Optimize take profit and stop loss points to improve profit-risk ratio of the strategy.

4. Add position sizing like fixed quantity per order or money management. 

5. Add stop loss offset for breakouts to optimize the stop loss strategy.

### Summary

In general this is a typical trend-following strategy by judging the crossover of multiple MA lines. It is a relatively stable trend tracking strategy. Further improvements can be made through parameter tuning, indicator filtering, position sizing etc. But the core idea is simple and clear, suitable for beginners to learn and practice. If parameters are properly optimized, it can achieve steady profits in strong trending markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|MA1 Period|
|v_input_2|0|MA1 Type: SMA|RMA|EMA|WMA|HMA|DEMA|TEMA|VWMA|
|v_input_3_close|0|MA1 Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|0|MA1 Resolution: 00 Current|01 1m|02 3m|03 5m|04 15m|05 30m|06 45m|07 1h|08 2h|09 3h|10 4h|11 1D|12 1W|13 1M|
|v_input_5|true|MA1 Visible|
|v_input_6|100|MA2 Period|
|v_input_7|0|MA2 Type: SMA|RMA|EMA|WMA|HMA|DEMA|TEMA|VWMA|
|v_input_8_close|0|MA2 Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|0|MA2 Resolution: 00 Current|01 1m|02 3m|03 5m|04 15m|05 30m|06 45m|07 1h|08 2h|09 3h|10 4h|11 1D|12 1W|13 1M|
|v_input_10|true|MA2 Visible|
|v_input_11|200|MA3 Period|
|v_input_12|0|MA3 Type: SMA|RMA|EMA|WMA|HMA|DEMA|TEMA|VWMA|
|v_input_13_close|0|MA3 Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_14|0|MA3 Resolution: 00 Current|01 1m|02 3m|03 5m|04 15m|05 30m|06 45m|07 1h|08 2h|09 3h|10 4h|11 1D|12 1W|13 1M|
|v_input_15|true|MA3 Visible|
|v_input_16|false|Show Crosses|
|v_input_17|0|Forecast Bias: Neutral|Bullish|Bearish|
|v_input_18|14|Forecast Bias Period|
|v_input_19|true|Forecast Bias Magnitude|
|v_input_20|true|Show Forecasts|
|v_input_21|true|Show Ribbons|
|v_input_22|true|Trade MA 1-2 Crosses|
|v_input_23|true|Trade MA 1-3 Crosses|
|v_input_24|true|Trade MA 2-3 Crosses|
|v_input_25|30|Take Profit Percent|
|v_input_26|15|Stop Loss Percent|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-11-01 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

//
// Pine Script v4
// @author BigBitsIO
// Script Library: https://www.tradingview.com/u/BigBitsIO/#published-scripts
//

// study(title, shorttitle, overlay, format, precision)
// https://www.tradingview.com/pine-script-reference/#fun_strategy  
strategy(shorttitle = "TManyMA Strategy - STA - Stops", title="Triple Many Moving Averages", overlay=true, pyramiding=1, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// MA#Period is a variable used to store the indicator lookback period.  In this case, from the input.
// input - https://www.tradingview.com/pine-script-docs/en/v4/annotations/Script_inputs.html
MA1Period = input(50, title="MA1 Period", minval=1, step=1)
MA1Type = input(title="MA1 Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "DEMA", "TEMA", "VWMA"])
MA1Source = input(title="MA1 Source", type=input.source, defval=close)
MA1Resolution = input(title="MA1 Resolution", defval="00 Current", options=["00 Current", "01 1m", "02 3m", "03 5m", "04 15m", "05 30m", "06 45m", "07 1h", "08 2h", "09 3h", "10 4h", "11 1D", "12 1W", "13 1M"])
MA1Visible = input(title="MA1 Visible", type=input.bool, defval=true) // Will automatically hide crossBovers containing this MA

MA2Period = input(100, title="MA2 Period", minval=1, step=1)
MA2Type = input(title="MA2 Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "DEMA", "TEMA", "VWMA"])
MA2Source = input(title="MA2 Source", type=input.source, defval=close)
MA2Resolution = input(title="MA2 Resolution", defval="00 Current", options=["00 Current", "01 1m", "02 3m", "03 5m", "04 15m", "05 30m", "06 45m", "07 1h", "08 2h", "09 3h", "10 4h", "11 1D", "12 1W", "13 1M"])
MA2Visible = input(title="MA2 Visible", type=input.bool, defval=true) // Will automatically hide crossovers containing this MA

MA3Period = input(200, title="MA3 Period", minval=1, step=1)
MA3Type = input(title="MA3 Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "DEMA", "TEMA", "VWMA"])
MA3Source = input(title="MA3 Source", type=input.source, defval=close)
MA3Resolution = input(title="MA3 Resolution", defval="00 Current", options=["00 Current", "01 1m", "02 3m", "03 5m", "04 15m", "05 30m", "06 45m", "07 1h", "08 2h", "09 3h", "10 4h", "11 1D", "12 1W", "13 1M"])
MA3Visible = input(title="MA3 Visible", type=input.bool, defval=true) // Will automatically hide crossovers containing this MA

ShowCrosses = input(title="Show Crosses", type=input.bool, defval=false)

ForecastBias = input(title="Forecast Bias", defval="Neutral", options=["Neutral", "Bullish", "Bearish"])
ForecastBiasPeriod = input(14, title="Forecast Bias Period")
ForecastBiasMagnitude = input(1, title="Forecast Bias Magnitude", minval=0.25, maxval=20, step=0.25)
ShowForecasts = input(title="Show Forecasts", type=input.bool, defval=true)

ShowRibbons = input(title="Show Ribbons", type=input.bool, defval=true)

TradeMA12Crosses = input(title="Trade MA 1-2 Crosses", type=input.bool, defval=true)
TradeMA13Crosses = input(title="Trade MA 1-3 Crosses", type=input.bool, defval=true)
TradeMA23Crosses = input(title="Trade MA 2-3 Crosses", type=input.bool, defval=true)

TakeProfitPercent = input(30, title="Take Profit Percent", minval=0.01, step=0.5)
StopLossPercent = input(15, title="Stop Loss Percent", minval=0.01, step=0.5)


// MA# is a variable used to store the actual moving average value.
// if statements - https://www.tradingview.com/pine-script-reference/#op_if
// MA functions - https://www.tradingview.com/pine-script-reference/ (must search for appropriate MA)
// custom functions in  pine - https://www.tradingview.com/wiki/Declaring_Functions
ma(MAType, MASource, MAPeriod) =>
    if MAType == "SMA"
        sma(MASource, MAPeriod)
    else
        if MAType == "EMA"
            ema(MASource, MAPeriod)
        else
            if MAType == "WMA"
                wma(MASource, MAPeriod)
            else
                if MAType == "RMA"
                    rma(MASource, MAPeriod)
                else
                    if MAType == "HMA"
                        wma(2*wma(MASource, MAPeriod/2)-wma(MASource, MAPeriod), round(sqrt(MAPeriod)))
                    else
                        if MAType == "DEMA"
                            e = ema(MASource, MAPeriod)
                            2 * e - ema(e, MAPeriod)
                        else
                            if MAType == "TEMA"
                                e = ema(MASource, MAPeriod)
                                3 * (e - ema(e, MAPeriod)) + ema(ema(e, MAPeriod), MAPeriod)
                            else
                                if MAType == "VWMA"
                                    vwma(MASource, MAPeriod)
                                
res(MAResolution) =>
    if MAResolution == "00 Current"
        timeframe.period
    else
        if MAResolution == "01 1m"
            "1"
        else
            if MAResolution == "02 3m"
                "3"
            else
                if MAResolution == "03 5m"
                    "5"
                else
                    if MAResolution == "04 15m"
                        "15"
                    else
                        if MAResolution == "05 30m"
                            "30"
                        else
                            if MAResolution == "06 45m"
                                "45"
                            else
                                if MAResolution == "07 1h"
                                    "60"
                                else
                                    if MAResolution == "08 2h"
                                        "120"
                                    else
                                        if MAResolution == "09 3h"
                                            "180"
                                        else
                                            if MAResolution == "10 4h"
                                                "240"
                                            else
                                                if MAResolution == "11 1D"
                                                    "1D"
                                                else
                                                    if MAResolution == "12 1W"
                                                        "1W"
                                                    else
                                                        if MAResolution == "13 1M"
                                                            "1M"

// https://www.tradingview.com/pine-script-reference/#fun_request.security
MA1 = request.security(syminfo.tickerid, res(MA1Resolution), ma(MA1Type, MA1Source, MA1Period))     
MA2 = request.security(syminfo.tickerid, res(MA2Resolution), ma(MA2Type, MA2Source, MA2Period))
MA3 = request.security(syminfo.tickerid, res(MA3Resolution), ma(MA3Type, MA3Source, MA3Period))   
                    
// Plotting crossover/unders for all combinations of crosses
// Crossovers no longer detected in label code, they need to be re-used for strategy - crosses and visibility must be set
MA12Crossover = MA1Visible and MA2Visible and crossover(MA1, MA2)
MA12Crossunder = MA1Visible and MA2Visible and crossunder(MA1, MA2)
MA13Crossover = MA1Visible and MA3Visible and crossover(MA1, MA3)
MA13Crossunder = MA1Visible and MA3Visible and crossunder(MA1, MA3)
MA23Crossover = MA2Visible and MA3Visible and crossover(MA2, MA3)
MA23Crossunder = MA2Visible and MA3Visible and crossunder(MA2, MA3)

// https://www.tradingview.com/pine-script-reference/v4/#fun_label%7Bdot%7Dnew
if ShowCrosses and MA12Crossunder
    lun1 = label.new(bar_index, na, tostring(MA1Period)+' '+MA1Type+' crossed under '+tostring(MA2Period)+' '+MA2Type, 
      color=color.red, 
      textcolor=color.red,
      style=label.style_xcross, size=size.small)
    label.set_y(lun1, MA1)
if ShowCrosses and MA12Crossover
    lup1 = label.new(bar_index, na, tostring(MA1Period)+' '+MA1Type+' crossed over '+tostring(MA2Period)+' '+MA2Type, 
      color=color.green, 
      textcolor=color.green,
      style=label.style_xcross, size=size.small)
    label.set_y(lup1, MA1)
if ShowCrosses and MA13Crossunder
    lun2 = label.new(bar_index, na, tostring(MA1Period)+' '+MA1Type+' crossed under '+tostring(MA3Period)+' '+MA3Type, 
      color=color.red, 
      textcolor=color.red,
      style=label.style_xcross, size=size.small)
    label.set_y(lun2, MA1)
if ShowCrosses and MA13Crossover
    lup2 = label.new(bar_index, na, tostring(MA1Period)+' '+MA1Type+' crossed over '+tostring(MA3Period)+' '+MA3Type, 
      color=color.green, 
      textcolor=color.green,
      style=label.style_xcross, size=size.small)
    label.set_y(lup2, MA1)
if ShowCrosses and MA23Crossunder
    lun3 = label.new(bar_index, na, tostring(MA2Period)+' '+MA2Type+' crossed under '+tostring(MA3Period)+' '+MA3Type, 
      color=color.red, 
      textcolor=color.red,
      style=label.style_xcross, size=size.small)
    label.set_y(lun3, MA2)
if ShowCrosses and MA23Crossover
    lup3 = label.new(bar_index, na, tostring(MA2Period)+' '+MA2Type+' crossed over '+tostring(MA3Period)+' '+MA3Type, 
      color=color.green, 
      textcolor=color.green,
      style=label.style_xcross, size=size.small)
    label.set_y(lup3, MA2) 

// plot - This will draw the information on the chart
// plot - https://www.tradingview.com/pine-script-docs/en/v4/annotations/plot_annotation.html
plot(MA1Visible ? MA1 : na, color=color.green, linewidth=2, title="MA1")
plot(MA2Visible ? MA2 : na, color=color.yellow, linewidth=3, title="MA2")
plot(MA3Visible ? MA3 : na, color=color.red, linewidth=4, title="MA3")


// Forecasting - forcasted prices are calculated using our MAType and MASource for the MAPeriod - the last X candles.
//              it essentially replaces the oldest X candles, with the selected source * X candles
// Bias - We'll add an "adjustment" for each additional candle being forecasted based on ATR of the previous X candles
// custom functions in  pine - https://www.tradingview.com/wiki/Declaring_Functions
bias(Bias, BiasPeriod) =>
    if Bias == "Neutral"
        0
    else
        if Bias == "Bullish"
            (atr(BiasPeriod) * ForecastBiasMagnitude)
        else
            if Bias == "Bearish"
                ((atr(BiasPeriod)  * ForecastBiasMagnitude) * -1) // multiplying by -1 to make it a negative, bearish bias


// Note - Can not show forecasts on different resolutions at the moment, x-axis is an issue
Bias = bias(ForecastBias, ForecastBiasPeriod) // 14 is default atr period
MA1Forecast1 = (request.security(syminfo.tickerid, res(MA1Resolution), ma(MA1Type, MA1Source, MA1Period - 1)) * (MA1Period - 1) + ((MA1Source * 1) + (Bias * 1))) / MA1Period 
MA1Forecast2 = (request.security(syminfo.tickerid, res(MA1Resolution), ma(MA1Type, MA1Source, MA1Period - 2)) * (MA1Period - 2) + ((MA1Source * 2) + (Bias * 2))) / MA1Period
MA1Forecast3 = (request.security(syminfo.tickerid, res(MA1Resolution), ma(MA1Type, MA1Source, MA1Period - 3)) * (MA1Period - 3) + ((MA1Source * 3) + (Bias * 3))) / MA1Period
MA1Forecast4 = (request.security(syminfo.tickerid, res(MA1Resolution), ma(MA1Type, MA1Source, MA1Period - 4)) * (MA1Period - 4) + ((MA1Source * 4) + (Bias * 4))) / MA1Period
MA1Forecast5 = (request.security(syminfo.tickerid, res(MA1Resolution), ma(MA1Type, MA1Source, MA1Period - 5)) * (MA1Period - 5) + ((MA1Source * 5) + (Bias * 5))) / MA1Period


plot(MA1Resolution == "00 Current" and ShowForecasts and MA1Visible ? MA1Forecast1 : na, color=color.green, linewidth=1, style=plot.style_circles, title="MA1 Forecast 1", offset=1, show_last=1)
plot(MA1Resolution == "00 Current" and ShowForecasts and MA1Visible ? MA1Forecast2 : na, color=color.green, linewidth=1, style=plot.style_circles, title="MA1 Forecast 2", offset=2, show_last=1)
plot(MA1Resolution == "00 Current" and ShowForecasts and MA1Visible ? MA1Forecast3 : na, color=color.green, linewidth=1, style=plot.style_circles, title="MA1 Forecast 3", offset=3, show_last=1)
plot(MA1Resolution == "00 Current" and ShowForecasts and MA1Visible ? MA1Forecast4 : na, color=color.green, linewidth=1, style=plot.style_circles, title="MA1 Forecast 4", offset=4, show_last=1)
plot(MA1Resolution == "00 Current" and ShowForecasts and MA1Visible ? MA1Forecast5 : na, color=color.green, linewidth=1, style=plot.style_circles, title="MA1 Forecast 5", offset=5, show_last=1)


MA2Forecast1 = (request.security(syminfo.tickerid, res(MA2Resolution), ma(MA2Type, MA2Source, MA2Period - 1)) * (MA2Period - 1) + ((MA1Source * 1) + (Bias * 1))) / MA2Period
MA2Forecast2 = (request.security(syminfo.tickerid, res(MA2Resolution), ma(MA2Type, MA2Source, MA2Period - 2)) * (MA2Period - 2) + ((MA1Source * 2) + (Bias * 2))) / MA2Period
MA2Forecast3 = (request.security(syminfo.tickerid, res(MA2Resolution), ma(MA2Type, MA2Source, MA2Period - 3)) * (MA2Period - 3) + ((MA1Source * 3) + (Bias * 3))) / MA2Period
MA2Forecast4 = (request.security(syminfo.tickerid, res(MA2Resolution), ma(MA2Type, MA2Source, MA2Period - 4)) * (MA2Period - 4) + ((MA1Source * 4) + (Bias * 4))) / MA2Period
MA2Forecast5 = (request.security(syminfo.tickerid, res(MA2Resolution), ma(MA2Type, MA2Source, MA2Period - 5)) * (MA2Period - 5) + ((MA1Source * 5) + (Bias * 5))) / MA2Period

plot(MA2Resolution == "00 Current" and ShowForecasts and MA2Visible ? MA2Forecast1 : na, color=color.yellow, linewidth=1, style=plot.style_circles, title="MA2 Forecast 1", offset=1, show_last=1)
plot(MA2Resolution == "00 Current" and ShowForecasts and MA2Visible ? MA2Forecast2 : na, color=color.yellow, linewidth=1, style=plot.style_circles, title="MA2 Forecast 2", offset=2, show_last=1)
plot(MA2Resolution == "00 Current" and ShowForecasts and MA2Visible ? MA2Forecast3 : na, color=color.yellow, linewidth=1, style=plot.style_circles, title="MA2 Forecast 3", offset=3, show_last=1)
plot(MA2Resolution == "00 Current" and ShowForecasts and MA2Visible ? MA2Forecast4 : na, color=color.yellow, linewidth=1, style=plot.style_circles, title="MA2 Forecast 4", offset=4, show_last=1)
plot(MA2Resolution == "00 Current" and ShowForecasts and MA2Visible ? MA2Forecast5 : na, color=color.yellow, linewidth=1, style=plot.style_circles, title="MA2 Forecast 5", offset=5, show_last=1)


MA3Forecast1 = (request.security(syminfo.tickerid, res(MA3Resolution), ma(MA3Type, MA3Source, MA3Period - 1)) * (MA3Period - 1) + ((MA1Source * 1) + (Bias * 1))) / MA3Period
MA3Forecast2 = (request.security(syminfo.tickerid, res(MA3Resolution), ma(MA3Type, MA3Source, MA3Period - 2)) * (MA3Period - 2) + ((MA1Source * 2) + (Bias * 2))) / MA3Period
MA3Forecast3 = (request.security(syminfo.tickerid, res(MA3Resolution), ma(MA3Type, MA3Source, MA3Period - 3)) * (MA3Period - 3) + ((MA1Source * 3) + (Bias * 3))) / MA3Period
MA3Forecast4 = (request.security(syminfo.tickerid, res(MA3Resolution), ma(MA3Type, MA3Source, MA3Period - 4)) * (MA3Period - 4) + ((MA1Source * 4) + (Bias * 4))) / MA3Period
MA3Forecast5 = (request.security(syminfo.tickerid, res(MA3Resolution), ma(MA3Type, MA3Source, MA3Period - 5)) * (MA3Period - 5) + ((MA1Source * 5) + (Bias * 5))) / MA3Period

plot(MA3Resolution == "00 Current" and ShowForecasts and MA3Visible ? MA3Forecast1 : na, color=color.red, linewidth=1, style=plot.style_circles, title="MA3 Forecast 1", offset=1, show_last=1)
plot(MA3Resolution == "00 Current" and ShowForecasts and MA3Visible ? MA3Forecast2 : na, color=color.red, linewidth=1, style=plot.style_circles, title="MA3 Forecast 2", offset=2, show_last=1)
plot(MA3Resolution == "00 Current" and ShowForecasts and MA3Visible ? MA3Forecast3 : na, color=color.red, linewidth=1, style=plot.style_circles, title="MA3 Forecast 3", offset=3, show_last=1)
plot(MA3Resolution == "00 Current" and ShowForecasts and MA3Visible ? MA3Forecast4 : na, color=color.red, linewidth=1, style=plot.style_circles, title="MA3 Forecast 4", offset=4, show_last=1)
plot(MA3Resolution == "00 Current" and ShowForecasts and MA3Visible ? MA3Forecast5 : na, color=color.red, linewidth=1, style=plot.style_circles, title="MA3 Forecast 5", offset=5, show_last=1)


// Ribbon related code
// For Ribbons to work - they must use the same MAType, MAResolution and MASource.  This is to ensure the ribbons are fair between one to the other.
// Ribbons also will usually look better if MA1Period < MA2Period and MA2Period < MA3Period

// custom functions in  pine - https://www.tradingview.com/wiki/Declaring_Functions
// This function is used to calculate the period to be used on a ribbon based on existing MAs
rperiod(P1, P2, Step, Ribbons) =>
    ((abs(P1 - P2)) / (Ribbons + 1) * Step) + min(P1, P2)
    // divide by +1 so that 5 lines can show.  Divide by 5 and one line shows up on another MA

// MA1-MA2
Ribbon1 = request.security(syminfo.tickerid, res(MA1Resolution), ma(MA1Type, MA1Source, rperiod(MA1Period, MA2Period, 1, 5)))
Ribbon2 = request.security(syminfo.tickerid, res(MA1Resolution), ma(MA1Type, MA1Source, rperiod(MA1Period, MA2Period, 2, 5)))
Ribbon3 = request.security(syminfo.tickerid, res(MA1Resolution), ma(MA1Type, MA1Source, rperiod(MA1Period, MA2Period, 3, 5)))
Ribbon4 = request.security(syminfo.tickerid, res(MA1Resolution), ma(MA1Type, MA1Source, rperiod(MA1Period, MA2Period, 4, 5)))
Ribbon5 = request.security(syminfo.tickerid, res(MA1Resolution), ma(MA1Type, MA1Source, rperiod(MA1Period, MA2Period, 5, 5)))

plot(ShowRibbons and MA1Type == MA2Type and MA1Resolution == MA2Resolution and MA1Source == MA2Source ? Ribbon1 : na, color=color.green, linewidth=1, style=plot.style_line, title="Ribbon1", transp=90)
plot(ShowRibbons and MA1Type == MA2Type and MA1Resolution == MA2Resolution and MA1Source == MA2Source ? Ribbon2 : na, color=color.green, linewidth=1, style=plot.style_line, title="Ribbon2", transp=85)
plot(ShowRibbons and MA1Type == MA2Type and MA1Resolution == MA2Resolution and MA1Source == MA2Source ? Ribbon3 : na, color=color.green, linewidth=1, style=plot.style_line, title="Ribbon3", transp=80)
plot(ShowRibbons and MA1Type == MA2Type and MA1Resolution == MA2Resolution and MA1Source == MA2Source ? Ribbon4 : na, color=color.yellow, linewidth=1, style=plot.style_line, title="Ribbon4", transp=75)
plot(ShowRibbons and MA1Type == MA2Type and MA1Resolution == MA2Resolution and MA1Source == MA2Source ? Ribbon5 : na, color=color.yellow, linewidth=1, style=plot.style_line, title="Ribbon5", transp=70)

// MA2-MA3
Ribbon6 = request.security(syminfo.tickerid, res(MA2Resolution), ma(MA2Type, MA2Source, rperiod(MA2Period, MA3Period, 1, 5)))
Ribbon7 = request.security(syminfo.tickerid, res(MA2Resolution), ma(MA2Type, MA2Source, rperiod(MA2Period, MA3Period, 2, 5)))
Ribbon8 = request.security(syminfo.tickerid, res(MA2Resolution), ma(MA2Type, MA2Source, rperiod(MA2Period, MA3Period, 3, 5)))
Ribbon9 = request.security(syminfo.tickerid, res(MA2Resolution), ma(MA2Type, MA2Source, rperiod(MA2Period, MA3Period, 4, 5)))
Ribbon10 = request.security(syminfo.tickerid, res(MA2Resolution), ma(MA2Type, MA2Source, rperiod(MA2Period, MA3Period, 5, 5)))
        
plot(ShowRibbons and MA2Type == MA3Type and MA2Resolution == MA3Resolution and MA2Source == MA3Source ? Ribbon6 : na, color=color.yellow, linewidth=1, style=plot.style_line, title="Ribbon6", transp=70)
plot(ShowRibbons and MA2Type == MA3Type and MA2Resolution == MA3Resolution and MA2Source == MA3Source ? Ribbon7 : na, color=color.yellow, linewidth=1, style=plot.style_line, title="Ribbon7", transp=75)
plot(ShowRibbons and MA2Type == MA3Type and MA2Resolution == MA3Resolution and MA2Source == MA3Source ? Ribbon8 : na, color=color.red, linewidth=1, style=plot.style_line, title="Ribbon8", transp=80)
plot(ShowRibbons and MA2Type == MA3Type and MA2Resolution == MA3Resolution and MA2Source == MA3Source ? Ribbon9 : na, color=color.red, linewidth=1, style=plot.style_line, title="Ribbon9", transp=85)
plot(ShowRibbons and MA2Type == MA3Type and MA2Resolution == MA3Resolution and MA2Source == MA3Source ? Ribbon10 : na, color=color.red, linewidth=1, style=plot.style_line, title="Ribbon10", transp=90)

// Strategy Specific
ProfitTarget = (close * (TakeProfitPercent / 100)) / syminfo.mintick
LossTarget = (close * (StopLossPercent / 100)) / syminfo.mintick

if MA12Crossover and TradeMA12Crosses
    //https://www.tradingview.com/pine-script-reference/#fun_strategy{dot}entry
    strategy.entry("1 over 2", true) // buy by market
    strategy.exit("profit or loss", "1 over 2", profit = ProfitTarget, loss = LossTarget)
if MA12Crossunder and TradeMA12Crosses
    //https://www.tradingview.com/pine-script-reference/#fun_strategy{dot}close
    strategy.close("1 over 2") // sell by market
    
if MA13Crossover and TradeMA13Crosses
    //https://www.tradingview.com/pine-script-reference/#fun_strategy{dot}entry
    strategy.entry("1 over 3", true) // buy by market
    strategy.exit("profit or loss", "1 over 3", profit = ProfitTarget, loss = LossTarget)
if MA13Crossunder and TradeMA13Crosses
    //https://www.tradingview.com/pine-script-reference/#fun_strategy{dot}close
    strategy.close("1 over 3") // sell by market
    
if MA23Crossover and TradeMA23Crosses
    //https://www.tradingview.com/pine-script-reference/#fun_strategy{dot}entry
    strategy.entry("2 over 3", true) // buy by market
    strategy.exit("profit or loss", "2 over 3", profit = ProfitTarget, loss = LossTarget)
if MA23Crossunder and TradeMA23Crosses
    //https://www.tradingview.com/pine-script-reference/#fun_strategy{dot}close
    strategy.close("2 over 3") // sell by market
    
```

> Detail

https://www.fmz.com/strategy/430849

> Last Modified

2023-11-02 14:47:45
