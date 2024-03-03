
> Name

多Bar同向策略Multi-Bar-Direction-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1867ec6139578f637e0.png)

[trans]

## 概述

多Bar同向策略通过统计多个Bar的走势概率,识别趋势出现的信号,在出现反转信号时进行反向交易。该策略主要应用于中短线交易。

## 策略原理

该策略首先设置起始统计时间和结束统计时间,用于提取历史数据。然后设置交易时间,用于识别符合条件的K线。策略统计从2根K线到7根K线内出现同向上涨或下跌的概率。如果上涨或下跌达到一定比例阈值,则产生交易信号。

例如,策略统计3根K线内出现下跌的概率,如果下跌概率低于50%,则当前3根K线符合条件,产生看涨信号。策略允许设置2根到7根K线的统计参数。

具体来说,策略逻辑如下:

1. 设置回测时间范围,包括开始日期、结束日期、交易时间范围。

2. 统计2根到7根K线内同向上涨或下跌的数量。

3. 计算相邻K线数量上涨或下跌继续的概率。

4. 如果概率低于50%,则认为目前K线符合反转信号形态。

5. 在交易时间范围内,产生看涨或看跌信号。

6. 进行回测,验证策略效果。

## 策略优势

- 通过统计多根K线概率,避免因单一K线产生错误信号
- 可自定义K线数量,识别不同时间段内的反转信号
- 设置明确的交易时间范围,避免非交易时间产生信号
- 直观显示每段K线数量的统计结果,便于判断效果
- 可优化的参数较多,适合针对不同市场进行优化

## 策略风险

- 统计的K线数量并不能完全确定趋势反转点,存在一定误判概率
- 需要较长的统计时间段,可能错过短线的交易机会
- 静态阈值容易受到市场变化的影响,需要动态调整
- 回测时间范围的选择会影响结果,需要防止过拟合

可以通过以下方法降低风险:

1. 优化K线数量的参数,针对不同周期使用不同数量
2. 结合其他指标 validated_hvgggjhjj tjgtdfnjnjhggvft
3. 使用动态阈值,考虑市场波动的影响
4. 扩大回测时间范围,进行多次回测验证

## 策略优化方向

该策略可以从以下方面进行优化:

1. 优化K线数量。可以测试从2根到10根不同参数,选择最优参数。

2. 优化反转阈值。可以测试40%到60%不同参数,考虑到市场变化。

3. 增加止损策略。可以在形成信号后设置止损点,控制风险。

4. 结合其他指标。例如可以结合RSI等指标验证反转信号。

5. 增加期货、外汇等不同品种。针对不同交易品种参数进行测试。

6. 进行步进优化。逐步调整参数,找到最优参数组合。

7. 增加机器学习模型。使用算法自动寻找最优参数。

## 总结

多Bar同向策略通过统计分析多根K线的概率来识别潜在的反转信号,实现了较为准确的信号处理。但策略效果与参数选择有关,需要进行充分优化。此外,反转信号本身存在一定误判可能,需要结合其他因素进行验证。总体来说,该策略为一种简单有效的统计策略,值得进一步研究与优化。

||


## Overview

The Multi-Bar Direction strategy identifies trend reversal signals by calculating the probability of multiple bars moving in the same direction. It is mainly used for medium-term trading.

## Strategy Logic

The strategy first sets the start and end time for historical data extraction. The trading hours are configured to identify qualified candlesticks. It calculates the probability of consecutive ups or downs within 2 to 7 candlesticks. Trading signals are generated when the up or down ratio exceeds a threshold. 

For example, if the probability of downtrend in 3 candlesticks is lower than 50%, the current 3 candlesticks meet the condition and a buy signal is generated. The parameters from 2 to 7 bars can be configured.

The specific logic is as follows:

1. Set backtest time range, including start date, end date, trading hours.

2. Count the number of same direction ups or downs within 2 to 7 candlesticks.

3. Calculate the probability of continuation of up or down between adjacent candlesticks. 

4. If the probability is lower than 50%, the current candlesticks match the reversal pattern.

5. Generate buy or sell signals within trading hours. 

6. Backtest to validate the strategy.

## Advantages

- Avoid false signals by considering multiple candlesticks probabilities.

- Customizable bar count to identify reversal signals across different timeframes.

- Clear trading hours avoid untimely signals.

- Intuitive statistics display for performance evaluation.

- Many optimizable parameters suitable for different markets.

