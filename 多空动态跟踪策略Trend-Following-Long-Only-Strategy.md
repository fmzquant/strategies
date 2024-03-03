
> Name

多空动态跟踪策略Trend-Following-Long-Only-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f904a0be3ce94446cd.png)

[trans]

## 概述

多空动态跟踪策略是一个利用动态平均值跟踪价格趋势的策略。它通过计算一定周期内的最高价和最低价的移动平均来确定当前趋势,并结合ATR来实现动态止损止盈。该策略主要适用于具有明显趋势的市场,通过及时捕捉趋势反转来进行长期持仓。

## 策略原理

该策略首先计算一定周期(默认200日)内的最高价和最低价的移动平均值,并求二者的中点作为基准线。然后计算价格与基准线的偏离程度,当价格高于基准线一个ATR(默认10日ATR的0.5倍)时认为处于上涨趋势,当价格低于基准线一个ATR时认为处于下跌趋势。根据趋势状态 Entry 多头或空头头寸。

当价格重新回归基准线时产生 Exit 信号。此外,ATR 的动态变化可以使止损止盈随大趋势逐步拉伸,从而减少非趋势性波动带来的过频交易。

## 策略优势

1. 通过动态平均值能有效平滑价格数据,识别长期趋势方向
2. ATR止损使止损线能动态跟踪大趋势,避免过于敏感
3. 及时捕捉趋势反转,减少浪费资金的情况
4. 简单易懂的原理,容易实施

## 风险及对冲

1. 在震荡市中容易产生错误交易
2. 参数设置不当可能错过趋势反转时机
3. 大盘和个股可能存在背离,需要考虑股市多空状况

可以通过适当调整ATR参数降低止损敏感性,或加入其他指标筛选确定性强的交易时机。也可以结合大盘走势评估风险胃纳,选择是否仅在大盘多头行情中做多。

## 优化思路

1. 可以考虑在Entry信号后再通过其他指标进行二次确认,如KDJ指标等
2. 可以结合股票基本面情况优化参数,如高波动率股票适当放宽ATR范围
3. 可以根据回测结果优化ATR倍数大小,平衡盈利因子和换手率
4. 可以考虑在止损止盈机制中引入波动率的动态调整
5. 可以通过机器学习技术自动优化参数

## 总结

多空动态跟踪策略总体来说是一个简单实用的趋势跟踪策略。它通过动态平均线确定趋势方向,并利用ATR实现动态止损止盈,可以有效控制风险。该策略适合趋势明显的市场环境,通过及时捕捉趋势反转可以获得长期持有的超额收益。但需要注意防止在震荡行情中被套牢。通过参数优化和辅助决策可以进一步提高策略稳定性。

||


## Overview

The Trend Following Long Only Strategy is a strategy that tracks price trends using dynamic moving averages. It determines the current trend by calculating the moving averages of highest and lowest prices over a period and combines it with ATR for dynamic stop loss and take profit. This strategy works well in trending markets by catching trend reversals in a timely manner for long-term holding. 

## Strategy Logic

The strategy first calculates the moving averages of highest and lowest prices over a period (default 200 days) and takes their midpoint as the baseline. Then it measures the deviation of price from the baseline. If price is above baseline by 1 ATR (0.5 times 10-day ATR by default), it is considered an uptrend. If price is below baseline by 1 ATR, it is considered a downtrend. Long or short positions are entered based on the trend state. 

When price reverts to the baseline, exit signals are triggered. Also, the dynamic ATR allows stop loss and take profit to trail the major trend, avoiding over-trading on minor fluctuations.

## Advantages

1. Dynamic averages smooth price actions effectively to identify long-term trend direction
2. ATR-based stops trail the major trend dynamically avoiding excessive sensitivity
3. Timely catches of trend reversals reduce untimely capital waste
4. Simple logic easy to implement

## Risks and Mitigation

1. May generate false signals in ranging markets
2. Improper parameter tuning may miss trend reversals  
3. Divergence between market and individual stocks should be considered

Risks can be reduced by tweaking ATR parameters, adding filters for high probability setups, and evaluating market conditions and risk appetite.

## Improvement Ideas

1. Add secondary confirmation after initial entry signals using indicators like KDJ
2. Optimize parameters based on volatility, fundamentals of individual stocks
3. Fine tune ATR multiplier based on backtests to balance profit factor and turnover rate  
4. Introduce dynamic volatility adjustment in stop loss and take profit
5. Utilize machine learning techniques for automated parameter optimization

## Summary

The Trend Following Long Only Strategy is an easy-to-use trend trading system overall. It identifies trend direction using dynamic averages and sets risk controls with ATR-based stops. It can effectively catch profitable swings in trending markets. Ranging markets should be avoided to prevent whipsaws. Further improvements can be made through parameter tuning, adding filters and integrating machine learning techniques.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|Lookback Length|
|v_input_2|5|Smoother Length|
|v_input_3|10|ATR Length|
|v_input_4|0.5|ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-10 00:00:00
end: 2023-10-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Trend Following Long Only Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

lookback_length = input(200, type=input.integer, minval=1, title="Lookback Length")
smoother_length = input(5, type=input.integer, minval=1, title="Smoother Length")
atr_length = input(10, type=input.integer, minval=1, title="ATR Length")
atr_multiplier = input(0.5, type=input.float, minval=0.5, title="ATR Multiplier")

vola = atr(atr_length) * atr_multiplier
price = sma(close, 3)

l = ema(lowest(low, lookback_length), smoother_length)
h = ema(highest(high, lookback_length), smoother_length)
center = (h + l) * 0.5
upper = center + vola
lower = center - vola
trend = ema(price > upper ? 1 : (price < lower ? -1 : 0), 3)
c = trend < 0 ? upper : lower

pcenter = plot(center, transp=100)
pclose = plot(close, transp=100)
pc = plot(c, transp=100)

buy_signal = crossover(trend, 0.0) 
sell_signal = crossunder(trend, 0.0)

strategy.entry("Buy", strategy.long, when=buy_signal)
strategy.close("Buy", when=sell_signal)

bgcolor(trend >= 0 ? color.green : color.red, transp=95)
fill(pc, pclose, color=trend >= 0 ? color.green : color.red)
```

> Detail

https://www.fmz.com/strategy/429491

> Last Modified

2023-10-17 15:55:41
