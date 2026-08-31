
> Name

基于超级趋势的比特币量化交易策略SuperTrend-Quantitative-Trading-Strategy-for-Bitcoin

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12aa02175b5e18c3d62.png)

## Overview

This is an automated quantitative trading strategy for Bitcoin based on the SuperTrend indicator. It uses the SuperTrend indicator to determine market trends and combines the ATR stop loss principle to control risks, enabling long and short trading. The biggest advantage of this strategy is good risk-reward ratio and reliable stop loss strategy, suitable for mid-to-long term holding. This strategy can be applied on mainstream exchanges like Coinbase Pro using 4-hour timeframe.

## Strategy Principle  

This strategy uses the SuperTrend indicator to determine the direction of market trends. It goes long when the SuperTrend indicator changes from a downtrend to an uptrend, and goes short when the SuperTrend indicator changes from an uptrend to a downtrend. 

Specifically, this strategy first calculates the ATR period as 14 bars, and determines the stop loss distance for each trade by multiplying it by a ATR stop loss multiplier (such as 1.5x). It then calculates the SuperTrend indicator using default parameters (ATR period = 9, SuperTrend multiplier = 2.5). Trading signals are generated when the SuperTrend indicator changes direction.

After entering a trade, the stop loss is fixed above or below the ATR stop loss. The first take profit level is calculated based on a risk-reward ratio, default to 0.75, meaning the take profit distance is 0.75x of the stop loss distance. When price reaches the first take profit level, 50% of the position will be closed, and stop loss is moved to the entry price (break even) to lock in profits. The second take profit level continues to use a 0.75 risk-reward ratio. If price hits stop loss, the remaining position will be closed by stop loss.

By doing so, this strategy ensures controllable stop loss risk while locking in profits through partial take profits, suitable for mid-to-long term investment strategies.

## Advantage Analysis

The biggest advantage of this strategy is good risk-reward ratio, allowing mid-to-long term holding. Specific advantages include:

1. Using SuperTrend to determine market trends, filtering market noise and catching major trends.

2. Dynamic ATR tracking of stop loss, reliably controlling single trade loss. 

3. Partial take profit locks in profit, resulting in high risk-reward ratio.

4. Moving stop loss to entry price after hitting TP1 locks in profit and enhances strategy stability.

5. Extremely simple logic, easy to understand and implement, with large parameter tuning space.

6. Applicable on mainstream exchanges using intraday or high frequency data, high flexibility.

## Risk Analysis

This strategy also carries some risks, mainly in the following areas:

1. Gap risk failing to trigger stop loss, facing large loss. Can tweak ATR stop loss multiplier to reduce risk.

2. SuperTrend fails to determine right trend, resulting in wrong trade signals. Can optimize parameters.  

3. Take profit ratio too high, unable to ride the trend. Should adjust based on different markets.

4. Trade frequency may be too high or too low. Should find optimal balance by adjusting SuperTrend parameters.

## Optimization Directions

There is still large room for optimizing this strategy, mainly in below areas:

1. Test different ATR stop loss methods like fixed ATR, momentum stop, Bollinger stop loss etc.

2. Optimize SuperTrend parameters using walk forward or genetic algorithms for best parameters.  

3. Adding a second layer of stop loss like Donchian Channels to make stop more reliable.

4. Test different take profit ratios for optimal profit taking vs. risk balancing. Make it dynamic.

5. Explore machine learning techniques for dynamic stop loss, position adjustment etc.

## Conclusion

This is a quantitative strategy based on SuperTrend for trend, ATR dynamic stop and partial take profit. It has balanced risk-reward ratio, suitable for algo trading. There is ample room to optimize parameters, stop loss, profit taking etc. It's worth long term tuning and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|false|Date background|
|v_input_3|9|ATR Length SuperTrend|
|v_input_float_1|2.5|Factor SuperTrend|
|v_input_1|timestamp(10 Feb 2014 13:30 +0000)|(?Time filter)Initial date|
|v_input_2|timestamp(01 Jan 2030 19:30 +0000)|Final date|
|v_input_bool_2|false|(?Appearance)Show supertrend ?|
|v_input_bool_3|false|Show Atr stop loss ?|
|v_input_bool_4|true|Draw position on chart ?|
|v_input_4_close|0|(?Atr stop loss)Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|14|Period|
|v_input_float_2|1.5|Atr multiplier|
|v_input_float_3|2.5|(?Risk management for trades)% Account risk per trade|
|v_input_float_4|0.75|Risk/reward for breakeven long|
|v_input_float_5|0.75|Risk/reward for take profit long|
|v_input_float_6|0.75|Risk/reward for break even short|
|v_input_float_7|0.75|Risk/reward for take profit short|
|v_input_float_8|50|% of trade for first take profit|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-06 00:00:00
end: 2024-02-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// Developed by © StrategiesForEveryone
//@version=5

