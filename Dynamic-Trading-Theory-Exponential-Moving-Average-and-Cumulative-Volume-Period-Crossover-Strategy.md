
> Name

Dynamic-Trading-Theory-Exponential-Moving-Average-and-Cumulative-Volume-Period-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16157e7468244f2f0e2.png)

[trans]
#### 概述
本策略是一个结合了指数移动平均线(EMA)和累积成交量周期(CVP)的交易系统。它通过分析价格的指数移动平均与累积成交量加权价格的交叉来捕捉市场趋势的转折点。策略内置了时间过滤器,可以限定交易时段,并且支持在交易时段结束时自动平仓。策略提供了两种不同的出场方式：反向交叉出场和自定义CVP出场,使其具有较强的灵活性和适应性。

#### 策略原理
策略的核心逻辑基于以下几个关键计算：
1. 计算平均价格(AVWP)：将最高价、最低价和收盘价的算术平均值与成交量相乘。
2. 计算累积成交量周期值：在设定的周期内累加成交量加权价格并除以累积成交量。
3. 分别计算收盘价的EMA和CVP的EMA。
4. 当价格EMA向上穿越CVP的EMA时产生做多信号；当价格EMA向下穿越CVP的EMA时产生做空信号。
5. 出场信号可以是反向交叉信号,也可以是基于自定义CVP周期的交叉信号。

#### 策略优势
1. 信号系统稳健：结合了价格趋势和成交量信息,能更准确地判断市场动向。
2. 适应性强：可以通过调整EMA周期和CVP周期来适应不同市场环境。
3. 风险管理完善：内置时间过滤器可以避免在不适合交易的时段进行操作。
4. 出场机制灵活：提供两种不同的出场方式,可以根据市场特点选择合适的出场方式。
5. 可视化效果好：策略提供了清晰的图形界面,包括信号标记和趋势区域填充。

#### 策略风险
1. 滞后性风险：EMA本身具有一定滞后性,可能导致入场和出场时机略有延迟。
2. 震荡市风险：在横盘震荡市场中可能产生虚假信号。
3. 参数敏感性：不同的参数组合可能导致策略表现差异较大。
4. 流动性风险：在低流动性市场中,CVP计算可能不够准确。
5. 时区依赖：策略使用纽约时间作为时间过滤器,需要注意不同市场的交易时间差异。

#### 策略优化方向
1. 引入波动率过滤器：可以根据市场波动率调整策略参数,提高策略的适应性。
2. 优化时间过滤器：可以添加多个时间窗口,更精细地控制交易时段。
3. 增加成交量质量评估：引入成交量分析指标,过滤低质量的成交量信号。
4. 动态参数调整：开发自适应参数系统,根据市场条件自动调整EMA和CVP周期。
5. 增加市场情绪指标：结合其他技术指标来确认交易信号。

#### 总结
这是一个结构完整、逻辑清晰的量化交易策略。通过结合EMA和CVP的优势,创造了一个既能捕捉趋势又注重风险控制的交易系统。策略的可定制性强,适合在不同的市场环境中使用。通过优化建议的实施,策略的性能还有进一步提升的空间。 ||

#### Overview
This strategy is a trading system that combines Exponential Moving Average (EMA) and Cumulative Volume Period (CVP). It captures market trend reversal points by analyzing the crossover between price EMA and cumulative volume-weighted price. The strategy includes a built-in time filter for limiting trading sessions and supports automatic position closing at the end of trading periods. It offers two different exit methods: reverse crossover exit and custom CVP exit, providing strong flexibility and adaptability.

#### Strategy Principle
The core logic of the strategy is based on the following key calculations:
1. Calculate Average Price (AVWP): Multiply the arithmetic mean of high, low, and close prices with volume.
2. Calculate Cumulative Volume Period value: Sum up volume-weighted prices over the set period and divide by cumulative volume.
3. Calculate EMA of closing price and EMA of CVP separately.
4. Generate long signals when price EMA crosses above CVP's EMA; generate short signals when price EMA crosses below CVP's EMA.
5. Exit signals can be either reverse crossover signals or signals based on custom CVP periods.

