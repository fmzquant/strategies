
> Name

基于支撑阻力与均量突破的跟踪止损策略Support-and-Resistance-Strategy-with-Volume-Breakout-and-Trailing-Stop-Loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/177c5bdb71e581a2b8a.png)
[trans]

## 概述

该策略的主要思想是结合支撑阻力位和成交量的突破来确定入场时机,并使用ATR指标实现获利后动态调整止损追踪价格,从而获取更多的潜在利润。

## 策略原理

该策略主要由以下几部分逻辑组成:

1. 使用ta.pivothigh和ta.pivotlow函数计算出L_Bars根K线的最高价和R_Bars根K线的最低价,作为阻力线和支撑线。

2. 当收盘价上穿阻力线且成交量突破volumeRange的阈值时,做多;当收盘价下穿支撑线且成交量突破volumeRange的阈值时,做空。

3. 做多之后,以close-ATR_LO作为长止损;做空之后,以close+ATR_SH作为短止损,实现动态调整跟踪止损。

4. 在交易时间内(0915-1445),每天做第一个交易信号,收益或亏损达到risk的额度后不再开新单。

## 策略优势

1. 运用支撑阻力理论,结合成交量指标,使入场时机更加精准。

2. 使用ATR指标跟踪止损,能够根据市场波动程度来灵活调整止损位置,实现获利后降低盈利回吐的可能。

3. 适当控制单日交易次数和单笔交易风险,有助于把握趋势,避免止损过多。

## 策略风险

1. 支撑阻力可能失效,无法提供有效的入场信号。

2. ATR指标设定过大,可能导致止损距离过远,增加亏损风险。

3. 成交量指标设定过小,可能导致错过机会;设定过大,可能导致误判信号。

**解决方法:**

- 根据不同品种特点,调整支撑阻力参数

- 优化ATR倍数和成交量阈值参数

- 结合其他指标判断入场时机

## 策略优化方向 

1. 结合其他指标判断入场时机,例如移动平均线等

2. 对ATR倍数和成交量阈值参数进行优化

3. 结合机器学习算法实现动态参数优化

4. 扩展到其他品种,寻找参数规律

## 总结

该策略整合了多种分析工具,通过对支撑阻力、成交量和止损方法的运用,实现了回测阶段较好的效果。但实盘中可能会面临更多不确定性,需要通过参数优化和引入其他判断指标来进一步增强实盘表现。总的来说,该策略思路清晰、易于理解,为量化交易策略提供了一个很好的参考案例。

||

## Overview

The main idea of this strategy is to combine support/resistance levels and volume breakouts to determine entry signals, and use the ATR indicator to dynamically adjust stop loss for profit taking, in order to capture more potential profits.

## Strategy Logic

The strategy consists of the following main logics:

1. Use ta.pivothigh and ta.pivotlow to calculate the highest price of previous L_Bars candles and the lowest price of previous R_Bars candles, as resistance and support levels.  

2. When close price crosses above resistance level and volume breaks above the volumeRange threshold, go long. When close price crosses below support level and volume breaks above the volumeRange threshold, go short.

3. After long entry, set stop loss at close-ATR_LO. After short entry, set stop loss at close+ATR_SH. This realizes dynamic trailing stop loss adjustment.

4. Only take the first signal within trading hours (0915-1445) each day. No new orders after reaching the daily risk limit defined by risk input.

## Advantage Analysis

1. Use support/resistance theory combined with volume indicator to improve entry accuracy. 

2. Trailing stop loss based on ATR can flexibly adjust stop level based on market volatility, lowering the chance of profit retracement.  

3. Appropriate control over daily trade times and per trade risk helps to catch the trend and avoid excessive stop loss.

## Risk Analysis

1. Support/resistance levels may fail and unable to provide effective entry signals.  

2. ATR multiplier set too high may lead to stop loss being too far away, increasing loss risk.

3. Volume threshold set too low may miss opportunities, too high may cause false signals.

**Solutions:**

- Adjust support/resistance parameters based on different products’ characteristics. 

- Optimize ATR multiplier and volume threshold parameters.

- Add other indicators to confirm entry signals.

## Optimization Directions

1. Add other indicators like moving averages to assist in determining entry signals.

2. Optimize parameters like ATR multiplier and volume threshold.  

3. Use machine learning algorithms to realize dynamic parameter optimization.

4. Expand strategy to other products to find parameter patterns.

## Summary  

The strategy integrates various analytical tools, applying support/resistance, volume, and stop loss methods, and achieved good backtest results. But more uncertainties may exist in live trading, requiring further enhancements like parameter optimization and additional entry confirmation indicators to improve real-world performance. Overall, the strategy has clear logic and easy understanding, providing a good reference case for quantitative trading strategies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|L_Bars|
|v_input_int_2|15|R_Bars|
|v_input_int_3|20|Volume Break [threshold]|
|v_input_int_4|150|PRICE CROSS EMA|
|v_input_float_1|3.2|_ATR LONG|
|v_input_float_2|3.2|_ATR SHORT|
|v_input_float_3|200|RISK|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-03 00:00:00
end: 2024-01-10 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//   ____________                _________                      _____________
//  |____________|             ||________|                      ||__________|
//       ||            ____    ||        ||                     ||                    ______ ________    _____ ________
//       ||    |   || ||       ||________|| |   || ||    ||     ||     |   ||   /\\   |   // |______| || ||    |______|
//       ||    |===|| |===     ||__________ |   || ||    ||     ||     |===||  /__\\  |===      ||    ||   \\     ||
//       ||    |   || ||___    ||        || |___|| ||___ ||___  ||     |   || /    \\ |   \\    ||    || ___||    ||
//       ||                    ||________||                     ||__________
//       ||                    ||________|                      ||__________|
  
