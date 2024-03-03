
> Name

均线突破策略Moving-Average-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]
## 概述

均线突破策略是一种利用移动平均线进行判断的短线交易策略。该策略通过设置均线长度,并在均线突破时进行买卖操作。其特点是操作简单,容易掌握。

## 策略原理

该策略主要通过设置两个移动平均线,快线和慢线,来判断价格走势。快线周期短,反应敏感;慢线周期长,反应平稳。

代码中通过设置input参数定义了快线周期shortPeriod和慢线周期longPeriod。然后计算两个均线的值shortSMA和longSMA。

当短周期均线由下向上突破长周期均线时,表明价格走势由跌转涨,做多;当短周期均线由上向下跌破长周期均线时,表明价格走势由涨转跌,做空。

进入做多仓位条件:

```
快线由下向上突破慢线
快线>慢线
```

进入做空仓位条件:

```
快线由上向下跌破慢线  
快线<慢线
```

此外,策略还设置了止损、止盈、金额等参数来控制风险。

## 策略优势

- 操作简单,容易掌握,适合新手
- 均线具有一定的趋势过滤能力,可过滤掉部分噪音
- 可灵活调整均线周期,适应不同周期操作
- 可预先设置止损止盈点,控制风险

## 策略风险

- 容易出现虚假突破,从而产生错误信号
- 不适合大幅震荡市场,应选择趋势明显时使用
- 均线系统滞后,入场时机不准
- 无法有效过滤强势趋势的反转

风险防范:

- 组合其他指标进行过滤,避免虚假信号
- 选择趋势明显时使用,不要在震荡市场使用
- 适当调整均线参数,优化入场时机
- 适当放宽止损范围,避免被套

## 策略优化方向 

- 优化均线系统参数,找到最佳周期组合
- 增加其他指标判断,如BOLL通道,KD等
- 优化仓位管理策略,让盈利最大化
- 测试不同品种合约的参数健壮性
- 增加机器学习算法,利用大数据优化

## 总结

均线突破策略概念简单,通过快慢均线判断做多做空时机,操作容易上手。但也存在一些问题,如虚假突破、滞后等。通过参数优化、组合其他指标等方法可以改进。总体来说,该策略适合作为新手入门的第一阶段策略,在掌握了基本原理后,可以进一步优化,提高盈利能力。

||

## Overview

The moving average breakout strategy is a short-term trading strategy that utilizes moving averages to determine entries and exits. It is characterized by its simplicity and ease of use. 

## Strategy Logic

The core logic relies on two moving averages, a fast line and a slow line, to gauge the trend of prices. The fast line has a shorter period and is more sensitive. The slow line has a longer period and is more stable. 

The code allows users to set the fast line period shortPeriod and the slow line period longPeriod via input parameters. The values of the two moving averages are calculated as shortSMA and longSMA.

When the fast moving average crosses above the slow moving average, it signals an upside breakout and long entry. When the fast MA crosses below the slow MA, it signals a downside breakout and short entry.

Long entry condition:

```
Fast MA crosses above slow MA
Fast MA > Slow MA
```

Short entry condition: 

```
Fast MA crosses below slow MA
Fast MA < Slow MA 
```

The strategy also incorporates stop loss, take profit and position sizing settings to control risks.

## Advantages

- Simple to use, easy for beginners to grasp
- Moving averages filter out some noise
- Flexibility in fine tuning MA periods for different timeframes
- Predefined stop loss and take profit

## Risks

- Susceptible to false breakouts and whipsaws
- Not ideal for range-bound choppy markets
- Lagging indication, entries could be late
- Unable to filter trend reversals effectively 

Risk Management:

- Add filters to avoid false signals
- Apply strategy when trend is obvious
- Optimize MA parameters for better entries
- Allow wider stops to avoid premature stops

## Enhancement Opportunities

- Optimize MA parameters to find best combinations
- Add additional indicators like BOLL channels or KD 
- Improve exit rules to maximize profits
- Test robustness across different instruments
- Incorporate machine learning using big data

## Conclusion

