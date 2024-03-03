
> Name

猎户座交易策略Orion-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

猎户座交易策略(Orion Trading Strategy)是一个集成多种技术指标的量化交易策略。该策略旨在提前识别市场的高点和低点,以便交易者及时做出买入和卖出决策。该策略通过独特的预测曲线机制,尝试在价格实际转折前提前发出交易信号。

## 策略原理

该策略的核心是独创的猎户座信号曲线。该曲线综合多个技术指标,包括MACD、WPR、Stoch、RSI等,计算出一个综合信号。然后通过超平滑处理生成最终曲线。

关键是该曲线还配备了一个预测模型,它分析曲线的斜率变化情况,尝试预测1-2根K线之后的潜在转折。当预测曲线与实际曲线发生背离时,即可提前发出交易信号。

此外,策略还使用动量波指标判断更大级别上的趋势方向。当动量波改变方向时,提示可能出现较大级别的转折。

最后,策略在信号产生时,给出相应的买入卖出建议。用户可以自行决定是否按此入场。

## 优势分析

- 多指标综合判断,提高准确率

融合多个指标有助于确认趋势和发现转折点,避免单一指标误判风险。

- 预测模型提前发现反转机会

预测曲线可提前反转实际信号,为交易决策提供先机。

- 动量波判断大趋势方向

结合更高时间框架的动量波指标,可避免逆势操作。

- 可自定义参数,适应不同品种

用户可调整指标参数,适应不同品种的特点。

## 风险分析

- 预测模型可能造成过度交易

预测模型容易发出假信号,如果盲目跟随,可能导致过度交易。

- 多参数组合难以优化

参数数量多,要找到最优组合需要大量数据集和长时间测试。

- 需谨慎评估指标效果

各个指标对信号提升的实际作用需谨慎评估,避免使用冗余指标。

- 需考虑实盘交易成本因素

频繁交易会产生更多成本,这需要考虑在实盘条件下进行回测。

## 优化方向

- 评估预测模型效果,调整参数

评估预测模型准确率,优化调整预测参数以提高准确性。

- 简化模型,减少冗余指标

采用指标效果评估和模型简化方法,减少不必要的复杂度。

- 多市场回测验证稳定性

在更多市场中回测,验证参数优化结果和稳定性。

- 考虑实盘成本进行策略调整

根据回测引入实盘成本因素,调整策略参数以降低交易频率。

## 总结

猎户座策略综合运用多种指标和独特预测曲线,试图提前发现市场转折点。该策略具有一定优势,但可扩展性也存在局限性。需要保持谨慎态度,从交易信号效果和成本效果等方面不断优化调整,力求在交易自动化中获取长期稳定收益。

||

## Overview

The Orion trading strategy integrates multiple technical indicators for quantitative trading. It aims to identify market tops and bottoms early so traders can make timely buy and sell decisions. The strategy uses a unique prediction curve mechanism to try generating trading signals before actual price reversals occur.

## Strategy Logic

The core of the strategy is the proprietary Orion signal curve. This curve synthesizes multiple indicators including MACD, WPR, Stoch, RSI etc to generate a composite signal. It is then processed by supersmoothing to create the final curve. 

Critically, the curve also incorporates a prediction model, which analyzes the slope changes of the curve to try forecasting potential reversals 1-2 bars ahead. When the prediction curve diverges from the actual curve, early trading signals can be generated.

In addition, a momentum wave indicator is used to determine the trend direction on a larger timeframe. When the wave changes direction, it suggests a larger degree reversal may be upcoming.

Finally, the strategy provides buy and sell suggestions when signals are triggered. Traders can decide whether to follow them.

## Advantage Analysis

- Multiple indicators improve accuracy
Combining indicators helps confirm trends and spot reversals, avoiding single indicator pitfalls.

- Prediction model provides early reversal alerts 
The prediction curve may front-run actual signals, granting trading decisions a head start.

- Momentum wave judges overall trend direction
Incorporating higher timeframe momentum wave avoids trading against major trends. 

- Customizable parameters suit different products
Users can tune indicator parameters to suit characteristics of different trading products.

## Risk Analysis

- Prediction model may cause over-trading
The prediction model can generate false signals. Blindly following it may lead to over-trading.

