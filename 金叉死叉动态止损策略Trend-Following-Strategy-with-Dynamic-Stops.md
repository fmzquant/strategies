
> Name

金叉死叉动态止损策略Trend-Following-Strategy-with-Dynamic-Stops

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8c4c6a5acbe70ebb18.png)

[trans]


## 概述

该策略通过计算ATR指标作为止损线,当价格上穿EMA时产生买入信号,当价格下穿EMA时产生卖出信号,并使用动态止损来管理风险。

## 策略原理

该策略的核心逻辑是:

1. 计算ATR指标作为止损线,ATR值用来计算止损距离nLoss

2. 根据Heikin Ashi蜡烛选项h来决定价格源,默认使用收盘价close,如果选择了Heikin Ashi则使用该蜡烛的收盘价

3. 定义xATRTrailingStop作为动态跟踪止损线,根据价格与前一根K线的止损线比较,来确定当前K线的止损线

4. 定义仓位pos,当价格上穿止损线时设置为1(做多),当价格下穿止损线时设置为-1(做空),否则为0(空仓)

5. 计算一根K线的EMA均线值,定义指标上穿(买入信号)和下穿(卖出信号)

6. 在买入和卖出信号发生时,设置交易入场和出场

7. 使用barcolor函数根据仓位标记K线的颜色

8. 使用plotshape在买入和卖出时标记信号

该策略通过ATR动态止损来管理风险,在趋势出现时能够及时入场,在止损线触发时及时止损。

## 策略优势

该策略具有以下优势:

1. 使用ATR动态止损,可以根据市场波动程度来调整止损距离,在保证止损的同时也避免过于激进的止损被价格短期波动触发

2. 采用EMA产生交易信号,可以过滤掉部分假突破带来的不必要交易

3. 允许选择Heikin Ashi蜡烛作为价格源,可以过滤噪音以识别趋势

4. 仓位管理清晰,做多做空仓位明确,避免追踪止损产生的交易频繁

5. 通过画线、标记和染色直观显示交易信号和止损情况

6. 策略逻辑简单清晰,容易理解和修改

7. 可自定义ATR周期和ATR止损倍数,适应不同市场环境

综上,该策略整合趋势跟踪和动态止损技术,可以有效识别趋势并管理风险,适用于跟踪中长线趋势的交易。

## 策略风险

该策略也存在一定风险:

1. EMA均线产生交易信号可能滞后,错过短线机会

2. 止损距离由ATR决定,在市场震荡时容易频繁止损

3. 未考虑成本因素,实际交易中双边手续费会影响盈利

4. 未设置适当的头寸控制,在资金管理上有待改进

5. 效果依赖参数优化,不同市场需要调整参数

6. 大幅震荡市场中容易被套牢

7. 须适时监控,及时干预或停止策略

可以通过适当优化参数,设置头寸控制,结合其它指标过滤信号等方法来减少风险。在实盘交易中要控制仓位规模,持续监控策略效果,必要时人工干预或关闭。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 调整ATR参数,在不同市场中使止损距离更合理

2. 测试不同均线指标,进一步过滤假信号

3. 增加趋势判断指标,识别趋势方向后再入场

4. 设置头寸控制,限制单向仓位数量

5. 增加开仓条件,如交易量,收盘价远离均线等

6. 考虑成本因素,根据手续费设置止损距离

7. 优化买入卖出时机,结合多种信号和指标

8. 设置部分止盈或移动止盈

9. 添加参数优化功能,自动优化测试参数

通过综合运用多种技术指标和优化方法,可以进一步完善该策略,在更多市场中获得更稳定的效果。

## 总结

该策略整合动态止损和趋势跟踪技术,具有止损有效、跟踪顺畅、易于理解和优化等优点,适用于跟踪中长线趋势模式。但也要注意控制风险,优化参数。如果用好该策略,在趋势明显的市场中,可以获得不错的效果。总体来说,该策略提供了一个简洁实用的趋势跟踪和风险管理的交易思路。

|| 

## Overview

This strategy generates trading signals when price crosses EMA and uses ATR as a dynamic stop loss to manage risks. 

## How It Works

The key logic is:

1. Calculate ATR as the stop loss line, ATR value determines stop distance nLoss

2. Price source is close price by default, use Heikin Ashi close if Heikin Ashi option h is enabled  

3. xATRTrailingStop tracks dynamic stop loss line based on price comparison with previous stop 

4. Position pos is 1 for long when price crosses above stop loss line, -1 for short when crosses below, else 0

5. EMA crossover signals, above EMA is buy signal, below is sell signal

6. Enter trades on buy/sell signals, exit on opposite signals

