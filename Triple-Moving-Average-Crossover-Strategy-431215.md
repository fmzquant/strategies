
> Name

Triple-Moving-Average-Crossover-Strategy-431215

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b1ae79ba4e7a089fdb.png)

### Overview

The triple moving average crossover strategy uses the crossover of moving averages over different time periods as trading signals, belonging to trend-following strategies. It uses three moving averages, including short-term, medium-term, and long-term moving averages, to generate trading signals based on their crossovers.

### Strategy Logic

Firstly, the strategy calculates the short-term (default 7 days), medium-term (default 25 days), and long-term (default 99 days) moving averages. Then it generates trading signals according to the following rules:

1. When the short-term MA crosses above the medium-term MA, a buy signal is generated.

2. When the short-term MA crosses below the medium-term MA, a sell signal is generated.

3. When the short-term MA crosses above the long-term MA, a fast buy signal is generated. 

4. When the short-term MA crosses below the long-term MA, a fast sell signal is generated.

The strategy believes that the short-term MA crossing above the medium-term MA indicates an uptrend, so a buy signal is generated. And the short-term MA crossing below the medium-term MA indicates a downtrend, so a sell signal is generated. Similarly, the crossover between the short-term MA and long-term MA also generates fast trading signals to capture longer-term trend changes.

### Advantage Analysis 

- The strategy logic is simple and easy to understand and implement.

- Using multi-timeframe analysis can effectively capture changes in market trends.

- The parameters can be optimized by adjusting the MA periods. 

- The visual crossover signals intuitively reflect trend changes.

### Risk Analysis

- MAs have lagging issues and may miss trend reversal points.

- Too many false signals when the short-term MA crosses above the long-term MA in bull markets.

- Too many false signals when the short-term MA crosses below the long-term MA in bear markets.

- Fast trading signals may be too sensitive, increasing trading frequency and commissions.

Proper adjustments of MA periods or adding filter conditions can help optimize and reduce false signals. Shortening fast trading periods may also lower trading frequency.

### Optimization Directions 

- Add filter conditions, such as generating signals only when meeting certain trading volumes or price change percentages.

- Combine with other indicators like MACD, KDJ to avoid erroneous trades when no clear trend.

- Optimize MA period combinations to reduce false signals.

- Distinguish bull and bear markets, optimize buy and sell parameters separately. 

- Consider trading costs, adjust fast trading parameters to control frequency.

### Summary

The triple MA crossover strategy is relatively simple, judging the trend direction through crossover of different timeframe MAs to generate trading signals. It is easy to implement with flexible parameter adjustments to capture trend changes. But it also has the issues of MA lagging and excessive false signals. Methods like adding filters and optimizing parameter combinations can improve the strategy. It suits traders interested in trend crossovers for optimization and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|7|Kısa Vade - Gün|
|v_input_2|25|Orta Vade - Gün|
|v_input_3|99|Uzun Vade - Gün|
|v_input_4|2020|Backtest Başlangıç Tarihi|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-06 00:00:00
end: 2023-11-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © dadashkadir

//@version=4
strategy("Üç Hareketli Ortalama Str.", overlay=true, initial_capital=10000, commission_value=0.047, default_qty_type=strategy.percent_of_equity, default_qty_value=100, pyramiding=0, calc_on_order_fills=true)

kisa = input(title = "Kısa Vade - Gün", defval = 7,  minval = 1)
orta = input(title = "Orta Vade - Gün", defval = 25, minval = 1)
uzun = input(title = "Uzun Vade - Gün", defval = 99, minval = 1)

sma7  = sma(close, kisa)
sma25 = sma(close, orta)
sma99  = sma(close, uzun)

alTrend  = plot (sma7, color=#2323F1, linewidth=2, title="Har.Ort. Kısa Vade", transp=0)
satTrend = plot (sma25, color=#FF0C00, linewidth=3, title="Har.Ort. Orta Vade", transp=0)
ort99    = plot (sma99, color=#DFB001, linewidth=3, title="Har.Ort. Uzun Vade", transp=0)

zamanaralik = input (2020, title="Backtest Başlangıç Tarihi")

al  = crossover (sma7, sma25) and zamanaralik <= year
sat = crossover (sma25, sma7) and zamanaralik <= year

hizlial = crossover (sma7, sma99) and zamanaralik <= year
hizlisat = crossover (sma99, sma7) and zamanaralik <= year

alkosul  = sma7 >= sma25
satkosul = sma25 >= sma7

hizlialkosul  = sma7 >= sma99
hizlisatkosul = sma99 >= sma7

plotshape(al,  title = "Buy",  text = 'Al',  style = shape.labelup,   location = location.belowbar, color= color.green, textcolor = color.white, transp = 0, size = size.tiny)
plotshape(sat, title = "Sell", text = 'Sat', style = shape.labeldown, location = location.abovebar, color= color.red,   textcolor = color.white, transp = 0, size = size.tiny)

plotshape(hizlial,  title = "Hızlı Al",  text = 'Hızlı Al',  style = shape.labelup,   location = location.belowbar, color= color.blue, textcolor = color.white, transp = 0, size = size.tiny)
plotshape(hizlisat, title = "Hızlı Sat", text = 'Hızlı Sat', style = shape.labeldown, location = location.abovebar, color= #6106D6 , textcolor = color.white, transp = 0, size = size.tiny)

fill (alTrend, satTrend, color = sma7 >= sma25? #4DFF00 : #FF0C00, transp=80, title="Al-Sat Aralığı")
//fill (ort99, satTrend, color = sma7 >= sma25? #6106D6 : color.blue, transp=80, title="Hızlı Al-Sat Aralığı")

if (al)
    strategy.entry("LONG", strategy.long)
if (sat)
    strategy.entry("SHORT", strategy.short)
//if (hizlial)
//    strategy.entry("My Short Entry Id", strategy.long)
//if (hizlisat)
//    strategy.entry("My Short Entry Id", strategy.short)    
```

> Detail

https://www.fmz.com/strategy/431215

> Last Modified

2023-11-06 09:48:33
