
> Name

基于不同周期移动平均线交叉策略Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b0c052c814cf8ca6c8.png)
[trans]

### 概述

该策略通过计算两个不同周期的移动平均线,并绘制其交叉点来发出交易信号。当短期移动平均线上穿长期移动平均线时,做多;当短期移动平均线下穿长期移动平均线时,做空。

### 策略原理

该策略基于移动平均线的优势——它能去掉价格序列中的随机性,提取出主要趋势。策略使用7日线和20日线构建双移动平均线系统,这两个周期较常用也较为明确。

当短期移动平均线上穿长期移动平均线时,意味着价格进入上升趋势;当短期移动平均线下穿长期移动平均线时,意味着价格进入下降趋势。根据这个原理,我们买入做多或卖出做空。

具体来说,策略通过计算7日简单移动平均线和20日简单移动平均线,当两条平均线产生交叉时判断出趋势转折并发出交易信号。为区分交叉类型,定义短期线大于长期线为价格上升趋势,反之为价格下降趋势。当短期线上穿长期线,即价格上升趋势开始的时候做多头入场;当短期线下穿长期线,即价格下降趋势开始的时候做空头入场。

### 优势分析

(1)策略思路清晰简单,容易理解和实现。

(2)移动平均线作为一种趋势跟踪指标,能有效过滤掉价格中包含的部分噪音,使用双移动平均线系统能进一步提高稳定性。

(3)参数配置灵活,可调整周期的参数组合,满足不同市场环境的交易要求。

(4)使用较为常用的两个移动平均周期,容易判断明确的交易信号。

(5)可视化辅助分析比较强大,通过视觉效果直观判断趋势、重要点位等。

(6)策略回测后可根据优化结果调整参数,提高策略收益率。

### 风险分析

(1)双移动平均线策略对市场波动较为敏感,在震荡行情中容易出现频繁交易亏损的情况。

(2)仅依赖均线交叉并不一定能准确判断趋势转折点位,可能引发错误信号。

(3)规则较为死板,当突发事件影响市场时,策略无法做出调整可能造成较大亏损。

(4)参数不当也会引发错误信号或错失交易机会,需要谨慎测试优化。

为缓解这些风险,可适当调整参数组合;加入其他指标进行辅助;设置止损策略控制亏损;根据市场环境调整参数或关闭策略等。

### 优化方向 

(1) 结合其他技术指标,形成组合策略,可以提高信号的准确性。比如加入成交量指标,在移动平均线交叉的同时判定成交量的放大,可以增加Entry chance。

(2) 加入止损策略,可以有效控制单笔亏损。例如当价格突破移动平均线一定范围时,退出当前Head position。

(3) 测试优化移动平均线的周期参数组合。可以尝试不同的快慢周期匹配,找到最佳参数组合。此外还可以测试使用指数移动平均线、权重移动平均线等其他移动平均线指标。

(4) 根据不同品种和市场环境进行参数调优。对于波动性大的品种可以缩短移动平均线周期,降低交易频次。对于趋势性强的市场环境可以加大两均线的时间跨度差距。

### 总结

移动平均线双交叉策略整体来说是一个非常典型和基础的趋势跟踪策略。它通过计算两个不同周期的移动平均线并观察其交叉情况来判断价格趋势的变化。当短期移动平均线上穿或下穿长期移动平均线时产生交易信号。这种简单的交易思路易于实现,参数调整灵活,是量化交易的入门级策略。但也存在一些缺陷,比如对市场环境波动敏感,信号可能不准确等。通过与其他技术指标组合或者设置止损以及参数优化等手段,可以强化该策略,使其成为一个非常实用的量化交易策略。

||

### Overview  

The strategy generates trading signals by calculating two moving averages of different periods and plotting their crossover points. It goes long when the shorter-term moving average crosses above the longer-term moving average, and goes short when the shorter-term moving average crosses below the longer-term moving average.

### Strategy Logic  

The strategy is based on the advantage of moving averages - they eliminate the randomness in price sequences and extract the main trend. The strategy employs a dual moving average system consisting of 7-day and 20-day lines, two commonly used and quite definitive periods.  

When the shorter-term moving average crosses above the longer-term moving average, it signals that prices are entering an uptrend. When it crosses below, it signals prices are entering a downtrend. According to this logic, we go long or short respectively.  

Specifically, the strategy calculates the 7-day simple moving average (SMA) and 20-day simple moving average. When the two averages cross, it judges a trend reversal and triggers a trade signal. To differentiate between crossover types, we define the short term line being above the long term line as an upward price trend, and vice versa for a downward trend. When the short term line crosses above the long term line, i.e. the onset of an upward trend, a long position is entered. When the short term line crosses below, i.e. the onset of a downward trend, a short position is entered.

