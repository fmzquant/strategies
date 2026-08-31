
> Name

Breakout-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description


This is an SEO optimized article about the Donchain Breakout strategy: 

### Strategy Overview

The breakout tracking strategy is a long-only short-term trading strategy. It monitors whether the price breaks out above the Bollinger Band upper rail and goes long if the breakout happens. There are two exit options: the first is to exit when the price breaks down below the Bollinger Band lower rail, and the second is to exit when the price breaks down below the middle line. This strategy ignores the impact of slippage and commissions on profit calculation.

### Strategy Logic

1. Go long when the price breaks out above the Bollinger Band upper rail.  

2. There are two exit options:

    - Option 1: Exit when the price breaks down below the Bollinger Band lower rail.

    - Option 2: Exit when the price breaks down below the Bollinger Band middle line.
    
3. Slippage and commissions are not considered in profit calculation.

The strategy utilizes the Bollinger Bands indicator to determine the trend and overbought/oversold situation. The Bollinger Bands consist of a middle line, an upper rail and a lower rail. The middle line is a simple moving average of the closing prices over n periods. The upper and lower rails are plotted based on standard deviation to form an envelop channel. The upper and lower rails can be seen as the future resistance and support levels of the price.

When the price breaks out above the upper rail, it signals that an uptrend is forming and a long position can be initiated. When the price breaks down below the lower rail, it indicates the coming of a downtrend and the position should be closed. The middle line represents the average price level. 

The advantage of this strategy is that it uses Bollinger Bands to determine the trend direction, which can reduce the risk associated with false breakouts. It only goes long when an uptrend emerges, which aligns with the trend trading mentality. Also, there are two different exit options that can be selected based on market conditions.

### Advantages of the Strategy

- Uses Bollinger Bands to determine trends, reducing the risk of false breakouts

- Only goes long in uptrends, aligning with trend trading mentality 

- Provides two exit options to flexibly adapt to market changes

- Ignores slippage and commissions, making profit calculation simpler

- Applicable to different time frames, for intraday and trend trading

### Risk Warnings

- Still has some risks of false breakouts, which Bollinger Bands cannot completely avoid

- Ignoring slippage and commissions overestimates actual profits

- Being long-only means no profit can be made in downtrends

- Parameters like breakout period, middle line period should be adjusted for market changes

### Conclusion

Overall, the breakout tracking strategy is a highly optimized, risk-controlled trend following strategy. It uses Bollinger Bands to determine the trend direction and goes long when a trend emerges, with two exit mechanisms to control risks. The strategy is simple to implement and applicable to different time frames. But false breakouts should be watched out for, and parameters should be adjusted accordingly to adapt to the complex and ever-changing markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|length|
|v_input_2|true|Exit Option|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-09-14 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Senthaamizh

//Break out trading system works best in a weekly chart and daily chart of Nifty and BankNifty
//@version=4

strategy("Donchain BO",shorttitle = "DBO",default_qty_type = strategy.percent_of_equity,default_qty_value = 100, overlay=true)
length = input(20, minval=1)
exit = input(1, minval=1, maxval=2,title = "Exit Option") // Use Option 1 to exit using lower band; Use Option 2 to exit using basis line

lower = lowest(length)
upper = highest(length)
basis = avg(upper, lower)

l = plot(lower, color=color.blue)
u = plot(upper, color=color.blue)
plot(basis, color=color.orange)
fill(u, l, color=color.blue)

longCondition = crossover(close,upper[1])
if (longCondition)
    strategy.entry("Long", strategy.long)

if(exit==1)
    if (crossunder(close,lower[1]))
        strategy.close("Long")

if(exit==2) 
    if (crossunder(close,basis[1]))
        strategy.close("Long")




```

> Detail

https://www.fmz.com/strategy/426895

> Last Modified

2023-09-15 12:36:43
