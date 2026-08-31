
> Name

MORNING-CANDLE-BREAKOUT-AND-REVERSION-STRATEGY-早晨蜡烛突破与反转策略

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7001d4f91bfac77847.png)


#### Overview

This strategy is an intraday trading system based on the morning candle pattern, primarily utilizing the high and low points of the 11:00 AM candle to determine market trends. The core idea is to go long when the price breaks above the morning candle high and short when it breaks below the low, with corresponding stop-loss conditions. This approach combines trend-following and price reversal concepts, aiming to capture short-term movements following breakouts of important intraday price levels.

#### Strategy Principles

The operating principles of the strategy are as follows:

1. Identifying Key Levels: The strategy first identifies the highest and lowest points of the 11:00 AM candle, using these as key reference levels.

2. Entry Signals:
   - Long Signal: Triggered when the closing price breaks above the morning high for two consecutive candles.
   - Short Signal: Triggered when the closing price breaks below the morning low for two consecutive candles.

3. Stop-Loss Settings:
   - Long Stop-Loss: Set at the low of the morning candle.
   - Short Stop-Loss: Set at the high of the morning candle.

4. Exit Mechanism:
   - Stop-Loss Hit: Automatically closes the position when the price reaches the respective stop-loss level.
   - Time-Based Exit: All positions are automatically closed at 15:15 to control overnight risk.

5. Trading Time Restriction: The strategy does not open new trades after 15:15 to avoid abnormal volatility near market close.

#### Strategy Advantages

1. Clear Trading Rules: The strategy is based on clear price breakout and reversal logic, making it easy to understand and execute.

2. Risk Control: Effective control of risk for each trade through fixed stop-loss points.

3. Market State Adaptation: The strategy can adapt to different market volatility states based on the price range formed in the morning.

4. Automated Execution: The strategy can be fully automated through programming, reducing human intervention and emotional influence.

5. Intraday Trading: By closing positions before the end of the trading day, overnight position risk is avoided.

6. Flexibility: The strategy can be optimized for different markets and trading instruments by adjusting parameters.

#### Strategy Risks

1. False Breakout Risk: The market may experience false breakouts, leading to frequent stop-loss exits.

2. Limited Volatility Range: During low volatility periods, the strategy may struggle to trigger trading signals or generate effective profits.

3. Single Time Frame: Relying solely on the 11:00 AM candle may ignore important market information from other time periods.

4. Lack of Trend Following: The strategy does not set take-profit conditions, potentially failing to fully capitalize on strong trend movements.

5. Fixed Stop-Loss: In highly volatile markets, fixed stop-losses may be too close, leading to premature exits from favorable positions.

6. Trading Costs: Frequent entries and exits may result in high trading costs, affecting overall returns.

#### Strategy Optimization Directions

1. Incorporate Multi-Timeframe Analysis: Combine trend judgments from longer time periods to improve trading accuracy.

2. Dynamic Stop-Loss: Use methods like the ATR indicator to set dynamic stop-losses, adapting to different market volatility states.

3. Add Take-Profit Mechanism: Set take-profit conditions based on risk-reward ratios to improve the strategy's profit-loss ratio.

4. Volume Analysis: Incorporate volume analysis to enhance the reliability of breakout signals.

5. Market State Filtering: Introduce volatility indicators like ATR to reduce trading frequency during low volatility periods.

6. Optimize Entry Timing: Consider using indicators like RSI for counter-trend trading in overbought or oversold areas.

7. Add Trend Following Elements: Consider using trailing stops to follow trends during strong breakouts.

8. Backtesting and Parameter Optimization: Conduct backtests on different parameter combinations to find the optimal settings.

#### Conclusion

The Morning Candle Breakout and Reversion Strategy is an intraday trading system based on key level breakouts. It uses the high and low points of the 11:00 AM candle as important references to capture short-term trends through price breakouts. The strategy's strengths lie in its clear rules, controllable risk, and suitability for automated execution. However, it also faces potential risks such as false breakouts and fixed stop-losses. By introducing multi-timeframe analysis, dynamic stop-losses, volume confirmation, and other optimization measures, the strategy's stability and profitability can be further enhanced. Overall, this is a strategy framework with a good foundation that, with appropriate optimization and risk management, has the potential to become an effective trading tool.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-06-30 00:00:00
end: 2024-07-30 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Custom Strategy Nifty 50", overlay=true)

// Define the time variables
var bool morningCandleFound = false
var float morningHigh = na
var float morningLow = na
var bool inTrade = false
var int tradeDirection = 0 // 0: No trade, 1: Buy Call, -1: Buy Put
var bool noNewTrades = false // To prevent new trades after 15:15

// Identify the high and low of the 11:00 morning candle
if (hour == 11 and minute == 0)
    morningHigh := high
    morningLow := low
    morningCandleFound := true

// Plot the high and low of the 11:00 morning candle
plot(morningHigh, title="11:00 morning High", color=color.green, linewidth=2)
plot(morningLow, title="11:00 morning Low", color=color.red, linewidth=2)

// Conditions for Buy Call and Buy Put signals
var bool buyCallCondition = false
var bool buyPutCondition = false

if (morningCandleFound and (hour > 11 or (hour == 11 and minute > 0)) and not noNewTrades)
    // Check for Buy Call condition
    if (close[1] > morningHigh and close > morningHigh)
        if (not inTrade or tradeDirection != 1)
            strategy.entry("Buy Call", strategy.long, stop=morningLow)
            buyCallCondition := true
            inTrade := true
            tradeDirection := 1
            label.new(bar_index, high, "Buy Call", color=color.green)
            alert("Buy Call: Price crossed morning high", alert.freq_once_per_bar_close)
    else if (close[1] <= morningHigh)
        buyCallCondition := false

    // Check for Buy Put condition
    if (close[1] < morningLow and close < morningLow)
        if (not inTrade or tradeDirection != -1)
            strategy.entry("Buy Put", strategy.short, stop=morningHigh)
            buyPutCondition := true
            inTrade := true
            tradeDirection := -1
            label.new(bar_index, low, "Buy Put", color=color.red)
            alert("Buy Put: Price crossed morning low", alert.freq_once_per_bar_close)
    else if (close[1] >= morningLow)
        buyPutCondition := false

    // Exit conditions
    if (inTrade)
        if (tradeDirection == 1 and low <= morningLow)
            strategy.close("Buy Call")
            label.new(bar_index, low, "Exit Call", color=color.red)
            alert("Exit Call: Price fell below stop", alert.freq_once_per_bar_close)
            buyCallCondition := false
            inTrade := false
            tradeDirection := 0
        if (tradeDirection == -1 and high >= morningHigh)
            strategy.close("Buy Put")
            label.new(bar_index, high, "Exit Put", color=color.green)
            alert("Exit Put: Price rose above stop", alert.freq_once_per_bar_close)
            buyPutCondition := false
            inTrade := false
            tradeDirection := 0

// Close all positions at 15:15 and prevent new trades for the rest of the day
if (hour == 15 and minute == 15)
    strategy.close_all()
    inTrade := false
    tradeDirection := 0
    noNewTrades := true
    alert("Close All Positions at 15:15", alert.freq_once_per_bar_close)

// Reset noNewTrades at the start of a new day
if (hour == 11 and minute == 0)
    noNewTrades := false

```

> Detail

https://www.fmz.com/strategy/458267

> Last Modified

2024-07-31 14:16:42
