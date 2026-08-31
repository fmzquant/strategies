
> Name

AlexIncs-Bar-v12-Breakout-Accumulation-Strategy-Based-on-Meaningful-Bar-Filtering

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19893ba1e8a5cdb8add.png)

## Overview  

This strategy predicts trends by judging the "meaningful bar" of K-lines, and generates trading signals combined with breakout signals. The strategy filters out excessively small K-lines and only analyzes "meaningful bars" to avoid interference from frequent minor fluctuations, making the signals smoother and more reliable.

## Strategy Logic   

1. Judge the entity length body of the current K-line. If it is greater than 3 times the average body value of the past 6 K-lines, it is considered a "meaningful bar".  

2. If there are 3 consecutive "meaningful bars" with long bodies, it is judged as a long signal. If 3 consecutive bars with short bodies, it is judged as a short signal.
  
3. While judging the signal, if the price breaks through the previous high or low point, additional trading signals will also be generated.  

4. Use SMA as a filter. Open positions only when the price breaks through the SMA.
  
5. After taking a position, if the price breaks through the entry point or SMA again, close the position.

## Advantage Analysis   

1. Using “meaningful bars” to judge trends can filter out unnecessary interference and make clearer signals.

2. Combining trend signals and breakout signals improves signal quality and reduces false signals.   

3. SMA filters avoid buying high and selling low. Only buy below Close, sell above Close, thus improving reliability.  

4. Setting profit taking and stop loss conditions facilitates timely risk control.  

## Risk Analysis

1. This aggressive strategy judges signals from only 3 bars and may misjudge short-term fluctuations as trend reversals.  

2. Insufficient backtesting data. Results may vary between products and timeframes. 
  
3. No overnight position control, with overnight holding risk.

## Optimization Directions  

1. Further optimize parameters for “meaningful bars”, such as number of bars judged and definition of “meaningful”.

2. Test impacts of different timeframes to find optimum parameters.  

3. Add ATR based stop loss to control risks.  

4. Consider adding overnight position control.  

## Summary

This strategy utilizes “meaningful bar” filtering and trend judgment to generate trading signals combined with breakouts. It effectively filters out unnecessary minor fluctuations for clearer and more reliable signals. However, due to short judging cycles, certain misjudgment risks exist. Further improvements can be made through parameter optimization and risk control.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|false|Use Martingale|
|v_input_4|6|Number of candles to take profit anyway|
|v_input_5|100|Capital, %|
|v_input_6|false|Use SMA filter|
|v_input_7|10|SMA filter limit|
|v_input_8|3|Body Size Multiplier|
|v_input_9|3|Meanful Bar size Divider|
|v_input_10|false|Show Arrows|
|v_input_11|2018|From Year|
|v_input_12|2100|To Year|
|v_input_13|true|From Month|
|v_input_14|12|To Month|
|v_input_15|true|From day|
|v_input_16|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-26 00:00:00
end: 2024-01-02 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//AlexInc
//2018

// закрытие - вычислить и в течение скольки-то баров его добиваться
// если нет, то по первому противоположному
// по стоп-лоссу в любом случае - стоп вычислить

