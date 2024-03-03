
> Name

多元趋势策略Multi-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a6712cd272dc701d0d.png)
[trans]


## 概述

本策略综合运用多种指标识别趋势方向,采用趋势追踪方式,在中短线上捕捉趋势机会。策略专门为追踪趋势而设计,旨在增加胜率,降低回撤。

## 策略原理

1. 使用WVAP指标判断价格比例;

2. RSI指标判断多空动量; 

3. QQE指标识别价格突破;

4. ADX指标判断趋势力度;

5. Coral Trend Indicator判断基本面走势;

6. LSMA指标辅助判断趋势;

7. 结合多种指标信号发出交易信号。

该策略主要依靠RSI,QQE,ADX等多个指标判断趋势方向和力度,并以Coral Trend Indicator的曲线作为基本面趋势判断标准。当RSI等指标发出买入信号时,若Coral Trend Indicator也显示上升曲线,则高概率符合趋势向上,则策略会选择买入。WVAP等指标主要用来判断价位是否合理,避免买入高点。

## 策略优势

1. 多指标组合,提高判断准确性;

2. 强调趋势追踪,增加盈利概率;

3. 采用突破思路,筛选 Trading Range 市场;

4. 结合基本面指标,避免逆势交易;

5. 交易时间和手数设置合理,降低风险;

6. 策略思路清晰,容易理解与优化。

该策略最大优势是多指标组合判断,能在一定程度上减少单一指标误判的概率,提高判断准确性。同时强调趋势追踪与突破思路,对于筛选靠谱中短线机会具有帮助。此外,策略加入基本面指标,能避免逆势操作。这些设计都提高了策略的稳定性和盈利概率。

## 策略风险

1. 多空判断存在时滞,可能错过最佳入场时机; 

2. 回撤控制并不完善,存在较大回撤风险;

3. 当基本面发生转折时,策略可能错过信号;

4. 未考虑交易成本,实际应用时收益存在下滑风险。

该策略最大的风险在于多指标组合判断可能存在时滞,导致错过最佳入场时机,从而影响获利空间。此外,策略的回撤控制并不理想,存在较大回撤风险。当市场基本面发生转折而指标还未反映时,也容易形成损失。实际应用时,交易成本也会对收益造成一定影响。

## 策略优化方向

1. 加入止损策略,优化回撤控制;

2. 优化参数设置,缩短指标延迟;

3. 增加基本面指标应用,提高准确性; 

4. 结合机器学习算法,实现动态参数优化。

该策略的优化重点应考虑回撤控制,可以加入移动止损策略来锁定利润,降低回撤。同时可以优化参数设定,缩短指标延迟,增强策略对市场变化的敏感性。此外,可以进一步增加基本面判断指标,提高准确性。如果能运用机器学习方法实现参数动态优化,也将大幅提升策略稳定性。

## 总结

本策略综合多种指标判断趋势方向,采用趋势追踪思路设计,旨在提高判断准确性,增加盈利概率。策略具有指标组合判断、强调趋势追踪、结合基本面等优势,但也存在误判时滞、回撤控制不足等问题。未来可通过优化参数设定、完善止损策略、增加基本面指标等方式进行改进,使策略在实际应用中达到更好效果。

||

## Overview

This strategy combines multiple indicators to identify trend direction and uses a trend tracking approach to capture trend opportunities over medium to short term. The strategy is designed specifically for trend tracking to increase win rate and reduce drawdown.

## Strategy Logic 

1. Use WVAP to judge price level;

2. RSI to judge momentum;

3. QQE to identify price breakthrough;  

4. ADX to determine trend strength;

5. Coral Trend Indicator to judge fundamental trend;

6. LSMA to assist in trend judgment;

7. Generate signals based on multiple indicator signals.

The strategy mainly relies on RSI, QQE, ADX and other indicators to determine trend direction and strength, using Coral Trend Indicator curve as the benchmark for fundamental trend. When RSI generates a buy signal and Coral Trend Indicator shows an upward curve, it indicates high probability of uptrend, and the strategy will go long. WVAP is used mainly to determine if price level is reasonable to avoid buying at highs.

## Advantages

1. Combination of multiple indicators improves accuracy;

2. Emphasizes trend tracking to increase profitability;

3. Adopts breakout concept to screen for ranging markets;  

4. Incorporates fundamental indicators to avoid counter-trend trades;

5. Reasonable trade time and position sizing controls risk;

