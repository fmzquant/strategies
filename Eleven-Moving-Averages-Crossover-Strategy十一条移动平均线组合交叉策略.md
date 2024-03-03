
> Name

Eleven-Moving-Averages-Crossover-Strategy十一条移动平均线组合交叉策略

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1f7f2cebbb13c6663dd.png)

[trans]

## Overview

This strategy combines crossovers of 11 different types of moving averages for long and short entries. The 11 moving averages used are: Simple (SMA), Exponential (EMA), Weighted (WMA), Volume-weighted (VWMA), Smoothed (SMMA), Double Exponential (DEMA), Triple Exponential (TEMA), Hull (HMA), Zero Lag Exponential (ZEMA), Triangular (TMA), and SuperSmoother (SSMA) filter.

The strategy allows configuring two moving averages - a faster one and a slower one, both selected from the 11 options. Long signals are generated when the faster MA crosses above the slower MA. Short signals occur when the faster MA crosses below the slower MA.

Additional features include pyramiding settings, take profit and stop loss levels.

## Strategy Logic

The core strategy logic relies on crossovers between two moving averages to determine entries and exits.

The entry conditions are:

Long entry: Fast MA > Slow MA 
Short entry: Fast MA < Slow MA

Exits are determined by one of three criteria:

1. Take profit level reached
2. Stop loss level reached 
3. Opposite signal generated (MA crossover in opposite direction)

The strategy allows configuring key parameters like the MA type and length, pyramiding settings, take profit and stop loss percentages. This provides flexibility to optimize the strategy for different market conditions and risk preferences.

## Advantages

- Combines 11 different MA types for robust signals
- Flexible configuration of key parameters 
- Take profit and stop loss features protect profits and limit losses
- Pyramiding allows increased position size for strong trends

## Risks

- As with any technical indicator, MA crossovers can generate false signals
- Overoptimization for current market conditions may degrade future performance
- Hard stop loss exits can lead to exiting good trades early in volatile markets

Risk management can be enhanced by using price action confirmation for entry signals, using trailing stops instead of hard stops, and avoiding overoptimization.

## Enhancement Opportunities

There are several ways in which this strategy can be improved:

1. Incorporate additional filters before entry, such as volume and price action checks
2. Test performance of different MA types systematically and select optimal 1 or 2
3. Optimize MA lengths specifically for trading instrument and time frame
4. Employ trailing stops instead of hard stops
5. Add profit taking at incremental levels as trend extends

## Conclusion

The eleven moving averages crossover strategy provides a systematic approach to trading crossovers. By combining signals across multiple MA indicators and allowing configuration of key parameters, it provides a robust yet flexible trading framework. Fine-tuning and risk management will play key roles in optimizing performance. The strategy has strong potential for momentum-based trading but should be adapted for different market environments.

||

## 概述

该策略组合使用了11种不同类型的移动平均线的交叉来进行做多和做空。使用的11种移动平均线包括:简单移动平均线(SMA)、指数移动平均线(EMA)、加权移动平均线(WMA)、成交量加权移动平均线(VWMA)、平滑移动平均线(SMMA)、双指数移动平均线(DEMA)、三次指数移动平均线(TEMA)、赫尔移动平均线(HMA)、零滞后指数移动平均线(ZEMA)、三角移动平均线(TMA)和超平滑过滤器(SSMA)。

该策略允许配置两个移动平均线——一个较快的和一个较慢的,都从11种选择中选择。当较快的MA交叉超过较慢的MA时,会生成做多信号。当较快的MA交叉低于较慢的MA时,会生成做空信号。

附加功能包括梯形设置、止盈和止损水平。

## 策略逻辑

核心策略逻辑依赖于两个移动平均线之间的交叉来确定进入和退出。  

进入条件是:  

做多入场:快速MA > 慢速MA  
做空入場:快速MA < 慢速MA

退出由以下三个标准中的一个确定:  

1. 止盈水平达到  
2. 止损水平达到   
3. 生成相反信号(移动平均线以相反方向交叉)

