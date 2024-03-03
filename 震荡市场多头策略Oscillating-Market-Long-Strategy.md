
> Name

震荡市场多头策略Oscillating-Market-Long-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略利用多个技术指标识别市场中的震荡行情,并在震荡低点进行逢低吸纳,目标捕捉震荡行情中的短线机会。

### 策略原理

该策略融合多种技术指标识别震荡低点机会。首先,利用变化率 ROC 判断市场处于震荡阶段,然后 RSI,StochRSI,MACD 等指标确认震荡低点,最后结合布林带,振荡指标等筛选信号。 

策略的入场时机有以下几种情况:

1. ROC下降,RSI低位,StochRSI过售,MACD底背离,振荡指标VIX下降。这表明市场处于下行震荡,多头介入的时机。

2. ROC下降,RSI更低位,StochRSI极度过售,MACD继续底背离,布林带扩大,TEMA缩小。这进一步确认上述下行震荡信号。

3. Chaikin震荡指标转正,TRIX支撑转正。两者结合确认短线止跌反弹机会。

4. MACD形成金叉,ROC和CMO支撑转正。多种指标共振表明短线趋势反转机会。

此外,策略还设定止损为布林带下沿,可有效控制风险。

### 优势分析

该策略最大的优势在于利用多种指标确认,可有效识别震荡市场中的反转机会,增强信号的可靠性。具体优势包括:

1. 多指标共振,重复确认,可避免假信号。

2. 入场时机精准,可在震荡低点买入,风险可控。

3. 利用布林带止损,有效控制下滑风险。

4. 短线操作,可快速捕捉震荡波段机会。

5. 指标参数经过优化,可匹配市场各种环境的震荡。

6. 程序化执行,回测验证,不受情绪影响。

### 风险分析

该策略也存在一些风险需要注意:

1. 市场出现长期方向性趋势时,震荡策略将面临被套利出场的风险。可通过长线技术指标确认趋势判断。

2. 突发事件导致市场出现急速单边行情时,止损可能直接被跌破,造成较大损失。应适当放宽止损参数。

3. 回测时段不充分,可能导致过拟合。应扩大回测时间周期,也做实盘验证。

4. 多指标组合使用不当,可能出现互相牵制,错过信号的情况。应测试各指标效果。

5. 市场结构变化可能导致原有参数不再适用,需要持续优化。

### 优化方向

该策略可以从以下几个方向进行优化:

1. 测试更多的技术指标,找到最佳指标组合。可以考虑KD,OBV等其它指标。

2. 优化指标的参数,使其更符合不同市场环境。可用遗传算法进行多维参数优化。

3. 根据回测结果,调整入场条件逻辑,减少假信号。可采用机器学习方法。

4. 优化止损策略,在保证风险控制的同时,尽量减少无效止损被刷出的情况。

5. 优化仓位管理,通过动态调整仓位,提高策略收益率。

6. 进行充分的回测验证和实盘验证,检查策略的稳健性。

7. 采用程序化方法进行定期检查和优化,使策略保持最优。

### 总结

该震荡市场多头策略,利用多种技术指标确认的方式识别震荡低点机会,可以有效获取震荡行情中的短线交易机会。通过参数优化、止损优化、仓位管理等方法,可以不断提升策略的稳定性和收益率。同时需要防范多头趋势下的风险,采取盈利保护措施。综合来说,该策略具有较强的实用性。

### Overview  

This strategy uses multiple technical indicators to identify oscillating markets and long at oscillation lows, aiming to capture short-term opportunities in oscillating markets.

### Strategy Logic

The strategy combines multiple technical indicators to identify oscillation low opportunities. Firstly, ROC is used to determine if the market is oscillating. Then indicators like RSI, StochRSI, MACD confirm the oscillation lows. Finally, Bollinger Bands, oscillators etc. filter the signals.

The strategy entries under several scenarios:

1. ROC falling, RSI oversold, StochRSI oversold, MACD divergence at low, VIX falling. Indicates a downward oscillation for long entry.

2. ROC falling more, RSI more oversold, StochRSI extreme oversold, MACD further divergence, BB expanding, TEMA contracting. Further confirms above signal.

3. Chaikin oscillator turning up, TRIX turning up in support. Both confirm short-term bottom. 

4. MACD golden cross, ROC and CMO turning up in support. Confluence suggests short-term trend reversal.

In addition, stops are set at the lower Bollinger Band to control risk.

### Advantage Analysis

The biggest advantage of this strategy is using multiple indicators to confirm signals, which improves reliability in identifying reversal opportunities in oscillating markets. Specific advantages include:

1. Confluence with multiple indicators prevents false signals.

2. Precise entry timing allows buying at oscillation lows, with controllable risk.

3. BB stop loss effectively limits downside risk. 

4. Short-term operations allow quickly capturing oscillation swings.

5. Optimized indicator parameters match various oscillation environments. 

6. Automated execution and backtest verification prevent emotional influences.

### Risk Analysis 

Some risks to note with this strategy:

1. Long term trending markets risk getting stopped out at loss. Confirm trends with long-term indicators.

2. Sudden one-sided markets may penetrate stops, causing large losses. Relax stops appropriately.

3. Insufficient backtest periods risk overfitting. Expand test timeframe and trade live.

4. Improper indicator combos risk missing signals. Test each thoroughly. 

5. Market regime changes may invalidate parameters. Continual optimization needed.

### Optimization Directions

Some ways to optimize the strategy:

1. Test more technical indicators to find best combinations. Consider RSI, OBV etc.

2. Optimize indicator parameters to fit different market environments. Use genetic algorithms for multidimensional optimization.

3. Adjust entry logic based on backtest results to reduce false signals. Consider machine learning.

4. Optimize stops to reduce unnecessary stop outs while controlling risk.

5. Optimize position sizing models to maximize returns.

6. Conduct robust backtesting and forward testing to verify consistency. 

7. Adopt programmatic checks and optimization for continuous improvement.

### Conclusion

This oscillating market long strategy effectively identifies oscillation lows using technical indicator confluence. Returns can be improved via parameter optimization, stop optimization, position sizing etc, while managing risks in trending markets. Overall it has strong practical application potential.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long Cases - On/Off|
|v_input_2|true|Short Cases - On/Off|
|v_input_3|true|ST Cases - On/Off|
|v_input_4|true|MT Cases - On/Off|
|v_input_5|true|LT Cases - On/Off|
|v_input_6|true|Long Cases Plot - On/Off|
|v_input_7|true|Short Cases Plot - On/Off|
|v_input_8|true|ST Cases Plot - On/Off|
|v_input_9|true|MT Cases Plot - On/Off|
|v_input_10|true|LT Cases Plot - On/Off|
|v_input_11|false|**********BREAK**********|
|v_input_12|true|OC1 - On/Off|
|v_input_13|true|OC1 Plot - On/Off|
|v_input_14|true|OC2 - On/Off|
|v_input_15|true|OC2 Plot - On/Off|
|v_input_16|true|STB1 - On/Off|
|v_input_17|true|STB1 Plot - On/Off|
|v_input_18|true|STB2 - On/Off|
|v_input_19|true|STB2 Plot - On/Off|
|v_input_20|true|MTB3 - On/Off|
|v_input_21|true|MTB3 Plot - On/Off|
|v_input_22|true|MTB4 - On/Off|
|v_input_23|true|MTB4 Plot - On/Off|
|v_input_24|true|LTB1 - On/Off|
|v_input_25|true|LTB1 Plot - On/Off|
|v_input_26|true|SC1 - On/Off|
|v_input_27|true|SC2 - On/Off|
|v_input_28|true|SC3 - On/Off|
|v_input_29|20|length|
|v_input_30|2.5|mult|
|v_input_31|9|lenROCshort|
|v_input_32|30|lenROCmed|
|v_input_33|100|lenROClong|
|v_input_34|9|lenMOshort|
|v_input_35|30|lenMOmed|
|v_input_36|50|lenMOlong|
|v_input_37|14|lengthRSI|
|v_input_38|3|smoothK|
|v_input_39|3|smoothD|
|v_input_40|14|lenRSIshort|
|v_input_41|14|lenStochshort|
|v_input_42|50|lenRSImed|
|v_input_43|50|lenStochmed|
|v_input_44|100|lenRSIlong|
|v_input_45|100|lenStochlong|
|v_input_46|5|fastlenshort|
|v_input_47|10|slowlenshort|
|v_input_48|5|signallenshort|
|v_input_49|20|fastlenmed|
|v_input_50|40|slowlenmed|
|v_input_51|5|signallenmed|
|v_input_52|50|fastlenlong|
|v_input_53|100|slowlenlong|
|v_input_54|20|signallenlong|
|v_input_55|12|fastlendef|
|v_input_56|26|slowlendef|
|v_input_57|9|signallendef|
|v_input_58|14|period_short|
|v_input_59|30|period_med|
|v_input_60|100|period_long|
|v_input_61|14|period_14|
|v_input_62|50|period_50|
|v_input_63|20|period_20|
|v_input_64|9|Length|
|v_input_65|30|Length|
|v_input_66|100|Length|
|v_input_67|14|Length|
|v_input_68|20|lengthCIshort|
|v_input_69|30|lengthCImed|
|v_input_70|200|lengthCIlong|
|v_input_71|50|lengthCI50|
|v_input_72|13|signalLine|
|v_input_73|34|fastLength|
|v_input_74|55|slowLength|
|v_input_75|10|WMA Length|
|v_input_76|10|Long RoC Length|
|v_input_77|10|Short RoC Length|
|v_input_78|20|WMA Length|
|v_input_79|20|Long RoC Length|
|v_input_80|20|Short RoC Length|
|v_input_81|200|WMA Length|
|v_input_82|200|Long RoC Length|
|v_input_83|50|Short RoC Length|
|v_input_84|200|WMA Length|
|v_input_85|100|Long RoC Length|
|v_input_86|10|Short RoC Length|
|v_input_87|5|lengthTRIXshort|
|v_input_88|20|lengthTRIXmed|
|v_input_89|100|lengthTRIXlong|
|v_input_90|10|lengthTRIX10|
|v_input_91|30|lengthTRIX30|
|v_input_92|40|lengthTRIX40|
|v_input_93|50|lengthTRIX50|
|v_input_94|80|lengthTRIX80|
|v_input_95|34|lengthAO1short|
|v_input_96|7|lengthAO2short|
|v_input_97|40|lengthAO1med|
|v_input_98|20|lengthAO2med|
|v_input_99|200|lengthAO1long|
|v_input_100|50|lengthAO2long|
|v_input_101|5|fastlenshortChOsc|
|v_input_102|10|slowlenshortChOsc|
|v_input_103|10|fastlenChOsc101001|
|v_input_104|100|slowlenChOsc101001|
|v_input_105|20|fastlenChOsc204020|
|v_input_106|40|slowlenChOsc204020|
|v_input_107|14|lengthMGD|
|v_input_108|9|lengthTEMA|
|v_input_109|15|Length|
|v_input_110|false|Offset|
|v_input_111|10|len10|
|v_input_112|20|len20|
|v_input_113|50|len50|
|v_input_114|100|len100|
|v_input_115|200|len200|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-15 00:00:00
end: 2023-09-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

