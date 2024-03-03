
> Name

底部跟随交易策略Bottom-Following-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

底部跟随交易策略是一个低风险、低收益的加密货币交易策略。它通过识别加密货币处于超卖状态的时候建立持仓,在价格重新回稳后平仓获利。这个策略适用于短线和中线交易,可以提供稳定的资金增长。

## 原理

这个策略主要依靠快速RSI指标判断加密货币是否处于超卖状态。当快速RSI低于10时,说明资产已经严重超卖。这时,如果交易量明显放大,价格已经触底回升,那么就是建立做多头仓的信号。 

一旦价格重新回稳,快速RSI回到中立区,做多头仓位就可以平仓套利了。为控制风险,可以事先设置好止损价位。

## 优势

- 该策略具有精准判断底部的能力,可以抓住反弹的最佳时机。

- 采用快速RSI指标,可以快速判断超卖超买状态。

- 只在显著底部附近建仓,有效控制风险。

- 利用止损来锁定利润,避免亏损扩大。

- 适用于大部分加密货币,灵活性强。

## 风险

- 如果判断错误,在非底部建仓,可能造成较大损失。

- 即使抓住底部,行情可能反弹不足,无法盈利。

- 停止损失设置过于宽松,可能造成较大亏损。

- 停止损失设置过于激进,可能过早止损。

- 交易量不足,无法在合适位置建立足够大的仓位。

## 应对风险的方法

- 采用多种指标确认底部,提高判断准确率。

- 分批建仓,降低单笔仓位占比。

- 根据波动范围合理设置止损距离。

- 抓住突破上行通道或重要压力位作为止盈依据。

- 选择交易量充足的交易对,确保可以获得足够流动性。

## 总结

底部跟随交易策略通过抓住加密货币的超卖底部,可以获得较低风险的资金增长。该策略运用快速RSI判断时点,并配合止损来控制风险。如果进行优化改进,有望获得更加稳定的收益。这是一个值得推荐的低风险加密货币交易策略。

||

## Overview

The bottom following trading strategy is a low-risk, low-return cryptocurrency trading strategy. It establishes long positions when cryptocurrencies are oversold and closes positions when prices recover. This strategy is suitable for short-term and medium-term trading and provides stable capital growth.

## Principles 

This strategy mainly uses the fast RSI indicator to determine if a cryptocurrency is oversold. When the fast RSI is below 10, it indicates the asset is severely oversold. At this point, if trading volume increases significantly and prices start to rebound from the bottom, it signals establishing long positions.

Once prices stabilize and the fast RSI returns to the neutral zone, long positions can be closed for profit. Stop-loss orders can be set beforehand to control risks.

## Advantages

- The strategy accurately identifies bottoms and catches ideal entry points.

- The fast RSI indicator quickly reveals oversold and overbought conditions. 

- Only long positions near significant bottoms, effectively controlling risks.

- Stop-loss locks in profits and avoids expanding losses.

- Applicable to most cryptocurrencies, high flexibility.

## Risks

- Incorrect judgment may lead to large losses if long positions are opened away from bottoms.

- Even with correct bottom picks, rebounds may be insufficient for profits. 

- Stop-loss set too wide may lead to large losses.

- Stop-loss set too tight may be triggered prematurely. 

- Insufficient trading volume prevents building large enough positions.

## Risk Management

- Use multiple indicators to improve accuracy of bottom confirmation.

- Scale in positions to lower allocation per entry.

- Set reasonable stop-loss distance based on volatility.

- Take profit when breaking above channels or resistance.

- Select liquid trading pairs to ensure sufficient liquidity.

## Summary

The bottom following strategy capitalizes on oversold bottoms of cryptocurrencies for low-risk capital growth. It utilizes fast RSI for timing and stop-loss for risk control. Further optimizations may lead to more consistent profits. It is a recommended low-risk crypto trading strategy worth considering.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-16 00:00:00
end: 2023-09-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Noro's CryptoBottom Strategy", shorttitle = "CryptoBottom str", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Fast RSI
src = close
fastup = rma(max(change(src), 0), 2)
fastdown = rma(-min(change(src), 0), 2)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

mac = sma(close, 10)
len = abs(close - mac)
sma = sma(len, 100)
max = max(open, close)
min = min(open, close)
up = close < open and len > sma * 3 and min < min[1] and fastrsi < 10 ? 1 : 0
//dn = close > open and len > sma * 3 and max > max[1] and fastrsi > 90 ? 1 : 0
plotarrow(up == 1 ? 1 : na, colorup = blue, colordown = blue)
//plotarrow(dn == 1 ? -1 : na, colorup = blue, colordown = blue)

sell = sma(close, 5)
dn = high > sell ? 1 : 0
plot(sell)

longCondition = up == 1
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = dn == 1
if (shortCondition)
    strategy.entry("Exit", strategy.short, 0)
```

> Detail

https://www.fmz.com/strategy/426990

> Last Modified

2023-09-16 18:37:44
