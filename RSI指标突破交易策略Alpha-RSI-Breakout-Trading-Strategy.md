
> Name

RSI指标突破交易策略Alpha-RSI-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The Alpha RSI breakout trading strategy is a breakout trading strategy based on the RSI indicator. This strategy uses the RSI indicator to identify overbought and oversold conditions and combines with moving averages to determine the trend direction. It enters counter-trend trades when the RSI indicator reaches overbought or oversold levels, aiming to capture trend changes after price reversals.

## Strategy Logic

The strategy is mainly based on the following logic:

1. When RSI exceeds the overbought threshold (default 70), the asset is considered overbought and a short trade is opened.

2. When RSI crosses below the oversold threshold (default 30), the asset is considered oversold and a long trade is opened.

3. The SMA moving average is used to determine the major trend. Trades are only taken when the trend agrees with RSI signals.

Specifially, the strategy includes:  

1. Inputs for SMA period (default 200), RSI period (default 14), RSI entry level (default 34), stop loss level (default 30), take profit level (default 50).

2. Calculation of SMA and RSI values.

3. A long position is entered when RSI crosses above the entry level and close is above SMA. 

4. After opening long, the stop loss is updated to the lower of previous close.

5. The long position is closed when: a) RSI falls below stop loss; b) RSI reaches take profit; c) Close falls below stop loss.

6. Only long trades, no short.

This strategy identifies reversal points by the overbought/oversold levels of RSI and enters at opportune counter-trend moments after confirmation of the major trend's direction.

## Advantage Analysis

Compared to simple moving average strategies, this strategy has the following advantages:

1. RSI is better at identifying reversal points through overbought/oversold levels.

2. Trades are taken only when the trend agrees with RSI signals, reducing false signals. 

3. The stop loss and take profit mechanisms actively manage risks and returns.

4. The trailing stop locks in more profits as price moves favorably.

5. Simple and clear rules, easy to understand for beginners.

## Risk Analysis

The strategy also has some risks to note:

1. RSI can still give false signals. Other filters like volume may be added.

2. Fixed entry, stop loss, take profit parameters may not suit all assets and market conditions. Consider dynamic optimization.

3. Trading costs are not considered. Spread and commission affect profits. 

4. Missing shorting opportunities. Can look to add short rules.

5. Consider proper capital management rules, eg maximum risk per trade.

## Improvement Directions

Some ways the strategy can be enhanced:

1. Add other filters like volume anomalies.

2. Dynamically optimize parameters through machine learning methods.

3. Add shorting rules to catch downtrends. 

4. Consider trading costs, optimize parameters by asset specifics.

5. Add capital management module, eg per trade risk limits. 

6. Backtest optimization for parameter combinations for better efficiency.

## Summary

The RSI breakout strategy combines trend and reversal strategies. It identifies reversals while controlling risks. Although improvable for complex markets, it provides a simple reference model for quant strategy learning. With proper optimizations, it can be a profitable mechanical strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|SMA Length|
|v_input_2|14|RSI Length|
|v_input_3|34|RSI Entry Level|
|v_input_4|30|RSI Stop Loss Level|
|v_input_5|50|RSI Take Profit Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-30 00:00:00
end: 2023-10-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © abdllhatn

//@version=5
// strategy("Alpha RSI Breakout Strategy", overlay=true, initial_capital=10000, default_qty_value=100)

// Inputs
sma_length = input(200, title="SMA Length")
rsi_length = input(14, title="RSI Length")
rsi_entry = input(34, title="RSI Entry Level")
rsi_stop_loss = input(30, title="RSI Stop Loss Level")
rsi_take_profit = input(50, title="RSI Take Profit Level")

// Indicators
sma_value = ta.sma(close, sma_length)
rsi_value = ta.rsi(close, rsi_length)

var bool trailing_stop_activate = false
var float trailingStop = na
var float lastClose = na

// Conditions
longCondition = ta.crossover(rsi_value, rsi_entry) and close > sma_value
if (longCondition)
    strategy.entry("Buy", strategy.long)
    trailingStop := na
    lastClose := na
    trailing_stop_activate := false

if (strategy.position_size > 0)
    if (na(lastClose) or close < lastClose)
        lastClose := close
        trailingStop := close
    if (rsi_value >= rsi_take_profit)
        trailing_stop_activate := true

if (trailing_stop_activate and not na(trailingStop) and close < trailingStop)
    strategy.close("Buy")

if (rsi_value <= rsi_stop_loss)
    strategy.close("Buy")

if (not trailing_stop_activate and rsi_value >= rsi_take_profit)
    strategy.close("Buy")

if (trailing_stop_activate and rsi_value >= rsi_take_profit)
    strategy.close("Buy")

// Plot
plot(sma_value, color=color.red, linewidth=2)
plot(rsi_value, color=color.blue, linewidth=2)


```

> Detail

https://www.fmz.com/strategy/428619

> Last Modified

2023-10-07 15:45:07
