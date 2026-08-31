
> Name

动量突破均线策略Momentum-Breakout-Mean-Reversion-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1153b51a962179da6b2.png)
## Overview

This is a short-term trading strategy based on momentum breakout and mean reversion. It incorporates multiple indicators including moving average, candlestick patterns, volume and volatility to identify directional opportunities with breakout momentum for catching shorter-term trends.

## Strategy Logic

1. Use 3-day EMA as the reference moving average line. When close price breaks below this line, it signals a downtrend in the market (Cond01).

2. Open price is higher than the previous day's OHLC price (average of open, high, low and close prices). This indicates strong buying interest at the open, which is a bullish signal (Cond02).

3. Volume is lower than previous day's volume. This shows insufficient momentum, which favors a directional breakout (Cond03).

4. Close price breaks out of the previous day's price range. This signals a breakout (Cond04).

5. When all the above 4 conditions are met, go long (Entries). 

6. Exit rules: close position if bars since entry exceeds 10 or max profit closes reaches 5 (Exits).

This strategy combines multiple indicators to determine market breakout direction for capturing short-term trends. But each condition only looks at 1-3 bars, with weak capabilities in determining long-term trends.

## Advantage Analysis

1. Using multiple indicators helps filter false breakouts and identify valid breakouts.

2. Insufficient momentum favors directional breakout and trend ignition, allowing catching clearer directional opportunities.

3. High trading frequency suits short-term trading for locking quick small profits. 

4. Reasonable stop loss and take profit allows effective single trade loss and risk control.

## Risk Analysis

1. Multiple concurrent open trades pose risks of over-trading.

2. Static parameter settings could be too rigid. Adaptive parameters can be introduced.

3. Probability of failed breakouts exist, which may lead to losing trades. 

4. Focus only on short-term information without comprehensive understanding of major trends.

5. Stop loss point might be too tight. Can consider widening to 20-30 bars.

## Optimization Directions

1. Incorporate trend determination to avoid trading against major trends. Long-term moving averages can be added to only take trades along the major trend direction.

2. Optimize parameter settings. EMA period, breakout parameters can be tested and optimized to suit different market conditions. Adaptive parameters can also be used for automatic adjustments.

3. Improve conditions. Other auxiliary indicators like A/D, Bollinger Band Width, RSI can be added to verify breakout validity and reduce false breakouts. 

4. Backtest extensively, inspect performance under extreme market conditions. Test on historical data to examine strategy performance under huge ups and downs, choppy markets, etc.

5. Optimize stop loss mechanisms. Consider trailing stop loss, percentage stop loss, adaptive stop loss etc. to make stops more flexible.

## Summary 

This strategy integrates EMA, volume, volatility and other indicators to identify short-term opportunities with momentum. It is a typical short-term breakout strategy with frequent returns and agile operations for locking quick profits. But it focuses too much on recent information without comprehensive understanding of major trends. We can optimize it by incorporating trend factors, optimizing parameters, improving breakout validity, testing extreme conditions to make the strategy more robust and adaptive.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Quantity|
|v_input_2|3|EMA Period|
|v_input_3|5|Max Profit Close|
|v_input_4|10|Max Total Bars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Free Strategy #01 (ES / SPY)", overlay=true)

// Inputs
Quantity = input(1, minval=1, title="Quantity")
EmaPeriod = input(3, minval=1, title="EMA Period")
MaxProfitCloses = input(5, minval=1, title="Max Profit Close")
MaxBars = input(10, minval=1, title="Max Total Bars")

// Misc Variables
src = close
BarsSinceEntry = 0
MaxProfitCount = 0
Ema = ema(close, EmaPeriod)
OHLC = (open + high + low + close) / 4.0

// Conditions
Cond00 = strategy.position_size == 0
Cond01 = close < Ema
Cond02 = open > OHLC
Cond03 = volume <= volume[1]
Cond04 = (close < min(open[1], close[1]) or close > max(open[1], close[1]))

// Update Exit Variables
BarsSinceEntry := Cond00 ? 0 : nz(BarsSinceEntry[1]) + 1
MaxProfitCount := Cond00 ? 0 : (close > strategy.position_avg_price and BarsSinceEntry > 1) ? nz(MaxProfitCount[1]) + 1 : nz(MaxProfitCount[1])

// Entries
strategy.entry(id="L1", long=true, qty=Quantity, when=(Cond00 and Cond01 and Cond02 and Cond03 and Cond04))
 
// Exits
strategy.close("L1", (BarsSinceEntry - 1 >= MaxBars or MaxProfitCount >= MaxProfitCloses))
```

> Detail

https://www.fmz.com/strategy/432303

> Last Modified

2023-11-16 10:47:41