//@version=2
strategy(title = "AlexInc's Bar v1.2", shorttitle = "AlexInc Bar 1.2", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
usemar = input(false, defval = false, title = "Use Martingale")
tryprofitbars = input(6, defval = 6, minval = 1, maxval = 100, title = "Number of candles to take profit anyway")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")

useSMAfilter = input(false, defval = true, title = "Use SMA filter")
SMAlimit = input(10, defval = 10, minval = 1, maxval = 30, title = "SMA filter limit")
bodysizeMlt = input(3, defval = 3, minval = 1, maxval = 10, title = "Body Size Multiplier")
meanfulbardiv = input(3, title = "Meanful Bar size Divider")

showarr = input(false, defval = false, title = "Show Arrows")
fromyear = input(2018, defval = 2018, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//SMA #
index = 0
index := barstate.isfirst ==true ? 0 : nz(index[1])+1

buyindex = 0
buyindex := barstate.isfirst ==true ? 0 : buyindex[1]

sellindex = 0
sellindex := barstate.isfirst ==true ? 0 : sellindex[1]

//predictprofit = barstate.isfirst ==true ? 0 : predictprofit[1]

smafilter = sma(close, SMAlimit)

//Body
body = abs(close - open)
range = abs(high - low)
abody = sma(body, 6)

max3 = 0
if body >= body[1] and body >= body[2]
    max3 := body
else
    if body[1] >= body and body[1] >= body[2]
        max3 := body[1]
    else 
        if body[2] >= body and body[2] >= body[1]
            max3 := body[2]

prevmax3 = 0
prevmax3 := nz(max3[1])


bar = close > open ? 1 : close < open ? -1 : 0
firstbullishopen = 0
firstbullishopen := bar == 1 and bar[1] != 1 ? open : nz(firstbullishopen[1])
firstbearishopen = 0
firstbearishopen := bar == -1 and bar[1] != -1 ? open : nz(firstbearishopen[1])

meanfulbar = body > abody / meanfulbardiv

meanfulbearish = 0
meanfulbearish := nz(meanfulbearish[1])

meanfulbullish = 0
meanfulbullish := nz(meanfulbullish[1])

if meanfulbar
    if bar == 1
        meanfulbullish := 1 + meanfulbullish
        meanfulbearish := 0
    else
        if bar == -1
            meanfulbearish := 1 + meanfulbearish
            meanfulbullish := 0


plot(min(low, high)-10, style=circles, color = meanfulbar ? yellow:black, linewidth=3)

//Signals
up1 = (meanfulbearish >= 3) and (close < firstbullishopen or 1) and (strategy.position_size == 0 or close < strategy.position_avg_price) and body > abody / 5 and (useSMAfilter == false or close < smafilter)
if up1 == true
	predictprofit = sma(body, 3)
up2 = sma(bar, 1) == -1 and body > prevmax3 * bodysizeMlt and (strategy.position_size == 0 or close < strategy.position_avg_price) and body > abody / 5 and (useSMAfilter == false or close < smafilter)
if up2 == true
	predictprofit = body * 0.5
plot(min(low, high), style=circles, color = up1?blue:up2?green:gray, linewidth=3)

dn1 = (meanfulbullish >= 3) and (close > firstbearishopen or 1)  and (strategy.position_size == 0 or close > strategy.position_avg_price) and body > abody / 5 and (useSMAfilter==false or close > smafilter)
if dn1 ==true 
	predictprofit = sma(body, 3)
dn2 = sma(bar, 1) == 1 and body > prevmax3 * bodysizeMlt and (strategy.position_size == 0 or close > strategy.position_avg_price) and body > abody / 5 and (useSMAfilter==false or close > smafilter)
if dn2 ==true	
	predictprofit = body * 0.5
plot(max(low, high), style=circles, color = dn1?blue:dn2?green:gray, linewidth=3)


exit = (((strategy.position_size > 0 and bar == 1 ) or (strategy.position_size < 0 and bar == -1)) and body > abody / 2 )
// or index >= buyindex (or sellindex) + tryprofitbars


//Arrows
col = exit ? black : up1 or dn1 ? blue : up2 or dn2 ? red : na
needup = up1 or up2
needdn = dn1 or dn2
needexitup = exit and strategy.position_size < 0
needexitdn = exit and strategy.position_size > 0
plotarrow(showarr and needup ? 1 : na, colorup = blue, colordown = blue, transp = 0)
plotarrow(showarr and needdn ? -1 : na, colorup = blue, colordown = blue, transp = 0)
plotarrow(showarr and needexitup ? 1 : na, colorup = black, colordown = black, transp = 0)
plotarrow(showarr and needexitdn ? -1 : na, colorup = black, colordown = black, transp = 0)


//Trading
profit = exit ? ((strategy.position_size > 0 and close > strategy.position_avg_price) or (strategy.position_size < 0 and close < strategy.position_avg_price)) ? 1 : -1 : profit[1]
mult = usemar ? exit ? profit == -1 ? mult[1] * 2 : 1 : mult[1] : 1
lot = strategy.position_size == 0 ? strategy.equity / close * capital / 100 * mult : lot[1]

if up1 or up2
    if strategy.position_size < 0
        strategy.close_all()
		buyindex = index
		sellindex = index
	if strategy.position_size == 0
		buyindex = index
		
        
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot )

if dn1 or dn2
    if strategy.position_size > 0
        strategy.close_all()
		buyindex = index
		sellindex = index
	if strategy.position_size == 0
		sellindex = index
        
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot )
    
if  exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/437548

> Last Modified

2024-01-03 16:30:16
