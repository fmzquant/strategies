
> Name

Dual-Moving-Average-Crossover-Strategy-437640

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18d6d545a7e83002ff8.png)

### Overview

This strategy uses simple moving average crossovers and average true range indicator to generate buy and sell signals. It belongs to trend following strategies. It mainly uses 50-day and 100-day moving average crossovers to determine the trend and sets stop loss based on ATR to control risks.  

### Strategy Logic   

1. Calculate 50-day simple moving average SMA1 and 100-day simple moving average SMA2
2. When SMA1 crosses over SMA2, a buy signal is generated. When SMA1 crosses below SMA2, a sell signal is generated.  
3. Calculate 14-day ATR 
4. ATR multiplied by a set factor is used as stop loss point
5. When a buy signal is triggered, the closing price minus the stop loss point is the stop loss sell point. When a sell signal is triggered, the closing price plus the stop loss point is the stop loss buy point.

It can be seen that this strategy mainly relies on the trend judging capability of moving averages and the risk control capability of ATR. The logic is simple and easy to understand and implement.  

### Advantages

1. Simple logic easy to implement, suitable for beginners
2. Moving averages can effectively track trends 
3. ATR stop loss can effectively control losses from individual black swan events
4. Parameters can be easily adjusted for different market environments

### Risks

1. Many false signals may be triggered during range-bound markets, missing reversal points
2. ATR may not react sensitively enough to fast changing markets, leading to larger than expected losses  
3. The parameter settings and ATR multiplier rely on experience. Improper settings may affect strategy performance
4. The dual moving averages themselves have lagging effect, may miss turning points

Risk Management:

1. Shorten moving average periods to make the indicator more sensitive 
2. Dynamically adjust ATR multiplier for more flexible stop loss
3. Add other indicators to filter false signals
4. Operate based on larger time frame structure judgments 

### Optimization Directions 

1. Try other types of moving averages, like EMAs that filter better
2. Consider dynamic stop loss with Keltner Channels etc. to replace ATR
3. Add supporting indicators like volume to filter signals
4. Identify trend key points with concepts like Elliott Waves, support resistance etc.  

### Summary

This is a typical trend following strategy, using moving averages to determine trend direction and ATR stop loss to control risks. The logic is simple and easy to grasp. But it has certain lagging and false signal risks. Improvements can be made through parameter tuning, indicator optimization, incorporating more factors etc. to make the strategy more adaptive. Overall this strategy is suitable for beginner practice and optimization, but need to be careful when apply it in actual trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|50|50 SMA Length|
|v_input_int_2|100|100 SMA Length|
|v_input_int_3|14|ATR Length|
|v_input_int_4|4|ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-27 00:00:00
end: 2024-01-03 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("SMA and ATR Strategy", overlay=true)

// Step 1. Define strategy settings
lengthSMA1 = input.int(50, title="50 SMA Length")
lengthSMA2 = input.int(100, title="100 SMA Length")
atrLength = input.int(14, title="ATR Length")
atrMultiplier = input.int(4, title="ATR Multiplier")

// Step 2. Calculate strategy values
sma1 = ta.sma(close, lengthSMA1)
sma2 = ta.sma(close, lengthSMA2)
atr = ta.atr(atrLength)

// Step 3. Output strategy data
plot(sma1, color=color.blue, title="50 SMA")
plot(sma2, color=color.red, title="100 SMA")

// Step 4. Determine trading conditions
longCondition = ta.crossover(sma1, sma2)
shortCondition = ta.crossunder(sma1, sma2)

longStopLoss = close - (atr * atrMultiplier)
shortStopLoss = close + (atr * atrMultiplier)

// Step 5. Execute trades based on conditions
if (longCondition)
    strategy.entry("Buy", strategy.long)
    strategy.exit("Sell", "Buy", stop=longStopLoss)

if (shortCondition)
    strategy.entry("Sell", strategy.short)
    strategy.exit("Buy", "Sell", stop=shortStopLoss)

```

> Detail

https://www.fmz.com/strategy/437640

> Last Modified

2024-01-04 15:03:14
