
> Name

Low-Point-Rebound-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/115abcbf0777300fe42.png)

## Overview

The Low Point Rebound strategy is a simple and effective stock trading strategy. It captures low point rebound opportunities and enters the market when stock prices reverse upwards. It aims to profit in the short term and exit quickly with stop loss.

## Strategy Logic

This strategy mainly uses two indicators: the 5-day lowest price to determine entry timing and the 2-day RSI to determine exit timing. 

The specific process is as follows:

1. If today's close is below yesterday's 5-day lowest price, go long at today's close.

2. If 2-day RSI closes above the overbought level (default 50), close long position at today's close to take profit.

3. If held for more than 5 days without meeting profit taking criteria, forced exit with stop loss.

This allows us to enter long around key points when prices reverse upwards. RSI overbought signals are used to lock in profits, while stop loss controls risk.

## Advantage Analysis 

This strategy has the following advantages:

1. Simple to implement. Only two indicators to monitor, clear rules for quick decisions.

2. Captures significant trends by entering before reversal upswings. 

3. Stop loss and take profit points control single trade loss and achieve stable profits.

4. High capital turnover without long waiting times. Can repeat trades frequently.

5. Widely applicable to most stocks, especially those with clear short-term low price reversals.

## Risk Analysis

There are also some risks to this strategy:

1. Picking wrong reversal timing may lead to losses. Identifying reversals needs experience. 

2. Improper stop loss placement may magnify losses. Reasonable stop loss percentage should be considered.

3. Price whipsaws may prevent take profit from triggering. RSI parameters could be adjusted.

4. Only suitable for short-term trading, not long term holds. 

5. High turnover increases transaction and slippage costs.

## Improvement Directions

This strategy can be further optimized in the following aspects:

1. Add trend indicators to avoid counter trend trades. E.g. MACD, KDJ etc.

2. Test different lowest price lookback periods to find better reversal confirmation.

3. Optimize RSI parameters for better profit taking levels. 

4. Consider dynamic stop loss module using ATR.

5. Improve entry timing with confirmation after reversal signal. Filter fake breakouts.

6. Set reasonable profit targets considering transaction costs. Control trade frequency. 

## Conclusion

The Low Point Rebound strategy is a typical short-term trading strategy. It capitalizes on low point reversal opportunities using simple indicators for entry and exit timing, enabling quick profit taking and stopping losses. Compared to buy and hold, it offers higher risk adjusted returns. With continuous parameter and rule optimization, this strategy can be adapted for most stocks to generate steady profits. But trading costs from high turnover should be monitored. Overall, the Low Point Rebound is an easy to use yet effective strategy for stock market trading.

> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-29 00:00:00
end: 2023-10-29 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © hobbiecode

// If today’s close is below yesterday’s five-day low, go long at the close.
// Sell at the close when the two-day RSI closes above 50.
// There is a time stop of five days if the sell criterium is not triggered.

//@version=5
strategy("Hobbiecode - Five Day Low RSI Strategy", overlay=true)

// RSI parameters
rsi_period = 2
rsi_upper = 50

// Calculate RSI
rsi_val = ta.rsi(close, rsi_period)

// Check if today's close is below yesterday's 5-day low
conditionEntry = close < ta.lowest(low[1], 5) and strategy.position_size < 1
if (conditionEntry)
    strategy.entry("Buy", strategy.long)

// Check if RSI closes above 50
if (strategy.position_size > 0 and rsi_val > rsi_upper)
    strategy.close("Buy")

// If position held for more than 5 days without sell criteria, then close position
if (strategy.position_size > 0 and ta.barssince(conditionEntry) >= 5)
    strategy.close("Buy")


// Plot RSI on chart
plot(rsi_val, title="RSI", color=color.red)
hline(rsi_upper, title="Overbought Level", color=color.blue)

```

> Detail

https://www.fmz.com/strategy/430556

> Last Modified

2023-10-30 11:53:56
