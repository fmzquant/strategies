
> Name

移动平均线趋势跟踪策略Trend-Following-SMA-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/167d1201c180c7ca06e.png)
[trans]

## 概述

移动平均线趋势跟踪策略利用简单移动平均线和快速移动平均线的组合来判断市场趋势方向,进而产生交易信号。当价格上穿简单移动平均线和快速移动平均线时做多,当价格下穿简单移动平均线和快速移动平均线时做空。该策略 dynamically无回溯优化和实时交易信号,可以捕捉趋势的变化。

## 策略原理

该策略使用sma函数计算长度为50周期的简单移动平均线sma,以及计算快速移动平均线fsma。fsma的计算是在sma的基础上加上price的n周期标准差的6倍。 

策略使用两个boolean变量long和short来记录做多和做空状态。当价格上穿sma和fsma时,long置为1,做多;当价格下穿时,long置为-1,平仓。short变量也使用类似逻辑处理做空状态。

策略使用trend变量来记录趋势判断。当价格高于fsma和sma时,trend为1,表示上涨趋势;当价格低于fsma和sma时,trend为-1,表示下跌趋势。

根据trend的实时判断,产生long和short的交易信号。当trend从下降转为上涨时,如果价格高于fsma,则做多;当trend从上涨转为下降时,如果价格低于sma,则做空。

该策略综合考虑了趋势判断和突破交易的方法,可以有效捕捉趋势转变带来的交易机会。

## 策略优势

1. 使用double confirmation模型,同时检测两个移动平均线,可以有效过滤假突破。

2. 结合趋势判断和突破交易,可以在趋势转变点捕捉机会。

3. 无回溯测试和优化,所有交易信号实时产生,无曲线拟合。

4. 策略逻辑简单清晰,容易理解和修改。

5. 可视化配置参数,长度周期、倍数等都可以根据市场调整。


## 策略风险

1. 双均线策略容易产生频繁交易和反转损失。

2. 移动平均线本身滞后性affect可能错过趋势转变。

3. 缺乏止损机制,无法控制单笔损失。

4. 参数不恰当可能导致过于频繁或过于滞后的交易。

5. 针对风险1和2,可以适当延长均线周期,并添加回撤止损。

6. 针对风险3,可以设置百分比止损或挂单止损。

7. 针对风险4,应该针对不同市场调整参数,避免单一固定参数。


## 策略优化方向 

1. 增加趋势过滤条件,采用MACD,DMI等指标确认趋势。

2. 利用KD,RSI等指标结合超买超卖情况进行入场。

3. 增加整体止损机制,如跟踪止损,百分比止损等。

4. 增加立场管理模块,如动态调整仓位大小。

5. 优化参数设置,使其更有效适应不同行情周期。

6. 增加机器学习模块,利用AI技术自动优化参数。

7. 构建复合策略,利用其他指标进行防假突破。

8. 利用深度学习技术识别更复杂的趋势模式。

## 总结

移动平均线趋势跟踪策略整体来说是一个较为简单的趋势跟踪策略。它利用快慢均线的组合辅助判断趋势方向,在趋势转变点进行趋势换手,可以有效捕捉价格趋势的转换。但该策略也存在一些问题,如频繁交易,滞后等风险。未来的优化方向包括增加趋势过滤,止损模块,动态调整参数等。整体来说,该策略作为趋势跟踪入门策略还是较为适用的,但真实应用中需要对其进行针对应用市场的优化调整,才能真正发挥效果。

||


## Overview

The Trend Following SMA strategy uses a combination of simple moving average (SMA) and fast SMA to determine market trend direction and generate trading signals. It goes long when price crosses above SMA and FSMA and exits long when price crosses below. It goes short when price crosses below SMA and FSMA and exits short when price crosses above. The strategy provides dynamic no-curve-fitting trading signals to capture trend changes.

## Strategy Logic

The strategy uses sma function to calculate 50-period SMA and fast SMA fsma. fsma is calculated based on SMA plus 6 times standard deviation of price over n periods.

Two boolean variables long and short are used to record long and short positions. long is set to 1 when price crosses above sma and fsma for long entry, and -1 when price crosses below for exit. short follows the similar logic for short position.

