
> Name

Dynamic-Signal-Line-Trend-Following-and-Volatility-Filtering-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a2cebd19fd0194f7ac.png)

[trans]
#### 概述
本策略是一个结合了动态信号线(DSL)、波动率和动量指标的综合交易系统。该策略通过动态阈值和自适应波动带的方式,有效识别市场趋势,并利用动量指标进行信号过滤,实现精准的交易时机把握。系统设计了完整的风险管理机制,包括动态止损和基于风险收益比的获利目标设定。

#### 策略原理
策略的核心逻辑建立在三个主要组件之上:

首先是动态信号线系统,通过计算基于移动平均线的动态上下轨道线。这些轨道线会根据市场近期高点和低点自动调整位置,实现对趋势的自适应跟踪。系统还结合ATR指标构建了动态波动带,用于确认趋势强度和设置止损位置。

其次是动量分析系统,使用了经过零延迟指数移动平均(ZLEMA)优化的RSI指标。通过对RSI施加动态信号线概念,系统能够更准确地识别超买超卖区域,并产生动量突破信号。

第三是信号整合机制。交易信号必须同时满足趋势确认和动量突破两个条件才会触发。多头入场要求价格突破上轨且维持在轨道上方,同时RSI突破下方动态信号线。空头信号则需相反条件同时满足。

#### 策略优势
1. 自适应性强:动态信号线和波动带会根据市场状况自动调整,使策略能够适应不同的市场环境。
2. 虚假信号过滤:通过要求趋势和动量的双重确认,显著降低了虚假信号的概率。
3. 风险管理完善:集成了基于ATR的动态止损和基于风险收益比的获利目标设定,实现了系统化的风险控制。
4. 灵活可定制:策略参数可根据不同市场和时间周期进行优化调整。

#### 策略风险
1. 趋势反转风险:在剧烈的市场反转中,动态信号线的调整可能不够及时,导致较大回撤。
2. 振荡市场风险:在区间震荡市场中,频繁的突破可能导致多次止损。
3. 参数敏感性:策略表现对参数设置较为敏感,不当的参数可能影响策略效果。

#### 策略优化方向
1. 市场环境识别:可添加市场环境分类机制,在不同市场状态下使用不同的参数设置。
2. 动态参数优化:引入自适应参数调整机制,根据市场波动性自动优化信号线和波动带参数。
3. 多时间周期分析:整合多个时间周期的信号,提高交易决策的可靠性。
4. 波动率适应:在高波动率期间调整止损幅度和风险收益比,提高策略的风险调整后收益。

#### 总结
本策略通过动态信号线和动量指标的创新组合,实现了对市场趋势的有效捕捉。完善的风险管理机制和信号过滤系统使其具有较强的实战应用价值。通过持续优化和参数调整,策略有望在不同市场环境下保持稳定表现。虽然存在一定的风险点,但通过合理的参数设置和风险控制措施,这些风险是可控的。 || 

#### Overview
This strategy is a comprehensive trading system that combines Dynamic Signal Lines (DSL), volatility, and momentum indicators. It effectively identifies market trends through dynamic thresholds and adaptive volatility bands, while using momentum indicators for signal filtering to achieve precise trade timing. The system incorporates a complete risk management mechanism, including dynamic stop-loss and profit targets based on risk-reward ratios.

#### Strategy Principles
The core logic is built on three main components:

First, the Dynamic Signal Line system calculates dynamic upper and lower channel lines based on moving averages. These channel lines automatically adjust their position based on recent market highs and lows, achieving adaptive trend tracking. The system also incorporates ATR-based dynamic volatility bands to confirm trend strength and set stop-loss positions.

Second, the momentum analysis system uses an RSI indicator optimized with Zero-Lag Exponential Moving Average (ZLEMA). By applying the dynamic signal line concept to RSI, the system can more accurately identify overbought and oversold regions and generate momentum breakthrough signals.

Third, the signal integration mechanism. Trade signals must simultaneously satisfy both trend confirmation and momentum breakthrough conditions to trigger. Long entry requires price breakthrough above the upper band and maintenance above the channel, while RSI breaks through the lower dynamic signal line. Short signals require the opposite conditions to be met simultaneously.

