
> Name

基于波动率指标和随机指标的多时间周期交易策略The-Multi-Period-Trading-Strategy-Based-on-Volatility-Index-and-Stochastic-Oscillator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a48274ed19b654a7fa.png)

[trans]

### 概述

本策略融合了波动率指标VIX和随机指标RSI,通过不同时间周期指标的组合,实现高效的突破买入和超买超卖的止损平仓。策略优化空间较大,可适应不同市场环境。

### 策略原理  

1. 计算VIX波动率指标:取最近20天的最高价与最低价计算波动率。当波动率高于上轨时,表示市场恐慌;当低于下轨时,表示市场Complacency。

2. 计算RSI随机指标:取最近14天的涨跌幅计算,当RSI高于70时为超买区,低于30时为超卖区。

3. 融合两种指标,当波动率高于上轨或最高百分位时做多;当RSI高于70时平仓。

### 策略优势

1. 融合多种指标,综合判断市场时点。
2. 不同时间周期指标互相验证,提高决策准确性。 
3. 可优化调整参数,适应不同交易品种。

### 风险分析  

1. 参数设置不当可能导致多次虚假信号。
2. 单一平仓指标容易漏掉价格反转。

#### 优化建议

1. 增加更多验证指标,例如均线、布林带等判断入场时机。
2. 增加更多平仓指标,例如反转K线形态等。

### 总结  

本策略通过VIX指标判断市场时点和风险水平,配合RSI指标过滤掉超买超卖的不利交易点,从而在高效的时机买入且及时止损。策略优化空间较大,可适应更广泛的市场环境。

||

Overview
This strategy combines the volatility index VIX and stochastic oscillator RSI through a composition of indicators across different time periods, in order to achieve efficient breakout entries and overbought/oversold exits. The strategy has large room for optimizations and can be adapted to different market environments.  

Principles
1. Calculate the VIX volatility index: take the highest and lowest prices over the past 20 days to compute volatility. High VIX indicates market panic while low VIX suggests market complacency.  

2. Compute the RSI oscillator: take the price changes over the past 14 days. RSI above 70 suggests overbought conditions and RSI below 30 suggests oversold conditions.

3. Combine the two indicators. Go long when VIX breaches the upper band or the highest percentile. Close longs when RSI goes above 70.

Advantages 
1. Integrates multiple indicators for comprehensive market timing assessment.  
2. Indicators across timeframes verify each other and improves decision accuracy.
3. Customizable parameters can be optimized for different trading instruments.

Risks
1. Improper parameter tuning may cause multiple false signals. 
2. A single exit indicator may miss price reversals.  

Optimization Suggestions
1. Incorporate more confirming indicators like moving averages and Bollinger bands to time entries.
2. Add more exit indicators such as reversal candlestick patterns.

Summary
This strategy utilizes the VIX to gauge market timing and risk levels, and filters out unfavorable trades using overbought/oversold readings from the RSI, in order to enter at opportune moments and exit timely with stops. There is ample room for optimization to suit wider market conditions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|lookback length of Stochastic|
|v_input_int_2|80|Stochastic overbought condition|
|v_input_int_3|20|Stochastic oversold condition|
|v_input_1|3|smoothing of Stochastic %K |
|v_input_2|3|moving average of Stochastic %K|
|v_input_int_4|14|lookback length of RSI|
|v_input_int_5|70|RSI overbought condition|
|v_input_int_6|30|RSI oversold condition|
|v_input_3|22|LookBack Period Standard Deviation High|
|v_input_4|20|Bolinger Band Length|
|v_input_float_1|2|Bollinger Band Standard Devaition Up|
|v_input_5|50|Look Back Period Percentile High|
|v_input_6|0.85|Highest Percentile - 0.90=90%, 0.95=95%, 0.99=99%|
|v_input_7|false|-------Text Plots Below Use Original Criteria-------|
|v_input_8|false|Show Text Plot if WVF WAS True and IS Now False|
|v_input_9|false|Show Text Plot if WVF IS True|
|v_input_10|false|-------Text Plots Below Use FILTERED Criteria-------|
|v_input_11|true|Show Text Plot For Filtered Entry|
|v_input_12|true|Show Text Plot For AGGRESSIVE Filtered Entry|
|v_input_float_2|40|Long-Term Look Back Current Bar Has To Close Below This Value OR Medium Term--Default=40|
|v_input_float_3|14|Medium-Term Look Back Current Bar Has To Close Below This Value OR Long Term--Default=14|
|v_input_int_7|3|Entry Price Action Strength--Close > X Bars Back---Default=3|
|v_input_13|false|-------------------------Turn On/Off ALERTS Below---------------------|
|v_input_14|false|----To Activate Alerts You HAVE To Check The Boxes Below For Any Alert Criteria You Want----|
|v_input_15|false|Show Alert WVF = True?|
|v_input_16|false|Show Alert WVF Was True Now False?|
|v_input_17|false|Show Alert WVF Filtered?|
|v_input_18|false|Show Alert WVF AGGRESSIVE Filter?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-12-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © timj

