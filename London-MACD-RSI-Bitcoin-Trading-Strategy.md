
> Name

London-MACD-RSI-Bitcoin-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/32045c9aceedc48d06.png)

## Overview

This strategy is a London session bitcoin trading strategy based on the technical indicators MACD and RSI. It only opens positions during the London session, using MACD to determine the trend direction and RSI to judge overbought and oversold conditions. The strategy is suitable for medium and short-term bitcoin trading.  

## Principles

### London Trading Session 

The London trading session is very active in the forex market, with most institutions participating. This strategy sets the London session from 7 am to 4 pm, and only opens positions during this period.

### MACD to Determine Trend

MACD can generally determine the trend direction. When the fast line crosses above the slow line, it is a golden cross, indicating an uptrend to go long. When the fast line crosses below the slow line, it is a death cross, indicating a downtrend to go short. This strategy utilizes this principle to determine the trend direction.

### RSI to Judge Overbought/Oversold

RSI can judge whether the market is overbought or oversold. Above 70 indicates overbought, while below 30 oversold. This strategy uses this to set stop loss exit points.

## Advantage Analysis  

The biggest advantage of this strategy is that it combines trend trading and rhythm trading based on overbought/oversold conditions. When the trend is unclear, it can use MACD to judge the possible trend; use RSI to control risks and avoid chasing rises and selling falls blindly without a clear trend. In addition, this strategy only opens positions during the London session dominated by institutions, reducing the impact of irrational price fluctuations.

## Risk Analysis

The main risk of this strategy is that MACD, as a technical indicator for range-bound markets, does not work very well in apparent trends. If faced with a prolonged one-way trend, the MACD golden/death crosses may frequently fail. In addition, RSI can also fail when hovering at high or low levels for extended periods. To reduce these risks, we can appropriately adjust parameters or add other filters to ensure opening positions only on high probability signals.

## Optimization

This strategy can be optimized in several aspects:

1. Add other technical filters like Bollinger Bands and KDJ to avoid false breakouts.  

2. Add profit taking mechanisms like trailing stop loss or price gap take profit to lock in more profits.

3. Optimize parameters by adjusting MACD and RSI parameters to suit different market conditions. 

4. Add machine learning elements, using LSTM models etc to determine trend.

## Conclusion  

Overall this is a reliable London session bitcoin trading strategy. It combines trend and rhythm, filtering out invalid signals while ensuring relatively high profitability. Through continuous optimization of parameters and integrating more technical indicators, this strategy can further enhance stability and profitability. It suits investors with some knowledge of the London session, MACD and RSI technical indicators.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6|London Session Start Hour|
|v_input_2|59|London Session Start Minute|
|v_input_3|15|London Session End Hour|
|v_input_4|59|London Session End Minute|
|v_input_5|12|Fast Length|
|v_input_6|26|Slow Length|
|v_input_7|9|Signal SMA|
|v_input_8|14|RSI Length|
|v_input_9|65|RSI Overbought|
|v_input_10|35|RSI Oversold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-11-22 08:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("London MACD RSI Strategy -1H BTC", overlay=true)

// Define London session times
london_session_start_hour = input(6, title="London Session Start Hour")
london_session_start_minute = input(59, title="London Session Start Minute")
london_session_end_hour = input(15, title="London Session End Hour")
london_session_end_minute = input(59, title="London Session End Minute")

// Define MACD settings
fastLength = input(12, title="Fast Length")
slowLength = input(26, title="Slow Length")
signalSMA = input(9, title="Signal SMA")

// RSI settings
rsiLength = input(14, title="RSI Length")
rsiOverbought = input(65, title="RSI Overbought")
rsiOversold = input(35, title="RSI Oversold")

// Calculate MACD
[macdLine, signalLine, _] = ta.macd(close, fastLength, slowLength, signalSMA)

// Calculate RSI
rsi = ta.rsi(close, rsiLength)

// Convert input values to timestamps
london_session_start_timestamp = timestamp(year, month, dayofmonth, london_session_start_hour, london_session_start_minute)
london_session_end_timestamp = timestamp(year, month, dayofmonth, london_session_end_hour, london_session_end_minute)

// Filter for London session
in_london_session = time >= london_session_start_timestamp and time <= london_session_end_timestamp

// Long and Short Conditions
longCondition = ta.crossover(macdLine, signalLine) and rsi < rsiOversold and in_london_session
shortCondition = ta.crossunder(macdLine, signalLine) and rsi > rsiOverbought and in_london_session

// Strategy entries and exits
if (longCondition)
    strategy.entry("Long", strategy.long)
if (shortCondition)
    strategy.entry("Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/433430

> Last Modified

2023-11-27 15:44:29
