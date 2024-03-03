
> Name

MACD配信交叉策略MACD-Crossover-with-Signal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18ef70b95608e5f3d6f.png)
[trans]

## 概述

MACD配信交叉策略通过计算快速移动平均线和慢速移动平均线的差值形成MACD,再计算MACD的移动平均线形成配信线,当MACD上穿或下穿配信线时产生交易信号。该策略结合双均线思想,捕捉股价中期趋势的转折点,属于典型的跟踪止损策略。

## 策略原理

该策略首先计算快速移动平均线fastMA和慢速移动平均线slowMA。快速移动平均线参数为12日,慢速移动平均线参数为26日。然后计算两条移动平均线的差值,形成MACD。再以9日参数计算MACD的移动平均线,得到配信线signal。当MACD上穿或下穿配信线时,发出交易信号。

策略优势在于捕捉股价中期趋势的转折点。快慢均线组合过滤掉短期价格波动的噪音,能抓住中期价格趋势。MACD在股价发生中期转折时会突破配信线,产生比较明确的交易信号。

## 优势分析

MACD配信交叉策略结合双均线思想,利用快速移动平均线和慢速移动平均线组合过滤短期噪音,只捕捉股价中长期趋势转折点。相比单一价格指标,能产生更少假信号。

MACD本身较敏感,能灵敏反映价格变化趋势。配信线的加入能过滤掉更多短期假信号。只有中期趋势明确改变,MACD上下突破配信线,才会产生信号。

在可持续上升行情,MACD多数时间维持高于配信线,能顺势捕捉多头机会。同理,在持续下跌行情,MACD也能维持多空格局,及时给与空头信号。

## 风险分析

由于策略买卖点信号完全依赖移动平均线的交叉,如果行情震荡较大,会产生较多假信号,导致频繁止损。策略实际盈亏并不理想。

股价突破配信线并不能完全确保中期趋势就此改变。仅凭单一技术指标作为买点信号具有一定盲目性,时间点选择可能欠准确。

在瞬息万变的市场中,仅凭双均线指标的交叉作为定阈值,可能会错过更多交易机会。更复杂强势行情中,该策略也会产生明显滞后。

## 优化方向  

1. 增加流动性和波动性过滤指标,降低开仓频率,避免无效交易。如增加成交量,动态调整移动平均线参数等。

2. 结合其它多个技术指标,形成指标组合,提高信号质量。短期指标与中长期指标相结合,能更全面判断市场结构。 

3. 增加机器学习算法,训练出更符合当前市场环境的参数和注意阈值,减少人工干预。

4. 结合VIX等恐慌指数预测前期市场走势和波动性,动态调整参数,更好利用MACD机会。

## 总结  

MACD配信交叉策略利用双均线交叉原理产生交易信号。通过快慢均线的差值画图,股票中期价格趋势变化会有明显特征。配信线的加入也有效过滤了部分噪音讯号。该策略在捕捉较为明确的中期趋势转折时,具有一定优势。但MACD和配信线的交叉无法完全确定市场结构发生根本改变,需谨慎对待交易信号。建议与其它多种技术指标组合使用,也可考虑增加机器学习优化。

||

## Overview  

The MACD Crossover with Signal strategy generates trading signals when the MACD crosses above or below the signal line. The strategy combines the idea of double moving averages to capture the turning points of medium-term trends in stock prices, belonging to a typical trailing stop loss strategy.

## Strategy Principle  

The strategy first calculates the fast moving average line fastMA and the slow moving average line slowMA. The fast moving average parameter is 12 days, and the slow moving average parameter is 26 days. Then calculate the difference between the two moving average lines to form the MACD. Then calculate the 9-day moving average of the MACD to get the signal line. Trading signals are generated when the MACD crosses above or below the signal line.

The advantage of the strategy is to capture the turning point of the medium-term trend of stock prices. The combination of fast and slow moving averages filters out short-term price fluctuations and noise, and can capture medium-term price trends. When the stock price undergoes a medium-term reversal, the MACD will break through the signal line and generate relatively clear trading signals.

## Advantage Analysis   

The MACD Crossover with Signal strategy combines the idea of double moving averages to filter out short-term noise and only capture the turning points of long and medium-term trends. Compared with a single price indicator, it can generate fewer false signals.

MACD itself is more sensitive and can respond sensitively to price trend changes. The addition of the signal line can filter out more short-term false signals. Only when the medium-term trend changes significantly, the MACD breaks through the signal line up and down, will a signal be generated.

In a sustainable uptrend, the MACD maintains above the signal line most of the time, which can capture multiple opportunities along the way. Similarly, in a sustained downtrend, the MACD can also maintain a long/short pattern and give short signals in a timely manner.  

## Risk Analysis

Since the strategy buy and sell signals rely entirely on the crossover of the moving averages, if the market fluctuates greatly, more false signals will be generated, resulting in frequent stop loss. The actual profit and loss of the strategy may not meet expectations.  

