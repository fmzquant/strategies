
> Name

Double-Moving-Average-Crossover-Strategy-440517

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6930d91716e4ea0611.png)

## Overview

This is a trading strategy based on double moving averages crossover. It generates buy and sell signals when two moving averages of different lengths cross over. Specifically, it goes long when the faster MA crosses above the slower MA, and goes short when the faster MA crosses below the slower MA.  

## Strategy Logic

The core logic of this strategy lies in the crossover principles between two moving averages. A moving average is the arithmetic average price over a specified time period. It helps filter out market noise and reveal clearer price trends.

In this strategy, the shorter-term MA captures short-term trends while the longer-term MA captures long-term trends. As the short-term MA is more sensitive in responding to the latest price changes, crossing over the long-term MA signals a trend reversal ahead. 

Specifically, the strategy calculates the MAs using ta.sma over the long_period and short_period defined by users. It then uses ta.crossover and ta.crossunder to detect the golden crossover and death crossover between the two MAs. When the short MA crosses above the long MA, go long. When the short MA crosses below, go short.

## Advantages  

The main advantages of this strategy include:

1. Simple logic, easy to follow.  
2. Customizable parameters adaptable to various markets.
3. MA crossover filters out noise, capturing trend reversal.  
4. High sensitivity in capturing price inflection points.

## Risks

There are also several risks:   

1. Too small gap between MAs causes false signals.
2. Wrong MA periods miss major trends. 
3. Reversals do not always imply trend changes.
4. Parameters need adjustment to avoid overfitting.  

To mitigate the risks, parameters can be tuned, stop loss and take profit can be incorporated, or other technical indicators can be added.

## Optimization

There is room for further optimization:

1. Optimize adaptive MA periods.  
2. Add volume filter to avoid false breakout.
3. Incorporate other indicators like MACD, KDJ. 
4. Add stop loss/take profit to limit loss.
5. Improve code structure for better scalability.

## Conclusion

In conclusion, this is an ideal starter strategy for algorithmic trading, thanks to its simplicity in logic and parameters while still able to effectively capture market reversals. At the same time, it has great potential for optimizations to fit various trading needs.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Long Period|
|v_input_2|5|Short Period|
|v_input_string_1|0|MA type: SMA|EMA|
|v_input_3|true|Stop Loss (%)|
|v_input_4|2|Take Profit (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Cross 2 Moving Average Strategy", shorttitle="2MA Cross", overlay=true)

// User-defined input for moving averages
long_period = input(20, title="Long Period")
short_period = input(5, title="Short Period")
type_ma = input.string("SMA", title = "MA type", options = ["SMA", "EMA"])

// Calculating moving averages
long_ma = ta.sma(close, long_period)
short_ma = ta.sma(close, short_period)

// Plot moving averages
plot(long_ma, title="Long Moving Average", color=color.red)
plot(short_ma, title="Short Moving Average", color=color.green)

// Strategy logic for crossing of moving averages
longCondition = ta.crossover(short_ma, long_ma)
shortCondition = ta.crossunder(short_ma, long_ma)

// Entry orders
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

// Optional: Add stop loss and take profit
stop_loss_perc = input(1, title="Stop Loss (%)") / 100
take_profit_perc = input(2, title="Take Profit (%)") / 100

strategy.exit("Exit Long", from_entry="Long", stop=close*(1-stop_loss_perc), limit=close*(1+take_profit_perc))
strategy.exit("Exit Short", from_entry="Short", stop=close*(1+stop_loss_perc), limit=close*(1-take_profit_perc))

```

> Detail

https://www.fmz.com/strategy/440517

> Last Modified

2024-01-31 11:29:45
