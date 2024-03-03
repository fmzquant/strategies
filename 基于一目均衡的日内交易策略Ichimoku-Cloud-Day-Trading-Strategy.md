
> Name

基于一目均衡的日内交易策略Ichimoku-Cloud-Day-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12a2e3fe75428019ad4.png)

[trans]

## 概述

该策略运用一目均衡线实现日内股票交易,属于短线交易策略。它利用一目均衡线的转换线、基准线以及先行线组合进行买卖信号判断,并辅以抛物线SAR进行止损追踪,实现双重保护。

## 原理

一目均衡线由转换线、基准线、先行1线和先行2线组成。转换线为当日收盘价和过去9日的最高价最低价均价的平均值,反映最近一段时间内的股价均衡态势。基准线为过去26日的最高价最低价均价,代表中长期的均衡态势。先行1线为基准线和转换线的均价,反映未来走势的态势。先行2线为过去52日的最高价最低价均价。这些均衡线组合起来,形成买卖讯号。

当收盘价从下方突破基准线且高于先行2线时,产生买进讯号。当收盘价从上方跌破基准线且低于先行1线时,产生卖出讯号。抛物线SAR用于追踪止损,当价格低于SAR时发出止损信号。

该策略利用均衡线的组合,判断股价的未来趋势和目前趋势的持续性,属于典型的趋势跟踪策略。当出现买进和卖出讯号时,及时追随趋势进行交易。同时,SAR止损让利机制可避免亏损扩大。

## 优势

1. 利用均衡线判断未来趋势,提高判断准确性

均衡线包含不同周期价格信息,能提前反映趋势变化,利用组合判断增加准确性。相比单一指标,能更准确判断买卖点。

2. SAR止损追踪,双重保护

SAR能灵活跟踪股票运行,进行止损。与均衡线组合,能在获利后及时止损,避免亏损扩大。

3. 简单参数设定,容易实施

该策略只有少量参数,不依赖曲线拟合等复杂技术指标,简单实用,容易实施。参数默认值就可达到不错效果。

4. 适用于日内短线交易

利用日内价格变化判断买卖点,属于短线交易策略。可充分利用股票日内波动获利。

## 风险

1. 回撤风险

跟踪趋势买卖带来较高回撤。需要合理设置止损点,控制单次亏损。

2. 震荡行情风险

震荡行情中,均衡线产生的讯号可能频繁,不利于获利。可适当调整参数,过滤掉一些讯号。

3. 过优化风险

简单的参数容易过优化,实盘效果可能不理想。应进行稳健性测试,防止过拟合。

4. 效果因标的不同有所区别

效果与选股标的有关,应选择趋势明显的股票进行交易,使策略发挥最大效果。

## 优化方向

1. 结合其他指标过滤信号

可以结合移动平均线等其他指标,过滤掉一些不确定信号,避免虚拟交易。

2. 动态调整止损点

可以根据市场波动程度,动态调整SAR的参数,使止损更灵活。

3. 优化参数组合

可以通过更系统的优化和组合测试,寻找更佳的参数组合,提高策略效果。

4. 根据市场环境调整持仓

可以根据大盘走势等市场环境,动态调整策略的仓位和头寸,控制风险。

## 总结

该策略利用均衡线的买卖信号,配合抛物线SAR实现止损追踪,是一种较为简单实用的短线交易策略。有效利用均衡线预测未来趋势的功能,对突破进行买卖操作。同时止损机制避免亏损加大。实施时需要注意回撤控制,选股以及参数优化等问题。如果解决了这些问题,它是一个易于实施且效果不俗的日内交易策略。

||


## Overview

This strategy implements intraday stock trading using Ichimoku Cloud lines. It belongs to short-term trading strategies. It utilizes the conversion line, base line and leading lines of Ichimoku Cloud to generate trading signals, and uses Parabolic SAR for stop loss trailing, achieving double protection.

## Principles 

The Ichimoku Cloud consists of the conversion line, base line, leading line 1 and leading line 2. The conversion line is the average of the closing price and the highest and lowest prices over the past 9 days, reflecting the recent equilibrium state of the stock price. The base line is the average of the highest and lowest prices over the past 26 days, representing the medium to long term equilibrium state. Leading line 1 is the average of the base line and conversion line, reflecting the future trend. Leading line 2 is the average of the highest and lowest prices over the past 52 days. These equilibrium lines combine to form the trading signals.

When the closing price breaks through the base line upwards and is above the leading line 2, a buy signal is generated. When the closing price breaks the base line downwards and is below the leading line 1, a sell signal is generated. The Parabolic SAR is used for stop loss trailing, generating a stop loss signal when the price is below the SAR.

This strategy utilizes the combination of equilibrium lines to determine future price trends and the sustainability of the current trend. It belongs to typical trend following strategies. It follows the trend by trading when buy and sell signals appear. Meanwhile, the SAR stop loss and take profit mechanism avoids enlarging losses.

## Advantages

1. Using equilibrium lines to determine future trends improves accuracy

The equilibrium lines contain price information of different periods, reflecting changes in trends in advance. Using a combination improves accuracy compared to single indicators. It can identify trading signals more accurately.

2. SAR trailing stop provides double protection 

SAR can flexibly track the stock price for stop loss. Combining with equilibrium lines, it allows timely stop loss after profit taking, avoiding enlarged losses.

3. Simple parameters, easy to implement

