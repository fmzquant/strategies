
> Name

移动平均线交叉EMA-SMA策略Moving-Average-Cross-EMA-SMA-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This is a simple trading strategy based on the crossover between fast and slow moving averages. It utilizes the golden cross and dead cross of moving averages to generate buy and sell signals. When the fast moving average crosses above the slow moving average, go long; when the fast moving average crosses below the slow moving average, go short. The goal is to capture trend reversals by observing the interaction between moving averages of different periods.

## Strategy Logic  

The strategy mainly relies on the crossover between a fast Exponential Moving Average (EMA) and a slow Simple Moving Average (SMA) to generate trading signals. It first computes a fast EMA and a slow SMA, with periods set to 13 and 30 respectively. Then, when the fast EMA crosses above the slow SMA, a long signal is generated; when the fast EMA crosses below the slow SMA, a short signal is triggered.   

Specifically, the strategy calculates the fast EMA and slow SMA using maFast and maSlow. It then defines the enterLong and exitLong variables to determine entry and exit points. When maFast>maSlow, i.e. the fast EMA crosses above the slow SMA, it sets enterLong=true to trigger a long entry; when maSlow>maFast, i.e. the fast EMA crosses below the slow SMA, it sets exitLong=true to close positions. Finally, the strategy submits orders through strategy.entry when conditions are met.

Thus, when short-term upward momentum overwhelms long-term trends, the fast EMA crosses above the slow SMA, generating a buy signal; when short-term downward momentum overwhelms long-term trends, the fast EMA crosses below the slow SMA, producing a sell signal. By capturing trend reversals across different timeframes, it aims to buy low and sell high.

## Advantage Analysis

The moving average crossover strategy has the following advantages:

1. Simple and easy to understand. Moving averages are commonly used and effective indicators. The crossover logic is straightforward. This makes the strategy easy to comprehend and implement for traders.

2. Highly customizable. The strategy allows custom periods for the fast EMA and slow SMA, which can be tuned for different markets, improving adaptability. 

3. Reliable trading signals. Moving averages filter out market noise effectively. Their crosses produce fairly reliable signals. The crossover between fast and slow MAs can capture turns in the broader trend.

4. Applicable in various market environments. The strategy works for trending and range-bound markets. Parameters can be adjusted to suit different conditions.

5. Easily combined with other indicators. The strategy can be flexibly combined with indicators like RSI to create more powerful systems.

## Risk Analysis  

The strategy also has some risks:

1. Whipsaw signals. During uncertain trends, MAs may crossover frequently, causing excessive trading and slippage costs.

2. Choppy markets may cause being stuck in ranges. In range-bound markets, MAs may generate ambiguous crossover signals, resulting in false signals. 

3. Difficulty in parameter optimization. The MA periods significantly impact strategy performance and require extensive testing.

4. Lagging signals. MAs are inherently lagging, thus crossover signals tend to be late and may miss ideal entry points. 

5. Lack of risk management. The strategy lacks stop loss logic and may incur large losing trades.

## Enhancement Opportunities

Some ways to optimize the moving average crossover strategy:

1. Add filters like RSI to reduce false signals. Avoid longs when RSI is high and avoid shorts when RSI is low.

2. Incorporate additional MAs to confirm signals, such as a 50-day MA. Go long when fast MA crosses above medium MA and medium MA crosses above long MA in an uptrend.

3. Implement stop loss techniques like parabolic SAR to control risks. Adaptive stops based on volatility may also work.

4. Optimize parameters using methods like walk forward analysis and machine learning to improve performance across changing markets.

5. Use lower timeframe charts and candlestick patterns to improve signal quality and avoid untimely reversals. 

6. Incorporate volume indicators to avoid false breakouts. Volume confirmation can make signals more reliable.

## Conclusion

The moving average crossover strategy is a simple yet practical quantitative trading strategy. It uses fast EMA and slow SMA crosses to generate trading signals. The strategy is easy to implement and combine with other indicators, but also has drawbacks like excessive trading and whipsaws. With proper enhancements in parameters and risk management, the strategy can become more robust and profitable. Overall, the moving average crossover approach is worth learning and applying for quantitative traders.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Fast EMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|13|Fast EMA Period|
|v_input_3_close|0|Slow SMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|30|Slow SMA Period|
|v_input_5_close|0|Slower SMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|30|Slower SMA Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-26 00:00:00
end: 2023-09-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="Moving Average Cross EMA SMA", overlay=true, initial_capital=10000, currency='USD',default_qty_type=strategy.percent_of_equity,default_qty_value=100)
// Based on strategy by lsills @ https://www.tradingview.com/script/oI8loEZ8-Moving-Average-Cross-Strategy/
// Strategy has several logic alternatives - comment out the undesired logic sections below, only 1 logic section can be active


// === GENERAL INPUTS ===
// short Ema
maFastSource   = input(defval = close, title = "Fast EMA Source")
maFastLength   = input(defval = 13, title = "Fast EMA Period", minval = 1)
// long Sma
maSlowSource   = input(defval = close, title = "Slow SMA Source")
maSlowLength   = input(defval = 30, title = "Slow SMA Period", minval = 1)
// longer Sma
maSlowerSource   = input(defval = close, title = "Slower SMA Source")
maSlowerLength   = input(defval = 30, title = "Slower SMA Period", minval = 1)



// === SERIES SETUP ===
/// a couple of ma's..
maFast = ema(maFastSource, maFastLength)
maSlow = sma(maSlowSource, maSlowLength)
maSlower = vwma(maSlowerSource, maSlowerLength)
rsi = rsi(maSlowerSource, maSlowerLength)

// === PLOTTING ===
fast = plot(maFast, title = "Fast MA", color = red, linewidth = 2, style = line, transp = 30)
slow = plot(maSlow, title = "Slow MA", color = green, linewidth = 2, style = line, transp = 30)
slower = plot(maSlower, title = "Slower MA", color = teal, linewidth = 2, style = line, transp = 30)


// === LOGIC === Basic - simply switches from long to short and vice-versa with each fast-slow MA cross
enterLong = maFast> maSlow
exitLong = maSlow> maFast


// === LOGIC === Complex 1 - switches from long to short and vice-versa with each fast-slow MA cross but additional conditions must be met
//enterLong = variance(maFast,maSlowLength) < 0.6 and close[0] > maFast and crossover(maFast, maSlow) and 1.1* maSlow > maSlower and rsi>rsi[2]
//exitLong = variance(maFast,maSlowLength) < 0.6 and close[0] < maSlow and crossover(maSlow, maFast) and maSlow/1.1 < maSlower and rsi<rsi[2]

// === LOGIC === Complex 2- switches from long to short and vice-versa with each fast-slow MA cross but additional conditions must be met
//enterLong = maFast> maSlow and 1.1* maSlow > maSlower and rsi>rsi[1] and close > close[3] //and close > close[2]
//exitLong = maSlow> maFast and maSlow/1.1 < maSlower and rsi<rsi[1] and close < close[3] // and close < close[2]


// Entry //
strategy.entry(id="Long Entry", long=true, when=enterLong)
strategy.entry(id="Short Entry", long=false, when=exitLong)

// === FILL ====

fill(fast, slow, color = maFast > maSlow ? green : red)
```

> Detail

https://www.fmz.com/strategy/427861

> Last Modified

2023-09-26 11:27:47
