
> Name

双向反转策略Bi-directional-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ffdf232038d0ba4df8.png)

[trans]

## 概述

双向反转策略是一个根据前一天交易范围来设定当天止损买入订单的简单比特币交易策略。该策略的核心思想是,如果当天开盘价格较前一天收盘价格上涨,则在高点附近设定止损买入;如果当天开盘价格较前一天收盘价格下跌,则在低点附近设定止损买入。

## 策略原理

该策略首先计算前一天的交易范围,也就是最高价减去最低价。然后在当天开盘后,判断价格是否较前一天收盘价格上涨,如果上涨,则止损买入价格设定为开盘价加上前一天交易范围的0.6倍;如果下跌,则止损买入价格设定为开盘价加上前一天交易范围的1.8倍。策略会在触发止损后开仓做多,并在当天收盘前平仓。

具体来说,策略包含两个入场规则:

1. 如果当天开盘价高于前一天收盘价(longCond1满足),且在回测时间窗口内(window()满足),则在开盘价加上前一天范围的0.6倍止损买入(strategy.long1)。

2. 如果当天开盘价低于前一天收盘价(longCond2满足),且在回测时间窗口内,则在开盘价加上前一天范围的1.8倍止损买入(strategy.long2)。

该策略会在触发以上两种止损后开仓做多,然后在当天收盘前通过strategy.close_all()平仓。

## 优势分析

双向反转策略具有以下几个优势:

1. 捕捉反转行情,无方向偏见。该策略同时考虑价格上涨和下跌两种情况,可以捕捉不同方向的突破反转行情。

2. 风险可控,有止损保护。策略预先设置止损价格,可以有效控制单次交易的最大损失。

3. 每天清盘,避免过夜风险。策略在当天收盘前平仓,不持仓过夜,可以减少隔夜大幅波动的风险。

4. 交易频率较高,适合短线操作。每天只持仓一个交易日,可以确保较高的交易频率。

5. 策略思路简单清晰,容易理解和实现。

## 风险分析

同时,双向反转策略也存在一些风险需要注意:

1. 止损距离选择不当可能导致止损被刺破。如果止损距离设置过小,极端行情下可能被直接冲破而造成损失。

2. 交易频率过高可能造成交易费用压力。每天开仓平仓的高频交易可以积累较多的手续费。

3. 大幅震荡趋势下容易止损。震荡行情中止损比较容易被触发,从而造成损失。

4. 无法持续捕捉趋势行情。该策略更适合反转市,在趋势突破后无法持续捕捉趋势利润。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化止损距离。可以测试不同的止损位置,找到最优止损点。也可以根据市场波动程度动态调整止损距离。

2. 增加趋势过滤。可以在入场前判断较大级别的趋势方向,避免逆势交易。

3. 优化开仓规则。可以考虑在突破前加入分时图形形态判断,或增加量能逻辑判断,提高开仓精确度。

4. 增加持仓optimization。可以测试加入移动止损或趋势跟踪 EXIT来持续获利。

5. 测试不同交易品种。该策略可能更适合波动较大的品种,可以测试不同品种的数据来找到最佳适配品种。

6. 结合机器学习技术。可以考虑使用机器学习来优化止损距离、开仓规则等参数。

## 总结

双向反转策略整体来说是一个非常简洁实用的短线策略思路。它同时适合价格反转上涨和下跌的情况,可以有效捕捉反转机会。但该策略也存在一些风险,需要对止损距离、开仓规则等进行优化来降低风险和提高策略稳定性。如果能抓住关键点进行优化,该策略可以成为一个非常实用的短线交易工具。

||


## Overview

The bi-directional reversal strategy is a simple Bitcoin trading strategy that sets stop-loss buy orders based on the previous day's trading range. The core idea of this strategy is that if the opening price on the current day is higher than the previous day's closing price, set a stop-loss buy near the high; if the opening price is lower than the previous day's closing price, set a stop-loss buy near the low. 

## Strategy Logic

The strategy first calculates the trading range of the previous day, which is the highest price minus the lowest price. After the opening of the current day, it judges whether the price is higher or lower than the previous day's closing price. If higher, the stop-loss buy price is set to the opening price plus 0.6 times the previous day's range. If lower, the stop-loss buy price is set to the opening price plus 1.8 times the previous day's range. The strategy will open a long position when the stop loss is triggered, and close the position before the end of the current day. 

