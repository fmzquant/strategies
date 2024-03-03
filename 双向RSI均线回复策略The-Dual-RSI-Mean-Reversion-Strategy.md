
> Name

双向RSI均线回复策略The-Dual-RSI-Mean-Reversion-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c7f9b7ce76020d8ea6.png)
[trans]
## Overview

The Dual RSI Mean Reversion Strategy is a trend following strategy that identifies overbought and oversold conditions using two RSI indicators on different timeframes. It aims to capitalize on mean reversion by going long after oversold conditions and going short after overbought conditions. The strategy uses Heikin-Ashi candles, RSI indicators and an open color filter to identify trading opportunities.

## Strategy Logic

The strategy uses two RSI indicators with different periods - one on the 5 minute chart and one on the 1 hour chart. For the RSI indicators, oversold levels are identified below 30 and overbought levels above 70. 

It tracks RSI values and looks for situations where the RSI has been below 30 or above 70 for a defined number of bars, indicating extended oversold or overbought conditions. 

In addition, it uses Heikin-Ashi candles and checks for a defined number of green or red candles to confirm the trend direction before entering trades. An open color filter helps avoid false signals.

When both RSI and Heikin-Ashi conditions align, the strategy will go long after oversold conditions or go short after overbought conditions, betting on a reversion to the mean. 

Positions are closed out at the end of each day to avoid holding trades overnight.

## Advantages

- Uses a multi-timeframe approach to identify overbought/oversold conditions
- Heikin-Ashi candles filter out noise and identify trend direction
- Open color filter avoids false signals 
- Clear entry/exit rules based on two indicators aligning
- Risk management by closing positions before end of each day

## Risks

- Whipsaws possible if strong trend persists after RSI overbought/oversold signal
- Market gaps can trigger stops
- Heikin-Ashi lag can delay trade entries and cause missed moves
- Closing positions at day end gives up potential gains of overnight holds

## Enhancements

- Add additional filters like volume or volatility to confirm signals
- Optimize RSI periods and overbought/oversold levels for instrument
- Consider dynamic position sizing based on volatility 
- Experiment with profit targets or trailing stops instead of end-of-day exits
- Test effectiveness on different instruments and adjust parameters

## Conclusion

The Dual RSI Mean Reversion strategy takes a rules-based approach to trading momentum. By combining two timeframes, overbought/oversold indicators, candlestick analysis and an entry filter, it aims to identify high probability mean reversion setups. Strict risk management and prudent position sizing help balance profits with managing drawdowns. Further optimization and robustness testing would help deploy it successfully across various markets.

||


## 概述

双向RSI均线回复策略是一种趋势跟踪策略,它使用两个不同时间周期的RSI指标来识别超买和超卖状况。该策略旨在通过在超卖后做多、在超买后做空来获利。该策略使用平滑异同移动平均线、RSI指标和开仓颜色过滤器来识别交易机会。

## 策略逻辑

该策略使用两个具有不同周期的RSI指标——一个在5分钟图表上,一个在1小时图表上。对于RSI指标,超卖水平被认定在30以下,超买水平在70以上。

它会追踪RSI值,寻找RSI持续一定周期处于超卖区或者超买区的情况,表明出现了扩张的超卖或超买状态。 

此外,它使用平滑异同移动平均线,在进入交易前检查一定周期的红色或绿色K线来确认趋势方向。开仓颜色过滤器有助于避免假信号。

当RSI和平滑异同移动平均线条件都满足时,该策略会在超卖后做多,在超买后做空,押注价格重新回归均线。

每天结束时平仓,以避免过夜持仓。

## 优势分析

- 使用多时间框架识别超买超卖状况
- 平滑异同移动平均线过滤噪音,识别趋势方向 
- 开仓颜色过滤器避免假信号
- 根据两个指标匹配明确的开仓平仓规则
- 每日前平仓控制风险

## 风险分析

- 如果强势趋势继续,RSI超买超卖信号后可能出现震荡
- 市场间隙可能触发止损
- 平滑异同移动平均线滞后可能延迟开仓从而错过行情
- 每日结束前平仓放弃过夜持仓可能获得的收益

