
> Name

AlphaTradingBot-交易策略-AlphaTradingBot-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13bf253153f1471ce21.png)
#### Overview
AlphaTradingBot is a day trading strategy based on the Zigzag indicator and Fibonacci sequence. The strategy identifies the high points (HH) and low points (LL) of the market to determine the trend, and uses Fibonacci retracements and expansions to set entry points, take-profits, and stop-losses. The strategy only runs within a specified date range and can go both long and short, with some ability to grasp trends and control risk-reward ratio.

#### Strategy Principle
1. Use the Zigzag indicator to identify the market's high points (HH), low points (LL), higher lows (HL), and lower highs (LH).
2. When an HH appears, it is regarded as the beginning of an uptrend and the strategy starts looking for long opportunities; when an LL appears, it is regarded as the beginning of a downtrend and the strategy starts looking for short opportunities.
3. In an uptrend, if an HL appears, the range formed by the HL and the previous LL is used as the Fibonacci retracement range for longs. If the price breaks the previous high, a long order is placed in the 23.6%-38.2% (adjustable) retracement zone, with the stop-loss set at the 61.8% retracement level and the take-profit calculated based on the RR value (adjustable).
4. In a downtrend, if an LH appears, the range formed by the LH and the previous HH is used as the Fibonacci retracement range for shorts. If the price breaks the previous low, a short order is placed in the 61.8%-76.4% (adjustable) retracement zone, with the stop-loss set at the 38.2% retracement level and the take-profit calculated based on the RR value (adjustable).
5. Order management: Only one order is placed per signal until that order is closed. If the loss of a single trade reaches X% (adjustable) of the total account balance, the strategy stops running.

#### Advantage Analysis
1. Strong trend-following ability. Effectively identifies trends through Zigzag and can enter at the early stage of a trend.
2. Clear retracement logic. Uses Fibonacci retracements to set entry zones and enters during trend retracements, resulting in a relatively high win rate.
3. Controllable risk. Controls the risk of each trade by setting a maximum single-trade loss percentage, while a strict stop-loss system also ensures overall risk control.
4. Optimizable risk-reward ratio. The RR value can be adjusted according to market characteristics and personal preferences to optimize the strategy's risk-reward ratio.

#### Risk Analysis
1. Frequent trading. Due to the high sensitivity of Zigzag, it may generate signals frequently, leading to over-trading.
2. Imprecise trend identification. The trends determined by Zigzag may still have deviations, resulting in less-than-ideal entry timing.
3. Poor performance in range-bound markets. In sideways markets, the strategy may generate more losing trades.
4. Limited running period. The strategy only runs within a specified date range and may miss some market moves.

#### Optimization Direction
1. Introduce more technical indicators, such as MA and MACD, to improve the accuracy of trend identification.
2. Optimize position management, such as dynamically adjusting position size based on indicators like ATR.
3. Optimize take-profit and stop-loss logic, such as dynamically adjusting stop-loss levels based on market volatility.
4. Introduce market sentiment indicators to avoid entering during extreme optimism or pessimism.
5. Relax the date restriction to increase the strategy's versatility.

#### Summary
AlphaTradingBot is a trend-following intraday strategy based on the Zigzag indicator and Fibonacci retracements. It determines trends through high and low points and enters during trend retracements, aiming to pursue a higher win rate and risk-reward ratio. The strategy's advantages lie in its strong trend-grasping ability, clear retracement logic, and measurable risk, but it also faces risks such as over-trading, trend misjudgment, and poor performance in range-bound markets. In the future, the strategy can be optimized in terms of technical indicators, position management, take-profit and stop-loss, and market sentiment to improve its robustness and profitability.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|5|Pivot Bars Count|
|v_input_bool_2|false|Debug|
|v_input_1|timestamp(2023-01-01T00:00:00)|(?Rango de fechas)Desde|
|v_input_2|timestamp(2023-12-31T23:59:59)|Hasta|
|v_input_bool_1|false|(?Trading) Shorts|
|v_input_float_1|true|Riesgo %|
|v_input_float_2|2|Ratio de Ganancia X|
|v_input_float_3|40|(?Fibonacci)Retroceso %|
|v_input_float_4|72|Stop Loss %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-20 00:00:00
end: 2024-04-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © javierfish

