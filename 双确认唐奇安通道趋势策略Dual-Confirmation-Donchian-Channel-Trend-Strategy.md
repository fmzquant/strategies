
> Name

双确认唐奇安通道趋势策略Dual-Confirmation-Donchian-Channel-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8a61e4008108c62c01.png)

### Overview

This strategy is developed based on the standard Donchian Channel indicator. It waits for two consecutive higher highs (or lower lows) for confirmation by default before issuing trading signals, so as to avoid being whipped out by market makers' fakeouts.  

The strategy also provides the option to disable the dual confirmation mechanism, so that it can issue trading signals immediately upon seeing new highs or lows.

For people who don't like to short, there is also the option to exclude short positions.

### Strategy Logic

The strategy is based on the upper and lower bands of the Donchian Channel indicator. The upper band is the highest high over the past n bars, while the lower band is the lowest low over the past n bars. The default lookback period n is 20.

The middle band is the average of the upper and lower bands, and can be used to gauge the trend direction.  

When the price breaks above the upper band, the strategy will long if there is no existing long position. When the price breaks below the lower band, the strategy will short if there is no existing short position.

To filter out false breakouts, the "wait for double confirmation" option is enabled by default. This means two consecutive higher highs (or lower lows) must be seen before a trading signal is issued.


### Advantage Analysis

The advantages of this strategy include:

1. The Donchian Channel indicator is simple and easy to understand. 

2. The dual confirmation mechanism effectively filters out false breakouts and avoids being trapped.

3. The channel lookback period is customizable to adapt to different market environments.  

4. The short selling option accommodates needs from different investors.

5. The code is clean and easy to comprehend for further development.


### Risk Analysis

There are also some risks with this strategy:

1. The dual confirmation may cause some trading opportunities to be missed.  

2. Improper channel period settings may result in overly frequent or sparse trading.

3. Long holding periods may fail to effectively control risks. 

4. Additional risks from short selling need to be watched out for.  

5. Backtest overfitting needs to be cautious about.

Corresponding solutions:

1. Disable dual confirmation or shorten the confirmation interval.  

2. Optimize parameters and select suitable channel periods. 

3. Set stop loss/profit to reasonably limit per trade loss.

4. Disable short selling, go long only.

5. Robustly evaluate strategy across different market environments.


### Enhancement Opportunities

Enhancement opportunities include:

1. Dynamically adjust position sizing based on volatility.  

2. Filter false breakouts based on breaking intensity metrics.

3. Incorporate trailing stop mechanism to follow trends.

4. Combine other indicators to determine trend direction and avoid missing major turning points.  

5. Auto-optimize parameters via machine learning.

These enhancements can further improve the stability and profitability of the strategy.


### Conclusion

This is a simple yet effective trend following strategy based on the dual confirmation mechanism of the Donchian Channel. With parameter tuning and feature expansion, the strategy can be adapted to a wider range of market environments and has great practical utility.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|length|
|v_input_2|true|Wait for double confirmation?|
|v_input_3|true|Include short positions|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-15 00:00:00
end: 2023-12-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Donchian Channels", shorttitle="DC", overlay=true, initial_capital=10000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, calc_on_every_tick=true)
length = input(20, minval=1)
lower = lowest(length)
upper = highest(length)
basis = avg(upper, lower)
bool inShortPos = false
bool inLongPos = false
bool wait4confirmation = input(true, title="Wait for double confirmation?")
bool doShort = input(true, title="Include short positions")

plot(basis, "Basis", color=#FF6D00)
u = plot(upper, "Upper", color=#2962FF)
l = plot(lower, "Lower", color=#2962FF)
fill(u, l, color=color.rgb(33, 150, 243, 95), title="Background")

//if(inShortPos == false and inLongPos == false)
if(not inLongPos and upper > upper[1])
    if(wait4confirmation)
        if(not inLongPos and upper > upper[1] and upper[1] > upper[2])
            strategy.close("Short", true)
            strategy.entry("Buy", true)
    else
        strategy.close("Short", true)
        strategy.entry("Buy", true)
else
    if(not inShortPos and lower < lower[1])
        if(wait4confirmation)
            if(not inShortPos and lower < lower[1] and lower[1] < lower[2])
                strategy.close("Buy", true)
                if(doShort)
                    strategy.entry("Short", true)
        else
            strategy.close("Buy", true)
            if(doShort)
                strategy.entry("Short", true)
```

> Detail

https://www.fmz.com/strategy/436209

> Last Modified

2023-12-22 10:55:06
