
> Name

趋势追随型MA均线交叉交易策略Trend-Following-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e5a2c0501c930cd61b.png)

[trans]


## 概述

本策略是一个基于移动平均线的趋势追随型交易策略。它使用三条不同参数设置的Hull移动平均线,判断价格趋势方向,并结合快速ATR滤波器实现潜在趋势反转的提前识别。当快中慢三条均线发生向上或向下交叉时,発出买入或卖出信号。该策略同时具有移动止损和移动止盈功能,可以有效控制风险。

## 策略原理

该策略使用三条Hull移动平均线判断价格趋势,包括一条较快的Hull MA,一条中速的Hull MA和一条较慢的Hull MA。根据它们的交叉情况判断趋势方向:

1. 当快线上穿中线时,表示价格进入上升趋势,发出买入信号。

2. 当快线下穿中线时,表示价格进入下跌趋势,发出卖出信号。

为了提高识别趋势反转的灵敏度,策略引入了基于RSI的快速ATR滤波器。该滤波器能够测量价位的变动性,当价格趋势发生转变时,它的数值会发生明显变化。因此,我们可以根据ATR滤波器的上下突破情况提前判断价格趋势的反转。

具体来说,filtr函数实现了该快速ATR滤波器的计算逻辑。它基于RSI的数值,计算ATR的大小。当ATR数值上穿或下穿RSI曲线时,就可能预示着价格趋势的转变。

此外,策略中设置了移动止损和移动止盈条件,可以按照设定的止损百分比和止盈百分比,实现自动的风险管理。

## 优势分析

- 使用三条Hull MA均线判断趋势方向,可以有效过滤市场噪音,识别中长线趋势

- 快速ATR滤波器的应用,可以提高对趋势反转的提前判断能力

- 自动把握趋势反转机会,及时调整仓位,不漏买不漏卖

- 移动止损止盈设置了风险与回报的动态平衡

- 可自定义参数,适用于不同市场和交易品种

## 风险分析 

- MA交叉策略容易产生多头假信号和空头假信号,需要ATR滤波器进行辅助验证

- 大幅震荡市场中,MA容易发生频繁交叉,应密切关注ATR曲线走势

- 停损点过小易被止损,过大又难以控制损失。需根据具体情况调整参数

- 本策略更适合趋势性行情,不宜用于震荡行情

- 可通过参数优化,选择最佳的MA和ATR周期组合,降低假信号率

## 优化方向

- 可尝试将MA类型改为DEMA、TEMA等EMA变体,看是否能过滤更多噪音

- ATR滤波器可改用Keltner通道MIDDLE线,检验对趋势反转判断的提高

- 可测试不同的MA参数组合,找到最佳参数对

- 可测试ATR周期参数,找到最佳的平滑效果

- 可加入量能指标,辅助判断真假突破的可能性

- 可测试是否加入MACD等其他指标,提高信号的可靠性 

## 总结

本策略整合了移动平均线判断趋势方向、ATR滤波器提前探测反转和自动止损止盈管理风险的多项功能。它可以自动跟踪趋势,及时把握反转机会,通过参数优化可以适用于不同品种和周期,是一种非常实用的趋势追随型交易策略。其优点是简单清晰的策略逻辑和高效的风险控制手段。但也需要注意错觉信号和止损点设置的问题。通过进一步优化,可望得到更好的策略效果。


|| 

## Overview

This is a trend following trading strategy based on moving averages. It uses three Hull moving averages with different parameter settings to determine the price trend direction and incorporates a fast ATR filter to detect potential trend reversals in advance. When the fast, medium and slow moving averages cross upwards or downwards, buy or sell signals are generated. The strategy also has trailing stop loss and take profit functions to effectively control risks.

## Strategy Logic

The strategy uses three Hull moving averages to judge the price trend, including a faster Hull MA, a medium Hull MA and a slower Hull MA. The trend direction is determined based on their crossover situations:

1. When the fast line crosses above the medium line, it indicates the price is entering an uptrend and a buy signal is generated.

2. When the fast line crosses below the medium line, it indicates the price is entering a downtrend and a sell signal is generated.

To increase the sensitivity in identifying trend reversals, the strategy introduces a fast ATR filter based on RSI. This filter can measure the volatility of price levels. When the price trend changes, its value will change significantly. Therefore, we can judge the reversal of the price trend in advance based on the breakouts of the ATR filter.

Specifically, the filtr function implements the calculation logic of this fast ATR filter. It calculates the ATR size based on the RSI values. When the ATR value breaks above or below the RSI curve, it may indicate a change in the price trend.

