
> Name

Simple-EMA20-Strategy-Stochastic

> Author

ChaoZhang

> Strategy Description

The strategy you have built uses an EMA20 (an exponential moving average indicator with a period of 20) and a stochastic oscillator. 

1. At the beginning, you have set up the parameters for the stochastic oscillator, which consists of %K and %D parameters. %K measures the current market rate for an asset, and %D is a moving average of %K. 

2. Then you calculate the values of %K and %D based on the historical prices of the asset (close, high, low).

3. Next, the 20-period EMA is calculated.

4. After this, you plot the EMA20 on the chart.

5. Then you define the conditions for entering a long position (buying) and exiting the position (selling).

You will enter a position when:
   - The lowest price (low) is greater than the EMA20. 
   - And the %K is greater than %D (this generally indicates an oversold market).
   - And the current EMA is greater than the EMA of 20 periods ago (indicating that the market is trending upwards).

You will exit the position when:
   - The closing price falls below the EMA.

According to this strategy, you might invest when the market has been oversold and is now starting a trend upwards. And you would sell off your investment when the trend is about to return downwards again. 

Please remember that all trading strategies come with risks and should be used wisely.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|%K Length|
|v_input_int_2|true|%K Smoothing|
|v_input_int_3|3|%D Smoothing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-01 00:00:00
end: 2023-09-07 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © dragolite95
//@version=5
strategy("Simple EMA20 Strat", overlay=true, margin_long=100, margin_short=100)

periodK = input.int(14, title="%K Length", minval=1)
smoothK = input.int(1, title="%K Smoothing", minval=1)
periodD = input.int(3, title="%D Smoothing", minval=1)
k = ta.sma(ta.stoch(close, high, low, periodK), smoothK)
d = ta.sma(k, periodD)

ema = ta.ema(close, 20)

plot(series=ema, title="ema 20", color=color.blue)

if(low > ema and k > d and ema > ema[20])
    strategy.entry("long", strategy.long)
if(close < ema)
    strategy.close("long")
```

> Detail

https://www.fmz.com/strategy/426136

> Last Modified

2023-09-08 15:56:24
