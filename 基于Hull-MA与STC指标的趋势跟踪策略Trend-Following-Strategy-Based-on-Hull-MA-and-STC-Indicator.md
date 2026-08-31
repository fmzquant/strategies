
> Name

基于Hull-MA与STC指标的趋势跟踪策略Trend-Following-Strategy-Based-on-Hull-MA-and-STC-Indicator

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy combines Hull MA smooth moving average and STC indicator to precisely track the trend. It goes long when Hull MA line turns green and STC indicator turns from red to green and is below 25; it goes short when Hull MA line turns red and STC indicator turns from green to red and is above 75. Meanwhile, the strategy also integrates UT Bot indicator to further confirm trend signals.

## Strategy Logic

The strategy uses Hull MA smooth moving average line to determine the price trend direction. The color change of Hull MA line from green to red or vice versa can be used to judge the trend reversal.

The STC indicator is similar to MACD indicator. Its indicator line can be used to determine bullish/bearish reversals. When the indicator line breaks above 25 from below, it's a buy signal; when it breaks below 75 from above, it's a sell signal.

By combining Hull MA and STC indicators, when both indicators concurrently generate buy/sell signals, it indicates a trend reversal for trade entry.

In addition, the strategy also incorporates the UT Bot indicator, which outputs bullish/bearish bias based on the price's relationship with the dynamic stop loss line based on ATR, to further confirm trend signals.

Specifically, the strategy logic is:

1. When Hull MA line turns green and STC indicator line turns from red to green, below 25, it's a long signal.

2. When Hull MA line turns red and STC indicator line turns from green to red, above 75, it's a short signal.

3. When above criteria are met, require UT Bot shows bullish to open long position. 

4. When above criteria are met, require UT Bot shows bearish to open short position.

## Advantage Analysis 

The strategy combines 3 indicators to determine the trend, which can improve the reliability of signals.

The smooth Hull MA curve can accurately determine the trend direction and avoid whipsaws. The STC indicator can capture trend reversal points to enhance the real-time performance of the strategy. UT Bot can further filter out false signals.

The combination of the 3 indicators enables precise trend tracking while enhancing stability. This is the biggest strength of the strategy.

## Risk Analysis

Main risks of the strategy:

1. STC indicator tends to generate false signals, causing unnecessary entries.

2. Incorrect Hull MA parameter settings may also misjudge the trend. 

3. Improper combination of the 3 indicators may interfere with each other.

Risks can be mitigated by optimizing Hull MA parameters, adjusting STC parameter mix, testing UT Bot parameters.

In addition, stop loss can be used to control single trade loss. More indicators can be introduced for combo verification to reduce false signal rates.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize Hull MA parameters to find the optimal length for the smooth curve to fit the trend better.

2. Adjust STC parameter mix to find more accurate combinations for detecting reversals.

3. Optimize UT Bot parameters to improve trend judgment accuracy. 

4. Test introducing other indicators for combo verification to further improve signal reliability.

5. Optimize stop loss strategy to keep profits while controlling single trade loss within acceptable range.

6. Optimize position sizing strategy for higher reward/risk ratios.

## Conclusion