//*****************************************************************************************************************************************//
// @sahilmpatel1
// Idea was to create a script that would capture common oscillations in the market.
// This script contains 10 active cases. Cases start at around line 1020.
// OC1, OC2, STB1, STB2 are shorter trend buy cases
// MTB3 and MTB4 are medium trend buy cases
// LTB1 is a long trend buy case
// SC1, SC2, SC3 are shorting cases
// You can toggle the cases (and plots) on and off from the format menu to see which cases work best for you. (Which I suggest)
// Pyramiding is set at 4. 
// Credit to many of the public indicators that helped me create this case study. 
// Reach out with any recommendations or questions.
//*****************************************************************************************************************************************//

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////Case Study//////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

strategy("Oscillating Market Case Study",pyramiding=4, overlay=true)
source = close

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////TOGGLE ON/OFF CASES//////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
longcases= input(title="Long Cases - On/Off", type=bool, defval=true)
shortcases= input(title="Short Cases - On/Off", type=bool, defval=true)
STcases= input(title="ST Cases - On/Off", type=bool, defval=true)
MTcases= input(title="MT Cases - On/Off", type=bool, defval=true)
LTcases= input(title="LT Cases - On/Off", type=bool, defval=true)

longcasesplot= input(title="Long Cases Plot - On/Off", type=bool, defval=true)
shortcasesplot= input(title="Short Cases Plot - On/Off", type=bool, defval=true)
STcasesplot= input(title="ST Cases Plot - On/Off", type=bool, defval=true)
MTcasesplot= input(title="MT Cases Plot - On/Off", type=bool, defval=true)
LTcasesplot= input(title="LT Cases Plot - On/Off", type=bool, defval=true)

BREAKt= input(title="**********BREAK**********", type=bool, defval=false)

aOC1 = input(title="OC1 - On/Off", type=bool, defval=true)
aOC1p = input(title="OC1 Plot - On/Off", type=bool, defval=true)
aOC2 = input(title="OC2 - On/Off", type=bool, defval=true)
aOC2p = input(title="OC2 Plot - On/Off", type=bool, defval=true)

aST1 = input(title="STB1 - On/Off", type=bool, defval=true)
aST1p = input(title="STB1 Plot - On/Off", type=bool, defval=true)
aST2 = input(title="STB2 - On/Off", type=bool, defval=true)
aST2p = input(title="STB2 Plot - On/Off", type=bool, defval=true)

// aMT1 = input(title="On/Off MTB1", type=bool, defval=true)
// aMT1p = input(title="On/Off MTB1 Plot", type=bool, defval=true)
// aMT2 = input(title="On/Off MTB2", type=bool, defval=true)
// aMT2p = input(title="On/Off MTB2 Plot", type=bool, defval=true)
aMT3 = input(title="MTB3 - On/Off", type=bool, defval=true)
aMT3p = input(title="MTB3 Plot - On/Off", type=bool, defval=true)
aMT4 = input(title="MTB4 - On/Off", type=bool, defval=true)
aMT4p = input(title="MTB4 Plot - On/Off", type=bool, defval=true)


aLT1 = input(title="LTB1 - On/Off", type=bool, defval=true)
aLT1p = input(title="LTB1 Plot - On/Off", type=bool, defval=true)
// aLT2 = input(title="On/Off LTB2", type=bool, defval=true)
// aLT2p = input(title="On/Off LTB2 Plot", type=bool, defval=true)

aSC1 = input(title="SC1 - On/Off", type=bool, defval=true)
aSC2 = input(title="SC2 - On/Off", type=bool, defval=true)
aSC3 = input(title="SC3 - On/Off", type=bool, defval=true)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////Butterworth Filter Application////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//POLE CALCULATION
lenBW1 = 1
lenBW2 = 2
lenBW5 = 5
lenBW7 = 7
lenBW10=10
lenBW20=20
lenBW25=25
lenBW30=30
lenBW40=40
lenBW50=50
pi=3.14159265
DTR=pi/180     // To convert degrees to radians multiply by this DTR


// 2 Poles BW 1
a21BW1=exp(-sqrt(2)*pi/lenBW1) //Use input length
b21BW1=2*a21BW1*cos(DTR*(sqrt(2)*180/lenBW1))
cf21BW1=(1-b21BW1+a21BW1*a21BW1)/4
cf22BW1=b21BW1
cf23BW1=-a21BW1*a21BW1

// 2 Poles BW 2
a21BW2=exp(-sqrt(2)*pi/lenBW2) //Use input length
b21BW2=2*a21BW2*cos(DTR*(sqrt(2)*180/lenBW2))
cf21BW2=(1-b21BW2+a21BW2*a21BW2)/4
cf22BW2=b21BW2
cf23BW2=-a21BW2*a21BW2

// 2 Poles BW 5
a21BW5=exp(-sqrt(2)*pi/lenBW5) //Use input length
b21BW5=2*a21BW5*cos(DTR*(sqrt(2)*180/lenBW5))
cf21BW5=(1-b21BW5+a21BW5*a21BW5)/4
cf22BW5=b21BW5
cf23BW5=-a21BW5*a21BW5

// 2 Poles BW 7
a21BW7=exp(-sqrt(2)*pi/lenBW7) //Use input length
b21BW7=2*a21BW7*cos(DTR*(sqrt(2)*180/lenBW7))
cf21BW7=(1-b21BW7+a21BW7*a21BW7)/4
cf22BW7=b21BW7
cf23BW7=-a21BW7*a21BW7

// 2 Poles BW 10
a21BW10=exp(-sqrt(2)*pi/lenBW10) //Use input length
b21BW10=2*a21BW10*cos(DTR*(sqrt(2)*180/lenBW10))
cf21BW10=(1-b21BW10+a21BW10*a21BW10)/4
cf22BW10=b21BW10
cf23BW10=-a21BW10*a21BW10

// 2 Poles BW 20
a21BW20=exp(-sqrt(2)*pi/lenBW20) //Use input length
b21BW20=2*a21BW20*cos(DTR*(sqrt(2)*180/lenBW20))
cf21BW20=(1-b21BW20+a21BW20*a21BW20)/4
cf22BW20=b21BW20
cf23BW20=-a21BW20*a21BW20

// 2 Poles BW 25
a21BW25=exp(-sqrt(2)*pi/lenBW25) //Use input length
b21BW25=2*a21BW25*cos(DTR*(sqrt(2)*180/lenBW25))
cf21BW25=(1-b21BW25+a21BW25*a21BW25)/4
cf22BW25=b21BW25
cf23BW25=-a21BW25*a21BW25

// 2 Poles BW 30
a21BW30=exp(-sqrt(2)*pi/lenBW30) //Use input length
b21BW30=2*a21BW30*cos(DTR*(sqrt(2)*180/lenBW30))
cf21BW30=(1-b21BW30+a21BW30*a21BW30)/4
cf22BW30=b21BW30
cf23BW30=-a21BW30*a21BW30

// 2 Poles BW 40
a21BW40=exp(-sqrt(2)*pi/lenBW40) //Use input length
b21BW40=2*a21BW40*cos(DTR*(sqrt(2)*180/lenBW40))
cf21BW40=(1-b21BW40+a21BW40*a21BW40)/4
cf22BW40=b21BW40
cf23BW40=-a21BW40*a21BW40

// 2 Poles BW 50
a21BW50=exp(-sqrt(2)*pi/lenBW50) //Use input length
b21BW50=2*a21BW50*cos(DTR*(sqrt(2)*180/lenBW50))
cf21BW50=(1-b21BW50+a21BW50*a21BW50)/4
cf22BW50=b21BW50
cf23BW50=-a21BW50*a21BW50

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////***************************INDICATORS***************************/////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////BOLLINGER BANDS/////////////////////////////////////
length = input(20,minval=1)
mult = input(2.5,minval=0.001,maxval=50)
basis = sma(source,length)
dev = mult * stdev(source,length)
upperbb = basis + dev
lowerbb = basis - dev
diffTo20MA=abs(source-basis)
diffTolowerbb=abs(source-lowerbb)
percentGapBB=abs(upperbb-lowerbb)/lowerbb*100

//Bollinger Bands Error
error = 0.0
error := (abs(source - lowerbb)/lowerbb)*100


///////////////////////////////////////////RATE OF CHANGE//////////////////////////////////
//Template
//ROC Length ###
// lenROC = input(9,minval=1)
// ROC = 0.0
// ROC := 100*(source-source[lenROC])/source[lenROC]
// //BW ROC Short Period - BW Length = ##
// butROC = 0.0
// butROC := cf21BW*(ROC+2*nz(ROC[1])+nz(ROC[2]))+cf22BW*nz(butROC[1])+cf23BW*nz(butROC[2])
// //BW Slope Derivations
// slopeROC = nz(butROC[1]) - nz(butROC[2]) - (nz(butROC[2]) - nz(butROC[3]) )
// slopeROC2 = (butROC - butROC[2])/2

//Short Period - ROC(9)
lenROCshort = input(9,minval=1)
ROCshort = 0.0
ROCshort := 100*(source-source[lenROCshort])/source[lenROCshort]
//BW ROC Short Period: BW Length = 5
butROCshort = 0.0
butROCshort := cf21BW1*(ROCshort+2*nz(ROCshort[1])+nz(ROCshort[2]))+cf22BW1*nz(butROCshort[1])+cf23BW1*nz(butROCshort[2])
//BW Short Slope Derivations
slopeROCshort = nz(butROCshort[1]) - nz(butROCshort[2]) - (nz(butROCshort[2]) - nz(butROCshort[3]) )
slopeROCshort2 = (butROCshort - butROCshort[2])/2

//Medium Period - ROC(30)
lenROCmed=input(30,minval=1)
ROCmed = 0.0
ROCmed := 100*(source-source[lenROCmed])/source[lenROCmed]
//BW ROC Medium Period - BW Length = 30
butROCmed = 0.0
butROCmed := cf21BW30*(ROCmed+2*nz(ROCmed[1])+nz(ROCmed[2]))+cf22BW30*nz(butROCmed[1])+cf23BW30*nz(butROCmed[2])
//BW Medium Slope Derivations
slopeROCmed = nz(butROCmed[1]) - nz(butROCmed[2]) - (nz(butROCmed[2]) - nz(butROCmed[3]) )
slopeROCmed2 = (butROCmed - butROCmed[2])/2

//Long Period - ROC(100)
lenROClong=input(100,minval=1)
ROClong = 0.0
ROClong := 100*(source-source[lenROClong])/source[lenROClong]
//BW ROC Long Period - BW Length = 50
butROClong = 0.0
butROClong := cf21BW50*(ROClong+2*nz(ROClong[1])+nz(ROClong[2]))+cf22BW50*nz(butROClong[1])+cf23BW50*nz(butROClong[2])
//BW Long Slope Derivations
slopeROClong = nz(butROClong[1]) - nz(butROClong[2]) - (nz(butROClong[2]) - nz(butROClong[3]) )
slopeROClong2 = (butROClong - butROClong[2])/2


/////////////////////////////////CHANDE MOMENTUM OSCILLATOR////////////////////////////////
//CONSTANTS
momm = change(source)
f1(m) => m >= 0.0 ? m : 0.0
f2(m) => m >= 0.0 ? 0.0 : -m
m1 = f1(momm)
m2 = f2(momm)

//TEMPLATE - CMO(#)
// lenMO = input(9, minval=1)
// sm1 = sum(m1, lenMO)
// sm2= sum(m2, lenMO)
// percent(nom, div) => 100 * nom / div
// chandeMO = percent(sm1-sm2, sm1short+sm2)
// //BW CMO Period: BW Length = 5
// butCMO = 0.0
// butCMO := cf21BW*(chandeMO+2*nz(chandeMO[1])+nz(chandeMO[2]))+cf22BW*nz(butCMO[1])+cf23BW*nz(butCMO[2])
// //BW CMO Slope Analysis
// slopeCMO = nz(butCMO[1]) - nz(butCMO[2]) - (nz(butCMO[2]) - nz(butCMO[3]) )
// slopeCMO2 = (butCMO - butCMO[2])/2

