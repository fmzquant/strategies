
> Name

基于箱体突破的银弹策略Box-Breakout-Based-Silver-Bullet-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c771db4f92f212e62e.png)

[trans]

## 概述

该策略主要通过监测K线的高低点形成的箱体的突破,判断市场的方向和力度。当出现向上的箱体突破时,策略会在突破点附近设定一个正向的入场点;当出现向下的箱体突破时,策略会在突破点附近设定一个反向的入场点。一旦形成交易信号,策略就会下单建仓,并设置止损点和止盈点来控制风险。

## 策略原理

1. 策略会定义一个交易时间段,只在该时间段内运作寻找交易机会。

2. 策略会在每一个K线形成后判断前两根K线的最高价和最低价是否出现了显著的突破。

    2.1 如果第二根K线的最低价高于第一根K线的最高价,就出现了向上的箱体突破。

    2.2 如果第二根K线的最高价低于第一根K线的最低价,就出现了向下的箱体突破。

3. 在确认箱体突破信号后,策略会在当根K线的最高价或最低价附近设置正向或反向的入场点。

4. 一旦形成仓位,策略会根据突破幅度的两倍进行止盈设置,通过此方法来捕捉趋势的加速。

5. 策略还会在第二根K线的最低价或最高价位置设置止损点,降低亏损风险。

## 优势分析

该策略具有如下优势:

1. 原理简单易懂,容易执行。

2. 使用K线箱体突破判断市场方向和力度,准确率较高。

3. 通过止盈水平的设定可以捕捉趋势加速的机会。止盈倍数是可调整的。

4. 有明确的止损逻辑,可以控制单笔亏损。

5. 策略思路灵活,可以根据个人风格进行定制。

## 风险分析

然而,策略也存在一定的风险:

1. 突破信号可能是假突破,不能完全避免亏损的发生。

2. 止损位置靠近入场点可能会被激进的市场轻易触发。

3. 无法判断趋势格局,在震荡行情中止损可能频繁被触发。

4. 没有考虑交易品种和时间段差异性造成的影响。

## 优化方向  

为进一步优化该策略,可以从以下几个方面入手:  

1. 根据不同品种和时间段设置适应性止损止盈参数。

2. 增加对趋势判断的技术指标进行配合,避免在震荡行情中被套。  

3. 设置后续加仓机会来追踪趋势运行。

4. 结合量能指标来判断突破的真假以过滤信号。

5. 增加机器学习算法来辅助判断趋势方向。

## 总结  

该策略基于简单的突破原理设计,通过捕捉突破后的加速运行获取超额收益。利用止损和止盈设置控制风险。策略容易理解和实施,可根据个人需求和市场环境进行调整优化,具有很强的实用性。

||

## Overview  

The strategy mainly detects the breakthrough of the box formed by the high and low points of K-line to judge the direction and strength of the market. When there is an upward box breakout, the strategy will set a long position around the breakout point. When there is a downward box breakout, the strategy will set a short position around the breakout point. Once a trading signal is generated, the strategy will place orders to open positions and set stop loss and take profit to control risks.   

## Strategy Logic  

1. The strategy defines a trading time period and only looks for trading opportunities during that period.

2. After each K-line forms, the strategy judges whether there is a significant breakthrough between the highest and lowest prices of the previous two K-lines.  

    2.1 If the lowest price of the 2nd K-line is higher than the highest price of the 1st K-line, there is an upward box breakout.  

    2.2 If the highest price of the 2nd K-line is lower than the lowest price of the 1st K-line, there is a downward box breakout.  

3. After confirming the box breakout signal, the strategy sets a long or short entry point around the highest or lowest price of the current K-line.  

4. Once the position is opened, the strategy sets the take profit based on twice the breakout range to capture trend acceleration.  

5. The strategy also sets the stop loss at the lowest or highest price of the 2nd K-line to reduce loss risk.  

## Advantage Analysis   

The strategy has the following advantages:

1. The logic is simple and easy to implement.  

2. Using K-line box breakouts to judge market direction and strength has high accuracy.
   
3. The take profit setting captures opportunities from trend acceleration. The multiplier is adjustable.  

4. There is a clear stop loss logic to control single loss.  

5. The strategy idea is flexible and can be customized according to personal style.

## Risk Analysis   

