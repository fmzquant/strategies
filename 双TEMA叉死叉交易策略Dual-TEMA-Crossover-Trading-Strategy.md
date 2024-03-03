
> Name

双TEMA叉死叉交易策略Dual-TEMA-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

双TEMA叉死叉交易策略是一种比较常见的跟踪价格趋势的策略。该策略使用两个不同参数的三重指数移动平均线TEMA,当快线从下方上穿慢线时生成做多信号,当快线从上方下穿慢线时平仓。该策略可以有效跟踪价格趋势,在趋势明确时获得较好的收益。

### 策略原理

该策略使用TEMA(三重指数移动平均线)作为主要的技术指标。TEMA的计算公式为:

TEMA = (3*EMA1) - (3*EMA2) + EMA3

其中,EMA1、EMA2和EMA3分别是长度为N的指数移动平均线EMA。TEMA通过三次计算EMA,可以更快速地响应价格变化。

策略使用长度较短的TEMA作为快线,长度较长的TEMA作为慢线。当快线上穿慢线时,即价格开始上涨,生成做多信号;当快线下穿慢线时,即价格开始下跌,平仓。

该策略的关键是参数设置和条件判断。快线设置较短周期如20天,可以更快捕捉价格变化;慢线设置较长周期如60天,可以滤除假突破。当价格出现明显上涨或下跌趋势时,快线可以快速上穿或下穿慢线,产生交易信号。

### 优势分析

该策略具有以下优势:

1. 使用TEMA指标可以更快速响应价格变化,捕捉趋势反转。

2. 双TEMA结构可以过滤假突破,进入高概率的趋势交易。

3. 可调参数设置灵活,可以根据市场调整参数,适应不同行情。

4. 策略逻辑简单清晰,容易理解实现,资金利用率高。

5. 可在趋势行情中获得较好收益,在具有明确趋势的市场中效果更佳。

### 风险分析

该策略也存在以下风险:

1. 在盘整行情中容易产生频繁交易亏损。

2. 如果参数设置不当,可能产生过多假信号。

3. 无法有效响应突发事件引起的短期行情变化。 

4. 存在一定的时间滞后,可能错过短线机会。

5. 大幅震荡行情中顺势打开头寸风险大。

6. 需适时调整参数以适应市场变化,需要一定参数优化经验。

对应风险管理措施:

1. 优化参数设置,避免过于敏感。

2. 结合其他指标过滤入场信号。 

3. 采用离场止损确保单笔亏损控制。

4. 降低仓位规模,控制单笔交易风险。

5. 增加参数优化判断和人工干预机制。

### 优化方向

该策略可以从以下方面进行优化:

1. 优化快线和慢线的参数,使其更好地适应不同品种和行情环境。可以引入动态参数优化机制。

2. 增加其他指标结合,如MACD、布林带等,提高信号的有效性。

3. 增加止损策略,如移动止损、时间止损、ATR止损等,控制亏损。

4. 结合VIX指数避免在恐慌时打开头寸。

5. 引入量能指标,在大量能明显放大时再考虑建仓。

6. 优化资金管理策略,如定额交易、仓位管理等。

7. 结合机器学习等对参数进行自动优化。

### 总结

双TEMA叉死叉策略整体是一个利用趋势指数指标进行趋势跟踪的策略。它有利于捕捉价格趋势,在明确趋势下进行交易。但也需要注意控制风险,避免使用不当造成损失。通过进一步的优化测试可以使策略 Parameters设置更科学合理,在趋势行情中获得较好收益。

||


### Overview

The dual TEMA crossover trading strategy is a common trend-following strategy using two TEMA (Triple Exponential Moving Average) lines with different parameters. It generates long signals when the faster TEMA crosses above the slower TEMA, and closes positions when the faster TEMA crosses below the slower TEMA. This strategy can effectively track price trends and gain profits when the trend is clear.

### Strategy Logic

The strategy utilizes the TEMA (Triple Exponential Moving Average) as the main technical indicator. The TEMA is calculated as:

TEMA = (3*EMA1) - (3*EMA2) + EMA3

Where EMA1, EMA2 and EMA3 are EMAs of period N. By calculating EMAs three times, TEMA can respond faster to price changes.

The strategy uses a shorter-period TEMA as the fast line, and a longer-period TEMA as the slow line. When the fast line crosses above the slow line, indicating an upside price move, it generates long signals. When the fast line crosses below the slow line, indicating a downside price move, it closes positions. 

The keys of this strategy lie in parameter tuning and condition logics. The fast line with a shorter period like 20-day can quickly capture price dynamics, while the slow line with a longer period like 60-day can filter out false breakouts. When a significant price uptrend or downtrend emerges, the fast line can cross above or below the slow line swiftly to produce trading signals.

