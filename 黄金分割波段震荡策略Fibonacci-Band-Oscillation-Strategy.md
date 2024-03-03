
> Name

黄金分割波段震荡策略Fibonacci-Band-Oscillation-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/124d977df6ea87db323.png)

[trans]

## 概述

黄金分割波段震荡策略是一种基于黄金分割理论设计的量化策略。该策略主要利用黄金分割法则计算出多个价格带,形成上下波段。当价格突破波段时产生交易信号,通过捕捉价格在波段之间震荡的特征实现盈利。

## 策略原理  

代码的核心逻辑在于计算价格的黄金分割波段作为关键点。主要步骤是:

1. 计算14周期的EMA均线作为中间轴线
2. 根据ATR和黄金分割比例计算上下4条波段线
3. 当价格向上突破下降波段或向下突破上升波段时,产生交易信号
4. 设置止损止盈,跟踪价格震荡获利

通过这种基于关键点突破的方法,可以有效捕捉市场的短期震荡,在波段之间来回交易获利。   

## 策略优势

该策略最大的优势在于利用了黄金分割这一重要的理论指标来定位关键价格点,从而提高获利概率。具体优势主要体现在:  

1. 黄金分割波段清晰,容易判断突破口  
2. 波段范围合适,不会过于细碎也不会过于宽松  
3. 多条波段可以选择,既可攻击性交易也可保守交易  
4. 波段震荡特征明显,短线操盘策略效果好

## 策略风险 

由于该策略追求短周期利润,所以也存在一些风险需要注意:

1. 大周期趋势下无法获利  
2. 价格剧烈波动时止损风险较大
3. 突破信号较多,需要谨慎选择
4. 波段震荡特征消失时无效

可以通过适当调整参数,选取合适波段和资金管理方式来控制这些风险。

## 策略优化

该策略还有进一步优化的空间:  

1. 结合趋势指标过滤一定趋势方向才产生信号  
2. 在特定时间段或重要事件点前后关闭策略  
3. 动态调整止损幅度以适应市场波动频率  
4. 优化参数选择不同周期EMA作为基准中线

## 总结  

黄金分割波段震荡策略整体来说是一个非常实用的短线策略。它利用黄金分割理论设定价格关键点,当价格在这些点附近震荡时可以获得丰厚的利润。这种基于范围突破的方法适合于具有一定波动度和特征的市场,可以单独使用也可以和其他策略组合。通过参数调优和适当的资金管理,该策略可以长期稳定运作。

||


## Overview  

The Fibonacci Band Oscillation Strategy is a quantitative strategy designed based on the Fibonacci theory. It mainly uses the Fibonacci ratio to calculate multiple price bands to form upper and lower bands. When the price breaks through the bands, trading signals are generated to capture the oscillation characteristics between the bands for profit.

## Strategy Logic   

The core logic of the code is to calculate the Fibonacci price bands as key points. The main steps are:  

1. Calculate the 14-period EMA as the middle line  
2. Calculate the upper and lower 4 band lines according to the ATR and Fibonacci ratios  
3. Generate trading signals when price breaks through the downside bands or upside bands
4. Set stop loss and take profit to track price oscillation for profits   

With this breakthrough-based method, it can effectively capture short-term fluctuations in the market and make round-trip trades between bands for profits.

## Advantages  

The biggest advantage of this strategy is that it utilizes the important theoretical indicator of the Fibonacci ratio to locate key price points, thereby increasing the probability of profit. The specific advantages are mainly reflected in:

1. Clear Fibonacci bands, easy to judge breakout points   
2. Reasonable band range, not too fragmented or too loose
3. Multiple bands can be selected for both aggressive and conservative trading   
4. Significant band oscillation characteristics, good effect for short-term trading strategies  

## Risks   

Since the strategy pursues short-term profits, there are also some risks to note:  

1. Unable to profit under large cycle trends   
2. High stop loss risk under violent price fluctuations  
3. Many breakthrough signals require cautious selection  
4. Invalid when band oscillation characteristics disappear  

These risks can be controlled by appropriately adjusting parameters, selecting appropriate bands, and capital management methods.

## Optimization  

There is still room for further optimization of the strategy:
 
1. Combine with trend indicators to generate signals only in certain trend directions   
2. Close the strategy before and after specific time periods or important events
3. Dynamically adjust the stop loss amplitude according to market volatility frequency   
4. Optimize parameters by selecting EMAs of different cycles as the benchmark line  

## Conclusion   

