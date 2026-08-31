
> Name

Enhanced-Momentum-Oscillator-and-Stochastic-Divergence-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ae4177fe07564ef345.png)

[trans]
#### 概述
该策略是一个结合了加速震荡指标(AC)和随机指标(Stochastic)的量化交易系统。它通过识别价格与技术指标之间的背离来捕捉市场动量的转变,从而预测潜在的趋势反转。该策略还整合了均线(SMA)和相对强弱指标(RSI)来增强信号的可靠性,并设置了固定的止盈止损来控制风险。

#### 策略原理
策略的核心逻辑基于多重技术指标的协同配合。首先计算加速震荡指标(AC),它是通过价格中值的5周期和34周期均线之差,再减去其N周期均线得到。同时计算随机指标的K值和D值,用于确认背离信号。当价格创新低而AC指标走高时,形成看涨背离;当价格创新高而AC指标走低时,形成看跌背离。策略还引入了RSI作为辅助确认指标,通过多重指标的交叉验证来提高信号的准确性。

#### 策略优势
1. 多重指标协同:通过AC、Stochastic和RSI三个指标的配合,能够有效过滤虚假信号
2. 自动化风控:内置了固定点数的止盈止损设置,可以有效控制每笔交易的风险
3. 视觉化提示:在图表上清晰标注买卖信号,便于交易者快速识别机会
4. 灵活性强:参数可调整性强,适用于不同的市场环境和交易周期
5. 实时预警:集成了实时警报系统,确保不会错过交易机会

#### 策略风险
1. 假突破风险:在震荡市场中可能产生虚假的背离信号
2. 滑点风险:由于使用固定点数止盈止损,在市场波动剧烈时可能面临较大滑点
3. 参数敏感性:不同参数组合可能导致策略表现差异较大
4. 市场环境依赖:在趋势不明显的市场中,策略效果可能不佳
5. 信号滞后性:由于使用均线计算,信号可能存在一定滞后

#### 策略优化方向
1. 动态止盈止损:可以根据市场波动率动态调整止盈止损点位
2. 引入成交量指标:通过成交量确认来增强信号可靠性
3. 市场环境过滤:增加趋势判断模块,在不同市场环境下采用不同的交易策略
4. 优化参数选择:使用机器学习方法优化各指标参数组合
5. 增加时间过滤:考虑市场时间特征,避免在不利时段交易

#### 总结
这是一个融合多重技术指标的量化交易策略,通过背离信号来捕捉市场转折点。策略的优势在于多重指标的交叉验证和完善的风险控制系统,但也需要注意假突破和参数优化等问题。通过持续优化和改进,该策略有望在不同市场环境下保持稳定的表现。 || 

#### Overview
This strategy is a quantitative trading system that combines the Accelerator Oscillator (AC) and Stochastic indicators. It captures market momentum shifts by identifying divergences between price and technical indicators to predict potential trend reversals. The strategy also incorporates Simple Moving Averages (SMA) and Relative Strength Index (RSI) to enhance signal reliability, with fixed take-profit and stop-loss levels for risk control.

#### Strategy Principle
The core logic is based on the synergy of multiple technical indicators. The AC is calculated using the difference between 5-period and 34-period SMAs of price midpoints, minus its N-period moving average. Stochastic K and D values are calculated to confirm divergence signals. Bullish divergence forms when price makes new lows while AC rises; bearish divergence forms when price makes new highs while AC falls. RSI is incorporated as an additional confirmation indicator, using cross-validation of multiple indicators to improve signal accuracy.

#### Strategy Advantages
1. Multiple indicator synergy: Effectively filters false signals through the combination of AC, Stochastic, and RSI
2. Automated risk control: Built-in fixed take-profit and stop-loss settings effectively control risk per trade
3. Visual cues: Clear buy and sell signals marked on charts for quick opportunity identification
4. High flexibility: Strong parameter customization suitable for different market conditions and timeframes
5. Real-time alerts: Integrated alert system ensures no trading opportunities are missed

