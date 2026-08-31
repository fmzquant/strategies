
> Name

Dual-Momentum-Squeeze-Trading-System-SMIUBS-Indicator-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b904ad394e9ccfe68d.png)

[trans]
#### 概述
本策略是一个结合了动量挤压指标(Squeeze Momentum Indicator, SMI)和终极买卖指标(Ultimate Buy/Sell, UBS)的短线交易系统。该策略主要通过监测价格动量的变化趋势以及移动平均线的交叉信号来捕捉市场的做空机会。系统设计了基于百分比的止损控制机制,在保护资金安全的同时追求稳定收益。

#### 策略原理
策略的核心逻辑基于两个主要指标的配合:
1. 动量挤压指标(SMI):通过计算收盘价与最高最低价之间的关系,结合移动平均平滑处理,生成动量信号。当SMI由上升转为下降时,表明上涨动能减弱,可能出现做空机会。
2. 终极买卖指标(UBS):基于价格与其移动平均线的交叉关系判断入场时机。当价格下穿移动平均线时,确认做空信号。
3. 系统在确认做空信号后自动入场,同时设置0.4%的获利目标和2.5%的止损位置,有效控制风险。

#### 策略优势
1. 双重信号确认:通过两个独立指标的共振来确认交易信号,提高了信号的可靠性。
2. 风险管理完善:设置了明确的止盈止损条件,能有效控制每笔交易的风险。
3. 参数可调整:关键参数如SMI长度、平滑周期、UBS周期等都可以根据不同市场情况进行优化。
4. 自动化程度高:策略逻辑清晰,便于实现自动化交易。

#### 策略风险
1. 假突破风险:在震荡市场中可能出现频繁的假信号。
2. 趋势依赖:策略在明显趋势市场表现较好,但在横盘市场可能频繁遭受止损。
3. 参数敏感性:不同的参数设置可能导致策略表现差异较大。
4. 滑点影响:在市场波动较大时,实际成交价格可能与信号价格存在较大偏差。

#### 策略优化方向
1. 增加市场环境过滤:可以添加波动率指标或趋势强度指标,在不同市场环境下调整策略参数。
2. 优化止损机制:可以考虑使用动态止损,如跟踪止损或基于ATR的止损。
3. 增加交易时间过滤:避开高波动性时段和重要新闻发布时间。
4. 引入仓位管理:根据信号强度和市场波动性动态调整持仓规模。

#### 总结
该策略通过结合动量挤压和终极买卖两个技术指标,构建了一个相对完整的做空交易系统。策略的优势在于信号可靠性高、风险控制明确,但同时也存在对市场环境依赖性强的特点。通过增加市场环境过滤、优化止损机制等方向的改进,策略的稳定性和盈利能力有望得到进一步提升。 || 

#### Overview
This strategy is a short-term trading system that combines the Squeeze Momentum Indicator (SMI) and Ultimate Buy/Sell (UBS) indicator. The strategy primarily captures short-selling opportunities by monitoring momentum changes and moving average crossover signals. The system incorporates a percentage-based stop-loss mechanism to protect capital while pursuing stable returns.

#### Strategy Principles
The core logic is based on the combination of two main indicators:
1. Squeeze Momentum Indicator (SMI): Generates momentum signals by calculating the relationship between closing prices and high/low prices, smoothed with moving averages. When SMI turns from ascending to descending, it indicates weakening upward momentum and potential short opportunities.
2. Ultimate Buy/Sell Indicator (UBS): Determines entry timing based on price crossovers with moving averages. A short signal is confirmed when price crosses below the moving average.
3. The system automatically enters short positions upon signal confirmation, setting a 0.4% profit target and 2.5% stop-loss level for effective risk control.

#### Strategy Advantages
1. Dual Signal Confirmation: Enhances signal reliability through the resonance of two independent indicators.
2. Comprehensive Risk Management: Clear profit-taking and stop-loss conditions effectively control risk per trade.
3. Adjustable Parameters: Key parameters like SMI length, smoothing period, and UBS period can be optimized for different market conditions.
4. High Automation: Clear strategy logic facilitates automated trading implementation.

#### Strategy Risks
1. False Breakout Risk: Frequent false signals may occur in ranging markets.
2. Trend Dependency: Strategy performs better in trending markets but may face frequent stops in sideways markets.
3. Parameter Sensitivity: Different parameter settings can lead to significant performance variations.
4. Slippage Impact: Actual execution prices may deviate significantly from signal prices during high volatility.

#### Optimization Directions
1. Add Market Environment Filters: Incorporate volatility or trend strength indicators to adjust strategy parameters in different market conditions.
2. Optimize Stop-Loss Mechanism: Consider implementing dynamic stops, such as trailing stops or ATR-based stops.
3. Add Time Filters: Avoid high volatility periods and major news release times.
4. Implement Position Sizing: Dynamically adjust position size based on signal strength and market volatility.

#### Summary
The strategy constructs a relatively complete short-selling system by combining squeeze momentum and ultimate buy/sell technical indicators. Its strengths lie in high signal reliability and clear risk control, though it shows strong dependence on market conditions. Through improvements in market environment filtering and stop-loss optimization, the strategy's stability and profitability can be further enhanced.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-10-28 00:00:00
end: 2024-11-27 00:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © algostudio
// Code Generated using PineGPT - www.marketcalls.in

//@version=5
strategy("Squeeze Momentum and Ultimate Buy/Sell with Stop Loss", overlay=true, process_orders_on_close = false)

// Input settings
smiLength = input.int(20, title="SMI Length")
smiSmoothing = input.int(5, title="SMI Smoothing")
ultBuyLength = input.int(14, title="Ultimate Buy/Sell Length")
stopLossPerc = input.float(2.5, title="Stop Loss Percentage", step=0.1) / 100

// Define Squeeze Momentum logic
smi = ta.sma(close - ta.lowest(low, smiLength), smiSmoothing) - ta.sma(ta.highest(high, smiLength) - close, smiSmoothing)
squeezeMomentum = ta.sma(smi, smiSmoothing)
smiUp = squeezeMomentum > squeezeMomentum[1]
smiDown = squeezeMomentum < squeezeMomentum[1]

// Define Ultimate Buy/Sell Indicator logic (you can customize the conditions)
ultimateBuy = ta.crossover(close, ta.sma(close, ultBuyLength))
ultimateSell = ta.crossunder(close, ta.sma(close, ultBuyLength))


// Trading logic: Short entry (Squeeze Momentum from green to red and Ultimate Sell signal)
shortCondition = smiDown and ultimateSell
if (shortCondition)
    strategy.entry("Short", strategy.short)

//Set short target (exit when price decreases by 0.2%)
shortTarget = strategy.position_avg_price * 0.996

// Set stop loss for short (5% above the entry price)
shortStop = strategy.position_avg_price * (1 + stopLossPerc)

// Exit logic for short
if (strategy.position_size < 0)
    strategy.exit("Exit Short", "Short", limit=shortTarget, stop=shortStop)

// Plot the Squeeze Momentum for reference
plot(squeezeMomentum, color=color.blue, linewidth=2, title="Squeeze Momentum")

// Optional: Plot signals on the chart
plotshape(series=ultimateBuy, location=location.belowbar, color=color.green, style=shape.labelup, title="Ultimate Buy Signal")
plotshape(series=ultimateSell, location=location.abovebar, color=color.red, style=shape.labeldown, title="Ultimate Sell Signal")

// For more tutorials on Tradingview Pinescript visit https://www.marketcalls.in/category/tradingview

```

> Detail

https://www.fmz.com/strategy/473250

> Last Modified

2024-11-28 15:52:02
