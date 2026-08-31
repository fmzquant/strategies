
> Name

Percentage-Band-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13fffd519d66ae63a18.png)

## Overview

The Percentage Band Moving Average strategy is a trend following strategy. It uses moving average as the baseline and calculates upper band and lower band based on percentage of price. It goes short when price breaks through upper band and goes long when price breaks through lower band. The biggest advantage of this strategy is that it can automatically adjust the fluctuation range and effectively capture trends in different market environments.

## Strategy Principle  

The core indicator of this strategy is moving average. The middle band is simple N-day moving average. The upper band and lower band are calculated based on percentage change of price. The specific formulas are:

Upper Band = Middle Band + Price * Upper Band Percentage 
Lower Band = Middle Band - Price * Lower Band Percentage

Here the upper band percentage and lower band percentage are adjustable parameters, default to 2, representing 2% of the price.  

When price goes up, both upper band and lower band will expand upwards at the same time. When price drops, both bands will contract downwards simultaneously. This achieves the effect of automatically adjusting channel width based on degree of market fluctuation.

For trading strategy, go short when price breaks through upper band and go long when price breaks through lower band. In addition, this strategy has set conditions to only trade in certain months, avoiding generating wrong signals in non-main trend months.

## Advantage Analysis

The biggest advantage of this strategy is that the fluctuation range is calculated based on percentage change of price, which can be automatically adjusted to adapt to different market conditions. It can reduce false signals in range-bound markets and timely capture reversals in trending markets. In addition, setting month and date selection conditions can filter noise from marginal months and avoid generating wrong signals in non-main trend months.

## Risk Analysis  

The main risk of this strategy is that moving average has lagging effect and cannot react to emergencies instantly. In addition, the setting of percentage range will also affect strategy performance. If set too low, it will exacerbate the lagging problem of moving averages. If set too high, it will increase the probability of false signals.

Another potential risk is relying too much on date and month conditions. If main trend occurs outside the set months, this strategy will miss opportunities. So these preset conditions also need to be adjusted according to different products and market environments.

## Optimization Directions   

There is still large room for optimizing this strategy. Firstly, different parameter combinations can be tested, such as length of moving average, percentage parameters, etc, to find the optimal parameters. Secondly, other indicators can be introduced to confirm moving average signals, such as volume, to improve signal reliability. Finally, the date and month selection conditions can also be adjusted based on different products and market environments to make them more flexible. 

For example, major trend months can be judged based on historical data, then thresholds can be automatically calculated. When there is abnormal breakthrough, month conditions can be temporarily ignored and participate fully. Introducing machine learning and other means to dynamically optimize these parameters is also feasible.  

## Summary  

In general, the Percentage Band Moving Average Strategy is a very practical trend following strategy. Its biggest advantage is the ability to automatically adjust fluctuation range and adapt to market changes. At the same time, there is still room for improvement, such as parameter optimization, signal filtering, etc. If used properly, it can steadily profit in various market environments.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|bandlength|
|v_input_2|2|Multiplier for Percent upper Band|
|v_input_3|2|Multiplier for Percent Lower  Band|
|v_input_4|6|monthfrom|
|v_input_5|12|monthuntil|
|v_input_6|true|dayfrom|
|v_input_7|31|dayuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-05 00:00:00
end: 2023-12-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

strategy(title = "Percentage Band", overlay = true)


//////////////// BAND  ////////////////////////////
price=close
bandlength = input(50)
bbupmult =input(2,step=0.1,title="Multiplier for Percent upper Band")
bblowmult = input(2,step=0.1,title="Multiplier for Percent Lower  Band")

basis =  sma(close,bandlength)

devup =  (bbupmult*price)/100
devlow = (bblowmult*price)/100

upper = basis + devup
lower = basis - devlow
plot(basis, color=red)
p1 = plot(upper, color=blue)
p2 = plot(lower, color=blue)
fill(p1, p2)



/////////////////////////BAND  //////////////////////////


// Conditions



longCond = na
sellCond = na
longCond :=  crossover(price,lower)
sellCond :=  crossunder(price,upper)




monthfrom =input(6)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)



if (  longCond  ) 
    strategy.entry("BUY", strategy.long, stop=close, oca_name="TREND",comment="BUY")
    
else
    strategy.cancel(id="BUY")


if ( sellCond   ) 

    strategy.close("BUY")






```

> Detail

https://www.fmz.com/strategy/435161

> Last Modified

2023-12-12 17:47:02