该策略允许配置关键参数,如MA类型和长度、梯形设置、止盈和止损百分比。这为根据不同的市场条件和风险偏好优化策略提供了灵活性。

## 优势  

- 结合11种不同的MA类型以产生强大信号  
- 主要参数配置灵活    
- 止盈和止损功能保护利润、限制损失
- 梯形允许强势趋势中增加仓位  

## 风险  

- 和任何技术指标一样,MA交叉可能会生成错误信号  
- 过度优化当前市场条件可能降低未来表现  
- 硬止损过早退出了波动大的正确交易  

可以通过为入场信号使用价位确认、使用追踪止损而不是硬止损以及避免过度优化来加强风险管理。

## 优化空间  

可以通过几种方式改进该策略:  

1. 在入场前加入额外过滤器,如成交量和价位检查  
2. 系统地测试不同MA类型的表现,选择最佳的1-2种    
3. 针对特定交易品种和时间段优化MA长度   
4. 使用追踪止损替代硬止损     
5. 随着趋势加长添加分阶段止盈    

## 总结  

十一条移动平均线交叉策略提供了一种系统化交易交叉的方法。通过结合跨多种MA指标的信号并允许配置关键参数,它提供了一个强大且灵活的交易框架。优化和风险管理将发挥关键作用,以优化表现。该策略在动量交易中具有很强的潜力,但应根据不同的市场环境进行调整。

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|MA Type: : ZEMA|EMA|WMA|VWMA|SMMA|DEMA|TEMA|HullMA|SMA|TMA|SSMA|
|v_input_2|8|Fast MA Length|
|v_input_3_close|0|Fast MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|21|Slow MA Length|
|v_input_5_close|0|Slow MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|true|Pyramiding|
|v_input_7|false|Take Profit Long|
|v_input_8|false|Take Profit Short|
|v_input_9|3|Take Profit Long %|
|v_input_10|30|Take Profit Short %|
|v_input_11|false|Stop Loss Long|
|v_input_12|false|Stop Loss Short|
|v_input_13|3|Stop Loss %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-15 00:00:00
end: 2024-01-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

strategy(title = "[STRATEGY] MA Cross Eleven", overlay = true)

// MA - type, source, length

//  MA - type, source, length
//  SMA --> Simple
//  EMA --> Exponential
//  WMA --> Weighted
//  VWMA --> Volume Weighted
//  SMMA --> Smoothed
//  DEMA --> Double Exponential
//  TEMA --> Triple Exponential
//  HMA --> Hull
//  TMA --> Triangular
//  SSMA --> SuperSmoother filter
//  ZEMA --> Zero Lag Exponential

type = input(defval="ZEMA", title="MA Type: ", options=["SMA", "EMA", "WMA", "VWMA", "SMMA", "DEMA", "TEMA", "HullMA", "ZEMA", "TMA", "SSMA"])
len1 = input(defval=8, title="Fast MA Length", minval=1)
srcclose1 = input(close, "Fast MA Source")
len2 = input(defval=21, title="Slow MA Length", minval=1)
srcclose2 = input(close, "Slow MA Source")

// Returns MA input selection variant, default to SMA if blank or typo.

variant(type, src, len) =>
    v1 = sma(src, len)                                                  // Simple
    v2 = ema(src, len)                                                  // Exponential
    v3 = wma(src, len)                                                  // Weighted
    v4 = vwma(src, len)                                                 // Volume Weighted
    v5 = 0.0
    v5 := na(v5[1]) ? sma(src, len) : (v5[1] * (len - 1) + src) / len    // Smoothed
    v6 = 2 * v2 - ema(v2, len)                                          // Double Exponential
    v7 = 3 * (v2 - ema(v2, len)) + ema(ema(v2, len), len)               // Triple Exponential
    v8 = wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len)))   // Hull
    v11 = sma(sma(src,len),len)                                         // Triangular
    // SuperSmoother filter
    // © 2013  John F. Ehlers
    a1 = exp(-1.414*3.14159 / len)
    b1 = 2*a1*cos(1.414*3.14159 / len)
    c2 = b1
    c3 = (-a1)*a1
    c1 = 1 - c2 - c3
    v9 = 0.0
    v9 := c1*(src + nz(src[1])) / 2 + c2*nz(v9[1]) + c3*nz(v9[2])
    // Zero Lag Exponential
    e = ema(v2, len)
    v10 = v2+(v2-e)
    // return variant, defaults to SMA if input invalid.
    type=="EMA"?v2 : type=="WMA"?v3 : type=="VWMA"?v4 : type=="SMMA"?v5 : type=="DEMA"?v6 : type=="TEMA"?v7 : type=="HullMA"?v8 : type=="SSMA"?v9 : type=="ZEMA"?v10 : type=="TMA"? v11: v1

