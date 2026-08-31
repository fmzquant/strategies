
> Name

Bollinger-Bands-and-RSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17c631a651f97b377f1.png)


#### Overview

This strategy combines Bollinger Bands and the Relative Strength Index (RSI) to generate buy and sell signals. A buy signal is triggered when the price breaks below the lower Bollinger Band and the RSI is below a specified lower level. A sell signal is triggered when the price breaks above the upper Bollinger Band and the RSI is above a specified upper level. Additionally, the strategy introduces a buy interval parameter to avoid frequent trading, which is conducive to pyramid position management.

#### Strategy Principles

1. Calculate the RSI indicator to measure overbought and oversold conditions.
2. Calculate the upper and lower Bollinger Bands to determine price breakouts.
3. Set buy and sell signals based on RSI and Bollinger Bands:
   - A buy signal is generated when the closing price is below the lower Bollinger Band and the RSI is below the specified lower level.
   - A sell signal is generated when the closing price is above the upper Bollinger Band and the RSI is above the specified upper level.
4. Introduce a buy interval parameter to limit the frequency of consecutive buys, facilitating pyramid position management.

#### Strategy Advantages

1. Double confirmation: The strategy uses both Bollinger Bands and RSI indicators, providing more reliable trend reversal detection and reducing false signals.
2. Pyramid position building: By setting a buy interval parameter, the strategy gradually adds positions as the trend is established, which helps control risk and optimize returns.
3. Flexible parameters: Users can flexibly set RSI upper and lower levels and buy interval parameters according to market characteristics and personal preferences.

#### Strategy Risks

1. Trend continuation risk: If the price experiences a short pullback after breaking through the Bollinger Bands, the strategy may close positions prematurely and miss subsequent trends.
2. Parameter optimization risk: The optimal parameter combination may vary significantly in different market environments, and the strategy may face overfitting risks.
3. Black swan events: The strategy is built based on historical data and may not effectively handle extreme market conditions.

#### Strategy Optimization Directions

1. Introduce stop-loss and take-profit: Add trailing stop or fixed stop-loss and take-profit logic to the strategy to further control individual trade risks.
2. Dynamic parameter optimization: Dynamically adjust parameters such as RSI upper and lower levels and buy intervals based on changes in market conditions to improve strategy adaptability.
3. Combine with other technical indicators: Introduce other trend or oscillator indicators as auxiliary judgments to enhance strategy robustness.

#### Summary

This strategy cleverly combines two classic technical indicators: Bollinger Bands and RSI. It utilizes a double confirmation mechanism to capture trending opportunities. At the same time, the strategy introduces a pyramid position-building method to control risk while optimizing returns. However, the strategy also faces risks such as trend continuation risk, parameter optimization risk, and black swan event risk. In the future, the strategy can be further optimized by introducing stop-loss and take-profit, dynamic parameter optimization, and combining with other indicators. Overall, this is a clear-cut and logically rigorous quantitative trading strategy that is worth further exploration and practice.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|GoTradePlz|
|v_input_2|30|RSI 下限水平|
|v_input_3|70|RSI 上限水平|
|v_input_4|5|购买间隔（K线数量）|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-01 00:00:00
end: 2024-02-29 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

//@version=4
strategy(overlay=true, shorttitle="cakes'Strategy For RSI", default_qty_type = strategy.percent_of_equity, initial_capital = 100000, default_qty_value = 100, pyramiding = 0, title="cakes'Strategy", currency = 'USD')

////////// ** Inputs ** //////////

// Stoploss and Profits Inputs

v1 = input(true, title="GoTradePlz")

////////// ** Indicators ** //////////

// RSI

len = 14
src = close
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - 100 / (1 + up / down)



//  Bollinger Bands

length1 = 20
src1 = close
mult1 = 1.0
basis1 = sma(src1, length1)
dev1 = mult1 * stdev(src1, length1)
upper1 = basis1 + dev1
lower1 = basis1 - dev1



////////// ** Triggers and Guards ** //////////


// 输入
RSILowerLevel1 = input(30, title="RSI 下限水平")
RSIUpperLevel1 = input(70, title="RSI 上限水平")

// 购买间隔
buyInterval = input(5, title="购买间隔（K线数量）")

// 跟踪购买间隔
var int lastBuyBar = na
lastBuyBar := na(lastBuyBar[1]) ? bar_index : lastBuyBar

// 策略信号
BBBuyTrigger1 = close < lower1
BBSellTrigger1 = close > upper1
rsiBuyGuard1 = rsi < RSILowerLevel1
rsiSellGuard1 = rsi > RSIUpperLevel1

Buy_1 = BBBuyTrigger1 and rsiBuyGuard1 and (bar_index - lastBuyBar) >= buyInterval
Sell_1 = BBSellTrigger1 and rsiSellGuard1

if (Buy_1)
    lastBuyBar := bar_index

strategy.entry("Long", strategy.long, when = Buy_1, alert_message = "Buy Signal!")
strategy.close("Long", when = Sell_1, alert_message = "Sell Signal!")
```

> Detail

https://www.fmz.com/strategy/446465

> Last Modified

2024-03-28 18:11:08
