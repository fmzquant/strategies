
> Name

Momentum-Swing-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10e3464b94e8c9296b2.png)

## Overview

This is a daily interval swing trading strategy based on momentum techniques using ATR Stops. It was created by Kory Hoang from Stably.

The strategy identifies trend direction using momentum indicators and sets stop loss lines based on ATR to implement low-buy-high-sell swing trading.

## Strategy Logic

The code first sets the backtesting time range.

Then in the indicator section, the following indicators are calculated:

- atr(): calculate ATR for stop loss;  
- max\_/min\_: highest/lowest price of the previous bar;
- is_uptrend: judge if it's in an uptrend;
- vstop: stop loss line;

The main logic to judge trend is: 

If close is higher than the previous downside stop loss line vstop, it's judged as an uptrend; if close is lower than the previous upside stop loss line vstop, it's judged as a downtrend.

When trend changes, adjust the stop loss line position.  

Specifically, in an uptrend, the stop loss line is set to the highest price of the previous bar minus the ATR value; in a downtrend, the stop loss line is set to the lowest price of the previous bar plus the ATR value.

This realizes trend following stop loss.

In the trading rules section, open long/short positions when price breaks the stop loss line.

## Advantage Analysis

The advantages of this strategy:

1. Judge trend direction using momentum techniques, timely catch turning points and avoid false breakouts.
2. ATR stop loss traces highest/lowest price, can control risk well.  
3. Simple and clear strategy logic, easy to understand and implement.
4. Can make low-buy-high-sell trades between swings.

## Risk Analysis

There are also some risks:

1. Improper ATR parameter may cause stop loss to be too loose or too tight.
2. Fierce whipsaws may happen in ranging trends, causing consecutive stop loss.  
3. High trading frequency, higher commissions.

Some optimizations:

1. Test different ATR parameters to find the optimal.
2. Optimize stop loss combining volatility metrics on top of ATR. 
3. Add trend filter to avoid unnecessary trades during choppy markets.

## Optimization Directions

Some directions to optimize this strategy:

1. Test different ATR parameters to find the optimal. Backtest multiple parameter sets and evaluate return/risk ratio.  

2. Optimize stop loss combining volatility metrics on top of ATR. Add volatility metrics, relax stop loss properly during periods of increasing volatility.

3. Add trend filter to avoid trades during choppy market. Add trend judgment indicators, only trade when trend is clear.  

4. Add position sizing mechanism. Adjust position size based on account utilization ratio, consecutive stop loss times etc.

5. Add overnight gap risk control. Actively cut loss before market close to avoid overnight gap risk.

## Conclusion

As a basic daily swing trading strategy, the overall logic is clear. It judges trend with momentum techniques and utilizes ATR for trailing stop loss, effectively controlling risk.

Still large room for optimization, can improve from aspects like trend judgment, stop loss method, position sizing etc. to make the strategy more practical. Overall this strategy provides a solid framework for quantitative trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2010|From Year|
|v_input_4|12|To Month|
|v_input_5|31|To Day|
|v_input_6|2020|To Year|
|v_input_7|3|length|
|v_input_8|true|mult|
|v_input_9|true|Strategy Direction|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-29 00:00:00
end: 2024-02-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("BTC Swinger", overlay=true, commission_value = 0.25, default_qty_type=strategy.percent_of_equity, default_qty_value = 100)

/////////////////////////////////////////////////////////////
//START - SET DATE RANGE

// === BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1)
FromDay   = input(defval = 1, title = "From Day", minval = 1)
FromYear  = input(defval = 2010, title = "From Year")
ToMonth   = input(defval = 12, title = "To Month", minval = 1)
ToDay     = input(defval = 31, title = "To Day", minval = 1)
ToYear    = input(defval = 2020, title = "To Year")

startDate = time > timestamp(FromYear, FromMonth, FromDay, 1, 1)
endDate = time < timestamp(ToYear, ToMonth, ToDay, 23, 59)
withinTimeRange = true

/////////////////////////////////////////////////////////////
//END - SET DATE RANGE



/////////////////////////////////////////////////////////////
//START - INDICATORS

length = input(3)
mult = input(1, minval = 0.01)
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
plot(vstop, color = is_uptrend ? yellow : red, style=circles, linewidth=2)

/////////////////////////////////////////////////////////////
//END - INDICATORS



/////////////////////////////////////////////////////////////
//START - TRADING RULES
direction = input(defval=1, title = "Strategy Direction", minval=-1, maxval=1)
strategy.risk.allow_entry_in(direction == 0 ? strategy.direction.all : (direction < 0 ? strategy.direction.short : strategy.direction.long))

condition1 = close > vstop and withinTimeRange
condition2 = close < vstop and withinTimeRange

strategy.entry("BUY", strategy.long, when = condition1)
strategy.entry("SELL", strategy.short, when = condition2)

/////////////////////////////////////////////////////////////
//END - TRADING RULES
```

> Detail

https://www.fmz.com/strategy/441051

> Last Modified

2024-02-05 10:44:19
