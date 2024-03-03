
> Name

基于多标的动态均线的量化交易策略Dynamic-Multi-indicator-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1350fb76e951e99defe.png)
[trans]
## 概述

本策略利用多种技术指标的组合信号,实现对于股票、数字货币等标的资产的动态交易。策略可以自动识别市场趋势,进行趋势追踪。同时,策略加入了止损机制来控制风险。

## 策略原理  

本策略主要利用了移动平均线、相对强弱指标(RSI)、平均真实波幅(ATR)以及方向运动指标(ADX)等多个指标,通过指标的组合来产生交易信号。

具体来说,该策略首先利用双移动平均线形成金叉死叉信号。快线长度为10日,慢线长度为50日。当快线从下方向上突破慢线时,产生买入信号;当快线从上方向下跌破慢线时,产生卖出信号。该双移动平均线系统可以有效识别市场中长线趋势的转折。  

在双移动平均线基础上,策略还引入RSI指标来确认趋势信号,避免假突破。RSI通过快线和慢线的差值来判断市场实力, Length为14。当RSI上穿30时产生买入信号,下穿70时产生卖出信号。  

此外,策略利用ATR指标来自动调整止损位。ATR指标可以有效反映市场的波动程度。当市场波动加大时,策略会将止损位设置得宽一些,减小被止损的可能性。  

最后,策略用ADX指标判断趋势的力度。ADX通过正向指标DI+和负向指标DI-的差值来判断趋势的力度。当ADX值上穿20时,认为趋势建立,这时才产生实际的交易信号。  

通过多个指标的组合,可以使策略在发出交易信号时更加谨慎,避免被市场中的假信号欺骗,从而获得更高的胜率。

## 策略优势

本策略具有如下几个优势:

1. 多种指标组合,综合判断市场,提高决策准确性  

通过组合利用均线、RSI、ATR、ADX等多个指标,可以提高交易决策的准确性,避免单一指标造成的误判。

2. 自动调整止损,控制风险  

根据市场波动性自动调整止损位,可以减小止损被触发的概率,有效控制交易风险。

3. 判断趋势力度,减少反向操作  

通过ADX指标判断趋势力度后再实际交易,可以减少反向操作带来的损失。

4. 参数优化空间大  

该策略中的均线长度、RSI长度、ATR周期、ADX周期等参数都可以根据不同市场进行调整优化,适应性强。

5. 保护长线获利  

通过快慢均线系统判断长线趋势,并配合RSI等指标降低短线噪音的影响,可以在趋势中进行长线持有,获得更高收益。

## 风险及对策  

本策略也存在一些风险,主要风险包括:  

1. 参数优化风险  

多参数组合增大了优化难度,不合适的参数组合可能导致策略效果变差。此风险可以通过更充分的回测和参数调整来减轻。

2. 指标失效风险  

技术指标均有其适用的市场状态。当市场进入特殊状态时,策略中涉及的指标可能会同时失效。这种 BLACK SWAN 事件带来的风险需要注意。

3. 空头持仓亏损风险  

策略中允许空头交易。空头交易本身具有无限亏损的风险。此风险可以通过设置止损来降低。

4. 反转风险

在趋势反转时,指标信号无法反应迅速,这时候容易形成反向亏损。可以适当缩短部分指标参数,提高灵敏度。 

## 优化思路

本策略还存在进一步优化的空间,主要优化思路包括:  

1. 增加自适应指标权重  

通过分析不同指标和市场状态的相关性,可以设计动态调整各指标权重的机制,在不同市场环境下提高决策效果。

2. 增加深度学习模型辅助  

使用深度学习等模型预测价格变化方向,辅助人工设计决策规则,提高策略决策准确性。

3. 优化参数自适应  

针对滑动窗口的历史数据设计自动参数优化模块,实现指标参数的动态调整,使策略更好适应市场变化。

4. 引入变长周期分析

加入如波浪理论等变长周期分析方法,辅助判断趋势中长线走势,提高持仓获利概率。

## 总结  

本策略综合运用了移动均线、RSI、ATR、ADX等多个指标设计了一套较为完整的决策规则,既可以通过均线系统判断longer线趋势,又可以通过RSI等短周期指标降低噪音干扰。同时,该策略具有较大的优化空间,可望获得更好的绩效。总体来说,本策略利用指标组合提高了决策效果,控制了风险,值得进一步研究与应用。

||

## Overview  

