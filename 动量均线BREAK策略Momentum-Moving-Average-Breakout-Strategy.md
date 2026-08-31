
> Name

动量均线BREAK策略Momentum-Moving-Average-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description



## Strategy Logic

This strategy combines momentum indicators with moving average breakouts, entering trades when momentum aligns in a direction and price breaks the MA. 

The trading logic is:

1. Compute short-term momentum, such as 5-day momentum 

2. A long signal triggers when current and prior 2 momentum bars are above 50

3. Go long when price breaks above 5-day MA

4. A short signal triggers when current and prior 2 momentum bars are below 50 

5. Go short when price breaks below 5-day MA

6. Use fixed profit target and trailing stop loss

The strategy capitalizes on momentum strength for trend identification, combining it with MA breakouts for high-probability signals to capture short-term price swings.

## Advantages

- Momentum directionality strongly defines trend

- MA breakout improves signal quality 

- Profit target and stop loss combined

## Risks

- Consecutive momentum can lag 

- Requires iterative parameter optimization

- Profit targets and stops need prudence

## Summary

This strategy synergizes momentum and MA breakout systems with prudent profit taking and risk controls. But parameter tuning and stop loss optimization are crucial for real-world effectiveness.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-09-13 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// strategy("BTC MOM EMA V1", overlay=true)

longCondition = ta.mom(close,5) > 50 and ta.mom(close[1],5) > 50 and ta.mom(close[2],5) > 50 and close > ta.ema(close,5)
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)
    strategy.exit("My Long Entry Id", profit=1000,trail_points=60)

shortCondition = ta.mom(close,5) < 50 and ta.mom(close[1],5) < 50 and ta.mom(close[2],5) < 50 and close < ta.ema(close,5)
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
    strategy.exit("My Short Entry Id", profit=1000,trail_points=60)
```

> Detail

https://www.fmz.com/strategy/426794

> Last Modified

2023-09-14 16:06:41
