
> Name

Trend-Tracking-Breakout-Strategy-439645

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e52d416774d2204990.png)

## Overview

This is a breakout strategy based on trend tracking. It buys strength when a breakout occurs and sells weakness to track the trend.  

## Strategy Logic

The strategy mainly relies on two indicators to determine entry and exit signals - the highest() function that determines the highest price over a certain period, and the lowest() function that determines the lowest price over a certain period.  

When the close price is above the highest price over a certain period (highPeriod parameter), it is considered an upward trend breakout, so a long signal is issued. When the close price is below the lowest price over a certain period (lowPeriod parameter), it is considered a downward trend breakout, so a short signal is issued.

The strategy also sets a moving stop loss and a fixed stop loss. The moving stop loss is based on the ATR indicator, calculated by an ATR value over a certain period multiplied by a factor (trailingAtrMultiplier parameter) as the moving stop loss level. The fixed stop loss is calculated similarly based on the ATR indicator.

After going long or short, the fixed stop loss takes effect for the first bar; then it switches to a primarily moving stop loss. This combination locks in some profits while tracking the trend.

The strategy also sets rules for position sizing calculation. Based on the maximum acceptable loss percentage, account equity etc, it calculates the appropriate position size. It also takes into account the number of trading instruments, properly reducing the position size for each instrument.

In summary, this is a typical trend-tracking breakout strategy. It enters when it judges a breakout has occurred, locks in profits and tracks trends through stop loss, and exits when the trend reverses.

## Advantage Analysis 

The main advantages of this strategy are:

1. Accurate trend judgment. Using the highest and lowest prices to determine if trends reversed, the accuracy is very high and false signals are unlikely.

2. Reasonable position sizing and stop loss. Maximum loss percentage setting, account equity association etc make the position sizes reasonable, avoiding over-trading or ineffective trading. The combined stop loss locks profits and tracks trend movements.

3. Simple and practical, easy to understand and use. It only relies on basic indicators and the logic is straightforward, easy to grasp.  

4. Good extensibility. Indicator parameters, position sizing rules etc all provide input boxes for users to adjust as needed.

In summary, this is a very practical breakout strategy. Safe and reliable in judgement, while the design considers risk control and tracking. Very suitable for medium to long term holding.  

## Risk Analysis

The main risks of this strategy are:

1. Trend reversal risk. Breakout strategies rely heavily on trend judgement, if it goes wrong, huge losses may be faced.  

2. Improper parameter risk. If highest/lowest price cycle parameters are chosen poorly, trends could be missed. Improper position sizing parameters can lead to oversized losses.

3. Overly aggressive stop loss risk. If the moving stop loss distance is too small, market noise could knock the position out prematurely.  

The main solutions are:

1. Add trend filters. Such as additional indicators to check for false breakouts.  

2. Optimize parameter selection through tests for stability.

3. Relax the stop loss distance appropriately to withstand reasonable retracements.

## Optimization Directions

The main optimization directions for this strategy are:  

1. Add more indicators to determine trends. Besides highest/lowest prices, indicators like moving averages can also be added to make trend determination more accurate. 

2. Optimize parameter settings. Test and find the optimal combinations for parameters like highest/lowest price cycles, stop loss multiplier factors etc.  

3. Adjust position sizing algorithm based on market conditions. For example, lower position sizes when volatility (e.g. VIX) rises.

4. Add volume filter for breakout confirmation, to avoid false breakouts.   

5. Consider spreads and correlations in selecting trading instruments. Choosing instruments with small spread variances and low correlations can reduce portfolio risks.

6. Optimize the stop loss mechanism. Test different compositions of moving and fixed stop losses to make stop losses less aggressive.  

## Conclusion

As a trend-tracking breakout strategy, this strategy performs well in accuracy of judgement, position sizing & risk control, ease of operation etc. It captures trends early and balances profit taking and tracking through moving stop losses. 

Of course, as a breakout strategy, it relies heavily on trend judgement and is prone to market noise interference. Poor parameter tuning could also undermine performance. Further optimizations are needed to address these issues.  

