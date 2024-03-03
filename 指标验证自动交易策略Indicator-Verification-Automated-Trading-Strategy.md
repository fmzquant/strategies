
> Name

指标验证自动交易策略Indicator-Verification-Automated-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

888 BOT v4是一个联合多种指标进行趋势判断和交易信号发出的自动交易策略。它将均线、区间过滤器、ADX、抛物线SAR、带量RSI、MACD和布林带等8种指标组合使用,以发出更可靠的交易信号。

## 策略原理

### 指标概览

1. **Jurik均线(JMA)**:一种由Mark Jurik为专业人士设计的消除信号滞后的均线,其“长度”参数可以控制去噪,“相位”和“幂”参数可以平衡滞后与过冲。

2. **区间过滤器**:通过计算一段时间内的平均价格波动范围,并放大该范围,来滤除行情噪音,更好判断短期趋势。 

3. **平均方向指标(ADX)**:由Wilder创建,测量趋势的强度和方向。ADX为正斜率且超过阈值一段时间,表示价格运动强劲。

4. **抛物线止损(SAR)**:又由Wilder创建,放置点位来判断趋势,当价格接触指标时会跳到价格另一侧,形成抛物线形状。

5. **带量RSI**:在经典RSI基础上加入交易量参数,使其更准确反映市场走势。

6. **MACD**:Appel创建的快慢均线差值指标,histogram可预判均线交叉。MAC-Z将价格标准化后加入VWAP计算。

7. **交易量条件**:过滤交易量低于均量的信号,不同量级对应不同杠杆。

8. **布林带**:John Bollinger的波带指标,可作为重入机会。

### 策略逻辑

1. 根据八种指标情况,分别确定多空条件。

2. 多个指标确认后生成交易信号,进入仓位。

3. 根据仓位数量和风险参数设定止盈止损位。

4. 当价格触及止盈止损位时,平仓离场。

5. 当价格重新触及布林带时,有机会加仓改善入场价。

6. 每次平仓后重新等待指标确认,可再次进入新仓位。

### 优势分析

888 BOT v4最大的优势在于指标组合使用,不同指标可互相验证,减少假信号,这比单一指标策略更可靠。另外,允许加仓和改善入场价,可追逐更大利润。

具体来说,其优势有:

1. JMA去除滞后,区间过滤器去噪,提高信号质量。

2. ADX判断趋势强度,抛物线SAR判断方向,使入场更准确。

3. 带量RSI和MACD加入更多市场信息,多层验证信号。 

4. 交易量条件可过滤假信号,不同量级对应杠杆。

5. 停损方式可选择风险止损、ATR止损或双止损,控制下跌风险。

6. 允许通过布林带加仓改善入场价,追求更大收益。

7. 可选择是否分割止盈位,平衡盈利和盈利概率。

8. 可选择分时段和交易对进行回测,评估策略效果。

### 风险分析

尽管888 BOT v4通过指标组合和参数优化降低了风险,但交易任何策略都存在一定风险,主要包括:

1. 指标发出错误信号的概率,可适当调整参数以减少。

2. 加仓后亏损扩大的风险,可降低入场价优化幅度以防止。

3. 布林带未触发时亏损扩大,可配合趋势指标判断加仓时机。

4. 停损过于宽松被套的风险,可以适当缩小止损范围。

5. 回测时间不足,可扩大回测周期进行验证。

6. 交易量不足,调整仓位规模。

7. 特殊行情失效,需做好风险管理,詹金森。

### 优化方向

888 BOT v4还有一定优化空间:

1. 调整指标参数,寻找最佳组合。

2. 尝试其他指标替换,如KDJ、震荡指标等。

3. 优化入场价优化幅度。

4. 调整止盈止损算法。

5. 设置止盈后保本止损。

6. 优化仓位规模和杠杆大小。

7. 尝试机器学习等方法自动优化。

8. 增加离场条件,避开特定行情。

9. 尝试跨市场套利。

10. 开发图形界面,提高易用性。

综上,888 BOT v4是一个多指标策略的典型代表,通过指标组合交易可显著提高盈利概率。但任何策略都不能包打天下,需要不断测试和优化,做好风险管理,才能持续盈利。

||

## Overview

The 888 BOT v4 is an automated trading strategy that combines multiple indicators to determine trends and generate trading signals. It utilizes a mix of 8 indicators including moving averages, range filters, ADX, parabolic SAR, RSI with volume, MACD and Bollinger bands to produce more reliable trade signals.

## Strategy Logic

### Indicators Overview

1. **Jurik Moving Average (JMA)**: A moving average designed by Mark Jurik for professionals that eliminates signal lag. The "length" parameter controls noise reduction, while "phase" and "power" balance lag and overshoot.

2. **Range Filter**: Calculates average price range over a period and amplifies it to filter out noise and better determine short-term trends.

3. **Average Directional Index (ADX)**: Created by Wilder to measure trend strength and direction. Positive sloping ADX above a threshold over a period signifies strong price movement.

4. **Parabolic SAR**: Also by Wilder, places dots to determine trend direction. SAR flips to the other side of price when touched forming a parabolic shape.

5. **RSI with Volume**: Adds volume parameter to the classic RSI to make it more responsive to market moves.

6. **MACD**: Moving average convergence divergence by Appel. Histogram anticipates moving average crossovers. MAC-Z standardizes price before VWAP calculation.

7. **Volume Condition**: Filters signals with volume below average, different leverage for different levels.

8. **Bollinger Bands**: John Bollinger's bands act as re-entry opportunities.

### Strategy Logic

1. Determine long/short conditions based on indicators.

2. Generate trade signals upon confirmation from multiple indicators and enter positions.

3. Set take profit and stop loss levels based on position size and risk parameters. 

4. Close positions when take profit or stop loss is hit.

5. Opportunity to add to position at better entry when Bollinger bands are hit again.

6. Wait for indicator confirmation again after each position close for new entries.

### Advantage Analysis

The biggest advantage of 888 BOT v4 is the combined use of multiple indicators for verification which is more reliable than single indicator strategies. Allowing position addition and better entry also enables chasing larger profits. 

Specifically, the advantages include:

