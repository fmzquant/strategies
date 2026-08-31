
> Name

基于EMA200的移动止盈移动止损策略EMA-200-Based-Trailing-Take-Profit-and-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1115a7b31c4d33fef8f.png)

## Overview

The EMA 200 based trailing take profit and trailing stop loss strategy is a trading strategy that uses EMA 200 as a benchmark, combined with trailing stop loss and trailing take profit mechanisms. The strategy judges the overall trend direction based on EMA 200, and only goes long or short in the trend direction, while using the ATR indicator to calculate reasonable stop loss and take profit levels to realize trailing stop loss and trailing take profit.

## Strategy Logic

The strategy first calculates the 200-period EMA as an indicator to judge the overall trend. It only goes long when the price is above EMA 200 and goes short only when the price is below EMA 200, thus ensuring to trade in the trend direction.  

After entering the market, the strategy uses the ATR indicator to calculate reasonable stop loss and take profit increments, which are added to the latest high and latest low to form the upper and lower rail. When the price exceeds the upper rail, take profit for long orders; when the price breaks the lower rail, stop loss for short orders. As the price moves, the stop loss and take profit levels will also adjust dynamically, thus realizing trailing stop loss and trailing take profit.

## Advantage Analysis

The biggest advantage of this strategy is avoiding trading against the trend by judging the trend with EMA 200. At the same time, the stop loss and take profit levels follow the price movement for timely stop loss and profit taking, effectively controlling risks.

In addition, the ATR stop loss and take profit is an assessment of market volatility and can set reasonable stop loss and take profit levels, instead of being too loose or too aggressive. It has advantages over fixed stop loss and take profit.  

In general, this strategy combines trend and stop loss/take profit, pursuing maximum profits while controlling risks, making it a very balanced strategy.

## Risk Analysis  

The main risk of this strategy is that the EMA 200 may not be able to accurately determine the trend completely, and there could be false breakouts. Entering the market against the trend direction by mistake may lead to huge losses.

Besides, although the ATR stop loss and take profit has some scientific basis and advantages, situations exceeding normal volatility range may still occur. In such cases, being stopped out too soon is possible, unable to make profits.

To mitigate these risks, consider combining other indicators to confirm the trend and volatility, such as Bollinger Bands, RSI, etc., to avoid wrong signals. Also, appropriately relax the stop loss range, but not too loose.

## Strategy Optimization

The strategy can be optimized in the following aspects:

1. The EMA period can be adjusted to 100 or 150 for a more stable trend judgment.  
2. The ATR parameters can be optimized to find a more reasonable representation of market volatility.
3. Add other indicators like Bollinger Bands to assist in judging trend and volatility. 
4. The stop loss and take profit can be adjusted to integral multiples of ATR, such as 2 times or 3 times ATR, for more flexible stops.
5. Add re-entry mechanism, i.e. re-enter the trend after the stop loss is triggered.

By testing different parameters, selecting better parameters, adding other indicators for judgment, optimizing the stop loss mechanism and more, the stability and profitability of the strategy can be greatly improved.


## Conclusion
The EMA 200 based trailing take profit and stop loss strategy judges the overall trend with EMA and uses ATR calculated reasonable stop loss/take profit to control risks. It is a balanced trading strategy with the advantage of determining trend, trailing stop loss/profit and risk control, but also has certain false breakout risks. Further improving the strategy effect can be achieved through parameter optimization, adding other indicators for judgment.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|7|ATR Length|
|v_input_float_1|1.5|ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-08 00:00:00
end: 2024-01-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ozgurhan

//@version=5
strategy("EMA 200 Based Trailing Take Profit", overlay=true, margin_long=100, margin_short=100, default_qty_value=1, initial_capital=100)

// EMA 200 tanımı
ema200 = ta.ema(close, 200)

// Orijinal long ve short koşulları
longConditionOriginal = ta.crossover(ta.sma(close, 14), ta.sma(close, 28))
shortConditionOriginal = ta.crossunder(ta.sma(close, 14), ta.sma(close, 28))

// EMA 200'ün üzerinde ve altında long ve short koşulları
longCondition = longConditionOriginal and close > ema200
shortCondition = shortConditionOriginal and close < ema200

if longCondition
    strategy.entry("Long", strategy.long, comment="Long", alert_message="Long")

if shortCondition
    strategy.entry("Short", strategy.short, comment="Short", alert_message="Short")

atr_length=input.int(7, title="ATR Length")
atr_multiplier = input.float(1.5, title="ATR Multiplier")
atr_multiplied = atr_multiplier * ta.atr(atr_length)
ttp_top_bracket = strategy.position_size > 0 ? high[1] + atr_multiplied : na
ttp_bottom_bracket = strategy.position_size < 0 ? low[1] - atr_multiplied : na

plot(ttp_top_bracket, title="TTP Top Bracket", color=color.lime, style=plot.style_linebr, offset=1)
plot(ttp_bottom_bracket, title="TTP Bottom Bracket", color=color.red, style=plot.style_linebr, offset=1)

strategy.exit("Close Long", from_entry="Long", limit=ttp_top_bracket, alert_message="Close Long")
strategy.exit("Close Short", from_entry="Short", limit=ttp_bottom_bracket, alert_message="Close Short")




```

> Detail

https://www.fmz.com/strategy/438046

> Last Modified

2024-01-08 15:50:52
