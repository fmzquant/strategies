
> Name

基于移动均线K线与超趋止损的趋势追踪策略Trend-Following-Strategy-Based-on-MA-Candles-and-Supertrend

> Author

ChaoZhang

> Strategy Description



[trans]  
本策略名称为“基于移动均线K线与超趋止损的趋势追踪策略”。该策略运用移动均线绘制趋势K线,并结合超趋止损机制产生交易信号,实现对趋势的追踪。

具体来说,策略的交易逻辑如下:

1. 用移动均线计算出开高低收价格,绘制出趋势K线。

2. 在趋势K线上应用超趋止损技术,得到做多和做空的止损位。

3. 当价格突破做多止损位时,产生买入信号;当价格跌破做空止损位时,产生卖出信号。

4. 结合更高时间周期的年内最高价和最低价判断,避免在震荡市场中产生过多无效信号。 

5. 当超趋止损反转时,平仓止损。

该策略的优点是同时融合多种技术指标,提高了判断准确性。但移动均线和超趋止损的参数都需要优化。止损策略也是必不可少的。

总体来说,指标和模型的集成应用在一定程度上弥补了单一指标的不足,但任何策略都不可能完美。交易者仍需保持足够的灵活性应对市场变化。



||



This strategy is named "Trend Following Strategy Based on MA Candles and Supertrend". It uses moving averages to construct trend candles and incorporates supertrend mechanism to generate trading signals for trend following. 

Specifically, the trading logic is:

1. Calculate open, high, low and close prices with moving averages to plot trend candles.

2. Apply supertrend technique on the trend candles to derive long and short stops. 

3. When prices break above long stop, buy signals are generated. When prices break below short stop, sell signals are generated.

4. Incorporate yearly high/low prices of higher timeframes to avoid excessive invalid signals during range-bound markets.

5. When supertrend reverses, positions are closed with stop loss.

The advantage of this strategy is integrating multiple technical indicators improves accuracy. But parameters for moving averages and supertrend need optimization. Stop loss is also indispensable.

In general, integrating indicators and models partially compensates for limitations of individual ones. But no strategy can be perfect. Traders still need enough flexibility to adapt to market changes.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Moving Average Type: rma|sma|hma|ema|vwma|wma|
|v_input_2|20|LoopbackBars|
|v_input_3|0|Moving Average Type: rma|sma|hma|ema|vwma|wma|
|v_input_4|30|AtrLength|
|v_input_5|true|AtrMult|
|v_input_6|true|adoptiveWicksfalsewicks|
|v_input_7|0.2|dThreshold|
|v_input_8|0.7|rThreshold|
|v_input_9|0|Trade Direction: strategy.direction.long|strategy.direction.all|strategy.direction.short|
|v_input_10|timestamp(01 Jan 2010 00:00 +0000)|Start Time|
|v_input_11|timestamp(01 Jan 2099 00:00 +0000)|End Time|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-04-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HeWhoMustNotBeNamed

//@version=4
strategy("MA Candles Supertrend Strategy", shorttitle="MACSTS", overlay=true, initial_capital = 20000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type = strategy.commission.percent, pyramiding = 1, commission_value = 0.01)

MAType = input(title="Moving Average Type", defval="rma", options=["ema", "sma", "hma", "rma", "vwma", "wma"])
LoopbackBars = input(20, step=10)

AtrMAType = input(title="Moving Average Type", defval="rma", options=["ema", "sma", "hma", "rma", "vwma", "wma"])
AtrLength = input(30, step=10)
AtrMult = input(1)
adoptiveWicks = false // does not work
wicks = input(true)

dThreshold = input(0.2, step=0.1, maxval=1)
rThreshold = input(0.7, step=0.1, maxval=1)
tradeDirection = input(title="Trade Direction", defval=strategy.direction.long, options=[strategy.direction.all, strategy.direction.long, strategy.direction.short])
i_startTime = input(defval = timestamp("01 Jan 2010 00:00 +0000"), title = "Start Time", type = input.time)
i_endTime = input(defval = timestamp("01 Jan 2099 00:00 +0000"), title = "End Time", type = input.time)
inDateRange = true
strategy.risk.allow_entry_in(tradeDirection)

