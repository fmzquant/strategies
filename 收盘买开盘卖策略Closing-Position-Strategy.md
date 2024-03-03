
> Name

收盘买开盘卖策略Closing-Position-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/124d8ec0582f2a23c24.png)
[trans]

## 概述

本策略的核心思想是在当日收盘时买入标的,并在次日开盘时卖出,以利用开盘时标的价格的涨幅获利。

## 策略原理

该策略主要基于两个判断:

1. 日内交易者通常倾向于在开盘时进行买入操作,从而带动开盘时股价的涨幅。

2. 收盘时的标的价格相对更能反映该标的的真实价值。

具体来说,该策略首先在每天收盘时(20:00)判断当日收盘价是否高于200日简单移动平均线,如果高于该平均线,则在收盘时做多;如果收盘价低于该平均线,则在收盘时做空。

在次日开盘时(9:30),如果前一日持有多头头寸,则在开盘时平仓;如果持有空头头寸,则在开盘时平仓。

通过在收盘低价买入,开盘高价卖出的操作,利用开盘股价的涨幅获得收益。

## 优势分析

该策略主要具有以下优势:

1. 利用日内交易者的惯性思维,即开盘时股价上涨的特点,在开盘时卖出标的获得盈利。

2. 使用200日移动平均线判断价格趋势,有利于把握大趋势进行操作。

3. 操作频率低,每天只有开盘和收盘两个时间点进行判断和交易,降低交易成本。

4. 回测数据充分,利用历史数据判断规则参数的合理性,增加信心。

5. 程序化交易系统执行效率高,避免人为情绪影响交易决策。

## 风险分析

该策略也存在一定的风险:

1. 开盘价反转的概率存在,如果开盘价向相反方向大幅反转,则会产生损失。

2. 收盘价被人为操纵的可能性,如果收盘价被刻意推高或压低,会影响决策。

3. 标的停牌可能导致无法在开盘平仓,产生损失。

4. 交易成本较高的标的不适合该频率较高的策略。

5. 参数设定不合理可能导致交易频率过高或效果不佳。

对应风险的解决方法包括:

1. 设置止损点,控制最大损失。

2. 采取成交量或复权等手段判断收盘价的可靠性。 

3. 优先选择流动性较好的标的。

4. 调整移动平均线参数和开平仓时间提高策略效果。

## 优化方向

该策略可以通过以下方式进行优化:

1. 在开盘价格出现反转时设置止损或止盈,避免继续亏损。

2. 使用其他指标或模型判断股价的合理区间,避免损失。

3. 考虑标的的流动性风险,优先选择流动性较好的标的。

4. 测试不同的移动平均线参数,寻找最佳参数组合。

5. 优化开平仓时间,考虑提前或延迟一定时间开平仓。

6. 结合当前重大消息面判断收盘价的合理性。

7. 考虑交易成本,筛选交易成本较低的标的。

8. 整合多因子模型,充分考虑各种影响因素。

## 总结

本策略通过在每日收盘低价买入、次日开盘高价卖出的操作获得收益,利用了开盘涨幅较大的特点。该策略有一定的优势,但也存在一些风险需要注意。通过继续优化参数设定、止损方法、标的选择等,可以获得更好的策略效果。总体来说,本策略为日内交易者提供了一种简单可行的平仓策略思路。

|| 

## Overview

The core idea of this strategy is to buy stocks at market close and sell them at next day's market open, in order to profit from the price increase at open.

## Strategy Logic

The strategy is based on two judgments:

1. Intraday traders tend to go long at market open, driving up opening prices.

2. Closing prices reflect the true value of stocks.

Specifically, the strategy checks if the closing price is above the 200-day simple moving average at market close (20:00). If yes, it goes long. If not, it goes short. 

At next day's market open (9:30), it closes long positions opened on previous day, and closes short positions as well.

By buying at low closing prices and selling at high opening prices, it aims to profit from the opening price increase.

## Advantage Analysis

The advantages of this strategy:

1. Utilize intraday traders' inertia to go long at open and sell for profit.

2. The 200-day MA helps identify the trend.

3. Low frequency with only two trade points daily reduces transaction costs.

4. Backtesting provides confidence in parameters.

5. Automated system minimizes emotional interference.

## Risk Analysis

The risks to consider:

1. Opening price may reverse sharply resulting in losses.

2. Closing price may be manipulated.

3. Stock suspension may prevent opening positions. 

4. High transaction costs make frequent trading expensive.

5. Improper parameter tuning leads to excessive trading or losses.

Solutions include:

1. Set stop loss to limit losses.

2. Check volume and adjustments to validate closing price.

3. Prioritize liquid stocks.  

4. Optimize MA length and trade times.

## Improvement Directions

The strategy can be improved by:

1. Adding stops to cut losses on opening reversal.

2. Using other indicators to determine price range.

3. Considering liquidity risk and selecting liquid stocks.

4. Testing different MA parameters. 

5. Optimizing open/close times.

6. Checking news for closing price validity. 

7. Considering transaction costs and selecting low-cost stocks.

8. Using multifactor models.

## Conclusion

The strategy profits from the opening price increase by buying low at close and selling high at open. It has some advantages but also risks to consider. Further optimizations on parameters, stops, stock selection can improve performance. Overall it provides a simple closing position strategy idea for intraday traders.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-10 00:00:00
end: 2023-11-09 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Youngmoneyinvestments

//@version=5
strategy("End of Day Trading Strategy", overlay=true)

// Get the daily open, high, low, and close prices
daily_open = request.security(syminfo.tickerid, "D", open)
daily_close = request.security(syminfo.tickerid, "D", close)

// Calculate the 200 period SMA on daily close
sma200 = ta.sma(daily_close, 200)

// Define the entry and exit conditions
end_of_day = (hour == 20) and (minute == 0) // Assuming the end of the regular trading hours is 20:00
start_of_day = (hour == 9) and (minute == 30) // Assuming the start of the trading session is 09:30

long_condition = end_of_day and (daily_close > sma200)
short_condition = end_of_day and (daily_close < sma200)

// Execute the strategy logic
if (long_condition)
    strategy.entry("Long", strategy.long)
if (short_condition)
    strategy.entry("Short", strategy.short)

// Exit conditions
if (strategy.position_size > 0 and start_of_day) // If we are long, sell at the open of the session
    strategy.close("Long")
if (strategy.position_size < 0 and start_of_day) // If we are short, buy at the open of the session
    strategy.close("Short")

// Plot the SMA on the chart
plot(sma200, "200 SMA", color=color.blue)

```

> Detail

https://www.fmz.com/strategy/431676

> Last Modified

2023-11-10 14:25:30
