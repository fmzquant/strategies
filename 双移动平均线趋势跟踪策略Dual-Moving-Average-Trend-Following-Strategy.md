
> Name

双移动平均线趋势跟踪策略Dual-Moving-Average-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略利用快速移动平均线和慢速移动平均线的组合来判断趋势方向,快线突破慢线时产生交易信号,属于双移动平均线交易系统。

## 原理

该策略使用长度较短的快速移动平均线和长度较长的慢速移动平均线。

慢速MA用于判断主趋势方向。当价格位于MA上方时,判断为上升趋势;价格位于MA下方时,判断为下降趋势。

在上升趋势中,如果快速MA上穿慢速MA,产生买入信号;在下降趋势中,如果快速MA下穿慢速MA,产生卖出信号。

交易信号产生后,可选择是否设置止损位继续跟踪止损。

## 优势

1. 快慢MA组合可有效识别趋势。

2. 快MA可产生较为灵敏的交易信号。

3. 慢MA滤除市场噪音,防止假突破。

4. 可选择多种MA算法,如EMA、DEMA等。

5. 可启用止损策略跟踪止损。

## 风险及解决方法

1. MA存在滞后问题,可能导致信号滞后。可测试更灵敏参数。

2. 停损点可能过于接近,被突破造成损失。应适当留出波动空间。

3. 未考虑交易量,存在价格被操纵的风险。可添加交易量确认。

4. 仅基于指标易产生假信号。可加入其它因素进行确认。

5. 参数优化困难。可使用步进优化或遗传算法寻找最优参数。

## 优化思路

1. 测试不同MA算法参数,寻找最优参数。

2. 研究自适应移动平均线以提高敏感度。

3. 加入其它指标或因素进行信号过滤优化。

4. 建立动态止损机制,使止损更灵活。

5. 优化资金管理策略,如根据ATR动态调整仓位。

## 总结

该策略运用双MA交叉判断趋势产生交易信号,可设置止损 limiting risk。其交易逻辑简单清晰,但存在参数选择困难等问题。可通过参数优化、指标过滤、止损策略等进行改进,使策略更稳健可靠。

||

## Overview 

This strategy uses fast and slow moving averages to identify trend direction and generate signals when fast MA crosses slow MA, creating a dual MA system.

## Principles

The strategy employs a shorter fast MA and a longer slow MA. 

The slow MA defines the main trend direction. Price above MA is uptrend, price below is downtrend.

In uptrends, long signal is generated when fast MA crosses above slow MA. In downtrends, short signal when fast MA crosses below slow MA.

After signal, trailing stop can be optionally enabled.

## Advantages

1. Fast and slow MA combo effectively identifies trend.

2. Fast MA produces sensitive trading signals. 

3. Slow MA filters noise preventing false breakout.

4. Various MA types like EMA, DEMA can be used.

5. Trailing stop loss can be enabled.

## Risks and Mitigations

1. MA lag may delay signals. More sensitive parameters can be tested.

2. Stop loss may be too tight leading to premature exit. Should allow wiggle room.

3. Volume is ignored, risk of price manipulation exists. Can add volume confirmation.

4. Indicator-only prone to false signals. Additional confirmation required.

5. Parameter optimization difficult. Stepwise optimization or GA can find optimal parameters.

## Enhancement Opportunities

1. Test different MA types and parameters for best results.

2. Research adaptive moving averages for better sensitivity. 

3. Add other indicators or factors for signal filtering.

4. Build dynamic stops for flexible stops.

5. Optimize money management like dynamic position sizing with ATR. 

## Summary

