
> Name

跨时间段移动量策略Intraday-Pivot-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17aefc9c41379937163.png)
[trans]


## 概述

该策略基于移动量的突破来产生交易信号,主要思想是在指定的时间段内观察价格的移动情况,以移动量的突破来判断价格的趋势变化。

## 策略原理

该策略通过计算价格在特定时间段内的最高价和最低价,即pivot high和pivot low,来判断价格的移动情况。

具体来说,策略会计算过去N根K线的最高价作为pivot high,过去M根K线的最低价作为pivot low。当当前K线的高点超过pivot high时,产生做多信号;当当前K线的低点跌破pivot low时,产生做空信号。

做多和做空后,策略会使用ATR来设定止损,并在日内阶段性止损。同时,策略还会在特定时间段内(如14:55分)平仓所有头寸。

该策略简单有效地利用了价格在特定时间范围内的突破来捕捉趋势,非常适合日内短线交易。计算思路清晰、易于实现。

## 策略优势

- 利用价格移动量的突破,捕捉趋势变化,信号比较可靠
- 只需要基础的K线数据,实现简单
- 合理止损,日内阶段性止损,有效控制风险
- 适合日内短线,防止过夜风险
- 参数较少,容易优化

## 策略风险及解决方案

- 存在一定的滞后,可能错过趋势开始的机会
  
  可以适当调整时间段,或组合其他指标确定入场时机

- 当趋势不明显时,会有较多的假信号

  可以适当调整参数,或增加过滤条件,例如趋势指标、成交量等

- 日内短线交易需要较高的资金成本

  可以调整仓位大小,或适当延长持仓时间

- 依赖参数优化,不同市场情况效果可能不同

  应根据不同市况调整参数,或采用机器学习等方法自动优化

## 策略优化方向 

- 尝试其他价格数据,如典型价格、均价等

- 增加成交量或波动率等过滤条件 

- 尝试不同的参数组合

- 结合趋势指标,确定趋势方向

- 利用机器学习方法自动优化参数

- 扩展至多个时间段,改进入场时机

## 总结

该策略整体思路清晰简洁,通过有效利用价格的移动突破来捕捉短期趋势,实现了较高的盈利因子。策略参数较少,易于测试和优化,适合日内短线操作。虽然存在一定程度的滞后和假信号问题,但可以通过参数调整、加入过滤条件等方法加以改进,具有很大的优化空间。该策略为我们提供了一个基于突破思想的有效交易框架。

||


## Overview

This strategy generates trading signals based on price breakouts within a specified time period. The main idea is to observe price movements during certain periods and use breakouts in price range to determine trend changes.

## Strategy Logic

The strategy calculates the highest high and lowest low of price within a certain timeframe, known as pivot high and pivot low, to gauge price movements. 

Specifically, it computes the highest high of past N bars as the pivot high and the lowest low of past M bars as the pivot low. A long signal is generated when the current bar's high breaks above the pivot high. A short signal is generated when the current bar's low breaks below the pivot low.

After entry, the strategy uses ATR for stop loss and intraday stop loss. It also closes all positions at a specific timeframe (e.g. 14:55).

The strategy effectively captures trends using simple price breakouts during certain periods, making it ideal for intraday trading. The logic is clear and easy to implement.

## Advantages

- Captures trend changes reliably using price breakouts
- Simple implementation with basic OHLC data 
- Reasonable stop loss and intraday stop loss manage risks
- Avoids overnight risks suitable for intraday trading
- Few parameters easy to optimize

## Risks and Mitigations

- Potential lag, may miss early trend start
  
  Adjust timeframe or combine other indicators for entry

- More false signals when trend is unclear

  Tune parameters, add filters like indicators, volume etc.

- Higher capital costs for active intraday trading

  Adjust position sizing, extend holding period

- Reliance on parameter optimization

  Adapt parameters to changing market conditions using machine learning etc.

## Enhancement Opportunities

- Test other price data like typical price, median price etc.

- Add filters like volume, volatility

- Try different parameter combinations

- Incorporate trend indicators to determine direction

- Auto-optimize parameters using machine learning

- Expand to multiple timeframes for better entry

## Conclusion

