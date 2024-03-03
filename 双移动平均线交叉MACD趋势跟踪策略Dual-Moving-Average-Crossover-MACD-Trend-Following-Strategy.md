
> Name

双移动平均线交叉MACD趋势跟踪策略Dual-Moving-Average-Crossover-MACD-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14472979c85b47597aa.png)
 [trans]
## 概述

这个策略是基于双移动平均线交叉的MACD技术指标来实现的自动交易策略。它利用MACD指标的快慢线交叉信号来判断趋势方向,实现趋势跟踪。

## 策略原理

该策略首先计算MACD指标的三条曲线:快线、慢线和离差线。快线是一定周期内的更快速的移动平均线,慢线是更长周期的移动平均线。离差线是快线和慢线的差值。当快线上穿慢线时为金叉信号,表示买入信号;当快线下穿慢线时为死叉信号,表示卖出信号。

该策略利用这个原理,在金叉时做多,在死叉时平仓;或者在死叉时做空,在金叉时平仓,实现自动跟踪趋势。同时,策略还判断MACD线的绝对值正负,避免假信号,确保真正捕捉趋势转折点。

## 策略优势

- 利用双移动平均线交叉判断趋势方向,精确捕捉趋势转折
- MACD技术指标减少假信号,提高信号质量
- 可灵活选择做多做空或只做多/空
- 参数可调整,适应不同市场环境

## 策略风险

- 双移动平均线交叉存在滞后,可能错过转折开始的部分利润
- MACD指标在震荡市中容易产生假信号
- 需要适当调整参数,避免过于灵敏或迟钝

风险解决方法:

- 结合其他指标过滤信号
- 调整参数,降低交易频率
- 只在趋势明显时才采取该策略

## 策略优化方向 

该策略可以从以下几个方面进行优化:

1. 结合其他指标确认信号,例如KDJ指标、布林带指标等,过滤假信号

2. 改进入场机制,例如加入突破过滤,避免预期入场过早或过晚

3. 优化参数设置,根据不同周期及市场环境调整快线慢线周期,适应市场

4. 加入止损策略,控制单笔损失

5. 可扩展至其他品种,例如外汇、数字货币等

## 总结

该双移动平均线交叉MACD趋势跟踪策略,利用MACD指标判断趋势方向,配合快慢线交叉过滤信号,可有效捕捉趋势转折,自动跟踪趋势。策略优势在于精准判断趋势,参数调整灵活,可根据市场环境优化。需要注意控制风险,避免产生假信号。若结合其他技术指标及参数调整,该策略效果会更好。

||

## Overview

This strategy is an automated trading strategy based on the dual moving average crossover of the MACD technical indicator. It utilizes the signal line crossover of MACD to determine the trend direction for trend following.  

## Strategy Logic

The strategy first calculates the three lines of the MACD indicator: fast line, slow line and histogram. The fast line is a faster moving average over a shorter period while the slow line is a slower moving average over a longer period. The histogram is the difference between the fast and slow lines. When the fast line crosses above the slow line, it is a golden cross signal indicating a buy signal. When the fast line crosses below the slow line, it is a death cross signal indicating a sell signal.

The strategy utilizes this logic to go long on golden crosses and close position on death crosses; or go short on death crosses and close position on golden crosses to automatically follow the trend. Meanwhile, the strategy also judges if the absolute MACD line is positive or negative to avoid false signals and ensure truly capturing trend reversal points.

## Advantages of the Strategy

- Utilizes dual moving average crossover to determine trend direction accurately and capture trend reversal
- MACD technical indicator reduces false signals and improves signal quality  
- Flexibility to go long or short or only long/short
- Adjustable parameters cater to different market environments

## Risks of the Strategy

- Dual moving average crossover has lagging effect, may miss partial profits at the beginning of reversals
- MACD indicator prone to false signals during market consolidation
- Parameters need proper adjustment to avoid overly sensitive or inert

Risk Mitigations:

- Combine with other indicators to filter signals
- Tune parameters to lower trading frequency 
- Only adopt the strategy when trend is obvious

## Enhancement Areas

The strategy can be enhanced from the following aspects:

1. Incorporate other indicators like KDJ, Bollinger Bands etc to confirm signals and filter false signals

2. Improve entry mechanism, e.g. add breakout filter to avoid premature or late entries 

3. Optimize parameter settings, adjust fast and slow line periods based on different timeframes and market regimes

4. Add stop loss to control single trade loss

5. Expand to other products like forex, crypto currencies etc

## Summary  

The dual moving average crossover MACD trend following strategy utilizes MACD indicator to determine trend direction combined with signal line crossovers to effectively filter signals and capture trend reversals for automated trend following. The advantages lie in accurate trend judgment, flexible parameter tuning catering to market environments. Risk management is important to avoid false signals. Further optimizations with additional technical indicators and parameter tuning can improve strategy performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Long/Short: Long only|Short only|Both|
|v_input_2|12|Fast Length|
|v_input_3|26|Slow Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|9|Signal Smoothing|
|v_input_6|false|Simple MA(Oscillator)|
|v_input_7|false|Simple MA(Signal Line)|
|v_input_8|2019|From Year|
|v_input_9|true|From Month|
|v_input_10|true|From Day|
|v_input_11|9999|To Year|
|v_input_12|12|To Month|
|v_input_13|31|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-16 00:00:00
end: 2024-01-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © DeMindSET

//@version=4
strategy("MACD Trend Follow Strategy", overlay=false)
// Getting inputs
LSB = input(title="Long/Short", defval="Long only", options=["Long only", "Short only" , "Both"]) 
fast_length = input(title="Fast Length", type=input.integer, defval=12)
slow_length = input(title="Slow Length", type=input.integer, defval=26)
src = input(title="Source", type=input.source, defval=close)
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9)
sma_source = input(title="Simple MA(Oscillator)", type=input.bool, defval=false)
sma_signal = input(title="Simple MA(Signal Line)", type=input.bool, defval=false)

// Plot colors
col_grow_above = #26A69A
col_grow_below = #FFCDD2
col_fall_above = #B2DFDB
col_fall_below = #EF5350
col_macd = #0094ff
col_signal = #ff6a00

// Calculating
fast_ma = sma_source ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source ? sma(src, slow_length) : ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal

plot(hist, title="Histogram", style=plot.style_columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below) ), transp=0 )
plot(macd, title="MACD", color=col_macd, transp=0)
plot(signal, title="Signal", color=col_signal, transp=0)
//
Bull= macd > signal
Bear= macd < signal
ConBull=macd>0
ConBear=macd<0
//
Green= Bull and ConBull
Red= Bear and ConBear
Yellow= Bull and ConBear
Blue= Bear and ConBull
//
bcolor = Green ? color.green : Red ? color.red : Yellow ? color.yellow : Blue ? color.blue : na
barcolor(color=bcolor)
// === INPUT BACKTEST RANGE ===
FromYear  = input(defval = 2019, title = "From Year", minval = 1920)
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2009)
ToMonth   = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 31, title = "To Day", minval = 1, maxval = 31)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"

if LSB == "Long only" and Green
    strategy.entry("L",true)
if LSB == "Long only" and Red
    strategy.close("L",qty_percent=100,comment="TP Long")
if LSB == "Both" and Green
    strategy.entry("L",true)
if LSB == "Both" and Red
    strategy.entry("S",false)
if LSB == "Short only" and Red
    strategy.entry("S",false)
if LSB == "Short only" and Green
    strategy.close("S",qty_percent=100,comment="TP Short")

```

> Detail

https://www.fmz.com/strategy/439708

> Last Modified

2024-01-23 11:22:02
