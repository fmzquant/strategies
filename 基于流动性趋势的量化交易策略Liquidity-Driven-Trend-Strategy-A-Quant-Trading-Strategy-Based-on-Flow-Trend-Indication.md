
> Name

基于流动性趋势的量化交易策略Liquidity-Driven-Trend-Strategy-A-Quant-Trading-Strategy-Based-on-Flow-Trend-Indication

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/df96004da95531fe21.png)

[trans]

## 概述

本策略名为“流动性驱动趋势策略”(Liquidity Driven Trend Strategy),目的是识别不同时间周期上的价格趋势方向,并相应做出买入或卖出决策。该策略运用双均线系统判断趋势,并利用多时间框架上的差价相对强度指数(RSI)实现在趋势变化时及时反应。

## 策略原理  

该策略的核心逻辑基于CHOP指标,其中变动平均系统判断大趋势方向。具体来说,策略在高周期时间框架上计算快线(Length=20)与慢线(Length=50)的 RSI 值,并计算二者差值。当快线 RSI 上穿慢线 RSI 时则判断为看涨,形成做多信号;反之,快线 RSI 下穿慢线 RSI 则看跌,形成做空信号。根据价格涨跌而变化的 RSI 差值,可 sensitive 地判断趋势变化点。  

该策略还引入多时间框架判定:在较高级别周期(如日线)计算 RSI 差值,以判断整体趋势方向;根据较高级别周期的判断结果,在较低级别周期(如5分钟线)进行具体的买入卖出执行。这种多时间框架的组合,既考虑了高周期趋势判断,又兼顾低周期操作的灵活性。

## 策略优势

- 利用 RSI 差值判断潜在趋势反转,提前反应,sensitive
- 应用多时间框架思路,高周期判断趋势,低周期操作执行
- RSI 指标体现价格与成交量变化,反映市场流动性与参与热度  
- 简单参数设置,容易理解、可解释、可调整

## 策略风险及解决 

- 双均线判定时可能出现虚假突破
- 突破失败可能造成不必要损失

解决方法:

1. 调整均线参数,降低虚假突破概率
2. 增加过滤条件,避免不必要入场

## 策略优化方向

- 利用 Kalman Filter 算法优化 RSI 参数
- 增加 MACD 等指标辅助判断
- 结合交易量变化设定动态出场位置 

## 总结

本策略运用 RSI 差值判断潜在趋势变化,实现 sensitive 地捕捉转折点。多时间框架的运用既保证了对大趋势的判断,又使具体买卖操作更为灵活。相比其他趋势跟踪策略,该策略更加简单直接,参数Settings 直观,易于调整优化。总体来说,该策略形成了一套高效、实用的趋势交易体系,值得进一步探索应用。


||

## Overview

The strategy is named "Liquidity Driven Trend Strategy". It aims to identify the price trend direction across different time frames and make corresponding long or short decisions. The strategy employs a dual moving average system to determine the trend and uses the difference between Relative Strength Index (RSI) values across multiple time frames to respond timely to trend changes.  

## Strategy Logic   

The core logic of this strategy is based on the CHOP indicator, where the moving average system judges the overall trend direction. Specifically, the strategy calculates the RSI values of a fast line (Length = 20) and a slow line (Length = 50) on higher time frames, and computes the difference between the two RSI lines. When the fast line RSI crosses above the slow line RSI, it signals an upward trend and triggers long signals. On the contrary, if the fast line RSI crosses below the slow line RSI, it indicates a downward trend and generates short signals. The varying RSI difference driven by price rises and falls can sensitively identify trend changing points.   

The strategy also introduces a multi-timeframe mechanism: it computes the RSI difference on higher time frames (e.g. daily) to determine the overall trend direction, and then executes actual buy and sell orders on lower time frames (e.g. 5 mins) based on the higher timeframe trend judgment. Such combination of multiple time frames takes into account both high-timeframe trend decisions and the flexibility of low-timeframe execution.  

## Advantages of the Strategy  

- Sensitively capture potential trend reversals ahead of time using RSI divergence 
- Apply multi-timeframe concept to determine trend on higher TF and execute orders on lower TF
- RSI reflects price and volume changes, indicating market liquidity and participation  
- Simple parameter settings, easy to understand, explain and tune  

## Risks & Solutions

- False breakout may happen with dual MA system  
- Failed breakout can cause unnecessary losses

Solutions:

1. Adjust MA parameters to reduce false breakout probability  
2. Add filters to avoid unnecessary entry  

## Optimization Directions 

- Optimize RSI parameters using Kalman Filter algorithms
- Add MACD and other indicators to assist judgement 
- Set dynamic exit positions based on trading volume changes  

## Conclusion

This strategy leverages RSI divergence to sensitively capture potential turning points of the trend. The multi-timeframe application ensures judging the overall trend while keeping specific trade execution flexible. Compared to other trend following strategies, this strategy is more straightforward, intuitive in parameter adjustments and easy to optimize. In conclusion, the strategy forms an efficient and practical trend trading system worth further exploration and application.  

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-12-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Flow Trend Indicator Strategy", "FlowTI", overlay=true, calc_on_every_tick=true)

isTimeFrame(timeFrame) =>
    timeFrame == timeframe.period ? true : false

Htf() =>
    isTimeFrame("12") ? "60" : isTimeFrame("60") ? "300" : isTimeFrame("300") ? "D" : isTimeFrame("D") ? "W" : isTimeFrame("W") ? "M" : isTimeFrame("M") ? "5M" : "D"

TrendIndication() =>
    trendFastLength = 20
    trendSlowLength = 50
    upFastHtf = request.security(syminfo.tickerid, Htf(), rma(max(change(close), 0), trendFastLength), barmerge.gaps_off, barmerge.lookahead_on)
    downFastHtf = request.security(syminfo.tickerid, Htf(), rma(-min(change(close), 0), trendFastLength), barmerge.gaps_off, barmerge.lookahead_on)
    rsiFastHtf = downFastHtf == 0 ? 100 : upFastHtf == 0 ? 0 : 100 - (100 / (1 + upFastHtf / downFastHtf))
    upSlowHtf = request.security(syminfo.tickerid, Htf(), rma(max(change(close), 0), trendSlowLength), barmerge.gaps_off, barmerge.lookahead_on)
    downSlowHtf = request.security(syminfo.tickerid, Htf(), rma(-min(change(close), 0), trendSlowLength), barmerge.gaps_off, barmerge.lookahead_on)
    rsiSlowHtf = downSlowHtf == 0 ? 100 : upSlowHtf == 0 ? 0 : 100 - (100 / (1 + upSlowHtf / downSlowHtf))
    rsiDiff = rsiFastHtf - rsiSlowHtf
    crossover(rsiDiff, 0) ? true : crossunder(rsiDiff, 0) ? false : na

if (TrendIndication() == true)
    strategy.entry("Long", strategy.long)

if (TrendIndication() == false)
    strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/436089

> Last Modified

2023-12-21 10:19:52
