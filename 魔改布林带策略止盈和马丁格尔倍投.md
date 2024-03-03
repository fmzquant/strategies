
> Name

魔改布林带策略止盈和马丁格尔倍投

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|20|Length|
|v_input_3|2|Multiplier|
|v_input_4|true|使用马丁格尔倍投|
|v_input_5|0.001|初始仓位大小|
|v_input_6|2|马丁格尔倍数|
|v_input_7|1.5|止盈倍数|
|v_input_8|0.95|止损倍数|


> Source (PineScript)

``` pinescript

//@version=4
strategy("Bollinger Bands %B Crossover", overlay=true,pyramiding = 5)

// Load Bollinger Bands %B indicator
source = input(close, title="Source")
length = input(20, minval=1, title="Length")
mult = input(2.0, minval=0.001, maxval=50, title="Multiplier")
basis = sma(source, length)
dev = mult * stdev(source, length)
upper = basis + dev
lower = basis - dev
bb = (source - lower) / (upper - lower)

// Define long and short conditions
longCondition = crossover(bb, 0)
shortCondition = crossunder(bb, 1)

// 马丁格尔策略参数
useMartin = input(true, title="使用马丁格尔倍投")
initialQty = input(0.001, title="初始仓位大小")
martinFactor = input(2, title="马丁格尔倍数")
// 止盈止损
profitTarget = input(1.5, title="止盈倍数")
stopLoss = input(0.95, title="止损倍数")
//定义触发加仓的百分比
dropPercentage=10
//计算当前持仓总成本
totalCost=strategy.position_avg_price*strategy.position_size
//计算当前持仓盈亏
profitLoss=(close-totalCost)/totalCost*100



// 买入条件满足时，产生买入信号，并设置止盈
if (longCondition)
    strategy.entry("Buy", strategy.long)
     if useMartin
//判断是否需要加仓
if profitLoss<=-dropPercentage and strategy.position_size >0
        strategy.order("Buy1", "Buy",qty=strategy.position_size * martinFactor,when=strategy.long )
if strategy.position_size >0
        strategy.exit("Take Profit/Stop Loss", "Buy", profit=strategy.position_avg_price  *profitTarget )

// 卖出条件满足时，产生卖出信号，并设置止盈
if (shortCondition)
    strategy.entry("Sell",strategy.short)
     if useMartin
//判断是否需要加仓
if profitLoss<= -dropPercentage and strategy.position_size <0
       strategy.order( "Sell2","Sell", qty=strategy.position_size * martinFactor,when=strategy.short)
if strategy.position_size <0
       strategy.exit("Take Profit/Stop Loss", "Sell", profit=strategy.position_avg_price  *stopLoss )



```

> Detail

https://www.fmz.com/strategy/429401

> Last Modified

2023-10-29 21:56:29
