
> 策略名称

Bullish & Bearish Engulfing

> 策略作者

Zer3192



> 策略参数



|参数|默认值|描述|
|----|----|----|
|v_input_float_1|3|Scale of engulfing candle|
|v_input_int_1|30|Minimum Candle size in pips|


> 源码 (PineScript)

``` javascript
//@version=5
indicator("Bullish & Bearish Engulfing", overlay=true)

engulfScale = input.float(3.0, "Scale of engulfing candle", minval = 1.0, step = 0.1, tooltip="Scale factor of engulfing candle compared to previous candle")

// Input minimum engulfing candle size
candlePipSize = input.int(30, "Minimum Candle size in pips", minval = 10, tooltip="To gauge if worth entering a trade")

// Make sure the shadow is bigger than previous candle
//engulfShadow = high > high[1] and low < low[1]

// Compare current and prev candle sizes
engulfSizeBull = close - open
prevCandleBull = open[1] - close[1]
engulfSizeBear = open - close
prevCandleBear = close[1] - open[1]
isGradeABull = engulfSizeBull >= (prevCandleBull * engulfScale)
isGradeABear = engulfSizeBear >= (prevCandleBear * engulfScale)

// Check engulfing candle size
isWorthBull = engulfSizeBull >=(candlePipSize/10)
isWorthBear = engulfSizeBear >=(candlePipSize/10)

// Check the Bullish Engulfing
bullEngulf = open[1] > close[1] and open < close and close >= open[1] and isGradeABull and isWorthBull

// Check the Bearish Engulfing
bearEngulf = open[1] < close[1] and open > close and close <= open[1] and isGradeABear and isWorthBear

// Testing
//buyMessage = str.format("{0, number}", engulfSizeBull)
//if bullEngulf
//    label.new(bar_index, high, color=#AAF0D1, text=buyMessage)

// Plot the 'triangle'
plotshape(bullEngulf, title="Bullish Engulf", location=location.belowbar, style=shape.triangleup, text="Bullish Engulf", size=size.auto, color=color.blue)
plotshape(bearEngulf, title="Bearish Engulf", location=location.abovebar, style=shape.triangledown, text="Bearish Engulf", size=size.auto, color=color.red)

// Alerts
alertcondition(bullEngulf, "Bullish Engulfing",  "Go long")
alertcondition(bearEngulf, "Bearish Engulfing",  "Go short")

if bullEngulf
    strategy.entry("Enter Long", strategy.long)
else if bearEngulf
    strategy.entry("Enter Short", strategy.short)
```

> 策略出处

https://www.fmz.com/strategy/380369

> 更新时间

2022-08-28 13:17:09
