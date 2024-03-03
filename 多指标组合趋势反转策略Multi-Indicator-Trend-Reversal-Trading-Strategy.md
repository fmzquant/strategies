
> Name

多指标组合趋势反转策略Multi-Indicator-Trend-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7742500c1f2fb5b80d.png)
[trans]
## 概述

这是一个利用多个指标进行组合,识别价格趋势反转点的策略。基本思路是,单一指标很难完美识别趋势的转折点,因此选取多个具有类似功能的指标进行组合,当多个指标发出同向信号时,我们就可以相对确定趋势发生反转的高概率情况,从而进行交易操作。

## 策略原理  

该策略选择了5个不同的指标进行组合使用,这5个指标都具有判断价格趋势的功能。这5个指标分别是:

1. Coral Trend Indicator:利用三重或更高阶的指数平滑移动平均线组合判断价格趋势  
2. SSL Channel:结合移动平均线判断价格通道及趋势
3. Heikin Ashi RSI:利用换手率指标与日内均线组合判断趋势  
4. MACD DEMA:双指数移动平均线与MACD组合判断趋势
5. WaveTrend Oscillator:根据价格通道判断趋势  

strategy的交易逻辑是,上述5个指标中,可以任意选择1个或多个指标进行组合。当选择的多个指标同时发出买入/卖出信号时,我们就在相应的bar开仓做多/做空。

举例来说,如果我们选择了2个指标:Coral Trend和SSL Channel。那么只有当它们两个同时发出买入信号时,我们才做多;只有当它们两个同时发出卖出信号时,我们才做空。

这样通过多个指标的组合验证,可以大大提高交易信号的可靠性,避免单一指标的误导。

## 策略优势  

1. 使用多个指标组合,可以识别趋势反转高概率情况,提高交易胜率
2. 各指标使用不同的计算方式,使信号更加全面准确 
3. 可任意选择1到5个指标进行组合,组合灵活
4. 提供各指标的详细参数设置,可以针对不同市场进行优化
5. 提供回看窗口参数,可以调整识别买卖点的灵敏度

## 策略风险及解决方案

1. 单一指标存在误导风险  

   - 解决方法:使用多个指标的组合验证

2. 参数设置不当可能导致过于灵敏或过于迟钝

   - 解决方法:根据不同周期及品种反复测试优化参数

3. 指标之间存在一定滞后

   - 解决方法:设置适当的回看时间窗口

## 策略优化方向  

1. 测试更多类型的趋势判断指标,扩大指标池,丰富组合
2. 增加机器学习算法,自动识别最佳指标组合
3. 增加参数自适应优化模块,使参数可以动态调整
4. 结合情绪指标、基本面指标等识别趋势反转
5. 开发量化风险管理模型,控制交易风险

## 总结  

该策略整体实现了较为可靠的趋势反转交易策略。其利用多指标组合验证的思路,具有较强的普适性,可扩展性非常好。如果进一步优化,配合机器学习及参数动态优化等技术,效果可以进一步提升,值得深入研究与应用。

||

## Overview  

This is a strategy that combines multiple indicators to identify trend reversal points in prices. The basic idea is that a single indicator alone often fails to perfectly identify turns in trends. Therefore, we select multiple indicators with similar functions and combine them, so that when multiple indicators give buy/sell signals simultaneously, we can relatively confirm the high probability of trend reversals and make trading decisions.

## Strategy Logic

The strategy selects 5 different indicators for combination. These 5 indicators all have the ability to judge price trends. They are:  

1. Coral Trend Indicator: Uses a combination of triple or higher order exponential smoothing moving averages to determine price trends
2. SSL Channel: Combines moving averages to determine price channels and trends  
3. Heikin Ashi RSI: Combines RSI indicator with intraday averages to determine trends
4. MACD DEMA: Combines double exponential moving averages and MACD to determine trends  
5. WaveTrend Oscillator: Determines trends according to price channels

The trading logic of the strategy is that of the above 5 indicators, any 1 or more can be selected for combination. Only when multiple selected indicators give buy/sell signals simultaneously on a bar, will we open long/short positions accordingly.  

For example, if we select 2 indicators: Coral Trend and SSL Channel. We will only go long when both of them give buy signals at the same time; and only go short when both of them give sell signals at the same time.  

Through such multi-indicator verification, the reliability of trading signals can be greatly improved and avoid misleading by individual indicators.

## Advantages of the Strategy  

1. Using a combination of multiple indicators can identify trend reversal situations with high probability and improve trading win rate  
2. Each indicator uses different calculation methods to make the signals more comprehensive and accurate
3. Flexible combination by selecting from 1 to 5 indicators arbitrarily  
4. Detailed parameter settings are provided for each indicator for optimization across different markets
5. Lookback window parameters provided to adjust sensitivity in identifying long/short points

## Risks & Solutions

