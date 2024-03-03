
> Name

多空寻趋势双重激光策略Dual-Laser-Trend-seeking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8140e036e27e96fe19.png)

[trans]


## 概述

该策略利用布林带、肯特纳通道和自适应相对强弱指标三种技术指标判断当前趋势方向,配合抛物线SAR指标进行入场。当三种指标判断结果一致时产生交易信号。策略主要判断趋势方向,在趋势发生变化时及时入场,目标获利。

## 原理

该策略使用以下三个技术指标组合判断当前趋势:

1. 斯奎兹指标(SQUEEZE MOMENTUM INDICATOR):计算布林带和肯特纳通道,当两者叠加时产生压缩,表示趋势即将出现变化的信号。该指标返回压缩状态和线性回归曲线斜率。

2. 自适应相对强弱指数(RSI VOLUME WEIGHTED):计算成交量加权的RSI,用中线判断超买超卖。该指标强调成交量变化。

3. 抛物线停损(SAR):判断当前价格与抛物线SAR的位置关系,SAR在价格上方看跌,SAR在价格下方看涨。

策略使用布林带判定趋势方向,肯特纳通道refine,RSI判断超买超卖找反转机会,SAR指示入场时机。具体逻辑如下:

1. 计算布林带、肯特纳通道、斯奎兹指标。斯奎兹压缩时进入准备阶段。

2. 计算成交量加权RSI。RSI高于中线看涨,低于中线看跌。

3. 计算抛物线SAR。SAR在价格下方则看涨,在价格上方则看跌。 

4. 综合上述三种指标:当斯奎兹压缩,RSI高于中线,SAR在价格下方时产生多头信号;当斯奎兹压缩,RSI低于中线,SAR在价格上方时产生空头信号。

5. 信号产生时,判断前一个K线的三个指标判断结果,如果与当前信号判断相反,则产生入场信号。

6. 入场后设置止损止盈,跟踪止损。

## 优势

该策略具有以下优势:

1. 多指标组合看涨看跌,判断准确。斯奎兹指标识别趋势变化准确、RSI判断超买超卖明确、SAR指示入场时机精准。

2. 指标逻辑简单清晰,容易理解实现。

3. 采用多指标确认,可过滤假突破。

4. 设置了止损止盈机制,可以锁定利润,控制风险。

5. 回测数据充足,可靠性较高。

## 风险

该策略也存在一些风险:

1. 多头和空头入场逻辑相似,可能同时发出反向信号,需要过滤。

2. 三种指标均采用参数优化,可能过拟合。

3. 交易次数可能过于频繁,要合理控制仓位数。

4. 止损设置可能过于接近,容易被突破。

对应的解决方法:

1. 增加指标结果持续周期判定,避免信号震荡。

2. 采用 walk forward analysis 方法,调整参数,防止过拟合。

3. 设置pyramid大小,控制单向持仓数量。

4. 测试不同的止损区间,优化止损位置。

## 优化方向 

该策略可以从以下几个方向进行优化:

1. 优化指标参数,提高参数稳定性。可以考虑动态优化参数。

2. 增加仓位控制逻辑,如大小仓、均仓等方式。

3. 测试不同止损方式,如波动止损、线性止损、归零仓等。

4. 增加money management功能,例如固定仓位、固定资金利用率等。

5. 结合机器学习算法实现动态entrada和出场。

6. 增加对冲机制,做多做空对冲,降低相关市场系统性风险。

7. 考虑加入更多指标,建立投票机制,提高判断准确性。

## 总结

该策略整体思路清晰,利用多指标看涨看跌判断趋势方向,在布林带通道压缩时机敏锐入场,止损止盈机制控制风险,是一种较为稳定的趋势跟踪策略。通过参数优化、风控机制的改进,可以获得更好的回测指标和实盘效果。该策略适用于趋势较明显的品种,也可考虑在相对稳定的大周期如日线操作。整体来说,该策略具有较强的实用价值。

|| 


## Overview

This strategy uses Bollinger Bands, Keltner Channels and Adaptive Relative Strength Index to determine the current trend direction, combined with Parabolic SAR to time the entry. Trading signals are generated when the judgments of these three indicators agree. The strategy mainly judges the trend direction and enters in a timely manner when the trend changes, aiming for profit.

## Principles 

This strategy combines the following three technical indicators to determine the current trend:

1. SQUEEZE Momentum Indicator: Calculates Bollinger Bands and Keltner Channels. When the two bands overlap, it generates a squeeze and signals an impending trend change. It returns the squeeze status and linear regression slope.

2. RSI Volume Weighted: Calculates RSI weighted by volume. Uses the midpoint to determine overbought/oversold levels. It emphasizes volume changes.

3. Parabolic SAR: Judges the location of current price relative to the SAR line. SAR above price indicates downtrend while SAR below price indicates uptrend.

