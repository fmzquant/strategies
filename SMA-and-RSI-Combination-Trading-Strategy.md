
> Name

SMA-and-RSI-Combination-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy is based on Simple Moving Average (SMA) and Relative Strength Index (RSI) indicators. It goes short when RSI crosses above a defined entry level and closing price is below SMA, with trailing stop loss or RSI triggered stop loss. The strategy combines trend following and overbought/oversold indicators, aiming to capture reversal opportunities in medium-term timeframe.

## Strategy Logic

1. Use SMA (200 periods) to determine the overall trend direction. Look for shorting opportunity when price is below SMA.

2. Use RSI (14 periods) to identify overbought/oversold conditions. RSI crossing above 51 signals increasing selling momentum, allowing entry for short.

3. After opening short position, set trailing stop loss at the lowest closing price. If RSI crosses above 54 or below 32, close position. 

4. There are three types of stop loss: price stop, RSI stop and profit stop.

## Strengths

1. Combining trend following and overbought/oversold indicators improves timing accuracy for entries.

2. Trailing stop loss can protect profits according to real-time price change, avoiding rigid stop loss.

3. RSI two-way trigger helps locking in profits and preventing excessive pullback losses.

4. Using simple indicators with fixed parameters makes it easy to implement for medium-term trading.

## Risks

1. SMA and RSI parameters may not suit all products and timeframes, requiring optimization.

2. Trading costs like slippage and commissions are ignored, impacting actual PnL.

3. Other factors like volume and market structure are not considered, leading to unreliable signals.

4. Overly relying on indicators and ignoring price action itself may miss reversal timing. 

5. Stop loss method is relatively rigid, unable to adapt to huge market changes.

## Improvement 

1. Test and optimize SMA period and RSI parameters to find best combination.

2. Consider adding volume indicator to avoid false breakout with low volume.

3. Test combinations with other indicators like MACD, Bollinger Bands etc.

4. Add machine learning algorithms, improving signal accuracy by training with historical data.

5. Optimize stop loss to be more flexible, adapting to market changes. 

6. Add risk management to control single trade loss amount.

## Conclusion

This strategy integrates the strengths of SMA and RSI indicators, filtering out some noisy trading opportunities. Its simple logic is easy to implement but still requires parameter and rules optimization, together with proper risk control to operate steadily in the long run. Combining with other indicators or algorithms is also worth exploring to further enhance the robustness.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|SMA Length|
|v_input_2|14|RSI Length|
|v_input_3|51|RSI Entry Level|
|v_input_4|54|RSI Stop Level|
|v_input_5|32|RSI Take Profit Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-01 00:00:00
end: 2023-10-07 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © abdllhatn

//@version=5
// strategy("Alpha Short SMA and RSI Strategy", overlay=true, initial_capital=10000, default_qty_value=100)

// Inputs
sma_length = input(200, title="SMA Length")
rsi_length = input(14, title="RSI Length")
rsi_entry = input(51, title="RSI Entry Level")
rsi_stop = input(54, title="RSI Stop Level")
rsi_take_profit = input(32, title="RSI Take Profit Level")

// Indicators
sma_value = ta.sma(close, sma_length)
rsi_value = ta.rsi(close, rsi_length)

var float trailingStop = na
var float lastLow = na

// Conditions
shortCondition = ta.crossover(rsi_value, rsi_entry) and close < sma_value
if (shortCondition)
    strategy.entry("Sell", strategy.short)
    trailingStop := na
    lastLow := na

if (strategy.position_size < 0)
    if (na(lastLow) or close < lastLow)
        lastLow := close
        trailingStop := close

if not na(trailingStop) and close > trailingStop
    strategy.close("Sell")

if (rsi_value >= rsi_stop)
    strategy.close("Sell")

if (rsi_value <= rsi_take_profit)
    strategy.close("Sell")

// Plot
plot(sma_value, color=color.red, linewidth=2)



```

> Detail

https://www.fmz.com/strategy/428681

> Last Modified

2023-10-08 11:40:49
