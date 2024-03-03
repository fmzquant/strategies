
> Name

Parabolic-SAR扇形跟踪止损策略Parabolic-SAR-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

Parabolic SAR扇形跟踪止损策略是一个基于Parabolic SAR指标的交易策略。该策略旨在识别趋势的反转点,在趋势反转时及时止损退出仓位。

## 策略原理  

Parabolic SAR指标能够识别价格趋势并给出潜在的反转信号。当SAR点上穿K线时代表着由多头进入空头;当SAR点下穿K线时代表由空头进入多头。

该策略基于Parabolic SAR指标的这一特性,在SAR点穿越K线时识别出趋势反转,并相应地进行做多或做空操作。具体来说,策略逻辑如下:

1. 计算Parabolic SAR值。

2. 判断是否有趋势反转信号。如果SAR点从上方穿越到K线下方,代表空头信号,做空;如果SAR点从下方穿越到K线上方,代表多头信号,做多。

3. 在穿越发生时开仓,并以反向的SAR点再次穿越K线时平仓止损。

## 策略优势

- 利用Parabolic SAR指标识别趋势反转点,避免在趋势中反向操作。

- 在识别到反转信号时快速开仓,捕捉趋势的更替。

- 设定SAR再次穿越K线的止损点,可以快速止损,及时控制亏损。

- 策略思路简单清晰,容易实现。

## 风险及应对

- Parabolic SAR指标可能会产生大量假信号,造成不必要的交易。可以适当调整SAR的参数,降低假信号率。

- 快速反转的市场中,容易被套。可以考虑增加过滤条件,避开剧烈波动的时间段。 

- 止损点过于靠近可能会过于频繁止损。可以适当放宽止损范围,给予价格一定的回调空间。

- 仅依靠一个指标易受特定市场限制,可考虑加入其它指标或过滤条件来提高拟合性。

## 总结

Parabolic SAR扇形跟踪止损策略利用Parabolic SAR指标的趋势识别能力,在趋势反转时快速止损切换方向。策略思路简单清晰,容易掌握。但仅依靠Parabolic SAR一个指标也存在一定局限性,实际应用中需要综合考虑市场环境,适当调整参数,并配合其他技术指标来实现。

||



## Overview

The Parabolic SAR trailing stop loss strategy is a trading strategy based on the Parabolic SAR indicator. It aims to identify trend reversal points and exit positions in a timely manner when the trend reverses.

## Strategy Logic

The Parabolic SAR indicator can identify price trends and give potential reversal signals. When the SAR dot crosses above the candlestick, it represents a change from bullish to bearish; when the SAR dot crosses below the candlestick, it represents a change from bearish to bullish.

Based on this feature of the Parabolic SAR indicator, this strategy identifies trend reversals when the SAR dot crosses the candlestick, and makes corresponding long or short entries. Specifically, the strategy logic is as follows:

1. Calculate the Parabolic SAR values. 

2. Determine if there is a trend reversal signal. If the SAR dot crosses from above to below the candlestick, it represents a bearish signal, go short; if the SAR dot crosses from below to above the candlestick, it represents a bullish signal, go long.

3. Enter a position when the crossover occurs, and exit the position with a stop loss when the SAR dot crosses the candlestick in the opposite direction again.

## Advantages

- Utilizes the Parabolic SAR indicator to identify trend reversal points, avoiding trading against the trend.

- Enters positions quickly when reversal signals are identified, capturing trend changes.

- Sets stop loss at the SAR crossover point for quick stops and timely loss control.

- Simple and clear strategy logic, easy to implement.

## Risks and Mitigation

- The Parabolic SAR indicator can generate many false signals, causing unnecessary trades. Fine tune SAR parameters to reduce false signals.

- Prone to being whipsawed in fast reversing markets. Consider adding filters to avoid high volatility periods.

- Stop loss too close may result in excessive stops. Allow some wiggle room in the stop loss range. 

- Reliance on a single indicator makes the strategy susceptible to market-specific limitations. Consider combining with other indicators or filters to improve robustness.

## Conclusion

The Parabolic SAR trailing stop loss strategy utilizes the trend identification capability of the Parabolic SAR indicator to quickly stop out and reverse direction when trends reverse. The strategy logic is simple and clear. However, reliance on only the Parabolic SAR indicator has limitations. In practice, market conditions should be considered, parameters tuned accordingly, and other technical indicators combined to improve performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.02|start|
|v_input_2|0.02|increment|
|v_input_3|0.2|maximum|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-16 00:00:00
end: 2023-09-15 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Parabolic SAR Strategy (on close) [QuantNomad]", shorttitle="SAR Strategy [QN]", overlay=true)

start     = input(0.02)
increment = input(0.02)
maximum   = input(0.2)

psar      = 0.0 // PSAR
af        = 0.0 // Acceleration Factor
trend_dir = 0   // Current direction of PSAR
ep        = 0.0 // Extreme point

sar_long_to_short = trend_dir[1] == 1  and close <= psar[1] // PSAR switches from long to short
sar_short_to_long = trend_dir[1] == -1 and close >= psar[1] // PSAR switches from short to long

trend_change = barstate.isfirst[1] or sar_long_to_short or sar_short_to_long

// Calculate trend direction
trend_dir    := barstate.isfirst[1] and close[1] > open[1] ? 1 : 
   barstate.isfirst[1] and close[1] <= open[1] ? -1 : 
   sar_long_to_short ? -1 : 
   sar_short_to_long ?  1 : nz(trend_dir[1])

// Calculate  Acceleration Factor
af := trend_change ? start : 
   (trend_dir == 1 and high > ep[1]) or  
   (trend_dir == -1 and low < ep[1]) ? 
   min(maximum, af[1] + increment) : 
   af[1]

// Calculate extreme point
ep := trend_change and trend_dir == 1 ? high :  
   trend_change and trend_dir == -1 ? low : 
   trend_dir == 1 ? max(ep[1], high) : 
   min(ep[1], low)

// Calculate PSAR
psar := barstate.isfirst[1] and close[1] > open[1] ? low[1] : 
   barstate.isfirst[1] and close[1] <= open[1] ? high[1] : 
   trend_change ? ep[1] :    
   trend_dir == 1 ? psar[1] + af * (ep - psar[1]) : psar[1] - af * (psar[1] - ep) 

plot(psar, style=plot.style_cross, color=trend_dir == 1 ? color.green : color.red,  linewidth = 2)

// Strategy 
strategy.entry("Long",  true,  when = sar_short_to_long)
strategy.entry("Short", false, when = sar_long_to_short)
```

> Detail

https://www.fmz.com/strategy/426993

> Last Modified

2023-09-16 18:54:28
