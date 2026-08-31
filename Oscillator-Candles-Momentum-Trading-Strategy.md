
> Name

Oscillator-Candles-Momentum-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This is a momentum-based strategy that uses oscillators indicators like RSI, Stoch, MACD to generate trading signals. The main idea is to identify trend direction when price oscillates by using indicators and enter trades based on indicator signals. The strategy also uses delayed supertrend for stop loss.

## Strategy Logic

The strategy first calls custom function f_getOscilatorValues to get values of different oscillator indicators including RSI, Stoch, MACD etc. Then it calculates delayed supertrend values with f_getSupertrend to track stop loss.

After calculating the indicators, the strategy calls f_getBuySellStops to compute entry stops and profit targets based on indicator values. Specifically, it calculates ATR and uses ATR multiplied by a stop loss coefficient as entry stop, and ATR multiplied by a take profit coefficient as profit target. The stops and targets will adjust when trend reverses.

Next, the strategy determines the candle direction. Uptrend candles are colored green and downtrend candles are colored red. After plotting candles and indicators, the strategy checks if entry conditions are met. The entry conditions are buying when indicator shows overbought and price breaks above upper band, and selling when indicator shows oversold and price breaks below lower band. There is also a filtering condition requiring price to break higher timeframe moving average. 

After entry, stop loss is trailed by upper/lower band whichever is closer. When stop loss is triggered, the position is closed. When price reaches profit target, partial profit is taken.

## Advantage Analysis

The advantages of this strategy are:

1. Using oscillators to identify trend direction can capture short-term reversal opportunities timely.

2. Applying delayed supertrend stop loss can stop out before loss increases, limiting single trade loss.

3. Calculating stop loss and profit target based on dynamic ATR helps adjust position sizing.

4. Filtering with higher timeframe moving average avoids being trapped in consolidations. 

5. Partial profit taking lets profits run while locking some profit.

6. The logic is simple and easy to understand for quant trading beginners.

## Risk Analysis

Some risks of this strategy include:

1. Oscillators may have lagging issues, causing delayed entry and premature exit signals. This can be improved by optimizing parameters or adding trend following indicators.

2. Tight stop loss may get hit. Stop loss range could be widened or dynamic stops like Chandelier can be used.

3. Remaining position after partial profit taking may be stopped out. The partial profit ratio could be lowered.

4. Backtest overfitting risk. The strategy should be validated across different markets.

5. Failure of higher timeframe moving average filter. Trend classification methods should be used together.

## Enhancement Directions

The strategy can be optimized in the following aspects:

1. Test different combinations of oscillators parameters and find the ones that provide quality signals.

2. Try replacing partial profit taking with trailing profit stop based on ATR or moving averages.

3. Add machine learning algorithms to replace moving average for trend analysis and improve accuracy.

4. Add volume indicators as filtering conditions to avoid unnecessary reversals.

5. Ensemble and weight optimize indicators to find the optimal combination for the asset.

6. Add machine learning risk control modules to dynamically optimize stops, targets and position sizing. 

7. Incorporate triangular arbitrage or basis trading signals using price spreads between futures and spot.

## Conclusion

Overall this is a great strategy for quant trading beginners with clear logic focusing on indicators and risk management. But parameter optimization and risk reduction are still needed for live trading. It can also be enhanced in aspects like trend analysis, stop loss optimization, ensemble models etc to improve robustness. As a trading strategy template, it provides valuable reference.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Oscliator Type: stoch|rsi|cog|macd|tsi|cci|cmo|mfi|
|v_input_2|3|length|
|v_input_3|3|shortlength|
|v_input_4|9|longlength|
|v_input_5|true|showSupertrend|
|v_input_6|0|Moving Average Type: rma|sma|hma|ema|vwma|wma|
|v_input_7|30|AtrLength|
|v_input_8|4|stopMultiplier|
|v_input_9|3|targetMultiplier|
|v_input_10|true|wicks|
|v_input_11|false|considerWicksForDelayByStep|
|v_input_12|true|colorByPreviousClose|
|v_input_13|false|useHTFPivot|
|v_input_14|12M|resolution|
|v_input_15|4|Higher Timeframe multiplier (Used when resolution is set to Same as Symbol)|
|v_input_16|2|PivotLength|
|v_input_17|0|Trade Direction: strategy.direction.long|strategy.direction.all|strategy.direction.short|
|v_input_18|timestamp(01 Jan 2010 00:00 +0000)|Backtest Start Time|
|v_input_19|timestamp(01 Jan 2099 00:00 +0000)|Backtest End Time|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-26 00:00:00
end: 2023-09-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HeWhoMustNotBeNamed

//@version=4
strategy("Oscilator candles - strategy", overlay=false, initial_capital = 1000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type = strategy.commission.percent, pyramiding = 1, commission_value = 0.01, calc_on_order_fills = true)

oscilatorType = input(title="Oscliator Type", defval="stoch", options=["rsi", "stoch", "cog", "macd", "tsi", "cci", "cmo", "mfi"])
length = input(3)
shortlength = input(3)
longlength = input(9)