In addition, the strategy sets trailing stop loss and take profit conditions to realize automatic risk management according to the set stop loss percentage and take profit percentage.

## Advantage Analysis

- Using three Hull MA lines to determine the trend direction can effectively filter market noise and identify medium-to-long term trends

- Application of the fast ATR filter can improve the ability to early judge trend reversals 

- Automatically seize opportunities of trend reversal and timely adjust positions without missing buys or sells

- The moving stop loss and take profit setup strikes a dynamic balance between risk and reward

- Customizable parameters make it suitable for different markets and trading instruments

## Risk Analysis

- MA crossover strategies tend to produce false buy and sell signals, requiring ATR filter for verification

- In volatile markets, MAs may cross frequently, closely monitor ATR curve moves

- A stop loss point too small is prone to be stopped out, too large fails to control losses. Need to adjust parameters based on specific situations 

- This strategy suits trending markets more, not suitable for range-bound markets

- Can optimize parameters to select the best MA and ATR period combination, reducing false signals

## Optimization Directions

- Try changing MA type to DEMA, TEMA etc, see if more noise can be filtered

- ATR filter can be changed to Keltner's MIDDLE line to improve trend reversal judgment 

- Can test different MA parameter combinations to find the optimal pair

- Can test ATR period parameter to find the best smoothing effect

- Can add volume indicators to aid judgment of true/false breakouts

- Can test adding other indicators like MACD to improve signal reliability

## Summary

This strategy integrates moving averages for trend direction, ATR filter for early reversal detection and automatic stop loss/take profit for risk management. It can automatically track trends and timely seize reversal opportunities. Through parameter optimization it can be applied to different instruments and timeframes and is a very practical trend following trading strategy. Its advantages are the simple and clear strategy logic and efficient risk control means. But the issues of false signals and stop loss point settings also need attention. Further optimizations may lead to better strategy performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2009|From Year|
|v_input_4|true|To Month|
|v_input_5|true|To Day|
|v_input_6|9999|To Year|
|v_input_7|0|Trade Direction: Long Only|Short Only|Long and Short|
|v_input_8|25|Take Profit Signal 1 Qty Percent|
|v_input_9|25|Take Profit Signal 2 Qty Percent|
|v_input_10|2|Stop Loss Percent|
|v_input_11|4|Relative TimeFrame Multiplier for Second MA Ribbon (0=none, max=100)|
|v_input_12|true|Show Moving Average Lines|
|v_input_13|0|Fast MA Type: : EMA|SMA|WMA|VWMA|SMMA|DEMA|TEMA|HullMA|ZEMA|TMA|SSMA|
|v_input_14|16|Fast - Length|
|v_input_15|0|Medium MA Type: : EMA|SMA|WMA|VWMA|SMMA|DEMA|TEMA|HullMA|ZEMA|TMA|SSMA|
|v_input_16|21|Medium - Length|
|v_input_17|0|Slow MA Type: : EMA|SMA|WMA|VWMA|SMMA|DEMA|TEMA|HullMA|ZEMA|TMA|SSMA|
|v_input_18|26|Slow Length|
|v_input_19|14|RSI Length|
|v_input_20|8|RSI Smoothing Factor|
|v_input_21|5|Fast QQE Factor|
|v_input_22|10|RSI Threshhold|
|v_input_23|true|Show QQE Signal crosses|
|v_input_24|false|Show QQE Zero crosses|
|v_input_25|true|Show QQE Thresh Hold Channel Exits|
|v_input_26|0|Select which QQE signal to Buy/Sell: XC|XQ|XZ|
|v_input_27|0|Select which QQE signal to Close Order: XQ|XC|XZ|
|v_input_28|true|Filter XQ Buy/Sell Orders by Threshold|
|v_input_29|false|Use Moving Average Filter|
|v_input_30|true|Use Trend Directional Filter|
|v_input_31|false|Only Alert First Buy/Sell in a new Trend|
|v_input_32_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-06 00:00:00
end: 2023-11-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

//



//*** START of COMMENT OUT [Alerts]

//strategy(title="[Backtest]QQE Cross v6.0 by JustUncleL", shorttitle="[BT]QQEX v6.0", overlay=true,

//         pyramiding=0, default_qty_value=1000, commission_value=0.1,

//         commission_type=strategy.commission.percent, initial_capital=10000)

//*** END of COMMENT OUT [Alerts]

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

//*** START of COMMENT OUT [BackTest]

