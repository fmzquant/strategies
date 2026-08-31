
> Name

一目均衡策略Ichimoku-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

The Ichimoku Breakout strategy utilizes the concept of moving averages and uses the relationship between Ichimoku lines and price to determine the trend direction. It belongs to the trend following strategy. It goes long when the price breaks above the lines and goes short when the price breaks below the lines, following the trend.

## Principle Analysis

The core of this strategy is based on the theory of Ichimoku lines. It uses the `donchian()` function to calculate the average of highest high and lowest low over a certain period as the equilibrium line. It then judges if the price breaks through this line to generate trading signals. 

Specifically, the strategy first calculates the Tenkan Line (`TS`) using the `Ten` period, as a reference line. When the price breaks above the line, it is considered a trending move and generates a long signal. When the price breaks below the line, it is considered as trend reversal and generates a short signal.

In addition, the strategy calculates the Kijun Line (`KS`) using the `Kij` period. Together with the `TS` line, it acts as a filter to avoid false signals. Only when `TS` crosses above `KS` will a long signal be triggered.

The code also plots the Ichimoku Cloud to assist with trend direction judgement. The Chikou Line is calculated to determine its relationship with price as an auxiliary condition.

## Advantage Analysis

- Uses moving average to determine trend, simple and easy to understand
- Ichimoku Cloud provides additional reference to improve accuracy
- Chikou Line further filters signals as auxiliary condition 
- Flexible adjustment available with different parameter combinations

## Risk Analysis

- Moving average strategy is sensitive to parameters, different periods can produce varied results
- Pure trend following unable to judge trend vs range, risks of losses exist
- Poor handling of consolidation periods, prone to wrong signals
- Cloud judgement unstable, may mislead

Consider combining with momentum indicators like MACD for trend strength. Adopt multiple moving average system to improve stability. Or incorporate stop loss to control risk.

## Optimization Directions

- Add momentum indicators to determine trend strength
- Consider multiple moving average system, e.g. golden cross
- Add channel and volatility indicators to detect ranges
- Optimize parameters to find best period combination
- Incorporate stop loss strategy to limit loss per trade

## Conclusion

The Ichimoku Breakout Strategy is relatively simple and straightforward, suitable for beginners to understand trend using moving averages. It can also be expanded with multiple indicators for enriched systems. However, its practical performance requires further verification and optimization before applying in live trading, especially in risk control. The key is to apply it wisely based on market conditions, and not blindly follow the lines.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|18|Tenkan|
|v_input_2|52|Kijun|
|v_input_3|104|Senkou B|
|v_input_4|52|Senkou A|
|v_input_5|52|Span Offset|
|v_input_6|true|Show Tenkan|
|v_input_7|true|Show Kijun|
|v_input_8|true|Show Span A|
|v_input_9|true|Show Span B|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-10-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy(title="Ichimoku Crypto Breakout", shorttitle="Ichimoku Breakout", overlay=true)

Ten = input(18, minval=1, title="Tenkan")
Kij = input(52, minval=1, title="Kijun")
LeadSpan = input(104, minval=1, title="Senkou B")
Displace = input(52, minval=1, title="Senkou A")
SpanOffset = input(52, minval=1, title="Span Offset")

sts = input(true, title="Show Tenkan")
sks = input(true, title="Show Kijun")
ssa = input(true, title="Show Span A")
ssb = input(true, title="Show Span B")

source = close

//Script for Ichimoku Indicator
donchian(len) => avg(lowest(len), highest(len))
TS = donchian(Ten)
KS = donchian(Kij)
SpanA = avg(TS, KS)
SpanB = donchian(LeadSpan)

CloudTop = max(TS, KS)

Chikou = source[Displace]
SpanAA = avg(TS, KS)[SpanOffset]
SpanBB = donchian(LeadSpan)[SpanOffset]

//Kumo Breakout (Long)
SpanA_Top = SpanAA >= SpanBB ? 1 : 0
SpanB_Top = SpanBB >= SpanAA ? 1 : 0

SpanA_Top2 = SpanA >= SpanB ? 1 : 0
SpanB_Top2 = SpanB >= SpanA ? 1 : 0

SpanA1 = SpanA_Top2 ? SpanA : na
SpanA2 = SpanA_Top2 ? SpanB : na

SpanB1 = SpanB_Top2 ? SpanA : na
SpanB2 = SpanB_Top2 ? SpanB : na

//plot for Tenkan and Kijun (Current Timeframe)
p1= plot(sts and TS ? TS : na, title="Tenkan", linewidth = 2, color = gray)
p2 = plot(sks and KS ? KS : na, title="Kijun", linewidth = 2, color = black)
p5 = plot(close, title="Chikou", linewidth = 2, offset=-Displace, color = orange)

//Plot for Kumo Cloud (Dynamic Color)
p3 = plot(ssa and SpanA ? SpanA : na, title="SpanA", linewidth=2, offset=Displace, color=green)
p4 = plot(ssb and SpanB ? SpanB : na, title="SpanB", linewidth=2, offset=Displace, color=red)

