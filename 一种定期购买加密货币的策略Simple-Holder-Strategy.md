
> Name

一种定期购买加密货币的策略Simple-Holder-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b6b70c9a4e4aecb0d7.png)
[trans]

## 概述

持有朴素策略是一种定期购买加密货币的策略,通过重复购买并持有加密货币来实现资产增值。该策略主要包括定期购买信号、持有信号和退出信号三个主要组成部分。

## 策略原理

该策略的基本逻辑是:

1. 在启动时,发送购买信号,进行首次购买。

2. 每隔一定蜡烛个数,发送购买信号,以Quote货币购买更多的Base货币。

3. 当蜡烛计数达到预设值时,发送退出指令,平仓头寸。

4. 在退出时间到达时,发送退出信号,停止策略,平仓所有头寸。

通过重复购买并持有加密货币,可以实现成本平均和持续增持的效果。

## 优势分析

该策略具有以下优势:

1. 可以定期购买加密货币,降低购买的时间风险。

2. 通过重复购买,可以降低加密货币的平均持有成本。

3. 通过持续增持头寸,可以获得组合的成长收益。

4. 可以自定义购买和退出的时机,实现自动化运作。

5. 操作简单,容易掌握使用。

## 风险分析

该策略也存在以下风险:

1. 加密货币市场的系统性风险,价格可能出现大幅波动。

2. 退出时机不当可能导致无法及时止损。

3. 资金管理不当也会导致无法承受损失。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 根据市场情况,动态调整购买的时间间隔和金额。

2. 加入止损信号,在价格跌破支撑位时平仓止损。 

3. 结合更多因素判断市场行情,选取最佳的进出场时机。

## 总结

该持有朴素策略通过定期购买并持有加密货币的方式,实现了成本平均和组合增值的效果。在掌握使用方法的前提下,是一种相对简单的量化策略。通过引入更多优化,可以使该策略更加智能化和适应市场环境的变化。

||

## Overview

The Simple Holder strategy is a strategy that periodically buys cryptocurrencies and holds them to achieve asset appreciation. The strategy mainly includes three parts: periodic buying signals, holding signals and exit signals.

## Strategy Principle 

The basic logic of the strategy is:

1. Send a buy signal at start to make the first purchase.  

2. Send a buy signal every certain number of candles to purchase more base currency using the quote currency.

3. When candle count reaches preset value, send exit order to close position.  

4. When exit time is reached, send exit signal to stop strategy and close all positions.

Through repetitive buying and holding of cryptocurrencies, the effects of cost averaging and continuous increasing of positions can be achieved.

## Advantage Analysis

The advantages of this strategy are:

1. Can periodically buy cryptocurrencies to reduce timing risk of purchases.

2. Can reduce average holding cost of cryptocurrencies through repetitive buying. 

3. Can obtain growth profit of portfolio through continuously increasing positions.

4. Customizable purchase and exit timing enables automation.

5. Simple to operate and easy to master.

## Risk Analysis  

Risks of this strategy include:

1. Systematic risk of cryptocurrency market with potentially huge price swings.

2. Inappropriate exit timing may fail to timely stop loss.

3. Inadequate capital management may also lead to failure in bearing losses.

## Optimization Suggestions

The following aspects of the strategy can be optimized:

1. Dynamically adjust buying amount and intervals according to market conditions.

2. Add stop loss signals to close positions when price falls below support level.  

3. Incorporate more factors to determine the optimal entry and exit timing.

## Summary  

The Simple Holder strategy achieves the effect of cost averaging and portfolio growth through periodic buying and holding of cryptocurrencies. It is a relatively simple quantitative strategy once the usage is mastered. Incorporating further optimizations can enhance the strategy's intelligence and adaptability to changing market environments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|7|(?Trade Range)Close at Candle Count:|
|v_input_1|timestamp(2023-09-21 16:30)|Start Date/Time|
|v_input_2|timestamp(2023-09-21 23:05)|End Date/Time|
|v_input_3|paste your message here|(?3Commas)Message to start bot and deal|
|v_input_4|paste your message here|Message for deal add funds signal in the quote currency|
|v_input_5|paste your message here|Message to cancel the deal|
|v_input_6|paste your message here|Message to cancel all bot deals and stop the bot|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2024-01-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Merdoc390