1. Misleading risk of individual indicators

   - Solution: Verification through a combination of multiple indicators

2. Improper parameter settings may cause too much sensitivity or dullness

   - Solution: Repeatedly test and optimize parameters based on different timeframes and products

3. Certain lag between indicators 

   - Solution: Set appropriate lookback time windows
   
## Directions for Strategy Optimization
 
1. Test more types of trend judgming indicators and expand the indicator pool to enrich combinations
2. Increase machine learning algorithms to automatically identify optimal indicator combinations  
3. Add parameter adaptive optimization module for dynamic parameter adjustments
4. Combine sentiment indicators, fundamentals etc. to identify trend reversals
5. Develop quantitative risk management models to control trading risks  

## Conclusion  

The strategy has overall achieved a relatively reliable trend reversal trading strategy. Its idea of using multi-indicator verification has great versatility and excellent extensibility. With further optimizations using technologies like machine learning and dynamic parameter optimization, its performance can be further improved and is worth in-depth research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|(?STRATEGY OPTIONS)HARSI|
|v_input_int_1|6|Lookback HARSI|
|v_input_2|true|SSL|
|v_input_int_2|true|Lookback SSL|
|v_input_3|true|CORAL|
|v_input_int_3|4|Lookback CORAL|
|v_input_4|false|MACD DEMA|
|v_input_int_4|false|Lookback MACD DEMA|
|v_input_5|false|WAVE TREND|
|v_input_int_5|false|Lookback WAVE|
|v_input_int_6|14|(?Config » HARSI)Length|
|v_input_int_7|7|Open Smoothing|
|v_input_int_8|10|(?Config » SSL Channel)Period|
|v_input_float_1|9|(?Config » Coral Trend Candles)Smoothing Period|
|v_input_float_2|0.4|Constant D|
|v_input_6|12|(?Config » MACD DEMA)DEMA Short|
|v_input_7|26|DEMA Long|
|v_input_8|9|Signal|
|v_input_9|10|(?Config » WAVE TREND)Channel Length|
|v_input_10|21|Average Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//@author=iori86
//Any trade decisions you make are entirely your own responsibility//

strategy('GT 5.1 Strategy', 'GT 5.1 Strategy •', true, default_qty_type=strategy.cash)
string GROUP_6="STRATEGY OPTIONS"
dec1 = input(true,"HARSI", group=GROUP_6)
harsi_back = input.int(6, 'Lookback HARSI', group=GROUP_6, minval=1, maxval=32)
dec2 = input(true,"SSL", group=GROUP_6)
ssl_back = input.int(1, 'Lookback SSL', group=GROUP_6, minval=0, maxval=4)
dec3 = input(true,"CORAL", group=GROUP_6)
coral_back = input.int(4, 'Lookback CORAL', group=GROUP_6, minval=1, maxval=10)
dec4 = input(false,"MACD DEMA", group=GROUP_6)
macd_back =input.int(0, 'Lookback MACD DEMA', group=GROUP_6, minval=0, maxval=10)
dec5 = input(false,"WAVE TREND", group=GROUP_6)
wave_back=input.int(0, 'Lookback WAVE', group=GROUP_6, minval=0, maxval=10)

//================================================================HARSI============================================================================//

string GROUP_1 = 'Config » HARSI'
i_lenHARSI = input.int(14, 'Length', group=GROUP_1, minval=1)
i_smoothing = input.int(7, 'Open Smoothing', group=GROUP_1, minval=1, maxval=100)
f_zrsi(_source, _length) => ta.rsi(_source, _length) - 50
f_zstoch(_source, _length, _smooth, _scale) =>
    float _zstoch = ta.stoch(_source, _source, _source, _length) - 50
    float _smoothed = ta.sma(_zstoch, _smooth)
    float _scaled = (_smoothed / 100 )* _scale
f_rsi(_source, _length, _mode) =>
    float _zrsi = f_zrsi(_source, _length)
    var float _smoothed = na
    _smoothed := na(_smoothed[1]) ? _zrsi : (_smoothed[1] + _zrsi) / 2
    _mode ? _smoothed : _zrsi
f_rsiHeikinAshi(_length) =>
    float _closeRSI = f_zrsi(close, _length)
    float _openRSI = nz(_closeRSI[1], _closeRSI)
    float _highRSI_raw = f_zrsi(high, _length)
    float _lowRSI_raw = f_zrsi(low, _length)
    float _highRSI = math.max(_highRSI_raw, _lowRSI_raw)
    float _lowRSI = math.min(_highRSI_raw, _lowRSI_raw)
    float _close = (_openRSI + _highRSI + _lowRSI + _closeRSI) / 4
    var float _open = na
    _open := na(_open[i_smoothing]) ? (_openRSI + _closeRSI) / 2 : ((_open[1] * i_smoothing) + _close[1]) / (i_smoothing + 1)
    float _high = math.max(_highRSI, math.max(_open, _close))
    float _low = math.min(_lowRSI, math.min(_open, _close))
    [_open, _high, _low, _close]
