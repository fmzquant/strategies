
> Name

Trend-Following-RSI-and-Moving-Average-Combined-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ae39e74a639a6dbf4d.png)

[trans]
#### 概述
本策略是一个结合了相对强弱指标(RSI)和简单移动平均线(SMA)的趋势跟踪交易系统。该策略通过移动平均线判断市场趋势方向,同时利用RSI指标确认动量,从而在趋势与动量共振时进行交易。策略设计了完整的止盈止损机制,能够有效控制风险。

#### 策略原理
策略的核心逻辑基于两个技术指标的配合使用:
1. 移动平均线(MA):用于确定总体趋势。当价格位于MA之上时判定为上升趋势,反之为下降趋势。
2. 相对强弱指标(RSI):用于确认价格动量。当RSI高于设定阈值(如55)时确认上涨动量,低于阈值(如45)时确认下跌动量。

交易信号生成逻辑:
- 做多条件:价格位于MA之上且RSI大于买入阈值
- 做空条件:价格位于MA之下且RSI小于卖出阈值

风险控制采用百分比止损和止盈方式,分别设置为入场价格的固定百分比。

#### 策略优势
1. 信号稳定性:通过结合趋势和动量双重确认,有效降低虚假信号。
2. 风险管理完善:设置了固定百分比的止损和止盈,能够有效控制每笔交易的风险。
3. 参数灵活性:关键参数如MA周期、RSI阈值等均可根据不同市场特征进行优化。
4. 策略逻辑清晰:交易规则简单直观,易于理解和执行。
5. 适应性强:可应用于各种时间周期的交易。

#### 策略风险
1. 趋势转折风险:在趋势转折点可能出现连续止损。
2. 震荡市场风险:区间震荡行情下可能产生频繁交易导致损失。
3. 参数依赖性:不同市场环境下最优参数可能存在较大差异。
4. 滑点风险:在市场波动剧烈时可能面临较大滑点。
5. 技术指标滞后性:MA和RSI都具有一定滞后性,可能导致入场时机延迟。

#### 策略优化方向
1. 动态参数优化:引入自适应参数机制,根据市场波动率动态调整MA周期和RSI阈值。
2. 市场环境过滤:增加波动率过滤机制,在高波动率环境下调整仓位或暂停交易。
3. 多时间周期分析:引入更长周期的趋势确认,提高交易方向的准确性。
4. 止损优化:引入追踪止损机制,更好地保护盈利。
5. 信号过滤:增加成交量等辅助指标,提高信号可靠性。

#### 总结
该策略通过结合趋势和动量指标,构建了一个逻辑清晰、风险可控的交易系统。虽然存在一些固有风险,但通过合理的参数设置和风险控制,策略展现出较好的实用性。后续优化方向主要围绕参数动态调整、市场环境识别和信号质量提升展开,有望进一步提高策略的稳定性和盈利能力。 || 

#### Overview
This strategy is a trend following trading system that combines the Relative Strength Index (RSI) and Simple Moving Average (SMA). It identifies market trend direction using moving averages while confirming momentum with RSI, executing trades when trend and momentum align. The strategy includes comprehensive stop-loss and take-profit mechanisms for effective risk control.

#### Strategy Principle
The core logic is based on the combination of two technical indicators:
1. Moving Average (MA): Used to determine overall trend. A bullish trend is identified when price is above MA, bearish when below.
2. Relative Strength Index (RSI): Used to confirm price momentum. Upward momentum is confirmed when RSI exceeds a threshold (e.g., 55), downward momentum when below threshold (e.g., 45).

Trading signal generation logic:
- Long conditions: Price above MA and RSI above buy threshold
- Short conditions: Price below MA and RSI below sell threshold

Risk control employs percentage-based stop-loss and take-profit levels, set as fixed percentages of entry price.

#### Strategy Advantages
1. Signal stability: Reduces false signals through dual confirmation of trend and momentum
2. Comprehensive risk management: Fixed percentage stop-loss and take-profit effectively control risk per trade
3. Parameter flexibility: Key parameters like MA period and RSI thresholds can be optimized for different market characteristics
4. Clear strategy logic: Trading rules are simple and intuitive to understand and execute
5. High adaptability: Applicable to various trading timeframes

#### Strategy Risks
1. Trend reversal risk: Consecutive stops may occur at trend turning points
2. Range-bound market risk: Frequent trading losses possible in sideways markets
3. Parameter dependency: Optimal parameters may vary significantly across market environments
4. Slippage risk: Significant slippage possible during high volatility
5. Technical indicator lag: MA and RSI have inherent lag, potentially delaying entry timing

#### Strategy Optimization Directions
1. Dynamic parameter optimization: Introduce adaptive parameter mechanisms adjusting MA period and RSI thresholds based on market volatility
2. Market environment filtering: Add volatility filtering mechanism to adjust position sizing or pause trading in high volatility
3. Multiple timeframe analysis: Incorporate longer timeframe trend confirmation to improve directional accuracy
4. Stop-loss optimization: Implement trailing stops for better profit protection
5. Signal filtering: Add volume and other auxiliary indicators to improve signal reliability

