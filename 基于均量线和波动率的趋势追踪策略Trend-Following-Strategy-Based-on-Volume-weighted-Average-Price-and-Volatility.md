
> Name

基于均量线和波动率的趋势追踪策略Trend-Following-Strategy-Based-on-Volume-weighted-Average-Price-and-Volatility

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略综合运用均量线、布林带和时间段量等多种指标,识别价格趋势的启动和结束,进行趋势追踪操作。策略通过多种指标确认,可有效过滤假突破。

## 策略原理

该策略包含以下关键步骤:

1. 计算快速均量线和慢速均量线。均量线计算使用VWAP而不是收盘价,可更准确反映真实交易价格。

2. 计算均量线的平均值,并以该平均值为基础绘制布林带。布林带可判断价格波动率是否扩大,提示趋势启动。

3. 引入时间段量(TSV)指标,判断交易量是否在扩大,从而确认趋势存在。

4. 当快速均量线上穿慢速均量线,价格高于布林上轨且TSV大于0时,产生买入信号;反之出现卖出信号。

5. 使用均量线回撤以及布林下轨作为止损平仓信号。

## 策略优势

- 使用多种指标确认,可有效过滤假突破,识别趋势开始

- 均量线计算方法可更准确反映真实交易价格

- 结合波动率指标判断趋势存在与否

- 增加交易量指标,确认趋势发展中

- 设置合理的止损和止盈标准,可控制风险

- 参数可配置,可以灵活调整至最佳状态

## 策略风险

- 多指标组合判断,存在参数优化难度大的问题

- 均量线和布林带都存在滞后问题,可能带来止损不够及时

- 时间段量指标对参数设置敏感,不同市场需要调整

- 在盘整市场中,存在产生较多假信号的可能性

- 未考虑交易成本的影响,实际盈亏会弱于回测结果

## 策略优化方向

- 尝试采用机器学习方法自动优化参数组合

- 设置动态移动止损或追踪止损,更好地锁定利润

- 引入交易量能量指标,避免量能背离导致的失误交易

- 结合波浪理论,判断目前处于趋势的早中后期,动态调整策略参数

- 考虑实际交易成本影响,设置最小止盈幅度以控制成本效率

## 总结

本策略综合考量多种指标提供良好的趋势识别能力,可以有效判断真实趋势的启动和结束。通过参数优化、止损优化以及过滤器优化,可以进一步提升策略的稳定性。但整体来说,作为趋势追踪策略,其回撤和盈亏比例仍然需要承担一定风险。需要交易者耐心等待机会,且具备严格的风险管理意识。

|| 

## Overview

This strategy integrates multiple indicators including volume-weighted average price, Bollinger Bands and time segmented volume to identify the start and end of price trends and follow trends. The multiple confirmations can effectively filter false breakouts.

## Strategy Logic

The strategy involves the following key steps:

1. Calculate fast and slow volume-weighted average price lines. VWAP instead of close price is used to better reflect actual trading price.

2. Take the average of the VWAP lines to plot Bollinger Bands. Expanding volatility shown by bands suggests a trend start.

3. Introduce time segmented volume (TSV) to confirm increasing trading volume and validate the trend.

4. Generate buy signal when fast VWAP crosses above slow VWAP, price breaks above Bollinger upper band, and TSV is positive. Sell signal when reverse occurs.

5. Use VWAP pullback and Bollinger lower band as stop loss signals.

## Advantages

- Multiple confirmations effectively filter false breakouts and identify trend start

- VWAP calculation reflects actual trading price better 

- Volatility indicator judges if a trend is present

- Trading volume confirms trend continuation  

- Reasonable stop loss and take profit controls risk

- Configurable parameters allow flexible optimization

## Risks

- Difficulty in optimizing multiple indicators

- Lagging nature of VWAP and Bollinger Bands delays stop loss

- TSV sensitive to parameter tuning for different markets

- More false signals in range-bound markets

