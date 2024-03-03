
> Name

动量反转策略Momentum-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略基于动量反转的交易理念,通过RSI、Stoch和MACD三个指标判断当前趋势,结合ATR设置止损止盈位,实现高效捕捉趋势反转的自动交易策略。

## 策略原理

该策略使用了RSI、Stoch和MACD三个指标来判断当前趋势方向。具体逻辑是:

- RSI(7日):RSI值大于50为看涨,小于50为看跌
- Stoch(%K,14,3,3):%K值大于50为看涨,小于50为看跌  
- MACD(12,26,9):MACD大于Signal为看涨,小于Signal为看跌

当三个指标同时看涨时,该Bar设置为绿色;当三个指标同时看跌时,该Bar设置为红色;如果指标信号存在分歧,则设置为黑色。

交易规则如下:

- 当当前Bar为绿色,前一个Bar为黑色或红色时,做多入场,入场价为该Bar高点加0.01
- 当当前Bar为红色,前一个Bar为黑色或绿色时,做空入场,入场价为该Bar低点减0.01  
- 如果多头持仓期间出现红色或黑色Bar,平仓
- 如果空头持仓期间出现绿色或黑色Bar,平仓

该策略还使用ATR(7日均线)设置止损止盈位置。止损位为ATR的1.5倍,止盈位为ATR的3倍。

## 优势分析

本策略具有以下优势:

1. 使用多指标判断趋势,可以有效过滤假突破。RSI、Stoch和MACD三个指标同时看涨或看跌时,大概率为趋势反转点。

2. ATR止损止盈设置较优。ATR能有效跟踪市场波动程度,运用ATR的多倍设置止损止盈,可以根据市场情况动态调整止损止盈位,防止止损过于宽松或过于紧凑。

3. 交易逻辑简单清晰,容易理解实现,适合用作自动交易策略。

## 风险分析

本策略也存在以下风险:

1. 多指标组合判断可能存在个别指标发出错误信号的情况,从而影响入场时机。可以考虑调整指标参数或增加其他指标进行验证,降低错误信号率。

2. ATR大小对止损止盈影响较大。如果ATR计算不准,可能导致止损过大或止盈过小。可以考虑加入其他指标辅助确认ATR大小。

3. 缺乏趋势判断。本策略侧重反转交易,对趋势判断不足,容易在震荡行情中被套牢。可以加入趋势指标辅助判断。

4. 存在过拟合风险。应进行充分回测,验证参数和规则可靠性。

## 优化方向  

本策略可以从以下方面进行优化:

1. 调整或增加指标,提高对趋势反转时点的判断精确度。例如加入布林线判断超买超卖状态。

2. 优化ATR的计算方法,使其更好跟踪市场波动。例如使用ATR与价格的比率等。

3. 增加趋势判断指标,避免在震荡行情中被套。例如加入移动平均线判断趋势方向。 

4. 优化资金管理,例如根据回撤情况调整仓位。

5. 进行周期优化,验证不同时间周期参数的稳健性。

6. 在更多品种和时间段回测,检查策略的稳定可靠性。

## 总结

本策略基于动量反转思路设计,使用RSI、Stoch和MACD组合判断趋势反转时点,配合ATR动态设置止损止盈,形成了一套较完整的趋势反转交易策略。策略具有交易逻辑清晰、止损止盈设置合理等优点,但也存在指标信号错误、缺乏趋势判断等不足。未来可以从优化指标参数、加入趋势判断、调整资金管理等方面进行改进,使策略更稳定可靠。

|| 

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

[/trans]

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
