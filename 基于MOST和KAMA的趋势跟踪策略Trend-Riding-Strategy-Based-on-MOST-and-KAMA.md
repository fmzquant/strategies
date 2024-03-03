
> Name

基于MOST和KAMA的趋势跟踪策略Trend-Riding-Strategy-Based-on-MOST-and-KAMA

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/132fa73026eaf0fa110.png)
[trans]
## 概述

该策略通过组合使用SMA、EMA、KAMA等多种移动平均线,识别价格趋势方向,以及基于价格突破设置止损线,设计一个跟踪趋势运行的策略。当价格上涨时, trails the upper band作为止损;当价格下跌时,trails the 下限作为止损。策略优点是多种移动平均线组合,可以平滑价格数据,识别趋势;动态止损设计避免止损过于敏感。策略风险在于止损线Setting可能过于宽松,无法及时止损。

## 策略原理

该策略使用KAMA作为判断趋势方向的基础指标,因为KAMA响应价格变化更加敏感,可以提早识别转折。同时,策略中包含了SMA、EMA等其他多种移动平均线的组合,可以对价格进行滤波,识别主要趋势方向。 

策略的止损线设置基于价格本身以及移动平均线。具体来说,向上追踪的止损线为移动平均线再叠加一个比例作为缓冲;向下追踪的止损线为移动平均线减去一个比例作为缓冲。这样可以实现当价格出现反转时,立即止损。

进入条件为,当价格由下向上突破上行止损线时做多;当价格由上向下突破下行止损线时做空。

## 优势分析

该策略最大的优势在于,通过多种移动平均线的组合,可以提高对趋势判断的准确性,减少假信号。同时,策略的止损线是基于移动平均线动态变化的,能够根据实时价格调整,实现对突发事件的响应。

此外,相比于单一指标策略,该策略融合了趋势跟踪和突破策略的优点。在趋势行情中,可以最大程度获利;而在震荡行情中,通过止损设定可以减少损失。

## 风险分析

该策略的主要风险在于,止损线设置可能过于宽松,无法及时止损。这是因为止损线的回撤比例是固定设置的,如果行情出现剧烈变化,无法及时更新止损线,可能带来较大亏损。

此外,Moving Average本身滞后性很强,无法对价格变化做出即时反应。这也可能导致在行情快速反转时,无法及时止损。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 测试不同参数设置下的止损线比例,找到更优参数组合;

2. 尝试将止损线设置为动态变化,根据市场波动程度做出调整;

3. 增加其他指标判断,在止损 Basis 上引入更多变量,提高策略的适应性;

4.优化移动平均线的周期参数,找到最佳平滑价格的周期设置。

## 总结

本策略整体来说较为稳健,通过多种移动平均线组合判断趋势方向,并设计动态追踪止损机制,旨在跟踪趋势运行。优点是可以减少假信号,通过止损控制风险;劣势是止损线可能设置过宽,无法迅速止损。下一步优化策略应在止损线设计上下功夫,使之能够根据市场变化进行动态调整。

||

This strategy combines multiple moving averages such as SMA and EMA to identify price trend direction, and sets stop loss lines based on price breakthrough to design a trend following strategy. When prices rise, it trails the upper band as a stop loss; when prices fall, it trails the lower limit as a stop loss. The advantage of the strategy is that the combination of multiple moving averages can smooth price data and identify trends; The dynamic stop loss design avoids overly sensitive stops. The risk of the strategy is that the Setting of the stop loss line may be too loose to stop loss in time.

## Strategy Principle 

This strategy uses KAMA as the basis for judging trend direction, because KAMA responds to price changes more sensitively and can identify turns in advance. At the same time, the strategy contains combinations of other multiple moving averages such as SMA and EMA to filter prices and identify main trend directions.

The strategy's stop-loss line setting is based on the price itself and the moving average. Specifically, the upward trailing stop loss line is the moving average plus a proportion as a buffer; The downward trailing stop loss line is the moving average minus a proportion as a buffer. This allows for immediate stop loss when prices reverse.

The entry conditions are long when prices break through the upside stop loss line from bottom up; short when prices break through the downside stop loss line from top down.

## Advantage Analysis

The biggest advantage of this strategy is that by combining multiple moving averages, the accuracy of trend judgment can be improved and false signals can be reduced. At the same time, the strategy's stop loss line changes dynamically based on the moving average, which can adjust in real time and respond to sudden events.

