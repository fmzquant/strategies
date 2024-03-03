
> Name

基于多重指标筛选与动态止损的自动交易策略Auto-Trading-Strategy-Based-on-Multiple-Indicators-and-Dynamic-Stop-Loss

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过组合使用快线、中线、慢线以及MACD等多个指标对交易信号进行综合判断,同时采用基于ATR的动态止损机制来控制风险水平。策略适用于中短线自动化交易。

## 策略原理

该策略主要运用了EMA均线、MACD指标以及ATR指标。EMA均线的快线、中线和慢线构成趋势判断体系,MACD指标辅助生成交易信号,ATR指标用于设置止损线。具体来说,通过快线、中线和慢线的多空排列组合判断趋势方向,再结合MACD指标的零轴交叉为入场信号, Enter多头时快线需上穿中线,Exit多头时快线下穿中线;Enter空头时快线下穿中线,Exit空头时快线上穿中线。此外,止损线根据ATR指标动态调整,能够据市场波动情况来控制风险。

## 优势分析

- 多指标组合判断,交易信号准确可靠。
- 快中慢线体系判断趋势方向清晰。 
- MACD指标辅助入场,避免假突破。
- 动态止损更好控制风险。
- 策略较为机械化,适合自动化交易。

## 风险及优化

- 参数设置较复杂,需要大量测试优化。
- 多指标组合判定逻辑较复杂,难以手工操作。
- 应加入其他过滤条件,如交易量能量等,避免被套。
- 可以考虑改进为机器学习交易策略,利用算法优化参数。

## 总结

该策略集多个指标优势于一身,既可以较准确判断趋势,又可以控制回撤。通过参数优化以及加入其他过滤条件,可以进一步增强策略稳定性。总体来说,策略较典型且可靠,适合中短线自动化交易,具有较大的实用价值。

||

## Overview

This strategy combines multiple indicators like fast, medium, slow MA lines and MACD to generate comprehensive trading signals, and uses dynamic stop loss based on ATR to control risk level. It is suitable for medium-term automated trading.

## Strategy Logic

The strategy mainly utilizes EMA, MACD and ATR indicators. EMA fast, medium and slow lines form the trend judgment system. MACD generates trading signals. ATR sets stop loss lines dynamically. Specifically, the trend direction is determined by the combination of the EMA lines. MACD crossover 0 is the entry signal. Enter long when fast line crosses above medium line, and exit when crossing below. Enter short when fast line crosses below medium line, and exit when crossing above. Stop loss adjusts dynamically based on ATR to control risk according to market volatility.

## Advantage Analysis

- Combining multiple indicators makes trading signals accurate and reliable.
- Fast, medium and slow EMA system provides clear trend judgment.  
- MACD assists entry to avoid false breakout.
- Dynamic stop loss manages risk better.
- The mechanical strategy suits automated trading well.

## Risks and Improvements

- Complex parameters require extensive optimization.
- Complex logic of multiple indicators makes manual trading difficult.  
- Should add other filters like volume to avoid being trapped.
- Can consider optimizing to machine learning strategy for automated parameter tuning.

## Summary

The strategy combines advantages of multiple indicators for accurate trend judgment and drawdown control. Further enhancements like parameter optimization and adding filters can improve robustness. Overall it is a typical and reliable strategy suitable for medium-term automated trading with great practical value.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|7|EMA_Smooth_Period|
|v_input_2|7|ST_VWAP_Period|
|v_input_3|false|VWAP_TUNING_MULT|
|v_input_4|13|ATR Period|
|v_input_5|2|ATR Multiplier|
|v_input_6|true|Show Buy/Sell Labels ?|
|v_input_7|true|Highlight State ?|
|v_input_8|22|StopLoss_Long_Adjust|
|v_input_9|16|StopLoss_Short_Adjust|
|v_input_10|true|fastLength|
|v_input_11|4|medLength|
|v_input_12|24|slowLength|
|v_input_13|8|signalLength|
|v_input_14|2|ATR_Signal_Period|
|v_input_15|0.986|ATR_SIGNAL_FINE_TUNE|
|v_input_16|true|StopLoss_Initial_Short|
|v_input_17|5|StopLoss_Initial_Long|
|v_input_18|42|VOLUME_CHECK_SHORT|
|v_input_19|16|VOLUME_CHECK_LONG|
|v_input_20|false|MAX_LOSS|
|v_input_21|false|From Minute|
|v_input_22|false|From Hour|
|v_input_23|true|From Day|
|v_input_24|true|From Month|
|v_input_25|2019|From Year|
|v_input_26|false|Till Minute|
|v_input_27|false|Till Hour|
|v_input_28|true|Till Day|
|v_input_29|true|Till Month|
|v_input_30|2021|Till Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-09-18 21:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("STRAT_STEMWAP", overlay=true, pyramiding = 0, default_qty_value = 10, slippage = 3)

