
> Name

多时间框架RSI与随机指标策略Multi-Timeframe-RSI-and-Stochastics-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/145698e35e7d08fe7b4.png)
[trans]
## 概述

多时间框架RSI与随机指标策略是一个利用RSI和随机指标的组合指标在多时间框架判断市场超买超卖的策略。该策略同时结合4个时间框架的RSI和随机指标,利用其平均值来判断整体市场走势和超买超卖情况,以发挥各个时间框架指标的优势。

## 策略原理

### 1. RSI指标

RSI指标是一种强大的超买超卖指标,它基于一定时间内股票的涨跌幅度来计算。RSI值在0到100之间波动,一般来说,RSI大于70表示超买,小于30表示超卖。

本策略使用长度为14的RSI指标,并获取1个月、1日、4小时和1小时4个时间框架的RSI值。

### 2. 随机指标%K

随机指标%K是显示市场是超买还是超卖区间的指标,值在0到100之间波动。一般来说,随机指标大于80表示超买,小于20表示超卖。

本策略中,随机指标%K的长度为14,平滑为3,同样获取上述4个时间框架的值。

### 3. 平均值组合

策略的关键在于计算上述两个指标在4个时间框架的平均值,以发挥各个时间框架的优势,判断整体市场走势。具体计算公式如下:

RSI平均值 = (RSI月线 + RSI日线 + RSI4小时 + RSI1小时) / 4

随机指标平均值 = (随机指标月线 + 随机指标日线 + 随机指标4小时 + 随机指标1小时) / 4


### 4. 交易信号

当RSI平均值小于30并且随机指标平均值小于20时,做多;当RSI平均值大于70并且随机指标平均值大于80时,做空。

做多后,在随机指标平均值大于70并且RSI平均值大于50时平仓;做空后,在随机指标平均值小于30并且RSI平均值小于50时平仓。

## 优势分析

该策略最大的优势在于同时结合两个指标和多个时间框架,这可以大大提高交易信号的可靠性,并最大程度避免假信号。具体优势如下:

1. RSI指标和随机指标互为验证。仅仅依靠单一指标容易产生假信号,而本策略通过组合两个指标,能够提高信号的准确性。

2. 多时间框架分析能够提高判断的准确性。例如,月线和日线显示超买,但4小时和1小时并未完全超买,这说明趋势可能继续。如果所有时间框架一致,则信号更加可靠。

3. 更清楚判断结构性转折点。在多个时间框架上同步看到关键Support/Resistance的突破,可以判断目前趋势发生转折。

4. 自动计算指标平均值简化操作。不需要手工计算,代码自动完成数据提取、指标计算和求平均,降低工作量。

## 风险分析

该策略的主要风险在于像所有技术分析策略一样,无法完全避免被套和产生假信号的概率。主要风险有:

1. 趋势短期反转导致被套。例如多头持仓期间,价格短线向下突破支撑位后再次反弹回升。这时根据策略的平仓逻辑需要立即止损,但有可能造成短期损失。

2. 关键支撑/阻力位失守导致追踪止损失败。如果关键的支撑或阻力位发生失守,那么原有的止损价格可能会被直接突破,从而造成更大的亏损。

3. 时间框架设置不当导致判定错误。如果时间框架设置得过长或过短都可能导致指标判读产生偏差。

4. 指标发散导致 Dunkirk 效应。即更高时间框架的指标显示超买而更低时间框架的指标显示超卖,平均指标无法反映真实情况。

对应风险的解决方法包括:优化止损策略,追踪动态支撑/阻力位,调整时间框架参数和添加筛选机制等。

## 优化方向  

考虑到上述存在的风险,该策略还可从以下几个方向进行优化:

1. 优化止损机制,实现追踪止损和分批止损。这可以在保证盈利的同时控制单笔亏损风险。

2. 增加季度线等更高时间框架。这可以利用更大级别趋势过滤误导信号。指标出现分歧时,优先考虑更高时间框架。

3. 增加成交量的多空验证。结合成交量变化判断底背离和顶背离,避免受到僵尸走势的误导。

4. 优化入场时机。可以在重要的历史支撑/阻力附近等待突破入场,或者等待最佳回调买入点。

5. 增加自适应止损。可以根据最近期的波动率和ATR来计算和调整动态止损位。

## 总结  

多时间框架RSI与随机指标策略通过组合使用RSI指标和随机指标在多个时间框架上判断市场的超买超卖区间,是一种清晰可靠的交易策略。它最大的优势就是指标和时间框架的组合互相验证,能极大程度避免被套和假信号的风险。当然该策略也存在类似技术分析策略普遍存在的风险,需要从优化止损、时间框架选择等方面不断改进和优化,使之成为一种稳定盈利的算法交易策略。

||

## Overview 

The Multi Timeframe RSI and Stochastics Strategy is a strategy that combines RSI and Stochastics indicators across multiple timeframes to determine overbought and oversold conditions in the market. It utilizes the average values of RSI and Stochastics from 4 different timeframes to gauge overall market momentum and overextension. This allows it to harness the strengths of indicators across different timeframes.  

