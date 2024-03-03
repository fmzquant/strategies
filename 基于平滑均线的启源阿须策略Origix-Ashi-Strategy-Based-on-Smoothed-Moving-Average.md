
> Name

基于平滑均线的启源阿须策略Origix-Ashi-Strategy-Based-on-Smoothed-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c0bfc6f42c3555c7d9.png)
 [trans]

## 概述

该策略的主要思想是利用平滑移动平均线来计算平滑的启明均线,以发现价格趋势,并在价格与平滑启明均线发生金叉时做多,死叉时做空。

## 策略原理

该策略首先定义了一个计算平滑移动平均线的函数smoothedMovingAvg,该函数采用之前周期的移动平均线值和最新价,按一定权重计算出当前周期的平滑移动平均线。

然后定义了一个函数getHAClose,用于根据开盘价、最高价、最低价和收盘价计算出启明均线的收盘价。

在主策略逻辑中,首先获取不同周期的原始价格,然后利用smoothedMovingAvg函数计算出平滑移动平均线,再通过getHAClose函数计算出平滑启明收盘价。

最后,当价格上穿平滑启明收盘价时做多,下穿时平仓;当价格下穿平滑启明收盘价时做空,上穿时平仓。

## 优势分析

该策略最大的优势在于利用平滑移动平均线计算平滑启明均线,能更准确判断价格趋势,过滤掉部分噪音,避免在震荡中产生错误信号。此外,启明均线本身就具有突显趋势的优点,与价格结合使用,可以进一步提高判断准确率。

## 风险分析

该策略主要面临如下风险:
1. 平滑参数设置不当,可能导致策略错过价格反转机会或产生错误信号。需要通过反复回测和优化找到最佳参数。
2. 价格剧烈震荡时,平滑均线可能延迟跟随价格变化,从而导致止损或错过反转机会。此时需要降低仓位规避风险。

针对上述风险,我们可以通过调整平滑参数、引入止损机制、降低单笔交易仓位等方法来降低风险和提高策略稳定性。

## 优化方向

该策略还可以从以下几个方面进行优化:
1. 增加自适应平滑参数,当市场波动加剧时自动调整参数。
2. 结合其他指标作为过滤器,避免在价格震荡时发出错误信号。例如MACD,KD等。 
3. 增加止损机制,以控制单笔亏损。可以设定百分比止损或振荡止损。
4. 对交易品种、时间段等进行优化,专攻最具优势的品种和交易段。

通过以上几点优化,可以进一步减少策略的曲线拟合风险,提高策略的适应性和稳定性。

## 总结

该策略整体思路清晰易懂,通过计算平滑启明均线判断价格趋势,并据此进行长短做法。最大优势在于可以过滤部分噪音,提高信号判断的准确度。但也存在一定的参数优化难度和可能错过快速反转的风险。通过引入自适应机制、拓宽指标组合等手段还可进一步优化,值得深入研究。

||

## Overview

The main idea of this strategy is to use the smoothed moving average to calculate the smoothed Heiken Ashi to identify price trends, and go long when the price has a golden cross with the smoothed Heiken Ashi, and go short when there is a death cross.

## Strategy Logic

The strategy first defines a function smoothedMovingAvg to calculate the smoothed moving average, which uses the previous period's moving average value and the latest price to calculate the current period's smoothed moving average based on certain weights.

Then it defines a function getHAClose to calculate the Heiken Ashi closing price based on the open, high, low and close prices.

In the main strategy logic, it first gets the original prices of different periods, then uses the smoothedMovingAvg function to calculate the smoothed moving average, and then calculates the smoothed Heiken Ashi closing price through the getHAClose function.

Finally, it goes long when the price crosses above the smoothed Heiken Ashi closing price, and closes the position when the price crosses below it. It goes short when the price crosses below the smoothed Heiken Ashi closing price, and closes the position when the price crosses above it.

## Advantage Analysis  

