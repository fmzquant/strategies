
> Name

移动平均线回抽策略Snap-Back-Moving-Average-Counter-trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11ecbdbe1c6fcbcdb2b.png)

[trans]

## 概述

该策略主要运用移动平均线的规律,寻找股票短期超跌后的反弹机会。当快速移动平均线处于慢速移动平均线之下时,说明股票处于下跌趋势。当价格跌破快速移动平均线一定幅度后,再跌的空间有限,这时如果价格能重新回升突破快速移动平均线,说明股票下跌趋势结束,将出现反弹。该策略就是利用这一规律,寻找这种超跌反弹的机会进场做多。

## 策略原理

1. 设置快速移动平均线EMA(如8日线)和慢速移动平均线SMA(如20日线)。

2. 当SMA在EMA之上时,说明处于上升趋势;当SMA在EMA之下时,说明处于下跌趋势。

3. 当价格下破EMA一定幅度(如2-10%)后,股票进入超跌区域,这时反弹的概率较大。 

4. 当价格重新突破向上跨过EMA时,就是买入信号。

5. 止损线设在EMA附近,止盈线设在中间慢速移动平均线SMA(如50日线)附近,或以一定比例止盈。

6. 当价格重新跌破EMA时,清仓止损。

## 策略优势

- 利用移动平均线的规律,相对可靠。

- 采用快速移动平均线以及超跌幅度条件,可以提高确定超跌反弹的概率。

- 可配置止损和止盈条件,控制风险。

- 可灵活配置持仓比例,适合不同风险偏好。

## 策略风险

- 虽然加入了超跌幅度条件,但反弹失败的概率还是存在。

- 移动平均线本身滞后性较强,容易漏入局部反弹。

- 停损点靠近快速移动平均线,波动大时容易被击出。

- 部分参数需要人工配置,不同参数对结果影响较大。

- 效果与选股相关性较大。

## 策略优化方向

- 增加趋势判断指标,避免逆势操作。

- 加入成交量等指标过滤,提高成功概率。 

- 停损点可以考虑动态追踪,减少止损被击出概率。

- 可以研究最佳参数组合,降低参数依赖性。

- 可以结合选股条件,提高选股效果。

## 总结

该策略整体思路清晰、易于理解,属于移动平均反转交易策略的典型代表。优点是相对稳定,可以控制风险,适合新手掌握。但也存在一定概率上无法正确判断反转点的问题。可以通过结合其他指标、动态止损、参数优化等手段进行改进,提高策略稳定性。整体来说是一种可靠的短线反转策略思路,值得学习借鉴。

||


## Overview

This strategy mainly utilizes the principles of moving averages to find countertrend opportunities when a stock is oversold in the short term. When the fast moving average is below the slow moving average, it indicates the stock is in a downtrend. When the price breaks the fast moving average by a certain margin, the downside is limited and a bounce is likely. This strategy aims to capture such oversold bounces by going long when the price crosses back above the fast moving average.

## Strategy Logic

1. Set up a fast moving average like 8EMA and a slow moving average like 20SMA. 

2. When SMA is above EMA, it indicates an uptrend. When SMA is below EMA, it indicates a downtrend.

3. When the price breaks the EMA by a certain margin (e.g. 2-10%), the stock is oversold and a bounce is more likely.

4. When the price crosses back above the EMA, it triggers a buy signal. 

5. Set the stop loss near EMA, take profit near middle SMA (e.g. 50SMA) or use a percentage take profit. 

6. Liquidate when the price crosses back below EMA.

## Advantages

- Utilizes the reliable principles of moving averages. 

- The fast EMA and oversold margin improves bounce probability.

- Customizable stop loss and take profit controls risk.

- Flexible position sizing suits different risk appetite.

## Risks

- Failed bounces can still occur despite oversold margin.

- Moving averages have lag and may miss local bounces. 

- Stop loss near EMA may get stopped out easily on volatility.

- Some manual parameter tuning required which greatly affects results.

- Results are correlated with stock picking.

## Enhancement Opportunities 

- Add trend filter to avoid countertrend trades.

- Add volume filter to improve probability.

- Consider dynamic trailing stop loss instead of static.

- Research optimal parameter sets to reduce dependency.

