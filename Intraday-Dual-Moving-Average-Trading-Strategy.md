
> Name

Intraday-Dual-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10a1a5b5e6ad30900c8.png)

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
