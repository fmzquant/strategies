
> Name

基于市场促进指数的交易策略Trading-Strategy-Based-on-Market-Facilitation-Index

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略运用市场促进指数(MFI)来判断市场的趋势化程度,以及是否可能出现趋势反转。它通过计算价格范围与交易量的关系,来评估价格运动的效率,从而产生交易信号。

## 策略原理

1. 计算市场促进指数,公式为:(最高价-最低价)/成交量*10000

2. 设置买入和卖出阈值,如MFI大于1时产生买入信号,小于0.8时产生卖出信号

3. 当MFI上穿买入阈值时做多,下穿卖出阈值时做空

4. 根据信号对K线设置不同颜色,直观显示市场状况

5. 可选择反转交易信号的方向

## 优势分析

1. 评估市场趋势化和价格运动效率的能力强

2. 参数设置简单,阈值容易确定

3. 交易信号明确,易于判断和执行

4. 直观的K线着色 visually 展示市场状况

5. 可根据需要选择做多或做空

## 风险分析

1. 无法判断趋势的力度,存在获利不足的风险

2. 无法区分正常波动和趋势反转

3. 容易被突发事件影响,产生错误信号

4. 存在一定的滞后,可能错过最佳入场点

5. 无法建立止损机制,无法控制单笔损失

## 优化方向

1. 测试不同的参数阈值设定

2. 增加量价相关指标进行确认

3. 结合移动均线等指标判断趋势方向

4. 建立止损策略,控制风险

5. 设定仓位管理规则,根据市场调整仓位

6. 测试在不同品种和周期的实盘效果

## 总结

该策略通过MFI指标判断市场趋势化程度,给出简单的交易信号。需要进一步优化参数设定、建立止损机制等来严格控制风险。但整体思路清晰可行,可作为趋势跟踪策略的组成部分,具有实用价值。

|| 
## Overview

This strategy uses the Market Facilitation Index (MFI) to judge the market's trending condition and possibility of trend reversal. It generates trading signals by calculating the relationship between price range and volume to evaluate the efficiency of price movement.

## Strategy Logic 

1. Calculate MFI, formula: (Highest - Lowest) / Volume * 10000

2. Set buy and sell thresholds, such as buy when MFI > 1 and sell when MFI < 0.8

3. Go long when MFI crosses above buy threshold, go short when crossing below sell threshold  

4. Color code bars based on signals for visual representation 

5. Option to reverse signal directions

## Advantage Analysis

1. Strong ability to evaluate market trending and price movement efficiency

2. Simple parameter setup, easy to determine thresholds

3. Clear trading signals, easy to interpret and execute

4. Visual bar colors intuitively display market conditions 

5. Flexibility to go long or short as needed

## Risk Analysis

1. Unable to determine trend strength, risks insufficient profit

2. Cannot differentiate normal fluctuations or real reversals

3. Prone to false signals from sudden events 

4. Has some lag, may miss best entry points

5. No stop loss mechanism, unable to control single loss

## Optimization Directions

1. Test different parameter threshold values

2. Add volume-price indicators for confirmation 

3. Incorporate moving averages to determine trend direction

4. Establish stop loss strategies for risk control

5. Define position sizing rules to adjust with markets

6. Test performance in live markets across different instruments and timeframes

## Summary

This strategy uses MFI to judge market trending conditions and provide simple trade signals. Further improvements in parameter optimization, stop losses etc. are needed for strict risk control. But the logic is clear and feasible to serve as part of a trend following strategy, thus having practical value.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6.2|SellZone|
|v_input_2|true|BuyZone|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 12/09/2018
// The Market Facilitation Index is an indicator that relates price range to 
// volume and measures the efficency of price movement. Use the indicator to 
// determine if the market is trending. If the Market Facilitation Index increased, 
// then the market is facilitating trade and is more efficient, implying that the 
// market is trending. If the Market Facilitation Index decreased, then the market 
// is becoming less efficient, which may indicate a trading range is developing that 
// may be a trend reversal.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Market Facilitation Index (MFI) Backtest", shorttitle="MFI")
SellZone = input(6.2, minval=0.01, step = 0.01)
BuyZone = input(1, minval=0.01, step = 0.01)
reverse = input(false, title="Trade reverse")
hline(BuyZone, color=green, linestyle=line)
hline(SellZone, color=red, linestyle=line)
xmyVol = volume
xmyhigh = high
xmylow = low
nRes = (xmyhigh - xmylow) / xmyVol * 10000
pos = iff(nRes > BuyZone, 1,
       iff(nRes < SellZone, -1, nz(pos[1], 0)))
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )        
plot(nRes, color=green, title="MFI", style = histogram)
```

> Detail

https://www.fmz.com/strategy/427262

> Last Modified

2023-09-19 15:56:29
