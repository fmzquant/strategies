
> Name

动量ADX与RSI结合可调尾随停止策略Momentum-ADX-with-RSI-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略将动量指标与相对强弱指标(RSI)相结合,辅以可调尾随停损机制,旨在捕捉趋势方向,同时控制风险。当价格存在较强势头时,买入做多;当价格存在较弱势头时,卖出做空。策略同时设置止盈止损条件,利用尾随停损追踪最高盈利水平,能够锁定利润并减少亏损。

## 策略原理

### 动量线和RSI指标判断入场

- 使用动量指标ADX判断价格趋势方向

    - ADX大于20表示趋势存在

    - 当+DI线上穿-DI线时为看涨信号

    - 当-DI线下穿+DI线时为看跌信号

- RSI指标判断超买超卖

    - RSI高于70为超买区,看跌信号

    - RSI低于30为超卖区,看涨信号

当ADX判断趋势存在,且RSI指标发出确认信号时,做出相应的多空操作。

### 可调尾随停损机制

策略采用动态可调整的尾随停损机制,包括两个参数:

- 激活比例:开仓后价格达到设定比例时激活尾随停损

- 跟踪比例:尾随停损距离最近最高收益的比例距离

当价格达到激活条件后,尾随停损线会跟踪最高盈利水平。当价格回落,止损线会随之下移。如果回落幅度超过设定跟踪比例,则止损线会被触发,关闭所有仓位。

### 优势分析

- 动量指标判断趋势方向,避免企业费力冲顶

- RSI指标确保不会错过反转机会

- 可调尾随停损,既能锁定盈利,又能减少亏损

- 策略思路清晰简洁,容易理解实现

- 可广泛适用于不同市场和时间周期

### 风险及对策 

- ADX判断假突破产生错误信号

    - 调整ADX参数,确保真正趋势突破

- RSI产生多次假信号

    - 调整超买超卖参数,防止频繁交易

- 可调停损参数设置不当

    - 优化参数,找到最佳停损水平

- 大幅度跳空难以止损

    - 考虑结合限价单,防止错过止损

### 优化思路

- 测试不同ADX和RSI参数组合优化入场

- 回测不同止损激活点和跟踪幅度找最优参数

- 考虑加入其他指标进行过滤,提高信号质量

- 测试不同市场确定通用参数设置

## 总结

该策略整合动量分析、RSI指标和尾随停损机制,能够有效判断趋势方向、识别反转点位和控制交易风险。策略思路清晰,实施简单,可广泛用于股票、外汇、数字货币等市场的趋势交易。通过参数优化和指标过滤,可以进一步提高策略表现。该策略为交易者提供了一个简单可靠的量化交易方案。

|| 


## Overview

This strategy combines momentum indicators with the Relative Strength Index (RSI) along with a dynamic trailing stop mechanism to capture trend direction while controlling risk. It goes long when there is strong upward momentum and goes short when there is strong downward momentum. The strategy also sets profit taking and stop loss conditions using a trailing stop to lock in profits and reduce losses.

## How It Works

### Entry with Momentum ADX and RSI

- Use ADX indicator to determine price trend direction

    - ADX above 20 shows trend is present 

    - +DI crossing above -DI is long signal

    - -DI crossing below +DI is short signal

- RSI to identify overbought/oversold

    - RSI above 70 suggests overbought, short signal

    - RSI below 30 suggests oversold, long signal

Take long/short positions when ADX shows trend + RSI confirmation signal.

### Adjustable Trailing Stop 

The strategy uses a dynamic trailing stop mechanism with two parameters:

- Activation level: Activate trailing stop when price reaches set percentage after entry

- Trailing percentage: Stop level trails set percentage from highest profit

Once activated, the trailing stop will follow the highest profit level. As price retraces, the stop level moves lower. If retracement exceeds trail percentage, stop is triggered closing all positions.

### Advantages

- Momentum ADX determines trend direction, avoiding false breakouts

- RSI confirmation ensures reversal opportunities are not missed 

- Adjustable trailing stop locks in profits and minimizes losses

- Simple and clear strategy logic, easy to understand

- Applicable to various markets and timeframes

### Risks and Mitigations

- ADX may signal false breakout

    - Tune ADX parameters to detect true trend moves

- RSI may give multiple false signals

    - Adjust overbought/oversold levels to reduce whipsaws

- Poor trailing stop parameters

    - Optimize parameters to find best stop levels

- Gaps can cause missed stops

    - Consider using stop-limit orders

