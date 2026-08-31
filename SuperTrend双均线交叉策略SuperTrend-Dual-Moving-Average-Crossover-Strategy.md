
> Name

SuperTrend双均线交叉策略SuperTrend-Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This is a dual moving average crossover strategy based on the SuperTrend indicator. SuperTrend consists of two moving averages, their crossover acts as buy and sell signals. The strategy belongs to the trend following category.

## Strategy Logic 

1. Calculate the fast line demaFast, formula: 2*ema5 - ema(ema5,5)

2. Calculate the slow line demaSlow, formula: 2*ema2 - ema(ema2,2)  

3. The fast line consists of 5-day EMA, more responsive to price changes; the slow line consists of 2-day EMA, lagging in response.

4. When fast line crosses above slow line from below, generate buy signal; when crossing below from above, generate sell signal.

5. Using crossover of two lines with different response speeds to determine trend change is a typical trend following strategy.

6. Execute trades based on buy and sell signals.

The core logic is simple and clear. By adjusting the MA parameters it can adapt to different cycle markets, a common trend following strategy.

## Advantage Analysis

1. Using dual MA crossover to determine trend change is a simple and practical technique.

2. Fast and slow line parameters are adjustable for optimizing different periods.

3. Clear signals and simple execution.

4. Complete backtest functionality to verify strategy. 

5. Intuitive visual interface showing crossover.

6. Easy to understand logic, suitable for beginners.

## Risk Analysis

1. Dual MA crossover may have lagging signals or false signals. Can improve by adjusting parameters or adding filters.

2. Ineffective in range-bound or choppy markets, prone to stop loss. Can add trend mechanism.

3. Limited optimization space in backtest, real trading effect untested.

4. Need to watch transaction cost impact on profitability.

## Optimization Directions

1. Test different MA length combinations to find optimal match.

2. Add other indicators for signal filtering, e.g. KDJ.

3. Add stop loss mechanism to control single trade loss amount. 

4. Add position sizing to use different percentages for different market conditions.

5. Optimize money management, set risk metrics like profit ratio.

6. Consider machine learning algorithms for parameter optimization or signal forecasting.

## Summary
This SuperTrend dual MA strategy is a simple trend following system adaptable to different cycles. Combining with other technical indicators and risk control can further enhance stability. Easy to learn with great potential for expansions, it is a highly practical quant trading strategy.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

strategy(title = "SuperTrend", shorttitle = "BTC")
ema5=ta.ema(close, 5)
ema2=ta.ema(close, 2)
 
demaFast =  request.security(syminfo.tickerid, "30", 2 * ema5 - ta.ema(ema5, 5)  )

plotchar((2 * ema5 - ta.ema(ema5, 5)), "d", "", location = location.top)
plotchar(demaFast, "fast", "", location = location.top)

demaSlow  = request.security(syminfo.tickerid,"30", 2 * ema2 - ta.ema(ema2, 2)  )
plotchar(demaSlow, "slow", "", location = location.top)

buy = ta.crossover(demaSlow, demaFast)
sell = ta.crossunder(demaSlow, demaFast)
strategy.entry("BUY", strategy.long, 1, when = buy)
strategy.entry("SELL", strategy.short, 1, when = sell )
```

> Detail

https://www.fmz.com/strategy/427306

> Last Modified

2023-09-19 21:38:06
