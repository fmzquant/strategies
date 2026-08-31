
> Name

强势趋势突破策略Strong-Trend-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19da75cc22e96bb87ce.png)

### Overview

This strategy calculates the highest high and lowest low over a certain period to form upper and lower bands. It goes long when the price breaks above the upper band and closes the position when the price breaks below the lower band. The strategy aims to capture the strong trending phases by trading trend breakouts. 

### Strategy Logic

The strategy first calculates the highest high and lowest low over the past 20 bars to form the upper and lower bands. When the closing price of the current bar is above the upper band, it goes long. When the price breaks below the lower band, it closes the position.

Specifically, the strategy uses the highest and lowest functions to calculate the highest high and lowest low over the past 20 bars, forming a range. It then checks if the closing price of the current bar is above the upper band. If yes, it goes long. If the price breaks below the lower band, it exits the position.

The strategy relies on trend breakouts to determine entry signals. It is a trend following system that only goes long and does not short. It is suitable for strongly trending instruments.

### Advantage Analysis 

The strategy has the following advantages:

1. The strategy logic is simple and easy to understand.

2. It captures strong trending phases by trading trend breakouts. 

3. It uses a moving stop loss to control risks and limit losses.

4. It only goes long and does not short, suitable for trending markets.

5. Customizable parameters for period length and stop loss.

### Risk Analysis

The strategy also has the following risks:

1. It cannot identify trend reversals and may result in buying at the top.

2. Stop loss can be easily triggered by large instant price gaps.

3. It may generate multiple small losses when the trend changes. 

4. It only goes long and cannot profit from downtrends.

5. Improper parameter settings may cause oversensitivity or sluggishness.

### Optimization Directions

The strategy can be improved in the following aspects:

1. Add trend identification indicators to avoid trading against reversals. E.g. MACD.

2. Optimize the stop loss strategy for better risk control. E.g. trailing stop loss. 

3. Add short position logic to profit from downtrends.

4. Backtest and optimize parameters to find the best combination.

5. Add dynamic parameter optimization based on market conditions.

6. Incorporate analysis across multiple timeframes to avoid misleading by a single timeframe.

### Summary

The strategy has clear and simple logic, capturing strong trends through breakouts. It controls risk via stop loss. However, it also has some weaknesses like inaccurate trend judgment and stop loss being triggered. We can improve it by enhancing trend identification, stop loss strategy, short positions, and parameter optimization to make the strategy more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2|true|Stop Loss Percentage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-22 00:00:00
end: 2023-10-24 17:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Donchian Wicks Strategy - Long Only with Customizable Donchian Exit and Stop Loss", "DWS", overlay = true)

// INPUTS
iLength = input(20, "Length", minval = 1)
stopLossPercent = input(1.0, "Stop Loss Percentage", type=input.float) / 100

// SETTING
float up = na
up := close > open ? high : nz(up[1])
float down = na
down := close < open ? low : nz(down[1])

highest = highest(up, iLength)
lowest = lowest(down, iLength)

// PLOT
p1 = plot(highest, "Highest", color.black, 2)
p2 = plot(lowest, "Lowest", color.black, 2)
fill(p1, p2, color.new(color.navy, 90), title="Range")

// ENTRY SIGNALS
wickDown = low < lowest

// STRATEGY IMPLEMENTATION
strategy.entry("Buy", strategy.long, when = wickDown)
strategy.exit("Sell at Donchian High", from_entry="Buy", limit=highest)

// Customizable Stop Loss
stopLossLevel = close * (1 - stopLossPercent)
strategy.exit("Stop Loss", from_entry="Buy", stop=stopLossLevel)

```

> Detail

https://www.fmz.com/strategy/430573

> Last Modified

2023-10-30 14:53:32