In addition, compared to single indicator strategies, this strategy combines the advantages of trend tracking and breakthrough strategies. In a trending market, it can maximize profits; while in a whipsaw market, it can reduce losses through stop loss settings.

## Risk Analysis  

The main risk of this strategy is that the stop loss line setting may be too loose to stop loss in time. This is because the retracement ratio of the stop loss line is fixed, if there is a violent change in the market, the stop loss line cannot be updated in time, which may lead to greater losses.

In addition, Moving Average itself has high hysteresis and cannot react immediately to price changes. This may also lead to failure to stop loss in time when the market reverses rapidly.


## Optimization Directions

The strategy can be optimized in the following aspects:

1. Test different parameter settings for stop loss line ratios to find better parameter combinations;

2. Try to make the stop loss line change dynamically according to the degree of market fluctuation;  

3. Increase other indicators to judge, introduce more variables in the stop loss basis to improve the adaptability of the strategy;

4. Optimize the cycle parameters of the moving average to find the best cycle setting to smooth prices.


## Summary  

Overall, this strategy is quite robust, combining multiple moving averages to determine trend direction, and designing a dynamic trailing stop loss mechanism aiming to follow trends. The advantages are that it can reduce false signals, control risks through stop loss; The disadvantage is that the stop loss line may be set too wide to stop loss quickly. The next step to optimize the strategy should focus on the design of the stop loss line to make it adjustable dynamically according to market changes.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|3|Moving Average Length|
|v_input_float_1|3.3|STOP LOSS Percent|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_1|0|Moving Average Type: KAMA|EMA|WMA|DEMA|TMA|VAR|WWMA|ZLEMA|TSF|HULL|TILL|SMA|
|v_input_bool_1|false|Activate Screener?|
|v_input_2|true|Show Signal Labels?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-22 00:00:00
end: 2024-02-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('Atlantean Trend Signal BUY SELL Strategy', overlay=true)

ma_length = input.int(title='Moving Average Length', minval=1, defval=3)
percent = input.float(3.3, 'STOP LOSS Percent', step=0.1, minval=0)
src = input(title='Source', defval=close)
mav = input.string(title="Moving Average Type", defval="KAMA", options=["SMA", "EMA", "WMA", "DEMA", "TMA", "VAR", "WWMA", "ZLEMA", "TSF", "HULL", "TILL", "KAMA"])
T3a1 = 0.7
_type = false //input(false, title='Activate Moving Average Screening Mode')
_type1 = false //input(false, title='Activate Moving Average Color Change Screening Mode')
activateScreener = input.bool(false, title="Activate Screener?")
showsignallabels = input(title='Show Signal Labels?', defval=true)

Var_Func(src, ma_length) =>
    valpha = 2 / (ma_length + 1)
    vud1 = src > src[1] ? src - src[1] : 0
    vdd1 = src < src[1] ? src[1] - src : 0
    vUD = math.sum(vud1, 9)
    vDD = math.sum(vdd1, 9)
    vCMO = nz((vUD - vDD) / (vUD + vDD))
    VAR = 0.0
    VAR := nz(valpha * math.abs(vCMO) * src) + (1 - valpha * math.abs(vCMO)) * nz(VAR[1])
    VAR

VAR = Var_Func(src, ma_length)
DEMA = 2 * ta.ema(src, ma_length) - ta.ema(ta.ema(src, ma_length), ma_length)

Wwma_Func(src, ma_length) =>
    wwalpha = 1 / ma_length
    WWMA = 0.0
    WWMA := wwalpha * src + (1 - wwalpha) * nz(WWMA[1])
    WWMA

WWMA = Wwma_Func(src, ma_length)

// KAMA Calculation
Kama_Func(src, ma_length) =>
    xvnoise = math.abs(src - src[1])
    nfastend = 0.666
    nslowend = 0.0645
    nsignal = math.abs(src - src[ma_length])
    nnoise = math.sum(xvnoise, ma_length)
    nefratio = nnoise != 0 ? nsignal / nnoise : 0
    nsmooth = math.pow(nefratio * (nfastend - nslowend) + nslowend, 2)
    nAMA = 0.0
    nAMA := nz(nAMA[1]) + nsmooth * (src - nz(nAMA[1]))
    nAMA

