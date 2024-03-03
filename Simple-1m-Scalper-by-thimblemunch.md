
> Name

Simple-1m-Scalper-by-thimblemunch

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|STC Length|
|v_input_2|26|STC FastLength|
|v_input_3|50|STC SlowLength|
|v_input_4|21|Trend Length|
|v_input_5|3|Trend Multiplyer|


> Source (PineScript)

``` pinescript
//@version=4
study(title='Simple 1m Scalper by thimblemunch', shorttitle='Simple 1m Scalper', overlay=true)

// STC
EEEEEE = input(12, 'STC Length')
BBBB = input(26, 'STC FastLength')
BBBBB = input(50, 'STC SlowLength')

AAAA(BBB, BBBB, BBBBB) =>
    fastMA = ema(BBB, BBBB)
    slowMA = ema(BBB, BBBBB)
    AAAA = fastMA - slowMA
    AAAA

AAAAA(EEEEEE, BBBB, BBBBB) =>
    AAA = 0.5
    var CCCCC = 0.0
    var DDD = 0.0
    var DDDDDD = 0.0
    var EEEEE = 0.0
    BBBBBB = AAAA(close, BBBB, BBBBB)
    CCC = lowest(BBBBBB, EEEEEE)
    CCCC = highest(BBBBBB, EEEEEE) - CCC
    CCCCC := CCCC > 0 ? (BBBBBB - CCC) / CCCC * 100 : nz(CCCCC[1])
    DDD := na(DDD[1]) ? CCCCC : DDD[1] + AAA * (CCCCC - DDD[1])
    DDDD = lowest(DDD, EEEEEE)
    DDDDD = highest(DDD, EEEEEE) - DDDD
    DDDDDD := DDDDD > 0 ? (DDD - DDDD) / DDDDD * 100 : nz(DDDDDD[1])
    EEEEE := na(EEEEE[1]) ? DDDDDD : EEEEE[1] + AAA * (DDDDDD - EEEEE[1])
    EEEEE

mAAAAA = AAAAA(EEEEEE, BBBB, BBBBB)
mColor = mAAAAA > mAAAAA[1] ? color.new(color.green, 20) : color.new(color.red, 20)


if mAAAAA[3] <= mAAAAA[2] and mAAAAA[2] > mAAAAA[1] and mAAAAA > 75
    alert("Red", alert.freq_once_per_bar)
if mAAAAA[3] >= mAAAAA[2] and mAAAAA[2] < mAAAAA[1] and mAAAAA < 25
    alert("Green", alert.freq_once_per_bar)

 
// TREND TRADER
Length = input(21, 'Trend Length', minval=1),
Multiplier = input(3, 'Trend Multiplyer', minval=0.000001)
avgTR      = wma(atr(1), Length)
highestC   = highest(Length)
lowestC    = lowest(Length)
hiLimit = highestC[1]-(avgTR[1] * Multiplier)
loLimit = lowestC[1]+(avgTR[1] * Multiplier)
ret = 0.0
pos = 0.0
ret:= iff(close > hiLimit and close > loLimit, hiLimit,
       iff(close < loLimit and close < hiLimit, loLimit, nz(ret[1], close)))
pos:= iff(close > ret, 1,
	   iff(close < ret, -1, nz(pos[1], 0))) 
barcolor(pos == -1 ? color.red: pos == 1 ? color.green : color.blue )


// EMA
em = ema(close, 200)
plot(em, color = color.white, title="EMA Color")

priceCrossUp = crossover(close, ret)
priceCrossDown = crossover(ret, close)
secretSauceLong = close > em and pos == 1 and mAAAAA > mAAAAA[1] and priceCrossUp
secretSauceShort = close < em and pos == -1 and mAAAAA < mAAAAA[1] and priceCrossDown

plotshape(secretSauceLong, title="Buy", text="Buy", color=#2e86de, style=shape.labelup, location=location.belowbar, size=size.small, textcolor=#FFFFFF, transp = 0)
plotshape(secretSauceShort, title="Sell", text="Sell", color=#ff6b6b, style=shape.labeldown, location=location.abovebar, size=size.small, textcolor=#FFFFFF, transp = 0)

alertcondition(secretSauceLong, 'Long', 'Long Alert')
alertcondition(secretSauceShort, 'Short', 'Short Alert')
if secretSauceLong
   strategy.entry("buy", strategy.long)
else if secretSauceShort
    strategy.entry("sell", strategy.short)
```

> Detail

https://www.fmz.com/strategy/380007

> Last Modified

2022-08-25 19:55:23