//@version=5
strategy(title = 'Augusto Bot v1.2', shorttitle='? ? v1.2', overlay = true, pyramiding=0, initial_capital=100000, default_qty_value=1)
lb = input.int(5, title='Pivot Bars Count', minval=1)
rb = lb

var color supcol = color.lime
var color rescol = color.red
// srlinestyle = line.style_dotted
srlinewidth = 1
changebarcol = true
bcolup = color.blue
bcoldn = color.black

intDesde = input(timestamp('2023-01-01T00:00:00'), 'Desde', group='Rango de fechas')
intHasta = input(timestamp('2023-12-31T23:59:59'), 'Hasta', group='Rango de fechas')
blnFechas = true

blnShorts = input.bool(false, " Shorts", group="Trading", tooltip = 'Checked = Shorts. No Checked = Longs')
blnLongs = not blnShorts
pctRisk = input.float(1, 'Riesgo %', 0.1, 100,step = .1, group='Trading', tooltip = 'Porcentaje del total de su cuenta que está dispuesto a arriesgar en cada trade')
RR = input.float(2, 'Ratio de Ganancia X', 1, 10, .5, tooltip = 'Proporción de Take Profit contra Stop Loss', group='Trading')

retro = input.float(40, 'Retroceso %', 1, 100, 10, tooltip = 'Porcentaje de Fibonacci que debe alcanzar el precio para considerar un retroceso', group='Fibonacci')
fibSL = input.float(72, 'Stop Loss %', 1, 100, 5, tooltip = 'Porcentaje de Fibonacci que debe alcanzar el precio para considerar perdido un trade', group='Fibonacci')

blnDebug = input.bool(false, 'Debug', tooltip = 'Mostrar información de depuración como estatus y línea de tendencia')
showsupres = blnDebug

blnEnLong = strategy.position_size > 0
blnEnShort = strategy.position_size < 0
blnEnTrade = blnEnLong or blnEnShort

ph = ta.pivothigh(lb, rb)
pl = ta.pivotlow(lb, rb)

iff_1 = pl ? -1 : na  // Trend direction
hl = ph ? 1 : iff_1
iff_2 = pl ? pl : na  // similar to zigzag but may have multiple highs/lows
zz = ph ? ph : iff_2
valuewhen_1 = ta.valuewhen(hl, hl, 1)
valuewhen_2 = ta.valuewhen(zz, zz, 1)
zz := pl and hl == -1 and valuewhen_1 == -1 and pl > valuewhen_2 ? na : zz
valuewhen_3 = ta.valuewhen(hl, hl, 1)
valuewhen_4 = ta.valuewhen(zz, zz, 1)
zz := ph and hl == 1 and valuewhen_3 == 1 and ph < valuewhen_4 ? na : zz

valuewhen_5 = ta.valuewhen(hl, hl, 1)
valuewhen_6 = ta.valuewhen(zz, zz, 1)
hl := hl == -1 and valuewhen_5 == 1 and zz > valuewhen_6 ? na : hl
valuewhen_7 = ta.valuewhen(hl, hl, 1)
valuewhen_8 = ta.valuewhen(zz, zz, 1)
hl := hl == 1 and valuewhen_7 == -1 and zz < valuewhen_8 ? na : hl
zz := na(hl) ? na : zz

findprevious() =>  // finds previous three points (b, c, d, e)
    float loc1 = na
    float loc2 = na
    float loc3 = na
    float loc4 = na
    if not na(hl)
        ehl = hl == 1 ? -1 : 1
        loc1 := 0.0
        loc2 := 0.0
        loc3 := 0.0
        loc4 := 0.0
        xx = 0
        for x = 1 to 1000 by 1
            if hl[x] == ehl and not na(zz[x])
                loc1 := zz[x]
                xx := x + 1
                break
        ehl := hl
        for x = xx to 1000 by 1
            if hl[x] == ehl and not na(zz[x])
                loc2 := zz[x]
                xx := x + 1
                break
        ehl := hl == 1 ? -1 : 1
        for x = xx to 1000 by 1
            if hl[x] == ehl and not na(zz[x])
                loc3 := zz[x]
                xx := x + 1
                break
        ehl := hl
        for x = xx to 1000 by 1
            if hl[x] == ehl and not na(zz[x])
                loc4 := zz[x]
                break
    [loc1, loc2, loc3, loc4]

