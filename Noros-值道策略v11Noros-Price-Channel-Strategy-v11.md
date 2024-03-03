
> Name

Noros-值道策略v11Noros-Price-Channel-Strategy-v11

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1614f2e58d643da6fea.png)

[trans]

## 概述

Noro's 值道策略v1.1是一个基于价值通道和价格变化方向的趋势交易策略。该策略结合价值通道指标和快速RSI指标,识别出突破价值通道的K线形态信号,并结合连续红绿K线的颜色反转信号来建立多空仓位。该策略旨在捕捉中长线趋势的方向,而避免被市场的短期波动所迷惑。

## 策略原理

该策略首先计算过去一定周期内的最高价和最低价的均值,构建出中间价值通道。当价格从通道下方向上突破该通道时,视为多头信号;当价格从通道上方向下跌破该通道时,视为空头信号。 

与此同时,该策略结合两个辅助判断规则:快速RSI指标和K线颜色。当快速RSI低于25%时,认为处于超买状态,价格可能反弹;此时若价格突破通道上轨,产生较强的多头信号。相反,当快速RSI高于75%时,认为处于超卖区,价格可能下跌;此时若价格突破通道下轨,产生较强的空头信号。此外,策略还会统计最近两个K线的颜色变化。连续两个红色K线会增强空头信号,连续两个绿色K线会增强多头信号。 

综合这三个信号指标,该策略可以有效识别中长线趋势,并及时建立仓位。当仓位方向与最新K线颜色相反时,认为趋势发生转变,此时平掉当前仓位。

## 策略优势

该策略最大的优势是结合多种指标判断趋势方向,避免被短期市场Noise所迷惑。具体来看,主要有以下几个方面的优势:

1. 价值通道指标能清晰识别中长线趋势的方向和力度。价格突破通道上下轨时,代表趋势进入新的阶段,产生较强信号。

2. 快速RSI指标能判断超买超卖现象,避免在转折点追逐趋势。例如超卖时买入,超买时卖出。

3. K线颜色判定能进一步验证趋势的持续性,如果颜色发生变化,则关闭当前仓位。

4. 该策略只在连续两个同色K线突破通道时才开仓,避免被短期震荡误导。

5. 平均止损方式简单有效,只要K线颜色发生变化就平仓,最大程度避免亏损扩大。

## 策略风险

该策略也存在一些风险需要注意,主要有:

1. 价值通道参数设置不当,通道过于宽泛或者过于狭窄,会错过趋势转换点或者产生过多错误信号。

2. 快速RSI参数设置不当,无法准确判断超买超卖现象,从而錯过反转机会。

3. 平均止损方式可能在震荡趋势中过于敏感,造成仓位频繁开平。

4. 无法判断突破价值通道后的具体运行走势,可能导致亏损放大。

5. 无法应对黑天鹅事件的突发性冲击,会遭受巨大亏损。

## 优化方向

该策略还有以下几个主要优化方向:

1. 动态调整价值通道参数,让通道能更好地适应不同周期和不同市场的波动。

2. 结合波动率指标修正RSI参数,在大幅波动时降低敏感度,在低波动时提高敏感度。

3. 加入移动止损机制,根据趋势波动幅度来设定止损位置,避免过于敏感地止损。 

4. 增加对突破力度和背驰现象的判断,避免出现虚假突破。

5. 结合历史数据训练判断模型,辅助判断趋势转折高度可能的时段,提高开仓成功率。

6. 优化仓位管理策略,根据风险状况动态调整仓位比例。

## 总结

Noro's 值道策略v1.1整体来说是一个简单实用的趋势跟踪策略。它结合多种指标来识别中长线趋势方向,并设定较为谨慎的开仓规则。在优化止损机制、动态调整参数等方面还有进一步改进的空间。但该策略整体思路简单清晰,易于实际应用,非常适合作为量化交易的入门策略之一。随着参数调整和机制优化,该策略可以成为稳定可靠的量化系统。

|| 


## Overview

Noro's Price Channel Strategy v1.1 is a trend trading strategy based on price channels and price direction changes. This strategy combines the price channel indicator and fast RSI indicator to identify price breakout signals from the channel, along with consecutive red/green candle color reversal signals to establish long/short positions. The goal of this strategy is to capture the direction of mid-to-long term trends, while avoiding noise from short-term market fluctuations.

## Strategy Logic

The strategy first calculates the average of highest and lowest prices over a certain period to construct a mid-price channel. When the price breaks out above the channel from below, it is considered a long signal. When the price breaks down below the channel from above, it is considered a short signal.

At the same time, the strategy incorporates two auxiliary rules: fast RSI and candle color. When fast RSI is below 25%, it indicates oversold status and prices may rebound. Together with a breakout above the channel, this produces a stronger long signal. In contrast, when fast RSI is above 75%, it indicates overbought status and prices may fall. Together with a breakdown below the channel, this produces a stronger short signal. Additionally, the strategy keeps track of candle color changes over the latest two candles. Two consecutive red candles enhance the short signal, while two consecutive green candles enhance the long signal.

