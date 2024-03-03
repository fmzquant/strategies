
> Name

跨周期方向策略Eltrut-Turtle-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略采用跨周期技术指标来识别趋势方向,结合趋势过滤和波动过滤,实现低风险趋势跟踪交易。

## 策略原理

1. 使用高低点突破来判断买卖信号。当价格突破7周期高点时看空,突破7周期低点时看多。

2. Trendflex指标判断主趋势方向。该指标结合了双平滑技术,可以有效识别趋势中段,值在1以上表明处于上升趋势,值在-1以下则为下降趋势。这里我们要求Trendflex > 1时才能长,< -1时才能短,从而过滤掉盘整状态。

3. Bollinger Bands波动带来识别震荡区间。close价格处于带中时,避免做多做空。

4. 采用移动止损和移动止盈来管理头寸。

## 优势分析

1. 跨周期指标结合双平滑技术,可以有效识别趋势方向,避免被震荡市困扰。

2. 同时考虑趋势方向和波动规律,使交易信号更可靠。

3. 止损止盈设置合理,可以锁定盈利,防止亏损扩大。

4. 策略较为简单易懂,容易实施。

## 风险分析

1. 突破信号可能出现假突破,从而产生错误交易。可以考虑加入更多滤波条件。

2. 固定周期参数无法适应市场的变化,可以考虑动态优化参数。

3. 缺乏价格止损,无法防止极端行情造成的超大亏损。

4. 止盈止损点固定,无法根据市场波动智能调整。

## 优化方向

1. 可以考虑加入更多趋势判断指标,形成策略组合,提高判断准确性。

2. 增加震荡识别模块,在震荡剧烈时暂停交易,降低风险。

3. 引入机器学习算法,实现参数的动态优化。

4. 加入价格止损模块,可以在亏损达到一定阈值时止损退出。

5. 基于市场波动计算止盈止损比例,实现止盈止损的智能调整。

## 总结

本策略总体来说较为稳健可靠,同时也存在一定改进空间。核心思路是跨周期判断趋势方向,再结合趋势强度指标和波动指标进行过滤,从而发出高质量信号。该策略简单实用,非常适合跟踪中长线趋势。通过引入更多条件判断和动态参数优化,可以进一步提高策略效果。

|| 

## Overview

This strategy uses cross-period technical indicators to identify trend direction, combined with trend filtering and volatility filtering, to achieve low-risk trend tracking trading.

## Strategy Logic

1. Use high-low point breakthroughs to determine buy and sell signals. Go short when the price breaks through the 7-period high, and go long when it breaks through the 7-period low.

2. The Trendflex indicator determines the main trend direction. This indicator combines double smoothing techniques and can effectively identify trend middle sections. A value above 1 indicates an upward trend, while a value below -1 indicates a downward trend. Here we require Trendflex > 1 for longs and < -1 for shorts, thereby filtering out consolidation states.

3. Use Bollinger Bands to identify oscillation ranges. Avoid longs and shorts when the close price is within the band.

4. Use moving stop loss and take profit to manage positions.

## Advantage Analysis 

1. Cross-period indicators combined with double smoothing techniques can effectively identify trend directions and avoid oscillating markets.

2. Considering both trend direction and volatility patterns makes trading signals more reliable.

3. Reasonable stop loss and take profit settings lock in profits and prevent losses from expanding.

4. The strategy is relatively simple and easy to implement.

## Risk Analysis

1. Breakthrough signals may have false breakouts, resulting in wrong trades. More filtering conditions can be considered.

2. Fixed cycle parameters cannot adapt to market changes. Dynamic optimization of parameters can be considered.

3. Lack of price stops fails to prevent huge losses from extreme market conditions. 

4. Fixed take profit and stop loss points cannot be adjusted intelligently according to market volatility.

## Optimization Directions

1. Consider adding more trend judgment indicators to form a strategy combination to improve judgment accuracy.

2. Add oscillation identification modules to pause trading when oscillation is severe to reduce risk.

3. Introduce machine learning algorithms to achieve dynamic parameter optimization.

4. Add price stop loss modules to stop loss when losses reach a certain threshold.

5. Calculate take profit and stop loss ratios based on market volatility to achieve intelligent adjustment of take profit and stop loss.

## Summary

Overall, this strategy is relatively stable and reliable, while also having room for improvement. The core idea is to determine the trend direction across cycles, and then filter using trend strength indicators and volatility indicators to generate high-quality signals. This simple and practical strategy is very suitable for tracking medium and long term trends. By introducing more conditional judgments and dynamic parameter optimization, the strategy effect can be further improved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2016|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2030|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|30|Backtest Stop Day|
|v_input_7|3|Stop Loss %|
|v_input_8|9|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-27 00:00:00
end: 2023-09-26 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Eltrut", shorttitle="Eltrut Strat", overlay=true, pyramiding=0, default_qty_type= strategy.percent_of_equity,calc_on_order_fills=false, slippage=25,commission_type=strategy.commission.percent,commission_value=0.075)

