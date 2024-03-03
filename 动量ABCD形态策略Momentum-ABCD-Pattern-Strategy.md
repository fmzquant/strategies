
> Name

动量ABCD形态策略Momentum-ABCD-Pattern-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略利用Williams Fractal指标识别价格高点和低点,并结合ABCD形态判断趋势方向,在确认趋势后进行入场,以追踪中短线趋势获利。

## 策略原理

1. 使用Williams Fractal指标识别价格高低点,根据不同的形态判断是牛市的ABCD形态还是熊市的ABCD形态。

2. ABCD形态判断标准:

    - AB和CD之间距离相近,BC和CD之间距离符合一定比例要求(0.382-0.886和1.13-2.618之间)。

    - D点低于C点为牛市形态,D点高于C点为熊市形态。

3. 通过barssince函数判断上一个方向的Fractal距离当前最近,来判断目前的总体趋势方向。

4. 在识别到ABCD形态时入场做多/做空,并设置止损和止盈,跟踪中短线趋势。

## 策略优势分析

1. 使用Williams Fractal指标辅助判断,可以更准确识别转折点。

2. ABCD形态判断标准简单可靠,容易程序化。

3. 结合barssince函数判断大趋势方向,可以有效减少假突破带来的损失。 

4. 设置止损止盈后可以跟踪中短线趋势获利。

## 策略风险分析

1. Williams Fractal存在滞后,可能错过转折点而造成损失。

2. 中短线上存在多个重叠的ABCD形态,可能造成识别错误。

3. 大趋势判断不准确时,中短线交易容易被套牢。

4. 止损设置过小容易被击出,设置过大则跟踪效果不佳。

对应优化方法:

1. 可以试验使用其他指标辅助判断,寻找更有效识别转折点的方式。

2. 优化ABCD形态的参数,使判断更严格可靠。

3. 优化大趋势判断的方法,防止错误判断大趋势。 

4. 测试不同的止损止盈比例,找到最佳止损止盈点。

## 策略优化方向

1. 可以尝试使用MACD,KDJ等其他指标辅助判断趋势,寻找更准确的入场时机。

2. 可以根据不同品种不同周期进行参数优化,找到最适合该品种周期的止损止盈点。

3. 可以根据市场变化优化取整周期,寻找最佳的参数组合。

4. 可以结合均线等指标过滤入场信号,提高策略的稳定性。

5. 可以引入机器学习算法,利用更多数据训练模型,以提高识别准确性。

## 总结

本策略整体思路清晰可靠,利用Williams Fractal指标和ABCD形态判断中短线趋势方向,再结合趋势过滤和止损止盈设置跟踪趋势获利。策略优化空间还很大,可从入场信号、参数优化、趋势判断等方面进行改进,使策略更适合不同市场环境。总体来说,该策略作为 discretionary + quant 结合的策略模式,具有很强的实用性。

|| 

## Overview

This strategy uses the Williams Fractal indicator to identify price peaks and troughs and combines ABCD patterns to determine trend direction. It enters a position after confirming the trend in order to follow medium-term trends for profit.

## Strategy Logic

1. Use the Williams Fractal indicator to identify price peaks and troughs. Different patterns are used to determine bullish or bearish ABCD patterns.

2. ABCD pattern identification criteria:

    - The distance between AB and CD is similar, and the distance between BC and CD meets certain proportional requirements (between 0.382-0.886 and 1.13-2.618).

    - D point lower than C point is a bullish pattern. D point higher than C point is a bearish pattern.

3. Use the barssince function to determine which direction's Fractal is closer to current to judge the overall trend direction.

4. Enter long/short after identifying ABCD pattern, and set stop loss and take profit to follow medium-term trends.

## Advantage Analysis 

1. Williams Fractal indicator helps identify turning points more accurately.

2. ABCD pattern criteria is simple and reliable, easy to automate.

3. Judging major trend direction with barssince avoids losses from false breakouts.

4. Following trends with stop loss and take profit after entry.

## Risk Analysis

1. Williams Fractal may lag and miss turning points causing losses. 

2. Multiple overlapping ABCD patterns may cause misidentification on medium-term charts.

3. Wrong major trend direction increases risk of being trapped in medium-term trades.

4. Stop loss too tight may get stopped out easily. Stop loss too wide may cause poor tracking.

Possible solutions:

1. Test other indicators to assist in identifying turning points more effectively.

2. Optimize ABCD pattern parameters to make identification more strict and reliable.

3. Improve major trend identification to avoid wrong directional bias.

4. Test different stop loss/take profit ratios to find optimal points.

## Optimization Directions

1. Test MACD, KDJ and other indicators to improve entry signals accuracy.

2. Optimize parameters based on different products and timeframes to find optimal stop loss/take profit levels.

3. Optimize bar lookback periods to find best parameter combinations according to changing market conditions. 

4. Add moving averages etc to filter signals and improve stability.

5. Introduce machine learning algorithms and more data to improve pattern recognition accuracy.

## Summary

The strategy logic is clear and reliable overall, using Williams Fractal and ABCD patterns to determine medium-term trend direction, combining with trend filtering, stop loss and take profit to follow trends for profit. There is still much room for optimization in areas like entry signals, parameter tuning, trend identification etc to make it adaptable to different market conditions. As a discretionary + quant combo model, it has strong practical value.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|filter Bill Williams Fractals?|
|v_input_2|100|Backtest Profit Goal (in USD)|
|v_input_3|20|Backtest STOP Goal (in USD)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-16 00:00:00
end: 2023-09-23 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=4
// @author=Daveatt - BEST

