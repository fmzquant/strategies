
> Name

双RSI突破量化交易策略Dual-RSI-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15231b01fa4a843b8f9.png)
 [trans]
## 概述

双RSI突破策略是一种同时利用快速RSI和慢速RSI指标产生交易信号的量化交易策略。该策略通过快慢两个RSI指标之间的突破形成交易信号,实现追踪市场趋势的效果。

## 策略原理  

该策略同时运用两个RSI指标,一个快速RSI指标周期为2,一个慢速RSI指标周期为14。策略的交易信号来自于两个RSI指标之间的突破。

当慢速RSI大于50,快速RSI小于50时,产生做多信号;当慢速RSI小于50,快速RSI大于50时,产生做空信号。做多做空后,如果出现止损信号(多单亏损时出现红色K线柱,空单亏损时出现绿色K线柱),则平仓止损。

## 优势分析

- 利用RSI指标的超买超卖特征形成交易信号,避免追高杀跌;
- 快慢RSI结合使用,能跟踪市场趋势变化,实现及时 entries 和 exits;  
- 追踪中长线趋势,避免被短期市场噪音干扰;
- 风险控制到位,有止损机制。

## 风险及解决方法

- 虚假突破的风险。解决方法是合理设定快慢RSI的参数,确保真实突破。
- 止损点设置不当带来的风险。解决方法是根据市场波动度合理设定止损距离。
- 螺旋式亏损风险。解决方法是不追涨杀跌,按策略规则进行 entries 和 exits。

## 优化方向

该策略还可从以下几个方面进行优化:

1. 快慢RSI的参数可进行优化,找到最佳参数组合;
2. 可以引入其他指标进行组合,形成更可靠的交易信号;  
3. 可以设定动态止损,根据市场波动实时调整止损点。

## 总结

双RSI突破策略利用快慢RSI指标跟踪市场趋势变化,在超买超卖区域形成交易信号,能有效避免追高杀跌。同时设置了止损机制来控制风险。该策略操作简单,易于实现,适合量化交易。通过参数优化、组合指标等方式,还可进一步提高策略profit因子。

|| 

## Overview  

The Dual RSI Breakthrough Strategy is a quantitative trading strategy that generates trading signals by using both fast and slow RSI indicators. The strategy forms trading signals through the breakthrough between the fast and slow RSI indicators to track market trends.

## Strategy Principle

The strategy uses two RSI indicators simultaneously, a fast RSI indicator with a period of 2 and a slow RSI indicator with a period of 14. The trading signals of the strategy come from the breakthrough between the two RSI indicators.  

When the slow RSI is greater than 50 and the fast RSI is less than 50, a long signal is generated. When the slow RSI is less than 50 and the fast RSI is greater than 50, a short signal is generated. After going long or short, if a stop loss signal occurs (a red K-line column appears when the long position loses money, and a green K-line column appears when the short position loses money), the position will be closed.

## Advantage Analysis

- Form trading signals by using the overbought and oversold features of RSI indicators to avoid chasing peaks and killing bottoms.
- The combination of fast and slow RSI can track trend changes to realize timely entries and exits.
- Track medium and long term trends and avoid being disturbed by short term market noise.
- Good risk control with stop loss mechanism.

## Risks and Solutions

- Risk of false breakthrough. The solution is to reasonably set the parameters of fast and slow RSI to ensure true breakthrough.
- Risk from improper stop loss point setting. The solution is to reasonably set the stop loss distance based on market volatility. 
- Risk of spiral losses. The solution is not to chase rises and beat declines, and make entries and exits according to the strategy rules.

## Optimization Directions  

The strategy can also be optimized in the following aspects:

1. Optimize the parameters of fast and slow RSI to find the best parameter combination;
2. Introduce other indicators to form more reliable trading signals;
3. Set dynamic stop loss and adjust the stop loss point in real time according to market volatility.

## Conclusion  

The dual RSI breakthrough strategy uses fast and slow RSI indicators to track market trend changes and forms trading signals in overbought and oversold areas, which can effectively avoid chasing peaks and killing bottoms. At the same time, a stop loss mechanism is set up to control risks. The strategy is simple to operate and easy to implement, suitable for quantitative trading. The profit factor can be further improved through parameter optimization, combination indicators, etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|true|leverage|
|v_input_4|2|Fast RSI Period|
|v_input_5|14|Slow RSI Period|
|v_input_6|2018|From Year|
|v_input_7|2100|To Year|
|v_input_8|true|From Month|
|v_input_9|12|To Month|
|v_input_10|true|From day|
|v_input_11|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-10 00:00:00
end: 2024-01-17 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's Double RSI Strategy 1.0", shorttitle = "2RSI str 1.0", overlay=true )

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
leverage = input(1, defval = 1, minval = 1, maxval = 100, title = "leverage")
fast = input(2, defval = 2, minval = 2, maxval = 100, title = "Fast RSI Period")
slow = input(14, defval = 14, minval = 2, maxval = 100, title = "Slow RSI Period")
fromyear = input(2018, defval = 2018, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Fast RSI
fastup = rma(max(change(close), 0), fast)
fastdown = rma(-min(change(close), 0), fast)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//Slow RSI
slowup = rma(max(change(close), 0), slow)
slowdown = rma(-min(change(close), 0), slow)
slowrsi = slowdown == 0 ? 100 : slowup == 0 ? 0 : 100 - (100 / (1 + slowup / slowdown))

//Signals
up = slowrsi > 50 and fastrsi < 50
dn = slowrsi < 50 and fastrsi > 50
exit = (strategy.position_size > 0 and close > open) or (strategy.position_size < 0 and close < open)
lot = strategy.position_size == 0 ? strategy.equity / close * leverage : lot[1]

//Trading
if up
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot )

if dn
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot )
    
if exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/439231

> Last Modified

2024-01-18 15:25:11