strategy(

  title="[Alerts]QQE Cross v6.0 by JustUncleL",

  shorttitle="[AL]QQEX v6.0",

  overlay=true)





FromMonth = input(defval=1, title="From Month", minval=1, maxval=12)

FromDay = input(defval=1, title="From Day", minval=1, maxval=31)

FromYear = input(defval=2009, title="From Year")

ToMonth = input(defval=1, title="To Month", minval=1, maxval=12)

ToDay = input(defval=1, title="To Day", minval=1, maxval=31)

ToYear = input(defval=9999, title="To Year")



start = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window

finish = timestamp(ToYear, ToMonth, ToDay, 23, 59)  // backtest finish window

window = true  // create function "within window of time"





trade_dir = input('Long Only', options=['Long Only', 'Short Only', 'Long and Short'], title='Trade Direction')

tp1_perc = input(25, step=0.25, minval=0, title='Take Profit Signal 1 Qty Percent')/100

tp2_perc = input(25, step=0.25, minval=0, title='Take Profit Signal 2 Qty Percent')/100

sl_perc = input(2, step=0.25, minval=0, title='Stop Loss Percent')/100



dir = trade_dir == 'Long Only' ? strategy.direction.long :

  trade_dir == 'Short Only' ? strategy.direction.short : strategy.direction.all



strategy.risk.allow_entry_in(dir)



//*** END of COMMENT OUT [BackTest]



//

// Author:  JustUncleL

// Date:    10-July-2016

// Version: v6, Major Release Nov-2018

//

// Description:

//  A following indicator is Trend following that uses fast QQE crosses with Moving Averages

//  for trend direction filtering. QQE or Qualitative Quantitative Estimation is based

//  on the relative strength index (RSI), but uses a smoothing technique as an additional

//  transformation. Three crosses can be selected (all selected by default):

//    - Smooth RSI signal crossing ZERO (XZ)

//    - Smooth RSI signal crossing Fast QQE line (XQ), this is like an early warning swing signal.

//    - Smooth RSI signal exiting the RSI Threshhold Channel (XC), this is like a confirmed swing signal.

//      An optimumal Smooth RSI threshold level is between 5% and 10% (default=10), it helps reduce

//      the false swings.

//  These signals can be selected to Open Short/Long and/or Close a trade, default is XC open

//  trade and XQ (or opposite open) to Close trade.

//

//  The (LONG/SHORT) alerts can be optionally filtered by the Moving Average Ribbons:

//    - For LONG alert the Close must be above the fast MA Ribbon and

//        fast MA Ribbon must be above the slow MA Ribbon.

//    - For SHORT alert the Close must be below the fast MA Ribbon and

//        fast MA Ribbon must be below the slow MA Ribbon.

//  and/or directional filter:

//    - For LONG alert the Close must be above the medium MA and the

//      directional of both MA ribbons must be Bullish.

//    - For SELL alert the Close must be below the medium MA and the

//      directional of both MA ribbons must be Bearish.

//

//  This indicator is designed to be used as a Signal to Signal trading BOT

//  in automatic or semi-automatic way (start and stop when conditions are suitable).

//  - For LONG and SHORT alerts I recommend you use "Once per Bar" alarm option

//  - For CLOSE alerts I recommend you use "Once per Bar Close" alarm option

//  (* The script has been designed so that long/short signals come at start of candles *)

//  (* and close signals  come at the end of candles                                    *)

//

// Mofidifications:

//  6.0 - Major Release Version

//      - Added second MA ribbon to help filter signals to the trend direction.

//      - Modified Alert filtering to include second MA Ribbon

//      - Change default settings to reflect Signal to Signal BOT parameters.

//      - Removed older redunant alerts.

//

//  5.0 - Development series

//

//  4.1 - Fix bug with painting Buy/Sell arrows when non-repaint shunt mode selected.

//      - Added option to alert just the first Buy/Sell alert after a trend swing

//      - Added Long and Short Alarms. When combined with the "first Buy/Sell" in trend option,

//        It is now possible to use this indicator to interface with AutoView

//        or ProfitView. I suggest using the "QQEX XZ Alert" alarm to exit Long or Short

//        trade. Use only "Once per bar Close" option for Alarms. This is not a full

//        fledged trading BOT though with TP/SL settings.

//

//      - Changed QQE defaults to be a bit smoother (14, 8, 5) instead of (6, 3, 2.618)

//        which is more suited to Forex and Crypto trading.

//

//  4.0 - Added implied GPL copyright notice.

