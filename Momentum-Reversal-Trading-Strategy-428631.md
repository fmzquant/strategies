
> Name

Momentum-Reversal-Trading-Strategy-428631

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy is based on the concept of momentum reversal trading. It uses RSI, Stoch and MACD to determine the current trend direction, and sets stop loss and take profit based on ATR, to implement an automated trading strategy that can efficiently capture trend reversals.

## Trading Logic

The strategy uses RSI, Stoch and MACD as three indicators to determine the current trend direction. The specific logic is:

- RSI(7): RSI above 50 indicates an uptrend, while below 50 a downtrend
- Stoch(%K, 14, 3, 3): %K above 50 is uptrend, below 50 is downtrend 
- MACD(12, 26, 9): MACD above Signal line is uptrend, below is downtrend

When all three indicators are bullish, the bar color is set to green. When all are bearish, the bar color is set to red. If there is divergence between the indicators, the bar color is set to black.

The trading rules are:

- When the current bar is green, and the previous bar is black or red, go long. The entry price is 0.01 above the high of the bar.
- When the current bar is red, and the previous bar is black or green, go short. The entry price is 0.01 below the low of the bar.
- If the bar turns to red or black during a long position, close the long trade.
- If the bar turns to green or black during a short position, close the short trade.

The strategy also uses ATR(7) to set the stop loss and take profit. The stop loss is set at 1.5 times ATR, and take profit at 3 times ATR.

## Advantage Analysis 

The advantages of this strategy include:

1. Using multiple indicators to determine trend can effectively filter false breakouts. High probability of trend reversal when RSI, Stoch and MACD all agree.

2. ATR stop loss and take profit settings are reasonable. ATR can effectively track market volatility. By using multiples of ATR, stops and targets can be dynamically adjusted based on market conditions.

3. Simple and clear logic, easy to understand and automate. Suitable as an automated trading strategy.

## Risk Analysis

The risks of this strategy include:

1. Errors in individual indicators can affect entry timing. Can consider adjusting parameters or adding more confirmation indicators to reduce errors.

2. Size of ATR significantly affects stops and targets. Incorrect ATR calculation may result in stops being too wide or targets too tight. Can add additional indicators to confirm ATR.

3. Lack of trend determination. Focused on reversal trading, insufficient trend analysis may lead to whipsaws in ranging markets. Can add trend indicators. 

4. Overfitting risk. Requires thorough backtesting to verify robustness of parameters and rules.

## Improvement Directions

Possible improvements for this strategy:

1. Adjusting or adding indicators to improve precision in determining reversal points. E.g. adding Bollinger Bands to check overbought/oversold levels.

2. Optimizing ATR calculation to better track volatility. E.g. using ATR/Price ratios.

3. Adding trend indicators to avoid whipsaws during ranging markets. E.g. moving averages.

4. Optimizing money management, such as adjusting position sizing based on drawdown.

5. Period optimization to test robustness across timeframes.

6. More backtesting on various products and time periods to verify reliability.

## Summary

This strategy is designed based on momentum reversal concepts, using RSI, Stoch and MACD combo to identify reversals, with dynamic ATR stops and targets. It forms a relatively complete trend reversal system. Advantages include clear logic and reasonable stops/targets. Deficiencies include signal errors and lack of trend filters. Improvements can be made by optimizing indicators, adding trends, and adjusting position sizing. This can make the strategy more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(1 Jan 2021 00:00 +0000)|Start date|
|v_input_2|timestamp(1 Jan 2050 00:00 +0000)|End date|
|v_input_bool_1|true|Allow long positions|
|v_input_bool_2|true|Allow short positions|
|v_input_bool_4|false|Keep risk at or above the set point|
|v_input_float_1|1.5|(?Select the multipliers for the stop loss and profit targets)Stop loss multiple|
|v_input_float_2|3|Profit target multiple|
|v_input_bool_3|false|(?Money management)Use money management|
|v_input_float_3|2|Percent risk per trade|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-10-06 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © jwitt98
//The PowerX strategy - based on the rules outlined in the book "The PowerX Strategy: How to Trade Stocks and Options in Only 15 Minutes a Day" by Markus Heitkoetter

//@version=5
strategy("PowerX", overlay=true)
strategy.initial_capital = 50000
longEntry = "Enter long"
shortEntry = "Enter short"
longExit = "Exit long"
shortExit = "Exit short"

//*********************************Begin inputs*********************************

//get time range inputs and set time range bool
timeRangeGroup = "Select the trading range"
startDate = input(timestamp("1 Jan 2021 00:00 +0000"), "Start date", "Select the start date for the trading range", "", timeRangeGroup)
endDate = input(timestamp("1 Jan 2050 00:00 +0000"), "End date", "Select the end date for the trading range", "", timeRangeGroup)
isInTimeRange = true

//get long/short inputs
positionsAllowedGroup = "Select the direction(s) of trades to allow"
isLongsAllowed = input.bool(true, "Allow long positions", "Check the box if you want to allow long positions", "", positionsAllowedGroup)
isShortsAllowed = input.bool(true, "Allow short positions", "Check the box if you want to allow short positions", "", positionsAllowedGroup)

//get the stop loss and profit target multiples.  Per the PowerX rules the ratio shoud be 1:2.  1.5 and 3 are defaults
adrMultuplesGroup="Select the multipliers for the stop loss and profit targets"
stopLossMultiple = input.float(1.5, "Stop loss multiple", 0.1, 10, 0.1, "The ADR is multiplied by the stop loss multiple to calculate the stop loss", group=adrMultuplesGroup)
profitTargetMultiple=input.float(3.0, "Profit target multiple", 0.1, 10, 0.1, "The ADR is multiplied by the profit target multiple to calculate the profit target", group=adrMultuplesGroup)

