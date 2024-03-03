
> Name

50资金50仓位动态平衡量化策略Dynamic-Balancing-Strategy-with-50-Funds-and-50-Positions

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/198847a3568ae2ba0ec.png)
[trans]
### 策略概述

本策略以50%资金和50%仓位进行动态平衡,通过不断调整仓位和资金比例,实现风险控制。适合无法实时监控市场的投资者。

### 策略原理

1. 初始化本金100万元,分为50%资金和50%仓位。

2. 在交易周期内,每天开盘时,如果剩余资金大于未实现盈亏的1.05倍,则用剩余资金的2.5%进行加仓。

3. 如果未实现盈亏大于剩余资金的1.05倍,则卖出部分仓位,使之重新恢复到平衡状态。

4. 在交易结束时,平仓清算所有头寸。

### 策略优势

1. 通过资金和仓位的动态平衡,可以有效控制风险,最大程度避免极端行情的巨额损失。

2. 不需要频繁监控市场,仅需要调整资金和仓位比例,操作简单,适合工作繁忙的投资者。

3. 可以通过调整参数,实现不同程度的风险偏好,满足不同投资者的需求。

### 策略风险

1. 无法捕捉市场短期涨跌,盈利空间受限。

2. 如果行情出现长期单边突破,可能导致仓位比例过低,无法充分捕捉行情。

3. 参数设置不当可能导致仓位调整过于频繁或资金利用率不高。

### 策略优化

1. 可以引入更多参数,实现仓位和资金比例的更精细化控制。

2. 可以结合止损止盈原理,在仓位较大时适当止损。

3. 可以测试不同的交易周期参数设置,提升策略的适应性。

### 总结

本策略通过资金和仓位动态平衡的思路,实现了风险控制的目标。相比其他策略,操作简单,容易实现。后续通过引入更多可调参数以及结合其他策略思路,可以使策略更加完善。

|| 

### Strategy Overview

This strategy dynamically balances between 50% funds and 50% positions to control risk. By continuously adjusting the ratio between funds and positions, it manages risk for investors who cannot monitor the market in real-time.  

### Strategy Logic

1. Initialize capital at 1 million, divided equally into 50% funds and 50% positions.

2. During the trading period, if remaining funds exceed unrealized profit/loss by 1.05 times at each open, use 2.5% of remaining funds to add positions.  

3. If unrealized profit/loss exceeds remaining funds by 1.05 times, sell partial positions to restore balance.

4. Close all positions at end of trading period.

### Advantages 

1. Effective risk control by dynamically balancing funds and positions, avoiding huge losses in extreme market conditions.

2. Simple to operate for busy investors, only need to adjust fund/position ratios.

3. Customizable parameters to meet varying risk appetites.

### Risks

1. Unable to capitalize on short-term fluctuations, profit potential limited.  

2. Long one-sided run may result in insufficient position size. 

3. Improper parameter tuning leads to excess position flipping or low capital utilization.

### Enhancement Opportunities 

1. Introduce more parameters for finer fund/position control.  

2. Incorporate stop loss/profit taking for larger positions.

3. Test different trading period parameters to improve adaptability.

### Conclusion
This strategy achieves risk control by dynamically balancing between funds and positions. Simple to implement compared to other strategies. Can be further improved by introducing more adjustable parameters and combining with other strategy concepts.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-17 00:00:00
end: 2023-12-18 19:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("00631L Trading Simulation", shorttitle="Sim", overlay=true, initial_capital = 1000000)

// 设置本金
capital = 1000000

// 设置购买和出售日期范围
start_date = timestamp(2020, 11, 4)
next_date = timestamp(2020, 11, 5)
sell_date = timestamp(2023, 10, 24)
end_date = timestamp(2023, 10, 25)  // 结束日期改为2023年10月25日

// 判断是否在交易期间
in_trade_period = true
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

https://www.fmz.com/strategy/436515

> Last Modified

2023-12-25 14:12:30
