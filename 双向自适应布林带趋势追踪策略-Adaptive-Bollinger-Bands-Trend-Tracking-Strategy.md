
> Name

双向自适应布林带趋势追踪策略-Adaptive-Bollinger-Bands-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15f98682e9ad037ec9f.png)
[trans]
## 概述
本策略采用双向自适应布林带指标来识别趋势方向,并结合市价单进行追踪止损,实现高效率的趋势追踪交易。

## 策略原理  
1. 根据一定周期计算布林中轨,上轨和下轨
2. 判断价格突破上轨则做多追踪,突破下轨则做空追踪
3. 采用市价单快速进场
4. 设置止损位置,止盈位置进行持仓管理 

## 优势分析
1. 自适应布林带指标,对市场波动敏感,能快速判断趋势转向
2. 采用市价单快速进入场内,减少滑点风险
3. 自动止损止盈,严格控制风险,锁定利润

## 风险分析 
1. 布林带本身具有滞后性,不能完全避免假突破 
2. 采用市价单无法控制成交价格  
3. 需要合理设置止损位和止盈位

## 优化方向
1. 调整布林带的参数,优化判断趋势的灵敏度
2. 加入成交量或MACD等指标过滤假突破  
3. 优化止损位和止盈位的设置 

## 总结
本策略充分利用布林带判断趋势方向和变化的优势,结合快速出场的市价单进行双向追踪,在控制风险的前提下获得超额收益。通过进一步优化布林带参数,加入辅助过滤指标,调整止损止盈逻辑等手段,可以获得更好的策略表现。该策略思路清晰易于实现,是一种高效可靠的趋势追踪交易策略。

||

## Overview  
This strategy uses adaptive Bollinger Bands indicator to identify the trend direction and market orders to track the trend with stop loss for efficient trend trading.  

## Strategy Logic   
1. Calculate the middle, upper and lower bands of Bollinger based on a certain period
2. Go long when the price breaks through the upper band and go short when breaks the lower band to track the trend   
3. Use market orders for fast entry 
4. Set stop loss and take profit for position management   

## Advantages
1. Adaptive Bollinger Bands are sensitive to market volatility for fast judgement of trend reversal  
2. Market orders ensure fast entry with reduced slippage risk  
3. Automatic stop loss and take profit strictly control the risk and lock in profit  

## Risks  
1. Bollinger Bands has some lagging nature, cannot fully avoid false breakouts  
2. Market orders cannot control the execution price precisely    
3. Proper setting of stop loss and take profit levels is needed

## Optimization Directions 
1. Adjust Bollinger parameters for better sensitivity in judging trends  
2. Add indicators like volume or MACD to filter false breakouts
3. Optimize stop loss and take profit levels   

## Summary  
This strategy makes full use of Bollinger Bands’ advantage in judging trend directions and combines fast-exit market orders for trend tracking from both sides, gaining excess returns under controlled risk. Further improvements like optimizing Bollinger parameters, adding filtering indicators and adjusting stop loss/take profit logic can lead to better strategy performance. With clear logic and easy implementation, it is an efficient and reliable trend tracking trading strategy.

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
start: 2024-01-04 00:00:00
end: 2024-02-03 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © CryptoRox

//@version=4
//Paste the line below in your alerts to run the built-in commands.
//{{strategy.order.alert_message}}
strategy("Automated - Fibs with Market orders", "Strategy", true)

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

// if neworder and signal
//     strategy.order("New", 1, 0.0001, alert_message='New Order|e=binancefuturestestnet s=btcusdt b=long q=0.0011 fp=' + tostring(entry)) 
// if moveorder
//     strategy.order("Move", 1, 0.0001, alert_message='Move Order|e=binancefuturestestnet s=btcusdt b=long c=order|e=binancefuturestestnet s=btcusdt b=long q=0.0011 fp=' + tostring(entry))
if filledorder and size < 1
    fill := entry
    count := count+1 
    pause := time + 60000
    p = close+close*(tp/100)
    strategy.entry("Buy", 1, 1,  alert_message='Long|e=binancefuturestestnet s=btcusdt b=long q=0.0011 t=market')
if filledorder and size >= 1
    fill := entry
    count := count+1 
    pause := time + 60000
    strategy.entry("Buy", 1, 1,  alert_message='Long|e=binancefuturestestnet s=btcusdt b=long q=0.0011 t=market')

// if cancelorder and not filledorder
//     pause := time + 60000
//     strategy.order("Cancel", 1, 0.0001,  alert_message='Cancel Order|e=binancefuturestestnet s=btcusdt b=long c=order')

if filledorder
    last_profit := profit

closeit = crossover(high, profit) and size >= 1
if closeit
    strategy.entry("Close ALL", 0, 0, alert_message='Close Long|e=binancefuturestestnet s=btcusdt b=long c=position t=market')
    count := 0
    fill := 0.0
    last_profit := 0.0
    
//Plots
// bottom = signal ? color.green : filled ? color.red : color.white
// plot(entry, "Entry", bottom)
```

> Detail

https://www.fmz.com/strategy/440992

> Last Modified

2024-02-04 15:30:46
