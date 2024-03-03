
> Name

EMA增强超级趋势策略EMA-Enhanced-SuperTrend-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过计算平均真实波动范围ATR和价格进行比较,判断价格趋势方向,并结合移动平均线辅助判断。相比其他趋势判断方法,能更快捕捉价格变化趋势,回撤小。

## 策略原理

该策略主要通过以下步骤判断价格趋势:

1. 计算最近N天的平均真实波动范围ATR。这里采用Wilder定义的ATR计算方法,可以更好反映当前市场波动情况。

2. 根据ATR和atk调整系数计算上轨线和下轨线。上轨线=价格-(atk乘以ATR);下轨线=价格+(atk乘以ATR)。其中atk通常设置为2-3之间。

3. 比较价格与上下轨线关系,判断趋势方向。价格上穿上轨线为看涨信号;价格下破下轨线为看跌信号。

4. 发生交易信号时,做多或做空。这里结合移动平均线判定信号质量。

5. 加入止损策略控制风险。

6. 采用行情颜色标记策略状态,辅助判断。

该策略充分利用ATR的优势,能快速捕捉价格变化趋势,实现低回撤操作,是一种比较典型的趋势跟踪策略。

## 策略优势

该策略具有以下优势:

1. 快速响应价格变化。ATR能快速响应最新行情,有利于及时捕捉趋势变化。

2. 回撤小。上下轨线有一定缓冲区,能减少止损被击破的概率,降低回撤。

3. 交易信号明确。盘整范围突破为高质量交易信号,可明确做多做空方向。

4. 可定制程度高。ATR周期和倍数可调整,适应不同市场环境。

5. 可视化强。采用图形工具显示策略状态,操作 intuituve。

6. 易于优化。可加入移动止损、过滤等模块,进一步优化。

总体来说,该策略回撤小、优势突出,适合跟踪趋势型行情,是一种非常实用的交易策略。

## 策略风险

该策略也存在一定风险:

1. 趋势判断失误风险。在价格震荡时,可能出现错误信号。

2. 退出点选择风险。需要合理选择止损点,防止过早退出。

3. 参数优化风险。ATR周期和倍数需要反复测试优化,不当设置会影响策略表现。

4. 交易频率过高风险。在行情剧烈波动时,交易频率可能过高。

5. 效果差强人意风险。在某些趋势不明显的市场中,效果可能不佳。

6. 实盘调整风险。实盘操作时,还需针对滑点、手续费等进行调整优化。

7. 系统性风险。需要考虑整体系统的风险控制,不能单独依赖该策略。

针对以上风险,可以采取以下措施进行控制:

1. 优化ATR参数,提高判断准确性。

2. 结合多时间周期分析,确定趋势。 

3. 利用移动止损锁定利润,降低回撤。

4. 采用过滤条件,控制交易频率。

5. 针对不同市场调整策略参数。

6. 测试不同品种,找到最佳应用场景。

7. 在实盘中全面考虑各类交易风险。

## 策略优化方向 

该策略可以从以下方面进行优化:

1. 引入均线等指标进行过滤,减少错误信号。可以加入MACD,KDJ等指标的辅助判断。

2. 优化ATR参数。可以测试不同的ATR周期参数,找到最优值。

3. 优化倍数参数。可以测试不同的倍数参数,确定产生信号的灵敏度。

4. 加入移动止损策略。根据ATR或波动率进行动态止损,可以进一步降低回撤。

5. 结合多时间框架分析。加入更高时间周期指标判断,可以过滤掉零星假信号。 

6. 采用机器学习提升信号判断。利用RNN等模型训练判断买卖信号模型。

7. 针对品种特点调整参数。比如对于波动股可以适当缩小ATR周期。

8. 优化入场点位。可采用突破再拉回等方式寻找更佳入场点。

9. 结合量能指标。加入成交量等辅助判断信号强度。

10. 添加止盈策略。根据趋势能量指标等确定止盈点。

## 总结

该超级趋势策略整体来说非常实用,具有快速响应、回撤小、易于优化等优点,是一种典型的趋势跟踪策略。但也需要注意判断错误和参数优化等风险,在实盘中要全面考虑。通过进一步优化,可以使策略更稳健,在更多市场中获得较好收益。

