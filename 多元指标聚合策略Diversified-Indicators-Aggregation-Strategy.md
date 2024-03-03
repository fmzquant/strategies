
> Name

多元指标聚合策略Diversified-Indicators-Aggregation-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略致力于创建最灵活的玻尔兰格带策略,提供大量可自定义选项,以满足不同交易者的需求。

## 策略原理

该策略使用单一自定义移动平均线作为中线。允许自定义移动平均线的周期、类型和价格来源。

上下波段根据中线标准差计算,可自定义倍数。也可选择使用ATR来代替标准差计算上下波段位置。

该策略提供多种开仓和平仓条件的组合使用,条件包括:

- 价格穿越上中下波段
- 价格高于或低于上中下波段
- 波段宽度大于或小于自定义阈值
- 百分比B大于或小于自定义阈值

开仓和平仓条件可单独使用,也可组合使用,策略窗口可自定义。

止盈和止损可自定义百分比。

## 策略优势

- 可自定义移动平均线周期、类型和价格来源,满足不同需要
- 可单独使用各种开仓和平仓条件,也可任意组合条件,灵活性强
- 支持上中下3条波段,观察范围广
- 支持波段宽度和百分比B作为条件,多种指标组合运用
- 可自定义止盈止损百分比,可控的风险
- 支持目前交易所所有品种,适用范围广
- 可自定义回测和实时交易时间范围,便于分析策略表现

该策略通过提供大量可自定义选项,极大地提高了灵活性,可以针对不同品种和行情进行个性化优化,从而获得更好的策略表现。

## 策略风险

- 过于灵活增加了策略参数和条件组合的难度,需要仔细测试优化
- 移动平均线滞后性可能错过短线机会
- 停损点设定过小可能增加暴露风险
- 百分比B容易受到假突破影响

针对上述风险,可采取以下对策:

1. 利用回测功能逐步测试不同参数组合,找到最佳配置
2. 辅助使用较短周期指标识别短线机会
3. 根据ATR等指标设定合理的止损点
4. 结合其他指标确认百分比B信号

## 策略优化方向 

- 增加仓位管理功能,如固定仓位、马丁格尔、资金管理等
- 增加多品种自动切换功能
- 优化移动平均线参数,提高胜率
- 优化止损止盈设定,获得更好风险回报率 
- 测试不同指标参数组合
- 增加机器学习等算法,自动寻找最优参数

## 总结

本策略通过对玻尔兰格带的深度延伸,提供了非常灵活和全面的交易解决方案。虽然参数组合较多需要测试,但可针对个人需求进行定制化优化。整体来说,该策略具有非常大的应用价值,是玻尔兰格带策略的优质代表。随着持续优化,特别是引入量化和机器学习方法,该策略有望产生更出色的交易表现。它为交易者提供了一个功能强大且富有创造性的工具。

||


## Overview

This strategy aims to create the most flexible Bollinger Bands strategy, providing a wide range of customizable options to suit different traders' needs. 

## Strategy Logic

The strategy uses a single custom moving average as the middle band. Allows customizing moving average period, type, and price source. 

The upper and lower bands are calculated based on standard deviation of the middle band, with customizable multiples. ATR can also be chosen instead of standard deviation to calculate upper and lower band locations.

The strategy provides combinations of multiple open and close conditions, including:

- Price crossing above or below the upper, middle, lower bands
- Price being above or below the upper, middle, lower bands  
- Band width greater or less than custom thresholds
- Percentage B greater or less than custom thresholds

Open and close conditions can be used alone or in combination, with a customizable strategy window. 

Take profit and stop loss are customizable percentages.

## Advantages

- Customizable moving average period, type, and price source to suit different needs
- Individual conditions can be used alone or combined freely for flexibility  
- Supports upper, middle, lower 3 bands for broad monitoring
- Supports band width and percentage B as conditions for diverse indicators combined
- Customizable take profit and stop loss percentages for controllable risk
- Supports all varieties on current exchanges for wide applicability
- Customizable backtest and live trading time range for strategy analysis 

The strategy provides great flexibility through abundant customizable options, allowing personalized optimization for different varieties and market conditions to achieve better performance.

## Risks

- Too much flexibility increases difficulty of parameter and condition combination, requiring careful testing and optimization
- Moving average lag may miss short-term opportunities 
- Stop loss set too small may increase exposure to risk
- Percentage B is prone to false breakout effects

The following countermeasures can be taken:

1. Utilize backtesting to test different parameter combinations step-by-step to find the optimum
2. Use shorter cycle indicators to identify short-term opportunities  
3. Set reasonable stop loss based on ATR etc.
4. Combine other indicators to confirm percentage B signals

## Optimization Directions

- Add position management functions such as fixed size, martingale, money management etc.
- Add auto varierty switching capabilities
- Optimize moving average parameters to increase win rate
- Optimize stop loss and take profit settings for better risk reward ratio
- Test different indicator parameter combinations
- Add machine learning etc. algorithms to automatically find optimum parameters

## Summary 

