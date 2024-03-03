
> Name

交易心理控制均衡策略Trading-Psychology-Balancing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1af9cd959d17abd59eb.png)
[trans]
## 概述

此策略的目的是通过设置不同的参数,平衡交易者的心理和交易表现,以获得更稳定的回报。它使用均线、布林带、Keltner通道等指标判断市场趋势和波动率,结合PSAR指标判断反转信号,采用TTM挤压指标判断动量。交易信号由这些指标组合产生。同时,策略采用高低止损和风险回报止盈方式管理风险。

## 策略原理  

该策略的主要逻辑如下:

1. 判断趋势:采用EMA均线判断价格趋势方向,价格在EMA上方为涨势,下方为跌势

2. 判断反转:采用PSAR判断价格反转点。PSAR点出现在价格上方为看涨信号,出现在价格下方为看跌信号

3. 判断动量:采用TTM Squeeze指标判断市场的波动率和动量。TTM Squeeze指标通过比较布林带和Keltner通道的宽度来测量波动率,挤压意味着波动率极低。挤压解除则意味着波动率增加和价格即将产生较大方向性移动的信号

4. 产生交易信号:当价格上穿EMA均线、PSAR点,并且TTM Squeeze 指标解除挤压时,产生看多信号;当价格下穿EMA均线、PSAR点,并且TTM Squeeze指标进入挤压时,产生看空信号

5. 止损方式:采用高低点止损。根据最近一定周期的最高价或最低价乘以设置倍数作为止损点

6. 止盈方式:采用风险回报比自动止盈。根据止损点距离当前价的比率乘以设置的风险回报比参数得到止盈点

通过参数设置,可以控制交易频率、仓位管理、止损点位和止盈点位,平衡交易心理。

## 优势分析

该策略具有以下优势:

1. 多指标判断,提高信号准确率

2. 反转为主,顺势为辅,捕捉反转点,减少冲高杀跌、冲低杀涨的概率

3. TTMSqueeze 指标可有效判断趋势中的调整,避免调整期无效交易

4. 高低止损方式简单实用,可根据市场调整止损距离

5. 风险回报比止盈方式将盈亏比例关系数值化,便于调整

6. 各种参数设置灵活,可根据个人风险偏好微调

## 风险分析

该策略也存在以下风险:

1. 多指标组合判断,虽提高信号准确度,但也增加了跳过 Entry 点位的可能

2. 反转为主的策略,在趋势行情中表现可能不佳

3. 高低止损有时会被突破,无法全面规避风险

4. 风险回报比止盈也可能因价格跳空或调整失效

5. 参数设置不当可能导致亏损或频繁停损

## 优化方向  

该策略可从以下方面进行优化:

1. 添加或调整指标权重,使信号更准确

2. 优化反转和趋势判断的指标参数,提高获利概率

3. 优化高低止损的参数,使止损更合理

4. 测试不同的风险回报比例,取得最优结果

5. 调整仓位数参数,降低单笔损失的影响  

## 总结

该策略整体来说,通过指标集合判断和参数调整,能够有效平衡交易心理,获得稳定的正收益。虽然仍有一定改进空间,但已具备实盘应用价值。通过市场反馈和参数微调,这一策略有望成为控制交易心理、获得长期稳定盈利的有效工具。

||

## Overview  

The goal of this strategy is to balance the psychology and performance of traders through adjusting various parameters, in order to obtain more steady returns. It uses indicators like moving averages, Bollinger Bands and Keltner Channels to determine market trends and volatility, together with the PSAR indicator to identify reversal signals. The TTM Squeeze indicator is leveraged to gauge momentum. Trading signals are generated through the combination of these indicators. In the meantime, risks are managed via the high-low stop loss and risk-reward take profit methods.

## Strategy Logic

The core logic of this strategy is as follows:

1. Judge trends: the EMA moving average is used to determine the direction of price trends. Prices above EMA signify uptrends while prices below EMA indicate downtrends.  

