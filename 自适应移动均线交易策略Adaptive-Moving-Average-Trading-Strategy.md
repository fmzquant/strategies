
> Name

自适应移动均线交易策略Adaptive-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1159a773149e732e153.png)
[trans]
## 概述

本策略是一种基于自适应移动均线的趋势跟踪策略。它使用两个不同周期的DEMA移动均线进行买卖信号生成。策略会根据不同的周期自动适应分析粒度,实现多时间框架的跟踪。

## 策略原理

策略使用DEMA快线和DEMA慢线构建交易信号。快线周期为tf,慢线周期为tf*2。当快线上穿慢线时产生买入信号;当快线下穿慢线时产生卖出信号。这样可以跟踪中长线趋势。另外,策略还使用Hull双移动均线过滤器来减少噪音交易。仅在Hull过滤器同方向时才会发出交易信号。

## 优势分析

该策略最大的优势是可以自适应不同的周期。它会根据不周期自动选择分析粒度,从日线到周线都可以使用。这让策略适用于多种市场环境。另外,双均线结构可以有效跟踪趋势,双线过滤增加了信号质量。所以,该策略非常适合跟踪中长线趋势。

## 风险分析 

该策略主要风险来自于趋势反转。当市场从牛市进入熊市时,快线和慢线可能出现剧烈的向下交叉,导致巨额浮亏。此外,双线过滤器也可能滤除掉部分赚钱机会。如果过滤器方向与价格反向,那些本该获利的信号也会被跳过。所以,该策略主要针对稳定的中长线趋势市场。

## 优化方向

可以通过调整过滤器参数或使用其他指标替换来优化策略。例如,可以测试MACD取代HullMA,或调整HullMA的周期参数。也可以测试不同的参数组合来寻找更匹配的交易规则。此外,还可以结合波动率指标来控制仓位规模。当市场波动加大时,可以适当缩小仓位。

## 总结

该策略整体来说是一个非常实用的自适应趋势跟踪策略。它可以自动调整分析周期,适合不同时间段的交易。双均线结构可以稳定跟踪趋势,过滤器也提高了信号质量。总的来说,适合追求稳定中长线收益的投资者。

||

## Overview

This strategy is a trend-following strategy based on adaptive moving averages. It uses two DEMA moving averages with different periods to generate trading signals. The strategy will automatically adapt the timeframe for analysis based on the current period, allowing multi-timeframe tracking.  

## Strategy Logic

The strategy uses a fast DEMA line and a slow DEMA line to construct trading signals. The fast line has a period of tf and the slow line has a period of tf*2. A buy signal is generated when the fast line crosses above the slow line. A sell signal is generated when the fast line crosses below the slow line. This allows the strategy to track mid-to-long term trends. In addition, the strategy also uses a Hull double moving average filter to reduce noisy trades. Signals are only generated when the Hull filter agrees on directionality.

## Advantage Analysis

The biggest advantage of this strategy is that it can adapt to different periods automatically. It will choose the analysis timeframe from daily to weekly based on the current period. This makes the strategy suitable for a variety of market environments. In addition, the dual moving average structure can track trends effectively, and the dual filter increases signal quality. As a result, this strategy is very suitable for tracking mid-to-long term trends.  

## Risk Analysis

The main risk of this strategy comes from trend reversals. When the market transitions from a bull market to a bear market, the fast and slow lines may cross sharply downward, resulting in huge floating losses. In addition, the line filter may also miss out on some profitable opportunities. If the filter disagrees with the price directionality, those otherwise profitable signals will be skipped. As a result, this strategy mainly targets stable mid-to-long term trending markets.

## Optimization Directions 

The strategy can be optimized by adjusting the filter parameters or using other indicators as replacements. For example, MACD can be tested instead of HullMA, or the HullMA period parameters can be adjusted. Different parameter combinations can also be tested to find better fitted trading rules. In addition, volatility indicators can also be incorporated to control position sizing. Smaller positions can be taken when market volatility rises.  

## Conclusion

In conclusion, this is a very practical adaptive trend following strategy. It can automatically adjust the analysis timeframe for different periods and is suitable for trading across different time horizons. The dual moving average structure can steadily track trends, and the filter also improves signal quality. Overall, it is suitable for investors looking for steady mid-to-long term returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Delay Open/Close MA (Forces Non-Repainting)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-24 23:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2

//
//---------------------------------------------
//* Author - PPSingnal
//* http://ppsignal.com
//---------------------------------------------
//
//

strategy (title="PPSignal V4 (Auto Adaptive Times)", shorttitle="PPSignal V4", overlay=true)
delayOffset = input(defval = 0, title = "Delay Open/Close MA (Forces Non-Repainting)", minval = 0, step = 1)

//----------------------------------------    INICIO PPI     ----------------------------------------

// - PARÁMETROS DE ENTRADA
// SE DEFINE LA RESOLUCIÓN
useRes1 = true
setRes1 = true


tf = timeframe.period == "60" ? 4 : timeframe.period == "240" ? 4 : timeframe.period == "D" ? 4 : timeframe.period == "W" ?4 : 4


// PRIMER DEMA
type   = "DEMA"
src   = close
len    = tf
off   = 0
lsma   = 0
// SEGUNDA DEMA
type2   = "DEMA"
src2    = open
len2    = tf
off2    = 0
lsma2   = 0

// - INPUTS END

//----------------------------------------    INICIO FUNCIONES     ----------------------------------------

