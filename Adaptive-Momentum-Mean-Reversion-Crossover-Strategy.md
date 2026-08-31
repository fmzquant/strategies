
> Name

Adaptive-Momentum-Mean-Reversion-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11e90d1a2f18aa07266.png)

[trans]
#### 概述
该策略是一个结合动量和均值回归理论的混合交易系统。它通过价格变化率(ROC)指标和布林带(Bollinger Bands)来识别市场的超买和超卖状态,在特定阈值交叉时触发交易信号。策略的核心是通过检测动量转换点并利用价格向均值回归的特性来获取收益。

#### 策略原理
策略采用2周期ROC指标计算短期价格变化,同时使用两组不同参数的布林带:短期布林带(18周期,1.7标准差)用于判断超卖条件和入场信号,长期布林带(21周期,2.1标准差)用于判断超买条件和出场信号。当ROC向上穿越下布林带时,表明价格动量由弱转强,系统开仓做多;当ROC向下穿越上布林带时,表明动量减弱,系统平仓出场。策略还通过背景颜色标注超买超卖区域,绿色表示超卖(可能上涨),红色表示超买(可能下跌)。

#### 策略优势
1. 自适应性强:布林带会根据市场波动率自动调整带宽,在不同市场环境下都能保持有效性
2. 风险控制完善:禁用金字塔加仓(pyramiding=0),确保每次只持有一个位置
3. 信号可靠性高:结合动量和均值回归两种策略,能更好地把握市场转折点
4. 实用性强:考虑了交易成本和滑点,更符合实际交易环境

#### 策略风险
1. 震荡市场风险:在区间震荡行情中可能产生频繁交易导致损失
2. 假突破风险:ROC指标可能产生虚假突破信号
3. 参数敏感性:布林带和ROC的参数设置对策略表现影响较大
4. 市场环境依赖:策略在趋势明显的市场中表现更好,而在剧烈波动时可能失效

#### 策略优化方向
1. 引入趋势过滤器:可添加长期移动平均线来过滤市场主趋势,提高交易方向的准确性
2. 优化参数设置:可通过历史数据回测,寻找最优的ROC周期和布林带参数组合
3. 增加止损机制:设置固定止损或跟踪止损来控制风险
4. 增加成交量确认:结合成交量指标来验证价格突破的有效性

#### 总结
自适应动量均值回归交叉策略通过结合ROC指标和双重布林带,构建了一个能够适应不同市场环境的交易系统。策略在保持灵活性的同时也注重风险控制,具有较好的实用价值。通过持续优化和改进,该策略有望在实际交易中取得更好的表现。 || 

#### Overview
This strategy is a hybrid trading system that combines momentum and mean reversion theories. It identifies market overbought and oversold conditions using the Rate of Change (ROC) indicator and Bollinger Bands, triggering trades when specific thresholds are crossed. The core concept is to detect momentum shifts and capitalize on price reversions to their mean.

#### Strategy Principles
The strategy employs a 2-period ROC indicator to calculate short-term price changes, along with two sets of Bollinger Bands: short-term (18-period, 1.7 standard deviations) for oversold conditions and entry signals, and long-term (21-period, 2.1 standard deviations) for overbought conditions and exit signals. Long positions are initiated when ROC crosses above the lower Bollinger Band, indicating a shift from weak to strong momentum, and positions are closed when ROC crosses below the upper Bollinger Band, signaling weakening momentum. The strategy also uses background colors to highlight overbought (red) and oversold (green) zones.

#### Strategy Advantages
1. High Adaptability: Bollinger Bands automatically adjust their width based on market volatility, maintaining effectiveness across different market conditions
2. Robust Risk Control: Pyramiding is disabled (pyramiding=0), ensuring only one position at a time
3. Reliable Signals: Combination of momentum and mean reversion strategies provides better market turning point identification
4. Practicality: Includes transaction costs and slippage considerations for real-world trading conditions

