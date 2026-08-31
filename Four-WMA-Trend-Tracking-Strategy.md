
> Name

Four-WMA-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10e013284055eb0dae5.png)

## Overview

The Four WMA Trend Tracking strategy is a quantitative trading strategy that utilizes four weighted moving averages (WMA) of different timeframes to identify price trend reversals in stocks and establish long or short positions when those reversals happen. It also implements stop loss and take profit mechanisms to control risks.

## Strategy Logic  

The strategy employs four WMA lines. Two longer period WMAs (longM1 and longM2) are used to identify uptrends and long entry signals, while the other two shorter period WMAs (shortM1 and shortM2) are for identifying downtrends and short entry signals. The specific trading rules are:

1. When the shorter period WMA crosses below the longer period WMA, a long signal is generated and a long position is established.  

2. When the shorter period WMA crosses above the longer period WMA, a short signal is generated and a short position is established.
 
3. Take profit and stop loss levels are set for each position based on the input percentage of the entry price.
 
4. When price reaches either take profit or stop loss level, the corresponding position is closed.  

In essence, this strategy tracks potential turning points of price trends by observing crossover of the contraction and expansion of moving average lines, entering positions on those signals, and then managing risks/profits with stop loss and take profit.

## Advantage Analysis

The Four WMA Trend Tracking Strategy has the following advantages:

1. Clear signal sources from crossover of the four moving averages, which helps determine market trend.  
2. More reliable entry signals as two sets of MAs are used to filter out false signals.   
3. Manage risk/reward on each position with stop loss and take profit. Avoid large losses on single positions.  
4. Simple to implement and test with few parameters.  

## Risk Analysis   

There are also some potential risks of this strategy:

1. High reliance on moving averages which could lag severely during high price volatility.  
2. Whipsaws might happen frequently, incurring high trading frequency and commissions.
3. Fixed percentage stop loss/profit taking may fail to adapt to real-time market fluctuations.  

To mitigate the risks, considerations include combining other indicators to confirm signals, optimizing entry rules and stop loss, or manual intervention during abnormal markets.

## Enhancement Opportunities

Some directions to optimize the strategy:

1. Test more combinations of MA parameters to find the optimal set.  
2. Add volume or volatility indicators to filter false signals.   
3. Build adaptive mechanisms for stop loss/profit taking, based on market volatility.  
4. Refine entry rules to avoid overly frequent reverse entries.   

## Conclusion

In summary, the Four WMA Trend Tracking Strategy is a relatively straightforward trend tracking strategy. It identifies potential turning points with crossover of multiple moving averages and manages trades with stop loss/take profit. When properly configured, it can perform well for stable stocks. However, traders should be aware of potential false signals and fine-tune parameters to suit real market regimes when applying it.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|Long WMA1|
|v_input_int_2|20|Long WMA2|
|v_input_int_3|30|Short WMA1|
|v_input_int_4|40|Short WMA2|
|v_input_float_1|true|Take Profit %|
|v_input_float_2|true|Stop Loss %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-22 00:00:00
end: 2024-02-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@rosedenvy
//@version=5
strategy("Four WMA Strategy with TP and SL", shorttitle="4WMA TP/SL", overlay=true)

// Inputs for WMA lengths
longM1 = input.int(10, title="Long WMA1")
longM2 = input.int(20, title="Long WMA2")
shortM1 = input.int(30, title="Short WMA1")
shortM2 = input.int(40, title="Short WMA2")

// Inputs for TP and SL
tp_percent = input.float(1.0, title="Take Profit %") / 100
sl_percent = input.float(1.0, title="Stop Loss %") / 100

// Calculating WMAs
longWMA1 = ta.wma(close, longM1)
longWMA2 = ta.wma(close, longM2)
shortWMA1 = ta.wma(close, shortM1)
shortWMA2 = ta.wma(close, shortM2)

// Entry Conditions
longCondition = ta.crossunder(longWMA1, longWMA2)
shortCondition = ta.crossunder(shortWMA2, shortWMA1)

// Strategy Entry
if (longCondition)
    strategy.entry("Long", strategy.long, comment = "Long entry")
    strategy.exit("Long TP/SL", "Long", limit=close * (1 + tp_percent), stop=close * (1 - sl_percent), comment = "Long Exit" )

if (shortCondition)
    strategy.entry("Short", strategy.short, comment = "Short entry")
    strategy.exit("Short TP/SL", "Short", limit=close * (1 - tp_percent), stop=close * (1 + sl_percent), comment = "Short Exit")

// Plotting WMAs
plot(longWMA1, color=color.blue)
plot(longWMA2, color=color.orange)
plot(shortWMA1, color=color.red)
plot(shortWMA2, color=color.purple)

```

> Detail

https://www.fmz.com/strategy/442512

> Last Modified

2024-02-22 15:21:46
