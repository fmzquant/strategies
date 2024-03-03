
> Name

DAKELAX-XRPUSDT-波尔带回归均线策略DAKELAX-XRPUSDT-Bollinger-Band-Mean-Reversion-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f54e9433bd162d887f.png)
[trans]


## 概述

DAKELAX-XRPUSDT是一个用于币安的XRPUSDT的交易机器人策略,它是一个简单的反转到均线的策略,在2019年5-8月的H1时间周期进行回测表现较好,实时运行也较好。

## 策略原理

该策略首先计算20个周期的SMA均线和上轨、下轨波动带。其中上轨为SMA均线加1.5倍标准差,下轨为SMA均线减2.2倍标准差。然后计算波动带收缩率,如果收缩率大于1.3则用黑色填充,如果小于0.1则用黄色填充,否则用红色填充。

当收盘价低于下轨时,以20个币的数量做多;当收盘价高于上轨时,平掉所有仓位。

该策略还计算7日EMA快线、18日EMA慢线,当快线上穿慢线时判断为买入信号,当快线下穿慢线时判断为卖出信号。

## 优势分析

- 使用波动带及其收缩率判断趋势和波动,非常直观
- 结合均线金叉死叉进行判断,可以增强信号
- 回测表现较好,实盘也较为稳定

## 风险分析

- 波动带收缩后突破失败的概率较大,容易止损
- 固定数量买入,没有考虑仓位管理,存在超买超卖风险
- 在震荡行情中,金叉死叉较多,容易造成亏损
- 仅考虑日线因素,没有结合更高时间周期,可能漏掉更大方向

可以考虑动态调整买入数量或设置止损来控制风险。优化金叉死叉策略,避免在震荡行情中被套牢。结合更高级别的趋势指标来确定大方向。

## 优化方向 

- 根据波动带宽度调整买入数量,波动带收窄时少买,扩大时可适当增加

- 在波动带收缩但还未触发信号时,可以考虑积累空仓建立仓位

- 整体结合长线INDICATOR指标判断趋势方向,大趋势不明朗时可暂停策略

- 可以结合止损来控制风险,止损点可设定为最近波动带低点

- 优化金叉死叉策略参数,调整均线周期,避免被套

## 总结

DAKELAX-XRPUSDT是一个利用波动带收缩结合均线策略的交易机器人程序。该策略直观易懂,回测效果较好,但存在一定的风险。通过调整买入数量,停止策略,设置止损以及优化均线策略等方式可以降低风险。整体而言,该策略思路清晰易操作,为Bollinger Band策略的参考范例,但需要针对不同币种和市场环境进行优化调整才能在实盘中稳定获利。

||


## Overview

DAKELAX-XRPUSDT is a trading bot strategy for XRPUSDT on Binance. It is a simple reverse to mean strategy using Bollinger Bands, and performs well in backtest on H1 timeframe from May to Aug 2019, as well as running live.

## Strategy Logic

The strategy first calculates the 20-period SMA and upper/lower Bollinger Bands. The upper band is SMA + 1.5 standard deviation, and the lower band is SMA - 2.2 standard deviation. It then calculates the contraction rate of the bands. Bands are filled black if contraction > 1.3, yellow if < 0.1, else red.

When close price is below the lower band, it goes long with 20 coins. When close is above upper band, it closes all positions. 

The strategy also calculates 7-period EMA fast line and 18-period EMA slow line. Crossover of fast line above slow line is buy signal, and crossover below is sell signal.

## Advantage Analysis

- Bollinger Bands and contraction rate intuitively identify trends and volatility
- Combine with EMA crossover adds strength to signals 
- Good backtest results and relatively stable in live trading

## Risk Analysis

- High probability of failure when breakout after band contraction
- Fixed amount buying without position sizing risks overtrading
- Too many crossovers in ranging markets risks losses
- Only considers daily factors, misses larger timeframe trends

Consider dynamic position sizing or stop loss to control risks. Optimize crossover strategy to avoid whipsaws in ranging markets. Add higher timeframe trend indicators to identify larger moves.

## Optimization Directions

- Adjust buy amount based on band width, less when contracted and more when expanded

- Consider accumulating positions when contraction seen but signal not triggered yet 

- Add longer timeframe trend INDICATOR to determine overall direction, pause strategy when unclear

- Incorporate stop loss to control risk, can set near recent lows of bands

- Optimize crossover parameters like EMA periods to avoid getting trapped

## Summary

DAKELAX-XRPUSDT is a trading bot strategy using Bollinger Band contraction with EMA crossover. It is intuitive and has good backtest results but contains some risks. These can be reduced through position sizing, stopping strategy, adding stop loss and optimizing crossover logic. Overall it provides a clear example of a Bollinger Band strategy, but requires pair-specific optimization for stable live profits.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|buyAmount|
|v_input_2|20|len2|
|v_input_3_close|0|src2: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-26 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//study(title="Tradebotler DAKELAX Binance:XRPUSDT Study-strategy", overlay=true)
strategy(title="Tradebotler DAKELAX Binance:XRPUSDT Strategy", overlay=true)

buyAmount = input(20, minval=1)

// SMA20
len2 = input(20, minval=1)
src2 = input(close)
out2 = sma(src2, len2)

// BB contraction value (medium tight)
contraction_value = 1.3
// BB contraction value (very tight)
contraction_value2 = 0.1

// 2xSTDEV BB calculation
dev = stdev(src2, len2)
upper_BB = out2  + 1.5*dev
lower_BB = out2  - 2.2*dev
x1 = plot(upper_BB, color=blue, linewidth = 2)
x2 = plot(lower_BB, color=blue, linewidth = 2)

contraction = (upper_BB-lower_BB)/out2

//fills the BBands according to the contraction value (threshold)

// Calculate values
fastMA  = ema(close, 7)
slowMA  = ema(close, 18)

// Determine alert setups
crossUp   = crossover(fastMA, slowMA)
crossDown = crossunder(fastMA, slowMA)

buySignal   = (crossUp or crossUp[1]) and (low > slowMA)
shortSignal = (crossDown or crossDown[1]) and (high < slowMA)

// Highlight alerts on the chart
bgColour =
     (buySignal and barstate.isrealtime) ? green :
     (shortSignal and barstate.isrealtime) ? red :
     na

signalBuy = (buySignal ) ? true : false
signalSell = (shortSignal ) ? true : false

test = true

test := not test[1]

closesBelowLowerBB = close < lower_BB
closesAboveUpperBB = close > upper_BB

tmptext = "blah"

// Plot values
plot(series=fastMA, color=teal)
plot(series=slowMA, color=orange)

plot(out2, color=black, linewidth = 1)
fill(x1, x2, color = contraction > contraction_value ? black : contraction < contraction_value2 ? yellow: red)

isInRed = contraction < contraction_value and contraction >= contraction_value2
isInYellow = contraction < contraction_value and contraction < contraction_value2

if ( closesBelowLowerBB )
    strategy.order('Buy', strategy.long, buyAmount)

if ( closesAboveUpperBB )
    strategy.close_all()


```

> Detail

https://www.fmz.com/strategy/430877

> Last Modified

2023-11-02 16:18:34
