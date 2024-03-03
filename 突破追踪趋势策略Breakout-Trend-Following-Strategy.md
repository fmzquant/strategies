
> Name

突破追踪趋势策略Breakout-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ea806793464db59642.png)
[trans]

## 概述

该策略通过设定价格突破的高点和低点,实现对加密货币价格趋势的追踪。当价格突破最高点时做多,当价格突破最低点时做空,实现对趋势的捕捉。

## 策略原理

该策略主要通过平滑移动平均线加权法判断价格是否出现明显的上涨或下跌趋势。具体来说,它会统计一定周期内最高价和最低价,当实际交易价格超过统计的最高价时,判断为上涨趋势出现,则做多;当实际交易价格低于统计的最低价时,判断为下跌趋势出现,则做空。

做多做空的开仓价格通过输入参数“ENTRY”设置,平仓价格通过“EXIT”参数设置。回测时段也可以通过参数设定。这样可以通过调整参数,寻找最佳的 combo 组合。

具体来说,策略的主要逻辑是:

1. 统计一定周期(可设定)内的最高价和最低价
2. 判断实际交易价格是否高于最高价 
   1. 如果高于,出现做多机会,根据“ENTRY”参数设定的价格水平开多仓
   2. 如果实际交易价格低于最低价,出现做空机会,根据“EXIT”参数设定的价格水平开空仓
3. 多仓开仓后,当价格低于“EXIT”参数设定的价格时平仓
4. 空仓开仓后,当价格高于“ENTRY”参数设定的价格时平仓

通过该逻辑循环,可以捕捉价格的上涨和下跌趋势,实现趋势跟踪。

## 策略优势

该策略最大的优势在于通过参数调整,可以自动捕捉价格趋势,无需人工判断趋势方向。只要参数设定得当,就可以自动跟踪加密货币的价格波动。

另外,该策略非常适合作用于量化交易,可以轻松实现自动化下单。无需人工操作,降低了情绪化交易的风险,可以大幅提高交易效率。

最后,该策略还可以通过参数调整最大化收益。通过测试不同的 ENTRY 和 EXIT 参数,可以找到最优参数,实现收益最大化。

## 策略风险

该策略最大的风险在于参数设置不当可能导致过于频繁交易,增加交易费用和滑点损失。如果 ENTRY 设置过低、EXIT 设置过高,很容易产生虚议交易信号。

另外,如果参数调整不当,也可能导致无法及时捕捉价格趋势,错过交易机会。这就需要通过大量回测来找到最优参数。

最后,该策略对短期市场噪音过于敏感,可能产生错误交易信号。这需要通过适当设置交易时间周期参数来避免。

## 策略优化方向

该策略可以通过以下几个方向继续优化:

1. 增加止损逻辑。这样可以在亏损扩大至一定比例时止损退出,避免更大的损失。

2. 增加移动平均线等技术指标过滤。利用 MA、KDJ 等指标判断大趋势,避免短期噪音带来过多交易。

3. 优化参数设置逻辑。可以设定 ENTRY、EXIT 参数的自适应变化机制,而非静态设置,使其可以根据市场环境调整参数。

4. 利用机器学习训练最优参数。通过大量历史数据训练,获得对当前市场环境最优的 ENTRY 和 EXIT 设置。

## 总结

该策略通过捕捉价格趋势实现自动化交易,最大优势是可以减少人为情绪对交易的影响,降低风险,提高效率。同时可以通过参数调整寻找最优收益点。

策略的主要风险在于参数设置不当,以及对市场噪音过于敏感。这需要通过止损、指标过滤、参数自适应优化等手段进行改进。

总体来说,该策略为简单有效的趋势跟踪策略,适合量化和自动交易。通过持续优化,可以进一步提高策略稳定性。

|| 

## Overview

This strategy tracks the price trend of cryptocurrencies by setting breakout high and low prices. It goes long when the price breaks above the highest price and goes short when the price breaks below the lowest price to capture the trend.

## Strategy Principle 

This strategy mainly uses the weighted moving average method to determine whether there is an obvious upward or downward trend. Specifically, it will record the highest and lowest prices over a certain period. When the actual trading price exceeds the recorded highest price, it is judged that an upward trend has occurred, and it will go long. When the actual trading price is lower than the recorded lowest price, it is judged that a downward trend has occurred, and it will go short.

The opening prices for long and short are set through the "ENTRY" input parameter, and the closing prices are set through the "EXIT" parameter. The backtest timeframe can also be set through parameters. This allows finding the best combo by adjusting parameters. 

Specifically, the main logic of the strategy is:

1. Record the highest and lowest prices over a certain period (adjustable)
2. Judge if the actual trading price is higher than the highest price
   1. If higher, there is a long opportunity, open long position based on the price level set by the "ENTRY" parameter  
   2. If the actual trading price is lower than the lowest price, there is a short opportunity, open short position based on the price level set by “EXIT” parameter
