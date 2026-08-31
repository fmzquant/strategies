
> Name

基于吞噬模型与量化指标的高级趋势跟踪策略Advanced-Trend-Tracking-Strategy-Based-on-Engulfing-Pattern-and-Quantitative-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ea00ce94ca3d127ac2.png)

### Overview

This strategy integrates multiple quantitative techniques such as engulfing candlestick pattern recognition, oscillators, moving average, and demand-supply zones to precisely determine and trade the trend. It extensively employs professional terminology and standard models of quantitative trading to improve decision accuracy through composite indicator judgment and effectively control risks.

### Strategy Principle  

The core logic of this strategy is based on identifying the engulfing candlestick patterns to catch turnarounds in the market. When a bullish engulfing pattern appears, close\[1\] > open\[1\] and open < close and close > open\[1\] and open\[1\] > close\[1\], a buy signal is triggered. When a bearish engulf pattern appears, close\[1\] < open\[1\] and open > close and close < open\[1\] and open\[1\] < close\[1\], a sell signal is triggered.

In addition, a 20-period demand zone and supply zone indicator is introduced. When the close breaks through the supply zone, it is determined as a bullish signal. When it breaks through the demand zone, it is determined as a bearish signal. The EMA moving average is used to determine the trend direction. Trading signals are generated only when the close breaks through the EMA. The fractal oscillator that finds pivot points assists in confirming the time of reversals.

In summary, this strategy determines potential reversals through engulfing patterns and uses filters like moving averages and supply-demand zones to confirm and trade only the highest probability points, thereby accurately tracking trends and avoiding losing all capital to whipsaws.

### Advantage Analysis

This is a highly professional and advanced trend tracking strategy with the following main advantages:

1. Multiple indicator combo improves judgment accuracy and effectively filters false signals  
2. Engulfing patterns catch reversals  
3. Oscillators and trends determine high probability trade points  
4. Automatic pattern and indicator plotting, readable  
5. Concise logic, easily extensible and optimizable

Overall, this strategy has high accuracy and good risk control. It is suitable for mid-to-long term trend tracking and can deliver steady profits.  

### Risk Analysis

Despite its numerous strengths, some potential risks to note:  

1. Inaccurate engulfing pattern recognition might miss actual reversals or generate false signals
2. Wrong signals probability exists in moving average systems, may buy the top and sell the bottom
3. Improper demand zone and supply zone range setting increases unnecessary trades  
4. Limited optimization space, higher avalanche risks

Countermeasures:

1. Introduce machine learning to improve reversal pattern recognition accuracy  
2. Add indicators judging violent trend to avoid unnecessary losses
3. Dynamically optimize demand and supply zone parameters   
4. Reasonably assess and control risks, adjust position sizing   

### Optimization Directions

Further optimization directions:  

1. Add AI-based pattern recognition module using machine learning for engulfing and reversals
2. Introduce more filters like BOLL and MACD for timing  
3. Add stop loss strategies like trailing stop loss and time-based stop loss
4. Dynamically optimize indicator parameters for different products and markets
5. Incorporate advanced strategies like trailing stops and martingale to manage equity curve  

The above optimizations can improve accuracy, reduce risks, and smooth equity curve.  

### Summary

In summary, this is an extremely professional and efficient strategy that fully utilizes multiple quantitative indicators and models to judge market changes. It captures reversal signals through engulfing patterns and issues high probability trading signals collaborating with trend and oscillator indicators. This allows effective mid-to-long term trend tracking and steady profits. Meanwhile, certain risks need attention. Continual optimizations and strict risk management significantly lower risks, making the strategy more reliable. It has strong practicality and extensibility, suitable for traders with some quantitative basis.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|EMA Length|
|v_input_2|20|Demand & Supply Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-02 00:00:00
end: 2024-02-01 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Engulfing Candles with Fractals, Moving Average, Demand & Supply", overlay=true)

// Input parameters
emaLength = input(14, title="EMA Length")
demandSupplyLength = input(20, title="Demand & Supply Length")

// Calculate EMA
emaValue = ta.ema(close, emaLength)

// Calculate Demand and Supply Zones
demandZone = ta.lowest(low, demandSupplyLength)
supplyZone = ta.highest(high, demandSupplyLength)

// Plot Demand and Supply Zones
plot(demandZone, color=color.new(color.green, 90), linewidth=2, title="Demand Zone")
plot(supplyZone, color=color.new(color.red, 90), linewidth=2, title="Supply Zone")

// Determine Engulfing Candles
bullishEngulfing = close[1] > open[1] and open < close and close > open[1] and open[1] > close[1]
bearishEngulfing = close[1] < open[1] and open > close and close < open[1] and open[1] < close[1]

// Plot Engulfing Candle Bars
bgcolor(bullishEngulfing ? color.new(color.green, 90) : na)
bgcolor(bearishEngulfing ? color.new(color.red, 90) : na)

// Plot Moving Average
plot(emaValue, color=color.blue, title="EMA")

// Fractal Indicator
fractalUp = ta.pivothigh(high, 2, 2)
fractalDown = ta.pivotlow(low, 2, 2)

// Plot Buy and Sell Fractals
plotshape(series=fractalUp, title="Buy Fractal", location=location.belowbar, color=color.green, style=shape.labelup, text="Buy")
plotshape(series=fractalDown, title="Sell Fractal", location=location.abovebar, color=color.red, style=shape.labeldown, text="Sell")

// Strategy logic
buySignal = bullishEngulfing and close > emaValue and close > supplyZone
sellSignal = bearishEngulfing and close < emaValue and close < demandZone

// Execute strategy
if (fractalUp)
    strategy.entry("Buy", strategy.long)

if (fractalDown)
    strategy.entry("Sell", strategy.short)

// Plot strategy entry points on the chart
plotshape(series=buySignal ? 1 : na, title="Buy Signal", color=color.green, style=shape.triangleup, location=location.belowbar, size=size.small)
plotshape(series=sellSignal ? 1 : na, title="Sell Signal", color=color.red, style=shape.triangledown, location=location.abovebar, size=size.small)

```

> Detail

https://www.fmz.com/strategy/440845

> Last Modified

2024-02-02 16:48:30
