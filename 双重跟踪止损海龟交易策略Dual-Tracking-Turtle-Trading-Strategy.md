
> Name

双重跟踪止损海龟交易策略Dual-Tracking-Turtle-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16dc7b218868e2f7d7e.png)
 [trans]

### 概述

该策略利用海龟交易法则设立两个追踪止损点,通过双重跟踪止损限制亏损,同时设置不同的参数以过滤掉市场噪音,在趋势较为明显时进行买入。

### 策略原理

该策略主要通过两个追踪止损点long_1和long_2确定买入时机。其中long_1追踪较长期趋势,long_2追踪较短期趋势。同时设置profit1和profit2作为止损点。

如果价格高于long_1,则市场处于较长期上涨趋势,这个时候如果价格又低于long_2,说明 shorterm出现回调提供较好入场时机,那么就入场做多;如果价格低于long_1,则较长期没有确定趋势,shorterm如果价格高于long_2,说明短期出现反弹,也可以入场。

入场后,设置两个追踪止损点stoploss1和stoploss2,并和profit1、profit2比较取最大值,从而锁定利润。

### 优势分析

- 通过双重跟踪止损,可以有效控制风险,最大程度锁定利润
- 结合长短期两类指标,可以过滤部分噪音,在较明确趋势时入场
- 可以通过参数调整自由控制策略的保守性

### 风险分析

- 策略较为保守,容易错过部分机会
- 止损点设置不当可能过早止损
- 交易次数较少,单笔亏损可能较大

可以通过适当调整long和profit的参数,使策略更加进取,增加交易次数。同时优化止损点算法,实现自动调整。

### 优化方向

- 优化long和profit的参数找到最优参数组合
- 尝试之字止损或者影线止损 algorithem 以减少不必要的止损
- 增加开仓条件以过滤噪音,找到更加明确的趋势
- 结合交易量指标寻找真实的突破

### 总结

该策略整体较为保守,适合稳定增长的投资者。通过参数调整和止损算法优化,可以适当增加策略的进取性。此外,增加过滤市场噪音的机制也是后续的一个优化方向。

||


### Overview

This strategy utilizes two tracking stop loss points based on the turtle trading rules to limit losses, while setting different parameters to filter out market noise and enter on more pronounced trends.

### Strategy Logic  

The strategy primarily relies on two tracking stop loss points, long_1 and long_2, to determine entry signals. Long_1 tracks the longer term trend while long_2 tracks the shorter term. Profit1 and profit2 act as the stop loss points.   

If price is above long_1, the market is in a longer term uptrend. If price then drops below long_2, it indicates a short term pullback providing good entry opportunity to go long. If price is below long_1, there is no confirmed longer term trend. But if price then surpasses long_2, it signals a short term bounce and can also take long position.

After entering, two tracking stop losses stoploss1 and stoploss2 are set and compared with profit1 and profit2 to take the maximum value, in order to lock in profits.

### Advantage Analysis

- Dual tracking stop loss effectively controls risks and locks in profits
- Combining both long term and short term indicators filters out some noise and enters on more pronounced trends  
- Flexibility to adjust conservatism of strategy by tuning parameters

### Risk Analysis  

- Strategy is conservative and could miss some opportunities 
- Improper stop loss setting may prematurely exit  
- Less trades so single losing trade impact could be big

Can make strategy more aggressive by adjusting long and profit parameters for more trades. Also optimize stop loss algorithms for adaptive adjustments.

### Optimization Directions   

- Find optimal parameter combinations for long and profit
- Experiment with zigzag or shadow stop losses to reduce unnecessary stops
- Add more entry filters to detect stronger established trends 
- Incorporate volume indicators to catch true breakouts 

### Summary

This is an overall conservative strategy suited for investors seeking steady growth. By tuning parameters and optimizing stop loss algorithms, aggression can be increased. Adding mechanisms to filter out market noise is also a direction for further optimizations.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|55|entry_1|
|v_input_2|20|profit_1|
|v_input_3|20|entry_2|
|v_input_4|10|profit_2|
|v_input_5|true|stop_1|
|v_input_6|2|stop_2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-12-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Turtle Project",overlay= true)
//-----------------------------------------------------------
entry_1 =  input(55) 
profit_1 =  input(20)             

long_1 = float(na)                                                             
long_1:= if high[entry_1] >= highest(high,entry_1)                   
    high[entry_1]                                                            
else                                                                              
    long_1[1]                                                                   


profit1 = float(na)                                                            
profit1:= if low[profit_1] <= lowest(low,profit_1)                   
    low[profit_1]                                                            
else                                                                            
    profit1[1]                      
//-----------------------------------------------------------
entry_2 =  input(20) 
profit_2 =  input(10)             

long_2 = float(na)                                                             
long_2:= if high[entry_2] >= highest(high,entry_2)                   
    high[entry_2]                                                            
else                                                                              
    long_2[1]                                                                   


profit2 = float(na)                                                            
profit2:= if low[profit_2] <= lowest(low,profit_2)                   
    low[profit_2]                                                            
else                                                                           
    profit2[1]                      
//------------------------------------------------------------
stoploss_1= lowest(low,1) < long_1 and highest(high,1) > long_1
stoploss_2= lowest(low,1) < long_2 and highest(high,1) > long_2 

stop_1 = input(1)/100
stop_2 = input(2)/100

plotchar(stoploss_1, "high1", "▲",location.top,color=color.red )
plotchar(stoploss_2, "high2", "▲",location.top,color=color.blue)


//------------------------------------------------------------
if strategy.position_size == 0
    if low < long_1
        if high < long_1 
            strategy.entry("longlong_4",strategy.long, stop=long_1)

if strategy.position_size == 0    
    if low > long_1
        if high < long_2 
            strategy.entry("longlong_3",strategy.long, stop=long_2)

stoploss1 = float(na)
stoploss1:= stoploss_1 ? strategy.position_avg_price * (1 - stop_1) : stoploss1[1]
stoploss__1 = max(stoploss1,profit1)

if high > long_1 and strategy.position_size > 0
    strategy.exit("exit_1 ","longlong_4",stop=stoploss__1)

stoploss2 = float(na)
stoploss2:= stoploss_2 ? strategy.position_avg_price * (1 - stop_2) : stoploss2[1]
stoploss__2 = max(stoploss2,profit2)

if high > long_2 and strategy.position_size > 0
    strategy.exit("exit_2 ","longlong_3",stop=stoploss__2)
//--------------------------------------------------------------
plot(long_1,color=color.red ,linewidth=3)
plot(long_2,color=color.blue,linewidth=3)

plot(profit1,color=color.red,   linewidth=1)
plot(profit2,color=color.blue,  linewidth=1)

//plot(stoploss__1,style=plot.style_circles, color=color.yellow) 
//plot(stoploss__2,style=plot.style_circles, color=color.yellow) 

plot(stoploss1,style=plot.style_circles, color=color.blue) 
plot(stoploss2,style=plot.style_circles, color=color.red) 
//--------------------------------------------------------------
```

> Detail

https://www.fmz.com/strategy/435949

> Last Modified

2023-12-20 13:37:31
