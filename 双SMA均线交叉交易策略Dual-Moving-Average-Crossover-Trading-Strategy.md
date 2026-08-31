
> Name

双SMA均线交叉交易策略Dual-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/175d55caef25feaf078.png)

## Overview

This strategy determines entries and exits based on the crossover signals of dual simple moving averages (SMA). Specifically, the short term SMA has a period of 14, while the long term SMA has a period of 28. A long signal is triggered when the short term SMA crosses over the long term SMA. Conversely, a short signal is triggered when the short term SMA crosses below the long term SMA. 

## Strategy Logic

1. Inputs

    - Indicator Settings: Define periods for the fast and slow SMA
    - Take Profit and Stop Loss: Configure percentages for take profit and stop loss
    - Money Management: Set initial capital, commission fees etc.

2. Variables

    Intermediate variables are defined to store values for take profit price, stop loss price, position sizing etc. This avoids repetitive calculations.
    
3. Signal Generation

    SMA crossover is used to determine long and short signals.
    
4. Entry Rules

    When an entry signal is triggered, any existing position in the opposite direction is flattened first before a new order is placed based on strategy logic.
    
5. Exit Rules

    Take profit and stop loss rules are configured for position exits.
    
6. Money Management

    Position sizing is used to manage risk per trade.

## Advantages

1. Simple logic, easy to understand
2. Controllable drawdowns  
3. Optimizable parameters

## Risks and Mitigation

1. Lagging SMA crossover signals

    Consider shorter SMA periods, or supplement with additional indicators
    
2. Increased stop loss risk in ranging markets

    Widen stop loss percentage, or use trailing stops
    
3. Suboptimal parameters may amplify losses

    Rigorously backtest and optimize parameters

## Enhancement Opportunities 

1. Complement with additional indicators

    E.g. MACD, KD etc to reduce signal lag
    
2. Optimize SMA periods

    Test more combinations of short and long SMA periods
    
3. Experiment with other take profit/stop loss strategies

    E.g. fixed $ value, trailing stops etc

## Conclusion

The strategy has clear and simple logic, promising backtest results, and is easy to operate - suitable for novice traders. There is still room for improvement via additional indicators, money management techniques etc to make the strategy more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|(?Indicator Settings)Short SMA Length|
|v_input_int_2|28|Long SMA Length|
|v_input_bool_1|true|(?Compounding)Compounding|
|v_input_bool_2|true|(?Take Profit and Stop Loss)Use Take Profit|
|v_input_float_1|true|Take Profit %|
|v_input_bool_3|true|Use Stop Loss|
|v_input_float_2|true|Take Profit %|
|v_input_1|timestamp(1 Jan 2023 00:00:00)|(?TRADING WINDOW)Start Date|
|v_input_2|timestamp(1 Jan 2030 00:00:00)|End Date|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-21 00:00:00
end: 2023-11-20 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © BigJasTrades https://linktr.ee/bigjastrades 

// READ THIS BEFORE USE:
// This code is provided as an example strategy for educational purposes only.  It comes with NO warranty or claims of performance.
// It should be used as a basis for your own learning and development and to create your own strategies.
// It is NOT provided to enable you to profitably trade. 
// If you use this code or any part of it you agree that you have thoroughly tested it and determined that it is suitable for your own purposes prior to use.
// If you use this code or any part of it you agree that you accept all risk and you are responsibile for the results.

//@version=5
strategy(title = "Strategy Template", shorttitle = "ST v1.0", overlay = true, pyramiding = 1, initial_capital = 1000, commission_type = strategy.commission.percent, commission_value = 0.1, max_labels_count = 500)

//INPUTS
//indicator values
shortSMAlength              = input.int(defval = 14, title = "Short SMA Length", tooltip = "Set the length of the short simple moving average here.", minval = 1, step = 1, group = "Indicator Settings")
longSMAlength               = input.int(defval = 28, title = "Long SMA Length", tooltip = "Set the length of the long simple moving average here.", minval = 1, step = 1, group = "Indicator Settings")
//compounding
compoundingSelected         = input.bool(defval = true, title = "Compounding", tooltip = "Select this option if you want to compound your net profits.", group = "Compounding")
//take profit and stop loss
takeProfitSelected          = input.bool(defval = true, title = "Use Take Profit", tooltip = "Select this to enable take profits.", group = "Take Profit and Stop Loss")
takeProfitPercent           = input.float(defval = 1.0, title = "Take Profit %", tooltip = "Set the value of take profits here.", minval = 0.1, step = 0.1, group = "Take Profit and Stop Loss")
stopLossSelected            = input.bool(defval = true, title = "Use Stop Loss", tooltip = "Select this to enable stop losses.", group = "Take Profit and Stop Loss")
stopLossPercent             = input.float(defval = 1.0, title = "Take Profit %", tooltip = "Set the value of stop losses here.", minval = 0.1, step = 0.1, group = "Take Profit and Stop Loss")
//trading window
startDate                   = input(defval = timestamp("1 Jan 2023 00:00:00"), title = "Start Date", tooltip = "Use this to set the date and time when Viva will start placing trades.  Set this to a time just after the last candle when activating auto trading.", group = "TRADING WINDOW")
endDate                     = input(defval = timestamp("1 Jan 2030 00:00:00"), title = "End Date", tooltip = "Use this to set the date and time when Viva will stop placing trades.", group = "TRADING WINDOW")

