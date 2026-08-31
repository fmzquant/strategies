
> Name

基于双向突破自适应交易策略Adaptive-Dual-Breakthrough-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15088404c02ce293aa0.png)

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