3. After opening long position, close it when price drops below the level set by “EXIT” parameter
4. After opening short position, close it when price rises above the level set by “ENTRY” parameter

Through this logic loop, it can capture upward and downward trends of the price and achieve trend following.

## Advantages

The biggest advantage of this strategy is that by adjusting parameters, it can automatically capture price trends without the need for manual judgment of trend direction. As long as the parameters are set appropriately, it can automatically track the price fluctuations of cryptocurrencies.

In addition, this strategy is very suitable for quantitative trading and can easily achieve automated order placement. Without manual operation, it reduces the risk of emotional trading and greatly improves trading efficiency.

Finally, this strategy can also maximize returns by adjusting parameters. By testing different ENTRY and EXIT parameters, the optimal parameters can be found to maximize returns.

## Risks

The biggest risk of this strategy is that improper parameter settings may lead to excessively frequent trading, increasing trading fees and slippage losses. If ENTRY is set too low and EXIT is set too high, false trading signals are easily generated.

In addition, improper parameter tuning may also lead to failure to capture price trends in time, missing trading opportunities. This requires a lot of backtesting to find the optimal parameters.

Finally, this strategy is too sensitive to short-term market noise, which may generate wrong trading signals. This needs to be avoided by appropriately setting the trading time cycle parameters.

## Optimization Directions

The following aspects can be further optimized for this strategy:

1. Add stop loss logic. This allows stopping loss when losses exceed a certain percentage to avoid greater losses.

2. Add technical indicators filters like moving average, KDJ to judge overall trend to avoid too much trading due to short-term noise.

3. Optimize parameter setting logic. The adaptive changing mechanism can be set for ENTRY and EXIT parameters rather than static setting so they can adjust based on market conditions.

4. Use machine learning to train optimal parameters. Obtain the optimal ENTRY and EXIT settings for the current market environment through massive historical data training.

## Conclusion

The biggest advantage of this strategy is that by capturing price trends it achieves automated trading, which can reduce the impact of human emotions on trading, lower risks, and improve efficiency. At the same time, optimal profit points can be found by adjusting parameters.

The main risks of the strategy are improper parameter settings and oversensitivity to market noise. This needs to be improved through stop loss, indicator filters, adaptive parameter optimization and more.

Overall, this is a simple and effective trend following strategy suitable for quantitative and automated trading. By continuous optimization, the stability of the strategy can be further improved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|ENTRY H/L|
|v_input_2|50|EXIT H/L|
|v_input_3|2015|Backtest Start Year|
|v_input_4|true|Backtest Start Month|
|v_input_5|true|Backtest Start Day|
|v_input_6|2999|Backtest End Year|
|v_input_7|true|Backtest End Month|
|v_input_8|true|Backtest End Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-01 00:00:00
end: 2023-12-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © JstMtlQC

//@version=4
strategy("Trend Following Breakout",calc_on_order_fills=true,calc_on_every_tick =false, overlay=true, initial_capital=2000,commission_value=.1,default_qty_type = strategy.percent_of_equity, default_qty_value = 100)


/////////////// INPUT ENTRY EXIT
entry= input(100, "ENTRY H/L")
exit= input(50, "EXIT H/L")

/////////////// Backtest Input
FromYear = input(2015, "Backtest Start Year")
FromMonth = input(1, "Backtest Start Month")
FromDay = input(1, "Backtest Start Day")
ToYear = input(2999, "Backtest End Year")
ToMonth = input(1, "Backtest End Month")
ToDay = input(1, "Backtest End Day")

/////////////// Backtest Setting
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)       
window()  => time >= start and time <= finish ? true : false 

/////////////// BUY OPEN PLOT
highestpricelong = highest(high,entry)[1]
plot(highestpricelong, color=color.green, linewidth=2)

/////////////// BUY CLOSE PLOT
lowestpricelong = lowest(high,exit)[1]
plot(lowestpricelong, color=color.green, linewidth=2)

/////////////// SHORT OPEN PLOT
lowestpriceshort = lowest(low,entry)[1]
plot(lowestpriceshort, color=color.red, linewidth=2)

/////////////// SHORT CLOSE PLOT
highestpriceshort = highest(low,exit)[1]
plot(highestpriceshort, color=color.red, linewidth=2)

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// CONDITION LONG SHORT //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////////////// SHORT 

entryshort= crossunder(close, lowestpriceshort)
exitshort= crossover(close,highestpriceshort)

/////////////// LONG 

exitlong= crossover(close, lowestpricelong)
entrylong= crossover(close,highestpricelong)

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// LONG and SHORT ORDER //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////////////// LONG 

if (entrylong)
    strategy.entry("LongEntry", strategy.long, when = window())
if (exitlong or entryshort)
    strategy.close("LongEntry", when=window())

/////////////// SHORT 

if (entryshort)
    strategy.entry("short", strategy.short, when = window())
if (exitshort or entrylong)
    strategy.close("short", when=window())


```

> Detail

https://www.fmz.com/strategy/434719

> Last Modified

2023-12-08 17:16:34
