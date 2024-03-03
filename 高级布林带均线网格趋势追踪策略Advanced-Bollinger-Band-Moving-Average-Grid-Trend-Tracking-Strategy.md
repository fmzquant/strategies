
> Name

高级布林带均线网格趋势追踪策略Advanced-Bollinger-Band-Moving-Average-Grid-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14a590824a8071e89c9.png)
[trans]

## 概述

该策略名称为“高级布林带均线网格趋势追踪策略”。它是一个利用布林带、均线进行趋势判断,在趋势方向建立网格持仓追踪的策略。

## 策略原理

该策略的主要思路是:

1. 利用布林带判断目前市场波动范围。布林带中轨为n日简单移动平均线,带宽为n日ATR均幅。

2. 布林带外侧的四条均为异数平均真实波动幅度线。策略在突破不同级别线时建立持仓。

3. EMA快慢均线判断大周期趋势方向。在大周期多头时只做多头,空头反之。

4. 在趋势方向追踪建仓,出现针形K线时平仓止盈。

具体来说,该策略主要分为以下几个部分:

1. 确定布林带参数,布林中轨为n日SMA均线,布林带宽度为n日ATR。策略中布林长度n为20。

2. 设置四条布林外扩线,线上下离中轨距离分别为1.236倍、2.382倍、3.618倍和4.236倍平均真实波动幅度。

3. 设置快慢EMA均线判断大周期趋势,快线长度为25日,慢线长度为200日。

4. 在大周期多头时,价格突破下方四条均线时逐步建立多头持仓。空头同理。

5. 当出现针形K线或价格重新跨越大周期均线时,视为针形结束信号,平仓止盈。


以上是该策略的主要技术原理。通过布林带判断目前波动范围,在大周期趋势下追踪建仓,最终达到高概率持仓的效果。

## 策略优势分析

该策略主要有以下几个优势:

1. 充分利用趋势特征,大周期判断趋势方向,在趋势方向建仓,可以减少不必要的反向操作。

2. 采用多级布林线,可以更加清晰的判断目前波动区域,有利于把握大部分行情。

3. 网格持仓方式可以使每一个单位资金均匀分配风险,从而得到稳定收益。

4. 利用针形K线这一高效信号平仓,可以快速止盈。

5. 策略整体实现了趋势判断、网格持仓、特定信号平仓三位一体,是一种相对成熟完整的量化策略。


## 策略风险分析

该策略也存在以下一些风险:

1. 大周期趋势判断错误的概率。快慢均线存在一定误差概率,可能导致不必要的反向操作。

2. 布林线突破失败概率。布林线并不能百分百预判价格路径。

3. 针形K线信号发出较晚,无法及时止盈。

4. 大周期震荡调整中容易形成过多重叠持仓。


对应解决方法如下:

1. 调整快慢均线参数,降低误差概率。

2. 调整布林线参数,使布林线尽量贴近大部分波动。

3. 测试更加灵敏的特定形态止盈信号。

4. 加大间距距离,控制持仓规模。

## 策略优化方向  

该策略可以从以下几个方向进行优化:

1. 测试不同均线参数优化大周期趋势判断。例如测试EMA、RSI等其他指标。

2. 测试不同倍数ATR参数优化布林通道宽度设置。使布林带更贴近真实波动。 

3. 测试其他高效止盈信号。例如 SAR、卡尔曼均线等。

4. 优化网格间距。使得波动区间更加均匀切分,减少重复建仓。

5. 增加止损机制。避免极端行情下的大亏损。

## 总结  

该策略综合运用布林带通道、均线指标、特定K线形态等技术手段。在判断大周期趋势的前提下,构建了一个趋势跟踪型的均线布林网格策略。相比传统布林带突破,该策略加入了趋势特征判断,可以减少不必要的反向建仓,同时网格持仓方式使每一个单位资金风险分散,从而获得了稳定收益。该策略可以从趋势判断、布林宽度、止盈信号、止损方式等多个角度进行优化调整,以获得更加稳定的策略效果。


|| 

## Overview  

The strategy is named "Advanced Bollinger Band Moving Average Grid Trend Tracking Strategy". It is a strategy that uses Bollinger Bands and moving averages for trend determination and establishes grid positions to track the trend direction.

## Principle  

The main idea of this strategy is:

1. Use Bollinger Bands to judge the current market volatility range. The middle rail of Bollinger Bands is the n-day simple moving average, and the width is the n-day ATR average amplitude.

2. The four lines outside the Bollinger Bands are abnormal multiples of the average true volatility amplitude lines. The strategy establishes positions when breaking through different levels of lines.

