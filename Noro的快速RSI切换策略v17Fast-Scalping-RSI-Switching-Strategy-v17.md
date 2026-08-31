
> Name

Noro的快速RSI切换策略v17Fast-Scalping-RSI-Switching-Strategy-v17

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15f8d998a0bb60965aa.png)

## Overview  

Noro’s Fast Scalping RSI Switching Strategy is a quantitative trading strategy that identifies overbought and oversold opportunities using the RSI indicator. The strategy also incorporates candlestick patterns, moving average filters and stop loss methods to control risk.

The key components of this strategy include:

1. Fast RSI Indicator: Identify overbought and oversold levels  
2. Candlestick Patterns: Assist in determining trend directionality
3. Moving Average Filter: Use SMA to avoid false signals
4. Stop Loss Mechanism: Implement stop loss based on RSI limits

## Strategy Logic  

Noro’s Fast Scalping RSI Switching Strategy mainly identifies the following trading signals:

1. Fast RSI Overbought/Oversold Signals: Trade signals are generated when fast RSI crosses above its upper limit or below its lower limit.

2. Candlestick Signals: Candlestick parameters like body size and direction are used to determine trend and supplement fast RSI signals.

3. SMA Filter Signals: SMA direction filters out false breakout signals. 

4. Stop Loss Signals: Positions are closed when fast RSI crosses back above its upper limit or below its lower limit.

Specifially, this strategy identifies trading opportunities based on the overbought and oversold zones of the fast RSI. The fast RSI crossing below its lower limit signals an oversold condition; while crossing above its upper limit signals an overbought condition.

To avoid noise, the following supplementary conditions are added:

1. Candle Body Size: Larger candle bodies represent a stronger trend
2. Candle Direction: Determines bullish or bearish trend  
3. SMA Filter: Filters out false breakout signals
4. Stop Loss: Exits trades when fast RSI crosses back past its limits

Therefore, this strategy combines fast RSI, candlesticks, moving average and stop loss together to generate trading signals.


## Advantages

The advantages of this strategy include:

1. Fast RSI is Sensitive: Quickly captures overbought/oversold opportunities  
2. Candlestick & MA Filter: Avoids false signals
3. Automatic Stop Loss: Effectively controls risks
4. Suitable for Scalping: Works well with shorter timeframes e.g. 1H, 30M
5. Easy to Optimize: Parameters can be tuned for different markets

## Risks

There are also some risks to consider:

1. Consecutive Stop Loss: More stop loss signals may occur in ranging markets
2. Parameter Optimization Needed: Parameters need tuning for different pairs and timeframes
3. Unable to Avoid All Losses: Timely stop loss still results in some losses

The following optimization methods can help mitigate risks:

1. Optimize Fast RSI Parameters: Reduce false signals
2. Optimize Stop Loss Placement: Control single trade loss size
3. Add Position Sizing: Distribute risks across multiple trades

## Optimization Directions

Some ways to further optimize this strategy include:

1. Add Profit Taking Exits: Take partial profits when hitting profit targets
2. Enhance Risk Management: Incorporate position sizing rules to diversify risks
3. Parameter Tuning: Test effect of parameter adjustments across timeframes  
4. Machine Learning: Use algorithms to automatically optimize parameters over time
5. Robustness Testing: Evaluate strategy performance across more symbol pairs

By incorporating profit taking, risk management, parameter optimization, machine learning and robustness testing, the strategy can be significantly enhanced in stability.


## Conclusion  

In summary, Noro’s Fast Scalping RSI Switching Strategy combines the fast RSI indicator with supplementary candlestick analysis to identify overbought and oversold trading opportunities. With quick signal response times, ease of optimization and incorporated stop loss modules, this short-term trading strategy has strong potential to generate positive results after further machine learning and parameter tuning.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|false|Use Martingale|
|v_input_4|100|Capital, %|
|v_input_5|true|Use Fast RSI Strategy|
|v_input_6|true|Use Min/Max Strategy|
|v_input_7|true|Use BarColor Strategy|
|v_input_8|false|Use SMA Filter|
|v_input_9|20|SMA Filter Period|
|v_input_10|7|Fast RSI Period|
|v_input_11|30|RSI limit|
|v_input_12_close|0|RSI Price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_13|true|RSI Bars|
|v_input_14|true|Min/Max Bars|
|v_input_15|false|Show SMA Filter|
|v_input_16|false|Show Arrows|
|v_input_17|2018|From Year|
|v_input_18|2100|To Year|
|v_input_19|true|From Month|
|v_input_20|12|To Month|
|v_input_21|true|From day|
|v_input_22|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-14 00:00:00
end: 2023-12-18 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's Fast RSI Strategy v1.7", shorttitle = "Fast RSI str 1.7", overlay = true)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
usemar = input(false, defval = false, title = "Use Martingale")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
usersi = input(true, defval = true, title = "Use Fast RSI Strategy")
usemm = input(true, defval = true, title = "Use Min/Max Strategy")
usebc = input(true, defval = true, title = "Use BarColor Strategy")
usesma = input(false, defval = false, title = "Use SMA Filter")
smaperiod = input(20, defval = 20, minval = 2, maxval = 1000, title = "SMA Filter Period")
fast = input(7, defval = 7, minval = 2, maxval = 50, title = "Fast RSI Period")
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
fastup = rma(max(change(rsisrc), 0), fast)
fastdown = rma(-min(change(rsisrc), 0), fast)
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
abody = sma(body, 10)

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
up1 = bar == -1 and (strategy.position_size == 0 or close < strategy.position_avg_price) and dnrsi and body > abody / 5 and usersi
dn1 = bar == 1 and (strategy.position_size == 0 or close > strategy.position_avg_price) and uprsi and body > abody / 5 and usersi
up2 = mins and (close > sma or usesma == false) and fastrsi < 70 and usemm
dn2 = maxs and (close < sma or usesma == false) and fastrsi > 30 and usemm 
up3 = sma(bar, 2) == -1 and usebc
dn3 = sma(bar, 2) == 1 and usebc
exit = (((strategy.position_size > 0 and fastrsi > dnlimit and bar == 1) or (strategy.position_size < 0 and fastrsi < uplimit and bar == -1)) and body > abody / 2)

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

if up1 or up2 or up3
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot)

if dn1 or dn2 or dn3
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot)
    
if time > timestamp(toyear, tomonth, today, 23, 59) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/436252

> Last Modified

2023-12-22 15:10:40
