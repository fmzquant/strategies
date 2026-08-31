
> Name

Dynamic-Neural-RSI-Trend-Following-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10c14369678d3e362d0.png)

[trans]
#### 概述
该策略是一个基于均线、RSI指标和跟踪止损的量化交易系统。它结合了技术分析中的趋势跟踪和动量指标,通过设定严格的入场和出场条件,实现风险可控的交易。策略的核心逻辑是在上升趋势中寻找超卖机会入场,并使用跟踪止损保护盈利。

#### 策略原理
策略使用200日简单移动平均线(SMA)作为趋势判断的基准线,结合相对强弱指标(RSI)进行交易信号的生成。具体来说:
1. 使用200日均线判断大趋势,只有价格在均线之上才考虑做多
2. 当RSI低于预设阈值(默认40)时,认为出现超卖信号
3. 同时满足以上两个条件且距离上次平仓超过等待期(默认10天)时,触发做多信号
4. 持仓期间通过跟踪止损(默认5%)动态保护利润
5. 当价格跌破跟踪止损价格或跌破200日均线时,平仓出场

#### 策略优势
1. 结合趋势和动量双重过滤,提高交易的准确性
2. 使用跟踪止损机制,可以有效锁定利润
3. 设置交易间隔期,避免频繁交易
4. 参数可调整性强,适应不同市场环境
5. 交易逻辑清晰,易于理解和执行
6. 计算简单,运算效率高

#### 策略风险
1. 均线滞后性可能导致入场和出场信号延迟
2. RSI指标在震荡市场可能产生虚假信号
3. 固定百分比的跟踪止损可能不适合所有市场环境
4. 参数优化可能导致过度拟合
5. 在剧烈波动市场中可能遭受较大回撤

#### 策略优化方向
1. 引入波动率自适应的跟踪止损百分比
2. 增加成交量指标作为辅助确认
3. 使用指数移动平均线替代简单移动平均线,提高灵敏度
4. 加入市场情绪指标,优化交易时机
5. 开发动态参数优化机制
6. 增加多周期策略确认机制

#### 总结
这是一个结构完整、逻辑清晰的量化交易策略。它通过结合多个技术指标,在控制风险的同时追求稳定收益。虽然存在一定的优化空间,但基本框架具有良好的实用性和扩展性。策略适合中长期投资者使用,对于不同市场环境都有较好的适应性。 || 

#### Overview
This strategy is a quantitative trading system based on moving averages, RSI indicator, and trailing stop loss. It combines trend following and momentum indicators from technical analysis, achieving risk-controlled trading through strict entry and exit conditions. The core logic is to seek oversold opportunities in uptrends and protect profits using trailing stops.

#### Strategy Principles
The strategy uses a 200-day Simple Moving Average (SMA) as the baseline for trend judgment, combined with the Relative Strength Index (RSI) for generating trading signals. Specifically:
1. Uses 200-day SMA to judge the major trend, only considering long positions when price is above the average
2. Identifies oversold signals when RSI falls below preset threshold (default 40)
3. Triggers long entry when both conditions are met and waiting period since last exit (default 10 days) has elapsed
4. Protects profits during position holding through trailing stop loss (default 5%)
5. Exits position when price breaks below trailing stop or 200-day SMA

#### Strategy Advantages
1. Combines trend and momentum double filtering to improve trading accuracy
2. Uses trailing stop mechanism to effectively lock in profits
3. Sets trading intervals to avoid frequent trading
4. Strong parameter adjustability to adapt to different market environments
5. Clear trading logic, easy to understand and execute
6. Simple calculations with high computational efficiency

#### Strategy Risks
1. Moving average lag may cause delayed entry and exit signals
2. RSI indicator may generate false signals in ranging markets
3. Fixed percentage trailing stop may not suit all market environments
4. Parameter optimization may lead to overfitting
5. May suffer significant drawdowns in highly volatile markets

#### Strategy Optimization Directions
1. Introduce volatility-adaptive trailing stop percentage
2. Add volume indicators as auxiliary confirmation
3. Replace simple moving average with exponential moving average for better sensitivity
4. Incorporate market sentiment indicators to optimize trading timing
5. Develop dynamic parameter optimization mechanism
6. Add multi-timeframe strategy confirmation mechanism

#### Summary
This is a quantitative trading strategy with complete structure and clear logic. It pursues stable returns while controlling risk by combining multiple technical indicators. Although there is room for optimization, the basic framework has good practicality and extensibility. The strategy is suitable for medium to long-term investors and adapts well to different market environments.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-09 00:00:00
end: 2025-01-16 00:00:00
period: 15m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

//@version=5
strategy("200 SMA Crossover Strategy", overlay=false)

// Define inputs
smaLength = input.int(200, title="SMA Length")
rsiLength = input.int(14, title="RSI Length")
rsiThreshold = input.float(40, title="RSI Threshold")
trailStopPercent = input.float(5.0, title="Trailing Stop Loss (%)")
waitingPeriod = input.int(10, title="Waiting Period (Days)")

// Calculate 200 SMA
sma200 = ta.sma(close, smaLength)

// Calculate RSI
rsi = ta.rsi(close, rsiLength)

// Plot the 200 SMA and RSI
plot(sma200, color=color.blue, linewidth=2, title="200 SMA")
plot(rsi, color=color.purple, title="RSI", display=display.none)

// Define buy and sell conditions
var isLong = false
var float lastExitTime = na
var float trailStopPrice = na

// Explicitly declare timeSinceExit as float
float timeSinceExit = na(lastExitTime) ? na : (time - lastExitTime) / (24 * 60 * 60 * 1000)
canEnter = na(lastExitTime) or timeSinceExit > waitingPeriod

buyCondition = close > sma200 and rsi < rsiThreshold and canEnter

if (buyCondition and not isLong)
    strategy.entry("Buy", strategy.long)
    trailStopPrice := na
    isLong := true

// Update trailing stop loss if long
if (isLong)
    trailStopPrice := na(trailStopPrice) ? close * (1 - trailStopPercent / 100) : math.max(trailStopPrice, close * (1 - trailStopPercent / 100))

// Check for trailing stop loss or sell condition
if (isLong and (close < trailStopPrice or close < sma200))
    strategy.close("Buy")
    lastExitTime := time
    isLong := false

// Plot buy and sell signals
plotshape(series=buyCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=(isLong and close < trailStopPrice) or close < sma200, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

```

> Detail

https://www.fmz.com/strategy/478685

> Last Modified

2025-01-17 14:19:08