This strategy utilizes the combination signals of multiple technical indicators to dynamically trade the underlying assets like stocks and cryptocurrencies. The strategy can automatically identify market trends and track them. Also, stop loss mechanism is incorporated to control risks.  

## Principles  

This strategy mainly leverages moving averages, relative strength index (RSI), average true range (ATR) and directional movement index (ADX) to generate trading signals.  

Specifically, it first adopts double moving average crossovers to form signals. The fast line has a length of 10 days and the slow line has a length of 50 days. Golden crossovers (fast line breaking above slow line from below) generate buy signals while dead crossovers generate sell signals. This system can effectively identify reversals in long-term trends.

On top of double MAs, RSI is introduced to confirm the trend signals and avoid false breakouts. RSI judges the market strength by the divergence between the fast and slow line. When RSI breaks above 30, buy signal is generated. When breaking below 70, sell signal is generated.  

In addition, ATR is used to automatically adjust the stop loss level. ATR can effectively reflect the volatility of markets. When volatility rises, wider stop loss will be set to reduce the probability of being stopped out.  

Finally, ADX gauges the strength of the trend. ADX uses the divergence between the positive indicator DI+ and negative indicator DI- to measure trend strength. Only when ADX breaks above 20, the trend is considered to be established and actual trading signals are generated.  

By combining signals from multiple indicators, the strategy can be more prudent in sending trading signals, avoiding the interference from false signals and hence achieving higher win rate.  

## Advantages  

The advantages of this strategy include:

1. Combination of multiple indicators improves decision accuracy  

The combination of MA, RSI, ATR, ADX and more can improve the accuracy and avoid faulty judgements due to single indicator.  

2. Automatic stop loss adjustment controls risks

Adjusting stop loss based on market volatility can reduce the probability of being stopped out and effectively manage risks.  

3. Judging trend strength avoids trading against trends  

By judging trend strength with ADX before actual trading, losses from trading against trends can be reduced.  

4. Large parameter tuning space  

Parameters like MA lengths, RSI length, ATR period and ADX period can all be adjusted and optimized for different markets. Hence the strategy has strong adaptability.  

5. Protecting long-term profits  

Identifying long-term trends using the fast and slow MA system and reducing short-term noises with indicators like RSI, long-term holding in trends becomes possible for higher profits.

## Risks & Solutions

There are also a few risks associated with this strategy:  

1. Parameter optimization difficulty  

More parameters means greater difficulty in optimization. Unsuitable parameter sets may deteriorate strategy performance. More adequate backtesting and parameter tuning can alleviate this risk.  

2. Indicator failure risk  

All technical indicators have applicable market states. When markets enter peculiar states, indicators used may fail simultaneously. Risks from such BLACK SWAN events need attention.  

3. Unlimited loss risk from shorting  

The strategy allows short trading. Short positions inherently have the risk of unlimited losses. This can be reduced by setting proper stop loss.  

4. Trend reversal risk  

Indicators cannot promptly respond to reversals. Wrong directional positions often incur losses during reversals. Shortening parameters of some indicators may improve sensitivities.  

## Optimization  

There is room for further optimization:  

1. Adaptive indicator weighting  

Analyze correlations between indicators/market states and design mechanisms to dynamically adjust indicator weights based on changing market conditions to improve decisions.  

2. Augmentation by deep learning  

Use deep learning models to forecast price movement directions and augment the rules-based system to improve accuracy.  

3. Adaptive parameter tuning  

Design adaptive tuning modules for indicator parameters based on sliding window historical data so that the strategy can better adapt.  

4. Incorporate variable-period analysis  

Integrate variable-period analysis like Elliott Waves Theory to assist judging mid-long term trends and improve profitability.  

## Conclusion   

In summary, this strategy integrates MA, RSI, ATR, ADX and more into a relatively comprehensive system, which can identify longer-term trends via the MA system and reduce noise interference with short-term indicators like RSI. Also, large optimization space exists for performance improvement. The strategy improves decisions by combining indicators and controls risks. It deserves further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_open|0|src: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|25|Rsi vwap lenght|
|v_input_float_6|0.4|StopLoss |
|v_input_string_1|0|(?ADX)Adx Type: MASANAKAMURA|CLASSIC|
|v_input_int_1|38|Adx lenght|
|v_input_float_1|23|Adx Treshold|
|v_input_float_2|1.2|(?Volume)Volume mult.|
|v_input_int_2|35|Volume lenght|
|v_input_int_3|25|(?Relative Strenght Indeks)RSI lenght|
|v_input_source_1_low|0|RSI Source: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_4|26|(?Range Filter)SAMPLING PERIOD|
|v_input_float_3|2.3|RANGE MULTIPLIER|
|v_input_int_5|true|(?Cloud)Cloud Length|
|v_input_int_6|26|(?Relative Momentum Index)Rmi Lenght|
|v_input_int_7|17|Rmi Momentum|
|v_input_int_8|33|Rmi oversold|
|v_input_int_9|68|Rmi overbought|
|v_input_float_4|2|(?strategy settings)Swap % period|
|v_input_float_5|1.2|Tp-1 |


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-28 00:00:00
end: 2024-02-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code to my testing
// © sgb

