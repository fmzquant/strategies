
> Name

双重动量策略Dual-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description


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
