
> Name

基于动态止损和目标获利的EMA多次成本加权平均成本策略EMA-Multi-DCA-Strategy-with-Trailing-Stop-Loss-and-Profit-Target

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a40a12f417cf42c672.png)
 [trans]

## 概述
本策略采用动态的多重指数移动平均线作为入市信号,结合追踪止损和目标获利机制来管理风险和获利。该策略充分利用了EMA的平滑性质来识别趋势,通过多次DCA投入控制成本。此外,整合了动态止损和目标获利设定让整个策略更为智能化和自动化。

## 策略原理
### 指标计算
- EMA5、EMA10、EMA20、EMA50、EMA100、EMA200指数移动平均线
- ATR平均真实波动幅度

### 入市信号 
当价格接近或穿过设定的EMA周期时产生入市信号,EMA周期可自定义,典型选用5、10、20、50、100、200周期。本策略采用价格在EMA上下1%范围内作为入市条件。

### 风险管理
整合多项风险管理机制:
1. ATR止损:当ATR超过设定阈值时清仓止损
2. 最大入市次数控制:避免过度投入
3. 动态追踪止损:根据价格实时波动 trailing stop

### 获利机制
设定目标获利水平,当价格超过目标价时退出

## 策略优势分析
1. 利用EMA识别趋势,对短期波动过滤作用好
2. DCA成本分散,避免高买低卖
3. 多重EMA组合,提高入市成功率  
4. 动态止损REAL-TIME控制亏损 
5. 目标获利清晰,不浪费太多盈利

## 风险及改进
1. EMA因子选择需要优化,不同市场不同周期组合效果差异大
2. DCA次数可能过多造成资金过度占用
3. 停损幅度设定需要回测优化

## 策略优化思路 
1. 利用高级EMA系统识别趋势
2. 多变量优化最佳DCA次数和止损幅度
3. 加入机器学习模型预测价格变化
4. 整合资金管理模块控制总体投入

## 总结
本策略整合了EMA识别趋势、DCA成本控制、动态追踪止损、目标获利退出等多项机制。在参数调整和风险控制方面还有很多优化空间。整体而言,该策略具有很强的适应性和扩展性,能够为投资者带来稳定的超额收益。

||

## Overview 
This strategy utilizes dynamic multiple EMAs as entry signals combined with trailing stop loss and profit target mechanisms for risk management. It takes advantage of the smoothing nature of EMAs to identify trends and control cost via multi-DCA entries. In addition, the integration of adaptive stop loss and profit taking features enhances the automation process.  

## Strategy Logic
### Indicators
- EMA5, EMA10, EMA20, EMA50, EMA100, EMA 200
- Average True Range (ATR)

### Entry Signals
Triggers long entry when price crosses or moves inside a range of selected EMA periods. Typical EMAs include 5, 10, 20, 50, 100, 200 periods. This strategy uses 1% range of EMA as the entry criteria.  

### Risk Management 
Incorporates multiple risk control mechanisms:
1. ATR Stop Loss: Close all positions when ATR exceeds threshold
2. Entry Frequency Limit: Control maximum number of entries  
3. Trailing Stop Loss: Dynamic stop loss based on price movement

### Profit Taking  
Set profit target price levels for exits  

## Advantages
1. Identify trends using EMAs with noise filtering  
2. Cost averaging via multi-DCA entries
3. Enhanced entry signals using EMA combos
4. Adaptive stop loss mechanism  
5. Take profit control for profit protection
   
## Risks & Improvements
1. EMAs tuning needs optimization for different markets
2. Excessive DCA entries may occupy too much capital
3. Stop loss percentage needs backtesting  

## Enhancement Strategies
1. Utilize advanced EMA systems for better trend identification
2. Multi-variable optimization of DCA frequency and stop loss percentage 
3. Incorporate machine learning models for price change forecasts  
4. Integrate position sizing module to manage overall capital utilization

## Conclusion
The strategy encompasses EMA trend detection, multi-DCA cost averaging, trailing stop loss, target profit taking and more. There remains ample potential in tuning parameters and enhancing risk controls. Overall, this highly adaptive and versatile strategy offers investors stable alpha generation capabilities.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Sell Threshold|
|v_input_2|3000|Buy Limit|
|v_input_3|true|Trailing Stop Percentage|
|v_input_4|3|Profit Target Percentage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-12 00:00:00
end: 2024-01-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("EMA DCA Strategy with Trailing Stop and Profit Target", overlay=true )

// Define the investment amount for when the condition is met
investment_per_condition = 6

// Define the EMAs
ema5 = ema(close, 5)
ema10 = ema(close, 10)
ema20 = ema(close, 20)
ema50 = ema(close, 50)
ema100 = ema(close, 100)
ema200 = ema(close, 200)

// Define ATR sell threshold
atr_sell_threshold = input(title="ATR Sell Threshold", type=input.integer, defval=10, minval=1)

// Helper function to find if the price is within 1% of the EMA
isWithin1Percent(price, ema) =>
    ema_min = ema * 0.99
    ema_max = ema * 1.01
    price >= ema_min and price <= ema_max

// Control the number of buys
var int buy_count = 0
buy_limit = input(title="Buy Limit", type=input.integer, defval=3000)

// Calculate trailing stop and profit target levels
trail_percent = input(title="Trailing Stop Percentage", type=input.integer, defval=1, minval=0, maxval=10)
profit_target_percent = input(title="Profit Target Percentage", type=input.integer, defval=3, minval=1, maxval=10)

// Determine if the conditions are met and execute the strategy
checkConditionAndBuy(emaValue, emaName) =>
    var int local_buy_count = 0 // Create a local mutable variable
    if isWithin1Percent(close, emaValue) and local_buy_count < buy_limit
        strategy.entry("Buy at " + emaName, strategy.long, qty=investment_per_condition / close, alert_message ="Buy condition met for " + emaName)
        local_buy_count := local_buy_count + 1
        // alert("Buy Condition", "Buy condition met for ", freq_once_per_bar_close)
        
    local_buy_count // Return the updated local_buy_count

// Add ATR sell condition
atr_condition = atr(20) > atr_sell_threshold
if atr_condition
    strategy.close_all()
    buy_count := 0 // Reset the global buy_count when selling

// Strategy execution
buy_count := checkConditionAndBuy(ema5, "EMA5")
buy_count := checkConditionAndBuy(ema10, "EMA10")
buy_count := checkConditionAndBuy(ema20, "EMA20")
buy_count := checkConditionAndBuy(ema50, "EMA50")
buy_count := checkConditionAndBuy(ema100, "EMA100")
buy_count := checkConditionAndBuy(ema200, "EMA200")

// Calculate trailing stop level
trail_offset = close * trail_percent / 100
trail_level = close - trail_offset

// Set profit target level
profit_target_level = close * (1 + profit_target_percent / 100)

// Exit strategy: Trailing Stop and Profit Target
strategy.exit("TrailingStop", from_entry="Buy at EMA", trail_offset=trail_offset, trail_price=trail_level)
strategy.exit("ProfitTarget", from_entry="Buy at EMA",  when=close >= profit_target_level)

// Plot EMAs
plot(ema5, title="EMA 5", color=color.red)
plot(ema10, title="EMA 10", color=color.orange)
plot(ema20, title="EMA 20", color=color.yellow)
plot(ema50, title="EMA 50", color=color.green)
plot(ema100, title="EMA 100", color=color.blue)
plot(ema200, title="EMA 200", color=color.purple)

```

> Detail

https://www.fmz.com/strategy/439362

> Last Modified

2024-01-19 15:16:53
