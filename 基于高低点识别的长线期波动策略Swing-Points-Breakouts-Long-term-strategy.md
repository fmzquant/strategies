
> Name

基于高低点识别的长线期波动策略Swing-Points-Breakouts-Long-term-strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/177c877e47160fc0587.png)
[trans]
### 概述

高低点突破策略是一个基于高低点识别的长线期波动策略。该策略在策略方向参数方向上,在突破最近一个特定窗口期的最高价时做多,突破最近一个特定窗口期的最低价时做空。

### 策略原理

该策略通过输入参数设置查看最近N根K线的最高价和最低价,即波动的高低点,根据方向参数判断策略方向。在做多时,当价格突破最近N根K线内的最高点时按照止赢方式入市做多;当价格跌破最近N根K线内的最低点时按照止损方式入市做空。 

此外,该策略还设定了止损位。在开仓做多后,止损线设置为最低价附近;做空后,止损线设置为最高价附近。这可以有效规避单边行情带来的巨大亏损。

### 优势分析

该策略最大优势是能抓住高低点附近的关键波动,顺势而为,实现盈利。另外设置止损线有效控制了风险。

具体优势有:

1. 策略思路清晰,通过突破高低点来判断入场和出场。

2. 利用swing高低点来寻找反转机会,这是技术分析的经典做法。

3. 有止损设置来控制风险,可以避免单边行情带来的巨亏。

4. 代码结构清晰,容易理解和修改。

5. 可输入不同参数来优化策略,如调整最高最低点周期数等。

### 风险分析

该策略的主要风险在于高低点判断不准带来的错误交易。具体风险包括:

1. 最高最低点可能出现错误突破带来错误入场。

2. 突破点附近可能有巨大的止损被触发。

3. 趋势品种容易形成花费巨大才能确定高低点。

4. 参数设置不当也会影响策略表现。

对应解决方法包括:

1. 优化参数,调整最高最低点判断的周期数。

2. 加大止损幅度。

3. 区分品种特性,避免在趋势品种使用。

4. 采用机器学习方法动态优化参数。

### 策略优化方向 

该策略可以从以下方向进行优化:

1. 最高最低点周期数优化:当前固定周期数,可以改为动态优化以避免固定模式带来的过优化。

2. 增加止损止盈优化:可以基于ATR、波动率等指标动态调整止损幅度。

3. 结合多个时间周期:可以在更高时间周期确定趋势,低时间周期决定入场。

4. 增加机器学习:使用神经网络等方法预测潜在高低点突破概率,提升效果。

5. 优化止损算法:改进算法以在保证止损的前提下尽量减少无效止损被触发的情况。

### 总结

高低点突破策略整体是一个非常实用的长线量化策略。它通过捕捉高低点附近的反转机会获利,并设置止损来控制风险,从而在保证收益的同时也控制了回撤。该策略参数设置灵活,思路清晰,是值得推荐的一个策略思路。后续可通过引入动态优化、机器学习等方式以进一步完善该策略。

||

### Overview

The Swing Points Breakouts strategy is a long-term trend fluctuation strategy based on swing high and swing low identification. The strategy enters long positions when prices break through the highest price in the most recent period specified by input parameters, and enters short positions when prices break through the lowest price in the most recent period.

### Strategy Logic  

The strategy defines the most recent N bar's highest price and lowest price as the swing high and swing low through input parameters. It determines the entry and exit based on the direction parameter. When going long, it enters long positions with an OCO stop order when prices break through the swing high. When going short, it enters short positions with an OCO stop order when prices break through the swing low.

In addition, the strategy sets up stop losses. After opening long positions, the stop loss is set near the recent lowest price. After opening short positions, the stop loss is set near the most recent highest price. This effectively avoids huge losses in a trending market.

### Advantage Analysis

The biggest advantage of this strategy is that it captures key fluctuations around swing highs and lows and profits accordingly. Setting stop losses also effectively controls risks. 

Specifically the advantages are:

1. The strategy logic is clear, with entries and exits based on swing high/low breakouts.  

2. It utilizes swing highs/lows to identify reversal opportunities, a classic technical analysis approach.