- Incorporate stock picking for better selection.

## Conclusion

The strategy has a clear logic and is easy to understand as a typical moving average mean reversion system. The advantages are stability and risk control, making it suitable for beginners. But it still carries the risk of misjudging reversal points. Enhancements through additional filters, dynamic stops, parameter optimization etc. can improve robustness. Overall it exemplifies a sound short-term mean reversion framework worth learning from.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Price Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|0|Aggressive = 0, Conservative = 1: 0|1|
|v_input_3|2|Gap% between 8EMA & 20SMA|
|v_input_4|0|Run Strategy Trending Up, Down, or Both: Up|Down|Both|
|v_input_5|8|SH EMA Length|
|v_input_6|34|MD EMA Length|
|v_input_7|20|SH SMA Length|
|v_input_8|50|LG SMA Length|
|v_input_9|200|SH SMA Length|
|v_input_10|4|From Month|
|v_input_11|true|From Day|
|v_input_12|2020|From Year|
|v_input_13|true|Thru Month|
|v_input_14|true|Thru Day|
|v_input_15|2112|Thru Year|
|v_input_16|true|Show Date Range|
|v_input_17|0|Stop Criteria: SL or SH_EMA: SL|SH_EMA|
|v_input_18|0|Profit Criteria: TGT% or MD_EMA: TGT%|MD_EMA|
|v_input_19|6|Trail Loss %|
|v_input_20|4|Stop Loss %|
|v_input_21|6|Take Profit %|
|v_input_22|96|% of SH_EMA for Stop|
|v_input_23|100|% of MD_EMA for Profit|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-22 00:00:00
end: 2022-12-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © MakeMoneyCoESTB2020


//*********************Notes for continued work***************

//************************************************************

//I. Intro
//This strategy is designed to allow you to catch the bounce or "SNAP Back" of a equity that has been in a downward trend.
//Once the moving averages are in the order of 200SMA > 50 SMA > 34EMA > 20SMA > 8EMA, the strategy is setup.
//Next you wait for a trigger of the closing price crossing over the 8EMA, while there is a desired gap size between the 8EMA and the 20SMA (2-10% of stock value preferred).
//Exit position based on target profit reached (conservative sell half at 34EMA and engage a trailing stop loss for remainder or set static limit) or price crosses 8EMA or stop loss%
//*)This code also allows you to determine your desired backtesting date compliments of alanaster
//This code is the product of many hours of hard work on the part of the greater tradingview community.  The credit goes to everyone in the community who has put code out there for the greater good.
//The idea for the coding came from video I watched on YouTube presented by TradeStation called Snap Back - thank you guys for the inspiration.


//UPDATE: I have coded the other side of the strategy to allow you to take advantage of the same set-up in an uptrend for Short plays.  You can turn the up or downsides on, off, or both.

//Happy Hunting!


//II. Table Of Contents
    // 1. Define Strategy Variables
    // 2. Perform Calculations
    // 3. Display Chart Information
    // 4. Determine Entry Conditions
    // 5. Determine Exit Conditions



// 1. Define Strategy Variables*************************************************************************************************************************************************************************

//Title
// strategy("SNAP BACK 2.0 Strategy", shorttitle="SNAP Back 2.0", default_qty_type=strategy.percent_of_equity, default_qty_value=5, initial_capital=20000,slippage=2, currency=currency.USD, overlay=true)

//Define calculations price source
price = input(title="Price Source", defval=close)

//Define Trade Agression Level
aggro=input(title="Aggressive = 0, Conservative = 1", defval=0, options=[0, 1])

//Define Gap percentage allowed between 8EMA and 20SMA
GAP=input(title="Gap% between 8EMA & 20SMA", defval=2, minval=0, maxval=25, step=1)/100

//Does user want to run the Strategy for Trending Up or Trending Down
RunTrend=input(title="Run Strategy Trending Up, Down, or Both", defval="Up", options=["Up", "Down", "Both"])

//Initialize  8/34EMA  20/50/200/200SMA 
SH_EMA_length= input(title="SH EMA Length", defval=8) //short EMA length
MD_EMA_length= input(title="MD EMA Length", defval=34) //medium EMA length

