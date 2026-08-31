
> Name

高量能突破复利仓位策略High-Volume-Low-Breakout-Compounded-Position-Sizing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1afe95bfefdeda3639e.png)

### Overview

The core idea of this strategy is to track breakouts during high trading volume by using a compounded position sizing approach based on a defined risk percentage and 250x simulated leverage. It aims to capture potential reversal opportunities after heavy selling pressure.

### Strategy Logic

Long entry signals are triggered when:

1. Volume exceeds a user-defined threshold (volThreshold) 
2. The current bar's low is lower than the previous bar's low (lowLowerThanPrevBar)
3. The current bar's close is negative but higher than the previous bar's close (negativeCloseWithHighVolume)  
4. There is no existing open long position (strategy.position_size == 0)

Position sizing is calculated as:  

1. Risk amount based on equity * risk percentage 
2. Risk amount * leverage (250x) to determine number of contracts/lots

Exit rules:

Close long position when profit percentage posProfitPct hits stop loss (-0.14%) or take profit (4.55%).

### Advantage Analysis  

Advantages of this strategy:

1. Captures trend reversal opportunities from high trading volume  
2. Compounded position sizing allows for faster profit growth
3. Reasonable stop loss and take profit helps control risk

### Risk Analysis

Risks to consider:

1. 250x leverage amplifies losses
2. Does not account for slippage, commissions, margin requirements
3. Requires robust backtesting and parameter optimization 

Risk can be reduced by:

1. Lowering leverage amount  
2. Increasing stop loss percentage
3. Accounting for real-world trading costs

### Optimization Opportunities

Areas for improvement:

1. Dynamically adjust leverage level
2. Optimize stop loss and take profit rules  
3. Add trend filter 
4. Customize parameters based on instrument  

### Conclusion

In summary, this is a fairly simple and straightforward strategy for capturing reversals and outsized gains. But risks exist and prudent real-world testing is essential. With optimization, it can be made more robust and practical.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|250|Volume Threshold|
|v_input_float_1|10|Risk Percentage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-11 00:00:00
end: 2024-02-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("High Volume Low Breakout (Compounded Position Size)", overlay=true, initial_capital=1000)

// Define input for volume threshold
volThreshold = input.int(250, "Volume Threshold")

// Define input for risk per trade as a percentage of total equity
riskPercentage = input.float(10, "Risk Percentage")

// Calculate volume
vol = volume

// Check for high volume and low lower than the previous bar
highVolume = vol > volThreshold
lowLowerThanPrevBar = low < low[1]

// Calculate position profit percentage
posProfitPct = 100 * (close - strategy.position_avg_price) / strategy.position_avg_price

// Calculate the position size based on risk percentage and total account equity
equity = strategy.equity
riskAmount = (equity * riskPercentage / 100) / (close - strategy.position_avg_price)

// Calculate leverage (250x in this case)
leverage = 250

// Calculate the position size in contracts/lots to trade
positionSize = riskAmount * leverage

// Check if the current bar's close is negative when it has high volume
negativeCloseWithHighVolume = highVolume and close < close[1]

// Enter long position as soon as volume exceeds the threshold, low is lower than the previous bar, and the current bar's close is negative
if highVolume and lowLowerThanPrevBar and negativeCloseWithHighVolume and strategy.position_size == 0
    strategy.entry("Long", strategy.long, qty=positionSize, comment="Long Entry")

// Exit long position intrabar if profit goes below -0.14% or above 1%
if strategy.position_size > 0
    if posProfitPct < -0.14 or posProfitPct > 4.55
        strategy.close("Long")

```

> Detail

https://www.fmz.com/strategy/442008

> Last Modified

2024-02-18 15:43:02