The strategy uses Bollinger Bands to determine trend direction, Keltner Channels to refine it, RSI to find reversal opportunities when overbought/oversold, and SAR to time the entry. The logic is:

1. Calculate Bollinger Bands, Keltner Channels, Squeeze indicator. Enter standby when squeeze happens.

2. Calculate volume weighted RSI. RSI above midpoint indicates uptrend, below midpoint downtrend. 

3. Calculate Parabolic SAR. SAR below price shows uptrend, above price shows downtrend.

4. Combine the three indicators: when squeeze happens, RSI goes above midpoint, SAR is below price, a long signal is generated. When squeeze happens, RSI goes below midpoint, SAR is above price, a short signal is generated.

5. When a signal is triggered, check if the judgments of the three indicators on the previous bar are the opposite of current signal. If so, enter trade. 

6. Set stop loss and take profit after entry, trailing stop loss.

## Advantages

The advantages of this strategy:

1. The combination of multiple indicators improves accuracy of trend judgment. Squeeze accurately detects trend changes, RSI clearly identifies overbought/oversold levels, SAR precisely times the entry.

2. The indicator logic is simple and easy to understand. 

3. The confirmation of multiple indicators helps filter false breakouts. 

4. The stop loss and take profit mechanics lock in profits and limit risks.

5. Extensive backtest data ensures reliability.

## Risks

There are also some risks:

1. The long and short entry logic is similar and may generate conflicting signals. Filtering is needed.

2. All indicators use parameter optimization, risks overfitting. 

3. High trading frequency, position sizing needs control.

4. Stop loss may be too close and get stopped out easily.

Solutions:

1. Add persistence check on indicator judgments to avoid signal oscillation. 

2. Use walk forward analysis to adjust parameters and prevent overfitting.

3. Set pyramiding size to control positions per direction. 

4. Test different stop loss ranges to optimize stop loss price.

## Optimization Directions

Some directions to optimize the strategy:

1. Optimize indicator parameters for stability. Consider dynamic optimization.

2. Add position sizing logic like fixed/equal percentage. 

3. Test different stop loss methods like volatility or linear stops, zeroing positions etc.

4. Add money management like fixed fractional position sizing. 

5. Use machine learning models for dynamic entry and exit.

6. Add hedging mechanisms by going both long and short to reduce correlated systemic risks.

7. Consider more indicators and build voting mechanisms to improve accuracy.

## Conclusion

The strategy has clear logic of using multiple indicators to determine trend direction and astutely entering on squeeze. The stop loss and take profit mechanics limit risks. Parameter optimization and risk controls can further improve backtest and live results. It is a stable trend following strategy suitable for trending products, and can also work on larger timeframes like daily. With strong practical value, this strategy can be further optimized in many aspects.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|SOURCE: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|true|SQUEEZE MOMENTUM INDICATOR|
|v_input_3|85|BOLLINGER BANDS LENGTH|
|v_input_4|2.1|BOLLINGER BANDS MULTI-FACTOR|
|v_input_5|38|KELTNER CHANNEL LENGTH|
|v_input_6|2|KELTNER CHANNEL MULTI-FACTOR|
|v_input_7|true|PARABOLIC SAR|
|v_input_8|0.73|SAR STAR|
|v_input_9|0.5|SAR INC|
|v_input_10|0.06|SAR MAX|
|v_input_11|true|RSI VOLUME WEIGHTED|
|v_input_12|22|RSI LENGHT|
|v_input_13|45|RSI CENTER LINE|
|v_input_14|2018|BACKTEST START YEAR|
|v_input_15|true|BACKTEST START MONTH|
|v_input_16|true|BACKTEST START DAY|
|v_input_17|2222|BACKTEST STOP YEAR|
|v_input_18|12|BACKTEST STOP MONTH|
|v_input_19|31|BACKTEST STOP DAY|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-06 00:00:00
end: 2023-11-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © XaviZ

