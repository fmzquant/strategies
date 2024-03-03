
> Name

连续高点突破策略N-Consecutive-Higher-Closes-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1588c4e5d3b5775d3a4.png)

[trans]

## 概述

本策略的核心逻辑是检测连续N根K线收盘价是否连续上涨,如果是,则进行做多;如果不满足,则平仓。这样可以捕捉到股价上涨的趋势,实现盈利。

## 策略原理

该策略的核心指标是nCounter,它通过比较当前K线的收盘价和开盘价来判断价格是否上涨。

具体来说,如果close[1]>=open[1],则nCounter加1,表示上涨;如果close[1]<open[1],则nCounter重置为0。这样就可以统计出连续上涨的K线个数。

然后将nCounter与参数nLength进行比较,当nCounter>=nLength时,输出信号C1=1;否则C1=0。这里的nLength就是我们定义的需要多少根连续上涨K线才产生信号。

收到C1=1的信号后,如果当前没有持仓,则执行做多;如果已有多头持仓,则继续持有。

此外,该策略还设置了止损和止盈条件。如果价格低于入场价一定比例,则止损平仓;如果高于入场价一定比例,则止盈。

## 优势分析

这是一个比较典型的趋势跟踪策略,它具有以下几点优势:

1. 可以抓住股价上涨趋势的机会,适合作为多头策略运用
2. N根连续上涨作为入场信号,可以有效过滤假突破,减少不必要的交易
3. 设定了止损和止盈条件,可以限制下跌风险,并锁定盈利
4. 策略逻辑简单清晰,容易理解和修改
5. 可通过调整参数nLength来控制交易频率

## 风险分析

该策略也存在一些风险,主要集中在以下几个方面:

1. 如果上涨趋势反转,无法及时止损,可能带来较大的亏损
2. nLength参数设置过大,可能错过较好的入场机会
3. 没有考虑大盘环境,在大盘下跌时持有多头仓位易受损
4. 没有根据不同股票的特征调整参数,使用统一参数对部分股票可能不适用

为降低这些风险,我们可以设置更严格的止损条件,优化nLength参数,加入大盘判断规则,或针对不同股票分别测试参数。当然,任何策略都难以完全避免损失,需要与交易者的风险偏好相匹配。

## 优化方向 

考虑到上述风险,我们可以从以下几个方面继续优化该策略:

1. 加入移动止损或跟踪止损功能。这可以根据价格变化及时调整止损位置,降低亏损风险
2. 优化nLength参数。可以对不同类型的股票分别测试,找出对各类股票更合适的参数值
3. 增加大盘环境判断。如在大盘下跌时暂停交易,避免逆市操作带来的额外损失
4. 增加成交量等其他因素作为辅助条件。如要求上涨过程中成交量放大,从而确保突破的有效性
5. 设置回撤控制。如最大允许亏损比例、最大连续亏损次数等,可以自动止损控制总体损失

## 总结

本策略通过检测N根连续上涨K线实现对上涨趋势的捕捉,可以有效进行趋势跟踪。优点是逻辑简单,参数调整灵活,可以filtering假突破。但也存在一定的风险,需要加入止损、参数优化、环境判断等模块进行改进,使策略更全面和稳定。总的来说,本策略为量化交易提供了一个有价值的基础模型,通过不断完善可以成为一个强大的交易工具。

||


## Overview

The core logic of this strategy is to detect whether the closing price of N consecutive candles keeps rising. If so, go long; otherwise, close position. This can capture the uptrend of stock price and make profit.

## Strategy Principle  

The core indicator of this strategy is nCounter. It compares the closing price and opening price of current candle to judge whether the price rises.   

Specifically, if close[1]>=open[1], nCounter adds 1, indicating rise; if close[1]<open[1], nCounter resets to 0. Thus it can count the number of consecutive rising candles.

