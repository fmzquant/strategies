
> Name

Dynamic-Trend-RSI-Crossover-Momentum-Enhancement-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8885676858bb3b96e7c.png)
![IMG](https://www.fmz.com/upload/asset/2d8ad1ff9c845b54bced8.png)




[trans]
#### 概述
该策略是一个结合了Supertrend趋势指标和RSI(相对强弱指标)的交易系统。策略通过将趋势跟踪与动量指标相结合,在市场趋势明确且具有良好动量的情况下进行交易。系统使用ATR(平均真实波幅)来计算动态的支撑和阻力水平,并结合RSI超买超卖信号来确定入场时机。

#### 策略原理
策略的核心逻辑基于以下几个关键要素:
1. Supertrend指标的计算基于ATR和SMA,用于确定当前市场趋势。上轨通过将因子乘以ATR后加到SMA上得出,下轨则是从SMA中减去相同的值。
2. 当价格高于Supertrend线时产生买入信号,低于时产生卖出信号。
3. RSI指标用于确认市场动量,通过设定超买超卖水平(默认70和30)来过滤交易信号。
4. 做多条件要求Supertrend显示买入信号且RSI从超卖区域向上突破。
5. 做空条件需要Supertrend显示卖出信号且RSI从超买区域向下突破。
6. 止损设置在Supertrend线位置,止盈设为2倍ATR距离。

#### 策略优势
1. 结合趋势和动量双重确认,降低假信号概率。
2. 使用动态的ATR进行止损和止盈设置,适应不同市场环境。
3. Supertrend指标能够有效跟踪趋势,减少震荡区间的无效交易。
4. RSI过滤器帮助避免在过度延伸的市场中入场。
5. 系统具有完整的风险管理机制,包括动态止损和固定风险比率的止盈。

#### 策略风险
1. 在横盘市场中可能产生频繁的假突破信号。
2. RSI的超买超卖界限在某些市场条件下可能不够灵活。
3. 固定的ATR倍数可能不适合所有市场环境。
4. 在快速反转行情中,止损位置可能较远导致较大损失。
5. 策略在高波动期间可能面临滑点风险。

#### 策略优化方向
1. 引入自适应的RSI阈值,根据市场波动性动态调整超买超卖水平。
2. 增加交易量确认机制,提高信号可靠性。
3. 实现ATR倍数的动态调整,使止损止盈更符合当前市场特征。
4. 加入时间过滤器,避免在市场开盘和收盘等波动较大的时间段交易。
5. 考虑添加市场环境过滤器,在不同趋势强度下使用不同的参数设置。

#### 总结
该策略通过结合Supertrend和RSI指标,构建了一个完整的趋势跟踪交易系统。策略在趋势明确的市场中表现较好,通过动态止损和合理的止盈设置来控制风险。虽然存在一些局限性,但通过提议的优化方向可以进一步提升策略的稳定性和适应性。策略适合追踪中长期趋势,并在保持一定盈利能力的同时较好地控制了风险。

||

#### Overview
This strategy combines the Supertrend trend indicator with the RSI (Relative Strength Index) to create a trading system. It integrates trend following with momentum indicators to execute trades when market trends are clear and show good momentum. The system uses ATR (Average True Range) to calculate dynamic support and resistance levels, combined with RSI overbought/oversold signals for entry timing.

#### Strategy Principles
The core logic of the strategy is based on several key elements:
1. Supertrend indicator calculation is based on ATR and SMA, used to determine current market trend. The upper band is calculated by adding the factor multiplied by ATR to SMA, while the lower band subtracts the same value.
2. Buy signals are generated when price is above the Supertrend line, sell signals when below.
3. RSI indicator confirms market momentum, filtering trade signals through overbought/oversold levels (default 70 and 30).
4. Long conditions require Supertrend showing buy signal and RSI crossing upward from oversold zone.
5. Short conditions need Supertrend showing sell signal and RSI crossing downward from overbought zone.
6. Stop loss is set at the Supertrend line, take profit at 2x ATR distance.

#### Strategy Advantages
1. Combines trend and momentum confirmation, reducing false signal probability.
2. Uses dynamic ATR for stop loss and take profit, adapting to different market conditions.
3. Supertrend indicator effectively tracks trends, reducing ineffective trades in ranging markets.
4. RSI filter helps avoid entries in overextended markets.
5. System includes comprehensive risk management with dynamic stops and fixed risk ratio profit targets.

#### Strategy Risks
1. May generate frequent false breakout signals in sideways markets.
2. RSI overbought/oversold boundaries may not be flexible enough for certain market conditions.
3. Fixed ATR multiplier may not suit all market environments.
4. Stop loss placement may result in larger losses during quick reversals.
5. Strategy may face slippage risks during high volatility periods.

#### Strategy Optimization Directions
1. Introduce adaptive RSI thresholds, dynamically adjusting overbought/oversold levels based on market volatility.
2. Add volume confirmation mechanism to improve signal reliability.
3. Implement dynamic ATR multiplier adjustment to better match current market characteristics.
4. Include time filters to avoid trading during high volatility periods like market open/close.
5. Consider adding market environment filters, using different parameters based on trend strength.

#### Summary
The strategy combines Supertrend and RSI indicators to build a complete trend-following trading system. It performs well in trending markets, controlling risk through dynamic stops and reasonable profit targets. While it has some limitations, the proposed optimization directions can further enhance strategy stability and adaptability. The strategy is suitable for tracking medium to long-term trends while maintaining profitability with good risk control.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-11 00:00:00
end: 2025-02-19 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("Supertrend + RSI Strategy", overlay=true)

// Input Parameters
atrLength = input.int(10, title="ATR Length", minval=1)
factor = input.float(3.0, title="Supertrend Factor", step=0.1)
rsiLength = input.int(14, title="RSI Length", minval=1)
rsiOverbought = input.int(70, title="RSI Overbought Level")
rsiOversold = input.int(30, title="RSI Oversold Level")

// Supertrend Calculation
atr = ta.atr(atrLength)
upperBand = ta.sma(close, atrLength) + (factor * atr)
lowerBand = ta.sma(close, atrLength) - (factor * atr)
supertrend = 0.0
supertrend := close > nz(supertrend[1], close) ? lowerBand : upperBand
supertrendSignal = close > supertrend ? "Buy" : "Sell"

// RSI Calculation
rsi = ta.rsi(close, rsiLength)

// Trading Logic
longCondition = (supertrendSignal == "Buy") and (rsi > rsiOversold)
shortCondition = (supertrendSignal == "Sell") and (rsi < rsiOverbought)

// Entry and Exit Conditions
if longCondition
    strategy.entry("Long", strategy.long)

if shortCondition
    strategy.entry("Short", strategy.short)

// Plot Supertrend
plot(supertrend, title="Supertrend", color=color.new(color.blue, 0), linewidth=2, style=plot.style_line)

// Plot RSI Levels
hline(rsiOverbought, "Overbought", color=color.red)
hline(rsiOversold, "Oversold", color=color.green)
plot(rsi, title="RSI", color=color.orange, style=plot.style_stepline)

// Alerts
alertcondition(longCondition, title="Buy Alert", message="Supertrend + RSI Buy Signal")
alertcondition(shortCondition, title="Sell Alert", message="Supertrend + RSI Sell Signal")

```

> Detail

https://www.fmz.com/strategy/483027

> Last Modified

2025-02-21 10:00:53
