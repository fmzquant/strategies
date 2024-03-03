
> Name

RSI指标背离交易策略RSI-Divergence-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ece2731905214f3ae2.png)

[trans]

## 概述

RSI指标背离交易策略通过识别RSI指标与价格走势之间的背离,给出买入和卖出信号。该策略同时具有止损、止盈、追踪止损等功能,可有效控制风险。

## 原理

该策略主要基于RSI指标的背离来识别交易机会。具体来说,策略首先计算一定周期内的RSI值,然后画出RSI指标的趋势线。同时,策略还画出价格的趋势线。当RSI线与价格线出现背离时,即RSI上涨而价格下跌或RSI下跌而价格上涨,策略判断可能出现转折,产生交易信号。

如果识别到RSI线低点上升且价格线高点下跌的情况,则给出买入信号。如果识别到RSI线高点下降且价格线低点上涨的情况,则给出卖出信号。一旦形成交易信号,策略即可按照RSI值的大小进行适量交易。

此外,策略还设置了止损、止盈和追踪止损功能。止损可以控制亏损风险,止盈可以锁定利润,追踪止损可以让利润继续运行。这些设置可以有效管理每笔交易的风险。

## 优势

这种RSI背离交易策略具有以下优势:

1. 通过捕捉RSI指标背离,可以提早发现价格转折。

2. RSI指标使用广泛,大多数交易软件都内置了RSI指标。该策略适用性强。

3. RSI指标参数设置灵活,可根据市场调整观察周期,适应不同行情。

4. 结合止损、止盈和追踪止损设置,可以有效控制每笔交易的风险。

5. 策略交易信号频率适中,避免过于密集交易。

6. 策略思路清晰易懂,方便计算机程序实现。

## 风险

该策略也存在一些风险:

1. RSI背离不是百分之百可靠,可能会出现假信号。需要结合其他指标过滤信号。

2. 趋势行情中,RSI背离信号可能失效,应该避开使用。

3. RSI参数设置不当也会影响策略效果。周期设置过短则会增加交易频率和风险。

4. 止损点设置过小,可能会过早止损;止损点过大,则无法有效控制风险。需要权衡设置。

5. 追踪止损在价格剧烈波动时,可能会过早止损。需要结合市场波动率设定合理的追踪止损距离。

对应风险可以通过以下措施加以缓解:

1. 增加其他指标,如MACD、布林线等进行信号过滤,减少假信号。

2. 只在盘整震荡市中使用该策略,避开明显趋势行情。

3. 优化RSI参数设置,选取最佳周期长度。同时测试不同市场的参数偏好。

4. 根据历史回测数据设定合理的止损和止盈位置。

5. 根据市场波动率和风险偏好调整追踪止损的幅度。

## 优化方向

该策略可以从以下方面进行优化:

1. 增加其他指标判断来过滤交易信号,提高信号的可靠性。

2. 利用机器学习技术来自动优化RSI参数设置。

3. 根据不同市场行情型态,设计动态止损算法。如在震荡行情中扩大止损位,在趋势行情中缩小止损位。

4. 设计动态仓位管理算法,根据市场波动率等因素来调整每次交易的仓位大小。

5. 在追踪止损中引入波动率概念,根据价格波动强度来设定追踪止损距离。

6. 尝试将策略部署至其他品种,如外汇和加密货币等市场。

7. 构建量化交易系统,实现策略的自动化交易。

## 总结

该RSI背离交易策略通过捕捉RSI指标与价格走势之间的背离来产生交易信号。策略优势在于简单清晰,容易实现自动化。同时,止损、止盈和追踪止损设置也能有效控制风险。但策略也存在一些局限,需要多指标组合验证信号,并不适用于强趋势行情。策略可以从优化参数设置、增加信号过滤以及动态止损等方面进行改进。如果系统化实现,该策略可作为盘整震荡行情下的辅助策略之一。

||

## Overview

The RSI Divergence trading strategy generates buy and sell signals by identifying divergences between the RSI indicator and price movement. The strategy also incorporates stop loss, take profit and trailing stop loss to effectively manage risks. 

## Principle 

This strategy mainly uses divergences in the RSI indicator to identify trading opportunities. Specifically, the strategy first calculates the RSI values over a certain period, then plots the trendlines for both the RSI indicator and price. When the RSI line diverges from the price line, i.e. RSI rises while price falls, or RSI falls while price rises, the strategy takes it as a sign of impending trend reversal and generates trading signals.

If the strategy detects the RSI line bottoming while the price line topping, a buy signal is generated. If the RSI line tops while the price line bottoms, a sell signal is generated. Once a trading signal occurs, the strategy can trade according to the RSI value size.

