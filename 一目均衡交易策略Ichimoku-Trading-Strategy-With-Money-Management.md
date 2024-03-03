
> Name

一目均衡交易策略Ichimoku-Trading-Strategy-With-Money-Management

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14ae8911455f5025f3a.png)
[trans]

### 概述

这是一个基于Ichimoku Kinko Hyo指标的只做多头的股票交易策略。该策略利用一目均衡的基本原理来判断入市和出市时机。

### 策略原理

该策略首先计算一目均衡的组成元素,包括天玑线(Tenkan-Sen)、基准线(Kijun-Sen)、先行线(Senkou Span A)和延迟线(Senkou Span B)。

当满足以下条件时,做多入市:
- 天玑线上穿基准线,表明短期均线上穿长期均线,属于金叉信号
- 价格上穿云图,表明股价取得支持,开始上涨
- 未来的云图呈红色,表明未来趋势向上
- 价格距离天玑线小于2倍ATR,表明价格不虚高,符合追涨策略
- 价格距离基准线小于3倍ATR,表明价格不虚高,符合追涨策略
- 天玑线和基准线都在云图之上,表明一目均衡趋势向上

当满足以下条件时,平仓出场:
- 天玑线下穿基准线,表明短期均线下穿长期均线,属于死叉信号
- 价格跌破云图,表明股价失去支持
- 或者盈利超过30%,遵循止盈策略
- 或者亏损超过3%,遵循止损策略

### 优势分析

- 利用一目均衡指标判断股价趋势,准确率较高
- 结合ATR来控制追涨止跌,避免超买超卖
- 同时判断多种信号,避免假信号
- 补仓策略可以加速盈利

### 风险分析

- 一目均衡信号可能滞后,需要结合其他指标判断
- 错误的ATR参数设置可能导致超买超卖
- 补仓策略可能加大亏损风险
- 需要人工确定参数,不同股票参数不同

### 优化方向

- 可以结合MACD、KDJ等其他指标来确认信号
- 可以加大止盈幅度,缩小止损幅度
- 可以根据历史数据自动优化ATR参数
- 可以研究不同行业股票的参数区别,建立参数池

### 总结

这是一个非常实用的股票交易策略,利用一目均衡判断趋势,ATR控制风险,以追涨止跌的方法来获利。该策略优势明显,经过参数优化和组合指标优化后,效果会更好,适合用于实盘交易。

||

### Overview

This is an Ichimoku Kinko Hyo indicator based long-only stock trading strategy. The strategy utilizes the basic principles of Ichimoku to determine entries and exits.  

### Strategy Logic

The strategy first calculates the components of Ichimoku, including Tenkan-Sen, Kijun-Sen, Senkou Span A, and Senkou Span B.

Long entry if the following conditions are met:
- Tenkan cross above Kijun, indicating short term MA cross above long term MA, which is a golden cross signal  
- Price above Kumo cloud, indicating the price finds support and starts to rise
- Future Kumo is red, indicating future trend is up
- Price distance from Tenkan < 2 x ATR, indicating price is not overextended for chase strategy  
- Price distance from Kijun < 3 x ATR, indicating price is not overextended for chase strategy
- Tenkan and Kijun above Kumo cloud, indicating Ichimoku trend is up

Exit if the following conditions are met: 
- Tenkan cross below Kijun, indicating dead cross 
- Price penetration Kumo cloud, indicating loss of support
- Profit > 30%, implementing profit taking strategy
- Loss > 3%, implementing stop loss strategy

### Advantage Analysis 

- Utilize Ichimoku to determine price trend with high accuracy
- Incorporate ATR to control chasing, avoiding overbought and oversold
- Filter signals with multiple confirmations, avoiding false signals
- Add-on strategy could accelerate profit

### Risk Analysis

- Ichimoku signals could lag, requiring confirmations from other indicators
- Wrong ATR parameters could lead to overbought and oversold
- Add-on strategy could increase loss risk  
- Parameters need to be tuned manually for different stocks

### Optimization Directions

- Incorporate other indicators like MACD, KDJ for signal confirmation
- Increase profit taking level, decrease stop loss level
- Auto tune ATR parameters based on historical data
- Research parameter differences for various sectors, build parameter pool

### Summary

