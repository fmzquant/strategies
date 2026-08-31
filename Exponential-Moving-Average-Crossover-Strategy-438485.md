
> Name

Exponential-Moving-Average-Crossover-Strategy-438485

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/181aa8a4d91462210af.png)

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
