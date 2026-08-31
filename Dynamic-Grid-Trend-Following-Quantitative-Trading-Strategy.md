
> Name

Dynamic-Grid-Trend-Following-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1193c749fa930b002b5.png)

## Overview

This is an advanced dynamic grid trend-following quantitative trading strategy. The main idea of this strategy is to divide multiple grid lines within a pre-set price range and automatically open positions when the price hits the grid lines and close positions when selling, thus profiting from fluctuating markets. At the same time, this strategy also has the function of dynamically adjusting the position of grid lines, which can adaptively optimize the grid layout according to recent price trends.

## Strategy Principle

The core principles of this strategy are as follows:

1. First, determine the upper and lower boundaries of the grid and the number of grid lines based on user settings. The boundaries can be fixed values or automatically calculated based on recent highs and lows or moving averages.

2. Within the determined boundaries, divide the price range into several grids. Each grid line corresponds to a buy or sell price.

3. When the price hits each grid line, the strategy will check whether the position corresponding to the grid line is already held. If not, it will open a position and buy, if so, it will close the position and sell.

4. By selling at relatively high positions and buying at low positions, the strategy can continuously profit when prices fluctuate.

5. At the same time, if the user enables the automatic boundary adjustment function, the position of the grid lines will be adaptively adjusted according to the recent price highs and lows or the set moving average to optimize the grid layout.

Through the above principles, this strategy can realize automatic low buying and high selling in fluctuating price trends, and adjust profit points according to trends, thereby improving overall returns.

## Advantage Analysis

This dynamic grid strategy has the following advantages:

1. Strong adaptability. It can adapt to different markets and varieties through parameter settings, and has good adaptability to fluctuating markets.

2. High degree of automation. Since the strategy is based on strict mathematical logic and clear position opening and closing points, it can achieve fully automated trading and reduce subjective emotional interference.

3. Controllable risk. By setting parameters such as the number of grids and grid boundaries, the risk exposure of each transaction can be effectively controlled, thereby maintaining the overall risk within an acceptable range.

4. Trend adaptability. The function of dynamically adjusting grid boundaries is added to the strategy, so that the grid can follow price trends and be optimized, improving the profitability in trend markets.

5. Stable win rate. Since grid trading is essentially frequent high-throwing and low-sucking in price fluctuations, as long as the price maintains fluctuations, this strategy can continue to profit, so it has a high win rate in the long run.

## Risk Analysis

Although this strategy has obvious advantages, it also has certain risks:

1. Trend risk. If the price breaks through the grid boundary with a strong unilateral trend, the profit space of this strategy will be limited and it may face a large retracement.

2. Difficulty in parameter optimization. This strategy has many parameters, including the number of grids, initial boundaries, dynamic boundary parameters, etc. Different parameter combinations have a great impact on strategy performance, and the actual optimization difficulty is not small.

3. Frequent trading. Grid strategy is essentially a high-frequency strategy, with very frequent opening and closing of positions, which means higher transaction costs and potential slippage risks.

4. Strong dependence on market conditions. This strategy is highly dependent on fluctuating markets. Once the price enters a rapid unilateral trend, this strategy is likely to face a large retracement.

In view of these risks, improvements can be made from the following aspects: adding trend judgment indicators as filter conditions for strategy startup, optimizing parameter search space and methods, introducing fund management and position control logic, increasing trend breakthrough closing logic, etc. Through these optimizations, the robustness and profitability of this strategy can be further improved.

## Optimization Direction

Based on the above analysis, the optimization directions of this strategy mainly include:

1. Introduce trend filtering conditions. Add trend judgment indicators before the strategy starts, such as moving averages, ADX, etc. Only start the strategy in fluctuating market conditions, and keep watching in trend markets to effectively avoid the risk of retracement in trend markets.

2. Optimize parameter search. Use intelligent algorithms to optimize grid parameters, such as genetic algorithms, particle swarm algorithms, etc., to automatically find the optimal parameter combination and improve optimization efficiency and quality.

3. Enhance risk control logic. Add more risk control logic to the strategy, such as dynamically adjusting the grid width according to price volatility, setting the maximum retracement threshold to trigger closing, etc., to better control risks.

4. Introduce trend stop loss. Set a trend breakthrough stop loss line, such as a certain percentage of the grid boundary. Once the price breaks through the stop loss line, close all positions to avoid huge retracements in trend markets.

5. Optimize transaction execution. Optimize the transaction execution link, such as adopting more advanced order types and order algorithms, minimizing transaction frequency and costs, and improving execution efficiency.

Through the above optimization, the adaptability, robustness and profitability of this strategy can be comprehensively improved, making it closer to the actual trading needs.

## Summary

In general, this dynamic grid trend-following strategy is a mid-to-high frequency quantitative trading strategy based on the principle of grid trading, and integrates dynamic adjustment and trend adaptation mechanisms. Its advantages lie in strong adaptability, high degree of automation, controllable risk, good trend adaptability, and stable win rate. At the same time, it also has risks such as trend risk, difficulty in parameter optimization, frequent trading, and strong dependence on market conditions. In view of these problems, improvements can be made from trend filtering, parameter optimization, risk control enhancement, trend stop loss, transaction optimization and other aspects to improve the overall performance of the strategy.

