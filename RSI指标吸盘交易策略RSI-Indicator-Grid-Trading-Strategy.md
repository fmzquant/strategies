
> Name

RSI指标吸盘交易策略RSI-Indicator-Grid-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12468a2db0101907594.png)
[trans]
## 概述
RSI指标吸盘交易策略是一种集成了RSI和CCI技术指标的固定格子交易方法。该策略根据RSI和CCI指标的值来判断入场时机,采用固定盈利比例和固定格子数量来设置止盈单和加仓单。同时,策略还集成了对突破性价格变动的对冲机制。

## 策略原理
### 入场条件
当5分钟和30分钟RSI指标都低于设定阈值,而1小时CCI指标也低于设定值时,产生做多信号。此时记录当前close价格作为入场价格,并根据账户权益和格子数量计算出首单仓位。

### 停利条件
以入场价格为基准,按照设定的目标盈利比例计算出盈利价格,在该价格水平设置止盈单。

### 加仓条件 
除首单外,其余的固定仓位加仓单会在入场信号后逐一放出,直到达到设定的格子数量。

### 对冲机制
如果价格较入场价格上涨超过设定的对冲阈值百分比,则对全部持仓进行对冲平仓。

### 反转机制
如果价格较入场价格下跌超过设定的反转阈值百分比,则取消所有未成交订单,等待新的入场机会。

## 优势分析
- 结合RSI和CCI两种指标提高获利概率
- 采用固定格子设定目标盈利,增加获利确定性
- 集成对冲机制,有效防范价格剧烈波动的风险
- 加入反转机制,可以减轻亏损

## 风险分析
- 指标产生错误信号的概率
- 价格剧烈波动突破对冲阈值
- 反转后再次调头无法重新入场

可以通过调整指标参数、扩大对冲幅度和减小反转幅度来降低这些风险。

## 优化方向
- 可以测试更多种类的指标组合
- 可以研究自适应止盈机制
- 可以优化加仓逻辑

## 总结
RSI指标吸盘交易策略通过指标判断入场时机,采用固定格子止盈和加仓来锁定稳定利润。同时,策略具备对冲大幅波动和反转后的重新入场机制。这种集成了多个机制的策略可以用于降低交易风险,提高获利率。通过进一步优化指标和参数设定,可以获得更好的实盘效果。

||

## Overview
The RSI Indicator Grid Trading Strategy integrates the RSI and CCI technical indicators with a fixed grid trading approach. It uses the values of RSI and CCI indicators to determine entry signals, and sets take profit orders and additional grid orders based on a fixed profit ratio and number of grids. The strategy also incorporates a hedging mechanism against volatile price movements.

## Strategy Logic  
### Entry Conditions
Long signals are generated when the 5-minute and 30-minute RSI are below threshold values, and the 1-hour CCI is below the threshold. The current close price is recorded as the entry price, and the size of the first order is calculated based on account equity and the number of grids.

### Take Profit Conditions
The take profit price level is calculated using the entry price and the target profit ratio. Profit take orders are placed at this price level.

### Grid Entry Conditions
After the first order, remaining fixed-size grid orders are placed one by one until the specified number of grids is reached.

### Hedging Mechanism 
If price increases beyond the set hedging threshold percentage from entry, all open positions are hedged by closing them.

### Reversal Mechanism
If price drops beyond the set reversal threshold percentage from entry, all pending orders are cancelled to await new entry opportunities.

## Advantage Analysis
- Combines RSI and CCI indicators to improve profitability 
- Fixed grid targets profit locking to increase certainty
- Integrated hedging guards against volatile price swings
- Reversal mechanism cuts losses  

## Risk Analysis
- False signals from indicators
- Price spikes penetrate hedging thresholds 
- Failure to re-enter on reversals

These can be mitigated by adjusting indicator parameters, expanding hedging range, reducing reversal range.

## Enhancement Areas
- Test more indicator combinations
- Research adaptive profit taking  
- Optimize grid logic

## Conclusion
The RSI Grid Strategy determines entries with indicators, and locks in stable profits using fixed grid take profits and entries. It also incorporates volatility hedging and re-entry after reversals. The integration of multiple mechanisms helps reduce trading risks and increase profitability rates. Further optimizations of indicators and settings can improve live performance.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Custom RSI/CCI Strategy with Fixed Grid", shorttitle="INVESTCOIN_RSI_CCI_Fixed_Grid", overlay=true)

// Input parameters
input_rsi_5min_value = 55
input_rsi_30min_value = 65
input_cci_1hr_value = 85
input_profit_target_percent = 0.6 // Target profit in percentage
input_grid_size = 15 // Number of orders in grid
input_hedging_percent = 20 // Percentage price change for hedging
input_first_order_offset = 0.2 // Offset for the first order in percentage
input_reversal_percent = 0.4 // Percentage price change for reversal

// Calculating the RSI and CCI values
rsi_5min = ta.rsi(close, 5)
rsi_30min = ta.rsi(close, 30)
cci_1hr = ta.cci(close, 60)

// Define strategy conditions based on the provided screenshot
long_condition = (rsi_5min < input_rsi_5min_value) and (rsi_30min < input_rsi_30min_value) and (cci_1hr < input_cci_1hr_value)

// Plot signals
plotshape(series=long_condition, title="Long Entry Signal", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)

// Initialize a variable to store the entry price
var float entry_price = na

// Initialize a variable to store the profit target
var float profit_target = na

// Hedge condition based on price change percentage
var float hedge_price = na

// Initialize a variable to count the total number of orders
var int total_orders = 0

// Calculate the initial order size based on account equity and grid size
var float initial_order_size = 1 / input_grid_size / 100

// Entry orders with fixed size
if (long_condition and total_orders < 9000)
    // Place first order with an offset
    if total_orders == 0
        strategy.order("First Long", strategy.long, qty=initial_order_size, limit=close * (1 - input_first_order_offset / 100))
    total_orders := total_orders + 1
    
    // Place remaining grid orders
    for i = 1 to input_grid_size - 1
        if (total_orders >= 9000)
            break // Stop if max orders reached
        strategy.entry("Long_" + str.tostring(i), strategy.long, qty=initial_order_size)
        total_orders := total_orders + 1

// Calculate the profit target in currency
if (long_condition)
    entry_price := close // Store the entry price when the condition is true

if (not na(entry_price))
    profit_target := entry_price * input_profit_target_percent / 100 // Calculate the profit target

// Setting up the profit target
if (not na(profit_target))
    strategy.exit("Take Profit", "Long", limit=entry_price + profit_target)

// Hedge by closing all positions if the price increases by the hedging percentage
if (strategy.position_size > 0)
    hedge_price := close * (1 + input_hedging_percent / 100)

if (not na(hedge_price) and close >= hedge_price)
    strategy.close_all(comment="Hedging")


// Reversal condition based on the price change percentage
var float reversal_price = na

if (strategy.position_size > 0 and total_orders > 1) // Check if at least one grid order has been placed
    reversal_price := entry_price * (1 - input_reversal_percent / 100)

// Cancel trades and wait for a new entry point if the price reverses by the specified percentage
if (not na(reversal_price) and close <= reversal_price)
    strategy.cancel_all()
    total_orders := 0 // Reset the total orders count after cancellation
```

> Detail

https://www.fmz.com/strategy/440319

> Last Modified

2024-01-29 11:42:46
