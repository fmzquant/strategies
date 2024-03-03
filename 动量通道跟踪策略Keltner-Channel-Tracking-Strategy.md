
> Name

动量通道跟踪策略Keltner-Channel-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/e3b0c079fd0d658d0b.png)
[trans]

### 概述

本策略基于动量通道指标设计交易信号,根据价格突破通道上下轨来产生买入和卖出信号。策略只做多头交易,如果出现卖出信号,则平仓至空仓状态。

### 策略原理  

本策略使用SMA平均线及ATR真实波动幅度构建动量通道。通道的上轨和下轨分别为:

上轨 = SMA + ATR * 系数
下轨 = SMA - ATR * 系数

当价格上穿上轨时,产生买入信号;当价格下穿下轨时,产生卖出信号。

由于只做多头,所以如果出现卖出信号,则取消之前的开仓订单,平仓至空仓状态。

具体来说,策略逻辑如下:

1. 使用SMA和ATR构建动量通道
2. 当价格上穿上轨时,设定开仓价格并下单做多
3. 当价格下穿下轨时,平掉之前的做多单,使仓位为空仓

### 优势分析

本策略具有以下优势:

1. 策略逻辑简单清晰,容易理解实现
2. 动量通道指标直观,对市场趋势判断准确
3. 只做多头交易,避免追踪止损风险
4. 条件单下单,有利于精准entries

### 风险分析 

本策略也存在一些风险:  

1. 市场震荡时,可能出现频繁开平仓
2. 只做多头,无法利用空头机会
3. 没有退出机制,需要人工判断退出点

对策:

1. 优化通道参数,降低误差信号
2. 增加空头模块,做双向交易
3. 加入移动止损, trailing stop等退出机制

### 优化方向

本策略可以从以下几个方面进行优化:

1. 优化参数,调整通道周期,波动率系数等参数
2. 增加空头模块,根据价格下穿下轨产生卖出信号
3. 加入止损机制,结合ATR尾随止损
4. 考虑加入更多过滤条件,避免错误信号
5. 测试不同品种合约的效果

### 总结  

本策略基于动量通道指标,简单有效地捕捉市场趋势。策略逻辑清晰易懂,通过价格突破通道上下轨来产生交易信号。虽然只做多头和没有退出机制等不足,但可通过参数优化、增加空头模块、加入止损等方式进行改进。总体而言,本策略具有非常大的改进空间,是值得深度研究和应用的量化策略。


|| 

### Overview  

This strategy is designed based on the Keltner Channel indicator to generate trading signals when price breaks through the upper and lower bands of the channel. The strategy only goes long, if a sell signal appears, it will flatten the position to neutral.   

### Strategy Logic

The strategy uses SMA and ATR to build the Keltner Channel. The upper and lower bands are calculated as:  

Upper Band = SMA + ATR * Multiplier
Lower Band = SMA - ATR * Multiplier

When price breaks above the upper band, a buy signal is generated. When price breaks below the lower band, a sell signal is generated.  

Since it only goes long, if a sell signal appears, it will cancel previous orders and flatten the position.  

The logic is:

1. Build Keltner Channel with SMA and ATR  
2. When price breaks above upper band, set entry price and go long
3. When price breaks below lower band, flatten previous long position 

### Advantage Analysis   

The advantages of this strategy:

1. Simple and clear logic, easy to understand and implement
2. Keltner Channel is intuitive for trend identification  
3. Only go long avoids chasing stop loss risk
4. Conditional orders for precision entries 

### Risk Analysis

There are also some risks:

1. Frequent open/close trades during market fluctuation
2. Unable to take advantage of short opportunities 
3. Lack of exit mechanism, need manual intervention

Solutions:

1. Optimize channel parameters to reduce false signals
2. Add short module for two-way trading
3. Add exit mechanisms like moving stop loss, trailing stop

### Optimization Directions  

The strategy can be optimized in the following aspects:

1. Optimize parameters like channel period, ATR multiplier etc
2. Add short module based on lower band breakout   
3. Incorporate stop loss mechanisms like ATR trailing stop
4. Consider more filters to avoid false signals
5. Test effectiveness across different products  

### Conclusion   

This strategy effectively catches market trends with simple Keltner Channel rules. The logic is clear and easy to understand. Although the lack of exits and short module, it has great potential for improvements like parameter tuning, adding stops, going short etc. Overall a valuable quant strategy worth in-depth research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|useTrueRange|
|v_input_2|20|length|
|v_input_3|true|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-24 00:00:00
end: 2023-12-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Keltner Channel Strategy", overlay=true)
source = close

useTrueRange = input(true)
length = input(20, minval=1)
mult = input(1.0)

ma = sma(source, length)
range = useTrueRange ? tr : high - low
rangema = sma(range, length)
upper = ma + rangema * mult
lower = ma - rangema * mult

crossUpper = crossover(source, upper)
crossLower = crossunder(source, lower)

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

cancelBcond = crossBcond and (source < ma or high >= bprice )
cancelScond = crossScond and (source > ma or low <= sprice )

if (cancelBcond)
    strategy.cancel("KltChLE")

if (crossUpper)
    strategy.entry("KltChLE", strategy.long, stop=bprice, comment="KltChLE")

if (cancelScond)
    strategy.cancel("KltChSE")

if (crossLower)
    strategy.entry("KltChSE", strategy.short, stop=sprice, comment="KltChSE")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/436498

> Last Modified

2023-12-25 13:14:24
