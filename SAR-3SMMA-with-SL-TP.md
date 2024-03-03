
> Name

SAR-3SMMA-with-SL-TP

> Author

ChaoZhang

> Strategy Description

This script is a combination of SAR strategy and 3 Smoothed Moving Averages.

Strategy:
Takes SAR longs when all 3 SMMAs are rising. Take SAR short when all 3 SMMAs are falling.

Supports StopLoss and TakeProfit.

If you have found a profitable setup for it, please share in the comments or private chat.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/17ecae098ab4b99118c.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|0.02|(?na)start|
|v_input_float_2|0.02|increment|
|v_input_float_3|0.2|maximum|
|v_input_float_4|0.1|(?Stop Loss and Take Profit)Take Profit (%)|
|v_input_float_5|true|StopLoss (%)|
|v_input_int_1|21|(?Smooth Moving Average)Fast Length|
|v_input_int_2|50|Mid Length|
|v_input_int_3|200|Slow Length|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-12 00:00:00
end: 2022-05-11 23:59:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//strategy(title="SAR + 3SMMA with SL & TP", overlay=true, calc_on_order_fills=false, calc_on_every_tick=false, default_qty_type=strategy.percent_of_equity, default_qty_value=100, currency=currency.USD, commission_type= strategy.commission.percent, commission_value=0.03)
start = input.float(0.02, step=0.01, group="SAR")
increment = input.float(0.02, step=0.01, group="SAR")
maximum = input.float(0.2, step=0.01, group="SAR")

//Take Profit Inputs     
take_profit = input.float(title="Take Profit (%)", minval=0.0, step=0.1, defval = 0.1, group="Stop Loss and Take Profit", inline="TP") * 0.01

//Stop Loss Inputs
stop_loss = input.float(title="StopLoss (%)", minval=0.0, step=0.1, defval=1, group="Stop Loss and Take Profit", inline="SL") * 0.01

// Smooth Moving Average
fastSmmaLen = input.int(21, minval=1, title="Fast Length", group = "Smooth Moving Average")
midSmmaLen = input.int(50, minval=1, title="Mid Length", group = "Smooth Moving Average")
slowSmmaLen = input.int(200, minval=1, title="Slow Length", group = "Smooth Moving Average")

src = input(close, title="Source", group = "Smooth Moving Average")

smma(ma, src, len) => 
    smma = 0.0
    smma := na(smma[1]) ? ma : (smma[1] * (len - 1) + src) / len
    smma

fastSma = ta.sma(src, fastSmmaLen)
midSma = ta.sma(src, midSmmaLen)
slowSma = ta.sma(src, slowSmmaLen)

fastSmma = smma(fastSma, src, fastSmmaLen)
midSmma = smma(midSma, src, midSmmaLen)
slowSmma = smma(slowSma, src, slowSmmaLen)

isSmmaUpward = ta.rising(fastSmma, 1) and ta.rising(midSmma, 1) and ta.rising(slowSmma, 1)

var bool uptrend = na
var float EP = na
var float SAR = na
var float AF = start
var float nextBarSAR = na

if bar_index > 0
	firstTrendBar = false
	SAR := nextBarSAR
	if bar_index == 1
		float prevSAR = na
		float prevEP = na
		lowPrev = low[1]
		highPrev = high[1]
		closeCur = close
		closePrev = close[1]
		if closeCur > closePrev
			uptrend := true
			EP := high
			prevSAR := lowPrev
			prevEP := high
		else
			uptrend := false
			EP := low
			prevSAR := highPrev
			prevEP := low
		firstTrendBar := true
		SAR := prevSAR + start * (prevEP - prevSAR)
	if uptrend
		if SAR > low
			firstTrendBar := true
			uptrend := false
			SAR := math.max(EP, high)
			EP := low
			AF := start
	else
		if SAR < high
			firstTrendBar := true
			uptrend := true
			SAR := math.min(EP, low)
			EP := high
			AF := start
	if not firstTrendBar
		if uptrend
			if high > EP
				EP := high
				AF := math.min(AF + increment, maximum)
		else
			if low < EP
				EP := low
				AF := math.min(AF + increment, maximum)
	if uptrend
		SAR := math.min(SAR, low[1])
		if bar_index > 1
			SAR := math.min(SAR, low[2])
	else
		SAR := math.max(SAR, high[1])
		if bar_index > 1
			SAR := math.max(SAR, high[2])
	nextBarSAR := SAR + AF * (EP - SAR)

sarIsUpTrend = uptrend ? true : false

sarFlippedDown = sarIsUpTrend and not sarIsUpTrend[1] ? true : false
sarFlippedUp = not sarIsUpTrend and sarIsUpTrend[1] ? true : false


longEntryCondition = isSmmaUpward and sarFlippedDown
shortEntryCondition = not isSmmaUpward and sarFlippedUp

if(longEntryCondition)
    strategy.entry("L", strategy.long, stop=nextBarSAR, comment="L")

if(shortEntryCondition)
    strategy.entry("S", strategy.short, stop=nextBarSAR, comment="S")


strategy.exit("CL", when=strategy.position_size > 0, limit=strategy.position_avg_price * (1+take_profit), stop=strategy.position_avg_price*(1-stop_loss))
strategy.exit("CS", when=strategy.position_size < 0, limit=strategy.position_avg_price * (1-take_profit), stop=strategy.position_avg_price*(1+stop_loss))


plot(SAR, style=plot.style_cross, linewidth=1, color=color.orange)
plot(nextBarSAR, style=plot.style_cross, linewidth=1, color=color.aqua)
plot(series = fastSmma, title="fastSmma", linewidth=1)
plot(series = midSmma, title="midSmma", linewidth=2)
plot(series = slowSmma, title="slowSmma", linewidth=3)
plotchar(series = isSmmaUpward, title="isSmmaUpward", char='')
plotchar(series=sarIsUpTrend, title="sarIsUpTrend", char='')
plotchar(series=sarFlippedUp, title="sarFlippedUp", char='')
plotchar(series=sarFlippedDown, title="sarFlippedDown", char='')
plotchar(series=longEntryCondition, title="longEntryCondition", char='')
plotchar(series=shortEntryCondition, title="shortEntryCondition", char='')
plotchar(series=strategy.position_size > 0, title="inLong", char='')
plotchar(series=strategy.position_size < 0, title="inShort", char='')


//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)


```

> Detail

https://www.fmz.com/strategy/362845

> Last Modified

2022-05-13 14:29:21
