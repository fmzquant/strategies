
> Name

RSI进退市双向交易策略RSI-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略运用RSI指标判断市场趋势,在超买超卖区域发出交易信号,旨在捕捉市场的短线调整走势。它同时结合均线指标和止盈止损逻辑,对交易信号进行过滤,控制风险。

## 策略原理

1. 计算RSI(14)指标值,设置超买线为67,超卖线为44。

2. 当RSI上穿超买线时,发出卖出信号;当RSI下穿超卖线时,发出买入信号。

3. 叠加均线过滤,只有当收盘价低于昨日均价时,才会在RSI超买发出卖出信号;只有当收盘价高于昨日均价时,才会在RSI超卖发出买入信号。

4. 设置止盈止损逻辑。可选择固定点数止盈止损,或根据RSI值止盈。

## 优势分析

1. 利用RSI指标判断超买超卖,捕捉短线调整机会。

2. 结合均线进行过滤,避免在趋势行情中进行反向操作。

3. 设置止盈止损,控制单笔损失。

4. 可在趋势反转前夕捕捉反转机会。

## 风险及解决

1. RSI具有滞后性,可能出现背离导致虚假信号。解决方法是适当调整参数或与其他指标组合使用。

2. 固定止损点数可能过大或过小。可选择更为灵活的 trailing stop 动态止损。

3. 固定止盈可能过早止盈或止盈点数过小。可考虑根据RSI值或ATR止盈。

4. 无法有效过滤震荡趋势行情,可能导致频繁开仓和损失。可适当调整RSI参数或增加其他过滤条件。

## 优化方向

1. 测试不同周期参数的RSI指标效果。

2. 调整RSI的参数,测试不同的超买超卖线。

3. 尝试不同类型的移动平均线或其它过滤指标。

4. 测试固定止盈止损与动态止盈止损的效果。

5. 优化止盈止损的值,使之更符合市场波动规律。

6. 新增进场过滤条件,避免震荡行情开仓。

7. 考虑结合多个时间周期进行验证,提高信号质量。

## 总结

本策略利用RSI指标判断超买超卖状况,结合均线及止盈止损进行双向交易。可在短期内捕捉市场反转机会。经过参数优化和过滤条件补充,可进一步提高策略盈利效果并控制风险。此策略适合对短线变化敏感、追求高频率交易的投资者。

||

## Overview

This strategy uses the RSI indicator to judge market trends and generate trading signals when overbought or oversold conditions occur. It aims to capture short-term reversal moves in the market. It also incorporates moving averages and profit-taking/stop-loss logic to filter signals and control risks.

## Strategy Logic

1. Calculate 14-period RSI and set overbought line at 67 and oversold line at 44. 

2. When RSI crosses above overbought line, a sell signal is generated. When RSI crosses below oversold line, a buy signal is generated.

3. Add moving average filter. Sell signals only occur when close is below previous day's MA; Buy signals only occur when close is above previous day's MA.

4. Incorporate profit-taking and stop-loss logic. Either fixed points or RSI-based exits can be used.

## Advantage Analysis 

1. Captures short-term reversal opportunities using RSI overbought/oversold levels.

2. Moving average filter avoids trading against the trend. 

3. Profit-taking and stop-loss controls single trade loss.

4. Can catch trend reversal opportunities early.

## Risks and Solutions

1. RSI lag may cause false signals. Adjust parameters or combine with other indicators.

2. Fixed stop-loss may be too wide or too narrow. Consider trailing stop.

3. Fixed profit-taking may exit too early or target too small. Consider RSI or ATR based exits.

4. Fails to filter ranging markets, causing over-trading and losses. Adjust RSI parameters or add filters.

## Optimization Directions

1. Test RSI parameters on different timeframes.

2. Adjust overbought/oversold RSI levels. 

3. Try different moving averages or other filters.

4. Test fixed versus dynamic profit targets/stops.

5. Optimize profit/stop values to fit market volatility.

6. Add filters to avoid whipsaws in ranging markets.

7. Consider multiple timeframe confluence to improve signal quality.

## Summary

This strategy trades reversals using RSI combined with moving averages and profit-taking/stop-loss logic. It aims to capture short-term turns in the market. Further parameter optimization and additional filters can improve profitability while reducing risks. It suits investors who are sensitive to short-term moves and seek frequent trading.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|length|
|v_input_2|44|overSold|
|v_input_3|67|overBought|
|v_input_4|0.0576923077|AvgPrice - n|
|v_input_5|false|Тейк-профіт по RSI|
|v_input_6|73|RSI тейк по лонгу|
|v_input_7|44|RSI тейк по шорту|
|v_input_8|250|Маржа|
|v_input_9|3|Плече|
|v_input_10|false|Тейк-профіт|
|v_input_11|4500|Тейк-профіт у тіках|
|v_input_12|false|Стоп-лосс|
|v_input_13|false|Стоп-лосс у тіках|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//© профешинил хомячело
//@version = 4

