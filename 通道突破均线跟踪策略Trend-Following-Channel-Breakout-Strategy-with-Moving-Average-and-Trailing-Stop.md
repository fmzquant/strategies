
> Name

通道突破均线跟踪策略Trend-Following-Channel-Breakout-Strategy-with-Moving-Average-and-Trailing-Stop

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13164582a3c222519a5.png)

[trans]

### 概述

该策略是一个基于价格Channel的突破策略,结合了均线指标和跟踪止损/止盈来进行入场和退出。它使用高低价的均线构建价格Channel,在价格突破Channel时入场做多/空,并使用固定止损或 trailing stop来控制风险。

### 策略原理

该策略通过计算高低价的均线,形成一个价格Channel。具体来说,是计算长度为10的高价和低价的SMA均线,形成Channel的上轨和下轨。当价格从下轨突破到上轨时,做多入场;当价格从上轨突破到下轨时,做空入场。 

在入场后,策略采用固定止损或 trailing stop来退出持仓。trailing stop 包括两个参数:固定止盈位和 activating offset。当价格达到激活偏移量时,止盈位会被 trail 跟踪价格。这可以锁定利润,同时保持让利空间。

该策略同时结合了时间段过滤,只在指定的历史日期内进行回测,可以测试不同市场阶段的表现。

### 优势分析

该策略采用价格Channel和趋势跟踪止损,可以捕捉中长线趋势的方向。相比单纯的移动均线策略,它减少了因价格震荡造成的无效交易。通过 trailing stop,可以dynamically trail 价格来锁定利润。

整体来说,该策略逻辑清晰,使用指标和参数较少,回测容易,适合中长线趋势交易,可以在强势行情中获利。

### 风险分析

该策略在震荡行情中容易被套住退出,无法持久获利。此外,在极端行情中,价格可能直接突破止损位造成较大亏损。

参数设置比较主观,不同市场阶段需要调整参数。固定的止盈位和激活偏移量,无法根据市场波动程度做调整。

### 优化方向  

可以考虑结合其他指标过滤入场信号,例如成交量,布林带等,避免被套。或使用动态止损,根据ATR 或价格波动程度来设置止损位。

退出规则可以优化为移动止损或 Chandelier Exit。当价格重新进入Channel时也可以考虑部分退出。入场过滤和退出规则的优化可以大幅提高策略稳定性。

### 总结

本策略整体是一个基于价格Channel、趋势跟踪、止损/止盈管理的量化策略。它具有清晰的逻辑结构、简单的参数结构,容易理解和回测,适合用来学习量化交易。该策略可以通过多种方式进行优化,提高稳定性和盈利能力。其核心思路为捕捉价格趋势的方向,并通过止损和止盈来控制风险,可以运用到多种品种和时间周期。

||

### Overview

This is a breakout strategy based on price Channel, combined with moving average indicators and trailing stop/take profit for entry and exit. It uses moving average of high/low prices to construct the price Channel, and enter long/short when price breaks out of the Channel, with fixed stop loss or trailing stop to control risks.

### Strategy Logic

The strategy calculates moving averages of high/low prices to form a price Channel. Specifically, it computes length 10 SMA of high/low prices to plot the upper and lower band of the Channel. When price breaks out above the lower band into the upper band, it enters long. When price breaks down from the upper band into the lower band, it enters short.  

After entry, the strategy uses either fixed stop loss or trailing stop for exit. The trailing stop consists of two parameters: fixed take profit level, and activating offset. When price reaches the activating offset, the take profit level starts to trail the price. This allows locking in profits while keeping some open space.

The strategy also combines time range filter, only running backtest within specified historical timeframe, to test performance across different market stages.

### Advantage Analysis

The strategy exploits price Channel and trend following with trailing stop, which allows it to capture mid-to-long term trend directions. Compared to simple moving average strategies, it avoids ineffective trades due to price fluctuations. With trailing stops, it can dynamically trail prices to lock in profits.

Overall, the strategy has clear logic, minimal indicators and parameters, easy to backtest, suitable for mid-to-long term trend trading, and can profit from strong trends. 

### Risk Analysis  

The strategy tends to get stopped out easily during ranging, choppy markets, unable to sustain profits. Also during extreme moves, price may break out the stop loss aggressively leading to large losses.

The parameter tuning is quite subjective, requiring adjustments across different market stages. The fixed take profit and activating offset fails to adapt to varying market volatility.

### Enhancement Opportunities

Other indicators such as volume, Bollinger Bands can be incorporated to filter entry signals, avoiding traps. Or dynamic stops can be used based on ATR or price volatility.

