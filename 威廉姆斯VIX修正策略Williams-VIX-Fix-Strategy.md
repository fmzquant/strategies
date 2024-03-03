
> Name

威廉姆斯VIX修正策略Williams-VIX-Fix-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ad9b19c0be6d1cb2ea.png)

[trans]

### 概述

威廉姆斯VIX修正策略通过计算CBOE波动率指数VIX的修正值,结合布林轨道、百分位区间、价格动量特征等多种技术指标,实现对VIX反转进行判断和交易信号产生。该策略旨在捕捉VIX指数过度反转现象,在超买超卖情况下进行逆市操作。

### 策略原理

该策略的核心逻辑基于以下几点:

1. 计算威廉姆斯VIX修正值(wvf),通过公式捕捉VIX的波动情况。

2. 设置布林带的计算参数,获得VIX指数的中轨、上轨、下轨。

3. 设置百分位区间参数,获得VIX指数的历史百分位区间。

4. 利用 repaired 变量判断VIX是否处于反转点。当 repair 为真时,表明VIX前期处于超买或超卖状态,当前处于反转点。

5. 进一步结合价格的突破性质(upRange,upRange_Aggr)判断趋势特征。

6. 最后综合布林带、百分位区间、价格特征等多重条件,判断产生交易信号。

该策略充分利用VIX的均值回归特性,通过多种参数设定捕捉其反转机会。策略逻辑清晰可靠,可有效识别超买超卖机会。

### 策略优势分析

该策略具有以下几个优势:

1. 利用VIX的反转特性,在市场不确定性极大时能盈利。

2. 结合多种技术指标进行滤波,能有效识别反转机会。

3. 策略参数可调节,可以针对不同市场环境进行优化。

4. 实现简单,容易理解和修改,适合用于实盘。

5. 充分利用开源代码思想,易于和其他策略组合使用。

6. 策略表现出较低的市场相关性,可以用来做组合中的对冲部分。

7. 最大限度减少无效交易,过滤掉非反转机会。

8. 交易频率适中,不会过于频繁出入场。

### 风险分析

该策略也存在一些风险需要注意:

1. VIX指数本身存在数据问题,可能影响策略表现。

2. 反转交易存在亏损风险,如果反转不到位会加剧损失。

3. 多种参数设定使得参数优化比较复杂。

4. 反转时间捕捉不准会导致交易失败。

5. 降低交易频率也可能错失部分机会。

6. 布林带和百分位区间都存在误报问题。

7. 价格突破判断不准会使策略失效。

主要的风险可以通过以下方式降低:

1. 优化参数,使反转识别更准确。

2. 适当扩大持仓时间,确保反转成立。

3. 结合更多指标进行验证,避免误报。 

4. 调整开仓条件,降低无效交易。

5. 增加止损以控制亏损。

### 策略优化方向 

该策略可以从以下几个方向进行优化:

1. 优化布林带和百分位区间的参数,提高反转识别准确率。

2. 增加更多价格动量判断指标,避免趋势识别错误。

3. 调整开仓条件,确保更高的交易效率。

4. 设置不同的止损方式,控制风险。

5. 结合VIX期货主连续合约进行套期保值。

6. 根据不同市场环境调整参数,使策略更具适应性。

7. 增加机器学习模型判断反转时机。

8. 组合其他Alpha,以提高整体收益率。

9. 结合量化方法自动优化参数。

10. 设置范围止损和跟踪止损。

### 总结

威廉姆斯VIX修正策略通过捕捉VIX指数的反转特征,在市场恐慌时进行逆向操作,是一种典型的对冲策略。该策略集各种指标优点于一身,通过参数设定可控制风险。如果参数优化得当,可以获得较好的风险调整回报。但交易频率不宜过高,务必控制风险。总体来说,该策略逻辑清晰,使用开源代码策略的思想,是可以实盘使用的VIX交易策略。

||

### Overview

The Williams VIX Fix strategy calculates the corrected value of the CBOE Volatility Index VIX and combines multiple technical indicators such as Bollinger Bands, percentile ranges, and price momentum to determine and generate trading signals for VIX reversals. The strategy aims to capture the over-reversion phenomenon of the VIX index and take counter-trend trades during overbought and oversold situations.

### Strategy Logic

The core logic of this strategy is based on the following points:

1. Calculate the Williams VIX Fix value (wvf) through the formula to capture fluctuations in the VIX. 

2. Set Bollinger Band calculation parameters to obtain the midline, upper band, and lower band of the VIX index.

3. Set percentile range parameters to obtain the historical percentile range of the VIX index.

4. Use the repaired variable to determine if the VIX is at a reversal point. When repaired is true, it means the VIX was previously in an overbought or oversold state and is currently at a reversal point.

5. Further combine the price breakout nature (upRange, upRange_Aggr) to determine trend characteristics.

6. Finally, combine multiple conditions such as Bollinger Bands, percentile ranges, and price features to determine and generate trading signals.

The strategy takes full advantage of the mean reversion characteristics of the VIX and captures reversal opportunities through multiple parameter settings. The strategy logic is clear and reliable, which can effectively identify overbought and oversold opportunities.

### Advantage Analysis

The strategy has the following advantages:

1. Take advantage of the VIX's reversion tendencies to profit when market uncertainty is very high.

2. The combination of multiple technical indicators for filtering can effectively identify reversal opportunities.

3. Adjustable parameters of the strategy can be optimized for different market environments. 

