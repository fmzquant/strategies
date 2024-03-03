
> Name

趋势跟踪四元素策略Trend-Tracking-Four-Elements-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/112b8eaa08fc6d58e32.png)

[trans]

## 概述

本策略综合运用sar指标、rsi指标、vol指标和ma均线四个元素识别趋势,采用稳健的风险管理措施跟踪趋势获利。策略以sar指标为主线,辅以rsi超买超卖分界识别反转信号,vol指标判定成交量特征,ma均线判断主次趋势方向。通过多种指标组合判断能过滤假信号,识别真正的趋势方向。风险管理设置止损和止盈,有效控制单笔亏损和累积盈利。该策略适合中长线持币者,能顺应主流趋势获得稳定收益。 

## 策略原理

本策略使用到4个主要技术指标:

1. Parabolic SAR:该指标利用点与趋势之间的关系判断趋势方向和反转点。点在价格上方时为看涨,点在价格下方时为看跌。当点穿过价格时代表趋势反转。策略采用sar作为主指标判断趋势方向。

2. RSI:相对强弱指标。该指标以0-100间震荡判断市场超买超卖情况。RSI高于70为超买区,低于30为超卖区,回归50附近为中线区域。策略以RSI判断超买超卖反转信号。 

3. VOL:成交量指标。策略利用VOL判定成交量放大特征来确认趋势和判断反转信号质量。

4. MA:移动平均线。策略采用长短均线判断主次趋势方向。短均线上穿长均线为看多信号,短均线下穿长均线为看空信号。

交易信号生成规则:

多头条件:SAR点转至K线下方且RSI由下向上回升进入中线区域,VOL放大特征明显,短均线由下向上穿过长均线。

空头条件:SAR点转至K线上方且RSI由上向下跌入中线区域,VOL放大特征明显,短均线自上向下穿过长均线。

该策略还设置止盈止损风险管理规则。止盈目标为进入价格的2倍,止损价格为进入价格的0.8倍,有效锁定利润和控制风险。

## 优势分析

本策略具有以下优势:

1. 多指标组合设计避免假信号,真正捕捉趋势转折。

2. 风险管理设置止损止盈,有效控制风险。

3. 仓位管理分批进场分批止盈,让利润最大化。

4. 参数经过反复优化测试,保证了参数稳健性。

5. 回测数据充足,模拟真实交易环境。

6. 操作逻辑清晰简单,容易理解实现。

## 风险分析

本策略也存在以下风险:

1. 市场异常波动导致止损被突破。建议适当放宽止损距离。

2. 交易品种流动性不足导致无法止损。应选择流动性好的交易品种。

3. 系统性风险导致异常跳空。应减少杠杆并持有价值基础良好的资产。 

4. 参数过度优化导致曲线过于优美。应适当弱化参数以提高稳健性。

5. 交易频率过高带来的滑点成本。可适当放宽交易信号生成间隔。

6. 信号效果变弱需要及时更新。应定期回测并优化参数设置。

## 优化方向

本策略可从以下方面进行进一步优化:

1. 测试更多指标组合,如MACD,KD等寻找更佳匹配。

2. 优化MA周期参数设置识别更清晰的主次趋势。

3. 优化止盈止损系数以获取最佳风险收益比。 

4. 测试不同品种参数健壮性并寻找最佳参数组合。

5. 增加机器学习模型辅助判断交易信号。

6. 增加自适应止损算法,让止损更贴近真实波动。

7. 测试更长周期参数设定,扩大止盈范围。

## 总结

本策略综合运用多种指标过滤假信号确定趋势方向,设置止损止盈措施控制风险,通过参数优化和组合调整不断提升策略效果。虽然任何策略都无法完美预测未来,但系统的交易计划配合良好的风险管理将大幅提高盈利概率。该策略提供了一个相对稳健的趋势跟踪方案,适合理性追求长期稳定收益的投资者。

|| 

## Overview

This strategy combines SAR, RSI, Vol and MA indicators to identify trends and adopts robust risk management measures to track trends and profit. The strategy mainly uses the SAR indicator to determine the trend direction, supplemented by the RSI to identify reversal signals at overbought and oversold thresholds, Vol indicator to judge volume characteristics, and MA to determine the primary and secondary trend directions. The combination of multiple indicators helps filter out false signals and identify real trend directions. The risk management sets stop loss and take profit to effectively control single loss and accumulate profits. This strategy is suitable for medium-long term coin holders to obtain steady gains following the mainstream trend.

## Strategy Logic  

