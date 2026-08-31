
> Name

基于突破回调交易策略The-Breakthrough-Callback-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ac51030ac10a407833.png)

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
