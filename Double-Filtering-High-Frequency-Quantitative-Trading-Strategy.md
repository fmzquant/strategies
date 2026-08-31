
> Name

Double-Filtering-High-Frequency-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/173883084fc3fd124c3.png)


## Overview

The strategy is named "Double Filtering Quant", which adopts multi-timeframe techniques to implement a high-frequency quantitative trading strategy based on double filtering ideas. The strategy uses indicators on different timeframes to make judgments and implement more rigorous trading signal filtering to filter out a large number of false signals, thereby obtaining higher win rates.

## Strategy Principle 

The core principle of the strategy is:

1. Use weekly and daily lines to judge the market trend direction as the strategy direction filter condition. Only trades that meet the trend conditions can be made.

2. Construct the channel at the 4-hour level to determine selling and buying points and issue trading signals. 

3. The consistency of directions judged by weekly, daily, and 4-hour timeframes can filter out a lot of false signals and improve the reliability of trading signals.

4. Use Fibonacci retracement points to determine profit-taking and stop-loss positions for rapid profit-taking and stopping losses.

Specifically, the strategy first judges the priority direction of the trend on the weekly and daily lines. The principle of judging the priority direction is: if the closing price of the current K-line is on the side with a larger lag angle on the cycle line, it is determined as the direction of the cycle line. Then, construct the A B C D channel at the 4-hour level, and determine buy and sell points through the channel direction and turning points to issue trading signals. Finally, the priority direction determined by the current cycle line must be consistent with the direction of the trading signal at the 4-hour level. This can filter out many false signals and improve the reliability of trading signals.

## Strategy Advantages

The main advantages of this strategy are:

1. The dual signal filtering mechanism based on multiple timeframes can filter out a lot of noise and obtain highly reliable trading opportunities.

2. The use of channels to construct buying and selling points makes trading signals clear.

3. Fibonacci retracement points are used to set profit-taking and stop-loss positions for fast profit-taking and stopping losses. 

4. The strategy has few parameters and is easy to understand and master.

5. Good scalability for easy optimization and improvement.

## Strategy Risks

The main risks of this strategy are:

1. Monitoring too many timeframes increases complexity and prone to errors.

2. Does not consider sudden events of special market conditions, such as drastic market fluctuations caused by major news events.  

3. There is a possibility of insufficient profit setting stop-loss and profit-taking points using retracement. 

4. Improper parameter settings may lead to over-trading or missing orders.

Countermeasures:

1. Strengthen monitoring of anomalies and major news events.  

2. Optimize stop-loss and profit-taking logic to ensure profits reach a certain level.

3. Detailed testing and optimization of parameters to reduce the probability of over-trading and missing orders.

## Strategy Optimization Directions

The main optimization directions of this strategy are:

1. Increase the possibility of using machine learning models to determine the priority direction of trends, and use more data to improve judgment accuracy.

2. Test other indicators to construct channels and determine buying and selling points.  

3. Try more advanced ways of profit-taking and stop-loss, such as moving profit-taking, jumping profit-taking, etc.

4. Derive optimal parameters from backtesting results to make parameter settings more in line with quantitative investment principles. 

5. Increase monitoring and response mechanisms for major sudden events.

## Conclusion 

In general, the core idea of ​​this strategy is a high-frequency quantitative trading strategy based on double filtering to reduce noise. It uses multi-timeframe judgment and channel determination of buying and selling points to achieve double reliability filtering of trading signals. At the same time, the strategy has few parameters and is easy to master; scalability is good and easy to optimize and improve. Next, optimization will be carried out from aspects such as judgment accuracy, profit-taking and stop-loss methods, and parameter optimization to make the strategy work better.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Торговля в Лонг|
|v_input_2|true|Торговля в Шорт|
|v_input_3|true|Включить SMA89|
|v_input_4|false|Сигнал в серой зоне|
|v_input_int_1|false|Пунктов добавить для Buy ордера|
|v_input_int_2|false|Пунктов добавить для Sell ордера|
|v_input_float_1|0.01|Контрактов на сделку:|
|v_input_int_3|2|ТФ Пивота старше на:|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-11-26 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title='AG328', shorttitle='AG328', overlay=true )