#### Strategy Risks
1. Choppy Market Risk: May generate frequent trades leading to losses in range-bound markets
2. False Breakout Risk: ROC indicator may produce false breakthrough signals
3. Parameter Sensitivity: Strategy performance heavily depends on Bollinger Bands and ROC parameter settings
4. Market Environment Dependency: Strategy performs better in trending markets but may fail during extreme volatility

#### Strategy Optimization Directions
1. Introduce Trend Filter: Add long-term moving averages to filter market trends and improve directional accuracy
2. Optimize Parameters: Conduct historical data backtesting to find optimal ROC period and Bollinger Bands parameter combinations
3. Add Stop-Loss Mechanisms: Implement fixed or trailing stop-losses for risk control
4. Include Volume Confirmation: Incorporate volume indicators to validate price breakouts

#### Summary
The Adaptive Momentum Mean-Reversion Crossover Strategy builds a trading system capable of adapting to different market environments by combining ROC indicators and dual Bollinger Bands. While maintaining flexibility, the strategy emphasizes risk control and demonstrates practical value. Through continuous optimization and improvement, this strategy shows promise for better performance in actual trading.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-08 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Adaptive Momentum Reversion Strategy ", overlay=false, initial_capital=50000, pyramiding=0, commission_type=strategy.commission.cash_per_contract, commission_value=0.05, slippage=1)

// Input: ROC Period
rocPeriod = input.int(2, title="ROC Period", minval=1)

// Input: Bollinger Bands Settings (Lower Band)
bbLowerLength = input.int(18, title="Lower Bollinger Band Length", minval=1)
bbLowerStdDev = input.float(1.7, title="Lower Bollinger Band StdDev", minval=0.1, step=0.1)

// Input: Bollinger Bands Settings (Upper Band)
bbUpperLength = input.int(21, title="Upper Bollinger Band Length", minval=1)
bbUpperStdDev = input.float(2.1, title="Upper Bollinger Band StdDev", minval=0.1, step=0.1)

// ROC Calculation
rocValue = (close - close[rocPeriod]) / close[rocPeriod] * 100

// Bollinger Bands Calculation
bbLowerBasis = ta.sma(rocValue, bbLowerLength)  // Basis for Lower Band
bbLower = bbLowerBasis - bbLowerStdDev * ta.stdev(rocValue, bbLowerLength)  // Lower Band

bbUpperBasis = ta.sma(rocValue, bbUpperLength)  // Basis for Upper Band
bbUpper = bbUpperBasis + bbUpperStdDev * ta.stdev(rocValue, bbUpperLength)  // Upper Band

// Plot ROC
plot(rocValue, color=color.blue, linewidth=2, title="ROC Value")

// Plot Bollinger Bands
plot(bbLowerBasis, color=color.gray, linewidth=1, title="Lower BB Basis (SMA)")
plot(bbLower, color=color.green, linewidth=1, title="Lower Bollinger Band")
plot(bbUpperBasis, color=color.gray, linewidth=1, title="Upper BB Basis (SMA)")
plot(bbUpper, color=color.red, linewidth=1, title="Upper Bollinger Band")

// Add Zero Line for Reference
hline(0, "Zero Line", color=color.gray, linestyle=hline.style_dotted)

// Entry Condition: Long when ROC crosses above the lower Bollinger Band
longCondition = ta.crossover(rocValue, bbLower)
if (longCondition)
    strategy.entry("Long", strategy.long)

// Exit Condition: Exit on Upper Bollinger Band Cross or ROC drops below Lower Band again
exitCondition = ta.crossunder(rocValue, bbUpper)
if (exitCondition)
    strategy.close("Long")

// Background Color for Extreme Conditions
bgcolor(rocValue > bbUpper ? color.new(color.red, 80) : na, title="Overbought (ROC above Upper BB)")
bgcolor(rocValue < bbLower ? color.new(color.green, 80) : na, title="Oversold (ROC below Lower BB)")
```

> Detail

https://www.fmz.com/strategy/477952

> Last Modified

2025-01-10 15:26:18
