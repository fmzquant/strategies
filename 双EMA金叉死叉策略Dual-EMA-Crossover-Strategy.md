
> Name

双EMA金叉死叉策略Dual-EMA-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/51204abb4e5a6ff609.png)

[trans]


## 概述

该策略是基于双EMA指标的金叉死叉交易策略。策略通过计算快线EMA和慢线EMA,在快线上穿慢线时做多,在快线下穿慢线时平仓。该策略简单易行,适合中短期交易。

## 策略原理

该策略主要基于双EMA指标实现。首先计算快线EMA和慢线EMA。快线EMA周期短,能 sensitively 反映价格变化;慢线EMA周期长,反映长期趋势。 当快线从下方上穿慢线时产生金叉信号,表示短期价格上涨势头强劲,可以买入做多;当快线从上方下穿慢线时产生死叉信号,表示短期价格下跌势头强劲,应该平仓。

具体来说,该策略主要包含以下步骤:

1. 输入快线EMA和慢线EMA的参数,包括SMA周期长度,数据源等

2. 计算快线EMA和慢线EMA

3. 定义金叉时机:快线从下方上穿慢线

4. 定义死叉时机:快线从上方下穿慢线 

5. 在金叉时买入做多

6. 在死叉时平仓

7. 可选择是否允许做空,以及是否使用止损止盈策略

8. 输出买入卖出的消息通知

通过这种简单的双EMA交叉策略,可以顺势捕捉价格短期趋势,实现收益。

## 优势分析

该策略具有以下优势:

1. 策略思路简单清晰,容易理解掌握。

2. 仅需要双EMA指标,实现方便。

3. 可以顺势捕捉价格短期趋势,套利获得波动收益。

4. 可自定义EMA周期,灵活适应不同周期的市场环境。

5. 可选择是否允许做空,灵活控制策略风险。

6. 可选择是否使用止损止盈策略,控制交易风险。

7. 可输出买卖消息通知,方便监控。

8. 策略容易优化,可灵活设置EMA参数,优化获利空间。

## 风险分析

该策略也存在一些风险:

1. 双EMA策略容易产生虚假信号,可能导致不必要的亏损。

2. 止损点设置不合理可能扩大亏损。

3. 交易频率可能过高,增加交易成本和滑点风险。

4. 固定EMA参数无法适应市场变化。

5. 容易追高杀跌,失去平静判断。

6. 无法判断趋势反转,可能反向开仓。

对应风险管理措施:

1. 优化EMA参数,降低虚假信号概率。

2. 合理设置止损点,控制单笔亏损。

3. 优化EMA周期,降低交易频率。 

4. 不同市场阶段可以动态调整EMA参数。

5. 增加趋势判断指标,避免追涨杀跌。

6. 结合趋势判断指标,确定大趋势方向。

## 优化方向 

该策略可以从以下方面进行优化:

1. 动态优化EMA参数,不同市场阶段采用不同EMA周期组合,优化参数套利效果。

2. 增加股票筛选条件,满足一定条件的股票再进行策略交易,提高成功率。

3. 结合波动率指标,在低波动阶段降低仓位规避风险。

4. 结合成交量指标,在高量能确认趋势才产生信号。

5. 设置价格条件,例如突破20日线再进行EMA策略交易。

6. 优化止损策略,并设置止盈条件锁定利润。

7. 增加对大级别趋势判断,避免逆势开仓。

8. 结合深度学习算法以及各种机器学习算法持续优化策略。

## 总结

综上所述,该双EMA金叉死叉策略整体思路简单清晰,易于理解和实现,可以顺势捕捉价格波动获利,但也存在一定盈利风险。我们可以通过参数优化、止损止盈、股票过滤、大级别趋势判断等手段来控制风险,平稳获得满意回报。该策略可以不断优化升级,值得持续研究与改进。

||


## Overview

This is a dual EMA crossover trading strategy based on fast EMA and slow EMA indicators. The strategy generates long signals when the fast EMA crosses above the slow EMA, and closes long positions when the fast EMA crosses below the slow EMA. The strategy is simple and practical for medium-term trading.  

## Strategy Logic

The strategy is mainly implemented with the dual EMA indicators. The fast EMA has a shorter period to sensitively reflect price changes, while the slow EMA has a longer period to indicate long term trends. 

When the fast EMA crosses above the slow EMA, a golden cross is formed, indicating upward price momentum in the short term for going long. When the fast EMA crosses below the slow EMA, a death cross is formed, showing downward momentum to close long positions.

Specifically, the strategy includes:

1. Input parameters for fast and slow EMA, including period, source etc.

2. Calculate fast EMA and slow EMA.

3. Define golden cross when fast EMA crosses above slow EMA. 

4. Define death cross when fast EMA crosses below slow EMA.

5. Go long on golden crosses.

6. Close positions on death crosses.  

7. Options for shorting and stop loss/profit taking.

8. Output buy and sell notifications.

With this simple dual EMA crossover system, the strategy can catch short-term trends for profits.

## Advantage Analysis 

The strategy has the following advantages:

1. The logic is simple and clear, easy to understand.

2. Only uses dual EMA, easy to implement. 

3. Can catch short-term trends for swing profits.

4. Customizable EMA periods for different markets.

5. Option for shorting to control risks.

6. Option for stop loss/profit taking. 

7. Buy/sell notifications for monitoring.

8. Easy to optimize EMA parameters for better profits.

## Risk Analysis

There are also some risks:

1. Dual EMA may generate false signals causing unnecessary losses.

2. Improper stop loss setting may magnify losses.

3. High trading frequency increases costs and slippage risks.

4. Fixed EMA parameters cannot adapt to market changes.

5. Prone to chasing momentum, lose calm judgement. 

6. Cannot identify trend reversal, may open reverse positions.

Corresponding risk management measures:

1. Optimize EMA parameters to reduce false signals.

2. Set proper stop loss to limit per trade loss.

3. Optimize EMA periods to reduce frequency.

4. Adjust EMA dynamically for different market stages.

5. Add trend indicators to avoid chasing momentum. 

6. Identify major trend direction with trend tools.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Dynamic optimization of EMA parameters for different markets.

2. Add stock filters to improve accuracy. 

3. Incorporate volatility index to reduce position in low volatility environments.

4. Add volume confirmation for signals.

5. Set price levels, like 20SMA breakout before taking signals.

6. Improve stop loss and take profit strategies. 

7. Add analysis of major trend to avoid trading against trend. 

8. Continuously optimize the strategy with machine learning algorithms.

## Summary

In summary, the dual EMA crossover strategy has simple and clear logic for capturing short-term trends, but also has some profit risks. We can manage risks by optimizing parameters, implementing stop loss/profit taking, filtering stocks, judging major trends etc, to steadily obtain satisfactory returns. The strategy can be incrementally improved with continuous research and enhancements.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Fast MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|3|Fast MA Period|
|v_input_3_close|0|Slow MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|9|Slow MA Period|
|v_input_5|false|Allow Shorting?|
|v_input_6|false|Use Initial Stop Loss?|
|v_input_7|25|Initial Stop Loss Points|
|v_input_8|false|Use Trailing Stop?|
|v_input_9|120|Trail Points|
|v_input_10|false|Use Offset For Trailing Stop?|
|v_input_11|20|Trail Offset Points|
|v_input_12|Buy message|Buy Alert Message|
|v_input_13|Sell message|Sell Alert Message|
|v_input_14|timestamp(2021-01-01T00:00:00)|startDate|
|v_input_15|timestamp(2021-12-31T00:00:00)|finishDate|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-15 00:00:00
end: 2023-10-15 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy("EMA Strategy", shorttitle="EMA Strategy", overlay=true, pyramiding=0, default_qty_type=strategy.percent_of_equity, default_qty_value=100)


// === Inputs ===
// short ma
maFastSource = input(defval=close, title="Fast MA Source")
maFastLength = input(defval=3, title="Fast MA Period", minval=1)

// long ma
maSlowSource = input(defval=close, title="Slow MA Source")
maSlowLength = input(defval=9, title="Slow MA Period", minval=1)

// invert trade direction
shorting = input(defval=false, title="Allow Shorting?")
// risk management
useStop = input(defval=false, title="Use Initial Stop Loss?")
slPoints = input(defval=25, title="Initial Stop Loss Points", minval=1)
useTS = input(defval=false, title="Use Trailing Stop?")
tslPoints = input(defval=120, title="Trail Points", minval=1)
useTSO = input(defval=false, title="Use Offset For Trailing Stop?")
tslOffset = input(defval=20, title="Trail Offset Points", minval=1)

// Messages for buy and sell
message_buy  = input("Buy message", title="Buy Alert Message")
message_sell   = input("Sell message", title="Sell Alert Message")

// Calculate start/end date and time condition
startDate  = input(timestamp("2021-01-01T00:00:00"), type = input.time)
finishDate = input(timestamp("2021-12-31T00:00:00"), type = input.time)
 
time_cond  = true

// === Vars and Series ===
fastMA = ema(maFastSource, maFastLength)
slowMA = ema(maSlowSource, maSlowLength)

plot(fastMA, color=color.blue)
plot(slowMA, color=color.purple)

goLong() =>
    crossover(fastMA, slowMA)
killLong() =>
    crossunder(fastMA, slowMA)
strategy.entry("Buy", strategy.long, when=goLong() and time_cond, alert_message = message_buy)
strategy.close("Buy", when=killLong() and time_cond, alert_message = message_sell)

// Shorting if using
if shorting
    strategy.entry("Sell", strategy.short, when=killLong() and time_cond, alert_message = message_sell)
    strategy.close("Sell", when=goLong() and time_cond, alert_message = message_buy)

if useStop
    strategy.exit("XLS", from_entry="Buy", stop=strategy.position_avg_price / 1.08)
    strategy.exit("XSS", from_entry="Sell", stop=strategy.position_avg_price * 1.08)


```

> Detail

https://www.fmz.com/strategy/429389

> Last Modified

2023-10-16 16:15:38
