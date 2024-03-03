
> Name

闭合阳线策略Harami-Closing-Price-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8e2c835256eefbf33a.png)
[trans]

### 概述

闭合阳线策略是一种基于K线形态的量化交易策略。该策略通过识别“闭合阳线”形态来寻找买入卖出信号。

### 策略原理  

该策略的核心原理是:当前K线为阴线,前一K线为阳线,且当前K线的最低价高于前一K线的最低价,当前K线的最高价低于前一K线的最高价时,产生“闭合阳线”形态。这意味着价格已经形成一个封闭的上涨空间,显示多头力量即将耗尽,这是卖出信号。相反,当形成“闭合阴线”时,产生买入信号。

这里使用K线实体的平均值作为止损线。当实体大于止损线一半时止损。

### 优势分析

闭合阳线策略的优势主要有:

1. 基于简单合理的K线形态判断,容易理解和实现。
2. 可以识别换手较少的区间突破。当涨幅收窄出现“闭合阳线”时,多头力量即将耗尽,这是合适的卖点。
3. 有明确的止损机制以控制风险。

### 风险分析  

闭合阳线策略也存在一些风险:  

1. 监测频率较低,可能错过最佳买卖点。对较短周期的K线效果不佳。
2. 假阳线、假阴线可能导致错误信号。需要结合成交量等指标进行过滤。  
3. 仅基于K线形态,没有考虑其他技术指标和基本面因素的综合判断,存在一定盲目性。

为降低这些风险,可以考虑加入成交量的条件判断,或与移动均线等其他指标结合使用,综合判断市场走势。 止损线也可以根据市场波动程度进行动态调整。

### 优化方向  

闭合阳线策略还可以从以下几个方面进行优化:

1. 加入成交量的条件判断。成交量急剧放大常常意味着趋势反转。
2. 调整止损条件。可以根据市场波动程度及风险偏好动态调整止损线。
3. 多周期结合。识别多周期上关键支持位附近的阳线闭合卖点。
4. 与其他技术指标结合。例如加上均线系统判断整体走势,或引入一些预测型指标提前判断买卖点。

### 总结  

闭合阳线策略作为一种基于K线形态的量化策略,优势在于简单易懂、容易实现,能有效识别一定的买卖信号。但也存在一些局限,如容易产生错误信号、盲目性较强等。这些问题也为该策略提供了优化的方向。通过使用成交量、多周期分析、其他技术指标等信息进行综合判断,可以进一步增强该策略的效果。
||

### Overview

The Harami Closing Price strategy is a quantitative trading strategy based on candlestick patterns. This strategy identifies "Harami" patterns to generate buy and sell signals.  

### Strategy Logic

The core logic is: When the current candlestick is a red candle and the previous one is a green candle, and the current candle's lowest price is higher than the previous candle's lowest price, the current candle's highest price is lower than the previous candle's highest price, the "Harami" pattern is formed. This means the uptrend momentum is losing strength and it is a signal for selling. On the contrary, a "Harami" pattern with two candles inverted constitutes a buy signal.

The average of the candle body is used as a stop loss line. When the body is larger than half the stop loss line, stop loss triggers.

### Advantage Analysis  

The main advantages of the Harami Closing Price strategy are:

1. Simple and reasonable judgment based on candlestick patterns, easy to understand and implement.  
2. Can identify breakouts with relatively small trading volumes. When the rising range narrows down to form a "Harami" pattern, the bullish momentum is losing strength and it's a good selling point.
3. There is a clear stop loss mechanism to control risks.

### Risk Analysis   

There are also some risks for this strategy:

1. Low monitoring frequency, may miss the best entry and exit points. Not effective for shorter cycle candlesticks.  
2. False bullish/bearish candles may generate wrong signals. Needs to be used with trading volume and other filters.
3. Judgments are solely based on candlestick patterns without considering other technical indicators and fundamentals, which leads to some blindness.  

To mitigate these risks, combining with trading volume, moving averages and other technical indicators is recommended, to make more comprehensive judgments on market trends. The stop loss line can also be dynamically adjusted based on market volatility.

### Optimization Directions  

The Harami Closing Price strategy can also be improved from the following aspects:  

1. Adding trading volume condition checks. Surges in trading volumes often imply trend reversals.  
2. Adjusting stop loss criteria dynamically based on market volatility and risk preference.
3. Multi-timeframe analysis. Identifying selling points near key support levels on higher timeframes when Harami patterns form.  
4. Combining other technical indicators like moving averages to determine overall market trends, or leading indicators to forecast entry and exit points.

### Summary   

The Harami Closing Price strategy is easy to understand and implement for generating certain buy and sell signals based on candlestick patterns. But it also has some limitations like generating false signals and blindness. These problems also point to directions for further optimizations, by applying more comprehensive judgments with trading volumes, multiple timeframes, and other technical indicators. This can greatly enhance the strategy's efficacy.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|false|Short|
|v_input_3|1900|From Year|
|v_input_4|2100|To Year|
|v_input_5|true|From Month|
|v_input_6|12|To Month|
|v_input_7|true|From day|
|v_input_8|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-11-27 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=3
strategy(title = "Noro's Harami Strategy v1.0", shorttitle = "Harami str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(false, defval = false, title = "Short")

fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Body
body = abs(close - open)
abody = sma(body, 10)

//MinMax Bars
min = min(close, open)
max = max(close, open)
bar = close > open ? 1 : close < open ? -1 : 0

//Signals
up = bar == 1 and bar[1] == -1 and min > min[1] and max < max[1]
dn = bar == -1 and bar[1] == 1 and min > min[1] and max < max[1]
exit = ((strategy.position_size > 0 and bar == 1) or (strategy.position_size < 0 and bar == -1)) and body > abody / 2

//Trading
if up
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if dn
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if time > timestamp(toyear, tomonth, today, 23, 59) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/433585

> Last Modified

2023-11-28 16:50:34
