
> Name

基于移动平均线金叉死叉的交易策略BTC-Trading-Strategy-Based-on-Moving-Average-Crossover

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/bd2658810f4d45a56f.png)
[trans]

## 概述

本策略基于BTC的50日移动平均线和200日移动平均线的金叉死叉信号,结合额外的技术指标判断来发出买入和卖出信号。该策略主要适用于BTC/USDT这种具有明显趋势性特征的币对。

## 策略原理

当50日移动平均线上方突破200日移动平均线而形成“金叉”时,表示BTC进入多头市场,产生买入信号。而当50日移动平均向下突破200日移动平均线而形成“死叉”时,表示BTC进入空头市场,产生卖出信号。

该策略除了基本的移动平均线“金叉”和“死叉”信号判断以外,还加入了一些额外的技术指标来辅助判断,这些指标包括:

1. EMA指标:计算一个 length+offset 的 EMA 指标,当其上涨时表明目前处于多头市场,可以买入。

2. 比较移动平均线与EMA的数值关系:如果EMA值高于50日移动平均线,则产生买入判断。

3. 检查价格比上一根K线的低点下跌1%以上,如果满足则产生卖出信号。

通过组合运用上述几个指标,可以过滤掉一些错误信号,使策略交易决策更加可靠。

## 优势分析

该策略具有以下几个优势:

1. 使用移动平均线作为主要交易信号,可过滤市场噪音,识别趋势方向。

2. 结合EMA等多种辅助技术指标,可以增强信号的可靠性,过滤假信号。 

3. 采用适当的止损策略,可以有效控制单笔损失。

4. 较为简单的交易逻辑,容易理解实现,适合量化交易初学者。

5. 可配置参数较多,可以按照自己的偏好进行调整。

## 风险分析

该策略也存在一些风险需要注意:

1. 移动平均线本身滞后性较强,可能错过价格快速反转的机会。

2. 辅助指标增加了规则数量,也提高了产生错误信号的概率。

3. 止损设置不当可能导致亏损扩大。

4. 参数设置(如移动平均线长度等)不当也会影响策略效果。

对应解决方法:

1. 适当缩短移动平均线周期,增大参数优化范围。

2. 增加回测数据量,检查信号质量。

3. 适当放宽止损幅度,同时设置盈利止盈。

4. 增加参数优化,寻找最佳参数组合。

## 优化方向

该策略还可从以下几个方向进行优化:

1. 增加机器学习算法,实现参数的自动优化。

2. 加入更多辅助指标,构建多个子策略,通过投票机制产生决策。

3. 尝试 Breakout 策略,识别价格突破。

4. 利用深度学习预测价格趋势。

5. 优化止损机制,实现动态跟踪止损。

以上优化可以提高决策的准确性,增强策略的盈利能力和稳定性。

## 总结

本策略主要基于BTC的移动平均线交叉进行交易决策,辅以EMA等技术指标来过滤信号。该策略具有较强的趋势跟踪能力,可配置性也较高,适合作为量化交易的入门策略。但也存在一定的滞后性风险,需要注意防范。接下来的优化方向可以从机器学习、集成策略、止损策略等多个层面进行。

||

## Overview

This strategy is based on the golden cross and death cross signals of the 50-day moving average and the 200-day moving average of BTC, combined with additional technical indicators to generate buy and sell signals. This strategy is mainly suitable for currency pairs with obvious trend characteristics like BTC/USDT.

## Strategy Principle  

When the 50-day moving average crosses above the 200-day moving average to form a "golden cross", it indicates that BTC has entered a bull market and generates a buy signal. While when the 50-day moving average crosses below the 200-day moving average to form a "death cross", it indicates that BTC has entered a bear market and generates a sell signal.

In addition to the basic moving average "golden cross" and "death cross" signal judgment, this strategy also incorporates some additional technical indicators to assist in judgment, including:

1. EMA indicator: Calculate an EMA indicator with length+offset, when it goes up indicates the current market is bullish, we can buy.

2. Compare the value relationship between moving average and EMA: If EMA value is higher than 50-day moving average, a buy signal is generated.  

3. Check if the price has fallen more than 1% compared to the low of the previous K-line, if so generate a sell signal.

By combining the use of several indicators above, some wrong signals can be filtered out and the trading decisions of the strategy can be more reliable.

## Advantage Analysis

This strategy has the following advantages:

1. Using moving averages as the main trading signal can filter market noise and identify trend direction.

2. Combining with multiple auxiliary technical indicators can enhance signal reliability and filter out false signals.

3. Adopting appropriate stop-loss strategies can effectively control single loss.

4. The relatively simple trading logic is easy to understand and implement, suitable for beginners of quantitative trading. 

5. There are many configurable parameters that can be adjusted according to your own preferences.

## Risk Analysis

This strategy also has some risks to note:

1. The moving average itself has a strong lagging attribute, possibly missing opportunities for rapid price reversal.

2. Adding assistant indicators increases the number of rules and also increases the probability of generating wrong signals.  

3. Improper stop-loss settings may lead to enlarged losses.

4. Inappropriate parameter settings (such as moving average length, etc.) will also affect strategy results.

The corresponding solutions:

1. Appropriately shorten the moving average cycle and increase the parameter optimization range.

2. Increase backtest data quantity to check signal quality.  

3. Properly relax the stop loss range while setting take profit stops.

4. Increase parameter optimization to find the best parameter combinations.

## Optimization Directions

This strategy can also be optimized in the following directions:

1. Increase machine learning algorithms to achieve automatic parameter optimization.  

2. Add more auxiliary indicators to build multiple sub-strategies and make decisions through a voting mechanism.