//@version=5


strategy(title='Soren test 2', overlay=true, initial_capital=100, pyramiding=1, calc_on_order_fills=true, calc_on_every_tick=true, default_qty_type=strategy.percent_of_equity, default_qty_value=50, commission_value=0.04)

//SOURCE =============================================================================================================================================================================================================================================================================================================

src = input(open)

// INPUTS ============================================================================================================================================================================================================================================================================================================



//ADX --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ADX_options = input.string('MASANAKAMURA', title='Adx Type', options=['CLASSIC', 'MASANAKAMURA'], group='ADX')
ADX_len = input.int(38, title='Adx lenght', minval=1, group='ADX')
th = input.float(23, title='Adx Treshold', minval=0, step=0.5, group='ADX')

// Volume ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

volume_f = input.float(1.2, title='Volume mult.', minval=0, step=0.1, group='Volume')
sma_length = input.int(35, title='Volume lenght', minval=1, group='Volume')

//RSI----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

len_3 = input.int(25, title='RSI lenght', group='Relative Strenght Indeks')
src_3 = input.source(low, title='RSI Source', group='Relative Strenght Indeks')
RSI_VWAP_length = input(25, title='Rsi vwap lenght')

// Range Filter ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

per_ = input.int(26, title='SAMPLING PERIOD', minval=1, group='Range Filter')
mult = input.float(2.3, title='RANGE MULTIPLIER', minval=0.1, step=0.1, group='Range Filter')

// Cloud --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

len = input.int(1, title='Cloud Length', group='Cloud')

//RMI ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

RMI_len = input.int(26, title='Rmi Lenght', minval=1, group='Relative Momentum Index')
mom = input.int(17, title='Rmi Momentum', minval=1, group='Relative Momentum Index')
RMI_os = input.int(33, title='Rmi oversold', minval=0, group='Relative Momentum Index')
RMI_ob = input.int(68, title='Rmi overbought', minval=0, group='Relative Momentum Index')


// Indicators Calculations ========================================================================================================================================================================================================================================================================================================

// Range Filter ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var bool L_RF = na
var bool S_RF = na

Range_filter(_src, _per_, _mult) =>
    var float _upward = 0.0
    var float _downward = 0.0
    wper = _per_ * 2 - 1
    avrng = ta.ema(math.abs(_src - _src[1]), _per_)
    _smoothrng = ta.ema(avrng, wper) * _mult
    _filt = _src
    _filt := _src > nz(_filt[1]) ? _src - _smoothrng < nz(_filt[1]) ? nz(_filt[1]) : _src - _smoothrng : _src + _smoothrng > nz(_filt[1]) ? nz(_filt[1]) : _src + _smoothrng
    _upward := _filt > _filt[1] ? nz(_upward[1]) + 1 : _filt < _filt[1] ? 0 : nz(_upward[1])
    _downward := _filt < _filt[1] ? nz(_downward[1]) + 1 : _filt > _filt[1] ? 0 : nz(_downward[1])
    [_smoothrng, _filt, _upward, _downward]
[smoothrng, filt, upward, downward] = Range_filter(src, per_, mult)
hband = filt + smoothrng
lband = filt - smoothrng
L_RF := high > hband and upward > 0
S_RF := low < lband and downward > 0

//ADX-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

calcADX(_len) =>
    up = ta.change(high)
    down = -ta.change(low)
    plusDM = na(up) ? na : up > down and up > 0 ? up : 0
    minusDM = na(down) ? na : down > up and down > 0 ? down : 0
    truerange = ta.rma(ta.tr, _len)
    _plus = fixnan(100 * ta.rma(plusDM, _len) / truerange)
    _minus = fixnan(100 * ta.rma(minusDM, _len) / truerange)
    sum = _plus + _minus
    _adx = 100 * ta.rma(math.abs(_plus - _minus) / (sum == 0 ? 1 : sum), _len)
    [_plus, _minus, _adx]