This strategy provides a very flexible and comprehensive trading solution through in-depth extensions of Bollinger Bands. Although there are many parameter combinations requiring testing, it can be customized to suit individual needs. Overall, the strategy has great application value as a high-quality representative of Bollinger Bands strategies. With ongoing optimizations, especially the introduction of quantitative and machine learning methods, it has the potential to achieve even better trading performance. It provides traders a powerful and creative tool.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Middle Band Period|
|v_input_2|0|Middle Band Type: SMA|RMA|EMA|WMA|HMA|DEMA|TEMA|VWMA|
|v_input_3_close|0|Middle Band Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|0|Middle Band Resolution: 00 Current|01 1m|02 3m|03 5m|04 15m|05 30m|06 45m|07 1h|08 2h|09 3h|10 4h|11 1D|12 1W|13 1M|
|v_input_5|0|Middle Band Candle Type: 00 Current|01 Heikin Ashi|02 Renko|03 Line Break|04 Kagi|05 Point & Figure|
|v_input_6|true|Middle Band Visible|
|v_input_7|2|Upper Band Deviation Multiplier|
|v_input_8|2|Lower Band Deviation Multiplier|
|v_input_9|false|Use ATR Deviation Instead of Standard Deviation?|
|v_input_10|14|ATR Deviation Period|
|v_input_11|true|Highlight Inclusions|
|v_input_12|true|Show Inclusion Ghost Trail|
|v_input_13|0|Forecast Bias: Neutral|Bullish|Bearish|
|v_input_14|14|Forecast Bias Period|
|v_input_15|true|Forecast Bias Magnitude|
|v_input_16|true|Show Forecasts|
|v_input_17|false|Hide Fill|
|v_input_18|true|Use Basic Fill - No Gradient|
|v_input_19|false|Show Details|
|v_input_20|true|Upper Band Smoothing Period|
|v_input_21|0|Upper Band Smoothing MA Type: SMA|RMA|EMA|WMA|HMA|DEMA|TEMA|VWMA|
|v_input_22|true|Lower Band Smoothing Period|
|v_input_23|0|Lower Band Smoothing MA Type: SMA|RMA|EMA|WMA|HMA|DEMA|TEMA|VWMA|
|v_input_24|true|From Month|
|v_input_25|true|From Day|
|v_input_26|2020|From Year|
|v_input_27|true|Thru Month|
|v_input_28|true|Thru Day|
|v_input_29|2112|Thru Year|
|v_input_30|true|Show Date Range|
|v_input_31|100|Take Profit %|
|v_input_32|100|Stop Loss %|
|v_input_33|0|Open Conditions Requirement: All|Any|Minimum count|
|v_input_34|true|Open Conditions Minimum Count|
|v_input_35|0|Close Conditions Requirement: All|Any|Minimum count|
|v_input_36|true|Close Conditions Minimum Count|
|v_input_37|0|Crossover Upper Band: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_38|0|Crossover Middle Band: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_39|0|Crossover Lower Band: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_40|0|Crossunder Upper Band: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_41|0|Crossunder Middle Band: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_42|0|Crossunder Lower Band: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_43|0|Price Above Upper Band: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_44|0|Price Above Middle Band: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_45|0|Price Above Lower Band: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_46|0|Price Below Upper Band: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_47|0|Price Below Middle Band: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_48|0|Price Below Lower Band: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_49|0.02|Band Width Condition Value 1|
|v_input_50|0.04|Band Width Condition Value 2|
|v_input_51|0|Band Width Crossover Above Band Value 1: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_52|0|Band Width Crossover Above Band Value 2: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_53|0|Band Width Crossunder Below Band Value 1: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_54|0|Band Width Crossunder Below Band Value 2: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_55|0|Band Width Above Band Value 1: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_56|0|Band Width Above Band Value 2: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_57|0|Band Width Below Band Value 1: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_58|0|Band Width Below Band Value 2: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_59|0.35|Percent B Condition Value 1|
|v_input_60|0.7|Percent B Condition Value 2|
|v_input_61|0|Percent B Crossover Above Percent B 1: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_62|0|Percent B Crossover Above Percent B 2: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_63|0|Percent B Crossunder Below Percent B 1: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_64|0|Percent B Crossunder Below Percent B 2: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_65|0|Percent B Above Percent B 1: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_66|0|Percent B Above Percent B 2: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_67|0|Percent B Below Percent B 1: Not Used|Long Open|Long Close|Long Open and Long Close|
|v_input_68|0|Percent B Below Percent B 2: Not Used|Long Open|Long Close|Long Open and Long Close|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-26 00:00:00
end: 2023-09-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
args: [["v_input_37",1],["v_input_38",2]]
*/

//@version=4

//
// Pine Script v4
// @author BigBitsIO
// Script Library: https://www.tradingview.com/u/BigBitsIO/#published-scripts
//

strategy(title="Fancy Bollinger Bands Strategy [BigBitsIO]", shorttitle="Fancy Bollinger Bands Strategy [BigBitsIO]", overlay=true, pyramiding=1, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=.1, slippage=0, initial_capital=100)

