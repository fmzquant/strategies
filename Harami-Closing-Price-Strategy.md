
> Name

Harami-Closing-Price-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8e2c835256eefbf33a.png)

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