1. JMA eliminates lag, range filter reduces noise for higher quality signals.

2. ADX gauges trend strength while SAR determines direction for more accurate entries.

3. Volume weighted RSI and MACD incorporate more market data to multilaterally validate signals.

4. Volume condition filters fake signals and matches leverage to levels. 

5. SL options of fixed percentage, ATR or both controls downside risk.

6. Bollinger bounce allows adding to improve entry price for greater gains.

7. Optional to split TP for balance between profitability and win rate.

8. Backtestable across timeframes and symbols for strategy evaluation.

### Risk Analysis

Despite the reduced risks from indicator combos and parameter tuning, all strategies carry some risks including:

1. Probability of indicator false signals can be reduced by adjusting parameters.

2. Risk of magnified losses when adding to losing positions can be prevented by limiting optimization magnitude.

3. Risk of extended drawdown before Bollinger band hit can be assessed with trend indicators for adding timing.

4. Risk of too wide SL being run can be mitigated with appropriate sizing of SL range. 

5. Insufficient backtest duration can be addressed by expanding testing timeframe.

6. Low volume issues can be resolved by adjusting position sizing.

7. Failure in special market conditions needs risk management and preparedness.

### Optimization Directions 

Some areas 888 BOT v4 can still be improved on:

1. Adjust indicator parameters for ideal combinations.

2. Try replacing indicators with others e.g. KDJ, oscillators etc.

3. Optimize better entry optimization magnitude. 

4. Refine TP and SL algorithms. 

5. Implement break-even SL after TP.

6. Optimize position sizing and leverage.

7. Explore machine learning for automated optimization.

8. Add exit conditions to avoid certain market conditions.

9. Test cross-market arbitrage.

10. Develop graphical interface for ease of use.

In conclusion, 888 BOT v4 exemplifies a multi-indicator strategy which can significantly improve profitability through indicator combos. But no strategy is foolproof so constant testing, tuning and risk management is crucial for sustained profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_hlc3|0|  SOURCE: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_2|true|JURIK MOVING AVERAGE|
|v_input_3|30|  JMA LENGTH|
|v_input_4|40|  JMA PHASE|
|v_input_5|2.5|  JMA POWER|
|v_input_6|true|RANGE FILTER|
|v_input_7|20|  SAMPLING PERIOD|
|v_input_8|1.7|  RANGE MULTIPLIER|
|v_input_9|true|AVERAGE DIRECTIONAL INDEX|
|v_input_10|0|  ADX OPTION: CLASSIC|MASANAKAMURA|
|v_input_11|22|  ADX LENGTH|
|v_input_12|20|  ADX THRESHOLD|
|v_input_13|true|PARABOLIC SAR|
|v_input_14|0.25|  SAR STAR|
|v_input_15|0.25|  SAR INC|
|v_input_16|0.13|  SAR MAX|
|v_input_17|true|RSI VOLUME WEIGHTED|
|v_input_18|34|  RSI LENGHT|
|v_input_19|45|  RSI CENTER LINE|
|v_input_20|true|MA CONVERGENCE/DIVERGENCE|
|v_input_21|0|  MACD OPTION: MAC-Z|MACD|
|v_input_22|45|  MACD FAST MA LENGTH|
|v_input_23|47|  MACD SLOW MA LENGTH|
|v_input_24|13|  MACD SIGNAL LENGTH|
|v_input_25|9|  Z-VWAP LENGTH|
|v_input_26|14|  STDEV LENGTH|
|v_input_27|true|VOLUME CONDITION|
|v_input_28|1.4|  VOLUME FACTOR|
|v_input_29|61|  SMA VOLUME LENGTH|
|v_input_30|1.7|  TAKE PROFIT LONG %|
|v_input_31|1.8|  TAKE PROFIT SHORT %|
|v_input_32|true|ACTIVATE STOP LOSS ?|
|v_input_33|0|  STOP LOSS OPTION: NORMAL|ATR|BOTH|
|v_input_34|3.7|  STOP LOSS %|
|v_input_35|13|  ATR SL PERIOD|
|v_input_36|7|  ATR SL MULTIPLIER|
|v_input_37|3.5|  % RISK ALLOWED|
|v_input_38|false|STOP LOSS CONFIRMED|
|v_input_39|true|ACTIVATE BOLLINGER BANDS RE-ENTRY ?|
|v_input_40|20|  BB LENGTH|
|v_input_41|1.9|  BB MULTIPLIER|
|v_input_42|0.5|  % MINIMUM BETTER PRICE|
|v_input_43|false|ACTIVATE DIVIDE TP|
|v_input_44|true|BACKTEST ?|
|v_input_45|180|  BACKTEST DAYS|
|v_input_46|0|  ENTRY TYPE: % EQUITY|CASH|CONTRACTS|
|v_input_47|8|  QUANTITY (LEVERAGE 1X)|
|v_input_48|8|  MAXIMUM LEVERAGE|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-20 00:00:00
end: 2023-09-27 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Xaviz

//@version=4
strategy(title = "888 BOT #backtest", shorttitle = "888?", overlay = true, initial_capital = 10000, pyramiding = 10, currency = "USD",
   default_qty_type = strategy.percent_of_equity, default_qty_value = 0, commission_value = 0.04)

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ———————————————————— Inputs
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ————— Source input
src                 = input(hlc3,       title = "  SOURCE",                             type = input.source)

// ————— JMA inputs
Act_JMA             = input(true,       title = "JURIK MOVING AVERAGE",                 type = input.bool)
JMA_length          = input(30,         title = "  JMA LENGTH",                         type = input.integer,   minval = 0)
phase               = input(40,         title = "  JMA PHASE",                          type = input.integer,   minval = 0)
power               = input(2.5,        title = "  JMA POWER",                          type = input.float,     minval = 0,     step = 0.5)

// ————— Range Filter inputs
Act_RF              = input(true,       title = "RANGE FILTER",                         type = input.bool)
per                 = input(20,         title = "  SAMPLING PERIOD",                    type = input.integer,   minval = 1)
mult                = input(1.7,        title = "  RANGE MULTIPLIER",                   type = input.float,     minval = 0.1,   step = 0.1)

