
> Name

全方位自动交易移动平均彩虹策略Comprehensive-Automated-Trading-Moving-Average-Rainbow-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c89ff74fc5ab8f8d01.png)

[trans]

## 概述

全方位自动交易移动平均彩虹策略是一种典型的多时间周期移动平均线组合策略。它采用12条不同周期的移动平均线,通过移动平均线的排列顺序和价格的关系来判断行情走势方向,以及确定建仓、止损、止盈条件,实现自动交易。该策略可以自动识别趋势,并且有完善的止损机制来控制风险。

## 原理

该策略使用12条移动平均线,包括3周期、5周期、8周期一直到55周期,移动平均线类型可以选择EMA、SMA、RMA等。策略首先判断短周期和长周期移动平均线(1-4周期 Lines 和 5-8周期 Lines)的排列关系,如果短周期上方则判断为上涨趋势环境,如果短周期下方则判断为下跌趋势环境。

在上涨趋势中,如果价格突破上一个低点对应的移动平均线,就判断为符合建仓信号,做多;止损位于上一个低点对应的移动平均线,止盈距离止损的1.6倍。在下跌趋势中,如果价格突破上一个高点对应的移动平均线,就判断为符合建仓信号,做空;止损位于上一个高点对应的移动平均线,止盈距离止损的1.6倍。

该策略还具有趋势反转检测功能。在持仓期间,如果短周期移动平均线发生排列变化,同时价格超过最近一个高点或低点,则判断为可能发生了趋势反转,这时退出当前头寸,转换至相反方向头寸,以新的高点或低点作为止损和止盈位置。

## 优势

1. 该策略综合运用多重时间周期分析,能较好判断趋势方向。

2. 策略加入移动平均线顺逆排列关系判断,避免被震荡市场误导。

3. 策略具有完善的止损机制,可以有效控制单笔交易的风险。

4. 该策略具有趋势反转检测功能,可以及时捕捉趋势反转机会,降低系统性风险。

5. 该策略参数设置灵活,移动平均线周期和类型都可以自定义。

6. 策略采用跟踪止损方式,能锁定最大程度利润。

## 风险

1. 多重移动平均线组合策略,参数设置会影响策略表现,需要进行优化测试。

2. 震荡行情中,移动平均线将发出错误信号,应适当调整参数或暂时不交易。

3. 存在一定的滞后性,在趋势转折点附近可能会有错失良机的风险。

4. 需关注其他技术指标情况,避免在重要支撑位附近逢低开仓做空。

5. 系统性风险需要关注,反转检测机制并不能完全规避该风险。

6. 回撤控制需要加入额外机制,可以考虑加入动态仓位管理。

## 优化方向 

1. 测试不同类型移动平均线和参数设置,找到最佳组合。

2. 优化反转检测机制,设定更精确的反转触发条件。

3. 加入动态仓位管理机制,当回撤过大时降低仓位。

4. 考虑加入机器学习算法,利用大数据训练判断关键点位。

5. 结合其他指标信号进行综合判断,提高决策准确性。

6. 建立多品种交易 portfolio,利用非相关关系分散风险。

## 总结

全方位自动交易移动平均彩虹策略整体来说是一个扎实的趋势跟踪策略,具有较强的趋势识别能力和风险控制能力。通过参数优化、加入动态仓位管理等进一步优化,可以成为一个非常实用的量化交易策略。该策略思路清晰易懂,同时又具有一定的灵活性,值得深入研究使用和持续优化。

||

## Overview

The Comprehensive Automated Trading Moving Average Rainbow Strategy is a typical multi-timeframe moving average combination strategy. It uses 12 moving averages with different periods to determine the trend direction and define entry, stop loss and take profit conditions to implement automated trading. This strategy can automatically identify trends and has a complete stop loss mechanism to control risks.

## Principles 

