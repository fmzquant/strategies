
> Name

基于较平滑RSI指标的交易策略Smoothed-RSI-Trading-Strategy-Based-on-Improved-RSI-Indicator

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略运用John Ehlers开发的一种改进型相对强弱指数(RSI)指标,该指标通过特殊的平滑方法降低滞后,从而产生更可靠的交易信号。该策略可以在参数设置中轻松改变做多和做空方向。

## 策略原理

该策略首先计算一个平滑价格,即当前收盘价与前3日的收盘价平均值。然后计算该平滑价格上涨和下跌的momentum,再通过normalize的方式计算出0-1之间的RSI值。最后根据RSI高于0.5为看多信号,RSI低于0.5为看空信号,产生交易指令。

该策略的核心在于改进的RSI指标计算方式。传统RSI仅看一个周期的价格变化,这导致随着周期参数增大,滞后也越严重。Ehlers的思路是考量多个周期的价格变化趋势,并进行加权平均,这样就能在降低滞后的情况下平滑价格变化带来的短期噪声。

具体来说,该策略不是简单看涨跌比例,而是计算价格上涨和下跌的momentum值。然后再normalize求出0-1区间的RSI。这样便能充分反映出价格变化趋势,并产生更可靠的交易信号。

## 策略优势

相比传统RSI指标,该策略通过改进后的平滑RSI具有以下优势:

1. 减小滞后,能更快捕捉趋势反转
2. 平滑价格变化,过滤短期市场噪声
3. 考量多个周期变化趋势,信号更可靠 
4. 可自定义参数,适用于不同市场周期
5. 理论基础全面,容易理解和调优

总的来说,该策略集成了RSI指标的优点,并改进了其中的滞后、平滑度等弱点。这使得我们能利用改进后更强大和可靠的RSI信号,在降低市场噪声干扰的同时,及时抓住趋势变化机会。

## 策略风险

尽管该策略对RSI指标进行了有益改进,但仍然存在一定风险需要注意:

1. RSI容易产生假信号,需要组合其他指标过滤
2. 单一参数优化不足,可考虑动态周期优化
3. 大周期设置会错过短期操作机会
4. 需避免在震荡市场使用,应选择趋势明显时期
5. 策略信号频繁,需要合理控制交易频率

建议通过以下方法降低策略风险:

1. 增加均线等趋势指标组合过滤信号
2. 动态优化RSI参数,适应不同市场周期
3. 结合更多时段K线,发掘更多交易机会
4. 避开盘整震荡市场,选择趋势性时期运用策略
5. 增加资金管理模块,控制单笔交易资金比例

## 策略优化方向  

该策略可以从以下方面进行进一步优化:

1. 增加止损策略,以控制单笔交易风险
2. 结合多个周期RSI指标,形成交易组合
3. 开发动态RSI参数优化模块,适应市场变化
4. 优化入场机制,避免假突破产生错误信号
5. 增加趋势指标过滤,提高信号质量
6. 增设反转模块,以捕捉强势趋势反转
7. 结合机器学习预测下一周期价格,提前获取交易信号

通过不断优化参数设置、信号过滤和组合等方法,可以将该策略打造成一个更强大、可靠、带有趋势意识的RSI交易系统。这将大幅提高策略的胜率和盈利能力。

## 总结

该策略通过改进RSI的计算方法实现更好的平滑效果,有效降低滞后并提高信号质量。策略优势主要体现在平滑价格变化、及时捕捉趋势转折等方面。但仍需要注意一定的风险,并通过持续优化不断提升策略效果。总体来说,该策略为RSI指标的应用提供了新的思路和方法,也为我们的交易决策带来更多价值。

||

## Overview

This strategy utilizes an improved RSI indicator developed by John Ehlers, which uses special smoothing techniques to reduce lag and generate more reliable trading signals. The strategy allows easy switching between long and short directions in the input settings.

## Strategy Logic

