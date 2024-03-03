
> Name

基于内部柱线和移动平均线的自动量化交易策略Automated-Quantitative-Trading-Strategy-Based-on-Inside-Bar-and-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6238e3f54677832e02.png)
[trans]

## 概述

本策略的核心思想是结合内部柱线形态以及移动平均线指标来实现自动化交易。当出现内部柱线形态时表明当前趋势可能发生转折,此时我们利用移动平均线的位置来判断最终的交易方向。

## 策略原理

1. 寻找内部柱线形态。内部柱线形态是指某根K线的最高价和最低价都在前一根K线的实体部分之间。根据实体颜色我们可以判断内部柱为多头内部柱或空头内部柱。

2. 判断移动平均线位置。当寻找到内部柱线时,如果价格高于移动平均线则为多头信号,价格低于移动平均线则为空头信号。 

3. 结合内部柱线形态和移动平均线的多空信号,得到最终的交易方向。即看跌内部柱下破平均线做空,看涨内部柱上破平均线做多。

## 策略优势

1. 结合技术指标和价格形态,提高交易决策的准确性。

2. 内部柱线形态本身包含较强的价格转折信号,能提早确定趋势转折点。

3. 移动平均线滤除了部分噪音,避免了在区间震荡中被套。

4. 实现全自动交易,大大降低了人工交易的时间和精力成本。

## 策略风险及解决方法

1. 当价格在平均线附近震荡时,会出现较多错误信号,从而导致过度交易。可以通过优化移动平均线参数或增加过滤条件来减少错误信号。

2. 该策略更适用于有比较明显趋势的市场,在震荡行情中效果可能会打折扣。可以结合趋势判断指标如ADX来控制算法的开启。

3. 存在一定的时间滞后。可以适当缩短参数,或优化移动平均线的计算方式来降低滞后。

4. 回撤风险较大。可以设置止损来控制亏损风险,同时适当调整仓位管理也有助于降低回撤。

## 策略优化方向

1. 优化内部柱判定周期参数,寻找最佳参数组合。

2. 尝试不同类型的移动平均线,如EMA、SMA等,确定最适合的移动平均线指标。 

3. 增加像MACD、KDJ等辅助指标,丰富多空判断依据,提高信号准确性。

4. 加入ADX、ATR等过滤指标,控制算法开启的环境,避免不适宜的市场中运行。

5. 优化仓位管理策略,如风险仓位控制、错失利润回补仓位等,以控制风险并追求更高收益。

## 总结

本策略通过动态跟踪内部柱线信号与移动平均线指标,实现了一套全自动的量化交易方案。策略信号生成简单清晰,容易理解与跟踪。在趋势明显的市场中表现较为出色。通过进一步优化参数与规则,可以进一步增强策略的稳定性与收益性。

|| 

## Overview

The core idea of this strategy is to combine inside bar patterns and moving average indicators to implement automated trading. When an inside bar pattern appears, it indicates that the current trend may be reversing. At this point, we use the position of the moving average line to determine the final trading direction.

## Strategy Principle 

1. Identify inside bar patterns. An inside bar refers to a candlestick where both the high and the low are within the real body of the previous bar. Based on the color of the real body, we can judge if it is a bullish or bearish inside bar.

2. Check the position of the moving average line. When an inside bar is found, if the price is above the moving average line, it is a bullish signal. If the price is below the moving average line, it is a bearish signal.

3. Combine the inside bar pattern and the moving average signal to determine the final trading direction. That is going short when the bearish inside bar breaks below the moving average line, and going long when the bullish inside bar breaks above the line.  

## Advantages of the Strategy

1. Combining technical indicators and price patterns improves the accuracy of trading decisions.

2. Inside bars themselves contain strong price reversal signals that can identify trend reversal points early. 

3. The moving average filters out some noise and avoids getting caught in range-bound oscillations.

4. Fully automated trading greatly reduces the time and effort costs of manual trading.

## Risks of the Strategy & Solutions

1. When prices oscillate around the moving average line, more false signals may appear, leading to over-trading. This can be reduced by optimizing the moving average parameters or adding filtering conditions.

2. This strategy works better in markets with clear trends. The performance may suffer in oscillating markets. Trend-judging indicators like ADX can be added to control the algorithm activation.

3. There is some time lag. Shortening parameters or optimizing moving average calculation methods may reduce the lag.

4. The risk of large drawdowns is considerable. Stop loss can control downside risk. Position sizing optimization also helps decrease drawdowns.   

## Directions for Strategy Optimization  

1. Optimize inside bar determination period parameters to find the best combination.

2. Try different types of moving averages, like EMA and SMA, to decide the most suitable one.

3. Add auxiliary indicators like MACD and KDJ to enrich trading signals and improve accuracy.  

4. Incorporate filtering indicators like ADX and ATR to control algorithm activation in unsuitable market environments.

5. Optimize position management, such as risk-based sizing, pullback sizing etc. to better control risk and pursue higher returns.

## Conclusion

