
> Name

双线追踪算法交易策略Dual-Moving-Average-Crossover-Algorithmic-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/112cd8ad34c6cf1ff1d.png)

[trans]

### 概述

该策略主要利用均线交叉原理,结合RSI指标反转信号,以及自定义的双线追踪算法实现均线交叉追踪交易。策略追踪两个不同周期的均线交叉,一个快速均线追踪短期趋势,另一个慢速均线追踪长期趋势。当快速均线向上穿过慢速均线时,表示短期趋势向上,可以买入;当快速均线向下穿过慢速均线时,表示短期趋势结束,应该平仓。

### 策略原理

1. 计算两组不同参数的VWAP均线,分别代表长期趋势和短期趋势

    - 慢速天幕线和基准线计算长期趋势
    - 快速天幕线和基准线计算短期趋势

2. 分别取两组天幕线和基准线的平均值作为慢速均线和快速均线

3. 计算布林带指标判断盘整和突破

    - 中线为快速均线和慢速均线的平均值
    - 布林带上下轨用于判断突破

4. 计算TSV指标判断交易量能量

    - TSV大于0表示上涨力量大于下跌力量
    - TSV大于其EMA表示力量增强

5. 计算RSI指标判断超买超卖

    - RSI低于30时为超卖区间,可以买入
    - RSI高于70时为超买区间,应该卖出

6. 入场条件:

    - 快速均线上穿慢速均线
    - 关闭价上穿布林带上轨
    - TSV大于0且大于其EMA
    - RSI低于30

7. 出场条件:

    - 快速均线下穿慢速均线
    - RSI高于70

### 优势分析

1. 使用双均线系统,可以同时捕捉长短期趋势

2. RSI指标避免买入超买区域,卖出超卖区域

3. TSV指标确保有足够的交易量支撑趋势

4. 利用布林带判断关键的突破点

5. 多种指标组合,可以有效过滤假突破

### 风险分析

1. 均线系统容易产生错误信号,需要辅助指标过滤

2. RSI指标参数需要优化,否则可能错过买卖点

3. TSV指标对参数也很敏感,需要仔细测试

4. 突破布林带上轨有可能是假突破,需要验证

5. 多指标组合,参数优化难度大,容易过度优化

6. 训练和测试数据不充分可能导致曲线拟合

### 优化方向

1. 测试更多周期参数,寻找最佳参数组合

2. 尝试其他指标如MACD、KD替代或结合RSI

3. 参数优化要充分利用walk forward分析

4. 增加止损策略,以控制单笔损失

5. 考虑加入机器学习模型辅助信号判断

6. 针对不同市场调整参数,不要过度依赖单一参数组合

### 总结

本策略通过双均线系统捕捉长短期趋势,同时使用RSI、TSV、布林带等多种指标过滤信号。策略优势是可以顺势而为,捕捉长期上升浪潮。但也存在一定的假信号风险,需要进一步优化参数并控制止损来降低风险。总体来说,该策略结合趋势跟踪和反转指标,在长线上升市场中效果较好,但需要针对不同市场做getParameter调整。

||


### Overview

This strategy mainly utilizes the moving average crossover principle, combined with the RSI indicator reversal signals and a custom dual moving average crossover algorithm to implement trend trading. The strategy tracks two moving averages of different periods, with a faster MA tracking short-term trends and a slower MA tracking long-term trends. When the faster MA crosses over the slower MA upwards, it signals an upward trend and a chance to buy. When the faster MA crosses below the slower MA, it signals the end of the short-term trend and a chance to close positions.

### Strategy Logic

1. Calculate two groups of VWAP moving averages with different parameters, representing long-term and short-term trends respectively.

    - Slow Tenkansen and Kijunsen calculate long-term trend
    - Fast Tenkansen and Kijunsen calculate short-term trend

2. Take the averages of Tenkansen and Kijunsen as slow and fast moving averages.

3. Calculate Bollinger Bands to identify consolidations and breakouts.

    - Middle line is the average of fast and slow MAs 
    - Upper and lower bands are used to detect breakouts

4. Calculate TSV to determine volume energy

    - TSV greater than 0 indicates bullish volume
    - TSV greater than its EMA indicates strengthening momentum

5. Calculate RSI to identify overbought and oversold conditions

    - RSI below 30 is oversold zone for buying
    - RSI above 70 is overbought zone for selling

6. Entry conditions:

    - Fast MA crosses over slow MA
    - Close crosses above Upper Bollinger Band 
    - TSV greater than 0 and EMA
    - RSI below 30

7. Exit conditions:

    - Fast MA crosses below slow MA
    - RSI greater than 70

### Advantage Analysis

1. Dual moving average system captures both long and short term trends