This strategy uses 12 moving averages, including periods of 3, 5, 8 all the way to 55. The moving average type can be selected from EMA, SMA, RMA, etc. The strategy first judges the arrangement relationship between the short and long period moving averages (1-4 period Lines and 5-8 period Lines) to determine if it is an uptrend or downtrend environment.

In an uptrend, if the price breaks through the moving average corresponding to the previous low point, it is determined as a signal to go long. The stop loss is placed at the moving average corresponding to the previous low point, and the take profit is 1.6 times the stop loss. In a downtrend, if the price breaks through the moving average corresponding to the previous high point, it is determined as a signal to go short. The stop loss is placed at the moving average corresponding to the previous high point, and the take profit is 1.6 times the stop loss.

This strategy also has a trend reversal detection feature. During the holding period, if the short period moving average arrangement changes, and the price exceeds the most recent high or low point, it is determined that a trend reversal may have occurred. At this point it will exit the current position and enter a position in the opposite direction, using the new high or low point as the stop loss and take profit.

## Advantages

1. This strategy comprehensively applies multi-timeframe analysis to better determine the trend direction.

2. The addition of moving average sequential/reverse arrangement helps avoid being misled by ranging markets.

3. The strategy has a complete stop loss mechanism to effectively control the risk of each trade.

4. The strategy has trend reversal detection to capture reversal opportunities and reduce systemic risks.

5. The strategy has flexible parameter settings where moving average periods and types can be customized.

6. The strategy uses a trailing stop loss to lock in maximum profits.

## Risks

1. Multi-moving average combination strategies, parameter settings will affect performance and need optimization testing.

2. Moving averages may give false signals in ranging markets, parameters should be adjusted or stop trading temporarily.

3. There is some lag, risks of missing opportunities around trend turning points.

4. Need to watch other technical indicators, avoid going short near important support levels.

5. Systemic risks need monitoring, reversal detection cannot completely avoid such risks. 

6. Drawdown control needs additional mechanisms, consider dynamic position sizing.

## Optimization Directions

1. Test different moving average types and parameter settings to find the optimal combination.

2. Optimize the reversal detection mechanism, set more precise reversal trigger conditions.

3. Add dynamic position sizing to reduce position size when drawdown gets too high.

4. Consider incorporating machine learning algorithms, using big data to train judgement of key points.

5. Incorporate other indicator signals for combined judgement to improve accuracy.

6. Build a multi-instrument trading portfolio to diversify risks using low correlations.

## Summary

The Comprehensive Automated Trading Moving Average Rainbow Strategy is overall a solid trend following strategy, with strong abilities in trend identification and risk control. With further optimizations such as parameter tuning, adding dynamic position sizing etc., it can become a very practical quantitative trading strategy. The strategy logic is clear and easy to understand, while also having certain flexibility, making it worthwhile for in-depth research, usage and continuous improvement.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|(?Moving Averages/Médias Móveis)Moving Average Type/Tipo de Média Móvel: EMA|SMA|RMA|WMA|HMA|VWMA|
|v_input_int_1|3|MA #1|
|v_input_int_2|5|MA #2|
|v_input_int_3|8|MA #3|
|v_input_int_4|13|MA #4|
|v_input_int_5|20|MA #5|
|v_input_int_6|25|MA #6|
|v_input_int_7|30|MA #7|
|v_input_int_8|35|MA #8|
|v_input_int_9|40|MA #9|
|v_input_int_10|45|MA #10|
|v_input_int_11|50|MA #11|
|v_input_int_12|55|MA #12|
|v_input_float_1|1.6|(?Risk Management/Gerenciamento de Risco)Target Take Profit/Objetivo de Lucro Alvo|
|v_input_bool_1|true|(?Turnover Trend/Rotatividade Tendência)Verify Turnover Trend/Verificar Tendência de Rotatividade|
|v_input_bool_2|false|(?Turnover Signal/Rotatividade Sinal)Verify Turnover Signal/Verificar Sinal de Rotatividade|
|v_input_bool_3|false|Verify Price Exit Turnover Signal/Verificar Saída de Preço Sinal de Rotatividade|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-13 00:00:00
end: 2023-11-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © AugustoErni

