
> Name

Dynamic-Three-Line-Strike-Trading-Strategy-with-ATR-and-ADX-Integration

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d84f913db8367946bf08.png)
![IMG](https://www.fmz.com/upload/asset/2d972f7b1f3f0a0bdc3c5.png)



[trans]
#### 概述
该策略是一个基于经典三线突破形态的高级交易系统,通过整合ADX趋势确认指标和ATR动态止盈止损机制,提供了一个完整的交易解决方案。策略核心是识别三根连续同向K线后的突破形态,并结合趋势强度确认,实现精准的交易信号生成。

#### 策略原理
策略运作基于三个核心机制:首先是识别经典的三线突破形态,包括看涨形态(三根连续阴线后的阳线突破)和看跌形态(三根连续阳线后的阴线突破);其次使用ADX(平均趋向指标)进行趋势强度过滤,只有当ADX值超过设定阈值时才确认信号;最后利用ATR(真实波幅)动态计算止盈止损位置,实现风险管理的自适应性。策略在技术上通过精确的K线颜色判定和突破力度验证来保证信号质量。

#### 策略优势
1. 信号确认机制完善：通过组合多重技术指标(K线形态、ADX、ATR)提高信号可靠性
2. 风险管理智能化：基于ATR的动态止盈止损设置,能够根据市场波动性自动调整
3. 高度可定制性：提供多个关键参数的调整选项,包括ADX阈值、ATR周期等
4. 趋势跟踪增强：ADX过滤确保只在强趋势环境下入场
5. 代码结构清晰：模块化设计便于维护和扩展

#### 策略风险
1. 形态识别延迟：三线突破形态的确认需要四根K线完成,可能造成入场时机滞后
2. 假突破风险：在震荡市场中可能出现虚假突破信号
3. ADX滞后性：作为趋势确认指标,ADX本身具有一定滞后性
4. 止损幅度考量：基于ATR的止损设置在剧烈波动时可能过大或过小
5. 市场环境依赖：策略在趋势明显的市场表现更好,震荡市场效果可能欠佳

#### 策略优化方向
1. 信号过滤增强：可以添加成交量确认机制,提高信号可靠性
2. 动态参数优化：引入自适应机制动态调整ADX阈值和ATR周期
3. 入场时机优化：可以结合价格结构(支撑位/阻力位)优化入场点位
4. 仓位管理完善：增加基于波动率的动态仓位管理机制
5. 市场环境识别：添加市场环境分类逻辑,在不同市场条件下使用不同参数设置

#### 总结
这个策略通过将经典的三线突破形态与现代技术指标相结合,创造了一个兼具理论基础和实用性的交易系统。其核心优势在于多重信号确认机制和智能化风险管理,但使用时需要注意市场环境的适配性和参数优化问题。通过建议的优化方向,策略还有进一步提升的空间。 || 

#### Overview
This strategy is an advanced trading system based on the classic Three-Line Strike pattern, incorporating ADX trend confirmation and ATR-based dynamic stop-loss/take-profit mechanisms to provide a comprehensive trading solution. The core strategy identifies breakthrough patterns following three consecutive candlesticks in the same direction, combined with trend strength confirmation for precise signal generation.

#### Strategy Principles
The strategy operates on three core mechanisms: First, it identifies classic Three-Line Strike patterns, including bullish patterns (breakout after three consecutive red candles) and bearish patterns (breakout after three consecutive green candles); second, it uses ADX (Average Directional Index) for trend strength filtering, confirming signals only when ADX exceeds a set threshold; finally, it utilizes ATR (Average True Range) to dynamically calculate stop-loss and take-profit levels, achieving adaptive risk management. Technically, the strategy ensures signal quality through precise candlestick color determination and breakout strength verification.

#### Strategy Advantages
1. Comprehensive Signal Confirmation: Combines multiple technical indicators (candlestick patterns, ADX, ATR) to enhance signal reliability
2. Intelligent Risk Management: Dynamic stop-loss and take-profit settings based on ATR, automatically adjusting to market volatility
3. High Customizability: Offers adjustment options for multiple key parameters, including ADX threshold and ATR period
4. Enhanced Trend Following: ADX filtering ensures entry only in strong trend environments
5. Clear Code Structure: Modular design facilitates maintenance and expansion

#### Strategy Risks
1. Pattern Recognition Delay: Three-Line Strike pattern confirmation requires four candles, potentially causing delayed entry
2. False Breakout Risk: False breakout signals may occur in choppy markets
3. ADX Lag: As a trend confirmation indicator, ADX inherently has some lag
4. Stop-Loss Consideration: ATR-based stop-loss settings may be too wide or narrow during extreme volatility
5. Market Environment Dependency: Strategy performs better in trending markets, may underperform in ranging conditions

#### Strategy Optimization Directions
1. Enhanced Signal Filtering: Add volume confirmation mechanism to improve signal reliability
2. Dynamic Parameter Optimization: Introduce adaptive mechanisms for dynamic adjustment of ADX threshold and ATR period
3. Entry Timing Optimization: Incorporate price structure (support/resistance levels) to optimize entry points
4. Position Management Improvement: Add volatility-based dynamic position sizing mechanism
5. Market Environment Recognition: Add market condition classification logic to use different parameter settings in different market conditions

#### Summary
This strategy creates a trading system combining theoretical foundation and practicality by integrating the classic Three-Line Strike pattern with modern technical indicators. Its core strengths lie in multiple signal confirmation mechanisms and intelligent risk management, though attention must be paid to market environment compatibility and parameter optimization. Through the suggested optimization directions, the strategy has room for further improvement.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-08-05 00:00:00
end: 2024-12-24 00:00:00
period: 5h
basePeriod: 5h
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

https://www.fmz.com/strategy/483019

> Last Modified

2025-02-27 17:20:50