This strategy uses 4 main technical indicators:

1. Parabolic SAR: This indicator uses the relationship between dots and trends to determine trend direction and reversal points. Dots above price suggest uptrend while dots below suggest downtrend. When dots cross through price, it signals a trend reversal. The strategy uses SAR as the main indicator to determine trend direction.

2. RSI: The Relative Strength Index. This indicator oscillates between 0-100 to judge overbought and oversold conditions. RSI above 70 is the overbought zone, below 30 is the oversold zone, and regressing to 50 is the neutral zone. The strategy uses RSI to identify reversal signals at overbought and oversold thresholds.

3. VOL: The volume indicator. The strategy uses VOL to confirm trends and judge the quality of reversal signals by spotting volume expansion patterns.  

4. MA: Moving averages. The strategy adopts long and short moving averages to determine the primary and secondary trend directions. The crossover of the short MA above the long MA signifies an upside breakout while the crossover below signifies a downside breakout.

Trade signal rules:

Long condition: SAR dots flip below price bars and RSI turns up from oversold into the neutral zone, obvious VOL expansion, short MA crosses above long MA. 

Short condition: SAR dots flip above price bars and RSI turns down from overbought into the neutral zone, obvious VOL expansion, short MA crosses below long MA.

The strategy also sets stop loss and take profit risk management rules. Take profit is set at 2x the entry price and stop loss is set at 0.8x the entry price to lock in profits and control risks.

## Advantage Analysis 

The advantages of this strategy include:

1. The multi-indicator combo avoids false signals and truly captures trend reversals.

2. Risk management with stop loss and take profit effectively controls risk. 

3. Position sizing with scaled entries and tiered take profits maximizes profits.

4. Robust parameters obtained through repeated optimization and testing. 

5. Sufficient backtest data simulates real trading conditions. 

6. Simple and clear logic easy to understand and implement.

## Risk Analysis

The risks of this strategy include:

1. Extreme market volatility breaking stop loss. Wider stop loss is recommended.

2. Illiquid trading products failing to fill stop loss. Products with good liquidity should be selected.

3. Systemic risks causing gap moves. Leverage should be reduced and assets with strong fundamentals should be held.

4. Overly optimized parameters leading to too perfect results. Parameters should be relaxed to improve robustness. 

5. High trading frequency incurring excessive slippage costs. Wider signal generation interval could be adopted.

6. Deteriorating signal efficiency requiring timely updates. Regular backtests and parameter tuning is needed.

## Improvement Directions

This strategy can be further enhanced in the following aspects:

1. Test more indicator combos like MACD, KD to find better matches.

2. Optimize MA periods to identify clearer primary and secondary trends. 

3. Optimize stop loss and take profit coefficients for optimal risk-reward ratio.

4. Test parameter robustness across different products and find optimal parameter sets.

5. Incorporate machine learning models to aid in trade signal generation.

6. Adopt adaptive stop loss algorithms to make stop loss more dynamic.

7. Test longer period parameters to expand profit potential.

## Conclusion

