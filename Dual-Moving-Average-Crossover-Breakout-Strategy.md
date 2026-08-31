
> Name

Dual-Moving-Average-Crossover-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/350c34c3e3e6336c01.png)



### Overview  

This strategy generates LONG or SHORT entry signals when the fast 30-day simple moving average and the slow 33-day simple moving average of the stock price cross over. It exits the position immediately when opposite signal occurs. This can effectively capture the change of trends.

### Strategy Principle 

The core of this strategy is to calculate the fast 30-day MA and slow 33-day MA. The fast line can respond to price changes faster while the slow line has a better filtering effect. When the fast line breaks through the slow line upwards, a buy signal is generated. This indicates the price starts to rise and the fast line has responded while the slow line still lags. When the fast line breaks through the slow line downwards, a sell signal is generated. This indicates the price starts to decline while the fast line has responded but the slow line still lags.  

Through such fast and slow MA crossover design, it can generate trading signals when a new trend starts, and exits at opposite signals, effectively capturing mid-to-long term price trends. At the meantime it also avoids being misguided by too much market fluctuations.

### Advantage Analysis   

The strategy has the following advantages:

1. Using simple moving average, it’s easy to understand and implement
2. The combination of fast line and slow line can respond to price changes quickly and also has filtering effect 
3. The golden cross and death cross signals are simple and clear, easy to operate
4. Can effectively capture mid-to-long term trends
5. Exits quickly at opposite signals to control risks

### Risk Analysis

There are also some risks for this strategy:   

1. It may generate multiple false signals when price is range-bound, causing over-trading
2. Cannot handle extreme price swings caused by unexpected events very well 
3. Parameters like MA periods may need optimization, improper settings will affect strategy performance  
4. Trading cost impacts profitability to some extent   

Methods like parameter optimization, stop loss level setting, only trading when trend is clear etc. can be used to control and reduce those risks.

### Optimization Directions  

The strategy can be optimized in the following aspects:

1. Optimize MA periods and crossover types to find the optimal parameter combination
2. Add other technical indicator filters e.g. trading volume, MACD etc. to reduce false signals
3. Add adaptive stop loss mechanism instead of simply opposite signal stop loss
4. Design parameter sets and stop loss rules for different products  
5. Incorporate machine learning methods to dynamically adjust parameters  

Through testing and optimization, the strategy rules can be continuously improved to obtain more reliable trading signals across different market environments.  

### Summary  

In summary, this dual MA crossover breakout strategy is quite simple and practical. By combining fast MA and slow MA, it can effectively identify the beginning of mid-to-long term trends and generate relatively reliable trading signals. Also, its stop loss rule is easy to implement. With further optimization, this strategy can become a worthwhile long-term quantitative system.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-20 00:00:00
end: 2023-11-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//future strategy
//strategy(title = "es1!_1minute_hull", default_qty_type = strategy.fixed, initial_capital=250000,  overlay = true, commission_type=strategy.commission.cash_per_contract,commission_value=2, calc_on_order_fills=false, calc_on_every_tick=false,pyramiding=0)
//strategy.risk.max_position_size(2)
//stock strategy
strategy(title = "stub", default_qty_type = strategy.percent_of_equity, default_qty_value = 100, initial_capital=1000000, overlay = false)//, calc_on_order_fills=true, calc_on_every_tick=true)
//forex strategy
//strategy(title = "stub", default_qty_type = strategy.percent_of_equity, default_qty_value = 100,  overlay = true,initial_capital=250000, default_qty_type = strategy.percent_of_equity)
//crypto strategy
//strategy(title = "stub", default_qty_type = strategy.percent_of_equity, default_qty_value = 100,  overlay = true, commission_type=strategy.commission.percent,commission_value=.005,default_qty_value=10000)
//strategy.risk.allow_entry_in(strategy.direction.long) // There will be no short entries, only exits from long.




testStartYear = 2010
testStartMonth = 1
testStartDay = 1
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)


testEndYear = 2039
testEndMonth = 1
testEndDay = 1
testPeriodEnd = timestamp(testEndYear,testEndMonth,testEndDay,0,0)


testPeriod() =>
    //true
    time >= testPeriodStart and time <= testPeriodEnd ? true : false

fast_length = 30
slow_length = 33

ema1 = 0.0
ema2 = 0.0

volumeSum1 = sum(volume, fast_length)
volumeSum2 = sum(volume, slow_length)

//ema1 := (((volumeSum1 - volume) * nz(ema1[1]) + volume * close) / volumeSum1)
ema1 :=  ema(close,fast_length)
//ema2 := (((volumeSum2 - volume) * nz(ema2[1]) + volume * close) / volumeSum2)
ema2 :=  ema(close,slow_length)



plot(ema1,color=#00ff00, linewidth=3)
plot(ema2, color=#ffff00, linewidth=3)

go_long = crossover(ema1,ema2)
go_short = crossunder(ema1,ema2)

if testPeriod()
    strategy.entry("long_ride", strategy.long, when=go_long)
    strategy.entry("short_ride", strategy.short,when=go_short)
    
        
    strategy.close("long_ride",when=go_short)
    strategy.close("short_ride",when=go_long)
    
```

> Detail

https://www.fmz.com/strategy/433436

> Last Modified

2023-11-27 16:21:45