MAPeriod = input(20, title="Middle Band Period", minval=1, step=1)
MAType = input(title="Middle Band Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "DEMA", "TEMA", "VWMA"])
MASource = input(title="Middle Band Source", type=input.source, defval=close)
MAResolution = input(title="Middle Band Resolution", defval="00 Current", options=["00 Current", "01 1m", "02 3m", "03 5m", "04 15m", "05 30m", "06 45m", "07 1h", "08 2h", "09 3h", "10 4h", "11 1D", "12 1W", "13 1M"])
MACandleType = input(title="Middle Band Candle Type", defval="00 Current", options=["00 Current", "01 Heikin Ashi", "02 Renko", "03 Line Break", "04 Kagi", "05 Point & Figure"])
MAVisible = input(title="Middle Band Visible", type=input.bool, defval=true) 

UpperBandMultiplier = input(title="Upper Band Deviation Multiplier", defval=2, minval=0.001, maxval=50, step=.25, type=input.float)
LowerBandMultiplier = input(title="Lower Band Deviation Multiplier", defval=2, minval=0.001, maxval=50, step=.25, type=input.float)
UseATRDeviation = input(false, title="Use ATR Deviation Instead of Standard Deviation?")
ATRPeriod = input(14, title="ATR Deviation Period", minval=1, step=1)

HighlightInclusion = input(title="Highlight Inclusions", type=input.bool, defval=true)
ShowGhostTrail = input(title="Show Inclusion Ghost Trail", type=input.bool, defval=true)

ForecastBias = input(title="Forecast Bias", defval="Neutral", options=["Neutral", "Bullish", "Bearish"])
ForecastBiasPeriod = input(14, title="Forecast Bias Period")
ForecastBiasMagnitude = input(1, title="Forecast Bias Magnitude", minval=0.25, maxval=20, step=0.25)
ShowForecast = input(title="Show Forecasts", type=input.bool, defval=true)

HideFill = input(false, title="Hide Fill")
UseBasicFill = input(true, title="Use Basic Fill - No Gradient")
ShowBBDetails = input(false, title="Show Details")

UpperBandSmoothingMAPeriod = input(1, title="Upper Band Smoothing Period", minval=1, step=1)
UpperBandSmoothingMAType = input(title="Upper Band Smoothing MA Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "DEMA", "TEMA", "VWMA"])

LowerBandSmoothingMAPeriod = input(1, title="Lower Band Smoothing Period", minval=1, step=1)
LowerBandSmoothingMAType = input(title="Lower Band Smoothing MA Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "DEMA", "TEMA", "VWMA"])


// Begin Citation - Allanster backtest period
// === INPUT BACKTEST RANGE ===
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2020, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2112, title = "Thru Year",       type = input.integer, minval = 1970)

// === INPUT SHOW PLOT ===
showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

// === FUNCTION EXAMPLE ===
start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true       // create function "within window of time"

// === PLOTTING ===
bgcolor(color = showDate and window() ? color.gray : na, transp = 90)    
// End Citation - uses the window() funciton later on

takeProfitPercent = input(100, title="Take Profit %", type=input.float, step=.25)
stopLossPercent = input(100, title="Stop Loss %", type=input.float, step=.25)

OpenConditionsRequirement = input(title="Open Conditions Requirement", defval="All", options=["Any", "All", "Minimum count"])
OpenConditionsMinimumCount = input(1, title="Open Conditions Minimum Count", minval=1, type=input.integer)
CloseConditionsRequirement = input(title="Close Conditions Requirement", defval="All", options=["Any", "All", "Minimum count"])
CloseConditionsMinimumCount = input(1, title="Close Conditions Minimum Count", minval=1, type=input.integer)

CrossoverUpperBand = input(title="Crossover Upper Band", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
CrossoverMiddleBand = input(title="Crossover Middle Band", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
CrossoverLowerBand = input(title="Crossover Lower Band", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])

CrossunderUpperBand = input(title="Crossunder Upper Band", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
CrossunderMiddleBand = input(title="Crossunder Middle Band", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
CrossunderLowerBand = input(title="Crossunder Lower Band", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])

PriceAboveUpperBand = input(title="Price Above Upper Band", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
PriceAboveMiddleBand = input(title="Price Above Middle Band", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
PriceAboveLowerBand = input(title="Price Above Lower Band", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])

PriceBelowUpperBand = input(title="Price Below Upper Band", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
PriceBelowMiddleBand = input(title="Price Below Middle Band", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
PriceBelowLowerBand = input(title="Price Below Lower Band", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])

BandWidth1 = input(.020, title="Band Width Condition Value 1", minval=0.005, maxval=20, step=0.005)
BandWidth2 = input(.040, title="Band Width Condition Value 2", minval=0.005, maxval=20, step=0.005)

BandWidthCrossoverBandValue1 = input(title="Band Width Crossover Above Band Value 1", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
BandWidthCrossoverBandValue2 = input(title="Band Width Crossover Above Band Value 2", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])

BandWidthCrossunderBandValue1 = input(title="Band Width Crossunder Below Band Value 1", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
BandWidthCrossunderBandValue2 = input(title="Band Width Crossunder Below Band Value 2", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])

BandWidthAboveBandValue1 = input(title="Band Width Above Band Value 1", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
BandWidthAboveBandValue2 = input(title="Band Width Above Band Value 2", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])

BandWidthBelowBandValue1 = input(title="Band Width Below Band Value 1", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
BandWidthBelowBandValue2 = input(title="Band Width Below Band Value 2", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])

PercentB1 = input(.35, title="Percent B Condition Value 1", step=0.05)
PercentB2 = input(.70, title="Percent B Condition Value 2", step=0.05)

PercentBCrossoverPercentBValue1 = input(title="Percent B Crossover Above Percent B 1", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
PercentBCrossoverPercentBValue2 = input(title="Percent B Crossover Above Percent B 2", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])

PercentBCrossunderPercentBValue1 = input(title="Percent B Crossunder Below Percent B 1", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
PercentBCrossunderPercentBValue2 = input(title="Percent B Crossunder Below Percent B 2", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])

PercentBAbovePercentBValue1 = input(title="Percent B Above Percent B 1", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
PercentBAbovePercentBValue2 = input(title="Percent B Above Percent B 2", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])

PercentBBelowPercentBValue1 = input(title="Percent B Below Percent B 1", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])
PercentBBelowPercentBValue2 = input(title="Percent B Below Percent B 2", defval="Not Used", options=["Not Used", "Long Open", "Long Close", "Long Open and Long Close"])





// A bit of borrowed code, modified here using @PineCoders gradient Framework
f_cRedLime(_g, _hide, _basic)      => _hide ? #00000000 : _basic ? #0080FF35 : _g <= 0 ? #FF000035 : _g <= .25 ? #FF000020 : _g <= .5 ? #FF000010 : _g <= .75 ? #00FF0010 : _g <= 1 ? #00FF0020 : #00FF0035
f_cRedLimeShadow(_g, _hide, _basic)      => _hide ? #00000000 : _basic ? #0080FF09 : _g <= 0 ? #FF000009 : _g <= .25 ? #FF000006 : _g <= .5 ? #FF000003 : _g <= .75 ? #00FF0009 : _g <= 1 ? #00FF0006 : #00FF0003

ma(MAType, MASource, MAPeriod) =>
    if MAPeriod > 0
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
                            hma(MASource, MAPeriod)
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
                                                             
gettickerid(MACandleType) =>
    if MACandleType == "00 Current"
        syminfo.tickerid
    else
        if MACandleType == "01 Heikin Ashi"
            heikinashi(syminfo.tickerid) 
        else
            if MACandleType == "02 Renko"
                renko(syminfo.tickerid, "ATR", 10)  
            else
                if MACandleType == "03 Line Break"
                    linebreak(syminfo.tickerid, 3)
                else
                    if MACandleType == "04 Kagi"
                        kagi(syminfo.tickerid, 3) 
                    else
                        if MACandleType == "05 Point & Figure"
                            pointfigure(syminfo.tickerid, "hl", "Traditional", 1, 3)

MA = security(gettickerid(MACandleType), res(MAResolution), ma(MAType, MASource, MAPeriod))

plot(MAVisible ? MA : na, color=color.white, linewidth=2, title="Middle Band", show_last= HighlightInclusion ? MAPeriod : 0)
plot(MAVisible and HighlightInclusion and ShowGhostTrail ? MA[MAPeriod-1] : na, color=color.black, linewidth=2, title="MA Trail", offset=((MAPeriod-1)*-1), transp=10)


Deviation = UseATRDeviation ? security(gettickerid(MACandleType), res(MAResolution), atr(ATRPeriod)) :  security(gettickerid(MACandleType), res(MAResolution), stdev(MASource, MAPeriod))

UpperBand = MA + (Deviation * UpperBandMultiplier)
LowerBand = MA - (Deviation * LowerBandMultiplier)

SmoothedUpperBand = ma(UpperBandSmoothingMAType, UpperBand, UpperBandSmoothingMAPeriod)
SmoothedLowerBand = ma(LowerBandSmoothingMAType, LowerBand, LowerBandSmoothingMAPeriod)

UpperPlot = plot(SmoothedUpperBand, color=color.white, linewidth=1, title="Upper Band", show_last= HighlightInclusion ? MAPeriod : 0)
UpperShadowPlot = plot(HighlightInclusion and ShowGhostTrail ? SmoothedUpperBand[MAPeriod-1] : na, color=color.black, linewidth=1, title="Upper Band Trail", offset=((MAPeriod-1)*-1), transp=10)
LowerPlot = plot(SmoothedLowerBand, color=color.white, linewidth=1, title="Lower Band", show_last= HighlightInclusion ? MAPeriod : 0)
LowerShadowPlot = plot(HighlightInclusion and ShowGhostTrail ? SmoothedLowerBand[MAPeriod-1] : na, color=color.black, linewidth=1, title="Lower Band Trail", offset=((MAPeriod-1)*-1), transp=10)

PercentB = (security(gettickerid(MACandleType), res(MAResolution), close) - LowerBand) / (UpperBand - LowerBand)

fill(UpperPlot, LowerPlot, color = f_cRedLime(PercentB, HideFill, UseBasicFill), show_last= HighlightInclusion ? MAPeriod : 100000000)
fill(UpperShadowPlot, LowerShadowPlot, color = f_cRedLimeShadow(PercentB[MAPeriod-1], HideFill, UseBasicFill))

BBWidth = (UpperBand - LowerBand) / MA


if(ShowBBDetails)
    label Label = label.new(bar_index, na, "\nFancy Bollinger Band Details:\n\nUpper Band: " + tostring(UpperBand) + "\nMid Band: " + tostring(MA) + "\nLower Band: " + tostring(LowerBand) + "\n%B: " + tostring(PercentB) + "\nBollinger Band Width: " + tostring(BBWidth) + "\n\nHide this message in settings.\nUncheck Show Details", 
      color=color.black, 
      textcolor=color.white,
      style=label.style_label_down, size=size.normal, textalign=text.align_left)
    label.set_y(Label, high > UpperBand ? high : UpperBand)
    label.delete(Label[1])


// Forecasting - forcasted prices are calculated using our MAType and MASource for the MAPeriod - the last X candles.
//              it essentially replaces the oldest X candles, with the selected source * X candles
// Bias - We'll add an "adjustment" for each additional candle being forecasted based on ATR of the previous X candles
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
MAForecast1 = MAPeriod > 1 ? (security(syminfo.tickerid, res(MAResolution), ma(MAType, MASource, MAPeriod - 1)) * (MAPeriod - 1) + ((MASource * 1) + (Bias * 1))) / MAPeriod : na
MAForecast2 = MAPeriod > 2 ? (security(syminfo.tickerid, res(MAResolution), ma(MAType, MASource, MAPeriod - 2)) * (MAPeriod - 2) + ((MASource * 2) + (Bias * 2))) / MAPeriod : na
MAForecast3 = MAPeriod > 3 ? (security(syminfo.tickerid, res(MAResolution), ma(MAType, MASource, MAPeriod - 3)) * (MAPeriod - 3) + ((MASource * 3) + (Bias * 3))) / MAPeriod : na
MAForecast4 = MAPeriod > 4 ? (security(syminfo.tickerid, res(MAResolution), ma(MAType, MASource, MAPeriod - 4)) * (MAPeriod - 4) + ((MASource * 4) + (Bias * 4))) / MAPeriod : na
MAForecast5 = MAPeriod > 5 ? (security(syminfo.tickerid, res(MAResolution), ma(MAType, MASource, MAPeriod - 5)) * (MAPeriod - 5) + ((MASource * 5) + (Bias * 5))) / MAPeriod : na

plot(MAResolution == "00 Current" and ShowForecast and MAVisible ? MAForecast1 : na, color=color.white, linewidth=1, style=plot.style_circles, title="Middle Band Forecast 1", offset=1, show_last=1)
plot(MAResolution == "00 Current" and ShowForecast and MAVisible ? MAForecast2 : na, color=color.white, linewidth=1, style=plot.style_circles, title="Middle Band Forecast 2", offset=2, show_last=1)
plot(MAResolution == "00 Current" and ShowForecast and MAVisible ? MAForecast3 : na, color=color.white, linewidth=1, style=plot.style_circles, title="Middle Band Forecast 3", offset=3, show_last=1)
plot(MAResolution == "00 Current" and ShowForecast and MAVisible ? MAForecast4 : na, color=color.white, linewidth=1, style=plot.style_circles, title="Middle Band Forecast 4", offset=4, show_last=1)
plot(MAResolution == "00 Current" and ShowForecast and MAVisible ? MAForecast5 : na, color=color.white, linewidth=1, style=plot.style_circles, title="Middle Band Forecast 5", offset=5, show_last=1)


// Take Profit and Stop Loss
profitTarget = (close * (takeProfitPercent / 100)) / syminfo.mintick
lossTarget = (close * (stopLossPercent / 100)) / syminfo.mintick

float longOpen = 0
float longOpenCount = 0
float longClose = 0
float longCloseCount =0

bool validLongOpen = true 
bool validLongClose = true


testLongOpen(Conditionlo)=>
    if Conditionlo
        if OpenConditionsRequirement == "All" and validLongOpen
            [1, longOpenCount, true]
        else if OpenConditionsRequirement == "Any"
            [1, longOpenCount, validLongOpen]
        else if OpenConditionsRequirement == "Minimum count"
            [0, longOpenCount + 1, validLongOpen]
        else
            [longOpen, longOpenCount, validLongOpen]
    else
        [0, longOpenCount, false]
        
testLongClose(Conditionlc)=>
    if Conditionlc
        if CloseConditionsRequirement == "All" and validLongClose
            [1, longCloseCount, true]
        else if CloseConditionsRequirement == "Any"
            [1, longCloseCount, validLongClose]
        else if CloseConditionsRequirement == "Minimum count"
            [0, int(longCloseCount + 1), validLongClose]
        else
            [longClose, longCloseCount, validLongClose]
    else
        [0, longCloseCount, false]
        
        




//------------------------------CONDITIONS-----------------------------
bool isCrossoverUpperBand = crossover(close, UpperBand)

if CrossoverUpperBand == "Long Open" or CrossoverUpperBand == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isCrossoverUpperBand)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if CrossoverUpperBand == "Long Close" or CrossoverUpperBand == "Long Open and Long Close"
    [a,b,c] = testLongClose(isCrossoverUpperBand)
    longClose := a
    longCloseCount := b
    validLongClose := c
            
bool isCrossunderUpperBand = crossunder(close, UpperBand)            
            
if CrossunderUpperBand == "Long Open" or CrossunderUpperBand == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isCrossunderUpperBand) 
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if CrossunderUpperBand == "Long Close" or CrossunderUpperBand == "Long Open and Long Close"
    [a,b,c] = testLongClose(isCrossunderUpperBand) 
    longClose := a
    longCloseCount := b
    validLongClose := c        
            
bool isCrossoverMiddleBand = crossover(close, MA)

if CrossoverMiddleBand == "Long Open" or CrossoverMiddleBand == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isCrossoverMiddleBand)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if CrossoverMiddleBand == "Long Close" or CrossoverMiddleBand == "Long Open and Long Close"
    [a,b,c] = testLongClose(isCrossoverMiddleBand) 
    longClose := a
    longCloseCount := b
    validLongClose := c   
            
bool isCrossunderMiddleBand = crossunder(close, MA)            
            
if CrossunderMiddleBand == "Long Open" or CrossunderMiddleBand == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isCrossunderMiddleBand)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if CrossunderMiddleBand == "Long Close" or CrossunderMiddleBand == "Long Open and Long Close"
    [a,b,c] = testLongClose(isCrossunderMiddleBand) 
    longClose := a
    longCloseCount := b
    validLongClose := c                 
            




bool isCrossoverLowerBand = crossover(close, LowerBand)

if CrossoverLowerBand == "Long Open" or CrossoverLowerBand == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isCrossoverLowerBand)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if CrossoverLowerBand == "Long Close" or CrossoverLowerBand == "Long Open and Long Close"
    [a,b,c] = testLongClose(isCrossoverLowerBand) 
    longClose := a
    longCloseCount := b
    validLongClose := c   
            
