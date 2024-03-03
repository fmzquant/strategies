
> Name

一种趋势追踪突破回调策略Breakout-Pullback-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/181c883399e6520b891.png)
[trans]

## 概述

突破回调策略是一种趋势追踪策略。它的基本原理是在突破前一根K线的最高价或最低价时做多做空,设置止盈止损后 let 盈利继续运行。

## 策略原理  

该策略主要通过判断价格是否突破前一根K线的最高价或最低价来确定 Entry 时机。具体逻辑是:

如果当前K线的最高价高于前一根K线的最高价,则发出做多信号。

如果当前K线的最低价低于前一根K线的最低价,则发出做空信号。 

收到做多做空信号后立即入场。入场后设置止盈为 50 个点,止损为 100 个点。

当亏损大于等于止损点数或盈利大于等于止盈点数时主动退场。

## 优势分析

这种突破回调策略具有如下优势:

1. 操作逻辑简单,容易实现。
2. 可以有效抓住趋势的开始,及时入场。 
3. 设置止盈止损后可以让盈利继续运行,避免过早离场。
4. 回撤和风险控制能力较强。

## 风险分析 

该策略也存在一些风险:  

1. 突破信号可能是假突破,导致误入场。
2. 盘整 consolidate 市的时候,容易被套。
3. 需要合理设置止盈止损点数,以控制风险。

## 优化方向

可以从以下几个方面继续优化该策略:

1. 增加价格突破的有效性判断,避免假突破。例如可以加入指标过滤和成交量验证。

2. 增加趋势判断机制,避免盘整市带来的套牢风险。可以加入移动平均线等趋势指标。

3. 优化止盈止损策略,例如跟踪止损、盈利后移止损等,让利润更加最大化。

4. 进行参数优化,找到最佳的止盈止损点数。

## 总结

该突破回调策略总的来说逻辑简单、实施方便,能有效捕捉趋势开始,回撤和风险控制能力也较强。通过进一步优化可以成为一个非常实用的量化策略。

||

## Overview  

The breakout pullback strategy is a trend following strategy. Its basic principle is to go long or short when the price breaks through the high or low of the previous candlestick and let the profit continue to run after setting the take profit and stop loss.  

## Strategy Logic   

The core logic of this strategy is to determine the entry timing by judging whether the price breaks through the high or low of the previous candlestick. The specific logic is:  

If the high of the current candlestick is higher than the high of the previous candlestick, a long signal is triggered.  

If the low of the current candlestick is lower than the low of the previous candlestick, a short signal is triggered.

Once receiving the long or short signal, enter the position immediately. After entering the position, set the take profit to 50 pips and stop loss to 100 pips.  

When the loss is greater than or equal to the stop loss pips or profit is greater than or equal to the take profit pips, exit the position actively.

## Advantage Analysis   

This breakout pullback strategy has the following advantages:  

1. The logic is simple and easy to implement.  
2. It can effectively capture the beginning of trends and enter positions in a timely manner.
3. Setting take profit and stop loss allows profits to continue to run, avoiding premature exits.  
4. Good ability of controlling drawdowns and risks.

## Risk Analysis   

This strategy also has some risks:   

1. Breakout signals may be false breakouts, causing wrong entries.
2. It is easy to be trapped in range-bound consolidate markets.   
3. Reasonable take profit and stop loss pips should be set to control risks.  

## Optimization Directions  

The strategy can be further optimized in the following aspects:  

1. Add validity check for price breakouts to avoid false breakouts, such as using indicators filters and volume confirmation.  

2. Add trend determination mechanism to avoid trapping risks in range-bound markets. Moving average and other trend indicators can be used.
  
3. Optimize take profit and stop loss strategy, such as trailing stop loss, moving stop loss after profit, etc, to maximize profits.
  
4. Parameter optimization to find the optimal take profit and stop loss pips.

## Conclusion  

In general, this breakout pullback strategy has the advantage of simple logic, easy implementation, and effectively capturing trend starts. It also has good ability of controlling risks and drawdowns. With further optimizations, it can become a very practical quant strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Take Profit (in pips)|
|v_input_2|100|Stop Loss (in pips)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-25 00:00:00
end: 2024-01-31 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Breakout Strategy", shorttitle="BS", overlay=true)

// Input for take profit and stop loss in pips
tp_pips = input(50, title="Take Profit (in pips)")
sl_pips = input(100, title="Stop Loss (in pips)")

// Calculate take profit and stop loss levels in points
tp_level = tp_pips * syminfo.mintick
sl_level = sl_pips * syminfo.mintick

// Function to check if a breakout has occurred
breakout(high_or_low) =>
    high_or_low > request.security(syminfo.tickerid, "D", high[1]) ? true : false

// Buy condition
buy_condition = breakout(high)
strategy.entry("Buy", strategy.long, when=buy_condition)

// Sell condition
sell_condition = breakout(low)
strategy.entry("Sell", strategy.short, when=sell_condition)

// Take profit and stop loss conditions for Buy
tp_buy_condition = strategy.position_avg_price + tp_level
sl_buy_condition = strategy.position_avg_price - sl_level
strategy.exit("Take Profit/Close Buy", from_entry="Buy", profit=tp_buy_condition, loss=sl_buy_condition)

// Take profit and stop loss conditions for Sell
tp_sell_condition = strategy.position_avg_price - tp_level
sl_sell_condition = strategy.position_avg_price + sl_level
strategy.exit("Take Profit/Close Sell", from_entry="Sell", profit=tp_sell_condition, loss=sl_sell_condition)

```

> Detail

https://www.fmz.com/strategy/440715

> Last Modified

2024-02-01 14:37:02
