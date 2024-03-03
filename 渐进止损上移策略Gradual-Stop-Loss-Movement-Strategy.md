
> Name

渐进止损上移策略Gradual-Stop-Loss-Movement-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13e2d993e763ae4bae9.png)

[trans]

## 概述

渐进止损上移策略是一个简单但非常实用的策略,它可以在价格上涨时提醒您逐步上移止损位。

## 原理

该策略首先在长仓入场时设置初始止损位为入场价的95%。然后它会定义多个更高的止损位,分别为入场价的100%、105%、110%等。策略会检查过去7天的最低价是否突破上一个止损位,如果突破,则把止损位设置为该更高的止损位。这样随着价格上涨,止损位也会逐步上移。

具体来说,策略会定义8个止损位,分别是入场价的95%、100%、105%、110%、115%、120%、125%、130%。它会检查过去7天的最低价是否高于下一个止损位,如果是,则把止损位设置为该更高的止损位。

举例来说,如果入场价是100美元,则初始止损位是95美元。如果最近7天最低价上涨到了105美元,高于下一个止损位100美元,则把止损位设置为100美元。如果继续上涨到115美元,则将止损位设置为105美元,以此类推。

这样随着价格上涨,止损位也会不断上移,实现渐进止损,保护了部分利润。同时避免了普通跟踪止损在回测中产生的过于乐观的效果。

## 优势

这种渐进止损策略最大的优势是可以随着价格上涨逐步上移止损位,保护部分利润,避免止损被突破然后直接亏损全部利润。

相比普通的跟踪止损,渐进止损在回测时不会产生过于乐观的结果。因为普通跟踪止损会在价格出现回撤时立即下移止损位,从而跳过了回撤过程直接进入下一次上涨。但实际交易中是无法跳过回撤过程的。这会导致普通跟踪止损策略在实际交易中无法达到回测的效果。

而渐进止损策略因为止损位是逐步上移的,所以在回测中能更真实地反映实际交易时止损位移动的过程,避免产生过于乐观的结果。

此外,该策略提供的是止损修改的时机提示,让交易者自己动手修改止损位。许多交易所不提供跟踪止损功能,所以这种策略更具有通用性,可以广泛应用到不同的交易平台。

## 风险

该策略最大的风险是止损位上移速度可能跟不上极快的价格上涨。如果价格在很短时间内剧烈上涨,超过多个止损位,则止损位只能缓慢上移,无法及时保护利润。

另一个风险是交易者可能错过或延迟修改止损位的时机。该策略仅提供止损修改的时机提示,具体止损位调整还需交易者自己动手操作。如果交易者疏忽没有及时修改,或者修改操作延迟,都可能导致止损被突破。

## 优化

该策略可以通过以下方式进行优化:

1. 优化止损位的百分比设置,使其更符合具体交易品种的波动情况。

2. 优化查看最低价周期参数,例如改为查看最近5天或10天的最低价,以适应不同品种的波动频率。

3. 增加止损位数量,使止损位上移更加渐进。

4. 添加移动止盈位的逻辑,让止盈位也能逐步上移。

5. 将止损修改操作自动执行,无需人工参与,减少操作难度和延迟风险。

6. 添加对突破止损的事件提醒,避免交易者疏忽止损被突破的情况。

## 总结

渐进止损上移策略是一个简单实用的策略思想,它可以随着价格上涨逐步上移止损位,在保护利润的同时避免产生过于乐观的模拟交易结果。与普通跟踪止损相比,它更适合实际交易环境,也更容易在不同交易平台上应用。通过对止损位百分比、最低价参数、止损数量等的优化,可以使该策略更好地适应不同交易品种。结合移动止盈和止损执行自动化,可以进一步降低操作难度和风险。
||

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

[/trans]



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
