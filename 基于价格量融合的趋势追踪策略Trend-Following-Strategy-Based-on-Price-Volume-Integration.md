
> Name

基于价格量融合的趋势追踪策略Trend-Following-Strategy-Based-on-Price-Volume-Integration

> Author

ChaoZhang

> Strategy Description


[trans]
本策略名称为“基于价格量融合的趋势追踪策略”。该策略同时考量价格和交易量指标,判断趋势方向,以发挥量价合力的交易信号效果。

策略的交易逻辑如下:

首先计算价格的5日移动平均线和交易量的15日移动平均线。

当价格的5日移动平均线上涨且交易量的15日移动平均线也上涨时,认为量价合力上攻,产生买入信号。

当价格的5日移动平均线下跌,或交易量的15日移动平均线下跌,则平掉多单。

该策略的优势在于同时结合价格和交易量变化判断趋势方向。只有当两者同向看涨时才进行买入,可以有效过滤假信号。

但移动平均线参数需要优化调整,时间周期也需要匹配不同品种的特点。止损策略同样重要,可以减少单笔亏损的风险。

总体来说,合理运用价格和交易量指标的集成,可以提高趋势交易策略的效果。但交易者还需关注更多市场信息,保持灵活性,根据实际情况调整策略的参数。

||


This strategy is named “Trend Following Strategy Based on Price-Volume Integration”. It considers both price and volume indicators to determine trend direction and generate signals aligned with price-volume forces.

The trading logic is as follows:

First calculate the 5-day moving average of price and 15-day moving average of volume. 

When the 5-day price moving average goes up and the 15-day volume moving average also rises, it signals synchronized price-volume upthrust to generate buy signals.

When the 5-day price moving average declines, or the 15-day volume moving average declines, existing long positions will be closed.

The advantage of this strategy is jointly using price and volume changes to judge trend direction. Only when both point to bullishness will long entry be triggered, effectively filtering false signals.

But parameters of moving averages need optimization and tuning to match different products' characteristics. Stop loss is also crucial to reduce single trade loss risks.

In conclusion, properly integrating price and volume indicators can improve trend trading strategy performance. But traders still need to watch more market information, maintaining flexibility to adjust strategy parameters based on actual conditions.
[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Celar

//@version=5
strategy("VOLLY PRICE CONVERGE", default_qty_type= strategy.percent_of_equity )
base_sma = ta.sma(close, 10)
vol_sma5 = ta.hma(volume, 15)
price_sma5 = ta.hma(close, 15)
ma50 = ta.sma(close, 50)
ma20 = ta.sma(close, 20)
int vol_indicator = na
int price_indicator = na

if vol_sma5 > vol_sma5[1]
    vol_indicator := 1
else
    vol_indicator := 0

if price_sma5 > price_sma5[1]
    price_indicator := 1
else
    price_indicator := 0
        
signal = vol_indicator + price_indicator

colour = signal == 2 ?  #00802b : signal == 1 ? #cc2900 : color.white 

bank_roll = strategy.equity
qty = bank_roll/close

strategy.entry("Long", strategy.long, qty, when = signal == 2 and close > base_sma)
// Generate a full exit bracket (profit 10 points, loss 5 points per contract) from the entry named "Long".
strategy.close("Long", when = signal == 1 or signal == 0 or close < base_sma )

 
        
```

> Detail

https://www.fmz.com/strategy/426591

> Last Modified

2023-09-13 15:25:20