- Difficult optimization with multiple parameters
With numerous parameters, finding the optimum combination requires extensive datasets and prolonged testing.

- Indicator effectiveness needs prudent assessment
The actual incremental benefit of each indicator needs careful evaluation to avoid redundancy.

- Real-world trading costs should be considered
Frequent trading incurs higher costs. Real-world costs need incorporating into backtests.

## Improvement Directions

- Evaluate and adjust prediction model  
Assess prediction accuracy and optimize parameters to improve reliability.

- Simplify model by reducing redundancy
Adopt indicator effectiveness evaluation and model simplification to remove unnecessary complexity.

- Robustness test across markets
Conduct multi-market backtests to verify optimization results and robustness.

- Adjust strategy based on real-world costs
Introduce real-world costs into backtest to adjust strategy parameters for lower trade frequency.

## Summary
The Orion strategy synthesizes multiple indicators and a unique prediction curve to try identifying turns early. It has merits but scalability is also limited. Cautious attitude is needed. Continuous optimizations from aspects like signal efficacy and cost effectiveness are required to achieve steady long-term gains in automated trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_14|0|strategy: dca long|simple|
|v_input_15|10|pyramid orders|
|v_input_16|2|percent exit in profit|
|v_input_17|2|percent drop before each entry|
|v_input_1|true|(?User Agreement ─────────────)I understand that Orion Algo cannot be 100% accurate and overall performance will shift with market conditions. While Orion Algo increases my chances of entering better positions, I must use smart trade management. |
|v_input_2|10|(?Signal ────────────────────)Super Smooth|
|v_input_3|false|Prediction|
|v_input_4|0.45|Bias|
|v_input_5|true|Curve|
|v_input_6|true|(?Momentum Wave ─────────────)Momentum Wave|
|v_input_7|3|momentumWaveLength|
|v_input_8|true|Position Outside|
|v_input_9|true|(?Visuals ───────────────────)Dark Mode|
|v_input_10|0|Mode: Pro|Beginner|
|v_input_11|true|(?Dashboard ─────────────────)Dashboard|
|v_input_12|true|(?Pivots ────────────────────)Signal Pivots|
|v_input_13|false|Prediction Pivots|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-17 00:00:00
end: 2023-09-21 22:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © OrionAlgo
//          () /? | () |\|   /\ |_ (_, ()          //
//@version=4

version = '2.0'

strategy("Orion Algo Strategy v"+version, shorttitle="Orion Algo Strategy v"+version, overlay=false, pyramiding=100)


// Getting inputs --------------------------------------------------------------
userAgreement = input(true, title='I understand that Orion Algo cannot be 100% accurate and overall performance will shift with market conditions. While Orion Algo increases my chances of entering better positions, I must use smart trade management. ', type=input.bool,group='User Agreement ─────────────',
  tooltip='In order to use Orion Algo, you must click the checkbox to acknowledge the user agreement')

src = close
//smoothing inputs -------------------------------------------------------------

//superSmooth = input(true, title='Super Smooth', inline='Super Smooth', group='Smoothing ─────────────────')
superSmooth = true
smoothType = 1
superSmoothStrength = input(10, title='Super Smooth',minval = 3, inline='Super Smooth', group='Signal ────────────────────',
  tooltip='Smooths the signal. Lower values move pivots to the left while increasing noise, higher values move pivots to the right and reduce noise. 8 is a good mix of both') // set to timeframe for decent results?
//trendSmoothing = input(30, title='Trend Smooth',minval = 3, group='Smoothing ─────────────────') // set to timeframe for decent results?
trendSmoothing = 30 // set to timeframe for decent results?

showPrediction = input(false, title='Prediction', group='Signal ────────────────────',inline='prediction')
predictionBias = input(0.45, minval = 0.,maxval=1., step=0.05, title='Bias', group='Signal ────────────────────',inline='prediction')
showPredictionCurve = input(true, title='Curve', group='Signal ────────────────────',inline='prediction', tooltip='Prediction model that attempts to predict short range reversals (0-2 bars). Adjust Bias to change the prediction curve.')