p8 = plot(ssa and SpanA1 ? SpanA1 : na, title="Span A1 above", style=linebr, linewidth=1, offset=Displace, color=green)
p9 = plot(ssa and SpanA2 ? SpanA2 : na, title="Span A2 above", style=linebr, linewidth=1, offset=Displace, color=green)
p10 = plot(ssb and SpanB1 ? SpanB1 : na, title="Span B1 above", style=linebr, linewidth=1, offset=Displace, color=red)
p11 = plot(ssb and SpanB2 ? SpanB2 : na, title="Span B2 above", style=linebr, linewidth=1, offset=Displace, color=red)

fill(p8, p9, color = lime, transp=70, title="Kumo Cloud Up")
fill (p10, p11, color=red, transp=70, title="Kumo Cloud Down")

LongSpan = (SpanA_Top and source[1] < SpanAA[1] and source > SpanAA) or (SpanB_Top and source[1] < SpanBB[1] and source > SpanBB) ? 1 : 0
cupSpan = LongSpan  == 1 ? LongSpan : 0

//Kumo Breakout (Long)
//plotarrow(cupSpan, title="Kumo Breakout Long", colorup=green, maxheight=50)

//Kumo Breakout (Long) Alerts
Long_Breakout = (SpanA_Top ==1 and crossover(source, SpanAA)) or (SpanB_Top ==1 and crossover(source, SpanBB))
//Long_Breakout = ((SpanA_Top ==1 and crossover(KS, SpanAA)) or (SpanB_Top ==1 and crossover(KS, SpanBB))) and TS >= KS
//alertcondition(Long_Breakout, title="Kumo Breakout Long", message="Kumo Long")

//Kumo Breakout (Short)
ShortSpan = (SpanB_Top and source[1] > SpanAA[1] and source < SpanAA) or (SpanA_Top and source[1] > SpanBB[1] and source < SpanBB) ? 1 : 0
cdnSpan = ShortSpan == 1 ? ShortSpan : 0

//Kumo Breakout (Short)
//plotarrow(cdnSpan*-1, title="Kumo Breakout Short", colordown=red, maxheight=50)

//Kumo Breakout (Short) Alerts
Short_Breakout = (SpanA_Top ==1 and crossunder(source, SpanBB)) or (SpanB_Top ==1 and crossunder(source, SpanAA))
//alertcondition(Short_Breakout, title="Kumo Breakout Short", message="Kumo Short")

//Kumo Twist
Kumo_Twist_Long = SpanA[1] < SpanB[1] and SpanA > SpanB ? 1 : 0
Kumo_Twist_Short = SpanA[1] > SpanB[1] and SpanA < SpanB ? 1 : 0

cupD = Kumo_Twist_Long == 1 ? Kumo_Twist_Long : 0
cdnD = Kumo_Twist_Short == 1 ? Kumo_Twist_Short : 0

//Kumo Twist (Long/Short)
//plotarrow(cupD, title="Kumo Twist Long", colorup=green, maxheight=50)
//plotarrow(cdnD*-1, title="Kumo Twist Short", colordown=red, maxheight=50)

//Kumo Twist (Long/Short) Alerts
KumoTwistLong_Cross = crossover(SpanA, SpanB)
//alertcondition(KumoTwistLong_Cross, title="Kumo Twist Long", message="Kumo Twist Long")
KumoTwistShort_Cross = crossunder(SpanA, SpanB)
//alertcondition(KumoTwistShort_Cross, title="Kumo Twist Short", message="Kumo Twist Short")

//Kumo Twist (Long/Short) - Bar Color
BarColor = Kumo_Twist_Long ? green : Kumo_Twist_Short ? red : na
barcolor(BarColor)

//Chikou above/below Price
Chikou_Above = close > Chikou
Chikou_Below = close < Chikou

//Kumo Twist (Long/Short) - Plot Character on location of Chikou to Price & Price to Kumo
//plotchar(Kumo_Twist_Long and Chikou_Above, title="Kumo Twist Long and Chikou above Price", char="A", location=location.abovebar, color=green)
//plotchar(Kumo_Twist_Long and Chikou_Below, title="Kumo Twist Long and Chikou below Price", char="B", location=location.abovebar, color=red)
//plotchar(Kumo_Twist_Short and Chikou_Above, title="Kumo Twist Short and Chikou above Price", char="A", location=location.belowbar, color=green)
//plotchar(Kumo_Twist_Short and Chikou_Below, title="Kumo Twist Short and Chikou below Price", char="B", location=location.belowbar, color=red)

//Base and Conversion Line Cross
//long = cross(TS, KS) and TS>KS

long = (cross(TS, SpanA) or cross(TS, SpanB)) and TS>SpanA and TS>SpanB and TS>=KS
short = cross(TS, KS) and KS >= TS

strategy.entry("long", strategy.long, when=Long_Breakout)
strategy.entry("short", strategy.short, when=Short_Breakout)
//strategy.exit("bracket", when=short)
```

> Detail

https://www.fmz.com/strategy/429159

> Last Modified

2023-10-13 16:48:22