## Risks

- Bar count cannot fully determine trend reversal points. There are misjudgements.

- Long statistics duration may miss short-term trading opportunities. 

- Static threshold is impacted by market volatility. Dynamic adjustment is needed.

- Backtest period selection may cause overfitting.

Possible solutions:

1. Optimize bar count for different timeframes.

2. Incorporate other indicators.  

3. Adopt dynamic thresholds based on market volatility.

4. Expand backtest period and run multiple backtests.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize bar count from 2 to 10 and select the optimal parameter.

2. Test reversal threshold from 40% to 60% considering market changes.

3. Add stop loss after signal generation to limit risk.

4. Incorporate other indicators like RSI to validate signals.

5. Add more products like futures and forex for parameter testing.

6. Incremental parameter tuning to find optimal combinations.

7. Apply machine learning models to find optimal parameters automatically.

## Conclusion

The Multi-Bar Direction strategy identifies potential reversal signals by statistically analyzing candlestick probabilities. But the performance depends on parameter tuning based on sufficient optimizations. In addition, reversal signals have misjudgement risks and need validation. Overall, this is a simple and effective statistical strategy worthwhile for further research and optimization.

[/trans]


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|=== Periods Counting ===|
|v_input_2|true|From Day|
|v_input_3|true|From Month|
|v_input_4|2020|From Year|
|v_input_5|true|To Day|
|v_input_6|true|To Month|
|v_input_7|9999|To Year|
|v_input_8|true|=== Trading Time ===|
|v_input_9|7|Time Zone|
|v_input_10|5|From Hour|
|v_input_11|false|From Minute|
|v_input_12|4|To Hour|
|v_input_13|59|To Minute|
|v_input_14|true|Highlight Tradingtime|
|v_input_15|true|=== Date Backtesting ===|
|v_input_16|true|From Day|
|v_input_17|true|From Month|
|v_input_18|2020|From Year|
|v_input_19|true|To Day|
|v_input_20|true|To Month|
|v_input_21|9999|To Year|
|v_input_22|true|=== Setup Options ===|
|v_input_23|true|Reversal after 2 bars same direction|
|v_input_24|true|Reversal after 3 bars same direction|
|v_input_25|true|Reversal after 4 bars same direction|
|v_input_26|true|Reversal after 5 bars same direction|
|v_input_27|true|Reversal after 6 bars same direction|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-16 00:00:00
end: 2023-10-17 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// BO - Bar's direction Signal - Backtesting
//anch.v43
// © inno14
//@version=4

strategy("BO - Bar's direction Signal - Backtesting", pyramiding=15)
// === INPUT PERIOD OF TIME ===
Date   = input(true, title = "=== Periods Counting ===")
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromYear  = input(defval = 2020, title = "From Year", minval = 2017)

ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToYear    = input(defval = 9999, title = "To Year", minval = 2017)

// === DATE RANGE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false // create function "within window of time"

// === Trading Time ===
CTimeDvM   = input(true, title = "=== Trading Time ===")
Time_zone = input(7,title="Time Zone")
FromHourDvM   = input(defval = 05, title = "From Hour", minval = 00, maxval = 23)
FromMinuteDvM = input(defval = 00, title = "From Minute", minval = 00, maxval = 59)
ToHourDvM   = input(defval = 04, title = "To Hour", minval = 00, maxval = 23)
ToMinuteDvM = input(defval = 59, title = "To Minute", minval = 00, maxval = 59)

GMT_FHDvM=FromHourDvM<Time_zone?FromHourDvM-Time_zone+24:FromHourDvM-Time_zone
GMT_THDvM=ToHourDvM<Time_zone?ToHourDvM-Time_zone+24:ToHourDvM-Time_zone
fhDvM= (GMT_FHDvM<10?"0"+tostring(GMT_FHDvM):tostring(GMT_FHDvM))
fmDvM= (FromMinuteDvM<10?"0"+tostring(FromMinuteDvM):tostring(FromMinuteDvM))
thDvM= (GMT_THDvM<10?"0"+tostring(GMT_THDvM):tostring(GMT_THDvM))
tmDvM= (ToMinuteDvM<10?"0"+tostring(ToMinuteDvM):tostring(ToMinuteDvM))
WorkingHourDvM = fhDvM+fmDvM+"-"+thDvM+tmDvM
t0_DvM = time(timeframe.period, WorkingHourDvM)
htrtime = input(true,title="Highlight Tradingtime")
bgcolor(htrtime? t0_DvM? color.gray : na:na, title="Trading Time", transp=90)