The biggest advantage of this strategy is that by using the smoothed moving average to calculate the smoothed Heiken Ashi, it can more accurately determine price trends and filter out some noise to avoid generating wrong signals during choppy periods. In addition, the Heiken Ashi itself has the advantage of highlighting trends, which can further improve the accuracy of judgment when combined with prices.

## Risk Analysis

The main risks this strategy faces are:

1. Improper parameter settings of the smoothing may cause the strategy to miss price reversal opportunities or generate wrong signals. The optimal parameters need to be found through repeated backtesting and optimization.

2. When prices fluctuate sharply, the smoothed moving average may lag behind price changes, resulting in stop loss triggering or missing reversal opportunities. At this time, reducing position size to mitigate risks is necessary.

To address the above risks, methods such as adjusting smoothing parameters, introducing stop loss mechanisms, reducing per trade position sizes can be used to reduce risks and improve strategy stability.  

## Optimization Directions

The strategy can also be optimized in the following aspects:

1. Introduce adaptive smoothing parameters to automatically adjust parameters when market volatility increases.

2. Combine with other indicators as filters to avoid issuing wrong signals during price consolidations. Examples are MACD, KD etc.   

3. Add stop loss mechanisms to control per trade loss. Percentage stop loss or volatility stop loss can be set.  

4. Optimize trading products, trading sessions etc. to focus on products and sessions with the most advantages.

Through the above optimizations, the curve fitting risks of the strategy can be further reduced and the adaptability and stability of the strategy can be improved.  

## Conclusion  

The overall logic of this strategy is clear and easy to understand. By calculating the smoothed Heiken Ashi to determine price trends and making long and short positions accordingly. Its biggest advantage is being able to filter out some noise and improve the accuracy of signal judgment. But there are also certain difficulties in parameter optimization and risks of missing swift reversals. Further optimizations can be done through introducing adaptive mechanisms, expanding indicator combinations etc. to make it worth in-depth research.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_timeframe_1||(?Display & Timeframe Settings)Timeframe for HA candle calculation|
|v_input_int_1|10|(?Smoothed HA Settings)HA Price Input Smoothing Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

 //@version=5
strategy("Smoothed Heiken Ashi Strategy", overlay=true)

// Inputs
g_TimeframeSettings = 'Display & Timeframe Settings'
time_frame = input.timeframe(title='Timeframe for HA candle calculation', defval='', group=g_TimeframeSettings)

g_SmoothedHASettings = 'Smoothed HA Settings'
smoothedHALength = input.int(title='HA Price Input Smoothing Length', minval=1, maxval=500, step=1, defval=10, group=g_SmoothedHASettings)

// Define a function for calculating the smoothed moving average
smoothedMovingAvg(src, len) => 
    smma = 0.0
    smma := na(smma[1]) ? ta.sma(src, len) : (smma[1] * (len - 1) + src) / len 
    smma

// Function to get Heiken Ashi close
getHAClose(o, h, l, c) =>
    ((o + h + l + c) / 4)

// Calculate smoothed HA candles
smoothedHAOpen = request.security(syminfo.tickerid, time_frame, open)
smoothedMA1close = smoothedMovingAvg(request.security(syminfo.tickerid, time_frame, close), smoothedHALength)
smoothedHAClose = getHAClose(smoothedHAOpen, smoothedHAOpen, smoothedHAOpen, smoothedMA1close)

// Plot Smoothed Heiken Ashi candles
plotcandle(open=smoothedHAOpen, high=smoothedHAOpen, low=smoothedHAOpen, close=smoothedHAClose, color=color.new(color.blue, 0), wickcolor=color.new(color.blue, 0))

// Strategy logic
longCondition = close > smoothedHAClose
shortCondition = close < smoothedHAClose

strategy.entry("Buy", strategy.long, when=longCondition)
strategy.close("Buy", when=shortCondition)

plotshape(series=longCondition, title="Buy Signal", color=color.green, style=shape.labelup, location=location.belowbar)
plotshape(series=shortCondition, title="Sell Signal", color=color.red, style=shape.labeldown, location=location.abovebar)
```

> Detail

https://www.fmz.com/strategy/439985

> Last Modified

2024-01-25 15:26:25
