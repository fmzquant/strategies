
> Name

多重指标辅助策略Multi-indicator-Assisted-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略综合应用EMA、RSI、MACD、能量潮、布林带等多种技术指标,对价格走势进行多角度判断,找出较优的入场点。同时提供多种参数设置组合供用户调整,实现个性化策略。

## 策略原理

1. 使用3EMA(5周期、9周期、21周期)判断价格趋势;EMA均线叉显示趋势变化。

2. RSI指标判断超买超卖情况,RSI低于低点为超卖信号,高于高点为超买信号。

3. MACD指标查看均线差值,DIFF向上突破DEA为看涨信号,向下突破为看跌信号。

4. 能量潮指标SAR显示当前趋势方向,可辅助判断。

5. 布林带上下轨显示支撑与压力位置,价格突破其中轨道则提示趋势变化。 

6. 根据用户选择,当指标发出同方向信号时,采取相应的买入卖出操作。

## 策略优势

1. 多种指标综合判断,可避免单一指标误导。

2. 提供组合参数调整,用户可根据需要选择最佳指标组合。

3. EMA、MACD等指标对趋势变化判断准确。

4. RSI指标可有效识别超买超卖机会。

5. SAR和布林带可及时显示趋势转折点位。

## 策略风险

1. 多指标组合判断时机较少,可能错过较优机会。

2. 单一指标发出错误信号时无办法过滤。

3. 用户可能选择不当的参数组合,导致交易频繁或较少。

4. 没有 STOP LOSS 等风险管理措施。

5. 回测数据不足,无法充分验证策略有效性。

对应解决方法:

1. 调整参数,扩大指标THRESHHOLD,提供更多交易时机。

2. 增加其他指标进行组合验证,避免错误信号。

3. 提供更多指标选择,方便用户测试最佳组合。

4. 加入止损策略等措施限制风险。

5. 在更多市场中历史回测,决定最佳参数。

## 策略优化方向

1. 测试更多指标组合,寻找最佳匹配指标。

2. 增加机器学习模块,利用更多数据提升策略。

3. 加入趋势过滤器,根据趋势方向决定是否交易。

4. 优化资金管理策略,适应更多市场环境。

5. 开发自动参数优化程序,实现策略智能化。

## 总结

本策略通过组合应用多种技术指标,实现价格趋势的全面判断,避免单一指标依赖的不足。可通过调整指标参数、增加验证模块、引入AI等方式进一步优化,在保持策略稳健性的前提下,获取更多符合策略理念的交易机会。

|| 

## Overview

This strategy combines EMA, RSI, MACD, PSAR, Bollinger Bands and other technical indicators for overall trend judgment from multiple angles, finding optimal entry opportunities. It provides multiple parameter setting options for adjustable personalized strategies.

## Strategy Logic

1. Use 3 EMAs (5-, 9-, 21-period) to determine price trend. EMA crossovers signal trend changes.

2. RSI judges overbought/oversold levels. RSI below lower level signifies oversold; above upper level overbought. 

3. MACD checks moving average difference. DIFF crossing above DEA is bullish signal and below is bearish.

4. PSAR indicates current trend direction for additional context.

5. Bollinger Bands show support/resistance levels. Price breaking bands suggests trend change.

6. Take long/short positions when indicators give aligned signals based on user selection.

## Advantages

1. Multiple indicators avoid misleading signals from single indicator.

2. Customizable parameters allow users to select optimal combinations.

3. Accurate trend change detection from EMA, MACD etc. 

4. RSI efficiently identifies oversold/overbought opportunities.

5. SAR and Bollinger Bands reveal turning points.

## Risks

1. Fewer multi-indicator signal occurrences may miss good opportunities.

2. No filtering when single indicator gives false signal.

3. Users may choose suboptimal parameter sets leading to over/undertrading.

4. No risk management limits like STOP LOSS. 

5. Insufficient backtest data to fully validate strategy.

Possible solutions:

1. Widen indicator thresholds to provide more signals.

2. Add other indicators to filter out false signals.

3. Provide more indicator options for users to test combinations. 

4. Incorporate stop loss and other risk management.

5. Backtest on more markets to optimize parameters.

## Optimization Directions

1. Test more indicator combinations to find best matches.

2. Add machine learning modules for more data-driven improvements.

3. Incorporate trend filtering to determine trade direction.

4. Optimize money management for more market environments.

5. Develop auto parameter optimization for intelligent improvements.

## Summary

