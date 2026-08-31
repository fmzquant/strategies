
> Name

Broken-High-Low-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17c7f2d18f71efeddd5.png)

## Overview

The Broken High/Low strategy is a trend-following strategy that tracks price breakouts beyond the high or low of the previous candlestick. It uses moving averages to determine the trend direction and enters on breakout points, with stop loss or trailing stop loss to lock in profits.   

## Strategy Logic

The key conditions for entry and exit determined by this strategy are:  

1. Identify if the candlestick is green or red to determine if it is an up candle or down candle
2. Check if the current candle breaks the high or low of the previous candle  
3. Use fast and slow moving averages to define the trend direction  
4. Go long when an up candle breaks above the high of a previous down candle, go short when a down candle breaks below the low of a previous up candle
5. Exit conditions are triggered by stop loss or trailing stop; can also exit immediately if a reversal candle appears  

The strategy also uses filters based on the second reversal candle to avoid false breakouts and ensure signal reliability.   

## Advantage Analysis 

- Clear strategy orientation, easy to grasp breakout operations
- Ensures correct trend judgment by combining dual moving averages  
- Trailing stop helps lock in more profits
- Reversal candle filters help avoid chasing highs and killing lows

## Risk Analysis  

- Failed breakout can cause loss from ultra short-term operations
- Larger risk of false breakout in range-bound markets
- Dual moving averages may lag, leading to judgment errors  

Risk Control Measures:  

1. Select indexes or major benchmarks to avoid high risk of individual stocks
2. Optimize moving average parameters to improve judgment accuracy  
3. Reasonably expand stop loss range to control single trade loss

## Optimization Directions   

This strategy can be optimized in the following aspects:  

1. Test different combinations of moving average parameters  
2. Test incorporating other technical indicators for combo judgment   
3. Optimize parameters of entry and stop loss levels 
4. Add quantitative filtering rules to select high quality underlying
5. Incorporate machine learning algorithms for adaptive parameter optimization  

## Summary  

The Broken High/Low strategy is overall a mature trend-following strategy. With the help of moving averages for auxiliary judgment, it can capture certain degree of trends. The stop loss and trailing stop mechanisms also help lock in profits. Through continuous testing and optimization, the parameters and performance of this strategy can become more outstanding.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|false|(?Exit strategy)Use trail stop EMA|
|v_input_1|8|Trail stop EMA length|
|v_input_bool_5|false|Using opposing bar as exit|
|v_input_2|5|(?Trend strength)Fast MA length|
|v_input_bool_2|false|Fast EMA enabled (default is SMA)|
|v_input_3|10|Slow MA length|
|v_input_bool_3|false|Slow EMA enabled (default is SMA)|
|v_input_bool_4|false|Use fast MA for trend ignoring slow MA|
|v_input_bool_6|false|Second bar that eliminates opposing bar for entry|
|v_input_bool_7|true|(?Trade settings)Enable longs|
|v_input_bool_8|true|Enable shorts|
|v_input_int_1|true|(?Time filters)FromMonth|
|v_input_int_2|true|FromDay|
|v_input_int_3|1990|FromYear|
|v_input_int_4|true|ToMonth|
|v_input_int_5|true|ToDay|
|v_input_int_6|9999|ToYear|
|v_input_bool_9|false|Close trades end of day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-15 00:00:00
end: 2023-12-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Broken High/Low Strategy", overlay=true, initial_capital = 5000, default_qty_value = 25, pyramiding = 10, default_qty_type= strategy.percent_of_equity)

useEMAForStop = input.bool(false, 'Use trail stop EMA', group = 'Exit strategy')
trailStopMALength = input(8, 'Trail stop EMA length', group = 'Exit strategy')

fastMALength = input(5 , 'Fast MA length', group = 'Trend strength')
fastEMAEnabled = input.bool(false, 'Fast EMA enabled (default is SMA)', group = 'Trend strength')

slowMALength = input(10, 'Slow MA length', group = 'Trend strength')
slowEMAEnabled = input.bool(false, 'Slow EMA enabled (default is SMA)', group = 'Trend strength')

ignoreSlowMA = input.bool(false, 'Use fast MA for trend ignoring slow MA', group = 'Trend strength')

