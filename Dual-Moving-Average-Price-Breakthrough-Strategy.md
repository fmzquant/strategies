
> Name

Dual-Moving-Average-Price-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ec072ccc04f27bb1bd.png)


### Overview

This strategy uses two moving averages to determine price trends and breakthroughs. Go short when the price breaks through the upper rail and go long when the price breaks through the lower rail. Set stop loss exits to control risks.

### Principles  

1. Use the sma() function to calculate short-term and long-term two moving averages as the upper and lower rails of the trading strategy.
2. Calculate the buy price and sell price: the buy price is the lower rail multiplied by a coefficient less than 1, and the sell price is the upper rail multiplied by a coefficient greater than 1.
3. When the price breaks through the upper rail, open a short position with a market order; when the price breaks through the lower rail, open a long position with a limit order.
4. Set the year, month and date range to control the trading cycle of the strategy.
5. Close all positions when the backtest ends or exceeds the date range.

### Advantages

This strategy has the following advantages:

1. Using a double rail system can filter market noise and identify trends. 
2. Using price breakthrough to determine entry timing can reduce false signals.
3. Using limit orders reduces market impact costs. 
4. The trading cycle can be easily adjusted to control strategy risks.

### Risks 

This strategy also has some risks:  

1. Double rail breakthroughs can easily lead to continuous loss risks. Stop loss exits can be set to control losses.
2. When the trading target enters consolidation, there is a risk of too many transactions. The distance between the upper and lower rails can be appropriately widened.
3. Limit orders may miss some buying opportunities. Consider using market orders instead.  

### Optimization

This strategy can be optimized in the following aspects:

1. Test different combinations of moving average lengths to find the best parameters.  
2. Increase the Volumes indicator to determine breakthroughs in transaction volume.
3. Increase adaptive stop loss mechanism to adjust stop loss price in real time.
4. Increase machine learning models to determine trend direction.   

### Summary  

The overall idea of this strategy is clear and easy to understand. By using the double rail system to identify trends and using price breakthroughs to determine entry timing, it can filter noise and achieve stable profits. There is also room for improvement and optimization. Overall, it is a reproducible quantitative trading strategy with practical value.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|Lot, %|
|v_input_2|3|Length|
|v_input_3_ohlc4|0|Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_4|-5|Buy line (lime)|
|v_input_5|false|Sell line (red)|
|v_input_6|1900|From Year|
|v_input_7|2100|To Year|
|v_input_8|true|From Month|
|v_input_9|12|To Month|
|v_input_10|true|From day|
|v_input_11|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-13 00:00:00
end: 2023-11-20 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=3
strategy(title = "Noro's Shift MA Strategy v1.0", shorttitle = "Shift MA str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot, %")
per = input(3, defval = 1, minval = 1, maxval = 1000, title = "Length")
src = input(ohlc4, title = "Source")
buylevel = input(-5.0, defval = -5.0, minval = -100, maxval = 0, title = "Buy line (lime)")
selllevel = input(0.0, defval = 0.0, minval = -100, maxval = 100, title = "Sell line (red)")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//SMAs
sma = sma(src, per) 
buy = sma * ((100 + buylevel) / 100)
sell = sma * ((100 + selllevel) / 100)
plot(buy, linewidth = 2, color = lime, title = "Buy line")
plot(sell, linewidth = 2, color = red, title = "Sell line")

//Trading
size = strategy.position_size
lot = 0.0
lot := size == 0 ? strategy.equity / close * capital / 100 : lot[1]

if (not na(close[per])) and size == 0
    strategy.entry("L", strategy.long, lot, limit = buy)
    
if (not na(close[per]))    
    strategy.entry("Close", strategy.short, 0, limit = sell)

if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/432796

> Last Modified

2023-11-21 15:33:52
