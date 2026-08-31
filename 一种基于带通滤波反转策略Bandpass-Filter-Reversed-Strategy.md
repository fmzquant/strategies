
> Name

一种基于带通滤波反转策略Bandpass-Filter-Reversed-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17cb875618693df1e9c.png)

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
