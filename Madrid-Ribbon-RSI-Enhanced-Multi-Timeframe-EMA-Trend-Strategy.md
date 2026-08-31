
> Name

Madrid-Ribbon-RSI-Enhanced-Multi-Timeframe-EMA-Trend-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8faf87e65ff5672b64c.png)
![IMG](https://www.fmz.com/upload/asset/2d830139dc7d03e2a9967.png)




[trans]

## 概述

马德里带状RSI增强型多时框EMA趋势策略是一种综合性量化交易系统，该策略巧妙地结合了移动平均线带状系统（Madrid Ribbon）与相对强弱指标（RSI）过滤器，为趋势识别和交易执行提供了双重确认机制。该策略核心是通过监测多条不同周期（从5至90）的指数移动平均线（EMA）形成的带状结构，同时引入RSI指标作为过滤条件，有效减少假信号。策略内置自动化交易功能，包含预设的止盈止损机制，通过计算绿色和红色移动平均线的数量来确定市场趋势方向和强度，进而生成买入和卖出信号。

## 策略原理

该策略的核心原理基于对多时间框架移动平均线集群的分析和RSI指标的过滤作用：

1. **多时间框架移动平均线带状系统**：策略构建了从5到90周期的18条移动平均线，并与100周期的基准线进行比较。每条移动平均线根据其变化方向和相对于基准线的位置被赋予颜色标识：
   - 上升且位于基准线上方：亮绿色（lime）
   - 下降且位于基准线上方：暗红色（maroon）
   - 下降且位于基准线下方：红色（red）
   - 上升且位于基准线下方：绿色（green）

2. **趋势强度量化**：策略通过计算绿色（上升）和红色（下降）移动平均线的数量来量化趋势强度：
   - 当绿色移动平均线数量≥13时，识别为强劲上升趋势
   - 当红色移动平均线数量≥9时，识别为强劲下降趋势

3. **RSI过滤机制**：为减少假信号，策略引入RSI指标作为过滤条件：
   - 买入信号需满足：绿色移动平均线≥13且RSI<30（超卖区域）
   - 卖出信号需满足：红色移动平均线≥9且RSI>70（超买区域）

4. **风险管理机制**：策略设置了基于百分比的止盈止损参数：
   - 多头交易：止盈设置为入场价格+0.5%，止损设置为入场价格-1%
   - 空头交易：止盈设置为入场价格-0.5%，止损设置为入场价格+1%

5. **资金管理**：策略允许用户设置初始资金量，并基于当前价格自动计算头寸规模。

## 策略优势

1. **多重确认机制**：通过结合移动平均线带状系统和RSI指标，策略提供了多重确认机制，显著降低了错误信号的可能性。当移动平均线集群和RSI同时满足条件时，信号的可靠性大大提高。

2. **趋势强度量化**：不同于简单的交叉策略，该策略通过计算不同颜色移动平均线的数量来量化趋势强度，使交易决策更加客观和数据驱动。

3. **视觉化交易信号**：策略通过背景颜色变化和形状标记清晰地在图表上显示信号，使交易者能够直观地识别潜在的交易机会。

4. **内置风险管理**：策略默认集成了止盈止损机制，对每笔交易的最大收益和损失都有明确的预设，有效控制风险敞口。

5. **适应性强**：策略允许用户选择使用EMA或SMA，可以根据不同市场环境灵活调整。EMA对近期价格变动更敏感，而SMA则更平滑，不同设置适合不同的市场条件。

6. **全面的市场状态监测**：通过监测18条不同周期的移动平均线，策略能够全面捕捉市场动态，减少单一时间框架分析可能导致的盲点。

## 策略风险

1. **趋势反转延迟**：由于策略依赖多条移动平均线，在趋势快速反转时可能存在反应滞后，导致入场或出场时机不够理想。针对这一风险，可考虑添加更短周期的指标或调整RSI参数，提高策略对市场变化的敏感度。

2. **过滤条件严格导致错失机会**：RSI过滤条件设置较为严格（<30和>70），可能会错过一些潜在的交易机会。用户可根据特定市场特性适当调整RSI阈值，如将买入条件放宽至RSI<40，卖出条件放宽至RSI>60。

3. **固定止盈止损百分比的局限性**：策略使用固定百分比的止盈止损设置（0.5%和1%），这在不同波动率的市场中可能不够灵活。建议根据资产的平均真实波动幅度（ATR）动态调整止盈止损水平。

4. **市场横盘风险**：在市场横盘整理阶段，移动平均线可能频繁交错，造成信号混乱。可以通过添加额外的横盘检测机制（如ADX指标）来避免在低波动环境中过度交易。

5. **参数敏感性**：策略性能对参数选择（如移动平均线周期和RSI长度）较为敏感，参数选择不当可能导致策略表现不佳。建议在实盘使用前进行充分的参数优化和回测。

## 策略优化方向

1. **动态止盈止损机制**：用ATR指标替代固定百分比的止盈止损设置，可以更好地适应市场波动性变化。例如，可设置止损为1.5*ATR，止盈为1*ATR，使风险管理更加灵活和市场适应性。

2. **加入趋势强度过滤器**：引入ADX指标来衡量趋势强度，只在ADX>25的强趋势环境中交易，避免在弱趋势或横盘市场中产生过多假信号。

3. **优化RSI参数**：当前策略使用标准14周期RSI，可考虑根据具体资产特性和时间框架调整RSI周期，或使用双重RSI系统（如同时检查短周期和长周期RSI）以减少假信号。

4. **引入成交量确认**：添加成交量分析维度，确保信号发生时有足够的市场参与度支持，提高交易信号的可靠性。例如，可要求买入信号出现时成交量高于N日平均水平。

5. **实现仓位动态调整**：根据趋势强度（绿色或红色移动平均线的数量）动态调整头寸规模，在更强的趋势中增加头寸，在较弱趋势中减少头寸，优化资金利用效率。

6. **加入市场环境过滤**：通过波动率指标（如VIX或ATR）检测当前市场环境，在高波动环境中调整策略参数或暂停交易，降低极端市场条件下的风险。

## 总结

马德里带状RSI增强型多时框EMA趋势策略是一种功能全面的量化交易系统，通过结合移动平均线带状结构与RSI过滤机制，为交易者提供了强大的趋势识别和交易执行工具。策略的核心优势在于其多重确认机制和趋势强度量化能力，使交易决策更加客观和数据驱动。

尽管策略在趋势市场中表现良好，但在横盘市场和快速反转环境中可能面临挑战。通过引入动态止盈止损、趋势强度过滤、成交量确认等优化措施，可进一步提升策略的稳健性和适应性。

该策略特别适合中长期趋势交易者，通过合理的参数调整和风险管理，能够在各类市场环境中寻找高概率的交易机会。然而，任何交易策略都需要与交易者的风险偏好和投资目标相匹配，建议在实盘应用前进行充分的回测和优化。 || 

## Overview

The Madrid Ribbon RSI-Enhanced Multi-Timeframe EMA Trend Strategy is a comprehensive quantitative trading system that cleverly combines a moving average ribbon system (Madrid Ribbon) with a Relative Strength Index (RSI) filter, providing a dual confirmation mechanism for trend identification and trade execution. The core of this strategy involves monitoring a ribbon structure formed by multiple exponential moving averages (EMAs) of different periods (from 5 to 90), while incorporating the RSI indicator as a filtering condition to effectively reduce false signals. The strategy includes built-in automated trading functionality with preset profit targets and stop losses, determining market trend direction and strength by counting the number of green and red moving averages, which then generates buy and sell signals.

## Strategy Principles

The core principle of this strategy is based on the analysis of multi-timeframe moving average clusters and the filtering effect of the RSI indicator:

1. **Multi-Timeframe Moving Average Ribbon System**: The strategy constructs 18 moving averages ranging from 5 to 90 periods and compares them with a 100-period baseline. Each moving average is assigned a color identifier based on its direction of change and position relative to the baseline:
   - Rising and above the baseline: Lime
   - Falling and above the baseline: Maroon
   - Falling and below the baseline: Red
   - Rising and below the baseline: Green

2. **Trend Strength Quantification**: The strategy quantifies trend strength by counting the number of green (rising) and red (falling) moving averages:
   - When the number of green moving averages ≥ 13, it identifies a strong upward trend
   - When the number of red moving averages ≥ 9, it identifies a strong downward trend

3. **RSI Filtering Mechanism**: To reduce false signals, the strategy incorporates the RSI indicator as a filtering condition:
   - Buy signal requires: Green moving averages ≥ 13 and RSI < 30 (oversold territory)
   - Sell signal requires: Red moving averages ≥ 9 and RSI > 70 (overbought territory)

4. **Risk Management Mechanism**: The strategy sets percentage-based profit targets and stop losses:
   - Long trades: Profit target at entry price + 0.5%, stop loss at entry price - 1%
   - Short trades: Profit target at entry price - 0.5%, stop loss at entry price + 1%

5. **Capital Management**: The strategy allows users to set initial capital and automatically calculates position size based on the current price.

## Strategy Advantages

1. **Multiple Confirmation Mechanism**: By combining the moving average ribbon system with the RSI indicator, the strategy provides multiple confirmation mechanisms, significantly reducing the possibility of false signals. When both the moving average cluster and RSI simultaneously meet the conditions, the reliability of the signal is greatly improved.

2. **Trend Strength Quantification**: Unlike simple crossover strategies, this strategy quantifies trend strength by counting the number of different colored moving averages, making trading decisions more objective and data-driven.

3. **Visualized Trading Signals**: The strategy clearly displays signals on the chart through background color changes and shape markers, allowing traders to intuitively identify potential trading opportunities.

4. **Built-in Risk Management**: The strategy integrates profit target and stop loss mechanisms by default, with clear presets for maximum profit and loss on each trade, effectively controlling risk exposure.

5. **High Adaptability**: The strategy allows users to choose between EMA or SMA, which can be flexibly adjusted according to different market environments. EMAs are more sensitive to recent price changes, while SMAs are smoother, with different settings suitable for different market conditions.

6. **Comprehensive Market State Monitoring**: By monitoring 18 moving averages of different periods, the strategy can comprehensively capture market dynamics, reducing the blind spots that might be caused by single timeframe analysis.

## Strategy Risks

1. **Trend Reversal Delay**: Because the strategy relies on multiple moving averages, there may be a lagged response when trends rapidly reverse, leading to less-than-ideal entry or exit timing. To address this risk, consider adding shorter-period indicators or adjusting RSI parameters to increase the strategy's sensitivity to market changes.

2. **Strict Filtering Conditions Missing Opportunities**: The RSI filtering conditions are set quite strictly (< 30 and > 70), which may miss some potential trading opportunities. Users can adjust the RSI thresholds according to specific market characteristics, such as relaxing the buy condition to RSI < 40 and the sell condition to RSI > 60.

3. **Limitations of Fixed Percentage Profit Targets and Stop Losses**: The strategy uses fixed percentage settings for profit targets and stop losses (0.5% and 1%), which may not be flexible enough in markets with different volatility. It is recommended to dynamically adjust profit target and stop loss levels based on the Average True Range (ATR) of the asset.

4. **Ranging Market Risk**: During market consolidation phases, moving averages may frequently intersect, causing signal confusion. This can be mitigated by adding additional range detection mechanisms (such as the ADX indicator) to avoid excessive trading in low-volatility environments.

5. **Parameter Sensitivity**: Strategy performance is sensitive to parameter selection (such as moving average periods and RSI length). Inappropriate parameter selection may lead to poor strategy performance. It is recommended to conduct thorough parameter optimization and backtesting before live implementation.

## Strategy Optimization Directions

1. **Dynamic Profit Target and Stop Loss Mechanism**: Replace fixed percentage profit targets and stop losses with the ATR indicator to better adapt to changes in market volatility. For example, set stop loss at 1.5*ATR and profit target at 1*ATR, making risk management more flexible and market-adaptive.

2. **Add Trend Strength Filter**: Introduce the ADX indicator to measure trend strength, trading only in strong trend environments where ADX > 25, avoiding too many false signals in weak trend or ranging markets.

3. **Optimize RSI Parameters**: The current strategy uses the standard 14-period RSI. Consider adjusting the RSI period based on specific asset characteristics and timeframes, or use a dual RSI system (checking both short-period and long-period RSI) to reduce false signals.

4. **Incorporate Volume Confirmation**: Add a volume analysis dimension to ensure sufficient market participation when signals occur, increasing the reliability of trading signals. For example, require buy signals to coincide with volume above the N-day average level.

5. **Implement Dynamic Position Sizing**: Adjust position size dynamically based on trend strength (the number of green or red moving averages), increasing positions in stronger trends and reducing positions in weaker trends, optimizing capital efficiency.

6. **Add Market Environment Filtering**: Detect the current market environment through volatility indicators (such as VIX or ATR), adjusting strategy parameters or pausing trading in high-volatility environments, reducing risk under extreme market conditions.

## Summary

The Madrid Ribbon RSI-Enhanced Multi-Timeframe EMA Trend Strategy is a comprehensive quantitative trading system that provides traders with a powerful tool for trend identification and trade execution by combining the moving average ribbon structure with RSI filtering mechanisms. The core advantages of the strategy lie in its multiple confirmation mechanisms and trend strength quantification capabilities, making trading decisions more objective and data-driven.

Although the strategy performs well in trending markets, it may face challenges in ranging markets and rapid reversal environments. By introducing dynamic profit targets and stop losses, trend strength filtering, volume confirmation, and other optimization measures, the robustness and adaptability of the strategy can be further enhanced.

This strategy is particularly suitable for medium to long-term trend traders, capable of finding high-probability trading opportunities across various market environments through reasonable parameter adjustments and risk management. However, any trading strategy needs to match the trader's risk preference and investment objectives, so thorough backtesting and optimization are recommended before live implementation.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-24 00:00:00
end: 2025-03-23 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BNB_USDT"}]
*/

//@version=5
strategy("Madrid Ribbon Strategy with Backtesting", shorttitle="Madrid Ribbon Strat", overlay=true, default_qty_type=strategy.cash, default_qty_value=100000)

// Inputs
i_exp = input.bool(true, title="Use Exponential MA")
wallet_balance = input.float(100000, title="Starting Wallet Balance", minval=1000)

// RSI Settings
rsi_length = input.int(14, title="RSI Length")
rsi = ta.rsi(close, rsi_length)

// Profit Target & Stop Loss (%)
long_take_profit_perc = input.float(0.5, title="Long Take Profit (%)") / 100  // 0.5%
long_stop_loss_perc = input.float(1.0, title="Long Stop Loss (%)") / 100    // 1%
short_take_profit_perc = input.float(0.5, title="Short Take Profit (%)") / 100  // 0.5%
short_stop_loss_perc = input.float(1.0, title="Short Stop Loss (%)") / 100    // 1%

// Source
src = close

// Compute Moving Averages
ma05 = i_exp ? ta.ema(src, 5) : ta.sma(src, 5)
ma10 = i_exp ? ta.ema(src, 10) : ta.sma(src, 10)
ma15 = i_exp ? ta.ema(src, 15) : ta.sma(src, 15)
ma20 = i_exp ? ta.ema(src, 20) : ta.sma(src, 20)
ma25 = i_exp ? ta.ema(src, 25) : ta.sma(src, 25)
ma30 = i_exp ? ta.ema(src, 30) : ta.sma(src, 30)
ma35 = i_exp ? ta.ema(src, 35) : ta.sma(src, 35)
ma40 = i_exp ? ta.ema(src, 40) : ta.sma(src, 40)
ma45 = i_exp ? ta.ema(src, 45) : ta.sma(src, 45)
ma50 = i_exp ? ta.ema(src, 50) : ta.sma(src, 50)
ma55 = i_exp ? ta.ema(src, 55) : ta.sma(src, 55)
ma60 = i_exp ? ta.ema(src, 60) : ta.sma(src, 60)
ma65 = i_exp ? ta.ema(src, 65) : ta.sma(src, 65)
ma70 = i_exp ? ta.ema(src, 70) : ta.sma(src, 70)
ma75 = i_exp ? ta.ema(src, 75) : ta.sma(src, 75)
ma80 = i_exp ? ta.ema(src, 80) : ta.sma(src, 80)
ma85 = i_exp ? ta.ema(src, 85) : ta.sma(src, 85)
ma90 = i_exp ? ta.ema(src, 90) : ta.sma(src, 90)
ma100 = i_exp ? ta.ema(src, 100) : ta.sma(src, 100)

// Function for ribbon color
maColor(_ma, _maRef) =>
    diffMA = ta.change(_ma)
    resultColor = diffMA >= 0 and _ma > _maRef ? color.lime :
                  diffMA < 0 and _ma > _maRef ? color.maroon :
                  diffMA <= 0 and _ma < _maRef ? color.red :
                  diffMA >= 0 and _ma < _maRef ? color.green : color.gray
    resultColor

// Count Green and Red Ribbons
count_green = 0
count_red = 0

mas = array.new_float(18)
array.set(mas, 0, ma05)
array.set(mas, 1, ma10)
array.set(mas, 2, ma15)
array.set(mas, 3, ma20)
array.set(mas, 4, ma25)
array.set(mas, 5, ma30)
array.set(mas, 6, ma35)
array.set(mas, 7, ma40)
array.set(mas, 8, ma45)
array.set(mas, 9, ma50)
array.set(mas, 10, ma55)
array.set(mas, 11, ma60)
array.set(mas, 12, ma65)
array.set(mas, 13, ma70)
array.set(mas, 14, ma75)
array.set(mas, 15, ma80)
array.set(mas, 16, ma85)
array.set(mas, 17, ma90)

for i = 0 to array.size(mas) - 1
    ma = array.get(mas, i)
    col = maColor(ma, ma100)
    count_green += col == color.lime or col == color.green ? 1 : 0
    count_red += col == color.red or col == color.maroon ? 1 : 0

// Buy/Sell Conditions
buy_signal = count_green >= 13
sell_signal = count_red >= 9

// RSI Filtering
rsi_buy = buy_signal and rsi < 30
rsi_sell = sell_signal and rsi > 70

// Calculate Entry, Take Profit & Stop Loss for Long and Short
entry_price = close
long_take_profit = entry_price * (1 + long_take_profit_perc)  // +0.5%
long_stop_loss = entry_price * (1 - long_stop_loss_perc)      // -1%
short_take_profit = entry_price * (1 - short_take_profit_perc) // -0.5%
short_stop_loss = entry_price * (1 + short_stop_loss_perc)     // +1%

// Backtesting Orders
if rsi_buy
    strategy.entry("Buy", strategy.long, qty=wallet_balance / close)
    strategy.exit("Long Exit", from_entry="Buy", limit=long_take_profit, stop=long_stop_loss)
    alert("? Buy Signal! Entering long trade at " + str.tostring(entry_price), alert.freq_once_per_bar_close)

if rsi_sell
    strategy.entry("Sell", strategy.short, qty=wallet_balance / close)
    strategy.exit("Short Exit", from_entry="Sell", limit=short_take_profit, stop=short_stop_loss)
    alert("? Sell Signal! Entering short trade at " + str.tostring(entry_price), alert.freq_once_per_bar_close)

// Highlight Chart Background Based on Ribbon Counts
bgcolor(count_green >= 13 ? color.new(color.green, 90) : count_red >= 9 ? color.new(color.red, 90) : na, title="Ribbon Trend Highlight")

// Plot "B" when Buy Signal is active
plotshape(rsi_buy, location=location.belowbar, color=color.green, style=shape.labelup, title="Buy Signal", text="B")

// Plot "S" when Sell Signal is active
plotshape(rsi_sell, location=location.abovebar, color=color.red, style=shape.labeldown, title="Sell Signal", text="S")

// Plot the Madrid Ribbon (all MAs)
plot(ma05, color=maColor(ma05, ma100), title="MA05", linewidth=1)
plot(ma10, color=maColor(ma10, ma100), title="MA10", linewidth=1)
plot(ma15, color=maColor(ma15, ma100), title="MA15", linewidth=1)
plot(ma20, color=maColor(ma20, ma100), title="MA20", linewidth=1)
plot(ma25, color=maColor(ma25, ma100), title="MA25", linewidth=1)
plot(ma30, color=maColor(ma30, ma100), title="MA30", linewidth=1)
plot(ma35, color=maColor(ma35, ma100), title="MA35", linewidth=1)
plot(ma40, color=maColor(ma40, ma100), title="MA40", linewidth=1)
plot(ma45, color=maColor(ma45, ma100), title="MA45", linewidth=1)
plot(ma50, color=maColor(ma50, ma100), title="MA50", linewidth=1)
plot(ma55, color=maColor(ma55, ma100), title="MA55", linewidth=1)
plot(ma60, color=maColor(ma60, ma100), title="MA60", linewidth=1)
plot(ma65, color=maColor(ma65, ma100), title="MA65", linewidth=1)
plot(ma70, color=maColor(ma70, ma100), title="MA70", linewidth=1)
plot(ma75, color=maColor(ma75, ma100), title="MA75", linewidth=1)
plot(ma80, color=maColor(ma80, ma100), title="MA80", linewidth=1)
plot(ma85, color=maColor(ma85, ma100), title="MA85", linewidth=1)
plot(ma90, color=maColor(ma90, ma100), title="MA90", linewidth=1)
plot(ma100, color=maColor(ma100, ma100), title="MA100", linewidth=2)
```

> Detail

https://www.fmz.com/strategy/488034

> Last Modified

2025-03-24 15:52:28
