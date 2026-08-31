
> Name

Moving-Average-Breakout-Strategy-433541

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/181fc3206aa0567c75d.png)

## Overview

This is a breakout trading strategy based on moving averages. It calculates the average price over a certain period as the moving average. When the price breaks through the moving average, trading signals are generated. 

## Strategy Logic

The strategy is mainly based on the moving average indicator. It uses the sma function to calculate the average closing price over a period to get the moving average. When the latest closing price breaks through the moving average upwards, a buy signal is generated. When the latest closing price breaks through the moving average downwards, a sell signal is generated.

Specifically, it defines the source (recent closing price) and length of the moving average in the strategy to get the moving average data sequence. Then it sets two conditions: create a long order when the price crosses above the moving average; create a short order when the price crosses below the moving average. After creating the orders, it also sets up profit taking and stop loss: it closes out part of the position when the order reaches a set profit ratio, and closes out the whole position when the order reaches the preset take profit or stop loss price.

## Advantage Analysis 

This is a simple and practical trend following strategy. It has the following advantages:

1. The logic is clear and easy to understand and adjust parameters.
2. The moving average is a commonly used and reliable technical indicator that can filter market noise and identify trends.  
3. Setting profit taking and stop loss at the same time can lock in some profits and control risks.
4. It can run with simple parameters only, suitable for quant entry level.

## Risk Analysis

Although the strategy has many advantages, there are still some risks:  

1. Moving averages tend to lag and may miss short-term reversals.
2. It does not consider the overall market environment and is prone to being trapped.
3. No parameter optimization may affect strategy performance.  
4. It may have some false signals as no other indicators are used for filtration.

To control these risks, we can optimize by combining other indicators for filtration, introduce short-term market trend judgment, or use machine learning methods to find the optimal parameter combinations.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Add other technical indicators for judgement to build a trading system and improve win rate. Indicators like MACD, KD can be introduced.

2. Add stop loss mechanisms. Use trailing stop loss or time-based stop loss to lock in profits and avoid wider losses.

3. Conduct parameter optimization. Change the moving average period parameter to find the best combination. Different types of moving averages can also be tested.  

4. Increase machine learning judgement. Use algorithms like random forest and LSTM combined with multiple factors to determine trend direction.

5. Optimize entry and exit logic. Set trend filtering conditions to avoid trades against the trend near its end. Consider using staged exiting logic.

## Summary 

Overall, this moving average breakout strategy is very suitable as a beginner quant trading strategy. It has simple logic, easy to understand and operate, with some practical effects. At the same time, it leaves much room for further testing and optimization. We can introduce more technical indicators and models on this basis to develop better quant strategies.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5000|Take Profit|
|v_input_2|5000|Stop Loss|
|v_input_3|2|Ratio at wich to take out a percentage off the table (take profit / ratio).|
|v_input_4|50|Percentage of position to take profit.|
|v_input_5_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|100|length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-11-22 08:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//  |-- Initialize Strategy Parameters:
strategy( 
     // |-- Strategy Title.
     title='[Tutorial][RS]Working with orders', 
     // |-- if shorttitle is specified, it will overwrite the name on the chart window.
     shorttitle='WwO', 
     // |-- if true it overlays current chart window, otherwise it creates a drawer to display plotting outputs.
     overlay=true, 
     // |-- Strategy unit type for default quantity, possible arguments: (strategy.cash, strategy.fixed, strategy.percent_of_equity)
     default_qty_type=strategy.cash, 
     // |-- Value to use for default trade size
     default_qty_value=1000, 
     // |-- Default Account size 
     initial_capital=100000, 
     // |-- Account Currency parameter
     currency=currency.USD
     )

//  |-- Strategy Profit/loss parameters:
profit = input(defval=5000, title='Take Profit')
loss = input(defval=5000, title='Stop Loss')
ratio = input(defval=2.0, title='Ratio at wich to take out a percentage off the table (take profit / ratio).')
percent = input(defval=50.0, title='Percentage of position to take profit.')
//  |-- Signal Parameters:
//  |
//  |-- Moving Average input source and length parameters.
src = input(defval=close)
length = input(defval=100)
//  |-- Moving Average Data series.
ma = sma(src, length)

//  |-- Condition for triggering a buy(long) order(trade).
if crossover(src, ma)
    //  |-- Create the order.
    strategy.order(id='Buy', long=true)
    //  |-- Issue a exit order to close a percentage of the trade when a specified ratio(take profit / ratio) is reached.
    strategy.exit(id='Buy Half Exit', from_entry='Buy', qty_percent=percent, profit=profit/ratio)
    //  |-- Issue a exit order to close the full position, when take profit or stop loss's are reached.
    strategy.exit(id='Buy Full Exit', from_entry='Buy', qty_percent=100, profit=profit, loss=loss)
if crossunder(src, ma)
    //  |-- Create the order.
    strategy.order(id='Sell', long=false)
    //  |-- Issue a exit order to close a percentage of the trade when a specified ratio(take profit / ratio) is reached.
    strategy.exit(id='Sell Half Exit', from_entry='Sell', qty_percent=percent, profit=profit/ratio)
    //  |-- Issue a exit order to close the full position, when take profit or stop loss's are reached.
    strategy.exit(id='Sell Full Exit', from_entry='Sell Half Exit', qty_percent=100, profit=profit, loss=loss)

//  |-- Output Functions.
plot(series=ma, title='MA', color=black)

```

> Detail

https://www.fmz.com/strategy/433541

> Last Modified

2023-11-28 13:50:49
