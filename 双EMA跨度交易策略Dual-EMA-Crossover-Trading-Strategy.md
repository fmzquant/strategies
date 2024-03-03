
> Name

双EMA跨度交易策略Dual-EMA-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

双EMA跨度交易策略是一种trend following策略,它通过计算两个不同期限的EMA的跨度比例,来判断行情趋势并进行交易。该策略较简单直接,能够有效跟踪中长线趋势,非常适合中长线趋势交易者使用。

## 策略原理  

该策略主要基于两个EMA的数值大小和它们之间的跨度来确定趋势方向。策略首先计算一个短期EMA和一个长期EMA,典型的配置是13周期和26周期的EMA。然后计算两条EMA之间的跨度百分比,如果短期EMA高于长期EMA,并且跨度大于设定阈值(如5%),则判断为趋势向上,进行做多交易;如果短期EMA低于长期EMA,并且跨度大于设定阈值,则判断为趋势向下,进行做空交易。当价格重新跌破或突破短期EMA时,进行平仓。

该策略的核心逻辑是:

1. 计算短期EMA和长期EMA
2. 判断短期EMA是否高于或低于长期EMA
3. 计算两EMA之间的跨度百分比是否高于设置阈值
4. 根据趋势判断方向,做多或做空
5. 价位重新跌破或突破短期EMA时平仓

通过这样的设计,可以有效跟踪中长期趋势,并在趋势变化时及时切换方向。同时,跨度阈值的设定也可避免非关键时期的调整导致不必要的交易。

## 策略优势

- 该策略直接有效,非常适合中长线趋势跟踪
- 使用EMA有助于滤除短期市场噪音
- 可配置的EMA周期和跨度阈值,适应性强
- 利用跨度计算确保仅在趋势明确时交易
- 结合突破短期EMA进行止损,可控制风险

## 策略风险及对策  

- 无法在趋势反转前退出,需承担较大回撤
- 容易在震荡盘整中被套牢
- 需根据具体品种合理配置EMA周期及跨度阈值

可通过以下方法降低风险:

1. 结合其他指标判断趋势反转信号,提前平仓
2. 增加趋势过滤条件,避免震荡行情交易
3. 优化参数配置,选择适合具体品种的EMA周期和跨度阈值

## 策略优化方向

该策略可从以下方面进行优化:

1. 参数优化:通过回测优化EMA周期参数及跨度阈值,寻找最佳参数组合

2. 趋势过滤:添加其他判别趋势的指标,如MACD、布林带等,避免震荡行情的套牢

3. 止损策略:设立移动止损或时间止损,以控制单笔亏损

4. 获利回吐:设置部分获利后移动止盈点,锁定部分利润

5. 量化优化:采用机器学习等方法自动优化参数及过滤条件,实现策略的定量优化

6. 组合优化:将该策略与其他非相关策略进行组合,以降低回撤和提高稳定性

通过参数、过滤条件、止损、获利回吐等多方面的优化,可以使该策略更稳定、适应更多市场情况,更科学、有效。量化和组合优化还可以大幅提升策略的效果。

## 总结

双EMA跨度策略是一个简单直接、适合趋势跟踪的策略。它仅需两个EMA即可判断趋势方向,非常适合中长线持仓。同时,可通过参数优化、趋势过滤、止损策略等多种方式进行改进,使策略更稳定可靠。该策略易于实施,也容易进行定量优化,是一种值得推荐的趋势跟踪策略。

|| 


## Overview

The dual EMA crossover trading strategy is a trend following strategy that uses the crossover of two EMAs of different lengths to determine market trend and make trades. This simple and straightforward strategy can effectively track medium- to long-term trends, making it very suitable for swing traders.

## Strategy Logic

The strategy mainly uses the values and crossover of a short-term and long-term EMA to determine trend direction. It first calculates a short-term EMA (e.g. 13 periods) and a long-term EMA (e.g. 26 periods), then computes the percentage crossover between the two EMAs. If the short EMA is above the long EMA and the crossover is larger than a threshold (e.g. 5%), it signals an upward trend and long trades are taken. If the short EMA is below the long EMA and the crossover is larger than the threshold, it signals a downward trend and short trades are taken. Trades are closed when price crosses back above or below the short EMA. 

The key logic is:

1. Calculate short-term and long-term EMAs
2. Check if short EMA is above or below long EMA 
3. Compute percentage crossover between the two EMAs
4. Determine trend direction for long or short trades
5. Close trades when price crosses back the short EMA

This allows the strategy to effectively track medium- to long-term trends and switch direction when the trend changes. The crossover threshold also avoids unnecessary trades during non-trending periods.

## Advantages

- Simple and effective for tracking long-term trends
- EMAs help filter out short-term market noise
- Configurable EMA periods and crossover threshold for flexibility
- Crossover threshold ensures trades only when trend is strong
- Short EMA breakout for stop loss helps manage risk

## Risks and Mitigations

- Unable to exit before trend reversal, larger drawdowns
- Can get whipsawed during range-bound price action
- Need to set suitable EMA periods and threshold per instrument  

Risks can be reduced by:

1. Adding filters to identify trend reversal signals for early exits
2. Increasing trend filter rules to avoid trading range-bound action
3. Optimizing EMA periods and threshold for each instrument

## Enhancement Opportunities

The strategy can be enhanced in areas like:

1. Parameter optimization via backtesting to find optimal EMA periods and threshold

2. Trend filtering using additional indicators like MACD, Bollinger Bands to avoid whipsaws

3. Stop loss strategies like trailing stops or time-based stops to limit losses

4. Profit taking by moving stop loss to lock in partial profits after hits

5. Quantitative optimization using machine learning to auto-tune parameters and filters

6. Portfolio optimization by combining with non-correlated strategies to lower drawdown and increase robustness

Through parameter optimization, better filters, stop loss, profit taking, and quantitative & portfolio optimization, the strategy can be made more robust, adaptive, and scientifically effective.

## Conclusion

The dual EMA crossover is a simple and direct trend following strategy suitable for swing trading. It only requires two EMAs to determine trend direction, ideal for medium- to long-term trend trading. The strategy can also be enhanced through parameter tuning, better filters, stop loss, and other quantitative optimizations to make it more robust. Easy to implement and optimize, it is a recommended trend trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.95|diffMinimum|
|v_input_2|13|Small EMA|
|v_input_3|26|Long EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-08-23 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("2-EMA Strategy", overlay=true, initial_capital=100, currency="USD", default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.075)

diffMinimum = input(0.95, step=0.01)

small_ema = input(13, title="Small EMA")
long_ema = input(26, title="Long EMA")

ema1 = ema(close, small_ema)
ema2 = ema(close, long_ema)


orderCondition = ema1 > ema2?((ema1/ema2)*100)-100 > diffMinimum:((ema2/ema1)*100)-100 > diffMinimum

longCondition = close > ema1 and ema1 > ema2
if (longCondition and orderCondition)
    strategy.entry("Long", strategy.long)

shortCondition = close < ema1 and ema1 < ema2
if (shortCondition and orderCondition)
    strategy.entry("Short", strategy.short)
    
strategy.close("Short", when=close > ema1)
strategy.close("Long", when=close < ema1)
    
plot(ema(close, small_ema), title="EMA 1", color=green, transp=0, linewidth=2)
plot(ema(close, long_ema), title="EMA 2", color=orange, transp=0, linewidth=2)
```

> Detail

https://www.fmz.com/strategy/427290

> Last Modified

2023-09-19 19:36:03
