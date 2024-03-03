
> Name

双均线震荡突破策略Dual-Moving-Average-Oscillation-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7e4da9b90f24915d09.png)
[trans]

## 概述

双均线震荡突破策略通过计算两条不同周期的均线,形成通道,判断价格震荡走势。当价格突破通道时,形成交易信号。该策略同时结合市场主流动向判断,避免错误突破。

## 策略原理

该策略主要通过两条移动均线形成上下通道,通道范围由平均真实波动范围ATR确定。具体来说,策略主要包括以下步骤:

1. 计算两条均线,均线1周期短,均线2周期长。均线1反映当前价格趋势,均线2反映主流价格趋势。

2. 在均线1上下各加一个ATR形成通道,ATR能反映当前市场波动性。

3. 当价格从下向上突破通道时,形成买入信号;当价格从上向下突破通道时,形成卖出信号。

4. 结合主流价格趋势判断,只有当短周期突破的方向与长周期趋势一致时,才产生真正的交易信号。

通过上述步骤,该策略能捕捉价格震荡趋势中的突破点,同时结合主流趋势避免错误信号。

## 优势分析

该策略具有以下优势:

1. 运用双均线形成通道,能反映当前价格震荡范围。

2. ATR参数的引入,使通道范围能实时跟踪市场波动率。

3. 结合主流价格趋势判断,避免在震荡市场中产生错误信号。

4. 策略判断规则清晰简单,容易理解实现,适合用来学习研究。

## 风险分析

该策略也存在以下风险:

1. 在突破失败后容易形成错失良机。可以通过获利后移仓来降低此风险。

2. 主流判断存在时间滞后,无法完全避免错误信号。可以适当调整均线参数来降低。

3. 大幅震荡市场中,止损点容易被突破。可以通过实时调整ATR来应对市场波动。


## 优化方向

该策略可以从以下方面进行优化:

1. 计算均线的参数可进行优化,找到不同品种最优参数组合。

2. ATR参数也可进行优化,使通道更好跟踪当下波动性。

3. 增加附加过滤条件,如量能指标、波动指标等,进一步避免错误信号。

4. 通过机器学习技术自动优化各参数,实现参数的动态调整。

## 总结

双均线震荡突破策略通过双均线通道和主流方向判断,实现了对震荡趋势的捕捉。该策略判断规则简单清晰,容易理解和实现,是理解和学习突破策略的绝佳案例。通过不断优化参数设定和信号过滤,该策略可以进一步增强稳定性和盈利能力。

||  

## Overview

The dual moving average oscillation breakthrough strategy calculates two moving averages of different periods to form a channel and judge the oscillating trend of prices. It generates trading signals when prices break through the channel. This strategy also incorporates mainstream market direction judgment to avoid false breakthroughs.

## Strategy Principle  

The main steps of this strategy are:

1. Calculate two moving averages, one with a shorter period and one with a longer period. The shorter MA reflects current price trend and the longer MA reflects mainstream price trend.

2. Add one ATR above and below the shorter MA to form a channel. ATR reflects current market volatility.  

3. A buy signal is generated when price breaks through the channel upwards. A sell signal is generated when price breaks through the channel downwards.

4. Incorporate mainstream trend judgment. Valid trading signals are only generated when short term breakthrough aligns with mainstream trend direction.

By following these steps, this strategy captures breakthrough points in oscillating trends and avoids false signals by referring to the mainstream trend.

## Advantage Analysis

The advantages of this strategy:

1. The dual MA channel reflects the current price oscillation range.  

2. ATR parameter enables the channel range to track market volatility in real time.

3. Mainstream trend filtering avoids false signals in oscillating markets.  

4. The rules are simple and easy to understand. Suitable for learning and researching.

## Risk Analysis

The risks:

1. Failed breakthroughs may lead to missing good opportunities. Can be mitigated by profit taking and re-entry.

