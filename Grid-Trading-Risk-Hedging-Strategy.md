
> Name

Grid-Trading-Risk-Hedging-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/142bb2fa61929c1ee5f.png)

## Strategy Overview

Grid Trading Risk Hedging Strategy is a quantitative trading strategy based on the concept of grid trading, combined with the idea of risk hedging. The strategy sets multiple buy and sell orders within a predefined price range to profit from price fluctuations. At the same time, the strategy introduces a risk hedging mechanism that dynamically adjusts grid boundaries to adapt to changes in the market environment and reduce strategy risks.

## Strategy Principle

The core principle of this strategy is grid trading. First, based on the parameters set by the user, the upper and lower boundaries of the grid and the number of grid lines are determined. Then, buy and sell orders are placed on the grid lines: when the price touches a grid line, if there was no order on that grid line before, a position is opened; if there was an order before, the position is closed. In this way, the strategy can continuously open and close positions in price fluctuations to make profits.

At the same time, to reduce risks, the strategy introduces a dynamic grid boundary adjustment mechanism. According to the user's choice, the upper and lower boundaries of the grid can be automatically adjusted in two ways: 1) based on the highest and lowest prices in the recent period, considering the deviation set by the user; 2) based on the moving average line, considering the deviation set by the user. By dynamically adjusting the grid boundaries, the grid can always be centered around the current price, thus reducing the risk of price breaking through the grid boundaries.

In addition, when opening a position, the strategy divides the total funds into N equal parts, and each time it opens a position, it uses an equal amount of funds, which can reduce the risk of a single transaction.

## Advantage Analysis

1. Strong adaptability: By dynamically adjusting the grid boundaries, the strategy can adapt to different market environments. Whether in a trend or a volatile market, it can automatically adjust to obtain better returns.

2. Controllable risk: The strategy uses equal amounts of funds when opening positions, so the risk of a single transaction is small; at the same time, the dynamic grid boundary adjustment mechanism can reduce the risk of price breaking through the grid boundaries.

3. High trading frequency: Since the grid usually has many orders, the trading frequency is high, making it easier to profit in volatile markets.

4. Flexible parameters: Users can set the number of grids, upper and lower boundaries, dynamic adjustment parameters, etc. according to their preferences, thus adapting to different trading styles.

## Risk Analysis

1. Poor performance in trend markets: If the price continues to rise or fall unilaterally, breaking through the grid boundaries, and the dynamic adjustment cannot keep up with the speed of price changes, the strategy may face greater risks.

2. Transaction fees: Since the strategy has a high trading frequency, transaction fees may have a certain impact on returns.

3. Improper parameter settings: If the parameters are set improperly, such as too many grid lines or unreasonable grid boundary settings, it may lead to poor strategy performance.

Solutions: 1) In trend markets, consider increasing the adjustment range of grid boundaries or combining with trend strategies; 2) Choose exchanges and currencies with lower transaction fees; 3) Before actual operation, the parameters need to be fully backtested and optimized.

## Optimization Directions

1. Combine with other strategies: Consider combining grid trading strategies with other types of strategies, such as trend strategies, mean reversion strategies, etc., to improve the adaptability and stability of the strategy.

2. Improve the dynamic adjustment mechanism: The current dynamic adjustment mechanism in the strategy is relatively simple and can be further optimized, such as considering more factors (such as trading volume, volatility, etc.), and adopting more advanced algorithms (such as adaptive algorithms, machine learning algorithms, etc.).

3. Optimize fund management: Currently, the strategy adopts equal fund management. We can consider introducing more advanced fund management methods, such as the Kelly Criterion, optimization methods, etc., to further improve fund utilization efficiency and returns.

4. Introduce take profit and stop loss: On the basis of grid trading, some take profit and stop loss logic can be introduced, such as moving take profit and stop loss, volatility take profit and stop loss, etc., to further reduce strategy risks.

## Summary

Grid Trading Risk Hedging Strategy is a highly automated, adaptable, and risk-controllable quantitative trading strategy. Through grid trading and dynamic grid adjustment, the strategy can profit in various market conditions while controlling risks. However, the strategy may perform poorly in trend markets, and transaction fees may impact returns. Therefore, further optimization and improvement are needed in practical applications. In general, the strategy provides a relatively mature quantitative trading idea that is worth further research and application.


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
start: 2024-03-19 00:00:00
end: 2024-03-23 00:00:00
period: 5m
basePeriod: 1m
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

https://www.fmz.com/strategy/446336

> Last Modified

2024-03-27 18:15:12
