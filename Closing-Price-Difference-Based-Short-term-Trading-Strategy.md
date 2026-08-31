
> Name

Closing-Price-Difference-Based-Short-term-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy judges the future price movement by analyzing the difference between closing prices of two consecutive days, aiming to implement short-term trading. The strategy is simple and intuitive, easy to implement, and suitable for short-term traders.

## Strategy Logic

The core logic of this strategy is to compare today's closing price with yesterday's closing price. Specifically:

1. Calculate the difference between today's closing price and yesterday's closing price.  
2. If the difference is greater than the set threshold, then today's price has risen relative to yesterday's, go long.
3. If the difference is less than the negative set threshold, then today's price has fallen relative to yesterday's, go short.  
4. Otherwise, maintain yesterday's position.

The key here is to set a reasonable threshold. If the threshold is too large, it will miss smaller price fluctuations. If the threshold is too small, it will trigger excessive irrational trading due to normal fluctuations. The strategy adopts an adjustable threshold design with a default value of 0.004 and a step of 0.001. Appropriate thresholds can be selected through backtesting based on historical data.

In summary, this strategy captures price changes between two consecutive trading days, judges possible future price trends by filtering out normal fluctuations through thresholds, and thus conducts short-term trading. The strategy idea is simple and intuitive, easy to understand and implement.

## Advantages of the Strategy

- Simple and intuitive idea, easy to understand and implement
- No complex technical indicators, low experience threshold 
- Use closing price, effectively filter out noise, increase signal stability
- Adjustable threshold design allows finding the optimal parameter  
- Suitable for short-term trading, quickly capture price changes
- Can run in various market environments

## Risks of the Strategy

- Probability of price gap in closing price, may miss price changes
- Rely on a single indicator, may miss other important information
- Improper threshold setting will generate excessive false trading signals
- Frequent short-term operations, transaction costs may be higher
- Need close monitoring and timely adjustment of parameters

To address these risks, consider:

1. Combine other indicators, such as trading volume, to enhance signal accuracy
2. Add stop loss logic to control single loss
3. Optimize parameters to improve signal quality
4. Appropriately extend trading cycle to reduce operating frequency 
5. Increase position management to improve profitability

## Optimization Directions

The strategy can be optimized in the following aspects:

1. **Multi-timeframe backtesting** - Use different timeframes (daily, 4-hour, 1-hour, etc.) to backtest parameters and select optimal timeframe and parameters.

2. **Combine volatility indicators** - Add indicators that consider price volatility, such as ATR, to better establish dynamic thresholds.  

3. **Add stop loss logic** - Set reasonable stop loss points to control single loss.

4. **Optimize position management** - Optimize the size of initial positions and add-on rules to increase profitability while ensuring stop loss.

5. **Consider trading costs** - Add trading costs like commissions and slippage in backtesting to be closer to live trading.

6. **Introduce machine learning** - Apply machine learning algorithms to extract more features and build stronger trading signals.

## Conclusion

This strategy judges future price trends based on closing price differences, using a simple and intuitive approach to design short-term trading strategies. The strategy is easy to implement and suitable for short-term operations, but may have some loss risks. Various optimization methods can improve the stability and profitability of the strategy. As a basic strategy, it can provide ideas and references for further research.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.004|Price Difference Threshold repainting results|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-28 00:00:00
end: 2023-09-27 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Daily Close Comparison Strategy (by ChartArt) repainting results", shorttitle="CA_-_Daily_Close_Strat", overlay=false)

// ChartArt's Daily Close Comparison Strategy
//
// Version 1.0
// Idea by ChartArt on February 28, 2016.
//
// This strategy is equal to the very
// popular "ANN Strategy" coded by sirolf2009,
// but without the Artificial Neural Network (ANN).
//
// Main difference besides stripping out the ANN
// is that I use close prices instead of OHLC4 prices.
// And the default threshold is set to 0 instead of 0.0014
// with a step of 0.001 instead of 0.0001.
//
// This strategy goes long if the close of the current day
// is larger than the close price of the last day.
// If the inverse logic is true, the strategy
// goes short (last close larger current close).
//
// This simple strategy does not have any
// stop loss or take profit money management logic.
//
// List of my work: 
// https://www.tradingview.com/u/ChartArt/
// 
//  __             __  ___       __  ___ 
// /  ` |__|  /\  |__)  |   /\  |__)  |  
// \__, |  | /~~\ |  \  |  /~~\ |  \  |  
// 
// 

threshold = input(title="Price Difference Threshold repainting results", type=float, defval=0.004, step=0.001)

getDiff() =>
    yesterday=security(syminfo.tickerid, 'D', close[1])
    today=security(syminfo.tickerid, 'D', close)
    delta=today-yesterday
    percentage=delta/yesterday
    
closeDiff = getDiff()
 
buying = closeDiff > threshold ? true : closeDiff < -threshold ? false : buying[1]

hline(0, title="zero line")

bgcolor(buying ? green : red, transp=25)
plot(closeDiff, color=silver, style=area, transp=75)
plot(closeDiff, color=aqua, title="prediction")

longCondition = buying
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = buying != true
if (shortCondition)
    strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/428082

> Last Modified

2023-09-28 15:08:39
