
> Name

Trend-Following-Strategy-Based-on-Price-Friction-Zones

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy measures price dwell time in different zones to identify low friction areas, and trades breakouts in these zones. It belongs to trend following strategies.

## Strategy Logic

1. Calculate price dwell ratio around current levels over past N periods as price friction.

2. Identify if price enters low friction zones with minimal dwell time recently.

3. Use fast weighted MA to determine recent trend direction. Trade breakouts in low friction zones along trend.

4. Take profit when price re-enters high friction zones anticipating trend reversal.

5. Customizable parameters including friction lookback, breakout zone etc.

## Advantages

1. Price friction avoids ranging markets and finds trend outbreak zones.

2. Fast MA combines with friction to determine direction.

3. Intuitive visuals displaying price friction levels.

4. Default parameters optimized for crypto high frequency trading.

5. Simple and clear logic easy to comprehend and customize.

## Risks 

1. Price friction unable to fully predict future moves.

2. Fast MA may produce inaccurate timing.

3. Ineffective smoothing into and out of trades.

4. Optimization risks overfitting.

5. Fixed parameters may underperform in volatile markets.

## Enhancement

1. Test different periods to calculate price friction.

2. Evaluate different MA types to determine recent trend.

3. Optimize breakout zone parameters for higher stability. 

4. Add stop loss and take profit for risk management.

5. Consider dynamic parameters to adapt to changing markets.

6. Backtest across more symbols and timeframes.

## Conclusion

This strategy trades price friction zones with high probability breakout potential, with pros and cons. Enhancements like dynamic optimization and risk management can make it more robust and efficient.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|500|bars back to measure friction|
|v_input_2|50|0-100 friction level to stop trade|
|v_input_3|-10|pic lower than 0 to number selected above to initiate trade|
|v_input_4|100|bars back to measure lowest friction|
|v_input_5_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|2|leverage|
|v_input_7|true|enable shorts?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//made for 30m chart with BTCUSD or other cryptocurrency
strategy("LUBE",overlay=false )
friction=0.0
barsback=input(500,"bars back to measure friction",step=100)
flevel=input(50,"0-100 friction level to stop trade",step=2)
tlevel=input(-10,"pic lower than 0 to number selected above to initiate trade",step=2)
fl=flevel/100
tl=tlevel/100

for i = 1 to barsback
    friction := if high[i] >= close and low[i] <= close 
        friction+(1+barsback)/(i+barsback)
    else
        friction

range=input(100,"bars back to measure lowest friction",step=10)
lowf = lowest(friction,range)
highf = highest(friction,range)
midf = (lowf*(1-fl)+highf*fl)
lowf2 = (lowf*(1-tl)+highf*tl)
plot(friction)
m=plot(midf[5],color=color.red)
l=plot(lowf2[5],color=color.white)
h=plot(highf[5],color=color.white)
fill(l,h,color.white)

src = input(title="Source", type=input.source, defval=close)

//FIR Filter
_fir(src) =>
    (4 * src + 3 * nz(src[1]) + 2 * nz(src[2]) + nz(src[3])) / 10

fir = _fir(src)

trend =  fir > fir[1]? 1:-1

//bgcolor(trend==1?color.lime:color.red,transp=50)

long=friction<lowf2[5] and trend == 1
short=friction<lowf2[5] and trend == -1
end=friction > midf[5]

keeplong=0
keeplong:=long?1:nz(keeplong[1])
keeplong:=short or end?0:keeplong

keepshort=0
keepshort:=short?1:nz(keepshort[1])
keepshort:=long or end?0:keepshort

bgcolor(keeplong==1?color.lime:keepshort==1?color.red:na,transp=50)

leverage=input(2,"leverage",step=.5)
enableshort=input(true,"enable shorts?")

barcount=0
barcount:=nz(barcount[1])+1

contracts=min(max(.000001,(strategy.equity/close)*leverage),50000)
strategy.entry("Long",strategy.long,when=long and barcount>20, qty=contracts)

strategy.close("Long",when=short or end )

strategy.entry("Short",strategy.short,when=short and enableshort==true and barcount>20, qty=contracts)

strategy.close("Short",when=(long or end) and enableshort==true)

alertcondition(keeplong==1 and keeplong[1]==0,"LONG")
alertcondition(keepshort==1 and keepshort[1]==0,"SHORT")
alertcondition((keeplong[1]==1 or keepshort[1]==1) and (keeplong==0 and keepshort==0),"CLOSE TRADE")

```

> Detail

https://www.fmz.com/strategy/427391

> Last Modified

2023-09-20 16:46:17
