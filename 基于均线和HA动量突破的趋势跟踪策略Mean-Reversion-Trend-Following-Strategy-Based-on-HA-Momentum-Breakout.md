
> Name

基于均线和HA动量突破的趋势跟踪策略Mean-Reversion-Trend-Following-Strategy-Based-on-HA-Momentum-Breakout

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e9502a892940db2c71.png)

## Overview  

This is a quantitative trading strategy that tracks trends by judging the overall trend based on moving averages and determining breakout points using the HA momentum indicator. The strategy is simple and easy to understand, using moving averages to determine the direction of the major trend and then relying on the HA momentum indicator to identify specific entry points.  

## Strategy Logic

The core logic behind this strategy involves using moving averages and the HA momentum indicator to follow trends. Specifically:

1. Judging Overall Trend: 20-day and 200-day simple moving averages are computed, when the 20-day moving average is above (below) the 200-day line, an upward (downward) trend is determined.  

2. Deciding Entry Timing: The HA momentum indicator is computed by comparing the size of candle body openings, values greater than the HA_Candle_strength parameter imply stronger momentum where positions can be entered. In addition, the closing price is checked to be above/below the 20-day moving average to determine the breakout direction.

3. Setting Stop Loss/Take Profit Exits: Strategy exits are defined based on profit/loss amounts.

Through this process, the strategy is able to capture intermediate parts of established trends and follow them.

## Advantage Analysis 

The advantages of this strategy include:

1. Simple and clear logic that is easy to understand/optimize.  

2. Moving averages filter noise and capture primary trend.

3. HA momentum avoids false breakouts by gauging breakout strength.  

4. Entry timing accuracy is improved via combination of trend direction and momentum.

5. Defined stop loss/take profit exits control single trade risk.

## Risk Analysis

Main risks faced by this strategy:

1. Frequent crossover signals may lead to bad trades in ranging markets.

2. Inappropriate parameter settings could lead to missed trades or false signals.  

3. Unable to adapt across all market regime types, may face larger losses in choppy sideways markets.

4. Failure to identify trend reversal points in a timely manner could lead to amplified losses.

Corresponding solutions:

1. Additional filters to eliminate invalid signals.  

2. Parameter optimization testing to find ideal parameter combinations.

3. Incorporate volatility metrics to avoid mistakes in choppy markets. 

4. Use adaptive stop loss orders to lock in profits.

## Enhancement Opportunities 

Further improvements for this strategy:

1. Employ adaptive moving average periods instead of fixed values to improve robustness.  

2. Add volume filter to avoid signals when market conviction weak.

3. Auto-optimize parameters via machine learning for increased stability.  

4. Dynamic trailing stop loss instead of static stop loss to capture profits.

5. Incorporate more indicators judging quality and market conditions.

## Conclusion

In summary, this is a trend following strategy based on determining the direction of the prevailing trend with moving averages and using HA momentum for timing entry signals. The logic is simple and clear, providing precise signal generation during trend progression. There are some limitations that need to be addressed via further optimization and additional filters, but overall this strategy serves as a good introductory example for aspiring quant traders to learn from.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|MA for trend direction|
|v_input_2|2|HA candle strength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-03 00:00:00
end: 2023-12-10 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("HA Trend Following", overlay=false, default_qty_type = strategy.percent_of_equity, default_qty_value = 2)


//parameters input
Trend_DIR_MA   = input(defval = 200, title = "MA for trend direction")
HA_Candle_strength   = input(defval = 2, title = "HA candle strength")

Rng = abs(open - close)

// HA_Momentum - size of break out body
HA_Momentum = sma(Rng, 1) / sma(Rng, 5)
plot(HA_Momentum, color=green, linewidth=1, style=line)
plot(HA_Candle_strength, color= blue)

// open position
longCondition = close > sma(close, 20) and (sma(close, 20) > sma(close, Trend_DIR_MA) )and HA_Momentum > HA_Candle_strength and close - open > 0
if (longCondition)
    strategy.entry(id = "Lng", long = true)

ShortCondition = close < sma(close, 20) and (sma(close, 20) < sma(close, Trend_DIR_MA) ) and HA_Momentum > HA_Candle_strength and close - open < 0
if (ShortCondition)
    strategy.entry(id = "Shrt", long = false)


// close position
strategy.exit("ExL", from_entry = "Lng", loss = 500 , profit = 1500)
strategy.exit("ExS", from_entry = "Shrt", loss = 500 , profit = 1500)



```

> Detail

https://www.fmz.com/strategy/435017

> Last Modified

2023-12-11 16:56:47
