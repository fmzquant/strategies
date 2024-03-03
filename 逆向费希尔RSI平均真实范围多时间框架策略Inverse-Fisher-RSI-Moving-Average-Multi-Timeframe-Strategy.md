
> Name

逆向费希尔RSI平均真实范围多时间框架策略Inverse-Fisher-RSI-Moving-Average-Multi-Timeframe-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16880deee5b6151bec0.png)

[trans]

## 概述

逆向费希尔RSI平均真实范围多时间框架策略是一种试图通过计算逆向调整后的RSI指标在较高时间框架上的移动平均,来发现市场可能的反转点的量化交易策略。

## 策略原理

该策略首先计算一般的RSI指标,指标参数为RSI\_pm代表计算RSI的周期长度。然后通过一个数学函数IF对原始RSI进行逆向调整,计算公式为IF(input)=>(exp(2\*input)-1)/(exp(2\*input)+1)。调整后的RSI指标传递给变量IF\_RSI。

为了过滤掉过多的噪音,策略在IF\_RSI的基础上再计算其在RSI\_ps周期上的移动平均,得到最终的用来判断买卖点的指标wma\_RSI。该指标再映射到0-100的区间。

最后,策略在一个更高的时间框架上画出该指标,并设置阈值线0.8和-0.8。当指标线从下向上突破0.8水平时产生买入信号;当指标线从上向下跌破-0.8水平时产生卖出信号。

## 策略优势

该策略通过双重平滑的方式处理RSI走势,能有效过滤掉过多噪音,锁定比较清晰的反转信号。双平滑分别应用在原始RSI指标和绝对值调整后的RSI指标。这种方法可以增强指标的平均回归特性,产生比较可靠的交易信号。

另外,该策略采用多时间框架分析方法,在一个更高级别的时间框架上识别指标的突破,能锁定长线上的反转机会,避免被过多的短期市场噪音干扰。

## 策略风险

该策略依赖均线指标判断买卖点,存在一定的滞后。长期牛市中,指标调整后上行空间可能会受到限制,无法充分捕捉趋势机会。

另一方面,指标的调整也可能错过短线调整后的反弹机会。如果不能适当优化指标参数,就可能面临一定的策略风险。

## 策略优化

可以尝试适当调整指标参数,使其更好地适应市场环境。例如可以测试不同的RSI计算周期,平滑周期参数,寻找最佳参数组合。

也可以考虑结合其他辅助指标来验证信号,提高策略稳定性。例如可以加入成交量指标、布林线等判断趋势信号强弱。

## 总结

该逆向费希尔RSI平均真实范围多时间框架策略,整体思路较为稳健,但仍需优化以适应更广泛的市场情况。值得进一步测试和改进,使其成为一个可靠的量化交易策略。

||

## Overview

The Inverse Fisher RSI Moving Average Multi Timeframe Strategy is a quantitative trading strategy that tries to identify potential market reversal points by calculating the moving average of the inversely adjusted RSI indicator on higher timeframes.

## Strategy Logic

The strategy first calculates the regular RSI indicator, where the RSI_pm parameter represents the RSI calculation period. The original RSI is then inversely adjusted through a mathematical function IF(input)=>(exp(2*input)-1)/(exp(2*input)+1). The adjusted RSI is passed to the variable IF_RSI. 

To filter out too much noise, the strategy further calculates the moving average of IF_RSI over the period RSI_ps, obtaining the final indicator wma_RSI used to determine buy and sell signals. This indicator is further mapped to a 0-100 range.

Finally, the strategy plots this indicator on a higher timeframe and sets threshold lines at 0.8 and -0.8. A buy signal is generated when the indicator line breaks above 0.8 from below. A sell signal is generated when the indicator line breaks below -0.8 from above.

## Advantages

The strategy processes the RSI trend through double smoothing, which can effectively filter out too much noise and lock in relatively clear reversal signals. Double smoothing is applied respectively to the original RSI indicator and the absolutely adjusted RSI indicator. This method can enhance the mean reversion characteristic of the indicator and produce relatively reliable trading signals.

In addition, the multi-timeframe analysis method adopted by the strategy identifies breakouts of the indicator on a higher level timeframe, which can capture long-term reversal opportunities and avoid interference from excessive short-term market noise.

## Risks 

The strategy relies on moving average indicators to determine buy and sell points, which has some lag. In long-term bull markets, the upside space of adjusted indicators may be limited, failing to fully capture trend opportunities.

On the other hand, the adjustments may also miss rebound opportunities after short-term corrections. If the indicator parameters are not properly optimized, certain strategy risks may be faced.

## Optimization

Try appropriately adjusting the indicator parameters to better adapt them to market conditions. For example, different RSI calculation cycles and smoothing period parameters can be tested to find the optimal parameter combination.

It is also worth considering combining other auxiliary indicators to verify signals and improve strategy stability. For example, volume indicators, Bollinger Bands etc. can be added to judge the strength of trend signals.

## Conclusion

The Inverse Fisher RSI Moving Average Multi Timeframe Strategy has an overall robust logic, but still needs optimization to adapt to wider market situations. It is worth further testing and improving to make it a reliable quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|RSI Main Period|
|v_input_2|true|RSI Smooth Period|
|v_input_3|1440|Timeframe|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-14 00:00:00
end: 2023-11-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title = "Inverse Fisher RSI-MTF2", shorttitle="INRSIM2",overlay=true)
//Inputs
RSI_pm = input(5, title="RSI Main Period",minval=2)
RSI_ps = input(1, title="RSI Smooth Period",minval=0)

//Functions
IF(input)=>(exp(2*input)-1)/(exp(2*input)+1)

//RSI Calculation
raw_RSI=0.1*(rsi(close,RSI_pm)-50)
wma_RSI=wma(raw_RSI,RSI_ps)*100
IF_RSI = IF(wma_RSI)

resCustom = input(title="Timeframe", defval="1440" )
v=request.security(syminfo.tickerid, resCustom,IF_RSI)
a=v>0.8
b=v<-0.8

z=0.8
buy = crossover(v,z)
sell=crossunder(v,b)
 
plotshape(sell, title="sell", style=shape.triangledown,location=location.abovebar, color=red, transp=0, size=size.small)
plotshape(buy,  title="buy", style=shape.triangleup,location=location.belowbar, color=green, transp=0, size=size.small)


//Strategy
golong =  crossover(v,z)
goshort =  crossunder(v,b)

strategy.entry("Buy",strategy.long,when = golong)
strategy.entry("Sell",strategy.short,when = goshort)




```

> Detail

https://www.fmz.com/strategy/432783

> Last Modified

2023-11-21 14:45:28
