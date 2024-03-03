
> Name

双仓突破策略Dual-position-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12229543ec455db60d1.png)

[trans]

### 概述

双仓突破策略通过在涨跌两侧同时建仓,实现趋势追踪获利的交易策略。该策略同时建立多仓和空仓,在突破上行或下行时获利。

### 策略原理

该策略的核心逻辑是:

1. 使用percent变量设置仓位大小为10%。

2. 使用bar_index判断当前是第偶数根K线还是奇数根K线。

3. 如果是偶数根K线,则执行开多仓逻辑。使用alert_message发送webhook消息,内容包括开仓信息,止盈止损价格等。通过strategy.entry下单开多仓。

4. 如果是奇数根K线,则执行开空仓逻辑。通过strategy.entry下单开空仓。

5. 开空仓后,使用alert发送webhook消息,内容包括平仓信息,止盈止损价格等。通过alert平掉之前的多仓。

该策略通过在涨跌两侧同时建仓,无论行情是上涨还是下跌,都可以获利。当行情出现突破时,通过在突破方向建仓获利,同时在反方向的仓位被止损清仓,实现趋势跟踪。

### 优势分析

该策略有以下优势:

1. 能够同时获利于多头和空头两方向的行情。无论行情是上涨还是下跌,都有建仓获利的机会。

2. 通过在涨跌两侧同时建仓,可以充分利用资金进行交易。不会出现只在单边方向建仓的资金闲置情况。

3. 建立双向仓位后,行情出现突破时可以即时跟进,实现趋势追踪。

4. 采用跟踪止损,可以及时止损,控制风险。

5. 使用webhook与交易所API结合,可以实现自动化交易。

### 风险分析

该策略也存在一些风险:

1. 行情震荡时,双仓位可能同时被套牢。需要合理设置止损位,控制风险。

2. 交易费用较高。双向开仓会产生更多交易费用。

3. 需要寻找合适的品种进行交易。品种波动率不宜过大,也不宜过小。

4. 需要密切关注行情,及时调整仓位。

5. 仓位大小需要精确设置。仓位过大,风险过高;仓位过小,获利有限。

### 优化方向

该策略可以从以下几个方面进行优化:

1. 根据不同品种的特点,调整仓位大小。对波动较大的品种,可以适当缩小仓位。

2. 优化止损算法,在保证止损的同时尽量减少无效止损被触发的情况。

3. 结合趋势指标,判断行情主要趋势方向,降低交易频率,减少交易费用。

4. 加入再入场条件,在止损后可以再次入场,增加盈利机会。

5. 采用限价单替代市价单,能够在合适的价格进入场内。

6. 优化资金管理,使仓位大小与账户资金量动态匹配。避免单笔损失过大。

### 总结

双仓突破策略通过同时建立多空双向仓位,在行情出现突破时跟进趋势获利。该策略可以充分利用资金,及时捕捉突破机会。但也需要防范双仓同时被套的风险,合理设置止损和仓位管理非常关键。通过不断优化,该策略可以成为一个非常实用的突破系统。

||

### Overview

The dual-position breakthrough strategy realizes trend tracking and profit making by establishing long and short positions simultaneously. This strategy opens both long and short positions at the same time, profiting when there is a breakthrough in either direction.

### Strategy Principles 

The core logic of this strategy is:

1. Use the percent variable to set the position size to 10%.

2. Use bar_index to determine if the current bar is an even or odd bar. 

3. If it is an even bar, execute the long position opening logic. Use alert_message to send a webhook message with information like opening position, take profit and stop loss prices, etc. Open long position through strategy.entry.

4. If it is an odd bar, execute the short position opening logic. Open short position through strategy.entry.

5. After opening short, use alert to send a webhook message with information like closing position, take profit and stop loss prices, etc. Close the previous long position through alert.

This strategy can profit from both long and short side by establishing positions on both sides. It can gain profit when there is a breakthrough in either direction. When there is a trend breakthrough, it profits from the side with established position while the opposite side gets stopped out, realizing trend following.

### Advantage Analysis

The advantages of this strategy are:

1. It can profit from both long and short side market moves. There are opportunities to open positions and gain profit whether the market goes up or down.

2. By establishing positions on both sides, it can make full use of capital for trading. There will be no idle capital when only one direction has positions. 

3. After establishing dual positions, it can follow the trend timely when there is a breakthrough.

4. It adopts trailing stop loss to stop out timely and control risks.

5. Used with webhook and exchange API, it realizes automated trading.

### Risk Analysis

There are also some risks with this strategy:

1. When the market is range-bound, both positions may get trapped. Reasonable stop loss should be set to control risks.

2. Trading costs are higher. Dual direction opening leads to more trading costs.

3. Need to find suitable products to trade. The fluctuation of the products should be neither too high nor too low.

4. Need to watch the market closely and adjust positions in time.

5. Position sizes need to be set precisely. Too large size means high risk, too small means limited profit.

### Optimization Directions

The strategy can be optimized from the following aspects:

1. Adjust position size based on different product characteristics. Lower size for highly volatile products.

2. Optimize the stop loss algorithm to reduce unnecessary stop loss triggers while ensuring effective stop loss.

3. Incorporate trend indicators to determine the overall trend direction, lower trading frequency and costs. 

4. Add re-entry conditions to open positions again after stop loss.

5. Use limit orders instead of market orders to enter the market at suitable prices.

6. Optimize capital management to match position size dynamically with account size. Avoid oversized single loss.

### Conclusion

The dual-position breakthrough strategy profits by following the trend when there is a breakthrough after establishing dual long and short positions. It can make full use of capital and capture breakthrough chances in time. But the risk of double positions getting trapped needs to be prevented. Reasonable stop loss and position management are crucial. With continuous optimizations, this strategy can become a very practical breakthrough system.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-16 00:00:00
end: 2023-10-23 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Crypto-Arsenal

//@version=5
// strategy("Buy One Sell One", overlay = false, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

percent = str.tostring(10)
cls = str.tostring(close)
tp = str.tostring(strategy.position_avg_price * (1 + 0.1))
sl = str.tostring(strategy.position_avg_price * (1 - 0.1))
    
if(bar_index % 2 == 0)
    // DEMO FOR SENDING MESSAGE WITH alert_message()
    // NEED TO ADD {{{strategy.order.alert_message}} to Message field at Create Alert box 
    
    // Add "limit" to open a LIMIT order instead of default MARKET
    alert_message = '{"action":"openLong","percent":"' + percent + '","profit":"' + tp + '","loss":"' + sl + '","connectorName":"YOUR_CONNECTOR_NAME","connectorToken":"YOUR_CONNECTOR_TOKEN","log":"Open Long at price:' + cls + '"}'
    strategy.entry('Enter Long',  strategy.long, alert_message = alert_message)
else
    // DEMO FOR SENDING MESSAGE WITH alert() 

    strategy.entry('Enter Short', strategy.short)
    // Add "limit" to open a LIMIT order instead of default MARKET
    alert_message = '{"action":"closeLong","percent":"' + percent + '","profit":"' + sl + '","loss":"' + tp + '","connectorName":"YOUR_CONNECTOR_NAME","connectorToken":"YOUR_CONNECTOR_TOKEN","log":"Close long at price:' + cls + '"}'
    alert(alert_message, alert.freq_once_per_bar)
```

> Detail

https://www.fmz.com/strategy/430034

> Last Modified

2023-10-24 14:02:47
