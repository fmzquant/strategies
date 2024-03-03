
> Name

多元指标融合策略Multivariate-Indicator-Fusion-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

多元指标融合策略通过组合使用多个不同类型的技术指标,结合其各自的优势,实现更精准和全面的市场判断,以达到提高交易胜率的目的。

## 策略原理

该策略同时使用了三个不同的技术指标:变动率指数(VI)、ROC-RSI和价格变动率(Price ROC)。

首先,策略计算VI,它由正向变动指标VIP和负向变动指标VIM组成。VIP和VIM分别测量价格的上涨力量和下跌力量。通过比较VIP和VIM的变化率,可以判断未来价格上涨或下跌的可能性。

其次,策略结合了ROC和RSI形成ROC-RSI指标。ROC衡量价格较长周期内的变动情况,RSI反映较短周期内价格的超买超卖情况。ROC-RSI综合这两方面信息,判断目前的股价是否处于非理性的极端区域。

最后,价格变动率(Price ROC)直接反映价格变动的强度。与VI和ROC-RSI不同,它从价格本身的角度判断趋势。 

策略通过组合使用上述三个指标,只有当它们同时发出买入或卖出信号时,才生成交易指令。这可以过滤掉一些可能的假信号,提高信号的可靠性。

## 策略优势

这种多元指标组合策略最大的优势在于能够综合不同指标的优势,形成更全面和准确的判断。

具体来说,VI能反映买卖力量,捕捉趋势转折。ROC-RSI则可判断价格是否过冷过热。Price ROC直接反映价格变化趋势。各指标能相互验证,避免单一指标造成失误。

同时,要求多个指标同时发出信号,可以过滤掉一些假信号,这也提高了交易信号的质量。

总之,多元指标组合策略可以发挥各指标的优势之处,互相补充验证,从而实现更可靠精准的交易策略。

## 策略风险及优化

该策略的主要风险在于各个指标参数设置不当,导致指标之间产生冲突。

例如,如果VI和Price ROC判断趋势向上,但ROC-RSI指数过高发出卖出信号,则可能错过买入机会。

要优化该策略,可以从以下几个方面入手:

1. 调整各指标的参数,使其能配合得当,发出一致的交易信号。

2. 增加或减少使用的指标数量和类型,找到最优指标组合。比如可以加入移动平均线等趋势指标。

3. 调整指标信号的合并逻辑,如改为多数指标发出信号时交易。

4. 添加止损机制,以控制单次损失。

5. 优化资金管理策略,如仓位大小设置等。

6. 测试不同品种和交易时段适用性。

通过持续优化,可以将多元指标组合策略发挥到极致,从而稳定获得超额收益。

## 总结

多元指标组合策略通过融合使用VI、ROC-RSI和Price ROC等指标的优势,实现更可靠和全面的市场判断,从而提高交易胜率。其最大优势在于指标互相验证,避免单一指标造成失误。同时优化指标组合也是实现策略最大效果的关键。通过不断测试和优化,多元指标组合策略能够有效地提升交易效果。

||

## Overview

The Multivariate Indicator Fusion strategy combines multiple technical indicators of different types, leveraging their respective strengths to make more accurate and comprehensive market assessments for improved trading outcomes.

## Strategy Logic

This strategy utilizes three technical indicators - Variable Index (VI), ROC-RSI, and Price Rate of Change (Price ROC).

Firstly, the strategy calculates VI, consisting of positive change indicator VIP and negative change indicator VIM. VIP and VIM measure the upward and downward power of price separately. Comparing the rate of change between VIP and VIM indicates the likelihood of future price rise or fall.

Secondly, the strategy combines ROC and RSI into ROC-RSI indicator. ROC measures the price movement over a longer period, while RSI reflects the overbought/oversold levels over a shorter period. ROC-RSI consolidates both information to determine if the current price is in an irrational extreme zone.

Lastly, Price ROC directly reflects the strength of price movement, assessing trend from price itself, unlike VI and ROC-RSI.

The strategy only generates trading signals when all three indicators concur. This filters out some potentially false signals and improves reliability. 

## Advantages of the Strategy

