
> Name

指数移动平均线穿越及上轨突破瞬时意图策略Moving-Average-Crossover-and-Upper-Rail-Breakthrough-Impulse-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d37fd1a4c59fc8062c.png)

[trans]

## 概述

该策略利用指标MACD的快线和慢线的交叉信号,结合其他多个指标进行综合判断,在瞬时时机捕捉到指数移动平均线的突破信号,做出买入或卖出决策,属于短线交易策略。

## 策略原理

1. 使用MACD的快线和慢线交叉作为主要交易信号。当快线上穿慢线时看涨入场,当快线下穿慢线时看跌入场。

2. 结合RSI指标判断是否过买过卖。RSI低于中线时看涨,RSI高于中线时看跌。

3. 计算当前收盘价与一定周期内的SMA均线作比较,收盘价低于SMA时看涨,收盘价高于SMA时看跌。

4. 计算一定周期内的Highest值的0.5 Fibonacci位,作为看涨的阻力位。计算一定周期内的Lowest值的0.5 Fibonacci位,作为看跌的支撑位。

5. 当满足快线上穿和价格低于支撑位时看涨入场,当满足快线下穿和价格高于阻力位时看跌入场。

6. 采用逐步移动止损方式。入场后开始时止损位固定为开仓价格的一定百分比,当亏损达到一定比例后改为小幅逐步追踪止损。

## 策略优势

1. 策略充分利用MACD的交叉信号,这是一种经典且有效的技术指标交易信号。

2. 结合RSI、SMA等多个指标进行确认,可以过滤假信号,提高信号的可靠性。

3. 计算动态支持阻力位,进行突破交易,可以捕捉较大行情。

4. 采用逐步移动止损方式,既可锁住大部分利润,也可控制风险。

5. 策略交易逻辑清晰简单,容易理解掌握,适合新手学习。

## 策略风险

1. MACD指标存在滞后问题,可能会错过行情最佳买点卖点。

2. 多指标组合判断增加了策略复杂度,容易出现指标冲突的情况。

3. 动态计算支持阻力位存在错误突破的风险。

4. 移动止损在大行情中可能过早止损,无法持续获利。

5. 策略参数需要反复测试优化,不合适的参数会影响策略效果。

## 策略优化方向 

1. 可以测试不同参数组合,优化MACD周期参数。

2. 可以引入更多指标,如布林线、KDJ等进行多维度分析。

3. 可以结合更多因素判断支持阻力位的合理性。

4. 可以研究更先进的移动止损机制,如时间止损、振荡止损等。

5. 可以加入自动参数优化模块,实现参数的自动寻优。

## 总结

该策略综合运用MACD、RSI、SMA等多个指标,在瞬时时机捕捉到指数移动平均线的突破信号,属于典型的短线突破交易策略。策略信号生成有一定的滞后性,但可以通过参数优化提高准确率。总体来说,该策略交易逻辑简单清晰,容易掌握,表现稳健,适合大多数人学习使用,值得进一步的测试和优化。

||


## Overview

This strategy utilizes the crossover signals of the MACD fast line and slow line, combined with judgments based on multiple other indicators, to capture the breakthrough signals of the moving average index line in a timely manner and make buy or sell decisions. It belongs to a short-term trading strategy.

## Strategy Logic

1. Use the crossover of the MACD fast line and slow line as the primary trading signal. When the fast line crosses above the slow line, take a long position. When the fast line crosses below the slow line, take a short position.

2. Incorporate the RSI indicator to determine overbought and oversold conditions. Below the centerline suggests long, while above suggests short.

3. Compare the current closing price to the SMA line of a certain period. Closing price below SMA suggests long, while above suggests short. 

4. Calculate the 0.5 Fibonacci level of the Highest value of a certain period as the resistance for long. Calculate the 0.5 Fibonacci level of the Lowest value of a certain period as the support for short.

5. Take long when the fast line crosses above and the price is below support. Take short when the fast line crosses below and the price is above resistance.

6. Adopt a trailing stop loss mechanism. The stop loss is fixed at a certain percentage of the entry price initially. When the loss reaches a certain level, switch to a gradual trailing stop loss.

## Advantages

1. The strategy makes full use of the MACD crossover signals, which is a classic and effective technical indicator trading signal.

2. Incorporating confirmations from multiple indicators like RSI and SMA can filter false signals and improve reliability.

3. Calculating dynamic support and resistance levels for breakout trading can capture larger trends.

4. The trailing stop loss can lock in most profits while controlling risk.

5. The strategy logic is clear and simple, easy to understand and master for beginners.

## Risks

1. The MACD indicator has lagging issues and may miss the optimal entry and exit points.

2. Combining multiple indicators increases complexity and risks of conflicting signals.

3. There are risks of incorrect breakouts when dynamically calculating support and resistance. 

4. Trailing stop loss may exit prematurely in strong trends, failing to ride trends.