bool isCrossunderLowerBand = crossunder(close, LowerBand)            
            
if CrossunderLowerBand == "Long Open" or CrossunderLowerBand == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isCrossunderLowerBand)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if CrossunderLowerBand == "Long Close" or CrossunderLowerBand == "Long Open and Long Close"
    [a,b,c] = testLongClose(isCrossunderLowerBand) 
    longClose := a
    longCloseCount := b
    validLongClose := c   
            
            
            
            
bool isPriceAboveUpperBand = close > UpperBand

if PriceAboveUpperBand == "Long Open" or PriceAboveUpperBand == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isPriceAboveUpperBand)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if PriceAboveUpperBand == "Long Close" or PriceAboveUpperBand == "Long Open and Long Close"
    [a,b,c] = testLongClose(isPriceAboveUpperBand) 
    longClose := a
    longCloseCount := b
    validLongClose := c   
            
bool isPriceBelowUpperBand = close < UpperBand            
            
if PriceBelowUpperBand == "Long Open" or PriceBelowUpperBand == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isPriceBelowUpperBand)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if PriceBelowUpperBand == "Long Close" or PriceBelowUpperBand == "Long Open and Long Close"
    [a,b,c] = testLongClose(isPriceBelowUpperBand) 
    longClose := a
    longCloseCount := b
    validLongClose := c              
            
