
> Name

突破追踪策略Qullamaggie-Breakout-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1699377c94ac268c2ae.png)
[trans]
### 概述

该策略的主要思想是在较大时间框架上识别趋势方向,并在较小时间框架上找突破点进场,止损exit则追踪较大时间框架上的移动平均线。

### 策略原理

该策略主要基于三个指标进行判断。

第一,计算一个较长周期(如日线)的X日简单移动平均线,在价格站上该移动平均线时才允许买入。这可以用来判断总体趋势方向,避免交易震荡期。

第二,计算一个较短周期(如5日)内的最高价Swing High,当价格突破该最高价时则触发买入信号。此处结合一个回看周期参数lb来寻找合适的突破点。

第三,建立止损线。进入仓位后,止损线锁定在距离最近低点一定周期lbStop的最低价。同时设定一个移动平均线(如日线10日EMA)作为exit机制,当价格低于该移动平均线时退出仓位。

该策略同时设定了ATR值来避免买入过扩的点位。此外还有回测时间范围等其他辅助条件。

以上三个指标的交互判断,形成该策略的核心逻辑。

### 策略优势分析

这是一个突破追踪类策略,具有以下几点优势:

1. 使用两个时间框架,避免被困于震荡市场的假突破。较长时间框架判断总体趋势,较短时间框架寻找具体入场点。

2. 利用swing high形成的突破点,这类突破具有一定的惯性且容易形成追踪。同时回看周期lb参数可调整来寻找真正有效的突破。

3. 止损方式比较严谨,追踪最近低点并留出一定缓冲距离,避免被刮盘。

4. 使用移动平均线作为exit机制,可根据行情灵活止盈。

5. ATR指标避免过度放量带来的风险。

6. 可设置不同的参数组合来测试效果,优化空间较大。


### 风险分析

该策略也存在一定的风险:  

1. 当价格在移动平均线附近上下震荡时,容易被反复切换进出仓位。这时会面临较高的手续费风险。

2. 突破买入点靠近移动平均线时,会有比较大的回撤风险。这属于策略本身特点。

3. 当行情不具有明显趋势时,持仓时间可能过长,面临时间风险。

4. 需要合理设定ATR参数。ATR过小则过滤效果弱,过大则入场机会减少。

5. 需要测试不同lb参数对结果的影响。过大parameters会错过部分机会,过小parameters可能识别假突破。


风险解决方法:
1. 适当调整移动平均线参数,增加过滤作用。
2. 优化ATR参数,并辅以目测判断。
3. 调整回看周期lb,寻找最佳参数。
4. 在震荡行情中暂停交易。

### 策略优化方向  

该策略还可从以下维度进行优化:

1. 测试不同的移动平均线参数组合,寻找最优参数。

2. 尝试不同的ATR参数设置,平衡入场机会和风险控制。

3. 优化回看周期lb参数,识别更有效率的突破。  

4. 尝试建立动态止损,根据波动率和回撤控制风险。

5. 结合交易量指标等其它因素判断突破的有效性。

6. 开发>/',</,><等寻找极值点作为参考的方法。

7. 尝试 Machine Learning 对参数进行训练得到最优参数


### 总结  

该策略整体是一个典型的突破追踪策略。双时间框架判断,Swing High识别入场时机,止损线和移动平均线双保险退出机制,形成了完整的逻辑体系。该策略风险和收益特征较为明确,适合中长线追踪类型的投资者。虽然存在一定的风险,但可通过参数优化和规则优化来降低风险水平。该策略有很大的改进空间,若结合更多指标判断可能进一步增强策略效果。

|| 

### Overview

The main idea of this strategy is to identify the trend direction on a larger timeframe and find breakout points to enter on a smaller timeframe. The stop loss exit then tracks the moving average on the larger timeframe.

### Strategy Principle  

This strategy mainly relies on three indicators for judgment.

First, calculate a longer cycle (such as daily) X-day simple moving average. Allow buying only when the price is above this moving average. This can be used to determine the overall trend direction and avoid trading oscillating periods.

Second, calculate the highest price Swing High in a shorter cycle (such as 5 days). When the price breaks through this highest price, a buy signal is triggered. The lb lookback period parameter is used here to find suitable breakout points.