#### Strategy Advantages
1. Strong Adaptability: Dynamic signal lines and volatility bands automatically adjust to market conditions, enabling the strategy to adapt to different market environments.
2. False Signal Filtering: By requiring dual confirmation of trend and momentum, significantly reduces the probability of false signals.
3. Comprehensive Risk Management: Integrates ATR-based dynamic stop-loss and profit targets based on risk-reward ratios, achieving systematic risk control.
4. Flexible Customization: Strategy parameters can be optimized for different markets and time periods.

#### Strategy Risks
1. Trend Reversal Risk: During severe market reversals, dynamic signal line adjustments may not be timely enough, leading to larger drawdowns.
2. Range-Bound Market Risk: In range-bound markets, frequent breakouts may result in multiple stop-losses.
3. Parameter Sensitivity: Strategy performance is sensitive to parameter settings, improper parameters may affect strategy effectiveness.

#### Strategy Optimization Directions
1. Market Environment Recognition: Add market environment classification mechanism to use different parameter settings in different market states.
2. Dynamic Parameter Optimization: Introduce adaptive parameter adjustment mechanism to automatically optimize signal line and volatility band parameters based on market volatility.
3. Multiple Timeframe Analysis: Integrate signals from multiple timeframes to improve trading decision reliability.
4. Volatility Adaptation: Adjust stop-loss ranges and risk-reward ratios during high volatility periods to improve risk-adjusted returns.