6. Clear strategy logic, easy to understand and optimize.

The biggest edge of this strategy is the combined signals from multiple indicators, which reduces the probability of misjudgment from any single indicator and improves accuracy. The emphasis on trend tracking and breakout concept also helps screen for reliable medium-term opportunities. In addition, incorporating fundamental indicators prevents trading against major trends. These design choices improve the stability and profitability of the strategy.

## Risks

1. Judgment delay due to multiple indicators, missing best entry price;

2. Inadequate drawdown control, large drawdown risk;

3. Potential missed signals when fundamental trend reverses;  

4. Profit deterioration risk when trading costs are considered.

The biggest risk is judgment delay due to multiple indicators, causing missed best entry price and profit potential. Also, drawdown control is far from ideal, with considerable drawdown risk. When fundamental trend reverses while indicators have yet to reflect it, losses may occur. Trading costs in actual deployment may also undermine profits.

## Improvement Directions

1. Incorporate stop loss for better drawdown control;

2. Optimize parameters to reduce indicator delay; 

3. Add more fundamental indicators to improve accuracy;

4. Use machine learning for dynamic parameter optimization.

Priorities for optimization include better drawdown control via stop loss to lock in profits and reduce drawdown. Parameter tuning to reduce indicator delay and improve responsiveness is also important. More fundamental indicators could also help improve accuracy. Applying machine learning for dynamic parameter optimization would significantly enhance strategy stability.

## Summary 

This strategy combines multiple indicators to determine trend direction and uses a trend tracking approach in its design to improve accuracy and profitability. Its strengths include indicator combos, emphasis on trend tracking, and incorporation of fundamental factors. But issues like judgment delay, inadequate drawdown control remain. Future improvements could come from parameter optimization, stop loss integration, more fundamental indicators, and machine learning for dynamic optimization, to make the strategy more effective in practice.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.3|Take Long Profit % |
|v_input_2|0.95|Take Short Profit % |
|v_input_3|100|Take Profit % QTY (How much profit you want to take after take profit target is triggered)|
|v_input_4||Change this if you want to see Copp Curve calculated for current ticker. All Copp Curve calculations are base on NYSE Composite|
|v_input_5|21|Length|
|v_input_6|false|Centered|
|v_input_7|-|Standard Copp settings are (10, 14, 11) however, DOUBLE these lengths as alternate settings to (20,28,22) and you will find it may produce better results, but less trades|
|v_input_8|20|WMA Length (Experiment changing this to longer lengths for less trades, but higher win %)|
|v_input_9|28|Long RoC Length|
|v_input_10|22|Short RoC Length|
|v_input_11_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_12|25|RSI Length|
|v_input_13|9|SF RSI SMoothing Factor|
|v_input_14|true|Show Crossing Signals?|
|v_input_15|true|Highlighter On/Off ?|
|v_input_16|100|LSMA 1|
|v_input_17|false|LSMA 1 Offset|
|v_input_18_close|0|LSMA 1 Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_19|14|len|
|v_input_20|20|th|
|v_input_21|20|BB Length|
|v_input_22|2|BB MultFactor|
|v_input_23|20|KC Length|
|v_input_24|1.5|KC MultFactor|
|v_input_25|true|Use TrueRange (KC)|
|v_input_26|13|Length|
|v_input_27|23|Length RSI VWMA|
|v_input_28|21|Smoothing Period|
|v_input_29|0.4|Constant D|
|v_input_30|false|Color Bars|
|v_input_31|false|Ribbon Mode|
|v_input_32|true|Start Date|
|v_input_33|true|Start Month|
|v_input_34|2021|Start Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-08 00:00:00
end: 2023-11-15 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RolandoSantos

//@version=4
strategy(title = "VWAP Candles Strategy", overlay=true, shorttitle = "VWAP Cndl",  default_qty_type=strategy.cash, default_qty_value=10000, initial_capital=10000)

//Make inputs that set the take profit % 
longProfitPerc = input(title="Take Long Profit % ", minval=0.0, step=0.1, defval=0.3) / 100
shortProfitPerc = input(title="Take Short Profit % ", minval=0.0, step=0.1, defval=0.95) / 100

tp = input(100, "Take Profit % QTY (How much profit you want to take after take profit target is triggered)")

// Figure out take profit price
longExitPrice  = strategy.position_avg_price * (1 + longProfitPerc)
shortExitPrice  = strategy.position_avg_price * (1 - shortProfitPerc)

