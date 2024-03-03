
> Name

固定份额交易策略Fixed-Fraction-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略的核心思想是投资人始终保持资产中某一资产的投资份额固定不变。当资产价值上涨时,投资人会卖出部分以维持投资份额;当资产价值下跌时,投资人会买入以补充投资份额。该策略适用于相对稳定的资产。

## 策略原理

该策略首先需要设置投资份额参数percent_invested,即投资组合中占据的资产份额。然后根据以下逻辑调整仓位:

1. 当仓位为0时,根据设定的投资份额percent_invested和初始资金initial_capital计算需要买入的合约数。

2. 持仓时,比较已投资金额与账户总权益的比例invested和设定的投资份额percent_invested。如果已投资金额比例过低,则买入合约以补充投资份额;如果已投资金额比例过高,则卖出合约以维持投资份额。

3. Repeat步骤2,使投资份额维持在固定水平。

## 策略优势 

- 可以对相对稳定的资产进行长期持有,无需频繁交易。

- 定期调整仓位,从资产波动中获利。

- 可以分散投资多个非相关资产,降低投资组合风险。

- 可以防止全仓亏损,避免在泡沫破裂时损失全部投资。

## 风险分析

- 对波动较大的资产,亏损风险较大。

- 需要频繁交易支付手续费。

- 仓位调整可能存在时间滞后,错过最佳买卖点位。

- 百分比设置不恰当可能导致过度交易。

可从以下方面降低风险:

1. 谨慎选择资产,避免高波动资产。

2. 优化仓位调整逻辑,降低交易频率。

3. 设置仓位变动最小单位,避免过度交易。 

4. 优化百分比设置,防止资金过度集中。

## 策略优化方向

该策略可以从以下几个方面进行优化:

1. 增加止损逻辑,在资产价格下滑到一定程度时自动止损。

2. 增加仓位调整的交易信号验证,避免在非趋势变化点调整仓位。

3. 对不同资产设置不同的投资百分比、止损比例等参数。

4. 增加参数优化模块,根据历史数据自动优化参数。

5. 支持平仓再投资其他资产,进行动态资产配置。

## 总结

该策略通过固定投资份额达到分散投资、控制风险的效果,适用于稳定资产的长期持有。但该策略存在仓位调整滞后、风险资产投资风险等问题。后续可通过优化止损逻辑、信号验证等手段进一步提高策略稳定性。

||

## Overview

The core idea of this strategy is to keep the investment percentage of an asset in the portfolio fixed. When the asset value rises, the investor sells some to maintain the percentage. When it falls, the investor buys more to replenish the percentage. The strategy is suitable for relatively stable assets.

## Strategy Logic

The strategy first sets the investment percentage parameter percent_invested, i.e. the percentage of the asset in the portfolio. It then adjusts positions based on:

1. When position is 0, calculate contracts to buy based on percent_invested and initial capital. 

2. When holding, compare invested amount percentage invested to equity percent_invested. If too low, buy more contracts. If too high, sell contracts.

3. Repeat step 2 to keep investment percentage fixed.

## Advantages

- Allows long-term holding of stable assets without frequent trading.

- Periodic rebalancing profits from asset fluctuations.

- Investment diversification across uncorrelated assets reduces portfolio risk.

- Prevents full losses by avoiding full investment before bubble bursts.

## Risk Analysis

- Higher loss risk for volatile assets.

- Frequent trading means more fees.

- Rebalancing may lag, missing best entry/exit points. 

- Improper percentage settings may cause overtrading.

Risks can be reduced by:

1. Selecting assets carefully to avoid high volatility.

2. Optimizing rebalancing logic to reduce trade frequency.

3. Setting minimum position change units to prevent overtrading.

4. Optimizing percentage settings to prevent overconcentration.

## Optimization Directions

The strategy can be improved by:

1. Adding stop loss logic to cut losses at certain threshold.

2. Adding signal validation before rebalancing to avoid non-trend spots.

3. Customizing percentages, stop loss ratios per asset.

4. Adding parameter optimization module to find optimal parameters. 

5. Support closing positions to reinvest in other assets for dynamic allocation.

## Summary

The fixed percentage strategy provides diversification and risk control. But it has risks like lagging rebalancing and volatile asset losses. Further improvements to stop loss logic and signal validation can enhance stability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Percent Invested|
|v_input_2|true|From Day|
|v_input_3|true|From Month|
|v_input_4|2017|From Year|
|v_input_5|true|To Day|
|v_input_6|true|To Month|
|v_input_7|2018|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2022-11-22 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// strategy("Fixed Fractioning", overlay=true, initial_capital=100000.0)

percent_invested=input(50.0,title="Percent Invested",maxval=100.0,minval=0.0)
fraction_invested=percent_invested/100

from_day=input(1,title="From Day",maxval=31,minval=1)
from_month=input(1,title="From Month",maxval=12,minval=1)
from_year=input(2017,title="From Year",maxval=2018,minval=1900)

to_day=input(1,title="To Day",maxval=31,minval=1)
to_month=input(1,title="To Month",maxval=12,minval=1)
to_year=input(2018,title="To Year",maxval=2018,minval=1900)

// === FUNCTION EXAMPLE === from: https://www.tradingview.com/script/62hUcP6O-How-To-Set-Backtest-Date-Range/
start     = timestamp(from_year, from_month, from_day, 00, 00)  // backtest start window
finish    = timestamp(to_year, to_month, to_day, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"
strategy.initial_capital = 50000
if strategy.position_size==0 and window()
    contracts_to_buy=(fraction_invested*strategy.initial_capital)/close
    strategy.entry("long",long=true,qty=contracts_to_buy,limit=close,when=contracts_to_buy>1)

invested=(strategy.position_size*close)/strategy.equity
if invested<fraction_invested and window()
    contracts_to_buy=((fraction_invested-invested)*strategy.equity)/close
    strategy.order("long",long=true,qty=contracts_to_buy,limit=close,when=contracts_to_buy>1)

else 
    if invested>fraction_invested and window()
        contracts_to_sell=((invested-fraction_invested)*strategy.equity)/close
        strategy.order("sell",long=false,qty=contracts_to_sell,limit=close,when=contracts_to_sell>1)



```

> Detail

https://www.fmz.com/strategy/427612

> Last Modified

2023-09-22 16:51:25
