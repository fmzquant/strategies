
> Name

Moving-Average-Crossover-Strategy-432913

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f717d68821fa05cab8.png)

## Overview

The moving average crossover strategy is a simple yet effective quantitative trading strategy based on moving averages. It uses the crossover of a fast moving average line and a slow moving average line to generate buy and sell signals. When the fast line breaks through the slow line from below, a buy signal is generated. When the fast line breaks down through the slow line from above, a sell signal is generated.  

## Strategy Logic

The core logic of this strategy lies in using moving averages to judge market trends. Moving averages themselves have the functionality of filtering out random market noise. The fast moving average can respond to price changes faster and reflect the latest trends, while the slow moving average responds slower to the latest price changes and represents medium to long term trends. The breakthrough of the fast line through the slow line means that the short-term trend has reversed to be consistent with the medium-long term trend, thus generating trading signals.

Specifically, this strategy first defines the fast moving average sig1 and the slow moving average sig2. Then, buy and sell points are determined according to the crossover relationships between sig1 and sig2. When sig1 breaks through sig2 from below, a long condition longCondition is generated. When sig1 breaks down through sig2 from above, a short condition shortCondition is generated. The strategy then places orders when long and short conditions are met, and sets stop loss and take profit to exit orders.

## Advantage Analysis 

The advantages of this strategy are significant:

1. Simple logic, easy to understand and implement  
2. Flexible parameter tuning, can be optimized under different market conditions
3. Can be combined with other indicators to filter signals and improve stability
4. Good performance, for example the EMA15-EMA30 combo can achieve 83% win rate on the EURCHF daily data

## Risk Analysis   

There are also some risks with this strategy:  

1. Severe whipsaw effects, stop loss configuration is crucial
2. Poor performance in ranging, sideways markets
3. Requires extensive testing and parameter tuning to fit different products and timeframes

Optimization measures:  

1. Add other indicators for judgement to avoid whipsaws
2. Adjust MA types and parameters to suit different products
3. Optimize stop loss and take profit ratios to control risks  

## Conclusion

In general, the moving average crossover strategy is a quant strategy with simple logic, strong practicality and stability. With parameter tuning and proper optimizations, it can generate steady profits in various market environments. Worth focusing on and applying for quantitative traders.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2016|Starting year to analyse|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|0|MA Type: EMA|SMA|HMA|McG|WMA|
|v_input_4|false|Is JPY or XAU involved?|
|v_input_5|26|MA fast period|
|v_input_6|51|MA slow period|
|v_input_7|14|ATR period|
|v_input_8|1.5|SL ATR multiplicator|
|v_input_9|true|TP ATR multiplicator|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-14 00:00:00
end: 2023-11-16 04:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// Simple yet effective MA cross strategy.
// You'll have to tune the parameters to get an optimal win ratio.
// If JPY or XAU or any other currency with pips defined as the 
// second decimal digit are involved, do not forget to set the respective flag on.
//
// Created by vitelot/yanez/Vts, who's the same fellow with different user names
// December 2018 -- Merry Xmas
//
strategy("MA cross strategy Vts", overlay=true, initial_capital=1000, currency="EUR", pyramiding=0)

yr  = input(2016, title="Starting year to analyse")
src = input(close, title="Source")
maType = input( defval="EMA", title="MA Type", options=["SMA","EMA","HMA","McG","WMA"])
//
isJPY = input(false, title="Is JPY or XAU involved?") // JPY and Gold have the pips defined as the 2 decimal digit

maPar1 = input(26, minval=1, title="MA fast period")
maPar2 = input(51, minval=2, title="MA slow period")

atrPar = input(14,minval=1, title="ATR period")
atrMulSL = input(1.5, title="SL ATR multiplicator")
atrMulTP = input(1.0, title="TP ATR multiplicator")

hma(sig, n) => // Hull moving average definition
    wma( 2*wma(sig,round(n/2))-wma(sig,n), round(sqrt(n)))

mcg(sig,length) => // Mc Ginley MA definition
    mg = 0.0
    mg := na(mg[1]) ? ema(sig, length) : mg[1] + (sig - mg[1]) / (length * pow(sig/mg[1], 4))

ma(t,sig,len) =>
    if t =="SMA"
        sma(sig,len)
    else
        if t == "EMA"
            ema(sig,len)
        else
            if t == "HMA"
                hma(sig,len)
            else
                if t == "McG" // Mc Ginley
                    mcg(sig,len)
                else
                    wma(sig,len)
                    
        
sig1 = ma(maType, src, maPar1)
sig2 = ma(maType, src, maPar2)

tickFactor = isJPY? 1e3: 1e5
sl = atrMulSL*atr(atrPar)*tickFactor
tp = atrMulTP*atr(atrPar)*tickFactor

plot(sig1, color=aqua, title="MA1", linewidth=2)
plot(sig2, color=orange, title="MA2", linewidth=2)

longCondition = crossunder(sig2, sig1) and year>=yr // change the >= to == if you like exact years not a range
if (longCondition)
    strategy.entry("Long", strategy.long, qty=1) // exit trade when SL and TP are hit
    strategy.exit("Exit Long", "Long", loss=sl, profit=tp)
if (crossunder(sig1, sig2)) // or when the short condition is met
    strategy.close("Long")

shortCondition = crossover(sig2,sig1) and year>=yr // change the >= to == if you like exact years not a range
if (shortCondition)
    strategy.entry("Short", strategy.short, qty=1)
    strategy.exit("Exit Short", "Short", loss=sl, profit=tp)
if (crossover(sig1,sig2))
    strategy.close("Short")

```

> Detail

https://www.fmz.com/strategy/432913

> Last Modified

2023-11-22 16:38:26
