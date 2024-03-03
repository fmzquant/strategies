
> Name

Price-Action策略Price-Action-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

这是一个基于价位行情的交易策略,结合均线指标识别趋势,利用价格形态进行入场。

## 策略原理

该策略主要基于以下几个方面:

1. 使用EMA均线判断趋势。当89周期EMA和Hull MA均为红色时,判断为 Bear 趋势,只做空;当两条均线均为绿色时,判断为Bull趋势,只做多;当一条为绿一条为红时,判断为震荡,可做多可做空。

2. 使用价格形态识别信号。策略识别多种阳线阴线组合,如单实体线、假突破形态、母子线等,以识别潜在的入场时点。

3. 结合关键支撑阻力位入场。策略同时结合关键的支撑阻力位,进一步验证价格形态信号,避免假突破。

4. MACD辅助判断。结合MACD指标的柱状线颜色,验证价格形态信号,提高成功率。

5. 采用趋势追踪机制。策略加入趋势追踪模块,能更准确判断趋势转折点,避免追顶和追底。

6. 设定止损止盈点。策略加入了基于ATR的值进行的止损和止盈模块,有助于把握盈亏比。

## 优势分析

该策略具有以下优势:

1. 基于价格行情,不受指标影响。纯粹基于价位判断,不受复杂指标误导,更接近市场本源。

2. 结合趋势理念,避免追顶追底。加入EMA和Hull MA识别趋势方向,只在趋势方向操作,避免逆势入场。

3. 形态结合指标,提高成功率。价格形态与MACD指标互相验证,可过滤假信号,提高获利概率。

4. 追踪机制可抓大趋势。趋势追踪模块可抓取较大时间周期的趋势,获利空间更大。

5. 有止损止盈机制,可控风险。设定了固定的止损止盈比例,有助于把握盈亏比,控制风险。

## 风险分析

该策略也存在以下风险:

1. 大周期趋势反转风险。策略只适合在中短线较为明确的趋势内操作,若遇到大周期趋势反转,将Stopped out。可通过放大周期分析大趋势来规避。

2. 价格形态失效风险。价格形态在不同市场环境下的效果差异很大,在某些市场形态无法按预期发挥效用,导致系统停损。可通过对不同市场形态效力的回测来优选适用的形态。 

3. 参数优化困难。策略包含多种参数,不同参数组合对结果影响很大,需要大量回测来找到最佳参数,而参数静态设置又面临市场变化的风险。可建立动态参数优化机制来应对。

4. 无法有效控制单笔风险。固定的止损止盈点设置难以把握每笔交易的波动,无法针对性控制单笔盈亏比例。可以引入动态止损算法或风控模块。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 引入机器学习识别更复杂价格形态。使用深度学习等技术自动识别更多有效形态。

2. 增加自适应性。建立动态参数优化机制,使策略参数可根据实时市场调整,而不是静态设置。

3. 结合更多因子验证信号。加入更多价格行情因子,如成交量、overnight gaps等进行验证,降低被套风险。

4. 引入风控和仓位管理模块。根据阈值自动调整仓位规模,有效控制单笔止损,优化盈亏比。

5. 优化入场机制。可细化趋势判断模块,识别更清晰的趋势震荡节奏,以提高入场成功率。

## 总结

整体来说,该策略核心优势在于基于价格行情判断,避免依赖指标,最大程度反映市场本质。结合趋势与指标可提高获利概率,加入止盈止损控制风险。但需防大周期趋势反转、价格形态失效等风险。未来可通过机器学习、动态参数优化、风控模块等进行深化,使策略更稳定可靠。

|| 

## Overview

This is a trading strategy based on price action, combined with moving averages to identify trends and using price patterns for entry.

## Strategy Principles 

The strategy is mainly based on the following aspects:

1. Using EMA to judge trends. When 89-period EMA and Hull MA are both red, it is judged as a Bear trend, go short only; when both are green, it is judged as a Bull trend, go long only; when one is green and one is red, it is judged as consolidation, both long and short are possible.

2. Identifying signals with price patterns. The strategy recognizes various candlestick combinations like single candles, fakey patterns, inside bars etc. to spot potential entry points. 

