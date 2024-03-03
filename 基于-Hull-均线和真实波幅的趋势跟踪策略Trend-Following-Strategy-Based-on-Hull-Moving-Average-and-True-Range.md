
> Name

基于-Hull-均线和真实波幅的趋势跟踪策略Trend-Following-Strategy-Based-on-Hull-Moving-Average-and-True-Range

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14952cbb0a04ee6a4cf.png)
 [trans]

## 概述

本策略的核心思想是结合 Hull 均线和真实波幅(ATR)来识别市场趋势方向,并在趋势方向确认后进行入场。具体来说,是计算一定周期内的 Hull 均线和前一周期的 Hull 均线之间的差值,当差值上升时判断为看涨趋势,差值下降时判断为看跌趋势。同时结合 ATR 指标判断幅度,在趋势方向确认的同时波幅不断扩大的时候 choose 入场。

## 策略原理  

本策略主要基于 Hull 均线和 ATR 两类指标。

Hull 均线是由美国期货交易员 Alan Hull 开发的一个趋势跟踪型指标。Hull 均线类似于移动平均线,但是 Hull 均线具有更高的灵敏度,可以更快速地捕捉价格变化趋势。策略中设置了一个可调参数 hullLength 来控制 Hull 均线的周期长度,通过计算当前周期和前一周期的 Hull 均线之间的差值,来判断目前的价格趋势方向。

ATR 即 Average True Range,也就是真实波幅。它反映了每日价格波动的幅度。当波动加大时,真实波幅就会上升;当波动减小时,真实波幅就会下降。策略中设置了 atrLength、atrSmoothing 等参数来控制 ATR 的计算方式。并将其画在图表上,作为入场的指标之一。

具体来说,策略逻辑是:

1. 计算当前周期(hullLength 设置)的 Hull 均线 currentHullMA 和前一周期的 Hull 均线 previousHullMA
2. 计算两者的差值 hullDiff = currentHullMA - previousHullMA  
3. 当 hullDiff > 0 时,判断为多头趋势;当 hullDiff < 0 时,判断为空头趋势
4. 同时,计算一定周期(atrLength 设置)的 ATR 值,作为趋势的幅度指标
5. 当判断为多头趋势,且 ATR 值大于 price 且 price 大于 atrLength 周期前的价格时,做多;当判断为空头趋势,且 ATR 值小于 price 且 price 小于 atrLength 周期前的价格时,做空
6. 通过 hullDiff 的正负来判断平仓信号

## 策略优势分析

本策略具有如下优势:

1. 结合趋势判断和波动率指标,可以在价格趋势明确且波动加大时选择入场,避免在震荡市中被套。
2. Hull 均线对价格变化的响应更为敏感,可以快速判断新的趋势方向。
3. ATR 能反映市场波动性和热度,为入场时间点的选择提供依据。
4. 可调参数较多,可以通过优化得到最佳参数组合。

## 风险分析

本策略也存在一些风险:  

1. Hull 均线和 ATR 都无法完全避免假突破的问题,仍有可能被套。
2. 参数设置不当可能导致交易频繁或不够敏感,从而影响策略效果。  
3. 无法有效应对剧烈行情,如快速拉升突破或暴跌。

对应解决方法:

1. 适当宽松止损,避免被突破套牢。
2. 通过反复测试优化参数,使指标更符合不同市场环境。 
3. 在剧烈行情来临时,暂停策略运行。

## 优化方向  

本策略的优化空间还比较大,主要可以从以下几个方面入手:  

1. 测试不同的 Hull 均线周期参数,找到最适合当前市场环境的周期设置。
2. 测试不同的 ATR 周期参数组合,找到最能抓住行情热度的周期。
3. 尝试不同类型的 ATR 平滑方式(RMA、SMA、EMA等),看哪种方式效果最佳。  
4. 优化开仓条件,比如结合波动指标 Reaction 和 ATR 的组合条件判断。
5. 优化止损方式,适当放宽止损幅度,避免被套。

## 总结

本策略整合运用 Hull 均线的趋势跟踪能力和 ATR 的热度指标判断能力,在确认趋势的同时选择波动较大而积极的时间点入场,可以过滤掉一些无效信号。指标参数的优化和风险管理手段的使用可以进一步增强策略的效果。总的来说,本策略结合了趋势跟踪和热度判断的多种因素,在参数调整和优化到位的情况下,可以获得较好的效果。

||

## Overview

The core idea of this strategy is to identify market trend directions by combining Hull moving average and average true range (ATR), and enter positions after the trend direction is confirmed. Specifically, it calculates the difference between the Hull moving averages of a certain period and the previous period. When the difference rises, it indicates a bullish trend; when the difference declines, it indicates a bearish trend. At the same time, the ATR index is used to determine the amplitude. It enters positions when the trend direction is confirmed and the amplitude keeps expanding.

## Strategy Logic

