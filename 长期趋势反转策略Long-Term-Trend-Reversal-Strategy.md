
> Name

长期趋势反转策略Long-Term-Trend-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/151bc35928fefd4616d.png)
[trans]

## 概述

长期趋势反转策略是一个结合趋势跟踪和短期反转的机械交易系统。该策略利用7日高点和低点构建通道,结合200日移动平均线判断长期趋势方向。在牛市中,该策略在下跌过程中买入,在涨势中卖出;在熊市中,该策略在上涨过程中卖出,在下跌中买入。

## 策略原理

该策略主要基于以下原理:

1. 使用7日高低点构建通道,判断最近7天的涨跌幅度。

2. 200日移动平均线判断长期趋势方向。

3. 当价格跌破7日低点,且高于200日移动平均线时,产生买入信号。这表示短期调整下跌结束,趋势可能反转上涨。

4. 当价格涨破7日高点,且低于200日移动平均线时,产生卖出信号。这表示短期调整涨势结束,趋势可能反转下跌。

5. 采用2倍ATR止损,控制单笔损失。

该策略的关键是同时考虑短期和长期两个时间维度的趋势。7日通道判断最近一周的涨跌情况,200日移动平均线判断半年左右的长期趋势方向。只有两者同向看涨或看跌时,才产生交易信号。这样可以有效过滤掉短期调整造成的错误信号。

## 优势分析

该策略主要优势如下:

1. 策略信号简单清晰,仅基于价格和平均线,容易实现。

2. 同时考虑短期和长期趋势,有效过滤噪音。

3. 采用趋势跟踪和反转结合的交易方式,收益相对平稳。

4. 采用ATR止损控制风险,最大回撤相对较小。

5. 可广泛适用于股票、外汇、加密货币等多个市场。

6. 可在高频和低频环境下运行。

## 风险分析

该策略主要风险如下:

1. 长期强势行情中,策略可能错过大部分涨幅。

2. 震荡行情中,止损可能频繁被触发。

3. 参数设置不当可能导致过于频繁交易。

4. 短期和长期趋势判断标准设置不当,可能过滤掉大部分机会。

5. 样本外数据可能导致模型失效。

主要的风险控制措施包括:

1. 优化参数,确保止损和交易频率合理。 

2. 严格的回测验证,检查不同市场和时间段的稳健性。

3. 采用组合投资,降低单一策略风险。

4. 采用指数止损缩小单笔损失。

## 优化方向 

该策略可从以下方面进行优化:

1. 优化通道长度参数,寻找更合适的短期趋势判断标准。

2. 优化移动平均线参数,寻找更合适的长期趋势判断标准。

3. 尝试其他止损方式,如百分比止损、移动止损等。

4. 增加成交量的判断标准。趋势反转时往往伴随着成交量放大。

5. 基于过去数据训练判断长短期趋势最佳参数。

6. 结合情绪指标、基本面指标建立动态退出机制。

7. 优化止损算法,实现指数型止损或盈利保护止损。

通过系统地优化和组合参数,该策略可以进一步提高收益率和风险调整指标。

## 总结

长期趋势反转策略是一个典型的结合趋势和反转的算法交易策略。它通过同时判断短期和长期两个时间维度的趋势变化,在趋势反转点生成交易信号。相比纯趋势或纯反转策略,该策略可以有效过滤掉短期市场噪音,在控制风险的前提下获得稳定收益。总体来说,该策略适合对市场有基本判断能力的算法交易者,可以为量化组合提供平稳型组分。通过不断优化参数和风险管理措施,该策略可以获得更好的风险收益比。

|| 

## Overview

The long-term trend reversal strategy is a mechanical trading system that combines trend following and short-term reversals. It uses the 7-day high and low to build a channel and the 200-day moving average to determine the long-term trend direction. In a bull market, it buys on dips and sells in uptrends. In a bear market, it sells on rallies and buys on dips.

## Strategy Logic

The strategy is mainly based on the following principles:

1. Use the 7-day high-low to judge the rise and fall over the past week. 

2. The 200-day moving average determines the long-term trend direction.

3. When the price breaks below the 7-day low and is above the 200-day moving average, a buy signal is generated. This indicates the end of the short-term downside correction and the trend may reverse upwards.

4. When the price breaks above the 7-day high and is below the 200-day moving average, a sell signal is generated. This indicates the end of the short-term upside correction and the trend may reverse downwards.

