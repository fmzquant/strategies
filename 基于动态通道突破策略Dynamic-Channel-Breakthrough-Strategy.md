
> Name

基于动态通道突破策略Dynamic-Channel-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11be9ee78d7176ac20a.png)
[trans]
### 概述

本策略运用Keltner通道指标,结合移动平均线,设定动态突破买入和卖出价格,实现低买高卖的突破操作。策略可自动识别通道突破买入和卖出机会。

### 策略原理

1. 计算通道中轨:运用指数移动平均线计算价格中轨
2. 计算通道带宽:运用真实波幅或平均真实波幅或价格振幅的移动平均计算通道带宽
3. 通道上轨线和下轨线:中轨线±N倍的通道带宽
4. 入场顺序:当价格触碰上轨线时,设置突破买入价格,等待突破;当价格触碰下轨线时,设置突破卖出价格,等待突破
5. 出场顺序:买入后回落至中轨时或最高价超过入场价时止损;卖出后反弹至中轨时或最低价低于入场价时止损

### 优势分析

1. 使用动态通道,能够快速捕捉市场趋势变化
2. 运用中轨利于判断价格走势方向
3. N倍带宽设置让通道范围合理,避免频繁调整仓位
4. 运用突破机制,符合趋势理论,顺势而为
5. 设定止损条件严格控制风险

### 风险分析 

1. 中轨线计算方法选择会影响通道范围与价格匹配效果  
2. N倍数设置过大过小都会影响策略收益率
3. 突破买卖容易形成虚假信号,应严格止损

### 优化方向

1. 尝试不同的中轨线计算方法,寻找最佳参数
2. 测试不同的N值,找到最优倍数
3. 加大突破幅度,避免虚假信号
4. 优化止损逻辑,严格控制单笔损失

### 总结

本策略总体运用科学合理,通过动态通道指标判断价格走势和方向,设置合理参数捕捉突破信号,实现低买高卖,进而获取超额收益。同时对策略风险进行持续优化,使之能够在多种市场中稳定运行。

||

### Overview

This strategy uses the Keltner Channel indicator, combined with moving average lines, to set dynamic breakout buy and sell prices to achieve low-buy-high-sell breakthrough operations. The strategy can automatically identify channel breakout buy and sell opportunities.

### Strategy Principle  

1. Calculate channel median: Use exponential moving average to calculate the price median of the channel
2. Calculate channel bandwidth: Use the moving average of true volatility, average true volatility or price amplitude to calculate channel bandwidth  
3. Channel upper and lower rail: Median ± N times channel bandwidth  
4. Entry order: When the price touches the upper rail, set the breakthrough buy price and wait for the breakthrough; when the price touches the lower rail, set the breakthrough sell price and wait for the breakthrough
5. Exit order: Stop loss when price falls back to median after buying, or when highest price exceeds entry price; Stop loss when price bounces back to median after selling, or when lowest price is lower than entry price

### Advantage Analysis

1. Using dynamic channels can quickly capture changes in market trends  
2. Using median is conducive to judging the direction of price trends  
3. N times bandwidth setting makes the channel range reasonable to avoid frequent position adjustments  
4. Using breakthrough mechanisms conforms to trend theory and follows the trend
5. Setting stop loss conditions strictly controls risks  

### Risk Analysis

1. The selection of the method for calculating the median line will affect the matching effect of the channel range and prices  
2. Excessive large or small N multiples will affect the strategy's rate of return
3. Breakthrough buys and sells tend to form false signals and should be strictly stopped out

### Optimization Directions  

1. Try different median line calculation methods to find the optimal parameters  
2. Test different N values to find the optimal multiplier  
3. Increase the breakthrough amplitude to avoid false signals  
4. Optimize stop loss logic to strictly control single loss  

### Summary  

The overall strategy uses scientific and reasonable methods to judge price trends and directions through dynamic channel indicators, sets reasonable parameters to capture breakthrough signals, achieves low-buy-high-sell, and gains excess returns. At the same time, continuously optimize the risks of the strategy so that it can run stably in various markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|length|
|v_input_float_1|2|Multiplier|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|true|Use Exponential MA|
|v_input_string_1|0|Bands Style: Average True Range|True Range|Range|
|v_input_3|10|ATR Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-27 00:00:00
end: 2024-02-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Keltner Strategy", overlay=true)
length = input.int(20, minval=1)
mult = input.float(2.0, "Multiplier")
src = input(close, title="Source")
exp = input(true, "Use Exponential MA")
BandsStyle = input.string("Average True Range", options = ["Average True Range", "True Range", "Range"], title="Bands Style")
atrlength = input(10, "ATR Length")
esma(source, length)=>
	s = ta.sma(source, length)
	e = ta.ema(source, length)
	exp ? e : s
ma = esma(src, length)
rangema = BandsStyle == "True Range" ? ta.tr(true) : BandsStyle == "Average True Range" ? ta.atr(atrlength) : ta.rma(high - low, length)
upper = ma + rangema * mult
lower = ma - rangema * mult
crossUpper = ta.crossover(src, upper)
crossLower = ta.crossunder(src, lower)
bprice = 0.0
bprice := crossUpper ? high+syminfo.mintick : nz(bprice[1])
sprice = 0.0
sprice := crossLower ? low -syminfo.mintick : nz(sprice[1])
crossBcond = false
crossBcond := crossUpper ? true
     : na(crossBcond[1]) ? false : crossBcond[1]
crossScond = false
crossScond := crossLower ? true
     : na(crossScond[1]) ? false : crossScond[1]
cancelBcond = crossBcond and (src < ma or high >= bprice )
cancelScond = crossScond and (src > ma or low <= sprice )
if (cancelBcond)
	strategy.cancel("KltChLE")
if (crossUpper)
	strategy.entry("KltChLE", strategy.long, stop=bprice, comment="KltChLE")
if (cancelScond)
	strategy.cancel("KltChSE")
if (crossLower)
	strategy.entry("KltChSE", strategy.short, stop=sprice, comment="KltChSE")
```

> Detail

https://www.fmz.com/strategy/442941

> Last Modified

2024-02-27 15:15:07
