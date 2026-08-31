
> Name

基于金叉死叉交易策略Golden-Cross-Dead-Cross-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b986db224a47a7740b.png)

## Overview 

This strategy generates trading signals based on the golden cross and dead cross of the 30-day, 60-day and 200-day simple moving averages. When the short-term moving average crosses over the long-term moving average, a buy signal is generated. When the short-term moving average crosses below the long-term moving average, a sell signal is generated. The strategy combines the advantages of trend following and moving average crossovers, capturing both long-term trends and turning points.

## Strategy Logic

The strategy employs 3 simple moving averages with different timespans: 30-day, 60-day and 200-day. The 30-day line represents short-term trend, the 200-day line represents long-term trend, and the 60-day line serves as a reference. When the short-term trend line crosses over the long-term trend line, it indicates the market is shifting from consolidation to uptrend and generates a buy signal. When the short-term trend line crosses below the long-term trend line, it indicates the uptrend is shifting to consolidation and produces a sell signal.

The strategy also sets a 40-point stop-loss to control risks and a 40-point take-profit to lock in gains after entering a position.

## Advantage Analysis 

The advantages of this strategy include:

1. Combines the merits of trend following and instant signals, considering both long-term trends and short-term trading points.  

2. Crossover signals are clear, avoiding excessive repeated signals.

3. Reasonable stop-loss and take-profit setups effectively control per trade loss. 

4. Simple and clear logic, easy to understand and implement.

5. Mature and stable moving average techniques with widespread application.

## Risk Analysis

Some risks also exist:

1. Short-term stop-loss may be penetrated, unable to completely avoid losses.  

2. Golden cross and dead cross signals can turn out to be false breakouts. 

3. Difficult to set reasonable stop-loss and take-profit during market consolidation.

4. Parameter selection like period settings contain subjectivity that may impact strategy performance.

## Enhancement Directions

The strategy can be enhanced and optimized from the following aspects:

1. Improve stop-loss mechanisms using trailing stop loss, smoothed rate of change index etc. to lower risk exposure.  

2. Optimize parameter selections by testing more periods and finding optimal period combinations. 

3. Add position sizing rules to optimize overall profitability through capital management.  

4. Filter out false breakouts incorporating momentum indicators.  

5. Increase use of machine learning models and big data to find superior tactics.

## Conclusion

In summary, this article introduces a trading strategy based on moving average golden crosses and death crosses. It takes the crossovers of 30-day, 60-day and 200-day moving averages as trading signals, combines trend following and timing selection. Reasonable stop-loss and take-profit setups effectively control per trade loss. But risks like whipsaws and false breakouts remain. We can enhance the strategy from multiple aspects like improving stop-loss methods, parameter optimization, capital management to make it more stable and profitable.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Estrategia de Cruce de Medias Móviles", overlay=true)

// Medias móviles
ma30 = ta.sma(close, 30)
ma60 = ta.sma(close, 60)
ma200 = ta.sma(close, 200)

// Cruce de medias móviles
crossoverUp = ta.crossover(ma30, ma200)
crossoverDown = ta.crossunder(ma30, ma200)

// Señales de compra y venta
longCondition = crossoverUp
shortCondition = crossoverDown

// Ejecución de órdenes
if (longCondition)
    strategy.entry("Buy", strategy.long)
    strategy.exit("Cover", "Buy", stop=close - 40.000, limit=close + 40.000)
if (shortCondition)
    strategy.entry("Sell", strategy.short)
    strategy.exit("Cover", "Sell", stop=close + 40.000, limit=close - 40.000)

// Plot de las medias móviles
plot(ma30, color=color.blue, title="MA 30")
plot(ma60, color=color.orange, title="MA 60")
plot(ma200, color=color.green, title="MA 200")

// Condiciones para cerrar la posición contraria
if (strategy.position_size > 0)
    if (crossoverDown)
        strategy.close("Buy")
if (strategy.position_size < 0)
    if (crossoverUp)
        strategy.close("Sell")
```

> Detail

https://www.fmz.com/strategy/442336

> Last Modified

2024-02-21 11:09:08
