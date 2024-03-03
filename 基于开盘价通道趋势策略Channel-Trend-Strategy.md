
> Name

基于开盘价通道趋势策略Channel-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10ad119ac34b1695611.png)
 [trans]

### 概述

通道趋势策略是一种基于开盘价和Donchian通道的趋势跟踪策略。它通过绘制一条从当前价格到以开盘价为基准的趋势线,结合Donchian通道形成的价格通道来识别趋势方向。当价格突破通道时产生交易信号。

### 策略原理

1. 选择一个时间周期(日线、周线等),获取该周期的开盘价作为基准价格。

2. 使用Donchian通道指标计算出该周期的最高价和最低价的N日移动平均,形成价格通道。

3. 从当前收盘价向该周期的开盘价绘制一条直线,作为趋势基准线。

4. 当收盘价突破Donchian通道上沿时,产生买入信号;当收盘价突破通道下沿时,产生卖出信号。

5. 设置止盈止损策略。

该策略通过基准线和通道线的组合使用,能锁定趋势方向,在趋势存在时产生持续的信号,while过滤掉部分噪音。

### 优势分析

1. 使用开盘价作为策略基准线,可以有效判断不同时间周期内的价格趋势变化。

2. Donchian通道指标可以有效滤除短期波动对基准线的影响。

3. 结合基准线和Donchian通道,可以在趋势明确时产生信号,避免假突破。 

4. 自动设置止盈止损位置,可以锁定部分利润,控制风险。

5. 该策略参数较少,实现难度不高,容易掌握。

### 风险分析

1. 在盘整行情中容易产生较多无效信号。

2. 如果参数设置不当,止损点过于接近,可能会过早止损出场。

3. 该策略更依赖趋势行情,不适合FREQ策略。 

4. 在异常行情中,价格可能直接突破止损线导致巨额亏损。

### 优化方向

1. 可以测试不同的周期参数,选择产生信号最顺畅的周期。

2. 可以调整Donchian通道参数,设置更合适的通道宽度。

3. 可以根据不同品种特性优化止盈止损比例。

4. 可以增加其他指标过滤,避免异常行情下的信号产生。

### 总结

通道趋势策略利用开盘价和Donchian通道形成的通道线,识别价格趋势方向。它可以产生易读的持续信号,通过设置止盈止损来锁定利润和控制风险,是一个非常实用的趋势跟踪策略。通过不断测试和优化参数,该策略可以适用于不同品种,在趋势行情中获得较好收益。

|| 

### Overview

The Channel Trend strategy is a trend following strategy based on the opening price and Donchian Channel. It identifies trend direction by plotting a line from current price to the trend line benchmarked on opening price, combined with the price channel formed by Donchian Channel. Trading signals are generated when price breaks through the channel.

### Strategy Logic  

1. Select a timeframe (daily, weekly etc.) and get its opening price as the benchmark price.

2. Calculate the N-day moving average of highest price and lowest price using Donchian Channel indicator, forming a price channel.  

3. Draw a straight line from current closing price to the opening price of that timeframe, as the trend benchmark line.

4. When closing price breaks through the upper band of Donchian Channel, a buy signal is generated. When closing price breaks through the lower band, a sell signal is generated.

5. Set stop loss and take profit strategy.

The combination of benchmark line and channel lines locks in trend direction and generates persistent signals when trend exists, while filtering out some noise.

### Advantage Analysis

1. Using opening price as strategy benchmark line can effectively determine price trend changes within different timeframes.

2. Donchian Channel indicator can effectively eliminate the impact of short-term fluctuations on the benchmark line.  

3. The combination of benchmark line and Donchian Channel can generate signals when trend is clear, avoiding false breakouts.

4. Automatic stop loss and take profit setting locks in some profits and controls risks.

5. This strategy has few parameters and is easy to implement.

### Risk Analysis  

1. It may generate more invalid signals during range-bound market.

2. If parameters are set improperly, stop loss may be triggered prematurely.

3. This strategy relies more on trending market and is not suitable for mean-reversion strategies.

4. In abnormal market condition, price may break through stop loss line directly resulting in huge loss.

### Optimization Direction  

1. Test different timeframe parameters to select the smoothest one for signal generation.

2. Adjust parameters of Donchian Channel to set more suitable channel width.

3. Optimize stop loss and take profit ratios based on different product characteristics. 

4. Add other indicator filters to avoid signals generated in abnormal market conditions.

### Summary

The Channel Trend strategy utilizes the channel lines formed by opening price and Donchian Channel to identify price trend direction. It can generate easy-to-read persistent signals, locks in profits and controls risks through stop loss and take profit setting, making it a very practical trend following strategy. Through constant testing and parameter optimization, this strategy can be applied to different products and achieve good returns in trending markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|M|TIMELINE|
|v_input_int_1|21|length|
|v_input_int_2|15|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-17 00:00:00
end: 2023-12-17 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//
strategy("STR-TREND", overlay=true)

emax = ta.ema(close,1)
plot(emax,title="X-EMA",color=color.black,linewidth=2)

XDX = input.string(title="TIMELINE", defval="M")
xdaily = request.security(syminfo.tickerid, XDX, open,barmerge.gaps_off, barmerge.lookahead_on)
length = input.int(21, minval=1)
lower = ta.lowest(xdaily,length)
upper = ta.highest(xdaily,length)
XXX = close>upper?lower:upper
plot(XXX,title="STR-X",color=color.red,linewidth=4)

TAKEPROFIT = input.int(15,title="Take Profit %", minval=1)
SELLTAKEPROFIT = XXX * (1-(TAKEPROFIT/100))
BUYTAKEPROFIT = XXX * (1+(TAKEPROFIT/100))
TAKEPROFITX = close<XXX?SELLTAKEPROFIT:BUYTAKEPROFIT
plot(TAKEPROFITX,title="TAKE PROFIT",color=color.black,linewidth=1)


//////////////STRATEGY ///////////////////

buystat= ta.crossover(close,XXX) 
sellstat = ta.crossunder(close,XXX) 

plotshape(buystat==true, title='long', text='BUY', textcolor=color.new(color.white, 0), style=shape.labelup, location=location.belowbar, color=color.new(color.green, 0), size=size.tiny) 
plotshape(sellstat==true, title='short', text='SELL', textcolor=color.new(color.white, 0), style=shape.labeldown, location=location.abovebar, color=color.new(color.red, 0), size=size.tiny) 

//////////////STRATEGY ///////////////////

strategy.entry("LONG", strategy.long, when = buystat==true, comment="")
strategy.exit("BUY TP", "LONG", qty_percent = 50 ,limit = BUYTAKEPROFIT)
strategy.close("LONG", when = sellstat==true, comment="")

strategy.entry("SHORT", strategy.short, when = sellstat==true, comment="")
strategy.exit("SELL TP", "SHORT", qty_percent = 50 ,limit = SELLTAKEPROFIT)
strategy.close("SHORT", when = buystat==true , comment="")







```

> Detail

https://www.fmz.com/strategy/435725

> Last Modified

2023-12-18 12:35:42
