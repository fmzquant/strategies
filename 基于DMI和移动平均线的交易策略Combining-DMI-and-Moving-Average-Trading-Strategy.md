
> Name

基于DMI和移动平均线的交易策略Combining-DMI-and-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过结合趋向指标DMI和移动平均线来识别的趋势方向,以发出买入和卖出信号。当DMI显示报价进入趋势状态且移动平均线确认趋势方向时,策略会产生交易信号。

## 策略原理

该策略主要基于两个指标:

1. DMI包括DMI+和DMI-,用于识别趋势的存在及方向。当DMI+高于DMI-,表示上升趋势;当DMI-高于DMI+,表示下跌趋势。

2. 移动平均线,一般选取15到50天的平均线,用于判断价格趋势方向。当价格高于(低于)移动平均线时,表示上升(下跌)趋势。

策略首先计算DMI+、DMI-和移动平均线。在DMI显示趋势状态(DMI+高于DMI-或DMI-高于DMI+)的同时,如果移动平均线也确认该趋势方向,则产生交易信号。具体来说:

- 当DMI+上穿DMI- 且价格上穿移动平均线时,做多;
- 当DMI-上穿DMI+ 且价格下穿移动平均线时,做空。

该策略同时加入了反转输入选项。启用反转后,做多和做空信号会反向。

## 优势分析

这种结合趋向指标和趋势指标的策略,可以提高信号的可靠性,利用两种指标的优势进行互补。

DMI的优势在于可以快速识别趋势的存在。而移动平均线可过滤掉部分噪音,确认趋势方向。两者结合使用,可以在趋势形成时较早进入场内,同时避免在非趋势时随波逐流。

另外,该策略加入反转选项,可以根据实际需要选择顺势或逆势交易。这增加了策略的灵活性。

## 风险分析

该策略主要存在以下风险:

1. 在趋势转换时,可能出现错误信号,从而导致亏损。这需要调整参数,或设置止损来控制风险。

2. 趋势形成需要一定时间,在此期间策略容易受到价格震荡的干扰,产生错误信号。可以适当调整DMI和移动平均线的参数期限来过滤这种噪音。

3. 反转交易面临逆势亏损扩大的风险。启用反转时,需要控制单笔亏损比例,或使用移动止损来锁定部分利润。

4. 不同品种和不同时间周期下,参数需要重新优化。直接复制参数在其他品种或周期使用可能效果不佳。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 测试不同的移动平均线周期参数,找到衔接趋势转换的最佳参数组合。

2. 测试DMI的平滑周期参数,过滤趋势中出现的短期反转噪音。

3. 评估启用反转选项与默认顺势交易在历史回测中的效果差异,选择更优方案。

4. 加入止损策略,如移动止损、时间止损、突破止损等,控制单笔亏损。

5. 评估在不同品种和周期参数优化效果,优化参数组合。

6. 结合其他指标进行过滤,如强弱指标RSI,可避免局部极值点发出错误信号。

## 总结

该策略通过融合趋向指标DMI和移动平均线两种指标的优势,在趋势形成时较早进入场内,并可避免在震荡行情中被套牢。反转交易选项也增加了策略的灵活性。通过参数优化、止损以及与其他指标组合使用,可以进一步增强策略稳定性。但需要注意不同品种和周期下需要重新测试参数的适用性。

|| 

## Overview

This strategy combines the Directional Movement Index (DMI) and moving average to identify trend direction for  and generate trading signals. It will produce buy and sell signals when DMI indicates the price is in a trending state and the moving average confirms the trend direction.

## Strategy Logic 

The strategy is based on two main indicators:

1. DMI, including DMI+ and DMI-, is used to identify the existence and direction of a trend. When DMI+ is above DMI-, an uptrend is present. When DMI- is above DMI+, a downtrend is present.

2. The moving average, usually set to 15 to 50 days, is used to determine the price trend direction. When price is above (below) the moving average, an uptrend (downtrend) is indicated.

The strategy first calculates the DMI+, DMI-, and moving average. When DMI shows a trending state (DMI+ above DMI- or vice versa) and the moving average confirms the direction, a trading signal is generated. Specifically:

- When DMI+ crosses above DMI- and price crosses above MA, go long.

- When DMI- crosses above DMI+ and price crosses below MA, go short.

A reverse input option is also included. When enabled, the long and short signals are reversed.

## Advantage Analysis

Combining a trend-following indicator like DMI and a trend indicator like the moving average can improve signal reliability by utilizing the strengths of both. 

The advantage of DMI is its quick identification of emerging trends. The moving average helps filter noise and confirm the trend direction. Using both together allows earlier trend entries while avoiding false signals in non-trending markets.

The reverse option also adds flexibility to trade with or against the trend.

## Risk Analysis

The main risks of this strategy are:

1. Wrong signals may occur around trend transitions, leading to losses. Adjusting parameters or using stops can control this risk.

2. Trend formation takes time. In the meantime, price fluctuations may generate false signals. Lengthening DMI and MA periods can filter out this noise.

3. Reversal trading has larger loss risks in adverse moves. With the reverse option, loss size should be limited and trailing stops used to lock profits.

4. Parameters need to be re-optimized for different products and timeframes. Copying parameters directly may not work well.

## Optimization Directions

Possible optimizations for this strategy include:

1. Testing different moving average periods to find the best fit for trend transitions.

2. Testing the DMI smoothing periods to filter out short reversals within trends. 

3. Evaluating the effect of the reverse option versus default trend-following in historical backtests to choose the better approach.

4. Incorporating stop strategies like trailing stops, time stops, or breakout stops to limit loss size.

5. Evaluating parameter performance across different products and timeframes and optimizing parameters.

6. Adding filters like RSI to avoid false signals at localized extremes.

## Summary

This strategy combines the strengths of the trend-following DMI and moving average indicators to enter trends early while avoiding whipsaws in choppy markets. The reverse option also adds flexibility. Further enhancements in stability can come from parameter optimization, stops, and combining with additional filters. However, parameters will need to be re-tested for applicability across different products and timeframes.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|Length_MA|
|v_input_2|14|Length_DMI|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-28 00:00:00
end: 2023-09-27 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 03/03/2017
// The related article is copyrighted material from Stocks & Commodities Aug 2009 
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Combining DMI And Moving Average For A EUR/USD Trading System")
Length_MA = input(30, minval=1)
Length_DMI = input(14, minval=1)
reverse = input(false, title="Trade reverse")
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
bMDILong =iff(nPDI > nNDI and nPDI_1 < nNDI_1, true, 
           iff(nPDI < nNDI and nPDI_1 > nNDI_1, false, false)) 
bMDIShort =  iff(nPDI > nNDI and nPDI_1 < nNDI_1, false, 
              iff(nPDI < nNDI and nPDI_1 > nNDI_1, true, false)) 
bMALong = iff(close > nMA and close[1] < nMA_1, true, 
           iff(close < nMA and close[1] > nMA_1, false, false))
bMAShort = iff(close > nMA and close[1] < nMA_1, false, 
             iff(close < nMA and close[1] > nMA_1, true, false))
pos = iff(bMDILong and bMALong, 1, 
     iff(bMDIShort and bMAShort, -1, nz(pos[1], 0)))
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1 )
    strategy.entry("Long", strategy.long)
if (possig == -1 )
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(nPDI, color=green, title="DMI Plus")
plot(nNDI, color=red, title="DMI Minus")
```

> Detail

https://www.fmz.com/strategy/428075

> Last Modified

2023-09-28 12:39:44