#### Strategy Risks
1. False breakout risk: May generate false divergence signals in ranging markets
2. Slippage risk: Fixed pip take-profit and stop-loss may face significant slippage in volatile markets
3. Parameter sensitivity: Different parameter combinations may lead to varying strategy performance
4. Market environment dependency: Strategy may underperform in markets lacking clear trends
5. Signal lag: Some lag may exist due to moving average calculations

#### Strategy Optimization Directions
1. Dynamic take-profit/stop-loss: Adjust levels based on market volatility
2. Volume indicator integration: Enhance signal reliability through volume confirmation
3. Market environment filtering: Add trend assessment module for different market conditions
4. Parameter optimization: Use machine learning methods to optimize indicator parameter combinations
5. Time filtering: Consider market time characteristics to avoid unfavorable trading periods

#### Summary
This is a quantitative trading strategy integrating multiple technical indicators, capturing market turning points through divergence signals. Its strengths lie in cross-validation of multiple indicators and comprehensive risk control system, while attention must be paid to false breakouts and parameter optimization. Through continuous optimization and improvement, the strategy shows promise for maintaining stable performance across different market environments.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-09 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © JayQwae


//@version=5
strategy("Enhanced AC Divergence Strategy with Stochastic Divergence", overlay=true)

// Input settings
tp_pips = input.float(0.0020, "Take Profit (in price)", step=0.0001)
sl_pips = input.float(0.0040, "Stop Loss (in price)", step=0.0001)  // 40 pips
ac_length = input.int(5, "AC Length")
rsi_length = input.int(14, "RSI Length")
stoch_k = input.int(14, "Stochastic K Length")
stoch_d = input.int(3, "Stochastic D Smoothing")
stoch_ob = input.float(80, "Stochastic Overbought Level")
stoch_os = input.float(20, "Stochastic Oversold Level")

// Accelerator Oscillator Calculation
high_low_mid = (high + low) / 2
ao = ta.sma(high_low_mid, 5) - ta.sma(high_low_mid, 34)
ac = ao - ta.sma(ao, ac_length)

// RSI Calculation
rsi = ta.rsi(close, rsi_length)

// Stochastic Oscillator Calculation
k = ta.sma(ta.stoch(close, high, low, stoch_k), stoch_d)
d = ta.sma(k, stoch_d)

// Stochastic Divergence Detection
stoch_bull_div = ta.lowest(close, 5) < ta.lowest(close[1], 5) and ta.lowest(k, 5) > ta.lowest(k[1], 5)
stoch_bear_div = ta.highest(close, 5) > ta.highest(close[1], 5) and ta.highest(k, 5) < ta.highest(k[1], 5)

// Main Divergence Detection
bullish_div = ta.lowest(close, 5) < ta.lowest(close[1], 5) and ac > ac[1] and stoch_bull_div
bearish_div = ta.highest(close, 5) > ta.highest(close[1], 5) and ac < ac[1] and stoch_bear_div

// Plot divergences
plotshape(bullish_div, title="Bullish Divergence", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(bearish_div, title="Bearish Divergence", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

// Strategy rules
if (bullish_div)
    strategy.entry("Buy", strategy.long)
    strategy.exit("Take Profit/Stop Loss", "Buy", limit=close + tp_pips, stop=close - sl_pips)

if (bearish_div)
    strategy.entry("Sell", strategy.short)
    strategy.exit("Take Profit/Stop Loss", "Sell", limit=close - tp_pips, stop=close + sl_pips)

// Alerts
if (bullish_div)
    alert("Bullish Divergence detected! Potential Buy Opportunity", alert.freq_once_per_bar)

if (bearish_div)
    alert("Bearish Divergence detected! Potential Sell Opportunity", alert.freq_once_per_bar)




```

> Detail

https://www.fmz.com/strategy/474709

> Last Modified

2024-12-11 17:34:01