In addition, the strategy has stop loss, take profit and trailing stop loss features. Stop loss controls downside risks, take profit locks in profits, and trailing stop allows profits to run. These settings effectively manage the risks for each trade.

## Advantages

The RSI divergence trading strategy has the following advantages:

1. Capturing RSI divergences can early detect trend reversals.

2. RSI is widely used and available in most trading platforms. The strategy has high applicability. 

3. RSI parameters are flexible and can be adjusted for different market conditions.

4. The stop loss, take profit and trailing stop loss controls risk effectively.

5. The strategy has a moderate signal frequency, avoiding over-trading. 

6. The logic is simple and easy to program for automation.

## Risks

The strategy also has some risks:

1. RSI divergences are not completely reliable and may generate false signals. Other filters are needed.

2. Divergences may fail in strong trending markets, which should be avoided.

3. Improper RSI parameters can affect performance. Too short periods increase frequency and risk.

4. Stop loss set too tight cuts profits short; too loose fails to limit risk. Fine tuning is needed.

5. Trailing stop may stop out prematurely during volatile markets. Reasonable trailing width is required considering volatility.

The risks can be mitigated through:

1. Adding other indicators like MACD, Bollinger Bands to filter signals and reduce false signals.

2. Using the strategy only during range-bound sideways markets, avoiding strong trends.

3. Optimizing RSI parameters, selecting optimal lookback periods. Testing parameters for different markets.

4. Setting reasonable stop loss and take profit levels based on historical backtesting. 

5. Adjusting trailing stop distance based on market volatility and risk appetite.

## Optimization

The strategy can be improved in the following aspects:

1. Incorporate other indicators to filter signals and improve reliability. 

2. Utilize machine learning to auto optimize RSI parameters.

3. Design dynamic stop loss algorithms according to market regimes. Wider stops for ranging, tighter stops for trending markets.

4. Build dynamic position sizing model based on volatility to adjust position sizes.

5. Introduce volatility in trailing stop to set trail distance based on price swings.

6. Deploy strategy to other markets like forex and crypto currencies.

7. Develop a quantitative trading system for automation.

## Conclusion

The RSI divergence trading strategy generates signals by identifying divergences between RSI and price. The logic is simple and easy to automate. The stop loss, take profit and trailing stop effectively controls risks. However, the strategy has limitations in accuracy and trending markets. Improvements can be made through optimizing parameters, adding filters and dynamic stops. As a technical strategy, it can serve as a complement during range-bound markets when systemized.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|rsi length|
|v_input_1_close|0|source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|14|RSI Divergence length|
|v_input_int_3|false|zoom|
|v_input_float_1|25|(?buy)take profit|
|v_input_float_2|5|stop|
|v_input_float_3|0.25|trailing stop|
|v_input_float_4|25|(?sell)take profit|
|v_input_float_5|5|stop|
|v_input_float_6|0.25|trailing stop|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-24 00:00:00
end: 2023-10-24 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © faytterro

//@version=5
// strategy("RSI Divergence Strategy", overlay=true, scale = scale.none)
rsilen=input.int(14, title="rsi length")
rsisrc=input(close, title="source")
x=ta.rsi(rsisrc,rsilen)
len=input.int(14, title="RSI Divergence length", maxval=500)
tpb = input.float(25, title="take profit", group = "buy", step = 0.5)
sb = input.float(5, title="stop", group = "buy", step = 0.5)
tsb = input.float(0.25, title="trailing stop", group = "buy", step = 0.5)
tps = input.float(25, title="take profit", group = "sell", step = 0.5)
ss =input.float(5, title="stop", group = "sell", step = 0.5)
tss = input.float(0.25, title="trailing stop", group = "sell", step = 0.5)
src=close
extrapolation=0
zoom=input.int(0, title="zoom", maxval=27, minval=-27)
hline(300-zoom*10, color=color.rgb(54, 58, 69, 100))
hline(10, color=color.rgb(54, 58, 69, 100))
// for ax+b
xo=0.0
yo=0.0
xyo=0.0
xxo=0.0
for i=0 to len-1
    xo:= xo + i/(len)
    yo:= yo + x[len-1-i]/(len)
    xyo:= xyo + i*x[len-1-i]/(len)
    xxo:= xxo + i*i/(len)
dnm=ta.lowest(low,200)
dizi=array.new_float(len*2+1+extrapolation)
// linedizi=array.new_line()
a=(xo*yo-xyo)/(xo*xo-xxo)
b=yo-a*xo
for i=0 to len-1+extrapolation
    array.set(dizi,i,a*i+b)
