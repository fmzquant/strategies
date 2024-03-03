
> Name

双向反转与动量均线策略Bidirectional-Reversal-and-Momentum-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11554115ec75b689b99.png)
[trans]


## 概述

该策略是将反转策略与动量指标结合使用的组合策略。它整合了双向反转策略和香氏动量震荡器,旨在发现反转机会的同时验证动量信号,实现更可靠的交易信号。

## 策略原理

该策略由两部分组成:

第一部分是双向反转策略。它通过检测前两天的收盘价变化来判断反转机会。具体来说,如果前两天收盘价递减,当天收盘价较前一天收盘价上涨,且随机指标低于设定水平,则为买入信号。相反,如果前两天收盘价递增,当天收盘价较前一天收盘价下跌,且随机指标高于设定水平,则为卖出信号。

第二部分是香氏动量震荡器。它通过比较价格变化量与一定周期内的平均变化量大小来判断动量。如果动量指标高于设定上限,为买入信号;如果低于设定下限,为卖出信号。

该策略综合运用双向反转判断反转点和动量指标验证动量情况,只有两者信号同向时,才会产生实际的买入卖出信号。

## 策略优势

- 双重验证机制,避免虚假信号,提高信号的可靠性。反转策略判断潜在反转点,动量指标验证反转信号的有效性。

- 反转策略与趋势策略相结合,兼顾反转和趋势,灵活捕捉市场机会。

- 引入动量指标,避免反转陷阱,仅在动量确认时交易。

- 多种参数可调,可针对不同市场进行优化。

## 策略风险

- 反转信号可能出现回调深度大,需要合理止损。

- 反转时点捕捉需要精准,可能出现误判。

- 动量指标产生滞后,可能错过最佳反转时点。

- 参数设置需要根据具体市场谨慎优化,不当设置可能增加交易风险。

可通过合理止损来控制单笔损失。优化参数设置,追求参数稳健性。适当宽松反转信号触发条件,保留一定余地等方法来降低风险。

## 策略优化方向 

- 测试不同反转参数组合,寻找对市场反转的敏感参数设置。

- 尝试不同动量指标,如相对强弱指数、成交量变动率等。

- 添加过滤条件,如突破,避免非关键反转点的交易。

- 评估止损策略,寻找最大回撤可控的止损方法。

- 评估仓位控制策略,根据市况调整仓位大小。

## 总结

该策略融合反转策略和动量策略的优点,具有信号可靠性高、灵活捕捉市场机会的优势。通过参数优化、止损管理、仓位控制等方法可以降低风险,提高策略稳定性和盈利能力。总体来说,该策略开创性地探索了反转策略与趋势策略的有效结合,值得进一步研究和应用。

||


## Overview

This strategy combines reversal trading rules with momentum indicators. It integrates bidirectional reversal and Chande Momentum Oscillator to identify reversal opportunities while verifying momentum signals to generate more reliable trading signals.

## Strategy Logic

The strategy consists of two parts:

The first part is bidirectional reversal trading rules. It identifies reversal opportunities by detecting close price changes in previous two days. Specifically, if close prices decreased in previous two days, and current close price is higher than previous close, and Stochastic Oscillator is below a threshold, it triggers a buy signal. On the contrary, if close prices increased in previous two days, and current close price is lower than previous close, and Stochastic Oscillator is above a threshold, it triggers a sell signal.

The second part is Chande Momentum Oscillator. It compares the magnitude of price change with the average magnitude in a certain period to determine momentum. If the momentum indicator is above a upper limit, it generates a buy signal. If below a lower limit, it generates a sell signal. 

The strategy combines bidirectional reversal trading rules to locate potential reversal points, and momentum indicator to verify the validity of the reversal signals. Only when both signals agree, actual buy or sell signals will be generated.

## Advantages of the Strategy

- Dual verification mechanism improves signal reliability by avoiding false signals. Reversal trading rules identify potential reversal points, and momentum indicators verify effectiveness of the reversal signals.

- Combining reversal strategy with trend strategy provides flexibility to capture opportunities in both reversing and trending markets.

- Introducing momentum prevents falling into reversal traps by only trading when momentum confirms. 