3. The EMA fast and slow moving averages determine the big cycle trend direction. Go long only in the big cycle uptrend and go short on the contrary.

4. Track and build positions in the trend direction, close positions for profit when seeing pin bars.


Specifically, the main parts of this strategy are:  

1. Determine Bollinger Band parameters. The middle rail of Bollinger Bands is the n-day SMA moving average, and the width of Bollinger Bands is the n-day ATR. The Bollinger length n in the strategy is 20.

2. Set four expanded lines outside Bollinger Bands. The distance between the lines and the middle rail is 1.236 times, 2.382 times, 3.618 times and 4.236 times the average true volatility amplitude.  

3. Set fast and slow EMA moving averages to determine the big cycle trend. The fast line length is 25 days and the slow line is 200 days.

4. Establish long positions gradually when breaking through the four lines below in a big cycle uptrend. The short side is the same.  

5. When a pin bar appears or the price crosses the big cycle moving average again, it is regarded as an pin bar ending signal to close positions for profit.


The above is the main technical principle of this strategy. By judging the current volatility range through Bollinger Bands and establishing positions under the big cycle trend, the final effect of high probability positions can be achieved.

## Advantage Analysis   

The main advantages of this strategy are:

1. Make full use of trend characteristics, determine trend direction in big cycles, build positions in trend direction to reduce unnecessary reverse operations.

2. The use of multiple Bollinger lines can more clearly judge the current volatility range, which is conducive to capturing most trends.

3. The grid position method can evenly distribute risks to each unit of funds to obtain stable returns.  

4. The use of pin bar high efficiency signals for position closing can quickly lock in profits. 

5. The overall strategy integrates trend determination, grid positions, and specific signal position closing. It is a relatively mature and complete quantitative strategy.


## Risk Analysis

There are also some risks in this strategy:

1. Probability of incorrectly determining the big cycle trend. There is some probability of error in fast and slow moving averages, which may lead to unnecessary reverse operations.

2. Probability of Bollinger line breakout failures. Bollinger lines cannot predict price paths 100% accurately. 

3. Pin bar signals may come out late and cannot lock in profits in time. 

4. It is easy to form too many overlapping positions during big cycle shock adjustments.


The corresponding solutions are:

1. Adjust fast and slow moving average parameters to reduce probability of errors.

2. Adjust Bollinger line parameters to make Bollinger lines stick to most fluctuations as much as possible.  

3. Test more sensitive specific patterns for profit taking signals.  

4. Increase interval distance to control position size.

## Optimization Directions   

The strategy can be optimized in the following directions:

1. Test different moving average parameters to optimize big cycle trend determinations. For example, test other indicators like EMA, RSI, etc.

2. Test different multiples ATR parameters to optimize Bollinger channel width settings. Make Bollinger Bands stick closer to actual fluctuations.   

3. Test other efficient profit taking signals. For example, SAR, Kalman Lines, etc. 

4. Optimize grid interval to make volatility intervals divided more evenly to reduce overlapping positions.  

5. Increase stop loss mechanisms. Avoid huge losses in extreme market conditions.  

## Summary   

The strategy integrates the use of Bollinger channel, moving average indicators, specific K-line patterns and other technical means. Under the premise of determining the big cycle trend, it constructs a trend tracking grid strategy based on moving averages and Bollinger Bands. Compared with traditional Bollinger band breakouts, this strategy adds trend characteristic judgment, which can reduce unnecessary reverse positions. At the same time, the grid position method diversifies risks for each unit of funds to obtain stable returns. The strategy can be optimized from multiple angles such as trend determination, Bollinger width, profit taking signals, stop loss methods, etc. to obtain more stable strategy effects.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_7|25|快线长度(fastlength)|
|v_input_8|200|慢线长度(slowlength)|
|v_input_bool_1|true|(?回测范围backtest)启用回测时间范围限定(backtest)|
|v_input_1|timestamp(1 Jan 2015)|开始时间(Start)|
|v_input_2|timestamp(1 Jan 2040)|结束时间(finish)|
|v_input_int_1|20|(?入场位entry)布林长度,(boll length)|
|v_input_3|1.236|Fib 1|
|v_input_4|2.382|Fib 2|
|v_input_5|3.618|fib 3|
|v_input_6|4.236|Fib 4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-11-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Aayonga

//@version=5
strategy("fib trend grid@Aa", overlay=true)