showSupertrend = input(true)
AtrMAType = input(title="Moving Average Type", defval="rma", options=["ema", "sma", "hma", "rma", "vwma", "wma"])
AtrLength = input(30, step=10)
stopMultiplier  = input(4)
targetMultiplier  = input(3)
wicks = input(true)
considerWicksForDelayByStep = input(false)
colorByPreviousClose = input(true)

useHTFPivot = input(false)
resolution = input("12M", type=input.resolution)
HTFMultiplier = input(4, title="Higher Timeframe multiplier (Used when resolution is set to Same as Symbol)", minval=2, step=1)
PivotLength = input(2, step=1)

tradeDirection = input(title="Trade Direction", defval=strategy.direction.long, options=[strategy.direction.all, strategy.direction.long, strategy.direction.short])
i_startTime = input(defval = timestamp("01 Jan 2010 00:00 +0000"), title = "Backtest Start Time", type = input.time)
i_endTime = input(defval = timestamp("01 Jan 2099 00:00 +0000"), title = "Backtest End Time", type = input.time)
inDateRange = true

f_getOscilatorValues(oscilatorType, length, shortlength, longlength)=>
    oOpen = rsi(open, length)
    oClose = rsi(close, length)
    oHigh = rsi(high, length)
    oLow = rsi(low, length)
    if(oscilatorType == "tsi")
        oOpen := tsi(open, shortlength, longlength)
        oClose := tsi(close, shortlength, longlength)
        oHigh := tsi(high, shortlength, longlength)
        oLow := tsi(low, shortlength, longlength)
    if(oscilatorType == "stoch")
        oOpen := stoch(open, longlength, shortlength, length)
        oClose := stoch(close, longlength, shortlength, length)
        oHigh := stoch(high, longlength, shortlength, length)
        oLow := stoch(low, longlength, shortlength, length)
    if(oscilatorType == "cci")
        oOpen := cci(open, length)
        oClose := cci(close, length)
        oHigh := cci(high, length)
        oLow := cci(low, length)
    if(oscilatorType == "cog")
        oOpen := cog(open, length)
        oClose := cog(close, length)
        oHigh := cog(high, length)
        oLow := cog(low, length)
    if(oscilatorType == "cmo")
        oOpen := cmo(open, length)
        oClose := cmo(close, length)
        oHigh := cmo(high, length)
        oLow := cmo(low, length)
    if(oscilatorType == "mfi")
        oOpen := mfi(open, length)
        oClose := mfi(close, length)
        oHigh := mfi(high, length)
        oLow := mfi(low, length)
    if(oscilatorType == "macd")
        [macdLineOpen, signalLineOpen, histLineOpen] = macd(open, shortlength, longlength, length)
        [macdLineClose, signalLineClose, histLineClose] = macd(close, shortlength, longlength, length)
        [macdLineHigh, signalLineHigh, histLineHigh] = macd(high, shortlength, longlength, length)
        [macdLineLow, signalLineLow, histLineLow] = macd(low, shortlength, longlength, length)
        oOpen := macdLineOpen
        oClose := macdLineClose
        oHigh := macdLineHigh
        oLow := macdLineLow
    [oOpen, oClose, oHigh, oLow]

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

f_getSupertrend(oOpen, oClose, oHigh, oLow, AtrMAType, AtrLength, stopMultiplier, wicks)=>
    truerange = max(oHigh, oClose[1]) - min(oLow, oClose[1])
    
    averagetruerange = f_getMovingAverage(truerange, AtrMAType, AtrLength)
    atr = averagetruerange * stopMultiplier

    longStop = oClose - atr
    longStopPrev = nz(longStop[1], longStop)
    longStop := (wicks ? oLow[1] : oClose[1]) > longStopPrev ? max(longStop, longStopPrev) : longStop
    
    shortStop = oClose + atr
    shortStopPrev = nz(shortStop[1], shortStop)
    shortStop := (wicks ? oHigh[1] : oClose[1]) < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop
    
    dir = 1
    dir := nz(dir[1], dir)
    dir := dir == -1 and (wicks ? oHigh : oClose) > shortStopPrev ? 1 : dir == 1 and (wicks ? oLow : oClose) < longStopPrev ? -1 : dir
    
    trailingStop = dir == 1? longStop : shortStop
    
    [dir, trailingStop]