The strategy precisely tracks the trend by combining Hull MA, STC and UT Bot indicators. It has the advantage of indicator diversity, which reduces misjudgment risks and enhances stability. The strategy can be further improved by continuously optimizing parameters, introducing other indicators, perfecting stop loss strategies etc.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Key Vaule. 'This changes the sensitivity'|
|v_input_2|6|ATR Period|
|v_input_3|false|Signals from Heikin Ashi Candles|
|v_input_4|false|░░░░░░░░░░░░░░░░░░░░░░░░░|
|v_input_5|80|Length|
|v_input_6|27|FastLength|
|v_input_7|50|SlowLength|
|v_input_8|0.5|AAA|
|v_input_9|false|░░░░░░░░░░░░░░░░░░░░░░░░░|
|v_input_10_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_1|0|Hull Variation: Hma|Thma|Ehma|
|v_input_11|55|Length(180-200 for floating S/R , 55 for swing entry)|
|v_input_12|true|Length multiplier (Used to view higher timeframes with straight band)|
|v_input_13|false|Show Hull MA from X timeframe? (good for scalping)|
|v_input_timeframe_1|240|Higher timeframe|
|v_input_14|true|Color Hull according to trend?|
|v_input_15|false|Color candles based on Hull's Trend?|
|v_input_16|true|Show as a Band?|
|v_input_17|true|Line Thickness|
|v_input_int_1|40|Band Transparency|
|v_input_bool_1|true|(?Date Range)Start|
|v_input_18|timestamp(1 Jan 2019)|startPeriodTime|
|v_input_bool_2|true|End|
|v_input_19|timestamp(31 Dec 2030)|endPeriodTime|
|v_input_string_2|0|(?Trade Direction)Trade Direction: Long and Short|Long Only|Short Only|
|v_input_float_1|100|(?Take Profit)Take Profit 1 - Target %|
|v_input_int_2|100|% Of Position|
|v_input_float_2|100|Take Profit 2 - Target %|
|v_input_int_3|100|% Of Position|
|v_input_float_3|100|Take Profit 3 - Target %|
|v_input_int_4|100|% Of Position|
|v_input_float_4|100|Take Profit 4 - Target %|
|v_input_float_5|15|(?Stop Loss)Stop Loss (%)|
|v_input_float_6|true|(?Leverage)Leverage|
|v_input_string_3|PV-AccountNameHere_Strategy-Name-Here|(?ProfitView Alert Syntax)Alert Syntax Prefix|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-10-06 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © myn

//@version=5
strategy('Strategy Myth-Busting #1 - UT Bot+STC+Hull+ [MYN]', max_bars_back=5000, overlay=true, pyramiding=0, initial_capital=20000, currency='USD', default_qty_type=strategy.percent_of_equity, default_qty_value=100.0, commission_value=0.075)




/////////////////////////////////////
//* Put your strategy logic below *//
/////////////////////////////////////
//2oVDibie_bk

/// UT Bot Alerts by QuantNomad - https://www.tradingview.com/script/n8ss8BID-UT-Bot-Alerts/
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//study(title="UT Bot Alerts", overlay = true)

// Inputs
a = input(2, title='Key Vaule. \'This changes the sensitivity\'')
c = input(6, title='ATR Period')
h = input(false, title='Signals from Heikin Ashi Candles')

xATR = ta.atr(c)
nLoss = a * xATR

src = h ? request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close, lookahead=barmerge.lookahead_off) : close

xATRTrailingStop = 0.0
iff_1 = src > nz(xATRTrailingStop[1], 0) ? src - nLoss : src + nLoss
iff_2 = src < nz(xATRTrailingStop[1], 0) and src[1] < nz(xATRTrailingStop[1], 0) ? math.min(nz(xATRTrailingStop[1]), src + nLoss) : iff_1
xATRTrailingStop := src > nz(xATRTrailingStop[1], 0) and src[1] > nz(xATRTrailingStop[1], 0) ? math.max(nz(xATRTrailingStop[1]), src - nLoss) : iff_2

pos = 0
iff_3 = src[1] > nz(xATRTrailingStop[1], 0) and src < nz(xATRTrailingStop[1], 0) ? -1 : nz(pos[1], 0)
pos := src[1] < nz(xATRTrailingStop[1], 0) and src > nz(xATRTrailingStop[1], 0) ? 1 : iff_3

xcolor = pos == -1 ? color.red : pos == 1 ? color.green : color.blue

ema = ta.ema(src, 1)
above = ta.crossover(ema, xATRTrailingStop)
below = ta.crossover(xATRTrailingStop, ema)

buy = src > xATRTrailingStop and above
sell = src < xATRTrailingStop and below

barbuy = src > xATRTrailingStop
barsell = src < xATRTrailingStop

