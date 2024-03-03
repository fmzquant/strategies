
> Name

基于一目均衡的趋势追踪策略Trend-Following-Strategy-Based-on-Ichimoku-Cloud

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/117a4dcc02c6ddb184b.png)
 [trans]

## 概述

这是一个基于日线K线的简单趋势追踪策略。它使用一目均衡(Ichimoku Kinko Hyo, IKH)指标判断趋势方向,并结合竹叶线进行追踪。当竹叶线上穿均线时做多,下穿时平仓。该策略适用于中长线趋势交易,追求稳定盈利。

## 策略原理

该策略主要依赖一目均衡的三条曲线:前线、基线和竹叶线。前线和基线用于判断长期趋势方向。当价格在云端上方时为看涨,下方时为看跌。竹叶线用于发出交易信号。

具体来说,如果竹叶线从下向上穿过基线,则为买入信号;如果竹叶线从上向下穿过基线,则为卖出信号。该策略简单的按此逻辑进行交易。

## 优势分析

- 使用一目均衡指标判断趋势,避免被短期波动误导,保证交易信号的可靠性
- 只在趋势转折点附近买入卖出,充分捕捉中长线趋势带来的获利机会
- 交易频率较低,有利于降低手续费和滑点成本
- 规则简单清晰,容易理解实现,适合新手学习使用

## 风险分析 

- 作为趋势跟踪策略,在震荡行情下会频繁停损,无法盈利
- 在剧烈波动时,前线和基线可能产生错误的趋势判断,从而导致不必要的亏损交易
- 因为参考历史数据,所以在突发事件发生后会有滞后,可能错过最佳入场点位
- 长期运行下来,满仓风险依然存在,需要适当调整仓位规模

## 优化方向

- 可以考虑对仓位进行优化,根据市场波动程度灵活调整仓位
- 可以试着改变参数,如调整前线和基线的周期,优化止损线位
- 也可以考虑结合其他指标,如MACD、KD等,避免噪音交易
- 或者加入机器学习算法,自动优化参数,适应更广泛的市场环境

## 总结

这是一个非常经典的基于一目均衡构建的中长线趋势跟踪策略。规则简单,容易理解和掌握。同时也具有一定的优势,能够有效过滤噪音,捕捉趋势机会。但也存在一些典型的风险,需要警惕并进行适当优化,使策略更加稳定和盈利。总的来说,这是一个适合新手学习和实践的量化策略。

||

## Overview

This is a simple trend following strategy based on daily candlesticks. It uses the Ichimoku Cloud to determine the trend direction and track it with the Chikou Span. It goes long when the Chikou Span crosses above the equilibrium lines and exits when it crosses below. This strategy is suitable for medium-to-long term trend trading and aims for steady profits.  

## Strategy Logic

The strategy mainly relies on three lines of the Ichimoku Cloud: Senkou Span A, Senkou Span B and the Chikou Span. Senkou Span A and B are used to determine the major trend direction – above the cloud is bullish and below is bearish. The Chikou Span generates trading signals. 

Specifically, if the Chikou Span crosses above Senkou Span B from below, it is a buy signal; if it crosses below from above, it is a sell signal. The strategy simply follows this logic to trade.

## Advantage Analysis

- Uses Ichimoku Cloud to determine trend, avoiding false signals from short-term fluctuations and ensuring reliability of trading signals
- Only buys and sells around trend turning points, fully capturing profit opportunities from medium-to-long term trends  
- Relatively low trading frequency, helps reduce commissions and slippage costs
- Simple and clear rules, easy to understand and implement, suitable for beginners

## Risk Analysis

- As a trend following strategy, it may suffer frequent stop loss in ranging markets and fail to profit
- The equilibrium lines may give wrong trend readings during violent swings, resulting in unnecessary losing trades
- Referencing historical data means delayed reaction to sudden events, possibly missing best entry points
- Risk of overtrading still exists in long run, position sizing needs adjustment

## Improvement Directions 

- Consider optimizing position sizing based on market volatility
- Try changing parameters like Senkou Span periods or stop loss levels
- Incorporate other indicators like MACD, KD to avoid false signals
- Add machine learning algorithms to auto tune parameters for more market regimes

## Conclusion

This is a very classic medium-to-long term trend following strategy built on Ichimoku Cloud with simple and easy-to-grasp rules, and certain advantages in filtering out noises and capturing trends. But some typical weaknesses exist as well which require vigilance and proper enhancements for more steady profits. Overall a good strategy for beginners to learn algorithmic trading.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-12-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("My Custom Strategy", overlay=true)

// Ichimoku Cloud components
tenkanSenPeriods = 9
kijunSenPeriods = 26
displacement = 26

highTenkanSen = ta.highest(high, tenkanSenPeriods)
lowTenkanSen = ta.lowest(low, tenkanSenPeriods)
tenkanSen = (highTenkanSen + lowTenkanSen) / 2

highKijunSen = ta.highest(high, kijunSenPeriods)
lowKijunSen = ta.lowest(low, kijunSenPeriods)
kijunSen = (highKijunSen + lowKijunSen) / 2

chikouSpan = close[displacement]

// Buy condition: Chikou Span crosses over both Tenkan Sen and Kijun Sen
buyCondition = chikouSpan > tenkanSen[displacement] and chikouSpan > kijunSen[displacement]
if (buyCondition)
    strategy.entry("Buy", strategy.long)

// Sell condition: Chikou Span crosses down both Tenkan Sen and Kijun Sen
sellCondition = chikouSpan < tenkanSen[displacement] and chikouSpan < kijunSen[displacement]
if (sellCondition)
    strategy.close("Buy")

plot(tenkanSen, color=color.red)
plot(kijunSen, color=color.blue)
plot(chikouSpan, color=color.green, offset=-displacement)

```

> Detail

https://www.fmz.com/strategy/435699

> Last Modified

2023-12-18 10:20:01
