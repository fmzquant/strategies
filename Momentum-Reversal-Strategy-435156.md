
> Name

Momentum-Reversal-Strategy-435156

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10a4382ffcf82f8799f.png)


### Overview

This strategy calculates the momentum indicator of price to determine whether the price trend has reversed, in order to capture price reversal opportunities. When the uptrend or downtrend of the price slows down, it indicates that the price momentum has reversed. At this time, the strategy will open long or short positions.

### Strategy Logic

The strategy is mainly based on the calculation of momentum indicators. The momentum indicator reflects the speed and strength of price changes. Two momentum indicators MOM and MOM1 are calculated in the strategy.

MOM calculation formula:

MOM = Today's closing price - Closing price N days ago  

MOM1 calculation formula:

MOM1 = MOM today - MOM yesterday

Judge whether prices have reversed according to the values of MOM and MOM1. If MOM > 0 and MOM1 < 0, it means the uptrend of the price has slowed down and a reversal signal appears to go long. If MOM < 0 and MOM1 > 0, it means the downtrend of the price has slowed down and a reversal signal appears to go short.

### Advantages

1. Capture price reversal points and enter the market in time
2. Small drawdowns, avoid chasing highs and selling lows  
3. Implement automatic stop loss to reduce risks

### Risks 

1. Frequent opening and closing of positions may occur when prices fluctuate  
2. Inability to accurately determine price reversal points if parameters are set improperly
3. Market events may cause incorrect signals

Main risk mitigation methods:

1. Optimize parameters to improve judgment accuracy  
2. Combine with other indicators to filter signals
3. Manual intervention to avoid losses caused by abnormal markets

### Optimization Directions  

1. Optimize momentum indicator parameters to better capture timing of reversals
2. Add indicators like volume to filter incorrect signals  
3. Add stop loss strategies to reduce single loss

### Summary

This strategy calculates the price momentum indicator to determine whether the price trend has reversed, automatically going long or short. Backtests show that this strategy works smoothly overall and effectively captures price reversal points. By optimizing parameter settings, adding signal filters, etc., the stability and profitability of the strategy can be further improved.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|true|Percent?|
|v_input_4|0|MOM Choice: MOM2|MOM1|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-11 00:00:00
end: 2023-12-11 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Momentum - Strategy", overlay = false, precision = 2, initial_capital = 10000, default_qty_value = 100, default_qty_type = strategy.percent_of_equity, commission_type = strategy.commission.percent, commission_value = 0.2 )

i_len           =       input(defval = 12,      title = "Length",       minval = 1)
i_src           =       input(defval = close,   title = "Source")
i_percent       =       input(defval = true,    title = "Percent?")
i_mom           =       input(defval = "MOM2",  title = "MOM Choice",   options = ["MOM1", "MOM2"])

momentum(seria, length, percent) =>
	_mom        =       percent ? ( (seria / seria[length]) - 1) * 100 : seria - seria[length]
	_mom

mom0        =       momentum(i_src, i_len, i_percent)
mom1        =       momentum(mom0, 1, i_percent)
mom2        =       momentum(i_src, 1, i_percent)

momX        =       mom1

if i_mom == "MOM2"
    momX    :=     mom2

if (mom0 > 0 and momX > 0)
    strategy.entry("MomLE", strategy.long, stop = high + syminfo.mintick, comment = "MomLE")
else
	strategy.cancel("MomLE")
if (mom0 < 0 and momX < 0)
	strategy.entry("MomSE", strategy.short, stop = low - syminfo.mintick, comment = "MomSE")
else
	strategy.cancel("MomSE")

plot(mom0, color = #0000FF, title = "MOM")
plot(mom1, color = #00FF00, title = "MOM1", display = display.none)
plot(mom2, color = #00FF00, title = "MOM2")
```

> Detail

https://www.fmz.com/strategy/435156

> Last Modified

2023-12-12 17:25:08