## Strategy Logic

### 1. RSI Indicator

The RSI indicator is a powerful oscillator that measures overbought and oversold levels based on the magnitude of recent price movements. RSI values fluctuate between 0 to 100, where values over 70 are considered overbought and under 30 oversold.

This strategy uses a 14-period RSI and obtains RSI values from the monthly, daily, 4-hour and 1-hour timeframes.

### 2. Stochastics %K 

Stochastics %K is an indicator that shows overbought/oversold levels in the market on a scale of 0 to 100. Generally, values above 80 indicate an overbought market while values below 20 signal an oversold market.

The strategy uses a 14,3 Stochastics configuration and likewise obtains %K values from the aforementioned timeframes.

### 3. Average Value Combination

The crux of the strategy lies in taking an average of the two indicators across the multiple timeframes. This allows it to tap on the strengths of each timeframe when gauging overall market conditions. The exact formulas are:

RSI Average = (Monthly RSI + Daily RSI + 4H RSI + 1H RSI) / 4

Stochastics Average = (Monthly Stochastics + Daily Stochastics + 4H Stochastics + 1H Stochastics) / 4

### 4. Trade Signals 

The strategy triggers a long when the RSI average falls below 30 and Stochastics average goes below 20. It triggers a short when the RSI average rises above 70 and Stochastics average breaches 80. 

The long position is closed when Stochastics average rises above 70 and RSI average climbs over 50. The short position is closed when Stochastics average dips below 30 and RSI average drops under 50.

## Advantage Analysis

The key advantage of this strategy lies in the combination of two indicators across multiple timeframes. This greatly enhances the reliability of trade signals and minimizes false signals. Specific advantages include:

1. RSI and Stochastics verify each other as signals. Relying solely on one indicator tends to generate false signals more frequently. The dual indicator approach promotes accuracy.

2. Multiple timeframes lead to more robust analysis. For instance, the monthly and daily timeframes show an overbought market but the smaller timeframes have yet to reach overextension levels. This suggests an uptrend is likely to continue. Signals are more reliable when all timeframes agree.  

3. Clearer identification of structural turning points when multiple timeframes concurrently show a break of key S/R levels, signaling a trend reversal.

4. Auto-computation of averages simplifies the workflow. No manual calculation needed as the code handles data retrieval, indicator computation and averaging automatically.

## Risk Analysis

As with all technical analysis strategies, the core risk lies in whipsaws and false signals. Key risks include:

1. Trend reversals leading to being stopped out. For instance, prices make a short term breach below support before rebounding while long. Such cases may incur short term losses due to the exit logic.

2. Invalidation of key S/R leading to failed trailing stops. A break of major S/R levels can directly trigger stops designed below them, resulting in above average losses.

3. Incorrect judgments from suboptimal timeframe configurations. Overssmoothed or undersmoothed timeframes may provide misleading oscillator values. 

4. Divergence across timeframes causing a Dunkirk effect. Where higher timeframes show an overbought market but lower timeframes signal oversold conditions, rendering averages ineffective.

Solutions involve optimizing stop loss strategies, tracking dynamic S/R levels, adjusting timeframe parameters and adding additional filters.

## Enhancement Opportunities

In view of the discussed risks, enhancement opportunities include:

1. Optimizing the stop loss mechanism to incorporate trailing stops and partial exits. This locks in profits while controlling single trade risks.

2. Adding higher timeframes like the quarterly chart. This allows larger trend guidance to filter false signals. Prioritize readings from higher timeframes when divergence occurs.  

3. Incorporating volume for additional trend validation via bull/bear divergences to avoid zombie trends.

4. Fine-tuning entry signals by awaiting breakouts around key historic S/R or allowing for optimal pullback entries.

5. Implementing adaptive stops based on recent volatility and ATR values for dynamic stop positioning.

## Conclusion  

The Multi Timeframe RSI and Stochastics Strategy is a clear, reliable approach that uses a combination of RSI and Stochastics across multiple timeframes to identify overbought/oversold levels. Its biggest strength lies in the mutual verification of indicators and timeframes to minimize whipsaw and false signal risks. Nonetheless like all technical strategies, it faces inherent risks that need to be addressed via stop loss optimization, timeframe selections etc to refine it into a stable automated trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|80|(?══════════    General    ══════════)Overbought Level|
|v_input_int_2|20|Oversold Level|
|v_input_timeframe_1|W|(?══════════   Timeframes   ══════════)Timeframe 1|
|v_input_timeframe_2|D|Timeframe 2|
|v_input_timeframe_3|240|Timeframe 3|
|v_input_timeframe_4|60|Timeframe 4|
|v_input_int_3|14|(?══════════   RSI settings   ══════════)RSI length|
|v_input_1_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_4|70|RSI Overbought Level|
|v_input_int_5|30|RSI Oversold Level|
|v_input_int_6|14|(?══════════   Stochastic settings   ══════════)%K length|
|v_input_int_7|3|Smooth K|
|v_input_2_close|0|Stochastic Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_8|70|Stochastic Overbought Level|
|v_input_int_9|30|Stochastic Oversold Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