#### Summary
This strategy constructs a logically clear and risk-controlled trading system by combining trend and momentum indicators. While inherent risks exist, the strategy demonstrates good practicality through appropriate parameter settings and risk control. Future optimization focuses on dynamic parameter adjustment, market environment recognition, and signal quality improvement, potentially enhancing strategy stability and profitability.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-04 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © raiford87

//@version=6
strategy("RSI + MA Trend Strategy (v6)",
     shorttitle="RSI_MA_Trend_v6",
     overlay=true,
     initial_capital=50000,
     default_qty_type=strategy.fixed,
     default_qty_value=1)

// ─────────────────────────────────────────────────────────────────────────────────────
// 1. USER INPUTS
// ─────────────────────────────────────────────────────────────────────────────────────
maLength       = input.int(50,   "Moving Average Length")
rsiLength      = input.int(14,   "RSI Length")
rsiBuyLevel    = input.int(55,   "RSI > X for Buy",  minval=1, maxval=99)
rsiSellLevel   = input.int(45,   "RSI < X for Sell", minval=1, maxval=99)

stopLossPerc   = input.float(1.0,  "Stop Loss %",    minval=0.1)
takeProfitPerc = input.float(2.0,  "Take Profit %",  minval=0.1)

// ─────────────────────────────────────────────────────────────────────────────────────
// 2. INDICATOR CALCULATIONS
// ─────────────────────────────────────────────────────────────────────────────────────
maValue = ta.sma(close, maLength)
rsiVal  = ta.rsi(close, rsiLength)

// Trend conditions
bullTrend = close > maValue
bearTrend = close < maValue

// RSI conditions
rsiBull   = rsiVal > rsiBuyLevel
rsiBear   = rsiVal < rsiSellLevel

// ─────────────────────────────────────────────────────────────────────────────────────
// 3. ENTRY CONDITIONS
// ─────────────────────────────────────────────────────────────────────────────────────
longCondition  = bullTrend and rsiBull
shortCondition = bearTrend and rsiBear

if longCondition
    strategy.entry("RSI MA Long", strategy.long)
if shortCondition
    strategy.entry("RSI MA Short", strategy.short)

// ─────────────────────────────────────────────────────────────────────────────────────
// 4. STOP LOSS & TAKE PROFIT
// ─────────────────────────────────────────────────────────────────────────────────────
stopLossLevel   = stopLossPerc   * 0.01
takeProfitLevel = takeProfitPerc * 0.01

if strategy.position_size > 0
    stopPriceLong = strategy.position_avg_price * (1 - stopLossLevel)
    tpPriceLong   = strategy.position_avg_price * (1 + takeProfitLevel)
    strategy.exit("Exit Long", from_entry="RSI MA Long", stop=stopPriceLong, limit=tpPriceLong)

if strategy.position_size < 0
    stopPriceShort = strategy.position_avg_price * (1 + stopLossLevel)
    tpPriceShort   = strategy.position_avg_price * (1 - takeProfitLevel)
    strategy.exit("Exit Short", from_entry="RSI MA Short", stop=stopPriceShort, limit=tpPriceShort)

// ─────────────────────────────────────────────────────────────────────────────────────
// 5. PLOT SIGNALS & LEVELS
// ─────────────────────────────────────────────────────────────────────────────────────
plot(maValue, color=color.yellow, linewidth=2, title="Moving Average")

plotchar(longCondition,  title="Long Signal",  char='▲', location=location.belowbar, color=color.green, size=size.tiny)
plotchar(shortCondition, title="Short Signal", char='▼', location=location.abovebar, color=color.red,   size=size.tiny)

// Plot Stop & TP lines
posIsLong  = strategy.position_size > 0
posIsShort = strategy.position_size < 0

plotStopLong = posIsLong ? strategy.position_avg_price * (1 - stopLossLevel) : na
plotTpLong   = posIsLong ? strategy.position_avg_price * (1 + takeProfitLevel): na
plotStopShort= posIsShort? strategy.position_avg_price * (1 + stopLossLevel) : na
plotTpShort  = posIsShort? strategy.position_avg_price * (1 - takeProfitLevel): na

plot(plotStopLong,  color=color.red,   linewidth=2, style=plot.style_line, title="Stop Loss Long")
plot(plotTpLong,    color=color.green, linewidth=2, style=plot.style_line, title="Take Profit Long")
plot(plotStopShort, color=color.red,   linewidth=2, style=plot.style_line, title="Stop Loss Short")
plot(plotTpShort,   color=color.green, linewidth=2, style=plot.style_line, title="Take Profit Short")

```

> Detail

https://www.fmz.com/strategy/477516

> Last Modified

2025-01-06 10:58:42
