
> Name

动态加仓策略Dynamic-Pyramiding-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1868726b948a33b1dd7.png)

[trans]

## 概述

动态加仓策略通过在亏损时加仓的方式,实现成本均价下降,从而达到止损回补的目的。当价格触发加仓条件时,该策略会以一定的数量和间隔陆续加仓,同时设置了最大加仓次数,避免无限加仓的风险。

## 策略原理

该策略的核心逻辑是:

1. 开仓买入:如果持仓为0时,按指定价格下单开仓。

2. 加仓条件:如果当前加仓次数小于最大加仓次数,并且价格低于上一仓位价格的一个预设下跌幅度,则触发加仓。

3. 加仓方式:加仓数量按之前数量的一个缩放系数增加,加仓间隔按之前间隔的一个缩放系数减小。

4. 止盈条件:如果持仓平均价格的一个预设盈利幅度被触发,则全部平仓止盈。

这样,当市场不利时,该策略可以通过加仓降低持仓成本,在回调止损的同时获取额外收益。当行情转折向上时,止盈条件被触发,所有的头寸获利了结。

## 优势分析

该策略最大的优势在于,通过加仓方式实现成本均价下降,在容忍一定损失的前提下获取更大收益,这在牛市中尤其明显。具体来说,主要有以下几点优势:

1. 可以大幅降低持仓成本,增强止损能力。当价格出现回调时,策略会加仓,从而将之前更高买入价格的单子“稀释”,降低总成本。

2. 增加获利空间。降低成本后,只要价格反弹回升,盈利空间就会被扩大,这为止盈让路。

3. 灵活设置加仓逻辑,可自定义。策略允许设置加仓幅度、数量、间隔等参数,用户可以根据自己的偏好进行调整。

4. 风险可控,设置加仓上限。最大加仓次数限制让策略不会无限加仓,可以控制风险。

## 风险分析

尽管该策略通过加仓获取了更大收益空间,但也存在一定的风险需要警惕:

1. 亏损风险。策略是以承担一定亏损为前提加仓的。如果行情持续不利,亏损可能扩大。

2. 暴跌风险。极端行情下价格可能出现暴跌,超出策略承受能力。这需要合理设置加仓参数和止损点。

3. 反弹不及时。价格反弹不一定会触发止盈,无法及时止盈是策略的短板。

4. 参数设置风险。加仓系数、止盈幅度等参数设置不当,都可能导致策略失败。

这些风险可以通过以下方式得到缓解:

1. 适当缩减加仓量,控制单笔亏损。

2. 缩小加仓间隔,快速实现成本下降。

3. 合理设置止损位。止损点设置过宽容易亏损扩大。

## 优化方向  

考虑到该策略使用加仓方式获取更大收益的性质,其优化方向主要集中在更好地控制风险和获取收益上。具体来说,有以下几个主要的优化方向:

1. 改进加仓逻辑算法,使加仓更加智能和顺应行情。可以考虑根据波动率、价格跳空等指标触发加仓。

2. 优化止盈方式,实现更高效止盈。可以结合移动止盈、分批止盈等方式,减少反弹无法止盈的情况。

3. 引入机器学习算法,实现参数自适应优化。使关键参数不再静态,而是根据实时行情和反馈动态调整。

4. 增加止损机制,控制最大损失。止损方式可以考虑移动止损、挂单止损等,避免极端行情造成的亏损扩大。

## 总结  

动态加仓策略通过加仓实现成本均价下降的方式,在适当控制风险的前提下获取更大收益。这种以承担一定亏损为前提的策略,在容忍损失能力较强的投资者中尤其受欢迎。未来的优化方向,将会围绕更智能的加仓方式、更高效的止盈机制等进行。

||

## Overview

The dynamic pyramiding strategy aims to lower the average holding cost through pyramiding additional positions when the price drops. It can help to mitigate losses and gain additional profits when the price bounces back. The strategy will open additional positions with certain quantity and interval when the pyramiding conditions are triggered. Meanwhile, the maximum number of pyramiding is set to limit the risk.

## Strategy Logic  

The core logic of this strategy includes:

1. Open position: Open long position with specified price if current position is 0.  

2. Pyramiding condition: Trigger pyramiding if current pyramiding times is less than maximum value, and price drops below last entry price at a preset percentage.

3. Pyramiding way: Increase pyramiding quantity at a scaling factor of previous one, and reduce interval at a scaling factor.  

4. Take profit condition: Close all positions if the profit target based on average holding price is triggered.

By pyramiding with dropping price, this strategy lowers the average cost dynamically. It stops loss efficiently and leaves more room for profit when trend reverses. When take profit condition is triggered, all positions exit with profit.

## Advantage Analysis

The biggest advantage of this strategy is to gain greater profit potential with acceptable losses by lowering average holding cost using pyramiding. The main benefits are:  

