
> Name

基于变化率的量化策略Rate-of-Change-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/123ee9b038b01666b0d.png)

## Overview

This strategy uses the Rate of Change (ROC) indicator to determine market direction and generate trading signals. The core idea of the strategy is to follow long-term trends and outperform the market by taking on greater risk.

## Strategy Logic

### Entry Rules

- Go long if ROC>0; go short if ROC<0. Use the positive/negative of ROC to judge market direction.  
- To filter out volatility, only issue trading signals if ROC stays on the same side for two consecutive days.

### Stop Loss

A 6% stop loss is set. When stop loss is triggered, reverse position. This indicates we may be on the wrong side of the market so we exit immediately.  

### Anti-Bubble Mechanism  

If ROC goes above 200, market is considered a bubble. When ROC falls back below bubble territory, go short signal is triggered. Require the bubble persists for at least 1 week.

### Money Management

Use fixed position sizing + incremental method. Increase/decrease position by $200 for every $400 gain/loss. This allows us to pyramid profits but also increases drawdown.

## Advantage Analysis   

Advantages of this strategy:

1. Adheres to trend following philosophy so likely to produce long term positive returns.
2. Use stop loss to control risk and reduce short term volatility. 
3. Anti-bubble mechanism avoids chasing tops.  
4. Fixed position + incremental method creates exponential growth in uptrends.

## Risk Analysis

Some risks also exist:

1. ROC indicator prone to whipsaws which generates false signals. Consider combining with other indicators for filtering.
2. Trading costs not considered which lowers actual returns.
3. Poor anti-bubble parameter tuning also misses trends.  
4. Incremental sizing increases drawdown when losing.

## Optimization Directions

Some ways to optimize the strategy:

1. Add other indicators to filter signals, such as MA, Volatility etc.  
2. Optimize anti-bubble parameters for better bubble detection.
3. Adjust fixed position and incremental ratios for better risk/reward balance.  
4. Add automatic stop loss when large loss occurs.
5. Consider trading costs and set entry rules accordingly.

## Conclusion

In summary, this is a long term trend following strategy centered around the ROC indicator. It aims to generate alpha by taking on higher risk. Further optimizations can improve its viability. The key is finding suitable risk tolerance.  

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|365|(?Technical parameters)ROC Length|
|v_input_int_2|200|ROC Bubble signal|
|v_input_float_1|10|(?Risk Management)Stop Loss (in %)|
|v_input_int_3|400|(?Money Management)Fixed Ratio Value ($)|
|v_input_int_4|200|Increasing Order Amount ($)|
|v_input_1|timestamp(1 Jan 2017 00:00:00)|(?Backtesting Period)Start Date|
|v_input_2|timestamp(1 July 2024 00:00:00)|End Date|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-05 00:00:00
end: 2023-12-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © gsanson66


//This strategy use the Rate of Change (ROC) of the closing price to send enter signal. 
//@version=5
strategy("RATE OF CHANGE BACKTESTING", shorttitle="ROC BACKTESTING", overlay=false, precision=3, initial_capital=1000, default_qty_type=strategy.cash, default_qty_value=950, commission_type=strategy.commission.percent, commission_value=0.18)


//--------------------------------FUNCTIONS-----------------------------------//

//@function Displays text passed to `txt` when called.
debugLabel(txt, color, loc) =>
    label.new(bar_index, loc, text = txt, color=color, style = label.style_label_lower_right, textcolor = color.black, size = size.small)

//@function which looks if the close date of the current bar falls inside the date range
inBacktestPeriod(start, end) => (time >= start) and (time <= end)


//----------------------------------USER INPUTS----------------------------------//

//Technical parameters
rocLength = input.int(defval=365, minval=0, title='ROC Length', group="Technical parameters")
bubbleValue = input.int(defval=200, minval=0, title="ROC Bubble signal", group="Technical parameters")
//Risk management
stopLossInput = input.float(defval=10, minval=0, title="Stop Loss (in %)", group="Risk Management")
//Money management
fixedRatio = input.int(defval=400, minval=1, title="Fixed Ratio Value ($)", group="Money Management")
increasingOrderAmount = input.int(defval=200, minval=1, title="Increasing Order Amount ($)", group="Money Management")
//Backtesting period
startDate = input(title="Start Date", defval=timestamp("1 Jan 2017 00:00:00"), group="Backtesting Period")
endDate = input(title="End Date", defval=timestamp("1 July 2024 00:00:00"), group="Backtesting Period")


//-------------------------------------VARIABLES INITIALISATION-----------------------------//

roc = (close/close[rocLength] - 1)*100
midlineConst = 0
var bool inBubble = na
bool shortBubbleCondition = na
equity = strategy.equity - strategy.openprofit
strategy.initial_capital = 50000
var float capital_ref = strategy.initial_capital
var float cashOrder = strategy.initial_capital * 0.95
bool inRange = na