//plotshape(buy,  title = "Buy",  text = 'Buy',  style = shape.labelup,   location = location.belowbar, color= color.green, textcolor = color.white, transp = 0, size = size.tiny)
//plotshape(sell, title = "Sell", text = 'Sell', style = shape.labeldown, location = location.abovebar, color= color.red,   textcolor = color.white, transp = 0, size = size.tiny)

barcolor(barbuy ? color.green : na)
barcolor(barsell ? color.red : na)

alertcondition(buy, 'UT Long', 'UT Long')
alertcondition(sell, 'UT Short', 'UT Short')

///////////////////////////////////////////////
//======[ Position Check (long/short) ]======//
///////////////////////////////////////////////

last_longCondition = float(na)
last_shortCondition = float(na)
last_longCondition := buy ? time : nz(last_longCondition[1])
last_shortCondition := sell ? time : nz(last_shortCondition[1])

in_longCondition = last_longCondition > last_shortCondition
in_shortCondition = last_shortCondition > last_longCondition


UTBotBuyZone = in_longCondition
UTBotSellZone = in_shortCondition



/// STC Indicator - A Better MACD [SHK] By shayankm - https://www.tradingview.com/script/WhRRThMI-STC-Indicator-A-Better-MACD-SHK/

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//[SHK] STC colored indicator
//https://www.tradingview.com/u/shayankm/

//indicator(title='[SHK] Schaff Trend Cycle (STC)', shorttitle='STC', overlay=false)
STCDivider = input(false, '░░░░░░░░░░░░░░░░░░░░░░░░░')
EEEEEE = input(80, 'Length')
BBBB = input(27, 'FastLength')
BBBBB = input(50, 'SlowLength')

AAAA(BBB, BBBB, BBBBB) =>
    fastMA = ta.ema(BBB, BBBB)
    slowMA = ta.ema(BBB, BBBBB)
    AAAA = fastMA - slowMA
    AAAA

AAAAA(EEEEEE, BBBB, BBBBB) =>
    AAA = input(0.5)
    var CCCCC = 0.0
    var DDD = 0.0
    var DDDDDD = 0.0
    var EEEEE = 0.0
    BBBBBB = AAAA(close, BBBB, BBBBB)
    CCC = ta.lowest(BBBBBB, EEEEEE)
    CCCC = ta.highest(BBBBBB, EEEEEE) - CCC
    CCCCC := CCCC > 0 ? (BBBBBB - CCC) / CCCC * 100 : nz(CCCCC[1])
    DDD := na(DDD[1]) ? CCCCC : DDD[1] + AAA * (CCCCC - DDD[1])
    DDDD = ta.lowest(DDD, EEEEEE)
    DDDDD = ta.highest(DDD, EEEEEE) - DDDD
    DDDDDD := DDDDD > 0 ? (DDD - DDDD) / DDDDD * 100 : nz(DDDDDD[1])
    EEEEE := na(EEEEE[1]) ? DDDDDD : EEEEE[1] + AAA * (DDDDDD - EEEEE[1])
    EEEEE

mAAAAA = AAAAA(EEEEEE, BBBB, BBBBB)
mColor = mAAAAA > mAAAAA[1] ? color.new(color.green, 20) : color.new(color.red, 20)



if mAAAAA[3] <= mAAAAA[2] and mAAAAA[2] > mAAAAA[1] and mAAAAA > 75
    alert('Red', alert.freq_once_per_bar)
if mAAAAA[3] >= mAAAAA[2] and mAAAAA[2] < mAAAAA[1] and mAAAAA < 25
    alert('Green', alert.freq_once_per_bar)


//plot(mAAAAA, color=mColor, title='STC', linewidth=2)

//ul = plot(25, color=color.new(color.white, 0 ))
//ll = plot(75, color=color.new(color.purple, 0))
//fill(ul, ll, color=color.new(color.gray, 96))

STCGreenAndBelow25AndRising = mAAAAA > mAAAAA[1] and mAAAAA < 25
STCRedAndAndAbove75AndFalling = mAAAAA < mAAAAA[1] and mAAAAA > 75

