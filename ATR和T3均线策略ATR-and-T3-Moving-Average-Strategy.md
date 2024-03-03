
> Name

ATR和T3均线策略ATR-and-T3-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略结合ATR指标和T3均线进行趋势判断和跟踪。ATR实现价格通道划分,判断大趋势方向。T3均线进行入场定位和止损出场判定。策略适合追求稳定盈利的趋势追随者。

## 策略原理

1. ATR指标构建价格通道,通道方向判断主趋势方向。

2. T3均线辅助判断具体入场时点,价格突破T3均线时买入做多。

3. 价格跌破下轨止损平仓;上涨突破上轨时止盈平仓。

4. 可选择仅做多或双向交易。

5. 参数优化结合指标性质,寻找最佳组合。

## 优势分析

1. ATR通道划分清晰,大趋势判断准确。

2. T3均线参数可调,灵活捕捉不同级别趋势。

3. 止损止盈规则一致性高,避免随意 vcfkkmr。

4. 交易频率低,适合长线持仓。

## 风险分析

1. 指标间可能出现分歧,导致错误交易。

2. 未考虑个股波动特性,参数拘泥风险。

3. 交易频率低容易失去机会,收益空间有限。

4. 重仓持有带来的尾盘滑点风险。

## 优化方向

1. 增加其他指标判断,确保交易有效性。

2. 针对不同品种参数进行优化,提高适应性。

3. 优化持仓规模,平衡频率和风险。

4. 考虑动态移动止损止盈点,扩大获利空间。

5. 策略层面增加 FILTER,提升稳定性。

## 总结

该策略整合ATR和T3均线实现简单有效的趋势跟踪。但需要进一步增强指标逻辑和参数优化,降低误判概率,使策略更适应实盘条件。

||

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

[/trans]

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