//VARIABLES
var float tradingCapital    = na //trading capital is used to calculate position size based on the intitial capital and, if compounding is selected, also the net profit
var float positionSize      = na //position size is used to set the quantity of the asset you want to buy.  It is based on the initial capital and the net profit if compounding is selected.
var float takeProfitPrice   = na //this is used for take profit targets if selected
var float stopLossPrice     = na //this is used for stop loss if selected

inTradeWindow               = true
strategy.initial_capital = 50000
//COMPOUNDING
if compoundingSelected // set the tradingCapital available to the strategy based on wither Compounding has been selected or not.  This will be used to determine the position size.
    tradingCapital := strategy.initial_capital + strategy.netprofit
else
    tradingCapital := strategy.initial_capital

//ENTRY CONDITIONS
//replace these with your own conditions
longCondition = ta.crossover(source1 = ta.sma(source = close, length = shortSMAlength), source2 =  ta.sma(source = close, length =longSMAlength))
shortCondition = ta.crossunder(source1 = ta.sma(source = close, length = shortSMAlength), source2 = ta.sma(source = close, length = longSMAlength))

//EXIT CONDITIONS
//Exit conditions are based on stop loss, take profit and the opposite entry condition being present.  Stop Loss and Take Profit are contained in the strategy.exit code below and are based on the value assigned in the Inputs.


//ENTRY ORDERS
//Enter Long
if longCondition and inTradeWindow
    //close any prior short positions
    if strategy.position_size < 0 //if in a short position
        strategy.close_all(comment = "Buy to Close")
    //set position size
    positionSize := tradingCapital / close
    //enter long position
    strategy.entry(id = "Buy to Open", direction =  strategy.long, qty = positionSize)

//Enter Short
if shortCondition and inTradeWindow
    //close any prior long positions
    if strategy.position_size > 0 //if in a long position
        strategy.close_all(comment = "Sell to Close")
    //set position size
    positionSize := tradingCapital / close
    //enter short position
    strategy.entry(id = "Sell to Open", direction =  strategy.short, qty = positionSize)

//IN-ORDER MANAGEMENT
//placeholder - none used in this template


//EXIT ORDERS
//Stop Loss and Take Profit for Long Positions
if strategy.opentrades > 0 and strategy.position_size > 0 and (takeProfitSelected or stopLossSelected)   //if there is an open position and it is a long position and either a take profit or sto ploss is selected.
    if takeProfitSelected
        takeProfitPrice := strategy.position_avg_price * (1 + (takeProfitPercent / 100))
    else
        takeProfitPrice := na
    if stopLossSelected
        stopLossPrice := strategy.position_avg_price * (1 - (stopLossPercent / 100))
    else
        stopLossPrice := na
    strategy.exit(id = "Exit", from_entry = "Buy to Open", qty_percent = 100, profit = takeProfitPrice, loss = stopLossPrice, comment_profit = "Take Profit", comment_loss = "Stop Loss")

//Stop Loss and Take Profit for Short Positions
if strategy.opentrades > 0 and strategy.position_size < 0 and (takeProfitSelected or stopLossSelected)   //if there is an open position and it is a short position and either a take profit or sto ploss is selected.
    if takeProfitSelected
        takeProfitPrice := strategy.position_avg_price * (1 - (takeProfitPercent / 100))
    else
        takeProfitPrice := na
    if stopLossSelected
        stopLossPrice := strategy.position_avg_price * (1 + (stopLossPercent / 100))
    else
        stopLossPrice := na
    strategy.exit(id = "Exit", from_entry = "Buy to Open", qty_percent = 100, profit = takeProfitPrice, loss = stopLossPrice, comment_profit = "Take Profit", comment_loss = "Stop Loss")


//VISUALISATIONS
plot(series = ta.sma(source = close, length = shortSMAlength), title = "Short SMA", color = color.new(color = color.red, transp = 50), linewidth = 2)
plot(series = ta.sma(source = close, length = longSMAlength), title = "Long SMA", color = color.new(color = color.blue, transp = 50), linewidth = 2)

bgcolor(color = longCondition ? color.new(color = color.green, transp = 95) : na, title = "Long")
bgcolor(color = shortCondition ? color.new(color = color.red, transp = 95) : na, title = "Short")
```

> Detail

https://www.fmz.com/strategy/432768

> Last Modified

2023-11-21 12:26:53
