
> Name

MACD-5合1多指标趋势追踪策略Multi-timeframe-MACD-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16345d2960194251bf6.png)
 [trans]
## 概述

该策略是一个以 MACD 为核心的多指标组合策略。它整合了 MACD 的 5 种交易信号,另外还内置了 5 种移动平均线以供选择。该策略充分利用 MACD 的趋势判断能力,设置不同的交易条件来过滤掉错误信号,从而获取更高的获利概率。

## 策略名称

多时间框架MACD趋势跟踪策略(Multi-timeframe MACD Trend Following Strategy)

## 策略原理

该策略主要依靠 MACD 指标判断趋势方向。MACD 是由快线(12日EMA)减去慢线(26日EMA)形成的MACD线,再画出其移动平均线即为信号线。快线上穿慢线为金叉做多信号,快线下穿慢线为死叉做空信号。

该策略设置了5种交易条件:

1. 简单的金叉死叉信号
2. 结合MACD的超买超卖区域,过滤掉部分假信号
3. 金叉时要求收盘价站上移动平均线才能入场
4. 金叉时要求收盘价超过移动平均线区域才能入场 
5. 金叉时要求RSI指标高于某一水平才能入场

同时,该策略还提供了5种移动平均线(EMA、SMA、VWMA、RMA、WMA)以及可自定义的参数设置。

## 策略优势

- 利用MACD判断市场趋势方向的优势,多种交易条件过滤假信号,提高获利概率
- 内置多种移动平均线类型,可以灵活应对不同品种
- 可自定义参数设置,适应性强
- 多种条件入场,避免单一指标带来的风险
- 追踪趋势能力较强,适合中长线操作

## 策略风险

- MACD本身作为趋势指标,在盘整市场中存在亏损风险
- 未考虑突发事件的影响,如重大利空消息发布等
- 参数设置不当可能导致策略效果不佳
- 没有设置止损,可能带来更大的亏损

可以通过适当调整参数、设置止损、结合其他指标等方法来降低风险。

## 策略优化方向 

该策略可以从以下几个方面进行优化:

1. 优化移动平均线参数,适配不同交易品种
2. 优化MACD参数,获取更精确的交易信号
3. 增加止损机制,规避市场突发事件的影响
4. 结合其他指标,如KDJ、震荡指标等,提升策略效果
5. 增加机器学习算法,自动优化参数设置
6. 进行回测优化,测试更长的时间周期数据

## 总结

该策略总体来说是一个非常实用的趋势跟踪策略。它利用MACD指标的优势,设置不同的交易条件来过滤错误信号,从而获取高概率的交易机会。同时参数和指标可自定义,适应性非常强。值得注意的是,任何策略都无法完美预测市场,需要根据实际情况不断调整优化,才能获得长期稳定的超额收益。

|| 

## Overview  

This is a multi-indicator combined strategy centering on the MACD indicator. It integrates 5 types of MACD trading signals and 5 types of moving averages. The strategy makes full use of the trend judgment capability of MACD to set different trading conditions for filtering out wrong signals, thereby obtaining higher profit probabilities.

## Strategy Name  

Multi-timeframe MACD Trend Following Strategy

## Strategy Logic

The core of this strategy relies on the MACD indicator to determine the trend direction. The MACD is formed by the fast line (12-day EMA) minus the slow line (26-day EMA). The moving average of MACD itself is the signal line. The fast line crossing above the slow line gives a buy signal, while the fast line crossing below the slow line gives a sell signal.

The strategy has set 5 trading conditions:

1. Simple golden cross and death cross signals
2. Combine the overbought/oversold area of MACD to filter out some false signals  
3. Require close price above moving average upon golden cross to entry 
4. Require close price above moving average zone upon golden cross to entry
5. Require RSI indicator above a certain level upon golden cross to entry

At the same time, the strategy also provides 5 types of moving averages (EMA, SMA, VWMA, RMA, WMA) and customizable parameter settings.

## Advantages

- Utilize the trend determination capability of MACD, multiple trading conditions filter false signals and improve profit probabilities  
- Built-in multiple types of moving averages, can flexibly adapt to different products
- Customizable parameter settings, high adaptability
- Multiple conditions for entry, avoid risks from relying on single indicator  
- Strong trend tracking capability, suitable for medium-long term operations

