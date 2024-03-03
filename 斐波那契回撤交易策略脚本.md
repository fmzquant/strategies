
> Name

斐波那契回撤交易策略脚本

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|斐波那契周期长度|
|v_input_2|0.236|斐波那契水平1|
|v_input_3|0.382|斐波那契水平2|
|v_input_4|0.618|斐波那契水平3|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-27 00:00:00
end: 2023-11-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("斐波那契回撤交易策略", overlay=true, initial_capital=10000)

// 参数
length = input(50, title="斐波那契周期长度")
fib1 = input(0.236, title="斐波那契水平1")
fib2 = input(0.382, title="斐波那契水平2")
fib3 = input(0.618, title="斐波那契水平3")

// 计算斐波那契水平
highLevel = ta.highest(high, length)
lowLevel = ta.lowest(low, length)
range1 = highLevel - lowLevel
fibLevel1 = highLevel - range1 * fib1
fibLevel2 = highLevel - range1 * fib2
fibLevel3 = highLevel - range1 * fib3

// 条件
longCondition = ta.crossover(close, fibLevel3)
shortCondition = ta.crossunder(close, fibLevel1)

// 下单
strategy.entry("Buy", strategy.long, when=longCondition)
strategy.close("Buy", when=shortCondition)

// 图表标记
plot(fibLevel1, title="Fib 0.236", color=color.red)
plot(fibLevel2, title="Fib 0.382", color=color.orange)
plot(fibLevel3, title="Fib 0.618", color=color.green)

```

> Detail

https://www.fmz.com/strategy/430984

> Last Modified

2023-11-03 15:30:58
