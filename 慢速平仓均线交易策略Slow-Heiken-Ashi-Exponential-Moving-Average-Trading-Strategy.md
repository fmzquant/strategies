
> Name

慢速平仓均线交易策略Slow-Heiken-Ashi-Exponential-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12fdeafd528384dc929.png)

[trans]

## 概述

本策略结合使用慢速Heiken Ashi和指数移动平均线来识别趋势,在趋势行情中进行长短双向交易。当价格超过100日EMA时做多,低于100日EMA时做空,并在特定条件下平仓。

## 策略原理

该策略使用以下指标组合:

1. 慢速Heiken Ashi:一种特殊类型的K线图,使用前一根K线的均价来绘制,可以过滤市场噪音,识别趋势。这里通过自适应Kama滤波器实现。

2. 指数移动平均线:对价格进行指数平滑后的均线,这里包含5日到100日多个周期的EMA。

具体交易逻辑是:

1. 当价格上穿100日EMA时,做多;当价格下穿100日EMA时,做空。

2. 平仓条件:当Heiken Ashi的开盘价交叉其收盘价时(潜在反转信号),对应的多头仓位通过反向交叉时平掉,空头仓位同理。

## 优势分析

该策略结合趋势判断和反转信号,可以在趋势行情中捕捉较大幅度的价格波动,同时通过反转信号来避免亏损扩大。

1. 使用EMA判断全局趋势方向,避免被局部震荡误导。

2. Heiken Ashi的交叉信号可以提早检测到反转机会。

3. 自适应Kama滤波器降低假信号概率。

## 风险分析

1. 大幅度突破EMA可能造成损失扩大。可适当缩短持仓周期或者设定止损。

2. 反转信号可能滞后,可考虑降低仓位规模以控制风险。

3. EMA参数设置不当也会影响策略表现,应根据不同品种和市场环境调整。

## 优化方向  

1. 可结合多种指标判断,避免EMA和Heiken Ashi都发出错误信号的概率。比如加上MACD、布林带等。

2. 可以根据市场波动率实时优化EMA参数,在高波动时收紧止损,低波动时放宽滑点。

3. 基于机器学习算法自动优化各参数设置和过滤规则,使策略更稳健。

## 总结

该策略整体来说较为简单实用,同时结合趋势和反转,在参数优化和风险控制到位的情况下,仍有不错的盈利空间。后续可从优化方向入手使策略更适应市场环境的变化。

||

## Overview 

This strategy combines slow Heiken Ashi and exponential moving averages to identify trends and make long/short trades during trending markets. It goes long when price is above 100-day EMA and goes short when price is below 100-day EMA, closing positions on specific reversal signals.  

## Strategy Logic

The strategy employs the following indicators:

1. Slow Heiken Ashi: A special type of candlestick calculated using the previous bar's average price, filtering out market noise and identifying trends. Implemented here using adaptive KAMA filter.

2. Exponential Moving Average: Smoothed price averages with exponential weighting applied. Contains EMAs from 5-day to 100-day periods.  

The specific trading logic is:

1. Go long when price crosses above 100-day EMA, go short when price crosses below 100-day EMA.  

2. Exit positions when Heiken Ashi's open price crosses its close price (potential reversal signal). Long positions are closed on reverse crossovers and short positions likewise.

## Advantage Analysis 

The strategy combines trend-following and reversal signals, capturing large price swings during trending markets while avoiding excessive losses when trends reverse.

1. EMA determines overall market trend direction, preventing distraction from localized fluctuations. 

2. Heiken Ashi crossovers provide early detection of potential reversals.  

3. Adaptive KAMA filter reduces false signals.

## Risk Analysis

1. Sudden, large EMA breaks can lead to amplified losses. Consider tighter holding periods or stop losses.  

2. Reversal signals may lag. Lower position sizes to control risk.

3. Inadequate EMA parameterization negatively impacts performance. Parameters should adapt to different products and market environments. 

## Optimization Directions