## Risks

- MACD itself has the risk of losses in range-bound markets
- Does not consider the impact of sudden events like significant negative news  
- Improper parameter settings may lead to poor strategy performance
- No stop loss function may lead to greater losses  

Methods like adjusting parameters properly, setting stop loss, combining other indicators can help reduce risks.  

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize moving average parameters for adapting different trading products  
2. Optimize MACD parameters for getting more precise trading signals
3. Add stop loss mechanisms to avoid impacts from market sudden events
4. Combine with other indicators like KDJ, Volatility Index to improve strategy performance  
5. Add machine learning algorithms to auto optimize parameter settings
6. Conduct backtesting over longer time period  

## Conclusion  

In general, this is a very practical trend following strategy. By utilizing the advantages of MACD and setting different trading conditions to filter wrong signals, it captures high-probability trading opportunities. Also, the customizable parameters and indicators make it highly adaptive. Notably, no strategy can perfectly predict the market. Continuous adjustment and optimization based on practical situation are needed to obtain long-term stable excess returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|MACD Fast|
|v_input_2|26|MACD Slow |
|v_input_3|9|Signal Line|
|v_input_4_close|0|Source      : close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|0|Oscilattor : EMA|SMA|
|v_input_6|0|Signal       : EMA|SMA|
|v_input_20|timestamp(01 Jan 2021 00:00 +0000)|Start Time                           |
|v_input_21|timestamp(01 Jan 2022 00:00 +0000)|End Time                          |
|v_input_7|true|(?CHOOSE YOUR DESIRE SIGNAL)Stgy №1:? MACD CrossOver|
|v_input_8|false|Stgy №2:? MACD + OverBought |
|v_input_9|false|MACD_OB_LVL|
|v_input_10|false|Stgy №3:? MACD + Close         |
|v_input_11|21|MA_signal_len|
|v_input_12|0|MA_signal_type: EMA|SMA|RMA|WMA|VWMA|DEMA|TEMA|
|v_input_13|false|Stgy №4:? MACD + MA-ZONE    |
|v_input_14|21|MA_zone_len|
|v_input_15|0|MA_zone_type: EMA|SMA|RMA|WMA|VWMA|DEMA|TEMA|
|v_input_16|false|Stgy №5:? MACD + RSI-OB|
|v_input_17|14|Length|
|v_input_18|50|Entry|
|v_input_19|70|No-Entry|
|v_input_22|2|(???macd Width & Colors setting??)MACD Line               |
|v_input_23|#11ff00|MACD_color_High|
|v_input_24|#e91e63|MACD_color_Low|
|v_input_25|2|Signal Line               |
|v_input_26|#ffeb3b|signalLine_col_hi|
|v_input_27|#ffeb3b|signalLine_col_lo|
|v_input_28|true|Histogram        |
|v_input_29|#26A69A|BuyStrongHist|
|v_input_30|#B2DFDB|BuyWeakHist|
|v_input_31|#FFCDD2|✨|
|v_input_32|#FF5252|SellStrongHist|
|v_input_33|true|Cross               |
|v_input_34|5|macd_cross_width|
|v_input_35|#ffffff|dot_crsovr_col|
|v_input_36|#e91e63|dot_crsndr_col|
|v_input_37|true|Zone Color        |
|v_input_38|lime|zone_crsovr_col|
|v_input_39|#e91e63|zone_crsndr_col|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-16 00:00:00
end: 2024-01-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HamidBox


//@version=4
strategy("MACD [5-in-1]")

matype_zone(src, len, type) =>
    type == "EMA" ? ema(src, len) :
     type == "SMA" ? sma(src, len) :
     type == "RMA" ? rma(src, len) : 
     type == "WMA" ? wma(src, len) : 
     type == "VWMA" ? vwma(src, len) :
     na

matype_signal(src, len, type) =>
    type == "EMA" ? ema(src, len) :
     type == "SMA" ? sma(src, len) :
     type == "RMA" ? rma(src, len) : 
     type == "WMA" ? wma(src, len) : 
     type == "VWMA" ? vwma(src, len) :
     na

