
> Name

Bollinger-Break-Out-Strategy-with-Pyramiding

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/1606951bbba430f89cf.png)

## Overview 

This strategy enters long or short positions based on breakouts of Bollinger Bands. It goes long when price breaks below lower band and goes short when price breaks above upper band. After entering positions, it continues pyramiding and updates stop loss in real-time.

## Strategy Logic

The strategy uses 3 lines of Bollinger Bands - middle, upper and lower. The middle line is n-day moving average. The upper line is middle line + k * n-day standard deviation. The lower line is middle line - k * n-day standard deviation. Usually n is 20 and k is 2.

When price breaks out above upper line, it signals an downward trend and goes short. When price breaks out below lower line, it signals an upward trend and goes long.  

After taking positions, the strategy keeps pyramiding, which means adding more positions in the same direction. The pyramiding entry rule is when price touches the middle line again after initial entry.

The stop loss for all positions are also updated in real-time based on the difference between current average holding price and the band price.

## Advantage Analysis

The advantages of this strategy includes:

1. Use Bollinger Bands to identify breakouts and trend changes accurately. 
2. Enter positions on golden cross and dead cross systematically.
3. Earn more profit through pyramiding. 
4. Real-time stop loss updating to avoid being knocked out.

## Risk Analysis

There are also some risks of this strategy:

1. Bollinger Bands are sensitive to market volatility and may incur whipsaws.
2. Pyramiding increases exposure and leverages potential loss. 
3. Stop loss is not guaranteed and still has the probability of being stopped out.

Some methods to tackle the risks:

1. Optimize Bollinger Bands parameters for different cycles.
2. Adjust pyramiding scale and frequency.  
3. Add middle line as further stop loss line.

## Optimization Directions

The strategy can be optimized from below aspects:

1. Optimize parameters of Bollinger Bands to adapt more market regimes.
2. Improve pyramiding logic to balance risk-reward.
3. Add more stop loss lines like middle line.  
4. Develop profit taking mechanism to lock profit proactively.
5. Combine other indicators to filter entries.
6. Enhance risk management to control loss per trade.  

## Conclusion

In conclusion, this is a typical trend following strategy. It rides the momentum when trend emerges and makes profit accordingly. Meanwhile, it also contains inherent risks. Further optimizations are needed to adapt more market conditions and tackle the whipsaw risk.  

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|bb_length|
|v_input_int_2|2|bb_mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-16 00:00:00
end: 2023-11-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5

strategy(title='Bollinger Band strategy with split, limit, stop', shorttitle='bb strategy', overlay=true,commission_type = strategy.commission.percent, commission_value = 0.01, default_qty_type = strategy.percent_of_equity, default_qty_value = 10, pyramiding = 4)



//Summary: Going Long or Short when Entering after Breaking the Bollinger Bands\
//At this time, the stop-loss, profit-taking price, and pyramiding standard\
// are determined from the difference between the position average price and the band price.

//After entering the position, if the price crosses the mid-band line, the stop loss is adjusted to the mid-band line.



//each trade, entry position size = 10% of total cash
//max pyramiding is 4
//commission = 0.01%





in_period = true


bb_length = input.int(20)
bb_mult = input.int(2)

[middle, upper, lower] = ta.bb(close,bb_length, bb_mult)
plot(middle, color=color.aqua)
plot(upper, color=color.orange)
plot(lower, color=color.orange)
long_cond = ta.crossover(close,lower)
short_cond = ta.crossunder(close,upper)

var saved_ph = 0.0
if strategy.opentrades>0 and strategy.opentrades[1]==0 and strategy.position_size > 0
    saved_ph := upper[1]
var saved_pl = 0.0
if strategy.opentrades>0 and strategy.opentrades[1]==0 and strategy.position_size < 0
    saved_pl := lower[1]

avg = strategy.position_avg_price

long_diff = saved_ph-avg
short_diff = saved_pl-avg

long_stoploss = avg - 1*long_diff
short_stoploss = avg - 1*short_diff

long_avgdown = avg - 0.5*long_diff
short_avgup = avg - 0.5*short_diff

long_profit_price = avg + 0.5*long_diff
short_profit_price = avg + 0.5*short_diff

var label _label = na
if in_period
    if long_cond and strategy.opentrades==0
        strategy.entry("Long",strategy.long)
    if long_cond and strategy.opentrades >0 and (close[1]<long_avgdown or close[2]<long_avgdown)
        strategy.entry("Long",strategy.long)

    if short_cond and strategy.opentrades==0
        strategy.entry("Short", strategy.short)
    if short_cond and strategy.opentrades>0 and (close[1]>short_avgup or close[2]>short_avgup)
        strategy.entry("Short",strategy.short)

plot(avg, style=plot.style_linebr)


plot(strategy.position_size > 0? long_profit_price: na,color=color.green, style=plot.style_linebr)
plot(strategy.position_size > 0? long_avgdown: na,color=color.yellow, style=plot.style_linebr)
plot(strategy.position_size > 0? long_stoploss: na,color=color.red, style=plot.style_linebr)

plot(strategy.position_size < 0? short_profit_price: na,color=color.green, style=plot.style_linebr)
plot(strategy.position_size < 0? short_avgup: na,color=color.yellow, style=plot.style_linebr)
plot(strategy.position_size < 0? short_stoploss: na,color=color.red, style=plot.style_linebr)

if strategy.position_size > 0
    if ta.crossover(close, middle)
        strategy.exit("Long Exit", "Long", limit=long_profit_price, stop=middle)
    else
        strategy.exit("Long Exit", "Long", limit=long_profit_price, stop=long_stoploss)
if strategy.position_size < 0
    if ta.crossunder(close, middle)
        strategy.exit("Short Exit", "Short", limit=short_profit_price, stop=middle)
    else
        strategy.exit("Short Exit", "Short", limit=short_profit_price, stop=short_stoploss)
```

> Detail

https://www.fmz.com/strategy/432992

> Last Modified

2023-11-23 14:01:57
