
> Name

动态网格交易策略Dynamic-Grid-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/20eecff5cbdbffce8fa.png)

## Overview

The dynamic grid trading strategy calculates the moving average line and its upper and lower tracks to dynamically set the grid trading range. When the price breaks through the grid range, trading signals are issued at fixed intervals set by the grid lines to achieve profitability.

## Strategy Principle 

The strategy first calculates the moving average line of the defined period n and the upper and lower tracks of the moving average line. The upper track is the moving average line * (1 + input parameter std), and the lower track is the moving average line * (1 - input parameter std). This constructs a dynamically adjusted trading range zone.

Then within the range zone, we define m evenly spaced grid lines. When prices rise and break through a grid line, a long signal is issued at that grid line; when prices fall and break through a grid line, a closing signal is issued at the previous grid line corresponding to that grid line. Through this reverse operation, profits can be made when prices fluctuate. 

Specifically, we use a bool array order_array to record the trading status of each grid line. When a grid line triggers a long condition, the corresponding state in order_array is set to true, indicating that the grid line already has a position. When prices fall and break the grid line, the state of the previous grid line in order_array is set to false and a closing signal is issued.

## Advantage Analysis

The strategy has the following advantages:

1. Using moving averages to build a dynamically adjusted trading range can adjust the range based on market volatility to make the strategy more adaptable to the market.

2. The grid design can automatically take profit and stop loss to prevent loss magnification caused by extreme market conditions. 

3. The grid quantity and capital allocation adopt equal spacing and equal allocation, which can well control the size of single positions and reduce the risk of single positions.

4. Long and close signals settings are reasonable to trade along the trend, and timely take profits and stop losses.

## Risk Analysis  

The strategy also has some risks:

1. When the market is weak for a long term and fails to break through the grid lines, the strategy will fall into aimless oscillating trading, and alternating longs and shorts may cause capital erosion in the account.

2. The selected parameters std and number of grids may not be completely reasonable, and need to be determined according to analysis of different trading varieties. If the parameters are improperly set, it will lead to excessively large or small trading zones and grids, affecting the effectiveness of the strategy.  

3. The strategy does not take into account some extreme market conditions, such as price gaps, short-term explosive rises or falls, etc. These conditions may cause the strategy to break through multiple grids, resulting in losses beyond risk control.

## Optimization Directions

The strategy can also be optimized in the following aspects:

1. Machine learning algorithms can be introduced to train models to predict upper and lower tracks of moving averages, making trading zones more intelligent and dynamic.  

2. Parameters such as the number of grids, capital allocation ratio, position size, etc. can be optimized according to the characteristics of different trading targets using adaptive parameters.  

3. Conditional orders can be set to set stop-loss orders in advance at a certain distance from grid lines to play the role of prior stop-loss and control losses in extreme market conditions.

4. Design an exception handling mechanism for extreme market conditions, such as increasing initial position size, skipping intermediate grids directly for stop loss, etc., which can cope with situations like price gaps.

## Summary 

The dynamic grid trading strategy is designed reasonably as a whole. It can construct an automatic take profit stop loss system with grids which is suitable for trading varieties with frequent price fluctuations. However, there are still certain market risks in this strategy. Parameters and exceptional situations need to be optimized before the strategy becomes more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|300|(?Moving Average Conditions)Moving Average Length|
|v_input_float_1|0.03|(?Grid Conditions)Upper and Lower Grid Deviation|
|v_input_int_2|15|Grid Line Quantity|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-31 00:00:00
end: 2023-11-30 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('Grid Trading Strategy', overlay=true)

// Input
ma_length = input.int(300, 'Moving Average Length',group = 'Moving Average Conditions', step = 10)
std = input.float(0.03, title='Upper and Lower Grid Deviation', group='Grid Conditions', step = 0.01)
grid = input.int(15, maxval=15, title='Grid Line Quantity', group='Grid Conditions')

// Moving Average
ma = ta.sma(close, ma_length)
upper_bound = ma * (1 + std)
lower_bound = ma * (1 - std)
grid_width = (upper_bound - lower_bound) / (grid - 1)
grid_array = array.new_float(0)
for i = 0 to grid - 1 by 1
    array.push(grid_array, lower_bound + grid_width * i)
var order_array = array.new_bool(grid, false)    
strategy.initial_capital = 10000
// Entry Conditions
for i = 0 to grid - 1 by 1
    if close < array.get(grid_array, i) and not array.get(order_array, i)
        buy_id = i
        array.set(order_array, buy_id, true)
        strategy.entry(id=str.tostring(buy_id), direction=strategy.long, comment='#Long ' + str.tostring(buy_id))
    if close > array.get(grid_array, i) and i!=0
        if array.get(order_array, i-1)
            sell_id = i - 1
            array.set(order_array, sell_id, false)
            strategy.close(id=str.tostring(sell_id), comment='#Close ' + str.tostring(sell_id))

plot(grid > 0 ? array.get(grid_array,0) : na, color = color.yellow, transp = 10)
plot(grid > 1 ? array.get(grid_array,1) : na, color = color.yellow, transp = 10)
plot(grid > 2 ? array.get(grid_array,2) : na, color = color.yellow, transp = 10)
plot(grid > 3 ? array.get(grid_array,3) : na, color = color.yellow, transp = 10)
plot(grid > 4 ? array.get(grid_array,4) : na, color = color.yellow, transp = 10)
plot(grid > 5 ? array.get(grid_array,5) : na, color = color.yellow, transp = 10)
plot(grid > 6 ? array.get(grid_array,6) : na, color = color.yellow, transp = 10)
plot(grid > 7 ? array.get(grid_array,7) : na, color = color.yellow, transp = 10)
plot(grid > 8 ? array.get(grid_array,8) : na, color = color.yellow, transp = 10)
plot(grid > 9 ? array.get(grid_array,9) : na, color = color.yellow, transp = 10)
plot(grid > 10 ? array.get(grid_array,10) : na, color = color.yellow, transp = 10)
plot(grid > 11 ? array.get(grid_array,11) : na, color = color.yellow, transp = 10)
plot(grid > 12 ? array.get(grid_array,12) : na, color = color.yellow, transp = 10)
plot(grid > 13 ? array.get(grid_array,13) : na, color = color.yellow, transp = 10)
plot(grid > 14 ? array.get(grid_array,14) : na, color = color.yellow, transp = 10)
```

> Detail

https://www.fmz.com/strategy/433920

> Last Modified

2023-12-01 14:41:57
