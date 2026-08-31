
> Name

Moving-Average-Crossover-Strategy-428856

> Author

ChaoZhang

> Strategy Description



## Overview

The moving average crossover strategy is a commonly used trading strategy based on moving averages. It uses the crossover of a faster moving average and a slower moving average as trading signals. When the faster moving average crosses above the slower moving average from below, it is a buy signal. When the faster moving average crosses below the slower moving average from above, it is a sell signal. This strategy uses 50-day MA as the faster MA and 200-day MA as the slower MA.

## Strategy Logic

The core logic of this strategy is based on the theory of moving averages. Moving averages can effectively smooth price fluctuations and indicate price trends. The faster MA is more sensitive to price changes and can capture trend reversal points. The slower MA is less sensitive to price changes and can filter out short-term fluctuations. When the faster MA crosses above the slower MA, it indicates an uptrend in prices. When the faster MA crosses below the slower MA, it indicates a downtrend in prices.

Specifically, this strategy first defines the 50-day MA and 200-day MA. The long entry condition is set when the faster MA crosses above the slower MA. The short entry condition is set when the faster MA crosses below the slower MA. To avoid overlapping trades, the strategy uses isEntry and isExit flags for control. When the entry condition is met, isEntry is set to true. When the exit condition is met, isExit is set to true. A long position will only be opened when isEntry is false and a buy signal appears. A short position will only be opened when isExit is false and a sell signal appears.

In addition, the strategy also sets take profit and stop loss levels. Users can define the TP/SL percentage distance through inputs. The TP and SL prices will be calculated based on the entry price percentage. When position size is greater than 0, TP and SL will be executed based on the long TP/SL percentage. When position size is less than 0, TP and SL will be based on the short TP/SL percentage.

## Advantage Analysis

The advantages of this strategy include:

1. Simple to implement. It trades purely based on MA crosses, suitable for beginners without trading experience.

2. Controllable drawdown with risk management. Moving averages can filter short-term fluctuations and avoid being stopped out.

3. Customizable parameters for adaptability. Users can optimize parameters like MA periods and TP/SL levels.

4. Clear visualization. The strategy plots the key MAs, entries, and TP/SL levels on the chart.

5. Extendable framework. The strategy structure is complete. New signals and indicators can be added to enhance it.

## Risk Analysis

The risks of this strategy include:

1. Unable to stop loss during extreme market events, leading to huge drawdown. Faster MA is sensitive to price changes and may fail in extreme conditions.

2. Prone to whipsaws in ranging markets, causing consecutive losses.

3. Trading costs are not considered. Fees and slippage in actual trading will significantly impact profitability.

4. Backtest overfitting. Real market conditions are complex and backtest results may not represent live performance.

The solutions include:

1. Use a wider stop loss, or add an additional breakout stop loss.

2. Widen the MA distance, reduce trade frequency, or add other filters.

3. Consider actual trading costs, set a wider profit target space. 

4. Optimize parameters gradually and reduce overfitting by considering changing market conditions.

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Test different parameter combinations to find the optimal parameters, like MA periods.

2. Add other indicators as filters to avoid whipsaws, such as MACD, KD etc.

3. Optimize stop loss strategy for better risk management, like trailing stop loss. 

4. Increase position size with leverage to magnify profits while controlling risk.

5. Consider trading costs, optimize parameters for live trading.

6. Evaluate parameter stability using statistical methods to reduce overfitting.

## Conclusion

In conclusion, this MA crossover strategy has a clear logic and is simple to implement, suitable as an introductory strategy for algo trading. But it also has risks and limitations. Careful parameter and filter optimization, and risk control are needed to achieve steady profits. This strategy has great extensibility for users to innovate and optimize based on it to suit their own trading style.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2020|Backtest Start Year|
|v_input_2|5|Backtest Start Month|
|v_input_3|11|Backtest Start Day|
|v_input_4|3650|Backtest Period (days)|
|v_input_5|false|Long Take Profit (%)|
|v_input_6|false|Long Stop Loss (%)|
|v_input_7|false|Short Take Profit (%)|
|v_input_8|false|Short Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-10-09 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © gjfsdrtytru

//@version=4
strategy("Backtest Engine", "Backtest", overlay=true, commission_type=strategy.commission.percent, commission_value=0.07, initial_capital = 1000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, currency = currency.USD)


// Start code here...
fastMA = sma(close,50)
slowMA = sma(close,200)

plot(fastMA, "Fast MA",  color.blue)
plot(slowMA, "Slow MA",  color.red)

// Long Enrty/Exit
longCondition = crossover(fastMA,slowMA)
closeLong = crossover(slowMA,fastMA)

// Short Enrty/Exit
shortCondition = crossover(slowMA,fastMA)
closeShort = crossover(fastMA,slowMA)


// Bot web-link alert - {{strategy.order.comment}}
botLONG = "ENTRY LONG ALERT"
botCLOSELONG = "CLOSE LONG ALERT"
botSHORT = "ENTRY SHORT ALERT"
botCLOSESHORT = "CLOSE SHORT ALERT"

