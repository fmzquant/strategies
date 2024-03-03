
> Name

双指数移动平均线RSI交易策略Double-Exponential-Moving-Average-RSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/109960b071f02688b4b.png)
 [trans]
## 概述

本策略名称为“双指数移动平均线RSI交易策略”。该策略利用双指数移动平均线(Double EMA)和相对强弱指数(RSI)作为主要交易指标,实现机械化交易。

## 策略原理  

该策略首先计算价格的双指数移动平均线(MA),然后基于MA计算RSI,再计算RSI的指数移动平均线(Smooth)。当RSI上穿其移动平均线时生成买入信号;当RSI下穿其移动平均线时生成卖出信号。 optionally,该策略还设定了每日最大交易次数、交易资金份额、交易时间段、止损止盈点数以及追踪止损点数等参数进行风险控制。

## 策略优势

1. 使用双指数移动平均线,能更快地响应价格变化,过滤掉部分噪音。
2. 基于移动平均线计算RSI,使其更稳定,避免误交易。  
3. RSI的移动平均线有助于确认交易信号,过滤假突破。
4. 设定最大交易次数,有助于控制每日风险。
5. 设定交易资金份额,避免单笔损失过大。 
6. 设定交易时间段,避开关键时间节点,控制流动性风险。
7. 设定止损止盈点数,有助于限制单笔损益。
8. 追踪止损点数有助于锁定浮利,减少回撤。

## 策略风险

1. 双指数移动平均线对市场突发事件反应较慢,可能错过短线交易机会。
2. RSI容易形成死叉和黄金交叉误导信号。需结合其他指标谨慎交易。 
3. 固定交易资金比例无法对应市场波动幅度,存在资金利用率不足的风险。
4. 固定止损止盈难以适应不同品种和市况,存在过早止损或止盈的风险。
5. 追踪止损在震荡行情中可能过于频繁被触发。

对策:
1. 适当缩短移动平均线周期,提高敏感性。
2. 结合其它指标如成交量过滤信号。   
3. 动态调整交易资金比例。  
4. 根据市场波动性和变化调整止损止盈幅度。
5. 适当放宽追踪止损点数。

## 策略优化方向  

1. 测试不同长短周期的双指数移动平均线组合,找到最优参数。
2. 测试RSI的计算周期参数,提高黄金/死叉信号的可靠性。
3. 添加交易量、布林带等指标过滤信号噪音。  
4. 结合当日收盘价、波动率等动态调整交易资金比例和止损止盈幅度。  
5. 根据不同品种特性和市场环境优化追踪止损机制。

## 总结

本策略整体 mechanic 规则明确,可靠性较高,适用于中长线趋势品种。优化后可成为基础的趋势跟踪机械交易策略,风险可控,值得进一步评估实盘效果。

||

## Overview

The strategy is named "Double Exponential Moving Average RSI Trading Strategy". It uses Double EMA and Relative Strength Index (RSI) as the main trading indicators to implement automated trading.  

## Strategy Principle   

The strategy first calculates the Double Exponential Moving Average (MA) of the price, then calculates the RSI based on MA, and further calculates the Exponential Moving Average of RSI (Smooth). It generates buy signals when RSI crosses above its moving average and sell signals when RSI crosses below its moving average. Optionally, the strategy also sets parameters for maximum number of trades per day, trade size as percentage of equity, trading time session, take profit and stop loss in points, and trailing stop in points for risk control.

## Strategy Strengths

1. Double EMA responds faster to price changes and filters out some noise. 
2. Calculating RSI based on MA makes it more stable and avoids false trades.
3. The moving average of RSI helps confirming trading signals and avoiding false breakouts.  
4. Setting maximum number of trades per day helps controlling daily risk.
5. Setting trade size as percentage of equity avoids oversized single trade loss.
6. Setting trading time session avoids key time nodes and controls liquidity risk.  
7. Take profit and stop loss in points help limiting single trade P&L.
8. Trailing stop in points helps locking in floating profits and reducing drawdowns.

## Strategy Risks  

1. Double EMA responds slower to market events, missing short-term trading opportunities.  
2. RSI is prone to forming false death/golden cross signals. Needs confirming with other indicators for prudent trading.
3. Fixed percentage of equity cannot adapt to varying market volatility, risks insufficient fund utilization.  
4. Fixed stop loss/profit targets fail to adapt to different products and market conditions, risks premature exit. 
5. Trailing stop tends to trigger too often in choppy markets.

Counter measures:
1. Shorten MA periods to improve sensitivity.  
2. Add other indicators like volume to filter signals.
3. Dynamically adjust trade size.   
4. Adapt stop loss/profit targets based on market volatility. 
5. Relax trailing stop loss points appropriately.

## Optimization Directions   

1. Test different short/long period Double EMA combinations to find optimum parameters.  
2. Test RSI calculation period parameters to improve death/golden cross signal reliability.  
3. Add indicators like volume, Bollinger Bands to filter signal noise.
4. Dynamically adjust trade size and stop loss/profit targets based on daily close price, volatility etc.
5. Optimize trailing stop mechanisms for different products and market environments.  

## Summary

The strategy has clear mechanical rules and high reliability overall, suitable for medium-to-long-term trending products. When optimized, it can become a basic trend following mechanical strategy with controllable risks, worth further evaluation on live performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|21|ma_length|
|v_input_3|4|rsi_length|
|v_input_4|4|rsi_smooth|
|v_input_5|6|max_order_per_day|
|v_input_6|false|trade_size_as_equity_factor|
|v_input_7|10000|trade_size|
|v_input_8|100000|take_profit_in_points|
|v_input_9|100000|stop_loss_in_points|
|v_input_10|150|trail_in_points|
|v_input_11|true|USE_SESSION|
|v_input_12|0400-1500|Trade Session:|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title='[STRATEGY][RS]DemaRSI V0', shorttitle='D', overlay=false, initial_capital=100000, currency=currency.USD)
src = input(close)
ma_length = input(21)
rsi_length = input(4)
rsi_smooth = input(4)

ma = ema(ema(src, ma_length), ma_length)
marsi = rsi(ma, rsi_length)
smooth = ema(marsi, rsi_smooth)
plot(title='M', series=marsi, color=black)
plot(title='S', series=smooth, color=red)
hline(0)
hline(50)
hline(100)

max_order_per_day = input(6)
// strategy.risk.max_intraday_filled_orders(max_order_per_day)
trade_size_as_equity_factor = input(false)
trade_size = input(type=float, defval=10000.00) * (trade_size_as_equity_factor ? strategy.equity : 1)
take_profit_in_points = input(100000)
stop_loss_in_points = input(100000)
trail_in_points = input(150)

USE_SESSION = input(true)
trade_session = input(title='Trade Session:', defval='0400-1500', confirm=false)
istradingsession = not USE_SESSION ? true : not na(time('1', trade_session))

buy_entry = istradingsession and crossover(marsi, smooth)
sel_entry = istradingsession and crossunder(marsi, smooth)

strategy.entry('buy', long=true, qty=1, when=buy_entry)
strategy.entry('sel', long=false, qty=1, when=sel_entry)

strategy.exit('buy.Exit', from_entry='buy', profit=take_profit_in_points, loss=stop_loss_in_points, trail_points=trail_in_points, trail_offset=trail_in_points)
strategy.exit('sel.Exit', from_entry='sel', profit=take_profit_in_points, loss=stop_loss_in_points, trail_points=trail_in_points, trail_offset=trail_in_points)
strategy.close_all(when=not istradingsession)
```

> Detail

https://www.fmz.com/strategy/440437

> Last Modified

2024-01-30 15:44:11