In general, the Fibonacci Band Oscillation Strategy is a very practical short-term strategy. It uses the Fibonacci theory to set price key points. When the price oscillates around these points, generous profits can be obtained. This breakout-based method is suitable for markets with a certain degree of volatility and characteristics. It can be used alone or combined with other strategies. With parameter tuning and proper capital management, the strategy can operate stably in the long run.

[/trans]


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|true|From Day|
|v_input_int_2|2|From Month|
|v_input_int_3|2022|From Year|
|v_input_int_4|true|Thru Day|
|v_input_int_5|true|Thru Month|
|v_input_int_6|2112|Thru Year|
|v_input_string_1|0|(?Bot)Long veya Short: Both|Short|Long|
|v_input_1|{{strategy.order.alert_message}}|alert message to copy/paste|
|v_input_int_7|14|(?Fibonacci)EMAperiod|
|v_input_int_8|14|ATRperiod|
|v_input_2|1.618|Fibonacci Ratio 2|
|v_input_3|2.618|Fibonacci Ratio 3|
|v_input_4|4.236|Fibonacci Ratio 4|
|v_input_string_2|0|(?Long)Fibo: close>FIBOTOP1(purple)|close>FIBOTOP3(aqua)|close>FIBOTOP2(gray)|close>FIBOTOP4(orange)|Disable|
|v_input_float_1|4|Stop %|
|v_input_float_2|1.5|TP %|
|v_input_string_3|0|(?Short)Fibo: close<FIBOBOT1(green)|close<FIBOBOT2(yellow)|close<FIBOBOT3(blue)|close<FIBOBOT4(aqua)|Disable|
|v_input_float_3|4|Stop %|
|v_input_float_4|1.5|TP %|
|v_input_5|Long Code|(?Long Code)Long İlk Alım|
|v_input_7|Long Exit Code|Long Exit|
|v_input_6|Short Code|(?Short Code)Short İlk Alım|
|v_input_8|Short Exit Code|Short Exit|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-14 00:00:00
end: 2023-11-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © drhakankilic

//@version=5
strategy("FIBONACCI BANDS Strategy", shorttitle="FBANDS Strategy", overlay=true)
// === Date === { 
//Backtest dates
fromDay = input.int(defval=1, title='From Day',minval=1,maxval=31)
fromMonth = input.int(defval=2, title='From Month',minval=1,maxval=12)
fromYear = input.int(defval=2022, title='From Year')
thruDay = input.int(defval=1, title='Thru Day',minval=1,maxval=31)
thruMonth = input.int(defval=1, title='Thru Month',minval=1,maxval=12)
thruYear = input.int(defval=2112, title='Thru Year')
showDate = true  // input(defval=true, title="Show Date Range")
start = timestamp(fromYear, fromMonth, fromDay, 00, 00)  // backtest start window
finish = timestamp(thruYear, thruMonth, thruDay, 23, 59)  // backtest finish window
window() =>  // create function "within window of time"
    time >= start and time <= finish ? true : false
// }

// === Long or Short ===  
tradeDirection = input.string(title="Long veya Short", options=["Long", "Short", "Both"], defval="Both",                                       group="Bot")
// Translate input into trading conditions
longOK  = (tradeDirection == "Long") or (tradeDirection == "Both")
shortOK = (tradeDirection == "Short") or (tradeDirection == "Both")
copypaste   = input('{{strategy.order.alert_message}}',         title='alert message to copy/paste',                                    group="Bot")
// }

// === FIBONACCI BANDS === {
EMAperiod = input.int(14, title='EMAperiod', minval=1, maxval=500, group="Fibonacci")
ATRperiod = input.int(14, title='ATRperiod', minval=1, maxval=500, group="Fibonacci")
EMA = ta.ema(close, EMAperiod)
TR1 = math.max(high - low, math.abs(high - close[1]))
TR = math.max(TR1, math.abs(low - close[1]))
ATR = ta.sma(TR, ATRperiod)
F2 = input(defval=1.618, title='Fibonacci Ratio 2', group="Fibonacci")
F3 = input(defval=2.618, title='Fibonacci Ratio 3', group="Fibonacci")
F4 = input(defval=4.236, title='Fibonacci Ratio 4', group="Fibonacci")
R1 = ATR
R2 = ATR * F2
R3 = ATR * F3
R4 = ATR * F4
FIBOTOP4 = EMA + R4
FIBOTOP3 = EMA + R3
FIBOTOP2 = EMA + R2
FIBOTOP1 = EMA + R1
FIBOBOT1 = EMA - R1
FIBOBOT2 = EMA - R2
FIBOBOT3 = EMA - R3
FIBOBOT4 = EMA - R4
plot(FIBOTOP4[1], title='FIBOTOP4', linewidth=1, color=color.new(color.orange, 0))
plot(FIBOTOP3[1], title='FIBOTOP3', linewidth=1, color=color.new(color.aqua, 20))
plot(FIBOTOP2[1], title='FIBOTOP2', linewidth=1, color=color.new(color.gray, 40))
plot(FIBOTOP1[1], title='FIBOTOP1', linewidth=1, color=color.new(color.purple, 40))