f_getBuySellStops(oOpen, oClose, oHigh, oLow, AtrMAType, AtrLength, considerWicks, considerWicksForDelayByStep, stopMultiplier, targetMultiplier)=>
    barState = 0
    source = oClose
    
    truerange = max(oHigh, oClose[1]) - min(oLow, oClose[1])
    
    atr = f_getMovingAverage(truerange, AtrMAType, AtrLength)

    buyStop = source - atr * stopMultiplier
    sellStop = source + atr * stopMultiplier
    buyStopDerived = buyStop
    sellStopDerived = sellStop
    highTarget = considerWicks ? oHigh : source
    lowTarget = considerWicks ? oLow : source
    
    highTargetDelayByStep = considerWicksForDelayByStep ? oHigh : source
    lowTargetDelayByStep = considerWicksForDelayByStep ? oLow : source
    
    barState := highTarget > sellStopDerived[1] ? 1 : lowTarget < buyStopDerived[1] ? -1 : nz(barState[1],0)
    
    buyMultiplier = (barState == 1)? stopMultiplier : targetMultiplier
    sellMultiplier = (barState == -1)? stopMultiplier : targetMultiplier
    buyStop := source - atr * buyMultiplier
    sellStop := source + atr * sellMultiplier
    buyStop := barState == 1? max(buyStop, buyStop[1]) : barState == -1? min(buyStop, buyStop[1]) : buyStop
    sellStop := barState == 1? max(sellStop, sellStop[1]) : barState == -1? min(sellStop, sellStop[1]) : sellStop
    
    buyStopDerived := buyStop
    sellStopDerived := sellStop
    
    buyStopDerived := highTargetDelayByStep < sellStopDerived[1] and lowTargetDelayByStep > buyStopDerived[1] ? buyStopDerived[1] : buyStopDerived
    sellStopDerived := highTargetDelayByStep < sellStopDerived[1] and lowTargetDelayByStep > buyStopDerived[1] ? sellStopDerived[1] : sellStopDerived

    [buyStopDerived, sellStopDerived, barState]


f_secureSecurity(_symbol, _res, _src) => security(_symbol, _res, _src[1], lookahead = barmerge.lookahead_on, gaps=barmerge.gaps_off)

f_multiple_resolution(HTFMultiplier) => 
    target_Res_In_Min = timeframe.multiplier * HTFMultiplier * (
      timeframe.isseconds   ? 1. / 60. :
      timeframe.isminutes   ? 1. :
      timeframe.isdaily     ? 1440. :
      timeframe.isweekly    ? 7. * 24. * 60. :
      timeframe.ismonthly   ? 30.417 * 24. * 60. : na)

    target_Res_In_Min     <= 0.0417       ? "1S"  :
      target_Res_In_Min   <= 0.167        ? "5S"  :
      target_Res_In_Min   <= 0.376        ? "15S" :
      target_Res_In_Min   <= 0.751        ? "30S" :
      target_Res_In_Min   <= 1440         ? tostring(round(target_Res_In_Min)) :
      tostring(round(min(target_Res_In_Min / 1440, 365))) + "D"
    
f_getPivotHighLow(oOpen, oClose, oHigh, oLow, HTFMultiplier, resolution, PivotLength)=>
    derivedResolution = resolution == ""? f_multiple_resolution(HTFMultiplier) : resolution
    HTFHigh = f_secureSecurity(syminfo.tickerid, derivedResolution, oHigh)
    HTFLow = f_secureSecurity(syminfo.tickerid, derivedResolution, oLow)
    CLOSEprev = f_secureSecurity(syminfo.tickerid, derivedResolution, oClose)
    pivothi = pivothigh(HTFHigh, PivotLength, PivotLength)
    pivotlo = pivotlow(HTFLow, PivotLength, PivotLength)
    pivothi := na(pivothi)? nz(pivothi[1]) : pivothi
    pivotlo := na(pivotlo)? nz(pivotlo[1]) : pivotlo
    [pivothi, pivotlo]
    
[oOpen, oClose, oHigh, oLow] = f_getOscilatorValues(oscilatorType, length, shortlength, longlength)
[dir, trailingStop] = f_getSupertrend(oOpen, oClose, oHigh, oLow, AtrMAType, AtrLength, stopMultiplier, wicks)

candleColor = colorByPreviousClose ?
                 (oClose[1] < oClose ? color.green : oClose[1] > oClose ? color.red : color.silver) : 
                 (oOpen < oClose ? color.green : oOpen > oClose ? color.red : color.silver)
plotcandle(oOpen, oHigh, oLow, oClose, 'Oscilator Candles', color = candleColor)

[buyStopDerived, sellStopDerived, barState] = f_getBuySellStops(oOpen, oClose, oHigh, oLow, AtrMAType, AtrLength, wicks, considerWicksForDelayByStep, stopMultiplier, targetMultiplier)

trailingStopDerived = barState == 1? buyStopDerived : sellStopDerived

plot(showSupertrend?trailingStopDerived:na, title="TrailingStop", style=plot.style_linebr, linewidth=1, color= barState == 1 ? color.green : color.red)

[pivotHigh, pivotLow] = f_getPivotHighLow(open, close, high, low, HTFMultiplier, resolution, PivotLength)

buyCondition = (barState == 1) and (close > pivotHigh or not useHTFPivot)
exitBuyConditin = (barState == -1)
sellCondition = (barState == -1) and (close < pivotLow or not useHTFPivot)
exitSellCondition = (barState == 1)

// strategy.risk.allow_entry_in(tradeDirection)
strategy.entry("Buy", strategy.long, when=buyCondition and inDateRange, oca_name="oca")
strategy.entry("Sell", strategy.short, when=sellCondition and inDateRange, oca_name="oca")
strategy.close("Buy", when = exitBuyConditin)
strategy.close( "Sell", when = exitSellCondition)
```

> Detail

https://www.fmz.com/strategy/427922

> Last Modified

2023-09-26 20:05:55