Zlema_Func(src, ma_length) =>
    zxLag = ma_length / 2 == math.round(ma_length / 2) ? ma_length / 2 : (ma_length - 1) / 2
    zxEMAData = src + src - src[zxLag]
    ZLEMA = ta.ema(zxEMAData, ma_length)
    ZLEMA

ZLEMA = Zlema_Func(src, ma_length)

Tsf_Func(src, ma_length) =>
    lrc = ta.linreg(src, ma_length, 0)
    lrc1 = ta.linreg(src, ma_length, 1)
    lrs = lrc - lrc1
    TSF = ta.linreg(src, ma_length, 0) + lrs
    TSF

TSF = Tsf_Func(src, ma_length)

HMA = ta.wma(2 * ta.wma(src, ma_length / 2) - ta.wma(src, ma_length), math.round(math.sqrt(ma_length)))

T3e1 = ta.ema(src, ma_length)
T3e2 = ta.ema(T3e1, ma_length)
T3e3 = ta.ema(T3e2, ma_length)
T3e4 = ta.ema(T3e3, ma_length)
T3e5 = ta.ema(T3e4, ma_length)
T3e6 = ta.ema(T3e5, ma_length)
T3c1 = -T3a1 * T3a1 * T3a1
T3c2 = 3 * T3a1 * T3a1 + 3 * T3a1 * T3a1 * T3a1
T3c3 = -6 * T3a1 * T3a1 - 3 * T3a1 - 3 * T3a1 * T3a1 * T3a1
T3c4 = 1 + 3 * T3a1 + T3a1 * T3a1 * T3a1 + 3 * T3a1 * T3a1
T3 = T3c1 * T3e6 + T3c2 * T3e5 + T3c3 * T3e4 + T3c4 * T3e3

getMA(src, ma_length) =>
    ma = 0.0
    ma := switch mav
        'SMA' => ta.sma(src, ma_length)
        'EMA' => ta.ema(src, ma_length)
        'WMA' => ta.wma(src, ma_length)
        'DEMA' => DEMA
        'TMA' => ta.sma(ta.sma(src, math.ceil(ma_length / 2)), math.floor(ma_length / 2) + 1)
        'VAR' => VAR
        'WWMA' => WWMA
        'ZLEMA' => ZLEMA
        'TSF' => TSF
        'HULL' => HMA
        'TILL' => T3
        'KAMA' => Kama_Func(src, ma_length)
    ma
ALL = getMA(src, ma_length)
exMov = ALL
fark = exMov * percent * 0.01
longStop = exMov - fark
longStopPrev = nz(longStop[1], longStop)
longStop := exMov > longStopPrev ? math.max(longStop, longStopPrev) : longStop
shortStop = exMov + fark
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := exMov < shortStopPrev ? math.min(shortStop, shortStopPrev) : shortStop
dir = 1
dir := nz(dir[1], dir)
dir := dir == -1 and exMov > shortStopPrev ? 1 : dir == 1 and exMov < longStopPrev ? -1 : dir
MOST = dir == 1 ? longStop : shortStop
cro = _type and _type1 ? ta.crossover(exMov, exMov[1]) : _type ? ta.crossover(close, exMov) : ta.crossover(exMov, MOST)
cru = _type and _type1 ? ta.crossunder(exMov, exMov[1]) : _type ? ta.crossunder(close, exMov) : ta.crossunder(exMov, MOST)
direction = 0
direction := cro ? 1 : cru ? -1 : direction[1]
col1 = exMov > exMov[1]
col3 = exMov < exMov[1]
colorM = col1 and _type and _type1 ? color.rgb(14, 241, 52) : col3 and _type and _type1 ? color.red : color.new(#00bcd4, 0)
if (cro)
    strategy.entry('LONG', strategy.long)
if (cru)
    strategy.close('LONG')

plot(_type ? na : MOST, color=color.new(color.maroon, 0), linewidth=3, title='MOST')
plot(exMov, color=colorM, linewidth=2, title='exMov')
plotshape(cro and showsignallabels, title='BUY', text='BUY', location=location.belowbar, style=shape.labelup, size=size.tiny, color=color.new(#00bcd4, 0), textcolor=color.new(color.white, 0))
plotshape(cru and showsignallabels, title='SELL', text='SELL', location=location.abovebar, style=shape.labeldown, size=size.tiny, color=color.new(#e91e63, 0), textcolor=color.new(color.white, 0))

```

> Detail

https://www.fmz.com/strategy/443093

> Last Modified

2024-02-29 11:04:38