2. RSI avoids buying overbought zones and selling oversold zones

3. TSV ensures sufficient volume supporting the trend 

4. Bollinger Bands identify key breakout points

5. Combination of indicators helps filter false breakouts

### Risk Analysis

1. MA systems prone to false signals, needs filtering with other indicators

2. RSI parameters need optimization, may otherwise miss buy/sell points

3. TSV also very sensitive to parameters, requires careful testing

4. Breaking BB upper band may be false breakout, needs verification

5. Difficult to optimize many indicators, risks overfitting

6. Insufficient train/test data may cause curve fitting

### Optimization Directions

1. Test more periods to find best parameter combinations

2. Try other indicators like MACD, KD to replace or combine with RSI

3. Utilize walk forward analysis for parameter optimization

4. Add stop loss to control single trade loss

5. Consider machine learning models to aid signal prediction

6. Adjust parameters for different markets, don't overfit to single parameter set

### Conclusion

This strategy captures long and short term trends using dual moving averages, and filters signals with RSI, TSV, Bollinger Bands and more. The advantage is trading in line with long-term upward momentum. But it also carries false signal risks, requiring further parameter tuning and stop losses to reduce risks. Overall, combining trend following and mean reversion yields good results in long-term uptrends, but parameters need adjustment for different markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|(?Mean Reversion Strategy Inputs)Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|8|Small VWAP|
|v_input_3|10|Big VWAP|
|v_input_4|50|Mean VWAP|
|v_input_5|2|Percent below to buy %|
|v_input_6|2|Rsi Period|
|v_input_7|5|Rsi Ema Period|
|v_input_8|30|Maximum Rsi Level for Buy|
|v_input_9|9|(?Trend Hunter Strategy Inputs)Slow Tenkan Sen VWAP Line Length|
|v_input_10|13|Slow Kijun Sen VWAP Line Length|
|v_input_11|3|Fast Tenkan Sen VWAP Line Length|
|v_input_12|7|Fast Kijun Sen VWAP Line Length|
|v_input_13|20|Bollinger Band Length|
|v_input_14|2|Bollinger Band StdDev|
|v_input_15|20|TSV Length|
|v_input_16|7|TSV Ema Length|
|v_input_17|20|Vidya Length|
|v_input_18_hl2|0|Vidya Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_19|true|(?Strategy Date Range)Start Date|
|v_input_20|true|Start Month|
|v_input_21|2000|Start Year|
|v_input_22|31|End Date|
|v_input_23|12|End Month|
|v_input_24|2021|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-23 00:00:00
end: 2023-10-29 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=4

// Credits

// "Vwap with period" code which used in this strategy to calculate the leadLine was written by "neolao" active on https://tr.tradingview.com/u/neolao/
// "TSV" code which used in this strategy was written by "liw0" active on https://www.tradingview.com/u/liw0. The code is corrected by "vitelot" December 2018.
// "Vidya" code which used in this strategy was written by "everget" active on https://tr.tradingview.com/u/everget/

strategy("HYE Combo Market [Strategy] (Vwap Mean Reversion + Trend Hunter)", overlay = true, initial_capital = 1000, default_qty_value = 100, default_qty_type = strategy.percent_of_equity, commission_value = 0.025)
  
//Strategy inputs

source = input(title = "Source", defval = close, group = "Mean Reversion Strategy Inputs")
smallcumulativePeriod = input(title = "Small VWAP", defval = 8, group = "Mean Reversion Strategy Inputs")
bigcumulativePeriod = input(title = "Big VWAP", defval = 10, group = "Mean Reversion Strategy Inputs")
meancumulativePeriod = input(title = "Mean VWAP", defval = 50, group = "Mean Reversion Strategy Inputs")
percentBelowToBuy = input(title = "Percent below to buy %", defval = 2, group = "Mean Reversion Strategy Inputs")
rsiPeriod = input(title = "Rsi Period", defval = 2, group = "Mean Reversion Strategy Inputs")
rsiEmaPeriod = input(title = "Rsi Ema Period", defval = 5, group = "Mean Reversion Strategy Inputs") 
rsiLevelforBuy = input(title = "Maximum Rsi Level for Buy", defval = 30, group = "Mean Reversion Strategy Inputs")
slowtenkansenPeriod = input(9, minval=1, title="Slow Tenkan Sen VWAP Line Length", group = "Trend Hunter Strategy Inputs")
slowkijunsenPeriod = input(13, minval=1, title="Slow Kijun Sen VWAP Line Length", group = "Trend Hunter Strategy Inputs")
fasttenkansenPeriod = input(3, minval=1, title="Fast Tenkan Sen VWAP Line Length", group = "Trend Hunter Strategy Inputs")
fastkijunsenPeriod = input(7, minval=1, title="Fast Kijun Sen VWAP Line Length", group = "Trend Hunter Strategy Inputs")
BBlength = input(20, minval=1, title= "Bollinger Band Length", group = "Trend Hunter Strategy Inputs")
BBmult = input(2.0, minval=0.001, maxval=50, title="Bollinger Band StdDev", group = "Trend Hunter Strategy Inputs")
tsvlength  = input(20, minval=1, title="TSV Length", group = "Trend Hunter Strategy Inputs")
tsvemaperiod = input(7, minval=1, title="TSV Ema Length", group = "Trend Hunter Strategy Inputs")
length = input(title="Vidya Length", type=input.integer, defval=20, group = "Trend Hunter Strategy Inputs") 
src = input(title="Vidya Source", type=input.source, defval= hl2 , group = "Trend Hunter Strategy Inputs")

