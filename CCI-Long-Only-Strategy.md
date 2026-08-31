
> Name

CCI-Long-Only-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18f7b1a0954ba1563ec.png)
 

## Overview  

This strategy designs a long only trading strategy based on the CCI indicator. It generates buy signals when CCI is above 100 and closes long positions when CCI drops below -100. The strategy effectively prevents shorting by only allowing closing of long positions.

## Strategy Logic

The CCI indicator is a trending oscillator that measures the deviation of current price from the typical price over a period. CCI above 100 suggests overbought conditions while CCI below -100 suggests oversold conditions.

The trading logic is to go long when CCI crosses above 100 and close the long position when CCI subsequently drops below -100. Additionally, the strategy only allows position closing to prevent short positions, effectively controlling risks.

## Advantage Analysis  

- Utilizes mature CCI techniques to identify overbought/oversold areas
- Prevents short side risks by only going long  
- Customizable CCI parameters for optimization across products
- Simple logic easy to understand and implement

## Risk Analysis

- CCI results sensitive to different parameters
- Need to incorporate more factors when taking CCI signals to avoid false signals  
- Missing short side trading opportunities
- Vulnerable to price shocks from events

## Optimization Directions

- Optimize CCI parameters for different products
- Add filters with more indicators to improve accuracy 
- Incorporate stop loss strategy to limit losses
- Allow reopened signals for re-entry
- Allow measured short side trading to increase profits

## Summary

The strategy identifies overbought/oversold areas with CCI for long only trading. The concept is mature and easy to implement but has risks around parameter optimization, signal filters, stops etc. With continuous improvements, it can become a robust long term trading strategy choice.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|CCI Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-12-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("CCI Long Only Strategy", overlay=true)

// Input for CCI period
cciPeriod = input(14, title="CCI Period")

// Calculate CCI
cciValue = ta.cci(close, cciPeriod)

// Initialize variables to track last signals
var bool lastBuySignal = na
var bool lastSellSignal = na

// Buy condition
buyCondition = cciValue > 100 and na(lastBuySignal)

// Sell condition
sellCondition = cciValue < -100 and na(lastSellSignal)

// Update last signals
lastBuySignal := buyCondition ? true : na
lastSellSignal := sellCondition ? true : na

// Execute Buy and Sell orders
strategy.entry("Buy", strategy.long, when = buyCondition)
strategy.close("Buy", when = sellCondition)

// Plot CCI for reference
plot(cciValue, title="CCI", color=color.blue)
```

> Detail

https://www.fmz.com/strategy/435724

> Last Modified

2023-12-18 12:32:07
