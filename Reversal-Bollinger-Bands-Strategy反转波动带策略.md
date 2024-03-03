
> Name

Reversal-Bollinger-Bands-Strategy反转波动带策略

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14e3a45b01fe66f63ec.png)
[trans]

## 概述
反转波动带策略是一种基于布林带的FOREX交易策略。它在日元交易对上效果最佳。当价格突破布林带上限或下限时,采取反向操作,目标价设置为最近10根K线的最高点或最低点。

## 策略原理
该策略基于20日简单移动均线及其2倍标准差构建上轨和下轨。当当前K线收盘价突破下轨时,做多;当突破上轨时,做空。止损价设置为最近10根K线的最低价,止盈价为最近10根K线的最高价。

具体来说,如果前一根K线开盘价低于下轨,且当前K线收盘价も低于下轨,则做多进场。止损价设置为最近10根K线的最低价,止盈价设置为最近10根K线的最高价。

相反,如果前一根K线开盘价高于上轨,且当前K线收盘价も高于上轨,则做空进场。止损价设置为最近10根K线的最高价,止盈价设置为最近10根K线的最低价。

## 优势分析
这种策略具有反转交易的特点。当价格突破布林带时,说明趋势正在发生转折,因此采取反向操作。设置止盈止损也比较合理,能够获取较好的风险回报比。

此外,这种策略参数较少,实现简单,容易理解。而日元交易对波动较大,适合采用此策略。

## 风险分析
该策略最大的风险在于不能有效判断趋势转折点。当价格突破布林带上下限后,仍有可能继续原有趋势运行。这时如果反向做市,很可能造成损失。

此外,止盈止损设置为近期最高最低价也存在风险。如果行情出现V型反转,止损可能直接被击穿。止盈设置也可能预判不准确,无法全额享受行情反转带来的利润。

为控制风险,可以设置合理的止损幅度,降低单笔损失。也可以采用移动止损来锁定利润,适当调整止盈位置。

## 优化方向  
该策略可以从以下几个方面进行优化:
1. 增加过滤条件,避免错误信号。可以设置交易量过滤,确保突破时交易量放大,以确认趋势转折。
2. 优化参数设置。可以测试不同参数对结果的影响,寻找最优参数组合。
3. 结合其他指标进行验证,如RSI等震荡指标,确认买卖信号的可靠性。
4. 利用机器学习等方法动态优化止损止盈位置,让策略更具适应性。

## 总结
反转波动带策略overall是一种简单实用的短线交易策略。它反转操作且风险可控,适合日内交易。但参数和过滤条件还需进一步优化,以减少错误信号并提高效率。如果搭配其他技术指标和动态止盈止损,该策略的表现还具有很大提升空间。

||

## Overview
The Reversal Bollinger Bands strategy is a FOREX trading strategy based on Bollinger Bands. It works best on JPY pairs. When price breaks through the Bollinger Bands upper or lower limit, it takes a reverse operation with the target price set to the highest or lowest point of the last 10 candlesticks.

## Strategy Principle  
The strategy builds the upper and lower rails based on the 20-day simple moving average and its 2 times standard deviation. When the closing price of the current candlestick breaks through the lower rail, go long; when it breaks through the upper rail, go short. The stop loss price is set to the lowest price of the last 10 candlesticks, and the take profit price is set to the highest price of the last 10 candlesticks.

Specifically, if the opening price of the previous candlestick is lower than the lower rail, and the closing price of the current candlestick is also lower than the lower rail, then go long. The stop loss price is set to the lowest price of the last 10 candlesticks, and the take profit price is set to the highest price of the last 10 candlesticks. 

On the contrary, if the opening price of the previous candlestick is higher than the upper rail, and the closing price of the current candlestick is also higher than the upper rail, then go short. The stop loss price is set to the highest price of the last 10 candlesticks, and the take profit price is set to the lowest price of the last 10 candlesticks.  

## Advantage Analysis
This strategy has the characteristics of reversal trading. When the price breaks through the Bollinger Bands, it indicates that a trend reversal is taking place, so a reverse operation is taken. The setting of stop loss and take profit is also reasonable to obtain a good risk-reward ratio.

In addition, this strategy has few parameters and is simple to implement and easy to understand. And JPY pairs fluctuate greatly, which is suitable for this strategy.  

## Risk Analysis
The biggest risk of this strategy is that it cannot effectively determine the inflection point of the trend. After the price breaks through the upper and lower limits of the Bollinger Bands, the original trend may continue to run. If reverse market making is taken at this time, it is likely to cause losses.

In addition, the stop loss and take profit settings for recent highs and lows also carry risks. If a V-shaped reversal occurs in the market, the stop loss may be directly broken through. The take profit setting may also not accurately predict and fail to fully enjoy the profits from the market reversal.

To control risks, a reasonable stop loss can be set to reduce losses per trade. Moving stop loss can also be adopted to lock in profits and appropriately adjust the take profit location.

## Optimization Directions
The strategy can be optimized in the following aspects:

1. Increase filter conditions to avoid wrong signals. Trading volume filters can be set to ensure that trading volume expands when there is a breakout to confirm the trend reversal.

2. Optimize parameter settings. Test the impact of different parameter settings on results to find the optimal parameter combination.  

3. Verify buy and sell signals with other indicators such as RSI and other oscillators to confirm signal reliability.

4. Use machine learning and other methods to dynamically optimize stop loss and take profit locations to make the strategy more adaptive.

## Conclusion 
The Reversal Bollinger Bands strategy is an simple and practical short-term trading strategy overall. It has reversible operations and controllable risks, suitable for intraday trading. But parameters and filter conditions need further optimization to reduce false signals and improve efficiency. If combined with other technical indicators and dynamic stop loss and take profit, the performance of this strategy still has great room for improvement.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-01 00:00:00
end: 2023-11-03 18:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

// Initial settings
strategy("Bulle de bollinger", overlay = true)

// Parameter Settings
mdl = sma(close, 20)
dev = stdev(close, 20)

upr = mdl + 2*dev
lwr = mdl - 2*dev

// Plot
plot(mdl, color = color.green) // Plot moving average
p1 = plot(upr, color = color.red) // Plot Upper_band
p2 = plot(lwr, color = color.green) // Plot lower band
fill(p1, p2, color = color.blue) // Fill transparant color between the 2 plots

// Strategy entry & close

if open[1] < lwr[1] and close[1] < lwr[1] // Previous price lower than lower band and current close is higher than lower band
    stop_level = lowest(10)
    profit_level = highest(10)
    strategy.entry(id = 'bb_buy', long = true)
    strategy.exit("TP/SL", "bb_buy", stop=stop_level, limit=profit_level)
    
if open[1] > upr[1] and close[1] > upr // Previous price is higher than higher band & current close is lower the higher band
    stop_level = highest(10)
    profit_level = lowest(10)
    strategy.entry(id = 'bb_sell', long = false)
    strategy.exit("TP/SL", "bb_sell", stop=stop_level, limit=profit_level)
```

> Detail

https://www.fmz.com/strategy/434428

> Last Modified

2023-12-06 11:20:30
