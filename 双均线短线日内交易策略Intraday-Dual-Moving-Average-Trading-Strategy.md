
> Name

双均线短线日内交易策略Intraday-Dual-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10a1a5b5e6ad30900c8.png)
[trans]
## 概述

这是一种基于双均线的简单日内交易策略。它使用两个不同周期的简单移动均线,在均线交叉时进行买入或卖出。在信号改变时,使用双倍数量平仓再反向开仓。当日内交易时段结束时,如果仓位还未平仓,则全部平仓。

## 策略原理

该策略使用10日和40日两条简单移动均线。当短期均线上穿长期均线时,做多;当短期均线下穿长期均线时,做空。当信号发生变化时,使用双倍手数平仓再反向开仓。在定义的日内交易时段内,跟随均线信号进行交易。当日内交易时段结束,如果还有未平仓位,则全部平仓。

该策略主要利用了短期均线能更快捕捉价格变化的特点。当短期均线上穿长期均线时,表示短期价格开始上涨,做多能捕捉这一趋势;当短期均线下穿长期均线时,表示短期价格开始下跌,做空能捕捉这一趋势。双倍手数反向开仓的设计,则能够加大仓位,扩大获利空间。

## 策略优势

1. 策略思路简单清晰,容易理解和实现。
2. 利用双均线交叉原理,可以有效捕捉短期价格趋势。 
3. 采用日内时间段交易,可以避免过夜风险。
4. 采用双倍手数反向开仓设计,可以扩大获利空间。

## 风险分析

1. 作为短线策略,容易受到市场噪音的影响,出现错误信号。
2. 双倍手数设计可能放大损失。
3. 日内强制平仓设计可能导致不能持有較长线的赚钱交易。

对应风险的解决方法:

1. 优化均线参数,降低错误信号率。
2. 结合其他指标过滤信号。 
3. 优化双倍手数参数。
4. 适当放宽日内交易时段。

## 策略优化方向

1. 优化均线参数。可以测试更多组合,寻找最佳参数。

2. 增加其他技术指标过滤。例如加上MACD指标确认,可以降低错误信号率。

3. 优化反向开仓倍数。测试不同的倍数大小,找到最优参数。

4. 测试不同的日内交易时段。适当延长时段可能获得更好回报。

## 总结

该策略整体思路简单,通过捕捉双均线交叉形成的短期趋势,配合双倍手数反向开仓扩大获利空间,最后配合日内时段交易规避过夜风险。是一种适合日内短线交易的有效策略。有进一步优化空间,通过调整参数以及增添其他技术指标过滤,可以获得更好的策略效果。

||

## Overview  

This is a simple intraday trading strategy based on dual moving averages. It uses two simple moving averages with different periods and takes long or short positions when the moving averages cross over. The position is reversed using double quantity when signal changes. All open positions are squared off when the intraday session ends.  

## Strategy Logic

The strategy uses a 10-day and a 40-day simple moving average. It goes long when the short period moving average crosses above the long period one and goes short when the reverse crossover happens. When signal changes, the position is closed out using double quantity and a reverse position is initiated. Trading only happens following the moving average signals during a defined intraday session. Any open positions left are squared off when the session ends.

The strategy mainly utilizes the faster price change capturing capability of the shorter period moving average. When the short SMA crosses above the long SMA, it indicates an uptrend in prices in the short term hence going long can capture this. The reverse indicates a short term downtrend. The double quantity reverse entry expands profit potential.


## Advantages

1. Simple and clear strategy logic, easy to understand and implement.  
2. Effectively catches short term price trends using dual MA crossover.
3. Avoids overnight risk by restricting to an intraday session. 
4. Expands profit potential using double quantity reverse trading.

## Risk Analysis 

1. Prone to noise trading errors as a short term strategy.  
2. Double quantity may amplify losses.
3. Forced square off risks missing longer profitable trends.

Risk Mitigation:

1. Optimize MA parameters to reduce false signals.  
2. Add filters using other indicators.  
3. Optimize quantity parameters.
4. Relax intraday session duration.


## Enhancement Opportunities

1. Optimize MA parameters by testing more combinations for best fit.  

2. Add filters like MACD confirmation to reduce false signals.  

3. Optimize reverse entry quantity multiplier through parameter tuning.

4. Test extending intraday session duration for better returns.


## Conclusion

The strategy catches short term trends formed from MA crossover signals, expands profits using double quantity reverse trading and restricts overnight risks by trading only in an intraday session. Further optimizations on parameters and adding filters can improve strategy performance. On the whole, it is an effective strategy suitable for intraday trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0915-1455|Market session|
|v_input_2|10|Short MA Period|
|v_input_3|40|Long MA Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-19 00:00:00
end: 2024-02-26 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Pritesh-StocksDeveloper

//@version=4
strategy("Moving Average - Intraday", shorttitle = "MA - Intraday", 
     overlay=true, calc_on_every_tick = true)

// Used for intraday handling
// Session value should be from market start to the time you want to square-off 
// your intraday strategy
var i_marketSession = input(title="Market session", type=input.session, 
     defval="0915-1455", confirm=true)

// Short & Long moving avg. period
var int i_shortPeriod = input(title = "Short MA Period", type = input.integer, 
     defval = 10, minval = 2, maxval = 20, confirm=true)
var int i_longPeriod = input(title = "Long MA Period", type = input.integer, 
     defval = 40, minval = 3, maxval = 120, confirm=true)

// A function to check whether the bar is in intraday session
barInSession(sess) => time(timeframe.period, sess) != 0

// Calculate moving averages
shortAvg = sma(close, i_shortPeriod)
longAvg = sma(close, i_longPeriod)

// Plot moving averages
plot(series = shortAvg, color = color.red, title = "Short MA", 
     linewidth = 2)
plot(series = longAvg, color = color.blue, title = "Long MA", 
     linewidth = 2)

// Long/short condition
longCondition = crossover(shortAvg, longAvg)
shortCondition = crossunder(shortAvg, longAvg)

// See if intraday session is active
bool intradaySession = barInSession(i_marketSession)

// Trade only if intraday session is active

// Long position
strategy.entry(id = "Long", long = strategy.long, 
     when = longCondition and intradaySession)

// Short position
strategy.entry(id = "Short", long = strategy.short, 
     when = shortCondition and intradaySession)

// Square-off position (when session is over and position is open)
squareOff = (not intradaySession) and (strategy.position_size != 0)
strategy.close_all(when = squareOff, comment = "Square-off")
```

> Detail

https://www.fmz.com/strategy/442963

> Last Modified

2024-02-27 16:36:31