//Use NYSE for Copp Curve entries and exits//
security = input("", title="Change this if you want to see Copp Curve calculated for current ticker. All Copp Curve calculations are base on NYSE Composite")
ticker = security(security,"", close)

///Copp Curve////

period_ = input(21, title="Length", minval=1)
isCentered = input(false, title="Centered")
barsback = period_/2 + 1
ma = sma(close, period_)
dpo = isCentered ? close[barsback] - ma : close - ma[barsback]


instructions =input(title="Standard Copp settings are (10, 14, 11) however, DOUBLE these lengths as alternate settings to (20,28,22) and you will find it may produce better results, but less trades", defval="-")
wmaLength = input(title="WMA Length (Experiment changing this to longer lengths for less trades, but higher win %)", type=input.integer, defval=20)
longRoCLength = input(title="Long RoC Length", type=input.integer, defval=28)
shortRoCLength = input(title="Short RoC Length", type=input.integer, defval=22)
source = ticker
curve = wma(roc(source, longRoCLength) + roc(source, shortRoCLength), wmaLength)

//////////// QQE////////////QQE///////////////////QQE////////////////////////

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © KivancOzbilgic

//@version=4
src=input(close)
length = input(25,"RSI Length", minval=1)
SSF=input(9, "SF RSI SMoothing Factor", minval=1)
showsignals = input(title="Show Crossing Signals?", type=input.bool, defval=true)
highlighting = input(title="Highlighter On/Off ?", type=input.bool, defval=true)
RSII=ema(rsi(src,length),SSF)
TR=abs(RSII-RSII[1])
wwalpha = 1/ length
WWMA = 0.0
WWMA := wwalpha*TR + (1-wwalpha)*nz(WWMA[1])
ATRRSI=0.0
ATRRSI := wwalpha*WWMA + (1-wwalpha)*nz(ATRRSI[1])
QQEF=ema(rsi(src,length),SSF)
QUP=QQEF+ATRRSI*4.236
QDN=QQEF-ATRRSI*4.236
QQES=0.0
QQES:=QUP<nz(QQES[1]) ? QUP : QQEF>nz(QQES[1]) and QQEF[1]<nz(QQES[1]) ? QDN :  QDN>nz(QQES[1]) ? QDN : QQEF<nz(QQES[1]) and QQEF[1]>nz(QQES[1]) ? QUP : nz(QQES[1])
//QQF=plot(QQEF,"FAST",color.maroon,2)
//QQS=plot(QQES,"SLOW",color=color.blue, linewidth=1)
buySignalr = crossover(QQEF, QQES)
sellSignalr = crossunder(QQEF, QQES)
buyr = QQEF > QQES


////QQE////////////////QQE/////////////////QQE/////////////////

//////////////LSMA//////////////////////////


//  LSMA 1 Settings & Plot
lsma1Length = input(100, minval=1, title="LSMA 1")
lsma1Offset = input(title="LSMA 1 Offset", type=input.integer, defval=0)
lsma1Source = input(close, title="LSMA 1 Source")
lsma1 = linreg(lsma1Source, lsma1Length, lsma1Offset)
lsma1_std_dev = stdev(abs(lsma1[1] - lsma1), lsma1Length)
//plot(lsma1, color=(lsma1 > lsma1[1] ? color.yellow : color.blue), title="LSMA 1", linewidth=2, transp=0)

////////////LSMA///////////////////


//////////////////ADX////////////////////

len = input(14)
th = input(20)

TrueRange = max(max(high-low, abs(high-nz(close[1]))), abs(low-nz(close[1])))
DirectionalMovementPlus = high-nz(high[1]) > nz(low[1])-low ? max(high-nz(high[1]), 0): 0
DirectionalMovementMinus = nz(low[1])-low > high-nz(high[1]) ? max(nz(low[1])-low, 0): 0

SmoothedTrueRange = 0.0
SmoothedTrueRange := nz(SmoothedTrueRange[1]) - (nz(SmoothedTrueRange[1])/len) + TrueRange

SmoothedDirectionalMovementPlus = 0.0
SmoothedDirectionalMovementPlus := nz(SmoothedDirectionalMovementPlus[1]) - (nz(SmoothedDirectionalMovementPlus[1])/len) + DirectionalMovementPlus

