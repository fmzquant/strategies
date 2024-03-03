
> Name

Super-Trend-Daily-20-BF

> Author

ChaoZhang

> Strategy Description

This is my Super Trend Daily strategy but with one important difference. You can now adjust settings for long or short signals individually and separately. For example, the condition for a long signal may require a different parameter setting than the condition for a short signal. Each parameter in the signal generation can be tuned. You can also decide what kind of stop loss you want for each side - you could have a fixed stop loss for longs and an ATR derived stop loss for shorts, or whatever.

We also have the option to choose if we want longs, shorts or both.

INISTRUCTIONS
Look at the background colors:
Green line = long signal
Red line = short signal
Aqua = No long trades
White = No short trades
Yellow dotted line = stop loss for long
Orange dotted line = stop loss for short

The aqua and white backgrounds mean the conditions are choppy/sideways according to our settings we applied to the rate of change function for a long/short signal respectively. It is possible to get a long signal in a white background, but not a short signal. Similarly, it is possible to get a short signal in an aqua background, but not a long signal.

This is a work in progress so any suggestions for improvements are welcome.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/7d3052cb0b5687a425.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|════════ Test Period ═══════|
|v_input_2|2017|Backtest Start Year|
|v_input_3|true|Backtest Start Month|
|v_input_4|true|Backtest Start Day|
|v_input_5|2019|Backtest Stop Year|
|v_input_6|12|Backtest Stop Month|
|v_input_7|31|Backtest Stop Day|
|v_input_8|false|═════ Super Trend L ═════|
|v_input_9|2|ATR Period|
|v_input_10|1.5|ATR Multiplier|
|v_input_11|false|═════ Super Trend S ═════|
|v_input_12|3|ATR Period|
|v_input_13|1.3|ATR Multiplier|
|v_input_14|false|═════ Rate of Change L ═════|
|v_input_15|30|ROC Length|
|v_input_16|6|ROC % Change|
|v_input_17|false|═════ Rate of Change S ═════|
|v_input_18|76|ROC Length|
|v_input_19|6|ROC % Change|
|v_input_20|false|═══════ Stop Loss L ══════|
|v_input_21|0|Stop Loss Type: Fixed|ATR Derived|
|v_input_22|5|Fixed Stop Loss %|
|v_input_23|20|ATR Stop Period|
|v_input_24|1.5|ATR Stop Multiplier|
|v_input_25|false|═══════ Stop Loss S ══════|
|v_input_26|0|Stop Loss Type: Fixed|ATR Derived|
|v_input_27|6|Fixed Stop Loss %|
|v_input_28|20|ATR Stop Period|
|v_input_29|1.5|ATR Stop Multiplier|
|v_input_30|false|══════ Longs or Shorts ═════|
|v_input_31|true|Use Longs|
|v_input_32|true|Use Shorts|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-25 00:00:00
end: 2022-05-24 23:59:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Super Trend Daily 2.0 BF ", overlay=true, precision=2, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.075)

/////////////// Time Frame ///////////////
_0 = input(false,  "════════ Test Period ═══════")
testStartYear = input(2017, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay, 0, 0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay, 0, 0)

testPeriod() => true

///////////// Super Trend Long /////////////
_1 = input(false,  "═════ Super Trend L ═════")
lengthl = input(title="ATR Period", type=input.integer, defval=2)
multl = input(title="ATR Multiplier", type=input.float, step=0.1, defval=1.5)

atrl = multl * atr(lengthl)

longStopl = hl2 - atrl
longStopPrevl = nz(longStopl[1], longStopl)
longStopl :=  close[1] > longStopPrevl ? max(longStopl, longStopPrevl) : longStopl

shortStopl = hl2 + atrl
shortStopPrevl = nz(shortStopl[1], shortStopl)
shortStopl := close[1] < shortStopPrevl ? min(shortStopl, shortStopPrevl) : shortStopl

dirl = 1
dirl := nz(dirl[1], dirl)
dirl := dirl == -1 and close > shortStopPrevl ? 1 : dirl == 1 and close < longStopPrevl ? -1 : dirl

///////////// Super Trend Short /////////////
_2 = input(false,  "═════ Super Trend S ═════")
lengths = input(title="ATR Period", type=input.integer, defval=3)
mults = input(title="ATR Multiplier", type=input.float, step=0.1, defval=1.3)

atrs = mults * atr(lengths)

longStops = hl2 - atrs
longStopPrevs = nz(longStops[1], longStops)
longStops :=  close[1] > longStopPrevs ? max(longStops, longStopPrevs) : longStops

shortStops = hl2 + atrs
shortStopPrevs = nz(shortStops[1], shortStops)
shortStops := close[1] < shortStopPrevs ? min(shortStops, shortStopPrevs) : shortStops

dirs = 1
dirs := nz(dirs[1], dirs)
dirs := dirs == -1 and close > shortStopPrevs ? 1 : dirs == 1 and close < longStopPrevs ? -1 : dirs

///////////// Rate Of Change Long ///////////// 
_3 = input(false,  "═════ Rate of Change L ═════")
sourcel = close
roclengthl = input(30, "ROC Length",  minval=1)
pcntChangel = input(6, "ROC % Change", minval=1)
rocl = 100 * (sourcel - sourcel[roclengthl]) / sourcel[roclengthl]
emarocl = ema(rocl, roclengthl / 2)
isMovingl() => emarocl > (pcntChangel / 2) or emarocl < (0 - (pcntChangel / 2))

