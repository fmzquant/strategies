
> Name

动态加仓策略Dynamic-Pyramiding-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1868726b948a33b1dd7.png)


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