7. Color bars based on position, mark signals and stop loss lines

This strategy follows trends with dynamic stops based on ATR. It can identify trends and manage risks effectively.

## Advantages

The advantages are:

1. ATR-based dynamic stop adapts to market volatility  

2. EMA filter reduces false signals from noise  

3. Optional Heikin Ashi filters noise and identifies trend   

4. Clear long/short position avoids whipsaws from trailing stop订单的翻译结果:

5. Visual aids like lines, labels and coloring  

6. Simple and easy to understand logic for modifying

7. Customizable ATR period and multiplier for different markets

In summary, by combining trend following and dynamic stops, this strategy can catch trends and manage risks well for swing trading.

## Risks

There are some risks to consider:

1. EMA signals may lag missing short-term moves

2. Frequent stop loss triggers possible in choppy markets

3. No consideration of costs like commissions 

4. Lack of position sizing control 

5. Performance depends on parameter tuning

6. Risk of whipsaws in ranging markets

7. Requires monitoring and intervention

Risks can be reduced by optimizing parameters, adding filters, sizing positions properly, monitoring performance, and intervening when necessary.

## Optimization

Some ways to improve the strategy:

1. Adjust ATR parameters for different markets

2. Test other moving averages to filter signals

3. Add trend filter indicators for higher probability

4. Implement position sizing limits 

5. Add entry conditions like volume, distance from MA

6. Incorporate costs like commissions into stops

7. Optimize entry and exit timing with more signals

8. Introduce profit taking or trailing stops

9. Automated parameter optimization

By combining more techniques for entries, exits, filters, and parameter tuning, the strategy can be further robustified.

## Conclusion

This strategy combines dynamic stops and trend following nicely. With effective stops, smooth trend tracking, ease of use, and customizability, it is suitable for swing trading trends. But proper risk management, monitoring, and parameter tuning is required. When applied well on trending markets, good results can be achieved. Overall it provides a simple and practical approach to combining trend trading and risk management.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Key Vaule. 'This changes the sensitivity'|
|v_input_2|10|ATR Period|
|v_input_3|false|Signals from Heikin Ashi Candles|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-25 00:00:00
end: 2023-10-31 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="UT Bot Strategy", overlay = true)
//CREDITS to HPotter for the orginal code. The guy trying to sell this as his own is a scammer lol. 

// Inputs
a = input(1,     title = "Key Vaule. 'This changes the sensitivity'")
c = input(10,    title = "ATR Period")
h = input(false, title = "Signals from Heikin Ashi Candles")

xATR  = atr(c)
nLoss = a * xATR

src = h ? security(heikinashi(syminfo.tickerid), timeframe.period, close, lookahead = false) : close

xATRTrailingStop = 0.0
xATRTrailingStop := iff(src > nz(xATRTrailingStop[1], 0) and src[1] > nz(xATRTrailingStop[1], 0), max(nz(xATRTrailingStop[1]), src - nLoss),
   iff(src < nz(xATRTrailingStop[1], 0) and src[1] < nz(xATRTrailingStop[1], 0), min(nz(xATRTrailingStop[1]), src + nLoss), 
   iff(src > nz(xATRTrailingStop[1], 0), src - nLoss, src + nLoss)))
 
pos = 0   
pos :=	iff(src[1] < nz(xATRTrailingStop[1], 0) and src > nz(xATRTrailingStop[1], 0), 1,
   iff(src[1] > nz(xATRTrailingStop[1], 0) and src < nz(xATRTrailingStop[1], 0), -1, nz(pos[1], 0))) 
   
xcolor = pos == -1 ? color.red: pos == 1 ? color.green : color.blue 

ema   = ema(src,1)
above = crossover(ema, xATRTrailingStop)
below = crossover(xATRTrailingStop, ema)

buy  = src > xATRTrailingStop and above 
sell = src < xATRTrailingStop and below

barbuy  = src > xATRTrailingStop 
barsell = src < xATRTrailingStop 

plotshape(buy,  title = "Buy",  text = 'Buy',  style = shape.labelup,   location = location.belowbar, color= color.green, textcolor = color.white, transp = 0, size = size.tiny)
plotshape(sell, title = "Sell", text = 'Sell', style = shape.labeldown, location = location.abovebar, color= color.red,   textcolor = color.white, transp = 0, size = size.tiny)

barcolor(barbuy  ? color.green : na)
barcolor(barsell ? color.red   : na)

strategy.entry("long",   true, when = buy)
strategy.entry("short", false, when = sell)
```

> Detail

https://www.fmz.com/strategy/430748

> Last Modified

2023-11-01 13:46:28