EMA_Smooth_Period = input(7, minval=1)
ST_EMA = ema(close, EMA_Smooth_Period)

ST_VWAP_Period = input(7, minval=1)
VWAP_TUNING_MULT = input(type=input.float, defval=0.000)
ST_VWAP = ema(vwap,ST_VWAP_Period)


ST_VWAP_TUNING = VWAP_TUNING_MULT * (ST_EMA - ST_VWAP)


length = input(title="ATR Period", type=input.integer, defval=13)
mult = input(title="ATR Multiplier", type=input.float, step=0.1, defval=2.0)
showLabels = input(title="Show Buy/Sell Labels ?", type=input.bool, defval=true)
highlightState = input(title="Highlight State ?", type=input.bool, defval=true)

atr = mult * atr(length)


StopLoss_Long_Adjust = input(22.00, type=input.float)
StopLoss_Short_Adjust = input(16.00, type=input.float)


longStop = (ST_EMA) - atr - (ST_VWAP_TUNING) - StopLoss_Long_Adjust
longStopPrev = nz(longStop[1], longStop)
longStop := (close[1]) > longStopPrev ? max(longStop, longStopPrev) : longStop

shortStop = (ST_EMA) + atr - (ST_VWAP_TUNING) + StopLoss_Short_Adjust
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := (close[1]) < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop

dir = 1
dir := nz(dir[1], dir)
dir := dir == -1 and (close) > shortStopPrev ? 1 : dir == 1 and (close) < longStopPrev ? -1 : dir


fastLength = input(1, minval=1), medLength=input(4, minval=1), slowLength=input(24, minval=1), signalLength=input(8,minval=1)
fastMA = ema(close, fastLength)
//,fastMA1 = ema(close[1], fastLength), fastMA2 = ema(close[2], fastLength),fastMA3 = ema(close[3], fastLength),fastMA4 = ema(close[4], fastLength),fastMA5 = ema(close[5], fastLength), fastMA6 = ema(close[6], fastLength), fastMA7 = ema(close[7], fastLength),fastMA8 = ema(close[8], fastLength),fastMA9 = ema(close[9], fastLength),fastMA10 = ema(close[10], fastLength),fastMA11 = ema(close[11], fastLength),fastMA12 = ema(close[12], fastLength),fastMA13 = ema(close[13], fastLength)
medMA = ema(close, medLength)
//, medMA1 = ema(close[1], medLength), medMA2 = ema(close[2], medLength), medMA3 = ema(close[3], medLength), medMA4 = ema(close[4], medLength), medMA5 = ema(close[5], medLength), medMA6 = ema(close[6], medLength), medMA7 = ema(close[7], medLength), medMA8 = ema(close[8], medLength), medMA9 = ema(close[9], medLength), medMA10 = ema(close[10], medLength), medMA11 = ema(close[11], medLength), medMA12 = ema(close[12], medLength), medMA13 = ema(close[13], medLength)
slowMA = ema(close, slowLength)
//, slowMA1 = ema(close[1], slowLength), slowMA2 = ema(close[2], slowLength), slowMA3 = ema(close[3], slowLength), slowMA4 = ema(close[4], slowLength), slowMA5 = ema(close[5], slowLength), slowMA6 = ema(close[6], slowLength), slowMA7 = ema(close[7], slowLength), slowMA8 = ema(close[8], slowLength), slowMA9 = ema(close[9], slowLength), slowMA10 = ema(close[10], slowLength), slowMA11 = ema(close[11], slowLength), slowMA12 = ema(close[12], slowLength), slowMA13 = ema(close[13], slowLength)
macd = fastMA - slowMA
//, macd1 = fastMA1 - slowMA1, macd2 = fastMA2 - slowMA2, macd3 = fastMA3 - slowMA3, macd4 = fastMA4 - slowMA4, macd5 = fastMA5 - slowMA5, macd6 = fastMA6 - slowMA6, macd7 = fastMA7 - slowMA7, macd8 = fastMA8 - slowMA8, macd9 = fastMA9 - slowMA9, macd10 = fastMA10 - slowMA10, macd11 = fastMA11 - slowMA11, macd12 = fastMA12 - slowMA12, macd13 = fastMA13 - slowMA13
fmacd = fastMA - medMA
//, fmacd1 = fastMA1 - medMA1,fmacd2 = fastMA2 - medMA2,fmacd3 = fastMA3 - medMA3,fmacd4 = fastMA4 - medMA4,fmacd5 = fastMA5 - medMA5, fmacd6 = fastMA6 - medMA6, fmacd7 = fastMA7 - medMA7, fmacd8 = fastMA8 - medMA8, fmacd9 = fastMA9 - medMA9, fmacd10 = fastMA10 - medMA10, fmacd11 = fastMA11 - medMA11, fmacd12 = fastMA12 - medMA12, fmacd13 = fastMA13 - medMA13
smacd = slowMA - medMA
//, smacd1 = slowMA1 - medMA1, smacd2 = slowMA2 - medMA2, smacd3 = slowMA3 - medMA3, smacd4 = slowMA4 - medMA4, smacd5 = slowMA5 - medMA5, smacd6 = slowMA6 - medMA6, smacd7 = slowMA7 - medMA7, smacd8 = slowMA8 - medMA8, smacd9 = slowMA9 - medMA9, smacd10 = slowMA10 - medMA10, smacd11 = slowMA11 - medMA11, smacd12 = slowMA12 - medMA12, smacd13 = slowMA13 - medMA13,