3. Combining with key support/resistance levels for entry. The strategy also incorporates key S/R levels to further verify price pattern signals and avoid false breakouts.

4. MACD as confirmation. MACD histogram colors are used to confirm price pattern signals and improve probability. 

5. Trend following mechanism. The strategy includes a trend following module to more accurately detect trend reversals and avoid chasing tops and bottoms.

6. Setting stop loss and take profit. Fixed stop loss and take profit based on ATR are included to manage risk/reward.

## Advantage Analysis

The strategy has the following advantages:

1. Based on price action, unaffected by indicators. Pure price-based without complex indicators, closer to market nature.

2. Combining trends, avoiding chasing. EMA and Hull MA identify trend direction, operating along trends, avoiding counter-trend trades.

3. Pattern + indicator improves probability. Price patterns combined with MACD verifies signals, filters false signals, improving profitability. 

4. Trend following catches big moves. Trend following module catches larger time frame trends, with greater profit potential.

5. Stop loss/take profit controls risk. Fixed stop loss/take profit ratios help manage risk/reward.

## Risk Analysis

The strategy also has the following risks:

1. Larger time frame trend reversal risk. The strategy works best with clear mid/short-term trends. Larger reversal risks being stopped out. Larger time frame analysis can help avoid.

2. Price pattern failure risk. Price patterns have varying effectiveness in different market environments. Some markets can cause patterns to fail, leading to losses. Backtesting various markets can optimize pattern selection.

3. Parameter optimization difficulty. The strategy has multiple parameters. Different combinations impact results significantly. Extensive backtesting required to find optimal parameters. Static setting also risks market regime changes. A dynamic parameter optimization mechanism can help address this.

4. Inability to control individual trade risk. Fixed stop loss/take profit cannot adapt to fluctuations in each trade and manage individual trade risk/reward ratios. Dynamic stop loss algorithms or risk management modules can help.

## Optimization Directions

The strategy can be improved in the following aspects:

1. Introduce machine learning for more complex pattern recognition. Use deep learning etc. to automatically detect more effective patterns.

2. Increase adaptiveness. Build dynamic parameter optimization mechanisms so the strategy can adjust based on real-time market conditions rather than static settings.

3. Incorporate more factors to verify signals. Add more price action factors like volume, overnight gaps etc. to confirm signals and reduce risk of being trapped.

4. Introduce risk management and position sizing. Automatically adjust position sizes based on thresholds to effectively control single trade stop loss and optimize risk/reward ratios.

5. Optimize entry mechanisms. Refine trend detection modules to identify trend/consolidation rhythms more accurately improving entry accuracy.

## Conclusion

Overall, the core strength of this strategy lies in price action-based judgments, avoiding dependence on indicators and maximally reflecting market nature. Combining trends and indicators improves profitability while stop loss/take profit controls risk. But risks like larger time frame trend reversals, price pattern failures need to be addressed. Future improvements can come from machine learning, dynamic parameter optimization, risk management modules etc. to make the strategy more robust.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|onlybuy|
|v_input_2|false|onlysell|
|v_input_3|50|Chốt lời (Pip)|
|v_input_4|20|Cắt lỗ (Pip)|
|v_input_5|true|Sử dụng chốt lời và cắt lỗ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
args: [["v_input_1",true]]
*/

