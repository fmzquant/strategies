
> Name

结合趋势和震荡的量化交易策略Trend-and-Oscillation-Double-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/da6a9e363c71691548.png)

[trans]

## 概述

双趋势震荡策略是一种结合趋势和震荡的量化交易策略。它利用两个指标的组合来识别趋势的方向和力度,并在趋势震荡的时候寻找较好的入场时机。

## 策略原理

该策略主要利用了两个公开指标:Trend Surfers和Mawreez's Trend Oscillator。

Trend Surfers是一个趋势跟踪止损指标。它通过计算一定周期内的最高价和最低价,来判断价格走势并给出建议的止损位置。比如,当价格突破最近168根K线的最高价时,就是看涨信号;当价格跌破最近168根K线的最低价时,就是看跌信号。

Mawreez's Trend Oscillator则是一个双线震荡指标。它类似MACD,通过DI的差值来判断趋势的方向和力度。该指标曲线在0轴以上为看涨,以下为看跌。

该策略的交易规则是:

多头入场:Trend Surfers突破最高线和Mawreez's Trend Oscillator指标为看涨时买入
空头入场:Trend Surfers跌破最低线和Mawreez's Trend Oscillator指标为看跌时卖出

止损方式为趋势跟踪止损加固定止损。

## 优势分析

该策略结合了趋势和震荡指标,既可以捕捉趋势,也可以在震荡中寻找较好价格入场,具有以下优势:

1. 双重指标过滤,可以有效避免假突破
2. 结合趋势和震荡,容易抓住价格在震荡区间中的低位吸筹布局或高位轻装上阵
3. 采用多重止损方式,可以很好控制风险

## 风险分析

该策略也存在一些风险:

1. 双重指标组合,容易漏单
2. 趋势指标和震荡指标可能会发出冲突信号
3. 固定止损可能会过早止损

针对这些风险,可以采取以下措施加以规避:

1. 适当宽松指标参数,降低滤波率
2. 增加趋势判断规则,避免指标冲突
3. 动态调整止损位置

## 优化方向 

该策略还有进一步优化的空间:

1. 测试不同参数组合和周期参数,寻找最佳参数
2. 增加波动率、交易量等辅助判断规则
3. 采用机器学习技术动态优化指标和参数

## 总结

双趋势震荡策略综合运用趋势跟踪和震荡指标的优点,既可以识别趋势方向,又可以把握震荡机会,通过参数和规则优化,可以将策略盈利能力进一步提升。该策略有良好的发展前景。

|| 

## Overview

The Trend and Oscillation Double Strategy is a quantitative trading strategy that combines trend and oscillation. It utilizes the combination of two indicators to identify the direction and strength of the trend, and find better entry opportunities during trend oscillations.  

## Principles

The strategy mainly utilizes two open indicators: Trend Surfers and Mawreez's Trend Oscillator.  

Trend Surfers is a trend tracking stop loss indicator. By calculating the highest and lowest prices over a certain period, it judges the price movement and gives suggested stop loss positions. For example, when the price breaks through the highest price of the most recent 168 K-lines, it is a bullish signal; when the price breaks through the lowest price of the most recent 168 K-lines, it is a bearish signal.

Mawreez's Trend Oscillator is a dual-line oscillation indicator. Similar to MACD, it judges the direction and strength of the trend through the difference in DI. The values above 0 axis of this indicator curve indicate bullishness, while those below indicate bearishness.

The trading rules of this strategy are:  

Long entry: Buy when Trend Surfers break through the highest line and Mawreez's Trend Oscillator shows bullish signal  
Short entry: Sell when Trend Surfers break through the lowest line and Mawreez's Trend Oscillator shows bearish signal

The stop loss method is a combination of trend tracking stop loss and fixed stop loss.

## Advantage Analysis 

This strategy combines trend and oscillation indicators, which can capture trends and find better entry prices during oscillations. The main advantages are:

