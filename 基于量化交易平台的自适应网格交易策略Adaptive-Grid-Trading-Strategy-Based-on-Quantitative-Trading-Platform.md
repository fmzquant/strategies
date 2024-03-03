
> Name

基于量化交易平台的自适应网格交易策略Adaptive-Grid-Trading-Strategy-Based-on-Quantitative-Trading-Platform

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fd83e948949e4afe52.png)
[trans]
## 概述

本策略是一个基于量化交易平台的自适应网格交易策略。该策略通过设置自动或手动的网格交易范围,在范围内以等间距放置买卖单,实现网格交易。当价格突破网格上下限时,策略会自动调整网格的范围。

## 策略原理

1. 设置网格的上下限价格。可以自动计算历史价格最高点和最低点在一定区间内的价格作为上下限,也可以手动设置固定的上下限价格。

2. 根据上下限价格和网格数量,计算出每个网格的价格间距。

3. 在上下限价格之间,以等间距排列多个买卖点作为网格。

4. 当市场价格突破网格下限时,在最新一个未平仓订单所在网格的下一个网格放置买单;当市场价格突破网格上限时,在最新一个未平仓订单所在网格的上一个网格放置卖单。

5. 这样,在网格上下限之间不断进行买卖操作。当价格趋势反转时,之前的订单逐步止盈或止损。

## 策略优势

1. 网格交易可以在横盘和震荡行情中获利。

2. 自适应调整网格范围,可以根据市场波动自动调整,无需人工干预。

3. 可以预设投入资金量,按比例分配在各个网格上,控制每单风险。

4. 简单的逻辑,容易理解,参数调整灵活。

## 风险及对策

1. 突破上下限造成损失

   - 解决:合理设置止损位置。

2. 趋势行情产生重复亏损

   - 解决:识别趋势,及时暂停交易。

3. 参数设置不当

   - 解决:调整网格数量,价格间距参数。

## 优化方向

1. 利用机器学习预测价格波动范围和趋势,动态调整网格参数。

2. 在趋势行情中,改为趋势交易,避免网格交易亏损。

3. 结合资金使用率、收益率等指标进行风险控制。

4. 多品种蔓延,扩大资金运用面。

## 总结

本策略是一个可以自动调整的参数自适应网格策略,适用于震荡横盘的股票、数字货币和外汇品种,在Parameter参数的调整下,可以适应市场的不同行情,具有一定的实战价值。

||

## Overview

This strategy is an adaptive grid trading strategy based on quantitative trading platforms. It sets up automatic or manual grid trading ranges and places buy and sell orders at equal intervals within the range to implement grid trading. When the price breaks through the upper or lower limit of the grid, the strategy automatically adjusts the grid range.

## Strategy Principle  

1. Set upper and lower limit prices for the grid. Automatically calculate prices within a certain interval of the highest and lowest historical prices as the upper and lower limits, or manually set fixed upper and lower limit prices.

2. Calculate the price interval for each grid based on the upper and lower limit prices and the number of grids.  

3. Arrange multiple buy and sell points at equal intervals between the upper and lower limit prices as the grid.

4. When the market price breaks through the lower limit of the grid, place a buy order at the next grid below the grid where the latest unclosed order is located; when the market price breaks through the upper limit of the grid, place a sell order at the grid above the grid where the latest unclosed order is located.

5. Thus, continue to buy and sell operations within the upper and lower bounds of the grid. When the price trend reverses, the previous orders will gradually take profit or stop loss.

## Advantage Analysis  

1. Grid trading can profit in range-bound and oscillating markets. 

2. Adaptive adjustment of grid range can automatically adjust based on market fluctuations without manual intervention.  

3. The amount of capital investment can be preset to allocate risks across grids.

4. The logic is simple and easy to understand, and the parameters are flexible to adjust.

## Risk Analysis

1. Breaking through the upper and lower limits may lead to losses

   - Solution: Reasonably set stop loss position.

2. Trending markets may lead to repeated losses

   - Solution: Identify trends and timely suspend trading.  

3. Improper parameter settings

   - Solution: Adjust grid quantity and price interval parameters.  

## Optimization Directions

1. Use machine learning to predict price fluctuation range and trends to dynamically adjust grid parameters.  

2. Switch to trend trading in trending markets to avoid grid trading losses.

3. Incorporate risk control measures based on capital utilization rate, rate of return etc.  

4. Diversify across asset varieties to increase capital utilization.

## Conclusion  

