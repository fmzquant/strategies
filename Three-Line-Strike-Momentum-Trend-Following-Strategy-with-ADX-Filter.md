
> Name

Three-Line-Strike-Momentum-Trend-Following-Strategy-with-ADX-Filter

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8486700014a2f32ff2b.png)
![IMG](https://www.fmz.com/upload/asset/2d8242d504d1fc683b841.png)


[trans]
#### 概述
该策略是一个基于三线突破形态和ADX趋势过滤的趋势跟踪交易系统。策略通过识别三根连续同向蜡烛后的突破形态,结合ADX指标确认趋势强度,并使用ATR动态设置止盈止损位置。这种方法既保证了入场信号的可靠性,又能够有效控制风险。

#### 策略原理
策略的核心逻辑包含以下几个关键要素:
1. 三线突破形态识别:多头形态需要三根连续的阴线后出现一根较大的阳线突破;空头形态则需要三根连续的阳线后出现一根较大的阴线突破。
2. ADX趋势强度确认:使用ADX指标判断当前趋势强度,只有当ADX值超过设定阈值(默认25)时才会产生交易信号。
3. ATR动态止盈止损:使用ATR值动态计算止盈和止损位置,其中止盈设置为2倍ATR,止损设置为1倍ATR。
4. 交易执行逻辑:当满足形态识别和趋势强度条件时,系统会自动执行开仓操作,并同时设置相应的止盈止损单。

#### 策略优势
1. 信号可靠性高:结合价格形态和趋势指标双重确认,显著提高了交易信号的可靠性。
2. 风险控制合理:采用ATR动态设置止盈止损,能够根据市场波动性自适应调整风险控制参数。
3. 系统化程度高:策略逻辑清晰,参数可调整性强,便于进行系统化交易。
4. 适应性强:可以应用于不同的市场和时间周期,具有良好的普适性。

#### 策略风险
1. 假突破风险:在震荡市场中可能出现假突破信号,导致交易损失。
2. 滑点风险:由于策略使用市价单入场,在流动性较差的市场可能面临显著滑点。
3. 参数敏感性:策略效果对ADX阈值和ATR周期等参数较为敏感,需要针对不同市场进行优化。
4. 趋势依赖性:策略在震荡市场的表现可能不佳,更适合趋势明显的市场环境。

#### 策略优化方向
1. 形态识别增强:可以添加更多的价格形态验证条件,如考虑蜡烛线的实体与影线比例。
2. 趋势确认改进:可以引入其他趋势指标如MACD或移动平均线交叉作为辅助确认。
3. 止盈止损优化:可以根据不同市场特征动态调整ATR倍数,或采用追踪止损方式。
4. 交易时间优化:可以添加交易时间过滤,避免在市场波动性较大的时段交易。

#### 总结
三线突破动量趋势跟踪策略是一个结合了经典价格形态和技术指标的完整交易系统。通过ADX趋势过滤和ATR动态风控,该策略在保证交易机会的同时也较好地控制了风险。虽然存在一些局限性,但通过合理的参数优化和策略改进,该策略具有较好的实战应用价值。 || 

#### Overview
This strategy is a trend-following trading system based on the Three-Line Strike pattern combined with ADX trend filtering. It identifies breakthrough patterns after three consecutive candlesticks in the same direction, confirms trend strength using the ADX indicator, and sets dynamic take-profit and stop-loss levels using ATR. This approach ensures both signal reliability and effective risk control.

#### Strategy Principles
The core logic includes several key elements:
1. Three-Line Strike Pattern Recognition: Bullish pattern requires three consecutive red candles followed by a larger green breakout candle; bearish pattern requires three consecutive green candles followed by a larger red breakout candle.
2. ADX Trend Strength Confirmation: Uses the ADX indicator to judge current trend strength, generating trading signals only when ADX value exceeds the set threshold (default 25).
3. ATR Dynamic Take-Profit and Stop-Loss: Uses ATR values to dynamically calculate take-profit and stop-loss positions, with TP set at 2x ATR and SL at 1x ATR.
4. Trade Execution Logic: When pattern recognition and trend strength conditions are met, the system automatically executes position opening and sets corresponding TP/SL orders.

#### Strategy Advantages
1. High Signal Reliability: Combines price patterns and trend indicators for dual confirmation, significantly improving trading signal reliability.
2. Reasonable Risk Control: Uses ATR for dynamic TP/SL setting, adapting risk control parameters to market volatility.
3. High Systematization: Clear strategy logic with adjustable parameters, suitable for systematic trading.
4. Strong Adaptability: Applicable to different markets and timeframes with good universality.

#### Strategy Risks
1. False Breakout Risk: May generate false breakout signals in ranging markets, leading to trading losses.
2. Slippage Risk: Due to market order entries, significant slippage may occur in less liquid markets.
3. Parameter Sensitivity: Strategy performance is sensitive to parameters like ADX threshold and ATR period, requiring optimization for different markets.
4. Trend Dependency: Strategy may underperform in ranging markets, more suitable for trending market conditions.

#### Strategy Optimization Directions
1. Pattern Recognition Enhancement: Add more price pattern validation conditions, such as considering candlestick body-to-wick ratios.
2. Trend Confirmation Improvement: Introduce additional trend indicators like MACD or moving average crossovers for auxiliary confirmation.
3. Take-Profit/Stop-Loss Optimization: Dynamically adjust ATR multipliers based on market characteristics or implement trailing stops.
4. Trading Time Optimization: Add trading time filters to avoid trading during highly volatile market periods.

#### Summary
The Three-Line Strike Momentum Trend Following Strategy is a complete trading system combining classical price patterns and technical indicators. Through ADX trend filtering and ATR dynamic risk control, this strategy maintains trading opportunities while effectively controlling risk. Despite some limitations, through proper parameter optimization and strategy improvements, this strategy has good practical application value.[/trans]




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-08-11 00:00:00
end: 2025-02-19 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

// Copyright ...
// Based on the TMA Overlay by Arty, converted to a simple strategy example.
// Pine Script v5

//@version=5
strategy(title='3 Line Strike [TTF] - Strategy with ATR and ADX Filter',
     shorttitle='3LS Strategy [TTF]',
     overlay=true,
     initial_capital=100000,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=100,
     pyramiding=0)

// -----------------------------------------------------------------------------
//                               INPUTS
// -----------------------------------------------------------------------------

// ATR and ADX Inputs
atrLength = input.int(title='ATR Length', defval=14, group='ATR & ADX')
adxLength = input.int(title='ADX Length', defval=14, group='ATR & ADX')
adxThreshold = input.float(title='ADX Threshold', defval=25, group='ATR & ADX')

// ### 3 Line Strike
showBear3LS = input.bool(title='Show Bearish 3 Line Strike', defval=true, group='3 Line Strike',
     tooltip="Bearish 3 Line Strike (3LS-Bear) = 3 zelené sviečky, potom veľká červená sviečka (engulfing).")
showBull3LS = input.bool(title='Show Bullish 3 Line Strike', defval=true, group='3 Line Strike',
     tooltip="Bullish 3 Line Strike (3LS-Bull) = 3 červené sviečky, potom veľká zelená sviečka (engulfing).")

// -----------------------------------------------------------------------------
//                          CALCULATIONS
// -----------------------------------------------------------------------------

// Calculate ATR
atr = ta.atr(atrLength)

// Calculate ADX components manually
tr = ta.tr(true)
plusDM = ta.change(high) > ta.change(low) and ta.change(high) > 0 ? ta.change(high) : 0
minusDM = ta.change(low) > ta.change(high) and ta.change(low) > 0 ? ta.change(low) : 0
smoothedPlusDM = ta.rma(plusDM, adxLength)
smoothedMinusDM = ta.rma(minusDM, adxLength)
smoothedTR = ta.rma(tr, adxLength)

plusDI = (smoothedPlusDM / smoothedTR) * 100
minusDI = (smoothedMinusDM / smoothedTR) * 100

dx = math.abs(plusDI - minusDI) / (plusDI + minusDI) * 100
adx = ta.rma(dx, adxLength)

// Helper Functions
getCandleColorIndex(barIndex) =>
    int ret = na
    if (close[barIndex] > open[barIndex])
        ret := 1
    else if (close[barIndex] < open[barIndex])
        ret := -1
    else
        ret := 0
    ret

isEngulfing(checkBearish) =>
    sizePrevCandle = close[1] - open[1]
    sizeCurrentCandle = close - open
    isCurrentLargerThanPrevious = math.abs(sizeCurrentCandle) > math.abs(sizePrevCandle)

    if checkBearish
        isGreenToRed = (getCandleColorIndex(0) < 0) and (getCandleColorIndex(1) > 0)
        isCurrentLargerThanPrevious and isGreenToRed
    else
        isRedToGreen = (getCandleColorIndex(0) > 0) and (getCandleColorIndex(1) < 0)
        isCurrentLargerThanPrevious and isRedToGreen

isBearishEngulfing() => isEngulfing(true)
isBullishEngulfing() => isEngulfing(false)

is3LSBear() =>
    is3LineSetup = (getCandleColorIndex(1) > 0) and (getCandleColorIndex(2) > 0) and (getCandleColorIndex(3) > 0)
    is3LineSetup and isBearishEngulfing()

is3LSBull() =>
    is3LineSetup = (getCandleColorIndex(1) < 0) and (getCandleColorIndex(2) < 0) and (getCandleColorIndex(3) < 0)
    is3LineSetup and isBullishEngulfing()

// Signals
is3LSBearSig = is3LSBear() and adx > adxThreshold
is3LSBullSig = is3LSBull() and adx > adxThreshold

// Take Profit and Stop Loss
longTP = close + 2 * atr
longSL = close - 1 * atr
shortTP = close - 2 * atr
shortSL = close + 1 * atr

// -----------------------------------------------------------------------------
//                          STRATEGY ENTRY PRÍKAZY
// -----------------------------------------------------------------------------
if (showBull3LS and is3LSBullSig)
    strategy.entry("3LS_Bull", strategy.long, comment="3LS Bullish")
    strategy.exit("Exit Bull", from_entry="3LS_Bull", limit=longTP, stop=longSL)

if (showBear3LS and is3LSBearSig)
    strategy.entry("3LS_Bear", strategy.short, comment="3LS Bearish")
    strategy.exit("Exit Bear", from_entry="3LS_Bear", limit=shortTP, stop=shortSL)

```

> Detail

https://www.fmz.com/strategy/482921

> Last Modified

2025-02-20 17:46:30
