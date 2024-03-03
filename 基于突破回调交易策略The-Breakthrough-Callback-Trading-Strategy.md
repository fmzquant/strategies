
> Name

基于突破回调交易策略The-Breakthrough-Callback-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ac51030ac10a407833.png)
[trans]
## 概述

突破回调交易策略通过计算价格的绝对强度指标和MACD指标,实现在特定趋势下的突破回调交易,属于短线交易策略。该策略综合多个指标对大趋势、中期趋势和短期趋势进行判断,通过趋势同向且指标互补确认信号,进行趋势跟踪交易。

## 策略原理  

该策略主要基于价格绝对强度指标和MACD指标实现突破回调交易。首先计算价格的9周期、21周期和50周期EMA,判断大趋势方向;然后计算价格的绝对强度指标,反映短期调整力度;最后计算MACD指标判断短期趋势方向。当大趋势为上涨,且短期出现调整时买入;当大趋势为下跌,且短期出现反弹时卖出。

具体来说,品种大趋势为上涨需满足9日EMA高于21日EMA,21日EMA高于50日EMA。短期调整判断标准为绝对强度指标差值低于0,MACDDIFF小于0。品种大趋势为下跌需满足9日EMA低于21日EMA,21日EMA低于50日EMA。短期反弹判断标准为绝对强度指标差值高于0,MACDDIFF高于0。

## 优势分析

该策略具有以下优势:

1. 结合大趋势和短期调整,避免假突破
2. 多个指标组合使用,可靠性较高  
3. 绝对强度指标反映调整力度,判断回调质量
4. MACD可判断短期趋势和超买超卖区域

## 风险分析  

该策略也存在一些风险:  

1. 大趋势判断错误,可能导致交易失败
2. 回调时间和力度判断错误,可能无效回调
3. 极端行情下指标发散,产生错误信号

针对以上风险,可通过优化参数,判断不同周期指标;调整持仓规则,控制单笔亏损;结合更多指标过滤信号,提高准确率等方法进行改进。

## 优化方向  

该策略可从以下几个方面进行优化:

1. 测试更多指标的组合,寻找更匹配的交易策略
2. 优化指标参数,提高指标的敏感性
3. 调整止损方式,降低单笔亏损最大值
4. 增加过滤条件,在更有效的区域发出信号
5. 结合更多时间周期指标判断,提高判断准确性

## 总结  

综上所述,突破回调交易策略整体是一个较为稳定的短线交易策略。它结合大中短多重趋势判断,避免在震荡行情中错误交易。同时指标组合使用也提高了判断的准确性。通过后续的测试和优化,该策略可以成为一个值得长期持有的稳定策略。

||

## Overview  

The breakthrough callback trading strategy realizes breakthrough callback trading under specific trends by calculating the absolute strength index and MACD index of prices. It belongs to short-term trading strategies. This strategy integrates multiple indicators to judge major trends, medium-term trends and short-term trends. It conducts trend tracking transactions through trend-aligned and indicator-complementary confirmation signals.

## Strategy Principle    

This strategy mainly relies on the absolute strength index and MACD index of prices to implement breakthrough callback trading. Firstly, it calculates the 9-period, 21-period and 50-period EMAs of prices to judge the major trend direction; then it calculates the absolute strength index of prices to reflect the strength of short-term adjustments; finally it calculates the MACD index to judge the short-term trend direction. It buys when the major trend is upward and there is a short-term adjustment; it sells when the major trend is downward and there is a short-term rebound.    

Specifically, the major upward trend of the variety requires the 9-day EMA to be higher than the 21-day EMA, and the 21-day EMA to be higher than the 50-day EMA. The criteria for judging short-term adjustments are that the difference of the absolute strength index is less than 0 and MACDDIFF is less than 0. The major downward trend of the variety requires the 9-day EMA to be lower than the 21-day EMA, and the 21-day EMA to be lower than the 50-day EMA. The criteria for judging short-term rebounds are that the difference of the absolute strength index is greater than 0 and MACDDIFF is greater than 0.  

## Advantage Analysis   

The strategy has the following advantages:  

1. Combining major trends and short-term adjustments to avoid false breakouts  
2. Higher reliability with combination of multiple indicators    
3. The absolute strength index reflects the strength of adjustments to judge the quality of callbacks  
4. MACD can judge short-term trends and overbought/oversold areas  

