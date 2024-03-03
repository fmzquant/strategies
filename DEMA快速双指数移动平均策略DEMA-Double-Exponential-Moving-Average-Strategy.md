
> Name

DEMA快速双指数移动平均策略DEMA-Double-Exponential-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

DEMA快速双指数移动平均策略是基于DEMA(双指数移动平均线)的短线交易策略。该策略融合了移动平均线的平滑性以及EMA的快速响应优势,旨在利用DEMA线的交叉来捕捉短线价格趋势,实现盈利。

## 策略原理

该策略主要依靠DEMA快线和DEMA慢线的金叉和死叉来判断买入和卖出信号。

具体来说,快线的计算公式是:

`demaFast = 2 * ema(close, fastPeriod) - ema(ema(close, fastPeriod), fastPeriod)`

慢线的计算公式是: 

`demaSlow = 2 * ema(close, slowPeriod) - ema(ema(close, slowPeriod), slowPeriod)`

其中,fastPeriod和slowPeriod分别代表快线和慢线的参数周期。

当快线上穿慢线时产生买入信号,当快线下穿慢线时产生卖出信号。

```python
buy = crossover(demaSlow, demaFast)  
sell = crossunder(demaSlow, demaFast)
```

该策略根据DEMA线的交叉情况来确定具体的交易方向。

## 优势分析

相比传统移动平均线,DEMA线更加灵敏,能够对价格变化做出更快的反应。这使得该策略可以捕捉更多短线交易机会。

另外,DEMA线同时结合了移动平均线的平滑特点,可以过滤掉部分市场噪音,避免产生错误信号。

此外,该策略采用快慢线组合,可以在一定程度上避免虚拟交叉。快线与慢线参数设置不同,交叉信号更加可靠。

所以,DEMA快速双指数移动平均策略整体来说具有响应速度快、过滤噪音、信号稳定可靠的优点。

## 风险分析

尽管DEMA线较EMA线更稳定,但仍可能出现虚拟交叉的风险,产生错误信号。针对此点,可以适当调整快慢线周期参数,确保快线足够灵敏,慢线足够稳定。

另外,作为短线交易策略,它对交易成本较为敏感。如果交易频次过高或每次交易量设置过小,交易成本可能会对盈利造成一定影响。所以要合理设置交易参数,控制成本。 

最后,任何技术指标策略都无法完全避免止损情况发生,需要搭配合理的资金管理来控制风险。

## 优化方向

该策略仍有可优化的空间:

1. 可以测试不同周期参数的组合,寻找最佳参数组合。

2. 可以加入其他技术指标来确认交易信号,例如RSI等,避免错误信号的发生。

3. 可以针对止损情况进行优化。例如设定移动止损来锁定利润等。

4. 可以优化资金管理策略,例如根据账户资金调整交易量或引入波动性调整仓位等措施。

## 总结

DEMA快速双指数移动平均策略整体来说是一种较为稳定的短线交易策略。它响应速度快,同时也具有一定的平滑过滤能力。相比SMA等指标,该策略可以捕捉更多短线机会。通过参数优化以及配套措施,可以进一步提高策略earnings稳定性和profitability。总体来说,该策略适合对高频短线交易有需求的投资者。


|| 


## Overview

The DEMA double exponential moving average strategy is a short-term trading strategy based on the DEMA (Double Exponential Moving Average). It combines the smoothness of moving averages and the fast response of EMAs, aiming to capture short-term price trends and generate profits by trading on DEMA crossovers.

## Strategy Logic

The strategy mainly relies on golden crosses and death crosses between the DEMA fast line and DEMA slow line to determine buy and sell signals. 

Specifically, the fast line is calculated as:

`demaFast = 2 * ema(close, fastPeriod) - ema(ema(close, fastPeriod), fastPeriod)`

And the slow line is:

`demaSlow = 2 * ema(close, slowPeriod) - ema(ema(close, slowPeriod), slowPeriod)`

Where fastPeriod and slowPeriod represent the periods of the fast and slow line respectively.

When the fast line crosses above the slow line, a buy signal is generated. When the fast line crosses below the slow line, a sell signal is generated.

```python
buy = crossover(demaSlow, demaFast)
sell = crossunder(demaSlow, demaFast) 
```

The strategy determines the trading direction based on DEMA line crossovers.

