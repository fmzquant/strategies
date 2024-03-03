
> Name

趋势交叉交易策略Trend-Bull-Bear-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]
# 

## 概述

该策略运用移动平均线的交叉原理,通过快线和慢线的交叉来判断趋势方向,以发出买入和卖出信号。策略简单可靠,适合追求稳定收益的投资者。

## 原理

该策略使用两个移动平均线,分别是7日均线作为快线,5月均线作为慢线。快线能较快地捕捉价格变动,慢线滤除噪音,判断趋势方向。当快线从下方向上突破慢线时,视为牛市信号,做多;当快线从上方向下跌破慢线时,视为熊市信号,做空。

具体来说,策略通过计算7日简单移动平均线和5月简单移动平均线,并绘制在价图上。当7日线从下方截断5月线向上突破时,产生买入信号;当7日线从上方向下跌破5月线时,产生卖出信号。策略还对信号产生的时段进行可视化标记。

## 优势

该策略具有以下优势:

1. 理论依据简单可靠,基于广为人知的移动平均线交叉原理。

2. 仅使用两条移动平均线,参数选择简单,容易实施。

3. 快线和慢线配合使用,能有效识别趋势,过滤市场噪音。

4. 采用不同周期均线,能够捕捉不同时间尺度上的趋势变化。

5. 实现简单,代码容易理解,逻辑清晰。

6. 可视化信号提示清楚直观,操作决策比较明确。

## 风险

该策略也存在一些风险:

1. 仅基于均线交叉操作,容易产生错触发信号。

2. 无法有效判断趋势强弱,可能在震荡行情中止损频繁。

3. 固定均线周期无法适应市场变化,需优化参数。

4. 无法判断买卖点位,存在一定的随市操作风险。

5. 较简单理论依据,效果可能打折扣,盈利空间有限。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 增加其他指标配合确定买卖点位,例如KDJ指标判断超买超卖。

2. 添加止损机制,如追踪止损,避免亏损扩大。

3. 优化均线周期参数,使其能适应不同行情周期。

4. 增加成交量过滤,避免虚假突破。 

5. 评估趋势强弱,如计算均线斜率,不同力度操作。

6. 结合更多时间周期分析,判断趋势持续性。

## 总结

该策略基于移动平均线交叉原理,简单可靠地识别牛熊趋势。优点是简单易操作,缺点是存在一定盲目随趋势的风险。通过参数优化、增加辅助指标等方法可以提高策略效果。投资者可以根据自己的风险偏好选择使用。

|| 

## Overview

This strategy uses the moving average crossover principle to determine the trend direction and generate buy and sell signals. It is simple and reliable, suitable for investors seeking steady returns.  

## Principle 

The strategy employs two moving averages, a 7-day MA as the fast line and a 5-month MA as the slow line. The fast line captures price changes swiftly while the slow line filters out noise and determines the trend direction. When the fast line breaks above the slow line from below, it is considered a bullish signal to go long. When the fast line breaks down the slow line from above, it is regarded as a bearish signal to go short.

Specifically, the strategy calculates the 7-day simple moving average (SMA) and 5-month SMA, plotting them on the price chart. When the 7-day line crosses above the 5-month line from below, a buy signal is generated. When the 7-day line crosses below the 5-month line from above, a sell signal is triggered. The strategy also visualizes the signal periods.

## Advantages

The strategy has the following advantages:

1. Simple and reliable theoretical basis, based on the widely known moving average crossover principle.

2. Only two moving averages are used, with simple parameter selection and easy implementation.

3. The fast and slow lines work together effectively to identify trends and filter out market noise. 

4. Different timeframes are captured through different period MAs, detecting trend changes on multiple scales.

5. Simple implementation with clear, easy-to-understand logic. 

6. Visualized signals are clear and intuitive for deciding trades.

## Risks

There are also some risks:

1. Prone to false signals relying solely on MA crosses. 

2. Unable to judge trend strength effectively, causing frequent stop loss in ranging markets.

3. Fixed MA periods cannot adapt to market changes, requiring parameter optimization. 

4. Entry and exit levels unclear, with some whipsaw risks.

5. Simplistic theoretical basis may compromise performance and profit potential.

## Enhancement

The strategy can be improved in the following aspects:

1. Add other indicators to determine entry and exit levels, such as KDJ for overbought/oversold. 

2. Implement stop loss mechanisms like trailing stop to limit losses.

