
> Name

The-Gunbot-Bands-Strategy

> Author

ChaoZhang

> Strategy Description

The Gunbot Bands strategy is a technical analysis algorithmic trading strategy that aims to ride trends and cut losses short. It uses Bollinger Bands as the main indicator to determine entries and exits. 

How It Works

The strategy enters long positions when the price closes below the lower Bollinger Band and short positions when the price closes above the upper Bollinger Band. The bands provide dynamic support and resistance levels that adapt to market volatility.

The position size increases exponentially on consecutive long/short signals, implementing a martingale component. Profit targets and stop losses are set based on the entry price. Trailing stops and early exit calls further look to maximize profits and reduce losses.

Benefits

The key advantages of this strategy are:

- Rides strong trends using Bollinger Bands as dynamic support/resistance
- Pyramiding increases position size to benefit from momentum
- Various exit mechanisms try to lock in profits and limit losses

Risks

Potential risks to consider:

- Bollinger Bands are lagging and may signal late entries
- Exponential position sizing can lead to large losses if trends reverse
- Multiple exit signals can result in over-trading and high commissions

Overall, the Gunbot Bands strategy aims to capitalize on trend continuations but a highly volatile market can trigger stop outs. Proper tuning of the input parameters is required to match the strategy to current market conditions.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2016|Backtest Start Year|
|v_input_2|8|Backtest Start Month|
|v_input_3|10|Backtest Start Day|
|v_input_4|2020|Backtest Stop Year|
|v_input_5|9|Backtest Stop Month|
|v_input_6|29|Backtest Stop Day|
|v_input_7|15|length|
|v_input_8_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|2|mult|
|v_input_10|25|LOW_BB|
|v_input_11|25|HIGH_BB|
|v_input_12|false|Activate TS|
|v_input_13|99999|Trailing Stop|
|v_input_14|99999|Take Profit|
|v_input_15|99999|Stop Loss|
|v_input_16|false|Pyramiding <|
|v_input_17|true|Pyramiding =|
|v_input_18|100|Pyramiding >|
|v_input_19|false|WIP Feature|
|v_input_20|true|Leverage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-02 00:00:00
end: 2023-09-09 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// strategy("Gunbot - Bbands", shorttitle="Strategy", overlay=true, pyramiding=100, default_qty_value=100000000, precision=8)

/////////////// Component Code Start ///////////////
testStartYear = input(2016, "Backtest Start Year") 
testStartMonth = input(8, "Backtest Start Month")
testStartDay = input(10, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2020, "Backtest Stop Year")
testStopMonth = input(9, "Backtest Stop Month")
testStopDay = input(29, "Backtest Stop Day")
// testStopDay = testStartDay + 1
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriod() =>
    true
/////////////// Component Code Stop ///////////////

length = input(15, minval=1)
src = input(close, title="Source")
mult = input(2.0, minval=0.001, maxval=50)
low_bb = input(25, title="LOW_BB")
high_bb = input(25, title="HIGH_BB")

basis = sma(src, length * (15 / timeframe.multiplier))
dev = mult * stdev(src, length * (15 / timeframe.multiplier))
upper = basis + dev
upper_high_bb = upper - ((upper-basis) * (high_bb / 100))
lower = basis - dev
lower_low_bb = lower + ((basis-lower) * (low_bb / 100))

bb_percent = ((upper/lower)-1)*100
bb_diff = (upper-lower)

/////////////// STRATEGY ///////////////
tsi = input(0, "Activate TS") / 100000000
ts = input(99999, "Trailing Stop") / 100000000
tp = input(99999, "Take Profit") / 100000000
sl = input(99999, "Stop Loss") / 100000000

pyrl = input(0, "Pyramiding <")
pyre = input(1, "Pyramiding =")
pyrg = input(100, "Pyramiding >")

long = ohlc4 < lower_low_bb
short = ohlc4 > upper_high_bb

sectionLongs = 0
sectionLongs := nz(sectionLongs[1])
sectionShorts = 0
sectionShorts := nz(sectionShorts[1])

if long
    sectionLongs := sectionLongs + 1
    sectionShorts := 0

if short
    sectionLongs := 0
    sectionShorts := sectionShorts + 1

longCondition = long and sectionLongs <= pyrl or long and sectionLongs >= pyrg or long and sectionLongs == pyre
shortCondition = short and sectionShorts <= pyrl or short and sectionShorts >= pyrg or short and sectionShorts == pyre

last_open_longCondition = na
last_open_shortCondition = na
last_open_longCondition := longCondition ? close : nz(last_open_longCondition[1])
last_open_shortCondition := shortCondition ? close : nz(last_open_shortCondition[1])

sectionLongs2 = 0
sectionLongs2 := nz(sectionLongs2[1])
sectionShorts2 = 0
sectionShorts2 := nz(sectionShorts2[1])

if longCondition
    sectionLongs2 := sectionLongs2 + 1
    sectionShorts2 := 0

if shortCondition
    sectionLongs2 := 0
    sectionShorts2 := sectionShorts2 + 1

isAdding = input(false, "WIP Feature", bool)

stackingLongs = 100000000
stackingLongs := nz(stackingLongs[1])
stackingShorts = 100000000
stackingShorts := nz(stackingShorts[1])