[loc1, loc2, loc3, loc4] = findprevious()
a = fixnan(zz)
b = loc1
c = loc2
d = loc3
e = loc4

_hh = zz and a > b and a > c and c > b and c > d
_ll = zz and a < b and a < c and c < b and c < d
_hl = zz and (a >= c and b > c and b > d and d > c and d > e or a < b and a > c and b < d)
_lh = zz and (a <= c and b < c and b < d and d < c and d < e or a > b and a < c and b > d)

plotshape(blnDebug and _hl, text='HL', title='Higher Low', style=shape.labelup, color=color.lime, textcolor=color.new(color.black, 0), location=location.belowbar, offset=-rb)
plotshape(blnDebug and _hh, text='HH', title='Higher High', style=shape.labeldown, color=color.lime, textcolor=color.new(color.black, 0), location=location.abovebar, offset=-rb)
plotshape(blnDebug and _ll, text='LL', title='Lower Low', style=shape.labelup, color=color.red, textcolor=color.new(color.white, 0), location=location.belowbar, offset=-rb)
plotshape(blnDebug and _lh, text='LH', title='Lower High', style=shape.labeldown, color=color.red, textcolor=color.new(color.white, 0), location=location.abovebar, offset=-rb)

float res = na
float sup = na
res := _lh ? zz : res[1]
sup := _hl ? zz : sup[1]

int trend = na
iff_3 = close < sup ? -1 : nz(trend[1])
trend := close > res ? 1 : iff_3

res := trend == 1 and _hh or trend == -1 and _lh ? zz : res
sup := trend == 1 and _hl or trend == -1 and _ll ? zz : sup
rechange = res != res[1]
suchange = sup != sup[1]

var line resline = na
var line supline = na
if showsupres
    if rechange
        line.set_x2(resline, bar_index)
        line.set_extend(resline, extend=extend.none)
        resline := line.new(x1=bar_index - rb, y1=res, x2=bar_index, y2=res, color=rescol, extend=extend.right,  width=srlinewidth)
        resline

    if suchange
        line.set_x2(supline, bar_index)
        line.set_extend(supline, extend=extend.none)
        supline := line.new(x1=bar_index - rb, y1=sup, x2=bar_index, y2=sup, color=supcol, extend=extend.right,  width=srlinewidth)
        supline

iff_4 = trend == 1 ? bcolup : bcoldn
barcolor(color=changebarcol and blnDebug ? iff_4 : na)

usdCalcRisk = strategy.equity * pctRisk / 100
usdRisk = usdCalcRisk > 0 ? usdCalcRisk : 0
blnOrder = strategy.opentrades > 0
var entryPrice = close
var hhVal = high
var lhVal = high
var hlVal = low
var llVal = low
var longTP  = high
var longSL  = low
var shortTP = low
var shortSL = high
var lowest = low
var highest = high
var status = 0
var closedTrades = strategy.closedtrades
var currSignal = ''
var prevSignal = currSignal

if _hh
    hhVal := a
    prevSignal := currSignal
    currSignal := 'HH'
else if _lh
    lhVal := a
    prevSignal := currSignal
    currSignal := 'LH'
else if _hl
    hlVal := a
    prevSignal := currSignal
    currSignal := 'HL'
else if _ll
    llVal := a
    prevSignal := currSignal
    currSignal := 'LL'

fibo(fibTop, fibLow) =>
    diff = fibTop - fibLow
    fib50 = 0.0
    if status % 2 == 1 // Estatus pares son longs
        fib50 := fibLow + (diff * (1 - (retro / 100)))  // Longs
    else 
        fib50 := fibLow + (diff * (retro / 100))
    fib70UP = fibLow + (diff * (1 - (fibSL / 100))) // Fibo 61.8% up
    fib70DW = fibLow + (diff * (fibSL / 100)) // Fibo 61.8% down
    [fib50, fib70UP, fib70DW]

currLowest = ta.lowest(low, lb + 1)  // El menor low de las últimas n barras
currHighest = ta.highest(high, lb + 1) // El mayor high de las últimas n barras

// status 0. En espera de un LL para longs o un HH para shorts
if status == 0 and blnFechas
    closedTrades := strategy.closedtrades
    if _ll and blnLongs
        status := 1
    else if _hh and blnShorts
        status := 2
