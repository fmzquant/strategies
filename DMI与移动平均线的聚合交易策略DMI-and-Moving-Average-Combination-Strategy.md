
> Name

DMI与移动平均线的聚合交易策略DMI-and-Moving-Average-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略结合了123反转策略、DMI策略和移动平均线策略,实现了不同类型策略的有效聚合,形成一个强大的组合策略。该策略可以在趋势反转点进行反向操作,又可以在趋势延续时顺势操作,同时还利用移动平均线进行过滤,可以有效识别市场趋势方向,提高策略胜率。

## 策略原理

1. 123反转策略:当收盘价连续2天低于前一日收盘价后转为高于前一日收盘价,且9日慢速K线低于50时做多;当收盘价连续2天高于前一日收盘价后转为低于前一日收盘价,且9日快速K线高于50时做空。

2. DMI策略:当+DI线上穿-DI线时做多;当-DI线下穿+DI线时做空。

3. 移动平均线策略:当收盘价上穿移动平均线时做多;当收盘价下穿移动平均线时做空。

4. 三种策略信号发出同向信号时开仓,否则平仓。

该策略结合趋势策略和反转策略,能及时捕捉价格反转机会的同时不错过趋势运行机会。移动平均线过滤可以减少虚假信号。多种策略相互验证,可以提高信号的可靠性。

## 策略优势分析

1. 结合多种策略,提高胜率。123反转策略可捕捉转折点,DMI策略可捕捉趋势,移动平均线可过滤信号。

2. 反转策略与趋势策略结合,既可捕捉反转又可捕捉趋势,弹性交易。

3. 使用移动平均线过滤,可减少因短期波动产生的虚假信号。

4. 多策略组合可相互验证信号,避免单一策略因受某种市场环境影响而失效。

5. 策略参数较多,可以通过优化找到最佳参数组合,提高策略稳定性。

## 风险分析

1. 反转策略容易在震荡趋势中被套住。可通过结合趋势策略来规避。

2. DMI策略可能会漏掉趋势初期的机会。可适当缩短DMI的参数来提高灵敏度。

3. 移动平均线存在滞后性,可能会延迟生成信号。可适当缩短周期来加快反应速度。 

4. 多策略组合虽可提高胜率,但也增加了策略复杂度。需仔细测试各参数设定。

5. 策略对交易成本敏感。建议适当放宽止损范围,避免过于频繁开平仓。

## 策略优化方向

1. 对各策略参数进行优化,找到最佳参数组合。

2. 添加其他指标过滤信号,如MACD、RSI等,进一步提升策略稳定性。

3. 增加止损策略,如趋势止损、震荡止损等,控制风险。

4. 优化仓位管理,如固定仓位、动态仓位等,提高策略收益率。

5. 针对特定品种进行参数调整,提高策略适应性。

6. 增加机器学习模型辅助决策,利用更多历史数据提升策略表现。

## 总结

本策略通过有效结合反转策略、趋势策略和移动平均线过滤,形成一个灵活多变的聚合策略。它既可捕捉价格转折点,又可捕捉趋势的延续,通过多策略组合提高信号的稳定性和可靠性。在优化参数设定、止损策略、仓位管理等方面还有进一步改进的空间,具有很强的实用性和拓展性。如果能熟练掌握该策略的运用,相信可以在实盘交易中获得可观的收益。

||

## Overview

This strategy combines the 123 reversal strategy, DMI strategy and moving average strategy to form an effective combination strategy. It can make reverse operations at trend reversal points and follow the trend when the trend continues. Meanwhile, it uses moving average to filter and identify market trend directions to improve strategy win rate.

## Strategy Logic

1. 123 reversal strategy: go long when close price is higher than previous close for 2 consecutive days and 9-day slow K line is below 50; go short when close price is lower than previous close for 2 consecutive days and 9-day fast K line is above 50.

2. DMI strategy: go long when +DI crosses above -DI; go short when -DI crosses below +DI. 

3. Moving average strategy: go long when close price crosses above MA; go short when close price crosses below MA.

4. Open positions when three strategies give consistent signals, otherwise close positions.

