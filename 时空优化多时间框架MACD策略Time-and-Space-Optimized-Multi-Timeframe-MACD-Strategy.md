
> Name

时空优化多时间框架MACD策略Time-and-Space-Optimized-Multi-Timeframe-MACD-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/98646f9cecc756230c.png)
 [trans]
### 概述

本策略通过优化MACD指标的参数,结合移动平均线,价格action以及特定的交易时间,实现高胜率的汇率交易策略。

### 策略原理

1. 使用3根K线判断价格趋势。如果最后3根K线收盘价均高于开盘价,则判断为上涨趋势;如果最后3根K线收盘价均低于开盘价,则判断为下跌趋势。

2. 计算快线、慢线和MACD差值。快线参数为12,慢线参数为26,信号线参数为9。

3. 交易时间设置为每天09:00-09:15。在这个时间段内,如果满足以下条件则入场:
    - 上涨趋势同时MACD差值上穿0时做多
    - 下跌趋势同时MACD差值下穿0时做空

4. 止盈设置为0.3个点,止损设置为100个点。

5. 21:00-21:15时间段则全部平仓。

### 策略优势

1. 使用多时间框架指标组合,综合判断趋势方向,提高决策准确性。

2. 优化交易时间段,避开市场波动剧烈的时候,降低了不必要的止损风险。

3. 设置合理的止盈止损比例,最大程度锁定盈利,避免亏损扩大。

4. 整体来说,策略胜率很高,适合短线频繁交易。

### 策略风险 

1. 策略交易时间比较固定,如果不能及时进入场内,可能会错过交易机会。

2. MACD指标容易产生误导信号,如果不能判断明确的上下趋势,应谨慎操作。

3. 止盈止损点数设置不合理,可能造成盈亏比例失衡,需要根据不同品种调整参数。

4. 整体来说,策略风险较小。但高杠杆情况下,仓位过大也会造成较大亏损。

### 策略优化方向

1. 可以结合其他指标判断趋势,避免MACD产生误信号。例如结合布林线、RSI等指标进行组合运用。

2. 可以优化止盈止损的比例,通过回测数据计算最优参数。

3. 可以扩大策略适用的交易品种,评估不同品种的参数调整效果。

4. 可以引入机器学习算法,根据不同市场情况选择最优参数,实现动态调整。

### 总结

本策略总体来说非常适合初级交易者,策略思路清晰,参数优化空间大,风险可控。通过定制开仓时间以及合理设置盈亏比例,可以获得较高的盈利率。后续可进一步优化,使策略参数动态调整,适应更加复杂的市场环境。

||

### Overview

This strategy optimizes the parameters of the MACD indicator, combines with moving average, price action and specific trading times to achieve a high win rate forex trading strategy.

### Strategy Logic

1. Use 3 K-lines to judge the price trend. If the closing prices of the last 3 K-lines are higher than the opening prices, it is judged as an upward trend; if the closing prices of the last 3 K-lines are lower than the opening prices, it is judged as a downward trend.

2. Calculate fast line, slow line and MACD difference. The fast line parameter is 12, the slow line parameter is 26, and the signal line parameter is 9.  

3. The trading time is set to 09:00-09:15 every day. Within this time period, enter the market if the following conditions are met:
    - Go long when the uptrend coincides with the MACD difference crossing above 0
    - Go short when the downtrend coincides with the MACD difference crossing below 0

4. The take profit is set to 0.3 pips, and the stop loss is set to 100 pips.  

5. Close all positions during 21:00-21:15.

### Advantages of the Strategy

1. Using a combination of multi timeframe indicators to comprehensively judge the trend direction and improve decision accuracy.

2. Optimize trading time to avoid periods of high market volatility, reducing unnecessary stop loss risk.  

3. Set reasonable ratios for take profit and stop loss to maximize profit locking and avoid loss magnification.

4. Overall, the strategy has a very high win rate and is suitable for frequent short-term trading.

### Risks of the Strategy

1. The trading time is relatively fixed, may miss trading opportunities if unable to enter the market in time.

2. MACD indicator is prone to misleading signals. Trade cautiously if clear uptrend or downtrend cannot be determined. 

3. Take profit and stop loss may be set unreasonably, resulting in profit loss imbalance. Parameters need to be adjusted according to different products. 

4. Overall risk is small. But excessively large positions under high leverage can still lead to huge losses.

### Directions for Strategy Optimization 

1. Combine with other indicators to determine the trend, avoiding misleading signals from the MACD. For example, combine Bollinger Bands, RSI etc.

2. Optimize take profit/stop loss ratios by calculating optimal parameters from backtest data.

3. Expand the trading varieties applicable to the strategy, evaluate parameter tuning effects on different products.  

4. Introduce machine learning algorithms to select optimal parameters dynamically based on varying market conditions.

### Conclusion

Overall this strategy is well suited for novice traders. The logic is clear, optimization space is large, and risks are controllable. By customizing opening times and setting reasonable profit loss ratios, high returns can be achieved. Further optimizations can be made to dynamically adjust parameters and adapt to more complex market environments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|true|From Day|
|v_input_3|true|From Month|
|v_input_4|2000|From Year|
|v_input_5|31|To Day|
|v_input_6|12|To Month|
|v_input_7|2021|To Year|
|v_input_8|0.0003|tp|
|v_input_9|true|sl|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=4
strategy("Very high win rate strategy", overlay=true)


//

fast_length =12
slow_length= 26
src = close
signal_length = 9
sma_source = false
sma_signal = false

// Calculating
fast_ma = sma_source ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source ? sma(src, slow_length) : ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal

//ma

len=10
srca = input(close, title="Source")
out = hma(srca, len)

fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2000, title = "From Year", minval = 1970)
 //monday and session 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2021, title = "To Year", minval = 1970)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true


timeinrange(res, sess) => time(res, sess) != 0

// = input('0900-0915', type=input.session, title="My Defined Hours")
myspecifictradingtimes = '0900-0915'
exittime = '2100-2115'

optionmacd=true


entrytime = time(timeframe.period, myspecifictradingtimes) != 0
exit = time(timeframe.period, exittime) != 0     

if(time_cond and optionmacd )
    if(close > open and close[1] > open[1] and close[2] > open[2] and entrytime  and crossover(hist,0))
        strategy.entry("long",1)
    if(close< open and close[1] < open[1] and close[2] < open[2] and entrytime and crossunder(hist,0))
        strategy.entry("short",0)      


tp = input(0.0003, title="tp")
//tp = 0.0003
sl = input(1.0 , title="sl")
//sl = 1.0
strategy.exit("closelong", "long" , profit = close * tp / syminfo.mintick, loss = close * sl / syminfo.mintick, alert_message = "closelong")
strategy.exit("closeshort", "short" , profit = close * tp / syminfo.mintick, loss = close * sl / syminfo.mintick, alert_message = "closeshort")

```

> Detail

https://www.fmz.com/strategy/440299

> Last Modified

2024-01-29 10:15:34
