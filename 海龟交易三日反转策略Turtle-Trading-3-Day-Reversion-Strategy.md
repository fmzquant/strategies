
> Name

海龟交易三日反转策略Turtle-Trading-3-Day-Reversion-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

海龟交易三日反转策略是基于拉里·康诺斯和塞萨尔·阿尔瓦雷斯的《高概率ETF交易》一书中“三日均值回归策略”修改而来。书中作者讨论了一种高概率的ETF均值回归策略,其简单规则是:

- 如果昨日收盘价低于5日简单移动平均线,今日买入。
- 如果今日收盘价高于5日简单移动平均线,今日卖出。

通过实践和回测,我发现如果使用EMA而不是SMA计算趋势线,这个策略的效果会更好。所以,这个脚本使用EMA来计算趋势线。我还使退出EMA的长度可调。

## 策略原理

该策略的工作原理如下:

- 当满足以下买入条件时,做多:
  - 收盘价高于200日EMA
  - 收盘价低于5日EMA
  - 今日最高价低于昨日最高价
  - 今日最低价低于昨日最低价 
  - 昨日最高价低于前日最高价
  - 昨日最低价低于前日最低价
  - 前日最高价低于前前日最高价
  - 前日最低价低于前前日最低价
- 当收盘价上穿退出EMA时,平仓

其中,退出EMA默认是5日EMA,可调整长度。

该策略的主要思想是利用短期反转效应。当股价连续下跌后表现疲软,很可能会出现短期反弹。该策略通过判断价格是否连续三日收窄且低于短期均线来判断是否存在反转机会。一旦发生反转,通过突破退出EMA来及时止损。

## 优势分析

相较于传统的移动均线交叉策略,该策略有以下优势:

1. 利用三日连续收窄判断反转机会,提高了交易信号的质量。

2. 结合长短均线过滤,避免在趋势市场中交易。只在盘整区域捕捉反转。

3. 采用EMA而不是SMA计算趋势线,更加灵敏,捕捉反转更及时。

4. 退出EMA的长度可调,可以根据市场调整止损策略。

5. 交易频率较低,每次只持仓1-2天,避免多头持仓的风险。

## 风险分析

该策略也存在以下风险:

1. 反转失败的风险。反转信号发生后,价格可能失败突破,继续下跌而不是反弹。

2. 频繁止损的风险。在震荡行情中,价格可能频繁触发止损。

3. 参数优化风险。退出EMA和其他参数需要根据市场不断测试和优化,如果不调整可能导致效果变差。

4. 过度优化风险。优化时要注意避免过拟合,参数设置要稳健。

可以通过以下方法降低风险:

1. 严格遵守止损规则,控制单笔损失。

2. 优化时采取稳健参数设置,做到风险和收益平衡。

3. 调整仓位大小,降低单笔仓位,分散风险。

## 优化方向 

该策略可以从以下方面进行优化:

1. 测试不同长度的EMA作为入市和出市指标,找到更合适的参数。

2. 增加其他过滤条件,例如量能指标,确保反转信号更可靠。

3. 优化止损策略,例如采用ATR止损、追踪止损等方式,让止损更灵活。

4. 结合趋势判断,避免反转信号发生在趋势中的错误交易。

5. 进行组合优化,与其他策略组合,利用非相关性分散风险。

6. 采用机器学习等方法进行参数自适应优化,让参数动态调整。

## 总结

海龟交易三日反转策略通过判断价格连续三日收窄并低于短期EMA的形态,寻找短期反转机会。与传统移动均线策略相比,它入场信号更可靠,通过调整退出EMA参数优化止损。该策略适用于盘整震荡市,能捕捉短期反弹。但在参数优化、止损策略等方面还有优化空间。若与趋势判断和其他策略组合,可以进一步提高效果。

||


## Overview

The Turtle Trading 3-Day Reversion Strategy is a modification of the "3-day Mean Reversion Strategy" from the book "High Probability ETF Trading" by Larry Connors and Cesar Alvarez. In the book, the authors discuss a high-probability ETF mean reversion strategy with these simple rules:

- If yesterday's close is below the 5-day simple moving average, buy today.  
- If today's close is above the 5-day simple moving average, sell today.

Through practice and backtesting, I have found that the strategy consistently works better when using an EMA instead of an SMA for the trend line. So this script uses an EMA for the trend line. I have also made the length of the exit EMA adjustable.

## Strategy Logic

The strategy works as follows:

