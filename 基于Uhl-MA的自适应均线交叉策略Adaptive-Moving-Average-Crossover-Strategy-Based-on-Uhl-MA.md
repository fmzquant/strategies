
> Name

基于Uhl-MA的自适应均线交叉策略Adaptive-Moving-Average-Crossover-Strategy-Based-on-Uhl-MA

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

Uhl MA系统是一个自适应的均线交叉系统,其设计目的是为了弥补传统均线系统的不足。该系统采用快速均线和慢速均线交叉产生交易信号。慢速均线采用Uhl最初提出的修正均线(CMA),快速均线采用也基于修正均线思想的修正趋势步(CTS)。系统通过自适应调整均线参数,实现更稳定可靠的交易信号。

## 原理剖析  

该策略的核心是Uhl MA均线和CTS均线的计算。其中,Uhl MA均线是在传统SMA均线的基础上进行修正,通过引入方差VAR和历史CMA的平方差SECMA进行自适应调整。当VAR小于SECMA时,增加SMA占比;当VAR大于SECMA时,增加CMA的占比。这样可以过滤掉部分噪声,产生更稳定的均线。CTS均线与Uhl MA均线计算思路类似,是在SRC价格的基础上进行自适应调整。  

交叉原理与传统均线交叉系统相同,当CTS向上穿过Uhl MA时产生买入信号,当CTS向下穿过Uhl MA时产生卖出信号。这样就构成一个自适应的均线交易系统。

## 优势分析

相比传统均线交叉系统,该策略最大的优势是采用自适应均线,可以过滤部分噪声,在震荡行情中产生更可靠的交易信号。相比死叉金叉,自适应均线交叉减少了误交易的概率。另外,快线慢线配合,可以抓住较好的趋势交易机会。从回测结果看,在趋势明显的品种中,策略表现优异。

## 风险分析  

由于均线本质上是用来判断趋势的技术指标,该策略最大的风险在于震荡行情下产生错误信号的概率较大。这主要源自CMA均线的自适应计算方法,在震荡行情中也会收敛到价格区域,产生不必要的信号。另外,寻找合适的参数组合也是一大难题。如果参数设置不当,会错过较好的交易机会或者增大错误信号概率。

## 优化建议

该策略主要可以从以下几个方面进行优化:

1. 改进CMA自适应计算方法,避免其在震荡行情中收敛,产生错误信号。可以考虑引入别的指标进行修正。

2. 优化参数设定,寻找最佳的参数组合。可以通过遗传算法等方法进行多维参数优化。

3. 增加止损策略,以控制单笔损失。

4. 结合其他指标过滤信号,避免在震荡行情中频繁交易。比如引入波动率指标、RFM指标等。

5. 优化资金管理,例如风险度量、仓位控制等,更好的控制整体风险。

## 总结

Uhl MA系统是一个非常有创新思维的自适应均线交叉策略。相比传统策略,其采用动态均线可以减少误交易的概率,更好的捕捉趋势机会。但该策略也存在一定局限性,主要在震荡行情下的表现不佳。通过进一步改进计算方法,引入其他辅助指标进行过滤优化,仍有非常大的提升空间。与此同时,参数优化和风险控制也是关键。总体来说,Uhl MA策略具有较好的发展前景和研究价值。

[/trans]

|| 

## Overview

The Uhl MA system is an adaptive moving average crossover system designed to overcome the deficiencies of traditional MA systems. It uses fast and slow moving averages to generate trading signals, with the slow MA being the corrected MA (CMA) originally proposed by Andreas Uhl and the fast MA being the corrected trend step (CTS) which is also based on the corrected MA. The system adaptively adjusts the MA parameters to achieve more reliable trading signals.

## Principle Analysis

The core of this strategy lies in the calculation of Uhl MA and CTS lines. Uhl MA line is an enhancement over the traditional SMA, using variance (VAR) and historical squared deviation (SECMA) to adaptively adjust the weights between SMA and previous CMA. When VAR is less than SECMA, more weight is put on SMA, otherwise more weight is put on CMA. This helps filter out some noise and generate smoother MA. CTS line uses similar adaptive calculation based on SRC price.

The crossover logic is the same as traditional MA systems. A buy signal is generated when CTS crosses above Uhl MA, and a sell signal when crossing below. This forms an adaptive MA trading system.

## Advantage Analysis

Compared to traditional MA crossover systems, the biggest advantage of this strategy is the use of adaptive MAs, which can filter some noise and generate more reliable signals in range-bound markets. The adaptive crossover reduces false signals compared to dead cross and golden cross. Also, the fast and slow MA combination allows catching some trend-trading opportunities. From backtest results we can see superior performance in assets with obvious trends.

## Risk Analysis

The major risk of this strategy comes from the increased false signals in ranging markets, as MAs are trend-following indicators in nature. This is largely due to the adaptive calculation of CMA, which converges to price ranges in consolidation, generating unnecessary signals. Proper parameter tuning is also a big challenge. Improper parameters may lead to missing good trades or increased false signals.

## Optimization Suggestions

The potential optimizations include:

1. Improve CMA calculation to avoid convergence in ranging markets, using other indicators for example.

2. Optimize parameters through multi-variate optimization algorithms like genetic algorithms. 

3. Introduce stop loss to control single trade loss.

4. Add filters using other indicators to avoid over-trading in consolidation, such as volatility measures, RFM index etc.

5. Optimize risk management including position sizing, risk metrics to better control overall risk.

## Conclusion

The Uhl MA system is a very innovative adaptive MA crossover strategy. Compared to traditional strategies, the dynamic MAs help reduce false signals and better capture trends. But limitations exist in ranging markets. Further improvements in calculation methodology and adding filters hold great potential. Meanwhile, parameter tuning and risk control are also critical. Overall, the Uhl MA strategy has good potential and research value worth further exploration.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|length|
|v_input_2|true|mult|
|v_input_3_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-06-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © alexgrover

//@version=4
strategy("Uhl MA System - Strategy Analysis")
length = input(100),mult = input(1.),src = input(close)
//----
out = 0., cma = 0., cts = 0.
Var = variance(src,length)           ,sma = sma(src,length)
secma = pow(nz(sma - cma[1]),2)      ,sects = pow(nz(src - cts[1]),2) 
ka = Var < secma ? 1 - Var/secma : 0 ,kb = Var < sects ? 1 - Var/sects : 0
cma := ka*sma+(1-ka)*nz(cma[1],src)  ,cts := kb*src+(1-kb)*nz(cts[1],src)
//----
if crossover(cts,cma)
    strategy.entry("Buy", strategy.long)
if crossunder(cts,cma)
    strategy.entry("Sell", strategy.short)
//----
cap = 50000
eq = strategy.equity
rmax = 0.
rmax := max(eq,nz(rmax[1]))
//----
css = eq > cap ? #0cb51a : #e65100
a = plot(eq,"Equity",#2196f3,2,transp=0)
b = plot(rmax,"Maximum",css,2,transp=0)
fill(a,b,css,80)
```

> Detail

https://www.fmz.com/strategy/427312

> Last Modified

2023-09-19 22:06:42