// Настройки для включения/выключения торговли в Лонг и Шорт
longEnabled = input(true, title="Торговля в Лонг")
shortEnabled = input(true, title="Торговля в Шорт")

smaEnabled = input(true, title="Включить SMA89")
tradeInGrey = input(false, title = "Сигнал в серой зоне")

pipsBuyStop = input.int(0, title="Пунктов добавить для Buy ордера", minval=-50, step=1, maxval=50)
pipsSellStop = input.int(0, title="Пунктов добавить для Sell ордера", minval=-50, step=1, maxval=50)

// Const
LicenseID = 6889430941909
contracts = input.float(0.01, title="Контрактов на сделку:", minval=0, step=0.01, maxval=10)

var float sma = na

var float UW = na
var float DW = na
var bool weeklyLongPriority = na
var bool weeklyShortPriority = na

var float UD = na
var float DD = na
var bool dailyLongPriority = na
var bool dailyShortPriority = na

var float UP = na
var float DOWN = na
var bool h4LongPriority = na
var bool h4ShortPriority = na

var bool LongCondition = na
var bool ShortCondition = na

var bool GreenZone = na
var bool GreyZone = na
var bool RedZone = na

var float LongOrder = 0
var float ShortOrder = 0

var float LongTP = 0
var float ShortTP = 0

var float LongTake = 0
var float ShortTake = 0

var float AA = 0
var float BB = 0
var float CC = 0
var float D = 0

var float AAA = 0
var float BBB = 0
var float CCC = 0
var float DDD = 0

var float stopLong = 0
var float stopShort = 0

var string olderTF = ""
var string oldestTF = ""
var string pivotTF = ""

// Создаем входную настройку для ТФ Пивота
maxValuePivotTF = input.int(2, title="ТФ Пивота старше на:", minval=1, step=1, maxval=3)

// Шаг цены инструмента
stepSize = syminfo.mintick
currentTF = timeframe.period   // Получаем текущий ТФ

if currentTF == "1"                    // Определяем 2 более старших ТФ
    olderTF := "5"
    oldestTF := "15"
    pivotTF := (maxValuePivotTF == 1 ? "5" : (maxValuePivotTF == 2 ? "15" : "60"))
if currentTF == "5"
    olderTF := "15"
    oldestTF := "60"
    pivotTF := (maxValuePivotTF == 1 ? "15" : (maxValuePivotTF == 2 ? "60" : "240"))
if currentTF == "15"
    olderTF := "60"
    oldestTF := "240"
    pivotTF := (maxValuePivotTF == 1 ? "60" : (maxValuePivotTF == 2 ? "240" : "D"))
if currentTF == "60"
    olderTF := "240"
    oldestTF := "D"
    pivotTF := (maxValuePivotTF == 1 ? "240" : (maxValuePivotTF == 2 ? "D" : "W"))
if currentTF == "240"
    olderTF := "D"
    oldestTF := "W"
    pivotTF := (maxValuePivotTF == 1 ? "D" : (maxValuePivotTF == 2 ? "W" : "M"))
if currentTF == "D"
    olderTF := "W"
    oldestTF := "M"
    pivotTF := (maxValuePivotTF == 1 ? "W" : (maxValuePivotTF == 2 ? "M" : "3M"))
if currentTF == "W"
    olderTF := "M"
    oldestTF := "3M"
    pivotTF := (maxValuePivotTF == 1 ? "M" : (maxValuePivotTF == 2 ? "3M" : "3M"))
// Рассчитываем бары ТФ+2
weekHigh0 = request.security(syminfo.tickerid, oldestTF, high)
weekHigh1 = request.security(syminfo.tickerid, oldestTF, high[1])
weekHigh2 = request.security(syminfo.tickerid, oldestTF, high[2])
weekHigh3 = request.security(syminfo.tickerid, oldestTF, high[3])
weekHigh4 = request.security(syminfo.tickerid, oldestTF, high[4])

weekLow0 = request.security(syminfo.tickerid, oldestTF, low)
weekLow1 = request.security(syminfo.tickerid, oldestTF, low[1])
weekLow2 = request.security(syminfo.tickerid, oldestTF, low[2])
weekLow3 = request.security(syminfo.tickerid, oldestTF, low[3])
weekLow4 = request.security(syminfo.tickerid, oldestTF, low[4])

