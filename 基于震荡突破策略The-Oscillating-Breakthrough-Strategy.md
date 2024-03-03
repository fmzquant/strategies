
> Name

基于震荡突破策略The-Oscillating-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18ca32cc70ce9565bc1.png)
[trans]
## 概述

震荡突破策略是一个用于主流加密货币15分钟时间框架的积极交易策略。它利用技术指标来识别市场趋势,发现潜在的突破点,并通过设定止损来有效管理风险。

## 策略原理

该策略使用两条简单移动平均线(SMA50和SMA200)来确定市场趋势方向。当SMA50上穿SMA200时为看涨信号,反之则为看跌信号。 

相对强弱指数(RSI)被用来判断超买超卖情况。当RSI低于设定的超卖区域(默认为40)时为超卖区,视为潜在买入信号。

具体交易逻辑是:

1. RSI低于40并且收盘价高于SMA200构成买入条件; 
2. 进入长仓;
3. 止损设定为入场价的5%;
4. 如果SMA50下穿SMA200且RSI高于50时平仓以锁定利润。

该策略简单易行,通过双重确认来寻找潜在的突破点。止损设置防止亏损扩大,SMA指标的交叉作为退出信号。

## 优势分析

该策略具有以下优势:

1. 策略操作简单,容易实施;
2. 利用双移动平均线过滤假突破,确保突破VALIDITY;
3. RSI指标识别超卖区形成买入时机;  
4. 包含止损来主动控制风险;
5. SMA交叉作为退出机制。

## 风险分析

该策略也存在一些风险:

1. 市场出现剧烈波动时,止损可能被突破;
2. SMA期限设置不当可能错过趋势;
3. 多头行情中空仓时间过长影响收益。

可以通过以下方法加以优化:

1. 动态调整止损幅度;
2. 优化SMA参数;
3. 考虑增加其他因子判断持仓时机。

## 总结

总的来说,震荡突破策略是一个简单实用的短线策略。它具有操作简便,风险可控等优点,适合对加密货币市场不太熟悉的交易者。通过进一步优化,可以使策略在更多市场环境下保持稳定收益。

||

## Overview  

The Oscillating Breakthrough Strategy is an active trading strategy for mainstream cryptocurrencies using a 15-minute timeframe. It utilizes technical indicators to identify market trends, discover potential breakthrough points, and effectively manage risks through stop-loss settings.

## Strategy Principles

The strategy employs two Simple Moving Averages (SMA50 and SMA200) to determine the market trend direction. When SMA50 crosses above SMA200, it's a bullish signal, and vice versa for bearish signals.

The Relative Strength Index (RSI) is used to judge overbought/oversold conditions. When the RSI falls below the set oversold region (default 40), it indicates a potential buy signal.  

The specific trading logic is:

1. RSI below 40 and close price above SMA200 constitutes the buy condition;
2. Enter long position;  
3. Set stop loss at 5% below entry price;
4. If SMA50 crosses below SMA200 and RSI goes above 50, close position to lock in profits.

The strategy is simple and straightforward, seeking potential breakthrough points through dual confirmation. The stop loss prevents losing positions from getting out of hands, while SMA crossovers act as exit signals.

## Advantage Analysis   

The strategy has the following advantages:

1. Simple to implement;  
2. False breakouts filtered through dual moving averages, ensuring validity;
3. RSI identifies oversold conditions for opportunities;
4. Embedded stop loss to actively control risks; 
5. SMA crossovers as exit mechanism.  

## Risk Analysis

There are also some risks:

1. Stop loss could be penetrated during violent market swings;
2. Improper SMA periods may cause missing trends;  
3. Excessive time spent out of trades in bull markets impacts profits.

Improvements can be made via:

1. Dynamic stop loss levels;
2. SMA optimization;
3. Considering more factors for holding decisions.  

## Summary  

In summary, the Oscillating Breakthrough Strategy is a simple and practical short-term strategy. With easy operation, controllable risks etc., it suits novice crypto traders. Further optimizations can enable stable profits across more market environments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|5|% Stop Loss|
|v_input_1|90|(?Simple Moving Average) SMA50 Length|
|v_input_2|170| SMA200 Length|
|v_input_3|14|(?Relative Strenght Index) RSI Length|
|v_input_4|40| Oversold Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-22 00:00:00
end: 2024-02-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Wielkieef


//@version=5
strategy("Crypto Sniper [15min]", shorttitle="ST Strategy", overlay=true, pyramiding=1, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=25, calc_on_order_fills=false, slippage=0, commission_type=strategy.commission.percent, commission_value=0.03)

sma50Length = input(90, title=" SMA50 Length", group="Simple Moving Average")
sma200Length = input(170, title=" SMA200 Length", group="Simple Moving Average")
rsiLength = input(14, title=" RSI Length", group="Relative Strenght Index")
overSoldLevel = input(40, title=" Oversold Level", group="Relative Strenght Index")
sl = input.float(5.0, '% Stop Loss', step=0.1)

rsi = ta.rsi(close, rsiLength)
sma50 = ta.sma(close, sma50Length)
sma200 = ta.sma(close, sma200Length)

longCondition = rsi < overSoldLevel and close > sma200

if (longCondition)
    strategy.entry("Long", strategy.long)  

stopLossPrice = strategy.position_avg_price * (1 - sl / 100)
strategy.exit("Stop Loss", stop=stopLossPrice)

if (ta.crossunder(sma200, sma50) and rsi >= 50)
    strategy.close("Long")

Bar_color = ta.crossunder(sma200, sma50) and rsi >= 50 ? color.orange : rsi < overSoldLevel ? color.maroon : strategy.position_avg_price != 1 ? color.green : color.gray

barcolor(color=Bar_color)



//by wielkieef

```

> Detail

https://www.fmz.com/strategy/442551

> Last Modified

2024-02-22 17:15:01