## Advantage Analysis

Compared to traditional moving averages, DEMA lines are more sensitive and can react to price changes faster. This allows the strategy to capture more short-term trading opportunities.

Also, DEMA lines incorporate the smoothness of moving averages, which helps filter out some market noise and avoid false signals.

In addition, the fast and slow line combo avoids false crossovers to some extent. With different parameter settings, crossovers are more reliable.

In summary, the DEMA double exponential moving average strategy has the advantages of fast response, noise filtering, and stable reliable signals.

## Risk Analysis

Although more stable than EMAs, DEMA lines can still suffer from false crossovers, generating incorrect signals. This can be addressed by fine tuning the period parameters of the fast and slow line to ensure enough sensitivity and stability.

Also, as a short-term strategy, it is sensitive to trading costs. High trading frequency or small trade sizing may erode profits. Reasonable trade parameters should be set to control costs.

Lastly, no technical indicator strategy can completely avoid stop loss. Proper risk management should be implemented to limit downside. 

## Optimization Directions 

There are still rooms for optimization:

1. Test different period combinations to find the optimal parameters.

2. Incorporate other indicators like RSI to confirm signals and avoid false signals. 

3. Optimize stop loss mechanisms, like trailing stop loss to lock in profits.

4. Optimize capital management, like position sizing based on account size, or volatility adjusted sizing.

## Conclusion

The DEMA double exponential moving average strategy is overall a stable short-term trading strategy. It has fast response and smoothing capabilities. Compared to SMAs, it can capture more short-term opportunities. With parameter tuning and proper mechanisms, the strategy's profitability and stability can be further improved. It suits investors who desire high-frequency short-term trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|32|DEMA FAST Period|
|v_input_2|2|DEMA SLOW Period|
|v_input_3|120|Resolution  - not lower than chart|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-19 00:00:00
end: 2023-09-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

strategy(title = "DEMA Strategy", shorttitle = "DEMA Strategy",initial_capital=1000, commission_value=0.2, commission_type =strategy.commission.percent, default_qty_value=100 , overlay = false, pyramiding=10, default_qty_type=strategy.percent_of_equity)
//@Moneros 2017
//Based on The DEMA is a fast-acting moving average that is more responsive to market changes than a traditional moving average
// !!!!  IN ORDER TO AVOID REPAITING ISSUES !!!!
// !!!!  DO NOT VIEW IN LOWER RESOLUTIONS THAN res/2 PARAMETER  !!!!
// for example res = 120 view >= 60m  res = 60 view >= 30m
// the length of the DEMA sampling shouldn't be longer than a candle 



// Best profits tested on BTCUSD
//res = 105 slowPeriod = 2 fastPeriod = 32
//res = 125 slowPeriod = 3 fastPeriod = 21
//res = 120 slowPeriod = 2 fastPeriod = 32 
//res = 130 slowPeriod = 1 fastPeriod = 24 
//res = 40 slowPeriod = 4 fastPeriod = 93 
//res = 60 slowPeriod = 1 fastPeriod = 67 

fastPeriod    = input(defval = 32, title = "DEMA FAST Period", minval = 2)
slowPeriod = input(defval = 2, title = "DEMA SLOW Period", minval = 1)
res = input(title="Resolution  - not lower than chart", defval="120")


demaFast =  request.security(syminfo.tickerid, res, 2 * ta.ema(close, fastPeriod) - ta.ema(ta.ema(close, fastPeriod), fastPeriod)  )
demaSlow  = request.security(syminfo.tickerid,res, 2 * ta.ema(close, slowPeriod) - ta.ema(ta.ema(close, slowPeriod), slowPeriod)  )



plot(demaFast,color=color.red)
plot(demaSlow,color=color.lime)

buy = ta.crossover(demaSlow, demaFast)
sell = ta.crossunder(demaSlow, demaFast)


// value [1] for avoid repaiting bottom bars
bgcolor( buy[1] ? color.lime : na, transp=0)
bgcolor( sell[1] ? color.red : na, transp=0)


strategy.entry("BUY", strategy.long, 1, when = buy)
strategy.entry("SELL", strategy.short, 1, when = sell ) 



```

> Detail

https://www.fmz.com/strategy/427926

> Last Modified

2023-09-26 20:28:11
