
> Name

Momentum-ADX-with-RSI-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description



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
