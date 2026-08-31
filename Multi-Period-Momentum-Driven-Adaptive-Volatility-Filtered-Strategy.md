
> Name

Multi-Period-Momentum-Driven-Adaptive-Volatility-Filtered-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d92ef0e639cb35521b88.png)
![IMG](https://www.fmz.com/upload/asset/2d941e03d0564b992ceab.png)




[trans]
#### 概述
该策略是一个基于多周期动量指标和波动率过滤的高级交易系统。它通过计算3个月、6个月、9个月和12个月四个时间周期的价格动量，构建了一个综合动量评分体系。同时，策略引入了年化波动率过滤机制，通过设定波动率阈值来控制交易风险。该策略专注于捕捉具有持续上涨趋势且波动相对稳定的交易机会，是一个典型的趋势跟踪系统。

#### 策略原理
策略的核心逻辑包含以下几个关键要素：
1. 动量计算：使用(当前价格/历史价格-1)的方法分别计算4个时间周期的动量指标。
2. 波动率过滤：计算日收益率的标准差并年化处理，通过将其与预设阈值(0.5)比较来过滤高波动率期间。
3. 信号生成：当综合动量指标由负转正且波动率低于阈值时产生做多信号；当动量指标转负时平仓。
4. 风险管理：采用1%的止损和50%的止盈来控制单笔交易风险。

#### 策略优势
1. 多维度动量分析：通过综合考虑多个时间周期的动量，能够更全面地评估价格趋势的强度和持续性。
2. 自适应波动率过滤：通过动态计算和过滤波动率，有效避免了高波动期间的假信号。
3. 完善的风险控制：设置了止损和止盈阈值，能够有效控制单笔交易风险。
4. 系统化决策：策略完全系统化，避免了主观判断带来的干扰。

#### 策略风险
1. 趋势反转风险：在强趋势突然反转时，可能会承受较大损失。
2. 参数敏感性：策略效果对动量周期、波动率阈值等参数设置较为敏感。
3. 市场环境依赖：在震荡市场中可能会产生频繁的假信号。
4. 滑点影响：在市场流动性不足时，可能面临较大的交易成本。

#### 策略优化方向
1. 动态参数优化：可以引入自适应参数调整机制，根据市场状态动态调整动量周期和波动率阈值。
2. 市场状态分类：增加市场状态识别模块，在不同市场环境下采用不同的参数设置。
3. 信号确认机制：引入额外的技术指标来确认交易信号，提高策略的稳定性。
4. 资金管理优化：可以根据信号强度动态调整持仓规模，实现更优的资金利用效率。

#### 总结
该策略通过结合多周期动量分析和波动率过滤，构建了一个完整的趋势跟踪交易系统。其核心优势在于系统化的决策过程和完善的风险控制机制。虽然存在一些固有的风险，但通过提出的优化方向，策略仍有较大的改进空间。整体而言，这是一个设计合理、逻辑严密的交易策略，适合在低波动率的趋势市场中应用。

 || 

#### Overview
This strategy is an advanced trading system based on multi-period momentum indicators and volatility filtering. It constructs a comprehensive momentum scoring system by calculating price momentum across four time periods: 3-month, 6-month, 9-month, and 12-month. Additionally, the strategy incorporates an annualized volatility filtering mechanism to control trading risk by setting volatility thresholds. The strategy focuses on capturing trading opportunities with sustained upward trends and relatively stable volatility, making it a typical trend-following system.

#### Strategy Principles
The core logic includes several key elements:
1. Momentum Calculation: Uses (current_price/historical_price-1) method to calculate momentum indicators for four time periods.
2. Volatility Filtering: Calculates the standard deviation of daily returns and annualizes it, comparing it with a preset threshold (0.5) to filter high volatility periods.
3. Signal Generation: Generates long signals when the composite momentum indicator turns positive from negative and volatility is below the threshold; exits when momentum turns negative.
4. Risk Management: Employs 1% stop-loss and 50% take-profit levels to control single-trade risk.

#### Strategy Advantages
1. Multi-dimensional Momentum Analysis: Provides a more comprehensive assessment of price trend strength and persistence by considering momentum across multiple time periods.
2. Adaptive Volatility Filtering: Effectively avoids false signals during high volatility periods through dynamic volatility calculation and filtering.
3. Comprehensive Risk Control: Implements stop-loss and take-profit thresholds for effective single-trade risk control.
4. Systematic Decision-making: Fully systematized strategy that eliminates subjective judgment interference.

#### Strategy Risks
1. Trend Reversal Risk: May incur significant losses during sudden trend reversals.
2. Parameter Sensitivity: Strategy performance is sensitive to momentum period and volatility threshold parameter settings.
3. Market Environment Dependency: May generate frequent false signals in ranging markets.
4. Slippage Impact: May face significant transaction costs during periods of insufficient market liquidity.

#### Strategy Optimization Directions
1. Dynamic Parameter Optimization: Introduce adaptive parameter adjustment mechanisms to dynamically adjust momentum periods and volatility thresholds based on market conditions.
2. Market State Classification: Add market state identification modules to employ different parameter settings under different market environments.
3. Signal Confirmation Mechanism: Incorporate additional technical indicators to confirm trading signals and improve strategy stability.
4. Capital Management Optimization: Dynamically adjust position sizes based on signal strength to achieve more efficient capital utilization.

#### Summary
This strategy constructs a complete trend-following trading system by combining multi-period momentum analysis and volatility filtering. Its core advantages lie in its systematic decision-making process and comprehensive risk control mechanisms. While inherent risks exist, there is significant room for improvement through the proposed optimization directions. Overall, this is a well-designed and logically rigorous trading strategy suitable for application in low-volatility trend markets.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-25 00:00:00
end: 2025-02-22 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"SOL_USDT"}]
*/