// ТФ+2 Фракталы
weekFractal_UP = weekHigh2 > weekHigh1 and weekHigh2 > weekHigh0 and weekHigh2 > weekHigh3 and weekHigh2 > weekHigh4
weekFractal_DOWN = weekLow2 < weekLow1 and weekLow2 < weekLow0 and weekLow2 < weekLow3 and weekLow2 < weekLow4

if weekFractal_UP
    UW := weekHigh2
    UW
if weekFractal_DOWN
    DW := weekLow2
    DW
// Рисуем UW, DW
plot(UW, title = "UW", color=color.green)
plot(DW, title = "DW", color=color.red)

// ТФ+2 priority
if close > UW
    weeklyLongPriority := true
    weeklyLongPriority
else if close < DW
    weeklyLongPriority := false
    weeklyLongPriority
//weeklyColor = weeklyLongPriority ? color.new(color.green, transp=70) : color.new(color.red, transp=70)
//bgcolor(weeklyColor, title = "WeeklyPriority")

//-----------------------------------------------
// Рассчитываем дневные бары

dayHigh0 = request.security(syminfo.tickerid, olderTF, high)
dayHigh1 = request.security(syminfo.tickerid, olderTF, high[1])
dayHigh2 = request.security(syminfo.tickerid, olderTF, high[2])
dayHigh3 = request.security(syminfo.tickerid, olderTF, high[3])
dayHigh4 = request.security(syminfo.tickerid, olderTF, high[4])

dayLow0 = request.security(syminfo.tickerid, olderTF, low)
dayLow1 = request.security(syminfo.tickerid, olderTF, low[1])
dayLow2 = request.security(syminfo.tickerid, olderTF, low[2])
dayLow3 = request.security(syminfo.tickerid, olderTF, low[3])
dayLow4 = request.security(syminfo.tickerid, olderTF, low[4])

// Дневные Фракталы
dayFractal_UP = dayHigh2 > dayHigh1 and dayHigh2 > dayHigh0 and dayHigh2 > dayHigh3 and dayHigh2 > dayHigh4
dayFractal_DOWN = dayLow2 < dayLow1 and dayLow2 < dayLow0 and dayLow2 < dayLow3 and dayLow2 < dayLow4

if dayFractal_UP
    UD := dayHigh2
    UD
if dayFractal_DOWN
    DD := dayLow2
    DD
// Рисуем UD, DD
//plot(UD, title = "UD", color=color.green)
//plot(DD, title = "DD", color=color.red)

// Daily priority
if close > UD
    dailyLongPriority := true
    dailyLongPriority
else if close < DD
    dailyLongPriority := false
    dailyLongPriority
//dailyColor = dailyLongPriority ? color.new(color.green, transp=70) : color.new(color.red, transp=70)
//bgcolor(dailyColor, title = "DailyPriority")

//-----------------------------------------------
// Рассчитываем 4-часовые бары

h4High0 = request.security(syminfo.tickerid, currentTF, high)
h4High1 = request.security(syminfo.tickerid, currentTF, high[1])
h4High2 = request.security(syminfo.tickerid, currentTF, high[2])
h4High3 = request.security(syminfo.tickerid, currentTF, high[3])
h4High4 = request.security(syminfo.tickerid, currentTF, high[4])

h4Low0 = request.security(syminfo.tickerid, currentTF, low)
h4Low1 = request.security(syminfo.tickerid, currentTF, low[1])
h4Low2 = request.security(syminfo.tickerid, currentTF, low[2])
h4Low3 = request.security(syminfo.tickerid, currentTF, low[3])
h4Low4 = request.security(syminfo.tickerid, currentTF, low[4])

// H4 Фракталы
h4Fractal_UP = h4High2 > h4High1 and h4High2 > h4High0 and h4High2 > h4High3 and h4High2 > h4High4
h4Fractal_DOWN = h4Low2 < h4Low1 and h4Low2 < h4Low0 and h4Low2 < h4Low3 and h4Low2 < h4Low4

if h4Fractal_UP
    UP := h4High2
    UP
if h4Fractal_DOWN
    DOWN := h4Low2
    DOWN
