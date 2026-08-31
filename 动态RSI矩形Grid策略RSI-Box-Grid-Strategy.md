
> Name

动态RSI矩形Grid策略RSI-Box-Grid-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/df68181cfefbee9f4f.png)


## Overview

This strategy is a pseudo-grid bot intended primarily for algorithmic trading. It uses a dynamic, volume-weighted grid that updates only when the RSI meets certain conditions. It's also a breakout strategy, whereas normal grid bots are not (typical grid bots sell when a higher grid is reached, whereas this strategy sells when a lower grid is breached under specific conditions). This strategy also closes all pyramiding orders on close.

In short, the strategy updates its grid to the volume-weighted highest/lowest values of your given source ("src" in settings) each time the RSI crosses under/over the overbought/oversold levels. From this range it generates an evenly spaced grid of five lines, and uses the current source to determine which grid line is closest. Then, if the source crosses over the line directly above, it enters a long. If the source crosses under the line directly below, it enters a short.

You can configure shorts, source, RSI length, and overbought/oversold levels in settings.

## Strategy Logic

The core logic of the strategy is:

1. Use RSI indicator to determine trend reversal points, using RSI line crossovers of overbought/oversold levels as confirmation signals.

2. When RSI signal occurs, record the highest/lowest prices over a period as upper/lower limits of the grid. 

3. Divide the range into 5 evenly spaced grid lines. Check realtime which line the price is closest to.

4. When price breaks over the line above, go long. When price breaks under the line below, flatten longs and go short.

5. By using breakout instead of touch, it can better catch trend reversals. 

6. Close all pyramiding orders before close to avoid overnight risks.

The strategy consists of:

1. Input settings: source, RSI parameters, long/short etc.

2. RSI calculation: compute RSI and check for crossover signals.

3. Dynamic grid: record price range on RSI signals and calculate grid lines.  

4. Signal check: detect price breaking grid lines for long/short signals.

5. Order management: send orders and flatten before close.

6. Charting: plot grid lines, long/short zones etc.

By dynamically updating the grid and using RSI for trend context plus breakout signals, this strategy can effectively track trends and reverse when trend changes. Flattening before close manages overnight risks.

## Advantage Analysis

The main advantages of this strategy are:

1. Dynamic grid adapts to trend, unlike fixed grids.

2. Only adjusts grid on RSI confirmation, reducing noise.

3. Breakout signals catch reversals better than touch.

4. Flattens before close to avoid overnight gap risks.

5. RSI is effective for overbought/sold detection.

6. Breakout mode provides early trend entry compared to reversion.

7. Adjusting grid spacing & size allows risk tuning.

8. Visual grid & long/short zones.

9. Optional shorts to suit different traders.

10. Simple clear logic suitable for algo trading.

These make the strategy capable of auto trend tracking with risk controls for live trading.

## Risk Analysis

There are also some potential risks to note:

1. Whipsaw markets can cause stop losses. Can widen stops or pause trading.

2. Overnight gaps can leave large open gaps. Can reduce position sizes.

3. Bad parameter tuning can increase trades or signal errors. Requires cautious optimization. 

4. High fees may erode profits from grid trades. Should reduce trade sizes or use lower fee exchanges.

5. Breakout signals may lag reversals slightly. Need reasonable breakout thresholds.

6. May underperform in steady uptrends. Consider combining with other indicators.

7. Needs sufficient capital for larger position sizes and pyramiding, otherwise results will be poor. Adjust sizes based on capital.

Mitigations:

1. Optimize parameters to reduce trade frequency and overtrading.

2. Combine with trend indicators, avoid trading whipsaw periods.

3. Reduce trade size % and risk per trade.

4. Test different breakout thresholds for best balance of timeliness vs stability.

5. Add more entry conditions, only enter clear trends to avoid being trapped.

6. Backtest over longer periods to evaluate parameter stability.

7. Explore machine learning based dynamic parameter optimization for market adaptability.

8. Consider combining with options strategies to hedge position risks.

9. Adjust parameters based on recent market conditions to keep strategy effective.

10. Build visual optimization platforms to assist rapid testing.

With parameter optimization, combing signals, and more market info, the risks can be reduced to make a truly reliable algo strategy.

## Enhancement Opportunities 

The strategy can be further enhanced by:

1. Optimizing RSI parameters, testing RSI periods for best combos.

2. Testing different grid spacing for optimal risk-reward.

3. Adding other indicators to filter signals, e.g. MACD, KD etc to improve accuracy.

4. Developing adaptive stops based on market volatility.

5. Increasing entry conditions, only enter obvious trends to avoid traps. 

6. Backtesting over longer periods to evaluate parameter stability.

7. Exploring machine learning based dynamic optimization for adaptability.

8. Incorporating options strategies to hedge risks.

9. Adjusting parameters based on recent market conditions to maintain effectiveness.

10. Building visual optimization platforms for rapid testing.

With automated optimization, strategy combos, more market info etc, it can achieve better stability and returns as a real trading strategy.

## Summary

In summary, the RSI Box Grid strategy uses RSI to identify trend reversal confirmation, sets dynamic price range grids, trades breakouts, and flattens intraday - forming a flexible trend following algo trading strategy. Compared to fixed grids, it adapts better to market changes.

