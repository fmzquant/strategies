
> Name

突破追踪策略Breakout-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

### 策略概述

突破追踪策略是一个仅做多的短线交易策略。它监控价格是否突破布林带上轨,如果突破就进入做多方向。退出有两种选择:第一种是价格突破布林带下轨时平仓;第二种是价格跌破中轴线时平仓。该策略忽略滑点和手续费的影响。

### 策略原理

1. 当价格突破布林带上轨时,做多入场。

2. 有两种退出方式:

    - 选择1:价格跌破布林带下轨时平仓

    - 选择2:价格跌破布林带中轴线时平仓

3. 计算收益时不考虑滑点和手续费的影响。

该策略运用布林带指标判断趋势和超买超卖情况。布林带由中轴线、上轨和下轨组成。中轴线是n日收盘价的简单移动平均线,上下轨是根据标准差画出的通道带。上轨和下轨可看作是未来价格的阻力线和支撑线。

当价格突破上轨时,表示牛市正在形成,可以做多。当价格跌破下轨时,表示熊市来临,应该平仓。中轴线代表了价格的平均水平。

该策略的优点是运用布林带判断趋势方向,可以减少假突破带来的风险。它只在趋势出现时做多,符合趋势交易的思路。而且有两个不同的退出方式,可以根据市场情况选择更合适的方式。

### 策略优势

- 使用布林带判断趋势,可以减少假突破的风险

- 只在趋势牛市中做多,符合趋势交易思路

- 提供两个不同的退出方式,可以灵活应对市场变化

- 忽略滑点和手续费,计算收益更简单

- 适用于各个时间周期,可用于日内和趋势交易

### 风险警示

- 存在一定的假突破风险,布林带指标并不能完全避免

- 忽略滑点和手续费会高估实际收益

- 仅做多,无法在熊市中获利

- 应适当调整参数,如突破周期、中轴周期等,以适应市场变化

### 总结

突破追踪策略整体来说是一个优化比较高、风险可控的趋势追踪策略。它根据布林带指标判断趋势方向,在趋势出现时选择做多方向,并提供两个退出机制来控制风险。该策略操作简单,容易实施,适用于各个时间周期。但需要注意防范假突破,并做好参数调整,以适应复杂多变的市场环境。

||
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

[/trans]

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
