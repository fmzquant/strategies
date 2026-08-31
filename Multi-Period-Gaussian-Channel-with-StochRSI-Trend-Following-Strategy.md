
> Name

Multi-Period-Gaussian-Channel-with-StochRSI-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10fab6df866d016d13c.png)

[trans]
#### 概述
本策略是一个基于高斯滤波和StochRSI指标的趋势跟踪交易系统。该策略通过高斯通道来识别市场趋势,并结合StochRSI指标的超买超卖区间来优化入场时机。系统采用多项式拟合方法构建高斯通道,通过上下轨道的动态调整来跟踪价格趋势,实现对市场走势的精确跟踪。

#### 策略原理
策略的核心是基于高斯滤波算法构建的价格通道。具体实现包括以下几个关键步骤:
1. 使用多项式函数f_filt9x实现9阶高斯滤波,通过极点优化来提高滤波效果
2. 基于HLC3价格计算主滤波线和波动率通道
3. 引入reducedLag模式降低滤波延迟,fastResponse模式提高响应速度
4. 利用StochRSI指标的超买超卖区间(80/20)确定交易信号
5. 在高斯通道向上且价格突破上轨时,结合StochRSI指标产生做多信号
6. 当价格跌破上轨时平仓出场

#### 策略优势
1. 高斯滤波具有优秀的降噪能力,可以有效过滤市场噪音
2. 通过多项式拟合实现对趋势的平滑跟踪,减少虚假信号
3. 支持延迟优化和快速响应模式,可根据市场特征灵活调整
4. 结合StochRSI指标优化入场时机,提高交易成功率
5. 采用动态通道宽度,自适应市场波动率变化

#### 策略风险
1. 高斯滤波存在一定滞后性,可能导致入场或出场不够及时
2. 在震荡市场中可能产生频繁交易信号,增加交易成本
3. StochRSI指标在某些市场条件下可能产生滞后信号
4. 参数优化过程复杂,不同市场环境需要重新调整参数
5. 系统对计算资源要求较高,实时计算存在一定延迟

#### 策略优化方向
1. 引入自适应参数优化机制,根据市场状态动态调整参数
2. 增加市场环境识别模块,在不同市场条件下采用不同参数组合
3. 优化高斯滤波算法,进一步降低计算延迟
4. 引入更多技术指标进行交叉验证,提高信号可靠性
5. 开发智能止损机制,提高风险控制能力

#### 总结
该策略通过高斯滤波和StochRSI指标的结合,实现了对市场趋势的有效跟踪。系统具有良好的降噪能力和趋势识别能力,但也存在一定的滞后性和参数优化难度。通过持续优化和完善,该策略有望在实际交易中取得稳定收益。 || 

#### Overview
This strategy is a trend following trading system based on Gaussian filtering and StochRSI indicator. It uses Gaussian channels to identify market trends and combines StochRSI indicator's overbought/oversold zones to optimize entry timing. The system employs polynomial fitting to construct Gaussian channels, tracking price trends through dynamic adjustment of upper and lower bands.

#### Strategy Principle
The core of the strategy is the price channel built on Gaussian filtering algorithm. Key implementation steps include:
1. Implementing 9th-order Gaussian filtering using polynomial function f_filt9x with pole optimization
2. Calculating main filter line and volatility channel based on HLC3 price
3. Introducing reducedLag mode to decrease filtering delay and fastResponse mode to improve response speed
4. Utilizing StochRSI indicator's overbought/oversold zones (80/20) for trade signals
5. Generating long signals when Gaussian channel trends upward and price breaks above upper band, combined with StochRSI conditions
6. Closing positions when price falls below upper band

#### Strategy Advantages
1. Excellent noise reduction capability through Gaussian filtering
2. Smooth trend tracking via polynomial fitting, reducing false signals
3. Supports delay optimization and fast response modes for flexible market adaptation
4. Improved entry timing through StochRSI indicator integration
5. Dynamic channel width adapting to market volatility changes

#### Strategy Risks
1. Inherent lag in Gaussian filtering may lead to delayed entries or exits
2. May generate frequent trading signals in ranging markets, increasing transaction costs
3. StochRSI indicator might produce lagging signals under certain market conditions
4. Complex parameter optimization process requiring readjustment for different markets
5. High computational resource requirements leading to potential real-time calculation delays

