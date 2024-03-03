
> Name

基于多尺度唐奇逐步通道的交易策略Donchain-Channel-Based-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/91010e376227ee5268.png)
[trans]
## 概述

这是一个利用多时间尺度的唐奇通道来判断入场和出场点的交易策略。策略的主要思想是:在较长时间尺度上判断趋势方向,找到入场时机;在较短时间尺度上判断趋势反转,找到出场时机。

## 策略原理

该策略主要利用唐奇通道的概念。唐奇通道由通道上沿、下沿和中线组成。通道宽度随时间尺度而变化。我们在这里采用不同的时间尺度构建唐奇通道,具体来说:

1. 使用52周期构建较长时间尺度的唐奇通道,得到通道上沿、下沿和中线
2. 使用12周期构建较短时间尺度的唐奇通道,得到通道上沿、下沿和中线

入场逻辑:当价格突破较长时间尺度通道的上沿时,判断为多头入场时机。为了避免假突破,我们要求最近3根K线中至少有1根K线收盘价高于该K线的通道上沿,这样可以避免短期过度扩展造成的假突破。

出场逻辑:当价格跌破较短时间尺度通道的下沿时,判断为平仓出场时机。我们同样要求最近3根K线中至少有1根K线收盘价低于该K线的通道下沿,这样可以确认突破的有效性,避免被套。

## 策略优势

1. 该策略融合了趋势跟踪和反转交易的优点。较长时间尺度判断趋势方向,较短时间尺度判断局部反转,两者结合可以在趋势中捕捉局部波动。

2. 运用多时间尺度分析,可以比较好地处理假突破的问题,使得入场和出场更加明确有效。

3. 通过参数优化,可以适应不同品种和市场环境。

## 风险及解决

1. 该策略对参数较为敏感,不同参数可能会得到完全不同的结果。需要充分测试优化以找到最佳参数组合。 

2. 在震荡行情中,策略可能会产生大量的交易信号,导致过度交易。可以通过配置止损来控制单笔损失。

3. 策略没有考虑大级别的趋势判断逻辑,在牛熊转换点可能失败。可以结合其他指标判断大级别走势。

## 优化方向

1. 进行参数优化,找到最佳参数组合。优化周期长度、通道类型等参数。

2. 增加止损逻辑。配置合理的移动止损,控制单笔损失。

3. 结合其它指标判断大级别趋势。例如EMA,K线通道,麦克指标等。避免在关键转折点失败。

## 总结

该策略总体来说是一种典型的多时间尺度通道突破策略。它很好地融合了趋势跟踪和反转交易的优点,通过不同时间尺度的通道判断来实现在趋势中捕捉局部波动的效果。如果参数优化到位,在趋势明显的市场中效果优异。但策略本身比较脆弱,对参数和把握整体走势的判断都很敏感。建议与其他大级别交易策略或指标组合使用,以取得更好的效果。

||

## Overview

This is a trading strategy that utilizes Donchain channels over multiple timeframes to determine entry and exit points. The core idea is to judge the trend direction on a longer timeframe for entry signals, and look for trend reversals on a shorter timeframe for exit signals.  

## Strategy Logic

The strategy mainly leverages the concept of Donchain channels, which consists of the channel tops, bottoms and midlines. The channel width varies over different timeframes. Specifically, we construct Donchain channels over two timescales:

1. Use 52 periods to construct a longer-term Donchain channel and obtain its top, bottom and midline.  

2. Use 12 periods to construct a shorter-term Donchain channel and obtain its top, bottom and midline.

Entry logic: When price breaks above the longer-term channel top, we determine it as a long entry signal. To avoid false breakouts, we require at least 1 candle in the recent 3 closed above its channel top.  

Exit logic: When price breaks below the shorter-term channel bottom, we determine it as an exit signal to close long positions. Similarly, we require at least 1 candle in the recent 3 closed below its channel bottom to confirm the validity of the breakdown.

## Advantages

1. The strategy combines the merits of both trend following and mean reversion trading. The longer timeframe judges the trend while the shorter timeframe captures local reversals within the trend.  

2. Using multi-timeframe analysis helps address issues with false breakouts and makes entries/exits more valid. 

3. Parameters can be optimized for different products and market regimes.

## Risks & Solutions

1. The strategy is sensitive to parameters. Different parameters may lead to drastically different results. Adequate testing and optimization is needed to find the optimal parameter set.  

2. It may trigger excessive trades in ranging markets. A stop loss should be used to control single trade loss.

3. It does not consider the overall market regime. May fail at major trend reversal points. Other indicators should be used to gauge the major trend.

## Optimization Directions 

1. Conduct parameter optimization to find the best parameters, including channel periods, channel types etc.  

2. Incorporate stop loss logic with reasonable trailing stops to control loss.

3. Combine other indicators to determine major trend, such as EMA, Keltner Channels, MACD etc, avoiding failures at key turning points.


## Conclusion

In summary, this is a typical multi-timeframe Donchain channel breakout strategy. It integrates both trend following and mean reversion nicely to capture local reversals within trends. With optimized parameters, it can perform very well in trending markets. However, the strategy itself is fragile, sensitive to parameters and overall market regime. It is recommended to combine with other strategies or indicators to achieve more robust results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|21|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-20 00:00:00
end: 2024-02-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © venkyrocker7777

//@version=5

