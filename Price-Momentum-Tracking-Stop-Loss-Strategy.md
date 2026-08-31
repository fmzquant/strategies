
> Name

Price-Momentum-Tracking-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a947a3ff8db99e1b3a.png)


### Overview

This strategy calculates the momentum of price to determine the trend direction and sets bidirectional tracking stops to lock in profits, realizing stop loss following the trend. The strategy also combines activation levels to start tracking only after reaching a specified profit target, effectively preventing premature stop loss.  

### Strategy Logic  

It calculates 12-period momentum of price, and further calculates 1-period momentum of the momentum. When fast momentum (1-period momentum of price momentum) is greater than 0, it goes long. When less than 0, it goes short. This judges the direction change of price momentum to determine price trend.

It sets trailing stop distance and activation level. Trailing stop distance refers to adjusting the stop to a specified distance from the newest high or low when price reaches new highs or lows. Activation level means trailing stop starts only after reaching a certain profit ratio.  

The strategy locks in profits by tracking the highest price or lowest price, sending close orders when price pulls back beyond the set stop distance.

### Advantage Analysis

1. The dual momentum determination accurately judges the trend direction, reduces trades, and avoids being trapped.

2. Flexible trailing stop distance reduces risk and locks in profit.  

3. Activation level prevents premature stop loss by enabling trailing only after some profit target is reached.

4. Bidirectional stops comprehensively control risks for both longs and shorts. 

5. Simple and efficient calculation, easy to understand and implement.

### Risk Analysis

1. Dual momentum may generate reverse signals, needing trend filter.

2. Excessive stop distance may cause significant losses.  

3. High activation level may miss stop opportunities. 

4. More parameter testing and optimization is needed to find optimal stops.

Can reduce false signals via trend judgment and parameter optimization. Test on different products and parameter sets to find best configuration.

### Optimization Directions  

1. Combine market structure recognition for trend, avoiding reverse trading.

2. Add more timing conditions like volume changes, squeeze breakouts to improve signal accuracy.

3. Optimize parameters by testing different stop distance and activation levels.  

4. Consider dynamic trailing stop depending on market volatility.

5. Set partial stops or moving stops for better risk control.

### Conclusion

The strategy has clear structure, judging trend with dual momentum and locking profits with flexible trailing stops, effectively controlling trading risks. It is easy to understand and implement, with optimizable space. Adding more technical indicators and parameter testing can further improve strategy performance. The strategy provides ideas and references for realizing stop loss management.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|length|
|v_input_float_1|false|(?strategy)Trailing Stop Activation ||
|v_input_float_2|false|Position Trailing Stop ||


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-02-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Trailing Stop Snippet", overlay=true)

length = input(12)
price = close
momentum(seria, length) =>
	mom = seria - seria[length]
	mom
mom0 = momentum(price, length)
mom1 = momentum( mom0, 1)

tsact = input.float(0.0, "Trailing Stop Activation |", group="strategy", tooltip="Activates the Trailing Stop once this PnL is reached.") / 100
tsact := tsact ? tsact : na
ts = input.float(0.0, "Position Trailing Stop |", group="strategy", tooltip="Trails your position with a stop loss at this distance from the highest PnL") / 100
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

//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)

plotchar(ts_get, "GET", "")
plot(strategy.position_avg_price > 0 ? strategy.position_avg_price : na, "Average", color.rgb(251, 139, 64), 2, plot.style_cross)
plot(tsClose > 0 ? tsClose : na, "Trailing", color.rgb(251, 64, 64), 2, plot.style_cross)
plot(strategy.position_avg_price - strategy.position_avg_price * tsact > 0 ? strategy.position_avg_price - strategy.position_avg_price * tsact : na, "TS Activation", color.fuchsia, 2, plot.style_cross)
```

> Detail

https://www.fmz.com/strategy/433405

> Last Modified

2023-11-27 11:45:04