[O, H, L, C] = f_rsiHeikinAshi(i_lenHARSI)

//=======================================================================SSL=======================================================================//

string GROUP_2 = 'Config » SSL Channel'
int len = input.int(10, 'Period', group=GROUP_2)
float smaHigh = ta.sma(high, len)
float smaLow = ta.sma(low, len)
float Hlv = na
Hlv := close > smaHigh ? 1 : close < smaLow ? -1 : Hlv[1]
float sslDown = Hlv < 0 ? smaHigh : smaLow
float sslUp = Hlv < 0 ? smaLow : smaHigh
plot(sslDown, linewidth=2, color=color.new(color.red, 0))
plot(sslUp, linewidth=2, color=color.new(color.lime, 0))

//=======================================================================CORAL=======================================================================//

string GROUP_3 = 'Config » Coral Trend Candles'
src = close
sm = input.float(9, 'Smoothing Period', group=GROUP_3, minval=1)
cd = input.float(0.4, 'Constant D', group=GROUP_3, minval=0.1)
float di = (sm) / 2.0 + 1.0
float c1 = 2 / (di + 1.0)
float c2 = 1 - c1
float c3 = 3.0 * (cd * cd + cd * cd * cd)
float c4 = -3.0 * (2.0 * cd * cd + cd + cd * cd * cd)
float c5 = 3.0 * cd + 1.0 + cd * cd * cd + 3.0 * cd * cd
var float i1 = na
var float i2 = na
var float i3 = na
var float i4 = na
var float i5 = na
var float i6 = na
i1 := c1 * src + c2 * nz(i1[1])
i2 := c1 * i1 + c2 * nz(i2[1])
i3 := c1 * i2 + c2 * nz(i3[1])
i4 := c1 * i3 + c2 * nz(i4[1])
i5 := c1 * i4 + c2 * nz(i5[1])
i6 := c1 * i5 + c2 * nz(i6[1])
var float bfr = na
bfr := -cd * cd * cd * i6 + c3 * i5 + c4 * i4 + c5 * i3
color bfrC = bfr > nz(bfr[1]) ? color.green : bfr < nz(bfr[1]) ? color.red : color.blue
plot(bfr, title='Trend', linewidth=3, style=plot.style_circles, color=bfrC)

//=======================================================================MACD DEMA=======================================================================//
string GROUP_4 = 'Config » MACD DEMA'
sma = input(12,title='DEMA Short', group=GROUP_4)
lma = input(26,title='DEMA Long', group=GROUP_4)
tsp = input(9,title='Signal', group=GROUP_4)
//dolignes = input(true,title="Lines", group=GROUP_4)

MMEslowa = ta.ema(close,lma)
MMEslowb = ta.ema(MMEslowa,lma)
DEMAslow = ((2 * MMEslowa) - MMEslowb )
MMEfasta = ta.ema(close,sma)
MMEfastb = ta.ema(MMEfasta,sma)
DEMAfast = ((2 * MMEfasta) - MMEfastb)
LigneMACDZeroLag = (DEMAfast - DEMAslow)
MMEsignala = ta.ema(LigneMACDZeroLag, tsp)
MMEsignalb = ta.ema(MMEsignala, tsp)
Lignesignal = ((2 * MMEsignala) - MMEsignalb )
MACDZeroLag = (LigneMACDZeroLag - Lignesignal)
swap1 = MACDZeroLag>0?color.green:color.red

//plot(MACDZeroLag,'Histo',color=swap1,histbase=0)
//p1 = plot(dolignes?LigneMACDZeroLag:na,"LigneMACD",color.blue)
//p2 = plot(dolignes?Lignesignal:na,"Signal",color.red)
//fill(p1, p2, color.blue)
hline(0)

//=======================================================================WAVE TREND=======================================================================//
string GROUP_5 = 'Config » WAVE TREND'

n1 = input(10, "Channel Length", group=GROUP_5)
n2 = input(21, "Average Length", group=GROUP_5)
//obLevel1 = input(60, "Over Bought Level 1", group=GROUP_5)
//obLevel2 = input(53, "Over Bought Level 2", group=GROUP_5)
//osLevel1 = input(-60, "Over Sold Level 1", group=GROUP_5)
//osLevel2 = input(-53, "Over Sold Level 2", group=GROUP_5)
ap = hlc3 
esa = ta.ema(ap, n1)
d = ta.ema(math.abs(ap - esa), n1)
ci = (ap - esa) / (0.015 * d)
tci = ta.ema(ci, n2)
wt1 = tci
wt2 = ta.sma(wt1,4)
//plot(0,"a" ,color.gray)
//plot(obLevel1,"a", color.red)
//plot(osLevel1,"a", color.green)
//plot(obLevel2,"a", color.red)
//plot(osLevel2,"a", color.green)
//plot(wt1,"a", color.green)
//plot(wt2,"a", color.red)
//plot(wt1-wt2,"a",color.blue, 1)

