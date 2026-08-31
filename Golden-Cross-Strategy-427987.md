
> Name

Golden-Cross-Strategy-427987

> Author

ChaoZhang

> Strategy Description



## Overview

The Golden Cross strategy is a simple market indicator that helps long-term investors determine entry timing. The strategy generates trading signals based on the crossovers of short-term and long-term moving averages. When the short-term moving average crosses above the long-term moving average, forming a Golden Cross, it signals that the market is entering a bull trend and long positions can be opened. When the short-term moving average crosses below the long-term moving average, forming a Death Cross, it signals that the market is entering a bear trend and existing positions should be closed.

## Strategy Logic

This strategy uses the sma function to compute short-term and long-term simple moving averages. The short-term MA length is set to 50 days and the long-term MA length is set to 200 days. The strategy determines if the short-term MA crosses over or crosses under the long-term MA using the crossover and crossunder functions, which generates trade signals. 

When the short-term MA crosses above the long-term MA, it signals the trend is changing from downward to upward, forming a Golden Cross, which is the long entry signal. The strategy will open a long position using strategy.entry. When the short-term MA crosses below the long-term MA, it signals the trend is changing from upward to downward, forming a Death Cross, which is the exit signal. The strategy will close all positions using strategy.close_all.

By capturing trend reversal points marked by Golden/Death Crosses to determine entry and exit timing, the strategy can effectively filter out market noise and is a simple and practical trend following strategy.

## Advantage Analysis

- The strategy is easy to understand and implement, suitable for beginners;
- Moving averages help filter market noise and capture trends;
- Golden Crosses are recognized powerful bull signals to catch uptrends; 
- Death Crosses are relatively strong bear signals to reduce losses;
- The parameters are highly optimizable by adjusting MA lengths for different markets; 
- Visual crossover signals are intuitive and readable.

## Risk Analysis

- MAs have lag and may miss best timing for trend reversals;
- Simple MA crosses cannot fully avoid false signals;
- Black swan events like major negative news are not considered;
- No stop loss to effectively limit single loss;
- Buy on Death Cross risks losses, exit on Golden Cross risks missing profits.

Risks can be managed by adding stop loss, optimizing MA parameters to reduce false signals, combining with other indicators to confirm signals, and developing mechanisms to handle black swan events.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize MA parameters by adjusting short and long term MA lengths to better fit different market characteristics;

2. Add volume condition to trigger signals only when volume surges;

3. Incorporate other indicators like MACD, RSI to confirm crossover signals and avoid false signals;

4. Add stop loss strategies like trailing stop loss, percentage stop loss to control single loss;

5. Add position sizing strategies like fixed fraction, exponential sizing to control overall risk;

6. Optimize entry by observing for some time after crossover to filter fake crosses.

Through the above optimizations, the strategy parameters can better match market statistical properties, filter false signals, control risks, and further improve the stability and profitability of the strategy while maintaining simplicity.

## Conclusion

The Golden Cross strategy is a simple yet practical trend following strategy. It intuitively captures market trends through moving average crosses and can effectively identify entry and exit points for long-term investors. Easy to implement, suitable for beginners to learn, and adaptable to various optimizations, the strategy can become a flexible and reliable trading system. Overall, combining simplicity and practicality, the Golden Cross strategy is a valuable addition to the quantitative trading toolkit.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|short length|
|v_input_2|200|long length|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|2009|Backtest Start Year|
|v_input_5|true|Backtest Start Month|
|v_input_6|true|Backtest Start Day|
|v_input_7|2019|Backtest Stop Year|
|v_input_8|true|Backtest Stop Month|
|v_input_9|true|Backtest Stop Day|
|v_input_10|true|Color Background?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-27 00:00:00
end: 2023-09-26 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Dumb strategy 2 - Golden Cross", shorttitle="Golden Cross", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

lShort = input(50, title="short length")
lLong = input(200, title="long length")
src = input(close, title="Source")

smaShort = sma(src, lShort)
smaLong = sma(src, lLong)

plot(smaShort, title="SMA Short", style=line, linewidth=3, color=lime)
plot(smaLong, title="SMA Long", style=line, linewidth=3, color=red)


//
//Backtest Time Inputs
//

testStartYear = input(2009, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(1, "Backtest Stop Month")
testStopDay = input(01, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriodBackground = input(title="Color Background?", type=bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? blue : na
bgcolor(testPeriodBackgroundColor, transp=80)


testPeriod() => true

	

if testPeriod()
	longCondition = crossover(smaShort, smaLong)
	if (longCondition)
		strategy.entry("Long Entry", strategy.long)

	shortCondition = crossunder(smaShort, smaLong)
	if (shortCondition)
		strategy.close_all(true)
	
```

> Detail

https://www.fmz.com/strategy/427987

> Last Modified

2023-09-27 16:23:51