//------------------------------CHECKING SOME CONDITIONS ON EACH SCRIPT EXECUTION-------------------------------//

//Checking if the date belong to the range
inRange := true

//Checking if we are in a bubble
if roc > bubbleValue and not inBubble
    inBubble := true

//Checking if the bubble is over
if roc < 0 and inBubble
    inBubble := false

//Checking the condition to short the bubble : The ROC must be above the bubblevalue for at least 1 week
if roc[1]>bubbleValue and roc[2]>bubbleValue and roc[3]>bubbleValue and roc[4]>bubbleValue and roc[5]>bubbleValue and roc[6]>bubbleValue and roc[7]>bubbleValue
    shortBubbleCondition := true

//Checking performances of the strategy
if equity > capital_ref + fixedRatio
    spread = (equity - capital_ref)/fixedRatio
    nb_level = int(spread)
    increasingOrder = nb_level * increasingOrderAmount
    cashOrder := cashOrder + increasingOrder
    capital_ref := capital_ref + nb_level*fixedRatio
if equity < capital_ref - fixedRatio
    spread = (capital_ref - equity)/fixedRatio
    nb_level = int(spread)
    decreasingOrder = nb_level * increasingOrderAmount
    cashOrder := cashOrder - decreasingOrder
    capital_ref := capital_ref - nb_level*fixedRatio

//Checking if we close all trades in case where we exit the backtesting period
if strategy.position_size!=0 and not inRange
    debugLabel("END OF BACKTESTING PERIOD : we close the trade", color=color.rgb(116, 116, 116), loc=roc)
    strategy.close_all()


//-------------------------------LONG/SHORT CONDITION-------------------------------//

//Long condition
//We reduce noise by taking signal only if the last roc value is in the same side as the current one
if (strategy.position_size<=0 and ta.crossover(roc, midlineConst)[1] and roc>0 and inRange)
    //If we were in a short position, we pass to a long position
    qty = cashOrder/close
    strategy.entry("Long", strategy.long, qty)
    stopLoss = close * (1-stopLossInput/100)
    strategy.exit("Long Risk Managment", "Long", stop=stopLoss)

//Short condition
//We take a short position if we are in a bubble and roc is decreasing
if (strategy.position_size>=0 and ta.crossunder(roc, midlineConst)[1] and roc<0 and inRange) or 
     (strategy.position_size>=0 and inBubble and ta.crossunder(roc, bubbleValue) and shortBubbleCondition and inRange)
    //If we were in a long position, we pass to a short position
    qty = cashOrder/close
    strategy.entry("Short", strategy.short, qty)
    stopLoss = close * (1+stopLossInput/100)
    strategy.exit("Short Risk Managment", "Short", stop=stopLoss)


//--------------------------------RISK MANAGEMENT--------------------------------------//

//We manage our risk and change the sense of position after SL is hitten
if strategy.position_size == 0 and inRange
    //We find the direction of the last trade
    id = strategy.closedtrades.entry_id(strategy.closedtrades-1)
    if id == "Short"
        qty = cashOrder/close
        strategy.entry("Long", strategy.long, qty)
        stopLoss = close * (1-stopLossInput/100)
        strategy.exit("Long Risk Managment", "Long", stop=stopLoss)
    else if id =="Long"
        qty = cashOrder/close
        strategy.entry("Short", strategy.short, qty)
        stopLoss = close * (1+stopLossInput/100)
        strategy.exit("Short Risk Managment", "Short", stop=stopLoss)


//---------------------------------PLOTTING ELEMENTS---------------------------------------//

//Plotting of ROC
rocPlot = plot(roc, "ROC", color=#7E57C2)
midline = hline(0, "ROC Middle Band", color=color.new(#787B86, 25))
midLinePlot = plot(0, color = na, editable = false, display = display.none)
fill(rocPlot, midLinePlot, 40, 0, top_color = strategy.position_size>0 ? color.new(color.green, 0) : strategy.position_size<0 ? color.new(color.red, 0) : na, bottom_color = strategy.position_size>0 ? color.new(color.green, 100) : strategy.position_size<0 ? color.new(color.red, 100) : na,  title = "Positive area")
fill(rocPlot, midLinePlot, 0,  -40,  top_color = strategy.position_size<0 ? color.new(color.red, 100) : strategy.position_size>0 ? color.new(color.green, 100) : na, bottom_color = strategy.position_size<0 ? color.new(color.red, 0) : strategy.position_size>0 ? color.new(color.green, 0) : na, title = "Negative area")

```

> Detail

https://www.fmz.com/strategy/435134

> Last Modified

2023-12-12 15:56:56
