
> Name

双均线趋势跟踪与ATR风控自适应交易策略-Dual-Moving-Average-Trend-Following-Strategy-with-ATR-Based-Risk-Management-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c624134d4e3e68577a.png)


#### Overview
This strategy combines classic dual moving average trend following with ATR-based dynamic risk management. It offers two trading modes: a basic mode using simple moving average crossovers for trend following, and an advanced mode incorporating higher timeframe trend filtering and ATR-based dynamic stop-loss mechanisms. Traders can switch between modes via a simple dropdown menu, catering to both beginners' ease of use and experienced traders' risk management needs.

#### Strategy Principles
Strategy 1 (Basic Mode) employs a 21 and 49-day dual moving average system, generating long signals when the fast MA crosses above the slow MA. Take profit targets can be set either as percentage or points, with an optional trailing stop to lock in profits. Strategy 2 (Advanced Mode) adds daily timeframe trend filtering, allowing entries only when price is above the higher timeframe moving average. It incorporates a 14-period ATR-based dynamic stop-loss that adjusts with market volatility, and includes partial profit-taking functionality to protect gains.

#### Strategy Advantages
1. Highly adaptable strategy that can flex with trader experience and market conditions
2. Multi-timeframe analysis in advanced mode improves signal quality
3. ATR-based dynamic stops adapt to varying market volatility
4. Partial profit-taking balances profit protection with trend continuation
5. Flexible parameter configuration for different market characteristics

#### Strategy Risks
1. Dual MA system may generate frequent false signals in ranging markets
2. Trend filtering may cause signal lag, missing some trading opportunities
3. ATR stops may not adjust quickly enough to volatility spikes
4. Partial profit-taking might reduce position size too early in strong trends

#### Strategy Optimization Directions
1. Add volume and volatility indicators to filter false signals
2. Consider implementing dynamic parameter adaptation based on market conditions
3. Optimize ATR calculation period to balance sensitivity and stability
4. Add market state recognition module for automatic strategy mode selection
5. Introduce more stop-loss options like trailing stops and time-based exits

#### Summary
This is a well-designed and comprehensive trading system. The combination of dual moving average trend following and ATR-based risk management ensures both reliability and effective risk control. The dual-mode design meets the needs of different trader levels, while rich parameter settings provide ample optimization opportunities. Traders are advised to start with conservative parameters in live trading and gradually optimize for best results.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-27 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © shaashish1

//@version=5
strategy("Dual Strategy Selector V2 - Cryptogyani", overlay=true, pyramiding=0, 
         default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=100000)

//#region STRATEGY SELECTION
strategyOptions = input.string(title="Select Strategy", defval="Strategy 1", options=["Strategy 1", "Strategy 2"], group="Strategy Selection")
//#endregion STRATEGY SELECTION

// ####################### STRATEGY 1: Original Logic ########################
//#region STRATEGY 1 INPUTS
s1_fastMALen = input.int(defval=21, title="Fast SMA Length (S1)", minval=1, group="Strategy 1 Settings", inline="S1 MA")
s1_slowMALen = input.int(defval=49, title="Slow SMA Length (S1)", minval=1, group="Strategy 1 Settings", inline="S1 MA")
s1_takeProfitMode = input.string(defval="Percentage", title="Take Profit Mode (S1)", options=["Percentage", "Pips"], group="Strategy 1 Settings")
s1_takeProfitPerc = input.float(defval=7.0, title="Take Profit % (S1)", minval=0.05, step=0.05, group="Strategy 1 Settings") / 100
s1_takeProfitPips = input.float(defval=50, title="Take Profit Pips (S1)", minval=1, step=1, group="Strategy 1 Settings")
s1_trailingTakeProfitEnabled = input.bool(defval=false, title="Enable Trailing (S1)", group="Strategy 1 Settings")
//#endregion STRATEGY 1 INPUTS

// ####################### STRATEGY 2: Enhanced with Recommendations ########################
//#region STRATEGY 2 INPUTS
s2_fastMALen = input.int(defval=20, title="Fast SMA Length (S2)", minval=1, group="Strategy 2 Settings", inline="S2 MA")
s2_slowMALen = input.int(defval=50, title="Slow SMA Length (S2)", minval=1, group="Strategy 2 Settings", inline="S2 MA")
s2_atrLength = input.int(defval=14, title="ATR Length (S2)", group="Strategy 2 Settings", inline="ATR")
s2_atrMultiplier = input.float(defval=1.5, title="ATR Multiplier for Stop-Loss (S2)", group="Strategy 2 Settings", inline="ATR")
s2_partialTakeProfitPerc = input.float(defval=50.0, title="Partial Take Profit % (S2)", minval=10, maxval=100, step=10, group="Strategy 2 Settings")
s2_timeframeTrend = input.timeframe(defval="1D", title="Higher Timeframe for Trend Filter (S2)", group="Strategy 2 Settings")
//#endregion STRATEGY 2 INPUTS

