
> Name

基于TSI和HMACCI指标的双边套利策略Trend-Surfing-Hedging-Strategy-Based-on-TSI-and-HMACCI-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/120bfc6da0109ab1c39.png)
[trans]
## 概述

本策略融合了TSI和改良CCI指标的双边交易信号,采用套利方式频繁开平仓位,目的是追求更稳定的持续盈利。关键逻辑是TSI指标的快慢均线金叉和死叉,结合HMACCI指标的多空信号线判断市场买卖方向。通过限制开仓条件来控制风险,同时设置止损和止盈逻辑。

## 策略原理  

该策略主要基于TSI和HMACCI两个指标的结合。

TSI指标包含一个快速均线和一个慢速均线,用于判断买卖信号。当快线从下向上突破慢线时为买入信号,反之为卖出信号。这样可以较敏感地捕捉市场变化趋势。  

HMACCI指标是在传统CCI指标基础上使用Hull移动平均代替价格本身,能滤波掉部分噪音,判断超买超卖区间。超买超卖区间可以再次确认TSI指标的信号方向。  

策略的关键逻辑是结合这两个指标的判断结果,并设置一定的附加条件来过滤误信号,比如考察前一根K线的收盘价和多个周期前的最高价最低价,控制反转信号质量。

在开仓方面,若条件满足,每次K线收盘时就市价开仓,同时做多做空。这样可以获得更稳定的收益,但需要承担套利的风险。

在止盈止损方面,设置了浮动止损和盈利全部平仓。这可以很好地控制单边交易的风险。

## 策略优势

这是一个比较稳定可靠的高频套利策略。主要优势有:

1. 双重指标组合,可以有效避免误信号
2. 每K线开仓,频繁套利操作,盈亏波动更平稳 
3. 严格的开仓逻辑和止损条件,可以控制风险
4. 结合趋势和反转判断,容错率较高  
5. 无方向偏好,适用于各类市场行情
6. 参数可调整空间大,可以针对不同品种进行优化

## 风险分析  

需要注意的主要风险有:  

1. 高频交易导致的更多手续费损耗  
2. 无法完美避免套利中被套的可能性
3. 参数设置不当可能导致过于激进入场
4. 短期内难以承受单边巨亏的可能性 

可以通过以下方式降低风险:

1. 适当调整开仓频率,降低手续费影响  
2. 优化指标参数,确保信号质量
3. 调高止损幅度,但会承受更多套利损失
4. 测试不同品种参数设置

## 优化方向  

该策略仍有很大优化余地,主要方向是:  

1. 对参数如周期、长度等进行优化和测试
2. 尝试不同的指标组合,如MACD、BOLL等
3. 修改开仓逻辑,设置更严格的过滤条件 
4. 优化止盈止损策略,实现动态和突破性止损
5. 尝试机器学习方法寻找更稳定的参数范围
6. 对交易品种和时间段进行测试
7. 结合趋势判断指标,避免震荡行情过于激进出入场

## 总结  

该策略总体来说是一个稳定、可靠、容错率较高的双边套利策略。它融合了趋势判断和反转指标,通过频繁双边开仓获得稳定收益。同时,策略本身具有较强的可优化空间和潜力,是一种值得深入研究的高频交易思路。

||

## Overview  

This strategy combines the bilateral trading signals of the TSI and improved CCI indicators, and adopts a hedging approach to frequently open and close positions, aiming to pursue more stable continuous profits. The key logic is the golden cross and dead cross of the fast and slow moving averages of the TSI indicator, combined with the buy and sell signals of the HMACCI indicator to determine market direction. Risks are controlled by limiting opening conditions, while stop loss and take profit logics are set.

## Strategy Principle   

The strategy is mainly based on the combination of the TSI and HMACCI indicators.   

The TSI indicator contains a fast moving average and a slow one to determine trading signals. When the fast line breaks through the slow line upwards, it is a buy signal, and vice versa for sell signals. This can capture changes in market trends more sensitively.   

