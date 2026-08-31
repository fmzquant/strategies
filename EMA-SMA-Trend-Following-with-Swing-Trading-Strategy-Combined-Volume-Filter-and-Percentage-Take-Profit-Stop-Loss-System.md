
> Name

EMA-SMA-Trend-Following-with-Swing-Trading-Strategy-Combined-Volume-Filter-and-Percentage-Take-Profit-Stop-Loss-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f82369ecfc33395bad.png)

[trans]
#### 概述
本策略是一个综合性的交易系统,将趋势跟踪与波段交易方法相结合,通过EMA和SMA均线交叉、波段高低点识别、成交量过滤以及百分比止盈和跟踪止损机制来构建完整的交易体系。策略设计注重多维度信号确认,通过技术指标的协同作用提高交易的准确性和可靠性。

#### 策略原理
策略采用多层次信号过滤机制,首先利用EMA(10)和SMA(21)的交叉形成基础趋势判断,然后通过左右六根K线的高低点突破判定入场时机,同时要求成交量大于200周期移动平均线,确保在流动性充足的环境下交易。系统采用2%的百分比止盈和1%的跟踪止损来管理风险。当价格突破波段高点且满足成交量条件时,系统开多单;当价格跌破波段低点且满足成交量条件时,系统开空单。

#### 策略优势
1. 多重信号确认机制降低虚假信号:通过均线趋势、价格突破和成交量放大三重验证,提高交易可靠性
2. 灵活的止盈止损机制:采用百分比方式设置止盈位,并配合跟踪止损锁定利润
3. 完善的可视化系统:提供均线、突破点位的图形展示,便于交易监控
4. 高度可定制性:关键参数均可调整,适应不同市场环境
5. 系统化的风险管理:通过预设的止损和止盈位控制风险

#### 策略风险
1. 横盘市场可能产生频繁假突破
2. 成交量过滤可能错过部分有效信号
3. 固定百分比止盈可能在强势行情中过早离场
4. 均线系统在快速转向市场中存在滞后性
5. 需要考虑交易成本对策略收益的影响

#### 策略优化方向
1. 引入波动率自适应机制,动态调整止盈止损参数
2. 增加趋势强度过滤,避免在弱趋势中交易
3. 优化成交量过滤算法,考虑相对成交量变化
4. 添加时间过滤机制,避免在不利时段交易
5. 考虑加入市场环境分类,针对不同市场采用不同参数

#### 总结
该策略通过均线系统、价格突破和成交量验证构建了一个完整的交易体系,适合中长期趋势跟踪。系统的优势在于多重信号确认和完善的风险管理机制,但也需要注意在横盘市场中的表现。通过建议的优化方向,策略还有提升空间,特别是在自适应性方面的改进将有助于提高策略的稳定性。

|| 

#### Overview
This strategy is a comprehensive trading system that combines trend following with swing trading methods, utilizing EMA and SMA crossovers, swing high/low identification, volume filtering, and percentage-based take-profit and trailing stop-loss mechanisms. The strategy emphasizes multi-dimensional signal confirmation, enhancing trading accuracy through the synergy of technical indicators.

#### Strategy Principles
The strategy employs a multi-layered signal filtering mechanism, starting with EMA(10) and SMA(21) crossovers for basic trend determination, then using 6-bar left/right pivot point breakouts for entry timing, while requiring volume above the 200-period moving average to ensure sufficient liquidity. The system uses 2% take-profit and 1% trailing stop-loss for risk management. Long positions are initiated when price breaks above swing highs with volume confirmation; short positions are taken when price breaks below swing lows with volume confirmation.

#### Strategy Advantages
1. Multiple signal confirmation reduces false signals through trend, price breakout, and volume expansion verification
2. Flexible profit/loss management using percentage-based take-profit with trailing stop-loss
3. Comprehensive visualization system for monitoring trades and signals
4. High customizability with adjustable key parameters
5. Systematic risk management through preset stop-loss and take-profit levels

#### Strategy Risks
1. Potential false breakouts in ranging markets
2. Volume filtering may miss some valid signals
3. Fixed percentage take-profit might exit too early in strong trends
4. Moving average system has inherent lag in quick reversals
5. Need to consider impact of trading costs on strategy returns

#### Optimization Directions
1. Introduce volatility adaptation for dynamic adjustment of take-profit/stop-loss
2. Add trend strength filtering to avoid trading in weak trends
3. Optimize volume filtering algorithm considering relative volume changes
4. Implement time-based filters to avoid unfavorable trading periods
5. Consider market regime classification for parameter adaptation

#### Summary
The strategy builds a complete trading system through moving averages, price breakouts, and volume verification, suitable for medium to long-term trend following. Its strengths lie in multiple signal confirmation and comprehensive risk management, though performance in ranging markets needs attention. Through the suggested optimizations, particularly in adaptability, the strategy has room for improvement in stability and performance.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-09 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// Strategy combining EMA/SMA Crossover, Swing High/Low, Volume Filtering, and Percentage TP & Trailing Stop
strategy("Swing High/Low Strategy with Volume, EMA/SMA Crossovers, Percentage TP and Trailing Stop", overlay=true)

