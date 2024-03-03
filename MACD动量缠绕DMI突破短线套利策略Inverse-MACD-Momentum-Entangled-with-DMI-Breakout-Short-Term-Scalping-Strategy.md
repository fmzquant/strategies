
> Name

MACD动量缠绕DMI突破短线套利策略Inverse-MACD-Momentum-Entangled-with-DMI-Breakout-Short-Term-Scalping-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10f9c64555169d84b4b.png)
[trans]


## 概述

该策略集中于熊市行情下的短线做空,利用两个力度型指标来提供合力确认短期下跌趋势已经开始的讯号-尽快抓住做空机会。

这套策略适用于您计划长期持有的币,并且表现尤其出色,同时使用自动交易机器人来执行您的交易。它允许您通过分配您持有币的一定百分比进行交易的方式来对冲您的投资,而又不会冒险您的全部持仓。这可以减轻持有币造成的未实现损失,因为它可从获利中获得额外现金。然后,您可以选择持有这笔现金,或者在市场达到有吸引力的买入水平时用它进行再投资。

另一方面,如果您在期货市场交易合约,则可以在无需先拥有基础资产的情况下直接做空。

## 策略原理

该交易系统使用MACD动量指标和DMI趋向指标来确认最佳卖出时机。将这两个指标结合可以避免在上涨趋势中交易,并降低陷入低波动市场的可能性。

MACD是一种趋势跟踪动量指标,可识别短期趋势方向。在此变体中,它使用12周期作为快速和26周期作为慢速长度EMA,同时信号平滑度设置为9。

DMI指示价格的趋势方向,并比较先前的低点和高点,之间画出两条线——正向运动线(+DI)和负向运动线(-DI)。可以通过比较两条线及哪条线更大来解释趋势。当负向DMI大于正向DMI时,资产有更大可能性处于持续下跌趋势,反之亦然。

当满足两项条件时,系统将进入交易:

1. MACD直方图转为看跌。 

2. 负向DMI大于正向DMI。

该策略带有固定止盈,结合波动率止损,充当追踪止损以适应趋势强度。根据您对资产的长期信心,可以编辑固定止盈以使其更保守或更积极。

当满足以下情况时,平仓头寸:

止盈平仓:+8%的入场价格下跌。

或

止损平仓:价格突破波动率止损。

总的来说,这种方法适用于中长期策略。该策略的回测从2022年4月1日至2022年7月18日开始,以证明其在熊市中的效果。从2022年初进一步回测也产生了良好的回报。

在45分钟时间周期的SOLUSDT,2小时时间周期的MATICUSDT和1小时时间周期的AVAUSDT等对组合中表现尤为出色。总体来说,回测表明它在大多数对组合的45分钟/1小时时间周期效果最好。

交易费用也考虑在内,与币安的基础费用0.1%对齐。

## 优势分析

该策略具有以下优势:

- 利用MACD和DMI两个指标的优势,提高进入信号的准确性,避免假突破。

- 采用固定止盈和波动率追踪止损结合的出场机制,既确保了较高的止盈,又控制了风险。

- 适用于熊市下跌阶段,能获得较高的短线套利收益。

- 可以用来对冲长线持仓,获得额外收入。也可以直接做空合约进行套利。

- 回测表现出色,特别是在1小时和45分钟周期效果好,适合高频交易。

## 风险分析

该策略也存在以下风险:

- DMI和MACD作为跟踪指标,在趋势转折点产生错误信号的概率较大,需要关注止损。

- 固定止盈设置不当可能导致止盈过小或过大。建议根据不同币种的波动率进行调整。

- 波动率追踪止损在剧烈波动时期可能被突破,需要 Combine With Additional Stop Loss 。

- 回测时间段选择不当可能导致过于乐观的结果。应更长时间回测,也测试不同市场阶段。

- 实盘效果会受交易费用、市价单成交滑点等因素影响,与回测有差异。

## 优化方向  

该策略可以从以下方面进行进一步优化:

- 利用机器学习方法自动优化MACD和DMI的参数组合,适应不同周期和币种。

- 增加基于波动率的动态止盈,根据市场波动性调整止盈幅度。

- 增加其他指标判断,形成多因子模型,提高过滤效果。比如BVN及OBV指标。

- 增加机器学习模型判断趋势,辅助MACD和DMI发出信号。

- 使用限价单替代市价单,以减少成交滑点的影响。

- 对不同币种分别测试,寻找最优周期参数组合。

## 总结

综上所述,该短线熊市套利策略通过MACD和DMI的强力组合判断做空时机,实现了较高的定量收益。它既可以用来对冲长线仓位,也可以直接对期货合约进行做空套利。优化停损策略和参数调整可进一步提高胜率。该策略值得熊市交易者进行积极运用和优化。

|| 

## Overview

This strategy focuses on shorting during bear market conditions by utilizing two strength-based indicators to provide confluence that the start of a short-term downtrend has occurred - catching the shorting opportunity as soon as possible.

The strategy works well on coins you plan to hodl long-term and performs especially well whilst using an automated trading bot that can execute trades for you. It allows you to hedge your investment by allocating a percentage of your coins to trade with, without risking your entire holding. This mitigates unrealized losses from hodling as it provides additional cash from the profits made. You can then choose to hodl this cash, or use it to reinvest when the market reaches attractive buying levels. 

Alternatively, you can use this when trading contracts on futures markets where there is no need to already own the underlying asset prior to shorting it.

## Strategy Logic

The trading system uses the Momentum Average Convergence Divergence (MACD) indicator and the Directional Movement Index (DMI) indicator to confirm when the best time is for selling. Combining these two indicators prevents trading during uptrends and reduces the likelihood of getting stuck in a market with low volatility.

