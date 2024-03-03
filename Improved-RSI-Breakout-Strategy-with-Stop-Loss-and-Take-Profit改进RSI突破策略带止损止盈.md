
> Name

Improved-RSI-Breakout-Strategy-with-Stop-Loss-and-Take-Profit改进RSI突破策略带止损止盈

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/177ff32b5af0907f550.png)
[trans]

## Overview

The Improved RSI Breakout Strategy is a trend following strategy that uses the Relative Strength Index (RSI) indicator to determine entry and exit points. It builds upon a basic RSI strategy by adding stop loss and take profit orders to manage risk. 

When RSI crosses above 70 (overbought level), the strategy goes long. When RSI crosses below 30 (oversold level), the strategy goes short. This allows it to ride strong trends up and down. Stop loss and take profit orders are then used to lock in profits and limit losses on existing positions.

## How it Works

The core mechanism relies on the RSI indicator crossing its overbought level (default 70) or oversold level (default 30) to trigger entries. 

- When RSI crosses above 70, it indicates the asset is overbought and may reverse, so the strategy opens a long position.  

- When RSI crosses below 30, it indicates the asset is oversold and may bounce, so the strategy opens a short position.

This allows the strategy to capitalize on mean reversion tendencies coming off extreme RSI levels.

The key enhancement is the added risk management through stop loss and take profit orders.

After entering a position, stop loss and take profit orders are placed at fixed percentages away from the entry price (default 2% stop loss, 10% take profit). This locks in a fixed reward to risk ratio on every trade.

If a position moves favorably, the take profit limit order will close it for a gain. If it moves adversely, the stop loss order will close it for a small loss. This maximizes profits in winning trades and minimizes losses from losing trades.

## Advantages

- Rides strong trends by buying dips and selling rallies 
- Take profit targets larger than stop loss targets allow asymmetric risk-reward
- Stop losses minimize losses on trades going the wrong direction
- Simple concept easy to understand and implement
- Added risk management gives it edge over basic RSI strategies

## Risks

- Whipsaws possible if RSI crosses levels multiple times
- Stop loss placement can be optimized 
- Take profit levels need fine tuning for better performance
- Works best in trending markets, range-bound performance weaker

## Enhancements

Some ways the strategy can be improved further:

- Add additional filters before entry trigger, such as a price breakout
- Trail stop loss levels to lock in more profits in winning trades  
- Expand take profit targets for bigger reward potential
- Optimize RSI levels, stop loss %, take profit % for each market
- Adapt to volatility conditions by using ATR for stop loss size

## Conclusion

The Improved RSI Breakout Strategy brings together several positive elements - using RSI to identify potential turning points, trend following entries in direction of momentum, asymmetric risk-reward from take profits > stop loss, and risk mitigation from exit orders.

By combining these aspects it aims to maximize reward while minimizing risk on each trade. Proper optimization and robust position sizing can turn this into a stable system across various market environments. The built-in risk controls give it an edge over basic RSI strategies.

||

## 概述

改进RSI突破策略是一种趋势跟踪策略,它使用相对强弱指数(RSI)指标来确定入场和退出的时间点。它在基本RSI策略的基础上增加了止损和止盈单来管理风险。

当RSI上穿70(超买水平)时,该策略做多。 当RSI下穿30(超卖水平)时,该策略做空。 这使其可以顺势而为,顺势而上,顺势而下。 然后使用止损和止盈单来锁定利润和限制损失。

## 工作原理

该策略的核心机制依赖于RSI指标穿过其超买水平(默认为70)或超卖水平(默认为30)来触发入场。

- 当RSI上穿70时,表示资产超买,可能会反转,所以策略开仓做多。

- 当RSI下穿30时,表示资产超卖,可能会反弹,所以策略开仓做空。

这使得该策略能够从RSI极端水平反转中获利。

关键的改进是增加了通过止损和止盈单来管理风险。

入场后,在入场价格上下设置一定百分比的止损和止盈单(默认为2%止损,10%止盈)。这使每笔交易都锁定了固定的风险回报比。

如果头寸走势有利,止盈限价单将在盈利情况下平仓。如果走势不利,止损单将小亏损出局。这可以最大化获利头寸的利润,并最小化亏损头寸的损失。

## 优势 

- 顺势而为,买入低点,卖出高点
- 止盈大于止损,实现非对称的风险收益率 
- 止损最小化错误方向交易的损失
- 概念简单易于理解和实施  
- 相比基本RSI策略,增加了风险管理优势

## 风险

- 如果RSI水平多次上下交叉可能出现误差信号
- 止损位置可以进一步优化
- 止盈水平需要微调以获得更好的表现  
- 趋势性行情中表现最佳,区间震荡行情中表现较弱

## 优化方向 

该策略可以进一步改进的一些思路:

- 在入场前增加其他过滤器,如价格突破
- 追踪止损以锁定更多的盈利
- 拓展止盈目标以获得更大的收益潜力 
- 对每个市场优化 RSI 水平、止损百分比、止盈百分比
- 根据ATR来设置止损幅度以适应市场波动率

## 总结

改进后RSI突破策略汇集了几个正面因素——使用RSI识别潜在转折点,根据势头判断方向,通过止盈大于止损实现非对称风险收益率,以及通过出场单来降低风险。

通过组合这些因素,其目的是在每笔交易中最大限度获得收益而最小化风险。适当优化头寸规模可以使其在不同市场环境中稳定运行。内置的风险控制系统使其比基本RSI策略更具优势。

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|70|overbought value|
|v_input_2|30|oversold value|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-02-03 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=4
// Improved RSI Simple Strategy
// Added Risk Management System: SL & TP
// © Bitduke
// All scripts: https://www.tradingview.com/u/Bitduke/#published-scripts

strategy("Simple RSI Buy/Sell at a level", shorttitle="Simple RSI Strategy (SL/TP)", overlay=false )
overbought = input(70, title="overbought value")
oversold = input(30, title="oversold value")

lenght = 14
rsi = rsi(close, lenght)
myrsi = rsi > overbought
myrsi2 = rsi < oversold

barcolor(myrsi ? color.black : na)
barcolor(myrsi2 ? color.blue : na)

// Risk Management Sysyem
convert_percent_to_points(percent) =>
    strategy.position_size != 0 ? round(percent / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)
    
setup_percent(percent) =>
    convert_percent_to_points(percent)

STOP_LOSS = 2
TAKE_PROFIT = 10

plot(rsi)
plot(overbought, color = color.red)
plot(oversold, color = color.green)

//STRATEGY
if (myrsi)
    strategy.entry("Long", strategy.long)
    
if (myrsi2)
    strategy.entry("Short", strategy.short)

strategy.exit("Exit", qty_percent = 100, profit = setup_percent(STOP_LOSS), loss = setup_percent(TAKE_PROFIT))


```

> Detail

https://www.fmz.com/strategy/440990

> Last Modified

2024-02-04 15:27:50