- Go long when the following buy conditions are true:
  - Close is above 200-day EMA
  - Close is below 5-day EMA
  - Today's high is lower than yesterday's high
  - Today's low is lower than yesterday's low
  - Yesterday's high is lower than the previous day's high
  - Yesterday's low is lower than the previous day's low
  - Previous day's high is lower than 2-day ago's high
  - Previous day's low is lower than 2-day ago's low
- Exit when close crosses above the exit EMA

The exit EMA defaults to 5-day EMA, its length is adjustable.

The main idea of the strategy is to take advantage of short-term mean reversion. When prices decline continuously, they are likely to bounce back in the short-term. The strategy identifies mean reversion opportunities by checking if prices narrowed for 3 consecutive days below a short-term EMA. Once reversal happens, it exits promptly when price breaks above the exit EMA.

## Advantage Analysis 

Compared to traditional moving average crossover strategies, this strategy has the following advantages:

1. Using 3-day consecutive narrowing to identify reversals improves signal quality.

2. Filtering with long and short EMAs avoids trading in trending markets. It only trades mean reversions in range-bound zones.

3. Using EMA instead of SMA for trend line is more sensitive in catching reversals. 

4. Adjustable exit EMA length allows customizing the stop loss strategy based on market conditions.

5. Low trading frequency with 1-2 day holding periods avoids risks associated with long directional bets.

## Risk Analysis

The strategy also has the following risks:

1. Failed reversal risk. Price may fail to bounce and continue declining after the reversal signal.

2. Frequent stop loss risk. Price could repeatedly hit stop loss in choppy markets.

3. Parameter optimization risk. Exit EMA and other parameters need continual testing and tuning based on evolving markets. Performance could degrade without adjustment.

4. Overfitting risk. Optimization should avoid overfitting. Parameters should be robust. 

Risks can be reduced by:

1. Strictly following stop loss rules to control single trade loss.

2. Robust parameter tuning during optimization to balance risk and return.

3. Adjusting position sizing to lower risk per trade.

## Optimization Opportunities

The strategy can be improved in the following aspects:

1. Test different EMA lengths for entry and exit to find optimal parameters.

2. Add other filters like volume to ensure reversal signals are more reliable.

3. Enhance stop loss with methods like ATR or trailing stops for more flexibility.

4. Incorporate trend filter to avoid taking reversal signals in existing trends.

5. Combine with other strategies for portfolio optimization and diversification.

6. Employ machine learning for adaptive parameter tuning.

## Summary

The Turtle Trading 3-day Reversion Strategy identifies short-term reversal opportunities by detecting 3-day narrowing patterns below a short EMA. Compared to traditional moving average strategies, it has more reliable entry signals and adjustable exit EMA for stop loss optimization. The strategy works well for range-bound choppy markets and catching short bounces. But there are further opportunities to improve parameters, stop loss, and trend filters. Combining with other strategies can further enhance performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Jan 2012 05:00 +0000)|Start Time|
|v_input_2|timestamp(01 Jan 2099 00:00 +0000)|End Time|
|v_input_int_1|5|EMA Length For Exit Strategy|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-05 00:00:00
end: 2023-10-12 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// @version = 5
// Author = TradeAutomation


strategy(title="ETF 3-Day Reversion Strategy", shorttitle="ETF 3-Day Reversion Strategy", process_orders_on_close=true, overlay=true, commission_type=strategy.commission.cash_per_order, commission_value=1, initial_capital = 10000000, default_qty_type=strategy.percent_of_equity, default_qty_value=100)


// Backtest Date Range Inputs // 
StartTime = input(defval=timestamp('01 Jan 2012 05:00 +0000'), title='Start Time')
EndTime = input(defval=timestamp('01 Jan 2099 00:00 +0000'), title='End Time')
InDateRange = true

// Strategy Rules //
DayEMA5 = ta.ema(close, 5)
Rule1 = close>ta.ema(close, 200)
Rule2 = close<DayEMA5
Rule3 = high<high[1] and low<low[1] and high[1]<high[2] and low[1]<low[2] and high[2]<high[3] and low[2]<low[3]
ExitEMA = ta.ema(close, input.int(5, "EMA Length For Exit Strategy", tooltip = "The strategy will sell when the price crosses over this EMA"))
plot(DayEMA5)
plot(ExitEMA, color=color.green)

// Entry & Exit Functions //
if (InDateRange)
    strategy.entry("Long", strategy.long, when = Rule1 and Rule2 and Rule3)
//    strategy.close("Long", when = ta.crossunder(close, ATRTrailingStop))
    strategy.close("Long", when = ta.crossover(close, ExitEMA))
if (not InDateRange)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/429146

> Last Modified

2023-10-13 15:37:18
