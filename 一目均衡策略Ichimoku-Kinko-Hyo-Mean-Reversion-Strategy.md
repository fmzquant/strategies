
> Name

一目均衡策略Ichimoku-Kinko-Hyo-Mean-Reversion-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略综合利用 Ichimoku Kinko Hyo 指标、日线突破、高斯平滑移动平均线、MACD 指标等多种技术指标,对趋势方向进行判断,寻找更可靠的入场时点。

## 策略原理  

1. Ichimoku Kinko Hyo 指标判断:Conversion Line 上穿 Base Line 视为看涨信号。

2. 日线突破判断:今日收盘价较昨日收盘价上涨一定比例确认看涨信号。

3. 高斯平滑移动平均线判断:价格上穿均线视为看涨信号。

4. MACD 判断:DIFF 线上穿 DEA 线视为看涨信号。

5. 综合以上多重因素判断市场面临趋势转换,确定看多进入的时点。

## 策略优势  

1. 多种指标综合判断,提高判断准确性。

2. 日内和多时间框判断共同确认,避免假突破。 

3. Ichimoku Kinko Hyo 对趋势判断准确可靠。

4. 高斯平滑移动平均线具有滞后性较小的特点。

5. MACD 可判断动量面临转折。

## 策略风险

1. 多重条件同时成立时机相对较少,可能导致错过较佳入场点。

2. 指标参数设置不当可能导致发出错误信号。

3. 日内判断与多时间框判断可能出现分歧。

4. 假突破仍可能发生,带来损失。

对应优化方法:

1. 调整指标参数,扩大入场时机。

2. 测试不同品种和周期参数组合,优化参数。 

3. 优化时间框配置,使各时间框信号协调。

4. 设置止损止盈,控制单笔损失。

## 策略优化方向 

1. 测试不同指标的组合,寻找更好的组合。

2. 增加机器学习算法,利用更多数据提升判断能力。

3. 增加趋势检测,避免逆势交易。

4. 优化资金管理策略,使策略更稳健。

5. 优化止损止盈策略,最大化盈利。

## 总结

该策略整合多个指标判断趋势方向,在确定较高概率看多时机时入场,通过多时间框和多指标共同验证,提高判断准确性。可从调整参数窗口、优化组合以及引入更多数据等方面进行优化,集成更多因子信号,在保持稳定的基础上获取更多交易机会。

|| 

## Overview

This strategy integrates Ichimoku Kinko Hyo indicator, daily breakout, Gaussian smoothed moving average, MACD and other technical indicators to determine trend direction and find reliable entry points.

## Strategy Logic

1. Ichimoku Kinko Hyo judgment: Conversion Line crossover above Base Line is bullish signal.

2. Daily breakout judgment: Today's close higher than yesterday's close by certain threshold confirms bullish.

3. Gaussian smoothed MA judgment: Price crossover above MA is bullish. 

4. MACD judgment: DIFF crossover above DEA is bullish.

5. Combining above factors to determine trend change and entry point.

## Advantages

1. Multiple indicators improve accuracy.

2. Intraday and multi-timeframe confirmations avoid false breakout.

3. Ichimoku Kinko Hyo reliably determines trend.

4. Gaussian smoothed MA has small lag.

5. MACD judges momentum change.

## Risks

1. Multiple simultaneous conditions reduce chance of entries.

2. Wrong indicator parameters may generate wrong signals.

3. Intraday and multi-timeframe signals may conflict. 

4. Fake breakouts still occur, incurring losses.

Possible solutions:

1. Adjust parameters to increase entries.

2. Optimize parameters for different products and timeframes.

3. Coordinate signals from different timeframes. 

4. Use stop loss to limit losses.

## Optimization Directions

1. Test different indicator combinations for better signals.

2. Add machine learning to improve judgements from more data.

3. Add trend detection to avoid counter-trend trades.

4. Optimize money management for robustness. 

5. Optimize stop loss and take profit for profitability.

## Summary