2. Mainstream trend judgment has time lag and cannot eliminate all false signals. Can optimize MA parameters. 

3. Stop loss may be penetrated in volatile markets. Can adjust ATR dynamically.

## Optimization Directions

Ways to optimize this strategy:

1. Optimize MA parameters for different products.  

2. Optimize ATR parameter to better track volatility.

3. Add additional filters like volume and volatility indicators to further avoid false signals.  

4. Use machine learning to automatically optimize parameters.

## Conclusion

This dual MA oscillation breakthrough strategy captures oscillating trends through the double MA channel and mainstream filtering. With its simple and clear rules, it is an excellent example to learn breakthrough trading strategies. Further optimizations in parameters and signal filtering can enhance its profitability and stability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|120|Time Frame|
|v_input_2|true|Factor|
|v_input_3|true|Pd|
|v_input_4|500|Take Profit|
|v_input_5|400|Stop Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-20 00:00:00
end: 2023-11-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Anuj4912
//@version=4
strategy("Anuj4912", overlay=true)
res = input(title="Time Frame",  defval="120")
Factor=input(1, minval=1,maxval = 100)
Pd=input(1, minval=1,maxval = 100)

tp = input(500,title="Take Profit")
sl = input(400,title="Stop Loss")


Up=hl2-(Factor*atr(Pd))
Dn=hl2+(Factor*atr(Pd))
MUp=request.security(syminfo.tickerid,res,hl2-(Factor*atr(Pd)))
MDn=request.security(syminfo.tickerid,res,hl2+(Factor*atr(Pd)))

Mclose=request.security(syminfo.tickerid,res,close)

TrendUp=close[1]>TrendUp[1]? max(Up,TrendUp[1]) : Up
TrendDown=close[1]<TrendDown[1]? min(Dn,TrendDown[1]) : Dn

MTrendUp=Mclose[1]>MTrendUp[1]? max(MUp,MTrendUp[1]) : MUp
MTrendDown=Mclose[1]<MTrendDown[1]? min(MDn,MTrendDown[1]) : MDn

Trend = close > TrendDown[1] ? 1: close< TrendUp[1]? -1: nz(Trend[1],1)
Tsl = Trend==1? TrendUp: TrendDown

MTrend = Mclose > MTrendDown[1] ? 1: Mclose< MTrendUp[1]? -1: nz(MTrend[1],1)
MTsl = MTrend==1? MTrendUp: MTrendDown

linecolor = Trend == 1 ? green : red
plot(Tsl, color = linecolor , style = line , linewidth = 2,title = "SuperTrend")

Mlinecolor = MTrend == 1 ? blue : orange
plot(MTsl, color = Mlinecolor , style = line , linewidth = 2,title = "Main SuperTrend")

plotshape(cross(close,Tsl) and close>Tsl , "Up Arrow", shape.triangleup,location.belowbar,green,0,0)
plotshape(cross(Tsl,close) and close<Tsl , "Down Arrow", shape.triangledown , location.abovebar, red,0,0)

up = Trend == 1 and Trend[1] == -1 and MTrend == 1 
down = Trend == -1 and Trend[1] == 1 and MTrend == -1 
plotarrow(up ? Trend : na, title="Up Entry Arrow", colorup=lime, maxheight=60, minheight=50, transp=0)
plotarrow(down ? Trend : na, title="Down Entry Arrow", colordown=red, maxheight=60, minheight=50, transp=0)


golong = Trend == 1 and Trend[1] == -1 and MTrend == 1 
goshort = Trend == -1 and Trend[1] == 1 and MTrend == -1 

strategy.entry("Buy", strategy.long,when=golong)
strategy.exit("Close Buy","Buy",profit=tp,loss=sl)
   
   
strategy.entry("Sell", strategy.short,when=goshort)
strategy.exit("Close Sell","Sell",profit=tp,loss=sl)


```

> Detail

https://www.fmz.com/strategy/433448

> Last Modified

2023-11-27 17:44:49
