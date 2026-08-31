
> Name

均衡尺云图趋势跟踪策略Ichimoku-Cloud-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13dd13793ed241e7544.png)


## I. Strategy Name: Ichimoku Cloud Trend Following Strategy  

### II. Strategy Overview

This strategy utilizes multiple Ichimoku Cloud signals to design a pure trend following strategy that aims to capture mid-to-long term trends, filter out consolidations, and follow strong trend directions.

### III. Strategy Principle  

This strategy mainly uses Tenkan-sen, Kijun-sen, Chikou Span and other key indicators from the Ichimoku Cloud. For judging long term trends, it focuses on the relationship between leading and lagging Span; for specific entry and exit timings, it looks at Tenkan-sen and Kijun-sen crossovers and price relationship changes with the Cloud.   

In summary, the core logic is: confirm mid-long term trend -> wait for strong trend resumption signals -> enter to follow trends -> exit with trailing stop loss.  

Specifically, to determine mid-long term trend, it uses the relationship between leading and lagging Span (above leading green Span signaling upward trend and vice versa). After confirming the bigger trend, crossover between Tenkan-sen and Kijun-sen along with price breakout signals are used to identify trend resumption; after entry, Kijun-sen is used as trailing stop loss for exits.

This filters out short-to-mid term consolidations and allows capturing strong trends for consistent outperformance in markets.

### IV. Advantages

(1) Using Ichimoku Cloud to determine mid-long term trend direction is beneficial for locating major directional edges.

(2) Tenkan-sen/Kijun-sen crossovers and price relationship changes with the Cloud allow effectively filtering out consolidations and capturing strong trends early.   

(3) Trailing stop loss exit mechanism allows riding big trends while also controlling isolated losses effectively.

(4) Combining various Ichimoku signals creates a robust system following trends smoothly.  

### V. Risks

(1) Systemic risk of misidentifying bigger trend. If the bigger trend is diagnosed wrong, all subsequent actions would carry erroneous directional risk.

(2) Risk from poorly chosen entry timing. Inappropriate entry timing risks adverse price whipsaws.  

(3) Risk from stops placed too tightly. Extreme price moves could take out stops that are too tight resulting in unplanned losses.

(4) High trading frequency leading to excessive transaction costs. Bad parameter tuning could lead to excessive trade frequency and costs.

### VI. Enhancement Areas 

(1) Test different combinations of Ichimoku input periods to find optimum parameters.  

(2) Optimize entry filters to ensure high quality entries.

(3) Adjust stop distance to balance risk-reward. 

(4) Add profit target levels based on price-key indicator distances to create adaptive profit taking mechanisms.

### VII. Conclusion

This Ichimoku Cloud trend following strategy synthesizes multiple Ichimoku signals to diagnose trend, time entries, and trail stops. Practice shows it can effectively capture mid-long term trends, filter out consolidations and achieve consistent outperformance. Future optimization and testing could further improve performance for superior returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2010|From Year|
|v_input_4|true|To Month|
|v_input_5|true|To Day|
|v_input_6|9999|To Year|
|v_input_7|9|Tenkan-Sen|
|v_input_8|26|Kinjun-Sen|
|v_input_9|52|Senkou Span B|
|v_input_10|26|-ChinkouSpan/+SenkouSpan A|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Ichimoku trendfollowing", overlay=true, initial_capital=1000, commission_type=strategy.commission.cash_per_order, commission_value=0.04, slippage=2)

//***************************
//  INPUT BACKTEST RANGE    *
//***************************
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2010, title = "From Year", minval = 2000) 
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2000)

start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true

//***************
//*  ICHIMOKU   *
//***************
//inizializzazione parametri,,
tenkanPeriods = input(9, minval=1, title="Tenkan-Sen")
kinjunPeriods = input(26, minval=1, title="Kinjun-Sen")
senkouSpanBPeriods = input(52, minval=1, title="Senkou Span B")
displacement = input(26, minval=1, title="-ChinkouSpan/+SenkouSpan A")

//definizione Tenkan-Sen (9 Period), Kinjun-Sen (26 Period), Chinkou Span (Lagging Line)
averageHighLow(period) => avg(lowest(period), highest(period))
tenkan= averageHighLow(tenkanPeriods)
kinjun = averageHighLow(kinjunPeriods)
senkouSpanA = avg(tenkan, kinjun)
senkouSpanB = averageHighLow(senkouSpanBPeriods)

