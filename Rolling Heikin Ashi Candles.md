
> 策略名称

Rolling Heikin Ashi Candles

> 策略作者

张超

> 策略描述

█  OVERVIEW

This indicator displays a Rolling Heikin Ashi Candles for a given timeframe Multiplier. Contrary to Heikin Ashi Candles Charts, if the timeframe Multiplier is "5", this indicator plots Heikin Ashi Candles OHLC of the last 5 Candles.

█  WHAT IS THE NEED FOR IT

Let's see if we want to use a Higher timeframe OHLC Data using security function or resolution options. The indicator repaints until the higher timeframe Heikin Ashi Candles closes, leading to a repainting strategy or indicator using higher-timeframe data. So we can use Rolling Heikin Ashi Candles in these cases.

█  USES

To Pull out higher timeframe Heikin Ashi Candles OHLC Data to build a non-repainting strategy or indicator.

█  WHY I AM BUILDING THIS SIMPLE INDICATOR

There is no doubt higher timeframe analysis is a critical study to mastering the markets.
I found a necessity for an indicator that analyses multiple higher timeframes and gives us a cumulative or average trend direction. I already built the indicator; I will release it soon. The Indicator I am building is wholly based on my understanding and perspective of Market Structure. Please use this indicator idea to remove the repainting issue when you make an indicator that utilises higher timeframe data.

I am using this in my upcoming indicators. Felt to share before head.

Stay Tuned...

If you have any recommendations or alternative ideas, then please drop a comment under the script ;)

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/ba7841c71467957b1a.png) 

> 策略参数



|参数|默认值|描述|
|----|----|----|
|v_input_1|5|Timeframe Multiplier|


> 源码 (PineScript)

``` javascript
/*backtest
start: 2022-01-01 00:00:00
end: 2022-03-11 00:00:00
period: 6h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
study(title='Rolling Heikin Ashi Candles', shorttitle='Rolling Heikin Ashi')

tf = input(5, 'Timeframe Multiplier', minval=1, step=1, type = input.integer)

haclose = (open[tf-1]+highest(high,tf)+lowest(low,tf)+close)/4
haopen = (open[tf-1] + close)/2
if(not na(haopen[2*tf-1]))
    haopen := (haopen[2*tf-1] + haclose[tf]) / 2
hahigh = max(highest(high,tf), max(haopen,haclose))
halow = min(lowest(low,tf), min(haopen,haclose))

Color = haopen > haclose ? #ef5350 : #26a69a
//plotcandle(haopen, hahigh, halow, haclose, title='Rolling Heikin Ashi', color=Color, wickcolor=Color, bordercolor=Color)

if haopen > haclose
    strategy.entry("Enter Long", strategy.long)
else if haopen < haclose
    strategy.entry("Enter Short", strategy.short)
```

> 策略出处

https://www.fmz.com/strategy/362649

> 更新时间

2022-05-12 16:42:15
