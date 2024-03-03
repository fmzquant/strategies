
> Name

趋势突破短线策略Intraday-Trend-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略是一个适用于日内交易的基于超级趋势指标的短线策略。用户可以定义日内交易时段,策略只在该时段内运行。策略通过双倍数量反向开仓来实现信号反转。当日内交易时段结束且持仓未平仓时,强制平仓。

### 策略原理

1. 计算超级趋势指标。根据用户定义的乘数和ATR周期计算出超级趋势线。

2. 绘制超级趋势线。绘制超级趋势线作为支撑线和阻力线。

3. 判定长短条件。收盘价高于超级趋势线为做多条件,收盘价低于超级趋势线为做空条件。 

4. 交易时段判定。根据用户定义的日内交易时段,判断当前价格条是否在交易时段内。

5. 发出交易信号。只有在交易时段内且满足做多做空条件时,发出相应的买入卖出信号。

6. 反向开仓。当超级趋势指标方向转变时,使用双倍数量反向开仓。

7. 平仓离场。当超级趋势信号不变且交易时段结束时,强制平仓。

### 优势分析

1. 使用超级趋势指标识别趋势,可减少假信号。

2. 结合超级趋势指标和收盘价进行交易,避免被腰斩。 

3. 反向开仓及时止损,可减少亏损。

4. 日内时段交易,可避免隔夜风险。

5. 强制平仓机制,可避免忘记平仓的风险。

### 风险分析

1. 超级趋势指标参数设定不当可能导致策略效果不佳。

2. 反向开仓会增加交易频率和交易费用。

3. 日内时段结束时强制平仓可能会造成损失。

- 风险1可通过参数优化找到最佳参数组合。

- 风险2可以设置止损来控制亏损。

- 风险3可以设置止损或使用趋势过滤来避免强平亏损。

### 优化方向 

1. 尝试不同的趋势指标,如MA,KDJ等。

2. 增加止损逻辑。

3. 增加趋势过滤,避免强平亏损。 

4. 优化乘数和ATR周期参数。

5. 测试不同的交易品种。

### 总结

该策略整合超级趋势指标和日内交易时段管理,旨在捕捉短线趋势突破。反向开仓和强制平仓机制可有效控制风险。后续可通过参数优化、止损以及趋势过滤进一步改进策略效果。

||


### Overview

This is an intraday short-term trend following strategy based on the Supertrend indicator. Users can define the intraday trading session during which the strategy will run. 

The strategy reverses the position using double quantity when the signal changes. Any open positions are squared off at the end of the intraday session.

### Strategy Logic

1. Calculate the Supertrend indicator based on user defined multiplier and ATR period.

2. Plot the Supertrend line as the support and resistance.

3. Determine long/short conditions. Close above Supertrend line is long condition. Close below Supertrend line is short condition.

4. Check if current bar is within intraday session defined by user.

5. Issue long/short signals only when intraday session is active and long/short conditions are met.

6. Reverse position by taking opposite trade with double quantity when Supertrend direction changes.

7. Square off open positions when Supertrend direction is unchanged and intraday session ends.

### Advantage Analysis  

1. Supertrend identifies trend and reduces false signals.

2. Combining Supertrend with close price avoids being stopped out prematurely.

3. Reversing position timely reduces losses. 

4. Intraday session avoids overnight risk.

5. Forced exit avoids risk of forgetting to square off.

### Risk Analysis

1. Improper Supertrend parameters may lead to poor strategy performance.

2. Reversing position increases trade frequency and costs. 

3. Forced exit at session end may lead to losses.

- Risk 1 can be mitigated through parameter optimization.

- Risk 2 can be controlled via stop loss. 

- Risk 3 can be avoided using stop loss or trend filter.

### Enhancement Opportunities

1. Test different trend indicators like MA, KDJ etc.

2. Add stop loss logic.

3. Add trend filter to avoid forced exit losses.

4. Optimize multiplier and ATR period parameters. 

5. Test on different instruments.

### Conclusion

This strategy combines Supertrend and intraday session management to capitalize on short-term trend breaks. Position reversal and forced exit effectively controls risk. Further improvements can be made through parameter optimization, stop loss and trend filtering.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0915-1455|Market session|
|v_input_2|4|Multiplier|
|v_input_3|14|ATR Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Pritesh-StocksDeveloper

//@version=4
strategy("Supertrend - Intraday", overlay=true, calc_on_every_tick = true)

// ********** Strategy inputs - Start **********

// Used for intraday handling
// Session value should be from market start to the time you want to square-off 
// your intraday strategy
// Important: The end time should be at least 2 minutes before the intraday
// square-off time set by your broker
var i_marketSession = input(title="Market session", type=input.session, 
     defval="0915-1455", confirm=true)

var float i_multiplier = input(title = "Multiplier", type = input.float, 
     defval = 4, confirm=true)

var int i_atrPeriod = input(title = "ATR Period", type = input.integer, 
     defval = 14, confirm=true)

// ********** Strategy inputs - End **********


// ********** Supporting functions - Start **********

// A function to check whether the bar or period is in intraday session
barInSession(sess) => time(timeframe.period, sess) != 0

// ********** Supporting functions - End **********


// ********** Strategy - Start **********

[superTrend, dir] = supertrend(i_multiplier, i_atrPeriod)

colResistance = dir == 1 and dir == dir[1] ? color.new(color.red, 0) : color.new(color.red, 100)
colSupport = dir == -1 and dir == dir[1] ? color.new(color.green, 0) : color.new(color.green, 100)

plot(superTrend, color = colResistance, linewidth=2)
plot(superTrend, color = colSupport, linewidth=2)

// Long/short condition
longCondition = close > superTrend
shortCondition = close < superTrend

// See if intraday session is active
bool intradaySession = barInSession(i_marketSession)

// Trade only if intraday session is active
 
// Long position
// When longCondition and intradaySession both are true
strategy.entry(id = "Long", long = strategy.long, 
     when = longCondition and intradaySession)
 
// Short position
// When shortCondition and intradaySession both are true
strategy.entry(id = "Short", long = strategy.short, 
     when = shortCondition and intradaySession)
 
// Square-off position (when session is over and position is open)
squareOff = (not intradaySession) and (strategy.position_size != 0)
strategy.close_all(when = squareOff, comment = "Square-off")

// ********** Strategy - End **********
```

> Detail

https://www.fmz.com/strategy/427115

> Last Modified

2023-09-18 13:11:51
