
> Name

FNGU-Quantitative-Trading-Strategy-Based-on-Bollinger-Bands-and-RSI

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/125edaab2fed0d40a10.png)

## Overview 

This strategy is called "FNGU Quantitative Trading Strategy Based on Bollinger Bands and RSI". It is a long-only strategy designed specifically for the FNGU stock. The strategy mainly uses Bollinger Bands and RSI indicators to identify overbought and oversold conditions of the stock to generate buy and sell signals.

## Strategy Logic

The core logic of this strategy is based on the combination of Bollinger Bands and RSI indicators.  

Firstly, Bollinger Bands contain three lines: middle line, upper line and lower line. The middle line is the n-day simple moving average, while the upper line and lower line are k times standard deviation above and below the middle line. When price reaches or touches the upper or lower line, it indicates the stock is in overbought or oversold status.

In this strategy, the period length of Bollinger Bands middle line is 235 days, and the parameter k value is 2. It generates buy signals when price falls below the Bollinger lower line or crosses above the middle line, and sell signals when price rises above the Bollinger upper line.

Secondly, RSI indicator reflects the overbought/oversold level of a stock. RSI above 70 suggests overbought status, while below 30 oversold status. The parameter period length for RSI in this strategy is 2.

In this strategy, Bollinger Bands and RSI indicators are used together: Buy signals are generated when RSI breaks through oversold level while price touches or falls below the Bollinger lower line. Sell signals are generated when RSI breaks down from overbought level while price rises above Bollinger upper line.

## Advantages of the Strategy

This strategy has the following advantages:

1. Combining Bollinger Bands and RSI makes buy/sell signals more accurate and reliable.  
2. Bollinger Bands identify overbought/oversold price zones, while RSI filters fake signals. The two complement each other.
3. It only conducts long trading, no need to consider shorting risks.
4. Optimized parameters make it suitable specifically for the highly volatile FNGU stock.  
5. It implements automated stop loss to lower loss risks.
6. The coding realization is simple and clear, easy to understand and modify.

## Risks and Solutions

There are also some risks associated with this strategy:

1. Both Bollinger Bands and RSI may generate fake signals, easily leading to overfitting. Parameters can be adjusted or more filters added.
2. FNGU itself has high volatility. Improper stop loss setting may increase losses. Stop loss range should be broadened. 
3. The strategy only applies to highly volatile stocks like FNGU instead of others. Parameters need adjustment for different stocks.  
4. Though optimized, parameters may become outdated with market changes, requiring ongoing monitor and optimization.

## Directions for Strategy Optimization 

There are several directions to further optimize this strategy:

1. Add other technical indicators like KDJ and MACD to produce more accurate signals.
2. Optimize parameters of Bollinger Bands and RSI to adapt more stock types.  
3. Incorporate machine learning models to aid decision making with more data.
4. Implement inter-periodic trading utilizing higher time frame data.
5. Combine sentiment analysis using social media data to generate trading signals. 
6. Develop quantitative backtesting system to quickly test different parameter settings.

## Conclusion

This is a long-only strategy particularly suitable for highly volatile stocks such as FNGU. By combining Bollinger Bands and RSI, it generates trading signals around overbought/oversold price levels, aiming to capture price reversal opportunities. There is still large room for optimization to expand its applicability and enhance performance.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|RSI Period Length|
|v_input_2|235|Bollinger Period Length|
|v_input_3|20|EMA Period Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-29 00:00:00
end: 2024-01-28 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Bollinger + RSI + EMA, Double Strategy Long-Only (by EMKM)", shorttitle="1Min Killer", overlay=true)

///////////// RSI
RSIlength = input(2, title="RSI Period Length") // Adjusted RSI period length
RSIoverSold = 50
RSIoverBought = 50
price = close
vrsi = rsi(price, RSIlength)

///////////// Bollinger Bands
BBlength = input(235, minval=1, title="Bollinger Period Length") // Adjusted Bollinger period length
BBmult = 2
BBbasis = sma(price, BBlength)
BBdev = BBmult * stdev(price, BBlength)
BBupper = BBbasis + BBdev
BBlower = BBbasis - BBdev
BBtarget38 = BBbasis + 0.38 * BBdev  // Line at 38% of Bollinger Band width
BBtarget50 = BBbasis + 0.50 * BBdev  // Line at 50% of Bollinger Band width

///////////// EMA
emaLength = input(20, title="EMA Period Length")
ema = ema(close, emaLength)

source = close
buyEntry = crossover(source, BBlower) or (close < BBlower and close > BBbasis) or (low < BBlower and close > BBbasis) // Add condition for low touching Bollinger Band
sellEntry = crossunder(source, BBupper)

///////////// Plotting
plot(BBbasis, color=color.aqua, title="Bollinger Bands SMA Basis Line")
plot(BBupper, color=color.silver, title="Bollinger Bands Upper Line")
plot(BBlower, color=color.silver, title="Bollinger Bands Lower Line")
plot(BBtarget38, color=color.blue, linewidth=2, title="SMA at 38% of BB width")  // Line at 38%
plot(BBtarget50, color=color.green, linewidth=2, title="SMA at 50% of BB width")  // Line at 50%
plot(ema, color=color.orange, title="EMA")  // Plot EMA

///////////// RSI + Bollinger Bands Strategy
longCondition = crossover(vrsi, RSIoverSold) and buyEntry
sellCondition = crossunder(vrsi, RSIoverBought) and close > BBupper

close_long = close > BBbasis
close_short = close < BBbasis

if (not na(vrsi))
    if longCondition
        strategy.entry("Buy", strategy.long, qty=10, stop=BBlower, comment="Buy")
    else
        strategy.cancel(id="Buy")
        
    if close_long
        strategy.close("Buy")

if (sellCondition)
    strategy.entry("Sell", strategy.short, qty=10, stop=BBupper, comment="Sell")
else
    strategy.cancel(id="Sell")

if close_short
    strategy.close("Sell")

```

> Detail

https://www.fmz.com/strategy/440340

> Last Modified

2024-01-29 14:53:47
