
> Name

Dynamic-Support-and-Resistance-Adaptive-Pivot-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/75219dacf044c42c2c.png)

[trans]
#### 概述
本策略是一个基于价格枢轴点动态识别支撑和阻力位的自适应交易系统。它通过实时计算局部高点和低点来确定关键价格水平,并在此基础上执行交易。该策略的核心在于其动态性,能够根据市场条件的变化及时调整交易参数,适用于趋势和震荡市场。

#### 策略原理
策略的核心逻辑基于以下几个关键要素:
1. 动态枢轴点计算:使用可调节的枢轴长度参数(默认值为2)来识别局部高低点
2. 支撑阻力区间:在枢轴点基础上设定百分比范围(默认0.4%)来界定有效交易区域
3. 交易信号生成:当价格从下方突破支撑位形成做多信号,从上方跌破阻力位形成做空信号
4. 风险控制:采用动态止损(10%)和获利(27%)设置,并根据账户权益自动调整持仓规模

#### 策略优势
1. 自适应性强:策略能够根据市场状态动态调整支撑阻力位置,避免静态级别带来的滞后性
2. 风险可控:通过严格的百分比止损和动态仓位管理,将每笔交易的风险控制在合理范围内
3. 可扩展性:支持多个时间周期和参数组合,便于根据不同市场环境进行优化
4. 透明度高:交易逻辑清晰,所有信号和价格水平都可在图表上直观显示

#### 策略风险
1. 假突破风险:在震荡市场中可能出现频繁的假突破信号,需要通过调整支撑阻力区间参数来降低
2. 滑点影响:在流动性较差的市场环境下,实际成交价格可能与信号价格存在较大偏差
3. 趋势依赖:策略在强趋势市场表现较好,但在横盘整理阶段可能产生过多交易信号
4. 参数敏感:策略表现对参数设置较为敏感,需要通过回测来确定最优参数组合

#### 策略优化方向
1. 增加市场环境识别模块,根据波动率自动调整参数
2. 引入成交量和其他技术指标作为辅助确认信号
3. 优化仓位管理算法,考虑市场波动性进行动态调整
4. 添加时间过滤器,避免在不利时段产生交易信号
5. 开发自适应止损算法,根据市场波动性动态调整止损位置

#### 总结
该策略通过动态识别关键价格水平并结合严格的风险控制,为趋势跟踪和反转交易提供了一个可靠的框架。虽然存在一定的参数敏感性和市场环境依赖性,但通过持续优化和完善,能够在不同市场环境下保持稳定的表现。策略的成功运行需要交易者深入理解其原理,并根据具体市场情况进行适当的参数调整。 || 

#### Overview
This strategy is an adaptive trading system based on dynamic identification of support and resistance levels using price pivot points. It determines key price levels by calculating local highs and lows in real-time and executes trades accordingly. The core strength lies in its dynamic nature, allowing it to adjust trading parameters based on changing market conditions, making it suitable for both trending and ranging markets.

#### Strategy Principles
The core logic is based on several key elements:
1. Dynamic pivot calculation: Uses adjustable pivot length parameter (default 2) to identify local highs and lows
2. Support/resistance zones: Establishes percentage-based ranges (default 0.4%) around pivot points to define valid trading areas
3. Signal generation: Long signals when price breaks above support, short signals when price breaks below resistance
4. Risk management: Implements dynamic stop-loss (10%) and take-profit (27%) levels, with position sizing based on account equity

#### Strategy Advantages
1. High adaptability: Dynamically adjusts support/resistance levels based on market conditions, avoiding lag from static levels
2. Controlled risk: Maintains reasonable risk per trade through strict percentage-based stops and dynamic position sizing
3. Scalability: Supports multiple timeframes and parameter combinations for optimization across different market environments
4. Transparency: Clear trading logic with all signals and price levels visually displayed on charts

#### Strategy Risks
1. False breakout risk: May generate frequent false signals in ranging markets, requiring adjustment of support/resistance zone parameters
2. Slippage impact: Actual execution prices may differ significantly from signal prices in less liquid market conditions
3. Trend dependency: Strategy performs better in trending markets but may generate excessive signals during consolidation phases
4. Parameter sensitivity: Performance highly dependent on parameter settings, requiring thorough backtesting for optimization