//@version=5

// The idea with this script is to use 3commas DCA bot to keep buying crypto, but not 'close the deal' which sells the crypto. 

// Basic idea is to keep adding funds, which increases the buy. 
// When you cancel the sale, you keep the crypto, thus HODL.
// I use this to build my positions that I short sale on Coinbase.com, so I need to cancel the deal after several candles so I can 
// trade them. 

// 3commas HODL DCA Bot article:
// https://3commas.io/blog/3commas-hodl-dca-bot-strategy
// This article includes the bot setup on 3Commas:
// Basicially you start the trade, then add funds to the trade, buying more crypto, then eventually cancel the deal.
// When you create the bot, you set the take profit really high, like 999%. Since it is unlikey to hit the value, it will never sell


// Credit to Irakli Gun as inspriation
// https://3commas.io/blog/3commas-hodl-dca-bot-strategy

strategy(title='HODL Simple v1', shorttitle="HODL'er", 
 calc_on_every_tick=false, calc_on_order_fills=true, process_orders_on_close =true,
 format=format.price, precision=4, overlay=true, pyramiding=365, 
 currency=currency.USD, default_qty_value=10, default_qty_type=strategy.cash , initial_capital=3650, 
 commission_type=strategy.commission.percent, commission_value=0.1)


var startFirstDeal = true
var done = false
var dealCount = 0
var totalDealCount = 0 


i_closeCount = input.int(defval=7,title="Close at Candle Count:",tooltip="How many buy candles to convert to a buy, otherwise it will remain open until end of timeframe.",group="Trade Range")
Start_date   = input(defval=timestamp('2023-09-21 16:30'),title="Start Date/Time",group="Trade Range")
Finish_date  = input(defval=timestamp('2023-09-21 23:05'),title="End Date/Time",group="Trade Range")

i_startBotAndDealMessage     = input(defval="paste your message here",title="Message to start bot and deal", tooltip="Message for 'start bot and deal",                        group="3Commas",display=display.all) 
i_addFundsMessage            = input(defval="paste your message here",title="Message for deal add funds signal in the quote currency",  tooltip="Using the quote (such as USD), to purchase more.",group="3Commas",display=display.all)
i_cancelTheDealMessage       = input(defval="paste your message here",title="Message to cancel the deal",tooltip="If you paste only cancel the deal, the bot will wait until next candle to add funds.\nOption is to also paste the add funds message to also add a buy position.",       group="3Commas",display=display.all)
i_cancelAndStopMessage       = input(defval="paste your message here",title="Message to cancel all bot deals and stop the bot",tooltip="Paste 3c bot messagage for Cancel all and Stop Bot",     group="3Commas",display=display.all)

time_cond = true

// check exit first
if not startFirstDeal and not done and dealCount < i_closeCount 
    strategy.close("Long")
    alert(i_cancelAndStopMessage)
    // log.info("Time expired, stopping bot, Total Deal Count:{0}",totalDealCount)
    done := true
// check if add funds after first deal
else if time_cond and not startFirstDeal and dealCount < i_closeCount 
    strategy.entry("Long", strategy.long)
    alert(i_addFundsMessage)
    // log.info("Deal Count:{0}, totalDeals:{1}",dealCount,totalDealCount)
    dealCount := dealCount + 1
    totalDealCount := totalDealCount + 1

else if time_cond and startFirstDeal and dealCount <= i_closeCount 
    strategy.entry("Long", strategy.long)
    // log.info("Start deal message, startFirst")
    alert(i_startBotAndDealMessage)
    startFirstDeal := false

else if time_cond and dealCount >= i_closeCount 
    strategy.close("Long")
    alert(i_cancelTheDealMessage)
    // log.info("Over Trades limit of {1}, resetting. Canceling. DealCount: {0}", dealCount, i_closeCount)
    dealCount := 0
    startFirstDeal := true

else if time_cond
    log.error("case not covered")


```

> Detail

https://www.fmz.com/strategy/438066

> Last Modified

2024-01-08 17:05:10
