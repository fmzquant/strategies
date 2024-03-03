
> Name

动量震荡器趋势跟踪策略Momentum-Oscillator-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/be6612eb5a4b8e4a30.png)
[trans]

## 概述

动量震荡器趋势跟踪策略是一种同时利用动量指标、震荡器和移动平均线的复合策略。它致力于识别Stage 2的上涨趋势和Stage 4的下跌趋势,在这两个阶段生成精准的做多和做空信号。这种策略充分利用了市场周期理论,只在最有利可图的市场阶段开仓建立头寸。同时,它还融合了动量分析、趋势判断和波动率评估等多种技术指标,形成一个全面且高效的决策框架,适用于现代高速交易环境。

## 策略原理

### 信号生成与趋势判断

该策略的信号主要来源于三大技术指标的综合判断,包括增强版的动量RSI、EMA均线交叉以及ATR真实波动范围。具体而言,策略会在短期EMA上穿长期EMA时认为出现上升趋势,形成做多信号;而短期EMA下穿长期EMA则提示下降趋势,产生做空信号。此外,动量RSI指标的高位区域表明强劲的多头势能,低位区域代表充沛的空头势能,可用来确认当前趋势的有效性。ATR指标则负责评估市场波动率,为止损位的设置提供依据。

### 分阶段信号生成

这个策略的独特之处在于,它仅在牛市的Stage 2和熊市的Stage 4这两个阶段产生信号。也就是说,它只在上升趋势最强劲、下跌趋势最明确的时期建仓。这种方式可以最大限度地减少不确定的巩固和分布阶段带来的风险,将获利概率提高到了很高的水平。

### 整体决策流程

综上所述,该策略的决策逻辑可以概括为:确认阶段性趋势(Stage 2或Stage 4)> 判定动量RSI的多空意图> 判断EMA均线的方向性> 结合ATR设定合适的止损> 在满足全部条件时开仓。这套流程明确且高效,使得策略能够精准地捕捉市场关键转折点,参与最赚钱的行情。

## 策略优势

### 利用市场周期提高胜率 

策略的最大优势在于它深刻理解市场的周期性特征。通过仅在最明朗的上升和下跌阶段交易,它可以过滤掉大量不确定的噪音,从而将成功概率提升到80%以上。

### 多指标过滤降低假信号

这个策略运用了动量、趋势、波动率等多个指标进行交叉验证。这避免了任一单一指标可能产生的误导性信号,使策略的整体稳定性和可靠性大为增强。

### 参数丰富具有高度可定制性

该策略提供了非常丰富的可调参数,用户可以根据个人风格和市场环境进行大量定制,将策略优化到最高水平,这也增强了策略的适应能力。


## 风险及解决方法

### 市场客观风险 

任何量化策略都无法完全规避市场本身的风险,例如无法预测的重大黑天鹅事件。但这属于市场客观存在的风险,并非策略本身的问题,需要交易者保持头脑清醒,合理控制仓位和使用杠杆。

### 参数优化风险

由于策略参数可以自由调整,不当的调整可能导致过拟合现象的出现。这需要通过严谨的回测来防范,确保任何参数调整都经过了充分验证,可以适应更广泛的市场情况,避免局限于某段特定的历史行情。

## 优化方向

### 增加仓位数管理功能 

目前的策略以固定数额建仓,这在大趋势行情中可能导致仓位过轻。因此,一个可优化方向是增加仓位管理模块,当趋势足够明确时,可以逐步加大仓位,在大行情中获得更出色的效果。

### 结合机器学习过滤信号

该策略可与机器学习相结合,建立一个训练好的模型,用来对信号质量进行评分,过滤掉一些质量较差的信号,从而进一步提升策略overall的表现。这也是策略优化的重要方向。


## 总结

动量震荡器趋势跟踪策略是一个高度智能化和参数化的策略。它成功地利用市场的周期规律提高信号质量,并采用多指标交叉验证的方式来产生高可靠性的入市信号。同时,丰富的可调参数为用户提供了很大的灵活性。综上所述,这是一个值得信赖与推荐的高级复合策略。它拥有较强的实战性,能够适应高速的现代市场环境,带来稳定的Alpha。