//momentum wave inputs ---------------------------------------------------------
showMomentumWave = input(true, 'Momentum Wave', group='Momentum Wave ─────────────', inline='mom')
momentumWaveLength = input(3, '', group='Momentum Wave ─────────────', inline='mom', tooltip='Secondary signal that shows medium to large movements based on the input variable. The wave will change depending on the current timeframe.')
momentumOutside = input(true, 'Position Outside', group='Momentum Wave ─────────────', inline='mom2', tooltip='Positions the wave outside of the main signal area.')

//visuals input-----------------------------------------------------------------

useDarkMode = input(true, 'Dark Mode', group='Visuals ───────────────────',inline='Colors')

// 0:backgroundlines, 1:signal, 2:bullish, 3:bearish, 4:hiddenbull, 5:hiddenbear, 6:deltav, 7:prediction, 8:predictionbull, 9:predictionbear, 10:dash, 11:mom2

visualMode = input('Pro', 'Mode',options=['Beginner', 'Pro'] ,group='Visuals ───────────────────')

dashOn = input(true, "Dashboard", group='Dashboard ─────────────────', inline='dash', tooltip='A dashboard with some usefual stats')
  
dashColor = color.new(#171a27, 100)

showPivots = input(true, title='Signal Pivots', group='Pivots ────────────────────',inline='pivots')
showPredictionPivots = input(false, title='Prediction Pivots', group='Pivots ────────────────────',inline='pivots')


// Functions -------------------------------------------------------------------

f_secureSecurity(_symbol, _res, _src) => security(_symbol, _res, _src,barmerge.gaps_on, lookahead = barmerge.lookahead_on) 

f_slope(x) =>
    slopePeriod = 1
    (x - x[slopePeriod]) / slopePeriod

f_superSmooth(inputVal,smoothType) =>
    smoothType==1? (hma(inputVal,superSmoothStrength)) :
      smoothType==2? (ema((ema((ema(inputVal,3)),3)),superSmoothStrength)):
      smoothType==3? linreg(inputVal,superSmoothStrength,0) : 
      smoothType==4? (hma(inputVal,superSmoothStrength * momentumWaveLength)) : na

f_bias(bias, min, max) =>
    (bias * (max - min) ) + min

f_resInMinutes() =>
    _resInMinutes = timeframe.multiplier * (
      timeframe.isseconds ? 1. / 60. :
      timeframe.isminutes ? 1.       :
      timeframe.isdaily   ? 1440.    :
      timeframe.isweekly  ? 10080.   :
      timeframe.ismonthly ? 43800.   : na)

f_resFromMinutes(_minutes) =>
    _minutes     <= 0.0167       ? "1S"  :
      _minutes   <= 0.0834       ? "5S"  :
      _minutes   <= 0.2500       ? "15S" :
      _minutes   <= 0.5000       ? "30S" :
      _minutes   <= 1            ? "1":
      _minutes   <= 1440         ? tostring(round(_minutes)) :
      _minutes   <= 43800        ? tostring(round(min(_minutes / 1440, 365))) + "D" :
      tostring(round(min(_minutes / 43800, 12))) + "M"
      
f_output_signal()=>    
    a = ((ema(close, 12) - ema(close, 26)) - ema((ema(close, 12) - ema(close, 26)), 8))/10
    b = wpr(8)
    c = (100 * ( close + 2*stdev( close, 21) - sma( close, 21 ) ) / ( 4 * stdev( close, 21 ) ))
    d = (rsi(close - sma(close, 21)[11],8)*2)-100
    e = (rsi(fixnan(100 * rma(change(high) > change(low) and change(high) > 0 ? change(high) : 0, 1) / rma(tr, 1)) - fixnan(100 * rma(change(low) > change(high) and change(low) > 0 ? change(low) : 0, 1) / rma(tr, 1)),8)*2)-100 //causes slow down
    f = rsi((((close-( (sum(volume, 20) - volume)/sum(volume, 20)) + (volume*close/sum(volume, 20)))/((close+( (sum(volume, 20) - volume)/sum(volume, 20)) + (volume*close/sum(volume, 20)))/2)) * 100),8)-100
    g = (rsi(sma(highest(high,14)-lowest(low,14)==0.0?0.0:(close-lowest(low,14))/highest(high,14)-lowest(low,14)-0.5,max(1,int(2))),8)*2)-100 //causes slow down
    avg(a,b,c,d,e,f,g)*2
 
output_signal = f_output_signal()
output_signal := f_superSmooth(output_signal,1)

// output_signal2 = plot(f_superSmoothSlow(f_output_signal()), color=color.blue, linewidth=2)

//Orion Signal Higher Timeframe / Momentum Wave --------------------------------
f_momentumWave(wavelength,smooth) =>
    currentMinutes = f_resInMinutes()
    m = currentMinutes * wavelength //multiply current resolution by momentumWaveLength to get higher resolution
    momentumWaveRes = f_resFromMinutes(m)
    f_secureSecurity(syminfo.tickerid, momentumWaveRes,f_superSmooth(f_output_signal(),1))



// Plot ------------------------------------------------------------------------
f_color(x) =>
    if userAgreement
        white      = useDarkMode ? #e5e4f4 : #505050ff
        lightgray  = useDarkMode ? #808080 : #909090ff
        gray       = useDarkMode ? #808080 : #505050ff
        //blue       = useDarkMode ? #007EA7 : #007EA7ff
        blue       = useDarkMode ? #2862FFFF : #2862FFFF
        
        // 0:backgroundlines, 1:signal, 2:bullish, 3:bearish, 4:hiddenbull, 5:hiddenbear, 6:deltav, 7:prediction, 8:predictionbull, 9:predictionbear, 10:trendbull, 11:trendbear, 12:dash, 13:mom1, 14:mom2
        x==0? lightgray : x==1? gray : x==2? white : x==3? blue : x==4? white : x==5? blue : x==6? blue : x==7? blue : x==8? white : x==9? blue : x==10? blue : x==11? blue : na

// Lines -----------------------------------------------------------------------

h1 = plot(0, "Mid Band", color=f_color(0),editable=0, transp=80)

// Signal ----------------------------------------------------------------------

orionSignal = plot(output_signal, title="Orion Signal Curve", style=plot.style_line,linewidth=1, transp=0, color= f_color(1), offset=0,editable=0)


// Momentum Wave ---------------------------------------------------------------
momWave = f_momentumWave(momentumWaveLength,1)


p_momWave = plot(showMomentumWave? momentumOutside? (momWave/2) -150 : momWave : na, color=f_color(11), linewidth=showMomentumWave and momentumOutside ? 1 : 2, editable =0, transp=50, style=momentumOutside? plot.style_area : plot.style_line, histbase=-200) //two tone color doesnt want to work with this for some reason.

// Divergence ------------------------------------------------------------------

osc = output_signal

plFound = osc > osc [1] and osc[1] < osc[2]
phFound = osc < osc [1] and osc[1] > osc[2]

// bullish

plot(
     plFound and visualMode=='Pro'?  osc[1] - 10 : na,
     offset=0,
     title="Regular Bullish",
     linewidth=3,
     color=showPivots ? f_color(2) :na,
     transp=0,
     style=plot.style_circles,
     editable=0
     )
plotshape(
     plFound and visualMode=='Beginner'?  osc[1] - 10 : na,
     offset=0,
     title="Regular Bullish",
     size=size.tiny,
     color=showPivots ? f_color(2) :na,
     transp=0,
     style=shape.labelup,
     text = 'Buy',
     textcolor= color.black,
     location=location.absolute,
     editable=0
     )


// bearish
plot(
     phFound and visualMode=='Pro'? osc[1] + 10: na,
     offset=0,
     title="Regular Bearish",
     linewidth=3,
     color=showPivots ? f_color(3):na,
     transp=0,
     style=plot.style_circles,
     editable=0
     )
plotshape(
     phFound and visualMode=='Beginner'? osc[1] + 10: na,
     offset=0,
     title="Regular Bearish",
     size=size.tiny,
     color=showPivots ? f_color(3):na,
     transp=0,
     style=shape.labeldown,
     text = 'Sell',
     textcolor= color.white,
     location=location.absolute,
     editable=0
     )



// Delta v ---------------------------------------------------------------------

slope    = f_slope(output_signal)*1.5

// Prediction from Delta v -----------------------------------------------------
output_prediction = f_bias(predictionBias, slope, output_signal)

prediction_bullish = output_prediction>output_prediction[1] and output_prediction[1]<output_prediction[2] ?true:false
prediction_bearish = output_prediction<output_prediction[1] and output_prediction[1]>output_prediction[2] ?true:false

plot(showPrediction and showPredictionCurve?output_prediction:na,title='Prediction Curve', color=f_color(7), editable=0)
//prediction bull
plot(showPrediction?showPredictionPivots?output_prediction>output_prediction[1] and output_prediction[1]<output_prediction[2]?showPredictionCurve?output_prediction:output_signal:na:na:na,
  title='Prediction Bullish',color=f_color(8), style=plot.style_circles, linewidth=2, editable=0)
//prediction bear
plot(showPrediction?showPredictionPivots?output_prediction<output_prediction[1] and output_prediction[1]>output_prediction[2]?showPredictionCurve?output_prediction:output_signal:na:na:na,
  title='Prediction Bearish', color=f_color(9), style=plot.style_circles, linewidth=2, editable=0)

// User Aggreement -------------------------------------------------------------

plotshape(userAgreement==false?0:na,title='Welcome', text='Welcome to Orion Algo! Please double click me to enable signals',textcolor=color.black,color=color.white,offset=0,size=size.huge,style=shape.labeldown,location=location.absolute, transp=0, show_last=1, editable=0)
plotshape(userAgreement==false?0:na,title='Welcome', text='Welcome to Orion Algo! Please double click me to enable signals',textcolor=color.black,color=color.white,offset=-100,size=size.huge,style=shape.labeldown,location=location.absolute, transp=0, show_last=1, editable=0)

// Alerts ----------------------------------------------------------------------

alertcondition(plFound,title='1. Bullish (Big Dot)', message='Bullish Signal (Big Dot)')
alertcondition(phFound,title='2. Bearish (Big Dot)', message='Bearish Signal (Big Dot)')
alertcondition(prediction_bullish,title='3. Prediction Bullish (Small Dot)', message='Prediction Bullish Signal (Small Dot)')
alertcondition(prediction_bearish,title='4. Prediction Bearish (Small Dot)', message='Prediction Bearish Signal (Small Dot)')





// Strategy --------------------------------------------------------------------
i_strategy = input(defval='dca long', title='strategy', options=['simple','dca long'])
i_pyramid = input(10, 'pyramid orders')

// Simple Strat
if (i_strategy == 'simple')
    longCondition = crossover(output_signal, output_signal[1])
    if (longCondition)
        strategy.entry("My Long Entry Id", strategy.long)
    
    shortCondition = crossunder(output_signal, output_signal[1])
    if (shortCondition)
        strategy.entry("My Short Entry Id", strategy.short)

// DCA Strat
i_percent_exit = input(2.0,'percent exit in profit')/100
i_percent_drop = input(2.0,'percent drop before each entry')/100

var entryPrice = 0.0
var exitPrice = 0.0


var inTrade = false
var tradeCount = 0
var moneyInTrade = 0.0

if(output_signal > output_signal[1] and output_signal[1]<=output_signal[2] and i_strategy=='dca long')
//if (true)    
    if (inTrade==false)
        strategy.entry('Long',long=true)
        entryPrice:=close
        moneyInTrade:=close
        exitPrice:=entryPrice + (entryPrice*(i_percent_exit))
        inTrade:=true
        tradeCount := 1
        
    if (inTrade==true and close <= (entryPrice-(entryPrice*(i_percent_drop) )))
        //calculate DCA //math is incorrect!!!
        if (tradeCount <= i_pyramid)
            tradeCount := tradeCount+1
            entryPrice:=close
            moneyInTrade := moneyInTrade+close
            exitPrice2 = moneyInTrade / tradeCount
            exitPrice := exitPrice2 + (exitPrice2 *(i_percent_exit)) 
           
            strategy.entry('Long',long=true)
            

if(close >= exitPrice and inTrade==true and output_signal <= output_signal[1] and output_signal[1]>=output_signal[2] and i_strategy=='dca long')
    inTrade:=false
   
    strategy.close('Long')
    
    


// Dashboard -------------------------------------------------------------------


//deltav
deltav = slope








```

> Detail

https://www.fmz.com/strategy/427826

> Last Modified

2023-09-25 18:32:52
