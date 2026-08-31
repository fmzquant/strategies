
> Name

趋势SMA交易策略11Trend-SMA-Trading-Strategy-11

> Author

ChaoZhang

> Strategy Description



## Overview

This is a trading strategy that uses only two Simple Moving Average lines (SMA). It utilizes a slow SMA line to define the trend direction and a fast SMA line to determine specific entry points. The strategy is suitable for cryptocurrency trading at hourly and higher timeframes.

## Strategy Logic

The strategy judges the trend direction by calculating the fast and slow SMA lines. Specifically:

- The slow SMA line (blue) is used to define the trend direction. A downtrend is defined when the price is below the slow SMA, and an uptrend when the price is above it.

- The fast SMA line (red) is used to determine specific entry points. In an uptrend, go long when the candlestick close is lower than the open and below the fast SMA. In a downtrend, go short when the close is higher than the open and above the fast SMA.

The strategy also considers the candlestick color, only taking trades in the direction of the defined trend - long signals in uptrends and short signals in downtrends, avoiding countertrend trades.

## Advantages

- The strategy uses only two basic SMA indicators, very simple to understand.
- Using two SMA lines to determine trends is reliable, avoiding market noise.
- Considering candlestick color avoids countertrend entries, reducing risk.
- Customizable fast and slow SMA parameters suit different market conditions. 
- Can go only long or short, flexible for different market situations.

## Risk Analysis

- SMA has lagging characteristics, may miss trend turning points.
- Fixed parameters cannot adapt to changing markets, need adjustment.
- Trend judgment may be wrong, leading to countertrend trade risks.
- Lack of confirmation with single indicator combo, overtrading risk.

Possible optimizations to address the risks:

1. Add MACD to confirm trend.

2. Implement stop loss to control risk.

3. Add parameter optimization for adaptive parameters. 

4. Add entry confirmation to avoid overtrading.

## Optimization Directions

The main aspects to optimize the strategy:

1. Parameter optimization. Add module for automatic parameter adjustment based on market conditions.

2. Entry confirmation. Add indicators like MACD, Bollinger Bands to confirm SMA signals.

3. Stop loss. Implement stop loss strategies like trailing stop loss to limit risks.

4. Drawdown control. Close all positions when max drawdown percentage is reached to limit losses.

5. Cross timeframe validation. Use higher timeframe indicators to confirm lower timeframe SMA signals.

6. Long/short selection. Add switches to select only long or short trades for different markets.

## Summary

The strategy has clear, easy-to-understand logic using simple trend-following indicators. But it has limited profit potential and inadequate risk control. Next steps are to optimize parameters and risk management for better market adaptability and effective risk control, further improving the strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|fast SMA Period|
|v_input_2|15|slow SMA Period|
|v_input_3|false|Only long?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-22 00:00:00
end: 2023-09-21 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Noro's Trend SMA Strategy v1.1", shorttitle = "Trend SMA str 1.1", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

fastlen = input(5, "fast SMA Period")
slowlen = input(15, "slow SMA Period")
only = input(false, "Only long?")

fastsma = ema(close, fastlen)
slowsma = ema(close, slowlen)

trend = low > slowsma ? 1 : high < slowsma ? -1 : trend[1]

up = trend == 1 and low < fastsma and close < open ? 1 : 0
dn = trend == -1 and high > fastsma and close > open ? 1 : 0

plot(fastsma, color = red, title = "Fast SMA")
plot(slowsma, color = blue, title = "Slow SMA")

longCondition = up == 1
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = dn == 1
if (shortCondition)
    strategy.entry("Short", strategy.short, only == true ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/427607

> Last Modified

2023-09-22 16:40:33