2. Identify reversals: the PSAR indicator spots price reversal points. PSAR dots appearing above prices signal longs while dots emerging below prices call for shorts.

3. Gauge momentum: the TTM Squeeze indicator measures market volatility and momentum. It compares Bollinger Bands and Keltner Channels to quantify volatility squeezes and surges. Squeeze implies extremely low volatility while a squeeze release signals an impending large directional price move.  

4. Generate trading signals: long signals are triggered when prices crossover above the EMA line and PSAR dots, accompanied by a TTM Squeeze release. Short signals occur when prices crossover below the EMA and PSAR, together with a TTM Squeeze triggering.

5. Stop loss method: the high-low stop loss bases stop levels on recent high/low prices multiplied by a set factor.

6. Take profit method: the risk-reward take profit automatically calculates profit targets based on the stop loss distance from current prices multiplied by a preset risk-reward ratio.

The various parameters allow traders to balance psychology by controlling trade frequency, position sizing, stop loss levels and take profit points. 

## Advantage Analysis   

The main edges of this strategy include:

1. Higher signal accuracy from multiple indicator consensus  

2. Mainly reversal-focused, reduces likelihood of false breakout fades  

3. TTM Squeeze gauges consolidations to avoid ineffective trades  

4. Simple and adjustable high-low stop loss 

5. Risk-reward take profit quantifies profit ratio for easy tuning

6. Flexible parameters to match personal risk preferences

## Risk Analysis

The risks of the strategy consist of:

1. Increased chance of missing entry signals from multiple indicators

2. Underperformance in persistent trending markets  

3. Occasional stop loss breaches beyond expectations 

4. Potential invalidation of risk-reward exits by price whipsaws

5. Inappropriate parameter tuning may lead to losses or over-stopping out

## Optimization Directions

Possible improvement areas cover:

1. Add or adjust indicator weights for higher signal accuracy

2. Optimize reversal and trend parameters for better profit capture  

3. Refine high-low stop loss levels for maximized effectiveness 

4. Test different risk-reward ratios for optimum results

5. Adjust position sizing to minimize single-trade loss impacts   

## Summary

In summary, through indicator combos and tunable settings, this strategy is capable of balancing trading psychology and securing steady positive results. Despite some remaining upside, it has already demonstrated practical applicability. Further live market feedback and calibration will likely enhance it into an effective tool for managing emotions and achieving long-term stable profits.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_source_1_close|0|(?General)Choose Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_1|true|Show Signal Labels?|
|v_input_bool_2|false|Is PSAR Adaptive?|
|v_input_float_1|0.98|(?High Low Stop Loss)Multiplier|
|v_input_float_2|0.98|Backup Multiplier|
|v_input_int_1|20|Lookback|
|v_input_float_3|1.125|(?Automatic High Low Take Profit)Risk Reward Ratio|
|v_input_int_2|100|(?EMA)Length|
|v_input_int_3|20|(?TTM Squeeze)Length|
|v_input_float_4|0.02|(?PSAR)Start|
|v_input_float_5|0.02|Increment|
|v_input_float_6|0.2|Max|
|v_input_float_7|0.02|(?Adaptive PSAR)Starting Acceleration Factor|
|v_input_float_8|false|Min Step|
|v_input_float_9|0.02|Max Step|
|v_input_float_10|0.2|Max Acceleration Factor|
|v_input_string_1|0|HiLo Mode: On|Off|
|v_input_string_2|0|Adaptive Mode: Kaufman|Off|Ehlers|
|v_input_int_4|5|Adaptive Smoothing Period|
|v_input_float_11|false|Filter in Pips|
|v_input_float_12|false|Min Change in Pips|
|v_input_string_3|0|Signal Mode: Only Stops|Signals & Stops|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=5
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © simwai
strategy('Octopus Nest Strategy ?', shorttitle='?', overlay=true )