// Рисуем UP, DOWN
plot(UP, title='UP', color=color.new(color.green, 0))
plot(DOWN, title='DOWN', color=color.new(color.red, 0))

// SMA89
sma89 = ta.sma(close, 89)
plot(smaEnabled ? sma89 : na, title='sma89', color=color.new(color.white, transp=10))
//smaColor = close > sma89 ? color.new(color.green, transp=70) : color.new(color.red, transp=70)
//bgcolor(smaColor, title = "smaPriority")

// Condition
LongCondition := weeklyLongPriority and dailyLongPriority and (smaEnabled ? close > sma89 : true)
ShortCondition := weeklyLongPriority == false and dailyLongPriority == false and (smaEnabled ? close < sma89 : true)
ConditionColor = LongCondition ? color.new(color.green, transp=85) : ShortCondition ? color.new(color.red, transp=85) : color.new(color.gray, transp=85)
bgcolor(ConditionColor, title='Condition')

// LOGIC LONG

if AA == 0 and h4Fractal_UP
    AA := UP
if (AA[1] != 0 and BB == 0 and h4Fractal_DOWN) or (AA[1] != 0 and BB != 0 and D == 2 and h4Fractal_DOWN)
    BB := DOWN
    D := 1
if BB != 0 and D == 1 and ta.crossunder(low, BB)
    D := 2
if AA != 0 and BB != 0
    if D == 2 and (D[1] == 1 or D[2] == 1 or D[3] == 1) and h4Fractal_UP
        CC := UP
    else if D == 1 and h4Fractal_UP
        CC := UP
if (AA != 0 and high > AA) or (LongOrder != 0 and high > LongOrder + pipsBuyStop * stepSize) or (tradeInGrey ? ShortCondition : not LongCondition)
    AA := 0
    BB := 0
    CC := 0
    D := 0
//
//plot(AA != 0 ? AA : na, title='A', color=color.new(color.white, transp=10), linewidth=2, style=plot.style_linebr)
//plot(BB != 0 ? BB : na, title='B', color=color.new(color.gray, transp=10), linewidth=2, style=plot.style_linebr)
//plot(CC != 0 ? CC : na, title='C', color=color.new(color.blue, transp=10), linewidth=2, style=plot.style_linebr)
//plot(D != 0 ? D : na, title='D', color=color.new(color.green, transp=80), linewidth=2, style=plot.style_linebr)

// LOGIC SHORT
if AAA == 0 and h4Fractal_DOWN
    AAA := DOWN
if (AAA[1] != 0 and BBB == 0 and h4Fractal_UP) or (AAA[1] != 0 and BBB[1] != 0 and DDD == 2 and h4Fractal_UP)
    BBB := UP
    DDD := 1
if BBB != 0 and DDD == 1 and ta.crossover(high, BBB)
    DDD := 2
if AAA != 0 and BBB != 0
    if DDD == 2 and (DDD[1] == 1 or DDD[2] == 1 or DDD[3] == 1) and h4Fractal_DOWN
        CCC := DOWN
    else if DDD == 1 and h4Fractal_DOWN
        CCC := DOWN
if (AAA != 0 and low < AAA) or (ShortOrder != 0 and low < ShortOrder - pipsSellStop * stepSize) or (tradeInGrey ? LongCondition : not ShortCondition)
    AAA := 0
    BBB := 0
    CCC := 0
    DDD := 0
//
//plot(AAA != 0 ? AAA : na, title='ShortA', color=color.new(color.white, transp=10), linewidth=2, style=plot.style_linebr)
//plot(BBB != 0 ? BBB : na, title='ShortB', color=color.new(color.gray, transp=10), linewidth=2, style=plot.style_linebr)
//plot(CCC != 0 ? CCC : na, title='ShortC', color=color.new(color.blue, transp=10), linewidth=2, style=plot.style_linebr)
//plot(DDD != 0 ? DDD : na, title='ShortD', color=color.new(color.green, transp=80), linewidth=2, style=plot.style_linebr)


// LongOrder
if (tradeInGrey ? not ShortCondition : LongCondition) and CC != 0 and D == 2 and strategy.position_size[1] == 0 and longEnabled
    LongOrder := CC
    LongOrder
