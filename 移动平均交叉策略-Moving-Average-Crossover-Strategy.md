
> Name

移动平均交叉策略-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12de859aee26aa2261d.png)


#### Overview
This strategy uses two moving averages (MA) to generate trading signals. When the shorter-period MA crosses above the longer-period MA, a buy signal is generated; when the shorter-period MA crosses below the longer-period MA, a sell signal is generated. The strategy also sets a trading time period (8 AM to 20 PM UTC) and a profit target (150 points).

#### Strategy Principle
1. Calculate two moving averages with different periods (default is 5 and 20 periods).
2. Determine if the shorter-period MA crosses above/below the longer-period MA, which serves as the buy/sell signal.
3. Set the trading time period from 8 AM to 20 PM UTC, and only trade within this time period.
4. Determine if the most recent 4 candles have closed above/below the MA to confirm the trend.
5. If the buy/sell conditions are met, open a position and set a profit target of 150 points.

#### Strategy Advantages
1. Using two MAs with different periods can effectively capture trends, suitable for trending markets.
2. Setting a trading time period can avoid trading during times of low liquidity, reducing risk.
3. Confirming the trend by checking if the most recent 4 candles have closed above/below the MA can improve signal reliability.
4. Setting a fixed profit target can effectively lock in profits and control risk.

#### Strategy Risks
1. In choppy markets, this strategy may generate frequent false signals, leading to losses.
2. The fixed profit target may limit the strategy's profit potential.
3. The strategy does not set a stop loss, which may face significant risk when the market reverses rapidly.

#### Strategy Optimization Directions
1. Consider incorporating more technical indicators, such as RSI and MACD, to improve signal reliability.
2. Optimize the setting of profit target and stop loss, such as using dynamic profit target and stop loss or ATR-based profit target and stop loss.
3. Combine market microstructure information, such as order flow, for secondary confirmation of trading signals.
4. Adopt different parameter settings for different market states (trending/choppy) to improve the strategy's adaptability.

#### Summary
This strategy generates trading signals based on the crossover of two moving averages with different periods, suitable for trending markets. By setting a trading time period and fixed profit target, it can control risk to a certain extent. However, the strategy may not perform well in choppy markets, and the fixed profit target may limit the strategy's profit potential. In the future, one can consider incorporating more technical indicators, optimizing the setting of profit target and stop loss, combining market microstructure information, and adopting different parameter settings for different market states to optimize this strategy.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|First Moving Average Periods|
|v_input_2|20|Second Moving Average Periods|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-01 00:00:00
end: 2024-03-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Moving Average Crossover Strategy", overlay=true)

// User-defined moving average periods
ma1Periods = input(5, title="First Moving Average Periods")
ma2Periods = input(20, title="Second Moving Average Periods")

// Calculate moving averages
ma1 = sma(close, ma1Periods)
ma2 = sma(close, ma2Periods)

// Plot moving averages
plot(ma1, color=color.red, linewidth=2, title="First Moving Average")
plot(ma2, color=color.blue, linewidth=2, title="Second Moving Average")

// Detect crossovers and crossunders
bullishCross = crossover(ma1, ma2)
bearishCross = crossunder(ma1, ma2)

// Define trading hours (8 AM to 2 PM UTC)
startHour = 8
endHour = 20
utcHour = hour(time, "UTC")
isMarketOpen = true

// Define profit target
profitTarget = 150

// Check if the price has closed above/below the MA for the past 4 bars
aboveMa = close[4] > ma1[4] and close[3] > ma1[3] and close[2] > ma1[2] and close[1] > ma1[1]
belowMa = close[4] < ma1[4] and close[3] < ma1[3] and close[2] < ma1[2] and close[1] < ma1[1]

// Create buy and sell signals
if (bullishCross and isMarketOpen and aboveMa)
    strategy.entry("Buy", strategy.long)
    strategy.exit("Sell", "Buy", profit=profitTarget)
if (bearishCross and isMarketOpen and belowMa)
    strategy.entry("Sell", strategy.short)
    strategy.exit("Cover", "Sell", profit=profitTarget)

// Plot shapes on crossovers
plotshape(series=bullishCross and isMarketOpen and aboveMa, location=location.belowbar, color=color.green, style=shape.labelup, text="Buy")
plotshape(series=bearishCross and isMarketOpen and belowMa, location=location.abovebar, color=color.red, style=shape.labeldown, text="Sell")

```

> Detail

https://www.fmz.com/strategy/449969

> Last Modified

2024-04-30 17:33:09
