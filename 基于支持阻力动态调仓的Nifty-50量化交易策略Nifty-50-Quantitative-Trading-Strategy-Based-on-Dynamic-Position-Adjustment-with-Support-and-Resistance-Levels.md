
> Name

基于支持阻力动态调仓的Nifty-50量化交易策略Nifty-50-Quantitative-Trading-Strategy-Based-on-Dynamic-Position-Adjustment-with-Support-and-Resistance-Levels

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1209cdd3a4654be6e5c.png)

## Overview

This is a high-frequency quantitative trading strategy based on the Nifty 50 index. It tracks the price changes of the Nifty 50 index and combines the open interest change to take long positions near support levels and short positions near resistance levels for profit.

## Strategy Principle 

The strategy first obtains the open interest change of the Nifty 50 index. Then it will generate buy and sell signals based on the set support and resistance levels, as well as the threshold values of the open interest change magnitude. Specifically:

1. When the index price is close to the support level, and the open interest change exceeds the set buy threshold, a buy signal is generated
2. When the index price is close to the resistance level, and the open interest change is below the set sell threshold, a sell signal is generated

In this way, long positions can be taken near support levels, and short positions can be taken near resistance levels, to profit.

## Advantage Analysis

The strategy has the following advantages:

1. High operation frequency, can capture short-term price fluctuations, large profit space
2. Use open interest information to assist in decision making, can more accurately judge market sentiment
3. Support dynamic position adjustment, can respond flexibly according to market conditions
4. Simple and easy to understand, parameter adjustment is also relatively convenient
5. Strong scalability, can consider incorporating machine learning algorithms to further optimize

## Risk Analysis

The strategy also has some risks:

1. Slippage risk caused by high-frequency trading. Trading frequency can be reduced by appropriately relaxing buy and sell conditions.
2. Improper setting of support and resistance levels may miss trading opportunities or increase losses. Parameters should be evaluated and adjusted regularly.
3. Open interest information has lag, signal generation may be inaccurate. Multi-factor models can be considered.  
4. Backtest period is too short, may overestimate strategy returns. Strategy robustness should be verified under longer backtest periods.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Add stop loss logic to effectively control single loss
2. Set dynamic trading signals based on indicators like volatility and volume
3. Incorporate machine learning algorithms to achieve automatic parameter optimization and adjustment 
4. Expand multi-species trading, portfolio of stock index futures and stock selection  
5. Increase quantitative risk control module to better manage overall tail risk

## Conclusion

This is a simple and efficient quantitative trading strategy based on the Nifty 50. It has advantages like high operation frequency, use of open interest information, supports dynamic position adjustment, and also has room for improvement. Overall, the strategy lays a solid foundation for building a multi-factor, automated, and intelligent quantitative trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|NIFTY50|Nifty 50 Symbol|
|v_input_2|14|Open Interest Length|
|v_input_3|15000|Support Level|
|v_input_4|16000|Resistance Level|
|v_input_5|true|Buy Threshold|
|v_input_6|-1|Sell Threshold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Intraday Nifty 50 Bottom Buying and Selling with OI Strategy", overlay=true)

// Input parameters
niftySymbol = input("NIFTY50", title="Nifty 50 Symbol")
oiLength = input(14, title="Open Interest Length")
supportLevel = input(15000, title="Support Level")
resistanceLevel = input(16000, title="Resistance Level")
buyThreshold = input(1, title="Buy Threshold")
sellThreshold = input(-1, title="Sell Threshold")

// Fetch Nifty 50 open interest
oi = request.security(niftySymbol, "D", close)

// Calculate open interest change
oiChange = oi - ta.sma(oi, oiLength)

// Plot support and resistance levels
plot(supportLevel, color=color.green, title="Support Level")
plot(resistanceLevel, color=color.red, title="Resistance Level")

// Plot open interest and open interest change
plot(oi, color=color.blue, title="Open Interest")
plot(oiChange, color=color.green, title="Open Interest Change")

// Trading logic
buySignal = close < supportLevel and oiChange > buyThreshold
sellSignal = close > resistanceLevel and oiChange < sellThreshold

// Execute trades
strategy.entry("Buy", strategy.long, when=buySignal)
strategy.entry("Sell", strategy.short, when=sellSignal)

```

> Detail

https://www.fmz.com/strategy/442525

> Last Modified

2024-02-22 15:57:28
