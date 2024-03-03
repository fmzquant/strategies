
> Name

一种基于带通滤波反转策略Bandpass-Filter-Reversed-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17cb875618693df1e9c.png)
[trans]
### 概述

带通滤波反转策略是一种基于带通滤波器的股票交易策略。它通过构建一个cos和正弦函数,来模拟一个带通滤波器,并生成买入和卖出信号。当滤波器输出高于或低于某个触发水平时,该策略会进行反向操作,即买入或卖出。

### 策略原理

该策略的核心是构建一个带通滤波器BP,它由两个参数组成:中心频率和带宽。中心频率决定了滤波器通过的主要周期,带宽决定了通过的周期范围。这些参数决定了滤波器的传递特性。

具体来说,该策略构建了以下几个变量:

- Length:滤波器的中心周期 
- Delta: 带宽参数
- Beta:与中心频率相关的系数
- Gamma:与带宽相关的系数
- Alpha:与Beta、Gamma有关的中间变量

根据这些变量,策略构建出了一个一阶IIR(无限脉冲响应)滤波器:

BP = 0.5\*(1 - alpha)\*(xPrice - xPrice\[2\]) + beta\*(1 + alpha)*nz(BP\[1\]) - alpha\*nz(BP\[2\])

当BP高于或低于TriggerLevel时,该策略会进行相反方向的操作。

### 优势分析

该策略的主要优势有:

1. 使用带通滤波器,可以滤除高频和低频噪声,只提取 Useful的中频周期信号,提高信噪比。
2. 相对简单直观,只需要调整几个参数,就可以适应不同周期和市场环境。
3. 采用反转策略,可以及时捕捉价格短期反转现象,获利后快速平仓,降低持仓风险。

### 风险分析

该策略也存在一些风险:

1. 带通滤波器的参数设置需要根据不同周期和市场环境调整,如果设置不当,会错过交易机会或者产生更多错误信号。
2. 反转策略容易受到错觉反转的影响, если反转不成立、价格继续原方向运行,会造成损失。
3. 交易频率可能较高,需要注意防止超优化,并控制交易成本。

为了降低这些风险,可以考虑以下几个优化方法:

1. 采用自适应滤波器,根据市场变化自动调整参数。
2. 结合趋势过滤器,避免逆势开仓。  
3. 优化参数组合,使策略参数化,适应更多市场情况。

### 优化方向  

该策略主要可以从以下几个方面进行优化:

1. 周期和参数自适应:根据不同周期及最近一个时间窗口的价格行情,实时调整 Length、Delta 等参数,使滤波器动态适应市场环境变化。

2. 结合趋势判断:在带通滤波器基础上加入 MACD、MA 等技术指标判断趋势方向,避免逆势开仓。

3. 多时间框架结合:在多个时间框架(例如 5 分钟、15 分钟、30 分钟等)部署策略,不同时间框架之间进行信号验证,提高信号准确率。

4.止损机制:设定合理的止损位置,在亏损达到止损位后主动平仓止损,有效控制单笔亏损大小。

通过以上几点优化,可以大幅提高策略的稳定性、适应性和盈利能力。

### 总结

带通滤波反转策略通过构建带通滤波器,提取有用的中频信号,并在滤波器输出触发水平时,采取反向操作,捕捉价格的短期反转机会。该策略相对简单,通过参数优化可以适应多种市场环境。主要优化方向包括自适应滤波器、趋势判断、多时间框架组合及止损机制等。

||

### Overview  

The Bandpass Filter Reversed Strategy is a stock trading strategy based on bandpass filters. It constructs a cos and sine function to simulate a bandpass filter and generates buy and sell signals. When the filter output exceeds or falls below a certain trigger level, the strategy will take reverse operations, i.e. buying or selling.  

### Strategy Principle  

The core of this strategy is to build a bandpass filter BP, which consists of two parameters: center frequency and bandwidth. The center frequency determines the main cycle passed by the filter, and the bandwidth determines the range of passed cycles. These parameters determine the transfer characteristic of the filter.  

Specifically, the strategy constructs the following variables:  

- Length: Center cycle of the filter
- Delta: Bandwidth parameter  
- Beta: Coefficient related to center frequency
- Gamma: Coefficient related to bandwidth 
- Alpha: Intermediate variable related to Beta and Gamma  

