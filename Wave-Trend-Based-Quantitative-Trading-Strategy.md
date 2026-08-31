
> Name

Wave-Trend-Based-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e1155ecadb5868d5a4.png)

### Overview

This strategy is designed based on the Wave Trend indicator. The Wave Trend indicator combines price channel and moving average to effectively identify market trends and generate trading signals. This strategy enters long or short positions when the Wave Trend line crosses over key levels representing overbought or oversold status.  

### Strategy Logic

1. Calculate the triangular moving average ap of price, as well as the exponential moving average esa of ap.
2. Calculate the exponential moving average d of absolute difference between ap and esa.  
3. Derive the volatility indicator ci.
4. Compute the n2 period moving average of ci to get the Wave Trend indicator wt1.
5. Set overbought and oversold threshold lines. 
6. Go long when wt1 crosses above oversold line, go short when wt1 crosses below overbought line.

### Advantage Analysis 

1. Wave Trend breaks of overbought/oversold levels effectively catch trend reversal points and generate accurate trading signals.
2. Combining price channel and moving average theories, the indicator avoids frequent false signals.
3. Applicable to all timeframes and variety of trading instruments.  
4. Customizable parameters provide good user experience.

### Risks and Solutions

1. Significant whipsaws can cause bad signals, high risk. Can use shorter holding periods or combine with other indicators for signal filtering.  
2. No position sizing and stop loss mechanisms, risks of losses. Can set fixed position size rules and moving stops.  

### Optimization Directions  

1. Consider combining with other indicators like KDJ and MACD to form strategy combos, enhancing stability.
2. Design automatic stop loss like trailing stops, volatility stops to limit per trade loss.
3. Utilize machine learning algorithms on historical data to auto tune parameters and improve strategy performance.  

### Conclusion

This strategy identifies trends and overbought/oversold levels using Wave Trend indicator, forming an effective trend following strategy. Compared to short-term oscillators, Wave Trend avoids false signals and provides better stability. With proper risk control methods, it can achieve steady profits. Further performance boost can be expected from parameters and model tuning.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Channel Length|
|v_input_2|21|Average Length|
|v_input_3|70|Over Bought|
|v_input_4|-30|Over Sold |
|v_input_5|true|From Day|
|v_input_6|true|From Month|
|v_input_7|2001|From Year|
|v_input_8|true|To Day|
|v_input_9|12|To Month|
|v_input_10|2020|To Year|
|v_input_11|true|Long|
|v_input_12|true|Short|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-11-27 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@author SoftKill21
//@version=4

strategy(title="WaveTrend strat", shorttitle="WaveTrend strategy")
n1 = input(10, "Channel Length")
n2 = input(21, "Average Length")
Overbought = input(70, "Over Bought")
Oversold = input(-30, "Over Sold ")

// BACKTESTING RANGE
 
// From Date Inputs
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2001, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2020, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
DST = 1 //day light saving for usa
//--- Europe
London = iff(DST==0,"0000-0900","0100-1000")
//--- America
NewYork = iff(DST==0,"0400-1500","0500-1600")
//--- Pacific
Sydney = iff(DST==0,"1300-2200","1400-2300")
//--- Asia
Tokyo = iff(DST==0,"1500-2400","1600-0100")

//-- Time In Range
timeinrange(res, sess) => time(res, sess) != 0

london = timeinrange(timeframe.period, London)
newyork = timeinrange(timeframe.period, NewYork)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true //and (london or newyork)

ap = hlc3 
esa = ema(ap, n1)
d = ema(abs(ap - esa), n1)
ci = (ap - esa) / (0.015 * d)
tci = ema(ci, n2)
 
wt1 = tci
wt2 = sma(wt1,4)

plot(0, color=color.gray)
plot(Overbought, color=color.red)
plot(Oversold, color=color.green)

plot(wt1, color=color.green)
longButton = input(title="Long", type=input.bool, defval=true)
shortButton = input(title="Short", type=input.bool, defval=true)

if(longButton==true)
    strategy.entry("long",1,when=crossover(wt1,Oversold) and time_cond)
    strategy.close("long",when=crossunder(wt1, Overbought))
    
if(shortButton==true)
    strategy.entry("short",0,when=crossunder(wt1, Overbought) and time_cond)
    strategy.close("short",when=crossover(wt1,Oversold))

//strategy.close_all(when= not (london or newyork),comment="time")
if(dayofweek == dayofweek.friday)
    strategy.close_all(when= timeinrange(timeframe.period, "1300-1400"), comment="friday") 
```

> Detail

https://www.fmz.com/strategy/433575

> Last Modified

2023-11-28 16:17:31