3. Try breakout strategies to identify price breakthroughs.

4. Use deep learning to predict price trends.

5. Optimize stop-loss mechanisms to achieve dynamic tracking stop-loss.

The above optimizations can improve decision accuracy and enhance the profitability and stability of the strategy.


## Summary  

This strategy mainly makes trading decisions based on the moving average crossover of BTC, assisted by technical indicators such as EMA to filter signals. The strategy has strong trend-following capability and high configurability, making it suitable as a beginner's quantitative trading strategy. But there are also certain lagging risks that need to be guarded against. The next optimization directions can be from multiple dimensions such as machine learning, portfolio strategies, stop-loss strategies, etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|50|MA50-Length|
|v_input_1_close|0|MA50-Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|true|Show SMA50 on chart|
|v_input_int_2|200|MA200-Length|
|v_input_3_close|0|MA200-Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|true|Show SMA200 on chart|
|v_input_int_3|2|EMA Offset|
|v_input_5|true|Show EMA on chart|
|v_input_int_4|20|ema Length|
|v_input_6|timestamp(20 Jan 2000 00:00)|StartFrom|
|v_input_timeframe_1|240|(?EMA Options)Ma50 Timeframe|
|v_input_timeframe_2|D|Ma200 Timeframe|
|v_input_timeframe_3|240|EMA 1 Timeframe|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-06 00:00:00
end: 2023-12-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('JayJay BTC Signal', overlay=true, initial_capital=100, currency='USD', default_qty_value=100, default_qty_type=strategy.percent_of_equity, commission_value=0, calc_on_every_tick=true)

securityNoRepaint(sym, tf, src) => request.security(sym, tf, src[barstate.isrealtime ? 1 : 0])[barstate.isrealtime ? 0 : 1]

//200 50 Moving Average
ma50Len = input.int(50, minval=1, title='MA50-Length')
ma50Src = input(close, title='MA50-Source')
ma50Show = input(true, title='Show SMA50 on chart')
ma50Close = ta.sma(ma50Src, ma50Len)
ma50CloseTimeframe = input.timeframe("240", "Ma50 Timeframe", group = "EMA Options")
ma50Open = ta.sma(open, ma50Len)
ma200Len = input.int(200, minval=1, title='MA200-Length')
ma200Src = input(close, title='MA200-Source')
ma200Show = input(true, title='Show SMA200 on chart')
ma200CloseTimeframe = input.timeframe("D", "Ma200 Timeframe", group = "EMA Options")
ma200Close = ta.sma(ma200Src, ma200Len)
ma200Open = ta.sma(open, ma200Len)
//plot(ma200Close, color=color.new(#0b6ce5, 0), title='MA200')
//plot(ma50Close, color=color.new(#00d8ff, 0), title='MA50')

sma50 = securityNoRepaint(syminfo.tickerid, ma50CloseTimeframe, ma50Close)
plot(sma50 and ma50Show ? sma50 : na, color=color.new(#00d8ff, 0), title='SMA50')
sma200 = securityNoRepaint(syminfo.tickerid, ma200CloseTimeframe, ma200Close)
plot(sma200 and ma200Show ? sma200 : na, color=color.new(#00d8ff, 0), title='SMA200')

// Short/Long EMA
// Define the offset value
EMAOffsetValue = input.int(2, title='EMA Offset', minval=0)
emaplot = input(true, title='Show EMA on chart')
len = input.int(20, minval=1, title='ema Length') + EMAOffsetValue
emaCloseTimeframe = input.timeframe("240", "EMA 1 Timeframe", group = "EMA Options")
emaOpen = ta.ema(open, len)
emaClose = ta.ema(close, len)

ema = securityNoRepaint(syminfo.tickerid, emaCloseTimeframe, emaClose)

up = emaClose > ema[1]
down = emaClose < ema[1]
mycolor = up ? color.green : down ? color.red : color.blue

plot(ema and emaplot ? ema : na, title='Signal EMA', color=mycolor, linewidth=3)
//plot(emaClose and emaplot ? emaClose : na, title='Signal 20 EMA', color=color.yellow, linewidth=3)

ma50GreaterThanMa200 = sma50 > sma200

last3BarUp = ema > ema[1]

startLong = up and ema > sma50 and ma50GreaterThanMa200 and (100 - (sma50 / ema * 100) > 1.0)

startFrom = input(timestamp("20 Jan 2000 00:00"), "StartFrom")

yearFilter = true

alertLongPositionMessage = "{\"direction:\": \"long\", \"action\": \"{{strategy.order.action}}\", \"price\": \"{{strategy.order.price}}\", \"qty\": \"{{strategy.position_size}}\", \"symbol\": \"{{ticker}}\", \"date\": \"{{time}}\"}"

if true and startLong and yearFilter
    strategy.entry('Long', strategy.long, comment = "Long", alert_message = alertLongPositionMessage)

longStopLossLevel = open * 0.05
strategy.exit('StopLoss', from_entry='Long',comment = "StopLoss!", loss=longStopLossLevel, profit=close * 0.3, alert_message = alertLongPositionMessage)
longPercentageChange = low / close[1] * 100 - 100
is1PercentLower = longPercentageChange < -0.1
closeLongPositionWhen = (down and is1PercentLower) or (emaClose < sma50)
if closeLongPositionWhen
    strategy.close('Long', comment = "Fuck It!", alert_message =  alertLongPositionMessage)

bgcolor(startLong ? color.green : na, transp=90)


```

> Detail

https://www.fmz.com/strategy/434546

> Last Modified

2023-12-07 14:56:50
