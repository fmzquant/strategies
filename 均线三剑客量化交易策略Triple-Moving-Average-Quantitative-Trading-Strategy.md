
> Name

均线三剑客量化交易策略Triple-Moving-Average-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/823831b8ea37647c22.png)
[trans]

概述:该策略是一种典型的技术分析策略,运用常用的几条均线指标EMA以及RSI、MACD、PSR等辅助指标,通过不同周期均线配置和指标信号的组合,形成进场和止损规则,寻找低买高卖的机会。

策略原理:该策略的核心是5、9、21日均线。当短周期均线上穿长周期均线时看多,而短周期均线下穿长周期均线时看空。此外,结合RSI指标判断超买超卖、MACD指标判定趋势、PSR指标识别支撑阻力进行组合交易。背景色设定显示市场情绪,辅助判断趋势方向。设置参数可自行组合和配置进场规则。

策略优势分析:
1. 均线指标清晰直观,容易判断趋势方向。
2. RSI可有效识别超买超卖现象,MACD判断长短趋势,PSR找关键价位,指标组合互补。  
3. 多种进场规则和参数设置灵活性强。
4. 可优化的指标和参数组合较多,可随市场不断调整和优化。

风险分析:
1. 短周期操作难以把握大趋势,存在错过反转的风险。  
2. 参数设置不当可能导致太多假信号或漏掉信号。
3. 纯技术面指标容易被套利机构利用导致亏损。
4. 大幅震荡行情中容易止损。

应对方法:
1. 适当把握中长线趋势,防止逆势短线操作。
2. 优化参数组合,设置止损,控制风险。
3. 注意高位回档和低位反弹的可能性。

优化方向:
1. 调整均线参数,测试最佳组合。
2. 增加其他辅助指标过滤信号。  
3. 增加机器学习指标判断概率。
4. 结合交易量变化提高信号准确率。
5. 增加止损策略,防止损失扩大。

总结:该策略综合多种辅助指标信号,利用均线指标的优势,挖掘短线低买高卖的机会。通过参数优化和指标组合可以不断提升策略效果,但需要适度控制操作频率和风险,防止单次亏损过大影响总体盈利。[/trans]

|| 

Overview: This strategy is a typical technical analysis strategy that utilizes several common moving average indicators like EMA and auxiliary indicators like RSI, MACD, PSR to form entry and stop loss rules for finding low buy high sell opportunities.  

Principle: The core of this strategy is the 5, 9, 21 day moving averages. When the short period MA crosses over the long period one, it signals an uptrend; when the short period MA crosses below the long period one, it signals a downtrend. In addition, RSI is used to determine overbought and oversold levels, MACD to judge the trend, PSR to identify support and resistance for combo trading. The background color shows market sentiment to assist trend judgment. The parameters are customizable for configuring entry rules.

Advantages:  
1. MA indicators give clear trend direction. 
2. RSI effectively spots overbought/oversold levels, MACD judges short-long trend, PSR finds key price levels. The indicators are complementary.
3. Flexible entry rules and parameter settings.  
4. Many optimizable indicators and parameter combinations adaptable to varying market conditions.

Risks:  
1. Short-term operations may fail to capture major trend and miss reversals. 
2. Improper parameter configuration can lead to too many false signals or missing good signals.  
3. Pure technical indicators are susceptible to manipulation by arbitrageurs causing losses.  
4. Prone to being stopped out in high volatile markets.

Solutions:
1. Capture mid-long term trend appropriately to avoid trading against major trend.  
2. Optimize parameters, use stop loss to control risks.
3. Watch out the possibilities of pullback from highs and bounce from lows.  

Optimization:
1. Fine tune MA parameters for best combo.  
2. Add more indicators to filter signals.
3. Increase machine learning metrics for probability estimate. 
4. Combine volume changes to enhance signal accuracy.  
5. Add stop loss to restrict loss expansion.

Summary: This strategy integrates multiple auxiliary signals, leverages the strength of MA indicators to identify short-term low buy high sell chances. Parameters and indicators combinations may be optimized continuously to improve strategy efficacy, but operation frequency and risks should be moderated to prevent oversized single trade loss from eroding overall profitability.

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
start: 2022-11-17 00:00:00
end: 2023-08-08 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("f.society v7", title="f.society v7", overlay=true)
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
dtime_pivot = request.security(syminfo.tickerid, 'D', pivot[1])
dtime_pivotAvg = request.security(syminfo.tickerid, 'D', smaP[1])
dtime_r1 = request.security(syminfo.tickerid, 'D', r1[1]) 
dtime_s1 = request.security(syminfo.tickerid, 'D', s1[1]) 
dtime_r2 = request.security(syminfo.tickerid, 'D', r2[1]) 
dtime_s2 = request.security(syminfo.tickerid, 'D', s2[1])
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

https://www.fmz.com/strategy/433095

> Last Modified

2023-11-24 13:52:42