strategy("SuperTrend Strategy for BTCUSD 4H", overlay=true, process_orders_on_close = true, initial_capital = 100, default_qty_type = strategy.cash, precision = 2, slippage = 50, commission_value = 0.03, backtest_fill_limits_assumption = 50)

// ------ Date filter (obtained from ZenAndTheArtOfTrading) ---------

initial_date = input(title="Initial date", defval=timestamp("10 Feb 2014 13:30 +0000"), group="Time filter", tooltip="Enter the start date and time of the strategy")
final_date   = input(title="Final date", defval=timestamp("01 Jan 2030 19:30 +0000"), group="Time filter", tooltip="Enter the end date and time of the strategy")
dateFilter(int st, int et) => time >= st and time <= et
colorDate = input.bool(defval=false, title="Date background", tooltip = "Add color to the period of time of the strategy tester")
bgcolor(colorDate and dateFilter(initial_date, final_date) ? color.new(color.blue, transp=90) : na)

// ------------ Super Trend ----------

atrPeriod = input(9, "ATR Length SuperTrend")
factor = input.float(2.5, "Factor SuperTrend", step = 0.05)
[supertrend, direction] = ta.supertrend(factor, atrPeriod)
show_supertrend = input.bool(defval = false, title="Show supertrend ?", group = "Appearance")
bodyMiddle = plot(show_supertrend ? ((open + close) / 2) : na, display=display.none)
upTrend = plot(show_supertrend and direction < 0 ? supertrend : na, "Up Trend", color = color.green, style=plot.style_linebr)
downTrend = plot(show_supertrend and direction > 0 ? supertrend : na, "Down Trend", color = color.red, style=plot.style_linebr)
fill(bodyMiddle, upTrend, color.new(color.green, 90), fillgaps=false)
fill(bodyMiddle, downTrend, color.new(color.red, 90), fillgaps=false)

// ---------- Atr stop loss (obtained from garethyeo)

source_atr = input(close, title='Source', group = "Atr stop loss", inline = "A")
length_atr = input.int(14, minval=1, title='Period', group = "Atr stop loss" , inline = "A")
multiplier = input.float(1.5, minval=0.1, step=0.1, title='Atr multiplier', group = "Atr stop loss", inline = "A", tooltip = "Defines the stop loss distance based on the Atr stop loss indicator")
shortStopLoss = source_atr + ta.atr(length_atr) * multiplier
longStopLoss = source_atr - ta.atr(length_atr) * multiplier
show_atr_stoploss = input.bool(defval=false, title="Show Atr stop loss ?", group = "Appearance")
plot(show_atr_stoploss ? longStopLoss : na, color=color.white, style = plot.style_circles)
plot(show_atr_stoploss ? shortStopLoss : na, color=color.white, style = plot.style_circles)

// ------------- Money management --------------

strategy_contracts = strategy.equity / close
distance_sl_atr_long = -1 * (longStopLoss - close) / close
distance_sl_atr_short = (shortStopLoss - close) / close
risk = input.float(2.5, '% Account risk per trade', step=1, group = "Risk management for trades", tooltip = "Percentage of total account to risk per trade")
long_amount = strategy_contracts * (risk / 100) / distance_sl_atr_long
short_amount = strategy_contracts * (risk / 100) / distance_sl_atr_short

// ---------- Risk management ---------------

risk_reward_breakeven_long= input.float(title="Risk/reward for breakeven long", defval=0.75, step=0.05, group = "Risk management for trades")
risk_reward_take_profit_long= input.float(title="Risk/reward for take profit long", defval=0.75, step=0.05, group = "Risk management for trades")
risk_reward_breakeven_short= input.float(title="Risk/reward for break even short", defval=0.75, step=0.05, group = "Risk management for trades")
risk_reward_take_profit_short= input.float(title="Risk/reward for take profit short", defval=0.75, step=0.05, group = "Risk management for trades")
tp_percent=input.float(title="% of trade for first take profit", defval=50, step=5, group = "Risk management for trades", tooltip = "Closing percentage of the current position when the first take profit is reached.")

// ------------ Trade conditions ---------------

bought = strategy.position_size > 0
sold = strategy.position_size < 0
long_supertrend=ta.crossover(close, supertrend)
short_supertrend=ta.crossunder(close, supertrend)
var float sl_long = na
var float sl_short = na 
var float be_long = na
var float be_short = na
var float tp_long = na
var float tp_short = na
if not bought
    sl_long:=na
