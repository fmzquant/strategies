
> Name

基于随机入场的复合止损止盈策略Compound-Stop-Loss-and-Take-Profit-Strategy-Based-on-Random-Entry

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/93469038a6408a5e25.png)

[trans]
## 概述

本策略的主要思想是通过随机数来决定入场点,设置了三个止盈点和一个止损点来管理风险,以控制每次交易的盈亏。

## 策略原理  

该策略使用随机数rd_number_entry在11到13之间来决定做多入场点,使用rd_number_exit在20到22之间来决定平仓。做多后设置stop loss为入场价减去atr(14)* slx。同时设置了三个止盈点,第一个止盈点为入场价加上atr(14)* tpx,第二个止盈点为入场价加上2* tpx,第三个止盈点为入场价加上3* tpx。做空的原理类似,区别在于入场决定在rd_number_entry取值不同,止盈止损方向相反。

该策略可以通过调整tpx(止盈系数)和slx(止损系数)来控制风险。

## 优势分析  

该策略具有以下优势:

1. 使用随机入场可以减少曲拟合的概率
2. 设置多个止盈止损点,可以控制单笔交易的风险
3. 利用atr来设置止盈止损,可以基于市场波动来设置盈亏点
4. 可以通过调整系数来控制交易风险

## 风险分析

该策略也存在以下风险:  

1. 随机入场可能错过行情
2. 止损点过小容易被止损
3. 止盈空间过大,可能获利不足
4. 参数不当可能导致亏损加大

可以通过调整止盈止损系数,优化随机入场逻辑来降低风险。

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 改进随机入场逻辑,结合趋势指标判断
2. 优化止盈止损系数,使盈亏比更合理
3. 增加仓位控制,不同阶段采用不同的止盈空间
4. 结合机器学习算法优化参数

## 总结  

本策略以随机入场为基础,设置多个止盈止损点控制单笔交易风险,由于随机性强可以减少曲拟合概率,通过参数优化可以降低交易风险。后续优化空间还很大,值得进一步研究。

||

## Overview  

The main idea of this strategy is to determine the entry point randomly and set three take profit points and one stop loss point to manage risks and control the profit and loss of each trade.

## Strategy Logic

This strategy uses the random number rd_number_entry between 11 and 13 to determine the long entry point, and uses rd_number_exit between 20 and 22 to determine the closing of positions. After going long, the stop loss is set to the entry price minus atr(14)*slx. At the same time, three take profit points are set. The first take profit point is the entry price plus atr(14)*tpx, the second take profit point is the entry price plus 2*tpx, and the third take profit point is the entry price plus 3*tpx. The principle of going short is similar, except that the entry decision takes different rd_number_entry values, and the direction of take profit and stop loss is opposite.

The risk can be controlled by adjusting tpx (take profit coefficient) and slx (stop loss coefficient).


## Advantage Analysis   

The advantages of this strategy include:

1. The use of random entry can reduce the probability of curve fitting  
2. Setting multiple stop loss and take profit points can control the risk of a single trade
3. Using atr to set take profit and stop loss allows it to be based on market volatility   
4. The trading risk can be controlled by adjusting the coefficients

## Risk Analysis

The risks of this strategy also include:

1. Random entry may miss trends  
2. If the stop loss is too small, it may be stopped out easily
3. If the profit taking space is too large, the profit may be insufficient  
4. Inappropriate parameters can lead to greater losses

The risks can be reduced by adjusting the take profit and stop loss coefficients and optimizing the random entry logic.  

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Improve the random entry logic and incorporate trend indicator judgments  
2. Optimize the take profit and stop loss coefficients to make the profit ratio more reasonable
3. Increase position control to use different profit taking spaces at different stages  
4. Optimize parameters with machine learning algorithms


## Conclusion   

This strategy is based on random entry and sets multiple take profit and stop loss points to control the risk of a single trade. Due to the high randomness, the probability of curve fitting can be reduced. The trading risk can be reduced through parameter optimization. There is still much room for further optimization and research.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.8|Atr multiplication for TPs?|
|v_input_2|1.2|Atr multiplication for SL?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Random Strategy with 3 TP levels and SL", overlay=true,max_bars_back = 50)