calcADX_Masanakamura(_len) =>
    SmoothedTrueRange = 0.0
    SmoothedDirectionalMovementPlus = 0.0
    SmoothedDirectionalMovementMinus = 0.0
    TrueRange = math.max(math.max(high - low, math.abs(high - nz(close[1]))), math.abs(low - nz(close[1])))
    DirectionalMovementPlus = high - nz(high[1]) > nz(low[1]) - low ? math.max(high - nz(high[1]), 0) : 0
    DirectionalMovementMinus = nz(low[1]) - low > high - nz(high[1]) ? math.max(nz(low[1]) - low, 0) : 0
    SmoothedTrueRange := nz(SmoothedTrueRange[1]) - nz(SmoothedTrueRange[1]) / _len + TrueRange
    SmoothedDirectionalMovementPlus := nz(SmoothedDirectionalMovementPlus[1]) - nz(SmoothedDirectionalMovementPlus[1]) / _len + DirectionalMovementPlus
    SmoothedDirectionalMovementMinus := nz(SmoothedDirectionalMovementMinus[1]) - nz(SmoothedDirectionalMovementMinus[1]) / _len + DirectionalMovementMinus
    DIP = SmoothedDirectionalMovementPlus / SmoothedTrueRange * 100
    DIM = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
    DX = math.abs(DIP - DIM) / (DIP + DIM) * 100
    adx = ta.sma(DX, _len)
    [DIP, DIM, adx]
[DIPlusC, DIMinusC, ADXC] = calcADX(ADX_len)
[DIPlusM, DIMinusM, ADXM] = calcADX_Masanakamura(ADX_len)

DIPlus = ADX_options == 'CLASSIC' ? DIPlusC : DIPlusM
DIMinus = ADX_options == 'CLASSIC' ? DIMinusC : DIMinusM
ADX = ADX_options == 'CLASSIC' ? ADXC : ADXM
L_adx = DIPlus > DIMinus and ADX > th
S_adx = DIPlus < DIMinus and ADX > th

// Volume -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Volume_condt = volume > ta.sma(volume, sma_length) * volume_f

//RSI------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

up_3 = ta.rma(math.max(ta.change(src_3), 0), len_3)
down_3 = ta.rma(-math.min(ta.change(src_3), 0), len_3)
rsi_3 = down_3 == 0 ? 100 : up_3 == 0 ? 0 : 100 - 100 / (1 + up_3 / down_3)
L_rsi = rsi_3 < 70
S_rsi = rsi_3 > 30
RSI_VWAP = ta.rsi(ta.vwap(close), RSI_VWAP_length)
RSI_VWAP_overSold = 13
RSI_VWAP_overBought = 68

L_VAP = ta.crossover(RSI_VWAP, RSI_VWAP_overSold)
S_VAP = ta.crossunder(RSI_VWAP, RSI_VWAP_overBought)

//Cloud --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

PI = 2 * math.asin(1)
hilbertTransform(src) =>
    0.0962 * src + 0.5769 * nz(src[2]) - 0.5769 * nz(src[4]) - 0.0962 * nz(src[6])
computeComponent(src, mesaPeriodMult) =>
    hilbertTransform(src) * mesaPeriodMult
computeAlpha(src, fastLimit, slowLimit) =>
    mesaPeriod = 0.0
    mesaPeriodMult = 0.075 * nz(mesaPeriod[1]) + 0.54
    smooth = 0.0
    smooth := (4 * src + 3 * nz(src[1]) + 2 * nz(src[2]) + nz(src[3])) / 10
    detrender = 0.0
    detrender := computeComponent(smooth, mesaPeriodMult)
    I1 = nz(detrender[3])
    Q1 = computeComponent(detrender, mesaPeriodMult)
    jI = computeComponent(I1, mesaPeriodMult)
    jQ = computeComponent(Q1, mesaPeriodMult)
    I2 = 0.0
    Q2 = 0.0
    I2 := I1 - jQ
    Q2 := Q1 + jI
    I2 := 0.2 * I2 + 0.8 * nz(I2[1])
    Q2 := 0.2 * Q2 + 0.8 * nz(Q2[1])
    Re = I2 * nz(I2[1]) + Q2 * nz(Q2[1])
    Im = I2 * nz(Q2[1]) - Q2 * nz(I2[1])
    Re := 0.2 * Re + 0.8 * nz(Re[1])
    Im := 0.2 * Im + 0.8 * nz(Im[1])
    if Re != 0 and Im != 0
        mesaPeriod := 2 * PI / math.atan(Im / Re)
        mesaPeriod
    if mesaPeriod > 1.5 * nz(mesaPeriod[1])
        mesaPeriod := 1.5 * nz(mesaPeriod[1])
        mesaPeriod
    if mesaPeriod < 0.67 * nz(mesaPeriod[1])
        mesaPeriod := 0.67 * nz(mesaPeriod[1])
        mesaPeriod
    if mesaPeriod < 6
        mesaPeriod := 6
        mesaPeriod
    if mesaPeriod > 50
        mesaPeriod := 50
        mesaPeriod
    mesaPeriod := 0.2 * mesaPeriod + 0.8 * nz(mesaPeriod[1])
    phase = 0.0
    if I1 != 0
        phase := 180 / PI * math.atan(Q1 / I1)
        phase
    deltaPhase = nz(phase[1]) - phase
    if deltaPhase < 1
        deltaPhase := 1
        deltaPhase
    alpha = fastLimit / deltaPhase
    if alpha < slowLimit
        alpha := slowLimit
        alpha
    [alpha, alpha / 2.0]
