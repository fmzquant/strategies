
> Name

Fast-RSI-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/157bcd5750de7105a73.png)

## Overview

The Fast RSI Reversal Trading Strategy generates trading signals by combining Fast RSI indicator, candlestick body filter, min/max price filter and SMA filter to determine trend reversal points for low-risk reversal trading. The strategy aims to capture short-term reversal opportunities.  

## Strategy Logic

The strategy is mainly based on the following indicators for judgement:

1. **Fast RSI Indicator**: Calculates RSI using RMA function to make it more sensitive in order to capture overbought/oversold signals faster.

2. **Candlestick Body Filter**: Requires candlestick body size to exceed 1/5 of EMA body average to filter low volatility situations.

3. **Min/Max Price Filter**: Judges if price reaches new high or new low to confirm trend reversal.  

4. **SMA Filter**: Requires price to break SMA line for additional confirmation.

Trading signals are generated when multiple conditions above trigger simultaneously. The specific logic is: 

Long entry: Fast RSI below oversold level AND Candle body > 1/5 of EMA body AND Min price breakout AND Price crosses above SMA

Short entry: Fast RSI above overbought level AND Candle body > 1/5 of EMA body AND Max price breakout AND Price crosses below SMA

Exit: Fast RSI back to normal range  

## Advantages

The strategy has the following advantages:

1. Captures volatility from short-term reversals  
2. Fast RSI indicator is sensitive
3. Multiple filters reduce false signals 
4. Controllable risk, small drawdown

## Risks and Optimization

The strategy also has some risks: 

1. Failed reversal risk
2. Limited optimization space

Can further optimize by:

1. Add trading volume filter
2. Implement stop loss  
3. Optimize parameter combination  

## Conclusion  

Overall this is a low-risk short-term mean reversal trading strategy. It identifies trading signals with Fast RSI and uses multiple filters to reduce false signals, achieving controllable risk reversal trading. The strategy can be further optimized and has great potential.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|true|Use Fast RSI Strategy|
|v_input_4|true|Use Min/Max Strategy|
|v_input_5|true|Use SMA Filter|
|v_input_6|20|SMA Filter Period|
|v_input_7|7|RSI Period|
|v_input_8|30|RSI limit|
|v_input_9_close|0|RSI Price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|true|RSI Bars|
|v_input_11|true|Min/Max Bars|
|v_input_12|false|Show SMA Filter|
|v_input_13|false|Show Arrows|
|v_input_14|2018|From Year|
|v_input_15|2100|To Year|
|v_input_16|true|From Month|
|v_input_17|12|To Month|
|v_input_18|true|From day|
|v_input_19|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-01 00:00:00
end: 2024-02-26 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=3
strategy(title = "Noro's Fast RSI Strategy v1.4", shorttitle = "Fast RSI str 1.4", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 5)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
usersi = input(true, defval = true, title = "Use Fast RSI Strategy")
usemm = input(true, defval = true, title = "Use Min/Max Strategy")
usesma = input(true, defval = true, title = "Use SMA Filter")
smaperiod = input(20, defval = 20, minval = 2, maxval = 1000, title = "SMA Filter Period")
rsiperiod = input(7, defval = 7, minval = 2, maxval = 50, title = "RSI Period")
limit = input(30, defval = 30, minval = 1, maxval = 100, title = "RSI limit")
rsisrc = input(close, defval = close, title = "RSI Price")
rsibars = input(1, defval = 1, minval = 1, maxval = 20, title = "RSI Bars")
mmbars = input(1, defval = 1, minval = 1, maxval = 5, title = "Min/Max Bars")
showsma = input(false, defval = false, title = "Show SMA Filter")
showarr = input(false, defval = false, title = "Show Arrows")
fromyear = input(2018, defval = 2018, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Fast RSI
fastup = rma(max(change(rsisrc), 0), rsiperiod)
fastdown = rma(-min(change(rsisrc), 0), rsiperiod)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//Limits
bar = close > open ? 1 : close < open ? -1 : 0
uplimit = 100 - limit
dnlimit = limit

//RSI Bars
upsignal = fastrsi > uplimit ? 1 : 0
dnsignal = fastrsi < dnlimit ? 1 : 0
uprsi = sma(upsignal, rsibars) == 1
dnrsi = sma(dnsignal, rsibars) == 1

//Body
body = abs(close - open)
emabody = ema(body, 30)

//MinMax Bars
min = min(close, open)
max = max(close, open)
minsignal = min < min[1] and bar == -1 and bar[1] == -1 ? 1 : 0
maxsignal = max > max[1] and bar == 1 and bar[1] == 1 ? 1 : 0
mins = sma(minsignal, mmbars) == 1
maxs = sma(maxsignal, mmbars) == 1

//SMA Filter
sma = sma(close, smaperiod)
colorsma = showsma ? blue : na
plot(sma, color = colorsma, linewidth = 3)

//Signals
up1 = bar == -1 and (strategy.position_size == 0 or close < strategy.position_avg_price) and dnrsi and body > emabody / 5 and usersi
dn1 = bar == 1 and (strategy.position_size == 0 or close > strategy.position_avg_price) and uprsi and body > emabody / 5 and usersi
up2 = mins and (close > sma or usesma == false) and usemm
dn2 = maxs and (close < sma or usesma == false) and usemm 
exit = ((strategy.position_size > 0 and fastrsi > dnlimit and bar == 1) or (strategy.position_size < 0 and fastrsi < uplimit and bar == -1)) and body > emabody / 2

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
if up1 or up2
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)

if dn1 or dn2
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
    
if time > timestamp(toyear, tomonth, today, 00, 00) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/443238

> Last Modified

2024-03-01 11:55:56