// Vidya Calculation 

getCMO(src, length) =>
    mom = change(src)
    upSum = sum(max(mom, 0), length)
    downSum = sum(-min(mom, 0), length)
    out = (upSum - downSum) / (upSum + downSum)
    out

cmo = abs(getCMO(src, length))

alpha = 2 / (length + 1)

vidya = 0.0
vidya := src * alpha * cmo + nz(vidya[1]) * (1 - alpha * cmo)

// Make input options that configure backtest date range 

startDate = input(title="Start Date", type=input.integer,
     defval=1, minval=1, maxval=31, group = "Strategy Date Range")
startMonth = input(title="Start Month", type=input.integer,
     defval=1, minval=1, maxval=12, group = "Strategy Date Range")
startYear = input(title="Start Year", type=input.integer,
     defval=2000, minval=1800, maxval=2100, group = "Strategy Date Range")

endDate = input(title="End Date", type=input.integer, 
     defval=31, minval=1, maxval=31, group = "Strategy Date Range")
endMonth = input(title="End Month", type=input.integer,
     defval=12, minval=1, maxval=12, group = "Strategy Date Range") 
endYear = input(title="End Year", type=input.integer,
     defval=2021, minval=1800, maxval=2100, group = "Strategy Date Range")
     
inDateRange = true
// Mean Reversion Strategy Calculation 

typicalPriceS = (high + low + close) / 3
typicalPriceVolumeS = typicalPriceS * volume
cumulativeTypicalPriceVolumeS = sum(typicalPriceVolumeS, smallcumulativePeriod)
cumulativeVolumeS = sum(volume, smallcumulativePeriod)
smallvwapValue = cumulativeTypicalPriceVolumeS / cumulativeVolumeS

typicalPriceB = (high + low + close) / 3
typicalPriceVolumeB = typicalPriceB * volume
cumulativeTypicalPriceVolumeB = sum(typicalPriceVolumeB, bigcumulativePeriod)
cumulativeVolumeB = sum(volume, bigcumulativePeriod)
bigvwapValue = cumulativeTypicalPriceVolumeB / cumulativeVolumeB 

typicalPriceM = (high + low + close) / 3
typicalPriceVolumeM = typicalPriceM * volume
cumulativeTypicalPriceVolumeM = sum(typicalPriceVolumeM, meancumulativePeriod)
cumulativeVolumeM = sum(volume, meancumulativePeriod)
meanvwapValue = cumulativeTypicalPriceVolumeM / cumulativeVolumeM

rsiValue = rsi(source, rsiPeriod)
rsiEMA   = ema(rsiValue, rsiEmaPeriod)
buyMA = ((100 - percentBelowToBuy) / 100) * bigvwapValue[0]

inTrade = strategy.position_size > 0
notInTrade = strategy.position_size <= 0

if(crossunder(smallvwapValue, buyMA) and rsiEMA < rsiLevelforBuy and close < meanvwapValue and inDateRange and notInTrade)
    strategy.entry("BUY-M", strategy.long)

if(close > meanvwapValue or not inDateRange)
    strategy.close("BUY-M")
    
// Trend Hunter Strategy Calculation

// Slow Tenkan Sen Calculation

typicalPriceTS = (high + low + close) / 3
typicalPriceVolumeTS = typicalPriceTS * volume
cumulativeTypicalPriceVolumeTS = sum(typicalPriceVolumeTS, slowtenkansenPeriod)
cumulativeVolumeTS = sum(volume, slowtenkansenPeriod)
slowtenkansenvwapValue = cumulativeTypicalPriceVolumeTS / cumulativeVolumeTS

// Slow Kijun Sen Calculation

