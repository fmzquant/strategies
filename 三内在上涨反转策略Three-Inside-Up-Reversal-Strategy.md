
> Name

三内在上涨反转策略Three-Inside-Up-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10fc9d799add7abfc1e.png)

[trans]


## 概述

三内在上涨反转策略是一种通过识别特定的三根K线形态来实现低买高卖的反转交易策略。它由三根K线组成,第一根和第二根形成阳吞阴,第三根开盘价高于前一日收盘价,并且收盘价高于前两根K线的最高价。这种K线组合预示着短期跌势反转为涨势的可能,是进行反转操作的信号。

## 策略原理

该策略的关键判断条件有:

1. 第一根K线:阴线,开盘价高于收盘价

2. 第二根K线:阳线,收盘价高于开盘价,且收盘价低于上一根K线的开盘价

3. 第三根K线:阳线,开盘价高于上一根K线的收盘价,收盘价高于前两根K线的最高价

当检测到该信号时,我们做空头仓位,并设置止盈和止损条件。具体交易逻辑如下:

1. 检测到三内在上涨形态时,以该阳线的开盘价入场做空

2. 设置止盈条件:若价格上涨幅度达到输入的止盈点数,则结束交易,平掉空头仓位

3. 设置止损条件:若价格下跌幅度达到输入的止损点数,则结束交易,平掉空头仓位

4. 当价格达到止盈或止损点时,清空仓位,等待下一轮交易信号

通过这种方式,我们在判断到上涨反转信号时及时做空,在盈利达到预期或发生超出可控范围的损失时果断止盈止损,实现低买高卖的反转交易策略。

## 策略优势

- 捕捉反转点位,实现反转交易的目的

- 做空高点,做多低点,符合趋势交易逻辑

- 具有清晰的入场、止盈、止损机制

- 简单的三根K线形态,容易识别实现

- 可自定义止盈止损点数,控制风险

- 代码实现简洁清晰,易于理解和优化

综上,该策略具有捕捉反转,控制风险,简单可靠的特点,是一种实用和高效的短线反转交易策略。

## 策略风险

- 反转形态判断不准确,可能成为非反转信号

- 止盈止损点设定不当,可能过早止损或错过更大利润

- 策略期望频繁交易,存在过度交易风险

- 买卖点识别和仓位管理等方面仍有优化空间

- 需谨慎选股,该策略更适用于具有波动特征的股票

- 需考虑手续费和滑点成本对盈利的影响

- 需持续优化监控,及时应对市场变化

总体来说,通过优化参数设置,严格股票选取,持续监控等措施,可以控制该策略的交易风险。

## 优化方向

- 优化K线形态参数,提高识别准确率

- 优化止盈止损机制,实现更好的风险收益平衡

- 结合其他技术指标过滤信号,提高决策准确性

- 增加仓位管理机制,根据市场情况动态调整仓位

- 优化资金管理,达到更好的盈亏平衡

- 测试不同持仓时间,判断最佳持仓周期

- 优化代码结构,增加注释使策略更清晰

- 添加实盘模拟对比,检验策略有效性

- 调整股票池,测试策略行业和个股适应性

- 持续追踪策略表现,及时发现问题并调整策略

## 总结

三内在上涨反转策略通过识别三根特定K线形态,在判断到短期跌势反转信号时做空获得利润。策略具有清晰的交易逻辑、控制风险的止盈止损机制、易于实现和优化等优点,是一种可靠、实用的短线反转交易策略。但也存在一定的不确定性风险,需要通过参数优化、风险控制和持续跟踪优化来规避风险,在实盘中获得稳定的超额收益。

||


## Overview

The Three Inside Up reversal strategy is a reversal trading strategy that aims to buy low and sell high by identifying specific three-bar candlestick patterns. It consists of three bars where the first two form a bullish harami pattern and the third bar opens above the previous close and closes above the highs of the first two bars. This candlestick combination indicates a potential reversal from a downtrend to an uptrend and signals an opportunity to enter a reversal trade.

## Strategy Logic

The key conditions for this strategy are:

1. Bar 1: Bearish candle, open higher than close 

2. Bar 2: Bullish candle, close higher than open and lower than Bar 1 open

3. Bar 3: Bullish candle, open higher than Bar 2 close and close higher than highs of Bars 1 and 2

