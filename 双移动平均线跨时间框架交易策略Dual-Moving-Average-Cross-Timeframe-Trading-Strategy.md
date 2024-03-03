
> Name

双移动平均线跨时间框架交易策略Dual-Moving-Average-Cross-Timeframe-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/570a16ae6a3da1e925.png)
[trans]
### 概述
本策略通过计算两个不同类型的移动平均线,在两个不同的时间框架上生成买入和卖出信号。这是一个非常好的沙盒策略,可以用来实验不同类型的移动平均线以及不同的时间框架组合。

### 策略原理
本策略使用两个移动平均线,一个快速移动平均线和一个慢速移动平均线。快速移动平均线时间框架要大于或等于图表的时间框架。当快速移动平均线向上突破慢速移动平均线时,产生买入信号;当快速移动平均线向下突破慢速移动平均线时,产生卖出信号。

用户可以选择多种不同类型的移动平均线,如SMA、EMA、KAMA等,时间框架可以是不同的,这样就可以通过组合实验,找出最佳的参数。

### 优势分析
该策略最大的优势在于可以非常方便地调整参数实验不同的组合,寻找最佳参数设置。

用户可以自由选择两种移动平均线的类型、时间长度、时间框架,系统会实时计算并显示结果。这比测试一个个参数的组合策略要容易很多。

并且策略内置了止损止盈功能,可以降低风险,提高盈利概率。

### 风险分析
该策略最大的风险在于参数设置不当可能导致交易信号过于频繁,从而增加交易成本和滑点的损失。

另外,双移动平均线本身就容易产生假信号,如果参数选得不当,买卖信号可能不可靠。

这些风险可以通过优化参数、组合其他指标来减轻。

### 优化方向
可以考虑在双移动平均线基础上加入其他指标组合,进行过滤,例如RSI指标来确认买入卖出信号,从而减少假信号。

另外可以尝试将移动平均线的参数训练优化,找到最佳参数组合。也可以考虑使用机器学习的方法来动态优化参数。

### 总结
本策略是一个非常好的双移动平均线实验沙盒。它的优势在于可以快速迭代不同的参数组合,以找到最佳交易策略。当然也存在一些参数设置不当的风险,这需要通过加入其他指标组合进行过滤来降低风险。如果继续对该策略进行优化,很可能可以获得更好的交易效果。

||

### Overview
This strategy generates buy and sell signals by calculating two different types of moving averages across two different timeframes. It is a very good sandbox strategy to experiment with different moving averages and timeframe combinations.

### Strategy Logic  
This strategy uses two moving averages, a fast moving average and a slow moving average. The timeframe of the fast moving average should be greater than or equal to the chart timeframe. When the fast moving average crosses above the slow moving average, a buy signal is generated. When the fast moving average crosses below the slow moving average, a sell signal is generated.

Users can choose from various types of moving averages like SMA, EMA, KAMA etc, and the timeframes can be different. This allows experimenting with different combinations to find the optimal parameters.

### Advantage Analysis
The biggest advantage of this strategy is that it allows easy adjustment of parameters to experiment with different combinations to find the best parameter settings.

Users can freely choose the type, length, timeframe of the two moving averages. The system calculates and displays results in real time. This is much easier than testing strategies with different parameter combinations.

Also, the built-in stop loss/take profit functionality helps to reduce risk and increase profitability.

### Risk Analysis 
The biggest risk of this strategy is that improper parameter settings may result in too frequent trading signals, thus increasing trading costs and slippage losses.

Also, dual moving averages themselves tend to give false signals. If parameters are not chosen correctly, buy/sell signals may not be reliable.

These risks can be reduced by optimizing parameters and combining with other indicators.

### Optimization Directions
Consider adding other indicators like RSI to filter buy/sell signals on top of the dual moving averages. This can help reduce false signals.

Parameters of moving averages can also be optimized via training to find the best combinations. Machine learning methods may also be used to dynamically optimize the parameters.