signal = ema(macd, signalLength)
//,signal1 = sma(macd1, signalLength),signal2 = sma(macd2, signalLength),signal3 = sma(macd3, signalLength),signal4 = sma(macd4, signalLength),signal5 = sma(macd5, signalLength),signal6 = sma(macd6, signalLength),signal7 = sma(macd7, signalLength),signal8 = sma(macd8, signalLength),signal9 = sma(macd9, signalLength),signal10 = sma(macd10, signalLength),signal11 = sma(macd11, signalLength),signal12 = sma(macd12, signalLength),signal13 = sma(macd13, signalLength),
fsignal = ema(fmacd, signalLength)
//, fsignal1 = sma(fmacd1, signalLength), fsignal2 = sma(fmacd2, signalLength), fsignal3 = sma(fmacd3, signalLength), fsignal4 = sma(fmacd4, signalLength), fsignal5 = sma(fmacd5, signalLength), fsignal6 = sma(fmacd6, signalLength), fsignal7 = sma(fmacd7, signalLength), fsignal8 = sma(fmacd8, signalLength), fsignal9 = sma(fmacd9, signalLength), fsignal10 = sma(fmacd10, signalLength), fsignal11 = sma(fmacd11, signalLength), fsignal12 = sma(fmacd12, signalLength), fsignal13 = sma(fmacd13, signalLength),
ssignal = ema(smacd, signalLength)
//, ssignal1 = sma(smacd1, signalLength), ssignal2 = sma(smacd2, signalLength), ssignal3 = sma(smacd3, signalLength), ssignal4 = sma(smacd4, signalLength), ssignal5 = sma(smacd5, signalLength), ssignal6 = sma(smacd6, signalLength), ssignal7 = sma(smacd7, signalLength), ssignal8 = sma(smacd8, signalLength), ssignal9 = sma(smacd9, signalLength), ssignal10 = sma(smacd10, signalLength), ssignal11 = sma(smacd11, signalLength), ssignal12 = sma(smacd12, signalLength), ssignal13 = sma(smacd13, signalLength),


ATR_Signal_Period = input(2, type=input.integer, minval=1, maxval=2000)


SetStopLossShort = 0.0
SetStopLossShort := if(strategy.position_size < 0)
    StopLossShort = shortStop
    min(StopLossShort,SetStopLossShort[1])


plot(SetStopLossShort, style = plot.style_cross, color = color.yellow)    


SetStopLossLong = 0.0
SetStopLossLong := if(strategy.position_size > 0)
    StopLossLong = longStop
    max(StopLossLong,SetStopLossLong[1])


plot(SetStopLossLong, style = plot.style_cross, color = color.purple)

ATR_SIGNAL_FINE_TUNE = input(0.986, type=input.float)  

tol_atr = atr(ATR_Signal_Period)*ATR_SIGNAL_FINE_TUNE

StopLoss_Initial_Short = input(1.00, type=input.float)
StopLoss_Initial_Long = input(5.00, type=input.float)



VOLUME_CHECK_SHORT = input(42)
VOLUME_CHECK_LONG = input(16)

MAX_LOSS = input(0.00, type=input.float)

