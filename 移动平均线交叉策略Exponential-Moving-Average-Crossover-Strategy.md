
> Name

移动平均线交叉策略Exponential-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/181aa8a4d91462210af.png)
[trans]
移动平均线交叉是一种常见的交易信号。该策略利用快速移动平均线和慢速移动平均线的交叉为交易信号。具体来说,当快速移动平均线从下方上穿慢速移动平均线时,做多;当快速移动平均线从上方下穿慢速移动平均线时,做空。

本策略采用20日exponential moving average (EMA) 作为快速移动平均线,50日EMA作为中速线,200日EMA作为慢速移动平均线。当20日EMA和50日EMA同时上穿200日EMA时做多;当20日EMA和50日EMA同时下穿200日EMA时做空。这样可以过滤掉部分假信号。

### 策略优势

1. 移动平均线策略简单易行,容易理解和实现
2. 利用多条移动平均线组合可以过滤假信号
3. 多空条件清晰,容易判断进出场时机

### 策略风险

1. 在盘整行情中容易产生假信号
2. 移动平均线具有滞后性,无法及时捕捉价格转折
3. 无法有效利用突破性行情的利润

### 优化思路

1. 优化移动平均线的周期参数,适应不同品种和周期
2.增加其他指标过滤信号,如交易量,布林带等
3. 结合趋势和反转策略,在趋势行情中追踪,在盘整中等待机会

### 总结

移动平均线交叉策略概念简单,容易掌握,是量化交易的基础策略之一。本策略作为入门学习具有很好的参考价值。但实战中仍需针对品种和周期进行参数优化,并辅以其他更复杂的技术指标来过滤信号,从而提高策略的实战效果。

||

The exponential moving average (EMA) crossover is a common trading signal. This strategy uses the crossover of a fast EMA and a slow EMA to generate trading signals. Specifically, when the fast EMA crosses above the slow EMA, a long position is taken; when the fast EMA crosses below the slow EMA, a short position is taken.

This strategy uses the 20-day EMA as the fast EMA, the 50-day EMA as the medium EMA, and the 200-day EMA as the slow EMA. When both the 20-day EMA and 50-day EMA cross above the 200-day EMA, a long position is taken; when both cross below, a short position is taken. This helps filter out some false signals.  

### Advantages of the Strategy

1. The moving average crossover strategy is simple and easy to understand and implement
2. Using multiple moving averages can help filter out false signals  
3. Entry and exit signals are clear 

### Risks of the Strategy

1. Prone to generating false signals during range-bound markets
2. Moving averages have lag and may not capture turns quickly  
3. Unable to take full advantage of explosive moves

### Enhancement Ideas

1. Optimize moving average periods for different products and timeframes
2. Add filters like volume and Bollinger Bands
3. Combine with trend following and mean reversion for flexibility

### Summary

The moving average crossover strategy is easy to grasp and is one of the foundational quantitative trading strategies. This implementation serves well as an introductory example. But in live trading, parameters would need optimization, and more advanced technical indicators should be added to filter signals and improve performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|true|From Month|
|v_input_int_2|true|From Day|
|v_input_int_3|2021|From Year|
|v_input_int_4|10|Thru Month|
|v_input_int_5|25|Thru Day|
|v_input_int_6|2112|Thru Year|
|v_input_1|true|Show Date Range|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-05 00:00:00
end: 2024-01-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © rt-maax

//@version=5

strategy(title = "rt maax EMA cross strategy", shorttitle = "rt maax ema ", overlay = true, precision = 8, max_bars_back = 200, pyramiding = 0, initial_capital = 100000, 
     currency = currency.USD, default_qty_type = strategy.cash, default_qty_value = 100000, commission_type = "percent", commission_value = 0.27)
fastema = ta.ema (close , 50)
fema=ta.ema(close,20)
slowema= ta.ema(close,200)
price = close

// === INPUT BACKTEST RANGE ===
fromMonth = input.int(defval = 1,    title = "From Month",  minval = 1, maxval = 12)
fromDay   = input.int(defval = 1,    title = "From Day",    minval = 1, maxval = 31)
fromYear  = input.int(defval = 2021, title = "From Year",   minval = 1970)
thruMonth = input.int(defval = 10,    title = "Thru Month",  minval = 1, maxval = 12)
thruDay   = input.int(defval = 25,    title = "Thru Day",    minval = 1, maxval = 31)
thruYear  = input.int(defval = 2112, title = "Thru Year",   minval = 1970)

// === INPUT SHOW PLOT ===
showDate  = input(defval = true, title = "Show Date Range")

// === FUNCTION EXAMPLE ===



longCondition1= ta.crossover (fema , fastema) 
longcondition2= fema> slowema
longcondition3=fastema>slowema


if (longCondition1 and longcondition2 and longcondition3 )
    stoploss=low*0.97
    takeprofit=high*1.12
    strategy.entry("Long Entry", strategy.long)
    strategy.exit ("exit","long",stop=stoploss,limit=takeprofit)
   


shortCondition1 = ta.crossunder (fema , fastema )
shortcondition2= fastema< slowema
shortcondition3= fema< slowema

if (shortCondition1 and shortcondition2 and shortcondition3 )
    stoploss=low*0.97 
    takeprofit=high*1.5
    strategy.entry("Short Entry", strategy.short)
    strategy.exit("exit","short",stop=stoploss,limit=takeprofit)





```

> Detail

https://www.fmz.com/strategy/438485

> Last Modified

2024-01-12 14:04:37