- Ignores trading costs, actual P&L weaker than backtest  

## Enhancements

- Apply machine learning to auto optimize parameter combinations

- Set dynamic or trailing stop loss to better lock in profits

- Add volume momentum indicators to avoid divergence

- Incorporate Elliott Waves to determine trend stages, adjust parameters accordingly

- Consider trading costs, set minimum profit target to control cost efficiency

## Conclusion

This strategy provides good trend identification by integrating multiple indicators. It can effectively determine the start and end of real trends. Further improvements in stability can be achieved through parameter optimization, stop loss optimization and filter optimization. But overall, as a trend following strategy, it still carries certain levels of drawdown and risk-reward ratios. Traders need patience to wait for opportunities and strict risk management mindset.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_15|false|Solid Color Slow Leadline|
|v_input_16|false|Solid Color Fast Leadline|
|v_input_1|9|(?Tenkansen / Kijunsen)Slow Tenkan Sen VWAP Line Length|
|v_input_2|26|Slow Kijun Sen VWAP Line Length|
|v_input_3|5|Fast Tenkan Sen VWAP Line Length|
|v_input_4|13|Fast Kijun Sen VWAP Line Length|
|v_input_5|20|(?Bollinger Bands)Bollinger Band Length|
|v_input_6|2|Bollinger Band StdDev|
|v_input_7|13|(?Tıme Segmented Volume)TSV Length|
|v_input_8|7|TSV Ema Length|
|v_input_9|true|(?Backtest Range)Start Date|
|v_input_10|true|Start Month|
|v_input_11|2000|Start Year|
|v_input_12|31|End Date|
|v_input_13|12|End Month|
|v_input_14|2021|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=4

// Credits

// "Vwap with period" code which used in this strategy to calculate the leadLine was written by "neolao" active on https://tr.tradingview.com/u/neolao/
// "TSV" code which used in this strategy was written by "liw0" active on https://www.tradingview.com/u/liw0. The code is corrected by "vitelot" December 2018.

strategy("HYE Trend Hunter [Strategy]", overlay = true, initial_capital = 1000, default_qty_value = 100, default_qty_type = strategy.percent_of_equity, commission_value = 0.025, pyramiding = 0)
  
// Strategy inputs 

slowtenkansenPeriod = input(9, minval=1, title="Slow Tenkan Sen VWAP Line Length", group = "Tenkansen / Kijunsen")
slowkijunsenPeriod = input(26, minval=1, title="Slow Kijun Sen VWAP Line Length", group = "Tenkansen / Kijunsen")
fasttenkansenPeriod = input(5, minval=1, title="Fast Tenkan Sen VWAP Line Length", group = "Tenkansen / Kijunsen")
fastkijunsenPeriod = input(13, minval=1, title="Fast Kijun Sen VWAP Line Length", group = "Tenkansen / Kijunsen")
BBlength = input(20, minval=1, title= "Bollinger Band Length", group = "Bollinger Bands")
BBmult = input(2.0, minval=0.001, maxval=50, title="Bollinger Band StdDev", group = "Bollinger Bands")
tsvlength  = input(13, minval=1, title="TSV Length", group = "Tıme Segmented Volume")
tsvemaperiod = input(7, minval=1, title="TSV Ema Length", group = "Tıme Segmented Volume")

// Make input options that configure backtest date range  
 
startDate = input(title="Start Date", type=input.integer,
     defval=1, minval=1, maxval=31, group = "Backtest Range")
startMonth = input(title="Start Month", type=input.integer,
     defval=1, minval=1, maxval=12, group = "Backtest Range")
startYear = input(title="Start Year", type=input.integer,
     defval=2000, minval=1800, maxval=2100, group = "Backtest Range")

endDate = input(title="End Date", type=input.integer, 
     defval=31, minval=1, maxval=31, group = "Backtest Range")
endMonth = input(title="End Month", type=input.integer,
     defval=12, minval=1, maxval=12, group = "Backtest Range") 