#### Optimization Directions
1. Introduce adaptive parameter optimization based on market conditions
2. Add market environment recognition for different parameter combinations
3. Optimize Gaussian filtering algorithm to further reduce calculation delay
4. Incorporate additional technical indicators for cross-validation
5. Develop intelligent stop-loss mechanisms for improved risk control

#### Summary
The strategy achieves effective market trend tracking through the combination of Gaussian filtering and StochRSI indicator. While the system demonstrates strong noise reduction and trend identification capabilities, it faces challenges with latency and parameter optimization. Through continuous improvement and refinement, the strategy shows potential for generating stable returns in actual trading.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-19 00:00:00
end: 2025-02-16 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Demo GPT - Gaussian Channel Strategy v3.0", overlay=true, commission_type=strategy.commission.percent, commission_value=0.1, slippage=0, default_qty_type=strategy.percent_of_equity, default_qty_value=250)

// ============================================
// Gaussian Functions (Must be at top)
// ============================================
f_filt9x(_a, _s, _i) =>
    var int _m2 = 0, var int _m3 = 0, var int _m4 = 0, var int _m5 = 0, var int _m6 = 0,
    var int _m7 = 0, var int _m8 = 0, var int _m9 = 0, var float _f = 0.0
    _x = 1 - _a
    _m2 := _i == 9 ? 36 : _i == 8 ? 28 : _i == 7 ? 21 : _i == 6 ? 15 : _i == 5 ? 10 : _i == 4 ? 6 : _i == 3 ? 3 : _i == 2 ? 1 : 0
    _m3 := _i == 9 ? 84 : _i == 8 ? 56 : _i == 7 ? 35 : _i == 6 ? 20 : _i == 5 ? 10 : _i == 4 ? 4 : _i == 3 ? 1 : 0
    _m4 := _i == 9 ? 126 : _i == 8 ? 70 : _i == 7 ? 35 : _i == 6 ? 15 : _i == 5 ? 5 : _i == 4 ? 1 : 0
    _m5 := _i == 9 ? 126 : _i == 8 ? 56 : _i == 7 ? 21 : _i == 6 ? 6 : _i == 5 ? 1 : 0
    _m6 := _i == 9 ? 84 : _i == 8 ? 28 : _i == 7 ? 7 : _i == 6 ? 1 : 0
    _m7 := _i == 9 ? 36 : _i == 8 ? 8 : _i == 7 ? 1 : 0
    _m8 := _i == 9 ? 9 : _i == 8 ? 1 : 0
    _m9 := _i == 9 ? 1 : 0
    _f := math.pow(_a, _i) * nz(_s) + _i * _x * nz(_f[1]) - (_i >= 2 ? _m2 * math.pow(_x, 2) * nz(_f[2]) : 0) + (_i >= 3 ? _m3 * math.pow(_x, 3) * nz(_f[3]) : 0) - (_i >= 4 ? _m4 * math.pow(_x, 4) * nz(_f[4]) : 0) + (_i >= 5 ? _m5 * math.pow(_x, 5) * nz(_f[5]) : 0) - (_i >= 6 ? _m6 * math.pow(_x, 6) * nz(_f[6]) : 0) + (_i >= 7 ? _m7 * math.pow(_x, 7) * nz(_f[7]) : 0) - (_i >= 8 ? _m8 * math.pow(_x, 8) * nz(_f[8]) : 0) + (_i == 9 ? _m9 * math.pow(_x, 9) * nz(_f[9]) : 0)
    _f