/// Hull Suite by InSilico
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//Basic Hull Ma Pack tinkered by InSilico - https://www.tradingview.com/script/hg92pFwS-Hull-Suite/
//study("Hull Suite by InSilico", overlay=true)

HullDivider = input(false, '░░░░░░░░░░░░░░░░░░░░░░░░░')
//INPUT
srcHull = input(close, title='Source')
modeSwitch = input.string('Hma', title='Hull Variation', options=['Hma', 'Thma', 'Ehma'])
length = input(55, title='Length(180-200 for floating S/R , 55 for swing entry)')
lengthMult = input(1.0, title='Length multiplier (Used to view higher timeframes with straight band)')

useHtf = input(false, title='Show Hull MA from X timeframe? (good for scalping)')
htf = input.timeframe('240', title='Higher timeframe')

switchColor = input(true, 'Color Hull according to trend?')
candleCol = input(false, title='Color candles based on Hull\'s Trend?')
visualSwitch = input(true, title='Show as a Band?')
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
_hull = Mode(modeSwitch, srcHull, int(length * lengthMult))
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

HullGreen = hullColor == #00ff00
HullRed = hullColor == #ff0000

//////////////////////////////////////
//* Put your strategy rules below *//
/////////////////////////////////////



longCondition = STCGreenAndBelow25AndRising and HullGreen and UTBotBuyZone
shortCondition = STCRedAndAndAbove75AndFalling and HullRed and UTBotSellZone

//define as 0 if do not want to use
closeLongCondition = 0
closeShortCondition = 0


//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
useStartPeriodTime = input.bool(true, 'Start', group='Date Range', inline='Start Period')
startPeriodTime = input(timestamp('1 Jan 2019'), '', group='Date Range', inline='Start Period')
useEndPeriodTime = input.bool(true, 'End', group='Date Range', inline='End Period')
endPeriodTime = input(timestamp('31 Dec 2030'), '', group='Date Range', inline='End Period')

start = useStartPeriodTime ? startPeriodTime >= time : false
end = useEndPeriodTime ? endPeriodTime <= time : false
calcPeriod = not start and not end

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
stoplossPercent = input.float(title='Stop Loss (%)', defval=15, minval=0.01, group='Stop Loss') * 0.01
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

alertSyntaxPrefix = input.string(defval='PV-AccountNameHere_Strategy-Name-Here', title='Alert Syntax Prefix', group='ProfitView Alert Syntax')
alertSyntaxBase = alertSyntaxPrefix + '\n#' + str.tostring(open) + ',' + str.tostring(high) + ',' + str.tostring(low) + ',' + str.tostring(close) + ',' + str.tostring(volume) + ','


/// Trade Execution
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

if calcPeriod
    if longCondition and tradeDirection != 'Short Only' and isInLongPosition == false
        strategy.entry('Long', strategy.long, qty=contracts)

        alert(message=alertSyntaxBase + 'side:long', freq=alert.freq_once_per_bar_close)

    if shortCondition and tradeDirection != 'Long Only' and isInShortPosition == false
        strategy.entry('Short', strategy.short, qty=contracts)

        alert(message=alertSyntaxBase + 'side:short', freq=alert.freq_once_per_bar_close)
    //Inspired by Multiple %% profit exits example By adolgo https://www.tradingview.com/script/kHhCik9f-Multiple-profit-exits-example/
    strategy.exit('TP1', qty_percent=q1, profit=per(tp1))
    strategy.exit('TP2', qty_percent=q2, profit=per(tp2))
    strategy.exit('TP3', qty_percent=q3, profit=per(tp3))
    strategy.exit('TP4', profit=per(tp4))

    strategy.close('Long', qty_percent=100, comment='SL Long', when=slLongClose)
    strategy.close('Short', qty_percent=100, comment='SL Short', when=slShortClose)

    strategy.close_all(when=closeLongCondition or closeShortCondition, comment='Close Postion')


```

> Detail

https://www.fmz.com/strategy/428580

> Last Modified

2023-10-07 10:20:06
