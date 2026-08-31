
> Name

动态唐奇安通道与简单移动平均线结合的量化策略-Dynamic-Donchian-Channel-and-Simple-Moving-Average-Combination-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12ff8190fd73cc4670f.png)

#### Overview
This strategy combines two technical indicators: Donchian Channel and Simple Moving Average (SMA). It opens a long position when the price breaks below the lower band of the Donchian Channel and closes above the SMA. Conversely, it opens a short position when the price breaks above the upper band of the Donchian Channel and closes below the SMA. The long position is closed when the price reaches the upper band of the Donchian Channel, while the short position is closed when the price reaches the lower band. This strategy is suitable for markets with strong trends.

#### Strategy Principle
1. Calculate the upper and lower bands of the Donchian Channel. The upper band is the highest high over the past n periods, and the lower band is the lowest low over the past n periods.
2. Calculate the Simple Moving Average. The SMA is the arithmetic mean of the closing prices over the past m periods.
3. Long entry: Open a long position when the price is below the lower band of the Donchian Channel and the closing price is above the SMA.
4. Short entry: Open a short position when the price is above the upper band of the Donchian Channel and the closing price is below the SMA.
5. Long exit: Close the long position when the price reaches the upper band of the Donchian Channel.
6. Short exit: Close the short position when the price reaches the lower band of the Donchian Channel.

#### Strategy Advantages
1. Combines two market elements: trend and volatility. The SMA captures the trend, while the Donchian Channel captures the volatility, enabling the strategy to seize pullback opportunities in trending markets.
2. Clear profit-taking conditions help lock in profits in a timely manner. Long and short positions are closed when the price reaches the upper and lower bands of the Donchian Channel, respectively, allowing the strategy to exit profitable trades before the trend reverses.
3. Few parameters make optimization easier. The strategy only has three parameters: Donchian Channel period, offset, and SMA period, which simplifies optimization.

#### Strategy Risks
1. Frequent trading. The strategy has a high frequency of position entries and exits, which can erode returns in markets with high trading costs. This can be mitigated by moderately relaxing entry conditions or increasing the timeframe.
2. Poor performance in rangebound markets. The strategy may suffer more losses when the trend is unclear. Volatility indicators can be used to identify rangebound markets and suspend the strategy.
3. Insufficient parameter stability. The optimal parameters may vary significantly across different instruments and timeframes, indicating poor parameter stability. The live performance may not match the backtest. Extensive out-of-sample testing and sensitivity analysis are needed to confirm parameter robustness.

#### Strategy Optimization Directions
1. Add optional entry conditions combined with other indicators. For example, require the ADX of the DMI to be above a certain threshold for entry, or only enter long when the RSI leaves the oversold zone. This can improve the win rate of entries.
2. Use dynamic profit-taking lines instead of fixed Donchian Channel lines to achieve a profit-trailing function. For example, after the price reaches the upper band of the Donchian Channel for a long position, switch to closing the position at the ATR stop-loss line or the SAR stop-loss line.
3. Dynamically adjust the Donchian Channel period based on volatility levels. Shorten the Donchian Channel period in high-volatility market conditions and lengthen the period in low-volatility conditions. This helps adapt to different markets.

#### Summary
The Dynamic Donchian Channel and Simple Moving Average Combination Strategy is a simple and easy-to-use quantitative trading strategy framework. It constructs entry and exit logic from the perspectives of trend following and volatility breakout, making it suitable for instruments with strong trends. However, the strategy performs poorly in frequently rangebound markets, and its parameter robustness is mediocre. The adaptability and robustness of the strategy can be improved by introducing auxiliary entry conditions, dynamic profit-taking, and parameter self-adaptation mechanisms. Overall, this strategy can serve as a basic strategy framework to be further modified and improved upon to create more advanced quantitative strategies.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-01 00:00:00
end: 2024-05-31 23:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("FBK Donchian Channel Strategy", overlay=true)

// Inputs
donchian_period = input.int(20, title="Donchian Channel Period")
donchian_offset = input.int(1, title="Donchian Channel Offset")
sma_period = input.int(200, title="SMA Period")
start_date = input(timestamp("2023-01-01 00:00 +0000"), title="Start Date")
end_date = input(timestamp("2023-12-31 23:59 +0000"), title="End Date")
trade_type = input.string("Both", title="Trade Type", options=["Buy Only", "Sell Only", "Both"])

// Calculate indicators
donchian_upper = ta.highest(high, donchian_period)[donchian_offset]
donchian_lower = ta.lowest(low, donchian_period)[donchian_offset]
sma = ta.sma(close, sma_period)

// Plot indicators
plot(donchian_upper, color=color.red, title="Donchian Upper")
plot(donchian_lower, color=color.green, title="Donchian Lower")
plot(sma, color=color.blue, title="SMA")

// Helper function to check if within testing period
is_in_testing_period() => true

// Entry conditions
long_condition = low <= donchian_lower and close > sma
short_condition = high >= donchian_upper and close < sma

// Exit conditions
exit_long_condition = high >= donchian_upper
exit_short_condition = low <= donchian_lower

// Open long position
if (is_in_testing_period() and (trade_type == "Buy Only" or trade_type == "Both") and long_condition)
    strategy.entry("Long", strategy.long)

// Close long position
if (is_in_testing_period() and exit_long_condition)
    strategy.close("Long")

// Open short position
if (is_in_testing_period() and (trade_type == "Sell Only" or trade_type == "Both") and short_condition)
    strategy.entry("Short", strategy.short)

// Close short position
if (is_in_testing_period() and exit_short_condition)
    strategy.close("Short")

// Close all positions at the end of the testing period
if not is_in_testing_period()
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/454371

> Last Modified

2024-06-17 17:29:48
