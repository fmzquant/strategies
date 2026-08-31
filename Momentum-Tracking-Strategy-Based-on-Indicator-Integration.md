
> Name

Momentum-Tracking-Strategy-Based-on-Indicator-Integration

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b2945829979b0552f6.png)



## Overview

This strategy is based on a custom indicator integrator to determine price trend direction by accumulating the sum of distances between price and moving average, and thus track the trend.

## Strategy Logic

The strategy uses a custom indicator to integrate the distance between price and moving average, implemented as follows:

1. Calculate the distance between price and 200-period simple moving average k=close-sma(close,200)

2. Define integration period s=29, accumulate the sum of k over last s periods: sum = 0, for i = 0 to s, sum := sum + k[i] 

3. When sum>0, long signal is generated. When sum<0, short signal is generated.

4. When long position is opened, if sum<0, close long position. When short position is opened, if sum>0, close short position.

The strategy judges overall trend direction by tracking whether the accumulated sum of distance between price and moving average is positive or negative. When the integral is positive, it indicates an upward trend and long position should be held. When the integral is negative, it indicates a downward trend and short position should be held.

## Advantages

1. The custom indicator integrator can effectively determine price trend direction.

2. The integration concept accumulates distance between price and MA, improving trend determination accuracy. 

3. Relatively simple logic, easy to understand and optimize.

4. Flexible adjustment of integration period to optimize sensitivity.

5. Good backtest results, stable profits, applicable in live trading.

## Risks

1. Improper integration period setting may cause insensitive reaction and miss trend turning points.

2. Improper MA length setting may cause misjudgment of trend.

3. Sudden big events may cause wrong signals. 

4. Improper symbol selection, highly volatile symbols may deteriorate effectiveness.

Corresponding solutions:

1. Optimize integration period for better sensitivity.

2. Test different MA lengths to find optimal one for trend determination.

3. Close strategy before major events to avoid errors from big price changes.

4. Select low volatility symbols for better performance.

## Improvement Directions

1. Consider adding other indicators like RSI for comprehensive determination.

2. Research integration results using different types of MA.

3. Try auto optimizing integration period for different symbols. 

4. Add volume indicators to avoid errors during huge price swings.

5. Use machine learning to auto optimize parameters for robustness.

## Conclusion

This strategy judges trend direction using a custom indicator integrator by accumulating the distance between price and MA. The logic is simple and clear, and backtest results are good. It can be improved by adjusting integration parameters, adding auxiliary indicators, auto optimization etc. for more reliable practical application. Overall it is an applicable quantitative trend tracking strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|170|Length for indicator|
|v_input_2|29|Length of summation|
|v_input_3|false|Take Profit|
|v_input_4|false|Stop Loss|
|v_input_5|false|Trailing Stop Loss|
|v_input_6|false|Trailing Stop Loss Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-09 00:00:00
end: 2023-10-16 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Indicator Integrator Strat",default_qty_type = strategy.percent_of_equity, default_qty_value = 100,currency="USD",initial_capital=100, overlay=true)

l = input(defval=170,title="Length for indicator")
s = input(title="Length of summation",defval=29)
a= sma(close,l)
r=roc(close,l)
k=close-a
sum = 0
for i = 0 to s
    sum := sum + k[i]
plot(a,color=yellow,linewidth=2,transp=0)
//bc =  iff( sum > 0, white, teal)
//plot(sum,color=bc, transp=20, linewidth=3,style=columns)
//plot(sma(sum,3),color=white)
//hline(0)

inpTakeProfit = input(defval = 0, title = "Take Profit", minval = 0)
inpStopLoss = input(defval = 0, title = "Stop Loss", minval = 0)
inpTrailStop = input(defval = 0, title = "Trailing Stop Loss", minval = 0)
inpTrailOffset = input(defval = 0, title = "Trailing Stop Loss Offset", minval = 0)
useTakeProfit = inpTakeProfit >= 1 ? inpTakeProfit : na
useStopLoss = inpStopLoss >= 1 ? inpStopLoss : na
useTrailStop = inpTrailStop >= 1 ? inpTrailStop : na
useTrailOffset = inpTrailOffset >= 1 ? inpTrailOffset : na


longCondition = sum>0
exitlong = sum<0

shortCondition = sum<0
exitshort = sum>0

strategy.entry(id = "Long", long=true, when = longCondition)
strategy.close(id = "Long", when = exitlong)
strategy.exit("Exit Long", from_entry = "Long", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset, when=exitlong)

strategy.entry(id = "Short", long=false, when = shortCondition)
strategy.close(id = "Short", when = exitshort)
strategy.exit("Exit Short", from_entry = "Short", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset, when=exitshort)
```

> Detail

https://www.fmz.com/strategy/429484

> Last Modified

2023-10-17 15:26:49