The strategy trades dual MA crossovers to identify trends, with stops limiting risk. The logic is simple and clear but parameter selection and other issues exist. Enhancements through optimization, filtering, stops can improve robustness. It serves as a reasonable baseline trend following system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|long|
|v_input_2|true|short|
|v_input_3|false|stops|
|v_input_4|5|Stop, %|
|v_input_5|7|Type of Slow MA|
|v_input_6_close|0|Source of Slow MA: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|true|Use fast MA Filter|
|v_input_8|5|fast MA Period|
|v_input_9|20|slow MA Period|
|v_input_10|2|Bars Q|
|v_input_11|false|Need trend Background?|
|v_input_12|false|Need entry arrows?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title = "Noro's Trend MAs Strategy v1.7", shorttitle = "Trend MAs str 1.7", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, "long")
needshort = input(true, "short")
needstops = input(false, "stops")
stoppercent = input(5, defval = 5, minval = 1, maxval = 50, title = "Stop, %")
type = input(7, defval = 7, minval = 1, maxval = 7, title = "Type of Slow MA")
src = input(close, defval = close, title = "Source of Slow MA")
usefastsma = input(true, "Use fast MA Filter")
fastlen = input(5, defval = 5, minval = 1, maxval = 50, title = "fast MA Period")
len = input(20, defval = 20, minval = 2, maxval = 200, title = "slow MA Period")
bars = input(2, defval = 2, minval = 0, maxval = 3, title = "Bars Q")
needbg = input(false, defval = false, title = "Need trend Background?")
needarr = input(false, defval = false, title = "Need entry arrows?")

fastsma = ema(src, fastlen)

//DEMA
dema = 2 * ema(src, len) - ema(ema(close, len), len)

//TEMA
xPrice = close
xEMA1 = ema(src, len)
xEMA2 = ema(xEMA1, len)
xEMA3 = ema(xEMA2, len)
tema = 3 * xEMA1 - 3 * xEMA2 + xEMA3

//KAMA
xvnoise = abs(src - src[1])
nfastend = 0.20
nslowend = 0.05
nsignal = abs(src - src[len])
nnoise = sum(xvnoise, len)
nefratio = iff(nnoise != 0, nsignal / nnoise, 0)
nsmooth = pow(nefratio * (nfastend - nslowend) + nslowend, 2) 
kama = nz(kama[1]) + nsmooth * (src - nz(kama[1]))

//PriceChannel
lasthigh = highest(src, len)
lastlow = lowest(src, len)
center = (lasthigh + lastlow) / 2

//Trend
ma = type == 1 ? sma(src, len) : type == 2 ? ema(src, len) : type == 3 ? vwma(src, len) : type == 4 ? dema : type == 5 ? tema : type == 6 ? kama : type == 7 ? center : 0
trend = low > ma and low[1] > ma[1] and low[2] > ma[2] ? 1 : high < ma and high[1] < ma[1] ? -1 : trend[1]

//Bars
bar = close > open ? 1 : close < open ? -1 : 0
redbars = bars == 0 ? 1 : bars == 1 and bar == -1 ? 1 : bars == 2 and bar == -1 and bar[1] == -1 ? 1 : bars == 3 and bar == -1 and bar[1] == -1 and bar[2] == -1 ? 1 : 0
greenbars = bars == 0 ? 1 : bars == 1 and bar == 1 ? 1 : bars == 2 and bar == 1 and bar[1] == 1 ? 1 : bars == 3 and bar == 1 and bar[1] == 1 and bar[2] == 1 ? 1 : 0

//Signals
min = min(open, close)
max = max(open, close)
up = trend == 1 and (low < fastsma or usefastsma == false) and redbars == 1 ? 1 : 0
dn = trend == -1 and (high > fastsma or usefastsma == false) and greenbars == 1 ? 1 : 0

//Lines
colorfastsma = usefastsma == true ? red : na
plot(fastsma, color = colorfastsma, title = "Fast MA")
plot(ma, color = blue, linewidth = 3, transp = 0, title = "Slow MA")

//Arrows
plotarrow(up == 1 and needarr == true ? 1 : 0, colorup = black, colordown = black, transp = 0)
plotarrow(dn == 1 and needarr == true ? -1 : 0, colorup = black, colordown = black, transp = 0)

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 90)

//Alerts
alertcondition(up == 1, title='buy', message='Uptrend')
alertcondition(dn == 1, title='sell', message='Downtrend')

//Trading
stoplong = up == 1 and needstops == true ? close - (close / 100 * stoppercent) : stoplong[1]
stopshort = dn == 1 and needstops == true ? close + (close / 100 * stoppercent) : stopshort[1]

longCondition = up == 1
if (longCondition)
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)
    strategy.exit("Stop Long", "Long", stop = stoplong)

shortCondition = dn == 1
if (shortCondition)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
    strategy.exit("Stop Short", "Short", stop = stopshort)
```

> Detail

https://www.fmz.com/strategy/427189

> Last Modified

2023-09-18 21:57:00
