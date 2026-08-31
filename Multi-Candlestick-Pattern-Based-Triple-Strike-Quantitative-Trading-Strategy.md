
> Name

Multi-Candlestick-Pattern-Based-Triple-Strike-Quantitative-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8c494a5f52fe5b9c57a.png)
![IMG](https://www.fmz.com/upload/asset/2d82b4832cec020f4e22d.png)



[trans]
#### 概述
这是一个基于三重打击形态(Three Line Strike)和吞没形态(Engulfing Pattern)的量化交易策略。该策略通过识别连续三根K线形态后的突破性反转K线来捕捉市场趋势转折点,结合多重技术指标进行交易决策。策略设计了完整的信号识别系统和风险控制机制,并提供了高度可定制的参数设置。

#### 策略原理
策略的核心逻辑基于两个主要的K线形态:
1. 三重打击形态:通过识别连续三根同向K线后的反转K线来判断趋势反转。看涨形态由三根连续下跌的红K线后接一根较大的绿色吞没K线构成;看跌形态由三根连续上涨的绿K线后接一根较大的红色吞没K线构成。
2. 吞没形态:单独的大型吞没K线也作为辅助信号。策略通过计算当前K线与前一根K线的实体大小比较来识别吞没形态。

#### 策略优势
1. 信号识别精确:策略采用严格的数学计算方法判断K线形态,通过多重条件过滤来保证信号质量。
2. 风险控制完善:设置了初始资金、持仓比例等风险参数,并禁止重复入场。
3. 高度可定制:提供丰富的参数设置,可根据不同市场特点和交易需求进行优化。
4. 可视化支持:提供清晰的图形标记和提示信息,便于分析和监控。

#### 策略风险
1. 市场环境依赖:在震荡市场中可能产生过多假信号。
2. 滑点影响:大型吞没K线的入场点可能受到较大滑点影响。
3. 延迟风险:形态识别需要多根K线完成,可能错过最佳入场时机。

#### 策略优化方向
1. 引入成交量指标:结合成交量变化来过滤信号质量。
2. 优化止损设置:基于ATR或波动率动态调整止损位置。
3. 增加趋势过滤:添加均线系统判断整体趋势。
4. 完善退出机制:设计更灵活的获利了结条件。

#### 总结
该策略通过系统化的技术分析方法捕捉市场重要转折点,具有较强的理论基础和实战价值。通过参数优化和风险控制的完善,可以作为一个稳健的交易系统的重要组成部分。策略的模块化设计也为进一步优化提供了良好基础。

#### Overview
This is a quantitative trading strategy based on Three Line Strike and Engulfing patterns. The strategy captures market turning points by identifying breakthrough reversal candlesticks following three consecutive candles, combining multiple technical indicators for trading decisions. It features a complete signal detection system and risk control mechanism, with highly customizable parameter settings.

#### Strategy Principle
The core logic is based on two main candlestick patterns:
1. Three Line Strike Pattern: Identifies trend reversals through three consecutive same-direction candles followed by a reversal candle. Bullish pattern consists of three consecutive red candles followed by a large green engulfing candle; bearish pattern consists of three consecutive green candles followed by a large red engulfing candle.
2. Engulfing Pattern: Large single engulfing candles serve as auxiliary signals. The strategy identifies engulfing patterns by comparing the body size of current and previous candles.

#### Strategy Advantages
1. Precise Signal Identification: Uses strict mathematical calculations to judge candlestick patterns, ensuring signal quality through multiple condition filtering.
2. Comprehensive Risk Control: Includes risk parameters like initial capital and position sizing, with pyramiding prevention.
3. Highly Customizable: Offers rich parameter settings for optimization according to different market characteristics and trading needs.
4. Visual Support: Provides clear graphical markers and alert messages for analysis and monitoring.

#### Strategy Risks
1. Market Environment Dependency: May generate excessive false signals in ranging markets.
2. Slippage Impact: Entry points for large engulfing candles may be subject to significant slippage.
3. Delay Risk: Pattern recognition requires multiple candles, potentially missing optimal entry points.

#### Optimization Directions
1. Incorporate Volume Indicators: Filter signal quality by combining volume changes.
2. Optimize Stop Loss Settings: Dynamically adjust stop loss positions based on ATR or volatility.
3. Add Trend Filtering: Implement moving average systems to judge overall trend.
4. Improve Exit Mechanism: Design more flexible profit-taking conditions.

#### Summary
The strategy captures important market turning points through systematic technical analysis, with strong theoretical foundation and practical value. Through parameter optimization and risk control refinement, it can serve as an important component of a robust trading system. The modular design also provides a good foundation for further optimization.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-09 18:40:00
end: 2025-02-19 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

// Copyright ...
// Based on the TMA Overlay by Arty, converted to a simple strategy example.
// Pine Script v5

//@version=5
strategy(title='3 Line Strike [TTF] - Strategy',
     shorttitle='3LS Strategy [TTF]',
     overlay=true,
     initial_capital=100000,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=100,
     pyramiding=0)

// -----------------------------------------------------------------------------
//                               INPUTS
// -----------------------------------------------------------------------------

//
// ### 3 Line Strike
//
showBear3LS = input.bool(title='Show Bearish 3 Line Strike', defval=true, group='3 Line Strike',
     tooltip="Bearish 3 Line Strike (3LS-Bear) = 3 green candles followed by a large red candle (engulfing).")
showBull3LS = input.bool(title='Show Bullish 3 Line Strike', defval=true, group='3 Line Strike',
     tooltip="Bullish 3 Line Strike (3LS-Bull) = 3 red candles followed by a large green candle (engulfing).")
showMemeChars = input.bool(title="Plot 3 Line Strike meme symbols", defval=false, group="3 Line Strike")

//
//### Engulfing Candles
//
showBearEngulfing= input.bool(title='Show Bearish Big Candles', defval=false, group='Big Candles')
showBullEngulfing= input.bool(title='Show Bullish Big Candles', defval=false, group='Big Candles')

//
//### Alerts
//
void = input.bool(title="(Info) Alerts are based on detected signals.", defval=true)

// -----------------------------------------------------------------------------
//                          HELPER FUNCTIONS
// -----------------------------------------------------------------------------

// Function: Get the 'color' of the candle: -1 = red, 0 = doji, +1 = green
getCandleColorIndex(barIndex) =>
    int ret = na
    if (close[barIndex] > open[barIndex])
        ret := 1
    else if (close[barIndex] < open[barIndex])
        ret := -1
    else
        ret := 0
    ret

// Function: Check if the candle is engulfing (based on the body size of the candles)
isEngulfing(checkBearish) =>
    // Size of the previous candle
    sizePrevCandle = close[1] - open[1]
    // Size of the current candle
    sizeCurrentCandle = close - open
    isCurrentLargerThanPrevious = math.abs(sizeCurrentCandle) > math.abs(sizePrevCandle)
    
    // Bearish / Bullish division
    if checkBearish
        // Bearish engulfing: previous green, current larger red
        isGreenToRed = (getCandleColorIndex(0) < 0) and (getCandleColorIndex(1) > 0)
        isCurrentLargerThanPrevious and isGreenToRed
    else
        // Bullish engulfing: previous red, current larger green
        isRedToGreen = (getCandleColorIndex(0) > 0) and (getCandleColorIndex(1) < 0)
        isCurrentLargerThanPrevious and isRedToGreen

// Simplified calls for bullish/bearish engulfing
isBearishEngulfing() => isEngulfing(true)
isBullishEngulfing() => isEngulfing(false)

// Function: 3 consecutive candles of one color followed by the opposite engulfing candle
// 3 Line Strike - Bearish
is3LSBear() =>
    // Three consecutive green candles?
    is3LineSetup = (getCandleColorIndex(1) > 0) and (getCandleColorIndex(2) > 0) and (getCandleColorIndex(3) > 0)
    // Followed by Bearish engulfing
    is3LineSetup and isBearishEngulfing()

// 3 Line Strike - Bullish
is3LSBull() =>
    // Three consecutive red candles?
    is3LineSetup = (getCandleColorIndex(1) < 0) and (getCandleColorIndex(2) < 0) and (getCandleColorIndex(3) < 0)
    // Followed by Bullish engulfing
    is3LineSetup and isBullishEngulfing()

// -----------------------------------------------------------------------------
//                             SIGNALS
// -----------------------------------------------------------------------------

// ### 3 Line Strike
is3LSBearSig = is3LSBear()
is3LSBullSig = is3LSBull()

// Meme icons vs. standard shapes
plotchar(showBull3LS and showMemeChars ? is3LSBullSig : na, char="?", color=color.rgb(0, 255, 0, 0),
         location=location.belowbar, size=size.tiny, text='3LS-Bull', title='3 Line Strike Up (Meme Icon)', editable=false)
plotchar(showBear3LS and showMemeChars ? is3LSBearSig : na, char="?", color=color.rgb(255, 0, 0, 0),
         location=location.abovebar, size=size.tiny, text='3LS-Bear', title='3 Line Strike Down (Meme Icon)', editable=false)

plotshape(showBull3LS and not showMemeChars ? is3LSBullSig : na, style=shape.triangleup,
         color=color.green, location=location.belowbar, size=size.small, text='3LS-Bull', title='3 Line Strike Up')
plotshape(showBear3LS and not showMemeChars ? is3LSBearSig : na, style=shape.triangledown,
         color=color.red, location=location.abovebar, size=size.small, text='3LS-Bear', title='3 Line Strike Down')

// ### Engulfing Candles
isBullEngulfingSig = isBullishEngulfing()
isBearEngulfingSig = isBearishEngulfing()

plotshape(showBullEngulfing ? isBullEngulfingSig : na, style=shape.triangleup,
         location=location.belowbar, color=color.new(color.green,0), size=size.tiny, title='Big Candle Up')
plotshape(showBearEngulfing ? isBearEngulfingSig : na, style=shape.triangledown,
         location=location.abovebar, color=color.new(color.red,0), size=size.tiny, title='Big Candle Down')

// -----------------------------------------------------------------------------
//                               ALERTS
// -----------------------------------------------------------------------------

// 3LS - "Old" alertcondition + "New" alert() (based on what people use)
alertcondition(showBull3LS and is3LSBullSig, title='Bullish 3 Line Strike',
     message='{{exchange}}:{{ticker}} {{interval}} - Bullish 3 Line Strike')
alertcondition(showBear3LS and is3LSBearSig, title='Bearish 3 Line Strike',
     message='{{exchange}}:{{ticker}} {{interval}} - Bearish 3 Line Strike')

if (showBull3LS and is3LSBullSig)
    m = syminfo.tickerid + ' ' + timeframe.period + ' - Bullish 3 Line Strike'
    alert(message=str.tostring(m), freq=alert.freq_once_per_bar_close)

if (showBear3LS and is3LSBearSig)
    m = syminfo.tickerid + ' ' + timeframe.period + ' - Bearish 3 Line Strike'
    alert(message=str.tostring(m), freq=alert.freq_once_per_bar_close)

// Engulfing - "Old" alertcondition + "New" alert()
alertcondition(showBullEngulfing and isBullEngulfingSig, title='Bullish Engulfing',
     message='{{exchange}}:{{ticker}} {{interval}} - Bullish candle engulfing previous candle')
alertcondition(showBearEngulfing and isBearEngulfingSig, title='Bearish Engulfing',
     message='{{exchange}}:{{ticker}} {{interval}} - Bearish candle engulfing previous candle')

if (showBullEngulfing and isBullEngulfingSig)
    m = syminfo.tickerid + ' ' + timeframe.period + ' - Bullish candle engulfing previous candle'
    alert(message=str.tostring(m), freq=alert.freq_once_per_bar_close)

if (showBearEngulfing and isBearEngulfingSig)
    m = syminfo.tickerid + ' ' + timeframe.period + ' - Bearish candle engulfing previous candle'
    alert(message=str.tostring(m), freq=alert.freq_once_per_bar_close)

// -----------------------------------------------------------------------------
//                          STRATEGY ENTRY ORDERS
// -----------------------------------------------------------------------------
//
// Logic for entering trades. If display is enabled and a signal is detected, a trade will be entered.
//
// 3 Line Strike
if (showBull3LS and is3LSBullSig)
    strategy.entry("3LS_Bull", strategy.long, comment="3LS Bullish")

if (showBear3LS and is3LSBearSig)
    strategy.entry("3LS_Bear", strategy.short, comment="3LS Bearish")

// Engulfing
if (showBullEngulfing and isBullEngulfingSig)
    strategy.entry("BullEngulf", strategy.long, comment="Bullish Engulfing")

if (showBearEngulfing and isBearEngulfingSig)
    strategy.entry("BearEngulf", strategy.short, comment="Bearish Engulfing")

//
// End of script

```

> Detail

https://www.fmz.com/strategy/483050

> Last Modified

2025-02-27 17:12:20