///////////// Rate Of Change Short ///////////// 
_4 = input(false,  "═════ Rate of Change S ═════")
sources = close
roclengths = input(76, "ROC Length",  minval=1)
pcntChanges = input(6, "ROC % Change", minval=1)
rocs = 100 * (sources - sources[roclengths]) / sources[roclengths]
emarocs = ema(rocs, roclengths / 2)
isMovings() => emarocs > (pcntChanges / 2) or emarocs < (0 - (pcntChanges / 2))

/////////////// Strategy /////////////// 
long = dirl == 1 and dirl[1] == -1 and isMovingl()
short = dirs == -1 and dirs[1] == 1 and isMovings()

last_long = 0.0
last_short = 0.0
last_long := long ? time : nz(last_long[1])
last_short := short ? time : nz(last_short[1])

long_signal = crossover(last_long, last_short)
short_signal = crossover(last_short, last_long)

last_open_long_signal = 0.0
last_open_short_signal = 0.0
last_open_long_signal := long_signal ? open : nz(last_open_long_signal[1])
last_open_short_signal := short_signal ? open : nz(last_open_short_signal[1])

last_long_signal = 0.0
last_short_signal = 0.0
last_long_signal := long_signal ? time : nz(last_long_signal[1])
last_short_signal := short_signal ? time : nz(last_short_signal[1])

in_long_signal = last_long_signal > last_short_signal
in_short_signal = last_short_signal > last_long_signal

last_high = 0.0
last_low = 0.0
last_high := not in_long_signal ? na : in_long_signal and (na(last_high[1]) or high > nz(last_high[1])) ? high : nz(last_high[1])
last_low := not in_short_signal ? na : in_short_signal and (na(last_low[1]) or low < nz(last_low[1])) ? low : nz(last_low[1])

since_longEntry = barssince(last_open_long_signal != last_open_long_signal[1]) 
since_shortEntry = barssince(last_open_short_signal != last_open_short_signal[1]) 

/////////////// Stop Losses Long ///////////////
_5 = input(false,  "═══════ Stop Loss L ══════")
SL_typel = input("Fixed", options=["Fixed", "ATR Derived"], title="Stop Loss Type")
sl_inpl = input(5.0, title='Fixed Stop Loss %') / 100
atrLkbl = input(20, minval=1, title='ATR Stop Period')
atrMultl = input(1.5, step=0.25, title='ATR Stop Multiplier') 
atr1l = atr(atrLkbl)

longStop1l = 0.0
longStop1l :=  short_signal ? na : long_signal ? close - (atr1l * atrMultl) : longStop1l[1]

slLongl = in_long_signal ? strategy.position_avg_price * (1 - sl_inpl) : na
long_sll = in_long_signal ? slLongl : na

/////////////// Stop Losses Short ///////////////
_6 = input(false,  "═══════ Stop Loss S ══════")
SL_types = input("Fixed", options=["Fixed", "ATR Derived"], title="Stop Loss Type")
sl_inps = input(6.0, title='Fixed Stop Loss %') / 100
atrLkbs = input(20, minval=1, title='ATR Stop Period')
atrMults = input(1.5, step=0.25, title='ATR Stop Multiplier') 
atr1s = atr(atrLkbs)

shortStop1s = 0.0
shortStop1s := long_signal ? na : short_signal ? close + (atr1s * atrMults) : shortStop1s[1]

slShorts = strategy.position_avg_price * (1 + sl_inps)
short_sls = in_short_signal ? slShorts : na

_7 = input(false,  "══════ Longs or Shorts ═════")
useLongs = input(true, title="Use Longs")
useShorts = input(true, title="Use Shorts")

/////////////// Execution ///////////////
if testPeriod()
    if useLongs
        strategy.entry("L", strategy.long, when=long)
        strategy.exit("L SL", "L", stop = SL_typel == "Fixed" ? long_sll : longStop1l, when=since_longEntry > 0)
    if useShorts
        strategy.exit("S SL", "S", stop = SL_types == "Fixed" ? short_sls : shortStop1s, when=since_shortEntry > 0)
        strategy.entry("S", strategy.short, when=short)
    if not useShorts
        strategy.close("L", when=short)
    if not useLongs
        strategy.close("S", when=long)

/////////////// Plotting /////////////// 
bgcolor(long_signal ? color.lime : short_signal ? color.red : na, transp=40)
bgcolor(not isMovings() ? color.white : not isMovingl() ? color.aqua : na)
p0 = plot(close, color=color.black)
p1 = plot(strategy.position_size <= 0 ? na : SL_typel == "Fixed" ? long_sll : longStop1l, title="Long Stop Loss", color=color.yellow, style=plot.style_linebr, linewidth=2)
p2 = plot(strategy.position_size >= 0 ? na : SL_types == "Fixed" ? short_sls : shortStop1s, title="Short Stop Loss", color=color.orange, style=plot.style_linebr, linewidth=2)
p3 = plot(strategy.position_size <= 0 ? na : strategy.position_avg_price, style=plot.style_linebr, title="Long Entry", color=color.green, linewidth=2)
p4 = plot(strategy.position_size >= 0 ? na : strategy.position_avg_price, style=plot.style_linebr, title="Short Entry", color=color.red, linewidth=2)
fill(p0, p3, color = color.lime, transp=60)
fill(p0, p4, color = color.red, transp=60)



```

> Detail

https://www.fmz.com/strategy/365892

> Last Modified

2022-05-26 16:48:33
