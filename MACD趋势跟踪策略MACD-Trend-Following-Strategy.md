
> Name

MACD趋势跟踪策略MACD-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/830b1dca0535cb6a50.png)
[trans]

## 概述

MACD趋势跟踪策略是一种基于MACD指标的量化交易策略。该策略通过识别MACD指标金叉和死叉信号,来判断市场趋势,实现追踪股价趋势。

## 策略原理

MACD趋势跟踪策略的核心逻辑是:

1. 计算MACD线和信号线。
2. 当MACD线从下向上突破0时,记录此时的最高点,等待死叉信号。
3. 当MACD线从上向下跌破0时,记录此时的最低点,等待金叉信号。
4. 当发生金叉时,记录当前收盘价作为做多入场点,设置止损点,开仓做多。
5. 当发生死叉时,记录当前收盘价作为做空入场点,设置止损点,开仓做空。
6. 持有做多头寸时,如果收益率达到预设目标或回撤达到止损点,平仓获利了结。
7. 持有做空头寸时,如果收益率达到预设目标或回撤达到止损点,平仓获利了结。

通过这种趋势跟踪机制,该策略能及时捕捉市场趋势转折,实现盈利。

## 优势分析

MACD趋势跟踪策略具有以下优势:

1. 策略信号来源唯一清晰,由MACD指标直接产生,避免信号干扰。
2. 利用MACD指标的快慢线金叉死叉特征判断市场趋势方向,判断准确。 
3. 及时追踪趋势转折,跟踪盈利能力强。
4. 风险控制到位,有止损机制。

## 风险分析

MACD趋势跟踪策略也存在以下风险:

1. MACD指标容易产生虚假信号,可能导致超短线操作亏损。
2. 止损点设置不当,可能扩大单笔亏损。
3. 追踪盈利比例和止损点难以平衡,存在过度追踪导致亏损的风险。

针对上述风险,可以采取以下优化措施:

1. 结合其他指标过滤虚假信号。
2. 动态调整止损点。
3. 优化追踪盈利比例和止损点的参数。

## 优化方向 

MACD趋势跟踪策略可以从以下方面进行优化:

1. 优化MACD指标参数,降低虚假信号率。可以测试不同周期参数的MACD。

2. 增加成交量等其他指标过滤信号。可以设置最小成交量条件。

3. 设置动态追踪止损机制。可以根据波动率实时调整止损点。

4. 优化打开头寸的信号判定逻辑。可以设置更严格的信号触发条件。

5. 结合机器学习模型过滤信号。可以训练模型判断信号的可靠性。

## 总结

MACD趋势跟踪策略整体而言是一种较为成熟的量化策略。该策略利用MACD指标判断市场趋势方向,配合止损机制控制风险,能够有效跟踪股价趋势。但MACD指标本身也存在一定缺陷,容易产生虚假信号。因此该策略还有进一步优化的空间,主要集中在指标参数、止损机制、信号过滤等方面。

||


## Overview

The MACD Trend Following Strategy is a quantitative trading strategy based on the MACD indicator. This strategy identifies MACD golden cross and death cross signals to determine market trends and track price trends.  

## Strategy Logic

The core logic of the MACD Trend Following Strategy is:

1. Calculate the MACD line and signal line.  
2. When the MACD line crosses above 0 from bottom up, record the highest point then, and wait for death cross signal.
3. When the MACD line crosses below 0 from top down, record the lowest point then, and wait for golden cross signal.
4. When golden cross happens, record the current closing price as long entry point, set stop loss point, open long position.
5. When death cross happens, record the current closing price as short entry point, set stop loss point, open short position.
6. When holding long position, if profit ratio reaches preset target or drawdown reaches stop loss point, close position to realize profit.
7. When holding short position, if profit ratio reaches preset target or drawdown reaches stop loss point, close position to realize profit.

Through this trend following mechanism, the strategy can timely capture turns of market trends and make profits.

## Advantage Analysis 

The MACD Trend Following Strategy has the following advantages:

