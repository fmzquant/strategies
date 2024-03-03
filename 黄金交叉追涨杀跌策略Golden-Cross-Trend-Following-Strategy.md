
> Name

黄金交叉追涨杀跌策略Golden-Cross-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/4d231ecf1382eaf502.png)

[trans]

## 概述

本策略通过计算短期移动平均线和长期移动平均线的黄金交叉来判断入场时机,并设定止损点来退出仓位,属于典型的趋势跟踪策略。该策略适用于具有明显上升趋势的市场,能够顺势而为,在趋势向上行情中乘势而上,在趋势反转时及时止损。

## 策略原理

该策略主要通过计算短期移动平均线和长期移动平均线,并观察它们的交叉情况来判断行情趋势。具体逻辑如下:

1. 计算3日简单移动平均线short_ma作为短期移动平均线

2. 计算19日简单移动平均线long_ma作为长期移动平均线 

3. 当短期移动平均线上穿长期移动平均线时,发出做多信号,进入长仓

4. 当价格上涨突破入场价*(1+止损幅度%)时,平掉全部头寸

5. 当短期移动平均线下穿长期移动平均线时,发出做空信号,进入空仓

6. 通过在特定日期范围内进行回测,限定策略的运行时间范围

7. 通过计算100日简单移动平均线作为大趋势指标,只有当大趋势向上时,才进行交易

该策略充分利用了移动平均线的黄金交叉原理,在指数持续上涨的趋势中,短期移动平均线上穿长期移动平均线时进入多仓,能够有效捕捉趋势上的机会;当短期移动平均线下穿长期移动平均线时,退出多仓并进入空仓,能够有效控制风险。

## 优势分析

该策略具有以下优势:

1. 策略思路清晰易懂,通过移动平均线交叉判断趋势方向,容易掌握。

2. 入场判断规则简单有效,能够顺势而为,有效控制风险。

3. 设置止损点来锁定盈利,可以在行情反转时及时止损。

4. 仅在大趋势向上时进行交易,能过滤掉大部分震荡期的虚假信号。

5. 可自定义移动平均线参数,适应不同市场的特点。

6. 可设置回测时间范围,能针对特定时间段进行验证。

## 风险分析

该策略也存在一些风险:

1. 移动平均线策略对参数敏感,不同的参数设置会影响策略表现。

2. 仅基于历史数据进行曲线拟合,无法处理异常情况。

3. 无法有效处理价格跳空的情况,可能导致超出止损点。

4. 在震荡行情中容易被套,需设置合理的止损点。

5. 仅适用于趋势明显的市场环境,不适合横盘震荡市场。

6. 回测时间范围的选择会影响策略验证结果。

## 优化方向

该策略可从以下几个方面进行优化:

1. 尝试不同参数组合,寻找最佳参数,如移动平均线周期数等。

2. 增加其他技术指标进行综合判断,如MACD,Bollinger Bands等,提高决策效果。 

3. 设置动态跟踪止损来更好控制风险。

4. 优化入场、止损逻辑,如考虑突破前期高点入场等。

5. 测试不同的市场环境数据,评估策略稳定性。

6. 考虑加入机器学习等模型进行参数优化或信号判断。

7. 增加对价格跳空、止损被套的异常情况处理。

## 总结

本策略通过简单有效的移动平均线交叉原理实现了对上升趋势的捕捉,设置止损点来控制风险,在趋势明显的市场中能够获得较好收益。但该策略也存在一定局限性,需要继续进行优化测试,才能使策略更稳定和高效。总体来说,该策略思路清晰,易于理解和实现,适合初学者学习。

||

## Overview

This strategy generates trading signals based on the golden cross of short-term and long-term moving averages to determine entry points, and sets stop loss points to exit positions. It is a typical trend following strategy. It is suitable for markets with obvious upward trends, allowing it to follow the trend and profit from upward momentum, and exit promptly when the trend reverses.

## Strategy Logic

The strategy mainly uses the crossover of short-term and long-term moving averages to determine market trend. The logic is as follows:

1. Calculate 3-day simple moving average short_ma as the short-term moving average.

2. Calculate 19-day simple moving average long_ma as the long-term moving average.

3. When short_ma crosses above long_ma, a long signal is generated. 