The strategy combines trend strategies and reversal strategies, which can capture reversal opportunities and trend-following opportunities. The moving average filter can reduce false signals. Multiple strategies verify each other and improve signal reliability.

## Advantage Analysis 

1. Combining multiple strategies improves win rate. 123 reversal for catching turning points, DMI for catching trends and MA filter for filtering signals.

2. Combining reversal and trend strategies enables catching reversals and trends flexibly.

3. MA filter reduces false signals from short-term fluctuations.

4. Combining multiple strategies verifies signals and avoids failure of single strategy.

5. Multiple parameters allow optimization for best parameter combination and higher stability.

## Risk Analysis

1. Reversal strategies are prone to being trapped in range-bound trends. Combining with trend strategies helps avoid.

2. DMI may miss early trend opportunities. Can shorten DMI parameters to improve sensitivity.

3. MA has lagging effect and may delay signal generation. Can shorten MA period to speed up reaction.

4. Although combining strategies improves win rate, it also increases complexity. Careful testing of parameters is needed.

5. The strategy is sensitive to transaction costs. Should relax stop loss to avoid over-trading.

## Optimization Directions

1. Optimize parameters of each strategy to find best combination.

2. Add other indicators like MACD, RSI to filter signals and improve stability. 

3. Add stop loss strategies like trailing stop loss to control risks.

4. Optimize position sizing like fixed/dynamic sizing to improve return.

5. Fine tune parameters for specific products to improve adaptiveness. 

6. Add machine learning models to assist decisions and improve performance.

## Conclusion

This strategy forms a flexible combination system by effectively combining reversal, trend and MA filter strategies. It can capture both reversal and trend-following opportunities, and improves signal reliability through multiple strategies. There is still room for further improvements in parameters, stop loss, position sizing and so on. With skilled application, this practical and expandable strategy can generate considerable profits in live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|30|Length_MA|
|v_input_6|14|Length_DMI|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-18 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 15/10/2019
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
// The related article is copyrighted material from Stocks & Commodities Aug 2009 
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

fFilter(xSeriesSum, xSeriesV, Filter) =>
    iff(xSeriesV > Filter, xSeriesSum, 0)

DMIMA(Length_MA, Length_DMI) =>
    pos = 0.0
    xMA = sma(close, Length_MA)
    up = change(high)
    down = -change(low)
    trur = rma(tr, Length_DMI)
    xPDI = fixnan(100 * rma(up > down and up > 0 ? up : 0, Length_DMI) / trur)
    xNDI = fixnan(100 * rma(down > up and down > 0 ? down : 0, Length_DMI) / trur)
    nPDI = xPDI
    nNDI = xNDI
    nMA = xMA
    nPDI_1 = xPDI[1]
    nNDI_1 = xNDI[1]
    nMA_1 = xMA[1]
    bMDILong = iff(nPDI > nNDI and nPDI_1 < nNDI_1, true, 
                 iff(nPDI < nNDI and nPDI_1 > nNDI_1, false, false)) 
    bMDIShort = iff(nPDI > nNDI and nPDI_1 < nNDI_1, false, 
                  iff(nPDI < nNDI and nPDI_1 > nNDI_1, true, false)) 
    bMALong = iff(close > nMA and close[1] < nMA_1, true, 
                 iff(close < nMA and close[1] > nMA_1, false, false))
    bMAShort = iff(close > nMA and close[1] < nMA_1, false, 
                 iff(close < nMA and close[1] > nMA_1, true, false))
    pos := iff(bMDILong and bMALong, 1, 
         iff(bMDIShort and bMAShort, -1, nz(pos[1], 0)))
    pos

strategy(title="Combo Backtest 123 Reversal & DMI & Moving Average", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Length_MA = input(30, minval=1)
Length_DMI = input(14, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posDMIMA = DMIMA(Length_MA,Length_DMI)
pos = iff(posReversal123 == 1 and posDMIMA == 1 , 1,
	   iff(posReversal123 == -1 and posDMIMA == -1, -1, 0)) 
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

https://www.fmz.com/strategy/427309

> Last Modified

2023-09-19 21:51:14
