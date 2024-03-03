
> Name

基于收盘价突破的买入策略Buy-Strategy-Based-on-Close-Price-Breakthrough

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/123731aa43c64119188.png)
[trans]
## 概述

本策略的核心思想是在股价收盘价高于开盘价时进行买入操作。当满足买入条件时,策略会在该K线收盘时以收盘价进入多仓。之后设置止损价和止盈价,当价格触及这两个价格时就会平仓。

## 策略原理

当日K线的收盘价高于开盘价,说明当日的股价是上涨的。这是一个买入信号。收盘价突破当日开盘价,说明买方力量比较强劲,股价有望继续上涨。

因此,本策略的交易信号是:当日K线收盘价 > 当日K线开盘价。满足此条件时,在该K线收盘时以收盘价买入,进行逐日持有。

本策略采用了两个参数:

1. Entry Price: 买入价格,默认为0,表示以收盘价买入

2. Take Profit Parameter: 止盈参数,止盈价格计算公式为:Entry Price * (1 + 止盈参数),默认值为0.5%,相当于买入价格的0.5%

具体交易流程如下:

1. 等待K线收盘,检查当日收盘价 > 当日开盘价
2. 条件满足时,以收盘价买入
3. 开仓后设置止损价和止盈价
4. 当价格上涨至止盈价时,平仓止盈
5. 当价格下跌至下一根K线的最低点时,平仓止损
6. 每日重复1-5步骤

## 策略优势

本策略具有以下优势:

1. 思路简单,容易理解和实现
2. 对交易信号判断仅需使用K线的开盘价和收盘价,数据需求量小
3. 回撤风险较小,使用止损止盈机制控制亏损

## 风险分析

本策略也存在一些风险:  

1. 当日潜在出现多个买入机会,而策略只在收盘时买入一次,可能错过部分机会
2. 收盘后价格可能出现回调,导致止损被触发的概率较大

对此,可通过以下方法降低风险:

1. 在触发买入条件后,追踪当日最高价,AdjustAmount functions来动态调整仓位
2. 收盘后延迟一定时间再设置止损止盈价格,避免止损被直接触发

## 策略优化方向  

本策略可以从以下方面进行优化:  

1. 加入量价确认,例如增加成交量或市场热度等条件作为买入信号的确认
2. 在买入后采用动态止盈止损,实时调整止损止盈价格
3. 针对个股设置参数,采用机器学习方法自动优化参数
4. 增加仓位管理机制,通过调整仓位规避回撤风险

## 总结

本策略基于收盘价突破来产生买入信号,思路简单,回撤风险较小。通过加入确认指标、动态止盈止损、参数优化等手段,可以进一步提高策略的稳定性和盈利能力。总体来说,本策略适合对开盘突破策略感兴趣的投资者使用和优化,具有很好的实用性。

||

## Overview

The core idea of this strategy is to buy when the closing price of the stock is higher than the opening price of the day. When the buy condition is met, the strategy will go long at the close of that candlestick at the closing price. Stop loss price and take profit price will then be set. When the price reaches these two prices, the position will be closed.

## Strategy Principle  

If the closing price of the daily candlestick is higher than the opening price, it means that the stock price rose on that day. This is a buy signal. The breakthrough of the closing price from the opening price indicates that the buying power is quite strong and the stock price is likely to continue rising.

Therefore, the trading signal for this strategy is: Daily Candlestick Close Price > Daily Candlestick Open Price. When this condition is met, buy at the closing price at the close of that candlestick and hold daily.

This strategy uses two parameters:

1. Entry Price: The buying price, the default is 0, which means buying at the closing price  

2. Take Profit Parameter: Take profit parameter, the take profit price formula is: Entry Price * (1 + Take Profit Parameter), the default value is 0.5%, equivalent to 0.5% of the entry price

The specific trading process is as follows:  

1. Wait for candlestick to close and check if close price > open price of the day
2. When the condition is met, buy at the closing price
3. After opening a position, set stop loss and take profit price 
4. When the price rises to take profit price, close position for profit
5. When the price falls to the lowest point of the next candlestick, close position for stop loss
6. Repeat steps 1-5 every day

## Advantage Analysis   

This strategy has the following advantages:

1. The idea is simple and easy to understand and implement  
2. It only requires the open and close prices of candlestick for trade signal judgment, with small data requirements
3. The risk of drawdown is small, using stop loss and take profit mechanism to control losses

## Risk Analysis

There are also some risks with this strategy:   

1. There may be multiple buy opportunities during the day, but the strategy only buys once at close, possibly missing some opportunities  
2. Price may callback after close, increasing the probability of stop loss trigger

The risks can be reduced by:

1. After buy signal triggered, track the highest price of the day and use AdjustAmount functions to dynamically adjust position 
2. Delay setting stop loss and take profit price for a period after close to avoid stop loss trigger immediately  

## Optimization Directions   

This strategy can be optimized in the following aspects:

1. Add volume confirmation, for example add volume or market heat indicators as confirmation for buy signal
2. Use dynamic stop loss and take profit after buying, adjust stop loss and take profit price in real time
3. Set parameters specifically for individual stocks, use machine learning methods to automatically optimize the parameters
4. Add position management mechanism, adjust position size to avoid drawdown risk

## Conclusion  

This strategy generates buy signals based on close price breakthrough. The idea is simple with small drawdown risk. By adding confirmation indicators, dynamic stop loss/take profit, parameter optimization etc., the stability and profitability of the strategy can be further improved. Overall speaking, this strategy is suitable for investors who are interested in opening price breakthrough strategies to use and optimize, and has very good practicality.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|false|Entry Price|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-19 00:00:00
end: 2024-02-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Buy on Close Strategy", overlay=true)

// Входные параметры
var float entry_price = na
if (na(entry_price))
    entry_price := input.float(title="Entry Price", defval=0)

// Функция для расчета Take Profit
calc_take_profit(price) =>
    price * 1.005 // 0.5% от суммы сделки

// Проверяем условие для открытия позиции на покупку
buy_condition = close > open

// Переменная для отслеживания открытой позиции
var bool open_position = na

// Реализация стратегии
if (buy_condition)
    // Открываем сделку на покупку
    strategy.entry("Buy", strategy.long)
    open_position := true

// Закрываем позицию по Take Profit или при закрытии свечи
if (open_position)
    // Рассчитываем уровень Take Profit
    take_profit_level = calc_take_profit(entry_price)

    // Закрываем сделку по Take Profit
    strategy.exit("Take Profit", "Buy", limit=take_profit_level)

    // Закрываем сделку при закрытии свечи
    if (close < open)
        strategy.close("Close Candle", "Buy")

```

> Detail

https://www.fmz.com/strategy/442378

> Last Modified

2024-02-21 14:48:59
