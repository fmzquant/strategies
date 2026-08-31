
> Name

比特币快速反转突破策略Bitcoin-Rapid-Reversal-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description



### Overview

This strategy is suitable for highly volatile cryptocurrencies like Bitcoin. It uses the Parabolic SAR indicator to determine price reversal points, combined with SMA filter for false breakouts. It makes quick trading decisions when a breakout occurs to profit. The strategy is suitable for short-term trading to capture fast adjustment opportunities in the market.

### Strategy Logic 

The strategy is based on the Parabolic SAR indicator to determine price reversal points. The Parabolic SAR indicator sensitively identifies trend changes in the market. When SAR points appear above the price curve, it is a continuous bullish signal, and when SAR points fall below the price curve, it is a continuous bearish signal.

Specifically, the long entry conditions are:

1. Current bar's open higher than Parabolic SAR
2. Previous bar's open lower than Parabolic SAR  
3. Current bar's open higher than 50-period SMA

When all 3 conditions are met, it is considered a bullish reversal signal and goes long.

The short entry conditions are:

1. Current bar's open lower than Parabolic SAR
2. Previous bar's open higher than Parabolic SAR
3. Current bar's open lower than 50-period SMA

When all 3 conditions are met, it is considered a bearish reversal signal and goes short.

In addition, stop loss and take profit conditions are configured for risk management.

### Advantages of the Strategy

Compared with traditional breakout strategies, this strategy has the following advantages:

1. Using Parabolic SAR to determine reversal points is more sensitive and can capture turns earlier.

2. Filtering with SMA avoids being fooled by false breakouts from small range consolidations.

3. Fast reaction to enter the market immediately after identifying reversal signals to capture early trends.

4. Suitable for highly volatile cryptos like Bitcoin to capture trading opportunities from fast adjustments.

5. Stop loss configured to control single trade loss risk. 

6. Good backtest results with relatively high win rate.

### Risks of the Strategy

Despite the advantages, the strategy also has the following risks:

1. Parabolic SAR is not perfect and can still make wrong judgments.  

2. May fail in combinations like coils and small triangles.

3. No consideration of volume, with risk of being trapped.

4. Improper param settings may also lead to too much sensitivity or low sensitivity.

5. If stop loss is too tight, it may get run over.

6. Drawdown risk still exists, position sizing is recommended.

### Directions for Optimization

The strategy can be optimized in the following aspects:

1. Add more indicators like volume and Bollinger Bands to improve signal reliability.

2. Add chart pattern analysis like trendlines to avoid being trapped by contratrend oscillations.

3. Optimize parameters for different market cycles.

4. Use time-based stop loss to avoid tight stop loss being run over. 

5. Add position sizing to lower size during drawdown. 

6. Incorporate advanced strategies like Martingale for dynamic profit targets and stop loss levels.

7. Set profit targets and stop loss based on market volatility.

### Summary

This strategy uses Parabolic SAR to determine price reversals and makes quick trading decisions, acting like a "vanguard" among short-term breakout strategies. It reacts swiftly to capture short-term adjustment opportunities. But there are also limitations, requiring optimizations to reduce unnecessary whipsaw risks. When utilized properly, it can become a very practical strategy choice for crypto trading.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-12 00:00:00
end: 2023-09-19 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © atakhadivi

//@version=4
strategy("rapid fire", overlay=true)

longCondition = open > sar(0.02,0.02,0.2) and open[1] < sar(0.02,0.02,0.2)[1] and open > sma(close,50)
takeprofit = strategy.position_avg_price * (1 + 0.005)
stopLoss = strategy.position_avg_price * (1 - 0.015)
if (longCondition)
    strategy.entry("longEntry", strategy.long, limit = takeprofit, stop = stopLoss)


shortCondition = open < sar(0.02,0.02,0.2) and open[1] > sar(0.02,0.02,0.2)[1] and open < sma(close,50)
take_profit = strategy.position_avg_price * (1 - 0.005)
stop_Loss = strategy.position_avg_price * (1 + 0.015)
if (shortCondition)
    strategy.entry("shortEntry", strategy.short, limit = take_profit, stop = stop_Loss)
```

> Detail

https://www.fmz.com/strategy/427343

> Last Modified

2023-09-20 11:18:47