Specifically, the strategy contains two entry rules:

1. If the opening price of the current day is higher than the previous day's closing price (longCond1 satisfied), and within the backtest time window (window() satisfied), set a stop-loss buy at the opening price plus 0.6 times the previous day's range (strategy.long1).

2. If the opening price of the current day is lower than the previous day's closing price (longCond2 satisfied), and within the backtest window, set a stop-loss buy at the opening price plus 1.8 times the previous day's range (strategy.long2).

The strategy will open a long position when either of the above stop losses is triggered, and close the position before the end of the day using strategy.close_all().

## Advantage Analysis 

The bi-directional reversal strategy has the following advantages:

1. Captures reversal movements without directional bias. The strategy considers both upside and downside, capturing reversal breakouts in either direction.

2. Controllable risk with stop loss. The predetermined stop loss effectively limits the maximum loss per trade. 

3. Avoids overnight risk by closing all positions daily. Closing out before the end of each day eliminates the risk of huge overnight price swings.

4. Higher trading frequency for short-term trading. Holding positions for only one day ensures a high frequency of trades.

5. Simple and clear logic, easy to understand and implement.

## Risk Analysis

However, there are also some risks to note for the strategy:

1. Improper stop loss distance may result in stop loss being hit. If the stop loss is too tight, it could get stopped out prematurely in extreme market conditions.

2. High trading frequency may incur significant transaction costs. The daily opening and closing of positions can accumulate considerable commission fees.

3. Prone to being stopped out in choppy ranging markets. Stop losses tend to be triggered more frequently in whipsaw conditions.

4. Unable to ride trending moves. The strategy is more suited for reversals, unable to capture profits from trend continuations.

## Enhancement Opportunities 

Some ways the strategy can be enhanced:

1. Optimize stop loss distance. Test different stop levels to find optimal stop loss points. Also consider dynamic stops based on market volatility.

2. Add trend filters. Check larger timeframe trends before entry to avoid counter-trend trades. 

3. Improve entry rules. Consider adding volume or momentum indicators to increase entry precision.

4. Introduce position management. Test trailing stops or trend following exits to ride profitable trends.

5. Test different products. The strategy may work better with higher volatility products.

6. Utilize machine learning techniques. Optimize parameters like stops and entries using ML algorithms.

## Conclusion

Overall, the bi-directional reversal strategy is a very simple and practical short-term strategy concept. It can effectively capture reversal opportunities in both upside and downside moves. However, risks like stop loss distance and entry rules need to be optimized to reduce risks and improve robustness. With key refinements, the strategy can become a very useful short-term trading tool.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|length|
|v_input_2|1.1|Stop Loss Percent|
|v_input_3|9|Profit Percent|
|v_input_4|true|From Month|
|v_input_5|true|From Day|
|v_input_6|2018|From Year|
|v_input_7|3|To Month|
|v_input_8|true|To Day|
|v_input_9|2029|To Year|
|v_input_10|true|End of Session Close Out?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Simple strat", shorttitle="Simple Strat", overlay=true)

// X001TK R1 strategy
//
// 
// This strategy combines the special approach in previous daily range trading
//
// This strategy goes long on stop buy order which is calculated as previous day range
// multiplied by special number.
//
// This pure strategy does not have any
// stop loss or take profit money management logic.
//
// Exit rule is simple. We close the position on market close or next day open
//
// 
// 
//
// Input
length = input(10, minval=1)
stopLossPercent=input(1.1,"Stop Loss Percent")
profitPercent=input(9,"Profit Percent")


// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2018, title = "From Year", minval = 2000)
ToMonth   = input(defval = 3, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 2029, title = "To Year", minval = 2017)
ses_cls = input(defval=true, title="End of Session Close Out?")


// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"


// === STRATEGY ===
// conditions
longCond1 = close>close[1]
longCond2 = close<close[1]


strategy.entry("long1", strategy.long, when=longCond1==true and window()==true, stop=close+(high - low)*0.6)
strategy.entry("long2", strategy.long, when=longCond2==true and window()==true, stop=close+(high - low)*1.8)
strategy.close_all(when=ses_cls)

// === /STRATEGY ===
```

> Detail

https://www.fmz.com/strategy/430891

> Last Modified

2023-11-02 16:47:08
