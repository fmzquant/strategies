
> Name

移动平均线聚合MACD策略Moving-Average-Aggregation-MACD-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/136ee296fed3d3a4820.png)

### Overview
This strategy combines 5 different types of moving averages, and generates trading signals when the directions of all 5 moving averages are consistent. The aggregation of multiple moving averages can effectively filter market noise and identify trend direction.  

### Strategy Logic
This strategy uses SMA, EMA, RMA, WMA and VWMA five kinds of moving averages. It calculates five 8-day fast MAs and five 144-day slow MAs. When all fast MAs are rising and all slow MAs are rising, it generates a long signal. When all fast MAs are falling and all slow MAs are falling, it generates a short signal.

### Advantage Analysis 
- Aggregating multiple moving averages makes signals more reliable and avoids false signals
- Utilizes advantages of different MAs, like SMA smooths price, VWMA considers volume, WMA assigns weights, etc
- Parameters are adjustable for optimizing fast and slow MA lengths  

### Risk Analysis
- When one or two out of the aggregated MAs generate false signals, it also affects the strategy
- Cannot generate timely signals when trend starts
- Parameter optimization is needed to find optimum parameters  

### Optimization Directions
- Can test different MA combinations and parameters
- Can combine with other indicators for confirmation, like MACD, RSI, etc
- Can dynamically adjust MA parameters based on market conditions  

### Summary
This strategy generates trading signals when all major moving averages reach consensus on direction. It effectively utilizes strengths of different MAs while filtering some noise to identify market trend direction. Further enhancements like parameter optimization and indicator combos can improve strategy stability. Overall a simple and practical trend following strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|8|FAST LOOKBACK|
|v_input_2|144|SLOW LOOKBACK|


> Source (PineScript)

``` pinescript
//@version=2
strategy(title="MACD Multi-MA Strategy", overlay=false )

src = close 
len1 = input(8, "FAST LOOKBACK") 
len2 = input(144, "SLOW LOOKBACK")

/////////////////////////////////////////////
length = len2-len1
ma = vwma(src, length)
plot(ma, title="VWMA", color=lime)


length1 = len2-len1
ma1 = rma(src, length1)
plot(ma1, title="RMA", color=purple)

length2 = len2-len1
ma2 = sma(src, length2)
plot(ma2, title="SMA", color=red)


length3 = len2-len1
ma3 = wma(src, length3)
plot(ma3, title="WMA", color=orange)

length4 = len2-len1
ma4 = ema(src, length4)
plot(ma4, title="EMA", color=yellow)





long = ma > ma[1] and ma1 > ma1[1] and ma2 > ma2[1] and ma3 > ma3[1] and ma4 > ma4[1]
short = ma < ma[1] and ma1 < ma1[1] and ma2 < ma2[1] and ma3 < ma3[1] and ma4 < ma4[1]


strategy.entry("Long", strategy.long, when=long)
strategy.entry("Short", strategy.short, when=short)


```

> Detail

https://www.fmz.com/strategy/434606

> Last Modified

2023-12-07 17:35:41
