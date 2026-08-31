
> Name

RSI-Indicator-Grid-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12468a2db0101907594.png)

## Overview
The RSI Indicator Grid Trading Strategy integrates the RSI and CCI technical indicators with a fixed grid trading approach. It uses the values of RSI and CCI indicators to determine entry signals, and sets take profit orders and additional grid orders based on a fixed profit ratio and number of grids. The strategy also incorporates a hedging mechanism against volatile price movements.

## Strategy Logic  
### Entry Conditions
Long signals are generated when the 5-minute and 30-minute RSI are below threshold values, and the 1-hour CCI is below the threshold. The current close price is recorded as the entry price, and the size of the first order is calculated based on account equity and the number of grids.

### Take Profit Conditions
The take profit price level is calculated using the entry price and the target profit ratio. Profit take orders are placed at this price level.

### Grid Entry Conditions
After the first order, remaining fixed-size grid orders are placed one by one until the specified number of grids is reached.

### Hedging Mechanism 
If price increases beyond the set hedging threshold percentage from entry, all open positions are hedged by closing them.

### Reversal Mechanism
If price drops beyond the set reversal threshold percentage from entry, all pending orders are cancelled to await new entry opportunities.

## Advantage Analysis
- Combines RSI and CCI indicators to improve profitability 
- Fixed grid targets profit locking to increase certainty
- Integrated hedging guards against volatile price swings
- Reversal mechanism cuts losses  

## Risk Analysis
- False signals from indicators
- Price spikes penetrate hedging thresholds 
- Failure to re-enter on reversals

These can be mitigated by adjusting indicator parameters, expanding hedging range, reducing reversal range.

## Enhancement Areas
- Test more indicator combinations
- Research adaptive profit taking  
- Optimize grid logic

## Conclusion
The RSI Grid Strategy determines entries with indicators, and locks in stable profits using fixed grid take profits and entries. It also incorporates volatility hedging and re-entry after reversals. The integration of multiple mechanisms helps reduce trading risks and increase profitability rates. Further optimizations of indicators and settings can improve live performance.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Custom RSI/CCI Strategy with Fixed Grid", shorttitle="INVESTCOIN_RSI_CCI_Fixed_Grid", overlay=true)

// Input parameters
input_rsi_5min_value = 55
input_rsi_30min_value = 65
input_cci_1hr_value = 85
input_profit_target_percent = 0.6 // Target profit in percentage
input_grid_size = 15 // Number of orders in grid
input_hedging_percent = 20 // Percentage price change for hedging
input_first_order_offset = 0.2 // Offset for the first order in percentage
input_reversal_percent = 0.4 // Percentage price change for reversal

// Calculating the RSI and CCI values
rsi_5min = ta.rsi(close, 5)
rsi_30min = ta.rsi(close, 30)
cci_1hr = ta.cci(close, 60)

// Define strategy conditions based on the provided screenshot
long_condition = (rsi_5min < input_rsi_5min_value) and (rsi_30min < input_rsi_30min_value) and (cci_1hr < input_cci_1hr_value)

// Plot signals
plotshape(series=long_condition, title="Long Entry Signal", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)

// Initialize a variable to store the entry price
var float entry_price = na

// Initialize a variable to store the profit target
var float profit_target = na

// Hedge condition based on price change percentage
var float hedge_price = na

// Initialize a variable to count the total number of orders
var int total_orders = 0

// Calculate the initial order size based on account equity and grid size
var float initial_order_size = 1 / input_grid_size / 100

// Entry orders with fixed size
if (long_condition and total_orders < 9000)
    // Place first order with an offset
    if total_orders == 0
        strategy.order("First Long", strategy.long, qty=initial_order_size, limit=close * (1 - input_first_order_offset / 100))
    total_orders := total_orders + 1
    
    // Place remaining grid orders
    for i = 1 to input_grid_size - 1
        if (total_orders >= 9000)
            break // Stop if max orders reached
        strategy.entry("Long_" + str.tostring(i), strategy.long, qty=initial_order_size)
        total_orders := total_orders + 1

// Calculate the profit target in currency
if (long_condition)
    entry_price := close // Store the entry price when the condition is true

if (not na(entry_price))
    profit_target := entry_price * input_profit_target_percent / 100 // Calculate the profit target

// Setting up the profit target
if (not na(profit_target))
    strategy.exit("Take Profit", "Long", limit=entry_price + profit_target)

// Hedge by closing all positions if the price increases by the hedging percentage
if (strategy.position_size > 0)
    hedge_price := close * (1 + input_hedging_percent / 100)

if (not na(hedge_price) and close >= hedge_price)
    strategy.close_all(comment="Hedging")


// Reversal condition based on the price change percentage
var float reversal_price = na

if (strategy.position_size > 0 and total_orders > 1) // Check if at least one grid order has been placed
    reversal_price := entry_price * (1 - input_reversal_percent / 100)

// Cancel trades and wait for a new entry point if the price reverses by the specified percentage
if (not na(reversal_price) and close <= reversal_price)
    strategy.cancel_all()
    total_orders := 0 // Reset the total orders count after cancellation
```

> Detail

https://www.fmz.com/strategy/440319

> Last Modified

2024-01-29 11:42:46
