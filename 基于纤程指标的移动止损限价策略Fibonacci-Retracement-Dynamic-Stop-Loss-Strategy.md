
> Name

基于纤程指标的移动止损限价策略Fibonacci-Retracement-Dynamic-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b263f415fa69916127.png)
[trans]
## 概述

该策略利用纤程指标自动设置止损和止盈价格,实现移动止损限价交易。它可以在趋势行情中获取更大利润,同时也可以在震荡行情中减少亏损。

## 策略原理

该策略主要基于纤程指标来设定价格。纤程指标可以反映市场的潜在支撑和阻力。该策略利用纤程指标的不同级别作为止损和止盈价格。

具体来说,策略会跟踪高点和低点,计算出10个纤程价格区间。然后根据配置选择一个纤程价格作为入场策略。当价格突破该纤程时,会按照配置的杠杆下单做多。同时,也会设定一个止盈价格,等于平均入场价再加上配置的止盈百分比。

在下单后,策略会继续跟踪最新纤程价格。当出现更低的纤程时,策略会撤销原有委托,重新下单,实现移动止损。当价格上涨突破止盈价格时,策略会平仓止盈。

## 优势分析

该策略最大的优势在于可以动态调整止损和止盈价格,专门用于趋势行情。具有以下特点:

1. 能够在趋势行情中获取更大利润。配置了基于平均入场价格的止盈设置,可以最大程度参与趋势行情,获得更高收益。

2. 能够在震荡行情中减少亏损。当价格重新触及更低纤程时,会及时止损,避免在震荡中被套。

3. 支持加仓。配置了加仓设置,当价格下跌到一定幅度时,会加大仓位,减少平均持仓成本。

4. 操作简单。只需要配置好纤程和止盈比例,整个交易全自动完成,无需人工操作。

## 风险分析

该策略也存在一些风险,主要集中在以下几点:

1. 容易在震荡盘整中被反复止损止盈。当出现横盘或震荡行情时,价格可能会多次上下触发止损止盈,增加交易频率和手续费支出。

2. 没有止损设置。为了追求更大利润,策略并没有设置止损。如果出现重大行情反转,可能面临巨额亏损。

3. 加仓次数和金额没有限制。多次加仓可能导致亏损进一步扩大。

对应解决方法:
1. 可以设置条件,在震荡行情中暂停交易。
2. 可以手动监控行情,必要时强制平仓止损。 
3. 对加仓次数和金额设置上限。

## 优化方向 

该策略还具有很大的优化空间,主要可以从以下几个方面进行:

1. 利用其他指标组合确认入场。可以在入场条件中加入EMA,MACD等指标的确认,避免在震荡行情中被套。

2. 加入止损机制。配置固定止损或追踪止损,可以避免极端行情中巨额亏损。

3. 优化加仓逻辑。可以根据具体市场情况,优化加仓的价格区间和次数。防止过度加仓。

4. 结合机器学习算法。例如使用LSTM等算法预测价格可能的走势和支撑阻力。辅助 Determine 更优的入场出场逻辑。


## 总结

该策略整体来说适合追踪趋势行情。它可以通过动态调整止盈止损价格获取更大利润。同时也存在一定的风险,需要结合其他机制进行优化和改进,使其能够适应更复杂的市场环境。

||

## Overview

This strategy utilizes the Fibonacci retracement levels to automatically set stop loss and take profit prices for position management. It allows to ride trends for greater profits while mitigating losses during consolidation.

## Strategy Logic

The core of this strategy relies on the Fibonacci retracement indicator to determine key support and resistance levels. It tracks the recent highs and lows to plot 10 Fibonacci price zones. Based on configuration, one of the Fibonacci levels is chosen as the entry trigger. When price breaks above that level, a long order will be placed based on the configured leverage. At the same time, a take profit price is set at certain percentage above the entry price.

After entry, the strategy keeps tracking the updated Fibonacci levels. If a lower Fib level emerges, indicating potential reversal, the strategy will cancel existing orders and re-place orders at the lower price as a stop loss mechanism. When the price eventually breaks above the take profit price, the position will be closed for profit.

## Advantages

The biggest advantage of this strategy is the ability to dynamically adjust stop loss and take profit prices for trending markets. Key traits:

1. Capture greater profits in trending conditions by trailing stops based on entry price.

2. Mitigate losses in consolidation by stopping out at emerging lower Fib levels.  

3. Allow pyramiding by adding to position when price drops certain percentage from last entry price.

4. Simple to operate with automatic order placement once configured correctly.

## Risks

There are still some risks to be aware of:

1. Prone to repeated stops during sideways markets, increasing fees.

2. No fixed stop loss mechanism, risks large drawdowns.

3. Uncapped pyramiding might exacerbate losses.


Corresponding solutions:

1. Pause trading when price oscillating in range.

2. Manually overseer markets and close positions if necessary.

3. Set limits on pyramiding orders.

## Enhancement Opportunities 

There remains ample room for optimization:

1. Add additional indicators like EMA, MACD for extra entry confirmation to avoid false breakouts.

2. Incorporate fixed/trailing stop loss mechanisms to limit losses in extreme conditions.

3. Refine pyramiding logic based on market regimes to prevent over-leveraging. 

4. Employ machine learning models like LSTM to forecast price and identify better entry/exits.

## Conclusion