//Short - CMO(9)
lenMOshort = input(9, minval=1)
sm1short = sum(m1, lenMOshort)
sm2short = sum(m2, lenMOshort)
percent(nom, div) => 100 * nom / div
chandeMOshort = percent(sm1short-sm2short, sm1short+sm2short)
//BW CMO short Period: BW Length = 5
butCMOshort = 0.0
butCMOshort := cf21BW1*(chandeMOshort+2*nz(chandeMOshort[1])+nz(chandeMOshort[2]))+cf22BW1*nz(butCMOshort[1])+cf23BW1*nz(butCMOshort[2])
//BW CMO Long Slope Analysis
slopeCMOshort = nz(butCMOshort[1]) - nz(butCMOshort[2]) - (nz(butCMOshort[2]) - nz(butCMOshort[3]) )
slopeCMOshort2 = (butCMOshort - butCMOshort[2])/2

//Medium - CMO(30)
lenMOmed = input(30, minval=1)
sm1med = sum(m1, lenMOmed)
sm2med = sum(m2, lenMOmed)
chandeMOmed = percent(sm1med-sm2med, sm1med+sm2med)
//BW CMO Long Period - BW Length = 20
butCMOmed = 0.0
butCMOmed := cf21BW20*(chandeMOmed+2*nz(chandeMOmed[1])+nz(chandeMOmed[2]))+cf22BW50*nz(butCMOmed[1])+cf23BW20*nz(butCMOmed[2])
//BW CMO Long Slope Analysis
slopeCMOmed = nz(butCMOmed[1]) - nz(butCMOmed[2]) - (nz(butCMOmed[2]) - nz(butCMOmed[3]) )
slopeCMOmed2 = (butCMOmed - butCMOmed[2])/2

//Long - CMO(50)
lenMOlong = input(50, minval=1)
sm1long = sum(m1, lenMOlong)
sm2long = sum(m2, lenMOlong)
chandeMOlong = percent(sm1long-sm2long, sm1long+sm2long)
//BW CMO Long Period - BW Length = 20
butCMOlong = 0.0
butCMOlong := cf21BW20*(chandeMOlong+2*nz(chandeMOlong[1])+nz(chandeMOlong[2]))+cf22BW50*nz(butCMOlong[1])+cf23BW20*nz(butCMOlong[2])
//BW CMO Long Slope Analysis
slopeCMOlong = nz(butCMOlong[1]) - nz(butCMOlong[2]) - (nz(butCMOlong[2]) - nz(butCMOlong[3]) )
slopeCMOlong2 = (butCMOlong - butCMOlong[2])/2

/////////////////////////////////////////RSI///////////////////////////////////////////////
//TEMPLATE
// lengthRSI=input(14,minval=1)
// upRSI = rma(max(change(source), 0), lengthRSI)
// downRSI = rma(-min(change(source), 0), lengthRSI)
// RSI = downRSI == 0 ? 100 : upRSI == 0 ? 0 : 100 - (100 / (1 + upRSI / downRSI))
// butRSI = 0.0
// butRSI := cf21BW1*(RSI+2*nz(RSI[1])+nz(RSI[2]))+cf22BW1*nz(butRSI[1])+cf23BW1*nz(butRSI[2])
// slopeRSIpt1 = (butRSI - butRSI[2])/2

//Default - RSI(14)
lengthRSI=input(14,minval=1)
upRSI = rma(max(change(source), 0), lengthRSI)
downRSI = rma(-min(change(source), 0), lengthRSI)
RSI = downRSI == 0 ? 100 : upRSI == 0 ? 0 : 100 - (100 / (1 + upRSI / downRSI))
butRSI = 0.0
butRSI := cf21BW1*(RSI+2*nz(RSI[1])+nz(RSI[2]))+cf22BW1*nz(butRSI[1])+cf23BW1*nz(butRSI[2])
slopeRSIpt = (butRSI - butRSI[2])/2


//////////////////////////////////STOCHASTIC RSI///////////////////////////////////////////
smoothK = input(3, minval=1)
smoothD = input(3, minval=1)

//Short Period - StochRSI(3, 3, 14, 14)
lenRSIshort = input(14, minval=1)
lenStochshort = input(14, minval=1)
RSIshort = rsi(source,lenRSIshort)
kshort = sma(stoch(RSIshort, RSIshort, RSIshort, lenStochshort), smoothK)
dshort = sma(kshort, smoothD)

//Medium Period - StochRSI(3, 3, 50, 50) BW20
lenRSImed = input(50, minval=1)
lenStochmed = input(50, minval=1)
RSImed = rsi(source,lenRSImed)
kmed = sma(stoch(RSImed, RSImed, RSImed, lenStochmed), smoothK)
dmed = sma(kmed, smoothD)
//K and D BW Values - BW Length = 30
butKmed=0.0
butDmed=0.0
butKmed:=cf21BW20*(kmed+2*nz(kmed[1])+nz(kmed[2]))+cf22BW20*nz(butKmed[1])+cf23BW20*nz(butKmed[2])
butDmed:=cf21BW20*(dmed+2*nz(dmed[1])+nz(dmed[2]))+cf22BW20*nz(butDmed[1])+cf23BW20*nz(butDmed[2])
//BW Slopes
slopeKmed = nz(butKmed[1]) - nz(butKmed[2]) - (nz(butKmed[2]) - nz(butKmed[3]) ) > 0
slopeK2med = butKmed - butKmed[5]
slopeDmed = nz(butDmed[1]) - nz(butDmed[2]) - (nz(butDmed[2]) - nz(butDmed[3]) ) > 0
slopeD2med = (butDmed - butDmed[2])/2

//Long Period - StochRSI(3, 3, 100, 100)
lenRSIlong = input(100, minval=1)
lenStochlong = input(100, minval=1)
RSIlong = rsi(source,lenRSIlong)
klong = sma(stoch(RSIlong, RSIlong, RSIlong, lenStochlong), smoothK)
dlong = sma(klong, smoothD)


///////////////////////////////////////MACD////////////////////////////////////////////////
//Moving Average Convergence Divergence
//TEMPLATE - MACD(##, ##, ##)
// fastlen = input(50, minval=1)
// slowlen = input(100,minval=1)
// signallen = input(5,minval=1)
// fastMA = ema(source, fastlen)
// slowMA = ema(source, slowlen)
// MACD = fastMA - slowMA //blue
// MACDslope = (MACD-MACD[1])
// signal = ema(MACD, signallen) //orange
// hist = MACD - signal
// //BW MACD and Signal: BW Length = 
// butMACD=0.0
// butMACD:=cf21BW*(MACD+2*nz(MACD[1])+nz(MACD[2]))+cf22BW*nz(butMACD[1])+cf23BW*nz(butMACD[2])
// butSignal = 0.0
// butSignal:=cf21BW*(signal+2*nz(signal[1])+nz(signal[2]))+cf22BW*nz(butSignal[1])+cf23BW*nz(butSignal[2])
// //BW Slope Analysis
// slopeMACD = nz(butMACD[1]) - nz(butMACD[2]) - (nz(butMACD[2]) - nz(butMACD[3]) ) > 0
// slopeMACD2 = (butMACD - butMACD[2])/2
// slopeSignal = nz(butSignal[1]) - nz(butSignal[2]) - (nz(butSignal[2]) - nz(butSignal[3]) ) > 0
// slopeSignal2 = (butSignal - butSignal[2])/2
//BW MACD Percent Gap
// BWpercentGapMACD = 0.0
// BWpercentGapMACD := (abs(butMACD-butSignal)/butSignal)*100

//Short - MACD(5,10, 5)
fastlenshort = input(5, minval=1)
slowlenshort =input(10,minval=1)
signallenshort = input(5,minval=1)
fastMAshort = ema(source, fastlenshort)
slowMAshort = ema(source, slowlenshort)
MACDshort = fastMAshort - slowMAshort //blue
signalshort = ema(MACDshort, signallenshort) //orange
hist = MACDshort - signalshort
MACDslopeshort = (MACDshort-MACDshort[2])/2

//Medium - MACD(20, 40, 5)
fastlenmed = input(20, minval=1)
slowlenmed = input(40,minval=1)
signallenmed = input(5,minval=1)
fastMAmed = ema(source, fastlenmed)
slowMAmed = ema(source, slowlenmed)
MACDmed = fastMAmed - slowMAmed //blue
MACDslopemed = (MACDmed-MACDmed[2])/2
signalmed = ema(MACDmed, signallenmed) //orange
histmed = MACDmed - signalmed

//Long - MACD(50,100, 20)
fastlenlong = input(50, minval=1)
slowlenlong = input(100,minval=1)
signallenlong = input(20,minval=1)
fastMAlong = ema(source, fastlenlong)
slowMAlong = ema(source, slowlenlong)
MACDlong = fastMAlong - slowMAlong //blue
MACDslopelong = (MACDlong-MACDlong[2])/2
signallong = ema(MACDlong, signallenlong) //orange
histlong = MACDlong - signallong
//BW MACD and Signal: BW Length = 40
butMACDlong=0.0
butMACDlong:=cf21BW40*(MACDlong+2*nz(MACDlong[1])+nz(MACDlong[2]))+cf22BW40*nz(butMACDlong[1])+cf23BW40*nz(butMACDlong[2])
butSignallong=0.0
butSignallong:=cf21BW40*(signallong+2*nz(signallong[1])+nz(signallong[2]))+cf22BW40*nz(butSignallong[1])+cf23BW40*nz(butSignallong[2])
//BW Slope long
slopeMACDlong = nz(butMACDlong[1]) - nz(butMACDlong[2]) - (nz(butMACDlong[2]) - nz(butMACDlong[3]) ) > 0
slopeMACD2long = (butMACDlong - butMACDlong[2])/2
slopeSignallong = nz(butSignallong[1]) - nz(butSignallong[2]) - (nz(butSignallong[2]) - nz(butSignallong[3]) ) > 0
slopeSignal2long = (butSignallong - butSignallong[2])/2

//MACD Default 12, 26, close, 9
fastlendef = input(12, minval=1)
slowlendef = input(26,minval=1)
signallendef = input(9,minval=1)
fastMAdef = ema(source, fastlendef)
slowMAdef = ema(source, slowlendef)
MACDdef = fastMAdef - slowMAdef //blue
MACDslopedef = (MACDdef-MACDdef[2])/2
signaldef = ema(MACDdef, signallendef) //orange
histdef = MACDdef - signaldef
//BW MACD and Signal: BW Length = 1
butMACDdef=0.0
butMACDdef:=cf21BW1*(MACDdef+2*nz(MACDdef[1])+nz(MACDdef[2]))+cf22BW1*nz(butMACDdef[1])+cf23BW1*nz(butMACDdef[2])
butSignaldef = 0.0
butSignaldef:=cf21BW1*(signaldef+2*nz(signaldef[1])+nz(signaldef[2]))+cf22BW1*nz(butSignaldef[1])+cf23BW1*nz(butSignaldef[2])
//BW Slope Analysis
slopeMACDdef = nz(butMACDdef[1]) - nz(butMACDdef[2]) - (nz(butMACDdef[2]) - nz(butMACDdef[3]) ) > 0
slopeMACD2def = (butMACDdef - butMACDdef[2])/2
slopeSignaldef = nz(butSignaldef[1]) - nz(butSignaldef[2]) - (nz(butSignaldef[2]) - nz(butSignaldef[3]) ) > 0
slopeSignal2def = (butSignaldef - butSignaldef[2])/2
//BW MACD Def Percent Gap
BWpercentGapMACDdef = 0.0
BWpercentGapMACDdef := (abs(butMACDdef)-abs(butSignaldef))/abs(butSignaldef)*100


