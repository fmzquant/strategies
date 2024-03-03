
> Name

基于趋势追踪均线战略Trend-Following-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b18e3fed1a156606fb.png)
[trans]
### 概述

该策略通过计算通道均线,在价格突破通道均线时建立多头或空头头寸,追踪股票价格趋势,属于趋势追踪类策略。

### 策略原理  

该策略首先计算20日高点平均值作为通道上轨,20日低点平均值作为通道下轨,并计算通道中线。通道中线代表近期价格平均趋势。当价格上穿通道中线时,建立多头头寸;当价格下穿通道中线时,建立空头头寸。追踪价格趋势,直到价格重新回落到通道区间反向时,平仓头寸。

### 优势分析

- 利用通道追踪价格趋势,避免资金被横盘市锁定;
- 通过通道上下轨判断买卖点位,入场容易控制;
- 通道范围过滤掉部分噪音,加大获利概率;
- 可配置通道参数,调整策略的灵敏度;

### 风险分析

- 大幅突破通道中线过后可能出现回调测试中线的情况,此时会被套;
- 震荡类型股票不适合该策略,容易出现高频交易套利;
- 参数设置不当也可能影响策略效果;

### 优化方向

- 优化通道周期参数,测试不同参数对策略效果的影响;
- 增加止盈止损策略,控制单次亏损和全部亏损; 
- 结合其他指标作为辅助判断,避免错误信号;
- 分阶段建仓,降低突破回调测试中线的被套概率;

### 总结  

该策略整体来说较为简单直接,通过基本的价格通道来判断股票价格趋势,属于趋势追踪类型策略。优点是容易操作,充分利用价格趋势带来的投资机会,避免资金被锁定。缺点是参数设置不当可能影响效果,且存在一定回调测试的风险。通过合理优化,可以提高策略稳定性,增强实盘表现。

||

### Overview

This strategy calculates the channel moving average lines and establishes long or short positions when the price breaks through the channel lines to follow the trend of the stock price. It belongs to the trend following strategy.  

### Strategy Principle   

The strategy first calculates the 20-day high average as the upper rail of the channel, the 20-day low average as the lower rail of the channel, and calculates the midline of the channel. The midline of the channel represents the recent average price trend. When the price breaks through the midline of the channel upwards, a long position is established. When the price breaks through the midline of the channel downwards, a short position is established. Follow the price trend until the price falls back to the opposite side of the channel range, close the position.

### Advantage Analysis

- Use the channel to track price trends, avoid funds being locked in ranging markets; 
- Channel rails help determine entry and exit points, making it easy to control entries;
- The channel range filters out some noise and increases profit probability;  
- The channel parameters can be adjusted to tune the sensitivity of the strategy;

### Risk Analysis  

- Significant midline breakouts may be followed by pullback tests of the midline, resulting in being trapped;
- Oscillating stocks are not suitable for this strategy and may lead to high frequency trading;   
- Improper parameter settings may also affect strategy performance;  

### Optimization Directions

- Optimize channel cycle parameters to test impacts of different parameters;
- Add profit taking and stop loss strategies to control single and total losses;
- Combine other indicators as auxiliary judgements to avoid wrong signals; 
- Take positions in batches to reduce the probability of being trapped during pullback tests;   

### Summary   

In general, this strategy is relatively simple and straightforward. It judges stock price trends through basic price channels and belongs to the trend following type. The advantages are easy operation, full use of investment opportunities brought by price trends, and avoiding fund lock-ups. The disadvantages are that improper parameter settings may affect performance and there are certain risks of pullback tests. Through reasonable optimization, the stability of the strategy can be improved and real trading performance can be enhanced.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2000|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2019|Backtest Start Year|
|v_input_5|3|testEndMonth|
|v_input_6|31|Backtest Start Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//future strategy
//strategy(title = "stub", default_qty_type = strategy.fixed, default_qty_value = 1,  overlay = true, commission_type=strategy.commission.cash_per_contract,commission_value=2)
//stock strategy
strategy(title = "dc", default_qty_type = strategy.percent_of_equity, default_qty_value = 20,  overlay = true, commission_type=strategy.commission.cash_per_contract,commission_value=.005)
//forex strategy
//strategy(title = "stub", default_qty_type = strategy.percent_of_equity, default_qty_value = 20,  overlay = true)
//crypto strategy
//strategy(title = "stub", default_qty_type = strategy.percent_of_equity, default_qty_value = 20,  overlay = true, commission_type=strategy.commission.percent,commission_value=.25,default_qty_value=20)


testStartYear = input(2000, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testEndYear = input(2019, "Backtest Start Year")
testEndMonth = input(3)
testEndDay = input(31, "Backtest Start Day")
testPeriodEnd = timestamp(testStartYear,testStartMonth,testStartDay,0,0)


testPeriod() =>
    true
    //time >= testPeriodStart  ? true : false

dcPeriod = 20

dcUpper = highest(close, dcPeriod)[1]
dcLower = lowest(close, dcPeriod)[1]
dcAverage = (dcUpper + dcLower) / 2

plot(dcLower, style=line, linewidth=3, color=red, offset=1)
plot(dcUpper, style=line, linewidth=3, color=aqua, offset=1)

plot(dcAverage, color=black, style=line, linewidth=3, title="Mid-Line Average")

strategy.entry("simpleBuy", strategy.long, when=close > dcAverage)
strategy.close("simpleBuy",when=close < dcLower)
    
strategy.entry("simpleSell", strategy.short,when=close < dcAverage)
strategy.close("simpleSell",when=close > dcAverage)
    


```

> Detail

https://www.fmz.com/strategy/443123

> Last Modified

2024-02-29 14:00:35
