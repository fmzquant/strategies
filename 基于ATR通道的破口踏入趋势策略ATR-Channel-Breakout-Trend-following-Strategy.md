
> Name

基于ATR通道的破口踏入趋势策略ATR-Channel-Breakout-Trend-following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10ddc0b2ce088f5b009.png)
[trans]

## 概述
该策略运用ATR通道和破口理论,在突破通道时踏入趋势,属于趋势跟踪策略。策略简单易懂,运用均线通道和ATR指标判断趋势方向,在关键点位发出交易信号。

## 策略原理
该策略使用高、低、收盘价和ATR指标构建上下轨,形成ATR通道。通道宽度决定于ATR参数的大小。当价格突破通道时,判断为趋势开始,此时进入做多或做空方向。策略分为两档交易信号,价格突破一个ATR宽度视为趋势初现,此时第一档买卖点被触发;价格突破两个ATR宽度则视为趋势加速,第二档买卖点被触发。

## 优势分析
该策略主要优势如下:
1. 采用ATR指标构建通道,考虑市场波动率,优于简单均线。
2. 两档买卖点设定,分批进入,风险可控。
3. 突破理论判断趋势,精准定位关键点位。
4. 代码精简,容易理解实施。

## 风险分析
该策略主要风险如下:
1. 单一指标判断,当ATR失效时,策略失效概率大。
2. 未设立止损限制和头寸管理,风险控制不足。
3. 效用待验证,实盘条件下可能效果欠佳。
4. 参数不合适可能导致穿越或过度交易。

## 优化方向
该策略可以优化的方向如下:
1. 增加多种指标过滤和确认,防止误判。
2. 增加止损模块,加强风险控制。
3. 增加仓位控制和头寸管理。
4. 增加参数优化,针对不同品种参数调整。
5. 减少交易频率和仓位规模,考虑实盘条件。

## 总结
该策略整体框架清晰,作为概念验证策略可以理解使用。但距离实盘还存在一定差距,有较大优化空间。如果能进一步完善风控和交易频率控制,则该策略应用前景较好。

||

## Overview
This strategy utilizes the ATR channel and breakout theory to follow trends by entering when the channel is broken. It belongs to trend-following strategies. The strategy is simple and easy to understand, using moving average channels and ATR indicators to determine trend direction and issuing trading signals at key points.  

## Principle  
This strategy constructs upper and lower bands with high, low, close prices and ATR indicator to form an ATR channel. The channel width is determined by the ATR parameter size. When the price breaks through the channel, it is judged as the beginning of a trend, at which points long or short positions are entered. The strategy has two tiers of trading signals. When the price breaks through one ATR width, it is considered as an emerging trend, triggering the first tier of buy/sell points. When the price breaks through two ATR widths, it is considered an accelerating trend, triggering the second tier of buy/sell points.

## Advantage Analysis
The main advantages of this strategy are:
1. Using ATR indicators to construct channels considers market volatility better than simple moving averages. 
2. The two-tier buy/sell points allow staged entry with controllable risks.
3. Breakout theory accurately locates key trend points.  
4. The concise code is easy to understand and implement.

## Risk Analysis
The main risks of this strategy are:  
1. Reliance on a single indicator means high failure probability if ATR fails.
2. Lack of stop loss and position management leads to insufficient risk control.
3. Utility needs verification and may underperform in live trading conditions.
4. Improper parameters may cause whipsaws or overtrading.  

## Optimization Directions
The optimization directions for this strategy include:
1. Adding filters with multiple indicators to prevent misjudgments.
2. Adding stop loss modules to enhance risk control.
3. Adding position control and money management.  
4. Parameter tuning for different products.
5. Reducing trading frequency and position sizing for live trading.

## Summary
The overall framework of this strategy is clear and usable as a proof of concept. But there are gaps from live trading that allow substantial optimizations. If risk controls and trading frequencies can be further improved, the application prospects would be good.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_timeframe_1|60|TimeFrame|
|v_input_int_1|60|ATR length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-03 00:00:00
end: 2024-01-02 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Myhaj_Lito

//@version=5
strategy("Renko Trend Strategy",shorttitle = "RENKO-Trend str.",overlay = true)
TF = input.timeframe(title='TimeFrame', defval="60")
ATRlength = input.int(title="ATR length", defval=60, minval=2, maxval=1000)

HIGH = request.security(syminfo.tickerid, TF, high)
LOW = request.security(syminfo.tickerid, TF, low)
CLOSE = request.security(syminfo.tickerid, TF, close)
ATR = request.security(syminfo.tickerid, TF, ta.atr(ATRlength))


RENKOUP = float(na)
RENKODN = float(na)
H = float(na)
COLOR = color(na)
BUY = int(na)
SELL = int(na)
UP = bool(na)
DN = bool(na)
CHANGE = bool(na)

RENKOUP := na(RENKOUP[1]) ? (HIGH + LOW) / 2 + ATR / 2 : RENKOUP[1]
RENKODN := na(RENKOUP[1]) ? (HIGH + LOW) / 2 - ATR / 2 : RENKODN[1]
H := na(RENKOUP[1]) or na(RENKODN[1]) ? RENKOUP - RENKODN : RENKOUP[1] - RENKODN[1]
COLOR := na(COLOR[1]) ? color.white : COLOR[1]
BUY := na(BUY[1]) ? 0 : BUY[1]
SELL := na(SELL[1]) ? 0 : SELL[1]
UP := false
DN := false
CHANGE := false

// calculating 
if not CHANGE and close >= RENKOUP[1] + H * 2
    CHANGE := true
    UP := true
    RENKOUP := RENKOUP[1] + ATR * 2
    RENKODN := RENKOUP[1] + ATR
    COLOR := color.rgb(0, 255, 170,60)
    SELL := 0
    BUY += 2
    BUY


if not CHANGE and close >= RENKOUP[1] + H
    CHANGE := true
    UP := true
    RENKOUP := RENKOUP[1] + ATR
    RENKODN := RENKOUP[1]
    COLOR := color.rgb(0, 230, 38,60)
    SELL := 0
    BUY += 1
    BUY

if not CHANGE and close <= RENKODN[1] - H * 2
    CHANGE := true
    DN := true
    RENKODN := RENKODN[1] - ATR * 2
    RENKOUP := RENKODN[1] - ATR
    COLOR := color.rgb(255, 92, 43,60)
    BUY := 0
    SELL += 2
    SELL
if not CHANGE and close <= RENKODN[1] - H
    CHANGE := true
    DN := true
    RENKODN := RENKODN[1] - ATR
    RENKOUP := RENKODN[1]
    COLOR := color.rgb(245, 69, 69,60)
    BUY := 0
    SELL += 1
    SELL
//// STRATEGY 
if(UP)
    strategy.entry("Long",strategy.long)
if(DN)
    strategy.entry("Short",strategy.short)


// ploting 

bgcolor(COLOR)

```

> Detail

https://www.fmz.com/strategy/437503

> Last Modified

2024-01-03 11:53:52
