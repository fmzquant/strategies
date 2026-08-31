
> Name

Multi-Indicator-Adaptive-Trading-Strategy-Based-on-Gaussian-Channel-and-Stochastic-RSI

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8faca5beda094d2d67a.png)
![IMG](https://www.fmz.com/upload/asset/2d8aa8828b00689eaf96c.png)



[trans]
#### 概述
该策略是一个结合高斯通道滤波器和随机RSI指标的综合交易系统。通过高斯通道的方向性变化和价格位置,结合随机RSI的超买超卖信号来确定交易机会。策略采用了复杂的数学模型来构建自适应性通道,能够有效地过滤市场噪音并捕捉重要的价格变动。

#### 策略原理
策略的核心逻辑基于以下几个关键组件:
1. 高斯通道计算: 使用多极高斯滤波器处理HLC3价格数据,创建自适应性通道。通过beta和alpha参数优化滤波效果,并可选择减少滞后性。
2. 通道宽度调整: 基于真实波幅(TR)动态调整通道宽度,使用1.414作为默认乘数。
3. 随机RSI信号: 结合14周期RSI和随机指标,在80以上或20以下产生信号。
4. 入场条件: 需同时满足高斯通道向上、价格突破上轨、随机RSI触发信号三个条件。
5. 出场逻辑: 当价格跌破高斯通道上轨时平仓。

#### 策略优势
1. 信号可靠性: 多重指标确认机制显著提高了交易信号的可靠性。
2. 自适应性强: 高斯通道能够根据市场波动自动调整通道宽度。
3. 噪音过滤: 高斯滤波器有效降低了市场噪音的影响。
4. 灵活性高: 提供多个可调参数,包括通道周期、极点数量和RSI参数等。
5. 视觉直观: 通过颜色变化直观显示趋势方向和交易信号。

#### 策略风险
1. 参数敏感性: 高斯通道的极点数量和采样周期设置对策略性能影响较大。
2. 滞后风险: 虽然提供了减少滞后的选项,但指标本身仍具有一定滞后性。
3. 假突破风险: 在横盘市场中可能出现频繁的假突破信号。
4. 资金管理不足: 当前版本缺乏详细的仓位管理机制。

#### 策略优化方向
1. 市场环境识别: 添加趋势强度指标,在不同市场环境下调整策略参数。
2. 动态参数优化: 根据市场波动性自动调整高斯通道的参数设置。
3. 仓位管理完善: 引入基于波动率的动态仓位管理系统。
4. 出场机制增强: 增加移动止损和部分获利了结机制。
5. 时间框架优化: 在多个时间框架上验证信号,提高交易稳定性。

#### 总结
该策略通过结合高斯通道滤波器和随机RSI指标,构建了一个具有较强自适应性的交易系统。高斯通道的数学基础保证了信号的平滑性和可靠性,而随机RSI的配合则进一步提高了入场时机的准确性。策略的主要优势在于其对市场噪音的有效过滤和对趋势的准确把握,但同时也需要注意参数优化和风险管理的问题。通过建议的优化方向,策略的整体表现还有进一步提升的空间。 || 

#### Overview
This strategy is a comprehensive trading system combining Gaussian Channel Filter and Stochastic RSI indicators. It identifies trading opportunities through directional changes in the Gaussian Channel and price position, coupled with overbought/oversold signals from the Stochastic RSI. The strategy employs sophisticated mathematical models to construct adaptive channels, effectively filtering market noise and capturing significant price movements.

#### Strategy Principles
The core logic is based on the following key components:
1. Gaussian Channel Calculation: Uses multi-pole Gaussian filters to process HLC3 price data, creating adaptive channels. Optimizes filtering through beta and alpha parameters, with optional lag reduction.
2. Channel Width Adjustment: Dynamically adjusts channel width based on True Range (TR), using 1.414 as the default multiplier.
3. Stochastic RSI Signals: Combines 14-period RSI and stochastic indicators, generating signals above 80 or below 20.
4. Entry Conditions: Requires simultaneous satisfaction of upward Gaussian Channel, price breakthrough upper band, and Stochastic RSI trigger signals.
5. Exit Logic: Closes positions when price breaks below the Gaussian Channel upper band.

#### Strategy Advantages
1. Signal Reliability: Multiple indicator confirmation mechanism significantly improves trading signal reliability.
2. Strong Adaptability: Gaussian Channel automatically adjusts channel width based on market volatility.
3. Noise Filtering: Gaussian filters effectively reduce market noise impact.
4. High Flexibility: Offers multiple adjustable parameters, including channel period, number of poles, and RSI parameters.
5. Visual Intuition: Displays trend direction and trading signals through color changes intuitively.

#### Strategy Risks
1. Parameter Sensitivity: Strategy performance is highly dependent on Gaussian Channel pole count and sampling period settings.
2. Lag Risk: Despite lag reduction options, indicators still have inherent lag.
3. False Breakout Risk: Frequent false breakout signals may occur in ranging markets.
4. Insufficient Money Management: Current version lacks detailed position management mechanisms.

#### Strategy Optimization Directions
1. Market Environment Recognition: Add trend strength indicators to adjust strategy parameters in different market environments.
2. Dynamic Parameter Optimization: Automatically adjust Gaussian Channel parameters based on market volatility.
3. Position Management Enhancement: Introduce volatility-based dynamic position management system.
4. Exit Mechanism Enhancement: Add trailing stops and partial profit-taking mechanisms.
5. Timeframe Optimization: Validate signals across multiple timeframes to improve trading stability.

#### Summary
The strategy constructs a highly adaptive trading system by combining Gaussian Channel filters and Stochastic RSI indicators. The mathematical foundation of the Gaussian Channel ensures signal smoothness and reliability, while the Stochastic RSI combination further improves entry timing accuracy. The strategy's main advantages lie in its effective filtering of market noise and accurate trend capture, though attention must be paid to parameter optimization and risk management. Through the suggested optimization directions, there is room for further improvement in the strategy's overall performance.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-22 00:00:00
end: 2025-02-19 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"SOL_USDT"}]
*/