//      - Changed defaults to use HullMAs instead of EMAs.

//  3.0 - No repaint on BUY/SELL alert, however, now trades should be taken when the BUY/SELL

//        Alert is displayed. The alarm is still generated on the previous candle so you can

//        still get a pre-warning, this enables you time to analyse the pending alert.

//      - Added option to test success of alerted trades, highlight successful and failed trade bars

//        and show simple stats: success rate and number of trades (out of 5000), this will help

//        tune the settings for timeframe and currency PAIR.

//  2.0 - Added code to use the medium moving average (EMA20) rising/falling for additional

//        trend direction filter.

//      - Remove Moving Average cross over signals and other options not used in this indicator.

//      - Added code to distinguish between the crosses, now only show Thresh Hold crosses as BUY/SELL

//        alerts.

//      - Modidied default settings to more well known MA's and slightly different QQE settings, these

//        work well at lower timeframes.

//      - Added circle plots at bottom of chart to show when actual BUY/SELL alerts occur.

//  1.0 - original

//

// References:

//  Some Code borrowed from:

//  - "Scalp Jockey - MTF MA Cross Visual Strategizer by JayRogers"

//  - "QQE MT4 by glaz"

//  Inspiration from:

//  - http://www.forexstrategiesresources.com/binary-options-strategies-ii/189-aurora-binary-trading/

//  - http://www.forexstrategiesresources.com/metatrader-4-trading-systems-v/652-qqe-smoothed-trading/

//  - http://dewinforex.com/forex-indicators/qqe-indicator-not-quite-grail-but-accurately-defines-trend-and-flat.html

//  - "Binary option trading by two previous bars" by radixvinni

//

//

// -----------------------------------------------------------------------------

// Copyright 2015 Glaz,JayRogers

//

// Copyright 2016,2017,2018 JustUncleL

//

// This program is free software: you can redistribute it and/or modify

// it under the terms of the GNU General Public License as published by

// the Free Software Foundation, either version 3 of the License, or

// any later version.

//

// This program is distributed in the hope that it will be useful,

// but WITHOUT ANY WARRANTY; without even the implied warranty of

// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the

// GNU General Public License for more details.

//

// The GNU General Public License can be found here

// <http://www.gnu.org/licenses/>.

//

// -----------------------------------------------------------------------------

//



// Use Alternate Anchor TF for MAs

anchor     = input(4,minval=0,maxval=100,title="Relative TimeFrame Multiplier for Second MA Ribbon (0=none, max=100)")

//



// - INPUTS START

// Fast MA - type, source, length

showAvgs     = input(true,title="Show Moving Average Lines")

type1   = input(defval="EMA", title="Fast MA Type: ", options=["SMA", "EMA", "WMA", "VWMA", "SMMA", "DEMA", "TEMA", "HullMA", "ZEMA", "TMA", "SSMA"])

len1    = input(defval=16, title="Fast - Length", minval=1)

gamma1  = 0.33

// Medium Fast MA - type, source, length

type2   = input(defval="EMA", title="Medium MA Type: ", options=["SMA", "EMA", "WMA", "VWMA", "SMMA", "DEMA", "TEMA", "HullMA", "ZEMA", "TMA", "SSMA"])

len2    = input(defval=21, title="Medium - Length", minval=1)

gamma2  = 0.55

// Slow MA - type, source, length

type3   = input(defval="EMA", title="Slow MA Type: ", options=["SMA", "EMA", "WMA", "VWMA", "SMMA", "DEMA", "TEMA", "HullMA", "ZEMA", "TMA", "SSMA"])

len3    = input(defval=26, title="Slow Length", minval=1)

gamma3  = 0.77

//

// QQE rsi Length, Smoothing, fast ATR factor, source

RSILen  = input(14,title='RSI Length')

SF      = input(8,title='RSI Smoothing Factor')

QQEfactor  = input(5.0,type=float,title='Fast QQE Factor')

threshhold = input(10, title="RSI Threshhold")

//

sQQEx   = input(true,title="Show QQE Signal crosses")

sQQEz   = input(false,title="Show QQE Zero crosses")

sQQEc   = input(true,title="Show QQE Thresh Hold Channel Exits")

//

tradeSignal = input("XC", title="Select which QQE signal to Buy/Sell", options=["XC","XQ","XZ"])

closeSignal = input("XQ", title="Select which QQE signal to Close Order", options=["XC","XQ","XZ"])

//

xfilter = input(true, title="Filter XQ Buy/Sell Orders by Threshold" )

