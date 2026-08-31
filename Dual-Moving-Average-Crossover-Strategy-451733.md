
> Name

Dual-Moving-Average-Crossover-Strategy-451733

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1afceaa164a9b8804b9.png)

#### Overview
The Dual Moving Average Crossover strategy is a classic trend-following trading strategy. It uses two moving averages: a fast-moving average and a slow-moving average. When the fast-moving average crosses above the slow-moving average, it's called a "golden cross", indicating a potential uptrend, and a long position is opened. When the fast-moving average crosses below the slow-moving average, it's called a "death cross", indicating a potential downtrend, and a short position is opened. The strategy code supports the use of Simple Moving Average (SMA) and Exponential Moving Average (EMA), and allows setting stop-loss.

#### Strategy Principle
The core of this strategy is to use the trend characteristics of moving averages and crossover signals to determine the trend direction and entry timing. First, set the periods of the fast-moving average (default 50) and slow-moving average (default 200) through parameters, and choose to use SMA or EMA. Then calculate the two moving averages and determine their crossover situations:
1. When the fast-moving average crosses above the slow-moving average (golden cross), open a long position if there's no current position, and set the stop-loss price (calculated based on stop-loss percentage).
2. When the fast-moving average crosses below the slow-moving average (death cross), open a short position if there's no current position, and set the stop-loss price.
3. If there's an existing long position, close the position when a death cross occurs.
4. If there's an existing short position, close the position when a golden cross occurs.
Open positions based on moving average crossover signals and set stop-loss to capture the medium to long-term price trends in a trend-following manner.

#### Strategy Advantages
1. The logic is simple and clear, easy to understand and implement, and is the foundation of trend-following strategies.
2. By using the crossover of two moving averages with different periods, it can better determine the formation and reversal of trends.
3. It supports both SMA and EMA, which can be flexibly selected.
4. Setting stop-loss controls the risk of loss to a certain extent.
5. Suitable for capturing medium to long-term trends, trend-following style.

#### Strategy Risks
1. Improper parameter selection (such as inappropriate moving average periods) may lead to frequent signals or lagging trend judgment.
2. Fast fluctuating markets may lead to frequent trading and poor performance.
3. When the trend reverses or ends, there may be larger drawdowns.
4. Fixed percentage stop-loss may not control risks well.

#### Strategy Optimization Directions
1. Optimize parameters, including moving average periods, stop-loss percentage, etc., to improve stability and risk-return ratio.
2. Consider introducing volatility-related indicators such as ATR to dynamically adjust stop-loss positions.
3. Confirm the trend before opening a position instead of immediately opening at crossover, or add other trend confirmation indicators to assist judgment and improve the accuracy of trend capture.
4. Can be improved through money management strategies such as adding or reducing positions.
5. Consider combining with other signals to form a multi-factor strategy.

#### Summary
The Dual Moving Average Crossover strategy is a simple and classic trend-following strategy that determines the trend direction and entry/exit timing based on the crossover of two moving averages with different periods, suitable for capturing medium to long-term trends. However, fixed parameters may perform unstably in changing market environments and need further optimization and improvement, such as optimizing parameters, improving stop-loss, introducing other signals, etc., to become a relatively robust trading strategy. This strategy can serve as the foundation for trend strategies and be continuously improved and expanded upon.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-11 00:00:00
end: 2024-05-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//==============================================================================
// A baseline strategy with a well known concept, golden cross & death cross.
// Support for both Simple & Exponential moving averages.
// Support for long & short stop losses as a percentage.:well
//==============================================================================
strategy("Basic Moving Average Crosses", overlay=true)

//------------------------------------------------------------------------------
// configuration
//------------------------------------------------------------------------------
maQuickLength = input(50, title="Quick MA Length") 
maSlowLength  = input(200, title="Quick MA Length") 
useSma        = input(true, title="Use SMA? If false, EMA is used.")

maQuick = useSma ? ta.sma(close, maQuickLength) : ta.ema(close, maQuickLength)
maSlow  = useSma ? ta.sma(close, maSlowLength) : ta.ema(close, maSlowLength)

stop_loss_percentage = input(2.0, title="Stop Loss (%)")

var float longStopLevel = na
var float shortStopLevel = na

bool isGoldenCross = ta.crossover(maQuick, maSlow)
bool isDeathCross  = ta.crossunder(maQuick, maSlow)

//------------------------------------------------------------------------------
// position opening logic
//------------------------------------------------------------------------------

if(strategy.position_size == 0)
    // Golden cross, enter a long position
    if(isGoldenCross)
        strategy.entry("Buy", strategy.long)
        longStopLevel := close - close * stop_loss_percentage/100.0
        strategy.exit("StopLossLong", "Buy", stop=longStopLevel)
    // Death cross, enter short position
    else if(isDeathCross)
        strategy.entry("Sell", strategy.short)
        shortStopLevel := close + close * stop_loss_percentage/100.0
        strategy.exit("StopLossShort", "Sell", stop=shortStopLevel)

//------------------------------------------------------------------------------
// position closing logic
//------------------------------------------------------------------------------
else
    // Close long position on death cross
    if(strategy.position_size > 0 and isDeathCross)
        strategy.close("Buy")
    
    // Close short position on golden cross
    else if(strategy.position_size < 0 and isGoldenCross)
        strategy.close("Sell")

//------------------------------------------------------------------------------
// ploting
//------------------------------------------------------------------------------
plot(maQuick, color=color.yellow)
plot(maSlow, color=color.blue)
```

> Detail

https://www.fmz.com/strategy/451733

> Last Modified

2024-05-17 15:48:04
