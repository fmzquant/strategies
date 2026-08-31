
> Name

Trend-Following-Strategy-Based-on-Dynamic-Support-and-Resistance-426879

> Author

ChaoZhang

> Strategy Description



This article explains in detail a trend following strategy that utilizes dynamic support and resistance levels. It forms upper and lower bands using moving averages and ATR to track trends.

I. Strategy Logic

The main indicators and logic include:

1. Calculating highest high moving average over a period as the upper band.

2. Using ATR to compute buffer distance for stop loss.

3. Upper band minus buffer sets the lower band.

4. Take long when price breaks above upper band; exit when price breaks below lower band.

The upper and lower bands construct dynamic support and resistance zones. By trend riding breakouts and quick stops, trading risks can be controlled.

II. Advantages of the Strategy

The main advantages are:

1. Dynamic bands can capture trend opportunities. 

2. ATR stop loss sets stops based on market volatility.

3. Larger profit target than stop loss benefits profits. 

4. Simple rules make it easy to implement.

III. Potential Risks

However, some potential issues exist:

1. Moving averages and ATR have lagging issues. 

2. Larger drawdowns need to be endured.

3. No limit on number of entries.

4. Parameters need optimization for different products.

IV. Summary

In summary, this article has explained a trend following strategy using moving averages and ATR to form dynamic bands. It can set stop loss and take profit based on volatility to ride trends. But risks like indicator lag and drawdown control need attention. Overall it provides a simple trend tracking method.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|Highest Length|
|v_input_2|10|Highest Average|
|v_input_3|14|ATR Length|
|v_input_4|2|ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("I Like Winners And Hate Loosers!", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

highest_length = input(200, type=input.integer, minval=1, title="Highest Length")
highest_average = input(10, type=input.integer, minval=1, title="Highest Average")

atr_length = input(14, type=input.integer, minval=1, title="ATR Length")
atr_multiplier = input(2, type=input.integer, minval=1, title="ATR Multiplier")

a = atr(atr_length) * atr_multiplier
h = sma(highest(high, highest_length), highest_average)
l = h - a

buy_signal = crossover(close, h)
sell_signal = crossunder(close, l)

strategy.entry("Buy", strategy.long, when=buy_signal)
strategy.close("Buy", when=sell_signal)

plot(h, title="H", color=color.green, transp=50, linewidth=2)
plot(l, title="L", color=color.red, transp=50, linewidth=2)

```

> Detail

https://www.fmz.com/strategy/426879

> Last Modified

2023-09-15 11:28:00