Overall this is a very practical strategy. Its basic structure already contains the most crucial components for a quant strategy. With continuous optimizations and enhancements, it can definitely become a stable profitable automated strategy. Valuable for quants to study and reference.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|(?Risk Management)Max % risk|
|v_input_2|true|How many pairs|
|v_input_3|168|(?Entry Condition)Highest High Period|
|v_input_4|168|Lowest Low Period|
|v_input_5|10|(?Exit Condition)Trailing ATR Pediod|
|v_input_6|8|Trailing ATR Multiplier|
|v_input_7|10|Fix ATR Pediod|
|v_input_8|2|Fix ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(shorttitle="Trend Surfers - Breakout", title="Trend Surfers - Premium Breakout",
     overlay=true)

// Risk for position and pyramid
maxriskval = input(2, "Max % risk", type = input.float,
     tooltip="Risk % over total equity / Position", group = "Risk Management")
pairnumber = input(title = "How many pairs",type = input.integer, defval= 1,
     tooltip="How many pairs are you trading with the strategy?", group = "Risk Management")

// Emtry Exit
highPeriod = input(title="Highest High Period", type=input.integer, defval=168
     , tooltip="Highest High of X bars - This will trigger a Long Entry when close is above. (Thin Green Line)"
     , group = "Entry Condition")
lowPeriod = input(title="Lowest Low Period", type=input.integer, defval=168,
     tooltip="Lowest low of X bars - This will trigger a Short Entry when close is under. (Thin Red Line)"
     , group = "Entry Condition")
// Stoploss
trailingAtrPeriod = input(title="Trailing ATR Pediod", type=input.integer, defval=10,
     tooltip="Average True Range for the Trailing Stop. (Thick Green Line) "
     , group = "Exit Condition")
trailingAtrMultiplier = input(title="Trailing ATR Multiplier", type=input.float, defval=8
     , group = "Exit Condition")
fixAtrPeriod = input(title="Fix ATR Pediod", type=input.integer, defval=10,
     tooltip="Average True Range for the Fix Stoloss. (Thick Yellow Line)"
     , group = "Exit Condition")
fixAtrMultiplier = input(title="Fix ATR Multiplier", type=input.float, defval=2
     , group = "Exit Condition")
// Pair info 
pair = syminfo.basecurrency + syminfo.currency

// High Low Variable
highestHigh = highest(high, highPeriod)[1]
lowestLow = lowest(low, lowPeriod)[1]
trailingAtr = atr(trailingAtrPeriod) * trailingAtrMultiplier

// Trade Condition
longCondition = crossover(close, highestHigh) 
shortCondition = crossunder(close, lowestLow)

// Risk Variable
fixAtr = atr(fixAtrPeriod) * fixAtrMultiplier
stopvaluelong = close[1] - fixAtr[1]
stopvalueshort = close[1] + fixAtr[1]

// Position size Long
maxpossize = strategy.equity / close 
positionsizelong = ( ( ( (maxriskval/100) * strategy.equity) / (close - stopvaluelong))) 
stopperclong = ((close - stopvaluelong) / close) * 100
leveragelong = max(1, ceil(positionsizelong / maxpossize)) * 2
posperclong =  (((positionsizelong * close) / strategy.equity) *100 / leveragelong) / pairnumber
realposlong = (((posperclong / 100) * strategy.equity) * leveragelong) / close

// Position size Short
positionsizeshort = ( ( ( (maxriskval/100) * strategy.equity) / (stopvalueshort - close))) 
stoppercshort = ((close - stopvalueshort) / close) * 100
leverageshort = max(1, ceil(positionsizeshort / maxpossize)) * 2
pospercshort =  (((positionsizeshort * close) / strategy.equity) *100 / leverageshort) / pairnumber
realposshort = (((pospercshort / 100) * strategy.equity) * leverageshort) / close

