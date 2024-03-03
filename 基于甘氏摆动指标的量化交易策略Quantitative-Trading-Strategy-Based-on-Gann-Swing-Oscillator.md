
> Name

基于甘氏摆动指标的量化交易策略Quantitative-Trading-Strategy-Based-on-Gann-Swing-Oscillator

> Author

ChaoZhang

> Strategy Description


[trans]  

本文将详细介绍一种利用甘氏摆动指标进行量化交易的策略。该策略通过计算多空极值点来判断市场的多空趋势,以产生交易信号。

一、策略原理

该策略的核心指标是甘氏摆动指标,主要计算步骤如下:

1. 计算一定周期内的最高价和最低价;

2. 比较过去两根K线的最高价与最新K线的大小关系,判断多头极值点;

3. 比较过去两根K线的最低价与最新K线的大小关系,判断空头极值点; 

4. 根据极值点关系计算甘氏摆动指标值;

5. 根据指标值判断多空趋势并产生交易信号。

这样,通过判断价格的多空极值点,可以有效识别出市场的反转点和趋势方向。

二、策略优势

该策略最大的优势在于指标计算简单,直接利用价格极值比较判断趋势方向。

另一优势是参数设置简单,只需要一个周期参数即可。

最后,交易信号明确,或多或空,避免重叠操作。

三、潜在风险

但该策略也存在一些潜在问题:  

首先,指标对突破信号判定存在滞后,可能错过最佳入场点位。

其次,没有设置止损止盈,无法控制单笔交易风险。

最后,信号频繁需要合理资金管理以控制亏损。

四、内容总结

本文详细介绍了一种基于甘氏摆动指标的量化交易策略。它通过判断价格极值点来识别市场趋势和反转时点。但也存在一些问题有待改进,如设置止损止盈、防控信号滞后等。总体来说,它提供了一种独特的利用价格比较判断趋势的策略思路。

||

This article explains in detail a quantitative trading strategy using the Gann Swing Oscillator. It determines market trend by calculating price extrema to generate trading signals. 

I. Strategy Logic

The core indicator is the Gann Swing Oscillator. The main calculation steps are:

1. Calculate highest high and lowest low over a period. 

2. Compare the last two bars' highest high with the latest bar to identify bullish extremum.

3. Compare the last two bars' lowest low with the latest bar to identify bearish extremum.

4. Calculate Gann Oscillator value based on extreme relationships. 

5. Determine trend direction and generate signals according to the indicator value.

This identifies market reversal points and trends effectively through judging price extrema.

II. Advantages of the Strategy  

The biggest advantage is the simplicity of the indicator, utilizing price extreme comparisons directly to determine trend direction.

Another advantage is the minimal parameter requirement of just one variable.

Lastly, trade signals are unambiguous being either long or short, avoiding overlapping positions.

III. Potential Risks

However, some potential issues exist:

Firstly, the indicator has lag in detecting breakout signals, causing missed best entries.

Secondly, the lack of stop loss and take profit fails to control risk per trade.

Finally, frequent signals require proper money management to limit losses. 

IV. Summary

In summary, this article has explained a quantitative trading strategy using the Gann Swing Oscillator. It identifies market trends and reversals by judging price extrema. But improvements can be made such as adding stops and managing signal lag. Overall it provides a unique approach of using price comparisons to determine trends.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-08-26 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 19/06/2017
// The Gann Swing Oscillator has been adapted from Robert Krausz's book, 
// "A W.D. Gann Treasure Discovered". The Gann Swing Oscillator helps 
// define market swings. 
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Gann Trend Oscillator")
Length = input(3, minval=1)
reverse = input(false, title="Trade reverse")
hline(0, color=gray, linestyle=hline.style_dashed)
xHH = highest(close, Length)
xLL = lowest(close, Length)
xGSO = iff(xHH[2] > xHH[1] and xHH[0] > xHH[1], -1,
         iff(xLL[2] < xLL[1] and xLL[0] < xLL[1], 1, nz(xGSO[1],0)))
pos = iff(xGSO > 0, 1,
	     iff(xGSO < 0, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )        
plot(xGSO, color=blue, title="GTO")
```

> Detail

https://www.fmz.com/strategy/426883

> Last Modified

2023-09-15 11:37:37
