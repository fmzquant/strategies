
> Name

基于双向突破自适应交易策略Adaptive-Dual-Breakthrough-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15088404c02ce293aa0.png)
[trans]
## 概述

双向突破自适应交易策略是一种根据股票的开盘价和收盘价之间的关系,进行判断和交易操作的量化策略。该策略会在符合设定的参数条件下,进行做多或做空操作。同时,它具有自适应退出机制,可以根据最近一次开收盘价格的变化,来决定何时退出当前的头寸。

## 策略原理

该策略的核心逻辑是基于开盘价和收盘价的大小关系来判断方向。具体来说,如果收盘价大于开盘价超过设置的阈值val1,则产生做多信号;如果开盘价大于收盘价超过阈值val1,则产生做空信号。一旦进入仓位后,策略会继续监控价格变化。如果开收盘价格发生反转超过设置的阈值val2,则执行退出操作。可以看到,该策略同时包含建仓逻辑和退出逻辑,整体形成一个相对完整的交易框架。

从代码实现上来看,策略首先定义了长仓和短仓的条件表达式,然后在符合建仓逻辑时下单入场。随后它会持续检测是否触发了退出条件,一旦退出条件满足,即执行平仓操作。所以,该策略实时监控市场变化,具有自适应性和灵活性。

## 策略优势

双向突破自适应交易策略具有以下几个优势:

1. 操作清晰简单,容易理解和实现
2. 动态调整头寸,自适应市场变化
3. 具备止损功能,可以控制风险
4. 可以通过参数调整适用于不同品种
5. 容易进行算法优化,扩展空间大

## 策略风险

尽管该策略具有一定优势,但也存在以下风险:  

1. 市场剧烈波动时,止损策略可能失效
2. 无法抓住长期趋势,仓位频繁切换
3. 参数设置不当可能导致过度交易
4. 量化系统故障可能造成无法止损

这些风险需要在实盘过程中密切关注,及时调整参数或优化算法。

## 策略优化方向  

该策略主要可以从以下几个方向进行优化:

1. 增加止损策略的优化,在保证灵敏度的同时控制仓位频繁切换。
2. 增加趋势判断指标,减少非趋势下的交易频率。  
3. 结合日内短期操作策略,提高策略收益率。
4. 优化参数自适应机制,使阈值可以动态调整。
5. 增加机器学习模型判断走势方向。

通过算法和模型的优化,可以提高策略整体的稳定性和盈利能力。

## 总结  

双向突破自适应交易策略结合了趋势判断和自适应退出两个机制,可以有效控制风险,其简单的原理和灵活的参数使得该策略易于理解和扩展,是一种值得推荐和深入研究的量化策略。

||

## Overview  

The adaptive dual breakthrough trading strategy is a quantitative strategy that makes judgments and trading operations based on the relationship between the opening price and closing price of stocks. This strategy will take long or short positions when the set parameter conditions are met. At the same time, it has an adaptive exit mechanism that can decide when to exit the current position based on recent changes in opening and closing prices.

## Strategy Principle  

The core logic of this strategy is to judge the direction based on the size relationship between opening price and closing price. Specifically, if the closing price is higher than the opening price exceeding the set threshold val1, a long signal is generated; if the opening price is higher than the closing price exceeding the threshold val1, a short signal is generated. Once a position is entered, the strategy will continue to monitor price changes. If the opening and closing prices reverse beyond the set threshold val2, the exit operation will be executed. It can be seen that this strategy includes both opening position logic and exit logic, forming a relatively complete trading framework.

In terms of code implementation, the strategy first defines the long and short position conditions, and places orders when the opening position logic is met. It then continuously detects whether the exit condition has been triggered, and once the exit condition is met, it executes the closing operation. So this strategy monitors market changes in real time and is adaptive and flexible.  

## Advantages of the Strategy

The adaptive dual breakthrough trading strategy has the following advantages:

1. Clear and simple operation, easy to understand and implement  
2. Dynamically adjust positions to adapt to market changes
3. Has stop loss function to control risks
4. Can be applied to different varieties by adjusting parameters  
5. Easy to optimize algorithms with large expansion space

## Risks of the Strategy  

Although this strategy has certain advantages, it also has the following risks:

1. Stop loss strategies may fail during violent market fluctuations  
2. Unable to catch long-term trends, frequent position switching  
3. Improper parameter settings can lead to over-trading  
4. System failures may result in inability to stop losses   

These risks need to be closely monitored during live trading to promptly adjust parameters or optimize algorithms.

## Optimization Directions  

The main aspects for optimizing this strategy include:  

1. Enhance stop loss optimization to control frequent position switching while ensuring sensitivity.
2. Add trend judgment indicators to reduce trading frequency in non-trend environments.
3. Combine short-term intraday trading strategies to improve strategy returns.  
4. Optimize adaptive parameter mechanisms for dynamic threshold adjustment.
5. Add machine learning models to judge trend directions.   

Through algorithm and model optimization, the overall stability and profitability of the strategy can be improved.

## Summary   

The adaptive dual breakthrough trading strategy combines trend judgment and adaptive exit mechanisms, which can effectively control risks. Its simple principles and flexible parameters make it easy to understand and expand, making it a recommended and worthwhile quantitative strategy to study deeply.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|123|val1|
|v_input_2|234|val2|
|v_input_3|2018|from_year|
|v_input_4|6|from_month|
|v_input_5|true|from_day|
|v_input_6|2019|to_year|
|v_input_7|12|to_month|
|v_input_8|31|to_day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-30 00:00:00
end: 2024-02-05 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Repaint in version 3", overlay=true, calc_on_every_tick=true, calc_on_order_fills=true) // Repaint?
// strategy("Repaint in version 3", overlay=true, calc_on_every_tick=true) // Correct

val1 = input(123)
val2 = input(234)

from_year=input(2018, minval=2000, maxval=2020)
from_month=input(6, minval=1, maxval=12)
from_day=input(1, minval=1, maxval=31)

to_year=input(2019, minval=2007, maxval=2020)
to_month=input(12, minval=1, maxval=12)
to_day=input(31, minval=1, maxval=31)

long = (close-open) > val1
short = (open-close) > val1

exitLong = (open-close) > val2
exitShort = (close-open) > val2

term = true

strategy.entry("LONG", strategy.long, when=long and term)
strategy.close("LONG",  when = exitLong and not short and term)

strategy.entry("SHORT", strategy.short, when=short and term)
strategy.close("SHORT", when = exitShort and not long and term)

```

> Detail

https://www.fmz.com/strategy/441187

> Last Modified

2024-02-06 15:31:36
