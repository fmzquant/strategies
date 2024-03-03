
> Name

线性回归与双均线短线策略-Linear-Regression-and-Dual-Moving-Average-Short-Term-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19d8c86af2e4161cee9.png)
 [trans]

### 概述

本策略通过结合线性回归指标与双指数移动平均线,实现短线跟踪操作。策略基于价格突破上下轨时建仓做空,在价格重新突破时平仓。同时,该策略还利用双指数移动平均线判断价格趋势,作为建仓的辅助条件。

### 策略原理  

本策略主要通过线性回归指标来判断价格的突破。线性回归指标是根据一定周期内的最高价和最低价,采用线性回归法计算出的上下轨。当价格从上轨下穿或从下轨上穿时,我们认为是一个交易信号。

另外,该策略还引入双指数移动平均线判断中间趋势。双指数移动平均线可以更快响应价格变化。当价格从上轨下穿,如果此时双指数移动平均线已经位于价格上方,表明目前处于下跌趋势,这时我们建立做空仓位。当价格重新突破上轨或突破双指数移动平均线时,我们平掉仓位。

具体来说,策略主要包括以下几个要点:

1. 计算线性回归上轨和下轨
2. 计算双指数移动平均线
3. 当价格从上轨下穿,且双指数移动平均线高于价格时,建立做空仓位
4. 当价格重新突破上轨或高于双指数移动平均线时,平掉做空仓位

### 优势分析

相比传统移动平均线等指标,该策略具有以下几点优势:

1. 线性回归指标可以更快速捕捉价格变化,作为建仓信号更有效
2. 双指数移动平均线判断趋势更加敏感,可避免假突破
3. 结合双重指标和条件,可以过滤掉一些噪音,使交易更加稳定  

### 风险分析

该策略也存在一些风险需要注意:  

1. 线性回归指标对参数敏感,不同周期可能产生不同结果  
2. 双指数移动平均线可能出现背离,判断失误  
3. 突破类策略可能增加滑点风险  
4. 震荡行情中可能出现频繁开平仓

对于以上风险,我们可以通过参数优化、严格止损、适当放宽突破幅度等方法来解决。

### 优化方向  

该策略还可从以下几个方面进行优化:

1. 对线性回归周期和双指数移动平均线周期进行优化,找到最佳参数组合
2. 加入价格震荡幅度判断,避免价格微量突破造成错误信号
3. 增加成交量等辅助条件,确保突破有效性  
4. 设置止损层次缩小单笔损失
5. 针对特定品种调整参数

### 总结  

本策略综合运用线性回归指标和双指数移动平均线,在理论和实践上均有一定优势。通过不断优化调整,可以进一步提高稳定性和策略效果。该策略适合短线操作,可为量化交易者带来较好的alpha。

||

### Overview

This strategy combines linear regression indicators and dual exponential moving averages to implement short-term tracking operations. The strategy establishes short positions when prices break through the upper and lower rails, and closes positions when prices break through again. At the same time, this strategy also uses dual exponential moving averages to determine price trends as an auxiliary condition for establishing positions.

### Strategy Principle  

This strategy mainly uses linear regression indicators to determine price breakouts. The linear regression indicator is calculated based on the highest and lowest prices over a certain period using linear regression to obtain upper and lower rails. When prices break down from the upper rail or break up from the lower rail, we believe it is a trading signal.

In addition, this strategy also introduces dual exponential moving averages to determine the interim trend. Dual exponential moving averages can respond faster to price changes. When prices break down from the upper rail, if the dual exponential moving average is already above the price at this time, it indicates that it is currently in a downward trend. We will establish short positions. When prices break through the upper rail again or break through the dual exponential moving average, we will flatten positions.  

Specifically, the main points of the strategy include:  

1. Calculate linear regression upper and lower rails  
2. Calculate dual exponential moving average  
3. When the price breaks down from the upper rail and the dual exponential moving average is above the price, establish short positions  
4. When prices break through the upper rail again or are above the dual exponential moving average, flatten short positions

### Advantage Analysis 

Compared with traditional moving average and other indicators, this strategy has the following advantages:

1. Linear regression indicators can capture price changes faster and are more effective as entry signals  
2. Dual exponential moving averages determine trends more sensitively and can avoid false breakouts
3. Combining dual indicators and conditions can filter out some noise and make trading more stable

### Risk Analysis   

This strategy also has some risks to note:   

1. Linear regression indicators are sensitive to parameters and different cycles may produce different results
2. Dual exponential moving averages may deviate and judge wrongly  
3. Breakthrough strategies may increase slippage risks
4. Frequent opening and closing of positions may occur in volatile markets  

For the above risks, we can solve them by parameter optimization, strict stop loss, appropriately relaxing the breakthrough amplitude, etc.

### Optimization Directions

This strategy can also be optimized in the following aspects:  

1. Optimize linear regression cycle and dual exponential moving average cycle to find the best parameter combination  
2. Add price volatility judgment to avoid errors caused by slight price breakthroughs  
3. Increase auxiliary conditions such as trading volume to ensure the effectiveness of breakthroughs
4. Set stop loss levels to reduce single loss  
5. Adjust parameters for specific varieties  

### Summary   

This strategy comprehensively uses linear regression indicators and dual exponential moving averages, which has certain advantages in theory and practice. Further improvements in stability and strategy results can be achieved through continuous optimization and adjustment. This strategy is suitable for short-term operations and can bring good alpha to quantitative traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Start Year|
|v_input_2|12|Month|
|v_input_3|17|Day|
|v_input_4|89|Period|
|v_input_5|200|DEMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-26 00:00:00
end: 2024-01-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy('LR&SSL_Short', overlay=true)
startP = timestamp(input(2017, "Start Year"), input(12, "Month"), input(17, "Day"), 0, 0)
end   = timestamp(9999,1,1,0,0)
_testPeriod() => true

len = input(title="Period", defval=89)
smaHigh = linreg(high, len, 0)
smaLow = linreg(low, len, -1)
Hlv = 0.0
Hlv := close > smaHigh ? 1 : close < smaLow ? -1 : Hlv[1]
sslDown = Hlv < 0 ? smaHigh : smaLow
sslUp = Hlv < 0 ? smaLow : smaHigh

plot(sslDown, linewidth=2, color=color.red)
plot(sslUp, linewidth=2, color=color.lime)



length = input(200, title="DEMA") 
d1 = ema(close, length)                                               
d2 = 2 * d1 - ema(d1, length)                                         
trendColour = d2 > d1 ? #AAFFAA : #FFAAAA 
dema=sma(d2,length) 

turnGreen = d2 > d1 and d2[1] <= d1[1]  
turnRed   = d2 <= d1 and d2[1] > d1[1]  

up =turnGreen 
down=turnRed 
  
plotshape(down, title="down", style=shape.triangledown,location=location.abovebar, color=color.red, transp=0, size=size.small) 
plotshape(up,  title="up", style=shape.triangleup,location=location.belowbar, color=color.green, transp=0, size=size.small) 
plot(dema, color = trendColour,linewidth=3 ,transp = 0)
bgcolor(close > dema ? color.green : color.red)

strategy.entry("short", strategy.short, when= crossunder(sslUp, sslDown) and dema > close and _testPeriod())
strategy.close("short", when = crossover(sslUp, sslDown) or crossover(close, dema))

```

> Detail

https://www.fmz.com/strategy/440066

> Last Modified

2024-01-26 12:33:14
