
> Name

Trend-Following-Strategy-Based-on-Renko-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e80092d94d2c9fdbc0.png)

### Overview

This is a trading strategy that utilizes Renko moving averages for trend identification and tracking. The core logic of this strategy is to go long or short when the price breaks through the 22-period HL2 moving average on the Renko bars. Meanwhile, this strategy also sets risk management mechanisms like stop loss, take profit and trailing stop.

### Strategy Principle 

When the Renko bar closing price breaks above the 22-period HL2 moving average, go long. When the Renko bar closing price breaks below the 22-period HL2 moving average, go short. By judging the relationship between price and moving average, it captures the trend direction.

The HL2 moving average (Highest High + Lowest Low)/2) is a trend-following moving average, which incorporates the information of highest high and lowest low prices to more accurately determine the trend direction. 22 is an empirical value to balance the sensitivity of the moving average.

In addition, the strategy also sets the restriction of only opening positions during specific trading sessions to avoid potential huge market swings.

### Advantage Analysis

This is a relatively simple and intuitive trend-following strategy with the pros below:

1. Using Renko bars as trading signals can effectively filter out market noise and capture the main trend.

2. The HL2 moving average combines highest and lowest price information for more reliable trend judgment. 

3. Setting fixed stop loss and take profit points can well control the risk of single trades.

4. Trailing stop can lock in profits along the trend development to realize trend tracking.

5. Limiting trading sessions can alleviate the impact of huge swings to some extent.

### Risk Analysis 

There are also some risks with this strategy:

1. Moving average strategies tend to generate more false signals.  

2. It cannot effectively cope with the gap risk caused by sudden events.

3. Improper Renko settings may miss better trading opportunities.  

4. Fixed stop loss and take profit cannot adapt to market changes.

### Optimization Directions

The strategy can be optimized in the following aspects:

1. Add other indicators or conditions to filter out false signals, e.g. volume, oscillators etc.

2. Test moving averages with different parameters to find out the most suitable period.

3. The box size of Renko can also be tested and optimized for the best parameter.  

4. Add adaptive stop loss mechanism based on volatility.

5. Test different trading session settings to optimize this condition.

### Conclusion   

In conclusion, this is a simple and practical strategy for trend identification and tracking using Renko moving average. It has intuitive trading logic and risk control mechanisms, suitable for traders seeking steady returns. But there is still room for improvement by parameter optimization, adding filter conditions, adaptive stop loss etc. to obtain better strategy performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|300|Take Profit|
|v_input_2|200|Stop Loss|
|v_input_3|200|Trailing Stop|
|v_input_4|false|Trailing Stop Offset|
|v_input_5|0500-1600|My Defined Hours|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("HL2 - 22 Cross", overlay=true)

// Stops and Profit inputs
inpTakeProfit   = input(defval = 300, title = "Take Profit", minval = 0)
inpStopLoss     = input(defval = 200, title = "Stop Loss", minval = 0)
inpTrailStop    = input(defval = 200, title = "Trailing Stop", minval = 0)
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Offset", minval = 0)

// Stops and Profit Targets
useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na

//Specific Time to Trade
myspecifictradingtimes = input('0500-1600',  title="My Defined Hours")

longCondition1 = crossover(close, ema(hl2, 22))
longCondition2 = time(timeframe.period, myspecifictradingtimes) != 0
if longCondition1 and longCondition2
    strategy.entry("Long", strategy.long, comment="LongEntry")

shortCondition1 = crossunder(close, ema(hl2, 22))
shortCondition2 = time(timeframe.period, myspecifictradingtimes) != 0
if shortCondition1 and shortCondition2
    strategy.entry("Short", strategy.short, comment="ShortEntry")

strategy.exit("Exit Long", from_entry = "Long", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
strategy.exit("Exit Short", from_entry = "Short", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
```

> Detail

https://www.fmz.com/strategy/442410

> Last Modified

2024-02-21 16:36:00