1. The double indicator filtering can effectively avoid false breakouts  
2. The combination of trend and oscillation makes it easier to seize the low price in price ranges for bargain hunting or exit at high price for profit taking  
3. The multiple stop loss methods can control risks very well

## Risk Analysis

There are also some risks with this strategy:  

1. The combination of double indicators may lead to missing trading signals  
2. Conflicting signals may occur between the trend indicator and oscillation indicator  
3. Fixed stop loss may stop out too early   

To mitigate these risks, the following measures can be taken:

1. Relax the parameters of the indicators properly to reduce filtration rate
2. Add rules of trend judgment to avoid indicator conflicts  
3. Dynamically adjust stop loss positions

## Optimization Directions

There is room for further optimization of this strategy:

1. Test different parameter combinations and cycle parameters to find the optimal parameters  
2. Increase auxiliary rules based on volatility, trading volume etc.   
3. Adopt machine learning techniques to dynamically optimize indicators and parameters  

## Summary  

The Trend and Oscillation Double Strategy integrates the advantages of trend tracking and oscillation indicators. It can identify trend directions and seize oscillation opportunities. With parameter and rule optimization, the profitability of this strategy can be further enhanced. This strategy has good prospects for development.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_6|14|DI Length|
|v_input_float_4|25|Sensitivity|
|v_input_float_1|2|(?Risk Management)Max % risk|
|v_input_int_1|true|How many pairs|
|v_input_int_2|168|(?Entry Condition)Highest High Period|
|v_input_int_3|168|Lowest Low Period|
|v_input_int_4|10|(?Exit Condition)Trailing ATR Pediod|
|v_input_float_2|8|Trailing ATR Multiplier|
|v_input_int_5|10|Fix ATR Pediod|
|v_input_float_3|2|Fix ATR Multiplier|
|v_input_bool_1|false|(?ADX)Average Directional Index (ADX)|
|v_input_1|14|ADX Smoothing|
|v_input_2|14|DI Length|
|v_input_3|25|ADX Threshold|
|v_input_bool_2|true|(?Date Range)Start|
|v_input_4|timestamp(1 Jan 2019)|startPeriodTime|
|v_input_bool_3|true|End|
|v_input_5|timestamp(31 Dec 2030)|endPeriodTime|
|v_input_string_1|0|(?Trade Direction)Trade Direction: Long and Short|Long Only|Short Only|
|v_input_float_5|100|(?Take Profit)Take Profit 1 - Target %|
|v_input_int_7|100|% Of Position|
|v_input_float_6|100|Take Profit 2 - Target %|
|v_input_int_8|100|% Of Position|
|v_input_float_7|100|Take Profit 3 - Target %|
|v_input_int_9|100|% Of Position|
|v_input_float_8|100|Take Profit 4 - Target %|
|v_input_float_9|999|(?Stop Loss)Stop Loss (%)|
|v_input_float_10|true|(?Leverage)Leverage|
|v_input_string_2|CRYPTANEX_99FTX_Strategy-Name-Here|(?ProfitView Alert Syntax)Alert Syntax Prefix|
|v_input_bool_4|false|(?Dashboard)Show Dashboard|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-27 00:00:00
end: 2024-01-03 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © myn

//@version=5
strategy('Strategy Myth-Busting #8 - TrendSurfers+TrendOsc - [MYN]', max_bars_back=5000, overlay=true, pyramiding=0, initial_capital=20000, currency='USD', default_qty_type=strategy.percent_of_equity, default_qty_value=100.0, commission_value=0.075, use_bar_magnifier = false)

/////////////////////////////////////
//* Put your strategy logic below *//
/////////////////////////////////////
//cAe9It4ynO4


// Strategies
// Trend Surfers - Premium Indicator
// Mawreez' Trend Oscillator Indicator

// Trading Setup / Rules


// Long Condition 
// Trend Surfers Trailing stop line goes below (Crosses) lowest low
// Bullish Candle (red)
// Mawreeze Trend Oscilator Indicator is green


// Short Condition