1. Reduce holding cost significantly hence enhances the ability to stop loss. By adding additional buy orders at lower prices when drawdown happens, the strategy "dilutes" previous higher entries and lowers overall cost.

2. Increase profit range after lowering cost. If price bounces back, the profit potential gets expanded and paves the way for take profit.  

3. Flexible customization for pyramiding logic by setting related parameters on increment, quantity and interval etc.  

4. Controllable risk by capping maximum pyramiding times. It prevents unlimited pyramiding.

## Risk Analysis   

While the strategy allows more profit potential with pyramiding, some risks need attention:   

1. Loss risk - The premise is undertaking certain losses from pyramiding. If trend keeps going against holdings, losses may expand.  

2. Cliff dive risk - In extreme cases like cliff dive, losses may exceed acceptable range. Reasonable pyramiding settings and stop loss point are critical.

3. Late or missing take profit - Price rebound may not always trigger take profit condition, which is the shortcoming of the strategy.  

4. Parameter tuning risk - Unsuitable settings on parameters like pyramiding coefficient and take profit percentage may lead to failure.

Below measures can help mitigate the risks:

1. Lower increment scale to control single entry loss amount.   

2. Narrow down pyramiding interval to achieve faster cost reduction.

3. Set stop loss point appropriately rather than too loose.

## Optimization Directions

Considering the nature of gaining higher profit potential with pyramiding, the optimization directions mainly focus on better risk control and profitability enhancement:  

1. Improve pyramiding logic to make entries more intelligent and adaptive to market conditions. Entry signals can rely on volatility, price gap and more metrics.

2. Optimize take profit mechanisms for higher efficiency, such as trailing take profit, partial closing etc., to lower the chance of missing price rebound.  

3. Introduce machine learning algorithms to enable parameter auto-tuning. Key parameters become dynamic instead of static based on real-time feedback.   

4. Add stop loss mechanism to limit maximum losses, such as trailing stop loss and take profit stop orders. It prevents losses running out of control under extreme market events.

## Conclusion

The dynamic pyramiding strategy lowers average holding cost by additional entries, enabling higher profit potential given acceptable loss tolerance. This kind of strategy favors investors with relatively high risk appetite. The future optimization directions will be around more intelligent pyramiding logic, higher efficiency take profit mechanisms and so on.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2021|From Year|
|v_input_4|true|To Month|
|v_input_5|true|To Day|
|v_input_6|9999|To Year|
|v_input_7|2|Price deviation to open safety orders|
|v_input_8|1.5|Target Take Profit|
|v_input_9|100000|base order|
|v_input_10|200|safe order|
|v_input_11|2|Safety order volume scale|
|v_input_12|true|Safety order step scale|
|v_input_13|10|max safe order|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-14 00:00:00
end: 2023-12-18 19:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy("DCA Bot Emulator", overlay=true, pyramiding=99, default_qty_type=strategy.cash, commission_value = 0.02)

// Date Ranges
from_month = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
from_day   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
from_year  = input(defval = 2021, title = "From Year")
to_month   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
to_day     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
to_year    = input(defval = 9999, title = "To Year")
start  = timestamp(from_year, from_month, from_day, 00, 00)  // backtest start window
finish = timestamp(to_year, to_month, to_day, 23, 59)        // backtest finish window
window = time >= start and time <= finish ? true : false // create function "within window of time"

// Strategy Inputs
price_deviation = input(2, title='Price deviation to open safety orders', maxval=0)/100
take_profit = input(1.5, title='Target Take Profit', minval=0)/100

// base order
base_order  = input(100000, title='base order') 
safe_order  = input(200, title='safe order') 
safe_order_volume_scale  = input(2, title='Safety order volume scale') 
safe_order_step_scale  = input(1, title='Safety order step scale') 

max_safe_order = input(10, title='max safe order') 
var current_so = 1
var initial_order = 0.0

// Calculate our key levels
pnl = (close - strategy.position_avg_price) / strategy.position_avg_price

take_profit_level = strategy.position_avg_price * (1 + take_profit)

// First Position
if(strategy.position_size == 0 and window)
    strategy.entry("Long", strategy.long, qty = base_order/close)
    initial_order := close
    current_so := 1

// Average Down!
if current_so > 0 and close  < initial_order * (1 - price_deviation * current_so * safe_order_step_scale) and current_so <= max_safe_order
    so_name = "SO " + tostring(current_so) 
    strategy.entry(so_name, long=strategy.long , qty = safe_order * safe_order_volume_scale /close)
    current_so := current_so + 1
    
// Take Profit!
strategy.close_all(when=take_profit_level <= close  and strategy.position_size > 0)

```

> Detail

https://www.fmz.com/strategy/436245

> Last Modified

2023-12-22 14:36:30