strategy('Donchain channel based investment strategy', shorttitle='Donchain channel strategy', overlay=true)

Length = input.int(21, minval=1)
xPrice = close
xvnoise = math.abs(xPrice - xPrice[1])
nAMA = 0.0
nfastend = 0.666
nslowend = 0.0645
nsignal = math.abs(xPrice - xPrice[Length])
nnoise = math.sum(xvnoise, Length)
nefratio = nnoise != 0 ? nsignal / nnoise : 0
nsmooth = math.pow(nefratio * (nfastend - nslowend) + nslowend, 2)
nAMA := nz(nAMA[1]) + nsmooth * (xPrice - nz(nAMA[1]))
plot(nAMA, color=color.new(color.blue, 0), title='KAMA')

// Function to get Lower Channel, Upper Channel, Middle Channel for a period length
getLCUCMC(PeriodLength) =>
    lowestValueInThePeriod = ta.lowest(PeriodLength)  // LC
    highestValueInThePeriod = ta.highest(PeriodLength)  // UC
    middleChannelInTheperiod = math.avg(highestValueInThePeriod, lowestValueInThePeriod)  // MC
    // Returns Lower Channel, Upper Channel, Middle Channel for a period length
    [lowestValueInThePeriod, highestValueInThePeriod, middleChannelInTheperiod]

// Longer time frame for entry
longerPeriod = 52

// Shorter time frame for exit
shorterPeriod = 12

if timeframe.period == 'D'
    // Longer time frame for entry
    longerPeriod := 52 * 5

    // Shorter time frame for exit
    shorterPeriod := 12 * 5
    shorterPeriod

if timeframe.period == 'M'
    // Longer time frame for entry
    longerPeriod := 12

    // Shorter time frame for exit
    shorterPeriod := 3
    shorterPeriod

// Get Lower Channel, Upper Channel, Middle Channel for longerPeriod, shorterPeriod
[lowestValueInTheLongerPeriodLength, highestValueInTheLongerPeriodLength, middleChannelInLongerperiod] = getLCUCMC(longerPeriod)
[lowestValueInTheShorterPeriodLength, highestValueInTheShorterPeriodLength, middleChannelInShorterperiod] = getLCUCMC(shorterPeriod)


// Plot Upper Channel of longerPeriod in dark green
plot(highestValueInTheLongerPeriodLength, 'highestValueInTheLongerPeriodLength', color=color.new(color.green, 0))

// Plot Lower Channel of shorterPeriod in dark red
plot(lowestValueInTheShorterPeriodLength, 'lowestValueInTheShorterPeriodLength', color=color.new(color.red, 0))

// Entry Plan
// Will start to see if we can enter when high crosses up longer period high (high >= highestValueInTheLongerPeriodLength)
// Check if any of the three past candles and enter when any of the 3 past candles satisfy
// 1) high of that candle >= highestValueInTheLongerPeriodLength of that candle (high[i] >= highestValueInTheLongerPeriodLength[i])
// 2) close of entry point consideration candle is above close of that candle (close > close[i])
isThisPointAnEntry() =>
// Check last 3 bars
    isThisPointAnEntry = false
    offset = 0
    for i = 1 to 3 by 1
        isCurrentCandleALongerPeriodHigh = high >= highestValueInTheLongerPeriodLength
        isCurrentCandleCloseGreaterThanPreiousIthOne = close > close[i]
        isPreviousIthCandleAlsoALongerPeriodHigh = high[i] >= highestValueInTheLongerPeriodLength[i]
        isThisPointAnEntry := isCurrentCandleALongerPeriodHigh and isCurrentCandleCloseGreaterThanPreiousIthOne and isPreviousIthCandleAlsoALongerPeriodHigh
        if isThisPointAnEntry
            offset := -i
            break
    [isThisPointAnEntry, offset]

// Exit Plan - same as entry plan, with things reversed and also on a shorter time frame
// Will start to see if we should exit when low crosses down longer period low (low <= lowestValueInTheShorterPeriodLength)
// Check if any of the three past candles and exit when any of the 3 past candles satisfy
// 1) low of that candle <= highestValueInTheLongerPeriodLength of that candle (low[i] <= lowestValueInTheShorterPeriodLength[i])
// 2) close of exit point consideration candle is below close of that candle (close < close[i])
isThisPointAnExit() =>
// Check last 3 bars
    isThisPointAnExit = false
    for i = 1 to 3 by 1
        isCurrentCandleAShorterPeriodLow = low <= lowestValueInTheShorterPeriodLength
        isCurrentCandleCloseLesserThanPreiousIthOne = close < close[i]
        isPreviousIthCandleAlsoAShorterPeriodLow = low[i] <= lowestValueInTheShorterPeriodLength[i]
        isThisPointAnExit := isCurrentCandleAShorterPeriodLow and isCurrentCandleCloseLesserThanPreiousIthOne and isPreviousIthCandleAlsoAShorterPeriodLow
        break
    isThisPointAnExit

[isEntry, offset] = isThisPointAnEntry()


if isEntry
    strategy.entry('Buy', strategy.long)

strategy.close_all(when=isThisPointAnExit() == true)

if year(timenow) == year(time) and month(timenow) == month(time) and dayofmonth(timenow) - 2 == dayofmonth(time)
    strategy.close_all()


```

> Detail

https://www.fmz.com/strategy/442936

> Last Modified

2024-02-27 14:57:37
