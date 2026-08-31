
> Name

Relative-Strength-Index-and-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/32041c05f0b7369606.png)

## Overview  

The Relative Strength Index (RSI) and Moving Average Crossover strategy combines the RSI indicator and moving averages to make quantitative trading decisions. It utilizes the overbought and oversold levels indicated by RSI to determine entries and exits, alongside golden cross and death cross signals generated when RSI crosses its moving average line.

## Strategy Logic   

1. Calculate the RSI indicator value. RSI measures the magnitude of recent price changes to evaluate if an asset is overbought or oversold. 

2. Compute a moving average line (MA) of RSI, using an Exponential Moving Average (EMA) or Simple Moving Average (SMA).  

3. When RSI crosses above its MA line, a golden cross buy signal is generated. When RSI crosses below its MA line, a death cross sell signal is triggered.

4. When RSI rises above the overbought threshold, the asset is considered overbought and a short position can be initiated. When RSI falls below the oversold threshold, the asset is considered oversold and a long position can be opened.

## Advantage Analysis

1. Combining indicator crossover signals with RSI overbought/oversold levels improves the accuracy of trading decisions.   

2. RSI overbought and oversold thresholds determine optimal entries and exits.

3. Capturing trend reversals by acting on indicator crossover signals. 

## Risk Analysis  

1. RSI may generate incorrect signals during choppy or sideways markets.

2. Improper overbought or oversold threshold settings could lead to signals that are too loose or too strict. 

3. Moving averages are sensitive to short-term anomalies and volatility spikes, increasing the likelihood of being stopped out prematurely.

## Optimization Directions 

1. Optimize RSI parameter by testing different length periods.  

2. Find the optimal moving average periods by assessing different MA lengths.

3. Test various overbought and oversold threshold levels to refine entry signals.  

4. Incorporate additional filters to validate signals and avoid false trades.

## Conclusion

The RSI and Moving Average Crossover Strategy combines RSI overbought/oversold levels with MA crossover signals to identify market turning points and capture reversals. Performance and risk management can be enhanced through parameter optimization and signal filtering. This medium-term trading strategy offers strong alpha generation potential for experienced investors.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|13|Length|
|v_input_2|9|MA Lenght|
|v_input_3|false|Exponential|
|v_input_4|10|From Month|
|v_input_5|3|From Day|
|v_input_6|2017|From Year|
|v_input_7|true|To Month|
|v_input_8|true|To Day|
|v_input_9|9999|To Year|
|v_input_10|90|RSI % start overbought|
|v_input_11|10|RSI % start oversold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-14 00:00:00
end: 2023-12-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//dfurrer45
strategy(title="Relative Strength Index", shorttitle="RSI", overlay=true)
src = close, len = input(13, minval=1, title="Length"), maLen = input(9, minval=1, title="MA Lenght"), exponential = input(false, title="Exponential")

// === BACKTEST RANGE ===
FromMonth = input(defval = 10, title = "From Month", minval = 1)
FromDay   = input(defval = 3, title = "From Day", minval = 1)
FromYear  = input(defval = 2017, title = "From Year", minval = 2014)
ToMonth   = input(defval = 1, title = "To Month", minval = 1)
ToDay     = input(defval = 1, title = "To Day", minval = 1)
ToYear    = input(defval = 9999, title = "To Year", minval = 2014)
// ===  BACKTEST END  ===
backtestdaterange = (time > timestamp(FromYear, FromMonth, FromDay, 00, 00))

rsioverbought = input(90, minval=1, title="RSI % start overbought")
rsioversold = input(10, minval=1, title="RSI % start oversold")
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
ma = exponential ? ema(rsi, maLen) : sma(rsi, maLen)
rsimacrossup = cross(rsi,ma) and rsi > ma
rsimacrossdown = cross(rsi,ma) and rsi < ma
plotchar(rsimacrossup, char='⇧', location = location.belowbar, color = green, text = "", textcolor = green, size=size.small)
plotchar(rsimacrossdown, char='⇩', location = location.abovebar, color = red, text = "", textcolor = red, size=size.small)
plotchar(rsi > rsioverbought, char='x', location = location.belowbar, color = aqua, text = "", textcolor = red, size=size.small)
plotchar(rsi < rsioversold, char='x', location = location.belowbar, color = aqua, text = "", textcolor = red, size=size.small)


closetrade = rsimacrossup or rsimacrossdown
strategy.close_all(closetrade)
strategy.close_all((rsi > rsioverbought) or (rsi < rsioversold))
strategy.entry("Short Overbought",strategy.short, when=(rsi > rsioverbought) and backtestdaterange)
strategy.entry("Buy Overbought",strategy.long, when=(rsi < rsioversold) and backtestdaterange)
strategy.entry("Long Cross", strategy.long, when=rsimacrossup and backtestdaterange)
strategy.entry("Short Cross", strategy.short, when=rsimacrossdown and backtestdaterange)

```

> Detail

https://www.fmz.com/strategy/436099

> Last Modified

2023-12-21 11:30:27
