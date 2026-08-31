
> Name

Multi-Timeframe-Liquidity-Pivot-Heatmap-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16c9b5886da5a58b8a9.png)

[trans]
#### 概述
该策略是一个基于多时间周期流动性枢纽点检测的量化交易系统。它通过分析三个不同时间周期(15分钟、1小时和4小时)的价格行为,识别关键的支撑和阻力水平,并在此基础上进行交易决策。系统集成了资金管理功能,包括固定金额的止盈止损设置,同时提供直观的视觉反馈,帮助交易者更好地理解市场结构。

#### 策略原理
策略的核心是通过ta.pivothigh和ta.pivotlow函数在多个时间周期上检测价格枢纽点。对于每个时间周期,系统使用左右参考K线数(默认为7)来确定显著的高点和低点。当任一时间周期出现新的枢纽低点时,系统生成做多信号;出现新的枢纽高点时,系统生成做空信号。交易执行采用固定金额的止盈止损管理,通过moneyToSLPoints函数将美元金额转换为相应的点数。

#### 策略优势
1. 多时间周期分析提供了更全面的市场视角,有助于捕捉不同级别的交易机会
2. 基于枢纽点的交易逻辑具有solid的技术分析基础,便于理解和执行
3. 集成的资金管理功能可以有效控制每笔交易的风险
4. 可视化界面直观显示交易状态,包括位置、止盈止损水平以及盈亏区域
5. 策略参数可调,适应性强,能够根据不同市场条件进行优化

#### 策略风险
1. 多时间周期信号可能产生冲突,需要建立合理的信号优先级机制
2. 固定金额的止盈止损可能不适合所有市场条件,建议根据波动性动态调整
3. 枢纽点检测的滞后性可能导致入场时机偏后
4. 在剧烈波动期间,可能出现虚假突破信号
5. 需要注意不同时间周期的流动性差异

#### 策略优化方向
1. 引入波动率指标,动态调整止盈止损水平
2. 添加交易量确认机制,提高枢纽点的可靠性
3. 开发时间周期优先级系统,解决信号冲突问题
4. 整合趋势过滤器,避免在横盘市场过度交易
5. 考虑添加价格结构分析,提高入场时机的准确性

#### 总结
多时间周期流动性枢纽热力图量化策略是一个结构完整、逻辑清晰的交易系统。它通过多维度的市场分析和严格的风险管理,为交易者提供了一个可靠的交易框架。虽然存在一些固有的风险和限制,但通过持续优化和改进,该策略有望在各种市场环境下保持稳定的表现。 || 

#### Overview
This strategy is a quantitative trading system based on multi-timeframe liquidity pivot point detection. It analyzes price action across three different timeframes (15-minute, 1-hour, and 4-hour) to identify key support and resistance levels and make trading decisions accordingly. The system incorporates money management features, including fixed-dollar take-profit and stop-loss levels, while providing intuitive visual feedback to help traders better understand market structure.

#### Strategy Principle
The core of the strategy lies in detecting price pivot points across multiple timeframes using ta.pivothigh and ta.pivotlow functions. For each timeframe, the system uses left and right reference bars (default 7) to determine significant highs and lows. When a new pivot low appears on any timeframe, the system generates a buy signal; when a new pivot high appears, it generates a sell signal. Trade execution employs fixed-dollar stop-loss and take-profit management, converting dollar amounts to corresponding points using the moneyToSLPoints function.

#### Strategy Advantages
1. Multi-timeframe analysis provides a more comprehensive market perspective, helping capture trading opportunities at different levels
2. Pivot-based trading logic has a solid technical analysis foundation, making it easy to understand and execute
3. Integrated money management features effectively control risk for each trade
4. Visual interface intuitively displays trading status, including positions, take-profit/stop-loss levels, and profit/loss zones
5. Strategy parameters are adjustable, offering strong adaptability for optimization under different market conditions

#### Strategy Risks
1. Multi-timeframe signals may conflict, requiring a reasonable signal priority mechanism
2. Fixed-dollar take-profit and stop-loss may not suit all market conditions, suggesting dynamic adjustment based on volatility
3. Lag in pivot point detection may result in delayed entries
4. False breakout signals may occur during periods of intense volatility
5. Need to consider liquidity differences across different timeframes

#### Strategy Optimization Directions
1. Introduce volatility indicators for dynamic adjustment of take-profit and stop-loss levels
2. Add volume confirmation mechanism to improve pivot point reliability
3. Develop timeframe priority system to resolve signal conflicts
4. Integrate trend filters to avoid overtrading in ranging markets
5. Consider adding price structure analysis to improve entry timing accuracy