This strategy applies multiple technical indicators for comprehensive trend analysis, avoiding overreliance on single indicators. It can be further enhanced via parameter tuning, adding validation modules, integrating AI etc, to provide more quality signals while maintaining robustness.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Strategy: rsi|ema|macd|psr|off|BB|ema5|
|v_input_2|0|background color: rsi|ema|macd|psr|off|exchange|BB|ema5|
|v_input_3|false|Show ema5?|
|v_input_4|true|Show ema9?|
|v_input_5|true|Show ema21?|
|v_input_6|false|Show ema50?|
|v_input_7|false|Show ema100?|
|v_input_8|true|Show ema200|
|v_input_9|true|Color oversold and overbought bars?|
|v_input_10|true|Show Parabolic Sar|
|v_input_11|true|Show Bollinger Bands?|
|v_input_12|false|Show Daily Pivots?|
|v_input_13|true|linewidth|
|v_input_14|true|sar points width|
|v_input_15|40|oversold rsi|
|v_input_16|65|overbought rsi|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-17 00:00:00
end: 2023-09-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("f.society", title="f.society", overlay=true)
//@Author: rick#1414
// -----------------------------------------------------
// f.society : Pone 3EMA: 5, 9, 21, 50, 100, 200, SAR, 
// velas azules en sobreventa y velas moradas sobre compra 
// SAR 0.02, 0.02, 0.2 , Bandas de Bollinger
// estrategia de compra y venta con rsi, macd o psr
// color de fondo: ema, rsi (color azul sobreventa 35, 25 (mas intenso))
// -----------------------------------------------------
// Como agregar a Trading view:
// 1 Cerrar todos los otros indicadores antes de añadirlo
// 2. Ir a la página de inicio TradingView.com
// 3. En la parte inferior, haga clic en Editor Pine // ver imagen: // https://cdn.discordapp.com/attachments/407267549047422976/407393815112974336/unknown.png
// 4. borrar todo el texo y reemplazar con todo el contenido de este archivo
// 5. Pulse el botón "Añadir a trazar" (Add to graph)
// -----------------------------------------------------
// revisar opciones de on y off segun indicadores deseados
// https://cdn.discordapp.com/attachments/405885820114042883/412115277883506700/unknown.png
// se puede cambiar la estrategia desde este menu desplegable para señales buy/sell

// Options
estrategia = input(defval="rsi", title = "Strategy", options=["ema","rsi","macd","psr","off","BB","ema5"])
in_bkcolor = input(defval="rsi", title = "background color", options=["ema","rsi","macd","psr","off","exchange","BB","ema5"])
e5 = input(title="Show ema5?", type=bool, defval=false)
e9 = input(title="Show ema9?", type=bool, defval=true)
e21 = input(title="Show ema21?", type=bool, defval=true)
e50 = input(title="Show ema50?", type=bool, defval=false)
e100 = input(title="Show ema100?", type=bool, defval=false)
e200 = input(title="Show ema200", type=bool, defval=true)
in_rsi = input(title="Color oversold and overbought bars?", type=bool, defval=true)
in_sar = input(title="Show Parabolic Sar", type=bool, defval=true)
in_bb = input(title="Show Bollinger Bands?", type=bool, defval=true)
sd = input(false, title="Show Daily Pivots?")
linew = input(1, title="linewidth", minval=0)
sarw = input(1, title="sar points width", minval=0)
ovs = input(40, title="oversold rsi", minval=0)
ovb = input(65, title="overbought rsi", minval=0)



//pf = input(false,title="Show Filtered Pivots")
pf=false

// 3 ema
src = close // input(close, title="Source")
//len9 = input(9, minval=1, title="ema9 Length")
//len21 = input(21, minval=1, title="ema21 Length")
//len200 = input(200, minval=1, title="ema200 Length")
len5=5
len9=9
len21=21
len50=50
len100=100
len200=200
ema5 = ema(src, len5)
ema9 = ema(src, len9)
ema21 = ema(src, len21)
ema50= ema(src, len50)
ema100 = ema(src, len100)
ema200 = ema(src, len200)
plot(e5? ema5 : na, title="EMA5", linewidth=linew, color=purple)
plot(e9? ema9 : na, title="EMA9", linewidth=linew, color=blue)
plot(e21? ema21 : na, title="EMA21", linewidth=linew, color=red)
plot(e50? ema50 : na, title="EMA50", linewidth=linew, color=green)
plot(e100? ema100 : na, title="EMA100", linewidth=linew, color=lime)
plot(e200? ema200 : na, title="EMA200", linewidth=linew, color=yellow)

