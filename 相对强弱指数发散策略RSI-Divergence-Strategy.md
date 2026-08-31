
> Name

相对强弱指数发散策略RSI-Divergence-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fb2fd01fb79f1d19a4.png)

## Overview  

The RSI Divergence strategy utilizes the Relative Strength Index (RSI) to identify potential price reversals by spotting divergences between price movements and RSI trends. It focuses on:  

Bullish Divergence: Occurs when price hits a new low while RSI does not, signaling weakening downward momentum and potential upward reversal.  

Bearish Divergence: Happens when price makes a new high while RSI does not, indicating decreasing upward momentum and potential downward reversal.  

This strategy combines overbought and oversold RSI levels to optimize entry and exit points, aiming to capture market reversals for improved trading accuracy and profitability. Suitable for various trading instruments, it's a valuable tool for traders aiming to buy lows and sell highs in fluctuating markets.

## Strategy Logic  

The RSI Divergence strategy is based on the following key judgments:  

1. Calculate RSI Value: Compute RSI in the range of 0-100 based on average gain and average loss over a specific period.  

2. Identify Overbought/Oversold: RSI above overbought level (e.g. 70) indicates overbought; RSI below oversold level (e.g. 30) indicates oversold.   

3. Detect Divergence: Check if latest price movement is consistent with RSI movement. If price makes new high/low but RSI does not, it shows divergence.  

4. Combine Entry/Exit: Bullish divergence with oversold RSI signals long entry. Bearish divergence with overbought RSI signals short entry.  

5. Set Profit Target/Stop Loss: Close position for profit when RSI re-enters overbought/oversold zone.

By comparing price fluctuation and RSI change to gauge market strength, the strategy aims to profit from market inefficiency.  

## Advantages

The RSI Divergence Strategy has the following pros:

1. Capture Reversals: Excellent in detecting divergences between price and RSI to identify exhaustion reversals.  

2. Optimize with Overbought/Oversold Levels: Combining intrinsic overbought/oversold in RSI helps fine tune entries and exits.   

3. Simple and Easy to Implement: Relatively simple logic and parameter settings make this strategy intuitive to understand and implement.  

4. Wide Versatility: Applicable to a variety of products like CFDs, crypto and stocks for broad adoption.  

5. Boost Profitability: The systematic approach results in lower drawdowns for stable long term returns.  

## Risks

The RSI Divergence Strategy also bears the following risks:  

1. False Signal Risks: Divergences do not certainly reverse or sustain - risk of acting on false signals.  

2. Parameter Optimization Difficulties: Results are sensitive to RSI period, overbought/oversold levels etc requiring rigorous testing.  

3. Exceptional Market Conditions: Strategy tends to fail when markets spike irregularly or the setup is overused.  

4. Lagging Indicator: Technical indicators like RSI are generally lagging and unable to precisely determine reversal points.  

Strict risk control, adaptive parameters and combined analysis with other factors can mitigate the risks to some extent.   

## Enhancement Opportunities

The RSI Divergence strategy can be further optimized via:   

1. Testing RSI Input Values: Backtest different RSI lookback periods to find ideal parameters.  

2. Combining Other Indicators: Adding confluence from MACD, KD etc improves signal accuracy.  

3. More Stop Loss Techniques: Complement exiting profit target stop loss with methods like moving average envelope stop loss.  

4. Wider Products Adaptability: Tweak parameters for better strategy alignment with more product types like commodities.  

5. Applying Deep Learning: Use Deep Learning models like RNNs to judge RSI divergences and forecast prices.  

## Conclusion  

The RSI Divergence captures mean-reverting opportunities by comparing price dynamics against RSI flows. The simple robust strategy works across asset classes for scalable short term reversals and excess returns. But its efficacy also carries inherent limitations requiring constant iterations for market adaptability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSI Length|
|v_input_2|70|Overbought Level|
|v_input_3|30|Oversold Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-13 00:00:00
end: 2024-02-20 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI Divergence Strategy", overlay=true)

// RSI Parameters
rsiLength = input(14, "RSI Length")
overboughtLevel = input(70, "Overbought Level")
oversoldLevel = input(30, "Oversold Level")
rsiValue = ta.rsi(close, rsiLength)

// Divergence detection
priceLow = ta.lowest(low, rsiLength)
priceHigh = ta.highest(high, rsiLength)
rsiLow = ta.lowest(rsiValue, rsiLength)
rsiHigh = ta.highest(rsiValue, rsiLength)

bullishDivergence = low < priceLow[1] and rsiValue > rsiLow[1]
bearishDivergence = high > priceHigh[1] and rsiValue < rsiHigh[1]

// Strategy Conditions
longEntry = bullishDivergence and rsiValue < oversoldLevel
longExit = rsiValue > overboughtLevel
shortEntry = bearishDivergence and rsiValue > overboughtLevel
shortExit = rsiValue < oversoldLevel

// ENTER_LONG Condition
if (longEntry)
    strategy.entry("Long Entry", strategy.long)

// EXIT_LONG Condition
if (longExit)
    strategy.close("Long Entry")

// ENTER_SHORT Condition
if (shortEntry)
    strategy.entry("Short Entry", strategy.short)

// EXIT_SHORT Condition
if (shortExit)
    strategy.close("Short Entry")

```

> Detail

https://www.fmz.com/strategy/442346

> Last Modified

2024-02-21 11:43:24