### Advantage Analysis

The advantages of this strategy include:

1. TEMA can respond faster to price changes and capture trend reversals.

2. The dual TEMA structure helps filter false breakouts and enter high-probability trend trades.

3. Flexible adjustable parameters to adapt to different market conditions.

4. Simple and clear logic, easy to understand and implement, high capital utilization.

5. Good profits can be gained in trending markets, especially strong-trending ones.

### Risk Analysis

The risks of this strategy include:

1. Prone to frequent trading losses in range-bound markets.

2. May generate excessive false signals if parameters are not tuned properly. 

3. Unable to respond effectively to sudden events and short-term price moves.

4. Lagging signals may miss short-term opportunities. 

5. High risks of opening positions against strong swings.

6. Requires experience in parameter optimization to adapt to changing markets.

Risk management measures:

1. Optimize parameters to avoid oversensitivity.

2. Add other indicators to filter entry signals.

3. Use stop losses to limit single trade loss.

4. Reduce position sizing to control risk.

5. Add parameter optimization rules and manual intervention mechanisms.

### Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize fast and slow line parameters for different products and market conditions. Introduce dynamic parameter optimization mechanisms.

2. Incorporate other indicators like MACD, Bollinger Bands to improve signal validity. 

3. Add stop loss strategies like trailing stop, time stop, ATR stop to control losses.

4. Avoid opening positions when VIX is high.

5. Add volume indicators, only consider entering on obvious volume expansion.

6. Optimize money management like fixed fractional position sizing, drawdown control.

7. Use machine learning to automatically optimize parameters.

### Summary

The dual TEMA crossover strategy is an overall trend-following strategy using trend technical indicators. It helps capture price trends and trade along the trends. But risks should be managed properly to avoid losses from improper use. Further optimizations and tests can lead to more scientific parameter tuning and better performance in trending markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2020|From Year|
|v_input_4|true|To Month|
|v_input_5|true|To Day|
|v_input_6|9999|To Year|
|v_input_7|20|Fast Length|
|v_input_8|60|Slow Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-10-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © nickrober

//@version=4
strategy(title="TEMA Cross Backtest", shorttitle="TEMA_X_BT", overlay=true, commission_type=strategy.commission.percent, commission_value=0, initial_capital = 1000,  default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// Backtest inputs
FromMonth = input(defval=1, title="From Month", minval=1, maxval=12)
FromDay = input(defval=1, title="From Day", minval=1, maxval=31)
FromYear = input(defval=2020, title="From Year", minval=2010)
ToMonth = input(defval=1, title="To Month", minval=1, maxval=12)
ToDay = input(defval=1, title="To Day", minval=1, maxval=31)
ToYear = input(defval=9999, title="To Year", minval=2017)

// Define backtest timewindow
start = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish = timestamp(ToYear, ToMonth, ToDay, 23, 59)  // backtest finish window
window() =>  true

//TEMA Section
xLength = input(20, minval=1, title="Fast Length")
xPrice = close
xEMA1 = ema(xPrice, xLength)
xEMA2 = ema(xEMA1, xLength)
xEMA3 = ema(xEMA2, xLength)
xnRes = (3 * xEMA1) - (3 * xEMA2) + xEMA3
xnResP = plot(xnRes, color=color.green, linewidth=2, title="TEMA1")

yLength = input(60, minval=1, title="Slow Length")
yPrice = close
yEMA1 = ema(yPrice, yLength)
yEMA2 = ema(yEMA1, yLength)
yEMA3 = ema(yEMA2, yLength)
ynRes = (3 * yEMA1) - (3 * yEMA2) + yEMA3
ynResP = plot(ynRes, color=color.red, linewidth=2, title="TEMA2")

fill(xnResP, ynResP, color=xnRes > ynRes ? color.green : color.red, transp=75, editable=true)

// Buy and Sell Triggers
LongEntryAlert = xnRes > ynRes
LongCloseAlert = xnRes < ynRes
ShortEntryAlert = xnRes < ynRes
ShortCloseAlert = xnRes > ynRes

// Entry & Exit signals
strategy.entry("Long", strategy.long, when = xnRes > ynRes and window()) 
strategy.close("Long", when = xnRes < ynRes)
//strategy.entry("Short", strategy.short, when = xnRes < ynRes and window())
//strategy.close("Short", when = xnRes > ynRes)
```

> Detail

https://www.fmz.com/strategy/429085

> Last Modified

2023-10-12 17:34:19
