
> Name

未来价格延伸线回测策略Future-Lines-of-Demarcation-Backtest-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1addd7806136f18c9a8.png)
[trans]

### 概述

该策略的主要思想是通过绘制未来价格延伸线,并结合当前价格与该线的关系,判断未来价格的方向。当价格高于或低于延伸线时,可以相应做多或做空。

### 策略原理  

未来价格延伸线(Future Lines of Demarcation,FLD)代表着未来特定周期内的中位价、最高价或最低价。该策略运用FLD判断价格未来走势,其原理是:

1. 根据周期长度,计算出FLD的位移周期Period,即Price的未来价格。
2. 比较当前Close价格与FLD位移周期后的价格。
    - 当Close价格低于FLD未来价格,判断为看涨信号。
    - 当Close价格高于FLD未来价格,判断为看跌信号。
3. 根据看涨和看跌信号,进行相应的做多做空操作。

### 优势分析

该策略主要优势有:

1. 使用FLD判定未来价格走势,准确率较高。
2. 可自定义周期参数,适用于不同市场环境。
3. 可选择中位价、最高价或最低价作为FLD绘制源,适应性强。

### 风险分析  

该策略主要风险有:

1. FLD本身可能失效,导致错失机会或错误信号。可以结合其他指标判断。
2. 周期参数设置不当,可能导致过多错误信号。需要优化周期长度。
3. 突发事件导致价格急剧波动,FLD预测失效。可以设置止损来控制风险。

### 优化方向  

该策略可从以下方面进行优化:

1. 结合其他指标过滤信号,提高策略准确率。比如MACD,KDJ等。  
2. 优化周期参数,找到最佳参数组合。
3. 增加止损止盈机制,控制单笔亏损和盈利。
4. 根据回测结果,调整做多做空规则,减少错误信号。

### 总结  

该策略通过比较价格与位移后的未来价格延伸线,判断价格未来走势方向,属于典型的趋势跟踪策略。总体来说逻辑清晰易懂,实施风险较小。通过参数优化和指标组合,可以获得较好的策略效果。

||

### Overview

The main idea of this strategy is to predict the future price trend by drawing future price extension lines and comparing the current price with the lines. It can make long or short positions accordingly when the price is higher or lower than the extension line.  

### Strategy Principle

The Future Lines of Demarcation (FLD) represents the median, highest or lowest price in a certain future period. The strategy uses FLD to determine the future price movement. The principle is:

1. Calculate the displacement period Period of FLD based on cycle length, which is the future price of Price.  
2. Compare current Close price with FLD's future price at displacement period.
    - When Close price is lower than future FLD price, it is a bullish signal.
    - When Close price is higher than future FLD price, it is a bearish signal.
3. Make corresponding long or short positions based on bullish and bearish signals.

### Advantage Analysis 

The main advantages of this strategy:

1. Using FLD to determine future trend has high accuracy. 
2. Customizable cycle parameter, adaptable to different market environments.  
3. Can choose median, highest or lowest price as FLD source, high adaptability.

### Risk Analysis

The main risks of this strategy:  

1. FLD itself may fail, resulting in missing opportunities or wrong signals. Can combine other indicators.
2. Improper cycle parameter settings may cause excessive wrong signals. Need cycle length optimization.  
3. Sudden price fluctuations causing FLD prediction failure. Can set stop loss to control risk.

### Optimization Directions   

The strategy can be optimized in the following aspects:

1. Combine with other indicators to filter signals and improve accuracy, e.g. MACD, KDJ etc.
2. Optimize cycle parameters to find best combination. 
3. Add stop loss and take profit mechanisms to control single trade loss and profit.
4. Adjust long and short rules based on backtest results to reduce wrong signals.  

### Summary   

The strategy judges future price trend by comparing price with displaced future price extension line. It's a typical trend following strategy. The logic is clear and easy to understand, with relatively small implementation risk. By parameter optimization and indicator combination, good strategy results can be obtained.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|40|Period|
|v_input_2_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-29 00:00:00
end: 2024-02-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 15/02/2017
//  An FLD is a line that is plotted on the same scale as the price and is in fact the 
//  price itself displaced to the right (into the future) by (approximately) half the 
//  wavelength of the cycle for which the FLD is plotted. There are three FLD's that can be 
//  plotted for each cycle:
//    An FLD based on the median price.
//    An FLD based on the high price.
//    An FLD based on the low price.
///////////////////////////////////////////////////////////////////
strategy(title="FLD's - Future Lines of Demarcation", overlay=true)
Period = input(title="Period", defval=40)
src = input(title="Source", defval=hl2)
reverse = input(false, title="Trade reverse")
FLD = src
pos = iff(FLD[Period] < close , 1,
       iff(FLD[Period] > close, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
         iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue)
plot(FLD, title="FLD", style=line, linewidth=1, color=black, offset = Period)
```

> Detail

https://www.fmz.com/strategy/441077

> Last Modified

2024-02-05 14:00:01