#### Strategy Advantages
1. Robust Signal System: Combines price trend and volume information for more accurate market direction judgment.
2. High Adaptability: Can adapt to different market environments by adjusting EMA and CVP periods.
3. Complete Risk Management: Built-in time filter prevents trading during unsuitable periods.
4. Flexible Exit Mechanism: Provides two different exit methods to choose based on market characteristics.
5. Good Visualization: Strategy provides clear graphical interface including signal markers and trend area filling.

#### Strategy Risks
1. Lag Risk: EMA has inherent lag, which may cause slight delays in entry and exit timing.
2. Oscillation Risk: May generate false signals in sideways markets.
3. Parameter Sensitivity: Different parameter combinations may lead to significant performance variations.
4. Liquidity Risk: CVP calculations may be inaccurate in low liquidity markets.
5. Time Zone Dependency: Strategy uses New York time for time filtering, requiring attention to different market trading hours.

#### Strategy Optimization Directions
1. Introduce Volatility Filter: Adjust strategy parameters based on market volatility to improve adaptability.
2. Optimize Time Filter: Add multiple time windows for more precise trading session control.
3. Add Volume Quality Assessment: Introduce volume analysis indicators to filter low-quality volume signals.
4. Dynamic Parameter Adjustment: Develop adaptive parameter system to automatically adjust EMA and CVP periods based on market conditions.
5. Add Market Sentiment Indicators: Combine with other technical indicators to confirm trading signals.

#### Summary
This is a quantitative trading strategy with complete structure and clear logic. By combining the advantages of EMA and CVP, it creates a trading system that can both capture trends and focus on risk control. The strategy is highly customizable and suitable for use in different market environments. Through the implementation of optimization suggestions, there is room for further performance improvement.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-04 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// © sapphire_edge 

// # ========================================================================= #
// #                  
// #        _____                   __    _              ______    __         
// #      / ___/____ _____  ____  / /_  (_)_______     / ____/___/ /___ ____ 
// #      \__ \/ __ `/ __ \/ __ \/ __ \/ / ___/ _ \   / __/ / __  / __ `/ _ \
// #     ___/ / /_/ / /_/ / /_/ / / / / / /  /  __/  / /___/ /_/ / /_/ /  __/
// #    /____/\__,_/ .___/ .___/_/ /_/_/_/   \___/  /_____/\__,_/\__, /\___/ 
// #              /_/   /_/                                     /____/       
// #                                      
// # ========================================================================= #

strategy(shorttitle="⟡Sapphire⟡ EMA/CVP", title="[Sapphire] EMA/CVP Strategy", initial_capital= 50000, currency= currency.USD,default_qty_value = 1,commission_type= strategy.commission.cash_per_contract,overlay= true )

// # ========================================================================= #
// #                       // Settings Menu //
// # ========================================================================= #

// --------------------    Main Settings    -------------------- //
groupEMACVP = "EMA / Cumulative Volume Period"
tradeDirection = input.string(title='Trade Direction', defval='LONG', options=['LONG', 'SHORT'], group=groupEMACVP)
emaLength = input.int(25, title='EMA Length', minval=1, maxval=200, group=groupEMACVP)
cumulativePeriod = input.int(100, title='Cumulative Volume Period', minval=1, maxval=200, step=5, group=groupEMACVP)
exitType = input.string(title="Exit Type", defval="Crossover", options=["Crossover", "Custom CVP" ], group=groupEMACVP)
cumulativePeriodForClose = input.int(50, title='Cumulative Period for Close Signal', minval=1, maxval=200, step=5, group=groupEMACVP)
showSignals = input.bool(true, title="Show Signals", group=groupEMACVP)
signalOffset = input.int(5, title="Signal Vertical Offset", group=groupEMACVP)

// --------------------    Time Filter Inputs    -------------------- //
groupTimeOfDayFilter = "Time of Day Filter"
useTimeFilter1  = input.bool(false, title="Enable Time Filter 1", group=groupTimeOfDayFilter)
startHour1      = input.int(0, title="Start Hour (24-hour format)", minval=0, maxval=23, group=groupTimeOfDayFilter)
startMinute1    = input.int(0, title="Start Minute", minval=0, maxval=59, group=groupTimeOfDayFilter)
endHour1        = input.int(23, title="End Hour (24-hour format)", minval=0, maxval=23, group=groupTimeOfDayFilter)
endMinute1      = input.int(45, title="End Minute", minval=0, maxval=59, group=groupTimeOfDayFilter)
closeAtEndTimeWindow = input.bool(false, title="Close Trades at End of Time Window", group=groupTimeOfDayFilter)