The strategy first calculates a smoothed price, which is the average of the current closing price and previous 3 days' closing prices. Then it calculates the upward and downward momentum of this smoothed price, and normalizes them into a 0-1 RSI value. Finally a RSI above 0.5 generates a long signal, while a RSI below 0.5 generates a short signal. 

The core of this strategy lies in the improved calculation of the RSI indicator. The traditional RSI only looks at price change over a single period, which causes increasing lag as the period parameter rises. Ehlers' idea is to consider the price trend over multiple periods, and take a weighted average, so as to smooth out short-term price noises while reducing lag.

Specifically, rather than simply looking at the rise/fall ratio, this strategy calculates the upward and downward momentum of the smoothed price. The RSI is then normalized to the 0-1 range. This better reflects the price trend and generates more reliable trading signals.

## Advantage Analysis

Compared to the traditional RSI indicator, this strategy has the following advantages owing to the improved smoothed RSI:

1. Reduced lag, able to capture trend reversal more quickly
2. Smoothed price change, filters out short-term market noise
3. Considers multiple period trends, more reliable signals
4. Customizable parameters suitable for different market cycles  
5. Solid theoretical foundation, easy to understand and optimize

In summary, this strategy combines the merits of RSI while improving upon its weaknesses like lag and smoothing. This allows us to take advantage of the more powerful and reliable RSI signals, while reducing market noise and timely capturing trend changes.

## Risk Analysis 

Despite the beneficial improvements made to the RSI, some risks remain:

1. RSI prone to false signals, needs combining with other indicators  
2. Single parameter optimization insufficient, consider dynamic period optimization
3. Long periods may miss short-term opportunities 
4. Avoid using in range-bound choppy markets, better for trending periods
5. Frequent signals, need proper trade frequency control

Suggested ways to reduce risks:

1. Add MA and other trend filters to filter signals
2. Dynamically optimize RSI parameters for different market cycles
3. Add more timeframe analysis to uncover more opportunities
4. Avoid choppy markets, use strategy in trending periods 
5. Add position sizing to control per trade risk 

## Optimization Directions

This strategy can be further improved in the following aspects:

1. Add stop loss to control per trade risk
2. Combine multi-period RSI for signal combination
3. Develop dynamic RSI parameter optimization for market adaptiveness 
4. Optimize entry for avoiding false breakouts
5. Add trend filter to improve signal quality
6. Add reversal detection module to catch strong trend reversals
7. Incorporate ML to predict next period price for early signal

With continuous optimizations on parameters, filters, combinations, this strategy can be made into a more powerful, reliable, trend-aware RSI trading system, significantly improving win rate and profitability.

## Conclusion

This strategy achieves better smoothing and reduced lag by improving RSI calculation, effectively smoothing price changes and timely capturing trend shifts. The advantages mainly lie in smoothing price action and catching trend turns. Risks remain and continuous optimizations can further improve the strategy. Overall, it provides new ideas on applying RSI, and brings more value to our trading decisions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-19 00:00:00
end: 2023-09-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 16/11/2017
// This is new version of RSI oscillator indicator, developed by John Ehlers. 
// The main advantage of his way of enhancing the RSI indicator is smoothing 
// with minimum of lag penalty. 
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Smoothed RSI")
Length = input(10, minval=1)
reverse = input(false, title="Trade reverse")
xValue = (close + 2 * close[1] + 2 * close[2] + close[3] ) / 6
CU23 = sum(iff(xValue > xValue[1], xValue - xValue[1], 0), Length)
CD23 = sum(iff(xValue < xValue[1], xValue[1] - xValue, 0), Length)
nRes = iff(CU23 + CD23 != 0, CU23/(CU23 + CD23), 0)
pos = iff(nRes == 0, -1,
	   iff(nRes == 1, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nRes, color=blue, title="Smoothed RSI")
```

> Detail

https://www.fmz.com/strategy/427880

> Last Modified

2023-09-26 15:35:36
