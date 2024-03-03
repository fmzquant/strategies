
> Name

基于价格发散的趋势交易策略Price-Divergence-Based-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/5c00e0b0402dcb8434.png)
[trans]
## 概述

该策略是一种基于价格发散信号的趋势交易策略。它使用多种指标检测价格发散信号,比如RSI、MACD、Stochastics等,并通过Murrey Math振荡器进行确认。当价格发散信号出现时,如果振荡器也确认当前为趋势方向,则进行入场。

## 策略原理

该策略的核心是价格发散理论。当价格创新高但指标没有创新高时,称为熊市价格发散;当价格创新低但指标没有创新低时,称为牛市价格发散。这表明趋势可能发生反转。策略使用顶底分型与振荡器结合确认交易信号。

具体来说,策略的入场条件为:
1. 检测到价格发散信号,包括常规发散和隐藏发散
2. Murrey Math振荡器位于对应的趋势区域内

出场条件为振荡器回穿中线时平仓。

## 优势分析

该策略结合了价格发散理论和趋势确认,具有以下优势:

1. 利用价格发散信号检测潜在趋势反转点
2. 应用振荡器确认当前趋势,避免假突破
3. 多种指标和参数组合,可以灵活调整
4. 兼顾趋势跟踪和防止亏损
5. 逻辑规则清晰,代码优化空间大

## 风险分析 

主要风险来自以下几个方面:

1. 价格发散信号可能是假信号,不能完全确认趋势反转
2. 振荡器参数设置不当可能导致漏进错过交易机会
3. 多空仓位过度倾斜带来较大亏损风险
4. 行情剧烈波动期间可能激增交易次数和滑点成本

建议设置止损,调整仓位,优化参数组合以降低风险。

## 优化方向

该策略还有进一步优化的空间:

1. 增加机器学习算法,实时优化参数组合
2. 增加自适应止损技术,如跟踪止损、平均止损等
3. 结合更多指标和过滤条件,提高信噪比
4. 动态调整振荡器参数,优化趋势判断
5. 优化风险管理,设置最大回撤等限制

## 总结

该策略整合价格发散理论和趋势分析指标,能有效发现潜在的趋势转换点。结合优化的风险管理措施,可以获得较好的策略收益率。未来可通过机器学习等高级方法进行优化,以获得更稳定的超额收益。

||

## Overview

This is a trend trading strategy based on price divergence signals. It uses multiple indicators like RSI, MACD, Stochastics etc. to detect price divergences and the Murrey Math Oscillator to confirm. It enters when a price divergence signal appears and the oscillator confirms the current trend direction.  

## Strategy Logic

The core of this strategy is price divergence theory. When price reaches a new high but indicator doesn't, it's considered a bearish divergence. When price prints a new low but indicator doesn't, it's a bullish divergence. This signals a potential trend reversal. The strategy combines fractal signals with an oscillator to confirm trade signals.  

Specifically, the entry conditions are:

1. Detect regular/hidden price divergence 
2. Murrey Math Oscillator is in corresponding trend zone

Exit when the oscillator crosses middle line.

## Advantage Analysis

The advantages of this strategy are:

1. Detect potential reversal points using divergences 
2. Confirm ongoing trend with oscillator, avoiding false breakouts
3. Flexible parameters and indicator combinations  
4. Combine trend following and risk management  
5. Clear logic rules, much room for optimization

## Risk Analysis

The main risks are:  

1. Divergences could be false signals  
2. Improper oscillator parameters may cause missing trades  
3. Excessive one-sided positions bring large loss risk 
4. Increased trade frequency and slippage cost during high volatility periods  

Suggest stop loss, position sizing, parameter optimization to reduce risks.

## Optimization Directions

Some further optimizations:

1. Add machine learning algorithms for dynamic parameter optimization
2. Introduce more advanced stop loss techniques like trailing stop loss, average true range stop etc
3. Incorporate more indicators and filters to improve signal-to-noise ratio  
4. Auto-adjust oscillator parameters for better trend judgement 
5. Enhance risk management, set maximum drawdown limits etc

## Summary  