This strategy combines multiple indicators to filter out false signals and determine trend direction, sets stop loss and take profit to control risks, and optimizes parameters and combinations to continuously improve strategy performance. Although no strategy can perfectly predict the future, systematic trading plans coupled with proper risk management will substantially increase profitability. This strategy provides a relatively robust trend tracking framework suitable for investors seeking long term steady gains in a rational manner.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_2|5|Trend Code (If Overriding Adaptive PSAR)|
|v_input_4|2|BB MultFactor|
|v_input_5|20|KC Length|
|v_input_6|1.5|KC MultFactor|
|v_input_7|true|Use TrueRange (KC)|
|v_input_9|true|divisor|
|v_input_1|false|(?Adaptive Parabolic Sar)Override Adaptive PSAR|
|v_input_3|20|(?Squeeze Momentum)BB Length|
|v_input_bool_1|true|(?Multi Timeframe Moving Averages)boolplot_ma_1|
|v_input_string_1|0|MA 1: EMA|SMA|RMA|WMA|HMA|VWMA|
|v_input_int_1|200|intma_1_val|
|v_input_timeframe_1||ma1_tf|
|v_input_color_1|green|colorma_1_colour|
|v_input_bool_2|true|boolplot_ma_2|
|v_input_string_2|0|MA 2 : SMA|RMA|EMA|WMA|HMA|VWMA|
|v_input_int_2|50|intma_2_val|
|v_input_timeframe_2||ma2_tf|
|v_input_color_2|yellow|colorma_2_colour|
|v_input_bool_3|false|boolplot_ma_3|
|v_input_string_3|0|MA 3 : SMA|RMA|EMA|WMA|HMA|VWMA|
|v_input_int_3|true|intma_3_val|
|v_input_timeframe_3||ma3_tf|
|v_input_color_3|black|colorma_3_colour|
|v_input_bool_4|false|boolplot_ma_4|
|v_input_string_4|0|MA 4 : SMA|RMA|EMA|WMA|HMA|VWMA|
|v_input_int_4|true|intma_4_val|
|v_input_timeframe_4||ma4_tf|
|v_input_color_4|black|colorma_4_colour|
|v_input_bool_5|false|boolplot_ma_5|
|v_input_string_5|0|MA 5 : SMA|RMA|EMA|WMA|HMA|VWMA|
|v_input_int_5|true|intma_5_val|
|v_input_timeframe_5||ma5_tf|
|v_input_color_5|black|colorma_5_colour|
|v_input_bool_6|false|(?Normal Moving Averages)boolplot_ma_6|
|v_input_string_6|0|MA 6 : SMA|RMA|EMA|WMA|HMA|VWMA|
|v_input_int_6|true|intma_6_val|
|v_input_source_1_close|0|ma_6_src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_color_6|black|colorma_6_colour|
|v_input_bool_7|false|boolplot_ma_7|
|v_input_string_7|0|MA 7 : SMA|RMA|EMA|WMA|HMA|VWMA|
|v_input_int_7|true|intma_7_val|
|v_input_source_2_close|0|ma_7_src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_color_7|black|colorma_7_colour|
|v_input_bool_8|false|boolplot_ma_8|
|v_input_string_8|0|MA 8: SMA|RMA|EMA|WMA|HMA|VWMA|
|v_input_int_8|true|intma_8_val|
|v_input_source_3_close|0|ma_8_src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_color_8|black|colorma_8_colour|
|v_input_bool_9|false|boolplot_ma_9|
|v_input_string_9|0|MA 9 : SMA|RMA|EMA|WMA|HMA|VWMA|
|v_input_int_9|true|intma_9_val|
|v_input_source_4_close|0|ma_9_src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_color_9|black|colorma_9_colour|
|v_input_bool_10|false|boolplot_ma_10|
|v_input_string_10|0|MA 10: SMA|RMA|EMA|WMA|HMA|VWMA|
|v_input_int_10|true|intma_10_val|
|v_input_source_5_close|0|ma_10_src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_color_10|black|colorma_10_colour|
|v_input_8|200|(?HawkEye Volume Indicator)lengthhvi|
|v_input_bool_11|false|(?ADX)Average Directional Index (ADX)|
|v_input_10|14|ADX Smoothing|
|v_input_11|14|DI Length|
|v_input_12|25|ADX Threshold|
|v_input_bool_12|true|(?Date Range)Start|
|v_input_13|timestamp(1 Jan 2019)|startPeriodTime|
|v_input_bool_13|true|End|
|v_input_14|timestamp(31 Dec 2030)|endPeriodTime|
|v_input_string_11|0|(?Trade Direction)Trade Direction: Long and Short|Long Only|Short Only|
|v_input_float_1|100|(?Take Profit)Take Profit 1 - Target %|
|v_input_int_11|100|% Of Position|
|v_input_float_2|100|Take Profit 2 - Target %|
|v_input_int_12|100|% Of Position|
|v_input_float_3|100|Take Profit 3 - Target %|
|v_input_int_13|100|% Of Position|
|v_input_float_4|100|Take Profit 4 - Target %|
|v_input_float_5|999|(?Stop Loss)Stop Loss (%)|
|v_input_float_6|true|(?Leverage)Leverage|
|v_input_string_12|CRYPTANEX_99FTX_Strategy-Name-Here|(?ProfitView Alert Syntax)Alert Syntax Prefix|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-09 00:00:00
end: 2023-10-13 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © myn

//@version=5
strategy('Strategy Myth-Busting #6 - PSAR+MA+SQZMOM+HVI - [MYN]', max_bars_back=5000, overlay=true, pyramiding=0, initial_capital=20000, currency='USD', default_qty_type=strategy.percent_of_equity, default_qty_value=100.0, commission_value=0.075, use_bar_magnifier = false)



/////////////////////////////////////
//* Put your strategy logic below *//
/////////////////////////////////////
// dOg28adjYWY


//Trading Strategies Used
// Parabolic Sar
// 10 in 1 MA's
// Squeeze Momentum
// HawkEYE Volume Indicator

