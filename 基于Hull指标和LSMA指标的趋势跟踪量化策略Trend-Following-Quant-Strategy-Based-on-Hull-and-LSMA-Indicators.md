
> Name

基于Hull指标和LSMA指标的趋势跟踪量化策略Trend-Following-Quant-Strategy-Based-on-Hull-and-LSMA-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/129e281b8eacb15d51f.png)
[trans]
## 概述

该策略通过结合Hull指标和LSMA(最小二乘移动平均线)指标来识别趋势方向和趋势反转点,实现对趋势的跟踪。当Hull指标显示上升趋势而LSMA上穿Hull指标时做多;当Hull指标显示下降趋势而LSMA下穿Hull指标时做空。该策略适用于中低频交易,可在1分钟时间框架使用。

## 策略原理

- Hull指标用于判断价值的趋势方向。当中轨线(MHULL)在下轨线(LHULL)之上时,表示上升趋势;反之则表示下降趋势。

- LSMA指标用于识别趋势反转点。当LSMA指标上穿MHULL时,表示上升趋势形成或加速;当LSMA指标下穿MHULL时,表示下降趋势形成或加速。  

- 结合两者,当Hull指标显示上升趋势(MHULL > LHULL)且LSMA上穿MHULL时,做多;当Hull指标显示下降趋势(MHULL < LHULL)且LSMA下穿MHULL时,做空。

- 止损设置为最近的波动点。做多止损为最近最低点,做空止损为最近最高点。

## 优势分析

该策略具有以下优势:

1. Hull指标反应迅速,能及时捕捉趋势转换;LSMA平滑性强,识别反转信号准确可靠。两者组合使用效果好。

2. 通过LSMA的穿越来过滤Hull指标判断的假信号,降低了错误交易的概率。

3. 采用波动点作为止损位,最大程度保护了资金安全。

4. 适用于中低频交易,可在1分钟甚至更低的时间框架使用,适用性广。

## 风险分析

该策略也存在一些风险:  

1. 在震荡行情中,Hull指标和LSMA可能出现多次交叉造成交易过于频繁。应适当调整参数以降低交易频率。

2. 止损设置为波动点可能会因短期价格调整触发,应适当加宽止损位间距。  

3. 因LSMA指标滞后性,可能略有误判的风险。应结合其他指标如K线形态来确认。


## 优化方向  

该策略可从以下几个方面进行优化:

1. 优化Hull指标和LSMA的参数,使其组合更匹配不同品种和时间周期。

2. 增加基于波动率、交易量等的过滤条件,避免震荡行情下的错误交易。  

3. 增加机器学习算法判断趋势倾向的辅助判断。

4. 结合深度学习等技术判断关键支撑阻力区域,使止损更加合理。

## 总结

该策略通过Hull指标和LSMA的组合应用,对趋势方向变化进行判断,实施趋势跟踪交易。优点是操作简单,响应迅速,可广泛适用于中低频量化交易。通过进一步优化过滤条件、辅助判断和止损算法等,可望获得更好的策略效果。

||

## Overview

This strategy identifies trend directions and reversal points by combining the Hull and LSMA (Least Squares Moving Average) indicators to track trends. It goes long when the Hull shows an uptrend and the LSMA crosses above the Hull, and goes short when the Hull shows a downtrend and the LSMA crosses below the Hull. The strategy is suitable for medium-low frequency trading and can be used on the 1-minute timeframe.

## Strategy Logic

- The Hull indicator is used to determine the trend direction of the price. When the middle band (MHULL) is above the lower band (LHULL), it indicates an uptrend; otherwise it indicates a downtrend.

- The LSMA indicator is used to identify reversal points of the trend. When the LSMA crosses above MHULL, it signals the formation or acceleration of an uptrend; when the LSMA crosses below MHULL, it signals the formation or acceleration of a downtrend.

- By combining the two, the strategy goes long when Hull shows an uptrend (MHULL > LHULL) and LSMA crosses above MHULL, and goes short when Hull shows a downtrend (MHULL < LHULL) and LSMA crosses below MHULL.  

- The stop loss is set to the latest fluctuation point. For long positions it is the most recent swing low, and for short positions it is the most recent swing high.

## Advantage Analysis 

The main advantages of this strategy are:

1. The Hull indicator is responsive in capturing trend transitions, while the LSMA is smooth in identifying reversal signals reliably. The combination works effectively.

2. Using LSMA crossings filters out false signals from the Hull indicator and reduces erroneous trades.  

3. The use of fluctuation points for stop loss protects funds to the maximum extent.

4. It is suitable for medium-low frequency trading and can be used on timeframes as low as 1-minute, with wide applicability.

## Risk Analysis

There are also some risks with this strategy:

1. In ranging markets, there may be excessive crossovers between Hull and LSMA causing over-trading. Parameters should be tuned appropriately to reduce trading frequency.

2. Stop loss set to fluctuation points may be triggered by short-term price adjustments. The distance should be widened appropriately. 

3. There may be some risk of misjudgment due to lagging of LSMA. Other indicators like candlestick patterns should be used to confirm signals.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize parameters of Hull and LSMA to match different products and timeframes.  

2. Add filters based on volatility, volume etc. to avoid erroneous trades in ranging markets.

3. Incorporate machine learning models to aid in judging trend tendencies.  

4. Identify key support/resistance areas with deep learning techniques for more reasonable stop loss placement.

## Conclusion

By combining Hull and LSMA, this strategy effectively judges trend direction changes for trend following trading. It has the advantage of being simple to implement, responsive and widely applicable to medium-low frequency algo trading. Further improvements in filtering conditions, auxiliary judgements and stop loss algorithms can potentially yield better strategy performance.


