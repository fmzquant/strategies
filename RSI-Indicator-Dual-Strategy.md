
> Name

RSI-Indicator-Dual-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses the Relative Strength Index (RSI) indicator to determine overbought and oversold levels for shorts and longs. It is a typical RSI reversal trading strategy. The strategy also incorporates parameter optimization, stop losses etc. to adapt to different market conditions.

## Strategy Logic

The core logic includes:

1. Calculating the RSI value
2. Setting RSI upper and lower limits  
3. Going short when RSI crosses above upper limit
4. Going long when RSI crosses below lower limit
5. Setting take profit and stop loss levels
6. Exiting positions when RSI reverses or take profit/stop loss is hit

The RSI indicator shows overbought above 70 and oversold below 30 market conditions. The strategy utilizes this classic logic to determine long/short entries based on RSI value against preset limits. Customizable parameters also allow optimizing limits, stop loss etc. for market adaptation.

## Advantages

- RSI effectively identifies overbought/oversold market states
- RSI has sound theoretical basis  
- Customizable parameters adapt across instruments and conditions
- Incorporated take profit/stop loss controls risk

## Risks and Mitigation

- Potential for false RSI signals leading to losses
- Require continuous optimization of RSI levels 
- Stops can be hit frequently during choppy price action

Mitigations:

1. Additional factors to confirm signals and avoid false ones
2. Optimize RSI levels based on instrument characteristics  
3. Adjust stop loss placement to reduce whipsaw risks

## Enhancement Opportunities

The strategy can be enhanced through:

1. Machine learning for auto RSI level optimization

2. Volume confirmation to avoid false breakouts 

3. Additional factors like moving averages for multi-factor confirmation

4. Adaptive stops based on market volatility

5. Volume analysis for gauging fund inflows/outflows

6. Combining with non-correlated strategies to lower portfolio drawdown

## Conclusion

This is a simple and practical mean reversion strategy using RSI for overbought/oversold detection. Customizable parameters allow adaptation to changing markets. Enhancements like adaptive stops, multi-factor confirmation, and parameter optimization can make the strategy more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2011|Backtest Start Year|
|v_input_2|8|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2018|Backtest Stop Year|
|v_input_5|9|Backtest Stop Month|
|v_input_6|29|Backtest Stop Day|
|v_input_7|true|Color Background?|
|v_input_8|4|Length|
|v_input_9|5|rsin|
|v_input_10|99999|Trailing Stop|
|v_input_11|15|Take Profit|
|v_input_12|23|Stop Loss|
|v_input_13|true|Pyramiding|
|v_input_14|true|Leverage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("4All V3", shorttitle="Strategy", overlay=true)

/////////////// Component Code Start ///////////////
testStartYear = input(2011, "Backtest Start Year") 
testStartMonth = input(8, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2018, "Backtest Stop Year")
testStopMonth = input(9, "Backtest Stop Month")
testStopDay = input(29, "Backtest Stop Day")
// testStopDay = testStartDay + 1
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=97)

testPeriod() => true
/////////////// Component Code Stop ///////////////

src = close
len = input(4, minval=1, title="Length")

up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))

rsin = input(5)
sn = 100 - rsin
ln = 0 + rsin

/////////////// STRATEGY ///////////////
ts = input(99999, "Trailing Stop") / 10000
tp = input(15, "Take Profit") / 10000
sl = input(23, "Stop Loss") / 10000

pyr = input(1, "Pyramiding")

short = crossover(rsi, sn)
long = crossunder(rsi, ln)

totalLongs = 0
totalLongs := nz(totalLongs[1])
totalShorts = 0
totalShorts := nz(totalShorts[1])

totalLongsPrice = 0
totalLongsPrice := nz(totalLongsPrice[1])
totalShortsPrice = 0
totalShortsPrice := nz(totalShortsPrice[1])

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

longCondition = long and sectionLongs >= pyr
shortCondition = short and sectionShorts >= pyr

last_long = na
last_short = na
last_long := longCondition ? time : nz(last_long[1])
last_short := shortCondition ? time : nz(last_short[1])

long_signal = crossover(last_long, last_short)
short_signal = crossover(last_short, last_long)

last_open_long_signal = na
last_open_short_signal = na
last_open_long_signal := long_signal ? open : nz(last_open_long_signal[1])
last_open_short_signal := short_signal ? open : nz(last_open_short_signal[1])

last_long_signal = na
last_short_signal = na
last_long_signal := long_signal ? time : nz(last_long_signal[1])
last_short_signal := short_signal ? time : nz(last_short_signal[1])

in_long_signal = last_long_signal > last_short_signal
in_short_signal = last_short_signal > last_long_signal

last_high = na
last_low = na
last_high := not in_long_signal ? na : in_long_signal and (na(last_high[1]) or high > nz(last_high[1])) ? high : nz(last_high[1])
last_low := not in_short_signal ? na : in_short_signal and (na(last_low[1]) or low < nz(last_low[1])) ? low : nz(last_low[1])

long_ts = not na(last_high) and high <= (last_high - ts) //and high >= last_open_long_signal
short_ts = not na(last_low) and low >= (last_low + ts) //and low <= last_open_short_signal

long_tp = high >= (last_open_long_signal + tp)
short_tp = low <= (last_open_short_signal - tp)

long_sl = low <= (last_open_long_signal - sl)
short_sl = high >= (last_open_short_signal + sl)

leverage = input(1, "Leverage")
long_call = last_open_long_signal - (0.8 + 0.2 * (1/leverage)) / leverage * last_open_long_signal
short_call = last_open_short_signal + (0.78 + 0.2 * (1/leverage)) / leverage * last_open_short_signal
long_call_signal = low <= long_call
short_call_signal = high >= short_call

if testPeriod()
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
```

> Detail

https://www.fmz.com/strategy/427292

> Last Modified

2023-09-19 19:43:19