According to these variables, the strategy builds a first-order IIR (Infinite Impulse Response) filter:  

BP = 0.5\*(1 - alpha)\*(xPrice - xPrice\[2\]) + beta\*(1 + alpha)*nz(BP\[1\]) - alpha\*nz(BP\[2\])  

When BP is above or below TriggerLevel, the strategy will take actions in the opposite direction.

### Advantage Analysis   

The main advantages of this strategy are:  

1. Using a bandpass filter can remove high and low frequency noise and only extract useful medium frequency cycle signals to improve signal-to-noise ratio.
2. It is relatively simple and intuitive. Only a few parameters need to be adjusted to adapt to different cycles and market environments.  
3. Adopting a reverse strategy can timely capture short-term price reversal and quickly close positions after profiting to reduce holding risks.   

### Risk Analysis   

This strategy also has some risks:  

1. The parameter settings of the bandpass filter need to be adjusted according to different cycles and market environments. If set improperly, it will miss trading opportunities or generate more false signals.
2. Reversal strategies are prone to illusion reversals. If the reversal fails and the price continues in the original direction, it will cause losses.  
3. The trading frequency may be high. It is necessary to prevent over-optimization and control trading costs.  

To reduce these risks, the following optimization methods can be considered:  

1. Use adaptive filters to automatically adjust parameters based on market changes.
2. Combine trend filters to avoid opening positions against the trend.   
3. Optimize parameter combinations to make strategies parameterized to adapt to more market conditions.  

### Optimization Directions   

The main aspects that this strategy can be optimized include:  

1. Cycle and parameter self-adaptation: Dynamically adjust parameters such as Length and Delta according to different cycles and recent price movements in a time window, so that the filter adapts to market environment changes in real time.  

2. Combine with trend judgment: On the basis of the bandpass filter, technical indicators such as MACD and MA are added to determine the trend direction and avoid opening positions against the trend.

3. Multi-timeframe combination: Deploy strategies on multiple time frames (such as 5 minutes, 15 minutes, 30 minutes, etc.). Perform signal verification between different time frames to improve signal accuracy.  

4. Stop loss mechanism: Set reasonable stop loss positions. Take the initiative to close positions when losses reach stop loss bits to effectively control the size of single losses.   

Through the above optimizations, the stability, adaptability and profitability of the strategy can be greatly improved.  

### Summary  

The Bandpass Filter Reversed Strategy extracts useful medium-frequency signals by constructing a bandpass filter, and takes reverse operations when the filter output triggers the level to capture short-term price reversal opportunities. The strategy is relatively simple. Through parameter optimization, it can adapt to various market environments. The main optimization directions include adaptive filters, trend judgments, multi-timeframe combinations, stop loss mechanisms, etc.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2|0.5|Delta|
|v_input_3|false|TriggerLevel|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-16 00:00:00
end: 2024-01-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version = 2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 24/11/2016
// The related article is copyrighted material from
// Stocks & Commodities Mar 2010
// You can use in the xPrice any series: Open, High, Low, Close, HL2, HLC3, OHLC4 and ect...
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Bandpass Filter Reversed Strategy")
Length = input(20, minval=1)
Delta = input(0.5)
TriggerLevel = input(0)
xPrice = hl2
hline(TriggerLevel, color=blue, linestyle=line)
beta = cos(3.14 * (360 / Length) / 180)
gamma = 1 / cos(3.14 * (720 * Delta / Length) / 180)
alpha = gamma - sqrt(gamma * gamma - 1)
BP = 0.5 * (1 - alpha) * (xPrice - xPrice[2]) + beta * (1 + alpha) * nz(BP[1]) - alpha * nz(BP[2])
pos = iff(BP > TriggerLevel, -1,
	   iff(BP <= TriggerLevel, 1, nz(pos[1], 0))) 
if (pos == 1) 
    strategy.entry("Long", strategy.long)
if (pos == -1)
    strategy.entry("Short", strategy.short)	    
barcolor(pos == -1 ? red: pos == 1 ? green : blue )
plot(BP, color=red, title="Bandpass Filter Strategy")
```

> Detail

https://www.fmz.com/strategy/439878

> Last Modified

2024-01-24 15:28:26
