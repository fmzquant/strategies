
> Name

基于多指标的趋势跟踪策略Trend-Following-Strategy-Based-on-Multiple-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/df12763e68b425eca5.png)
 [trans]

## 概述

该策略通过结合多个指标来识别趋势,并设定趋势追踪止损来锁定利润。主要使用布林带、RSI、ADX等指标判断入场时机,以及ATR和布林带进行止损。

## 策略原理

策略主要判断指标为布林带、RSI和ADX。当价格接近布林带下轨且RSI低于30时判断为超卖,做多;当价格接近布林带上轨且RSI高于70时判断为超买,做空。此外,如果ADX高于25则判断趋势形成,这时做多做空信号更有效。

在开仓后,策略使用ATR指标和布林带上下轨来进行止损。具体来说,ATR用于最大止损幅度,当价格触及最大止损点则止损;布林带上下轨用于设置追踪止损点,根据价格运行情况实时更新追踪止损价格。

## 优势分析

该策略结合多指标判断,能有效识别趋势;并使用止损机制来锁定利润,降低亏损风险,属于比较稳健的策略。具体优势如下:

1. 使用布林带判断超买超卖情况,可判断反转机会
2. 结合RSI指标可以增加判断准确度  
3. ADX指标判断趋势形成,确保交易方向正确  
4. ATR和布林带追踪止损,可以最大程度锁定利润

## 风险分析

该策略也存在一些风险:

1. 多指标判断,参数设置易过优化
2. 布林带区间较宽时,超买超卖信号效果差
3. 止损追踪不当可导致亏损扩大

针对这些风险,我们可以采取以下措施:

1. 多组合参数优化,防止过优化
2. 根据市场波动情况调整布林带参数
3. 测试止损距离参数,确保可以承受正常波动

## 优化方向

该策略还可以从以下几个方向进行优化:  

1. 增加仓位控制,根据止损乘数调整仓位规模
2. 增加money management模块,严格控制单笔止损额度
3. 测试其他止损指标,如DMI、Envelop等
4. 增加机器学习模型判断趋势概率,提高效果

## 总结

该策略整体来说是一个相对稳健的趋势追踪策略。通过多指标判断确定趋势方向,并采用止损措施控制风险,可以获得比较好的收益回报率。我们也提出了几个可以优化的方向,若进一步优化可以获得更好的效果。

||

## Overview  

This strategy identifies trends by combining multiple indicators and sets trend tracking stop loss to lock in profits. It mainly uses Bollinger Bands, RSI, ADX and other indicators to determine entry timing, and uses ATR and Bollinger Bands for stop loss.

## Strategy Principle  

The main judgment indicators of the strategy are Bollinger Bands, RSI and ADX. When the price approaches the lower rail of the Bollinger Bands and the RSI is below 30, it is judged as oversold and long position is taken; when the price approaches the upper rail of the Bollinger Bands and the RSI is above 70, it is judged as overbought and short position is taken. In addition, if the ADX is above 25, it means that a trend has formed, which makes the long and short signals more effective.  

After opening positions, the strategy uses ATR indicator and Bollinger Bands rails to set stop loss. Specifically, the ATR sets the maximum stop loss range. When the price reaches the maximum stop loss point, close the position; the Bollinger Bands rails set trailing stop loss points which update according to price movement.   

## Advantage Analysis

The strategy combines multiple indicators for judgement and uses stop loss mechanism to lock in profits and reduce risk. The main advantages are as follows:

1. Using Bollinger Bands to judge overbought and oversold situations for reversal opportunities  
2. Combining with RSI indicator increases judgment accuracy
3. ADX indicator determines trend formation to ensure correct trade direction  
4. ATR and Bollinger Bands trailing stop loss can maximize profit locking  

## Risk Analysis  

There are also some risks for this strategy:  

1. Multiple indicators judgment leads to high chance of over-optimization  
2. Signals are less effective when Bollinger Bands range is too wide
3. Improper stop loss trailing may lead to expanded losses  

To address these risks, we can take the following measures:  

1. Multi-parameter optimization to prevent over-optimization  
2. Adjust Bollinger Bands parameters based on market volatility  
3. Test stop loss distance parameters to endure normal fluctuations  

