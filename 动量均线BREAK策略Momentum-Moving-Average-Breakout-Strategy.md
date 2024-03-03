
> Name

动量均线BREAK策略Momentum-Moving-Average-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]  

## 策略原理

该策略融合动量指标和均线的BREAKOUT思路,在动量指标发生连续方向变化且价格突破均线时进行交易。

具体交易逻辑:

1. 计算短周期动量,如5日动量

2. 当当前动量及之前两根动量柱均大于50时,做多信号成立

3. 当价格上穿5日均线时,执行做多

4. 当当前动量及之前两根动量柱均小于50时,做空信号成立 

5. 当价格下穿5日均线时,执行做空

6. 设置固定点数止盈和跟踪止损策略

该策略充分发挥动量指标的趋势判断能力,再与均线突破进行组合,形成高概率的交易信号,追捕短线价格涨跌。

## 策略优势

- 动量连续方向有力判断趋势

- 与均线突破组合,提高信号质量

- 止盈止损策略结合,回撤控制到位

## 策略风险

- 动量连续信号可能滞后

- 需要反复测试参数优化

- 止盈止损设定需要审慎

## 总结

该策略将动量指标和均线BREAK系统有机结合,在保证信号质量的前提下设定合理止盈止损,能有效捕捉短线趋势机会。但参数设置和止损策略优化至关重要。


||

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

[/trans]



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