endYear = input(title="End Year", type=input.integer,
     defval=2021, minval=1800, maxval=2100, group = "Backtest Range")
     
inDateRange =  true

//Slow Tenkan Sen Calculation

typicalPriceTS = (high + low + close) / 3
typicalPriceVolumeTS = typicalPriceTS * volume
cumulativeTypicalPriceVolumeTS = sum(typicalPriceVolumeTS, slowtenkansenPeriod)
cumulativeVolumeTS = sum(volume, slowtenkansenPeriod)
slowtenkansenvwapValue = cumulativeTypicalPriceVolumeTS / cumulativeVolumeTS

//Slow Kijun Sen Calculation

typicalPriceKS = (high + low + close) / 3
typicalPriceVolumeKS = typicalPriceKS * volume
cumulativeTypicalPriceVolumeKS = sum(typicalPriceVolumeKS, slowkijunsenPeriod)
cumulativeVolumeKS = sum(volume, slowkijunsenPeriod)
slowkijunsenvwapValue = cumulativeTypicalPriceVolumeKS / cumulativeVolumeKS

//Fast Tenkan Sen Calculation

typicalPriceTF = (high + low + close) / 3
typicalPriceVolumeTF = typicalPriceTF * volume
cumulativeTypicalPriceVolumeTF = sum(typicalPriceVolumeTF, fasttenkansenPeriod)
cumulativeVolumeTF = sum(volume, fasttenkansenPeriod)
fasttenkansenvwapValue = cumulativeTypicalPriceVolumeTF / cumulativeVolumeTF

//Fast Kijun Sen Calculation

typicalPriceKF = (high + low + close) / 3
typicalPriceVolumeKF = typicalPriceKS * volume
cumulativeTypicalPriceVolumeKF = sum(typicalPriceVolumeKF, fastkijunsenPeriod)
cumulativeVolumeKF = sum(volume, fastkijunsenPeriod)
fastkijunsenvwapValue = cumulativeTypicalPriceVolumeKF / cumulativeVolumeKF

//Slow LeadLine Calculation
 
lowesttenkansen_s = lowest(slowtenkansenvwapValue, slowtenkansenPeriod)
highesttenkansen_s = highest(slowtenkansenvwapValue, slowtenkansenPeriod)

lowestkijunsen_s = lowest(slowkijunsenvwapValue, slowkijunsenPeriod)
highestkijunsen_s = highest(slowkijunsenvwapValue, slowkijunsenPeriod)

slowtenkansen = avg(lowesttenkansen_s, highesttenkansen_s)
slowkijunsen = avg(lowestkijunsen_s, highestkijunsen_s)
slowleadLine = avg(slowtenkansen, slowkijunsen)

//Fast LeadLine Calculation
 
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

if(fastleadLine > fastleadLine[1] and slowleadLine > slowleadLine[1] and tsv > 0 and tsv > tsvema and close > upper and inDateRange)
    strategy.entry("BUY", strategy.long)
 
if(fastleadLine < fastleadLine[1] and slowleadLine < slowleadLine[1])
    strategy.close("BUY")

// Plots 

colorsettingS = input(title="Solid Color Slow Leadline", defval=false, type=input.bool)
plot(slowleadLine, title = "Slow LeadLine", color = colorsettingS ? color.aqua : slowleadLine > slowleadLine[1] ? color.green : color.red, linewidth=3)

colorsettingF = input(title="Solid Color Fast Leadline", defval=false, type=input.bool)
plot(fastleadLine, title = "Fast LeadLine", color = colorsettingF ? color.orange : fastleadLine > fastleadLine[1] ? color.green : color.red, linewidth=3)

p1 = plot(upper, "Upper BB", color=#2962FF)
p2 = plot(lower, "Lower BB", color=#2962FF)
fill(p1, p2, title = "Background", color=color.blue)
```

> Detail

https://www.fmz.com/strategy/427527

> Last Modified

2023-09-21 21:32:40
