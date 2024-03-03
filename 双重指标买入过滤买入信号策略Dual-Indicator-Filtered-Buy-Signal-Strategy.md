
> Name

双重指标买入过滤买入信号策略Dual-Indicator-Filtered-Buy-Signal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9131082e9ac43db238.png)

[trans]

## 概述

双重指标买入过滤买入信号策略利用随机指数平滑移动平均线(Stochastic RSI)和布林带指标的组合来识别潜在的买入机会。该策略采用多项过滤条件,以区分最有利可图的买点。这使其能在市场波动的环境下,识别出高概率的买入时机。

## 策略原理

该策略使用两组指标来识别买入机会。

首先,它使用随机指数平滑移动平均线判断市场是否超卖。该指标结合随机指数和其平滑移动平均线,当%K线从低点上穿其%D线时,视为超卖信号。这里设置了阈值,当%K线高于20时就属于超卖。

其次,该策略使用布林带指标来识别价格变化。布林带是根据价格的标准差计算上下轨。当价格接近下轨时,属于超卖状态。策略这里设置2倍标准差的参数,使布林带范围更大,从而过滤掉更多假信号。

在获得上述两个指标的超卖信号后,该策略增加多重过滤条件,进一步识别买入时机:

1. 价格刚刚突破布林带下轨向上
2. 当前收盘价高于N根K线前的收盘价,显示买入力道
3. 当前收盘价低于长期或中期回看期的收盘价,有利回调

综合判断后识别出的买入时机,则发出买入信号。

## 优势分析

该双重指标过滤策略有几大优势:

1. 利用双重指标判断,使买入信号更加可靠,避免假信号。
2. 多项过滤条件避免在震荡行情中频繁买入。
3. 结合随机指数指标判断超卖状态,布林带指标判断价格异常。
4. 增加价格力度判断,确保有足够的买入力道。
5. 增加回调判断,进一步确保买点的可靠性。

总的来说,该策略综合运用多种技术指标和过滤手段,使得买入时机识别更加准确可靠,从而获得更好的交易表现。

## 风险分析

尽管该双重指标过滤策略有许多优势,但也存在一些风险需要防范:

1. 参数设置不当可能导致买入信号过于频繁或保守,需要仔细测试优化。
2. 多重过滤条件可能错过部分买入机会,无法跟踪快速行情。
3. 指标发散时,会产生错误信号,需要关注指标的一致性。
4. 无法判断趋势,在熊市中可能产生错误信号导致亏损。

针对上述风险,该策略可以进行如下优化:

1. 调整指标参数,平衡过滤条件的灵敏度。  
2. 在趋势判断指标的帮助下,避免在熊市中产生错误信号。
3. 增加止损手段。

## 优化方向  

该双重指标过滤策略可以从以下几个维度进行进一步优化:

1. 测试更多技术指标的组合,寻找更好的买入时机判断手段。例如VRSI, DMI等。
2. 增加机器学习算法,自动优化参数。
3. 增加自适应止损机制。当利润达到一定水平后,逐步提高止损线。
4. 结合交易量指标,确保存在足够的买入力量。
5. 优化资金管理策略。设置动态交易数量,降低单笔亏损。

通过引入更多先进技术与方法,该双重指标过滤策略可以获得更精确的买入时机选择和更强的风险控制能力。从而在实盘中获得更稳定可靠的收益。

## 总结

综上所述,双重指标买入过滤买入信号策略使用Stochastic RSI和布林带等多种技术指标,并结合价格力度与回调判断等多项过滤条件,识别出高概率可靠的买入时机。在参数优化,止损设定等进一步完善下,该策略可以成为收益稳定的量化交易策略之一。

其核心优势在于指标与过滤条件的有效结合,使买入时机判断更加精确。风险和优化方向也都可控可解决。总体而言,这是一个可实盘的高效量化策略。
||

## Overview

The Dual Indicator Filtered Buy Signal strategy utilizes a combination of Stochastic RSI and Bollinger Bands to identify potential buy opportunities. It employs multiple filter conditions to distinguish the most favorable buy points. This allows it to identify high-probability buy entry timing in fluctuating market environments.

## Strategy Logic

The strategy leverages two sets of indicators to spot buy chances. 

Firstly, it uses Stochastic RSI to determine if the market is oversold. The indicator combines Stochastic and its moving average lines, treating a %K line crossover above its %D line from below as an oversold signal. A threshold is set here so that %K values above 20 are considered oversold.