// ————— ADX inputs
Act_ADX             = input(true,       title = "AVERAGE DIRECTIONAL INDEX",            type = input.bool)
ADX_options         = input("CLASSIC",  title = "  ADX OPTION",                                                                                 options = ["CLASSIC", "MASANAKAMURA"])
ADX_len             = input(22,         title = "  ADX LENGTH",                         type = input.integer,   minval = 1)
th                  = input(20,         title = "  ADX THRESHOLD",                      type = input.float,     minval = 0,     step = 0.5)

// ————— SAR inputs
Act_SAR             = input(true,       title = "PARABOLIC SAR",                        type = input.bool)
Sst                 = input (0.25,      title = "  SAR STAR",                           type = input.float,     minval = 0.01,  step = 0.01)
Sinc                = input (0.25,      title = "  SAR INC",                            type = input.float,     minval = 0.01,  step = 0.01)
Smax                = input (0.13,      title = "  SAR MAX",                            type = input.float,     minval = 0.01,  step = 0.01)

// ————— RSI with volume inputs
Act_RSI             = input(true,       title = "RSI VOLUME WEIGHTED",                  type = input.bool)
RSI_len             = input(34,         title = "  RSI LENGHT",                         type = input.integer,   minval = 1)
RSI_obos            = input(45,         title = "  RSI CENTER LINE",                    type = input.integer,   minval = 1)

// ————— MACD / MAC-Z inputs
Act_MACD            = input(true,       title = "MA CONVERGENCE/DIVERGENCE",            type = input.bool)
MACD_options        = input("MAC-Z",    title = "  MACD OPTION",                                                                                options = ["MACD", "MAC-Z"])
fastLength          = input(45,         title = "  MACD FAST MA LENGTH",                type = input.integer,   minval = 1)
slowLength          = input(47,         title = "  MACD SLOW MA LENGTH",                type = input.integer,   minval = 1)
signalLength        = input(13,         title = "  MACD SIGNAL LENGTH",                 type = input.integer,   minval = 1)
lengthz             = input(9,          title = "  Z-VWAP LENGTH",                      type = input.integer,   minval = 1)
lengthStdev         = input(14,         title = "  STDEV LENGTH",                       type = input.integer,   minval = 1)

// ————— Volume inputs for entries condition and for calculate quantities later
Act_Vol             = input(true,       title = "VOLUME CONDITION",                     type = input.bool)
volume_f            = input(1.4,        title = "  VOLUME FACTOR",                      type = input.float,     minval = 0,     step = 0.1)
sma_length          = input(61,         title = "  SMA VOLUME LENGTH",                  type = input.integer,   minval = 1)

// ————— First take profit input
tp_long0            = input(1.7,        title = "  TAKE PROFIT LONG %",                 type = input.float,     minval = 0,     step = 0.1) 
tp_short0           = input(1.8,        title = "  TAKE PROFIT SHORT %",                type = input.float,     minval = 0,     step = 0.1) 

// ————— Stop Loss input
Act_sl              = input(true,       title = "ACTIVATE STOP LOSS ?",                type = input.bool)
SL_options          = input("NORMAL",   title = "  STOP LOSS OPTION",                                                                           options = ["NORMAL", "ATR", "BOTH"])
sl0                 = input(3.7,        title = "  STOP LOSS %",                        type = input.float,     minval = 0,     step = 0.1)

// ————— ATR Inputs
atrPeriod           = input(13,         title = "  ATR SL PERIOD",                      type = input.integer,   minval = 0)
multiplierPeriod    = input(7.0,        title = "  ATR SL MULTIPLIER",                  type = input.float,     minval = 0,     step = 0.1)

// ————— Risk input
Risk                = input(3.5,        title = "  % RISK ALLOWED",                     type = input.float,     minval = 0,     step = 0.5)

// ————— Confirmed Stop loss
Act_Conf_SL         = input(false,      title = "STOP LOSS CONFIRMED",                  type = input.bool)

// ————— Bollinger Bands inputs
Act_BB              = input(true,       title = "ACTIVATE BOLLINGER BANDS RE-ENTRY ?", type = input.bool)
BB_length           = input(20,         title = "  BB LENGTH",                          type = input.integer,   minval = 1)
BB_mult             = input(1.9,        title = "  BB MULTIPLIER",                      type = input.float,     minval = 0.001, step = 0.1)
bbBetterPrice       = input(0.5,        title = "  % MINIMUM BETTER PRICE",             type = input.float,     minval = 0.1,   step = 0.1)
Act_divide          = input(false,      title = "ACTIVATE DIVIDE TP",                   type = input.bool)

// ————— Backtest input
Act_BT              = input(true,       title = "BACKTEST ?",                          type = input.bool)
backtest_time       = input(180,        title = "  BACKTEST DAYS",                      type = input.integer,   minval = 1)*24*60*60*1000
entry_Type          = input("% EQUITY", title = "  ENTRY TYPE",                                                                                 options = ["CONTRACTS","CASH","% EQUITY"])
et_Factor           = (entry_Type == "CONTRACTS") ? 1 : (entry_Type == "% EQUITY") ? (100/(strategy.equity/close)) : close
quanTity            = input(8.0,        title = "  QUANTITY (LEVERAGE 1X)",             type = input.float,     minval = 0,     step = 0.5) / et_Factor
Max_Lev             = input(8,          title = "  MAXIMUM LEVERAGE",                   type = input.integer,   minval = 1,     maxval = 8)   

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ———————————————————— Variables
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ————— Long/Short
var bool    longCond                    = na,   var bool    shortCond                   = na
var int     CondIni_long                = 0,    var int     CondIni_short               = 0
var bool    _Final_longCondition        = na,   var bool    _Final_shortCondition       = na
var float   last_open_longCondition     = na,   var float   last_open_shortCondition    = na
var float   last_dynamic_Leverage_long  = na,   var float   last_dynamic_Leverage_short = na
var int     last_longCondition          = na,   var int     last_shortCondition         = na
var int     last_Final_longCondition    = na,   var int     last_Final_shortCondition   = na
var int     nLongs                      = na,   var int     nShorts                     = na