Third, establish a stop loss line. After entering the position, the stop loss line is locked at the lowest price a certain period lbStop away from the most recent low point. At the same time, set a moving average line (such as 10-day EMA on the daily) as an exit mechanism. Exit the position when the price is below this moving average line.

The strategy also sets the ATR value to avoid buying overextended points. There are also other auxiliary conditions such as backtest time range.

The interaction judgment of the above three indicators forms the core logic of this strategy.

### Advantage Analysis   

As a breakout tracking strategy, it has the following advantages:

1. Use two timeframes to avoid being trapped in fake breakouts in oscillating markets. The longer timeframe determines the overall trend, and the shorter timeframe finds specific entry points.

2. Use the breakout points formed by swing high. This type of breakout has certain inertia and is easy to form tracking. The lb lookback period parameter can also be adjusted to find truly effective breakouts.

3. The stop loss method is relatively strict, tracking the most recent low point with a certain buffer distance to avoid being scraped.  

4. Use the moving average as an exit mechanism to flexibly take profits according to market conditions.

5. The ATR indicator avoids the risk of over-leverage.

6. Different parameter combinations can be set for testing, with large optimization space.

### Risk Analysis

The strategy also has some risks:

1. When the price oscillates up and down around the moving average line, it is easy to switch back and forth between entering and exiting positions. There is a higher commission risk.

2. When the break-in point is close to the moving average line, there is a relatively large pullback risk. This is an inherent feature of the strategy.

3. When there is no obvious trend in the market, the holding time may be too long, facing time risk.

4. The ATR parameter needs to be set reasonably. If ATR is too small, the filtering effect is weak. If it is too large, the entry opportunities will decrease.

5. Need to test the impact of different lb parameters on the results. Excessive large parameters may miss some opportunities, while too small parameters may identify false breakouts.

Risk Mitigation:
1. Adjust moving average parameters appropriately to increase filtering capability.
2. Optimize ATR parameters, supplemented by visual judgment.  
3. Adjust the lb lookback period to find the optimal parameters.
4. Suspend trading during oscillating markets.

### Optimization Directions   

The strategy can also be optimized in the following dimensions:

1. Test different combinations of moving average parameters to find the optimal parameters.

2. Try different ATR parameter settings to balance entry opportunities and risk control.
   
3. Optimize the lb lookback period parameter to identify more efficient breakouts.  

4. Try to build a dynamic stop loss based on volatility and drawdown to control risk.

5. Incorporate other factors such as trading volume to determine the effectiveness of breakouts.  

6. Develop/',</,>< and other methods to find extreme points as references.

7. Try Machine Learning to train parameters for optimal parameters


### Summary   

Overall, this is a typical breakout tracking strategy. Judging by dual timeframes, using Swing High to identify entry timing, and using stop loss line and moving average double insurance exit mechanisms form a complete logical system. The risk and return characteristics of this strategy are clear, suitable for medium and long term tracking investors. Although there are certain risks, they can be reduced by optimizing parameters and rules. The strategy has great room for improvement. Incorporating more indicators may further enhance the strategy effect.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Jan 2019 06:00 +0000)|Backtest Start Date|
|v_input_2|timestamp(01 Jan 2100 00:00 +0000)|Backtest End Date|
|v_input_3|3|Lookback Period for Swing High|
|v_input_4|3|Lookback Bars for Stop Level|
|v_input_5|D|Timeframe of Moving Averages|
|v_input_6|0|Moving Average Type: SMA|EMA|
|v_input_7|10|1st Moving Average Length|
|v_input_8|20|2nd Moving Average Length|
|v_input_9|50|3rd Moving Average Length|
|v_input_10|true|Use 3rd Moving Average for Filtering?|
|v_input_11|0|Trailing Stop: 2nd Moving Average|1st Moving Average|
|v_input_12|false|Use ATR for Filtering?|
|v_input_13|100|% of Daily ATR Value|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-24 00:00:00
end: 2024-01-30 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © millerrh

