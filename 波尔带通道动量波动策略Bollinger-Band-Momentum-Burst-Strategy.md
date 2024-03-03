
> Name

波尔带通道动量波动策略Bollinger-Band-Momentum-Burst-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1180b3ed246b783f3e5.png)

[trans]


## 概述

该策略利用波尔带通道内外比较来判断趋势,并结合动量指标追踪趋势,属于趋势追踪策略。策略判断通道内波动小于通道外时产生新的趋势方向信号,并打开仓位。仓位止损采用ATR乘数,止盈为ATR乘数风险回报比例。

## 原理

该策略主要由以下几部分组成:

1. 波尔带设置:包括大波尔带长度40周期,小波尔带长度20周期,通道宽度为标准差的2倍。

2. 通道 explosioin 判断:如果大波尔带上轨低于小波尔带上轨,大波尔带下轨高于小波尔带下轨,则说明波动加大,产生新的趋势方向信号。

3. 动量指标: 240周期的14日EMA,判断趋势方向。

4. ATR止损止盈:ATR的14倍为止损距离,止盈为止损距离的1.5倍。

策略首先判断是否通道爆发,如果通道爆发,再判断动量方向,决定做多还是做空。入场后,以ATR倍数进行止损止盈管理。

## 优势

1. 使用双波尔带结构,可以比较不同时间周期内的波动情况,判断趋势爆发点。

2. 借助动量指标判断趋势方向,避免被震荡市场 whipsaw。

3. 利用ATR进行止损止盈管理,可以根据市场波动调整止损距离。

4. 风险回报比例合理,避免过度追求,也不会过于保守。

## 风险

1. 在没有明确趋势的震荡行情中,容易被套住。可以通过优化动量指标参数来减少误判。

2. ATR止损可能会过于保守,可以测试其他止损方式,如移动止损等。

3. 固定的止损止盈倍数可能不适合所有品种,可以考虑使其可调整。

4. 双波尔带判断趋势转折点效果存疑,可以测试其他通道指标如KD通道等。

## 优化方向

1. 测试不同的动量指标参数,找到最佳参数组合。

2. 尝试不同的止损方式,如移动止损,自适应ATR等。

3. 使止损止盈倍数可调整,根据不同品种和市场环境优化。 

4. 测试不同通道指标的效果,选取更稳定的通道指标。

5. 考虑加入复利管理,让盈利更可控。

6. 可以根据波段、时间等过滤入场时机,提高胜率。

## 总结

本策略整体思路清晰,使用双波尔带判断趋势爆发点是其最大亮点。但仍需针对止损方式、通道指标、风险管理等方面进行优化测试,使策略参数更具适应性,在不同市场环境中都能稳定运行。总体来说,该策略具有较好的优势和发展潜力,值得进行深入研究。

||



## Overview

This strategy uses Bollinger Bands to judge trends by comparing fluctuations inside and outside the bands, and uses momentum indicators to follow the trend. It belongs to trend following strategies. It generates new trend direction signals when volatility inside the band is less than outside, and opens positions. The stop loss uses ATR multiples, and take profit is ATR multiples of risk reward ratio.

## Principles 

The strategy consists of the following main parts:

1. Bollinger Bands settings: Large bands with length 40, small bands length 20, band width is 2 standard deviations. 

2. Band explosion judgment: If large band upper is below small band upper, and large band lower is above small band lower, it indicates increased volatility and generates new trend direction signals.

3. Momentum indicator: 240 timeframe 14 EMA judges trend direction. 

4. ATR stop loss and take profit: ATR 14 times for stop loss distance, take profit is 1.5 times of stop loss distance.

The strategy first judges if the band explodes, then determines long or short based on momentum direction. After entry, use ATR multiples for stop loss and take profit management.

## Advantages

1. Using double Bollinger bands can compare volatility across timeframes, to determine trend burst points.

2. Using momentum indicators avoids being whipsawed by ranging markets.

3. ATR stops adjusts stop distance based on market volatility. 

4. Reasonable risk reward ratio, not too aggressive or conservative.

## Risks

1. May be trapped in ranging markets without clear trends. Can optimize momentum parameters to reduce false signals.

2. ATR stops may be too conservative. Consider other stop methods like trailing stops.

3. Fixed ATR multiples may not suit all products. Consider making it adjustable.

4. Dual Bollinger effectiveness unproven. Test other channels like KD.

## Optimization Directions

1. Test different momentum parameters to find optimal combinations.

2. Try different stop methods like trailing stops, adaptive ATR.

3. Make ATR multiples adjustable based on product and market conditions.

4. Test different channel indicators for more stability. 

5. Consider adding compounding management for better profit control.

6. Filter entry signals by swings, time etc to improve win rate.

## Conclusion