// MACD INPUTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
macd_FastLength     = input(title="MACD Fast", defval=12, minval=1, type=input.integer, inline="fastslow")                      ///
macd_SlowLength     = input(title="MACD Slow ", defval=26, minval=1, type=input.integer, inline="fastslow")                     ///
macd_signalLen      = input(title="Signal Line", defval=9, minval=1, type=input.integer, inline="signalsrc")                    ///
macd_Source         = input(title="Source      ", defval=close, type=input.source, inline="signalsrc")                          ///
MACD_Line           = input(title="Oscilattor ", defval="EMA", type=input.string, options=["EMA" , "SMA"], inline="matype")     ///
SignalLine          = input(title="Signal       ", defval="EMA", type=input.string, options=["EMA" , "SMA"], inline="matype")   ///
                                                                                                                                ///
// MACD SETUP /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
macd_Fast           = MACD_Line == "SMA" ? sma(macd_Source , macd_FastLength) : ema(macd_Source , macd_FastLength)      ///
macd_Slow           = MACD_Line == "SMA" ? sma(macd_Source , macd_SlowLength) : ema(macd_Source , macd_SlowLength)      ///
MACD                = macd_Fast - macd_Slow                                                                             ///
Signal              = SignalLine == "SMA" ? sma(MACD, macd_signalLen) : ema(MACD, macd_signalLen)                       ///
histogram           = MACD - Signal                                                                                     ///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MACD CONDITIONS SECTION /////////////////////////////////////////////////////
macd_grtr_signal    = MACD > Signal                                           //
macd_less_signal    = MACD < Signal                                           //
macd_crsovr_signal  = crossover(MACD , Signal) ? MACD : na      // FOR MACD CROSS DOT PLOTING //
macd_crsndr_signal  = crossunder(MACD , Signal) ? MACD : na     // FOR MACD CROSS DOT PLOTING //                 
macd_crsovr         = crossover(MACD , Signal)                                //
macd_crsndr         = crossunder(MACD , Signal)                               //
////////////////////////////////////////////////////////////////////////////////


// Choose your Desire Signal ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
MACD_crs_signal     = input(true, "Stgy №1:? MACD CrossOver", group="CHOOSE YOUR DESIRE SIGNAL", tooltip="??? Condition ???\nBUY: MACD CrossOver Signal Line\nSELL: MACD CrossUnder Signal Line\nDefault Signal")

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

MACD_OB             = input(false, "Stgy №2:? MACD + OverBought ", inline="obs", group="CHOOSE YOUR DESIRE SIGNAL", tooltip="MACD also work as OverBought & OverSold system, same like RSI or other indicators who have OB/OS system, so i added OB-Level in MACD,\nso simple rule is: if MACD Lines is Above OB-Level, we will not take any trade, we only follow MACD signals when MACD-Lines will Below OB-Level")
MACD_OB_LVL         = input(title="", defval=0.0, type=input.float, inline="obs", group="CHOOSE YOUR DESIRE SIGNAL", tooltip="MACD also work as OverBought & OverSold system, same like RSI or other indicators who have OB/OS system, so i added OB-Level in MACD,\nso simple rule is: if MACD Lines is Above OB-Level, we will not take any trade, we only follow MACD signals when MACD-Lines will Below OB-Level") 
hline(MACD_OB_LVL, color=color.red, title="MACD OB", linestyle=hline.style_dashed)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

MACD_close          = input(false, "Stgy №3:? MACD + Close         ", inline="MAsignal", group="CHOOSE YOUR DESIRE SIGNAL", tooltip="??? Condition ???\n\nBUY RULES\n1st: MACD CrossOver Signal Line\n2nd: Close (Greater) Than Moving Average\n\nSELL RULES\n1st: MACD CrossUnder Signal Line\n2nd: Close (Less) Than Moving Average\n\nExplanation: When (MACD Cross Signal Line) and also Market current Candle Close or previous 1st-4th any Candle will have close greater than Moving Average (You Choose: EMA or SMA etc...)\n?NOTE: in this Condition only Singal Moving Average work => (Slow MA),")
MA_signal_len       = input(title="", defval=21, type=input.integer, inline="MAsignal", group="CHOOSE YOUR DESIRE SIGNAL")    //      // 
MA_signal_type      = input(title="", defval="EMA", options=["SMA" , "EMA" , "RMA", "WMA" , "VWMA" , "DEMA", "TEMA"], inline="MAsignal", group="CHOOSE YOUR DESIRE SIGNAL", tooltip="??? Condition ???\n\nBUY RULES\n1st: MACD CrossOver Signal Line\n2nd: Close (Greater) Than Moving Average\n\nSELL RULES\n1st: MACD CrossUnder Signal Line\n2nd: Close (Less) Than Moving Average\n\nExplanation: When (MACD Cross Signal Line) and also Market current Candle Close will have close greater than Moving Average (You Choose: EMA or SMA etc...)")     //      //

