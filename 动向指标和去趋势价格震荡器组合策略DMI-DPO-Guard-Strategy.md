
> Name

动向指标和去趋势价格震荡器组合策略DMI-DPO-Guard-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9930ed2835efb90441.png)

[trans]

## 概述

本策略将交易视图内置的两个强大指标——动向指标(DMI)和去趋势价格震荡器(DPO)组合使用,形成一个可靠的交易决策依据。策略的核心逻辑是在DMI指标出现黄金交叉时,判断DPO指标的值是否大于0,如果大于0则产生多头信号;如果DMI指标出现死叉时,判断DPO指标的值是否小于0,如果小于0则产生空头信号。这可以有效过滤掉区间震荡市场中产生的大量假信号,从而仅在趋势形成时产生交易信号,避免在震荡中反复止损。

## 策略原理

该策略主要利用DMI指标判断趋势方向和强度。DMI指标由三条曲线组成:+DI、-DI和ADX。+DI代表多头力量,-DI代表空头力量,它们的交叉可以判断目前的趋势方向;ADX代表趋势的强度,值越高表示趋势越明显。但是ADX对低位震荡的识别效果不好,此策略移除了ADX的判定,仅利用+DI和-DI的交叉来判断趋势方向。

为了过滤掉区间震荡中产生的假信号,策略引入DPO指标进行辅助判定。DPO指标代表价格与其中轨的偏离程度,当价格处于中轨上方时DPO为正,下方时为负。该策略利用DPO指标的正负来判断目前是否处于趋势中,如果DMI指标出现交叉但DPO指标接近0水平,则判断为震荡,不产生交易信号。

具体来说,判断逻辑为:

1. 当+DI上穿-DI时,属于黄金交叉,判断为多头市场。此时如果DPO指标大于0,确认目前处于上升趋势中,则产生多头信号。

2. 当-DI下穿+DI时,属于死叉,判断为空头市场。此时如果DPO指标小于0,确认目前处于下降趋势中,则产生空头信号。

3. 若+DI/-DI交叉但DPO指标接近0,则判断为震荡,不产生信号。

## 优势分析

这种组合策略最大的优势在于识别趋势的准确性很高,在发生真实趋势反转时才会产生交易信号,从而避免在震荡区间反复亏损。其主要优势有:

1. 利用DMI指标判断趋势方向和强度,是一种成熟可靠的技术指标。

2. 借助DPO指标过滤掉区间震荡的假信号,只在趋势形成时才产生信号,避免亏损。

3. 组合多个指标,可以起到互相验证的作用,提高信号的可靠性。

4. 策略逻辑简单明了,容易理解和实施,适合用于自动或手动交易。

5. 由于只在趋势中交易,可以获得较大的风险回报率。

## 风险分析

尽管这是一种可靠性较高的策略,但仍需注意以下风险:

1. 突发事件导致市场产生巨大单边行情,可能错过这种趋势性机会。可以通过降低DPO参数来减少这种风险。

2. DMI指标本身也可能产生错误信号,这种风险无法完全规避。可以设置止损来控制损失。 

3. DPO指标参数设置不当也可能导致误判。应通过反复回测确定最佳参数。

4. 交易成本会对获利产生一定影响,应控制交易频率。可以通过优化参数来减少无效交易。

## 优化方向 

这种策略仍有进一步优化的空间:

1. 可以测试不同的参数组合,找到最佳参数以减少信号延迟和提高获利率。

2. 可以结合其他指标如KDJ、MACD等进行验证,提高信号准确性。

3. 可以根据不同品种、周期等设置适应性参数,使策略更具适应性。

4. 可以设定动态止损来控制单笔损失。也可以根据趋势阶段设定不同的止损幅度。

5. 可以通过机器学习等方法优化进入和退出的时机,以期获得更高收益。

## 总结

该策略综合运用DMI和DPO两个指标的优势,在判断趋势反转时判断准确性很高,可以可靠识别趋势的生成。同时,利用DPO指标有效过滤了区间震荡带来的噪音,避免了无效交易。这使其成为一种适合自动交易以及手动采用的高效策略。当然,仍有许多细节可以进一步优化,以获得更佳的策略表现。但这种组合指标的思路对量化交易策略设计具有重要借鉴意义。

||

## Overview

This strategy combines two powerful built-in indicators in TradingView - the Directional Movement Index (DMI) and the Detrended Price Oscillator (DPO) to form a reliable basis for trading decisions. The core logic of the strategy is to determine if the DPO value is greater than 0 when a DMI golden cross occurs, and generate a long signal if so; or to determine if the DPO value is less than 0 when a DMI dead cross occurs, and generate a short signal if so. This can effectively filter out a lot of false signals generated during range-bound oscillations in the market, thereby only generating trading signals when a trend is formed, avoiding repeated stop losses during oscillations.

## Principle  

