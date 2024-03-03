
> Name

模拟三角套利的多时间框架量化交易策略Cross-Cycle-Arbitrage-Strategy-Based-on-Multiple-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/135d93e3523629b7234.png)
[trans]
### 概述

这个策略运用三种不同的技术指标进行组合,构建一个多时间框架的套利策略,通过在不同的时间周期上捕捉价格趋势,实现低风险的超额收益。

### 策略原理

该策略运用的三种技术指标分别是凯尔特通道(KC)、波动率止损(Vstop)和威廉聚会聚会指标(WAE)。凯尔特通道用于判断价格是否处于通道范围之外,因而发出交易信号。波动率止损用于动态调整止损位置,在保证止损的同时减少不必要的止损。威廉指标用于判断价格是否处于强势方向。具体来说:

1. 当价格高于凯尔特通道上轨时,视为看涨信号。当价格低于凯尔特通道下轨时,视为看跌信号。

2. 波动率止损根据价格波动率和通道宽度来设置止损位置。它能够动态调整,在保证止损的同时,避免过于保守的止损位置。

3. 威廉指标通过计算MACD和布林带通道宽度,判断价格是否处于强势上涨或下跌趋势中。

通过组合这三种指标,不同时间周期上的信号实现互相验证。这减少了误判的概率,构建一个稳定优化的策略逻辑。

### 优势分析

该策略最大的优势在于多指标组合带来的精确交易信号。三种指标在不同的时间周期上作用,互相验证,可以有效降低误判概率,增强信号的准确性。此外,波动率止损设置是动态的,能够根据实时波动调整止损位置,进一步控制风险。

相比单一指标策略,该组合策略可以提供更加精准和高效率的交易信号。同时,三种指标相互配合,在多时间框架内形成交易判断,这一逻辑设计非常科学合理,值得借鉴。

### 风险分析

该策略的主要风险在于参数设置不当可能导致过拟合。三个指标共有8个参数,设置不当都可能对策略产生不利影响。此外,指标之间的权重关系也需要合理配置,否则信号可能相互抵消,导致无效。

为降低这些风险,参数设定过程中需要充分考虑不同市场环境的适应性,通过回测分析调整至最优参数组合。此外应适当调整指标之间权重关系,确保交易信号能够有效触发。当出现连续亏损时,也需要考虑降低仓位规模,控制损失。

### 优化方向  

该策略的优化空间主要集中在两个方面:参数调优和止损策略改进。具体来说可以从以下几个方面入手:

1. 更科学合理地选择指标参数,优化参数组合。可以借助算法按照收益最大化、风险最小化等目标寻找最优参数。

2. 改进止损策略,在保证止损的前提下,进一步减少不必要的止损,提高胜率。例如结合更多指标作为止损信号,或设定止损位置的渐进回调。

3. 优化指标的权重关系和交易信号的判断逻辑,降低误判率。可以引入更多价格行为特征,构建更稳定可靠的判断规则。

4. 尝试引入机器学习模型,实现参数自动优化。或使用深度强化学习编程进行策略评估与改进。

### 总结  

本策略通过凯尔特通道、波动率止损和威廉指标三者的组合运用,构建一个跨时间框架的套利系统。多指标组合提高了交易信号准确性,动态止损控制了风险。但参数设定和优化方面仍有改进空间。总体而言,该策略科学性强,值得进一步研究与应用。

||

### Overview  

This strategy uses a combination of three different technical indicators to build a cross-cycle arbitrage strategy that captures price trends across different time frames to achieve low-risk excess returns.

### Strategy Logic  

The three technical indicators used in this strategy are Keltner Channel (KC), Volatility Stop (Vstop), and Williams Alligator (WAE). The Keltner Channel is used to determine if prices are outside the channel range and thus generate trading signals. Volatility Stop is used to dynamically adjust stop loss positions to ensure stop loss while reducing unnecessary stop loss. The Williams Alligator indicator is used to determine if prices are in a strong trend. Specifically:

1. When the price is higher than the Keltner Channel upper rail, it is considered a bullish signal. When the price is lower than the Keltner Channel lower rail, it is considered a bearish signal.  

2. Volatility Stop sets the stop loss position based on price volatility and channel width. It can adjust dynamically to ensure stop loss while avoiding excessively conservative stop loss positions.

3. The Williams Alligator indicator judges whether prices are in a strong uptrend or downtrend by calculating the MACD and Bollinger Band channel width.

By combining these three indicators, signals across different time frames are cross validated. This reduces the probability of misjudgment and builds an optimized strategy logic.  

### Advantage Analysis

The biggest advantage of this strategy is the precise trading signals brought by the combination of multiple indicators. The three indicators work in different time frames and cross validate each other, which can effectively reduce the probability of misjudgment and enhance the accuracy of signals. In addition, Volatility Stop setting is dynamic and can adjust the stop loss position according to real-time volatility to further control risks.

Compared with single indicator strategies, this combined strategy can provide more accurate and efficient trading signals. At the same time, the three indicators work together to form trading judgments within multiple time frames, which is a very scientific and reasonable logic design worth learning from.

### Risk Analysis  

The main risk of this strategy is that improper parameter settings may cause overfitting. The three indicators have 8 parameters in total. Improper settings may adversely affect the strategy. In addition, the weight relationship between indicators also needs to be properly configured, otherwise the signals may neutralize each other and become invalid.  

To reduce these risks, the adaptability to different market environments should be fully considered during parameter setting, and the optimal parameter combination should be adjusted through backtesting analysis. In addition, appropriately adjust the weights between indicators to ensure that trading signals can be effectively triggered. When consecutive losses occur, consider reducing the position size to control losses.

### Optimization Directions

The optimization space of this strategy mainly focuses on two aspects: parameter tuning and improvement of stop loss strategies. Specifically, the following aspects can be considered:

1. Choose indicator parameters more scientifically and optimize parameter combinations. Algorithms can be used to find the optimal parameters with the goals like return maximization and risk minimization.  

2. Improve the stop loss strategy to further reduce unnecessary stop loss while ensuring stop loss, thereby improving win rate. For example, incorporate more indicators as stop loss signals, or set progressive pullback of stop loss positions.  

3. Optimize weights between indicators and logic of trading signal judgments to reduce misjudgment rate. More price behavior features can be introduced to build more stable and reliable judgment rules.  

4. Try to introduce machine learning models to achieve automatic parameter optimization. Or use deep reinforcement learning programming for strategy evaluation and improvement.

### Summary   

This strategy builds a cross-cycle arbitrage system through the combination of Keltner Channel, Volatility Stop and Williams Alligator. Multi-indicator combination improves signal accuracy and dynamic stop loss controls risks. But there is room for improvement in parameters setting and optimization. Overall, this strategy has strong scientificity and is worth further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|Keltner Period|
|v_input_2|5|Keltner Mult|
|v_input_3|3|Vstop length|
|v_input_4|150|Sensitivity|
|v_input_5|20|FastEMA Length|
|v_input_6|40|SlowEMA Length|
|v_input_7|20|BB Channel Length|
|v_input_8|2|BB Stdev Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("QuarryLake", overlay=true)  ///Ultilized modified full kelly for this strategy = 36%

///Keltner channel///
nPeriod = input(title="Keltner Period", type=input.integer, defval=200, minval=1)
Mult = input(title="Keltner Mult", type=input.integer, defval=5, minval=1)
xPrice = ema(hlc3, nPeriod)
xMove = ema(high - low, nPeriod)
xMoveMult = xMove * Mult
xUpper = xPrice + xMoveMult
xLower = xPrice - xMoveMult

// plot(xPrice, color=red, title="KSmid")
p1 = plot(xUpper, color=color.white, title="KSup")
p2 = plot(xLower, color=color.white, title="KSdn")
fill(p1, p2, color=close > xUpper ? color.green : close < xLower ? color.red : color.white)