if not sold
    sl_short:=na

// ---------- Strategy -----------

// Long position 

if not bought and long_supertrend
    sl_long:=longStopLoss           
    long_stoploss_distance = close - longStopLoss
    be_long := close + long_stoploss_distance * risk_reward_breakeven_long
    tp_long:=close+(long_stoploss_distance*risk_reward_take_profit_long)
    strategy.entry('L', strategy.long, long_amount, alert_message = "Long")
    strategy.exit("Tp", "L", stop=sl_long, limit=tp_long, qty_percent=tp_percent)
    strategy.exit('Exit', 'L', stop=sl_long)
if high > be_long
    sl_long := strategy.position_avg_price
    strategy.exit("Tp", "L", stop=sl_long, limit=tp_long, qty_percent=tp_percent)
    strategy.exit('Exit', 'L', stop=sl_long)
if bought and short_supertrend
    strategy.close("L", comment="CL")

// Short position

if not sold and short_supertrend
    sl_short:=shortStopLoss
    short_stoploss_distance=shortStopLoss - close  
    be_short:=((short_stoploss_distance*risk_reward_breakeven_short)-close)*-1
    tp_short:=((short_stoploss_distance*risk_reward_take_profit_short)-close)*-1
    strategy.entry("S", strategy.short, short_amount, alert_message = "Short")
    strategy.exit("Tp", "S", stop=sl_short, limit=tp_short, qty_percent=tp_percent)
    strategy.exit("Exit", "S", stop=sl_short)
if low < be_short
    sl_short:=strategy.position_avg_price
    strategy.exit("Tp", "S", stop=sl_short, limit=tp_short, qty_percent=tp_percent)
    strategy.exit("Exit", "S", stop=sl_short)    
if sold and long_supertrend
    strategy.close("S", comment="CS") 

// ---------- Draw position on chart -------------

if high>tp_long
    tp_long:=na
if low<tp_short
    tp_short:=na
if high>be_long
    be_long:=na
if low<be_short
    be_short:=na

show_position_on_chart = input.bool(defval=true, title="Draw position on chart ?", group = "Appearance", tooltip = "Activate to graphically display profit, stop loss and break even")
position_price = plot(show_position_on_chart? strategy.position_avg_price : na, style=plot.style_linebr, color = color.new(#ffffff, 10), linewidth = 1)

sl_long_price = plot(show_position_on_chart and bought ? sl_long : na, style = plot.style_linebr, color = color.new(color.red, 10), linewidth = 1)
sl_short_price = plot(show_position_on_chart and sold ? sl_short : na, style = plot.style_linebr, color = color.new(color.red, 10), linewidth = 1)

tp_long_price = plot(strategy.position_size>0 and show_position_on_chart? tp_long : na, style = plot.style_linebr, color = color.new(#11eb47, 10), linewidth = 1)
tp_short_price = plot(strategy.position_size<0 and show_position_on_chart? tp_short : na, style = plot.style_linebr, color = color.new(#11eb47, 10), linewidth = 1)

breakeven_long = plot(strategy.position_size>0 and high<be_long and show_position_on_chart ? be_long : na , style = plot.style_linebr, color = color.new(#00ff40, 60), linewidth = 1)
breakeven_short = plot(strategy.position_size<0 and low>be_short and show_position_on_chart ? be_short : na , style = plot.style_linebr, color = color.new(#00ff40, 60), linewidth = 1)

position_profit_long = plot(bought and show_position_on_chart and strategy.openprofit>0 ? close : na, style = plot.style_linebr, color = color.new(#4cd350, 10), linewidth = 1)
position_profit_short = plot(sold and show_position_on_chart and strategy.openprofit>0 ? close : na, style = plot.style_linebr, color = color.new(#4cd350, 10), linewidth = 1)

fill(plot1 = position_price, plot2 = position_profit_long, color = color.new(color.green,90))
fill(plot1 = position_price, plot2 = position_profit_short, color = color.new(color.green,90))

fill(plot1 = position_price, plot2 = sl_long_price, color = color.new(color.red,90))
fill(plot1 = position_price, plot2 = sl_short_price, color = color.new(color.red,90))

fill(plot1 = position_price, plot2 = tp_long_price, color = color.new(color.green,90))
fill(plot1 = position_price, plot2 = tp_short_price, color = color.new(color.green,90))

```

> Detail

https://www.fmz.com/strategy/441162

> Last Modified

2024-02-06 12:09:09