However, there are some risks in the strategy:  

1. Breakout signals may be false breakouts, losses cannot be completely avoided.  

2. The stop loss near the entry point can be easily triggered by aggressive markets.

3. It cannot judge the trend structure and stops may be frequently triggered in range-bound markets.  

4. It does not consider the impact of different products and time periods.

## Optimization Directions   

To further optimize the strategy, we can improve from the following aspects:

1. Set adaptive stop loss and take profit parameters for different products and time periods.  

2. Add technical indicators for trend judgment to avoid being trapped in range-bound markets.  

3. Set subsequent add-on opportunities to track trend runs.  

4. Combine volume indicators to judge the authenticity of breakouts and filter signals.  

5. Add machine learning algorithms to assist in determining trend direction.   

## Summary   

The strategy is designed based on the simple breakout principle to capture accelerated runs after breakouts for excess returns. It uses stops and profits to control risks. The easy-to-understand and implement strategy can be customized and optimized according to personal needs and market environments, making it highly practical.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|1000|Start Time|
|v_input_2|1600|End Time|
|v_input_int_1|2|Contract Amount|
|v_input_color_1|#3f3db3|FVG Color|
|v_input_color_2|#2321ac|FVG Border Color|
|v_input_int_2|false|FVG Extend Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-07 00:00:00
end: 2024-01-14 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Dvitash

//@version=5
strategy("Casper SMC Silver Bullet", shorttitle = "Casper SB", overlay=true, calc_on_order_fills = true)

startTime = input(defval = "1000", title = "Start Time")
endTime = input(defval = "1600", title = "End Time")
contractAmt = input.int(defval = 2, title = "Contract Amount")
fvgCol = input.color(defval = color.rgb(63, 61, 179, 41), title = "FVG Color")
borderCol = input.color(defval = color.rgb(35, 33, 172, 41), title = "FVG Border Color")
fvgExtendLength = input.int(defval = 0, minval = 0, title = "FVG Extend Length")

allowedTime = not na(time(timeframe.period, startTime + "-" + endTime +":23456", "America/New_York"))
newDay = bool(ta.change(time('D')))
h = hour(time('1'), "America/New_York")

var bool fvgDrawn = na
var float entryPrice = na 
var float stopPrice = na 
var float tpPrice = na 

if newDay
    fvgDrawn := false
    // a_allBoxes = box.all
    // if array.size(a_allBoxes) > 0
    //     for i = 0 to array.size(a_allBoxes) - 1
    //         box.delete(array.get(a_allBoxes, i))

if allowedTime and barstate.isconfirmed and h <= 16
    //Long FVG
    if high[2] < low and not fvgDrawn
        // box.new(bar_index[2], low, bar_index + fvgExtendLength, high[2], bgcolor = fvgCol, border_color = borderCol)
        stopPrice := low[2]
        entryPrice := low
        tpPrice := entryPrice + (math.abs(low[2] - entryPrice) * 2)
        // log.info("SL: " + str.tostring(stopPrice) + " Entry: " + str.tostring(entryPrice) + " TP: " + str.tostring(tpPrice))
        strategy.entry("long", strategy.long, contractAmt, limit = entryPrice, comment = "Long Entry")
        fvgDrawn := true

    if low[2] > high and not fvgDrawn
        // box.new(bar_index[2], high, bar_index + fvgExtendLength, low[2], bgcolor = fvgCol, border_color = borderCol)
        stopPrice := high[2]
        entryPrice := high
        tpPrice := entryPrice - (math.abs(high[2] - entryPrice) * 2)
        // log.info("SL: " + str.tostring(stopPrice) + " Entry: " + str.tostring(entryPrice) + " TP: " + str.tostring(tpPrice))
        strategy.entry("short", strategy.short, contractAmt, limit = entryPrice, comment = "Short Entry")
        fvgDrawn := true
if h >= 16
    strategy.close_all()
    strategy.cancel_all()

strategy.exit("long exit", from_entry = "long", qty = contractAmt, limit = tpPrice, stop = stopPrice, comment = "Long Exit")
strategy.exit("short exit", from_entry = "short", qty = contractAmt, limit = tpPrice, stop = stopPrice, comment = "Short Exit")
```

> Detail

https://www.fmz.com/strategy/438776

> Last Modified

2024-01-15 12:06:32
