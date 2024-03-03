
> Name

主轴支撑反转指标交易策略Pivot-Support-Reversal-Indicator-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略原理

该策略结合主轴支撑反转指标和支撑阻力位来实现趋势跟踪和获利回撤。

具体规则是:

1. 当主轴支撑反转指标产生买入信号时,在该点长入场

2. 首先在R1位 Partial 获利25%头寸 

3. 再在R2位 Partial 获利25%头寸

4. 使用移动止损,止损线为14周期平均线减去3倍ATR

主轴支撑反转指标综合CMO、布林带、交易量等多因素,形成强烈的趋势信号。支撑阻力位作为获利目标又兼具趋势跟踪功能。该策略的优点在于获利回撤机制的设定,可以在保证盈利的同时严格控制风险。

## 策略优势

- 主轴支撑指标组合多因素,识别高概率机会

- 支撑阻力位既为获利目标又具追踪功能 

- 分阶段获利结合移动止损,保证收益并控制风险

## 策略风险

- 主轴支撑指标参数需要优化调整

- 支撑阻力位有时会被突破

- 部分获利后会面临剩余头寸的风险

## 总结

该策略充分利用主轴支撑指标的组合信号,并使用支撑阻力位作为动态获利目标,通过分批获利止损来锁定利润并严格控制风险,是一种务实可行的交易策略。

[trans]

||

## Strategy Logic

This strategy combines the Pivot Support Reversal indicator with support/resistance levels to track trends and manage profit/drawdown. 

The rules are:

1. Go long when the PSR indicator generates a buy signal

2. Take 25% partial profit at R1 

3. Take another 25% partial profit at R2

4. Use a moving stop loss below the 14-period moving average minus 3xATR

The PSR indicator synthesizes CMO, Bollinger Bands, volume and more into high-probability signals. Pivot points act as profit targets while having trend-following ability. The strategy's strength lies in its staged profit taking and disciplined stop loss to lock in profits while tightly controlling risk.

## Advantages 

- PSR combines multiple factors for high-quality signals

- Pivots act as profit targets and tracking tools

- Staged profit taking and trailing stop protects profits and manages risk

## Risks

- PSR parameters need optimization 

- Pivots can sometimes be breached

- Risk remains for residual position after partial profits

## Summary

This strategy capitalizes on the PSR indicator's syndicated signals and uses pivots as dynamic profit targets. By taking profits in batches and cutting losses fast, it aims to pragmatically book profits while tightly controlling risk.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-13 00:00:00
period: 3d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ParaBellum68

//@version=4
strategy(title="SOJA PIVOT", shorttitle="SOJA PIVOT")
soja = ((cmo(close,5) > 25) and (cmo(close,5) < 70) and (close> close[1]) and (bbw(close,50,1) < 0.6) and (sum(volume,5)> 250000) and (obv[5]>15))
TP = 2.1 * hlc3[1]- high[1]
TP2 = TP + high[1] - low[1]
SL = avg(close,14) - 3*atr(14)
strategy.entry("buy", true, 1, when = soja == 1)
strategy.close("buy", when = close > TP)
strategy.close("buy", when = close > TP2)
strategy.exit("stop", "exit", when = close < SL)





```

> Detail

https://www.fmz.com/strategy/426785

> Last Modified

2023-09-14 15:49:31