SH_SMA_length= input(title="SH SMA Length", defval=20) //short SMA length
MD_SMA_length= input(title="LG SMA Length", defval=50) //medium SMA length
LG_SMA_length= input(title="SH SMA Length", defval=200) //long SMA length

SH_EMA=ema(price, SH_EMA_length) //short EMA 
MD_EMA=ema(price, MD_EMA_length) //medium EMA
SH_SMA=sma(price, SH_SMA_length) //short SMA 
MD_SMA=sma(price, MD_SMA_length) //medium SMA
LG_SMA=sma(price, LG_SMA_length) //long SMA

// 2. Perform Calculations*************************************************************************************************************************************************************************

// ************************************ INPUT BACKTEST RANGE ******************************************=== coutesy of alanaster
fromMonth = input(defval = 4,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2020, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2112, title = "Thru Year",       type = input.integer, minval = 1970)

// === INPUT SHOW PLOT ===
showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

// === FUNCTION EXAMPLE ===
start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true       // create function "within window of time"

bgcolor(color = showDate and window() ? color.gray : na, transp = 90) 


// 3. Display Chart Information*************************************************************************************************************************************************************************

//plot EMAs
plot(SH_EMA, title = "SH EMA", color = color.blue)
plot(MD_EMA, title = "MD EMA", color = color.yellow)

//plot SMAs
plot(SH_SMA, title = "SH SMA", color = color.green)
plot(MD_SMA, title = "MD SMA", color = color.orange)
plot(LG_SMA, title = "LG SMA", color = color.red, linewidth = 4, transp = 70)


// 4. Determine Entry Conditions*************************************************************************************************************************************************************************

//Determine if SNAP Back (SB) setup is present: 
SB_RB_Up= false //SB_RB_Up = Snap Back RainBow for an Uptrend Swing
SB_RB_Up:= iff(LG_SMA>MD_SMA and MD_SMA>MD_EMA and MD_EMA>SH_SMA and SH_SMA>SH_EMA, true, false) //is the 200SMA > 50 SMA > 34EMA > 20SMA > 8EMA 
// plotshape(SB_RB, title= "SB_RB", color=color.black, style=shape.cross, text="Rainbow")   //for testing only
SB_RB_DWN= false //SB_RB_DWN = Snap Back RainBow for a Downtrend Swing
SB_RB_DWN:= iff(LG_SMA<MD_SMA and MD_SMA<MD_EMA and MD_EMA<SH_SMA and SH_SMA<SH_EMA, true, false) //is the 200SMA < 50 SMA < 34EMA < 20SMA < 8EMA 


SB_Gap=false
SB_Gap:= iff(abs(SH_SMA-SH_EMA)>(price*GAP), true, false) //is there a greater than "GAP"% of the price gap between the 8EMA and 20SMA

SB_SetUp_Up=false
SB_SetUp_Up:= iff(SB_RB_Up and SB_Gap, true, false)//Uptrend Setup both conditions must be true
//plotshape(SB_SetUp, title= "SB_SetUp", color=color.white, style=shape.diamond, text="Set Up")  //for testing
SB_SetUp_DWN=false
SB_SetUp_DWN:= iff(SB_RB_DWN and SB_Gap, true, false)//Downtrend Setup both conditions must be true

//Determine trigger (TGR) for entry
SB_TGR_Up=false
SB_TGR_Up:= iff(iff(aggro==0, crossover(price, SH_EMA), true) and iff(aggro==1, crossover(price[aggro],SH_EMA) and price>open[aggro], true), true, false) //if the price crosses over the 8EMA that is our entry signal, aggro determines how aggressively we enter the position (wait for a confirmaiton bar or not)
SB_TGR_DWN=false
SB_TGR_DWN:= iff(iff(aggro==0, crossunder(price, SH_EMA), true) and iff(aggro==1, crossunder(price[aggro],SH_EMA) and price<open[aggro], true), true, false) //if the price crosses under the 8EMA that is our entry signal, aggro determines how aggressively we enter the position (wait for a confirmaiton bar or not)

//Determine when to run the strategy based on user input for uptrend or downtrend
RunTrendUp=false //Varibile for running the Strategy in an UpTrend
RunTrendUp:= iff(RunTrend == "Up" or RunTrend == "Both", true, false)