if longCondition
    stackingLongs := stackingLongs * 2
    stackingShorts := 100000000
    
if shortCondition
    stackingLongs := 100000000 
    stackingShorts := stackingShorts * 2
    
totalLongs = 0.0
totalLongs := nz(totalLongs[1])
totalShorts = 0.0
totalShorts := nz(totalShorts[1])
totalMartingaleLongs = 0.0
totalMartingaleLongs := nz(totalMartingaleLongs[1])
totalMartingaleShorts = 0.0
totalMartingaleShorts := nz(totalMartingaleShorts[1])

if longCondition and sectionLongs2 >= 1
    totalMartingaleLongs := totalMartingaleLongs + (last_open_longCondition * stackingLongs)
    totalLongs := totalLongs + last_open_longCondition
    totalShorts := 0.0

if shortCondition and sectionShorts2 >= 1
    totalLongs := 0.0
    totalMartingaleShorts := totalMartingaleShorts + (last_open_shortCondition * stackingShorts)
    totalShorts := totalShorts + last_open_shortCondition

averageLongs = 0.0
averageLongs := nz(averageLongs[1])
averageShorts = 0.0
averageShorts := nz(averageShorts[1]) 
averageMartingaleLongs = 0.0
averageMartingaleLongs := nz(averageLongs[1])
averageMartingaleShorts = 0.0
averageMartingaleShorts := nz(averageShorts[1]) 

averageLongs := totalLongs / sectionLongs2
averageShorts := totalShorts / sectionShorts2
averageMartingaleLongs := totalMartingaleLongs / stackingLongs
averageMartingaleShorts := totalMartingaleShorts / stackingShorts

last_longCondition = na
last_shortCondition = na
last_longCondition := longCondition ? time : nz(last_longCondition[1])
last_shortCondition := shortCondition ? time : nz(last_shortCondition[1])

in_longCondition = last_longCondition > last_shortCondition
in_shortCondition = last_shortCondition > last_longCondition

last_high = na
last_low = na
last_high := not in_longCondition ? na : in_longCondition and (na(last_high[1]) or high > nz(last_high[1])) ? high : nz(last_high[1])
last_low := not in_shortCondition ? na : in_shortCondition and (na(last_low[1]) or low < nz(last_low[1])) ? low : nz(last_low[1])

long_ts = not na(last_high) and high <= (last_high - ts) and longCondition == 0 and high >= (last_open_longCondition + tsi)
short_ts = not na(last_low) and low >= (last_low + ts) and shortCondition == 0 and low <= (last_open_shortCondition - tsi)

long_tp = high >= (last_open_longCondition + tp) and longCondition == 0
short_tp = low <= (last_open_shortCondition - tp) and shortCondition == 0

long_sl = low <= (last_open_longCondition - sl) and longCondition == 0
short_sl = high >= (last_open_shortCondition + sl) and shortCondition == 0

leverage = input(1, "Leverage")
long_call = last_open_longCondition - (0.8 + 0.2 * (1/leverage)) / leverage * last_open_longCondition
short_call = last_open_shortCondition + (0.78 + 0.2 * (1/leverage)) / leverage * last_open_shortCondition
long_call_signal = low <= long_call
short_call_signal = high >= short_call

longProfit = averageLongs > 0 and close >= averageLongs ? green : red
shortProfit = averageShorts > 0 and close <= averageShorts ? green : red

pl1 = plot(averageLongs > 0 ? averageLongs : na, color=white)
pl2 = plot(close, color=white)
pl3 = plot(averageShorts > 0 ? averageShorts : na, color=white)

fill(pl1, pl2, color=longProfit, transp=80)
fill(pl2, pl3, color=shortProfit, transp=80)

if testPeriod()
    
    if isAdding
        strategy.entry("Long", strategy.long, qty=stackingLongs, when=longCondition)
        strategy.entry("Short", strategy.short, qty=stackingShorts, when=shortCondition)
    else
        strategy.entry("Long", strategy.long, when=longCondition)
        strategy.entry("Short", strategy.short, when=shortCondition)
    
    strategy.close("Long", when=long_call_signal)
    strategy.close("Short", when=short_call_signal)
    strategy.close("Long", when=long_tp)
    strategy.close("Short", when=short_tp)
    strategy.close("Long", when=long_sl)
    strategy.close("Short", when=short_sl)
    strategy.close("Long", when=long_ts)
    strategy.close("Short", when=short_ts)

longAveragePlot = 0.0
longAveragePlot := nz(totalShorts[1])
shortAveragePlot = 0.0
shortAveragePlot := nz(shortAveragePlot[1])

if isAdding
    longAveragePlot := averageMartingaleLongs
    shortAveragePlot := averageMartingaleShorts
else
    longAveragePlot := averageLongs
    shortAveragePlot := averageShorts

plot(averageLongs > 0 ? averageLongs : na, "Long Average", style=3, color=green)
plot(averageShorts > 0 ? averageShorts : na, "Short Average", style=3, color=red)
```

> Detail

https://www.fmz.com/strategy/426298

> Last Modified

2023-09-10 21:31:29
