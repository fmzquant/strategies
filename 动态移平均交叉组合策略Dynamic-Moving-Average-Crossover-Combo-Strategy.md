
> Name

动态移平均交叉组合策略Dynamic-Moving-Average-Crossover-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f1a6a411ed45086a23.png)

## Overview

The Dynamic Moving Average Crossover Combo Strategy is a combined trading strategy that integrates multiple technical indicators and market condition detections. It dynamically calculates the market volatility and determines three market phases based on the price distance from the long term moving average and volatility: volatile, trending and consolidating. Under different market conditions, the strategy adopts different entry and exit rules and generates buy and sell signals with a combination of indicators like EMA/SMA crossover, MACD and Bollinger Bands.  

## Strategy Logic  

### Calculate Market Volatility  

Use ATR indicator to measure the market volatility of recent 14 days. Then apply a 100-day SMA filter to get the average volatility.

### Determine Market Phases  

Calculate the distance between price and 200-day SMA. If the absolute distance exceeds 1.5 times of average volatility with a clear direction, it is determined as a trending market. If current volatility exceeds 1.5 times of average, it is a volatile market.  

### EMA/SMA Crossover  

Fast EMA period is 10 days. Slow SMA period is 30 days. A buying signal is generated when fast EMA crosses above slow SMA.

### MACD  

Calculate MACD with 12, 26, 9 parameters. A positive MACD histogram gives buying signal.  

### Bollinger Bands  

Calculate 20-day standard deviation channel. If channel width is smaller than 20-day SMA of itself, it is consolidating.   

### Entry Rules  

Volatile: Enter long when crossover or MACD positive with price inside bands.  

Trending: Enter long when crossover or MACD positive.  

Consolidating: Enter long when crossover and price above lower band.

### Exit Rules

General: Exit when MACD negative for 2 bars and price drops 2 days. 

Volatile: Plus exit when StockRSI overbought.  

Consolidating: Plus exit when price below upper band.

## Advantages  

The strategy has the following strengths:

1. Systematic operations with less subjective interventions.  

2. Adaptive parameters adjusted based on market conditions.  

3. Higher signal accuracy with multiple indicator combo.  

4. Lower risk with Bollinger Bands auto stop loss.

5. All rounded condition filtering to avoid false signals.  

6. Dynamic stop loss and take profit to follow trends.

## Risks

The main risks are:

1. Invalid strategy if improper parameter tuning. Optimization suggested.

2. Model failure due to sudden events. Logic update recommended.  

3. Compressed profit margin from trading cost. Low commission broker advised. 

4. Higher complexity with multiple modules. Core indicators advised.

## Enhancement  

Potential directions of optimization:

1. Improve criteria for market environment judgment.

2. Introduce machine learning for automatic parameter adaption.  

3. Add text analytics to detect events.

4. Multi-market backtesting to find best parameters.  

5. Implement trailing stop strategy for better profit.

## Conclusion  

The Dynamic Moving Average Crossover Combo strategy is an intelligent multi-indicator quantitative trading system. It adjusts parameters dynamically based on market conditions to implement systematic rule-based trading. The strategy is highly adaptive and deterministic. But parameters and additional modules need to be introduced carefully to avoid over complexity. Overall this is a feasible quantitative strategy idea.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-28 00:00:00
end: 2024-02-04 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Improved Custom Strategy", shorttitle="ICS", overlay=true)

// Volatility
volatility = ta.atr(14)
avg_volatility_sma = ta.sma(volatility, 100)
avg_volatility = na(avg_volatility_sma) ? 0 : avg_volatility_sma

// Market Phase detection
long_term_ma = ta.sma(close, 200)
distance_from_long_term_ma = close - long_term_ma
var bool isTrending = math.abs(distance_from_long_term_ma) > 1.5 * avg_volatility and not na(distance_from_long_term_ma)
var bool isVolatile = volatility > 1.5 * avg_volatility

// EMA/MA Crossover
fast_length = 10
slow_length = 30
fast_ma = ta.ema(close, fast_length)
slow_ma = ta.sma(close, slow_length)
crossover_signal = ta.crossover(fast_ma, slow_ma)

// MACD
[macdLine, signalLine, macdHistogram] = ta.macd(close, 12, 26, 9)
macd_signal = crossover_signal or (macdHistogram > 0)

// Bollinger Bands
source = close
basis = ta.sma(source, 20)
upper = basis + 2 * ta.stdev(source, 20)
lower = basis - 2 * ta.stdev(source, 20)
isConsolidating = (upper - lower) < ta.sma(upper - lower, 20)

// StockRSI
length = 14
K = 100 * (close - ta.lowest(close, length)) / (ta.highest(close, length) - ta.lowest(close, length))
D = ta.sma(K, 3)
overbought = 75
oversold = 25

var float potential_SL = na
var float potential_TP = na
var bool buy_condition = na
var bool sell_condition = na

// Buy and Sell Control Variables
var bool hasBought = false
var bool hasSold = true

// Previous values tracking
prev_macdHistogram = macdHistogram[1]
prev_close = close[1]

// Modify sell_condition with the new criteria
if isVolatile
    buy_condition := not hasBought and crossover_signal or macd_signal and (close > lower) and (close < upper)
    sell_condition := hasBought and (macdHistogram < 0 and prev_macdHistogram < 0) and (close < prev_close and prev_close < close[2])
    potential_SL := close - 0.5 * volatility
    potential_TP := close + volatility

if isTrending
    buy_condition := not hasBought and crossover_signal or macd_signal
    sell_condition := hasBought and (macdHistogram < 0 and prev_macdHistogram < 0) and (close < prev_close and prev_close < close[2])
    potential_SL := close - volatility
    potential_TP := close + 2 * volatility

if isConsolidating
    buy_condition := not hasBought and crossover_signal and (close > lower)
    sell_condition := hasBought and (close < upper) and (macdHistogram < 0 and prev_macdHistogram < 0) and (close < prev_close and prev_close < close[2])
    potential_SL := close - 0.5 * volatility
    potential_TP := close + volatility

// Update the hasBought and hasSold flags
if buy_condition
    hasBought := true
    hasSold := false

if sell_condition
    hasBought := false
    hasSold := true

// Strategy Entry and Exit
if buy_condition
    strategy.entry("BUY", strategy.long, stop=potential_SL, limit=potential_TP)
    strategy.exit("SELL_TS", from_entry="BUY", trail_price=close, trail_offset=close * 0.05)

if sell_condition
    strategy.close("BUY")
    
// Visualization
plotshape(series=buy_condition, style=shape.labelup, location=location.belowbar, color=color.green, text="BUY", size=size.small)
plotshape(series=sell_condition, style=shape.labeldown, location=location.abovebar, color=color.red, text="SELL", size=size.small)

plot(long_term_ma, color=color.gray, title="200-Day MA", linewidth=1)
plot(potential_SL, title="SL Level", color=color.red, linewidth=1, style=plot.style_linebr)
plot(potential_TP, title="TP Level", color=color.green, linewidth=1, style=plot.style_linebr)

bgcolor(isVolatile ? color.new(color.purple, 90) : isTrending ? color.new(color.blue, 90) : isConsolidating ? color.new(color.orange, 90) : na)

```

> Detail

https://www.fmz.com/strategy/441045

> Last Modified

2024-02-05 10:23:10
