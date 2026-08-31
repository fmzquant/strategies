
> Name

BBB-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

The BB%B strategy is a quantitative trading strategy that utilizes the percentage B value of Bollinger Bands to make investment decisions. It can generate buy and sell signals when price approaches the upper or lower rail of the Bollinger Bands, and belongs to trend-following strategies.

## Strategy Logic

The strategy first calculates the SMA of closing prices over a specifiedPeriod, as well as standard deviation, to obtain the upper and lower rails of the Bollinger Bands. The BB%B indicator represents the position of current price within the Bollinger Bands, calculated by the formula (Current Price - Lower Rail) / (Upper Rail - Lower Rail). When BB%B falls below the oversold threshold, a buy signal is generated. When BB%B rises above the overbought threshold, a sell signal is generated. After the trading signal is triggered, if BB%B retreats back to the opposite threshold, the position will be closed.

Specifically, the strategy first calculates the 21-day SMA and 2x standard deviation to obtain the upper and lower rails of the Bollinger Bands. It then calculates the current closing price's BB%B value. If BB%B is below -0.2 (configurable) and there is no current position, go long. If BB%B is above 1.2 (configurable) and there is no current position, go short. The exit signals are triggered when the long position exists and BB%B crosses above 1.0 (configurable), or when the short position exists and BB%B crosses below 0.2 (configurable).

The strategy relies on the BB%B indicator to determine if the current price is overextended on the upside or downside, and also uses the SMA to judge the current trend direction. It generates trading signals when price exceeds the Bollinger Bands rails. Tweaking different parameters can adjust the frequency of the strategy.

## Advantage Analysis

- Utilize Bollinger Bands to identify overbought/oversold levels

The upper and lower rails of Bollinger Bands represent a certain standard deviation range of the current price. Prices approaching or touching the upper rail signal overbought conditions, while approaching or touching the lower rail signal oversold conditions. The BB%B strategy makes full use of this characteristic to determine appropriate entry and exit points.

- Flexible configuration to adjust frequency

The BB%B thresholds, SMA periods, pullback thresholds are all configurable, which provides convenience to adjust the trading frequency. Using longer SMA and larger pullback threshold can reduce frequency.

- Combine trend identification 

In addition to overbought/oversold determination with Bollinger Bands, it also combines SMA to judge the overall trend, avoiding trading against the trend.

- Pullback mechanism to avoid false signals

When price first touches the Bollinger Bands rails, the probability of overbought/oversold is high, but it could also be short-term false breakout. This strategy adopts pullback threshold, only exiting positions after BB%B clearly pulls back to the opposite side, filtering out false signals.

## Risk Analysis

- Unable to determine price trend

The strategy solely looks at the Bollinger Bands indicator to determine potential reversals, ignoring the overall trend, which may lead to trading against the trend and losses.

- Improper pullback threshold may miss opportunities 

If pullback threshold is set too high, trend reversal may not trigger position change in time, missing opportunities.

- Wider price spread when Bollinger Bands expand

When market volatility increases, the distance between the upper and lower rails also increases, leading to larger price spread for entry and exit, thus higher risk per trade.

- Relatively high trading frequency

Compared to long-term strategies, this strategy has higher trading frequency, incurring more trading costs and slippage. 

## Improvement Directions

- Incorporate trend indicators for signal filtering

Add trend determining indicators like MACD, KDJ to only trigger trades along the trend direction, avoiding counter-trend trades.

- Implement stop loss mechanism 

Set fixed amount or percentage stop loss to control per trade risk and avoid loss expansion.

- Optimize parameter combinations

Adjust SMA periods, BB%B thresholds, pullback thresholds etc to find the optimal parameter combination, filtering out more noise and improve stability.

- Consider trading costs 

For different products, adjust parameters to lower trading frequency based on their trading costs profile to reduce impact.

## Summary

The BB%B strategy is a simple and practical quantitative trading strategy. It uses Bollinger Bands to identify potential reversal price points, combines with SMA for trend direction, and trades around overbought/oversold levels. The strategy is flexible to adjust frequency. But it also has risks that need further improvements, considering factors like overall trend, stop loss, trading costs, to enhance stability and profitability. When used properly, BB%B strategy can become an effective component in quantitative trading systems.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|21|length|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|StdDev|
|v_input_float_2|1.2|Overbought Line|
|v_input_float_3|true|Overbought Close|
|v_input_float_4|-0.2|Oversold Line|
|v_input_float_5|0.2|Oversold Close|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-25 00:00:00
end: 2023-09-24 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// strategy(title = "BB%B Strat", shorttitle = "BB%B Strat", format=format.price, precision=2, default_qty_type=strategy.percent_of_equity, default_qty_value=20)
length = input.int(21, minval=1)
src = input(close, title="Source")
mult = input.float(2.0, minval=0.001, maxval=50, title="StdDev")
ob = input.float(1.2, "Overbought Line", step=0.1)
ob_close = input.float(1.0, "Overbought Close", step=0.1)
os = input.float(-0.2, "Oversold Line", step=0.1)
os_close = input.float(0.2, "Oversold Close", step=0.1)
basis = ta.sma(src, length)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev
bbr = (src - lower)/(upper - lower)
p = plot(bbr, "Bollinger Bands %B", color=#26A69A)
ob_hline = hline(ob, "Overbought", color=color.red, linestyle=hline.style_dashed)
obc_hline = hline(ob_close, "Overbought Close", color=color.red, linestyle=hline.style_dashed)
os_hline = hline(os, "Oversold", color=color.green, linestyle=hline.style_dashed)
osc_hline = hline(os_close, "Oversold Close", color=color.green, linestyle=hline.style_dashed)
fill(ob_hline, obc_hline, color=color.new(color.red, 80), title="Overbought")
fill(os_hline, osc_hline, color=color.new(color.green, 80), title="Overbought")
bgcolor(bbr > ob ? color.new(color.fuchsia, 80) : (bbr < os ? color.new(color.lime, 80) : na))

if bbr < os and strategy.position_size == 0
    strategy.entry("L", strategy.long)
if bbr >= os_close and strategy.position_size > 0
    strategy.close_all()

if bbr > ob and strategy.position_size == 0
    strategy.entry("S", strategy.short)
if bbr <= ob_close and strategy.position_size < 0
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/427816

> Last Modified

2023-09-25 17:53:36
