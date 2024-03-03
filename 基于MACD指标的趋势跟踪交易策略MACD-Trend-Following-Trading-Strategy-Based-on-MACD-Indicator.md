
> Name

基于MACD指标的趋势跟踪交易策略MACD-Trend-Following-Trading-Strategy-Based-on-MACD-Indicator

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于MACD指标判断趋势方向,并结合Stoch指标进行具体的买入卖出操作。策略采用较长周期的MACD判断大趋势,较短周期的Stoch进行入市出场。

## 策略原理

1. 使用MACD指标判断大趋势方向

    - 计算长周期EMA快线、慢线和MACD柱状线
    
    - 比较不同周期MACD的变化情况,判断趋势方向
    
2. 使用Stoch指标确定具体买卖点

    - 计算%K线和%D线
    
    - Stoch在超买超卖区附近出现背离,并回抬,作为买入卖出信号

3. 结合趋势方向和Stoch信号,进行买入卖出操作

    - 大周期MACD上涨时,Stoch买入信号出现,做多
    
    - 大周期MACD下跌时,Stoch卖出信号出现,做空
    
4. 设置止损止盈,优化资金管理

## 优势分析

- 该策略结合趋势跟踪和超买超卖指标,能够有效抓住中长线趋势

- MACD判断大方向,Stoch进行交易细节,可有效控制风险

- 充分利用指标之间的组合,形成指标策略

- 设置止损止盈机制,对交易风险进行管理

- 策略参数可进行优化,适用于不同市场环境

## 风险分析

- 中长线趋势判断可能存在错误,导致逆势交易亏损

- Stoch指标产生假信号,使盈利不足或出现亏损

- 趋势变化时,止损点可能被突破,扩大亏损

- 盈利目标过大过小都会影响策略效果

- 参数不当及不适应市场环境变化,会导致策略失效

- 可通过优化趋势判断方法,验证Stoch信号,调整止损止盈位置等方式降低风险

## 优化方向

- 优化MACD参数组合,提高对趋势的判断精确度

- 考虑多时间周期的Stoch指标,避免假信号

- 动态调整止损止盈比例,适应市场波动

- 结合其他指标信号进行 verifies,提高信号有效性

- 根据不同品种特点和交易时段,参数进行优化

- 增加机器学习算法,辅助判断趋势方向

- 结合量能指标,避免不充分或过度追涨跌

## 总结

该策略整合MACD和Stoch两个指标优势,在控制风险的前提下,抓取中长线趋势进行交易。通过参数优化、止损止盈设定、信号验证等方式强化策略效果,可适应多种市场环境,具有实际交易价值。优化空间还存在,可继续优化参数设定,提高信号准确度,并辅以机器学习等手段,使策略更全面、智能。

||

## Overview

This strategy identifies trend direction based on MACD indicator and makes specific buy and sell decisions using Stoch indicator. It adopts long cycle MACD to determine major trend and short cycle Stoch for entries and exits.

## Strategy Logic

1. Judging major trend direction using MACD indicator

    - Calculating fast EMA, slow EMA and MACD histogram
    
    - Comparing MACD movements in different cycles to determine trend
    
2. Identifying specific buy and sell points using Stoch indicator

    - Calculating %K line and %D line
    
    - Divergence near overbought or oversold zone, with Stoch bouncing back as trading signals

3. Making buy and sell decisions based on trend direction and Stoch signals

    - Go long when major cycle MACD rises and Stoch buy signal appears
    
    - Go short when major cycle MACD falls and Stoch sell signal appears
    
4. Setting stop loss and take profit to optimize risk management

## Advantage Analysis 

- Combining trend following and overbought-oversold indicator helps capture mid-to-long term trends effectively

- MACD determines major direction while Stoch works out trading details, which reduces risks

- Making full use of indicator combinations to form systematic strategies

- Setting stop loss and take profit controls trading risks

- Optimizable parameters adapt to different market conditions

## Risk Analysis

- Inaccurate mid-to-long term trend judgment may lead to contrarian trading losses

- False signals from Stoch cause insufficient profit or losses

- Stop loss point may be broken when trend changes, expanding losses

- Improper profit target levels affect strategy performance 

- Ineffective parameters and failure to adapt to changing environment can invalidate the strategy

- Risks can be reduced by optimizing trend judgment, verifying Stoch signals, adjusting stop loss and take profit, etc.

## Optimization Directions

- Optimize MACD parameter mix to improve trend judgment accuracy

- Consider multi-cycle Stoch to avoid false signals

- Dynamically adjust stop loss and take profit ratios to adapt market volatility