// ####################### GLOBAL VARIABLES ########################
var float takeProfitPrice = na
var float stopLossPrice = na
var float trailingStopPrice = na
var float fastMA = na
var float slowMA = na
var float higherTimeframeTrendMA = na
var bool validOpenLongPosition = false

// Precalculate higher timeframe values (global scope for Strategy 2)
higherTimeframeTrendMA := request.security(syminfo.tickerid, s2_timeframeTrend, ta.sma(close, s2_slowMALen))

// ####################### LOGIC ########################
if (strategyOptions == "Strategy 1")
    // Strategy 1 Logic (Original Logic Preserved)
    fastMA := ta.sma(close, s1_fastMALen)
    slowMA := ta.sma(close, s1_slowMALen)
    openLongPosition = ta.crossover(fastMA, slowMA)
    validOpenLongPosition := openLongPosition and strategy.opentrades.size(strategy.opentrades - 1) == 0
    
    // Take Profit Price
    takeProfitPrice := if (s1_takeProfitMode == "Percentage")
        close * (1 + s1_takeProfitPerc)
    else
        close + (s1_takeProfitPips * syminfo.mintick)

    // Trailing Stop Price (if enabled)
    if (strategy.position_size > 0 and s1_trailingTakeProfitEnabled)
        trailingStopPrice := high - (s1_takeProfitPips * syminfo.mintick)
    else
        trailingStopPrice := na

else if (strategyOptions == "Strategy 2")
    // Strategy 2 Logic with Recommendations
    fastMA := ta.sma(close, s2_fastMALen)
    slowMA := ta.sma(close, s2_slowMALen)
    openLongPosition = ta.crossover(fastMA, slowMA) and close > higherTimeframeTrendMA
    validOpenLongPosition := openLongPosition and strategy.opentrades.size(strategy.opentrades - 1) == 0

    // ATR-Based Stop-Loss
    atr = ta.atr(s2_atrLength)
    stopLossPrice := close - (atr * s2_atrMultiplier)

    // Partial Take Profit Logic
    takeProfitPrice := close * (1 + (s2_partialTakeProfitPerc / 100))
//#endregion STRATEGY LOGIC

// ####################### PLOTTING ########################
plot(series=fastMA, title="Fast SMA", color=color.yellow, linewidth=1)
plot(series=slowMA, title="Slow SMA", color=color.orange, linewidth=1)
plot(series=takeProfitPrice, title="Take Profit Price", color=color.teal, linewidth=1, style=plot.style_linebr)

// Trailing Stop and ATR Stop-Loss Plots (Global Scope)
plot(series=(strategyOptions == "Strategy 1" and s1_trailingTakeProfitEnabled) ? trailingStopPrice : na, title="Trailing Stop", color=color.red, linewidth=1, style=plot.style_linebr)
plot(series=(strategyOptions == "Strategy 2") ? stopLossPrice : na, title="ATR Stop-Loss", color=color.red, linewidth=1, style=plot.style_linebr)
//#endregion PLOTTING

// ####################### POSITION ORDERS ########################
//#region POSITION ORDERS
if (validOpenLongPosition)
    strategy.entry(id="Long Entry", direction=strategy.long)

if (strategyOptions == "Strategy 1")
    if (strategy.position_size > 0)
        if (s1_trailingTakeProfitEnabled)
            strategy.exit(id="Trailing Take Profit", from_entry="Long Entry", stop=trailingStopPrice)
        else
            strategy.exit(id="Take Profit", from_entry="Long Entry", limit=takeProfitPrice)

else if (strategyOptions == "Strategy 2")
    if (strategy.position_size > 0)
        strategy.exit(id="Partial Take Profit", from_entry="Long Entry", qty_percent=s2_partialTakeProfitPerc, limit=takeProfitPrice)
        strategy.exit(id="Stop Loss", from_entry="Long Entry", stop=stopLossPrice)
//#endregion POSITION ORDERS

```

> Detail

https://www.fmz.com/strategy/473350

> Last Modified

2024-11-29 14:56:43