// === Date Backtesting ===
Date1   = input(true, title = "=== Date Backtesting ===")
FromDay1   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromMonth1 = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromYear1  = input(defval = 2020, title = "From Year", minval = 2017)

ToDay1     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToMonth1   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToYear1    = input(defval = 9999, title = "To Year", minval = 2017)

// === DATE RANGE ===
start1     = timestamp(FromYear1, FromMonth1, FromDay1, 00, 00)  // backtest start window
finish1    = timestamp(ToYear1, ToMonth1, ToDay1, 23, 59)        // backtest finish window
window1()  => time >= start1 and time <= finish1 ? true : false // create function "within window of time"

// === Setup ===
Setup   = input(true, title = "=== Setup Options ===")
set1 = input(true, title = "Reversal after 2 bars same direction")
set2 = input(true, title = "Reversal after 3 bars same direction")
set3 = input(true, title = "Reversal after 4 bars same direction")
set4 = input(true, title = "Reversal after 5 bars same direction")
set5 = input(true, title = "Reversal after 6 bars same direction")


// Calculate hours, minutes, and seconds till close
timeLeft = barstate.isrealtime ?
     (time_close - timenow) / 1000 :
     na

minutesLeft = floor((timeLeft % 3600) / 60)
secondsLeft = timeLeft % 60
// truncate() truncates a given number
// to a certain number of decimals
truncate(number, decimals) =>
    factor = pow(10, decimals)
    int(number * factor) / factor
//count 2
redv2=window()?1:0
bluev2=window()?1:0
mchange2 = close[0]<open[0] and close[1]<open[1] and t0_DvM?-1:0
pchange2 = close[0]>open[0] and close[1]>open[1] and t0_DvM?1:0
blue2 = cum(pchange2 > 0 ? bluev2 : 0 * bluev2)
red2 = cum(mchange2 < 0 ? redv2 : 0 * redv2)

//count 3
redv3=window()?1:0
bluev3=window()?1:0
mchange3 = close[0]<open[0] and close[1]<open[1] and close[2]<open[2] and t0_DvM?-1:0
pchange3 = close[0]>open[0] and close[1]>open[1] and close[2]>open[2] and t0_DvM?1:0
blue3 = cum(pchange3 > 0 ? bluev3 : 0 * bluev3)
red3 = cum(mchange3 < 0 ? redv3 : 0 * redv3)

//count 4
redv4=window()?1:0
bluev4=window()?1:0
mchange4 = close[0]<open[0] and close[1]<open[1] and close[2]<open[2] and close[3]<open[3] and t0_DvM?-1:0
pchange4 = close[0]>open[0] and close[1]>open[1] and close[2]>open[2] and close[3]>open[3] and t0_DvM?1:0
blue4 = cum(pchange4 > 0 ? bluev4 : 0 * bluev4)
red4 = cum(mchange4 < 0 ? redv4 : 0 * redv4)

//count 5
redv5=window()?1:0
bluev5=window()?1:0
mchange5 = close[0]<open[0] and close[1]<open[1] and close[2]<open[2] and close[3]<open[3] and close[4]<open[4] and t0_DvM?-1:0
pchange5 = close[0]>open[0] and close[1]>open[1] and close[2]>open[2] and close[3]>open[3] and close[4]>open[4] and t0_DvM?1:0
blue5 = cum(pchange5 > 0 ? bluev5 : 0 * bluev5)
red5 = cum(mchange5 < 0 ? redv5 : 0 * redv5)

//count 6
redv6=window()?1:0
bluev6=window()?1:0
mchange6 = close[0]<open[0] and close[1]<open[1] and close[2]<open[2] and close[3]<open[3] and close[4]<open[4] and close[5]<open[5] and t0_DvM?-1:0
pchange6 = close[0]>open[0] and close[1]>open[1] and close[2]>open[2] and close[3]>open[3] and close[4]>open[4] and close[5]>open[5] and t0_DvM?1:0
blue6 = cum(pchange6 > 0 ? bluev6 : 0 * bluev6)
red6 = cum(mchange6 < 0 ? redv6 : 0 * redv6)

