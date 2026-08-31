
> Name

Breakout-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ea806793464db59642.png)

## Overview

This strategy tracks the price trend of cryptocurrencies by setting breakout high and low prices. It goes long when the price breaks above the highest price and goes short when the price breaks below the lowest price to capture the trend.

## Strategy Principle 

This strategy mainly uses the weighted moving average method to determine whether there is an obvious upward or downward trend. Specifically, it will record the highest and lowest prices over a certain period. When the actual trading price exceeds the recorded highest price, it is judged that an upward trend has occurred, and it will go long. When the actual trading price is lower than the recorded lowest price, it is judged that a downward trend has occurred, and it will go short.

The opening prices for long and short are set through the "ENTRY" input parameter, and the closing prices are set through the "EXIT" parameter. The backtest timeframe can also be set through parameters. This allows finding the best combo by adjusting parameters. 

Specifically, the main logic of the strategy is:

1. Record the highest and lowest prices over a certain period (adjustable)
2. Judge if the actual trading price is higher than the highest price
   1. If higher, there is a long opportunity, open long position based on the price level set by the "ENTRY" parameter  
   2. If the actual trading price is lower than the lowest price, there is a short opportunity, open short position based on the price level set by “EXIT” parameter
3. After opening long position, close it when price drops below the level set by “EXIT” parameter
4. After opening short position, close it when price rises above the level set by “ENTRY” parameter

Through this logic loop, it can capture upward and downward trends of the price and achieve trend following.

## Advantages

The biggest advantage of this strategy is that by adjusting parameters, it can automatically capture price trends without the need for manual judgment of trend direction. As long as the parameters are set appropriately, it can automatically track the price fluctuations of cryptocurrencies.

In addition, this strategy is very suitable for quantitative trading and can easily achieve automated order placement. Without manual operation, it reduces the risk of emotional trading and greatly improves trading efficiency.

Finally, this strategy can also maximize returns by adjusting parameters. By testing different ENTRY and EXIT parameters, the optimal parameters can be found to maximize returns.

## Risks

The biggest risk of this strategy is that improper parameter settings may lead to excessively frequent trading, increasing trading fees and slippage losses. If ENTRY is set too low and EXIT is set too high, false trading signals are easily generated.

In addition, improper parameter tuning may also lead to failure to capture price trends in time, missing trading opportunities. This requires a lot of backtesting to find the optimal parameters.

Finally, this strategy is too sensitive to short-term market noise, which may generate wrong trading signals. This needs to be avoided by appropriately setting the trading time cycle parameters.

## Optimization Directions

The following aspects can be further optimized for this strategy:

1. Add stop loss logic. This allows stopping loss when losses exceed a certain percentage to avoid greater losses.

2. Add technical indicators filters like moving average, KDJ to judge overall trend to avoid too much trading due to short-term noise.

3. Optimize parameter setting logic. The adaptive changing mechanism can be set for ENTRY and EXIT parameters rather than static setting so they can adjust based on market conditions.

4. Use machine learning to train optimal parameters. Obtain the optimal ENTRY and EXIT settings for the current market environment through massive historical data training.

## Conclusion

The biggest advantage of this strategy is that by capturing price trends it achieves automated trading, which can reduce the impact of human emotions on trading, lower risks, and improve efficiency. At the same time, optimal profit points can be found by adjusting parameters.

The main risks of the strategy are improper parameter settings and oversensitivity to market noise. This needs to be improved through stop loss, indicator filters, adaptive parameter optimization and more.

Overall, this is a simple and effective trend following strategy suitable for quantitative and automated trading. By continuous optimization, the stability of the strategy can be further improved.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|ENTRY H/L|
|v_input_2|50|EXIT H/L|
|v_input_3|2015|Backtest Start Year|
|v_input_4|true|Backtest Start Month|
|v_input_5|true|Backtest Start Day|
|v_input_6|2999|Backtest End Year|
|v_input_7|true|Backtest End Month|
|v_input_8|true|Backtest End Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-01 00:00:00
end: 2023-12-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © JstMtlQC

//@version=4
strategy("Trend Following Breakout",calc_on_order_fills=true,calc_on_every_tick =false, overlay=true, initial_capital=2000,commission_value=.1,default_qty_type = strategy.percent_of_equity, default_qty_value = 100)


/////////////// INPUT ENTRY EXIT
entry= input(100, "ENTRY H/L")
exit= input(50, "EXIT H/L")

/////////////// Backtest Input
FromYear = input(2015, "Backtest Start Year")
FromMonth = input(1, "Backtest Start Month")
FromDay = input(1, "Backtest Start Day")
ToYear = input(2999, "Backtest End Year")
ToMonth = input(1, "Backtest End Month")
ToDay = input(1, "Backtest End Day")

/////////////// Backtest Setting
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)       
window()  => time >= start and time <= finish ? true : false 

/////////////// BUY OPEN PLOT
highestpricelong = highest(high,entry)[1]
plot(highestpricelong, color=color.green, linewidth=2)

/////////////// BUY CLOSE PLOT
lowestpricelong = lowest(high,exit)[1]
plot(lowestpricelong, color=color.green, linewidth=2)

/////////////// SHORT OPEN PLOT
lowestpriceshort = lowest(low,entry)[1]
plot(lowestpriceshort, color=color.red, linewidth=2)

/////////////// SHORT CLOSE PLOT
highestpriceshort = highest(low,exit)[1]
plot(highestpriceshort, color=color.red, linewidth=2)

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// CONDITION LONG SHORT //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////////////// SHORT 

entryshort= crossunder(close, lowestpriceshort)
exitshort= crossover(close,highestpriceshort)

/////////////// LONG 

exitlong= crossover(close, lowestpricelong)
entrylong= crossover(close,highestpricelong)

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// LONG and SHORT ORDER //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////////////// LONG 

if (entrylong)
    strategy.entry("LongEntry", strategy.long, when = window())
if (exitlong or entryshort)
    strategy.close("LongEntry", when=window())

/////////////// SHORT 

if (entryshort)
    strategy.entry("short", strategy.short, when = window())
if (exitshort or entrylong)
    strategy.close("short", when=window())


```

> Detail

https://www.fmz.com/strategy/434719

> Last Modified

2023-12-08 17:16:34
