
> Name

动量均线盘整策略Momentum-Moving-Average-Consolidation-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14c4c42736daa78aad8.png)
[trans]

### 概述

该策略主要利用移动平均线HMA和EMA形成的均线盘整来判断买入时机。当HMA上穿EMA时视为盘整结束,形成新的上涨趋势,因此在HMA上穿EMA的同时买入。

该策略同时结合RSI指标来检测超买超卖情况。当RSI低于70时允许买入,RSI高于80时考虑部分止盈。

### 策略原理

该策略使用200周期的EMA和HMA构建均线系统。其中,HMA指标是根据EMA改进设计的更加灵敏的移动平均线指标。当HMA上穿EMA时,表示盘整阶段结束,股价开始上涨。此时若RSI指标显示没有超买,则产生买入信号。

在已建仓的情况下,若股价回落,HMA再度下穿EMA,表明新的盘整开始,则全部平仓。同时,如果RSI上穿80时,会部分止盈20%,防止亏损。

该策略的成交逻辑比较简单,主要就是HMA和EMA的多空交叉,结合RSI的高低位判断,形成较为稳健的交易策略。

### 优势分析

该策略最大的优势在于,利用EMA和HMA的盘整交易形态,可以过滤掉大部分False Break,从而提高获利率。同时,RSI指标的辅助也可以有效控制风险,这两者的结合使得该策略非常适合盘整震荡市。

另外,该策略仅仅使用3个指标且逻辑简单,这使得其参数优化和回测较为方便,有利于策略的验证和改进。

### 风险分析

尽管该策略有一定的优点,但仍存在一些风险需要注意。例如,持仓时间可能会比较长,需要有足够的资金支持。如果遇到横盘整理的时段,无法很快止损退出,容易出现亏损扩大的情况。

另外,该策略主要依赖均线指标,如果价格出现异常突破,止损措施可能来不及起作用,会带来更大的风险。此外,参数设置也会影响策略表现,需要进行大量测试去找到最优参数。

### 优化方向

考虑到上述风险,该策略可以从以下几个方面进行优化:

1. 结合波动率指标,根据市场波动情况动态调整仓位。

2. 增加趋势指标判断,避免不必要的反转交易。

3. 优化移动平均线参数,使之更贴近当前市场特征。

4. 采用时间止损,最大程度避免单笔损失过大的问题。

### 总结

本策略总体来说是一个比较经典简单的盘整震荡策略。它主要应用于股指和热门个股的短线和中期交易,可以获取比较稳定的 Alpha 值。随着参数的优化和风控措施的加强,该策略的表现还具有很大的提升空间。

||

### Overview

This strategy mainly uses the consolidation formed by the moving average lines HMA and EMA to determine the timing of buying. When HMA crosses above EMA, it is considered that the consolidation is over and a new upward trend is formed, so buy when HMA crosses above EMA at the same time.

The strategy also combines the RSI indicator to detect overbought and oversold conditions. It allows buying when RSI is below 70 and considers taking partial profits when RSI is above 80.

### Strategy Principle 

This strategy uses a moving average system constructed with 200-period EMA and HMA. Among them, the HMA indicator is a more sensitive moving average indicator designed based on EMA. When HMA crosses above EMA, it means that the consolidation stage is over and the stock price starts to rise. At this time, if the RSI indicator shows no overbought, a buy signal is generated.

In the case of an existing position, if the stock price falls back and HMA crosses below EMA again, indicating the beginning of a new consolidation, the entire position will be closed. At the same time, if RSI crosses above 80, 20% of the profits will be partially taken to prevent losses.

The transaction logic of this strategy is quite simple, mainly relying on the long and short crossings of HMA and EMA, combined with RSI's highs and lows, to form a relatively robust trading strategy.

### Advantage Analysis 

The biggest advantage of this strategy is that by utilizing the consolidation trading pattern of EMA and HMA, most False Breaks can be filtered out, thereby improving the profit rate. At the same time, the auxiliary of the RSI indicator can also effectively control risks. The combination of the two makes this strategy very suitable for consolidation and volatility markets.