#### Summary
The Multi-Timeframe Liquidity Pivot Heatmap Strategy is a well-structured, logically sound trading system. Through multi-dimensional market analysis and strict risk management, it provides traders with a reliable trading framework. While there are some inherent risks and limitations, through continuous optimization and improvement, the strategy shows promise for maintaining stable performance across various market conditions.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-19 00:00:00
end: 2024-12-18 08:00:00
period: 4h
basePeriod: 4h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © pmotta41
//@version=5
strategy("GPT Session Liquidity Heatmap Strategy", overlay=true)

// Inputs
timeframe1 = input.timeframe("15", title="Intraday Timeframe 1")
timeframe2 = input.timeframe("60", title="Intraday Timeframe 2")
timeframe3 = input.timeframe("240", title="Higher Timeframe")
leftBars = input.int(7, title="Left Bars for Pivot", minval=2, maxval=20)
rightBars = input.int(7, title="Right Bars for Pivot", minval=2, maxval=20)
takeProfitDollar = input(200, title="Take Profit $$")
stopLossDollar = input(100, title="Stop Loss $$")

// Pivot Detection Function
detectPivot(highs, lows, left, right) =>
    pivotHigh = ta.pivothigh(highs, left, right)
    pivotLow = ta.pivotlow(lows, left, right)
    [pivotHigh, pivotLow]

// Get Pivots from Different Timeframes
[pivotHigh1, pivotLow1] = request.security(syminfo.tickerid, timeframe1, detectPivot(high, low, leftBars, rightBars))
[pivotHigh2, pivotLow2] = request.security(syminfo.tickerid, timeframe2, detectPivot(high, low, leftBars, rightBars))
[pivotHigh3, pivotLow3] = request.security(syminfo.tickerid, timeframe3, detectPivot(high, low, leftBars, rightBars))

// Plot Pivots
plotshape(series=pivotHigh1, title="Pivot High 1", location=location.abovebar, color=color.red, style=shape.labeldown, text="H1")
plotshape(series=pivotLow1, title="Pivot Low 1", location=location.belowbar, color=color.green, style=shape.labelup, text="L1")
plotshape(series=pivotHigh2, title="Pivot High 2", location=location.abovebar, color=color.red, style=shape.labeldown, text="H2")
plotshape(series=pivotLow2, title="Pivot Low 2", location=location.belowbar, color=color.green, style=shape.labelup, text="L2")
plotshape(series=pivotHigh3, title="Pivot High 3", location=location.abovebar, color=color.red, style=shape.labeldown, text="H3")
plotshape(series=pivotLow3, title="Pivot Low 3", location=location.belowbar, color=color.green, style=shape.labelup, text="L3")

// Strategy Logic
buyCondition = pivotLow1 or pivotLow2 or pivotLow3
sellCondition = pivotHigh1 or pivotHigh2 or pivotHigh3

if (buyCondition)
    strategy.entry("Buy", strategy.long)

if (sellCondition)
    strategy.entry("Sell", strategy.short)

// Function to Convert $$ to Points for Stop Loss and Take Profit
moneyToSLPoints(money) =>
    strategy.position_size != 0 ? (money / syminfo.pointvalue / math.abs(strategy.position_size)) / syminfo.mintick : na

p = moneyToSLPoints(takeProfitDollar)
l = moneyToSLPoints(stopLossDollar)

// Exit Conditions
strategy.exit("Exit Buy", from_entry="Buy", profit=p, loss=l)
strategy.exit("Exit Sell", from_entry="Sell", profit=p, loss=l)

// Visualization for Stop Loss and Take Profit Levels
pointsToPrice(pp) =>
    na(pp) ? na : strategy.position_avg_price + pp * math.sign(strategy.position_size) * syminfo.mintick

tp = plot(pointsToPrice(p), style=plot.style_linebr, color=color.green, title="Take Profit Level")
sl = plot(pointsToPrice(-l), style=plot.style_linebr, color=color.red, title="Stop Loss Level")
avg = plot(strategy.position_avg_price, style=plot.style_linebr, color=color.blue, title="Entry Price")
fill(tp, avg, color=color.new(color.green, 90), title="Take Profit Area")
fill(avg, sl, color=color.new(color.red, 90), title="Stop Loss Area")

// Background for Gain/Loss
gainBackground = strategy.position_size > 0 and close > strategy.position_avg_price
lossBackground = strategy.position_size > 0 and close < strategy.position_avg_price
bgcolor(gainBackground ? color.new(color.green, 90) : na, title="Gain Background")
bgcolor(lossBackground ? color.new(color.red, 90) : na, title="Loss Background")

```

> Detail

https://www.fmz.com/strategy/475593

> Last Modified

2024-12-20 14:20:11