- Add other indicator signals to verify and improve validity

- Optimize parameters based on different products' characteristics and trading sessions

- Introduce machine learning models to assist trend direction judgment

- Incorporate volume indicators to avoid insufficient chasing or excessive follow

## Conclusion

This strategy integrates the strengths of MACD and Stoch indicators to capture mid-to-long term trends while controlling risks. It can be effective in various market conditions by optimizing parameters, setting stop loss and take profit, verifying signals, etc. There is still room for improvement by further parameter tuning, improving signal accuracy, and incorporating machine learning. The strategy can be more comprehensive and intelligent.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|%D Smoothing|
|v_input_2|14|%K Length|
|v_input_3|42|%K2 Length|
|v_input_4|126|%K3 Length|
|v_input_5|378|%K4 Length|
|v_input_6|14|%K5 Length|
|v_input_7|30|%K6 Length|
|v_input_8|true|%K Smoothing|
|v_input_9|0.3|buffer|
|v_input_10|144|Fast Length|
|v_input_11|312|Slow Length|
|v_input_12_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_13|108|Signal Smoothing|
|v_input_14|0|Oscillator MA Type: EMA|SMA|
|v_input_15|0|Signal Line MA Type: EMA|SMA|
|v_input_16|30|MACDCHA步长|
|v_input_17|20|MACDCHA步长2|
|v_input_18|10|MACDCHA步长3|
|v_input_19|5|MACDCHA步长4|
|v_input_20|3|MACDCHA步长5|
|v_input_21|true|MACDCHA步长6|
|v_input_22|50|hist步长|
|v_input_23|4|做多止损 %|
|v_input_24|10|做多止盈 %|
|v_input_25|4|做空止损 %|
|v_input_26|10|做空止盈 %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-19 00:00:00
end: 2023-09-26 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

// strategy(title="自用策略v0.2",calc_on_order_fills=false,calc_on_every_tick =false, initial_capital=10000,commission_type=strategy.commission.percent, commission_value=0.00,overlay = true,default_qty_type = strategy.cash, default_qty_value = 10000)



//STOCH
periodD = input(3, title="%D Smoothing", minval=1)
periodK = input(14, title="%K Length", minval=1)
periodK2 = input(42, title="%K2 Length", minval=1)
periodK3 = input(126, title="%K3 Length", minval=1)
periodK4 = input(378, title="%K4 Length", minval=1)
periodK5 = input(14, title="%K5 Length", minval=1)
periodK6 = input(30, title="%K6 Length", minval=1)
smoothK = input(1, title="%K Smoothing", minval=1)
k = sma(stoch(close, high, low, periodK), smoothK)
k2 = sma(stoch(close, high, low, periodK2), smoothK*3)
k3 = sma(stoch(close, high, low, periodK3), smoothK*3*3)
k4 = sma(stoch(close, high, low, periodK4), smoothK*3*3*3)
d = sma(k, periodD)
all = (k+k2*3+k3*9+k4*18)/31
allp = sma(all, periodK6)



buffer = input(title="buffer", type=input.float, defval=0.3, minval = 0, step = 0.1)
b1 = close[1]* (1+buffer/100)
b2 = close[1]* (1-buffer/100)

//MACD
fast_length = input(title="Fast Length", defval=144)
slow_length = input(title="Slow Length", defval=312)

src = input(title="Source", defval=close)
signal_length = input(title="Signal Smoothing",  minval = 1, maxval = 200, defval = 108)
sma_source = input(title="Oscillator MA Type",  defval="EMA", options=["SMA", "EMA"])
sma_signal = input(title="Signal Line MA Type", defval="EMA", options=["SMA", "EMA"])

// Calculating
fast_ma = sma_source == "SMA" ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source == "SMA" ? sma(src, slow_length) : ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal
MACDCHA = input(title="MACDCHA步长", defval=30)
MACDCHA2 = input(title="MACDCHA步长2", defval=20)
MACDCHA3 = input(title="MACDCHA步长3", defval=10)
MACDCHA4 = input(title="MACDCHA步长4", defval=5)
MACDCHA5 = input(title="MACDCHA步长5", defval=3)
MACDCHA6 = input(title="MACDCHA步长6", defval=1)
HISTCHA = input(title="hist步长", defval=50)
macdcha = hist - hist[MACDCHA]
macdcha2 = hist - hist[MACDCHA2]
macdcha3 = hist - hist[MACDCHA3]
macdcha4 = hist - hist[MACDCHA4]
macdcha5 = hist - hist[MACDCHA5]
macdcha6 = hist - hist[MACDCHA6]
histcha = hist[HISTCHA]
var true2 = 0
var true2_1 = 0
var true2_2 = 0
var true2_3 = 0
var true2_4 = 0//延伸
var fangxiang =0
//确认方向
if(macdcha>=0 and macdcha2>=0 and macdcha3>=0 and macdcha4>=0 and macdcha5>=0 and macdcha6>=0)
    fangxiang := 1
    true2_2 := 0
