
> Name

动能突破自适应均线交叉系统Adaptive-Moving-Average-Crossover-System-with-Momentum-Breakout

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1bb9eb4a53a8fba3af5.png)

## I. Overview

The core of this strategy is to implement breakout trading using adaptive moving averages and momentum indicators. Firstly, the strategy constructs adaptive moving averages with Heiken Ashi weighted average price and triple exponential smoothing; then, combined with momentum indicators, it judges breakout signals and makes trading decisions.

## II. Strategy Principle 

The strategy consists of three main parts:

1. Construction of adaptive moving averages. The strategy builds three adaptive moving averages using Heiken Ashi price and triple exponential smoothing. These moving averages can respond quickly to price changes.

2. Calculation of momentum indicators. The strategy uses the difference between triple exponential smoothing of prices as the momentum indicator. This indicator can highlight changes in price trends.

3. Moving average crossover as trading signals. When the fast moving average crosses over the slow one, a buy signal is generated. When the fast crosses below the slow one, a sell signal is generated.

## III. Advantages of the Strategy

By combining adaptive moving averages and momentum indicators, this strategy can quickly capture trend changes in prices and generate trading signals. The main advantages are:

1. Heiken Ashi prices to construct adaptive moving averages can respond faster to price changes. 
2. Triple exponential smoothing can effectively smooth price data and handle outliers.
3. Momentum indicators can clearly identify trend change points in prices. 
4. Moving average crossovers generate clear trading signals.
5. Flexible parameter settings for adjustability.

## IV. Risks and Mitigations

1. Crossover signals may be misleading when prices fluctuate violently. Adjust parameters to filter signals when necessary.
2. The strategy works better in bull markets. Use stop loss to protect capital in bear markets.

## V. Optimization Directions 

1. Test more types of moving averages to find better parameters.
2. Add additional filters to avoid false signals, e.g. volume filter.
3. Optimize parameter settings for adaptability to different markets.  

## VI. Conclusion

This strategy integrates adaptive moving averages and momentum indicators to generate efficient trading signals by quickly responding to price changes. Through parameter tuning, it can be adaptive to different market environments. This is a very practical breakout trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|55|EMA LENGTH?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-20 00:00:00
end: 2024-02-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("YASIN Crossover Strategy", overlay=true)

EMAlength = input(55, 'EMA LENGTH?')

src = ohlc4
var float haOpen = na
haOpen := na(haOpen[1]) ? src : (src + haOpen[1]) / 2
haC = (ohlc4 + haOpen + ta.highest(high, 1) + ta.lowest(low, 1)) / 4
EMA1 = ta.ema(haC, EMAlength)
EMA2 = ta.ema(EMA1, EMAlength)
EMA3 = ta.ema(EMA2, EMAlength)
TMA1 = 3 * EMA1 - 3 * EMA2 + EMA3
EMA4 = ta.ema(TMA1, EMAlength)
EMA5 = ta.ema(EMA4, EMAlength)
EMA6 = ta.ema(EMA5, EMAlength)
TMA2 = 3 * EMA4 - 3 * EMA5 + EMA6
IPEK = TMA1 - TMA2
YASIN = TMA1 + IPEK
EMA7 = ta.ema(hlc3, EMAlength)
EMA8 = ta.ema(EMA7, EMAlength)
EMA9 = ta.ema(EMA8, EMAlength)
TMA3 = 3 * EMA7 - 3 * EMA8 + EMA9
EMA10 = ta.ema(TMA3, EMAlength)
EMA11 = ta.ema(EMA10, EMAlength)
EMA12 = ta.ema(EMA11, EMAlength)
TMA4 = 3 * EMA10 - 3 * EMA11 + EMA12
IPEK1 = TMA3 - TMA4
YASIN1 = TMA3 + IPEK1
t1 = time(timeframe.period, "0020-0030")


// بررسی شرایط سیگنال خرید و فروش
buyCondition = YASIN1 > YASIN and YASIN1[1] <= YASIN[1]
sellCondition = YASIN1 < YASIN and YASIN1[1] >= YASIN[1]

// اعمال سیگنال خرید و فروش
strategy.entry("Buy", strategy.long, when = buyCondition)
strategy.entry("Sell", strategy.short, when = sellCondition)
```

> Detail

https://www.fmz.com/strategy/442256

> Last Modified

2024-02-20 15:43:46