This is a very practical stock trading strategy, utilizing Ichimoku for trend and ATR for risk control, profiting from chase strategy with stop loss. The advantages are obvious. Further optimizations on parameters and combining indicators would make it even better for live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|9|Tenkan-Sen Period|
|v_input_int_2|26|Kijun-Sen Period|
|v_input_int_3|52|Senkou-Span B Period|
|v_input_int_4|26|Chikou-Span Offset|
|v_input_int_5|26|Senkou-Span Offset|
|v_input_int_6|true|Start Date|
|v_input_int_7|true|Start Month|
|v_input_int_8|1980|Start Year|
|v_input_int_9|true|En Date|
|v_input_int_10|true|End Month|
|v_input_int_11|2100|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-05 00:00:00
end: 2023-12-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// Author Obarut
//@version=5
strategy("İchimoku Strategy With Money Management",overlay=true)

//Inputs
ts_period = input.int(9, minval=1, title="Tenkan-Sen Period")
ks_period = input.int(26, minval=1, title="Kijun-Sen Period")
ssb_period = input.int(52, minval=1, title="Senkou-Span B Period")
cs_offset = input.int(26, minval=1, title="Chikou-Span Offset")
ss_offset = input.int(26, minval=1, title="Senkou-Span Offset")


// Back Testing Period

fromday = input.int(defval=1,title="Start Date",minval=1,maxval=31) 
frommonth = input.int(defval=1,title="Start Month",minval=1,maxval=12)
fromyear = input.int(defval=1980,title="Start Year",minval=1800, maxval=2100)
today = input.int(defval=1,title="En Date",minval=1,maxval=31)
tomonth = input.int(defval=1,title="End Month",minval=1,maxval=12)
toyear =input.int(defval=2100,title="End Year",minval=1800,maxval=2200)


start=timestamp(fromyear,frommonth,fromday,00,00)
finish=timestamp(toyear,tomonth,today,00,00)
timewindow= time>=start and time<=finish

middle(len) => math.avg(ta.lowest(len), ta.highest(len))

// Ichimoku Components

tenkan = middle(ts_period)
kijun = middle(ks_period)
senkouA = math.avg(tenkan, kijun)
senkouB = middle(ssb_period)


atr = ta.atr(14)
ss_above = math.max(senkouA[ss_offset-1], senkouB[ss_offset-1])
ss_below = math.min(senkouA[ss_offset-1], senkouB[ss_offset-1])

// Price Distance From Tenkan

distance = close - tenkan

// Price Distance from Kijun

distancek = close - kijun

// Entry/Exit Signals

tk_cross_kijun_bull = tenkan >= kijun
tk_cross_kijun_bear = tenkan <= kijun
cs_cross_bull = ta.mom(close, cs_offset-1) > 0
cs_cross_bear = ta.mom(close, cs_offset-1) < 0
price_above_kumo = close > ss_above
pbsenkA = close < ss_above
pasenkB = close > ss_below
price_below_kumo = close < ss_above
future_kumo_bull = senkouA > senkouB
future_kumo_bear = senkouA < senkouB
// Price Distance From Tenken
disbull = distance < 2*atr
//Price Distance From Kijun
disbullk = distancek < 3*atr
//Price Above Tenkan Condition
patk = close > tenkan
// Kijun Above Senkou Span Condition
kjasenkA = kijun > ss_above
// Price Below Kijun Condition
pbkijun = close < kijun

//Bullish Condition

bullish= tk_cross_kijun_bull and cs_cross_bull and price_above_kumo and future_kumo_bull and patk and disbull and disbullk 
     and (tenkan>ss_above) and (kijun>ss_above)

if(bullish and timewindow )
    strategy.entry("Long Entry", strategy.long)

// Bearish Condition

bearish=tk_cross_kijun_bear and pbsenkA and cs_cross_bear  
      or pbkijun or price_below_kumo 

lastentryprice = strategy.opentrades.entry_price(strategy.opentrades - 1)

// Take Profit or Stop Loss in Bearish

if(bearish and timewindow or (close>1.30*lastentryprice and close<kijun ) or (close< 0.93*lastentryprice))
    strategy.close("Long Entry")




if(time>finish)
    strategy.close_all("time up")


plot(tenkan, color=#0496ff, title="Tenkan-Sen")
plot(kijun, color=#991515, title="Kijun-Sen")
plot(close, offset=-cs_offset+1, color=#2e640e, title="Chikou-Span")
sa=plot(senkouA, offset=ss_offset-1, color=color.rgb(17, 122, 21), title="Senkou-Span A")
sb=plot(senkouB, offset=ss_offset-1, color=color.rgb(88, 8, 8), title="Senkou-Span B")
fill(sa, sb, color = senkouA > senkouB ? color.rgb(198, 234, 198) : color.rgb(208, 153, 153), title="Cloud color")
```

> Detail

https://www.fmz.com/strategy/435158

> Last Modified

2023-12-12 17:32:08
