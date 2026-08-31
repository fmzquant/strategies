
> Name

Adaptive-Trend-Following-Strategy-Based-on-Kernel-Regression-and-ATR-Dynamic-Bands

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7302e88ffff116a149.png)

[trans]
#### 概述
该策略是一个结合了Nadaraya-Watson核回归和ATR动态波段的自适应趋势跟踪系统。它通过有理二次核函数对价格趋势进行预测,并利用基于ATR的动态支撑和阻力带来识别交易机会。系统通过可配置的回溯窗口和权重参数实现对市场的精确建模。

#### 策略原理
策略的核心是基于Nadaraya-Watson方法的非参数核回归,使用有理二次核函数对价格序列进行平滑处理。回归从设定的起始bar开始计算,通过lookback window(h)和相对权重(r)两个关键参数来控制拟合程度。同时结合ATR指标构建动态波段,上下带分别为回归估计值加减ATR的倍数。系统通过价格与波段的交叉来触发交易信号 - 当价格突破下带时做多,突破上带时做空。趋势判断可以基于价格变化率或交叉机制,并通过颜色变化直观显示。

#### 策略优势
1. 核回归方法具有良好的数学基础,能有效捕捉价格趋势而不过度拟合
2. 动态波段随市场波动率自适应调整,提供更合理的支撑阻力位
3. 参数可配置性强,能根据不同市场特征灵活调整
4. 趋势识别机制灵活,可选择平滑或敏感模式
5. 可视化效果直观,交易信号清晰

#### 策略风险
1. 参数选择不当可能导致过度拟合或滞后
2. 在震荡市场中可能产生过多交易信号
3. ATR倍数设置不合理可能造成止损过宽或过窄
4. 趋势转换期可能出现虚假信号
建议通过历史回测优化参数,并结合其他指标作为辅助确认。

#### 策略优化方向
1. 引入成交量指标作为趋势确认
2. 开发自适应参数优化机制
3. 增加趋势强度过滤器减少震荡市虚假信号
4. 优化止损止盈机制提高盈亏比
5. 考虑加入市场环境分类,在不同市场采用不同参数

#### 总结
该策略通过将统计学习方法与技术分析相结合,构建了一个理论基础扎实、实用性强的交易系统。其自适应特性和可配置性使其能够适应不同市场环境,但使用时需要注意参数优化和风险控制。通过持续改进和优化,该策略有望在实战交易中发挥重要作用。

|| 

#### Overview
This strategy is an adaptive trend following system that combines Nadaraya-Watson kernel regression with ATR dynamic bands. It predicts price trends using rational quadratic kernel function and identifies trading opportunities through ATR-based dynamic support and resistance bands. The system achieves precise market modeling through configurable lookback window and weighting parameters.

#### Strategy Principle
The core of the strategy is non-parametric kernel regression based on the Nadaraya-Watson method, using a rational quadratic kernel function to smooth price series. The regression calculation starts from a specified bar, controlled by two key parameters: lookback window (h) and relative weighting (r). Dynamic bands are constructed using ATR indicator, with upper and lower bands being regression estimates plus/minus ATR multiples. Trading signals are triggered by price crossovers with the bands - long when price breaks below the lower band, short when it breaks above the upper band. Trend determination can be based on either rate of change or crossover mechanism, visualized through color changes.

#### Strategy Advantages
1. Kernel regression has solid mathematical foundation, effectively capturing price trends without overfitting
2. Dynamic bands adapt to market volatility, providing more reasonable support and resistance levels
3. Strong parameter configurability, flexible adjustment for different market characteristics
4. Flexible trend identification mechanism, choice between smooth or sensitive modes
5. Intuitive visualization, clear trading signals

#### Strategy Risks
1. Improper parameter selection may lead to overfitting or lag
2. May generate excessive trading signals in ranging markets
3. Unreasonable ATR multiplier settings can result in stop-loss being too wide or too narrow
4. False signals may occur during trend transitions
It is recommended to optimize parameters through historical backtesting and combine with other indicators for confirmation.

#### Strategy Optimization Directions
1. Incorporate volume indicators for trend confirmation
2. Develop adaptive parameter optimization mechanism
3. Add trend strength filter to reduce false signals in ranging markets
4. Optimize stop-loss and take-profit mechanism to improve risk-reward ratio
5. Consider adding market environment classification to use different parameters in different markets

#### Summary
This strategy combines statistical learning methods with technical analysis to build a trading system with solid theoretical foundation and strong practicality. Its adaptive features and configurability enable it to adapt to different market environments, but attention needs to be paid to parameter optimization and risk control when using it. Through continuous improvement and optimization, this strategy has the potential to play an important role in practical trading.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-18 00:00:00
end: 2025-02-17 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Lupown

//@version=5
strategy("Nadaraya-Watson non repainting Strategy", overlay=true)  // PARAMETER timeframe ODSTRÁNENÝ

