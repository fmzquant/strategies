
> Name

Consecutive-Downs-Ups-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14e89823c4c7220be9d.png)

## Overview
The Consecutive Downs-Ups Reversal Strategy is a quantitative trading strategy based on the continuity of price downs and ups. The strategy identifies the pattern of X consecutive down candles breaking the lowest point, followed by Y consecutive up candles, to capture short-term trend reversal opportunities. The main idea behind the strategy is that after the price experiences consecutive downs, it indicates that the bearish momentum has been released. Subsequently, if consecutive ups occur, it suggests that bullish strength is starting to accumulate, and the price may usher in a rebound. Therefore, this strategy attempts to seize the price reversal opportunity from bearish to bullish, thereby generating profits.

## Strategy Principle
The principle of the Consecutive Downs-Ups Reversal Strategy can be divided into the following steps:

1. Parameter Setting: Set the number of consecutive down bars (consecutiveBarsDown) and the number of consecutive up bars (consecutiveBarsUp).
2. Determine Market Trend: Count the number of consecutive down bars (dns) and consecutive up bars (ups) of the current price.
3. Entry Condition: Open a long position when the following conditions are met:
   - The current trading time is within the backtest range (date())
   - The previous two candles have consecutively declined to the set value of consecutiveBarsDown
   - The current candle has consecutively risen to the set value of consecutiveBarsUp
   - There is no current position (not active)
4. Set Stop Loss: After opening a position, set the stop loss price (stop_loss) to the lowest point of the closing prices of the most recent three candles.
5. Exit Condition: Close the position when the following conditions are met:
   - The current trading time is within the backtest range (date())
   - There is a current position (active)
   - The closing price is lower than the stop loss price (close < stop_loss) or lower than the highest price minus 2 times ATR (close < high - 2 * atr(7))
6. Reset Variables: After closing the position, reset the variable active to false and entry_bar_index to a very large value.

This strategy utilizes the pattern of consecutive downs and ups to attempt to capture reversal opportunities from bearish to bullish. At the same time, it sets strict stop loss conditions to control risks.

## Advantage Analysis
The Consecutive Downs-Ups Reversal Strategy has the following advantages:

1. Trend Sensitivity: By counting the number of consecutive down and up bars, the strategy is relatively sensitive to changes in price trends and can quickly identify potential reversal opportunities.
2. Simple and Clear Pattern: The strategy is based on a simple pattern of consecutive downs and ups, with clear rules and easy to understand and implement.
3. Strict Stop Loss: The strategy sets a relatively strict stop loss condition (the lowest point of the closing prices of the most recent three candles) when opening a position, allowing timely exit when the trend fails to continue, controlling losses.
4. Adjustable Parameters: The number of consecutive down and up bars can be adjusted according to market characteristics and trading instruments, increasing the flexibility of the strategy.

## Risk Analysis
Although the Consecutive Downs-Ups Reversal Strategy has some advantages, it still faces the following risks:

1. Frequent Trading: When market volatility is high, prices may frequently trigger the strategy's entry and exit conditions, leading to an increase in the number of trades and higher transaction costs.
2. Stop Loss Placement: The strategy's stop loss position is the lowest point of the closing prices of the most recent three candles, which may result in the stop loss being too close to the entry price, triggering stop losses during normal market fluctuations and causing unnecessary losses.
3. Trend Continuation Risk: This strategy mainly captures reversal opportunities, but when the market trend continues strongly, reversal patterns may fail, leading to consecutive losses for the strategy.

To address these risks, the following optimization measures can be considered:
- Dynamically adjust the requirements for the number of consecutive down and up bars based on market volatility characteristics to reduce frequent trading.
- Optimize the setting method of the stop loss position, such as using ATR or percentage stop loss, giving prices more room for fluctuation.
- In market environments with strong trend continuation, consider reducing trades or reverse trading to avoid counter-trend operations.

## Optimization Direction
The Consecutive Downs-Ups Reversal Strategy has the following optimization directions:

1. Introduce More Indicators: In addition to the number of consecutive down and up bars, other technical indicators such as RSI and MACD can be combined to improve the accuracy of entry and exit signals. By using multiple indicators for confirmation, false signals can be reduced, and the profitability of the strategy can be improved.
2. Optimize Stop Loss and Take Profit: Currently, the strategy uses a fixed stop loss position (the lowest point of the closing prices of the most recent three candles). Dynamic stop loss or trailing stop loss methods can be considered, such as ATR stop loss or trailing stop loss. At the same time, take profit conditions can be added, such as closing the position when the target profit reaches a certain percentage to lock in existing profits.
3. Adapt to Different Market Environments: The strategy may perform better in a volatile market, while facing risks in a trending market. It can be considered to dynamically adjust strategy parameters or stop trading according to changes in market conditions to adapt to different market states.
4. Incorporate Position Sizing: Currently, the strategy operates with full positions. The concept of position sizing can be introduced to adjust the size of each trade based on market risk and personal risk tolerance to control overall risk.
5. Combine with Other Strategies: The Consecutive Downs-Ups Reversal Strategy can be combined with other strategies, such as trend-following strategies and mean-reversion strategies, to form a strategy portfolio and improve the stability of overall returns.

Through the above optimization measures, the Consecutive Downs-Ups Reversal Strategy can better adapt to market changes, control risks, and improve profitability and stability.

## Summary
The Consecutive Downs-Ups Reversal Strategy is a quantitative trading strategy based on price continuity. By identifying the pattern of consecutive downs and ups, it captures short-term market reversal opportunities. The strategy rules are simple and clear, relatively sensitive to changes in price trends, and have strict stop loss conditions to control risks. At the same time, strategy parameters can be adjusted according to market characteristics, increasing flexibility.

However, the strategy also has some risks, such as frequent trading, potentially overly strict stop loss placement, and possibly poor performance in strong trending markets. To address these risks, measures such as dynamically adjusting parameters, optimizing stop loss positions, and adopting different strategies in different market environments can be considered.

In addition, the strategy has some optimization directions, such as introducing more indicators, optimizing stop loss and take profit, adapting to different market environments, incorporating position sizing, and combining with other strategies. Through continuous optimization and improvement, the Consecutive Downs-Ups Reversal Strategy can become a more robust and effective quantitative trading strategy.

Overall, the Consecutive Downs-Ups Reversal Strategy provides a simple and effective trading idea by capturing short-term market reversal opportunities to generate profits. However, in practical application, it is necessary to combine specific market conditions and personal risk preferences to appropriately optimize and adjust the strategy to achieve better trading results.

In conclusion, the Consecutive Downs-Ups Reversal Strategy offers a straightforward approach to profit from short-term market reversals. But in real-world implementation, it requires proper optimization and adaptation based on market conditions and individual risk tolerance to maximize its effectiveness as a quantitative trading strategy.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|consecutiveBarsUp|
|v_input_2|3|consecutiveBarsDown|
|v_input_3|timestamp(01 Jan 2023 00:00 +0000)|From|
|v_input_4|timestamp(01 Mar 2024 00:00 +0000)|Thru|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-02 00:00:00
end: 2024-03-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Bottom Out Strategy", overlay=true)
consecutiveBarsUp = input(2)
consecutiveBarsDown = input(3)
price = close
ups = 0.0
ups := price > price[1] ? nz(ups[1]) + 1 : 0
dns = 0.0
dns := price < price[1] ? nz(dns[1]) + 1 : 0
var entry_bar_index = 1000000
var active = false
var stop_loss = 0.0

// === INPUT BACKTEST RANGE ===
i_from = input(defval = timestamp("01 Jan 2023 00:00 +0000"), title = "From")
i_thru = input(defval = timestamp("01 Mar 2024 00:00 +0000"), title = "Thru")
// === FUNCTION EXAMPLE ===
date() => true

entry_condition() => 
	date() and dns[2] >= consecutiveBarsDown and ups >= consecutiveBarsUp and not active

exit_condition() =>
	date() and active and (close < nz(stop_loss) or close < high - 2 * ta.atr(7))

if (entry_condition())
	strategy.entry("ConsDnLong", strategy.long, comment="CDLEntry")
	entry_bar_index := bar_index
	active := true
	stop_loss := math.min(close, close[1], close[2])
	// log.info("Entry at bar {0}, close={1}, stop_loss={2} ", entry_bar_index, close, stop_loss)
if (exit_condition())
	strategy.close("ConsDnLong", comment = "CDLClose")
	// log.info("Close at bar {0}", bar_index)
	entry_bar_index := 1000000
	active := false
// if (dns >= consecutiveBarsDown)
// 	strategy.entry("ConsDnSE", strategy.short, comment="ConsDnSE")
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
plot(high - 2* ta.atr(7))
```

> Detail

https://www.fmz.com/strategy/444031

> Last Modified

2024-03-08 17:01:33