filter  = input(false,title="Use Moving Average Filter")

dfilter = input(true, title="Use Trend Directional Filter" )

ufirst  = input(false, title="Only Alert First Buy/Sell in a new Trend")

RSIsrc  = input(close,title="Source")



src     = RSIsrc // MA source

srcclose= RSIsrc



///////////////////////////////////////////////

//* Backtesting Period Selector | Component *//

///////////////////////////////////////////////



//* https://www.tradingview.com/script/eCC1cvxQ-Backtesting-Period-Selector-Component *//

//* https://www.tradingview.com/u/pbergden/ *//

//* Modifications made by JustUncleL*//





//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

//*** START of COMMENT OUT [Alerts]



//testStartYear = input(2018, "Backtest Start Year",minval=1980)

//testStartMonth = input(6, "Backtest Start Month",minval=1,maxval=12)

//testStartDay = input(12, "Backtest Start Day",minval=1,maxval=31)

//testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)



//testStopYear = 9999 //input(9999, "Backtest Stop Year",minval=1980)

//testStopMonth = 12 // input(12, "Backtest Stop Month",minval=1,maxval=12)

//testStopDay = 31 //input(31, "Backtest Stop Day",minval=1,maxval=31)

//testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)



//testPeriod = time >= testPeriodStart and time <= testPeriodStop ? true : false



//*** END of COMMENT OUT [Alerts]

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//



// - INPUTS END





gold = #FFD700

AQUA = #00FFFFFF

BLUE = #0000FFFF

RED  = #FF0000FF

LIME = #00FF00FF

GRAY = #808080FF



// - FUNCTIONS



// - variant(type, src, len, gamma)

// Returns MA input selection variant, default to SMA if blank or typo.



// SuperSmoother filter

// © 2013  John F. Ehlers

variant_supersmoother(src,len) =>

    a1 = exp(-1.414*3.14159 / len)

    b1 = 2*a1*cos(1.414*3.14159 / len)

    c2 = b1

    c3 = (-a1)*a1

    c1 = 1 - c2 - c3

    v9 = 0.0

    v9 := c1*(src + nz(src[1])) / 2 + c2*nz(v9[1]) + c3*nz(v9[2])

    v9



variant_smoothed(src,len) =>

    v5 = 0.0

    v5 := na(v5[1]) ? sma(src, len) : (v5[1] * (len - 1) + src) / len

    v5



variant_zerolagema(src,len) =>

    ema1 = ema(src, len)

    ema2 = ema(ema1, len)

    v10 = ema1+(ema1-ema2)

    v10



variant_doubleema(src,len) =>

    v2 = ema(src, len)

    v6 = 2 * v2 - ema(v2, len)

    v6



variant_tripleema(src,len) =>

    v2 = ema(src, len)

    v7 = 3 * (v2 - ema(v2, len)) + ema(ema(v2, len), len)               // Triple Exponential

    v7



//calc Laguerre

variant_lag(p,g) =>

    L0 = 0.0

    L1 = 0.0

    L2 = 0.0

    L3 = 0.0

    L0 := (1 - g)*p+g*nz(L0[1])

    L1 := -g*L0+nz(L0[1])+g*nz(L1[1])

    L2 := -g*L1+nz(L1[1])+g*nz(L2[1])

    L3 := -g*L2+nz(L2[1])+g*nz(L3[1])

    f = (L0 + 2*L1 + 2*L2 + L3)/6

    f



// return variant, defaults to SMA

variant(type, src, len, g) =>

    type=="EMA"     ? ema(src,len) :

      type=="WMA"   ? wma(src,len):

      type=="VWMA"  ? vwma(src,len) :

      type=="SMMA"  ? variant_smoothed(src,len) :

      type=="DEMA"  ? variant_doubleema(src,len):

      type=="TEMA"  ? variant_tripleema(src,len):

      type=="LAGMA" ? variant_lag(src,g) :

      type=="HullMA"? wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len))) :

      type=="SSMA"  ? variant_supersmoother(src,len) :

      type=="ZEMA"  ? variant_zerolagema(src,len) :

      type=="TMA"   ? sma(sma(src,len),len) :

                      sma(src,len)



// - /variant

// If have anchor specified, calculate the base multiplier, base on time in mins

//mult  = isintraday ? anchor==0 or interval<=0 or interval>=anchor or anchor>1440? 1 : round(anchor/interval) : 1

//mult := not isintraday?  1 : mult  // Only available Daily or less



// Anchor is a relative multiplier based on current TF.

