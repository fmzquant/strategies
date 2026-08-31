
> Name

Quantitative-Golden-Cross-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1504f82bc5194f4a0d9.png)


## Overview  

This strategy calculates a custom net volume indicator to implement a trading strategy of buying on golden crossover and selling on death crossover. This strategy belongs to the trend following strategy.  

## Strategy Principle   

The core logic of the strategy is to calculate a custom net volume (NV) indicator. The NV indicator judges the direction of price changes. If positive, it takes the daily volume. If negative, it takes the negative value of the daily volume. If unchanged, it takes 0. This can more clearly reflect the relationship between price changes and volume.   

The strategy then calculates the 3-day simple moving average line of the NV indicator, respectively, as the golden cross line and death cross line. When the NV indicator breaks through the golden cross line from bottom to top, go long. When NV breaks through the death cross line from top to bottom, go short.   

In addition, the strategy also sets parameterized start and end times to control trading hours.  

## Advantages of Strategy   

The biggest advantage of this strategy is that the strategy is simple and clear, easy to understand, flexible parameter settings, customizable trading varieties, trading hours, etc. In addition, this strategy belongs to a trend-following strategy that can effectively capture price trends, reduce trading frequency, and achieve higher returns.   

## Risks of Strategy  

The main risks of this strategy are:  

1. The daily following strategy cannot respond promptly to changes in price trends. It may miss some trading opportunities or fail to stop losses in time.  

2. The quantitative golden cross itself has certain hysteresis, which may lead to late entry and amplified losses.  

3. Unable to effectively filter out market noise and susceptible to traps.

Moving averages can be used dynamically, combined with other indicators to reduce risks.

## Optimization Directions   

The strategy can be optimized in the following aspects:  

1. Increase stop loss strategies to control single loss with moving stop loss, overnight stop loss methods.   

2. Increase filtering indicators and use MACD, KDJ and other indicators to filter false signals and improve strategy stability.  

3. Parameter optimization, iterative search for the optimal parameter combination through genetic algorithms, Markov chains and other methods.  

4. Strategy portfolio can be combined with other unrelated strategies to further diversify risks and increase overall returns.   

## Conclusion  

This strategy implements simple and effective trend following through quantitative golden crosses. Although there is a certain degree of hysteresis, the parameter settings are flexible and easy to understand. It is a strategy suitable for beginners to practice. Through continuous optimization, the strategy effect can be gradually improved and risks reduced.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|VA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|50|VHigh Amount|
|v_input_3|-50|VLow Amount|
|v_input_4|true|From Month|
|v_input_5|true|From Day|
|v_input_6|2018|From Year|
|v_input_7|true|To Month|
|v_input_8|true|To Day|
|v_input_9|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-14 00:00:00
end: 2023-11-15 03:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="@DankCoins - Customized Net Volume")
src = input(defval = close, title = "VA Source")
nv = change(src) > 0 ? volume : change(src) < 0 ? -volume : 0*volume



// Inputs //
VHigh = input(defval = 50, title = "VHigh Amount")
VLow = input(defval = -50, title = "VLow Amount")


// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2018, title = "From Year", minval = 2012)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2012)

MAV1 = sma(volume, 3)
MAV2 = -sma(volume, 3)

enterShort = crossunder(nv, MAV1)
exitShort = crossunder(nv, MAV2)
enterLong = crossover(nv, MAV2)
exitLong = crossover(nv, MAV1)

// Time Function 
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false // create function "within window of time"


strategy.entry(id="Long Entry", long=true, when=enterLong and window())
strategy.entry(id="Short Entry", long=false, when=enterShort and window())
strategy.exit("Exit Long", from_entry = "Long Entry",  when=exitLong and window())
strategy.exit("Exit Short", from_entry = "Short Entry",  when=exitShort and window())


// Plot
plot(nv, color=blue, title="NV")
plot(VHigh, color=red)
plot(VLow, color=red)
plot(MAV1, color=green)
plot(MAV2, color=green)
```

> Detail

https://www.fmz.com/strategy/432879

> Last Modified

2023-11-22 14:39:33