// -- Colors --
color maximumYellowRed = color.rgb(255, 203, 98) // yellow
color rajah = color.rgb(242, 166, 84) // orange
color magicMint = color.rgb(171, 237, 198)
color languidLavender = color.rgb(232, 215, 255)
color maximumBluePurple = color.rgb(181, 161, 226)
color skyBlue = color.rgb(144, 226, 244)
color lightGray = color.rgb(214, 214, 214)
color quickSilver = color.rgb(163, 163, 163)
color mediumAquamarine = color.rgb(104, 223, 153)
color carrotOrange = color.rgb(239, 146, 46)

// -- Inputs --
float src = input.source(close, 'Choose Source', group='General', inline='1')
bool isSignalLabelEnabled = input.bool(title='Show Signal Labels?', defval=true, group='General', inline='2')
bool isPsarAdaptive = input.bool(title='Is PSAR Adaptive?', defval=false, group='General', inline='2')

float highLowStopLossMultiplier = input.float(defval=0.98,  step=0.01, minval=0, maxval=1, title='Multiplier', group='High Low Stop Loss', inline='1')
float highLowStopLossBackupMultiplier = input.float(defval=0.98, step=0.01, minval=0, maxval=1, title='Backup Multiplier', group='High Low Stop Loss', inline='1')
int highLowStopLossLookback = input.int(defval=20, step=5, minval=1, title='Lookback', group='High Low Stop Loss', inline='2')
float automaticHighLowTakeProfitRatio = input.float(defval=1.125, step=0.1, minval=0, title='Risk Reward Ratio', group='Automatic High Low Take Profit', inline='2')

int emaLength = input.int(100, minval=2, title='Length', group='EMA', inline='1')
int ttmLength = input.int(title='Length', defval=20, minval=0, group='TTM Squeeze', inline='1')

float psarStart = input.float(0.02, 'Start', step=0.01, minval=0.0, group='PSAR', inline='1')
float psarInc = input.float(0.02, 'Increment', step=0.01, minval=0.01, group='PSAR', inline='1')
float psarMax = input.float(0.2, 'Max', step=0.05, minval=0.0, group='PSAR', inline='2')

startAFactor = input.float(0.02, 'Starting Acceleration Factor', step = 0.001, group='Adaptive PSAR', inline='1')
minStep = input.float(0.0, 'Min Step', step = 0.001, group='Adaptive PSAR', inline='1')
maxStep = input.float(0.02, 'Max Step', step = 0.001, group='Adaptive PSAR', inline='2')
maxAFactor = input.float(0.2, 'Max Acceleration Factor', step = 0.001, group='Adaptive PSAR', inline='2')  

hiloMode = input.string('On', 'HiLo Mode', options = ['Off', 'On'], group='Adaptive PSAR')
adaptMode = input.string('Kaufman', 'Adaptive Mode', options = ['Off', 'Kaufman', 'Ehlers'], group='Adaptive PSAR')
adaptSmth = input.int(5, 'Adaptive Smoothing Period', minval = 1, group='Adaptive PSAR')
filt = input.float(0.0, 'Filter in Pips', group='Adaptive PSAR', minval = 0)
minChng = input.float(0.0, 'Min Change in Pips', group='Adaptive PSAR', minval = 0)
SignalMode = input.string('Only Stops', 'Signal Mode', options = ['Only Stops', 'Signals & Stops'], group='Adaptive PSAR')

// -- Functions --
tr(_high, _low, _close) => math.max(_high - _low, math.abs(_high - _close[1]), math.abs(_low - _close[1]))

// -- Calculation --
var string lastTrade = 'initial'

float _low = low
float _high = high
float _close = close

// -- TTM Squeeze – Credits to @Greeny --
bband(ttmLength, mult) =>
    ta.sma(src, ttmLength) + mult * ta.stdev(src, ttmLength)
