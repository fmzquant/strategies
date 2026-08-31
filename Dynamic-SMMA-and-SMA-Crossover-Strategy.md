
> Name

Dynamic-SMMA-and-SMA-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/157ca95d206025fec65.png)

#### Overview

This strategy uses the crossover signals between the 50-period Smoothed Moving Average (SMMA) and 20-period Simple Moving Average (SMA) to determine entries and exits. It generates buy signals when the fast SMA line crosses above the slow SMMA line, and sell signals when the SMA crosses below the SMMA. At the same time, the strategy presets fixed take profit and dynamic stop loss levels to lock in profits and control risk.  

#### Strategy Logic

1. Calculate and plot the 50-period SMMA and 20-period SMA.
2. When the SMA crosses above the SMMA from below, a buy signal is generated. Conversely, when the SMA crosses below the SMMA from above, a sell signal is generated.
3. Upon buy and sell signal occurrences, establish "Buy" and "Sell" positions respectively.  
4. Set a fixed take profit level of 150 ticks for each position.
5. Set a dynamic stop loss level at the closing price of the next bar after the signal bar.
6. If price hits the take profit level, take profit occurs. If price hits stop loss level, stop loss is triggered.

#### Strengths  

1. Dual moving average strategies are easy to operate with simple principles and easy to understand.
2. SMMA is an improvement over SMA to better capture trends.
3. Combining SMA and SMMA of different periods helps filter noise while catching trends.
4. Adopting dynamic stop loss can adjust stop level based on market changes to effectively control risks. 
5. Preset take profit level helps lock in profits in a timely manner.

#### Risks

1. Dual moving average strategies tend to generate false signals and be whipsawed. Signal filtering can be used to avoid over-trading.
2. Fixed take profit may miss strong trends. Moving take profit or profit ratio based take profit can be considered.
3. Dynamic stop loss may get too close to market price in volatile conditions. Appropriate widening of stop loss range should be considered.  
4. Differences across products and timeframes need attention.

#### Optimization Directions   

1. Test combinations of different parameters (cycle periods, filter criteria etc) to find optimal.

2. Incorporate other factors like volume spikes to filter signals.
   
3. Employ parameter optimization tools to find optimum parameters.

4. Consider integrating other take profit methods like trailing stop or profit ratio based exits.

5. Calculate dynamic stop loss range based on market volatility.  

#### Conclusion
This strategy has relatively simple logic, capturing trend directions via dual moving averages. Flexible usage of fixed take profit and dynamic stop loss for profit taking and risk control strikes a balance between risk and reward. Further parameter and logic optimization can adapt this strategy to a wider range of market conditions.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-26 00:00:00
end: 2024-02-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("50 SMMA and 20 SMA Crossover with TP and SL", overlay=true)

// Define 50 SMMA
smma50 = sma(close, 50)

// Define 20 SMA
sma20 = sma(close, 20)

// Plotting the SMMA and SMA
plot(smma50, color=color.blue, title="50 SMMA")
plot(sma20, color=color.red, title="20 SMA")

// Initialize TP and SL variables
tp = 150
var float sl_price = na

// Buy Signal
buySignal = crossover(sma20, smma50)
strategy.entry("Buy", strategy.long, when = buySignal)
strategy.exit("Take Profit/Stop Loss", from_entry="Buy", profit=tp, loss=sl_price)

// Sell Signal
sellSignal = crossunder(sma20, smma50)
strategy.entry("Sell", strategy.short, when = sellSignal)
strategy.exit("Take Profit/Stop Loss", from_entry="Sell", profit=tp, loss=sl_price)

// Update stop loss level on every crossover
if (buySignal or sellSignal)
    sl_price := close[bar_index + 1]

// Plot Stop Loss level
plotshape(series=sl_price != na, title="Stop Loss Level", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

```

> Detail

https://www.fmz.com/strategy/440810

> Last Modified

2024-02-02 11:38:08
