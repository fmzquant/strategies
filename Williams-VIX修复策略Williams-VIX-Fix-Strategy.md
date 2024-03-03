
> Name

Williams-VIX修复策略Williams-VIX-Fix-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略旨在通过Williams VIX修复公式,结合Stochastic RSI与多空平衡指标,实现对VIX市场波动率的预测。通过捕捉隐藏的多头分歧来定位市场底部,实现对市场反转点的准确定位。

## 策略原理

该策略主要基于Williams VIX修复公式以及Stochastic RSI与RSI指标的组合使用。

首先,通过Williams VIX修复公式计算出当前周期的VIX值。该公式通过计算最高价与最低价的比值,来衡量市场的波动率和恐慌指数。这里设置了布林带的上下轨,当VIX值高于上轨时,表示市场波动加大,投资者恐慌;当低于下轨时,表示市场稳定。

其次,策略采用了Stochastic RSI与RSI指标的组合使用。RSI用于判断多空状态,Stoch RSI结合K线与D线,实现对RSI指标反转点的判断。当Stoch RSI从超买区下落时,产生卖出信号。

最后,策略综合两者,以Stoch RSI的超买信号为卖出依据,而以VIX值低于布林带下轨为买入依据,实现对市场反转点的捕捉。

## 优势分析

这套策略最大的优势在于,能够同时利用两种不同指标的优势进行组合。

Williams VIX修复公式能够有效反映市场的恐慌情绪,布林带的上下轨动态调整可以自适应不同周期;Stochastic RSI指标通过K、D线的交叉实现对RSI反转点的判断,避免产生误判。

两者结合使用,可以更准确地定位市场的反转点,在市场恐慌指数释放卖出信号的同时,又可以利用Stoch RSI判断具体的入场点位,避免误入。

## 风险分析

这套策略也存在一定的风险:

1. Williams VIX修复公式无法完全反映市场恐慌情绪,布林带参数设置不当可能导致产生错误信号。

2. Stoch RSI反转信号同样可能错误,需要组合其他指标进行验证。

3. 策略较为保守,如果不能及时跟踪快速行情可能导致错失机会。

4. 策略回撤可能较大,需要谨慎设置仓位管理。

这需要我们在使用该策略时,合理设置参数,并辅以其他指标进行验证,同时控制好仓位规模,以规避风险。

## 优化方向

这套策略可以考虑从以下几个方面进行优化:

1. 优化Williams VIX公式的参数,使其能更准确地反映市场恐慌程度。可以考虑加入均线系统等指标进行组合。

2. 优化Stoch RSI的参数,寻找更合适的K、D线周期组合,提高反转准确性。

3. 增加仓位管理机制,如设置止损止盈,或根据回撤率/盈利率动态调整仓位。

4. 结合其他指标,如MACD、KD等,实现多指标验证,降低误判风险。

5. 增加机器学习算法,利用大数据训练模型,自动优化参数,提高策略的稳定性。

通过以上几点优化,可以显著提升该策略的实战效果与稳定性。

## 总结

Williams VIX修复策略通过捕捉市场的恐慌与稳定转换,并利用Stoch RSI判断具体入场时机,实现对市场底部的有效定位。策略优势在于指标组合使用,但也存在一定风险。我们可以通过参数优化与多指标验证来增强策略效果,使其成为定位市场反转的有效工具。


||


## Overview

This strategy aims to predict market volatility of VIX by using Williams Vix Fix formula combined with Stochastic RSI and RSI indicators. It captures hidden bullish divergences to locate market bottoms and identify reversal points accurately.

## Strategy Logic

The strategy is mainly based on the combination of Williams Vix Fix formula and Stochastic RSI & RSI indicators.

Firstly, the current period's VIX value is calculated by Williams Vix Fix formula through measuring the ratio of highest price to lowest price, which represents market volatility and panic levels. Upper and lower bollinger bands are set here, when VIX value is higher than the upper band, it indicates increased market fluctuation and investor panic; when lower than the lower band, it represents a stable market.

Secondly, the strategy adopts the combination of Stochastic RSI and RSI indicators. RSI is used to determine long/short positions, while Stoch RSI combines K & D lines to identify reversal points of RSI. Sell signals are generated when Stoch RSI falls from overbought zone. 

Finally, the strategy integrates both by taking Stoch RSI's overbought signal as the basis for selling, and VIX value lower than lower bollinger band as the basis for buying, so as to capture market reversal points.

## Advantage Analysis 

The biggest advantage of this strategy is that it can utilize the strengths of two different indicators in combination.

Williams Vix Fix formula can effectively reflect market panic emotions. The dynamic adjustment of bollinger bands can adapt to different cycles. Stochastic RSI identifies RSI reversal points through the crossover of K & D lines, avoiding false signals.

The two combined can more accurately locate market reversal points. It generates sell signals when market panic index releases signals while utilizing Stoch RSI to determine specific entry points to avoid erroneous entries.

