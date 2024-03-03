
> Name

双均线价格突破与多空力量平衡组合策略Dual-Moving-Average-Crossover-and-Bull-Bear-Power-Balance-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b045e4b81279b20a43.png)
[trans] 

## 概述

本策略首先利用2期和20期的指数移动平均线构建双均线指标,判断价格是否突破均线,作为进入场内的基本判断。同时,辅助判断指标“多空力量平衡指标”进一步识别多头和空头的相对力量,过滤误操作。两种指标综合判断形成最终交易信号。

## 策略原理  

1. 2/20均线指标
    - 计算2期和20期的指数移动平均线(EMA)
    - 当收盘价从均线一侧突破到另一侧时,发出交易信号
    - 突破20均线为确定趋势的信号
    - 突破2均线为确定具体入场点位的信号

2. 多空力量平衡指标
    - 分别计算多头力量值和空头力量值
    - 比较两者大小得出多空力量相对强弱
    - 强势方向作为进场的辅助判断

3. 两个指标综合判断
    - 双均线指标判断大趋势方向
    - 多空力量平衡指标进行局部区域判断
    - 两者判断结果一致时,发出交易信号

## 优势分析

这种组合策略最大的优势在于结合不同品种的指标,实现更可靠的交易判断。具体来说有以下几个方面的优势:

1. 利用双均线判断大方向,避免被局部浮动骗局
2. 借助多空力量平衡指标进行局部区域判断,精确掌握具体入场点位
3. 两种指标互相验证,可以过滤掉一定的误操作情况,降低交易风险
4. 参数设置灵活,可针对不同市场品种进行优化
5. 策略思路简单清晰,容易理解,便于后期优化

## 风险分析

本策略也存在一些风险需要注意:

1. 指标发出信号的滞后性可能导致止损点过深
2. 双均线指标对参数设置比较敏感
3. 多空平衡指标对短期行情判断准确性稍差  
4. 在特殊行情下(常见突破假信号),两种指标可能出现判断偏差

对策:

1. 适当缩短持仓周期,或设置适当的移动止损
2. 测试不同参数组合,找到最优参数
3. 辅助参考其他指标进行确认
4. 根据品种特点优化参数

## 优化方向  

本策略后续可从以下几个方面进行优化:

1. 测试更多的均线指标参数组合
2. 增加止损策略,控制单笔止损
3. 结合波动率指标,提高参数自适应能力 
4. 增加机器学习模型,实现动态参数优化
5. 尝试不同的顺势指标替换多空平衡指标
6. 开发可视化界面,便于用户测试不同参数

## 总结

本策略通过双均线指标判断大趋势,并用多空力量平衡指标辅助判断入场时机。两种指标互为验证,可以有效降低误操作概率。策略参数选择灵活,可针对不同品种进行优化调整。整体来说,策略较为简单实用,值得广大投资者学习和使用。后续通过进一步优化,可以使策略效果进一步提升。

||

## Overview

This strategy first uses the dual moving average lines of 2-period and 20-period EMA to determine if price breaks through the moving averages, as a basic criterion for entering the market. At the same time, the auxiliary indicator "Bull Bear Power Balance Indicator" further identifies the relative power between bulls and bears to avoid mis-operations. The two types of indicators jointly generate the final trading signal.

## Strategy Principle

1. Dual Moving Average Indicator 
    - Calculate 2-period and 20-period Exponential Moving Average (EMA) 
    - Generate trading signals when closing price breaks through from one side of the moving averages to the other
    - Breaking through 20-EMA determines the trend direction  
    - Breaking through 2-EMA determines specific entry point

2. Bull Bear Power Balance Indicator
    - Separately calculate bull power value and bear power value
    - Compare the two values to determine relative strength between bulls and bears
    - The stronger direction serves as an auxiliary judgment for entry

3. Combined judgment of the two indicators
    - Dual moving average indicator judges major trend direction 
    - Bull bear power balance indicator makes local regional judgment
    - Issue trading signals when both indicators give consistent judgment

## Advantage Analysis

The biggest advantage of this combination strategy is to integrate indicators of different varieties to achieve more reliable trading judgment. Specifically, it has the following advantages:

1. Using dual moving average to determine major direction, avoid being deceived by local fluctuations
2. Use the bull bear power balance indicator for local regional judgment to accurately grasp specific entry point  
3. Two types of indicators verify each other and can filter out some mis-operations to reduce trading risks
4. Flexible parameter settings that can be optimized for different market varieties  
5. The strategy idea is simple and clear, easy to understand, and easy to optimize later

## Risk Analysis  

Some risks of this strategy need to be noted:

1. The lag of indicator signals may lead to over deep stop loss points
2. Dual moving average indicator is sensitive to parameter settings  
3. Bull bear balance indicator has slightly lower accuracy in judging short-term trends
4. Judgment deviation may occur for both indicators under special market conditions (common false breakout signals)

Countermeasures:

1. Appropriately shorten holding period or set appropriate moving stop loss
2. Test different parameter combinations to find optimal parameters  
3. Refer to other indicators for confirmation
4. Optimize parameters based on characteristics of different varieties

## Optimization Directions   

The strategy can be further optimized in the following aspects:

