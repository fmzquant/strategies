
> Name

动态平衡双向跟踪槓桿ETF投资策略Dynamic-Balancing-Leveraged-ETF-Investment-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e20a71f1a3e9eea3b0.png)
[trans]
### 概述

本策略以香港恒生指数ETF(00631L)为投资标的,通过动态调整现金仓位和仓位占比,实时平衡投资组合的收益和风险。策略简单易行,无须判断市场趋势,适合无法频繁查看市场的投资者。

### 策略原理  

1. 初始化投入50%的总资金购买00631L;

2. 监控未实现收益和剩余现金的比例; 
   
   当未实现收益超过剩余现金10%时,平掉5%头寸;

   当剩余现金超过未实现收益10%时,增买额外5%头寸;

3. 动态调整仓位和现金比例,控制投资组合收益和风险。

### 优势分析

1. 简单容易操作,无须判断市场;

2. 动态调整仓位,有效控制投资风险;

3. 双向跟踪,及时止损止盈;

4. 适合无法频繁check市场的投资者。


### 风险及对策

1. 槓杆ETF波动较大;

   采用渐进建仓,分批间隔投入。

2. 无法及时止损; 

   设置止损线,控制最大损失。

3. 交易成本较高;

   适当放宽平衡幅度,减少调仓。

### 优化思路

1. 优化仓位和现金比例;

2. 测试不同ETF品种的收益效果;

3. 加入趋势判断指标,提高资金利用效率。

### 总结

本策略通过构建动态平衡的投资组合,控制投资风险,无须判断市场趋势,操作简单,适合无法频繁check市场的投资者,是一个非常实用的量化投资策略。

||

### Overview

This strategy takes Hong Kong Hang Seng Index ETF (00631L) as the investment target and dynamically adjusts the cash position and position ratio to balance the return and risk of the investment portfolio in real time. The strategy is simple and easy to implement without the need to judge market trends and is suitable for investors who cannot frequently check the market.

### Principles  

1. Initially invest 50% of the total funds to purchase 00631L;

2. Monitor the ratio between unrealized profit and remaining cash; 
   
   Sell 5% of position when unrealized profit exceeds remaining cash by 10%;

   Add 5% to position when remaining cash exceeds unrealized profit by 10%;  

3. Dynamically adjust position and cash ratio to control portfolio return and risk.

### Advantage Analysis  

1. Simple and easy to operate without the need to judge market conditions;

2. Dynamically adjusting positions effectively manages investment risk;  

3. Two-way tracking to timely stop loss or take profit;

4. Suitable for investors who cannot frequently check the market.

### Risks and Mitigations

1. Leveraged ETFs have higher volatility;

   Adopt gradual position building and spaced investments.  

2. Unable to timely stop loss;

   Set stop loss line to control maximum loss.

3. Higher trading costs; 

   Relax balancing range to reduce position adjustments.

### Optimization Ideas

1. Optimize position and cash ratio;

2. Test return effectiveness across different ETF products;  

3. Incorporate trend indicators to improve capital utilization efficiency.


### Conclusion  

By constructing a dynamic balancing portfolio, this strategy controls investment risks without the need to judge market trends. Simple to operate, it is a highly practical quantitative investment strategy suitable for investors who cannot frequently check the market.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-24 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("00631L Trading Simulation", shorttitle="Sim", overlay=true, initial_capital = 1000000)

// 设置本金
capital = 1000000

// 设置购买和出售日期范围
start_date = timestamp(2022, 10, 6) 
next_date = timestamp(2022, 10, 7)  // 較好的開始日
//start_date = timestamp(2022, 3, 8) 
//next_date = timestamp(2022, 3, 9)  // 較差的的開始日 
sell_date = timestamp(2024, 1, 19) 
end_date = timestamp(2024, 1, 21)  // 结束日期为2024年01月21日

// 判断是否在交易期间
in_trade_period = time >= start_date and time <= end_date
// 实现的盈亏
realized_profit_loss = strategy.netprofit
plot(realized_profit_loss, title="realized_profit_loss", color=color.blue)
// 未实现的盈亏
open_profit_loss = strategy.position_size * open
plot(open_profit_loss, title="open_profit_loss", color=color.red)
// 剩余资金
remaining_funds = capital  + realized_profit_loss - (strategy.position_size * strategy.position_avg_price)
plot(remaining_funds, title="remaining_funds", color=color.yellow)
// 總權益
total_price = remaining_funds + open_profit_loss
plot(total_price, title="remaining_funds", color=color.white)
// 购买逻辑：在交易期间的每个交易日买入 daily_investment 金额的产品
first_buy = time >= start_date and time <= next_date
buy_condition = in_trade_period and dayofmonth != dayofmonth[1]
// 出售邏輯 : 在交易期间的截止日出售所有商品。
sell_all = time >= sell_date

// 在交易期間的第一日買入50%本金
if first_buy
    strategy.order("First", strategy.long, qty = capital/2/open)
// 在每个K线的开盘时进行买入

// 加碼邏輯 : 剩余资金 > 未实现的盈亏 * 1.05
add_logic = remaining_funds > open_profit_loss * 1.05
if buy_condition
    strategy.order("Buy", strategy.long, when = add_logic, qty = remaining_funds * 0.025 / open)
//

// 減碼邏輯 : 剩余资金 > 未实现的盈亏 * 1.05
sub_logic = open_profit_loss > remaining_funds * 1.05
if buy_condition
    strategy.order("Sell", strategy.short, when = sub_logic, qty = open_profit_loss * 0.025/open)
//

strategy.order("Sell_all",  strategy.short, when = sell_all, qty = strategy.position_size)

// 绘制交易期间的矩形区域
bgcolor(in_trade_period ? color.green : na, transp=90)


```

> Detail

https://www.fmz.com/strategy/442087

> Last Modified

2024-02-19 11:09:29