mult = anchor>0 ? anchor : 1



// - FUNCTIONS END





// - Fast ATR QQE

//

Wilders_Period = RSILen * 2 - 1

//

Rsi = rsi(RSIsrc,RSILen)

RSIndex = ema(Rsi, SF)

AtrRsi = abs(RSIndex[1] - RSIndex)

MaAtrRsi = ema(AtrRsi, Wilders_Period)

DeltaFastAtrRsi = ema(MaAtrRsi,Wilders_Period) * QQEfactor

//

newshortband=  RSIndex + DeltaFastAtrRsi

newlongband= RSIndex - DeltaFastAtrRsi

longband = 0.0

shortband=0.0

trend = 0

longband:=RSIndex[1] > longband[1] and RSIndex > longband[1] ? max(longband[1],newlongband) : newlongband

shortband:=RSIndex[1] < shortband[1] and  RSIndex < shortband[1] ? min(shortband[1],newshortband) : newshortband

trend:=cross(RSIndex, shortband[1])? 1 : cross(longband[1], RSIndex) ? -1 : nz(trend[1],1)

FastAtrRsiTL = trend==1 ? longband : shortband





// - SERIES VARIABLES

// MA's

ma_fast    = variant(type1, srcclose, len1, gamma1)

ma_medium  = variant(type2, srcclose, len2, gamma2)

ma_slow    = variant(type3, srcclose, len3, gamma3)

// MA's

ma_fast_alt    = variant(type1, srcclose, len1*mult, gamma1)

ma_medium_alt  = variant(type2, srcclose, len2*mult, gamma2)

ma_slow_alt    = variant(type3, srcclose, len3*mult, gamma3)



// Get Direction From Medium Moving Average

direction = rising(ma_medium,3) ? 1 : falling(ma_medium,3) ? -1 : 0

altDirection = rising(ma_medium_alt,3) ? 1 : falling(ma_medium_alt,3) ? -1 : 0

//

// Find all the QQE Crosses

QQExlong  = 0, QQExlong := nz(QQExlong[1])

QQExshort = 0, QQExshort := nz(QQExshort[1])

QQExlong  := FastAtrRsiTL< RSIndex ? QQExlong+1 : 0

QQExshort := FastAtrRsiTL> RSIndex ? QQExshort+1 : 0

// Zero cross

QQEzlong  = 0, QQEzlong := nz(QQEzlong[1])

QQEzshort = 0, QQEzshort := nz(QQEzshort[1])

QQEzlong  := RSIndex>=50 ? QQEzlong+1 : 0

QQEzshort := RSIndex<50 ? QQEzshort+1 : 0

//

// Thresh Hold channel Crosses give the BUY/SELL alerts.

QQEclong  = 0, QQEclong := nz(QQEclong[1])

QQEcshort = 0, QQEcshort := nz(QQEcshort[1])

QQEclong  := RSIndex>(50+threshhold) ? QQEclong+1 : 0

QQEcshort := RSIndex<(50-threshhold) ? QQEcshort+1 : 0



//

// Check Filtering.

QQEflong = mult == 1 ? (not filter or (srcclose>ma_medium and ma_medium>ma_slow and ma_fast>ma_medium)) and (not dfilter or (direction>0 )) :

                       (not filter or (ma_medium>ma_medium_alt and srcclose>ma_fast and ma_fast>ma_medium)) and (not dfilter or (direction>0 and altDirection>0 and srcclose>ma_medium))

QQEfshort = mult == 1 ? (not filter or (srcclose<ma_medium and ma_medium<ma_slow and ma_fast<ma_medium)) and (not dfilter or (direction<0 )) :

                       (not filter or (ma_medium<ma_medium_alt and srcclose<ma_fast and ma_fast<ma_medium)) and (not dfilter or (direction<0 and altDirection<0 and srcclose<ma_medium))



QQExfilter = (not xfilter or  RSIndex>(50+threshhold) or RSIndex<(50-threshhold))

//

// Get final BUY / SELL alert determination

buy_ = 0, buy_ := nz(buy_[1])

sell_ = 0, sell_ := nz(sell_[1])



// Make sure Buy/Sell are non-repaint and occur after close signal.

buy_  := tradeSignal=="XC"? (QQEclong[1]==1 and QQEflong[1] ? buy_+1 : 0) :

         tradeSignal=="XQ"? (QQExlong[1]==1 and QQEflong[1] and QQExfilter[1]? buy_+1 : 0) :

         tradeSignal=="XZ"? (QQEzlong[1]==1 and QQEflong[1] ? buy_+1 : 0) :  0

