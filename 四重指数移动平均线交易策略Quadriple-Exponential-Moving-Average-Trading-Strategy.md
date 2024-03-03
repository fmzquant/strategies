
> Name

四重指数移动平均线交易策略Quadriple-Exponential-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9237409b3648d52333.png)

[trans]

## 概述

四重指数移动平均线交易策略是一种典型的跟踪多重指数移动平均线的趋势交易策略。它同时跟踪13日线、21日线、55日线和8日线四条不同周期的指数移动平均线,根据它们的交叉情况来判断市场趋势和产生交易信号。

## 策略原理

该策略的核心逻辑是跟踪4条指数移动平均线EMA13、EMA21、EMA55和EMA8的交叉情况。具体而言,它遵循以下几个交易规则:

1. 当EMA55下穿EMA21,且EMA21高于EMA55,EMA13高于EMA21,EMA8高于EMA13时,做多入场。

2. 当EMA55上穿EMA21,且EMA21低于EMA55,EMA13低于EMA21,EMA8低于EMA13时,做空入场。 

3. 当EMA55上穿EMA21时,如果持有做多单,则平仓做多单,同时开仓做空。

4. 当EMA55下穿EMA21时,如果持有做空单,则平仓做空单,同时开仓做多。

5. 做多止损150点,止盈1000点;做空止损150点,止盈1000点。

可以看出,该策略使用EMA55与EMA21的交叉作为判断市场主要趋势的信号,使用EMA13、EMA21和EMA8的大小关系来确定具体的入场Timing。

## 优势分析

四重EMA策略具有以下几个优势:

1. 使用多组EMA,可以比较准确地判断市场趋势。EMA55与EMA21判断主趋势方向,EMA13、EMA21和EMA8进行入场时机优化,提高策略效率。

2. 策略较为简单清晰,容易理解和实施。

3. 利用EMA的平滑性质,可以有效过滤市场噪音,避免被套。 

4. 该策略对交易品种没有特殊要求,可以广泛适用于不同的股票、外汇、加密货币等金融产品。

## 风险及改进

该策略也存在以下风险:

1. 在趋势反转时,跟踪EMA有可能出现损失或迟迟不反转的情况。此时可适当调整EMA参数或加入其它指标判断。

2. 止损止盈点可能需要根据不同品种而调整。对此可以加入动态止盈止损来优化。

3. 在参数优化方面也可进一步完善,寻找最优参数组合。加入机器学习算法可能有所帮助。

4. 可考虑结合波动率指标,在高波动时降低仓位。这可以控制风险。

## 总结

四重EMA策略是一个相对简单的趋势跟踪策略。它使用多组EMA描绘市场趋势,并据此产生交易信号。该策略较为简洁,容易实施,可广泛适用与不同品种,是一种可靠的趋势跟踪策略。但我们也要注意该策略存在被动切换趋势的风险,这一点通过加入更多辅助判断指标或优化参数等方式还可进一步完善。
||

## Overview  

The Quadriple Exponential Moving Average (EMA) trading strategy is a typical trend-following strategy that tracks multiple exponential moving averages. It simultaneously tracks the 13-day, 21-day, 55-day and 8-day EMAs and generates trading signals based on their crossover situations to determine market trends.  

## Strategy Logic  

The core logic of this strategy is to track the crossover situations between the 4 EMAs - EMA13, EMA21, EMA55 and EMA8. Specifically, it follows these trading rules:  

1. When EMA55 crosses below EMA21, and EMA21 is above EMA55, EMA13 is above EMA21, and EMA8 is above EMA13, go long.  

2. When EMA55 crosses above EMA21, and EMA21 is below EMA55, EMA13 is below EMA21, and EMA8 is below EMA13, go short.

3. When EMA55 crosses above EMA21, if already long, close long position and open short position.  

4. When EMA55 crosses below EMA21, if already short, close short position and open long position.

5. Set stop loss at 150 points and take profit at 1000 points for both long and short trades.

As we can see, this strategy uses the crossover between EMA55 and EMA21 to judge the major trend direction. The relative positions of EMA13, EMA21 and EMA8 are then used to optimize entry timings.  

## Advantage Analysis 

The Quadriple EMA strategy has these advantages:

1. Using multiple EMAs can accurately determine market trends. EMA55 vs EMA21 judges the major trend while EMA13, EMA21 and EMA8 optimize entry timings to improve efficiency.   

2. The strategy logic is simple and clear, easy to understand and implement.  

3. The smoothing nature of EMAs helps filter market noise and avoid traps. 

4. This strategy can be broadly applied to different products like stocks, forex, crypto etc as it has no special requirements.

## Risks and Improvements

The risks of this strategy include:

1. Tracking EMAs may lead to losses or late trend reversal signals when trend reverses. Adjusting EMA parameters or adding other indicators could help.  

2. Stop loss and take profit points may need adjustment for different products. Dynamic SL/TP can optimize this.

3. Further parameter optimization with machine learning algorithms may also improve performance.  

4. Incorporating volatility metrics to lower position sizes during high volatility periods could help control risks.

## Conclusion  

The Quadriple EMA strategy is a relatively simple trend-following strategy. It uses multiple EMAs to depict market trends and generate trading signals accordingly. The strategy is concise, easy to implement, and broadly applicable across different products. However, we should also note the risks of passive trend switch and further improve it by adding more supplemental indicators or optimizing parameters.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-24 00:00:00
end: 2023-11-30 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Quadriple EMA Strategy", overlay=true, pyramiding=1, currency=currency.USD, initial_capital=10000, default_qty_type=strategy.cash, default_qty_value=10000)

ema13 = ta.ema(close, 13)
ema21 = ta.ema(close, 21)
ema55 = ta.ema(close, 55)
ema8 = ta.ema(close, 8)

plot(ema13, color=color.green, title="ema13")
plot(ema21, color=color.orange, title="ema21")
plot(ema55, color=color.red, title="ema55")
plot(ema8, color=color.blue, title="ema8")

if ta.crossunder(ema55, ema21) and strategy.position_size == 0 and ema21>ema55 and ema13>ema21 and ema8>ema13
	strategy.entry("Enter Long", strategy.long)
    strategy.exit("Exit Long", from_entry="Enter Long", loss=150, profit=1000)

if (ta.crossover(ema55, ema21) and strategy.position_size == 0) and ema21<ema55 and ema13<ema21 and ema8<ema13
	strategy.entry("Enter Short", strategy.short)
    strategy.exit("Exit Short", from_entry="Enter Short", loss=150, profit=1000)

if ta.crossover(ema55,ema21)
    strategy.close("Enter Long")
    strategy.entry("Enter Short", strategy.short)

if ta.crossunder(ema55,ema21)
    strategy.close("Enter Short")
    strategy.entry("Enter Long", strategy.long)

```

> Detail

https://www.fmz.com/strategy/433971

> Last Modified

2023-12-01 18:29:07