keltner(ttmLength, mult) =>
    ta.ema(src, ttmLength) + mult * ta.ema(tr(_high, _low, _close), ttmLength)

e1 = (ta.highest(_high, ttmLength) + ta.lowest(_low, ttmLength)) / 2 + ta.sma(src, ttmLength)
osc = ta.linreg(src - e1 / 2, ttmLength, 0)
diff = bband(ttmLength, 2) - keltner(ttmLength, 1)
osc_color = osc[1] < osc[0] ? osc[0] >= 0 ? #00ffff : #cc00cc : osc[0] >= 0 ? #009b9b : #ff9bff
mid_color = diff >= 0 ? color.green : color.red

// -- PSAR --
// Credits to @Bjorgum
calcBaseUnit() =>
    bool  isForexSymbol = syminfo.type     == 'forex'
    bool  isYenPair     = syminfo.currency == 'JPY'
    float result = isForexSymbol ? isYenPair ? 0.01 : 0.0001 : syminfo.mintick

// Credits to @loxx
_afact(mode,input, per, smooth) =>
    eff = 0., seff = 0.
    len = 0, sum = 0., max = 0., min = 1000000000.
    len := mode == 'Kaufman' ? math.ceil(per) : math.ceil(math.max(20, 5 * per))
    for i = 0 to len 
        if (mode == 'Kaufman') 
            sum += math.abs(input[i] - input[i + 1])
        else
            max := input[i] > max ? input[i] : max
            min := input[i] < min ? input[i] : min
    if (mode == 'Kaufman' and sum != 0) 
        eff := math.abs(input - input[len]) / sum
    else
        if (mode == 'Ehlers' and (max - min) > 0) 
            eff := (input - min) / (max - min)
    seff := ta.ema(eff, smooth)
    seff

hVal2 = nz(high[2]), hVal1 = nz(high[1]), hVal0 = high
lowVal2 = nz(low[2]), lowVal1 = nz(low[1]), lowVal0 = low
hiprice2 = nz(high[2]), hiprice1 = nz(high[1]), hiprice0 = high
loprice2 = nz(low[2]), loprice1 = nz(low[1]), loprice0 = low

upSig = 0., dnSig = 0.
aFactor = 0., step = 0., trend = 0.
upTrndSAR = 0., dnTrndSAR = 0.
length = (2 / maxAFactor - 1)

if (hiloMode == 'On') 
    hiprice0 := high
    loprice0 := low
else
    hiprice0 := src
    loprice0 := hiprice0

if bar_index == 1
    trend := 1
    hVal1 := hiprice1
    hVal0 := math.max(hiprice0, hVal1)
    lowVal1 := loprice1
    lowVal0 := math.min(loprice0, lowVal1)
    aFactor := startAFactor
    upTrndSAR := lowVal0
    dnTrndSAR := 0.
