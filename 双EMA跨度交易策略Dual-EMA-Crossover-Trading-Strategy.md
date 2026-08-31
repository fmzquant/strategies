
> Name

双EMA跨度交易策略Dual-EMA-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

The dual EMA crossover trading strategy is a trend following strategy that uses the crossover of two EMAs of different lengths to determine market trend and make trades. This simple and straightforward strategy can effectively track medium- to long-term trends, making it very suitable for swing traders.

## Strategy Logic

The strategy mainly uses the values and crossover of a short-term and long-term EMA to determine trend direction. It first calculates a short-term EMA (e.g. 13 periods) and a long-term EMA (e.g. 26 periods), then computes the percentage crossover between the two EMAs. If the short EMA is above the long EMA and the crossover is larger than a threshold (e.g. 5%), it signals an upward trend and long trades are taken. If the short EMA is below the long EMA and the crossover is larger than the threshold, it signals a downward trend and short trades are taken. Trades are closed when price crosses back above or below the short EMA. 

The key logic is:

1. Calculate short-term and long-term EMAs
2. Check if short EMA is above or below long EMA 
3. Compute percentage crossover between the two EMAs
4. Determine trend direction for long or short trades
5. Close trades when price crosses back the short EMA

This allows the strategy to effectively track medium- to long-term trends and switch direction when the trend changes. The crossover threshold also avoids unnecessary trades during non-trending periods.

## Advantages

- Simple and effective for tracking long-term trends
- EMAs help filter out short-term market noise
- Configurable EMA periods and crossover threshold for flexibility
- Crossover threshold ensures trades only when trend is strong
- Short EMA breakout for stop loss helps manage risk

## Risks and Mitigations

- Unable to exit before trend reversal, larger drawdowns
- Can get whipsawed during range-bound price action
- Need to set suitable EMA periods and threshold per instrument  

Risks can be reduced by:

1. Adding filters to identify trend reversal signals for early exits
2. Increasing trend filter rules to avoid trading range-bound action
3. Optimizing EMA periods and threshold for each instrument

## Enhancement Opportunities

The strategy can be enhanced in areas like:

1. Parameter optimization via backtesting to find optimal EMA periods and threshold

2. Trend filtering using additional indicators like MACD, Bollinger Bands to avoid whipsaws

3. Stop loss strategies like trailing stops or time-based stops to limit losses

4. Profit taking by moving stop loss to lock in partial profits after hits

5. Quantitative optimization using machine learning to auto-tune parameters and filters

6. Portfolio optimization by combining with non-correlated strategies to lower drawdown and increase robustness

Through parameter optimization, better filters, stop loss, profit taking, and quantitative & portfolio optimization, the strategy can be made more robust, adaptive, and scientifically effective.

## Conclusion

The dual EMA crossover is a simple and direct trend following strategy suitable for swing trading. It only requires two EMAs to determine trend direction, ideal for medium- to long-term trend trading. The strategy can also be enhanced through parameter tuning, better filters, stop loss, and other quantitative optimizations to make it more robust. Easy to implement and optimize, it is a recommended trend trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.95|diffMinimum|
|v_input_2|13|Small EMA|
|v_input_3|26|Long EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-08-23 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("2-EMA Strategy", overlay=true, initial_capital=100, currency="USD", default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.075)

diffMinimum = input(0.95, step=0.01)

small_ema = input(13, title="Small EMA")
long_ema = input(26, title="Long EMA")

ema1 = ema(close, small_ema)
ema2 = ema(close, long_ema)


orderCondition = ema1 > ema2?((ema1/ema2)*100)-100 > diffMinimum:((ema2/ema1)*100)-100 > diffMinimum

longCondition = close > ema1 and ema1 > ema2
if (longCondition and orderCondition)
    strategy.entry("Long", strategy.long)

shortCondition = close < ema1 and ema1 < ema2
if (shortCondition and orderCondition)
    strategy.entry("Short", strategy.short)
    
strategy.close("Short", when=close > ema1)
strategy.close("Long", when=close < ema1)
    
plot(ema(close, small_ema), title="EMA 1", color=green, transp=0, linewidth=2)
plot(ema(close, long_ema), title="EMA 2", color=orange, transp=0, linewidth=2)
```

> Detail

https://www.fmz.com/strategy/427290

> Last Modified

2023-09-19 19:36:03