In addition, this strategy only uses 3 indicators and the logic is simple, which makes it easy to optimize parameters and backtest, which is conducive to the verification and improvement of strategies.

### Risk Analysis

Although this strategy has some advantages, there are still some risks to note. For example, the holding time may be relatively long, requiring sufficient funds to support. If it encounters a period of sideways consolidation, it cannot exit quickly with a stop loss, which easily leads to the situation of expanding losses. 

In addition, this strategy mainly relies on moving average indicators. If there is an abnormal breakthrough in prices, stop-loss measures may not be able to take effect, which will bring greater risks. In addition, parameter settings will also affect strategy performance and require extensive testing to find optimal parameters.

### Optimization Directions

Considering the above risks, this strategy can be optimized in the following aspects:

1. Combine volatility indicators to dynamically adjust positions based on market volatility.

2. Increase trend indicator judgments to avoid unnecessary reversal trading.  

3. Optimize moving average parameters to make them closer to current market characteristics.  

4. Use time stops to avoid oversized single losses.

### Summary  

Overall, this is a relatively classic simple consolidation and volatility strategy. It is mainly used for short-term and medium-term trading of stock indexes and hot stocks, and can obtain relatively stable alpha values. With the optimization of parameters and strengthening risk control measures, the performance of this strategy still has great room for improvement.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|EMA and HMA Length|
|v_input_2|13|RSI Length|
|v_input_3|true|Take Partial Profits (if this selected, RSI 13 higher reading over 80 is considered for partial closing ) |
|v_input_4|8|Stop Loss%|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mohanee

//@version=4
strategy(title="EMA_HMA_RSI_Strategy", overlay=true, pyramiding=2,     default_qty_type=strategy.cash, default_qty_value=10000, initial_capital=10000, currency=currency.USD)  //default_qty_value=10, default_qty_type=strategy.fixed, 

//longCondition = crossover(sma(close, 14), sma(close, 28))
//if (longCondition)
    //strategy.entry("My Long Entry Id", strategy.long)

//shortCondition = crossunder(sma(close, 14), sma(close, 28))
//if (shortCondition)
  //  strategy.entry("My Short Entry Id", strategy.short)

//HMA
HMA(src1, length1) =>  wma(2 * wma(src1, length1/2) - wma(src1, length1), round(sqrt(length1)))

var stopLossVal=0.00

//variables BEGIN
length=input(200,title="EMA and HMA Length")   //square root of 13

rsiLength=input(13, title="RSI Length")

takePartialProfits = input(true, title="Take Partial Profits (if this selected, RSI 13 higher reading over 80 is considered for partial closing ) ")

stopLoss = input(title="Stop Loss%", defval=8, minval=1)
//variables  END

//RSI 
rsi13=rsi(close,rsiLength)


ema200=ema(close,length)
hma200=HMA(close,length)

//exitOnAroonOscCrossingDown = input(true, title="Exit when Aroon Osc cross down zero ")


// Drawings

//Aroon oscillator

arronUpper = 100 * (highestbars(high, length+1) + length)/length
aroonLower = 100 * (lowestbars(low, length+1) + length)/length

aroonOsc  = arronUpper - aroonLower

aroonMidpoint = 0
//oscPlot = plot(aroonOsc, color=color.green)
//midLine= plot(aroonMidpoint, color=color.green)
//topLine = plot(90,style=plot.style_circles, color=color.green)
//bottomLine = plot(-90,style=plot.style_circles, color=color.red)

//fill(oscPlot, midLine, color=aroonOsc>0?color.green:color.red, transp=50)
//fill(topLine,bottomLine, color=color.blue)
//fill(topLine,oscPlot, color=aroonOsc>90?color.purple:na, transp=25)