## Optimization Directions

The strategy can also be optimized in the following aspects:

1. Add position sizing to adjust position scale based on stop loss multiplier  
2. Add money management module to strictly control single stop loss amount  
3. Test other stop loss indicators like DMI, Envelop etc  
4. Add machine learning models to determine trend probability and improve performance  

## Summary  

In summary, this is a relatively robust trend following strategy. By determining trend direction through multiple indicators and controlling risks through stop loss measures, it can achieve good return on investment. We have also proposed several aspects that the strategy can optimize. Further optimizations may lead to even better results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|main strat profit|
|v_input_2|true|Shorts on/off|
|v_input_3|false|Flipping on/off -> Go directly from long -> short or short -> long without closing |
|v_input_4|false|Stoploss on/off|
|v_input_5|30|Stoploss %|
|v_input_6|true|Trailing on/off|
|v_input_7|true|Trailing use ATR on/off|
|v_input_8|true|Multiplier for ATR|
|v_input_9|10|Trailing %|
|v_input_10|false|backtest date on/off|
|v_input_11|2018|Backtest Start Year|
|v_input_12|true|Backtest Start Month|
|v_input_13|true|Backtest Start Day|
|v_input_14|2019|Backtest Stop Year|
|v_input_15|true|Backtest Stop Month|
|v_input_16|true|Backtest Stop Day|
|v_input_17|true|Color Background?|
|v_input_18|20|ATR Length|
|v_input_19|false|1 for added ATR when selling|
|v_input_20|20|OC2 Length|
|v_input_21|false|1 for added OC2 when selling|
|v_input_22|true|OC2 multiplayer|
|v_input_23|10|DI Length|
|v_input_24|10|ADX Smoothing|
|v_input_25|3|smoothKRSI|
|v_input_26|3|smoothDRSI|
|v_input_27|14|lengthRSI|
|v_input_28|14|lengthStochRSI|
|v_input_29_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_30|30|RSI Buy Value|
|v_input_31|70|RSI Sell Value|
|v_input_32|20|lengthbb|
|v_input_33_close|0|Sourcebb: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_34|2|multbb|
|v_input_35|0.5|BB Buy Value|
|v_input_36|0.5|BB Sell Value|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// THIS SCRIPT IS MEANT TO ACCOMPANY COMMAND EXECUTION BOTS
// THE INCLUDED STRATEGY IS NOT MEANT FOR LIVE TRADING
// THIS STRATEGY IS PURELY AN EXAMLE TO START EXPERIMENTATING WITH YOUR OWN IDEAS
/////////////////////////////////////////////////////////////////////////////////

// comment out the next line to use this script as an alert script
strategy(title="Dragon Bot - Default Script", overlay=true)
// remove the // in the next line to use this script as an alert script
// study(title="Dragon Bot - Default Script", overlay=true)

// Dragon-Bot default script version 2.0
// This can also be used with bot that reacts to tradingview alerts.
// Use the script as "strategy" for backtesting
// Comment out line 8 and de-comment line 10 to be able to set tradingview alerts.
// You should also comment out (place // before it) the lines 360, 364, 368 and 372 (strategy.entry and strategy.close) to be able to set the alerts.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// In this first part of the script we setup variables and make sure the script keeps all information it used in the past. //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
longs = 0
longs := nz(longs[1])

shorts = 0
shorts := nz(shorts[1])

buyprice = 0.0
buyprice := buyprice[1]

sellprice = 0.0
sellprice := sellprice[1]

scaler = 0.0
scaler := scaler[1]

sellprofit = input(1.0, minval=0.0, step=0.1, title="main strat profit")
sellproffinal = sellprofit/100

enable_shorts = input(1, minval=0, maxval=1, title="Shorts on/off")

enable_flipping = input(0, minval=0, maxval=1, title="Flipping on/off -> Go directly from long -> short or short -> long without closing ")

enable_stoploss = input(0, minval=0, maxval=1, title="Stoploss on/off")
sellstoploss = input(30.0, minval=0.0, step=1.0, title="Stoploss %")
sellstoplossfinal = sellstoploss/100