This strategy integrates price divergence concept with trend analysis tools to discover potential reversals early. With proper risk management enhancements, it could achieve good risk-adjusted returns. Further machine learning based optimizations may lead to more stable alpha.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Method (0=rsi, 1=macd, 2=stoch, 3=volume, 4=acc/dist, 5=fisher, 6=cci):|
|v_input_2|true|Show Labels|
|v_input_3|false|Show Channel|
|v_input_4|true|Use Hidden Divergence in Strategy|
|v_input_5|true|Use Regular Divergence in Strategy|
|v_input_6|5|RSI/STOCH/Volume/ACC-DIST/Fisher/cci Smooth:|
|v_input_7_close|0|MACD Source:: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|12|MACD Fast:|
|v_input_9|26|MACD Slow:|
|v_input_10|9|MACD Smooth Signal:|
|v_input_11|100|MMLO Look back Length|
|v_input_12|2|Mininum Quadrant for MMLO Support|
|v_input_13|false|Take Profit Points|
|v_input_14|false|Stop Loss Points|
|v_input_15|100|Trailing Stop Loss Points|
|v_input_16|false|Trailing Stop Loss Offset Points|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-02 00:00:00
end: 2024-02-01 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//
// Title:   [STRATEGY][UL]Price Divergence Strategy V1
// Author:  JustUncleL
// Date:    23-Oct-2016
// Version: v1.0
//
// Description:
//  A trend trading strategy the uses Price Divergence detection signals, that
//  are confirmed by the "Murrey's Math Oscillator" (Donchanin Channel based).
//
//  *** USE AT YOUR OWN RISK ***
//
// Mofidifications:
//  1.0 - original
//
// References:
//  Strategy Based on:
//  - [RS]Price Divergence Detector V2 by RicardoSantos
//  - UCS_Murrey's Math Oscillator by Ucsgears
//  Some Code borrowed from:
//  - "Strategy Code Example by JayRogers"  
//  Information on Divergence Trading:
//  - http://www.babypips.com/school/high-school/trading-divergences
//
strategy(title='[STRATEGY][UL]Price Divergence Strategy v1.0', pyramiding=0, overlay=true, initial_capital=10000, calc_on_every_tick=false,
         currency=currency.USD,default_qty_type=strategy.percent_of_equity,default_qty_value=10)
//  ||  General Input:
method = input(title='Method (0=rsi, 1=macd, 2=stoch, 3=volume, 4=acc/dist, 5=fisher, 6=cci):',  defval=1, minval=0, maxval=6)
SHOW_LABEL = input(title='Show Labels', type=bool, defval=true)
SHOW_CHANNEL = input(title='Show Channel', type=bool, defval=false)
uHid = input(true,title="Use Hidden Divergence in Strategy")
uReg = input(true,title="Use Regular Divergence in Strategy")
//  ||  RSI / STOCH / VOLUME / ACC/DIST Input:
rsi_smooth = input(title='RSI/STOCH/Volume/ACC-DIST/Fisher/cci Smooth:',  defval=5)
//  ||  MACD Input:
macd_src = input(title='MACD Source:', defval=close)
macd_fast = input(title='MACD Fast:',  defval=12)
macd_slow = input(title='MACD Slow:',  defval=26)
macd_smooth = input(title='MACD Smooth Signal:',  defval=9)
//  ||  Functions:
f_top_fractal(_src)=>_src[4] < _src[2] and _src[3] < _src[2] and _src[2] > _src[1] and _src[2] > _src[0]
f_bot_fractal(_src)=>_src[4] > _src[2] and _src[3] > _src[2] and _src[2] < _src[1] and _src[2] < _src[0]
f_fractalize(_src)=>f_top_fractal(_src) ? 1 : f_bot_fractal(_src) ? -1 : 0

//  ||••>   START MACD FUNCTION
f_macd(_src, _fast, _slow, _smooth)=>
    _fast_ma = sma(_src, _fast)
    _slow_ma = sma(_src, _slow)
    _macd = _fast_ma-_slow_ma
    _signal = ema(_macd, _smooth)
    _hist = _macd - _signal
//  ||<••   END MACD FUNCTION

//  ||••>   START ACC/DIST FUNCTION
f_accdist(_smooth)=>_return=sma(cum(close==high and close==low or high==low ? 0 : ((2*close-low-high)/(high-low))*volume), _smooth)
//  ||<••   END ACC/DIST FUNCTION

//  ||••>   START FISHER FUNCTION
f_fisher(_src, _window)=>
    _h = highest(_src, _window)
    _l = lowest(_src, _window)
    _value0 = .66 * ((_src - _l) / max(_h - _l, .001) - .5) + .67 * nz(_value0[1])
    _value1 = _value0 > .99 ? .999 : _value0 < -.99 ? -.999 : _value0
    _fisher = .5 * log((1 + _value1) / max(1 - _value1, .001)) + .5 * nz(_fisher[1])
//  ||<••   END FISHER FUNCTION

method_high = method == 0 ? rsi(high, rsi_smooth) : 
  method == 1 ? f_macd(macd_src, macd_fast, macd_slow, macd_smooth) :
  method == 2 ? stoch(close, high, low, rsi_smooth) :
  method == 3 ? sma(volume, rsi_smooth) :
  method == 4 ? f_accdist(rsi_smooth) :
  method == 5 ? f_fisher(high, rsi_smooth) :
  method == 6 ? cci(high, rsi_smooth) :
  na
    
method_low = method == 0 ? rsi(low, rsi_smooth) :
  method == 1 ? f_macd(macd_src, macd_fast, macd_slow, macd_smooth) :
  method == 2 ? stoch(close, high, low, rsi_smooth) :
  method == 3 ? sma(volume, rsi_smooth) :
  method == 4 ? f_accdist(rsi_smooth) :
  method == 5 ? f_fisher(low, rsi_smooth) :
  method == 6 ? cci(low, rsi_smooth) :
  na

fractal_top = f_fractalize(method_high) > 0 ? method_high[2] : na
fractal_bot = f_fractalize(method_low) < 0 ? method_low[2] : na