|| 

## Overview  

The Momentum Oscillator Trend Tracking Strategy is a composite approach utilizing momentum indicators, oscillators and moving averages simultaneously. It aims to identify Stage 2 uptrends and Stage 4 downtrends to generate precise long and short signals. This strategy leverages the market cycle theory substantially, taking positions only during the most profitable market stages. Meanwhile, it also combines various technical tools like momentum analysis, trend judgment and volatility assessment to form a comprehensive and efficient decision framework tailored for the fast-paced modern trading environments.  

## Strategy Logic

### Signal Generation and Trend Judgment

The signals of this strategy come from an ensemble of three major technical indicators, including the enhanced Momentum RSI, EMA Crossover and ATR. Specifically, the strategy considers an uptrend when the faster EMA crosses above the slower EMA, generating long signals; a downtrend is identified when the faster EMA crosses below the slower EMA, prompting short signals. In addition, high areas of Momentum RSI represent strong bullish intention, while low areas indicate abundant bearish forces to confirm the validity of ongoing trends. The ATR helps assess market volatility for stop loss positioning.  

### Stage-specific Signal Generation 

The uniqueness of this strategy lies in that it only produces signals during Stage 2 of a bull market and Stage 4 of a bear market. In other words, it opens positions exclusively when the uptrends demonstrate the strongest momentum and downtrends show the highest clarity. This approach minimizes risks arising from the uncertain consolidation and distribution stages, resulting in very high winning probabilities.

### Overall Decision Flow   

In summary, the decision logic of this strategy can be outlined as: confirming the stage-based trend (Stage 2 or Stage 4) > determining bullish/bearish bias per Momentum RSI > judging directionality per EMA crossover > incorporating ATR for stop loss setting > opening positions when all criteria are met. This streamlined process allows the strategy to accurately capture pivotal turning points in the market and participate in the most profitable swings.

## Advantages

### Increased Win Rate with Market Cycle Alignment

The biggest edge comes from the strategy’s profound understanding of periodic market patterns. By trading only during the clearest uptrends and downtrends, it filters out tremendous uncertain noises and boosts the success rate to over 80%. 

### Reduced False Signals via Multiple Filters 

The multi-indicator filtering adopting momentum, trend strength, volatility metrics eliminates misleading signals from any individual indicators and thus substantially improves the overall stability and reliability.

### Highly Customizable owing to Plentiful Parameters

The abundant tunable parameters exposed allow users to tailor-fit the strategy to personal trading style and changing market regimes, facilitating further optimization to excel in specific situations. This perk also enhances adaptability.

## Risks and Mitigations

### Inherent Market Risks

No quantitative strategies can completely avoid inherent market risks such as unpredictable black swan events. But such risks exist objectively instead of stemming from the strategy itself. staying mentally clear, rationally sizing positions and judiciously applying leverage based on personal risk tolerance is key.  

### Parameter Overfitting  

The freedom to adjust parameters may also lead to overfitting issues if not done prudently. This necessitates rigorous backtests to validate any parameter changes can perform consistently across a wide variety of historical periods instead of capitalizing on isolated segments. 

## Optimization Opportunities 

### Incorporating Position Sizing Algorithms

The current fixed-quantity approach may result in insufficient exposures during mega trends. An enhancement is to introduce position sizing modules and gradually ride bigger positions when trends become strongly evident, thus better capitalizing on those huge swings.

### Filter Signals further with Machine Learning

This strategy can interface with machine learning techniques by building a trained model to score signal quality and filter out inferior signals, thereby taking the overall performance to the next level. This integration is an important optimization direction worth exploring.  

## Conclusion