### Conclusion  
This is an excellent sandbox for experimenting with dual moving averages. Its biggest advantage is fast iteration of different parameter combinations to find the best trading strategy. Of course there are also risks of improper parameter settings, which can be reduced by adding filtering indicators. Further optimizations of this strategy can potentially lead to even better trading performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|What trades should be taken:: LONG|SHORT|BOTH|NONE|
|v_input_2|true|---------------- Fast Moving Average (BLUE)----------------|
|v_input_3|0|First Slow moving average: EMA|SMA|WMA|HMA|JMA|KAMA|TMA|VAMA|SMMA|DEMA|VMA|WWMA|EMA_NO_LAG|TSF|ALMA|
|v_input_4||First Time Frame|
|v_input_5|6|First MA Length|
|v_input_6|true|---------------- Slow Moving Average (YELLOW)----------------|
|v_input_7|0|Second Fast moving average: JMA|EMA|WMA|HMA|SMA|KAMA|TMA|VAMA|SMMA|DEMA|VMA|WWMA|EMA_NO_LAG|TSF|ALMA|
|v_input_8||Second time frame|
|v_input_9|14|Second MA length|
|v_input_10|true|---------------- Other Settings ----------------|
|v_input_11|2|Line Width|
|v_input_12|50|Color Transparency|
|v_input_13|blue|color_fast|
|v_input_14|yellow|color_slow|
|v_input_15|true|Fill Color|
|v_input_16|true|---------------- Indicators Settings ----------------|
|v_input_17|0.85|Alma Offset (only for ALMA)|
|v_input_18|12|Volatility lookback (only for VAMA)|
|v_input_19|1.25|KAMA's alpha (only for KAMA)|
|v_input_20|false|----- Add Stop Loss / Take profit -----|
|v_input_21|2.5|Stop Loss %|
|v_input_22|5|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-28 00:00:00
end: 2024-02-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License https://creativecommons.org/licenses/by-sa/4.0/
// © dman103
// A moving averages SandBox strategy where you can experiment using two different moving averages (like KAMA, ALMA, HMA, JMA, VAMA and more) on different time frames to generate BUY and SELL signals, when they cross.
// Great sandbox for experimenting with different moving averages and different time frames.
//
// == How to use ==
// We select two types of moving averages on two different time frames:
//
// First is the FAST moving average that should be at the same time frame or higher.
// Second is the SLOW moving average that should be on the same time frame or higher.
// When FAST moving average cross over the SLOW moving average we have a BUY signal (for LONG)
// When FAST moving average cross under the SLOW moving average we have a SELL signal (for SHORT)


// WARNING: Using a lower time frame than your chart time frame will result in unrealistic results in your backtesting and bar replay.
// == NOTES ==
// You can select BOTH, LONG, SHORT or NONE in the strategy settings.
// You can also enable Stop Loss and Take Profit.
// More sandboxes to come, Follow to get notified.
// Can also act as indicator by settings 'What trades should be taken' to 'NONE'

//@version=4
strategy("Multi MA MTF SandBox Strategy","Multi MA SandBox",overlay=true)
tradeType = input("LONG", title="What trades should be taken:", options=["LONG", "SHORT", "BOTH", "NONE"])
fast_title = input(true,     title='---------------- Fast Moving Average (BLUE)----------------', type=input.bool)
ma_select1 = input(title="First Slow moving average", defval="EMA", options=["SMA", "EMA", "WMA", "HMA", "JMA", "KAMA", "TMA", "VAMA", "SMMA", "DEMA" , "VMA", "WWMA", "EMA_NO_LAG", "TSF","ALMA"])
resma_fast = input(title="First Time Frame", type=input.resolution, defval="")
lenma_fast = input(title="First MA Length", type=input.integer, defval=6)
slow_title = input(true,     title='---------------- Slow Moving Average (YELLOW)----------------', type=input.bool)
ma_select2 = input(title="Second Fast moving average", defval="JMA", options=["SMA", "EMA", "WMA", "HMA", "JMA", "KAMA", "TMA", "VAMA", "SMMA", "DEMA" , "VMA", "WWMA", "EMA_NO_LAG", "TSF","ALMA"])
resma_slow = input(title="Second time frame", type=input.resolution, defval="")
lenma_slow = input(title="Second MA length", type=input.integer, defval=14)