//--------------------------------------------------------------------------------
// INPUTS
//--------------------------------------------------------------------------------
src = input.source(close, 'Source')
h   = input.float(8., 'Lookback Window', minval=3., tooltip='The number of bars used for the estimation. This is a sliding value that represents the most recent historical bars. Recommended range: 3-50')
r   = input.float(8., 'Relative Weighting', step=0.25, tooltip='Relative weighting of time frames. As this value approaches zero, the longer time frames will exert more influence on the estimation. As this value approaches infinity, the behavior of the Rational Quadratic Kernel will become identical to the Gaussian kernel. Recommended range: 0.25-25')
x_0 = input.int(25, "Start Regression at Bar", tooltip='Bar index on which to start regression. The first bars of a chart are often highly volatile, and omission of these initial bars often leads to a better overall fit. Recommended range: 5-25')
showMiddle    = input.bool(true, "Show middle band")
smoothColors  = input.bool(false, "Smooth Colors", tooltip="Uses a crossover based mechanism to determine colors. This often results in less color transitions overall.", inline='1', group='Colors')
lag           = input.int(2, "Lag", tooltip="Lag for crossover detection. Lower values result in earlier crossovers. Recommended range: 1-2", inline='1', group='Colors')

lenjeje = input.int(32, "ATR Period",    tooltip="Period to calculate upper and lower band", group='Bands')
coef    = input.float(2.7, "Multiplier", tooltip="Multiplier to calculate upper and lower band", group='Bands')

//--------------------------------------------------------------------------------
// ARRAYS & VARIABLES
//--------------------------------------------------------------------------------
float y1 = 0.0
float y2 = 0.0
srcArray = array.new<float>(0)
array.push(srcArray, src)
size = array.size(srcArray)

//--------------------------------------------------------------------------------
// KERNEL REGRESSION FUNCTIONS
//--------------------------------------------------------------------------------
kernel_regression1(_src, _size, _h) =>
    float _currentWeight = 0.
    float _cumulativeWeight = 0.
    for i = 0 to _size + x_0
        y = _src[i]
        w = math.pow(1 + (math.pow(i, 2) / ((math.pow(_h, 2) * 2 * r))), -r)
        _currentWeight    += y * w
        _cumulativeWeight += w
    [_currentWeight, _cumulativeWeight]

[currentWeight1, cumulativeWeight1] = kernel_regression1(src, size, h)
yhat1 = currentWeight1 / cumulativeWeight1

[currentWeight2, cumulativeWeight2] = kernel_regression1(src, size, h - lag)
yhat2 = currentWeight2 / cumulativeWeight2

//--------------------------------------------------------------------------------
// TREND & COLOR DETECTION
//--------------------------------------------------------------------------------
// Rate-of-change-based
bool wasBearish   = yhat1[2] > yhat1[1]
bool wasBullish   = yhat1[2] < yhat1[1]
bool isBearish    = yhat1[1] > yhat1
bool isBullish    = yhat1[1] < yhat1
bool isBearishChg = isBearish  and wasBullish
bool isBullishChg = isBullish  and wasBearish

// Crossover-based (for "smooth" color changes)
bool isBullishCross  = ta.crossover(yhat2, yhat1)
bool isBearishCross  = ta.crossunder(yhat2, yhat1)
bool isBullishSmooth = yhat2 > yhat1
bool isBearishSmooth = yhat2 < yhat1

color c_bullish    = input.color(#3AFF17, 'Bullish Color', group='Colors')
color c_bearish    = input.color(#FD1707, 'Bearish Color', group='Colors')

color colorByCross = isBullishSmooth ? c_bullish : c_bearish
color colorByRate  = isBullish       ? c_bullish : c_bearish
color plotColor    = smoothColors ? colorByCross : colorByRate

// Middle Estimate
plot(showMiddle ? yhat1 : na, "Rational Quadratic Kernel Estimate", color=plotColor, linewidth=2)

//--------------------------------------------------------------------------------
// UPPER / LOWER BANDS
//--------------------------------------------------------------------------------
upperjeje = yhat1 + coef * ta.atr(lenjeje)
lowerjeje = yhat1 - coef * ta.atr(lenjeje)

plotUpper = plot(upperjeje, "Rational Quadratic Kernel Upper", color=color.rgb(0, 247, 8), linewidth=2)
plotLower = plot(lowerjeje, "Rational Quadratic Kernel Lower", color=color.rgb(255, 0, 0), linewidth=2)

//--------------------------------------------------------------------------------
// SYMBOLS & ALERTS
//--------------------------------------------------------------------------------
plotchar(ta.crossover(close, upperjeje),  char="?", location=location.abovebar, size=size.tiny)
plotchar(ta.crossunder(close, lowerjeje), char="?", location=location.belowbar, size=size.tiny)

// Alerts for Color Changes (estimator)
alertcondition(smoothColors ? isBearishCross : isBearishChg, title="Bearish Color Change", message="Nadaraya-Watson: {{ticker}} ({{interval}}) turned Bearish ▼")
alertcondition(smoothColors ? isBullishCross : isBullishChg, title="Bullish Color Change", message="Nadaraya-Watson: {{ticker}} ({{interval}}) turned Bullish ▲")

// Alerts when price crosses upper and lower band
alertcondition(ta.crossunder(close, lowerjeje), title="Price close under lower band", message="Nadaraya-Watson: {{ticker}} ({{interval}}) crossed under lower band ?")
alertcondition(ta.crossover(close, upperjeje),  title="Price close above upper band", message="Nadaraya-Watson: {{ticker}} ({{interval}}) Crossed above upper band ?")

//--------------------------------------------------------------------------------
// STRATEGY LOGIC (EXAMPLE)
//--------------------------------------------------------------------------------
if ta.crossunder(close, lowerjeje)
    // zatvoriť short
    strategy.close("Short")
    // otvoriť long
    strategy.entry("Long", strategy.long)

if ta.crossover(close, upperjeje)
    // zatvoriť long
    strategy.close("Long")
    // otvoriť short
    strategy.entry("Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/482468

> Last Modified

2025-02-18 15:33:21
