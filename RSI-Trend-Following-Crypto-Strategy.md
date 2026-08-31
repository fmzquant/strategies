
> Name

RSI-Trend-Following-Crypto-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f95a08764ae6539c77.png)

## Overview

The RSI Trend Following Crypto Strategy is a simple yet effective crypto trading strategy based on the Relative Strength Index (RSI) indicator. It utilizes the RSI indicator to determine the price trend of cryptocurrencies, going long when the RSI crosses above 35 and closing positions when the RSI crosses below 75. This strategy is suitable for following medium- to long-term trends of cryptocurrencies and can generate decent profits.  

## Strategy Logic

The core indicator of the RSI Trend Following Crypto Strategy is the 14-period RSI. It determines the price trend of cryptocurrencies based on RSI crossovers. The specific trading rules are as follows:

Long entry rule: Go long when RSI crosses above 35  
Exit rule: Close long positions when RSI crosses below 75
Stop loss rule: Stop loss when RSI crosses below 10 (optional)

The strategy assumes that when RSI crosses above 35, it signals an oversold state and prices may bottom out and rebound upwards. When RSI crosses below 75, it indicates an overbought state and prices may top out and decline. By capturing overbought and oversold opportunities, decent profits can be made by following medium- to long-term cryptocurrency trends.

## Advantages

The RSI Trend Following Crypto Strategy has the following advantages:

1. The strategy logic is simple and easy to understand  
2. Can effectively identify medium- to long-term price trends of cryptocurrencies
3. The optimized RSI parameters lead to relatively reliable performance  
4. Higher risk-reward ratio, suitable for profit-seeking investors
5. Shows consistent long-term profitability and stability  

## Risks

There are also some risks associated with this strategy:  

1. Cannot handle extreme price swings  
2. Improper entry and stop loss levels may lead to unnecessary losses
3. RSI crossovers may generate false signals, causing trading mistakes
4. Severe trend reversals can lead to huge losses

To mitigate the above risks, the strategy can be optimized by adjusting parameters, setting stop losses, adding filters etc. to enhance stability.  

## Enhancement Areas

The RSI Trend Following Crypto Strategy can be further improved by:

1. Fine tuning RSI parameters and buying/selling levels  
2. Adding trend filtering indicators to avoid whipsaws 
3. Incorporating volume indicators to detect false breakouts
4. Using exponential moving averages for more reliable trend identification   
5. Employing machine learning to dynamically optimize RSI parameters  

With the above enhancements, trading risks can be reduced and stability improved to achieve better risk-adjusted returns.  

## Conclusion

The RSI Trend Following Crypto Strategy is an easy-to-use strategy that capitalizes on overbought/oversold RSI conditions to trade along the trend. Although exposed to some degree of trend reversal risks, parameter optimization and adding filters can lower risks and enhance stability. It is suitable for investors with adequate quant trading knowledge and risk appetite.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Use Emergency Exit?|
|v_input_2|35|RSI Long Cross|
|v_input_3|75|RSI Close Position|
|v_input_4|10|RSI Emergency Close Position|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-05 00:00:00
end: 2023-12-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © FieryTrading

//@version=4
strategy("RSI Trend Crypto", overlay=false, pyramiding=1, commission_value=0.2, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// Input
UseEmergency = input(false, "Use Emergency Exit?")
RSIlong = input(35, "RSI Long Cross")
RSIclose = input(75, "RSI Close Position")
Emergencyclose = input(10, "RSI Emergency Close Position")

// RSI
rsi = rsi(close, 14)

// Conditions
long = crossover(rsi, RSIlong)
longclose = crossunder(rsi, RSIclose)
emergency = crossunder(rsi, Emergencyclose)

// Plots
plot(rsi, color=color.white, linewidth=2)
plot(RSIlong, color=color.green)
plot(RSIclose, color=color.red)

// Alert messages 
// When using a bot remember to use "{{strategy.order.alert_message}}" in your alert
// You can edit the alert message freely to suit your needs

LongAlert = 'RSI Long Cross: LONG'
CloseAlert = 'RSI Close Position'
EmergencyAlert = 'RSI Emergency Close'

// Strategy
if long
    strategy.entry("Long", strategy.long, alert_message=LongAlert)

if longclose
    strategy.close("Long", alert_message=CloseAlert)

if emergency and UseEmergency==true
    strategy.close("Long", alert_message=EmergencyAlert)










```

> Detail

https://www.fmz.com/strategy/435146

> Last Modified

2023-12-12 16:26:49