bool isPriceAboveMiddleBand = close > MA

if PriceAboveMiddleBand == "Long Open" or PriceAboveMiddleBand == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isPriceAboveMiddleBand)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if PriceAboveMiddleBand == "Long Close" or PriceAboveMiddleBand == "Long Open and Long Close"
    [a,b,c] = testLongClose(isPriceAboveMiddleBand) 
    longClose := a
    longCloseCount := b
    validLongClose := c   
            
bool isPriceBelowMiddleBand = close < MA          
            
if PriceBelowMiddleBand == "Long Open" or PriceBelowMiddleBand == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isPriceBelowMiddleBand)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if PriceBelowMiddleBand == "Long Close" or PriceBelowMiddleBand == "Long Open and Long Close"
    [a,b,c] = testLongClose(isPriceBelowMiddleBand) 
    longClose := a
    longCloseCount := b
    validLongClose := c                 
            




bool isPriceAboveLowerBand = close > LowerBand

if PriceAboveLowerBand == "Long Open" or PriceAboveLowerBand == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isPriceAboveLowerBand)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if PriceAboveLowerBand == "Long Close" or PriceAboveLowerBand == "Long Open and Long Close"
    [a,b,c] = testLongClose(isPriceAboveLowerBand) 
    longClose := a
    longCloseCount := b
    validLongClose := c   
            