1. The source of strategy signals is singular and clear, generated directly by the MACD indicator, avoiding interference of signals.
2. Utilize the golden cross and death cross characteristics of the MACD indicator to determine market trend directions, with accurate judgements.  
3. Timely tracking turns of trends, with strong profit tracking capability. 
4. Proper risk control in place, with stop loss mechanism.

## Risk Analysis

The MACD Trend Following Strategy also has the following risks:

1. MACD indicator tends to generate false signals, which may lead to loss in ultra short-term operations.
2. Improper stop loss point settings may expand single loss.
3. Difficult to balance between profit tracking ratio and stop loss point, with risk of over tracking leading to loss.

To address the above risks, the following optimization measures can be adopted:

1. Combine with other indicators to filter out false signals.  
2. Dynamically adjust stop loss points.
3. Optimize parameters of profit tracking ratio and stop loss points.

## Optimization Directions

The MACD Trend Following Strategy can be optimized in the following aspects:

1. Optimize MACD indicator parameters to reduce false signal rate. Different cycle parameters of MACD can be tested.

2. Add other indicators like trading volume to filter out signals. Minimum trading volume conditions can be set.

3. Set up dynamic trailing stop loss mechanism. Stop loss points can be adjusted dynamically based on volatility. 

4. Optimize the signal determination logic for opening positions. More rigorous trigger conditions can be set.

5. Incorporate machine learning models to filter out signals. Models can be trained to judge reliability of signals.

## Conclusion

In general, the MACD Trend Following Strategy is a relatively mature quantitative strategy. It utilizes the MACD indicator to determine market trend directions, and controls risks with stop loss mechanism, which can effectively track price trends. But the MACD indicator itself also has some flaws, easy to generate false signals. So there are rooms for further optimization of this strategy, mainly on aspects like indicator parameters, stop loss mechanism, signal filtering etc.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-10 00:00:00
end: 2023-12-10 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("MACD Cross Strategy", overlay=true)

// Get MACD values
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)
var float entryLongPrice = na
var float entryShortPrice = na

var float highestLongProfit = 0
var float highestShortProfit = 0

var float highestMACD = 0
var float lowestMACD = 0
var bool haveOpenedLong = false
var bool haveOpenedShort = false

var float stoploss = 0.04 // To be adjust for different investment
var float minProfit = 0.05 // To be adjust for different investment

if macdLine > 0
    lowestMACD := 0
    highestMACD := math.max(highestMACD, macdLine)
    haveOpenedShort := false
else
    highestMACD := 0
    lowestMACD := math.min(lowestMACD, macdLine)
    haveOpenedLong := false

// Enter long position when MACD line crosses above the signal line
if ta.crossover(macdLine, signalLine) and macdLine < highestMACD and macdLine > 0 and haveOpenedLong == false
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit Long", from_entry = "Long", stop=close*(1 - stoploss))
    entryLongPrice := close
    haveOpenedLong := true

if ta.crossunder(macdLine, signalLine) and macdLine > lowestMACD and macdLine < 0 and haveOpenedShort == false
    strategy.entry("Short", strategy.short)
    strategy.exit("Exit Short", from_entry = "Short", stop=close*(1 + stoploss))
    entryShortPrice := close
    haveOpenedShort := true

// log.info("entryLongPrice:{0}", entryLongPrice)
if strategy.position_size > 0
    profit = close - entryLongPrice
    log.info("profit:{0}", profit)
    if profit > 0
        highestLongProfit := math.max(highestLongProfit, profit)
        if profit / entryLongPrice > minProfit and highestLongProfit * 0.8 > profit
            strategy.close("Long")
            highestLongProfit := 0

if strategy.position_size < 0
    profit = entryShortPrice - close
    if profit > 0
        highestShortProfit := math.max(highestShortProfit, profit)
        log.info("highestShortProfit={0}, profit={1}", highestShortProfit, profit)
        if profit / entryShortPrice > minProfit and highestShortProfit * 0.8 > profit
            strategy.close("Short")
            highestShortProfit := 0
```

> Detail

https://www.fmz.com/strategy/434983

> Last Modified

2023-12-11 14:57:00