1. Test more moving average indicator parameter combinations
2. Increase stop loss strategies to control single stop loss
3. Incorporate volatility indicators to improve parameter self-adaptability  
4. Add machine learning models to achieve dynamic parameter optimization
5. Try different trend-following indicators to replace bull bear power balance
6. Develop visual interfaces for easy user testing of different parameters  

## Conclusion  

This strategy judges the major trend through dual moving average indicator and uses bull bear power balance indicator to assist in determining entry timing. The two indicators verify each other and can effectively reduce the probability of mis-operations. The strategy parameters are flexible and can be optimized for different varieties. Overall, the strategy is simple and practical, worth learning and using by most investors. Subsequent optimizations can further improve strategy performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|(?●═════ 2/20 EMA ═════●)Length|
|v_input_float_1|-15|(?●═════  Bull And Bear Balance ═════●)SellLevel|
|v_input_float_2|15|BuyLevel|
|v_input_bool_1|false|(?●═════ MISC ═════●)Trade reverse|
|v_input_int_2|true|(?●═════ Time Start ═════●)From Day|
|v_input_int_3|true|From Month|
|v_input_int_4|2005|From Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2024-01-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 23/05/2022
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This indicator plots 2/20 exponential moving average. For the Mov 
// Avg X 2/20 Indicator, the EMA bar will be painted when the Alert criteria is met.
//
// Second strategy
//    This new indicator analyzes the balance between bullish and
//    bearish sentiment.
//    One can cay that it is an improved analogue of Elder Ray indicator.
//    To get more information please see "Bull And Bear Balance Indicator" 
//    by Vadim Gimelfarb. 
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
EMA20(Length) =>
    pos = 0.0
    xPrice = close
    xXA = ta.ema(xPrice, Length)
    nHH = math.max(high, high[1])
    nLL = math.min(low, low[1])
    nXS = nLL > xXA or nHH < xXA ? nLL : nHH
    iff_1 = nXS < close[1] ? 1 : nz(pos[1], 0)
    pos := nXS > close[1] ? -1 : iff_1
    pos


BBB(SellLevel,BuyLevel) =>
    pos = 0.0
    value = close < open ? 
              close[1] > open ?  math.max(close - open, high - low) : high - low : 
                 close > open ? 
                  close[1] > open ? math.max(close[1] - low, high - close) : math.max(open - low, high - close) :
                   high - close > close - low ? 
                     close[1] > open ? math.max(close[1] - open, high - low) :high - low : 
                      high - close < close - low ? 
                         close > open ? math.max(close - low, high - close) : open - low : 
                           close > open ? math.max(close[1] - open , high - close) :
                             close[1] < open ? math.max(open - low, high - close) : high - low
    
    value2 =close < open ? 
              close[1] < open ?  math.max(high - close[1], close - low) : math.max(high - open, close - low) : 
               close > open ? 
                 close[1] > open ?  high - low : math.max(open - close[1], high - low) : 
                  high - close > close - low ? 
                   close[1] < open ? math.max(high - close[1], close - low) : high - open : 
                     high - close < close - low ? 
                      close[1] > open ?  high - low : math.max(open - close, high - low) : 
                       close[1] > open ? math.max(high - open, close - low) :
                         close[1] < open? math.max(open - close, high - low): high - low
    nBBB = value2 - value
    pos :=  nBBB < SellLevel ? -1 :
    	     nBBB >= BuyLevel ? 1 : nz(pos[1], 0) 
    pos

strategy(title='Combo 2/20 EMA & Bull And Bear Balance', shorttitle='Combo', overlay=true)
var I1 = '●═════ 2/20 EMA ═════●'
Length = input.int(14, minval=1, group=I1)
var I2 = '●═════  Bull And Bear Balance ═════●'
SellLevel = input.float(-15, step=0.01, group=I2)
BuyLevel = input.float(15, step=0.01, group=I2)
var misc = '●═════ MISC ═════●'
reverse = input.bool(false, title='Trade reverse', group=misc)
var timePeriodHeader = '●═════ Time Start ═════●'
d = input.int(1, title='From Day', minval=1, maxval=31, group=timePeriodHeader)
m = input.int(1, title='From Month', minval=1, maxval=12, group=timePeriodHeader)
y = input.int(2005, title='From Year', minval=0, group=timePeriodHeader)
StartTrade = time > timestamp(y, m, d, 00, 00) ? true : false
posEMA20 = EMA20(Length)
prePosBBB = BBB(SellLevel,BuyLevel)
iff_1 = posEMA20 == -1 and prePosBBB == -1 and StartTrade ? -1 : 0
pos = posEMA20 == 1 and prePosBBB == 1 and StartTrade ? 1 : iff_1
iff_2 = reverse and pos == -1 ? 1 : pos
possig = reverse and pos == 1 ? -1 : iff_2
if possig == 1
    strategy.entry('Long', strategy.long)
if possig == -1
    strategy.entry('Short', strategy.short)
if possig == 0
    strategy.close_all()
barcolor(possig == -1 ? #b50404 : possig == 1 ? #079605 : #0536b3)
```

> Detail

https://www.fmz.com/strategy/438067

> Last Modified

2024-01-08 17:09:48
