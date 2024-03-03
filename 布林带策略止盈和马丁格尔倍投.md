
> Name

布林带策略止盈和马丁格尔倍投

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


> Source (PineScript)

``` pinescript

//@version=4
strategy("Bollinger Bands %B Crossover", overlay=true,pyramiding = 6)

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


// 买入条件满足时，产生买入信号，并设置止盈止损
if (longCondition)
    strategy.entry("Buy", strategy.long)
     if useMartin
if close<strategy.position_avg_price*0.95 and strategy.position_size >0
        strategy.order("exitBuy", "Buy",qty=strategy.position_size * martinFactor,when=strategy.long)
if strategy.position_size >0
        strategy.exit("Take Profit/Stop Loss", "Buy", profit=strategy.position_avg_price  * 1.1)

// 卖出条件满足时，产生卖出信号，并设置止盈止损
if (shortCondition)
    strategy.entry("Sell",strategy.short)
     if useMartin
if close<strategy.position_avg_price*1.05 and strategy.position_size < 0
       strategy.order( "exitSell","Sell", qty=strategy.position_size * martinFactor,when=strategy.short)
if strategy.position_size >0
       strategy.exit("Take Profit/Stop Loss", "Sell", profit=strategy.position_avg_price  * 1.1)



```

> Detail

https://www.fmz.com/strategy/422794

> Last Modified

2023-10-19 08:34:55