testStartYear = input(2016, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2030, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)


// R E F L E X / T R E N D F L E X

f_supersmoother(_src,_len)=>
    pi = 2 * asin(1)
    _a = exp(-sqrt(2) * pi / _len)
    _c2 = 2 * _a * cos(sqrt(2) * pi / _len)
    _c3 = -_a * _a
    _c1 = 1 - _c2 - _c3
    _out = 0.0
    _out := _c1 * _src + _c2 * nz(_out[1],nz(_src[1],_src)) + _c3 * nz(_out[2],nz(_src[2],nz(_src[1],_src)))

f_IQIFM(_src1,_max)=>
    _src = _src1 < 0.001 ? _src1 * 10000 : _src1
    _imult = 0.635, _qmult = 0.338 , _inphase = 0.0, _quad = 0.0
    _re = 0.0, _im = 0.0, _deltaphase = 0.0, _instper = 0.0, _per = 0.0, _v4 = 0.0
    _v1 = _src - nz(_src[7])
    _inphase := 1.25 * (nz(_v1[4]) - _imult * _v1[2]) + _imult * nz(_inphase[3])
    _quad := _v1[2] - _qmult * _v1 + _qmult * nz(_quad[2])
    _re := 0.2 * (_inphase * _inphase[1] + _quad * _quad[1]) + 0.8 * nz(_re[1])
    _im := 0.2 * (_inphase * _quad[1] - _inphase[1] * _quad) + 0.8 * nz(_im[1])
    if _re != 0.0
        _deltaphase := atan(_im / _re)
    for i = 0 to _max
        _v4 := _v4 + _deltaphase[i]
        if _v4 > 4 * asin(1) and _instper == 0.0
            _instper := i
    if _instper == 0.0
        _instper := nz(_instper[1])
    _per := 0.25 * _instper + 0.75 * nz(_per[1])
    _per

f_flex(_src1, _fixed_len, _reflex) =>
    _src = _src1
    _len = _fixed_len 
    _ss1 = f_supersmoother(_src, _len)
    _ss = _ss1
    _slope = (_ss[_len] - _ss) / _len
    _sum = 0.0
    for _i = 1 to _len
        _c1 = _reflex ? _ss + _i * _slope - _ss[_i] : _ss - _ss[_i]
        _sum := _sum + _c1
    _sum := _sum / _len
    _ms = 0.0
    _ms := 0.04 * pow(_sum,2) + 0.96 * nz(_ms[1])
    _flex1 = _ms != 0 ? _sum / sqrt(nz(_ms)) : 0.0
    _flex = _flex1
    _flex

rflx = f_flex(close, 20, true)  
trndflx = f_flex(close, 20, false)   

// S I G N A L
hi7 = highest(7)
lo7 = lowest(7)
long_cond = crossunder(close, lo7[1])
short_cond = crossover(close, hi7[1])

// F I L T E R S

long_filter1 = trndflx < 1
short_filter1 = trndflx > -1

basis = sma(close, 35)
dev = 3 * stdev(close, 35)
long_filter2 = close > basis - dev
short_filter2 = close < basis + dev

// S T R A T E G Y

long = long_cond and long_filter1 and long_filter2
short = short_cond and short_filter1 and short_filter2

if( true)
    strategy.entry("Long", strategy.long, when = long)
    strategy.entry("Long", strategy.long, when = short)


// User Options to Change Inputs (%)
stopPer = input(3, title='Stop Loss %', type=input.float) / 100
takePer = input(9, title='Take Profit %', type=input.float) / 100

// Determine where you've entered and in what direction
longStop = strategy.position_avg_price * (1 - stopPer)
shortStop = strategy.position_avg_price * (1 + stopPer)
shortTake = strategy.position_avg_price * (1 - takePer)
longTake = strategy.position_avg_price * (1 + takePer)

if strategy.position_size > 0 
    strategy.exit(id="Exit Long", stop=longStop, limit=longTake)
if strategy.position_size < 0 
    strategy.exit(id="Exit Short", stop=shortStop, limit=shortTake)


// P L O T 

plotshape(long, color = #1e90ff, text = "", style=shape.triangleup, location=location.belowbar, size=size.tiny)
plotshape(short, color = #ff69b4, text = "", style=shape.triangledown, location=location.abovebar, size=size.tiny)

alertcondition(long, "Long", "Enter Long")
alertcondition(short, "Short", "Enter S")
```

> Detail

https://www.fmz.com/strategy/427990

> Last Modified

2023-09-27 16:30:51