// --------------------    Trading Window    -------------------- //
isWithinTradingWindow(startHour, startMinute, endHour, endMinute) =>
    nyTime            = timestamp("America/New_York", year, month, dayofmonth, hour, minute)
    nyHour            = hour(nyTime)
    nyMinute          = minute(nyTime)
    timeInMinutes     = nyHour * 60 + nyMinute
    startInMinutes    = startHour * 60 + startMinute
    endInMinutes      = endHour * 60 + endMinute
    timeInMinutes    >= startInMinutes and timeInMinutes <= endInMinutes

timeCondition =  (useTimeFilter1 ? isWithinTradingWindow(startHour1, startMinute1, endHour1, endMinute1) : true)

// Check if the current bar is the last one within the specified time window
isEndOfTimeWindow() =>
    nyTime            = timestamp("America/New_York", year, month, dayofmonth, hour, minute)
    nyHour            = hour(nyTime)
    nyMinute          = minute(nyTime)
    timeInMinutes     = nyHour * 60 + nyMinute
    endInMinutes      = endHour1 * 60 + endMinute1
    timeInMinutes == endInMinutes

// Logic to close trades if the time window ends
if timeCondition and closeAtEndTimeWindow and isEndOfTimeWindow()
    strategy.close_all(comment="Closing trades at end of time window")

// # ========================================================================= #
// #                       // Calculations //
// # ========================================================================= #

avgPrice = (high + low + close) / 3
avgPriceVolume = avgPrice * volume

cumulPriceVolume = math.sum(avgPriceVolume, cumulativePeriod)
cumulVolume = math.sum(volume, cumulativePeriod)
cumValue = cumulPriceVolume / cumulVolume

cumulPriceVolumeClose = math.sum(avgPriceVolume, cumulativePeriodForClose)
cumulVolumeClose = math.sum(volume, cumulativePeriodForClose)
cumValueClose = cumulPriceVolumeClose / cumulVolumeClose

emaVal = ta.ema(close, emaLength)
emaCumValue = ta.ema(cumValue, emaLength)

// # ========================================================================= #
// #                       // Signal Logic //
// # ========================================================================= #

// Strategy Entry Conditions
longEntryCondition = ta.crossover(emaVal, emaCumValue) and tradeDirection == 'LONG'
shortEntryCondition = ta.crossunder(emaVal, emaCumValue) and tradeDirection == 'SHORT'

// User-Defined Exit Conditions
longExitCondition = false
shortExitCondition = false

if exitType == "Crossover"
    longExitCondition := ta.crossunder(emaVal, emaCumValue)
    shortExitCondition := ta.crossover(emaVal, emaCumValue)

if exitType == "Custom CVP"
    emaCumValueClose = ta.ema(cumValueClose, emaLength)
    longExitCondition := ta.crossunder(emaVal, emaCumValueClose)
    shortExitCondition := ta.crossover(emaVal, emaCumValueClose)

// # ========================================================================= #
// #                       // Strategy Management //
// # ========================================================================= #

// Strategy Execution
if longEntryCondition and timeCondition
    strategy.entry('Long', strategy.long)
    label.new(bar_index, high - signalOffset, "◭", style=label.style_label_up, color = color.rgb(119, 0, 255, 20), textcolor=color.white)

if shortEntryCondition and timeCondition
    strategy.entry('Short', strategy.short)
    label.new(bar_index, low + signalOffset, "⧩", style=label.style_label_down, color = color.rgb(255, 85, 0, 20), textcolor=color.white)

if strategy.position_size > 0 and longExitCondition
    strategy.close('Long')

if strategy.position_size < 0 and shortExitCondition
    strategy.close('Short')

// # ========================================================================= #
// #                         // Plots and Charts //
// # ========================================================================= #

plot(emaVal, title='EMA', color=color.new(color.green, 25))
plot(emaCumValue, title='Cumulative EMA', color=color.new(color.purple, 35))
fill(plot(emaVal), plot(emaCumValue), color=emaVal > emaCumValue ? #008ee6 : #d436a285, title='EMA and Cumulative Area', transp=70)

```

> Detail

https://www.fmz.com/strategy/477531

> Last Modified

2025-01-06 11:45:38