//get the option to use the money management stategy or not.  This is a fixed ratio type management system
moneyManagementGroup="Money management"
isUsingMoneyManagement=input.bool(false, "Use money management", "Check the box if you want to use a fixed ratio type money management system, such as the type described in PowerX", group=moneyManagementGroup)
initial_riskPercent=input.float(2.0, "Percent risk per trade", .1, 100, .1, "The percentage of capital you want to risk when starting out.  This will increase or decrease base on the money management rules.  Only applicable if money managent is used", group=moneyManagementGroup)/100
isRiskDowsideLimited=input.bool(false, "Keep risk at or above the set point", "Check the box if you don't want the risk to fall below the set \"risk per trade\" percentage, for example, when your equity is underwater. Only applicable if money management is used", "", moneyManagementGroup)
initial_riskPerTrade=initial_riskPercent * strategy.initial_capital 
riskFactor = 0.0
currentProfit = 0.0
currentRisk = 0.0

//*********************************End inputs*********************************

//*********************************Begin money management*********************************

if(isUsingMoneyManagement)
    currentProfit := strategy.equity - strategy.initial_capital
    if(currentProfit < 0)
        currentProfit:=math.abs(currentProfit)
        riskFactor := 0.5*(math.pow(1+8*currentProfit/(2*initial_riskPerTrade), 0.5)+1)
        currentRisk := 1/riskFactor * initial_riskPercent * strategy.initial_capital
        if(isRiskDowsideLimited)
            currentRisk := initial_riskPerTrade
    else
        riskFactor := 0.5*(math.pow(1+8*currentProfit/(2*initial_riskPerTrade), 0.5)+1)
        currentRisk := riskFactor * initial_riskPercent * strategy.initial_capital
        
plot(strategy.equity, "Strategy equity")
plot(currentRisk, "Current risk")
plot(riskFactor, "Risk Factor")

//*********************************End money management*********************************


//*********************************Begin indicators*********************************
//4 indicators are used in this strategy, RSI(7), Stochastics(14, 3, 3), MACD(12, 26, 9), and ADR(7)

rsiVal = ta.rsi(close, 7)//this checks out
plot(rsiVal, "RSI(7)", color.lime)

stochKVal = ta.sma(ta.sma(ta.stoch(close, high, low, 14),3),3)//this formula checks out
plot(stochKVal, "Stoch %K", color.lime)

[macdLine, signalLine, histLine] = ta.macd(close, 12, 26, 9)
plot(histLine, "MACD Hist", color.lime)

adr = ta.sma(high, 7) - ta.sma(low, 7)
plot(adr, "Average daily range", color.orange)


//*********************************End indicators*********************************

//*********************************Define the bar colors*********************************

greenBar = rsiVal > 50 and stochKVal > 50 and histLine > 0
redBar = rsiVal < 50 and stochKVal < 50 and histLine < 0
blackBar = not greenBar and not redBar

color currentBarColor = switch
    greenBar => color.green
    redBar => color.red
    blackBar => color.gray //because black is too hard to see in dark mmode
    => color.yellow
    
barcolor(currentBarColor)

//*********************************End defining the bar colors*********************************

//*********************************Define the entry, stop loss and profit target*********************************

longStopLimit = high + .01
longProfitTarget = high + (profitTargetMultiple * adr)
longStopLoss = high - (stopLossMultiple * adr)

shortStopLimit = low - .01
shortProfitTarget = low - (profitTargetMultiple * adr)
shortStopLoss = low + (stopLossMultiple * adr)

qtyToTrade= math.floor(currentRisk / (stopLossMultiple * adr))//only if using money management
if(qtyToTrade * high > strategy.equity)
    qtyToTrade := math.floor(strategy.equity / high)

//*********************************End defining stop loss and profit targets*********************************

//*********************************Execute trades, set rules, stop loss and profit targets*********************************

if (greenBar and not greenBar[1] and isInTimeRange and isLongsAllowed)
    if(isUsingMoneyManagement)
        strategy.order(longEntry, strategy.long, qtyToTrade, limit=longStopLimit, stop=longStopLimit)
        //strategy.order(longEntry, strategy.long, qtyToTrade, stop=longStopLimit)
    else
        strategy.order(longEntry, strategy.long, limit=longStopLimit,stop=longStopLimit)
        //strategy.order(longEntry, strategy.long, stop=longStopLimit)
    strategy.exit("Long limit/stop", from_entry=longEntry, limit=longProfitTarget, stop=longStopLoss)
    

if(blackBar or redBar)
    strategy.cancel(longEntry)
    strategy.close(longEntry, longExit)
    

if (redBar and not redBar[1] and isInTimeRange and isShortsAllowed)
    if(isUsingMoneyManagement)
        strategy.order(shortEntry, strategy.short, qtyToTrade, limit=shortStopLimit, stop=shortStopLimit)
        //strategy.order(shortEntry, strategy.short, qtyToTrade, stop=shortStopLimit)
    else
        strategy.order(shortEntry, strategy.short, limit=shortStopLimit, stop=shortStopLimit)
        //strategy.order(shortEntry, strategy.short, stop=shortStopLimit)
    strategy.exit("Short limit/stop", from_entry=shortEntry, limit=shortProfitTarget, stop=shortStopLoss)

if(blackBar or greenBar)
    strategy.cancel(shortEntry)
    strategy.close(shortEntry, shortExit)
    

//*********************************End execute trades, set rules, stop loss and profit targets*********************************





















```

> Detail

https://www.fmz.com/strategy/428631

> Last Modified

2023-10-07 16:52:05