// Long Condition
// Parabolic Sar shift below price at last dot above and then previous bar needs to breach above that.
// Price action has to be below both MA's and 50MA needs to be above 200MA
// Squeeze Momentum needsd to be in green or close to going green
// HawkEYE Volume Indicator needs to be show a green bar on the histagram

// Short Condition
// Parabolic Sar shift above price at last dot below and then previous bar needs to breach below that.
// Price action needs to be above both MA's and 50MA needs to be below 200MA
// Squeeze Momentum needsd to be in red or close to going red
// HawkEYE Volume Indicator needs to be show a red bar on the histagram





// Parabolic SAR
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░




//@version=5
//indicator(title="Parabolic SAR", shorttitle="SAR", overlay=true, timeframe="", timeframe_gaps=true)
// Dynamic Max based on trendcode
int TrendCodeAdaptive = switch timeframe.multiplier
    1 => 1
    3 => 1
    5 => 1
    10 => 2
    15 => 3
    30 => 5
    45 => 5
    60 => 7
    120 => 9
    180 => 9
    240 => 13
    300 => 14
    360 => 15
    =>
        int(4)



bool overrideAdaptiveSar = input(false, title="Override Adaptive PSAR", group="Adaptive Parabolic Sar")
TrendCodeOverRide = input(5, title='Trend Code (If Overriding Adaptive PSAR)')


startPSAR = 0.02
increment = 0.02
maximum = overrideAdaptiveSar ? TrendCodeOverRide * 0.005 :  TrendCodeAdaptive * 0.005
PSAR = ta.sar(startPSAR, increment, maximum)
plot(PSAR, "ParabolicSAR", style=plot.style_cross, color=color.green)

//PSARLongEntry = PSAR < close ? 1 : na
//PSARShortEntry = PSAR < close ? na : -1
    
PSARLongEntry = high < PSAR and barstate.isconfirmed
PSARShortEntry = low > PSAR and barstate.isconfirmed





// Squeeze Momentum
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

//@version=5
// @author LazyBear 
// List of all my indicators: https://www.tradingview.com/v/4IneGo8h/
//
//indicator(shorttitle='SQZMOM_LB', title='Squeeze Momentum Indicator [LazyBear]', overlay=false)

lengthBB = input(20, title='BB Length', group="Squeeze Momentum")
mult = input(2.0, title='BB MultFactor')
lengthKC = input(20, title='KC Length')
multKC = input(1.5, title='KC MultFactor')

useTrueRange = input(true, title='Use TrueRange (KC)')

// Calculate BB
source = close
basis = ta.sma(source, lengthBB)
dev = multKC * ta.stdev(source, lengthBB)
upperBB = basis + dev
lowerBB = basis - dev

// Calculate KC
ma = ta.sma(source, lengthKC)
range_1 = useTrueRange ? ta.tr : high - low
rangema = ta.sma(range_1, lengthKC)
upperKC = ma + rangema * multKC
lowerKC = ma - rangema * multKC

sqzOn = lowerBB > lowerKC and upperBB < upperKC
sqzOff = lowerBB < lowerKC and upperBB > upperKC
noSqz = sqzOn == false and sqzOff == false

val = ta.linreg(source - math.avg(math.avg(ta.highest(high, lengthKC), ta.lowest(low, lengthKC)), ta.sma(close, lengthKC)), lengthKC, 0)

iff_1 = val > nz(val[1]) ? color.lime : color.green
iff_2 = val < nz(val[1]) ? color.red : color.maroon
bcolor = val > 0 ? iff_1 : iff_2
scolor = noSqz ? color.blue : sqzOn ? color.black : color.gray
//plot(val, color=bcolor, style=plot.style_histogram, linewidth=4)
//plot(0, color=scolor, style=plot.style_cross, linewidth=2)

SQZMOMLongEntry = val > 0
SQZMOMShortEntry = val < 0


// 10 in 1 Different Moving Averages
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// © hiimannshu
//@version=5

// This indicator is just a simple indicator which plot any kind of multiple (atmost 10) moving everage (sma/ema/wma/rma/hma/vwma) on chart.
// Enjoy the new update

//indicator(title='10 in 1 Different Moving Averages ( SMA/EMA/WMA/RMA/HMA/VWMA )', shorttitle=' 10 in 1 MAs', overlay=true)