This strategy integrates multiple indicators to determine trend direction, and enters on high probability bullish signals verified across timeframes and indicators. It can be improved by adjusting parameters, optimizing indicator combinations and incorporating more data to integrate more signals while maintaining stability for more trading opportunities.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Double HullMA|
|v_input_2|0.001|Decision Threshold (0.001)|
|v_input_3|-500|Stop Loss in $|
|v_input_4|25000|Target Point in $|
|v_input_5|7|Length|
|v_input_6|9|Conversion Line Periods|
|v_input_7|26|Base Line Periods|
|v_input_8|52|Lagging Span 2 Periods|
|v_input_9|26|Displacement|
|v_input_10|9|MACD_Length|
|v_input_11|12|MACD_fastLength|
|v_input_12|26|MACD_slowLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-17 00:00:00
end: 2023-09-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// Any timeFrame ok but good on 15 minute & 60 minute , Ichimoku + Daily-Candle_cross(DT) + HULL-MA_cross + MacD combination 420 special blend
strategy("Ichimoku + Daily-Candle_X + HULL-MA_X + MacD", shorttitle="٩(̾●̮̮̃̾•̃̾)۶", overlay=true, default_qty_type=strategy.percent_of_equity, max_bars_back=26, default_qty_value=100, calc_on_order_fills= true, calc_on_every_tick=true, pyramiding=0,precision=6)
keh=input(title="Double HullMA",defval=14, minval=1)
dt = input(defval=0.0010, title="Decision Threshold (0.001)", type=float, step=0.0001)
SL = input(defval=-500.00, title="Stop Loss in $", type=float, step=1)
TP = input(defval=25000.00, title="Target Point in $", type=float, step=1)
ot=1
p = input(7, minval=1, title="Length")
pi=3.1415926535
w=2*pi/p
beta = (1 - cos(w))/(pow(1.414,2.0/3) - 1)
alfa = -beta + sqrt(beta*beta + 2*beta)
ret1= pow(alfa,4)*close+4*(1-alfa)*nz(ret1[1])-6*pow(1-alfa,2)*nz(ret1[2])+4*pow(1-alfa,3)*nz(ret1[3])-pow(1-alfa,4)*nz(ret1[4])
ret2= pow(alfa,4)*close[1]+4*(1-alfa)*nz(ret1[1])-6*pow(1-alfa,2)*nz(ret1[2])+4*pow(1-alfa,3)*nz(ret1[3])-pow(1-alfa,4)*nz(ret1[4])
confidence=(security(syminfo.tickerid, 'D', close)-security(syminfo.tickerid, 'D', close[1]))/security(syminfo.tickerid, 'D', close[1])
conversionPeriods = input(9, minval=1, title="Conversion Line Periods")
basePeriods = input(26, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Periods")
displacement = input(26, minval=1, title="Displacement")
donchian(len) => avg(lowest(len), highest(len))
conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)
LS=close, offset = -displacement
MACD_Length = input(9)
MACD_fastLength = input(12)
MACD_slowLength = input(26)
MACD = ema(close, MACD_fastLength) - ema(close, MACD_slowLength)
aMACD = ema(MACD, MACD_Length)
closelong = ret1<ret2 and close<ret2 and confidence<dt or strategy.openprofit<SL or strategy.openprofit>TP
if (closelong)
    strategy.close("Long")
longCondition = ret1>ret2 and strategy.opentrades<ot and confidence>dt and close>ret2 and leadLine1>leadLine2 and open<LS and MACD>aMACD
if (longCondition)
    strategy.entry("Long",strategy.long)
//                         /L'-, 
//                               ,'-.           /MM . .             /  L '-, 
//     .                    _,--dMMMM\         /MMM  `..           /       '-, 
//     :             _,--,  )MMMMMMMMM),.      `QMM   ,<>         /_      '-,' 
//     ;     ___,--. \MM(    `-'   )M//MM\       `  ,',.;      .-'* ;     .' 
//     |     \MMMMMM) \MM\       ,dM//MMM/     ___ < ,; `.      )`--'    / 
//     |      \MM()M   MMM)__   /MM(/MP'  ___, \  \ `  `. `.   /__,    ,' 
//     |       MMMM/   MMMMMM( /MMMMP'__, \     | /      `. `-,_\     / 
//     |       MM     /MMM---' `--'_ \     |-'  |/         `./ .\----.___ 
//     |      /MM'   `--' __,-  \""   |-'  |_,               `.__) . .F. )-. 
//     |     `--'       \   \    |-'  |_,     _,-/            J . . . J-'-. `-., 
//     |         __  \`. |   |   |         \    / _           |. . . . \   `-.  F 
//     |   ___  /  \  | `|   '      __  \   |  /-'            F . . . . \     '` 
//     |   \  \ \  /  |        __  /  \  |  |,-'        __,- J . . . . . \ 
//     |    | /  |/     __,-  \  ) \  /  |_,-     __,--'     |. .__.----,' 
//     |    |/    ___     \    |'.  |/      __,--'           `.-;;;;;;;;;\ 
//     |     ___  \  \     |   |  `   __,--'                  /;;;;;;;;;;;;. 
//     |     \  \  |-'\    '    __,--'                       /;;;;;;;;;;;;;;\ 
// \   |      | /  |      __,--'                             `--;;/     \;-'\ 
//  \  |      |/    __,--'                                   /  /         \  \ 
//   \ |      __,--'                                        /  /           \  \ 
//    \|__,--'                                          _,-;M-K,           ,;-;\ 
//                                                     <;;;;;;;;           '-;;;; 
//a1=plot(n1,color=c)
//a2=plot(n2,color=c)
//plot(cross(n1, n2) ? n1 : na, style = circles, color=b, linewidth = 4)
//plot(cross(n1, n2) ? n1 : na, style = line, color=d, linewidth = 4)
//plot(conversionLine, color=#0496ff, title="Conversion Line")
//plot(baseLine, color=#991515, title="Base Line")
//plot(close, offset = -displacement, color=#459915, title="Lagging Span")
//p1=plot (leadLine1, offset = displacement, color=green,  title="Lead 1")
//p2=plot (leadLine2, offset = displacement, color=red,  title="Lead 2")
//fill(p1, p2, color = leadLine1 > leadLine2 ? green : red)
// remove the "//" from before the plot script if want to see the indicators on chart
```

> Detail

https://www.fmz.com/strategy/427728

> Last Modified

2023-09-24 13:11:38