3. There are stop losses set to control risks and avoid huge losses in trending markets.  

4. The code has clear structure and is easy to understand and modify.

5. Parameters can be adjusted to optimize the strategy, like tuning the swing high/low period.

### Risk Analysis

The main risk of this strategy comes from inaccurate swing high/low identification leading to wrong trades. The specific risks include:

1. False breakout of swing highs/lows resulting in wrong entries.

2. Huge stop loss hit near the breakout points.  

3. Trending symbols tend to need huge costs determining swing points. 

4. Improper parameter tuning also affects strategy performance.

The solutions include:

1. Optimizing parameters like swing high/low period.  

2. Increasing stop loss distance.

3. Avoiding using it on trending symbols.  

4. Adopting machine learning to dynamically optimize parameters.

### Optimization Directions

The strategy can be optimized in the following directions:

1. Dynamic optimization of swing high/low periods instead of fixed values to avoid overfitting.

2. Introducing dynamic stop loss/take profit based on ATR and volatility.  

3. Combining multiple time frames, using higher TFs to define trend and lower TFs for entry.

4. Incorporating machine learning models to predict potential swing points and improve performance.

5. Optimizing the stop loss algorithms to avoid unnecessary hits while keeping effective stop loss.

### Conclusion

The Swing Points Breakouts strategy is a practical long-term quantitative strategy overall. By capturing reversal opportunities around swing points and setting stop losses to control risks, it ensures profits while also controlling drawdowns. With flexible parameter tuning and clear logic, it is a recommended strategy paradigm worth utilizing. Further improvements can be made by introducing dynamic optimization and machine learning.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Strategy Direction|
|v_input_2|true|Use Swing Lo/Hi Stop Loss & Take Profit|
|v_input_3|10|Swing Low Lookback|
|v_input_4|10|Swing High Lookback|
|v_input_5|false|Reverse Trades|
|v_input_6|false|SL Expander|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tweakerID

// Long term strategy for managing a Crypto investment with Swing Trades of more than 1 day. The strategy buys with a 
// stop order at the Swing High price (green line) and sells with a stop order at the Swing Low price (red line). 
// The direction of the strategy can be adjusted in the Inputs panel.

//@version=4
strategy("Swing Points Breakouts", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=10000, commission_value=0.04)

direction = input(0, title = "Strategy Direction", type=input.integer, minval=-1, maxval=1)
strategy.risk.allow_entry_in(direction == 0 ? strategy.direction.all : (direction < 0 ? strategy.direction.short : strategy.direction.long))

//Inputss
i_SL=input(true, title="Use Swing Lo/Hi Stop Loss & Take Profit")
i_SwingLow=input(10, title="Swing Low Lookback")
i_SwingHigh=input(10, title="Swing High Lookback")
i_reverse=input(false, "Reverse Trades")
i_SLExpander=input(defval=0, step=1, title="SL Expander")

//Strategy Calculations
SwingLow=lowest(i_SwingLow)
SwingHigh=highest(i_SwingHigh)

//SL & TP Calculations
bought=strategy.position_size != strategy.position_size[1]
LSL=valuewhen(bought, SwingLow, 0)-((valuewhen(bought, atr(14), 0)/5)*i_SLExpander)
SSL=valuewhen(bought, SwingHigh, 0)+((valuewhen(bought, atr(14), 0)/5)*i_SLExpander)
islong=strategy.position_size > 0
isshort=strategy.position_size < 0
SL= islong ? LSL : isshort ? SSL : na

//Entries and Exits
strategy.entry("long", true, stop=i_reverse?na:SwingHigh, limit=i_reverse?SwingLow:na)
strategy.entry("short", false, stop=i_reverse?na:SwingLow, limit=i_reverse?SwingHigh:na)

if i_SL
    strategy.exit("longexit", "long", stop=LSL)
    strategy.exit("shortexit", "short", stop=SSL)

//Plots
plot(i_SL ? SL : na, color=color.red, style=plot.style_cross, title="SL")
plot(SwingLow, color=color.red)
plot(SwingHigh, color=color.green)

```

> Detail

https://www.fmz.com/strategy/441957

> Last Modified

2024-02-18 09:57:11