The strategy logic is clear, using dual Bollinger to determine trend burst is the biggest highlight. But optimizations are still needed on stops, channels, risk management etc to make parameters more adaptive across different market conditions. Overall the strategy has good advantages and potential, worth further research.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1||(?BB)Large BB Resolution|
|v_input_2|40|Large BB Length|
|v_input_3||Small BB Resolution |
|v_input_4|20|Small BB Length|
|v_input_5|2|BB StdDev|
|v_input_6|14|BB expand valid length|
|v_input_7|240|(?SMT)EMA Trend t/f|
|v_input_8|14|Length|
|v_input_9|3|Smooth factor|
|v_input_10|0|(?Trade)Detect Risk Management Based On: ATR|Bracket|No detection|
|v_input_11|3|(?ATR)ATR Multiple|
|v_input_12|1.5|Risk Reward Ratio for ATR|
|v_input_13|100|(?Bracket)Stop Loss Point for Braket(tick)|
|v_input_14|200|Take Profit Point for Braket(tick)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-30 00:00:00
end: 2023-10-30 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © kasaism
//@version=4
// strategy(title="[EURUSD60] BB Expansion Strategy", shorttitle="[EURUSD60] BBEXP",overlay=true, max_bars_back=5000, max_labels_count=500)

// === INPUTS === //
////BB
largeBbRes = input(title="Large BB Resolution", type=input.resolution, defval="", group="BB")
largeBbLength = input(title="Large BB Length", type=input.integer, defval=40, minval=1, group="BB")
smallBbRes = input(title="Small BB Resolution ", type=input.resolution, defval="", group="BB")
smallBbLength = input(title="Small BB Length", type=input.integer, defval=20, minval=1, group="BB")
multi = input(title="BB StdDev", type=input.float, defval=2.0, maxval=10, minval=0.01, group="BB")
validLen = input(title="BB expand valid length", defval=14, group="BB")

// 3 each EMA settings. EMA directions are as each time frame directions. 
resFirstTime = input(title="EMA Trend t/f", type=input.resolution, defval="240", group="SMT")
// resSecondTime = input(title="Second t/f", type=input.resolution, defval="30", group="SMT") 
// resThirdTime = input(title="Third t/f", type=input.resolution, defval="", group="SMT")
emaLen = input(14, minval=1, title="Length", group="SMT") 
smooth = input(3, minval=1, title="Smooth factor", group="SMT")

//Lisk Management
var riskManagementRule1 = "ATR"
var riskManagementRule2 = "Bracket"
riskManagementRule = input(riskManagementRule1, "Detect Risk Management Based On", options=[riskManagementRule1, riskManagementRule2, "No detection"], group="Trade")
atrMulti = input(3.0, title="ATR Multiple", type=input.float, minval = 1.0, group="ATR")
riskRewardRatio = input(1.5, title="Risk Reward Ratio for ATR", type=input.float, minval = 0.01, group="ATR")
stopLossPoint = input(100, title="Stop Loss Point for Braket(tick)", type=input.float, minval = 1.0, group="Bracket")
takeProfitPoint = input(200, title="Take Profit Point for Braket(tick)", type=input.float, minval = 1.0, group="Bracket")
// === /INPUTS/ === //

// === CONSTANT === //
//For barmerge.lookahead_off
index = barstate.isrealtime ? 1 : 0

//For Entry
NOENTRY=0
LONG=1
SHORT=2

//SMT color
int up=1
int dn=2
int up_HL=3
int dn_HL=4

//label color
color_bearish = color.red
color_bullish = color.blue
C_label_color_bearish = color.red
C_label_color_bullish = color.blue
// === /CONSTANT/ === //


// === FUNCTIONS === //
//BB trade direction
bbTradeDetection(lrgUpper, lrgLower, smlUpper, smlLower) =>
    if not(na(lrgUpper) or na(lrgLower) or na(smlUpper) or na(smlLower))
        if lrgUpper < smlUpper and lrgLower > smlLower
            true
        else
            false
    else
        na
// === /FUNCTIONS/ === //


// === CALCURATES === //
////BB
//large BB
lrgBbBasis = security(syminfo.tickerid, largeBbRes, sma(close[index], largeBbLength))
lrgBbDev = multi * security(syminfo.tickerid, largeBbRes, stdev(close[index], largeBbLength))
lrgBbUpper = lrgBbBasis + lrgBbDev
lrgBbLower = lrgBbBasis - lrgBbDev

//small BB
smlBbBasis = security(syminfo.tickerid, smallBbRes, sma(close[index], smallBbLength))
smlBbDev = multi * security(syminfo.tickerid, smallBbRes, stdev(close[index], smallBbLength))
smlBbUpper = smlBbBasis + smlBbDev
smlBbLower = smlBbBasis - smlBbDev

bbTrade = bbTradeDetection(lrgBbUpper, lrgBbLower, smlBbUpper, smlBbLower)

//EMA Trend
base=security(syminfo.tickerid, resFirstTime, ema(close[index],emaLen))
sig=security(syminfo.tickerid, resFirstTime, ema(base[index],smooth))
emaTrend = not(na(base) or na(sig)) ? base < sig ? dn : up : na

////LISK MANAGEMENT
float stopLossLineForLong = na
float stopLossLineForShort = na
float takeProfitLineForLong = na
float takeProfitLineForShort = na
atr_ = atr(14) * atrMulti