enable_trailing = input(1, minval=0, maxval=1, title="Trailing on/off")
enable_trailing_ATR = input(1, minval=0, maxval=1, title="Trailing use ATR on/off")
ATR_Multi = input(1.0, minval=0.0, step=0.1, title="Multiplier for ATR")
selltrailing = input(10.0, minval=0.0, step=1.0, title="Trailing %")
selltrailingfinal = selltrailing/100

Backtestdate = input(0, minval=0, maxval=1, title="backtest date on/off")

// Component Code by pbergden - Start backtest dates
// The following code snippet is taken from an example by pbergen
// All rights to this snippet remain with pbergden
testStartYear = input(2018, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(1, "Backtest Stop Month")
testStopDay = input(1, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=97)

testPeriod() => true

/////////////////////////////////////////////////////////////////////////////////////////////////////
// In this second part of the script we setup indicators that we can use for our actual algorithm. //
/////////////////////////////////////////////////////////////////////////////////////////////////////


//ATR
lengthtr = input(20, minval=1, title="ATR Length")
ATRsell = input(0, minval=0, title="1 for added ATR when selling")
ATR=rma(tr(true), lengthtr)
Trail_ATR=rma(tr(true), 10) * ATR_Multi
atr = 0.0
if ATRsell == 1
    atr := ATR

//OC2
lengthoc2 = input(20, minval=1, title="OC2 Length")
OC2sell = input(0, minval=0, title="1 for added OC2 when selling")
OC2mult = input(1, minval=1, title="OC2 multiplayer")
OC= abs(open[1]-close)
OC2=rma(OC, lengthoc2)
oc2 = 0.0
if OC2sell == 1
    oc2 := OC2*OC2mult

//ADX
lenadx = input(10, minval=1, title="DI Length")
lensig = input(10, title="ADX Smoothing", minval=1, maxval=50)

up = change(high)
down = -change(low)
plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
trur = rma(tr, lenadx)
plus = fixnan(100 * rma(plusDM, lenadx) / trur)
minus = fixnan(100 * rma(minusDM, lenadx) / trur)
sum = plus + minus
sigadx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), lensig)

//StochRSI
smoothKRSI = input(3, minval=1)
smoothDRSI = input(3, minval=1)
lengthRSI = input(14, minval=1)
lengthStochRSI = input(14, minval=1)
srcRSI = input(close, title="RSI Source")
buyRSI = input(30, minval=1, title="RSI Buy Value")
sellRSI = input(70, minval=1, title="RSI Sell Value")
rsi1 = rsi(srcRSI, lengthRSI)
krsi = sma(stoch(rsi1, rsi1, rsi1, lengthStochRSI), smoothKRSI)
drsi = sma(krsi, smoothDRSI)

// Bollinger bands
lengthbb = input(20, minval=1)
srcbb = input(close, title="Sourcebb")
multbb = input(2.0, minval=0.001, maxval=50)
bb_buy_value = input(0.5, step=0.1, title="BB Buy Value")
bb_sell_value = input(0.5, step=0.1, title="BB Sell Value")
basisbb = sma(srcbb, lengthbb)
devbb = multbb * stdev(srcbb, lengthbb)
upperbb = basisbb + devbb
lowerbb = basisbb - devbb
bbr = (srcbb - lowerbb)/(upperbb - lowerbb)
bbbuy = basisbb - (devbb*bb_buy_value)
bbsell = basisbb + (devbb*bb_sell_value)

//ema very short
shorter = ema(close, 2)
shorterlong = ema(close, 5)

//ema short
short = ema(close, 10)
long = ema(close, 30)

//ema long
shortday = ema(close, 110)
longday = ema(close, 360)

//ema even longer
shortlongerday = ema(close, 240)
longlongerday = ema(close, 720)

//declaring extra timeframe value
profit = request.security(syminfo.tickerid, timeframe.period, close)

        
////////////////////////////////////////////////////////////////////////
// In the 3rd part of the script we define all the entries and exits //
///////// This third part is basically the acual algorithm ////////////
///////////////////////////////////////////////////////////////////////