//=======================================================================CONDITIONS=======================================================================//
bool checker_1   = false   // HARSI BUY
bool checker_11  = false   // HARSI lookback BUY
bool checker_2   = false   // HARSI SELL
bool checker_21  = false   // HARSI lookback SELL
bool checker_3   = false   // SSL AL
bool checker_31  = false   // SSL lookback 0 dan büyükse al
bool checker_4   = false   // SSL SAT
bool checker_41  = false   // SSL lookback 0 dan büyükse sat
bool checker_5   = false   // CORAL AL
bool checker_51  = false   // CORAL lookback 1 den büyükse al
bool checker_6   = false   // CORAL SAT
bool checker_61  = false   // CORAL lookback 1 den büyükse sat
bool checker_7   = false   // MACD AL
bool checker_71  = false   // MACD lookback 0 dan büyükse al
bool checker_8   = false   // MACD SAT
bool checker_81  = false   // MACD lookback 0 dan büyükse sat
bool checker_9   = false   // WAVE AL
bool checker_91  = false   // WAVE lookback 0 dan büyükse al
bool checker_10  = false   // WAVE SAT
bool checker_101 = false   // WAVE lookback 0 dan büyükse sat


//=======================================================================HARSI=======================================================================//
if harsi_back==1
    if ( C > O and C[1] < O[1] and C > C[1])
        checker_1 := true
//HARSI SELL                
    if (C < O and C[1] > O[1] )
        checker_2 := true
// HARSI BUY
if harsi_back>1
    int say_1=0
    while harsi_back>say_1 and checker_11 == false
        if ( C[say_1] > O[say_1] and C[say_1+1] < O[say_1+1] and C[say_1] > C[say_1+1])
            checker_11 := true
        say_1:=say_1+1
    int say_2=0   
    while harsi_back>say_2 and checker_21 == false        
        if (C[say_2] < O[say_2] and C[say_2+1] > O[say_2+1])
            checker_21 := true
        say_2:=say_2+1
//=======================================================================SSL=======================================================================//
if ssl_back==0
    if (ta.crossover(sslUp, sslDown))
        checker_3 := true
    if (ta.crossover(sslDown, sslUp))
        checker_4 := true
if ssl_back>0
    int say_3=0
    while ssl_back>=say_3 and checker_31==false
        if (sslUp[say_3]>sslDown[say_3] and sslUp[say_3+1]<sslDown[say_3+1] )
            checker_31 := true
        say_3:=say_3+1
    int say_4=0
    while ssl_back>=say_4 and checker_41==false
        
        if (sslUp[say_4]<sslDown[say_4] and sslUp[say_4+1]>sslDown[say_4+1])
            checker_41 := true
        say_4:=say_4+1    
//======================================================================CORAL=======================================================================//
if coral_back==1
    if(bfrC == color.green and bfrC[1] == color.red)
        checker_5 := true
    if(bfrC == color.red and bfrC[1] == color.green)
        checker_6 := true
if coral_back>1
    int say_5=0
    while coral_back>say_5 and checker_51 == false
        if(bfrC[say_5] == color.green and bfrC[say_5+1] == color.red)
            checker_51 := true
        say_5 := say_5+1
    int say_6=0
    while coral_back>say_6 and checker_61 == false
        if(bfrC[say_6] == color.red and bfrC[say_6+1] == color.green)
            checker_61 := true
        say_6 := say_6+1
            

//=======================================================================MACD=======================================================================//
if macd_back==0 
    if ta.crossover(LigneMACDZeroLag,Lignesignal)
        checker_7 := true
    if ta.crossover(Lignesignal,LigneMACDZeroLag) 
        checker_8 := true
        
        
if macd_back>0
    int say_7=0
    while macd_back>=say_7 and checker_71==false
        if ta.crossover(LigneMACDZeroLag[say_7],Lignesignal[say_7])
            checker_71 := true
        say_7:=say_7+1
    int say_8=0
    while macd_back>=say_8 and checker_81==false
        if ta.crossover(Lignesignal[say_8],LigneMACDZeroLag[say_8])
            checker_81 := true
        say_8:=say_8+1   
//=======================================================================WAVE TREND=======================================================================//
if wave_back ==0
    if ta.crossover(wt1,wt2)
        checker_9  := true
    if ta.crossover(wt2,wt1)
        checker_10 :=true
