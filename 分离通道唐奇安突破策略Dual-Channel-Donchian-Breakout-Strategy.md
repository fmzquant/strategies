
> Name

分离通道唐奇安突破策略Dual-Channel-Donchian-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/161aff24c004b03288a.png)
[trans]

本策略基于唐奇安通道指标,实现买入上轨突破和卖出下轨突破的交易策略。

#### 策略原理

策略通过计算不同参数的上轨和下轨,分别实现买入和卖出信号。

上轨计算公式:上轨 = 最高值(长度1)
下轨计算公式:下轨 = 最低值(长度2)
中轴计算公式:中轴 = (上轨 + 下轨)/ 2

当收盘价超过上轨时,产生买入信号;当收盘价低于下轨时,产生卖出信号。

该策略的优点是可以通过调整上轨和下轨的参数,实现更灵活的交易规则。

#### 策略优势

1. 可以自定义上下轨参数,使买入和卖出规则可以独立控制,更加灵活。

2. 通过中轴指标衡量上下轨平均位置,可以更清晰判断价格突破。

3. 唐奇安通道具有趋势跟踪性能,可以有效捕捉趋势机会。

4. 策略操作简单,容易实施。

#### 策略风险

1. 容易产生虚假突破,需要结合其他指标过滤。

2. 无法判断趋势背驰,需要人工或其他指标结合。

3. 上下轨参数设置不当可能导致过于激进或保守,需要注意参数调整。

#### 策略优化方向

1. 可以考虑结合移动平均线等指标过滤虚假突破。

2. 可以结合波动率指标判断真实突破概率。

3. 可以动态调整上下轨参数,实现自适应交易规则。


#### 总结

本策略通过双轨道唐奇安通道实现灵活的突破操作。策略简单易操作,但存在一定虚假突破概率。可以通过参数优化及結合其他指标进行过滤,从而改进策略效果。

||


This strategy is based on the Donchian Channel indicator to implement trading signals on upper and lower band breakouts. 

#### Strategy Logic

The strategy calculates upper and lower bands with different parameters to generate buy and sell signals respectively.

Upper Band Formula: Upper = Highest(length1)
Lower Band Formula: Lower = Lowest(length2) 
Mid Line Formula: Mid Line = (Upper + Lower) / 2

When close price breaks above upper band, a buy signal is generated. When close price breaks below lower band, a sell signal is generated.

The advantage of this strategy is the flexibility to customize upper and lower band parameters for more flexible trading rules.

#### Advantages

1. Customizable upper and lower band parameters for independent long and short control.

2. Mid line indicator shows average position of bands for clearer breakout judgment.  

3. Donchian Channel has trend following characteristic to catch trend opportunities.

4. Simple logic and easy to implement.

#### Risks

1. Vulnerable to false breakouts, needs filter from other indicators.

2. Unable to detect trend divergence, requires manual or other indicator combination.

3. Improper parameter tuning leads to over-aggressiveness or over-conservativeness.

#### Enhancement Directions 

1. Incorporate moving averages etc. to filter false breakouts.

2. Add volatility measures to quantify true breakout probability. 

3. Dynamically adjust upper and lower band parameters for adaptive trading rules.

#### Conclusion

This strategy implements flexible breakout trading via dual-band Donchian Channel. Simple logic but contains certain false breakout probabilities. Can be improved by parameter tuning, filters and supplementary indicators.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Upper Channel|
|v_input_2|20|Lower Channel|
|v_input_3|false|Offset Bars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-19 00:00:00
end: 2023-12-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Modified Donchian Channel with separate adjustments for upper and lower levels, with offset
// Strategy to buy on break upper Donchian and sell on lower Donchian
strategy("Donchian Backtest", overlay=true)

length1 = input(20, minval=1, title="Upper Channel")
length2 = input(20, minval=1, title="Lower Channel")
offset_bar = input(0,minval=0, title ="Offset Bars")
max_length = max(length1,length2)

upper = highest(length1)
lower = lowest(length2)

basis = avg(upper, lower)

l = plot(lower, style=line, linewidth=3, color=red, offset=1)
u = plot(upper, style=line, linewidth=3, color=green, offset=1)

plot(basis, color=yellow, style=line, linewidth=1, title="Mid-Line Average")
//break upper Donchian (with 1 candle offset) (buy signal)
break_up = (close >= upper[1])
//break lower Donchian (with 1 candle offset) (sell signal)
break_down = (close <= lower[1])


if break_up
    strategy.entry("buy", strategy.long,1)
if break_down
    strategy.close("buy")

//plot(strategy.equity)


    


```

> Detail

https://www.fmz.com/strategy/436595

> Last Modified

2023-12-26 10:18:51