SmoothedDirectionalMovementMinus = 0.0
SmoothedDirectionalMovementMinus := nz(SmoothedDirectionalMovementMinus[1]) - (nz(SmoothedDirectionalMovementMinus[1])/len) + DirectionalMovementMinus

DIPlus = SmoothedDirectionalMovementPlus / SmoothedTrueRange * 100
DIMinus = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
DX = abs(DIPlus-DIMinus) / (DIPlus+DIMinus)*100
ADX = sma(DX, len)

///////////////////ADX/////////////////////


/////////////sqz momentum/////////////////////////

//
// @author LazyBear & ChrisMoody complied by GIS_ABC
//
lengthBB = input(20, title="BB Length")
mult = input(2.0,title="BB MultFactor")
lengthKC=input(20, title="KC Length")
multKC = input(1.5, title="KC MultFactor")

useTrueRange = input(true, title="Use TrueRange (KC)")

// Calculate BB
sourceBB = close
basis = sma(sourceBB, lengthBB)
dev = multKC * stdev(source, lengthBB)
upperBB = basis + dev
lowerBB = basis - dev

// Calculate KC
maKC = sma(sourceBB, lengthKC)
rangeKC = useTrueRange ? tr : (high - low)
rangema = sma(rangeKC, lengthKC)
upperKC = maKC + rangema * multKC
lowerKC = maKC - rangema * multKC

sqzOn  = (lowerBB > lowerKC) and (upperBB < upperKC)
sqzOff = (lowerBB < lowerKC) and (upperBB > upperKC)
noSqz  = (sqzOn == false) and (sqzOff == false)

val = linreg(source  -  avg(avg(highest(high, lengthKC), lowest(low, lengthKC)),sma(close,lengthKC)),lengthKC,0)


////////////////////////////

/////// RSI on EMA/////////////////

lenrsi = input(13, minval=1, title="Length")
srcrsi = linreg(hlc3,100,0)
up = rma(max(change(srcrsi), 0), lenrsi)
down = rma(-min(change(srcrsi), 0), lenrsi)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
rsicolor = rsi > rsi[1] ? color.green : color.red
//plot(rsi,color = rsicolor)
//hline(20,color=color.green)
//hline(80,color=color.red)
vwaprsi = rsi(vwap(hlc3),13)
vwaprsicolor = vwaprsi > vwaprsi[1] ? color.blue : color.yellow
emarsi = ema(rsi,13)
emarsicolor = emarsi > emarsi[1] ? color.green : color.red
//plot(emarsi,color=emarsicolor)
//plot(vwaprsi,color=vwaprsicolor)

/////// RSI on VWMA/////////////////

lenrsiv = input(23, minval=1, title="Length RSI VWMA")
srcrsiv = vwma(linreg(close,23,0),23)
upv = rma(max(change(srcrsiv), 0), lenrsiv)
downv = rma(-min(change(srcrsiv), 0), lenrsiv)
rsiv = downv == 0 ? 100 : upv == 0 ? 0 : 100 - (100 / (1 + upv / downv))
rsicolorv = rsiv > rsiv[1] ? color.green : color.red

/////////////////////////////////////

/////////////////////////////////////

////////////////coral trend////////////////////
//
// @author LazyBear 
// List of all my indicators: 
// https://docs.google.com/document/d/15AGCufJZ8CIUvwFJ9W-IKns88gkWOKBCvByMEvm5MLo/edit?usp=sharing
// 
//study(title="Coral Trend Indicator [LazyBear]", shorttitle="CTI_LB", overlay=true)
srcCT=close
i1 = 1.0
i2 = 1.0
i3 = 1.0
i4 = 1.0
i5 = 1.0
i6 = 1.0

sm =input(21, title="Smoothing Period")
cd = input(0.4, title="Constant D")
ebc=input(false, title="Color Bars")
ribm=input(false, title="Ribbon Mode")
di = (sm - 1.0) / 2.0 + 1.0
c1 = 2 / (di + 1.0)
c2 = 1 - c1
c3 = 3.0 * (cd * cd + cd * cd * cd)
c4 = -3.0 * (2.0 * cd * cd + cd + cd * cd * cd)
c5 = 3.0 * cd + 1.0 + cd * cd * cd + 3.0 * cd * cd
i1 := c1*srcCT + c2*nz(i1[1])
i2 := c1*i1 + c2*nz(i2[1])
i3 := c1*i2 + c2*nz(i3[1])
i4 := c1*i3 + c2*nz(i4[1])
i5 := c1*i4 + c2*nz(i5[1])
i6 := c1*i5 + c2*nz(i6[1])

