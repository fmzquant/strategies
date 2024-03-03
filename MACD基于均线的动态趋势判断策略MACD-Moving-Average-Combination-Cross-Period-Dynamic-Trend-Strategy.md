
> Name

MACD基于均线的动态趋势判断策略MACD-Moving-Average-Combination-Cross-Period-Dynamic-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1aedddeb93e1e078ca9.png)
[trans] 
## 概述

该策略基于MACD指标的均线组合,实现跨时间周期的动态趋势判断,属于较为经典的趋势跟踪策略。主要通过快慢均线的差值MACD和其信号线的关系,判断目前趋势方向和力度。同时引入跨周期判断来提高准确性,动态调整仓位。

## 策略原理  

1. 基于MACD指标快慢均线差值及其信号线关系判断目前趋势方向  
2. MACD差值上穿信号线为做多信号,下穿为做空信号  
3. 引入MACD差值和MACD柱状线同向为策略信号增强  
4. 增加跨周期判断模块,取较高时间周期MACD指标作为信号滤波和仓位调节依据  
5. 仓位动态调整,跨周期信号较弱时减少仓位规模,信号增强时增加仓位  

## 优势分析  

1. MACD指标本身判断趋势方向的有效性较高  
2. 组合MACD差值和柱状线双重验证,可以提高信号准确率  
3. 跨周期判断提高策略的稳定性,避免被高频信号误导  
4. 动态仓位调整使得策略更好的把握机会,提高超额收益  

## 风险分析及解决方法  

1. MACD信号产生滞后,可能导致信号效果略差  
- 解决方法:增加快速均线和慢速均线差值判断以提前捕捉到信号  
2. 跨周期信号不一定准确,可能误导策略  
- 解决方法:引入仓位动态调整机制,让主周期策略占主导地位  
3. 多因子组合策略整体稳定性可能不足   
- 解决方法:仔细调整各项策略参数比重占比,确保整体稳健性  

## 优化方向  

1. 测试不同的周期参数组合效果
2. 测试不同跨周期组合对策略效果的影响  
3. 调整MACD指标参数,如快慢均线周期,信号线周期等
4. 测试不同仓位调节因子的效果
5. 测试在其他品种上的回测效果

## 总结  

该MACD均线组合跨周期动态趋势策略,整合了经典指标判断和多时间框架参考的优势。通过参数优化和组合测试,可以构建一个较为稳定、收益良好的趋势跟踪策略。值得实盘测试和投入应用。 

||

## Overview  

This strategy is based on the combination of moving averages of the MACD indicator to realize dynamic trend judgment across time periods. It belongs to a more classic trend tracking strategy. It mainly judges the current trend direction and strength through the difference between fast and slow moving averages of MACD and the relationship between its signal line. At the same time, cross-period judgment is introduced to improve accuracy and dynamically adjust positions.

## Strategy Principle   

1. Judge the current trend direction based on the difference between the fast and slow moving averages of the MACD indicator and its signal line relationship.  
2. The MACD difference crossing above the signal line is a long signal, and crossing below is a short signal.
3. Introduce MACD difference and MACD histogram in the same direction to enhance strategy signals.  
4. Add a cross-cycle judgment module, use the MACD indicator of a higher time frame as a signal filter and position adjustment basis.
5. Dynamic position adjustment, reduce position size when cross-cycle signal is weaker, and increase position when signal is enhanced.

## Advantage Analysis   

1. The effectiveness of MACD itself in determining trend direction is relatively high.  
2. The combination of MACD difference and histogram double verification can improve signal accuracy.
3. Cross-cycle judgment enhances strategy stability and avoids being misled by high-frequency signals.  
4. Dynamic position adjustment enables the strategy to better grasp opportunities and increase excess returns.   

## Risk Analysis and Solutions  

1. MACD signals have lag, which may lead to slightly inferior signal effects.  
- Solution: Increase the difference between fast and slow moving averages to capture signals in advance.  
2. Cross-cycle signals are not necessarily accurate and may mislead strategies.
- Solution: Introduce a dynamic position adjustment mechanism to ensure that the main cycle strategy dominates.   
3. The overall stability of multi-factor combined strategies may be insufficient.
- Solution: Carefully adjust the proportion of each strategy parameter weight to ensure overall robustness.   

## Optimization Directions   

1. Test the effects of different cycle parameter combinations.
2. Test the impact of different cross-cycle combinations on strategy effectiveness.   
3. Adjust MACD indicator parameters, such as fast and slow moving average cycles, signal line cycles, etc.  
4. Test the effects of different position adjustment factors.  
5. Test backtest effects on other varieties.  

## Summary   