The strategy has a clear and concise logic, effectively capitalizing on price breakouts to capture short-term trends with good profit factors. With few tunable parameters easy for testing and optimization, it is well suited for intraday trading. While lag and false signals exist, they can be addressed through parameter tuning, adding filters etc. The strategy provides a robust breakout-based trading framework with ample optimization space.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|leftbars|
|v_input_2|15|rightbars|
|v_input_int_1|150|PRICE CROSS EMA|
|v_input_float_1|3.2|_ATR LONG|
|v_input_float_2|3.2|_ATR SHORT|
|v_input_float_3|200|RISK|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-27 00:00:00
end: 2023-11-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//   ____________        _________           _____________
//  |____________|      ||________|          ||__________|
//       ||             ||        ||         ||
//       ||             ||________||         ||
//       ||     H E     ||________   U L L   ||       H A R T I S T
//       ||             ||        ||         ||
//       ||             ||________||         ||__________
//       ||             ||________|          ||__________|
  
//@version=5
// strategy("PIVOT STRATEGY [5MIN TF]",overlay=true ,commission_type = strategy.cash, commission_value = 30 , slippage = 2, default_qty_value = 60, currency = currency.NONE, pyramiding = 0)
leftbars = input(defval = 10)
rightbars = input(defval = 15)

// ═══════════════════════════ //
// ——————————> INPUTS <——————— //
// ═══════════════════════════ //

EMA1 = input.int(title='PRICE CROSS EMA', defval = 150, minval = 10 ,maxval = 400)
factor1 = input.float(title='_ATR LONG',defval = 3.2 , minval = 1 , maxval = 5 , step = 0.1, tooltip = "ATR TRAIL LONG")
factor2 = input.float(title='_ATR SHORT',defval = 3.2 , minval = 1 , maxval = 5 , step = 0.1, tooltip = "ATR TRAIL SHORT")
risk = input.float(title='RISK',defval = 200 , minval = 1 , maxval = 5000 , step = 50, tooltip = "RISK PER TRADE")

var initialCapital = strategy.equity
t = time(timeframe.period, '0935-1400:1234567')
time_cond = true

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

longStop = close - ATR_LO
shortStop = close + ATR_SH

// Plot atr data
//plot(longStop, color=color.new(color.green, 0), style=plot.style_linebr, title='Long Trailing Stop')
//plot(shortStop , color=color.new(color.red, 0), style=plot.style_linebr, title='Short Trailing Stop')

// ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ //
// ————————————————————————————————————————————————————————> PIVOT DATA <———————————————————————————————————————————————————————————————————————————————————————————————————— //
// ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ //

ph = ta.pivothigh(close,leftbars, rightbars)
pl = ta.pivotlow(close,leftbars, rightbars)

pvt_condition1 = not na(ph)

upper_price = 0.0
upper_price := pvt_condition1 ? ph : upper_price[1]

pvt_condition2 = not na(pl)

lower_price = 0.0
lower_price := pvt_condition2 ? pl : lower_price[1]

// Signals
long  = ta.crossover(high, upper_price + syminfo.mintick)
short = ta.crossunder(low, lower_price - syminfo.mintick)

plot(upper_price, color= close > ema1  ? color.green : na, style=plot.style_line, title='PH')

plot(lower_price,  color= close <  ema1  ? color.red : na, style=plot.style_line, title='PL')


// ══════════════════════════════════//
// ————————> LONG POSITIONS <————————//
// ══════════════════════════════════//
//******barinstate.isconfirmed used to avoid repaint in real time*******

if ( long and strategy.opentrades==0 and barstate.isconfirmed and time_cond and close >= ema1 )
    strategy.entry(id= "Long" ,direction = strategy.long, comment = "B")
    
//plot(longStop , color=color.new(color.blue, 0), style=plot.style_linebr, title='long Stop')

if strategy.position_size > 0 
    strategy.exit("long tsl", "Long" , stop = longStop ,comment='S')
 

// ═════════════════════════════════════//
// ————————> SHORT POSITIONS <————————— //
// ═════════════════════════════════════//
if ( short and strategy.opentrades==0 and barstate.isconfirmed and time_cond and close <= ema1 )
    strategy.entry(id = "Short" ,direction = strategy.short,  comment = "S") 

if strategy.position_size < 0
    strategy.exit("short tsl", "Short" ,  stop = shortStop ,comment='B')

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

https://www.fmz.com/strategy/431000

> Last Modified

2023-11-03 16:35:15