1. Incorporate additional indicators like MACD and Bollinger Bands to avoid simultaneous EMA/Heiken Ashi errors.  

2. Dynamically optimize EMA parameters based on market volatility, tightening stops/increasing slippage tolerance accordingly.

3. Utilize machine learning to automatically tune parameters, filter rules and improve robustness.

## Conclusion

The strategy is relatively simple and practical overall, combining both trend and reversal elements. With well-tuned parameters and risk controls, it retains decent profit potential. Further improvements can build on the optimization directions to make the strategy more adaptive.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6|Period|
|v_input_2|0.666|fastend|
|v_input_3|0.0645|slowend|
|v_input_4|true|Exponential MA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-14 00:00:00
end: 2023-12-19 10:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("NoScoobies Slow Heiken Ashi and Exponential Moving average Strategy 2.2", overlay=true)

//SHA
p=input(6,title='Period')
fastend=input(0.666,step=0.001)
slowend=input(0.0645,step=0.0001)
kama(close,amaLength)=>
    diff=abs(close[0]-close[1])
    signal=abs(close-close[amaLength])
    noise=sum(diff, amaLength)
    efratio=noise!=0 ? signal/noise : 1
    smooth=pow(efratio*(fastend-slowend)+slowend,2)
    kama=nz(kama[1], close)+smooth*(close-nz(kama[1], close))
    kama
hakamaper=1
Om=sma(open,p)
Hm=sma(high,p)
Lm=sma(low,p)
Cm=sma(close,p)
vClose=(Om+Hm+Lm+Cm)/4
vOpen= kama(vClose[1],hakamaper)
vHigh= max(Hm,max(vClose, vOpen))
vLow=  min(Lm,min(vClose, vOpen))
asize=vOpen-vClose
size=abs(asize)

//MMAR
exponential = input(true, title="Exponential MA")
src = close
ma05 = exponential ? ema(src, 05) : sma(src, 05)
ma10 = exponential ? ema(src, 10) : sma(src, 10)
ma15 = exponential ? ema(src, 15) : sma(src, 15)
ma20 = exponential ? ema(src, 20) : sma(src, 20)
ma25 = exponential ? ema(src, 25) : sma(src, 25)
ma30 = exponential ? ema(src, 30) : sma(src, 30)
ma35 = exponential ? ema(src, 35) : sma(src, 35)
ma40 = exponential ? ema(src, 40) : sma(src, 40)
ma45 = exponential ? ema(src, 45) : sma(src, 45)
ma50 = exponential ? ema(src, 50) : sma(src, 50)
ma55 = exponential ? ema(src, 55) : sma(src, 55)
ma60 = exponential ? ema(src, 60) : sma(src, 60)
ma65 = exponential ? ema(src, 65) : sma(src, 65)
ma70 = exponential ? ema(src, 70) : sma(src, 70)
ma75 = exponential ? ema(src, 75) : sma(src, 75)
ma80 = exponential ? ema(src, 80) : sma(src, 80)
ma85 = exponential ? ema(src, 85) : sma(src, 85)
ma90 = exponential ? ema(src, 90) : sma(src, 90)
ma95 = exponential ? ema(src, 95) : sma(src, 95)
ma100 = exponential ? ema(src, 100) : sma(src, 100)

longcondition=src>ma100
shortcondition=src<ma100
long=longcondition and size<size[1] and (vOpen<vClose or vOpen>vClose)
short=shortcondition and size<size[1] and (vOpen>vClose or vOpen<vClose)
close_long=longcondition and crossunder(open, vClose)
close_short=shortcondition and crossover(open, vClose)
_close=close_long[2] or close_short[2]

if long
    strategy.entry("LONG", strategy.long)
    strategy.close("LONG", when = _close)
if short
    strategy.entry("SHORT", strategy.short)
    strategy.close("SHORT", when = _close)
    

```

> Detail

https://www.fmz.com/strategy/436228

> Last Modified

2023-12-22 13:18:34
