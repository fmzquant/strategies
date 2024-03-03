
> Name

百分比止盈止损跟踪策略Percentage-Stop-Loss-Take-Profit-Trailing-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略是一种简单的趋势跟踪策略,它使用SMA均线判断趋势方向,并设置百分比止损止盈来锁定盈利和控制风险。属于移动止损策略类型。

## 策略原理

该策略首先计算长度为200天的SMA均线,当价格上穿均线时判断为趋势启动,做多入场。入场后,策略使用一个固定的百分比止损点,如入场价格的2%下方;同时也设置一个固定百分比的止盈点,如入场价格的1%上方。只要价格触碰到其中一个水平,策略就会关闭对应的头寸。

具体来看,策略以close价格和200天SMA均线的交叉做为交易信号。当close价格上穿SMA均线时,做多入场。入场后,策略记录下入场价格,并计算止损线=入场价*(1-止损百分比);止盈线=入场价*(1+止盈百分比)。如果价格下破止损线或上破止盈线,平掉对应的多单。 

这样,策略只要价格运行方向正确,就可以实现盈利;如果出现损失,也可以通过止损退出,限制损失额度。通过调整止损止盈百分比,可以控制策略的收益风险特征。

## 优势分析

- 操作简单,容易实现

以SMA均线判断趋势,百分比止盈止损非常简单直接,技术门槛低,容易实施。

- 可限制每个订单的损失

通过事先设置止损点,可以让每个订单的损失控制在一个已定的百分比以内,有助于风险控制。

- 跟踪止损,锁定盈利

止盈点会随着利润增加而上移,可以帮助策略锁定利润,而不是随着反转止损。

- 可自定义收益损失特征

通过调整止盈止损百分比,可以自由定义策略的风险收益特征。

## 风险分析

- 容易在震荡市场中被套牢

在趋势不明显的震荡区间,止损点可能频繁被触发,造成过多小额损失。

- 均线系统容易滞后

SMA均线本身滞后于价格,可能错过趋势的最佳入场时点。

- 未考虑交易成本

较小的止盈止损设置会增加交易频率,而没有考虑实际中的交易成本。

- 百分比止损未考虑波动

百分比止损设置是静态的,未考虑市场波动率的变化。大波动时容易被突破。

## 优化方向

- 优化参数,适应市场特征

调整均线参数,寻找最佳平衡点,并测试不同的止盈止损百分比。

- 结合波动率指标动态调整止损

根据市场最近期的波动率,动态调整止损百分比,降低止损被突破概率。

- 考虑实际交易成本进行回测

加入交易滑点和手续费等成本进行回测,优化止盈设置。

- 多时段回测与优化

分别在高活跃和低活跃时段进行回测,找到各时段最优参数。

## 总结

该策略整合均线判断趋势和百分比止盈止损管理盈亏,简单易行,可自由定义收益风险特征。但其交易信号和止损设置都有优化空间。需要考虑波动率adaptive止损、交易成本等因素进行优化调整,力求在简单的基础上获取稳定收益。

||


## Overview 

This is a simple trend following strategy that uses SMA to determine trend direction and sets percentage-based stop loss and take profit to lock in profits and control risk. It belongs to the moving stop loss strategy category.

## Strategy Logic

The strategy first calculates a 200-day SMA line. When price crosses above the SMA line, it signals an uptrend and goes long. After entering, the strategy uses a fixed percentage stop loss level, such as 2% below entry price, and a fixed percentage take profit level, such as 1% above entry price. It will close the position when either level is touched.

Specifically, the strategy uses close price crossing above the 200-day SMA as the trading signal. When close goes above SMA, it enters long. After entry, the strategy records entry price, and calculates stop loss = entry price * (1 - stop loss %); take profit = entry price * (1 + take profit %). If price drops below stop loss or rises above take profit, it will close the long position.

This way, the strategy can lock in profit as long as price moves in the right direction. If a loss occurs, it will be limited by the stop loss. By adjusting the percentages, profit and risk can be customized.

## Advantage Analysis

- Simple to implement

Using SMA for trend and percentage stop loss/take profit is straightforward and easy to implement.

- Limits loss per trade

The pre-set stop loss keeps the loss below a fixed percentage, helping to control risk.

- Trailing stop locks in profit

Take profit level moves up with profit increase, helping to lock in gains instead of being stopped out.

- Customizable profit/loss characteristics 

The percentages can be adjusted to define profit and risk parameters.

## Risk Analysis

- Whipsaws in ranging market

In choppy range-bound markets, stop loss may be frequently hit leading to small losses.

- SMA lags price

SMA itself lags price, can miss best entry timing.

- Ignores trading costs

Small stop/take profit settings increase frequency, without considering trading costs.

- Static percentage stop loss 

Percentage stop loss does not adapt to volatility changes. Easily taken out during big moves.

## Improvement Directions

- Optimize parameters for market

Adjust SMA parameters, test different stop/take percentages to find optimal balance.

- Dynamic stop based on volatility

Adjust stop percentage based on recent volatility to lower chance of stop out.

- Backtest with real trading costs

Incorporate slippage, commission costs for backtest to optimize take profit.

- Multi-session backtests

Separately backtest on high and low activity sessions to find best parameters.

## Summary

This strategy combines SMA for trend and percentage stop/take for profit management in a simple format while allowing profit/risk tuning. But its signals and stop setting can be improved. Aspects like volatility adaptive stops, trading costs etc should be considered to achieve steady results on a simple basis.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|SMA Lookback Period|
|v_input_2|2|Stop Loss %|
|v_input_3|true|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-25 00:00:00
end: 2023-09-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Stop Loss Example: Simple Stoploss", overlay=true)

sma_per = input(200, title='SMA Lookback Period', minval=1)
sl_inp = input(2.0, title='Stop Loss %', type=float)/100
tp_inp = input(1.0, title='Take Profit %', type=float)/100

sma = sma(close, sma_per)

stop_level = strategy.position_avg_price * (1 - sl_inp)
take_level = strategy.position_avg_price * (1 + tp_inp)

strategy.entry("Simple SMA Entry", strategy.long, when=crossover(close, sma))

strategy.exit("Stop Loss/TP","Simple SMA Entry", stop=stop_level, limit=take_level)

plot(sma, color=orange, linewidth=2)
plot(stop_level, color=red, style=linebr, linewidth=2)
plot(take_level, color=green, style=linebr, linewidth=2)
```

> Detail

https://www.fmz.com/strategy/427821

> Last Modified

2023-09-25 18:09:14
