
> Name

双SMA均线交叉交易策略Dual-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/175d55caef25feaf078.png)

[trans]

## 概述

本策略基于双SMA均线的交叉信号来判断入场和退出。具体而言,短期SMA为14周期,长期SMA为28周期。当短期SMA上穿长期SMA时看多入场;当短期SMA下穿长期SMA时看空入场。

## 策略原理

1. 输入参数

    - 均线设置:设置快线和慢线的周期长度
    - 止盈止损:设置止盈比例和止损比例
    - 资金管理:设置初始资金、手续费模式、手续费率等

2. 变量

    定义了一些中间变量,用于保存止盈价格、止损价格、仓位数量等。这可以避免重复计算。

3. 信号判断

    通过SMA的交叉来判断看多和看空信号。

4. 入场规则

    当判断到入场信号后,先平掉之前的反向头寸,然后按照策略逻辑下单。

5. 出场规则
    
    设置了止盈和止损出场规则。

6. 资金管理
    
    利用仓位数量来控制仓位风险。

## 优势

1. 操作简单,容易理解

2. 回撤可控

3. 容易优化参数

## 风险及解决

1. 双线交叉信号滞后

    可适当缩短均线周期,或结合其他指标判断

2. 震荡行情止损风险大

    可放宽止损幅度,或使用曲线止损

3. 参数不当可扩大损失

    应充分回测优化参数

## 优化思路

1. 结合其他指标判断

    例如MACD、KD等,避免均线信号滞后

2. 优化平均线参数

    测试更多周期参数的组合

3. 测试不同的止盈止损策略

    试验固定值止盈止损、移动止盈等策略

## 总结

本策略整体思路清晰易懂,回测结果良好,操作也较为简单,适合新手 traders 使用。但仍有优化空间,建议结合更多指标判断和资金管理策略,会使策略更稳健。

||
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

[/trans]

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
