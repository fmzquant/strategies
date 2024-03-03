
> Name

RSI区间突破策略RSI-Range-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

RSI区间突破策略是一种典型的趋势跟踪策略。它使用相对强弱指数(RSI)作为主要的技术指标,在RSI处于超买或超卖状态时,寻找突破进入区间的机会建立仓位,实现跟踪趋势运行的目的。

## 策略原理

该策略主要依靠RSI指标判断市场的超买超卖状态。RSI指标的计算公式是:RSI=(上涨平均数值/上涨平均数值+下跌平均数值)×100。其中,上涨平均数值是过去N天内收盘涨幅的简单移动平均,下跌平均数值是过去N天内收盘跌幅的简单移动平均。

当RSI大于设定的超买线(默认80)时,表示市场处于超买状态;当RSI小于设定的超卖区间(默认35)时,表示市场处于超卖区间。策略在RSI向下突破超买线时寻找做空机会;在RSI向上突破超卖区间时,寻找做多机会。

具体来说,策略通过两个SMA均线判断RSI指标的趋势。当快线从下向上突破慢线,同时RSI突破超卖区间时,做多;当快线从上向下突破慢线,同时RSI突破超买线时,做空。策略还设定了止损线和止盈线来控制风险。

## 策略优势

- 利用RSI指标判断市场超买超卖状态,具有一定的趋势判断能力
- 结合双SMA均线,可避免RSI指标震荡造成的假突破
- 设定止损止盈,可控制单笔损失
- 突破入场,不存在频繁开仓套利

## 风险及解决方案

- RSI指标存在滞后性,可能错过趋势反转点
  - 适当调整RSI的参数,优化指标的灵敏度
- 超买超卖区间设置不当,增大了获利空间的难度
  - 针对不同市场调整参数,确保参数设置合理  
- 止损点过于接近,容易被隔夜间隔震荡止损
  - 适当放宽止损距离,避免被套
- 止盈设置过小,无法充分捕捉趋势运行
  - 根据市场波动情况,灵活调整止盈线

## 优化方向

- 结合其他指标确定入场时机,例如KDJ、MACD等,避免RSI指标的滞后性问题
- 增加对大级别趋势的判断,避免逆势操作
- 优化止损止盈策略,例如随价格追踪止损、移动止盈等
- 区分不同品种参数设置,根据市场特点确定合理的参数
- 增加仓位管理策略,通过加仓方式调整仓位

## 总结

RSI区间突破策略整体来说是一个典型的趋势跟踪策略。它通过RSI指标判断买卖点,双SMA平均线过滤信号,并设定止损止盈来控制风险。但RSI指标存在滞后性问题,此外参数设置不当也会影响策略表现。通过进一步优化,可充分发挥该策略的趋势跟踪能力。

||

## Overview

The RSI range breakout strategy is a typical trend following strategy. It uses the Relative Strength Index (RSI) as the main technical indicator to look for breakout opportunities when RSI is in overbought or oversold levels, with the goal of following the trend.

## Strategy Logic

The strategy mainly relies on the RSI indicator to determine overbought and oversold levels in the market. The RSI calculation formula is: RSI = (Average Up Value / (Average Up Value + Average Down Value)) x 100. The Average Up Value is the simple moving average of close-up amplitudes over the past N days. The Average Down Value is the simple moving average of close-down amplitudes over the past N days.

When RSI is higher than the overbought line (default 80), it indicates the market is in an overbought state. When RSI is lower than the oversold zone (default 35), it indicates the market is in an oversold state. The strategy looks for short opportunities when RSI breaks down the overbought line, and long opportunities when RSI breaks up the oversold zone. 

Specifically, the strategy uses two SMA lines to determine the trend of the RSI indicator. When the faster SMA line breaks up the slower SMA line, while the RSI breaks through the oversold zone, go long. When the faster SMA line breaks down the slower SMA line, while the RSI breaks the overbought line, go short. The strategy also sets stop loss and take profit lines to control risks.