4. Simple implementation, easy to understand and modify, suitable for live trading.

5. Makes full use of open-source code ideas and is easy to combine with other strategies.

6. The strategy shows relatively low market correlation and can serve as a hedging component in the portfolio.

7. Maximize eliminating ineffective trades and filter out non-reversal opportunities.

8. Moderate trading frequency, will not enter and exit too frequently.

### Risk Analysis

The strategy also has some risks to note:

1. The VIX index itself has data issues that may affect strategy performance.

2. Reversal trading carries risk of losses. Losses may be exacerbated if the reversal is not reached.

3. The multiple parameter settings make parameter optimization quite complex. 

4. Inaccurate reversal timing capture can lead to failed trades.

5. Reduced trading frequency may also miss some opportunities.

6. Both Bollinger Bands and percentile ranges are susceptible to false signals.

7. Inaccurate price breakout judgments can render the strategy ineffective.

The main risks can be reduced by:

1. Optimizing parameters to make reversal identification more accurate.

2. Appropriately increasing holding time to ensure reversal is established.

3. Adding more indicators for verification to avoid false signals.

4. Adjusting open position criteria to reduce ineffective trades. 

5. Adding stops to control losses.

### Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize Bollinger Band and percentile range parameters to improve reversal recognition accuracy.

2. Add more price momentum indicators to avoid trend misidentification. 

3. Adjust opening position criteria to ensure higher trading efficiency.

4. Set different stop loss methods to control risks.

5. Hedge with VIX futures contracts. 

6. Adjust parameters according to different market environments to make the strategy more adaptive.

7. Add machine learning models to determine reversal timing.

8. Combine with other alphas to increase overall return. 

9. Incorporate quantitative methods for automatic parameter optimization.

10. Set range stops and trailing stops.

### Summary 

The Williams VIX Fix strategy captures the reversal characteristics of the VIX index and takes counter-trend trades during market panic. It is a typical hedging strategy. The strategy combines the advantages of various indicators, and parameters can control risks. With proper parameter optimization, it can achieve good risk-adjusted returns. However, trading frequency should not be too high, and risks must be controlled. Overall, the strategy logic is clear, uses open-source code strategy ideas, and is a VIX trading strategy that can be used in live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|22|LookBack Period Standard Deviation High|
|v_input_2|20|Bolinger Band Length|
|v_input_3|2|Bollinger Band Standard Devaition Up|
|v_input_4|50|Look Back Period Percentile High|
|v_input_5|0.85|Highest Percentile - 0.90=90%, 0.95=95%, 0.99=99%|
|v_input_6|40|Long-Term Look Back Current Bar Has To Close Below This Value OR Medium Term--Default=40|
|v_input_7|14|Medium-Term Look Back Current Bar Has To Close Below This Value OR Long Term--Default=14|
|v_input_8|3|Entry Price Action Strength--Close > X Bars Back---Default=3|
|v_input_9|8|monthfrom|
|v_input_10|12|monthuntil|
|v_input_11|true|dayfrom|
|v_input_12|31|dayuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-24 00:00:00
end: 2023-10-13 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title = "CM Vix V3 Strategy ",shorttitle="Vix3", overlay = true,default_qty_type = strategy.percent_of_equity, default_qty_value = 100,commission_type=strategy.commission.percent,commission_value=0.1,initial_capital=100000)



pd = input(22, title="LookBack Period Standard Deviation High")
bbl = input(20, title="Bolinger Band Length")
mult = input(2.0    , minval=1, maxval=5, title="Bollinger Band Standard Devaition Up")
lb = input(50  , title="Look Back Period Percentile High")
ph = input(.85, title="Highest Percentile - 0.90=90%, 0.95=95%, 0.99=99%")

ltLB = input(40, minval=25, maxval=99, title="Long-Term Look Back Current Bar Has To Close Below This Value OR Medium Term--Default=40")
mtLB = input(14, minval=10, maxval=20, title="Medium-Term Look Back Current Bar Has To Close Below This Value OR Long Term--Default=14")
str = input(3, minval=1, maxval=9, title="Entry Price Action Strength--Close > X Bars Back---Default=3")



//Williams Vix Fix Formula
wvf = ((highest(close, pd)-low)/(highest(close, pd)))*100
sDev = mult * stdev(wvf, bbl)
midLine = sma(wvf, bbl)
lowerBand = midLine - sDev
upperBand = midLine + sDev
rangeHigh = (highest(wvf, lb)) * ph

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
col = wvf >= upperBand or wvf >= rangeHigh ? lime : gray

//Plots for Williams Vix Fix Histogram and Alerts

longCond=alert3

shortCond = alert2



monthfrom =input(8)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)

if (  longCond    and  month>=monthfrom and month <=monthuntil and dayofmonth>=dayfrom and dayofmonth < dayuntil) 
    strategy.entry("LONG", strategy.long, stop=close, oca_name="TREND",  comment="LONG")
    
else
    strategy.cancel(id="LONG")
    



if ( shortCond   and month>=monthfrom and month <=monthuntil and dayofmonth>=dayfrom and dayofmonth < dayuntil ) 

    strategy.entry("SHORT", strategy.short,stop=close, oca_name="TREND",  comment="SHORT")
else
    strategy.cancel(id="SHORT")
    

```

> Detail

https://www.fmz.com/strategy/430129

> Last Modified

2023-10-25 12:03:08
