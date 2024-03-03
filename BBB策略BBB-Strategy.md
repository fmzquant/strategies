
> Name

BBB策略BBB-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

BB%B策略是一个利用布林带指标的百分比B值来进行投资决策的量化交易策略。它可以在价格接近布林带上轨或下轨时,发出买入或卖出信号,属于趋势跟踪型策略。

## 策略原理

该策略首先计算 specifiedPeriod 天的收盘价的均线,以及标准差,然后得到布林带的上轨和下轨。BB%B指标是以当前价格减去下轨价,再除以上轨价减下轨价,表示当前价格在布林带内的位置。当BB%B低于oversold阈值时产生买入信号,高于overbought阈值时产生卖出信号。交易信号发出后,如果BB%B回落至相反阈值附近则平仓。

具体来说,策略首先计算21天收盘价的SMA均线,以及2倍标准差得到布林带上下轨。然后计算当前收盘价的BB%B值。如果BB%B值低于-0.2(可配置)而当前无持仓,则做多;如果BB%B值高于1.2(可配置)而当前无持仓,则做空。平仓信号是当持多仓时BB%B值上穿1.0(可配置);持空仓时BB%B值下穿0.2(可配置)。

该策略依赖BB%B指标判断目前价格是否过高或过低,以及依靠均线判断目前趋势方向,当价格超出布林带上下轨时产生交易信号。通过配置不同参数可以调整策略的频繁程度。

## 优势分析

- 利用布林带指标判断超买超卖

布林带上轨和下轨分别代表了当前价格的一定标准差范围。当价格接近或触及上轨时代表着超买,接近或触及下轨时代表着超卖。BB%B策略充分利用了这一特性来判断合适的买入和卖出时机。

- 配置灵活,可调整策略频繁程度

策略中的BB%B阈值、均线参数、回落阈值都可以自由配置,这为调整策略的频繁程度提供了便利。使用更长均线和更大回落阈值可以减少交易频率。

- 结合趋势判断

除了布林带判断超买超卖外,还同时结合均线判断大趋势,避免逆势交易。

- 回落机制可减少虚假信号

当价格初次触碰布林带上轨或下轨时,标记为超买超卖的可能性大,但也可能是短期的虚假突破。此策略加入回落阈值,只有在BB%B明确回落至相反方向才会平仓,可过滤虚假信号。

## 风险分析

- 无法判断价格趋势

该策略仅看布林带指标来判断价格可能反转,而忽略大趋势判断,可能导致逆势交易而亏损。

- 回落阈值设置不当易错过机会

回落阈值设置过大,可能导致趋势反转后无法及时切换持仓方向,错过机会。

- 布林带扩张时买卖点价格差异变大

当市场波动加大时,布林带上下轨间距离扩大,买卖点的价格差异变大,单笔亏损风险增大。

- 交易频率较高

相比长线策略,本策略交易频率较高,会产生更多的交易成本和滑点损失。

## 优化方向

- 结合趋势指标过滤信号

可加入MACD,KDJ等趋势判断指标,只在趋势方向吻合时才发出交易信号,避免逆势交易。

- 加入止损机制

设定固定数值或百分比的止损,以控制单笔损失风险,防止亏损扩大。

- 优化参数组合

调整均线长度、BB%B阈值、回落阈值等参数,找到最优参数组合,以滤除更多噪音,提高策略稳定性。

- 考虑交易成本因素

根据不同品种的交易成本情况,调整策略的参数,降低交易频率,减少交易成本的影响。

## 总结

BB%B策略是一种简单实用的量化交易策略。它利用布林带判断价格可能反转的时机,配合均线判断大趋势,在超买超卖点附近进行交易。该策略配置灵活,可调整策略频繁程度。但也存在一定的风险,需要进一步优化,并考虑大趋势、止损、交易成本等因素,以提高策略稳定性和实际盈利能力。如果使用得当,BB%B策略可以成为量化交易体系中的一个有效组成部分。

|| 


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

[/trans]

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
