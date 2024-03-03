
> Name

短期极限空头策略Extreme-Short-term-Scalping-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12584ecdfa212284b79.png)
 [trans]

## 概述

短期极限空头策略是一种试图通过在价格接近或突破支持线时建立空头头寸,并设置极小止损和止盈水平的高频交易策略。该策略利用价格的短期突破来捕捉市场波动,实现盈利。

## 策略原理

该策略首先计算价格的线性回归线。如果实际收盘价低于预测收盘价则建立多头头寸;如果实际收盘价高于预测收盘价则建立空头头寸。 止损和止盈设置为极小的点数。该策略允许选择只做多、只做空或者全部方向的交易。

关键参数包括:

- 源价格:收盘价
- 线性回归线长度:14
- 偏移量:1
- 交易方向:全部/只买入/只卖出
- 止损和止盈点数:极小的固定点数或最小交易单位的点数

该策略的主要思路是捕捉价格对均线的短期突破。当价格接近或突破支撑或阻力线时,及时建立仓位;并设置极小的止损和止盈,实现盈利后立即平仓,重复该过程。

## 优势分析

该策略具有以下优势:

1. 交易频次高,适合高频交易,可以捕捉更多短期价格波动机会
2. 停损和止盈设置极小,有利于控制单笔损失
3. 可以灵活选择交易方向,适应不同市场环境
4. 计算和实现简单,容易操盘

## 风险分析

该策略也存在一些风险:

1. 夜盘和跳空可能导致亏损扩大
2. 交易成本较高
3. 信号可能出现错误,需要及时关注和优化
4. 需要持续监控市场,不能离场

对应风险应对措施包括:

1. 禁止夜盘交易
2. 优化止损和止盈水平,降低交易成本影响
3. 测试并优化参数,减少错误信号
4. 密切关注市场,不能离场操盘

## 优化方向

该策略可以进一步优化的方向包括:

1. 结合其他指标过滤信号,减少错误交易
2. 动态调整止损和止盈水平
3. 优化参数以减少过拟合风险
4. 考虑交易成本的影响,设置合理的止损和止盈
5. 测试不同品种和时间周期参数的稳定性

## 总结

短期极限空头策略是一种典型的高频交易策略。其通过在关键价格点附近及时建仓,并设置极小止损止盈来捕捉短期价格波动。虽然可以获得较高收益,但也面临一定的风险。通过持续测试和优化,该策略可以进一步增强稳定性和盈利能力。

||

## Overview

The extreme short-term scalping strategy attempts to establish short positions when prices approach or break support lines and sets very small stop loss and take profit levels for high frequency trading. The strategy exploits short-term price breakthroughs to capture market fluctuations for profits.

## Strategy Logic

The strategy first calculates the linear regression line of prices. If the actual closing price is lower than the forecast closing price, long positions are established. If the actual closing price is higher than the forecast closing price, short positions are established. Stop loss and take profit are set to very small number of pips. The strategy allows choosing only long, only short or all direction trading.  

Key parameters include:

- Source price: closing price 
- Length of linear regression line: 14
- Offset: 1
- Trading direction: all/only buy/only sell
- Stop loss and take profit in pips: very small fixed pips or minimum tick pips

The main idea of the strategy is to capture short-term price breakthroughs of moving averages. When prices approach or break through support or resistance lines, timely establish positions. And set very small stop loss and take profit to realise profit then close positions immediately, repeating the process.

## Advantage Analysis 

The strategy has the following advantages:

1. High trading frequency, suitable for high frequency trading, can capture more short-term price fluctuations
2. Very small stop loss and take profit helps control single loss  
3. Can flexibly choose trading direction to adapt to different market environments
4. Easy to implement with simple logic

## Risk Analysis

There are also some risks:

1. Price gaps may lead to expanded losses
2. High transaction costs
3. Signal errors may happen and need timely attention and optimisation  
4. Requires continuous market monitoring 

Corresponding risk management measures include:

1. Disable overnight trading
2. Optimise stop loss and take profit to reduce transaction cost impacts
3. Test and optimise parameters to reduce wrong signals
4. Pay close attention to the market

## Optimisation Directions

Further optimisation directions include:

1. Add other indicators to filter signals and reduce wrong trades
2. Dynamically adjust stop loss and take profit  
3. Optimise parameters to reduce overfitting
4. Consider transaction cost impacts for reasonable stop loss and take profit configuration   
5. Test stability across products and timeframes

## Summary  

The extreme short-term scalping strategy is a typical high frequency trading strategy. By establishing positions around key price levels and setting very small stop loss and take profit, it captures short-term price fluctuations. Although it can achieve high returns, there are also certain risks. With continuous testing and optimisation, the strategy can be further enhanced for stability and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|14|Length|
|v_input_3|true|offset|
|v_input_4|100|gap_tick|
|v_input_5|300|fixedTP|
|v_input_6|100|fixedSL|
|v_input_7|true|useFixedSLTP|
|v_input_8|0|Direction of order: ALL|BUY ONLY|SELL ONLY|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-09 00:00:00
end: 2024-01-16 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Extreme Scalping", overlay=true )
src = input(close,title="Source")
len = input(defval=14, minval=1, title="Length")
offset = input(1)
out = linreg(src, len, offset)
plot(out)

gap_tick=input(100)
fixedTP=input(300)
fixedSL=input(100)
useFixedSLTP=input(true)
direction=input(defval="ALL",title="Direction of order",options=["ALL","BUY ONLY","SELL ONLY"])
gap=gap_tick*syminfo.mintick
plot(out+gap,color=color.red)
plot(out-gap,color=color.green)

tp=useFixedSLTP?fixedTP:gap_tick
sl=useFixedSLTP?fixedSL:gap_tick

longCondition = close<(out-gap) and (direction=="ALL" or direction=="BUY ONLY")
shortCondition = close>(out+gap) and (direction=="ALL" or direction=="SELL ONLY")

if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit("exit long","Long",profit = tp,loss = sl)
    

if (shortCondition)
    strategy.entry("Short", strategy.short)
    strategy.exit("exit short","Short",profit =tp,loss=sl)
    
// === Backtesting Dates === thanks to Trost

// testPeriodSwitch = input(true, "Custom Backtesting Dates")
// testStartYear = input(2019, "Backtest Start Year")
// testStartMonth = input(10, "Backtest Start Month")
// testStartDay = input(3, "Backtest Start Day")
// testStartHour = input(0, "Backtest Start Hour")
// testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,testStartHour,0)
// testStopYear = input(2019, "Backtest Stop Year")
// testStopMonth = input(12, "Backtest Stop Month")
// testStopDay = input(31, "Backtest Stop Day")
// testStopHour = input(23, "Backtest Stop Hour")
// testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,testStopHour,0)
// testPeriod() =>
//     time >= testPeriodStart and time <= testPeriodStop ? true : false
// isPeriod = testPeriodSwitch == true ? testPeriod() : true
// // === /END

// if not isPeriod
//     strategy.cancel_all()
//     strategy.close_all()
        
```

> Detail

https://www.fmz.com/strategy/439053

> Last Modified

2024-01-17 12:06:39