#### Conclusion
This strategy achieves effective market trend capture through innovative combination of dynamic signal lines and momentum indicators. The comprehensive risk management mechanism and signal filtering system give it strong practical application value. Through continuous optimization and parameter adjustment, the strategy can maintain stable performance in different market environments. While certain risk points exist, they are controllable through reasonable parameter settings and risk control measures.
[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-10-01 00:00:00
end: 2024-10-31 23:59:59
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © DailyPanda

//@version=5
strategy("DSL Strategy [DailyPanda]",
     initial_capital = 2000,
     commission_value=0.00,
     slippage=3,
     overlay = true)

//--------------------------------------------------------------------------------------------------------------------
// USER INPUTS
//--------------------------------------------------------------------------------------------------------------------

// DSL Indicator Inputs CP
int   len         = input.int(34, "Length", group="CP")      // Length for calculating DSL
int   offset      = input.int(30, "Offset", group="CP")      // Offset for threshold levels
float width       = input.float(1, "Bands Width", step = 0.1, maxval = 2, minval = 0.5, group="CP") // Width for ATR-based bands
float risk_reward = input.float(1.5, "Risk Reward", group="Risk Mgmt") // Risk Reward ratio

// Colors for upper and lower trends
color upper_col = input.color(color.lime, "+", inline = "col")
color lower_col = input.color(color.orange, "-", inline = "col")

// DSL-BELUGA
len_beluga  = input.int(10, "Beluga Length", group="BELUGA")
dsl_mode_inp = input.string("Fast", "DSL Lines Mode", options=["Fast", "Slow"], group="BELUGA")
dsl_mode    = dsl_mode_inp == "Fast" ? 2 : 1

// Colors for DSL-BELUGA
color color_up = #8BD8BD
color color_dn = #436cd3

i_lossPct = input.int(defval=100, title="% max day DD", minval=1, maxval=100, step=1, group="Risk Management")
i_goal = input.bool(title="Enable Daily Goal", defval=false, group="Risk Management")
i_goalPct = input.int(defval=4, title="% Daily Goal", minval=1, step=1, group="Risk Management")


//############################## RISK MANAGEMENT ##############################
// Set maximum intraday loss to our lossPct input
// strategy.risk.max_intraday_loss(i_lossPct, strategy.percent_of_equity)
//strategy.risk.max_intraday_loss(value=1200, type=strategy.cash)

// Store equity value from the beginning of the day
eqFromDayStart = ta.valuewhen(ta.change(dayofweek) > 0, strategy.equity, 0)
// Calculate change of the current equity from the beginning of the current day
eqChgPct = 100 * ((strategy.equity - eqFromDayStart - strategy.openprofit) / (strategy.equity-strategy.openprofit))
f_stopGain = eqChgPct >= i_goalPct and i_goal ? true : false


//--------------------------------------------------------------------------------------------------------------------
// INDICATOR CALCULATIONS
//--------------------------------------------------------------------------------------------------------------------

// Function to calculate DSL lines based on price
dsl_price(float price, int len) =>
    // Initialize DSL lines
    float dsl_up = na
    float dsl_dn = na
    float sma    = ta.sma(price, len)

    // Dynamic upper and lower thresholds calculated with offset
    float threshold_up = ta.highest(len)[offset] 
    float threshold_dn = ta.lowest(len)[offset] 

    // Calculate the DSL upper and lower lines based on price compared to the thresholds
    dsl_up := price > threshold_up ? sma : nz(dsl_up[1]) 
    dsl_dn := price < threshold_dn ? sma : nz(dsl_dn[1])

    // Return both DSL lines
    [dsl_up, dsl_dn]

// Function to calculate DSL bands based on ATR and width multiplier
dsl_bands(float dsl_up, float dsl_dn) =>
    float atr = ta.atr(200) * width // ATR-based calculation for bands
    float upper = dsl_up - atr       // Upper DSL band
    float lower = dsl_dn + atr       // Lower DSL band

    [upper, lower]

// Get DSL values based on the closing price
[dsl_up, dsl_dn] = dsl_price(close, len)

// Calculate the bands around the DSL lines
[dsl_up1, dsl_dn1] = dsl_bands(dsl_up, dsl_dn)


//--------------------------------------------------------------------------------------------------------------------
// DSL-BELUGA INDICATOR CALCULATIONS
//--------------------------------------------------------------------------------------------------------------------

// Calculate RSI with a period of 10
float RSI = ta.rsi(close, 10)

// Zero-Lag Exponential Moving Average function
zlema(src, length) =>
    int   lag      = math.floor((length - 1) / 2)
    float ema_data = 2 * src - src[lag]
    float ema2     = ta.ema(ema_data, length)
    ema2

// Discontinued Signal Lines function
dsl_lines(src, length)=>
    float up  = 0.
    float dn  = 0.
    up := (src > ta.sma(src, length)) ? nz(up[1]) + dsl_mode / length * (src - nz(up[1])) : nz(up[1])  
    dn := (src < ta.sma(src, length)) ? nz(dn[1]) + dsl_mode / length * (src - nz(dn[1])) : nz(dn[1])
    [up, dn]

// Calculate DSL lines for RSI
[lvlu, lvld] = dsl_lines(RSI, len_beluga)

// Calculate DSL oscillator using ZLEMA of the average of upper and lower DSL Lines
float dsl_osc = zlema((lvlu + lvld) / 2, 10)

// Calculate DSL Lines for the oscillator
[level_up, level_dn] = dsl_lines(dsl_osc, 10)

// Detect crossovers for signal generation
bool up_signal = ta.crossover(dsl_osc, level_dn) and dsl_osc < 55
bool dn_signal = ta.crossunder(dsl_osc, level_up) and dsl_osc > 50

//--------------------------------------------------------------------------------------------------------------------
// VISUALIZATION
//--------------------------------------------------------------------------------------------------------------------

// Plot the DSL lines on the chart
plot_dsl_up = plot(dsl_up, color=color.new(upper_col, 80), linewidth=1, title="DSL Up")
plot_dsl_dn = plot(dsl_dn, color=color.new(lower_col, 80), linewidth=1, title="DSL Down")

// Plot the DSL bands
plot_dsl_up1 = plot(dsl_up1, color=color.new(upper_col, 80), linewidth=1, title="DSL Upper Band")
plot_dsl_dn1 = plot(dsl_dn1, color=color.new(lower_col, 80), linewidth=1, title="DSL Lower Band")

// Fill the space between the DSL lines and bands with color
fill(plot_dsl_up, plot_dsl_up1, color=color.new(upper_col, 80))
fill(plot_dsl_dn, plot_dsl_dn1, color=color.new(lower_col, 80))

// Plot signals on the chart
plotshape(up_signal, title="Buy Signal", style=shape.triangleup, location=location.belowbar, size=size.tiny, text="Enter")
plotshape(dn_signal, title="Sell Signal", style=shape.triangledown, location=location.abovebar, size=size.tiny, text="Exit")

// Color the background on signal occurrences
bgcolor(up_signal ? color.new(color_up, 90) : na, title="Up Signal Background", editable = false)
bgcolor(dn_signal ? color.new(color_dn, 90) : na, title="Down Signal Background", editable = false)

//--------------------------------------------------------------------------------------------------------------------
// STRATEGY CONDITIONS AND EXECUTION
//--------------------------------------------------------------------------------------------------------------------

// Variables to hold stop loss and take profit prices
var float long_stop_loss_price  = na
var float long_take_profit_price = na
var float short_stop_loss_price = na
var float short_take_profit_price = na
float pos_size = math.abs(strategy.position_size)

// Long Entry Conditions
bool long_condition1 = not na(dsl_up1) and not na(dsl_dn) and dsl_up1 > dsl_dn
bool long_condition2 = open > dsl_up and close > dsl_up and open[1] > dsl_up and close[1] > dsl_up and open[2] > dsl_up and close[2] > dsl_up
bool long_condition3 = up_signal and pos_size == 0
bool long_condition  = long_condition1 and long_condition2 and long_condition3 and (not f_stopGain)

// Short Entry Conditions
bool short_condition1 = not na(dsl_dn1) and not na(dsl_up) and dsl_dn < dsl_up1
bool short_condition2 = open < dsl_dn1 and close < dsl_dn1 and open[1] < dsl_dn1 and close[1] < dsl_dn1 and open[2] < dsl_dn1 and close[2] < dsl_dn1
bool short_condition3 = dn_signal and pos_size == 0
bool short_condition  = short_condition1 and short_condition2 and short_condition3 and (not f_stopGain)

// Long Trade Execution
if (long_condition and not na(dsl_up1))
    long_stop_loss_price := dsl_up1
    float risk = close - long_stop_loss_price
    if (risk > 0)
        long_take_profit_price := close + risk * risk_reward
        strategy.entry("Long", strategy.long)
        strategy.exit("Exit Long", from_entry="Long", stop=long_stop_loss_price, limit=long_take_profit_price)
else if (strategy.position_size <= 0)
    // Reset when not in a long position
    long_stop_loss_price  := na
    long_take_profit_price := na

// Short Trade Execution
if (short_condition and not na(dsl_dn1))
    short_stop_loss_price := dsl_dn1
    float risk = short_stop_loss_price - close
    if (risk > 0)
        short_take_profit_price := close - risk * risk_reward
        strategy.entry("Short", strategy.short)
        strategy.exit("Exit Short", from_entry="Short", stop=short_stop_loss_price, limit=short_take_profit_price)
else if (strategy.position_size >= 0)
    // Reset when not in a short position
    short_stop_loss_price := na
    short_take_profit_price := na

//--------------------------------------------------------------------------------------------------------------------
// PLOTTING STOP LOSS AND TAKE PROFIT LEVELS
//--------------------------------------------------------------------------------------------------------------------

// Plot the stop loss and take profit levels only when in a position
float plot_long_stop_loss   = strategy.position_size > 0 ? long_stop_loss_price : na
float plot_long_take_profit = strategy.position_size > 0 ? long_take_profit_price : na

float plot_short_stop_loss   = strategy.position_size < 0 ? short_stop_loss_price : na
float plot_short_take_profit = strategy.position_size < 0 ? short_take_profit_price : na

plot(plot_long_stop_loss, title="Long Stop Loss", color=color.red, linewidth=2, style=plot.style_linebr, editable=false)
plot(plot_long_take_profit, title="Long Take Profit", color=color.green, linewidth=2, style=plot.style_linebr, editable=false)

plot(plot_short_stop_loss, title="Short Stop Loss", color=color.red, linewidth=2, style=plot.style_linebr, editable=false)
plot(plot_short_take_profit, title="Short Take Profit", color=color.green, linewidth=2, style=plot.style_linebr, editable=false)

```

> Detail

https://www.fmz.com/strategy/473410

> Last Modified

2024-11-29 17:02:33