// RSI 
//plot(rsi13, title="RSI", linewidth=2, color=color.purple)
//hline(50, title="Middle Line", linestyle=hline.style_dotted)
//obLevel = hline(80, title="Overbought", linestyle=hline.style_dotted)
//osLevel = hline(30, title="Oversold", linestyle=hline.style_dotted)
//fill(obLevel, osLevel, title="Background", color=rsi13 >=30 ? color.green:color.purple, transp=65)  // longTermRSI >=50

hullColor = hma200 > hma200[2] ? #00ff00 : #ff0000

plot(hma200, title="HULL 200", color=hullColor,  transp=25)
plot(ema200, title="EMA 200", color=color.orange)

//Entry--
strategy.initial_capital = 50000
strategy.entry(id="Long Entry", comment="LE", qty=(strategy.initial_capital * 0.10)/close, long=true,  when=strategy.position_size<1 and hma200 < ema200   and  hma200 > hma200[2]  and rsi13<70 )     //  // aroonOsc<0

//Add
if(strategy.position_size>=1 and  close < strategy.position_avg_price and  ( crossover(rsi13,30) or  crossover(rsi13,40) ) )   // hma200 < ema200   and  hma200 > hma200[2]   and hma200[2] < hma200[3] )  //and crossover(rsi13,30)  aroonOsc<0    //and hma200 > hma200[2]  and hma200[2] <= hma200[3]  //crossover(rsi13,30)
    qty1=(strategy.initial_capital * 0.10)/close
    //stopLossVal:= abs(strategy.position_size)>1 ?  ( (close > close[1] and close > open and close>strategy.position_avg_price) ? close[1]*(1-stopLoss*0.01) : stopLossVal ) : 0.00 
    strategy.entry(id="Long Entry", comment="Add", qty=qty1, long=true )     //crossover(close,ema34)  //and close>ema34  //crossover(rsi5Val,rsiBuyLine)  --   SL="+tostring(stopLossVal, "####.##")


//stopLossVal:= abs(strategy.position_size)>1 ? strategy.position_avg_price*(1-0.5) : 0.00 

stopLossVal:= abs(strategy.position_size)>1 ?  ( (close > close[1] and close > open and close>strategy.position_avg_price) ? close[1]*(1-stopLoss*0.01) : stopLossVal ) : 0.00 
//stopLossVal:= abs(strategy.position_size)>1 ?  strategy.position_avg_price*(1-stopLoss*0.01) :  0.00

barcolor(color=strategy.position_size>=1? rsi13>80 ? color.purple: color.blue:na)

//close partial
if(takePartialProfits==true)
    strategy.close(id="Long Entry", comment="Partial X  points="+tostring(close - strategy.position_avg_price, "####.##"),  qty_percent=20 , when=abs(strategy.position_size)>=1 and crossunder(rsi13, 80)  and close > strategy.position_avg_price  )   //close<ema55 and rsi5Val<20 //ema34<ema55



//close All
//if(exitOnAroonOscCrossingDown)
  //  strategy.close(id="Long Entry", comment="Exit All points="+tostring(close - strategy.position_avg_price, "####.##"),  when=abs(strategy.position_size)>=1 and crossunder(aroonOsc, 0) )   //close<ema55 and rsi5Val<20 //ema34<ema55  //close<ema89

//close All on stop loss
strategy.close(id="Long Entry", comment="Stoploss X points="+tostring(close - strategy.position_avg_price, "####.##"),  when=abs(strategy.position_size)>=1 and close < stopLossVal  )  //close<ema55 and rsi5Val<20 //ema34<ema55  //close<ema89

strategy.close(id="Long Entry", comment="hmaXema X points="+tostring(close - strategy.position_avg_price, "####.##"),  when=abs(strategy.position_size)>=1 and close > strategy.position_avg_price  and  crossunder(hma200,ema200)  )  //close<ema55 and rsi5Val<20 //ema34<ema55  //close<ema89
    
```

> Detail

https://www.fmz.com/strategy/439950

> Last Modified

2024-01-25 11:39:00