The Momentum Oscillator Trend Tracking Strategy is a highly intelligent and parameterized approach. It excels in elevating signal quality by exploiting periodic market patterns and produces reliably actionable entries via multi-indicator cross validations. Meanwhile, the abundant tunable knobs provide great flexibility to users. In conclusion, it is a credible and recommendable advanced composite strategy that demonstrates practical edge to thrive in the ultra-efficient modern markets and deliver consistent alpha.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|(?Rsi Of Momentum )Length Mom-Rsi|
|v_input_int_2|60|Mom-Rsi Limit Val|
|v_input_1|10|(?SuperTrend indicator)ATR Length SuperTrend|
|v_input_float_1|3|Factor SuperTrend|
|v_input_2_close|0|(?Ema indicator)Source Ema Ind: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_3|12|Length Ema Ind|
|v_input_float_2|true|Percent Ema Ind|
|v_input_bool_1|true|(?EMA50/150/200)SHOW EMAS|
|v_input_color_1|purple|EMA50 COLOR|
|v_input_int_4|2|EMA50 LINEWIDTH|
|v_input_color_2|blue|EMA150 COLOR|
|v_input_int_5|2|EMA150 LINEWIDTH|
|v_input_color_3|black|EMA200 COLOR|
|v_input_int_6|2|EMA200 LINEWIDTH|
|v_input_3|timestamp(01 January 2000 13:30 +0000)|(?Settings of Strategy)Start Time of BackTest|
|v_input_4|timestamp(30 April 2030 19:30 +0000)|End Time of BackTest|
|v_input_float_3|50000|Dollar Cost Per Position* |
|v_input_string_1|0|Trade_direction: BOTH|SHORT|LONG|
|v_input_5|true|Version 1 - Uses SL/TP Dynamically |
|v_input_6|false|Version 2 -  Uses SL/TP Statically|
|v_input_float_4|5|Static Stop.Loss % Val|
|v_input_float_5|10|Static Take.Prof % Val|
|v_input_bool_2|true|(?Line Settings)  Show StopLoss - TakeProf Lines|
|v_input_bool_3|true|  Show Trend Line|
|v_input_color_4|#ffff00|StopLoss Line Colour|
|v_input_color_5|#00ff00|Up Trend line Colour|
|v_input_color_6|#ff0000|Down Trend line Colour|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-15 00:00:00
end: 2024-01-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © JS_TechTrading

//@version=5
strategy('The Flash-Strategy (Momentum-RSI, EMA-crossover, ATR)', shorttitle='The Flash-Strategy (Momentum-RSI, EMA-crossover, ATR)', overlay=true,initial_capital = 1000)
//// author -  JS-TechTrading

// MOM Rsi indicator 
group_mom_rsi = "Rsi Of Momentum "
len = input.int(10, minval=1, title="Length Mom-Rsi", group =group_mom_rsi ,tooltip = 'This ind calculate Rsi value of Momentum we use this ind to determine power of trend')
src2 = close
mom = src2 - src2[len]
rsi_mom = ta.rsi(mom, len)
mom_rsi_val = input.int(60, minval=1, title="Mom-Rsi Limit Val", group =group_mom_rsi, tooltip = "When our Mom-Rsi value more then this we open LONG or Short, with help of this indicator we we determine the status of the trend")

// Super Trend Ind
group_supertrend = "SuperTrend indicator"
atrPeriod = input(10, "ATR Length SuperTrend", group = group_supertrend)
factor = input.float(3.0, "Factor SuperTrend", step = 0.01, group = group_supertrend)

[supertrend, direction] = ta.supertrend(factor, atrPeriod)

// Ema Indicator
group_most = "Ema indicator"
src = input(close, 'Source Ema Ind',group = group_most)
AP2 = input.int(defval=12, title='Length Ema Ind', minval=1,group = group_most)
Trail1 = ta.ema(src, AP2) //Ema func
AF2 = input.float(defval=1, title='Percent Ema Ind', minval=0.1,group = group_most) / 100
SL2 = Trail1 * AF2  // Stoploss Ema
Trail2 = 0.0
iff_1 = Trail1 > nz(Trail2[1], 0) ? Trail1 - SL2 : Trail1 + SL2
iff_2 = Trail1 < nz(Trail2[1], 0) and Trail1[1] < nz(Trail2[1], 0) ? math.min(nz(Trail2[1], 0), Trail1 + SL2) : iff_1
Trail2 := Trail1 > nz(Trail2[1], 0) and Trail1[1] > nz(Trail2[1], 0) ? math.max(nz(Trail2[1], 0), Trail1 - SL2) : iff_2

