
> Name

双均线金叉死叉止盈止损策略Dual-Moving-Average-Crossover-Strategy-with-Stop-Loss-and-Take-Profit

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/3802daea1d1af88c0e.png)
[trans]
### 概述

双均线金叉死叉止盈止损策略是一种趋势跟踪策略。它利用 Stochastic 指标的两个移动平均线 K 和 D 的金叉和死叉来判断买入和卖出时机。同时,它使用止盈止损来控制风险。

### 策略原理  

该策略的核心指标是 Stochastic 的快线 K 和慢线 D。快线 K 是 Stochastic 的原始值的 3 日简单移动平均线。慢线 D 是快线 K 的 3 日简单移动平均线。当快线上穿慢线时,产生金叉信号,表示多头趋势来临,可以买入。当快线下穿慢线时,产生死叉信号,表示空头趋势来临,可以卖出。

此外,该策略还设置了一个条件,就是只有当 Stochastic 的值在过冷区(低于 20)或过热区(高于 80)时,才产生交易信号。这可以过滤掉一些假信号。 

在入市后,该策略使用止盈止损来控制风险。止盈距离 entry price 为 120 个 tick,止损距离 entry price 为 60 个 tick。当价格触及止盈或止损水平时,会退出当前头寸。

### 策略优势  

- 利用 Stochastic 指标判断趋势方向,准确率较高
- 设置过冷区和过热区条件,可以过滤假信号
- 使用止盈止损,可以限制单笔损失,控制整体风险

### 策略风险  

- Stochastic 在横盘整理的市场中容易产生假信号
- 止盈止损距离固定,无法动态跟踪市场变化
- 无法限制最大回撤

风险解决方法:

- 增加其他指标进行组合,确定趋势
- 设置动态止盈止损
- 增加最大回撤退出机制

### 策略优化方向

- 利用 MACD、KDJ等其他指标和 Stochastic 组合,提高信号准确率
- 根据ATR设置动态止盈止损距离
- 增加最大回撤退出条件
- 优化止盈止损系数,寻找最佳参数

### 总结  

双均线金叉死叉止盈止损策略,是一种简单实用的趋势跟踪策略。它利用 Stochastic 的双均线系统判断入市时机,并使用止盈止损控制风险。该策略效果显著,容易实现,适合量化交易。通过进一步优化,可以成为稳定盈利的算法交易策略。

||

### Overview

The Dual Moving Average Crossover Strategy with Stop Loss and Take Profit is a trend following strategy. It uses the golden cross and death cross of the two moving averages K and D lines from the Stochastic indicator to determine entry and exit signals. It also utilizes stop loss and take profit to control risks.

### Strategy Logic

The core indicators of this strategy are the fast line K and slow line D of the Stochastic. The fast line K is the 3-period simple moving average of the raw Stochastic values. The slow line D is the 3-period simple moving average of the fast line K. When K line crosses above D line, a golden cross is generated, indicating an uptrend and long entry. When K line crosses below D line, a death cross is generated, indicating a downtrend and short entry.

In addition, this strategy sets a condition that trading signals are only triggered when the Stochastic value is within oversold territory (below 20) or overbought territory (above 80). This helps filter out some false signals.
 
After entering the market, this strategy uses stop loss and take profit to control risks. The take profit is set at 120 ticks away from entry price and stop loss is 60 ticks away from entry price. When price hits either level, the position will be closed.

### Advantages

- Utilize Stochastic indicator to determine trend direction accurately 
- Oversold and overbought condition filters out false signals
- Stop loss and take profit limits single trade loss and controls overall risk

### Risks

- Stochastic may generate false signals during range-bound markets
- Fixed stop loss and take profit fails to adapt dynamic market changes 
- Unable to limit maximum drawdown

Risk Solutions:

- Add other indicators like MACD, KDJ for combo confirmation 
- Set dynamic stop loss and take profit levels
- Add maximum drawdown exit mechanism

### Optimization Directions  

- Combine with MACD, KDJ etc. to improve signal accuracy
- Set dynamic stop loss/take profit base on ATR 
- Add maximum drawdown exit criteria
- Optimize stop loss/take profit coefficients for best parameters  

### Summary

The Dual Moving Average Crossover Strategy with Stop Loss and Take Profit is a simple and practical trend following strategy. It uses Stochastic's dual moving average system for entry timing and stop loss/take profit for risk control. This effective and easy-to-implement strategy is suitable for algorithmic trading. Further optimizations can turn it into a stable profitable trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|60|StopLoss Distance from entry price (in Ticks)|
|v_input_int_2|120|TakeProfit Distance from entry price (in Ticks)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Strategy alerts workaround", overlay=true) 
// disclaimer: this content is purely educational, especially please don't pay attention to backtest results on any timeframe/ticker

// Entries logic: based on Stochastic crossover
k = ta.sma(ta.stoch(close, high, low, 14), 3)
d = ta.sma(k, 3)
crossover = ta.crossover(k,d)
crossunder = ta.crossunder(k,d)

if (crossover and k < 20)
	strategy.entry("Buy", strategy.long, alert_message="buy")
if (crossunder and k > 80)
	strategy.entry("Sell", strategy.short, alert_message="sell")

// StopLoss / TakeProfit exits:
SL = input.int(60, title="StopLoss Distance from entry price (in Ticks)")
TP = input.int(120, title="TakeProfit Distance from entry price (in Ticks)")
strategy.exit("xl", from_entry="Buy", loss=SL, profit=TP, alert_message="closebuy")
strategy.exit("xs", from_entry="Sell", loss=SL, profit=TP, alert_message="closesell")

// logical conditions exits:
if (crossunder and k <= 80)
	strategy.close("Buy", alert_message="closebuy")
if (crossover and k >= 20)
	strategy.close("Sell", alert_message="closesell")
```

> Detail

https://www.fmz.com/strategy/442556

> Last Modified

2024-02-22 17:30:38
