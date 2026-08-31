
> Name

Compound-Stop-Loss-and-Take-Profit-Strategy-Based-on-Random-Entry

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/93469038a6408a5e25.png)


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