////////////////////////////////////////// MTF Stochastic & RSI Strategy ? ©️ bykzis /////////////////////////////////////////
//

// *** Inspired by "Binance CHOP Dashboard" from @Cazimiro and "RSI MTF Table" from @mobester16 *** and LOT OF COPY of Indicator-Jones MTF Scanner
// 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//@version=5
strategy('MTF RSI & STOCH Strategy? by kzi', overlay=false,initial_capital=100, currency=currency.USD, commission_value=0.01, commission_type=strategy.commission.percent)


// Pair list
var string GRP1       = '══════════    General    ══════════'
overbought = input.int(80, 'Overbought Level', minval=1, group=GRP1)
oversold = input.int(20, 'Oversold Level', minval=1, group=GRP1)


/// Timeframes
var string GRP2       = '══════════   Timeframes   ══════════'
timeframe1 = input.timeframe(title="Timeframe 1", defval="W", group=GRP2)
timeframe2 = input.timeframe(title="Timeframe 2", defval="D", group=GRP2)
timeframe3 = input.timeframe(title="Timeframe 3", defval="240", group=GRP2)
timeframe4 = input.timeframe(title="Timeframe 4", defval="60", group=GRP2)

// RSI settings
var string GRP3       = '══════════   RSI settings   ══════════'
rsiLength = input.int(14, minval=1, title='RSI length', group=GRP3)
rsiSource = input(close, 'RSI Source', group=GRP3)
rsioverbought = input.int(70, 'RSI Overbought Level', minval=1, group=GRP3)
rsioversold = input.int(30, 'RSI Oversold Level', minval=1, group=GRP3)


/// Get RSI values of each timeframe /////////////////////////////////////////////////////
rsi = ta.rsi(rsiSource, rsiLength)
callRSI(id,timeframe) =>
    rsiValue = request.security(id, str.tostring(timeframe), rsi, gaps=barmerge.gaps_off)
    rsiValue

RSI_TF1 = callRSI(syminfo.tickerid, timeframe1)
RSI_TF2 = callRSI(syminfo.tickerid, timeframe2)
RSI_TF3 = callRSI(syminfo.tickerid, timeframe3)
RSI_TF4 = callRSI(syminfo.tickerid, timeframe4)




/////// Calculate Averages /////////////////////////////////////////////////////////////////
calcAVG(valueTF1, valueTF2, valueTF3, valueTF4) =>
    math.round((valueTF1 + valueTF2 + valueTF3 + valueTF4) / 4, 2)

AVG=calcAVG(RSI_TF1, RSI_TF2, RSI_TF3, RSI_TF4)



// Stochastic settings
var string GRP4       = '══════════   Stochastic settings   ══════════'
periodK = input.int(14, '%K length', minval=1, group=GRP4)
smoothK = input.int(3, 'Smooth K', minval=1, group=GRP4)
stochSource = input(close, 'Stochastic Source', group=GRP4)
stochoverbought = input.int(70, 'Stochastic Overbought Level', minval=1, group=GRP4)
stochoversold = input.int(30, 'Stochastic Oversold Level', minval=1, group=GRP4)


/// Get Stochastic values of each timeframe ////////////////////////////////////////////////
stoch = ta.sma(ta.stoch(stochSource, high, low, periodK), smoothK)
getStochastic(id,timeframe) =>
    stochValue = request.security(id, str.tostring(timeframe), stoch, gaps=barmerge.gaps_off)
    stochValue

Stoch_TF1 = getStochastic(syminfo.tickerid, timeframe1)
Stoch_TF2 = getStochastic(syminfo.tickerid, timeframe2)
Stoch_TF3 = getStochastic(syminfo.tickerid, timeframe3)
Stoch_TF4 = getStochastic(syminfo.tickerid, timeframe4)


AVG_STOCH=calcAVG(Stoch_TF1, Stoch_TF2, Stoch_TF3, Stoch_TF4)


plot(AVG, color = color.blue, title='RSI')
plot(AVG_STOCH, color = color.yellow,title='STOCH')
hline(rsioverbought,color=color.red)
hline(rsioversold, color=color.lime)
hline(50, color=color.white)

//============ signal Generator ==================================//

if AVG <= rsioversold and AVG_STOCH <=stochoversold 
    strategy.entry('Buy_Long', strategy.long)

    
strategy.close("Buy_Long",when=(AVG_STOCH >=70 and AVG >=50 and close >=strategy.position_avg_price),comment="Long_OK")

if AVG >=rsioverbought and AVG_STOCH >=stochoverbought
    strategy.entry('Buy_Short', strategy.short)


strategy.close("Buy_Short",when=(AVG_STOCH <=30 and AVG <=50 and close <=strategy.position_avg_price),comment="Short_OK")


///////////////////////////////////////////////////////////////////////////////////////////




```

> Detail

https://www.fmz.com/strategy/442396

> Last Modified

2024-02-21 15:56:37