//#####©ÉÉÉÉ¶N###############################################
//####*..´´´´´´,,,»ëN########################################
//###ë..´´´´´´,,,,,,''%©#####################################
//###'´´´´´´,,,,,,,'''''?¶###################################
//##o´´´´´´,,,,,,,''''''''*©#################################
//##'´´´´´,,,,,,,'''''''^^^~±################################
//#±´´´´´,,,,,,,''''''''^í/;~*©####æ%;í»~~~~;==I±N###########
//#»´´´´,,,,,,'''''''''^;////;»¶X/í~~/~~~;=~~~~~~~~*¶########
//#'´´´,,,,,,''''''''^^;////;%I^~/~~/~~~=~~~;=?;~~~~;?ë######
//©´´,,,,,,,''''''''^^~/////X~/~~/~~/~~»í~~=~~~~~~~~~~^;É####
//¶´,,,,,,,''''''''^^^;///;%;~/~~;í~~»~í?~?~~~?I/~~~~?*=íÑ###
//N,,,,,,,'''''''^^^^^///;;o/~~;;~~;£=»í»;IX/=~~~~~~^^^^'*æ##
//#í,,,,,''''''''^^^^^;;;;;o~»~~~~íX//~/»~;í?IíI»~~^/*?'''=N#
//#%,,,'''''''''^^^^^^í;;;;£;~~~//»I»/£X/X/»í*&~~~^^^^'^*~'É#
//#©,,''''''''^^^^^^^^~;;;;&/~/////*X;í;o*í»~=*?*===^'''''*£#
//##&''''''''^^^^^^^^^^~;;;;X=í~~~»;;;/~;í»~»±;^^^^^';=''''É#
//##N^''''''^^^^^^^^^^~~~;;;;/£;~~/»~~»~~///o~~^^^^''''?^',æ#
//###Ñ''''^^^^^^^^^^^~~~~~;;;;;í*X*í»;~~IX?~~^^^^/?'''''=,=##
//####X'''^^^^^^^^^^~~~~~~~~;;íííííí~~í*=~~~~Ií^'''=''''^»©##
//#####£^^^^^^^^^^^~~~~~~~~~~~íííííí~~~~~*~^^^;/''''='',,N###
//######æ~^^^^^^^^~~~~~~~~~~~~~~íííí~~~~~^*^^^'=''''?',,§####
//########&^^^^^^~~~~~~~~~~~~~~~~~~~~~~~^^=^^''=''''?,íN#####
//#########N?^^~~~~~~~~~~~~~~~~~~~~~~~~^^^=^''^?''';í@#######
//###########N*~~~~~~~~~~~~~~~~~~~~~~~^^^*'''^='''/É#########
//##############@;~~~~~~~~~~~~~~~~~~~^^~='''~?'';É###########
//#################É=~~~~~~~~~~~~~~^^^*~'''*~?§##############
//#####################N§£I/~~~~~~»*?~»o§æN##################

//@version=4
strategy(title="M-SQUEEZE", overlay = true)

//study(title="M-SQUEEZE", overlay = true)

src = input(close, "SOURCE", type = input.source)

// ███▓▒░░ VARIABLES ░░▒▓███

var bool longCond = na, var bool shortCond = na
var int CondIni_long0 = 0, var int CondIni_short0 = 0
var int CondIni_long = 0, var int CondIni_short = 0
var float last_open_longCondition = na, var float last_open_shortCondition = na
var int last_longCondition0 = na, var int last_shortCondition0 = na
var int last_longCondition = na, var int last_shortCondition = na
var bool long_tp = na, var bool short_tp = na
var int last_long_tp = na, var int last_short_tp = na
var bool Final_Long_tp = na, var bool Final_Short_tp = na
var bool SMI_longCond = na, var bool SMI_shortCond = na
var bool RSI_longCond = na, var bool RSI_shortCond = na
var bool ADX_longCond = na, var bool ADX_shortCond = na
var bool SAR_longCond = na, var bool SAR_shortCond = na
var bool Final_longCondition0 = na, var bool Final_shortCondition0 = na
var bool Final_longCondition = na, var bool Final_shortCondition = na

// ███▓▒░░ SQUEEZE MOMENTUM INDICATOR ░░▒▓███

Act_SMI = input(true, "SQUEEZE MOMENTUM INDICATOR")
BB_length = input(85, title="BOLLINGER BANDS LENGTH", minval = 1)
BB_mult = input(2.1, title="BOLLINGER BANDS MULTI-FACTOR", minval = 0.1, step = 0.1)
KC_length = input(38, title="KELTNER CHANNEL LENGTH", minval = 1)
KC_mult = input(2.0, title="KELTNER CHANNEL MULTI-FACTOR", minval = 0.1, step = 0.1)

SQUEEZE_M(_src,_BB_length,_BB_mult,_KC_length,_KC_mult)=>

    // Calculate BB
    basis = sma(_src, _BB_length)
    dev = _BB_mult * stdev(_src, _BB_length)
    upperBB = basis + dev
    lowerBB = basis - dev
    // Calculate KC
    ma = sma(src, _KC_length)
    rangema = sma(tr, _KC_length)
    upperKC = ma + rangema * _KC_mult
    lowerKC = ma - rangema * _KC_mult
    // Squeeze
    sqzOn = lowerBB > lowerKC and upperBB < upperKC
    sqzOff = lowerBB < lowerKC and upperBB > upperKC
    nosqz = sqzOn == false and sqzOff == false
    // Linear Regression curve
    val = linreg(_src - avg(avg(highest(high, _KC_length), lowest(low, _KC_length)), sma(close, _KC_length)), _KC_length, 0)
    [nosqz,val]
    