//////////////////////////////////////////////////////////////////
//////////////////////// BACKTEST ENGINE \\\\\\\\\\\\\\\\\\\\\\\\\
/////////////////// [NO USER INPUT REQUIRED] /////////////////////
//////////////////////////////////////////////////////////////////

// Time period
testStartYear = input(2020, "Backtest Start Year")
testStartMonth = input(5, "Backtest Start Month")
testStartDay = input(11, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

periodLength = input(3650, "Backtest Period (days)", minval=0,tooltip="Days until strategy ends") * 86400000 // convert days into UNIX time
testPeriodStop = testPeriodStart + periodLength

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false

// Convert Take profit and Stop loss to percentage
longTP = input(title="Long Take Profit (%)", type=input.float, minval=0.0, step=0.1, defval=0) * 0.01 // Set levels with input options
longSL = input(title="Long Stop Loss (%)", type=input.float, minval=0.0, step=0.1, defval=0) * 0.01 // Set levels with input options
shortTP = input(title="Short Take Profit (%)", type=input.float, minval=0.0, step=0.1, defval=0) * 0.01 // Set levels with input options
shortSL = input(title="Short Stop Loss (%)", type=input.float, minval=0.0, step=0.1, defval=0) * 0.01 // Set levels with input options

// 0% TP/SL = OFF (a value of 0 turns off TP/SL feature)
longProfitPerc = longTP == 0 ? 1000 : longTP
longStopPerc = longSL == 0 ? 1 : longSL
shortProfitPerc = shortTP == 0 ? 1 : shortTP
shortStopPerc = shortSL == 0 ? 1000 : shortSL

// Determine TP/SL price based on percentage given
longProfitPrice  = strategy.position_avg_price * (1 + longProfitPerc)
longStopPrice  = strategy.position_avg_price * (1 - longStopPerc)
shortProfitPrice  = strategy.position_avg_price * (1 - shortProfitPerc)
shortStopPrice  = strategy.position_avg_price * (1 + shortStopPerc)

// Anti-overlap
isEntry_Long = false
isEntry_Long := nz(isEntry_Long[1], false)
isExit_Long = false
isExit_Long := nz(isExit_Long[1], false)
isEntry_Short = false
isEntry_Short := nz(isEntry_Short[1], false)
isExit_Short = false
isExit_Short := nz(isExit_Short[1], false)

entryLong = not isEntry_Long and longCondition
exitLong = not isExit_Long and closeLong
entryShort = not isEntry_Short and  shortCondition
exitShort = not isExit_Short and closeShort

if (entryLong)
    isEntry_Long := true
    isExit_Long := false
if (exitLong)
    isEntry_Long := false
    isExit_Long := true
if (entryShort)
    isEntry_Short := true
    isExit_Short := false
if (exitShort)
    isEntry_Short := false
    isExit_Short := true

// Order Execution
if testPeriod() 
    if entryLong
        strategy.entry(id="Long", long=true, when = entryLong, comment=botLONG) // {{strategy.order.comment}}
    if entryShort
        strategy.entry(id="Short", long=false, when = entryShort, comment=botSHORT) // {{strategy.order.comment}}


// TP/SL Execution
if (strategy.position_size > 0)
    strategy.exit(id="Long SL/TP", from_entry="Long", limit=longProfitPrice, stop=longStopPrice)
    strategy.close(id="Long", when=exitLong, comment=botCLOSELONG) // {{strategy.order.comment}}

if (strategy.position_size < 0)
    strategy.exit(id="Short TP/SL", from_entry="Short", limit=shortProfitPrice, stop=shortStopPrice)
    strategy.close(id="Short", when=exitShort, comment=botCLOSESHORT) // {{strategy.order.comment}}
    
// Draw Entry, TP and SL Levels for Long Positions
plot(strategy.position_size > 0 ? longTP == 0 ? na : longProfitPrice : na, style=plot.style_linebr, color=color.green, title="Long TP")
plot(strategy.position_size > 0 ? strategy.position_avg_price : na, style=plot.style_linebr, color=color.blue, title="Long Entry")
plot(strategy.position_size > 0 ? longSL == 0 ? na : longStopPrice : na, style=plot.style_linebr, color=color.red, title="Long SL")
// Draw Entry, TP and SL Levels for Short Positions
plot(strategy.position_size < 0 ? shortTP == 0 ? na : shortProfitPrice : na, style=plot.style_linebr, color=color.green, title="Short TP")
plot(strategy.position_size < 0 ? strategy.position_avg_price : na, style=plot.style_linebr, color=color.blue, title="Short Entry")
plot(strategy.position_size < 0 ? shortSL == 0 ? na : shortStopPrice : na, style=plot.style_linebr, color=color.red, title="Short SL")
```

> Detail

https://www.fmz.com/strategy/428856

> Last Modified

2023-10-10 10:44:25
