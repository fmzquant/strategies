
> Name

主动自适应量化网格交易策略Self-adaptive-Quant-Grid-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/bf1a3adca96ea2007d.png)
[trans]

### 概述

本策略通过建立一个动态调整的交易网格,在波动行情中实现稳定盈利。策略会根据设定的网格数量,自动计算网格间距和上下界价格。当价格突破每条网格线时,会分批建仓做多或做空。在价格重新触及原有网格线时,逐步止盈平仓。该策略同时支持手动和自动调整网格参数,可以自适应市场环境的变化。

### 策略原理   

1.  根据输入参数计算网格界限和网格线价格数组。

2.  当价格低于某一网格线且该网格线没有对应的挂单时,在该网格线价格点建立做多单;当价格高于上一个网格线(第一个除外)且上一个网格线存在对应的持仓单时,平掉上一个网格线对应的做多单。

3. 如果启用自动调整网格参数,会根据最近一定数量的K线数据,定期重新计算网格的上下限价格、网格间距和网格数组。

### 优势分析

1. 实现了波动行情中盈利的目标。在涨跌行情中,能够在不同价格点分批建立持仓和止盈平仓,从而总体实现盈利。

2. 可以选择手动或自动调整网格参数。手动调整需要人工干预,但更加可控;自动调整减轻了操作工作量,使策略可以自适应市场环境的变化。 

3. 通过限制最大网格数量,可以控制单边风险。当价格突破所有网格线后,这一方向的风险就得到控制。

4. 可以通过调整网格间距,控制每单的盈亏幅度。降低网格间距可以减小单笔盈亏。

### 风险分析

1. 大幅波动行情下,存在被套利的风险。如果价格在多个网格间快速来回波动,则可能面临套利的风险。

2. 需要合理设置初始资金量。如果初始资金不足,无法支撑足够数量的网格线。

3. 过大或过小网格数量都不利于策略收益。网格数量过少无法充分利用波动;过多则单笔盈亏过小。需要测试确定最佳参数。

4. 自动调整网格参数存在被操纵的风险。网格参数计算依赖一定K线数量,可能会受到短期操作影响。

### 优化方向 

1. 增加止损逻辑。如设置浮动止损或跟踪止损,进一步控制单边亏损风险。

2. 加入算法优化网格参数。可以测试不同市场阶段参数设置,然后用机器学习方法训练模型,实现参数的自动优化。

3. 结合更多指标判断行情。如MACD,KD等判断目前处于상涨趋势还是下跌趋势,以调整网格数量或参数。

4. 优化回撤控制。如设定最大回撤比例,当达到阈值时关闭策略,避免亏损进一步扩大。

### 总结  

本策略充分利用了波动行情的特征,通过动态网格交易实现了稳定盈利的目标。策略既考虑到参数设置的灵活性,也减轻了操作的工作强度。可以说在波动性行情中,本策略是理想的盈利选择。未来通过进一步优化,可以使策略的应用场景更广,回撤控制更优,从而产生更持续稳定的收益。

||

### Overview

This strategy establishes a dynamic trading grid to achieve steady profits amid volatile markets. It automatically calculates grid spacing and upper/lower limit based on the preset number of grid lines. When the price breaks through each grid line, long/short positions will be built up in batches. Profits will be taken when the price hits the original grid lines again. The strategy supports both manual and automatic adjustment of grid parameters to adapt itself to changing market conditions.  

### Strategy Logic  

1. Calculate grid boundaries and grid line price array based on input parameters.  

2. When the price falls below a grid line without corresponding orders, long orders will be placed at the grid line price. When the price rises above the previous grid line (the first excluded) with existing position, the long orders of the previous line will be closed.

3. If auto adjustment is enabled, grid upper/lower limits, grid spacing and grid arrays will be recalculated periodically based on recent candlestick data.

### Advantage Analysis

1. Realize steady profits amid volatile market. Long/short positions are built up and closed in batches at different price levels to achieve overall profit.

2. Support both manual and automatic parameter adjustment. Manual adjustment offers better control but requires intervention. Automatic adjustment reduces workload and adapts to changing market dynamics.

3. Max loss capped by limiting max number of grid lines. When price breaks all grid lines, risks are contained. 

4. Tune grid spacing to adjust profit/loss per trade. Smaller spacing lowers exposure per trade.

### Risk Analysis  

1. Risk of being trapped in whipswa. Frequent price oscillation within grid range may lead to losses.  

2. Require adequate initial capital. Insufficient funding cannot support enough grid lines.

3. Extreme grid numbers disadvantage profits. Too few grids fail to take full advantage of volatility while too many grids lead to minimal profits per trade. Extensive testing needed to determine optimal settings.  

4. Auto adjustment risks price manipulation. Relies on recent candlesticks which can be affected by short-term price operations.

### Optimization

1. Introduce stop loss logic such as trailing stop loss to futher restrict downside risk per direction.  

2. Optimize grid parameters via machine learning. Test different parameters across market conditions and train ML models to obtain optimal, adaptive parameters.

3. Incorporate additional technical indicators. Assess current trend strength with indicators like MACD and RSI to guide grid quantity and parameter tuning.

4. Enhance risk control by setting maximum allowable drawdown percentage. Disable strategy when threshold is breached to prevent further losses.

### Conclusion  

This strategy fully utilizes the characteristics of volatile markets and achieves steady profits through dynamic grid trading framework that offers both parameter flexibility and ease of operation. With further enhancements in loss control and automatic parameter optimization, it can become an ideal model for creating durable profits from market fluctuations.  
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
start: 2024-01-02 00:00:00
end: 2024-02-01 00:00:00
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

https://www.fmz.com/strategy/440879

> Last Modified

2024-02-02 18:08:22
