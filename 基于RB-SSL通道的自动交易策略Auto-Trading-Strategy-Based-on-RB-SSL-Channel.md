
> Name

基于RB-SSL通道的自动交易策略Auto-Trading-Strategy-Based-on-RB-SSL-Channel

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于RB SSL通道指标设计自动交易系统,利用通道线上的突破进行长短仓位切换,属于短线趋势跟随类策略。该策略简单实用,容易实现自动化交易。

## 策略原理  

该策略主要是利用RB SSL通道指标识别趋势方向。RB SSL通道包括上轨和下轨,分别由一定周期内的最高价SMA和最低价SMA组成。当价格上穿上轨时为多头信号,当价格下穿下轨时为空头信号。

具体来说,代码中首先计算一定周期内的最高价SMA和最低价SMA,作为通道的上下轨。然后判断价格是否突破上下轨,作为做多做空信号。在进入多头时,以上轨作为止损线;进入空头时,以下轨作为止损线。

## 优势分析

- 使用通道突破判断趋势方向,信号比较清晰。
- 止损线设置合理,可以很好控制风险。
- 代码简洁易懂,容易实现自动化。
- 兼顾趋势跟踪和短线操作,收益space较大。

## 风险及优化

- 仅依靠通道指标,对复杂行情的判断력较弱。
- 无法有效过滤震荡行情,容易被套。
- 周期参数对结果影响很大,需要仔细测试优化。
- 可以考虑加入其它指标进行组合,提高判断准确性。 
- 可以基于ATR等指标设置移动止损,以更好控制风险。

## 总结

该策略整体思路清晰简单,利用通道指标判断趋势方向,以通道线作为止损位,非常适合自动化交易。但仅依靠简单指标,对复杂行情判断能力较弱。可以通过多指标组合、参数优化、加入移动止损等方式进行改进优化,使策略更实用可靠。

||

## Overview

This strategy designs an automated trading system based on the RB SSL channel indicator, using channel breakouts for long/short position switching. It belongs to the category of short-term trend following strategies. The strategy is simple and practical, easy to automate.

## Strategy Logic

The core of this strategy is to identify trend direction using the RB SSL channel indicator. The RB SSL channel consists of an upper band and a lower band, formed by the SMA of highest price and lowest price over a certain period. A close above the upper band signals long, while a close below the lower band signals short.

Specifically, the code first calculates the SMA of highest and lowest prices over a period as the upper and lower bands of the channel. It then judges if price breaks the bands for long/short signals. When going long, the upper band is used as the stop loss; when going short, the lower band is used as the stop loss.

## Advantage Analysis 

- Using channel breakouts to determine trend direction provides clear signals.
- Stop loss placement is reasonable for good risk control.
- The code is simple and easy to understand, easy to automate.  
- Balances trend following and short-term trading, with large profit space.

## Risks and Improvements

- Relying solely on channel indicator, weak in complex market situations.
- Cannot effectively filter ranging markets, prone to being trapped.
- Period parameter greatly impacts results, requiring careful optimization.
- Can consider combining other indicators for better accuracy.
- Can add mobile stop loss based on ATR etc for better risk control.

## Summary

The strategy has an overall clear and simple logic, using channel indicator for trend direction and channel lines for stop loss, very suitable for automation. But relying solely on simple indicators means weak judgment in complex markets. Improvements like multi-indicator combo, parameter optimization, mobile stop loss can make the strategy more robust.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|13|Period|
|v_input_2|13|Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-26 00:00:00
end: 2023-09-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy("Algo 4- Auto", overlay=true)

// FULL ALGO INFORMATION- Coded by Forexcakemix



//LET THE GAMES COMMENCE :p

/////////////////////////////////////////////////

//RB SSL CHANNEL
period=input(title="Period", defval=13)
len=input(title="Period", defval=13)
smaHigh=sma(high, len)
smaLow=sma(low, len)
Hlv = 0.0
Hlv := close > smaHigh ? 1 : close < smaLow ? -1 : Hlv[1]
sslDown = Hlv < 0 ? smaHigh: smaLow
sslUp   = Hlv < 0 ? smaLow : smaHigh

plot(sslDown, linewidth=2, color=#FF0000)
plot(sslUp, linewidth=2, color=#00FF00)

ssl_l=crossover(sslUp,sslDown)
ssl_s=crossunder(sslUp,sslDown)


//Conditions For Trades

long= ssl_l 
short=  ssl_s

//Strategy Conditions

strategy.entry("Long", strategy.long,when=long)
strategy.entry("Short", strategy.short, when=short)

strategy.close("Long", when = ssl_s )  
strategy.close("Short", when = ssl_l ) 

```

> Detail

https://www.fmz.com/strategy/427862

> Last Modified

2023-09-26 12:04:24