if(macdcha<=0 and macdcha2<=0 and macdcha3<=0 and macdcha4<=0 and macdcha5<=0 and macdcha6<=0)
    fangxiang :=-1
    true2_1 := 1
//k3min = min(k3,k3[1],k3[2],k3[3],k3[4],k3[5],k3[6],k3[7],k3[8],k3[9],k3[10],k3[11],k3[12],k3[13],k3[14],k3[15],k3[16],k3[17],k3[18],k3[19],k3[20],k3[21],k3[22],k3[23],k3[24],k3[25],k3[26],k3[27],k3[28],k3[29],k3[30],k3[31],k3[32],k3[33],k3[34],k3[35],k3[36],k3[37],k3[38],k3[39],k3[40],k3[41],k3[42],k3[43],k3[44],k3[45],k3[46],k3[47],k3[48],k3[49],k3[50])
//k3max = max(k3,k3[1],k3[2],k3[3],k3[4],k3[5],k3[6],k3[7],k3[8],k3[9],k3[10],k3[11],k3[12],k3[13],k3[14],k3[15],k3[16],k3[17],k3[18],k3[19],k3[20],k3[21],k3[22],k3[23],k3[24],k3[25],k3[26],k3[27],k3[28],k3[29],k3[30],k3[31],k3[32],k3[33],k3[34],k3[35],k3[36],k3[37],k3[38],k3[39],k3[40],k3[41],k3[42],k3[43],k3[44],k3[45],k3[46],k3[47],k3[48],k3[49],k3[50])
allpmax = max(allp[1],allp[2],allp[3],allp[4],allp[5],allp[6])
allpmin = min(allp[1],allp[2],allp[3],allp[4],allp[5],allp[6])
if(histcha < 0 and macdcha>=0 and macdcha2>=0 and macdcha3>=0 and macdcha4>=0 and macdcha5>=0 and macdcha6>=0 and d < 20 and volume > volume[1] and true2_1 == 1 and allp>allp[1] and allp <80)//and k3max < 80  //and k3min < 30 and k3 >20 and k2<50
    strategy.entry("开多", true, comment = "开多") // and close > close[1] and cci1> MEA1
    true2_1 :=0
if(d >80)
    strategy.close( "开多", comment = "平多")
    true2_1 :=1

stop_loss=input(4, "做多止损 %", minval = 1, step = 1)
sl = strategy.position_avg_price * (1-stop_loss/100)
close_Stop = close < sl
if(close_Stop or(allp<20 and allp[1]>20))
    strategy.close( "开多", comment = "做多止损")
    true2_1 :=1
Target_profit=input(10, "做多止盈 %", minval = 1, step = 1)
tp = strategy.position_avg_price * (1+Target_profit/100)
close_Target = close > tp
strategy.close("开多", when = close_Target, comment ="做多盈利")


//空
if(histcha > 0 and macdcha<=0 and macdcha2<=0 and macdcha3<=0 and macdcha4<=0 and macdcha5<=0 and macdcha6<=0 and d > 80 and volume > volume[1] and true2_2 == 1 and allp<allp[1] and allp >20) // and k3max>70 and k3<80
    //strategy.entry("开空", comment = "开空") 
    strategy.entry("开空", strategy.short,comment ="开空")
    true2_2 := 0
if( d <20)
   // strategy.close(  comment = "平空")
    strategy.close("开空",  comment = "平空")
    true2_2 := 1

stop_loss2=input(4, "做空止损 %", minval = 1, step = 1)
sl2 = strategy.position_avg_price * (1+stop_loss2/100)
close_Stop2 = close > sl2
if(close_Stop2 or(allp>80 and allp[1]<80))
    strategy.close( "开空", comment = "做空止损")
    true2_2 == 1
Target_profit2=input(10, "做空止盈 %", minval = 1, step = 1)
tp2 = strategy.position_avg_price * (1-Target_profit2/100)
close_Target2 = close < tp2
strategy.close("开空", when = close_Target2, comment ="做空盈利")




```

> Detail

https://www.fmz.com/strategy/427993

> Last Modified

2023-09-27 16:46:38