tpx = input(defval = 0.8, title = 'Atr multiplication for TPs?')
slx = input(defval = 1.2, title = 'Atr multiplication for SL?')
isLong = false
isLong := nz(isLong[1])

isShort = false
isShort := nz(isShort[1])

entryPrice = 0.0
entryPrice := nz(entryPrice[1])
tp1 = true
tp1 := nz(tp1[1])
tp2 = true
tp2 := nz(tp2[1])

sl_price = 3213.0
sl_price := nz(sl_price[1])

sl_atr = atr(14)*slx
tp_atr = atr(14)*tpx

rd_number_entry = 1.0
rd_number_entry := (16708 * nz(rd_number_entry[1], 1) % 2147483647)%17

rd_number_exit = 1.0
rd_number_exit := ((16708 * time % 2147483647) %17)


//plot(rd_number_entry)

shortCondition = (rd_number_entry == 13? true:false) and (year >= 2017) and not isLong and not isShort
longCondition = (rd_number_entry == 11 ? true:false) and (year >= 2017) and not isShort and not isShort
//Never exits a trade:
exitLong = (rd_number_exit == 22?true:false) and (year >= 2018) and not isShort
exitShort = (rd_number_exit ==  22?true:false) and (year >= 2018) and not isLong


//shortCondition = crossunder(sma(close, 14), sma(close, 28)) and year >= 2017
//longCondition = crossover(sma(close, 14), sma(close, 28)) and year >= 2017

//exitLong = crossunder(ema(close, 14), ema(close, 28)) and year >= 2017
//exitShort = crossover(ema(close, 14), ema(close, 28)) and year >= 2017

if (longCondition and not isLong)
    strategy.entry('Long1', strategy.long)
    strategy.entry('Long2', strategy.long)
    strategy.entry('Long3', strategy.long)
    isLong := true
    entryPrice := close
    isShort := false
    tp1 := false
    tp2 := false
    sl_price := close-sl_atr

if (shortCondition and not isShort)
    strategy.entry('Short1', strategy.short)
    strategy.entry('Short2', strategy.short)
    strategy.entry('Short3', strategy.short)
    isShort := true
    entryPrice := close
    isLong := false
    tp1 := false
    tp2 := false
    sl_price := close+sl_atr
    
if (exitShort and isShort)
    strategy.close('Short1')
    strategy.close('Short2')
    strategy.close('Short3')
    isShort :=  false

if (exitLong and isLong)
    strategy.close('Long1')
    strategy.close('Long2')
    strategy.close('Long3')
    isLong :=  false

if isLong
    if (close > entryPrice + tp_atr) and not tp1
        strategy.close('Long1')
        tp1 := true
        sl_price := close - tp_atr
    if (close > entryPrice + 2*tp_atr) and not tp2
        strategy.close('Long2')
        tp2 := true
        sl_price := close - tp_atr
    if (close > entryPrice + 3*tp_atr)
        strategy.close('Long3')
        isLong := false
    if (close < sl_price)
        strategy.close('Long1')
        strategy.close('Long2')
        strategy.close('Long3')
        isLong := false

if isShort
    if (close < entryPrice - tp_atr) and not tp1
        strategy.close('Short1')
        sl_price := close + tp_atr
        tp1 := true
    if (close < entryPrice - 2*tp_atr) and not tp2
        strategy.close('Short2')
        sl_price := close + tp_atr
        tp2 := true
    if (close < entryPrice - 3*tp_atr)
        strategy.close('Short3')
        isShort := false
    if (close > sl_price)
        strategy.close('Short1')
        strategy.close('Short2')
        strategy.close('Short3')
        isShort := false
plot(atr(14)*slx)
plot(sl_price)
```

> Detail

https://www.fmz.com/strategy/439881

> Last Modified

2024-01-24 15:38:49
