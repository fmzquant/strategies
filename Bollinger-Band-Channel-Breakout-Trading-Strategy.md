
> Name

Bollinger-Band-Channel-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


This strategy trades the price breakout of Bollinger Bands. The bands effectively define price oscillation range, with breakouts signaling potential trend turns. 

Strategy Logic:

1. Calculate BB midline, upper and lower bands. Midline is n-period SMA, band width is n-period standard deviation multiple.

2. Go long on lower band breakout, and short on upper band breakout.

3. Set stop loss on opposite band for risk control.

4. Trailing stop to lock in more profits, or fixed stop.

5. Apply mutually exclusive orders to avoid simultaneous long/short.

Advantages:

1. BB breakout accurately identifies trend changes.

2. Stops on bands allow timely trend exit. 

3. Mutual exclusion avoids same-direction hedging.

Risks:

1. BB mean and deviation lag, missing best entries.

2. Whipsaws common in ranging markets.

3. Static parameters Unable to adapt changing volatility.

In summary, this strategy trades BB breakouts as a typical channel system. There is room for improvement in tuning and risk management but the overall concept is simple and robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|45|length|
|v_input_2|2.5|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-05 00:00:00
end: 2023-09-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Kozlod - BB Strategy - 1 minute", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

// 
// author: Kozlod
// date: 2019-05-27
// RSI - BTCUSDT - 1m
// https://www.tradingview.com/u/Kozlod/
// https://t.me/quantnomad
//

source = close
length = input(45, minval=1)
mult = input(2.5, minval=0.001, maxval=50)

basis = sma(source, length)
dev = mult * stdev(source, length)

upper = basis + dev
lower = basis - dev

plot(upper)
plot(lower)

buyEntry  = crossover(source, lower)
sellEntry = crossunder(source, upper)

if (crossover(source, lower))
    strategy.entry("BBandLE", strategy.long, stop=lower, oca_name="BollingerBands",  comment="BBandLE")
else
    strategy.cancel(id="BBandLE")

if (crossunder(source, upper))
    strategy.entry("BBandSE", strategy.short, stop=upper, oca_name="BollingerBands",  comment="BBandSE")
else
    strategy.cancel(id="BBandSE")
```

> Detail

https://www.fmz.com/strategy/426514

> Last Modified

2023-09-12 17:05:56
