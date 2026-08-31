
> Name

Momentum-Adaptive-Gaussian-Channel-Multi-Period-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1454c214d7a8a2ca2d1.png)

[trans]
#### 概述
该策略是一个基于高斯通道和随机RSI指标的动量交易系统,结合了季节性过滤和波动率管理。策略通过自适应高斯通道来识别市场趋势,使用随机RSI进行动量确认,并在特定的季节性窗口内执行交易。系统还整合了基于ATR的仓位管理,以控制每笔交易的风险敞口。

#### 策略原理
策略的核心是基于多极点高斯滤波器构建的价格通道。该通道通过计算HLC3价格的高斯滤波值,并结合真实波动幅度(TR)的滤波结果,形成动态的上下轨道。交易信号的产生需要满足以下条件:
1. 价格突破上轨且主滤波趋势向上
2. 随机RSI指标显示超买状态
3. 当前时间在预设的季节性窗口内
4. 仓位规模基于ATR动态计算

平仓信号则由价格跌破下轨触发。整个系统通过多重过滤机制,提高了交易的稳定性。

#### 策略优势
1. 高斯滤波器具有出色的噪音过滤能力,能够有效捕捉真实的市场趋势
2. 多极点设计提供了更精确的价格通道边界
3. 整合了动量和趋势指标,提高了信号的可靠性
4. 季节性过滤有助于避免不利的市场环境
5. 动态仓位管理确保了风险的一致性
6. 系统参数可根据不同市场条件进行优化

#### 策略风险
1. 高斯滤波器计算复杂,可能导致执行延迟
2. 多重过滤条件可能错过一些重要的交易机会
3. 系统对参数设置较为敏感,需要careful优化
4. 季节性窗口的固定设置可能不适应市场环境变化
5. 在高波动期间,ATR基础的仓位控制可能过于保守

#### 策略优化方向
1. 引入自适应的季节性窗口,通过市场条件动态调整交易时间
2. 优化高斯滤波器的计算效率,减少执行延迟
3. 加入市场波动率调节机制,在不同市场环境下调整过滤条件
4. 开发更灵活的仓位管理系统,平衡风险和收益
5. 增加多时间框架分析,提高信号的可靠性

#### 总结
这是一个构建完善的趋势跟踪系统,通过多层过滤和风险管理机制提高了交易的稳定性。虽然存在一些优化空间,但整体设计理念符合现代量化交易的要求。策略的成功关键在于参数的精确调整和对市场环境的适应性。 || 

#### Overview
This strategy is a momentum trading system based on Gaussian channels and stochastic RSI indicators, combined with seasonal filtering and volatility management. It identifies market trends through adaptive Gaussian channels, confirms momentum using stochastic RSI, and executes trades within specific seasonal windows. The system also incorporates ATR-based position management to control risk exposure per trade.

#### Strategy Principles
The core of the strategy is a price channel built on multi-pole Gaussian filters. The channel is constructed by calculating Gaussian filtered values of HLC3 prices and combining them with filtered true range (TR) results to form dynamic upper and lower bands. Trade signals are generated when the following conditions are met:
1. Price breaks above the upper band and the main filter trend is up
2. Stochastic RSI indicates overbought conditions
3. Current time is within the preset seasonal window
4. Position size is dynamically calculated based on ATR

Exit signals are triggered when price falls below the lower band. The entire system enhances trading stability through multiple filtering mechanisms.

#### Strategy Advantages
1. Gaussian filters provide excellent noise reduction capability, effectively capturing genuine market trends
2. Multi-pole design offers more precise price channel boundaries
3. Integration of momentum and trend indicators improves signal reliability
4. Seasonal filtering helps avoid unfavorable market conditions
5. Dynamic position management ensures consistency in risk exposure
6. System parameters can be optimized for different market conditions

#### Strategy Risks
1. Complex Gaussian filter calculations may lead to execution delays
2. Multiple filtering conditions might miss important trading opportunities
3. System is sensitive to parameter settings, requiring careful optimization
4. Fixed seasonal windows may not adapt to changing market environments
5. ATR-based position control might be too conservative during high volatility periods