settings = input(true,     title='---------------- Other Settings ----------------', type=input.bool)
lineWidth = input(2,title="Line Width")
colorTransparency=input(50,title="Color Transparency",step=10,minval=0,maxval=100)
color_fast=input(color.blue,type=input.color)
color_slow=input(color.yellow,type=input.color)
fillColor = input(title="Fill Color", type=input.bool, defval=true)
IndicatorSettings = input(true,     title='---------------- Indicators Settings ----------------', type=input.bool)
offset=input(title="Alma Offset (only for ALMA)",defval=0.85, step=0.05)
volatility_lookback =input(title="Volatility lookback (only for VAMA)",defval=12)
i_fastAlpha = input(1.25,"KAMA's alpha (only for KAMA)", minval=1,step=0.25)
fastAlpha = 2.0 / (i_fastAlpha + 1)
slowAlpha = 2.0 / (31)
///////Moving Averages
MA_selector(src, length,ma_select) =>
    ma = 0.0
    if ma_select == "SMA"
        ma := sma(src, length)
        ma

    if ma_select == "EMA"
        ma := ema(src, length)
        ma

    if ma_select == "WMA"
        ma := wma(src, length)
        ma
    if ma_select == "HMA"
        ma := hma(src,length)
        ma
    if ma_select == "JMA"
        beta = 0.45*(length-1)/(0.45*(length-1)+2)
        alpha = beta
        tmp0 = 0.0, tmp1 = 0.0, tmp2 = 0.0, tmp3 = 0.0, tmp4 = 0.0
        tmp0 := (1-alpha)*src + alpha*nz(tmp0[1])
        tmp1 := (src - tmp0[0])*(1-beta) + beta*nz(tmp1[1])
        tmp2 := tmp0[0] + tmp1[0]
        tmp3 := (tmp2[0] - nz(tmp4[1]))*((1-alpha)*(1-alpha)) + (alpha*alpha)*nz(tmp3[1])
        tmp4 := nz(tmp4[1]) + tmp3[0]
        ma := tmp4
        ma
    if ma_select == "KAMA"
        momentum = abs(change(src, length))
        volatility = sum(abs(change(src)), length)
        efficiencyRatio = volatility != 0 ? momentum / volatility : 0
        smoothingConstant = pow((efficiencyRatio * (fastAlpha - slowAlpha)) + slowAlpha, 2)
        var kama = 0.0
        kama := nz(kama[1], src) + smoothingConstant * (src - nz(kama[1], src))
        ma:=kama
        ma
    if ma_select == "TMA"
        ma := sma(sma(src, ceil(length / 2)), floor(length / 2) + 1)
        ma

    if ma_select == "VMA"
        valpha=2/(length+1)
        vud1=src>src[1] ? src-src[1] : 0
        vdd1=src<src[1] ? src[1]-src : 0
        vUD=sum(vud1,9)
        vDD=sum(vdd1,9)
        vCMO=nz((vUD-vDD)/(vUD+vDD))
        VAR=0.0
        VAR:=nz(valpha*abs(vCMO)*src)+(1-valpha*abs(vCMO))*nz(VAR[1])
        ma := VAR
        ma

    if ma_select == "WWMA"
        wwalpha = 1/ length
        WWMA = 0.0
        WWMA := wwalpha*src + (1-wwalpha)*nz(WWMA[1])
        ma := WWMA
        ma

    if ma_select == "EMA_NO_LAG"
        EMA1= ema(src,length)
        EMA2= ema(EMA1,length)
        Difference= EMA1 - EMA2
        ma := EMA1 + Difference
        ma

    if ma_select == "TSF"
        lrc = linreg(src, length, 0)
        lrc1 = linreg(src,length,1)
        lrs = (lrc-lrc1)
        TSF = linreg(src, length, 0)+lrs
        ma := TSF
        ma
        
    if ma_select =="VAMA" // Volatility Adjusted from @fractured
        mid=ema(src,length)
        dev=src-mid
        vol_up=highest(dev,volatility_lookback)
        vol_down=lowest(dev,volatility_lookback)
        ma := mid+avg(vol_up,vol_down)
        ma
    if ma_select == "SMMA"
        smma = float (0.0)
        smaval=sma(src, length)
        smma := na(smma[1]) ? smaval : (smma[1] * (length - 1) + src) / length
        ma := smma
    
    if ma_select == "DEMA"
        e1 = ema(src, length)
        e2 = ema(e1, length)
        ma := 2 * e1 - e2
        ma
    if ma_select == "ALMA"
        ma := alma(src, length,offset, 6)
        ma
    ma

