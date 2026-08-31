
> Name

双均线交叉策略-EMA9-20Dual-Moving-Average-Crossover-Strategy-EMA9-20

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/893c3ac555f6b73125.png)

## Strategy Overview

The Dual Moving Average Crossover Strategy - EMA9/20 is a quantitative trading strategy based on the crossover of two exponential moving averages (EMAs). This strategy uses the 9-day EMA and the 20-day EMA as trading signals, generating buy or sell signals when the two moving averages cross. Additionally, the strategy employs the crossover between the price and the 9-day EMA as an auxiliary signal, as well as a trailing stop to manage trading risk.

## Strategy Principles

The core principle of this strategy is to capture market trends by utilizing the crossover of two moving averages with different periods. When the short-term moving average (9-day EMA) crosses above the long-term moving average (20-day EMA), it indicates a potential upward trend in the market, and the strategy generates a buy signal. Conversely, when the short-term moving average crosses below the long-term moving average, it suggests a potential downward trend, and the strategy generates a sell signal.

In addition to the moving average crossover signals, the strategy also incorporates the crossover between the price and the short-term moving average (9-day EMA) as an auxiliary signal. When the price crosses above the 9-day EMA, it also generates a buy signal, and when the price crosses below the 9-day EMA, it generates a sell signal. This allows for more timely capture of changes in market trends.

To control risk, the strategy employs a trailing stop mechanism. Once a trade enters a profitable state, the trailing stop continuously adjusts the stop-loss position according to price movements until the price breaches the stop-loss level in the opposite direction, thereby locking in profits while limiting potential losses.

## Strategy Advantages

1. Simplicity: The strategy is based on the classic principle of moving average crossovers, making it easy to understand and implement.

2. Trend following: By utilizing the crossover of two moving averages with different periods, the strategy can effectively capture the main trends in the market.

3. Timely stop-loss: The introduction of the trailing stop mechanism allows for timely closing of positions when the trend reverses, controlling downside risk.

4. Parameter flexibility: The parameters of the strategy (such as moving average periods, stop-loss points, etc.) can be optimized and adjusted according to different markets and instruments to adapt to various market conditions.

## Strategy Risks

1. Frequent trading: Since the strategy employs both moving average crossover and price crossover signals, it may lead to a higher trading frequency, thus increasing trading costs.

2. Choppy markets: In choppy or range-bound markets, the strategy may generate more false signals, resulting in reduced profitability.

3. Parameter sensitivity: The performance of the strategy may be sensitive to parameter selection, and different parameters may yield significantly different results.

## Optimization Directions

1. Signal filtering: In addition to the moving average crossover and price crossover signals, introduce other technical indicators (such as RSI, MACD, etc.) as filtering conditions to reduce false signals.

2. Dynamic parameters: Dynamically adjust strategy parameters (such as moving average periods, stop-loss points, etc.) based on factors like market volatility and trend strength to adapt to different market states.

3. Position sizing: Dynamically adjust position sizes based on market trends and signal strength, increasing position size when trend strength is high and reducing position size when trends are unclear or signals are weaker.

4. Multi-instrument adaptation: Expand the strategy to multiple instruments and markets, and through diversification and correlation analysis, reduce overall risk and improve return stability.

## Summary

The Dual Moving Average Crossover Strategy - EMA9/20 is a simple and practical quantitative trading strategy that captures market trends through the crossover of two moving averages with different periods and price crossovers, while using trailing stops to control risk. The strategy has a clear logic, is easy to understand and implement, making it suitable for beginners to learn and use. However, the strategy also has some limitations, such as poor performance in choppy markets and sensitivity to parameter selection. Therefore, in practical application, it is necessary to optimize and improve the strategy according to the specific characteristics of the market and instrument, such as introducing signal filtering, dynamic parameter adjustment, position sizing, and other methods to improve the profitability and stability of the strategy. Overall, the Dual Moving Average Crossover Strategy - EMA9/20 provides a good basic framework for quantitative trading and is worth further research and exploration.




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
strategy(title = "EMAs 9 / 20",
		 shorttitle = '9/20 EMAs', 
		 initial_capital = 1000,
		 overlay = true, 
		 default_qty_type = strategy.fixed,
		 commission_type = strategy.commission.cash_per_contract,
		 commission_value = 0.35,
		 default_qty_value = 1)


int trailOffset = 10
int trailPoints = 15


series float oEma9 = ta.ema(ohlc4, 9)
series float oEma20 = ta.ema(ohlc4, 20)

series bool closeCrossoverEma9 = ta.crossover(close, oEma9)
series bool closeCrossunderEma9 = ta.crossover(close, oEma9)

series bool nineCrossover20 = ta.crossover(oEma9, oEma20)
series bool nineCrossunder20 = ta.crossunder(oEma9, oEma20)

//Entry Exits

if nineCrossover20
    strategy.entry("Long 9Cross20", strategy.long, 2)
else if closeCrossoverEma9
    strategy.entry("Long 9CrossClose", strategy.long, 2)
    strategy.exit("Long 9CrossClose Exit", from_entry = "Long 9CrossClose", trail_points = trailPoints, trail_offset = trailOffset)
else if nineCrossunder20
    strategy.close("Long 9Cross20")
    
    

if nineCrossunder20
    strategy.entry("Short 9Cross20", strategy.short, 2)
else if closeCrossunderEma9
    strategy.entry("Short 9CrossClose", strategy.short, 2)
    strategy.exit("Short 9CrossClose Exit", from_entry = "Short 9CrossClose", trail_points = trailPoints, trail_offset = trailOffset)
else if nineCrossover20
    strategy.close("Short 9Cross20")
    

```

> Detail

https://www.fmz.com/strategy/444007

> Last Modified

2024-03-08 15:22:50
