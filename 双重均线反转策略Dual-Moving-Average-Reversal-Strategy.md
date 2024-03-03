
> Name

双重均线反转策略Dual-Moving-Average-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

双重均线反转策略是一个综合利用均线和反转原理的股票交易策略。该策略首先利用123反转原理构建反转交易信号,然后结合2/20指数移动平均线进行过滤,只有当两者信号一致时才产生交易指令,以提高策略的稳定性。本策略旨在捕捉短期反转机会的同时,利用长期趋势 filter来锁定高概率交易机会。

## 策略原理

该策略由两部分组成:

1. 123反转策略 

123反转策略源自《我如何在期货市场上获得三倍回报》一书中的一个反转策略系统。该策略基于以下原理:如果在两天内收盘价从高变低,并且9日慢速K线低于50,那么可以认为目前处于反转点,应该买入。如果在两天内收盘价从低变高,并且9日快速K线高于50,那么可以认为目前处于反转点,应该卖出。

2. 2/20指数移动平均线策略

该策略利用2/20指数移动平均线来判断长期趋势。当价格高于2/20均线时为看涨,当价格低于2/20均线时为看跌。该策略可以用来过滤假突破。

综合这两种策略,当123反转信号和2/20均线信号一致时,才会产生真正的交易信号。

## 策略优势分析

该策略结合短期反转和长期趋势,具有以下优势:

1. 捕捉短期反转提供了较高的盈利机会

123反转策略可以捕捉短期的超买超卖现象,这些转折点往往带来较大的价格调整,因此可以获得较高的获利空间。

2. 2/20均线过滤可以避免假突破的风险

单纯的反转策略容易受到趋势市的冲击,产生大量假信号。加入2/20均线可以过滤掉与趋势不符的信号,避免追顶和接底的风险,提高信号的质量。

3. 结合双重条件降低了盈亏比的风险

仅仅依靠单一指标容易产生大量错误信号,而结合两个互补指标,可以明显提高信号的可靠性,降低盈亏比的损失。

4. 策略思路清晰易于理解和优化

该策略各部分功能明确,思路清晰,易于理解其形成原因,也容易根据实际情况进行调整优化,适应更广泛的市场环境。

## 策略风险分析

尽管该策略具有明显的优势,但也存在一定的风险需要注意:

1. 反转不一定发生

历史表现不代表未来表现,反转信号出现后,价格反弹的幅度和力度都存在不确定性,可能会导致亏损。

2. 趋势可能延续

2/20均线并不能完全过滤趋势行情,当趋势非常强劲时,短期调整依然可能会被主趋势吞噬,从而产生损失。

3. 参数设置需要优化

不同参数设置会对策略表现产生重大影响,需要通过大量回测和模拟来找出最优参数,而参数的最优范围也可能根据市场环境发生变化。

4. 长期效果存在不确定性

短期历史表现良好也不意味着可以长期稳定盈利,市场的随机性很强,策略的长期效果需要在不同市场环境中进行验证。

可以通过合理调整参数、设置止损、进行风险管理等方法来控制这些风险。此外,可以考虑加入更多条件来提高策略稳定性,比如交易量、波动率等指标,也可以引入机器学习等方法实现动态优化。

## 策略优化方向

该策略可以从以下几个方面进行进一步优化:

1. 优化反转参数

可以测试不同的参数组合,寻找更稳定更明显的反转现象,以提高反转信号的质量。

2. 优化均线系统

可以测试不同参数的均线组合,或者加入多重均线判断,使趋势判断更准确和全面。

3. 加入更多Filter条件 

可以在成交量、波动率等指标的基础上,设置更多过滤条件,降低误判率,提升稳定性。

4. 进行参数动态优化

可以收集大量历史数据,基于机器学习方法实现参数动态优化,使策略更具鲁棒性。

5. 结合止损策略

适当进行止损可以有效控制策略最大回撤和风险敞口。

6. 优化资金管理

优化仓位管理和资金分配,可以提高策略的全期绩效表现。

## 总结

双重均线反转策略是一个简单实用的短期交易策略。它结合了反转交易和趋势判断两大思路,既可以捕捉短期价格反转机会,又可以避免被突破的假信号误导。该策略思路清晰,易于理解和优化,具有良好的实际应用价值。但我们也要意识到无风险策略并不存在,需要通过不断优化和风险控制来使策略更加稳健可靠。

||


## Overview

The dual moving average reversal strategy is a trading strategy that combines mean reversion and moving average principles. It first generates reversal trading signals using the 123 reversal methodology, and then filters the signals with 2/20 exponential moving averages, only taking trades when the signals from both match to improve robustness. This strategy aims to capture short-term reversal opportunities while using the long-term trend filter to identify high probability setups.

