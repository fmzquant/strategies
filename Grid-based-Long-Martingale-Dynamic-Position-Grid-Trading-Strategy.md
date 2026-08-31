
> Name

Grid-based-Long-Martingale-Dynamic-Position-Grid-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15857ddb0720d9acfd9.png)

## Strategy Overview

This strategy is a grid-based long Martingale dynamic position grid trading strategy. The main idea is to dynamically adjust the position size based on the number of existing positions when the price hits grid lines, while setting a maximum total number of open positions. When the price rises and hits the take profit level, all long positions are closed.

## Strategy Principles

1. Divide the price into evenly spaced grids based on the "Grid Size" parameter.
2. Place long limit orders at each grid line.
3. When the current price hits a grid line:
   - If the current number of open positions is 0, open a position with the "start_lot" size.
   - If the current number of open positions is greater than 0 and the current grid price is lower than the previous entry price, open a new long position at the current grid price with a size that is "multifactor" times the previous position size.
4. The maximum number of open positions is controlled by the "Max Open Orders" parameter.
5. After opening a position, set a take profit level at "TakeProfit" points above the average entry price.
6. When the current price hits the take profit level, close all long positions and reset parameters.

In this way, the position size gradually increases during downtrends, and profits are taken when the price recovers and hits the take profit level.

## Strategy Advantages

1. Dynamic position sizing: Dynamically adjust the position size for each entry based on the current number of open positions. This gradually increases exposure during continued downtrends, enhancing the strategy's profit potential.
2. Flexible parameters: The "Grid Size", "start_lot", "multifactor" and other parameters allow flexible control over grid size, initial position size, position scaling factor, etc.
3. Controllable risk: The "Max Open Orders" parameter controls the maximum number of open positions to prevent overexposure. At the same time, setting a take profit level allows timely profit taking to control drawdowns.

## Strategy Risks

1. No stop loss: The strategy does not have stop losses. If the price continues breaking down, it may face significant loss risks.
2. Parameter sensitivity: The strategy's performance is quite sensitive to parameters like "multifactor". Inappropriate parameters may bring risks.
3. High volatility: The strategy may frequently open and close positions during highly volatile market conditions, potentially incurring extra slippage and commission costs.

Risk control measures:
1. Cautiously set parameters like "multifactor" based on risk tolerance. Stop loss logic can be added to the code if necessary.
2. Carefully backtest and paper trade to select appropriate parameters.
3. Evaluate the strategy's performance in highly volatile market conditions. If necessary, risk can be mitigated by adjusting parameters or restricting usage scenarios.

## Optimization Directions

1. Add trend detection: Determine the trend based on price action when opening positions. If the trend appears bearish, avoid opening new long positions to reduce risk.
2. Dynamic take profit: Dynamically adjust the take profit level based on price action, volatility and other indicators. Raise the take profit level when the trend is strong to enhance profitability.
3. Optimize position management: When adding to positions, besides considering the scaling factor, also incorporate account balance, current exposure, etc. to more precisely control position sizing.
4. Combine with other signals: Integrate grid trading with other trend detection, oscillation detection and other indicator signals to comprehensively judge the market and guide trading.

These optimizations can improve the strategy's adaptability to better capture market moves, enhance profit potential and robustness. At the same time, more precise position and risk management can reduce drawdowns and improve the risk-reward ratio.

## Summary

This grid-based long Martingale dynamic position grid trading strategy attempts to lower the average holding price during downtrends by gradually adding positions, and takes profits when prices rise. The strategy offers strong flexibility through parameter settings. However, it also carries significant potential risks that require careful assessment and control. If trend detection, dynamic take profit, position optimization and other features can be added, the strategy's performance may be further enhanced. The strategy realizes functions to automatically open and add positions when prices hit grid lines, and automatically close all positions when prices hit the take profit level. The overall logic is relatively clear, but there is room for optimization. The strategy is suitable for cautious use after thoroughly evaluating market conditions and parameters.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_11|0.5|Grid Size|
|v_input_1|0|(?TimeFrame)Started TimeFrame: 15|5|1|30|1H|4H|1D|1W|1M|
|v_input_2|3|(?Strategy Settings)Slippage by open order|
|v_input_3|0.01|Start lot|
|v_input_4|2|Started average since Order #|
|v_input_5|10|Max Open Orders|
|v_input_6|0|Direction: Only Long|Only Short|Long & Short|
|v_input_7|0|Type input: By Close|By grid line|
|v_input_8|1.5|Multifactor|
|v_input_9|2|Number of precision|
|v_input_10|true|TakeProfit|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-16 00:00:00
end: 2024-03-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © lagerta13
//@version=4
strategy("Grid A.", shorttitle="Grid(A)", overlay=true, format=format.price, precision=4, pyramiding = 100)

