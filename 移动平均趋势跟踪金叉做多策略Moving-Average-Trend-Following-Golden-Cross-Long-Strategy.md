
> Name

移动平均趋势跟踪金叉做多策略Moving-Average-Trend-Following-Golden-Cross-Long-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e985911d52f9f6733c.png)

[trans]


### 概述

本策略结合移动平均线指标和MACD指标,设计了一个相对保守的做多策略。该策略主要根据价格是否站上200日简单移动平均线来判断行情趋势,再结合20日指数移动平均线和MACD指标的金叉来选择买入时机。在行情向上时,仅在MACD金叉时买入,并在MACD死叉时止损;在行情向下时,需要价格站上20日指数移动平均线并且MACD金叉时才买入,在MACD死叉时止损。这种双重确认机制可以有效避免在震荡行情中频繁买卖。

### 策略原理

首先,该策略使用200日简单移动平均线SMA判断当前价格趋势。如果收盘价高于SMA,则判断行情为上涨趋势;如果收盘价低于SMA,则判断行情为下跌趋势。

其次,在上涨趋势中,策略忽略20日指数移动平均线EMA的条件,仅在MACD的快线向上突破慢线时(即MACD金叉)发出买入信号。此时采用趋势跟踪策略,只要MACD保持金叉,就持有多单。当MACD快线下穿慢线时(即MACD死叉),就执行止损。

在下跌趋势中,策略变得保守,只有当价格收盘价上穿20日EMA并且MACD金叉时才会发出买入信号,也就是需要双重确认。此时仍然在MACD死叉时止损。

通过这种机制,该策略在趋势明确时(价格高于或低于200日SMA时)采用较积极的策略,而当价格处于震荡区间时则采取较为谨慎的策略,可以有效避免虚假信号导致不必要的交易。

### 策略优势

1. 该策略同时结合趋势判断和双重确认机制,可以有效过滤噪音,避免虚假信号,从而减少不必要的交易。

2. 在趋势明显时,策略及时跟踪趋势;在趋势不明显时,策略采取谨慎态度,可以减少亏损。

3. 策略采用移动平均线指标和MACD指标进行组合,可以使买卖信号更加可靠。

4. 策略操作简单,容易实现,适合不同水平的投资者使用。

5. 策略采用固定的止损条件,可以有效控制单笔亏损。

### 策略风险

1. 该策略过于依赖技术指标,无法应对突发事件导致的张力行情。

2. 双重确认机制可能导致策略有时错过买入良机。

3. MACD指标存在滞后性,可能导致买卖点发生延迟。

4. 如果止损点设置不当,可能导致亏损扩大。

5. 200日SMA无法准确判断长期趋势,可能发生判断错误。

6. 移动平均线作为过滤器容易产生幅度过小的交易信号。

### 策略优化

1. 可以考虑加入其他指标进行组合,如KDJ、布林带等,使买卖信号更加准确。

2. 可以测试其他长期均线,如120日EMA,看是否可以更好判断长期趋势。

3. 可以优化移动平均线的天数,寻找最佳参数组合。

4. 可以加入止盈策略,而不仅仅依赖止损,以锁定更多利润。

5. 可以根据不同市场调整均线参数,使策略更具适应性。

6. 可以考虑加入机器学习算法,利用历史数据训练模型,自动优化参数。

### 总结

本策略整合移动平均线和MACD指标的优势,在保持相对简单的同时实现了较好的风险控制。通过判断趋势和双重确认,可以有效过滤噪音信号。但策略也存在一定局限性,需要进一步优化和提高应对突发事件的能力。总的来说,该策略为保守型投资者提供了一个稳健的参考方案。

||


### Overview

This strategy combines moving average indicators and the MACD indicator to design a relatively conservative long strategy. It mainly uses the 200-day simple moving average to judge the trend, and combines the 20-day exponential moving average and MACD golden cross to select buying opportunities. In an uptrend, it only buys when there is a MACD golden cross and stops loss when there is a MACD dead cross. In a downtrend, it will only buy when the price is above the 20-day EMA and there is a MACD golden cross, and stop loss when there is a MACD dead cross. This dual confirmation mechanism can effectively avoid frequent trading in a volatile market.

