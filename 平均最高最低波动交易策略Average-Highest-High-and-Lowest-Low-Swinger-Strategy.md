
> Name

平均最高最低波动交易策略Average-Highest-High-and-Lowest-Low-Swinger-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10d948d2cf189afcf51.png)


## Overview

This is a full price action strategy designed for trending markets such as crypto and stocks. It is purely made on calculations for the highest high and lowest low using 2 different length, a faster and a slower one.

## Strategy Logic  

This strategy uses two different cycle lengths of lowest low and highest high prices and their averages to determine entry and exit. Specifically, it calculates the average lowest price, the average highest price and the average of these two averages of the 9-cycle and 26-cycle respectively. It goes long when the closing price is higher than the two averages of different cycles at the same time, and goes short when the closing price is lower than the two averages of different cycles at the same time.  

The specific logic for long is: the closing price is higher than the average of the highest and lowest prices of the 9-cycle, higher than that of the 26-cycle, and higher than the average of the two averages, when all three conditions are met, it goes long.

The specific logic for short is: the closing price is lower than the average of the highest and lowest prices of the 9-cycle, lower than that of the 26-cycle, and lower than the average of the two averages, when all three conditions are met, it goes short.

Whether long or short, choose to cut losses when there is a reverse signal.

## Advantage Analysis

This strategy has the following main advantages:

1. Using dual time frame analysis can better judge the trend and increase accuracy. 

2. Building on the highest and lowest prices can effectively capture breakouts.

3. Using multiple moving averages to filter increases signal reliability and avoids noise interference.

4. A pure price action strategy that applies to most markets with trending characteristics.

5. Fully automated trading eliminates human error probabilities.

## Risk Analysis

The strategy also has some risks to note:

1. There is no integrated stop loss module, risk of expanding losses. Moving stop loss or percentage stop loss can be added to control single loss.

2. It is easy to generate wrong signals and overtrade in range-bound markets. Period parameters can be adjusted or filters can be added.

3. The impact of the relationship between individual stocks and the market is not considered, systemic risks still exist. Multi-factor models can be considered to control such risks.

4. Insufficient backtest data may lead to overfitting. Robustness testing should be carried out over longer time frames and more markets.

## Optimization Directions

There is still some room for optimization in this strategy:

1. Period parameters can continue to be test optimized to find the best combination.

2. Consider adding moving stop loss, trailing stop loss to control single loss.

3. Can test different markets or even different varieties to explore applicability. 

4. Certain algorithmic trading modules can be added, such as machine learning, to assist in decision making.

5. Multi-factor models can be considered to introduce more variables for judgment and improve robustness.

## Conclusion

In summary, this dual time frame highest high and lowest low average strategy has strong trend tracking capabilities and is suitable for high volatility markets like cryptocurrencies. It effectively uses breakout judgments for entry timing, while using multiple layers of filtering to improve signal quality. Parameters optimization, addition of stop loss module, auxiliary algorithms and other means can be used to further enhance the strategy, making it an efficient and stable strategy worth holding for the long term.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Fast Line|
|v_input_2|26|Slow  Line|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-27 00:00:00
end: 2023-12-04 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=4
strategy(title = "Avg HH/LL Crypto Swinger", overlay = true )

varLo = input(title="Fast Line", type=input.integer, defval=9, minval=1)
varHi = input(title="Slow  Line", type=input.integer, defval=26, minval=1)

a = lowest(varLo)
b = highest(varLo)
c = (a + b ) / 2

d = lowest(varHi)
e = highest(varHi)
f = (d + e) / 2

g = ((c + f) / 2)[varHi]
h = ((highest(varHi * 2) + lowest(varHi * 2)) / 2)[varHi]



long=close > c and close > f and close >g and close > h
short=close < c and close < f and close<g and close < h

strategy.entry("long",1,when=long)
strategy.entry('short',0,when=short)
```

> Detail

https://www.fmz.com/strategy/434336

> Last Modified

2023-12-05 16:34:01
