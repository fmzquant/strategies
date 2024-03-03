
> Name

基于多因子模型的动量交易策略Momentum-Trading-Strategy-Based-on-Multi-factor-Model

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c81ef28b99132dce82.png)
[trans]

## 概述

该策略是一个基于多个技术指标的动量交易策略。策略采用了布林带、RSI、ATR等多个技术指标,实现了多因子模型,可以在趋势出现时快速判断入场。同时,策略还采用了止损、高级止盈等风险控制手段,可以有效控制风险。

## 策略原理

该策略的交易信号主要来源于布林带。当价格接近布林带下轨时看多,当价格接近布林带上轨时看空。为了过滤假突破,策略额外加入了RSI指标的判断规则。只有当RSI指标也确认当前是超买超卖区域时,才会产生交易信号。

除此之外,策略中还使用了ATR指标来实现止损止盈。具体来说,开仓时会记录一个买入价格,之后会根据ATR指标的数值来trailing stop,从而锁定利润,有效控制风险。

## 策略优势分析

该策略最大的优势在于,利用多因子模型综合判断市场,可以有效判断市场的结构性机会。这可以避免单一指标造成的假信号。同时,策略内置的止损和高级止盈机制,也可以有效控制风险,避免亏损过大。

## 风险分析

该策略最大的风险在于,如果行情出现剧烈反转,多个指标同时产生错误信号的概率会比较大。这会导致策略较大亏损。此外,技术指标发出信号时,也可能是市场普遍共识,容易形成herding effect,从而被套。

为了降低这些风险,我们可以适当调整参数,选择更加明确的信号。同时也可以加入更多过滤条件,避免在市场顶底附近出错交易。

## 优化方向

该策略可以朝着以下几个方向进行优化:

1. 添加更多技术指标,形成更加立体的多因子模型,提高判断准确性

2. 优化止损逻辑,根据市场不同阶段选择不同的止损策略

3. 结合机器学习等技术,动态优化参数,并评估信号的可靠性

4. 加入行业,概念等信息,形成镶嵌多因子模型

## 总结

本策略通过合理应用多因子模型的思想,很好地把握了趋势的方向。同时,科学的风险控制手段也使得策略可以可控地获利。通过不断优化,有望进一步提高策略的稳定性和盈利能力。

||

## Overview

This strategy is a momentum trading strategy based on multiple technical indicators. The strategy adopts Bollinger Bands, RSI, ATR and other technical indicators to implement a multi-factor model to quickly judge entry when a trend appears. At the same time, the strategy also adopts stop loss, advanced stop profit and other risk control means to effectively control risks.

## Strategy Principle 

The trading signals of this strategy mainly come from Bollinger Bands. When the price approaches the lower rail of the Bollinger Bands, it is bullish, and when the price approaches the upper rail, it is bearish. In order to filter false breakouts, the strategy additionally incorporates RSI indicator rules. Only when the RSI indicator also confirms that it is currently in the overbought or oversold area will a trading signal be generated.

In addition, the ATR indicator is used in the strategy to implement stop loss and take profit. Specifically, when opening a position, a purchase price will be recorded. Afterwards, trailing stops will be used based on the ATR indicator value to lock in profits and effectively control risks.

## Advantage Analysis

The biggest advantage of this strategy is that by using a multi-factor model to synthesize the market, it can effectively judge the structural opportunities in the market. This avoids false signals from a single indicator. At the same time, the built-in stop loss and advanced stop profit mechanism of the strategy can also effectively control risks and avoid excessive losses.

## Risk Analysis  

The biggest risk of this strategy is that if there is a violent market reversal, the probability that multiple indicators will generate wrong signals at the same time will be relatively large. This will lead to significant losses for the strategy. In addition, when technical indicators issue signals, it may also be the general consensus of the market, prone to herding effects, and thus being trapped.

In order to reduce these risks, we can appropriately adjust the parameters and choose clearer signals. At the same time, more filtering conditions can be added to avoid making wrong trades near market tops and bottoms.

## Optimization Directions

The strategy can be optimized in the following directions:

1. Add more technical indicators to form a more three-dimensional multi-factor model to improve judgment accuracy

2. Optimize the stop loss logic and choose different stop loss strategies according to different market stages 

3. Use machine learning and other technologies to dynamically optimize parameters and evaluate signal reliability

4. Incorporate industry, concepts and other information to form an embedded multi-factor model

## Summary  

By reasonably applying the idea of ​​a multi-factor model, this strategy captures the direction of the trend very well. At the same time, scientific risk control measures also enable the strategy to profit in a controllable manner. Through continuous optimization, it is expected to further improve the stability and profitability of the strategy.

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
start: 2023-01-28 00:00:00
end: 2024-02-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// THIS SCRIPT IS MEANT TO ACCOMPANY COMMAND EXECUTION BOTS
// THE INCLUDED STRATEGY IS NOT MEANT FOR LIVE TRADING
// THIS STRATEGY IS PURELY AN EXAMLE TO START EXPERIMENTATING WITH YOUR OWN IDEAS
/////////////////////////////////////////////////////////////////////////////////

// comment out the next line to use this script as an alert script
strategy(title="Dragon Bot - Default Script", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)
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
strategy.entry("BuyLONG", strategy.long, oca_name="DBCross",  when= makelong, comment="Open Long")

plotshape(makeshort, style=shape.arrowdown)
alertcondition(makeshort, title="openshort", message="openshort")
strategy.entry("BuySHORT", strategy.short, oca_name="DBCross",  when= makeshort, comment="Open Short")

plotshape(closelong, style=shape.arrowdown)
alertcondition(closelong, title="closelong", message="closelong")
strategy.close("BuyLONG", when=closelong)

plotshape(closeshort, style=shape.arrowup)
alertcondition(closeshort, title="closeshort", message="closeshort")
strategy.close("BuySHORT", when=closeshort)
```

> Detail

https://www.fmz.com/strategy/440993

> Last Modified

2024-02-04 15:34:49