bool isPriceBelowLowerBand = close < LowerBand           
            
if PriceBelowLowerBand == "Long Open" or PriceBelowLowerBand == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isPriceBelowLowerBand)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if PriceBelowLowerBand == "Long Close" or PriceBelowLowerBand == "Long Open and Long Close"
    [a,b,c] = testLongClose(isPriceBelowLowerBand) 
    longClose := a
    longCloseCount := b
    validLongClose := c       
            
            
bool isBandWidthCrossoverBandValue1 = crossover(BBWidth, BandWidth1)           
            
if BandWidthCrossoverBandValue1 == "Long Open" or BandWidthCrossoverBandValue1 == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isBandWidthCrossoverBandValue1)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if BandWidthCrossoverBandValue1 == "Long Close" or BandWidthCrossoverBandValue1 == "Long Open and Long Close"
    [a,b,c] = testLongClose(isBandWidthCrossoverBandValue1) 
    longClose := a
    longCloseCount := b
    validLongClose := c   
            
bool isBandWidthCrossoverBandValue2 = crossover(BBWidth, BandWidth2)           
            
if BandWidthCrossoverBandValue2 == "Long Open" or BandWidthCrossoverBandValue2 == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isBandWidthCrossoverBandValue2)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if BandWidthCrossoverBandValue2 == "Long Close" or BandWidthCrossoverBandValue2 == "Long Open and Long Close"
    [a,b,c] = testLongClose(isBandWidthCrossoverBandValue2) 
    longClose := a
    longCloseCount := b
    validLongClose := c     
            
            
            
            
