
> Name

HMA-and-CCI-Combo-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description


This strategy combines HMA and CCI to identify and trade trends. Specifically, it goes long when HMA breaks upwards and CCI crosses above lower band, and goes short when HMA breaks downwards and CCI crosses below upper band. Exits occur when HMA breaks back in opposite direction, or CCI re-enters threshold range.

The advantage of this strategy is using HMA to determine trend direction, and CCI to confirm trend start, effectively reducing whipsaws and pullback errors. However, both HMA and CCI have lagging issues, potentially missing optimal entry points. Also, CCI has limited capabilities in complex market situations.

In summary, the HMA and CCI combo trend following strategy can produce decent results during strong trending phases. But in live trading, attention is still needed on stop loss to cut losses from LIQR events. Only with proper parameter optimization can this strategy be applied successfully in the long run.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|21|hmaLen|
|v_input_3|10|cciLen|
|v_input_4|-50|cciLower|
|v_input_5|50|cciUpper|
|v_input_6|-100|cciLowerExit|
|v_input_7|100|cciUpperExit|
|v_input_8|false|hmaExit|
|v_input_9|true|cciExit|
|v_input_10|2017|From Year|
|v_input_11|2100|To Year|
|v_input_12|true|From Month|
|v_input_13|12|To Month|
|v_input_14|21|From day|
|v_input_15|31|To day|
|v_input_16|100|leverage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-11 00:00:00
end: 2023-09-10 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("HMA+CCI strategy", overlay=true)

src = input(close)
hmaLen = input(21)
cciLen = input(10)
cciLower = input(-50)
cciUpper = input(50)
cciLowerExit = input(-100)
cciUpperExit = input(100)
hmaExit = input(false)
cciExit = input(true)
//rciLower = input(-60)
//rciUpper = input(60)

// Backtest
fromyear = input(2017, defval = 2018, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(21, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

leverage = input(100)

term = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59))

//itvs = input(9, "short interval")
//itvm = input(36, "middle interval")
//itvl = input(52, "long interval")
//src = input(close, "source")
//upperband=input(title="High line[%]",defval=80,type=integer)
//lowerband=input(title="Low line[%]",defval=-80,type=integer)

ord(seq, idx, itv) =>
    p = seq[idx]
    o = 1
    for i = 0 to itv - 1
        if p < seq[i]
            o := o + 1
    o

d(itv) =>
    sum = 0.0
    for i = 0 to itv - 1
        sum := sum + pow((i + 1) - ord(src, i, itv), 2)
    sum

rci(itv) => (1.0 - 6.0 * d(itv) / (itv * (itv * itv - 1.0))) * 100.0

hullma = wma(2*wma(src, hmaLen/2)-wma(src, hmaLen), round(sqrt(hmaLen)))
cci = cci(close, cciLen)
plot(hullma, color=hullma[1]>hullma?red:green, linewidth=4)
longCondition = hullma[1] < hullma and crossover(cci, cciLower) //rci < -60 // crossover(cci, cciLower)
shortCondition = hullma[1] > hullma and crossunder(cci, cciUpper) //rci > 60
exitLong1 = hmaExit ? hullma[1] > hullma : false
exitLong2 = cciExit ? cci > cciUpperExit : false
exitShort1 = hmaExit ? hullma[1] < hullma : false
exitShort2 = cciExit ? cci < cciLowerExit : false

if (longCondition and term)
    strategy.entry("Long",  strategy.long )
if (shortCondition and term)
    strategy.entry("Short",  strategy.short)
        
if strategy.position_size > 0 and term
    if (exitLong1 or exitLong2)
        strategy.close_all()
if strategy.position_size < 0 and term
    if (exitShort1 or exitShort2)
        strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/426363

> Last Modified

2023-09-11 15:02:37
