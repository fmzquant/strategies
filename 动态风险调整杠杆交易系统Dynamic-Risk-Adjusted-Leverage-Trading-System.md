
> Name

动态风险调整杠杆交易系统Dynamic-Risk-Adjusted-Leverage-Trading-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15aeffa6244c92b3c43.png)



## Overview

This trading system called “Dynamic Risk-Adjusted Leverage Trading System” aims to manage trades based on current market volatility relative to historical average. The system calculates target number of open trades based on ATR indicator and adjusts leverage accordingly. It opens and closes trades using pyramiding approach, allowing multiple positions at the same time.

## Strategy Logic  

The system follows steps below:

1. Calculate 14-period ATR and normalize it by dividing it by closing price.

2. Calculate 100-day Simple Moving Average (SMA) of normalized ATR.

3. Calculate the ratio of normalized ATR to its 100-day SMA.  

4. Determine target leverage based on inverse of the ratio (2/ratio).

5. Calculate target number of open trades by multiplying target leverage by 5.

6. Plot target and current open trades on chart.

7. Check if there is chance to buy (if current open trades less than target) or close trade (if current open trades greater than target plus 1).

8. If chance to buy, open long trade and add to openTrades array.

9. If chance to close trade and trades exist in openTrades array, close most recent trade by referencing array and remove from array.

The system aims to capture trends by dynamically adjusting open trades and leverage based on market volatility. It uses array to track open trades for better control.

## Advantage Analysis

The advantages of this strategy:

1. Dynamic adjustment of leverage and position size based on market volatility changes can effectively manage risk.

2. Using ATR indicator to calculate target position size, which reflects market volatility, is a reasonable choice. 

3. Pyramiding with multiple positions can profit from trends.

4. Recording each trade in array enables explicit control of opening and closing trades.

5. The strategy has few parameters and is easy to implement and operate. 

6. The logic is clear and code structure is well organized for easy optimization and iteration.

## Risk Analysis

The risks of this strategy:

1. ATR only reflects past volatility, unable to predict future changes, may lead to improper leverage adjustment.

2. Pyramiding may accumulate losses when trend reverses. 

3. Array recording trades only applies to simple open/close operations. More complex data structure needed for complex logic.

4. Target leverage and position size settings need adjustment based on symbol specifics rather than fixed parameters.

5. Reliance on single indicator can be misleading. Other volatility indicators or machine learning algorithms can improve robustness.

## Optimization Directions

The strategy can be optimized in aspects below:

1. Add stop loss to actively cut loss when reaching stop loss level.

2. Optimize indicator parameters by testing different ATR periods. 

3. Try other entry strategies like fixed quantity entries and test the results.

4. Add other volatility metrics like Bollinger Bands WIDTH, KD, RSI etc. for combinational use.

5. Use machine learning models to predict volatility instead of simple smoothing. 

6. Optimize calculation of position size, such as using ATR multiples or volatility functions. 

7. Record more entry details like entry price, time etc. for strategy analysis and optimization.  

8. Add parameter optimization for auto-optimization to find optimum parameter sets.

## Conclusion

The strategy dynamically adjusts leverage and position size based on ATR to manage risk exposure during trends, and has certain advantages. But challenges like parameter setting difficulty and indicator optimization space remain for further improvements. Overall, the logic is clear and easy to operate and optimize, worthy of in-depth research and application.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-09 00:00:00
end: 2023-10-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("I11L - Risk Adjusted Leveraging", overlay=false, pyramiding=25, default_qty_value=20, initial_capital=20000, default_qty_type=strategy.percent_of_equity,process_orders_on_close=false, calc_on_every_tick=false)

atr = ta.atr(14) / close
avg_atr = ta.sma(atr,100)
ratio = atr / avg_atr

targetLeverage = 2 / ratio
targetOpentrades = 5 * targetLeverage

plot(targetOpentrades)
plot(strategy.opentrades)
isBuy = strategy.opentrades < targetOpentrades
isClose = strategy.opentrades > targetOpentrades + 1

var string[] openTrades = array.new_string(0)

if(isBuy)
    strategy.entry("Buy"+str.tostring(array.size(openTrades)),strategy.long)
    array.push(openTrades, "Buy" + str.tostring(array.size(openTrades)))

if(isClose)
    if array.size(openTrades) > 0
        strategy.close(array.get(openTrades, array.size(openTrades) - 1))
        array.pop(openTrades)
```

> Detail

https://www.fmz.com/strategy/429387

> Last Modified

2023-10-16 16:00:52
