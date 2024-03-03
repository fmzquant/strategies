
> Name

均值回归渐进开仓策略Mean-Reversion-with-Incremental-Entry-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d4d55de4742fc476d7.png)
[trans]
## 概述

均值回归渐进开仓策略是HedgerLabs设计的一个先进的量化交易策略脚本,专注于金融市场的均值回归技术。该策略针对于更喜欢系统化方法,并且强调基于价格相对移动平均线的渐进开仓方式的交易者。

## 策略原理  

该策略的核心是简单移动平均线(SMA)。所有入场和出场交易都围绕着移动平均线进行。交易者可以自定义MA长度,使其适用于不同的交易风格和时间范围。

该策略的独特之处在于其渐进开仓机制。当价格从移动平均线上偏离超过一定百分比时,该策略会启动第一个头寸。随后,随着价格继续从移动平均线偏离的程度越来越大,该策略会以交易者定义的渐进方式增加头寸。这种方法可以在市场波动加大时获得更高收益。

该策略还会智能管理头寸。当价格低于移动平均线时做多,高于时做空,以适应不同市场条件。平仓点设定在价格触及移动平均线时,旨在抓住潜在的反转点以实现最优关闭头寸。  

通过启用`calc_on_every_tick`,该策略可以不断评估市场条件并做出及时反应。

## 优势分析

均值回归渐进开仓策略具有以下优势:

1. 系统化程度高,可以减少主观误操作的风险
2. 渐进开仓可以在市场大幅波动时获得更高收益
3. 可以自定义参数如MA周期等以适应不同品种
4. 头寸管理机制较为智能,可以自动调整多空仓位
5. 出场点选择合理,有利于抓住反转 并关闭头寸

## 风险分析  

该策略也存在一些风险:  

1. 依赖技术指标,可能发生平假信号的风险
2. 无法判断市场趋势,容易被套住
3. MA参数设置不当可能导致频繁止损
4. 渐进开仓会加大仓位风险  

可以通过适当优化 exits,更好判断趋势,或适当缩减开仓幅度来缓解上述风险。

## 优化方向  

该策略可以从以下几个方面进行优化:  

1. 增加剔除趋势条件,避免逆势开仓
2. 结合波动率指标优化开仓幅度
3. 优化移动止损以锁定利润
4. 尝试不同类型的移动平均线
5. 添加过滤器减少无效信号

## 总结  

均值回归渐进开仓策略专注于均值回归交易技术,采用系统化渐进开仓管理头寸,可自定义参数适用于不同交易品种。该策略在波动市中表现较好,适合关注短线操作的量化交易者。

||

## Overview

The Mean Reversion with Incremental Entry strategy designed by HedgerLabs is an advanced trading strategy script focusing on the mean reversion technique in financial markets. It is tailored for traders who prefer a systematic approach with emphasis on incremental entries based on price movements relative to a moving average.

## Strategy Logic

Central to this strategy is the Simple Moving Average (SMA) which all entries and exits revolve around. Traders can customize the MA length to suit different trading styles and timeframes.  

Unique to this strategy is the incremental entry system. It initiates a first position when the price deviates from the MA by a specified percentage. Subsequent entries are then made in incremental steps, as defined by the trader, as the price moves further away from the MA. This aims to capitalize on increasing volatility.

The strategy intelligently manages positions by entering long when price is below MA and short when above to adapt to changing market conditions.  

Exits are determined when the price touches the MA, with the goal of closing positions at potential reversal points for optimized outcomes.

With calc_on_every_tick enabled, the strategy continually evaluates the market to ensure prompt reaction.  

## Advantage Analysis   

The Mean Reversion with Incremental Entry strategy has the following key advantages:

1. Highly systematized to reduce emotional interference 
2. Incremental entry captures greater profit during high volatility
3. Customizable parameters like MA period suit different instruments  
4. Intelligent position management automatically adapts long/short  
5. Optimal exit targeting reversals to close positions

## Risk Analysis

The risks to consider include:

1. Whipsaws from technical indicator reliance  
2. Trendlessness causing extended drawdowns
3. Poor MA settings lead to frequent stop outs
4. Larger position size from incremental entry  

Exits can be optimized, trend filters added, position sizing reduced to mitigate the above risks.

## Enhancement Opportunities

The strategy can be enhanced by:

1. Adding trend filters to avoid unfavorable trades
2. Optimizing entry increments with volatility  
3. Incorporating trailing stops to lock in profits
4. Experimenting with different moving averages  
5. Using filters to reduce false signals  

## Conclusion

The Mean Reversion with Incremental Entry strategy focuses on mean reversion techniques using a systemized incremental position sizing approach. With customizable settings, it is adaptable across different trading instruments. It performs well in ranging markets and suits short-term systematic traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|30|MA Length|
|v_input_float_1|5|Initial Percent for First Order|
|v_input_float_2|true|Percent Step for Additional Orders|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-29 00:00:00
end: 2024-01-28 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Mean Reversion with Incremental Entry by HedgerLabs", overlay=true, calc_on_every_tick=true)

// Input for adjustable settings
maLength = input.int(30, title="MA Length", minval=1)
initialPercent = input.float(5, title="Initial Percent for First Order", minval=0.01, step=0.01)
percentStep = input.float(1, title="Percent Step for Additional Orders", minval=0.01, step=0.01)

// Calculating Moving Average
ma = ta.sma(close, maLength)

// Plotting the Moving Average
plot(ma, "Moving Average", color=color.blue)

var float lastBuyPrice = na
var float lastSellPrice = na

// Function to calculate absolute price percentage difference
pricePercentDiff(price1, price2) =>
    diff = math.abs(price1 - price2) / price2 * 100
    diff

// Initial Entry Condition Check Function
initialEntryCondition(price, ma, initialPercent) =>
    pricePercentDiff(price, ma) >= initialPercent

// Enhanced Entry Logic for Buy and Sell
if (low < ma)
    if (na(lastBuyPrice))
        if (initialEntryCondition(low, ma, initialPercent))
            strategy.entry("Buy", strategy.long)
            lastBuyPrice := low
    else
        if (low < lastBuyPrice and pricePercentDiff(low, lastBuyPrice) >= percentStep)
            strategy.entry("Buy", strategy.long)
            lastBuyPrice := low

if (high > ma)
    if (na(lastSellPrice))
        if (initialEntryCondition(high, ma, initialPercent))
            strategy.entry("Sell", strategy.short)
            lastSellPrice := high
    else
        if (high > lastSellPrice and pricePercentDiff(high, lastSellPrice) >= percentStep)
            strategy.entry("Sell", strategy.short)
            lastSellPrice := high

// Exit Conditions - Close position if price touches the MA
if (close >= ma and strategy.position_size > 0)
    strategy.close("Buy")
    lastBuyPrice := na

if (close <= ma and strategy.position_size < 0)
    strategy.close("Sell")
    lastSellPrice := na

// Reset last order price when position is closed
if (strategy.position_size == 0)
    lastBuyPrice := na
    lastSellPrice := na

```

> Detail

https://www.fmz.com/strategy/440358

> Last Modified

2024-01-29 15:47:24