else if (tradeInGrey ? ShortCondition : not LongCondition) or strategy.position_size[1] > 0 or (LongOrder != 0 and high > LongOrder + pipsBuyStop * stepSize)
    LongOrder := 0
    LongOrder
plot(LongOrder != 0 ? LongOrder : na, title='LongOrder', color=color.new(color.yellow, transp=10), linewidth=2, style=plot.style_linebr)

// ShortOrder
if (tradeInGrey ? not LongCondition : ShortCondition) and CCC != 0 and DDD == 2 and strategy.position_size[1] == 0 and shortEnabled
    ShortOrder := CCC
    ShortOrder
else if (tradeInGrey ? LongCondition : not ShortCondition) or strategy.position_size[1] < 0 or (ShortOrder != 0 and low < ShortOrder - pipsSellStop * stepSize)
    ShortOrder := 0
    ShortOrder
plot(ShortOrder != 0 ? ShortOrder : na, title='ShortOrder', color=color.new(color.orange, transp=10), linewidth=2, style=plot.style_linebr)

// Fibo Pivots
H = request.security(syminfo.tickerid, pivotTF, high[1])
L = request.security(syminfo.tickerid, pivotTF, low[1])
C = request.security(syminfo.tickerid, pivotTF, close[1])

PP = (H + L + C) / 3
R3 = PP + 1.000 * (H - L)
R2 = PP + 0.618 * (H - L)
R1 = PP + 0.382 * (H - L)
S1 = PP - 0.382 * (H - L)
S2 = PP - 0.618 * (H - L)
S3 = PP - 1.000 * (H - L)

//plot(PP)
//plot(R3)
//plot(R2)
//plot(R1)
//plot(S1)
//plot(S2)
//plot(S3)

// Расчет цены Лонг Тейка
if S3 - LongOrder > LongOrder - DOWN
    LongTP := S3
    LongTP
else if S2 - LongOrder > LongOrder - DOWN
    LongTP := S2
    LongTP
else if S1 - LongOrder > LongOrder - DOWN
    LongTP := S1
    LongTP
else if PP - LongOrder > LongOrder - DOWN
    LongTP := PP
    LongTP
else if R1 - LongOrder > LongOrder - DOWN
    LongTP := R1
    LongTP
else if R2 - LongOrder > LongOrder - DOWN
    LongTP := R2
    LongTP
else if R3 - LongOrder > LongOrder - DOWN
    LongTP := R3
    LongTP
else
    LongTP := 0
    LongTP
//
//plot(LongTake)

if strategy.position_size == 0
    if LongTP == 0 and LongOrder != 0
        LongTake := LongOrder + LongOrder - DOWN
        LongTake
    else
        LongTake := LongTP
        LongTake

plot(series=strategy.position_size > 0 ? LongTake : na, title='LongTake', color=color.new(color.rgb(99, 253, 104), transp=0), linewidth=1, style=plot.style_linebr)

// Расчет цены Шорт Тейка
if ShortOrder - R3 > UP - ShortOrder
    ShortTP := R3
    ShortTP
else if ShortOrder - R2 > UP - ShortOrder
    ShortTP := R2
    ShortTP
else if ShortOrder - R1 > UP - ShortOrder
    ShortTP := R1
    ShortTP
else if ShortOrder - PP > UP - ShortOrder
    ShortTP := PP
    ShortTP
else if ShortOrder - S1 > UP - ShortOrder
    ShortTP := S1
    ShortTP
else if ShortOrder - S2 > UP - ShortOrder
    ShortTP := S2
    ShortTP
else if ShortOrder - S3 > UP - ShortOrder
    ShortTP := S3
    ShortTP
else
    ShortTP := 0
    ShortTP
//
//plot(ShortTP)
if strategy.position_size == 0
    if ShortTP == 0 and ShortOrder != 0
        ShortTake := ShortOrder - (UP - ShortOrder)
        ShortTake
    else
        ShortTake := ShortTP
        ShortTake

plot(series=strategy.position_size < 0 ? ShortTake : na, title='ShortTake', color=color.new(color.rgb(99, 253, 104), transp=0), linewidth=1, style=plot.style_linebr)

