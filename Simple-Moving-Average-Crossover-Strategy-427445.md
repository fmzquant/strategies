
> Name

Simple-Moving-Average-Crossover-Strategy-427445

> Author

ChaoZhang

> Strategy Description


### Overview

This strategy trades based on golden cross and dead cross of 3 simple moving averages. It goes long when the fast SMA crosses above mid SMA and mid SMA crosses above slow SMA; It goes short when the reverse crossover happens. 

### Strategy Logic

1. Set 3 SMAs with different periods: fast, mid, slow
2. Go long when fast SMA crosses above mid SMA and mid above slow SMA
3. Go short when fast SMA crosses below mid SMA and mid below slow SMA
4. Can set entry delay to avoid false breakouts 
5. Exit when reverse crossover signal triggers

Specifically, it utilizes the crossovers between 3 SMAs of different periods to trade. The fast SMA represents short term trend, mid SMA represents medium term trend, and slow SMA represents long term trend. When the three SMAs crossover upward in sequence, it signals an uptrend to go long. When downward crossover happens, it signals a downtrend to go short. Entry delay can also be set to avoid short term false breakouts.

### Advantage Analysis

1. Using 3 SMAs improves directional accuracy  
2. Delayed entry avoids false breakouts and being trapped
3. Simple and intuitive logic, easy to understand
4. Flexible SMA parameter tuning for different cycles  
5. Trend following avoids counter-trend risks

### Risk Analysis

1. Long holding in long cycle risks loss expansion
2. SMA crossover has some lag, may miss best entry points 
3. Requires SMA parameter optimization, otherwise signals may be inaccurate
4. Long holding introduces overnight risks

Risks can be managed through position sizing, SMA optimization, stop loss strategies etc.

### Optimization Directions

1. Test different SMA periods to find optimal parameters
2. Evaluate entry delay to filter out signals
3. Introduce stop loss adaptable to actual price action
4. Study parameter preference across different products
5. Test adding re-entry and pyramiding rules to optimize holding

### Summary

This strategy holds positions based on 3 SMA crossovers to determine trend direction. Pros are simple clear signals and configurability; Cons are lagging signals and parameter dependency. Performance can be improved and risks controlled through parameter optimization, stop loss etc. It helps traders master using SMA and crossover strategies.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|SMA Top|
|v_input_2|50|SMA Mid|
|v_input_3|200|SMA Low|
|v_input_4|5|Long: After trigger, how many bars to wait?|
|v_input_5|5|Short: After trigger, how many bars to wait?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © DaynTrading

//@version=4
// strategy(
//      title="Simple Moving Average Cross",
//      overlay=true,
//      initial_capital=5000,
//      default_qty_type=strategy.percent_of_equity,
//      default_qty_value=2,
//      commission_type=strategy.commission.percent,
//      commission_value=0.075,
//      pyramiding=0
//      )

sma_top_input = input(title="SMA Top", type=input.integer, defval=20)
sma_mid_input = input(title="SMA Mid", type=input.integer, defval=50)
sma_low_input = input(title="SMA Low", type=input.integer, defval=200)

bars_long = input(title="Long: After trigger, how many bars to wait?", type=input.integer, defval=5)
bars_short = input(title="Short: After trigger, how many bars to wait?", type=input.integer, defval=5)

sma_top = sma(close, sma_top_input)
sma_mid = sma(close, sma_mid_input)
sma_low = sma(close, sma_low_input)

long = sma_top > sma_mid and sma_mid > sma_low
short = sma_top < sma_mid and sma_mid < sma_low

long_condition = long and long[bars_long] and not long[bars_long + 1]
short_condition = short and short[bars_short] and not short[bars_short + 1]

close_long = sma_top < sma_mid and sma_mid < sma_low and not long[bars_long + 1]
close_short = sma_top > sma_mid and sma_mid > sma_low and not short[bars_short + 1]

plot(sma_top, title="SMA Top", color=#95f252, linewidth=2)
plot(sma_mid, title="SMA Mid", color=#FF1493, linewidth=2)
plot(sma_low, title="SMA Low", color=#6a0dad, linewidth=2)

strategy.entry("LongPosition", strategy.long, when = long_condition)
strategy.entry("ShortPosition", strategy.short, when = short_condition)
    
strategy.close("LongPosition", when = close_short)
strategy.close("ShortPosition", when = close_long)
```

> Detail

https://www.fmz.com/strategy/427445

> Last Modified

2023-09-21 10:47:24