// -------- LONGS --------
// status 1. Longs. En espera de un nuevo nivel superior (HH o LH)
else if status == 1
    closedTrades := strategy.closedtrades
    if _hh or _lh
        highest := currHighest
    else if _hl
        lowest := currLowest
        if high > highest
            status := 5
            highest := high
            [fib50, fibUP, fibDW] = fibo(highest, lowest)
            entryPrice := fib50
            if low <= entryPrice and close <= open  // Si la vela roja que rebasó el reciente nivel superior también cruzó el precio de entrada se ingresa a un trade inmediatamente
                entryPrice := close
            longSL := fibUP // Reajuste de SL para long
            diff = entryPrice - longSL
            longTP := entryPrice + diff * RR // Reajuste de TP para long
            lotSize = usdRisk / diff
            if entryPrice > longSL
                strategy.entry('? 1', strategy.long, limit = entryPrice, qty = lotSize, alert_message = 'long ' + ' ' + syminfo.ticker + ' p=' + str.tostring(entryPrice) + ' tp=' + str.tostring(longTP) + ' sl=' + str.tostring(longSL) + ' q=' + str.tostring(pctRisk) + '%')
                strategy.exit('lx', '? 1', limit = longTP, stop = longSL, comment_loss = '?', comment_profit = '✅', alert_message = 'bal')
        else
            status := 3
        [fib50, fibUP, fibDW] = fibo(highest, lowest)
        entryPrice := fib50
    else if low < llVal
        status := 0
// status 3. Longs. En espera de que aparezca un HL
else if status == 3
    if _hl
        lowest := currLowest
    if _lh or _ll or low < hlVal
        strategy.cancel_all()
        status := _ll ? 1 : 0 // Si fue un nuevo LL comienza a formarse un nuevo setup alcista
    else if high > highest
        status := 5
        highest := high
        [fib50, fibUP, fibDW] = fibo(highest, lowest)
        entryPrice := fib50
        if low <= entryPrice
            entryPrice := close 
        longSL := fibUP // Reajuste de SL para long
        diff = entryPrice - longSL
        longTP := entryPrice + diff * RR // Reajuste de TP para long
        lotSize = usdRisk / diff
        if not blnEnLong and entryPrice > longSL
            strategy.cancel_all()
            strategy.entry('? 3', strategy.long, limit = entryPrice, qty = lotSize, alert_message = 'long ' + ' ' + syminfo.ticker + ' p=' + str.tostring(entryPrice) + ' tp=' + str.tostring(longTP) + ' sl=' + str.tostring(longSL) + ' q=' + str.tostring(pctRisk) + '%')
            strategy.exit('lx', '? 3', limit = longTP, stop = longSL, comment_loss = '?', comment_profit = '✅', alert_message = 'bal')
// status 5. Longs. Crecimiento del fibo en espera de que se rebase el nivel superior y se toque el entry price para entrar a un trade
else if status == 5
    if strategy.closedtrades > closedTrades // Caso trade abre y cierra en una misma vela
        status := 0
    else if blnEnLong
        status := 7
    else if _lh or _ll or low < llVal // Caso invalidación por nuevo bajo nivel
        strategy.cancel_all()
        status := _ll ? 1 : 0 // Si fue un nuevo LL comienza a formarse un nuevo setup alcista
    else if high > highest // Caso de rebase de niveles superiores
        highest := high
        [fib50, fibUP, fibDW] = fibo(highest, lowest)
        entryPrice := fib50
        longSL := fibUP // Reajuste de SL para long
        diff = entryPrice - longSL
        longTP := entryPrice + diff * RR // Reajuste de TP para long
        lotSize = usdRisk / diff
        if not blnEnLong and entryPrice > longSL // Orden limit de long con su TP y SL
            strategy.cancel_all()
            strategy.entry('? 5', strategy.long, limit = entryPrice, qty = lotSize, alert_message = 'long ' + ' ' + syminfo.ticker + ' p=' + str.tostring(entryPrice) + ' tp=' + str.tostring(longTP) + ' sl=' + str.tostring(longSL) + ' q=' + str.tostring(pctRisk) + '%')
            strategy.exit('lx', '? 5', limit = longTP, stop = longSL, comment_loss = '?', comment_profit = '✅', alert_message = 'bal')
