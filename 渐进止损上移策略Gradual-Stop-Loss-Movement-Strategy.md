
> Name

渐进止损上移策略Gradual-Stop-Loss-Movement-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13e2d993e763ae4bae9.png)


## Overview

The gradual stop loss movement strategy is a simple but very useful strategy that reminds you to gradually move up the stop loss as prices rise.

## Principles 

The strategy first sets the initial stop loss at 95% of the entry price when taking a long position. It then defines multiple higher stop loss levels at 100%, 105%, 110% etc of the entry price. The strategy checks if the lowest low of the past 7 days has broken through the previous stop loss level. If so, the stop loss is set to that higher level. Thus as prices rise, the stop loss also gradually moves up.

Specifically, the strategy defines 8 stop loss levels at 95%, 100%, 105%, 110%, 115%, 120%, 125%, 130% of the entry price. It checks if the lowest low of the past 7 days is above the next stop loss level. If so, the stop loss is set to that higher level. 

For example, if the entry price is $100, the initial stop loss is $95. If the lowest low of the past 7 days rises to $105, above the next stop loss of $100, the stop loss is set to $100. If it continues to rise to $115, the stop loss is set to $105, and so on.

As prices rise, the stop loss moves up gradually as well, realizing a gradual stop loss to protect some profits. It also avoids the over-optimistic results of regular trailing stops in backtests.

## Advantages

The biggest advantage of this gradual stop loss strategy is that it can move up the stop loss gradually as prices rise, to protect some profits and avoid the stop loss being hit and losing all profits immediately.

Compared to regular trailing stops, the gradual stop loss does not produce over-optimistic results in backtests. Because regular trailing stops will move down the stop loss immediately when prices pull back, skipping the drawdown process and going directly into the next rise. But the drawdown cannot be skipped in actual trading. This makes regular trailing stops unable to achieve the same results in live trading as in backtests.

The gradual stop loss strategy moves up the stop loss step-by-step. So it can reflect the actual process of stop loss movement in live trading more realistically in backtests, avoiding over-optimistic results.

Also, this strategy provides prompts for when to modify the stop loss, letting traders modify it manually. Many exchanges do not offer trailing stop loss orders, so this strategy is more universal and can be applied to different trading platforms.

## Risks

The biggest risk of this strategy is that the stop loss movement may not keep up with extremely fast price rises. If prices rise sharply in a very short period, exceeding multiple stop loss levels, the stop loss can only move up slowly, unable to protect profits in a timely manner.

Another risk is that traders may miss or delay the timing of stop loss modifications. The strategy only provides prompts for when to modify the stop loss. The actual adjustment still relies on manual operations of the trader. Neglecting or delaying the modifications may result in the stop loss being hit.

## Improvements

The strategy can be improved in the following ways:

1. Optimize the stop loss percentage settings to better suit the volatility of specific trading instruments.

2. Optimize the lookback period parameter for the lowest low, such as 5 or 10 days, to adapt to different volatilities. 

3. Increase the number of stop loss levels for a more gradual movement.

4. Add logic to also move up a trailing take profit level.

5. Automate the stop loss modification operations to reduce difficulty and delay risks.

6. Add alerts for stop loss breaches to avoid traders missing such events.

## Conclusion

The gradual stop loss movement strategy is a simple yet useful strategy idea. It can move up the stop loss gradually as prices rise to protect profits while avoiding over-optimistic backtest results. Compared to regular trailing stops, it is more suitable for actual trading and easier to implement across platforms. By optimizing parameters like stop loss percentages, lowest low lookback periods, number of stop levels etc, it can be adapted to different trading instruments. Combined with automated stop loss execution and trailing take profit, it can further reduce operational difficulty and risks.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-13 00:00:00
end: 2023-11-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

///Moving Stops Script///
///by ShanghaiCryto///

///A simple, but very useful, script that reminds you to move up your stop losses as price trends upwards. ///
///The sma entry is just stock code to demonstrate how the stop works.///
///Doesn't throw off your backtesting the way a trailing stop does.///


strategy("Move Up Stops", overlay=true)

longCondition = crossover(sma(close, 14), sma(close, 28))
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

first_stop = strategy.position_avg_price * .95
second_stop = strategy.position_avg_price 
third_stop = strategy.position_avg_price * 1.05
fourth_stop = strategy.position_avg_price * 1.1
fifth_stop = strategy.position_avg_price * 1.15
sixth_stop = strategy.position_avg_price * 1.2
seventh_stop = strategy.position_avg_price * 1.25
eighth_stop = strategy.position_avg_price * 1.3

move_trigger = lowest(low,7)

first_check = na
first_check := move_trigger > second_stop ? second_stop : first_stop

second_check = na
second_check := move_trigger > third_stop ? third_stop : first_check

third_check = na
third_check := move_trigger > fourth_stop ? fourth_stop : second_check

fourth_check = na
fourth_check := move_trigger > fifth_stop ? fifth_stop : third_check

fifth_check = na
fifth_check := move_trigger > sixth_stop ? sixth_stop : fourth_check

sixth_check = na
sixth_check := move_trigger > seventh_stop ? seventh_stop : fifth_check

stop_level = na
stop_level := move_trigger > eighth_stop ? eighth_stop : sixth_check

strategy.exit("Stop Loss","My Long Entry Id", stop=stop_level)

plot(stop_level, color=red)
```

> Detail

https://www.fmz.com/strategy/431964

> Last Modified

2023-11-13 17:30:28
