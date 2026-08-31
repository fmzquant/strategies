
> Name

基于MA-VWAP交叉的灵活止损止盈策略Flexible-MA-VWAP-Crossover-Strategy-with-Stop-Loss-Take-Profit

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b0346e70d6d2afca54.png)


## Overview
This strategy identifies crossovers between fast moving average, slow moving average and volume weighted average price (VWAP) to capture potential price movements. It triggers buy signals when fast MA crosses above VWAP and slow MA, and sell signals when fast MA crosses below VWAP and slow MA.  

## Strategy Logic
The strategy combines the strengths of moving averages and VWAP. Moving averages can effectively filter out market noise and determine trend direction. VWAP reflects intentions of big money more precisely. Fast MA captures short-term trend while slow MA filters out false signals. When fast MA crosses above slow MA and VWAP, it indicates bullish short-term trend and triggers buy signals. Below crossover triggers sell signals.   

## Advantage Analysis 
- Dual MA filter reduces false signals
- VWAP accurately judges intentions of big money
- Flexible MA parameters adapt to different periods  
- Effective risk control with stop loss/take profit

## Risk Analysis
- Whipsaw markets may generate multiple false signals
- Inaccurate VWAP parameters fail to judge fund intent   
- Stop loss too tight unable to trace trends, too loose risks excess

## Optimization Directions
- Optimize MA and VWAP parameters for different market conditions
- Additional filter signals with RSI  
- Dynamic stop loss/take profit ratios  

## Conclusion
This strategy integrates the strengths of moving averages and VWAP, identifies crossover signals through dual filtering, and effectively controls risks with flexible stop loss/take profit mechanisms. It is a recommended trend following strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Fast MA Length|
|v_input_2|21|Slow MA Length|
|v_input_3|14|VWAP Length|
|v_input_4|true|Stop Loss (%)|
|v_input_5|2|Take Profit (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-12-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Flexible MA VWAP Crossover Strategy with SL/TP", shorttitle="MA VWAP Crossover", overlay=true)

// Input parameters
fast_length = input(9, title="Fast MA Length", minval=1)
slow_length = input(21, title="Slow MA Length", minval=1)
vwap_length = input(14, title="VWAP Length", minval=1)

// Stop Loss and Take Profit inputs
stop_loss_percent = input(1.0, title="Stop Loss (%)", minval=0.1, maxval=5.0, step=0.1)
take_profit_percent = input(2.0, title="Take Profit (%)", minval=1.0, maxval=10.0, step=0.1)

// Calculate moving averages
fast_ma = sma(close, fast_length)
slow_ma = sma(close, slow_length)
vwap = sma(close * volume, vwap_length) / sma(volume, vwap_length)

// Buy and sell conditions
buy_condition = crossover(fast_ma, vwap) and crossover(fast_ma, slow_ma)
sell_condition = crossunder(fast_ma, vwap) and crossunder(fast_ma, slow_ma)

// Plot the moving averages
plot(fast_ma, title="Fast MA", color=color.blue)
plot(slow_ma, title="Slow MA", color=color.red)
plot(vwap, title="VWAP", color=color.purple)

// Plot buy and sell signals
plotshape(buy_condition, style=shape.triangleup, location=location.belowbar, color=color.green, title="Buy Signal")
plotshape(sell_condition, style=shape.triangledown, location=location.abovebar, color=color.red, title="Sell Signal")

// Define stop loss and take profit levels
var float stop_loss_price = na
var float take_profit_price = na

if (buy_condition)
    stop_loss_price := close * (1 - stop_loss_percent / 100)
    take_profit_price := close * (1 + take_profit_percent / 100)

// Strategy entry and exit with flexible SL/TP
strategy.entry("Buy", strategy.long, when = buy_condition)

if (sell_condition)
    strategy.exit("SL/TP", from_entry = "Buy", stop = stop_loss_price, limit = take_profit_price)

```

> Detail

https://www.fmz.com/strategy/435958

> Last Modified

2023-12-20 14:06:18