bfr = -cd*cd*cd*i6 + c3*(i5) + c4*(i4) + c5*(i3)
// --------------------------------------------------------------------------
// For the Pinescript coders: Determining trend based on the mintick step. 
// --------------------------------------------------------------------------
//bfrC = bfr - nz(bfr[1]) > syminfo.mintick ? green : bfr - nz(bfr[1]) < syminfo.mintick ? red : blue
//bfrC = bfr > nz(bfr[1]) ? green : bfr < nz(bfr[1])  ? red : blue
//tc=ebc?gray:bfrC
//plot(ribm?na:bfr, title="Trend", linewidth=3)
//bgcolor(ribm?bfrC:na, transp=50)
//barcolor(ebc?bfrC:na)
////////////////////////////////////////////////////////////////

///////////////////VWAP///////////////////



//------------------------------------------------

//------------------------------------------------
NormalVwap=vwap(hlc3)
H = vwap(high)
L = vwap(low)
O = vwap(open)
C = vwap(close)

left = 30

left_low = lowest(left)
left_high = highest(left)
newlow = low <= left_low
newhigh = high >= left_high

q = barssince(newlow)
w = barssince(newhigh)
col2 = q < w ?  #8B3A3A : #9CBA7F
col2b=O > C?color.red:color.lime


AVGHL=avg(H,L)
AVGOC=avg(O,C)
col=AVGHL>AVGOC?color.lime:color.red
col3=open > AVGOC?color.lime:color.red
//plotcandle(O,H,L,C,color=col2b)
//plot(H, title="VWAP", color=red)
//plot(L, title="VWAP", color=lime)
//plot(O, title="VWAP", color=blue)
//plot(C, title="VWAP", color=black)

//plot(NormalVwap, color=col2b)


/////////////////////////////////////////////////////////////////////////////


///Trade Conditions///
t = time(timeframe.period, "0930-1500")

long = vwaprsi > vwaprsi[1] and rsi>rsi[1] and vwaprsi < 20 //vwaprsi > 98 and rsi > 50 and rsi[1] < rsi and rsi[1] < rsi[2] //crossover(rsi,20)//O<C  and O > linreg(hlc3,100,0) and linreg(hlc3,100,0) > linreg(hlc3,100,0)[1] and AVGHL>AVGOC and t //O < C  and close > vwap(hlc3) and ADX > ADX[1]  //and val > nz(val[1]) and close > vwap(hlc3) and open > sma(close,23) and close > vwap(hlc3)  and t  //and rsi > rsi[1] and open > ema(close,13) and open > bfr and bfr > bfr[1]  
close_long = crossover(vwaprsi,99.8)  //C < O // linreg(hlc3,100,0) and linreg(hlc3,100,0) < linreg(hlc3,100,0)[1] //O > C and val < nz(val[1]) // and close < vwap(hlc3) 
close_short = rsiv > rsiv[1] and rsiv[2] > rsiv[1]//vwaprsi > vwaprsi[1] or rsi > rsi[1] // vwaprsi > 99 and rsi > 99 and rsi > rsi[1] and vwaprsi > vwaprsi[1]//vwaprsi > vwaprsi[1] and rsi>rsi[1] and vwaprsi < 20 //vwaprsi > 98 and rsi > 50 and rsi[1] < rsi and rsi[1] < rsi[2] //crossover(rsi,20)//O<C  and O > linreg(hlc3,100,0) and linreg(hlc3,100,0) > linreg(hlc3,100,0)[1] and AVGHL>AVGOC and t //O < C  and close > vwap(hlc3) and ADX > ADX[1]  //and val > nz(val[1]) and close > vwap(hlc3) and open > sma(close,23) and close > vwap(hlc3)  and t  //and rsi > rsi[1] and open > ema(close,13) and open > bfr and bfr > bfr[1]  
short = rsiv > 95 and rsiv < rsiv[1] and rsiv[2] < rsiv[1] //vwaprsi < 1 and rsi < 1 and rsi < rsi[1] and vwaprsi < vwaprsi[1] and t //crossover(vwaprsi,99.8)  //C < O // linreg(hlc3,100,0) and linreg(hlc3,100,0) < linreg(hlc3,100,0)[1] //O > C and val < nz(val[1]) // and close < vwap(hlc3) 

