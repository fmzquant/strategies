
> Name

Adaptive-Fibonacci-Bollinger-Bands-Strategy-Analysis

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10a4b218df3c7e48197.png)

[trans]
#### 概述
本策略是一个结合了斐波那契序列和布林带的创新交易系统。它通过将传统布林带的标准差倍数替换为斐波那契比率(1.618、2.618、4.236),形成了一个独特的价格波动区间判断系统。策略包含了完整的交易管理功能,包括止盈止损设置和交易时间窗口过滤,使其具有较强的实用性和灵活性。

#### 策略原理
策略的核心逻辑基于价格与斐波那契布林带的交互关系。首先计算价格的简单移动平均线(SMA)作为中轨,然后利用ATR乘以不同的斐波那契比率形成上下轨。当价格突破用户选定的斐波那契带位时,系统会产生交易信号。具体来说,当最低价低于目标买入带且最高价高于该带位时触发做多信号;当最低价低于目标卖出带且最高价高于该带位时触发做空信号。

#### 策略优势
1. 自适应性强: 通过ATR动态调整带宽,使策略能更好地适应不同市场环境
2. 灵活性高: 用户可以根据交易风格选择不同的斐波那契带位作为交易信号
3. 风险管理完善: 内置止盈止损和时间过滤功能,有效控制风险
4. 视觉直观: 通过不同透明度的带区显示,便于交易者理解市场结构
5. 计算逻辑清晰: 使用经典技术指标组合,易于理解和维护

#### 策略风险
1. 假突破风险: 价格可能在突破后立即回落,产生虚假信号
2. 参数敏感性: 不同的斐波那契比率选择会显著影响策略表现
3. 时间依赖性: 如果启用交易时间窗口,可能错过重要的交易机会
4. 市场环境依赖: 在震荡市场中可能产生过多交易信号

#### 策略优化方向
1. 信号确认机制: 建议添加成交量或动量指标作为突破确认
2. 动态参数优化: 可以根据市场波动率自动调整斐波那契比率
3. 市场环境过滤: 增加趋势判断功能,在不同市场环境下使用不同的参数
4. 信号权重系统: 建立多重时间框架分析,提高信号可靠性
5. 仓位管理优化: 根据市场波动性和信号强度动态调整仓位大小

#### 总结
这是一个将经典技术分析工具创新组合的策略,通过斐波那契序列优化了传统布林带策略。其主要优势在于自适应性和灵活性,但使用时需要注意参数选择和市场环境的匹配度。通过添加额外的确认指标和优化信号生成机制,该策略还有较大的改进空间。

||

#### Overview
This strategy is an innovative trading system combining Fibonacci sequence and Bollinger Bands. It replaces traditional Bollinger Bands' standard deviation multipliers with Fibonacci ratios (1.618, 2.618, 4.236), creating a unique price volatility assessment system. The strategy includes comprehensive trade management features, including stop-loss/take-profit settings and trading time window filters, making it highly practical and flexible.

#### Strategy Principle
The core logic is based on price interactions with Fibonacci Bollinger Bands. It first calculates a Simple Moving Average (SMA) as the middle band, then uses ATR multiplied by different Fibonacci ratios to form upper and lower bands. Trading signals are generated when price breaks through user-selected Fibonacci bands. Specifically, a long signal is triggered when the low price is below and high price is above the target buy band; a short signal is triggered when the low price is below and high price is above the target sell band.

#### Strategy Advantages
1. Strong Adaptability: Dynamically adjusts band width through ATR, better adapting to different market conditions
2. High Flexibility: Users can choose different Fibonacci bands as trading signals based on their trading style
3. Comprehensive Risk Management: Built-in take-profit/stop-loss and time filtering functions effectively control risk
4. Visual Intuitiveness: Different transparency levels of band areas help traders understand market structure
5. Clear Calculation Logic: Uses classic technical indicator combinations, easy to understand and maintain

#### Strategy Risks
1. False Breakout Risk: Price may immediately retrace after breakout, generating false signals
2. Parameter Sensitivity: Different Fibonacci ratio choices significantly affect strategy performance
3. Time Dependency: When trading window is enabled, might miss important trading opportunities
4. Market Environment Dependency: May generate excessive signals in ranging markets

#### Strategy Optimization Directions
1. Signal Confirmation Mechanism: Suggest adding volume or momentum indicators for breakout confirmation
2. Dynamic Parameter Optimization: Automatically adjust Fibonacci ratios based on market volatility
3. Market Environment Filtering: Add trend identification functionality, use different parameters in different market conditions
4. Signal Weighting System: Establish multi-timeframe analysis to improve signal reliability
5. Position Management Optimization: Dynamically adjust position size based on market volatility and signal strength

#### Summary
This strategy innovatively combines classic technical analysis tools by optimizing traditional Bollinger Bands with Fibonacci sequence. Its main advantages lie in adaptability and flexibility, but attention must be paid to parameter selection and market environment compatibility. The strategy has significant improvement potential through adding additional confirmation indicators and optimizing signal generation mechanisms.[/trans]



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

strategy(shorttitle="⟡Sapphire⟡ FiboBands Strategy", title="[Sapphire] Fibonacci Bollinger Bands Strategy", initial_capital= 50000, currency= currency.USD,default_qty_value = 1,commission_type= strategy.commission.cash_per_contract,overlay= true )