// ————— Take profit
var bool    long_tp                     = na,   var bool    short_tp                    = na
var int     last_long_tp                = na,   var int     last_short_tp               = na
var bool    Final_Long_tp               = na,   var bool    Final_Short_tp              = na

// ————— Stop Loss
var int     CondIni_long_sl             = 0,    var int     CondIni_short_sl            = 0
var bool    Final_Long_sl0              = na,   var bool    Final_Short_sl0             = na
var bool    Final_Long_sl               = na,   var bool    Final_Short_sl              = na
var int     last_long_sl                = na,   var int     last_short_sl               = na

// ————— Indicators
var bool    JMA_longCond                = na,   var bool    JMA_shortCond               = na
var bool    RF_longCond                 = na,   var bool    RF_shortCond                = na
var bool    ADX_longCond                = na,   var bool    ADX_shortCond               = na
var bool    SAR_longCond                = na,   var bool    SAR_shortCond               = na
var bool    RSI_longCond                = na,   var bool    RSI_shortCond               = na
var bool    MACD_longCond               = na,   var bool    MACD_shortCond              = na
var bool    VOL_longCond                = na,   var bool    VOL_shortCond               = na
var bool    JMA_XlongCond               = na,   var bool    JMA_XshortCond              = na
var bool    RF_XlongCond                = na,   var bool    RF_XshortCond               = na
var bool    ADX_XlongCond               = na,   var bool    ADX_XshortCond              = na
var bool    SAR_XlongCond               = na,   var bool    SAR_XshortCond              = na
var int     CondIni_long_BB             = 0,    var int     CondIni_short_BB            = 0
var bool    Final_long_BB               = na,   var bool    Final_short_BB              = na
var int     last_long_BB                = na,   var int     last_short_BB               = na

// ————— Average Price
var float   sum_long                    = 0.0,  var float   sum_short                   = 0.0
var float   Position_Price              = 0.0

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ———————————————————— Jurik Moving Average
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ————— JMA calculation
JMA(_JMA_length, _phase, _power, _src) =>
    phaseRatio      = _phase < -100 ? 0.5 : _phase > 100 ? 2.5 : _phase / 100 + 1.5
    beta            = 0.45 * (_JMA_length - 1) / (0.45 * (_JMA_length - 1) + 2)
    alpha           = pow(beta, _power)
    jma             = 0.0
    e0              = 0.0
    e0              := (1 - alpha) * _src + alpha * nz(e0[1])
    e1              = 0.0
    e1              := (_src - e0) * (1 - beta) + beta * nz(e1[1])
    e2              = 0.0
    e2              := (e0 + phaseRatio * e1 - nz(jma[1])) * pow(1 - alpha, 2) + pow(alpha, 2) * nz(e2[1])
    jma             := e2 + nz(jma[1])
    
// ————— Defining JMA trend
JMA_Rising          = JMA(JMA_length, phase, power, src) > JMA(JMA_length, phase, power, src)[1]
JMA_Falling         = JMA(JMA_length, phase, power, src) < JMA(JMA_length, phase, power, src)[1]

// ————— JMA Plotting
JMA_color           = JMA_Rising ? color.lime : JMA_Falling ? #e91e63 : color.orange
plot(Act_JMA ? JMA(JMA_length, phase, power, src) : na, color=JMA_color, linewidth = 2, title= "JMA")

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ———————————————————— Range Filter
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ————— Range Filter calculation
Range_filter(_src, _per, _mult) =>
    float _upward   = 0.0
    float _downward = 0.0
    wper            = (_per*2) - 1
    avrng           = ema(abs(_src - _src[1]), _per)
    _smoothrng      = ema(avrng, wper) * _mult
    _filt           = _src
    _filt           := _src  > nz(_filt[1]) ? ((_src-_smoothrng) < nz(_filt[1]) ? nz(_filt[1]) : (_src-_smoothrng)) : ((_src+_smoothrng) > nz(_filt[1]) ? nz(_filt[1]) : (_src+_smoothrng))
    _upward         := _filt > _filt[1]     ? nz(_upward[1])   + 1 : _filt < _filt[1] ? 0 : nz(_upward[1])
    _downward       := _filt < _filt[1]     ? nz(_downward[1]) + 1 : _filt > _filt[1] ? 0 : nz(_downward[1])
    [_smoothrng,_filt,_upward,_downward]
    
// ————— Defining variables for include in future conditions
[smoothrng, filt, upward, downward] = Range_filter(src, per, mult)

// ————— Defining high and low bands
hband               = filt + smoothrng
lband               = filt - smoothrng

// ————— Range Filter Plotting
filtcolor           = upward > 0 ? color.lime : downward > 0 ? color.red : color.orange
filtplot            = plot(Act_RF ? filt  : na, color = filtcolor,  linewidth = 1,                  title = "RF")
hbandplot           = plot(Act_RF ? hband : na, color = filtcolor,                  transp = 50,    title = "RF High Target")
lbandplot           = plot(Act_RF ? lband : na, color = filtcolor,                  transp = 50,    title = "RF Low Target")
fill(hbandplot, lbandplot,                      color = filtcolor,                                  title = "RF Target Range")

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ———————————————————— ADX
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ————— Classic ADX calculating
calcADX(_len) =>
    up              = change(high)
	down            = -change(low)
	plusDM          = na(up)   ? na : (up > down and up > 0   ? up   : 0)
    minusDM         = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange       = rma(tr, _len)
	_plus           = fixnan(100 * rma(plusDM, _len)  / truerange)
	_minus          = fixnan(100 * rma(minusDM, _len) / truerange)
	sum             = _plus + _minus
	_adx            = 100 * rma(abs(_plus - _minus) / (sum == 0 ? 1 : sum), _len)
    [_plus,_minus,_adx]

