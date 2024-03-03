
> Name

RSI-W形态突破策略RSI-W-Pattern-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过识别RSI指标上的W形态,结合趋势判断条件,实现低买高卖的突破操作。相比常见的RSI超买超卖区域判断,W形态识别能更清晰定位买入时点。

## 策略原理

1. 使用RSI(5)判断W形态,找到潜在买入机会。W形态出现在超卖区域时,预示着即将反转。

2. EMA20上穿EMA50判断为趋势上行,作为入场的大方向判断。

3. 当识别到W形态且趋势上行时,进行买入。

4. 如果已经持仓,当RSI再次跌破20时,可以加仓。 

5. 当RSI上穿75时,表示超买区域,进行止盈退出。

6. 设置8%的止损点,如果亏损超过该点,进行止损退出。

## 优势分析

1. W形态识别增加入场的确定性。

2. 结合趋势判断过滤无效信号,避免错过反转机会。

3. RSI参数设置为5日能及时捕捉短线机会。 

4. 设定止盈止损点,可以控制风险。

## 风险分析

1. W形态识别依赖参数设置,可能漏识或误判形态。

2. 作为反转信号,存在被套住的风险。

3. RSI容易产生假突破,应适当过滤信号。

4. 若止损点设置过大,可能会过早止损。

## 优化方向

1. 测试不同RSI周期参数,找到最优参数组合。

2. 增加形态判定条件,提高识别准确率。

3. 结合其他指标进行信号过滤,减少错误交易。

4. 动态调整止损位置,优化止损策略。

5. 优化止盈策略,在保证盈利的前提下延长持仓周期。

## 总结

该策略利用RSI W形态实现高效的反转突破操作。但需要进一步优化参数设定,并辅以其他技术指标进行信号过滤,从而提升策略稳定性和盈利水平。

||  

## Overview

This strategy identifies W patterns on the RSI indicator combined with trend conditions to implement low-buy-high-sell breakout operations. Compared to overbought/oversold levels, the W pattern identification provides clearer buy signal timing.

## Strategy Logic

1. Identify W patterns using RSI(5) to locate potential buy opportunities. W patterns appearing in oversold zones indicate impending reversals.

2. EMA20 crossing above EMA50 determines uptrend, providing directional bias. 

3. When a W pattern is identified and trend is up, long orders are triggered.

4. If already in a position, additional buys are allowed if RSI crosses below 20 again.

5. When RSI crosses above 75, it indicates overbought conditions, take profit exits are triggered.

6. A 8% stop loss is set. If loss exceeds this point, a stop loss exit is triggered.

## Advantage Analysis  

1. W pattern identification increases entry certainty.

2. Combining with trend filters avoids false signals and missing reversal chances.

3. RSI(5) can timely capture short-term opportunities.

4. Profit taking and stop loss points help control risks.

## Risk Analysis

1. W pattern recognition depends on parameter tuning, risks of missing or misidentifying formations exist.

2. As a reversal signal, risks of being trapped exist.

3. RSI is prone to false breakouts, proper signal filtering is needed. 

4. If stop loss point is too wide, premature stops may occur.

## Optimization Directions

1. Test different RSI periods to find optimal parameters.

2. Add more criteria to increase pattern recognition accuracy. 

3. Combine with other indicators for signal filtering and reducing incorrect trades.

4. Dynamically adjust stop loss levels to optimize stop loss strategy.

5. Optimize profit taking strategy to extend holding period while ensuring profitability.

## Summary

This strategy utilizes RSI W patterns for efficient reversal breakout trading. But further parameter optimization and adding other technical indicators for signal filtering can improve strategy stability and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|RSI Period|
|v_input_2|65|look for W pattern bottom edges well below RSI level (BUY) |
|v_input_3|50|Long Term EMA|
|v_input_4|20|Short Term EMA|
|v_input_5|8|Stop Loss %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-17 00:00:00
end: 2023-09-16 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mohanee

//@version=4
strategy(title="RSI W Pattern strategy", pyramiding=2, shorttitle="RSI W Pattern", overlay = false)

//Strategy Rules
//ema20 is above ema50
//RSI5 making W pattern in oversold area  or just below 70 level  , you can define the value for parameter buyRsiEntry --- dont go beyond 70
//Exit when RSI reaches 75 

len = input(title="RSI Period", minval=1, defval=5)
buyRsiEntry = input(title="look for W pattern bottom edges well below RSI level (BUY) ", minval=10, defval=65, maxval=70)
//numberOfBars = input(title="Number of Bars in W pattern ", minval=4, defval=4, maxval=6)