// RSI Color
//lenR = input(14, minval=1, title="RSI Length")
lenR=14
//up = rma(max(change(src), 0), lenR)
//down = rma(-min(change(src), 0), lenR)
//vrsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
vrsi=rsi(close,lenR)
//plot(vrsi,title="vrsi")
oversold = vrsi < ovs
overbought = vrsi > ovb
barcolor(in_rsi? oversold? #0000FF : overbought? #ff00ff:na : na)

// SAR
plot(in_sar? sar(0.02, 0.02, 0.2): na, style=cross, linewidth=sarw, color=blue, title="sar")

// BB
//length = input(20, title="Bollinger length", minval=1)
length=20
//mult = input(2.0, title="Bollinger stdDev", minval=0.001, maxval=50)
mult=2.0
basis = sma(src, length)
dev = mult * stdev(src, length)
upper = basis + dev
lower = basis - dev
plot(in_bb? basis :na, color=red, linewidth=linew, title="BB basis")
p1 = plot(in_bb? upper :na, color=blue, linewidth=linew, title="BB upper")
p2 = plot(in_bb? lower :na, color=blue, linewidth=linew, title="BB lower")
fill(p1, p2)

//background
bgcolor(in_bkcolor=="exchange"? #0000FF40 : in_bkcolor=="rsi"? vrsi < (ovs-15) ? #0000FF50  : vrsi < ovs ? #0000FF30 :( vrsi < ovb ? #ff00ff10 : #ff00ff20): in_bkcolor=="ema"?(ema9>ema21?#ff00ff10  : #0000FF20):in_bkcolor=="BB"?(lower>close?#ff00ff10 : close>upper?#0000FF20:#ff00ff10): in_bkcolor=="ema5"?(ema5>ema21?#ff00ff10  : #0000FF20):na)


// Strategy
if estrategia == "ema"
    strategy.entry("buy", true, 1, when= crossover(ema9,ema21) ),
    strategy.entry("sell", false, 1, when = crossover(ema21,ema9)) 
else
    if estrategia =="rsi"
        strategy.entry("buy", true, 1, when= vrsi <ovs),
        strategy.entry("sell", false, 1, when = vrsi > ovb or crossover(close,upper)) 
    else 
        if estrategia =="macd"    
            [macdLine, signalLine, histLine] = macd(close, 12, 26, 9),
            //bgcolor(macdLine > signalLine ? #98c8ff : #ff8b94),
            strategy.entry("buy", true, 1, when= macdLine>=signalLine ),
            strategy.entry("sell", false, 1, when = macdLine<signalLine) 
        else 
            if estrategia=="psr"
                leftBars = 4 //input(4)
                rightBars = 2 //input(2)
                swh = pivothigh(leftBars, rightBars)
                swl = pivotlow(leftBars, rightBars)
                swh_cond = not na(swh)
                hprice = 0.0
                hprice := swh_cond ? swh : hprice[1]
                le = false
                le := swh_cond ? true : (le[1] and high > hprice ? false : le[1])
                if (le)
                    strategy.entry("buy", strategy.long, comment="buy", stop=hprice + syminfo.mintick)
                swl_cond = not na(swl)
                lprice = 0.0
                lprice := swl_cond ? swl : lprice[1]
                se = false
                se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])
                if (se)
                    strategy.entry("sell", strategy.short, comment="sell", stop=lprice - syminfo.mintick)
            else
                if estrategia=="BB"
                    strategy.entry("buy", true, 1, when= crossover(lower,close) ),
                    strategy.entry("sell", false, 1, when = crossover(close,upper)) 
                else
                    if estrategia=="ema5"
                        strategy.entry("buy", true, 1, when= crossover(ema5,ema21) ),
                        strategy.entry("sell", false, 1, when = crossover(ema21,ema5)) 



// pivots

// Classic Pivot
pivot = (high + low + close ) / 3.0
// Filter Cr
bull= pivot > (pivot + pivot[1]) / 2 + .0025
bear= pivot < (pivot + pivot[1]) / 2 - .0025
// Classic Pivots
r1 = pf and bear ? pivot + (pivot - low) : pf and bull ? pivot + (high - low) : pivot + (pivot - low)
s1 = pf and bull ? pivot - (high - pivot) : pf and bear ? pivot - (high - low) : pivot - (high - pivot)
r2 = pf ? na : pivot + (high - low)
s2 = pf ? na : pivot - (high - low)
//Pivot Average Calculation
smaP = sma(pivot, 3)
//Daily Pivots 
dtime_pivot = security(syminfo.tickerid, 'D', pivot[1])
dtime_pivotAvg = security(syminfo.tickerid, 'D', smaP[1])
dtime_r1 = security(syminfo.tickerid, 'D', r1[1]) 
dtime_s1 = security(syminfo.tickerid, 'D', s1[1]) 
dtime_r2 = security(syminfo.tickerid, 'D', r2[1]) 
dtime_s2 = security(syminfo.tickerid, 'D', s2[1])
offs_daily = 0
plot(sd and dtime_pivot ? dtime_pivot : na, title="Daily Pivot",style=line, color=fuchsia,linewidth=linew) 
plot(sd and dtime_r1 ? dtime_r1 : na, title="Daily R1",style=line, color=#DC143C,linewidth=linew) 
plot(sd and dtime_s1 ? dtime_s1 : na, title="Daily S1",style=line, color=lime,linewidth=linew) 
plot(sd and dtime_r2 ? dtime_r2 : na, title="Daily R2",style=line, color=maroon,linewidth=linew) 
plot(sd and dtime_s2 ? dtime_s2 : na, title="Daily S2",style=line, color=#228B22,linewidth=linew) 


// References:
// get number of bars since last green bar
//plot(barssince(close >= open), linewidth=3, color=blue)
//bgcolor(close < open ? #ff8b94   : #98c8ff , transp=10)
//http://www.color-hex.com/
//   #98c8ff    light blue
//    #ff8b94   red   #b21c0e
//       #7d1d90    purple
//    #0029ff blue
//    #fffa86   yellow
```

> Detail

https://www.fmz.com/strategy/427731

> Last Modified

2023-09-24 13:17:50