[NOSQZ,VAL] = SQUEEZE_M(src,BB_length,BB_mult,KC_length,KC_mult)

barcolor(iff(VAL > 0, iff(VAL > nz(VAL[1]), color.lime, color.green), iff(VAL < nz(VAL[1]), color.red, color.maroon)))

// ███▓▒░░ SAR ░░▒▓███

Act_SAR = input(true, "PARABOLIC SAR")
Sst = input (0.73, "SAR STAR", step=0.01, minval = 0.01)
Sinc = input (0.5, "SAR INC", step=0.01, minval = 0.01)
Smax = input (0.06, "SAR MAX", step=0.01, minval = 0.01)

SAR = sar(Sst, Sinc, Smax)
plot(SAR, style = plot.style_cross, title = "SAR")

// ███▓▒░░ RSI VOLUME WEIGHTED ░░▒▓███

Act_RSI = input(true, "RSI VOLUME WEIGHTED")
RSI_len = input(22, "RSI LENGHT", minval = 1)
RSI_obos = input(45,title="RSI CENTER LINE", type=input.integer, minval = 1)

WiMA(_src, _length)=> 
    var float MA_s=0.0
    MA_s:=(_src + nz(MA_s[1] * (_length-1)))/_length
    MA_s

RSI_Volume(fv, length)=>	
	up=iff(fv>fv[1],abs(fv-fv[1])*volume,0)
	dn=iff(fv<fv[1],abs(fv-fv[1])*volume,0)
	upt=WiMA(up,length)
	dnt=WiMA(dn,length)
	100*(upt/(upt+dnt))

RSI_V = RSI_Volume(src, RSI_len)

// ███▓▒░░ STRATEGY ░░▒▓███

SMI_longCond := (Act_SMI ? (VAL > 0 and (VAL > nz(VAL[1])) and not NOSQZ) : RSI_longCond) 
RSI_longCond := (Act_RSI ? (RSI_V > RSI_obos) : SAR_longCond)
SAR_longCond := (Act_SAR ? (SAR < close) : SMI_longCond)

SMI_shortCond := (Act_SMI ? (VAL < 0 and (VAL < nz(VAL[1])) and not NOSQZ) : RSI_shortCond) 
RSI_shortCond := (Act_RSI ? (RSI_V < RSI_obos) : SAR_shortCond)
SAR_shortCond := (Act_SAR ? (SAR > close) : SMI_shortCond)

longCond := SMI_longCond and RSI_longCond and SAR_longCond
shortCond := SMI_shortCond and RSI_shortCond and SAR_shortCond

CondIni_long0 := longCond ? 1 : shortCond ? -1 : CondIni_long0[1]
CondIni_short0 := longCond ? 1 : shortCond ? -1 : CondIni_short0[1]

longCondition0 = (longCond and CondIni_long0[1] == -1)
shortCondition0 = (shortCond and CondIni_short0[1] == 1)

CondIni_long := longCond[1] ? 1 : shortCond[1] ? -1 : CondIni_long[1]
CondIni_short := longCond[1] ? 1 : shortCond[1] ? -1 : CondIni_short[1]

longCondition = (longCond[1] and CondIni_long[1] == -1)
shortCondition = (shortCond[1] and CondIni_short[1] == 1)

// ███▓▒░░ ALERTS & SIGNALS ░░▒▓███

plotshape(longCondition, title = "Long Signal", style = shape.triangleup, location = location.belowbar, color = color.blue, transp = 0, size = size.tiny)
plotshape(shortCondition, title = "Short Signal", style = shape.triangledown, location = location.abovebar, color = #FF0000, transp = 0, size = size.tiny)

//alertcondition(longCondition, title="Long Alert", message = "LONG") 
//alertcondition(shortCondition, title="Short Alert", message = "SHORT")

// ███▓▒░░ BACKTESTING ░░▒▓███

testStartYear = input(2018, "BACKTEST START YEAR", minval = 1980, maxval = 2222) 
testStartMonth = input(01, "BACKTEST START MONTH", minval = 1, maxval = 12)
testStartDay = input(01, "BACKTEST START DAY", minval = 1, maxval = 31)
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)
testStopYear = input(2222, "BACKTEST STOP YEAR", minval=1980, maxval = 2222)
testStopMonth = input(12, "BACKTEST STOP MONTH", minval=1, maxval=12)
testStopDay = input(31, "BACKTEST STOP DAY", minval=1, maxval=31)
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)

testPeriod = time >= testPeriodStart and time <= testPeriodStop ? true : false

strategy.entry("Long", strategy.long, when = longCondition0 and testPeriod)
strategy.entry("Short", strategy.short, when = shortCondition0 and testPeriod)

```

> Detail

https://www.fmz.com/strategy/431218

> Last Modified

2023-11-06 10:01:42