//long = vwaprsi > vwaprsi[1] and emarsi > emarsi[1] and emarsi[2] > emarsi[1] and ADX > 25//O<C  and O > linreg(hlc3,100,0) and linreg(hlc3,100,0) > linreg(hlc3,100,0)[1] and AVGHL>AVGOC and t //O < C  and close > vwap(hlc3) and ADX > ADX[1]  //and val > nz(val[1]) and close > vwap(hlc3) and open > sma(close,23) and close > vwap(hlc3)  and t  //and rsi > rsi[1] and open > ema(close,13) and open > bfr and bfr > bfr[1]  
//close_long = vwaprsi < vwaprsi[1] or emarsi < emarsi[1]//C < O // linreg(hlc3,100,0) and linreg(hlc3,100,0) < linreg(hlc3,100,0)[1] //O > C and val < nz(val[1]) // and close < vwap(hlc3) 
//close_long = O>C  or lsma1 < H  //  or O > linreg(hlc3,100,0) //and linreg(hlc3,100,0) > linreg(hlc3,100,0)[1] and AVGHL>AVGOC and t //O < C  and close > vwap(hlc3) and ADX > ADX[1]  //and val > nz(val[1]) and close > vwap(hlc3) and open > sma(close,23) and close > vwap(hlc3)  and t  //and rsi > rsi[1] and open > ema(close,13) and open > bfr and bfr > bfr[1]  
//long = rsi > rsi[1] and rsi[1] >rsi[2] and lsma1 > lsma1[1] and bfr > bfr[1] and O<C and lsma1 > L  and close > close[1] and ADX > ADX[1] and ADX[1] > ADX[2] and ADX > 20 and rsi > rsi[1] and t   // linreg(hlc3,100,0) and linreg(hlc3,100,0) < linreg(hlc3,100,0)[1] //O > C and val < nz(val[1]) // and close < vwap(hlc3) 

//close_short = O<C  or lsma1 > H  //  or O > linreg(hlc3,100,0) //and linreg(hlc3,100,0) > linreg(hlc3,100,0)[1] and AVGHL>AVGOC and t //O < C  and close > vwap(hlc3) and ADX > ADX[1]  //and val > nz(val[1]) and close > vwap(hlc3) and open > sma(close,23) and close > vwap(hlc3)  and t  //and rsi > rsi[1] and open > ema(close,13) and open > bfr and bfr > bfr[1]  
//short = rsi < rsi[1] and rsi[1] <rsi[2] and lsma1 < lsma1[1] and bfr < bfr[1] and O>C and lsma1 < L  and close < close[1] and ADX > ADX[1] and ADX[1] > ADX[2] and ADX > 20 and rsi < rsi[1] and t   // linreg(hlc3,100,0) and linreg(hlc3,100,0) < linreg(hlc3,100,0)[1] //O > C and val < nz(val[1]) // and close < vwap(hlc3) 


/// Start date
startDate = input(title="Start Date", defval=1, minval=1, maxval=31)
startMonth = input(title="Start Month", defval=1, minval=1, maxval=12)
startYear = input(title="Start Year", defval=2021, minval=1800, maxval=2100)


// See if this bar's time happened on/after start date
afterStartDate = true


///Entries and Exits//
if (long and afterStartDate)
    strategy.entry("Long", strategy.long, comment = "Open Long")
//    strategy.close("Short", strategy.short,qty_percent=100, comment = "close Short")
if (short and afterStartDate)
    strategy.entry("Short", strategy.short, comment = "Open Short")
    
    
if (close_long and afterStartDate  )
    strategy.close("Long", strategy.long, qty_percent=100, comment="close Long")
//    strategy.entry("Short", strategy.short, comment="Open Short")

if (close_short and afterStartDate  )
    strategy.close("Short", strategy.short, qty_percent=100, comment="close Long")

if ( hour(time) == 15 and minute(time) > 15 ) 
    strategy.close_all()


//Submit exit orders based on take profit price
if (strategy.position_size > 0 and afterStartDate)
    strategy.exit(id="Long", qty_percent=tp, limit=longExitPrice)

if (strategy.position_size < 0 and afterStartDate)
    strategy.exit(id="Short", qty_percent=tp, limit=shortExitPrice)
```

> Detail

https://www.fmz.com/strategy/432312

> Last Modified

2023-11-16 11:20:10
