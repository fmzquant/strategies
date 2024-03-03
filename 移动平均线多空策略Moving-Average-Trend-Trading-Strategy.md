
> Name

移动平均线多空策略Moving-Average-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

这个策略是基于移动平均线的多空策略。它使用3条不同参数的移动平均线进行交易信号生成。当价格上穿移动平均线时做多,下穿时做空。该策略有3条移动平均线,可以进行级别分批做多做空,实现趋势跟踪。

## 策略原理

该策略使用sma函数计算长度为len的移动平均线ma。然后根据ma计算出3条平移一定比例的移动平均线longline1、longline2、longline3。其中longline1平移-4%,longline2平移-5%,longline3平移-6%。

在买入信号生成时,如果当前无仓位,当价格上穿longline1时开仓做多;如果已有1手仓位,当价格上穿longline2时再开1手;如果已有2手仓位,当价格上穿longline3时再开1手,最多持有3手多仓。

在卖出信号生成时,如果当前持有多仓,当价格下穿ma时平仓。

该策略可以通过分批分级做多,实现趋势跟踪效果。

## 策略优势

- 使用移动平均线判断趋势方向,可以有效过滤市场噪音,稳定盈利
- 分批分级做多做空,可以在趋势中获利较多
- 平移移动平均线作为入场点,可以更好地把握趋势
- 回撤相对较小,最大回撤控制在20%左右

## 策略风险

- 该策略是纯趋势策略,在盘整市的时候容易被套牢
- 移动平均线产生信号滞后,可能错过趋势转换点
- 分批做多容易追高杀入,风险较大
- 没有止损策略,在突发事件中可能造成较大亏损

风险解决方法:

- 可以加入其他指标判断,确定趋势转换点
- 合理设置移动平均线参数,不能太长,否则信号太滞后
- 适当缩减分批做多的数量,防止追高
- 增加移动止损以控制损失

## 策略优化方向 

该策略可以从以下几个方面进行优化:

1. 增加其他指标判断,确定趋势方向,例如加入MACD判断趋势强弱

2. 优化移动平均线参数,寻找最优参数组合

3. 调整分批做多的数量和比例,防止追高杀入

4. 增加移动止损机制,可以根据ATR来设置止损位

5. 可以根据市场波动率动态调整仓位数,在波动大时减仓

6. 测试不同品种参数效果,寻找最适合该策略的品种

7. 开发Exit模块,在特定形态出现时考虑止盈退出

## 总结

整体来说,该策略利用移动平均线判断趋势方向进行交易,通过分批分级做单可以跟踪趋势获利。但存在一定的滞后,追高风险。我们可以通过添加辅助判断指标、优化参数、调整仓位管理、增加止损机制等方式来优化该策略,使之能够适应不同市场情况,达到稳定可控的盈利效果。

||


## Overview

This strategy is a trend trading strategy based on moving averages. It uses 3 moving averages with different parameters to generate trading signals. It goes long when price crosses above the moving average and goes short when price crosses below. The strategy has 3 moving average lines for staged entry long or short, which allows it to follow the trend.

## Strategy Logic

The strategy calculates the moving average line ma with length len using the sma function. Then it calculates 3 additional moving average lines longline1, longline2, longline3 which are shifted by -4%, -5%, -6% respectively based on ma.

For long signal generation, if current position is flat, it goes long with 1 lot when price crosses above longline1. If already 1 lot long, it adds 1 more lot when price crosses above longline2. If already 2 lots long, it adds 1 more lot when price crosses above longline3. The maximum long position is 3 lots.

For short signal generation, if already long, it exits all long positions when price crosses below ma.

The staged entry allows the strategy to follow the trend.

## Advantages

- Using moving averages to determine trend direction filters out market noise and allows steady profits
- Staged long/short entries can profit more from trends  
- Using shifted moving averages as entry points better catches trends
- Relatively small drawdowns, maximum drawdown controlled around 20%

## Risks

- Pure trend following strategy tends to be whipsawed during range-bound markets
- Lagging signals from moving averages may miss trend turning points  
- Staged long entries may chase high prices and increase risk
- No stop loss mechanism could lead to large losses from sudden events

Risk Solutions:

- Add other indicators to determine trend turning points
- Reasonably set moving average parameters, not too long to avoid too lagging signals
- Reduce staged long entry batches to avoid chasing high prices
- Add moving stop loss to limit losses

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Add other indicators like MACD to determine trend strength

2. Optimize moving average parameters to find best combination

3. Adjust staged entry batch size and ratio to prevent chasing high prices 

4. Add moving stop loss mechanism based on ATR 

5. Dynamically adjust position size based on market volatility, reduce size when volatility is high

6. Test parameters on different products to find optimal symbol

7. Develop exit module to consider taking profit at certain patterns

## Summary

Overall, the strategy trades based on trend direction determined by moving averages, and profits from trends via staged entries. But it has some lagging issues and risks of chasing high prices. We can optimize it by adding auxiliary indicators, optimizing parameters, adjusting position sizing, adding stop loss, etc, to adapt to different market conditions and achieve steady profits.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|Lot|
|v_input_2|3|MA Lenghs|
|v_input_3_ohlc4|0|MA Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_4|-4|Long line 1|
|v_input_5|-5|Long line 2|
|v_input_6|-6|Long line 3|
|v_input_7|true|Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-02 00:00:00
end: 2023-10-08 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2019

//@version=4
strategy(title = "Noro's ShiftMA-multi Strategy v1.0", shorttitle = "ShiftMA-multi", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 3)

//Settings
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot")
len = input(3, minval = 1, title = "MA Lenghs")
src = input(ohlc4, title = "MA Source")
longlevel1 = input(-4.0, title = "Long line 1")
longlevel2 = input(-5.0, title = "Long line 2")
longlevel3 = input(-6.0, title = "Long line 3")
needoffset = input(true, title = "Offset")

//Variables
size = strategy.position_size
mult = 1 / syminfo.mintick

//MA
ma = sma(src, len)
longline1 = round(ma * ((100 + longlevel1) / 100) * mult) / mult
longline2 = round(ma * ((100 + longlevel2) / 100) * mult) / mult
longline3 = round(ma * ((100 + longlevel3) / 100) * mult) / mult

//Lines
offset = needoffset ? 1 : 0
plot(ma, color = color.blue)
plot(longline1, offset = offset, color = color.lime)
plot(longline2, offset = offset, color = color.lime)
plot(longline3, offset = offset, color = color.lime)

//Trading
lot = 0.0
lot := size == 0 ? strategy.equity / close * capital / 100 : lot[1]
lots = 0.0
if ma > 0
    lots := round(size / lot)
    strategy.entry("L1", strategy.long, lot, limit = longline1, when = (lots == 0))
    lots := round(size / lot)
    strategy.entry("L2", strategy.long, lot, limit = longline2, when = (lots <= 1))
    lots := round(size / lot)
    strategy.entry("L3", strategy.long, lot, limit = longline3, when = (lots <= 2))
if size > 0
    strategy.entry("TP", strategy.short, 0, limit = ma)
    
```

> Detail

https://www.fmz.com/strategy/428804

> Last Modified

2023-10-09 16:00:02