The biggest advantage of this multivariate strategy is consolidating the strengths of different indicators for more comprehensive and accurate assessments. 

Specifically, VI captures trend shifts by measuring buying/selling forces. ROC-RSI judges if prices are overheated or oversold. Price ROC directly reflects price trend. The indicators verify each other to avoid errors.

Requiring concurrence of multiple indicators also improves signal quality by filtering out false signals.

In summary, the multivariate strategy leverages the strengths of individual indicators, providing mutual verification for more reliable and precise trading.

## Risks and Optimization

The main risk is conflicting indicators due to improper parameter settings. 

For example, if VI and Price ROC signal upside but ROC-RSI is overbought, buy opportunities may be missed.

To optimize this strategy, consider:

1. Adjusting indicator parameters for proper coordination of trading signals.

2. Adding/removing indicators and types to find optimal combinations, e.g. adding moving averages. 

3. Altering signal logic, like trading on majority signal. 

4. Incorporating stop loss to limit downside.

5. Optimizing money management like position sizing. 

6. Testing applicability across different instruments and timeframes.

Continuous optimization can maximize the potential of the multivariate strategy for steady outperformance.

## Conclusion

The Multivariate Indicator Fusion strategy combines the strengths of indicators like VI, ROC-RSI and Price ROC for more reliable and comprehensive market assessments, improving win rate. Its biggest advantage is mutual verification to avoid single indicator errors. Meanwhile, optimizing indicator combinations is key to maximize performance. With continuous testing and optimization, the multivariate strategy can effectively enhance trading outcomes.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|VI Period|
|v_input_2|3|VI Smoothing Period|
|v_input_3|2|ROC-RSI Period|
|v_input_4|2|Smooth Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("drnkk Strategy", overlay=true)

//IF Function
IF(input)=>(exp(2*input)-1)/(exp(2*input)+1)

//VI Inputs
VI_pm = input(4, title="VI Period",minval=2)
VI_ps = input(3, title="VI Smoothing Period",minval=0)

//VI Calculation
VMP = sum( abs( high - low[1]), VI_pm )
VMM = sum( abs( low - high[1]), VI_pm )
STR = sum( atr(1), VI_pm )
VIP = VMP / STR
VIM = VMM / STR

//VI Smoothing
wmaVIP = (wma(VIP-1,VI_ps))*10
wmaVIM = (wma(VIM-1,VI_ps))*10

//VI IF Transform
IF_VIP=IF(wmaVIP)*100
IF_VIM=IF(wmaVIM)*100

roc_VIP =(wmaVIP - wmaVIP[VI_ps]) / VI_ps
plot(roc_VIP ? roc_VIP : na, color=lime)

roc_VIM = (wmaVIM - wmaVIM[VI_ps]) / VI_ps
plot(roc_VIM ? roc_VIM : na, color=purple)

//ROC-RSI Inputs
RSI_pm = input(2, title="ROC-RSI Period",minval=2)
RSI_ps = input(2, title="Smooth Period",minval=0)

//ROC Calculation and Smoothing
raw_ROC=(close - close[RSI_pm])/RSI_pm
wma_ROC=wma(raw_ROC,RSI_ps)
IF_ROC = IF(wma_ROC)*100

//RSI Calculation, Smoothing, Inverse Fisher Transformation
raw_RSI=0.1*(rsi(close,RSI_pm)-50)
wma_RSI=wma(raw_RSI,RSI_ps)
IF_RSI = IF(wma_RSI)*100

VI_long = roc_VIP >roc_VIM
VI_short = roc_VIM >roc_VIP

RSI_long = IF_RSI > 80
RSI_short = IF_RSI < -80

ROC_long = IF_ROC > 75
ROC_short = IF_ROC < -75

longCondition = year >= 2018 and VI_long and ROC_long and RSI_long
if (longCondition)
    strategy.entry("BUY", strategy.long)

shortCondition = year >= 2018 and VI_short and ROC_short and RSI_short
if (shortCondition)
    strategy.entry("SELL", strategy.short)
    
```

> Detail

https://www.fmz.com/strategy/428071

> Last Modified

2023-09-28 12:01:57
