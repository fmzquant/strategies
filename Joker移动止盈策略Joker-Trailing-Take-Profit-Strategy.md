
> Name

Joker移动止盈策略Joker-Trailing-Take-Profit-Strategy

> Author

ChaoZhang

> Strategy Description




## Overview

The Joker Trailing Take Profit strategy is a trend following strategy based on moving averages. It combines the features of a trailing stop loss and trailing take profit to maximize profits when the market moves in a favorable direction, while cutting losses when the trend reverses.

## Strategy Logic

The strategy uses fast and slow moving averages to identify the overall trend. It goes long when the fast MA crosses above the slow MA, and goes short when the fast MA crosses below the slow MA.

The strategy first calculates an initial take profit price based on the configured percentage after opening a position. If trailing take profit is enabled, it calculates a trailing step based on the minimum tick size of the symbol and the configured trailing percentage. 

When the position direction matches the signal, a limit order is used for take profit if trailing is disabled. If trailing is enabled, the take profit price is trailed based on the step size.

## Advantage Analysis

- The moving averages filter out market noise and avoid false signals.

- Trailing take profit adjusts the take profit level dynamically based on price action. This is more flexible than a fixed take profit price.

- Trailing take profit locks in more profits and reduces the chance of giving back gains. It also avoids exiting too early with a fixed take profit level.

- The stop loss function allows the strategy to exit early when the trend reverses.

## Risk Analysis

- Moving averages can generate false signals or lag during huge price swings. This may cause losses from wrong-way trades. Optimization of MA parameters and adding filters can help.

- A take profit ratio set too high increases holding period and deviation between actual and expected take profit price. Lowering the ratio reduces this risk.

- A trailing step set too small causes excessive order updates and increases fees and slippage. Optimization of the trailing offset is needed.

- Trailing TP only moves up and doesn't consider drawdowns. This may cause a deviation between actual and expected take profit price. A two-way trailing mechanism can help.

## Optimization Directions

- Consider dynamic adjustment of MA parameters based on volatility. Larger periods when volatility rises and smaller periods when volatility falls.

- Research optimal take profit ratios for different products and markets to minimize deviation risk.

- Explore two-way trailing mechanism to trail both upside and downside. This will keep take profit closer to price.

- Incorporate trend strength indicators to reduce take profit ratio in weak trends and increase ratio in strong trends.

- Combine with machine learning models to dynamically set take profit ratios based on predicted price ranges.

## Conclusion

The Joker Trailing Take Profit strategy has a clear structure and uses moving averages to define trend direction and trailing to lock in profits. It combines the advantages of trailing stops and trailing take profits to follow trends smoothly while controlling risks. Further improvements can be made through parameter optimization and enhancing the take profit mechanism to adapt to more complex market environments. Overall, this is a strategy worth further research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Jan 2021 00:00 UTC)|From Date|
|v_input_2|timestamp(31 Dec 2121 23:59 UTC)|To Date|
|v_input_int_1|23|Fast SMA Length|
|v_input_int_2|50|Slow SMA Length|
|v_input_float_1|0.5|Long Take Profit %|
|v_input_float_2|0.5|Short Take Profit %|
|v_input_bool_1|true|Enable Trailing|
|v_input_float_3|0.01|Trailing Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-23 00:00:00
end: 2023-09-22 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title='Joker Trailing TP Bot', shorttitle='Joker TTP Bot', overlay=true, pyramiding=0, process_orders_on_close=false, close_entries_rule='ANY', calc_on_every_tick=false, calc_on_order_fills=false, commission_type=strategy.commission.percent, commission_value=0.07, default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=1000, currency=currency.USD) //, max_labels_count=500)

fromDate = input(timestamp('01 Jan 2021 00:00 UTC'), 'From Date')
toDate = input(timestamp('31 Dec 2121 23:59 UTC'), 'To Date')
fastMALen = input.int(23, 'Fast SMA Length')
slowMALen = input.int(50, 'Slow SMA Length')
longTakeProfitPerc = input.float(0.5, 'Long Take Profit %', minval=0.05, step=0.05) * 0.01
shortTakeProfitPerc = input.float(0.5, 'Short Take Profit %', minval=0.05, step=0.05) * 0.01
enableTrailing = input.bool(true, 'Enable Trailing')
trailingTakeProfitPerc = input.float(0.01, 'Trailing Take Profit %', minval=0.01, maxval=100, step=0.01) * 0.01

float fastMA = ta.sma(close, fastMALen)
float slowMA = ta.sma(close, slowMALen)
bool isWithinPeriod = true
bool openLongPosition = isWithinPeriod and ta.crossover(fastMA, slowMA)
bool openShortPosition = isWithinPeriod and ta.crossunder(fastMA, slowMA)
bool longIsActive = openLongPosition or strategy.position_size > 0
bool shortIsActive = openShortPosition or strategy.position_size < 0

float longTakeProfitPrice = na
longTakeProfitPrice := if longIsActive
    if openLongPosition and not (strategy.position_size > 0)
        close * (1 + longTakeProfitPerc)
    else
        nz(longTakeProfitPrice[1], close * (1 + longTakeProfitPerc))
else
    na

float shortTakeProfitPrice = na
shortTakeProfitPrice := if shortIsActive
    if openShortPosition and not (strategy.position_size < 0)
        close * (1 - shortTakeProfitPerc)
    else
        nz(shortTakeProfitPrice[1], close * (1 - shortTakeProfitPrice))
else
    na

float longTrailingTakeProfitStepTicks = longTakeProfitPrice * trailingTakeProfitPerc / syminfo.mintick
float shortTrailingTakeProfitStepTicks = shortTakeProfitPrice * trailingTakeProfitPerc / syminfo.mintick

strategy.entry(id = 'Long Entry', direction = strategy.long, when = openLongPosition, alert_message = 'Long(' + syminfo.ticker + '): Started')
strategy.entry(id = 'Short Entry', direction = strategy.short, when = openShortPosition, alert_message = 'Short(' + syminfo.ticker + '): Started')
strategy.exit(id = 'Long Take Profit', from_entry = 'Long Entry', limit = enableTrailing ? na : longTakeProfitPrice, trail_price = enableTrailing ? longTakeProfitPrice : na, trail_offset = enableTrailing ? longTrailingTakeProfitStepTicks : na, when = longIsActive, alert_message = 'Long(' + syminfo.ticker + '): Take Profit activated')
strategy.exit(id = 'Short Take Profit', from_entry = 'Short Entry', limit = enableTrailing ? na : shortTakeProfitPrice, trail_price = enableTrailing ? shortTakeProfitPrice : na, trail_offset = enableTrailing ? shortTrailingTakeProfitStepTicks : na, when = shortIsActive, alert_message = 'Short(' + syminfo.ticker + '): Take Profit activated')

plot(series = fastMA, title='Fast SMA', color = color.blue, linewidth = 1, style = plot.style_line)
plot(series = slowMA, title='Slow SMA', color = color.orange, linewidth = 1, style = plot.style_line)
plot(series = longTakeProfitPrice, title='Long Take Profit', color = color.green, linewidth = 1, style = plot.style_cross, offset = 1)
plot(series = shortTakeProfitPrice, title='Short Take Profit', color = color.red, linewidth = 1, style = plot.style_cross, offset = 1)
plot(series = strategy.position_avg_price, title='Position', color = color.white, linewidth = 1, style = plot.style_linebr)

```

> Detail

https://www.fmz.com/strategy/427666

> Last Modified

2023-09-23 15:04:20