## Risk Analysis   

The strategy also has some risks:   

1. Wrong judgement of major trends may lead to trade failure  
2. Wrong judgement of callback time and strength may lead to invalid callback  
3. Divergence of indicators in extreme market conditions, resulting in wrong signals  

In response to the above risks, methods such as optimizing parameters, judging indicators of different cycles, adjusting position rules to control single loss, combining more indicators to filter signals, and improving accuracy can be used to improve the strategy.  

## Optimization Directions  

The strategy can be optimized in the following aspects:  

1. Test more indicator combinations to find more suitable trading strategies  
2. Optimize indicator parameters to improve indicator sensitivity  
3. Adjust stop loss methods to reduce maximum single loss  
4. Increase filtering conditions to issue signals in more effective areas   
5. Combine more time frame indicators to improve judgement accuracy  

## Summary   

In summary, the breakthrough callback trading strategy is generally a relatively stable short-term trading strategy. It combines multi-timeframe trend judgments to avoid erroneous transactions in oscillating markets. At the same time, the combined use of indicators also improves the accuracy of judgments. Through subsequent testing and optimization, this strategy can become a stable strategy worth holding for the long term.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|long entry message|message_long_entry|
|v_input_2|long exit message|message_long_exit|
|v_input_3|short entry message|message_short_entry|
|v_input_4|short exit message|message_short_exit|
|v_input_5|23|Fast Length|
|v_input_6|11|Slow Length|
|v_input_7_open|0|Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|6|Signal Smoothing|
|v_input_string_1|0|Oscillator MA Type: EMA|SMA|
|v_input_string_2|0|Signal Line MA Type: SMA|EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5 
strategy("Divergence Scalper [30MIN]", overlay=true , commission_value=0.04 ) 
message_long_entry = input("long entry message") 
message_long_exit = input("long exit message") 
message_short_entry = input("short entry message") 
message_short_exit = input("short exit message") 
//3x ema 
out9 = ta.ema(close,9) 
out21 = ta.ema(close,21) 
out50 = ta.ema(close,50) 
//abs 
absolute_str_formula( ) => 
    top=0.0 
    bottom=0.0 
    if(close>close[1]) 
        top:= nz(top[1])+(close/close[1]) 
    else 
        top:=nz(top[1]) 
    if(close<=close[1]) 
        bottom:= nz(bottom[1])+(close[1]/close) 
    else 
        bottom:=nz(bottom[1]) 
    if (top+bottom/2>=0) 
        1-1/(1+(top/2)/(bottom/2)) 
abs_partial=absolute_str_formula() 
abs_final = abs_partial - ta.sma(abs_partial,50) 
//macd 
fast_length = input(title="Fast Length", defval=23) 
slow_length = input(title="Slow Length", defval=11) 
src = input(title="Source", defval=open) 
signal_length = input.int(title="Signal Smoothing", minval = 1, maxval = 50, defval = 6) 
sma_source = input.string(title="Oscillator MA Type", defval="EMA", options=["SMA", "EMA"]) 
sma_signal = input.string(title="Signal Line MA Type", defval="SMA", options=["SMA", "EMA"]) 
// Calculating 
fast_ma = sma_source == "SMA" ? ta.sma(src, fast_length) : ta.ema(src, fast_length) 
slow_ma = sma_source == "SMA" ? ta.sma(src, slow_length) : ta.ema(src, slow_length) 
macd = fast_ma - slow_ma 
signal = sma_signal == "SMA" ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length) 
hist = macd - signal 
long= abs_final > 0 and hist <0 and out9<out21 and out21<out50 
short = abs_final <0 and hist >0 and out9>out21 and out21>out50 
long_exit = abs_final <0 and hist >0 and out9>out21 and out21>out50 
short_exit = abs_final > 0 and hist <0 and out9<out21 and out21<out50 
strategy.entry("long", strategy.long, when = long and barstate.isconfirmed, alert_message = message_long_entry) 
strategy.entry("short", strategy.short, when = short and barstate.isconfirmed, alert_message = message_short_entry) 
strategy.close("long", when = long_exit and barstate.isconfirmed, alert_message = message_long_exit) 
strategy.close("short", when = short_exit and barstate.isconfirmed, alert_message = message_short_exit) 

```

> Detail

https://www.fmz.com/strategy/443042

> Last Modified

2024-02-28 18:01:56
