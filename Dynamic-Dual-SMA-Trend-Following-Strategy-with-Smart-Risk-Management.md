
> Name

Dynamic-Dual-SMA-Trend-Following-Strategy-with-Smart-Risk-Management

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d28e2b1511d18c4b1c.png)

[trans]
#### 概述
本策略是一个基于双均线的智能趋势跟踪系统,通过计算高点和低点的移动平均线以及斜率指标来识别市场趋势,并结合动态止盈止损机制进行风险管理。策略的核心在于通过斜率阈值过滤伪信号,同时采用trailing stop动态跟踪方式锁定利润,实现了趋势跟踪与风险控制的有机结合。

#### 策略原理
策略采用双均线系统作为核心交易逻辑,分别在最高价和最低价序列上计算移动平均线。当价格突破上方均线且均线斜率显著向上时,系统产生做多信号;当价格跌破下方均线且均线斜率显著向下时,系统产生做空信号。为了避免震荡市中的频繁交易,策略引入斜率阈值机制,只有当均线斜率变化超过设定阈值时才确认趋势的有效性。在风险管理方面,策略设计了动态止盈止损机制,初始设定相对激进的止盈目标,同时使用跟踪止损保护已获得的利润。

#### 策略优势
1. 趋势识别准确性高:通过双均线和斜率阈值的组合,能够有效过滤掉横盘震荡中的虚假信号
2. 风险控制完善:动态止损机制可以随着价格变动自动调整,既保护利润又给趋势足够发展空间
3. 参数灵活可调:策略的关键参数如均线周期、止盈止损比例、斜率阈值等都可根据不同市场特征灵活调整
4. 逻辑清晰简单:策略逻辑直观易懂,便于维护和优化
5. 适应性强:可应用于不同的时间周期和交易品种

#### 策略风险
1. 趋势反转风险:在趋势突然反转时,trailing stop可能无法及时锁定全部利润
2. 参数敏感性:策略表现对参数设置较为敏感,不同市场环境可能需要不同的参数组合
3. 震荡市表现:虽然有斜率过滤,但在剧烈震荡市场中仍可能产生虚假信号
4. 滑点影响:在波动剧烈时期,实际成交价格可能与信号价格存在较大偏差

#### 策略优化方向
1. 引入波动率自适应机制:可考虑根据ATR动态调整斜率阈值和止损距离
2. 增加市场环境过滤:添加趋势强度指标,在不同市场环境下采用不同的参数组合
3. 优化止盈止损机制:可以设计多层次的止盈目标,逐步锁定部分利润
4. 添加交易量分析:结合成交量数据验证趋势的有效性
5. 引入时间过滤:避免在市场波动性较大的时间段进行交易

#### 总结
这是一个将趋势跟踪和风险管理有机结合的量化交易策略。通过双均线系统和斜率阈值的配合,策略能够较为准确地捕捉市场趋势,而动态的止盈止损机制则提供了完善的风险控制。虽然策略在参数选择和市场适应性方面还有改进空间,但其清晰的逻辑框架和灵活的参数体系为后续优化提供了良好基础。建议交易者在实盘应用时,需要根据具体的市场特征和自身风险偏好,对各项参数进行充分的回测和优化。 || 

#### Overview
This strategy is an intelligent trend-following system based on dual moving averages, which identifies market trends by calculating moving averages of highs and lows along with slope indicators, combined with dynamic profit-taking and stop-loss mechanisms for risk management. The strategy's core lies in filtering false signals through slope thresholds while using trailing stops to lock in profits, achieving an organic combination of trend following and risk control.

#### Strategy Principles
The strategy employs a dual moving average system as its core trading logic, calculating moving averages on both high and low price series. Long signals are generated when price breaks above the upper average with a significantly positive slope, while short signals occur when price breaks below the lower average with a significantly negative slope. To avoid frequent trading in oscillating markets, the strategy incorporates a slope threshold mechanism, confirming trend validity only when the moving average slope change exceeds the set threshold. For risk management, the strategy implements dynamic profit-taking and stop-loss mechanisms, setting initially aggressive profit targets while using trailing stops to protect gained profits.

#### Strategy Advantages
1. High accuracy in trend identification: The combination of dual moving averages and slope thresholds effectively filters out false signals in sideways markets
2. Comprehensive risk control: Dynamic stop-loss mechanism automatically adjusts with price movement, both protecting profits and allowing trends to develop
3. Flexible parameters: Key parameters such as moving average period, profit/loss ratios, and slope threshold can be adjusted for different market characteristics
4. Clear and simple logic: Strategy logic is intuitive and easy to understand, facilitating maintenance and optimization
5. High adaptability: Applicable to different timeframes and trading instruments

