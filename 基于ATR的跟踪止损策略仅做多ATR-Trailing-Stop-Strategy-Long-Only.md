
> Name

基于ATR的跟踪止损策略仅做多ATR-Trailing-Stop-Strategy-Long-Only

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b27c2ccb1840ef780e.png)
[trans]

## 概述

本策略基于ATR指标设定两个不同参数的动态止损价位,一个快速止损一个慢速止损,根据价格突破不同的止损价位来建立做多头寸或止损退出头寸。策略的目的是利用ATR指标设定合理的止损位置,在保证止损的同时尽量追踪价格上涨趋势。

## 策略原理 

本策略使用ATR指标计算两个不同参数的止损位置。快速止损使用5周期ATR乘以0.5作为止损幅度;慢速止损使用10周期ATR乘以3作为止损幅度。当价格上涨突破快速止损价位时,建立做多头寸;当价格继续上涨突破慢速止损价位时,将止损位置调整至慢速止损价位。如果价格转头下跌,根据两者之间的突破关系来移动止损位置。

具体逻辑是:

1. 计算快速止损价位Trail1:5周期ATR乘0.5

2. 计算慢速止损价位Trail2:10周期ATR乘3

3. 当价格上涨突破Trail1时,建立做多头寸

4. 当价格继续上涨突破Trail2时,将止损位置调整至Trail2

5. 如果价格转头下跌突破Trail1,则将止损位置调回Trail1

6. 如果价格继续下跌突破Trail2,则将止损位置调整至Trail2

7. 最终,如果价格触发停止止损价位,则止损退出头寸

通过这种方式,可以在价格上涨时尽量追踪趋势运行利润,在价格转头下跌时及时止损。同时,快慢两个止损价位可以平衡止损与追踪之间的关系。

## 策略优势

1. 利用ATR指标动态设定止损位置,可以根据市场波动率合理设置止损幅度

2. 双止损机制可以平衡止损和追踪之间的关系,既可以止损又可以追涨

3. 做多方向符合大趋势,容易获利

4. 策略逻辑简单清晰,容易理解实现

5. 止损规则严格有效,可以及时止损,控制亏损

## 策略风险

1. ATR指标参数设置不当,可能导致止损过于宽松或过于紧密

2. 做多方向存在方向性风险,行情顶部时容易止损

3. 双止损规则较复杂,参数设置不当可能失效

4. 没有考虑突破EMA等过滤条件,存在误交易风险

5. 没有考虑资金管理和仓位管理,存在超买超卖风险

针对以上风险,可以通过优化ATR参数,添加过滤条件,加强资金管理来降低风险。

## 策略优化方向 

1. 优化ATR参数组合,找到最佳参数

2. 加入EMA等指标判断 Filters in 对应 Barriers

3. 结合Stoch RSI等指标 again 判断

4. 加入重入机制,优化仓位管理

5. 优化资金管理规则,控制单笔止损比例

6. 结合btc10 wsb全网仓位,避免大局 方向性错误

7. 考虑加入小时级别的策略

8. 升级为全市场多品种策略

9. 部署高性能交易引擎

通过以上几点优化,可以减少误交易风险,提高策略稳定性和胜率。

## 总结

本策略整体思路清晰,使用ATR指标双止损方式来建立做多头寸并追踪止损。策略优势在于止损规则严格,可以控制亏损风险,逻辑简单容易实现。存在一定方向性风险,可以通过优化参数组合、加入过滤条件、改进资金管理等方式来降低风险提高效果。如果继续优化测试,本策略可以成为稳定可靠的趋势跟踪策略。

||


## Overview

This strategy uses two ATR stops with different parameters to set dynamic stop loss levels - one fast stop and one slow stop. It establishes long positions based on price breakouts of the different stop levels and exits positions using the trailing stops. The goal is to use ATR stops to set reasonable stop loss levels while maximizing the trend following ability.

## Strategy Logic

The strategy uses ATR indicator to calculate two stop loss levels. The fast stop uses 5-period ATR multiplied by 0.5 as the stop distance. The slow stop uses 10-period ATR multiplied by 3 as the stop distance. When price breaks above the fast stop level, a long position is established. When price continues to break above the slow stop level, the stop is adjusted to the slow stop level. If price turns down, the stop level is adjusted based on the crossover relationships. 