// RETORNA UNA MEDIA MOVIL (TYPE=TIPO / SRC = TIPO DE PRECIO / LEN=LONGITUD / LSMA=0)
variant(type, src, len, lsma) =>
    v1 = sma(src, len)                                                  // Simple
    v2 = ema(src, len)                                                  // Exponential
    v3 = wma(src, len)                                                  // Weighted
    v4 = vwma(src, len)                                                 // Volume Weighted
    v5 = na(v5[1]) ? sma(src, len) : (v5[1] * (len - 1) + src) / len    // Smoothed
    v6 = 2 * v2 - ema(v2, len)                                          // Double Exponential
    v7 = 3 * (v2 - ema(v2, len)) + ema(ema(v2, len), len)               // Triple Exponential
    v8 = wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len)))   // Hull
    v9 = linreg(src, len, lsma)                                         // Least Squares
    // return variant, defaults to SMA if input invalid.
    type=="EMA"?v2 : type=="WMA"?v3 : type=="VWMA"?v4 : type=="SMMA"?v5 : type=="DEMA"?v6 : type=="TEMA"?v7 : type=="HullMA"?v8 : type=="LSMA"?v9 : v1

// SuperSmoother filter
    // © 2013  John F. Ehlers
    a1 = exp(-1.414*3.14159 / len)
    b1 = 2*a1*cos(1.414*3.14159 / len)
    c2 = b1
    c3 = (-a1)*a1
    c1 = 1 - c2 - c3
    v12 = 0.0
    v12 := c1*(src + nz(src[1])) / 2 + c2*nz(v12[1]) + c3*nz(v12[2])
   

// RETORNA LA RESOLUCIÓN SETEADA Y SINO LA DEFAULT
// 3H:      1min - 3min - 5min - 15min
// DIARIO:  30 - 45 - 60
// SEMANAL: 120 - 180 - 240 - D


reso(exp, use, res) => use ? request.security(syminfo.tickerid, timeframe.period=="1" ? "D" : timeframe.period=="3" ? "D" : timeframe.period=="5" ? "D" : timeframe.period=="15" ? "D" : timeframe.period=="30" ? "D" : timeframe.period=="45" ? "W" : timeframe.period=="60" ? "W" : timeframe.period=="120" ? "W" : timeframe.period=="180" ? "W" : timeframe.period=="240" ? "W" : timeframe.period=="D" ? "W" : "W", exp) : exp




//----------------------------------------    FIN FUNCIONES     ----------------------------------------

//----------------------------------------    INICIO VARIABLES     ----------------------------------------

// DEMAS
ma_short    = reso(variant(type, src[off], len, lsma), useRes1, setRes1)
ma_long     = reso(variant(type2, src2[off2], len2, lsma2), useRes1, setRes1)


//----------------------------------------    FIN VARIABLES     ----------------------------------------


//----------------------------------------    FIN PPI     ----------------------------------------

//----------------------------------------    PRIMER FILTRO      ----------------------------------------
// Double HullMA
scolor      = false

n=1
n2ma=2*wma(close,round(n/2))
nma=wma(close,n)
diff=n2ma-nma
sqn=round(sqrt(n))

n2ma1=2*wma(close[1],round(n/2))
nma1=wma(close[1],n)
diff1=n2ma1-nma1
sqn1=round(sqrt(n))

n1=wma(diff,sqn)
n2=wma(diff1,sqn)

//----------------------------------------    FIN PRIMER FILTRO     ----------------------------------------

//----------------------------------------    INICIO CONDICIONES      ----------------------------------------

// CONDICION CON FILTRO
cruce= (ma_short > ma_long) and n1>n2 ? true : ma_short < ma_long ? false : cruce[1]
// Condition

// FONDO DE COLOR
bground = cruce ? white : red
bgcolor(bground, transp=90)


// BARRAS COLOREADAS
barcol = cruce ? yellow : red 
barcolor(barcol, transp=0)

closePlot   = plot(ma_short, title = "Zone 1", color = gray, circles = 0, style = circles, transp = 100)
openPlot   = plot(ma_long, title = "Zone 2", color = green, circles = 0, style = circles, transp = 100)
trendState  = ma_short > ma_long ? true : ma_short < ma_long ? false : trendState[1]

// channel fill
closePlotU  = plot(trendState ? ma_short : na, transp = 100, editable = false)
openPlotU   = plot(trendState ? ma_long : na, transp = 100, editable = false)
closePlotD  = plot(trendState ? na : ma_short, transp = 100, editable = false)
openPlotD   = plot(trendState ? na : ma_long, transp = 100, editable = false)

fill(openPlotU, closePlotU, title = "Up Trend Fill", color = yellow, transp = 70)
fill(openPlotD, closePlotD, title = "Down Trend Fill", color = red, transp = 70)




//----------------------------------------    FIN CONDICIONES     ----------------------------------------

//----------------------------------------    INICIO ESTRATEGIA      ----------------------------------------

//CONDICION COMPRA
longCond    = (ma_short > ma_long) and n1>=n2

//CONDICION VENTA

shortCond    = (ma_short < ma_long)

//ABRO COMPRA A
strategy.entry("Bull Trend", strategy.long, when = longCond)

//ABRO VENTA A
strategy.entry("Bearish Trend", strategy.short, when = shortCond)

//CIERRO VENTA A
strategy.exit("Exit Short", from_entry = "Bull Trend", when = shortCond)

//CIERRO COMPRA A
strategy.exit("Exit Long", from_entry = "Bearish Trend", when = longCond)

//----------------------------------------    FIN ESTRATEGIA     ----------------------------------------




```

> Detail

https://www.fmz.com/strategy/442550

> Last Modified

2024-02-22 17:09:39
