
> Name

Multi-Indicator-Momentum-Trend-Following-Strategy-Quantitative-Trading-System-Based-on-Supertrend-and-ADX-Dual-Confirmation

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d87fbb8e783aace0440e.png)
![IMG](https://www.fmz.com/upload/asset/2d8668c50f6e8b5cc3624.png)



[trans]
#### 概述
该策略是一个结合了多重技术指标的趋势跟踪系统,主要基于Supertrend指标的趋势方向判断,并结合ADX(平均趋向指数)的趋势强度确认以及RSI(相对强弱指数)的波动区间判断来优化入场时机。策略采用单向做多模式,通过多重指标交叉验证来提高交易的准确性和可靠性。

#### 策略原理
策略核心逻辑基于以下三个关键组成部分:
1. Supertrend指标用于确定主要趋势方向,当指标转向下方时代表上升趋势形成;
2. ADX指标用于衡量趋势强度,当ADX值超过14时表明趋势足够强劲;
3. RSI指标用于判断价格波动区间,在30-60之间入场,避免过度追涨。

入场条件需同时满足:
- Supertrend方向向下(supertrendDirection == -1)
- ADX值大于阈值14(adx > adxThreshold)
- RSI位于指定区间(rsi < 40 or rsi > 60)

平仓条件:
当Supertrend方向转向上方时(supertrendDirection == 1)执行平仓。

#### 策略优势
1. 多重指标交叉验证提高了交易信号的可靠性,降低了假突破带来的风险。
2. 结合趋势方向和强度的双重确认机制,能更好地把握趋势交易机会。
3. 通过RSI区间限制避免在过度追涨区域入场,提高入场点位的性价比。
4. 策略逻辑清晰,参数可调整性强,便于根据不同市场特征进行优化。
5. 设置了完善的可视化和提醒功能,有助于实时监控策略表现。

#### 策略风险
1. 过多指标的使用可能导致信号滞后,在快速波动市场中错过交易机会。
2. 单向做多策略在下跌趋势中无法获利,存在较大的方向性风险。
3. 固定的ADX阈值可能在不同市场环境下表现不一致。
4. RSI区间设置可能导致错过一些重要的趋势起点。
5. Supertrend参数的敏感性可能导致过多的假信号。

#### 策略优化方向
1. 引入自适应的ADX阈值设置,根据市场波动率动态调整阈值。
2. 增加趋势确认的时间周期要求,避免短期假突破。
3. 优化RSI区间的动态调整机制,提高入场时机的准确性。
4. 考虑添加做空功能,提高策略的全市场适应性。
5. 引入止损机制,控制单笔交易风险。
6. 增加交易量分析指标,提高信号可信度。

#### 总结
该策略通过多重技术指标的组合应用,构建了一个相对完善的趋势跟踪交易系统。策略的核心优势在于通过不同指标的交叉验证提高了交易信号的可靠性,但同时也面临着信号滞后和参数优化的挑战。通过提出的优化方向,策略有望在保持现有优势的基础上进一步提升其适应性和稳定性。总的来说,这是一个具有良好基础框架的策略,通过持续优化和改进,有望发展成为一个更加全面和稳健的交易系统。 || 

#### Overview
This strategy is a trend-following system that combines multiple technical indicators, primarily based on Supertrend indicator for trend direction determination, integrated with ADX (Average Directional Index) for trend strength confirmation and RSI (Relative Strength Index) for volatility range assessment to optimize entry timing. The strategy adopts a long-only mode, utilizing multiple indicator cross-validation to enhance trading accuracy and reliability.

#### Strategy Principles
The core logic of the strategy is based on three key components:
1. Supertrend indicator for determining the main trend direction, with a downward shift indicating an uptrend formation;
2. ADX indicator for measuring trend strength, with values above 14 indicating sufficient trend momentum;
3. RSI indicator for assessing price volatility range, entering between 30-60 to avoid excessive chasing.

Entry conditions must simultaneously satisfy:
- Supertrend direction downward (supertrendDirection == -1)
- ADX value above threshold 14 (adx > adxThreshold)
- RSI within specified range (rsi < 40 or rsi > 60)

Exit conditions:
Position closure is executed when Supertrend direction turns upward (supertrendDirection == 1).

#### Strategy Advantages
1. Multiple indicator cross-validation enhances trading signal reliability, reducing false breakout risks.
2. Dual confirmation mechanism combining trend direction and strength better captures trend trading opportunities.
3. RSI range restriction prevents entry in overbought areas, improving entry point value.
4. Clear strategy logic with adjustable parameters facilitates optimization for different market characteristics.
5. Comprehensive visualization and alert functions aid real-time strategy monitoring.

#### Strategy Risks
1. Multiple indicators may lead to signal lag, missing trading opportunities in rapidly volatile markets.
2. Long-only strategy cannot profit in downtrends, presenting significant directional risk.
3. Fixed ADX threshold may perform inconsistently across different market environments.
4. RSI range settings might miss important trend initiation points.
5. Supertrend parameter sensitivity may generate excessive false signals.

#### Strategy Optimization Directions
1. Introduce adaptive ADX threshold settings, dynamically adjusting thresholds based on market volatility.
2. Add trend confirmation time period requirements to avoid short-term false breakouts.
3. Optimize RSI range dynamic adjustment mechanism to improve entry timing accuracy.
4. Consider adding short functionality to enhance full market adaptability.
5. Introduce stop-loss mechanism to control single trade risk.
6. Add volume analysis indicators to increase signal credibility.

#### Summary
This strategy constructs a relatively comprehensive trend-following trading system through the combined application of multiple technical indicators. The core advantage lies in enhancing trading signal reliability through cross-validation of different indicators, while simultaneously facing challenges of signal lag and parameter optimization. Through the proposed optimization directions, the strategy has the potential to further improve its adaptability and stability while maintaining existing advantages. Overall, this is a strategy with a solid basic framework that, through continuous optimization and improvement, has the potential to develop into a more comprehensive and robust trading system.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-02-13 00:00:00
end: 2025-02-20 00:00:00
period: 5m
basePeriod: 5m
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("Supertrend + ADX Strategy", overlay=true)

// Parameter für ADX und Supertrend
diLength = input.int(14, title="DI Length")
adxSmoothing = input.int(14, title="ADX Smoothing")
adxThreshold = input.float(14)
supertrendFactor = input.float(3.0, title="Supertrend Factor")
supertrendPeriod = input.int(14, title="Supertrend Period")

// Berechnung von +DI, -DI und ADX
[diplus, diminus, adx] = ta.dmi(diLength, adxSmoothing)

// RSI-Berechnung
rsiLength = input.int(14, title="RSI Length")
rsi = ta.rsi(close, rsiLength)

// Supertrend-Berechnung
[supertrendValue, supertrendDirection] = ta.supertrend(supertrendFactor, supertrendPeriod)

// Long-Einstiegsbedingung
longCondition = supertrendDirection == -1 and adx > adxThreshold and (rsi < 40 or rsi > 60)

// Long-Ausstiegsbedingung (wenn Supertrend grün wird)
exitCondition = supertrendDirection == 1

// Visualisierung der Einstiegssignale (Pfeile)
plotshape(series=longCondition, location=location.belowbar, color=color.green, style=shape.triangleup, title="Buy Signal")
plotshape(series=exitCondition, location=location.abovebar, color=color.red, style=shape.triangledown, title="Sell Signal")

// Supertrend-Plot im Chart
plot(supertrendValue, color=supertrendDirection == -1 ? color.yellow : color.red, linewidth=2, title="Supertrend Line")

// Alerts für Einstieg/Ausstieg
alertcondition(longCondition, title="Long Signal", message="Supertrend + ADX: Long Entry")
alertcondition(exitCondition, title="Exit Signal", message="Supertrend turned Green: Exit")

// Strategieausführung
if longCondition and supertrendDirection == -1
    strategy.entry("Long", strategy.long)

if exitCondition
    strategy.close("Long")



```

> Detail

https://www.fmz.com/strategy/483055

> Last Modified

2025-02-27 17:07:46