RunTrendDWN=false //Varibile for running the Strategy in a DownTrend
RunTrendDWN:= iff(RunTrend == "Down" or RunTrend == "Both", true, false)

//Determine full buy conditions
MAbuy=false//long entry variable
MAbuy := iff(SB_SetUp_Up and SB_TGR_Up and RunTrendUp, true, false) //when both the setup, the trigger, and RunTrend are true return true
plotshape(MAbuy, title= "HC-LB", color=color.lime, style=shape.circle, text="HC-LB")
strategy.entry("HC-Long", strategy.long, comment="HC-Long", when = MAbuy and window())

MAsell=false//short entry variable
MAsell := iff(SB_SetUp_DWN and SB_TGR_DWN and RunTrendDWN, true, false) //when both the setup, the trigger, and RunTrend are true return true
plotshape(MAsell, title= "HC-SB", color=color.purple, style=shape.circle, text="HC-SB")
strategy.entry("HC-Short", strategy.short, comment="HC-Short", when = MAsell and window())



// 5. Submit Profit and Loss Exit Calculations Orders*************************************************************************************************************************************************************************

//Stop Criteria
StpCri=input(title="Stop Criteria: SL or SH_EMA", defval="SL", options=["SL", "SH_EMA"])
//Profit Criteria
ProCri=input(title="Profit Criteria: TGT% or MD_EMA", defval="TGT%", options=["TGT%", "MD_EMA"])

// User Options to Change Inputs (%)
TrailPerc = input(title="Trail Loss %", type=input.float, minval=0, step=1, defval=6) /100
stopPer = input(4, title='Stop Loss %', type=input.float) / 100
takePer = input(6, title='Take Profit %', type=input.float) / 100

//Percent of SH_EMA to use for StopLoss
SH_EMA_percent = input(96, title="% of SH_EMA for Stop")/100
//Percent of MD_EMA to use for Take Profit
MD_EMA_percent = input(100, title="% of MD_EMA for Profit")/100

//calculate Trail stop price for MD_EMA TGT% condition
longStopPrice=0.0//long side entry stop variable
longStopPrice := if (strategy.position_size > 0)
    stopValue = close * (1 - TrailPerc)  
    max(stopValue, longStopPrice[1])
else
    0
    
shortStopPrice=0.0//short side entry stop variable
shortStopPrice := if (strategy.position_size < 0)
    shortStopValue = close * (1 + TrailPerc)  
    min(shortStopValue, shortStopPrice[1])
else
    999999 
    

// Determine where you've entered and in what direction
longStop = strategy.position_avg_price * (1 - stopPer)
shortStop = strategy.position_avg_price * (1 + stopPer)
shortTake = strategy.position_avg_price * (1 - takePer)
longTake = strategy.position_avg_price * (1 + takePer)



//exit position conditions and orders
if strategy.position_size > 0 //long side exit conditions
    if StpCri=="SL" and ProCri=="TGT%"
        strategy.exit(id="Close Long", when = window(), stop=longStop, limit=longTake)// sell when either the TGT or the SL is hit
    if StpCri=="SL" and ProCri=="MD_EMA"
        strategy.exit(id="Close Long (50%)", when = window(), stop=longStop, limit=MD_EMA_percent*MD_EMA, qty_percent=50)// sell 50% when MD_EMA hit or SL then transition to a trailing stop loss
        strategy.exit(id="Close Long Trailing Stop", when = window(), stop=longStopPrice, qty_percent=100)
    if StpCri=="SH_EMA" and ProCri=="MD_EMA"
        strategy.exit(id="Close Long (50%)", when = window(), stop=SH_EMA*SH_EMA_percent, limit=MD_EMA_percent*MD_EMA, qty_percent=50)// sell 50% when MD_EMA hit or SH_EMA hit then transition to a trailing stop loss
        strategy.exit(id="Close Long Trailing Stop", when = window(), stop=longStopPrice, qty_percent=100)
    if StpCri=="SH_EMA" and ProCri=="TGT%"
        strategy.exit(id="Close Long", when = window(), stop=SH_EMA*SH_EMA_percent, limit=longTake)// sell when either the TGT or the SH_EMA is hit
        
        
