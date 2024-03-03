
> Name

多指标趋势追踪止盈止损策略Multi-indicator-Trend-Following-Strategy-with-Stop-Loss-and-Take-Profit

> Author

ChaoZhang

> Strategy Description


[trans] 

### 策略概述

多指标趋势追踪止盈止损策略通过整合EMA、MACD、OBV和PSAR等多个指标,判断当前的趋势方向,并在入市之后设置止盈止损来控制风险。该策略综合多种因子来确认交易信号,在追踪趋势的同时严格管控每个交易的收益和风险。

### 策略原理

1. 判断趋势方向:当EMA、MACD、OBV和PSAR等指标都发出同步的多头或空头信号时确定趋势。

2. 入场规则:多头信号成立时做多,空头信号成立时做空。

3. 止盈止损:入场后根据PSAR指标的点位距离设置本笔交易的止盈止损位。

4. 出场规则:止盈或止损触发后平仓。

该策略的优势在于采用多指标判断以发出高概率的交易信号,同时止盈止损策略可在保证盈利的前提下主动控制风险。指标组合和参数设置可根据市场情况进行优化。

### 策略优势 

- 多指标组合发出高概率信号

- 止盈止损策略主动控制风险

- 参考PSAR点位设定止盈止损

- 指标和参数优化灵活

- 可在趋势中持续获利

### 风险警示

- 多指标组合判断较为复杂

- 存在一定的信号滞后风险

- 需要警惕反转和震荡市场

- 参数设置需要不断测试和优化

### 总结

多指标趋势追踪止盈止损策略对趋势交易进行了全面的改进,不仅可以提高决策的准确性,也可以主动控制风险。通过反复测试不同市场和参数,可以将该策略优化为一个稳定可靠的量化系统。


||

### Strategy Overview

The multi-indicator trend following strategy with stop loss and take profit incorporates indicators like EMA, MACD, OBV and PSAR to determine the trend direction, and sets stop loss and take profit after entering trades to control risks. It synthesizes multiple factors to confirm trading signals, while strictly managing the reward and risk of each trade when following trends.

### Strategy Logic

1. Determine trend direction: when EMA, MACD, OBV and PSAR align to give bullish or bearish signals.

2. Entry rules: go long on bull signals, go short on bear signals.

3. Stop loss/take profit: set stop loss and take profit for each trade based on PSAR levels after entry. 

4. Exit rules: close positions when stop loss or take profit is triggered.

The advantage of this strategy is using multiple indicators for high-probability signal generation, while the stop loss/take profit rules actively control risks while locking in profits. Indicator mix and parameter settings can be optimized based on market conditions.

### Advantages of the Strategy

- Multiple indicators combine for high-probability signals

- Stop loss/take profit actively controls risks

- Take profit/stop loss based on PSAR levels

- Flexible indicator and parameter optimization 

- Sustained profits in trends

### Risk Warnings

- Complex multi-indicator combination

- Potential signal lag risks 

- Watch out for reversals and ranges

- Constant parameter testing and optimization needed

### Conclusion

The multi-indicator trend following strategy with stop loss and take profit comprehensively improves trend trading by enhancing accuracy and actively managing risks. Through repetitive testing on different markets and parameters, it can be optimized into a robust and reliable quantitative system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Short Length OBV|
|v_input_2|8|Long Length OBV|
|v_input_3|0.1|PSAR START|
|v_input_4|0.05|PSAR INC|
|v_input_5|0.3|PSAR MAX|
|v_input_6|200|Length EMA|
|v_input_7_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|12|Fast Length MACD|
|v_input_9|25|Slow Length MACD|
|v_input_10_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_11|9|Signal Smoothing MACD|
|v_input_12|true|Simple MA (Oscillator)|
|v_input_13|true|Simple MA (Signal Line)|
|v_input_14|true|longEntry|
|v_input_15|true|shortEntry|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-09-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=4

strategy("Scalping FOrex full strategy with risk management",overlay=true,initial_capital = 10000, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.cash_per_contract ,commission_value=0.00005)

//VOLUME o
shortlen = input(1, minval=1, title = "Short Length OBV")
longlen = input(8, minval=1, title = "Long Length OBV")
upColor = #2196F3//input(#2196F3, "Color Up")
dnColor = #6B1599//input(#6B1599, "Color Down")
f_normGradientColor(_series, _crossesZero, _colorNormLen, _dnColor, _upColor) =>
    _dnValue = _crossesZero?-100:0
    _mult = 0.0
    _lowest = lowest(_colorNormLen)
    _highest = highest(_colorNormLen)
    _diff1 = close - _lowest
    _diff2 = _highest - _lowest
    if _diff2 > 0
        _mult := _diff1 / _diff2 * 100
    color.from_gradient(sign(_series) * _mult, _dnValue, 100, _dnColor, _upColor)
shorta = ema(volume, shortlen)
longa = ema(volume, longlen)
osc = 100 * (shorta - longa) / longa