//@version=5
strategy('Moving Average Rainbow (Stormer)', overlay=true)

maType                        = input.string('EMA', title='Moving Average Type/Tipo de Média Móvel', options=['EMA', 'SMA', 'RMA', 'WMA', 'HMA', 'VWMA'], tooltip='This option is to select the type of Moving Average that the Rainbow will use./Esta opção é para selecionar o tipo de Média Móvel que o Rainbow utilizará.', group='Moving Averages/Médias Móveis')
maLengthFirst                 = input.int(3, title='MA #1', minval=1, step=1, tooltip='First MA length./Comprimento da primeira MA.', group='Moving Averages/Médias Móveis')
maLengthSecond                = input.int(5, title='MA #2', minval=1, step=1, tooltip='Second MA length./Comprimento da segunda MA.', group='Moving Averages/Médias Móveis')
maLengthThird                 = input.int(8, title='MA #3', minval=1, step=1, tooltip='Third MA length./Comprimento da terceira MA.', group='Moving Averages/Médias Móveis')
maLengthFourth                = input.int(13, title='MA #4', minval=1, step=1, tooltip='Fourth MA length./Comprimento da quarta MA.', group='Moving Averages/Médias Móveis')
maLengthFifth                 = input.int(20, title='MA #5', minval=1, step=1, tooltip='Fifth MA length./Comprimento da quinta MA.', group='Moving Averages/Médias Móveis')
maLengthSixth                 = input.int(25, title='MA #6', minval=1, step=1, tooltip='Sixth MA length./Comprimento da sexta MA.', group='Moving Averages/Médias Móveis')
maLengthSeventh               = input.int(30, title='MA #7', minval=1, step=1, tooltip='Seventh MA length./Comprimento da sétima MA.', group='Moving Averages/Médias Móveis')
maLengthEighth                = input.int(35, title='MA #8', minval=1, step=1, tooltip='Eighth MA length./Comprimento da oitava MA.', group='Moving Averages/Médias Móveis')
maLengthNineth                = input.int(40, title='MA #9', minval=1, step=1, tooltip='Nineth MA length./Comprimento da nona MA.', group='Moving Averages/Médias Móveis')
maLengthTenth                 = input.int(45, title='MA #10', minval=1, step=1, tooltip='Tenth MA length./Comprimento da décima MA.', group='Moving Averages/Médias Móveis')
maLengthEleventh              = input.int(50, title='MA #11', minval=1, step=1, tooltip='Eleventh MA length./Comprimento da décima primeira MA.', group='Moving Averages/Médias Móveis')
maLengthTwelveth              = input.int(55, title='MA #12', minval=1, step=1, tooltip='Twelveth MA length./Comprimento da décima segunda MA.', group='Moving Averages/Médias Móveis')
targetFactor                  = input.float(1.6, title='Target Take Profit/Objetivo de Lucro Alvo', minval=0.1, step=0.1, tooltip='Calculate the take profit factor when entry position./Calcula o fator do alvo lucro ao entrar na posição.', group='Risk Management/Gerenciamento de Risco')
verifyTurnoverTrend           = input.bool(true, title='Verify Turnover Trend/Verificar Tendência de Rotatividade', tooltip='This option checks for a supposedly turnover trend and setup new target (for long is the highest high and for short is the lowest low identified)./Esta opção verifica uma suposta tendência de rotatividade e estabelece um novo objetivo (para long é a máxima mais alta, para short é a mínima mais baixa identificados).', group='Turnover Trend/Rotatividade Tendência')
verifyTurnoverSignal          = input.bool(false, title='Verify Turnover Signal/Verificar Sinal de Rotatividade', tooltip='This option checks for a supposedly turnover signal, closing the current position and opening a new one (for long it will close and open a new for short, for short it will close and open a new for long)./Essa opção verifica um sinal de possível reversão, fechando a posição atual e abrindo uma nova (para long fechará e abrirá uma nova para short, para short fechará e abrirá uma nova para long).', group='Turnover Signal/Rotatividade Sinal')
verifyTurnoverSignalPriceExit = input.bool(false, title='Verify Price Exit Turnover Signal/Verificar Saída de Preço Sinal de Rotatividade', tooltip='This option complements "turnover signal" by veryfing the price if profitable before exiting the current position./Esta opção complementa o "sinal de rotatividade" verificando o preço do lucro antes de sair da posição atual.', group='Turnover Signal/Rotatividade Sinal')