#### Strategy Risks
1. Trend reversal risk: During sudden trend reversals, trailing stops may not lock in all profits in time
2. Parameter sensitivity: Strategy performance is sensitive to parameter settings, different market environments may require different parameter combinations
3. Oscillating market performance: Despite slope filtering, false signals may still occur in highly volatile markets
4. Slippage impact: During highly volatile periods, actual execution prices may significantly deviate from signal prices

#### Optimization Directions
1. Introduce volatility adaptive mechanism: Consider dynamically adjusting slope thresholds and stop-loss distances based on ATR
2. Add market environment filtering: Include trend strength indicators to use different parameter combinations in different market conditions
3. Optimize profit-taking and stop-loss mechanisms: Design multi-level profit targets to gradually lock in partial profits
4. Add volume analysis: Incorporate volume data to verify trend validity
5. Introduce time filtering: Avoid trading during highly volatile market periods

#### Summary
This is a quantitative trading strategy that organically combines trend following with risk management. Through the cooperation of a dual moving average system and slope thresholds, the strategy can accurately capture market trends, while dynamic profit-taking and stop-loss mechanisms provide comprehensive risk control. Although there is room for improvement in parameter selection and market adaptability, its clear logical framework and flexible parameter system provide a good foundation for subsequent optimization. It is recommended that traders thoroughly backtest and optimize various parameters according to specific market characteristics and their own risk preferences when applying the strategy in live trading.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-27 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("SMA Buy/Sell Strategy with Significant Slope", overlay=true)

// Parametri configurabili
smaPeriod = input.int(20, title="SMA Period", minval=1)
initialTPPercent = input.float(5.0, title="Initial Take Profit (%)", minval=0.1)  // Take Profit iniziale (ambizioso)
trailingSLPercent = input.float(1.0, title="Trailing Stop Loss (%)", minval=0.1) // Percentuale di trailing SL
slopeThreshold = input.float(0.05, title="Slope Threshold (%)", minval=0.01)    // Soglia minima di pendenza significativa

// SMA calcolate su HIGH e LOW
smaHigh = ta.sma(high, smaPeriod)
smaLow = ta.sma(low, smaPeriod)

// Funzioni per pendenza significativa
isSignificantSlope(sma, threshold) =>
    math.abs(sma - sma[5]) / sma[5] > threshold / 100

slopePositive(sma) =>
    sma > sma[1] and isSignificantSlope(sma, slopeThreshold)

slopeNegative(sma) =>
    sma < sma[1] and isSignificantSlope(sma, slopeThreshold)

// Condizioni di BUY e SELL
buyCondition = close > smaHigh and low < smaHigh and close[1] < smaHigh and slopePositive(smaHigh)
sellCondition = close < smaLow and high > smaLow and close[1] > smaLow and slopeNegative(smaLow)

// Plot delle SMA
plot(smaHigh, color=color.green, linewidth=2, title="SMA 20 High")
plot(smaLow, color=color.red, linewidth=2, title="SMA 20 Low")

// Gestione TP/SL dinamici
longInitialTP = strategy.position_avg_price * (1 + initialTPPercent / 100)
shortInitialTP = strategy.position_avg_price * (1 - initialTPPercent / 100)

// Trailing SL dinamico
longTrailingSL = close * (1 - trailingSLPercent / 100)
shortTrailingSL = close * (1 + trailingSLPercent / 100)

// Chiusura di posizioni attive su segnali opposti
if strategy.position_size > 0 and sellCondition
    strategy.close("Buy", comment="Close Long on Sell Signal")
if strategy.position_size < 0 and buyCondition
    strategy.close("Sell", comment="Close Short on Buy Signal")

// Apertura di nuove posizioni con TP iniziale e Trailing SL
if buyCondition
    strategy.entry("Buy", strategy.long, comment="Open Long")
    strategy.exit("Long TP/Trailing SL", from_entry="Buy", limit=longInitialTP, stop=longTrailingSL)

if sellCondition
    strategy.entry("Sell", strategy.short, comment="Open Short")
    strategy.exit("Short TP/Trailing SL", from_entry="Sell", limit=shortInitialTP, stop=shortTrailingSL)

```

> Detail

https://www.fmz.com/strategy/473321

> Last Modified

2024-11-29 11:06:38
