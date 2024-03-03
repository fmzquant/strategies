
> Name

皮特波浪交易系统策略Pete-Wave-Trading-System-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1bada62fa996f2d38b8.png)
 [trans]

皮特波浪交易系统策略概述

皮特波浪交易系统策略使用价格的快速和慢速移动平均线构建交易信号,并结合附加过滤器和止损机制进一步优化。该策略旨在捕捉中短线趋势,通过价格平均线交叉产生买入和卖出信号。代码还包含突破确认过滤器,K线实体过滤器,ATR过滤器,回调过滤器等机制来避免假突破。总体而言,该策略结合趋势跟随和突破交易的优点,可以有效捕捉盘整后的趋势方向。


皮特波浪交易系统策略原理

该策略使用快速移动平均线(长度为9)和慢速移动平均线(长度为22)构建金叉(快速线上穿慢速线)和死叉(快速线下穿慢速线)的交易信号。当快线从下方上穿慢线时产生买入信号;当快线从上方下穿慢线时产生卖出信号。

为了避免因价格震荡产生的假突破,代码加入了附加的过滤机制。这包括K线实体过滤器,要求K线实体百分比波动大于0.5%才产生信号;回调过滤器,快线和价格线发生交叉时判断价格是否出现一定幅度回调以确认趋势;ATR值过滤器,要求ATR大于0.5才证明波动足够产生信号。

在信号产生后,若开启突破确认过滤器,还会判断当前收盘价是否突破前N根K线的最高价或最低价来确认突破。最后,该策略通过滑点止损机制来锁定盈利,会根据持仓均价的一定百分比来移动止损位置。


皮特波浪交易系统策略优势分析

该策略集成了移动平均线交易和趋势跟踪的优点,可以有效识别中短线价格趋势的方向。相比单一的均线交叉系统,结合附加过滤器可以大幅降低假信号的概率。具体优势如下:

1. 均线交叉结合趋势跟踪,避免被震荡行情套牢。

2. 回调过滤器和突破确认机制可以避免假突破。

3. ATR值、K线实体过滤器帮助识别真实波动。

4. 滑点止损机制可以有效控制单笔亏损。


皮特波浪交易系统策略风险分析

该策略主要面临以下风险:

1. 行情突发事件导致止损被击出。可以适当放宽止损距离。

2. 持仓时间过长,未及时止盈。可以缩短均线周期。

3. 行情平静期,交易信号缩减。可以适当降低过滤标准。

4. 参数优化不当,导致过于频繁或较少交易。需反复测试参数。


皮特波浪交易系统策略优化方向

该策略可以从以下几个方向进行优化:

1. 根据不同交易品种分别测试参数,优化移动平均线周期等参数。

2. 尝试加入更多指标,如布林带、RSI等判断趋势方向。

3. 测试止损机制参数,找到最佳止损比例。

4. 尝试机器学习等方法自动生成买卖信号。

5. 优化信号过滤逻辑,降低假信号概率。

6. 不同时间周期结合判断,发现更多交易机会。


皮特波浪交易系统策略总结

皮特波浪交易系统策略综合运用移动平均线交叉、趋势跟踪、附加过滤器等方法构建了一个较为稳定可靠的中短线交易策略。相比单一技术指标,该策略可明显减少因价格震荡带来的噪音交易。加入的过滤机制也避免了假突破的风险。通过参数测试和规则优化,该策略可以成为日内短线交易的有力工具。总体而言,皮特波浪交易系统策略稳定性较高,适合捕捉较为明确的中短线价格趋势,是一个值得实盘验证的量化策略。

|| 


Pete Wave Trading System Strategy Overview

The Pete Wave trading system strategy uses fast and slow moving average lines of price to construct trading signals, together with additional filters and stop loss mechanisms to further optimize. The strategy aims to capture medium-term trends by generating buy and sell signals from price average line crossovers. The code also contains breakout confirmation filters, candle body filters, ATR filters, pullback filters and other mechanisms to avoid false breakouts. Overall, the strategy combines the advantages of trend following and breakout trading to effectively capture the trend direction after consolidation.


Pete Wave Trading System Strategy Principles 

The strategy uses a fast moving average line (length 9) and a slow moving average line (length 22) to construct golden crossovers (fast line breaking through slow line from below) and death crossovers (fast line breaking through slow line from above) trading signals. A buy signal is generated when the fast line crosses above the slow line, and a sell signal is generated when the fast line crosses below the slow line.

To avoid false breakouts caused by price fluctuations, additional filter mechanisms are added to the code. These include candle body filters that require candle body percentage fluctuations to be greater than 0.5% before generating a signal; pullback filters that check if the price has pulled back a certain amplitude when the fast line and price line crossover to confirm the trend; ATR value filters that require ATRs greater than 0.5 to prove sufficient fluctuation to generate signals.

After the signal is generated, if the breakout confirmation filter is enabled, it will also determine whether the current closing price breaks through the highest or lowest price of the previous N candlesticks to confirm the breakout. Finally, the strategy locks in profits through a trailing stop loss mechanism, which moves the stop loss position based on a certain percentage of the average holding price.


Pete Wave Trading System Strategy Advantages Analysis  