// Calculate EMA
ma_fast = MA_selector(close, lenma_fast,ma_select1)
ma_slow = MA_selector(close, lenma_slow,ma_select2)

maFastStep = security(syminfo.tickerid, resma_fast, ma_fast)
maSlowStep = security(syminfo.tickerid, resma_slow, ma_slow)

ma1_plot=plot(maFastStep, color=color_fast,linewidth=lineWidth,transp=colorTransparency)
ma2_plot=plot(maSlowStep, color=color_slow,linewidth=lineWidth,transp=colorTransparency)
colors=ma_fast>ma_slow ? color.green : color.red
fill(ma1_plot,ma2_plot, color=fillColor? colors: na,transp=colorTransparency+15)

closeStatus = strategy.openprofit > 0 ? "win" : "lose"
////////Long Rules
long = crossover(maFastStep,maSlowStep) and (tradeType == "LONG" or tradeType == "BOTH")
longClose =crossunder(maFastStep,maSlowStep)//and falling(maSlowStep,1) 
///////Short Rules
short =crossunder(maFastStep,maSlowStep) and (tradeType == "SHORT" or tradeType == "BOTH")
shortClose =  crossover(maFastStep,maSlowStep)


longShape= crossover(maFastStep,maSlowStep) and tradeType == "NONE"
shortShape = crossunder(maFastStep,maSlowStep) and tradeType == "NONE"
plotshape(longShape, style=shape.triangleup,location=location.belowbar, color=color.lime,size=size.small)
plotshape(shortShape,style=shape.triangledown,location=location.abovebar, color=color.red,size=size.small)
// === Stop LOSS ===
useStopLoss = input(false, title='----- Add Stop Loss / Take profit -----', type=input.bool)

sl_inp = input(2.5, title='Stop Loss %', type=input.float, step=0.1)/100
tp_inp = input(5, title='Take Profit %', type=input.float, step=0.1)/100
stop_level = strategy.position_avg_price * (1 - sl_inp)
take_level = strategy.position_avg_price * (1 + tp_inp)
stop_level_short = strategy.position_avg_price * (1 + sl_inp)
take_level_short = strategy.position_avg_price * (1 - tp_inp)
if (long)
    strategy.entry("long", strategy.long)
if (short)
    strategy.entry("short", strategy.short)
    
strategy.close ("long", when = longClose, comment=closeStatus) 
strategy.close ("short", when = shortClose, comment=closeStatus) 

if (useStopLoss)
    strategy.exit("Stop Loss/Profit Long","long", stop=stop_level, limit=take_level,comment =closeStatus )
    strategy.exit("Stop Loss/Profit Short","short", stop=stop_level_short, limit=take_level_short, comment = closeStatus)

```

> Detail

https://www.fmz.com/strategy/440980

> Last Modified

2024-02-04 15:03:41