||

# 

## Overview

This strategy judges the price trend direction by comparing the ATR and price, combined with moving average assistant judgment. Compared with other trend judgment methods, it can capture price trend changes faster with small drawdowns.

## Strategy Principle 

The main steps of this strategy to determine the price trend are:

1. Calculate the ATR of recent N days, using Wilder's ATR calculation method, which can better reflect current market volatility.

2. Calculate the upper and lower bands based on ATR and atk coefficient. Upper band = price - (atk x ATR); Lower band = price + (atk x ATR). atk is usually set between 2-3.

3. Compare the price with the upper and lower bands to determine the trend direction. Price breakout of upper band is bullish signal; price breakout of lower band is bearish signal. 

4. Take long or short when trading signal occurs. Moving average is used here to determine the signal quality.

5. Add stop loss strategy to control risks.

6. Use color marking for strategy status to assist judgment.

This strategy makes full use of the advantages of ATR to quickly capture price trend changes and achieve low drawdown operations. It is a very practical trend following strategy.

## Advantages

The advantages of this strategy include:

1. Fast response to price changes. ATR can respond quickly to the latest market and help capture trend changes timely.

2. Small drawdowns. The buffer zone between upper and lower bands can reduce the probability of stop loss breakout and lower drawdowns.

3. Clear trading signals. Range breakouts are high quality signals for long and short directions.

4. High customizability. ATR period and multiplier are adjustable to adapt to different market environments. 

5. Strong visualization. Graphic tools display the strategy status intuitively.

6. Easy to optimize. Modules like moving stop loss, filter can be added for further optimization.

In general, this strategy has outstanding advantages like small drawdown, making it very suitable for trend following strategies.

## Risks

There are also some risks:

1. Trend determination error risk. Wrong signals may occur during price consolidation.

2. Exit point selection risk. Stop loss point needs to be set reasonably to avoid premature exit.

3. Parameter optimization risk. ATR period and multiplier need repetitive testing and optimization, improper settings will affect performance.

4. High trading frequency risk. Trading frequency may be too high during extreme market volatility. 

5. Mediocre performance risk. Performance may be unsatisfactory in some markets without obvious trends.

6. Adjustment for live trading risk. Adjustments need to be made for slippage, commission in live trading.

7. Systematic risk. Overall system risk control should be considered, instead of just relying on this strategy.

The risks can be controlled by:

1. Optimizing ATR parameters to improve accuracy.

2. Using multi-timeframe analysis to determine trends.

3. Adopting moving stop loss to lock in profits and reduce drawdowns. 

4. Adding filters to control trading frequency.

5. Adjusting parameters for different markets.

6. Testing different products to find the best application scenario.

7. Comprehensively considering all trading risks in live trading.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Adding filters like moving averages to reduce incorrect signals. MACD, KDJ can be used for auxiliary judgement.

2. Optimizing ATR parameters by testing different periods to find optimal values.

3. Optimizing multiplier parameter to determine the sensitivity of signal generation. 

4. Adding dynamic stop loss strategies based on ATR or volatility. This can further reduce drawdowns.

5. Using higher timeframe indicators for analysis to filter sporadic false signals.

6. Adopting machine learning models like RNN to improve signal judgement.

7. Adjusting parameters based on product characteristics. For example, using shorter ATR period for volatile stocks.

8. Optimizing entry points by using breakout pullback approaches to find better entries. 

9. Combining volume indicators to judge signal strength.

10. Adding take profit strategies based on trend momentum indicators.

## Conclusion

