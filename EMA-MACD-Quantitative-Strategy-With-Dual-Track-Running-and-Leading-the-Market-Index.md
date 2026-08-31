
> Name

EMA-MACD-Quantitative-Strategy-With-Dual-Track-Running-and-Leading-the-Market-Index

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e4520306f202adfb6a.png)

## Overview

This strategy mainly utilizes the EMA moving average line and MACD indicator to determine the changes in market patterns and performs momentum trading strategies. The core idea is to go long when the short-term EMA line crosses above the long-term EMA line and the MACD simultaneously crosses above 0, and go short when the short-term EMA crosses below the long-term EMA and the MACD simultaneously crosses below 0.

## Principle  

This strategy integrates the moving average line indicator and the MACD indicator.

First, it uses two EMA indicators with different cycle lengths, one is the 25 cycle EMA line and the other is the 50 cycle EMA line. The 25 cycle EMA line can reflect short-term trends while the 50 cycle EMA line reflects medium-and-long term trends. When the short-term EMA line crosses above the long-term EMA line from the bottom, it indicates the market is turning from decline to upside, which is a golden cross signal for going long. When the short-term EMA crosses below the long-term EMA from above, it indicates the market is turning from upside to downside, which is a death cross signal for going short.

At the same time, the strategy also incorporates MACD indicator signals. The MACD indicator includes a DIF line and a DEA line, which represent the difference between short-term and long-term exponential moving averages, calculated by double EMAs. This strategy sets the DIF as the difference between 12-day EMA and 26-day EMA. The DEA line is the 9-day exponential moving average of the DIF. The DIF line represents momentum while the DEA line represents the MACD average. When the DIF crosses above the DEA line from the bottom, it generates a buy signal. When the DIF crosses below the DEA from above, it generates a sell signal.

Combining these two indicators, a long entry signal is generated when the 25-day EMA has a golden cross of the 50-day EMA, while the MACD's DIF line crosses above the DEA line. A short entry signal is generated when the 25-day EMA has a death cross of the 50-day EMA, while the MACD'S DIF line crosses below the DEA line.

## Advantage Analysis  

This is a very typical dual-track strategy which integrated with the MACD indicator to generate more reliable trading signals with the following advantages:

1. Using dual EMA lines can avoid whipsaws and false breakouts to generate more reliable trading signals. 

2. Integrating the MACD indicator can further verify trading signals and avoid the risk of false EMA dual-track signals, improving the practical effectiveness of the strategy.

3. Using the 25-day and 50-day line as the fast and slow line, the parameter selection is more accurate which can capture significant trend changes in medium-and-short term cycles.

4. By chasing momentum and mean reversion mindset, this strategy can outrun the benchmark index and achieve significant returns during sharp uptrends and downtrends on the broader market.

5. The strategy logic is simple and straightforward, easy for understanding and implementation, suitable for quantitative beginners.  

6. Parameters can be carefully optimized to better adapt the strategy across different products and market environments.

## Risk Analysis

There are still some risks worth noticing for this strategy:

1. The possibility of false EMA signals remains, whipsaw may still occur in violent market movements.  

2. MACD parameters need continuous optimization and adjustment, otherwise incorrect signals or signal lags may occur.

3. Need to be cautious of whether the stop loss point setting is reasonable to avoid ineffective breakthroughs causing greater losses.

4. Need to pay attention to changes in market and policy environments to avoid systemic risks causing greater losses. 

5. Need to control position sizing and leverage level to prevent the risk of forced liquidation from one-sided trends.

## Optimization Directions  

This strategy can also be optimized in the following aspects:

1. Test more accurate parameter combinations with higher practical efficiency, such as using 20-day and 60-day EMA lines as trading tracks, with DIF as the difference between 10-day EMA and 20-day EMA.  

2. Increase confirmation from trading volume indicators to avoid low-volume false breakouts.  

3. Incorporate volatility indicators like ATR to determine more scientific stop loss methods.

4. Utilize machine learning algorithms to automatically optimize parameters for dynamically adapting to changing market environments.  

5. Add position sizing control module for dynamically adjusting sizes based on strategy performance and metrics.

6. Can plot strategy signals on higher timeframe charts to assist decisions on longer-term directional trades.

## Summary

This strategy integrates the strengths of moving average line indicators and MACD indicators by judging higher quality candlestick patterns through dual EMA lines combined with DIF and DEA matching on MACD momentum direction, forming a steady and efficient momentum trading strategy. The logic is simple and easy to understand and optimize, very suitable for quant traders to get started and implementation. Through continuous testing and optimizing, this strategy can become one of the value strategies that outperforms indices.    


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast Length|
|v_input_2|26|Slow Length|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|9|Signal Smoothing|
|v_input_5|0|Oscillator MA Type: EMA|SMA|
|v_input_6|0|Signal Line MA Type: EMA|SMA|
|v_input_7|25|Len Ema 1 |
|v_input_8|50|Len Ema 2 |


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-05 00:00:00
end: 2023-12-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="EMA+MACD", shorttitle="EMA+MACD", overlay=true)
// Getting inputs
fast_length = input(title="Fast Length", type=input.integer, defval=12)
slow_length = input(title="Slow Length", type=input.integer, defval=26)
src = input(title="Source", type=input.source, defval=close)


signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9)
sma_source = input(title="Oscillator MA Type", type=input.string, defval="EMA", options=["SMA", "EMA"])
sma_signal = input(title="Signal Line MA Type", type=input.string, defval="EMA", options=["SMA", "EMA"])

fast_ma = sma_source == "SMA" ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source == "SMA" ? sma(src, slow_length) : ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal
len1 = input(title="Len Ema 1 ",type=input.integer,defval=25)
len2 = input(title="Len Ema 2 ",type=input.integer,defval=50)
ema1 = ema(src,len1)
ema2 = ema(src,len2)

bull = crossover(ema1,ema2) and macd > 0
bear = crossover(ema2,ema1) and macd < 0
l1 = bull ? label.new(x=bar_index,y=low,yloc=yloc.belowbar,text="BUY",color=color.green,textcolor=color.white,style=label.style_triangleup) : na
l2 = bear ? label.new(x=bar_index,y=high,yloc=yloc.abovebar,text="SELL",color=color.red,textcolor=color.white,style=label.style_triangledown) : na


strategy.entry("LONG",strategy.long,when=bull)
strategy.entry("SHORT",strategy.short,when=bear)



```

> Detail

https://www.fmz.com/strategy/435100

> Last Modified

2023-12-12 12:13:25
