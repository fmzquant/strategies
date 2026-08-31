
> Name

Bollinger-Bands-Breakout-with-Volatility-Filter-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13dbe9dae210a699f57.png)

## Strategy Overview

The Bollinger Bands Breakout with Volatility Filter Strategy is a trading strategy based on the Bollinger Bands indicator. It utilizes Bollinger Bands to determine the position and volatility of price relative to the moving average, thus deciding on entry and exit points. A unique aspect of this strategy is that it employs a volatility filter, which avoids entering trades during high market volatility by detecting the rate of change of consecutive candlesticks. Additionally, the strategy sets conditions for taking profits and stopping losses to protect profits and control risks.

## Strategy Principles

At the core of the strategy is the calculation of the Bollinger Bands indicator. Bollinger Bands consist of three lines: the middle line is a simple moving average, while the upper and lower bands are set at a certain standard deviation above and below the middle line, respectively. The size of the standard deviation is controlled by the parameter mult.

The entry conditions of the strategy are based on the position of the closing price relative to the Bollinger Bands. If the trade direction is set to long (tradeDirection>=0) and the closing price breaks below the lower band by a certain percentage (lower_breakout_pct), a long position is opened; if the trade direction is set to short (tradeDirection<=0) and the closing price breaks above the upper band by a certain percentage (upper_breakout_pct), a short position is opened. The breakout percentage parameters allow the price to slightly break through the Bollinger Bands before entering a position to confirm the trend.

On the other hand, if the rate of change of two consecutive candlesticks both exceed the preset volatility threshold (Volatility), the current market volatility is considered high, and the strategy will not open new positions. This volatility filter can avoid trading in extremely volatile market conditions to a certain extent.

In terms of exiting positions, if the closing price of a long position reaches near the upper band (upper-area*long_win_pct), or the closing price of a short position reaches near the lower band (lower+area*short_win_pct), the strategy will close the corresponding position to take profits. Additionally, if the unrealized loss of a position exceeds the preset maximum drawdown percentage (max_drawdown_percent), the strategy will also close the position to stop losses.

## Strategy Advantages

1. Bollinger Bands are a mature and widely used technical indicator that incorporates information about moving averages and price volatility. Utilizing Bollinger Bands to formulate trading strategies can capture changes in trends and volatility.

2. The strategy includes both long and short entry logic, allowing flexible capture of opportunities in both bullish and bearish markets. The setting of Bollinger Band breakout points makes the entry points of the strategy more confirmatory.

3. The volatility filter avoids opening positions in extremely volatile markets, reducing risks associated with frequent trading and leverage to a certain extent.

4. The strategy employs take-profit and stop-loss mechanisms to actively manage positions and close them when prices retrace to key levels. This helps protect profits and control drawdowns.

## Strategy Risks

1. Bollinger Bands are essentially a lagging indicator and have a certain delay in reacting to the market. At critical moments of trend reversal or changes in market conditions, the strategy may miss the best entry timing.

2. The parameter settings of the strategy may not be universally applicable to different market conditions. For example, the threshold setting of the volatility filter may need to be differentiated in trending and oscillating markets. Fixed parameters may cause the strategy to be unable to open positions or open too frequently in certain market conditions.

3. Although there are stop-loss measures, when the market gaps, the strategy may not be able to execute at the preset price, leading to greater losses.

4. The strategy does not set trailing stop-losses or breakeven stops after opening positions, which may lead to some profit givebacks.

## Optimization Directions

1. Consider introducing more technical indicators or market state judgments, such as ATR, trend indicators, volatility indicators, etc., as filtering conditions for the strategy to improve the quality and timing of entries.

2. For the volatility filter, try adopting dynamic thresholds that adapt to different instruments or time frames to improve filtering effectiveness.

3. In terms of stop-loss and take-profit, introduce trailing stop or breakeven stop mechanisms to allow the strategy to hold positions when the trend continues, rather than closing positions prematurely. At the same time, consider setting different stop-loss and take-profit ratios to optimize the risk-reward ratio.

