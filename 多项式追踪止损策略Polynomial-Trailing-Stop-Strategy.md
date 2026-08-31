
> Name

多项式追踪止损策略Polynomial-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8b06448b5c67a5f55d.png)

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