//@version=5
strategy(title="Gaussian Channel Strategy v3.0", overlay=true, calc_on_every_tick=false, initial_capital=1000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1, slippage=0, fill_orders_on_standard_ohlc=true)

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Gaussian Filter Functions (Must be declared first)
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
f_filt9x(_a, _s, _i) =>
    var int _m2 = 0, var int _m3 = 0, var int _m4 = 0, var int _m5 = 0, var int _m6 = 0, 
    var int _m7 = 0, var int _m8 = 0, var int _m9 = 0, var float _f = .0
    _x = 1 - _a
    _m2 := _i == 9 ? 36  : _i == 8 ? 28 : _i == 7 ? 21 : _i == 6 ? 15 : _i == 5 ? 10 : _i == 4 ? 6 : _i == 3 ? 3 : _i == 2 ? 1 : 0
    _m3 := _i == 9 ? 84  : _i == 8 ? 56 : _i == 7 ? 35 : _i == 6 ? 20 : _i == 5 ? 10 : _i == 4 ? 4 : _i == 3 ? 1 : 0
    _m4 := _i == 9 ? 126 : _i == 8 ? 70 : _i == 7 ? 35 : _i == 6 ? 15 : _i == 5 ? 5  : _i == 4 ? 1 : 0
    _m5 := _i == 9 ? 126 : _i == 8 ? 56 : _i == 7 ? 21 : _i == 6 ? 6  : _i == 5 ? 1  : 0 
    _m6 := _i == 9 ? 84  : _i == 8 ? 28 : _i == 7 ? 7  : _i == 6 ? 1  : 0 
    _m7 := _i == 9 ? 36  : _i == 8 ? 8  : _i == 7 ? 1  : 0 
    _m8 := _i == 9 ? 9   : _i == 8 ? 1  : 0 
    _m9 := _i == 9 ? 1   : 0
    _f := math.pow(_a, _i) * nz(_s) + _i * _x * nz(_f[1]) - (_i >= 2 ? _m2 * math.pow(_x, 2) * nz(_f[2]) : 0) + (_i >= 3 ? _m3 * math.pow(_x, 3) * nz(_f[3]) : 0) - (_i >= 4 ? _m4 * math.pow(_x, 4) * nz(_f[4]) : 0) + (_i >= 5 ? _m5 * math.pow(_x, 5) * nz(_f[5]) : 0) - (_i >= 6 ? _m6 * math.pow(_x, 6) * nz(_f[6]) : 0) + (_i >= 7 ? _m7 * math.pow(_x, 7) * nz(_f[7]) : 0) - (_i >= 8 ? _m8 * math.pow(_x, 8) * nz(_f[8]) : 0) + (_i == 9 ? _m9 * math.pow(_x, 9) * nz(_f[9]) : 0)

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

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Inputs
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------