The moving average breakout strategy is easy to understand, generating signals with fast and slow MAs. But it also has some flaws like false breaks and lagging issues. With parameter tuning, additional filters and other enhancements, the strategy can be improved. Overall it serves as a beginner-friendly first step into algorithmic trading, and paves the way for more advanced strategies after grasping the core concepts.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|3|(?Candle)Validation Period|
|v_input_float_1|true|(?Order)Qty|
|v_input_float_2|true|Maximum Active Open Position|
|v_input_float_3|true|(?Long)Take Profit (%)|
|v_input_float_4|25|Stop Loss (%)|
|v_input_float_5|0.2|Trailing Stop (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-26 00:00:00
end: 2023-09-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © YohanNaftali

//@version=5

///////////////////////////////////////////////////////////////////////////////
// Heikin Ashi Candle Startegy
// ver 2021.12.29
// © YohanNaftali
// This script composed by Yohan Naftali for educational purpose only 
// Reader who will use this signal must do own research
///////////////////////////////////////////////////////////////////////////////
strategy(
     title = 'Heikin Ashi Candle Startegy Long',  
     shorttitle = 'HA Strategy Long',  
     format = format.price,
     precision = 0,
     overlay = true)

// Input
validationPeriod = input.int( 
     defval = 3, 
     title = 'Validation Period', 
     group = 'Candle')

qtyOrder = input.float(
     defval = 1.0,
     title = 'Qty', 
     group = 'Order')

maxActive = input.float(
     defval = 1.0,
     title = 'Maximum Active Open Position', 
     group = 'Order')

// Long Strategy
tpLong = input.float(
     defval = 1,
     title = "Take Profit (%)",
     minval = 0.0, 
     step = 0.1, 
     group = "Long") * 0.01

slLong = input.float(
     defval = 25,
     title = "Stop Loss (%)", 
     minval=0.0, 
     step=0.1,
     group="Long") * 0.01

trailingStopLong = input.float(
     defval = 0.2,
     title = "Trailing Stop (%)",
     minval = 0.0, 
     step = 0.1,
     group = 'Long') * 0.01

// Calculation
haTicker = ticker.heikinashi(syminfo.tickerid)
haClose = request.security(haTicker, timeframe.period, close)
haOpen = request.security(haTicker, timeframe.period, open)

// Long
limitLong = tpLong > 0.0 ? strategy.position_avg_price * (1 + tpLong) : na
stopLong = slLong > 0.0 ? strategy.position_avg_price * (1 - slLong) : na
float trailLong = 0.0
trailLong := if strategy.position_size > 0
    trailClose = close * (1 - trailLong)
    math.max(trailClose, trailLong[1])
else
    0

isGreen = true
for i = 0 to validationPeriod-1
    isGreen := isGreen and haClose[i] > haOpen[i]        
isLong = isGreen and haClose[validationPeriod] < haOpen[validationPeriod]



plot(
     limitLong,
     title = 'Limit', 
     color = color.rgb(0, 0, 255, 0), 
     style = plot.style_stepline,
     linewidth = 1)

plot(
     trailLong,
     title = 'Trailing', 
     color = color.rgb(255, 255, 0, 0), 
     style = plot.style_stepline,
     linewidth = 1)

plot(
     stopLong,
     title = 'Stop', 
     style = plot.style_stepline,
     color = color.rgb(255, 0, 0, 0), 
     linewidth = 1)

// plotshape(
//      isLong, 
//      title = 'Entry', 
//      style = shape.arrowup, 
//      location = location.belowbar, 
//      offset = 1, 
//      color = color.new(color.green, 0), 
//      text = 'Long Entry',
//      size = size.small)

// Strategy
strategy.risk.max_position_size(maxActive)
strategy.risk.allow_entry_in(strategy.direction.long)

strategy.entry(
     id = "Long", 
     direction = strategy.long, 
     qty = qtyOrder,  
     when = isLong,       
     alert_message = "LN")
if (strategy.position_size > 0)
    strategy.exit(
         id = "Long Exit",
         from_entry = "Long",
         limit = limitLong,
         stop = stopLong,
         trail_price = trailLong,
         alert_message = "LX")      
```

> Detail

https://www.fmz.com/strategy/427894

> Last Modified

2023-09-26 16:18:37