#### Optimization Directions
1. Introduce adaptive seasonal windows that dynamically adjust trading times based on market conditions
2. Optimize Gaussian filter calculations to reduce execution delays
3. Add market volatility adjustment mechanisms to modify filtering conditions in different market environments
4. Develop more flexible position management systems to balance risk and reward
5. Incorporate multi-timeframe analysis to improve signal reliability

#### Summary
This is a well-constructed trend following system that enhances trading stability through multiple layers of filtering and risk management mechanisms. While there is room for optimization, the overall design philosophy aligns with modern quantitative trading requirements. The key to strategy success lies in precise parameter adjustment and adaptability to market conditions.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-08 00:00:00
end: 2025-02-06 08:00:00
period: 4h
basePeriod: 4h
exchanges: [{"eid":"Futures_Binance","currency":"DIA_USDT"}]
*/

//@version=6
strategy("Demo GPT - Gold Gaussian Strategy", overlay=true, commission_type=strategy.commission.percent, commission_value=0.1)

// ====== INPUTS ======
// Gaussian Channel
lengthGC = input.int(144, "Gaussian Period", minval=20)
poles = input.int(4, "Poles", minval=1, maxval=9)
multiplier = input.float(1.414, "Volatility Multiplier", minval=1)

// Stochastic RSI
smoothK = input.int(3, "Stoch K", minval=1)
lengthRSI = input.int(14, "RSI Length", minval=1)
lengthStoch = input.int(14, "Stoch Length", minval=1)
overbought = input.int(80, "Overbought Level", minval=50)

// Seasonal Filter (corrected)
startMonth = input.int(9, "Start Month (1-12)", minval=1, maxval=12)
endMonth = input.int(2, "End Month (1-12)", minval=1, maxval=12)

// Volatility Management
atrLength = input.int(22, "ATR Length", minval=5)
riskPercent = input.float(0.5, "Risk per Trade (%)", minval=0.1, step=0.1)

// ====== GAUSSIAN CHANNEL ======
f_filt9x(alpha, source, iterations) =>
    float f = 0.0
    float x = 1 - alpha
    int m2 = iterations == 9 ? 36 : iterations == 8 ? 28 : iterations == 7 ? 21 : 
           iterations == 6 ? 15 : iterations == 5 ? 10 : iterations == 4 ? 6 : 
           iterations == 3 ? 3 : iterations == 2 ? 1 : 0
    
    int m3 = iterations == 9 ? 84 : iterations == 8 ? 56 : iterations == 7 ? 35 : 
           iterations == 6 ? 20 : iterations == 5 ? 10 : iterations == 4 ? 4 : 
           iterations == 3 ? 1 : 0
    
    int m4 = iterations == 9 ? 126 : iterations == 8 ? 70 : iterations == 7 ? 35 : 
           iterations == 6 ? 15 : iterations == 5 ? 5 : iterations == 4 ? 1 : 0
    
    int m5 = iterations == 9 ? 126 : iterations == 8 ? 56 : iterations == 7 ? 21 : 
           iterations == 6 ? 6 : iterations == 5 ? 1 : 0
    
    int m6 = iterations == 9 ? 84 : iterations == 8 ? 28 : iterations == 7 ? 7 : 
           iterations == 6 ? 1 : 0
    
    int m7 = iterations == 9 ? 36 : iterations == 8 ? 8 : iterations == 7 ? 1 : 0
    
    int m8 = iterations == 9 ? 9 : iterations == 8 ? 1 : 0
    int m9 = iterations == 9 ? 1 : 0
    
    f := math.pow(alpha, iterations) * nz(source) +
      iterations * x * nz(f[1]) -
      (iterations >= 2 ? m2 * math.pow(x, 2) * nz(f[2]) : 0) +
      (iterations >= 3 ? m3 * math.pow(x, 3) * nz(f[3]) : 0) -
      (iterations >= 4 ? m4 * math.pow(x, 4) * nz(f[4]) : 0) +
      (iterations >= 5 ? m5 * math.pow(x, 5) * nz(f[5]) : 0) -
      (iterations >= 6 ? m6 * math.pow(x, 6) * nz(f[6]) : 0) +
      (iterations >= 7 ? m7 * math.pow(x, 7) * nz(f[7]) : 0) -
      (iterations >= 8 ? m8 * math.pow(x, 8) * nz(f[8]) : 0) +
      (iterations == 9 ? m9 * math.pow(x, 9) * nz(f[9]) : 0)
    f

