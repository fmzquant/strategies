
> Name

基于价格摩擦区的趋势追踪策略Trend-Following-Strategy-Based-on-Price-Friction-Zones

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略通过计算价格在不同区域的停留时间,判断价格是否进入新的无阻力区,在无阻力区产生趋势追踪交易信号。属于趋势追踪类策略。

## 策略原理

1. 计算过去N周期内,价格在当下水平附近的停留比例,作为价格摩擦度。

2. 判断价格是否进入过去一段时间少有停留的低摩擦区域,作为产生信号的无阻力区。

3. 使用快速加权移动均线判断最近趋势方向,在无阻力区发生突破时进行趋势交易。

4. 当价格重新进入高摩擦区域时,预判趋势反转停利退出。

5. 交易参数可自定义,包括摩擦区判断周期、突破进入区等。

## 优势分析

1. 利用价格摩擦度判断无阻力区,避开震荡区间。

2. 快速均线跟踪最近趋势,组合使用判断方向。

3. 直观的视觉界面,显示价格摩擦区域。

4. 默认参数针对加密货币高频交易进行优化。

5. 策略规则简单清晰,易于理解和修改。

## 风险分析

1. 价格摩擦度无法完全预测价格走势。

2. 快速均线判断时机可能不准确。

3. 无法有效平滑进入和退出市场。

4. 优化时可能存在过拟合风险。

5. 市场剧烈变化时,固定参数效果可能不佳。

## 优化方向

1. 测试不同周期参数计算价格摩擦度。

2. 评估不同类型均线判断最近趋势。

3. 优化无阻力区突破的参数,提高策略稳定性。

4. 添加止损止盈策略,管理交易风险。

5. 考虑采用动态参数,适应市场变化。

6. 在更多品种和周期进行回测验证。

## 总结

该策略通过价格摩擦度找到高概率趋势爆发区域进行交易,具有一定的优势。但也存在参数固定的局限性。通过动态参数优化、风险管理等机制增强,可以将策略打造得更稳健高效。

||


## Overview

This strategy measures price dwell time in different zones to identify low friction areas, and trades breakouts in these zones. It belongs to trend following strategies.

## Strategy Logic

1. Calculate price dwell ratio around current levels over past N periods as price friction.

2. Identify if price enters low friction zones with minimal dwell time recently.

3. Use fast weighted MA to determine recent trend direction. Trade breakouts in low friction zones along trend.

4. Take profit when price re-enters high friction zones anticipating trend reversal.

5. Customizable parameters including friction lookback, breakout zone etc.

## Advantages

1. Price friction avoids ranging markets and finds trend outbreak zones.

2. Fast MA combines with friction to determine direction.

3. Intuitive visuals displaying price friction levels.

4. Default parameters optimized for crypto high frequency trading.

5. Simple and clear logic easy to comprehend and customize.

## Risks 

1. Price friction unable to fully predict future moves.

2. Fast MA may produce inaccurate timing.

3. Ineffective smoothing into and out of trades.

4. Optimization risks overfitting.

5. Fixed parameters may underperform in volatile markets.

## Enhancement

1. Test different periods to calculate price friction.

2. Evaluate different MA types to determine recent trend.

3. Optimize breakout zone parameters for higher stability. 

4. Add stop loss and take profit for risk management.

5. Consider dynamic parameters to adapt to changing markets.

6. Backtest across more symbols and timeframes.

## Conclusion

This strategy trades price friction zones with high probability breakout potential, with pros and cons. Enhancements like dynamic optimization and risk management can make it more robust and efficient.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|500|bars back to measure friction|
|v_input_2|50|0-100 friction level to stop trade|
|v_input_3|-10|pic lower than 0 to number selected above to initiate trade|
|v_input_4|100|bars back to measure lowest friction|
|v_input_5_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|2|leverage|
|v_input_7|true|enable shorts?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//made for 30m chart with BTCUSD or other cryptocurrency
strategy("LUBE",overlay=false )
friction=0.0
barsback=input(500,"bars back to measure friction",step=100)
flevel=input(50,"0-100 friction level to stop trade",step=2)
tlevel=input(-10,"pic lower than 0 to number selected above to initiate trade",step=2)
fl=flevel/100
tl=tlevel/100

for i = 1 to barsback
    friction := if high[i] >= close and low[i] <= close 
        friction+(1+barsback)/(i+barsback)
    else
        friction

range=input(100,"bars back to measure lowest friction",step=10)
lowf = lowest(friction,range)
highf = highest(friction,range)
midf = (lowf*(1-fl)+highf*fl)
lowf2 = (lowf*(1-tl)+highf*tl)
plot(friction)
m=plot(midf[5],color=color.red)
l=plot(lowf2[5],color=color.white)
h=plot(highf[5],color=color.white)
fill(l,h,color.white)

src = input(title="Source", type=input.source, defval=close)

//FIR Filter
_fir(src) =>
    (4 * src + 3 * nz(src[1]) + 2 * nz(src[2]) + nz(src[3])) / 10

fir = _fir(src)

trend =  fir > fir[1]? 1:-1

//bgcolor(trend==1?color.lime:color.red,transp=50)

long=friction<lowf2[5] and trend == 1
short=friction<lowf2[5] and trend == -1
end=friction > midf[5]

keeplong=0
keeplong:=long?1:nz(keeplong[1])
keeplong:=short or end?0:keeplong

keepshort=0
keepshort:=short?1:nz(keepshort[1])
keepshort:=long or end?0:keepshort

bgcolor(keeplong==1?color.lime:keepshort==1?color.red:na,transp=50)

leverage=input(2,"leverage",step=.5)
enableshort=input(true,"enable shorts?")

barcount=0
barcount:=nz(barcount[1])+1

contracts=min(max(.000001,(strategy.equity/close)*leverage),50000)
strategy.entry("Long",strategy.long,when=long and barcount>20, qty=contracts)

strategy.close("Long",when=short or end )

strategy.entry("Short",strategy.short,when=short and enableshort==true and barcount>20, qty=contracts)

strategy.close("Short",when=(long or end) and enableshort==true)

alertcondition(keeplong==1 and keeplong[1]==0,"LONG")
alertcondition(keepshort==1 and keepshort[1]==0,"SHORT")
alertcondition((keeplong[1]==1 or keepshort[1]==1) and (keeplong==0 and keepshort==0),"CLOSE TRADE")

```

> Detail

https://www.fmz.com/strategy/427391

> Last Modified

2023-09-20 16:46:17