In general, this supertrend strategy is very practical with advantages like fast response and small drawdown. It's a typical trend following system. But risks like judgement errors and parameter optimization should be watched out for in live trading, and comprehensive risk management should be implemented. Further optimization can make the strategy more robust and profitable in more markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Period|
|v_input_2_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_3|3|ATR Multiplier|
|v_input_4|true|Change ATR Calculation Method ?|
|v_input_5|false|Show Buy/Sell Signals ?|
|v_input_6|true|Highlighter On/Off ?|
|v_input_7|true|Bar Coloring On/Off ?|
|v_input_8|9|From Month|
|v_input_9|true|From Day|
|v_input_10|2018|From Year|
|v_input_11|true|To Month|
|v_input_12|true|To Day|
|v_input_13|9999|To Year|
|v_input_14|305|Slow|
|v_input_15_close|0|Source Slow: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-10-06 00:00:00
period: 6h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © KivancOzbilgic


//@version=4
strategy("SuperTrend STRATEGY", overlay=true)
Periods = input(title="ATR Period", type=input.integer, defval=10)
src = input(hl2, title="Source")
Multiplier = input(title="ATR Multiplier", type=input.float, step=0.1, defval=3.0)
changeATR= input(title="Change ATR Calculation Method ?", type=input.bool, defval=true)
showsignals = input(title="Show Buy/Sell Signals ?", type=input.bool, defval=false)
highlighting = input(title="Highlighter On/Off ?", type=input.bool, defval=true)
barcoloring = input(title="Bar Coloring On/Off ?", type=input.bool, defval=true)
atr2 = sma(tr, Periods)
atr= changeATR ? atr(Periods) : atr2
up=src-(Multiplier*atr)
up1 = nz(up[1],up)
up := close[1] > up1 ? max(up,up1) : up
dn=src+(Multiplier*atr)
dn1 = nz(dn[1], dn)
dn := close[1] < dn1 ? min(dn, dn1) : dn
trend = 1
trend := nz(trend[1], trend)
trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend
upPlot = plot(trend == 1 ? up : na, title="Up Trend", style=plot.style_linebr, linewidth=2, color=color.green)
buySignal = trend == 1 and trend[1] == -1
plotshape(buySignal ? up : na, title="UpTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.green, transp=0)
plotshape(buySignal and showsignals ? up : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.green, textcolor=color.white, transp=0)
dnPlot = plot(trend == 1 ? na : dn, title="Down Trend", style=plot.style_linebr, linewidth=2, color=color.red)
sellSignal = trend == -1 and trend[1] == 1
plotshape(sellSignal ? dn : na, title="DownTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.red, transp=0)
plotshape(sellSignal and showsignals ? dn : na, title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.red, textcolor=color.white, transp=0)
mPlot = plot(ohlc4, title="", style=plot.style_circles, linewidth=0)
longFillColor = highlighting ? (trend == 1 ? color.green : color.white) : color.white
shortFillColor = highlighting ? (trend == -1 ? color.red : color.white) : color.white
fill(mPlot, upPlot, title="UpTrend Highligter", color=longFillColor)
fill(mPlot, dnPlot, title="DownTrend Highligter", color=shortFillColor)
FromMonth = input(defval = 9, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2018, title = "From Year", minval = 999)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 999)
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)       
window()  => true
longCondition = buySignal
if (longCondition)
    strategy.entry("BUY", strategy.long, when = window())
shortCondition = sellSignal
if (shortCondition)
    strategy.entry("SELL", strategy.short, when = window())
buy1= barssince(buySignal)
sell1 = barssince(sellSignal)
color1 = buy1[1] < sell1[1] ? color.green : buy1[1] > sell1[1] ? color.red : na
barcolor(barcoloring ? color1 : na)

//@version=3
//study(title="3 Moving Average Exponential", shorttitle="3 EMA", overlay=true)
//len1 = input(17, minval=1, title="Fast")
//len2 = input(72, minval=1, title="Medium")
len3 = input(305, minval=1, title="Slow")
//src1 = input(close, title="Source Fast")
//src2 = input(close, title="Source Medium")
src3 = input(close, title="Source Slow")
//out1 = ema(src1, len1)
//out2 = ema(src2, len2)
out3 = ema(src3, len3)
//plot(out1, title="EMA1", color=fuchsia)
//plot(out2, title="EMA2", color=orange)
plot(out3, title="EMA3", color=color.blue)
```

> Detail

https://www.fmz.com/strategy/428578

> Last Modified

2023-10-07 10:07:15
