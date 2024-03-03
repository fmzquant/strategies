
> Name

Camarilla支撑阻力层突破策略Camarilla-Pivot-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11a805f97ef831a5d72.png)
[trans]

## 概述

Camarilla支撑阻力层突破策略(Camarilla Pivot Breakout Strategy)是一个利用Camarilla支撑阻力层进行 Entries 和 Exits 的量化交易策略。该策略借鉴传统技术分析中的支撑阻力理论,结合Camarilla数学公式计算不同时间级别的支撑阻力关键点,设定突破这些关键点作为建仓和平仓的条件,达到获取超额收益的目的。

## 策略原理

该策略的核心逻辑是:计算 Camarilla 公式得到的日线级别的 H4 和 L4 这两个关键支撑阻力点,当价格突破这两个点时产生交易信号。 

具体来说,策略首先计算当前K线的日内最高价、最低价以及收盘价的中间值作为当日的支撑阻力中枢点 Pivot。然后计算这三个价格的范围 Range。根据 Range 可以计算出 Camarilla 公式中的各关键支撑阻力位,包括 H4、H3、H2、H1 和 L1、L2、L3、L4 等。其中,H4 为当日的第一阻力位,L4 为当日第一支撑位。 

在交易信号产生上,如果当日收盘价突破上方的 H4 位,产生做多信号;如果收盘价突破下方的 L4 位,产生做空信号。这样,通过捕捉关键支撑阻力位的突破,来判断行情的突破方向和力度,产生交易信号。

所以该策略的主要逻辑就是:利用 Camarilla 关键点突破来判断市场结构和获得交易信号。

## 优势分析

这种利用 Camarilla 支撑阻力位突破的策略有几个主要的优势:

1. 利用传统技术分析理论指标,回测稳定

Camarilla 分析依据的是传统技术分析中支撑阻力理论。这种理论测试了时间的考验,可以保证策略在不同品种和不同时间段的稳定性。

2. 参数设置简单,容易实盘操作

相比机器学习等定制化策略,Camarilla 策略规则简单,参数少,容易理解和实盘操作。这对于初学者而言是非常重要的。

3. 突破信号明确,实现简单

监控 H4 和 L4 的突破就可以建立仓位,策略信号简洁明确,代码实现也很简单。这使得我们可以快速测试策略思路并实盘。

4. 可谓是适合高频和低频交易

Camarilla 策略同时适合高频(秒级、分级K线)和低频(日线、周线级)的交易,这是一个很大的优势。

## 风险分析

当然,这种简单的突破策略也存在一定的风险,主要集中在:

1. 可能出现虚假突破的风险

市场突破 Camarilla 点后可能无法继续向同一方向运行,出现反转即虚假突破的风险。这时如果不及时止损,会面临较大的亏损。

2. 部分突破无法捕捉的风险

如果只监控收盘价的突破,可能会错过部分突破机会从而影响盈利。这需要通过优化入场条件来解决。

3. 盈利可能受限的风险

相比更复杂的策略,仅仅依赖 Camarilla 点突破的盈利空间和幅度可能比较有限。这是可以通过适当调整持仓规模等方法来缓解。

所以这种简单的突破策略还需要进一步通过止损策略、优化入场23168条件、适当调整仓位等方法来控制风险,确保其稳定运行。

## 优化方向

要进一步优化和改进该 Camarilla 突破策略,可以从以下几个方面入手:

1. 结合更多指标判断真假突破

例如结合量能指标、移动均线等来判断突破的可靠性,避免虚假突破的风险。

2. 优化突破判定逻辑

比如放宽突破幅度,通过回测确定更佳的参数。或者结合季节性等更多规则。

3. 优化止损策略 

适当缩小止损幅度,同时防止被套。或者设定错失利润止损、移动止损等策略。

4. 动态调整仓位和杠杆 

根据市场变化适时调整仓位大小和杠杆参数,让策略更好地适应不同市况。

5. 结合更复杂的机器学习算法

运用 LSTM、RNN 等深度学习模型来预测关键点突破概率,让策略更智能化。

## 总结

Camarilla 支撑阻力层突破策略是一种简单直接、易于实现的量化交易策略。它运用了成熟的技术分析工具,通过捕捉关键支撑阻力点的突破产生交易信号。这种策略优点是稳定、可靠,实盘操作也较为简单。当然,想要获得更高的交易效率,还需要对其进行止损优化、参数调整、风控等进一步优化。