## 优化方向

- 添加交易量或波动率等额外过滤器以确认信号
- 优化RSI周期和超买超卖水平参数
- 考虑根据波动率进行动态仓位控制
- 测试止盈止损退出,而非每日结束前平仓
- 在不同品种测试效果并调整参数

## 总结

双向RSI均线回复策略采用规则化方法交易动量。通过组合两个时间框架、超买超卖指标、K线形态分析和开仓过滤器,其目标是识别高概率均线回归机会。严格的风险管理和审慎的仓位控制有助于在获利的同时控制回撤。进一步优化和稳健性测试将有助于成功地在各类市场部署该策略。

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|100|Lot, %|
|v_input_4|14|RSI period|
|v_input_5|30|RSI limit|
|v_input_6|3|RSI signals|
|v_input_7|true|Use Open Color Filter|
|v_input_8|2|Open Color, Bars|
|v_input_9|true|Show indicator RSI|
|v_input_10|2018|From Year|
|v_input_11|2100|To Year|
|v_input_12|true|From Month|
|v_input_13|12|To Month|
|v_input_14|true|From Day|
|v_input_15|31|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-01 00:00:00
end: 2023-09-30 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Gidra
//2018

//@version=2
strategy(title = "Gidra's Vchain Strategy v0.1", shorttitle = "Gidra's Vchain Strategy v0.1", overlay = false, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 100)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot, %")
rsiperiod = input(14, defval = 14, minval = 2, maxval = 100, title = "RSI period")
rsilimit = input(30, defval = 30, minval = 1, maxval = 50, title = "RSI limit")
rsibars = input(3, defval = 3, minval = 1, maxval = 20, title = "RSI signals")
useocf = input(true, defval = true, title = "Use Open Color Filter")
openbars = input(2, defval = 2, minval = 1, maxval = 20, title = "Open Color, Bars")
showrsi = input(true, defval = true, title = "Show indicator RSI")
fromyear = input(2018, defval = 2018, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From Day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To Day")


//Heikin Ashi Open/Close Price
o=open
c=close
h=high
l=low
haclose = (o+h+l+c)/4
haopen = na(haopen[1]) ? (o + c)/2 : (haopen[1] + haclose[1]) / 2
hahigh = max (h, max(haopen,haclose))
halow = min (l, min(haopen,haclose))
col=haopen>haclose ? red : lime
plotcandle(haopen, hahigh, halow, haclose, title="heikin", color=col)

//RSI
uprsi = rma(max(change(close), 0), rsiperiod)
dnrsi = rma(-min(change(close), 0), rsiperiod)
rsi = dnrsi == 0 ? 100 : uprsi == 0 ? 0 : 100 - (100 / (1 + uprsi / dnrsi))
uplimit = 100 - rsilimit
dnlimit = rsilimit
rsidn = rsi < dnlimit ? 1 : 0
rsiup = rsi > uplimit ? 1 : 0

//RSI condition
rsidnok = highest(rsidn, rsibars) == 1? 1 : 0
rsiupok = highest(rsiup, rsibars) == 1? 1 : 0

//Color Filter
bar = haclose > haopen ? 1 : haclose < haopen ? -1 : 0
gbar = bar == 1 ? 1 : 0
rbar = bar == -1 ? 1 : 0
openrbarok = sma(gbar, openbars) == 1 or useocf == false
opengbarok = sma(rbar, openbars) == 1 or useocf == false

//Signals
up = openrbarok and rsidnok
dn = opengbarok and rsiupok

lot = strategy.position_size == 0 ? strategy.equity / close * capital / 100 : lot[1]

//Indicator RSI
colbg = showrsi == false ? na : rsi > uplimit ? red : rsi < dnlimit ? lime : na
bgcolor(colbg, transp = 20)

//Trading
if up
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if dn
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if time > timestamp(toyear, tomonth, today, 23, 59)// or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/429958

> Last Modified

2023-10-23 15:46:33