mas(maType, maLengthFirst, maLengthSecond, maLengthThird, maLengthFourth, maLengthFifth, maLengthSixth, maLengthSeventh, maLengthEighth, maLengthNineth, maLengthTenth, maLengthEleventh, maLengthTwelveth) =>
    if (maType == 'SMA')
        [ta.sma(close, maLengthFirst), ta.sma(close, maLengthSecond), ta.sma(close, maLengthThird), ta.sma(close, maLengthFourth), ta.sma(close, maLengthFifth), ta.sma(close, maLengthSixth), ta.sma(close, maLengthSeventh), ta.sma(close, maLengthEighth), ta.sma(close, maLengthNineth), ta.sma(close, maLengthTenth), ta.sma(close, maLengthEleventh), ta.sma(close, maLengthTwelveth)]
    else if (maType == 'RMA')
        [ta.rma(close, maLengthFirst), ta.rma(close, maLengthSecond), ta.rma(close, maLengthThird), ta.rma(close, maLengthFourth), ta.rma(close, maLengthFifth), ta.rma(close, maLengthSixth), ta.rma(close, maLengthSeventh), ta.rma(close, maLengthEighth), ta.rma(close, maLengthNineth), ta.rma(close, maLengthTenth), ta.rma(close, maLengthEleventh), ta.rma(close, maLengthTwelveth)]
    else if (maType == 'WMA')
        [ta.wma(close, maLengthFirst), ta.wma(close, maLengthSecond), ta.wma(close, maLengthThird), ta.wma(close, maLengthFourth), ta.wma(close, maLengthFifth), ta.wma(close, maLengthSixth), ta.wma(close, maLengthSeventh), ta.wma(close, maLengthEighth), ta.wma(close, maLengthNineth), ta.wma(close, maLengthTenth), ta.wma(close, maLengthEleventh), ta.wma(close, maLengthTwelveth)]
    else if (maType == 'HMA')
        [ta.hma(close, maLengthFirst), ta.hma(close, maLengthSecond), ta.hma(close, maLengthThird), ta.hma(close, maLengthFourth), ta.hma(close, maLengthFifth), ta.hma(close, maLengthSixth), ta.hma(close, maLengthSeventh), ta.hma(close, maLengthEighth), ta.hma(close, maLengthNineth), ta.hma(close, maLengthTenth), ta.hma(close, maLengthEleventh), ta.hma(close, maLengthTwelveth)]
    else if (maType == 'VWMA')
        [ta.vwma(close, maLengthFirst), ta.vwma(close, maLengthSecond), ta.vwma(close, maLengthThird), ta.vwma(close, maLengthFourth), ta.vwma(close, maLengthFifth), ta.vwma(close, maLengthSixth), ta.vwma(close, maLengthSeventh), ta.vwma(close, maLengthEighth), ta.vwma(close, maLengthNineth), ta.vwma(close, maLengthTenth), ta.vwma(close, maLengthEleventh), ta.vwma(close, maLengthTwelveth)]
    else
        [ta.ema(close, maLengthFirst), ta.ema(close, maLengthSecond), ta.ema(close, maLengthThird), ta.ema(close, maLengthFourth), ta.ema(close, maLengthFifth), ta.ema(close, maLengthSixth), ta.ema(close, maLengthSeventh), ta.ema(close, maLengthEighth), ta.ema(close, maLengthNineth), ta.ema(close, maLengthTenth), ta.ema(close, maLengthEleventh), ta.ema(close, maLengthTwelveth)]

[ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8, ma9, ma10, ma11, ma12] = mas(maType, maLengthFirst, maLengthSecond, maLengthThird, maLengthFourth, maLengthFifth, maLengthSixth, maLengthSeventh, maLengthEighth, maLengthNineth, maLengthTenth, maLengthEleventh, maLengthTwelveth)

maTouchPriceTrend(ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8, ma9, ma10, ma11, ma12, trend) =>
    var float touchPrice = na
    if (trend == 'UPTREND')
        if (low <= ma1 and low >= ma2)
            touchPrice := ma2
        else if (low <= ma2 and low >= ma3)
            touchPrice := ma3
        else if (low <= ma3 and low >= ma4)
            touchPrice := ma4
        else if (low <= ma4 and low >= ma5)
            touchPrice := ma5
        else if (low <= ma5 and low >= ma6)
            touchPrice := ma6
        else if (low <= ma6 and low >= ma7)
            touchPrice := ma7
        else if (low <= ma7 and low >= ma8)
            touchPrice := ma8
        else if (low <= ma8 and low >= ma9)
            touchPrice := ma9
        else if (low <= ma9 and low >= ma10)
            touchPrice := ma10
        else if (low <= ma10 and low >= ma11)
            touchPrice := ma11
        else if (low <= ma11 and low >= ma12)
            touchPrice := ma12
        else
            touchPrice := na
    else if (trend == 'DOWNTREND')
        if (high >= ma1 and high <= ma2)
            touchPrice := ma2
        else if (high >= ma2 and high <= ma3)
            touchPrice := ma3
        else if (high >= ma3 and high <= ma4)
            touchPrice := ma4
        else if (high >= ma4 and high <= ma5)
            touchPrice := ma5
        else if (high >= ma5 and high <= ma6)
            touchPrice := ma6
        else if (high >= ma6 and high <= ma7)
            touchPrice := ma7
        else if (high >= ma7 and high <= ma8)
            touchPrice := ma8
        else if (high >= ma8 and high <= ma9)
            touchPrice := ma9
        else if (high >= ma9 and high <= ma10)
            touchPrice := ma10
        else if (high >= ma10 and high <= ma11)
            touchPrice := ma11
        else if (high >= ma11 and high <= ma12)
            touchPrice := ma12
        else
            touchPrice := na

maMean = ((ma1 + ma2 + ma3 + ma4 + ma5 + ma6 + ma7 + ma8 + ma9 + ma10 + ma11 + ma12) / 12)

isMa1To4Above            = ma1 > ma2 and ma2 > ma3 and ma3 > ma4 ? 1 : 0
isMa1To4Below            = ma1 < ma2 and ma2 < ma3 and ma3 < ma4 ? 1 : 0
isMa5To8Above            = ma5 > ma6 and ma6 > ma7 and ma7 > ma8 ? 1 : 0
isMa5To8Below            = ma5 < ma6 and ma6 < ma7 and ma7 < ma8 ? 1 : 0
isCloseGreaterMaMean     = close > maMean ? 1 : 0
isCloseLesserMaMean      = close < maMean ? 1 : 0
isCurHighGreaterPrevHigh = high > high[1] ? 1 : 0
isCurLowLesserPrevLow    = low < low[1] ? 1 : 0
isMaUptrend              = isCloseGreaterMaMean and isMa5To8Above ? 1 : 0
isMaDowntrend            = isCloseLesserMaMean and isMa5To8Below ? 1 : 0
isUptrend                = isMaUptrend ? 'UPTREND' : na
isDowntrend              = isMaDowntrend ? 'DOWNTREND' : na

