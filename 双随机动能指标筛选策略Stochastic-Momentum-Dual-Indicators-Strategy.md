
> Name

双随机动能指标筛选策略Stochastic-Momentum-Dual-Indicators-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略使用双随机动能指标(SMI和RSI)进行多空判断,辅以马丁格尔和身体过滤进行交易信号筛选,旨在捕捉中短线趋势,追踪价格波动。

## 策略原理

该策略使用双随机动能指标SMI和RSI进行多空判断。SMI通过K线实体价差和收盘价的移动平均计算得到,可以有效识别反转点。RSI通过多空动量比较确定超买超卖。策略在SMI低于-50和RSI低于20时做多;SMI高于50和RSI高于80时做空。

为过滤假突破,策略还使用10周期身体均线的1/3作为突破过滤条件。当实体突破均线1/3时,认为突破有效。

此外,策略采用可选的马丁格尔策略,即亏损交易时按比例加仓,以期望追回前期亏损。

Backtest功能通过输入起止时间来回测策略效果。

## 优势分析

该策略综合运用双随机指标和过滤器,可以有效识别反转点,捕捉中短线趋势,追踪价格波动。

- SMI对反转点识别能力强,可有效判定超买超卖
- RSI叠加使用,可避免漏单
- 身体过滤去除假突破,提高信号准确率  
- 可选马丁格尔追击策略,可追回部分亏损

## 风险分析

- SMI和RSI作为滞后指标,信号延迟存在追高杀跌风险
- 马丁格尔存在加速亏损的风险
- 大幅震荡市场中,过滤器会过滤掉部分 valid 信号

可通过优化SMI和RSI参数,降低追高杀跌概率。合理使用马丁格尔策略,控制加仓比例和次数。根据市场情况选择是否开启过滤器,降低过滤valid信号概率。

## 优化方向

- 优化SMI和RSI参数组合,找到最佳判定效果
- 调整过滤器参数,降低过滤valid信号概率
- 优化马丁格尔的加仓次数和比例
- 结合趋势指标,避免反向操作
- 增加止损策略,控制单笔亏损

## 总结

该策略综合运用双随机指标捕捉反转点,辅助以过滤器和马丁格尔进行交易信号筛选和追击,能有效识别中短线趋势,追踪价格波动,适合追求高胜率的投资者。使用时需注意指标滞后及震荡市的风险,可通过参数优化和止损来控制风险。

|| 

## Overview

This strategy uses dual stochastic momentum indicators (SMI and RSI) for long and short signals, along with martingale and body filter for trade signal selection, aiming to capture mid-term trends and price fluctuations. 

## Strategy Logic

The strategy judges long and short using two stochastic indicators SMI and RSI. SMI is calculated based on moving average of bar range and close price, good at identifying reversal points. RSI compares bull and bear power to determine overbought and oversold status. Strategy goes long when SMI is below -50 and RSI is below 20; goes short when SMI is above 50 and RSI is above 80. 

To filter false breakouts, strategy also uses 1/3 of 10-period body SMA as the breakthrough filter condition. When body breaks through 1/3 of SMA, the breakout is considered valid.

In addition, the strategy adopts optional martingale, which is to scale up lots on losing trades, attempting to recover previous losses.  

Backtest functionality backtests the strategy by inputting a date range.

## Advantage Analysis

The strategy combines dual stochastic indicators and filters, able to effectively identify reversal points, capture mid-term trends, and track price fluctuations.

- SMI has strong reversal point recognition ability and can determine overbought and oversold conditions effectively.
- Adding RSI avoids missing trades. 
- Body filter removes false breakouts and improves signal accuracy.
- Optional martingale strategy allows recovering part of the losses.

## Risk Analysis

- As lagging indicators, SMI and RSI have risks of chasing highs and killing lows. 
- Martingale carries the risk of accelerating losses.
- Filters may filter out some valid signals in ranging markets.

Risks can be mitigated by optimizing SMI and RSI parameters to lower chasing/killing probability, using martingale strategically by controlling scale-up ratio and times, and enabling filters discretionarily based on market conditions.

