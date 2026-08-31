
> Name

双线性BB口系统策略Dual-Moving-Average-Bollinger-Band-System-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1359b714a13448c3972.png)



## Overview

The Dual Moving Average Bollinger Band system strategy is a typical touch trading strategy. It utilizes the volatility indicator Bollinger Bands and dual-line touches to open positions, along with stop profit and stop loss mechanisms to manage funds and generate profits.

## Principles 

This strategy is mainly based on the Bollinger Bands indicator. Bollinger Bands consist of a moving average line and bandwidth. The strategy first calculates the moving average of closing prices over n periods as the middle band, with the bandwidth being m times the standard deviation of the middle band. The upper band and lower band are then plotted as m standard deviations above and below the middle band. When price touches the upper band, a short position is opened. When price touches the lower band, a long position is opened.

Specifically, the strategy implements the following steps:

1. Input parameters: set moving average length n and standard deviation multiplier m

2. Calculate middle band: n-period simple moving average of closing prices  

3. Calculate upper band: middle band + m * n-period standard deviation of closing prices

4. Calculate lower band: middle band - m * n-period standard deviation of closing prices

5. Plot the middle, upper and lower bands

6. When closing price crosses above middle band, go long

7. When closing price crosses below middle band, go short

8. Set stop profit and stop loss points to exit positions

Entering positions on dual-line touches together with stop profit and stop loss mechanisms can effectively control risks and generate steady profits.

## Advantages

The advantages of this strategy include:

1. Simple and clear rules, easy to implement.

2. Based on Bollinger Bands indicator with scientific rationale. 

3. Dual-line touches filter false breakouts in ranging markets.

4. Contains stop profit and stop loss, managing risks.

5. Sufficient backtesting data ensures reliability. 

6. Large parameter tuning space for optimization.

## Risks

There are some risks to consider:

1. Bollinger Bands are sensitive to parameters which may lead to varied results.

2. Dual-line entry may miss trading opportunities due to low frequency.

3. Improper stop profit and stop loss settings may lead to premature stop loss or insufficient profits.

4. Large losses may occur when market trend changes.  

5. Shorter backtesting timeframe may lead to overfitting risks.

Possible solutions:

1. Optimize parameters to find best combination.

2. Narrow bands to increase frequency.

3. Adjust stops based on different markets. 

4. Add trend filter to avoid counter-trend trades.

5. Expand backtest timeframe to ensure robustness.

## Improvements

Some ways to improve the strategy:

1. Optimize parameters for better entries. More comprehensive parameter tuning can find optimal parameter sets.

2. Add trend detection. Trend filters prevent trading against the trend.

3. Optimize exits. Dynamic or trailing stops can improve profit management.

4. Add filters with other indicators. MACD, KDJ etc. can help filter false breakouts.

5. Incorporate machine learning models like LSTM to further optimize.

6. Combine with other basic or advanced strategies for portfolio management.

## Conclusion

The Dual Moving Average Bollinger Band system demonstrates overall positive results, with advantages like scientific indicators, clear rules, and flexible parameters. Further improvements to parameters, exits, and trend filters can enhance stability. Combining with other strategies and frameworks can also boost strategy performance and maximize value.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|length|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|StdDev|
|v_input_int_2|false|Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-17 00:00:00
end: 2023-10-17 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5

strategy("BB돌파", overlay=true)
length = input.int(20, minval=1)
src = input(close, title="Source")
mult = input.float(2.0, minval=0.001, maxval=50, title="StdDev")
basis = ta.sma(src, length)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev
offset = input.int(0, "Offset", minval = -500, maxval = 500)
plot(basis, "Basis", color=#FF6D00, offset = offset)
p1 = plot(upper, "Upper", color=#2962FF, offset = offset)
p2 = plot(lower, "Lower", color=#2962FF, offset = offset)
fill(p1, p2, title = "Background", color=color.rgb(33, 150, 243, 95))


long = ta.crossover(close,basis)
short = ta.crossunder(close,basis)

strategy.entry("long", strategy.long, when =long)
strategy.entry("short", strategy.short, when =short)
```

> Detail

https://www.fmz.com/strategy/429561

> Last Modified

2023-10-18 11:01:19