curTouchPriceUptrend    = maTouchPriceTrend(ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8, ma9, ma10, ma11, ma12, isUptrend)
prevTouchPriceUptrend   = curTouchPriceUptrend[1]
curTouchPriceDowntrend  = maTouchPriceTrend(ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8, ma9, ma10, ma11, ma12, isDowntrend)
prevTouchPriceDowntrend = curTouchPriceDowntrend[1]

isPrevTouchPriceUptrendTouched   = prevTouchPriceUptrend > 0.0 or not na(prevTouchPriceUptrend) ? 1 : 0
isPrevTouchPriceDowntrendTouched = prevTouchPriceDowntrend > 0.0 or not na(prevTouchPriceDowntrend) ? 1 : 0
isPrevTouchedPriceUptrend        = isPrevTouchPriceUptrendTouched and isMaUptrend ? 1 : 0
isPrevTouchedPriceDowntrend      = isPrevTouchPriceDowntrendTouched and isMaDowntrend ? 1 : 0

isPositionFlat  = strategy.position_size == 0 ? 1 : 0

var float positionEntryPrice         = na
var bool positionIsEntryLong         = false
var bool positionIsEntryShort        = false
var float longPositionHighestHigh    = na
var float shortPositionLowestLow     = na
var float stopLossLong               = na
var float stopLossShort              = na
var float targetLong                 = na
var float targetShort                = na
var bool isTurnoverTrendLongTrigger  = na
var bool isTurnoverTrendShortTrigger = na

isPositionLongClose  = na(positionEntryPrice) and not positionIsEntryLong ? 1 : 0
isPositionShortClose = na(positionEntryPrice) and not positionIsEntryShort ? 1 : 0
isLongCondition      = isMaUptrend and isCurHighGreaterPrevHigh and isPrevTouchedPriceUptrend ? 1 : 0
isShortCondition     = isMaDowntrend and isCurLowLesserPrevLow and isPrevTouchedPriceDowntrend ? 1 : 0
longTurnoverExit     = verifyTurnoverSignal and verifyTurnoverSignalPriceExit ? (verifyTurnoverSignal and isLongCondition and positionIsEntryShort and close < positionEntryPrice) : verifyTurnoverSignal ? (verifyTurnoverSignal and isLongCondition and positionIsEntryShort) : na
shortTurnoverExit    = verifyTurnoverSignal and verifyTurnoverSignalPriceExit ? (verifyTurnoverSignal and isShortCondition and positionIsEntryLong and close > positionEntryPrice) : verifyTurnoverSignal ? (verifyTurnoverSignal and isShortCondition and positionIsEntryLong) : na

if (isPositionFlat)
    positionEntryPrice          := na
    positionIsEntryLong         := false
    positionIsEntryShort        := false
    stopLossLong                := na
    targetLong                  := na
    stopLossShort               := na
    targetShort                 := na
    isTurnoverTrendLongTrigger  := na
    isTurnoverTrendShortTrigger := na

if ((isLongCondition and isPositionLongClose) or longTurnoverExit)
    positionEntryPrice          := close
    positionIsEntryLong         := true
    positionIsEntryShort        := false
    longPositionHighestHigh     := na
    shortPositionLowestLow      := na
    isTurnoverTrendLongTrigger  := na
    isTurnoverTrendShortTrigger := na
    stopLossLong                := prevTouchPriceUptrend
    if (isCurLowLesserPrevLow)
        curLowToucedPrice = na(curTouchPriceUptrend) ? low : curTouchPriceUptrend
        stopLossLong      := na(curTouchPriceUptrend) ? ((stopLossLong + curLowToucedPrice) / 2) : curLowToucedPrice
    targetLong := (positionEntryPrice + (math.abs(positionEntryPrice - stopLossLong) * targetFactor))
    if (targetLong > 0 and stopLossLong > 0)
        alertMessage = '{ "side/lado": "buy", "entry/entrada": ' + str.tostring(positionEntryPrice) + ', "stop": ' + str.tostring(stopLossLong) + ', "target/alvo": ' + str.tostring(targetLong) + ' }'
        alert(alertMessage)
        strategy.entry('Long', strategy.long)
        strategy.exit('Exit Long', 'Long', stop=stopLossLong, limit=targetLong)

