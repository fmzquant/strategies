
> Name

Dual-position-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12229543ec455db60d1.png)


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
