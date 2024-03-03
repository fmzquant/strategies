
> Name

Internal-Bar-Strength-Indicator-Reversion-system

> Author

ChaoZhang

> Strategy Description

 ![IMG](https://www.fmz.com/upload/asset/1a2cd8db82624108cad.png) 
It looks like you're using Pine Script to set up a trading strategy with conditions based on the Internal Bar Strength (IBS) indicator. 

To explain the code:

1. Strategy Settings: The strategy defined here is named "IBS", it has an initial capital of $10,000, no overlay, allows up to 5 entries in the same direction, and each trade consists of a quantity of 100 units.

2. Calculation of IBS: The script calculates the IBS as a percentage of the current bar's range that's made up by the difference between the close and the low. Notice that the indicator ranges between 0 and 100%.

3. Long Entry conditions: It enters a long trade when the IBS falls below 5.

4. Short Entry conditions: It enters a short trade when the IBS rises above 99.

5. Exit conditions: The trading strategy then exits either position after either a profit of 10% or a loss of 2%. 

They have also included commented out codes (with '//') for direction.allowed for strategy risk and another shortCondition. 

Note: This script indicates a mean reversion strategy. It assumes that the price will return to its mean and trades based on this assumption. However, please spend enough time testing this strategy to make sure it works well with your specific use case.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// strategy("IBS", initial_capital=10000, overlay=false, pyramiding=5, default_qty_value=100, currency="USD")

//strategy.risk.allow_entry_in(strategy.direction.long)


src = close
ibs = (close - low) / (high - low) * 100

longCondition = ibs <5
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

//shortCondition = close > high[1]
shortCondition = ibs > 99
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)

p = close * 0.01 * 10
strategy.exit("exit", "My Long Entry Id",profit = 10, loss=2)
strategy.exit("exit", "My Short Entry Id",profit = 10, loss=2)



```

> Detail

https://www.fmz.com/strategy/426145

> Last Modified

2023-09-08 16:33:39