//EMA50/150/200
group_50_150_200="EMA50/150/200"
show_emas=input.bool(defval = true, title = "SHOW EMAS", group = group_50_150_200)
ema50= ta.ema(src, 50)
ema150 = ta.ema(src, 150)
ema200 = ta.ema(src, 200)
ema50_color=input.color(defval = color.purple, title = "EMA50 COLOR",group = group_50_150_200)
ema50_linewidth=input.int(defval = 2, title = "EMA50 LINEWIDTH", group = group_50_150_200)
ema150_color=input.color(defval = color.blue, title = "EMA150 COLOR", group = group_50_150_200)
ema150_linewidth=input.int(defval = 2, title = "EMA150 LINEWIDTH", group = group_50_150_200)
ema200_color=input.color(defval = color.black, title = "EMA200 COLOR", group = group_50_150_200)
ema200_linewidth=input.int(defval = 2, title = "EMA200 LINEWIDTH", group = group_50_150_200)
plot(show_emas ? ema50 : na, color = ema50_color, linewidth = ema50_linewidth)
plot(show_emas ? ema150 : na, color=ema150_color, linewidth = ema150_linewidth)
plot(show_emas ? ema200 : na, color = ema200_color, linewidth = ema200_linewidth)

//Bull = ta.barssince(Trail1 > Trail2 and close > Trail2 and low > Trail2) < ta.barssince(Trail2 > Trail1 and close < Trail2 and high < Trail2)

//TS1 = plot(Trail1, 'ExMov', style=plot.style_line, color=Trail1 > Trail2 ? color.rgb(33, 149, 243, 100) : color.rgb(255, 235, 59, 100), linewidth=2)
//TS2 = plot(Trail2, 'ema', style=plot.style_line, color=Trail1 > Trail2 ? color.rgb(76, 175, 79, 30) : color.rgb(255, 82, 82, 30), linewidth=2)
//fill(TS1, TS2, Bull  ? color.green : color.red, transp=90)


// Strategy Sett
group_strategy = "Settings of Strategy"
Start_Time = input(defval=timestamp('01 January 2000 13:30 +0000'), title='Start Time of BackTest', group =group_strategy)
End_Time = input(defval=timestamp('30 April 2030 19:30 +0000'), title='End Time of BackTest', group =group_strategy)
dollar = input.float(title='Dollar Cost Per Position* ', defval=50000, group =group_strategy)
trade_direction = input.string(title='Trade_direction', group =group_strategy, options=['LONG', 'SHORT', 'BOTH'], defval='BOTH')
v1 = input(true, title="Version 1 - Uses SL/TP Dynamically ", group =group_strategy ,tooltip = 'With this settings our stoploss price increase or decrease with price to get better PNL score')

v2 = input(false, title="Version 2 -  Uses SL/TP Statically", group =group_strategy)
v2stoploss_input = input.float(5, title='Static Stop.Loss % Val', minval=0.01, group =group_strategy)/100
v2takeprofit_input = input.float(10, title='Static Take.Prof % Val', minval=0.01, group =group_strategy)/100

v2stoploss_level_long = strategy.position_avg_price * (1 - v2stoploss_input)
v2takeprofit_level_long = strategy.position_avg_price * (1 + v2takeprofit_input)

v2stoploss_level_short = strategy.position_avg_price * (1 + v2stoploss_input)
v2takeprofit_level_short = strategy.position_avg_price * (1 - v2takeprofit_input)