5. Parameters require repetitive testing and optimization, improper parameters negatively impact performance.

## Optimization Directions

1. Test different parameter combinations to optimize MACD periods.

2. Introduce more indicators like Bollinger Bands, KDJ for multidimensional analysis. 

3. Incorporate more factors to judge the reasonableness of support and resistance.

4. Research more advanced stop loss mechanisms like time-based or volatility-based stops. 

5. Add an auto-optimization module for automatic parameter optimization.

## Summary 

This strategy combines MACD, RSI, SMA and other indicators to capture moving average breakthrough signals opportunistically. It belongs to typical short-term breakout trading strategies. There is some lag in its signal generation, but accuracy can be improved through parameter optimization. Overall, this is a strategy with simple and clear logic, easy to grasp for most, and worth further testing and optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_2|60|Strategy Decision Time Frame|
|v_input_1|BINANCE:BTCUSDT|(?SYMBOL)Symbol|
|v_input_3|14|(?ADX)ADX Smoothing|
|v_input_4|14|ADX DI Length|
|v_input_5|30|ADX EMA|
|v_input_6|19|ADX CONSTANT|
|v_input_7|50|(?FIBO MACD SMA)Fibo Look Back Canles|
|v_input_8|30|SMA Look Back Candles|
|v_input_9|15|MACD Fast Lenght|
|v_input_10|30|MACD Slow Lenght|
|v_input_11|9|MACD Signal Smoothing|
|v_input_12|100|MACD Look Back Candles|
|v_input_13|2|(?TP & SL)Trailing Long Stop %|
|v_input_14|2|Trailing Short Stop %|
|v_input_15|2|Long Profit Start %|
|v_input_16|2|Short Profit Start %|
|v_input_17|3|Max Long Stop Loss (%)|
|v_input_18|2.5|Max Short Stop Loss (%)|
|v_input_19|100|Long Take Profit (%)|
|v_input_20|100|Short Take Profit (%)|
|v_input_21|95|(?CAPITAL TO INVEST)Capital Percentage to Invest (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-05 00:00:00
end: 2023-11-09 23:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © onurenginogutcu

//@version=4
strategy("R19 STRATEGY", overlay=true, calc_on_every_tick=true , margin_long=100, margin_short=100 ,  process_orders_on_close=true )



sym = input(title="Symbol", type=input.symbol, defval="BINANCE:BTCUSDT" , group = "SYMBOL") 
timeFrame = input(title="Strategy Decision Time Frame", type = input.resolution ,  defval="60")

adxlen = input(14, title="ADX Smoothing" , group = "ADX")
dilen = input(14, title="ADX DI Length", group = "ADX")
adxemalenght = input(30, title="ADX EMA", group = "ADX")
adxconstant = input(19, title="ADX CONSTANT", group = "ADX")

fibvar = input (title = "Fibo Look Back Canles" , defval = 50 , minval = 0 , group = "FIBO MACD SMA")
smaLookback = input (title = "SMA Look Back Candles" , defval = 30 , minval = 0 , group = "FIBO MACD SMA")
MACDFast = input (title = "MACD Fast Lenght" , defval = 15 , minval = 0 , group = "FIBO MACD SMA")
MACDSlow = input (title = "MACD Slow Lenght" , defval = 30 , minval = 0 , group = "FIBO MACD SMA")
MACDSmooth = input (title = "MACD Signal Smoothing" , defval = 9 , minval = 0 , group = "FIBO MACD SMA")
MACDLookback = input (title = "MACD Look Back Candles" , defval = 100 , minval = 0 , group = "FIBO MACD SMA")

trailingStopLong = input (title = "Trailing Long Stop %" , defval = 2.0 , step = 0.1, group = "TP & SL") * 0.01
trailingStopShort = input (title = "Trailing Short Stop %" , defval = 2.0 , step = 0.1 , group = "TP & SL") * 0.01
LongTrailingProfitStart = input (title = "Long Profit Start %" , defval = 2.0 , step = 0.1 , group = "TP & SL") * 0.01
ShortTrailingProfitStart = input (title = "Short Profit Start %" , defval = 2.0 , step = 0.1, group = "TP & SL") * 0.01

lsl = input(title="Max Long Stop Loss (%)",
     minval=0.0, step=0.1, defval=3.0, group = "TP & SL") * 0.01
     
ssl = input(title="Max Short Stop Loss (%)",
     minval=0.0, step=0.1, defval=2.5, group = "TP & SL") * 0.01
     
longtp = input(title="Long Take Profit (%)",
     minval=0.0, step=0.1, defval=100, group = "TP & SL") * 0.01
     
shorttp = input(title="Short Take Profit (%)",
     minval=0.0, step=0.1, defval=100, group = "TP & SL") * 0.01
     
capperc = input(title="Capital Percentage to Invest (%)",
     minval=0.0, maxval=100, step=0.1, defval=95, group = "CAPITAL TO INVEST") * 0.01
     

symClose = security(sym, timeFrame, close)
symHigh = security(sym, timeFrame, high)
symLow = security(sym, timeFrame, low)

atr = atr (14) 

/////////adx code

dirmov(len) =>
	up = change(symHigh)
	down = -change(symLow)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
	minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = rma(tr, len)
	plus = fixnan(100 * rma(plusDM, len) / truerange)
	minus = fixnan(100 * rma(minusDM, len) / truerange)
	[plus, minus]
adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
sig = adx(dilen, adxlen)
emasig = ema (sig , adxemalenght )


////////adx code over



i = ema (symClose , MACDFast) - ema (symClose , MACDSlow) 
r = ema (i , MACDSmooth)

sapust = highest (i , MACDLookback) * 0.729 
sapalt = lowest (i , MACDLookback) * 0.729  


simRSI = rsi (symClose , 50 ) 




fibtop = lowest (symLow , fibvar) + ((highest (symHigh , fibvar) - lowest (symLow , fibvar)) * 0.50)
fibbottom = lowest (symLow , fibvar) + ((highest (symHigh , fibvar) - lowest (symLow , fibvar)) * 0.50)





cond1 = 0
cond2 = 0
cond3 = 0
cond4 = 0


longCondition = crossover(i, r) and i < sapalt and sig > adxconstant and symClose < sma (symClose , smaLookback) and simRSI < sma (simRSI , 50) and symClose < fibbottom 
shortCondition = crossunder(i, r) and i > sapust and sig > adxconstant and  symClose > sma (symClose , smaLookback) and simRSI > sma (simRSI , 50) and symClose > fibtop 


//////////////////////probability long/short
if (crossover(i, r) and i < sapalt)
    cond1 := 35
else if (crossunder(i, r) and i > sapust)
    cond1 := -35
else
    cond1 := 0
    
if (symClose < sma (symClose , smaLookback))
    cond2 := 30
else if (symClose > sma (symClose , smaLookback))
    cond2 := -30
else
    cond2 := 0
    
if (simRSI < sma (simRSI , 50))
    cond3 := 25
else if (simRSI > sma (simRSI , 50))
    cond3 := -25
else
    cond3 := 0
    
if (symClose < fibbottom)
    cond4 := 10
else if (symClose > fibbottom)
    cond4 := -10
else
    cond4 := 0
    
probab = cond1 + cond2 + cond3 + cond4
////////////////////////////////////////////////////////////////

///////////////////////////////////////////STRATEGY ENTRIES AND STOP LOSSES /////
var startTrail = 0
var trailingLongPrice = 0.0
var trailingShortPrice = 0.0

if (longCondition and strategy.position_size == 0)
    strategy.entry("Long", strategy.long , qty = capperc * strategy.equity / close )

if (shortCondition and strategy.position_size == 0)
    strategy.entry("Short" , strategy.short , qty = capperc * strategy.equity / close )
    
    
if (strategy.position_size == 0)    
    trailingShortPrice := 0.0
    trailingLongPrice := 0.0  
    startTrail := 0
/////////////////////////////////strategy exit

if (strategy.position_size > 0 and close >= strategy.position_avg_price * (1 + LongTrailingProfitStart))
    startTrail := 1

if (strategy.position_size < 0 and close <= strategy.position_avg_price * (1 - ShortTrailingProfitStart))
    startTrail := -1
    



trailingLongPrice := if strategy.position_size > 0 and startTrail == 1
    stopMeasure = close * (1 - trailingStopLong)
    max (stopMeasure , trailingLongPrice [1])
else if strategy.position_size > 0 and startTrail == 0
    strategy.position_avg_price * (1 - lsl)


trailingShortPrice := if strategy.position_size < 0 and startTrail == -1
    stopMeasure = close * (1 + trailingStopShort)
    min (stopMeasure , trailingShortPrice [1])
else if strategy.position_size < 0 and startTrail == 0
    strategy.position_avg_price * (1 + ssl)




if (strategy.position_size > 0)
    strategy.exit("Exit Long", "Long", stop = trailingLongPrice , limit=strategy.position_avg_price*(1 + longtp))
 

if (strategy.position_size < 0)
    strategy.exit("Exit Short", "Short", stop = trailingShortPrice , limit=strategy.position_avg_price*(1 - shorttp))


////////////////////////vertical colouring signals
bgcolor(color=longCondition ? color.new (color.green , 70) : na)
bgcolor(color=shortCondition ? color.new (color.red , 70) : na)

plot (trailingLongPrice , color = color.green) ///long price trailing stop
plot (trailingShortPrice , color = color.red) /// short price trailing stop
plot (startTrail , color = color.yellow)
plot (probab , color = color.white) ////probability

```

> Detail

https://www.fmz.com/strategy/431928

> Last Modified

2023-11-13 11:52:22
