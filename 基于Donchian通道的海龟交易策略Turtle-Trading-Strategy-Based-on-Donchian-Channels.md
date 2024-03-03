
> Name

基于Donchian通道的海龟交易策略Turtle-Trading-Strategy-Based-on-Donchian-Channels

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14635fc82214fdaede9.png)
[trans]

## 概述

本策略名称为“基于Donchian通道的海龟交易策略”。该策略借鉴了著名的“海龟交易法”的主要思想,通过Donchian通道来判断市场趋势,结合移动平均线进行过滤,实现了一个较为简单的趋势跟踪策略。

## 策略原理

该策略的主要判断指标是Donchian通道。Donchian通道由最高价和最低价的N日内波动范围构成,如果价格突破通道上轨,则为长signal;如果下破通道下轨,则为短signal。本策略使用快速Donchian通道(10日)来发出信号,使用慢速Donchian通道(20日)来止损。

另外,该策略还引入了两条移动平均线(50日线和125日线)来过滤信号。只有当快速移动平均线上穿慢速移动平均线时,才会进行多头交易;当快速移动平均线下穿慢速移动平均线时,才会进行空头交易。这可以有效过滤掉部分假信号。 

本策略的开仓条件为:价格上穿Donchian通道上轨,且快速移动平均线上穿慢速移动平均线,满足这两个条件才会开多单;价格下穿Donchian通道下轨,且快速移动平均线下穿慢速移动平均线,则开空单。平仓条件则为价格触碰相反方向的慢速Donchian通道边界。

## 策略优势分析

该策略具有以下优势:

1. 使用Donchian通道判断趋势方向,回测效果较好,成功捕捉大趋势;

2. 增加移动平均线的过滤,可以过滤掉部分假信号,避免亏损;

3. 采用快慢Donchian通道和快慢移动平均线的组合,可以平衡交易频率和止损精度;

4. 风险控制到位,有止损机制来控制单笔损失。

## 策略风险分析

该策略也存在一些风险:

1. 在震荡行情中,可能会出现较多小亏损的单子;

2. 当趋势发生转折时,移动平均线的过滤会提高建仓成本;

3. 在陡峭行情中,可能会出现止损被追的情况。

对策与解决方法:
1. 可以适当调整参数,缩短Donchian周期,降低移动平均线周期来适应不同市场。

2. 增加对大级别趋势的判断,避免逆大趋势建仓。

## 策略优化方向  

该策略可以从以下几个方面进行优化:

1. 增加对突破强度的判断。例如引入成交量,只有在成交量放大的情况下才开仓;

2. 增加对热点区域的判断。结合支撑压力位、波段、格局等判断价格热点,避开热点区域建仓;  

3. 优化止损策略。可以引入追踪止损、振幅止损、时间止损等,使止损更加智能化。

## 总结

本策略总体来说是一个非常典型和简单的趋势跟踪策略。通过Donchian通道判断方向,移动平均线过滤信号,实现了较好的回测效果。该策略适用于追捧大趋势的投资者,风险控制到位,容易实盘操作。通过一些参数和规则优化,可以进一步提高策略胜率和盈利能力。

|| 

## Overview  

The name of this strategy is “Turtle Trading Strategy Based on Donchian Channels”. It borrows the main idea from the famous “Turtle Trading Rules” and uses Donchian Channels to determine market trends, combined with moving averages for filtration, realizing a relatively simple trend following strategy.  

## Strategy Principle  

The main indicator for judgment of this strategy is Donchian Channel. The Donchian Channel consists of the fluctuating range of the highest and lowest prices in the N-day period. If the price breaks through the upper rail of the channel, it will be a long signal; if it breaks through the lower rail of the channel, it will be a short signal. This strategy uses fast Donchian Channel (10 days) to issue signals and slow Donchian Channel (20 days) to stop loss.

In addition, this strategy also introduces two moving average lines (50-day line and 125-day line) to filter signals. Only when the fast moving average line crosses above the slow moving average line, long positions will be traded; Only when the fast moving average line crosses below the slow moving average line, short positions will be traded. This can effectively filter out some false signals.  

The opening conditions of this strategy are: the price breaks through the upper rail of Donchian Channel, and the fast moving average line crosses above the slow moving average line. When both conditions are met, long positions will be opened; The price breaks through the lower rail of Donchian Channel, and the fast moving average line crosses below the slow moving average line, then open short positions. The closing conditions are when the price touches the opposite slow Donchian Channel boundaries.

