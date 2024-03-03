
> Name

布林带通道突破交易策略Bollinger-Band-Channel-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略通过观察价格对布林带通道的突破来进行交易。布林带可有效界定价格震荡范围,其突破可作为趋势转换的信号。

策略原理:

1. 计算布林带中线、上带和下带。中线为n日简单移动均线,带宽为n日标准差的若干倍。 

2. 当价格上穿下带时,做多;当价格下穿上带时,做空。

3. 设置止损位于相反方向的布林带线上,进行风险控制。

4. 采用趋势追踪止损可锁定更多利润,也可选择固定止损。

5. 可为做多做空订单设置互斥,避免同时存在多空单。

该策略的优势:

1. 突破布林带可有效识别趋势变化点。

2. 设置在布林带上的止损有利于从趋势中及时退出。

3. 互斥订单可避免同向交易对冲。

该策略的风险:

1. 布林带均线和标准差存在滞后,可能错过最佳入场点位。

2. 震荡趋势中可能出现频繁的假突破。

3. 标准参数无法适应市场波动率的变化。

总之,该策略通过判断布林带的突破情况进行交易,属于典型的通道突破策略。在参数优化和风险控制方面还有改进空间,但整体思路简单可靠。

||

This strategy trades the price breakout of Bollinger Bands. The bands effectively define price oscillation range, with breakouts signaling potential trend turns. 

Strategy Logic:

1. Calculate BB midline, upper and lower bands. Midline is n-period SMA, band width is n-period standard deviation multiple.

2. Go long on lower band breakout, and short on upper band breakout.

3. Set stop loss on opposite band for risk control.

4. Trailing stop to lock in more profits, or fixed stop.

5. Apply mutually exclusive orders to avoid simultaneous long/short.

Advantages:

1. BB breakout accurately identifies trend changes.

2. Stops on bands allow timely trend exit. 

3. Mutual exclusion avoids same-direction hedging.

Risks:

1. BB mean and deviation lag, missing best entries.

2. Whipsaws common in ranging markets.

3. Static parameters Unable to adapt changing volatility.

In summary, this strategy trades BB breakouts as a typical channel system. There is room for improvement in tuning and risk management but the overall concept is simple and robust.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|45|length|
|v_input_2|2.5|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-05 00:00:00
end: 2023-09-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Kozlod - BB Strategy - 1 minute", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

// 
// author: Kozlod
// date: 2019-05-27
// RSI - BTCUSDT - 1m
// https://www.tradingview.com/u/Kozlod/
// https://t.me/quantnomad
//

source = close
length = input(45, minval=1)
mult = input(2.5, minval=0.001, maxval=50)

basis = sma(source, length)
dev = mult * stdev(source, length)

upper = basis + dev
lower = basis - dev

plot(upper)
plot(lower)

buyEntry  = crossover(source, lower)
sellEntry = crossunder(source, upper)

if (crossover(source, lower))
    strategy.entry("BBandLE", strategy.long, stop=lower, oca_name="BollingerBands",  comment="BBandLE")
else
    strategy.cancel(id="BBandLE")

if (crossunder(source, upper))
    strategy.entry("BBandSE", strategy.short, stop=upper, oca_name="BollingerBands",  comment="BBandSE")
else
    strategy.cancel(id="BBandSE")
```

> Detail

https://www.fmz.com/strategy/426514

> Last Modified

2023-09-12 17:05:56
