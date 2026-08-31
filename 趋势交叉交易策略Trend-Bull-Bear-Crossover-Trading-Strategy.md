
> Name

趋势交叉交易策略Trend-Bull-Bear-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


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
