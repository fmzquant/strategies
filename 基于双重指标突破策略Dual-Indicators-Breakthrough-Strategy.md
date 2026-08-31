
> Name

基于双重指标突破策略Dual-Indicators-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1438193fceb1eae339a.png)

## Overview

The dual indicators breakthrough strategy combines the RSI indicator and the closing price indicator to achieve low buying and high selling for trading. This strategy is simple and practical with low pullback risk and is suitable for medium and long term holds.  

## Strategy Principle  

The strategy is mainly based on the following two indicators for judgment:  

1. RSI indicator: go long when RSI2 is less than 15.  
2. Previous day's closing price: close the position when today's closing price is higher than yesterday's highest price.  

The entry condition is oversold RSI, indicating that the stock is highly undervalued and has a strong reversal potential. The exit condition is that the closing price breaks through the highest price of the previous day, indicating that the stock is entering a bullish trend and profits should be taken appropriately.  

## Advantage Analysis   

The dual indicator breakthrough strategy has the following advantages:  

1. The strategy operation is simple and easy to implement.  
2. False signals can be effectively controlled based on dual indicators.   
3. RSI indicator has large parameter optimization space for adjustment to optimal state.
4. Track medium and long term trends with low pullback risk.  
5. Widely applicable to large and medium caps with good practical results.   

## Risk Analysis   

The strategy also has some risks:  

1. Excessive fluctuations in individual stocks require RSI parameter adjustments. 
2. Expect short-term pullbacks in uptrends.  
3. Breakthrough amplitude of previous day's highest price needs evaluation of reasonableness.   

The above risks can be avoided through optimization of RSI parameters, evaluation of market conditions, and use of other indicators for judgment.   

## Optimization Directions   

The main optimization directions of this strategy are focused on the following aspects:  

1. Evaluate the effect of RSI indicators of different cycles. 
2. Test combinations of closing prices with other price indicators.  
3. Increase stop loss mechanisms, such as re-entry after a period of exit.  
4. Evaluate the reliability of entry signals in combination with trading volume changes.   
5. Automatically optimize parameters using machine learning algorithms.   

## Summary  

In general, the dual indicator breakthrough strategy is a very useful quantitative strategy. The strategy is simple to operate with low pullback risks. Through parameter optimization and rule refinement, it can become an intelligent and stable quantitative program. If implemented effectively, it can provide us with good medium and long term trading opportunities.  




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © hobbiecode

// If RSI(2) is less than 15, then enter at the close.
// Exit on close if today’s close is higher than yesterday’s high.

//@version=5
strategy("Hobbiecode - RSI + Close previous day", overlay=true)

// RSI parameters
rsi_period = 2
rsi_lower = 15

// Calculate RSI
rsi_val = ta.rsi(close, rsi_period)

// Check if RSI is lower than the defined threshold
if (rsi_val < rsi_lower)
    strategy.entry("Buy", strategy.long)

// Check if today's close is higher than yesterday's high
if (strategy.position_size > 0 and close > ta.highest(high[1], 1))
    strategy.close("Buy")

// Plot RSI on chart
plot(rsi_val, title="RSI", color=color.red)
hline(rsi_lower, title="Oversold Level", color=color.blue)


```

> Detail

https://www.fmz.com/strategy/439989

> Last Modified

2024-01-25 15:39:06
