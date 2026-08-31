
> Name

Two-Stage-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b61de209aea886e071.png)

## Overview

This strategy makes trading decisions based on the percentage change from the 5-minute opening price at 2:00 AM each day, using a two-stage breakout to set different trigger conditions, aiming to capture significant price movements in ranging markets.

## Strategy Logic

The strategy calculates the percentage change of the current 5-minute candle based on its open price compared to the opening price of the 5-minute candle at 2:00 AM everyday. When the percentage change exceeds the first-stage breakout threshold, corresponding buy or sell decisions are made. Stop loss and take profit levels are also set to close positions.  

If the stop loss is triggered, when the percentage change continues to expand and exceeds the second-stage trigger condition, previous orders will be cancelled and new buy or sell orders using the second-stage threshold will be placed, with stop loss and take profit continuing to be tracked.

The two-stage breakout setup filters out some noise during ranging markets, only making trades on more significant price movements. Activating the second stage can reduce situations where the stop loss is triggered too frequently. 

## Advantages

- The two-stage breakout with different trigger conditions effectively filters out noise in ranging markets, only trading on larger price swings
- Activating the second stage avoids stop loss being triggered too frequently 
- Calculating percentage change from the opening price utilizes new trends after market open each day
- Simple and clear strategy logic, easy to understand and implement

## Risks and Mitigations

- High volatility may trigger frequent opening and closing of positions, increasing trading costs
- Setting the second stage too high may miss good trading opportunities 
- Setting the stages too low may trigger unnecessary extra trades

Mitigations:

- Optimize parameters to find the best balance
- Limit max number of trades per day to avoid over-trading
- Use more aggressive parameters during obvious trends

## Enhancement Opportunities

- Optimize values for the two breakout stages to find best combination
- Research optimal parameters for different products and time periods
- Incorporate trend indicator to use more aggressive settings during strong trends 
- Limit daily max trades to prevent over-trading
- Optimize stop loss and take profit points for better risk-reward

## Summary

This strategy captures price spikes using a two-stage breakout in ranging markets, filtering out noise effectively. The concept is simple and clear, and can achieve good results through parameter optimization. Next step is to combine with trend indicators to maximize performance during trending markets. Overall this is a novel strategy that makes good use of breakout principles, and can achieve solid results after tuning.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|200|Stop Loss Pips|
|v_input_int_2|400|Take Profit Pips|
|v_input_float_1|0.25|Percentage Change Trigger (%)|
|v_input_float_2|0.35|Additional Trigger Percentage (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Auto Entry Bot", overlay=true)

// Define input for the stop loss and take profit levels
stopLossPips = input.int(200, title="Stop Loss Pips", minval=1)
takeProfitPips = input.int(400, title="Take Profit Pips", minval=1)

// Calculate the percentage change from the 5-minute opening candle at 2:00 AM
var float openPrice = na
if (hour == 2 and minute == 0)
    openPrice := open
percentageChange = (close - openPrice) / openPrice * 100

// Track the cumulative percentage change
var float cumulativeChange = 0

// Define input for the percentage change trigger
triggerPercentage1 = input.float(0.25, title="Percentage Change Trigger (%)", minval=0.01, step=0.01)
triggerPercentage2 = input.float(0.35, title="Additional Trigger Percentage (%)", minval=0.01, step=0.01)

// Check for price change trigger
if (percentageChange >= triggerPercentage1)
    // Sell signal
    strategy.entry("Sell", strategy.short)
    strategy.exit("ExitSell", loss=stopLossPips, profit=takeProfitPips)
    cumulativeChange := 0  // Reset cumulative change after a trade

if (percentageChange <= -triggerPercentage1)
    // Buy signal
    strategy.entry("Buy", strategy.long)
    strategy.exit("ExitBuy", loss=stopLossPips, profit=takeProfitPips)
    cumulativeChange := 0  // Reset cumulative change after a trade

// If the price keeps hitting stop loss, activate the second trigger
if (strategy.position_size < 0 and percentageChange <= -triggerPercentage2)
    strategy.cancel("Sell")  // Cancel previous sell order
    strategy.entry("Sell2", strategy.short)
    strategy.exit("ExitSell2", loss=stopLossPips, profit=takeProfitPips)
    cumulativeChange := 0  // Reset cumulative change after a trade

if (strategy.position_size > 0 and percentageChange >= triggerPercentage2)
    strategy.cancel("Buy")  // Cancel previous buy order
    strategy.entry("Buy2", strategy.long)
    strategy.exit("ExitBuy2", loss=stopLossPips, profit=takeProfitPips)
    cumulativeChange := 0  // Reset cumulative change after a trade

```

> Detail

https://www.fmz.com/strategy/430872

> Last Modified

2023-11-02 15:58:29
