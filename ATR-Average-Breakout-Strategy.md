
> Name

ATR-Average-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1088ba8319a63bfc155.png)


#### Overview
This strategy mainly uses two indicators, ATR (Average True Range) and SMA (Simple Moving Average), to determine the consolidation and breakout of the market and make trades accordingly. The main idea of the strategy is: when the price breaks through the upper or lower ATR channel, it is considered a breakout and a position is opened; when the price returns to the ATR channel, it is considered a consolidation and the position is closed. At the same time, the strategy also uses risk control and position management to control the risk and position size of each trade.

#### Strategy Principle
1. Calculate the ATR and SMA indicators. ATR is used to determine the volatility of the market, while SMA is used to determine the average price level of the market.
2. Calculate the upper and lower bounds based on ATR and SMA. The upper bound is SMA + ATR * multiplier, and the lower bound is SMA - ATR * multiplier, where multiplier is a user-defined multiple.
3. Determine whether the market is in a consolidation state. When the highest price is lower than the upper bound and the lowest price is higher than the lower bound, the market is considered to be in a consolidation state.
4. Determine whether a breakout has occurred in the market. When the highest price breaks above the upper bound, it is considered an upward breakout; when the lowest price breaks below the lower bound, it is considered a downward breakout.
5. Open positions based on the breakout situation. Open a long position for an upward breakout and a short position for a downward breakout.
6. Close positions based on stop-loss and take-profit conditions. When the price reaches the stop-loss price (SMA - ATR * stop_loss_percentage) or the take-profit price (SMA + ATR * take_profit_percentage), close the position.
7. Calculate the risk amount (risk_per_trade) for each trade based on the user-defined risk percentage (risk_percentage), and then calculate the position size (position_size) based on ATR.

#### Advantage Analysis
1. The strategy logic is clear and easy to understand and implement.
2. The use of the ATR indicator to determine market volatility allows the strategy to adapt to different market conditions.
3. The use of the SMA indicator to determine the average price level of the market allows the strategy to track the main trend of the market.
4. The consideration of the consolidation state of the market when opening positions helps avoid frequent trading in a choppy market.
5. The use of stop-loss and take-profit effectively controls the risk of each trade.
6. The use of position management allows for automatic adjustment of position size based on account funds and risk percentage.

#### Risk Analysis
1. The strategy may not perform well in a choppy market because frequent breakouts and consolidations may lead to frequent opening and closing of positions, thereby increasing trading costs.
2. The parameter settings of the strategy have a significant impact on its performance. Different parameters may lead to completely different results, so careful debugging and optimization of parameters are required.
3. The stop-loss and take-profit settings of the strategy may not be flexible enough. Fixed percentage stop-loss and take-profit may not be able to adapt to different market conditions.
4. The position management of the strategy may be too simple and does not consider factors such as market trend and volatility, which may lead to oversized or undersized positions in some cases.

#### Optimization Direction
1. Consider adding trend filtering conditions, such as only opening long positions when the trend is up and short positions when the trend is down, to avoid frequent trading in a choppy market.
2. Consider using more flexible stop-loss and take-profit methods, such as dynamically adjusting the stop-loss and take-profit distances based on ATR or market volatility, to adapt to different market conditions.
3. Consider using more complex position management methods, such as adjusting position size based on market trend and volatility, to control risk and increase profit.
4. Consider adding other filtering conditions, such as trading volume and volatility, to further improve the reliability and stability of the strategy.

#### Summary
This strategy uses two simple indicators, ATR and SMA, to make trades by determining price breakouts and consolidations, while using risk control and position management to control the risk and position size of each trade. The strategy logic is clear and easy to understand and implement, but there may be some problems in actual application, such as poor performance in a choppy market, significant impact of parameter settings on strategy performance, inflexible stop-loss and take-profit settings, and overly simple position management. Therefore, in actual application, it is necessary to optimize and improve based on specific situations, such as adding trend filtering conditions, using more flexible stop-loss and take-profit methods, using more complex position management methods, adding other filtering conditions, etc., to improve the reliability and stability of the strategy.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-09 00:00:00
end: 2024-05-16 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Consolidation Breakout Strategy", overlay=true)

// Input Parameters
length = input.int(20, "Length", minval=1)
multiplier = input.float(2.0, "Multiplier", minval=0.1, maxval=10.0)
risk_percentage = input.float(1.0, "Risk Percentage", minval=0.1, maxval=10.0)
stop_loss_percentage = input.float(1.0, "Stop Loss Percentage", minval=0.1, maxval=10.0)
take_profit_percentage = input.float(2.0, "Take Profit Percentage", minval=0.1, maxval=10.0)

// ATR calculation
atr_value = ta.atr(length)

// Average price calculation
average_price = ta.sma(close, length)

// Upper and lower bounds for consolidation detection
upper_bound = average_price + multiplier * atr_value
lower_bound = average_price - multiplier * atr_value

// Consolidation detection
is_consolidating = (high < upper_bound) and (low > lower_bound)

// Breakout detection
is_breakout_up = high > upper_bound
is_breakout_down = low < lower_bound

// Entry conditions
enter_long = is_breakout_up and not is_consolidating
enter_short = is_breakout_down and not is_consolidating

// Exit conditions
exit_long = low < (average_price - atr_value * stop_loss_percentage) or high > (average_price + atr_value * take_profit_percentage)
exit_short = high > (average_price + atr_value * stop_loss_percentage) or low < (average_price - atr_value * take_profit_percentage)

// Risk calculation
risk_per_trade = strategy.equity * (risk_percentage / 100)
position_size = risk_per_trade / atr_value

// Strategy
if (enter_long)
    strategy.entry("Long", strategy.long, qty=position_size)
if (enter_short)
    strategy.entry("Short", strategy.short, qty=position_size)

if (exit_long)
    strategy.close("Long")
if (exit_short)
    strategy.close("Short")

```

> Detail

https://www.fmz.com/strategy/451698

> Last Modified

2024-05-17 10:22:11