Secondly, the strategy employs Bollinger Bands to identify price changes. Bollinger Bands are bands calculated from the standard deviation of prices. When prices approach the lower band, it signals an oversold condition. The strategy here sets the parameter to 2 times standard deviation for wider Bollinger Bands, filtering out more false signals.


With oversold signals obtained from both indicators, the strategy adds multiple filter conditions to further identify buy entry timing:

1. Price just bounced off the Bollinger lower band upwards  
2. Current close is higher than the close N bars ago, showing buying power
3. Current close is lower than longer-term or mid-term lookback period closes for pullback

Buy signals are triggered when the comprehensive criteria are met.

## Strength Analysis 

The dual indicator filtered strategy has several key strengths:

1. The dual indicator design makes buy signals more reliable by avoiding false signals.
2. Multiple filter conditions prevent excessive buys in range-bound markets. 
3. Combination of Stochastic RSI gauges oversold levels and Bollinger Bands detects price anomalies.
4. Buying power filter ensures adequate momentum behind buys. 
5. Pullback filters further validate reliability of buy zones.

In summary, the strategy combines various technical indicators and filtering techniques to pinpoint buy entry timing more precisely, leading to better trading performance.

## Risk Analysis

Despite its strengths, there are also risks to manage with the strategy:

1. Improper parameter tuning may result in too frequent or conservative signals. Careful optimization is required.  
2. Strict filtering logics may miss some opportunities in fast-moving markets.  
3. Diverging indicators may generate false signals. Cross-examination is necessary.
4. Lack of trend determination exposes the strategy during bear markets.

Suggested enhancements to mitigate the risks are:

1. Adjust indicator parameters to balance filter sensitivity.
2. Introduce trend-determining filters to avoid bull traps.  
3. Incorporate stop loss mechanisms.

## Enhancement Opportunities

The strategy can be further improved in aspects below:

1. Test more indicator combinations for better buy timing models, e.g. VRSI, DMI etc.
2. Introduce machine learning algorithms to auto-optimize parameters.  
3. Build adaptive stop loss mechanisms to trail stops at profit milestones.
4. Incorporate volume indicators to ensure sufficient momentum.   
5. Optimize money management models like dynamic position sizing to limit losses.

With more advanced techniques introduced, the strategy can achieve more precise signal generating capabilities and stronger risk control to deliver more reliable profits in live trading.

## Conclusion

In summary, the Dual Indicator Filtered Buy Signal Strategy leverages Stochastic RSI, Bollinger Bands and multiple filter conditions like price strength and pullback validation to identify high-probability buy entry points. With proper parameter tuning, risk controls etc., it has the potential to become a stable automated trading strategy. 

Its core strength lies in the effective combination of indicators and filters for accurate timing. The risks and enhancement paths are also identifiable and manageable. Overall, this is an implementable and effective quantitative strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1||Long_message|
|v_input_2||Close_message|
|v_input_3|14|lookback length of Stochastic|
|v_input_4|80|Stochastic overbought condition|
|v_input_5|20|Stochastic oversold condition|
|v_input_6|3|smoothing of Stochastic %K |
|v_input_7|3|moving average of Stochastic %K|
|v_input_8|14|lookback length of RSI|
|v_input_9|70|RSI overbought condition|
|v_input_10|30|RSI oversold condition|
|v_input_11|22|LookBack Period Standard Deviation High|
|v_input_12|20|Bolinger Band Length|
|v_input_13|2|Bollinger Band Standard Devaition Up|
|v_input_14|50|Look Back Period Percentile High|
|v_input_15|0.85|Highest Percentile - 0.90=90%, 0.95=95%, 0.99=99%|
|v_input_16|false|-------Text Plots Below Use Original Criteria-------|
|v_input_17|false|Show Text Plot if WVF WAS True and IS Now False|
|v_input_18|false|Show Text Plot if WVF IS True|
|v_input_19|false|-------Text Plots Below Use FILTERED Criteria-------|
|v_input_20|true|Show Text Plot For Filtered Entry|
|v_input_21|true|Show Text Plot For AGGRESSIVE Filtered Entry|
|v_input_22|40|Long-Term Look Back Current Bar Has To Close Below This Value OR Medium Term--Default=40|
|v_input_23|14|Medium-Term Look Back Current Bar Has To Close Below This Value OR Long Term--Default=14|
|v_input_24|3|Entry Price Action Strength--Close > X Bars Back---Default=3|
|v_input_25|false|-------------------------Turn On/Off ALERTS Below---------------------|
|v_input_26|false|----To Activate Alerts You HAVE To Check The Boxes Below For Any Alert Criteria You Want----|
|v_input_27|false|Show Alert WVF = True?|
|v_input_28|false|Show Alert WVF Was True Now False?|
|v_input_29|false|Show Alert WVF Filtered?|
|v_input_30|false|Show Alert WVF AGGRESSIVE Filter?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-30 00:00:00
end: 2023-12-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("SORAN Buy and Close Buy", pyramiding=1, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=10, overlay=false)