// Trend Surfers Trailing stop line goes above (Crosses) highest high
// Bearish Candle (red)
// Mawreeze Trend Oscilator Indicator is red

// Stop loss middle between high and low Risk 1:2


//@version=5
//strategy(shorttitle='Trend Surfers - Breakout', title='Trend Surfers - Premium Breakout', overlay=true, calc_on_every_tick=false, initial_capital=100000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type='percent', commission_value=0.04)

// Risk for position and pyramid
maxriskval = input.float(2, 'Max % risk', tooltip='Risk % over total equity / Position', group='Risk Management')
pairnumber = input.int(title='How many pairs', defval=1, tooltip='How many pairs are you trading with the strategy?', group='Risk Management')

// Emtry Exit
highPeriod = input.int(title='Highest High Period', defval=168, tooltip='Highest High of X bars - This will trigger a Long Entry when close is above. (Thin Green Line)', group='Entry Condition')
lowPeriod = input.int(title='Lowest Low Period', defval=168, tooltip='Lowest low of X bars - This will trigger a Short Entry when close is under. (Thin Red Line)', group='Entry Condition')
// Stoploss
trailingAtrPeriod = input.int(title='Trailing ATR Pediod', defval=10, tooltip='Average True Range for the Trailing Stop. (Thick Green Line) ', group='Exit Condition')
trailingAtrMultiplier = input.float(title='Trailing ATR Multiplier', defval=8, group='Exit Condition')
fixAtrPeriod = input.int(title='Fix ATR Pediod', defval=10, tooltip='Average True Range for the Fix Stoloss. (Thick Yellow Line)', group='Exit Condition')
fixAtrMultiplier = input.float(title='Fix ATR Multiplier', defval=2, group='Exit Condition')
// Pair info 
pair = syminfo.basecurrency + syminfo.currency

// High Low Variable
highestHigh = ta.highest(high, highPeriod)[1]
lowestLow = ta.lowest(low, lowPeriod)[1]
trailingAtr = ta.atr(trailingAtrPeriod) * trailingAtrMultiplier

// Trade Condition
longConditionTrendSurfers = ta.crossover(close, highestHigh)
shortConditionTrendSurfers = ta.crossunder(close, lowestLow)

// Risk Variable
fixAtr = ta.atr(fixAtrPeriod) * fixAtrMultiplier
stopvaluelong = close[1] - fixAtr[1]
stopvalueshort = close[1] + fixAtr[1]

// Position size Long
maxpossize = strategy.equity / close
positionsizelong = maxriskval / 100 * strategy.equity / (close - stopvaluelong)
stopperclong = (close - stopvaluelong) / close * 100
leveragelong = math.max(1, math.ceil(positionsizelong / maxpossize)) * 2
posperclong = positionsizelong * close / strategy.equity * 100 / leveragelong / pairnumber
realposlong = posperclong / 100 * strategy.equity * leveragelong / close

// Position size Short
positionsizeshort = maxriskval / 100 * strategy.equity / (stopvalueshort - close)
stoppercshort = (close - stopvalueshort) / close * 100
leverageshort = math.max(1, math.ceil(positionsizeshort / maxpossize)) * 2
pospercshort = positionsizeshort * close / strategy.equity * 100 / leverageshort / pairnumber
realposshort = pospercshort / 100 * strategy.equity * leverageshort / close

// Alert Message
entry_long_message = '\nGo Long for ' + pair + 'NOW!' + '\nPosition Size % =' + str.tostring(posperclong) + '\nLeverage' + str.tostring(leveragelong) + '\nStoploss Price =' + str.tostring(stopvaluelong) + '\nClose any Short position that are open for ' + pair + '!' + '\n\nVisit TrendSurfersSignals.com' + '\nFor automated premium signals (FREE)'

