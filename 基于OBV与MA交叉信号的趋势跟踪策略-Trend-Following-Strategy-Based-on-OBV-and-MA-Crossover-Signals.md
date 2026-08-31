
> Name

基于OBV与MA交叉信号的趋势跟踪策略-Trend-Following-Strategy-Based-on-OBV-and-MA-Crossover-Signals

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/118f0ac2a1729385a00.png)


#### Overview
This strategy, named "OBVious MA Strategy: Trend Following Strategy Based on OBV and MA Crossover Signals", utilizes the crossover between the On Balance Volume (OBV) indicator and moving averages to generate trading signals. OBV can provide leading trend signals, and this strategy uses OBV breakouts above or below moving averages as entry and exit conditions to capture trends. By using separate entry and exit MAs, it allows for more flexible control over holding periods. Although this strategy is a simple demonstration, it showcases how to effectively use OBV for volume analysis.

#### Strategy Principles
1. Calculate the OBV indicator value: If the current closing price is higher than the previous candle, add the current volume to OBV; otherwise, subtract the volume.
2. Calculate four moving averages of OBV: long-term long entry MA, long-term long exit MA, short-term short entry MA, and short-term short exit MA.
3. Generate trading signals:
   - When OBV crosses above the long-term long entry MA and the direction filter is not set to short, open a long position.
   - When OBV crosses below the long-term long exit MA, close the long position.
   - When OBV crosses below the short-term short entry MA and the direction filter is not set to long, open a short position.
   - When OBV crosses above the short-term short exit MA, close the short position.
4. Trade management: If an opposite signal is generated, the original position will be closed before opening a new position.

#### Strategy Advantages
1. Fully utilize the leading trend signals of OBV to establish positions at the beginning of a trend.
2. Separating entry and exit MAs allows for independent optimization of entry and exit timing.
3. The code logic is simple and clear, easy to understand and improve.
4. Introducing a direction filter can avoid frequent trading and reduce costs.

#### Strategy Risks
1. Lacks other confirmation indicators, which may generate false signals. It is recommended to use it in combination with other indicators.
2. Lacks stop-loss and position management, facing the risk of amplified single-trade losses. Reasonable stop-loss and money management measures can be added.
3. Improper parameter selection will affect the strategy's performance. Parameters need to be optimized based on different market characteristics and timeframes.

#### Strategy Optimization Directions
1. Consider introducing trend filters, such as MA direction, ATR, etc., to improve signal quality.
2. Different types of MAs can be used on OBV, such as EMA, WMA, etc., to capture trends of varying speeds.
3. Optimize position management, such as using a scaling strategy to add positions when trend strength increases and reduce positions when it decreases.
4. Combine with other volume and price indicators, such as MVA, PVT, etc., to construct joint signals to improve win rates.

#### Summary
This strategy demonstrates a simple trend-following method based on OBV and MA crossovers. Its advantages are clear logic, timely trend capture, and flexible holding control through separate entry and exit MAs. However, its disadvantages include a lack of risk control measures and signal confirmation methods. Improvements can be made in areas such as trend filtering, parameter optimization, position management, and joint signals to obtain more robust strategy performance. This strategy is more suitable as a guiding signal to be used in conjunction with other strategies.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|(?Direction Filter)Direction: long|short|
|v_input_1|190|(?Moving Average Settings)Long Entry MA Length|
|v_input_2|202|Long Exit MA Length|
|v_input_3|395|Short MA Entry Length|
|v_input_4|300|Short Exit MA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-04-23 00:00:00
end: 2024-04-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ThousandX_Trader

//@version=5
strategy(title="OBVious MA Strategy [1000X]", overlay=false, 
         initial_capital=10000, margin_long=0.1, margin_short=0.1,
         default_qty_type=strategy.percent_of_equity, default_qty_value=100,
         slippage=1, commission_type=strategy.commission.percent, commission_value=0.1)

// Direction Input ///
tradeDirection = input.string("long", title="Direction", options=["long", "short"], group = "Direction Filter")

    ///////////////////////////////////////
   //  1000X OBV MA INDICATOR           //
  ///////////////////////////////////////

// OBV Trend Length Inputs //
long_entry_length = input(190, title="Long Entry MA Length", group = "Moving Average Settings")
long_exit_length = input(202, title="Long Exit MA Length", group = "Moving Average Settings")
short_entry_length = input(395, title="Short MA Entry Length", group = "Moving Average Settings")
short_exit_length = input(300, title="Short Exit MA Length", group = "Moving Average Settings")

// OBV Calculation
obv = ta.cum(ta.change(close) >= 0 ? volume : -volume)

// Calculate OBV Moving Averages
obv_ma_long_entry = ta.sma(obv, long_entry_length)
obv_ma_long_exit = ta.sma(obv, long_exit_length)
obv_ma_short_entry = ta.sma(obv, short_entry_length)
obv_ma_short_exit = ta.sma(obv, short_exit_length)

   ///////////////////////////////////////
  //         STRATEGY RULES            //
 ///////////////////////////////////////

longCondition = ta.crossover(obv, obv_ma_long_entry) and tradeDirection != "short" and strategy.position_size <= 0
longExitCondition = ta.crossunder(obv, obv_ma_long_exit)
shortCondition = ta.crossunder(obv, obv_ma_short_entry) and tradeDirection != "long" and strategy.position_size >= 0
shortExitCondition = ta.crossover(obv, obv_ma_short_exit)

  ///////////////////////////////////////
 //         ORDER EXECUTION           //
///////////////////////////////////////

// Close opposite trades before entering new ones
if (longCondition and strategy.position_size < 0)
    strategy.close("Short Entry")

if (shortCondition and strategy.position_size > 0)
    strategy.close("Long Entry")

// Enter new trades
if (longCondition)
    strategy.entry("Long Entry", strategy.long)

if (shortCondition)
    strategy.entry("Short Entry", strategy.short)

// Exit conditions
if (longExitCondition)
    strategy.close("Long Entry")

if (shortExitCondition)
    strategy.close("Short Entry")

  ///////////////////////////////////////
 //            PLOTTING               //
///////////////////////////////////////

// Plot OBV line with specified color
plot(obv, title="OBV", color=color.new(#2962FF, 0), linewidth=1)

// Conditionally plot Long MAs with specified colors based on Direction Filter
plot(tradeDirection == "long" ? obv_ma_long_entry : na, title="Long Entry MA", color=color.new(color.rgb(2, 130, 228), 0), linewidth=1)
plot(tradeDirection == "long" ? obv_ma_long_exit : na, title="Long Exit MA", color=color.new(color.rgb(106, 168, 209), 0), linewidth=1)

// Conditionally plot Short MAs with specified colors based on Direction Filter
plot(tradeDirection == "short" ? obv_ma_short_entry : na, title="Short Entry MA", color=color.new(color.rgb(163, 2, 227), 0), linewidth=1)
plot(tradeDirection == "short" ? obv_ma_short_exit : na, title="Short Exit MA", color=color.new(color.rgb(192, 119, 205), 0), linewidth=1)

```

> Detail

https://www.fmz.com/strategy/449808

> Last Modified

2024-04-29 13:48:58