// StopForLONG and SHORT
stopLong := math.min(DOWN,ta.lowest(low,3)) -   pipsSellStop*stepSize
//plot(stopLong)
stopShort := math.max(UP,ta.highest(high,3)) + pipsBuyStop*stepSize
//plot(stopShort)

// TRADES LONG
if LongOrder > 0  and close < LongOrder and longEnabled and LongCondition
    strategy.entry('Long', strategy.long, stop=LongOrder + pipsBuyStop*stepSize)
if LongOrder == 0 or not LongCondition or not longEnabled
    strategy.cancel('Long')
strategy.exit('CloseLong', from_entry='Long', stop=stopLong, limit=LongTake - pipsSellStop*stepSize)

// // LONG ALERT !!!
// if longEnabled and LongCondition and LongOrder[1] == 0 and LongOrder != 0
//     alert(str.tostring(LicenseID)+',buystop,GBPUSDb,price='          +str.tostring(LongOrder + pipsBuyStop*stepSize)+',risk='+str.tostring(contracts), alert.freq_once_per_bar_close)
// if longEnabled and LongCondition and LongOrder[1] != 0 and LongOrder != 0 and LongOrder != LongOrder[1]
//     alert(str.tostring(LicenseID)+',cancellongbuystop,GBPUSDb,price='+str.tostring(LongOrder + pipsBuyStop*stepSize)+',risk='+str.tostring(contracts), alert.freq_once_per_bar_close)
// if (strategy.position_size > 0 and (LongTake != LongTake[1] or stopLong != stopLong[1])) or (strategy.position_size > 0 and strategy.position_size[1] == 0 )
//     alert(str.tostring(LicenseID)+',newsltplong,GBPUSDb,sl='+str.tostring(stopLong)+',tp='+str.tostring(LongTake - pipsSellStop*stepSize), alert.freq_once_per_bar_close)
// if strategy.position_size == 0 and ((LongCondition[1] and not LongCondition) or not longEnabled) and (LongOrder[1] != 0 and LongOrder == 0)
//     alert(str.tostring(LicenseID)+',cancellong,GBPUSDb', alert.freq_once_per_bar_close)
    
// // TRADES SHORT
// if ShortOrder > 0 and close > ShortOrder and shortEnabled and ShortCondition
//     strategy.entry('Short', strategy.short, stop=ShortOrder - pipsSellStop*stepSize)
// if ShortOrder == 0 or not ShortCondition or not shortEnabled
//     strategy.cancel('Short')
// strategy.exit('CloseShort', from_entry='Short', stop=stopShort, limit=ShortTake + pipsBuyStop*stepSize)

// // SHORT ALERT !!!
// if shortEnabled and ShortCondition and ShortOrder[1] == 0 and ShortOrder != 0
//     alert(str.tostring(LicenseID)+',sellstop,GBPUSDb,price='           +str.tostring(ShortOrder - pipsSellStop*stepSize)+',risk='+str.tostring(contracts), alert.freq_once_per_bar_close)
// if shortEnabled and ShortCondition and ShortOrder[1] != 0 and ShortOrder != 0 and ShortOrder != ShortOrder[1]
//     alert(str.tostring(LicenseID)+',cancelshortsellstop,GBPUSDb,price='+str.tostring(ShortOrder - pipsSellStop*stepSize)+',risk='+str.tostring(contracts), alert.freq_once_per_bar_close)
// if (strategy.position_size < 0 and (ShortTake != ShortTake[1] or stopShort != stopShort[1])) or (strategy.position_size < 0 and strategy.position_size[1] == 0)
//     alert(str.tostring(LicenseID)+',newsltpshort,GBPUSDb,sl='+str.tostring(stopShort)+',tp='+str.tostring(ShortTake + pipsBuyStop*stepSize), alert.freq_once_per_bar_close)
// if strategy.position_size == 0 and ((ShortCondition[1] and not ShortCondition) or not shortEnabled) and (ShortOrder[1] != 0 and ShortOrder == 0)
//     alert(str.tostring(LicenseID)+',cancelshort,GBPUSDb', alert.freq_once_per_bar_close)


```

> Detail

https://www.fmz.com/strategy/433435

> Last Modified

2023-11-27 16:11:18
