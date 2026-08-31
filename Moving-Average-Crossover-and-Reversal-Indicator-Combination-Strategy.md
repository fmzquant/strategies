
> Name

Moving-Average-Crossover-and-Reversal-Indicator-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/140c32cb6d65849ab55.png)


## Overview

This strategy integrates moving average, relative strength index and commodity channel index, forming a relatively complete trend tracking and indicator combination strategy. Its basic idea is to implement more accurate entry after the trend indicator confirms the trend formation.

## Strategy Principle   

1. Use hl2 to calculate the mid price.  

2. Calculate the 14-period CCI indicator to judge the major trend. When CCI is greater than 0, the trend is upward. When less than 0, the trend is downward.

3. Calculate the fast line of the 14-period RSI indicator and the slow line of the 50-period RSI indicator. When the fast line crosses above the slow line, a buy signal is generated. When the fast line crosses below the slow line, a sell signal is generated.  

4. Actual trading signals are generated only when the CCI indicator also matches the signal direction of the RSI indicator. That is, buy only when CCI is greater than 0 and RSI fast line crosses above slow line, and sell only when CCI is less than 0 and RSI fast line crosses below slow line.  

5. Compare the price with the 14-period moving average of hl2 to assist in judging the minor trend, so as to avoid false breakouts. A buy signal is generated only when the price is above the 14-period moving average of hl2 and the RSI indicator crosses up. A sell signal is generated only when the price is below the 14-period moving average of hl2 and the RSI indicator crosses down.

## Advantage Analysis  

1. This strategy integrates trend judgment and reversal signals to get in in time after the start of the trend, and uses reversal signal indicators to determine exit points, thereby obtaining better returns.

2. The commodity channel index accurately determines major trend directions, avoiding incorrect choices of trading directions.  

3. The fast and slow line crossovers of the relative strength index serve as reliable enabling signals, avoiding the lag problem of moving averages, and can timely capture price reversals.

4. Comparing prices with median lines can further filter out false breakouts that cause erroneous signals.  

5. Overall, this strategy has good stability and performs well in strong trends.  

## Risk Analysis

1. This strategy is sensitive to trading varieties, requiring parameter optimization for specific varieties. Blind application to all varieties may lead to unstable performance.  

2. Parameter settings such as 14-period moving averages and 50-period moving averages need to be adjusted according to different markets. Improper parameter settings can also lead to poor performance.

3. Relying solely on CCI to determine major trend direction is still not perfect enough, with some lag. This part still needs further optimization.  

4. The combination of reversal signal indicators is relatively large, which may lead to a certain degree of over-optimization. This also needs to be strictly tested back.

## Optimization Directions  

1. Consider adding more indicators to judge major trends, such as DMI, ADX, etc., to make trend judgments more precise.

2. Increase stop loss logic. For example, after a reversal signal appears, if the price callbacks again by a certain amplitude, stop loss exit can be considered to reduce losses.  

3. Optimize parameters to make them more suitable for specific trading varieties. For example, increase the cycle parameter of the slow line, or adjust the mid price calculation method, etc.  

4. Build a parameter optimization combination to select the optimal parameters for different varieties, which can greatly improve the applicability of strategies.  

5. Add momentum indicators to avoid misleading signals when momentum is insufficient.  

## Conclusion

The overall framework of this strategy is complete, integrating trend judgment and reversal indicators, which can theoretically obtain excellent performance. But in actual application, it still needs parameter and model optimization for trading varieties to reduce the risk of overfitting. If it passes strict statistical testing, it has the potential to become a stable strategy worth recommending.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-06 00:00:00
end: 2023-12-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SuchitRaju

//@version=4
strategy("MA RSI CCI")

price_up = if(close > open and close > sma(hl2,14))
    1
else
    0

price_down = if(open > close and close < sma(hl2,14))
    1
else
    0
// 

cci_indicator = cci(hl2, 14)
// plot(cci_indicator, color=color.blue)

rsi_slow = sma(rsi(close, 14), 50)
// plot(rsi_slow, color=color.red)

rsi_fast = rsi(close, 14)
// plot(rsi_fast, color=color.green)

isCrossover = if(rsi_fast > rsi_slow and cci_indicator > 0)
    1
else
    0
// plotshape(isCrossover, style = shape.arrowup, color = color.green, size = size.huge)

isCrossunder = if(rsi_fast < rsi_slow and cci_indicator < 0)
    1
else
    0
// plotshape(isCrossunder, style = shape.arrowup, color = color.red, size = size.huge)

// start = timestamp("GMT-5", 2016,9,1,0,0)
// end = timestamp("GMT-5", 2017,9,1,0,0)

// strategy.entry("Long", strategy.long, 1, when = isCrossover and price_up)
// strategy.entry("Short", strategy.short, 1, when = isCrossunder and price_down)
// strategy.close("Long", when = isCrossunder and price_down)
// strategy.close("Short", when = isCrossover and price_up)

strategy.entry("Long", strategy.long, 1, when = isCrossover)
strategy.entry("Short", strategy.short, 1, when = isCrossunder)
strategy.close("Long", when = isCrossunder)
strategy.close("Short", when = isCrossover)
```

> Detail

https://www.fmz.com/strategy/435245

> Last Modified

2023-12-13 15:20:20