typicalPriceKS = (high + low + close) / 3
typicalPriceVolumeKS = typicalPriceKS * volume
cumulativeTypicalPriceVolumeKS = sum(typicalPriceVolumeKS, slowkijunsenPeriod)
cumulativeVolumeKS = sum(volume, slowkijunsenPeriod)
slowkijunsenvwapValue = cumulativeTypicalPriceVolumeKS / cumulativeVolumeKS

// Fast Tenkan Sen Calculation

typicalPriceTF = (high + low + close) / 3
typicalPriceVolumeTF = typicalPriceTF * volume
cumulativeTypicalPriceVolumeTF = sum(typicalPriceVolumeTF, fasttenkansenPeriod)
cumulativeVolumeTF = sum(volume, fasttenkansenPeriod)
fasttenkansenvwapValue = cumulativeTypicalPriceVolumeTF / cumulativeVolumeTF

// Fast Kijun Sen Calculation

typicalPriceKF = (high + low + close) / 3
typicalPriceVolumeKF = typicalPriceKS * volume
cumulativeTypicalPriceVolumeKF = sum(typicalPriceVolumeKF, fastkijunsenPeriod)
cumulativeVolumeKF = sum(volume, fastkijunsenPeriod)
fastkijunsenvwapValue = cumulativeTypicalPriceVolumeKF / cumulativeVolumeKF

// Slow LeadLine Calculation
 
lowesttenkansen_s = lowest(slowtenkansenvwapValue, slowtenkansenPeriod)
highesttenkansen_s = highest(slowtenkansenvwapValue, slowtenkansenPeriod)

lowestkijunsen_s = lowest(slowkijunsenvwapValue, slowkijunsenPeriod)
highestkijunsen_s = highest(slowkijunsenvwapValue, slowkijunsenPeriod)

slowtenkansen = avg(lowesttenkansen_s, highesttenkansen_s)
slowkijunsen = avg(lowestkijunsen_s, highestkijunsen_s)
slowleadLine = avg(slowtenkansen, slowkijunsen)

// Fast LeadLine Calculation 
 
lowesttenkansen_f = lowest(fasttenkansenvwapValue, fasttenkansenPeriod)
highesttenkansen_f = highest(fasttenkansenvwapValue, fasttenkansenPeriod)

lowestkijunsen_f = lowest(fastkijunsenvwapValue, fastkijunsenPeriod)
highestkijunsen_f = highest(fastkijunsenvwapValue, fastkijunsenPeriod) 

fasttenkansen = avg(lowesttenkansen_f, highesttenkansen_f)
fastkijunsen = avg(lowestkijunsen_f, highestkijunsen_f)
fastleadLine = avg(fasttenkansen, fastkijunsen)

// BBleadLine Calculation
 
BBleadLine = avg(fastleadLine, slowleadLine)

// Bollinger Band Calculation
 
basis = sma(BBleadLine, BBlength)
dev = BBmult * stdev(BBleadLine, BBlength)
upper = basis + dev  
lower = basis - dev 

// TSV Calculation

tsv = sum(close>close[1]?volume*(close-close[1]):close<close[1]?volume*(close-close[1]):0,tsvlength)
tsvema = ema(tsv, tsvemaperiod)

// Rules for Entry & Exit  

if(fastleadLine > fastleadLine[1] and slowleadLine > slowleadLine[1] and tsv > 0 and tsv > tsvema and close > upper and close > vidya and inDateRange and notInTrade)
    strategy.entry("BUY-T", strategy.long)
 
if((fastleadLine < fastleadLine[1] and slowleadLine < slowleadLine[1]) or not inDateRange)
    strategy.close("BUY-T")

// Plots 

plot(meanvwapValue, title="MEAN VWAP", linewidth=2, color=color.yellow)

//plot(vidya, title="VIDYA", linewidth=2, color=color.green)

//colorsettingS = input(title="Solid Color Slow Leadline", defval=false, type=input.bool)
//plot(slowleadLine, title = "Slow LeadLine", color = colorsettingS ? color.aqua : slowleadLine > slowleadLine[1] ? color.green : color.red, linewidth=3)

//colorsettingF = input(title="Solid Color Fast Leadline", defval=false, type=input.bool)
//plot(fastleadLine, title = "Fast LeadLine", color = colorsettingF ? color.orange : fastleadLine > fastleadLine[1] ? color.green : color.red, linewidth=3)

//p1 = plot(upper, "Upper BB", color=#2962FF)
//p2 = plot(lower, "Lower BB", color=#2962FF)
//fill(p1, p2, title = "Background", color=color.blue)

//plot(smallvwapValue, color=#13C425, linewidth=2)
//plot(bigvwapValue, color=#CA1435, linewidth=2)

```

> Detail

https://www.fmz.com/strategy/430578

> Last Modified

2023-10-30 15:27:34
