
> Name

布林带突破交易策略Bollinger-Band-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略通过判断价格对布林带通道的突破情况进行交易。该策略属于通道突破类策略的一种,旨在捕捉价格突破通道形成的趋势交易机会。

策略原理:

1. 计算布林带通道,中轨为n日简单移动均线,上下轨为中轨之上下若干倍标准差。 

2. 当价格从上向下突破下轨时,进行短仓入场。当价格从下向上突破上轨时,进行多仓入场。

3. 设置止损线为相反方向轨线之外,进行风险控制。

4. 根据最大回撤情况调整通道带宽,优化参数。

5. 结合交易量过滤判断,避免虚假突破。

该策略的优势:

1. 突破通道可有效判断趋势转折点。

2. 布林带参数优化简单实际,不易过优化。

3. 结合交易量可过滤假突破,提高质量。

该策略的风险:

1. 布林带滞后问题较突出,可能错过最佳入场点。 

2. 突破后容易出现反转,须设置合理止损。

3. 优化中追求低频交易可能错失机会。

总之,该策略通过判断布林带的突破情况进行交易,是一种典型的通道突破策略。Relative 简单的规则有利于参数优化,但滞后及止损设置问题仍需警惕,始能获得长期稳定收益。

||

This strategy trades the price breakout of Bollinger Bands. It aims to capture trend opportunities from channel breakouts.

Strategy Logic:

1. Calculate Bollinger Bands with n-period moving average as midline and volatility bands above and below.

2. Enter short when price breaks down below lower band. Enter long when breaking above upper band.

3. Set stops outside opposite band for risk control.

4. Adjust band width based on max drawdown for parameter optimization.

5. Add volume filter to avoid false breakouts.

Advantages:

1. Breaking bands effectively identifies trend turns.

2. Bollinger parameter optimization is simple and practical.

3. Volume filter improves quality by avoiding falseouts. 

Risks:

1. Lagging bands may miss best entry timing.

2. Post-breakout reversals are common, requiring reasonable stops.

3. Seeking low-frequency trades in optimization can miss opportunities.

In summary, this is a typical channel breakout strategy trading Bollinger breaks. The relatively simple rules benefit optimization but lag and stop placement issues remain that impact long-term steady gains.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|40|Length|
|v_input_2|3|R|
|v_input_3|false|Auto Adjust R|
|v_input_4|0.02|Step in R|
|v_input_5|2000|Base Year|
|v_input_6|120|Volume Threadhold|
|v_input_7|true|Include Long|
|v_input_8|true|Include Short|
|v_input_9|true|Enable Position Sizing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-12 00:00:00
end: 2023-09-11 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// strategy("ChannelBreakOutStrategyV2.1", commission_type = "percent", commission_value = 0.1, calc_on_order_fills = true, overlay=true)

length = input(title="Length",  minval=1, maxval=1000, defval=40)
maxR = input(title = "R",  minval = 1.0, maxval = 10, defval = 3, step = 0.1)
adoptR = input(title = "Auto Adjust R",  defval = false)
stepR = input(title = "Step in R",  minval = 0.01, maxval = 0.1, step = 0.01, defval = 0.02)
baseYear = input(title = "Base Year",  minval = 2000, maxval = 2016, defval = 2000)
volumeTh = input(title = "Volume Threadhold",  minval = 100.0, maxval = 200, defval = 120, step = 5)
hasLong = input(title = "Include Long",  defval = true)
hasShort = input(title = "Include Short",  defval = true)
usePositionSizing = input(title = "Enable Position Sizing",  defval = true)

getTrailStop(val, current) => 
    s = val > 1.6 ? 0.8 : val >= 1.4 ? 0.85 : val >= 1.3 ? 0.9 : 0.93
    s * current


upBound = highest(high, length)
downBound = lowest(low, length)
hasVol = (volume / sma(volume, length) * 100 >= volumeTh) ? 1 : 0

hasPos = strategy.position_size != 0 ? 1 : 0

trailstop = atr(length) * 3
ptvalue = syminfo.pointvalue
equity = strategy.openprofit > 0 ? strategy.equity - strategy.openprofit : strategy.equity
curR = adoptR == false ? maxR : n == 0 ? maxR : hasPos == 1 ? curR[1] : (rising(equity,1) > 0? curR[1] + stepR : falling(equity, 1) > 0 ? curR[1] <= 2.0 ? 2.0 : curR[1] - stepR : curR[1])
contracts = usePositionSizing == false ? 20 : floor(equity / 100 * curR / (trailstop * ptvalue))

realbuystop = close - trailstop
realsellstop = close + trailstop

isPFst = (hasPos[1] == 0 and hasPos == 1) ? 1 : 0
isPOn = (hasPos[1] + hasPos == 2) ? 1 : 0
largestR = hasPos == 0 or isPFst == 1 ? -1 : nz(largestR[1]) < close ? close : largestR[1]
pctRise =  largestR / strategy.position_avg_price

rbs = strategy.position_size <= 0 ? realbuystop : isPFst ? strategy.position_avg_price - trailstop : pctRise >= 1.3 ? getTrailStop(pctRise, largestR) : (isPOn and realbuystop > rbs[1] and close > close[1]) ? realbuystop : rbs[1]
rss = strategy.position_size >= 0 ? realsellstop : isPFst ? strategy.position_avg_price + trailstop : (isPOn and realsellstop < rss[1] and close < close[1]) ? realsellstop : rss[1]

isStart = na(rbs) or na(rss) ? 0 : 1
buyARun = close - open > 0 ? 0 : open - close
sellARun = open - close > 0 ? 0 : close - open

if (strategy.position_size > 0 and buyARun >= trailstop / 3 * 2 and pctRise < 1.3)
    strategy.close("buy")
    strategy.cancel("exit")
if (strategy.position_size < 0 and sellARun >= trailstop / 3 * 2)
    strategy.close("sell")
    strategy.cancel("exit")

strategy.cancel("buy")
strategy.cancel("sell")
conLong = hasLong == true and hasPos == 0 and year > baseYear and (isStart + hasVol) == 2
strategy.order("buy", strategy.long, qty = contracts, stop=upBound + syminfo.mintick * 5, comment="BUY", when = conLong)
if (rbs > high)
    strategy.close("buy")
strategy.exit("exit", "buy", stop = rbs, when = hasPos == 1 and isStart == 1)

conShort = hasShort == true and hasPos == 0 and year > baseYear and (isStart + hasVol) == 2
strategy.order("sell", strategy.short, qty = contracts, stop=downBound - syminfo.mintick * 5, comment="SELL", when = conShort)
if (rss < low)
    strategy.close("sell")
strategy.exit("exit", "sell", stop = rss, when = hasPos == 1 and isStart == 1)

plot(series = rbs, color=blue)
plot(series = realbuystop, color=green)
plot(series = rss, color=red)
plot(series = realsellstop, color=yellow)
```

> Detail

https://www.fmz.com/strategy/426504

> Last Modified

2023-09-12 16:23:12
