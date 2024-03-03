
> Name

动量指标驱动的三重确认趋势跟踪策略The-Momentum-Driven-Triple-Confirmation-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/199b6c7fac7bd6081bb.png)
[trans]

### 概述

本策略采用三重确认机制生成交易信号,即动量指标确认市场趋势强劲,超级趋势指标确认趋势方向,以及EMA指标作为确认趋势方向的额外验证。只有当这三个指标都满足条件时,策略才会生成做多或做空的交易信号,从而确保只选择高概率的交易机会。

### 策略原理

1. 动量指标(Momentum RSI)

    * 动量RSI指标用于判断市场趋势的力度。当读数大于60时表示市场趋势强劲。

    * 只有在剧烈的牛市和熊市中才产生交易信号。

2. 超级趋势分析

    * 超级趋势线代表市场趋势的方向。只在价格突破超级趋势线时才考虑建仓。

    * 当价格从下向上突破超级趋势线时,转换为多头趋势;当价格从上向下突破时,转换为空头趋势。

3. EMA策略

    * EMA及其辅助趋势线用于确认趋势方向。买入信号仅在EMA向上突破辅助趋势线时出现,空头信号则相反。

只有当这三个指标同时符合建仓条件时,才会发出真正的交易信号。这就大大减少了假信号的数量,提高了策略的稳定性。

### 优势分析  

该策略具有极高的稳定性和盈利概率。主要优势有:

1. 多重确认机制,有效过滤噪音,只选择高概率交易。

2. 超级趋势线动态跟踪止损,有效控制风险。

3. 结合趋势力度判定,只在强劲趋势中交易,避免额外风险。  

4. EMA指标额外验证确保交易方向正确。

5. 完全参数化,各类交易者都可以按需自定义。

### 风险分析

该策略主要风险来自异常突破造成的错误交易信号。 主要风险及解决方法包括:  

1. 假突破风险:增加突破验证机制。

2. 震荡范围变大风险:适当调整止损范围。  

3. 趋势反转风险:缩短持仓周期,及时止损。

### 优化方向

该策略主要可以从以下几个方向进行优化:

1. 优化参数:调整指标参数,适应更多品种。

2. 增加过滤:结合更多指标,提升信号质量。  

3. 复合策略:与其他策略组合,利用优势互补。

4. 动态调参:根据市场环境自动调整参数。

5. 机器学习:使用算法自动寻找最优参数。

### 总结

本策略通过动量指标、超级趋势以及EMA的有效结合,实现了多重确认的高概率交易策略。严格的突破验证机制也使其拥有极强的稳定性。同时也具备非常高的可定制性和优化空间。总的来说,该策略融合了趋势跟踪和断裂型交易的优点,是一种非常有前景的算法交易策略。

|| 

### Overview  

This strategy generates trading signals using a triple confirmation mechanism, i.e. the momentum indicator confirms strong market trend, the Supertrend indicator confirms trend direction, and the EMA indicator provides additional verification of trend direction. Only when all three indicators meet the criteria will the strategy generate long or short trading signals, thus ensuring only high probability trading opportunities are selected.

### Strategy Principle  

1. Momentum Indicator (Momentum RSI)

    * The Momentum RSI indicator is used to determine the strength of the market trend. Readings above 60 indicate a strong market trend.  

    * Trading signals are only generated during intense bull or bear markets.  

2. Supertrend Analysis

    * The Supertrend line represents market trend direction. Positions are only considered when the price breaks through the Supertrend line.  

    * When the price breaks through the Supertrend line upwards, it is converted to an uptrend; when it breaks downwards it converts to a downtrend.

3. EMA Strategy  

    * The EMA and its auxiliary trend lines are used to confirm trend direction. Buy signals only appear when the EMA breaks upwards through the auxiliary trend line, and short signals are the opposite.

Only when all three indicators simultaneously meet the position opening conditions will genuine trading signals be issued. This greatly reduces the number of false signals and improves the stability of the strategy.

### Advantage Analysis   

The strategy has extremely high stability and profitability. The main advantages are:  

1. Multiple confirmation mechanisms effectively filter noise and only select high probability trades. 

2. The Supertrend line has a dynamic trailing stop loss to effectively control risk.  

3. Combined with trend strength judgment, only trading in strong trends avoids additional risk.

4. EMA indicator provides additional verification to ensure trade direction is correct. 

5. Fully parameterized so traders can customize as needed.


### Risk Analysis

The main risks of this strategy come from abnormal breakouts causing erroneous trade signals. The main risks and solutions include:

1. False breakout risk: Increase breakout verification mechanisms.  

2. Larger oscillation range risk: Appropriately adjust stop loss range.

3. Trend reversal risk: Shorten holding period, timely stop loss.


### Optimization Directions  

The main directions for optimizing this strategy include:  

1. Parameter optimization: Adjust indicator parameters to suit more varieties. 

2. Increased filtering: Combine more indicators to improve signal quality.

3. Composite strategies: Combine with other strategies to utilize complementary advantages.  

4. Dynamic parameter adjustment: Automatically adjust parameters based on market conditions.  

5. Machine learning: Use algorithms to automatically find optimal parameters.


### Summary

This strategy achieves a high probability trading strategy with multiple confirmations by effectively combining momentum, Supertrend and EMA indicators. Its strict breakout verification mechanism also gives it extremely strong stability. At the same time, it has very high customizability and optimization potential. In summary, this strategy integrates the advantages of trend following and breakout trading, making it a very promising algorithmic trading strategy.

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
|v_input_3|timestamp(01 January 2000 13:30 +0000)|(?Settings of Strategy)Start Time of BackTest|
|v_input_4|timestamp(30 April 2030 19:30 +0000)|End Time of BackTest|
|v_input_float_3|50000|Dollar Cost Per Position* |
|v_input_string_1|0|Trade_direction: BOTH|SHORT|LONG|
|v_input_5|true|Version 1 - Uses SL/TP Dynamically |
|v_input_6|false|Version 2 -  Uses SL/TP Statically|
|v_input_float_4|5|Static Stop.Loss % Val|
|v_input_float_5|10|Static Take.Prof % Val|
|v_input_bool_1|true|(?Line Settings)  Show StopLoss - TakeProf Lines|
|v_input_bool_2|true|  Show Trend Line|
|v_input_color_1|#ffff00|StopLoss Line Colour|
|v_input_color_2|#00ff00|Up Trend line Colour|
|v_input_color_3|#ff0000|Down Trend line Colour|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-29 00:00:00
end: 2024-01-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('The Flash-Strategy (Momentum-RSI, EMA-crossover, ATR)', shorttitle='The Flash-Strategy (Momentum-RSI, EMA-crossover, ATR)', overlay=true,initial_capital = 1000)
//// author -  Baby_whale_to_moon

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
if strategy.opentrades == 0 and buy_signal and ( trade_direction == 'LONG' or trade_direction == 'BOTH')
    strategy.entry('Long_0', strategy.long, qty=dollar / close)

if strategy.opentrades == 0 and sell_signal and ( trade_direction == 'SHORT' or trade_direction == 'BOTH')
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

https://www.fmz.com/strategy/437789

> Last Modified

2024-01-05 15:46:21