//@version=2
// strategy(title="Price Action", shorttitle="Price Action", overlay=true,default_qty_value=2000,initial_capital=1000,currency=currency.USD, pyramiding=1,calc_on_every_tick=true)
// EMA //
HiLoLen = 34
pacL = ema(low,HiLoLen)
pacC = ema(close,HiLoLen)
pacH = ema(high,HiLoLen)
signalMA = ema(close,89)
col1=pacC>signalMA?lime:pacC<signalMA?red:yellow
plot(signalMA, color=col1, title="SignalMA")
// Plot the Price Action Channel (PAC) base on EMA high,low and close//
//L=plot(pacL, color=yellow, linewidth=1, title="High PAC EMA",transp=0)
//C=plot(pacC, color=yellow, style = line, linewidth=1, title="Close PAC EMA",transp=0)
//H=plot(pacH, color=yellow, linewidth=1, title="Low PAC EMA",transp=0)
// HullMA //
n=89
//
n2ma=2*wma(close,round(n/2))
nma=wma(close,n)
diff=n2ma-nma
sqn=round(sqrt(n))
//
n2ma1=2*wma(close[1],round(n/2))
nma1=wma(close[1],n)
diff1=n2ma1-nma1
sqn1=round(sqrt(n))
//
n1=wma(diff,sqn)
n2=wma(diff1,sqn)
condDown = n2 >= n1
condUp = condDown != true
col =condUp ? lime : condDown ? red : yellow
plot(n1,title="Hull MA", color=col,linewidth=1)
// Macd Barcolor
fastlength = 12
slowlength = 26
MACDLength = 9
MACD = ema(close, fastlength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD
hisup= iff(delta>delta[1] and delta>0, 1,iff(delta<delta[1], -1, nz(hisup[1], 0)))
hisdown = iff(delta<delta[1] and delta<0, 1,iff(delta>delta[1], -1, nz(hisdown[1], 0)))
//Swing high low// 
ktswinghigh=(high<=high[2] and high[1]<=high[2] and high[3]<=high[2] and high[4]<=high[2])// and high<high[1] and high[4]<high[3]) or (high<high[1] and high[1]<high[2] and high[4]<high[2] and high[5]<high[2] and high[3]<high[2]) 
ktswinghigh3=(high<high[1] and high[1]<high[3] and high[5]<high[3] and high[6]<high[5]and high[2]<high[3] and high[4]<high[3]) or(high<high[3] and high[2]<high[3] and high[1]<high[3] and high[4]<high[3] and high[5]<high[4])
sh=ktswinghigh?high[2]:na
swinghigh = fixnan(sh)
colorsh=swinghigh==swinghigh[1]?white:na
plot(swinghigh,color=colorsh,title="Swing High",style=line,offset=-2)

ktswinglow=(low>=low[2] and low[1]>=low[2] and low[3]>=low[2] and low[4]>=low[2])// and low>low[1] and low[4]>low[3]) or (low>low[1] and low[1]>low[2] and low[4]>low[2] and low[5]>low[2] and low[3]>low[2])
ktswinglow3=low>low[1] and low[1]>low[3] and low[5]>low[3] and low[6]>low[5]  and low[2]>low[3] and low[4]>low[3] or (low>low[3] and low[1]>low[3] and low[2]>low[3] and low[4]>low[3] and low[5]>low[4])
sl=ktswinglow?low[2]:na
swinglow = fixnan(sl)
colorsl=swinglow==swinglow[1]?white:na
plot(swinglow,title="Swing Low",color=colorsl,style=line,offset=-2)

// Pinbar FailBreak
ema21=ema(close,13)
beariskpinbar= (close-open<(high-low)/3 and open-close<(high-low)/3)  and ((high>swinghigh and high>high[1] and high>high[2] and high>high[3] and close<swinghigh))// or ((open[2]<ema21[2] or close[2]<ema21[2]) and high>ema21 and low[2]<low[1] and low[3]<low[2] and high>high[1] and high>high[2] and high>high[3]))
bullishpibar=(close-open<(high-low)/3 and open-close<(high-low)/3)  and ((low<swinglow and low<low[1] and low<low[2] and low<low[3] and close>swinglow))// or ((open[2]>ema21[2] or close[2]>ema21[2]) and low<ema21 and high[2]>high[1] and high[3]>high[2] and low<low[1] and low<low[2] and low<low[3]))

//
Inside(position) => high <= high[position] and low >= low[position]
outsidebar = (high >= high[1] and low <= low[1])
barcolor((high <= high[1] and low >= low[1]) ? white : na)
barcolor(hisup==1 and MACD>0 ? lime: hisdown==1 and MACD<0 ? red : hisup==-1 and MACD>0  ? green: orange )
barcolor(bullishpibar or beariskpinbar ?white:na)
secLast = 1
fakey = (high[1] <= high[2] and low[1] >= low[2] and high > high[2] and close >= low[2] and close < high[2]) or (high[2]<=high[3] and low[2]>=low[3] and high[1]>high[2] and close<high[2] and close>low[3] and high-close>0.75*(high-low))// ? red : na
fakey1 = (high[1] <= high[2] and low[1] >= low[2] and low < low[2] and close > low[2] and close <= high[1]) or (high[2]<=high[3] and low[2]>=low[3] and low[1]<low[2] and close>low[2] and close<high[3] and close-low>0.75*(high-low)) //? lime : na
barcolor(fakey or fakey1?white:na)
//plotshape(beariskpinbar and (not fakey or (fakey and outsidebar)) , title= "Pinbar Bearisk", location=location.abovebar, color=white, style=shape.arrowdown, text="Pinbar",size=size.tiny)
//plotshape(bullishpibar  and (not fakey1 or (fakey1 and outsidebar)), title= "Pinbar Bullish", location=location.belowbar, color=white, style=shape.arrowup, text="Pinbar",size=size.tiny)

//insidebar= Inside(secLast)? #FF9800: na
onewhitesoliderbear=  close<open and high[1]-close>0.5*(high[1]-low[1]) and (open-close)>2/3*(high-low) and (high[1]>ema21[1] or high>ema21) and open[1]<ema21[1] and close-low<(high-close)*0.3 and (open[2]<ema21[2] or close[2]<ema21[2]) and close<ema21 and low[2]<low[1] and low[3]<low[2]
onewwhitesoliderbull=  close>open and close-low[1]>0.5*(high[1]-low[1]) and (close-open)>2/3*(high-low) and (low[1]<ema21[1] or low<ema21) and open[1]>ema21[1] and high-close<(close-low)*0.3  and (open[2]>ema21[2] or close[2]>ema21[2]) and close>ema21 and high[2]>high[1] and high[3]>high[2]
onewhitesoliderbear1=  close<open and high[1]-close>0.5*(high[1]-low[1]) and (open-close)>2/3*(high-low) and (high[1]>pacC[1] or high>pacC) and open[1]<pacC[1] and close-low<(high-close)*0.3 and (open[2]<pacC[2] or close[2]<pacC[2]) and close<pacC and low[2]<low[1] and low[3]<low[2]
onewwhitesoliderbull1=  close>open and close-low[1]>0.5*(high[1]-low[1]) and (close-open)>2/3*(high-low) and (low[1]<pacC[1] or low<pacC) and open[1]>pacC[1] and high-close<(close-low)*0.3  and (open[2]>pacC[2] or close[2]>pacC[2]) and close>pacC and high[2]>high[1] and high[3]>high[2]
onewhitesoliderbear2=  close<open and high[1]-close>0.5*(high[1]-low[1]) and (open-close)>2/3*(high-low) and (high[1]>signalMA[1] or high>signalMA) and open[1]<signalMA[1] and close-low<(high-close)*0.3 and (open[2]<signalMA[2] or close[2]<signalMA[2]) and close<signalMA and low[2]<low[1] and low[3]<low[2]
onewwhitesoliderbull2=  close>open and close-low[1]>0.5*(high[1]-low[1]) and (close-open)>2/3*(high-low) and (low[1]<signalMA[1] or low<signalMA) and open[1]>signalMA[1] and high-close<(close-low)*0.3  and (open[2]>signalMA[2] or close[2]>signalMA[2]) and close>signalMA and high[2]>high[1] and high[3]>high[2]

//plotshape(beariskpinbar and (not fakey or (fakey and outsidebar)) and not onewhitesoliderbear and not onewwhitesoliderbull, title= "Pinbar Bearisk", location=location.abovebar, color=white, style=shape.arrowdown, text="Pinbar",size=size.tiny)
//plotshape(bullishpibar  and (not fakey1 or (fakey1 and outsidebar)) and not onewwhitesoliderbull and not onewhitesoliderbear, title= "Pinbar Bullish", location=location.belowbar, color=white, style=shape.arrowup, text="Pinbar",size=size.tiny)

//

//pinbar=(open>ema21 and low<ema21 and close-low>2*(high-close)) or (open[1]>ema21[1] and low[1]<ema21[1] and (close-low[1]>2*(high[1]-close) or close-low>2*(high[1]-close)))? green:na
//pinbar2=(open<ema21 and high>ema21 and high-close>2*(close-low)) or (open[1]<ema21[1] and high[1]>ema21[1] and (high[1]-close>2*(close-low[1]) or high-close>2*(close-low[1])))?orange:na
//plot(ema21)
//bgcolor(insidebar, transp=70)
//bgcolor(fakey, transp=80)
//bgcolor(fakey1, transp=80)
//bgcolor(pinbar, transp=70)
//bgcolor(pinbar2, transp=70)

insidebar = ((high[1] <= high[2] and low[1] >= low[2]) and not(outsidebar))
barcolor(outsidebar and high[1]<=high[2] and low[1]>=low[2]?white:na)
bearishibbf=( insidebar and (high > high[1] and close < high[1]))
//barcolor( bearishibbf ? white : na, 0, true, "Bearish Inside Bar Breakout Failure")
//plotshape(bearishibbf and not fakey, title= "Bearish Inside Bar Breakout Failure", location=location.abovebar, color=white, style=shape.arrowdown, text="InsideBar\nFailBreak",size=size.tiny)

bullishibbf=(insidebar and (low < low[1] and close > low[1]))
//barcolor( bullishibbf ? white : na, 0, true, "Bullish Inside Bar Breakout Failure")
//plotshape(bullishibbf and not fakey1, title= "Bullish Inside Bar Breakout Failure", location=location.belowbar, color=white, style=shape.arrowup, text="InsideBar\nFailBreak",size=size.tiny)
//
barcolor((onewwhitesoliderbull or onewhitesoliderbear) and not insidebar?white:na)
//

// Outsidebar follow Insidebar
///plotshape(outsidebar and ((high[1]<=high[2] and low[1]>=low[2] ) ) and close<ema21 and not beariskpinbar and not bullishpibar, title= "OutsideBar Break InsideBar", location=location.abovebar, color=white, style=shape.arrowdown, text="Outside\nBar",size=size.tiny)
//plotshape(outsidebar and ((high[1]<=high[2] and low[1]>=low[2]) ) and close>ema21 and not beariskpinbar and not bullishpibar, title= "OutsideBar Break InsideBar", location=location.belowbar, color=white, style=shape.arrowup, text="Outside\nBar",size=size.tiny)
//
whitesoldierreversal= ((low[1]<low[2] and low[2]<low[3]) or (high[1]<high[2] and high[2]<high[3])) and low[3]<low[8] and low[8]<ema21[8] and high[2]<ema21[2] and high[1]<ema21[1]  and high[3]<ema21[3] and close-low[1]>(high[1]-close) and (open<close[1] or open<open[1]) and close-open>0.3*(high-low) and high-close<0.5*(close-open)
blackcrowreversal= ((high[1]>high[2] and high[2]>high[3]) or (low[1]>low[2] and low[2]>low[3])) and high[3]>high[8] and high[8]>ema21[8] and low[2]>ema21[2] and low[1]>ema21[1] and low[3]>ema21[3] and close-low[1]<(high[1]-close) and (open>close[1] or open>open[1]) and open-close>0.3*(high-low) and close-low<0.5*(open-close)
// Black Crow and White Soldier Reversal
//plotshape(whitesoldierreversal, title= "Piercing Pattern", location=location.belowbar, color=white, style=shape.arrowup, text="Piercing",size=size.tiny)
//plotshape(blackcrowreversal, title= "Dark Cloud Cover", location=location.abovebar, color=white, style=shape.arrowdown, text="Dark\nCloud",size=size.tiny)
barcolor(blackcrowreversal or whitesoldierreversal?white:na)
//
pinbarreversalbull= ((low[1]<low[2] and low[2]<low[3]) or (high[1]<high[2] and high[2]<high[3])) and low[3]<low[8] and low[8]<ema21[8] and high[2]<ema21[2] and high[1]<ema21[1]  and high[3]<ema21[3] and close-open<(high-low)/3 and open-close<(high-low)/3 and high-close<close-low and low<low[1]
pinbarreversalbear= ((high[1]>high[2] and high[2]>high[3])or (low[1]>low[2] and low[2]>low[3])) and high[3]>high[8] and high[8]>ema21[8] and low[2]>ema21[2] and low[1]>ema21[1] and low[3]>ema21[3] and close-open<(high-low)/3 and open-close<(high-low)/3 and high-close>close-low and high>high[1]
// Pinbar Reversal
//plotshape(pinbarreversalbull and not whitesoldierreversal and not fakey1 and not blackcrowreversal and not whitesoldierreversal and not bullishpibar, title= "Bullish Pinbar Reversal", location=location.belowbar, color=white, style=shape.arrowup, text="Pinbar",size=size.tiny)
//plotshape(pinbarreversalbear and not blackcrowreversal and not fakey and not whitesoldierreversal and not blackcrowreversal and not beariskpinbar, title= "Bearisk Pinbar Reversal", location=location.abovebar, color=white, style=shape.arrowdown, text="Pinbar",size=size.tiny)
barcolor(pinbarreversalbear or pinbarreversalbull?white:na)
// Fakey
plotshape(fakey and (not outsidebar or not (high[1]<=high[2] and low[1]>=low[2]) )  and not blackcrowreversal   , title= "Fakey Bearisk", location=location.abovebar, color=white, style=shape.arrowdown, text="Fakey",size=size.tiny)
plotshape(fakey1 and (not outsidebar or not (high[1]<=high[2] and low[1]>=low[2]) )  and not whitesoldierreversal , title= "Fakey Bullish", location=location.belowbar, color=white, style=shape.arrowup, text="Fakey",size=size.tiny)
// Pinbar Fake Breakout
//plotshape(beariskpinbar and (not fakey or (fakey and outsidebar)) and not onewhitesoliderbear and not onewwhitesoliderbull and not blackcrowreversal and not whitesoldierreversal and not fakey, title= "Pinbar Bearisk", location=location.abovebar, color=white, style=shape.arrowdown, text="FalseBreak\nPinbar",size=size.tiny)
//plotshape(bullishpibar  and (not fakey1 or (fakey1 and outsidebar)) and not onewwhitesoliderbull and not onewhitesoliderbear and not whitesoldierreversal and not blackcrowreversal and not fakey1, title= "Pinbar Bullish", location=location.belowbar, color=white, style=shape.arrowup, text="FalseBreak\nPinbar",size=size.tiny)
// Black Crow and White Soldier Continuation
//plotshape((onewhitesoliderbear or onewhitesoliderbear1 or onewhitesoliderbear2) and not insidebar and not fakey and not fakey1  and not outsidebar, title= "One solider Bearisk", location=location.abovebar, color=white, style=shape.arrowdown, text="Black\nCrow",size=size.tiny)
//plotshape((onewwhitesoliderbull or onewwhitesoliderbull1 or onewwhitesoliderbull2)and not insidebar and not fakey and not fakey1  and not outsidebar, title= "One solider Bullish", location=location.belowbar, color=white, style=shape.arrowup, text="White\nSoldier",size=size.tiny)
// Pinbar Continuation
pinbarresistance= (close-open<(high-low)/3 and open-close<(high-low)/3) and high-close>(close-low) and high-open>(open-low) and  ((open[2]<ema21[2] or close[2]<ema21[2]) and high>ema21 and low[2]<low[1] and low[3]<low[2] and high>high[1] and high>high[2] and high>high[3])
pinbarsupport=(close-open<(high-low)/3 and open-close<(high-low)/3) and close-low>(high-close) and open-low>(high-open) and ((open[2]>ema21[2] or close[2]>ema21[2]) and low<ema21 and high[2]>high[1] and high[3]>high[2] and low<low[1] and low<low[2] and low<low[3])
//plotshape(pinbarresistance and (not fakey or (fakey and outsidebar)) and not onewhitesoliderbear and not onewwhitesoliderbull and not blackcrowreversal and not whitesoldierreversal and not fakey and not beariskpinbar, title= "Pinbar Bearisk", location=location.abovebar, color=white, style=shape.arrowdown, text="Pinbar",size=size.tiny)
//plotshape(pinbarsupport  and (not fakey1 or (fakey1 and outsidebar)) and not onewwhitesoliderbull and not onewhitesoliderbear and not whitesoldierreversal and not blackcrowreversal and not fakey1 and not bullishpibar, title= "Pinbar Bullish", location=location.belowbar, color=white, style=shape.arrowup, text="Pinbar",size=size.tiny)
// barcolor

onlybuy=input(false)
onlysell=input(false)//
conmua= hisup==1 and MACD>0?1: (hisdown[1]==1 and MACD[1]<0 and pacC[1]>signalMA[1]) or (n1[2]<n1[3] and pacC[1]>signalMA[1])?-1:nz(conmua[1],1)
conmua1= conmua==1 and (hisdown==1 and MACD<0 and pacC>signalMA) or (n1[1]<n1[2] and pacC>signalMA)?1:(close[1]>n1[1] and pacC[1]>signalMA[1] and open[1]<n1[1] and close[1]>pacC[1]) or crossunder(pacC,signalMA) ?-1:nz(conmua1[1],1)
conmua2=conmua1==1 and hisup==1 and MACD>0 and close>n1?1: high[1]<high[3] and high[2]<high[3]?-1:nz(conmua2[1],1)
conmua3=conmua2==1 and high<high[2] and high[1]<high[2]?1: (close[1]>swinghigh[1] and hisup[1]==1 and MACD[1]>0) or ( MACD<0)?-1:nz(conmua3[1],1)
mua=conmua3==1 and hisup==1 and MACD>0 and conmua2==-1 and conmua1==-1
mua2= conmua1==1 and ( close>n1 and pacC>signalMA and open<n1 and close>pacC) and conmua[1]==-1
//if(mua2 and onlysell==false)
//    strategy.entry("Buy",strategy.long)
conban=hisdown==1 and MACD<0?1:(hisup[1]==1 and MACD[1]>0 and pacC[1]<signalMA[1]) or (n1[2]>n1[3] and pacC[1]<signalMA[1])?-1:nz(conban[1],1)
conban1= conban==1 and (hisup==1 and MACD>0 and pacC<signalMA) or (n1[1]>n1[2] and pacC<signalMA)?1:( close[1]<n1[1] and pacC[1]<signalMA[1] and open[1]>n1[1] and close[1]<pacC[1]) or crossover(pacC,signalMA)?-1:nz(conban1[1],1)
conban2=conban1==1 and hisdown==1 and MACD<0 and close<n1?1: low[1]>low[3] and low[2]>low[3]?-1:nz(conban2[1],1)
conban3=conban2==1 and low[1]>low[2] and low>low[2]?1: (close[1]<swinglow[1] and hisdown[1]==1 and MACD[1]<0) or ( MACD>0)?-1:nz(conban3[1],1)
ban=conban3==1 and hisdown==1 and MACD<0 and conban2==-1 
ban2=conban1==1 and ( close<n1 and pacC<signalMA and open>n1 and close<pacC) and conban[1]==-1
//if(ban2 and onlybuy==false)
//    strategy.entry("Sell",strategy.short)  
plotshape(conmua1==1 and conmua[1]==-1, style= shape.triangleup, color = lime, location = location.bottom,size=size.tiny)
plotshape(conban1==1 and conban[1]==-1, style= shape.triangledown, color = red, location = location.bottom,size=size.tiny)
plotshape(mua2, style= shape.labelup, color = lime, location = location.bottom,size=size.tiny)
plotshape(ban2, style= shape.labeldown, color = red, location = location.bottom,size=size.tiny)
// TP and SL/
SL = input(defval=50.00, title="Chốt lời (Pip)", type=float, step=1)
rr= input(defval=20.00,title="Cắt lỗ (Pip)",type=float, step=1)
useTPandSL = input(defval = true, title = "Sử dụng chốt lời và cắt lỗ?")
Stop = rr*10
Take=SL*10
Q = 100
if(useTPandSL)
    strategy.exit("ExitBuy", "Buy", qty_percent=Q, profit= Take, loss=Stop)
    strategy.exit("ExitSell", "Sell", qty_percent=Q, profit= Take, loss=Stop)

```

> Detail

https://www.fmz.com/strategy/427238

> Last Modified

2023-09-19 11:17:07