//Declaring function with the long entries
OPENLONG_funct() =>
    // You can add more buy entries to the script
    longentry1 = false
    longentry2 = false
    longentry3 = false
    longentry4 = false
    longentry5 = false
    makelong_funct = false
    if  close<bbbuy and krsi<buyRSI // You could for instance add "and shortday > longday"
        longentry1 := close>close[1]
        // longentry2 := ...
    // if another thing we want to buy on happens
        // longentry3 := ...
    //All the buy entries go above, this last variable is what the function puts out
    // if you add more entries, add them in the following list too
    makelong_funct := longentry1 or longentry2 or longentry3 or longentry4 or longentry5

//Declaring function wit the short entries
OPENSHORT_funct() =>
    // You can add more buy entries to the script
    shortentry1 = false
    shortentry2 = false
    shortentry3 = false
    shortentry4 = false
    shortentry5 = false
    makeshort_funct = false
    if  close>bbsell and krsi>sellRSI // You could for instance add "and shortday < longday"
        shortentry1 := close<close[1]
        // shortentry2 := ...
    // if another thing we want to buy on happens
        // shortentry3 := ...
    //All the buy entries go above, this last variable is what the function puts out
    // if you add more entries, add them in the following list too
    makeshort_funct := shortentry1 or shortentry2 or shortentry3 or shortentry4 or shortentry5
    
//Declaring function with the long exits
CLOSELONG_funct() =>
    // You can add more buy entries to the script
    longexit1 = false
    longexit2 = false
    longexit3 = false
    longexit4 = false
    longexit5 = false
    closelong_funct = false
    if  close>bbsell and krsi>sellRSI
        longexit1 := close<close[1]
        // longexit2 := ...
    // if another thing we want to close on on happens you can add them here...
    // longexit3 := ...
    //All the buy entries go above, this last variable is what the function puts out
    // if you add more exits, add them in the following list too
    closelong_funct := longexit1 or longexit2 or longexit3 or longexit4 or longexit5

//Declaring function wit the short exits
CLOSESHORT_funct() =>
    // You can add more buy entries to the script
    shortexit1 = false
    shortexit2 = false
    shortexit3 = false
    shortexit4 = false
    shortexit5 = false
    closeshort_funct = false
    if  close<bbsell and krsi<sellRSI
        shortexit1 := close>close[1]
        // shortexit2 := ...
    // if another thing we want to close on on happens you can add them here...
        // shortexit3 := ...
    //All the buy entries go above, this last variable is what the function puts out
    // if you add more exits, add them in the following list too
    closeshort_funct := shortexit1 or shortexit2 or shortexit3 or shortexit4 or shortexit5

/////////////////////////////////////////////////////////////////////////////////////
////////////// End of "entries" and "exits" definition code /////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/// In the fourth part we do the actual work, as defined in the part before this ////
////////////////////// This part does not need to be changed ////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

//OPEN LONG LOGIC
makelong = false
//buy with backtesting on specific dates
if Backtestdate > 0 and testPeriod()
    if (longs < 1 and shorts < 1) or (short > 0 and enable_flipping > 0 and enable_shorts > 0)
        makelong := OPENLONG_funct()

//buy without backtesting on specific dates
if Backtestdate < 1
    if (longs < 1 and shorts < 1) or (short > 0 and enable_flipping > 0 and enable_shorts > 0)
        makelong := OPENLONG_funct()
    
if makelong
    buyprice := close
    scaler := close
    longs := 1
    shorts := 0
    
//OPEN SHORT LOGIC
makeshort = false

//buy with backtesting on specific dates
if Backtestdate > 0 and testPeriod()
    if (shorts < 1 and longs < 1 and enable_shorts > 0) or (longs > 0 and enable_flipping > 0 and enable_shorts > 0)
        makeshort := OPENSHORT_funct()

//buy without backtesting on specific dates
if Backtestdate < 1
    if (shorts < 1 and longs < 1 and enable_shorts > 0) or (longs > 0 and enable_flipping > 0 and enable_shorts > 0)
        makeshort := OPENSHORT_funct()
    

if makeshort
    buyprice := close
    scaler := close
    shorts := 1
    longs := 0

