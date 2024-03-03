
> Name

Combo-2-20-EMA-Bandpass-Filter

> Author

ChaoZhang

> Strategy Description

This is combo strategies for get a cumulative signal.

First strategy
This indicator plots 2/20 exponential moving average . For the Mov
Avg X 2/20 Indicator, the EMA bar will be painted when the Alert criteria is met.

Second strategy
The related article is copyrighted material from
Stocks & Commodities Mar 2010

WARNING:
- For purpose educate only
- This script to change bars colors.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/673e6d06beb426fb01.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|(?●═════ 2/20 EMA ═════●)Length|
|v_input_int_2|20|(?●═════ Bandpass Filter  ═════●)LengthBPF|
|v_input_1|0.5|Delta|
|v_input_float_1|5|SellZone|
|v_input_float_2|-5|BuyZone|
|v_input_bool_1|false|(?●═════ MISC ═════●)Trade reverse|
|v_input_int_3|true|(?●═════ Time Start ═════●)From Day|
|v_input_int_4|true|From Month|
|v_input_int_5|2005|From Year|


> Source (PineScript)

``` pinescript
//@version=5
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 05/04/2022
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This indicator plots 2/20 exponential moving average. For the Mov 
// Avg X 2/20 Indicator, the EMA bar will be painted when the Alert criteria is met.
//
// Second strategy
// The related article is copyrighted material from
// Stocks & Commodities Mar 2010
//
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
EMA20(Length) =>
    pos = 0.0
    xPrice = close
    xXA = ta.ema(xPrice, Length)
    nHH = math.max(high, high[1])
    nLL = math.min(low, low[1])
    nXS = nLL > xXA or nHH < xXA ? nLL : nHH
    iff_1 = nXS < close[1] ? 1 : nz(pos[1], 0)
    pos := nXS > close[1] ? -1 : iff_1
    pos


BPF(Length,Delta,SellZone,BuyZone) =>
    pos = 0.0
    xPrice = hl2
    beta = math.cos(3.14 * (360 / Length) / 180)
    gamma = 1 / math.cos(3.14 * (720 * Delta / Length) / 180)
    alpha = gamma - math.sqrt(gamma * gamma - 1)
    BP = 0.0
    BP := 0.5 * (1 - alpha) * (xPrice - xPrice[2]) + beta * (1 + alpha) * nz(BP[1]) - alpha * nz(BP[2])
    pos:= BP > SellZone ? 1 :
    	   BP <= BuyZone? -1 : nz(pos[1], 0) 
    pos

strategy(title='Combo 2/20 EMA & Bandpass Filter', shorttitle='Combo', overlay=true)
var I1 = '●═════ 2/20 EMA ═════●'
Length = input.int(14, minval=1, group=I1)
var I2 = '●═════ Bandpass Filter  ═════●'
LengthBPF = input.int(20, minval=1, group=I2)
Delta = input(0.5, group=I2)
SellZone = input.float(5, step = 0.01, group=I2)
BuyZone = input.float(-5, step = 0.01, group=I2)
var misc = '●═════ MISC ═════●'
reverse = input.bool(false, title='Trade reverse', group=misc)
var timePeriodHeader = '●═════ Time Start ═════●'
d = input.int(1, title='From Day', minval=1, maxval=31, group=timePeriodHeader)
m = input.int(1, title='From Month', minval=1, maxval=12, group=timePeriodHeader)
y = input.int(2005, title='From Year', minval=0, group=timePeriodHeader)
StartTrade = time > timestamp(y, m, d, 00, 00) ? true : false
posEMA20 = EMA20(Length)
prePosBPF = BPF(LengthBPF,Delta,SellZone,BuyZone)
iff_1 = posEMA20 == -1 and prePosBPF == -1 and StartTrade ? -1 : 0
pos = posEMA20 == 1 and prePosBPF == 1 and StartTrade ? 1 : iff_1
iff_2 = reverse and pos == -1 ? 1 : pos
possig = reverse and pos == 1 ? -1 : iff_2
if possig == 1
    strategy.entry('Long', strategy.long)
if possig == -1
    strategy.entry('Short', strategy.short)
if possig == 0
    strategy.close_all()
//barcolor(possig == -1 ? #b50404 : possig == 1 ? #079605 : #0536b3)
```

> Detail

https://www.fmz.com/strategy/362638

> Last Modified

2022-05-12 16:09:47