///////////////////////////////////////VORTEX INDICATOR////////////////////////////////////
//TEMPLATE
// period_ = input(100, minval=2)
// VMP = sum( abs( high - low[1]), period_ )
// VMM = sum( abs( low - high[1]), period_ )
// STR = sum( atr(1), period_ )
// VIP = VMP / STR //blue
// VIM = VMM / STR //pink
// percentGapVI = 0.0
// percentGapVI := (abs(VIP-VIM)/VIM)*100
// //BW VI Long Period - BW Length = 20
// butVIP = 0.0
// butVIM = 0.0
// butVIP := cf21BW*(VIP+2*nz(VIP[1])+nz(VIP[2]))+cf22BW*nz(butVIP[1])+cf23BW*nz(butVIP[2])
// butVIM := cf21BW*(VIM+2*nz(VIM[1])+nz(VIM[2]))+cf22BW*nz(butVIM[1])+cf23BW*nz(butVIM[2])
// //BW VI Long Slope Analysis
// slopeVIM = nz(butVIM[1]) - nz(butVIM[2]) - (nz(butVIM[2]) - nz(butVIM[3]) )
// slopeVIM2 = (butVIM - butVIM[2])/2
// slopeVIP = nz(butVIP[1]) - nz(butVIP[2]) - (nz(butVIP[2]) - nz(butVIP[3]) )
// slopeVIP2 = (butVIP - butVIP[2])/2
// //BW VI Long percent gap
// BWpercentGapVI = 0.0
// BWpercentGapVI := (abs(butVIP-butVIM)/butVIM)*100

//////////////SHORT////////////// (14)
period_short = input(14, minval=2)
VMPshort = sum( abs( high - low[1]), period_short )
VMMshort = sum( abs( low - high[1]), period_short )
STRshort = sum( atr(1), period_short )
VIPshort = VMPshort / STRshort //blue
VIMshort = VMMshort / STRshort //pink
percentGapVIshort = 0.0
percentGapVIshort := (abs(VIPshort-VIMshort)/VIMshort)*100

//////////////MEDIUM////////////// (30, BW20)
period_med = input(30, minval=2)
VMPmed = sum( abs( high - low[1]), period_med )
VMMmed = sum( abs( low - high[1]), period_med )
STRmed = sum( atr(1), period_med )
VIPmed = VMPmed / STRmed //blue
VIMmed = VMMmed / STRmed //pink
percentGapVImed = 0.0
percentGapVImed := (abs(VIPmed-VIMmed)/VIMmed)*100
//BW VI Med Period - BW Length = 20
butVIPmed = 0.0
butVIMmed = 0.0
butVIPmed := cf21BW20*(VIPmed+2*nz(VIPmed[1])+nz(VIPmed[2]))+cf22BW20*nz(butVIPmed[1])+cf23BW20*nz(butVIPmed[2])
butVIMmed := cf21BW20*(VIMmed+2*nz(VIMmed[1])+nz(VIMmed[2]))+cf22BW20*nz(butVIMmed[1])+cf23BW20*nz(butVIMmed[2])
//BW DI Med Slope Analysis
slopeVIMmed = nz(butVIMmed[1]) - nz(butVIMmed[2]) - (nz(butVIMmed[2]) - nz(butVIMmed[3]) )
slopeVIMmed2 = (butVIMmed - butVIMmed[2])/2
slopeVIPmed = nz(butVIPmed[1]) - nz(butVIPmed[2]) - (nz(butVIPmed[2]) - nz(butVIPmed[3]) )
slopeVIPmed2 = (butVIPmed - butVIPmed[2])/2
//BW DI Med percent gap
BWpercentGapVImed = 0.0
BWpercentGapVImed := (abs(butVIPmed-butVIMmed)/butVIMmed)*100

//////////////LONG////////////// (100, BW30)
period_long = input(100, minval=2)
VMPlong = sum( abs( high - low[1]), period_long )
VMMlong = sum( abs( low - high[1]), period_long )
STRlong = sum( atr(1), period_long )
VIPlong = VMPlong / STRlong //blue
VIMlong = VMMlong / STRlong //pink
percentGapVIlong = 0.0
percentGapVIlong := (abs(VIPlong-VIMlong)/VIMlong)*100
//BW VI Long Period - BW Length = 20
butVIPlong = 0.0
butVIMlong = 0.0
butVIPlong := cf21BW30*(VIPlong+2*nz(VIPlong[1])+nz(VIPlong[2]))+cf22BW30*nz(butVIPlong[1])+cf23BW30*nz(butVIPlong[2])
butVIMlong := cf21BW30*(VIMlong+2*nz(VIMlong[1])+nz(VIMlong[2]))+cf22BW30*nz(butVIMlong[1])+cf23BW30*nz(butVIMlong[2])
//BW VI Long Slope Analysis
slopeVIMlong = nz(butVIMlong[1]) - nz(butVIMlong[2]) - (nz(butVIMlong[2]) - nz(butVIMlong[3]) )
slopeVIMlong2 = (butVIMlong - butVIMlong[2])/2
slopeVIPlong = nz(butVIPlong[1]) - nz(butVIPlong[2]) - (nz(butVIPlong[2]) - nz(butVIPlong[3]) )
slopeVIPlong2 = (butVIPlong - butVIPlong[2])/2
//BW VI Long percent gap
BWpercentGapVIlong = 0.0
BWpercentGapVIlong := (abs(butVIPlong-butVIMlong)/butVIMlong)*100

//Length 14, BW 1
period_14 = input(14, minval=2)
VMP14 = sum( abs( high - low[1]), period_14 )
VMM14 = sum( abs( low - high[1]), period_14 )
STR14 = sum( atr(1), period_14 )
VIP14 = VMP14 / STR14 //blue
VIM14 = VMM14 / STR14 //pink
percentGapVI14 = 0.0
percentGapVI14 := (abs(VIP14-VIM14)/VIM14)*100
//BW VI Long Period - BW Length = 20
butVIP14 = 0.0
butVIM14 = 0.0
butVIP14 := cf21BW1*(VIP14+2*nz(VIP14[1])+nz(VIP14[2]))+cf22BW1*nz(butVIP14[1])+cf23BW1*nz(butVIP14[2])
butVIM14 := cf21BW1*(VIM14+2*nz(VIM14[1])+nz(VIM14[2]))+cf22BW1*nz(butVIM14[1])+cf23BW1*nz(butVIM14[2])
//BW VI Long Slope Analysis
slopeVIM14 = nz(butVIM14[1]) - nz(butVIM14[2]) - (nz(butVIM14[2]) - nz(butVIM14[3]) )
slopeVIM142 = (butVIM14 - butVIM14[2])/2
slopeVIP14 = nz(butVIP14[1]) - nz(butVIP14[2]) - (nz(butVIP14[2]) - nz(butVIP14[3]) )
slopeVIP142 = (butVIP14 - butVIP14[2])/2
//BW VI Long percent gap
BWpercentGapVI14 = 0.0
BWpercentGapVI14 := (abs(butVIP14-butVIM14)/butVIM14)*100

//Length 50, BW 30
period_50 = input(50, minval=2)
VMP50 = sum( abs( high - low[1]), period_50 )
VMM50 = sum( abs( low - high[1]), period_50 )
STR50 = sum( atr(1), period_50 )
VIP50 = VMP50 / STR50 //blue
VIM50 = VMM50 / STR50 //pink
percentGapVI50 = 0.0
percentGapVI50 := (abs(VIP50-VIM50)/VIM50)*100
//BW VI Long Period - BW Length = 25
butVIP50 = 0.0
butVIM50 = 0.0
butVIP50 := cf21BW30*(VIP50+2*nz(VIP50[1])+nz(VIP50[2]))+cf22BW30*nz(butVIP50[1])+cf23BW30*nz(butVIP50[2])
butVIM50 := cf21BW30*(VIM50+2*nz(VIM50[1])+nz(VIM50[2]))+cf22BW30*nz(butVIM50[1])+cf23BW30*nz(butVIM50[2])
//BW VI Long Slope Analysis
slopeVIM50 = nz(butVIM50[1]) - nz(butVIM50[2]) - (nz(butVIM50[2]) - nz(butVIM50[3]) )
slopeVIM502 = (butVIM50 - butVIM50[2])/2
slopeVIP50 = nz(butVIP50[1]) - nz(butVIP50[2]) - (nz(butVIP50[2]) - nz(butVIP50[3]) )
slopeVIP502 = (butVIP50 - butVIP50[2])/2
//BW VI Long percent gap
BWpercentGapVI50 = 0.0
BWpercentGapVI50 := (abs(butVIP50-butVIM50))/butVIM50*100

//Length 20, BW 10
period_20 = input(20, minval=2)
VMP20 = sum( abs( high - low[1]), period_20 )
VMM20 = sum( abs( low - high[1]), period_20 )
STR20 = sum( atr(1), period_20 )
VIP20 = VMP20 / STR20 //blue
VIM20 = VMM20 / STR20 //pink
percentGapVI20 = 0.0
percentGapVI20 := (abs(VIP20-VIM20)/VIM20)*100
//BW VI Long Period - BW Length = 25
butVIP20 = 0.0
butVIM20 = 0.0
butVIP20 := cf21BW10*(VIP20+2*nz(VIP20[1])+nz(VIP20[2]))+cf22BW10*nz(butVIP20[1])+cf23BW10*nz(butVIP20[2])
butVIM20 := cf21BW10*(VIM20+2*nz(VIM20[1])+nz(VIM20[2]))+cf22BW10*nz(butVIM20[1])+cf23BW10*nz(butVIM20[2])
//BW VI Long Slope Analysis
slopeVIM20 = nz(butVIM20[1]) - nz(butVIM20[2]) - (nz(butVIM20[2]) - nz(butVIM20[3]) )
slopeVIM202 = (butVIM20 - butVIM20[2])/2
slopeVIP20 = nz(butVIP20[1]) - nz(butVIP20[2]) - (nz(butVIP20[2]) - nz(butVIP20[3]) )
slopeVIP202 = (butVIP20 - butVIP20[2])/2
//BW VI Long percent gap
BWpercentGapVI20 = 0.0
BWpercentGapVI20 := (abs(butVIP20-butVIM20))/butVIM20*100


///////////////////////////////////ADX & DI////////////////////////////////////////////////
TrueRange = max(max(high-low, abs(high-nz(close[1]))), abs(low-nz(close[1])))
DirectionalMovementPlus = high-nz(high[1]) > nz(low[1])-low ? max(high-nz(high[1]), 0): 0
DirectionalMovementMinus = nz(low[1])-low > high-nz(high[1]) ? max(nz(low[1])-low, 0): 0