3. Optimize MA periods to adapt to different market cycles.

4. Add volume filter to avoid false breakouts.

5. Evaluate trend strength, e.g. MA slope, to scale position size. 

6. Incorporate multiple timeframes for better trend continuity.

## Conclusion

The strategy identifies bull/bear trends simply and reliably based on MA crossover theory. The pros are simplicity and ease of use, while the cons are inherent trend-following risks. Fine-tuning parameters, adding auxiliary indicators etc. can improve strategy performance. Investors can choose to use it based on their risk appetite.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Kaynak: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|0|Hareketli Ortlama Tipi: SMA|EMA|WMA|
|v_input_3|7|Günlük Bar Sayısı|
|v_input_4|5|Aylık Bar Sayısı|
|v_input_5|2020|Backtest Başlangıç Tarihi|
|v_input_6|true|Str. Başlama Tarihi Gün|
|v_input_7|true|Str. Başlama Tarihi Ay|
|v_input_8|2015|Str. Başlama Tarihi Yıl|
|v_input_9|true|Str. Bitiş Tarihi Gün|
|v_input_10|true|Str. Bitiş Tarihi Ay|
|v_input_11|9999|Str. Bitiş Tarihi Yıl|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-30 00:00:00
end: 2023-10-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © dadashkadir

//@version=4
strategy("Mount MaV - Day MaV CrossOver Strgty", shorttitle="Yusram Str.", overlay=true)
src = input(title= "Kaynak", type=input.source, defval=close)
mav = input(title="Hareketli Ortlama Tipi", defval="SMA", options=["SMA", "EMA", "WMA"])
Gbar = input(title="Günlük Bar Sayısı", defval=7, minval=1, maxval=999)
Abar = input(title="Aylık Bar Sayısı", defval=5, minval=1, maxval=999)
//displacement = input(20, minval=1, title="Displacement")
getMA(src, length) =>
    ma = 0.0
    if mav == "SMA"
        ma := sma(src, length)
        ma

    if mav == "EMA"
        ma := ema(src, length)
        ma

    if mav == "WMA"
        ma := wma(src, length)
        ma
    ma
long = "M" //Aylık
ln = security(syminfo.ticker, long, src)
lnma = getMA(ln, Abar)
gnma = getMA(src, Gbar)
col1= gnma>gnma[1]
col3= gnma<gnma[1]
colorM = col1 ? color.green : col3 ? color.navy : color.yellow
l1 = plot(lnma, title="MhO", trackprice = true, style=plot.style_line, color=color.red, linewidth=3)
l2 = plot(gnma, title="DhO", trackprice = true, style=plot.style_line, color=colorM, linewidth=3)
fill(l1, l2, color = lnma < gnma ? color.green : color.red, title="Gölgelendirme", transp=90)
zamanaralik = input (2020, title="Backtest Başlangıç Tarihi")
al  = crossover (gnma, lnma) and zamanaralik <= year
sat = crossover (lnma, gnma) and zamanaralik <= year
plotshape(al,  title = "Giriş",  text = 'Al',  style = shape.labelup,   location = location.belowbar, color= color.green, textcolor = color.white, transp = 0, size = size.tiny)
plotshape(sat, title = "Çıkış", text = 'Sat', style = shape.labeldown, location = location.abovebar, color= color.red,   textcolor = color.white, transp = 0, size = size.tiny)

FromDay    = input(defval = 1, title = "Str. Başlama Tarihi Gün", minval = 1, maxval = 31)
FromMonth  = input(defval = 1, title = "Str. Başlama Tarihi Ay", minval = 1, maxval = 12)
FromYear   = input(defval = 2015, title = "Str. Başlama Tarihi Yıl", minval = 2005)
ToDay      = input(defval = 1, title = "Str. Bitiş Tarihi Gün", minval = 1, maxval = 31)
ToMonth    = input(defval = 1, title = "Str. Bitiş Tarihi Ay", minval = 1, maxval = 12)
ToYear     = input(defval = 9999, title = "Str. Bitiş Tarihi Yıl", minval = 2006)
Start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)
Finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)
Timerange() =>
    time >= Start and time <= Finish ? true : false
if al
    strategy.entry("Al", strategy.long, when=Timerange())
if sat
    strategy.entry("Sat", strategy.short, when=Timerange())

```

> Detail

https://www.fmz.com/strategy/428575

> Last Modified

2023-10-07 09:56:30