entry_short_message = '\nGo Short for ' + pair + 'NOW!' + '\nPosition Size % =' + str.tostring(pospercshort) + '\nLeverage' + str.tostring(leverageshort) + '\nStoploss Price =' + str.tostring(stopvalueshort) + '\nClose any Long position that are open for ' + pair + '!' + '\n\nVisit TrendSurfersSignals.com' + '\nFor automated premium signals (FREE)'

exit_short_message = '\nExit Short for ' + pair + 'NOW!' + '\n\nVisit TrendSurfersSignals.com' + '\nFor automated premium signals (FREE)'

exit_long_message = '\nExit Long for ' + pair + 'NOW!' + '\n\nVisit TrendSurfersSignals.com' + '\nFor automated premium signals (FREE)'
// Order
// if longCondition
//     strategy.entry('Long', strategy.long, stop=highestHigh, comment='Long', qty=realposlong, alert_message=entry_long_message)
// if shortCondition
//     strategy.entry('Short', strategy.short, stop=lowestLow, comment='Short', qty=realposshort, alert_message=entry_short_message)

// Stoploss Trailing
longTrailing = close - trailingAtr
shortTrailing = close + trailingAtr

var longTrailingStop = 0.0
var shortTrailingStop = 999999.9

trailingStopLine = 0.0
trailingStopLine := na
fixedStopLine = 0.0
fixedStopLine := na
var inTrade = 0
if longConditionTrendSurfers or shortConditionTrendSurfers
    if 0 == inTrade
        if longConditionTrendSurfers
            inTrade := 1
            inTrade
        else
            inTrade := -1
            inTrade
if 1 == inTrade and (shortConditionTrendSurfers or low <= math.max(fixedStopLine[1], longTrailingStop))
    inTrade := 0
    inTrade
if -1 == inTrade and (longConditionTrendSurfers or high >= math.min(fixedStopLine[1], shortTrailingStop))
    inTrade := 0
    inTrade

longTrailingStop := if 1 == inTrade
    stopValue = longTrailing
    math.max(stopValue, longTrailingStop[1])
else
    0

shortTrailingStop := if -1 == inTrade
    stopValue = shortTrailing
    math.min(stopValue, shortTrailingStop[1])
else
    999999

// Fix Stoploss
firstPrice = 0.0
firstFixAtr = 0.0
firstPrice := na
firstFixAtr := na
if 0 != inTrade
    firstPrice := ta.valuewhen(inTrade != inTrade[1] and 0 != inTrade, close, 0)
    firstFixAtr := ta.valuewhen(inTrade != inTrade[1] and 0 != inTrade, fixAtr, 0)
    if 1 == inTrade
        fixedStopLine := firstPrice - firstFixAtr
        trailingStopLine := longTrailingStop
        trailingStopLine
    else
        fixedStopLine := firstPrice + firstFixAtr
        trailingStopLine := shortTrailingStop
        trailingStopLine

// if strategy.position_size > 0
//     strategy.exit(id='L Stop', stop=math.max(fixedStopLine, longTrailingStop), alert_message=exit_long_message)

// if strategy.position_size < 0
//     strategy.exit(id='S Stop', stop=math.min(fixedStopLine, shortTrailingStop), alert_message=exit_short_message)


// Plot
plot(highestHigh, color=color.new(color.green, 0), linewidth=1, title='Highest High')
plot(lowestLow, color=color.new(color.red, 0), linewidth=1, title='Lowest Low')
plot(trailingStopLine, color=color.new(color.lime, 0), linewidth=2, offset=1, title='Trailing Stop')
plot(fixedStopLine, color=color.new(color.orange, 0), linewidth=2, offset=1, title='Fixed Stop')

// Trend Surfers Trailing stop line goes above (Crossesover) highest high
// Bearish Candle (red)
// Mawreeze Trend Oscilator Indicator is red

trendSurfersShortEntry = trailingStopLine > highestHigh and close < close[1]
trendSurfersLongEntry = trailingStopLine < lowestLow and close > close[1]


//@version=5

// Taken from the TradingView house rules regarding scripts:

// "All open source scripts that do not mention a specific open source license
// in their comments are licensed under the Mozilla Public License 2.0.
// Following the Mozilla License, any script reusing open source code originally
// published by someone else must also be open source, unless specific
// permission is granted by the original author."

//indicator('Mawreez\' Trend Oscillator', precision=3)

len = input.int(title='DI Length', minval=1, defval=14)
sens = input.float(title='Sensitivity', defval=25)

// Lag-free smoothing of a given series
smooth(series, len) =>
    f28 = ta.ema(series, len)
    f30 = ta.ema(f28, len)
    vC = f28 * 1.5 - f30 * 0.5
    f38 = ta.ema(vC, len)
    f40 = ta.ema(f38, len)
    v10 = f38 * 1.5 - f40 * 0.5
    f48 = ta.ema(v10, len)
    f50 = ta.ema(f48, len)
    f48 * 1.5 - f50 * 0.5

// Constructing the +DI and -DI
up = ta.change(high)
down = -ta.change(low)
plus_dm = up > 0 and up > down ? up : 0
minus_dm = down > 0 and down > up ? down : 0
range_1 = ta.rma(ta.tr, len)
plus_di = smooth(ta.rma(plus_dm, len) / range_1, 3)
minus_di = smooth(ta.rma(minus_dm, len) / range_1, 3)

// Constructing and plotting the modified ADX
adj_adx = 100 * math.abs(plus_di - minus_di) / (plus_di + minus_di) - sens
adj_adx := (minus_di > plus_di ? -1 : 1) * (adj_adx < 0 ? 0 : adj_adx)
//plot(smooth(adj_adx, 3), color=plus_di > minus_di ? color.green : color.red, style=plot.style_columns)

trendOscShortEntry = plus_di < minus_di
trendOscLongEntry = plus_di > minus_di




//////////////////////////////////////
//* Put your strategy rules below *//
/////////////////////////////////////

longCondition = trendSurfersLongEntry and trendOscLongEntry
shortCondition = trendSurfersShortEntry and trendOscShortEntry

//define as 0 if do not want to use
closeLongCondition = 0
closeShortCondition = 0


// ADX
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

adxEnabled = input.bool(defval = false , title = "Average Directional Index (ADX)", tooltip = "", group ="ADX" ) 
adxlen = input(14, title="ADX Smoothing", group="ADX")
adxdilen = input(14, title="DI Length", group="ADX")
adxabove = input(25, title="ADX Threshold", group="ADX")

adxdirmov(len) =>
	adxup = ta.change(high)
	adxdown = -ta.change(low)
	adxplusDM = na(adxup) ? na : (adxup > adxdown and adxup > 0 ? adxup : 0)
	adxminusDM = na(adxdown) ? na : (adxdown > adxup and adxdown > 0 ? adxdown : 0)
	adxtruerange = ta.rma(ta.tr, len)
	adxplus = fixnan(100 * ta.rma(adxplusDM, len) / adxtruerange)
	adxminus = fixnan(100 * ta.rma(adxminusDM, len) / adxtruerange)
	[adxplus, adxminus]
adx(adxdilen, adxlen) =>
	[adxplus, adxminus] = adxdirmov(adxdilen)
	adxsum = adxplus + adxminus
	adx = 100 * ta.rma(math.abs(adxplus - adxminus) / (adxsum == 0 ? 1 : adxsum), adxlen)

adxsig = adxEnabled ? adx(adxdilen, adxlen) : na
isADXEnabledAndAboveThreshold = adxEnabled ? (adxsig > adxabove) : true

//Backtesting Time Period (Input.time not working as expected as of 03/30/2021.  Giving odd start/end dates
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
useStartPeriodTime = input.bool(true, 'Start', group='Date Range', inline='Start Period')
startPeriodTime = input(timestamp('1 Jan 2019'), '', group='Date Range', inline='Start Period')
useEndPeriodTime = input.bool(true, 'End', group='Date Range', inline='End Period')
endPeriodTime = input(timestamp('31 Dec 2030'), '', group='Date Range', inline='End Period')