### Strategy Logic  

Firstly, the strategy uses the 200-day simple moving average (SMA) to judge the current price trend. If the closing price is above SMA, the trend is judged to be rising. If the closing price is below SMA, the trend is judged to be falling.

Secondly, in an uptrend, the strategy ignores the 20-day exponential moving average (EMA) condition and only sends a buy signal when the MACD fast line crosses above the slow line (MACD golden cross). It holds the long position as long as the MACD stays golden crossed. When the MACD fast line crosses below the slow line (MACD dead cross), it stops loss.

In a downtrend, the strategy becomes more conservative. It only sends a buy signal when the closing price crosses above the 20-day EMA and there is a MACD golden cross, requiring dual confirmation. It still stops loss on MACD dead cross. 

Through this mechanism, the strategy adopts a more aggressive approach when the trend is clear (price is above or below the 200-day SMA). When the price is in a range, it takes a more cautious approach, effectively avoiding false signals.

### Advantages

1. The strategy combines trend judgment and dual confirmation to filter noise and avoid false signals, reducing unnecessary trades.

2. It timely follows the trend when the trend is clear, and adopts a cautious attitude when the trend is unclear, reducing losses.

3. Combining moving averages and MACD makes trading signals more reliable. 

4. The strategy is simple to implement, suitable for investors at all levels.

5. The fixed stop loss mechanism effectively controls single trade loss.

### Risks

1. The strategy relies heavily on technical indicators and cannot adapt to black swan events.

2. The dual confirmation may cause missed buying opportunities sometimes.

3. MACD has lagging issues which may delay trading signals. 

4. Improper stop loss setting may lead to larger losses.

5. The 200-day SMA may not accurately determine long term trends.

6. Moving averages as filters may generate trivial trading signals.

### Optimization

1. Consider combining other indicators like KDJ, Bollinger Bands to make signals more accurate.

2. Test other long term moving averages like 120-day EMA to better determine long term trends.

3. Optimize moving average periods to find the best parameter combination. 

4. Incorporate take profit strategies, not just stop loss, to lock in more profits.

5. Adjust moving average parameters for different markets to improve adaptability.

6. Consider machine learning algorithms to optimize parameters by training models on historical data.

### Summary

The strategy integrates the advantages of moving averages and MACD, achieving good risk control while remaining relatively simple. By judging the trend and requiring dual confirmation, it can filter out noise effectively. But the strategy also has some limitations and needs further optimization and adaptability to black swan events. Overall, it provides conservative investors with a robust reference solution.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|v_input_1|
|v_input_2|20|v_input_2|
|v_input_3|12|fastLength|
|v_input_4|26|slowlength|
|v_input_5|9|MACDLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-15 00:00:00
end: 2023-10-22 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title="MACD/EMA Long Strategy",overlay=true,scale=scale.left)



// SMA Indicator - Are we in a Bull or Bear market according to 200 SMA?
SMA = sma(close, input(200))



// EMA Indicator - Are we in a rally or not?
EMA = ema(close, input(20))



//MACD Indicator - Is the MACD bullish or bearish?

fastLength = input(12)
slowlength = input(26)
MACDLength = input(9)

MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD

// Set Buy/Sell conditions

[main,signal,histo]=macd(close,fastLength,slowlength,MACDLength)

buy_entry= if close>SMA
    delta>0
else
    delta>0 and close>EMA
    
strategy.entry("Buy",true , when=buy_entry)

alertcondition(delta, title='Long', message='MACD Bullish')


sell_entry = if close<SMA
    delta<0 
else
    delta<0 and close<EMA
strategy.close("Buy",when= sell_entry)


alertcondition(delta, title='Short', message='MACD Bearish')

//plot(delta, title="Delta", style=cross, color=delta>=0 ? green : red )
```

> Detail

https://www.fmz.com/strategy/429951

> Last Modified

2023-10-23 15:22:48
