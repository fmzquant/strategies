
> Name

双重动量策略Dual-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

双重动量策略通过识别股票连续上涨或下跌的K线形态,实现低买高卖的目的。它使用简单的指标判断,易于实现,适用于中短线交易。

### 策略原理

该策略主要基于两个指标:**上涨K线数量**和**下跌K线数量**。

- 当 close 上涨超过 LongEnterAfter 个K线时,做多;当 close 下跌超过 LongExitAfter 个K线时,平多仓。
- 当 close 下跌超过 ShortEnterAfter 个K线时,做空;当 close 上涨超过 ShortExitAfter 个K线时,平空仓。

以上参数可以通过调整 LongEnterAfter、LongExitAfter、ShortEnterAfter 和 ShortExitAfter 来确定具体的交易规则。

该策略捕捉股票价位动量的变化,通过持续监测每日收盘价的涨跌情况来判断进出场时机。当出现指标参数设置的K线形态时,进行相应的买入开仓或卖出平仓操作。

综上,双重动量策略的核心在于识别股价的短期涨跌趋势,以此来确定交易方向和时机。它简单直接,通过参数设置可以调整策略的积极程度。

### 优势分析

双重动量策略具有以下优势:

- 思路简单直接,易于理解和实现。
- 可配置参数,可以调整策略的积极程度。
- 关注股价短期趋势,有利于抓住股票动量。
- 结合止损可以有效控制风险。
- 适用于对股价波动较为敏感的个股,尤其是中小市值股票。

总体来说,双重动量策略适合对股价变化较为敏感,追求高操作频率的投资者。它可以抓住个股的短期运行,获得超额收益。通过调整参数可以控制策略的频率和风险。

### 风险分析

双重动量策略也存在以下风险:

- 过于依赖参数设置,不同参数可能导致交易频率和收益差异很大。
- 仅关注股价短期趋势,可能错过长线机会。
- 较高的交易频率增加交易成本和滑点风险。
- 止损设置不当可能导致超出可承受损失。
- 不适用于价格震荡或长期盘整的股票。
- 存在被套利的风险,需要关注成交量变化。

为了控制风险,可以考虑以下措施:

- 调整参数,降低交易频率,控制买卖点频繁切换的过优化风险。
- 适当延长持仓周期,关注中长线趋势。
- 设置止损点,严格控制单笔损失。
- 优选具有持续性突破的股票,避免选择震荡个股。
- 加大成交量的重要性,避免 volume 下降时的套利风险。

### 优化方向

该策略可以考虑以下几点进行优化:

- 增加趋势判断指标,避免趋势结束时的错交易。可以引入MACD、KDJ等指标判断大趋势。

- 增加成交量判断,在 volume 掉量时避免建仓。

- 设置移动止损以锁定利润,可以使用ATR至少N倍来跟踪止损。

- 增加回测参数组合优化,寻找最优参数以提高稳定性。

- 增加算法交易模块,实现更智能的 order management。

- 利用机器学习技术发现更有效的交易信号。

总体来说,主要优化方向是提高策略稳定性,控制风险,发掘更有效的alpha。同时,增强算法交易能力也很重要。

### 总结

双重动量策略通过简单的连续上涨下跌K线判断实现股票选时交易。它易于实现,可以调整参数控制积极程度。主要适合追求短期获利的投资者,尤其适合中小市值股票。同时,也需要注意参数过优化、止损设置、成交量变化等风险,通过优化可以提高策略稳定性。总体来说,双重动量策略是一个高效灵活的量化策略,值得探索其应用价值。

||

### Overview

The dual momentum strategy aims to buy low and sell high by identifying consecutive up or down candlestick patterns in stock prices. It uses simple indicators for decision making and is easy to implement for mid-to-short term trading.

### Strategy Logic

The strategy is based on two metrics: **number of rising bars** and **number of falling bars**. 

- Go long when close rises above LongEnterAfter bars, close long when close falls below LongExitAfter bars.

- Go short when close falls below ShortEnterAfter bars, close short when close rises above ShortExitAfter bars.

The exact trading rules are determined by tuning LongEnterAfter, LongExitAfter, ShortEnterAfter and ShortExitAfter. 