dema = if MA_signal_type == "DEMA"
    ema = ema(close , MA_signal_len)
    2 * ema - ema(ema , MA_signal_len)
tema = if MA_signal_type == "TEMA"
    ema = ema(close , MA_signal_len)
    3 * (ema - ema(ema, MA_signal_len)) + ema(ema(ema, MA_signal_len), MA_signal_len)

MA_signal           = matype_zone(close, MA_signal_len, MA_signal_type)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
MACD_ZONE           = input(false, "Stgy №4:? MACD + MA-ZONE    ", inline="MAZONE", group="CHOOSE YOUR DESIRE SIGNAL", tooltip="??? Condition ???\n\nBUY RULES:\n1st: MACD CrossOver Signal Line\n2nd: Close (Greater) than (MA-ZONE)\n\nSELL RULES:\n1st: MACD CrossUnder Signal Line\n2nd: Close (Less) than (MA-ZONE)")
MA_zone_len         = input(title="", defval=21, type=input.integer, inline="MAZONE", group="CHOOSE YOUR DESIRE SIGNAL")
MA_zone_type        = input(title="", defval="EMA", options=["SMA" , "EMA" , "RMA", "WMA" , "VWMA" , "DEMA", "TEMA"], inline="MAZONE", group="CHOOSE YOUR DESIRE SIGNAL", tooltip="??? Condition ???\n\nBUY RULES:\n1st: MACD CrossOver Signal Line\n2nd: Close (Greater) than (MA-ZONE)\n\nSELL RULES:\n1st: MACD CrossUnder Signal Line\n2nd: Close (Less) than (MA-ZONE)")

dema2 = if MA_zone_type == "DEMA"
    ema = ema(close , MA_zone_len)
    2 * ema - ema(ema , MA_zone_len)
tema2 = if MA_zone_type == "TEMA"
    ema = ema(close , MA_zone_len)
    3 * (ema - ema(ema, MA_zone_len)) + ema(ema(ema, MA_zone_len), MA_zone_len)

MA_zone_srcHi       = matype_signal(high, MA_zone_len, MA_zone_type)                                                                                        //      //
MA_zone_srcLO       = matype_signal(low, MA_zone_len, MA_zone_type)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

MACD_wid_rsiOB      = input(false, "Stgy №5:? MACD + RSI-OB", group="CHOOSE YOUR DESIRE SIGNAL")
rsilen              = input(title="Length", defval=14, type=input.integer, inline="rsi", group="CHOOSE YOUR DESIRE SIGNAL")
rsi_ent_value       = input(title="Entry", defval=50, type=input.integer, minval=1, inline="rsi", group="CHOOSE YOUR DESIRE SIGNAL", tooltip="??? Condition ???\n\nBUY Rule\nMACD Crossover Signal\nRSI Greater then Entry Level (You Choose)\n\n??? Explanation ???\nWe have RSI with 2 Levels,\n1st: Entry Level\n2nd: No-Entry Level\n\nEntry level:\nfor never want to BUY trade when RSI is Below our specific Level, like you want open Trade when RSI above 50 level or 30 level etc... \n\nNo-Entry Level:\nthis is same as (Entry Level) Condition, as we know RSI-70 level use for OverBought, and its mean market will go down after RSI-OB level, and thats why we can set overbought level for NO-ENTRY when Market is on OverBought area.")
rsi_ob_value        = input(title="No-Entry", defval=70, minval=1, type=input.integer, inline="rsi", group="CHOOSE YOUR DESIRE SIGNAL")   
RSI                 = rsi(close , rsilen)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
startTime           =       input(title="Start Time                           ", type = input.time, defval = timestamp("01 Jan 2021 00:00 +0000"), inline="Backtesting Time Period")
endTime             =       input(title="End Time                          ", type = input.time, defval = timestamp("01 Jan 2022 00:00 +0000"))