## Advantages

- Utilize RSI indicator to determine overbought and oversold levels, with certain trend judgment capability
- Combined with double SMA lines to avoid false breakouts caused by RSI oscillation  
- Set stop loss and take profit to control single loss
- Break-in entry, no frequent opening and closing

## Risks and Solutions

- RSI indicator has lagging effect, may miss trend reversal points
  - Adjust RSI parameters appropriately to optimize indicator sensitivity
- Overbought and oversold zone settings improper, increased difficulty of profit range
  - Adjust parameters according to different markets to ensure reasonable settings
- Stop loss point too close, easy to be stopped out by overnight fluctuation
  - Widen stop loss distance appropriately to avoid being trapped
- Take profit setting too small, unable to fully capture trend runs
  - Adjust take profit line flexibly based on market volatility

## Optimization Directions 

- Combine with other indicators to determine entry timing, such as KDJ, MACD, etc., to avoid RSI lagging issues
- Add judgment of major trend to avoid trading against the trend 
- Optimize stop loss and take profit strategies, such as trailing stop, moving take profit, etc.
- Distinguish parameter settings for different products, determine reasonable parameters based on market characteristics
- Add position management strategies, adjust positions through adding orders

## Summary

The RSI range breakout strategy is a typical trend following strategy overall. It determines trading signals through RSI indicator, filters signals with double SMA lines, and sets stop loss and take profit to control risks. But RSI indicator has lagging issues, and improper parameter settings also affect strategy performance. The trend following capability can be fully realized through further optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|RSI Length|
|v_input_2|35|Treshold Low|
|v_input_3|80|Treshold High|
|v_input_4|3|RSI Smoothing 1|
|v_input_5|5|RSI Smoothing 2|
|v_input_6|0.026|Stop loss %|
|v_input_7|300|TP|
|v_input_8|true|Long only ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-10-10 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

//strategy("Strategy RSI | Fadior", shorttitle="Strategy RSI", pyramiding=10, calc_on_order_fills=false, initial_capital=10000, default_qty_type=strategy.percent_of_equity, currency="USD", default_qty_value=100, overlay=false)
 
len = input(3, minval=1, title="RSI Length") 
threshLow = input(title="Treshold Low", defval=35)
threshHigh = input(title="Treshold High", defval=80)
rsiLength1 = input(title="RSI Smoothing 1", defval=3)
rsiLength2 = input(title="RSI Smoothing 2", defval=5)
SL = input(title="Stop loss %", type=float, defval=.026, step=.001)
TP = input( defval=300)

// 3 40 70 2
// 14 40 70 2 16 0.05 50

src = close
  
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))

plot(sma(rsi,rsiLength2), color=orange)
plot(sma(rsi,rsiLength1), color=green)

band1 = hline(threshHigh)
band0 = hline(threshLow)
fill(band1, band0, color=purple, transp=90)

strategy = input(type=bool, title="Long only ?", defval=true)
strategy.risk.allow_entry_in(strategy ? strategy.direction.long : strategy.direction.all)

longCondition = sma(rsi,rsiLength1) < threshLow and sma(rsi,rsiLength2) > sma(rsi,rsiLength2)[1] 

if (longCondition)
    strategy.entry("Long", strategy.long) //, qty=10)
    strategy.exit("Close Long", "Long", stop=src-close*SL, profit=TP)
    
shortCondition = sma(rsi,rsiLength1) > threshHigh and sma(rsi,rsiLength2) < sma(rsi,rsiLength2)[1]
if (shortCondition)
    strategy.entry("Short", strategy.short) //, qty=10)
    strategy.exit("Close Short", "Short") //, stop=src-close*SL, profit=TP)

```

> Detail

https://www.fmz.com/strategy/428981

> Last Modified

2023-10-11 15:54:11