### Advantage Analysis   

(1) The strategy logic is simple and easy to understand and implement.  

(2) Moving averages as trend tracking indicators can effectively filter out some noise in prices. The dual moving average system further enhances stability.

(3) Flexible parameter configurations to meet different market conditions and trading requirements.  

(4) Use of two commonly used moving average periods makes it easy to determine clear trading signals.
   
(5) Powerful visualization for intuitive trend, key levels identification etc.
   
(6) Parameters can be optimized via backtesting to improve strategy return.

### Risk Analysis  

(1) The strategy is quite sensitive to market fluctuation. Whipsaws can lead to frequent losses in ranging periods.  

(2) Crossovers may not accurately pinpoint trend reversal levels and could trigger wrong signals.

(3) Rigid rules cannot adapt to drastic events affecting markets, potentially causing huge losses.  

(4) Improper parameters could also lead to inaccurate signals and missed trades. Careful testing is needed.

To mitigate these risks, parameters could be adjusted accordingly. Other indicators can be added for confirmation. Stop loss strategies could control losses. Parameters or strategies could be adjusted per market regimes.  

### Enhancement Directions

(1) Incorporating other technical indicators to form a combined strategy could increase signal accuracy. E.g. adding volume to confirm expansion on moving average crossover.  

(2) Adding stop loss strategies to effectively control single trade loss. E.g. exiting positions if prices breach moving averages by some threshold.

(3) Testing and optimizing moving average periods. Trying different fast and slow combinations to find best parameters. Other moving averages like EMA, WMA can also be tested.  

(4) Parameter tuning based on different products and market conditions. Using shorter moving averages and smaller cross-term difference for more volatile products. 

### Conclusion  

The moving average crossover strategy is a very typical and basic trend following strategy. By calculating two moving averages of different periods and observing their crossovers, it judges changes in price trend. Trading signals are generated when the shorter period moving average crosses above or below the longer one. This simple logic is easy to implement and flexible to adjust, making it an introductory quant strategy. But it also has defects like sensitivity to market fluctuations and potential inaccurate signals. By combining with other indicators, adding stops, and parameter optimization, the strategy can be enhanced into a very practical one for quantitative trading.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Price Source For The Moving Averages: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|true|Use Current Timeframe As Resolution?|
|v_input_3|W|Use Different Timeframe? Then Uncheck The Box Above|
|v_input_4|7|Short Period Moving Average|
|v_input_5|20|Long Period Moving Average|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-01 00:00:00
end: 2023-12-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Ma stratégie", overlay=true)

// Multi-timeframe and price input
pricetype = input(close, title="Price Source For The Moving Averages")
useCurrentRes = input(true, title="Use Current Timeframe As Resolution?")
resCustom = input(title="Use Different Timeframe? Then Uncheck The Box Above",  defval="W")
res = useCurrentRes ? timeframe.period : resCustom
price = request.security(syminfo.tickerid, res, pricetype)

// MA period input
shortperiod = input(7, title="Short Period Moving Average")
longperiod = input(20, title="Long Period Moving Average")



short = ema(price, shortperiod) 
long = ema(price, longperiod) 
   
// MA trend direction color
shortcolor = short > short[1] ? lime : short < short[1] ? red : blue
longcolor = long > long[1] ? lime : long < long[1] ? red : blue

// MA output
MA1 = plot(short, title="Short Period Moving Average", style=linebr, linewidth=2, color=shortcolor)
MA2 = plot(long, title="Long Period Moving Average", style=linebr, linewidth=4, color=longcolor)
fill(MA1, MA2, color=silver, transp=50)

// MA trend bar color
TrendingUp() => short > long 
TrendingDown() => short < long 
barcolor(TrendingUp() ? green : TrendingDown() ? red : blue)

// MA cross alert
MAcrossing = cross(short, long) ? short : na
plot(MAcrossing, style = cross, linewidth = 4,color=black)

// MA cross background color alert
Uptrend() => TrendingUp() and TrendingDown()[1]
Downtrend() => TrendingDown() and TrendingUp()[1]
bgcolor(Uptrend() ? green : Downtrend() ? red : na,transp=50)

// Buy and sell alert
Buy = Uptrend() and close > close[1]
Sell = Downtrend() and close < close[1]
plotshape(Buy, color=black, style=shape.arrowup, text="Buy", location=location.bottom)
plotshape(Sell, color=black, style=shape.arrowdown, text="Sell", location=location.top)



if (Buy)
    strategy.entry("My Long Entry Id", strategy.long)


if (Sell)
    strategy.entry("My Short Entry Id", strategy.short)
```

> Detail

https://www.fmz.com/strategy/434691

> Last Modified

2023-12-08 12:20:42