// # ========================================================================= #
// #                       // Settings Menu //
// # ========================================================================= #

// --------------------    Main Settings    -------------------- //
groupFiboBands = "FiboBands"
length = input.int(20, minval = 1, title = 'Length', group=groupFiboBands)
src = input(close, title = 'Source', group=groupFiboBands)
offset = input.int(0, 'Offset', minval = -500, maxval = 500, group=groupFiboBands)

fibo1 = input(defval = 1.618, title = 'Fibonacci Ratio 1', group=groupFiboBands)
fibo2 = input(defval = 2.618, title = 'Fibonacci Ratio 2', group=groupFiboBands)
fibo3 = input(defval = 4.236, title = 'Fibonacci Ratio 3', group=groupFiboBands)

fiboBuy = input.string(options = ['Fibo 1', 'Fibo 2', 'Fibo 3'], defval = 'Fibo 1', title = 'Fibonacci Buy', group=groupFiboBands)
fiboSell = input.string(options = ['Fibo 1', 'Fibo 2', 'Fibo 3'], defval = 'Fibo 1', title = 'Fibonacci Sell', group=groupFiboBands)

showSignals = input.bool(true, title="Show Signals", group=groupFiboBands)
signalOffset = input.int(5, title="Signal Vertical Offset", group=groupFiboBands)

// --------------------    Trade Management Inputs    -------------------- //
groupTradeManagement = "Trade Management"
useProfitPerc    = input.bool(false, title="Enable Profit Target", group=groupTradeManagement)
takeProfitPerc  = input.float(1.0, title="Take Profit (%)", step=0.1, group=groupTradeManagement)
useStopLossPerc    = input.bool(false, title="Enable Stop Loss", group=groupTradeManagement)
stopLossPerc    = input.float(1.0, title="Stop Loss (%)", step=0.1, group=groupTradeManagement)

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

sma = ta.sma(src, length)
atr = ta.atr(length)

ratio1 = atr * fibo1
ratio2 = atr * fibo2
ratio3 = atr * fibo3

upper3 = sma + ratio3
upper2 = sma + ratio2
upper1 = sma + ratio1

lower1 = sma - ratio1
lower2 = sma - ratio2
lower3 = sma - ratio3

// # ========================================================================= #
// #                       // Signal Logic //
// # ========================================================================= #

// --------------------    Entry Logic    -------------------- //
targetBuy = fiboBuy == 'Fibo 1' ? upper1 : fiboBuy == 'Fibo 2' ? upper2 : upper3
buy = low < targetBuy and high > targetBuy

// --------------------    User-Defined Exit Logic    -------------------- //
targetSell = fiboSell == 'Fibo 1' ? lower1 : fiboSell == 'Fibo 2' ? lower2 : lower3
sell = low < targetSell and high > targetSell

// # ========================================================================= #
// #                       // Strategy Management //
// # ========================================================================= #

// --------------------    Trade Execution Flags    -------------------- //
var bool buyExecuted = false
var bool sellExecuted = false

float labelOffset = ta.atr(14) * signalOffset

// --------------------    Buy Logic    -------------------- //
if buy and timeCondition 
    if useProfitPerc or useStopLossPerc
        strategy.entry("Buy", strategy.long, stop=(useStopLossPerc ? close * (1 - stopLossPerc / 100) : na), limit=(useProfitPerc ? close * (1 + takeProfitPerc / 100) : na))
    else
        strategy.entry("Buy", strategy.long)

    if showSignals and not buyExecuted
        buyExecuted := true  
        sellExecuted := false  
        label.new(bar_index, high - labelOffset, "◭", style=label.style_label_up, color = color.rgb(119, 0, 255, 20), textcolor=color.white)

// --------------------    Sell Logic    -------------------- //
if sell and timeCondition
    if useProfitPerc or useStopLossPerc
        strategy.entry("Sell", strategy.short, stop=(useStopLossPerc ? close * (1 + stopLossPerc / 100) : na), limit=(useProfitPerc ? close * (1 - takeProfitPerc / 100) : na))
    else
        strategy.entry("Sell", strategy.short)

    if showSignals and not sellExecuted
        sellExecuted := true 
        buyExecuted := false  
        label.new(bar_index, low + labelOffset, "⧩", style=label.style_label_down, color = color.rgb(255, 85, 0, 20), textcolor=color.white)



// # ========================================================================= #
// #                         // Plots and Charts //
// # ========================================================================= #

plot(sma, style = plot.style_line, title = 'Basis', color = color.new(color.orange, 0), linewidth = 2, offset = offset)

upp3 = plot(upper3, title = 'Upper 3', color = color.new(color.teal, 90), offset = offset)
upp2 = plot(upper2, title = 'Upper 2', color = color.new(color.teal, 60), offset = offset)
upp1 = plot(upper1, title = 'Upper 1', color = color.new(color.teal, 30), offset = offset)

low1 = plot(lower1, title = 'Lower 1', color = color.new(color.teal, 30), offset = offset)
low2 = plot(lower2, title = 'Lower 2', color = color.new(color.teal, 60), offset = offset)
low3 = plot(lower3, title = 'Lower 3', color = color.new(color.teal, 90), offset = offset)

fill(upp3, low3, title = 'Background', color = color.new(color.teal, 95))

```

> Detail

https://www.fmz.com/strategy/477607

> Last Modified

2025-01-06 16:41:48