plot(FIBOBOT1[1], title='FIBOBOT1', linewidth=1, color=color.new(color.green, 40))
plot(FIBOBOT2[1], title='FIBOBOT2', linewidth=1, color=color.new(color.yellow, 40))
plot(FIBOBOT3[1], title='FIBOBOT3', linewidth=1, color=color.new(color.blue, 20))
plot(FIBOBOT4[1], title='FIBOBOT4', linewidth=1, color=color.new(color.aqua, 0))
// plot(EMA[1], style=plot.style_cross, title='EMA', color=color.new(color.red, 0))

prefm = input.string(title="Fibo", options=["close>FIBOTOP4(orange)", "close>FIBOTOP3(aqua)","close>FIBOTOP2(gray)","close>FIBOTOP1(purple)", "Disable"] , defval="close>FIBOTOP1(purple)", group="Long")
_prefm = false 
if (prefm == "close>FIBOTOP4(orange)" )
    _prefm := close>FIBOTOP4[1]
    
if (prefm == "close>FIBOTOP3(aqua)" )
    _prefm := close>FIBOTOP3[1]

if (prefm == "close>FIBOTOP2(gray)" )
    _prefm := close>FIBOTOP2[1]
    
if (prefm == "close>FIBOTOP1(purple)" )
    _prefm := close>FIBOTOP2[1]
 
 
if (prefm == "Disable" )
    _prefm := low<low[1] or low>low[1]  
    
prefmS = input.string(title="Fibo", options=["close<FIBOBOT1(green)", "close<FIBOBOT2(yellow)", "close<FIBOBOT3(blue)", "close<FIBOBOT4(aqua)", "Disable"] , defval="close<FIBOBOT1(green)", group="Short")
_prefmS = false 
if (prefmS == "close<FIBOBOT1(green)" )
    _prefmS := close<FIBOBOT1[1]
  
if (prefmS == "close<FIBOBOT2(yellow)" )
    _prefmS := close<FIBOBOT2[1]

if (prefmS == "close<FIBOBOT3(blue)" )
    _prefmS := close<FIBOBOT3[1]
  
if (prefmS == "close<FIBOBOT4(aqua)" )
    _prefmS := close<FIBOBOT4[1]

if (prefmS == "Disable" )
    _prefmS := low<low[1] or low>low[1]  

// }

long2= _prefm 

short2= _prefmS
//

// === Bot Codes === { 
enterlong = input("Long Code", title='Long İlk Alım', group="Long Code")
entershort= input("Short Code", title='Short İlk Alım', group="Short Code")
exitlong = input("Long Exit Code", title='Long Exit', group="Long Code")
exitshort= input("Short Exit Code", title='Short Exit', group="Short Code")
// }

////////////////////////////////////////////////////////////////////////////////////////////TPSL
// Inputs
sl_inp = input.float(4, title='Stop %', step=0.1, group="Long") / 100
tp_inp = input.float(1.5, title='TP %', step=0.1, group="Long") / 100

sl_inp2 = input.float(4, title='Stop %', step=0.1, group="Short") / 100
tp_inp2 = input.float(1.5, title='TP %', step=0.1, group="Short") / 100

longtp = strategy.position_avg_price * (1 + tp_inp) 
longstop=  strategy.position_avg_price * (1 - sl_inp)

shortstop=  strategy.position_avg_price * (1 + sl_inp2)
shorttp = strategy.position_avg_price * (1 - tp_inp2) 
////////////////////////////////////////////////////////////////////////////////////////////
if window() and strategy.position_size==0 and longOK
    strategy.entry("Long", strategy.long, when= long2, alert_message=enterlong, comment="Long")
    
if strategy.position_size>0
    strategy.exit("Long", stop= longstop, limit=longtp, alert_message=exitlong, comment="TPSL")
////////////////////////////////////////////////////////////////////////////////////////////SHORT
if window() and strategy.position_size==0 and shortOK 
    strategy.entry("Short", strategy.short, when= short2, alert_message=entershort, comment="Short")
    
if strategy.position_size<0
    strategy.exit("Short", stop= shortstop, limit= shorttp, alert_message=exitshort, comment="TPSL")
 

```

> Detail

https://www.fmz.com/strategy/432775

> Last Modified

2023-11-21 13:47:12
