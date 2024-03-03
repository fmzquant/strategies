
> Name

基于双EMA均线的趋势追踪策略Trend-Following-Strategy-Based-on-Dual-EMA

> Author

ChaoZhang

> Strategy Description



[trans]
本策略名称为“基于双EMA均线的趋势追踪策略”。该策略通过计算两条不同周期的EMA均线,根据均线的关系来判断行情趋势方向,以进行趋势追踪操作。

具体来说,该策略的交易逻辑如下:

1. 计算50日EMA均线和200日EMA均线。

2. 当50日EMA从下方上穿200日EMA时,表示市场步入上升趋势,此时做多。

3. 当50日EMA从上方下穿200日EMA时,表示市场转为下降趋势,此时做空。

4. 当趋势发生反转时,平掉原有头寸,转换至新的趋势方向。

该策略的优势在于利用EMA均线的“金叉、死叉”来判断主要趋势的方向。但由于均线本身存在滞后性,参数设置需要优化,并配合止损来防范风险。

总体来看,双EMA均线策略适用于中长线定位,通过及时捕捉主要趋势转折来进行趋势跟踪交易。但交易者仍需关注更多指标,保持交易策略的灵活调整。



||



This strategy is named “Trend Following Strategy Based on Dual EMA”. It calculates two EMA lines of different periods and judges trend direction based on their relationship, to follow trends.

Specifically, the trading logic is:

1. Calculate the 50-day EMA and 200-day EMA.  

2. When the 50-day EMA crosses above the 200-day EMA, it signals an uptrend, thus going long.

3. When the 50-day EMA crosses below the 200-day EMA, it flags a downtrend, thus going short. 

4. When trend reversal happens, existing positions are closed and direction is switched to the new trend.

The advantage of this strategy is using EMA “golden cross” and “dead cross” to determine the main trend direction. But EMA lagging requires parameter optimization, plus stop loss to manage risks.

In general, the dual EMA strategy suits mid-to-long term positioning by timely capturing major trend reversals for trend following. But traders still need to watch more indicators and maintain flexibility in strategy adjustment.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-13 00:00:00
end: 2023-09-12 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Sonu1997

//@version=4
//@version=5
strategy('moving average strategy', overlay=true)

ema50 =ema(close, 50)
ema200 =ema(close, 200)



long = ema50 > ema200
short = ema50 < ema200

strategy.entry('long', strategy.long,  0, when=long)
strategy.entry('short', strategy.short,  0, when=short)

strategy.close('long', when=short)
strategy.close('short', when=long)

```

> Detail

https://www.fmz.com/strategy/426625

> Last Modified

2023-09-13 18:04:52
