
> Name

Moving-Average-Crossover-Trading-Strategy-439870

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9010c280496fd39d58.png)
 

## Overview  

The moving average crossover trading strategy is a relatively common quantitative trading strategy. This strategy generates trading signals by calculating moving averages of different periods and according to their crossover situations. Specifically, it calculates the exponential moving averages (EMA) of 4 periods, 8 periods and 20 periods. When the short-term EMA crosses above the long-term EMA, go long; when the short-term EMA crosses below the long-term EMA, go short.  

## Strategy Logic

The core logic of this strategy is:  

1. Calculate the EMA lines of 4 periods, 8 periods and 20 periods.  
2. Judge the relationship between the 4-period EMA line and the 8-period EMA line:
    1. When the 4-period EMA line crosses above the 8-period EMA line, it means the price trend is strengthening, which is a bullish signal.
    2. When the 4-period EMA crosses below the 8-period EMA, it means the price trend is weakening, which is a bearish signal.
3. At the same time, judge the direction of the 20-period EMA line:
    1. If the 20-period EMA line goes up, then Enter Long. 
    2. If the 20-period EMA line goes down, then Enter Short.
4. When the relationship between the 4-period EMA line and the 8-period EMA line reverses, Prepare Exit.  
5. When the direction of the 20-period EMA line reverses, Exit Now.   

Through this method, we take advantage of the crossover between different period moving averages to judge market signals, and use the direction of the longest period moving average to filter false signals, constructing a stable trading strategy.

## Advantages of the Strategy  

The main advantages of this strategy are:  

1. The strategy logic is simple and clear, easy to understand and implement.  
2. The double condition filtering can reduce false signals.
3. The boost from 20-period EMA can identify major trends and enhance stability. 
4. Customizable parameters to adjust trading frequency.  
5. Easy to combine with other indicators or models to build complex strategies.   

## Risks of the Strategy

There are also some risks with this strategy:   

1. Double moving average strategies tend to generate false signals.  
2. Fixed periods cannot adapt to market changes. 
3. It’s easy to cause losses during market fluctuations.  

The main solutions are:  

1. Appropriately shorten the holding period and stop loss in time.
2. Dynamically optimize parameters and adjust moving average periods.  
3. Combine with other indicators or models to create complex strategies.  

## Optimization Directions  

The strategy can be optimized in the following aspects:  

1. Period optimization: Determine the optimal MA period combination according to different varieties.  
2. Stop loss optimization: Reasonably set stop loss points to control single loss.
3. Parameter optimization: Dynamically optimize parameters using genetic algorithms, Markov chains, etc.   

4. Model fusion: Integrate with LSTM, RNN and other deep learning models to extract more Alpha.  

5. Portfolio optimization: Combine with other technical indicator strategies to construct strategy portfolios.

## Summary   

In general, the moving average crossover strategy is a relatively classic and commonly used quantitative trading strategy. This strategy has simple logic and is easy to understand and implement, with certain stability. But there are also some problems, such as generating false signals, inability to adapt to market changes, etc. These issues can be improved through parameter optimization, stop loss optimization, model fusion, and other methods. Overall, the moving average strategy can be used as a basic module in the strategy toolbox, combined with more complex strategies to build robust complex strategies.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|1900|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2018|Backtest Start Year|
|v_input_5|12|Backtest Start Month|
|v_input_6|true|Backtest Start Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//future strategy
//strategy(title = "stub", default_qty_type = strategy.fixed, default_qty_value = 1,  overlay = true, commission_type=strategy.commission.cash_per_contract,commission_value=2.05)
//stock strategy
strategy(title = "stub",   overlay = true)
//forex strategy
//strategy(title = "stub", default_qty_type = strategy.percent_of_equity, default_qty_value = 100,  overlay = true)
//crypto strategy
//strategy(title = "stub", default_qty_type = strategy.percent_of_equity, default_qty_value = 100,  overlay = true, commission_type=strategy.commission.percent,commission_value=.0,default_qty_value=10000)


testStartYear = input(1900, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testEndYear = input(2018, "Backtest Start Year")
testEndMonth = input(12, "Backtest Start Month")
testEndDay = input(1, "Backtest Start Day")
testPeriodEnd = timestamp(testStartYear,testStartMonth,testStartDay,0,0)


testPeriod() => true

ema1 = ema(close,4)
ema2 = ema(close,8)
ema3 = ema(close,20)

go_long = ema1[0] > ema2[0] and ema3[0] > ema3[1]
exit_long = ema1[0] < ema2[0] or ema3[0] < ema3[1]

go_short = ema1[0] < ema2[0] and ema3[0] < ema3[1]
exit_short = ema1[0] > ema2[0] or ema3[0] > ema3[1]

 
if testPeriod()
    strategy.entry("simpleBuy", strategy.long, when=go_long)
    strategy.exit("simpleBuy", "simpleSell",when=exit_long)
    
    strategy.entry("simpleSell", strategy.short,when=go_short)
    strategy.exit("simpleSell", "simpleSell",when=exit_short)
        
    

```

> Detail

https://www.fmz.com/strategy/439870

> Last Modified

2024-01-24 14:59:44
