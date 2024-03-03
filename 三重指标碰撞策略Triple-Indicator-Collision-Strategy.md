
> Name

三重指标碰撞策略Triple-Indicator-Collision-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a897bb05ba5579fce9.png)
[trans]
## 概述

三重指标碰撞策略(Triple Indicator Collision Strategy)是一个非常经典的量化交易策略。它结合使用了移动平均线、MACD指标和RSI指标三个经典的技术指标,当三者同时出现买入或卖出信号时,进行相应的交易操作。

## 策略原理

该策略同时使用了20日EMA、MACD(12,26,9)和14日RSI三个指标。具体交易逻辑为:

当价格上穿20日EMA,MACD线上穿信号线,RSI上穿20日EMA时,做多;当价格下穿20日EMA,MACD线下穿信号线,RSI下穿20日EMA时,做空。

这样需要三个指标同时出现交易信号,可以过滤掉部分假信号,使策略更加稳定可靠。

## 优势分析

这种多指标碰撞的策略有以下几个优势:

1. 过滤噪音,减少假信号。单一指标容易受到市场噪音的影响,产生大量假信号。而三重指标可以有效过滤噪音,使信号更加可靠。

2. 捕捉趋势的转折点。不同指标对价格波动的反应时间不同,当三者近期出现同向信号时,常常预示着趋势反转。这为策略捕捉转折点提供了可能。  

3. 多维度判断市场。三个指标从不同维度判断市场,互相验证,可以更全面准确判断市场走势。

4. 降低仓位风险。多指标过滤可以减少无效交易次数,降低无谓的资金周转,有利于风险控制。

## 风险分析

该策略也存在一些风险:  

1. 参数优化风险。移动平均线长度、MACD参数组合、RSI参数等都可能影响策略表现,不合适的参数组合可能导致策略行情不佳。因此需要对参数组合进行全面的测试和优化,找到最佳参数。

2. 错失交易机会。三重指标策略相对保守,可能错过部分交易机会。如果不能捕捉主要趋势,会影响策略收益。

3. 实盘滑点控制。实盘中交易成本和滑点也会对策略产生一定影响,需要控制好交易频率,确保盈利空间大于交易成本。

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 测试不同的参数组合,找到最佳参数。可以改变移动平均线长度、MACD参数、RSI参数等,通过回测找到最优参数组合。

2. 增加止损机制。设定移动止损或挂单止损,可以有效控制单笔亏损。

3. 结合其它指标过滤信号。比如布林带、KDJ等指标也可以用来验证信号,过滤假信号。

4. 根据不同品种、周期调整参数。参数可以根据交易品种和周期进行调整优化。

## 总结  

三重指标碰撞策略同时利用移动平均线、MACD和RSI三个指标的信号,进行多空决策。它可以有效过滤噪音信号,识别潜在趋势转折点,提高信号的可靠性。通过参数优化、止损设定、信号过滤等手段,可以不断改进该策略,使其信号更加清晰,收益更加可靠。

||

## Overview  

The Triple Indicator Collision Strategy is a very classic quantitative trading strategy. It combines three classic technical indicators - moving average, MACD indicator and RSI indicator. It generates trading signals when all three indicators produce buy or sell signals simultaneously.  

## Strategy Principle

This strategy uses 20-day EMA, MACD(12, 26, 9) and 14-day RSI altogether. The specific logic is:

When price crosses above 20-day EMA, MACD histogram crosses above signal line, and RSI crosses above 20-day EMA of RSI, go long. When price crosses below 20-day EMA, MACD histogram crosses below signal line, and RSI crosses below 20-day EMA of RSI, go short.

With trading signals generated only when all three indicators agree, this filters out some false signals and makes the strategy more solid and reliable.  

## Advantage Analysis 

The triple indicator collision strategy has the following advantages:

1. Filtering out noise and reducing false signals. Single indicator is prone to market noise and false signals. Using three indicators can filter out noise effectively and make signals more reliable.

2. Capturing inflection points in trends. Different indicators react to price fluctuations differently. When three indicators agree in the short term, it often signifies a trend reversal. This provides the possibility to capture inflection points.

3. Judging market from multiple dimensions. The three indicators analyze market from different angles, verifying each other, so as to judge market trends more comprehensively and accurately.  

4. Lowering position risks. Filtering with multiple indicators reduces inefficient trade times and unnecessary fund turnover, which helps on risk control.

## Risk Analysis

There are also some risks with this strategy:  

1. Parameter optimization risk. The parameters of moving average length, MACD parameters, RSI parameters etc. can all impact strategy performance. Unsuitable parameter combination may lead to poor strategy performance in market trends. Therefore comprehensive testing and optimization is needed to find the optimal parameter combination.  

2. Missing trading opportunities. The triple indicator strategy is relatively conservative and may miss some trading chances. If it fails to capture major trends, it will hurt strategy profitability.

3. Slippage control in live trading. In live trading, transaction costs and slippage also impact strategies to some extent. Trading frequency needs to be controlled to ensure profit margin is greater than transaction costs.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Test different parameter combinations to find the optimal parameters, by altering the lengths of moving averages, MACD parameters, RSI parameters etc. 

2. Add stop loss mechanisms. Moving stop loss or pending order stop loss can effectively control single trade loss.

3. Combine other indicators to filter signals. Bollinger Bands, KDJ etc. can also be used to verify signals and filter out false signals.

4. Adjust parameters based on different products and timeframes. Parameters can be optimized according to the trading products and timeframes.  

## Conclusion

The Triple Indicator Collision Strategy utilizes the trading signals from moving averages, MACD and RSI altogether to make long and short decisions. It can effectively filter out noise and identify potential inflection points in trends, making trade signals more reliable. By optimizing parameters, setting stop loss, filtering signals and so on, this strategy can be continuously improved to generate clearer signals and more reliable profits.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|EMA length|
|v_input_2|12|MACD Fast|
|v_input_3|26|MACD Slow|
|v_input_4|20|MACD Signal length|
|v_input_5|14|RSI length|
|v_input_6|20|RSI signal length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-29 00:00:00
end: 2024-01-28 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © fangdingjun

//@version=4
strategy("MACD_RSI strategy", overlay=false)

_ema_len = input(20, title="EMA length")
_macd_fast = input(12, title="MACD Fast")
_macd_slow = input(26, title="MACD Slow")
_macd_signal_len = input(20, title="MACD Signal length")
_rsi_len = input(14, title="RSI length")
_rsi_signal_len = input(20, title="RSI signal length")

_ema = ema(close, _ema_len)

_macd = ema(close, _macd_fast) - ema(close, _macd_slow)
_macd_signal = ema(_macd, _macd_signal_len)

_rsi = rsi(close, _rsi_len)
_rsi_signal = ema(_rsi, _rsi_signal_len)

plot(_rsi, color=color.orange)
plot(_rsi_signal, color=color.purple)

longCondition = close > _ema and _macd > _macd_signal and _rsi > _rsi_signal
if (longCondition)
    strategy.entry("Buy", strategy.long)

shortCondition = close < _ema and _macd < _macd_signal and _rsi < _rsi_signal
if (shortCondition)
    strategy.entry("Sell", strategy.short)
```

> Detail

https://www.fmz.com/strategy/440312

> Last Modified

2024-01-29 11:24:11