sell_ := tradeSignal=="XC"? (QQEcshort[1]==1 and QQEfshort[1] ? sell_+1 : 0) :

         tradeSignal=="XQ"? (QQExshort[1]==1 and QQEfshort[1] and QQExfilter[1]? sell_+1 : 0) :

         tradeSignal=="XZ"? (QQEzshort[1]==1 and QQEfshort[1] ? sell_+1 : 0) : 0

//

// Find the first Buy/Sell in trend swing.

Buy = 0, Buy := nz(Buy[1])

Sell = 0, Sell := nz(Sell[1])

Buy := sell_>0 ? 0 : buy_==1 or Buy>0  ? Buy+1 : Buy

Sell := buy_>0 ? 0 : sell_==1 or Sell>0 ? Sell+1 : Sell



// Select First or all buy/sell alerts.

buy = ufirst ? Buy : buy_

sell = ufirst ? Sell : sell_



closeLong = 0, closeLong := nz(closeLong[1])

closeShort = 0, closeShort := nz(closeShort[1])

closeLong  := closeSignal=="XC" ? (QQEcshort==1 ? closeLong+1 : 0)  :

              closeSignal=="XQ" ? tradeSignal=="XQ" ? (QQExshort==1 ? closeLong+1 : 0) : ((QQExshort==1 or QQEzshort or QQEcshort) ? closeLong+1 : 0)  :

              closeSignal=="XZ" ? (QQEzshort==1 ? closeLong+1 : 0)  : 0

closeShort := closeSignal=="XC" ? (QQEclong==1 ? closeShort+1 : 0)  :

              closeSignal=="XQ" ? tradeSignal=="XQ" ? (QQExlong==1 ? closeShort+1 : 0) : ((QQExlong==1  or QQEzlong or QQEclong==1) ? closeShort+1 : 0)  :

              closeSignal=="XZ" ? (QQEzlong==1 ? closeShort+1 : 0)  : 0





tradestate = 0, tradestate := nz(tradestate[1])

tradestate := tradestate==0 ? (buy==1 ? 1 : sell==1 ? 2 : 0) : (tradestate==1 and closeLong==1) or (tradestate==2 and closeShort==1)? 0 : tradestate



isLong  = change(tradestate) and tradestate==1

isShort =  change(tradestate) and tradestate==2

isCloseLong =  change(tradestate) and tradestate==0 and nz(tradestate[1])==1

isCloseShort =  change(tradestate) and tradestate==0 and nz(tradestate[1])==2



// - SERIES VARIABLES END



// - PLOTTING

// Ma's

tcolor = direction<0?red:green

// ma1=plot(showAvgs?ma_fast:na, title="MA Fast", color=tcolor, linewidth=1, transp=0)

ma2=plot(showAvgs?ma_medium:na, title="MA Medium Fast", color=tcolor, linewidth=2, transp=0)

// ma3=plot(showAvgs?ma_slow:na, title="MA Slow", color=tcolor, linewidth=1, transp=0)

// fill(ma1,ma3,color=tcolor,transp=90)



// Ma's

altTcolor=altDirection<0?red:green

barcolor(altDirection<0? red:green)

ma4=plot(showAvgs and mult>1?ma_fast_alt:na, title="MA Fast", color=altTcolor, linewidth=1, transp=0)

ma5=plot(showAvgs and mult>1?ma_medium_alt:na, title="MA Medium Fast", color=altTcolor, linewidth=2, transp=0)

ma6=plot(showAvgs and mult>1?ma_slow_alt:na, title="MA Slow", color=altTcolor, linewidth=1, transp=0)

fill(ma4,ma6,color=altTcolor,transp=90)



// Color Changes

turned_aqua = altTcolor[1] == red and altTcolor == green

turned_blue = altTcolor[1] == green and altTcolor == red

take_profit_long = ma_slow > ma_fast_alt and ma_slow > ma_slow_alt and tcolor[1] == green and tcolor == red

take_profit_short = ma_slow < ma_fast_alt and ma_slow < ma_slow_alt and tcolor[1] == red and tcolor == green

// plotshape(turned_aqua, title="MA's Green Buy", style=shape.triangleup, location=location.belowbar, text="Long", color=green, transp=20, size=size.normal)

// plotshape(turned_blue, title="MA's Red Sell", style=shape.triangledown, location=location.abovebar, text="Short", color=red, transp=20, size=size.normal)

