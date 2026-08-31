
> Name

Multi-Timeframe-MACD-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1fef8dd6294f7e35bde.png)

## Overview  

The Multi Timeframe MACD Strategy is a quantitative trading strategy that tracks trends using the MACD indicator across multiple time frames. This strategy generates trading signals by judging whether price trends are consistent across different periods (3 mins, 5 mins, 15 mins, 30 mins).  

## Strategy Logic   

The core logic of this strategy is to calculate the MACD indicator crossing situation across multiple time frames (3 mins, 5 mins, 15 mins, 30 mins). Firstly, the MACD indicator is calculated on each time frame to judge the price trend (up or down) under that time frame. Then, price trends across multiple time frames are judged comprehensively:

1. When prices rise across all time frames, a buy signal is generated.
2. When prices fall across all time frames, a sell signal is generated.   

By judging the trend across time frames, short-term market noise can be effectively filtered out, making trading signals more reliable.
 
## Advantages  

This strategy has the following advantages:

1. Detecting trends across time frames filters out noise and makes trading signals more reliable.
2. MACD indicator parameters can be customized to suit different market environments.  
3. Time frames for comprehensive judgment can be flexibly configured to define trading rules independently.

## Risks and Solutions   

This strategy also has the following risks:   

1. When judging trend consistency across all time frames, local reversals may be missed.
2. Improper MACD parameter settings may lead to poor trading signal performance.

Corresponding solutions:

1. Judgment rules can be moderately relaxed to allow price reversals on individual time frames to capture more opportunities.  
2. MACD parameters need to be adjusted according to different markets to make trading signals more fitting for current trends.

## Optimization Directions   

This strategy can be further optimized in the following aspects:  

1. Increase or decrease the number of time frames needed for comprehensive judgment to find the optimal combination.  
2. Test different MACD indicator parameter settings.   
3. Adjust specific entry and exit rules based on actual backtesting results.

## Summary  

The Multi Timeframe MACD Strategy utilizes the trend judgment capability of the MACD indicator to detect price movements across time frames, which can effectively filter out noise and improve signal quality. This strategy can be flexibly adapted to different products and market environments through parameter tuning and rule optimization, and has strong practicality.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Timeframe 1|
|v_input_2|5|Timeframe 2|
|v_input_3|15|Timeframe 3|
|v_input_4|30|Timeframe 4|
|v_input_5|12|Fast Length|
|v_input_6|26|Slow Length|
|v_input_7|9|Signal Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-28 00:00:00
end: 2023-11-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("[RichG] Easy MTF Strategy", overlay=false)

TF_1_time = input("3", "Timeframe 1")
TF_2_time = input("5", "Timeframe 2")
TF_3_time = input("15", "Timeframe 3")
TF_4_time = input("30", "Timeframe 4")

fastLen = input(title="Fast Length",  defval=12)
slowLen = input(title="Slow Length",  defval=26)
sigLen  = input(title="Signal Length",  defval=9)
[macdLine, signalLine, _] = macd(close, fastLen, slowLen, sigLen)

width = 5
upcolor = green
downcolor = red
neutralcolor = blue
linestyle = line

TF_1 = request.security(syminfo.tickerid, TF_1_time, open) < request.security(syminfo.tickerid, TF_1_time, close) ? true:false
TF_1_color = TF_1 ? upcolor:downcolor

TF_2 = request.security(syminfo.tickerid, TF_2_time, open) < request.security(syminfo.tickerid, TF_2_time, close) ? true:false
TF_2_color = TF_2 ? upcolor:downcolor

TF_3 = request.security(syminfo.tickerid, TF_3_time, open) < request.security(syminfo.tickerid, TF_3_time, close) ? true:false
TF_3_color = TF_3 ? upcolor:downcolor

TF_4 = request.security(syminfo.tickerid, TF_4_time, open) < request.security(syminfo.tickerid, TF_4_time, close) ? true:false
TF_4_color = TF_4 ? upcolor:downcolor

TF_global = TF_1 and TF_2 and TF_3 and TF_4 
TF_global_bear = TF_1 == false and TF_2 == false and TF_3 == false and TF_4 == false
TF_global_color = TF_global ? green : TF_global_bear ? red : white
TF_trigger_width = TF_global ? 6 : width

plot(1, style=linestyle, linewidth=width, color=TF_1_color)
plot(5, style=linestyle, linewidth=width, color=TF_2_color)
plot(10, style=linestyle, linewidth=width, color=TF_3_color)
plot(15, style=linestyle, linewidth=width, color=TF_4_color)
plot(25, style=linestyle, linewidth=4, color=TF_global_color)    

exitCondition_Long = TF_global_bear
exitCondition_Short = TF_global

longCondition = TF_global
if (longCondition)
    strategy.entry("MTF_Long", strategy.long)

shortCondition = TF_global_bear
if (shortCondition)
    strategy.entry("MTF_Short", strategy.short)
    
strategy.close("MTF_Long", when=exitCondition_Long)    
strategy.close("MTF_Short", when=exitCondition_Short)
```

> Detail

https://www.fmz.com/strategy/433565

> Last Modified

2023-11-28 15:33:35