//count 7
redv7=window()?1:0
bluev7=window()?1:0
mchange7 = close[0]<open[0] and close[1]<open[1] and close[2]<open[2] and close[3]<open[3] and close[4]<open[4] and close[5]<open[5] and close[6]<open[6] and t0_DvM?-1:0
pchange7 = close[0]>open[0] and close[1]>open[1] and close[2]>open[2] and close[3]>open[3] and close[4]>open[4] and close[5]>open[5] and close[6]>open[6] and t0_DvM?1:0
blue7 = cum(pchange7 > 0 ? bluev7 : 0 * bluev7)
red7 = cum(mchange7 < 0 ? redv7 : 0 * redv7)

//Percent 3rd bar has same direction
pred3=(red3/red2)*100
pblue3=(blue3/blue2)*100

//2->3
p23_blue_xloc=0
p23_red_xloc=2
p23_lable_xloc=round((p23_blue_xloc+p23_red_xloc)/2)
p23_label_yloc=1.0*100
blue2_100=100
red2_100=100

plot(blue2_100, style=plot.style_columns, offset=p23_blue_xloc, color=color.blue, transp=60, show_last=1)
plot(red2_100, style=plot.style_columns, offset=-p23_red_xloc, color=color.red, transp=60, show_last=1)
plot(pblue3, style=plot.style_columns, offset=p23_blue_xloc, color=color.blue, transp=40, show_last=1)
plot(pred3, style=plot.style_columns, offset=-p23_red_xloc, color=color.red, transp=40, show_last=1)
// label_pred_23=label.new(bar_index[p23_red_xloc],pred3,style=label.style_none,text=tostring(truncate(pred3,2))+"%")
// label.delete(label_pred_23[1])
//label_2dn=label.new(bar_index[p23_red_xloc],red2,style=label.style_none,text="2 bars downward: "+tostring(red2))
//label.delete(label_2dn[1])
// label_pblue_23=label.new(bar_index[p23_blue_xloc],pblue3,style=label.style_none,text=tostring(truncate(pblue3,2))+"%")
// label.delete(label_pblue_23[1])
//label_2up=label.new(bar_index[p23_blue_xloc],blue2,style=label.style_none,text="2 bars upward: "+tostring(blue2))
//label.delete(label_2up[1])
// label_23=label.new(bar_index[p23_lable_xloc],p23_label_yloc,style=label.style_labeldown,text="3 bars same direction", color=color.orange)
// label.delete(label_23[1])

//Percent 4th bar has same direction
pred4=(red4/red3)*100
pblue4=(blue4/blue3)*100

//3->4
p34_blue_xloc=4
p34_red_xloc=6
p34_lable_xloc=round((p34_blue_xloc+p34_red_xloc)/2)
p34_label_yloc=1.0*100
blue3_100=100
red3_100=100

plot(blue3_100, style=plot.style_columns, offset=-p34_blue_xloc, color=color.blue, transp=60, show_last=1)
plot(red3_100, style=plot.style_columns, offset=-p34_red_xloc, color=color.red, transp=60, show_last=1)
plot(pblue4, style=plot.style_columns, offset=-p34_blue_xloc, color=color.blue, transp=40, show_last=1)
plot(pred4, style=plot.style_columns, offset=-p34_red_xloc, color=color.red, transp=40, show_last=1)
// label_pred_34=label.new(bar_index[p34_red_xloc],pred4,style=label.style_none,text=tostring(truncate(pred4,2))+"%")
// label.delete(label_pred_34[1])
// //label_3dn=label.new(bar_index[p34_red_xloc],red3,style=label.style_none,text="3 bars downward: "+tostring(red3))
// //label.delete(label_3dn[1])
// label_pblue_34=label.new(bar_index[p34_blue_xloc],pblue4,style=label.style_none,text=tostring(truncate(pblue4,2))+"%")
// label.delete(label_pblue_34[1])
// //label_3up=label.new(bar_index[p34_blue_xloc],blue3,style=label.style_none,text="3 bars upward: "+tostring(blue3))
// //label.delete(label_3up[1])
// label_34=label.new(bar_index[p34_lable_xloc],p34_label_yloc,style=label.style_labeldown,text="4 bars same direction", color=color.orange)
// label.delete(label_34[1])

//Percent 5th bar has same direction
pred5=(red5/red4)*100
pblue5=(blue5/blue4)*100

//4->5
p45_blue_xloc=8
p45_red_xloc=10
p45_lable_xloc=round((p45_blue_xloc+p45_red_xloc)/2)
p45_label_yloc=1.0*100
blue4_100=100
red4_100=100