bool isBandWidthCrossunderBandValue1 = crossunder(BBWidth, BandWidth1)           
            
if BandWidthCrossunderBandValue1 == "Long Open" or BandWidthCrossunderBandValue1 == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isBandWidthCrossunderBandValue1)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if BandWidthCrossunderBandValue1 == "Long Close" or BandWidthCrossunderBandValue1 == "Long Open and Long Close"
    [a,b,c] = testLongClose(isBandWidthCrossunderBandValue1) 
    longClose := a
    longCloseCount := b
    validLongClose := c    
            
bool isBandWidthCrossunderBandValue2 = crossunder(BBWidth, BandWidth2)           
            
if BandWidthCrossunderBandValue2 == "Long Open" or BandWidthCrossunderBandValue2 == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isBandWidthCrossunderBandValue2)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if BandWidthCrossunderBandValue2 == "Long Close" or BandWidthCrossunderBandValue2 == "Long Open and Long Close"
    [a,b,c] = testLongClose(isBandWidthCrossunderBandValue2) 
    longClose := a
    longCloseCount := b
    validLongClose := c     
            
            


bool isBandWidthAboveBandValue1 = BBWidth > BandWidth1          
            
if BandWidthAboveBandValue1 == "Long Open" or BandWidthAboveBandValue1 == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isBandWidthAboveBandValue1)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if BandWidthAboveBandValue1 == "Long Close" or BandWidthAboveBandValue1 == "Long Open and Long Close"
    [a,b,c] = testLongClose(isBandWidthAboveBandValue1) 
    longClose := a
    longCloseCount := b
    validLongClose := c     
            
bool isBandWidthAboveBandValue2 = BBWidth > BandWidth2           
            
if BandWidthAboveBandValue2 == "Long Open" or BandWidthAboveBandValue2 == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isBandWidthAboveBandValue2)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if BandWidthAboveBandValue2 == "Long Close" or BandWidthAboveBandValue2 == "Long Open and Long Close"
    [a,b,c] = testLongClose(isBandWidthAboveBandValue2) 
    longClose := a
    longCloseCount := b
    validLongClose := c     
            
            
            
            
bool isBandWidthBelowBandValue1 = BBWidth < BandWidth1           
            
if BandWidthBelowBandValue1 == "Long Open" or BandWidthBelowBandValue1 == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isBandWidthBelowBandValue1)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if BandWidthBelowBandValue1 == "Long Close" or BandWidthBelowBandValue1 == "Long Open and Long Close"
    [a,b,c] = testLongClose(isBandWidthBelowBandValue1) 
    longClose := a
    longCloseCount := b
    validLongClose := c    
            
bool isBandWidthBelowBandValue2 = BBWidth < BandWidth2         
            
if BandWidthBelowBandValue2 == "Long Open" or BandWidthBelowBandValue2 == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isBandWidthBelowBandValue2)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if BandWidthBelowBandValue2 == "Long Close" or BandWidthBelowBandValue2 == "Long Open and Long Close"
    [a,b,c] = testLongClose(isBandWidthBelowBandValue2) 
    longClose := a
    longCloseCount := b
    validLongClose := c     





bool isPercentBCrossoverPercentBValue1 = crossover(PercentB, PercentB1)           
            
if PercentBCrossoverPercentBValue1 == "Long Open" or PercentBCrossoverPercentBValue1 == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isPercentBCrossoverPercentBValue1)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if PercentBCrossoverPercentBValue1 == "Long Close" or PercentBCrossoverPercentBValue1 == "Long Open and Long Close"
    [a,b,c] = testLongClose(isPercentBCrossoverPercentBValue1) 
    longClose := a
    longCloseCount := b
    validLongClose := c    
            
bool isPercentBCrossoverPercentBValue2 = crossover(PercentB, PercentB2)           
            
