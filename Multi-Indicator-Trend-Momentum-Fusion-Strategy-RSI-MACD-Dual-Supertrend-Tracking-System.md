
> Name

Multi-Indicator-Trend-Momentum-Fusion-Strategy-RSI-MACD-Dual-Supertrend-Tracking-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d86605c25c6cc3e9e5ab.png)
![IMG](https://www.fmz.com/upload/asset/2d96ed04f3ec4edafaae8.png)




[trans]

#### 概述

本策略是一个融合了多重技术指标的综合交易系统,主要结合了相对强弱指数(RSI)、移动平均线收敛发散指标(MACD)、双重超趋势指标(Supertrend)和基于真实波动幅度(ATR)的风险管理机制。该策略通过多层次的指标确认,构建了一个既能跟踪趋势又能捕捉动量转换的交易框架,有效过滤市场噪音,降低虚假信号风险。核心逻辑是先通过双重超趋势(因子2和7)确认市场主导趋势,再通过MACD交叉及动量变化确认趋势方向,最后利用RSI超买/超卖区域寻找最优入场点,同时采用基于ATR的止损、保本和追踪止损机制进行全方位风险控制。

#### 策略原理

该策略的运作机制基于四个关键组件:趋势识别、动量确认、入场条件和风险管理。

1. **趋势识别**: 采用双重超趋势指标(因子2和7)作为趋势过滤器。超趋势指标设计用于跟踪市场主导趋势并过滤市场噪音。通过使用两个不同参数的超趋势指标,策略要求两个指标同时确认相同方向,大大提高了趋势信号的可靠性。

2. **动量确认**: 采用MACD(5,13,9)检测早期趋势反转。策略要求MACD线与信号线的交叉作为第一层确认,并要求MACD连续走势(上升或下降)作为第二层确认,确保捕捉到真实的动量变化而非短期波动。

3. **入场条件**:
   - 做多条件: RSI低于35(超卖区域)、MACD线上穿信号线并持续上升、两个超趋势指标均显示上升趋势(direction1和direction2均为1)
   - 做空条件: RSI高于65(超买区域)、MACD线下穿信号线并持续下降、两个超趋势指标均显示下降趋势(direction1和direction2均为-1)

4. **风险管理**:
   - 止损设置: 基于ATR的动态止损,位于入场价格下方(做多)或上方(做空)1倍ATR
   - 移动止损至保本点: 当价格向有利方向移动1倍ATR时,止损移至入场价格
   - 获利目标: 设置在入场价格上方(做多)或下方(做空)2.5倍ATR
   - 追踪止损: 使用1倍ATR的追踪止损,随着价格向有利方向移动而调整,锁定利润

策略的核心代码实现了自定义的超趋势函数,用于计算超趋势水平和方向,并结合RSI和MACD的动态计算,形成完整的信号系统。执行交易时,策略同时设置了止损、获利目标和追踪止损,实现全面的风险管理。

#### 策略优势

1. **多层确认机制**: 通过要求多个指标同时确认,显著减少了虚假信号。双重超趋势、MACD趋势确认和RSI超买/超卖过滤器共同作用,确保只在高概率时机入场。

2. **自适应风险管理**: 所有止损和获利目标都基于ATR动态调整,使策略能够自动适应不同市场环境和波动性。在波动性增加时自动拉大止损距离,在波动性降低时收窄止损距离。

3. **平衡的风险回报比**: 策略设置2.5倍ATR的获利目标和1倍ATR的止损,提供了2.5:1的基础风险回报比,符合专业风险管理标准。

4. **多市场适应性**: 由于指标组合针对的是价格走势和波动特征,而非特定市场模式,该策略可以应用于多种交易品种和时间周期。

5. **持续性利润锁定**: 通过ATR追踪止损机制,策略能够在保持交易开放以捕捉趋势延续的同时,逐步锁定已实现的利润,平衡了过早获利和过度持有的风险。

6. **避免过度交易**: 严格的入场条件可有效避免在横盘市场或波动不明确时的过度交易,保持资金的高效利用并降低交易成本。

#### 策略风险

1. **趋势反转风险**: 尽管有多层确认,但在快速市场反转或极端波动环境下,策略可能无法及时退出现有头寸。解决方法是增加市场环境过滤器,在波动超过历史阈值时减少头寸规模或暂停交易。

2. **参数优化风险**: 策略性能高度依赖于RSI、MACD和超趋势的参数设置。过度优化可能导致曲线拟合和未来表现下降。建议采用滚动窗口测试和不同市场环境下的稳健性测试来验证参数可靠性。

3. **流动性风险**: 在低流动性市场中,ATR基础止损可能导致滑点增加或执行价格不理想。解决方法是在低流动性市场中适当扩大止损距离或增加额外缓冲。

4. **连续损失风险**: 即使有严格的入场条件,市场在某些时期可能连续产生虚假信号,导致一系列小额亏损。可以通过实施最大连续亏损限制和动态调整头寸规模来缓解这一问题。

5. **过度依赖技术指标**: 该策略完全基于技术指标,忽略了基本面和市场情绪因素。在重大新闻事件或市场结构变化时,纯技术方法可能失效。建议整合基本面过滤器或重要事件日历来规避这类风险。

#### 策略优化方向

1. **指标参数自适应**: 目前策略使用固定参数的指标。可以实现基于市场波动性或趋势强度的动态参数调整机制,如在波动性增加时增加RSI的超买超卖阈值,在趋势强度减弱时收紧超趋势参数。这将显著提高策略对不同市场周期的适应能力。

2. **市场模式分类**: 增加市场模式识别模块,区分趋势市场、震荡市场和过渡市场,针对不同市场状态应用不同的参数集和风险管理规则。例如,在明确的趋势市场放宽入场条件,在震荡市场加强过滤机制。

3. **时间过滤器**: 引入基于市场活跃度的时间过滤机制,避开已知的低流动性时段和高波动性开盘/收盘时段,提高信号质量和执行效率。

4. **风险动态调整**: 实现基于账户绩效和连续获利/亏损状态的动态风险调整,在连续亏损后缩小头寸规模,在连续获利后逐步增加风险敞口,优化资金管理效率。

5. **多指标权重系统**: 建立指标权重评分系统,根据不同市场环境为不同指标分配权重,提高决策准确性。例如,在高波动环境中提高RSI权重,在强趋势市场中提高超趋势指标权重。

6. **量价结合**: 整合交易量确认机制,要求价格突破伴随交易量增加,进一步提高信号可靠性,减少假突破风险。

#### 总结

多指标趋势动量融合策略通过整合RSI、MACD和双重超趋势指标,构建了一个平衡高效的交易系统。该策略的关键优势在于其多层次确认机制和基于波动性的自适应风险管理系统,有效减少虚假信号并提供合理的风险回报特性。通过严格的入场条件和动态的退出管理,策略能够平衡捕捉趋势的机会和控制下行风险的需要。

该策略最适合中长期交易者,特别是那些注重风险管理且寻求在明确趋势中进行高概率交易的投资者。通过实施建议的优化方向,特别是指标参数自适应和市场模式分类,可以进一步提高策略的稳健性和适应性,使其在各种市场环境中保持竞争力。最终,该策略代表了一种系统化、纪律化的交易方法,通过技术指标的智能组合和严格的风险控制,为交易者提供了一个可持续的盈利框架。 || 

#### Overview

This strategy is a comprehensive trading system that integrates multiple technical indicators, primarily combining the Relative Strength Index (RSI), Moving Average Convergence Divergence (MACD), dual Supertrend indicators, and an Average True Range (ATR)-based risk management mechanism. Through multi-level indicator confirmation, the strategy builds a trading framework that both tracks trends and captures momentum shifts, effectively filtering market noise and reducing the risk of false signals. The core logic is to first confirm the market's dominant trend using dual Supertrends (factors 2 and 7), then verify trend direction through MACD crossovers and momentum changes, and finally identify optimal entry points using RSI overbought/oversold zones, while implementing comprehensive risk control through ATR-based stop-loss, breakeven, and trailing stop mechanisms.

#### Strategy Principles

The operation mechanism of this strategy is based on four key components: trend identification, momentum confirmation, entry conditions, and risk management.

1. **Trend Identification**: Employs dual Supertrend indicators (factors 2 and 7) as trend filters. The Supertrend indicator is designed to track the market's dominant trend and filter out market noise. By using two Supertrend indicators with different parameters, the strategy requires both indicators to simultaneously confirm the same direction, greatly enhancing the reliability of trend signals.

2. **Momentum Confirmation**: Uses MACD (5,13,9) to detect early trend reversals. The strategy requires the crossover of the MACD line and signal line as the first layer of confirmation, and demands continuous MACD movement (rising or falling) as the second layer of confirmation, ensuring the capture of genuine momentum shifts rather than short-term fluctuations.

3. **Entry Conditions**:
   - Long Conditions: RSI below 35 (oversold zone), MACD line crosses above the signal line and continues to rise, both Supertrend indicators show an uptrend (direction1 and direction2 both equal 1)
   - Short Conditions: RSI above 65 (overbought zone), MACD line crosses below the signal line and continues to fall, both Supertrend indicators show a downtrend (direction1 and direction2 both equal -1)

4. **Risk Management**:
   - Stop Loss Setting: Dynamic stop loss based on ATR, positioned 1x ATR below (for longs) or above (for shorts) the entry price
   - Moving Stop Loss to Breakeven: When price moves 1x ATR in the favorable direction, stop loss is moved to the entry price
   - Profit Target: Set at 2.5x ATR above (for longs) or below (for shorts) the entry price
   - Trailing Stop: Uses a 1x ATR trailing stop that adjusts as price moves in the favorable direction, locking in profits

The core code implements a custom Supertrend function for calculating Supertrend levels and direction, and combines it with dynamic calculations of RSI and MACD to form a complete signal system. When executing trades, the strategy simultaneously sets stop-loss, profit targets, and trailing stops to achieve comprehensive risk management.

#### Strategy Advantages

1. **Multi-layer Confirmation Mechanism**: By requiring multiple indicators to confirm simultaneously, false signals are significantly reduced. The dual Supertrend, MACD trend confirmation, and RSI overbought/oversold filters work together to ensure entries only occur at high-probability moments.

2. **Adaptive Risk Management**: All stop-losses and profit targets are dynamically adjusted based on ATR, allowing the strategy to automatically adapt to different market environments and volatility. Stop distances automatically widen when volatility increases and narrow when volatility decreases.

3. **Balanced Risk-Reward Ratio**: The strategy sets a 2.5x ATR profit target and a 1x ATR stop loss, providing a 2.5:1 basic risk-reward ratio, which complies with professional risk management standards.

4. **Multi-market Adaptability**: Since the indicator combination targets price movements and volatility characteristics rather than specific market patterns, this strategy can be applied to various trading instruments and timeframes.

5. **Continuous Profit Locking**: Through the ATR trailing stop mechanism, the strategy can gradually lock in realized profits while keeping trades open to capture trend continuation, balancing the risks of taking profits too early and holding positions too long.

6. **Avoidance of Overtrading**: Strict entry conditions effectively prevent overtrading in ranging markets or during unclear volatility, maintaining efficient capital utilization and reducing trading costs.

#### Strategy Risks

1. **Trend Reversal Risk**: Despite multiple confirmation layers, in rapidly reversing markets or extreme volatility environments, the strategy may not exit existing positions in a timely manner. The solution is to add market environment filters that reduce position size or pause trading when volatility exceeds historical thresholds.

2. **Parameter Optimization Risk**: Strategy performance heavily depends on the parameter settings for RSI, MACD, and Supertrend. Excessive optimization may lead to curve-fitting and declining future performance. Rolling window testing and robustness testing across different market environments are recommended to verify parameter reliability.

3. **Liquidity Risk**: In low-liquidity markets, ATR-based stops may result in increased slippage or unfavorable execution prices. The solution is to appropriately widen stop distances or add additional buffers in low-liquidity markets.

4. **Consecutive Loss Risk**: Even with strict entry conditions, the market may generate consecutive false signals during certain periods, leading to a series of small losses. This can be mitigated by implementing maximum consecutive loss limits and dynamically adjusting position sizes.

5. **Over-reliance on Technical Indicators**: This strategy is entirely based on technical indicators, ignoring fundamental and market sentiment factors. During major news events or market structure changes, purely technical approaches may fail. It is advisable to integrate fundamental filters or important event calendars to mitigate such risks.

#### Strategy Optimization Directions

1. **Indicator Parameter Adaptation**: The current strategy uses fixed parameters for indicators. A dynamic parameter adjustment mechanism based on market volatility or trend strength could be implemented, such as increasing RSI overbought/oversold thresholds when volatility increases, or tightening Supertrend parameters when trend strength weakens. This would significantly enhance the strategy's adaptability to different market cycles.

2. **Market Pattern Classification**: Add a market pattern recognition module to distinguish between trending markets, oscillating markets, and transitional markets, applying different parameter sets and risk management rules for different market states. For example, relax entry conditions in clear trending markets and strengthen filtering mechanisms in oscillating markets.

3. **Time Filters**: Introduce time filtering mechanisms based on market activity to avoid known low-liquidity periods and high-volatility opening/closing periods, improving signal quality and execution efficiency.

4. **Dynamic Risk Adjustment**: Implement dynamic risk adjustment based on account performance and consecutive profit/loss status, reducing position size after consecutive losses and gradually increasing risk exposure after consecutive wins to optimize capital management efficiency.

5. **Multi-indicator Weighting System**: Establish an indicator weighting scoring system that assigns weights to different indicators based on various market environments, improving decision accuracy. For example, increase RSI weighting in high-volatility environments and enhance Supertrend indicator weighting in strong trending markets.

6. **Volume-Price Integration**: Integrate volume confirmation mechanisms, requiring price breakouts to be accompanied by increased trading volume, further improving signal reliability and reducing false breakout risks.

#### Summary

The Multi-Indicator Trend-Momentum Fusion Strategy integrates RSI, MACD, and dual Supertrend indicators to build a balanced and efficient trading system. The key advantages of this strategy lie in its multi-level confirmation mechanism and volatility-based adaptive risk management system, effectively reducing false signals and providing reasonable risk-reward characteristics. Through strict entry conditions and dynamic exit management, the strategy balances the opportunity to capture trends with the need to control downside risk.

This strategy is most suitable for medium to long-term traders, especially those who prioritize risk management and seek high-probability trades in clear trends. By implementing the suggested optimization directions, particularly indicator parameter adaptation and market pattern classification, the strategy's robustness and adaptability can be further enhanced, maintaining its competitiveness across various market environments. Ultimately, this strategy represents a systematic, disciplined trading approach that provides traders with a sustainable profit framework through intelligent combination of technical indicators and strict risk control.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-03 00:00:00
end: 2025-04-02 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BNB_USDT"}]
*/

//@version=6
strategy("Enhanced RSI-MACD-Supertrend Strategy", overlay=true)

// ? User Inputs
rsiLength = input.int(14, title="RSI Length")
macdFast = input.int(5, title="MACD Fast Length")       // Updated
macdSlow = input.int(13, title="MACD Slow Length")      // Updated
macdSignal = input.int(9, title="MACD Signal Length")   // Updated
atrLength = input.int(14, title="ATR Length")
atrSLMultiplier = input.float(1, title="ATR Multiplier for Stop Loss")  // Updated
atrBETrigger = input.float(1, title="Move SL to Breakeven at X ATR")    // Updated
atrTPMultiplier = input.float(2.5, title="Take Profit at X ATR")  
atrTrailMultiplier = input.float(1, title="Trailing Stop ATR Multiplier") // Updated
supertrendFactor1 = input.float(2, title="Supertrend Factor 1")  // Updated
supertrendFactor2 = input.float(7, title="Supertrend Factor 2")  // Updated
supertrendLength = input.int(9, title="Supertrend Length")  

// ? Indicator Calculations
rsi = ta.rsi(close, rsiLength)
[macdLine, signalLine, _] = ta.macd(close, macdFast, macdSlow, macdSignal)
atr = ta.atr(atrLength)

// ? Custom Supertrend Function
supertrend(_factor, _length) =>
    atr_ = ta.atr(_length)
    src = hl2
    up = src - _factor * atr_
    down = src + _factor * atr_
    var trend = 0.0
    trend := na(trend[1]) ? up : (trend[1] > up ? math.max(up, trend[1]) : math.min(down, trend[1]))
    direction = trend == up ? 1 : -1
    [trend, direction]

// ? Apply Dual Supertrend
[supertrend1, direction1] = supertrend(supertrendFactor1, supertrendLength)
[supertrend2, direction2] = supertrend(supertrendFactor2, supertrendLength)

// ? MACD Momentum Confirmation
isMacdRising = macdLine > macdLine[1] and macdLine[1] > macdLine[2]
isMacdFalling = macdLine < macdLine[1] and macdLine[1] < macdLine[2]

// ? Entry Conditions (Both Supertrends Must Confirm)
longCondition = rsi < 35 and macdLine > signalLine and isMacdRising and direction1 == 1 and direction2 == 1
shortCondition = rsi > 65 and macdLine < signalLine and isMacdFalling and direction1 == -1 and direction2 == -1

// ? ATR-Based Exit Conditions
longStopLoss = close - (atrSLMultiplier * atr)
shortStopLoss = close + (atrSLMultiplier * atr)

longTakeProfit = close + (atrTPMultiplier * atr)
shortTakeProfit = close - (atrTPMultiplier * atr)

// Move SL to Breakeven
longBreakEven = close + (atrBETrigger * atr)
shortBreakEven = close - (atrBETrigger * atr)

// Trailing Stop Loss (Convert to Points)
longTrailingStop = atrTrailMultiplier * atr
shortTrailingStop = atrTrailMultiplier * atr

// ? Execute Trades
if longCondition
    strategy.entry("Long", strategy.long)
if shortCondition
    strategy.entry("Short", strategy.short)

strategy.exit("Long Exit", from_entry="Long", stop=longStopLoss, limit=longTakeProfit, trail_points=longTrailingStop)
strategy.exit("Short Exit", from_entry="Short", stop=shortStopLoss, limit=shortTakeProfit, trail_points=shortTrailingStop)

// ? Plot Buy/Sell Signals
plotshape(series=longCondition, location=location.belowbar, color=color.green, style=shape.labelup, title="BUY", text="BUY")
plotshape(series=shortCondition, location=location.abovebar, color=color.red, style=shape.labeldown, title="SELL", text="SELL")

// ? Alerts for Automation
alertcondition(longCondition, title="BUY Alert", message="BUY Signal for Delta Exchange")
alertcondition(shortCondition, title="SELL Alert", message="SELL Signal for Delta Exchange")

```

> Detail

https://www.fmz.com/strategy/489294

> Last Modified

2025-04-03 11:03:20