////Buy and Close-Buy messages
Long_message = input("")
Close_message = input("")

///////////// Stochastic Slow
Stochlength = input(14, minval=1, title="lookback length of Stochastic")
StochOverBought = input(80, title="Stochastic overbought condition")
StochOverSold = input(20, title="Stochastic oversold condition")
smoothK = input(3, title="smoothing of Stochastic %K ")
smoothD = input(3, title="moving average of Stochastic %K")
k = sma(stoch(close, high, low, Stochlength), smoothK)
d = sma(k, smoothD)

 
///////////// RSI 
RSIlength = input( 14, minval=1 , title="lookback length of RSI")
RSIOverBought = input( 70  , title="RSI overbought condition")
RSIOverSold = input( 30  , title="RSI oversold condition")
RSIprice = close
vrsi = rsi(RSIprice, RSIlength)

///////////// Double strategy: RSI strategy + Stochastic strategy

pd = input(22, title="LookBack Period Standard Deviation High")
bbl = input(20, title="Bolinger Band Length")
mult = input(2.0    , minval=1, maxval=5, title="Bollinger Band Standard Devaition Up")
lb = input(50  , title="Look Back Period Percentile High")
ph = input(.85, title="Highest Percentile - 0.90=90%, 0.95=95%, 0.99=99%")
new = input(false, title="-------Text Plots Below Use Original Criteria-------" )
sbc = input(false, title="Show Text Plot if WVF WAS True and IS Now False")
sbcc = input(false, title="Show Text Plot if WVF IS True")
new2 = input(false, title="-------Text Plots Below Use FILTERED Criteria-------" )
sbcFilt = input(true, title="Show Text Plot For Filtered Entry")
sbcAggr = input(true, title="Show Text Plot For AGGRESSIVE Filtered Entry")
ltLB = input(40, minval=20, maxval=99, title="Long-Term Look Back Current Bar Has To Close Below This Value OR Medium Term--Default=40")
mtLB = input(14, minval=1, maxval=40, title="Medium-Term Look Back Current Bar Has To Close Below This Value OR Long Term--Default=14")
str = input(3, minval=1, maxval=9, title="Entry Price Action Strength--Close > X Bars Back---Default=3")
//Alerts Instructions and Options Below...Inputs Tab
new4 = input(false, title="-------------------------Turn On/Off ALERTS Below---------------------" )
new5 = input(false, title="----To Activate Alerts You HAVE To Check The Boxes Below For Any Alert Criteria You Want----")
sa1 = input(false, title="Show Alert WVF = True?")
sa2 = input(false, title="Show Alert WVF Was True Now False?")
sa3 = input(false, title="Show Alert WVF Filtered?")
sa4 = input(false, title="Show Alert WVF AGGRESSIVE Filter?")

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
col = wvf >= upperBand or wvf >= rangeHigh ? #00E676 : #787B86

isOverBought = (crossover(k,d) and k > StochOverBought) ? 1 : 0
isOverBoughtv2 = k > StochOverBought ? 1 : 0
filteredAlert = alert3 ? 1 : 0
aggressiveAlert = alert4 ? 1 : 0

plot(isOverBought, "Overbought / Crossover", style=plot.style_line, color=#FF5252) 
plot(filteredAlert, "Filtered Alert", style=plot.style_line, color=#E040FB) 
plot(aggressiveAlert, "Aggressive Alert", style=plot.style_line, color=#FF9800)

if (filteredAlert or aggressiveAlert)
    strategy.entry("Buy", strategy.long, alert_message = Long_message)

if (filteredAlert or aggressiveAlert)
    alert("Buy Signal", alert.freq_once_per_bar)


if (isOverBought)
    strategy.close("Buy", alert_message = Close_message)

```

> Detail

https://www.fmz.com/strategy/434524

> Last Modified

2023-12-07 10:43:01