The strategy captures momentum shifts in stock prices by monitoring daily closing prices. It triggers entry and exit signals based on the candlestick patterns defined in the parameters.

In summary, the core of the dual momentum strategy is identifying short-term price uptrends and downtrends to determine trade direction and timing. It is simple and direct, and the aggressiveness can be adjusted through parameter tuning.

### Advantage Analysis

The dual momentum strategy has the following advantages:

- Simple and straightforward logic that is easy to understand and implement.

- Configurable parameters to adjust strategy aggressiveness.

- Captures short-term momentum which helps capitalize on stock trends.

- Stop loss can effectively control risks.

- Works well for stocks sensitive to price fluctuations, especially small-cap stocks.

Overall, the dual momentum strategy suits investors who are sensitive to price changes and pursue high trading frequency. It can capitalize on short-term stock moves and achieve alpha. The frequency and risk can be controlled through parameter tuning.

### Risk Analysis

The dual momentum strategy also has the following risks:

- Highly dependent on parameter settings which lead to large performance difference.

- Ignores long-term moves by focusing only on short-term trends.

- High trading frequency increases costs and slippage risks.

- Improper stop loss setting may lead to unacceptable loss.

- Not suitable for range-bound or long-consolidation stocks.

- Risks of being gamed by smart money when volume dries up.

The risks can be mitigated by:

- Adjusting parameters to reduce trading frequency and over-optimization risks.

- Allowing longer holding periods to account for medium-long term trends. 

- Setting stop loss to strictly control single trade loss.

- Selecting stocks with high momentum and avoiding choppy stocks.

- Increasing importance of volume to avoid risks when volume declines.

### Enhancement Opportunities

The strategy can be enhanced in several ways:

- Add trend indicators like MACD and KDJ to avoid trades against major trend.

- Add volume condition to avoid entries when volume declines.

- Add moving stop loss to lock in profits, e.g. xN ATR trailing stop.

- Optimize parameters through backtesting to improve stability.

- Incorporate algorithmic trading models for better order management. 

- Apply machine learning to discover more effective signals.

Overall, the main focus is improving stability, controlling risks, and discovering new alpha factors. Enhancing algorithmic trading capabilities is also important.

### Summary

The dual momentum strategy times the market through simple consecutive up/down bar metrics. It is easy to implement and the aggressiveness is adjustable. It suits short-term traders, especially for small-cap stocks. Risk management against over-optimization, stop loss, volume changes etc. is important. With enhancements, it can become a highly effective and flexible quant strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|enter long after X rising blocks|
|v_input_2|true|exit long after X falling blocks|
|v_input_3|2|enter short after X falling blocks|
|v_input_4|true|exit short after X rising blocks|
|v_input_5|2017|trade since year|
|v_input_6|true|trade since month|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-02 00:00:00
end: 2023-10-08 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// strategy(title="simple momentum", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// ====================================
// STUDY AND STRATEGY

// Inputs
LongEnterAfter = input(title="enter long after X rising blocks",  defval=2)
LongExitAfter = input(title="exit long after X falling blocks",  defval=1)
ShortEnterAfter = input(title="enter short after X falling blocks",  defval=2)
ShortExitAfter = input(title="exit short after X rising blocks",  defval=1)

// Criteria
Valid = change(time)
LongEnter = Valid and rising(close, LongEnterAfter)
LongExit = Valid and falling(close, LongExitAfter)
ShortEnter = Valid and falling(close, ShortEnterAfter)
ShortExit = Valid and rising(close, ShortExitAfter)

// ====================================
// STRATEGY

TradeSinceYear = input(title="trade since year",  defval=2017)
TradeSinceMonth = input(title="trade since month",  defval=1)

if year > TradeSinceYear or (year == TradeSinceYear and month >= TradeSinceMonth)
    strategy.entry("long", strategy.long, when = LongEnter)
    strategy.close("long", when = LongExit)

    strategy.entry("short", strategy.short, when = ShortEnter)
    strategy.close("short", when = ShortExit)

```

> Detail

https://www.fmz.com/strategy/428785

> Last Modified

2023-10-09 15:03:30
