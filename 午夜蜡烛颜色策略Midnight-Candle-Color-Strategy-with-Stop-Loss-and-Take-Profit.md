
> Name

午夜蜡烛颜色策略Midnight-Candle-Color-Strategy-with-Stop-Loss-and-Take-Profit

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1432ecb6c8ae1da45ed.png)

[trans]

## 概述

该策略基于1小时延迟的午夜蜡烛颜色进行交易,通过分析前一天午夜0点蜡烛的颜色来判断第二天1点时的交易方向。当0点蜡烛为绿色时做多,为红色时做空。同时设置了止损和止盈位。

## 策略原理

该策略的核心逻辑基于市场中“午夜之魅”的效应,即前一天午夜0点蜡烛颜色代表了当天整体市场氛围,可以用于判断次日开盘后的市场方向。

具体来说,策略首先判断当前K线是否是0点蜡烛,如果是,则记录其收盘价高于开盘价为绿色,否则为红色。在next bar即1点K线,根据前一天0点蜡烛的颜色进行相应方向的做多做空,并设置止损止盈位。

通过这个延迟开仓的方式,可以避免0点时的剧烈波动对入场的影响。

## 策略优势

1. 利用0点蜡烛颜色判断市场方向的策略简单易懂,逻辑清晰
2. 1小时延迟开仓,可以规避0点价格剧烈波动的风险
3. 同时设置止损止盈,可以限制损失和保证利润

## 策略风险 

1. 0点蜡烛颜色不一定能完全代表次日市场走势,存在一定的不确定性
2. 没有考虑重大经济事件等情况下市场突发大幅波动的风险 
3. 止损止盈位的设置需要不断优化和测试,否则可能被套或盈利有限

## 策略优化方向

1. 可以结合更多因素判断0点蜡烛的指示效用,如成交量变化、震幅等
2. 可以测试不同的开仓延迟时间,如2小时、3小时等
3. 动态调整止损止盈位,使其能更好地适应市场波动

## 总结

该策略整体思路清晰简单,通过0点蜡烛颜色判断次日方向,并设置止损止盈控制风险,是一种适合新手的入门短线策略。但也存在一定的不确定性,需要后续不断地优化和验证,才能真正实战。

||

## Overview 

This strategy trades based on the midnight candle color with a 1-hour delay, by analyzing the color of previous day's midnight 0 o'clock candle to determine the trading direction at 1 o'clock next day. It goes long when 0 o'clock candle is green and goes short when 0 o'clock candle is red. Stop loss and take profit levels are also set.

## Strategy Logic

The core logic of this strategy is based on the "midnight effect" in markets, where the color of 0 o'clock candle from previous day represents overall market sentiment and can be used to determine market direction after next day's open.  

Specifically, the strategy first judges if the current candle is 0 o'clock candle. If yes, record it as green if close is higher than open, otherwise red. On the next bar at 1 o'clock, go long/short according to the 0 o'clock candle color from previous day, with stop loss and take profit set.

By delaying entry for 1 hour, it prevents the volatile price at midnight affecting market entrance.

## Advantages

1. Simple logic using 0 o'clock candle color to determine market direction 
2. 1-hour delayed entry avoids volatile midnight price risk
3. Set stop loss and take profit to limit loss and ensure profit

## Risks

1. 0 o'clock candle color may not fully represent next day market trend with some uncertainty  
2. Does not consider risk of sudden big price swings due to major economic events etc
3. Stop loss and take profit need continuous optimization and testing, otherwise risks being caught or profit limited

## Improvement Areas

1. Combine more factors to judge indication effectiveness of 0 o'clock candle, e.g. volume, range etc
2. Test different entry delays such as 2 hours, 3 hours etc  
3. Dynamically adjust stop loss and take profit to better adapt to market volatility
 
## Summary  

The strategy has clear and simple logic, judging next day direction by 0 o'clock candle color and controlling risks with stop loss/take profit. It is a beginner-friendly short-term trading strategy. But there are still some uncertainties, requiring continuous optimization and validation in live trading.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-28 00:00:00
end: 2024-01-04 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Midnight Candle Color Strategy with 1-Hour Delay and SL/TP", shorttitle="12AM +1H SL/TP Strat", overlay=true)

// Adjust for New York time (UTC-5 or UTC-4 for Daylight Saving Time)
// Assuming UTC-5 for now; adjust as necessary for Daylight Saving Time
nyHour(hour) => (hour - 5) % 24

// Function to check if the current bar is the 12:00 AM New York time bar
isMidnightBar() =>
    nyHour(hour) == 0 and minute == 0

// Function to check if the current bar is the 1:00 AM New York time bar (1 hour after midnight)
is1AMBar() =>
    nyHour(hour) == 1 and minute == 0

// Variable to store the color of the previous day's midnight candle
var color midnightCandleColorPrevDay = na

// Determine the color of the previous day's midnight candle
if isMidnightBar()
    midnightCandleColorPrevDay := close[1] > open[1] ? color.green : color.red

// Strategy execution at 1:00 AM based on the color of the previous day's midnight candle
if is1AMBar()
    if midnightCandleColorPrevDay == color.green
        strategy.entry("Long", strategy.long)
        strategy.exit("Take Profit", "Long", limit=close + 57 * syminfo.mintick, stop=close - 200 * syminfo.mintick)
    if midnightCandleColorPrevDay == color.red
        strategy.entry("Short", strategy.short)
        strategy.exit("Take Profit", "Short", limit=close - 50 * syminfo.mintick, stop=close + 200 * syminfo.mintick)

// Optional: Plot a marker for visualization
plotshape(series=isMidnightBar(), style=shape.triangleup, location=location.belowbar, color=color.new(midnightCandleColorPrevDay, 90), size=size.small)
plotshape(series=is1AMBar(), style=shape.triangledown, location=location.abovebar, color=color.blue, size=size.small)

```

> Detail

https://www.fmz.com/strategy/437811

> Last Modified

2024-01-05 16:37:35