## Strategy Logic

The strategy consists of two parts:

1. 123 Reversal Strategy

The 123 reversal strategy originates from the book "How I Tripled My Money in the Futures Market". It is based on the idea that if the closing price drops from a high to low level over 2 days, and the 9-day slow stochastic is below 50, it signals a reversal point to go long. If the closing price rises from a low to high level over 2 days, and the 9-day fast stochastic is above 50, it signals a reversal point to go short.

2. 2/20 Exponential Moving Average Strategy 

This strategy uses the 2/20 EMA to determine the long-term trend. When the price is above the 2/20 EMA line, it signals an uptrend. When the price is below the 2/20 EMA line, it signals a downtrend. This filters out false breakouts.

The strategy only generates trade signals when the 123 reversal signal aligns with the 2/20 EMA signal. 

## Advantage Analysis

This strategy has the following advantages by combining short-term reversals and long-term trends:

1. Captures high profit opportunities from short-term reversals

The 123 reversal targets overbought and oversold scenarios where significant price swings often occur, allowing for larger profit targets.

2. 2/20 EMA filter avoids false breakout risks 

Pure reversal strategies are susceptible to trending markets. The 2/20 EMA filter eliminates signals against the trend, preventing bad trades during fakeouts.

3. Dual conditions improve risk reward profile

A single indicator often generates erroneous signals. Combining two complementary indicators significantly improves reliability and risk-reward outcomes.

4. Clear logic makes optimization intuitive

The clear functionality of each component makes the logic intuitive to understand, optimize, and adapt to changing market environments.

## Risk Analysis 

Despite the advantages, some risks need to be considered:

1. Reversals may not materialize

Past performance does not guarantee future results. The extent of the actual reversal bounce is uncertain and may result in losses.

2. Trends can extend  

The 2/20 EMA cannot fully filter strong trending markets. Short term corrections can still get overwhelmed by the larger trend.

3. Parameter optimization is crucial

Performance is very sensitive to parameter settings which must be robustly optimized through extensive backtesting and tuned for changing markets.

4. Long-term efficacy uncertain

Good short-term results do not guarantee lasting performance. Markets are highly stochastic and long-term outcomes require robust validation across diverse environments.

These risks can be managed through parameter tuning, stop losses, risk controls etc. More conditions like volume, volatility indicators can improve robustness. Machine learning techniques could enable dynamic optimization as well.

## Enhancement Opportunities

Some ways to further optimize the strategy:

1. Optimize reversal parameters 

Test different parameter sets to find more stable and pronounced reversal patterns for higher quality signals.

2. Optimize moving average systems

Experiment with different MA parameters or incorporate multiple MA checks for more accurate trend assessment. 

3. Add more filters

Volume, volatility and other filters can be incorporated to reduce false signals and improve stability.

4. Implement dynamic optimization

Machine learning techniques on large historical datasets could enable dynamic and robust parameter tuning.

5. Incorporate stop loss strategies 

Intelligent stop loss rules help control maximum drawdown and risk exposure.

6. Optimize money management

Better position sizing and capital allocation can enhance overall performance.

## Conclusion

The dual moving average reversal is a simple yet practical short-term trading strategy. By combining mean reversion and trend-following concepts, it aims to profit from high probability price reversals while avoiding false breakouts. The clear logic makes it intuitive to understand, optimize and apply. However, no strategy is risk-free. Continued improvements in robustness and risk management are needed to extract consistent profits in diverse trading environments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- 2/20 Exponential MA ----|
|v_input_7|20|LengthMA|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-09-25 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 06/08/2021
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
// This indicator plots 2/20 exponential moving average. For the Mov 
// Avg X 2/20 Indicator, the EMA bar will be painted when the Alert criteria is met.
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


EMA220(Length) =>
    pos = 0.0
    xPrice = close
    xXA = ema(xPrice, Length)
    nHH = max(high, high[1])
    nLL = min(low, low[1])
    nXS = iff((nLL > xXA)or(nHH < xXA), nLL, nHH)
    pos :=  iff(close > xXA and close > nXS , 1,
    	     iff(close < xXA and close < nXS, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & 2/20 Exponential MA", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- 2/20 Exponential MA ----")
LengthMA = input(20, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posEMA220 = EMA220(LengthMA)
pos = iff(posReversal123 == 1 and posEMA220 == 1 , 1,
	   iff(posReversal123 == -1 and posEMA220 == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1 ) 
    strategy.entry("Long", strategy.long)
if (possig == -1 )
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/427878

> Last Modified

2023-09-26 15:27:58