//TEMPLATE
// len = input(title="Length",  defval=9)
// SmoothedTrueRange = 0.0
// SmoothedTrueRange := nz(SmoothedTrueRange[1]) - (nz(SmoothedTrueRange[1])/len) + TrueRange
// SmoothedDirectionalMovementPlus = 0.0
// SmoothedDirectionalMovementPlus := nz(SmoothedDirectionalMovementPlus[1]) - (nz(SmoothedDirectionalMovementPlus[1])/len) + DirectionalMovementPlus
// SmoothedDirectionalMovementMinus = 0.0
// SmoothedDirectionalMovementMinus := nz(SmoothedDirectionalMovementMinus[1]) - (nz(SmoothedDirectionalMovementMinus[1])/len) + DirectionalMovementMinus
// DIPlus = 0.0
// DIPlus := SmoothedDirectionalMovementPlus / SmoothedTrueRange * 100 //green
// DIMinus = 0.0
// DIMinus := SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100 //red
// DX = 0.0
// DX := abs(DIPlus-DIMinus) / (DIPlus+DIMinus)*100
// ADX = sma(DX, len) //black
// ADXslope = (ADX-ADX[1])
// DIpercentgap =  abs(DIPlus-DIMinus)/DIMinus* 100
// //BW DI Long Period - BW Length = ###
// butDIP = 0.0
// butDIM = 0.0
// butDIP := cf21BW*(DIPlus+2*nz(DIPlus[1])+nz(DIPlus[2]))+cf22BW*nz(butDIP[1])+cf23BW*nz(butDIP[2])
// butDIM := cf21BW*(DIMinus+2*nz(DIMinus[1])+nz(DIMinus[2]))+cf22BW*nz(butDIM[1])+cf23BW*nz(butDIM[2])
// //BW DI Long Slope Analysis
// slopeDIM = nz(butDIM[1]) - nz(butDIM[2]) - (nz(butDIM[2]) - nz(butDIM[3]) )
// slopeDIM2 = (butDIM- butDIM[2])/2
// slopeDIP = nz(butDIP[1]) - nz(butDIP[2]) - (nz(butDIP[2]) - nz(butDIP[3]) )
// slopeDIP2 = (butDIP - butDIP[2])/2
// //BW DI percent gap
// BWpercentGapDI = 0.0
// BWpercentGapDI := (abs(butDIP-butDIM)/butDIM)*100

//////////////SHORT//////////////
lenshort = input(title="Length",  defval=9)
SmoothedTrueRangeshort = 0.0
SmoothedTrueRangeshort := nz(SmoothedTrueRangeshort[1]) - (nz(SmoothedTrueRangeshort[1])/lenshort) + TrueRange
SmoothedDirectionalMovementPlusshort = 0.0
SmoothedDirectionalMovementPlusshort := nz(SmoothedDirectionalMovementPlusshort[1]) - (nz(SmoothedDirectionalMovementPlusshort[1])/lenshort) + DirectionalMovementPlus
SmoothedDirectionalMovementMinusshort = 0.0
SmoothedDirectionalMovementMinusshort := nz(SmoothedDirectionalMovementMinusshort[1]) - (nz(SmoothedDirectionalMovementMinusshort[1])/lenshort) + DirectionalMovementMinus
DIPlusshort = 0.0
DIPlusshort := SmoothedDirectionalMovementPlusshort / SmoothedTrueRangeshort * 100 //green
DIMinusshort = 0.0
DIMinusshort := SmoothedDirectionalMovementMinusshort / SmoothedTrueRangeshort * 100 //red
DXshort = 0.0
DXshort := abs(DIPlusshort-DIMinusshort) / (DIPlusshort+DIMinusshort)*100
ADXshort = sma(DXshort, lenshort) //black
ADXslopeshort = (ADXshort-ADXshort[2])/2
DIpercentgapshort =  abs(DIPlusshort-DIMinusshort)/DIMinusshort * 100 

//////////////MEDIUM//////////////
lenmed = input(title="Length",  defval=30)
SmoothedTrueRangemed = 0.0
SmoothedTrueRangemed := nz(SmoothedTrueRangemed[1]) - (nz(SmoothedTrueRangemed[1])/lenmed) + TrueRange
SmoothedDirectionalMovementPlusmed = 0.0
SmoothedDirectionalMovementPlusmed := nz(SmoothedDirectionalMovementPlusmed[1]) - (nz(SmoothedDirectionalMovementPlusmed[1])/lenmed) + DirectionalMovementPlus
SmoothedDirectionalMovementMinusmed = 0.0
SmoothedDirectionalMovementMinusmed := nz(SmoothedDirectionalMovementMinusmed[1]) - (nz(SmoothedDirectionalMovementMinusmed[1])/lenmed) + DirectionalMovementMinus
DIPlusmed = 0.0
DIPlusmed := SmoothedDirectionalMovementPlusmed / SmoothedTrueRangemed * 100 //green
DIMinusmed = 0.0
DIMinusmed := SmoothedDirectionalMovementMinusmed / SmoothedTrueRangemed * 100 //red
DXmed = 0.0
DXmed := abs(DIPlusmed-DIMinusmed) / (DIPlusmed+DIMinusmed)*100
ADXmed = sma(DXmed, lenmed) //black
slopeADXmed = nz(ADXmed[1]) - nz(ADXmed[2]) - (nz(ADXmed[2]) - nz(ADXmed[3]) ) > 0
slopeADXmed2 = (ADXmed - ADXmed[2])/2
DIpercentgapmed =  abs(DIPlusmed-DIMinusmed)/DIMinusmed * 100 
//BW DI Med Period - BW Length = 20
butDIPmed = 0.0
butDIMmed = 0.0
butDIPmed := cf21BW20*(DIPlusmed+2*nz(DIPlusmed[1])+nz(DIPlusmed[2]))+cf22BW20*nz(butDIPmed[1])+cf23BW20*nz(butDIPmed[2])
butDIMmed := cf21BW20*(DIMinusmed+2*nz(DIMinusmed[1])+nz(DIMinusmed[2]))+cf22BW20*nz(butDIMmed[1])+cf23BW20*nz(butDIMmed[2])
//BW DI Med Slope Analysis
slopeDIMmed = nz(butDIMmed[1]) - nz(butDIMmed[2]) - (nz(butDIMmed[2]) - nz(butDIMmed[3]) )
slopeDIMmed2 = (butDIMmed - butDIMmed[2])/2
slopeDIPmed = nz(butDIPmed[1]) - nz(butDIPmed[2]) - (nz(butDIPmed[2]) - nz(butDIPmed[3]) )
slopeDIPmed2 = (butDIPmed - butDIPmed[2])/2
//BW DI Med percent gap
BWpercentGapDImed = 0.0
BWpercentGapDImed := (abs(butDIPmed-butDIMmed)/butDIMmed)*100

///////////////LONG/////////////////
lenlong = input(title="Length",  defval=100)
SmoothedTrueRangelong = 0.0
SmoothedTrueRangelong := nz(SmoothedTrueRangelong[1]) - (nz(SmoothedTrueRangelong[1])/lenlong) + TrueRange
SmoothedDirectionalMovementPluslong = 0.0
SmoothedDirectionalMovementPluslong := nz(SmoothedDirectionalMovementPluslong[1]) - (nz(SmoothedDirectionalMovementPluslong[1])/lenlong) + DirectionalMovementPlus
SmoothedDirectionalMovementMinuslong = 0.0
SmoothedDirectionalMovementMinuslong := nz(SmoothedDirectionalMovementMinuslong[1]) - (nz(SmoothedDirectionalMovementMinuslong[1])/lenlong) + DirectionalMovementMinus
DIPluslong = 0.0
DIPluslong := SmoothedDirectionalMovementPluslong / SmoothedTrueRangelong * 100 //green
DIMinuslong = 0.0
DIMinuslong := SmoothedDirectionalMovementMinuslong / SmoothedTrueRangelong * 100 //red
DXlong = 0.0
DXlong := abs(DIPluslong-DIMinuslong) / (DIPluslong+DIMinuslong)*100
ADXlong = sma(DXlong, lenlong) //black
//Derived Values
ADXslopelongpt = (ADXlong-ADXlong[5])/5 //Point Slope
ADXslopelongLT = (ADXlong-ADXlong[20])/20 //Long term slope
DIpercentgaplong =  abs(DIPluslong-DIMinuslong)/DIMinuslong * 100 
//BW DI Long Period - BW Length = 30
butDIPlong = 0.0
butDIMlong = 0.0
butDIPlong := cf21BW30*(DIPluslong+2*nz(DIPluslong[1])+nz(DIPluslong[2]))+cf22BW30*nz(butDIPlong[1])+cf23BW30*nz(butDIPlong[2])
butDIMlong := cf21BW30*(DIMinuslong+2*nz(DIMinuslong[1])+nz(DIMinuslong[2]))+cf22BW30*nz(butDIMlong[1])+cf23BW30*nz(butDIMlong[2])
//BW DI Long Slope Analysis
slopeDIMlong = nz(butDIMlong[1]) - nz(butDIMlong[2]) - (nz(butDIMlong[2]) - nz(butDIMlong[3]) )
slopeDIMlong2 = (butDIMlong - butDIMlong[2])/2
slopeDIPlong = nz(butDIPlong[1]) - nz(butDIPlong[2]) - (nz(butDIPlong[2]) - nz(butDIPlong[3]) )
slopeDIPlong2 = (butDIPlong - butDIPlong[2])/2
//BW DI percent gap
BWpercentGapDIlong = 0.0
BWpercentGapDIlong := (abs(butDIPlong-butDIMlong)/butDIMlong)*100

//ADX&DI Length 14
len14 = input(title="Length",  defval=14)
SmoothedTrueRange14 = 0.0
SmoothedTrueRange14 := nz(SmoothedTrueRange14[1]) - (nz(SmoothedTrueRange14[1])/len14) + TrueRange
SmoothedDirectionalMovementPlus14 = 0.0
SmoothedDirectionalMovementPlus14 := nz(SmoothedDirectionalMovementPlus14[1]) - (nz(SmoothedDirectionalMovementPlus14[1])/len14) + DirectionalMovementPlus
SmoothedDirectionalMovementMinus14 = 0.0
SmoothedDirectionalMovementMinus14 := nz(SmoothedDirectionalMovementMinus14[1]) - (nz(SmoothedDirectionalMovementMinus14[1])/len14) + DirectionalMovementMinus
DIPlus14 = 0.0
DIPlus14 := SmoothedDirectionalMovementPlus14 / SmoothedTrueRange14 * 100 //green
DIMinus14 = 0.0
DIMinus14 := SmoothedDirectionalMovementMinus14 / SmoothedTrueRange14 * 100 //red
DX14 = 0.0
DX14 := abs(DIPlus14-DIMinus14) / (DIPlus14+DIMinus14)*100
ADX14 = sma(DX14, len14) //black
ADXslope14 = (ADX14-ADX14[1])
DIpercentgap14 =  abs(DIPlus14-DIMinus14)/DIMinus14* 100
//BW DI Long Period - BW Length = ###
butDIP14 = 0.0
butDIM14 = 0.0
butDIP14 := cf21BW20*(DIPlus14+2*nz(DIPlus14[1])+nz(DIPlus14[2]))+cf22BW20*nz(butDIP14[1])+cf23BW20*nz(butDIP14[2])
butDIM14 := cf21BW20*(DIMinus14+2*nz(DIMinus14[1])+nz(DIMinus14[2]))+cf22BW20*nz(butDIM14[1])+cf23BW20*nz(butDIM14[2])
//BW DI Long Slope Analysis
slopeDIM14 = nz(butDIM14[1]) - nz(butDIM14[2]) - (nz(butDIM14[2]) - nz(butDIM14[3]) )
slopeDIM142 = (butDIM14- butDIM14[2])/2
slopeDIP14 = nz(butDIP14[1]) - nz(butDIP14[2]) - (nz(butDIP14[2]) - nz(butDIP14[3]) )
slopeDIP142 = (butDIP14 - butDIP14[2])/2
//BW DI percent gap
BWpercentGapDI14 = 0.0
BWpercentGapDI14 := (abs(butDIP14-butDIM14)/butDIM14)*100