This strategy implements a fully-automated quantitative trading solution by dynamically tracking inside bar signals and moving average indicators. The signal generation is simple and clear for easy understanding and tracking. It performs well in markets with obvious trends. Further optimization of parameters and rules can enhance the stability and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Lookback for Inside Bar|
|v_input_source_1_close|0|_____ falls above HIGH of inside bar (Long condition): close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_source_2_close|0|_____ falls below LOW of inside bar (Short condition): close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_source_3_close|0|EMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|50|EMA Length|
|v_input_bool_1|false|(?ADX)Average Directional Index (ADX)|
|v_input_3|14|ADX Smoothing|
|v_input_4|14|DI Length|
|v_input_5|25|ADX Threshold|
|v_input_bool_2|true|(?Date Range)Start|
|v_input_6|timestamp(1 Jan 2019)|startPeriodTime|
|v_input_bool_3|true|End|
|v_input_7|timestamp(31 Dec 2030)|endPeriodTime|
|v_input_string_1|0|(?Trade Direction)Trade Direction: Long and Short|Long Only|Short Only|
|v_input_float_1|10.5|(?Take Profit)Take Profit 1 - Target %|
|v_input_int_1|25|% Of Position|
|v_input_float_2|11|Take Profit 2 - Target %|
|v_input_int_2|25|% Of Position|
|v_input_float_3|11.5|Take Profit 3 - Target %|
|v_input_int_3|25|% Of Position|
|v_input_float_4|12|Take Profit 4 - Target %|
|v_input_float_5|4|(?Stop Loss)Stop Loss (%)|
|v_input_float_6|true|(?Leverage)Leverage|
|v_input_string_2|CRYPTANEX_99FTX_Strategy-Name-Here|(?ProfitView Alert Syntax)Alert Syntax Prefix|
|v_input_bool_4|false|(?Dashboard)Show Dashboard|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-12-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © myn

//@version=5
strategy('Strategy Myth-Busting #10 - InsideBar+EMA - [MYN]', max_bars_back=5000, overlay=true, pyramiding=0, initial_capital=20000, currency='USD', default_qty_type=strategy.percent_of_equity, default_qty_value=100.0, commission_value=0.075, use_bar_magnifier = false)

/////////////////////////////////////
//* Put your strategy logic below *//
/////////////////////////////////////
//short if: inside bar and bearish & below 50 ema & price falls below low of inside bar. Opposite for long. on 4H TF

// Inside Bar
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

f_priorBarsSatisfied(_objectToEval, _numOfBarsToLookBack) => 
    returnVal = false
    for i = 0 to _numOfBarsToLookBack
        if (_objectToEval[i] == true)
            returnVal = true

i_numLookbackBars = input(2,title="Lookback for Inside Bar")



// This source code is subject to the terms of the GNU License 2.0 at https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
// © cma

//@version=5
//indicator('Inside Bar Ind/Alert', overlay=true)

bullishBar = 1
bearishBar = -1

isInside() =>
    previousBar = 1
    bodyStatus = close >= open ? 1 : -1
    isInsidePattern = high < high[previousBar] and low > low[previousBar]

    isInsidePattern ? bodyStatus : 0

barcolor(isInside() == bullishBar ? color.green : na)
barcolor(isInside() == bearishBar ? color.red : na)

// When is bullish bar paint green
plotshape(isInside() == bullishBar, style=shape.triangleup, location=location.abovebar, color=color.new(color.green, 0))

// When is bearish bar paint red
plotshape(isInside() == bearishBar, style=shape.triangledown, location=location.belowbar, color=color.new(color.red, 0))

isInsideBarMade = isInside() == bullishBar or isInside() == bearishBar

alertcondition(isInsideBarMade, title='Inside Bar', message='Inside Bar came up!')

i_srcInsideBarLong = input.source(close, title = "_____ falls above HIGH of inside bar (Long condition)")
i_srcInsideBarShort = input.source(close, title = "_____ falls below LOW of inside bar (Short condition)")


//if: inside bar and falls below low of inside bar. I think.
insideBarLongEntry = f_priorBarsSatisfied(isInside() == bullishBar,i_numLookbackBars) and i_srcInsideBarLong > high[i_numLookbackBars]     //isInside() == bullishBar
insideBarShortEntry = f_priorBarsSatisfied(isInside() == bearishBar,i_numLookbackBars)  and i_srcInsideBarShort < low[i_numLookbackBars]    //isInside() == bearishBar


// EMA
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

i_src = input.source(close, title = "EMA Source")
i_emaLength = input(50,title="EMA Length")
ema = ta.ema(i_src, i_emaLength)
emaPlot = plot(series=ema,color=color.blue, linewidth=2)

emaLongEntry = i_src > ema
emaShortEntry = i_src < ema

//////////////////////////////////////
//* Put your strategy rules below *//
/////////////////////////////////////

longCondition = insideBarLongEntry and emaLongEntry
shortCondition = insideBarShortEntry and emaShortEntry
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
tp1 = input.float(title='Take Profit 1 - Target %', defval=10.5, minval=0.0, step=0.5, group='Take Profit', inline='Take Profit 1')
q1 = input.int(title='% Of Position', defval=25, minval=0, group='Take Profit', inline='Take Profit 1')

// Take profit 2
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tp2 = input.float(title='Take Profit 2 - Target %', defval=11, minval=0.0, step=0.5, group='Take Profit', inline='Take Profit 2')
q2 = input.int(title='% Of Position', defval=25, minval=0, group='Take Profit', inline='Take Profit 2')

// Take profit 3
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tp3 = input.float(title='Take Profit 3 - Target %', defval=11.5, minval=0.0, step=0.5, group='Take Profit', inline='Take Profit 3')
q3 = input.int(title='% Of Position', defval=25, minval=0, group='Take Profit', inline='Take Profit 3')

// Take profit 4
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tp4 = input.float(title='Take Profit 4 - Target %', defval=12, minval=0.0, step=0.5, group='Take Profit')

/// Stop Loss
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
stoplossPercent = input.float(title='Stop Loss (%)', defval=4, minval=0.01, group='Stop Loss') * 0.01
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

https://www.fmz.com/strategy/436101

> Last Modified

2023-12-21 11:39:37
