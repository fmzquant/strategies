
> Name

Rainbow-Oscillator

> Author

ChaoZhang

> Strategy Description

---------------
FEATURES
---------------

.:: Dynamic levels ::.
The indicator consists of levels (price reversal zones) that correlate with each other with other fibonacci numbers. Each level causes the probability of a price reversal.
All levels are formed from existing non-smoothed oscillator values. This allows you not to fix turn zone thresholds, for example, -100 and 100, as is done in CCI
or the values ​​30 and 70 for the reversal zone in the RSI indicator. Dynamic levels adjust to the spikes in oscillator values ​​and allow you to find price reversal points more often and no less efficiently.

.:: Composite oscillator (3 in 1) ::.
The oscillator line consists of three measurements of the RSI , CCI , Stoch indicators at once in a wide percentage. At the same time, thanks to the settings, you can easily get rid of one of the indicators.

.:: CCI + RSI + Stoch ratio setting ::.
Each of the natural indicators has its own weight in the calculation formula: w2 * cci ( + w1 * ( rsi - 50) + (1 - w2 - w1) * ( stoch - 50), this allows you to see an oscillator to any of these various indicators or sharpness weight for each

.:: Smoothing levels and lines of the oscillator ::.
Smoothing the oscillator values ​​allows you to filter out the noise and get more accurate data. Stroking the levels allows you to adjust the delay of the inputs.

.:: Activity during APARTMENT ::.
Dynamic creation of levels allows you to find in the price reversal zone, even when the price is in a flat (flat)


----------------
SETTINGS
----------------

.:: RSI weight / CCI weight ::.
Weight control coefficients for RSI and CCI indicators, respectively. When you set RSI Weight = 0, equalize the combo of CCI and Stoch , when RSI Weight is zero and CCI Weight is equal to the oscillator value will be plotted
only from Stoch . Intermediate values ​​have a high degree of measurement of each of the three oscillators in percentage terms from 0 to 100. The calculation uses the formula: w2 * cci ( + w1 * ( rsi - 50) + (1 - w2 - w1) * ( stoch - 50),
where w1 is RSI Weight and w2 is CCI Weight, Stoch weight is calculated on the fly as (1 - w2 - w1), so the sum of w1 + w2 should not exceed 1, in this case Stoch will work as opposed to CCI and RSI .

.:: Oscilloscope period ::.
This is the period of all oscillators, it is set by one parameter for all. Perhaps, in the expected versions, the periods will be configured separately.

.:: Oscilloscope M.A. Period ::.
Periodic smoothing of the oscillator line. Serves for finer tuning to eliminate noise. If you select a value of 0, smoothing is disabled and the Oscilloscope Samples setting will automatically stop working.

.:: Waveform samples ::.
setting allows you to set the amount of smoothing for the oscillator line. Oscilloscope MA type

.:: Oscilloscope MA Type ::.
Moving average frequency type for oscillator line sliding

.:: Level period ::.
Periodically moving averages used to form the levels (zone) of the Rainbow Oscillator indicator

.:: Level offset ::.
Additional setting for shifting levels from zero points. Can be useful for absorbing levels and filtering input signals. The default is 0.

.:: Redundant level ::.
It characterizes the severity of the state of the state at each iteration of the level of the disease. If set to 1 - the levels will not decrease when the oscillator values ​​fall. If it has a value of 0.99 - the levels are reduced by 0.01
each has an oscillator in 1% of cases and is pressed to 0 by more aggressive ones.

.:: Samples of smoothed levels ::.
setting allows you to set the number of strokes per level. Measuring the number of averages with the definition of the type of moving averages

.:: Type of MA level ::.
Type of moving average, average for the formation of a smoothing overbought and oversold zone


**backtest**

 ![IMG](https://www.fmz.com/upload/asset/e04e6f9a46dda5a36a.png) 


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|0.33|RSI Weight|
|v_input_float_2|0.33|CCI Weight|
|v_input_int_1|24|Ocillograph Period|
|v_input_int_2|4|Oscillograph MA Period|
|v_input_int_3|true|Oscillograph Samples|
|v_input_string_1|0|Oscillograph MA type: SMA|EMA|RMA|WMA|
|v_input_int_4|18|Level Period|
|v_input_int_5|false|Level Offset|
|v_input_float_3|0.99|Level Redunant|
|v_input_int_6|3|Level Smooth Samples|
|v_input_string_2|0|Level MA type: RMA|SMA|EMA|WMA|
|v_input_float_4|7.5|% Take profit|
|v_input_float_5|3.5|% Stop Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-12 00:00:00
end: 2022-05-06 23:59:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © businessduck

//@version=5
indicator("Rainbow Oscillator")

float w1 = input.float(0.33, 'RSI Weight', 0, 1, 0.01)
float w2 = input.float(0.33, 'CCI Weight', 0, 1, 0.01)
int period = input.int(24, 'Ocillograph Period', 4, 60, 1)
int oscillographSamplesPeriod = input.int(4, 'Oscillograph MA Period', 1, 30, 1)
int oscillographSamplesCount = input.int(1, 'Oscillograph Samples', 0, 4, 1)
string oscillographMAType = input.string("SMA", "Oscillograph MA type", options = ["EMA", "SMA", "RMA", "WMA"])
int levelPeriod = input.int(18, 'Level Period', 2, 30)
int levelOffset = input.int(0, 'Level Offset', 0, 200, 10)
float redunant = input.float(0.99, 'Level Redunant', 0, 1, 0.01)
int levelSampleCount = input.int(3, 'Level Smooth Samples', 0, 4, 1)
string levelType = input.string("RMA", "Level MA type", options = ["EMA", "SMA", "RMA", "WMA"])

perc(current, prev) => ((current - prev) / prev) * 100

smooth(value, type, period) =>
    float ma = switch type
        "EMA" => ta.ema(value, period)
        "SMA" => ta.sma(value, period)
        "RMA" => ta.rma(value, period)
        "WMA" => ta.wma(value, period)
        =>
            runtime.error("No matching MA type found.")
            float(na)

getSample(value, samples, type, period) =>
    float ma = switch samples
        0 => value
        1 => smooth(value, type, period)
        2 => smooth(smooth(value, type, period), type, period)
        3 => smooth(smooth(smooth(value, type, period), type, period), type, period)
        4 => smooth(smooth(smooth(smooth(value, type, period), type, period), type, period), type, period)

float takeProfit = input.float(7.5, "% Take profit", 0.8, 100, step = 0.1) 
float stopLoss = input.float(3.5, "% Stop Loss", 0.8, 100, step = 0.1) 
float magic = w2 * ta.cci(close, period) + w1 * (ta.rsi(close, period) - 50) + (1 - w2 - w1) * (ta.stoch(close, high, low, 40) - 50)
float sampledMagic = getSample(magic, oscillographSamplesCount, oscillographMAType, oscillographSamplesPeriod)
float lastUpperValue = 0
float lastLowerValue = 0

if (magic > 0)
    lastUpperValue := math.max(magic, magic[1])
else 
    lastUpperValue := math.max(0, lastUpperValue[1]) * redunant

    
if (magic <= 0)
    lastLowerValue := math.min(magic, magic[1])
else
    lastLowerValue := math.min(0, lastLowerValue[1]) * redunant

float level1up = getSample( (magic >= 0 ? magic : lastUpperValue) / 4, levelSampleCount, levelType, levelPeriod) + levelOffset
float level2up = getSample( (magic >= 0 ? magic : lastUpperValue) / 2, levelSampleCount, levelType, levelPeriod) + levelOffset
float level3up = getSample( magic >= 0 ? magic : lastUpperValue, levelSampleCount, levelType, levelPeriod) + levelOffset
float level4up = getSample( (magic >= 0 ? magic : lastUpperValue) * 2, levelSampleCount, levelType, levelPeriod) + levelOffset

float level1low = getSample( (magic <= 0 ? magic : lastLowerValue) / 4, levelSampleCount, levelType, levelPeriod) - levelOffset
float level2low = getSample( (magic <= 0 ? magic : lastLowerValue) / 2, levelSampleCount, levelType, levelPeriod) - levelOffset
float level3low = getSample( magic <= 0 ? magic : lastLowerValue, levelSampleCount, levelType, levelPeriod) - levelOffset
float level4low = getSample( (magic <= 0 ? magic : lastLowerValue) * 2, levelSampleCount, levelType, levelPeriod) - levelOffset

var transparent = color.new(color.white, 100)
var overbough4Color = color.new(color.red, 75)
var overbough3Color = color.new(color.orange, 75)
var overbough2Color = color.new(color.yellow, 75)

var oversold4Color = color.new(color.teal, 75)
var oversold3Color = color.new(color.blue, 75)
var oversold2Color = color.new(color.aqua, 85)

upperPlotId1 = plot(level1up, 'Upper1', transparent)
upperPlotId2 = plot(level2up, 'Upper2', transparent)
upperPlotId3 = plot(level3up, 'Upper3', transparent)
upperPlotId4 = plot(level4up, 'Upper4', transparent)

plot(sampledMagic, 'Oscillograph')

lowerPlotId1 = plot(level1low, 'Lower1', transparent)
lowerPlotId2 = plot(level2low, 'Lower2', transparent)
lowerPlotId3 = plot(level3low, 'Lower3', transparent)
lowerPlotId4 = plot(level4low, 'Lower4', transparent)

fill(upperPlotId4, upperPlotId3, overbough4Color)
fill(upperPlotId3, upperPlotId2, overbough3Color)
fill(upperPlotId2, upperPlotId1, overbough2Color)

fill(lowerPlotId4, lowerPlotId3, oversold4Color)
fill(lowerPlotId3, lowerPlotId2, oversold3Color)
fill(lowerPlotId2, lowerPlotId1, oversold2Color)

bool longCond = sampledMagic[1] < level4low[1] and sampledMagic > level4low
bool shortCond = sampledMagic[1] > level4up[1] and sampledMagic < level4up

plotshape(longCond, "Long", shape.circle, location.bottom, color.aqua, 0, na, color.white, false, size.tiny)
plotshape(shortCond, "Short", shape.circle, location.top, color.red, 0, na, color.white, false, size.tiny)



if longCond
    strategy.entry("Enter Long", strategy.long)
else if shortCond
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/363002

> Last Modified

2022-05-13 23:11:47