f_getMovingAverage(source, MAType, length)=>
    ma = sma(source, length)
    if(MAType == "ema")
        ma := ema(source,length)
    if(MAType == "hma")
        ma := hma(source,length)
    if(MAType == "rma")
        ma := rma(source,length)
    if(MAType == "vwma")
        ma := vwma(source,length)
    if(MAType == "wma")
        ma := wma(source,length)
    ma

f_secureSecurity(_symbol, _res, _src, _offset) => security(_symbol, _res, _src[_offset], lookahead = barmerge.lookahead_on)

f_getYearlyHighLowCondition()=>
    yhighrange = f_secureSecurity(syminfo.tickerid, '12M', high, 1) 
    ylowrange = f_secureSecurity(syminfo.tickerid, '12M', low, 1)
    yearlyHighCondition = close > yhighrange*(1-dThreshold) or close > ylowrange*(1+rThreshold)
    yearlyLowCondition = close < ylowrange*(1+dThreshold) or close < yhighrange*(1-rThreshold)
    [yearlyHighCondition, yearlyLowCondition]


f_getSupertrend(oOpen, oClose, oHigh, oLow, AtrMAType, AtrLength, AtrMult, wicks)=>
    truerange = max(oHigh, oClose[1]) - min(oLow, oClose[1])
    
    averagetruerange = f_getMovingAverage(truerange, AtrMAType, AtrLength)
    atr = averagetruerange * AtrMult

    longWicks = (adoptiveWicks and (close < oClose)) or wicks
    shortWicks = (adoptiveWicks and (close > oClose)) or wicks
    longStop = oClose - atr
    longStopPrev = nz(longStop[1], longStop)
    longStop := (longWicks ? oLow[1] : oClose[1]) > longStopPrev ? max(longStop, longStopPrev) : longStop
    
    shortStop = oClose + atr
    shortStopPrev = nz(shortStop[1], shortStop)
    shortStop := (shortWicks ? oHigh[1] : oClose[1]) < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop
    
    dir = 1
    dir := nz(dir[1], dir)
    dir := dir == -1 and (longWicks ? oHigh : oClose) > shortStopPrev ? 1 : dir == 1 and (shortWicks[1]? oLow : oClose) < longStopPrev ? -1 : dir
    

    [dir, longStop, shortStop]

oOpen = f_getMovingAverage(open, MAType, LoopbackBars)
oClose = f_getMovingAverage(close, MAType, LoopbackBars)
oHigh = f_getMovingAverage(high, MAType, LoopbackBars)
oLow = f_getMovingAverage(low, MAType, LoopbackBars)

colorByPreviousClose = false
candleColor = colorByPreviousClose ?
                 (oClose[1] < oClose ? color.green : oClose[1] > oClose ? color.red : color.silver) : 
                 (oOpen < oClose ? color.green : oOpen > oClose ? color.red : color.silver)
plotcandle(oOpen, oHigh, oLow, oClose, 'Oscilator Candles', color = candleColor)

[yearlyHighCondition, yearlyLowCondition] =  f_getYearlyHighLowCondition()
[dir, longStop, shortStop] = f_getSupertrend(oOpen, oClose, oHigh, oLow, AtrMAType, AtrLength, AtrMult, wicks)
trailingStop = dir == 1? longStop : shortStop
trendColor = dir == 1? color.green: color.red
plot(trailingStop, title="TrailingStop", color=trendColor, linewidth=2, style=plot.style_linebr)

longCondition = close > shortStop and dir == 1 and yearlyHighCondition
shortCondition = close < longStop and dir == -1 and yearlyLowCondition

exitLongCondition = dir == -1
exitShortCondition = dir == 1

strategy.risk.allow_entry_in(tradeDirection)
strategy.entry("Long", strategy.long, when=longCondition, oca_name="oca_buy")
strategy.close("Long", when=exitLongCondition)
strategy.entry("Short", strategy.short, when=shortCondition, oca_name="oca_sell")
strategy.close("Short", when=exitShortCondition)

```

> Detail

https://www.fmz.com/strategy/426626

> Last Modified

2023-09-13 18:07:54