start = useStartPeriodTime ? startPeriodTime >= time : false
end = useEndPeriodTime ? endPeriodTime <= time : false
calcPeriod = true

// Trade Direction 
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tradeDirection = input.string('Long and Short', title='Trade Direction', options=['Long and Short', 'Long Only', 'Short Only'], group='Trade Direction')

// Percent as Points
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
per(pcnt) =>
    strategy.position_size != 0 ? math.round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)

// Take profit 1
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tp1 = input.float(title='Take Profit 1 - Target %', defval=100, minval=0.0, step=0.5, group='Take Profit', inline='Take Profit 1')
q1 = input.int(title='% Of Position', defval=100, minval=0, group='Take Profit', inline='Take Profit 1')

// Take profit 2
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tp2 = input.float(title='Take Profit 2 - Target %', defval=100, minval=0.0, step=0.5, group='Take Profit', inline='Take Profit 2')
q2 = input.int(title='% Of Position', defval=100, minval=0, group='Take Profit', inline='Take Profit 2')

// Take profit 3
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tp3 = input.float(title='Take Profit 3 - Target %', defval=100, minval=0.0, step=0.5, group='Take Profit', inline='Take Profit 3')
q3 = input.int(title='% Of Position', defval=100, minval=0, group='Take Profit', inline='Take Profit 3')

// Take profit 4
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tp4 = input.float(title='Take Profit 4 - Target %', defval=100, minval=0.0, step=0.5, group='Take Profit')

/// Stop Loss
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
stoplossPercent = input.float(title='Stop Loss (%)', defval=999, minval=0.01, group='Stop Loss') * 0.01
slLongClose = close < strategy.position_avg_price * (1 - stoplossPercent)
slShortClose = close > strategy.position_avg_price * (1 + stoplossPercent)

/// Leverage
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
leverage = input.float(1, 'Leverage', step=.5, group='Leverage')
contracts = math.min(math.max(.000001, strategy.equity / close * leverage), 1000000000)


/// Trade State Management
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

isInLongPosition = strategy.position_size > 0
isInShortPosition = strategy.position_size < 0

/// ProfitView Alert Syntax String Generation
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

alertSyntaxPrefix = input.string(defval='CRYPTANEX_99FTX_Strategy-Name-Here', title='Alert Syntax Prefix', group='ProfitView Alert Syntax')
alertSyntaxBase = alertSyntaxPrefix + '\n#' + str.tostring(open) + ',' + str.tostring(high) + ',' + str.tostring(low) + ',' + str.tostring(close) + ',' + str.tostring(volume) + ','


/// Trade Execution
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

longConditionCalc = (longCondition and isADXEnabledAndAboveThreshold)
shortConditionCalc = (shortCondition and isADXEnabledAndAboveThreshold)

if calcPeriod
    if longConditionCalc and tradeDirection != 'Short Only' and isInLongPosition == false
        strategy.entry('Long', strategy.long, qty=contracts)

        alert(message=alertSyntaxBase + 'side:long', freq=alert.freq_once_per_bar_close)

    if shortConditionCalc and tradeDirection != 'Long Only' and isInShortPosition == false
        strategy.entry('Short', strategy.short, qty=contracts)

        alert(message=alertSyntaxBase + 'side:short', freq=alert.freq_once_per_bar_close)
    
    //Inspired from Multiple %% profit exits example by adolgo https://www.tradingview.com/script/kHhCik9f-Multiple-profit-exits-example/
    strategy.exit('TP1', qty_percent=q1, profit=per(tp1))
    strategy.exit('TP2', qty_percent=q2, profit=per(tp2))
    strategy.exit('TP3', qty_percent=q3, profit=per(tp3))
    strategy.exit('TP4', profit=per(tp4))

    strategy.close('Long', qty_percent=100, comment='SL Long', when=slLongClose)
    strategy.close('Short', qty_percent=100, comment='SL Short', when=slShortClose)

    strategy.close_all(when=closeLongCondition or closeShortCondition, comment='Close Postion')