// Gaussian Channel
int poles = input.int(4, "Poles", 1, 9, group="Gaussian Channel")
int period = input.int(144, "Sampling Period", 2, group="Gaussian Channel")
float mult = input.float(1.414, "True Range Multiplier", group="Gaussian Channel")
bool reducedLag = input.bool(false, "Reduced Lag Mode", group="Gaussian Channel")
bool fastResponse = input.bool(false, "Fast Response Mode", group="Gaussian Channel")

// Stochastic RSI
smoothK = input.int(3, "K", 1, group="Stochastic RSI")
smoothD = input.int(3, "D", 1, group="Stochastic RSI")
lengthRSI = input.int(14, "RSI Length", 1, group="Stochastic RSI")
lengthStoch = input.int(14, "Stochastic Length", 1, group="Stochastic RSI")

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Calculations
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Gaussian Channel
beta = (1 - math.cos(4*math.asin(1)/period)) / (math.pow(1.414, 2/poles) - 1)
alpha = -beta + math.sqrt(math.pow(beta, 2) + 2*beta)
lag = (period - 1)/(2*poles)

src = hlc3
srcData = reducedLag ? src + (src - src[lag]) : src
trData = reducedLag ? ta.tr + (ta.tr - ta.tr[lag]) : ta.tr

[filterMain, filter1] = f_pole(alpha, srcData, poles)
[filterTRMain, filterTR1] = f_pole(alpha, trData, poles)

finalFilter = fastResponse ? (filterMain + filter1)/2 : filterMain
finalTR = fastResponse ? (filterTRMain + filterTR1)/2 : filterTRMain

hband = finalFilter + finalTR * mult
lband = finalFilter - finalTR * mult

// Stochastic RSI
rsi = ta.rsi(close, lengthRSI)
k = ta.sma(ta.stoch(rsi, rsi, rsi, lengthStoch), smoothK)
d = ta.sma(k, smoothD)

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Trading Logic
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
gaussianGreen = finalFilter > finalFilter[1]
priceAbove = close > hband
stochCondition = k > 80 or k < 20

longCondition = gaussianGreen and priceAbove and stochCondition 
exitCondition = ta.crossunder(close, hband) 

strategy.entry("Long", strategy.long, when=longCondition)
strategy.close("Long", when=exitCondition)

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Visuals
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
filterColor = finalFilter > finalFilter[1] ? #0aff68 : #ff0a5a
plot(finalFilter, "Filter", filterColor, 2)
plot(hband, "High Band", filterColor)
plot(lband, "Low Band", filterColor)
fill(plot(hband), plot(lband), color.new(filterColor, 90), "Channel Fill")

```

> Detail

https://www.fmz.com/strategy/483064

> Last Modified

2025-02-21 11:28:34
