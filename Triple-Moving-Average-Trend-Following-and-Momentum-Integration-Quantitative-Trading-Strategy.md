
> Name

Triple-Moving-Average-Trend-Following-and-Momentum-Integration-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1184187f636090839af.png)

[trans]
#### 概述
这是一个基于趋势跟踪和动量分析相结合的量化交易策略。该策略利用三重指数移动平均线(TEMA)、多重移动平均线交叉以及MACD变种指标来识别市场趋势和入场时机。策略采用了严格的风险控制机制,包括固定止损、获利目标以及追踪止损,以实现风险收益的最优平衡。

#### 策略原理
策略主要通过三个核心技术指标系统来确定交易信号:
1. 三重指数移动平均线(TEMA)系统用于确认整体趋势方向。通过计算三层EMA并结合其动态变化来判断趋势强度。
2. 快慢均线交叉系统使用9周期和15周期的EMA,用于捕捉中期趋势的转折点。
3. 价格与5周期EMA的交叉作为最后的确认信号,用于精确把握入场时机。

交易信号的触发需要同时满足以下条件:
- MACD指标与其信号线形成黄金交叉且TEMA趋势向上
- 短期EMA上穿长期EMA
- 价格上穿5周期EMA

#### 策略优势
1. 多重确认机制大大降低了虚假信号的影响,提高了交易的准确性。
2. 结合了趋势跟踪和动量分析的优点,既能把握大趋势,又不错过短期机会。
3. 采用了完善的止损机制,包括固定止损点位和动态追踪止损,有效控制风险。
4. 策略参数可调整性强,能适应不同市场环境。
5. 入场逻辑清晰,易于理解和执行。

#### 策略风险
1. 多重确认机制可能导致入场较慢,在快速行情中错过部分机会。
2. 固定止损点位需要根据不同市场波动率进行调整,否则可能过早被止损。
3. 在横盘震荡市场中可能产生频繁的虚假信号。
4. 追踪止损可能在市场剧烈波动时过早退出优质趋势。

#### 策略优化方向
1. 引入波动率指标来动态调整止损和获利目标,使其更符合市场状态。
2. 增加成交量指标作为辅助确认,提高信号可靠性。
3. 加入市场环境识别机制,在不同市场状态下使用不同的参数组合。
4. 开发逆势加仓机制,在回调时适度建仓以提高收益。
5. 优化追踪止损算法,使其更好地适应市场波动。

#### 总结
该策略通过融合多个技术指标系统,构建了一个稳健的交易系统。其核心优势在于多重确认机制和完善的风险控制体系。虽然存在一定的滞后性风险,但通过参数优化和功能拓展,策略仍有较大的改进空间。适合追求稳健收益的交易者使用。 || 

#### Overview
This is a quantitative trading strategy that combines trend following and momentum analysis. The strategy utilizes Triple Exponential Moving Average (TEMA), multiple moving average crossovers, and a MACD variant to identify market trends and entry points. It implements strict risk control mechanisms, including fixed stop-loss, profit targets, and trailing stops to optimize risk-reward balance.

#### Strategy Principles
The strategy determines trading signals through three core technical indicator systems:
1. Triple Exponential Moving Average (TEMA) system confirms overall trend direction. It calculates three layers of EMA and combines their dynamic changes to judge trend strength.
2. Fast/Slow MA crossover system uses 9-period and 15-period EMAs to capture medium-term trend reversal points.
3. Price crossing with 5-period EMA serves as final confirmation signal for precise entry timing.

Trade signals are triggered when all conditions are met:
- MACD crosses above its signal line with upward TEMA trend
- Short-term EMA crosses above long-term EMA
- Price crosses above 5-period EMA

#### Strategy Advantages
1. Multiple confirmation mechanisms greatly reduce false signals and improve trading accuracy.
2. Combines benefits of trend following and momentum analysis to capture both major trends and short-term opportunities.
3. Implements comprehensive stop-loss mechanisms including fixed stops and dynamic trailing stops for effective risk control.
4. High parameter adaptability for different market environments.
5. Clear entry logic that's easy to understand and execute.