// The intent of this strategy is to buy breakouts with a tight stop on smaller timeframes in the direction of the longer term trend.
// Then use a trailing stop of a close below either the 10 MA or 20 MA (user choice) on that larger timeframe as the position 
// moves in your favor (i.e. whenever position price rises above the MA).
// Option of using daily ATR as a measure of finding contracting ranges and ensuring a decent risk/reward.
// (If the difference between the breakout point and your stop level is below a certain % of ATR, it could possibly find those consolidating periods.)

//@version=4
strategy("Qullamaggie Breakout", overlay=true, initial_capital=10000, currency='USD', 
   default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1)
   
// === BACKTEST RANGE ===
Start = input(defval = timestamp("01 Jan 2019 06:00 +0000"), title = "Backtest Start Date", type = input.time)
Finish = input(defval = timestamp("01 Jan 2100 00:00 +0000"), title = "Backtest End Date", type = input.time)

// Inputs
lb = input(defval = 3, title = "Lookback Period for Swing High", minval = 1,
   tooltip = "Lookback period for defining the breakout level.")
lbStop = input(defval = 3, title = "Lookback Bars for Stop Level", minval = 1,
   tooltip = "Initial stop placement is the lowest low this many bars back. Allows for tighter stop placement than referencing swing lows.")  