else
    hVal0 := hVal1
    lowVal0 := lowVal1
    trend := nz(trend[1])
    aFactor := nz(aFactor[1])
    inputs = 0.
    inprice = src
    if (adaptMode != 'Off')
        if (hiloMode == 'On') 
            inprice := src
        else 
            inprice := hiprice0
        if (adaptMode == 'Kaufman') 
            inputs := inprice
        else
            if (adaptMode == 'Ehlers') 
                if (nz(upTrndSAR[1]) != 0.)
                    inputs := math.abs(inprice - nz(upTrndSAR[1]))
                else
                    if (nz(dnTrndSAR[1]) != 0.) 
                        inputs := math.abs(inprice - nz(dnTrndSAR[1]))
        step := minStep + _afact(adaptMode, inputs, length, adaptSmth) * (maxStep - minStep)
    else 
        step := maxStep
        
    upTrndSAR := 0., dnTrndSAR := 0., upSig := 0., dnSig := 0.
    
    if (nz(trend[1]) > 0) 
        if (nz(trend[1]) == nz(trend[2]))
            aFactor := hVal1 > hVal2 ? nz(aFactor[1]) + step : aFactor
            aFactor := aFactor > maxAFactor ? maxAFactor : aFactor
            aFactor := hVal1 < hVal2 ? startAFactor : aFactor
        else 
            aFactor := nz(aFactor[1])
            
        upTrndSAR := nz(upTrndSAR[1]) + aFactor * (hVal1 - nz(upTrndSAR[1]))
        upTrndSAR := upTrndSAR > loprice1 ? loprice1 : upTrndSAR
        upTrndSAR := upTrndSAR > loprice2 ? loprice2 : upTrndSAR
    else
        if (nz(trend[1]) == nz(trend[2])) 
            aFactor := lowVal1 < lowVal2 ? nz(aFactor[1]) + step : aFactor
            aFactor := aFactor > maxAFactor ? maxAFactor : aFactor
            aFactor := lowVal1 > lowVal2 ? startAFactor : aFactor
        else
            aFactor := nz(aFactor[1])
            
        dnTrndSAR := nz(dnTrndSAR[1]) + aFactor * (lowVal1 - nz(dnTrndSAR[1]))
        dnTrndSAR := dnTrndSAR < hiprice1 ? hiprice1 : dnTrndSAR
        dnTrndSAR := dnTrndSAR < hiprice2 ? hiprice2 : dnTrndSAR
    
    hVal0 := hiprice0 > hVal0 ? hiprice0 : hVal0
    lowVal0 := loprice0 < lowVal0 ? loprice0 : lowVal0
        
    if (minChng > 0) 
        if (upTrndSAR - nz(upTrndSAR[1]) < minChng * calcBaseUnit() and upTrndSAR != 0. and nz(upTrndSAR[1]) != 0.)
            upTrndSAR := nz(upTrndSAR[1])
        if (nz(dnTrndSAR[1]) - dnTrndSAR < minChng * calcBaseUnit() and dnTrndSAR != 0. and nz(dnTrndSAR[1]) != 0.)
            dnTrndSAR := nz(dnTrndSAR[1])

    dnTrndSAR := trend < 0 and dnTrndSAR > nz(dnTrndSAR[1]) ? nz(dnTrndSAR[1]) : dnTrndSAR
    upTrndSAR := trend > 0 and upTrndSAR < nz(upTrndSAR[1]) ? nz(upTrndSAR[1]) : upTrndSAR
    
    if (trend < 0 and hiprice0 >= dnTrndSAR + filt * calcBaseUnit())
        trend := 1
        upTrndSAR := lowVal0
        upSig := SignalMode == 'Signals & Stops' ? lowVal0 : upSig
        dnTrndSAR := 0.
        aFactor := startAFactor
        lowVal0 := loprice0
        hVal0 := hiprice0
    else if (trend > 0 and loprice0 <= upTrndSAR - filt * calcBaseUnit())
        trend := -1
        dnTrndSAR := hVal0
        dnSig := SignalMode == 'Signals & Stops' ? hVal0 : dnSig
        upTrndSAR := 0.
        aFactor := startAFactor
        lowVal0 := loprice0
        hVal0 := hiprice0
    
psar = upTrndSAR > 0 ? upTrndSAR : dnTrndSAR
psar := isPsarAdaptive ? psar : ta.sar(psarStart, psarInc, psarMax) 
plot(psar, title='PSAR', color=src < psar ? rajah : magicMint, style=plot.style_circles)

// -- EMA --
float ema = ta.ema(src, emaLength)
plot(ema, title='EMA', color=languidLavender)

// -- Signals --
var string isTradeOpen = ''
var string signalCache = ''

bool enterLong = src > ema and ta.crossover(src, psar) and ta.crossover(osc, 0)
bool enterShort = src < ema and ta.crossunder(src, psar) and ta.crossunder(osc, 0)
// bool exitLong = ta.crossunder(src, ema)
// bool exitShort = ta.crossover(src, ema)