4. Further optimize position management by dynamically adjusting the entry size based on trend strength, volatility, risk level, and other indicators to control drawdowns. In addition, better utilize capital through operations such as adding and reducing positions.

## Summary

The Bollinger Bands Breakout with Volatility Filter Strategy leverages the characterization of price position and volatility by Bollinger Bands to construct a two-way trading strategy. The unique aspect of this strategy is the volatility filter that avoids trading in extremely volatile markets, while also setting relatively simple take-profit and stop-loss conditions. Overall, the strategy includes fairly comprehensive entry and exit logic and risk control, but there is room for further optimization in terms of adapting to market changes, parameter applicability, and stop-loss effectiveness. If more technical indicators, dynamic parameters, and position management optimizations can be introduced, the robustness and profitability of the strategy may be improved.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5.5|Maximum Acceptable Drawdown|
|v_input_2|50|Short Entry Breakout Percentage|
|v_input_3|25|Long Entry Breakout Percentage|
|v_input_4|true|Trade Direction|
|v_input_5|0.5|Volatility|
|v_input_6|-0.15|Long Settlement Rate Near Boll Upper Limit|
|v_input_7|0.4|Short Settlement Rate Near Boll Lower Limit|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-29 00:00:00
end: 2024-03-07 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("[Oppen Chow] Super BBS 1.0", default_qty_type = strategy.percent_of_equity, default_qty_value =100, initial_capital=500, commission_type=strategy.commission.percent, commission_value=0.08, pyramiding=2 )

// Input parameters
length = 20
mult = 2
max_drawdown_percent = input(5.5, "Maximum Acceptable Drawdown") / 100
upper_breakout_pct = input(50, "Short Entry Breakout Percentage") / 100
lower_breakout_pct = input(25, "Long Entry Breakout Percentage") / 100
tradeDirection = input(1, title="Trade Direction")
Volatility = input(0.5, title="Volatility") / 100
long_win_pct = input(-0.15, title = "Long Settlement Rate Near Boll Upper Limit")
short_win_pct = input(0.4, title = "Short Settlement Rate Near Boll Lower Limit")

// Bollinger Bands calculation
basis = ta.sma(close, length)
dev = mult * ta.stdev(close, length)
upper = basis + dev
lower = basis - dev
area = upper - lower

// Calculate the rate of change for two consecutive candlesticks
var float change1 = na
var float change2 = na
change1 := change2
change2 := ((close - open) / open) 

// Check for two or more consecutive candlesticks with a change rate greater than 0.5%
var bool highVolatility = false
highVolatility := change2 > Volatility

// Trading logic
var float highestPriceSinceOpen = na
var float lowestPriceSinceOpen = na
var int profitableDrawbackCount = 1


// Entry logic - In the absence of high volatility
if not highVolatility and strategy.position_size == 0
    if (tradeDirection >= 0) and (close < lower - area * lower_breakout_pct)
        strategy.entry("Long", strategy.long)
        highestPriceSinceOpen := close
        profitableDrawbackCount := 0
    if (tradeDirection <= 0) and (close > upper + area * upper_breakout_pct)
        strategy.entry("Short", strategy.short)
        lowestPriceSinceOpen := close
        profitableDrawbackCount := 0


if strategy.position_size > 0 and close > upper - area * long_win_pct
    strategy.close("Long", comment = "Take Profit")
if strategy.position_size < 0 and close < lower + area * short_win_pct
    strategy.close("Short", comment = "Take Profit")

// Stop loss logic - Based on drawdown percentage
if strategy.position_size > 0
    if (strategy.position_avg_price - close)/strategy.position_avg_price >= max_drawdown_percent
        strategy.close("Long", comment = "Drawdown Stop Loss")
else if strategy.position_size < 0
    if (close - strategy.position_avg_price)/strategy.position_avg_price >= max_drawdown_percent
        strategy.close("Short", comment = "Drawdown Stop Loss")

```

> Detail

https://www.fmz.com/strategy/444009

> Last Modified

2024-03-08 15:28:05