useOpposingBarAsExit = input.bool(false, 'Using opposing bar as exit', group = 'Exit strategy')
secondEntryEnabled = input.bool(false, 'Second bar that eliminates opposing bar for entry', group = 'Trend strength')

longsEnabled = input.bool(true, 'Enable longs', group = 'Trade settings')
shortsEnabled = input.bool(true, 'Enable shorts', group = 'Trade settings')

fastMA = fastEMAEnabled ? ta.ema(close, fastMALength) : ta.sma(close, fastMALength)
slowMA = slowEMAEnabled ? ta.ema(close, slowMALength) : ta.sma(close, slowMALength)

FromMonth=input.int(defval=1,title="FromMonth",minval=1,maxval=12, group = 'Time filters')
FromDay=input.int(defval=1,title="FromDay",minval=1,maxval=31, group = 'Time filters')
FromYear=input.int(defval=1990,title="FromYear",minval=1900, group = 'Time filters')
ToMonth=input.int(defval=1,title="ToMonth",minval=1,maxval=12, group = 'Time filters')
ToDay=input.int(defval=1,title="ToDay",minval=1,maxval=31, group = 'Time filters')
ToYear=input.int(defval=9999,title="ToYear",minval=2017, group = 'Time filters')
start=timestamp(FromYear,FromMonth,FromDay,00,00)
finish=timestamp(ToYear,ToMonth,ToDay,23,59)
window()=>time>=start and time<=finish?true:false
afterStartDate = time >= start and time<=finish?true:false
closeTradesEOD = input.bool(false, 'Close trades end of day', group = 'Time filters')

trailStopMA = ta.ema(close, trailStopMALength)

isGreenCandle = close > open
isRedCandle = close < open
isBrokenHigh = close > open[1]
isPriorCandleRed = close[1] < open[1]
isPriorPriorCandleRed = close[2] < open[2]
isPriorPriorCandleGreen = close[2] > open[2]
isPriorCandleGreen = close[1] > open[1]
isBrokenLow = close < open[1]

isPriorRedCandleBroken = isGreenCandle and isPriorCandleRed and isBrokenHigh
isPriorGreenCandleBroken = isRedCandle and isPriorCandleGreen and isBrokenLow

isPriorPriorRedCandleBroken = secondEntryEnabled and not isPriorRedCandleBroken and isGreenCandle and isPriorPriorCandleRed ? close > open[2] : false
isPriorPriorGreenCandleBroken = secondEntryEnabled and not isPriorGreenCandleBroken and isRedCandle and isPriorPriorCandleGreen ? close < open[2] : false

longOpenCondition = (isPriorRedCandleBroken or isPriorPriorRedCandleBroken) and afterStartDate and (ignoreSlowMA ? close > fastMA : fastMA > slowMA) and longsEnabled
longCloseCondition = useOpposingBarAsExit ? isRedCandle : ta.crossunder(close, fastMA)
longCloseCondition := useEMAForStop ? ta.crossunder(close, trailStopMA) : longCloseCondition

shortOpenCondition = (isPriorGreenCandleBroken or isPriorPriorGreenCandleBroken) and afterStartDate and (ignoreSlowMA ? close < fastMA : fastMA < slowMA) and shortsEnabled
shortCloseCondition = useOpposingBarAsExit ? isGreenCandle : ta.crossover(close, fastMA)
shortCloseCondition := useEMAForStop ? ta.crossover(close, trailStopMA) : shortCloseCondition

if (longOpenCondition)
    strategy.entry("Long Entry", strategy.long)

if (longCloseCondition)
    strategy.close('Long Entry', 'Long Exit')

if (shortOpenCondition)
    strategy.entry("Short Entry", strategy.long)

if (shortCloseCondition)
    strategy.close('Short Entry', 'Short Exit')

if (closeTradesEOD and hour >= 14 and minute >= 30)
    strategy.close_all("EOD")

plot(useEMAForStop ? trailStopMA : na, linewidth = 2, color = color.red)
plot(fastMA)
plot(ignoreSlowMA ? na : slowMA, linewidth = 4)
```

> Detail

https://www.fmz.com/strategy/436224

> Last Modified

2023-12-22 12:59:43
