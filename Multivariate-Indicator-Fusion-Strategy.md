
> Name

Multivariate-Indicator-Fusion-Strategy

> Author

ChaoZhang

> Strategy Description


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
