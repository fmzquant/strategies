
> Name

双均线突破量化交易策略Dual-Moving-Average-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c67bdc37d01cc6b423.png)

## Overview

The dual moving average breakout strategy is a typical trend following quantitative trading strategy. It generates trading signals by calculating simple moving averages of different periods and checking if the price breaks through them to determine positions. This strategy uses 20-day and 60-day moving averages as trading signals.  

## Strategy Logic

The core logic of the dual MA strategy is to **use moving averages of different periods to capture price trends and generate trading signals when the price breaks through the moving averages**.  

Specifically, this strategy employs 20-day and 60-day simple moving averages. These two moving averages can be seen as tools to capture short-term and medium-long term trends respectively. When the short term price breaks through the medium-long term price, it signals that the market is in an upward trend and thus should go long. When the short term price drops below the medium-long term price, it signals that the market is in a downward trend and thus positions should be reduced.

The code uses `ta.crossover` and `ta.crossunder` to determine if the price has broken through or dropped below a moving average. Trading signals of going long or reducing position are emitted accordingly when a breakout happens.  

## Advantages

The dual moving average breakout strategy has the following advantages:

1. The concept is simple and easy to understand and implement.  
2. It can effectively track market trends and avoid noise interference.
3. Few strategy parameters and easy to optimize.  
4. Flexible in choosing moving average periods to adjust market sensitivity.

## Risks

There are also some risks with the strategy:

1. Prone to whipsaws when market is ranging. Can be alleviated by increasing holding period.
2. Ineffective in catching quick market reversals. Other indicators can be added as filters.
3. Moving averages inherently lagging, unable to early signal price changes. Shortening period may help.

## Enhancement Areas

The strategy can be enhanced from the following dimensions:  

1. Optimize moving average periods to find best parameter sets.
2. Add other indicators to filter out false signals, e.g. MACD, KD etc.  
3. Add stop loss logic.  
4. Incorporate multi-timeframe analysis for robustness.

## Summary

The dual moving average breakout strategy is a simple and practical trend following strategy. It can effectively capture medium-long term trends while avoiding short-term market noise. Also, the easy-to-understand logic and limited parameters make it very suitable for quantitative trading. Of course there are rooms for improvements, such as parameter tuning, signal filtering and stop loss to make it more stable and profitable.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2018|backtest_year|
|v_input_int_1|true|backtest_month|
|v_input_int_2|true|backtest_day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-02-03 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Astorhsu

//@version=5
strategy("Astor SMA20/60", overlay=true)
backtest_year = input(2018, title='backtest_year') //回測開始年分
backtest_month = input.int(01, title='backtest_month', minval=1, maxval=12) //回測開始月份
backtest_day = input.int(01, title='backtest_day', minval=1, maxval=31)  //回測開始日期
start_time = timestamp(backtest_year, backtest_month, backtest_day, 00, 00)  //回測開始的時間函數

//Indicators
sma10 = ta.sma(close,10)
sma20 = ta.sma(close,20)
sma60 = ta.sma(close,60)
plot(sma20, color=color.green, title="sma(20)")
plot(sma60, color=color.red, title="sma(60)")

//進場條件
// trend1 = sma60 > sma20 //假設目前趨勢為60>20
longCondition = ta.crossover(close, ta.sma(close, 20))
if (longCondition) 
    strategy.entry("open long20", strategy.long, qty=1, comment="站上m20做多")


shortCondition = ta.crossunder(close, ta.sma(close, 20))
if (shortCondition) 
    strategy.close("open long20",comment="跌破m20平倉", qty=1)     
    
longCondition1 = ta.crossover(close, ta.sma(close, 60))
if (longCondition1) 
    strategy.entry("open long60", strategy.long, qty=1, comment="站上m60做多")


shortCondition1 = ta.crossunder(close, ta.sma(close, 60))
if (shortCondition1) 
    strategy.close("open long60",comment="跌破m60平倉", qty=1)     
    
// longCondition2 = ta.crossover(close, ta.sma(close, 10))
// if (longCondition2) 
//     strategy.entry("open long10", strategy.long, qty=1, comment="站上m10做多")


// shortCondition2 = ta.crossunder(close, ta.sma(close, 10))
// if (shortCondition2)
//     strategy.close("open long10",comment="跌破m10平倉", qty=1)   

```

> Detail

https://www.fmz.com/strategy/441003

> Last Modified

2024-02-04 16:06:46