// ————— Masanakamura ADX calculating
calcADX_Masanakamura(_len) =>
    SmoothedTrueRange                   = 0.0
    SmoothedDirectionalMovementPlus     = 0.0
    SmoothedDirectionalMovementMinus    = 0.0
    TrueRange                           = max(max(high - low, abs(high - nz(close[1]))), abs(low - nz(close[1])))
    DirectionalMovementPlus             = high - nz(high[1]) > nz(low[1]) - low ? max(high - nz(high[1]), 0) : 0
    DirectionalMovementMinus            = nz(low[1]) - low > high - nz(high[1]) ? max(nz(low[1]) - low, 0)   : 0
    SmoothedTrueRange                   := nz(SmoothedTrueRange[1]) - (nz(SmoothedTrueRange[1]) /_len) + TrueRange
    SmoothedDirectionalMovementPlus     := nz(SmoothedDirectionalMovementPlus[1])  - (nz(SmoothedDirectionalMovementPlus[1])  / _len) + DirectionalMovementPlus
    SmoothedDirectionalMovementMinus    := nz(SmoothedDirectionalMovementMinus[1]) - (nz(SmoothedDirectionalMovementMinus[1]) / _len) + DirectionalMovementMinus
    DIP                                 = SmoothedDirectionalMovementPlus  / SmoothedTrueRange * 100
    DIM                                 = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
    DX                                  = abs(DIP-DIM) / (DIP+DIM)*100
    adx                                 = sma(DX, _len)
    [DIP,DIM,adx]

 // ————— Defining variables for include in future conditions   
[DIPlusC,DIMinusC,ADXC] = calcADX(ADX_len) 
[DIPlusM,DIMinusM,ADXM] = calcADX_Masanakamura(ADX_len)
DIPlus                  = ADX_options == "CLASSIC" ? DIPlusC    : DIPlusM
DIMinus                 = ADX_options == "CLASSIC" ? DIMinusC   : DIMinusM
ADX                     = ADX_options == "CLASSIC" ? ADXC       : ADXM

// ————— Plotting ADX bar colors
ADX_color = DIPlus > DIMinus and ADX > th ? color.green : DIPlus < DIMinus and ADX > th ? color.red : color.orange
barcolor(color = Act_ADX ? ADX_color : na, title = "ADX")

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ———————————————————— SAR
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ————— SAR calculation from TV
SAR = sar(Sst, Sinc, Smax)

// ————— SAR Plotting
plot(Act_SAR ? SAR : na, color = ADX_color, style = plot.style_circles, title = "SAR") 

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ———————————————————— RSI with Volume
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ————— RSI with volume calculation
WiMA(_src, W_length) => 
    var float MA_s  = 0.0
    MA_s            :=(_src + nz(MA_s[1] * (W_length-1)))/W_length
    MA_s
RSI_Volume(fv, _length) =>	
	up              = iff(fv > fv[1], abs(fv - fv[1]) * volume, 0)
	dn              = iff(fv < fv[1], abs(fv - fv[1]) * volume, 0)
	upt             = WiMA(up,_length)
	dnt             = WiMA(dn,_length)
	100 * (upt / (upt + dnt))

// ————— Defining variable for include in conditions
RSI_V               = RSI_Volume(src, RSI_len)

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ———————————————————— MACD
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ————— MAC-Z calculation
calc_zvwap(pds) =>
	mean            = sum(volume * close, pds) / sum(volume, pds)
	vwapsd          = sqrt(sma(pow(close - mean, 2), pds))
	(close - mean ) / vwapsd

zscore              = calc_zvwap(lengthz)
fastMA              = sma(src, fastLength)
slowMA              = sma(src, slowLength)
macd                = fastMA - slowMA
macz                = zscore + macd / stdev(src, lengthStdev)
signal              = sma(macz, signalLength)
histmacz            = macz - signal

// ————— MACD calculation
[_,_,histmacd]      = macd(src,  fastLength, slowLength, signalLength)

hist                = MACD_options == "MACD" ? histmacd : histmacz

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ———————————————————— Strategy
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ————— All indicators with long conditions and enable/disable option
JMA_longCond        := (Act_JMA     ? (JMA_Rising)                                  : VOL_longCond) 
RF_longCond         := (Act_RF      ? (high > hband and upward > 0)                 : JMA_longCond)
ADX_longCond        := (Act_ADX     ? (DIPlus > DIMinus and ADX > th)               : RF_longCond)
SAR_longCond        := (Act_SAR     ? (SAR < close)                                 : ADX_longCond)
RSI_longCond        := (Act_RSI     ? (RSI_V > RSI_obos)                            : SAR_longCond)
MACD_longCond       := (Act_MACD    ? (hist > 0)                                    : RSI_longCond)
VOL_longCond        := (Act_Vol     ? (volume > sma(volume,sma_length) * volume_f)  : MACD_longCond)

// ————— All indicators with short conditions and enable/disable option
JMA_shortCond       := (Act_JMA     ? (JMA_Falling)                                 : VOL_shortCond) 
RF_shortCond        := (Act_RF      ? (low < lband and downward > 0)                : JMA_shortCond)
ADX_shortCond       := (Act_ADX     ? (DIPlus < DIMinus and ADX > th)               : RF_shortCond)
SAR_shortCond       := (Act_SAR     ? (SAR > close)                                 : ADX_shortCond)
RSI_shortCond       := (Act_RSI     ? (RSI_V < RSI_obos)                            : SAR_shortCond)
MACD_shortCond      := (Act_MACD    ? (hist < 0)                                    : RSI_shortCond)
VOL_shortCond       := (Act_Vol     ? (volume > sma(volume,sma_length) * volume_f)  : MACD_shortCond)

// ————— Defining long/short condition from indicators + volume
longCond            := JMA_longCond  and RF_longCond  and ADX_longCond  and SAR_longCond  and RSI_longCond  and MACD_longCond  and VOL_longCond
shortCond           := JMA_shortCond and RF_shortCond and ADX_shortCond and SAR_shortCond and RSI_shortCond and MACD_shortCond and VOL_shortCond

// ————— Avoiding confirmed long/short simultaneity
CondIni_long        := longCond[1] ? 1 : shortCond[1] ? -1 : nz(CondIni_long[1])
CondIni_short       := longCond[1] ? 1 : shortCond[1] ? -1 : nz(CondIni_short[1])

// ————— Confirmed long/short conditions
longCondition       = (longCond[1]  and nz(CondIni_long[1])  == -1)
shortCondition      = (shortCond[1] and nz(CondIni_short[1]) == 1)

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ———————————————————— Position Price
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ————— Last opened long/short price on unconfirmed/confirmed conditions
last_open_longCondition     := longCondition  or Final_long_BB[1]  ? close[1] : nz(last_open_longCondition[1])
last_open_shortCondition    := shortCondition or Final_short_BB[1] ? close[1] : nz(last_open_shortCondition[1])