By combining these three signal indicators, the strategy can effectively identify mid-to-long term trends and establish positions accordingly. When the position direction conflicts with the color of the latest candle, it is considered a trend reversal, upon which existing positions are closed.

## Advantages

The biggest advantage of this strategy is incorporating multiple indicators to determine trend direction and avoid noise from short-term market fluctuations. Specifically:

1. The price channel clearly identifies trend direction and strength. Breakouts of the channel bands represent a new stage of the trend with strong signals.

2. The fast RSI judges overbought/oversold conditions to avoid chasing trends at turning points. It suggests buying on oversold and selling on overbought status.

3. Candle color validation further verifies trend persistence. Position is closed if color changes. 

4. The strategy only enters on two consecutive same-colored candles breaking the channel, avoiding false signals from short-term oscillations.

5. The simple average stop loss closes positions once candle color changes, minimizing losses effectively.

## Risks

There are also some risks to note for this strategy:

1. Improper price channel parameter settings may result in channels that are too wide or too narrow, missing trend change points or generating excessive false signals.

2. Improper fast RSI parameter settings may fail to accurately identify overbought/oversold conditions, thus missing reversal opportunities.

3. The simple stop loss mechanism may be too sensitive in choppy trends, causing excessive position opening and closing. 

4. It cannot predict the actual trend continuation after breaking the price channel, leading to amplified losses.

5. It cannot adapt to black swan events with sudden market impacts, resulting in huge losses.

## Enhancement Opportunities 

Some major opportunities to enhance the strategy include:

1. Dynamically adjust price channel parameters to better adapt to volatility across different periods and markets.

2. Incorporate volatility measures to adjust RSI parameters, lowering sensitivity during high volatility and increasing sensitivity during low volatility.

3. Add trailing stop mechanisms with stop levels based on trend volatility to avoid over-sensitive stop outs.

4. Improve identification of breakout strength and bearish/bullish divergences to avoid false breakouts.

5. Incorporate historical data training models to assist in estimating high-probability trend turning points and improve entry accuracy. 

6. Optimize position sizing models to dynamically adjust allocations based on risk conditions.

## Conclusion

Overall, Noro's Price Channel Strategy v1.1 is a simple and practical trend following strategy. It incorporates multiple indicators to identify mid-to-long term trend directions and establishes relatively prudent entry rules. There is room for further enhancement in areas like stop loss mechanisms and dynamic parameter tuning. But the overall logic is simple and clear, making it easy to implement for quantitative trading, especially for beginners. With parameter tuning and mechanism optimization, it can become a stable and reliable trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|true|Use color strategy|
|v_input_4|true|Use RSI strategy|
|v_input_5|true|leverage|
|v_input_6|30|Price Channel|
|v_input_7|true|Show center-line|
|v_input_8|1900|From Year|
|v_input_9|2100|To Year|
|v_input_10|true|From Month|
|v_input_11|12|To Month|
|v_input_12|true|From day|
|v_input_13|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-23 00:00:00
end: 2023-10-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's Price Channel Strategy v1.1", shorttitle = "Price Channel str 1.1", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
usecol = input(true, defval = true, title = "Use color strategy")
usersi = input(true, defval = true, title = "Use RSI strategy")
lev = input(1, defval = 1, minval = 1, maxval = 100, title = "leverage")
pch = input(30, defval = 30, minval = 2, maxval = 200, title = "Price Channel")
showcl = input(true, defval = true, title = "Show center-line")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")
src = close

//Price channel
lasthigh = highest(src, pch)
lastlow = lowest(src, pch)
center = (lasthigh + lastlow) / 2
trend = low > center ? 1 : high < center ? -1 : trend[1]
col = showcl ? blue : na
plot(center, color = col, linewidth = 2)

//Bars
bar = close > open ? 1 : close < open ? -1 : 0
rbars = sma(bar, 2) == -1
gbars = sma(bar, 2) == 1

//Fast RSI
fastup = rma(max(change(src), 0), 2)
fastdown = rma(-min(change(src), 0), 2)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//Signals
body = abs(close - open)
abody = sma(body, 10)
up1 = rbars and close > center and usecol
dn1 = gbars and close < center and usecol
up2 = fastrsi < 25 and close > center and usersi
dn2 = fastrsi > 75 and close < center and usersi
exit = (((strategy.position_size > 0 and close > open) or (strategy.position_size < 0 and close < open)) and body > abody / 2)
lot = strategy.equity / close * lev

//Trading
if up1 or up2
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if dn1 or dn2
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if time > timestamp(toyear, tomonth, today, 23, 59) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/430009

> Last Modified

2023-10-24 10:59:38