This strategy mainly relies on two types of indicators: Hull moving average and ATR.

The Hull moving average is a trend-following indicator developed by American futures trader Alan Hull. Similar to moving averages, the Hull moving average has higher sensitivity and can capture price changes and trends faster. The strategy sets an adjustable parameter hullLength to control the period of the Hull moving average. By calculating the difference between the current period's Hull MA and previous period's, it determines the current price trend direction.

ATR stands for Average True Range. It reflects the amplitude of daily price fluctuations. When volatility increases, ATR rises; when volatility declines, ATR falls. The strategy sets parameters like atrLength and atrSmoothing to control the ATR calculation. And ATR is plotted on the chart as one reference for entries.

Specifically, the strategy logic is:  

1. Calculate current period Hull MA (hullLength) and previous period Hull MA. 
2. Calculate the difference: hullDiff = currentHullMA - previousHullMA
3. When hullDiff > 0, it indicates a bullish trend. When hullDiff < 0, it indicates a bearish trend.
4. Calculate ATR (atrLength) of a period as an amplitude benchmark.
5. When bullish trend is identified and ATR > price > price of atrLength periods ago, go long. When bearish and ATR < price < price of atrLength periods ago, go short.  
6. Use the positive/negative of hullDiff to determine close signals.

## Advantage Analysis 

The advantages of this strategy:

1. Combining trend judgment and volatility index, it can enter positions when price trend is clear and volatility rises to avoid whipsaws in range-bound markets.
2. Hull MA responds faster to price changes and can quickly identify new trend directions.
3. ATR reflects market volatility and heat, providing guidance for entry timings.  
4. Multiple adjustable parameters can be optimized for best parameter combinations.

## Risk Analysis

Some risks of this strategy:

1. Both Hull MA and ATR cannot completely avoid false breakouts and thus holds the risk of being trapped.
2. Improper parameter settings may lead to over-trading or insufficient sensitivity, undermining strategy efficacy. 
3. It cannot handle violent price actions like sharp spikes or crashes effectively.

Solutions:

1. Set proper stop loss to avoid being trapped by false breakouts.
2. Test and optimize parameters to fit different market environments.
3. Suspend strategy when facing violent volatility.  

## Optimization Directions 

There is still large room for optimization:

1. Test different hullLength parameters to find the optimal settings for current markets.
2. Test ATR period combinations to grasp market heat the best.  
3. Try different ATR smoothing methods to see which performs the best.
4. Optimize entry conditions with other volatility indicators like Reaction combined with ATR. 
5. Optimize stop loss to avoid being trapped.

## Conclusion

This strategy integrates the trend following capacity of Hull MA and the heat judgment ability of ATR. It enters positions when trend is confirmed and volatility rises to filter out some invalid signals. Further enhancement can be achieved by parameter optimization and better risk management. In summary, this strategy combines multiple factors of trend tracking and heat judgment. When parameters are fine-tuned, it can deliver good results.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Hull Length|
|v_input_2|50|ATR Length|
|v_input_3|0|ATR Smoothing: RMA|SMA|EMA|WMA|
|v_input_4_ohlc4|0|Price data: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-07 00:00:00
end: 2024-01-14 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//                                                Hull cross and ATR
strategy("Hull cross and ATR", shorttitle="H&ATR", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, calc_on_order_fills=true, calc_on_every_tick=true, pyramiding=0)
keh=input(title="Hull Length",defval=50)
length = input(title="ATR Length", defval=50, minval=1)
smoothing = input(title="ATR Smoothing", defval="RMA", options=["RMA", "SMA", "EMA", "WMA"])
p=input(ohlc4,title="Price data")
n2ma=2*wma(p,round(keh/2))
nma=wma(p,keh)
diff=n2ma-nma
sqn=round(sqrt(keh))
n2ma1=2*wma(p[1],round(keh/2))
nma1=wma(p[1],keh)
diff1=n2ma1-nma1
sqn1=round(sqrt(keh))
n1=wma(diff,sqn)
n2=wma(diff1,sqn)
ma_function(source, length) => 
    if smoothing == "RMA"
        rma(p, length)
    else
        if smoothing == "SMA"
            sma(p, length)
        else
            if smoothing == "EMA"
                ema(p, length)
            else
                wma(p, length)
plot(ma_function(tr(true), length), title = "ATR", color=black, transp=50)
closelong = n1<n2
if (closelong)
    strategy.close("buy")
closeshort = n1>n2
if (closeshort)
    strategy.close("sell")
if (ma_function(tr(true), length)<p and p>p[length] and n1>n2)
    strategy.entry("buy", strategy.long, comment="BUY")
if (ma_function(tr(true), length)>p and p<p[length] and n1<n2)
    strategy.entry("sell", strategy.short, comment="SELL")
```

> Detail

https://www.fmz.com/strategy/438824

> Last Modified

2024-01-15 15:26:08