//Calculating values for traling stop
if longs > 0 and enable_flipping < 1
    if close > scaler+Trail_ATR and enable_trailing_ATR > 0
        scaler := close
    if close > scaler * (1.0 + selltrailingfinal) and enable_trailing_ATR < 1
        scaler := close
if shorts > 0 and enable_flipping < 1
    if close < scaler-Trail_ATR and enable_trailing_ATR > 0
        scaler := close
    if close < scaler * (1.0 - selltrailingfinal) and enable_trailing_ATR < 1
        scaler := close
    
long_exit = false
long_security1 = false
long_security2 = false
long_security3 = false

//CLOSE LONG LOGIC
if longs > 0 and enable_flipping < 1
    if ( (buyprice + (buyprice*sellproffinal) + atr + oc2) < close) and ( (buyprice + (buyprice*sellproffinal) ) < profit)
        long_exit := CLOSELONG_funct()
//security
    if enable_stoploss > 0
        long_security1 := close < ( buyprice * (1.0 - sellstoplossfinal) )
    if enable_trailing > 0 and enable_trailing_ATR < 1
        long_security2 := close < ( scaler * (1.0 - selltrailingfinal) )
    if enable_trailing > 0 and enable_trailing_ATR > 0
        long_security2 := close < ( scaler - Trail_ATR)
        
//CLOSE LONG LOGIC
if longs > 0 and enable_flipping > 0
//security
    if enable_stoploss > 0
        long_security1 := close < ( buyprice * (1.0 - sellstoplossfinal) )
    if enable_trailing > 0 and enable_trailing_ATR < 1
        long_security2 := close < ( scaler * (1.0 - selltrailingfinal) )
    if enable_trailing > 0 and enable_trailing_ATR > 0
        long_security2 := close < ( scaler - Trail_ATR)
        
closelong = long_exit or long_security1 or long_security2 or long_security3 

short_exit = false
short_security1 = false
short_security2 = false
short_security3 = false

if closelong
    longs := 0

//CLOSE SHORT LOGIC
if shorts > 0 and enable_flipping < 1
    if ( (buyprice - (buyprice*(sellproffinal) - atr - oc2) > close) and ( (buyprice - (buyprice*sellproffinal) ) > profit) )
        short_exit := CLOSESHORT_funct()
//security
    if enable_stoploss > 0
        short_security1 := close > ( buyprice * (1.0 + sellstoplossfinal) )
    if enable_trailing > 0 and enable_trailing_ATR < 1
        short_security2 := close > ( scaler * (1.0 + selltrailingfinal) )
    if enable_trailing > 0 and enable_trailing_ATR > 0
        short_security2 := close > ( scaler + Trail_ATR)
if shorts > 0 and enable_flipping > 0
//security
    if enable_stoploss > 0
        short_security1 := close > ( buyprice * (1.0 + sellstoplossfinal) )
    if enable_trailing > 0 and enable_trailing_ATR < 1
        short_security2 := close > ( scaler * (1.0 + selltrailingfinal) )
    if enable_trailing > 0 and enable_trailing_ATR > 0
        short_security2 := close > ( scaler + Trail_ATR)
        
closeshort = short_exit or short_security1 or short_security2 or short_security3

if closeshort
    shorts := 0

///////////////////////////////////////////////////////////////////////////////////////
///////////// The last section takes care of the alerts //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
plotshape(makelong, style=shape.arrowup)
alertcondition(makelong, title="openlong", message="openlong")
strategy.entry("BuyLONG", strategy.long, oca_name="DBCross", when= makelong, comment="Open Long")

plotshape(makeshort, style=shape.arrowdown)
alertcondition(makeshort, title="openshort", message="openshort")
strategy.entry("BuySHORT", strategy.short, oca_name="DBCross", when= makeshort, comment="Open Short")

plotshape(closelong, style=shape.arrowdown)
alertcondition(closelong, title="closelong", message="closelong")
strategy.close("BuyLONG", when=closelong)

plotshape(closeshort, style=shape.arrowup)
alertcondition(closeshort, title="closeshort", message="closeshort")
strategy.close("BuySHORT", when=closeshort)
```

> Detail

https://www.fmz.com/strategy/440467

> Last Modified

2024-01-30 17:51:04