er = math.abs(ta.change(src, len)) / math.sum(math.abs(ta.change(src)), len)
[a, b] = computeAlpha(src, er, er * 0.1)
mama = 0.0
mama := a * src + (1 - a) * nz(mama[1])
fama = 0.0
fama := b * mama + (1 - b) * nz(fama[1])
alpha = math.pow(er * (b - a) + a, 2)
kama = 0.0
kama := alpha * src + (1 - alpha) * nz(kama[1])

L_cloud = kama > kama[1]
S_cloud = kama < kama[1]

// RMI -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

RMI(len, m) =>
    up = ta.ema(math.max(close - close[m], 0), len)
    dn = ta.ema(math.max(close[m] - close, 0), len)
    RMI = dn == 0 ? 0 : 100 - 100 / (1 + up / dn)
    RMI
L_rmi = ta.crossover(RMI(RMI_len, mom), RMI_os)
S_rmi = ta.crossunder(RMI(RMI_len, mom), RMI_ob)



//STRATEGY ==========================================================================================================================================================================================================================================================================================================

L_1 = L_VAP and L_RF and not S_adx
S_1 = S_VAP and S_RF and not L_adx
L_2 = L_adx and Volume_condt and L_rsi and L_cloud
S_2 = S_adx and Volume_condt and S_rsi and S_cloud
L_3 = L_rmi and L_RF and not S_adx
S_3 = S_rmi and S_RF and not L_adx
L_basic_condt = L_1 or L_2 or L_3
S_basic_condt = S_1 or S_2 or S_3

var bool longCondition = na
var bool shortCondition = na
var float last_open_longCondition = na
var float last_open_shortCondition = na
var int last_longCondition = 0
var int last_shortCondition = 0
longCondition := L_basic_condt
shortCondition := S_basic_condt
last_open_longCondition := longCondition ? close : nz(last_open_longCondition[1])
last_open_shortCondition := shortCondition ? close : nz(last_open_shortCondition[1])
last_longCondition := longCondition ? time : nz(last_longCondition[1])
last_shortCondition := shortCondition ? time : nz(last_shortCondition[1])
in_longCondition = last_longCondition > last_shortCondition
in_shortCondition = last_shortCondition > last_longCondition

// SWAP-SL ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var int last_long_sl = na
var int last_short_sl = na
sl = input.float(2, 'Swap % period', minval=0, step=0.1, group='strategy settings')
long_sl = ta.crossunder(low, (1 - sl / 100) * last_open_longCondition) and in_longCondition and not longCondition
short_sl = ta.crossover(high, (1 + sl / 100) * last_open_shortCondition) and in_shortCondition and not shortCondition
last_long_sl := long_sl ? time : nz(last_long_sl[1])
last_short_sl := short_sl ? time : nz(last_short_sl[1])
var bool CondIni_long_sl = 0
CondIni_long_sl := long_sl ? 1 : longCondition ? -1 : nz(CondIni_long_sl[1])
var bool CondIni_short_sl = 0
CondIni_short_sl := short_sl ? 1 : shortCondition ? -1 : nz(CondIni_short_sl[1])
Final_Long_sl = long_sl and nz(CondIni_long_sl[1]) == -1 and in_longCondition and not longCondition
Final_Short_sl = short_sl and nz(CondIni_short_sl[1]) == -1 and in_shortCondition and not shortCondition
var int sectionLongs = 0
sectionLongs := nz(sectionLongs[1])
var int sectionShorts = 0
sectionShorts := nz(sectionShorts[1])