In summary, this strategy is suitable for trend-fading scenarios. By constantly adjusting stops it allows riding trends effectively. Proper optimizations and guard rails are needed handling more tricky market conditions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Live|
|v_input_2|1600976975|Start Timestamp|
|v_input_3|60|Start Delay|
|v_input_4|true|Leverage|
|v_input_5|true|Take Profit %|
|v_input_6|-1|DCA when < %|
|v_input_7|0|Entry Level: 1|2|3|4|5|6|7|8|9|10|
|v_input_8|60|Pivot Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-06 00:00:00
end: 2024-02-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © CryptoRox

//@version=4
//Paste the line below in your alerts to run the built-in commands.
//{{strategy.order.alert_message}}
strategy(title="Fibs limit only", shorttitle="Strategy", overlay=true, precision=8, pyramiding=1000, commission_type=strategy.commission.percent, commission_value=0.04)

//Settings 
testing = input(false, "Live")
//Use epochconverter or something similar to get the current timestamp.
starttime = input(1600976975, "Start Timestamp") * 1000
//Wait XX seconds from that timestamp before the strategy starts looking for an entry.
seconds = input(60, "Start Delay") * 1000
testPeriod = true


leverage = input(1, "Leverage")
tp = input(1.0, "Take Profit %") / leverage
dca = input(-1.0, "DCA when < %") / leverage *-1
fibEntry = input("1", "Entry Level", options=["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])

//Strategy Calls
equity = strategy.equity
avg = strategy.position_avg_price
symbol = syminfo.tickerid
openTrades = strategy.opentrades
closedTrades = strategy.closedtrades
size = strategy.position_size

//Fibs
lentt = input(60, "Pivot Length")
h = highest(lentt)
h1 = dev(h, lentt) ? na : h
hpivot = fixnan(h1)
l = lowest(lentt)
l1 = dev(l, lentt) ? na : l
lpivot = fixnan(l1)
z = 400
p_offset= 2
transp = 60
a=(lowest(z)+highest(z))/2
b=lowest(z)
c=highest(z)

fib0 = (((hpivot - lpivot)) + lpivot)
fib1 = (((hpivot - lpivot)*.21) + lpivot)
fib2 = (((hpivot - lpivot)*.3) + lpivot)
fib3 = (((hpivot - lpivot)*.5) + lpivot)
fib4 = (((hpivot - lpivot)*.62) + lpivot)
fib5 = (((hpivot - lpivot)*.7) + lpivot)
fib6 = (((hpivot - lpivot)* 1.00) + lpivot)
fib7 = (((hpivot - lpivot)* 1.27) + lpivot)
fib8 = (((hpivot - lpivot)* 2) + lpivot)
fib9 = (((hpivot - lpivot)* -.27) + lpivot)
fib10 = (((hpivot - lpivot)* -1) + lpivot)

notna = nz(fib10[60])
entry = 0.0
if fibEntry == "1"
    entry := fib10
if fibEntry == "2"
    entry := fib9
if fibEntry == "3"
    entry := fib0
if fibEntry == "4"
    entry := fib1
if fibEntry == "5"
    entry := fib2
if fibEntry == "6"
    entry := fib3
if fibEntry == "7"
    entry := fib4
if fibEntry == "8"
    entry := fib5
if fibEntry == "9"
    entry := fib6
if fibEntry == "10"
    entry := fib7
profit = avg+avg*(tp/100)
pause = 0
pause := nz(pause[1])
paused = time < pause

fill = 0.0
fill := nz(fill[1])
count = 0.0
count := nz(fill[1])

filled = count > 0 ? entry > fill-fill/100*dca : 0
signal = testPeriod and notna and not paused and not filled ? 1 : 0

neworder = crossover(signal, signal[1])
moveorder = entry != entry[1] and signal and not neworder ? true : false
cancelorder = crossunder(signal, signal[1]) and not paused
filledorder = crossunder(low[1], entry[1]) and signal[1]

last_profit = 0.0
last_profit := nz(last_profit[1])

if neworder and signal
    strategy.order("New", 1, 0.0001, alert_message='New Order|e=binancefuturestestnet s=btcusdt b=long q=0.0011 fp=' + tostring(entry)) 
if moveorder
    strategy.order("Move", 1, 0.0001, alert_message='Move Order|e=binancefuturestestnet s=btcusdt b=long c=order|e=binancefuturestestnet s=btcusdt b=long q=0.0011 fp=' + tostring(entry))
if filledorder and size < 1
    fill := entry
    count := count+1 
    pause := time + 60000
    p = close+close*(tp/100)
    strategy.entry("Filled", 1, 1,  alert_message='Long Filled|e=binancefuturestestnet s=btcusdt b=short c=order|delay=1|e=binancefuturestestnet s=btcusdt b=long c=position q=100% ro=1 fp=' + tostring(p))
if filledorder and size >= 1
    fill := entry
    count := count+1 
    pause := time + 60000
    strategy.entry("Filled", 1, 1,  alert_message='Long Filled|e=binancefuturestestnet s=btcusdt b=short c=order|delay=1|e=binancefuturestestnet s=btcusdt b=long c=position q=100% ro=1 fp=' + tostring(profit))

if cancelorder and not filledorder
    pause := time + 60000
    strategy.order("Cancel", 1, 0.0001,  alert_message='Cancel Order|e=binancefuturestestnet s=btcusdt b=long c=order')

if filledorder
    last_profit := profit

closeit = crossover(high, profit) and size >= 1
if closeit
    strategy.entry("Close ALL", 0, 0, alert_message='Profit')
    count := 0
    fill := 0.0
    last_profit := 0.0
    
//Plots
bottom = signal ? color.green : filled ? color.red : color.white
plot(entry, "Entry", bottom)
```

> Detail

https://www.fmz.com/strategy/441175

> Last Modified

2024-02-06 14:33:06
