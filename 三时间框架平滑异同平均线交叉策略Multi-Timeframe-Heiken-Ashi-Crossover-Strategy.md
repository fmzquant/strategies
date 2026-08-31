
> Name

三时间框架平滑异同平均线交叉策略Multi-Timeframe-Heiken-Ashi-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses Heiken Ashi candles across three timeframes to generate signals when all timeframes align bullish or bearish. It aims to confirm trend using multiple timeframes to reduce false signals.

## Principles

Heiken Ashi candles differ from regular candles by smoothing price action for easier trend identification.

The strategy employs daily, weekly and monthly Heiken Ashi candles. When all three align bullish, with green candles, long signal is generated. When all red candles, short signal is generated.

Exits when any timeframe flips direction after entry.

## Advantages  

1. Multi-timeframe confirmation reduces false signals and enhances robustness.

2. Heiken Ashi smooths noise to identify trend.

3. Simple straightforward rules easy to implement. 

4. Flexible timeframes adaptable to different products.

5. No parameter optimization required, very easy to use.

## Risks and Mitigations

1. Strict conditions may miss opportunities. Can relax condition requirements.

2. Heiken Ashi lag remains, potentially delaying signals. Can optimize with additional indicators.

3. No stop loss inability to control risk. Can add moving stop loss.

4. Fixed risk-reward lacks flexibility. Can implement dynamic stops. 

5. Indicator-only prone to false signals. Can add price-volume confirmation.

## Enhancement Opportunities

1. Test additional timeframes like 15m or 60m.

2. Optimize Heiken Ashi parameters for sensitivity.

3. Add moving stop loss for risk control.

4. Incorporate market structure indicators to avoid ranges.

5. Develop re-entry conditions to extend holding period.

## Summary

The strategy taps into Heiken Ashi across timeframes for trend following, but indicator-only design prone to false signals. Improvements can be made via additional indicators, stops, parameter optimization to make it more reliable. Overall the multi-timeframe confirmation is a useful concept.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|D|TM 1|
|v_input_2|W|TM 2|
|v_input_3|M|TM 3|
|v_input_4|true|longA|
|v_input_5|false|shortA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-03-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
args: [["v_input_5",true]]
*/

//@version=4
strategy("Heiken Ashi MTF Strategy")
ha_t = heikinashi(syminfo.tickerid)

res = input('D', title="TM 1")
ha_open = security(ha_t, res, open)
ha_close = security(ha_t, res, close)
ha_dif = ha_open-ha_close
ha_diff=iff(ha_dif > 0, 1, iff(ha_dif<0, 2, 3))

res2 = input('W', title="TM 2")
ha_open2 = security(ha_t, res2, open)
ha_close2 = security(ha_t, res2, close)
ha_dif2 = ha_open2-ha_close2
ha_diff2=iff(ha_dif2 > 0, 1, iff(ha_dif2<0, 2, 3))

res3 = input('M', title="TM 3")
ha_open3 = security(ha_t, res3, open)
ha_close3 = security(ha_t, res3, close)
ha_dif3 = ha_open3-ha_close3
ha_diff3=iff(ha_dif3 > 0, 1, iff(ha_dif3<0, 2, 3))

plot(15, title="TF1", color=iff(ha_diff==1, color.red, iff(ha_diff==2, color.green, color.white)), style=plot.style_circles, linewidth=5, join=true)
plot(14, title="TF2", color=iff(ha_diff2==1, color.red, iff(ha_diff2==2, color.green, color.white)), style=plot.style_circles, linewidth=5, join=true)
plot(13, title="TF3", color=iff(ha_diff3==1, color.red, iff(ha_diff3==2, color.green, color.white)), style=plot.style_circles, linewidth=5, join=true)


short = ha_diff ==1 and ha_diff2==1 and ha_diff3 ==1
long = ha_diff ==2 and ha_diff2==2 and ha_diff3 ==2

exitlong = ha_diff ==1 or ha_diff2==1 or ha_diff3 ==1
exitshort = ha_diff ==2 or ha_diff2==2 or ha_diff3 ==2

longA = input(true)
shortA = input(false)

if(longA)
    strategy.entry("long",1,when=long)
    strategy.close("long",when=exitlong)
if(shortA)
    strategy.entry("short",0,when=short)
    strategy.close("short",when=exitshort)
```

> Detail

https://www.fmz.com/strategy/427188

> Last Modified

2023-09-18 21:50:05