4. When price rises above entry price * (1 + stop loss %), close all positions. 

5. When short_ma crosses below long_ma, a short signal is generated.

6. Backtest within a specific date range to limit the strategy's operation period.

7. Trade only when the 100-day moving average trend_ma suggests an upward trend.

The strategy utilizes the golden cross of moving averages. During a sustained uptrend, long signals generated when short_ma crosses above long_ma allow it to capture opportunities. Short signals when short_ma crosses below long_ma help manage risks.

## Advantage Analysis 

The advantages of this strategy:

1. Simple and easy to understand logic based on moving average crossovers.

2. Clear entry and exit rules that follow the trend and manage risks.

3. Stop loss to lock in profits when trend reverses.

4. Only trade when overall trend is up to avoid false signals.

5. Customizable moving average periods adaptable to different markets. 

6. Backtest over specific periods allows validation.

## Risk Analysis

The risks of this strategy:

1. Sensitive to parameter tuning, different settings affect performance.

2. Curve fitted to historical data, ineffective in anomalies.

3. Unable to handle price gaps, risks exceeding stop loss. 

4. Prone to being whipsawed in ranging markets.

5. Only works in obvious trending markets, not for sideways.

6. Backtest period selection influences results.

## Enhancement Opportunities

The strategy can be improved in the following aspects:

1. Test different parameter sets to find optimum values.

2. Incorporate other indicators like MACD, Bollinger Bands to improve decisions.

3. Use dynamic trailing stop loss to better control risks.

4. Optimize entry, exit logic, like breakout entry.

5. Test robustness across different market conditions. 

6. Explore machine learning for parameter tuning and signal generation.

7. Add handling of price gaps and stop loss whipsaw scenarios.

## Conclusion

This simple and effective strategy captures uptrends using moving average crosses and manages risk via stop loss. It performs well in strong trending markets but has limitations. Further optimization and testing is needed to improve robustness. Overall it has clear logic, is easy to understand and implement, suitable for beginners to learn.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|3|단기 이평|
|v_input_int_2|19|장기 이평|
|v_input_float_1|3|최소수익률%|
|v_input_int_3|100|(?추세 이평) 추세 이평|
|v_input_bool_1|true|추세용 이평 사용|
|v_input_bool_2|true|(?기간 백테스트)특정 기간 백테스트|
|v_input_1|timestamp(1 Jan 2021)|시작날짜|
|v_input_2|timestamp(1 Jan 2022)|종료날짜|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Ta3MooChi
//@version=5
strategy("전략", overlay=true,process_orders_on_close = true, pyramiding = 100)

short_ma = ta.sma(close,input.int(3, "단기 이평", minval = 1))
long_ma = ta.sma(close, input.int(19,"장기 이평", minval = 1))

trend_ma = ta.sma(close, input.int(100," 추세 이평", minval = 20, group = "추세 이평"))
up_trend = (trend_ma > trend_ma[1])
use_trend_ma = input.bool(true, title = "추세용 이평 사용", group = "추세 이평" )
inTrendMa = not use_trend_ma or up_trend

useDateFilter = input.bool(true, title = "특정 기간 백테스트", group = "기간 백테스트")
backtestStartDate = input(timestamp("1 Jan 2021"), title = "시작날짜", group = "기간 백테스트")
backtestEndDate = input(timestamp("1 Jan 2022"), title = "종료날짜", group = "기간 백테스트")
inTradeWindow = true

longStopPerc = 1 + input.float(3, "최소수익률%", minval = 1)*0.01

longcondition = ta.crossover(short_ma, long_ma)
shortcondition = ta.crossunder(short_ma, long_ma)

if (longcondition) and inTradeWindow and inTrendMa
    strategy.entry("long", strategy.long)

if (shortcondition) and (close > strategy.position_avg_price*longStopPerc) and inTradeWindow
    strategy.close_all()

if not inTradeWindow and inTradeWindow[1]
    strategy.cancel_all()
    strategy.close_all(comment = "매매 종료")

plot(short_ma,color = color.yellow)
plot(long_ma,color = color.blue)
plot(trend_ma,color = color.gray)
    


```

> Detail

https://www.fmz.com/strategy/430773

> Last Modified

2023-11-01 17:02:14
