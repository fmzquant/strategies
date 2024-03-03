
> Name

多项式追踪止损策略Polynomial-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8b06448b5c67a5f55d.png)
[trans]
### 概述

多项式追踪止损策略是一种带有多项式函数形式追踪止损的策略。该策略在简单滑动收盘蜡烛的交叉点入场。入场时,固定入场时期的最小值。入场后,激活以最小值+D\*N^a的形式的追踪止损,其中最小值是入场时固定的期间最小值,D是后退值,N是持仓期间的K线数量,a是多项式的度数。当追踪止损从下向上穿过K线收盘价时,平仓。

### 策略原理

多项式追踪止损策略的核心是采用了一个带有多项式形式追踪止损的策略框架。首先,在简单滑动平均线的交叉点发出入场信号。具体来说,当收盘价从上穿下简单移动平均线时看跌入场。入场后,记录入场时的周期最小值作为后续的止损基准值。然后,策略激活特殊的多项式追踪止损逻辑。追踪止损线的计算公式为:最小值 + D * 持仓周期数的a次幂。其中,最小值是入场时记录的周期内最低价,D是后退值,持仓周期数表示目前已经持仓的天数或K线数量,a代表多项式的次数或度数。换句话说,随着持仓时间的推移,止损线会以一定的非线性模式上移,呈现多项式曲线,并最终会追上价格达到平仓条件。当此多项式追踪止损线从下向上穿过K线的收盘价时,就会触发平仓。

该策略最大的优点是可以根据市场情况灵活调整止损线,在盈利后及时止损保证利润。与传统的线性追踪止损相比,该策略的多项式止损线更加平滑,可以有效抑制无谓的止损被触发。同时,相比突破止损,该策略可以随着时间推移不断抬高止损线,实现盈利保护。通过调整D和a参数,可以改变止损线的形状,实现对市场变化的动态跟踪。

### 优势分析

多项式追踪止损策略最大的优势在于:

1. 采用特殊的多项式止损方式,可以根据市场情况灵活调整止损线,避免线性止损的问题。

2. 相比传统止损方法,该策略通过非线性方式调整止损线,可以大大减少无谓的止损被触发。

3. 该策略止损线平滑上移,可以在保证盈利的同时及时止损。

4. 策略止损方式可以通过调整参数自由改变,对市场变化具有很强的适应性。

5. 策略框架简单清晰,容易实现和优化。

### 风险分析

多项式追踪止损策略也存在一些可能的风险:

1. 如果追踪止损线调整得过于激进,可能会过早止损。这可以通过参数优化来解决。

2. 在止损线平滑上移的过程中,可能会错过更大的盈利机会。这是该策略的必然取舍。

3. 多项式函数可能会产生一些意外的价格穿透情况,这需要调整参数以及添加其他止损手段来规避。

4. 作为技术指标交易策略,该策略对突发事件的应对能力较弱。这可以通过人工干预或者与其他模型组合来增强。

### 优化方向 

多项式追踪止损策略还有以下几个主要的优化方向:

1. 调整入场逻辑,寻找更好的入场时机。

2. 优化追踪止损线的计算公式,找到最佳的参数组合。

3. 尝试不同的止损线形状,如指数、对数等。

4. 在止损线之外添加其他止损手段,构建止损防线。

5. 尝试与机器学习、深度学习等模型的组合,利用模型预测指导止损。

6. 探索将策略应用在不同市场及不同周期的效果。

7. 构建止损线自适应优化机制,自动优化止损曲线的形状。

### 总结

多项式追踪止损策略总的来说是一个非常实用的止损策略。它突破了传统线性追踪止损的局限性,采用更加平滑的非线性多项式函数作为止损线,可以明显减少无谓止损的同时保证盈利。该策略止损机制灵活度高,可以通过调整相关参数自由改变止损线的形状,对市场变化具有很强的适应力。同时该策略框架简洁,容易理解和secondary,具有很高的实践意义。当然,该策略作为技术指标策略,对突发事件的处理能力较弱,这是需要注意的风险之一。总的来说,多项式追踪止损策略是一个高效、实用、容易操作的盈利保护类策略,值得量化交易者学习和使用。

||

### Overview

The Polynomial Trailing Stop strategy is a strategy with a trailing stop in the form of a polynomial function. It enters at the intersection of a simple sliding closing candle. At the moment of entering the position, it is fixed by the value of the Minimum for the period. After entering the position, a trailing stop of the form Minimum + D \* N^a is activated, where Minimum is the minimum for the period fixed at the time of entering the position, D is the decrement, N is the number of bars in the position and a is the degree of the polynomial. When the trailing stop crosses the candle closing from the bottom up, the transaction is closed.

### Strategy Principle 