inDateRange         =       true


// Stgy №1:? MACD Cross Signal CONDITION //////////////////////////////////////
// ENTRY EXIT SECTION //////////////////////////////////////////////////////////
// (( MACD + CLOSE ))                                                       ////
if macd_crsovr and MACD_crs_signal and inDateRange                   ////
    strategy.entry("BUY", strategy.long, comment="S#1")                     ////
if macd_crsndr and MACD_crs_signal and inDateRange                  ////
    strategy.close("BUY", comment="x")                                      ////
////////////////////////////////////////////////////////////////////////////////
// // Stgy №1 Ploting 
// plotshape(MACD_crs_signal ? macd_crsovr : na, title="Stgy Sign", color=color.blue, style=shape.labelup, text="MACD", textcolor=color.white, location=location.bottom)
// plotshape(MACD_crs_signal ? macd_crsndr : na, title="Stgy Sign", color=color.maroon, style=shape.labeldown, text="MACD-x", textcolor=color.white, location=location.top)
// ////////////////////////////////////////////////////////////////////////////////


// Stgy №2:? MACD + OverBought CONDITION //////////////////////////////////////
only_Trade_when     = MACD < MACD_OB_LVL and Signal < MACD_OB_LVL           ////
macd_ob_buy         = macd_crsovr and only_Trade_when                       ////
macd_ob_sell        = macd_crsndr                                           ////
////////////////////////////////////////////////////////////////////////////////
// ENTRY EXIT SECTION //////////////////////////////////////////////////////////
// (( MACD + ZONE ))                                                        ////
if macd_ob_buy and MACD_OB and inDateRange                                  ////
    strategy.entry("BUY", strategy.long, comment="S#2")                     ////
if macd_ob_sell and MACD_OB and inDateRange                                 ////
    strategy.close("BUY", comment="x")                                      ////
////////////////////////////////////////////////////////////////////////////////
// plotshape(MACD_OB ? macd_ob_buy : na, title="Stgy Sign", color=color.blue, style=shape.labelup, text="M+OB", textcolor=color.white, location=location.bottom)
// plotshape(MACD_OB ? macd_ob_sell : na, title="Stgy Sign", color=color.maroon, style=shape.labeldown, text="M+OB-x", textcolor=color.white, location=location.top)
// ////////////////////////////////////////////////////////////////////////////////



// Stgy №3:? MACD + CLOSE CONDITION ///////////////////////////////////////////
macd_close_buy       = macd_crsovr and ( ( close > MA_signal or (close[1] > MA_signal[1]) or (close[2] > MA_signal[2]) or (close[3] > MA_signal[3]) )    or    ( close > dema  or (close[1] > dema[1]) or (close[2] > dema[2]) or (close[3] > dema[3]) )    or    ( close > tema  or (close[1] > tema[1]) or (close[2] > tema[2]) or (close[3] > tema[3]) ) ) 
macd_close_sell      = macd_crsndr and ( ( close > MA_signal or (close[1] < MA_signal[1]) or (close[2] < MA_signal[2]) or (close[3] < MA_signal[3]) )    or    ( close < dema  or (close[1] < dema[1]) or (close[2] < dema[2]) or (close[3] < dema[3]) )    or    ( close < tema  or (close[1] < tema[1]) or (close[2] < tema[2]) or (close[3] < tema[3]) ) )                  ////
////////////////////////////////////////////////////////////////////////////////
// ENTRY EXIT SECTION //////////////////////////////////////////////////////////
// (( MACD + CLOSE ))                                                       ////
if macd_close_buy and MACD_close and inDateRange                            ////
    strategy.entry("BUY", strategy.long, comment="S#3")                     ////
if macd_close_sell and MACD_close and inDateRange                           ////
    strategy.close("BUY", comment="x")                                      ////
