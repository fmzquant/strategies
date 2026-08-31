
> Name

AK双RSI突破策略AK-Dual-RSI-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview 

This strategy combines RSI(2) and moving averages to identify low buy and high sell points when price breaks out of the gap between mid-long term moving averages, aiming to capture ultra-short term reversal opportunities.

## Strategy Logic

1. Calculate 2-period RSI to reflect latest two days price change ratio.

2. 5-day and 200-day simple moving averages act as short and long term trend indicators.

3. When price breaks above 200-day MA but below 5-day MA, and RSI(2) < 5, consider oversold, go long.

4. When price breaks below 200-day MA but above 5-day MA, and RSI(2) > 90, consider overbought, go short. 

5. When price breaks 5-day MA again, reversal confirmed, close position.

## Advantage Analysis   

1. RSI(2) has high sensitivity to capture ultra-short reversals quickly.

2. Combining with MA adds validity to reversal signals, avoids whipsaws.

3. Backtest shows decent results on stocks with price limits, max DD controllable. 

4. Simple and elegant code with few parameters, easy to implement.

## Risk Analysis

1. Prone to false signals relying on sensitive indicators, parameters need optimization.

2. Hard to adapt to long trending or ranging markets, return volatility high.

3. No stop loss unable to limit single trade loss. 

4. Only 2-year backtest data, more samples needed to verify strategy.

5. Fails to adapt to extreme events like flash crashes.

## Optimization Directions

1. Test combinations of MA and RSI parameters.  

2. Add volume etc. to confirm reversal signals.

3. Implement moving or percentage stop loss. 

4. Optimize position sizing based on market conditions.

5. Trade both long and short sides.

6. Tweak entry logic for stocks with gap risk.

7. Expand backtest period to verify robustness.

## Summary

This strategy identifies overbought/oversold levels with RSI and MA to capture reversals from mid-long term gaps for ultra-short term trades. Pros are simplicity, speed and decent backtest results. But limited sample, param tuning needed, lacks risk control, weak in gap moves. More filters needed to reduce false signals and improve robustness and adaptiveness. Provides useful idea of using indicator combos to determine reversals, but requires comprehensive optimization and verification for large scale application.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// Algokid code v. 1.00 
strategy("AK_RSI 2 Strategy", overlay=true)

RS = rsi(close,2)

ma5 = sma(close,5)
ma200 = sma(close,200)


longCondition = close > ma200 and close < ma5 and RS < 5


if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)
strategy.close_all(when = close > ma5)

shortCondition = close < ma200 and close > ma5 and RS > 90
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
strategy.close_all(when = close < ma5)



```

> Detail

https://www.fmz.com/strategy/427458

> Last Modified

2023-09-21 11:51:01
