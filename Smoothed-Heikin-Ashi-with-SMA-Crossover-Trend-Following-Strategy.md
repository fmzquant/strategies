
> Name

Smoothed-Heikin-Ashi-with-SMA-Crossover-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/193f97464d9d7692d72.png)

[trans]
#### 概述
本策略是一个基于平滑型Heikin-Ashi蜡烛图和简单移动平均线(SMA)交叉的趋势跟踪系统。策略通过EMA平滑处理后的Heikin-Ashi蜡烛图与44周期SMA的交叉来识别趋势的变化,从而捕捉市场的主要趋势性机会。策略设计了动态的仓位管理机制,当价格与长期均线距离过近时会自动平仓,以规避盘整市场的震荡风险。

#### 策略原理
策略的核心逻辑包含三个关键要素:首先是将传统K线转换为Heikin-Ashi蜡烛图,通过计算开高低收四个价格的算术平均值来过滤市场噪音;其次使用6周期EMA对Heikin-Ashi进行平滑处理,进一步提升信号的可靠性;最后将平滑后的Heikin-Ashi收盘价与44周期SMA结合,通过上穿产生做多信号,下穿产生做空信号。同时引入了"无仓位阈值"的概念,当价格与长期均线距离小于阈值时触发平仓信号,有效避免横盘整理行情带来的频繁交易。

#### 策略优势
1. 信号过滤机制完善,通过Heikin-Ashi和EMA双重平滑显著降低假突破的可能性
2. 趋势跟踪逻辑清晰,能有效捕捉大趋势行情
3. 设计了动态止损机制,在横盘整理时及时离场
4. 参数设置合理,短期均线11周期和长期均线44周期的配比符合市场运行规律
5. 可视化效果优秀,交易信号清晰直观

#### 策略风险
1. 趋势反转初期可能会有一定的滞后性,导致入场时机略有延迟
2. 在剧烈波动的市场环境下,可能会产生虚假的交叉信号
3. 对参数设置较为敏感,不同品种可能需要针对性调整
4. 在缺乏明显趋势的市场中可能会产生频繁交易

#### 策略优化方向
1. 建议增加趋势强度过滤器,例如ADX指标,只在趋势明显时才开仓
2. 可以引入量价配合的交易确认机制,提高信号可靠性
3. 考虑加入防滑点机制,避免在重要价位附近频繁交易
4. 可以设计动态的止盈止损机制,根据市场波动率自动调整
5. 建议增加仓位管理模块,根据趋势强度动态调整持仓比例

#### 总结
该策略通过结合Heikin-Ashi蜡烛图和SMA均线系统,构建了一个稳健的趋势跟踪交易系统。策略的信号生成机制完善,风险控制合理,特别适合在具有明显趋势特征的市场中应用。通过建议的优化方向,策略的实战效果还可以进一步提升。总体而言,这是一个设计合理、逻辑清晰的趋势跟踪策略。 || 

#### Overview
This strategy is a trend following system based on smoothed Heikin-Ashi candlesticks and Simple Moving Average (SMA) crossovers. It identifies trend changes through the intersection of EMA-smoothed Heikin-Ashi candlesticks with a 44-period SMA to capture major trend opportunities in the market. The strategy incorporates a dynamic position management mechanism that automatically closes positions when prices are too close to the long-term moving average, avoiding oscillation risks in consolidating markets.

#### Strategy Principles
The core logic consists of three key elements: First, converting traditional candlesticks into Heikin-Ashi candlesticks by calculating the arithmetic mean of open, high, low, and close prices to filter market noise; Second, using a 6-period EMA to smooth the Heikin-Ashi, further enhancing signal reliability; Finally, combining the smoothed Heikin-Ashi closing price with a 44-period SMA, generating long signals on upward crosses and short signals on downward crosses. The concept of a "no position threshold" is introduced, triggering position closure when the price-to-long-term-average distance is below the threshold, effectively avoiding frequent trades during consolidation phases.