// RE-ENTRY ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

if longCondition or Final_Long_sl
    sectionLongs += 1
    sectionShorts := 0
    sectionShorts
if shortCondition or Final_Short_sl
    sectionLongs := 0
    sectionShorts += 1
    sectionShorts
var float sum_long = 0.0
var float sum_short = 0.0

if longCondition
    sum_long := nz(last_open_longCondition) + nz(sum_long[1])
    sum_short := 0.0
    sum_short
if Final_Long_sl
    sum_long := (1 - sl / 100) * last_open_longCondition + nz(sum_long[1])
    sum_short := 0.0
    sum_short
if shortCondition
    sum_short := nz(last_open_shortCondition) + nz(sum_short[1])
    sum_long := 0.0
    sum_long
if Final_Short_sl
    sum_long := 0.0
    sum_short := (1 + sl / 100) * last_open_shortCondition + nz(sum_short[1])
    sum_short

var float Position_Price = 0.0
Position_Price := nz(Position_Price[1])
Position_Price := longCondition or Final_Long_sl ? sum_long / sectionLongs : shortCondition or Final_Short_sl ? sum_short / sectionShorts : na

//TP_1 -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

tp = input.float(1.2, 'Tp-1 ', minval=0, step=0.1, group='strategy settings')
long_tp = ta.crossover(high, (1 + tp / 100) * fixnan(Position_Price)) and in_longCondition and not longCondition
short_tp = ta.crossunder(low, (1 - tp / 100) * fixnan(Position_Price)) and in_shortCondition and not shortCondition
var int last_long_tp = na
var int last_short_tp = na
last_long_tp := long_tp ? time : nz(last_long_tp[1])
last_short_tp := short_tp ? time : nz(last_short_tp[1])
Final_Long_tp = long_tp and last_longCondition > nz(last_long_tp[1])
Final_Short_tp = short_tp and last_shortCondition > nz(last_short_tp[1])
fixnan_1 = fixnan(Position_Price)
ltp = Final_Long_tp ? fixnan_1 * (1 + tp / 100) : na
fixnan_2 = fixnan(Position_Price)
stp = Final_Short_tp ? fixnan_2 * (1 - tp / 100) : na
if Final_Short_tp or Final_Long_tp
    sum_long := 0.0
    sum_short := 0.0
    sectionLongs := 0
    sectionShorts := 0
    sectionShorts
if Final_Long_tp
    CondIni_long_sl == 1
if Final_Short_tp
    CondIni_short_sl == 1


// COLORS & PLOTS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ADX_COLOR = L_adx ? color.lime : S_adx ? color.red : color.orange
barcolor(color=ADX_COLOR)
hbandplot = plot(hband, title='RF HT', color=ADX_COLOR, transp=50)
lbandplot = plot(lband, title='RF LT', color=ADX_COLOR, transp=50)
fill(hbandplot, lbandplot, title='RF TR', color=ADX_COLOR, transp=90)
plotshape(longCondition, title='Long', style=shape.triangleup, location=location.belowbar, color=color.new(color.blue, 0), size=size.tiny)
plotshape(shortCondition, title='Short', style=shape.triangledown, location=location.abovebar, color=color.new(color.red, 0), size=size.tiny)

plot(ltp, style=plot.style_circles, linewidth=5, color=color.new(color.fuchsia, 0), editable=false)
plot(stp, style=plot.style_circles, linewidth=5, color=color.new(color.fuchsia, 0), editable=false)

//BACKTESTING--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Q = 50
SL = input.float(0.4, 'StopLoss ', minval=0, step=0.1)

strategy.entry('long', strategy.long, when=longCondition)
strategy.entry('short', strategy.short, when=shortCondition)

strategy.exit('TP', 'long', qty_percent=Q, limit=fixnan(Position_Price) * (1 + tp / 100))
strategy.exit('TP', 'short', qty_percent=Q, limit=fixnan(Position_Price) * (1 - tp / 100))


strategy.exit('SL', 'long', stop=fixnan(Position_Price) * (1 - SL / 100))
strategy.exit('SL', 'short', stop=fixnan(Position_Price) * (1 + SL / 100))


//
//
//
//
//
//

// By SGB






```

> Detail

https://www.fmz.com/strategy/440974

> Last Modified

2024-02-04 14:42:05