if riskManagementRule == riskManagementRule1
    stopLossLineForLong := strategy.position_size > 0 ? stopLossLineForLong[1] ? stopLossLineForLong[1] : round(close[index] - atr_,3) : na
    stopLossLineForShort := strategy.position_size < 0 ? stopLossLineForShort[1] ? stopLossLineForShort[1] : round(close[index] + atr_,3) : na
    takeProfitLineForLong := strategy.position_size > 0 ? takeProfitLineForLong[1] ? takeProfitLineForLong[1] : close[index] + atr_*riskRewardRatio : na
    takeProfitLineForShort := strategy.position_size < 0 ? takeProfitLineForShort[1] ? takeProfitLineForShort[1] :close[index] - atr_*riskRewardRatio : na

if riskManagementRule == riskManagementRule2
    stopLossLineForLong := strategy.position_size > 0 ? stopLossLineForLong[1] ? stopLossLineForLong[1] : close[index] - stopLossPoint * syminfo.mintick : na
    stopLossLineForShort := strategy.position_size < 0 ? stopLossLineForShort[1] ? stopLossLineForShort[1] : close[index] + stopLossPoint * syminfo.mintick : na
    takeProfitLineForLong := strategy.position_size > 0 ? takeProfitLineForLong[1] ? takeProfitLineForLong[1] : close[index] +takeProfitPoint * syminfo.mintick : na
    takeProfitLineForShort := strategy.position_size < 0 ? takeProfitLineForShort[1] ? takeProfitLineForShort[1] :close[index] - takeProfitPoint * syminfo.mintick : na
// === /CALCURATES/ === //


// === CONDITIONS === //
//BB
bool isBbEntry = na
for i=0 to validLen
    isBbEntry := bbTrade==true ? true : bbTrade[i]==true ? true : false
//plotshape(isBbEntry, style=shape.circle, location=location.bottom)

isBbLong = isBbEntry and open[index] < smlBbBasis[index] and close[index] > smlBbBasis[index]
isBbShort = isBbEntry and open[index] > smlBbBasis[index] and close[index] < smlBbBasis[index]  

//SMT
isEmaLong = emaTrend == up 
isEmaShort = emaTrend == dn

//ATR
isAtrLongStop = low[index] <= stopLossLineForLong
isAtrShortStop = high[index] >= stopLossLineForShort
isAtrLongLimit = high[index] >= takeProfitLineForLong
isAtrShortLimit = low[index] <= takeProfitLineForShort
// === /CONDITIONS/ === //


// === TRADE === //
//ENTRY
if (isBbLong and isEmaLong)
    strategy.entry("LongEntry", strategy.long,  comment="LongEntry")
    if riskManagementRule == riskManagementRule2
        strategy.exit("LongEntry", loss=stopLossPoint, profit=takeProfitPoint, comment="bracket")
if (isBbShort and isEmaShort)
    strategy.entry("ShortEntry", strategy.short,  comment="ShortEntry")
    if riskManagementRule == riskManagementRule2	        
        strategy.exit("ShortEntry", loss=stopLossPoint, profit=takeProfitPoint, comment="bracket")
//EXIT
if riskManagementRule == riskManagementRule1
    if(isAtrLongStop)
        strategy.close("LongEntry", when=isAtrLongStop, comment="ATR Stop")
    if(isAtrShortStop)
        strategy.close("ShortEntry", when=isAtrShortStop, comment="ATR Stop")
    if(isAtrLongLimit)
        strategy.close("LongEntry", when=isAtrLongLimit, comment="ATR Limit")
    if(isAtrShortLimit)
        strategy.close("ShortEntry", when=isAtrShortLimit, comment="ATR Limit")
//  === /TRADE/ === //


// === PLOTS === //
plot(lrgBbBasis, title="Large BB Basis", linewidth=2, color=color.gray)
plot(lrgBbUpper, title="Large BB Upper", linewidth=2, color=color.gray)
plot(lrgBbLower, title="Large BB Lower", linewidth=2, color=color.gray)
plot(smlBbBasis, title="Small BB Basis", color=color.white)
plot(smlBbUpper, title="Small BB Upper", color=color.white)
plot(smlBbLower, title="Small BB Lower", color=color.white)
plot(base, title="EMA Line", color= emaTrend==dn ? color_bearish : emaTrend==up ? color_bullish : color.gray)

plot(stopLossLineForLong ? stopLossLineForLong : na, title="S/L Line For Long", color=color.yellow, style=plot.style_circles)
plot(stopLossLineForShort ? stopLossLineForShort : na, title="S/L Line For Short", color=color.yellow, style=plot.style_circles)
plot(takeProfitLineForLong ? takeProfitLineForLong : na, title="T/P Line For Long", color=color.purple, style=plot.style_circles)
plot(takeProfitLineForShort ? takeProfitLineForShort : na, title="T/P Line For Short", color=color.purple, style=plot.style_circles)
// /=== PLOTS ===/ //
```

> Detail

https://www.fmz.com/strategy/430678

> Last Modified

2023-10-31 15:54:41