high_prev = valuewhen(fractal_top, method_high[2], 1) 
high_price = valuewhen(fractal_top, high[2], 1)
low_prev = valuewhen(fractal_bot, method_low[2], 1) 
low_price = valuewhen(fractal_bot, low[2], 1)

regular_bearish_div = fractal_top and high[2] > high_price and method_high[2] < high_prev
hidden_bearish_div = fractal_top and high[2] < high_price and method_high[2] > high_prev
regular_bullish_div = fractal_bot and low[2] < low_price and method_low[2] > low_prev
hidden_bullish_div = fractal_bot and low[2] > low_price and method_low[2] < low_prev

plot(title='H F', series=fractal_top ? high[2] : na, color=regular_bearish_div or hidden_bearish_div ? maroon : not SHOW_CHANNEL ? na : silver, offset=-2)
plot(title='L F', series=fractal_bot ? low[2] : na, color=regular_bullish_div or hidden_bullish_div ? green : not SHOW_CHANNEL ? na : silver, offset=-2)
plot(title='H D', series=fractal_top ? high[2] : na, style=circles, color=regular_bearish_div or hidden_bearish_div ? maroon : not SHOW_CHANNEL ? na : silver, linewidth=3, offset=-2)
plot(title='L D', series=fractal_bot ? low[2] : na, style=circles, color=regular_bullish_div or hidden_bullish_div ? green : not SHOW_CHANNEL ? na : silver, linewidth=3, offset=-2)

plotshape(title='+RBD', series=not SHOW_LABEL ? na : regular_bearish_div ? high[2] : na, text='R', style=shape.labeldown, location=location.absolute, color=maroon, textcolor=white, offset=-2)
plotshape(title='+HBD', series=not SHOW_LABEL ? na : hidden_bearish_div ? high[2] : na, text='H', style=shape.labeldown, location=location.absolute, color=maroon, textcolor=white, offset=-2)
plotshape(title='-RBD', series=not SHOW_LABEL ? na : regular_bullish_div ? low[2] : na, text='R', style=shape.labelup, location=location.absolute, color=green, textcolor=white, offset=-2)
plotshape(title='-HBD', series=not SHOW_LABEL ? na : hidden_bullish_div ? low[2] : na, text='H', style=shape.labelup, location=location.absolute, color=green, textcolor=white, offset=-2)

// Code borrowed from UCS_Murrey's Math Oscillator by Ucsgears
//  - UCS_MMLO
// Inputs
length = input(100, minval = 10, title = "MMLO Look back Length")
quad   = input(2, minval = 1, maxval = 4, step = 1, title = "Mininum Quadrant for MMLO Support")
mult = 0.125

// Donchanin Channel
hi = highest(high, length)
lo = lowest(low, length)
range = hi - lo
multiplier = (range) * mult
midline = lo + multiplier * 4

oscillator = (close - midline)/(range/2)

a = oscillator > 0
b = oscillator > 0 and oscillator > mult*2
c = oscillator > 0 and oscillator > mult*4
d = oscillator > 0 and oscillator > mult*6

z = oscillator < 0
y = oscillator < 0 and oscillator < -mult*2
x = oscillator < 0 and oscillator < -mult*4
w = oscillator < 0 and oscillator < -mult*6


//  Strategy: (Thanks to JayRogers)
// === STRATEGY RELATED INPUTS ===
//tradeInvert     = input(defval = false, title = "Invert Trade Direction?")
// the risk management inputs
inpTakeProfit   = input(defval = 0, title = "Take Profit Points", minval = 0)
inpStopLoss     = input(defval = 0, title = "Stop Loss Points", minval = 0)
inpTrailStop    = input(defval = 100, title = "Trailing Stop Loss Points", minval = 0)
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Loss Offset Points", minval = 0)

// === RISK MANAGEMENT VALUE PREP ===
// if an input is less than 1, assuming not wanted so we assign 'na' value to disable it.
useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na

// === STRATEGY - LONG POSITION EXECUTION ===
enterLong() => ((uReg and regular_bullish_div) or (uHid and hidden_bullish_div)) and (quad==1? a[1]: quad==2?b[1]: quad==3?c[1]: quad==4?d[1]: false)// functions can be used to wrap up and work out complex conditions
exitLong() => oscillator <= 0
strategy.entry(id = "Buy", long = true, when = enterLong() )// use function or simple condition to decide when to get in
strategy.close(id = "Buy", when = exitLong() )// ...and when to get out

// === STRATEGY - SHORT POSITION EXECUTION ===
enterShort() => ((uReg and regular_bearish_div) or (uHid and hidden_bearish_div)) and (quad==1? z[1]: quad==2?y[1]: quad==3?x[1]: quad==4?w[1]: false)
exitShort() => oscillator >= 0
strategy.entry(id = "Sell", long = false, when = enterShort())
strategy.close(id = "Sell", when = exitShort() )

// === STRATEGY RISK MANAGEMENT EXECUTION ===
// finally, make use of all the earlier values we got prepped
strategy.exit("Exit Buy", from_entry = "Buy", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
strategy.exit("Exit Sell", from_entry = "Sell", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)


//EOF
```

> Detail

https://www.fmz.com/strategy/440877

> Last Modified

2024-02-02 18:00:55
