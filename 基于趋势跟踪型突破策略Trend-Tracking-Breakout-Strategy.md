
> Name

基于趋势跟踪型突破策略Trend-Tracking-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e52d416774d2204990.png)
[trans]

## 概述

这是一个基于趋势跟踪的突破策略。它在出现突破时买入力度较强的股票,在出现突破时卖出力度较弱的股票,实现趋势跟踪。

## 策略原理

该策略主要基于两个指标判断进入和退出信号,一个是 highest()函数判断的一定周期内的最高价,一个是 lowest()函数判断的一定周期内的最低价。

当收盘价高于过去一定周期(参数highPeriod)的最高价时,认为这是上涨趋势的突破,因此发出做多信号。当收盘价低于过去一定周期(参数lowPeriod)的最低价时,认为这是下跌趋势的突破,因此发出做空信号。

这个策略同时设定了移动止损和固定止损。移动止损基于ATR指标,通过计算一定周期内的ATR值,并乘以一个倍数(参数trailingAtrMultiplier)作为移动止损位。固定止损也类似,基于ATR指标计算得到。

在做多做空后的首根K线,固定止损生效;之后转为以移动止损为主。这种组合可以锁定部分利润,同时跟踪趋势。

该策略还设定了仓位计算规则。基于可承受的最大损失百分比、账户权益等计算出仓位。并考虑了交易品种数,适当降低单一品种的仓位。

总体来说,这是一个典型的趋势跟踪型策略,它在判断到突破发生时进入场内,通过止损方式锁定利润并跟踪趋势,在趋势反转时退出场外。

## 优势分析

这是一个突破策略,它的主要优势在于:

1. 趋势判断准确。用最高价和最低价判断趋势是否反转,准确性很高,不易发出错误信号。

2. 仓位和止损科学合理。最大损失比例设定、账户权益关联等使得仓位合理,避免超量或无效交易。组合止损方式锁定利润且跟踪趋势运行。

3. 简单实用,容易理解使用。只需要最基本的指标,策略逻辑简单清晰,易于掌握。

4. 可扩展性好。指标参数、仓位规则等都提供了输入框,用户可以根据需要调整。

总的来说,这是一个实用性很强的突破策略。在判断上安全可靠,同时策略设计考虑到了风险控制和跟踪。非常适合中长线持有。

## 风险分析

该策略的主要风险在于:

1. 趋势反转风险。突破策略对趋势判断非常依赖,一旦判断错误,可能面临巨额亏损。

2. 参数不当风险。最高价最低价周期参数选择不当可能错过趋势,仓位参数设定不当可能亏损过大。

3. 止损过于激进风险。如果移动止损距离过小,可能会被市场噪音打出场外。

主要的解决方法是:

1. 增加趋势过滤。例如加入其他指标判断,避免错误突破。

2. 优化参数选择。对参数进行测试优选取值,确保其稳定性。 

3. 止损距离可适当放宽。让止损距离能包容一定回调。

## 优化方向 

该策略主要可从以下方向进行优化:

1. 增加更多指标判断趋势。除最高最低价外,可加入移动均线等判断,使趋势判断更为准确。

2. 优化参数设置。对最高最低价周期参数、止损倍数参数等进行测试,选择最优参数组合。

3. 根据市场调整仓位算法。可让仓位与市场波动性挂钩,如VIX上涨时降低仓位。

4. 增加量能指标过滤。只在量能放大的突破中进入,避免虚假突破。 

5. 考虑基差和相关性优选交易品种。选择基差波动小、相关性低的品种组合,可降低组合风险。

6. 优化和调整止损机制。可测试移动止损和固定止损的比例组合,降低止损过于激进的风险。

## 总结

该策略作为一个趋势跟踪型的突破策略,在判断准确性、仓位与风险控制、操作简便性等方面表现不错。它captured了趋势的早期,通过移动止损平衡了利润的锁定和趋势跟踪。

当然作为突破策略,它对趋势判断的依赖性非常高,容易受到噪音的干扰。此外参数设置不当也可能影响策略表现。这需要通过进一步优化来解决。

总的来说,这是一个非常实用的策略,它的基本结构就已经包含了一个量化策略所需要的最关键要素。如果能够不断优化和改进,完全可以成为稳定盈利的程序化策略。值得量化人学习和参考。

||

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

[/trans]

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
