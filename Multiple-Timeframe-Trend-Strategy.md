
> Name

Multiple-Timeframe-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1408e1b3ab4a79b8b8a.png)



## Overview

This strategy is a trading strategy that utilizes multiple timeframes. It mainly uses the long-term timeframe to determine the trend direction, medium-term timeframe to determine momentum direction, and short-term timeframe to locate specific entry points. The overall idea is to make decisions based on trend, momentum and entry timing in three different time spans.

## Principles 

The strategy is implemented mainly through the following:

1. Define different timeframes

    - Long term (daily): to determine overall trend
    - Medium term (4-hour): to determine momentum direction
    - Short term (custom): to locate entry points

2. Determine long-term trend 

    - Use SMA to determine long-term trend direction
    - If close is above SMA, define as uptrend
    - If close is below SMA, define as downtrend

3. Determine medium-term momentum

    - Use Stoch K and D lines 
    - When K line is above D line, define as upward momentum
    - When K line is below D line, define as downward momentum

4. Locate entry points

    - Long entry: long-term uptrend, medium-term Stoch upwards, short-term MA golden cross
    - Short entry: long-term downtrend, medium-term Stoch downwards, short-term MA dead cross

5. Exit points

    - Long exit: medium-term Stoch K line crosses below D line
    - Short exit: medium-term Stoch K line crosses above D line

In summary, this strategy makes full use of information across timeframes, judging trend and timing from different dimensions, which can effectively filter false breakouts and select high probability entry points along the trend.

## Advantages

The advantages of this strategy include:

1. The multiple timeframe design is scientific and meticulous, allowing for more accurate market trend judgment and avoiding being misled by short-term market noise.

2. Comprehensive conditions considering trend, momentum and entry timing help filter out many false signals.  

3. Using Stoch to determine medium-term momentum is very precise and helps capture true market reversals.

4. The strict entry criteria avoid most false breakouts from price spikes.

5. Defined stop loss exit points effectively control risk for each trade.

6. Applicable to various market environments without being constrained by specific market conditions. 

7. There is room for optimizing capital management, such as fixed stop loss percentage, dynamic position sizing etc.

## Risks

There are also some risks to note for this strategy:

1. In ranging markets, there may be multiple stop loss hits.

2. Trend changes may not be captured in time, leading to improper trades.

3. Relying solely on Stoch for momentum judgment has limitations.

4. The strict entry criteria may cause missing out some trends. 

5. The profit potential is relatively limited, unable to capture huge trends.

Some ways to mitigate the risks:

1. Fine tune parameters to lower error rates.

2. Add trend indicators to establish combined judgment.

3. Incorporate more indicators like MACD for momentum judgment. 

4. Optimize stop loss to use trailing stop etc.

5. Promptly adjust stop loss and position size when major trend changes.

## Optimization

Some ways to optimize the strategy:

1. Parameter optimization such as MA periods, Stoch settings to improve signal accuracy.

2. Add more indicators such as MACD, Bollinger Bands for enhanced judgment.

3. Optimize entry criteria, allow more trades at acceptable risk levels.  

4. Use trailing stop loss or ATR-based stops.

5. Actively adjust position sizing when major trend changes. 

6. Utilize machine learning to auto optimize parameters and rules.

7. Consider fundamentals, use key data releases to further confirm signals.

8. Test effectiveness across different products like forex, metals etc.

## Conclusion

In summary, the core idea of this multiple timeframe trend strategy is to make decisions based on long-, medium- and short-term dimensions. The advantages lie in strict conditions and controllable risks, but parameters and rules need optimization for specific markets. Going forward, this strategy can be further enhanced by incorporating more indicators, optimizing stops, adding machine learning etc.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Entry timeframe (minutes)|
|v_input_2|50|Moving Average Period (Trend)|
|v_input_3|18|Stoch Length|
|v_input_4|80|Stoch OB|
|v_input_5|20|Stoch OS|
|v_input_6|14|Stoch SmoothK|
|v_input_7|14|Stoch SmoothD|
|v_input_8|7|Moving Avg SM|
|v_input_9|21|Moving Avg MD|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-15 00:00:00
end: 2023-10-22 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("TUX MTF", overlay=true)

// MULTIPLE TIME FRAME STRATEGY
// LONG TERM --- TREND
// MED TERM --- MOMENTUM
// SHORT TERM --- ENTRY

// ENTRY POSITION TIMEFRAME
entry_position = input(title="Entry timeframe (minutes)",  defval=5, minval=1, maxval=1440)
med_term = entry_position * 4
long_term = med_term * 4

// GLOBAL VARIABLES
ma_trend = input(title="Moving Average Period (Trend)",  defval=50, minval=5, maxval=200)

// RSI
length = input(title="Stoch Length",  defval=18, minval=5, maxval=200)
OverBought = input(title="Stoch OB",  defval=80, minval=60, maxval=100)
OverSold = input(title="Stoch OS",  defval=20, minval=5, maxval=40)
smoothK = input(title="Stoch SmoothK",  defval=14, minval=1, maxval=40)
smoothD = input(title="Stoch SmoothD",  defval=14, minval=1, maxval=40)
maSm = input(title="Moving Avg SM",  defval=7, minval=5, maxval=50)
maMed = input(title="Moving Avg MD",  defval=21, minval=13, maxval=200)

// LONG TERM TREND
long_term_trend = request.security(syminfo.ticker, tostring(long_term), sma(close,ma_trend)) > request.security(syminfo.ticker, tostring(long_term), close)
plot(request.security(syminfo.ticker, tostring(long_term), sma(close,ma_trend)), title="Long Term MA", linewidth=2)
// FALSE = BEAR
// TRUE = BULL

// MED TERM MOMENTUM

k = request.security(syminfo.ticker, tostring(med_term), sma(stoch(close, high, low, length), smoothK))
d = request.security(syminfo.ticker, tostring(med_term), sma(k, smoothD))

os = k >= OverBought or d >= OverBought
ob = k <= OverSold or d <= OverSold


// SHORT TERM MA X OVER
bull_entry = long_term_trend == false and os == false and ob == false and k > d and request.security(syminfo.ticker, tostring(entry_position), crossover(sma(close, maSm), sma(close, maMed)))
bear_entry = long_term_trend == true and os == false and ob == false and k < d and request.security(syminfo.ticker, tostring(entry_position), crossunder(sma(close, maSm), sma(close, maMed)))



bull_exit = crossunder(k,d)
bear_exit = crossover(k,d)



if (bull_entry)
    strategy.entry("Long", strategy.long)
    

if (bear_entry)
    strategy.entry("Short", strategy.short)
  
strategy.close("Long", when = bull_exit == true)
strategy.close("Short", when = bear_exit == true)

    
    

    



```

> Detail

https://www.fmz.com/strategy/429960

> Last Modified

2023-10-23 16:56:52