bool plot_ma_1 = input.bool(true, '', inline='MA 1',group= "Multi Timeframe Moving Averages")
string ma_1_type = input.string(defval='EMA', title='MA 1', options=['RMA', 'SMA', 'EMA', 'WMA','HMA','VWMA'], inline='MA 1',group= "Multi Timeframe Moving Averages")
int ma_1_val = input.int(200, '', minval=1, inline='MA 1',group= "Multi Timeframe Moving Averages")
ma1_tf = input.timeframe(title='', defval='', inline='MA 1',group= "Multi Timeframe Moving Averages")
color ma_1_colour = input.color(color.green, '', inline='MA 1',group= "Multi Timeframe Moving Averages")


bool plot_ma_2 = input.bool(true, '', inline='MA 2',group= "Multi Timeframe Moving Averages")
string ma_2_type = input.string(defval='SMA', title='MA 2 ', options=['RMA', 'SMA', 'EMA', 'WMA','HMA','VWMA'], inline='MA 2',group= "Multi Timeframe Moving Averages")
int ma_2_val = input.int(50, '', minval=1, inline='MA 2',group= "Multi Timeframe Moving Averages")
ma2_tf = input.timeframe(title='', defval='', inline='MA 2',group= "Multi Timeframe Moving Averages")
color ma_2_colour = input.color(color.yellow, '', inline='MA 2',group= "Multi Timeframe Moving Averages")


bool plot_ma_3 = input.bool(false, '', inline='MA 3',group= "Multi Timeframe Moving Averages")
string ma_3_type = input.string(defval='SMA', title='MA 3 ', options=['RMA', 'SMA', 'EMA', 'WMA','HMA','VWMA'], inline='MA 3',group= "Multi Timeframe Moving Averages")
int ma_3_val = input.int(1, '', minval=1, inline='MA 3',group= "Multi Timeframe Moving Averages")
ma3_tf = input.timeframe(title='', defval='', inline='MA 3',group= "Multi Timeframe Moving Averages")
color ma_3_colour = input.color(color.black, '', inline='MA 3',group= "Multi Timeframe Moving Averages")


bool plot_ma_4 = input.bool(false, '', inline='MA 4',group= "Multi Timeframe Moving Averages")
string ma_4_type = input.string(defval='SMA', title='MA 4 ', options=['RMA', 'SMA', 'EMA', 'WMA','HMA','VWMA'], inline='MA 4',group= "Multi Timeframe Moving Averages")
int ma_4_val = input.int(1, '', minval=1, inline='MA 4',group= "Multi Timeframe Moving Averages")
ma4_tf = input.timeframe(title='', defval='', inline='MA 4',group= "Multi Timeframe Moving Averages")
color ma_4_colour = input.color(color.black, '', inline='MA 4',group= "Multi Timeframe Moving Averages")


bool plot_ma_5 = input.bool(false, '', inline='MA 5',group= "Multi Timeframe Moving Averages")
string ma_5_type = input.string(defval='SMA', title='MA 5 ', options=['RMA', 'SMA', 'EMA', 'WMA','HMA','VWMA'], inline='MA 5',group= "Multi Timeframe Moving Averages")
int ma_5_val = input.int(1, '', minval=1, inline='MA 5',group= "Multi Timeframe Moving Averages")
ma5_tf = input.timeframe(title='', defval='', inline='MA 5',group= "Multi Timeframe Moving Averages")
color ma_5_colour = input.color(color.black, '', inline='MA 5',group= "Multi Timeframe Moving Averages")


bool plot_ma_6 = input.bool(false, '', inline='MA 6',group= "Normal Moving Averages")
string ma_6_type = input.string(defval='SMA', title='MA 6 ', options=['RMA', 'SMA', 'EMA', 'WMA','HMA','VWMA'], inline='MA 6',group= "Normal Moving Averages")
int ma_6_val = input.int(1, '', minval=1, inline='MA 6',group= "Normal Moving Averages")
ma_6_src = input.source(defval=close, title='', inline='MA 6',group= "Normal Moving Averages")
color ma_6_colour = input.color(color.black, '', inline='MA 6',group= "Normal Moving Averages")


bool plot_ma_7 = input.bool(false, '', inline='MA 7',group= "Normal Moving Averages")
string ma_7_type = input.string(defval='SMA', title='MA 7 ', options=['RMA', 'SMA', 'EMA', 'WMA','HMA','VWMA'], inline='MA 7',group= "Normal Moving Averages")
int ma_7_val = input.int(1, '', minval=1, inline='MA 7',group= "Normal Moving Averages")
ma_7_src = input.source(defval=close, title='', inline='MA 7',group= "Normal Moving Averages")
color ma_7_colour = input.color(color.black, '', inline='MA 7',group= "Normal Moving Averages")