[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_2|false|Offset|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_1|0|Hull Variation: Hma|Thma|Ehma|
|v_input_5|55|Length(180-200 for floating S/R , 55 for swing entry)|
|v_input_6|true|Length multiplier (Used to view higher timeframes with straight band)|
|v_input_7|false|Show Hull MA from X timeframe? (good for scalping)|
|v_input_timeframe_1|240|Higher timeframe|
|v_input_8|true|Color Hull according to trend?|
|v_input_9|false|Color candles based on Hull's Trend?|
|v_input_10|false|Show as a Band?|
|v_input_11|true|Line Thickness|
|v_input_int_1|40|Band Transparency|
|v_input_1|25|(?Least Squares Moving Average LSMA)Length|
|v_input_4_close|0|(?Hull Suite)Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_1|false|(?ADX)Average Directional Index (ADX)|
|v_input_12|14|ADX Smoothing|
|v_input_13|14|DI Length|
|v_input_14|25|ADX Threshold|
|v_input_bool_2|true|(?Date Range)Start|
|v_input_15|timestamp(1 Jan 2019)|startPeriodTime|
|v_input_bool_3|true|End|
|v_input_16|timestamp(31 Dec 2030)|endPeriodTime|
|v_input_string_2|0|(?Trade Direction)Trade Direction: Long and Short|Long Only|Short Only|
|v_input_float_1|100|(?Take Profit)Take Profit 1 - Target %|
|v_input_int_2|100|% Of Position|
|v_input_float_2|100|Take Profit 2 - Target %|
|v_input_int_3|100|% Of Position|
|v_input_float_3|100|Take Profit 3 - Target %|
|v_input_int_4|100|% Of Position|
|v_input_float_4|100|Take Profit 4 - Target %|
|v_input_float_5|999|(?Stop Loss)Stop Loss (%)|
|v_input_float_6|true|(?Leverage)Leverage|
|v_input_string_3|CRYPTANEX_99FTX_Strategy-Name-Here|(?ProfitView Alert Syntax)Alert Syntax Prefix|
|v_input_bool_4|false|(?Dashboard)Show Dashboard|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-28 00:00:00
end: 2024-02-04 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © myn

//@version=5
strategy('Strategy Myth-Busting #9 - HullSuite+LSMA - [MYN]', max_bars_back=5000, overlay=true, pyramiding=0, initial_capital=1000, currency='USD', default_qty_type=strategy.percent_of_equity, default_qty_value=1.0, commission_value=0.075, use_bar_magnifier = false)

// Hull Suite by InSilico
// Least Squares Moving Average

// Long 
// Hull Suite is red and LSMA crosses above HUll Suite while red
// Stop loss latest swing low

//Short
// Hull Suite is green and LSMA crosses under HUll Suite while green
// Stop loss latest swing high

//1:4 Risk ratio
// 1 minute timeframe


/////////////////////////////////////
//* Put your strategy logic below *//
/////////////////////////////////////
//72iE0gCVjvM


// LSMA
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

//@version=5
//indicator(title = "Least Squares Moving Average", shorttitle="LSMA", overlay=true, timeframe="", timeframe_gaps=true)
length1 = input(title="Length", defval=25, group="Least Squares Moving Average (LSMA)")
offset1 = input(title="Offset", defval=0)
src1 = input(close, title="Source")
lsma = ta.linreg(src1, length1, offset1)
plot(lsma, color=color.white)



// Hull Suite by InSilico
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

//@version=5
//Basic Hull Ma Pack tinkered by InSilico 
//indicator('Hull Suite by InSilico', overlay=true)

//INPUT
src = input(close, title='Source', group="Hull Suite")
modeSwitch = input.string('Hma', title='Hull Variation', options=['Hma', 'Thma', 'Ehma'])
length = input(55, title='Length(180-200 for floating S/R , 55 for swing entry)')
lengthMult = input(1.0, title='Length multiplier (Used to view higher timeframes with straight band)')

useHtf = input(false, title='Show Hull MA from X timeframe? (good for scalping)')
htf = input.timeframe('240', title='Higher timeframe')

switchColor = input(true, 'Color Hull according to trend?')
candleCol = input(false, title='Color candles based on Hull\'s Trend?')
visualSwitch = input(false, title='Show as a Band?')
thicknesSwitch = input(1, title='Line Thickness')
transpSwitch = input.int(40, title='Band Transparency', step=5)

//FUNCTIONS
//HMA
HMA(_src, _length) =>
    ta.wma(2 * ta.wma(_src, _length / 2) - ta.wma(_src, _length), math.round(math.sqrt(_length)))
//EHMA    
EHMA(_src, _length) =>
    ta.ema(2 * ta.ema(_src, _length / 2) - ta.ema(_src, _length), math.round(math.sqrt(_length)))
//THMA    
THMA(_src, _length) =>
    ta.wma(ta.wma(_src, _length / 3) * 3 - ta.wma(_src, _length / 2) - ta.wma(_src, _length), _length)

//SWITCH
Mode(modeSwitch, src, len) =>
    modeSwitch == 'Hma' ? HMA(src, len) : modeSwitch == 'Ehma' ? EHMA(src, len) : modeSwitch == 'Thma' ? THMA(src, len / 2) : na

//OUT
_hull = Mode(modeSwitch, src, int(length * lengthMult))
HULL = useHtf ? request.security(syminfo.ticker, htf, _hull) : _hull
MHULL = HULL[0]
SHULL = HULL[2]

//COLOR
hullColor = switchColor ? HULL > HULL[2] ? #00ff00 : #ff0000 : #ff9800

//PLOT
///< Frame
Fi1 = plot(MHULL, title='MHULL', color=hullColor, linewidth=thicknesSwitch, transp=50)
Fi2 = plot(visualSwitch ? SHULL : na, title='SHULL', color=hullColor, linewidth=thicknesSwitch, transp=50)
alertcondition(ta.crossover(MHULL, SHULL), title='Hull trending up.', message='Hull trending up.')
alertcondition(ta.crossover(SHULL, MHULL), title='Hull trending down.', message='Hull trending down.')
///< Ending Filler
fill(Fi1, Fi2, title='Band Filler', color=hullColor, transp=transpSwitch)
///BARCOLOR
barcolor(color=candleCol ? switchColor ? hullColor : na : na)




// Long 
// Hull Suite is red and LSMA crosses above HUll Suite while red
// Stop loss latest swing low

//Short
// Hull Suite is green and LSMA crosses under HUll Suite while green
// Stop loss latest swing high

//1:4 Risk ratio
longEntry = hullColor == #ff0000 and ta.crossover(lsma, MHULL )
shortEntry = hullColor == #00ff00 and ta.crossunder(lsma, MHULL)

//////////////////////////////////////
//* Put your strategy rules below *//
/////////////////////////////////////

longCondition = longEntry
shortCondition = shortEntry

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

https://www.fmz.com/strategy/441063

> Last Modified

2024-02-05 11:58:17
