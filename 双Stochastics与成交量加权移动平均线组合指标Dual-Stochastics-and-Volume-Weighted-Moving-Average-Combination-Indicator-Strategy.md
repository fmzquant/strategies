
> Name

双Stochastics与成交量加权移动平均线组合指标Dual-Stochastics-and-Volume-Weighted-Moving-Average-Combination-Indicator-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9438a5d4a7647b6034.png)

[trans]

## 概述

这是一个利用双Stochastics指标与成交量加权移动平均线的组合来识别趋势的策略。该策略运用两个不同周期的Stochastics指标,一个是短周期的,一个是长周期的,再结合成交量加权移动平均线来判断目前的趋势方向。

## 策略原理

该策略主要通过如下几个部分来实现对趋势的判断:

1. 计算一个短周期的Stochastics指标,周期长度为input(30),平滑参数为2

2. 计算一个长周期的Stochastics指标,周期长度为input(90),平滑参数为2  

3. 将短周期和长周期的Stochastics指标相加,得到一个综合的Stochastics曲线ts

4. 对ts曲线计算一个成交量加权移动平均线tsl,周期长度为input(30)

5. 比较tsl当前值与其1周期前的值,当tsl上扬时,认为是上升趋势,当tsl下挫时,认为是下降趋势

6. 再结合Stochastics曲线的位置来判断是否为多头或空头信号

- 当tsl上扬且ts在中间区时为多头信号
- 当tsl下挫且ts在中间区时为空头信号

## 策略优势分析  

该策略结合了趋势判断和超买超卖判断,可以比较可靠地识别趋势方向。具体优势如下:

1. 双Stochastics指标可以同时反映短期和长期的超买超卖情况,避免漏掉某些信号

2. 成交量加权可以过滤掉一些虚假的突破信号

3. Stochastics曲线的位置再次验证了趋势信号的可靠性

4. 参数可调,可以根据不同市场适当调整周期长度

5. 策略思路清晰简洁,容易理解和修改

## 风险及改进分析

该策略也存在一些风险需要注意:

1. Stochastics指标容易发出假信号,需要结合较长周期指标过滤

2. 固定周期参数不适应所有市场情况,可以考虑动态优化参数

3. 仅基于技术指标,可结合基本面因素提高准确率 

4. 成交量数据不准确也会影响结果,需要验证成交量数据质量

5. 回测时间不足,需要更长的历史数据验证效果

6. 可优化入场点位,现在是 crosses under最低值直接做多,可设置缓冲区

## 总结

总体来说,该策略利用双Stochastics指标和成交量加权移动平均线进行趋势判断,在理论上可以比较可靠地识别趋势转折点。但参数设置需要针对具体市场进行优化,且存在一定假信号风险。建议结合其他因素如基本面、长期趋势等来综合判断,以提高策略Profit Factor。该策略思路简单清晰,为量化交易提供了一个模板,可根据需求进行修改优化,具有很强的应用价值。

||

## Overview

This is a strategy that utilizes a combination of dual Stochastics indicators and Volume Weighted Moving Average to identify trends. It uses two Stochastics indicators with different periods, one short-term and one long-term, combined with VWMA to determine the current trend direction.

## Strategy Logic

The strategy mainly implements trend identification through the following parts:

1. Calculate a short-period Stochastics indicator with period length input(30) and smooth parameter 2

2. Calculate a long-period Stochastics indicator with period length input(90) and smooth parameter 2

3. Add the short-period and long-period Stochastics together to get a combined Stochastics curve ts

4. Calculate a Volume Weighted Moving Average of ts curve with period length input(30)

5. Compare current tsl value with its value 1 period ago, when tsl rises, it indicates an uptrend, when tsl falls, it indicates a downtrend

6. Combine with Stochastics curve position to identify bullish or bearish signals

- When tsl rises and ts is in middle zone, it is a bullish signal 
- When tsl falls and ts is in middle zone, it is a bearish signal

## Advantage Analysis

The strategy combines trend identification and overbought-oversold analysis, which can identify trend direction quite reliably. The advantages are:

1. The dual Stochastics can reflect both short-term and long-term overbought/oversold situations, avoiding missing some signals

2. Volume weighted moving average can filter out some false breakout signals 

3. Stochastics curve position re-confirms the reliability of trend signals

4. Adjustable parameters suit different markets

5. Clear and simple logic, easy to understand and modify

## Risks and Improvements

There are also some risks to note for this strategy:

1. Stochastics may give false signals, needs filtering with longer-period indicators

2. Fixed periods may not suit all markets, dynamic optimization could help

3. Purely technical indicator based, fundamentals may improve accuracy

4. Inaccurate volume data affects results, need to verify data quality

5. Insufficient backtesting history, more data needed for validation

6. Entry points can be improved, rather than direct long on crosses under lowest

## Conclusion

In summary, this strategy identifies trends using dual Stochastics and VWMA, which can reliably identify trend reversals in theory. But parameter tuning is needed for specific markets, and false signals risk exists. Recommend combining other factors like fundamentals, long-term trends etc for judgment, to improve strategy Profit Factor. The logic is simple and clear, providing a template for quant trading, which can be modified as needed. It has great application value.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|periodK|
|v_input_2|90|periodK_two|
|v_input_3|30|VWMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-19 00:00:00
end: 2023-10-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Trend Finder V2", shorttitle="TFV2", format=format.price, precision=2, overlay = true)

//----------Indicator------------//

periodK = input(30)
periodD = 3
smoothK = 2

periodK_two = input(90)
periodD_two = 3
smoothK_two = 2

k = sma(stoch(close, high, low, periodK), smoothK)
d = sma(k, periodD)

k_two = sma(stoch(close, high, low, periodK_two), smoothK_two)
d_two = sma(k, periodD_two)

ts = k + k_two
tsl = vwma(ts, input(30, title = "VWMA Length"))

//--------Label parameter--------// 

up_label = tsl[1] < 100 and tsl > 100 ? 1 : 0
down_label = tsl[1] > 100 and tsl < 100 ? 1 : 0

//----------Color Code-----------//

//tsl_col = tsl > 100 and tsl > tsl[1] ? color.aqua : tsl > 100 and tsl < tsl[1] ? color.green : tsl < 100 and tsl > tsl[1] ? color.maroon : tsl < 100 and tsl < tsl[1] ? color.red : color.silver

//tsl_col = tsl > 100 and ts < 100 and ts > ts[1] ? color.aqua : tsl > 100 and ts > 100 and (ts > ts[1] or ts < ts[1]) ? color.green : tsl < 100 and ts > 100 and ts < ts[1] ? color.red : tsl < 100 and ts < 100 and (ts < ts[1] or ts > ts[1]) ? color.maroon : color.purple  

tsl_col = ts > ts[1] and tsl > tsl[1] ? color.lime : ts < ts[1] and tsl < tsl[1] ? color.red : color.yellow 

ts_col = (tsl_col == color.lime or tsl_col == color.maroon) and (k>k[1] and k < 30) ? color.lime :  (tsl_col == color.green or tsl_col == color.red) and (k < k[1] and k > 70)  ? color.red : color.silver

//-------------Plots-------------//

buy = tsl_col[1] == color.yellow and tsl_col == color.lime ? 1 : 0
sell = tsl_col[1] == color.yellow and tsl_col == color.red ? -1 : 0

plotcandle(open,high,low,close, color=tsl_col)

strategy.entry("Long", strategy.long,when=buy==1)
strategy.close("Long", when=sell==-1)

```

> Detail

https://www.fmz.com/strategy/430278

> Last Modified

2023-10-26 17:18:53
