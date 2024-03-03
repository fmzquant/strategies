
> Name

基于交易量标准差的趋势追踪策略Trading-Strategy-Based-on-Standard-Deviation-of-Trading-Volume

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b5c6a6aef4d8336bc7.png)

[trans]

## 概述

该策略利用交易量的移动平均线和标准差构建交易量模型,结合价格的移动平均线判断趋势方向,在交易量正常的情况下发出交易信号。策略还设置了交易量高低限,可以避免在交易量异常的情况下发出错误信号。

## 策略原理  

核心逻辑是构建交易量模型和价格趋势判断。

1. 构建交易量模型
   - 计算交易量的长度为40周期的移动平均线vavg作为交易量基准
   - 计算交易量的长度为40周期的标准差vsd作为交易量正常波动范围
   - 计算交易量的长度为5周期的移动平均线vavgn作为最新交易量水平
   - 设置交易量低限lowlimit为vavg减去1倍vsd
   - 设置交易量高限uplimit为vavg加上2倍vsd
2. 判断价格趋势   
   - 计算价格的长度为20周期的移动平均线mavg作为价格趋势指标
3. 发出交易信号
   - 当mavg上穿其前一日时,在vavgn高于lowlimit的情况下做多
   - 当mavg下穿其前一日时,在vavgn高于lowlimit的情况下做空
   - mavg趋势一旦反转则平仓

该策略结合交易量模型和价格趋势,避免在交易量不正常的情况下追踪价格趋势,可以过滤掉一些假信号。

## 策略优势分析

1. 结合交易量变化判断价格趋势,可以过滤掉一些假信号,使信号更加可靠
2. 利用交易量标准差构建交易量模型,避免交易量极端变化的影响
3. 移动平均线参数可调整,可以适应不同周期的价格变化

## 策略风险分析  

1. 短期内交易量和价格可能出现背离,导致错过价格趋势
2. 交易量参数设置不当可能导致模型失效
3. 策略本身没有止损设置,可能带来较大亏损

风险解决方法:
1. 适当调整移动平均线参数,优化模型
2. 加入止损逻辑,控制单笔亏损

## 策略优化方向  

1. 加入更多指标判断价格趋势,使信号更加准确可靠
2. 增加机器学习模块,根据数据训练交易量和价格模型的参数
3. 增加止损逻辑,防止单笔亏损过大
4. 优化入场逻辑,确保更高概率捕捉趋势
5. 结合类似ATR指标自动调整止损距离

## 总结  

该策略整体思路清晰,利用交易量避免追踪假趋势,入场信号比较可靠。但策略本身较简单,可扩展空间很大,通过加入更多指标、机器学习、止损等模块进行优化,可以进一步提高稳定性和捕捉趋势的能力。该策略为一种典型的趋势追踪策略,优化后可以成为一个非常实用的量化策略。

|| 

## Overview

This strategy builds a trading volume model using moving average and standard deviation of trading volume, and determines the trend direction with the moving average of price to generate trading signals when volume is normal. It also sets upper and lower limits for trading volume to avoid wrong signals when volume is abnormal.  

## Strategy Logic

The core logic is to build trading volume model and judge price trend.

1. Build trading volume model
   - Calculate the 40-period moving average of volume vavg as the baseline
   - Calculate the 40-period standard deviation of volume vsd as the normal fluctuation range  
   - Calculate the 5-period moving average of volume vavgn as the latest volume level
   - Set lower limit of volume lowlimit as vavg minus 1 times vsd
   - Set upper limit of volume uplimit as vavg plus 2 times vsd
2. Judge price trend
   - Calculate the 20-period moving average of close price mavg as the indicator of price trend
3. Generate trading signals
   - When mavg crosses above its previous day and vavgn is above lowlimit, go long
   - When mavg crosses below its previous day and vavgn is above lowlimit, go short
   - Close position when mavg trend reverses  

The strategy combines trading volume model and price trend to avoid chasing price trends when volume is abnormal, which can filter out some false signals.

## Advantage Analysis  

1. Combining volume changes to judge price trend can filter out some false signals and make the trading signals more reliable
2. Building trading volume model using standard deviation avoids extreme volume impact
3. Adjustable parameters of moving average can adapt to price changes in different cycles  

## Risk Analysis   

1. Volume and price may diverge in short term, leading to missing price trends
2. Improper parameter settings of volume may cause model failure  
3. No stop loss in the strategy may lead to large losses

Solutions:
1. Adjust moving average parameters properly to optimize the model
2. Add stop loss logic to control single loss

## Optimization Directions

1. Add more indicators to judge price trend to make signals more reliable 
2. Increase machine learning module to train parameters of volume and price models based on data
3. Add stop loss logic to prevent excessive single loss
4. Optimize entry logic to ensure higher probability of catching trends
5. Combine indicators like ATR to automatically adjust stop loss distance

## Summary  

The overall logic of this strategy is clear, using volume to avoid chasing false trends and the entry signals are relatively reliable. But the strategy itself is simple with large room for expansion. By adding more indicators, machine learning, stop loss and other modules, it can further improve the stability and ability to catch trends. This is a typical trend chasing strategy. After optimization, it can become a very practical quantitative strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|options|
|v_input_2|40|length|
|v_input_3|5|nlow|
|v_input_4|true|factor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-14 00:00:00
end: 2023-11-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © dongyun

//@version=4
strategy("交易量底部标准差系统", overlay=true)

options = input(1,'')
length = input(40,'')
nlow = input(5,'')
factor = input(1.0,'')

vavg = 0.0
vavgn = 0.0
vsd = 0.0
lowlimit = 0.0
uplimit = 0.0
mavg = 0.0
aror = 0.0
adjvol = 0.0
savevol = 0.0


//Find average volume, replacing bad values
adjvol := volume

if (volume != 0)
	savevol := volume
else
	savevol := savevol[1]
	adjvol := savevol


// Replace high volume days because they distort standard deviation
if (adjvol > 2 * factor * nz(vsd[1]))
	adjvol := savevol
else
	adjvol := adjvol[1]

vavg := sma(adjvol,length)
vsd := stdev(adjvol,length)
vavgn := sma(adjvol,nlow)

// Extreme volume limits
lowlimit := vavg - factor * vsd
uplimit := vavg + 2 * factor * vsd

// System rules based on moving average trend
mavg := sma(close,length/2)

// Only enter on new trend signals
if (options == 2)
	if (mavg > mavg[1] and mavg[1] <= mavg[2])
		strategy.entry("Long", strategy.long)
	if (mavg<mavg[1] and mavg[1]>=mavg[2])
		strategy.entry("Short", strategy.short)
else
	if (mavg > mavg[1] and vavgn > lowlimit)
		strategy.entry("Long", strategy.long)
	if (mavg < mavg[1] and vavgn > lowlimit)
		strategy.entry("Short", strategy.short)

// Exit on low volume
if (options != 1)
	if (mavg<mavg[1] or (strategy.position_size > 0 and vavgn<= lowlimit))
		strategy.close("Long")
	if (mavg>mavg[1] or (strategy.position_size > 0 and vavgn<= lowlimit))
		strategy.close("Short")
else
	if (mavg < mavg[1])
		strategy.close("Long")
	if (mavg > mavg[1])
		strategy.close("Short")
```

> Detail

https://www.fmz.com/strategy/432756

> Last Modified

2023-11-21 11:11:51
