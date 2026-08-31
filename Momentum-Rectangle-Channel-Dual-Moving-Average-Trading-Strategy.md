
> Name

Momentum-Rectangle-Channel-Dual-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/168ef3bf42cc4be5551.png)

### Overview

This strategy is based on momentum indicators of Rectangle Channel and Dual Moving Average, which implements a relatively complete stock trading system. The strategy first uses fast EMA and slow EMA to construct dual moving average trading signals. Then, combined with the Rectangle Channel indicator, it further verifies the trading signals to achieve more accurate entry. In addition, the strategy also uses the SAR indicator to assist in judging the trend direction.  

### Strategy Principle

1. Calculate the moving averages of fast EMA with period 5 days and slow EMA with period 50 days. Fast EMA reflects recent price changes and slow EMA reflects long term trends.  

2. Convert EMA to TEMA (Triple Exponential Moving Average), using TEMA's weighted calculation method to improve the sensitivity of the curve and capture price changes faster.

3. When fast TEMA crosses above slow TEMA, a buy signal is generated; when fast TEMA crosses below slow TEMA, a sell signal is generated. The principle of dual moving average crossover is widely used in quantitative trading.  

4. Calculate the price channel width to form channel areas. Trading signals are only considered when prices break through the channel. This can filter false signals and verify the real start of a trend.   

5. SAR indicator determines the overall trend direction, combined with the dual moving average trading signals, can avoid unnecessary reverse operations.

### Advantages of the Strategy  

1. The combination of dual moving average crossover and channel breakthrough can effectively identify the beginning of a trend, filter noise, and make buy and sell signals more accurate and reliable. 

2. The TEMA curve is more sensitive than the EMA curve and can capture price changes faster.   

3. The combination of multiple indicators can form a verification mechanism between indicators to avoid the limitations of a single indicator and make the strategy more comprehensive and robust.   

4. The strategy parameters are flexible, EMA cycles, channel widths, etc. can be adjusted and optimized according to market conditions for strong adaptability.

### Risks of the Strategy

1. There is a probability of violent fluctuations in stock prices in the short term, which can easily trigger a stop loss.  

2. Sudden events may cause price gaps that cannot be traded at expected prices.

3. Dual moving average crossovers cannot completely avoid false signals, there is still a certain misjudgment rate.  

4. Improper parameter settings can lead to excessively frequent or lagging trading signals.

### Optimization Directions  

1. More indicators such as KD and MACD can be combined for verification to make the strategy more comprehensive and reliable.   

2. Dynamic cycles can be set to adjust the parameters of EMA and Channel according to the degree of market volatility, making the strategy more flexible.  

3. Machine learning models can be established to train a large amount of historical data to automatically optimize parameter settings and reduce manual intervention.  

4. Text analysis and news sentiment judgment can be combined to avoid unnecessary trading when major news is released.  

### Summary   

This strategy forms trading signals through fast-slow TEMA moving average crossover, and then verifies them with price channel and SAR indicator, which can effectively identify the beginning of stock price trends and make buy and sell operations at reasonable positions. The combination of multiple indicators to verify each other can improve the reliability of signals and is a relatively robust and efficient stock trading strategy. By continuously optimizing parameter settings, adding new verification indicators, etc., the effect of the strategy can be further improved.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Fast TEMA Period|
|v_input_2|50|Slow TEMA Periods|
|v_input_3|true|From Month|
|v_input_4|4|From Day|
|v_input_5|2010|From Year|
|v_input_6|true|To Month|
|v_input_7|true|To Day|
|v_input_8|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("TEMA_System_SAR", overlay=true)

//Collect inputs parameters

fastEmaPeriod = input(5, minval=1, title="Fast TEMA Period")
slowEmaPeriod = input(50, minval=1, title="Slow TEMA Periods")

// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 4, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2010, title = "From Year", minval = 2000)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2000)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 09, 15)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 15, 30)        // backtest finish window
window()  => true

fastEma = ema(close, fastEmaPeriod)
slowEma = ema(close, slowEmaPeriod)

//convert EMA into TEMA

ema1 = ema(close, fastEmaPeriod)
ema2 = ema(ema1, fastEmaPeriod)
ema3 = ema(ema2, fastEmaPeriod)

fastTEMA = 3 * (ema1 - ema2) + ema3

// convert EMA into TEMA

ema4 = ema(close, fastEmaPeriod)
ema5 = ema(ema1, fastEmaPeriod)
ema6 = ema(ema2, fastEmaPeriod)

slowTEMA = 3 * (ema4 - ema5) + ema6

buy  = close > fastTEMA
sell = close < fastTEMA

plot(fastTEMA, title = 'fast TEMA', linewidth=2, color=white)
plot(slowTEMA, title = 'slow TEMA', linewidth=2, color=yellow)

strategy.entry("long",strategy.long, when = window() and buy)
strategy.entry("short", strategy.short, when = window() and sell)
```

> Detail

https://www.fmz.com/strategy/442935

> Last Modified

2024-02-27 14:54:07