The HMACCI indicator is based on the traditional CCI indicator using Hull Moving Average instead of price itself, which can filter out some noise and judge overbought and oversold zones. The overbought and oversold zones can further confirm the signal direction of the TSI indicator.   

The key logic of the strategy is to combine the judgments of these two indicators and set certain additional conditions to filter out false signals, such as examining the previous bar's closing price and maximum and minimum prices over multiple periods to control the quality of reversal signals.  

For opening positions, if conditions are met, market orders are placed each time the bar closes, going both long and short. This can obtain more stable returns, but undertakes the risks of a hedging strategy.  

For take profit and stop loss, floating stop loss and close all orders when reaching target profit are set. This can effectively control the risks of one-way trades.  

## Advantages of the Strategy  

This is a relatively stable and reliable high frequency hedging strategy. The main advantages are:  

1. Combination of dual indicators can effectively avoid false signals  
2. Frequent hedging operations every bar leads to more stable fluctuations in profit and loss
3. Strict opening logic and stop loss conditions can control risks  
4. Combining trend and reversal judgments leads to higher fault tolerance   
5. No directional bias, suitable for various market conditions  
6. Large adjustable parameter space, can be optimized for different products  

## Risk Analysis   

The main risks to note are:    

1. More fee loss caused by high frequency trading 
2. Impossibility to perfectly avoid being locked in a hedge
3. Overly aggressive entry if parameters not set properly  
4. Difficulty to withstand one-way huge losses in short term  

Risks can be reduced through:  

1. Adjust opening frequency appropriately to lower fee impact  
2. Optimize indicator parameters to ensure signal quality  
3. Increase stop loss amplitude but suffer more hedging losses
4. Test parameters on different products
   
## Optimization Directions  

There is still large room for optimizing this strategy, mainly:
  
1. Optimizing parameters like period, length etc. through testing  
2. Trying different indicator combinations e.g. MACD, BOLL etc. 
3. Modifying opening logic, setting stricter filters   
4. Optimizing take profit and stop loss strategies e.g. dynamic, breakout stops 
5. Using machine learning methods to find more stable parameter ranges
6. Testing on different trading products and timeframes  
7. Combining trend detection to avoid overly aggressive trades in range-bound markets  

## Conclusion   

Overall this strategy is a stable, reliable hedging strategy with high fault tolerance. It combines trend and reversal indicators, obtaining steady returns through frequent dual-directional trading. Also, the strategy itself has strong potential for optimization, and represents a worthwhile high frequency trading idea to research further.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|25|TSI Long Length|
|v_input_2|25|TSI Short Length|
|v_input_3|13|TSI Signal Length|
|v_input_4|33|HMACCI Length|
|v_input_5_open|0|Price Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|50|Line Distance|
|v_input_7|8|Candles Look Back|
|v_input_8|3000|Stop Loss|
|v_input_9|3000|Target Profit Close All|
|v_input_10|true|FromMonth|
|v_input_11|true|FromDay|
|v_input_12|2020|FromYear|
|v_input_13|true|ToMonth|
|v_input_14|true|ToDay|
|v_input_15|9999|ToYear|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the suns bipolarity
//©SeaSide420
//@version=4
strategy(title="TSI HMA CCI", default_qty_type=strategy.cash,default_qty_value=1000,commission_type=strategy.commission.percent,commission_value=0.001)
long = input(title="TSI Long Length", type=input.integer, defval=25)
short = input(title="TSI Short Length", type=input.integer, defval=25)
signal = input(title="TSI Signal Length", type=input.integer, defval=13)
length = input(33, minval=1, title="HMACCI Length")
src = input(open, title="Price Source")
ld = input(50, minval=1, title="Line Distance")
CandlesBack = input(8,minval=1,title="Candles Look Back")
StopLoss= input(3000,minval=1, title="Stop Loss")
TargetProfitAll= input(3000,minval=1, title="Target Profit Close All")
FromMonth=input(defval=1,title="FromMonth",minval=1,maxval=12)
FromDay=input(defval=1,title="FromDay",minval=1,maxval=31)
FromYear=input(defval=2020,title="FromYear",minval=2020)
ToMonth=input(defval=1,title="ToMonth",minval=1,maxval=12)
ToDay=input(defval=1,title="ToDay",minval=1,maxval=31)
ToYear=input(defval=9999,title="ToYear",minval=2017)
start=timestamp(FromYear,FromMonth,FromDay,00,00)
finish=timestamp(ToYear,ToMonth,ToDay,23,59)
window()=>true
ul = (ld)
ll = (ld-ld*2)
ma = hma(src, length)
cci = (src - ma) / (0.015 * dev(src, length))
price = close
double_smooth(src, long, short) =>
	fist_smooth = ema(src, long)
	ema(fist_smooth, short)