// ————— Check if your last position was a confirmed long or a short
last_longCondition          := longCondition  or Final_long_BB[1]  ? time : nz(last_longCondition[1])
last_shortCondition         := shortCondition or Final_short_BB[1] ? time : nz(last_shortCondition[1])
in_longCondition            = last_longCondition  > last_shortCondition
in_shortCondition           = last_shortCondition > last_longCondition

// ————— Check if your last position was a confirmed final long or short without BB
last_Final_longCondition    := longCondition  ? time : nz(last_Final_longCondition[1])
last_Final_shortCondition   := shortCondition ? time : nz(last_Final_shortCondition[1])

// ————— Counting long & short iterations
nLongs                      := nz(nLongs[1])
nShorts                     := nz(nShorts[1])

// ————— Longs Counter
if longCondition or Final_long_BB
    nLongs                  := nLongs + 1
    nShorts                 := 0
    sum_long                := nz(last_open_longCondition) + nz(sum_long[1])
    sum_short               := 0.0
    
// ————— Shorts Counter
if shortCondition or Final_short_BB
    nLongs                  := 0
    nShorts                 := nShorts + 1
    sum_short               := nz(last_open_shortCondition) + nz(sum_short[1])
    sum_long                := 0.0

// ————— Calculating and Plotting the price average
Position_Price              := nz(Position_Price[1])
Position_Price              := longCondition or Final_long_BB ? sum_long/nLongs : shortCondition or Final_short_BB ? sum_short/nShorts : na
plot((nLongs > 1) or (nShorts > 1) ? Position_Price : na, title = "Average Price", color = in_longCondition ? color.aqua : color.orange, linewidth = 2, style = plot.style_cross)
    
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ———————————————————— Take Profit
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ————— Take Profit divided by n entries
tp_long             = (Act_divide and (nLongs  > 1) ? tp_long0  / nLongs  : tp_long0)  / 100
tp_short            = (Act_divide and (nShorts > 1) ? tp_short0 / nShorts : tp_short0) / 100

// ————— First TP Conditions
long_tp             := high > (fixnan(Position_Price) * (1 + tp_long))  and in_longCondition
short_tp            := low  < (fixnan(Position_Price) * (1 - tp_short)) and in_shortCondition

// ————— Get the time of the last tp close
last_long_tp        := long_tp  ? time : nz(last_long_tp[1])
last_short_tp       := short_tp ? time : nz(last_short_tp[1])

// ————— Final Take profit condition (never after the stop loss)
Final_Long_tp       := (long_tp  and last_longCondition  > nz(last_long_tp[1])  and last_longCondition  > nz(last_long_sl[1]))
Final_Short_tp      := (short_tp and last_shortCondition > nz(last_short_tp[1]) and last_shortCondition > nz(last_short_sl[1]))

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ———————————————————— Stop Loss
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ————— Stop Loss ATR calculation
ATR_SL_Long         = low  - atr(atrPeriod) * multiplierPeriod
ATR_SL_Short        = high + atr(atrPeriod) * multiplierPeriod
longStopPrev        = nz(ATR_SL_Long[1], ATR_SL_Long)
shortStopPrev       = nz(ATR_SL_Short[1], ATR_SL_Short)
ATR_SL_Long         := close[1] > longStopPrev  ? max(ATR_SL_Long, longStopPrev)   : ATR_SL_Long
ATR_SL_Short        := close[1] < shortStopPrev ? min(ATR_SL_Short, shortStopPrev) : ATR_SL_Short

// ————— Calculating Sl according Risk and Initial Capital
sl = in_longCondition ?      
     min(sl0, (((Risk / (100 / (strategy.equity / close)))*100) / (quanTity * max(1, last_dynamic_Leverage_long)  * max(1, nLongs)))) : 
     min(sl0, (((Risk / (100 / (strategy.equity / close)))*100) / (quanTity * max(1, last_dynamic_Leverage_short) * max(1, nShorts))))
      
// ————— Stop Loss long conditions
Normal_long_sl      = Act_Conf_SL ?  ((SL_options == "NORMAL") ? ((Act_sl and in_longCondition  and close <= ((1 - (sl / 100)) * (fixnan(Position_Price))))) : na) :
                                     ((SL_options == "NORMAL") ? ((Act_sl and in_longCondition  and low   <= ((1 - (sl / 100)) * (fixnan(Position_Price))))) : na)
ATR_long_sl         = Act_Conf_SL ?  ((SL_options == "ATR") ?    ((Act_sl and in_longCondition  and close <= (ATR_SL_Long))) : na) :
                                     ((SL_options == "ATR") ?    ((Act_sl and in_longCondition  and low   <= (ATR_SL_Long))) : na)
Both_long_sl        = Act_Conf_SL ?  ((SL_options == "BOTH") ?   ((Act_sl and in_longCondition  and close <= ((1 - (sl / 100)) * (fixnan(Position_Price)))) or 
                                                                 ((Act_sl and in_longCondition  and close <= (ATR_SL_Long)))) : na) :
                                     ((SL_options == "BOTH") ?   ((Act_sl and in_longCondition  and low   <= ((1 - (sl / 100)) * (fixnan(Position_Price)))) or 
                                                                 ((Act_sl and in_longCondition  and low   <= (ATR_SL_Long)))) : na)

// ————— Stop Loss short conditions
Normal_short_sl     = Act_Conf_SL ?  ((SL_options == "NORMAL") ? ((Act_sl and in_shortCondition and close >= ((1 + (sl / 100)) * (fixnan(Position_Price))))) : na) :
                                     ((SL_options == "NORMAL") ? ((Act_sl and in_shortCondition and high  >= ((1 + (sl / 100)) * (fixnan(Position_Price))))) : na)
ATR_short_sl        = Act_Conf_SL ?  ((SL_options == "ATR") ?    ((Act_sl and in_shortCondition and close >= (ATR_SL_Short))) : na) :
                                     ((SL_options == "ATR") ?    ((Act_sl and in_shortCondition and high  >= (ATR_SL_Short))) : na)
