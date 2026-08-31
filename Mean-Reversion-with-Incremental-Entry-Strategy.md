
> Name

Mean-Reversion-with-Incremental-Entry-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d4d55de4742fc476d7.png)

## Overview

The Mean Reversion with Incremental Entry strategy designed by HedgerLabs is an advanced trading strategy script focusing on the mean reversion technique in financial markets. It is tailored for traders who prefer a systematic approach with emphasis on incremental entries based on price movements relative to a moving average.

## Strategy Logic

Central to this strategy is the Simple Moving Average (SMA) which all entries and exits revolve around. Traders can customize the MA length to suit different trading styles and timeframes.  

Unique to this strategy is the incremental entry system. It initiates a first position when the price deviates from the MA by a specified percentage. Subsequent entries are then made in incremental steps, as defined by the trader, as the price moves further away from the MA. This aims to capitalize on increasing volatility.

The strategy intelligently manages positions by entering long when price is below MA and short when above to adapt to changing market conditions.  

Exits are determined when the price touches the MA, with the goal of closing positions at potential reversal points for optimized outcomes.

With calc_on_every_tick enabled, the strategy continually evaluates the market to ensure prompt reaction.  

## Advantage Analysis   

The Mean Reversion with Incremental Entry strategy has the following key advantages:

1. Highly systematized to reduce emotional interference 
2. Incremental entry captures greater profit during high volatility
3. Customizable parameters like MA period suit different instruments  
4. Intelligent position management automatically adapts long/short  
5. Optimal exit targeting reversals to close positions

## Risk Analysis

The risks to consider include:

1. Whipsaws from technical indicator reliance  
2. Trendlessness causing extended drawdowns
3. Poor MA settings lead to frequent stop outs
4. Larger position size from incremental entry  

Exits can be optimized, trend filters added, position sizing reduced to mitigate the above risks.

## Enhancement Opportunities

The strategy can be enhanced by:

1. Adding trend filters to avoid unfavorable trades
2. Optimizing entry increments with volatility  
3. Incorporating trailing stops to lock in profits
4. Experimenting with different moving averages  
5. Using filters to reduce false signals  

## Conclusion

The Mean Reversion with Incremental Entry strategy focuses on mean reversion techniques using a systemized incremental position sizing approach. With customizable settings, it is adaptable across different trading instruments. It performs well in ranging markets and suits short-term systematic traders.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|30|MA Length|
|v_input_float_1|5|Initial Percent for First Order|
|v_input_float_2|true|Percent Step for Additional Orders|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-29 00:00:00
end: 2024-01-28 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Mean Reversion with Incremental Entry by HedgerLabs", overlay=true, calc_on_every_tick=true)

// Input for adjustable settings
maLength = input.int(30, title="MA Length", minval=1)
initialPercent = input.float(5, title="Initial Percent for First Order", minval=0.01, step=0.01)
percentStep = input.float(1, title="Percent Step for Additional Orders", minval=0.01, step=0.01)

// Calculating Moving Average
ma = ta.sma(close, maLength)

// Plotting the Moving Average
plot(ma, "Moving Average", color=color.blue)

var float lastBuyPrice = na
var float lastSellPrice = na

// Function to calculate absolute price percentage difference
pricePercentDiff(price1, price2) =>
    diff = math.abs(price1 - price2) / price2 * 100
    diff

// Initial Entry Condition Check Function
initialEntryCondition(price, ma, initialPercent) =>
    pricePercentDiff(price, ma) >= initialPercent

// Enhanced Entry Logic for Buy and Sell
if (low < ma)
    if (na(lastBuyPrice))
        if (initialEntryCondition(low, ma, initialPercent))
            strategy.entry("Buy", strategy.long)
            lastBuyPrice := low
    else
        if (low < lastBuyPrice and pricePercentDiff(low, lastBuyPrice) >= percentStep)
            strategy.entry("Buy", strategy.long)
            lastBuyPrice := low

if (high > ma)
    if (na(lastSellPrice))
        if (initialEntryCondition(high, ma, initialPercent))
            strategy.entry("Sell", strategy.short)
            lastSellPrice := high
    else
        if (high > lastSellPrice and pricePercentDiff(high, lastSellPrice) >= percentStep)
            strategy.entry("Sell", strategy.short)
            lastSellPrice := high

// Exit Conditions - Close position if price touches the MA
if (close >= ma and strategy.position_size > 0)
    strategy.close("Buy")
    lastBuyPrice := na

if (close <= ma and strategy.position_size < 0)
    strategy.close("Sell")
    lastSellPrice := na

// Reset last order price when position is closed
if (strategy.position_size == 0)
    lastBuyPrice := na
    lastSellPrice := na

```

> Detail

https://www.fmz.com/strategy/440358

> Last Modified

2024-01-29 15:47:24