The MACD is a trend following momentum indicator and provides identification of short-term trend direction. In this variation it utilizes the 12-period as the fast and 26-period as the slow length EMAs, with signal smoothing set at 9.

The DMI indicates what way price is trending and compares prior lows and highs with two lines drawn between each - the positive directional movement line (+DI) and the negative directional movement line (-DI). The trend can be interpreted by comparing the two lines and what line is greater. When the negative DMI is greater than the positive DMI, there are more chances that the asset is trading in a sustained downtrend, and vice versa.

The system will enter trades when two conditions are met:

1) The MACD histogram turns bearish. 

2) When the negative DMI is greater than the positive DMI.

The strategy comes with a fixed take profit combined with a volatility stop, which acts as a trailing stop to adapt to the trend's strength. Depending on your long-term confidence in the asset, you can edit the fixed take profit to be more conservative or aggressive.

The position is closed when:

Take-Profit Exit: +8% price decrease from entry price.

OR

Stop-Loss Exit: Price crosses above the volatility stop.

In general, this approach suits medium to long term strategies. The backtesting for this strategy begins on 1 April 2022 to 18 July 2022 in order to demonstrate its results in a bear market. Back testing it further from the beginning of 2022 onwards further also produces good returns.

Pairs that produce very strong results include SOLUSDT on the 45m timeframe, MATICUSDT on the 2h timeframe, and AVAUSDT on the 1h timeframe. Generally, the back testing suggests that it works best on the 45m/1h timeframe across most pairs. 

A trading fee of 0.1% is also taken into account and is aligned to the base fee applied on Binance.

## Advantage Analysis

The advantages of this strategy include:

- Utilizes the strengths of both MACD and DMI indicators to improve the accuracy of entry signals and avoid false breakouts.

- Employs a combination of fixed take profit and volatility trailing stop exit mechanisms to ensure higher take profits while controlling risk.

- Suitable for bear market downtrends to capture substantial short-term scalping profits. 

- Can be used to hedge long positions to gain additional income. Or directly short futures contracts for scalping.

- Strong backtest results, especially on 1h and 45m timeframes suitable for high frequency trading.

## Risk Analysis

The risks of this strategy include:

- DMI and MACD as lagging indicators have a higher probability of generating erroneous signals around trend turning points, requiring stop loss monitoring.

- Improper fixed take profit settings may result in take profits being too small or too large. Adjustments based on different coin volatility is recommended.

- Volatility trailing stops can be broken during periods of violent swings, requiring combination with additional stop loss. 

- Improper backtest time period selection may lead to overly optimistic results. Longer testing across different market conditions should be done.

- Real-world performance will be impacted by trading fees, market order slippage etc leading to deviations from backtest.

## Optimization Directions

This strategy can be further optimized in the following aspects:

- Utilize machine learning to auto optimize MACD and DMI parameter combinations, adapted to different timeframes and coins.

- Add volatility based dynamic take profits, adjusting take profit range based on market volatility.

- Incorporate additional indicators, forming a multi-factor model to improve filtering. Such as BVN and OBV.

- Add machine learning models to aid MACD and DMI in signaling. 

- Use limit orders instead of market orders to reduce slippage impact.

- Test on individual coins to find optimal timeframe parameters.

## Conclusion

In summary, this short-term bear scalping strategy provides substantial quantitative profits by identifying optimal shorting moments through the powerful MACD and DMI combination. It can be used to hedge long positions and directly short futures contracts. Optimizing stops and tuning parameters can further improve win rate. The strategy merits active application and optimization by bear market traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show Date Range|
|v_input_2|3|Take_profit|
|v_input_int_1|20|Length|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|vStop Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-13 00:00:00
end: 2023-11-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Inverse MACD + DMI Scalping with Volatility Stop (Shorting) (By Coinrule)",

         overlay=true,
         initial_capital=10000,
         process_orders_on_close=true,
         default_qty_type=strategy.percent_of_equity,
         default_qty_value=100,
         commission_type=strategy.commission.percent,
         commission_value=0.1)

showDate = input(defval=true, title='Show Date Range')
timePeriod = time >= timestamp(syminfo.timezone, 2022, 4, 1, 0, 0)
notInTrade = strategy.position_size <= 0

// DMI and MACD inputs and calculations
[pos_dm, neg_dm, avg_dm] = ta.dmi(14, 14)
[macd, macd_signal, macd_histogram] = ta.macd(close, 12, 26, 9)

Take_profit = input(3) / 100
longTakeProfit = strategy.position_avg_price * (1 + Take_profit)

length = input.int(20, 'Length', minval=2)
src = input(close, 'Source')
factor = input.float(2.0, 'vStop Multiplier', minval=0.25, step=0.25)
volStop(src, atrlen, atrfactor) =>
    var max = src
    var min = src
    var uptrend = true
    var stop = 0.0
    atrM = nz(ta.atr(atrlen) * atrfactor, ta.tr)
    max := math.max(max, src)
    min := math.min(min, src)
    stop := nz(uptrend ? math.max(stop, max - atrM) : math.min(stop, min + atrM), src)
    uptrend := src - stop >= 0.0
    if uptrend != nz(uptrend[1], true)
        max := src
        min := src
        stop := uptrend ? max - atrM : min + atrM
        stop
    [stop, uptrend]
    
[vStop, uptrend] = volStop(src, length, factor)

closeShort = close > longTakeProfit or ta.crossunder(close, vStop)

//Entry
strategy.entry(id='short', direction=strategy.short, when=ta.crossover(macd_signal, macd) and pos_dm < neg_dm and timePeriod)

//Exit
strategy.close('short', when=closeShort and timePeriod)

```

> Detail

https://www.fmz.com/strategy/431968

> Last Modified

2023-11-13 17:42:23