//Custom Time Interval
fromMinute = input(defval = 0, title = "From Minute", minval = 0, maxval = 60)
fromHour = input(defval = 0, title = "From Hour", minval = 0, maxval = 24)
fromDay = input(defval = 1, title = "From Day", minval = 1)
fromMonth = input(defval = 1, title = "From Month", minval = 1)
fromYear = input(defval = 2019, title = "From Year", minval = 1900)
tillMinute = input(defval = 0, title = "Till Minute", minval = 0, maxval = 60)
tillHour = input(defval = 0, title = "Till Hour", minval = 0, maxval = 24)
tillDay = input(defval = 1, title = "Till Day", minval = 1)
tillMonth = input(defval = 1, title = "Till Month", minval = 1)
tillYear = input(defval = 2021, title = "Till Year", minval = 1900)
timestampStart = timestamp(fromYear,fromMonth,fromDay,fromHour,fromMinute)
timestampEnd = timestamp(tillYear,tillMonth,tillDay,tillHour,tillMinute)



if ( strategy.position_size <= 0 and ((fsignal[1] -fsignal) <= 0) and volume > VOLUME_CHECK_LONG and ( cross(signal, macd) or cross(signal[1], macd[1]) or cross(signal[2], macd[2]) or cross(signal[3], macd[3]) or cross(signal[4], macd[4]) or cross(signal[5], macd[5]) or cross(signal[6], macd[6]) or cross(signal[7], macd[7]) or  cross(signal[8], macd[8]) or  cross(signal[9], macd[9]) or  cross(signal[10], macd[10]) or  cross(signal[11], macd[11]) or  cross(signal[12], macd[12]) or  cross(signal[13], macd[13])  or cross(fmacd, macd) or cross(fmacd[1],macd[1]) or  cross(fmacd[2],macd[2]) or cross(fmacd[3],macd[3]) or cross(fmacd[4],macd[4])or cross(fsignal, fmacd)  or cross(fmacd, smacd) )  and (  (crossover(close,open+tol_atr) or crossover(close[1],open[1]+tol_atr[1]) or crossover(close[2],open[2]+tol_atr[2]) or crossover(close[3],open[3]+tol_atr[3]) or crossover(close[4],open[4]+tol_atr[4]) or crossover(close[5],open[5]+tol_atr[5]) or crossover(close[6],open[6]+tol_atr[6]) or crossover(close[7],open[7]+tol_atr[7]) or crossover(close[8],open[8]+tol_atr[8]) or crossover(close[9],open[9]+tol_atr[9]) or crossover(close[10],open[10]+tol_atr[10]) ) or ( (cross(ssignal, smacd) or cross(ssignal[1],smacd[1]) or cross(ssignal[2],smacd[2])) and ( (ssignal - ssignal[1]) > 0 ) ) )  )
    strategy.exit("SELL")
    strategy.entry("BUY", strategy.long)
    strategy.exit("BUY_STOP","BUY", stop = close - StopLoss_Initial_Long)
    

if ( (dir == -1 and dir[1] == 1 and dir[2] == 1 and dir[3] == 1 and dir[4] == 1 ) and strategy.position_size >= 0 and volume > VOLUME_CHECK_SHORT and ((fsignal[1] -fsignal) >= 0)  and (  crossunder(close, open - tol_atr) or crossunder(close[1], open[1] - tol_atr[1]) or crossunder(close[2], open[2] - tol_atr[2]) or crossunder(close[3], open[3] - tol_atr[3]) )  and ( cross(signal, macd) or cross(signal[1], macd[1]) or cross(signal[2], macd[2]) or cross(signal[3], macd[3]) or cross(signal[4], macd[4]) or cross(signal[5], macd[5]) or cross(signal[6], macd[6]) or cross(signal[7], macd[7]) or  cross(signal[8], macd[8]) or  cross(signal[9], macd[9]) or  cross(signal[10], macd[10]) or  cross(signal[11], macd[11])  or  cross(signal[12], macd[12]) or  cross(signal[13], macd[13])  )  )
    strategy.exit( "BUY")
    strategy.entry("SELL", strategy.short)
    strategy.exit("SELL_STOP","SELL", stop = close + StopLoss_Initial_Short)
    

strategy.close_all(when = strategy.openprofit <  (-1 * MAX_LOSS) )


// if (strategy.max_contracts_held_long > 0 )
//     strategy.exit("BUY_TRAIL_STOP","BUY", stop = longStop - StopLoss_Long_Adjust)
    
// if (strategy.max_contracts_held_short > 0 )    
//     strategy.exit("SELL_TRAIL_STOP","SELL", stop = shortStop + StopLoss_Short_Adjust)


    
    //strategy.exit("BUY_TRAIL_STOP","BUY", stop = SetStopLossLong)
    //strategy.exit("SELL_TRAIL_STOP","SELL", stop = SetStopLossShort)     
```

> Detail

https://www.fmz.com/strategy/427870

> Last Modified

2023-09-26 14:38:40