////////////////////////////////////////////////////////////////////////////////
// // Stgy №3 Ploting 
// plotshape(MACD_close ? macd_close_buy : na, title="Stgy Sign", color=color.blue, style=shape.labelup, text="MACD", textcolor=color.white, location=location.bottom)
// plotshape(MACD_close ? macd_close_sell : na, title="Stgy Sign", color=color.maroon, style=shape.labeldown, text="MACD-x", textcolor=color.white, location=location.top)
// ////////////////////////////////////////////////////////////////////////////////




// Stgy №3:? MACD + MA-ZONE MACD + ZONE CONDITION /////////////////////////////
macd_zone_buy       = macd_crsovr and ( ( close > MA_zone_srcHi or (close[1] > MA_zone_srcHi[1]) or (close[2] > MA_zone_srcHi[2]) or (close[3] > MA_zone_srcHi[3]) )    or      ( close > dema2 or (close[1] > dema2[1]) or (close[2] > dema2[2]) or (close[3] > dema2[3]) )    or      ( close > tema2 or (close[1] > tema2[1]) or (close[2] > tema2[2]) or (close[3] > tema2[3]) )   )            ////
macd_zone_sell      = macd_crsndr and ( ( close < MA_zone_srcHi or (close[1] < MA_zone_srcHi[1]) or (close[2] < MA_zone_srcHi[2]) or (close[3] < MA_zone_srcHi[3]) )    or      ( close < dema2 or (close[1] < dema2[1]) or (close[2] < dema2[2]) or (close[3] < dema2[3]) )    or      ( close < tema2 or (close[1] < tema2[1]) or (close[2] < tema2[2]) or (close[3] < tema2[3]) )   )           ////
////////////////////////////////////////////////////////////////////////////////
// ENTRY EXIT SECTION //////////////////////////////////////////////////////////
// (( MACD + ZONE ))                                                        ////
if macd_zone_buy and MACD_ZONE and inDateRange                              ////
    strategy.entry("BUY", strategy.long, comment="S#4")                     ////
if macd_zone_sell and MACD_ZONE and inDateRange                             ////
    strategy.close_all()                                      ////
////////////////////////////////////////////////////////////////////////////////



// Stgy №5:? MACD + RSI-OB CONDITION //////////////////////////////////////////
MACD_rsi_EnBuy         = RSI > rsi_ent_value and RSI < rsi_ob_value         ////
MACD_rsi_EnSell         = RSI < rsi_ent_value           ////
MACD_rsi_Ex       = crossunder(RSI , rsi_ob_value) or crossunder(RSI[1] , rsi_ob_value[1]) or crossunder(RSI[2] , rsi_ob_value[2]) or crossunder(RSI[3] , rsi_ob_value[3]) or crossunder(RSI[4] , rsi_ob_value[4]) or crossunder(RSI[5] , rsi_ob_value[5]) or crossunder(RSI[6] , rsi_ob_value[6])         ////
                                                                            ////
////////////////////////////////////////////////////////////////////////////////
// ENTRY EXIT SECTION //////////////////////////////////////////////////////////
// ((MACD + RSI-OB ))                                                       ////
if macd_crsovr and MACD_rsi_EnBuy and MACD_wid_rsiOB and inDateRange        ////
    strategy.entry("BUY", strategy.long, comment="S#5")                     ////
if macd_crsndr and MACD_wid_rsiOB and inDateRange                           ////
    strategy.close("BUY", comment="x")                                      ////
////////////////////////////////////////////////////////////////////////////////
if (not inDateRange)           ///
    strategy.close_all()       ///
//////////////////////////////////









