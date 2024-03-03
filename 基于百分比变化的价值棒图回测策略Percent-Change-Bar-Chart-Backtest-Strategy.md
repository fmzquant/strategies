
> Name

基于百分比变化的价值棒图回测策略Percent-Change-Bar-Chart-Backtest-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/181606f2fbac08b1af9.png)
[trans]


## 概述

该策略通过计算当前K线收盘价相对于N根K线前的收盘价的变化百分比,并显示不同颜色的柱状图来实现对趋势的判断。策略结合趋势线来实现对买入卖出的判断。

## 策略原理

1. 通过input设置策略参数,包括柱状图宽度、显示价格变化还是百分比变化、回看根数、买入卖出阈值等。

2. 计算当前K线收盘价与N根前K线收闭价的差价或差价百分比。

3. 设置买入卖出阈值曲线。

4. 根据差价百分比显示不同颜色的柱状图。

5. 当差价百分比大于买入阈值时设置为多单,当小于卖出阈值时设置为空单。

6. 根据持仓方向设置柱状图颜色。

7. 根据持仓方向实现入场和出场。

## 策略优势

1. 直观显示价格变化趋势,利于形成交易判断。

2. 结合趋势判断指标,可以比较清晰地判断入场和出场点位。

3. 可以通过调整参数进行对不同品种和时间周期的优化。

4. 操作逻辑简单清晰,容易理解和修改。

5. 可视化效果好,可以快速判断趋势方向。

## 策略风险

1. 容易产生错误信号,入场点选择不当可能造成损失。

2. 针对高波动品种需要调整参数,否则会增加亏损概率。

3. 未考虑突发事件的影响,如重大利空消息。

4. 回测周期短,可能无法确定参数健壮性。

5. 未考虑截止时间,可能错过反转机会。

可以通过优化参数、结合其他指标过滤信号、设置止损、扩大回测周期等方法来控制风险。

## 策略优化方向 

1. 可以考虑结合其他指标来确认交易信号,例如趋势指标、波动率指标等。

2. 可以引入机器学习算法来优化参数设置。

3. 可以设置动态止损来控制单笔损失。

4. 可以结合情绪指标、消息面等来避免被突发事件冲击。

5. 可以加入交易时间或特定时段的过滤规则。

6. 可以优化回测周期,选取更长的时间段进行验证。

## 总结

本策略通过计算价格变化百分比并用柱状图实时显示,辅以趋势线进行判断,形成较为清晰的交易信号。策略思路简单,容易操作。但也存在一定的风险,需要通过参数优化、指标过滤、止损等手段进行控制。若能持续优化,会成为一个易于掌握且实用的趋势跟踪策略。

||


## Overview 

This strategy calculates the percentage change of the current bar's closing price relative to the closing price N bars ago, and displays different colored histogram bars to determine the trend. It uses trend lines to determine entries and exits.

## Strategy Logic

1. Set strategy parameters via input, including bar width, display price change or percentage change, lookback period, buy/sell thresholds etc.

2. Calculate the price difference or percentage difference between the current bar's closing price and the closing price N bars ago.  

3. Set buy and sell threshold lines.

4. Display histogram bars in different colors based on percentage change.

5. Set to long when percentage change is greater than buy threshold, and set to short when lower than sell threshold.

6. Color histogram bars according to position direction. 

7. Enter and exit based on position direction.

## Advantages

1. Intuitive display of price change trends for decision making.

2. Clear entry and exit signals in combination with trend indicators. 

3. Parameters can be optimized for different products and timeframes.

4. Simple and clear logic, easy to understand and modify.

5. Good visualization for quick trend judgment.

## Risks

1. Prone to false signals, improper entry selection may lead to losses.

2. Parameters need adjustment for high volatility products, otherwise increasing loss probability.

3. Unaccounted for sudden events like significant bearish news. 

4. Short backtest period may be unable to determine robustness of parameters.

5. Missing reversal opportunities without stop time.

Risks can be controlled via parameter optimization, signal filtering with other indicators, stop loss, expanding backtest period etc.

## Optimization Directions

1. Consider combining with other indicators like trend and volatility indicators to confirm signals.

2. Introduce machine learning algorithms to optimize parameter settings.

3. Set dynamic stop loss to control single loss amount. 

4. Incorporate sentiment indicators and news to avoid sudden event impacts.

5. Add trading time or session filters. 

6. Optimize backtest period with longer timeframe.

## Summary 

This strategy displays price change percentage in real-time with histogram bars and uses trendlines for decision making, forming clear trading signals. The logic is simple for easy operation. But risks exist and need to be controlled via optimization, filtering, stop loss etc. With continuous optimizations, it can become an easy to grasp and practical trend following strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|Bar Width|
|v_input_2|false|Price Change|
|v_input_3|true|Look Back|
|v_input_4|-0.33|SellZone|
|v_input_5|0.33|BuyZone|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-08 00:00:00
end: 2023-11-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v3.0 27/07/2018
//
//  This histogram displays price or % change from previous bar. 
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Percent change bar chart Backtest", precision = 2)
input_barwidth = input(4, title="Bar Width")
input_percentorprice = input(false, title="Price Change")
input_barsback = input(1, title="Look Back")
SellZone = input(-0.33, minval=0.01, step = 0.01)
BuyZone = input(0.33, minval=0.01, step = 0.01)
reverse = input(false, title="Trade reverse")
hline(0, color=blue, linestyle=line)
hline(BuyZone, color=green, linestyle=line)
hline(SellZone, color=red, linestyle=line)
xPrice = close
xPrice1 = iff(input_percentorprice, xPrice - xPrice[input_barsback], ((xPrice - xPrice[input_barsback]) * 100)/ xPrice[input_barsback])
colorg = iff(xPrice1 < 0, red, green)
pos = iff(xPrice1 > BuyZone, 1,
       iff(xPrice1 < SellZone, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(xPrice1, color=colorg, style = histogram, linewidth = input_barwidth, title="Change")
```

> Detail

https://www.fmz.com/strategy/432210

> Last Modified

2023-11-15 15:41:20