Then compare nCounter with parameter nLength. When nCounter>=nLength, output signal C1=1; otherwise C1=0. Here nLength is the number of consecutive rising candles we defined to generate signal.  

After receiving C1=1 signal, if there is no current position, go long; if already in long position, keep holding.

In addition, this strategy sets stop loss and take profit conditions. If price falls below entry price by certain percentage, stop loss exits position; if rises above entry price by certain percentage, take profit.

## Advantage Analysis

This is a typical trend following strategy with below strengths:

1. It can seize the uptrend opportunities of stock price, suitable as long strategy
2. N consecutive rises as entry signal can effectively filter false breakout and reduce unnecessary trades  
3. Setting stop loss and take profit can limit downside risk and lock in profits
4. The logic is simple and clear, easy to understand and modify
5. Trading frequency can be controlled by adjusting nLength parameter

## Risk Analysis  

There are some risks of this strategy, mainly in below aspects:  

1. If uptrend reverses, failure to stop loss in time may lead to huge loss
2. If nLength set too large, good entry opportunities may be missed
3. It does not consider market environment. Holding long position when market crashes can lead to extra loss
4. Using unified parameters without adjusting based on different stock characteristics may not apply to some stocks  

To reduce these risks, we can set more strict stop loss, optimize nLength, add market condition rules, or test parameters separately for different stocks. Of course no strategy can completely avoid losses. It needs to match risk appetite of traders.

## Optimization Directions

Considering above risks, we can optimize the strategy from below aspects:  

1. Add moving stop loss or trailing stop loss functions. They can adjust stop loss point accordingly based on price change to reduce loss risk
2. Optimize nLength parameter. Respectively test for different types of stocks to find out more suitable parameter values  
3. Add market environment judgement. For example pause trading when market crashes to avoid extra losses in bear market
4. Add other factors like volume as auxiliary conditions. For example require enlarged volume during uptrend to ensure breakout validity
5. Set drawdown control like max allowed loss percentage, max consecutive loss times etc. to stop loss automatically controlling overall loss

## Conclusion  

This strategy captures uptrend by detecting N consecutive rising candles. It can effectively conduct trend following. The advantages are simple logic, flexible parameter tuning, filtering false breakout. But there are also some risks. It needs to add modules like stop loss, parameter optimization, environment judgement to improve. Overall speaking, this strategy provides a valuable basic model for quantitative trading. It can become a powerful trading tool after continuous improvement.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|nLength|
|v_input_2|20|Take Profit pip|
|v_input_3|10|Stop Loss pip|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-12-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 05/02/2020
// Evaluates for n number of consecutive higher closes. Returns a value 
// of 1 when the condition is true or 0 when false.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="N Bars Up", shorttitle="NBU Backtest", overlay = false) 
nLength = input(4, minval=1)
input_takeprofit = input(20, title="Take Profit pip", step=0.01)
input_stoploss = input(10, title="Stop Loss pip", step=0.01)
nCounter = 0
nCounter := iff(close[1] >= open[1], nz(nCounter[1],0)+1,
             iff(close[1] < open[1], 0, nCounter))
C1 = iff(nCounter >= nLength, 1, 0)
posprice = 0.0
pos = 0
barcolor(nz(pos[1], 0) == -1 ? color.red: nz(pos[1], 0) == 1 ? color.green : color.blue ) 
posprice := iff(C1== 1, close, nz(posprice[1], 0)) 
pos := iff(posprice > 0, 1, 0)
if (pos == 0) 
    strategy.close_all()
if (pos == 1)
    strategy.entry("Long", strategy.long)
posprice := iff(low <= posprice - input_stoploss and posprice > 0, 0 ,  nz(posprice, 0))
posprice := iff(high >= posprice + input_takeprofit and posprice > 0, 0 ,  nz(posprice, 0))
plot(C1, title='NBU', color=color.green)
```

> Detail

https://www.fmz.com/strategy/434674

> Last Modified

2023-12-08 10:50:54