//@version=5
strategy("GOATED Long-Only", overlay=true, initial_capital=1000, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// Strategy parameters
var float VOLATILITY_THRESHOLD = input.float(0.5, "Volatility Threshold", minval=0.1, maxval=1.0, step=0.1)
var int TRADING_DAYS_PER_YEAR = 252
var float SQRT_TRADING_DAYS = math.sqrt(TRADING_DAYS_PER_YEAR)

// Trade parameters
var float STOP_LOSS = input.float(0.05, "Stop Loss %", minval=0.01, maxval=0.20, step=0.01)
var float TAKE_PROFIT = input.float(0.15, "Take Profit %", minval=0.05, maxval=0.50, step=0.01)

// Momentum periods (in trading days)
var int MOMENTUM_3M = input.int(63, "3-Month Momentum Period", minval=20)
var int MOMENTUM_6M = input.int(126, "6-Month Momentum Period", minval=40)
var int MOMENTUM_9M = input.int(189, "9-Month Momentum Period", minval=60)
var int MOMENTUM_12M = input.int(252, "12-Month Momentum Period", minval=80)

// Function to calculate momentum for a specific period
momentum(period) =>
    close / close[period] - 1

// Function to calculate annualized volatility
calcVolatility() =>
    returns = ta.change(close) / close[1]
    stdDev = ta.stdev(returns, TRADING_DAYS_PER_YEAR)
    annualizedVol = stdDev * SQRT_TRADING_DAYS
    annualizedVol

// Calculate individual momentum scores
float mom3m = momentum(MOMENTUM_3M)
float mom6m = momentum(MOMENTUM_6M)
float mom9m = momentum(MOMENTUM_9M)
float mom12m = momentum(MOMENTUM_12M)

// Calculate average momentum score
var int validPeriods = 0
var float totalMomentum = 0.0

validPeriods := 0
totalMomentum := 0.0

if not na(mom3m)
    validPeriods := validPeriods + 1
    totalMomentum := totalMomentum + mom3m

if not na(mom6m)
    validPeriods := validPeriods + 1
    totalMomentum := totalMomentum + mom6m

if not na(mom9m)
    validPeriods := validPeriods + 1
    totalMomentum := totalMomentum + mom9m

if not na(mom12m)
    validPeriods := validPeriods + 1
    totalMomentum := totalMomentum + mom12m

float compositeMomentum = validPeriods > 0 ? totalMomentum / validPeriods : na

// Calculate volatility
float annualizedVolatility = calcVolatility()

// Generate trading signals
var float MOMENTUM_THRESHOLD = input.float(0.0, "Momentum Threshold", minval=-1.0, maxval=1.0, step=0.01)
bool validVolatility = not na(annualizedVolatility) and annualizedVolatility <= VOLATILITY_THRESHOLD
bool validMomentum = not na(compositeMomentum) and compositeMomentum > MOMENTUM_THRESHOLD

// Store previous momentum state
bool prevValidMomentum = nz(validMomentum[1])

// Entry and exit conditions
bool longCondition = validVolatility and validMomentum and not prevValidMomentum
bool exitLongCondition = validVolatility and (not validMomentum) and prevValidMomentum

// Plot signals
plotshape(longCondition, title="Long Entry", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(exitLongCondition, title="Long Exit", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

// Plot momentum and volatility indicators
plot(compositeMomentum, "Composite Momentum", color=color.blue, linewidth=2)
hline(MOMENTUM_THRESHOLD, "Momentum Threshold", color=color.gray, linestyle=hline.style_dashed)

plot(annualizedVolatility, "Annualized Volatility", color=color.purple, linewidth=1)
hline(VOLATILITY_THRESHOLD, "Volatility Threshold", color=color.gray, linestyle=hline.style_dashed)

// Strategy execution - Long positions
if (longCondition)
    strategy.entry("Long", strategy.long)
    
if (strategy.position_size > 0)
    float longStopLoss = strategy.position_avg_price * (1 - STOP_LOSS)
    float longTakeProfit = strategy.position_avg_price * (1 + TAKE_PROFIT)
    strategy.exit("Exit Long", "Long", stop=longStopLoss, limit=longTakeProfit)
    if (exitLongCondition)
        strategy.close("Long", comment="Signal Exit")
```

> Detail

https://www.fmz.com/strategy/483505

> Last Modified

2025-02-24 09:38:10
