
> Name

Signal-Smoothing-Ehlers-Cyber-Cycle-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1dde5a01f9678b104d0.png)

## Overview

This strategy calculates the smoothed price signal based on the cyber cycle theory proposed by Ehlers to design a trading strategy with smoothed trading signals. It can effectively filter market noise and generate more reliable trading signals.

## Strategy Principle 

1. Smooth the original price signal src with second order smoothing to obtain the smoothed signal smooth.

2. Calculate the cyclic indicator cycle based on the smoothed signal. The calculation method is:
   cycle := (1 - .5 _alpha)_ (1 - .5 _alpha)_ (smooth - 2 _smooth\[1\] + smooth\[2\]) + 2_ (1 - alpha) _cycle\[1\] - (1 - alpha)_ (1 - alpha) \* cycle\[2\]

   where α is the smoothing parameter.

3. Exponentially smooth the cyclic indicator with first order smoothing to obtain the final trading signal signal. The calculation method is:
   signal := alpha2 _cycle + (1 - alpha2)_ nz(signal\[1\])

   where α2 is the first order smoothing parameter.

4. Long when signal crosses over signal[1]; Short when signal crosses under signal[1].

## Advantage Analysis

1. The second-order smoothing of the price signal can effectively filter out high-frequency noise and make trading signals more reliable.

2. Applying Ehlers' cyber cycle theory can more accurately determine the turning point of market trends.

3. The first-order exponential smoothing filters out some of the noise in the cyclic indicator to produce more reliable trading signals.

4. The whole process of the strategy is reasonable and scientific, with large parameter optimization space and excellent actual performance.

## Risk Analysis

1. Like other technical indicator strategies, this strategy is also relatively sensitive to systemic market risk. It may incur large losses in the event of black swan events.

2. Due to the complex calculation process, improper parameter settings may cause calculation delays, thereby affecting actual performance. Parameters need to be carefully tested to ensure scientific and reasonable settings.

3. Smoothing processing also leads to lagging trading signals, which may fail to capture market turning points in time, thus missing opportunities. The setting of smoothing parameters needs to strike a balance.

## Optimization Directions

1. Different types of smoothing algorithms can be tested, such as first-order exponential smoothing, moving average smoothing, etc., to find the optimal smoothing scheme.

2. An adaptive parameter tuning mechanism can be introduced to dynamically adjust parameters based on market conditions to improve strategy robustness. 

3. Stop loss and take profit strategies can be designed to reduce the risk of single loss and lock in profits at the same time.

4. It can be combined with autres machine learning models to achieve model portfolios and use otras models to filter trading signals.


## Summary
This strategy designs a trading signal smoothing Ehlers cyber cycle trading strategy through price signal smoothing and Ehlers cyber cycle indicator calculation. It can effectively filter noise and generate more reliable trading signals. At the same time, the parameter space is large and actual performance is good. By introducing adaptive mechanisms, stop loss strategies and otras optimization, the stability and effectiveness of the strategy can be further enhanced.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_2|0.07|Alpha|
|v_input_3|9|Lag|
|v_input_4|true|oppositeTrade|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-19 00:00:00
end: 2024-02-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Ehlers Cyber Cycle Strategy",overlay=false, default_qty_type = strategy.percent_of_equity, default_qty_value = 100.0, pyramiding = 1, commission_type = strategy.commission.percent, commission_value = 0.1)
src = input(hl2, title = "Source") 
alpha = input(.07, title = "Alpha")
lag = input(9, title = "Lag")
smooth = (src + 2 * src[1] + 2 * src[2] + src[3]) / 6

cycle = na
if na(cycle[7])
    cycle := (src - 2 * src[1] + src[2]) / 4
else
    cycle := (1 - .5 * alpha) * (1 - .5 * alpha) * (smooth - 2 * smooth[1] + smooth[2]) + 2 * (1 - alpha) * cycle[1] - (1 - alpha) * (1 - alpha) * cycle[2]

alpha2 = 1 / (lag + 1)
signal = na
signal := alpha2 * cycle + (1 - alpha2) * nz(signal[1])
oppositeTrade = input(true)
barsSinceEntry = 0
barsSinceEntry := nz(barsSinceEntry[1]) + 1
if strategy.position_size == 0
    barsSinceEntry := 0
if (crossover(signal, signal[1]) and not oppositeTrade) or (oppositeTrade and crossunder(signal, signal[1]))
    strategy.entry("Long", strategy.long)
    barsSinceEntry := 0
if (crossunder(signal, signal[1]) and not oppositeTrade) or (oppositeTrade and crossover(signal, signal[1]))
    strategy.entry("Short", strategy.short)
    barsSinceEntry := 0
if strategy.openprofit < 0 and barsSinceEntry > 8
    strategy.close_all()
    barsSinceEntry := 0
    
    
plot(0, title="ZeroLine", color=gray) 
plotSrc = signal
cyclePlot = plot(plotSrc, title = "CyberCycle", color = blue)
triggerPlot = plot(plotSrc[1], title = "Trigger", color = green)
fill(cyclePlot, triggerPlot, color = plotSrc < plotSrc[1] ? red : lime, transp = 50)
```

> Detail

https://www.fmz.com/strategy/442078

> Last Modified

2024-02-19 10:42:34
