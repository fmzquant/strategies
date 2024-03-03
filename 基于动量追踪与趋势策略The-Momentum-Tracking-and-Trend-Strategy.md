
> Name

基于动量追踪与趋势策略The-Momentum-Tracking-and-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1351b3dcd32a5335df2.png)
[trans]
### 概述

本策略的核心思路是结合超级趋势指标和平均趋向指标(ADX),实现对趋势的判断和追踪。超级趋势指标用于辨别当前价格趋势方向,ADX用于判断趋势力度,只有在强势趋势下才进行交易。此外,策略还利用K线实体颜色、交易量指标等进行确认,形成比较完整的交易规则。

总体来说,该策略属于趋势追踪策略,旨在捕捉中长线明确趋势,而避免受到盘整和震荡的干扰。

### 策略原理

1. 使用超级趋势指标判断价格趋势方向。当价格站上超级趋势时为多头信号,站下超级趋势时为空头信号。

2. 使用ADX判断趋势力度。仅在ADX大于设置门槛时才产生交易信号,这样可以过滤掉盘整不明朗的时期。 

3. K线实体颜色判断当前为上涨格局或下跌格局,与超级趋势指标进行组合,形成確認。

4. 交易量放大作为确認信号。仅在交易量上涨时才进行建仓。

5. 设置止损位和止盈位,以锁定利润和控制风险。

6. 在设置的盘中时间结束前平掉所有仓位。

### 策略优势

1. 追踪中长线明确趋势,避开震荡,可获得较高的盈利率。

2. 策略参数较少,容易理解和实施。

3. 风险控制到位,设置了止损和止盈。

4. 利用多个指标进行确认,可减少虚假信号。

### 策略风险

1. 大盘深度调整时可能遭遇较大亏损。

2. 个股业绩变化时可能产生剧烈反转。

3. 政策面发生重大变化的黑天鹅事件。

对应风险的解决方法:

1. 适当调整ADX参数,确保只在强势趋势下交易。

2. 加大止损幅度,控制单笔损失。

3. 密切关注政策和重要事件,必要时主动止损。

### 策略优化方向

1. 可以测试不同的超级趋势参数组合,选择产生信号较稳定的参数。

2. 可以测试ADX的不同参数,确定最佳的参数组合。

3. 可以增加其他指标进行确认,如波动率、布林带等,进一步减少假信号。

4. 可以结合突破等策略,在趋势破裂时及时止损。

### 总结

本策略总体思路清晰,以超级趋势判断价格趋势方向,以ADX判断趋势力度,在强势趋势下进行趋势追踪。同时设置止损止盈来控制风险。策略参数较少,易于优化。可作为学习简单有效趋势策略的良好示例。后续可通过参数优化、信号过滤等方法进一步完善。

||

### Overview

The core idea of this strategy is to combine the Super Trend indicator and the Average Directional Movement Index (ADX) to judge and track trends. The Super Trend indicator is used to identify the current price trend direction, and the ADX is used to determine the trend strength. Trades are only made under strong trend conditions. In addition, the strategy also uses candlestick body color, trading volume and other indicators for confirmation, forming a relatively complete set of trading rules.  

Overall, this strategy belongs to the trend tracking strategy, aiming to capture medium and long term clear trends while avoiding interference from consolidation and oscillation periods.

### Strategy Principles 

1. Use the Super Trend indicator to determine the price trend direction. When the price stands above the Super Trend it is a long signal, and when it stands below the Super Trend it is a short signal.

2. Use the ADX to judge the strength of the trend. Trading signals are generated only when the ADX is greater than the threshold, so that periods with unclear consolidation can be filtered out.

3. The candlestick body color is used to judge whether it is currently in an upward or downward pattern, combined with the Super Trend indicator to form confirmation.  

4. Expanding trading volume serves as a confirmation signal. Positions are only established when trading volume rises.

5. Set stop loss and take profit to lock in profits and control risks.

6. Close all positions before the set end of day time.

### Advantages of the Strategy

1. Track medium and long term clear trends, avoid oscillation, and achieve high profitability. 

2. The strategy has few parameters and is easy to understand and implement.

3. Risks are well controlled with stop loss and take profit in place. 

4. The use of multiple indicators for confirmation can reduce false signals.

### Risks of the Strategy

1. May suffer large losses during major market-wide corrections.  

2. Individual stocks may have sharp reversals due to changes in fundamentals.

3. Black swan events from major policy changes.

Solutions:

1. Appropriately adjust ADX parameters to ensure trading only under strong trends.  

2. Increase stop loss percentage to control single loss amount.

3. Closely monitor policies and important events, actively cut loss if necessary.


### Directions for Optimization

1. Test different combinations of Super Trend parameters to find the one that generates the most stable signals.

2. Test different ADX parameter combinations to determine the optimal settings.

3. Add other confirmation indicators like volatility and Bollinger Bands to further reduce false signals. 

4. Combine with breakout strategies to cut losses in a timely manner when trends break down.

### Summary

The overall logic of this strategy is clear, using the Super Trend to judge price trend direction, the ADX to determine trend strength, and trading along strong trends. Stop loss and take profit are set to control risks. The strategy has few parameters and is easy to optimize. It can serve as a good example for learning simple and effective trend tracking strategies. Further improvements can be made through parameter optimization, signal filtering etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0915-1455|Market session|
|v_input_2|true|Long Take Profit (%)|
|v_input_3|true|Short Take Profit (%)|
|v_input_4|0.5|Long Stop Loss (%)|
|v_input_5|0.5|Short Stop Loss (%)|
|v_input_6|2|ST Multiplier|
|v_input_7|10|ST ATR Period|
|v_input_8|14|ADX Length|
|v_input_9|20|ADX Threshold|
|v_input_10|25|ADX Momemtum Value|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-15 00:00:00
end: 2024-02-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Intraday Strategy Template

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © vikris

