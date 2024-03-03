
> Name

均线回转反转策略Mean-Reversion-Reverse-Strategy-Based-on-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/bf322c288034450b65.png)

[trans]

本策略命名为“均线回转反转策略”(Mean Reversion Reverse Strategy Based on Moving Average),其主要思想是在跌破关键均线后买入,并在达到预设目标利润后止盈。

该策略的主要原理是利用短期均线的回转,捕捉盘整行情中的反弹机会。具体来说,当价格跌破较长周期的均线(如20日线、50日线等)后表现出较强的超跌迹象,由于市场波动的 mean reversion 特性,价格往往会产生一定幅度的反弹。这时如果较短周期的均线(如10日线)出现向上回转的信号,那么就是一个比较好的买入时机。对应于本策略,就是当收盘价低于20日线而高于50日线时买入,利用短线回转,捕捉其反弹行情。

该策略的具体买入逻辑是:价格跌破20日线后买入1手,跌破50日线后加仓1手,跌破100日线后继续加仓1手,跌破200日线最多加仓1手,做多4手。在达到预设的止盈目标后平仓。同时设置了时间和止损条件。

### 优势分析

1. 利用均线的回转特征,可以有效识别短期反弹机会
2. 分批建仓,降低单一点位的风险
3. 设置止盈条件,可以锁定盈利
4. 利用开盘价和前低点进行过滤,避免假突破

### 风险分析

1. 长期持有时,可能面临反转风险。如果行情继续下跌,则损失会进一步扩大
2. 均线信号可能出现误报,从而导致亏损
3. 设定的止盈目标可能达不到,无法全部或部分止盈

### 优化方向

1. 可以测试不同参数设置下的收益率及稳定性
2. 可以考虑结合其他指标如MACD、KD等来决定买入
3. 可以根据不同品种特点选择适合其交易风格的均线周期
4. 可以引入机器学习算法来动态优化参数

### 总结

本策略整体来说是比较经典和通用的均线交易策略。它正确运用了均线的smooting特性,同时结合多个均线来识别短期买入时机。通过分批建仓和及时止盈来控制风险。但其对市场突发事件如重大政策消息等的应对可能比较被动,这是可以继续优化的方向。总体而言,在参数优化和风控方面进行适当改进后,该策略可以获得稳定的超额收益。

||

The strategy is named "Mean Reversion Reverse Strategy Based on Moving Average". The main idea is to buy when price breaks through key moving averages and take profit when reaching preset targets.  

The main principle of this strategy is to capture rebound opportunities in range-bound markets by using the reversion of short-term moving averages. Specifically, when prices break through longer cycle moving averages (such as 20-day and 50-day MAs) and show signs of strong overselling, prices tend to rebound to some extent due to the mean reversion characteristic of market fluctuations. At this time, if shorter cycle moving averages (such as 10-day MA) show upward reversal signal, it would be a good timing to buy. In this strategy, it will buy when the close price is below 20-day MA while above 50-day MA, in order to capture its rebound with short-term MA reversal.

The specific entry logic is: Buy 1 lot when price breaks through 20-day MA, add 1 lot when breaking through 50-day MA, continue to add 1 lot when breaking through 100-day MA, and add up to 1 lot when breaking through 200-day MA, for a maximum of 4 lots. Take profit after reaching the preset targets. It also sets time and stop loss conditions.

### Advantage Analysis 

1. Effectively identify short-term rebound opportunities by using the reversal characteristics of moving averages  
2. Reduce risks of single point by pyramiding orders
3. Lock in profits by setting take profit targets
4. Avoid false breakouts by using open price and previous low price filters

### Risk Analysis

1. May face reversal risks in long holding periods. Losses would expand if market continues to fall.
2. MA signals may give false signals, leading to losses
3. May fail to fully or partially take profits if profit target is not reached

### Optimization Directions

1. Test profitability and stability under different parameter settings
2. Consider combining other indicators like MACD, KD to decide entries
3. Choose suitable MA periods based on characteristics of different products  
4. Introduce machine learning algorithms to dynamically optimize parameters

### Summary

In general, this is a classic and universal MA trading strategy. It correctly utilizes the smoothing feature of MAs, combined with multiple MAs to identify short-term buying opportunities. It controls risks by pyramiding orders and timely profit taking. But its response to market events like significant policy news may be more passive. This is something that can be further optimized. Overall, with appropriate improvements in parameter optimization and risk control, this strategy can obtain steady excess returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|5|Quantity 1|
|v_input_int_2|10|Quantity 2|
|v_input_int_3|15|Quantity 3|
|v_input_int_4|20|Quantity 4|
|v_input_1|true|Profit Percentage|
|v_input_int_5|2|Pyramiding|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-13 00:00:00
end: 2023-12-20 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("EMA_zorba1", shorttitle="zorba_ema", overlay=true)

// Input parameters
qt1 = input.int(5, title="Quantity 1", minval=1)
qt2 = input.int(10, title="Quantity 2", minval=1)
qt3 = input.int(15, title="Quantity 3", minval=1)
qt4 = input.int(20, title="Quantity 4", minval=1)
ema10 = ta.ema(close, 10)
ema20 = ta.ema(close, 20)
ema50 = ta.ema(close, 50)
ema100 = ta.ema(close, 100)
ema200 = ta.ema(close, 200)

// Date range filter
start_date = timestamp(year=2021, month=1, day=1)
end_date = timestamp(year=2024, month=10, day=27)
in_date_range = true

// Profit condition
profit_percentage = input(1, title="Profit Percentage")  // Adjust this value as needed

// Pyramiding setting
pyramiding = input.int(2, title="Pyramiding", minval=1, maxval=10)

// Buy conditions
buy_condition_1 = in_date_range and close < ema20 and close > ema50 and close < open and close < low[1]
buy_condition_2 = in_date_range and close < ema50 and close > ema100 and close < open and close < low[1]
buy_condition_3 = in_date_range and close < ema100 and close > ema200 and close < open and close < low[1]
buy_condition_4 = in_date_range and close < ema200 and close < open and close < low[1]

// Exit conditions
profit_condition = strategy.position_avg_price * (1 + profit_percentage / 100) <= close
exit_condition_1 = in_date_range and (close > ema10 and ema10 > ema20 and ema10 > ema50 and ema10 > ema100 and ema10 > ema200 and close < open) and profit_condition and close < low[1] and close < low[2]
exit_condition_2 = in_date_range and (close < ema10 and close[1] > ema10 and close < close[1] and ema10 > ema20 and ema10 > ema50 and ema10 > ema100 and ema10 > ema200 and close < open) and profit_condition and close < low[1] and close < low[2]

// Exit condition for when today's close is less than the previous day's low
//exit_condition_3 = close < low[1]

// Strategy logic
strategy.entry("Buy1", strategy.long, qty=qt1 * pyramiding, when=buy_condition_1)
strategy.entry("Buy2", strategy.long, qty=qt2 * pyramiding, when=buy_condition_2)
strategy.entry("Buy3", strategy.long, qty=qt3 * pyramiding, when=buy_condition_3)
strategy.entry("Buy4", strategy.long, qty=qt4 * pyramiding, when=buy_condition_4)

strategy.close("Buy1", when=exit_condition_1 or exit_condition_2)
strategy.close("Buy2", when=exit_condition_1 or exit_condition_2)
strategy.close("Buy3", when=exit_condition_1 or exit_condition_2)
strategy.close("Buy4", when=exit_condition_1 or exit_condition_2)
```

> Detail

https://www.fmz.com/strategy/436137

> Last Modified

2023-12-21 15:45:23