|| 

## Overview  

The Camarilla Pivot Breakout Strategy is a quantitative trading strategy that utilizes Camarilla pivot levels for entries and exits. This strategy draws on traditional technical analysis support and resistance theories, combines Camarilla mathematical formulas to calculate pivot points at different timeframes, and sets breakouts of these key levels as conditions for trade openings and closings, in order to achieve excess returns.  

## Strategy Logic

The core logic of this strategy is: calculating the H4 and L4, two key support and resistance levels, from the Camarilla formula at the daily timeframe; generating trading signals when price breaks these two levels.

Specifically, the strategy first calculates the midpoint of highest, lowest and closing prices of the current bar as the pivot point. Then it calculates the price range. Based on the range, various Camarilla levels can be plotted, including H4, H3, H2, H1 and L1, L2, L3, L4. Among them, H4 is the first resistance and L4 is the first support.  

For trade signals, if the closing price breaks above H4 level, it triggers a long signal; if closing price breaks below L4, it triggers a short signal. By capturing breakouts of key S/R levels, the strategy judges the direction and momentum of the trend, generating trade signals.  

So the main logic is: using Camarilla level breakouts to determine market structure and obtain trade signals.

## Advantage Analysis 

This Camarilla breakout strategy has several key strengths:

1. Based on proven traditional technical theories, stable backtests

Camarilla analysis uses classic support/resistance concepts. Such theories stood the test of time and ensure strategy robustness across products and timeframes.

2. Simple parameters, easy execution 

Comparing to machine learning models, Camarilla rules are simple with few tunable metrics, easy to understand and execute in live trading, especially for beginners.

3. Clear breakout signals, simple coding 

Monitoring H4/L4 breakouts directly translates to trade entries. The strategy signal is crisp and code is simple. This allows quick prototyping from ideas to live trading.

4. Applicable for high and low frequency trading  

Camarilla strategy works for high frequency (second, minute bars) and low frequency (daily, weekly) trading. This versatility is a major plus.

## Risk Analysis

However, such simple breakout strategy has some inherent weaknesses:  

1. Risk of false breakout  

Price may fail to trend post breakout and reverse instead. Not cutting loss timely could lead to large drawdowns. We need safeguards against false signals.

2. Missing some breakout opportunities 

Monitoring only closing prices may cause missing potential breakouts during earlier bar periods. Optimization is needed to improve signal accuracy.

3. Profit potential could be limited

Comparing to more sophisticated models, sole reliance on Camarilla may limit profit margin and amplitude. We can mitigate through position sizing and leverage management.

Therefore, risk management via stop loss, optimizing entry logic, and adjusting position sizes are necessary to ensure robustness of such simple breakout method. 

## Optimization Directions

To further optimize this Camarilla breakout strategy, we can focus on the following:  

1. Incorporate additional metrics to detect true breakout  

Combining volume, moving averages etc. to gauge breakout authenticity and avoid false signals.  

2. Optimize breakout logic  

Like relaxing breakout magnitude through backtests to find sweet spots. Or adding more rules based on seasonalities.

3. Optimize stop loss strategies   

Tighten stop loss ranges while avoiding premature stops. Or alternative strats like trailing stop loss.  

4. Dynamically adjust position sizes and leverage

Adaptive tuning of positions and leverage parameters to suit evolving market regimes.  

5. Incorporate more advanced machine learning  

Leverage LSTM, RNN models to predict breakout probabilities and enhance intelligence.


## Summary   

The Camarilla Pivot Breakout Strategy is a simple and direct quantitative trading strategy that is easy to implement. It utilizes mature technical analysis tools and generates trade signals by capturing breaks of key support and resistance levels. This type of strategy has the advantage of stability and reliability. It is also relatively simple for real-world execution. Of course, further enhancements around stop loss, parameter tuning, risk control etc. are necessary to achieve higher efficiency.  

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-27 00:00:00
end: 2024-01-03 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//Created by CristianD
strategy(title="CamarillaStrategy", shorttitle="CD_Camarilla_Strategy", overlay=true) 
//sd = input(true, title="Show Daily Pivots?")
EMA = ema(close,3)

