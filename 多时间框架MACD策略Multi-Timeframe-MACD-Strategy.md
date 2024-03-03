
> Name

多时间框架MACD策略Multi-Timeframe-MACD-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1fef8dd6294f7e35bde.png)
[trans]

## 概述

多时间框架MACD策略(Multi Timeframe MACD Strategy)是一个利用MACD指标在多个时间框架上实现趋势跟踪的量化交易策略。该策略通过在不同的时间周期(3分钟、5分钟、15分钟、30分钟)上计算MACD指标,判断不同周期之间的价格走势是否一致,来发出交易信号。

## 策略原理  

该策略的核心逻辑是计算MACD指标在多个时间框架(3分钟、5分钟、15分钟、30分钟)上的交叉情况。首先在每个时间框架上计算MACD指标,根据MACD指标判断该时间框架下的价格走势(上升or下降)。然后将多个时间框架下的价格走势进行综合判断:

1. 当所有时间框架下价格均上升时,产生买入信号;  
2. 当所有时间框架下价格均下降时,产生卖出信号。

通过跨时间框架判断趋势的方式,可以有效滤除短期市场噪音,使交易信号更加可靠。

## 策略优势

本策略具有以下优势:

1. 跨时间框架检测趋势,过滤噪音,使交易信号更加可靠;  
2. MACD指标参数可自定义设置,适应不同市场环境;
3. 可灵活配置需要综合判断的时间框架,自主定义交易规则。

## 策略风险及解决方案

本策略也存在以下风险:  

1. 在所有时间框架判断趋势一致性时,可能会错过局部反转的机会;  
2. MACD指标参数设置不当可能导致交易信号效果不佳。  

对应解决方案:

1. 可以适当放宽综合判断规则,允许个别时间框架价格出现反转,抓住更多机会;
2. 需要根据不同市场调整MACD指标参数,使交易信号更契合当前行情。

## 优化方向  

本策略可以从以下几个方面继续优化:

1. 增加或减少需要综合判断的时间框架数量,寻找最佳组合;
2. 测试不同的MACD指标参数设置;  
3. 根据实际回测情况调整具体的入场和出场规则。

## 总结

多时间框架MACD策略利用MACD指标的趋势判断功能,实现了跨时间框架进行价格走势检测,可有效过滤噪音,提高信号质量。该策略可以通过参数调整和规则优化,灵活适应不同品种和行情环境,具有很强的实用性。

|| 

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

[/trans]

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
