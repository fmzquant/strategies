
> Name

超级趋势多时间框架回测策略SuperTrend-Multi-Timeframe-Backtest-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15772766655312fcabd.png)


[trans]
## 概述

该策略的主要思想是利用超级趋势指标在多个时间框架上进行交易信号生成,并结合intraday过滤器进行盘中持仓的平仓,从而实现多时间框架交易,提高信号质量。

## 策略原理

该策略首先调用supertrend函数,传入参数mult和len,生成超级趋势指标线superTrend和方向dir。然后绘制超级趋势线图。设置输入参数intrady控制是否进行盘中平仓。如果intrady为true,则在下午2:45后进行盘中持仓平仓。

策略信号生成规则为:当收盘价高于超级趋势线时 generate buy信号;当收盘价低于超级趋势线时generate sell信号。收到买入信号时,执行买入开仓策略;收到卖出信号时,执行卖出开仓策略。如果选择了intraday过滤,即intrady为true,则在每天下午2:45后,平仓所有买入和卖出仓位。

## 优势分析

该策略最大的优势在于利用超级趋势这一简单但实用的技术指标,实现多时间框架的交易信号生成。超级趋势本身就具有较好的胜率和收益率。且该策略额外增加了intraday过滤器,可以避免盘中剧烈波动带来的亏损。

另外,该策略非常简洁,只用很少的代码就实现了核心逻辑,易于理解、修改和扩展。这为用户提供了极大的灵活性,可以根据自己的需要调整参数或者增加其他指标等。

## 风险分析

该策略主要风险在于超级趋势指标存在一定的滞后,可能带来额外的亏损。此外,固定的多时间框架交易也可能错过短线上的交易机会。

为降低这些风险,建议优化超级趋势参数mult和len,找到最佳参数组合。也可以测试增加其他指标进行组合,利用更多因子提升策略稳定性。此外,可以考虑取消固定的intraday平仓时间,改为动态跟踪波动确定平仓时机。

## 优化方向 

该策略主要可优化的方向包括:

1. 测试多组超级趋势参数,找到最优参数组合。

2. 增加其他技术指标,如K线形态、移动平均线等进行组合,利用更多因子过滤信号。

3. 优化和动态调整intraday的具体平仓时间,降低误平仓概率。

4. 添加止损策略,如固定百分比止损或ATR止损。

5. 测试适合的资金利用率和仓位管理策略。

6. 回测更长的时间周期,验证参数稳定性。

## 总结

该超级趋势多时间框架回测策略总体来说非常实用。它利用简单的超级趋势指标实现多时间框架交易,同时结合盘中过滤器控制亏损。策略优化空间较大,用户可以根据需要调整参数或组合其他技术指标。回测表现也较为稳定可靠。总体而言,该策略适合中长线趋势交易,也适合新手学习和修改实践。

||

## Overview

The main idea of this strategy is to generate trading signals using the Supertrend indicator across multiple timeframes, and combine it with an intraday filter to square off open positions during the day, in order to implement multi-timeframe trading and improve signal quality.

## Strategy Logic

The strategy first calls the supertrend function, passing in the parameters mult and len, to generate the Supertrend line superTrend and direction dir. Then it plots the Supertrend line chart. The input parameter intrady controls whether to square off open positions intraday. If intrady is true, intraday open positions will be squared off after 2:45pm.

The signal generation rules are: when the close price is above the Supertrend line, a buy signal is generated; when the close price is below the Supertrend line, a sell signal is generated. When a buy signal is received, a buy order will be executed to open a long position; when a sell signal is received, a sell order will be executed to open a short position. If the intraday filter intrady is enabled, i.e. set to true, all open long and short positions will be closed after 2:45pm every day.

## Advantage Analysis 

The biggest advantage of this strategy is that it uses the simple but practical Supertrend indicator to implement multi-timeframe trading signals generation. Supertrend itself already has good win rate and return. In addition, this strategy includes an intraday filter to avoid losses caused by intense intraday fluctuations.

In addition, the strategy is very concise, it implements the core logic with very little code, which is easy to understand, modify and expand. This provides great flexibility for users to adjust parameters or add other indicators etc. according to their own needs.

## Risk Analysis

The main risk of this strategy is that the Supertrend indicator has some lag, which may lead to additional losses. In addition, the fixed multi-timeframe trading may also miss trading opportunities in the short term.

To mitigate these risks, it’s recommended to optimize the Supertrend parameters mult and len to find the optimal parameter combination. Other indicators can also be tested to complement Supertrend and utilize more factors to enhance the stability of the strategy. Furthermore, the fixed intraday square-off time can be removed and a dynamic mechanism can be used to determine the square-off timing based on volatility conditions.

## Optimization Directions

The main optimization directions for this strategy includes:

1. Test multiple sets of Supertrend parameters to find the optimal parameter combination.  

2. Add other technical indicators like candlestick patterns, moving average etc. to filter signals with more factors.

3. Optimize and dynamically adjust the specific intraday square-off timing to reduce premature square-off.  

4. Add stop loss mechanisms like fixed percentage stop loss or ATR stop loss.

5. Test suitable capital utilization ratio and position sizing strategies.  

6. Backtest longer time period to verify parameter robustness.

## Conclusion

In summary, this Supertrend multi-timeframe backtest strategy is very practical. It implements multi-timeframe trading with the simple Supertrend indicator and controls losses with the intraday filter. There is large room for optimization and users can adjust parameters or combine with other technical indicators according to their needs. The backtest performance is also relatively stable and reliable. Overall speaking, this strategy is suitable for medium-long term trend trading, and is also good for beginner to learn and practice modifications.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|mult|
|v_input_2|5|len|
|v_input_3|false|Do you want to exit intrday position|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-27 00:00:00
end: 2023-12-04 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

//@Gurjant_Singh IISMA-Indian Institute of stock Market Analysis 

strategy("SupterTrend ", overlay=true, initial_capital=100000, default_qty_type=strategy.percent_of_equity, default_qty_value=300, calc_on_order_fills=false, calc_on_every_tick=false)




mult = input(type=input.float, defval=3)
len = input(type=input.integer, defval=5)
[superTrend, dir] = supertrend(mult, len)



plot(superTrend)

intrady = input(false, "Do you want to exit intrday position", type = input.bool)

IntraDay_SquareOff = minute >= 45 and hour >= 14



buy = close > superTrend

sell = close < superTrend

if buy
    strategy.entry("Buy", true)
    
if sell
    strategy.entry("sell", false)

if intrady and IntraDay_SquareOff
    strategy.close("buy")
    strategy.close("sell")





```

> Detail

https://www.fmz.com/strategy/434295

> Last Modified

2023-12-05 10:59:54