strategy("RSI Strategy Professional Хомячело", overlay=false)
length = input( 14 )
overSold = input( 44 )
overBought = input( 67 )
price = open
rsi = rsi(price, length)
band1 = hline(overSold, "overSold12", color=#C0C0C0)
band0 = hline(overBought, "overBought12", color=#C0C0C0)
plot(rsi, "RSI", color=color.red)
fill(band1, band0, color=color.black, transp=90, title="Background")
src = close
a = sma(src, 1)
aaa = strategy.opentrades + 1

n = input(defval = 0.0576923077, title = "AvgPrice - n")
//n = 0.0576923077

buysignal = crossover(rsi, overSold) and (a < (strategy.position_avg_price - n) or strategy.opentrades == 0)
sellsignal = crossunder(rsi, overBought) and (a > (strategy.position_avg_price + n) or strategy.opentrades == 0)


// crossover(rsi, overSold)
// crossunder(rsi, overBought)
if (not na(rsi))
    if(buysignal)
        strategy.entry("LONG", strategy.long, comment = tostring(a) + "\n(" + tostring(aaa) + ")")
        n += 1000
    if(sellsignal)
        strategy.entry("SHORT", strategy.short, comment = tostring(a) + "\n(" + tostring(aaa) + ")")
        n += 1000

//лонги орні       
    if(rsi < 15 and strategy.opentrades != 5 and a < (strategy.position_avg_price - n))
        strategy.entry("LONG", strategy.long, comment = "ЙОБАНИЙ НАСРАВ ТА БЕРИ ЛОНГ НА ВСЬО ШО Є НАХУЙ\n" + tostring(a) + "\n(" + tostring(aaa) + "!!!)")
    if(rsi < 20 and strategy.opentrades != 5 and a < (strategy.position_avg_price - n))
        strategy.entry("LONG", strategy.long, comment = "ЛОНГ НА ВСЮ КОТЛЄТУ\n" + tostring(a) + "\n(" + tostring(aaa) + "!!!)")
//шорти орні
    if(rsi > 85 and strategy.opentrades != 5 and a < (strategy.position_avg_price - n))
        strategy.entry("SHORT", strategy.short, comment = "ЙОБАНИЙ НАСРАВ ТА БЕРИ ШОРТ НА ВСЬО ШО Є НАХУЙ\n" + tostring(a) + "\n(" + tostring(aaa) + "!!!)")
    if(rsi > 80 and strategy.opentrades != 5 and a < (strategy.position_avg_price - n))
        strategy.entry("SHORT", strategy.short, comment = "ШОРТ НА ВСЮ КОТЛЄТУ\n" + tostring(a) + "\n(" + tostring(aaa) + "!!!)")


//стоп-лосс і ціль

//rsi
rsion = input(defval = false, title = "Тейк-профіт по RSI")
rcl = input(defval = 73.0, title = "RSI тейк по лонгу")
rcs = input(defval = 44.0, title = "RSI тейк по шорту")
possize = input(defval = 250.0, title = "Маржа")
posp = input(defval = 3.0, title = "Плече")

//tick
ut = input(defval = false, title = "Тейк-профіт")
tar = input(defval = 4500.0, title = "Тейк-профіт у тіках")
us = input(defval = false, title = "Стоп-лосс")
stop = input(defval = 0.0, title = "Стоп-лосс у тіках")
tar:=tar/syminfo.mintick
stop:=stop/syminfo.mintick

if(ut==true and us==false)
    strategy.exit(id="LX", from_entry = "LONG", profit = tar, comment = "ТейкL")
    strategy.exit(id="SX", from_entry = "SHORT", profit = tar, comment = "ТейкS")
if(us==true and ut==false)
    strategy.exit(id="LX", from_entry = "LONG", loss = stop, comment = "СтопL")
    strategy.exit(id="SX", from_entry = "SHORT", loss = stop, comment = "СтопS")
    
if(ut==true and us==true)
    strategy.exit(id="LX", from_entry = "LONG", profit = tar, loss = stop, comment ="Тейк/СтопL")
    strategy.exit(id="SX", from_entry = "SHORT", profit = tar, loss = stop, comment ="Тейк/СтопS")
    
//закриття по rsi
if(rsion == 1 )
    pr = round(((a / strategy.position_avg_price - 1) * possize * posp), 2)
    ppr = round(((a / strategy.position_avg_price - 1) * 100 * posp), 2)
    spr = round((1 - (a / strategy.position_avg_price)) * possize * posp, 2)
    sppr = round((100 - (a / strategy.position_avg_price * 100)) * posp, 2)
    
    if(rsi > rcl)
        strategy.close(id="LONG", comment = "LT\n" + tostring(ppr) + "%\n" + tostring(pr) + "$\n" + tostring(a))
    if(rsi < rcs)
        strategy.close(id="SHORT", comment = "ST\n" + tostring(sppr) + "%\n" + tostring(spr) + "$\n" + tostring(a))
```

> Detail

https://www.fmz.com/strategy/428101

> Last Modified

2023-09-28 16:09:39