// Alert Message
entry_long_message = '\nGo Long for ' + pair + 'NOW!' +
                     '\nPosition Size % =' + tostring(posperclong) +
                     '\nLeverage' + tostring(leveragelong) +
                     '\nStoploss Price =' + tostring(stopvaluelong) +
                     '\nClose any Short position that are open for ' + pair + '!' +
                     '\n\nVisit TrendSurfersSignals.com' +
                     '\nFor automated premium signals (FREE)'

entry_short_message ='\nGo Short for ' + pair + 'NOW!' +
                     '\nPosition Size % =' + tostring(pospercshort) +
                     '\nLeverage' + tostring(leverageshort) +
                     '\nStoploss Price =' + tostring(stopvalueshort) +
                     '\nClose any Long position that are open for ' + pair + '!' +
                     '\n\nVisit TrendSurfersSignals.com' +
                     '\nFor automated premium signals (FREE)'

exit_short_message = '\nExit Short for ' + pair + 'NOW!' +
                     '\n\nVisit TrendSurfersSignals.com' +
                     '\nFor automated premium signals (FREE)'

exit_long_message = '\nExit Long for ' + pair + 'NOW!' +
                     '\n\nVisit TrendSurfersSignals.com' +
                     '\nFor automated premium signals (FREE)'
// Order
if longCondition 
    strategy.entry("Long", strategy.long, stop=highestHigh, comment="Long", qty=realposlong
     , alert_message = entry_long_message)
if shortCondition
    strategy.entry("Short", strategy.short, stop=lowestLow, comment="Short", qty=realposshort
     , alert_message = entry_short_message)

// Stoploss Trailing
longTrailing = close - trailingAtr
shortTrailing = close + trailingAtr

var longTrailingStop = 0.0
var shortTrailingStop = 999999.9

trailingStopLine = 0.0
trailingStopLine := na
fixedStopLine = 0.0
fixedStopLine := na
var inTrade = 0
if longCondition or shortCondition
    if 0 == inTrade
        if longCondition
            inTrade := 1
        else
            inTrade := -1
if 1 == inTrade and (shortCondition or low <= max(fixedStopLine[1], longTrailingStop))
    inTrade := 0
if -1 == inTrade and (longCondition or high >= min(fixedStopLine[1], shortTrailingStop))
    inTrade := 0

longTrailingStop := if (1 == inTrade)
    stopValue = longTrailing
    max(stopValue, longTrailingStop[1])
else
    0

shortTrailingStop := if (-1 == inTrade)
    stopValue = shortTrailing
    min(stopValue, shortTrailingStop[1])
else
    999999

// Fix Stoploss
firstPrice = 0.0
firstFixAtr = 0.0
firstPrice := na
firstFixAtr := na
if 0 != inTrade
    firstPrice := valuewhen(inTrade != inTrade[1] and 0 != inTrade, close, 0)
    firstFixAtr := valuewhen(inTrade != inTrade[1] and 0 != inTrade, fixAtr, 0)
    if 1 == inTrade
        fixedStopLine := firstPrice - firstFixAtr
        trailingStopLine := longTrailingStop
    else
        fixedStopLine := firstPrice + firstFixAtr
        trailingStopLine := shortTrailingStop

if (strategy.position_size > 0)
    strategy.exit(id="L Stop", stop=max(fixedStopLine, longTrailingStop)
     , alert_message = exit_long_message)

if (strategy.position_size < 0)
    strategy.exit(id="S Stop", stop=min(fixedStopLine, shortTrailingStop)
     , alert_message = exit_long_message)
    

// Plot
plot(highestHigh, color=color.green, linewidth=1, transp=0, title='Highest High')
plot(lowestLow, color=color.red, linewidth=1, transp=0, title='Lowest Low')
plot(trailingStopLine, color=color.lime, linewidth=2, transp=0, offset=1, title='Trailing Stop')
plot(fixedStopLine, color=color.orange, linewidth=2, transp=0, offset=1, title='Fixed Stop')
```

> Detail

https://www.fmz.com/strategy/439645

> Last Modified

2024-01-22 17:21:10
