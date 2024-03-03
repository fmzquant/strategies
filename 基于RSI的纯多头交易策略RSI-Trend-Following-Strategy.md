
> Name

基于RSI的纯多头交易策略RSI-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略基于相对强弱指数(RSI)指标设计了一个纯多头交易系统。该系统通过配置RSI不同的上下轨,实现在RSI指标出现金叉时开仓做多,出现死叉时平仓。

## 策略原理

本策略主要依靠RSI指标生成交易信号。RSI指标通过计算一定周期内收盘价上涨天数与下跌天数的比值,反映股票的超买超卖情况。RSI值高则代表超买,RSI值低则代表超卖。

具体来说,策略通过设置RSI的多个参数来生成交易信号:

1. rsi_low: RSI的下轨,默认值为30,低于该值时视为超卖
2. rsi_middle: RSI的中轨,默认值为55 
3. rsi_mhigh: RSI的中高轨,默认值为60
4. rsi_high: RSI的高轨,默认值为70,高于该值时视为超买
5. rsi_top: RSI的高位,默认值为75
6. rsi_period: 计算RSI的周期数,默认值为14

在计算出RSI值后,策略采取以下原则产生交易信号:

1. 当RSI上穿下轨或中轨时,做多开仓
2. 当RSI下穿下轨时,视为止损退出
3. 当RSI下穿中轨、中高轨、高轨时,逐步 Partial 出仓
4. 当RSI超过高位时,全部出仓

这样,通过设定多组 RSI 上下轨来捕捉其在超买超卖区域之间的金叉死叉情况,实现趋势跟踪。

## 优势分析

这种基于 RSI 的趋势跟踪策略具有以下几点优势:

1. 策略思路清晰易懂,通过 RSI 指标判断超买超卖情况,顺势而为
2. 可配置的 RSI 参数丰富,可以灵活调整,适应不同周期和品种
3. 采用分段止损机制,可以抓住大趋势的同时控制风险
4. 无需限定买入卖出的具体时机,实现全自动交易
5. RSI 指标可与其他指标组合,拓展策略空间

## 风险分析

当然,这种策略也存在一些风险需要注意:

1. RSI 具有一定的滞后性,可能misses大幅趋势的开始
2. 止损点设置不当可能造成不必要的损失
3. 多头策略无法捕捉趋势反转,具有方向性风险
4. 稳定持有时间短暂,容易产生较高的手续费和滑点成本
5. RSI 发生背离时导致的交易信号错误

对此,可以通过适当调整 RSI 周期参数、结合均线指标、设置合理止损位置等方式进行优化。

## 优化方向

本策略还可从以下几个方面进行进一步优化:

1. 优化 RSI 参数,调整上下轨位置,适应市场情况
2. 增加均线指标过滤,避免因 RSI 滞后产生错误信号 
3. 设置价格突破作为入场信号,RSI 金叉作为确认
4. 增加对趋势反转的判断,使策略可双向操作
5. 优化止损策略,如逐步加仓降低均价,移动止损等
6. 结合交易量,强化趋势判断
7. 加入机器学习算法,实现 RSI 参数的动态优化

## 总结

本策略通过配置化的 RSI 技术指标,实现了一个简单的趋势跟踪交易系统。策略思路清晰易懂,可根据自身需要调整参数。但也存在一些风险,需要注意防范。有很大的优化空间,可与其他指标组合丰富策略,也可引入机器学习等新技术进行智能化升级。总体来说,本策略为量化交易提供了一个高效灵活的思路,值得深入研究与应用。

||


## Overview

This strategy designs a long-only trading system based on the Relative Strength Index (RSI) indicator. It goes long when RSI shows golden cross and exits when RSI shows dead cross by configuring different RSI bands.

## Strategy Logic

The strategy mainly relies on the RSI indicator to generate trading signals. RSI calculates the ratio of up days versus down days over a period to reflect overbought and oversold situations. High RSI values represent overbought conditions while low RSI values represent oversold conditions. 

Specifically, the strategy sets multiple parameters of RSI to generate trading signals:

1. rsi_low: the lower band of RSI, default 30, below which is considered oversold
2. rsi_middle: the middle band of RSI, default 55
3. rsi_mhigh: the upper middle band of RSI, default 60 
4. rsi_high: the upper band of RSI, default 70, above which is considered overbought
5. rsi_top: the top level of RSI, default 75
6. rsi_period: the period to calculate RSI, default 14