The core of the Polynomial Trailing Stop strategy is that it uses a strategy framework with a polynomial trailing stop. Firstly, it sends entry signals at the intersection of simple moving average lines. Specifically, go short when the close price crosses below the simple moving average line. After entry, record the minimum value of the period when entering as the subsequent stop loss benchmark. Then, the strategy activates a special polynomial trailing stop logic. The calculation formula of the trailing stop line is: Minimum + D * Power of the number of holding periods a. Where the minimum is the lowest price of the period recorded when entering, D is the decrement, the number of holding periods represents the number of days or K-lines that have currently been holding positions, and a represents the number of times or degree of the polynomial. In other words, as the holding time elapses, the stop loss line will move up in a certain nonlinear pattern, showing a polynomial curve, and eventually it will catch up with the price to reach the closing condition. When this polynomial trailing stop line crosses the close of the K-line from bottom to top, it will trigger closing.

The biggest advantage of this strategy is that it can flexibly adjust the stop loss line according to market conditions and timely stop loss to ensure profit after profiting. Compared with traditional linear trailing stops, the polynomial stop loss line of this strategy is smoother, which can effectively suppress unnecessary stop loss triggers. At the same time, compared with break-even stops, this strategy can continue to raise the stop loss line as time goes by to protect profits. By adjusting parameters D and a, the shape of the stop loss line can be changed to dynamically track market changes.

### Advantage Analysis

The biggest advantage of the Polynomial Trailing Stop Strategy is:

1. Using special polynomial stop loss methods, stop loss lines can be flexibly adjusted according to market conditions to avoid the problems of linear stops.

2. Compared with traditional stop loss methods, the strategy adjusts the stop loss line in a nonlinear way, which can greatly reduce unnecessary stop loss triggers.

3. The stop loss line of the strategy moves up smoothly, which can ensure profitability while stopping loss in time.

4. The stop loss method of the strategy can be freely changed by adjusting parameters, which is highly adaptable to market changes.

5. The strategy framework is simple and clear, easy to implement and optimize.

### Risk Analysis

The Polynomial Trailing Stop strategy also has some potential risks:

1. If the tracking stop loss line is adjusted too aggressively, stop loss may occur prematurely. This can be solved by parameter optimization.

2. In the process of smooth rise of stop line, greater profit opportunities may be missed. This is the necessary trade-off of this strategy. 

3. Polynomial functions may produce some unexpected price penetrations. This needs to adjust parameters and add other stop loss means to avoid risks.

4. As a technical indicator trading strategy, the ability of the strategy to respond to emergencies is weak. This can be enhanced by manual intervention or combination with other models.

### Optimization Directions

The Polynomial Trailing Stop strategy also has the following main optimization directions:

1. Adjust the entry logic to find better entry opportunities.

2. Optimize the calculation formula of the trailing stop line to find the best parameter combination.

3. Try different shapes of stop lines, such as exponential, logarithmic, etc.

4. Add other means of stop loss outside the stop line to build a stop loss defense line.

5. Try the combination with machine learning, deep learning and other models, and use model prediction to guide stop loss.

6. Explore the effect of applying strategies in different markets and different cycles. 

7. Build a self-adaptive optimization mechanism for the stop line to automatically optimize the shape of the stop curve.


### Summary

In general, the Polynomial Trailing Stop Strategy is a very practical stop loss strategy. It breaks through the limitations of traditional linear trailing stops and uses a smoother nonlinear polynomial function as the stop line, which can significantly reduce unnecessary stop loss while ensuring profitability. The stop mechanism of the strategy has high flexibility and can freely change the shape of the stop line by adjusting relevant parameters, which is highly adaptable to market changes. At the same time, the strategy framework is concise and easy to understand and implement, with very high practical significance. Of course, as a technical indicator strategy, the ability of the strategy to deal with emergencies is weak, which is one of the risks to be aware of. In general, the Polynomial Trailing Stop Strategy is an efficient, practical and easy-to-operate profit protection strategy that is worth learning and using for quantitative traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.1|decrement|
|v_input_2|2|polynomial degree |
|v_input_3|20|period SMA|
|v_input_4|20|period MIN_for|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-16 00:00:00
end: 2024-02-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Alferow

//@version=4

strategy("polynomic_stop", overlay=true, initial_capital=1000, commission_value=0.1, default_qty_type=strategy.percent_of_equity, default_qty_value=100)



D = input(0.1, minval = 0.0001, title = 'decrement')
S = input(2, minval = 1.0, title = 'polynomial degree ')



MA = input(20, title = 'period SMA')
MN = input(20, title = 'period MIN_for')



SMA = sma(close, MA)
MIN = lowest(low, MN)




var stop = 0.0
var num = 0
if strategy.opentrades[1] == 0 and strategy.opentrades != 0
    stop := MIN


    
if  strategy.opentrades != 0
    num := num + 1 
    
if  strategy.opentrades == 0
    num := 0
    stop := MIN


    
hl = stop + D * pow(num, S)


plot(hl)
plot(SMA, color = color.red)



strategy.entry("buy", true, when = close[1] < SMA[1] and close > SMA)

strategy.close("buy", when = crossover(hl, close))




```

> Detail

https://www.fmz.com/strategy/442646

> Last Modified

2024-02-23 14:43:36