Exit rules may be upgraded to trailing stop or Chandelier Exit. Partial profit targets can be considered when price re-enters Channel. Optimizing entry filters and exit rules can greatly improve stability of the strategy.

### Conclusion

In summary, this is a quantitative strategy based on price Channel, trend following, stop loss/profit taking management. It has clear logic flow, simple parameter structure, easy to understand and backtest. It is suitable to learn algorithmic trading concepts. The strategy can be enhanced in various aspects to improve stability and profitability. The core idea is to capture trend direction, and manage risks via stop loss and take profit. It can be applied to various products over different timeframes.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Lb|
|v_input_2|0|MA Type: SMA|EMA|HMA|McG|WMA|Tenkan|
|v_input_3|300|SL Activation|
|v_input_4|true|SL Trigger|
|v_input_5|150|TP Activation|
|v_input_6|true|TP Trigger|
|v_input_7|true|From Month|
|v_input_8|true|From Day|
|v_input_9|2019|From Year|
|v_input_10|6|To Month|
|v_input_11|19|To Day|
|v_input_12|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-21 23:59:59
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Generalized SSL Backtest w/ TSSL", shorttitle="GSSL Backtest", overlay=true )
// Generalized SSL:
//  This is the very first time the SSL indicator, whose acronym I ignore, is on Tradingview. 
//  It is based on moving averages of the highs and lows. 
//  Similar channel indicators can be found, whereas 
//  this one implements the persistency inside the channel, which is rather tricky.
//  The green line is the base line which decides entries and exits, possibly with trailing stops.
//  With respect to the original version, here one can play with different moving averages.
//  The default settings are (10,SMA)
//
// Vitelot/Yanez/Vts March 2019

lb = input(10, title="Lb", minval=1)
maType = input( defval="SMA", title="MA Type", options=["SMA","EMA","HMA","McG","WMA","Tenkan"])

fixedSL = input(title="SL Activation", defval=300)
trailSL = input(title="SL Trigger", defval=1)
fixedTP = input(title="TP Activation", defval=150)
trailTP = input(title="TP Trigger", defval=1)

FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2019, title = "From Year", minval = 2017)
ToMonth   = input(defval = 6, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 19, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 2020, title = "To Year", minval = 2017)
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
startTimeOk()  => true // create function "within window of time" if statement true
// QUANDL:BCHAIN/ETRVU is USD-denominated daily transaction value on BTC blockchain
// QUANDL:BCHAIN/MKTCP is USD-denominated Bitcoin marketcap

hma(sig, n) => // Hull moving average definition
    wma( 2*wma(sig,round(n/2))-wma(sig,n), round(sqrt(n)))

mcg(sig,length) => // Mc Ginley MA definition
    mg = 0.0
    mg := na(mg[1]) ? ema(sig, length) : mg[1] + (sig - mg[1]) / (length * pow(sig/mg[1], 4))

tenkan(sig,len) =>
    0.5*(highest(sig,len)+lowest(sig,len))

ma(t,sig,len) =>
    sss=na
    if t =="SMA"
        sss := sma(sig,len)
    if t == "EMA"
        sss := ema(sig,len)
    if t == "HMA"
        sss := hma(sig,len)
    if t == "McG" // Mc Ginley
        sss := mcg(sig,len)
    if t == "Tenkan"
        sss := tenkan(sig,len)
    if t == "WMA"
        sss := wma(sig,len)
    sss

base(mah, mal) =>
    bbb = na
    inChannel = close<mah and close>mal
    belowChannel = close<mah and close<mal
    bbb := inChannel? bbb[1]: belowChannel? -1: 1
    uuu = bbb==1? mal: mah
    ddd = bbb==1? mah: mal
    [uuu, ddd]

maH = ma(maType, high, lb)
maL = ma(maType, low, lb)

[up, dn] = base(maH,maL)

plot(up, title="High MA", color=lime, linewidth=3)
plot(dn, title="Low MA", color=orange, linewidth=3)

long = crossover(dn,up)
short = crossover(up,dn)

// === STRATEGY - LONG POSITION EXECUTION ===
strategy.entry("Long", strategy.long, when= long and startTimeOk())
strategy.exit("Exit", qty_percent = 100, loss=fixedSL, trail_offset=trailTP, trail_points=fixedTP) 
strategy.exit("Exit", when= short)
// === STRATEGY - SHORT POSITION EXECUTION ===
strategy.entry("Short", strategy.short, when= short and startTimeOk())
strategy.exit("Exit", qty_percent = 100, loss=fixedSL, trail_offset=trailTP, trail_points=fixedTP)
strategy.exit("Exit", when= long)
```

> Detail

https://www.fmz.com/strategy/438782

> Last Modified

2024-01-15 12:25:26
