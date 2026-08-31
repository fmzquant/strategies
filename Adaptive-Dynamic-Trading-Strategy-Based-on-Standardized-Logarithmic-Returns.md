
> Name

Adaptive-Dynamic-Trading-Strategy-Based-on-Standardized-Logarithmic-Returns

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15b483dcb29027804eb.png)

[trans]
#### 概述
该策略是一个基于Shiryaev-Zhou指数(SZI)的自适应交易系统。它通过计算对数收益率的标准化得分来识别市场的超买和超卖状态,从而捕捉价格的均值回归机会。策略结合了动态的止损和获利目标,实现风险的精确控制。

#### 策略原理
策略的核心是通过对数收益率的滚动统计特征来构建标准化指标。具体步骤如下:
1. 计算对数收益率,以实现收益率的正态化处理
2. 使用50周期窗口计算滚动均值和标准差
3. 构建SZI指标: (对数收益率-滚动均值)/滚动标准差
4. 当SZI低于-2.0时产生做多信号,高于2.0时产生做空信号
5. 设置基于入场价格的2%止损和4%止盈水平

#### 策略优势
1. 理论基础扎实:基于对数正态分布假设,具有良好的统计学支持
2. 自适应性强:通过滚动窗口计算,能够适应市场波动特征的变化
3. 风险控制完善:采用百分比止损策略,实现对每笔交易风险的精确控制
4. 可视化友好:在图表上清晰标注交易信号和风险控制水平

#### 策略风险
1. 参数敏感性:滚动窗口长度和阈值的选择会显著影响策略表现
2. 市场环境依赖:在趋势市场中可能产生频繁的虚假信号
3. 滑点影响:在剧烈波动时期,实际成交价格可能显著偏离理想水平
4. 计算延迟:实时计算统计指标可能产生一定的信号滞后

#### 策略优化方向
1. 动态阈值:可考虑根据市场波动率动态调整信号阈值
2. 多时间周期:引入多个时间周期的信号确认机制
3. 波动率过滤:在极端波动期间暂停交易或调整仓位
4. 信号确认:增加成交量、动量等辅助指标进行信号确认
5. 仓位管理:实现基于波动率的动态仓位管理

#### 总结
这是一个建立在扎实统计学基础上的量化交易策略,通过标准化对数收益捕捉价格波动机会。策略的主要优势在于其自适应性和完善的风险控制,但在参数选择和市场环境适应性方面仍有优化空间。通过引入动态阈值和多维度信号确认机制,策略的稳定性和可靠性有望进一步提升。||

#### Overview
This strategy is an adaptive trading system based on the Shiryaev-Zhou Index (SZI). It identifies overbought and oversold market conditions by calculating standardized scores of logarithmic returns, aiming to capture mean reversion opportunities. The strategy incorporates dynamic stop-loss and take-profit targets for precise risk control.

#### Strategy Principles
The core of the strategy lies in constructing a standardized indicator using rolling statistical properties of logarithmic returns. The specific steps are:
1. Calculate logarithmic returns for normalization
2. Compute rolling mean and standard deviation using a 50-period window
3. Construct SZI: (logarithmic return - rolling mean)/rolling standard deviation
4. Generate long signals when SZI falls below -2.0 and short signals when above 2.0
5. Set 2% stop-loss and 4% take-profit levels based on entry price

#### Strategy Advantages
1. Solid Theoretical Foundation: Based on log-normal distribution assumptions with strong statistical support
2. High Adaptability: Rolling window calculations adapt to changes in market volatility characteristics
3. Comprehensive Risk Control: Percentage-based stop-loss strategy enables precise risk control for each trade
4. User-friendly Visualization: Clear annotation of trading signals and risk control levels on charts

#### Strategy Risks
1. Parameter Sensitivity: Strategy performance significantly affected by choice of rolling window length and thresholds
2. Market Environment Dependency: May generate frequent false signals in trending markets
3. Slippage Impact: Actual execution prices may significantly deviate from ideal levels during volatile periods
4. Calculation Delay: Real-time computation of statistical indicators may lead to signal lag

#### Optimization Directions
1. Dynamic Thresholds: Consider adjusting signal thresholds based on market volatility
2. Multiple Time Frames: Introduce signal confirmation mechanisms across multiple timeframes
3. Volatility Filtering: Pause trading or adjust positions during extreme volatility periods
4. Signal Confirmation: Add volume, momentum, and other auxiliary indicators for signal confirmation
5. Position Management: Implement volatility-based dynamic position sizing

#### Summary
This is a quantitative trading strategy built on solid statistical foundations, capturing price volatility opportunities through standardized logarithmic returns. The strategy's main strengths lie in its adaptability and comprehensive risk control, though there remains room for optimization in parameter selection and market environment adaptation. Through the introduction of dynamic thresholds and multi-dimensional signal confirmation mechanisms, the strategy's stability and reliability can be further enhanced.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-25 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Jalambi Paul model", overlay=true)

// Define the length for the rolling window
window = input.int(50, title="Window Length", minval=1)
threshold = 2.0 // Fixed threshold value
risk_percentage = input.float(1.0, title="Risk Percentage per Trade", step=0.1) / 100

// Calculate the logarithmic returns
log_return = math.log(close / close[1])

// Calculate the rolling mean and standard deviation
rolling_mean = ta.sma(log_return, window)
rolling_std = ta.stdev(log_return, window)

// Calculate the Shiryaev-Zhou Index (SZI)
SZI = (log_return - rolling_mean) / rolling_std

// Generate signals based on the fixed threshold
long_signal = SZI < -threshold
short_signal = SZI > threshold

// Plot the signals on the main chart (overlay on price)
plotshape(series=long_signal, location=location.belowbar, color=color.green, style=shape.labelup, title="Buy Signal", text="BUY", offset=-1)
plotshape(series=short_signal, location=location.abovebar, color=color.red, style=shape.labeldown, title="Sell Signal", text="SELL", offset=-1)

// Strategy logic: Buy when SZI crosses below the negative threshold, Sell when it crosses above the positive threshold
if (long_signal)
    strategy.entry("Buy", strategy.long, comment="Long Entry")
    
if (short_signal)
    strategy.entry("Sell", strategy.short, comment="Short Entry")

// Calculate the stop loss and take profit levels based on the percentage of risk
stop_loss_pct = input.float(2.0, title="Stop Loss (%)") / 100
take_profit_pct = input.float(4.0, title="Take Profit (%)") / 100

// Set the stop loss and take profit levels based on the entry price
strategy.exit("Take Profit / Stop Loss", "Buy", stop=close * (1 - stop_loss_pct), limit=close * (1 + take_profit_pct))
strategy.exit("Take Profit / Stop Loss", "Sell", stop=close * (1 + stop_loss_pct), limit=close * (1 - take_profit_pct))

// Plot the stop loss and take profit levels for visualization (optional)
plot(stop_loss_pct != 0 ? close * (1 - stop_loss_pct) : na, color=color.red, linewidth=1, title="Stop Loss Level")
plot(take_profit_pct != 0 ? close * (1 + take_profit_pct) : na, color=color.green, linewidth=1, title="Take Profit Level")

```

> Detail

https://www.fmz.com/strategy/476254

> Last Modified

2024-12-27 14:39:32