The logic is:

1. Calculate fast stop Trail1: 5-period ATR * 0.5

2. Calculate slow stop Trail2: 10-period ATR * 3 

3. When price breaks above Trail1, establish long position

4. When price continues to break above Trail2, adjust stop to Trail2

5. If price turns down breaking Trail1, adjust stop back to Trail1

6. If price continues down breaking Trail2, adjust stop to Trail2

7. Finally, if price hits the stop level, exit the position with stop loss

This way, the strategy can maximize the profit during uptrends with the trailing stops while quickly stopping out losses when the trend reverses. The two stops also balance between capturing trends and limiting losses.

## Advantages

1. ATR stops set dynamic stop loss levels based on market volatility

2. Dual stop mechanism balances between stopping losses and trailing trends

3. Long direction aligns with overall uptrend, higher profitability

4. Simple and clear logic, easy to understand and implement

5. Strict stop loss rules limit losses effectively

## Risks

1. Improper ATR parameters may cause stops being too wide or too tight

2. Long direction has directional bias, prone to stops at market tops

3. Dual stop rules are complex, may fail if not set properly

4. No filters such as EMA crossovers, may cause bad trades

5. No position or risk management, risks of overtrading

These risks can be reduced by optimizing ATR parameters, adding filters, and enforcing risk management.

## Improvement Areas

1. Optimize ATR parameter combinations for best results

2. Add filters like EMA to qualify entry signals

3. Incorporate indicators like Stoch RSI for additional edge

4. Add re-entry logic to optimize position management 

5. Optimize risk management rules to limit per trade stop loss

6. Incorporate market-level analytics to avoid directional mistakes

7. Consider faster timeframe strategies like hourly

8. Expand to multi-market universal strategy

9. Deploy high performance trading engine

With these improvements, the strategy can be more robust, stable and profitable.

## Summary

The strategy uses clear ATR trailing stops for long entries and exits. The advantages lie in its strict stop loss rules to limit losses while trailing trends. It has directional bias risks that can be reduced through optimizations like better parameters, adding filters and enhancing risk management. With further testing and improvements, this can become a reliable trend following strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|5|Fast ATR period|
|v_input_3|0.5|Fast ATR multiplier|
|v_input_4|10|Slow ATR period|
|v_input_5|3|Slow ATR multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-25 00:00:00
end: 2023-11-01 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("ATR Trailing Stop Strategy (Long Position Only)", overlay=true)

SC = input(close, "Source", input.source)

// Fast Trail
AP1 = input(5, "Fast ATR period", input.integer)
AF1 = input(0.5, "Fast ATR multiplier", input.float)
SL1 = AF1 * atr(AP1)
Trail1 = 0.0
Trail1 := iff(SC > nz(Trail1[1], 0) and SC[1] > nz(Trail1[1], 0), max(nz(Trail1[1], 0), SC - SL1), iff(SC < nz(Trail1[1], 0), SC + SL1, na))

// Slow Trail
AP2 = input(10, "Slow ATR period", input.integer)
AF2 = input(3, "Slow ATR multiplier", input.float)
SL2 = AF2 * atr(AP2)
Trail2 = 0.0
Trail2 := iff(SC > nz(Trail2[1], 0) and SC[1] > nz(Trail2[1], 0), max(nz(Trail2[1], 0), SC - SL2), iff(SC < nz(Trail2[1], 0), SC + SL2, na))

Green = Trail1 > Trail2 and close > Trail2 and low > Trail2

Buy = crossover(Trail1, Trail2)

plotshape(Buy, style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small)

strategy.entry("Buy", strategy.long, when = Buy)

var float trailingStopPrice = na
if (Trail2 > trailingStopPrice)
    trailingStopPrice := Trail2

if (crossover(Trail1, Trail2))
    trailingStopPrice := Trail2

strategy.exit("Exit", from_entry = "Buy", stop=trailingStopPrice)

```

> Detail

https://www.fmz.com/strategy/430836

> Last Modified

2023-11-02 14:05:22
