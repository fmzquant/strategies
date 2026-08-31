
> Name

基于RSI的简单密码货币交易策略Simple-Cryptocurrency-Trading-Strategy-Based-on-RSI

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/126196b66d531b680e5.png)

## Overview

This is a simple cryptocurrency trading strategy based on the Relative Strength Index (RSI). It generates trading signals by calculating RSI values to determine if the market is overbought or oversold. The strategy is suitable for medium-term trading.

## Strategy Logic

The strategy first calculates the 14-day RSI value. It then judges if the RSI value is below 30, the oversold line. If so, a buy signal is generated. If the RSI surpasses 70, the overbought line, a sell signal is generated.

When the RSI value crosses above the oversold line, long positions are closed. When it crosses below the overbought line, short positions are closed.

## Advantage Analysis 

- The strategy logic is simple and clear, easy to understand and implement
- Utilizes mature RSI indicator to judge market conditions
- Customizable parameters suit different market environments  
- Relatively small drawdown risk

## Risk Analysis

- Market events may cause temporary failure
- Fixed parameters may cause overtrading  
- Reliance on a single indicator makes false signals likely

The risks above can be mitigated by dynamically adjusting parameters, incorporating multiple indicators, and setting stop loss.

## Optimization Directions

The strategy can be optimized from the following aspects:

1. Combine with moving averages and other indicators to form multiple confirmations;

2. Add trend judgement rules to avoid choppy markets;

3. Set trade size or stop loss rules to control risks;

4. Optimize RSI parameters to suit the high-frequency nature of crypto trading.

## Summary  

Overall this is a very basic RSI strategy, generating trading signals by identifying overbought/oversold levels using a mature indicator. The pros are simplicity and relatively small practical risks. But reliance on a single indicator also makes false signals likely. We can extend and optimize it in many ways to make it more robust and adaptive.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|70|Overbought Level|
|v_input_3|30|Oversold Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-14 00:00:00
end: 2024-02-21 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Larry Williams Simple Crypto Strategy", overlay=true)

// Параметры стратегии
length = input(14, title="Length")
overboughtLevel = input(70, title="Overbought Level")
oversoldLevel = input(30, title="Oversold Level")

// Вычисление RSI
rsiValue = rsi(close, length)

// Определение условий для входа в позицию
enterLong = rsiValue < oversoldLevel
enterShort = rsiValue > overboughtLevel

// Открытие позиции
if enterLong
    strategy.entry("Buy", strategy.long)
if enterShort
    strategy.entry("Sell", strategy.short)

// Закрытие позиции
if enterLong and rsiValue > oversoldLevel
    strategy.close("Buy")
if enterShort and rsiValue < overboughtLevel
    strategy.close("Sell")

// Отрисовка уровней
hline(overboughtLevel, "Overbought", color=color.red)
hline(oversoldLevel, "Oversold", color=color.green)
```

> Detail

https://www.fmz.com/strategy/442561

> Last Modified

2024-02-22 17:44:13