f_pole(_a, _s, _i) =>
    _f1 = f_filt9x(_a, _s, 1)
    _f2 = _i >= 2 ? f_filt9x(_a, _s, 2) : 0.0
    _f3 = _i >= 3 ? f_filt9x(_a, _s, 3) : 0.0
    _f4 = _i >= 4 ? f_filt9x(_a, _s, 4) : 0.0
    _f5 = _i >= 5 ? f_filt9x(_a, _s, 5) : 0.0
    _f6 = _i >= 6 ? f_filt9x(_a, _s, 6) : 0.0
    _f7 = _i >= 7 ? f_filt9x(_a, _s, 7) : 0.0
    _f8 = _i >= 8 ? f_filt9x(_a, _s, 8) : 0.0
    _f9 = _i == 9 ? f_filt9x(_a, _s, 9) : 0.0
    _fn = _i == 1 ? _f1 : _i == 2 ? _f2 : _i == 3 ? _f3 : _i == 4 ? _f4 : _i == 5 ? _f5 : _i == 6 ? _f6 : _i == 7 ? _f7 : _i == 8 ? _f8 : _i == 9 ? _f9 : na
    [_fn, _f1]

// ============================================
// Date Filter
// ============================================
startDate = input(timestamp("1 Jan 2018"), "Start Date", group="Time Settings")
endDate = input(timestamp("31 Dec 2069"), "End Date", group="Time Settings")
timeCondition = true

// ============================================
// Stochastic RSI (Hidden Calculations)
// ============================================
stochRsiK = input.int(3, "Stoch RSI K", group="Stochastic RSI", tooltip="Only for calculations, not visible")
stochRsiD = input.int(3, "Stoch RSI D", group="Stochastic RSI")
rsiLength = input.int(14, "RSI Length", group="Stochastic RSI")
stochLength = input.int(14, "Stochastic Length", group="Stochastic RSI")

rsiValue = ta.rsi(close, rsiLength)
k = ta.sma(ta.stoch(rsiValue, rsiValue, rsiValue, stochLength), stochRsiK)
d = ta.sma(k, stochRsiD)

// ============================================
// Gaussian Channel
// ============================================
gaussianSrc = input(hlc3, "Source", group="Gaussian")
poles = input.int(4, "Poles", minval=1, maxval=9, group="Gaussian")
samplingPeriod = input.int(144, "Sampling Period", minval=2, group="Gaussian")
multiplier = input.float(1.414, "Multiplier", step=0.1, group="Gaussian")
reducedLag = input.bool(false, "Reduced Lag Mode", group="Gaussian")
fastResponse = input.bool(false, "Fast Response Mode", group="Gaussian")

// Gaussian Calculations
beta = (1 - math.cos(4 * math.asin(1) / samplingPeriod)) / (math.pow(1.414, 2 / poles) - 1)
alpha = -beta + math.sqrt(math.pow(beta, 2) + 2 * beta)
lag = (samplingPeriod - 1) / (2 * poles)

srcData = reducedLag ? gaussianSrc + (gaussianSrc - gaussianSrc[lag]) : gaussianSrc
trData = reducedLag ? ta.tr(true) + (ta.tr(true) - ta.tr(true)[lag]) : ta.tr(true)

[mainFilter, filter1] = f_pole(alpha, srcData, poles)
[trFilter, trFilter1] = f_pole(alpha, trData, poles)

finalFilter = fastResponse ? (mainFilter + filter1) / 2 : mainFilter
finalTrFilter = fastResponse ? (trFilter + trFilter1) / 2 : trFilter

upperBand = finalFilter + finalTrFilter * multiplier
lowerBand = finalFilter - finalTrFilter * multiplier

// ============================================
// Trading Logic
// ============================================
longCondition = 
  finalFilter > finalFilter[1] and      // Green Channel
  close > upperBand and                 // Price above upper band
  (k >= 80 or k <= 20) and             // Stoch RSI condition
  timeCondition

exitCondition = ta.crossunder(close, upperBand)

if longCondition
    strategy.entry("Long", strategy.long)

if exitCondition
    strategy.close("Long")

// ============================================
// Visuals (Gaussian Only)
// ============================================
bandColor = finalFilter > finalFilter[1] ? color.new(#00ff00, 0) : color.new(#ff0000, 0)
plot(finalFilter, "Filter", bandColor, 2)
plot(upperBand, "Upper Band", bandColor)
plot(lowerBand, "Lower Band", bandColor)
fill(plot(upperBand), plot(lowerBand), color.new(bandColor, 90))

barcolor(close > open and close > upperBand ? color.green : 
         close < open and close < lowerBand ? color.red : na)
```

> Detail

https://www.fmz.com/strategy/482426

> Last Modified

2025-02-18 13:50:36
