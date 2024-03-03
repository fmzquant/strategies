
> Name

基于V型反转指标SMA策略V-Reversal-SMA-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/bd64708e4561311f31.png)
[trans]
## 概述

基于V型反转指标SMA策略通过计算股价的14天最高价与前一天最低价的绝对差值和14天最低价与前一天最高价的绝对差值,再分别计算其14日简单移动平均线,形成VI+和VI-曲线。当VI+上穿VI-时为多头信号。当VI-下穿VI+时为空头信号。

## 策略原理

该策略的核心指标是VI+和VI-。其中VI+反映多头力量,VI-反映空头力量。具体计算公式如下:

```
VMP = SUM(ABS(HIGH - LOW[1]),14)
VMM = SUM(ABS(LOW - HIGH[1]),14)  
STR = SUM(ATR(1),14)
VI+ = VMP/STR  
VI- = VMM/STR
```

为了去除曲线的震荡,对VI+和VI-分别计算14日简单移动平均线,得到SMA(VI+)和SMA(VI-)。当SMA(VI+)上穿SMA(VI-)时产生多头信号;当SMA(VI-)下穿SMA(VI+)时产生空头信号。

此外,策略还会结合VI+和VI-的向上向下状态来判断趋势,从而进行过滤,只在趋势向下时做多,趋势向上时做空。

## 优势分析

该策略结合趋势状态和VI指标的金叉死叉,可以有效过滤假信号,提高获利概率。相比简单的移动平均线策略,其突破信号更加可靠。

## 风险分析

该策略主要面临两个方面的风险:

1. VI指标在某些周期内会产生误导信号。这时需要结合趋势过滤和止损来控制风险。

2. 交易费用和滑点成本较高的市场不适合该策略,会大幅降低盈利空间。

## 优化方向 

该策略可以从以下几个方面进行优化:

1. 优化VI指标的周期参数,寻找最佳参数组合。

2. 利用机器学习方法自动识别误导信号,提升信号质量。

3. 结合止损和资金管理优化退出机制,控制单笔交易亏损。

4. 优化交易品种选择,选择交易成本较低的市场。

## 总结

基于V型反转指标的SMA策略,通过计算VI+和VI-指标并结合趋势状态判断买卖时机,是一种较为可靠的趋势跟踪策略。该策略优势在于信号质量好,能有效过滤噪音。但也存在被套风险,需要不断优化以适应市场变化。

||

## Overview

The V-Reversal SMA strategy calculates the 14-day absolute difference between the highest price and the previous day's lowest price, and the 14-day absolute difference between the lowest price and the previous day's highest price. Then it calculates their 14-day simple moving averages to form the VI+ and VI- curves. A buy signal is generated when VI+ crosses over VI-. A sell signal is generated when VI- crosses below VI+.

## Principle 

The core indicators of this strategy are VI+ and VI-. VI+ reflects bullish momentum while VI- reflects bearish momentum. The specific calculation formulas are as follows:

```
VMP = SUM(ABS(HIGH - LOW[1]),14)  
VMM = SUM(ABS(LOW - HIGH[1]),14)
STR = SUM(ATR(1),14)
VI+ = VMP/STR
VI- = VMM/STR
```

To remove oscillations in the curves, 14-day simple moving averages are calculated on VI+ and VI- to obtain SMA(VI+) and SMA(VI-). A bullish signal is generated when SMA(VI+) crosses over SMA(VI-). A bearish signal is generated when SMA(VI-) crosses below SMA(VI+).

In addition, the strategy also combines the upward and downward status of VI+ and VI- to judge the trend and filter out signals, going long only when the trend is down and going short only when the trend is up.

## Advantage Analysis

By combining trend status and golden/dead cross of the VI indicator, this strategy can effectively filter out false signals and improve profitability. Compared to simple moving average strategies, its breakout signals are more reliable.

## Risk Analysis

The main risks of this strategy are:

1. The VI indicator may generate misleading signals in certain periods. Trend filtering and stop loss should be used to control risks.

2. Markets with high trading costs and slippage are not suitable for this strategy as it would greatly reduce profit margin.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize the parameters of the VI indicator to find the best parameter combination.

2. Use machine learning methods to automatically identify misleading signals and improve signal quality. 

3. Optimize exit mechanisms with stop loss and money management to control single trade loss.

4. Optimize trading products selection focusing on markets with lower trading costs.

## Conclusion

