
> Name

基于一目均衡表的趋势追踪策略Ichimoku-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10083a8ec23e2fd4c55.png)
[trans]

## 概述

本策略基于Ichimoku技术指标设计,采用趋势追踪和均衡突破的交易方式,旨在抓取中长线价格趋势,实现稳定盈利。

## 策略原理

策略使用一目均衡表的五条线 - 转向线、基准线、前沿线、先导线以及延迟线,判断价格趋势和支持阻力。具体判断规则如下:

1. 当收盘价上穿基准线且基准线走势不平时,产生买入信号。
2. 当收盘价下穿基准线且基准线走势不平时,产生卖出信号。
3. 收盘价高于云峦时,流动性较好,允许建仓。
4. 收盘价低于云峦时,流动性较差,禁止建仓。
5. 延迟线上穿收盘价产生买入信号。
6. 延迟线下穿收盘价产生卖出信号。

上述交易信号综合判断后决定最终的入场时机。

## 优势分析

该策略具有以下优势:

1. 使用一目均衡表判断趋势,可过滤市场噪音,锁定中长线趋势。
2. 结合云峦判断流动性状况,可避免建仓风险。
3. 延迟线作为确认信号,避免假突破。
4. 规则简单清晰,容易实施。

## 风险分析

该策略也存在以下风险:

1. 参数设置不当可能导致错失交易机会。
2. 趋势mutate时判断滞后,无法及时止损。
3. 多头持仓亏损风险较大。

针对上述风险,可通过优化参数设置、结合其他指标判断趋势变化、严格止损来解决。

## 优化方向

策略还可从以下方面进行优化:

1. 优化一目均衡表的参数,寻找最佳组合。
2. 增加量价指标过滤,避免趋势错位。
3. 结合波动率指标判断反转点。
4. 加入机器学习模型判断趋势状态。

## 总结

本策略利用一目均衡表判断价格趋势和流动性状况,采用趋势追踪模式,可有效过滤噪音抓取中长线趋势,回撤风险较小,适合中长线持仓。通过进一步优化参数设置、增加辅助过滤指标、挖掘趋势转折信号,可以提高策略Profit Factor。

|| 

## Overview

This strategy is designed based on the Ichimoku indicator for trend following and equilibrium breakout trading, aiming to capture medium-to-long term price trends for steady profits.  

## Strategy Logic

The strategy utilizes the five lines of Ichimoku - Tenkan-sen, Kijun-sen, Senkou Span A, Senkou Span B and Chikou Span to determine price trend and support/resistance levels. The specific entry rules are:

1. When the close crosses over Kijun-sen and Kijun-sen is not flat, a buy signal is triggered.  
2. When the close crosses under Kijun-sen and Kijun-sen is not flat, a sell signal is triggered.
3. When the close is above the cloud, the liquidity is good for taking positions.  
4. When the close is below the cloud, the liquidity is low and taking positions should be avoided.
5. When Chikou Span crosses over the close, a buy signal is triggered.
6. When Chikou Span crosses under the close, a sell signal is triggered.

The above trading signals are combined to determine the final entry timing.  

## Advantage Analysis 

The advantages of this strategy include:

1. Using Ichimoku to determine trend can filter out market noise and capture medium-to-long term trends.
2. Incorporating cloud condition avoids taking positions in poor liquidity.  
3. Chikou Span acts as confirmation to avoid false breakout. 
4. The rules are simple and clear for implementation.  

## Risk Analysis

The risks of this strategy involve:

1. Inappropriate parameter settings may lead to missing trading opportunities.
2. Trend judgment may lag when trend mutates, unable to cut loss in time.
3. Higher loss risk for long positions.

These risks can be addressed by optimizing parameters, combining with other indicators to determine trend change, and strict stop loss.

## Optimization Directions 

The strategy can be further optimized from the following aspects:

1. Optimize Ichimoku parameters to find the best combination.  
2. Add price & volume filters to avoid trend deviation.
3. Incorporate volatility indicators to identify reversal points.  
4. Add machine learning models to determine trend status.

## Summary