// MACD COLORS SECTION /////////////////////////////////////////////////////////
// ( Colors of [MACD and Signal-Line] )
MACD_width          = input(title="MACD Line               ", defval=2, minval=1, type=input.integer, group="??macd Width & Colors setting??", inline="macdColor")
MACD_color_High     = input(#11ff00, title="", type=input.color, group="??macd Width & Colors setting??", inline="macdColor")
MACD_color_Low      = input(#e91e63, title="", type=input.color, group="??macd Width & Colors setting??", inline="macdColor")
signal_width        = input(title="Signal Line               ", defval=2, minval=1, type=input.integer, group="??macd Width & Colors setting??", inline="signal")
signalLine_col_hi   = input(#ffeb3b, title="", type=input.color, inline="signal", group="??macd Width & Colors setting??")
signalLine_col_lo   = input(#ffeb3b, title="", type=input.color, inline="signal", group="??macd Width & Colors setting??")


// ((Histogram Color)) /////////////////////////////////////////////////////////
macd_hist_on        = input(true, "Histogram        ", inline="hist", group="??macd Width & Colors setting??")
BuyStrongHist       = input(#26A69A, title="", type=input.color, inline="hist", group="??macd Width & Colors setting??")
BuyWeakHist         = input(#B2DFDB, title="", type=input.color, inline="hist", group="??macd Width & Colors setting??")
SellWeakHist        = input(#FFCDD2, title="✨", type=input.color, inline="hist", group="??macd Width & Colors setting??")
SellStrongHist      = input(#FF5252, title="", type=input.color, inline="hist", group="??macd Width & Colors setting??")
// ((FOR HISTOGRAM COLOR CONDITION))
hist_col            = (histogram >= 0 ? (histogram[1] < histogram ? BuyStrongHist : BuyWeakHist) : histogram[1] < histogram ? SellWeakHist : SellStrongHist)


// (( CROSSOVER DOT) ///////////////////////////////////////////////////////////
macd_crsovr_dot_on  = input(true, "Cross               ", inline="dot", group="??macd Width & Colors setting??")
macd_cross_width    = input(defval=5, title="", inline="dot", group="??macd Width & Colors setting??")
dot_crsovr_col      = input(#ffffff, title="", type=input.color, inline="dot", group="??macd Width & Colors setting??")
dot_crsndr_col      = input(color.new(#e91e63, 0), title="", type=input.color, inline="dot", group="??macd Width & Colors setting??")


// (( MACD ZONE COLOR ))
zone_on             = input(true, "Zone Color        ", inline="zone", group="??macd Width & Colors setting??")
zone_crsovr_col     = input(color.new(color.lime, 70), title="", type=input.color, inline="zone", group="??macd Width & Colors setting??")
zone_crsndr_col     = input(color.new(#e91e63, 70), title="", type=input.color, inline="zone", group="??macd Width & Colors setting??")

///////////////////////////////////////// ((FOR MACD LINE COLOR CONDITION))
MACD_line_col = if macd_grtr_signal    //
    MACD_color_High                    //
else                                   //
    if macd_less_signal                //
        MACD_color_Low                 //
///////////////////////////////////////// ((FOR SIGNAL LINE COLOR CONDITION))
signal_line_col = if macd_grtr_signal  //
    signalLine_col_hi                  //
else                                   //
    if macd_less_signal                //
        signalLine_col_lo              //
///////////////////////////////////////// ((FOR MACD CROSS DOTs COLOR CONDITION))
MACD_Dot_col = if macd_crsovr_signal   //
    dot_crsovr_col                     //
else                                   //
    if macd_crsndr_signal              //
        dot_crsndr_col                 //
/////////////////////////////////////////////////////////////////////////////////////////////////
zone_crsovr_plot = if macd_grtr_signal  and zone_on // ((For Zone Color Comdition + On/Off)) ///
    zone_crsovr_col                                 ///////////////////////////////////////////
else                                                //
    if macd_less_signal and zone_on                 //
        zone_crsndr_col                             //
//////////////////////////////////////////////////////


// MACD PLOTING //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
histplot    = plot(macd_hist_on ? histogram : na, title="Histogram", color=hist_col, style=plot.style_columns)
macdplot    = plot(MACD, title="MACD", color=MACD_line_col, linewidth=MACD_width)
signalplot  = plot(Signal, title="Signal", color=signal_line_col, linewidth=signal_width)
fill(macdplot , signalplot, color=zone_crsovr_plot)

plot(macd_crsovr_dot_on ? macd_crsovr_signal : na,  title="c-over", style=plot.style_circles, color=MACD_Dot_col, linewidth=macd_cross_width)
plot(macd_crsovr_dot_on ? macd_crsndr_signal : na,  title="c-under", style=plot.style_circles, color=MACD_Dot_col, linewidth=macd_cross_width)



```

> Detail

https://www.fmz.com/strategy/439722

> Last Modified

2024-01-23 12:08:40
