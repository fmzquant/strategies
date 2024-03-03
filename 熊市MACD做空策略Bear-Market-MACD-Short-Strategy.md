
> Name

熊市MACD做空策略Bear-Market-MACD-Short-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略原理

该策略专注于熊市下跌行情中的做空交易,同时确保资产处于大周期下行通道中,然后在进一步下跌后止盈退出。

主要交易逻辑是:

1. 计算MACD指标的快线、慢线和柱状线

2. 当MACD快线下穿慢线,表示开始进入下跌趋势

3. 价格低于450日移动平均线,确认处于下行长期趋势中 

4. 当上述两个条件满足时,做空入场

5. 止盈线设定为入场价的8%下方

6. 止损线设定为入场价的4%上方

该策略充分利用MACD判断短期趋势转向,并辅助长期均线判断大趋势,避免盲目做空。止盈止损策略控制风险。

## 策略优势

- MACD判断短期下跌机会 

- 长期均线过滤避免做空反转

- 止盈止损比为2:1,控制风险

## 策略风险

- 需要优化MACD参数

- 长期均线容易滞后产生错误信号

- 仅做空无法利用多头机会

## 总结

该策略在确保大趋势为下行的情况下,捕捉短期下跌机会做空。止盈止损策略 Optimization和组合管理对策略效果至关重要。


||


## Strategy Logic

This short strategy focuses on downside moves during bear markets, while ensuring the asset trades within a long-term downtrend, exiting after further downside. 

The logic is:

1. Compute MACD short, long and histogram lines

2. Bearish MACD crossover signals potential downtrend

3. Price below 450-day MA confirms long-term downtrend

4. Enter short when both conditions met 

5. Take profit set at 8% below entry price 

6. Stop loss set at 4% above entry price

It utilizes MACD for short-term turns and long MA to avoid blind shorting. Profit/loss controls risk.

## Advantages

- MACD signals short-term downside potential

- Long MA filter avoids shorting reversals 

- 2:1 profit/loss ratio controls risk

## Risks

- Requires MACD parameter tuning

- Long MA prone to lagging signals

- SHORT only misses long opportunities 

## Summary

This strategy captures short-term down moves when ensured of a bear trend. Profit/loss tuning and position sizing are key for performance.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule

//@version=5
strategy("Shorting Bearish MACD Cross with Price Below EMA 450 (By Coinrule)", overlay=true, initial_capital = 10000, default_qty_value = 30, default_qty_type = strategy.percent_of_equity, commission_type=strategy.commission.percent, commission_value=0.1)

// EMAs 
slowEMA = ta.ema(close, 450)

// MACD
[macdLine, signalLine, histogramLine] = ta.macd(close, 11, 26, 9)

// Conditions
goShortCondition1 = ta.crossunder(macdLine, signalLine)
goShortCondition2 = slowEMA > close

timePeriod = time >= timestamp(syminfo.timezone, 2021, 12, 1, 0, 0)
notInTrade = strategy.position_size <= 0
strategyDirection = strategy.direction.short

if (goShortCondition1 and goShortCondition2 and timePeriod and notInTrade)
    stopLoss = high * 1.04
    takeProfit = low * 0.92
    strategy.entry("Short", strategy.short)
    strategy.exit("exit","Short", stop=stopLoss, limit=takeProfit)
    
plot(slowEMA, color=color.green)

```

> Detail

https://www.fmz.com/strategy/426836

> Last Modified

2023-09-14 18:04:28