Both_short_sl       = Act_Conf_SL ?  ((SL_options == "BOTH") ?   ((Act_sl and in_shortCondition and close >= ((1 + (sl/100)) * (fixnan(Position_Price)))) or 
                                                                 ((Act_sl and in_shortCondition and close >= (ATR_SL_Short)))) : na) :
                                     ((SL_options == "BOTH") ?   ((Act_sl and in_shortCondition and high  >= ((1 + (sl/100)) * (fixnan(Position_Price)))) or 
                                                                 ((Act_sl and in_shortCondition and high  >= (ATR_SL_Short)))) : na)

// ————— Get the time of the last sl close
last_long_sl        := Normal_long_sl  or ATR_long_sl  or Both_long_sl  ? time : nz(last_long_sl[1])
last_short_sl       := Normal_short_sl or ATR_short_sl or Both_short_sl ? time : nz(last_short_sl[1])

// ————— Final Stop Loss condition
Final_Long_sl       := (Normal_long_sl  or ATR_long_sl  or Both_long_sl)  and last_longCondition  > nz(last_long_sl[1])  and last_longCondition  > nz(last_long_tp[1])  and not Final_Long_tp
Final_Short_sl      := (Normal_short_sl or ATR_short_sl or Both_short_sl) and last_shortCondition > nz(last_short_sl[1]) and last_shortCondition > nz(last_short_tp[1]) and not Final_Short_tp

//Plottin ATR SL
plot(Act_sl and (SL_options != "NORMAL") ? in_longCondition ? ATR_SL_Long[1] : ATR_SL_Short[1] : na, title = "ATR SL", color = color.purple)

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ————————————————————  Bollinger Bands Re-entry
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