//@version=5
strategy("SUPPORT RESISTANCE STRATEGY [5MIN TF]",overlay=true )
L_Bars = input.int(defval = 10, minval = 1 , maxval = 50, step =1)
R_Bars = input.int(defval = 15, minval = 1 , maxval = 50, step =1)
volumeRange = input.int(20, title='Volume Break [threshold]', minval = 1)

// ═══════════════════════════ //
// ——————————> INPUT <——————— //
// ═══════════════════════════ //

EMA1 = input.int(title='PRICE CROSS EMA', defval = 150, minval = 10 ,maxval = 400)
factor1 = input.float(title='_ATR LONG',defval = 3.2 , minval = 1 , maxval = 5 , step = 0.1, tooltip = "ATR TRAIL LONG")
factor2 = input.float(title='_ATR SHORT',defval = 3.2 , minval = 1 , maxval = 5 , step = 0.1, tooltip = "ATR TRAIL SHORT")
risk = input.float(title='RISK',defval = 200 , minval = 1 , maxval = 5000 , step = 50, tooltip = "RISK PER TRADE")


var initialCapital = strategy.equity
t = time(timeframe.period, '0915-1445:1234567')
time_cond = not na(t)

// ══════════════════════════════════ //
// ———————————> EMA DATA <——————————— //
// ══════════════════════════════════ //
ema1 = ta.ema(close, EMA1)

plot(ema1, color=color.new(color.yellow, 0), style=plot.style_linebr, title='ema1')

// ══════════════════════════════════ //
// ————————> TRAIL DATA <———————————— //
// ══════════════════════════════════ //
// *******Calculate LONG TRAIL data*****
ATR_LO = ta.atr(14)*factor1

// *******Calculate SHORT TRAIL data*****
ATR_SH = ta.atr(14)*factor2

long_trail = close - ATR_LO
short_trail = close + ATR_SH

// Plot atr data
//plot(longStop, color=color.new(color.green, 0), style=plot.style_linebr, title='Long Trailing Stop')
//plot(shortStop , color=color.new(color.red, 0), style=plot.style_linebr, title='Short Trailing Stop')

// ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ //
// ————————————————————————————————————————————————————————> RESISTANCE/SUPPORT LEVELS DATA <————————————————————————————————————————————————————————————————————————————————————————————— //
// ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ //

Resistance_pi = fixnan(ta.pivothigh(L_Bars, R_Bars)[1])
Support_pi = fixnan(ta.pivotlow(L_Bars, R_Bars)[1])
r1 = plot(Resistance_pi, color=ta.change(Resistance_pi) ? na : color.red,  offset=-(R_Bars + 1),linewidth=2, title='RESISTANCE')
s1 = plot(Support_pi, color=ta.change(Support_pi) ? na : color.green, offset=-(R_Bars + 1),linewidth=2, title='SUPPORT')

//Volume 
vol_1 = ta.ema(volume, 5)
vol_2 = ta.ema(volume, 10)
osc_vol = 100 * (vol_1 - vol_2) / vol_2

// ══════════════════════════════════//
// ————————> LONG POSITIONS <————————//
// ══════════════════════════════════//
//******barinstate.isconfirmed used to avoid repaint in real time*******

if ( ta.crossover(close, Resistance_pi) and osc_vol > volumeRange and not(open - low > close - open) and strategy.opentrades==0 and barstate.isconfirmed and time_cond and close >= ema1 )
    strategy.entry(id= "Long" ,direction = strategy.long, comment = "BUY")
    
plot(long_trail , color=color.new(color.blue, 0), style=plot.style_linebr, title='long Stop')

if strategy.position_size > 0 
    strategy.exit("long tsl", "Long" , stop = long_trail ,comment='SELL')
 
// ═════════════════════════════════════//
// ————————> SHORT POSITIONS <————————— //
// ═════════════════════════════════════//
if ( ta.crossunder(close, Support_pi) and osc_vol > volumeRange and not(open - close < high - open)  and strategy.opentrades==0 and barstate.isconfirmed and time_cond and close <= ema1 )
    strategy.entry(id = "Short" ,direction = strategy.short,  comment = "SELL") 

if strategy.position_size < 0
    strategy.exit("short tsl", "Short" ,  stop = short_trail ,comment='BUY')

// ════════════════════════════════════════════════//
// ————————> CLOSE ALL POSITIONS BY 3PM <————————— //
// ════════════════════════════════════════════════//
strategy.close_all(when = hour == 14 and minute == 55)

// ════════════════════════════════════════//
// ————————> MAX INTRADAY LOSS  <————————— //
// ════════════════════════════════════════//
// strategy.risk.max_intraday_loss(type = strategy.cash, value = risk)


```

> Detail

https://www.fmz.com/strategy/438379

> Last Modified

2024-01-11 17:58:26
