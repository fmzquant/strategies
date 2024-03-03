
> Name

双色K线追踪策略Dual-Color-K-line-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概要

本策略通过观察K线的颜色变化,判断行情趋势,并据此建立做多做空仓位。策略原理简单直接,旨在捕捉短线趋势。

## 原理

该策略根据K线的收盘价与开盘价的关系判断K线颜色,收盘价大于开盘价为红色K线,收盘价小于开盘价为绿色K线。

当出现指定数量(可设置)的连续同色K线时,做相应操作:

- 如果是红色,则做多;

- 如果是绿色,则做空。

当K线颜色发生变化时,平仓离场。

## 优势

- 原理清晰简单,容易理解实现。

- 可追踪较短的趋势,实现频繁交易。

- 可自定义K线数量,调整策略灵敏度。

- 可仅做多或仅做空,降低交易频率。 

- 可设定交易时间段,避开需要规避的时间段。

## 风险

- 无法判断趋势方向,存在被套利的风险。

- 无法确定入场时机优劣,存在过早入场或失去机会的风险。

- 存在反转风险,K线颜色改变不一定代表实质趋势改变。

- 追随短线容易过度交易,存在交易费率压力。

- 参数设置不当可能导致策略效果不佳。

## 优化方向

- 可考虑加入趋势判断指标,避免反向入场。如MACD,KD等。

- 可设置追踪止损,降低亏损风险。

- 可适当放宽出场条件,避免过频繁离场。

- 可结合其他因素优化入场时机。如交易量放大,突破前期高点等。

- 可设置订单类型为市价单,减少滑点影响。

## 总结

本策略源于最简单的K线技术分析,通过判断K线颜色实现最基本的趋势追踪。优点是简单易懂,交易频繁,可灵活调整参数。但也存在一定的盲目性,无法判断趋势优劣。可通过加入趋势判断指标等方式进行优化,在保持简单前提下提高策略效果。

|| 

## Summary 

This strategy observes the change of K-line colors to determine the market trend and establish long and short positions accordingly. The strategy principle is simple and straightforward, aiming to capture short-term trends.

## Principle

The strategy judges the color of K-lines based on the relationship between closing price and opening price. Closing price greater than opening price is a red K-line, and vice versa is a green K-line.

When there are specified consecutive K-lines of the same color ( adjustable), take actions accordingly:

- If red, go long.

- If green, go short.  

When the K-line color changes, close all positions.

## Advantages

- The principle is clear and simple, easy to understand and implement.

- Can track relatively short-term trends and trade frequently. 

- The number of K-lines is customizable to adjust strategy sensitivity.

- Can go long or short only to reduce trading frequency.

- Trading time frame can be set to avoid certain periods.

## Risks

- Unable to determine trend direction, risk of being whipsawed.

- Unable to determine optimal entry timing, risks of premature entry or missing opportunities.

- Risks of reversal as color changes do not necessarily represent real trend changes.

- Chasing short-term may lead to excessive trading and commission pressure. 

- Inappropriate parameter settings may lead to poor strategy performance.

## Optimization

- Consider adding trend judgment indicators to avoid reverse entry, e.g. MACD, KD.

- Set up trailing stop loss to reduce loss risk.

- Relax exit criteria appropriately to avoid over-frequent exits.

- Combine other factors to optimize entry timing, e.g. surging volume, breaking previous high.

- Use market orders to reduce slippage impact.

## Conclusion

This strategy originates from the simplest K-line technical analysis, achieving basic trend tracking by judging K-line colors. The advantages are simplicity, high trading frequency, and flexible parameter adjustment. But it also has some blindness, unable to determine the quality of the trend. It can be improved by adding trend judgment indicators while keeping it simple, thereby enhancing strategy performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|2|Bars Q|
|v_input_4|2018|From Year|
|v_input_5|2018|To Year|
|v_input_6|true|From Month|
|v_input_7|12|To Month|
|v_input_8|true|From Day|
|v_input_9|31|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-10-10 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//2018
//Noro

//@version=2
strategy("Noro's Candles Strategy v1.0", shorttitle = "Candles str 1.0", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100.0, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
bq = input(2, defval = 2, minval = 2, maxval = 6, title = "Bars Q")

fromyear = input(2018, defval = 2018, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2018, defval = 2018, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From Day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To Day")

//Bars Q
bar = close > open ? 1 : close < open ? -1 : 0
gb = bar == 1
rb = bar == -1
redbars = bq == 2 and rb and rb[1] ? 1 : bq == 3 and rb and rb[1] and rb[2] ? 1 : bq == 4 and rb and rb[1] and rb[2] and rb[3] ? 1 : bq == 5 and rb[1] and rb[2] and rb[3] and rb[4] ? 1 : bq == 6 and rb[1] and rb[2] and rb[3] and rb[4] and rb[5] ? 1 : 0
greenbars = bq == 2 and gb and gb[1] ? 1 : bq == 3 and gb and gb[1] and gb[2] ? 1 : bq == 4 and gb and gb[1] and gb[2] and gb[3] ? 1 : bq == 5 and gb[1] and gb[2] and gb[3] and gb[4] ? 1 : bq == 6 and gb[1] and gb[2] and gb[3] and gb[4] and gb[5] ? 1 : 0

//Signals
up1 = redbars == 1
dn1 = greenbars == 1
exit = bar != bar[1]

if up1
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)

if dn1
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
    
if time > timestamp(toyear, tomonth, today, 00, 00) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/428970

> Last Modified

2023-10-11 14:53:41
