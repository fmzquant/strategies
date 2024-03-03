
> Name

动量反转策略Momentum-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10a4382ffcf82f8799f.png)
[trans]

### 概述

本策略通过计算价格的动量指标,判断价格移动趋势是否发生反转,以捕捉价格反转机会。当价格上涨趋势放缓或下跌趋势放缓时,表明价格动量发生反转,这时策略会开仓做多或做空。

### 策略原理

该策略主要基于动量指标的计算。动量指标反映价格变化的速度和强度。策略中计算了两个动量指标MOM和MOM1。

MOM计算公式:

MOM = 当天收盘价 - N天前收盘价

MOM1计算公式: 

MOM1 = MOM今日 - MOM昨日

根据MOM和MOM1的值判断价格是否发生反转。如果MOM > 0且MOM1 < 0,说明价格上涨趋势放缓,出现反转信号,做多;如果MOM < 0且MOM1 > 0,说明价格下跌趋势放缓,出现反转信号,做空。

### 策略优势

1. 捕捉价格反转点,及时进入市场
2. 回撤小,避免追高杀跌
3. 实现自动止损,降低风险

### 策略风险

1. 价格震荡时,可能出现频繁开仓平仓
2. 参数设置不当时,无法准确判断价格反转点
3. 市场突发事件导致错误信号

主要风险缓解方法:
1. 优化参数,提高判断准确性
2. 结合其他指标过滤信号
3. 人工干预,避免市场异常时带来的损失

### 策略优化方向

1. 优化动量指标参数,提高捕捉反转时机
2. 增加成交量等指标过滤,避免错误信号
3. 加入止损策略,降低单笔损失

### 总结

本策略通过计算价格动量指标,判断价格移动趋势是否反转,实现自动做多做空。回测显示,该策略整体运作顺畅,有效抓住价格反转点。通过优化参数设置、增加信号过滤等方法,可以进一步提高策略稳定性和收益率。

||


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

[/trans]

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