htf = input(defval="D", title="Timeframe of Moving Averages", type=input.resolution,
  tooltip = "Allows you to set a different time frame for the moving averages. The default behavior is to identify good tightening setups on a larger timeframe
  (like daily) and enter the trade on a breakout occuring on a smaller timeframe, using the moving averages of the larger timeframe to trail your stop.")
maType = input(defval="SMA", options=["EMA", "SMA"], title = "Moving Average Type")
ma1Length = input(defval = 10, title = "1st Moving Average Length", minval = 1)
ma2Length = input(defval = 20, title = "2nd Moving Average Length", minval = 1)
ma3Length = input(defval = 50, title = "3rd Moving Average Length", minval = 1)
useMaFilter = input(title = "Use 3rd Moving Average for Filtering?", type = input.bool, defval = true,
  tooltip = "Signals will be ignored when price is under this slowest moving average.  The intent is to keep you out of bear periods and only
             buying when price is showing strength or trading with the longer term trend.")
trailMaInput = input(defval="2nd Moving Average", options=["1st Moving Average", "2nd Moving Average"], title = "Trailing Stop")

// MA Calculations
ma(maType, src, length) =>
    maType == "EMA" ? ema(src, length) : sma(src, length) //Ternary Operator (if maType equals EMA, then do ema calc, else do sma calc)
ma1 = security(syminfo.tickerid, htf, ma(maType, close, ma1Length))
ma2 = security(syminfo.tickerid, htf, ma(maType, close, ma2Length))
ma3 = security(syminfo.tickerid, htf, ma(maType, close, ma3Length))

plot(ma1, color=color.purple, style=plot.style_line, title="MA1", linewidth=2, transp = 60)
plot(ma2, color=color.yellow, style=plot.style_line, title="MA2", linewidth=2, transp = 60)
plot(ma3, color=color.white, style=plot.style_line, title="MA3", linewidth=2, transp = 60)

// === USE ATR FOR FILTERING ===
// The idea here is that you want to buy in a consolodating range for best risk/reward. So here you can compare the current distance between 
// support/resistance vs.the ATR and make sure you aren't buying at a point that is too extended from normal.
useAtrFilter = input(title = "Use ATR for Filtering?", type = input.bool, defval = false,
  tooltip = "Signals will be ignored if the distance between support and resistance is larger than a user-defined percentage of Daily ATR. 
             This allows the user to ensure they are not buying something that is too extended and instead focus on names that are consolidating more.")
atrPerc = input(defval = 100, title = "% of Daily ATR Value", minval = 1)
atrValue = security(syminfo.tickerid, "D", atr(14))*atrPerc*.01

// === PLOT SWING HIGH/LOW AND MOST RECENT LOW TO USE AS STOP LOSS EXIT POINT ===
// Change these values to adjust the look back and look forward periods for your swing high/low calculations
pvtLenL = lb
pvtLenR = lb

// Get High and Low Pivot Points
pvthi_ = pivothigh(high, pvtLenL, pvtLenR)
pvtlo_ = pivotlow(low, pvtLenL, pvtLenR)

// Force Pivot completion before plotting.
Shunt = 1 //Wait for close before printing pivot? 1 for true 0 for flase
maxLvlLen = 0 //Maximum Extension Length
pvthi = pvthi_[Shunt]
pvtlo = pvtlo_[Shunt]

// Count How many candles for current Pivot Level, If new reset.
counthi = barssince(not na(pvthi))
countlo = barssince(not na(pvtlo))
 
pvthis = fixnan(pvthi)
pvtlos = fixnan(pvtlo)
hipc = change(pvthis) != 0 ? na : color.maroon
lopc = change(pvtlos) != 0 ? na : color.green

// Display Pivot lines
plot((maxLvlLen == 0 or counthi < maxLvlLen) ? pvthis : na, color=hipc, transp=0, linewidth=1, offset=-pvtLenR-Shunt, title="Top Levels")
// plot((maxLvlLen == 0 or countlo < maxLvlLen) ? pvtlos : na, color=lopc, transp=0, linewidth=1, offset=-pvtLenR-Shunt, title="Bottom Levels")
plot((maxLvlLen == 0 or counthi < maxLvlLen) ? pvthis : na, color=hipc, transp=0, linewidth=1, offset=0, title="Top Levels 2")
// plot((maxLvlLen == 0 or countlo < maxLvlLen) ? pvtlos : na, color=lopc, transp=0, linewidth=1, offset=0, title="Bottom Levels 2")

// BUY CONDITIONS
stopLevelCalc = valuewhen(pvtlo_, low[pvtLenR], 0) //Stop Level at Swing Low
buyLevel = valuewhen(pvthi_, high[pvtLenR], 0) //Buy level at Swing High
plot(buyLevel, style=plot.style_line, color=color.blue, title = "Current Breakout Level", show_last=1, linewidth=1, transp=50, trackprice=true)

// Conditions for entry and exit
stopLevel = float(na) // Define stop level here as "na" so that I can reference it in the inPosition 
  // variable and the ATR calculation before the stopLevel is actually defined.
buyConditions = (useMaFilter ? buyLevel > ma3 : true) and
  (useAtrFilter ? (buyLevel - stopLevel[1]) < atrValue : true)
// buySignal = high > buyLevel and buyConditions
buySignal = crossover(high, buyLevel) and buyConditions
trailMa = trailMaInput == "1st Moving Average" ? ma1 : ma2
sellSignal = crossunder(close, trailMa)
// sellSignal = security(syminfo.tickerid, htf, close < trailMa) and security(syminfo.tickerid, htf, close[1] < trailMa)


// STOP AND PRICE LEVELS
inPosition = bool(na)
inPosition := buySignal[1] ? true : sellSignal[1] ? false : low <= stopLevel[1] ? false : inPosition[1]

lowDefine = lowest(low, lbStop)
stopLevel := inPosition ? stopLevel[1] : lowDefine
// plot(stopLevel)

buyPrice = buyLevel
buyPrice := inPosition ? buyPrice[1] : buyLevel
plot(stopLevel, style=plot.style_line, color=color.orange, title = "Current Stop Level", show_last=1, linewidth=1, transp=50, trackprice=true)
plot(inPosition ? stopLevel : na, style=plot.style_circles, color=color.orange, title = "Historical Stop Levels", transp=50, trackprice=false)
// plot(buyPrice, style=plot.style_line, color=color.blue, linewidth=1, transp=50, trackprice=true)

// (STRATEGY ONLY) Comment out for Study
strategy.entry("Long", strategy.long, stop = buyLevel, when = buyConditions)
strategy.exit("Exit Long", from_entry = "Long", stop=stopLevel[1])
if (low[1] > trailMa)
    strategy.close("Long", when = sellSignal)
// if (low[1] > trailMa)
//     strategy.exit("Exit Long", from_entry = "Long", stop=trailMa) //to get this to work right, I need to reference highest highs instead of swing highs
    //because it can have me buy right back in after selling if the stop level is above the last registered swing high point.
```

> Detail

https://www.fmz.com/strategy/440560

> Last Modified

2024-01-31 17:06:36