if wave_back>0
    int say_9 =0
    while wave_back>=say_9 and checker_91==false
        if (ta.crossover(wt1[say_9],wt2[say_9]))
            checker_91 := true
        say_9:=say_9+1
    int say_10=0
    while wave_back>=say_10 and checker_101==false
        if (ta.crossover(wt2[say_10],wt1[say_10]))
            checker_101 := true
        say_10:=say_10+1   
//=======================================================================BUY=======================================================================//
var buy  = false
var sell = true
//=======================================================================TEK SEÇENEK=======================================================================//
if buy == false and sell==true
//dec1
    if dec1 == true and dec2==false and dec3== false and dec4==false and dec5==false
        if checker_1 or checker_11
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="HARSI")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
//dec2
    if dec2 == true and dec1==false and dec3== false and dec4==false and dec5==false
        if checker_3 or checker_31
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up,textcolor= color.white, size=size.small, text="SSL")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true   
//dec3
    if dec3 == true and dec2==false and dec1== false and dec4==false and dec5==false
        if checker_5 or checker_51
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up,textcolor= color.white, size=size.small, text="CORAL")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true  
//dec4    
    if dec4 == true and dec2==false and dec3== false and dec1==false and dec5==false
        if checker_7 or checker_71
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="MACD")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true      
//dec5    
    if dec5 == true and dec1==false and dec2== false and dec3==false and dec4==false
        if checker_9 or checker_91
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="WAVE")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true   
//=======================================================================2 SEÇENEK=======================================================================// 
//dec1-dec2
    if dec1 == true and dec2==true and dec3== false and dec4== false and dec5== false
        if (checker_1== true or checker_11==true) and (checker_3 == true or checker_31 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="HARSI\n SSL")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
//dec1 dec3
    if dec1 == true and dec2==false and dec3== true and dec4== false and dec5== false
        if (checker_1 == true or checker_11==true) and (checker_5 == true or checker_51 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="HARSI\n CORAL")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
//dec1 dec4
    if dec1 == true and dec2==false and dec3== false and dec4== true and dec5== false
        if (checker_1 == true or checker_11==true) and (checker_7 == true or checker_71 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="HARSI\n MACD")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
//dec1 dec5
    if dec1 == true and dec2==false and dec3== false and dec4== false and dec5== true
        if (checker_1 == true or checker_11==true) and (checker_9 == true or checker_91 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="HARSI\n WAVE")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
//dec2 dec3
    if dec1 == false and dec2==true and dec3== true and dec4== false and dec5== false
        if (checker_3 == true or checker_31==true) and (checker_5 == true or checker_51 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="SSL\n CORAL")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
//dec2 dec4
    if dec1 == false and dec2==true and dec3== false and dec4== true and dec5== false
        if (checker_3 == true or checker_31==true) and (checker_7 == true or checker_71 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="SSL\n MACD")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
//dec2 dec5
    if dec1 == false and dec2==true and dec3== false and dec4== false and dec5== true
        if (checker_3 == true or checker_31==true) and (checker_9 == true or checker_91 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="SSL\n WAVE")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
//dec3 dec4
    if dec1 == false and dec2==false and dec3== true and dec4== true and dec5== false
        if (checker_5 == true or checker_51==true) and (checker_7 == true or checker_71 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="CORAL\n MACD")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true               
//dec3 dec5
    if dec1 == false and dec2==false and dec3== true and dec4== false and dec5== true
        if (checker_5 == true or checker_51==true) and (checker_9 == true or checker_91 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="CORAL\n WAVE")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true            
//dec4 dec5
    if dec1 == false and dec2==false and dec3== false and dec4== true and dec5== true
        if (checker_7 == true or checker_71==true) and (checker_9 == true or checker_91 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="MACD\n WAVE")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true               
//=======================================================================3 SEÇENEK=======================================================================//
// dec 1 dec2 dec3
    if dec1 == true and dec2==true and dec3 == true and dec4 ==false and dec5== false
        if (checker_1 == true or checker_11==true) and (checker_3 == true or checker_31 == true) and (checker_5 == true or checker_51 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="HARSI\n SSL\n\n CORAL")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
// dec1 dec2 dec4
    if dec1 == true and dec2==true and dec3 == false and dec4 ==true and dec5== false
        if (checker_1 == true or checker_11==true) and (checker_3 == true or checker_31 == true) and (checker_7 == true or checker_71 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="HARSI\n SSL\n\n MACD ")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
// dec1 dec2 dec5
    if dec1 == true and dec2==true and dec3 == false and dec4 ==false and dec5== true
        if (checker_1 == true or checker_11==true) and (checker_3 == true or checker_31 == true) and (checker_9 == true or checker_91 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="HARSI\n SSL\n\n WAVE ")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
// dec1 dec3 dec4
    if dec1 == true and dec2==false and dec3 == true and dec4 ==true and dec5== false
        if (checker_1 == true or checker_11==true) and (checker_5 == true or checker_51 == true) and (checker_7 == true or checker_71 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="HARSI\n CORAL\n\n MACD ")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