#### Strategy Advantages
1. Comprehensive signal filtering mechanism, significantly reducing false breakouts through dual smoothing with Heikin-Ashi and EMA
2. Clear trend following logic capable of effectively capturing major trend movements
3. Dynamic stop-loss mechanism designed to exit timely during consolidation
4. Reasonable parameter settings with 11-period short-term and 44-period long-term moving averages aligning with market patterns
5. Excellent visualization with clear and intuitive trading signals

#### Strategy Risks
1. Potential lag in initial trend reversal phases leading to slightly delayed entries
2. Possibility of false crossover signals in highly volatile market conditions
3. Sensitivity to parameter settings requiring specific adjustments for different instruments
4. Potential frequent trading in markets lacking clear trends

#### Strategy Optimization Directions
1. Recommend adding trend strength filters like ADX indicator, trading only in clear trends
2. Can introduce volume-price confirmation mechanisms to improve signal reliability
3. Consider implementing anti-slippage mechanisms to avoid frequent trading near key price levels
4. Can design dynamic profit/loss mechanisms that adjust automatically based on market volatility
5. Suggest adding position management modules to dynamically adjust holding ratios based on trend strength

#### Summary
The strategy constructs a robust trend following trading system by combining Heikin-Ashi candlesticks with SMA systems. It features comprehensive signal generation mechanisms and reasonable risk control, particularly suitable for markets with distinct trend characteristics. The strategy's practical effectiveness can be further enhanced through the suggested optimization directions. Overall, it represents a well-designed trend following strategy with clear logic.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-10-01 00:00:00
end: 2024-10-31 23:59:59
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Smoothed Heikin Ashi with SMA Strategy", overlay=true)

// Input parameters for SMAs
s1 = input.int(11, title="Short SMA Period")
s2 = input.int(44, title="Long SMA Period")
noPositionThreshold = input.float(0.001, title="No Position Threshold", step=0.0001)

// Calculate the original Heikin-Ashi values
haClose = (open + high + low + close) / 4
var float haOpen = na
haOpen := na(haOpen[1]) ? (open + close) / 2 : (haOpen[1] + haClose[1]) / 2
haHigh = math.max(high, math.max(haOpen, haClose))
haLow = math.min(low, math.min(haOpen, haClose))

// Smoothing using exponential moving averages
smoothLength = input.int(6, title="Smoothing Length")
smoothedHaClose = ta.ema(haClose, smoothLength)
smoothedHaOpen = ta.ema(haOpen, smoothLength)
smoothedHaHigh = ta.ema(haHigh, smoothLength)
smoothedHaLow = ta.ema(haLow, smoothLength)

// Calculate SMAs
smaShort = ta.sma(close, s1)
smaLong = ta.sma(close, s2)

// Plotting the smoothed Heikin-Ashi values
plotcandle(smoothedHaOpen, smoothedHaHigh, smoothedHaLow, smoothedHaClose, color=(smoothedHaClose >= smoothedHaOpen ? color.green : color.red), title="Smoothed Heikin Ashi")
plot(smaShort, color=color.blue, title="SMA Short")
plot(smaLong, color=color.red, title="SMA Long")

// Generate buy/sell signals based on SHA crossing 44 SMA
longCondition = ta.crossover(smoothedHaClose, smaLong)
shortCondition = ta.crossunder(smoothedHaClose, smaLong)
noPositionCondition = math.abs(smoothedHaClose - smaLong) < noPositionThreshold

// Strategy logic
if (longCondition)
    strategy.entry("Long", strategy.long)
if (shortCondition)
    strategy.entry("Short", strategy.short)
if (noPositionCondition and strategy.position_size != 0)
    strategy.close_all("No Position")

// Plot buy/sell signals
plotshape(series=longCondition, location=location.belowbar, color=color.green, style=shape.labelup, text="BUY", size=size.small)
plotshape(series=shortCondition, location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL", size=size.small)
plotshape(series=noPositionCondition and strategy.position_size != 0, location=location.belowbar, color=color.yellow, style=shape.labeldown, text="EXIT", size=size.small)
```

> Detail

https://www.fmz.com/strategy/473398

> Last Modified

2024-11-29 16:39:12
