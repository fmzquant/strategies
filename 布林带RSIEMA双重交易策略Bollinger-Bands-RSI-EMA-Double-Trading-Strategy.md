
> Name

布林带RSIEMA双重交易策略Bollinger-Bands-RSI-EMA-Double-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ae64bea977e1054e22.png)

### Overview

This strategy integrates Bollinger Bands, Relative Strength Index (RSI) and Exponential Moving Average (EMA) three indicators to implement an automatic trading strategy with long holding periods for stocks. It generates buy signals when RSI is below oversold line and price is close to or touches the Bollinger Bands lower rail, and generates sell signals when price rises to touch the Bollinger Bands upper rail, utilizing Bollinger Bands to determine market trends and overbought/oversold status for double confirmation.

### Strategy Principle 

This strategy mainly judges based on Bollinger Bands, RSI and EMA three indicators. The middle rail in Bollinger Bands is the simple moving average of price, and the upper and lower rails are two standard deviation ranges of price. Bollinger Bands can judge the overbought/oversold status of the market. When price is close to the lower rail, it indicates oversold status, and when price is close to the upper rail, it indicates overbought status. RSI is one of the important indicators to judge whether a stock is overbought or oversold. RSI below 30 indicates oversold status and RSI above 70 indicates overbought status. EMA is the exponential weighted moving average of price and can determine price trend.

The buy signal for this strategy is generated when RSI is below the 30 oversold line, and at the same time price has approached or touched the Bollinger Bands lower rail in oversold status. This avoids false signals.  

The sell signal is generated when price touches the Bollinger Bands upper rail during an uptrend. This utilizes Bollinger Bands to determine overbought status and sells for profit taking.

### Advantages of the Strategy

1. Integrates Bollinger Bands and RSI to double confirm overbought/oversold status, avoiding false signals.  
2. Utilizes EMA to determine price trend direction, avoiding trading against the trend.
3. Parameters for both RSI and Bollinger Bands can be customized for different stocks.  
4. Simple and clear strategy logic, easy to understand and implement.

### Risks of the Strategy

1. Both Bollinger Bands and RSI may generate false signals, causing wrong entries.  
2. Stop loss position needs further optimization, with higher retracement risks.
3. EMA may fail to perfectly determine trend with missed trend reversal points. 
4. Inappropriate parameter settings may lead to over-trading or missing trading opportunities.

Solutions:

1. Shorten Bollinger Bands period, optimize RSI parameters.
2. Dynamic trailing stop loss.
3. Integrate other indicators for trend determination. 
4. Test different parameter settings to find optimum combination.

### Directions for Strategy Optimization

The strategy can be further optimized in the following aspects:

1. Add more indicators for judgement, e.g. KD for overbought/oversold status.
2. Add stop loss mechanisms like moving stop loss, zone stop loss to manage risks.  
3. Add exit rules based on EMA trend determination in selling conditions.
4. Optimize parameter settings to expand profit range, e.g. adjust Bollinger Bands width. 
5. Add entry rules to avoid false breakouts, e.g. volume filters.

### Conclusion 

The strategy integrates Bollinger Bands, RSI and EMA for a long holding automatic trading strategy with double confirmation filters. The double confirmation for overbought/oversold status avoids false signals effectively, and using EMA for trend determination prevents trading against the trend. Meanwhile, flexible parameter settings make it adaptable to different stocks. Further improvement in aspects of stop loss and exit mechanisms can enhance the strategy's efficiency and risk management. The strategy provides a valuable reference framework for beginners and has practical significance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|RSI Period Length|
|v_input_2|30|RSI Oversold Level|
|v_input_3|80|RSI Overbought Level|
|v_input_4|231|Bollinger Period Length|
|v_input_5|true|Use EMA?|
|v_input_6|20|EMA Period Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-21 00:00:00
end: 2023-12-28 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Bollinger + RSI + EMA, Double Strategy Long-Only (by ChartArt) v1.3", shorttitle="rsi 30 min ADJ Buy", overlay=true)

///////////// RSI
RSIlength = input(2, title="RSI Period Length") // Adjusted RSI period length
RSIoverSold = input(30, title="RSI Oversold Level")  // Adjustable RSI oversold level
RSIoverBought = input(80, title="RSI Overbought Level")  // Adjustable RSI overbought level
price = close
vrsi = rsi(price, RSIlength)

///////////// Bollinger Bands
BBlength = input(231, minval=1, title="Bollinger Period Length") // Adjusted Bollinger period length
BBmult = 2
BBbasis = sma(price, BBlength)
BBdev = BBmult * stdev(price, BBlength)
BBupper = BBbasis + BBdev
BBlower = BBbasis - BBdev

///////////// EMA
useEMA = input(true, title="Use EMA?")
emaLength = input(20, title="EMA Period Length")
ema = useEMA ? ema(close, emaLength) : na

source = close
buyEntry = crossover(source, BBlower) or (close < BBlower and close > BBbasis) or (low < BBlower and close > BBbasis) // Add condition for low touching Bollinger Band
sellEntry = crossunder(source, BBupper)

///////////// Plotting
plot(BBbasis, color=color.aqua, title="Bollinger Bands SMA Basis Line")
plot(BBupper, color=color.silver, title="Bollinger Bands Upper Line")
plot(BBlower, color=color.silver, title="Bollinger Bands Lower Line")
plot(ema, color=color.orange, title="EMA")  // Plot EMA

///////////// RSI + Bollinger Bands Strategy
long = crossover(vrsi, RSIoverSold) and buyEntry
close_long = close >= BBupper

if (not na(vrsi))
    if long
        strategy.entry("Buy", strategy.long, qty=10, stop=BBlower, comment="Buy")
    else
        strategy.cancel(id="Buy")
        
    if close_long
        strategy.close("Buy")

```

> Detail

https://www.fmz.com/strategy/437009

> Last Modified

2023-12-29 14:46:57
