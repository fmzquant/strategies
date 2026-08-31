
> Name

Multi-EMA-Automated-Trading-System-with-Trailing-Profit-Lock

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c26d57bad529d3bf2d.png)


#### Overview
This strategy is an automated trading system based on multiple Exponential Moving Averages (EMAs), establishing trading signals through hierarchical analysis of 5-period, 20-period, and 50-period EMAs. The system's unique design incorporates multiple EMAs based on high, low, and closing prices, combined with dynamic stop-loss and trailing profit mechanisms to effectively control risk while securing profits.

#### Strategy Principles
The strategy bases trading decisions on multiple timeframe EMA crossovers and positional relationships. Specifically:
1. Utilizes 5-period, 20-period (based on high, low, and closing prices), and 50-period EMAs
2. Entry conditions require all indicators to show clear bullish alignment: 50EMA < 20EMA(Low) < 20EMA(Close) < 20EMA(High) < 5EMA
3. Requires current price to be above all EMAs, confirming strong trend
4. Exit uses dual mechanism: profit-taking when price breaks below 5-period EMA, or stop-loss when touching 20-period low EMA

#### Strategy Advantages
1. Hierarchical filtering mechanism significantly reduces false signals
2. Multiple EMA crossover confirmation improves trading accuracy
3. Dynamic stop-loss positions adjust with market volatility
4. Fully automated system eliminates emotional interference
5. Trailing profit mechanism effectively locks in gained profits

#### Strategy Risks
1. May result in frequent trades during sideways markets
2. EMAs are inherently lagging indicators, might miss market initiation points
3. Multiple conditions might cause missing some trading opportunities
4. Stop-loss at 20EMA low point might be relatively loose

#### Optimization Directions
1. Can add volume confirmation mechanism to improve signal reliability
2. Consider incorporating volatility indicators for dynamic position sizing
3. Introduce more flexible profit-taking schemes, such as partial position reduction
4. Can combine with oscillators like RSI to optimize entry timing
5. Consider adding trend strength judgment to filter weak markets

#### Summary
This is a rigorously designed multiple moving average trading system that effectively controls risk through hierarchical filtering and dynamic stop-loss. While it may miss some rapid market movements, it performs consistently in trending markets. It's recommended to adjust parameters according to different market characteristics and consider adding volume and other auxiliary indicators to improve reliability. This strategy is suitable for investors seeking stable returns in medium to long-term investments.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-03 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Automated EMA Strategy with Hierarchical Conditions", overlay=true)

// Inputs for EMA lengths
length_5 = 5
length_20 = 20
length_50 = 50

// Calculating EMAs
ema_5 = ta.ema(close, length_5)
ema_20_high = ta.ema(high, length_20)
ema_20_low = ta.ema(low, length_20)
ema_20_close = ta.ema(close, length_20)
ema_50 = ta.ema(close, length_50)

// Buy condition: 50 EMA < 20 EMA (Close) < 20 EMA (High) < 20 EMA (Low) < 5 EMA
// and LTP above all EMAs
buy_condition = ema_50 < ema_20_low and ema_20_low < ema_20_close and ema_20_close < ema_20_high and ema_20_high < ema_5 and close > ema_5 and close > ema_20_close and close > ema_20_high and close > ema_20_low and close > ema_50

// Stop-loss and target levels
stop_loss = ema_20_low

// Target condition: Close below 5 EMA
target_condition = close < ema_5

// Check if there's an open position
is_in_position = strategy.position_size > 0

// Execute Buy Signal only if no position is open
if (buy_condition and not is_in_position)
    strategy.entry("Buy", strategy.long)

// Exit conditions: Stop-loss or target (close below 5 EMA)
if (is_in_position and (target_condition or close < stop_loss))
    strategy.close("Buy")

// Plotting the EMAs
plot(ema_5, color=color.blue, title="5 EMA")
plot(ema_20_high, color=color.green, title="20 EMA (High)")
plot(ema_20_low, color=color.red, title="20 EMA (Low)")
plot(ema_20_close, color=color.purple, title="20 EMA (Close)")
plot(ema_50, color=color.orange, title="50 EMA")

```

> Detail

https://www.fmz.com/strategy/473943

> Last Modified

2024-12-04 15:35:32
