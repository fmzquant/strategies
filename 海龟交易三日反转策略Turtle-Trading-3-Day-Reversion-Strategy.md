
> Name

海龟交易三日反转策略Turtle-Trading-3-Day-Reversion-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

The Turtle Trading 3-Day Reversion Strategy is a modification of the "3-day Mean Reversion Strategy" from the book "High Probability ETF Trading" by Larry Connors and Cesar Alvarez. In the book, the authors discuss a high-probability ETF mean reversion strategy with these simple rules:

- If yesterday's close is below the 5-day simple moving average, buy today.  
- If today's close is above the 5-day simple moving average, sell today.

Through practice and backtesting, I have found that the strategy consistently works better when using an EMA instead of an SMA for the trend line. So this script uses an EMA for the trend line. I have also made the length of the exit EMA adjustable.

## Strategy Logic

The strategy works as follows:

- Go long when the following buy conditions are true:
  - Close is above 200-day EMA
  - Close is below 5-day EMA
  - Today's high is lower than yesterday's high
  - Today's low is lower than yesterday's low
  - Yesterday's high is lower than the previous day's high
  - Yesterday's low is lower than the previous day's low
  - Previous day's high is lower than 2-day ago's high
  - Previous day's low is lower than 2-day ago's low
- Exit when close crosses above the exit EMA

The exit EMA defaults to 5-day EMA, its length is adjustable.

The main idea of the strategy is to take advantage of short-term mean reversion. When prices decline continuously, they are likely to bounce back in the short-term. The strategy identifies mean reversion opportunities by checking if prices narrowed for 3 consecutive days below a short-term EMA. Once reversal happens, it exits promptly when price breaks above the exit EMA.

## Advantage Analysis 

Compared to traditional moving average crossover strategies, this strategy has the following advantages:

1. Using 3-day consecutive narrowing to identify reversals improves signal quality.

2. Filtering with long and short EMAs avoids trading in trending markets. It only trades mean reversions in range-bound zones.

3. Using EMA instead of SMA for trend line is more sensitive in catching reversals. 

4. Adjustable exit EMA length allows customizing the stop loss strategy based on market conditions.

5. Low trading frequency with 1-2 day holding periods avoids risks associated with long directional bets.

## Risk Analysis

The strategy also has the following risks:

1. Failed reversal risk. Price may fail to bounce and continue declining after the reversal signal.

2. Frequent stop loss risk. Price could repeatedly hit stop loss in choppy markets.

3. Parameter optimization risk. Exit EMA and other parameters need continual testing and tuning based on evolving markets. Performance could degrade without adjustment.

4. Overfitting risk. Optimization should avoid overfitting. Parameters should be robust. 

Risks can be reduced by:

1. Strictly following stop loss rules to control single trade loss.

2. Robust parameter tuning during optimization to balance risk and return.

3. Adjusting position sizing to lower risk per trade.

## Optimization Opportunities

The strategy can be improved in the following aspects:

1. Test different EMA lengths for entry and exit to find optimal parameters.

2. Add other filters like volume to ensure reversal signals are more reliable.

3. Enhance stop loss with methods like ATR or trailing stops for more flexibility.

4. Incorporate trend filter to avoid taking reversal signals in existing trends.

5. Combine with other strategies for portfolio optimization and diversification.

6. Employ machine learning for adaptive parameter tuning.

## Summary

The Turtle Trading 3-day Reversion Strategy identifies short-term reversal opportunities by detecting 3-day narrowing patterns below a short EMA. Compared to traditional moving average strategies, it has more reliable entry signals and adjustable exit EMA for stop loss optimization. The strategy works well for range-bound choppy markets and catching short bounces. But there are further opportunities to improve parameters, stop loss, and trend filters. Combining with other strategies can further enhance performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Jan 2012 05:00 +0000)|Start Time|
|v_input_2|timestamp(01 Jan 2099 00:00 +0000)|End Time|
|v_input_int_1|5|EMA Length For Exit Strategy|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-05 00:00:00
end: 2023-10-12 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// @version = 5
// Author = TradeAutomation


strategy(title="ETF 3-Day Reversion Strategy", shorttitle="ETF 3-Day Reversion Strategy", process_orders_on_close=true, overlay=true, commission_type=strategy.commission.cash_per_order, commission_value=1, initial_capital = 10000000, default_qty_type=strategy.percent_of_equity, default_qty_value=100)


// Backtest Date Range Inputs // 
StartTime = input(defval=timestamp('01 Jan 2012 05:00 +0000'), title='Start Time')
EndTime = input(defval=timestamp('01 Jan 2099 00:00 +0000'), title='End Time')
InDateRange = true

// Strategy Rules //
DayEMA5 = ta.ema(close, 5)
Rule1 = close>ta.ema(close, 200)
Rule2 = close<DayEMA5
Rule3 = high<high[1] and low<low[1] and high[1]<high[2] and low[1]<low[2] and high[2]<high[3] and low[2]<low[3]
ExitEMA = ta.ema(close, input.int(5, "EMA Length For Exit Strategy", tooltip = "The strategy will sell when the price crosses over this EMA"))
plot(DayEMA5)
plot(ExitEMA, color=color.green)

// Entry & Exit Functions //
if (InDateRange)
    strategy.entry("Long", strategy.long, when = Rule1 and Rule2 and Rule3)
//    strategy.close("Long", when = ta.crossunder(close, ATRTrailingStop))
    strategy.close("Long", when = ta.crossover(close, ExitEMA))
if (not InDateRange)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/429146

> Last Modified

2023-10-13 15:37:18
