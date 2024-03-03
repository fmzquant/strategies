
> Name

基于均线交叉的量化交易策略Quant-Trading-Strategy-Based-on-Moving-Average-Crossover

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/151c917bc7e99884260.png)
 [trans]
## 概述

本策略利用简单移动平均线(SMA)的金叉死叉原理构建。策略以3日线和5日线的金叉作为入场信号,以止损或止盈为退出信号。

## 策略原理

该策略主要基于两个SMA,即3日线和5日线。其中,3日线代表了短期趋势,5日线代表较长的中期趋势。当短期快速上涨,即3日线上穿5日线时,代表着目前处于上涨行情,这个时候入场做多;反之,当短期快速下跌,即3日线下穿5日线时,代表着目前处于下跌行情,这个时候入场做空。 这样,通过捕捉短期和中期两个周期价格变化的交叉来判断行情,可以提高入场的成功率。

## 优势分析

该策略具有以下优势:

1. 策略逻辑简单清晰,容易理解和实施。
2. 均线交叉策略对市场的大趋势判断比较准确,入场概率高。
3. 选取两个不同周期的均线,可以更好地把握市场的变化。
4. 实现了止盈止损机制,有效控制了损失。

## 风险分析

该策略也存在一定的风险:  

1. 由于采用了较短的均线周期,容易被市场的短期波动所影响,可能会增加止损的概率。
2. 策略较为机械化,无法对特殊的市场情况做出调整。
3. 没有考虑大周期的趋势判断,会使策略在市场长期下行中遭受较大的亏损。 

为降低风险,可以考虑优化入场的均线选取,或者增加长周期均线的辅助判断。同时,也可以调整止盈止损的点位,使其更贴合真实的市场情况。

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 增加更多不同周期的均线,形成多级筛选,提高策略的稳定性。
2. 加入其他技术指标判断,如MACD、强弱指标等,辅助入场。 
3. 对大周期趋势加入判断,避免在长期下跌行情中仍然入场做多。
4. 优化止盈止损的点位,使其能更好适应市场的实际波动。
5. 测试更长的回测周期,评估参数稳定性。

## 总结

本策略基于均线交叉原理构建,采取金叉入场、止盈止损出场的策略逻辑,简单易于实施,回测表现也较为稳定。通过加入更多辅助技术指标、优化参数以及扩大回测范围等措施,可以进一步提升策略的稳定性及盈利水平。总体来说,均线策略具有良好的市场适应性,值得进一步研究与应用。

||

## Overview

This strategy is built based on the golden cross and dead cross principles of simple moving averages (SMA). It uses the golden cross of 3-day and 5-day lines as the entry signal and stop loss or take profit as the exit signal.

## Strategy Principle  

The strategy is mainly based on two SMAs, the 3-day line and the 5-day line. Among them, the 3-day line represents the short-term trend, and the 5-day line represents the longer mid-term trend. When the short term rises rapidly, that is, when the 3-day line crosses above the 5-day line, it indicates that the current market is in an upward trend. At this time, go long. On the contrary, when the short term falls rapidly, that is, when the 3-day line crosses below the 5-day line, it indicates that the current market is in a downward trend. At this time, go short. By capturing the crossover of price changes between the two cycles of short-term and medium-term, the market can be better judged and the probability of successful entry can be improved.

## Advantage Analysis  

The strategy has the following advantages:

1. The strategy logic is simple and clear, easy to understand and implement.
2. The moving average crossover strategy makes relatively accurate judgments on the overall market trend with high probability of successful entry.
3. Selecting moving averages of two different cycles can better grasp market changes. 
4. The implementation of take profit and stop loss mechanisms effectively controls losses.

## Risk Analysis

The strategy also has some risks:

1. Due to the use of shorter moving average cycles, it is prone to be affected by short-term market fluctuations, which may increase the probability of stop loss.
2. The strategy is relatively mechanized and cannot adapt to special market conditions.
3. It does not consider the judgment of long-term trends, which can cause the strategy to suffer greater losses in a long-term market downturn.

To reduce risks, we can consider optimizing the selection of entry moving averages, or adding auxiliary judgments of long-cycle moving averages. At the same time, the take profit and stop loss points can also be adjusted to better fit the real market conditions.

## Optimization Directions   

The strategy can be optimized in the following aspects:  

1. Increase more moving averages of different cycles to form multi-level screening to improve the stability of the strategy.
2. Add judgments of other technical indicators such as MACD, RSI, etc. to assist entry.
3. Add judgments on long-term trends to avoid going long in long-term downtrends. 
4. Optimize the take profit and stop loss points to better adapt to actual market fluctuations.
5. Test longer backtest periods to evaluate parameter stability.  

## Summary  

This strategy is constructed based on the principle of moving average crossover, adopting entry on golden cross and exit on stop loss or take profit. It is simple to implement and has relatively stable backtest results. By adding more auxiliary technical indicators, optimizing parameters, and expanding backtest range, etc., the stability and profitability of the strategy can be further enhanced. In general, the moving average strategy has good market adaptability and is worth further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2018|From Year|
|v_input_4|true|To Month|
|v_input_5|true|To Day|
|v_input_6|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 5h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="Revolut v1.0", overlay=true)

// === GENERAL INPUTS ===
ATR = atr(3)
ema3 = ema(close, 3)
ema5 = ema(close, 5)

// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2018, title = "From Year", minval = 2017)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2017)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true// create function "within window of time"


// === PLOTTING ===
plot(ema3, title="Ema 3", color = white, linewidth = 2, transp=0)
plot(ema5, title="Ema 5", color = aqua, linewidth = 2, transp=0)



// === ENTRY POSITION LOGIC ===
entryCondition = crossover(ema(close, 3), ema(close, 5))
if (entryCondition)
    strategy.entry("ENTRY", strategy.long, when=window())
    

// === EXIT POSTION LOGIC ===
//strategy.exit("Take Profit", "ENTRY", profit=6, loss=5, when=window())
strategy.exit("Take Profi Or STOP", "ENTRY", profit = 6, loss = 5, when=window())
  

// #####################################
// We can start to incorperate this into the script later
// We can program a emergency exit price
//strategy.close_all()

// You can use this if you want another exit
//strategy.exit("2nd Exit", "ENTRY", profit=1500, stop=500, when=window())



```

> Detail

https://www.fmz.com/strategy/439701

> Last Modified

2024-01-23 11:05:50