f_pole(alpha, source, iterations) =>
    float fn = na
    float f1 = f_filt9x(alpha, source, 1)
    float f2 = iterations >= 2 ? f_filt9x(alpha, source, 2) : na
    float f3 = iterations >= 3 ? f_filt9x(alpha, source, 3) : na
    float f4 = iterations >= 4 ? f_filt9x(alpha, source, 4) : na
    float f5 = iterations >= 5 ? f_filt9x(alpha, source, 5) : na
    float f6 = iterations >= 6 ? f_filt9x(alpha, source, 6) : na
    float f7 = iterations >= 7 ? f_filt9x(alpha, source, 7) : na
    float f8 = iterations >= 8 ? f_filt9x(alpha, source, 8) : na
    float f9 = iterations == 9 ? f_filt9x(alpha, source, 9) : na
    
    fn := iterations == 1 ? f1 : 
         iterations == 2 ? f2 : 
         iterations == 3 ? f3 : 
         iterations == 4 ? f4 : 
         iterations == 5 ? f5 : 
         iterations == 6 ? f6 : 
         iterations == 7 ? f7 : 
         iterations == 8 ? f8 : 
         iterations == 9 ? f9 : na
    [fn, f1]

beta = (1 - math.cos(4 * math.asin(1) / lengthGC)) / (math.pow(1.414, 2 / poles) - 1)
alpha = -beta + math.sqrt(math.pow(beta, 2) + 2 * beta)
lag = int((lengthGC - 1) / (2 * poles))

srcAdjusted = hlc3 + (hlc3 - hlc3[lag])
[mainFilter, filt1] = f_pole(alpha, srcAdjusted, poles)
[trFilter, tr1] = f_pole(alpha, ta.tr(true), poles)

upperBand = mainFilter + trFilter * multiplier
lowerBand = mainFilter - trFilter * multiplier

// ====== STOCHASTIC RSI ======
rsiValue = ta.rsi(close, lengthRSI)
k = ta.sma(ta.stoch(rsiValue, rsiValue, rsiValue, lengthStoch), smoothK)
stochSignal = k >= overbought

// ====== SEASONAL FILTER (FIXED) ======
currentMonth = month(time)
inSeason = (currentMonth >= startMonth and currentMonth <= 12) or 
         (currentMonth >= 1 and currentMonth <= endMonth)

// ====== VOLATILITY MANAGEMENT ======
atr = ta.atr(atrLength)
positionSize = math.min((strategy.equity * riskPercent/100) / atr, strategy.equity * 0.5 / close)

// ====== TRADING LOGIC ======
trendUp = mainFilter > mainFilter[1]
priceAbove = close > upperBand
longCondition = trendUp and priceAbove and stochSignal and inSeason

exitCondition = ta.crossunder(close, lowerBand)

// ====== EXECUTION ======
if longCondition
    strategy.entry("Long", strategy.long, qty=positionSize)
    
if exitCondition
    strategy.close("Long")

// ====== VISUALIZATION ======
plot(upperBand, "Upper Band", color=color.new(#00FF00, 0))
plot(lowerBand, "Lower Band", color=color.new(#FF0000, 0))
bgcolor(inSeason ? color.new(color.blue, 90) : na, title="Season Filter")
```

> Detail

https://www.fmz.com/strategy/481093

> Last Modified

2025-02-08 14:49:15