The strategy has advantages including RSI for trend context, dynamic grids, breakout trading, and full flattening intraday. This allows it to effectively track trends with risk controls. However, risks like whipsaw stop losses, overnight gaps exist, requiring optimization, combing signals, and risk management.

There are many enhancement opportunities, by incorporating more indicators, ML optimization, visual backtesting etc, it can become a more robust high-return algo trading strategy. Overall it provides a reliable, easy-to-implement trend tracking algorithmic framework for quant trading.



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_source_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|14|RSI Length|
|v_input_int_2|70|Overbought Level|
|v_input_int_3|30|Oversold Level|
|v_input_bool_1|false|Use Shorts|
|v_input_bool_2|false|Show Grid|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-29 00:00:00
end: 2023-10-29 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © wbburgin

//@version=5
// strategy("RSI Box Strategy (pseudo-Grid Bot)", overlay=true, initial_capital = 10000, 
//  default_qty_type = strategy.percent_of_equity, default_qty_value = 1, pyramiding = 33, commission_value=0.10)

src = input.source(close,"Source")
rsiLength = input.int(14,"RSI Length")
oblvl = input.int(70,"Overbought Level")
oslvl = input.int(30,"Oversold Level")
useShorts = input.bool(false,"Use Shorts",inline="B")
showGrid = input.bool(false,"Show Grid",inline="B")

rsi = ta.rsi(src,rsiLength)

rsi_crossdn = ta.crossunder(rsi,oblvl)
rsi_crossup = ta.crossover(rsi,oslvl)

highest = ta.vwma(ta.highest(src,rsiLength),rsiLength)
lowest = ta.vwma(ta.lowest(src,rsiLength), rsiLength)

gridTop = ta.valuewhen(rsi_crossdn,highest,0)
gridBottom = ta.valuewhen(rsi_crossup,lowest,0)
gridMiddle = math.avg(gridTop,gridBottom)
gridMidTop = math.avg(gridMiddle,gridTop)
gridMidBottom = math.avg(gridMiddle,gridBottom)

diff1 = math.abs(src - gridTop)
diff2 = math.abs(src - gridBottom)
diff3 = math.abs(src - gridMiddle)
diff4 = math.abs(src - gridMidTop)
diff5 = math.abs(src - gridMidBottom)

minDiff = math.min(diff1, diff2, diff3, diff4, diff5)

// Determine which line is the closest
float closestLine = na
if minDiff == diff1
    closestLine := gridTop
else if minDiff == diff2
    closestLine := gridBottom
else if minDiff == diff3
    closestLine := gridMiddle
else if minDiff == diff4
    closestLine := gridMidTop
else if minDiff == diff5
    closestLine := gridMidBottom

buyCrosses = ta.crossover(src,gridTop) or ta.crossover(src,gridBottom) or ta.crossover(src,gridMiddle) or ta.crossover(src,gridMidTop) or ta.crossover(src,gridMidBottom)
sellCrosses= ta.crossunder(src,gridTop) or ta.crossunder(src,gridBottom) or ta.crossunder(src,gridMiddle) or ta.crossunder(src,gridMidTop) or ta.crossunder(src,gridMidBottom)

condition_bull = buyCrosses
condition_bear = sellCrosses

var float bull_status_line = na
var float bear_status_line = na
var float bull_buy_line = na
var float bear_sell_line = na

if condition_bull
    bull_status_line := closestLine
if condition_bear
    bear_status_line := closestLine

if bull_status_line == gridBottom
    bull_buy_line := gridMidBottom
if bull_status_line == gridMidBottom
    bull_buy_line := gridMiddle
if bull_status_line == gridMiddle
    bull_buy_line := gridMidTop
if bull_status_line == gridMidTop
    bull_buy_line := gridTop

if bear_status_line == gridTop
    bear_sell_line := gridMidTop
if bear_status_line == gridMidTop
    bear_sell_line := gridMiddle
if bear_status_line == gridMiddle
    bear_sell_line := gridMidBottom
if bear_status_line == gridMidBottom
    bear_sell_line := gridBottom

l = ta.crossover(src,bull_buy_line)
s = ta.crossunder(src,bear_sell_line)

if l
    strategy.entry("Long",strategy.long)
if s
    strategy.close("Long")
    if useShorts
        strategy.entry("Short",strategy.short)

// Plotting
in_buy = ta.barssince(l) < ta.barssince(s)
u=plot(bull_buy_line,color=na,title="Buy Plot")
d=plot(bear_sell_line,color=na,title="Sell Plot")

plot(not showGrid?na:gridBottom,color=color.new(color.white,75),title="Grid Line -2")
plot(not showGrid?na:gridMidBottom,color=color.new(color.white,75),title="Grid Line -1")
plot(not showGrid?na:gridMiddle,color=color.new(color.white,75),title="Grid Line 0")
plot(not showGrid?na:gridMidTop,color=color.new(color.white,75),title="Grid Line 1")
plot(not showGrid?na:gridTop,color=color.new(color.white,75),title="Grid Line 2")


fill(u,d,color=in_buy ? color.new(color.lime,75) : color.new(color.red,75))
```

> Detail

https://www.fmz.com/strategy/430551

> Last Modified

2023-10-30 11:29:30
