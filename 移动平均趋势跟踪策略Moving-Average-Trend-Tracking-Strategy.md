
> Name

移动平均趋势跟踪策略Moving-Average-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17196add57260196fb3.png)

#### Overview

This strategy is built based on the DMI indicator by monitoring the crossover of +DI and -DI to determine the trend direction of stock prices, and using the ADX indicator to identify the strength of the trend, so as to achieve trend tracking. When +DI crosses above -DI, go long; when the stop loss price is triggered or -DI crosses below +DI, close the position.

#### Strategy Principle 

This strategy uses two components of the DMI indicator: +DI and -DI. +DI measures upward momentum. The upward crossover of +DI over -DI indicates strengthening upside momentum. -DI measures downward momentum. The downward crossover of -DI below +DI indicates strengthening downside momentum.

When +DI crosses above -DI, an uptrend is emerging and the strategy goes long. After entering the position, a trailing linear stop loss tracks a certain percentage of the highest price. As the price pulls back, the stop loss price will move down accordingly, locking in some of the earlier profits to some extent.  

When -DI crosses below +DI, a downtrend takes over and the strategy closes its position. The ADX indicator can be used to identify the strength of the trend. The higher the ADX, the more pronounced the trend. As such, the strategy employs ADX as an ancillary indicator for entry, only entering a position when ADX is within a certain range.

In summary, this strategy captures inflection points in price trends to realize moving average trend tracking.

#### Advantage Analysis

The main advantages of this strategy are reflected in three aspects:

1. Using the DMI indicator to determine the direction of price trends is accurate and reliable. DMI is more accurate in judging trend reversals than simple moving averages and other indicators.

2. Applying the ADX indicator to identify the strength of trends avoids frequent trading in choppy markets, making the strategy more robust.

3. The linear trailing stop mechanism can dynamically adjust stop loss positions and exit early when trends reverse, locking in partial profits to effectively control risks.

4. The strategy rules are simple and clear, easy to understand and implement, suitable for algorithmic trading.

#### Risk Analysis

The main risks of this strategy are:

1. The possibility that the DMI indicator fails in certain special markets. DMI does not apply to all markets. It can generate false signals when the trend is not pronounced.

2. The risk of price gapping below the stop loss level before reversing down further. Leaving some buffer room can mitigate such risks. 

3. The risk from improper ADX parameter settings. ADX parameters directly affect strategy timing results. Performance will be impacted if set too high or too low.

4. The ease of being stopped out in a rapidly advancing uptrend due to the linear trailing stop method. The trailing stop parameters can be adjusted based on specific situations.

Risks can be further reduced through parameter tuning, strict stop losses, optimizing program architecture, etc.

#### Optimization Directions

This strategy can be optimized in several aspects:

1. Use other indicators like MACD, KDJ for auxiliary judgement to improve strategy stability.  

2. Test different stop loss methods such as curve trailing stops, time-based trailing stops, etc.

3. Add position sizing mechanisms to gradually build positions after trend direction is confirmed, improving profitability.

4. Incorporate high frequency factors, machine learning etc. to dynamically optimize DMI and ADX parameters for higher intelligence.  

5. Add programmatic risk control modules using risk budgeting etc. to tightly manage maximum drawdown.

Various means can be combined to effectively enhance strategy efficiency, stability and safety.

#### Summary

The overall logic of this strategy is clear and easy to understand, using the DMI indicator to determine price trend direction and the ADX indicator as an ancillary gauge of trend strength, with linear trailing stops effectively controlling risk. The strategy is relatively stable but still calls for caution against certain risks. Through continuous optimization and testing, incremental improvements can be made to strategy robustness and efficiency. It is believed that this strategy has the potential to become an excellent representative of moving average trend tracking strategies.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|ADX Smoothing|
|v_input_int_2|6|DI Length|
|v_input_int_3|50|ADX Max Buying Area|
|v_input_int_4|false|ADX Min Buying Area|
|v_input_float_1|3|Trail Long Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-13 00:00:00
end: 2024-02-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
//@version=5
//1.0 - 240202 @caddjax

strategy(title = "+DI Crossover", overlay=false)

//DMI + ADX Chart w/ overlay
// © jrregencia

lensig = input.int(14, title="ADX Smoothing", minval=1, maxval=50)
len = input.int(6, minval=1, title="DI Length")
up = ta.change(high)
down = -ta.change(low)
plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
trur = ta.rma(ta.tr, len)
plus = fixnan(100 * ta.rma(plusDM, len) / trur)
minus = fixnan(100 * ta.rma(minusDM, len) / trur)
sum = plus + minus
adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), lensig)
adxmax = input.int(50, title="ADX Max Buying Area", minval=1, maxval=100)
adxmin = input.int(0, title="ADX Min Buying Area", minval=0, maxval=99)



//DI cross alert
DIPcross = ta.crossover(plus, minus) ? plus : na
plotshape(DIPcross, style = shape.cross , color=color.white, location=location.absolute)

plot(adx, color=color.rgb(255, 238, 0, 23), title="ADX", linewidth=2)
p1 = plot(plus, color=color.rgb(16, 137, 0, 31), title="+DI", linewidth=1)
p2 = plot(minus, color=color.rgb(143, 82, 255, 25), title="-DI", linewidth=1)
adxmaxl = hline(adxmax, title="ADX MaxLine", color=color.silver, linestyle=hline.style_solid)
adxminl = hline(adxmin, title="ADX MinLine", color=color.silver, linestyle=hline.style_solid)
fill(p1, p2, title="Cloud Fill", color = plus > minus ? color.teal : color.red, transp=50)
fill(adxmaxl, adxminl, title="ADX Fill", color=color.silver, transp=90)

// Configure trail stop level with input options (optional)
longTrailPerc = input.float(3, title="Trail Long Loss (%)",
     minval=0.0, step=0.1) * 0.01
// Determine trail stop loss prices
longStopPrice = 0.0

// Determine entry condition
enterLong = ta.crossover(plus, minus) ? plus : na

longStopPrice := if strategy.position_size > 0
    stopValue = high[1] * (1 - longTrailPerc)
    math.max(stopValue, longStopPrice[1])
else
    0
// Submit entry orders
if enterLong
    strategy.entry("EL", strategy.long)    
// Submit exit orders for trail stop loss price
if strategy.position_size > 0
    strategy.exit("XL TRL STP", stop=longStopPrice)    
```

> Detail

https://www.fmz.com/strategy/442234

> Last Modified

2024-02-20 14:36:11