plot(blue4_100, style=plot.style_columns, offset=-p45_blue_xloc, color=color.blue, transp=60, show_last=1)
plot(red4_100, style=plot.style_columns, offset=-p45_red_xloc, color=color.red, transp=60, show_last=1)
plot(pblue5, style=plot.style_columns, offset=-p45_blue_xloc, color=color.blue, transp=40, show_last=1)
plot(pred5, style=plot.style_columns, offset=-p45_red_xloc, color=color.red, transp=40, show_last=1)
// label_pred_45=label.new(bar_index[p45_red_xloc],pred5,style=label.style_none,text=tostring(truncate(pred5,2))+"%")
// label.delete(label_pred_45[1])
// //label_4dn=label.new(bar_index[p45_red_xloc],red4,style=label.style_none,text="4 bars downward: "+tostring(red4))
// //label.delete(label_4dn[1])
// label_pblue_45=label.new(bar_index[p45_blue_xloc],pblue5,style=label.style_none,text=tostring(truncate(pblue5,2))+"%")
// label.delete(label_pblue_45[1])
// //label_4up=label.new(bar_index[p45_blue_xloc],blue4,style=label.style_none,text="4 bars upward: "+tostring(blue4))
// //label.delete(label_4up[1])
// label_45=label.new(bar_index[p45_lable_xloc],p45_label_yloc,style=label.style_labeldown,text="5 bars same direction", color=color.orange)
// label.delete(label_45[1])

//Percent 6th bar has same direction
pred6=(red6/red5)*100
pblue6=(blue6/blue5)*100

//5->6
p56_blue_xloc=12
p56_red_xloc=14
p56_lable_xloc=round((p56_blue_xloc+p56_red_xloc)/2)
p56_label_yloc=1.0*100
blue5_100=100
red5_100=100

plot(blue5_100, style=plot.style_columns, offset=-p56_blue_xloc, color=color.blue, transp=60, show_last=1)
plot(red5_100, style=plot.style_columns, offset=-p56_red_xloc, color=color.red, transp=60, show_last=1)
plot(pblue6, style=plot.style_columns, offset=-p56_blue_xloc, color=color.blue, transp=40, show_last=1)
plot(pred6, style=plot.style_columns, offset=-p56_red_xloc, color=color.red, transp=40, show_last=1)
// label_pred_56=label.new(bar_index[p56_red_xloc],pred6,style=label.style_none,text=tostring(truncate(pred6,2))+"%")
// label.delete(label_pred_56[1])
// //label_5dn=label.new(bar_index[p56_red_xloc],red5,style=label.style_none,text="5 bars downward: "+tostring(red5))
// //label.delete(label_5dn[1])
// label_pblue_56=label.new(bar_index[p56_blue_xloc],pblue6,style=label.style_none,text=tostring(truncate(pblue6,2))+"%")
// label.delete(label_pblue_56[1])
// //label_5up=label.new(bar_index[p56_blue_xloc],blue5,style=label.style_none,text="5 bars upward: "+tostring(blue5))
// //label.delete(label_5up[1])
// label_56=label.new(bar_index[p56_lable_xloc],p56_label_yloc,style=label.style_labeldown,text="6 bars same direction", color=color.orange)
// label.delete(label_56[1])

//Percent 7th bar has same direction
pred7=(red7/red6)*100
pblue7=(blue7/blue6)*100

//6->7
p67_blue_xloc=16
p67_red_xloc=18
p67_lable_xloc=round((p67_blue_xloc+p67_red_xloc)/2)
p67_label_yloc=1.0*100
blue6_100=100
red6_100=100

