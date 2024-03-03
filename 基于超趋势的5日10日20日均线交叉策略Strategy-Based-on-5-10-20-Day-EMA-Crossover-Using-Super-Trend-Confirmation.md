
> Name

基于超趋势的5日10日20日均线交叉策略Strategy-Based-on-5-10-20-Day-EMA-Crossover-Using-Super-Trend-Confirmation

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/124e1b5c8ab66817e1b.png)
 [trans]

## 概述

本策略通过计算5日、10日和20日的指数移动平均线(EMA),结合超趋势指标来产生买入和卖出信号。当5日线上穿10日线,并且5日线和10日线均上穿20日线时产生买入信号;当10日线下穿5日线,并且5日线和10日均下穿20日线时产生卖出信号。

## 策略原理  

1. 计算5日EMA、10日EMA和20日EMA。
2. 计算超趋势指标。
3. 当5日EMA大于10日EMA,且5日EMA和10日EMA都大于20日EMA时,即5日线和10日线上穿20日线,产生买入信号。  
4. 当10日EMA小于5日EMA,且5日EMA和10日EMA都小于20日EMA时,即5日线和10日线下穿20日线,产生卖出信号。
5. 同时结合超趋势指标判断市场趋势,只有在超趋势指标显示为向下趋势时才产生买入信号,向上趋势时才产生卖出信号。


## 策略优势

1. 简单有效,容易理解和实现。  
2. 结合三条均线和超趋势,判断信号更加准确可靠。  
3. 运用5日、10日、20日三条均线,视野全面,对短期、中期和长期趋势判断准确。
4. 因考虑超趋势判断技术与中短期均线技术相结合,避免被大级别做市操控。
5. 可配置参数灵活,可针对不同品种和市况做调整优化。
6. 检测交易机会准确,损益比高。
7. 实现简单,易于理解,易于扩展和自定制。

## 策略风险 

1. 大盘震荡剧烈市场中,存在较多假信号,退出时机容易失误。 
2. 均线系统对参数非常敏感,参数设定不当可能导致亏损。
3. 超趋势多空判断存在滞后性,需要结合其他技术指标确认。
4. 无法应对极端行情,如暴跌、瞬间跳空等情况。

**主要风险的解决方案:**  

1. 结合更多技术指标或基本面分析对信号进行二次确认。  
2. 增加止损策略,避免损失扩大。  
3. 结合短线和中长线指标优化参数设置。 
4. 实时监控指数的波动率和超趋势指标的表现,必要时手动干预。

## 策略优化方向

1. 结合更多的均线系统和技术指标判断,如MACD、KD等。
2. 添加自动止损、止盈策略。
3. 根据不同品种和市场情况,优化超趋势和均线系统的参数。  
4. 增加模型评估,根据历史数据进行参数优化和策略优化。
5. 增加机器学习预测模块,判断价格趋势和潜在交易机会。


## 总结  

本策略运用5日、10日和20日三条均线以及超趋势指标构建交易策略。策略简单高效,在趋势判断和发现机会上表现优异。同时具备较强的可定制性和扩展性。优化空间较大,可通过调整参数、增加技术指标以及加入机器学习等方式不断改进策略表现,适应更加复杂的市场环境。

||

## Overview  

This strategy calculates the 5-day, 10-day and 20-day exponential moving average (EMA) lines and uses the Super Trend indicator to generate buy and sell signals. It generates buy signals when the 5-day EMA crosses above the 10-day EMA and both the 5-day and 10-day EMA cross above the 20-day EMA. It generates sell signals when the 10-day EMA crosses below the 5-day EMA and both the 5-day and 10-day EMA cross below the 20-day EMA.  

## Strategy Logic   

1. Calculate the 5-day EMA, 10-day EMA and 20-day EMA.  
2. Calculate the Super Trend indicator.
3. When 5-day EMA is greater than 10-day EMA, and both 5-day and 10-day EMA are greater than 20-day EMA, which means 5-day and 10-day EMA cross above 20-day EMA, generate buy signal.   
4. When 10-day EMA is less than 5-day EMA, and both 5-day and 10-day EMA are less than 20-day EMA, which means 5-day and 10-day EMA cross below 20-day EMA, generate sell signal.  
5. Also use Super Trend indicator to determine market trend. Generate buy signals only when Super Trend shows downward trend, and generate sell signals only when Super Trend shows upward trend.

