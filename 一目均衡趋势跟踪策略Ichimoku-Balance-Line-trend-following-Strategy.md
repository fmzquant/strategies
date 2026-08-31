
> Name

一目均衡趋势跟踪策略Ichimoku-Balance-Line-trend-following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12061c1835c13a6fb97.png)



### Overview

The Ichimoku Balance Line strategy is a trend following strategy that combines the Conversion Line and Base Line from the Ichimoku Cloud indicator and the moving average EMA to determine the trend direction. It enters long positions when the Conversion Line crosses above the Base Line and the price is above the 200-day EMA; closes positions when the Conversion Line crosses below the Base Line. This strategy incorporates multiple indicators to determine the trend direction, which allows effectively following the trend and achieving excess returns.

### Strategy Logic

The strategy primarily uses the following indicators:

1. Conversion Line: The midpoint of the Donchian Channel, representing the shortest-term trend of the price, similar to a 9-day moving average.

2. Base Line: The midpoint of the Donchian Channel, representing the medium-term trend of the price, similar to a 26-day moving average.

3. Lagging Span: The displaced moving average of the closing price, displacement period is 120 days, used to determine support and resistance.

4. Lead 1: The average of the Conversion Line and the Base Line, representing the long-term trend. 

5. Lead 2: The midpoint of the 120-day Donchian Channel, representing the longest-term trend.

6. EMA200: The 200-day exponential moving average judging the major trend direction.

When the Conversion Line crosses above the Base Line, it signals the short-term moving average is crossing above the long-term moving average, which is a bullish golden cross signal indicating the trend is strengthening for going long. If the price is also above the 200-day EMA, it indicates the major trend is upward, making the long signal more reliable.

When the Conversion Line crosses below the Base Line, it is a death cross signal indicating the trend is turning weak, and positions should be closed for stop loss.

By combining crossover signals of multiple moving averages, the strategy can effectively determine trend reversal points for trend following. Using the long-term moving average filter avoids incorrect signals caused by short-term market fluctuations.

### Advantage Analysis 

1. Using multiple moving averages to determine the trend direction improves accuracy. The Conversion and Base Line crossovers are the core trading signals, while the alignment of Lead 1 and 2 validates the reliability of the signals.

2. The Lagging Span can be used to confirm support and resistance levels, further improving entry timing.

3. Applying the EMA200 to gauge the major trend avoids incorrect trades due to short-term corrections. Only long signals are considered in a major uptrend.

4. The periods of the Conversion and Base Lines can be optimized to capture trend reversal points across different timeframes.

5. The strategy logic is straightforward and easy to implement for live trading.

### Risk Analysis

1. When the Conversion and Base Lines cross, watch for the alignment of Lead 1 and 2 to confirm the signal. If the alignment is anomalous, it may be a false breakout, in which case trades should be avoided.

2. Longer-term indicators like the EMA200 must be incorporated to determine the major trend. Long signals should be avoided if the major trend is down.

3. The strategy relies more on trends, so can generate incorrect signals and stop loss in ranging markets. Volatility measures should be added to control risk.

4. Parameter tuning through backtesting optimization is needed to avoid oversensitive or lagging signals from improper Conversion and Base Line periods. 

5. Optimization is needed on the number of moving average periods used. Too many may lead to excessive curve fitting.

### Enhancement Opportunities

1. Other moving averages like the EMA 50 and EMA 100 can be tested to corroborate the trend.

2. Volume indicators should confirm trend reversal points and avoid false breakouts. For example, require rising volume on breakouts.

3. Volatility measures like ATR can be used to dynamically adjust stop loss and take profit levels. Widen stops and targets when volatility expands, and tighten them to lock in profits when volatility contracts.

4. Backtest to find the optimal parameter combinations for the Conversion and Base Line periods for more consistent signals. 

5. Build a position sizing rule to increase long exposure in uptrends and decrease exposure in choppy conditions.

### Summary

The Ichimoku Balance Line strategy captures mid- to long-term trends by entering on trend reversal signals from multiple moving average crossovers. Compared to single indicator strategies, it can filter out false signals and improve entry accuracy. But parameters need to be optimized, and additional indicators incorporated to ensure reliable signals and manage risk. With well-tuned settings, trade frequency should not be too high, allowing riding long swings for excess returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Conversion Line Periods|
|v_input_2|60|Base Line Periods|
|v_input_3|120|Lagging Span 2 Periods|
|v_input_4|30|Displacement|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-18 00:00:00
end: 2023-10-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="TK Cross > EMA200 Strat", shorttitle="TK Cross > EMA200 Strat", overlay=true)

ema200 = ema(close, 200)
conversionPeriods = input(20, minval=1, title="Conversion Line Periods"),
basePeriods = input(60, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(120, minval=1, title="Lagging Span 2 Periods"),
displacement = input(30, minval=1, title="Displacement")

donchian(len) => avg(lowest(len), highest(len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

plot(conversionLine, color=#0496ff, title="Conversion Line", linewidth=4)
plot(baseLine, color=#991515, title="Base Line", linewidth=4)
plot(close, offset = -displacement, color=#459915, title="Lagging Span")

p1 = plot(leadLine1, offset = displacement, color=green,
 title="Lead 1")
p2 = plot(leadLine2, offset = displacement, color=red, 
 title="Lead 2")
fill(p1, p2, color = leadLine1 > leadLine2 ? green : red)

plot(ema200, color=purple, linewidth=4)
strategy.initial_capital = 50000
strategy.entry('tkcross', strategy.long, strategy.initial_capital / close, when=conversionLine>baseLine and close > ema200)
strategy.close('tkcross', when=conversionLine<baseLine)

```

> Detail

https://www.fmz.com/strategy/430142

> Last Modified

2023-10-25 14:32:23