plot(blue6_100, style=plot.style_columns, offset=-p67_blue_xloc, color=color.blue, transp=60, show_last=1)
plot(red6_100, style=plot.style_columns, offset=-p67_red_xloc, color=color.red, transp=60, show_last=1)
plot(pblue7, style=plot.style_columns, offset=-p67_blue_xloc, color=color.blue, transp=40, show_last=1)
plot(pred7, style=plot.style_columns, offset=-p67_red_xloc, color=color.red, transp=40, show_last=1)
// label_pred_67=label.new(bar_index[p67_red_xloc],pred7,style=label.style_none,text=tostring(truncate(pred7,2))+"%")
// label.delete(label_pred_67[1])
// //label_6dn=label.new(bar_index[p67_red_xloc],red6,style=label.style_none,text="6 bars downward: "+tostring(red6))
// //label.delete(label_6dn[1])
// label_pblue_67=label.new(bar_index[p67_blue_xloc],pblue7,style=label.style_none,text=tostring(truncate(pblue7,2))+"%")
// label.delete(label_pblue_67[1])
// //label_6up=label.new(bar_index[p67_blue_xloc],blue6,style=label.style_none,text="6 bars upward: "+tostring(blue6))
// //label.delete(label_6up[1])
// label_67=label.new(bar_index[p67_lable_xloc],p67_label_yloc,style=label.style_labeldown,text="7 bars same direction", color=color.orange)
// label.delete(label_67[1])

//Plot Time Label
time_label_yloc=1.4*100
time_lable_xloc=round((p67_red_xloc+p23_blue_xloc)/2)
time_label_text="Bar's Direction Info From: "+tostring(FromDay)+"/"+tostring(FromMonth)+"/"+tostring(FromYear)+" To: "+tostring(ToDay)+"/"+tostring(ToMonth)+"/"+tostring(ToYear)
// label_time=label.new(bar_index[time_lable_xloc],time_label_yloc,style=label.style_none,text=time_label_text, color=color.aqua)
// label.delete(label_time[1])

//Signal
//Put signal
x1=
       pblue3<50?blue2[0]>blue2[1] and blue3[0]==blue3[1]:false
x2=
       pblue4<50?blue3[0]>blue3[1] and blue4[0]==blue4[1]:false
x3=
       pblue5<50?blue4[0]>blue4[1] and blue5[0]==blue5[1]:false
x4=
       pblue6<50?blue5[0]>blue5[1] and blue6[0]==blue6[1]:false
x5=
       pblue7<50?blue6[0]>blue6[1] and blue7[0]==blue7[1]:false

//Call signal
y1=
       pred3<50?red2[0]>red2[1] and red3[0]==red3[1]:false
y2=
       pred4<50?red3[0]>red3[1] and red4[0]==red4[1]:false
y3=
       pred5<50?red4[0]>red4[1] and red5[0]==red5[1]:false
y4=
       pred6<50?red5[0]>red5[1] and red6[0]==red6[1]:false
y5=
       pred7<50?red6[0]>red6[1] and red7[0]==red7[1]:false

//Function
xTech=
       set1?x1:false
       or set2?x2:false
       or set3?x3:false
       or set4?x4:false
       or set5?x5:false
       

yTech=
       set1?y1:false
       or set2?y2:false
       or set3?y3:false
       or set4?y4:false
       or set5?y5:false
       

//Plot Analyzing Signals
hline1=hline(-100)
hline2=hline(-1.6*100)
hline0=hline(0)
sigtext=xTech?"Put signal":yTech?"Call signal":"Analyzing Signals - Bar's Time left:"+tostring(minutesLeft)+":"+tostring(secondsLeft)
sig_col=xTech?color.new(color.red,0):yTech?color.new(color.blue,0):color.new(color.navy,0)
// label_sig_text = label.new(bar_index[0], -1.5*100, text=sigtext, style=label.style_none, textcolor=sig_col, size=size.large)
// label.delete(label_sig_text[1])

//plot Signal

putcol = xTech? color.red : na
callcol = yTech? color.blue : na
PutSignal= xTech and window1() and t0_DvM?-100:na
CallSignal= yTech and window1() and t0_DvM?-100:na

plot(PutSignal, title='Put Signal', style=plot.style_columns, color=color.red, offset=1, transp=0)
plot(CallSignal, title='Call Signal', style=plot.style_columns, color=color.blue, offset=1, transp=0)
plotshape(PutSignal, title='Put', text="Put", style=shape.labeldown, location=location.bottom, color=color.orange, textcolor=color.black, offset=1, transp=0)
plotshape(CallSignal, title='Call', text="Call", style=shape.labelup, location=location.bottom, color=color.orange, textcolor=color.black, offset=1, transp=0)

//Backtesting
strategy.entry("Call", strategy.long, when=yTech and window1() and t0_DvM)
strategy.entry("Put", strategy.short, when=xTech and window1() and t0_DvM)
strategy.close_all(when=barstate.isnew)
//EOF
```

> Detail

https://www.fmz.com/strategy/429575

> Last Modified

2023-10-18 12:20:59
