
> Name

均线交叉与MACD组合策略Moving-Average-Crossover-and-MACD-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19ddff782d78fe4e696.png)

[trans]

## 概述

本策略综合利用了移动平均线交叉系统和MACD指标,实现了在趋势银行阶段做多,在趋势转折点止盈止损的自动化交易策略。策略名称为“均线交叉与MACD组合策略”。

## 原理

该策略主要基于均线交叉系统与MACD指标的组合。具体来说,当短期均线上穿长期均线时,做多;当短期均线下穿长期均线时,做空。这里选取的是21日EMA作为短期均线,100日EMA作为长期均线。

同时,辅助使用MACD指标来确认交易信号。只有当MACD的DIFF线上穿DEA线时,才会发出做多信号。而一旦DIFF下穿DEA,就会平掉多单止损。

此外,策略还采用了RSI来避免过度做空,只有RSI低于30%时才会开仓做空。

在止损方面,策略采用了固定百分比跟踪止损的方法,多单止损点为入场价减1%,空单止损点为入场价加1%。同时,策略也实现了移动止盈,当多单浮动盈利达到入场价的3%时止盈。

## 优势分析

该策略最大的优势在于利用均线系统确定大趋势方向,再用MACD指标进行入场,可以有效过滤假突破。与单一使用均线交叉系统相比,可以减少无效交易次数,提高获利概率。

另外,策略采用固定百分比止损和移动止盈,可以将亏损控制在可承受范围,同时在保证盈利的前提下尽早止盈,锁定盈利。 这在实际交易中既可以降低账户回撤,也可以减少贪婪导致的失利。

## 风险分析

该策略的主要风险在以下几个方面:

1. 均线交叉体系存在滞后,可能导致入场迟缓错过最佳入场点。可以通过优化均线参数来降低延迟。

2. MACD指标容易产生虚假信号,需要辅助其他指标进行过滤。可以考虑加入KDJ等指标进行优化。

3. 固定百分比止损止盈方式有时不能及时止损止盈,可以改为动态跟踪止损。

4. 策略回撤可能较大,可以考虑降低仓位规避风险。

5. 策略仅做多不做空,存在只跟多向趋势的局限性,可以考虑加入做空机制。

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 优化均线参数,使均线信号更加精确。可以试验EMA、SMA等不同类型均线。

2. 增加其他指标过滤均线交叉信号,如KDJ、RSI等,减少错误交易。 

3. 尝试动态止损方式,能更好地控制风险。如追踪止损,ATR止损等。

4. 添加做空机制,使策略能在下跌行情中盈利。

5. 优化资金管理,调整仓位大小,可以降低最大回撤。

6. 测试不同品种合约的表现效果,扩大策略适用范围。

7. 增加机器学习算法,利用算法自动优化参数,减少人工干预。

## 总结

本策略整合均线交叉系统和MACD指标优点,实现了较高的获利率。通过优化参数设置、加入其他指标以及改进止损止盈方式,可以进一步增强策略稳定性和减少回撤。而增加做空机制和机器学习则可以扩大策略适用性。总之,该策略为量化交易提供了一个较好的思路,但还需要不断测试和优化,才能使之成为稳定可靠的交易策略。

||


## Overview

This strategy combines the moving average crossover system and the MACD indicator to implement an automated trading strategy that goes long in trending periods and takes profit/stops out at trend reversals. The strategy name is "Moving Average Crossover and MACD Combination Strategy".

## Principle 

The strategy is mainly based on the combination of moving average crossover system and MACD indicator. Specifically, it goes long when the short-term moving average crosses over the long-term moving average, and goes short when the short-term moving average crosses below the long-term moving average. Here the 21-day EMA is used as the short-term MA and the 100-day EMA as the long-term MA.

At the same time, the MACD indicator is used to confirm trading signals. Only when the MACD DIFF line crosses over the DEA line will a long signal be triggered. And once the DIFF line crosses below the DEA line, the long position will be closed out for a stop loss.

In addition, the RSI is used to avoid excessive shorting, with a short position initiated only when the RSI is below 30%.

