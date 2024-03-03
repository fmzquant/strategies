
> Name

移动平均差值零轴交叉策略Moving-Average-Difference-Zero-Cross-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fba222f1ecd01ae531.png)
[trans]

### 概述

该策略运用移动平均线差值法判断股价与均线偏离度,并结合零轴交叉系统发出交易信号。基本思路是,当价格从上方接近均线时看跌,当价格从下方接近均线时看涨。

### 策略原理  

1. 计算8日指数移动平均线ema和过去8日中的最低移动平均线lowestEMA
2. 计算价格与当前移动平均线ema的差值diff
3. 判断diff小于0为看跌信号,diff上穿0为底背离,看涨信号
4. 结合diff的数值大小比较过去一周最大跌幅,发出交易信号

### 优势分析

1. 利用双均线系统,能够有效过滤假突破
2. 运用最小价格理论,发现底部信号
3. 结合数值比较判断超跌超买,避免追高杀跌

### 风险分析  

1. 双均线策略容易产生 whipsaw  effect
2. 需关注交易频率过高的问题 
3. 合理设置移动平均线参数很关键

### 优化方向  

1. 调整移动平均线周期参数,适应不同周期
2. 增加成交量指标过滤假突破信号
3. 结合 stochastic 指标避免超跌超买

### 总结  

本策略整合均线差值法和零轴交叉判断系统,旨在提高买卖点探测准确性。但仍需进一步优化参数设置,并配合其他指标过滤信号。总的来说,该策略利用简单指标判断效果尚可,可作为基础策略之一运用于实盘。

||

### Overview

This strategy uses the moving average difference method combined with zero axis crossover to determine buy and sell signals. The basic idea is that when the price approaches the moving average line from above, it is considered as bearish signal, and when the price approaches the moving average line from below, it is considered as bullish signal.

### Strategy Principle

1. Calculate the 8-period exponential moving average ema and the lowest moving average over the past 8 days lowestEMA
2. Calculate the difference diff between the price and the current moving average ema  
3. When diff is less than 0, it is a bearish signal. When diff crosses above 0, it is a bottom divergence signal, indicating bullish.
4. Combine the numerical value of diff to compare the maximum decline over the past week to generate trading signals

### Advantage Analysis 

1. Using the dual moving average system can effectively filter false breakthroughs
2. Applying the minimum price theory to discover bottom signals  
3. Numerical comparison to judge oversold and overbought conditions, avoiding chasing highs and killing lows

### Risk Analysis   

1. Dual moving average strategies are prone to whipsaw effects
2. Need to pay attention to the problem of excessive trading frequency
3. Reasonable setting of moving average parameters is critical

### Optimization Directions

1. Adjust the moving average period parameters to adapt to different cycles
2. Increase volume indicators to filter false breakthrough signals 
3. Combine the stochastic indicator to avoid oversold and overbought conditions  

### Summary

This strategy integrates the moving average difference method and zero axis crossover system to improve the accuracy of buy and sell point detection. However, further optimization of parameter settings and combination with other indicators to filter signals are still needed. In general, this simple indicator strategy has considerable efficacy and can be used as a basic strategy for live trading.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-19 00:00:00
end: 2024-01-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title = "Estratégia diferença menor preço de 8")

// Configuração da Média Móvel
emaPeriod = 8

ema= ema(close, emaPeriod)
ema1= ema(close[1], emaPeriod)
lowestEMA = lowest(ema, 8)

// Calcula a diferença entre o preço e a média móvel
diff = close - ema
diff1 = close[1] - ema1
diffLow = ema - lowestEMA

//Condições
diffZero = diff < 0
diffUnder = diff < diffLow
diffUm = diff > 0
Low0 = diffLow == 0




// Sinais de entrada
buy_signal = diffUnder and crossover(diff, diff1) 
sell_signal = diffUm and diffUnder and crossunder(diff, diff1)

// Executa as operações de compra/venda
if buy_signal
    strategy.entry("Buy", strategy.long)
if sell_signal
    strategy.exit("Buy")

// Plota as linhas
plot(0, title="Linha Zero", color=color.gray)
plot(diff, title="Diferença", color=color.blue, linewidth=2)

plot(diffLow, title="Diferença", color=color.red, linewidth=2)

```

> Detail

https://www.fmz.com/strategy/440095

> Last Modified

2024-01-26 15:45:03