// --- Inputs ---
source = close
TITLE = input(false, title='Enable Alerts & Background Color for EMA/SMA Crossovers')
turnonAlerts = input(true, title='Turn on Alerts?')
colorbars = input(true, title="Color Bars?")
turnonEMASMA = input(true, title='Turn on EMA1 & SMA2?')
backgroundcolor = input(false, title='Enable Background Color?')

// EMA/SMA Lengths
emaLength = input.int(10, minval=1, title='EMA Length')
smaLength = input.int(21, minval=1, title='SMA Length')
ema1 = ta.ema(source, emaLength)
sma2 = ta.sma(source, smaLength)

// Swing High/Low Lengths
leftBars = input.int(6, title="Left Bars for Swing High/Low", minval=1)
rightBars = input.int(6, title="Right Bars for Swing High/Low", minval=1)

// Volume MA Length
volMaLength = input.int(200, title="Volume Moving Average Length")

// Percentage Take Profit with hundredth place adjustment
takeProfitPercent = input.float(2.00, title="Take Profit Percentage (%)", minval=0.01, step=0.01) / 100

// Trailing Stop Loss Option
useTrailingStop = input.bool(true, title="Enable Trailing Stop Loss?")
trailingStopPercent = input.float(1.00, title="Trailing Stop Loss Percentage (%)", minval=0.01, step=0.01) / 100

// --- Swing High/Low Logic ---
pivotHigh(_leftBars, _rightBars) =>
    ta.pivothigh(_leftBars, _rightBars)

pivotLow(_leftBars, _rightBars) =>
    ta.pivotlow(_leftBars, _rightBars)

ph = fixnan(pivotHigh(leftBars, rightBars))
pl = fixnan(pivotLow(leftBars, rightBars))

// --- Volume Condition ---
volMa = ta.sma(volume, volMaLength)

// Declare exit conditions as 'var' so they are initialized
var bool longExitCondition = na
var bool shortExitCondition = na

// --- Long Entry Condition: Close above Swing High & Volume >= 200 MA ---
longCondition = (close > ph and volume >= volMa)
if (longCondition)
    strategy.entry("Long", strategy.long)

// --- Short Entry Condition: Close below Swing Low & Volume >= 200 MA ---
shortCondition = (close < pl and volume >= volMa)
if (shortCondition)
    strategy.entry("Short", strategy.short)

// --- Take Profit and Trailing Stop Logic ---

// For long position: Set take profit at the entry price + takeProfitPercent
longTakeProfitLevel = strategy.position_avg_price * (1 + takeProfitPercent)
shortTakeProfitLevel = strategy.position_avg_price * (1 - takeProfitPercent)

// --- Long Exit Logic ---
if (useTrailingStop)
    // Trailing Stop for Long
    strategy.exit("Long Exit", "Long", stop=na, trail_offset=strategy.position_avg_price * trailingStopPercent, limit=longTakeProfitLevel)
else
    // Exit Long on Take Profit only
    strategy.exit("Long Exit", "Long", limit=longTakeProfitLevel)

// --- Short Exit Logic ---
if (useTrailingStop)
    // Trailing Stop for Short
    strategy.exit("Short Exit", "Short", stop=na, trail_offset=strategy.position_avg_price * trailingStopPercent, limit=shortTakeProfitLevel)
else
    // Exit Short on Take Profit only
    strategy.exit("Short Exit", "Short", limit=shortTakeProfitLevel)

// --- Plot Swing High/Low ---

plot(ph, style=plot.style_circles, linewidth=1, color=color.blue, offset=-rightBars, title="Swing High")
plot(ph, style=plot.style_line, linewidth=1, color=color.blue, offset=0, title="Swing High")
plot(pl, style=plot.style_circles, linewidth=1, color=color.red, offset=-rightBars, title="Swing High")
plot(pl, style=plot.style_line, linewidth=1, color=color.red, offset=0, title="Swing High")
// --- Plot EMA/SMA ---
plot(turnonEMASMA ? ema1 : na, color=color.green, title="EMA")
plot(turnonEMASMA ? sma2 : na, color=color.orange, title="SMA")

// --- Alerts ---
alertcondition(longCondition, title="Long Entry", message="Price closed above Swing High with Volume >= 200 MA")
alertcondition(shortCondition, title="Short Entry", message="Price closed below Swing Low with Volume >= 200 MA")

// --- Bar Colors for Visualization ---
barcolor(longCondition ? color.green : na, title="Long Entry Color")
barcolor(shortCondition ? color.red : na, title="Short Entry Color")
bgcolor(backgroundcolor ? (ema1 > sma2 ? color.new(color.green, 50) : color.new(color.red, 50)) : na)
```

> Detail

https://www.fmz.com/strategy/474676

> Last Modified

2024-12-11 15:12:35