This strategy is an adaptive grid strategy with automatically adjustable parameters, suitable for stocks, cryptocurrencies and foreign exchange products with fluctuating and range-bound movements. With adjusted Parameters, it can adapt to different market conditions and has practical value.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|(?Grid Bounds)Use Auto Bounds?|
|v_input_2|0|(Auto) Bound Source: Hi & Low|Average|
|v_input_3|250|(Auto) Bound Lookback|
|v_input_4|0.1|(Auto) Bound Deviation|
|v_input_5|0.285|(Manual) Upper Boundry(상단 가격)|
|v_input_6|0.225|(Manual) Lower Boundry(하단 가격)|
|v_input_7|30|(?Grid Lines)Grid Line Quantity(그리드 수)|
|v_input_8|100|(?Trading option)Initial balance(투자금액)|
|v_input_9|timestamp(15 March 2023 06:00)|Start Time|
|v_input_10|timestamp(31 Dec 2035 20:00)|End Time|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-24 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//hk4jerry

strategy("Grid Bot Backtesting", overlay=false, pyramiding=3000, close_entries_rule="ANY", default_qty_type=strategy.cash, initial_capital=100.0, currency="USD", commission_type=strategy.commission.percent, commission_value=0.025)
i_autoBounds    = input(group="Grid Bounds", title="Use Auto Bounds?", defval=true, type=input.bool)                             // calculate upper and lower bound of the grid automatically? This will theorhetically be less profitable, but will certainly require less attention
i_boundSrc      = input(group="Grid Bounds", title="(Auto) Bound Source", defval="Hi & Low", options=["Hi & Low", "Average"])     // should bounds of the auto grid be calculated from recent High & Low, or from a Simple Moving Average
i_boundLookback = input(group="Grid Bounds", title="(Auto) Bound Lookback", defval=250, type=input.integer, maxval=500, minval=0) // when calculating auto grid bounds, how far back should we look for a High & Low, or what should the length be of our sma
i_boundDev      = input(group="Grid Bounds", title="(Auto) Bound Deviation", defval=0.10, type=input.float, maxval=1, minval=-1)  // if sourcing auto bounds from High & Low, this percentage will (positive) widen or (negative) narrow the bound limits. If sourcing from Average, this is the deviation (up and down) from the sma, and CANNOT be negative.
i_upperBound    = input(group="Grid Bounds", title="(Manual) Upper Boundry(상단 가격)", defval=0.285, type=input.float)                      // for manual grid bounds only. The upperbound price of your grid
i_lowerBound    = input(group="Grid Bounds", title="(Manual) Lower Boundry(하단 가격)", defval=0.225, type=input.float)                      // for manual grid bounds only. The lowerbound price of your grid.
i_gridQty       = input(group="Grid Lines",  title="Grid Line Quantity(그리드 수)", defval=30, maxval=999, minval=1, type=input.integer)       // how many grid lines are in your grid
initial_balance = input(group="Trading option", title="Initial balance(투자금액)", defval=100, step=0.01)


start_time = input(group="Trading option",defval=timestamp('15 March 2023 06:00'), title='Start Time', type = input.time)
end_time = input(group="Trading option",defval=timestamp('31 Dec 2035 20:00'), title='End Time', type = input.time)
isAfterStartDate = true

tradingtime= (timenow - start_time)/(86400000*30)
yeartime=tradingtime/12


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
if isAfterStartDate
    for i = 0 to (array.size(gridLineArr) - 1)
        if close < array.get(gridLineArr, i) and not array.get(orderArr, i) and i < (array.size(gridLineArr) - 1)
            buyId = i
            array.set(orderArr, buyId, true)
            strategy.entry(id=tostring(buyId), long=true, qty=(initial_balance/(i_gridQty-1))/close, comment="#"+tostring(buyId))
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






var table table = table.new(position.top_right,6,8, frame_color = color.rgb(255, 255, 255),frame_width = 2,border_width = 2, border_color=color.rgb(255, 255, 255))
        