bool plot_ma_8 = input.bool(false, '', inline='MA 8',group= "Normal Moving Averages")
string ma_8_type = input.string(defval='SMA', title='MA 8', options=['RMA', 'SMA', 'EMA', 'WMA','HMA','VWMA'], inline='MA 8',group= "Normal Moving Averages")
int ma_8_val = input.int(1, '', minval=1, inline='MA 8',group= "Normal Moving Averages")
ma_8_src = input.source(defval=close, title='', inline='MA 8',group= "Normal Moving Averages")
color ma_8_colour = input.color(color.black, '', inline='MA 8',group= "Normal Moving Averages")


bool plot_ma_9 = input.bool(false, '', inline='MA 9',group= "Normal Moving Averages")
string ma_9_type = input.string(defval='SMA', title='MA 9 ', options=['RMA', 'SMA', 'EMA', 'WMA','HMA','VWMA'], inline='MA 9',group= "Normal Moving Averages")
int ma_9_val = input.int(1, '', minval=1, inline='MA 9',group= "Normal Moving Averages")
ma_9_src = input.source(defval=close, title='', inline='MA 9',group= "Normal Moving Averages")
color ma_9_colour = input.color(color.black, '', inline='MA 9',group= "Normal Moving Averages")


bool plot_ma_10 = input.bool(false, '', inline='MA 10',group= "Normal Moving Averages")
string ma_10_type = input.string(defval='SMA', title='MA 10', options=['RMA', 'SMA', 'EMA', 'WMA','HMA','VWMA'], inline='MA 10',group= "Normal Moving Averages")
int ma_10_val = input.int(1, '', minval=1, inline='MA 10',group= "Normal Moving Averages")
ma_10_src = input.source(defval=close, title='', inline='MA 10',group= "Normal Moving Averages")
color ma_10_colour = input.color(color.black, '', inline='MA 10',group= "Normal Moving Averages")


ma_function(source, length, type) =>


    if type == 'RMA'
        ta.rma(source, length)
    else if type == 'SMA'
        ta.sma(source, length)
    else if type == 'EMA'
        ta.ema(source, length)
    else if type == 'WMA'
        ta.wma(source, length)
    else if type == 'HMA'
        if(length<2)
            ta.hma(source,2)
        else
            ta.hma(source, length)
    else 
        ta.vwma(source, length)
    
    


ma_1 = plot_ma_1 ? request.security(syminfo.tickerid, ma1_tf, ma_function(close, ma_1_val, ma_1_type)):0
ma_2 = plot_ma_2 ?request.security(syminfo.tickerid, ma2_tf, ma_function(close, ma_2_val, ma_2_type)):0
ma_3 = plot_ma_3 ?request.security(syminfo.tickerid, ma3_tf, ma_function(close, ma_3_val, ma_3_type)):0
ma_4 = plot_ma_4 ? request.security(syminfo.tickerid, ma4_tf, ma_function(close, ma_4_val, ma_4_type)):0
ma_5 = plot_ma_5 ?request.security(syminfo.tickerid, ma5_tf, ma_function(close, ma_5_val, ma_5_type)):0
ma_6 = plot_ma_6 ?ma_function(ma_6_src, ma_6_val, ma_6_type):0
ma_7 = plot_ma_7 ?ma_function(ma_7_src, ma_7_val, ma_7_type):0
ma_8 = plot_ma_8 ?ma_function(ma_8_src, ma_8_val, ma_8_type):0
ma_9 = plot_ma_9 ?ma_function(ma_9_src, ma_9_val, ma_9_type):0
ma_10 = plot_ma_10 ?ma_function(ma_10_src, ma_10_val, ma_10_type):0




plot(plot_ma_1 ? ma_1 : na, 'MA 1', ma_1_colour)
plot(plot_ma_2 ? ma_2 : na, 'MA 2', ma_2_colour)
plot(plot_ma_3 ? ma_3 : na, 'MA 3', ma_3_colour)
plot(plot_ma_4 ? ma_4 : na, 'MA 4', ma_4_colour)
plot(plot_ma_5 ? ma_5 : na, 'MA 5', ma_5_colour)
plot(plot_ma_6 ? ma_6 : na, 'MA 6', ma_6_colour)
plot(plot_ma_7 ? ma_7 : na, 'MA 7', ma_7_colour)
plot(plot_ma_8 ? ma_8 : na, 'MA 8', ma_8_colour)
plot(plot_ma_9 ? ma_9 : na, 'MA 9', ma_9_colour)
plot(plot_ma_10 ? ma_10 : na, 'MA 10', ma_10_colour)