if (signalCache == 'long entry')
    signalCache := ''
    enterLong := true
else if (signalCache == 'short entry')
    signalCache := ''
    enterShort := true

if (isTradeOpen == '')
    if (enterLong)
        isTradeOpen := 'long'
    else if (enterShort)
        isTradeOpen := 'short'
else if (isTradeOpen == 'long')
    if (enterLong)
        enterLong := false
else if (isTradeOpen == 'short')
    if (enterShort)
        enterShort := false

plotshape((isSignalLabelEnabled and enterLong and (isTradeOpen == 'long')) ? psar : na, title='LONG', text='L', style=shape.labelup, color=mediumAquamarine, textcolor=color.white, size=size.tiny, location=location.absolute)
plotshape((isSignalLabelEnabled and enterShort and (isTradeOpen == 'short')) ? psar : na, title='SHORT', text='S', style=shape.labeldown, color=carrotOrange, textcolor=color.white, size=size.tiny, location=location.absolute)

// -- High Low Stop Loss and Take Profit --
bool isHighLowStopLossEnabled = true
bool isAutomaticHighLowTakeProfitEnabled = true
bool recalculateStopLossTakeProfit = false
bool isStrategyEntryEnabled = false
bool isLongEnabled = true
bool isShortEnabled = true
bool isStopLossTakeProfitRecalculationEnabled = true

bool longStopLossTakeProfitRecalculation = isStopLossTakeProfitRecalculationEnabled ? true : (lastTrade == 'short' or lastTrade == 'initial')
bool shortStopLossTakeProfitRecalculation = isStopLossTakeProfitRecalculationEnabled ? true : (lastTrade == 'long' or lastTrade == 'initial')

var float longHighLowStopLoss = 0
var float shortHighLowStopLoss = 0

float highLowStopLossLowest = ta.lowest(_low, highLowStopLossLookback)
float highLowStopLossHighest = ta.highest(_high, highLowStopLossLookback)

if (isHighLowStopLossEnabled)
    if (((enterLong and longStopLossTakeProfitRecalculation) or recalculateStopLossTakeProfit) and (isStrategyEntryEnabled ? not(strategy.position_size > 0) : true))
        if (highLowStopLossLowest == _low)
            longHighLowStopLoss := _high * highLowStopLossBackupMultiplier
        else if (highLowStopLossLowest > 0)
            longHighLowStopLoss := highLowStopLossLowest * highLowStopLossMultiplier
            
    if (((enterShort and shortStopLossTakeProfitRecalculation) or recalculateStopLossTakeProfit) and (isStrategyEntryEnabled ? not(strategy.position_size < 0) : true))
        if (highLowStopLossHighest == _high)
            shortHighLowStopLoss := _high * (1 + (1 - highLowStopLossBackupMultiplier))
        else if (highLowStopLossHighest > 0)
            shortHighLowStopLoss := highLowStopLossHighest * (1 + (1 - highLowStopLossMultiplier))
        
plot((isLongEnabled and isHighLowStopLossEnabled and (isTradeOpen == 'long')) ? longHighLowStopLoss : na, 'Long High Low Stop Loss', color=magicMint, style=plot.style_circles, trackprice=false)
plot((isShortEnabled and isHighLowStopLossEnabled and (isTradeOpen == 'short')) ? shortHighLowStopLoss : na, 'Short High Low Stop Loss ', color=rajah, style=plot.style_circles, trackprice=false)

// -- Automatic High Low Take Profit --
var float longAutomaticHighLowTakeProfit = na
var float shortAutomaticHighLowTakeProfit = na

