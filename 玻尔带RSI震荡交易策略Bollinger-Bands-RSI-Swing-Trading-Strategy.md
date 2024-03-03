
> Name

玻尔带RSI震荡交易策略Bollinger-Bands-RSI-Swing-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

玻尔带RSI震荡交易策略是一种联合使用玻尔带指标和相对强弱指数(RSI)指标的短线震荡交易策略。该策略通过捕捉价格在玻尔带上下轨之间的震荡波动获得利润。

## 原理

首先,该策略使用玻尔带指标分析价格波动的上下限。当价格接近上轨时为超买,接近下轨时为超卖。

其次,结合RSI指标判断超买超卖的强弱。RSI高于70为超买,低于30为超卖。

当价格触碰玻尔带下轨,且RSI显示超卖时,做多;当价格触碰玻尔带上轨,且RSI显示超买时,做空。

## 优势

- 玻尔带指标能准确定位价格的波动范围。

- RSI指标避免盲目做多做空。

- 利用价位回归特性,获利概率较大。

- 频繁交易,具有持续盈利能力。

- 适用于不同品种和时间周期。

## 风险

- 玻尔带参数设置不当,无法定位关键价位。

- RSI参数设置不合理,产生假信号。

- 反弹力度不足,止损被触发。

- 需承受较高交易频率所带来的滑点成本。

- 波动市场中难以抓住趋势。

## 应对方法  

- 优化参数,使玻尔带贴近实际波动范围。

- 调整RSI周期,确保能过滤噪音。

- 移动止损追踪价格,减少套利损失。 

- 选择交易量充足的品种,降低滑点影响。

- 可辅助其他指标来确定趋势方向。

## 总结

玻尔带RSI震荡交易策略,能够有效捕捉价格在范围内的双向波动。通过参数调优和风险管理,可以获得稳定收益。这是一个值得推荐的短线量化交易策略。

||


## Overview 

The Bollinger Bands RSI swing trading strategy combines the Bollinger Bands and Relative Strength Index (RSI) indicators for short-term range oscillation trading. It profits from price swings between the Bollinger Bands upper and lower bands.

## Principles

Firstly, the Bollinger Bands indicator analyzes price fluctuation ranges. Prices near the upper band are overbought, while prices near the lower band are oversold.

Secondly, the RSI indicator determines the overbought/oversold strength. RSI above 70 is overbought, while below 30 is oversold. 

When price hits the lower band and RSI shows oversold, go long. When price hits the upper band and RSI shows overbought, go short.

## Advantages

- Bollinger Bands accurately locate price fluctuation levels.

- RSI avoids blind long/short entries. 

- High win rate capitalizing on mean reversion.

- Frequent trading allows sustained profitability.

- Applicable to different products and timeframes.

## Risks

- Improper BB parameters fail to identify key levels.

- Bad RSI parameters generate false signals. 

- Insufficient retracement triggers stop loss.

- High trade frequency leads to larger slippage costs.

- Hard to ride trends in volatile markets.

## Risk Management

- Optimize parameters so BBs match actual volatility.

- Adjust RSI period to filter out noise.

- Use trailing stops to reduce profit givebacks.

- Select liquid products to minimize slippage impact. 

- Add other indicators to determine trend direction. 

## Summary

The BB RSI swing trading strategy effectively catches two-way price swings within ranges. With proper parameter tuning and risk management, it provides steady profits. This is a recommended short-term quant trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2020|From Year|
|v_input_4|true|To Day|
|v_input_5|true|To Month|
|v_input_6|2022|To Year|
|v_input_7|6|RSI Period Length|
|v_input_8|65|RSIoverSold|
|v_input_9|35|RSIoverBought|
|v_input_10|200|Bollinger Period Length|
|v_input_11|true|Enable Bar Color?|
|v_input_12|true|Enable Background Color?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-16 00:00:00
end: 2023-09-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Swing trading strategy FOREX ", shorttitle="BB+RSI", overlay=true)

////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE
 
// From Date Inputs
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2020, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2022, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true
// 
// 


///////////// RSI
RSIlength = input(6,title="RSI Period Length") 
RSIoverSold = input(defval = 65, title = "RSIoverSold", minval = 1, maxval = 100)
RSIoverBought = input(defval = 35, title = "RSIoverBought", minval = 1, maxval = 100)
price = close
vrsi = rsi(price, RSIlength)



///////////// Bollinger Bands
BBlength = input(200, minval=1,title="Bollinger Period Length")
BBmult = 2 // input(2.0, minval=0.001, maxval=50,title="Bollinger Bands Standard Deviation")
BBbasis = sma(price, BBlength)
BBdev = BBmult * stdev(price, BBlength)
BBupper = BBbasis + BBdev
BBlower = BBbasis - BBdev
source = close
buyEntry = crossover(source, BBlower)
sellEntry = crossunder(source, BBupper)
plot(BBbasis, color=color.aqua,title="Bollinger Bands SMA Basis Line")
p1 = plot(BBupper, color=color.silver,title="Bollinger Bands Upper Line")
p2 = plot(BBlower, color=color.silver,title="Bollinger Bands Lower Line")
fill(p1, p2)


///////////// Colors
switch1=input(true, title="Enable Bar Color?")
switch2=input(true, title="Enable Background Color?")
TrendColor = RSIoverBought and (price[1] > BBupper and price < BBupper) and BBbasis < BBbasis[1] ? color.red : RSIoverSold and (price[1] < BBlower and price > BBlower) and BBbasis > BBbasis[1] ? color.green : na
barcolor(switch1?TrendColor:na)
bgcolor(switch2?TrendColor:na,transp=50)


///////////// RSI + Bollinger Bands Strategy
//for buy
cond1=crossover(vrsi, RSIoverSold)
cond2=crossover(source, BBlower) 
//for sell
cond3=crossunder(vrsi, RSIoverBought)
cond4=crossunder(source, BBupper)
if (not na(vrsi))

    if (cond1 and cond2 and time_cond)
        strategy.entry("RSI_BB_LONG", strategy.long, stop=BBlower, comment="LONG",alert_message = "long")
    else
        strategy.cancel(id="RSI_BB_LONG")
        
    if (cond3 and cond4 and time_cond)
        strategy.entry("RSI_BB_SHORT", strategy.short, stop=BBupper,  comment="SHORT",alert_message = "short")
        //strategy.close("RSI_BB_LONG")

    else
        strategy.cancel(id="RSI_BB_SHORT")
        
//strategy.exit("closelong", "RSI_BB_LONG" , profit = close * 0.01 / syminfo.mintick, loss = close * 0.01 / syminfo.mintick, alert_message = "closelong")
//strategy.exit("closeshort", "RSI_BB_SHORT" , profit = close * 0.01 / syminfo.mintick, loss = close * 0.01 / syminfo.mintick, alert_message = "closeshort")


//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/426992

> Last Modified

2023-09-16 18:48:44
