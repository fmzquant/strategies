
> Name

毎日交易策略Day-of-the-Week-Custom-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This is a custom long/short trading strategy for bitcoin that allows backtesting longing or shorting on different days of the week. The price may tend to move in one direction or another on each weekday, and this strategy allows testing across a range of dates to capitalize on this.

Make sure you are on the daily timeframe when viewing performance and trade history to ensure the script works as intended and you have maximum historical data from TradingView.

## Strategy Logic  

The core logic of the strategy is to allow the user to choose long, short or no trading for each day of the week.

First, it allows the user to set the date range for backtesting, including start month, day, year and end month, day, year.

Then, it uses an array timeframes to store the numeric representation of each day of the week, from Sunday 0 to Saturday 6. 

Another array timeframes_options is used to store the choice of long, short or no trading for each day. This is set via an input option.

In a for loop, the strategy checks if the current trading day matches a day in the timeframes array. If so, and the option differs from the previous day, it first closes all open positions.

If the option is not "None", it opens a position in the appropriate direction based on the chosen long or short.

Thus, the strategy can trade long/short over the set date range based on the settings for each day of the week.

## Advantage Analysis

The main advantage of this strategy is providing highly customizable long/short trading. The user has complete freedom in choosing trading direction for each day of the week.

Unlike fixed weekly trading strategies, this one can be flexibly adjusted. Poor performing days can be easily modified to only trade other days. 

The backtest date range is also highly flexible, allowing testing of any user specified period to see which date combinations perform best.

The trading logic is very clear and simple, easy to understand and modify. Users can adjust parameters without coding.

The strategy also auto closes positions on direction change each day, avoiding unnecessary risk.

## Risk Analysis

The main risk is that the user's chosen daily trading selections may not fit every date range. 

For example, long on weekdays and short weekends may prove effective for some periods but fail in others.

So date ranges must be carefully tested, and not rely on one backtest outcome. Parameter tweaking needs to consider market conditions.

Another risk is inability to cut losses in time when direction changes daily. But the strategy attempts to mitigate this by auto closing.

Overall, the strategy is heavily optimization reliant, and requires sufficient testing to find parameter sets fitting different market conditions.

## Optimization Directions

The strategy can be improved in several aspects:

1. Add stop loss logic on daily direction change, setting trailing stops when positions are profitable to limit drawdowns.

2. Add a filter, only taking signals on breaking certain day high/low, avoiding trading without trend. 

3. Reduce position sizing in high volatility periods, and increase when volatility is low to control risk.

4. Add machine learning to trading day selections, judging probability of each day based on historical data, generating dynamic daily directions.

5. Add logic to handle sudden events like major news by pausing trading to avoid being caught offsides.

## Conclusion

This strategy provides highly flexible long/short trading ability through daily direction selections. Users can freely combine test for optimum parameters. But it has high optimization requirements, needing extensive testing to find settings fitting different markets. Adding enhancements like stops, filters, dynamic adjustments can reduce risk and improve robustness. With prudent parameter optimization, the strategy can become an effective daily directional trading tool.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6|From Month|
|v_input_2|14|From day|
|v_input_3|2021|From Year|
|v_input_4|12|To Month|
|v_input_5|31|To day|
|v_input_6|2100|To Year|
|v_input_7|0|sunday: None|Short|Long|
|v_input_8|0|monday: Long|Short|None|
|v_input_9|0|tuesday: Long|Short|None|
|v_input_10|0|wednesday: Long|Short|None|
|v_input_11|0|thursday: None|Short|Long|
|v_input_12|0|friday: None|Short|Long|
|v_input_13|0|saturday: None|Short|Long|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-19 00:00:00
end: 2023-09-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

//@version=4
// strategy("Day of Week Custom Buy/Sell Strategy", overlay=true, currency=currency.USD, default_qty_value=1.0,initial_capital=30000.00,default_qty_type=strategy.percent_of_equity)

frommonth = input(defval = 6, minval = 01, maxval = 12, title = "From Month")
fromday = input(defval = 14, minval = 01, maxval = 31, title = "From day")
fromyear = input(defval = 2021, minval = 1900, maxval = 2100, title = "From Year")

tomonth = input(defval = 12, minval = 01, maxval = 12, title = "To Month")
today = input(defval = 31, minval = 01, maxval = 31, title = "To day")
toyear = input(defval = 2100, minval = 1900, maxval = 2100, title = "To Year")

timeframes = array.new_int(7, 1)
timeframes_options = array.new_string(7, 'None')

array.set(timeframes,0,7)
array.set(timeframes_options,0, input(defval='None', options=['Long','Short','None'], title='sunday'))
array.set(timeframes,1,1)
array.set(timeframes_options,1, input(defval='Long', options=['Long','Short','None'], title='monday'))
array.set(timeframes,2,2)
array.set(timeframes_options,2, input(defval='Long', options=['Long','Short','None'], title='tuesday'))
array.set(timeframes,3,3)
array.set(timeframes_options,3, input(defval='Long', options=['Long','Short','None'], title='wednesday'))
array.set(timeframes,4,4)
array.set(timeframes_options,4, input(defval='None', options=['Long','Short','None'], title='thursday'))
array.set(timeframes,5,5)
array.set(timeframes_options,5, input(defval='None', options=['Long','Short','None'], title='friday'))
array.set(timeframes,6,6)
array.set(timeframes_options,6, input(defval='None', options=['Long','Short','None'], title='saturday'))



for i = 0 to array.size(timeframes) - 1
    
    if dayofweek == array.get(timeframes, i) and array.get(timeframes_options, i) != array.get(timeframes_options, i==0?6:i-1)
        strategy.close_all()

    if dayofweek == array.get(timeframes, i) and array.get(timeframes_options, i)!='None' and array.get(timeframes_options, i) != array.get(timeframes_options, i==0?6:i-1)
        if array.get(timeframes_options, i) == 'Long'
            strategy.entry("Long", strategy.long, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))
        else if array.get(timeframes_options, i) == 'Short'
            strategy.entry("Short", strategy.short, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))

```

> Detail

https://www.fmz.com/strategy/427930

> Last Modified

2023-09-26 20:49:44
