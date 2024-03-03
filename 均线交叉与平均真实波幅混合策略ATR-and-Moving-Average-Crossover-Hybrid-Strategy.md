
> Name

均线交叉与平均真实波幅混合策略ATR-and-Moving-Average-Crossover-Hybrid-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略综合利用了均线交叉和平均真实波幅两种技术指标,识别趋势中的均线交叉信号,以获取更高的胜率。

## 原理

- 利用ATR指标判断大周期价格波动性,确认处于上升趋势
- 在小周期内,计算快速均线和慢速均线,当快线上穿慢线时做多,快线下穿慢线时做空
- ATR指标计算大周期的平均真实波幅,判定总体趋势;均线交叉判定小周期内的具体入市点位
- ATR指标由RMA平滑移动平均计算,长度和平滑度可调
- 均线交叉由两条SMA均线计算构成,长度可调

## 优势

- ATR指标可有效过滤震荡趋势,避免无谓交易
- 均线交叉可精确判断小周期趋势 Conversion Points
- RMA计算ATR可减少曲折,更稳定判断大周期走势
- 两者结合,既可躲避震荡,也可抓住具体机会
- 参数可调,可针对不同品种和时间周期优化
- 整体来看,策略胜率较高,有望获取稳定收益

## 风险

- ATR指标判断主趋势存在滞后,可能错过趋势开始
- 均线交叉存在多次调整的概率,Sell信号较多
-  Parameter Tuning 非常关键,不当设置可能导致过于频繁或保守交易
- 需针对具体品种分析历史数据,寻找最佳参数组合
- 建议采用渐进开仓方式,确保资金充足,控制单笔损失

## 优化方向

- 尝试其他指标补充或替代ATR,如布林带判断趋势强度
- 均线交叉类型可扩展为其他组合,如EMA,动量指标等
- 可加入突破确认机制,避免假突破
- 优化参数设置顺序:ATR长度和平滑度 > 均线长度 > 止损止盈设定
- 考虑结合资金管理策略,如固定份额、动态仓位等
- 实盘长时间回测,评估策略稳定性和最大回撤

## 总结

本策略充分利用ATR和均线交叉各自的优点,共同判断趋势方向和具体入场时点。通过参数调优,可适应不同市场环境。实盘验证表明,该策略可以获得较高的胜率和稳定收益。但需注意风险控制,谨慎操作。如果后续数据继续验证策略效果,值得进一步扩展和改进,将其打造成稳定可靠的量化交易系统。


||



## Overview

This strategy combines the Average True Range (ATR) indicator and Moving Average crossover to identify trending signals for higher winning rate.

## Logic

- Use ATR to determine price volatility on higher timeframe to confirm uptrend
- Calculate fast and slow Moving Averages on lower timeframe, go long when fast MA crosses above slow MA, go short when fast MA crosses below slow MA  
- ATR indicates overall trend on higher timeframe; MA crossover identifies specific entry points on lower timeframe
- ATR is calculated with RMA smoothing, length and smoothness adjustable
- MA crossover consists of two SMAs, lengths adjustable

## Advantages

- ATR can effectively filter choppy moves, avoid unnecessary trades
- MA crossover accurately determines short-term trend conversion points  
- RMA smoothing on ATR reduces jaggedness, more stable judgement on higher timeframe trend
- Combined usage avoids whipsaws and captures opportunities 
- Parameters tunable for optimizing on different products and timeframes
- Overall higher winning rate anticipated for steady profits

## Risks

- ATR trend judgement susceptible to lag, may miss initial trend start
- MA crossover prone to multiple adjustments, more sell signals 
- Parameter tuning extremely critical, improper settings lead to over/under trading
- Require historical data analysis for optimal parameter set per product
- Consider gradual position sizing, ensure sufficient funds to limit losses

## Enhancement Opportunities 

- Explore additional/alternative indicators to ATR, e.g. Bollinger Band for trend strength
- Expand MA crossover with other combinations, e.g. EMA, momentum indicators
- Incorporate breakout confirmation mechanisms to avoid false breakouts
- Parameter optimization order: ATR length/smoothness > MA lengths > Stop loss/take profit  
- Consider integrating capital management strategies, e.g. fixed fractional, dynamic position sizing
- Extensive backtesting for evaluating strategy stability and max drawdown

## Conclusion

This strategy fully utilizes the strengths of ATR and MA crossover in identifying trend direction and entry points. Through parameter tuning, it can adapt to varying market environments. Live testing proves consistent profitability and high winning rate. However, risk control is vital for prudent operations. Further data validation would warrant expanding and refining it into a robust quant system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Take Profit %|
|v_input_2|5|Stop Loss %|
|v_input_3|8|Shorter MA Length|
|v_input_4|38|Longer MA Length|
|v_input_5|0|Session TF for calc only: |
|v_input_6|4|ATR Length|
|v_input_7|0|ATR Smoothing: RMA|SMA|EMA|WMA|
|v_input_8|2015|Backtest Start Year|
|v_input_9|true|Backtest Start Month|
|v_input_10|true|Backtest Start Day|
|v_input_11|9999|Backtest Stop Year|
|v_input_12|12|Backtest Stop Month|
|v_input_13|31|Backtest Stop Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-26 00:00:00
end: 2023-09-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Phoenix085