5. Use 2x ATR stop loss to control risk per trade.

The key is to consider both short-term and long-term timeframes. The 7-day channel judges recent price action and the 200-day MA judges the multi-month trend. Trading signals are only generated when both indicate the same direction. This avoids false signals from short-term corrections.

## Advantage Analysis 

The main advantages of this strategy are:

1. Simple and clear signals based on price and moving average. Easy to implement.

2. Considers both short-term and long-term trends, filters noise effectively. 

3. Trend following and mean reversion combined smooths returns.

4. ATR stop loss controls risk, smaller max drawdown.

5. Applicable to stocks, forex, crypto across markets.

6. Can run in high and low frequency environments.

## Risk Analysis

The main risks are:

1. May miss large trends in strong trending markets.

2. Stop loss may trigger frequently in choppy markets. 

3. Improper parameters may lead to over-trading.

4. Improper short and long term trend metrics may filter too many signals.

5. Model failure due to out of sample data.

The main risk management techniques:

1. Optimize parameters for reasonable stop loss and trade frequency.

2. Robust backtesting across markets and time frames.

3. Portfolio diversification to lower single strategy risk. 

4. Exponential stop loss to limit loss per trade.

## Optimization Directions

The strategy can be improved on:

1. Optimize channel length for better short-term trend metric.

2. Optimize MA length for better long-term trend metric. 

3. Try other stop loss techniques like percentage, trailing.

4. Add volume condition. Trend reversals often see increase in volume.

5. Machine learning to find optimal short and long term parameters.

6. Dynamic exit rules based on fundamentals and sentiment.

7. Optimize stop loss for exponential or profit locking algorithms.

Parameter optimization and combinations can further improve returns and risk metrics.

## Summary 

The long term trend reversal strategy combines both trend following and mean reversion. By judging both short-term and long-term trends, it generates signals at trend reversal points. Compared to pure trend or mean reversion strategies, it filters out market noise and achieves steady returns and risk control. Overall, this strategy suits algo traders with market views and provides stable performance for quantitative portfolios. With ongoing optimization and risk management, further improvements in risk-return are possible.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|7|Channel Length|
|v_input_2|200|Ma Length|
|v_input_3|2|ATR Stop Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-05 00:00:00
end: 2023-11-12 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © racer8
//@version=4
// This Algo Strategy Has Only 3 rules and 62% Win Rate (Youtube) 

strategy("Trend Bounce", overlay=true)

nn = input(7,"Channel Length")
hi = highest(high,nn)
lo = lowest(low,nn)
n2 = input(200,"Ma Length")
ma = sma(close,n2)

if close>ma and close<lo[1]
    strategy.entry("Buy",strategy.long)
if close>hi[1]
    strategy.close("Buy") 
    
if close<ma and close>hi[1]
    strategy.entry("Sell",strategy.short)
if close<lo[1]
    strategy.close("Sell")


plot(hi,"high",color=color.aqua)
plot(lo,"low",color=color.aqua)
plot(ma,"sma",color=color.yellow)       

//-----------------------------------------Stop Loss-------------------------------------------------------

atr = sma(tr,10)[1]
bought = strategy.position_size[0] > strategy.position_size[1]
sold = strategy.position_size[0] < strategy.position_size[1]
slm = input(2.0,"ATR Stop Loss",minval=0)
StopPrice_Long  = strategy.position_avg_price - slm*atr              // determines stop loss's price 
StopPrice_Short  = strategy.position_avg_price + slm*atr              // determines stop loss's price 
FixedStopPrice_Long = valuewhen(bought,StopPrice_Long,0)                  // stores original StopPrice  
FixedStopPrice_Short = valuewhen(sold,StopPrice_Short,0)                  // stores original StopPrice  
plot(FixedStopPrice_Long,"ATR Stop Loss Long",color=color.blue,linewidth=1,style=plot.style_cross)
plot(FixedStopPrice_Short,"ATR Stop Loss Short",color=color.red,linewidth=1,style=plot.style_cross)
if strategy.position_size > 0
    strategy.exit(id="Stop", stop=FixedStopPrice_Long)    // commands stop loss order to exit!
if strategy.position_size < 0
    strategy.exit(id="Stop", stop=FixedStopPrice_Short)    // commands stop loss order to exit!


```

> Detail

https://www.fmz.com/strategy/431903

> Last Modified

2023-11-13 10:51:35