emaL = input(title="Long Term EMA", minval=1, defval=50, maxval=200)
emaS = input(title="Short Term EMA", minval=1, defval=20, maxval=200)

stopLoss = input(title="Stop Loss %", minval=1, defval=8, maxval=10)

//rsiWp1=false

myRsi = rsi(close,len)

//longEmaVal=ema(close,emaL)
//shortEmaVal=ema(close,emaS)

entryEma=ema(close,5)  // This is used as filetr for BUY


isEma20AboveEma50=ema(close,emaS)>ema(close,emaL) ? true : false 

//W Pattern
//rsiWp1 =  myRsi>myRsi[1] and myRsi>=30 and myRsi[1]<myRsi[2] and myRsi[2]>myRsi[3]  and myRsi[3]<myRsi[4] //This is published one
rsiWp1 =    myRsi>myRsi[1] and myRsi>=30 and myRsi[1]<myRsi[2] and myRsi[2]>myRsi[3]  and myRsi[3]<myRsi[4] and (low[1]<=low[4] or low[3]<=low[4] ) // looking for recent low

//rsiWp1 =  myRsi>myRsi[1] and myRsi>=30 and myRsi[1]<myRsi[2] and myRsi[2]>myRsi[3]  and myRsi[3]<myRsi[4]  //Ths one has 92% win rate and 4.593 prfit factor

//long condition filters
//1. ema20 > ema50
//2. Rsi5 has W pattern
//3. current RSI <= 65 (parameter buyRsiEntry)  (dont go beyond 70 , becuase that is already overbought area)
//4. current price low/close is below 5 ema --- looking for pullback  -- Optional
longCondition =  isEma20AboveEma50 and rsiWp1   and (myRsi<=buyRsiEntry  and myRsi>=30)  
//and (low<entryEma or close<entryEma)  --- if this optional required , add it to above condition

patternText=" W "

barcolor(longCondition?color.yellow:na)

//initial entry
strategy.entry("RSI_W_LE", comment="Buy" , long=true, when=longCondition  )

//legging in to existing 
strategy.entry("RSI_W_LE",comment="Add", long=true, when=strategy.position_size>0 and crossover(myRsi,10 ))

//calculate stoploss value
stopLossValue=strategy.position_avg_price -  (strategy.position_avg_price*stopLoss/100) 


rsiPlotColor=longCondition ?color.yellow:color.purple


plot(myRsi, title="RSI", linewidth=2, color=color.purple)
//    plot(myRsi, title="RSI", linewidth=2, color=rsiWp1?color.yellow:color.purple)
    //plot(myRsi[1], title="RSI", linewidth=2, color=rsiWp1==true?color.yellow:color.purple)
    //plot(myRsi[2], title="RSI", linewidth=2, color=rsiWp1?color.yellow:color.purple)
    //plot(myRsi[3], title="RSI", linewidth=2, color=rsiWp1?color.yellow:color.purple)
    //plot(myRsi[4], title="RSI", linewidth=2, color=rsiWp1?color.yellow:color.purple)
    


hline(40, title="Middle Line", color=color.blue, linestyle=hline.style_dashed)
obLevel = hline(75, title="Overbought", color=color.red, linestyle=hline.style_dashed)
osLevel = hline(30, title="Oversold", color=color.purple, linestyle=hline.style_dashed)
fill(obLevel, osLevel, title="Background", color=#9915FF, transp=90)


plotshape(
	 longCondition ? myRsi[1] : na,
	 offset=-1,
	 title="W Pattern",
	 text=patternText,
	 style=shape.labelup,
	 location=location.absolute,
	 color=color.purple,
	 textcolor=color.yellow,
	 transp=0
	 )	 
	 
bgcolor(strategy.position_size>0?color.green:na, transp=40, title='In Long Position')

//take profit or close when RSI reaches 75    
takeProfit=crossover(myRsi,75)

//close when RSi reaches profit level 
strategy.close("RSI_W_LE", comment="TP Exit", qty=strategy.position_size,when=crossover(myRsi,75) and close>strategy.position_avg_price )


//close everything when stoploss hit  
longCloseCondition=close<(strategy.position_avg_price - (strategy.position_avg_price*stopLoss/100)  ) //or crossunder(myRsi,30)
strategy.close("RSI_W_LE", comment="SL Exit", qty=strategy.position_size,when=longCloseCondition )


```

> Detail

https://www.fmz.com/strategy/427064

> Last Modified

2023-09-17 18:24:17
