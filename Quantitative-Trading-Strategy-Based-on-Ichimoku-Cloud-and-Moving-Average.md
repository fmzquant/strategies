
> Name

Quantitative-Trading-Strategy-Based-on-Ichimoku-Cloud-and-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18e8186eab063f482e5.png)

## Overview

This strategy combines the Ichimoku Cloud indicator and the moving average indicator to implement a simple quantitative trading strategy. It generates buy signals when the conversion line is above the base line and the closing price is above the conversion line. It generates sell signals when the conversion line is below the base line and the closing price is below the conversion line. The strategy is suitable for short-term trading of high volatility assets like cryptocurrencies.  

## Strategy Logic

The Ichimoku Cloud contains three lines: the conversion line, the base line and the lagging span. The conversion line represents the short-term average price and the base line represents the long-term average price. The lagging span is usually the average of the conversion and base lines. When the short-term average is higher than the long-term average, it indicates an upward trend.

The Ichimoku Cloud also contains two leading lines: Leading Span A and Leading Span B. They represent the average range of price fluctuations over different periods. When Leading Span A is higher than Leading Span B, it indicates expanding volatility and upward momentum in the short term.

This strategy uses the conversion line to determine the overall trend direction and the leading lines to gauge momentum. It generates trading signals based on the trend, momentum and closing prices. It goes long when there is an upward trend and expanding volatility and goes short when there is a downward trend and contracting volatility.

## Advantages

The main advantages of this strategy are:

1. Uses a combination of indicators to provide reliable signals. 
2. Only enters on solid breakouts to avoid false signals.
3. Suitable for short-term trading volatile assets with high profit potential.  
4. Simple logic that is easy to understand and modify.
5. Easily extensible to a multi-factor model with more indicators.

## Risks

The main risks of this strategy are:  

1. Mistrade risk. Need to set stop loss to control loss per trade.
2. Price reversal risk. Price may reverse after signal is triggered. Can loosen holding conditions to reduce this risk.   
3. Parameter optimization risk. Results are sensitive to parameters. Need exhaustive combinatorial testing to find optimum.  
4. Overfitting risk. May perform very well historically but fail in actual trading. Need to constrain parameter combinations.

## Enhancement Opportunities 

Some ways in which this strategy can be enhanced:

1. Test combinations of more indicators like KDJ, BOLL, MACD to find better parameters.  
2. Incorporate stop loss mechanisms like moving stop loss or x times atr. 
3. Optimize entry filters with volume, volatility etc.
4. Tighten holding rules by reducing holding period or increasing profit taking target.
5. Introduce machine learning to find optimal parameter combinations using neural nets.

## Conclusion

In summary, this is a very simple quantitative trading strategy that combines Ichimoku Cloud and moving average to determine trend and momentum for trade signals. It is suitable for short-term trading volatile assets with good profit potential. Of course no strategy is perfect and this one has some room for improvement via entry rules, stop losses, parameter selection etc. to make it more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|50|Length|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|9|Conversion Line Length|
|v_input_int_3|26|Base Line Length|
|v_input_int_4|52|Leading Span B Length|
|v_input_int_5|true|Lagging Span|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-20 00:00:00
end: 2024-02-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Ichimoku Cloud + ema 50 Strategy", overlay=true)

len = input.int(50, minval=1, title="Length")
src = input(close, title="Source")
out = ta.ema(src, len)

conversionPeriods = input.int(9, minval=1, title="Conversion Line Length")
basePeriods = input.int(26, minval=1, title="Base Line Length")
laggingSpan2Periods = input.int(52, minval=1, title="Leading Span B Length")
displacement = input.int(1, minval=1, title="Lagging Span")

donchian(len) => math.avg(ta.lowest(len), ta.highest(len))
conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = math.avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

p1 = plot(leadLine1, offset = displacement - 1, color=#A5D6A7,
     title="Leading Span A")
p2 = plot(leadLine2, offset = displacement - 1, color=#EF9A9A,
     title="Leading Span B")
fill(p1, p2, color = leadLine1 > leadLine2 ? color.rgb(67, 160, 71, 90) : color.rgb(244, 67, 54, 90))

plot(out, title="EMA", color=color.white)

// Condition for Buy Signal
buy_signal = close > out and leadLine1 > leadLine2

// Condition for Sell Signal
sell_signal = close < out and leadLine2 > leadLine1

// Strategy entry and exit conditions
if (buy_signal)
    strategy.entry("Buy", strategy.long)
if (sell_signal)
    strategy.entry("Sell", strategy.short)

// Exit long position if candle closes below EMA 50
if (strategy.opentrades > 0)
    if (close < out)
        strategy.close("Buy")

// Exit short position if candle closes above EMA 50
if (strategy.opentrades < 0)
    if (close > out)
        strategy.close("Sell")

```

> Detail

https://www.fmz.com/strategy/442275

> Last Modified

2024-02-20 17:12:35