//////////////////////////////////////CHOPPINESS///////////////////////////////////////////
//TEMPLATE
//Length, BW - (##, ##)
// lengthCI = input(50, minval=1)
// logb10=log10(lengthCI)
// sumATR=sum(atr(1),lengthCI)
// maxhi=highest(lengthCI)
// minlo=lowest(lengthCI)
// chop=100*log10(sumATR/(maxhi-minlo))/logb10
// butChoppiness=0.0
// butChoppiness:=cf21BW*(chop+2*nz(chop[1])+nz(chop[2]))+cf22BW*nz(butChoppiness[1])+cf23BW*nz(butChoppiness[2])

//Short - CI(20)
lengthCIshort = input(20, minval=1),
logb10short=log10(lengthCIshort)
sumATRshort=sum(atr(1),lengthCIshort)
maxhishort=highest(lengthCIshort)
minloshort=lowest(lengthCIshort)
chopshort=100*log10(sumATRshort/(maxhishort-minloshort))/logb10short

//Medium - CI(30)
lengthCImed = input(30, minval=1),
logb10med=log10(lengthCImed)
sumATRmed=sum(atr(1),lengthCImed)
maxhimed=highest(lengthCImed)
minlomed=lowest(lengthCImed)
chopmed=100*log10(sumATRmed/(maxhimed-minlomed))/logb10med
 
//Long - CI(200)
lengthCIlong = input(200, minval=1)
logb10long=log10(lengthCIlong)
sumATRlong=sum(atr(1),lengthCIlong)
maxhilong=highest(lengthCIlong)
minlolong=lowest(lengthCIlong)
choplong=100*log10(sumATRlong/(maxhilong-minlolong))/logb10long

//(50, 20)
lengthCI50 = input(50, minval=1)
logb1050=log10(lengthCI50)
sumATR50=sum(atr(1),lengthCI50)
maxhi50=highest(lengthCI50)
minlo50=lowest(lengthCI50)
chop50=100*log10(sumATR50/(maxhi50-minlo50))/logb1050
butChoppiness50=0.0
butChoppiness50:=cf21BW20*(chop50+2*nz(chop50[1])+nz(chop50[2]))+cf22BW20*nz(butChoppiness50[1])+cf23BW20*nz(butChoppiness50[2])


///////////////////////////////////KLINGER OSCILLATOR//////////////////////////////////////
signalLine = input(13, minval=1)
fastLength = input(34, minval=1)
slowLength= input(55, minval=1)
sv = change(hlc3) >= 0 ? volume : -volume
kvo = ema(sv, fastLength) - ema(sv, slowLength)
sig = ema(kvo, signalLine)
//Add BW?


//////////////////////////////////COPPOCK CURVE////////////////////////////////////////////
//TEMPLATE
//(WMA, Long ROC, Short ROC) - (###, ###, ###)
// wmaLength = input(title="WMA Length",  defval=200)
// longRoCLength = input(title="Long RoC Length",  defval=100)
// shortRoCLength = input(title="Short RoC Length",  defval=10)
// curve = wma(roc(source, shortRoCLength) + roc(source, longRoCLength), wmaLength)
// curveslopept = (curve-curve[1]) //Point Slope
// curveslope10pt = (curve-curve[5])/5 //5 Point Slope
// curveslopeLT = (curve-curve[20])/20 //Long Term Slope

//Short - CC(10,10,10)
wmaLengthshort = input(title="WMA Length",  defval=10)
longRoCLengthshort = input(title="Long RoC Length",  defval=10)
shortRoCLengthshort = input(title="Short RoC Length",  defval=10)
curveshort = wma(roc(source, longRoCLengthshort) + roc(source, shortRoCLengthshort), wmaLengthshort)
curveshortslope = (curveshort-curveshort[2])/2

//Medium - CC(20,20,20)
wmaLengthmed = input(title="WMA Length",  defval=20)
longRoCLengthmed = input(title="Long RoC Length",  defval=20)
shortRoCLengthmed = input(title="Short RoC Length",  defval=20)
curvemed = wma(roc(source, longRoCLengthmed) + roc(source, shortRoCLengthmed), wmaLengthmed)
curvemedslope = (curvemed-curvemed[2])/2

//Long - CC(200,200,20)
wmaLengthlong = input(title="WMA Length",  defval=200)
longRoCLengthlong = input(title="Long RoC Length",  defval=200)
shortRoCLengthlong = input(title="Short RoC Length",  defval=50)
curvelong = wma(roc(source, longRoCLengthlong) + roc(source, shortRoCLengthlong), wmaLengthlong)
curvelongslopept = (curvelong-curvelong[1]) //Point Slope
curvelongslope2pt = (curvelong-curvelong[2])/2 // 2 Point Slope
curvelongslope5pt = (curvelong-curvelong[5])/5 //5 Point Slope
curvelongslope10pt = (curvelong-curvelong[10])/10 //10 Point Slope
curvelongslopeLT = (curvelong-curvelong[20])/20 //Long Term Slope


//CC(200, 100, 10)
wmaLength20010010 = input(title="WMA Length",  defval=200)
longRoCLength20010010 = input(title="Long RoC Length",  defval=100)
shortRoCLength20010010 = input(title="Short RoC Length",  defval=10)
curve20010010 = wma(roc(source, shortRoCLength20010010) + roc(source, longRoCLength20010010), wmaLength20010010)
curveslopept20010010 = (curve20010010-curve20010010[1]) //Point Slope
curveslope5pt20010010 = (curve20010010-curve20010010[5])/5 //5 Point Slope
curveslopeLT20010010 = (curve20010010-curve20010010[20])/20 //Long Term Slope

//(WMA, Long ROC, Short ROC) - (100, 100, 20)
// wmaLength = input(title="WMA Length",  defval=200)
// longRoCLength = input(title="Long RoC Length",  defval=100)
// shortRoCLength = input(title="Short RoC Length",  defval=10)
// curve = wma(roc(source, shortRoCLength) + roc(source, longRoCLength), wmaLength)
// curveslopept = (curve-curve[1]) //Point Slope
// curveslope10pt = (curve-curve[5])/5 //5 Point Slope
// curveslopeLT = (curve-curve[20])/20 //Long Term Slope

//(WMA, Long ROC, Short ROC) - (50, 50, 20)
// wmaLength = input(title="WMA Length",  defval=200)
// longRoCLength = input(title="Long RoC Length",  defval=100)
// shortRoCLength = input(title="Short RoC Length",  defval=10)
// curve = wma(roc(source, shortRoCLength) + roc(source, longRoCLength), wmaLength)
// curveslopept = (curve-curve[1]) //Point Slope
// curveslope10pt = (curve-curve[5])/5 //5 Point Slope
// curveslopeLT = (curve-curve[20])/20 //Long Term Slope


/////////////////////////////////////TRIX//////////////////////////////////////////////////
//Short
lengthTRIXshort = input(5, minval=1)
TRIXshort = 10000* change(ema(ema(ema(log(close), lengthTRIXshort), lengthTRIXshort), lengthTRIXshort))
TRIXshortslope = (TRIXshort-TRIXshort[2])/2

//Medium
lengthTRIXmed = input(20, minval=1)
TRIXmed = 10000* change(ema(ema(ema(log(close), lengthTRIXmed), lengthTRIXmed), lengthTRIXmed))
TRIXmedslope = (TRIXmed-TRIXmed[2])/2

//Long
lengthTRIXlong = input(100, minval=1)
TRIXlong = 10000* change(ema(ema(ema(log(close), lengthTRIXlong), lengthTRIXlong), lengthTRIXlong))
TRIXlongslopept = (TRIXlong-TRIXlong[2])/2 //Point Slope
TRIXlongslopeLT = (TRIXlong-TRIXlong[10])/10 //Long Term Slope

//TRIX 10
lengthTRIX10 = input(10, minval=1)
TRIX10 = 10000* change(ema(ema(ema(log(close), lengthTRIX10), lengthTRIX10), lengthTRIX10))
TRIX10slope = (TRIX10-TRIX10[2])/2

//TRIX 30
lengthTRIX30 = input(30, minval=1)
TRIX30 = 10000* change(ema(ema(ema(log(close), lengthTRIX30), lengthTRIX30), lengthTRIX30))
TRIX30slope = (TRIX30-TRIX30[2])/2

//TRIX 40
lengthTRIX40 = input(40, minval=1)
TRIX40 = 10000* change(ema(ema(ema(log(close), lengthTRIX40), lengthTRIX40), lengthTRIX40))
TRIX40slope = (TRIX40-TRIX40[2])/2

//TRIX 50
lengthTRIX50 = input(50, minval=1)
TRIX50 = 10000* change(ema(ema(ema(log(close), lengthTRIX50), lengthTRIX50), lengthTRIX50))
TRIX50slope = (TRIX50-TRIX50[2])/2

//TRIX 80
lengthTRIX80 = input(80, minval=1)
TRIX80 = 10000* change(ema(ema(ema(log(close), lengthTRIX80), lengthTRIX80), lengthTRIX80))
TRIX80slope = (TRIX80-TRIX80[2])/2


////////////////////////////////////AWESOME OSCILLATOR/////////////////////////////////////
//Short
lengthAO1short=input(34,minval=1)
lengthAO2short=input(7,minval=1)
AOshortp1 = sma(hl2, lengthAO2short)
AOshortp2 = sma(hl2, lengthAO1short)
AOshort = 0.0
AOshort := AOshortp1 - AOshortp2
AOshortper = AOshort/close*100

//Medium
lengthAO1med=input(40,minval=1)
lengthAO2med=input(20,minval=1)
AOmed=0.0
AOmed := sma((high+low)/2, lengthAO1med) - sma((high+low/2), lengthAO2med)

//Long
lengthAO1long=input(200,minval=1)
lengthAO2long=input(50,minval=1)
AOlong=0.0
AOlong := sma((high+low)/2, lengthAO1long) - sma((high+low/2), lengthAO2long)
//reversalptAO is AOlong > AOlong[1] and AOlong[1]<AOlong[2]


/////////////////////////////////////////OBV & PVT//////////////////////////////////////////
//TEMPLATE - BW Length ###
// butOBVPVT = cf21BW*(xOBVPVT+2*nz(xOBVPVT[1])+nz(xOBVPVT[2]))+cf22BW*nz(butxOBVPVT[1])+cf23BW*nz(butxOBVPVT[2])
// slopeOBVPVT = butOBVPVT - butOBVPVT[5]

//CONSTANTS
OBVPVT = volume * (close - (close[1]))
xOBVPVT = cum(OBVPVT)


/////////////////////////////////ACCUMULATION/DISTRIBUTION//////////////////////////////////
//CONSTANTS
// ACDST = cum(close==high and close==low or high==low ? 0 : ((2*close-low-high)/(high-low))*volume)

//TEMPLATE
// ACDST BWLength ##
// butACDST=cf21BW*(ACDST+2*nz(ACDST[1])+nz(ACDST[2]))+cf22BW*nz(butACDST[1])+cf23BW*nz(butACDST[2])
// slopeACDST2 = butACDST - butACDST[5]