// ABCD Pattern Strat

StrategyName        = "BEST ABCD Pattern Strategy"
ShortStrategyName   = "BEST ABCD Pattern Strategy" 

// strategy(title=StrategyName, shorttitle=ShortStrategyName, overlay=true, 
//  pyramiding=2, default_qty_value=100, precision=7, currency=currency.USD,
//  commission_value=0.2,commission_type=strategy.commission.percent, initial_capital=1000000,
//  default_qty_type=strategy.fixed)

filterBW = input(false, title="filter Bill Williams Fractals?")

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////// UTILITIES ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//  ||-----------------------------------------------------------------------------------------------------||
//  ||---   Fractal Recognition Functions:  ---------------------------------------------------------------||
isRegularFractal(mode, _high, _low) =>
    ret = mode == 1 ? _high[4] < _high[3] and _high[3] < _high[2] and _high[2] > _high[1] and _high[1] > _high[0] :
     mode == -1 ? _low[4] > _low[3] and _low[3] > _low[2] and _low[2] < _low[1] and _low[1] < _low[0] : false

isBWFractal(mode, _high, _low) =>
    ret = mode == 1 ? _high[4] < _high[2] and _high[3] <= _high[2] and _high[2] >= _high[1] and _high[2] > _high[0] :
     mode == -1 ? _low[4] > _low[2] and _low[3] >= _low[2] and _low[2] <= _low[1] and _low[2] < _low[0] : false

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////////////////////////////// ABCD PATTERN ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

f_abcd()=>

    _r = timeframe.period
    _g = barmerge.gaps_off
    _l = barmerge.lookahead_on

    _high = high
    _low = low

    filteredtopf = filterBW ? isRegularFractal(1, _high, _low) : isBWFractal(1, _high, _low)
    filteredbotf = filterBW ? isRegularFractal(-1, _high, _low) : isBWFractal(-1, _high, _low)

    //  ||---   ZigZag:
    istop = filteredtopf
    isbot = filteredbotf
    topcount = barssince(istop)
    botcount = barssince(isbot)

    zigzag = (istop and topcount[1] > botcount[1] ? _high[2] :
     isbot and topcount[1] < botcount[1] ? _low[2] : na)

    x = valuewhen(zigzag, zigzag, 4) 
    a = valuewhen(zigzag, zigzag, 3) 
    b = valuewhen(zigzag, zigzag, 2) 
    c = valuewhen(zigzag, zigzag, 1) 
    d = valuewhen(zigzag, zigzag, 0)

    xab = (abs(b-a)/abs(x-a))
    xad = (abs(a-d)/abs(x-a))
    abc = (abs(b-c)/abs(a-b))
    bcd = (abs(c-d)/abs(b-c))

    // ABCD Part
    _abc = abc >= 0.382 and abc <= 0.886
    _bcd = bcd >= 1.13 and bcd <= 2.618
    
    _bull_abcd = _abc and _bcd and d < c 
    _bear_abcd = _abc and _bcd and d > c

    _bull   = _bull_abcd and not _bull_abcd[1]
    _bear   = _bear_abcd and not _bear_abcd[1]

    [_bull, _bear, zigzag]

lapos_x = timenow + round(change(time)*12)

[isLong, isShort, zigzag]  = f_abcd()

plot(zigzag, title= 'ZigZag', color=color.black, offset=-2)
plotshape(isLong, style=shape.labelup, location=location.belowbar, color=color.new(color.green, 0), size=size.normal, text="ABCD", textcolor=color.white)
plotshape(isShort, style=shape.labeldown, location=location.abovebar, color=color.new(color.maroon, 0), size=size.normal, text="ABCD", textcolor=color.white)


long_entry_price    = valuewhen(isLong, close, 0)
short_entry_price   = valuewhen(isShort, close, 0)

sinceNUP = barssince(isLong)
sinceNDN = barssince(isShort)

buy_trend   = sinceNDN > sinceNUP
sell_trend  = sinceNDN < sinceNUP


//////////////////////////
//* Profit Component *//
//////////////////////////

//////////////////////////// MinTick ///////////////////////////
fx_pips_value = syminfo.type == "forex" ? syminfo.mintick*10 : 1

input_tp_pips = input(100, "Backtest Profit Goal (in USD)",minval=0)*fx_pips_value
input_sl_pips = input(20, "Backtest STOP Goal (in USD)",minval=0)*fx_pips_value

tp = buy_trend? long_entry_price + input_tp_pips : short_entry_price - input_tp_pips
sl = buy_trend? long_entry_price - input_sl_pips : short_entry_price + input_sl_pips

plot_tp = buy_trend and high[1] <= tp ? tp : sell_trend and low[1] <= tp ? tp : na
plot_sl = buy_trend and low[1] >= sl ? sl : sell_trend and high[1] >= sl ? sl : na

plot(plot_tp, title="TP", style=plot.style_circles, linewidth=3, color=color.blue)
plot(plot_sl, title="SL", style=plot.style_circles, linewidth=3, color=color.red)

longClose   = isShort
shortClose  = isLong


strategy.entry("Long", 1, when=isLong)
// strategy.close("Long", when=longClose )
strategy.exit("XL","Long", limit=tp,  when=buy_trend, stop=sl)


strategy.entry("Short", 0,  when=isShort)
// strategy.close("Short", when=shortClose )
strategy.exit("XS","Short", when=sell_trend, limit=tp, stop=sl)
```

> Detail

https://www.fmz.com/strategy/427727

> Last Modified

2023-09-24 13:08:28