This strategy leverages Ichimoku to determine price trend and liquidity conditions for trend following, which can effectively filter out noise and capture medium-to-long term trends with smaller drawdowns. Further optimizations on parameter tuning, adding auxiliary filters, and identifying trend reversal signals can improve the strategy's Profit Factor.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2017|From Year|
|v_input_4|true|To Month|
|v_input_5|true|To Day|
|v_input_6|9999|To Year|
|v_input_7|6|KijunSen Lag|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-04 00:00:00
end: 2023-12-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("My Ichimoku Strat", overlay=true,default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=1000, currency=currency.EUR)
// === BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1)
FromDay   = input(defval = 1, title = "From Day", minval = 1)
FromYear  = input(defval = 2017, title = "From Year", minval = 2014)
ToMonth   = input(defval = 1, title = "To Month", minval = 1)
ToDay     = input(defval = 1, title = "To Day", minval = 1)
ToYear    = input(defval = 9999, title = "To Year", minval = 2014)

// === SERIES SETUP ===
//**** Inputs *******
KijunSenLag = input(6,title="KijunSen Lag",minval=1)

//Kijun-sen
//Support resistance line, buy signal when price crosses it
KijunSen = sma((high+low)/2,26)
buy2 = crossover(close,KijunSen) and (rising(KijunSen,KijunSenLag) or falling(KijunSen,KijunSenLag))
sell2= crossunder(close,KijunSen) and (rising(KijunSen,KijunSenLag) or falling(KijunSen,KijunSenLag))


//Tenkan-Sen
TenkanSen = sma((high+low)/2,9)

//Senkou Span A 
SenkouSpanA = (KijunSen + TenkanSen)/2

//Senkou Span B 
SenkouSpanB = sma((high+low)/2,52)

//Cloud conditions : ignore buy if price is under the cloud
// Huge cloud means safe support and resistance. Little cloud means danger.
buy3 = close > SenkouSpanA and close > SenkouSpanB
sell3 = close < SenkouSpanA and close < SenkouSpanB


//Chikou Span
//Buy signal : crossover(ChikouSpan,close)
//Sell Signal : crossunder(ChikouSpan,close)
ChikouSpan = close
buy1=crossover(ChikouSpan,close[26])
sell1=crossunder(ChikouSpan,close[26])

plotshape(buy1,style=shape.diamond,color=lime,size=size.small)
plotshape(sell1,style=shape.diamond,color=orange,size=size.small)

//Alerts

buyCompteur = -1
buyCompteur := nz(buyCompteur[1],-1)
buyCompteur := buy2 or buy3 ? 1 : buyCompteur
buyCompteur := buyCompteur > 0 ? buyCompteur + 1 : buyCompteur
buyCompteur := sell2 or sell3 ? -1 : buyCompteur

sellCompteur = -1
sellCompteur := nz(sellCompteur[1],-1)
sellCompteur := sell2 or sell3 ? 1 : sellCompteur
sellCompteur := sellCompteur > 0 ? sellCompteur + 1 : sellCompteur
sellCompteur := buy2 or buy3 ? -1 : sellCompteur

sell= sell2 and sell3 or (sell1 and buyCompteur <= 8)
buy=buy2 and buy3 or (buy1 and sellCompteur <=8)
plotchar(buy,char='B',size=size.small,color=lime)
plotchar(sell,char='S',size=size.small,color=orange)

//plots
plot(KijunSen,title="Kijun-Sen",color=blue,linewidth=4)
plot(TenkanSen,title="Tenkan-Sen",color=red,linewidth=2)
cloudA = plot(SenkouSpanA,title="cloud A", color=lime,offset=26,linewidth=2)
cloudB = plot(SenkouSpanB,title="cloud B", color=orange,offset=26,linewidth=2)
plot(ChikouSpan,title="lag span",color=fuchsia, linewidth=2,offset=-26)
//plot()
fill(cloudA,cloudB,color=SenkouSpanA>SenkouSpanB?lime:orange)
//plot(close,color=silver,linewidth=4)

// === ALERTS ===
strategy.entry("L", strategy.long, when=(buy and (time > timestamp(FromYear, FromMonth, FromDay, 00, 00)) and (time < timestamp(ToYear, ToMonth, ToDay, 23, 59))))
strategy.close("L", when=(sell and (time < timestamp(ToYear, ToMonth, ToDay, 23, 59))))
```

> Detail

https://www.fmz.com/strategy/434984

> Last Modified

2023-12-11 15:00:29