if ((isShortCondition and isPositionShortClose) or shortTurnoverExit)
    positionEntryPrice          := close
    positionIsEntryLong         := false
    positionIsEntryShort        := true
    longPositionHighestHigh     := na
    shortPositionLowestLow      := na
    isTurnoverTrendLongTrigger  := na
    isTurnoverTrendShortTrigger := na
    stopLossShort               := prevTouchPriceDowntrend
    if (isCurHighGreaterPrevHigh)
        curHighToucedPrice = na(curTouchPriceDowntrend) ? high : curTouchPriceDowntrend
        stopLossShort      := na(curTouchPriceDowntrend) ? ((stopLossShort + curHighToucedPrice) / 2) : curHighToucedPrice
    targetShort := (positionEntryPrice - (math.abs(positionEntryPrice - stopLossShort) * targetFactor))
    if (targetShort > 0 and stopLossShort > 0)
        alertMessage = '{ "side/lado": "sell", "entry/entrada": ' + str.tostring(positionEntryPrice) + ', "stop": ' + str.tostring(stopLossShort) + ', "target/alvo": ' + str.tostring(targetShort) + ' }'
        alert(alertMessage)
        strategy.entry('Short', strategy.short)
        strategy.exit('Exit Short', 'Short', stop=stopLossShort, limit=targetShort)

if (verifyTurnoverTrend and positionIsEntryLong)
    curHighestHigh = high
    if (curHighestHigh > longPositionHighestHigh or na(longPositionHighestHigh))
        longPositionHighestHigh := curHighestHigh
    if (isMa1To4Below and isCloseLesserMaMean and longPositionHighestHigh > positionEntryPrice)
        isTurnoverTrendLongTrigger := true
        alertMessage = '{ "side/lado": "buy", "stop": ' + str.tostring(stopLossLong) + ', "target/alvo": ' + str.tostring(longPositionHighestHigh) + ', "new setup/nova definição": ' + str.tostring(isTurnoverTrendLongTrigger) + ' }'
        alert(alertMessage)
        strategy.exit('Exit Long', 'Long', stop=stopLossLong, limit=longPositionHighestHigh)

if (verifyTurnoverTrend and positionIsEntryShort)
    curLowestLow = low
    if (curLowestLow < shortPositionLowestLow or na(shortPositionLowestLow))
        shortPositionLowestLow := curLowestLow
    if (isMa1To4Above and isCloseGreaterMaMean and shortPositionLowestLow < positionEntryPrice)
        isTurnoverTrendShortTrigger := true
        alertMessage = '{ "side/lado": "sell", "stop": ' + str.tostring(stopLossShort) + ', "target/alvo": ' + str.tostring(shortPositionLowestLow) + ', "new setup/nova definição": ' + str.tostring(isTurnoverTrendShortTrigger) + ' }'
        alert(alertMessage)
        strategy.exit('Exit Short', 'Short', stop=stopLossShort, limit=shortPositionLowestLow)

