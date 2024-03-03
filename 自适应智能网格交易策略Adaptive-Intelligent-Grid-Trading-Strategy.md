
> Name

自适应智能网格交易策略Adaptive-Intelligent-Grid-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b4e1d317a4b31563ab.png)

[trans]

## 概述

该策略是一个基于TradingView平台的自适应智能网格交易策略,使用Pine Script v4编写。它在价格表上覆盖,并在指定的范围内创建一个网格,以生成买入和卖出信号。

## 策略原理

### 关键功能

1. 金字塔形和资金管理:
    - 允许同向最多14次追加(金字塔),
    - 使用基于现金的策略管理头寸大小,
    - 为模拟目的,初始资本设定为100美元,
    - 每次交易收取0.1%的佣金。

2. 网格范围:
    - 用户可以选择使用自动计算的范围或手动设置网格的上下限,
    - 自动范围可以从最近的价格高点和低点或从简单移动平均线(SMA)导出,
    - 用户可以定义用于计算范围的回看周期,并调整偏差以扩大或缩小范围。

3. 网格线:
    - 该策略允许在范围内的可自定义数量的网格线,建议范围在3至15之间,
    - 网格线在上限和下限之间均匀间隔。

### 策略逻辑

- 持仓进入:
    - 当价格跌破网格线且该网格线没有相关的未平仓订单时,脚本会下买单,
    - 每个买单数量根据初始资金除以网格线数量计算,并根据当前价格调整。

- 持仓退出:
    - 当价格上涨超过更高的网格线,且存在与下一个更低网格线相关的未平仓订单时,会触发卖出信号。

- 自适应网格:
    - 如果使用自动范围,则网格会通过重新计算上下限并相应调整,来适应变化的市场条件。

## 优势分析

该策略集成了网格交易的系统性和高效执行的优势。允许追加且使用资金管理,可以有效控制风险;网格自动自适应市场,适用于不同行情;参数可调整,适应不同交易风格。

## 风险分析

价格突破网格上下限可能造成较大损失。应适当调整参数,或结合止损来控制风险。此外,过于频繁交易会增加交易费用。

## 优化方向  

可以考虑结合趋势指标过滤信号或优化网格参数,也可以通过止损来防范极端行情的风险。

## 总结

本策略系统地生成买卖点并管理头寸,通过参数调整可适应不同偏好。它将网格交易的规则性与趋势交易的灵活性有机结合,既降低了操作难度,又具备一定的容错性。

||

## Overview 

This strategy is an adaptive intelligent grid trading strategy based on the TradingView platform, written in Pine Script v4. It overlays on the price chart and creates a grid within specified bounds to generate buy and sell signals.  

## Strategy Logic

### Key Features

1. Pyramiding and Money Management:
    - Allows up to 14 additions in the same direction (pyramiding), 
    - Uses a cash-based strategy to manage position sizes,
    - Initial capital is set at 100 USD for simulation purposes,
    - A small commission of 0.1% is charged for each trade.

2. Grid Bounds:
    - Users can opt to use auto-calculated bounds or manually set the upper and lower boundaries of the grid,
    - Auto bounds can be derived from either the recent High & Low of the price or from a Simple Moving Average (SMA), 
    - Users can define the lookback period for the bounds calculation and adjust the deviation to widen or narrow the bounds.

3. Grid Lines: 
    - The strategy allows for a customizable number of grid lines within the bounds, with a recommended range between 3 and 15,
    - The grid lines are evenly spaced between the upper and lower bounds.  

### Strategy Logic

- Entry:
    - The script places buy orders when the price falls below a grid line and no existing order is associated with that grid line. 
    - Each buy order quantity is calculated based on the initial capital divided by the number of grid lines, adjusted for the current price.

- Exit: 
    - Sell orders are triggered when the price rises above a grid line, provided there is an open order corresponding to the next lower grid line.  

- Adaptive Grid:
    - If set to auto bounds, the grid adapts to changing market conditions by recalculating the upper and lower bounds and adjusting the grid accordingly.

## Advantage Analysis  

The strategy integrates the systematic nature and efficient execution of grid trading. Allowing pyramiding and using money management can effectively control risks. The auto-adapting grid fits different market conditions. The adjustable parameters cater to different trading styles.  

## Risk Analysis

A price breakout beyond the grid bounds may cause severe losses. Parameters should be adjusted properly or combined with a stop loss to control risks. Also, excessive trading increases transaction costs.  

## Optimization Directions   

Consider combining with a trend filter or optimizing grid parameters. A stop loss may also help prevent risks from extreme market moves.  

## Conclusion  

This strategy systematically generates entries and exits while managing positions. Through parameter tuning it adapts to different preferences. It combines the rules-based nature of grid trading with the flexibility of trend trading, easing operation complexity while retaining robustness.

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
start: 2024-01-08 00:00:00
end: 2024-01-15 00:00:00
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

https://www.fmz.com/strategy/438937

> Last Modified

2024-01-16 14:51:48