//@version=4
strategy("[VJ]Hulk Smash Intra", overlay=true, calc_on_every_tick = false, pyramiding=0,default_qty_type=strategy.percent_of_equity, default_qty_value=100,initial_capital=2000)

// ********** Strategy inputs - Start **********

// Used for intraday handling
// Session value should be from market start to the time you want to square-off 
// your intraday strategy
// Important: The end time should be at least 2 minutes before the intraday
// square-off time set by your broker
var i_marketSession = input(title="Market session", type=input.session, 
     defval="0915-1455", confirm=true)

// Make inputs that set the take profit % (optional)
longProfitPerc = input(title="Long Take Profit (%)",
     type=input.float, minval=0.0, step=0.1, defval=1) * 0.01

shortProfitPerc = input(title="Short Take Profit (%)",
     type=input.float, minval=0.0, step=0.1, defval=1) * 0.01
     
// Set stop loss level with input options (optional)
longLossPerc = input(title="Long Stop Loss (%)",
     type=input.float, minval=0.0, step=0.1, defval=0.5) * 0.01

shortLossPerc = input(title="Short Stop Loss (%)",
     type=input.float, minval=0.0, step=0.1, defval=0.5) * 0.01    
     
var float i_multiplier = input(title = "ST Multiplier", type = input.float, 
     defval = 2, step = 0.1, confirm=true)

var int i_atrPeriod = input(title = "ST ATR Period", type = input.integer, 
     defval = 10, confirm=true)     
     
len = input(title="ADX Length", type=input.integer, defval=14)
th = input(title="ADX Threshold", type=input.integer, defval=20)
adxval = input(title="ADX Momemtum Value", type=input.integer, defval=25)     



// ********** Strategy inputs - End **********


// ********** Supporting functions - Start **********

// A function to check whether the bar or period is in intraday session
barInSession(sess) => time(timeframe.period, sess) != 0

// ********** Supporting functions - End **********


// ********** Strategy - Start **********

[superTrend, dir] = supertrend(i_multiplier, i_atrPeriod)

colResistance = dir == 1 and dir == dir[1] ? color.new(color.red, 0) : color.new(color.red, 100)
colSupport = dir == -1 and dir == dir[1] ? color.new(color.green, 0) : color.new(color.green, 100)


// Super Trend Long/short condition
stlong = close > superTrend
stshort = close < superTrend



// Figure out take profit price
longExitPrice  = strategy.position_avg_price * (1 + longProfitPerc)
shortExitPrice = strategy.position_avg_price * (1 - shortProfitPerc)

// Determine stop loss price
longStopPrice  = strategy.position_avg_price * (1 - longLossPerc)
shortStopPrice = strategy.position_avg_price * (1 + shortLossPerc)

//Vol Confirmation
vol = volume > volume[1]


//Candles colors
greenCandle = (close > open)
redCandle = (close < open)

// See if intraday session is active
bool intradaySession = barInSession(i_marketSession)

// Trade only if intraday session is active




TrueRange = max(max(high - low, abs(high - nz(close[1]))), abs(low - nz(close[1])))
DirectionalMovementPlus = high - nz(high[1]) > nz(low[1]) - low ? max(high - nz(high[1]), 0) : 0
DirectionalMovementMinus = nz(low[1]) - low > high - nz(high[1]) ? max(nz(low[1]) - low, 0) : 0


SmoothedTrueRange = 0.0
SmoothedTrueRange := nz(SmoothedTrueRange[1]) - nz(SmoothedTrueRange[1]) / len + TrueRange
SmoothedDirectionalMovementPlus = 0.0
SmoothedDirectionalMovementPlus := nz(SmoothedDirectionalMovementPlus[1]) - 
   nz(SmoothedDirectionalMovementPlus[1]) / len + DirectionalMovementPlus
SmoothedDirectionalMovementMinus = 0.0
SmoothedDirectionalMovementMinus := nz(SmoothedDirectionalMovementMinus[1]) - 
   nz(SmoothedDirectionalMovementMinus[1]) / len + DirectionalMovementMinus

DIPlus = SmoothedDirectionalMovementPlus / SmoothedTrueRange * 100
DIMinus = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
DX = abs(DIPlus - DIMinus) / (DIPlus + DIMinus) * 100
ADX = sma(DX, len)

// a = plot(DIPlus, color=color.green, title="DI+", transp=100)
// b = plot(DIMinus, color=color.red, title="DI-", transp=100)

//Final Long/Short Condition
longCondition = stlong and redCandle and vol and ADX>adxval
shortCondition = stshort and greenCandle and vol and ADX >adxval



//Long Strategy - buy condition and exits with Take profit and SL
if (longCondition and intradaySession)
    stop_level = longStopPrice
    profit_level = longExitPrice
    strategy.entry("My Long Entry Id", strategy.long)
    strategy.exit("TP/SL", "My Long Entry Id",stop=stop_level, limit=profit_level)
    


//Short Strategy - sell condition and exits with Take profit and SL
if (shortCondition and intradaySession)
    stop_level = shortStopPrice
    profit_level = shortExitPrice
    strategy.entry("My Short Entry Id", strategy.short)
    strategy.exit("TP/SL", "My Short Entry Id", stop=stop_level, limit=profit_level)
    
 
 
// Square-off position (when session is over and position is open)
squareOff = (not intradaySession) and (strategy.position_size != 0)
strategy.close_all(when = squareOff, comment = "Square-off")

// ********** Strategy - End **********
```

> Detail

https://www.fmz.com/strategy/442555

> Last Modified

2024-02-22 17:27:18
