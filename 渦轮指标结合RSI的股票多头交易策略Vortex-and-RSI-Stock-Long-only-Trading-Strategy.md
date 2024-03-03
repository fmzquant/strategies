
> Name

渦轮指标结合RSI的股票多头交易策略Vortex-and-RSI-Stock-Long-only-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略运用渦轮指标判断市场趋势方向,识别多头机会,同时利用RSI指标作为过滤器,结合止损止盈管理,构建一个较为完整的股票多头交易策略系统。该策略可以有效识别股票上涨趋势,并可自定义参数进行优化。

## 策略原理

1. 计算渦轮指标的正向指标VIP和负向指标VIM。

2. 当VIP上穿VIM,并且收盘价高于前一日的最高价时,判断为买入信号。

3. 计算RSI指标值。当RSI指标下穿70时,判断为卖出信号。

4. 当VIM下穿VIP,并且收盘价低于前一日的最低价时,也判断为卖出信号。

5. 设置止损止盈规则:止损幅度为初始资金的stop_loss%,止盈幅度为初始资金的Target_profit%。

渦轮指标可有效判断多头和空头趋势,结合RSI指标避免过热的风险,再配合止损止盈管理,使整个交易系统较为稳健完整。

## 策略优势分析

1. 渦轮指标判断趋势方向准确,信号明确。

2. RSI指标可有效避免过热风险,防止追高。

3. 动态止损止盈设置了明确的风险回报比。

4. 可根据市场调整止损止盈参数,适应性强。

5. 策略信号规则简单清晰,易于实施。

6. 可扩展至其他指标,优化空间大。

## 风险分析

1. 渦轮指标存在滞后,可能错过机会。

2. 止损幅度过小可能被套住。

3. 止盈幅度过大可能限制收益。

4. RSI过度依赖容易形成死叉。

5. 未考虑交易费用的影响。

6. 未设置仓位管理模块。

## 策略优化方向

1. 测试优化渦轮指标和RSI的参数。

2. 尝试其他类似OBV等指标代替或结合渦轮指标。 

3. 优化止损止盈策略,如移动止损、缩量止损等。

4. 增加仓位管理模块,限制单笔亏损。

5. 考虑结合更多指标,如KD、MACD等判断入场时机。

6. 利用机器学习算法寻找更优参数。

7. 增加基本面因素,提高策略胜率。

## 总结

本策略整合渦轮指标的趋势判断与RSI指标的过热控制,形成一个较为稳定的股票多头交易策略。止损止盈设置也使风险收益可控。通过进一步优化参数以及新增模块,可以使策略更加稳健,适用于实盘。该策略有较强的趋势跟踪能力和扩展空间,适合积极股民使用。

|| 

## Overview 

This strategy uses the Vortex indicator to determine market trend direction and identify long opportunities. It adds RSI filter and stop loss/take profit management to build a more complete stock long-only trading system. It can effectively identify uptrends and allows parameter customization.

## Strategy Logic

1. Calculate the positive VIP and negative VIM of Vortex indicator. 

2. When VIP crosses above VIM, and close is higher than previous high, a buy signal is generated.

3. Calculate RSI values. When RSI crosses below 70, a sell signal is generated.

4. When VIM crosses below VIP, and close is lower than previous low, a sell signal is also triggered.

5. Set stop loss at stop_loss% of initial capital, and take profit at Target_profit% of initial capital.

Vortex indicator judges bullish/bearish trends well. Adding RSI prevents overheating risks. Stop loss/take profit adds robustness.

## Advantage Analysis

1. Vortex accurately identifies trends with clear signals.

2. RSI avoids overheating risks and chasing tops.

3. Dynamic stops set predefined risk/reward ratio.

4. Adjustable stops fit different market environments.

5. Simple clear rules, easy to implement.

6. Expandable with other indicators.

## Risk Analysis

1. Vortex has lagging effect, may miss opportunities. 

2. Stop loss too small may cause whipsaws.

3. Take profit too large may limit profits.

4. RSI over-reliance causes failures.

5. Trading costs not considered.

6. No position sizing rules.

## Optimization Directions

1. Test and optimize parameters for Vortex and RSI.

2. Try combining Vortex with OBV etc.

3. Enhance stop loss strategies like trailing stop, chandelier exit etc.

4. Add position sizing module to limit single trade loss.

5. Consider more filters like KD, MACD for entry timing.

6. Utilize machine learning for better parameter optimization. 

7. Add fundamental factors to improve win rate.

## Conclusion

This strategy integrates Vortex for trend and RSI for overheating control into a stable long-only stock system. The stop loss/take profit settings also keep risk manageable. Further improvements in parameter tuning and new modules can make it more robust for live trading. With strong trend following capacity and expandability, this strategy suits active investors well.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|vortex period|
|v_input_2|14|RSI period|
|v_input_3|7|Stop loss %|
|v_input_4|16|Target Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by Sauciusfinance 
////////////////////////////////////////////////////////////
strategy(title="Vortex and RSI ts 2020",calc_on_order_fills=true,calc_on_every_tick =true, initial_capital=20000,commission_value=.25,overlay = true,default_qty_type = strategy.cash, default_qty_value = 20000)
//inputs////////////////////////
n = input(title="vortex period",type=input.integer, defval = 14)
m = input(title = "RSI period", type=input.integer, defval = 14)
// CALCULATIONS *** ///////
VMP = sum( abs( high - low[1]), n )
VMM = sum( abs( low - high[1]), n )
STR = sum( atr(1), n )
VIP = VMP / STR
VIM = VMM / STR
// bring the lines in the panel below, add another panel with RSI
plot(VIP, title="VI +", color=#311B92)
plot(VIM, title="VI -", color=#FF006E)

// RSI on total price, always
totalprice = (high + low+close + open)/4
myrsi = rsi(m, totalprice)
strategy.initial_capital = 50000
//// TRADING SYSTEM CODE //// 
entryl = crossover(VIP, VIM) and close >= high[1] 
strategy.entry("Long", true, when=entryl, comment = "Go!")
exit1 = crossover(VIM, VIP) and close <= low[1]
strategy.close("Long", when=exit1, comment = "Vortex down")
exit2 = crossunder(myrsi, 70)
strategy.close("Long", when=exit2, comment = "RSI down")
//money management
stop_loss=input(7, "Stop loss %", minval = 1, step = 1)
sl = -1*stop_loss/100*strategy.initial_capital
close_Stop = strategy.openprofit < sl
strategy.close("Long", when = close_Stop)
Target_profit=input(16, "Target Profit %", minval = 1, step = 1)
tp = Target_profit/100*strategy.initial_capital
close_Target = strategy.openprofit > tp
strategy.close("Long", when = close_Target)


```

> Detail

https://www.fmz.com/strategy/427311

> Last Modified

2023-09-19 22:01:09