This MACD moving average combination cross-period dynamic trend strategy integrates the advantages of classic indicators and multi-time frame references. Through parameter optimization and combination testing, a relatively stable and profitable trend tracking strategy can be constructed. It is worth real-money testing and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|12|MACD Fast Length|
|v_input_int_2|26|MACD Slow Length|
|v_input_int_3|9|MACD Signal Length|
|v_input_1|10|Cross (buy/sell) Score|
|v_input_2|8|indicator Direction Score|
|v_input_3|2|Histogram Direction Score|
|v_input_4|false|Show Stop Loss Line|
|v_input_float_1|1.2|Stop Loss Factor|
|v_input_int_4|10|Stop Loss Period|
|v_input_5|true|Lookahead|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-12 00:00:00
end: 2024-02-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@temelbulut
//@version=5
strategy('MACD Strategy %80', overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=50)

fastLength = input.int(title='MACD Fast Length', defval=12, minval=1)
slowLength = input.int(title='MACD Slow Length', defval=26, minval=1)
signalLength = input.int(title='MACD Signal Length', defval=9, minval=1)
crossscore = input(title='Cross (buy/sell) Score', defval=10.)
indiside = input(title='indicator Direction Score', defval=8)
histside = input(title='Histogram Direction Score', defval=2)
shotsl = input(title='Show Stop Loss Line', defval=false)
Mult = input.float(title='Stop Loss Factor', defval=1.2, minval=0.1, maxval=100)
Period = input.int(title='Stop Loss Period', defval=10, minval=1, maxval=100)
lookaheadi = input(title='Lookahead', defval=true)

HTF = timeframe.period == '1' ? '5' : timeframe.period == '3' ? '15' : timeframe.period == '5' ? '15' : timeframe.period == '15' ? '60' : timeframe.period == '30' ? '60' : timeframe.period == '45' ? '60' : timeframe.period == '60' ? '240' : timeframe.period == '120' ? '240' : timeframe.period == '180' ? '240' : timeframe.period == '240' ? 'D' : timeframe.period == 'D' ? 'W' : 'W'

calc = timeframe.period == '1' ? 5 : timeframe.period == '3' ? 5 : timeframe.period == '5' ? 3 : timeframe.period == '15' ? 4 : timeframe.period == '30' ? 4 : timeframe.period == '45' ? 4 : timeframe.period == '60' ? 4 : timeframe.period == '120' ? 3 : timeframe.period == '180' ? 3 : timeframe.period == '240' ? 6 : timeframe.period == 'D' ? 5 : 1

count() =>
    indi = ta.ema(close, fastLength) - ta.ema(close, slowLength)
    signal = ta.ema(indi, signalLength)
    Anlyse = 0.0
    // direction of indi and histogram
    hist = indi - signal
    Anlyse := indi > indi[1] ? hist > hist[1] ? indiside + histside : hist == hist[1] ? indiside : indiside - histside : 0
    Anlyse += (indi < indi[1] ? hist < hist[1] ? -(indiside + histside) : hist == hist[1] ? -indiside : -(indiside - histside) : 0)
    Anlyse += (indi == indi[1] ? hist > hist[1] ? histside : hist < hist[1] ? -histside : 0 : 0)
    // cross now earlier ?
    countcross = indi >= signal and indi[1] < signal[1] ? crossscore : indi <= signal and indi[1] > signal[1] ? -crossscore : 0.
    countcross += nz(countcross[1]) * 0.6
    Anlyse += countcross
    nz(Anlyse)

Anlys = count()
AnlysHfrm = lookaheadi ? request.security(syminfo.tickerid, HTF, count(), lookahead=barmerge.lookahead_on) : request.security(syminfo.tickerid, HTF, count(), lookahead=barmerge.lookahead_off)
Result = (AnlysHfrm * calc + Anlys) / (calc + 1)

longCondition = ta.change(Result) != 0 and Result > 0
if longCondition
    strategy.entry('MACD Long', strategy.long,alert_message = 'MACD Long')

shortCondition = ta.change(Result) != 0 and Result < 0
if shortCondition
    strategy.entry('MACD Short', strategy.short,alert_message = 'MACD Short')

countstop(pos) =>
    Upt = hl2 - Mult * ta.atr(Period)
    Dnt = hl2 + Mult * ta.atr(Period)
    TUp = 0.
    TDown = 0.
    TUp := close[1] > TUp[1] ? math.max(Upt, TUp[1]) : Upt
    TDown := close[1] < TDown[1] ? math.min(Dnt, TDown[1]) : Dnt
    tslmtf = pos == 1 ? TUp : TDown
    tslmtf

pos = longCondition ? 1 : -1
stline = 0.
countstop__1 = countstop(pos)
security_1 = request.security(syminfo.tickerid, HTF, countstop__1)
stline := ta.change(time(HTF)) != 0 or longCondition or shortCondition ? security_1 : nz(stline[1])
plot(stline, color=shotsl ? color.rgb(148, 169, 18) : na, style=plot.style_line, linewidth=2, title='Stop Loss')


```

> Detail

https://www.fmz.com/strategy/442080

> Last Modified

2024-02-19 10:48:11
