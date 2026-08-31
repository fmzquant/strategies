
> Name

T7-JNSAR量化交易策略T7-JNSAR-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


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
