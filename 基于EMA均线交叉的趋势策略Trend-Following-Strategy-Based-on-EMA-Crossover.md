
> Name

基于EMA均线交叉的趋势策略Trend-Following-Strategy-Based-on-EMA-Crossover

> Author

ChaoZhang

> Strategy Description


[trans]

本文将详细介绍一种利用EMA均线交叉形成交易信号的趋势追踪策略。该策略通过优化均线参数组合,以提高策略稳定性。

一、策略原理

该策略主要遵循以下核心规则:

1. 设置快线EMA和慢线EMA,快线反应价格变化,慢线判断趋势;

2. 根据快线上穿慢线做多,下穿做空;

3. 设置EMA参数比例,慢线周期≥快线3倍,以减少虚假信号;

4. 可选择只做多模式,避免逆势交易。

5. 可定制回测周期进行参数优化测试。

通过调整EMA均线参数,可在保持敏感性的同时提高稳定性,锁定趋势交易机会。

二、策略优势

该策略最大优势是规则简单,容易实施,适合时间有限的交易者。

另一优势是可通过参数优化降低频繁无效交易。

最后,可选择只做多模式,无需逆势交易,适合股市等品种。

三、潜在风险 

但该策略也存在以下问题:

首先,EMA均线本身存在滞后问题,可能错过最佳点位。

其次,参数设置不当可能过度过滤导致漏单。

最后,止盈止损机制有待改进及优化。

四、内容总结

本文详细介绍了一种基于EMA均线交叉的趋势交易策略。它通过调整均线参数组合来提升策略稳定性。该策略易于使用且规则简单清晰,但也需要注意防控均线滞后等问题。

||

This article explains in detail a trend following strategy using EMA crossover to generate trading signals. It aims to improve strategy robustness through optimizing moving average parameters.

I. Strategy Logic

The core rules are:

1. Set up fast EMA and slow EMA, with fast EMA for price change sensitivity and slow EMA for trend.

2. Go long on fast EMA crossover above slow EMA, and go short on crossover below.

3. Set EMA ratio where slow period ≥ 3 times fast period, to reduce false signals. 

4. Option for long only mode to avoid counter-trend trades.

5. Customizable backtest period for parameter optimization.

By tuning EMA parameters, sensitivity and stability can be balanced to capitalize on trends.

II. Advantages of the Strategy

The biggest advantage is simplicity for ease of use, suitable for time-constrained traders.

Another advantage is the ability to reduce whipsaws through parameter optimization.

Lastly, long only mode avoids counter-trend trades and fits certain markets like stocks.

III. Potential Weaknesses

However, some issues exist:

Firstly, EMAs inherently have lagging issues, causing missed optimal entries.

Secondly, improper settings may over-filter causing missed trades. 

Finally, stop loss and take profit mechanisms need improvements.

IV. Summary

In summary, this article has explained a trend following strategy based on EMA crossovers. It aims to improve robustness by tuning EMA parameters. With simple and clear rules, it is easy to implement but risks like EMA lag need prevention.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2020|Backtest Start Year|
|v_input_2|20|Length|
|v_input_3|0|Multiplier (3x length, 4x length, etc): 3|4|5|6|7|8|9|10|
|v_input_4|false|Long Only|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-09-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// 
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © gregoirejohnb
//
// Moving average crossover systems measure drift in the market. They are great strategies for time-limited people.
// So, why don't more people use them?
// 
// I think it's due to poor choice in choosing EMA lengths: Market Wizard Ed Seykota has a guideline for moving average crossovers: the slow line should be at least 3x the fast line.
// This removes a lot of the whipsaws inherent in moving average systems, which means greater profitability.
// His other piece of advice: long-only strategies are best in stock markets where there's a lot more upside potential.
//
// Using these simple rules, we can reduce a lot of the whipsaws and low profitability trades! This strategy was made so you can see for yourself before trading.
//
// === HOW TO USE THIS INDICATOR ===
// 1) Choose your market and timeframe.
// 2) Choose the length.
// 3) Choose the multiplier.
// 4) Choose if the strategy is long-only or bidirectional. 
//
// Don't overthink the above! We don't know the best answers, that's why this strategy exists! We're going to test and find out.
//  After you find a good combination, set up an alert system with the default Exponential Moving Average indicators provided by TradingView.
//
// === TIPS ===
// Increase the multiplier to reduce whipsaws (back and forth trades).
// Increase the length to take fewer trades, decrease the length to take more trades.
// Try a Long-Only strategy to see if that performs better.
//
strategy(title="EMA Crossover Strategy", shorttitle="EMA COS", overlay=true, pyramiding=0, default_qty_type=strategy.percent_of_equity, default_qty_value=10, currency=currency.USD,commission_type=strategy.commission.percent,commission_value=0.1)

// === GENERAL INPUTS ===
//strategy start date
start_year = input(defval=2020, title="Backtest Start Year")

// === LOGIC ===
length = input(type=input.integer,defval=20,minval=1,title="Length")
ratio = input(type=input.integer,defval=3,title="Multiplier (3x length, 4x length, etc)",options=[3,4,5,6,7,8,9,10])
longOnly = input(type=input.bool,defval=false,title="Long Only")
fast = ema(hl2,length)
slow = ema(hl2,length * ratio)
plot(fast,linewidth=2,color=color.orange,title="Fast")
plot(slow,linewidth=2,color=color.blue,title="Slow")

longEntry = crossover(fast,slow)
shortEntry = crossunder(fast,slow)

plotshape(longEntry ? close : na,style=shape.triangleup,color=color.green,location=location.belowbar,size=size.small,title="Long Triangle")
plotshape(shortEntry and not longOnly ? close : na,style=shape.triangledown,color=color.red,location=location.abovebar,size=size.small,title="Short Triangle")
plotshape(shortEntry and longOnly ? close : na,style=shape.xcross,color=color.black,location=location.abovebar,size=size.small,title="Exit Sign")

// === STRATEGY - LONG POSITION EXECUTION ===
enterLong() =>
    crossover(fast,slow) and 
       time > timestamp(start_year, 1, 1, 01, 01)
exitLong() =>
    longOnly and crossunder(fast,slow)
strategy.entry(id="Long", long=strategy.long, when=enterLong())
strategy.close(id="Long", when=exitLong())
// === STRATEGY - SHORT POSITION EXECUTION ===
enterShort() =>
    not longOnly and crossunder(fast,slow) and 
       time > timestamp(start_year, 1, 1, 01, 01)
exitShort() =>
    false
strategy.entry(id="Short", long=strategy.short, when=enterShort())
strategy.close(id="Short", when=exitShort())
```

> Detail

https://www.fmz.com/strategy/426886

> Last Modified

2023-09-15 11:51:34
