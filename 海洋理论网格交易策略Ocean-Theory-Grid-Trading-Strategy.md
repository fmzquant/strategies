
> Name

海洋理论网格交易策略Ocean-Theory-Grid-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略运用海洋理论中的网格交易方法,在设定的价格范围内均匀分布网格线,根据价格与网格线的关系进行买入和卖出操作。策略具有自动计算网格价格区间、均匀分布网格线等特点,可以有效控制风险。

## 策略原理

该策略首先根据用户选择或默认设置计算价格网格的上下限,即网格的最高价和最低价。计算方式有两种,一是查找回测周期内的最高价和最低价,二是计算一定周期的均线。然后根据用户设置的网格数量,均匀分布网格线。

交易信号的产生依赖于价格与网格线的关系。当价格低于下方网格线时,在该网格线处按固定数量开仓做多;当价格高于上方网格线时,在该网格线处按固定数量平仓。这样随着价格的波动,仓位也在网格内波动,实现获利。

具体来说,策略维护一个网格线价格数组和一个bool数组表示每个网格线是否有挂单。当价格低于某一网格线且该线未有挂单时,在该线价位做多;当价格高于某一网格线且下方网格线有挂单时,在下方网格线处平仓。通过这种方式,实现网格交易。

## 策略优势

1. 自动计算网格区间,避免手动设置的困难。可以选择不同计算方式。

2. 均匀分布网格线,避免网格密集导致过度交易。网格线数量可调。

3. 采用网格交易方法,可以有效控制风险,价格波动在网格内则一直可以获利。

4. 对价格没有方向预期,适用于震荡行情。

5. 手续费率和仓位数可自定义设置,适应不同交易品种。

6. 可视化展示网格线,容易掌握交易情况。

## 策略风险

1. 突破网格区间风险。价格突破网格上下限会导致亏损扩大。

2. 过于宽松的网格间距风险。网格过宽难以获利,但过窄又增加手续费。需权衡。

3. 持仓时间过长风险。长时间持仓难以获利 yet增加手续费损失。

4. 参数设置不当风险。如回测周期或均线周期等参数设置不当,会影响网格区间计算。

5. 市场系统性风险。该策略更适合震荡行情,不适合长期单边行情。

## 策略优化

1. 优化网格参数设置。综合考虑行情特点、交易成本等因素,优化网格数量、回测周期等参数。

2. 网格区间动态调整。当市场发生较大变化时,可以引入动态调整网格区间的机制。

3. 加入止损机制。设定合理的止损线,避免亏损过大。止损线也可以动态调整。

4. 结合其他指标过滤交易。如布林线,趋势指标等,避免不适宜的交易。

5. 优化资金利用效率。加入冷热分析,在波动较小时减少交易。

## 总结

该策略利用网格交易原理,实现了风险可控的震荡行情交易。策略具有自动计算网格、均匀分布网格等优点,可以通过调整参数适应不同市场环境。风险可控且易于操作。但策略也存在一定局限性,需要持续优化以适应市场变化。总体来说,该策略为网格交易提供了一种较为标准化和可参数化的实现思路。

||

## Overview

This strategy utilizes the grid trading method in ocean theory to place buy and sell orders within a preset price range. The strategy features automatic calculation of grid price range and uniform distribution of grid lines, which helps effectively manage risks.

## Strategy Logic

The strategy first calculates the upper and lower bounds of the price grid based on user's choice or default settings. There are two ways of calculation: getting the highest and lowest prices in the backtesting period, or computing moving averages over a timeframe. Then grid lines are uniformly distributed according to the number of grids set by user. 

The trading signals are generated based on the relationship between price and grid lines. When the price is below a grid line, a long position is opened at the grid line price with fixed quantity; when the price goes above a grid line, the position is closed at the grid line below. As price fluctuates within the grid, the positions change accordingly to gain profit.

Specifically, the strategy maintains a grid line price array and a bool array indicating whether orders are placed at each line. When price is below a line with no orders, long position is opened at the line; when price is above a line while orders exist at the line below, positions are closed at the lower line. Grid trading is implemented this way.

## Advantages

1. Grid range is calculated automatically, avoiding manual setting difficulty. Different calculation options are available.

2. Grid lines are distributed evenly to avoid overtrading due to dense grids. Number of grids can be adjusted. 

3. Grid trading method effectively controls risks. Profit can be gained as long as price fluctuates within the grid.

4. No price direction assumption, suitable for range-bound market.

5. Customizable commission and position size settings for different trading instruments.

6. Visualization of grid lines helps understand trading situation.

## Risks

1. Price breakout risks. Breaking the upper or lower grid limits can lead to greater losses.

2. Excessive grid space risks. Grids too loose cannot profit easily while too narrow increases costs. Balance is needed.

3. Prolonged holding risks. Long holding makes profit difficult yet increases costs.

4. Improper parameter setting risks. Backtesting period or moving average period can affect grid range calculation if set inappropriately.  

5. Systemic market risks. More suitable for range-bound instead of long-term trended markets.

## Enhancement

1. Optimize grid parameters. Comprehensively consider market conditions, costs etc. to optimize number of grids, lookback period etc.

2. Introduce dynamic grid range adjustment. Adapt grid ranges when significant market change occurs.

3. Incorporate stop loss mechanisms. Set proper stop loss lines to limit losses. Can be adjusted dynamically.

4. Add filters using other indicators. Such as Bollinger Bands, trend indicators etc. to avoid improper trading.

5. Improve capital usage efficiency. Introduce volatility analysis to reduce trading during steady periods.

## Conclusion

The strategy realizes risk-controllable range trading by leveraging grid trading principles. The automatic grid calculation and uniform distribution offer advantages that suit various markets through parameter tuning. Risks are limited and easy to operate. However, limitations exist and continuous improvements are needed to adapt to evolving markets. Overall, the strategy provides a standardized and parametric approach to implementing grid trading.

[/trans]

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
start: 2023-09-12 00:00:00
end: 2023-10-12 00:00:00
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
strategy.initial_capital = 50000
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

https://www.fmz.com/strategy/429163

> Last Modified

2023-10-13 17:07:39
