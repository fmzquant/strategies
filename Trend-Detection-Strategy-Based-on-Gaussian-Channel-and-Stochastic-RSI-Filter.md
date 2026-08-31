
> Name

Trend-Detection-Strategy-Based-on-Gaussian-Channel-and-Stochastic-RSI-Filter

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8885839dcde31be1d7a.png)
![IMG](https://www.fmz.com/upload/asset/2d818261c73a59de1f53c.png)



[trans]
#### 概述
该策略是一个结合了高斯通道和随机相对强弱指数(Stochastic RSI)的趋势跟踪交易系统。高斯通道用于识别价格趋势和波动范围,而Stochastic RSI则作为过滤器来确认超买超卖条件,从而提高交易信号的准确性。策略通过观察价格与高斯通道边界的交叉以及Stochastic RSI的位置来生成交易信号。

#### 策略原理
策略的核心逻辑基于以下几个关键组件:
1. 高斯通道计算:使用高斯滤波器计算中线,并基于乘数设置上下通道带。高斯滤波器采用指数平滑方法,可以有效降低价格噪声。
2. Stochastic RSI指标:结合了随机指标和RSI的优点,通过%K和%D两条平滑线来识别超买超卖状态。
3. 入场条件:
   - 多头:价格突破高斯通道下轨且Stochastic RSI处于超卖区域
   - 空头:价格跌破高斯通道上轨且Stochastic RSI处于超买区域
4. 出场条件:
   - 当价格穿越高斯通道中线
   - 或Stochastic RSI达到相反的超买超卖水平

#### 策略优势
1. 信号可靠性高:结合趋势和动量指标,能够有效过滤虚假信号
2. 风险控制完善:使用高斯通道作为动态支撑压力位,提供了良好的风险管理框架
3. 参数可调性强:可根据不同市场特征调整通道宽度和RSI参数
4. 计算效率高:高斯滤波器计算量较小,适合实时交易
5. 适应性强:可以在不同时间周期和市场环境下使用

#### 策略风险
1. 震荡市场风险:在横盘市场可能产生频繁的假突破信号
2. 滞后性风险:指标平滑处理会导致一定的信号延迟
3. 参数敏感性:不同参数组合可能导致显著不同的交易结果
4. 市场环境依赖:在强趋势市场表现较好,但在快速反转市场可能产生较大回撤

#### 策略优化方向
1. 动态参数优化:
   - 根据市场波动率自适应调整通道宽度
   - 基于市场周期特征动态调整Stochastic RSI参数
2. 信号确认机制:
   - 添加成交量确认指标
   - 引入趋势强度过滤器
3. 风险管理增强:
   - 实现动态止损止盈
   - 加入头寸管理模块
4. 市场环境识别:
   - 开发市场状态分类器
   - 根据不同市场状态调整策略参数

#### 总结
该策略通过结合高斯通道和Stochastic RSI,构建了一个兼具趋势跟踪和动量特征的交易系统。策略设计合理,具有较好的可扩展性和适应性。通过建议的优化方向,可以进一步提升策略的稳定性和盈利能力。在实际应用中,建议充分测试不同参数组合,并根据具体市场特征进行针对性优化。 || 

#### Overview
This strategy is a trend-following trading system that combines Gaussian Channel and Stochastic RSI. The Gaussian Channel is used to identify price trends and volatility ranges, while the Stochastic RSI serves as a filter to confirm overbought/oversold conditions, thereby improving the accuracy of trading signals. The strategy generates trading signals by observing price crosses with Gaussian Channel boundaries and Stochastic RSI positions.

#### Strategy Principle
The core logic of the strategy is based on the following key components:
1. Gaussian Channel Calculation: Uses Gaussian filter to calculate the midline and sets channel bands based on multipliers. The Gaussian filter employs exponential smoothing to effectively reduce price noise.
2. Stochastic RSI Indicator: Combines the advantages of Stochastic and RSI indicators, using %K and %D smoothed lines to identify overbought/oversold conditions.
3. Entry Conditions:
   - Long: Price breaks above the lower Gaussian band and Stochastic RSI is in oversold territory
   - Short: Price breaks below the upper Gaussian band and Stochastic RSI is in overbought territory
4. Exit Conditions:
   - When price crosses the Gaussian Channel midline
   - Or when Stochastic RSI reaches opposite overbought/oversold levels

#### Strategy Advantages
1. High Signal Reliability: Combines trend and momentum indicators to effectively filter false signals
2. Robust Risk Control: Uses Gaussian Channel as dynamic support/resistance levels, providing a solid risk management framework
3. Strong Parameter Adaptability: Can adjust channel width and RSI parameters for different market characteristics
4. High Computational Efficiency: Gaussian filter requires minimal computation, suitable for real-time trading
5. Strong Adaptability: Can be used across different timeframes and market environments

#### Strategy Risks
1. Choppy Market Risk: May generate frequent false breakout signals in sideways markets
2. Lag Risk: Indicator smoothing leads to certain signal delays
3. Parameter Sensitivity: Different parameter combinations may lead to significantly different trading results
4. Market Environment Dependency: Performs well in strong trends but may experience larger drawdowns in quick reversal markets

#### Strategy Optimization Directions
1. Dynamic Parameter Optimization:
   - Adapt channel width based on market volatility
   - Dynamically adjust Stochastic RSI parameters based on market cycle characteristics
2. Signal Confirmation Mechanism:
   - Add volume confirmation indicators
   - Introduce trend strength filters
3. Risk Management Enhancement:
   - Implement dynamic stop-loss and take-profit
   - Add position management module
4. Market Environment Recognition:
   - Develop market state classifier
   - Adjust strategy parameters based on different market states

#### Summary
The strategy builds a trading system combining trend-following and momentum characteristics through the integration of Gaussian Channel and Stochastic RSI. The strategy design is reasonable, with good scalability and adaptability. Through the suggested optimization directions, the strategy's stability and profitability can be further improved. In practical application, it is recommended to thoroughly test different parameter combinations and optimize specifically according to market characteristics.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-21 00:00:00
end: 2025-02-20 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("Gaussian Channel + Stochastic RSI Filter", overlay=true, margin_long=100, margin_short=100)

// === INPUTS ===
input_length = input.int(100, title="Gaussian Channel Length", minval=1)
input_mult = input.float(2.0, title="Gaussian Channel Multiplier", minval=0.1, step=0.1)
stoch_rsi_period = input.int(14, title="Stochastic RSI Period", minval=1)
stoch_rsi_smoothK = input.int(3, title="Stochastic RSI Smooth K", minval=1)
stoch_rsi_smoothD = input.int(3, title="Stochastic RSI Smooth D", minval=1)
stoch_rsi_overbought = input.float(80.0, title="Stochastic RSI Overbought Level", minval=0, maxval=100)
stoch_rsi_oversold = input.float(20.0, title="Stochastic RSI Oversold Level", minval=0, maxval=100)

// === GAUSSIAN CHANNEL ===
// Gaussian filter calculation with proper initialization
gauss(src, len) =>
    b = math.exp(-1.414 * 3.14159 / len)
    a0 = 1 - b
    var float f = na
    f := na(f[1]) ? src : a0 * src + b * f[1]

// Calculate Gaussian channel
gaussian_channel_mid = gauss(close, input_length)
gaussian_channel_high = gaussian_channel_mid + gaussian_channel_mid * input_mult / 100
gaussian_channel_low = gaussian_channel_mid - gaussian_channel_mid * input_mult / 100

// Plot Gaussian Channel
plot(gaussian_channel_mid, color=color.blue, linewidth=2, title="Gaussian Channel Midline")
plot(gaussian_channel_high, color=color.green, linewidth=1, title="Gaussian Channel Upper Band")
plot(gaussian_channel_low, color=color.red, linewidth=1, title="Gaussian Channel Lower Band")

// === STOCHASTIC RSI ===
k = ta.sma(ta.stoch(close, high, low, stoch_rsi_period), stoch_rsi_smoothK)
d = ta.sma(k, stoch_rsi_smoothD)
is_oversold = k < stoch_rsi_oversold and d < stoch_rsi_oversold
is_overbought = k > stoch_rsi_overbought and d > stoch_rsi_overbought

// Plot Stochastic RSI
hline(stoch_rsi_overbought, "Overbought", color=color.red, linestyle=hline.style_dotted)
hline(stoch_rsi_oversold, "Oversold", color=color.green, linestyle=hline.style_dotted)
plot(k, color=color.blue, title="Stochastic RSI %K")
plot(d, color=color.orange, title="Stochastic RSI %D")

// === ENTRY AND EXIT LOGIC ===
// Long entry: Price crosses above Gaussian Channel lower band and Stochastic RSI is oversold
long_condition = ta.crossover(close, gaussian_channel_low) and is_oversold

// Short entry: Price crosses below Gaussian Channel upper band and Stochastic RSI is overbought
short_condition = ta.crossunder(close, gaussian_channel_high) and is_overbought

// Exit logic
long_exit = ta.crossunder(close, gaussian_channel_mid) or is_overbought
short_exit = ta.crossover(close, gaussian_channel_mid) or is_oversold

// Execute trades
if (long_condition)
    strategy.entry("Long", strategy.long)

if (short_condition)
    strategy.entry("Short", strategy.short)

if (long_exit)
    strategy.close("Long")

if (short_exit)
    strategy.close("Short")

// === SETTINGS ===
// Backtest date range
start_date = timestamp(2023, 1, 1, 0, 0)
end_date = timestamp(2069, 1, 1, 0, 0)
if (time < start_date or time > end_date)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/483073

> Last Modified

2025-02-21 11:42:36
