
> Name

ATR-动态止盈止损策略ATR-Dynamic-Profit-Target-and-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description



[trans]

## 策略原理

该策略运用动态止盈止损点来进行交易。止盈止损点根据当前价位和波动率进行实时调整。

具体交易逻辑:

1. 计算一定周期(如20天)的平均真实波动幅度ATR

2. 当处于看涨状态时,止盈止损点为最高价减去ATR乘数

3. 当处于看跌状态时,止盈止损点为最低价加上ATR乘数 

4. 价格超过止盈止损点时进行反向交易

5. 当价格突破止盈止损点时改变趋势状态

6. 根据新状态调整止盈止损位

该策略充分利用ATR来自动设置止损止盈位,实现动态跟踪。能够及时锁定利润,避免损失扩大。

## 策略优势

- ATR自动计算止盈止损位

- 动态调整,实时跟踪价格

- 及时止损止盈,控制风险

## 策略风险

- ATR参数需要反复测试优化

- 止损过于接近,容易被止损

- 需关注ATR值的实时变化

## 总结

该策略使用ATR动态设置止盈止损位,实现自动跟踪。优化ATR参数可以获得更好止损效果。但过于接近的止损需谨慎采用。


||

## Strategy Logic

This strategy uses dynamic profit targets and stop losses that adjust based on current price and volatility.

The logic is:

1. Calculate Average True Range (ATR) over a period (e.g. 20 days)

2. In uptrend, profit target/stop is highest price minus ATR multiple 

3. In downtrend, profit target/stop is lowest price plus ATR multiple

4. Reverse trade when price exceeds profit target/stop 

5. Trend changes when price breaches profit target/stop

6. Adjust profit target/stop based on new trend state

The strategy leverages ATR to automatically set dynamic trailing profit targets and stops. This allows timely locking in of profits and preventing excessive losses.

## Advantages

- ATR automatically calculates profit/stop levels

- Dynamic adjustment trails price in real-time

- Timely profit taking and stopping controls risk

## Risks 

- ATR parameters require optimization

- Stops too close risks being stopped out

- Need to monitor real-time ATR changes

## Summary

This strategy uses ATR to dynamically set profit/stop levels for automatic trailing. ATR tuning can improve stop performance. But over-tight stops require caution.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|length|
|v_input_2|true|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-13 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Dhananjay Volatility stop strategy v1.0", overlay=true)


length = input(20)
mult = input(1)
atr_ = atr(length)
max1 = max(nz(max_[1]), close)
min1 = min(nz(min_[1]), close)
is_uptrend_prev = nz(is_uptrend[1], true)
stop = is_uptrend_prev ? max1 - mult * atr_ : min1 + mult * atr_
vstop_prev = nz(vstop[1])
vstop1 = is_uptrend_prev ? max(vstop_prev, stop) : min(vstop_prev, stop)
is_uptrend = close - vstop1 >= 0
is_trend_changed = is_uptrend != is_uptrend_prev
max_ = is_trend_changed ? close : max1
min_ = is_trend_changed ? close : min1
vstop = is_trend_changed ? is_uptrend ? max_ - mult * atr_ : min_ + mult * atr_ : vstop1
plot(vstop, color = is_uptrend ? green : red, style=line, linewidth=2)

bearish = close < vstop 
bullish = close > vstop 


if (bullish)
    strategy.entry("Buy", strategy.long, 1)
    
    

if (bearish)
    strategy.entry("Sell", strategy.short, 1)
    
    
```

> Detail

https://www.fmz.com/strategy/426801

> Last Modified

2023-09-14 16:22:53
