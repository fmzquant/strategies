
> Name

BVs-ICHIMOKU-CLOUD-All-Signals

> Author

ChaoZhang

> Strategy Description


This script is a strategy for the Ichimoku Cloud system for trading. Here's how it works:

1. The script allows you to test a variety of trading signals offered by the Ichimoku cloud system.

2. If you're testing a currency pair that includes the Japanese Yen (JPY), make sure to check the JPYPAIR checkbox as this adjusts how the script calculates stop-loss and take-profit.

3. You can change the ratio for take profit (TP) and stop loss (SL) values in the script's parameters. Good results are found with a 1.5:1 ratio.

4. The script uses the Ichimoku Cloud calculations for signal inputs such as Tenkan/Kijun, Price/Kijun, and Price/Tenkan among others. Depending on your choice, the script will provide respective trading signals.

5. The Ichimoku clouds are plotted using donchian function, and signals are generated when the price crosses over or under the conversion line, base line, kumo high or kumo low based on your selection from the input menu.

6. The script also includes conditions for long and short trade entries.

7. It uses the Average True Range (ATR) for money management, using multipliers for stop loss and take profit which can be adjusted.

8. Additionally, there is a filter for the testing time, allowing you to specify how many years in the past you want to test the strategy.

9. Lastly, the strategy is set to enter or exit a trade based on the continuation signals and the ATR values for profit and loss.

This script can be a helpful tool to backtest the Ichimoku Cloud trading strategies, but as always, one should spend time understand the logic and adjusting the parameters based on their knowledge and comfort level. Also, backtesting results are just indicative and the future performance could vary.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|SIGNAL - Choose your signal: Tenkan/Kijun|Tenkan/Kijun+Kumo|Price/Tenkan|Price/Tenkan+Kumo|Price/Kijun|Price/Kijun+Kumo|Price/Kumo|Kumo Color|
|v_input_2|false|ATR - Check if JPY Pair |
|v_input_3|9|Conversion Line Periods|
|v_input_4|26|Base Line Periods|
|v_input_5|52|Lagging Span 2 Periods|
|v_input_6|26|Displacement|
|v_input_7|1.5|ATR - Stop Loss Multiplier|
|v_input_8|true|ATR - Take Profit Multiplier|
|v_input_9|3|Time - How many years of testing ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-03-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © vuagnouxb

//@version=4
strategy("BV's ICHIMOKU CLOUD SIGNAL TESTER", overlay=true)


// Signal imputs 
signalChoice = input(title = "SIGNAL - Choose your signal", defval = "Tenkan/Kijun", options = ["Tenkan/Kijun", "Tenkan/Kijun+Kumo", "Price/Tenkan", "Price/Tenkan+Kumo", "Price/Kijun", "Price/Kijun+Kumo", "Price/Kumo", "Kumo Color"])
JPYPair = input(type = input.bool, title = "ATR - Check if JPY Pair ", defval = false)


//------------------------------------------------------------------------
//----------               ICHIMOKU CLOUD Calculation          ----------- INPUT
//------------------------------------------------------------------------

conversionPeriods = input(9, minval=1, title="Conversion Line Periods"),
basePeriods = input(26, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Periods"),
displacement = input(26, minval=1, title="Displacement")

donchian(len) => avg(lowest(len), highest(len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

plot(conversionLine, color=#0496ff, title="Conversion Line")
plot(baseLine, color=#991515, title="Base Line")
plot(close, offset = -displacement + 1, color=#459915, title="Lagging Span")

p1 = plot(leadLine1, offset = displacement - 1, color=color.green,
 title="Lead 1")
p2 = plot(leadLine2, offset = displacement - 1, color=color.red,
 title="Lead 2")
fill(p1, p2, color = leadLine1 > leadLine2 ? color.green : color.red)

kumoHigh = max(leadLine1[displacement-1], leadLine2[displacement-1])
kumoLow = min(leadLine1[displacement-1], leadLine2[displacement-1])

// -- Trade entry signals

continuationSignalLong = signalChoice == "Tenkan/Kijun" ? crossover(conversionLine, baseLine) :
   signalChoice == "Tenkan/Kijun+Kumo" ? crossover(conversionLine, baseLine) and close > kumoHigh : 
   signalChoice == "Price/Tenkan" ? crossover(close, conversionLine) : 
   signalChoice == "Price/Tenkan+Kumo" ? crossover(close, conversionLine) and close > kumoHigh :
   signalChoice == "Price/Kijun" ? crossover(close, baseLine) :
   signalChoice == "Price/Kijun+Kumo" ? crossover(close, baseLine) and close > kumoHigh : 
   signalChoice == "Price/Kumo" ? crossover(close, kumoHigh) :
   signalChoice == "Kumo Color" ? crossover(leadLine1, leadLine2) :
   false
   
continuationSignalShort = signalChoice == "Tenkan/Kijun" ? crossunder(conversionLine, baseLine) :
   signalChoice == "Tenkan/Kijun+Kumo" ? crossunder(conversionLine, baseLine) and close < kumoLow : 
   signalChoice == "Price/Tenkan" ? crossunder(close, conversionLine) : 
   signalChoice == "Price/Tenkan+Kumo" ? crossunder(close, conversionLine) and close < kumoLow :
   signalChoice == "Price/Kijun" ? crossunder(close, baseLine) :
   signalChoice == "Price/Kijun+Kumo" ? crossunder(close, baseLine) and close < kumoLow : 
   signalChoice == "Price/Kumo" ? crossunder(close, kumoLow) :
   signalChoice == "Kumo Color" ? crossunder(leadLine1, leadLine2) :
   false

longCondition = continuationSignalLong

shortCondition = continuationSignalShort

//------------------------------------------------------------------------
//----------             ATR MONEY MANAGEMENT                 ------------
//------------------------------------------------------------------------

SLmultiplier = input(title = "ATR - Stop Loss Multiplier", type = input.float, defval = 1.5, step = 0.1)
TPmultiplier = input(title = "ATR - Take Profit Multiplier", type = input.float, defval = 1.0, step = 0.1)

pipAdjuster = JPYPair ? 1000 : 100000

ATR = atr(14) * pipAdjuster // 1000 for jpy pairs : 100000
SL = ATR * SLmultiplier
TP = ATR * TPmultiplier

//------------------------------------------------------------------------
//----------                  TIME FILTER                     ------------
//------------------------------------------------------------------------

YearOfTesting = input(title = "Time - How many years of testing ?" , type = input.integer, defval = 3)

_time = 2020 - YearOfTesting

timeFilter = (year > _time) 

//------------------------------------------------------------------------
//---------                 ENTRY FUNCTIONS                    ----------- INPUT
//------------------------------------------------------------------------

if (longCondition and timeFilter)  
    strategy.entry("Long", strategy.long)

if (shortCondition and timeFilter) 
    strategy.entry("Short", strategy.short)
    
//------------------------------------------------------------------------
//---------                 EXIT  FUNCTIONS                    -----------
//------------------------------------------------------------------------


strategy.exit("ATR", from_entry = "Long", profit = TP, loss = SL)  

strategy.exit("ATR", from_entry = "Short", profit = TP, loss = SL)  
```

> Detail

https://www.fmz.com/strategy/426142

> Last Modified

2023-09-08 16:18:04