// dec1 dec3 dec5
    if dec1 == true and dec2==false and dec3 == true and dec4 ==false and dec5== true
        if (checker_1 == true or checker_11==true) and (checker_5 == true or checker_51 == true) and (checker_9 == true or checker_91 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="HARSI\n CORAL\n\n WAVE ")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
// dec1 dec4 dec5
    if dec1 == true and dec2==false and dec3 == false and dec4 ==true and dec5== true
        if (checker_1 == true or checker_11==true) and (checker_7 == true or checker_71 == true) and (checker_9 == true or checker_91 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="HARSI\n MACD\n\n WAVE ")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
// dec2 dec3 dec4
    if dec1 == false and dec2==true and dec3 == true and dec4==true and dec5== false
        if (checker_3 == true or checker_31==true) and (checker_5 == true or checker_51 == true) and (checker_7 == true or checker_71 == true) 
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="SSL\n CORAL\n\n MACD")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
// dec2 dec3 dec5
    if dec1 == false and dec2==true and dec3== true and dec4== false and dec5== true
        if (checker_3 == true or checker_31==true) and (checker_5 == true or checker_51 == true) and (checker_9 == true or checker_91==true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="SSL\n CORAL\n\n  WAVE")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
// dec2 dec4 dec5
    if dec1 == false and dec2==true and dec3== false and dec4== true and dec5== true
        if (checker_3 == true or checker_31==true) and (checker_7 == true or checker_71 == true) and (checker_9 == true or checker_91==true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="SSL\n MACD\n\n WAVE")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true            
// dec3 dec4 dec5
    if dec1 == false and dec2==false and dec3 == true and dec4 ==true and dec5== true
        if (checker_5 == true or checker_51==true) and (checker_7 == true or checker_71 == true) and (checker_9 == true or checker_91 == true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="CORAL\n MACD\n\n WAVE")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true
//=======================================================================4 SEÇENEK=======================================================================//
//dec1 dec2 dec3 dec4
    if dec1 == true and dec2==true and dec3 == true and dec4==true and dec5== false
        if (checker_1 == true or checker_11==true) and (checker_3 == true or checker_31 == true) and (checker_5 == true or checker_51 == true) and (checker_7 == true or checker_71 ==true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="HARSI\n CORAL\n\n CORAL\n\n\n MACD")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true        
//dec1 dec3 dec4 dec5
    if dec1 == true and dec2==false and dec3 == true and dec4==true and dec5== true
        if (checker_1 == true or checker_11==true) and (checker_5 == true or checker_51 == true) and (checker_7 == true or checker_71 == true) and (checker_9 == true or checker_91 ==true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="HARSI\n CORAL\n\n MACD\n\n\n WAVE")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true 
//dec1 dec2 dec4 dec5
    if dec1 == true and dec2==true and dec3 == false and dec4==true and dec5== true
        if (checker_1 == true or checker_11==true) and (checker_3 == true or checker_31 == true) and (checker_7 == true or checker_71 == true) and (checker_9 == true or checker_91 ==true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="HARSI\n SSL\n\n MACD\n\n\n WAVE")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true 
//dec1 dec2 dec3 dec5
    if dec1 == true and dec2==true and dec3 == true and dec4==false and dec5== true
        if (checker_1 == true or checker_11==true) and (checker_3 == true or checker_31 == true) and (checker_5 == true or checker_51 == true) and (checker_9 == true or checker_91 ==true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="HARSI\n SSL\n\n CORAL\n\n\n WAVE")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true 
//dec2 dec3 dec4 dec5
    if dec1 == false and dec2==true and dec3 == true and dec4==true and dec5== true 
        if (checker_3 == true or checker_31 == true) and (checker_5 == true or checker_51 == true) and (checker_7 == true or checker_71 ==true) and (checker_9 == true or checker_91==true)
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="SSL\n CORAL\n\n MACD\n\n\n WAVE")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true 
//=======================================================================5 SEÇENEK=======================================================================//
//dec1 dec2 dec3 dec4 dec5
    if dec1 == true and dec2==true and dec3 == true and dec4==true and dec5== true 
        if (checker_1 == true or checker_11) and (checker_3 == true or checker_31 == true) and (checker_5 == true or checker_51 == true) and (checker_7 == true or checker_71 ==true) and (checker_9 == true or checker_91==true) 
            label.new(bar_index, low-ta.tr, color=color.green,style= label.style_label_up, size=size.small, text="SUPER BUY")
            strategy.entry("long", strategy.long)
            sell:= false
            buy:=true 
               