//제목
table.cell(table,0,0,"상단 라인 :", bgcolor=color.new(color.black,0),text_color =color.white)    
table.cell(table,0,1,"하단 라인 :",bgcolor=color.new(color.black,0),text_color =color.white)
table.cell(table,0,2,"그리드 수 :",bgcolor=color.new(color.black,0),text_color =color.white)
table.cell(table,0,3,"투자금액 :",text_color =color.white,bgcolor=color.new(color.black,0))
table.cell(table,0,4,"그리드당 투자금액 :",text_color =color.white,bgcolor=color.new(color.black,0))
//수치
table.cell(table,1,0, tostring(upperBound, '###.#####')+ "  USDT", bgcolor=color.new(#5a637e, 0),text_color =color.white)    
table.cell(table,1,1, tostring(lowerBound, '###.#####')+ "  USDT", bgcolor=color.new(#5a637e, 0),text_color =color.white)
table.cell(table,1,2, tostring(i_gridQty, '###'), bgcolor=color.new(#5a637e, 0),text_color =color.white)
table.cell(table,1,3, tostring(initial_balance,'###.##')+ "  USDT", bgcolor=color.new(#5a637e, 0),text_color =color.white)
table.cell(table,1,4, tostring(initial_balance/i_gridQty,'###.##')+ "  USDT", bgcolor=color.new(#5a637e, 0),text_color =color.white)

//제목
table.cell(table,2,0,"현재 포지션 :",text_color =color.white,bgcolor=color.new(color.black,0))
table.cell(table,2,1,"현재 포지션 평단가 :",text_color =color.white,bgcolor=color.new(color.black,0))
table.cell(table,2,2,"현재 포지션 수익 :",bgcolor=color.new(color.black,0),text_color =color.white)
table.cell(table,2,3,"현재 포지션 수익 % :",bgcolor=color.new(color.black,0),text_color =color.white)
table.cell(table,2,4,"현재 포지션 수수료 :",text_color =color.white,bgcolor=color.new(color.black,0))

//수치
table.cell(table,3,0, tostring(strategy.position_size) +   syminfo.basecurrency + "\n"  + tostring(strategy.position_size*strategy.position_avg_price/1, '###.##') + "USDT" ,text_color =color.white,bgcolor=color.new(#5a637e, 0))
table.cell(table,3,1, text=strategy.position_size>0 ? tostring(strategy.position_avg_price,'###.####')+ "  USDT" : "NOT TRADING",text_color =color.white,bgcolor=color.new(#5a637e, 0))
table.cell(table,3,2, tostring(strategy.openprofit, '###.##')+ "  USDT",text_color =color.white,bgcolor=strategy.openprofit > 0 ? color.teal : color.maroon)
table.cell(table,3,3, tostring(strategy.openprofit/initial_balance*100, '###.##')+ "%",text_color =color.white,bgcolor=strategy.openprofit > 0 ? color.teal : color.maroon)
table.cell(table,3,4, "-" + tostring(strategy.position_avg_price*strategy.position_size*0.025/100,'###.##')+ "  USDT",text_color =color.white,bgcolor=color.new(#5a637e, 0))

//제목
table.cell(table,4,0,"그리드 수익 :",text_color =color.white,bgcolor=color.new(color.black,0))
table.cell(table,4,1,"그리드 수익률 :",text_color =color.white,bgcolor=color.new(color.black,0))
table.cell(table,4,2,"총 수익 :", bgcolor=color.new(color.black,0),text_color =color.white)    
table.cell(table,4,3,"총 수익률 :",bgcolor=color.new(color.black,0),text_color =color.white)
table.cell(table,4,4,"현재 자산 :",bgcolor=color.new(color.black,0),text_color =color.white)


//수치
table.cell(table,5,0, tostring(strategy.netprofit, '###.#####')+ "USDT", text_color =color.white,bgcolor=strategy.netprofit > 0 ? color.teal : color.maroon)
table.cell(table,5,1, tostring((strategy.netprofit)/initial_balance*100/tradingtime, '####.##') + "%",text_color =color.white,bgcolor=strategy.netprofit > 0 ? color.teal : color.maroon)
table.cell(table,5,2, tostring(strategy.netprofit+strategy.openprofit, '###.##') + "  USDT",text_color =color.white,bgcolor=strategy.netprofit+strategy.openprofit > 0 ? color.teal : color.maroon)
table.cell(table,5,3, tostring((strategy.netprofit+strategy.openprofit)/initial_balance*100, '####.##') + "%",text_color =color.white,bgcolor=strategy.netprofit+strategy.openprofit > 0 ? color.teal : color.maroon)
table.cell(table,5,4, tostring(initial_balance+strategy.netprofit+strategy.openprofit, '###.##')+ "  USDT", text_color =color.white,bgcolor=color.new(#3d4d7c, 0))





// plot(strategy.initial_capital+ strategy.netprofit+strategy.openprofit, "총 수익 USDT",color=color.rgb(81, 137, 128))
// plot(initial_balance, "투자금액",color=color.rgb(81, 137, 128))
```

> Detail

https://www.fmz.com/strategy/442332

> Last Modified

2024-02-21 10:55:21