BB_basis            = sma(src, BB_length)
BB_dev              = BB_mult  * stdev(src, BB_length)
BB_upper            = BB_basis + BB_dev
BB_lower            = BB_basis - BB_dev
u_BB                = plot(Act_BB ? BB_upper : na,  title = "Upper Bollinger Band",      color = #009688, linewidth = 2)
l_BB                = plot(Act_BB ? BB_lower : na,  title = "Lower Bollinger Band",      color = #f06292, linewidth = 2)
fill(u_BB, l_BB,                                    title = "Bollinger Band Background", color = in_longCondition ? #009688 : #f06292, transp = 95)

// ————— Initial Bollinger Bands conditions
BB_long             = Act_BB and in_longCondition  and not (DIPlus < DIMinus and ADX > th) and (close <= BB_lower) and (close < last_open_longCondition  * (1 - (bbBetterPrice / 100)))
BB_short            = Act_BB and in_shortCondition and not (DIPlus > DIMinus and ADX > th) and (close >= BB_upper) and (close > last_open_shortCondition * (1 + (bbBetterPrice / 100)))

// ————— Get the time of the last BB close
last_long_BB        := BB_long  ? time : nz(last_long_BB[1])
last_short_BB       := BB_short ? time : nz(last_short_BB[1])

// ————— Final Bollinger Bands condition for long
Final_long_BB       := BB_long and last_Final_longCondition > nz(last_long_BB[1]) and 
                       last_longCondition > nz(last_long_tp[1]) and 
                       last_longCondition > nz(last_long_sl[1]) and not Final_Long_sl

// ————— Final Bollinger Bands condition for short                 
Final_short_BB      := BB_short and last_Final_shortCondition > nz(last_short_BB[1]) and 
                       last_shortCondition > nz(last_short_tp[1]) and 
                       last_shortCondition > nz(last_short_sl[1]) and not Final_Short_sl

// ————— Final confirmed Re-entries on long & short conditions
Final_Long_BB = Final_long_BB[1]
Final_Short_BB = Final_short_BB[1]

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ————————————————————  Signal Plotting
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ————— TP Long Levels
tplLevel            = (in_longCondition and 
                      (last_longCondition > nz(last_long_tp[1])) and 
                      (last_longCondition > nz(last_long_sl[1])) and not Final_Long_sl[1]) ? 
                      (nLongs > 1) ? 
                      (fixnan(Position_Price) * (1 + tp_long)) : (last_open_longCondition * (1 + tp_long)) : na

plot(tplLevel,            title = "Long TP Level",       style = plot.style_circles,                                   color = color.lime,  linewidth = 2)

tpsLevel            = (in_shortCondition and 
                      (last_shortCondition > nz(last_short_tp[1])) and 
                      (last_shortCondition > nz(last_short_sl[1])) and not Final_Short_sl[1]) ? 
                      (nShorts > 1) ? 
                      (fixnan(Position_Price) * (1 - tp_short)) : (last_open_shortCondition * (1 - tp_short)) : na

plot(tpsLevel,            title = "Short TP Level",      style = plot.style_circles,                                   color = color.red,   linewidth = 2)

// ————— Weekend
W_color             = (dayofweek == dayofweek.sunday or dayofweek == dayofweek.saturday) ? color.white : na
bgcolor(W_color,          title = "Weekend",    transp = 95)

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ————————————————————  Re-entry Conditions
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ————— Re-entry on long after tp, sl or Xlong
if Final_Long_tp or Final_Long_sl
    CondIni_long    := -1
    sum_long        := 0.0
    nLongs          := na
    
// ————— Re-entry on short after tp, sl or Xshort
if Final_Short_tp or Final_Short_sl
    CondIni_short   := 1
    sum_short       := 0.0
    nShorts         := na
    
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ————————————————————  Backtest
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ————— Defining new final unconfirmed long conditions
_longCondition      = (longCond and not in_longCondition) or 
                      (longCond and Final_Long_tp) or 
                      (longCond and Final_Long_sl) or
                      (longCond and not longCondition and (last_long_tp >= nz(last_longCondition))) or 
                      (longCond and not longCondition and (last_long_sl >= nz(last_longCondition)))
   
// ————— Defining new final unconfirmed short conditions
_shortCondition     = (shortCond and not in_shortCondition) or 
                      (shortCond and Final_Short_tp) or 
                      (shortCond and Final_Short_sl) or 
                      (shortCond and not shortCondition and (last_short_tp >= nz(last_shortCondition))) or 
                      (shortCond and not shortCondition and (last_short_sl >= nz(last_shortCondition)))

// ————— Test period declaration
testPeriod = time >= timenow - backtest_time

// ————— Volume Factor for determine quantities
Volume_Factor_Leverage      = min(Max_Lev, max(1, round(volume / sma(volume, sma_length))))
last_dynamic_Leverage_long  := _longCondition ? Volume_Factor_Leverage  : nz(last_dynamic_Leverage_long[1])
last_dynamic_Leverage_short := _shortCondition ? Volume_Factor_Leverage : nz(last_dynamic_Leverage_short[1])

// ————— Entering long positions
if (_longCondition)
    strategy.entry("long", strategy.long, qty = Volume_Factor_Leverage * quanTity, when = Act_BT and testPeriod)
if (Final_long_BB)
    strategy.entry("long", strategy.long, qty = last_dynamic_Leverage_long * quanTity, when = Act_BT and testPeriod)
   
// ————— Entering short positions
if (_shortCondition) 
    strategy.entry("short", strategy.short, qty = Volume_Factor_Leverage * quanTity, when = Act_BT and testPeriod)
if (Final_short_BB) 
    strategy.entry("short", strategy.short, qty = last_dynamic_Leverage_short * quanTity, when = Act_BT and testPeriod)

// ————— Closing positions with first long TP
strategy.exit("Tpl", "long", 

   profit   = (abs((last_open_longCondition  * (1 + tp_long)) - last_open_longCondition) / syminfo.mintick), 

   limit    = nLongs >= 1 ? strategy.position_avg_price * (1 + tp_long) : na,

   loss     = Act_Conf_SL == false ? 
             (iff(Act_sl and (SL_options == "NORMAL"), (abs((last_open_longCondition*(1-(sl/100)))-last_open_longCondition)/syminfo.mintick), 
             iff(Act_sl  and (SL_options == "ATR"), (abs(ATR_SL_Long-last_open_longCondition)/syminfo.mintick), 
             iff(Act_sl  and (SL_options == "BOTH") and ((abs((last_open_longCondition*(1-(sl/100)))-last_open_longCondition)/syminfo.mintick) < 
             (abs(ATR_SL_Long-last_open_longCondition)/syminfo.mintick)), (abs((last_open_longCondition*(1-(sl/100)))-last_open_longCondition)/syminfo.mintick),
             iff(Act_sl  and (SL_options == "BOTH") and ((abs((last_open_longCondition*(1-(sl/100)))-last_open_longCondition)/syminfo.mintick) > 
             (abs(ATR_SL_Long-last_open_longCondition)/syminfo.mintick)), (abs(ATR_SL_Long-last_open_longCondition)/syminfo.mintick), na))))) : na,

   stop     = Act_Conf_SL == false and nLongs >= 1 ? 
             (iff(Act_sl and (SL_options == "NORMAL"), ((1-(sl/100))*strategy.position_avg_price),
             iff(Act_sl  and (SL_options == "ATR"), ATR_SL_Long, 
             iff(Act_sl  and (SL_options == "BOTH") and (((1-(sl/100))*strategy.position_avg_price) > ATR_SL_Long), ((1-(sl/100))*strategy.position_avg_price), 
             iff(Act_sl  and (SL_options == "BOTH") and (((1-(sl/100))*strategy.position_avg_price) < ATR_SL_Long), ATR_SL_Long, na))))) : na)

// Canceling long exit orders to avoid simultaneity with re-entry
strategy.cancel("Tpl", when = Final_long_BB)

// ————— Closing positions with first short TP
strategy.exit("Tps", "short",

   profit   = (abs((last_open_shortCondition * (1 - tp_short)) - last_open_shortCondition) / syminfo.mintick), 

   limit    = nShorts >= 1 ? strategy.position_avg_price*(1-(tp_short)) : na,

   loss     = Act_Conf_SL == false ? 
             (iff(Act_sl and (SL_options == "NORMAL"), (abs((last_open_shortCondition*(1+(sl/100)))-last_open_shortCondition)/syminfo.mintick), 
             iff(Act_sl  and (SL_options == "ATR"), (abs(ATR_SL_Short-last_open_shortCondition)/syminfo.mintick), 
             iff(Act_sl  and (SL_options == "BOTH") and ((abs((last_open_shortCondition*(1+(sl/100)))-last_open_shortCondition)/syminfo.mintick) < 
             (abs(ATR_SL_Short-last_open_shortCondition)/syminfo.mintick)), (abs((last_open_shortCondition*(1+(sl/100)))-last_open_shortCondition)/syminfo.mintick),
             iff(Act_sl  and (SL_options == "BOTH") and ((abs((last_open_shortCondition*(1+(sl/100)))-last_open_shortCondition)/syminfo.mintick) > 
             (abs(ATR_SL_Short-last_open_shortCondition)/syminfo.mintick)), (abs(ATR_SL_Short-last_open_shortCondition)/syminfo.mintick), na))))) : na,

   stop     = Act_Conf_SL == false and nShorts >= 1 ? 
             (iff(Act_sl and (SL_options == "NORMAL"), ((1+(sl/100))*strategy.position_avg_price),
             iff(Act_sl  and (SL_options == "ATR"), ATR_SL_Short, 
             iff(Act_sl  and (SL_options == "BOTH") and (((1+(sl/100))*strategy.position_avg_price) < ATR_SL_Short), ((1+(sl/100))*strategy.position_avg_price),
             iff(Act_sl  and (SL_options == "BOTH") and (((1+(sl/100))*strategy.position_avg_price) > ATR_SL_Short), ATR_SL_Short, na))))) : na)

// Canceling short exit orders to avoid simultaneity with re-entry
strategy.cancel("Tps", when = Final_short_BB)

// ————— Closing all positions with Xlong/Xshort
strategy.close_all(when = (Final_Long_sl and Act_Conf_SL) or (Final_Short_sl and Act_Conf_SL))

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ————————————————————  by Xaviz
```

> Detail

https://www.fmz.com/strategy/428070

> Last Modified

2023-09-28 11:57:23