/////////////////////////////////////CHAIKIN OSCILLATOR/////////////////////////////////////
//TEMPLATE
//(Short, Long, BW) - (###, ###, ###)
// fastlenChOsc = input(3,minval=1)
// slowlenChOsc = input(10,minval=1)
// chOscshort10 = ema(accdist, fastlenChOsc) - ema(accdist, slowlenChOsc)
// //BW Chaikin Oscillator - Length BW = 1
// butchOsc = 0.0
// butchOsc := cf21BW1*(chOscshort+2*nz(chOsc[1])+nz(chOsc[2]))+cf22BW1*nz(butchOsc[1])+cf23BW1*nz(butchOsc[2])
// //BW Chaikin Osc Slope Analysis
// slopechOsc = nz(butchOsc[1]) - nz(butchOsc[2]) - (nz(butchOsc[2]) - nz(butchOsc[3]) ) > 0
// slopechOsc2 = (butchOsc - butchOsc[2])/2

//Short
fastlenshortChOsc = input(5,minval=1)
slowlenshortChOsc = input(10,minval=1)
chOscshort = ema(accdist, fastlenshortChOsc) - ema(accdist, slowlenshortChOsc)
//BW Chaikin Oscillator - Length BW = 1
butchOscshort = 0.0
butchOscshort := cf21BW1*(chOscshort+2*nz(chOscshort[1])+nz(chOscshort[2]))+cf22BW1*nz(butchOscshort[1])+cf23BW1*nz(butchOscshort[2])
//BW Chaikin Osc Slope Analysis
slopechOscshort = nz(butchOscshort[1]) - nz(butchOscshort[2]) - (nz(butchOscshort[2]) - nz(butchOscshort[3]) ) > 0
slopechOscshort2 = (butchOscshort - butchOscshort[2])/2

//Medium


//Large

//(10, 100, 1)
fastlenChOsc101001 = input(10,minval=1)
slowlenChOsc101001 = input(100,minval=1)
chOsc101001 = ema(accdist, fastlenChOsc101001) - ema(accdist, slowlenChOsc101001)
// BW Chaikin Oscillator - Length BW = 1
butchOsc101001 = 0.0
butchOsc101001 := cf21BW1*(chOsc101001+2*nz(chOsc101001[1])+nz(chOsc101001[2]))+cf22BW1*nz(butchOsc101001[1])+cf23BW1*nz(butchOsc101001[2])
// BW Chaikin Osc Slope Analysis
slopechOsc101001 = nz(butchOsc101001[1]) - nz(butchOsc101001[2]) - (nz(butchOsc101001[2]) - nz(butchOsc101001[3]) ) > 0
slopechOsc1010012 = (butchOsc101001 - butchOsc101001[2])/2

//(20, 40, 20)
fastlenChOsc204020 = input(20,minval=1)
slowlenChOsc204020 = input(40,minval=1)
chOsc204020 = ema(accdist, fastlenChOsc204020) - ema(accdist, slowlenChOsc204020)
// BW Chaikin Oscillator - Length BW = 20
butchOsc204020 = 0.0
butchOsc204020 := cf21BW20*(chOsc204020+2*nz(chOsc204020[1])+nz(chOsc204020[2]))+cf22BW20*nz(butchOsc204020[1])+cf23BW20*nz(butchOsc204020[2])
// BW Chaikin Osc Slope Analysis
slopechOsc204020 = nz(butchOsc204020[1]) - nz(butchOsc204020[2]) - (nz(butchOsc204020[2]) - nz(butchOsc204020[3]) ) > 0
slopechOsc2040202 = (butchOsc204020 - butchOsc204020[2])/2


/////////////////////////////////ADVANCE CHAIKIN MONEY FLOW/////////////////////////////////
// //CONSTANTS
// srcACMF=input(hlc3)
// mvsACMF = input(false, "Factor in Price (Money Volume)")
// trlACMF = min(low,close[1])
// trhACMF = max(high,close[1])

// //TEMPLATE
// lenACMF = input(20, minval=1)
// eACMF = input(10.0, minval=1) //Volume Exponent - (0-10 reduces & 10+ increases volume effect)
// wvACMF = pow(volume,eACMF/10.0)*(mvsACMF ? srcACMF : 1)
// adACMF = (trhACMF==trlACMF ? 0 : (2*close-(trhACMF+trlACMF))/tr(true))*wvACMF
// cmACMF = sum(adACMF, lenACMF)/sum(wvACMF, lenACMF)
// butACMF = 0.0
// butACMF := cf21BW*(ACMF+2*nz(ACMF[1])+nz(ACMF[2]))+cf22BW*nz(butACMF[1])+cf23BW*nz(butACMF[2])
// slopeACMF2 = butACMF - butACMF[5]


//Short


//Medium


//Large


/////////////////////////////////////////VOLATILITY//////////////////////////////////////////
//TEMPLATE
// lenVolt = input(10, minval=1)
// volATR = atr(lenVolt)
// volRes = ((lenVolt - 1) * nz(volRes[1], 0) + volATR) / lenVolt
// slopevolRes = volRes - volRes[5]

//Short


//Medium


//Large


//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////***************************MOVING AVERAGES***************************////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//McGinley Dynamic
lengthMGD = input(14, minval=1)
mgd = 0.0
mgd := na(mgd[1]) ? ema(source, lengthMGD) : mgd[1] + (source - mgd[1]) / (lengthMGD * pow(source/mgd[1], 4))

//TEMA
lengthTEMA = input(9, minval=1)
ema1 = ema(close, lengthTEMA)
ema2 = ema(ema1, lengthTEMA)
ema3 = ema(ema2, lengthTEMA)
outTEMA = 3 * (ema1 - ema2) + ema3

//LSMA
lengthLSMA = input(title="Length",  defval=15)
offsetLSMA = input(title="Offset",  defval=0)
LSMA = linreg(source, lengthLSMA, offsetLSMA)

//SMAs
len10 = input(10,minval=1)
len20 = input(20,minval=1)
len50 = input(50,minval=1)
len100 = input(100,minval=1)
len200 = input(200,minval=1)
MA10 = sma(source,len10)
MA20 = sma(source,len20)
MA50 = sma(source,len50)
MA100 = sma(source,len100)
MA200 = sma(source,len200)

//MA Calculations
LSTEMAdiff= abs(LSMA-outTEMA)
LSTEMApercentdiff=(abs(outTEMA-LSMA)/outTEMA)*100


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////**************************************************************CASES****************************************************************/////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////*************************OLD BUY CASES*************************//////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//GIVE ALL THESE CASES DESCRIPTIONS w/ L/M/S TREND CLASSIFICATION//

///////////////////////////////BUY CASES////////////////////////////////

//*******************************************************************************************************************//
//************************************Use OC2 in conjunction with OC1************************************************//
//*******************************************************************************************************************//

//*************Carry Over 1 - OC1 (Previously Buy 1B): Downtrend Oscillations captured by ROC, RSI, MACD*************//
//**********************************//
// ROCshort(9, BW1)
// RSI(14)
// StochRSI(3, 3, 14, 14)
// ChandeMOshort(9, BW1)
// MACDdef(12, 26, 9)
// VI(14)
//**********************************//
if (ROCshort <= 0.0 and butRSI <= 49.00 and kshort <= 20.00 and dshort <= 20.00 and histdef<0.0 and MACDdef<0.0 and signaldef<0.0 and chandeMOshort<0.0 and VIP14<VIM14 and VIM14<VIM14[1])
    strategy.entry("OC1", longcases ? (STcases ? (aOC1 ? strategy.long : na) : na) : na, stop=lowerbb,comment="OC1")
else
    strategy.cancel(id="OC1")