The V-Reversal SMA strategy determines trading signals by calculating the VI+ and VI- indicators and combining trend status. It is a relatively reliable trend following strategy. Its strength lies in high signal quality and ability to filter out noise. But it also faces risks of being trapped, requiring continuous optimizations to adapt to market changes.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Period|
|v_input_2|14|WMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//@author=SIDD
//Sidd-Vortex strategy is using Vortex formula  to generate 4 signals Bullish1 Bullish2 and Bearish1 Bearish2.

//Bullish1 signal is getting generated when smooth ma of VIP is crossing over smooth ma of VIM and smooth VIM is falling from previous bar smooth VIM

//Bullish2 signal is getting generated when smooth ma of VIP is crossing over smooth ma of VIM and smooth VIP is rising from previous bar smooth VIP

//Bearish1 signal is getting generated when smooth ma of VIM is crossing over smooth ma of VIP and smooth VIP is falling from previous bar smooth VIP

//Bearish2 signal is getting generated when smooth ma of VIM is crossing over smooth ma of VIP and smooth VIM is rising from previous bar smooth VIM

//This strategy can be converted into study un-commenting the plotshape and 15th line strategy replace with study and overlay=false

strategy(title = "SIDD-Vortex", shorttitle="SIDD-VORTEX", format=format.price, precision=4,overlay=true)
period_ = input(14, title="Period", minval=2)
len = input(14, minval=1, title="WMA Length")

VMP = sum( abs( high - low[1]), period_ ) // sum of absolute current high and previous low with 14 period default
VMM = sum( abs( low - high[1]), period_ ) // sum of absolute current low and previous high with 14 period default
STR = sum( atr(1), period_ )  //sum of daily atr for 14 days
VIP = VMP / STR
VIM = VMM / STR

simpleMAVIP=wma(VIP, len) 
smmaVIP = 0.0
smmaVIP := na(smmaVIP[1]) ? simpleMAVIP : (smmaVIP[1] * (len - 1) + VIP) / len // finding the Smoothing average 

simpleMAVIM=wma(VIM, len) 
smmaVIM = 0.0
smmaVIM := na(smmaVIM[1]) ? simpleMAVIM : (smmaVIM[1] * (len - 1) + VIM) / len // finding the Smoothing average 


risingVIP = rising(smmaVIP, 1)
fallingVIP = falling(smmaVIP, 1)

lineColorVIP = smmaVIP > 0.95 and risingVIP  ? color.lime : smmaVIP > 0.95 ? #d65240 : smmaVIP < 0.95 and fallingVIP ? color.red : color.olive

risingVIM = rising(VIM, 1)
fallingVIM = falling(VIM, 1)

lineColorVIM = smmaVIM > 0.95 and risingVIM  ? color.red : smmaVIM > 0.95 ? color.olive : smmaVIM < 0.95 and fallingVIM ? color.lime : #d65240

plot(VIP, title="VI +", color=lineColorVIP)
plot(VIM, title="VI -", color=lineColorVIM) 

longCondition = crossover(smmaVIP,smmaVIM)
shortCondition = crossover(smmaVIM,smmaVIP)


if (longCondition and fallingVIM)
    strategy.entry("Bullish1", strategy.long)
if (shortCondition and fallingVIP)
    strategy.entry("Bearish1", strategy.short)

if (longCondition and risingVIP)
    strategy.entry("Bullish2", strategy.long)
if (shortCondition and risingVIM)
    strategy.entry("Bearish2", strategy.short)
    
//plotshape(longCondition and fallingVIM, color=color.lime, location=location.belowbar, style=shape.triangleup,size= size.large,text="Bullish",offset=0,textcolor=color.white)
//plotshape(longCondition and risingVIP, color=color.lime, location=location.belowbar, style=shape.labelup,size= size.large,text="Bullish",offset=0,textcolor=color.white)
//plotshape(Diff > 0 and direction>0, color=color.lime, location=location.belowbar, style=shape.arrowup,size= size.normal,offset=0)
    
//plotshape(shortCondition and fallingVIP  , color=color.red, location=location.abovebar, style=shape.triangledown, size= size.large,text="Bearish",offset=0,textcolor=color.white)
//plotshape( shortCondition and risingVIM  , color=color.red, location=location.abovebar, style=shape.labeldown, size= size.large,text="Bearish",offset=0,textcolor=color.white)



//band1 = hline(1.0  , title="Upper Line", linestyle=hline.style_dashed, linewidth=3, color=color.red)
//band0 = hline(0.5, title="Lower Line", linestyle=hline.style_dashed, linewidth=3, color=color.lime)
//fill(band1, band0, color=color.purple, transp=70)



```

> Detail

https://www.fmz.com/strategy/441997

> Last Modified

2024-02-18 15:04:34