- Multiple adjustable parameters can be optimized for different market conditions.

## Risks of the Strategy

- Reversal signals may face large pullbacks, requiring reasonable stop loss.

- Precise timing of reversals is difficult, may cause misjudgments. 

- Lagging of momentum indicators may cause missing best reversal entry points.

- Parameter tuning needs careful optimization based on specific markets, improper settings may increase risks.

Risks can be reduced by using proper stop loss, robust parameter optimization, keeping some room in reversal signal triggering conditions, etc.

## Directions for Optimization

- Test different reversal parameter combinations to find parameters sensitive to market reversals.

- Try different momentum indicators, like RSI, volume rate of change, etc. 

- Add filters like breakouts to avoid trading non-key reversal points.

- Evaluate stop loss strategies to find maximum drawdown-controlled methods.

- Assess position sizing strategies to adjust position sizes based on market conditions.

## Conclusion

The strategy combines the advantages of reversal and momentum strategies, with reliable signals and flexibility to capture opportunities. Parameters can be optimized, risks can be managed through stop loss and position sizing to improve stability and profitability. Overall, it explores effective integration of reversal and trend strategies, and is worth further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|9|LengthCMO|
|v_input_6|70|TopBand|
|v_input_7|-70|LowBand|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-06 00:00:00
end: 2023-11-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/08/2019
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This System was created from the Book "How I Tripled My Money In The 
// Futures Market" by Ulf Jensen, Page 183. This is reverse type of strategies.
// The strategy buys at market, if close price is higher than the previous close 
// during 2 days and the meaning of 9-days Stochastic Slow Oscillator is lower than 50. 
// The strategy sells at market, if close price is lower than the previous close price 
// during 2 days and the meaning of 9-days Stochastic Fast Oscillator is higher than 50.
//
// Second strategy
//    This indicator plots Chande Momentum Oscillator. This indicator was 
//    developed by Tushar Chande. A scientist, an inventor, and a respected 
//    trading system developer, Mr. Chande developed the CMO to capture what 
//    he calls "pure momentum". For more definitive information on the CMO and 
//    other indicators we recommend the book The New Technical Trader by Tushar 
//    Chande and Stanley Kroll.
//    The CMO is closely related to, yet unique from, other momentum oriented 
//    indicators such as Relative Strength Index, Stochastic, Rate-of-Change, 
//    etc. It is most closely related to Welles Wilder`s RSI, yet it differs 
//    in several ways:
//        - It uses data for both up days and down days in the numerator, thereby 
//          directly measuring momentum;
//        - The calculations are applied on unsmoothed data. Therefore, short-term 
//          extreme movements in price are not hidden. Once calculated, smoothing 
//          can be applied to the CMO, if desired;
//        - The scale is bounded between +100 and -100, thereby allowing you to 
//          clearly see changes in net momentum using the 0 level. The bounded scale 
//          also allows you to conveniently compare values across different securities.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
Reversal123(Length, KSmoothing, DLength, Level) =>
    vFast = sma(stoch(close, high, low, Length), KSmoothing) 
    vSlow = sma(vFast, DLength)
    pos = 0.0
    pos := iff(close[2] < close[1] and close > close[1] and vFast < vSlow and vFast > Level, 1,
	         iff(close[2] > close[1] and close < close[1] and vFast > vSlow and vFast < Level, -1, nz(pos[1], 0))) 
	pos

CMO(Length, TopBand, LowBand) =>
    pos = 0
    xMom = abs(close - close[1])
    xSMA_mom = sma(xMom, Length)
    xMomLength = close - close[Length]
    nRes = 100 * (xMomLength / (xSMA_mom * Length))
    pos :=  iff(nRes > TopBand, 1,
	         iff(nRes <= LowBand, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Chande Momentum Oscillator", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthCMO = input(9, minval=1)
TopBand = input(70, minval=1)
LowBand = input(-70, maxval=-1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posCMO = CMO(LengthCMO, TopBand, LowBand)
pos = iff(posReversal123 == 1 and posCMO == 1 , 1,
	   iff(posReversal123 == -1 and posCMO == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/431275

> Last Modified

2023-11-06 16:18:18
