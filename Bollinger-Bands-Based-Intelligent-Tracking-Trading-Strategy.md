
> Name

Bollinger-Bands-Based-Intelligent-Tracking-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

## Overview  

This strategy is designed based on the Bollinger Bands indicator to go short when price breaks above the upper band and go long when price breaks below the lower band, realizing intelligent tracking trading.

## Strategy Logic  

The strategy uses the middle line, upper band and lower band of the Bollinger Bands as the base indicators. The middle line is the moving average of the closing prices over n days. The upper band is the middle line shifted up by two standard deviations while the lower band is shifted down by two standard deviations. When price breaks the lower band upwards, go long. When price breaks the upper band downwards, go short. This allows intelligent tracking of price based on market volatility.

Specifically, the strategy mainly judges two metrics:  

1. ta.crossover(source, lower): closing price breaks above lower band, go long

2. ta.crossunder(source, upper): closing price breaks below upper band, go short  

When the exit condition triggers, use strategy.cancel() function to flatten existing position.

## Advantage Analysis   

The main advantages of this strategy are:

1. Based on Bollinger Bands indicator, able to capture market volatility and effectively track price trend
2. Clear and simple logic, easy to understand and implement  
3. Customizable parameters like period length and standard deviation multiplier, highly adaptable
4. Configurable stop loss, break-even or trailing stop mechanisms to optimize strategy performance

## Risk Analysis

There are also some risks with this strategy:

1. Bollinger Bands breakouts prone to false signals  
2. Performance relies on parameter optimization, improper parameters may impact profitability
3. Tracking stop loss difficult, unable to effectively control single trade loss

Corresponding solutions:

1. Add filters with other indicators to avoid false breakouts
2. Test parameters thoroughly to find optimal parameter set  
3. Add moving or trend-following stop loss mechanisms

## Optimization Directions 

The strategy can be further optimized by:  

1. Adding other indicators to determine trend direction, avoiding unsuitable market conditions for Bollinger strategy
2. Testing different period lengths to find the optimal one  
3. Incorporating moving or trailing stop mechanisms to effectively control single trade loss

## Conclusion  

This strategy is designed based on the Bollinger Bands indicator, using price breakouts of upper and lower bands to automatically track prices. The logic is simple and sensitive to market volatility. Further optimizations can be done via parameter tuning and stop loss mechanisms. Overall this strategy works well for indices and commodities with higher volatility. Traders can backtest and optimize based on their trading preference to derive an astika trading strategy.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|length|
|v_input_float_1|2|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-17 00:00:00
end: 2024-01-16 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Bollinger Bands Strategy with alerts (incl. pending orders) via TradingConnector to Forex", overlay=true)
source = close
length = input.int(20, minval=1)
mult = input.float(2.0, minval=0.001, maxval=50)
basis = ta.sma(source, length)
dev = mult * ta.stdev(source, length)
upper = basis + dev
lower = basis - dev
buyEntry = ta.crossover(source, lower)
sellEntry = ta.crossunder(source, upper)
if (ta.crossover(source, lower))
	strategy.entry("BBandLE", strategy.long, stop=lower, oca_name="BollingerBands", comment="BBandLE")
    alert(message='long price='+str.tostring(lower), freq=alert.freq_once_per_bar_close)
else
	strategy.cancel(id="BBandLE")
    alert(message='cancel long', freq=alert.freq_once_per_bar_close)
if (ta.crossunder(source, upper))
	strategy.entry("BBandSE", strategy.short, stop=upper, oca_name="BollingerBands", comment="BBandSE")
    alert(message='short price='+str.tostring(upper), freq=alert.freq_once_per_bar_close)
else
	strategy.cancel(id="BBandSE")
    alert(message='cancel short', freq=alert.freq_once_per_bar_close)
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)

//Lines of code added to the original built-in script: 14, 17, 20 and 23 only.
//They trigger alerts ready to be executed on real markets through TradingConnector
//available for Forex, indices, crypto, stocks - anything your broker offers for trading via MetaTrader4/5

```

> Detail

https://www.fmz.com/strategy/439066

> Last Modified

2024-01-17 14:05:36