OC1= ROCshort <= 0.0 and RSI <= 40.00 and RSI >= 25.00 and kshort <= 20.00 and dshort <= 20.00 and histdef<0.0 and MACDdef<0.0 and signaldef<0.0 and chandeMOshort<0.0 and VIP14<VIM14 and VIM14<VIM14[1]
plotshape(longcasesplot ? (STcasesplot ? (aOC1p ? OC1 : na) : na) : na, color=#FF00FF, text='OC1')

//*************Carry Over 2 - OC2 (Previously Buy 10): Less Frequent OC1; to be used as support for each other*************//
//**********************************//
// ROCshort(9, BW1)
// RSI(14)
// StochRSI(3, 3, 14, 14)
// ChandeMOshort(9, BW1)
// MACDdef(12, 26, 9)
// VI(14)
// Bollinger Bands(20, 2.5)
// TEMA(9)
//**********************************//
if (ROCshort<0.0 and RSI <= 35.00 and (kshort <= 10.00 or dshort <= 10.00) and histdef<0.0 and MACDdef<0.0 and signaldef<0.0 and chandeMOshort < 0.0 and chandeMOshort[1]<chandeMOshort and LSTEMAdiff[1]>LSTEMAdiff and VIP14 < VIM14  and percentGapBB > 5.50)
    strategy.entry("OC2", longcases ? (STcases ? (aOC2 ? strategy.long : na) : na) : na, stop=lowerbb,comment="OC2")
else
    strategy.cancel(id="OC2")
OC2 = ROCshort<0.0 and RSI <= 35.00 and (kshort <= 10.00 or dshort <= 10.00) and histdef<0.0 and MACDdef<0.0 and signaldef<0.0 and chandeMOshort < 0.0 and chandeMOshort[1]<chandeMOshort and LSTEMAdiff[1]>LSTEMAdiff and VIP14 < VIM14  and percentGapBB > 5.50
plotshape(longcasesplot ? (STcasesplot ? (aOC2p ? OC2 : na) : na) : na, color=#FF00FF, text='OC2')

//*******************************************************************************************************************//
//*******************************************************************************************************************//
//*******************************************************************************************************************//

/////////////////////////CLOSE BUY CASES////////////////////////////////

strategy.close("OC1", when = (kshort>75 or dshort>75))
strategy.close("OC2", when = (kshort>75 or dshort>75))


//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////*************************SHORT TRENDS*************************//////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////TEMPLATE/////////////////////////////////

//# - Short Trend Buy #: 
//if ()
//    strategy.entry("STB#", strategy.long, stop=lowerbb,comment="STB#")
//else
//    strategy.cancel(id="STB#")
//STB# = 
//plotshape(STB#, color=green, text='STB#') 


///////////////////////////////BUY CASES////////////////////////////////

//*************1 - Short Trend Buy 1: Chaikin Oscillator Reversal with TRIX5 Support*************//
//-----Completed; refer to Algorithm Development excel sheet, tab Case Documentation for further details-----//
//**********************************//
// Chaikin Oscillator(5, 10, BW1)
// TRIX(5)
//**********************************//
if ((slopechOscshort2>0.0 and slopechOscshort2[1]<0.0 and TRIXshortslope > 0.0 and TRIXshort < 0.0) or (slopechOscshort2>0.0 and TRIXshortslope > 0.0 and TRIXshortslope[1] < 0.0 and TRIXshort < 0.0))
    strategy.entry("STB1", longcases ? (STcases ? (aST1 ? strategy.long : na) : na) : na, stop=lowerbb,comment="STB1")
else
    strategy.cancel(id="STB1")
STB1 = ((slopechOscshort2>0.0 and slopechOscshort2[1]<0.0 and TRIXshortslope > 0.0 and TRIXshort < 0.0) or (slopechOscshort2>0.0 and TRIXshortslope > 0.0 and TRIXshortslope[1] < 0.0 and TRIXshort < 0.0))
plotshape(longcasesplot ? (STcasesplot ? (aST1p ? STB1 : na) : na) : na, location.belowbar, color=green, text='STB1')


//*************2 - Short Trend Buy 2: MACD Reversal with ROC/CMO Support*************//
//-----Completed; refer to Algorithm Development excel sheet, tab Case Documentation for further details-----//
//**********************************//
// ROC(9, BW1)
// ChandeMO(9, BW1)
// MACD(12, 26, 9)
//**********************************//
if ((butROCshort[1]<0.0 or butCMOshort[1]<0.0) and ((slopeROCshort2>0.0 and slopeROCshort2[1]<0.0) or (slopeCMOshort2>0.0 and slopeCMOshort2[1]<0.0)) and MACDdef < signaldef and BWpercentGapMACDdef[1]>BWpercentGapMACDdef)
    strategy.entry("STB2", longcases ? (STcases ? (aST2 ? strategy.long : na) : na) : na, stop=lowerbb,comment="STB2")
else
    strategy.cancel(id="STB2")
STB2 = ((butROCshort[1]<0.0 or butCMOshort[1]<0.0) and ((slopeROCshort2>0.0 and slopeROCshort2[1]<0.0) or (slopeCMOshort2>0.0 and slopeCMOshort2[1]<0.0)) and MACDdef < signaldef and BWpercentGapMACDdef[1]>BWpercentGapMACDdef)
plotshape(longcasesplot ? (STcasesplot ? (aST2p ? STB2 : na) : na) : na, color=green, text='STB2') 


/////////////////////////CLOSE BUY CASES////////////////////////////////

//**********************************STB1***********************************//
if (TRIXshortslope > 0.0 and TRIX10slope < 0.0)
    strategy.close("STB1", when = (TRIXshortslope < 0.0))
else 
    if (TRIXshortslope > 0.0 and TRIX10slope > 0.0)
        strategy.close("STB1", when = (TRIX10slope<0.0))
    else 
        strategy.close("STB1", when = (TRIXshortslope<0.0))
        
//**********************************STB2***********************************//
strategy.close("STB2", when = (kshort>90 or (slopeRSIpt < 0.0 and kshort > 75.0)))

//**********************************STB3***********************************//
//strategy.close("STB3", when = ())


//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////*************************MEDIUM TRENDS*************************//////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////TEMPLATE/////////////////////////////////

//# - Medium Trend Buy #: 
//if ()
//    strategy.entry("MTB#", strategy.long, stop=lowerbb,comment="MTB#")
//else
//    strategy.cancel(id="MTB#")
//MTB# = 
//plotshape(MTB#, color=green, text='MTB#') 


///////////////////////////////BUY CASES////////////////////////////////

//*************3 - Medium Trend Buy 3: Vortex Indicator Oscillations on Uptrends*************//
//-----Completed; refer to Algorithm Development excel sheet, tab Case Documentation for further details-----//
//**********************************//
// VI(20, BW10)
//**********************************//
if (VIP20<VIM20 and slopeVIM202[1]>0.0 and slopeVIP202>0.0) //and BWpercentGapVI20 > ##
    strategy.entry("MTB3", longcases ? (MTcases ? (aMT3 ? strategy.long : na) : na) : na, stop=lowerbb,comment="MTB3")
else
    if (VIP20<VIM20 and slopeVIM202[2]>0.0 and slopeVIP202>0.0)
        strategy.entry("MTB3", longcases ? (MTcases ? (aMT3 ? strategy.long : na) : na) : na, stop=lowerbb,comment="MTB3")
    else
        strategy.cancel(id="MTB3")
MTB3 = (VIP20<VIM20 and (slopeVIM202[1]>0.0 or slopeVIM202[2]>0.0) and slopeVIP202>0.0)// and BWpercentGapVI20 > 5.0)
plotshape(longcasesplot ? (MTcasesplot ? (aMT3p ? MTB3 : na) : na) : na, color=red, text='MTB3')


//*************4 - Medium Trend Buy 4: MACD Crossover*************//
//-----Completed; refer to Algorithm Development excel sheet, tab Case Documentation for further development-----//
//**********************************//
// MACD Long - (50, 100, 20)
// Choppiness - (50, BW20)
// BW MACD Long - BW40
//**********************************//
if (MACDlong < 0.0 and MACDlong[1]<signallong[1] and MACDlong>signallong and butChoppiness50<53.0 and TRIX40slope>0.0)// and butChoppiness50<50.0)
    strategy.entry("MTB4", longcases ? (MTcases ? (aMT4 ? strategy.long : na) : na) : na, stop=lowerbb,comment="MTB4")
else
    strategy.cancel(id="MTB4")
MTB4 = MACDlong < 0.0 and MACDlong[1]<signallong[1] and MACDlong>signallong and butChoppiness50<50.0 and TRIX40slope>0.0
plotshape(longcasesplot ? (MTcasesplot ? (aMT4p ? MTB4 : na) : na) : na, color=blue, text='MTB4')


//////////IDEAS//////////
// //5 - Medium Trend Buy 5: ADX & DI
// if (ADXslopelongpt > 0.0 and slopeDIPlong2 > 0.0)
//     strategy.entry("MTB4", strategy.long, stop=lowerbb,comment="MTB5")
// else
//     strategy.cancel(id="MTB4")
// MTB5 = ADXslopelongpt > 0.0 and slopeDIPlong2 > 0.0
// plotshape(MTB5, color=red, text='MTB5')


/////////////////////////CLOSE BUY CASES////////////////////////////////

strategy.close("MTB3", when = (butVIP20>butVIM20 and slopeVIP202 < 0.0))
strategy.close("MTB4", when = (slopechOsc2040202[1]>0.0 and slopechOsc2040202<0.0 and chOsc204020>0.0))
//strategy.close("MTB5", when = (slopeDIPlong2<0.0))

//OLD//
//strategy.close("MTB4", when = (signallong >0.0 and signallong[1] < MACDlong [1] and signallong > MACDlong))


//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////*************************LONG TRENDS*************************///////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////TEMPLATE/////////////////////////////////

//# - Long Trend Buy #: 
//if ()
//    strategy.entry("LTB#", strategy.long, stop=lowerbb,comment="LTB#")
//else
//    strategy.cancel(id="LTB#")
//LTB# = 
//plotshape(LTB1, color=green, text='LTB#') 


///////////////////////////////BUY CASES////////////////////////////////

//*************1 - Long Trend Buy 1: Coppock Curve Bottom*************//
//**********************************//
// Coppock Curve - (200, 200, 100)
// KEEP eye on Choppiness(200, BW100) - upward slope means no solid trend
//**********************************//
//-----Completed; refer to Algorithm Development excel sheet, tab Case Documentation for further development-----//
if (curvelongslope2pt>0.0 and curvelongslope2pt[2]<0.0 and curvelong < 0.0)
    strategy.entry("LTB1", longcases ? (LTcases ? (aLT1 ? strategy.long : na) : na) : na, stop=lowerbb,comment="LTB1")
else
    strategy.cancel(id="LTB1")
LTB1 = curvelongslope2pt>0.0 and curvelongslope2pt[1]<0.0 and curvelong < 0.0
plotshape(longcasesplot ? (MTcasesplot ? (aLT1p ? LTB1 : na) : na) : na , color=blue, text='LTB1')


/////////IDEAS//////////

//3 - Long Trend Buy 1: ROC Reversal
//ROC Reversal with low ROC
//ROC Slope
//BW VI and DI Percent Gap
//DIP. DIM, VIP, VIM comparisons

//4
//ROC Reversal where DIP > DIM
//BW VI and DI Percent Gap
//DIP. DIM, VIP, VIM comparisons

//5 - Long Trend Buy 1: ADX Led LT Buy
//ADX slope reversal
//DI percent gap decrease
//DIP > DIM 
//CC bottom out curve barssince
//TRIX barssince cross over baseline

//6 TRIX100 slope pos and negtaive start with CC curve sell (50, 50, 20)


/////////////////////////CLOSE BUY CASES////////////////////////////////

strategy.close("LTB1", when = (curvelongslope2pt < 0.0 and curvelongslope2pt[1] > 0.0))


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////********************************SHORTING CASES********************************////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////BUY SHORTING CASES///////////////////////////////

//if (RSI>=70 and (k >= 80.0 or d>=80.0))
//    strategy.entry("Sell", strategy.short, stop=upperbb,comment="Sell")
//else
//    strategy.cancel(id="Sell")


//2 - Medium Trend Buy 2 works better as a Shorting Case?
if (butDIPmed[1]<butDIMmed[1] and butDIPmed>butDIMmed and slopeADXmed2>0.0 and butROCmed < 0.0)
    strategy.entry("SC1", shortcases ? (aSC1 ? strategy.short : na) : na, stop=lowerbb,comment="SC1")
else
    strategy.cancel(id="SC1")
SC1 = butDIPmed[1]<butDIMmed[1] and butDIPmed>butDIMmed and slopeADXmed2>0.0 and butROCmed < 0.0
plotshape(shortcasesplot ? (aSC1 ? SC1 : na) : na, color=red, text='SC1')



//*************2 - Shorting Short Trend Case 1: AO Crossover*************//
//**********************************//
// AO(34, 7)
// StochRSI(3,3,14,14)
// ROC(9)
// CMO(9)
//**********************************//
//Shorting Case 2 - AO Crossover Margin
if ((AOshortper>-0.80 and AOshortper<0.80) and AOshort[1]<AOshort and kshort>80.0 and dshort>80.0 and ROCshort>0.0 and chandeMOshort>0.0)
    strategy.entry("SC2", shortcases ? (aSC2 ? strategy.short : na) : na, stop=lowerbb,comment="SC2")
else
    strategy.cancel(id="SC2")
SC2 = AOshortper>-0.80 and AOshortper<0.80 and AOshort[1]<AOshort and kshort>80.0 and dshort>80.0 and ROCshort>0.0 and chandeMOshort>0.0
plotshape(shortcasesplot ? (aSC2 ? SC2 : na) : na, color=#cfb53b, text='SC2')
//#cfb53b



//*************3 - Shorting Short Trend Case 2: AO Peak Reversal*************//
//**********************************//
// AO(34, 7)
// StochRSI(3,3,14,14)
// ROC(9)
// CMO(9)
//**********************************//
if (AOshortper>2.0 and AOshort[1]>AOshort and (kshort>80.0 or dshort>80.0) and ROCshort>0.0 and chandeMOshort>0.0)
    strategy.entry("SC3", shortcases ? (aSC3 ? strategy.short : na) : na, stop=lowerbb,comment="SC3")
else
    strategy.cancel(id="SC3")
SC3 = AOshortper>2.0 and AOshort[1]>AOshort and (kshort>80.0 or dshort>80.0) and ROCshort>0.0 and chandeMOshort>0.0
plotshape(shortcasesplot ? (aSC3 ? SC3 : na) : na, color=#ff8c00, text='SC3')


/////////////////////CLOSE SHORTING CASES///////////////////////////////
strategy.close("SC1", when = (kshort<=20 or dshort<=20))
strategy.close("SC2", when = (kshort<=13 or dshort<=13))
strategy.close("SC3", when = (kshort<=13 or dshort<=13))
```

> Detail

https://www.fmz.com/strategy/427575

> Last Modified

2023-09-22 12:21:43