//definisco il colore della kumo in base al trend.
senkouSpan1Above = senkouSpanA >= senkouSpanB ? 1 : na
senkouSpan2Below = senkouSpanA <= senkouSpanB ? 1 : na

span1plotU = senkouSpan1Above ? senkouSpanA : na
span2plotU = senkouSpan1Above ? senkouSpanB : na
span1plotD = senkouSpan2Below ? senkouSpanA : na
span2plotD = senkouSpan2Below ? senkouSpanB : na

col = senkouSpanA >= senkouSpanB ? lime : red

//plots Ichimoku
plot(tenkan, title = 'Tenkan-Sen', linewidth=1, color=blue)
plot(kinjun, title = 'Kinjun-Sen', linewidth=1, color=red)
plot(close, title = 'Chinkou Span', linewidth=1, offset = -displacement, color=aqua)
plot( senkouSpanA, title = 'Senkou Span A', style=line, linewidth=1, offset = displacement, color=lime)
plot(senkouSpanB, title = 'Senkou Span B', style=line, linewidth=1, offset = displacement, color=red)

//Cloud Lines Plot 
p1 = plot(span1plotU ? span1plotU  : na, title = 'Senkou Span A Above Senkou Span B', style=linebr, linewidth=1, offset = displacement, color=col)
p2 = plot(span2plotU ? span2plotU  : na, title = 'Senkou Span B (52 Period) Below Span A Cloud', style=linebr, linewidth=1, offset = displacement, color=col)
p3 = plot(span1plotD ? span1plotD  : na, title = 'Senkou Span A (26 Period) Below Span B Cloud', style=linebr, linewidth=1, offset = displacement, color=col)
p4 = plot(span2plotD ? span2plotD  : na, title = 'Senkou Span B (52 Period) Above Span A Cloud', style=linebr, linewidth=1, offset = displacement, color=col)
//Fills that color cloud based on Trend.
fill(p1, p2, color=lime, transp=70, title='Kumo (Cloud)')
fill(p3, p4, color=red, transp=70, title='Kumo (Cloud)')

//***********************************************
//*     condizioni ingresso ed uscita mercato   *
//***********************************************
isKumoRialzista = senkouSpanA >= senkouSpanB ? true : false
isSopraKumo = (close > max(senkouSpanA[displacement], senkouSpanB[displacement]))
isSottoKumo = (close < min(senkouSpanA[displacement], senkouSpanB[displacement]))
isChinkouSpanSopra = high[displacement]<close
isChinkouSpanSotto = low[displacement]>close

filtroLong=isSopraKumo and isChinkouSpanSopra
filtroShort=isSottoKumo and isChinkouSpanSotto

//rimbalzato su kijun quando i prezzi stavano ritracciando e il trend era già in atto(tenkan >kijun x entrare long
isPullBackLijunEntryLong = kinjun<tenkan and low<kinjun and (close>kinjun) 
isPullBackLijunEntryShort =kinjun>tenkan and high>kinjun and  (close<kinjun) 

//Breackout Kumo
isBreackoutKumoEntryLong =  crossover(close, max(senkouSpanA[displacement], senkouSpanB[displacement])) and (close>tenkan) and (close>kinjun) 
isBreackoutKumoEntryShort =  crossunder(close, min(senkouSpanA[displacement], senkouSpanB[displacement])) and (close<tenkan) and (close<kinjun)

ConditionEntryLong = (isPullBackLijunEntryLong or isBreackoutKumoEntryLong ) and filtroLong
ConditionEntryShort = (isPullBackLijunEntryShort or isBreackoutKumoEntryLong ) and filtroShort

isExitLong = close<kinjun
isExitShort = close>kinjun

//ingressi ed uscite Mercato
strategy.entry ("Long",long=true, when = window() and ConditionEntryLong)
strategy.entry ("Short",long=false, when = window() and ConditionEntryShort)

strategy.close(id="Long", when=isExitLong)
strategy.close(id="Short", when=isExitShort)
strategy.close_all(when=not window())

```

> Detail

https://www.fmz.com/strategy/440698

> Last Modified

2024-02-01 11:34:23