## Advantage Analysis  

The advantages of this strategy are:

1. Using Donchian Channel to determine the trend direction, the backtest effect is better to successfully capture the big trend;  

2. Adding the filter of moving average can filter out some false signals and avoid losses;

3. The combination of fast and slow Donchain Channels and moving averages can balance the trading frequency and stop loss accuracy;  

4. The risk is well controlled with stop loss mechanism to control single loss.

## Risk Analysis   

Some risks of this strategy:  

1. In the shock market, there may be more small losing orders;

2. When trend reversal occurs, the filtering of moving averages will increase opening costs;  

3. In steep markets, stop loss may be chased.

Countermeasures and solutions:

1. Appropriately adjust parameters, shorten Donchian cycle, reduce moving average cycle to adapt to different markets.

2. Increase judgment on major trend to avoid building positions against major trend.   

## Optimization Directions

The strategy can be optimized in the following aspects:  

1. Increase the strength of breakthrough. For example, introduce volume, open positions only when the volume enlarges;

2. Increase the judgment of hot areas. Combine with support, pressure, bands, patterns and so on to avoid hot areas when opening positions;

3. Optimize stop loss strategies. Introduce tracking stop loss, volatility stop loss, time stop loss etc. to make stop loss smarter.

## Summary  

In general, this strategy is a very typical and simple trend following strategy. It realizes good backtest results by determining direction through Donchian Channel and filtering signals through moving averages. This strategy is suitable for investors who chase big trends, with good risk control and easy to implement in real trading. By optimizing some parameters and rules, the win rate and profitability can be further improved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|From Year|
|v_input_2|2100|To Year|
|v_input_3|true|From Month|
|v_input_4|12|To Month|
|v_input_5|21|From day|
|v_input_6|31|To day|
|v_input_7|20|ATR|
|v_input_8|true|Long|
|v_input_9|true|Short|
|v_input_10|true|Stop LOSS|
|v_input_11|20|Donchian_slow|
|v_input_12|10|Donchian_fast|
|v_input_13|125|Slow_EMA|
|v_input_14|50|Fast_EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-24 00:00:00
end: 2023-12-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// Coded by Vladkos
strategy("Donchian strategy with filter", overlay=true,default_qty_type = strategy.percent_of_equity, default_qty_value = 4,pyramiding=5)

fromyear = input(2017, defval = 2018, minval = 1800, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(21, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")
term = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59))
ATR=input(20,minval=1)
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
needstoploss= input(true,defval=true,title="Stop LOSS")
///////////ATR
tra=atr(ATR)


////////////Переменные
Donchian_slow=input(20,minval=1)
Donchian_fast=input(10,minval=1)
Slow_EMA=input(125,minval=1)
Fast_EMA=input(50,minval=1)

/////////// Медленный Дончан
lower = lowest(Donchian_slow)
upper = highest(Donchian_slow)
basis = avg(upper, lower)
plot(lower,color=blue)
plot(upper,color=blue)

/////////// быстрый Дончан
lowerF = lowest(Donchian_fast)
upperF = highest(Donchian_fast)
basisF = avg(upperF, lowerF)
plot(lowerF,color=red)
plot(upperF,color=red)

////////// Скользящие средние
ema_S=ema(close,Slow_EMA)
ema_F=ema(close,Fast_EMA)
plot(ema_S,color=red)
plot(ema_F,color=green)

///////// Условия сделок
long_condition= close>=upper[1] and ema_F>ema_S  
long_exit= close<lowerF[1]

short_condition=close<=lower[1] and ema_F<ema_S
short_exit=close>upperF[1]

////////// Отправка ордеров
strategy.entry("Long",strategy.long,when=long_condition and term and needlong==true)
strategy.exit("stop loss","Long",stop=strategy.position_avg_price-(tra*2),when= (needstoploss==true))
strategy.close("Long",when=long_exit and (time < timestamp(toyear, tomonth, today, 23, 59)))
    
strategy.entry("Short",strategy.short,when=short_condition and term and (needshort==true))
strategy.exit("stoploss","Short",stop=strategy.position_avg_price+(tra*2),when= (needstoploss==true))
strategy.close("Short",when=short_exit and (time < timestamp(toyear, tomonth, today, 23, 59)))

if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()





```

> Detail

https://www.fmz.com/strategy/436476

> Last Modified

2023-12-25 10:57:52
