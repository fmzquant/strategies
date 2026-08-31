
> Name

Dual-Moving-Average-Strategy-439106

> Author

ChaoZhang

> Strategy Description
![IMG](https://www.fmz.com/upload/asset/100b186d80b89b8f627.png)
 ## Overview

This strategy employs dual moving averages, specifically 8-period and 21-period ones. It generates long signals when the shorter MA crosses over the longer one, and short signals when the shorter MA crosses below the longer one.  

The strategy also incorporates the slope of the moving average line to filter out some non-trending periods and only produce signals when a trend is more apparent.

## Principles

The core of this strategy lies in the crossover of the short-term and long-term moving averages. The shorter MA can capture trend changes faster, while the longer MA has better noise filtering effects. The establishment of an uptrend is suggested when the shorter MA crosses over the longer MA, leading to a long signal; the establishment of a downtrend is suggested when the shorter MA crosses below the longer MA, leading to a short signal.

The strategy also sets a slope threshold. Only when the slope is greater than the positive threshold value will a long signal be generated. Only when the slope is less than the negative threshold value will a short signal be generated. This helps filter out zones where no pronounced trend exists, resulting in trading signals of higher quality. 

Specifically, the logic for generating trading signals is:

1. Calculate the 8-period and 21-period simple moving averages  
2. Detect crossover signals between the two
3. Calculate the slope of the 21-period moving average line using the arctangent function atan
4. Only generate long signals when the slope exceeds a preset positive threshold
5. Only generate short signals when the slope falls below a preset negative threshold

## Advantage Analysis 

The advantages of this strategy include:

1. The strategy idea is simple and easy to understand/implement
2. Incorporating slope index helps filter out non-trending periods and improves signal quality
3. Employing dual moving averages allows both to play to their strengths, improving robustness
4. Parameters can be adjusted to suit different trading instruments  
5. Simple program implementation facilitates further optimization

## Risk Analysis

Some risks also exist with this strategy:  

1. More false signals may occur during violent market fluctuations
2. Crossover itself tends to produce some false signals 
3. There is some degree of lag, unable to instantly capture trend reversals

Some ways to optimize based on these risks:

1. Adjust MA parameters to suit market characteristics
2. Optimize slope threshold to improve robustness
3. Add stop loss mechanisms to control single loss
4. Incorporate other indicators to filter signals 
5. Employ adaptive parameter setting to improve robustness

## Optimization Directions

Some directions for optimizing the strategy:

1. Employ adaptive MAs, adjusting parameters based on volatility
2. Incorporate volume analysis to avoid errors during consolidation
3. Add volatility index to enhance quality and timeliness 
4. Add machine learning for automatic parameter optimization
5. Leverage deep learning to uncover more complex nonlinear patterns

## Conclusion

In summary, this dual MA strategy is simple and practical. By capturing different trend characteristics through the two period parameters and combining them to generate trading signals. Meanwhile, incorporating the slope threshold improves signal quality. This strategy can serve as a basic one for extensions, with ample optimization space and potential.
> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|7|Angle|
|v_input_2|2|Angle Period|
|v_input_3|10|ATR Period|
|v_input_4|6|Angle Level|
|v_input_5_close|0|MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-09 00:00:00
end: 2024-01-16 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//written by sixpathssenin
//@version=4
strategy(title="Dual Moving Average",initial_capital=10000,overlay=true)

ma1= sma(close,8)
ma2= sma(close,21)

angleCriteria = input(title="Angle", type=input.integer, defval=7, minval=1, maxval=13)

i_lookback   = input(2,     "Angle Period", input.integer, minval = 1)
i_atrPeriod  = input(10,    "ATR Period",   input.integer, minval = 1)
i_angleLevel = input(6,     "Angle Level",  input.integer, minval = 1)
i_maSource   = input(close, "MA Source",    input.source)

f_angle(_src, _lookback, _atrPeriod) =>
    rad2degree = 180 / 3.141592653589793238462643  //pi 
    ang = rad2degree * atan((_src[0] - _src[_lookback]) / atr(_atrPeriod)/_lookback)
    ang
_angle = f_angle(ma2, i_lookback, i_atrPeriod)

plot(ma1,color=#FF0000)
plot(ma2,color=#00FF00)

crosso=crossover(ma1,ma2) 
crossu=crossunder(ma1,ma2)

_lookback = 15

f_somethingHappened(_cond, _lookback) =>
    bool _crossed = false
    for i = 1 to _lookback
        if _cond[i]
            _crossed := true
    _crossed
    
longcrossed = f_somethingHappened(crosso,_lookback)
shortcrossed = f_somethingHappened(crossu,_lookback)

long = longcrossed and _angle > angleCriteria
short= shortcrossed and _angle < -(angleCriteria)


if(long)
    strategy.entry("Long",strategy.long)
if(short)
    strategy.entry("short",strategy.short)
    

```

> Detail

https://www.fmz.com/strategy/439106

> Last Modified

2024-01-17 17:45:45
