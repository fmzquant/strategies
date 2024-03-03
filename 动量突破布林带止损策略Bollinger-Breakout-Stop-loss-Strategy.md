
> Name

动量突破布林带止损策略Bollinger-Breakout-Stop-loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e940cb262d9c1cc881.png)

[trans]

## 概述

本策略基于布林带指标进行交易信号判断,使用止损止盈方式进行仓位管理。策略会监控布林带上轨和下轨的突破情况,在价格突破布林带上轨时做多,突破下轨时做空,并在反向突破时使用止损单平仓。

## 策略原理

该策略使用布林带指标中的中轨、上轨和下轨线。中轨线是计算一定周期内的价格中值,上轨线是中轨线加上标准差的两倍,下轨线是中轨线减去标准差的两倍。

代码首先计算布林带的中轨、上轨和下轨。然后,判断价格是否突破上轨或下轨,如果突破上轨则做多,如果突破下轨则做空。同时,如果价格反向突破上轨或下轨,则使用止损单平仓。

具体来说,策略逻辑如下:

1. 计算布林带中轨、上轨、下轨
2. 如果价格突破上轨,做多开仓
3. 如果价格突破下轨,做空开仓  
4. 如果有做多仓位,价格突破下轨,使用止损单平仓
5. 如果有做空仓位,价格突破上轨,使用止损单平仓

通过这种方式,可以在股价产生较大波动时捕捉趋势,同时也可以通过止损来限制亏损。

## 优势分析

- 使用布林带指标判断入场时机,可以有效捕捉价格突破后的趋势行情
- 做多做空信号明确,操作规则简单清晰
- 使用止损单策略,可以限制单笔交易的最大损失
- ParameterHandler可调整布林带参数,优化策略

## 风险分析

- 布林带交易容易产生多次小额止损单损失,造成整体盈亏受损
- 布林带参数设置不当可能导致交易频率过高或信号错失
- 仅考虑价格因素,没有结合其他指标来综合判断行情
- 没有考虑突破点附近的止损线调整,可能扩大损失

可以通过Combine指标组合,适当调整止损单位等方式来优化。

## 优化方向

- 可以考虑结合其他指标,如交易量、移动平均线等来确认突破信号
- 可以根据不同市场调整布林带参数,优化参数组合
- 可以根据突破点调整靠近的止损距离,避免过于敏感
- 可以考虑结合海龟交易法则,只在趋势形成后进行交易
- 可以结合机器学习算法自动优化布林带参数

## 总结

本策略基于布林带指标设计了一个较为简单的趋势跟踪策略。它可以在价格产生突破时快速形成仓位,同时利用止损来控制风险。但仅考虑价格因素可能导致误判,而过于灵敏的止损又可能增加交易频率。我们可以通过参数优化、指标组合、止损调整等方式进一步完善该策略。总体来说,本策略为我们提供了一个相对简单可靠的量化交易思路。

||

## Overview

This strategy generates trading signals based on the Bollinger Bands indicator and manages positions using stop-loss/take-profit. It monitors the breakout of the Bollinger Bands upper and lower bands, goes long when price breaks above the upper band, goes short when price breaks the lower band, and exits when price breaks the bands in reverse using stop-loss orders.

## Strategy Logic

The strategy utilizes the middle, upper and lower bands from the Bollinger Bands indicator. The middle band is the moving average, the upper band is middle band plus 2 standard deviations, and the lower band is the middle band minus 2 standard deviations.

First it calculates the Bollinger Bands middle, upper and lower bands. Then it checks if price breaks above the upper band or below the lower band. If price breaks above upper band, it goes long. If price breaks below lower band, it goes short. Also if price breaks the bands in reverse, it exits positions using stop-loss orders. 

Specifically, the strategy logic is:

1. Calculate Bollinger Bands middle, upper and lower bands
2. If price breaks above upper band, go long 
3. If price breaks below lower band, go short
4. If already long, close long when price breaks below lower band 
5. If already short, close short when price breaks above upper band

This allows catching trends when price makes big moves, while limiting losses using stop-loss. 

## Advantages

- Using Bollinger Bands for entry signals catches trends after breakouts
- Clear long/short signals, simple rules
- Stop-loss strategy limits max loss per trade  
- Parameter tunability to optimize strategy

## Risks 

- Frequent small stop-loss trades may hurt overall P/L
- Poor parameter tuning may cause too many signals or missed trades
- Only considers price, no other indicators for confirmation
- No adjustment of stop-loss near breakout may increase loss

Can optimize via combining indicators, adjusting stop-loss units etc.

## Enhancement Opportunities

- Combine other indicators like volume, moving averages to confirm signals
- Optimize Bollinger parameters for different markets  
- Adjust stop-loss distance near breakout to avoid oversensitivity
- Trade only after trends develop, like Turtle Trading rules
- Auto-optimize parameters via machine learning algorithms

## Conclusion

This is a relatively simple trend following strategy based on Bollinger Bands. It can quickly take positions when price breaks out and uses stop-loss to control risk. But relying solely on price may cause misjudgements, while sensitive stop-loss may increase trade frequency. We can further improve it via parameter tuning, combining indicators, adjusting stops etc. Overall it provides a simple and reliable quant trading framework.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|long|
|v_input_2|true|short|
|v_input_int_1|20|length|
|v_input_float_1|2|mult|
|v_input_3_close|0|source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|true|Show Bollinger Bands|
|v_input_5|true|Show Offset|
|v_input_6|timestamp(01 Jan 2000 00:00 +0000)|Start Time|
|v_input_7|timestamp(31 Dec 2099 23:59 +0000)|Final Time|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-26 00:00:00
end: 2023-10-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ROBO_Trading

//@version=5
strategy(title = "Bollinger Stop Strategy", shorttitle = "BBStop", overlay = true, default_qty_type = strategy.percent_of_equity, initial_capital = 10000, default_qty_value = 100, commission_value = 0.1)

//Settings
long = input(true)
short = input(true)
length = input.int(20, minval=1)
mult = input.float(2.0, minval=0.001, maxval=50)
source = input(close)
showbb = input(true, title = "Show Bollinger Bands")
showof = input(true, title = "Show Offset")
startTime = input(defval = timestamp("01 Jan 2000 00:00 +0000"), title = "Start Time", inline = "time1")
finalTime = input(defval = timestamp("31 Dec 2099 23:59 +0000"), title = "Final Time", inline = "time1")

//Bollinger Bands
basis = ta.sma(source, length)
dev = mult * ta.stdev(source, length)
upper = basis + dev
lower = basis - dev

//Show indicator
offset = showof ? 1 : 0
colorBasis = showbb ? color.gray : na
colorUpper = showbb ? color.blue : na
colorLower = showbb ? color.blue : na
colorBands = showbb ? color.blue : na
p0 = plot(basis, "Basis", color = colorBasis, offset = offset)
p1 = plot(upper, "Upper", color = colorUpper, offset = offset)
p2 = plot(lower, "Lower", color = colorLower, offset = offset)
fill(p1, p2, title = "Background", color = colorBands, transp = 90)

//Trading
truetime = true
if basis > 0 and truetime
    if long
        strategy.entry("Long", strategy.long, stop = upper, when = truetime)
    if short
        strategy.entry("Short", strategy.short, stop = lower, when = truetime)
    if long == false
        strategy.exit("Exit", "Short", stop = upper)
    if short == false
        strategy.exit("Exit", "Long", stop = lower)
if time > finalTime
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/430382

> Last Modified

2023-10-27 16:50:24