pc = change(price)
double_smoothed_pc = double_smooth(pc, long, short)
double_smoothed_abs_pc = double_smooth(abs(pc), long, short)
tsi_value = 100 * (double_smoothed_pc / double_smoothed_abs_pc)*10
tsi_value2=ema(tsi_value/10, signal)*10
cc = color.white
ct = color.new(color.gray, 90)
if cci<ll or cci[1]<ll
    cc:=color.red
if cci>ul or cci[1]>ul
    cc:=color.green
if cci<ul and cci>ll
    cc:=color.new(color.yellow, 90)
ccc = color.white
if cci>ul
    ccc:=color.green
if cci<cci[1] and cci<ul and cci>ll
    ccc:=color.red
if cci<ll
    ccc:=color.red
if cci>cci[1] and cci>ll and cci<ul
    ccc:=color.green
tsiplot= plot(tsi_value, color=color.lime)
tsiplot2=plot(tsi_value2, color=color.red)    
colorchange2 =tsi_value>tsi_value2?color.lime:color.orange
fill(tsiplot, tsiplot2, color=colorchange2, title="TSIBackground", transp=50)
band1 = hline(ul, "Upper Band 1", color=ct, linestyle=hline.style_dashed)
band0 = hline(ll, "Lower Band 1", color=ct, linestyle=hline.style_dashed)
fill(band1, band0, color=cc, title="MidBandBackground", transp=0)
band2 = hline(ul, "Upper Band 2", color=ct, linestyle=hline.style_dashed)
band3 = hline(ll, "Lower Band 2", color=ct, linestyle=hline.style_dashed)
cciplot2 = plot(cci, "CCIvHMA 2", color=color.black, transp=0, linewidth=5)
cciplot = plot(cci, "CCIvHMA", color=ccc, transp=0, linewidth=3)
hline(0, title="Zero")
hline(420, title="420")
hline(-420, title="-420")
fill(cciplot, cciplot2, color=ccc, title="CCIBackground", transp=0)
LongCondition=cci>cci[1] and cci>ll and src>src[CandlesBack] and tsi_value>tsi_value2
ShortCondition=cci<cci[1] and cci<ul and src<src[CandlesBack] and tsi_value<tsi_value2
plotshape(LongCondition, title="BUY", style=shape.circle, location=location.top, color=color.green)
plotshape(ShortCondition, title="SELL", style=shape.circle, location=location.top, color=color.red)
if  strategy.openprofit>TargetProfitAll
    strategy.close_all(when=window(),comment="close all profit target")
if LongCondition and strategy.openprofit>-1
    strategy.order("BUY", strategy.long,when=window())
if ShortCondition and strategy.openprofit>-1
    strategy.order("SELL", strategy.short,when=window())
strategy.exit("SL exit a sell", "SELL", loss = StopLoss,when=window())     
strategy.exit("SL exit a buy", "BUY", loss = StopLoss,when=window()) 
```

> Detail

https://www.fmz.com/strategy/439709

> Last Modified

2024-01-23 11:26:14
