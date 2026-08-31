
> Name

双均线趋势跟踪策略Double-Moving-Average-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/182f0b36bb81c6c406a.png)


## Overview

This strategy uses the crossover of two moving averages to determine changes in market trends and makes buy/sell decisions based on the trend direction. It goes long when the short-term MA crosses above the long-term MA, and goes short when the short-term MA crosses below the long-term MA, aiming to follow the trend.

## Strategy Principle

The core of this strategy is two moving averages: a fast MA (default period 32) and a slow MA (also default period 32, adjustable via parameters). When the closing price crosses above/below the channel formed by these two MAs, it indicates a trend reversal, and the strategy generates buy/sell signals accordingly:

- When the fast MA crosses above the slow MA, go long
- When the fast MA crosses below the slow MA, go short  
- When already holding a long position, if the fast MA crosses below the slow MA, close long and go short
- When already holding a short position, if the fast MA crosses above the slow MA, close short and go long

Through this MA crossover method, the strategy can follow the trend, holding long positions in uptrends and short positions in downtrends, until a reversal signal appears.

## Advantage Analysis

1. Trend following: By using MA crossovers to identify trends, the strategy can effectively capture and follow the main market trends.
2. Simple and easy to use: The strategy logic is clear, using only two MAs. Parameter settings are simple and easy to understand and master.
3. Wide applicability: The strategy is widely applicable to different instruments and timeframes, and can be used in various markets.
4. Timely stop-loss: When the trend reverses, the strategy can close positions promptly to control losses.

## Risk Analysis 

1. Poor performance in ranging markets: When the market is in a sideways pattern, frequent crossover signals will lead to excessive trading and losses.
2. Inadequate response to extreme movements: The strategy may react too slowly to extreme situations (such as rapid surges or plunges), leading to large losses.
3. Difficulty in parameter optimization: Optimizing the MA parameters requires a large amount of historical data and backtesting. The optimized parameters have limited guidance for future performance.

To address these risks, consideration can be given to adding appropriate filters, such as ATR or average true range filters, to reduce overtrading in ranging markets; setting reasonable stop-losses to control single-trade losses; and continuously optimizing parameters to adapt to the market. However, the inherent limitations of the strategy are difficult to completely avoid.

## Optimization Direction

1. Trend confirmation: After generating a trading signal, additional trend confirmation indicators such as MACD or DMI can be incorporated to further filter the signals.
2. Dynamic stop-loss: Use indicators like ATR to set dynamic stop-loss levels instead of fixed percentage or price stops, for better risk control.
3. Position sizing: Dynamically adjust position sizes based on trend strength, volatility and other indicators. Increase positions when the trend is strong and decrease when it is weak. 
4. Multi-timeframe analysis: Consider a multi-timeframe MA system, such as combining daily and 4-hour MAs, to filter and confirm each other and improve the accuracy of trend identification.
5. Adaptive parameters: Introduce adaptive parameter optimization methods, such as genetic algorithms, to enable the strategy parameters to adapt to different market conditions.

The above optimizations can enhance the strategy's ability to handle complex markets, but care must be taken to avoid over-optimization which may lead to curve fitting and poor future performance.

## Summary

The double MA trend following strategy captures trends through MA crossovers. It is simple, easy to use, and widely applicable. However, it performs poorly in ranging markets, responds inadequately to extreme movements, and faces difficulties in parameter optimization.

The strategy can be optimized by introducing more filtering indicators, dynamic stop-losses, position sizing, multi-timeframe analysis, and adaptive parameters. But the inherent limitations of MA strategies are hard to completely avoid, and caution is still needed in live trading with flexible adjustments based on market characteristics.

Overall, this strategy can serve as a basic trend-following strategy, but it is difficult to stand alone and is more suitable as part of a portfolio of strategies.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Jan 2018 00:00 +0530)|Backtest Long Start Date|
|v_input_2|timestamp(25 Jan 2030 00:00 +0530)|Backtest Long End Date|
|v_input_string_1|0|SSL MA Type: SMA|EMA|WMA|
|v_input_3|32|SSL Length|
|v_input_4|true|Show Crossover?|
|v_input_5|true|Show Entry?|
|v_input_6|true|Show Trend Colors?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-16 00:00:00
end: 2024-03-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5

//study(title="Demo - SSL Basic", shorttitle="Demo - SSL Basic", overlay=true)
strategy(title='Demo - SSL Basic', shorttitle='Demo - SSL Basic', overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=100, commission_value=0.15)

// Backtest Date Range
start_date_long = input(title='Backtest Long Start Date', defval=timestamp('01 Jan 2018 00:00 +0530'))
end_date_long = input(title='Backtest Long End Date', defval=timestamp('25 Jan 2030 00:00 +0530'))
backtest_range = true

// Inputs
maType = input.string(title='SSL MA Type', options=['SMA', 'EMA', 'WMA'], defval='SMA')
sslLen = input(title='SSL Length', defval=32)
showCross = input(title='Show Crossover?', defval=true)
showEntry = input(title='Show Entry?', defval=true)
showTrend = input(title='Show Trend Colors?', defval=true)

// Calc MA for SSL Channel
calc_ma(close, len, type) =>
    float result = 0
    if type == 'SMA'  // Simple
        result := ta.sma(close, len)
        result
    if type == 'EMA'  // Exponential
        result := ta.ema(close, len)
        result
    if type == 'WMA'  // Weighted
        result := ta.wma(close, len)
        result    
    result

// Add SSL Channel
maHigh = calc_ma(high, sslLen, maType)
maLow = calc_ma(low, sslLen, maType)
Hlv = int(na)
Hlv := close > maHigh ? 1 : close < maLow ? -1 : Hlv[1]
sslDown = Hlv < 0 ? maHigh : maLow
sslUp = Hlv < 0 ? maLow : maHigh
ss1 = plot(sslDown, title='Down SSL', linewidth=2, color=showTrend ? na : color.red)
ss2 = plot(sslUp, title='Up SSL', linewidth=2, color=showTrend ? na : color.lime)

// Conditions
longCondition = ta.crossover(sslUp, sslDown)
shortCondition = ta.crossover(sslDown, sslUp)

// Strategy
if shortCondition
    strategy.close('Long', comment='Long Exit', alert_message='JSON')

if longCondition
    strategy.close('Short', comment='Short Exit', alert_message='JSON')

if backtest_range and longCondition
    strategy.entry('Long', strategy.long, comment='Long Entry', alert_message='JSON')

if backtest_range and shortCondition
    strategy.entry('Short', strategy.short, comment= 'Short Entry', alert_message='JSON')


// Plots
fill(ss1, ss2, color=showTrend ? sslDown < sslUp ? color.new(color.lime, transp=75) : color.new(color.red, transp=75) : na, title='Trend Colors')

```

> Detail

https://www.fmz.com/strategy/445803

> Last Modified

2024-03-22 13:56:44
