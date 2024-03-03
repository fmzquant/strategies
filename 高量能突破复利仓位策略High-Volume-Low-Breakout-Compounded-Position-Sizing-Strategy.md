
> Name

高量能突破复利仓位策略High-Volume-Low-Breakout-Compounded-Position-Sizing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1afe95bfefdeda3639e.png)
[trans]
### 概述

本策略的核心思想是在高交易量的情况下追踪突破,通过设置风险预算百分比和250倍的模拟杠杆来实现复利仓位。它旨在抓住高卖压后的潜在反转机会。

### 策略原理

当满足以下条件时,做多入场:

1. 交易量超过用户定义的阈值(volThreshold)
2. 当前K线的最低价低于上一根K线的最低价(lowLowerThanPrevBar)  
3. 当前K线收盘价为负,且高于上一根K线的收盘价(negativeCloseWithHighVolume)
4. 不存在未平仓多头仓位(strategy.position_size == 0)

仓位大小的计算方法是:

1. 根据账户权益(equity)的风险百分比(riskPercentage)计算风险金额
2. 将风险金额乘以模拟杠杆倍数(leverage,默认为250倍)得到合约数量

退出原则:

多头仓位盈亏百分比 posProfitPct 触碰止损线(-0.14%)或止盈线(4.55%)时平仓。

### 优势分析

这种策略的优势在于:

1. 捕捉高交易量带来的趋势反转机会
2. 采用复利仓位管理,利润增长快
3. 止损止盈设置合理,有利于风险控制

### 风险分析

该策略也存在一些风险:

1. 250倍的杠杆会放大损失
2. 没有考虑滑点、手续费和保证金等实际交易因素
3. 需要反复回测优化参数,实盘校验

可通过以下方法降低风险:

1. 适当降低杠杆倍数
2. 增加止损幅度
3. 考虑实际交易成本

### 优化方向  

该策略可以从以下几个方面进行优化:

1. 动态调整杠杆大小
2. 优化止损止盈条件
3. 添加趋势过滤器
4. 结合股票具体特点调参

### 总结

本策略总体来说较为简单直接,通过捕捉反转机会获取超额收益。但也存在一定风险,需要谨慎实盘验证。通过参数和策略结构优化,可以使其更稳定、实战性更强。

||

### Overview

The core idea of this strategy is to track breakouts during high trading volume by using a compounded position sizing approach based on a defined risk percentage and 250x simulated leverage. It aims to capture potential reversal opportunities after heavy selling pressure.

### Strategy Logic

Long entry signals are triggered when:

1. Volume exceeds a user-defined threshold (volThreshold) 
2. The current bar's low is lower than the previous bar's low (lowLowerThanPrevBar)
3. The current bar's close is negative but higher than the previous bar's close (negativeCloseWithHighVolume)  
4. There is no existing open long position (strategy.position_size == 0)

Position sizing is calculated as:  

1. Risk amount based on equity * risk percentage 
2. Risk amount * leverage (250x) to determine number of contracts/lots

Exit rules:

Close long position when profit percentage posProfitPct hits stop loss (-0.14%) or take profit (4.55%).

### Advantage Analysis  

Advantages of this strategy:

1. Captures trend reversal opportunities from high trading volume  
2. Compounded position sizing allows for faster profit growth
3. Reasonable stop loss and take profit helps control risk

### Risk Analysis

Risks to consider:

1. 250x leverage amplifies losses
2. Does not account for slippage, commissions, margin requirements
3. Requires robust backtesting and parameter optimization 

Risk can be reduced by:

1. Lowering leverage amount  
2. Increasing stop loss percentage
3. Accounting for real-world trading costs

### Optimization Opportunities

Areas for improvement:

1. Dynamically adjust leverage level
2. Optimize stop loss and take profit rules  
3. Add trend filter 
4. Customize parameters based on instrument  

### Conclusion

In summary, this is a fairly simple and straightforward strategy for capturing reversals and outsized gains. But risks exist and prudent real-world testing is essential. With optimization, it can be made more robust and practical.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|250|Volume Threshold|
|v_input_float_1|10|Risk Percentage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-11 00:00:00
end: 2024-02-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("High Volume Low Breakout (Compounded Position Size)", overlay=true, initial_capital=1000)

// Define input for volume threshold
volThreshold = input.int(250, "Volume Threshold")

// Define input for risk per trade as a percentage of total equity
riskPercentage = input.float(10, "Risk Percentage")

// Calculate volume
vol = volume

// Check for high volume and low lower than the previous bar
highVolume = vol > volThreshold
lowLowerThanPrevBar = low < low[1]

// Calculate position profit percentage
posProfitPct = 100 * (close - strategy.position_avg_price) / strategy.position_avg_price

// Calculate the position size based on risk percentage and total account equity
equity = strategy.equity
riskAmount = (equity * riskPercentage / 100) / (close - strategy.position_avg_price)

// Calculate leverage (250x in this case)
leverage = 250

// Calculate the position size in contracts/lots to trade
positionSize = riskAmount * leverage

// Check if the current bar's close is negative when it has high volume
negativeCloseWithHighVolume = highVolume and close < close[1]

// Enter long position as soon as volume exceeds the threshold, low is lower than the previous bar, and the current bar's close is negative
if highVolume and lowLowerThanPrevBar and negativeCloseWithHighVolume and strategy.position_size == 0
    strategy.entry("Long", strategy.long, qty=positionSize, comment="Long Entry")

// Exit long position intrabar if profit goes below -0.14% or above 1%
if strategy.position_size > 0
    if posProfitPct < -0.14 or posProfitPct > 4.55
        strategy.close("Long")

```

> Detail

https://www.fmz.com/strategy/442008

> Last Modified

2024-02-18 15:43:02