start = input(0.1, title="PSAR START")
increment = input(0.05,title="PSAR INC")
maximum = input(0.3, title="PSAR MAX")
// multitp=input(1)
// multisl=input(1)
var bool uptrend = na
var float EP = na
var float SAR = na
var float AF = start
var float nextBarSAR = na
if bar_index > 0
    firstTrendBar = false
    SAR := nextBarSAR
    if bar_index == 1
        float prevSAR = na
        float prevEP = na
        lowPrev = low[1]
        highPrev = high[1]
        closeCur = close
        closePrev = close[1]
        if closeCur > closePrev
            uptrend := true
            EP := high
            prevSAR := lowPrev
            prevEP := high
        else
            uptrend := false
            EP := low
            prevSAR := highPrev
            prevEP := low
        firstTrendBar := true
        SAR := prevSAR + start * (prevEP - prevSAR)
    if uptrend
        if SAR > low
            firstTrendBar := true
            uptrend := false
            SAR := max(EP, high)
            EP := low
            AF := start
    else
        if SAR < high
            firstTrendBar := true
            uptrend := true
            SAR := min(EP, low)
            EP := high
            AF := start
    if not firstTrendBar
        if uptrend
            if high > EP
                EP := high
                AF := min(AF + increment, maximum)
        else
            if low < EP
                EP := low
                AF := min(AF + increment, maximum)
    if uptrend
        SAR := min(SAR, low[1])
        if bar_index > 1
            SAR := min(SAR, low[2])
    else
        SAR := max(SAR, high[1])
        if bar_index > 1
            SAR := max(SAR, high[2])
    nextBarSAR := SAR + AF * (EP - SAR)
//    if barstate.isconfirmed
    
//         if uptrend
//             strategy.entry("ParSE", strategy.short, stop=nextBarSAR, comment="ParSE")
//             strategy.cancel("ParLE")
//         else
//             strategy.entry("ParLE", strategy.long, stop=nextBarSAR, comment="ParLE")
//             strategy.cancel("ParSE")
//plot(SAR, style=plot.style_cross, linewidth=3, color=color.orange)


psarshort = close- SAR
psarlong= SAR-close

 


lena = input(200, minval=1, title="Length EMA")
srca = input(close, title="Source")
out = ema(srca, lena)

fast_length = input(title="Fast Length MACD", type=input.integer, defval=12)
slow_length = input(title="Slow Length MACD", type=input.integer, defval=25)
src = input(title="Source", type=input.source, defval=close)
signal_length = input(title="Signal Smoothing MACD", type=input.integer, minval = 1, maxval = 50, defval = 9)
sma_source = input(title="Simple MA (Oscillator)", type=input.bool, defval=true)
sma_signal = input(title="Simple MA (Signal Line)", type=input.bool, defval=true)
// Calculating
fast_ma = sma_source ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source ? sma(src, slow_length) : ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal


long = hist[1]<0 and hist > 0 and close > out and uptrend and osc < 0
short = hist[1]>0 and hist< 0 and close < out and not uptrend and osc >0

// ------------------------- Strategy Logic --------------------------------- //
var longOpeneds = false
var shortOpeneds = false
var int timeOfBuys = na
var float tpLong = na
var float slLong = na
var int entrys = na

 

longConditions = long and not longOpeneds and entrys<100

if longConditions
    longOpeneds := true
    timeOfBuys := time
    tpLong := close+ (psarshort) //* multitp)
    slLong := close- (psarshort)//*multisl)
    entrys:=entrys+1


tpLongTrigger = (longOpeneds[1] and (crossover(close, tpLong) or crossover( high,tpLong)))
slLongTrigger = (longOpeneds[1] and (crossunder(close, slLong) or crossunder( low,slLong)))

longExitSignals =  slLongTrigger or tpLongTrigger  or short
exitLongConditions = longOpeneds[1] and longExitSignals

if exitLongConditions
    longOpeneds := false
    timeOfBuys := na
    tpLong := na
    slLong := na
    
if(short)
    entrys:=0

//short
// ------------------------- Strategy Logic --------------------------------- //
var longOpenedss = false
// var shortOpeneds = false
var int timeOfBuyss = na
var float tpLongs = na
var float slLongs = na
var int entry = na

 

longConditionss = short and not longOpenedss and entry<100

if longConditionss
    longOpenedss := true
    timeOfBuyss := time
    tpLongs := close- (psarlong)//*multitp )
    slLongs := close+ (psarlong)//*multisl)
    entry:=1

 

tpLongTriggers = (longOpenedss[1] and ( crossunder(close, tpLongs) or crossunder( low,tpLongs)))
slLongTriggers = (longOpenedss[1] and (crossover(close, slLongs) or crossover( high,slLongs)))

longExitSignalss =  slLongTriggers or tpLongTriggers  or long
exitLongConditionss = longOpenedss[1] and longExitSignalss

if exitLongConditionss
    longOpenedss := false
    timeOfBuyss := na
    tpLongs := na
    slLongs := na

if(long)
    entry:=0
    
longEntry=input(true)
shortEntry=input(true)

if(longEntry)
    strategy.entry("long",1,when=longConditions)
    strategy.close('long',when=exitLongConditions)

if(shortEntry)
    strategy.entry("short",0,when=longConditionss)
    strategy.close("short",when=exitLongConditionss)

```

> Detail

https://www.fmz.com/strategy/426920

> Last Modified

2023-09-15 15:39:32
