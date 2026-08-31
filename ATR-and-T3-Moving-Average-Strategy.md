
> Name

ATR-and-T3-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview 

This strategy combines ATR and T3 moving average for trend determination and tracking. ATR forms price channels to judge overall trend direction. T3 moving average gives entry signals and stop loss exit points. The strategy suits trend followers seeking steady profits.

## Strategy Logic

1. ATR forms price channels, channel direction determines main trend. 

2. T3 moving average helps determine specific entry timing, buying on price breaking T3 line.

3. Price breaking below lower band triggers stop loss exit; breaking above upper band takes profit.

4. Options for long-only or dual directional trading.

5. Parameter optimization combined with indicator nature to find optimal settings.

## Advantage Analysis

1. ATR channels give clear trend identification and direction.

2. Adjustable T3 parameters for capturing trends on different levels.

3. Consistent stop loss and take profit rules avoid arbitrary exits. 

4. Low trade frequency suits long-term holding strategies.

## Risk Analysis

1. Indicator divergence can cause wrong trades.

2. Not considering individual stock volatility patterns risks overfitting.

3. Low trade frequency risks missing opportunities and limited profit potential.

4. Heavy position holding brings end-of-day slippage risks.

## Optimization Directions

1. Add other indicators to ensure trade validity.

2. Parameter tuning for different products improves adaptability.

3. Optimize position sizing to balance frequency and risk.

4. Consider dynamic trailing stop loss and profit taking to expand profit room.

5. Add strategy-level FILTERS to improve robustness.

## Summary

The strategy integrates ATR and T3 moving average for simple and effective trend tracking. But further enhancements in indicator logic and parameter optimization can lower errors and make it more practical.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|shorts on?|
|v_input_2|5|Precantage|
|v_input_3|25|Lenght of T3|
|v_input_4|0.72|Volume Factor of T3 with HA source|
|v_input_5|5|Factor|
|v_input_6|5|Pd|
|v_input_7|true|Factor1|
|v_input_8|true|Pd1|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-09 00:00:00
end: 2023-09-16 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//Author - CryptoJoncis
strategy("ATR and T3 strategy", shorttitle="AT3S_CryptoJoncis", overlay=true)

shorting = input(false, title="shorts on?")
precentage_diff = input(5,title="Precantage")/100
Lengthx = input(25, title="Lenght of T3")

//For best results use 0.7 or 0.618
Vfactx = input(0.72, minval=0.01,step=0.01, title="Volume Factor of T3 with HA source")

Source_of_T3_Normal = close
Source_of_T3 =  Source_of_T3_Normal 
FirstEMAx = ema(Source_of_T3, Lengthx)
SecondEMAx = ema(FirstEMAx, Lengthx)
ThirdEMAx = ema(SecondEMAx, Lengthx)
FourthEMAx = ema(ThirdEMAx, Lengthx)
FifthEMAx = ema(FourthEMAx, Lengthx)
SixthEMAx = ema(FifthEMAx, Lengthx)

//Doing all the calculations which are from 
c1x = -Vfactx*Vfactx*Vfactx
c2x = 3*Vfactx*Vfactx + 3*Vfactx*Vfactx*Vfactx
c3x = -6*Vfactx*Vfactx -3*Vfactx -3*Vfactx*Vfactx*Vfactx
c4x = 1 + 3*Vfactx + Vfactx*Vfactx*Vfactx + 3*Vfactx*Vfactx

//Assigning EMAS to T3 Moving average
T3MAx = c1x * SixthEMAx + c2x * FifthEMAx + c3x * FourthEMAx + c4x * ThirdEMAx

color_of_Tilson_Moving_Average = T3MAx > T3MAx[1] ? lime : red
plot(T3MAx, title="Tilson Moving Average(ema)", color=color_of_Tilson_Moving_Average)

t_up = T3MAx + (T3MAx * precentage_diff)
t_dn = T3MAx - (T3MAx * precentage_diff)

x=plot(t_up, color=color_of_Tilson_Moving_Average)
z=plot(t_dn, color=color_of_Tilson_Moving_Average)
fill(x,z, color= T3MAx[1] < T3MAx ? lime : gray)

Factor=input(5, minval=1)
Pd=input(5, minval=1)
//

Up=hl2-(Factor*atr(Pd))
Dn=hl2+(Factor*atr(Pd))


TrendUp=close[1]>TrendUp[1]? max(Up,TrendUp[1]) : Up
TrendDown=close[1]<TrendDown[1]? min(Dn,TrendDown[1]) : Dn

Trend = close > TrendDown[1] ? 1: close< TrendUp[1]? -1: nz(Trend[1],1)
Tsl = Trend==1? TrendUp: TrendDown

linecolor = Trend == 1 ? green : red
//
b=plot(Tsl, color = linecolor , style = line , linewidth = 2,title = "")

Factor1=input(1, minval=1)
Pd1=input(1, minval=1)
//

Up1=hl2-(Factor1*atr(Pd1))
Dn1=hl2+(Factor1*atr(Pd1))


TrendUp1=close[1]>TrendUp1[1]? max(Up1,TrendUp1[1]) : Up1
TrendDown1=close[1]<TrendDown1[1]? min(Dn1,TrendDown1[1]) : Dn1

Trend1 = close > TrendDown1[1] ? 1: close< TrendUp1[1]? -1: nz(Trend1[1],1)
Tsl1 = Trend1==1? TrendUp1: TrendDown1

linecolor1 = Trend1 == 1 ? green : red
//
a=plot(Tsl1, color = linecolor1 , style = line , linewidth = 2,title = "")

long = (close > Tsl and close > Tsl1 and close > T3MAx)

short = (close < Tsl and close < Tsl1 and close < T3MAx)

if(shorting==true)
    strategy.entry("MacdSE", strategy.short, comment="Open Short", when=short)
    strategy.entry("MacdLE", strategy.long, comment="Open Long", when=long)
    strategy.close("MacdLE", when=hl2 < t_dn)
    strategy.close("MacdSE", when=hl2 > t_up)
if(shorting==false)
    strategy.entry("MacdLE", strategy.long, comment="Open Long", when=long)
    strategy.close("MacdLE", when=hl2 < t_dn)
fill(a,b,color=linecolor)


```

> Detail

https://www.fmz.com/strategy/427067

> Last Modified

2023-09-17 18:30:48