strategy('Vix FIX / StochRSI Strategy', overlay=true, pyramiding=9, margin_long=100, margin_short=100)

Stochlength = input.int(14, minval=1, title="lookback length of Stochastic")
StochOverBought = input.int(80, title="Stochastic overbought condition")
StochOverSold = input.int(20, title="Stochastic oversold condition")
smoothK = input(3, title="smoothing of Stochastic %K ")
smoothD = input(3, title="moving average of Stochastic %K")
k = ta.sma(ta.stoch(close, high, low, Stochlength), smoothK)
d = ta.sma(k, smoothD)

///////////// RSI 
RSIlength = input.int( 14, minval=1 , title="lookback length of RSI")
RSIOverBought = input.int( 70  , title="RSI overbought condition")
RSIOverSold = input.int( 30  , title="RSI oversold condition")
RSIprice = close
vrsi = ta.rsi(RSIprice, RSIlength)

///////////// Double strategy: RSI strategy + Stochastic strategy

pd = input(22, title="LookBack Period Standard Deviation High")
bbl = input(20, title="Bolinger Band Length")
mult = input.float(2.0    , minval=1, maxval=5, title="Bollinger Band Standard Devaition Up")
lb = input(50  , title="Look Back Period Percentile High")
ph = input(.85, title="Highest Percentile - 0.90=90%, 0.95=95%, 0.99=99%")
new = input(false, title="-------Text Plots Below Use Original Criteria-------" )
sbc = input(false, title="Show Text Plot if WVF WAS True and IS Now False")
sbcc = input(false, title="Show Text Plot if WVF IS True")
new2 = input(false, title="-------Text Plots Below Use FILTERED Criteria-------" )
sbcFilt = input(true, title="Show Text Plot For Filtered Entry")
sbcAggr = input(true, title="Show Text Plot For AGGRESSIVE Filtered Entry")
ltLB = input.float(40, minval=25, maxval=99, title="Long-Term Look Back Current Bar Has To Close Below This Value OR Medium Term--Default=40")
mtLB = input.float(14, minval=10, maxval=20, title="Medium-Term Look Back Current Bar Has To Close Below This Value OR Long Term--Default=14")
str = input.int(3, minval=1, maxval=9, title="Entry Price Action Strength--Close > X Bars Back---Default=3")
//Alerts Instructions and Options Below...Inputs Tab
new4 = input(false, title="-------------------------Turn On/Off ALERTS Below---------------------" )
new5 = input(false, title="----To Activate Alerts You HAVE To Check The Boxes Below For Any Alert Criteria You Want----")
sa1 = input(false, title="Show Alert WVF = True?")
sa2 = input(false, title="Show Alert WVF Was True Now False?")
sa3 = input(false, title="Show Alert WVF Filtered?")
sa4 = input(false, title="Show Alert WVF AGGRESSIVE Filter?")

//Williams Vix Fix Formula
wvf = ((ta.highest(close, pd)-low)/(ta.highest(close, pd)))*100
sDev = mult * ta.stdev(wvf, bbl)
midLine = ta.sma(wvf, bbl)
lowerBand = midLine - sDev
upperBand = midLine + sDev
rangeHigh = (ta.highest(wvf, lb)) * ph

//Filtered Bar Criteria
upRange = low > low[1] and close > high[1]
upRange_Aggr = close > close[1] and close > open[1]
//Filtered Criteria
filtered = ((wvf[1] >= upperBand[1] or wvf[1] >= rangeHigh[1]) and (wvf < upperBand and wvf < rangeHigh))
filtered_Aggr = (wvf[1] >= upperBand[1] or wvf[1] >= rangeHigh[1]) and not (wvf < upperBand and wvf < rangeHigh)

//Alerts Criteria
alert1 = wvf >= upperBand or wvf >= rangeHigh ? 1 : 0
alert2 = (wvf[1] >= upperBand[1] or wvf[1] >= rangeHigh[1]) and (wvf < upperBand and wvf < rangeHigh) ? 1 : 0
alert3 = upRange and close > close[str] and (close < close[ltLB] or close < close[mtLB]) and filtered ? 1 : 0
alert4 = upRange_Aggr and close > close[str] and (close < close[ltLB] or close < close[mtLB]) and filtered_Aggr ? 1 : 0

//Coloring Criteria of Williams Vix Fix
col = wvf >= upperBand or wvf >= rangeHigh ? color.lime : color.gray

isOverBought = (ta.crossover(k,d) and k > StochOverBought) ? 1 : 0
isOverBoughtv2 = k > StochOverBought ? 1 : 0
filteredAlert = alert3 ? 1 : 0
aggressiveAlert = alert4 ? 1 : 0


if (filteredAlert or aggressiveAlert)
    strategy.entry("Long", strategy.long)

if (isOverBought)
    strategy.close("Long")
```

> Detail

https://www.fmz.com/strategy/436120

> Last Modified

2023-12-21 14:34:42
