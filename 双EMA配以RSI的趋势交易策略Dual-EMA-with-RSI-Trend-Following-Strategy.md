
> Name

双EMA配以RSI的趋势交易策略Dual-EMA-with-RSI-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

 

## Overview

This strategy combines the moving average indicator EMA and the overbought-oversold indicator RSI to determine trend direction and identify potential trend opportunities. When the fast EMA crosses above the slow EMA, it signals a bullish opportunity. When the fast EMA crosses below the slow EMA, it signals a bearish opportunity. RSI is used to filter out false breaks, only taking positions when it confirms the trend direction indicated by EMA.

## Principle

The strategy is based on the following principles:

1. EMA can effectively smooth price data and identify trends. Crossovers between fast and slow EMA reveal trend formation and reversals.

2. RSI effectively identifies overbought and oversold levels. Combining RSI helps filter false signals from EMA crossovers. Only when EMA and RSI both confirm the trend will we enter a position.

Specifically, the fast EMA period is set to 8 and the slow EMA period is set to 24. A crossover of the fast EMA above the slow EMA generates a bullish signal, while a crossover below generates a bearish signal. The RSI period is set to 7. RSI above 70*(1-RSI threshold) indicates overbought levels and RSI below 30*(1+RSI threshold) indicates oversold levels. Only when both EMA and RSI signal bullish will we go long. Only when both signal bearish will we go short.

## Advantages

By combining the strengths of the EMA and RSI indicators, this strategy can effectively identify trend direction and filter out false signals. The main advantages are:

1. EMA smooths price and identifies trend while RSI determines overbought/oversold levels to filter false breaks.

2. Flexible parameter tuning for different assets. 

3. Multiple indicators confirm and reduce false signals, improving win rate.

4. Simple and clear logic, easy to understand and implement for trend following.

5. Applicable to different timeframes for day trading or long-term holding.

## Risks

There are also some risks to note for this strategy:

1. EMA may lag trend reversals and cause losses.

2. Improper RSI parameter setting may lead to missed trades. 

3. Index products can whipsaw, triggering stop loss.

4. Trading costs also impact profits, optimize stop loss carefully.

5. Fundamentals not considered, risks being gamed by arbitrageurs.

We can mitigate risks by reasonable stop loss, optimizing RSI parameters, considering costs when setting profit targets and stop loss, etc.

## Enhancement Opportunities

The strategy can be enhanced in the following aspects:

1. Optimize EMA and RSI parameters to better fit different assets.

2. Add other filters like Bollinger Bands, KDJ to improve signal quality. 

3. Incorporate fundamental factors to avoid arbitrage risks.

4. Combine with trendlines, supports/resistances for entry.

5. Optimize take profit and stop loss based on volatility and risk preference. 

6. Backtest over longer timeframe and different assets to ensure robustness.

## Conclusion

Overall this is a simple and practical trend following strategy. By combining EMA and RSI, it identifies trend direction effectively and filters out noise. With parameter tuning and integrating other tools, the strategy can be further improved. But no strategy eliminates losses entirely. Manage risks properly when using it for trend following.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|8|MACD Fast Length|
|v_input_3|24|MACD Slow Length|
|v_input_4|7|RSI Length|
|v_input_5|0.2|RSI Threshold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-28 00:00:00
end: 2023-09-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("MACD + RSI", overlay=true)

src = input(close,"Source")

//MACD
len1 = input(8, title="MACD Fast Length")
len2 = input(24, title="MACD Slow Length")
ema1 = ema(src,len1)
ema2 = ema(src,len2)
div = ema1-ema2
long_macd = div>div[1]
short_macd = div<div[1]

//RSI
len = input(7, minval=1, title="RSI Length")
rsi_threshold = input(0.2,minval=0,maxval=0.5, title="RSI Threshold")
rsi = rsi(src,len)
long_rsi = rsi<30*(1+rsi_threshold)
short_rsi = rsi>70*(1-rsi_threshold)


//POSITIONING
if (long_macd)
    if(long_rsi)
        strategy.entry("Long", strategy.long)

if (short_macd)
    if(short_rsi)
        strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/428103

> Last Modified

2023-09-28 16:17:53