This strategy has minimal parameters without complex technical indicators like curve fitting, simple and practical to implement. Default values can already achieve good results.

4. Suitable for intraday and short-term trading

It identifies trading signals from intraday price changes, suitable for short-term trading. It can fully capitalize on intraday fluctuations for profits.

## Risks

1. Drawdown risk

Trend following trading leads to higher drawdowns. Reasonable stop loss levels must be set to limit per trade loss.

2. Whipsaw risk

Frequent trading signals may be generated during range-bound markets, unfavorable for profitability. Parameters can be adjusted to filter out some signals.

3. Over-optimization risk 

Simple parameters are susceptible to over-optimization. Real trading performance may not be ideal. Robustness tests should be conducted to prevent over-fitting.

4. Results vary across different instruments

Performance depends on the trading instruments. Trending stocks with clear trends should be chosen to maximize strategy efficacy.

## Enhancement Opportunities 

1. Add filters with other indicators 

Other indicators like moving averages can be added to filter uncertain signals and avoid false trades.

2. Dynamic adjustment of stop loss

SAR parameters can be dynamically adjusted based on market volatility, for more flexible stop loss.

3. Parameter optimization

More systematic optimization and combinatorial testing can find better parameter sets to improve performance.

4. Adjust position sizing by market regime

Position sizing and leverage can be dynamically adjusted based on market conditions like index trends, to control risks.

## Conclusion

This strategy utilizes Ichimoku Cloud's trading signals and Parabolic SAR for stop loss trailing. It is a simple and practical short-term trading strategy. It capitalizes on Ichimoku Cloud's trend prediction capability for breakout trading. The stop loss mechanism avoids enlarging losses. Proper drawdown control, stock selection and parameter tuning are needed for implementation. With these addressed, it is an easy to implement strategy with respectable performance for intraday trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Conversion Line Periods|
|v_input_2|26|Base Line Periods|
|v_input_3|52|Lagging Span 2 Periods|
|v_input_4|26|Displacement|
|v_input_5|true|Use Parabolic SAR for Trailing Stop|
|v_input_6|0.02|Parabolic SAR Start|
|v_input_7|0.02|Parabolic SAR Increment|
|v_input_8|0.2|Parabolic SAR Maximum|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-01-16 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//
//  Based on the trading strategy described at
//    http://stockcharts.com/school/doku.php?id=chart_school:trading_strategies:ichimoku_cloud
//
//  See Also:
//    - Backtesting and forwardtesting (of TradingView Strategies) <https://www.tradingview.com/wiki/Strategies#Backtesting_and_forwardtesting>
//    - 9 Mistakes Quants Make that Cause Backtests to Lie <https://blog.quantopian.com/9-mistakes-quants-make-that-cause-backtests-to-lie-by-tucker-balch-ph-d/>
//    - When Backtests Meet Reality <http://financial-hacker.com/Backtest.pdf>
//    - Why MT4 backtesting does not work <http://www.stevehopwoodforex.com/phpBB3/viewtopic.php?f=28&t=4020>
//
// 
// -----------------------------------------------------------------------------
// Copyright 2018 sherwind
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License can be found here
// <http://www.gnu.org/licenses/>.
//
// -----------------------------------------------------------------------------
//

strategy(title="Ichimoku Cloud Strategy", shorttitle="Ichimoku Strategy", overlay=true, pyramiding=3)

conversionPeriods   = input(9,  minval=1, title="Conversion Line Periods"),
basePeriods         = input(26, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Periods"),
displacement        = input(26, minval=1, title="Displacement")

usePSARTrailStop    = input(true, title="Use Parabolic SAR for Trailing Stop")
psarStart           = input(0.02, title="Parabolic SAR Start")
psarIncrement       = input(0.02, title="Parabolic SAR Increment")
psarMaximum         = input(0.2,  title="Parabolic SAR Maximum")


donchian(len) => avg(lowest(len), highest(len))

conversionLine = donchian(conversionPeriods)
baseLine  = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)
leadLineDisp1 = leadLine1[displacement]
leadLineDisp2 = leadLine2[displacement]

psar = sar(psarStart, psarIncrement, psarMaximum)

// BUY Signal:
// close > leading span b and
// leading span a > leading span b and 
// close crosses over base line and
// close > parabolic sar
buySignal = close > leadLineDisp2 and
  leadLineDisp1 > leadLineDisp2 and
  crossover(close, baseLine) and
  (usePSARTrailStop ? close > psar : not usePSARTrailStop)

// Sell Signal:
// close < leading span a and 
// leading span a < leading span b and 
// close crosses under base line and
// close < psar
sellSignal = close < leadLineDisp1 and
  leadLineDisp1 < leadLineDisp2 and
  crossunder(close, baseLine) and
  (usePSARTrailStop ? close < psar : not usePSARTrailStop)

hasLong  = strategy.position_size > 0
hasShort = strategy.position_size < 0


strategy.entry("ichimoku-long", strategy.long, when = buySignal)
strategy.entry("ichimoku-short", strategy.short, when = sellSignal)

strategy.exit("trailstop-long", "ichimoku-long", stop = psar, when = hasLong and usePSARTrailStop)
strategy.exit("trailstop-short", "ichimoku-short", stop = psar, when = hasShort and usePSARTrailStop)

```

> Detail

https://www.fmz.com/strategy/429388

> Last Modified

2023-10-16 16:10:55