//=======================================================================SELL=======================================================================//
//=======================================================================TEK SEÇENEK=======================================================================//
if buy == true and sell==false
//dec1
    if dec1 == true and dec2==false and dec3== false and dec4==false and dec5==false
        if checker_2 or checker_21
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="HARSI")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false
//dec2
    if dec2 == true and dec1==false and dec3== false and dec4==false and dec5==false
        if checker_4 or checker_41
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="SSL")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false   
//dec3
    if dec3 == true and dec2==false and dec1== false and dec4==false and dec5==false
        if checker_6 or checker_61
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="CORAL")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false 
//dec4    
    if dec4 == true and dec2==false and dec3== false and dec1==false and dec5==false
        if checker_8 or checker_81
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="MACD")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false     
//dec5    
    if dec5 == true and dec1==false and dec2== false and dec3==false and dec4==false
        if checker_10 or checker_101
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="WAVE")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false   
//=======================================================================2 SEÇENEK=======================================================================//
//dec1-dec2
    if dec1 == true and dec2==true and dec3== false and dec4== false and dec5== false
        if (checker_2==true or checker_21==true) and (checker_4 or checker_41 == true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="HARSI\n SSL")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false 
//dec1 dec3
    if dec1 == true and dec2==false and dec3== true and dec4== false and dec5== false
        if (checker_2 == true or checker_21==true) and (checker_6 == true or checker_61 == true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="HARSI\n CORAL")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false 
//dec1 dec4
    if dec1 == true and dec2==false and dec3== false and dec4== true and dec5== false
        if (checker_2 == true or checker_21==true) and (checker_8 == true or checker_81 == true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="HARSI\n MACD")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false 
//dec1 dec5
    if dec1 == true and dec2==false and dec3== false and dec4== false and dec5== true
        if (checker_2 == true or checker_21==true) and (checker_10 == true or checker_101 == true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="HARSI\n WAVE")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false 
//dec2 dec3
    if dec1 == false and dec2==true and dec3== true and dec4== false and dec5== false
        if (checker_4 == true or checker_41==true) and (checker_6 == true or checker_61 == true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="SSL\n CORAL")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false 
//dec2 dec4
    if dec1 == false and dec2==true and dec3== false and dec4== true and dec5== false
        if (checker_4 == true or checker_41==true) and (checker_8 == true or checker_81 == true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="SSL\n MACD")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false 
//dec2 dec5
    if dec1 == false and dec2==true and dec3== false and dec4== false and dec5== true
        if (checker_4 == true or checker_41==true) and (checker_10 == true or checker_101 == true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="SSL\n WAVE")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false 
 //dec3 dec4
    if dec1 == false and dec2==false and dec3== true and dec4== true and dec5== false
        if (checker_6 == true or checker_61==true) and (checker_8 == true or checker_81 == true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="CORAL\n MACD")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false   
//dec3 dec5
    if dec1 == false and dec2==false and dec3== true and dec4== false and dec5== true
        if (checker_6 == true or checker_61==true) and (checker_10 == true or checker_101 == true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="CORAL\n WAVE")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false             
//dec4 dec5
    if dec1 == false and dec2==false and dec3== false and dec4== true and dec5== true
        if (checker_8 == true or checker_81==true) and (checker_10 == true or checker_101 == true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="MACD\n WAVE")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false             
//=======================================================================3 SEÇENEK=======================================================================//
// dec1 dec2 dec3
    if dec1 == true and dec2==true and dec3 == true and dec4 ==false and dec5== false
        if (checker_2 == true or checker_21==true) and (checker_4 == true or checker_41 == true) and (checker_6 == true or checker_61 == true)
            label.new(bar_index, high+ta.tr/2, color=color.red,style= label.style_label_down, size=size.small, text="HARSI\n SSL\n\n CORAL")
            strategy.entry("short", strategy.short)
            sell:= true
            buy := false
// dec1 dec2 dec4
    if dec1 == true and dec2==true and dec3 == false and dec4 ==true and dec5== false
        if (checker_2 == true or checker_21==true) and (checker_4 == true or checker_41 == true) and (checker_8 == true or checker_81 == true)
            label.new(bar_index, high+ta.tr/2, color=color.red,style= label.style_label_down, size=size.small, text="HARSI\n SSL\n\n MACD")
            strategy.entry("short", strategy.short)
            sell:= true
            buy := false
// dec1 dec2 dec5
    if dec1 == true and dec2==true and dec3 == false and dec4 ==false and dec5== true
        if (checker_2 == true or checker_21==true) and (checker_4 == true or checker_41 == true) and (checker_10 == true or checker_101 == true)
            label.new(bar_index, high+ta.tr/2, color=color.red,style= label.style_label_down, size=size.small, text="HARSI\n SSL\n\n MACD ")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false
// dec1 dec3 dec4
    if dec1 == true and dec2==false and dec3 == true and dec4 ==true and dec5== false
        if (checker_2 == true or checker_21==true) and (checker_6 == true or checker_61 == true) and (checker_8 == true or checker_81 == true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="HARSI\n CORAL\n\n MACD ")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false  