//// for src
// for ax+b
xo2=0.0
yo2=0.0
xyo2=0.0
xxo2=0.0
for i=0 to len-1
    xo2:= xo2 + i/(len)
    yo2:= yo2 + src[len-1-i]/(len)
    xyo2:= xyo2 + i*src[len-1-i]/(len)
    xxo2:= xxo2 + i*i/(len)

dizi2=array.new_float(len*2+1+extrapolation)
// linedizi2=array.new_line()
a2=(xo2*yo2-xyo2)/(xo2*xo2-xxo2)
b2=yo2-a*xo2
for i=0 to len-1+extrapolation
    array.set(dizi2,i,a2*i+b2)
ttk=((array.get(dizi,0)<array.get(dizi,1)) and (array.get(dizi2,0)>array.get(dizi2,1)))? 1 : 
 ((array.get(dizi,0)>array.get(dizi,1)) and (array.get(dizi2,0)<array.get(dizi2,1)))? -1 : 0
cg=((array.get(dizi,0)<array.get(dizi,1)) and (array.get(dizi2,0)>array.get(dizi2,1)))// and ta.highest(ttk[1],len/2)<1)
cr=((array.get(dizi,0)>array.get(dizi,1)) and (array.get(dizi2,0)<array.get(dizi2,1)))// and ta.lowest(ttk[1],len/2)>-1)
bgcolor(color=(cg and ta.highest(ttk[1],len/2)<1)? color.rgb(76, 175, 79, 50) : 
 (cr and ta.lowest(ttk[1],len/2)>-1)? color.rgb(255, 82, 82, 50) : na, offset=0, display=display.none)
plot(x)

// for ax+b
xo3=0.0
yo3=0.0
xyo3=0.0
xxo3=0.0
for i=0 to len-1
    xo3:= xo3 + i/(len)
    yo3:= yo3 + x[len-1-i+(ta.barssince(cg))]/(len)
    xyo3:= xyo3 + i*x[len-1-i+(ta.barssince(cg))]/(len)
    xxo3:= xxo3 + i*i/(len)

dizi3=array.new_float(len*2+1+extrapolation)
// linedizi3=array.new_line()
a3=(xo3*yo3-xyo3)/(xo3*xo3-xxo3)
b3=yo3-a3*xo3
for i=0 to len-1+extrapolation
    array.set(dizi3,i,a3*i+b3)

// for ax+b
xo4=0.0
yo4=0.0
xyo4=0.0
xxo4=0.0
for i=0 to len-1
    xo4:= xo4 + i/(len)
    yo4:= yo4 + x[len-1-i+(ta.barssince(cr))]/(len)
    xyo4:= xyo4 + i*x[len-1-i+(ta.barssince(cr))]/(len)
    xxo4:= xxo4 + i*i/(len)

dizi4=array.new_float(len*2+1+extrapolation)
// linedizi4=array.new_line()
a4=(xo4*yo4-xyo4)/(xo4*xo4-xxo4)
b4=yo4-a4*xo4
for i=0 to len-1+extrapolation
    array.set(dizi4,i,a4*i+b4)

// line=line.new((last_bar_index-ta.barssince(cg)-len),
//  array.get(dizi3,0), 
//  last_bar_index-ta.barssince(cg),
//  array.get(dizi3,len-1), color=color.rgb(0,255,0), width=2)
// line2=line.new((last_bar_index-ta.barssince(cr)-len),
//  array.get(dizi4,0), 
//  last_bar_index-ta.barssince(cr),
//  array.get(dizi4,len-1), color=color.rgb(255, 0, 0, 0), width=2)
// line.delete(line[1])
// line.delete(line2[1])

alert=((array.get(dizi,0)<array.get(dizi,1)) and (array.get(dizi2,0)>array.get(dizi2,1)) and ta.highest(ttk[1],len/2)<1)
 or ((array.get(dizi,0)>array.get(dizi,1)) and (array.get(dizi2,0)<array.get(dizi2,1)) and ta.lowest(ttk[1],len/2)>-1)
alertcondition(alert)
hline(50)
rs=hline(30)
rss=hline(70)
fill(rs, rss, color=color.rgb(126, 87, 194, 90), title="RSI Background Fill")

longCondition = cg and ta.highest(ttk[1],len/2)<1 
if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit("exit long", "Long", limit = close*(100+tpb)/100 , stop =close*(100-sb)/100 , trail_price = close , trail_offset = close*tsb)

shortCondition = cr and ta.lowest(ttk[1],len/2)>-1 
if (shortCondition)
    strategy.entry("Short", strategy.short)
    strategy.exit("exit short", "Short", limit = close*(100-tps)/100, stop = close*(100+ss)/100, trail_price = close , trail_offset = close*tss)

```

> Detail

https://www.fmz.com/strategy/430162

> Last Modified

2023-10-25 16:47:14