//回测时间
useDateFilter=input.bool(true,title = "启用回测时间范围限定(backtest)", group = "回测范围(backtest)")
backtesStarDate=input(timestamp("1 Jan 2015"),title = "开始时间(Start)", group = "回测范围(backtest)")
backtestEndDate=input(timestamp("1 Jan 2040"),title = "结束时间(finish)",group = "回测范围(backtest)")
inTradeWindow=true


//入场位 entry
bolllen=input.int(defval=20,minval=1,title="布林长度,(boll length)",group = "入场位(entry)")
sma=ta.sma(close,bolllen)
avg=ta.atr(bolllen)
fib1=input(defval=1.236,title="Fib 1",group = "入场位(entry)")
fib2=input(defval=2.382,title="Fib 2",group = "入场位(entry)")
fib3=input(defval=3.618,title="fib 3",group = "入场位(entry)")
fib4=input(defval=4.236,title="Fib 4",group = "入场位(entry)")
r1=avg*fib1
r2=avg*fib2
r3=avg*fib3
r4=avg*fib4
top4=sma+r4
top3=sma+r3
top2=sma+r2
top1=sma+r1
bott1=sma-r1
bott2=sma-r2
bott3=sma-r3
bott4=sma-r4



//趋势 plot

t4=plot(top4,title="卖 (sell)4",color=color.rgb(244, 9, 9))
t3=plot(top3,title = "卖(sell) 3",color=color.rgb(211, 8, 8))
t2=plot(top2,title="卖 (sell)2",color=color.rgb(146, 13, 13))
t1=plot(top1,title="卖(sell) 1",color=color.rgb(100, 3, 3))

b1=plot(bott1,title="买(buy1)1",color=color.rgb(4, 81, 40))
b2=plot(bott2,title="买(buy)2",color=color.rgb(15, 117, 46))
b3=plot(bott3,title = "买(buy)3",color =color.rgb(8, 176, 42) )
b4=plot(bott4,title="买(buy)4",color=color.rgb(15, 226, 103))
plot(sma,style=plot.style_cross,title="SMA",color=color.rgb(47, 16, 225))

//趋势
LengthF=input(defval = 25,title = "快线长度(fastlength)")
LengthS=input(defval=200,title = "慢线长度(slowlength)")
emaF=ta.ema(close,LengthF)
smaS=ta.sma(close,LengthS)
longTrend=emaF>smaS
longb=ta.crossover(emaF,smaS)
bgcolor(longb ? color.new(color.green,40):na,title = "多头强势(bull trend)")
shortTrend=smaS>emaF
shortb=ta.crossunder(emaF,smaS)
bgcolor(shortb ? color.new(#951313, 40):na,title = "空头强势(bear trend)")

//pinbar
bullPinBar = ((close > open) and ((open - low) > 0.6* (high - low))) or ((close < open) and ((close - low) > 0.9 * (high - low)))
//plotshape(bullPinBar  , text ="pinbar", textcolor=color.rgb(9, 168, 144),location=location.belowbar, color=color.rgb(29, 103, 67), size=size.tiny)
bearPinBar = ((close > open) and ((high - close) > 0.7 * (high - low))) or ((close < open) and ((high - open) > 0.7 * (high - low)))
//plotshape(bearPinBar  , text ="pinbar", textcolor=color.rgb(219, 12, 12),location=location.abovebar, color=color.rgb(146, 7, 7), size=size.tiny)

buy1=ta.crossunder(close,bott1) and longTrend and close>ta.ema(close,100)
buy2=ta.crossunder(close,bott2) and longTrend 
buy3=ta.crossunder(close,bott3) and longTrend 
buy4=ta.crossunder(close,bott4) and longTrend 
buyclose=bearPinBar or ta.crossunder(close,smaS)




if buy2 or buy3 or buy4 or buy1 and inTradeWindow
    strategy.order("多(buy)",strategy.long)

if buyclose  and inTradeWindow
    strategy.close("多(buy)")

sell1=ta.crossover(close,top1) and shortTrend and close<ta.ema(close,200)
sell2=ta.crossover(close,top2) and shortTrend and close<ta.ema(close,200)
sell3=ta.crossover(close,top3) and shortTrend and close<ta.ema(close,200)
sell4=ta.crossover(close,top4) and shortTrend and close<ta.ema(close,200)
sellclose=bullPinBar or ta.crossover(close,ta.sma(close,220))

if  sell1 or sell2 or sell3 or sell4 and inTradeWindow
    strategy.order("空(sell)",strategy.short)

if sellclose  and inTradeWindow
    strategy.close("空(sell)")
     
```

> Detail

https://www.fmz.com/strategy/433108

> Last Modified

2023-11-24 14:48:28