ma_1 = variant(type, srcclose1, len1)
ma_2 = variant(type, srcclose2, len2)

plot(ma_1, title="Fast MA", color = green, linewidth=2, transp=0)
plot(ma_2, title="Slow MA", color = red, linewidth=2, transp=0)

longCond = na
shortCond = na
longCond := crossover(ma_1, ma_2)
shortCond := crossunder(ma_1, ma_2)

// Count your long short conditions for more control with Pyramiding

sectionLongs = 0
sectionLongs := nz(sectionLongs[1])
sectionShorts = 0
sectionShorts := nz(sectionShorts[1])

if longCond
    sectionLongs := sectionLongs + 1
    sectionShorts := 0

if shortCond
    sectionLongs := 0
    sectionShorts := sectionShorts + 1
    
// Pyramiding Inputs

pyrl = input(1, "Pyramiding")

// These check to see your signal and cross references it against the pyramiding settings above

longCondition = longCond and sectionLongs <= pyrl 
shortCondition = shortCond and sectionShorts <= pyrl 

// Get the price of the last opened long or short

last_open_longCondition = na
last_open_shortCondition = na
last_open_longCondition := longCondition ? high[1] : nz(last_open_longCondition[1])
last_open_shortCondition := shortCondition ? low[1] : nz(last_open_shortCondition[1])

// Check if your last postion was a long or a short

last_longCondition = na
last_shortCondition = na
last_longCondition := longCondition ? time : nz(last_longCondition[1])
last_shortCondition := shortCondition ? time : nz(last_shortCondition[1])

in_longCondition = last_longCondition > last_shortCondition
in_shortCondition = last_shortCondition > last_longCondition

// Take profit

isTPl = input(false, "Take Profit Long")
isTPs = input(false, "Take Profit Short")
tpl = input(3, "Take Profit Long %", type=float)
tps = input(30, "Take Profit Short %", type=float)
long_tp = isTPl and crossover(high, (1+(tpl/100))*last_open_longCondition) and in_longCondition  == 1
short_tp = isTPs and crossunder(low, (1-(tps/100))*last_open_shortCondition) and in_shortCondition == 1 

// Stop Loss

isSLl = input(false, "Stop Loss Long")
isSLs = input(false, "Stop Loss Short")
sl= 0.0
sl := input(3, "Stop Loss %", type=float)
long_sl = isSLl and crossunder(low, (1-(sl/100))*last_open_longCondition) and longCondition == 0 and in_longCondition == 1
short_sl = isSLs and crossover(high, (1+(sl/100))*last_open_shortCondition) and shortCondition == 0 and in_shortCondition == 1

// Create a single close for all the different closing conditions.

long_close = long_tp or long_sl ? 1 : 0
short_close = short_tp or short_sl ? 1 : 0

// Get the time of the last close

last_long_close = na
last_short_close = na
last_long_close := long_close ? time : nz(last_long_close[1])
last_short_close := short_close ? time : nz(last_short_close[1])

// Strategy entries

strategy.entry("long", strategy.long, when=longCondition == true, stop = open[1])
strategy.entry("short", strategy.short, when=shortCondition == true)
strategy.close("long", when = long_sl or long_tp)
strategy.close("short", when = short_sl or short_tp)
```

> Detail

https://www.fmz.com/strategy/438791

> Last Modified

2024-01-15 13:57:53