// status 7. Longs. En espera que finalice el trade
else if status == 7    
    blnOrder := false
    if not blnEnLong
        strategy.cancel_all()
        if currSignal == 'HH' and blnShorts // Si se finaliza un trade e inmediatamente se presenta un HH debe comenzarse la formación de un setup bajista
            status := 2
        else
            status := 0
// -------- SHORTS --------
// status 2. Shorts. En espera de un nuevo nivel inferior (LL o HL)
else if status == 2
    closedTrades := strategy.closedtrades
    if _ll or _hl
        lowest := currLowest
    else if _lh
        highest := currHighest
        if low < lowest
            status := 6
            lowest := low
            [fib50, fibUP, fibDW] = fibo(highest, lowest)
            entryPrice := fib50
            if high >= entryPrice and close > open  // Si la vela verde que rebasó el reciente nivel inferior tambien cruzó el precio de entrada se ingresa a un trade inmediatamente
                entryPrice := close
            shortSL := fibDW
            diff = shortSL - entryPrice
            shortTP := entryPrice - diff * RR
            lotSize = usdRisk / diff
            if entryPrice < shortSL
                strategy.entry('? 2', strategy.short, limit = entryPrice, qty = lotSize, alert_message = 'short ' + ' ' + syminfo.ticker + ' p=' + str.tostring(entryPrice) + ' tp=' + str.tostring(shortTP) + ' sl=' + str.tostring(shortSL) + ' q=' + str.tostring(pctRisk) + '%')
                strategy.exit('sx', '? 2', limit = shortTP, stop = shortSL, comment_loss = '☠️', comment_profit = '❎', alert_message = 'bal')
        else
            status := 4
        [fib50, fibUP, fibDW] = fibo(highest, lowest)
        entryPrice := fib50
    else if high > hhVal
        status := 0
// status 4. Shorts. En espera de que aparezca un LH
else if status == 4
    if _lh
        highest := currHighest
    if _hl or _hh or high > lhVal
        strategy.cancel_all()
        status := _hh ? 2 : 0 // Si fue un nuevo HH comienza a formarse un nuevo setup bajista
    else if low < lowest
        status := 6
        lowest := low
        [fib50, fibUP, fibDW] = fibo(highest, lowest)
        entryPrice := fib50
        if high >= entryPrice
            entryPrice := close
        shortSL := fibDW
        diff = shortSL - entryPrice
        shortTP := entryPrice - diff * RR
        lotSize = usdRisk / diff
        if not blnEnShort and entryPrice < shortSL
            strategy.cancel_all()
            strategy.entry('? 4', strategy.short, limit = entryPrice, qty = lotSize, alert_message = 'short ' + ' ' + syminfo.ticker + ' p=' + str.tostring(entryPrice) + ' tp=' + str.tostring(shortTP) + ' sl=' + str.tostring(shortSL) + ' q=' + str.tostring(pctRisk) + '%')
            strategy.exit('sx', '? 4', limit = shortTP, stop = shortSL, comment_loss = '☠️', comment_profit = '❎', alert_message = 'bal')
// status 6. Shorts. Crecimiento del fibo en espera de que se rebase el nivel inferior y se toque el entry price para entrar a un trade
else if status == 6
    if strategy.closedtrades > closedTrades // Caso trade abre y cierra en una misma vela
        status := 0
    else if blnEnShort
        status := 8
    else if _hl or _hh or high > hhVal
        strategy.cancel_all()
        status := _hh ? 2 : 0 // Si fue un nuevo HH comienza a formarse un nuevo setup bajista
    else if low < lowest // Caso de rebase de niveles inferiores
        lowest := low
        [fib50, fibUP, fibDW] = fibo(highest, lowest)
        entryPrice := fib50
        shortSL := fibDW
        diff = shortSL - entryPrice
        shortTP := entryPrice - diff * RR
        lotSize = usdRisk / diff
        if entryPrice < shortSL
            strategy.cancel_all()
            strategy.entry('? 6', strategy.short, limit = entryPrice, qty = lotSize, alert_message = 'short ' + ' ' + syminfo.ticker + ' p=' + str.tostring(entryPrice) + ' tp=' + str.tostring(shortTP) + ' sl=' + str.tostring(shortSL) + ' q=' + str.tostring(pctRisk) + '%')
            strategy.exit('sx', '? 6', limit = shortTP, stop = shortSL, comment_loss = '☠️', comment_profit = '❎', alert_message = 'bal')