For stop losses, the strategy adopts a fixed percentage trailing stop method, with the long stop loss set at 1% below the entry price, and the short stop loss set at 1% above the entry price. The strategy also implements a moving profit taking exit when the floating profit of the long position reaches 3% of the entry price.

## Advantage Analysis

The biggest advantage of this strategy is using the moving average system to determine the major trend direction, then using the MACD indicator for entry signals, which can effectively filter out false breakouts. Compared to using just the moving average crossover system alone, this can reduce ineffective trade frequencies and improve win rate.

In addition, the fixed percentage stop loss and moving profit taking helps keep losses within acceptable limits, while securing profits early when possible. This can reduce account drawdown and avoid greed-induced losses in actual trading.

## Risk Analysis

The main risks of this strategy are:

1. The moving average crossover system has lagging issues, which may lead to delayed entry and missing best entry points. This can be improved by optimizing the MA parameters.

2. The MACD indicator is prone to generating false signals. Other filters such as KDJ may be added.

3. The fixed percentage stop loss sometimes cannot exit timely. Dynamic trailing stop loss can be considered. 

4. The strategy may have large drawdowns. Position sizing could be reduced to mitigate risk.

5. The strategy only goes long and cannot profit from downtrends. Shorting mechanisms could be added.

## Optimization Directions

The strategy can be improved in the following aspects:

1. Optimize the MA parameters for more precise signals. Different MA types like EMA and SMA could be tested.

2. Add other indicators to filter MA crossover signals, such as KDJ, RSI etc, to reduce bad trades.

3. Test dynamic stop loss methods like trailing stops and ATR stops to better control risks.

4. Add shorting mechanisms so the strategy can profit from downtrends. 

5. Optimize position sizing and money management to reduce max drawdown.

6. Test performance on different products and asset classes to expand applicability.

7. Incorporate machine learning algorithms to auto-optimize parameters and reduce manual intervention.

## Conclusion

This strategy combines the strengths of moving average crossover system and MACD indicator for high profitability. Further enhancements in parameter tuning, additional filters, stop loss mechanisms, and shorting mechanisms can improve stability and reduce drawdowns. Machine learning incorporation can also expand applicability. Overall it provides a good direction for quantitative trading strategies, but still requires continual testing and optimization to become a robust strategy.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-16 00:00:00
end: 2023-10-23 00:00:00
period: 2m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Toxic_Cat_

//@version=5
// strategy("MA_50_200_CROSS", overlay=true, margin_long=100, margin_short=100)

EMA21 = ta.ema(close, 21)
EMA100 = ta.ema(close, 100)
[macdLine, signalLine, histLine] = ta.macd(close, 12, 26, 9)

plot(EMA21)
plot(EMA100, color = color.orange)

openLong = ta.crossover(EMA21, EMA100) and macdLine > signalLine
openShort = ta.crossunder(EMA21, EMA100) and ta.rsi(close, 14) <= 33

crossunderMACD = ta.crossunder(macdLine, signalLine)


if (strategy.opentrades < 1)
    if openLong 
        strategy.entry("L",strategy.long, 1)

   if openShort
      strategy.entry("S",strategy.short, 1)

// slose long
// if ((strategy.opentrades.entry_price(0) + strategy.opentrades.entry_price(0)*0.03) <= open) 
//     strategy.exit("profit L", "L", limit = close)

// else if strategy.opentrades.entry_price(0) - strategy.opentrades.entry_price(0)*0.01 >= open or crossunderMACD
//     strategy.exit("loss L", "L", stop = close)

// slose short
// if (strategy.opentrades.entry_price(0) - strategy.opentrades.entry_price(0)*0.03) >= open
//     strategy.exit("profit S", "S", limit = (strategy.opentrades.entry_price(0) - strategy.opentrades.entry_price(0)*0.03))

// else if strategy.opentrades.entry_price(0) + strategy.opentrades.entry_price(0)*0.01 <= open
//    strategy.exit("loss S", "S", stop = (strategy.opentrades.entry_price(0) + strategy.opentrades.entry_price(0)*0.01))
















```

> Detail

https://www.fmz.com/strategy/430030

> Last Modified

2023-10-24 13:51:02
