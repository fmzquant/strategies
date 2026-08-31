
> Name

量化波浪挤压策略Momentum-Squeeze-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/192b965cdfafba4a4b1.png)

## Overview

The main idea of this strategy is to combine Lazy Bear's momentum indicator and Crypto Face's MFI indicator to go long when the trend goes up and go short when the trend goes down, realizing a quantitative trading strategy that follows market trends.

## Strategy Logic

1. Use Lazy Bear's momentum indicator BlueWave, which calculates the linear regression of close price versus the 20-day highest high, lowest low and close average to determine the trend direction. When BlueWave crosses above 0, it indicates an upward trend; when it crosses below 0, it indicates a downward trend.

2. Use the improved MFI indicator by Crypto Face, which calculates the sum of price change and volume over the past 58 days to determine the money flow. MFI greater than 0 indicates money inflow, less than 0 indicates outflow.

3. When BlueWave crosses above 0 and MFI is greater than 0, a buy signal is generated to open a long position; when BlueWave crosses below 0 and MFI is less than 0, a sell signal is generated to open a short position.

4. Set stop loss and take profit conditions to follow the market trend for profit, while controlling risks.

## Advantages

1. Combining two indicators can more accurately determine market trend direction.

2. BlueWave's smooth curve avoids bias from outliers, making trend judgement more reliable. 

3. MFI can determine money flow, avoiding losses from false breakouts.

4. The strategy has few parameters and is easy to implement and operate.

5. Flexible stop loss and take profit settings help control trading risks. 

6. Trading sessions can be set to avoid abnormal volatility during specific market times.

## Risks

1. Continued downtrend may lead to successive short positions and losses.

2. False signals may lead to being trapped after entering positions.

3. Oversized stop loss may amplify losses.

4. High volatility may frequently hit stop loss points.

5. Improper parameter optimization may lead to poor strategy performance. 

6. Too frequent trading signals may increase transaction costs and slippage.

## Enhancement

1. Optimize parameters of BlueWave and MFI for more steady and reliable signals.

2. Incorporate trend indicators to avoid sustained short losses.

3. Dynamically adjust stop loss/take profit ratios to lower being trapped probability.

4. Refine entry conditions to reduce false signals.

5. Consider position sizing to avoid chasing rallies and dumping dips.

6. Combine with machine learning models for more accurate entry and exit points.

## Conclusion

This strategy combines BlueWave and MFI indicators to determine trend direction, going long on uptrends and short on downtrends, effectively following market trends for profits. However, risks exist in parameter settings, stop loss/take profit, sustained downtrends etc, requiring further optimization on parameter tuning, stop loss mechanisms, filter conditions etc to improve strategy performance and robustness. Overall, the strategy is intuitive and works well for long-term trend following, but losses may be incurred when trapped in ranging markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|(?SL/TP For Long Strategy)Enable Long Strategy|
|v_input_2|50|Stoploss %|
|v_input_3|50|Take Profit %|
|v_input_4|true|(?SL/TP For Short Strategy)Enable Short Strategy|
|v_input_5|50|Stoploss %|
|v_input_6|50|Take Profit %|
|v_input_7|true|(?Date Range)Start Date|
|v_input_8|true|Start Month|
|v_input_9|1804|Start Year|
|v_input_10|true|End Date|
|v_input_11|true|End Month|
|v_input_12|2077|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-07 00:00:00
end: 2023-11-13 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Bunghole 2021
strategy(title="Crypto Squeeze Strategy", initial_capital = 100000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0, currency = 'USD', overlay=true)

//// Stoploss and Take Profit Parameters
// Enable Long Strategy
enable_long_strategy = input(true, title="Enable Long Strategy", group="SL/TP For Long Strategy",inline="1")
long_stoploss_value = input(defval=50, title='Stoploss %', type=input.float, minval=0.1, group="SL/TP For Long Strategy",inline="2")
long_stoploss_percentage = (close * (long_stoploss_value / 100)) / syminfo.mintick
long_takeprofit_value = input(defval=50, title='Take Profit %', type=input.float, minval=0.1, group="SL/TP For Long Strategy",inline="2")
long_takeprofit_percentage = (close * (long_takeprofit_value / 100)) / syminfo.mintick

