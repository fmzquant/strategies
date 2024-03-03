
> Name

基于离散运动平均值的趋势突破策略Trend-Breakout-Strategy-Based-on-Moving-Average-Deviation

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/71354a80f1f591dd14.png)

[trans]

### 概述

该策略通过计算价格相对于平滑移动平均线的偏离程度,来判断市场趋势和捕捉趋势反转机会。它属于趋势跟踪策略的一种,主要思想是在突破平滑移动平均线时进行买入或卖出。

### 策略原理

1. 计算价格的3期加权移动平均线FPrice,作为平滑移动平均线。

2. 计算FPrice过去17天的标准差stdev,以及17日简单移动平均线ema2。

3. 计算价格相对于平均线的偏离程度Rate1=(FPrice-ema2)/stdev。

4. 当Rate1<-1且开始上涨时,视为突破下行平均线,产生买入信号。

5. 当Rate1>1且开始下跌时,视为突破上行平均线,产生卖出信号。

6. 根据信号打开或平仓头寸。

该策略使用价格突破平均线的标准差范围来判断趋势反转,通过动态调整参考区间来适应市场波动。当价格从平均线一侧突破超过一个标准差时,产生交易信号。它较好地滤除了短期市场噪音,适合捕捉中长线趋势转换点。

### 优势分析

1. 使用动态参考区间,能自动适应市场波动性。

2. 平滑移动平均线能有效过滤短期噪音。

3. 标准差范围设置合理的突破阈值,避免频繁交易。

4. 采用价格向平均线方向移动的动量作为过滤器,避免假突破。

5. 策略逻辑简单清晰,易于理解和实现。

6. 可根据市场调整参数,适用于不同交易品种。

7. 可与其他指标组合使用,提高策略效果。

### 风险分析

1. 当市场长期处于低波动时,交易机会可能较少。

2. 如果标准差参数设定过大或过小,会漏掉较好机会或产生过多虚假信号。

3. 当价格出现剧烈波动时,标准差会失效,导致错误信号。

4. 在趋势转换前期,易出现较多假突破信号。

5. 平均线系统对短期调整不敏感,可能错过短线机会。

6. 需要合理定制参数和过滤条件,使其适应特定市场环境。

### 优化方向

1. 优化移动平均线的天数和类型,适应不同品种特点。

2. 调整标准差倍数参数,寻找最佳参考交易区间。 

3. 增加价格动量指标等过滤条件,减少假突破信号。

4. 结合波动率指标,根据市场波动情况动态调整参数。

5. 与其他类似突破策略组合,提高胜率。

6. 在趋势转换前期,考虑降低仓位管理风险。

7. 添加止损策略,控制单笔损失。

### 总结

该策略整体思路清晰,能有效识别价格趋势反转点,通过参数优化和组合可以适用于不同市场环境。但需注意控制风险,防止在剧烈波动中产生错误信号。如果优化得当,它是一个简单实用的趋势跟踪策略。

||


### Overview

This strategy identifies market trend and reversal opportunities by calculating the deviation of price from its smoothed moving average. It belongs to the trend following strategies that trade based on the breakout of moving averages. The core idea is to buy or sell when the price breaks through the smooth moving average line.  

### Strategy Logic

1. Calculate the 3-period weighted moving average of price FPrice as the smoothed MA line.

2. Calculate the 17-day standard deviation stdev and 17-day simple moving average ema2 of FPrice.

3. Calculate the deviation Rate1 of price from the average as (FPrice-ema2)/stdev.

4. When Rate1 drops below -1 and starts to rise, it signals a breakout below the down trendline and generates a buy signal.

5. When Rate1 rises above 1 and starts to fall, it signals a breakout above the up trendline and generates a sell signal. 

6. Open or close positions according to the signals.

The strategy uses the standard deviation range of price deviation from MA to identify trend reversals. By dynamically adjusting the reference range it adapts to market volatility. When price breaks out of the MA by more than one standard deviation, it triggers a trading signal. This effectively filters out short-term market noise and catches mid-to-long term trend shifts.

### Advantage Analysis

1. The dynamic reference range automatically adapts to changing market volatility.

2. The smoothed MA filters out short-term noise effectively. 

3. The standard deviation sets reasonable breakout thresholds and avoids overtrading.

4. The momentum filter avoids false breakouts.

5. The strategy logic is simple and clear, easy to understand and implement.

6. The parameters can be adjusted for different trading instruments.

7. It can be combined with other indicators to improve performance.

### Risk Analysis

1. There may be fewer trading opportunities during prolonged low volatility periods.

2. Improper standard deviation parameters may lead to missing good trades or generating excessive false signals.

3. Standard deviation may fail during extreme price swings, causing wrong signals.

4. More false breakouts may occur around trend transitions.  

5. MA systems have lag in detecting short-term shifts. Some short-term opportunities may be missed.

6. Parameters and filters need to be tuned properly for specific market environments.

### Enhancement Directions

1. Optimize MA days and type based on instrument characteristics.

2. Adjust standard deviation multiplier to find the optimal reference range.

3. Add price momentum filters to reduce false signals.

4. Incorporate volatility indicators to dynamically adjust parameters by volatility.

5. Combine with other similar breakout strategies to improve win rate. 

6. Consider lowering position size around trend turning points to manage risk.

7. Add stop loss to control single trade loss.

### Conclusion

The strategy has clear logic to identify trend reversals. With parameter tuning and combinations it can be adapted to different markets. But risk management is crucial to avoid false signals during high volatility periods. If optimized properly, it is a simple and practical trend following system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_ohlc4|0|Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_2|17|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-22 00:00:00
end: 2023-10-22 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Mustafaozver

//@version=4
strategy("Escaping of Rate from Avarage By Mustafa OZVER", "EoRfA", overlay=false)
//strategy("Escaping of Rate from Avarage By Mustafa OZVER", "EoRfA", overlay=false)

src = input(ohlc4,"Source")
FPrice = wma(src,3)
len = input(17,"Length")

stdev = stdev(FPrice,len)
ema2 = ema(FPrice,len)

Rate1 = (FPrice - ema2) / stdev
//bgcolor(color=((stdev/ema)>0.0015)?color.green:#00000000,transp=80)

colorG = color.lime
colorR = color.red

hline(0,linestyle=hline.style_solid,editable=false)
hline1=hline(1,linestyle=hline.style_dotted,editable=false)
hlinen1=hline(-1,linestyle=hline.style_dotted,editable=false)
fill(hline1,hlinen1,color=color.silver,transp=85,editable=true)

//plot(Rate,color=(Rate>0?colorG:colorR),transp=75,style=plot.style_area,editable=false)

plot(Rate1,title="ESC1",color=(Rate1>0?colorG:colorR),style=plot.style_line,linewidth=1,editable=true)

BUYSIGNAL = Rate1 < -1 and change(Rate1) > 0
SELLSIGNAL = Rate1 > 1 and change(Rate1) < 0

if (BUYSIGNAL)
    strategy.order("LONG1",true)
    //strategy.close("SHORT1")

if (SELLSIGNAL)
   // strategy.order("SHORT1",false)
    strategy.close("LONG1")
```

> Detail

https://www.fmz.com/strategy/429954

> Last Modified

2023-10-23 15:38:37
