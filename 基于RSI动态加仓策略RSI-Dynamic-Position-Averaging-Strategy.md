
> Name

基于RSI动态加仓策略RSI-Dynamic-Position-Averaging-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/83517f5bd3bd11440a.png)

## Overview
This strategy combines Relative Strength Index (RSI) and martingale position averaging principles. It initiates a long position when RSI goes below the oversold line, and doubles down the position if the price continues to decline. Profit taking is achieved with small targets. This strategy is suitable for high market cap coins in spot trading for steady gains.

## Strategy Logic  
1. Use RSI indicator to identify market oversold conditions, with RSI period set to 14 and oversold threshold set to 30.
2. Initiate first long position with 5% of account equity when RSI < 30. 
3. If price declines 0.5% from the initial entry price, double the position size to average down. If price declines further, quadruple the position size to average down again.
4. Take profit at 0.5% increment each time.  
5. Repeat the cycle.

## Advantage Analysis
- Identify market oversold conditions with RSI for good entry points.
- Martingale position averaging brings down average entry price.  
- Small profit taking allows for consistent gains.
- Suitable for high market cap coins spot trading for controlled risks.

## Risk Analysis
- Prolonged market downturn can lead to heavy losses.
- No stop loss means unlimited downside.
- Too many averaging downs increases loss.   
- Still has inherent long direction risks.

## Optimization Directions
1. Incorporate stop loss to limit max loss.
2. Optimize RSI parameters to find best overbought/oversold signals.  
3. Set reasonable profit taking range based on specific coin volatility.
4. Determine averaging pace based on total assets or position sizing rules.  

## Summary
This strategy combines RSI indicator and martingale position averaging to take advantage of oversold situations with appropriate averaging down, and small profit taking for steady gains. It has risks that can be reduced through stop losses, parameter tuning, etc.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSI Length|
|v_input_2|30|Oversold Threshold|
|v_input_3|0.5|Profit Target (%)|
|v_input_4|5|Initial Investment % of Equity|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-06 00:00:00
end: 2024-02-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Stavolt

//@version=5
strategy("RSI Martingale Strategy", overlay=true, default_qty_type=strategy.cash, currency=currency.USD)

// Inputs
rsiLength = input(14, title="RSI Length")
oversoldThreshold = input(30, title="Oversold Threshold") // Keeping RSI threshold
profitTargetPercent = input(0.5, title="Profit Target (%)") / 100
initialInvestmentPercent = input(5, title="Initial Investment % of Equity")

// Calculating RSI
rsiValue = ta.rsi(close, rsiLength)

// State variables for tracking the initial entry
var float initialEntryPrice = na
var int multiplier = 1

// Entry condition based on RSI
if (rsiValue < oversoldThreshold and na(initialEntryPrice))
    initialEntryPrice := close
    strategy.entry("Initial Buy", strategy.long, qty=(strategy.equity * initialInvestmentPercent / 100) / close)
    multiplier := 1

// Adjusting for errors and simplifying the Martingale logic
// Note: This section simplifies the aggressive position size adjustments without loops
if (not na(initialEntryPrice))
    if (close < initialEntryPrice * 0.995) // 0.5% drop from initial entry
        strategy.entry("Martingale Buy 1", strategy.long, qty=((strategy.equity * initialInvestmentPercent / 100) / close) * 2)
        multiplier := 2 // Adjusting multiplier for the next potential entry

    if (close < initialEntryPrice * 0.990) // Further drop
        strategy.entry("Martingale Buy 2", strategy.long, qty=((strategy.equity * initialInvestmentPercent / 100) / close) * 4)
        multiplier := 4

    // Additional conditional entries could follow the same pattern

// Checking for profit target to close positions
if (strategy.position_size > 0 and (close - strategy.position_avg_price) / strategy.position_avg_price >= profitTargetPercent)
    strategy.close_all(comment="Take Profit")
    initialEntryPrice := na // Reset for next cycle

```

> Detail

https://www.fmz.com/strategy/441137

> Last Modified

2024-02-06 09:44:05