input_tf=input("15", "Started TimeFrame", 
 options = ["1", "5", "15", "30", "1H", "4H", "1D", "1W", "1M"],
 group="TimeFrame") 

// avg_tf=input("5", "Average TimeFrame", 
//  options = ["1", "5", "15", "30", "1H", "4H", "1D", "1W", "1M"],
//  group="TimeFrame")

slip_Hilo = input(3.0, "Slippage by open order", group="Strategy Settings")
start_lot = input(0.01, "Start lot", group="Strategy Settings")
start_avg = input(2, "Started average since Order #", group="Strategy Settings")
MaxTrades_Hilo = input(10, "Max Open Orders", group="Strategy Settings")
dropdown_selection = input("Only Long", "Direction", options=["Only Long", "Only Short", "Long & Short"],
 group="Strategy Settings")
type_selection = input("By Close", "Type input", options=["By Close", "By grid line"],
 group="Strategy Settings")

multifactor = input(1.5, "Multifactor", group="Strategy Settings")
precision_lot = input(2, "Number of precision", group="Strategy Settings")
take_profit = input(1, "TakeProfit", group="Strategy Settings")

// PipStep_S1 = input(30)
// PipStepX_S1 = input(1.2)
// dinamicStep = input(false, "Dinamic Step for AVG")

get_size_lot_order(number, multi, prec, avg_from, lot_from) =>
	res = lot_from
	for i = 1 to number
		if i >= avg_from
			res := round(res * multi, precision = prec)
	res

var float[] entry_levels = array.new_float(MaxTrades_Hilo + 1)

for i = 0 to MaxTrades_Hilo
    array.push(entry_levels, 0)

gridSize = input(0.5, title="Grid Size")
gridLevels = int(close / gridSize) * gridSize

var int num_open_orders = 0
var float sum_price_orders = 0
var float entry_lot = 0

buy_condition = num_open_orders < MaxTrades_Hilo and gridLevels[0]<gridLevels[1] and dropdown_selection != "Only Short"

if (buy_condition)

    if num_open_orders == 0
        lot = get_size_lot_order(num_open_orders, multifactor, precision_lot, start_avg, start_lot)
        sum_price_orders := sum_price_orders + gridLevels[1] * lot 

        strategy.entry("buy" + tostring(num_open_orders), true, qty=lot, limit=gridLevels[1]+slip_Hilo) 
        // strategy.order("buy" + tostring(num_open_orders), true, qty=lot, limit=gridLevels[1]) 

        array.set(entry_levels, num_open_orders, gridLevels[1])

        entry_lot := entry_lot + lot
        num_open_orders := num_open_orders + 1

    else
        if gridLevels[1] < (array.get(entry_levels, num_open_orders - 1))
            lot = get_size_lot_order(num_open_orders, multifactor, precision_lot, start_avg, start_lot)
            sum_price_orders := sum_price_orders + gridLevels[1] * lot 
            entry_lot := entry_lot + lot

            strategy.entry("buy" + tostring(num_open_orders), true, qty=lot, limit=gridLevels[1]+slip_Hilo) 

            // +" S:" + tostring(sum_price_orders / (entry_lot)) + " Prev:" + tostring(array.get(entry_levels, num_open_orders - 1))
            // strategy.order("buy" + tostring(num_open_orders), true, qty=lot, limit=gridLevels[1]) 
            array.set(entry_levels, num_open_orders, gridLevels[1])

            num_open_orders := num_open_orders + 1


take = sum_price_orders > 0 and take_profit + (sum_price_orders / entry_lot) < high ? high : na
plotshape(take, location = location.belowbar, color = color.white)


strategy.exit("tp", comment = "TP " + tostring(num_open_orders), qty = entry_lot, limit = take_profit + (sum_price_orders / entry_lot))


if sum_price_orders > 0 and take_profit + (sum_price_orders / entry_lot) <= high
    num_open_orders := 0
    sum_price_orders := 0
    entry_lot := 0
    for i = 0 to MaxTrades_Hilo
        array.set(entry_levels, i, 0)

plot(gridLevels, color=color.blue, style=plot.style_circles, linewidth=2)

 
```

> Detail

https://www.fmz.com/strategy/445826

> Last Modified

2024-03-22 15:12:33