### Optimization Opportunities

- Test ADX/RSI combinations to optimize entries

- Backtest various activation levels and trail percentages

- Add additional filters to improve signal quality

- Test on different markets to find robust parameters

## Conclusion

This strategy integrates momentum analysis, RSI and trailing stops to effectively determine trend direction, spot reversals, and control risk. The straightforward logic makes it simple to implement across stock, forex, crypto, and other trending markets. Further improvements can come through parameter optimization and adding filters. Overall it provides traders with a robust quantitative trading framework.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|12|Momentum Length|
|v_input_int_2|14|RSI Length|
|v_input_1|70|RSI Overbought Level|
|v_input_2|30|RSI Oversold Level|
|v_input_float_1|false|(?strategy)Trailing Stop Activation (%)|
|v_input_float_2|false|Position Trailing Stop (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-03 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Trailing Stop with RSI", overlay=true)

length = input.int(12, "Momentum Length")
price = close
momentum(seria, length) =>
    mom = seria - seria[length]
    mom
mom0 = momentum(price, length)
mom1 = momentum(mom0, 1)

rsiLength = input.int(14, "RSI Length")
rsiOverbought = input(70, "RSI Overbought Level")
rsiOversold = input(30, "RSI Oversold Level")

rsiValue = ta.rsi(close, rsiLength)

tsact = input.float(0.0, "Trailing Stop Activation (%)", group="strategy", tooltip="Activates the Trailing Stop once this PnL is reached.") / 100
tsact := tsact ? tsact : na
ts = input.float(0.0, "Position Trailing Stop (%)", group="strategy", tooltip="Trails your position with a stop loss at this distance from the highest PnL") / 100
ts := ts ? ts : na

in_long = strategy.position_size > 0
in_short = strategy.position_size < 0

var ts_ = array.new_float()
ts_size = array.size(ts_)
ts_get = ts_size > 0 ? array.get(ts_, ts_size - 1) : 0

if in_long
    if tsact and high > strategy.position_avg_price + strategy.position_avg_price * tsact
        if ts_size > 0 and ts_get < high
            array.push(ts_, high)
        if ts_size < 1
            array.push(ts_, high)
    if not tsact
        if ts_size > 0 and ts_get < high
            array.push(ts_, high)
        if ts_size < 1
            array.push(ts_, high)
if in_short
    if tsact and low < strategy.position_avg_price - strategy.position_avg_price * tsact
        if ts_size > 0 and ts_get > low
            array.push(ts_, low)
        if ts_size < 1
            array.push(ts_, low)
    if not tsact
        if ts_size > 0 and ts_get > low
            array.push(ts_, low)
        if ts_size < 1
            array.push(ts_, low)

trail = in_long and ts_size > 0 ? low < ts_get - ts_get * ts : in_short and ts_size > 0 ? high > ts_get + ts_get * ts : na

if (mom0 > 0 and mom1 > 0)
    strategy.entry("MomLE", strategy.long, stop=high+syminfo.mintick, comment="MomLE")
else
    strategy.cancel("MomLE")
if (mom0 < 0 and mom1 < 0)
    strategy.entry("MomSE", strategy.short, stop=low-syminfo.mintick, comment="MomSE")
else
    strategy.cancel("MomSE")

tsClose = in_long ? ts_get - ts_get * ts : in_short ? ts_get + ts_get * ts : na
if trail
    strategy.close_all()
if not strategy.opentrades
    array.clear(ts_)

rsiOverboughtCondition = rsiValue >= rsiOverbought
rsiOversoldCondition = rsiValue <= rsiOversold

if rsiOverboughtCondition
    strategy.close("SHORT", "SX")
    strategy.entry("LONG", strategy.long)

if rsiOversoldCondition
    strategy.close("LONG", "LX")
    strategy.entry("SHORT", strategy.short)

plotchar(ts_get, "GET", "")
plot(strategy.position_avg_price > 0 ? strategy.position_avg_price : na, "Average", color.rgb(251, 139, 64), 2, plot.style_cross)
plot(tsClose > 0 ? tsClose : na, "Trailing", color.rgb(251, 64, 64), 2, plot.style_cross)
plot(strategy.position_avg_price - strategy.position_avg_price * tsact > 0 ? strategy.position_avg_price - strategy.position_avg_price * tsact : na, "TS Activation", color.fuchsia, 2, plot.style_cross)

```

> Detail

https://www.fmz.com/strategy/428796

> Last Modified

2023-10-09 15:36:07