## Advantages of the Strategy  

1. Simple and effective, easy to understand and implement.   
2. More accurate and reliable signals by combining three EMA lines and Super Trend indicator.
3. Comprehensive judgement on short-term, medium-term and long-term trends using 5-day, 10-day and 20-day EMA.  
4. Avoid being manipulated by combining technical and momentum indicators.  
5. Flexible adjustable parameters for different products and market conditions.  
6. Accurate detection of trading opportunities with high risk-reward ratio.  
7. Simple to understand, easy to extend and customize.  

## Risks of the Strategy   

1. More false signals may occur during violent market fluctuation. Exits may not be timely.  
2. EMA system is sensitive to parameters. Improper settings may lead to losses. 
3. Super Trend trend judgment has lagging effect. Needs confirmation from other indicators.  
4. Cannot cope with extreme market events like flash crash.  

**Solutions to Major Risks:**

1. Add more technical indicators or fundamental analysis to confirm signals.   
2. Add stop loss strategy to limit losses.
3. Optimize parameters by combining short-term and long-term indicators.  
4. Monitor index volatility and Super Trend performance. Manually intervene if necessary.  

## Directions for Strategy Optimization  

1. Add more EMA systems and technical indicators like MACD, KD etc.  
2. Add auto stop loss, take profit features.
3. Optimize Super Trend and EMA parameters based on different products and market conditions.   
4. Add backtesting to optimize parameters and strategy based on historical data.  
5. Add machine learning prediction model to forecast price trends and potential trading opportunities.

## Summary   

The strategy uses 5-day, 10-day and 20-day EMA together with Super Trend indicator. It is simple yet effective, performs great in trend identification and opportunity discovery. Highly customizable and extensible. Huge room for optimization via parameter tuning, adding more indicators and machine learning models to continuously improve strategy performance in more complex market environments.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|EMA 1|
|v_input_2|10|EMA 2|
|v_input_3|20|EMA 3|
|v_input_4|2|mult|
|v_input_5|14|len|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-12 00:00:00
end: 2023-12-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © aadilpatel07

//@version=4
strategy("5-10-20 Cross", overlay=true)
src = close, 
len1 = input(5, minval=1, title="EMA 1")
len2 = input(10, minval=1, title="EMA 2")
len3 = input(20, minval=1, title="EMA 3")

mult = input(type=input.float, defval=2)
len = input(type=input.integer, defval=14)
[superTrend, dir] = supertrend(mult, len)

ema1 = ema(src, len1)
ema2 = ema(src, len2)
ema3 = ema(src, len3)

//EMA Color
col1 = color.lime
col2 = color.blue
col3 = color.red

//EMA Plots
plot(series=ema1,color=col1, title="EMA1")
plot(series=ema2,color=col2, title="EMA2")
plot(series=ema3,color=col3, title="EMA3")

//plot SuperTrend
colResistance = dir == 1 and dir == dir[1] ? color.new(color.red, 100) : color.new(color.green, 100)
colSupport = dir == -1 and dir == dir[1] ? color.new(color.green, 0) : color.new(color.green, 10)
plot(superTrend, color = colResistance, linewidth=1)
plot(superTrend, color = colSupport, linewidth=1)

//longCondition = crossover(ema1, ema2) and crossover(ema1,ema3) and crossover(ema2,ema3)
longCondition = ema1 > ema2 and ema1 > ema3 and ema2 > ema3 and ema2 < ema1 and dir == -1
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

//shortCondition = crossover(ema2, ema1) and crossover(ema3,ema1) and crossover(ema3,ema2)
shortCondition = ema1 < ema2 and ema1 < ema3 and ema2 < ema3 and ema2 > ema1 and dir == 1
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
```

> Detail

https://www.fmz.com/strategy/435828

> Last Modified

2023-12-19 10:39:36