// status 8. Shorts. En espera que finalice el trade
else if status == 8    
    blnOrder := false
    if not blnEnShort
        strategy.cancel_all()
        if currSignal == 'LL' and blnLongs // Si inmediatamente después de finalizar un trade existe un LL debe comenzarse un setup alcista
            status := 1
        else
            status := 0

plotchar(blnDebug and status == 0 and blnFechas, '0', '0', location.abovebar, color.yellow, size = size.tiny)
plotchar(blnDebug and status == 1 and blnFechas, '1', '1', location.abovebar, color.yellow, size = size.tiny)
plotchar(blnDebug and status == 2 and blnFechas, '2', '2', location.abovebar, color.yellow, size = size.tiny)
plotchar(blnDebug and status == 3 and blnFechas, '3', '3', location.abovebar, color.yellow, size = size.tiny)
plotchar(blnDebug and status == 4 and blnFechas, '4', '4', location.abovebar, color.yellow, size = size.tiny)
plotchar(blnDebug and status == 5 and blnFechas, '5', '5', location.abovebar, color.yellow, size = size.tiny)
plotchar(blnDebug and status == 6 and blnFechas, '6', '6', location.abovebar, color.yellow, size = size.tiny)
plotchar(blnDebug and status == 7 and blnFechas, '7', '7', location.abovebar, color.yellow, size = size.tiny)
plotchar(blnDebug and status == 8 and blnFechas, '8', '8', location.abovebar, color.yellow, size = size.tiny)

plot(highest, 'highest', (status == 5 or status[1] == 5) and blnLongs ? color.new(color.orange, 50) : na, 1, plot.style_stepline)
plot(entryPrice, 'entryPrice', (status == 5 or status[1] == 5) and blnLongs ?color.new(color.white, 50) : na, 1, plot.style_stepline)
plot(lowest, 'lowest', (status == 3 or status == 5 or status[1] == 5) and blnLongs ? color.new(color.yellow, 50) : na, 1, plot.style_stepline)

plot(lowest, 'currLowest', (status == 6 or status[1] == 6) and blnShorts ? color.new(color.orange, 50) : na, 1, plot.style_stepline)
plot(entryPrice, 'currEntryPrice', (status == 6 or status[1] == 6) and blnShorts ?color.new(color.white, 50) : na, 1, plot.style_stepline)
plot(highest, 'currHighest', (status == 4 or status == 6 or status[1] == 6) and blnShorts ?color.new(color.yellow, 50) : na, 1, plot.style_stepline)

exitLong = barstate.isconfirmed and blnEnLong and time >= intHasta
exitShort = barstate.isconfirmed and blnEnShort and time >= intHasta

if exitLong
    strategy.cancel_all()
    strategy.close_all(comment = close > strategy.position_avg_price ?  '✅' : '?') 
    status := 0

if exitShort
    strategy.cancel_all()
    strategy.close_all(comment = close < strategy.position_avg_price ? '❎' : '☠️')
    status := 0

plot(zz, 'Zigzag', blnDebug ? color.white : na, offset = lb * -1)

rayaTradeLong = strategy.position_size == strategy.position_size[1] and (strategy.position_size > 0) and blnLongs
tpPlLong = plot(longTP, color = rayaTradeLong ? color.teal : na)
epPlLong = plot(entryPrice, color= rayaTradeLong ? color.white : na)
slPlLong = plot(longSL, color = rayaTradeLong ? color.maroon : na)
fill(tpPlLong, epPlLong, color= rayaTradeLong ? color.new(color.teal, 85) : na)
fill(epPlLong, slPlLong, color= rayaTradeLong ? color.new(color.maroon, 85) : na)

rayaTradeShort = strategy.position_size == strategy.position_size[1] and strategy.position_size < 0 and blnShorts
tpPlShort = plot(shortTP, color = rayaTradeShort ? color.teal : na)
epPlShort = plot(entryPrice, color=rayaTradeShort ? color.white : na)
slPlShort = plot(shortSL, color=rayaTradeShort ? color.maroon : na)
fill(tpPlShort, epPlShort, color=rayaTradeShort ? color.new(color.teal, 85) : na)
fill(epPlShort, slPlShort, color=rayaTradeShort ? color.new(color.maroon, 85) : na)
```

> Detail

https://www.fmz.com/strategy/449712

> Last Modified

2024-04-28 13:48:51