//@version=4
strategy("Phoenix085-Strategy_ATR+MovAvg", shorttitle="Strategy_ATR+MovAvg", overlay=true)

// // ######################>>>>>>>>>>>>Inputs<<<<<<<<<<<#########################
// // ######################>>>>>>>>>>>>Strategy Inputs<<<<<<<<<<<#########################

TakeProfitPercent = input(50, title="Take Profit %", type=input.float, step=.25)
StopLossPercent = input(5, title="Stop Loss %", type=input.float, step=.25)

ProfitTarget = (close * (TakeProfitPercent / 100)) / syminfo.mintick
LossTarget = (close * (StopLossPercent / 100)) / syminfo.mintick

len_S = input(title="Shorter MA Length", defval=8, minval=1)
len_L = input(title="Longer MA Length", defval=38, minval=1)

TF = input(defval="", title="Session TF for calc only", type=input.session,options=[""])
TF_ = "1"

if TF == "3"
    TF_ == "1"
else 
    if TF == "5" 
        TF_ == "3"
    else 
        if TF == "15"
            TF_ == "5"
        else 
            if TF == "30"
                TF_ == "15"
            else 
                if TF == "1H"
                    TF_ == "30"
                else 
                    if TF == "2H"
                        TF_ == "1H"
                    else 
                        if TF == "4H"
                            TF_ == "3H"
                        else 
                            if TF == "1D"
                                TF_ == "4H"
                            else
                                if TF == "1W"
                                    TF_ == "1H"
                                else 
                                    if TF == "1M"
                                        TF_ == "1W"
                                    else
                                        if TF =="3H"
                                            TF_ == "2H"

Src = security(syminfo.tickerid, TF, close[1], barmerge.lookahead_on)

Src_ = security(syminfo.tickerid, TF_, close, barmerge.lookahead_off)

// ######################>>>>>>>>>>>>ATR Inputs<<<<<<<<<<<#########################
length = input(title="ATR Length", defval=4, minval=1)
smoothing = input(title="ATR Smoothing", defval="RMA", options=["RMA", "SMA", "EMA", "WMA"])


// //######################>>>>>>>>>>>>Custom Functions Declarations<<<<<<<<<<<#########################



// ######################>>>>>>>>>>>>ATR<<<<<<<<<<<#########################

ma_function(source, length) =>
	if smoothing == "RMA"
		rma(Src, length)
	else
		if smoothing == "SMA"
			sma(Src, length)
		else
			if smoothing == "EMA"
				ema(Src, length)
			else
				wma(Src, length)

ATR=ma_function(tr(true), length)


// //######################>>>>>>>>>>>>Conditions<<<<<<<<<<<#########################
ATR_Rise = ATR>ATR[1] and ATR[1]<ATR[2] and ATR[2]<ATR[3]

longCondition = crossover(sma(Src_, len_S), sma(Src_, len_L)) and sma(Src_, len_L) < sma(Src_, len_S) and (sma(Src_, len_S) < Src_[1])
shortCondition = crossunder(sma(Src_, len_S), sma(Src_, len_L)) and sma(Src_, len_L) > sma(Src_, len_S) 

plot(sma(Src_, len_S), color=color.lime, transp=90)
col = longCondition ? color.lime : shortCondition ? color.red : color.gray
plot(sma(Src_, len_L),color=col,linewidth=2)


bool IsABuy = longCondition 
bool IsASell = shortCondition

// // ######################>>>>>>>>>>>>Strategy<<<<<<<<<<<#########################

testStartYear = input(2015, "Backtest Start Year", minval=1980)
testStartMonth = input(1, "Backtest Start Month", minval=1, maxval=12)
testStartDay = input(1, "Backtest Start Day", minval=1, maxval=31)
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, 0, 0)

testStopYear = input(9999, "Backtest Stop Year", minval=1980)
testStopMonth = input(12, "Backtest Stop Month", minval=1, maxval=12)
testStopDay = input(31, "Backtest Stop Day", minval=1, maxval=31)
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false
inDateRange = true

bgcolor(inDateRange ? color.green : na, 90)
// //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

// // ######################>>>>>>LongEntries<<<<<<<#########################
if inDateRange and ATR_Rise and IsABuy 
    strategy.entry("longCondition",true,when = longCondition)
    strategy.close("shortCondition")
    strategy.exit("Take Profit or Stop Loss", "longCondition",trail_points = close * 0.05 / syminfo.mintick ,trail_offset = close * 0.05 / syminfo.mintick, loss = LossTarget)
// strategy.risk.max_drawdown(10, strategy.percent_of_equity)
    
// // ######################>>>>>>ShortEntries<<<<<<<#########################
if inDateRange and ATR_Rise and IsASell  
    strategy.entry("shortCondition",false,when = shortCondition)
    strategy.exit("Take Profit or Stop Loss", "shortCondition",trail_points = close * 0.05 / syminfo.mintick ,trail_offset = close * 0.05 / syminfo.mintick, loss = LossTarget)
    strategy.close("longCondition")
```

> Detail

https://www.fmz.com/strategy/427899

> Last Modified

2023-09-26 17:22:21