if strategy.position_size < 0 //short side exit conditions
    if StpCri=="SL" and ProCri=="TGT%"
        strategy.exit(id="Close Short", when = window(), stop=shortStop, limit=shortTake)// sell when either the TGT or the SL is hit
    if StpCri=="SL" and ProCri=="MD_EMA"
        strategy.exit(id="Close Short (50%)", when = window(), stop=shortStop, limit=(2-MD_EMA_percent)*MD_EMA, qty_percent=50)// sell 50% when MD_EMA hit or SL then transition to a trailing stop loss
        strategy.exit(id="Close Short Trailing Stop", when = window(), stop=shortStopPrice, qty_percent=100)
    if StpCri=="SH_EMA" and ProCri=="MD_EMA"
        strategy.exit(id="Close Short (50%)", when = window(), stop=SH_EMA*(2-SH_EMA_percent), limit=(2-MD_EMA_percent)*MD_EMA, qty_percent=50)// sell 50% when MD_EMA hit or SH_EMA hit then transition to a trailing stop loss
        strategy.exit(id="Close Short Trailing Stop", when = window(), stop=shortStopPrice, qty_percent=100)
    if StpCri=="SH_EMA" and ProCri=="TGT%"
        strategy.exit(id="Close Short", when = window(), stop=SH_EMA*(2-SH_EMA_percent), limit=shortTake)// sell when either the TGT or the SH_EMA is hit



// Plot stop trailing loss values for confirmation
plot(series=(strategy.position_size > 0 and (ProCri == "MD_EMA")) ? longStopPrice : na, color=color.fuchsia, style=plot.style_cross, linewidth=2, title="Long Trail Stop") //plot the trailing stop on the chart for an uptrend
plot(series=(strategy.position_size < 0 and (ProCri == "MD_EMA")) ? shortStopPrice : na, color=color.fuchsia, style=plot.style_cross, linewidth=2, title="Short Trail Stop") //plot the trailing stop on the chart for a downtrend

//plot fixed stop loss value
plot(series=(strategy.position_size > 0 and (StpCri == "SL")) ? longStop : na, color=color.fuchsia, style=plot.style_cross, linewidth=2, title="Long Trail Stop") //plot the stop on the chart for an uptrend
plot(series=(strategy.position_size < 0 and (StpCri == "SL")) ? shortStop : na, color=color.fuchsia, style=plot.style_cross, linewidth=2, title="Short Trail Stop") //plot the stop on the chart for a downtrend

//plot highlight of SH_EMA% used for stop exit condition
plot(series=(strategy.position_size > 0 and (StpCri == "SH_EMA")) ? SH_EMA*SH_EMA_percent : na, color=color.fuchsia, style=plot.style_cross, linewidth=2, title="Short Trail Stop") //plot the SH_EMA based stop on the chart for a uptrend
plot(series=(strategy.position_size < 0 and (StpCri == "SH_EMA")) ? SH_EMA*(2-SH_EMA_percent) : na, color=color.fuchsia, style=plot.style_cross, linewidth=2, title="Short Trail Stop") //plot the SH_EMA based stop on the chart for a downtrend

//plot the TGT profit points
plot(series=(strategy.position_size > 0 and (ProCri == "TGT%")) ? longTake : na, color=color.lime, style=plot.style_cross, linewidth=2, title="Short Trail Stop") //plot the TGT% for long position
plot(series=(strategy.position_size > 0 and (ProCri == "MD_EMA")) ? MD_EMA_percent*MD_EMA : na, color=color.lime, style=plot.style_cross, linewidth=2, title="Short Trail Stop") //plot the MD_EMA % TGT for long position
plot(series=(strategy.position_size < 0 and (ProCri == "TGT%")) ? shortTake : na, color=color.lime, style=plot.style_cross, linewidth=2, title="Short Trail Stop") //plot the TGT% for short position
plot(series=(strategy.position_size < 0 and (ProCri == "MD_EMA")) ? (2-MD_EMA_percent)*MD_EMA : na, color=color.lime, style=plot.style_cross, linewidth=2, title="Short Trail Stop") //plot the MD_EMA % TGT for short position
```

> Detail

https://www.fmz.com/strategy/429953

> Last Modified

2023-10-23 15:31:21