After calculating the RSI values, the strategy generates trading signals as below:

1. Go long when RSI crosses above the lower or middle band
2. Exit with stop loss when RSI falls below the lower band 
3. Partially close positions when RSI falls below middle, upper middle, upper band
4. Fully close all positions when RSI exceeds the top level

By setting multiple RSI bands to capture golden cross and dead cross between overbought and oversold zones, it realizes trend following.

## Advantage Analysis

The RSI trend following strategy has several advantages:

1. The logic is clear and easy to understand, following the trend based on RSI overbought/oversold situation
2. Flexible configurable RSI parameters suit different periods and products  
3. The staged stop loss mechanism could catch big trends while controlling risks
4. No need to specify particular entry or exit timing, fully automated trading
5. RSI can combine with other indicators to expand the strategy space

## Risk Analysis

There are some risks to note for this strategy:

1. RSI has some lagging, may miss the start of big trends
2. Improper stop loss setting may cause unnecessary losses
3. Unidirectional long bias, risk of missing trend reversal  
4. Short holding periods lead to higher slippage and commission costs
5. Wrong signals when RSI divergence happens

These could be mitigated by optimizing RSI periods, combining with moving averages, setting proper stop loss, etc.

## Optimization Directions

Some ways to further optimize the strategy:

1. Optimize RSI parameters and bands to adapt to market conditions
2. Add moving average filter to avoid wrong signals from RSI lagging
3. Use price breakout for entry and RSI cross for confirmation 
4. Incorporate trend reversal detection for two-way trading
5. Enhance stop loss like averaging down positions, trailing stop loss
6. Combine trading volume to strengthen trend judgment 
7. Introduce machine learning models for dynamic RSI parameter optimization

## Conclusion

The strategy builds a simple trend following system with configurable RSI technical indicator. The logic is clear and easy to understand, parameters adjustable based on needs. But there are some risks to be aware of. Huge room for optimizations by combining with other indicators or introducing new techniques like machine learning. Overall it provides an efficient and flexible approach to quantitative trading and is worth further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|RSI lower band|
|v_input_2|55|RSI middle band|
|v_input_3|60|RSI middle high|
|v_input_4|70|RSI high|
|v_input_5|75|RSI top|
|v_input_6|14|RSI period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-10-06 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version= 4
// https://sauciusfinance.altervista.org, another trading idea, suggested by the fact that RSI tends to accompany the trend
strategy(title="Pure RSI long only", overlay = true, max_bars_back=500)


// INPUTS 
rsi_low = input(30, title ="RSI lower band",  minval=5, step = 1)
rsi_middle = input(55, title ="RSI middle band",  minval=10, step = 1)
rsi_mhigh = input(60, title ="RSI middle high",  minval=20, step = 1)
rsi_high = input(70, title ="RSI high",  minval=30, step = 1)
rsi_top = input(75, title ="RSI top",  minval=30, step = 1)
rsi_period = input(14, title="RSI period", minval = 1, step = 1) 
// CALCULATIONS
myrsi = rsi(close, rsi_period)

/// Entry: when RSI rises from the bottom or, after a retracement, it overcomes again the middle level of 50 
strategy.entry("Long", true, when = crossover(myrsi,rsi_low))
strategy.entry("Long", true, when = crossover(myrsi,rsi_middle))

/// EXITS: when RSI crosses under the initial bottom level (stop loss) or undergoes one of the next 3 steps : 50, 60, 70 or it's simply
// higher than 70
// you may test viceversa for short, adding level of 40

strategy.close("Long", when = crossunder(myrsi, rsi_low), comment="low")
strategy.close("Long", when = crossunder(myrsi, rsi_middle), comment="middle")
strategy.close("Long", when = crossunder(myrsi, rsi_mhigh), comment="middle-hi")
strategy.close("Long", when = crossunder(myrsi, rsi_high), comment="high")
strategy.close("Long", when = (myrsi>rsi_top), comment="top")

plotchar(myrsi, title = "myrsi", char='+', color=color.black)
// CONCLUSION: this system give notable results related to  MA & RSI trading system and it's a good alternative. The best is making
// roboadvisoring by working this two system togheter, i.e. watching both MA and levels of RSI together (you may also enter if RSI
// crosses over 30 and then wait for a confirm in MA)

```

> Detail

https://www.fmz.com/strategy/428577

> Last Modified

2023-10-07 10:02:21