kclongcondition = close > xUpper
kcshortcondition = close < xLower
kccloselongcondition = crossunder(close, xUpper)
kccloseshortcondition = crossover(close, xLower)

///Volatility Stop///
length = input(title="Vstop length", type=input.integer, defval=3, minval=1)
mult1 = 1.5

atr_ = atr(length)
max1 = 0.0
min1 = 0.0
is_uptrend_prev = false
stop = 0.0
vstop_prev = 0.0
vstop1 = 0.0
is_uptrend = false
is_trend_changed = false
max_ = 0.0
min_ = 0.0
vstop = 0.0
max1 := max(nz(max_[1]), close)
min1 := min(nz(min_[1]), close)
is_uptrend_prev := nz(is_uptrend[1], true)
stop := is_uptrend_prev ? max1 - mult1 * atr_ : min1 + mult1 * atr_
vstop_prev := nz(vstop[1])
vstop1 := is_uptrend_prev ? max(vstop_prev, stop) : min(vstop_prev, stop)
is_uptrend := close - vstop1 >= 0
is_trend_changed := is_uptrend != is_uptrend_prev
max_ := is_trend_changed ? close : max1
min_ := is_trend_changed ? close : min1
vstop := is_trend_changed ? is_uptrend ? max_ - mult1 * atr_ : min_ + mult1 * atr_ : 
   vstop1

plot(vstop, color=is_uptrend ? color.green : color.red, style=plot.style_line, linewidth=1)

vstoplongcondition = close > vstop
vstoplongclosecondition = crossunder(close, vstop)
vstopshortcondition = close < vstop
vstopshortclosecondition = crossover(close, vstop)

///Waddah Attar Explosion///
sensitivity = input(150, title="Sensitivity")
fastLength = input(20, title="FastEMA Length")
slowLength = input(40, title="SlowEMA Length")
channelLength = input(20, title="BB Channel Length")
mult = input(2.0, title="BB Stdev Multiplier")
DEAD_ZONE = nz(rma(tr(true), 100)) * 3.7
calc_macd(source, fastLength, slowLength) =>
    fastMA = ema(source, fastLength)
    slowMA = ema(source, slowLength)
    fastMA - slowMA
calc_BBUpper(source, length, mult) =>
    basis = sma(source, length)
    dev = mult * stdev(source, length)
    basis + dev
calc_BBLower(source, length, mult) =>
    basis = sma(source, length)
    dev = mult * stdev(source, length)
    basis - dev
t1 = (calc_macd(close, fastLength, slowLength) - 
   calc_macd(close[1], fastLength, slowLength)) * sensitivity
t2 = (calc_macd(close[2], fastLength, slowLength) - 
   calc_macd(close[3], fastLength, slowLength)) * sensitivity
e1 = calc_BBUpper(close, channelLength, mult) - 
   calc_BBLower(close, channelLength, mult)
trendUp = t1 >= 0 ? t1 : 0
trendDown = t1 < 0 ? -1 * t1 : 0

waelongcondition = trendUp and trendUp > DEAD_ZONE and trendUp > e1
waeshortcondition = trendDown and trendDown > DEAD_ZONE and trendDown > e1

///Long Entry///
longcondition = kclongcondition and vstoplongcondition and waelongcondition
if longcondition
    strategy.entry("Long", strategy.long)

///Long exit///
closeconditionlong = kccloselongcondition or vstoplongclosecondition
if closeconditionlong
    strategy.close("Long")

///Short Entry///
shortcondition = kcshortcondition and vstopshortcondition and waeshortcondition
if shortcondition
    strategy.entry("Short", strategy.short)

///Short exit///
closeconditionshort = kccloseshortcondition or vstopshortclosecondition
if closeconditionshort
    strategy.close("Short")

///Free Hong Kong, the revolution of our time///

```

> Detail

https://www.fmz.com/strategy/440309

> Last Modified

2024-01-29 11:10:33