The idea of grid trading itself is a relatively mature and practical quantitative method. Through the addition of dynamic optimization and trend adaptation mechanisms to this strategy, the advantages of classic grid trading have been extended and developed. It provides investors with a new quantitative trading idea and possibility in fluctuating markets. With further optimization and improvement, this strategy is expected to become an excellent mid-to-high frequency quantitative trading tool.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|(?Grid Bounds)Use Auto Bounds?|
|v_input_2|0|(Auto) Bound Source: Hi & Low|Average|
|v_input_3|250|(Auto) Bound Lookback|
|v_input_4|0.1|(Auto) Bound Deviation|
|v_input_5|0.285|(Manual) Upper Boundry|
|v_input_6|0.225|(Manual) Lower Boundry|
|v_input_7|8|(?Grid Lines)Grid Line Quantity|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-01 00:00:00
end: 2024-03-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("(IK) Grid Script", overlay=true, pyramiding=14, close_entries_rule="ANY", default_qty_type=strategy.cash, initial_capital=100.0, currency="USD", commission_type=strategy.commission.percent, commission_value=0.1)
i_autoBounds    = input(group="Grid Bounds", title="Use Auto Bounds?", defval=true, type=input.bool)                             // calculate upper and lower bound of the grid automatically? This will theorhetically be less profitable, but will certainly require less attention
i_boundSrc      = input(group="Grid Bounds", title="(Auto) Bound Source", defval="Hi & Low", options=["Hi & Low", "Average"])     // should bounds of the auto grid be calculated from recent High & Low, or from a Simple Moving Average
i_boundLookback = input(group="Grid Bounds", title="(Auto) Bound Lookback", defval=250, type=input.integer, maxval=500, minval=0) // when calculating auto grid bounds, how far back should we look for a High & Low, or what should the length be of our sma
i_boundDev      = input(group="Grid Bounds", title="(Auto) Bound Deviation", defval=0.10, type=input.float, maxval=1, minval=-1)  // if sourcing auto bounds from High & Low, this percentage will (positive) widen or (negative) narrow the bound limits. If sourcing from Average, this is the deviation (up and down) from the sma, and CANNOT be negative.
i_upperBound    = input(group="Grid Bounds", title="(Manual) Upper Boundry", defval=0.285, type=input.float)                      // for manual grid bounds only. The upperbound price of your grid
i_lowerBound    = input(group="Grid Bounds", title="(Manual) Lower Boundry", defval=0.225, type=input.float)                      // for manual grid bounds only. The lowerbound price of your grid.
i_gridQty       = input(group="Grid Lines",  title="Grid Line Quantity", defval=8, maxval=15, minval=3, type=input.integer)       // how many grid lines are in your grid

f_getGridBounds(_bs, _bl, _bd, _up) =>
    if _bs == "Hi & Low"
        _up ? highest(close, _bl) * (1 + _bd) : lowest(close, _bl)  * (1 - _bd)
    else
        avg = sma(close, _bl)
        _up ? avg * (1 + _bd) : avg * (1 - _bd)

f_buildGrid(_lb, _gw, _gq) =>
    gridArr = array.new_float(0)
    for i=0 to _gq-1
        array.push(gridArr, _lb+(_gw*i))
    gridArr

f_getNearGridLines(_gridArr, _price) =>
    arr = array.new_int(3)
    for i = 0 to array.size(_gridArr)-1
        if array.get(_gridArr, i) > _price
            array.set(arr, 0, i == array.size(_gridArr)-1 ? i : i+1)
            array.set(arr, 1, i == 0 ? i : i-1)
            break
    arr

var upperBound      = i_autoBounds ? f_getGridBounds(i_boundSrc, i_boundLookback, i_boundDev, true) : i_upperBound  // upperbound of our grid
var lowerBound      = i_autoBounds ? f_getGridBounds(i_boundSrc, i_boundLookback, i_boundDev, false) : i_lowerBound // lowerbound of our grid
var gridWidth       = (upperBound - lowerBound)/(i_gridQty-1)                                                       // space between lines in our grid
var gridLineArr     = f_buildGrid(lowerBound, gridWidth, i_gridQty)                                                 // an array of prices that correspond to our grid lines
var orderArr        = array.new_bool(i_gridQty, false)                                                              // a boolean array that indicates if there is an open order corresponding to each grid line

var closeLineArr    = f_getNearGridLines(gridLineArr, close)                                                        // for plotting purposes - an array of 2 indices that correspond to grid lines near price
var nearTopGridLine = array.get(closeLineArr, 0)                                                                    // for plotting purposes - the index (in our grid line array) of the closest grid line above current price
var nearBotGridLine = array.get(closeLineArr, 1)                                                                    // for plotting purposes - the index (in our grid line array) of the closest grid line below current price
strategy.initial_capital = 50000
for i = 0 to (array.size(gridLineArr) - 1)
    if close < array.get(gridLineArr, i) and not array.get(orderArr, i) and i < (array.size(gridLineArr) - 1)
        buyId = i
        array.set(orderArr, buyId, true)
        strategy.entry(id=tostring(buyId), long=true, qty=(strategy.initial_capital/(i_gridQty-1))/close, comment="#"+tostring(buyId))
    if close > array.get(gridLineArr, i) and i != 0
        if array.get(orderArr, i-1)
            sellId = i-1
            array.set(orderArr, sellId, false)
            strategy.close(id=tostring(sellId), comment="#"+tostring(sellId))

if i_autoBounds
    upperBound  := f_getGridBounds(i_boundSrc, i_boundLookback, i_boundDev, true)
    lowerBound  := f_getGridBounds(i_boundSrc, i_boundLookback, i_boundDev, false)
    gridWidth   := (upperBound - lowerBound)/(i_gridQty-1)
    gridLineArr := f_buildGrid(lowerBound, gridWidth, i_gridQty)

closeLineArr    := f_getNearGridLines(gridLineArr, close)
nearTopGridLine := array.get(closeLineArr, 0)
nearBotGridLine := array.get(closeLineArr, 1)






```

> Detail

https://www.fmz.com/strategy/445838

> Last Modified

2024-03-22 16:03:09
