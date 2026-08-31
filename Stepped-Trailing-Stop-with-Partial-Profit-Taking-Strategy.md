
> Name

Stepped-Trailing-Stop-with-Partial-Profit-Taking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15ee126bea595222f55.png)

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