//Camarilla
pivot = (high + low + close ) / 3.0 
range = high - low
h5 = (high/low) * close 
h4 = close + (high - low) * 1.1 / 2.0
h3 = close + (high - low) * 1.1 / 4.0
h2 = close + (high - low) * 1.1 / 6.0
h1 = close + (high - low) * 1.1 / 12.0
l1 = close - (high - low) * 1.1 / 12.0
l2 = close - (high - low) * 1.1 / 6.0
l3 = close - (high - low) * 1.1 / 4.0
l4 = close - (high - low) * 1.1 / 2.0
h6 = h5 + 1.168 * (h5 - h4) 
l5 = close - (h5 - close)
l6 = close - (h6 - close)

// Daily line breaks
//sopen = request.security(syminfo.tickerid, "D", open [1])
//shigh = request.security(syminfo.tickerid, "D", high [1])
//slow = request.security(syminfo.tickerid, "D", low [1])
//sclose = request.security(syminfo.tickerid, "D", close [1])
//
// Color
//dcolor=sopen != sopen[1] ? na : black
//dcolor1=sopen != sopen[1] ? na : red
//dcolor2=sopen != sopen[1] ? na : green

//Daily Pivots 
dtime_pivot = request.security(syminfo.tickerid, 'D', pivot[1]) 
dtime_h6 = request.security(syminfo.tickerid, 'D', h6[1]) 
dtime_h5 = request.security(syminfo.tickerid, 'D', h5[1]) 
dtime_h4 = request.security(syminfo.tickerid, 'D', h4[1]) 
dtime_h3 = request.security(syminfo.tickerid, 'D', h3[1]) 
dtime_h2 = request.security(syminfo.tickerid, 'D', h2[1]) 
dtime_h1 = request.security(syminfo.tickerid, 'D', h1[1]) 
dtime_l1 = request.security(syminfo.tickerid, 'D', l1[1]) 
dtime_l2 = request.security(syminfo.tickerid, 'D', l2[1]) 
dtime_l3 = request.security(syminfo.tickerid, 'D', l3[1]) 
dtime_l4 = request.security(syminfo.tickerid, 'D', l4[1]) 
dtime_l5 = request.security(syminfo.tickerid, 'D', l5[1]) 
dtime_l6 = request.security(syminfo.tickerid, 'D', l6[1]) 

//offs_daily = 0
//plot(sd and dtime_pivot ? dtime_pivot : na, title="Daily Pivot",color=dcolor, linewidth=2)
//plot(sd and dtime_h6 ? dtime_h6 : na, title="Daily H6", color=dcolor2, linewidth=2)
//plot(sd and dtime_h5 ? dtime_h5 : na, title="Daily H5",color=dcolor2, linewidth=2)
//plot(sd and dtime_h4 ? dtime_h4 : na, title="Daily H4",color=dcolor2, linewidth=2)
//plot(sd and dtime_h3 ? dtime_h3 : na, title="Daily H3",color=dcolor1, linewidth=3)
//plot(sd and dtime_h2 ? dtime_h2 : na, title="Daily H2",color=dcolor2, linewidth=2)
//plot(sd and dtime_h1 ? dtime_h1 : na, title="Daily H1",color=dcolor2, linewidth=2)
//plot(sd and dtime_l1 ? dtime_l1 : na, title="Daily L1",color=dcolor2, linewidth=2)
//plot(sd and dtime_l2 ? dtime_l2 : na, title="Daily L2",color=dcolor2, linewidth=2)
//plot(sd and dtime_l3 ? dtime_l3 : na, title="Daily L3",color=dcolor1, linewidth=3)
//plot(sd and dtime_l4 ? dtime_l4 : na, title="Daily L4",color=dcolor2, linewidth=2)
//plot(sd and dtime_l5 ? dtime_l5 : na, title="Daily L5",color=dcolor2, linewidth=2)
//plot(sd and dtime_l6 ? dtime_l6 : na, title="Daily L6",color=dcolor2, linewidth=2)

longCondition = close >dtime_h4
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)
    


shortCondition = close <dtime_l4
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
    

```

> Detail

https://www.fmz.com/strategy/437664

> Last Modified

2024-01-04 16:17:06