## Risk Analysis

There are also some risks in this strategy:

1. Williams Vix Fix formula cannot fully reflect market panic emotions. Improper parameters of bollinger bands may generate wrong signals.

2. Reversal signals of Stoch RSI may also be wrong and needs to be verified with other indicators. 

3. The strategy is relatively conservative and may miss opportunities if unable to track fast-moving markets timely.

4. The strategy may have larger drawdowns which requires careful position sizing.

We need to set parameters reasonably, verify with other indicators, and control position sizes to mitigate risks when using this strategy.

## Optimization Directions

Some ways to optimize this strategy:

1. Optimize parameters of Williams Vix formula to more accurately reflect market panic levels. Combinations of moving averages can be considered.

2. Optimize parameters of Stoch RSI to find better combinations of K & D periods for higher reversal accuracy. 

3. Add position sizing mechanisms like stop loss/take profit, or dynamic position adjustment based on drawdown/profit ratio.

4. Incorporate other indicators like MACD, KD to realize multi-indicator verification and reduce false signals.

5. Add machine learning algorithms, use big data to train models and auto-optimize parameters, improving stability.

Through above optimizations, the strategy's performance and stability can be significantly enhanced.

## Conclusion

The Williams Vix Fix strategy captures market panic and stability transitions, and uses Stoch RSI to determine specific entry points, effectively locating market bottoms. Its advantage lies in the combination of indicators, but there are also certain risks. We can strengthen the strategy by parameters optimization and multi-indicator verification, making it an effective tool to locate market reversals.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|lookback length of Stochastic|
|v_input_2|80|Stochastic overbought condition|
|v_input_3|20|Stochastic oversold condition|
|v_input_4|3|smoothing of Stochastic %K |
|v_input_5|3|moving average of Stochastic %K|
|v_input_6|14|lookback length of RSI|
|v_input_7|70|RSI overbought condition|
|v_input_8|30|RSI oversold condition|
|v_input_9|22|LookBack Period Standard Deviation High|
|v_input_10|20|Bolinger Band Length|
|v_input_11|2|Bollinger Band Standard Devaition Up|
|v_input_12|50|Look Back Period Percentile High|
|v_input_13|0.85|Highest Percentile - 0.90=90%, 0.95=95%, 0.99=99%|
|v_input_14|false|-------Text Plots Below Use Original Criteria-------|
|v_input_15|false|Show Text Plot if WVF WAS True and IS Now False|
|v_input_16|false|Show Text Plot if WVF IS True|
|v_input_17|false|-------Text Plots Below Use FILTERED Criteria-------|
|v_input_18|true|Show Text Plot For Filtered Entry|
|v_input_19|true|Show Text Plot For AGGRESSIVE Filtered Entry|
|v_input_20|40|Long-Term Look Back Current Bar Has To Close Below This Value OR Medium Term--Default=40|
|v_input_21|14|Medium-Term Look Back Current Bar Has To Close Below This Value OR Long Term--Default=14|
|v_input_22|3|Entry Price Action Strength--Close > X Bars Back---Default=3|
|v_input_23|false|-------------------------Turn On/Off ALERTS Below---------------------|
|v_input_24|false|----To Activate Alerts You HAVE To Check The Boxes Below For Any Alert Criteria You Want----|
|v_input_25|false|Show Alert WVF = True?|
|v_input_26|false|Show Alert WVF Was True Now False?|
|v_input_27|false|Show Alert WVF Filtered?|
|v_input_28|false|Show Alert WVF AGGRESSIVE Filter?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//Divergence and Hidden Divergence correlating with the Money Flow Index

strategy("Vix FIX / StochRSI Strategy", pyramiding=9, initial_capital=10000, default_qty_type=strategy.percent_of_equity,overlay=false)

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
ltLB = input(40, minval=25, maxval=99, title="Long-Term Look Back Current Bar Has To Close Below This Value OR Medium Term--Default=40")
mtLB = input(14, minval=10, maxval=20, title="Medium-Term Look Back Current Bar Has To Close Below This Value OR Long Term--Default=14")
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
col = wvf >= upperBand or wvf >= rangeHigh ? lime : gray

isOverBought = (crossover(k,d) and k > StochOverBought) ? 1 : 0
isOverBoughtv2 = k > StochOverBought ? 1 : 0
filteredAlert = alert3 ? 1 : 0
aggressiveAlert = alert4 ? 1 : 0

plot(isOverBought, "Overbought / Crossover", style=line, color=red) 
plot(filteredAlert, "Filtered Alert", style=line, color=fuchsia) 
plot(aggressiveAlert, "Aggressive Alert", style=line, color=orange)

if (filteredAlert or aggressiveAlert)
    strategy.entry("Long", strategy.long)

if (isOverBought)
    strategy.close("Long")

    

```

> Detail

https://www.fmz.com/strategy/428088

> Last Modified

2023-09-28 15:29:48