The trend variable is used for trend determination. It is set to 1 when price is above fsma and sma for uptrend, and -1 when price is below fsma and sma for downtrend.

Trading signals of long and short are generated based on realtime trend direction. When trend changes from down to up, if price is above fsma, go long. When trend changes from up to down, if price is below sma, go short.

The strategy combines both trend following and breakout methods to capture opportunities when trend changes.

## Advantages

1. Using double confirmation of two MAs filters fake breakouts. 

2. Combining trend following and breakout catches turning points.

3. No curve fitting or optimization for dynamic trading signals. 

4. Simple and clear logic, easy to understand and modify.

5. Customizable parameters for length, multiplier for different markets.

## Risks

1. Double MA crosses may cause excessive whipsaw trades and reversals.

2. MA lag may miss early trend reversal. 

3. No stop loss mechanism to control single trade loss.

4. Improper parameter tuning leads to overtrading or lagging.

5. For Risk 1 and 2, lengthen MA periods, add drawdown stop loss.

6. For Risk 3, add percentage or order stop loss.  

7. For Risk 4, adjust parameters dynamically for different markets.

## Enhancement

1. Add trend filter using MACD, DMI to confirm trend.

2. Use KD, RSI to trade mean-reversion overbought/oversold.

3. Add overall stop loss such as trailing stop, percentage stop.

4. Add position sizing module for dynamic adjustment.

5. Optimize parameters to adapt across timeframes.

6. Introduce machine learning for auto parameter tuning.

7. Build composite strategy with additional filters. 

8. Utilize deep learning to detect complex trend patterns.

## Conclusion

The SMA trend following strategy is a simple trend trading system. It uses fast and slow MAs to assist trend direction and capture trend reversal. However, risks like whipsaw and lag exist. Future enhancements include adding filters, stops, dynamic parameters etc. Overall it serves as a good starter trend following strategy, but optimizations are needed for real-world applications to maximize its performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|6|Mult|
|v_input_4|true|Use barcolor?|
|v_input_5|false|Show plots?|
|v_input_6|false|Use triangles?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-26 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("SMA STRATEGY", shorttitle="SMA TREND", overlay=true, calc_on_order_fills=true)
length = input(title="Length", type=input.integer, defval=50)
src_=input(close, title="Source", type=input.source)
mult=input(6.0, title="Mult")
barc=input(true, title="Use barcolor?")
plots=input(false, title="Show plots?")
tri=input(false, title="Use triangles?")


r(src, n)=>
    s = 0.0
    for i = 0 to n-1
        s := s + ((n-(i*2+1))/2)*src[i]
    x=s/(n*(n+1))
    x

l=sma(low, length)
h=sma(high, length)
lr= l+mult*r(low, length)
hr= h+mult*r(high, length)

trend=0
trend:=src_ > lr and src_ > hr ? 1 : src_ < lr and src_ < hr ? -1 : trend[1]

strategy.close("Long", when=trend==-1)
strategy.close("Short", when=trend==1)
strategy.entry("Long", strategy.long, when=trend==1 and src_>h)
strategy.entry("Short", strategy.short, when=trend==-1 and src_<l)

long=0
short=0
long:= trend==1 and src_>h ? 1 : trend==-1 ? -1 : long[1]
short:= trend==-1 and src_<l ? 1 : trend==1 ? -1 : short[1]

barcolor(barc? (long>0? color.green : short>0? color.red : trend>0? color.orange: trend<0 ? color.white : color.blue) : na)
plotshape(tri? close : na, style= shape.diamond, color= long>0? color.green : short>0? color.red : trend>0? color.orange: trend<0 ? color.white : color.blue, location=location.top)

//shortenter=
a1=plot(plots? l : na, color=color.blue, linewidth=1)
//longenter=
a2=plot(plots? h : na, color=color.blue, linewidth=1)
fill(a1, a2, color=color.blue)
//stopshort=
b1=plot(plots? hr : na, color=color.navy, linewidth=1)
//stoplong=
b2=plot(plots? lr : na, color=color.navy, linewidth=1)
fill(b1, b2, color=color.navy)
```

> Detail

https://www.fmz.com/strategy/430895

> Last Modified

2023-11-02 16:58:23