/// Dashboard
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// Inspired by https://www.tradingview.com/script/uWqKX6A2/ - Thanks VertMT

showDashboard = input.bool(group="Dashboard", title="Show Dashboard", defval=false)

f_fillCell(_table, _column, _row, _title, _value, _bgcolor, _txtcolor) =>
    _cellText = _title + "\n" + _value
    table.cell(_table, _column, _row, _cellText, bgcolor=_bgcolor, text_color=_txtcolor, text_size=size.auto)

// Draw dashboard table
if showDashboard
    var bgcolor = color.new(color.black,0)
    
    // Keep track of Wins/Losses streaks
    newWin  = (strategy.wintrades  > strategy.wintrades[1]) and (strategy.losstrades == strategy.losstrades[1]) and (strategy.eventrades == strategy.eventrades[1])
    newLoss = (strategy.wintrades == strategy.wintrades[1]) and (strategy.losstrades  > strategy.losstrades[1]) and (strategy.eventrades == strategy.eventrades[1])

    varip int winRow     = 0
    varip int lossRow    = 0
    varip int maxWinRow  = 0
    varip int maxLossRow = 0

    if newWin
        lossRow := 0
        winRow := winRow + 1
    if winRow > maxWinRow
        maxWinRow := winRow
        
    if newLoss
        winRow := 0
        lossRow := lossRow + 1
    if lossRow > maxLossRow
        maxLossRow := lossRow


    // Prepare stats table
    var table dashTable = table.new(position.bottom_right, 1, 15, border_width=1)
    
   
    if barstate.islastconfirmedhistory
        // Update table
        dollarReturn = strategy.netprofit
        f_fillCell(dashTable, 0, 0, "Start:", str.format("{0,date,long}", strategy.closedtrades.entry_time(0)) , bgcolor, color.white) // + str.format(" {0,time,HH:mm}", strategy.closedtrades.entry_time(0)) 
        f_fillCell(dashTable, 0, 1, "End:", str.format("{0,date,long}", strategy.opentrades.entry_time(0)) , bgcolor, color.white) // + str.format(" {0,time,HH:mm}", strategy.opentrades.entry_time(0))
        _profit = (strategy.netprofit / strategy.initial_capital) * 100
        f_fillCell(dashTable, 0, 2, "Net Profit:", str.tostring(_profit, '##.##') + "%", _profit > 0 ? color.green : color.red, color.white)
        _numOfDaysInStrategy = (strategy.opentrades.entry_time(0) - strategy.closedtrades.entry_time(0)) / (1000 * 3600 * 24)
        f_fillCell(dashTable, 0, 3, "Percent Per Day", str.tostring(_profit / _numOfDaysInStrategy, '#########################.#####')+"%", _profit > 0 ? color.green : color.red, color.white)
        _winRate = ( strategy.wintrades / strategy.closedtrades ) * 100
        f_fillCell(dashTable, 0, 4, "Percent Profitable:", str.tostring(_winRate, '##.##') + "%", _winRate < 50 ? color.red : _winRate < 75 ? #999900 : color.green, color.white)
        f_fillCell(dashTable, 0, 5, "Profit Factor:", str.tostring(strategy.grossprofit / strategy.grossloss,  '##.###'), strategy.grossprofit > strategy.grossloss ? color.green : color.red, color.white)
        f_fillCell(dashTable, 0, 6, "Total Trades:", str.tostring(strategy.closedtrades), bgcolor, color.white)
        f_fillCell(dashTable, 0, 8, "Max Wins In A Row:", str.tostring(maxWinRow, '######') , bgcolor, color.white)
        f_fillCell(dashTable, 0, 9, "Max Losses In A Row:", str.tostring(maxLossRow, '######') , bgcolor, color.white)
```

> Detail

https://www.fmz.com/strategy/437680

> Last Modified

2024-01-04 17:32:26