if PercentBCrossoverPercentBValue2 == "Long Open" or PercentBCrossoverPercentBValue2 == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isPercentBCrossoverPercentBValue2)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if PercentBCrossoverPercentBValue2 == "Long Close" or PercentBCrossoverPercentBValue2 == "Long Open and Long Close"
    [a,b,c] = testLongClose(isPercentBCrossoverPercentBValue2) 
    longClose := a
    longCloseCount := b
    validLongClose := c    
            
            
            
            
bool isPercentBCrossunderPercentBValue1 = crossunder(PercentB, PercentB1)           
            
if PercentBCrossunderPercentBValue1 == "Long Open" or PercentBCrossunderPercentBValue1 == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isPercentBCrossunderPercentBValue1)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if PercentBCrossunderPercentBValue1 == "Long Close" or PercentBCrossunderPercentBValue1 == "Long Open and Long Close"
    [a,b,c] = testLongClose(isPercentBCrossunderPercentBValue1) 
    longClose := a
    longCloseCount := b
    validLongClose := c      
            
bool isPercentBCrossunderPercentBValue2 = crossunder(PercentB, PercentB2)           
            
if PercentBCrossunderPercentBValue2 == "Long Open" or PercentBCrossunderPercentBValue2 == "Long Open and Long Close"
    [a,b,c] = testLongOpen(isPercentBCrossunderPercentBValue2)
    longOpen := a
    longOpenCount := b
    validLongOpen := c
if PercentBCrossunderPercentBValue2 == "Long Close" or PercentBCrossunderPercentBValue2 == "Long Open and Long Close"
    [a,b,c] = testLongClose(isPercentBCrossunderPercentBValue2) 
    longClose := a
    longCloseCount := b
    validLongClose := c     
            
            


// bool isPercentBAbovePercentBValue1 = PercentB > PercentB1          
            
// if PercentBAbovePercentBValue1 == "Long Open" or PercentBAbovePercentBValue1 == "Long Open and Long Close"
//     [a,b,c] = testLongOpen(isPercentBAbovePercentBValue1)
//     longOpen := a
//     longOpenCount := b
//     validLongOpen := c
// if PercentBAbovePercentBValue1 == "Long Close" or PercentBAbovePercentBValue1 == "Long Open and Long Close"
//     [a,b,c] = testLongClose(isPercentBAbovePercentBValue1) 
//     longClose := a
//     longCloseCount := b
//     validLongClose := c     
            
// bool isPercentBAbovePercentBValue2 = PercentB > PercentB2           
            
// if PercentBAbovePercentBValue2 == "Long Open" or PercentBAbovePercentBValue2 == "Long Open and Long Close"
//     [a,b,c] = testLongOpen(isPercentBAbovePercentBValue2)
//     longOpen := a
//     longOpenCount := b
//     validLongOpen := c
// if PercentBAbovePercentBValue2 == "Long Close" or PercentBAbovePercentBValue2 == "Long Open and Long Close"
//     [a,b,c] = testLongClose(isPercentBAbovePercentBValue2) 
//     longClose := a
//     longCloseCount := b
//     validLongClose := c      
             
            
            
            
// bool isPercentBBelowPercentBValue1 = PercentB < PercentB1           
            
// if PercentBBelowPercentBValue1 == "Long Open" or PercentBBelowPercentBValue1 == "Long Open and Long Close"
//     [a,b,c] = testLongOpen(isPercentBBelowPercentBValue1)
//     longOpen := a
//     longOpenCount := b
//     validLongOpen := c
// if PercentBBelowPercentBValue1 == "Long Close" or PercentBBelowPercentBValue1 == "Long Open and Long Close"
//     [a,b,c] = testLongClose(isPercentBBelowPercentBValue1) 
//     longClose := a
//     longCloseCount := b
//     validLongClose := c    
            
// bool isPercentBBelowPercentBValue2 = PercentB < PercentB2         
            
// if PercentBBelowPercentBValue2 == "Long Open" or PercentBBelowPercentBValue2 == "Long Open and Long Close"
//     [a,b,c] = testLongOpen(isPercentBBelowPercentBValue2)
//     longOpen := a
//     longOpenCount := b
//     validLongOpen := c
// if PercentBBelowPercentBValue2 == "Long Close" or PercentBBelowPercentBValue2 == "Long Open and Long Close"
//     [a,b,c] = testLongClose(isPercentBBelowPercentBValue2) 
//     longClose := a
//     longCloseCount := b
//     validLongClose := c     



//-------------------------------------END CONDITIONS-------------------------------------------        


    
if OpenConditionsRequirement == "Minimum count"
    if longOpenCount >= OpenConditionsMinimumCount
        longOpen := 1
if CloseConditionsRequirement == "Minimum count"
    if longCloseCount >= CloseConditionsMinimumCount
        longClose := 1

// Tie breaker
if longClose == 1 and longOpen == 1
    longOpen := 0

if longOpen == 1 and window()
    strategy.entry("Long", true) // buy by market
    strategy.exit("Take Profit or Stop Loss", "Long", profit = profitTarget, loss = lossTarget)
else if longClose == 1 and window()
    strategy.close("Long")
else if not window()
    strategy.close("Long")
```

> Detail

https://www.fmz.com/strategy/427997

> Last Modified

2023-09-27 17:05:34
