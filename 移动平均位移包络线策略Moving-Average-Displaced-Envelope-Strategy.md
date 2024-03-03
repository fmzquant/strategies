
> Name

移动平均位移包络线策略Moving-Average-Displaced-Envelope-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15e93b609a51ed804a3.png)
[trans]

该策略基于移动平均线位移包络线指标进行交易信号生成。其中,包络线通过移动平均线的百分比因子来计算。如果前期高点突破上轨,则产生卖出信号;如果前期低点跌破下轨,则产生买入信号。

## 策略原理

该策略使用 displaced exponential moving average (EMA)作为核心指标,并在其一定周期之后,通过百分比因子扩大形成上下轨。这构成了完整的移动平均位移包络线系统。具体来说,包络线系统由以下组成:

* EMA(Price, Period) - 核心指数移动平均线
* top = sEMA\[disp\] \* ((100 + perAb)/100) - 上轨
* bott = sEMA\[disp\] \* ((100 - perBl)/100) - 下轨

其中Percent above和Percent below分别控制上下轨相对核心指数移动平均线的百分比区间。Displacement参数用于控制上下轨线与核心指数移动平均线之间的周期位移。

通过这种方式,我们可以通过调整上述参数,形成合适的交易区间。如果价格突破区间,则产生交易信号。具体来说:

* 如果收盘价低于下轨bott,则产生买入信号
* 如果收盘价高于上轨top,则产生卖出信号

需要注意的是,该策略还提供了reverse参数,如果设置为true,则信号方向与上述相反。

## 优势分析

该策略主要具有以下优势:

1. 使用指数移动平均线作为基础指标,可减少曲线的滞后性,提高对价格变化的敏感性
2. 可调参数较多,可以通过参数优化获得更好的交易结果
3. 提供reverse模式,可以适应不同类型的市场
4. 规则简单清晰,容易理解和实现

## 风险与防范

该策略也存在一些风险,主要包括:

1. 在震荡行情中容易产生虚假信号
2. 参数设置不当可能导致过度交易或信号遗漏
3. 不能有效过滤市场噪音,可能产生一些无价值信号

为防范这些风险,我们可以从以下几个方面进行优化:

1. 结合其他指标过滤信号,例如交易量、波动率等
2. 增加参数优化流程,寻找最佳参数组合
3. 适当调整止损策略,控制单笔损失

## 优化思路

该策略还有很大的优化空间,主要可以考虑从以下几个方面进行:

1. 增加机器学习模型,实现参数的自动优化和调整
2. 将止损、移动止损、 trailing stop等功能加入,可有效控制风险
3. 结合情绪指标、投资者情绪进行信号过滤,提升信号质量
4. 增加模型组合,结合其他技术指标识别趋势,提高整体准确率
5. 继承该策略模板,开发其他类型的指数均线系统,扩大适用范围

通过这些优化,可以进一步增强策略的稳定性、适应性和效果。

## 总结

移动平均位移包络线策略利用简单的指数移动平均系统与参数化区间,形成清晰的交易规则,易于解释和实施,属于一种较为典型的趋势跟踪策略。通过参数调整和优化,该策略可以产生较好的效果。但也需要充分考虑市场环境的影响,并防范潜在的风险。本策略为基础模板,后续仍有很大的拓展与优化空间。

||

This strategy generates trading signals based on the Moving Average Displaced Envelope indicator. The envelope bands are calculated by percentage factors of the moving average. If the previous high breaks above the upper band, a sell signal is generated. If the previous low breaks below the lower band, a buy signal is generated.

## Strategy Logic

This strategy uses the displaced exponential moving average (EMA) as the core indicator, and forms the upper and lower bands after a certain period by percentage factors. This constructs the complete moving average displaced envelope system. Specifically, the envelope system consists of:

* EMA(Price, Period) - The core moving average line  
* top = sEMA\[disp\] \* ((100 + perAb)/100) - Upper band
* bott = sEMA\[disp\] \* ((100 - perBl)/100) - Lower band

Here Percent above and Percent below control the percentage range of the bands relative to the core moving average line. The Displacement parameter controls the period displacement between the bands and the core moving average line.  

In this way, we can form appropriate trading ranges by adjusting the above parameters. Trading signals are generated when prices break through the bands. Specifically:

* If close is lower than the lower band bott, a buy signal is generated
* If close is higher than the upper band top, a sell signal is generated

Note that this strategy also provides a reverse parameter. If set to true, the signal direction is opposite to the above.

## Advantage Analysis

The main advantages of this strategy are:

1. Using exponential moving average as the base indicator can reduce curve lagging and improve sensitivity to price changes  
2. More adjustable parameters allow better optimization of trading performance through parameter tuning
3. The reverse mode adapts to different market types  
4. Simple and clear rules, easy to understand and implement

## Risks and Precautions 

There are also some risks with this strategy:

1. False signals can occur frequently in range-bound markets  
2. Improper parameter settings may cause over-trading or signal missing
3. Market noise cannot be filtered effectively, generating some worthless signals

To prevent these risks, some optimizations can be made:  

1. Filter signals with other indicators like volume, volatility etc. 
2. Add parameter optimization process to find optimum parameter sets
3. Adjust stop loss properly to limit losses

## Optimization Directions

There is still large room for optimizing this strategy:

1. Add machine learning models to realize automatic parameter optimization and adjustment
2. Incorporate features like stop loss, trailing stop to control risks
3. Filter signals with sentiment indicators to improve quality 
4. Increase model combinations with other technical indicators to identify trends and improve overall accuracy  
5. Inherit this strategy template to develop other types of moving average systems and expand applicability

With these optimizations, the stability, adaptability and performance of the strategy can be further improved.

## Summary  

The moving average displaced envelope strategy utilizes simple exponential moving average systems and parameterized bands to form clear trading rules that are easy to interpret and implement. It is a typical trend following system. Through parameter tuning and optimizations, good results can be achieved. But the impacts of market environments should also be fully considered and potential risks should be prevented. This strategy serves as a basic template and has much room for expansions and optimizations.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|9|Period|
|v_input_3|0.5|Percent above|
|v_input_4|0.5|Percent below|
|v_input_5|13|Displacement|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-25 00:00:00
end: 2024-02-01 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 14/08/2020
// Moving Average Displaced Envelope. These envelopes are calculated 
// by multiplying percentage factors with their displaced expotential 
// moving average (EMA) core.
// How To Trade Using:
// Adjust the envelopes percentage factors to control the quantity and 
// quality of the signals. If a previous high goes above the envelope 
// a sell signal is generated. Conversely, if the previous low goes below 
// the envelope a buy signal is given.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Moving Average Displaced Envelope Backtest", shorttitle="MA DE", overlay = true)
Price = input(title="Source", type=input.source, defval=close)
Period =input(defval=9, minval=1)
perAb = input(title = "Percent above", defval=.5, minval=0.01, step = 0.1)
perBl = input(title = "Percent below", defval=.5, minval=0.01, step = 0.1)
disp = input(title = "Displacement", defval=13, minval=1) 
reverse = input(false, title="Trade reverse")
pos = 0
sEMA = ema(Price, Period)
top = sEMA[disp] * ((100 + perAb)/100)
bott = sEMA[disp]* ((100 - perBl)/100)
pos := iff(close < bott , 1,
	     iff(close > top, -1, pos[1])) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/440851

> Last Modified

2024-02-02 17:02:18