if (isAutomaticHighLowTakeProfitEnabled)
    if (((enterLong and longStopLossTakeProfitRecalculation) or recalculateStopLossTakeProfit) and (isStrategyEntryEnabled ? not(strategy.position_size > 0) : true))
        longHighLowStopLossPercentage = 1 - (longHighLowStopLoss / _close)
        longAutomaticHighLowTakeProfit := _close * (1 + (longHighLowStopLossPercentage  * automaticHighLowTakeProfitRatio))
    if (((enterShort and shortStopLossTakeProfitRecalculation) or recalculateStopLossTakeProfit) and (isStrategyEntryEnabled ? not(strategy.position_size > 0) : true)) 
        shortHighLowStopLossPercentage = 1 - (_close / shortHighLowStopLoss)
        shortAutomaticHighLowTakeProfit := _close * (1 - (shortHighLowStopLossPercentage * automaticHighLowTakeProfitRatio))

plot((isAutomaticHighLowTakeProfitEnabled and isHighLowStopLossEnabled and (isTradeOpen == 'long')) ? longAutomaticHighLowTakeProfit : na, 'Long Automatic High Low Take Profit', color=magicMint, style=plot.style_circles, trackprice=false)
plot((isAutomaticHighLowTakeProfitEnabled and isHighLowStopLossEnabled and (isTradeOpen == 'short')) ? shortAutomaticHighLowTakeProfit : na, 'Short Automatic High Low Take Profit', color=rajah, style=plot.style_circles, trackprice=false)

// log.info('Automatic Long High Low Take Profit: ' + str.tostring(longAutomaticHighLowTakeProfit))
// log.info('Automatic Short High Low Take Profit: ' + str.tostring(shortAutomaticHighLowTakeProfit))

// log.info('Long High Low Stop Loss: ' + str.tostring(longHighLowStopLoss))
// log.info('Short High Low Stop Loss: ' + str.tostring(shortHighLowStopLoss))

bool longHighLowStopLossCondition = ta.crossunder(_close, longHighLowStopLoss)
bool shortHighLowStopLossCondition = ta.crossover(_close, shortHighLowStopLoss)

bool longAutomaticHighLowTakeProfitCondition = ta.crossover(_close, longAutomaticHighLowTakeProfit)
bool shortAutomaticHighLowTakeProfitCondition = ta.crossunder(_close, shortAutomaticHighLowTakeProfit)

bool exitLong = (longHighLowStopLossCondition or longAutomaticHighLowTakeProfitCondition) and strategy.position_size > 0
bool exitShort = (shortHighLowStopLossCondition or shortAutomaticHighLowTakeProfitCondition) and strategy.position_size < 0

plotshape((isSignalLabelEnabled and exitLong and (isTradeOpen == 'long')) ? psar : na, title='LONG EXIT', style=shape.circle, color=magicMint, size=size.tiny, location=location.absolute)
plotshape((isSignalLabelEnabled and exitShort and (isTradeOpen == 'short')) ? psar : na, title='SHORT EXIT', style=shape.circle, color=rajah, size=size.tiny, location=location.absolute)

// Long Exits
if (exitLong)
    strategy.close('long', comment=longAutomaticHighLowTakeProfitCondition ? 'EXIT_LONG_TP' : 'EXIT_LONG_SL')
    isTradeOpen := ''

// Short Exits
if (exitShort)
    strategy.close('short', comment=shortAutomaticHighLowTakeProfitCondition ? 'EXIT_SHORT_TP' : 'EXIT_SHORT_SL')
    isTradeOpen := ''

// Long Entries
if (enterLong and (strategy.position_size == 0))
    strategy.entry('long', strategy.long, comment='ENTER_LONG')

// Short Entries
if (enterShort and (strategy.position_size == 0))
    strategy.entry('short', strategy.short, comment='ENTER_SHORT')

// Save last trade state
if (enterLong or exitLong)
    lastTrade := 'long'
if (enterShort or exitShort)
    lastTrade := 'short'

barcolor(color=isTradeOpen == 'long' ? mediumAquamarine : isTradeOpen == 'short' ? carrotOrange : na)
```

> Detail

https://www.fmz.com/strategy/442372

> Last Modified

2024-02-21 14:33:04