#### Optimization Directions
1. Add market environment recognition module for automatic parameter adjustment based on volatility
2. Incorporate volume and additional technical indicators as confirmation signals
3. Optimize position sizing algorithm with dynamic adjustments based on market volatility
4. Implement time filters to avoid trading during unfavorable periods
5. Develop adaptive stop-loss algorithm with dynamic adjustment based on market volatility

#### Summary
The strategy provides a reliable framework for trend-following and reversal trading through dynamic identification of key price levels combined with strict risk control. While it exhibits some parameter sensitivity and market environment dependency, continuous optimization and refinement enable consistent performance across different market conditions. Successful implementation requires traders to deeply understand its principles and adjust parameters according to specific market situations.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-08 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © felipemiransan

//@version=6
strategy("Dynamic Support and Resistance Pivot Strategy ", overlay=true)

// Strategy parameters
pivot_length = input.int(2, title="Pivot Length", tooltip="Pivot size to identify peaks and troughs")
support_resistance_distance = input.float(0.4, title="Support/Resistance Distance %", tooltip="Distance to consider a support or resistance level in %")

// Stop Loss and Take Profit parameters
stop_loss_pct = input.float(10.0, title="Stop Loss %", tooltip="Stop loss percentage", minval=0.1) / 100
take_profit_pct = input.float(26.0, title="Take Profit %", tooltip="Take profit percentage", minval=0.1) / 100

// Functions to identify high and low pivots
pivot_high = ta.pivothigh(high, pivot_length, pivot_length)
pivot_low = ta.pivotlow(low, pivot_length, pivot_length)

// Storing support and resistance levels
var float resistance_level = na
var float support_level = na
var float last_pivot_high = na
var float last_pivot_low = na

// Updating support and resistance based on pivots
if (not na(pivot_high))
    resistance_level := high[pivot_length]
    last_pivot_high := high[pivot_length]

if (not na(pivot_low))
    support_level := low[pivot_length]
    last_pivot_low := low[pivot_length]

// Function to check if the current price is near a support or resistance level
is_near_resistance = (not na(resistance_level)) and (close >= resistance_level * (1 - support_resistance_distance / 100)) and (close <= resistance_level * (1 + support_resistance_distance / 100))
is_near_support = (not na(support_level)) and (close >= support_level * (1 - support_resistance_distance / 100)) and (close <= support_level * (1 + support_resistance_distance / 100))

// Cross conditions variables
long_cross = ta.crossover(close, support_level) and not na(support_level)
short_cross = ta.crossunder(close, resistance_level) and not na(resistance_level)

// Entry conditions
long_condition = is_near_support and long_cross  // Buy when crossing support from below
short_condition = is_near_resistance and short_cross  // Sell when crossing resistance from above

// Order execution
if (long_condition)
    strategy.entry("Long", strategy.long)

if (short_condition)
    strategy.entry("Short", strategy.short)

// Stop Loss and Take Profit
if (strategy.opentrades > 0)
    if (strategy.position_size > 0)  // For long position
        avg_price_long = strategy.position_avg_price
        long_stop_level = avg_price_long * (1 - stop_loss_pct)
        long_take_profit_level = avg_price_long * (1 + take_profit_pct)
        strategy.exit("Exit Long", from_entry="Long", stop=long_stop_level, limit=long_take_profit_level)

    if (strategy.position_size < 0)  // For short position
        avg_price_short = strategy.position_avg_price
        short_stop_level = avg_price_short * (1 + stop_loss_pct)
        short_take_profit_level = avg_price_short * (1 - take_profit_pct)
        strategy.exit("Exit Short", from_entry="Short", stop=short_stop_level, limit=short_take_profit_level)

// Plotting support and resistance levels on the chart
plot(support_level, title="Support", color=color.green, linewidth=2, style=plot.style_line)
plot(resistance_level, title="Resistance", color=color.red, linewidth=2, style=plot.style_line)

// Adding labels to show pivot values
if (long_condition and not na(support_level))
    label.new(bar_index, low[pivot_length], str.tostring(low[pivot_length]), style=label.style_label_up, color=color.green, textcolor=color.white, size=size.small)

if (short_condition and not na(resistance_level))
    label.new(bar_index, high[pivot_length], str.tostring(high[pivot_length]), style=label.style_label_down, color=color.red, textcolor=color.white, size=size.small)

```

> Detail

https://www.fmz.com/strategy/477944

> Last Modified

2025-01-10 15:08:24
