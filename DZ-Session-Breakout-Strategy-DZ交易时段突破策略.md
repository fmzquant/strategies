
> Name

DZ-Session-Breakout-Strategy-DZ交易时段突破策略

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/174fa3723314e77ac52.png)


#### Overview
The DZ London Session Breakout Strategy is a quantitative trading strategy based on breakouts during the London trading session. The main idea of the strategy is to capture breakout opportunities within the London trading hours by determining whether the price breaks above or below previous highs or lows. The strategy checks if the current time is within the specified London trading session and then determines if the price has broken out of the current trading day's, period's, or week's high or low price. If a breakout occurs within the specified time and a new low or high is formed, the strategy will enter a corresponding long or short trade.

#### Strategy Principle
The core principle of the DZ London Session Breakout Strategy is based on breakout trading during the London trading session. As one of the world's largest forex trading centers, London has a huge trading volume and high market volatility. The strategy sets the start and end times of the London trading session and determines whether the current time is within that session. Then, the strategy retrieves the high and low prices of the current trading day, period, and week to determine if the price has broken through these key price levels. If a breakout occurs and a new low or high is formed on the 1-minute chart, it is considered a potential trading opportunity. The strategy will enter a corresponding long or short trade based on the breakout direction.

#### Strategy Advantages
1. Based on the London trading session: London is one of the world's largest forex trading centers, with huge trading volumes and high market volatility. Trading during this session can capture more trading opportunities.
2. Multi-timeframe analysis: The strategy comprehensively considers the high and low prices of the current trading day, period, and week, providing more comprehensive market information to help make more accurate trading decisions.
3. Breakout trading: The strategy trades based on price breakouts of key levels, allowing it to capture strong market trends with potentially large profit potential.
4. New high/low confirmation: After a breakout occurs, the strategy further determines if a new low or high has formed, further confirming the validity of the trend and reducing the risk of false breakouts.

#### Strategy Risks
1. London trading session volatility risk: Although the London trading session has huge trading volumes, it also comes with high volatility risk. The market may experience sharp fluctuations, leading to increased trading risks.
2. False breakout risk: The strategy trades based on price breakouts of key levels, but sometimes false breakouts may occur, where the price briefly breaks out and then quickly retreats, resulting in trading losses.
3. Parameter setting risk: The performance of the strategy is influenced by parameter settings, such as the start and end times of the London trading session. If the parameters are set improperly, trading opportunities may be missed, or more trading noise may be generated.

#### Strategy Optimization Directions
1. Introduce more filtering conditions: To reduce the risk of false breakouts, more filtering conditions can be introduced, such as volume, volatility, and other indicators to confirm the validity of the breakout.
2. Dynamic parameter adjustment: The strategy's parameters, such as the start and end times of the London trading session, can be dynamically adjusted based on changes in market conditions to adapt to different market environments.
3. Combine with other technical indicators: Other technical indicators, such as moving averages, oscillators, etc., can be combined with the breakout strategy to provide more confirmation of trading signals and improve trading accuracy.
4. Incorporate risk management: Appropriate risk management measures, such as setting stop-losses, take-profits, and position management, can be incorporated into the strategy to control potential trading risks.

#### Summary
The DZ London Session Breakout Strategy is a quantitative trading strategy based on breakouts during the London trading session. The strategy utilizes the high trading volume and volatility of the London trading session to capture potential trading opportunities by determining if the price breaks through key price levels. The strategy comprehensively considers the high and low prices of multiple timeframes and confirms new highs and lows to filter out false breakouts. Although the strategy has certain advantages, it also faces risks such as high volatility during the London trading session, false breakouts, and parameter setting risks. To further optimize the strategy, consideration can be given to introducing more filtering conditions, dynamically adjusting parameters, combining with other technical indicators, and incorporating appropriate risk management measures. Overall, the DZ London Session Breakout Strategy provides quantitative traders with a trading approach based on time and price breakouts, but careful risk assessment and continuous parameter optimization are required in practical application.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-14 00:00:00
end: 2024-05-13 00:00:00
period: 6h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("DZ Strategy ICT", overlay=true)

// Input parameters
london_open_hour = input(13, "London Open Hour")
london_open_minute = input(30, "London Open Minute")
london_close_hour = input(16, "London Close Hour")

// Get current datetime
hour = hour(time)
minute = minute(time)

// Get session high, daily high, and weekly high
sessionHigh = request.security(syminfo.tickerid, "D", high)
dailyHigh = request.security(syminfo.tickerid, "D", high)
weeklyHigh = request.security(syminfo.tickerid, "W", high)

// Condition for being in the specified time range
inLondonTimeRange = (hour >= london_open_hour and hour < london_close_hour) or (hour == london_close_hour and minute == 0)

// Check for breakout above session, daily, or weekly high
breakoutAboveSessionHigh = high > sessionHigh
breakoutAboveDailyHigh = high > dailyHigh
breakoutAboveWeeklyHigh = high > weeklyHigh

// Check for breakout below session, daily, or weekly high
breakoutBelowSessionHigh = low < sessionHigh
breakoutBelowDailyHigh = low < dailyHigh
breakoutBelowWeeklyHigh = low < weeklyHigh

// Check for new lower low or higher high on 1-minute chart
newLowerLow = ta.lowest(low, 10)[1] > low
newHigherHigh = ta.highest(high, 10)[1] < high

// Set entry point based on imbalance
imbalanceLevel = low[1] // Placeholder for imbalance level, adjust this as needed

// Entry conditions for short position
if (inLondonTimeRange and (breakoutAboveSessionHigh or breakoutAboveDailyHigh or breakoutAboveWeeklyHigh) and newLowerLow)
    strategy.entry("Short Entry", strategy.short)

// Entry conditions for long position
if (inLondonTimeRange and (breakoutBelowSessionHigh or breakoutBelowDailyHigh or breakoutBelowWeeklyHigh) and newHigherHigh)
    strategy.entry("Long Entry", strategy.long)

```

> Detail

https://www.fmz.com/strategy/451411

> Last Modified

2024-05-14 17:24:33
