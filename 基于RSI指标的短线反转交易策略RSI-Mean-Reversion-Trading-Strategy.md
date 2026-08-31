
> Name

基于RSI指标的短线反转交易策略RSI-Mean-Reversion-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1dbf0de86c20d616fc3.png)



## Overview

This strategy uses the RSI indicator to identify trends and overbought/oversold conditions. Combined with EMA to determine current trend direction, it opens reverse positions when the trend direction is consistent with RSI signals to implement mean reversion trading.

## Strategy Logic

1. Use EMA indicator to determine current trend direction. Above EMA defines an uptrend while below EMA defines a downtrend.

2. Use RSI indicator to identify overbought/oversold conditions. RSI above 60 is overbought zone and below 40 is oversold zone.

3. When uptrend and RSI below 40, a buy signal is triggered. When downtrend and RSI above 60, a sell signal is triggered.

4. When buy/sell signals triggered, take profit and stop loss prices are set based on certain percentage of entry price.

5. When position size greater than 0, take profit order is placed. When position size less than 0, stop loss order is placed.

## Advantage Analysis  

1. The strategy reasonably combines EMA and RSI to identify trends and overbought/oversold conditions, avoiding trading against trends.

2. The mean reversion approach catches short-term rotations for profits.

3. Take profit and stop loss points help lock in profits and control risks.

4. Simple and clear logic, easy to understand and implement, suitable for beginners.

5. Parameters like EMA period and RSI can be optimized for different products and market environments.

## Risk Analysis

1. Failed reversal risk. Short-term reversal may fail, resulting in losses.

2. Unclear trend risk. EMA may fail to identify a clear trend in ranging markets, generating wrong signals.

3. Stop loss triggered risk. Stop loss set too close may be unexpectedly triggered. 

4. Overfitting risk. Excessive optimization on historical data may not apply for live trading.

5. High trading frequency risk. Too frequent trading incurs significant transaction costs.

## Improvement

1. Optimize EMA and RSI parameters to find best combination through backtesting.

2. Add filters to avoid wrong signals in ranging market. For example, add volume condition.

3. Optimize take profit/stop loss ratio to lock in profits. Stop loss should not be too wide.

4. Add position sizing rules like fixed fraction to control single trade loss.

5. Combine other indicators like MACD, KD to improve signal accuracy or use multivariate models.

6. Backtest on live data and continuously optimize for latest market conditions.

## Conclusion

This strategy implements a short-term mean reversion approach based on EMA and RSI, with clear logic of trend identification and overbought/oversold detection. It sets take profit and stop loss to control risks while profiting from short-term rotations. The simplicity and clarity are its advantages. Further optimizations can yield good backtest results. But risks like failed reversal and ranging market should be noted for live trading. Overall it provides a simple and practical short-term trading idea for beginners to learn from.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long Entry|
|v_input_2|true|Short Entry|
|v_input_3|100|EMA Length|
|v_input_float_2|true|Short Take Profit|
|v_input_float_4|1.5|Short Stop Loss|
|v_input_float_1|true|(?Take Profit Percentage)Long Take Profit|
|v_input_float_3|1.5|(?Stop Percentage)Long Stop Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-10-31 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Sarahann999
//@version=5
strategy("RSI Strategy", shorttitle="RSI", overlay= false)

//Inputs
long_entry = input(true, title='Long Entry')
short_entry = input(true, title='Short Entry')
emaSettings = input(100, 'EMA Length')
ema = ta.ema(close,emaSettings)
rsi = ta.rsi(close,14)

//Conditions
uptrend = close > ema
downtrend = close < ema
OB = rsi > 60
OS = rsi < 40
buySignal = uptrend and OS and strategy.position_size == 0
sellSignal = downtrend and OB and strategy.position_size == 0

//Calculate Take Profit Percentage
longProfitPerc = input.float(title="Long Take Profit", group='Take Profit Percentage',
     minval=0.0, step=0.1, defval=1) / 100
shortProfitPerc = input.float(title="Short Take Profit",
     minval=0.0, step=0.1, defval=1) / 100

// Figure out take profit price 1
longExitPrice  = strategy.position_avg_price * (1 + longProfitPerc)
shortExitPrice = strategy.position_avg_price * (1 - shortProfitPerc)

// Make inputs that set the stop %  1
longStopPerc = input.float(title="Long Stop Loss", group='Stop Percentage',
     minval=0.0, step=0.1, defval=1.5) / 100
shortStopPerc = input.float(title="Short Stop Loss",
     minval=0.0, step=0.1, defval=1.5) / 100

// Figure Out Stop Price
longStopPrice  = strategy.position_avg_price * (1 - longStopPerc)
shortStopPrice = strategy.position_avg_price * (1 + shortStopPerc)

// Submit entry orders
if buySignal and long_entry
    strategy.entry(id="Long", direction=strategy.long, alert_message="Enter Long")
    
if sellSignal and short_entry
    strategy.entry(id="Short", direction=strategy.short, alert_message="Enter Short")
    
//Submit exit orders based on take profit price
if (strategy.position_size > 0)
    strategy.exit(id="Long TP/SL", limit=longExitPrice, stop=longStopPrice, alert_message="Long Exit 1 at {{close}}")
if (strategy.position_size < 0)
    strategy.exit(id="Short TP/SL", limit=shortExitPrice, stop=shortStopPrice, alert_message="Short Exit 1 at {{close}}")
    
//note: for custom alert messages to read, "{{strategy.order.alert_message}}" must be placed into the alert dialogue box when the alert is set.

plot(rsi, color= color.gray)
hline(40, "RSI Lower Band")
hline(60, "RSI Upper Band")
```

> Detail

https://www.fmz.com/strategy/430760

> Last Modified

2023-11-01 16:15:30