// Enable Short Strategy
enable_short_strategy = input(true, title="Enable Short Strategy", group="SL/TP For Short Strategy",inline="3")
short_stoploss_value = input(defval=50, title='Stoploss %', type=input.float, minval=0.1, group= "SL/TP For Short Strategy",inline="4")
short_stoploss_percentage = (close * (short_stoploss_value / 100)) / syminfo.mintick
short_takeprofit_value = input(defval=50, title='Take Profit %', type=input.float, minval=0.1, group="SL/TP For Short Strategy",inline="4")
short_takeprofit_percentage = (close * (short_takeprofit_value / 100)) / syminfo.mintick

// Plot Stoploss & Take Profit Levels
long_stoploss_price = strategy.position_avg_price * (1 - long_stoploss_value/100)
long_takeprofit_price = strategy.position_avg_price * (1 + long_takeprofit_value/100)
short_stoploss_price = strategy.position_avg_price * (1 + short_stoploss_value/100)
short_takeprofit_price = strategy.position_avg_price * (1 - short_takeprofit_value/100)
plot(enable_long_strategy and not enable_short_strategy ? long_stoploss_price: na, color=#ff0000, style=plot.style_linebr, linewidth=2, title="Long SL Level")
plot(enable_long_strategy and not enable_short_strategy ? long_takeprofit_price: na, color=#008000, style=plot.style_linebr, linewidth=2, title="Long TP Level")
plot(enable_short_strategy and not enable_long_strategy ? short_stoploss_price: na, color=#ff0000, style=plot.style_linebr, linewidth=2, title="Short SL Level")
plot(enable_short_strategy and not enable_long_strategy ? short_takeprofit_price: na, color=#008000, style=plot.style_linebr, linewidth=2, title="Short TP Level")

// Date Range
start_date = input(title="Start Date", type=input.integer, defval=1, minval=1, maxval=31, group="Date Range")
start_month = input(title="Start Month", type=input.integer, defval=1, minval=1, maxval=12, group="Date Range")
start_year = input(title="Start Year", type=input.integer, defval=1804, minval=1800, maxval=3000, group="Date Range")
end_date = input(title="End Date", type=input.integer, defval=1, minval=1, maxval=3, group="Date Range")
end_month = input(title="End Month", type=input.integer, defval=1, minval=1, maxval=12, group="Date Range")
end_year = input(title="End Year", type=input.integer, defval=2077, minval=1800, maxval=3000, group="Date Range")
in_date_range = (time >= timestamp(syminfo.timezone, start_year, start_month, start_date, 0, 0)) and (time < timestamp(syminfo.timezone, end_year, end_month, end_date, 0, 0))


//// Indicator Inputs
// Lazy Bear's Momentum Indicator
BlueWave = linreg(close - avg(avg(highest(high, 20), lowest(low, 20)), sma(close, 20)), 20, 0)

// Replicated version of Crypto Face's MFI Indicator
mfiUpper = sum(volume * (change(hlc3) <= 0 ? 0 : hlc3), 58)
mfiLower = sum(volume * (change(hlc3) >= 0 ? 0 : hlc3), 58)
_mfiRsi(mfiUpper, mfiLower) =>
    if mfiLower == 0
        100
    if mfiUpper == 0
        0
	100.0 - (100.0 / (1.0 + mfiUpper / mfiLower))

mf = _mfiRsi(mfiUpper, mfiLower)
mfi = (mf - 50) * 3


//// Strategy
// Creating Long and Short Strategy
buy_signal = crossover(BlueWave, 0) and mfi > 0 
sell_signal = crossunder(BlueWave, 0) and mfi < 0 

// Long Strategy
if buy_signal and in_date_range and enable_long_strategy == true
    strategy.entry("Long", true, when=buy_signal, alert_message="Open Long Position")
    strategy.exit("Long  SL/TP", from_entry="Long", loss=long_stoploss_percentage, profit=long_takeprofit_percentage, alert_message="Your Long SL/TP Limit As Been Triggered.")
    strategy.close("Long", when=sell_signal, alert_message="Close Long Position")

// Short Strategy
if sell_signal and in_date_range and enable_short_strategy == true
    strategy.entry("Short", false, when = sell_signal, alert_message="Open Short Position")
    strategy.exit("Short SL/TP", from_entry="Short", loss=short_stoploss_percentage, profit=short_takeprofit_percentage, alert_message="Your Short SL/TP Limit As Been Triggered.")
    strategy.close("Short", when=buy_signal, alert_message="Close Short Position")

```

> Detail

https://www.fmz.com/strategy/432095

> Last Modified

2023-11-14 14:04:24
