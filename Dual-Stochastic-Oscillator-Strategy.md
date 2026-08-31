
> Name

Dual-Stochastic-Oscillator-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses two stochastic oscillators with different parameters to determine bull/bear conditions. It is a typical moving average crossover system. The faster oscillator judges short-term trends and entry signals, while the slower one confirms overall trend direction. Signals are generated from the combination.

## Strategy Logic

1. Fast %K shows short-term trend direction. %K crossing over the smoothing line SM1 generates entry signals.

2. Slow %K reflects overall trend conditions. When fast oscillator gives reversal signal, check slow oscillator for trend validity.

3. %K fast crossover above SM1 indicates bullish signal. Slow %K above 50 means uptrend, satisfying long condition.

4. %K fast crossover below SM1 indicates bearish signal. Slow %K below 50 means downtrend, satisfying short condition. 

5. Set take profit and stop loss points at fixed percentages.

## Advantage Analysis

1. Dual stochastic filters noise and improves accuracy. Fast and slow combination reduces being trapped risks.

2. Smaller SM1 parameter makes %K sensitive for catching short-term opportunities.

3. Larger cycle judges overall trend, smaller cycle captures reversals. Dual long/short strategies fit most market environments.

4. Fixed profit taking and stop loss points make risk controllable without huge swings.

## Risk Analysis

1. Divergence between indicators can cause missed trades or wrong signals.

2. Fixed profit taking and stop loss points lack flexibility in adjusting to markets.

3. Stochastic parameters need repetitive optimization, improper settings lead to failure.

4. High trading frequency from short-term trading increases transaction costs.

## Optimization Directions

1. Add other indicators or filters to ensure signal quality.

2. Test different parameter combinations to find optimal settings.

3. Incorporate volatility measures to make profit taking and stop loss levels dynamic.

4. Use time filters to avoid key events and irrational price swings.  

5. Optimize capital management strategies like position sizing to improve capital efficiency.

## Summary

This strategy integrates fast and slow stochastic oscillators into a dual directional system. Further parameter optimization and adding filters like trend and volatility indicators can improve it. With proper risk control, this strategy can achieve relatively steady excess returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Leading K|
|v_input_2|2|Leading Smooth |
|v_input_3|97|Lagging K|
|v_input_4|3|Lagging D|
|v_input_5|true|Lagging Smooth|
|v_input_6|1.2|v_input_6|
|v_input_7|1.2|v_input_7|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-17 00:00:00
end: 2023-09-16 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Double Stochastic", overlay=true)

//-----------------------Stochastics------------------------//

c= security(syminfo.tickerid,timeframe.period , close)  
h= security(syminfo.tickerid, timeframe.period, high)  
l= security(syminfo.tickerid, timeframe.period, low)  

c1= security(syminfo.tickerid, timeframe.period, close)  
h2= security(syminfo.tickerid, timeframe.period, high)  
l1= security(syminfo.tickerid, timeframe.period, low)  

K1 = input(5, title="K", minval=1, title="Leading K")
SM1 = input(2, title="Smooth", minval=1, title="Leading Smooth ")
k = ema(stoch(c, h, l, K1), SM1)

K2 = input(97, title="K", minval=1, title="Lagging K")
D2 = input(3, title="D", minval=1, title="Lagging D")
SM2 = input(1, title="Smooth", minval=1, title="Lagging Smooth")
k1 = ema(stoch(c1, h2, l1, K2), SM2)

// buy ((k[2] < 40 and k > 40) and bars_up > 0 and k1 > 50) 
// sell (k[2] > 60 and k < 60) and bars_down > 0 and k1 < 50

//-----------------------Mechanics------------------------//

buy = k1 > 50 and k < 30 and k > k[1] ? 1 : 0
sell = k1 < 50 and k > 70 and k < k[1] ? 1 : 0

buy_val = valuewhen(buy == 1, close, 1)
sell_val = valuewhen(sell == 1, close, 1)

buy_close = buy_val * input(1.20, minval=0.1)
sell_close = sell_val / input(1.20, minval=0.1)

//------------------------Buy/Sell-------------------------//

longCondition = buy == 1
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

close_long = close >= buy_close
if (close_long)
    strategy.close("My Long Entry Id")
    
sellCondition = sell == 1
if (sellCondition)
    strategy.entry("My Short Entry Id", strategy.short)

close_short = close <= sell_close
if (close_short)
    strategy.close("My Short Entry Id")    
```

> Detail

https://www.fmz.com/strategy/427065

> Last Modified

2023-09-17 18:26:16