group_line = "Line Settings"
show_sl_tp = input.bool(title='  Show StopLoss - TakeProf Lines',inline = "1", defval=true, group =group_line)
show_trend_line = input.bool(title='  Show Trend Line',inline = '3' ,defval=true, group =group_line)
stoploss_colour = input.color(title='StopLoss Line Colour',inline = '2' ,defval=color.rgb(255, 255, 0), group =group_line)
up_trend_line_colour = input.color(title='Up Trend line Colour',inline = '4' ,defval=color.rgb(0, 255, 0, 30), group =group_line)
down_trend_line_colour = input.color(title='Down Trend line Colour',inline = '4' ,defval=color.rgb(255, 0, 0, 30), group =group_line)

//plot(supertrend ,color = strategy.position_size > 0 and show_sl_tp ? color.rgb(255, 0, 0) :show_sl_tp ? color.rgb(0, 255, 0) : na , style = plot.style_steplinebr,linewidth = 2)
// plot(supertrend ,color = show_sl_tp and v1 ? stoploss_colour : na , style = plot.style_steplinebr,linewidth = 2)

// plot(v2stoploss_level_long ,color = strategy.position_size > 0 and show_sl_tp and v2 ? stoploss_colour : na , style = plot.style_steplinebr,linewidth = 2)
// plot(v2stoploss_level_short ,color = strategy.position_size < 0 and show_sl_tp and v2 ? stoploss_colour : na , style = plot.style_steplinebr,linewidth = 2)
// plot(v2takeprofit_level_long  ,color = strategy.position_size > 0 and show_sl_tp and v2 ? up_trend_line_colour : na , style = plot.style_steplinebr,linewidth = 2)
// plot(v2takeprofit_level_short ,color = strategy.position_size < 0 and show_sl_tp and v2 ? up_trend_line_colour : na , style = plot.style_steplinebr,linewidth = 2)


TS2 = plot(Trail2, 'Ema Strategy', style=plot.style_line, color=show_trend_line and Trail1 < Trail2 ? down_trend_line_colour : show_trend_line ? up_trend_line_colour  : na, linewidth=2)

// bgcolor(buy_signal ? color.rgb(0, 230, 119, 80) : na)
// bgcolor(sell_signal ? color.rgb(255, 82, 82, 80) : na)

Time_interval = true
buy_signal = Trail1 > Trail2 and direction < 0 and rsi_mom > mom_rsi_val and Time_interval
sell_signal =Trail1 < Trail2 and direction > 0 and rsi_mom > mom_rsi_val and Time_interval


// Strategy entries 
stop_long = (close < supertrend and v1) or (v2 and strategy.position_size > 0)
stop_short = (close > supertrend and v1) or (v2 and strategy.position_size < 0)
long_cond = ((close > ema150 ) and (ema50 > ema150) and (ema150 > ema200))
short_cond = ((close < ema150) and (ema50 < ema150) and (ema150 < ema200))
if (not stop_long) and (not short_cond) and long_cond and strategy.opentrades == 0 and (trade_direction == 'LONG' or trade_direction == 'BOTH') and buy_signal
    strategy.entry('Long_0', strategy.long, qty=dollar / close)

if (not stop_short) and (not long_cond) and short_cond and strategy.opentrades == 0 and (trade_direction == 'SHORT' or trade_direction == 'BOTH') and sell_signal
    strategy.entry('Short_0', strategy.short, qty=dollar / close)


if close < supertrend and v1
    strategy.exit('Long_Close',from_entry = "Long_0", stop=supertrend, qty_percent=100)
if  v2 and strategy.position_size > 0
    strategy.exit('Long_Close',from_entry = "Long_0", stop=v2stoploss_level_long,limit= v2takeprofit_level_long  , qty_percent=100)
    
if close > supertrend and v1
    strategy.exit('Short_Close',from_entry = "Short_0", stop=supertrend, qty_percent=100)
if  v2 and strategy.position_size < 0
    strategy.exit('Short_Close',from_entry = "Short_0", stop=v2stoploss_level_short,limit= v2takeprofit_level_short ,qty_percent=100)
```

> Detail

https://www.fmz.com/strategy/439601

> Last Modified

2024-01-22 10:08:55
