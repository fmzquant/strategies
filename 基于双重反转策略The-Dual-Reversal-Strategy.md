
> Name

基于双重反转策略The-Dual-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8354486a6ef9e8b807.png)
[trans]
## 概述
双重反转策略是一个结合123反转和三日反转形态的量化策略,用于提高交易信号质量,减少风险。该策略采用差价指标与k线形态指标相结合的交易方式,当两种指标同时发出信号时进行交易,从而提高信号准确率。

## 策略原理  
双重反转策略结合了两种不同类型的交易策略,首先是123反转策略,该策略运用差价指标,在连续两天收盘价反转,且随机指标触发阈值时发出信号。另一种是三日反转形态策略,该策略观察三日k线,在中间日最低,且最后一日收盘价高于前一日最高价时发出信号。当两种策略同时发出同向信号时,即进行买入或卖出操作。  

具体来说,123反转策略运用9日随机指标判断超买超卖现象。在价格连续两日下跌,且随机指标低于50时为买入信号;连续两日上涨,随机指标高于50时为卖出信号。三日反转形态策略则检测价格在三日内是否出现先高后低再高的模式。这显示了短期的超卖被反转的信号。  

双重反转策略要求两种策略同时发出信号才会开仓。这将大大降低假信号率,使得系统只在高概率机会下进行交易。  

## 优势分析
相较于单一策略,双重反转策略有以下优势:  
1. 提高信号质量,减少假信号  
2. 双重指标验证,回撤概率更低  
3. 充分发掘短期和中期反转机会  
4. 容易理解与实施  

## 风险与解决  
双重反转策略的主要风险在于错过部分机会。因其对信号要求苛刻,一些单一指标交易机会将被错过。可以通过调整参数,放宽其中一个指标的条件,部分增加交易频率来解决。  

另一个风险是某些极端行情中,双重指标同时失效的概率较大。针对这种情况,可以增加止损机制,迅速平掉持仓减少损失。或者根据历史经验证明失效的极端行情特征打消交易信号,避免开仓。

## 优化建议  
双重反转策略可以从以下几个方面继续优化:  
1. 调整随机指标参数,提高对超买超卖的判断准确率  
2. 测试不同交易品种下的效果,寻找最佳适用对象  
3. 增加机器学习模型辅助判断,提高信号准确率  
4. 结合更多市场统计特征,如交易量变化、日内波动等找出最佳开仓时机

## 总结  
双重反转策略成功结合了反转交易思想与k线形态分析。它充分发掘价格短期中期回归本质的规律,有效抓住反转提供的机会。相较于简单追随趋势的方法,本策略在控制风险与收益之间找到了平衡点。通过不断优化与创新,相信其投资价值会持续得到验证。

||

## Overview
The dual reversal strategy is a quantitative strategy that combines the 123 reversal and three-bar reversal pattern to improve signal quality and reduce risk. It adopts a trading approach using a combination of price differential indicators and candlestick pattern indicators, opening positions only when both indicate a signal, thereby increasing signal accuracy.

## Strategy Principle
The dual reversal strategy brings together two different types of trading strategies. First is the 123 reversal strategy, which employs price differential indicators and triggers when prices reverse over two consecutive days and stochastic indicators cross threshold values. The second is the three-bar reversal pattern strategy, which looks at a three-day candlestick chart and triggers when the middle day posts the lowest low and the last day closes above the prior day's high. The strategy enters a long or short position when both strategies concurrently issue a signal in the same direction.   

Specifically, the 123 reversal strategy uses a 9-day stochastic oscillator to identify overbought and oversold conditions. It generates a buy signal when prices fall for two straight days and the stochastic readings dip below 50, and a sell signal when prices rise for two straight days and stochastic tops 50. The three-bar reversal pattern strategy detects if prices have formed a high-low-high pattern over three days, indicating a short-term oversold reversed by momentum.

The dual reversal strategy requires concordant signals from both strategies before taking any positions. This greatly reduces false signals, ensuring the system only trades at high-probability opportunities.  

## Advantage Analysis
Compared to single-strategy systems, the dual reversal strategy has the following advantages:
1. Improved signal quality, fewer false signals
2. Dual indicator confirmation, lower drawdown risk  
3. Captures both short-term and medium-term reversal opportunities
4. Simple to understand and implement

## Risks and Solutions
The main risk of the dual reversal strategy is missing some profitable opportunities. Due to its strict signal requirements, some trading opportunities identified by individual indicators will be skipped. This can be mitigated by adjusting parameters to relax the conditions of one indicator and increase trade frequency.  

Another risk is both indicators concurrently failing in extreme market conditions, yielding a higher rate of false signals. For such cases, stop-loss mechanisms can be added to quickly unwind positions and limit losses. Alternatively, disable trade signals during historically proven unfavorable extreme market conditions to avoid taking positions. 

## Optimization Suggestions
Further optimizations for the dual reversal strategy include:
1. Adjust stochastic indicator parameters to improve overbought/oversold assessment accuracy
2. Test effectiveness across different trading instruments to find best asset fit  
3. Incorporate machine learning models to aid signal validation and improve accuracy
4. Combine more market statistics like volume changes, intraday volatility to determine optimal entry timing.

## Conclusion
The dual reversal strategy successfully combines mean-reversion principles with candlestick pattern analysis, fully capturing the cyclicality in prices. Compared to simple trend-following methods, it strikes a balance between risk and reward. With continual enhancements, the strategy's value will be validated over time.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 17/04/2019
// This is combo strategies for get 
// a cumulative signal. Result signal will return 1 if two strategies 
// is long, -1 if all strategies is short and 0 if signals of strategies is not equal.
//
// First strategy
// This System was created from the Book "How I Tripled My Money In The 
// Futures Market" by Ulf Jensen, Page 183. This is reverse type of strategies.
// The strategy buys at market, if close price is higher than the previous close 
// during 2 days and the meaning of 9-days Stochastic Slow Oscillator is lower than 50. 
// The strategy sells at market, if close price is lower than the previous close price 
// during 2 days and the meaning of 9-days Stochastic Fast Oscillator is higher than 50.
//
// Secon strategy
// This startegy based on 3-day pattern reversal described in "Are Three-Bar 
// Patterns Reliable For Stocks" article by Thomas Bulkowski, presented in 
// January,2000 issue of Stocks&Commodities magazine.
// That pattern conforms to the following rules:
// - It uses daily prices, not intraday or weekly prices;
// - The middle day of the three-day pattern has the lowest low of the three days, with no ties allowed;
// - The last day must have a close above the prior day's high, with no ties allowed;
// - Each day must have a nonzero trading range. 
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

BarReversalPattern() =>
    pos = 0.0
    pos := iff(open[2] > close[2] and high[1] < high[2] and low[1] < low[2] and low[0] > low[1] and high[0] > high[1], 1,
	         iff(open[2] < close[2] and high[1] > high[2] and low[1] > low[2] and high[0] < high[1] and low[0] < low[1], -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Strategies 123 Reversal and 3-Bar-Reversal-Pattern", shorttitle="Combo Backtest", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
pos3BarReversalPattern = BarReversalPattern()
pos = iff(posReversal123 == 1 and pos3BarReversalPattern == 1 , 1,
	   iff(posReversal123 == -1 and pos3BarReversalPattern == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
```

> Detail

https://www.fmz.com/strategy/442823

> Last Modified

2024-02-26 12:07:32
