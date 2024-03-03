
> Name

T7-JNSAR量化交易策略T7-JNSAR-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

T7 JNSAR是一种针对NIFTY指数的日内趋势跟踪交易系统。它利用变化的JNSAR线产生买卖信号,属于趋势追踪类策略。该策略原创者为印度交易员Illango,我对其进行了优化改进并编程实现。

## 策略原理 

- 计算JNSAR线:利用5日高、低、收盘价的指数移动平均计算出JNSAR值,绘制成线图。

- 产生信号:当日收盘价高于JNSAR线时产生做多信号;当日收盘价低于JNSAR线时产生做空信号。

- 入场:在产生信号的第二天开盘价入场。 

- 出场:反向信号产生时平仓。

- 只交易NIFTY指数,不交易个股。

- 无论盈亏都交易每一个信号。

## 优势分析

- JNSAR线能较好地描绘趋势和关键支撑阻力。

- 仅基于客观指标产生信号,避免主观情绪影响。

- 利用趋势追踪来获利,历史回测收益较好。

- 可通过期货或期权来交易,交易成本较低。

- 规则简单清晰,容易实现自动交易。

## 风险分析

- 作为趋势跟踪策略,在盘整市场中存在较多止损的可能。

- 无法有效判断趋势结束点,可能出现超买超卖现象。

- SIGNAL产生滞后,可能出现假突破导致亏损。

- 需承受较大的回撤和连续亏损的风险。

- 仅适用于NIFTY,不适用于其他品种。

- 需要较强的心理素质持续交易所有信号。

## 优化方向 

- 测试不同参数找寻最佳JNSAR线设置

- 添加止损机制来控制风险

- 结合其他指标判断趋势终结点

- 开发动态仓位管理方法

- 优化信号产生逻辑

- 尝试应用机器学习模型

## 总结

T7 JNSAR为NIFTY提供了简单有效的趋势跟踪策略。遵循交易规则,控制风险,心态持续交易所有信号,可以获得长期正收益。通过参数优化、止损管理等方法可以进一步提高策略的健壮性。

|| 

## Overview

T7 JNSAR is a trend following day trading system for NIFTY index. It generates buy and sell signals using the dynamic JNSAR line and belongs to the trend following strategies. The original idea was from Indian trader Illango and I have optimized and coded it.

## Strategy Logic

- Calculate JNSAR line: Use exponential moving average of past 5-day high, low and close to calculate JNSAR value and plot the line.

- Generate signals: Long signal when daily close is above JNSAR line, short signal when daily close is below JNSAR line.

- Entry: Enter at next day's opening price after signal is generated.

- Exit: Close position when reverse signal is triggered.

- Only trade NIFTY index, not stocks. 

- Take every signal regardless of profit/loss.

## Advantage Analysis

- JNSAR line depicts trend and key support/resistance levels well.

- Signals are based on objective indicators only, avoiding emotional interference.

- Profits from trend following, good historical backtest results.

- Can trade via futures or options for low costs.

- Simple and clear rules, easy to automate trading.

## Risk Analysis

- Prone to whipsaws and stops in range-bound markets as a trend following strategy.

- Unable to effectively determine trend exhaustion, overbought/oversold risks.

- Signal lag may cause losses from false breakouts.

- Need to endure large drawdowns and consecutive losses.

- Only applicable to NIFTY, not other products. 

- Requires strong psychology to trade every signal consistently.

## Optimization Directions

- Test different parameters for optimal JNSAR line setting.

- Add stops to control risks.

- Incorporate other indicators to detect trend ending.

- Develop dynamic position sizing method.

- Optimize signal generation logic.

- Explore machine learning models.

## Summary

T7 JNSAR provides a simple and effective trend following strategy for NIFTY. By following the trading rules, managing risks and trading all signals with persistence, it can achieve long-term positive results. Further enhancements through parameter optimization, stop loss management etc. can improve its robustness.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Enable Backtest|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Created by Syam Mohan @ T7 Wealth Creators Pvt Ltd - Makes Life Easier, on request from @stocksonfire. 
//This is a trend following daily bar trading system for NIFTY. Original idea belongs to ILLANGO @ http://tradeinniftyonly.blogspot.in
//Use it at your own risk after validation at your end. Neither me or my company is responsible for any lossses you may incur using this system. 

//@version=2
strategy("T7 JNSAR", overlay=true)

backtest = input(title="Enable Backtest", type=bool, defval=1)

sum = ema(high, 5) + ema(low, 5) + ema(close, 5) 
sum := sum + ema(high[1], 5) + ema(low[1], 5) + ema(close[1], 5) 
sum := sum + ema(high[2], 5) + ema(low[2], 5) + ema(close[2], 5)
sum := sum + ema(high[3], 5) + ema(low[3], 5) + ema(close[3], 5) 
sum := sum + ema(high[4], 5) + ema(low[4], 5) + ema(close[4], 5)

jnsar = round(sum/15)

buy = close > jnsar
short = close < jnsar

plot(jnsar,color=green,linewidth=4)

if backtest!=0
    strategy.entry("JNSARLong", strategy.long,comment="JNSARLong",when=buy!=0)
    strategy.entry("JNSARShort", strategy.short,comment="JNSARShort",when=short!=0)
    
  
```

> Detail

https://www.fmz.com/strategy/427122

> Last Modified

2023-09-18 14:05:19