The strategy integrates the advantages of moving average trading and trend tracking, and can effectively identify the direction of medium-term price trends. Compared to a single moving average crossover system, combining additional filters can greatly reduce the probability of false signals. Specific advantages are as follows:

1. The combination of moving average crossovers and trend tracking avoids getting caught in volatile markets.

2. Pullback filters and breakout confirmation mechanisms avoid false breakouts.  

3. ATR values and candle body filters help identify real fluctuations.

4. The trailing stop loss mechanism can effectively control single trade losses.


Pete Wave Trading System Strategy Risk Analysis

The main risks faced by this strategy are:

1. Sudden market events may trigger stop loss exits. The stop loss distance can be appropriately relaxed.

2. Holding positions for too long without timely profit taking. Shorten the moving average cycle.  

3. Quiet market conditions lead to reduced trading signals. Filter standards can be appropriately lowered. 

4. Improper parameter optimization results in too frequent or too few trades. Parameters need repeated testing.


Pete Wave Trading System Strategy Optimization Directions

The strategy can be optimized in the following directions:

1. Test parameters separately for different trading varieties, optimize moving average periods and other parameters.  

2. Try adding more indicators such as Bollinger Bands, RSI to determine trend direction.

3. Test stop loss mechanism parameters to find the optimal stop loss ratio.  

4. Try machine learning methods to automatically generate buy and sell signals.

5. Optimize signal filtering logic to reduce false signal probabilities.

6. Identify more trading opportunities by combining different time frame judgments.


Pete Wave Trading System Strategy Summary  

The Pete Wave trading system strategy combines moving average crossovers, trend tracking, additional filters and other methods to build a relatively stable and reliable medium-term trading strategy. Compared to a single technical indicator, this strategy can significantly reduce the noise trades caused by price fluctuations. The added filter mechanisms also avoid the risk of false breakouts. Through parameter testing and rule optimization, this strategy can become a powerful tool for intraday trading. Overall, the Pete Wave trading system strategy has high stability, is suitable for capturing relatively clear medium-term price trends, and is a quantitative strategy worth live trading verification.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Fast MA Length|
|v_input_2|22|Slow MA Length|
|v_input_3|14|ATR Length|
|v_input_4|0.5|ATR Filter|
|v_input_5|1.5|Trailing Stop Percentage|
|v_input_6|0.5|Pullback Threshold|
|v_input_7|0.5|Minimum Candle Body Percentage|
|v_input_8|true|Use Breakout Confirmation|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("9:22 5 MIN 15 MIN BANKNIFTY", overlay=true)

fastLength = input(9, title="Fast MA Length")
slowLength = input(22, title="Slow MA Length")
atrLength = input(14, title="ATR Length")
atrFilter = input(0.5, title="ATR Filter")
trailingStop = input(1.5, title="Trailing Stop Percentage")
pullbackThreshold = input(0.5, title="Pullback Threshold")
minCandleBody = input(0.5, title="Minimum Candle Body Percentage")
breakoutConfirmation = input(true, title="Use Breakout Confirmation")

price = close
mafast = ta.sma(price, fastLength)
maslow = ta.sma(price, slowLength)

atrValue = ta.atr(atrLength)

long_entry = ta.crossover(mafast, maslow) and atrValue > atrFilter
short_entry = ta.crossunder(mafast, maslow) and atrValue > atrFilter

// Pullback Filter
pullbackLong = ta.crossover(price, mafast) and ta.change(price) <= -pullbackThreshold
pullbackShort = ta.crossunder(price, mafast) and ta.change(price) >= pullbackThreshold

// Include pullback condition only if a valid entry signal is present
long_entry := long_entry and (pullbackLong or not ta.crossover(price, mafast))
short_entry := short_entry and (pullbackShort or not ta.crossunder(price, mafast))

// Filter based on candle body size
validLongEntry = long_entry and ta.change(price) > 0 and ta.change(price) >= minCandleBody
validShortEntry = short_entry and ta.change(price) < 0 and ta.change(price) <= -minCandleBody

// Breakout confirmation filter
breakoutLong = breakoutConfirmation ? (close > ta.highest(high, fastLength)[1]) : true
breakoutShort = breakoutConfirmation ? (close < ta.lowest(low, fastLength)[1]) : true

long_entry := validLongEntry and breakoutLong
short_entry := validShortEntry and breakoutShort

if (long_entry)
    strategy.entry("Long", strategy.long)
    strategy.close("Short")
    alert("Long trade iniated")
    
if (short_entry)
    strategy.entry("Short", strategy.short)
    strategy.close("Long")
    alert("Short trade initated")

// Trailing Stop-Loss
long_stop = strategy.position_avg_price * (1 - trailingStop / 100)
short_stop = strategy.position_avg_price * (1 + trailingStop / 100)
strategy.exit("Exit Long", "Long", stop = long_stop)
strategy.exit("Exit Short", "Short", stop = short_stop)

plot(mafast, color=color.green, linewidth=2, title="Fast MA")
plot(maslow, color=color.red, linewidth=2, title="Slow MA")

```

> Detail

https://www.fmz.com/strategy/439988

> Last Modified

2024-01-25 15:36:16
