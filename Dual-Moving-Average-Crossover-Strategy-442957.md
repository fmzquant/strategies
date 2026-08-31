
> Name

Dual-Moving-Average-Crossover-Strategy-442957

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1155b1ddb5d164aa192.png)

## Overview
This strategy is a typical moving average crossover strategy that uses two sets of moving averages, one fast and one slow. When the fast moving average crosses over the slow moving average, a buy signal is generated. When the fast crosses below the slow, a sell signal is generated. The strategy uses both EMA and SMA for the moving averages, with EMAs as the fast lines and SMAs as the slow lines. Using multiple moving averages can help filter out false signals and improve reliability. 

## Strategy Logic

The core logic relies on crossovers between fast and slow moving average lines to determine entries and exits.

Specifically, two sets of fast and slow moving averages are calculated:

- 1st Fast EMA, length 8 days
- 2nd Fast EMA, length 21 days
- 1st Slow SMA, length 50 days 
- 2nd Slow SMA, length 200 days

Crossovers are then checked between the fast EMAs and slow SMAs:

- If 8-day EMA crosses over 50-day SMA, golden cross signal
- If 8-day EMA crosses below 50-day SMA, death cross signal

To filter false signals, a second EMA/SMA crossover is required for confirmation:

- Only when 21-day EMA also crosses over/under 50-day SMA, trading signal is triggered

By requiring two fast/slow MA crossovers, many false signals can be filtered out and reliability improved.

When buy signal triggers, go long. When sell signal triggers, go short.  

The strategy also sets profit taking and stop loss based on input percentage from entry price once in a position.

## Advantage Analysis

The advantages of this strategy include:

1. Dual MA design filters false signals and improves accuracy 
2. Combination of EMA and SMA utilizes EMA's sensitivity and SMA's smoothness
3. Take profit and stop loss lock in profits and control risks
4. Simple logic easy to understand and modify
5. Customizable parameters suit different market environments

## Risk Analysis

Risks of the strategy:

1. MA strats tend to produce lots of small wins/losses in choppy markets
2. Can face large losses in strong trending markets
3. Poor parameter tuning also leads to underperformance

To control risks:

1. Adjust parameters for different market conditions
2. Optimize based on backtests to fit target market
3. Use stop loss to limit loss size

## Improvement Directions

The strategy can be further optimized by:

1. Testing more fast/slow MA combinations to find best
2. Using machine learning or genetic algos to auto optimize
3. Adding trend filter to avoid counter-trend trades 
4. Adding trailing stop loss to lock in profits
5. Incorporating volume or volatility filters to confirm signals
6. Combining with other strats/products to utilize low correlation

## Conclusion
In summary, the dual MA crossover strategy generates signals with fast/slow MA crosses, sets take profit and stop loss to control risks, and is simple, intuitive and easy to implement. The parameters can be tuned and combined with other indicators for better performance. It has great utility in quantitative trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|8|Length|
|v_input_2|true|EMA|
|v_input_3|21|Length|
|v_input_4|true|EMA|
|v_input_5|50|Length|
|v_input_6|true|SMA|
|v_input_7|200|Length|
|v_input_8|true|SMA|
|v_input_9|8|Profit/lost %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-20 00:00:00
end: 2024-02-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © JMLSlop

//@version=4

src = close
strategy("Crossover moving averages", shorttitle="Cross MA-EMA", overlay=true, calc_on_order_fills=false)

// first fast EMA
len = input(8, "Length", type=input.integer, minval=1)
doma1 = input(true, title="EMA")
out1 = ema(src, len) 

//Second fast EMA
len2 = input(21, minval=1, title="Length")
doma2 = input(true, title="EMA")
out2 = ema(src, len2)

//First slow MA
len3 = input(50, minval=1, title="Length")
doma3 = input(true, title="SMA")
out3 = sma(src, len3)

//Second slow MA
len4 = input(200, minval=1, title="Length")
doma4 = input(true, title="SMA")
out4 = sma(src, len4)

// Profit
profit = input(8, "Profit/lost %", type=input.float, minval=1) * 0.01


plot(doma1 and out1 ? out1: na, color=color.blue, linewidth=1, title="1st EMA")
plot(doma2 and out2 ? out2: na, color=color.red, linewidth=1, title="2nd EMA")
plot(doma3 and out3 ? out3: na, color=color.green, linewidth=2, title="1st MA")
plot(doma4 and out4 ? out4: na, color=color.orange, linewidth=3, title="2nd MA")

// Orders config
takeProfitPrice =
     (strategy.position_size > 0) ? strategy.position_avg_price + open*profit : (strategy.position_size < 0) ? strategy.position_avg_price - (open*profit) : na

longStopPrice  = strategy.position_avg_price * (1 - profit)
shortStopPrice = strategy.position_avg_price * (1 + profit)

longCondition2 = (out2>out3 and (crossover(out1, out4) or crossover(out1[1], out4[1]) or crossover(out1[2], out4[2]) or (crossover(out1[3], out4[3]))) or (out2>out3 and (crossover(out1, out3) or crossover(out1[1], out3[1]) or crossover(out1[2], out3[2]) or crossover(out1[3], out3[3]))))
if (longCondition2)
    strategy.entry("Enter L", strategy.long)

shortCondition2 = (out2<out3 and (crossunder(out1, out4) or crossunder(out1[1], out4[1]) or crossunder(out1[2], out4[2]) or crossunder(out1[3], out4[3]))) or (out2<out3 and (crossunder(out1, out3) or crossunder(out1[1], out3[1]) or crossunder(out1[2], out3[2]) or crossunder(out1[3], out3[3])))
if (shortCondition2)
    strategy.entry("Enter S", strategy.short)


if (strategy.position_size > 0)
    strategy.exit("Exit L", limit=takeProfitPrice, stop=longStopPrice)

if (strategy.position_size < 0)
    strategy.exit("Exit S", limit=takeProfitPrice, stop=shortStopPrice)

```

> Detail

https://www.fmz.com/strategy/442957

> Last Modified

2024-02-27 16:21:02