plot(ma1, title='1st Moving Average', color=color.rgb(240, 240, 240))
plot(ma2, title='2nd Moving Average', color=color.rgb(220, 220, 220))
plot(ma3, title='3rd Moving Average', color=color.rgb(200, 200, 200))
plot(ma4, title='4th Moving Average', color=color.rgb(180, 180, 180))
plot(ma5, title='5th Moving Average', color=color.rgb(160, 160, 160))
plot(ma6, title='6th Moving Average', color=color.rgb(140, 140, 140))
plot(ma7, title='7th Moving Average', color=color.rgb(120, 120, 120))
plot(ma8, title='8th Moving Average', color=color.rgb(100, 120, 120))
plot(ma9, title='9th Moving Average', color=color.rgb(80, 120, 120))
plot(ma10, title='10th Moving Average', color=color.rgb(60, 120, 120))
plot(ma11, title='11th Moving Average', color=color.rgb(40, 120, 120))
plot(ma12, title='12th Moving Average', color=color.rgb(20, 120, 120))

tablePosition    = position.bottom_right
tableColumns     = 2
tableRows        = 7
tableFrameWidth  = 1
tableBorderColor = color.gray
tableBorderWidth = 1
tableInfoTrade   = table.new(position=tablePosition, columns=tableColumns, rows=tableRows, frame_width=tableFrameWidth, border_color=tableBorderColor, border_width=tableBorderWidth)

table.cell(table_id=tableInfoTrade, column=0, row=0)
table.cell(table_id=tableInfoTrade, column=1, row=0)

table.cell(table_id=tableInfoTrade, column=0, row=1, text='Entry Side/Lado da Entrada', text_color=color.white)
table.cell(table_id=tableInfoTrade, column=0, row=2, text=positionIsEntryLong ? 'LONG' : positionIsEntryShort ? 'SHORT' : 'NONE/NENHUM', text_color=color.yellow)

table.cell(table_id=tableInfoTrade, column=1, row=1, text='Entry Price/Preço da Entrada', text_color=color.white)
table.cell(table_id=tableInfoTrade, column=1, row=2, text=not na(positionEntryPrice) ? str.tostring(positionEntryPrice) : 'NONE/NENHUM', text_color=color.blue)

table.cell(table_id=tableInfoTrade, column=0, row=3, text='Take Profit Price/Preço Alvo Lucro', text_color=color.white)
table.cell(table_id=tableInfoTrade, column=0, row=4, text=positionIsEntryLong ? str.tostring(targetLong) : positionIsEntryShort ? str.tostring(targetShort) : 'NONE/NENHUM', text_color=color.green)

table.cell(table_id=tableInfoTrade, column=1, row=3, text='Stop Loss Price/Preço Stop Loss', text_color=color.white)
table.cell(table_id=tableInfoTrade, column=1, row=4, text=positionIsEntryLong ? str.tostring(stopLossLong) : positionIsEntryShort ? str.tostring(stopLossShort) : 'NONE/NENHUM', text_color=color.red)

table.cell(table_id=tableInfoTrade, column=0, row=5, text='New Target/Novo Alvo', text_color=color.white)
table.cell(table_id=tableInfoTrade, column=0, row=6, text=verifyTurnoverTrend and positionIsEntryLong and isTurnoverTrendLongTrigger ? str.tostring(longPositionHighestHigh) : verifyTurnoverTrend and positionIsEntryShort and isTurnoverTrendShortTrigger ? str.tostring(shortPositionLowestLow) : 'NONE/NENHUM', text_color=color.green)

table.cell(table_id=tableInfoTrade, column=1, row=5, text='Possible Market Turnover/Possível Virada do Mercado', text_color=color.white)
table.cell(table_id=tableInfoTrade, column=1, row=6, text=verifyTurnoverTrend and positionIsEntryLong and isTurnoverTrendLongTrigger ? 'YES/SIM (Possible long going short/Possível long indo short)' : verifyTurnoverTrend and positionIsEntryShort and isTurnoverTrendShortTrigger ? 'YES/SIM (Possible short going long/Possível short indo long)' : 'NONE/NENHUM', text_color=color.red)

```

> Detail

https://www.fmz.com/strategy/431898

> Last Modified

2023-11-13 10:44:41