This strategy mainly uses the DMI indicator to determine the trend direction and strength. The DMI indicator consists of three curves: +DI, -DI and ADX. +DI represents the strength of uptrend, -DI represents the strength of downtrend, and their crossover can determine the current trend direction; ADX represents the strength of the trend, the higher the value, the more obvious the trend. However, ADX is not good at identifying low volatility ranges, so this strategy removes the ADX determination and only uses the +DI and -DI crossovers to determine the trend direction.  

In order to filter out the false signals generated in the range-bound oscillations, the DPO indicator is introduced for auxiliary judgment. The DPO indicator represents the degree of deviation of the price from its middle rail. When the price is above the middle rail, the DPO is positive, and when below, it is negative. This strategy uses the positivity and negativity of the DPO indicator to judge whether it is currently in a trend. If the DMI indicator crosses but the DPO indicator is close to the 0 level, it is determined to be an oscillation and no trading signal is generated.

Specifically, the judgment logic is:  

1. When +DI crosses above -DI, it is a golden cross, indicating a bull market. At this time, if the DPO indicator is greater than 0, it confirms that it is currently in an upward trend, and a long signal is generated.

2. When -DI crosses below +DI, it is a dead cross, indicating a bear market. At this time, if the DPO indicator is less than 0, it confirms that it is currently in a downward trend, and a short signal is generated.  

3. If +DI/-DI crosses but DPO indicator is close to 0, it is determined as oscillation and no signal is generated.

## Advantage Analysis   

The biggest advantage of this combined strategy is its high accuracy in identifying trends, generating trading signals only when real trend reversals occur, thus avoiding repeated losses in oscillating intervals. Its main advantages are:

1. Using the DMI indicator to determine the trend direction and strength, it is a mature and reliable technical indicator.  

2. Filter out false signals in range-bound oscillations with the help of the DPO indicator, generate signals only when a trend is formed, avoiding losses.

3. Combining multiple indicators can serve as mutual verification and improve the reliability of signals. 

4. The strategy logic is simple and easy to understand and implement, suitable for automated or manual trading.

5. Since it only trades in trends, it can obtain a relatively high risk reward ratio.

## Risk Analysis

Although this is a highly reliable strategy, the following risks should be noted:

1. Sudden events may cause huge one-sided moves in the market, possibly missing such trend opportunities. This risk can be reduced by lowering the DPO parameters.

2. The DMI indicator itself may also generate wrong signals, and this risk cannot be completely avoided. Losses can be controlled by setting stops.

3. Improper parameter settings of the DPO indicator can also lead to misjudgments. The optimal parameters should be determined through repeated backtesting.  

4. Trading costs will have a certain impact on profits, so the trading frequency should be controlled. Invalid trades can be reduced by optimizing parameters.

## Optimization

There is still room for further optimization of this strategy:  

1. Different parameter combinations can be tested to find the optimal parameters to reduce signal delay and increase profit rate.

2. Can be combined with other indicators such as KDJ, MACD, etc. for verification to improve signal accuracy. 

3. Adaptive parameters can be set according to different varieties, cycles, etc. to make the strategy more adaptive.  

4. Dynamic stops can be set to control single loss. Different stop loss amplitudes can also be set according to trend stages.

5. Machine learning methods can be used to optimize entry and exit timing for higher returns.

## Summary  

This strategy combines the advantages of the DMI and DPO indicators to have high accuracy in judging trend reversals, and can reliably identify the generation of trends. At the same time, the use of the DPO indicator effectively filters out the noise caused by range-bound oscillations, avoiding ineffective trades. This makes it an efficient strategy suitable for automated trading and manual adoption. Of course, there are still many details that can be further optimized for better strategy performance. But the idea of combining indicators has important reference significance for quantitative trading strategy design.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|34|DI Lookback|
|v_input_2|34|Length|
|v_input_3|false|Centered|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-28 00:00:00
end: 2024-01-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("DMI DPO Guard Strategy", calc_on_order_fills=true, initial_capital=100000, default_qty_type=strategy.percent_of_equity, default_qty_value=10, currency="USD", commission_type=strategy.commission.percent, commission_value=0.25)

///Tradingview's DMI indicator logic///
len = input(34, minval=1, title="DI Lookback")
up = change(high)
down = -change(low)
plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
trur = rma(tr, len)
plus = fixnan(100 * rma(plusDM, len) / trur)
minus = fixnan(100 * rma(minusDM, len) / trur)

plot(plus, color=color.orange, title="+DI")
plot(minus, color=color.aqua, title="-DI")


period_ = input(34, title="Length", minval=1)
isCentered = input(false, title="Centered")
barsback = period_/2 + 1
ma = sma(close, period_)
dpo = isCentered ? close[barsback] - ma : close - ma[barsback]
plot(dpo, offset = isCentered ? -barsback : 0, title="Detrended Price Oscillator", color=#C0C000)
hline(0, title="Zero Line", color = #C0C0C0)

long = crossover(plus, minus) and (dpo > 0)
short = crossunder(plus, minus) and (dpo < 0)

strategy.entry("Long", strategy.long, when=long)
strategy.entry("Short", strategy.short, when=short)



```

> Detail

https://www.fmz.com/strategy/437692

> Last Modified

2024-01-04 17:56:28