#### Strategy Risks
1. Multiple confirmation requirements may lead to delayed entries, missing opportunities in fast-moving markets.
2. Fixed stop-loss points need adjustment for different market volatilities to avoid premature exits.
3. May generate frequent false signals in range-bound, choppy markets.
4. Trailing stops might exit quality trends too early during severe market fluctuations.

#### Optimization Directions
1. Introduce volatility indicators for dynamic adjustment of stops and profit targets to better match market conditions.
2. Add volume indicators as auxiliary confirmation to improve signal reliability.
3. Implement market environment recognition for different parameter combinations in various market states.
4. Develop counter-trend position building mechanism for moderate accumulation during pullbacks.
5. Optimize trailing stop algorithm for better adaptation to market volatility.

#### Summary
The strategy builds a robust trading system by integrating multiple technical indicator systems. Its core strengths lie in multiple confirmation mechanisms and comprehensive risk control systems. While there are certain lag risks, the strategy has significant improvement potential through parameter optimization and functional expansion. Suitable for traders seeking stable returns.
[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-10-01 00:00:00
end: 2024-10-31 23:59:59
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("ITG Scalper Strategy", shorttitle="lokesh_ITG_Scalper_Strategy", overlay=true)

// General inputs
len = input(14, title="TEMA period")
FfastLength = input.int(13, title="Filter fast length")
FslowLength = input.int(18, title="Filter slow length")
FsignalLength = input.int(14, title="Filter signal length")
sl_points = 7 // 5 points stop loss
tp_points = 100 // 100 points target profit
trail_points = 15 // Trailing stop loss every 10 points

// Validate input
if FfastLength < 1
    FfastLength := 1
if FslowLength < 1
    FslowLength := 1
if FsignalLength < 1
    FsignalLength := 1

// Get real close price
realC = close

// Triple EMA definition
ema1 = ta.ema(realC, len)
ema2 = ta.ema(ema1, len)
ema3 = ta.ema(ema2, len)

// Triple EMA trend calculation
avg = 3 * (ema1 - ema2) + ema3

// Filter formula
Fsource = close
FfastMA = ta.ema(Fsource, FfastLength)
FslowMA = ta.ema(Fsource, FslowLength)
Fmacd = FfastMA - FslowMA
Fsignal = ta.sma(Fmacd, FsignalLength)

// Plot EMAs for visual reference
shortema = ta.ema(close, 9)
longema = ta.ema(close, 15)
yma = ta.ema(close, 5)
plot(shortema, color=color.green)
plot(longema, color=color.red)
plot(yma, color=#e9f72c)

// Entry conditions
firstCrossover = ta.crossover(Fmacd, Fsignal) and avg > avg[1]
secondCrossover = ta.crossover(shortema, longema)  // Assuming you meant to cross shortema with longema
thirdCrossover = ta.crossover(close, yma)

var bool entryConditionMet = false

if (firstCrossover)
    entryConditionMet := true

longSignal = entryConditionMet and secondCrossover and thirdCrossover

// Strategy execution
if (longSignal)
    strategy.entry("Long", strategy.long)
    entryConditionMet := false  // Reset the entry condition after taking a trade

// Calculate stop loss and take profit prices
var float long_sl = na
var float long_tp = na

if strategy.position_size > 0  // Long position
    long_sl := close - sl_points
    long_tp := close + tp_points
    
    // Adjust stop loss with trailing logic
    if (close - long_sl > trail_points)
        long_sl := close - trail_points
        
    strategy.exit("Exit Long", "Long", stop=long_sl, limit=long_tp)

// Plotting Buy signals
plotshape(series=longSignal, style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small, title="Buy Signal")

// Alerts
alertcondition(longSignal, title="Buy Signal", message="Buy Signal")

```

> Detail

https://www.fmz.com/strategy/473145

> Last Modified

2024-11-27 16:08:16
