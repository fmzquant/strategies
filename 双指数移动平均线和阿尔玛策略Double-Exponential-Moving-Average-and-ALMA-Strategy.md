
> Name

双指数移动平均线和阿尔玛策略Double-Exponential-Moving-Average-and-ALMA-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a8fa1de7ba0df2b286.png)
[trans]

### 概述

本策略结合了双指数移动平均线和阿尔玛指标来实现趋势跟踪和入场。其中,阿尔玛线作为主要的趋势过滤器,当价格在阿尔玛线之上做多,当价格在阿尔玛线之下做空。双指数移动平均线用于给出提前的趋势信号以便及早入场。

### 策略原理

1. 计算快线EMA1和慢线EMA2的双指数移动平均。
2. 计算阿尔玛线。
3. 当快线EMA1和慢线EMA2形成金叉时,如果价格高于阿尔玛线,做多;当EMA1和EMA2形成死叉时,如果价格低于阿尔玛线,做空。
4. 这样,阿尔玛线作为主要的趋势过滤器,避免在震荡市场中被套。而双指数移动平均线用于给出提前的趋势信号以便及早入场。

### 优势分析

1. 双指数移动平均线能提前反映价格趋势,避免进入震荡区间。
2. 阿尔玛线通过自适应平滑参数,能动态捕捉趋势,是一个很好的趋势过滤指标。
3. 两者结合,既考虑了趋势的及时性,也确保了入场的可靠性。

### 风险分析

1. 在价格剧烈波动的场合,双指数移动平均线可能发出错误信号。
2. 阿尔玛线存在滞后于价格的现象,可能导致部分走势被过滤掉。
3. 参数设置不当也会导致策略效果不佳。

解决方法:
1. 适当调整双指数移动平均线的周期,降低误信号率。
2. 调整阿尔玛线的参数,降低滞后性。
3. 做好参数优化,找到最佳参数组合。

### 优化方向 

1. 测试不同周期的双指数移动平均组合,找到最佳参数。
2. 测试阿尔玛线不同的窗口期、偏移量、sigma值,优化参数。
3. 结合其他指标,如波动率指标,进一步过滤信号。
4. 优化止损策略,控制单笔损失。

### 总结

本策略结合双指数移动平均线和阿尔玛指标,实现了趋势的及时跟踪和可靠的入场过滤。通过参数优化和止损策略的改进,可以进一步减少误信号,控制风险,提高策略效果。该策略适用于趋势性行情,特别是中长线交易。

||


### Overview

This strategy combines double exponential moving average and ALMA indicator to achieve trend following and entry. ALMA line serves as the main trend filter, going long when price is above ALMA line and going short when price is below ALMA line. Double EMA is used to give early trend signals for timely entry.  

### Strategy Logic

1. Calculate fast EMA1 and slow EMA2 of double exponential moving average.  
2. Calculate ALMA line.
3. When EMA1 and EMA2 form golden cross, go long if price is above ALMA line; when EMA1 and EMA2 form dead cross, go short if price is below ALMA line.  
4. So ALMA line serves as the main filter to avoid whipsaws during ranging market. And double EMA gives early trend signals for timely entry.

### Advantage Analysis 

1. Double EMA can reflect price trend ahead of time, avoiding entering ranging zone.  
2. ALMA line can dynamically capture trends with adaptive smoothness, which is a great trend filtering indicator.
3. The combination considers both timeliness of trend and reliability of entry.

### Risk Analysis

1. Double EMA may give false signals during violent price fluctuations. 
2. ALMA line has the issue of lagging behind prices, resulting in some trends being filtered out.  
3. Inappropriate parameter settings can also lead to poor strategy performance.

Solutions:
1. Adjust periods of double EMA properly to reduce false signals.  
2. Tune parameters of ALMA line to decrease lagging.
3. Do parameter optimization to find the best parameter combination.  

### Optimization Directions

1. Test double EMA with different period combinations to find the optimal parameters.  
2. Test ALMA line with different window size, offset and sigma values for parameter optimization.  
3. Incorporate other indicators like volatility index for further signal filtering.  
4. Optimize stop loss strategy to control single trade loss.

### Conclusion
This strategy combines double EMA and ALMA indicator to achieve timely trend following and reliable entry filtering. By improving parameter optimization and stop loss strategy, it can further reduce false signals, control risks and improve strategy performance. It is suitable for trending markets and medium-long term trading especially.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Window Size|
|v_input_2|0.85|Offset|
|v_input_3|6|Sigma|
|v_input_4|5|EMA-1|
|v_input_5|10|EMA-2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-15 00:00:00
end: 2023-12-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Author: HighProfit

//Lead-In
strategy("Double Exponential Moving Avarage & Arnoud Legoux Moving Avarage Strategy", shorttitle="ST-DEMA+ALMA", overlay=true)

//Arnoud Legoux Moving Avarage Inputs
source = close
windowsize = input(title="Window Size", defval=50)
offset = input(title="Offset", type=float, defval=0.85)
sigma = input(title="Sigma", type=float, defval=6)

//Exponential Moving Avarage Inputs
L1= input(5,"EMA-1")
L2= input(10,"EMA-2")

//Exponential Moving Avarage Calculations
e1= ema(close, L1)
e2= ema(close, L2)

//Conditions
longCondition = e1 and e2 > alma(source, windowsize, offset, sigma)
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = e1 and e2 < alma(source, windowsize, offset, sigma)
if (shortCondition)
    strategy.entry("Short", strategy.short)

//Plots   
plot(alma(source, windowsize, offset, sigma), color=lime, linewidth=1, title="ALMA")
plot(e1, color=orange, linewidth=1, title="EMA-1")
plot(e2, color=blue, linewidth=1, title="EMA-2")
```

> Detail

https://www.fmz.com/strategy/436220

> Last Modified

2023-12-22 12:44:55
