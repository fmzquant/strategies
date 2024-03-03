
> Name

坚实稳健的移动平均系统策略Solid-Moving-Average-System-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/14b89bfb92bf5915c9a.png)
[trans]

## 概述

该策略是一个基于4个不同周期的SMMA(平滑移动平均线)以及1个EMA指标的移动平均系统。它结合了多个证券技术分析工具,通过趋势判断形成交易策略。该策略主要适用于高杠杆账户的EURUSD 15分钟债券进行日内交易。

## 策略原理

该策略使用4个不同参数的SMMA(3,6,9,50)以及1个EMA(200)构建多层次的移动平均系统。SMMA指标可以有效过滤市场噪音,判断趋势方向。EMA指标检测长期趋势。具体交易逻辑是:

当短周期移动平均线(例如3周期SMMA)上穿较长周期移动平均线(例如200周期EMA)时产生买入信号。当短周期移动平均线下穿较长周期移动平均线时产生卖出信号。这样通过判断多个移动平均线的排列关系确定趋势方向。

此外,策略还设定了止盈止损点以控制风险。

## 优势分析

该策略具有以下优势:

1. 多层次移动平均线结构可以有效判断趋势方向,减少假信号。

2. SMMA指标有效过滤了市场噪音,EMA指标检测长线趋势。

3. 适合高杠杆账户,可以放大交易盈利。

4. 设定了止盈止损点,可以有效控制风险。

5. 优化了交易品种(EURUSD)和周期(15分钟),使其更具优势。

## 风险分析

该策略也存在以下风险:

1. 大量使用移动平均线,可能错过短期反转机会。

2. 高杠杆放大损失的同时也放大了盈利。

3. 移动平均线产生信号时,短期行情可能已经发生反转。

4. EURUSD汇率可能产生剧烈波动,带来更大风险。

针对这些风险,可以适当调整杠杆倍数,优化移动平均线的参数,引入其他指标判断行情反转等进行优化。

## 优化方向 

该策略的主要优化方向有:

1. 评估不同品种和周期的表现,选择最优参数。

2. 测试不同的参数组合和数量的移动平均线。 

3. 增加成交量或波动率指标判断短期反转点。

4. 增加止盈止损幅度的动态调整。

5. 加入ENU指标判断反转点。

通过多方面测试和优化,可以大幅提高策略的稳定性和盈利能力。

## 总结

该移动平均线策略整合了均线指标的优势,形成稳健的趋势判断系统。它优化了交易品种和周期,非常适合高杠杆日内交易。通过参数调整和优化测试,该策略可以成为高效可靠的算法交易策略。

||


## Overview

This strategy is a moving average system based on 4 SMMAs (Smoothed Moving Average) with different periods and 1 EMA indicator. It combines multiple technical analysis tools to form a trading strategy through trend judgment. This strategy is mainly suitable for high leverage EURUSD 15-minute bonds intraday trading.

## Strategy Principle  

The strategy uses 4 SMMAs with different parameters (3, 6, 9, 50) and 1 EMA (200) to build a multi-level moving average system. The SMMA indicator can effectively filter market noise and determine the trend direction. The EMA indicator detects long-term trends. The specific trading logic is:

When the short-period moving average (such as 3-period SMMA) crosses above the longer-period moving average (such as 200-period EMA), a buy signal is generated. When the short-period moving average crosses below the longer-period moving average, a sell signal is generated. By judging the arrangement of multiple moving averages, the trend direction is determined. 

In addition, the strategy also sets stop profit and stop loss points to control risks.

## Advantage Analysis

The strategy has the following advantages:

1. The multi-level moving average structure can effectively determine the trend direction and reduce false signals.

2. The SMMA indicator effectively filters market noise, and the EMA indicator detects long-term trends.

3. It is suitable for high leverage accounts to amplify trading profits.

4. Stop profit and stop loss points are set to effectively control risks.

5. Optimizes trading varieties (EURUSD) and cycles (15 minutes) to make it more advantageous.

## Risk Analysis  

The strategy also has the following risks:

1. The large amount of moving averages may miss short-term reversal opportunities.

2. High leverage amplifies losses while amplifying profits.

3. When the moving average generates a signal, the short-term trend may have already reversed.  

4. EURUSD exchange rate may experience violent fluctuations, bringing greater risks.

In response to these risks, we can appropriately adjust the leverage ratio, optimize the parameters of the moving average, introduce other indicators to judge trend reversal, etc. for optimization.

## Optimization Directions

The main optimization directions of this strategy include:

1. Evaluate the performance of different varieties and cycles and select the optimal parameters.

2. Test different combinations and quantities of moving averages.  

3. Increase volume or volatility indicators to determine short-term reversal points.

4. Increase dynamic adjustment of stop profit and stop loss range.

5. Add ENU indicator to determine reversal point.

Through multi-faceted testing and optimization, the stability and profitability of the strategy can be greatly improved.

## Summary  