// dec1 dec3 dec5
    if dec1 == true and dec2==false and dec3 == true and dec4 ==false and dec5== true
        if (checker_2 == true or checker_21==true) and (checker_6 == true or checker_61 == true) and (checker_10 == true or checker_101 == true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="HARSI\n SSL\n\n MACD ")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false
// dec1 dec4 dec5
    if dec1 == true and dec2==false and dec3 == false and dec4 ==true and dec5== true
        if (checker_2 == true or checker_21==true) and (checker_8 == true or checker_81 == true) and (checker_10 == true or checker_101 == true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="HARSI\n MACD\n\n WAVE ")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false
// dec2 dec3 dec4
    if dec1 == false and dec2==true and dec3 == true and dec4==true and dec5== false
        if (checker_4 == true or checker_41==true) and (checker_6 == true or checker_61 == true) and (checker_8 == true or checker_81 == true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="SSL\n CORAL\n\n MACD")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false
// dec2 dec3 dec5
    if dec1 == false and dec2==true and dec3== true and dec4== false and dec5== true
        if (checker_4 == true or checker_41==true) and (checker_6 == true or checker_61 == true) and (checker_10 == true or checker_101==true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="SSL\n CORAL\n\n WAVE")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false
// dec2 dec4 dec5
    if dec1 == false and dec2==true and dec3== false and dec4== true and dec5== true
        if (checker_4 == true or checker_41==true) and (checker_8 == true or checker_81 == true) and (checker_10 == true or checker_101==true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="SSL\n CORAL\n\n WAVE")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false
// dec3 dec4 dec5
    if dec1 == false and dec2==false and dec3 == true and dec4 ==true and dec5== true
        if (checker_6 == true or checker_61==true) and (checker_8 == true or checker_81 == true) and (checker_10 == true or checker_101 == true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="CORAL\n MACD\n\n WAVE")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false
//=======================================================================4 SEÇENEK=======================================================================//
//dec1 dec2 dec3 dec4
    if dec1 == true and dec2==true and dec3 == true and dec4==true and dec5== false
        if (checker_2 == true or checker_21==true) and (checker_4 == true or checker_41 == true) and (checker_6 == true or checker_61 == true) and (checker_8 == true or checker_81 ==true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="HARSI\n SSL\n\n CORAL\n\n\n MACD")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false        
//dec1 dec3 dec4 dec5
    if dec1 == true and dec2==false and dec3 == true and dec4==true and dec5== true
        if (checker_2 == true or checker_21==true) and (checker_6 == true or checker_61 == true) and (checker_8 == true or checker_81 == true) and (checker_10 == true or checker_101 ==true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="HARSI\n CORAL\n\n MACD\n\n\n WAVE")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false
//dec1 dec2 dec4 dec5
    if dec1 == true and dec2==true and dec3 == false and dec4==true and dec5== true
        if (checker_2 == true or checker_21==true) and (checker_4 == true or checker_41 == true) and (checker_8 == true or checker_81 == true) and (checker_10 == true or checker_101 ==true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="HARSI\n SSL\n\n MACD\n\n\n WAVE")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false
//dec1 dec2 dec3 dec5
    if dec1 == true and dec2==true and dec3 == true and dec4==false and dec5== true
        if (checker_2 == true or checker_21==true) and (checker_4 == true or checker_41 == true) and (checker_6 == true or checker_61 == true) and (checker_8 == true or checker_81 ==true)
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="HARSI\n SSL\n\n CORAL\n\n\n WAVE")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false 
//dec2 dec3 dec4 dec5
    if dec1 == false and dec2==true and dec3 == true and dec4==true and dec5== true 
        if (checker_4 == true or checker_41 == true) and (checker_6 == true or checker_61 == true) and (checker_8 == true or checker_81 ==true) and (checker_10 == true or checker_101==true) 
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="SSL\n CORAL\n\n MACD\n\n\n WAVE")
            strategy.entry("short", strategy.short)
            sell:= true
            buy:=false
//=======================================================================5 SEÇENEK=======================================================================//
//dec1 dec2 dec3 dec4 dec5
    if dec1 == true and dec2==true and dec3 == true and dec4==true and dec5== true 
        if (checker_2 == true or checker_21) and (checker_4 == true or checker_41 == true) and (checker_6 == true or checker_61 == true) and (checker_8 == true or checker_81 ==true) and (checker_10 == true or checker_101==true) 
            label.new(bar_index, high+ta.tr, color=color.red,style= label.style_label_down, size=size.small, text="SUPER SELL")
            strategy.entry("short", strategy.short)            
            sell:= true
            buy:=false
```

> Detail

https://www.fmz.com/strategy/439760

> Last Modified

2024-01-23 15:33:59