// plotshape(take_profit_long, title="Take Profit Long", style=shape.triangledown, location=location.abovebar, text="Take Profit Long", color=purple, transp=20, size=size.tiny)

// plotshape(take_profit_short, title="Take Profit Short", style=shape.triangleup, location=location.belowbar, text="Take Profit Short", color=purple, transp=20, size=size.tiny)



strategy.entry("Long", strategy.long, when=turned_aqua and window)

strategy.entry("short", strategy.short, when=turned_blue and window)



entered_long = strategy.position_size[1] <= 0 and strategy.position_size > 0

entered_short = strategy.position_size[1] >= 0 and strategy.position_size < 0

long_tp_count = 0

long_tp_count := entered_long ? 0 : take_profit_long ? long_tp_count[1] + 1 : long_tp_count[1]

short_tp_count = 0

short_tp_count := entered_short ? 0 : take_profit_short ? short_tp_count[1] + 1 : short_tp_count[1]



// take_off_long = long_tp_count == 0 ? tp1_perc : long_tp_count == 1 ? tp2_perc : na

// take_off_short = short_tp_count == 0 ? tp1_perc : short_tp_count == 1 ? tp2_perc : na



long_tp1_qty = na

long_tp2_qty = na

short_tp1_qty = na

short_tp2_qty = na



long_tp1_qty := entered_long ? strategy.position_size * tp1_perc : long_tp1_qty[1]

long_tp2_qty := entered_long ? strategy.position_size * tp2_perc : long_tp2_qty[1]



short_tp1_qty := entered_short ? -strategy.position_size * tp1_perc : short_tp1_qty[1]

short_tp2_qty := entered_short ? -strategy.position_size * tp2_perc : short_tp2_qty[1]



long_sl_level = sl_perc == 0 ? na : strategy.position_avg_price * (1 - sl_perc)

short_sl_level = sl_perc == 0 ? na : strategy.position_avg_price * (1 + sl_perc)



strategy.order("LTP1", strategy.short, qty=long_tp1_qty, when=strategy.position_size > 0 and take_profit_long and long_tp_count[1]==0 and not turned_blue)

strategy.order("LTP2", strategy.short, qty=long_tp2_qty, when=strategy.position_size > 0 and take_profit_long and long_tp_count[1]==1 and not turned_blue)



strategy.order("STP1", strategy.long, qty=short_tp1_qty, when=strategy.position_size < 0 and take_profit_short and short_tp_count[1]==0 and not turned_aqua)

strategy.order("STP2", strategy.long, qty=short_tp2_qty, when=strategy.position_size < 0 and take_profit_short and short_tp_count[1]==1 and not turned_aqua)



strategy.exit("L-SL", "Long", stop=long_sl_level)

strategy.exit("S-SL", "Short", stop=short_sl_level)



// SL PLOTS

// --------

plot(strategy.position_size > 0  ? long_sl_level : na, color=red, style=linebr, title="Long Stop")

plot(strategy.position_size < 0  ? short_sl_level : na, color=maroon, style=linebr, title="Short Stop")



// ALERTS (STUDY ONLY)

alertcondition(turned_aqua, title="Long", message="Ma's Turned Green")

alertcondition(turned_blue, title="Short", message="Ma's Turned Red")

alertcondition(take_profit_long, title="Take Profit Long", message="Take Profit Long")

alertcondition(take_profit_short, title="Take Profit Short", message="Take Profit Short")

alertcondition(isLong,  title="QQEX Long", message="QQEX LONG")  // use "Once per Bar" option

alertcondition(isShort, title="QQEX Short", message="QQEX SHORT") // use "Once per Bar" option

alertcondition(isCloseLong, title="QQEX Close Long", message="QQEX CLOSE LONG") // use "Once per Bar Close" option

alertcondition(isCloseShort, title="QQEX Close Short", message="QQEX CLOSE SHORT") // use "Once per Bar Close" option



// show only when alert condition is met and bar closed.

plotshape(isLong or isShort,title= "Cross Alert Completed", location=location.bottom, color=isShort?red:green, transp=0, style=shape.circle,size=size.auto,offset=0)

plotshape(isCloseShort[1] or isCloseLong[1],title= "Close Order", location=location.top, color=isCloseShort[1]?red:green, transp=0, style=shape.square,size=size.auto,offset=-1)





// Test Plots

// ---------

// plot(long_tp_count)

// plot(short_tp_count, color=red)

//EOF


```

> Detail

https://www.fmz.com/strategy/431270

> Last Modified

2023-11-06 16:01:30