Breaking through the signal line does not necessarily ensure that the medium-term trend has changed. Relying solely on a single technical indicator as a buy signal has a certain blindness, and the timing may not be accurate enough.

In the ever-changing market, using the crossover of double moving averages alone as the threshold may miss more trading opportunities. In more complex strong trends, this strategy will also lag significantly.  

## Optimization Directions

1. Add liquidity and volatility filtering indicators to reduce opening frequency and avoid ineffective trading. Such as adding trading volume, dynamically adjusting moving average parameters, etc.

2. Combine multiple other technical indicators to form an indicator portfolio to improve signal quality. The combination of short-term and medium and long-term indicators can more comprehensively judge the market structure.

3. Add machine learning algorithms to train parameters and attention thresholds that are more suitable for the current market environment, reducing human intervention.

4. Combine VIX and other fear indices to predict market trends and volatility, and dynamically adjust parameters to better take advantage of MACD opportunities.

## Conclusion  

The MACD Crossover with Signal strategy uses the principle of double moving average crossover to generate trading signals. Drawing the price graph by the difference between fast and slow moving averages, medium-term price trend changes will have obvious characteristics. The addition of the signal line also effectively filters out some noisy signals. The strategy has some advantages in capturing relatively clear medium-term trend reversals. However, the crossover of MACD and signal line cannot fully determine the fundamental change in market structure, and trading signals need to be treated with caution. It is recommended to use in combination with other technical indicators, and machine learning optimization can also be considered.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use Current Chart Resolution?|
|v_input_2|60|Use Different Timeframe? Uncheck Box Above|
|v_input_3|true|Show MacD & Signal Line? Also Turn Off Dots Below|
|v_input_4|true|Show Dots When MacD Crosses Signal Line?|
|v_input_5|true|Show Histogram?|
|v_input_6|true|Change MacD Line Color-Signal Line Cross?|
|v_input_7|true|MacD Histogram 4 Colors?|
|v_input_8|12|fastLength|
|v_input_9|26|slowLength|
|v_input_10|9|signalLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-06 00:00:00
end: 2023-12-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@author : SudeepBisht
//@version=2
strategy(title="MACD with Signal", shorttitle="MACD_with_Signal")
source = close
useCurrentRes = input(true, title="Use Current Chart Resolution?")
resCustom = input(title="Use Different Timeframe? Uncheck Box Above", defval="60")
smd = input(true, title="Show MacD & Signal Line? Also Turn Off Dots Below")
sd = input(true, title="Show Dots When MacD Crosses Signal Line?")
sh = input(true, title="Show Histogram?")
macd_colorChange = input(true,title="Change MacD Line Color-Signal Line Cross?")
hist_colorChange = input(true,title="MacD Histogram 4 Colors?")

res = useCurrentRes ? timeframe.period : resCustom

fastLength = input(12, minval=1), slowLength=input(26,minval=1)
signalLength=input(9,minval=1)

fastMA = ema(source, fastLength)
slowMA = ema(source, slowLength)

macd = fastMA - slowMA
signal = sma(macd, signalLength)
hist = macd - signal

outMacD = request.security(syminfo.tickerid, res, macd)
outSignal = request.security(syminfo.tickerid, res, signal)
outHist = request.security(syminfo.tickerid, res, hist)

histA_IsUp = outHist > outHist[1] and outHist > 0
histA_IsDown = outHist < outHist[1] and outHist > 0
histB_IsDown = outHist < outHist[1] and outHist <= 0
histB_IsUp = outHist > outHist[1] and outHist <= 0

//MacD Color Definitions
macd_IsAbove = outMacD >= outSignal
macd_IsBelow = outMacD < outSignal

plot_color = hist_colorChange ? histA_IsUp ? green : histA_IsDown ? lime : histB_IsDown ? red : histB_IsUp ? maroon :yellow :gray
macd_color = macd_colorChange ? macd_IsAbove ? green : red : red
signal_color = macd_colorChange ? macd_IsAbove ? yellow : yellow : lime

circleYPosition = outSignal
 
plot(smd and outMacD ? outMacD : na, title="MACD", color=macd_color, linewidth=3)
plot(smd and outSignal ? outSignal : na, title="Signal", color=blue, style=line ,linewidth=1)
plot(sh and outHist ? outHist : na, title="", color=plot_color, style=columns, linewidth=4)
//plot(sd and cross(outMacD, outSignal) ? circleYPosition : na, title="Cross", style=circles, linewidth=4, color=macd_color)
hline(0, '0 Line',  linewidth=2, color=white)

macd_chk=smd and outMacD ? outMacD : na
checker=smd and outSignal ? outSignal : na
if (crossover(macd_chk,checker))
    strategy.entry("BBandLE", strategy.long)

if (crossunder(macd_chk, checker))
    strategy.entry("BBandSE", strategy.short)

```

> Detail

https://www.fmz.com/strategy/435271

> Last Modified

2023-12-13 16:58:15
