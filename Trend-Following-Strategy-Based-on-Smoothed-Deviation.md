
> Name

Trend-Following-Strategy-Based-on-Smoothed-Deviation

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15fe7902ea1b0bbb750.png)

## Overview

This strategy utilizes the deviation between short-term high-low and short-term & long-term average cost to determine the trend. It aims to increase short-term sensitivity and reduce the cost of consolidation by enlarging the previous and subsequent smoothing average functions, so as to decrease small losses during consolidation while maintaining significant profits when trends emerge.

## Strategy Principles 

1. Calculate short-term cost: Use ta.highest and ta.lowest functions to calculate the highest and lowest prices of the recent shortTerm candles, and take the average as the short-term cost

2. Calculate long-term cost: Use ta.sma function to calculate the simple moving average of closing prices of recent longTerm candles as the long-term cost

3. Calculate deviation: Subtract long-term cost from short-term cost  

4. Smooth deviation: Smooth the deviation to reduce misjudgements using ta.sma for simple moving average

5. Determine trend: If the smoothed deviation is greater than the threshold, judge it as an upward trend. If less than the negative threshold, judge it as a downward trend.

6. Entry and exit: Go long when tracing upward trend and go short when tracing downward trend.

## Advantage Analysis

1. Increase short-term sensitivity to quickly capture short-term opportunities
2. Smoothing processing reduces probability of misjudgement  
3. Setting channel reduces unnecessary opening positions
4. Following trends closely allows timely stop loss and profit taking

## Risk Analysis

1. Short-term focus can easily lead to being trapped, stop loss range needs to be appropriately enlarged
2. Parameters require repeated testing, improper settings of short-term, long-term days and deviation smoothing parameters can lead to oversensitivity or slowness
3. Channel amplitude needs to be reasonably set, too large or small can both lead to issues
4. Likely to be trapped in repeated opening positions during volatile sideways markets

Risk Resolution:

1. Appropriately enlarge stop loss range to avoid traps
2. Optimize parameter settings to balance sensitivity and misjudgement rate  
3. Test and optimize channel parameters
4. Add filtering conditions to avoid unnecessary opening positions during volatility

## Optimization Directions

1. Optimize short-term high-low points, such as calculating smoother short-term costs like PA or weighted averages
2. Test different long-term cost calculation methods 
3. Try different deviation smoothing algorithms
4. Optimize channel parameters
5. Add opening filters like breakouts, surges in volume etc.  
6. Reversals Add reverse trading opportunities

## Summary 

Overall this is a very simple and direct trend following strategy. Compared to common indicators like moving averages, by calculating the deviation between short and long term costs, it can judge trend changes faster. Meanwhile, the smoothing processing also provides greater flexibility in parameter optimization, allowing sensitivity and misjudgement rates to be balanced by adjusting the smoothing parameters. In summary, this strategy has characteristics like agility, directness and high customizability. It is a promising strategy worth deeper exploration. By continuing to optimize parameters and adding auxiliary judgement conditions, there is potential to further enhance the strategy's performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Short Term|
|v_input_2|20|Long Term|
|v_input_3|5|Smoothing|
|v_input_4|false|Threshold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © dead0001ing1

//@version=5
strategy("Trend-Following Indicator", overlay=true)

// 設置參數
shortTerm = input(5, "Short Term")
longTerm = input(20, "Long Term")
smooth = input(5, "Smoothing")
threshold = input(0, "Threshold")

// 計算短期成本
shortH = ta.highest(high, shortTerm)
shortL = ta.lowest(low, shortTerm)
shortCost = (shortH + shortL) / 2

// 計算長期成本
longCost = ta.sma(close, longTerm)

// 計算均差
deviation = shortCost - longCost

// 平滑均差
smoothedDeviation = ta.sma(deviation, smooth)

// 判斷順勢
isTrendingUp = smoothedDeviation > threshold
isTrendingDown = smoothedDeviation < -threshold

// 顯示順勢信號
plotshape(isTrendingUp, title="Trending Up", location=location.belowbar, color=color.green, style=shape.labelup, text="Up", size=size.small)
plotshape(isTrendingDown, title="Trending Down", location=location.abovebar, color=color.red, style=shape.labeldown, text="Down", size=size.small)

// 定義進出場策略
if isTrendingUp
    strategy.entry("Long", strategy.long)
    strategy.close("Long", when=isTrendingDown)
if isTrendingDown
    strategy.entry("Short", strategy.short)
    strategy.close("Short", when=isTrendingUp)


```

> Detail

https://www.fmz.com/strategy/442207

> Last Modified

2024-02-20 11:15:54
