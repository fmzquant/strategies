
> Name

分阶梯式止盈滑点策略Stepped-Trailing-Stop-with-Partial-Profit-Taking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15ee126bea595222f55.png)
[trans]

### 概述

本策略是一个利用分阶梯式止盈结合滑点止损的退出策略。它在达到第一个止盈点后会将止损移至盈亏平衡点,在达到第二个止盈点后会将止损移至第一个止盈点,从而实现了一个分阶梯式的止损滑点机制。这可以锁定部分利润的同时保持较大的利润空间。

### 策略原理 

本策略主要通过以下几个部分来实现分阶止盈滑点:

1. 设置止损点和3个止盈点。
2. 定义当前获利点数和止损价格的计算函数。
3. 定义获利阶段的判断函数。
4. 在不同的获利阶段,修改止损价格来实现滑点止损。

具体来说,它首先设置了100点的止损距离和100/200/300点的3个止盈距离。然后定义了基于当前价格和开仓价格来计算获利点数的函数`curProfitInPts`,以及根据点数距离计算止损价格的函数`calcStopLossPrice`。

关键逻辑在于`getCurrentStage`函数,它判断当前是否有头寸,以及获利点数是否超过了某个止盈点,如果超过则进入下一阶段。例如达到100点止盈后进入第二阶段,达到200点止盈后进入第三阶段。

最后根据阶段不同修改止损价格,从而实现滑点止损。第一阶段止损保持原始设置,第二阶段移至盈亏平衡,第三阶段移至第一个止盈点。

### 优势分析

这种分阶梯式止盈滑点策略具有以下几个优势:

1. 可以锁定部分利润,同时保持后续较大的获利空间。
2. 利用滑点止损来跟踪价格,可以减少回撤PRODID或亏损的可能性。 
3. 分多次止盈,相比一次性止盈可以更好控制风险。
4. 策略逻辑清晰简单易于理解。

### 风险分析

该策略也存在一定的风险:

1. 分阶止盈可能导致无法及时止盈,错过较好退出点位。可以通过调整止盈点数优化。
2. 滑点幅度设置过大可能导致止损过早被触发。可以测试不同滑点幅度。  
3. 无法止损也会带来较大亏损风险。可以考虑在特定情况下快速止损。

### 优化方向  

该策略可以从以下几个方向进行优化:

1. 测试不同的止盈止损距离,优化参数。
2. 在特殊情况下考虑快速止损机制。
3. 结合技术指标判断确定止盈和止损位。
4. 优化滑点幅度,平衡止盈和止损。

||

### Overview 

This is an exit strategy that utilizes a stepped trailing stop with partial profit taking. It moves the stop loss to breakeven after reaching the first take profit level, and moves to the first take profit after reaching the second level. This allows locking in some profits while maintaining profit potential.  

### Strategy Logic

The key components of this strategy are:

1. Setting a stop loss and 3 take profit levels in points.  
2. Defining functions to calculate current profit in points and stop loss price.
3. Defining a function to determine current profit stage.  
4. Modifying stop loss price based on profit stage to trail price.

Specifically, it firstly sets a 100 point stop loss and take profits at 100/200/300 points. The `curProfitInPts` function calculates current profit based on current price and entry price. The `calcStopLossPrice` function calculates stop loss price based on point distance.  

The key logic is within the `getCurrentStage` function which checks if there is a position and if profit has exceeded each take profit level, advancing the stage if true. For example stage 2 is reached after 100 point profit, and stage 3 after 200 point profit.

Finally, the stop loss is modified according to the stage. Stage 1 uses the original stop, stage 2 breakseven, and stage 3 trails the first take profit level.  

### Advantage Analysis

The advantages of this stepped trailing stop strategy:

1. Allows locking in some profits while maintaining further profit potential.  
2. Trailing stop loss follows price and reduces chance of drawdown.
3. Multi-step profit taking controls risk better than one take profit. 
4. Simple and clear logic.

### Risk Analysis  

There are some risks to consider:

1. Stepped profit taking may miss better exit opportunities. Can optimize take profit levels.
2. If trail stop distance too high, stop may trigger prematurely. Can test different distances. 
3. Inability to cut losses can also lead to larger losses. Consider fast stop loss in specific cases.

### Optimization

Some ways this strategy can be improved:

1. Test different profit and stop distances to optimize parameters.  
2. Consider fast stop loss mechanisms for specific situations. 
3. Use technical indicators to determine profit targets and stop levels.
4. Balance profitable exits and stop distances.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|sl|
|v_input_2|100|tp1|
|v_input_3|200|tp2|
|v_input_4|300|tp3|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-11-27 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © adolgov

// @description
// when tp1 is reached, sl is moved to break-even
// when tp2 is reached, sl is moved to tp1
// when tp3 is reached - exit

//@version=4
strategy("Stepped trailing strategy example", overlay=true)

// random entry condition
longCondition = crossover(sma(close, 14), sma(close, 28))
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

// sl & tp in points
sl = input(100)
tp1 = input(100)
tp2 = input(200)
tp3 = input(300)

curProfitInPts() =>
    if strategy.position_size > 0
        (high - strategy.position_avg_price) / syminfo.mintick
    else if strategy.position_size < 0
        (strategy.position_avg_price - low) / syminfo.mintick
    else
        0
        
calcStopLossPrice(OffsetPts) =>
    if strategy.position_size > 0
        strategy.position_avg_price - OffsetPts * syminfo.mintick
    else if strategy.position_size < 0
        strategy.position_avg_price + OffsetPts * syminfo.mintick
    else
        0
        
calcProfitTrgtPrice(OffsetPts) =>
    calcStopLossPrice(-OffsetPts)

getCurrentStage() =>
    var stage = 0
    if strategy.position_size == 0 
        stage := 0
    if stage == 0 and strategy.position_size != 0
        stage := 1
    else if stage == 1 and curProfitInPts() >= tp1
        stage := 2
    else if stage == 2 and curProfitInPts() >= tp2
        stage := 3
    stage

stopLevel = -1.
profitLevel = calcProfitTrgtPrice(tp3)

// based on current stage set up exit
// note: we use same exit ids ("x") consciously, for MODIFY the exit's parameters
curStage = getCurrentStage()
if curStage == 1
    stopLevel := calcStopLossPrice(sl)
    strategy.exit("x", loss = sl, profit = tp3, comment = "sl or tp3")
else if curStage == 2
    stopLevel := calcStopLossPrice(0)
    strategy.exit("x", stop = stopLevel, profit = tp3, comment = "breakeven or tp3")
else if curStage == 3
    stopLevel := calcStopLossPrice(-tp1)
    strategy.exit("x", stop = stopLevel, profit = tp3, comment = "tp1 or tp3")
else
    strategy.cancel("x")
    
// this is debug plots for visulalize TP & SL levels
plot(stopLevel > 0 ? stopLevel : na, style = plot.style_linebr)
plot(profitLevel > 0 ? profitLevel : na, style = plot.style_linebr)
```

> Detail

https://www.fmz.com/strategy/433572

> Last Modified

2023-11-28 16:05:24