## Optimization Directions 

- Optimize SMI and RSI parameters for best judgement effectiveness.
- Adjust filter parameters to lower the probability of filtering valid signals.  
- Optimize martingale scale-up times and ratio.
- Incorporate trend indicators to avoid trading against the trend.
- Add stop loss to limit losses on single trades.

## Summary

The strategy combines dual stochastic indicators to capture reversal points, with filters and martingale for trade signal selection and chase. It can effectively identify mid-term trends and track price fluctuations, suitable for investors pursuing high win rate. Pay attention to indicator lagging and ranging market risks, manage risks by parameter optimization and stop loss.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|false|Use Martingale|
|v_input_4|100|Capital, %|
|v_input_5|true|Use SMI Strategy|
|v_input_6|true|Use RSI Strategy|
|v_input_7|true|Use Body-Filter|
|v_input_8|5|SMI Percent K Length|
|v_input_9|3|SMI Percent D Length|
|v_input_10|50|SMI Limit|
|v_input_11|2017|From Year|
|v_input_12|2100|To Year|
|v_input_13|true|From Month|
|v_input_14|12|To Month|
|v_input_15|true|From day|
|v_input_16|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-30 00:00:00
end: 2023-10-06 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// strategy(title = "CS Basic Scripts - Stochastic Special (Strategy)", shorttitle = "Stochastic Special", overlay = false, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings 
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
usemar = input(false, defval = false, title = "Use Martingale")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
usesmi = input(true, defval = true, title = "Use SMI Strategy")
usersi = input(true, defval = true, title = "Use RSI Strategy")
usebod = input(true, defval = true, title = "Use Body-Filter")
a = input(5, "SMI Percent K Length")
b = input(3, "SMI Percent D Length")
limit = input(50, defval = 50, minval = 1, maxval = 100, title = "SMI Limit")

//Backtesting Input Range
fromyear = input(2017, defval = 2017, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Fast RSI
fastup = rma(max(change(close), 0), 7)
fastdown = rma(-min(change(close), 0), 7)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//Stochastic Momentum Index
ll = lowest (low, a)
hh = highest (high, a)
diff = hh - ll
rdiff = close - (hh+ll)/2
avgrel = ema(ema(rdiff,b),b)
avgdiff = ema(ema(diff,b),b)
SMI = avgdiff != 0 ? (avgrel/(avgdiff/2)*100) : 0
SMIsignal = ema(SMI,b)

//Lines
plot(SMI, color = blue, linewidth = 3, title = "Stochastic Momentum Index")
plot(SMIsignal, color = red, linewidth = 3, title = "SMI Signal Line")
plot(limit, color = black, title = "Over Bought")
plot(-1 * limit, color = black, title = "Over Sold")
plot(0, color = blue, title = "Zero Line")

//Body Filter
nbody = abs(close - open)
abody = sma(nbody, 10)
body = nbody > abody / 3 or usebod == false

//Signals
up1 = SMI < -1 * limit and close < open and body and usesmi
dn1 = SMI > limit and close > open and body and usesmi
up2 = fastrsi < 20 and close < open and body and usersi
dn2 = fastrsi > 80 and close > open and body and usersi
exit = ((strategy.position_size > 0 and close > open) or (strategy.position_size < 0 and close < open)) and body

//Trading
profit = exit ? ((strategy.position_size > 0 and close > strategy.position_avg_price) or (strategy.position_size < 0 and close < strategy.position_avg_price)) ? 1 : -1 : profit[1]
mult = usemar ? exit ? profit == -1 ? mult[1] * 2 : 1 : mult[1] : 1
lot = strategy.position_size == 0 ? strategy.equity / close * capital / 100 * mult : lot[1]

if up1 or up2
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("long", strategy.long, needlong == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if dn1 or dn2
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if time > timestamp(toyear, tomonth, today, 23, 59) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/428630

> Last Modified

2023-10-07 16:45:25