When this pattern is detected, we take a short position and set profit take and stop loss levels. The trading logic is as follows:

1. Enter short at the open of Bar 3 when Three Inside Up pattern is identified

2. Set profit target: Close trade and flatten position if price rises by the input number of profit points  

3. Set stop loss: Close trade and flatten if price declines by the input number of loss points

4. Clear position when target or stop is hit, await next signal

This allows us to quickly enter a short when an uptrend reversal signal is identified, and realize gains or limit losses using pre-defined profit and stop levels, implementing a low buy high sell reversal strategy.

## Advantages

- Captures reversal points for reversal trading

- Shorts tops and buys bottoms aligning with trends  

- Clear entry, profit take, and stop loss mechanics

- Simple 3-bar pattern, easy to identify and implement

- Customizable profit take and stop loss points to control risk

- Code is simple, clean, easy to understand and optimize

In summary, this strategy leverages pattern recognition, risk management, simplicity, and reliability making it an effective short-term reversal trading strategy.

## Risks

- Pattern may be misidentified, leading to false signals

- Inadequate profit take or stop loss levels could lead to premature exit or missed profits

- Frequent trading increases overtrading risk 

- Entry, position sizing, and management can be further optimized

- Careful stock selection required, better for volatile stocks

- Impact of commissions and slippage on profits

- Requires ongoing monitoring and tuning for changing markets

Proper parameter optimization, stock selection, monitoring and other measures can help control the risks.

## Enhancement Opportunities

- Optimize pattern parameters to improve accuracy

- Refine profit take and stop loss for better risk-reward

- Add filters using other indicators to improve signal reliability 

- Incorporate dynamic position sizing aligned to market conditions

- Optimize capital allocation for better profit balancing

- Test different holding periods to determine optimal duration

- Streamline code with comments for clarity

- Backtest versus live performance to validate efficacy

- Adjust stock universe and test sector and name fit

- Continuously track performance and tune as required

## Conclusion

The Three Inside Up Reversal strategy aims to profit from shorting tops when an uptrend reversal signal is identified based on a specific three-candlestick pattern. With clear logic, risk controls, ease of use, and optimization potential, it is a reliable and practical short-term reversal trading strategy. But uncertainties exist requiring ongoing optimizations, risk management, and monitoring to generate consistent excess returns in live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Take Profit pip|
|v_input_2|20|Stop Loss pip|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-29 00:00:00
end: 2023-10-29 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 12/02/2019
//    This is a three candlestick bullish reversal pattern consisting of a 
//    bullish harami pattern formed by the first 2 candlesticks then followed 
//    by up candlestick with a higher close than the prior candlestick.
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title = "Three Inside Up Backtest", overlay = true)
input_takeprofit = input(20, title="Take Profit pip", step=0.01)
input_stoploss = input(20, title="Stop Loss pip", step=0.01)
barcolor(open[2] > close[2] ? close[1] > open[1] ? close[1] <= open[2] ? close[2] <= open[1] ? close[1] - open[1] < open[2] - close[2] ? close > open ? close > close[1] ? open > open[1] ? close > open[2] ? yellow :na :na : na : na : na:na : na : na : na)
posprice = 0.0
pos = 0.0
barcolor(nz(pos[1], 0) == -1 ? red: nz(pos[1], 0) == 1 ? green : blue ) 
posprice := open[2] > close[2] ? close[1] > open[1] ? close[1] <= open[2] ? close[2] <= open[1] ? close[1] - open[1] < open[2] - close[2] ? close > open ? close > close[1] ? open > open[1] ? close > open[2]  ? close :nz(posprice[1], 0) :nz(posprice[1], 0) : nz(posprice[1], 0) : nz(posprice[1], 0) :nz(posprice[1], 0):nz(posprice[1], 0):nz(posprice[1], 0):nz(posprice[1], 0):nz(posprice[1], 0) 
pos := iff(posprice > 0, -1, 0)
if (pos == 0) 
    strategy.close_all()
if (pos == -1)
    strategy.entry("Short", strategy.short)
posprice := iff(low <= posprice - input_takeprofit and posprice > 0, 0 ,  nz(posprice, 0))
posprice := iff(high >= posprice + input_stoploss and posprice > 0, 0 ,  nz(posprice, 0))
```

> Detail

https://www.fmz.com/strategy/430583

> Last Modified

2023-10-30 15:36:07