This moving average strategy integrates the advantages of moving average indicators to form a robust trend judgment system. It optimizes trading varieties and cycles and is very suitable for high leverage intraday trading. Through parameter adjustment and optimization testing, this strategy can become an efficient and reliable algorithm trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2000|From Year|
|v_input_4|true|To Day|
|v_input_5|8|To Month|
|v_input_6|2021|To Year|
|v_input_7|3|Length|
|v_input_8_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_9|6|Length|
|v_input_10_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_11|9|Length|
|v_input_12_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_13|50|Length|
|v_input_14_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_15|200|Length|
|v_input_16_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_17|300|tp|
|v_input_18|300|sl|
|v_input_19|true|Risk %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-11-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SoftKill21

//@version=4
strategy("Money maker EURUSD 15min" )
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2000, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 8, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2021, title = "To Year", minval = 1970)
 


startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)




len = input(3, minval=1, title="Length")
src = input(hl2, title="Source")
smma = 0.0
sma1 = sma(src, len)
smma := na(smma[1]) ? sma1 : (smma[1] * (len - 1) + src) / len

len2 = input(6, minval=1, title="Length")
src2 = input(hl2, title="Source")
smma2 = 0.0
sma2 = sma(src2, len2)
smma2 := na(smma2[1]) ? sma2 : (smma2[1] * (len2 - 1) + src2) / len2

len3 = input(9, minval=1, title="Length")
src3 = input(hl2, title="Source")
smma3 = 0.0
sma3 = sma(src3, len3)
smma3 := na(smma3[1]) ? sma3 : (smma3[1] * (len3 - 1) + src3) / len3

len4 = input(50, minval=1, title="Length")
src4 = input(close, title="Source")
smma4 = 0.0
sma4 = sma(src4, len4)
smma4 := na(smma4[1]) ? sma4  : (smma4[1] * (len4 - 1) + src4) / len4

len5 = input(200, minval=1, title="Length")
src5 = input(close, title="Source")
out5 = ema(src5, len5)

timeinrange(res, sess) => time(res, sess) != 0
london=timeinrange(timeframe.period, "0300-1045")
londonEntry=timeinrange(timeframe.period, "0300-0845")

extraEntry =timeinrange(timeframe.period, "0745-1030")

time_cond = true
//time_cond2 = time >= startDate and time <= finishDate and extraEntry

//

longCond = close > out5 and close > smma4 and close > smma3 and close > smma2 and close > smma  and smma > smma2 and smma2>smma3 and smma3>smma4 and smma4>out5 and time_cond
shortCond = close < out5 and close < smma4 and close < smma3 and close < smma2 and close < smma  and smma < smma2 and smma2<smma3 and smma3<smma4 and smma4<out5 and time_cond


//longCond = close > out5 and close > smma4 and close > smma3 and close > smma2 and close > smma  and smma > smma2 and smma2>smma3 and smma3>smma4 and smma4>out5 and time_cond2
//shortCond = close < out5 and close < smma4 and close < smma3 and close < smma2 and close < smma  and smma < smma2 and smma2<smma3 and smma3<smma4 and smma4<out5 and time_cond2

//longCond2 = crossover(close,out5) and crossover(close,smma4) and crossover(close,smma3) and crossover(close,smma2) and crossover(close,smma) and time_cond
//shortCond2 = crossunder(close,out5) and crossunder(close,smma4) and crossunder(close,smma3) and crossunder(close,smma2) and crossunder(close,smma) and time_cond



tp=input(300,title="tp")
sl=input(300,title="sl")

strategy.initial_capital  = 50000

//MONEY MANAGEMENT--------------------------------------------------------------
balance = strategy.netprofit + strategy.initial_capital //current balance
floating = strategy.openprofit          //floating profit/loss
risk = input(1,type=input.float,title="Risk %")/100           //risk % per trade


    //Calculate the size of the next trade
temp01 = balance * risk     //Risk in USD
temp02 = temp01/sl        //Risk in lots
temp03 = temp02*100000      //Convert to contracts
size = temp03 - temp03%1000 //Normalize to 1000s (Trade size)
if(size < 1000)
    size := 1000           //Set min. lot size

dataL = (close-out5)*100000
dataS = (out5-close)*100000

minDistanceL = (smma4 - out5)*100000
minDistanceS= (out5 - smma4)*100000


strategy.entry("long",1,1,when=longCond )
strategy.exit("closelong","long", profit=tp,loss=sl)
    
strategy.entry("short",0,1,when=shortCond )
strategy.exit("closeshort","short", profit=tp,loss=sl)



strategy.close_all(when = not london, comment="london finish")
//strategy.close_all(when = not extraEntry, comment="london finish")



// maxEntry=input(2,title="max entries")
// strategy.risk.max_intraday_filled_orders(maxEntry)


```

> Detail

https://www.fmz.com/strategy/433113

> Last Modified

2023-11-24 15:11:18
