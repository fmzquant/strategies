
> Name

均衡尺云图趋势跟踪策略Ichimoku-Cloud-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13dd13793ed241e7544.png)

[trans]
## 一、策略名称:均衡尺云图趋势跟踪策略

### 二、策略概述

本策略运用均衡尺云图指标提供的多种信号,设计了一个纯趋势跟踪策略,旨在捕捉中长期趋势,过滤震荡盘整,追踪强劲趋势的方向。

### 三、策略原理

该策略使用均衡尺云图指标中的转换线、基准线以及延迟线等为主要信号。在长期趋势判断方面,重点关注前置云和后置云的上下变化关系来判断趋势;在具体入场和出场时机选择上,转换线和基准线的交叉以及价格与云图关系的变化是主要依据。

整体来说,该策略的核心逻辑是:确认中长期趋势方向->等待强势趋势重新启动的机会->入场追踪趋势->跟踪止损退出。

具体来说,判断中长期趋势时,通过前置云和后置云的变化关系来确定(若前置云在上且为绿色,代表上升趋势,反之代表下降趋势)。当确认中长期趋势后,通过转换线和基准线的交叉以及价格突破云图的信号判断趋势重新启动,发出入场信号;入场后用基准线作为止损线来跟踪止损退出。

这样,既过滤了中短期的震荡,又可以抓住强势趋势的机会,在证券市场中获得长期稳定的超额收益。

### 四、策略优势

(一)利用均衡尺云图判断中长期趋势方向,有利于定位主要方向

(二)转换线和基准线交叉以及价格与云图关系变化判断入场时机,可以有效过滤震荡,捕捉强劲趋势

(三)跟踪止损退出机制,既可以获得大趋势获利,也可以有效控制个别损失

(四)综合多种均衡尺云图信号,形成系统性的趋势跟踪策略,稳定表现良好

### 五、策略风险

(一)中长期判断错误的系统性风险。若中长期趋势判断错误,则后续操作都将面临错误方向的风险。

(二)入场时机选择不当带来的风险。若入场时机选择不当,容易被套。

(三)跟踪止损过于接近带来的风险。若止损距离过于接近,极端行情可能被突破止损,造成损失。

(四)交易频率过高带来的交易费用负担。若因参数设置不当使交易频率过高,交易费用也会增大。

### 六、策略优化

(一)测试不同均衡尺周期参数的组合,找到最优参数

(二)优化入场条件,设计更严格的滤波器,确保有效入场

(三)调整止损距离,在风险与收益之间找到最优平衡

(四)添加盈利价格目标,结合价格与关键均衡尺指标距离,形成动态获利机制

### 七、总结

本均衡尺云图趋势跟踪策略,综合均衡尺云图多个信号判断趋势方向、入场时机、止损退出。实践表明,该策略可以有效抓住中长期趋势,过滤震荡,稳定获得超额收益。未来通过持续优化测试,有望进一步改进策略表现,获得更好回报。

||

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

[/trans]

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
