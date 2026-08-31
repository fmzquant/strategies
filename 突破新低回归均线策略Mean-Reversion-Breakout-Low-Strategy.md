
> Name

突破新低回归均线策略Mean-Reversion-Breakout-Low-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b3e2b2fc04d8e75da9.png)


### Overview

The main idea of this strategy is to detect if the price breaks through the lowest price in a specified period and go long, waiting for the price to revert to the mean. It belongs to trend following strategies.

### Strategy Logic

The strategy gets the lowest price in a specified period lowestLow using Pine Script's ta.lowest method and compares it with the lowest price of the previous period prevLow. 

If the latest period's lowest price lowestLow is lower than the previous period's lowest price prevLow, a long signal is triggered. After going long, it compares with the highest price in the specified period highestHigh. If the latest period's highest price is greater than the previous highest price, it closes the position.

The strategy allows choosing the trigger condition, i.e. the lowest price needs to break through 1, 2, 3 or 4 previous lowest prices consecutively, to control the trading frequency.

It also plots the lowest price line lowestLow and highest price line highestHigh on the chart to visually display the trend change.

### Advantage Analysis

- The strategy catches the reversal trend after breaking new lows with relatively high win rate.

- Allows choosing the number of broken lowest prices to control trading frequency. 

- Drawing the lines helps visually determine trend change points.

- Simple and clear strategy logic, easy to understand and implement.

- Can be configured and optimized on different stocks and time periods.

### Risk Analysis

- Breaking false bottom cannot determine trend reversal points, may lead to losses.

- Needs to test different parameter combinations to optimize configurations, otherwise trading frequency may be too high or too low.

- Parameters need to be adjusted for different stocks, should not mechanically apply.

- Insufficient backtest period may cause overfitting. 

- Price may make new lows after breaking out, need to set stop loss to control risks.

### Optimization Directions

- Add stop loss mechanisms like moving stop loss, trailing stop loss, to limit per trade loss.

- Optimize the number of breakouts to balance trading frequency and signal quality.

- Test parameters on different stocks and time periods.

- Add filters to avoid frequent trading in ranging markets.

- Consider adding trend indicators to avoid counter trend trading.

- Test different exit signals.

### Conclusion

The strategy catches reversal opportunities by monitoring lowest price breakouts, a typical mean reversion breakout strategy. The advantages are simplicity, controllable frequency, and applicability to various stocks. But it also has some false breakout risks. Adding filters and optimizing is necessary, as well as controlling risks. With comprehensive testing and optimization, it can become a stable and reliable trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Minimum number of bars|
|v_input_string_1|0|Number of broken lows: One|Two|Three|Four|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-11-01 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © merovinh

//@version=5
strategy(title="Merovinh - Mean Reversion Lowest low",
     overlay = true,
     default_qty_type = strategy.percent_of_equity,
     initial_capital = 10000,
     default_qty_value = 10,
     commission_type = strategy.commission.percent,
     slippage = 1,
     commission_value = 0.04)

GR_TIME = 'Time Period'

bars = input(9, title = "Minimum number of bars", tooltip = "The minimum number of bars before updating lowest low / highest high")

numberOfLows  = input.string(defval='One', title='Number of broken lows', options=['One', 'Two', 'Three', 'Four'])

//Period

var prevLow = .0
var prevHigh = .0
var prevLow2 = .0
var prevLow3 = .0
var prevLow4 = .0

truetime = true


highestHigh = ta.highest(high, bars)
lowestLow = ta.lowest(low, bars)

if numberOfLows == 'One'
    if truetime and prevLow > 0 and lowestLow < prevLow
        strategy.entry('long', strategy.long)
if numberOfLows == 'Two'
    if truetime and prevLow > 0 and lowestLow < prevLow and prevLow < prevLow2
        strategy.entry('long', strategy.long)
if numberOfLows == 'Three'
    if truetime and prevLow > 0 and lowestLow < prevLow and prevLow < prevLow2 and prevLow2 < prevLow3
        strategy.entry('long', strategy.long)
if numberOfLows == 'Four'
    if truetime and prevLow > 0 and lowestLow < prevLow and prevLow < prevLow2 and prevLow2 < prevLow3 and prevLow3 < prevLow4
        strategy.entry('long', strategy.long)

if truetime and prevHigh > 0 and highestHigh > prevHigh
    strategy.close('long')


if prevLow != lowestLow
    prevLow4 := prevLow3
    prevLow3 := prevLow2
    prevLow2 := prevLow
    prevLow := lowestLow
prevHigh := highestHigh

plot(lowestLow, color=color.green, linewidth=1, title="Lowest Low Line")
plot(highestHigh, color=color.green, linewidth=1, title="Highest High Line")



```

> Detail

https://www.fmz.com/strategy/430867

> Last Modified

2023-11-02 15:34:22