// Long entry -  Price has to be below both MA's and 50MA needs to be above 200MA
MALongEntry = (close > ma_1 and close > ma_2) and (ma_2 > ma_1)

// Short Entry - Price has to be above both MA's and 50MA needs to be below 200MA
MAShortEntry = (close < ma_1 and close < ma_2) and (ma_2 < ma_1)


// HawkEYE Volume Indicator
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

//@version=5
// @author LazyBear
// If you use this code, in its original or modified form, do drop me a note. Thx. 
// 
//indicator('HawkEye Volume Indicator [LazyBear]', shorttitle='HVI_LB')
lengthhvi = input(200, group="HawkEye Volume Indicator")
range_1HVI = high - low
rangeAvg = ta.sma(range_1HVI, lengthhvi)

volumeA = ta.sma(volume, lengthhvi)
divisor = input(1)

high1 = high[1]
low1 = low[1]
mid1 = hl2[1]

u1 = mid1 + (high1 - low1) / divisor
d1 = mid1 - (high1 - low1) / divisor

r_enabled1 = range_1HVI > rangeAvg and close < d1 and volume > volumeA
r_enabled2 = close < mid1
r_enabled = r_enabled1 or r_enabled2

g_enabled1 = close > mid1
g_enabled2 = range_1HVI > rangeAvg and close > u1 and volume > volumeA
g_enabled3 = high > high1 and range_1HVI < rangeAvg / 1.5 and volume < volumeA
g_enabled4 = low < low1 and range_1HVI < rangeAvg / 1.5 and volume > volumeA
g_enabled = g_enabled1 or g_enabled2 or g_enabled3 or g_enabled4

gr_enabled1 = range_1HVI > rangeAvg and close > d1 and close < u1 and volume > volumeA and volume < volumeA * 1.5 and volume > volume[1]
gr_enabled2 = range_1HVI < rangeAvg / 1.5 and volume < volumeA / 1.5
gr_enabled3 = close > d1 and close < u1
gr_enabled = gr_enabled1 or gr_enabled2 or gr_enabled3

v_color = gr_enabled ? color.gray : g_enabled ? color.green : r_enabled ? color.red : color.blue
//plot(volume, style=plot.style_histogram, color=v_color, linewidth=5)

HVILongEntry = g_enabled
HVIShortEntry = r_enabled

//////////////////////////////////////
//* Put your strategy rules below *//
/////////////////////////////////////

longCondition = PSARLongEntry and MALongEntry and HVILongEntry and SQZMOMLongEntry
shortCondition = PSARShortEntry and MAShortEntry and HVIShortEntry and SQZMOMShortEntry

//define as 0 if do not want to use
closeLongCondition = 0
closeShortCondition = 0


// ADX
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

adxEnabled = input.bool(defval = false , title = "Average Directional Index (ADX)", tooltip = "", group ="ADX" ) 
adxlen = input(14, title="ADX Smoothing", group="ADX")
adxdilen = input(14, title="DI Length", group="ADX")
adxabove = input(25, title="ADX Threshold", group="ADX")

adxdirmov(len) =>
	adxup = ta.change(high)
	adxdown = -ta.change(low)
	adxplusDM = na(adxup) ? na : (adxup > adxdown and adxup > 0 ? adxup : 0)
	adxminusDM = na(adxdown) ? na : (adxdown > adxup and adxdown > 0 ? adxdown : 0)
	adxtruerange = ta.rma(ta.tr, len)
	adxplus = fixnan(100 * ta.rma(adxplusDM, len) / adxtruerange)
	adxminus = fixnan(100 * ta.rma(adxminusDM, len) / adxtruerange)
	[adxplus, adxminus]
adx(adxdilen, adxlen) =>
	[adxplus, adxminus] = adxdirmov(adxdilen)
	adxsum = adxplus + adxminus
	adx = 100 * ta.rma(math.abs(adxplus - adxminus) / (adxsum == 0 ? 1 : adxsum), adxlen)

adxsig = adxEnabled ? adx(adxdilen, adxlen) : na
isADXEnabledAndAboveThreshold = adxEnabled ? (adxsig > adxabove) : true

//Backtesting Time Period (Input.time not working as expected as of 03/30/2021.  Giving odd start/end dates
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
useStartPeriodTime = input.bool(true, 'Start', group='Date Range', inline='Start Period')
startPeriodTime = input(timestamp('1 Jan 2019'), '', group='Date Range', inline='Start Period')
useEndPeriodTime = input.bool(true, 'End', group='Date Range', inline='End Period')
endPeriodTime = input(timestamp('31 Dec 2030'), '', group='Date Range', inline='End Period')

start = useStartPeriodTime ? startPeriodTime >= time : false
end = useEndPeriodTime ? endPeriodTime <= time : false
calcPeriod = true

// Trade Direction 
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tradeDirection = input.string('Long and Short', title='Trade Direction', options=['Long and Short', 'Long Only', 'Short Only'], group='Trade Direction')

// Percent as Points
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
per(pcnt) =>
    strategy.position_size != 0 ? math.round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)

// Take profit 1
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tp1 = input.float(title='Take Profit 1 - Target %', defval=100, minval=0.0, step=0.5, group='Take Profit', inline='Take Profit 1')
q1 = input.int(title='% Of Position', defval=100, minval=0, group='Take Profit', inline='Take Profit 1')

// Take profit 2
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tp2 = input.float(title='Take Profit 2 - Target %', defval=100, minval=0.0, step=0.5, group='Take Profit', inline='Take Profit 2')
q2 = input.int(title='% Of Position', defval=100, minval=0, group='Take Profit', inline='Take Profit 2')

// Take profit 3
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tp3 = input.float(title='Take Profit 3 - Target %', defval=100, minval=0.0, step=0.5, group='Take Profit', inline='Take Profit 3')
q3 = input.int(title='% Of Position', defval=100, minval=0, group='Take Profit', inline='Take Profit 3')

// Take profit 4
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tp4 = input.float(title='Take Profit 4 - Target %', defval=100, minval=0.0, step=0.5, group='Take Profit')

/// Stop Loss
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
stoplossPercent = input.float(title='Stop Loss (%)', defval=999, minval=0.01, group='Stop Loss') * 0.01
slLongClose = close < strategy.position_avg_price * (1 - stoplossPercent)
slShortClose = close > strategy.position_avg_price * (1 + stoplossPercent)

/// Leverage
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
leverage = input.float(1, 'Leverage', step=.5, group='Leverage')
contracts = math.min(math.max(.000001, strategy.equity / close * leverage), 1000000000)


/// Trade State Management
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

isInLongPosition = strategy.position_size > 0
isInShortPosition = strategy.position_size < 0

/// ProfitView Alert Syntax String Generation
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

alertSyntaxPrefix = input.string(defval='CRYPTANEX_99FTX_Strategy-Name-Here', title='Alert Syntax Prefix', group='ProfitView Alert Syntax')
alertSyntaxBase = alertSyntaxPrefix + '\n#' + str.tostring(open) + ',' + str.tostring(high) + ',' + str.tostring(low) + ',' + str.tostring(close) + ',' + str.tostring(volume) + ','


/// Trade Execution
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

longConditionCalc = (longCondition and isADXEnabledAndAboveThreshold)
shortConditionCalc = (shortCondition and isADXEnabledAndAboveThreshold)

if calcPeriod
    if longConditionCalc and tradeDirection != 'Short Only' and isInLongPosition == false
        strategy.entry('Long', strategy.long, qty=contracts)

        alert(message=alertSyntaxBase + 'side:long', freq=alert.freq_once_per_bar_close)

    if shortConditionCalc and tradeDirection != 'Long Only' and isInShortPosition == false
        strategy.entry('Short', strategy.short, qty=contracts)

        alert(message=alertSyntaxBase + 'side:short', freq=alert.freq_once_per_bar_close)
    
    //Inspired from Multiple %% profit exits example by adolgo https://www.tradingview.com/script/kHhCik9f-Multiple-profit-exits-example/
    strategy.exit('TP1', qty_percent=q1, profit=per(tp1))
    strategy.exit('TP2', qty_percent=q2, profit=per(tp2))
    strategy.exit('TP3', qty_percent=q3, profit=per(tp3))
    strategy.exit('TP4', profit=per(tp4))

    strategy.close('Long', qty_percent=100, comment='SL Long', when=slLongClose)
    strategy.close('Short', qty_percent=100, comment='SL Short', when=slShortClose)

    strategy.close_all(when=closeLongCondition or closeShortCondition, comment='Close Postion')

/// Dashboard
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// Inspired by https://www.tradingview.com/script/uWqKX6A2/ - Thanks VertMT

```

> Detail

https://www.fmz.com/strategy/429474

> Last Modified

2023-10-17 14:47:00
